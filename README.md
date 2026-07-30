# VS Auto Mart

Digital dealership platform: public showroom, live inventory, customer trust
portfolio, and an admin dashboard — built with Next.js (App Router),
Tailwind CSS, and Supabase.

## What's included

- **Public site** — homepage (hero, featured vehicles, latest arrivals, why-us,
  customer preview), `/inventory` with filtering, `/cars/[slug]` detail pages
  with SEO metadata, `/customers` delivery portfolio, `/about`.
- **Admin dashboard** (`/admin`, auth-protected) — add vehicles, edit price/
  description/photos, change status (available/reserved/sold), delete.
- **Database schema** (`supabase/schema.sql`) — vehicles, images, customer
  stories, testimonials, inquiries, staff profiles, with row-level security.
- **SEO** — dynamic `sitemap.xml`, `robots.txt`, per-vehicle metadata.

Not included yet (see "Next steps" below): Cloudinary upload widget (photo
URLs are pasted in manually for now), the AI assistant and CRM from the
proposal's Phase 2, and automatic social media posting.

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run `supabase/schema.sql` in full.
3. Create your first staff login: **Authentication → Users → Add user**,
   then insert a matching row in `profiles`:
   ```sql
   insert into public.profiles (id, name, role)
   values ('paste-the-user-uuid-here', 'Your Name', 'owner');
   ```
4. Copy your Project URL and anon key from **Project Settings → API**.

## 2. Set up Cloudinary (image hosting)

Create a free account at [cloudinary.com](https://cloudinary.com) and copy
your cloud name, API key, and API secret from the dashboard. For now, upload
photos there directly (or via any Cloudinary upload tool) and paste the
resulting URLs into the admin "Add Vehicle" / "Edit Vehicle" forms.

## 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the Supabase, Cloudinary, and WhatsApp values.

## 4. Install and run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the dashboard.

## 5. Deploy

Push this repo to GitHub and import it into [Vercel](https://vercel.com).
Add the same environment variables from `.env.local` in the Vercel project
settings, then deploy. Point your domain (e.g. `vsautomart.lk`) at the
Vercel project once it's live.

## Project structure

```
src/
  app/
    page.tsx                 → homepage
    inventory/page.tsx        → /inventory (filterable listing)
    cars/[slug]/page.tsx      → vehicle detail page
    customers/page.tsx        → happy customers / delivery portfolio
    about/page.tsx            → company story + founder
    admin/
      login/page.tsx          → staff sign-in
      (protected)/            → auth-gated dashboard routes
        page.tsx               → vehicle table + status control
        actions.ts              → server actions (create/update/delete)
        vehicles/new/page.tsx    → add vehicle form
        vehicles/[id]/edit/page.tsx → edit vehicle form
  components/                → shared UI (VehicleCard, StatusBadge, etc.)
  lib/
    supabase/                → browser/server/middleware Supabase clients
    types.ts                 → shared TypeScript types
    utils.ts                 → formatting helpers (LKR, mileage, slugs, WhatsApp links)
supabase/schema.sql           → full database schema + RLS policies
```

## Design notes

Visual language is built around the registration-plate motif (`plate-tag` in
`globals.css`) for specs and status — grounded in the vehicle-plate theme
rather than generic badges. Palette: graphite/charcoal base, brass accent
(trust/premium, not the typical AI-orange), moss green for "available",
signal red for "sold". Display type is Oswald (technical, dashboard-like
condensed caps), body is Inter, and spec tags use JetBrains Mono for a
data-plate feel.

## Next steps toward the full proposal

- Wire up a Cloudinary unsigned upload widget in the admin forms instead of
  pasting URLs.
- Add a "Request more information" contact form (schema already has an
  `inquiries` table ready for it).
- Phase 2 from the original proposal: customer accounts + saved favourites,
  an AI vehicle-recommendation assistant, a CRM view over `inquiries`, and
  auto-posting new listings to Facebook/Instagram/TikTok.
