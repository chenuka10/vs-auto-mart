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
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
          <div>
            <span className="plate-tag border-brass-400/30 bg-transparent text-brass-400">
              Kadawatha, Sri Lanka
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Your Trusted Partner for Quality Vehicles in Sri Lanka
            </h1>
            <p className="mt-5 max-w-md text-graphite-300">
              Every vehicle inspected, every sale backed by real service —
              browse an inventory chosen for reliability, not just looks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/inventory"
                className="rounded-plate bg-brass-500 px-6 py-3 text-sm font-semibold text-graphite-950 transition hover:bg-brass-400"
              >
                Browse Vehicles
              </Link>
              <Link
                href="#contact"
                className="rounded-plate border border-paper/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/5"
              >
                Contact Us
              </Link>
              <WhatsAppButton variant="inline" label="WhatsApp Now" />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
            <Image
              src="/hero-showroom.jpg"
              alt="VS Auto Mart showroom"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured vehicles */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Featured Vehicles</h2>
            <Link href="/inventory" className="text-sm font-medium text-brass-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </section>
      )}

      {/* Latest arrivals */}
      {latest.length > 0 && (
        <section className="bg-graphite-100/60 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold">New Arrivals This Week</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold">Why Choose VS Auto Mart</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Years of Experience", body: "A family-run dealership built on repeat customers and referrals." },
            { title: "Quality Inspection", body: "Every vehicle checked mechanically before it's listed for sale." },
            { title: "Honest Service", body: "Straightforward pricing and no pressure — the details up front." },
            { title: "Wide Selection", body: "From city cars to family SUVs, sourced and vetted carefully." },
          ].map((item) => (
            <div key={item.title}>
              <p className="font-display text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-graphite-500">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Happy customers preview */}
      <section className="bg-graphite-950 py-16 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold">500+ Happy Customers</h2>
              <p className="mt-1 text-sm text-graphite-300">Real customers, real vehicles, real proof.</p>
            </div>
            <Link href="/customers" className="text-sm font-medium text-brass-400 hover:underline">
              View all customer stories →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {stories.map((story) => (
              <div key={story.id} className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
                <div className="relative aspect-[4/3] bg-graphite-700">
                  {story.customer_story_photos?.[0] && (
                    <Image
                      src={story.customer_story_photos[0].image_url}
                      alt={story.customer_name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="font-display font-semibold">Congratulations, {story.customer_name} 🎉</p>
                  <p className="mt-1 text-sm text-graphite-300">{story.vehicle_label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold">Visit or Reach Us</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3 text-sm">
          <div>
            <p className="font-semibold text-graphite-950">Phone</p>
            <p className="mt-1 text-graphite-500">+94 77 123 4567</p>
          </div>
          <div>
            <p className="font-semibold text-graphite-950">Location</p>
            <p className="mt-1 text-graphite-500">Kadawatha, Sri Lanka</p>
          </div>
          <div>
            <p className="font-semibold text-graphite-950">Hours</p>
            <p className="mt-1 text-graphite-500">Mon – Sat, 9am – 6pm</p>
          </div>
        </div>
      </section>
    </>
  );
}
