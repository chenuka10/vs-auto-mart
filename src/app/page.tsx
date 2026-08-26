import { createClient } from "@/lib/supabase/server";
import { PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS } from "@/lib/queries";
import type { PublicVehicleWithImages } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

import Hero from "@/components/home/Hero";
import TrustStats from "@/components/home/TrustStats";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LocationSection from "@/components/home/LocationSection";
import VideoShowcase from "@/components/home/VideoShowcase";
import SellCarBanner from "@/components/SellCarBanner";

export const revalidate = 60;

async function getHomepageData() {
  const supabase = await createClient();

  const { data: featured } = await supabase
    .from("vehicles")
    .select(PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS)
    .eq("is_featured", true)
    .eq("status", "available")
    .order("date_added", { ascending: false })
    .limit(6);

  return {
    featured: (featured ?? []) as PublicVehicleWithImages[],
  };
}

export default async function HomePage() {
  const { featured } = await getHomepageData();

  return (
    <main className="relative isolate overflow-hidden text-graphite-100">
      {/* =====================================================
          FULL-SCREEN HERO
      ===================================================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-center">
        <Hero />
      </section>

      {/* =====================================================
          CAR SHOWCASE COLLAGE (STANDALONE SECTION)
      ===================================================== */}
      <section className="relative pt-12 sm:pt-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Subtle surrounding glow */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-brass-500/20 via-transparent to-brass-500/20 opacity-60 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-black/60 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
              {/* ── COLLAGE GRID ── */}
              <div
                className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] md:grid-rows-2"
                style={{
                  minHeight: "clamp(380px, 45vw, 560px)",
                }}
              >
                {/* LEFT: Large Hero Image */}
                <div className="group relative min-h-[260px] md:min-h-0 md:row-span-2 md:col-start-1 overflow-hidden">
                  <Image
                    src="/Collage/1.jpeg"
                    alt="VS Auto Mart featured vehicle – Renault Kwid"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  {/* Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-brass-500/40 bg-black/60 px-4 py-1.5 backdrop-blur-md">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-brass-500 shadow-[0_0_8px_rgba(212,175,55,0.9)]" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brass-400">
                      Our Fleet
                    </span>
                  </div>
                </div>

                {/* RIGHT-TOP */}
                <div className="group relative min-h-[180px] md:min-h-0 md:row-start-1 md:col-start-2 overflow-hidden border-t md:border-t-0 md:border-l border-white/[0.08]">
                  <Image
                    src="/Collage/2.jpeg"
                    alt="VS Auto Mart featured vehicle – Suzuki Celerio grey"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* RIGHT-BOTTOM: Two Column Split */}
                <div className="relative grid grid-cols-2 md:row-start-2 md:col-start-2 border-t md:border-l border-white/[0.08]">
                  {/* Bottom-left */}
                  <div className="group relative min-h-[160px] md:min-h-0 overflow-hidden">
                    <Image
                      src="/Collage/3.jpeg"
                      alt="VS Auto Mart featured vehicle – Perodua Bezza"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Bottom-right */}
                  <div className="group relative min-h-[160px] md:min-h-0 overflow-hidden border-l border-white/[0.08]">
                    <Image
                      src="/Collage/4.jpeg"
                      alt="VS Auto Mart featured vehicle – Suzuki Celerio blue"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tl from-brass-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              </div>

              {/* ── BOTTOM LABEL BAR ── */}
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] bg-black/70 px-6 py-4 backdrop-blur-xl sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-brass-500" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brass-400 text-center sm:text-left">
                    Quality vehicles · Kadawatha, Sri Lanka
                  </span>
                </div>
                <Link
                  href="/inventory"
                  className="group flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:border-brass-500/50 hover:bg-brass-500/10 hover:text-brass-400"
                >
                  Explore Inventory
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
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
          TRUST STATS
      ===================================================== */}
      <section className="relative mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-graphite-700/20 bg-graphite-900/40 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
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
          SELL YOUR CAR
      ===================================================== */}
      <section className="relative mt-16 sm:mt-24 bg-gradient-to-r from-brass-500/[0.03] via-transparent to-brass-500/[0.03]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SellCarBanner />
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}
      <section className="relative mt-20 sm:mt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-graphite-700/20 bg-graphite-900/40 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brass-500/[0.12] blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-brass-500/[0.04] blur-[110px]"
            />
            <div className="relative px-5 py-10 sm:px-10 sm:py-14 lg:px-14">
              <WhyChooseUs />
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
          LOCATION
      ===================================================== */}
      <section className="relative mt-20 sm:mt-32">
        <LocationSection />
      </section>
    </main>
  );
}