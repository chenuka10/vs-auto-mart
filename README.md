# VS Auto Mart — Digital Dealership Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20CDN-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)

A modern, high-performance web platform and management system built for **VS Auto Mart**, a premier automobile dealership based in Kadawatha, Sri Lanka.

---

## 🚀 Key Features

### 🌟 Public Storefront
- **Dynamic Showroom & Hero**: Showcase collage, trust metrics, video showcases, and featured stock.
- **Inventory Browser (`/inventory`)**: Real-time vehicle filtering by make, price range, transmission, fuel type, and availability.
- **Vehicle Detail Pages (`/cars/[slug]`)**:
  - Touch-swipe image gallery with zoom and fullscreen lightbox.
  - Complete technical specifications table (Plate-tag motif).
  - One-tap WhatsApp inquiry and direct phone dialer.
  - Dynamic JSON-LD structured data and OpenGraph meta tags for search engines.
- **Sell Your Car Portal (`/sell-your-car`)**:
  - 4-step valuation and submission wizard with client/server validation.
  - Optional registration number field for seller privacy.
  - Direct Cloudinary image uploads and automated reference number generator.
- **Customer Trust & Social Proof**:
  - **Happy Customers (`/customers`)**: Vehicle delivery photo stories and customer showcases.
  - **Customer Reviews (`/reviews`)**: Verified buyer ratings, Google review cards, and trust badges.
- **Information Hub**: Company story (`/about`) and FAQ section (`/faq`).

---

### 🛡️ Admin Management Dashboard (`/admin`)
- **Authentication & Security**: Supabase Auth with Row-Level Security (RLS) and server-side middleware protection.
- **Navigation & Active States**: Unified `AdminNav` with live route indicators and breadcrumb navigation.
- **Vehicle Management**:
  - Create, update, and archive vehicles with live pricing, mileage, and condition flags.
  - Cloudinary upload widget with cover photo selection and photo deletion.
  - Instant status toggling (`Available`, `Reserved`, `Sold`).
- **Sell Requests Manager (`/admin/sell-requests`)**:
  - Filter and search incoming valuation requests.
  - Manage lead status workflows (`NEW`, `REVIEWING`, `CONTACTED`, `INSPECTION`, `OFFER_MADE`, `PURCHASED`, `REJECTED`, `CLOSED`).
- **Content Portfolios**:
  - Manage **Customer Delivery Stories** (`/admin/customer-stories`) with photo/video links.
  - Manage **Testimonials & Reviews** (`/admin/testimonials`) with star ratings and publish toggles.

---

### 🎨 Design & Atmosphere
- **Global Theme Engine**: Full Light/Dark theme adaptation via CSS variables (`graphite-*`, `brass-*`).
- **Studio Atmosphere**: Ambient monochrome studio spotlight with soft rim glows and film grain texture.
- **Automotive Aesthetic**: Registration plate typography and badges using Oswald, Inter, and JetBrains Mono.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Actions, SSR/ISR) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) with custom design tokens |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL with RLS policies) |
| **Media Hosting** | [Cloudinary](https://cloudinary.com/) (Asset CDN & Direct Upload API) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Validation** | [Zod](https://zod.dev/) (Shared client/server schemas) |

---

## 📁 Repository Structure

```
vs-auto-mart/
├── public/                     # Static brand assets, logos, and icons
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── (public)/
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── inventory/      # Live inventory search & filters
│   │   │   ├── cars/[slug]/    # Responsive vehicle detail view
│   │   │   ├── sell-your-car/  # 4-step seller onboarding wizard
│   │   │   ├── customers/      # Delivery stories showcase
│   │   │   ├── reviews/        # Customer reviews & testimonials
│   │   │   ├── about/          # Dealership background & location
│   │   │   └── faq/            # Frequently asked questions
│   │   └── admin/              # Staff management portal
│   │       ├── login/          # Secure staff login
│   │       └── (protected)/    # Auth-guarded admin routes
│   │           ├── vehicles/   # Inventory add & edit pages
│   │           ├── sell-requests/ # Customer selling inquiries
│   │           ├── customer-stories/ # Delivery stories CRUD
│   │           └── testimonials/     # Reviews CRUD
│   ├── components/             # Reusable UI component library
│   │   ├── admin/              # Admin dashboard widgets & forms
│   │   ├── home/               # Homepage hero, showcases, & trust sections
│   │   ├── sell-car/           # Multi-step sell car components
│   │   └── reviews/            # Review cards & rating displays
│   └── lib/                    # Shared libraries & utilities
│       ├── supabase/           # Server, client, and middleware Supabase SDKs
│       ├── validation/         # Zod schemas for forms and server actions
│       ├── email/              # Notification handlers
│       ├── types.ts            # Project-wide TypeScript definitions
│       └── utils.ts            # Currency (LKR), mileage, and slug helpers
└── supabase/                   # PostgreSQL schema migrations and RLS policies
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm, yarn, or pnpm
- A Supabase project and Cloudinary account

### 2. Environment Configuration
Copy the template and provide your API keys:

```bash
cp .env.local.example .env.local
```

Configure the following variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Dealership Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=94772500320
```

### 3. Install & Run Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be accessible at:
- **Public Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Build & Type Checking

```bash
# Run TypeScript validation
npx tsc --noEmit

# Run ESLint check
npm run lint

# Build production bundle
npm run build
```

---

## 🚢 Deployment

The repository is configured for zero-config deployment on [Vercel](https://vercel.com/):

1. Connect the GitHub repository to Vercel.
2. In **Project Settings → Environment Variables**, add the variables from `.env.local`.
3. Trigger a deployment. Vercel will build and deploy the production site with Edge middleware and serverless functions.
