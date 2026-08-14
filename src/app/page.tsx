import { createClient } from "@/lib/supabase/server";
import { PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS } from "@/lib/queries";
import type {
  PublicVehicleWithImages,
  CustomerStory,
} from "@/lib/types";
import Link from "next/link";

import Hero from "@/components/home/Hero";
import TrustStats from "@/components/home/TrustStats";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import LocationSection from "@/components/home/LocationSection";
import VideoShowcase from "@/components/home/VideoShowcase";

export const revalidate = 60;

async function getHomepageData() {
  const supabase = await createClient();

  const [{ data: featured }, { data: stories }] = await Promise.all([
    supabase
      .from("vehicles")
      .select(PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS)
      .eq("is_featured", true)
      .eq("status", "available")
      .order("date_added", { ascending: false })
      .limit(6),

    supabase
      .from("customer_stories")
      .select("*, customer_story_photos(*)")
      .eq("is_published", true)
      .order("delivery_date", { ascending: false })
      .limit(5),
  ]);

  return {
    featured: (featured ?? []) as PublicVehicleWithImages[],
    stories: (stories ?? []) as CustomerStory[],
  };
}

export default async function HomePage() {
  const { featured, stories } = await getHomepageData();

  return (
    <main className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c1500] via-[#080808] to-black text-white">
      {/* =====================================================
          GLOBAL ATMOSPHERE (ENHANCED FOR LIQUID GLASS)
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 -top-32 h-[45rem] w-[45rem] rounded-full bg-brass-500/[0.15] blur-[160px]" />
        <div className="absolute right-[-15rem] top-[22rem] h-[42rem] w-[42rem] rounded-full bg-white/[0.05] blur-[150px]" />
        <div className="absolute left-[15%] top-[78rem] h-[40rem] w-[40rem] rounded-full bg-brass-600/[0.08] blur-[150px]" />
        <div className="absolute right-[10%] top-[150rem] h-[32rem] w-[32rem] rounded-full bg-white/[0.03] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0, transparent 140px, rgba(255,255,255,0.7) 141px, transparent 142px)",
          }}
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative">
        <Hero />

        {/* =====================================================
            CAR COLLAGE
        ===================================================== */}
        <div className="relative z-20 mx-auto -mt-16 w-full max-w-7xl px-5 sm:-mt-24 sm:px-6 lg:px-8">
          {/* Outer glow */}
          <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-brass-500/30 via-transparent to-brass-500/30 opacity-70 blur-3xl pointer-events-none" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-black/50 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-3xl">

            {/* ── COLLAGE GRID ── */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: "1.15fr 0.85fr",
                gridTemplateRows: "1fr 1fr",
                height: "clamp(360px, 50vw, 580px)",
              }}
            >
              {/* LEFT – large hero portrait (rows 1-2) */}
              <div
                className="group relative overflow-hidden"
                style={{ gridRow: "1 / 3", gridColumn: "1" }}
              >
                <img
                  src="/Collage/1.jpeg"
                  alt="VS Auto Mart vehicle – Renault Kwid"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Live badge */}
                <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-brass-500/40 bg-black/55 px-4 py-1.5 backdrop-blur-md">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brass-500 shadow-[0_0_8px_rgba(212,175,55,0.9)]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brass-400">Our Fleet</span>
                </div>
              </div>

              {/* RIGHT-TOP – portrait */}
              <div
                className="group relative overflow-hidden border-l border-white/[0.08]"
                style={{ gridRow: "1", gridColumn: "2" }}
              >
                <img
                  src="/Collage/2.jpeg"
                  alt="VS Auto Mart vehicle – Suzuki Celerio grey"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* RIGHT-BOTTOM row split into two columns */}
              <div
                className="relative grid border-l border-white/[0.08] border-t border-white/[0.08]"
                style={{
                  gridRow: "2",
                  gridColumn: "2",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                {/* Bottom-left portrait */}
                <div className="group relative overflow-hidden">
                  <img
                    src="/Collage/3.jpeg"
                    alt="VS Auto Mart vehicle – Perodua Bezza"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Bottom-right portrait + gold accent overlay */}
                <div className="group relative overflow-hidden border-l border-white/[0.08]">
                  <img
                    src="/Collage/4.jpeg"
                    alt="VS Auto Mart vehicle – Suzuki Celerio blue"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.06]"
                  />
                  {/* Subtle gold tint on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-brass-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            {/* ── BOTTOM LABEL BAR ── */}
            <div className="relative flex items-center justify-between gap-4 border-t border-white/[0.08] bg-black/60 px-6 py-4 backdrop-blur-xl sm:px-8">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-brass-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brass-400">
                  Quality vehicles · Kadawatha, Sri Lanka
                </span>
              </div>
              <Link
                href="/inventory"
                className="group flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:border-brass-500/50 hover:bg-brass-500/10 hover:text-brass-400"
              >
                Explore Inventory
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST
      ===================================================== */}
      <section className="relative mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.02] shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-brass-500/[0.1] blur-[90px]"
            />
            <div className="relative px-5 py-8 sm:px-8 sm:py-10">
              <TrustStats />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VIDEO
      ===================================================== */}
      <section className="relative mt-20 sm:mt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-500/[0.08] blur-[120px]"
        />
        <VideoShowcase />
      </section>

      {/* =====================================================
          FEATURED VEHICLES GRID
      ===================================================== */}
      {featured.length > 0 && (
        <section className="relative mt-20 sm:mt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brass-500/[0.08] blur-[120px]"
          />
          <FeaturedVehicles vehicles={featured} />
        </section>
      )}

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}
      <section className="relative mt-20 sm:mt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.02] shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brass-500/[0.12] blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/[0.04] blur-[110px]"
            />
            <div className="relative px-5 py-10 sm:px-10 sm:py-14 lg:px-14">
              <WhyChooseUs />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}
      <section className="relative mt-20 sm:mt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-10rem] top-1/3 h-96 w-96 rounded-full bg-brass-500/[0.06] blur-[130px]"
        />
        <Testimonials stories={stories} />
      </section>

      {/* =====================================================
          LOCATION
      ===================================================== */}
      <section className="relative mt-20 sm:mt-32">
        <LocationSection />
      </section>
    </main>
  );
}