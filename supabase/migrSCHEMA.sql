-- VS Auto Mart — "Get Your Car Valued / Sell Your Car" schema
-- Run this against your Supabase project (SQL editor or CLI migration).
-- Additive only — does not touch existing tables (vehicles, vehicle_images, testimonials).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- sell_car_submissions
-- ---------------------------------------------------------------------------
create table if not exists sell_car_submissions (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Seller
  seller_name text not null check (char_length(seller_name) between 1 and 120),
  seller_phone text not null,
  seller_whatsapp text not null,
  seller_email text,

  -- Vehicle
  vehicle_make text not null check (char_length(vehicle_make) between 1 and 60),
  vehicle_model text not null check (char_length(vehicle_model) between 1 and 60),
  vehicle_year integer not null check (
    vehicle_year between 1980 and extract(year from now())::int + 1
  ),
  registration_number text not null check (char_length(registration_number) between 1 and 20),
  mileage integer not null check (mileage >= 0 and mileage < 2000000),

  fuel_type text not null check (fuel_type in ('petrol', 'diesel', 'hybrid', 'electric', 'other')),
  transmission text not null check (transmission in ('automatic', 'manual', 'amt', 'cvt', 'other')),
  colour text,
  engine_capacity text,
  owners_count integer check (owners_count is null or owners_count between 1 and 20),
  condition text not null check (condition in ('excellent', 'good', 'fair', 'needs_repairs')),

  asking_price numeric(12, 2) not null check (asking_price > 0),
  description text check (char_length(description) <= 4000),

  status text not null default 'NEW' check (
    status in (
      'NEW', 'REVIEWING', 'CONTACTED', 'INSPECTION',
      'OFFER_MADE', 'PURCHASED', 'REJECTED', 'CLOSED'
    )
  ),

  admin_notes text,
  assigned_to uuid references auth.users (id) on delete set null,

  consent_given boolean not null default false,
  consent_at timestamptz
);

create index if not exists idx_sell_car_submissions_created_at
  on sell_car_submissions (created_at desc);
create index if not exists idx_sell_car_submissions_status
  on sell_car_submissions (status);
create index if not exists idx_sell_car_submissions_seller_phone
  on sell_car_submissions (seller_phone);
create index if not exists idx_sell_car_submissions_registration_number
  on sell_car_submissions (registration_number);
-- reference_number already indexed via the unique constraint above.

-- updated_at auto-touch
create or replace function set_sell_car_submissions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_sell_car_submissions_updated_at on sell_car_submissions;
create trigger trg_sell_car_submissions_updated_at
  before update on sell_car_submissions
  for each row execute function set_sell_car_submissions_updated_at();

-- ---------------------------------------------------------------------------
-- sell_car_submission_photos
-- ---------------------------------------------------------------------------
create table if not exists sell_car_submission_photos (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references sell_car_submissions (id) on delete cascade,
  image_url text not null,
  cloudinary_public_id text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_sell_car_submission_photos_submission_id
  on sell_car_submission_photos (submission_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table sell_car_submissions enable row level security;
alter table sell_car_submission_photos enable row level security;

-- Public (anon) can INSERT a submission, and nothing else. No public SELECT —
-- this table holds seller PII, admin_notes, and status, none of which should
-- ever be readable by the anon key (RLS here is row-level, not column-level,
-- per the existing project convention — see lib/queries.ts).
drop policy if exists "public can insert submissions" on sell_car_submissions;
create policy "public can insert submissions"
  on sell_car_submissions for insert
  to anon
  with check (
    status = 'NEW'
    and assigned_to is null
    and admin_notes is null
  );

-- Public (anon) can INSERT photo rows only for a submission they just
-- created in the same request. There's no way to scope this to "their own"
-- row via RLS alone (no session ties anon requests together), so the real
-- guard is that submission creation + photo inserts both happen inside one
-- trusted server action — this policy just allows the server (using the
-- anon key, matching this project's existing pattern) to perform the insert.
drop policy if exists "public can insert submission photos" on sell_car_submission_photos;
create policy "public can insert submission photos"
  on sell_car_submission_photos for insert
  to anon
  with check (true);

-- Authenticated (admin) — full access, matching the existing vehicles table
-- convention where any authenticated user is treated as staff.
drop policy if exists "staff can read submissions" on sell_car_submissions;
create policy "staff can read submissions"
  on sell_car_submissions for select
  to authenticated
  using (true);

drop policy if exists "staff can update submissions" on sell_car_submissions;
create policy "staff can update submissions"
  on sell_car_submissions for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "staff can delete submissions" on sell_car_submissions;
create policy "staff can delete submissions"
  on sell_car_submissions for delete
  to authenticated
  using (true);

drop policy if exists "staff can read submission photos" on sell_car_submission_photos;
create policy "staff can read submission photos"
  on sell_car_submission_photos for select
  to authenticated
  using (true);

drop policy if exists "staff can delete submission photos" on sell_car_submission_photos;
create policy "staff can delete submission photos"
  on sell_car_submission_photos for delete
  to authenticated
  using (true);
