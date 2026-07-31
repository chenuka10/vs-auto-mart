import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import VehicleCard from "@/components/VehicleCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { VehicleWithImages, CustomerStory } from "@/lib/types";

export const revalidate = 60;

async function getHomepageData() {
  const supabase = await createClient();

  const [{ data: featured }, { data: latest }, { data: stories }] = await Promise.all([
    supabase
      .from("vehicles")
      .select("*, vehicle_images(*)")
      .eq("is_featured", true)
      .eq("status", "available")
      .order("date_added", { ascending: false })
      .limit(6),
    supabase
      .from("vehicles")
      .select("*, vehicle_images(*)")
      .eq("status", "available")
      .order("date_added", { ascending: false })
      .limit(4),
    supabase
      .from("customer_stories")
      .select("*, customer_story_photos(*)")
      .eq("is_published", true)
      .order("delivery_date", { ascending: false })
      .limit(3),
  ]);

  return {
    featured: (featured ?? []) as VehicleWithImages[],
    latest: (latest ?? []) as VehicleWithImages[],
    stories: (stories ?? []) as CustomerStory[],
  };
}

export default async function HomePage() {
  const { featured, latest, stories } = await getHomepageData();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-graphite-950 text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,169,81,0.10),transparent_45%)]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
          <div className="animate-[fadeInUp_0.7s_ease-out]">
            <span className="plate-tag border-brass-400/30 bg-transparent text-brass-400">
              Kadawatha, Sri Lanka
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Your Trusted Partner for{" "}
              <span className="text-brass-400">Quality Vehicles</span> in Sri Lanka
            </h1>
            <p className="mt-5 max-w-md text-graphite-300">
              Every vehicle inspected, every sale backed by real service —
              browse an inventory chosen for reliability, not just looks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/inventory"
                className="group rounded-plate bg-brass-500 px-6 py-3 text-sm font-semibold text-graphite-950 shadow-[0_0_0_0_rgba(200,169,81,0)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-400 hover:shadow-[0_8px_24px_-4px_rgba(200,169,81,0.45)]"
              >
                Browse Vehicles
                <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="#contact"
                className="rounded-plate border border-paper/20 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-paper/40 hover:bg-white/5"
              >
                Contact Us
              </Link>
              <WhatsAppButton variant="inline" label="WhatsApp Now" />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
            <Image
              src="/hero-showroom.jpg"
              alt="VS Auto Mart showroom"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Featured vehicles */}
      {featured.length > 0 && (
        <section className="bg-charcoal-900 py-16 text-paper">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
                  Handpicked
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">Featured Vehicles</h2>
              </div>
              <Link
                href="/inventory"
                className="group text-sm font-medium text-brass-400 transition-colors hover:text-brass-300"
              >
                View all
                <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((vehicle, i) => (
                <div
                  key={vehicle.id}
                  className="group rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.6)]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest arrivals */}
      {latest.length > 0 && (
        <section className="bg-graphite-950 py-16 text-paper">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
              Just In
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold">New Arrivals This Week</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="group rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.6)]"
                >
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="bg-charcoal-900 py-16 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-semibold">Why Choose VS Auto Mart</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Years of Experience", body: "A family-run dealership built on repeat customers and referrals." },
              { title: "Quality Inspection", body: "Every vehicle checked mechanically before it's listed for sale." },
              { title: "Honest Service", body: "Straightforward pricing and no pressure — the details up front." },
              { title: "Wide Selection", body: "From city cars to family SUVs, sourced and vetted carefully." },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/30 hover:bg-white/[0.03]"
              >
                <div className="h-0.5 w-8 bg-brass-500 transition-all duration-300 group-hover:w-12" />
                <p className="mt-4 font-display text-lg font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-graphite-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy customers preview */}
      <section className="bg-graphite-950 py-16 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
                Trusted
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">500+ Happy Customers</h2>
              <p className="mt-1 text-sm text-graphite-300">Real customers, real vehicles, real proof.</p>
            </div>
            <Link
              href="/customers"
              className="group hidden text-sm font-medium text-brass-400 transition-colors hover:text-brass-300 sm:inline-block"
            >
              View all stories
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {stories.map((story) => (
              <div
                key={story.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/30 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.6)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-graphite-700">
                  {story.customer_story_photos?.[0] && (
                    <Image
                      src={story.customer_story_photos[0].image_url}
                      alt={story.customer_name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <p className="font-display font-semibold">
                    Congratulations, {story.customer_name} <span className="text-brass-400">🎉</span>
                  </p>
                  <p className="mt-1 text-sm text-graphite-300">{story.vehicle_label}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/customers"
            className="mt-8 block text-center text-sm font-medium text-brass-400 transition-colors hover:text-brass-300 sm:hidden"
          >
            View all customer stories →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-charcoal-900 py-16 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-semibold">Visit or Reach Us</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3 text-sm">
            {[
              { label: "Phone", value: "+94 77 123 4567" },
              { label: "Location", value: "Kadawatha, Sri Lanka" },
              { label: "Hours", value: "Mon – Sat, 9am – 6pm" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/5 p-5 transition-colors duration-300 hover:border-brass-500/30"
              >
                <p className="font-semibold text-paper">{item.label}</p>
                <p className="mt-1 text-graphite-300">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}