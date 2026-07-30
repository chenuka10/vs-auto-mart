-- VS Auto Mart — database schema
-- Run this in Supabase SQL Editor (or via `supabase db push`)

create extension if not exists "uuid-ossp";

-- =========================================================
-- ENUMS
-- =========================================================
create type vehicle_status as enum ('available', 'reserved', 'sold');
create type fuel_type as enum ('petrol', 'diesel', 'hybrid', 'electric');
create type transmission_type as enum ('automatic', 'manual');
create type image_context as enum ('exterior', 'interior', 'dashboard', 'engine_bay', 'wheels', 'other');
create type user_role as enum ('owner', 'admin', 'staff');

-- =========================================================
-- USERS  (extends Supabase auth.users with app-level role)
-- =========================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role user_role not null default 'staff',
  created_at timestamptz not null default now()
);

-- =========================================================
-- VEHICLES
-- =========================================================
create table public.vehicles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,               -- e.g. suzuki-celerio-2018-a1b2
  brand text not null,
  model text not null,
  year int not null check (year between 1980 and extract(year from now())::int + 1),
  price numeric(12,2) not null check (price >= 0),
  mileage_km int not null default 0,
  fuel fuel_type not null,
  transmission transmission_type not null,
  engine_capacity text,                    -- e.g. "998cc"
  colour text,
  registration_no text,                    -- kept private, never exposed to public API
  condition text,
  description text,
  location text,                           -- e.g. "Kadawatha"
  status vehicle_status not null default 'available',
  is_featured boolean not null default false,
  video_url text,                          -- external embed (FB/TikTok/YouTube), not stored file
  date_added timestamptz not null default now(),
  date_sold timestamptz,
  created_by uuid references public.profiles(id)
);

create index vehicles_status_idx on public.vehicles(status);
create index vehicles_brand_model_idx on public.vehicles(brand, model);
create index vehicles_featured_idx on public.vehicles(is_featured) where is_featured = true;

-- =========================================================
-- VEHICLE IMAGES
-- =========================================================
create table public.vehicle_images (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  image_url text not null,                 -- Cloudinary URL
  context image_context not null default 'exterior',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index vehicle_images_vehicle_idx on public.vehicle_images(vehicle_id);

-- =========================================================
-- CUSTOMER DELIVERY STORIES ("Happy Customers")
-- =========================================================
create table public.customer_stories (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  vehicle_label text,                      -- fallback text if vehicle record later deleted
  delivery_date date not null,
  message text,                            -- short customer quote / caption
  video_url text,                          -- FB/TikTok/YouTube embed link only
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.customer_story_photos (
  id uuid primary key default uuid_generate_v4(),
  story_id uuid not null references public.customer_stories(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0
);

-- =========================================================
-- TESTIMONIALS (separate from delivery stories — general reviews)
-- =========================================================
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  reviewer_name text not null,
  rating int check (rating between 1 and 5),
  review_text text,
  photo_url text,
  video_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- =========================================================
-- INQUIRIES  (WhatsApp / "Request more information" form submissions)
-- =========================================================
create table public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid references public.vehicles(id) on delete set null,
  name text not null,
  phone text not null,
  message text,
  channel text default 'website',           -- website | whatsapp | call
  created_at timestamptz not null default now(),
  handled boolean not null default false
);

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================
alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.customer_stories enable row level security;
alter table public.customer_story_photos enable row level security;
alter table public.testimonials enable row level security;
alter table public.inquiries enable row level security;
alter table public.profiles enable row level security;

-- Public (anon) read access — only non-sensitive columns are selected by the app layer.
create policy "public can read vehicles" on public.vehicles
  for select using (true);

create policy "public can read vehicle images" on public.vehicle_images
  for select using (true);

create policy "public can read published customer stories" on public.customer_stories
  for select using (is_published = true);

create policy "public can read story photos" on public.customer_story_photos
  for select using (true);

create policy "public can read published testimonials" on public.testimonials
  for select using (is_published = true);

-- Anyone can submit an inquiry, but only staff can read them back.
create policy "anyone can insert inquiries" on public.inquiries
  for insert with check (true);

-- Authenticated staff (admin/owner/staff) get full read/write on everything.
create policy "staff manage vehicles" on public.vehicles
  for all using (auth.uid() in (select id from public.profiles))
  with check (auth.uid() in (select id from public.profiles));

create policy "staff manage vehicle images" on public.vehicle_images
  for all using (auth.uid() in (select id from public.profiles))
  with check (auth.uid() in (select id from public.profiles));

create policy "staff manage customer stories" on public.customer_stories
  for all using (auth.uid() in (select id from public.profiles))
  with check (auth.uid() in (select id from public.profiles));

create policy "staff manage story photos" on public.customer_story_photos
  for all using (auth.uid() in (select id from public.profiles))
  with check (auth.uid() in (select id from public.profiles));

create policy "staff manage testimonials" on public.testimonials
  for all using (auth.uid() in (select id from public.profiles))
  with check (auth.uid() in (select id from public.profiles));

create policy "staff read inquiries" on public.inquiries
  for select using (auth.uid() in (select id from public.profiles));

create policy "staff update inquiries" on public.inquiries
  for update using (auth.uid() in (select id from public.profiles));

create policy "staff read own profile" on public.profiles
  for select using (auth.uid() = id);

-- =========================================================
-- TRIGGER: auto-stamp date_sold when status flips to 'sold'
-- =========================================================
create or replace function public.set_date_sold()
returns trigger as $$
begin
  if new.status = 'sold' and old.status is distinct from 'sold' then
    new.date_sold := now();
  elsif new.status <> 'sold' then
    new.date_sold := null;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_set_date_sold
  before update on public.vehicles
  for each row execute function public.set_date_sold();
