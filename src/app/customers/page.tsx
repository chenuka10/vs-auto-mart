import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CustomerStory } from "@/lib/types";

export const metadata = {
  title: "Happy Customers — VS Auto Mart Kadawatha",
  description:
    "500+ happy customers and counting — real deliveries, real smiles, real stories from VS Auto Mart, the premier Kadawatha car sale.",
  keywords: [
    "Kadawatha car sale reviews",
    "VS Auto Mart happy customers",
    "trusted car dealers Kadawatha",
    "used cars Sri Lanka deliveries",
    "VS Auto Mart customer stories",
  ],
};

async function getStories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("customer_stories")
    .select("*, customer_story_photos(*)")
    .eq("is_published", true)
    .order("delivery_date", { ascending: false });
  return (data ?? []) as CustomerStory[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-LK", {
    month: "long",
    year: "numeric",
  });
}

/* ─── tiny YouTube thumbnail helper ─── */
function getYouTubeThumbnail(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`;
  }
  return null;
}

export default async function HappyCustomersPage() {
  const stories = await getStories();

  /* Split into photo stories and video stories */
  const photoStories = stories.filter(
    (s) => (s.customer_story_photos ?? []).length > 0
  );
  const videoStories = stories.filter((s) => s.video_url);

  /* Build a flat photo list for the masonry wall (up to 3 per story) */
  const photoWall: { url: string; customer: string; vehicle: string | null; date: string }[] = [];
  for (const story of photoStories) {
    const photos = (story.customer_story_photos ?? []).slice(0, 3);
    for (const photo of photos) {
      photoWall.push({
        url: photo.image_url,
        customer: story.customer_name,
        vehicle: story.vehicle_label ?? null,
        date: story.delivery_date,
      });
    }
  }

  return (
    <main className="relative overflow-hidden">
      {/* ── ambient bg ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute -left-32 top-10 h-[36rem] w-[36rem] rounded-full bg-brass-500/[0.08] blur-[140px]" />
        <div className="absolute right-0 top-[40rem] h-[30rem] w-[30rem] rounded-full bg-white/[0.03] blur-[130px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">

        {/* ══════════════════════════════════════
            HERO HEADER
        ══════════════════════════════════════ */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-brass-500">
            Real Customers · Real Deliveries
          </p>

          <h1 className="animate-fade-up animation-delay-100 mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Happy Customers
          </h1>

          <p className="animate-fade-up animation-delay-200 mx-auto mt-5 max-w-2xl text-base leading-8 text-graphite-400 sm:text-lg">
            Every photo here is a real customer, a real delivery, and a real
            smile — the trust that keeps VS Auto Mart moving forward.
          </p>

          {/* Stats pills */}
          <div className="animate-fade-up animation-delay-300 mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-xl">
              500+ Deliveries
            </div>
            <div className="rounded-full border border-brass-500/25 bg-brass-500/10 px-5 py-2 text-sm font-semibold text-brass-400 backdrop-blur-xl">
              ★ 5-Star Rated
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-xl">
              Since 2012
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PHOTO MOSAIC WALL
        ══════════════════════════════════════ */}
        {photoWall.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-brass-500/40 to-transparent" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-500">
                Delivery Gallery
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-brass-500/40 to-transparent" />
            </div>

            {/* Responsive masonry-style grid */}
            <div
              className="grid gap-3 sm:gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              }}
            >
              {photoWall.map((item, i) => (
                <div
                  key={`${item.url}-${i}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  style={{
                    /* Give every 4th item a taller span for visual variety */
                    gridRow: (i + 1) % 5 === 0 ? "span 2" : "span 1",
                    aspectRatio: (i + 1) % 5 === 0 ? "3/4" : "4/3",
                  }}
                >
                  <Image
                    src={item.url}
                    alt={`${item.customer} with their ${item.vehicle ?? "vehicle"}`}
                    fill
                    priority={i < 6}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* Gradient overlay — slides up on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                  {/* Info reveal on hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-semibold text-white">
                      {item.customer} 🎉
                    </p>
                    {item.vehicle && (
                      <p className="mt-0.5 text-xs text-white/70">
                        {item.vehicle}
                      </p>
                    )}
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-brass-400">
                      {formatDate(item.date)}
                    </p>
                  </div>

                  {/* Always-visible subtle badge */}
                  <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
                    Delivery
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            VIDEO STORIES
        ══════════════════════════════════════ */}
        {videoStories.length > 0 && (
          <section className="mt-20 sm:mt-28">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-brass-500/40 to-transparent" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-500">
                Delivery Videos
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-brass-500/40 to-transparent" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videoStories.map((story, i) => {
                const thumb = getYouTubeThumbnail(story.video_url!);
                const primaryPhoto =
                  (story.customer_story_photos ?? [])[0]?.image_url ?? null;
                const bgImage = thumb ?? primaryPhoto;

                return (
                  <a
                    key={story.id}
                    href={story.video_url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-brass-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                    style={{ animationDelay: `${Math.min(i * 80, 480)}ms` }}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-graphite-900">
                      {bgImage ? (
                        <Image
                          src={bgImage}
                          alt={`${story.customer_name} delivery video`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-graphite-900">
                          <svg className="h-10 w-10 text-graphite-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                        </div>
                      )}

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-brass-500/60 group-hover:bg-brass-500/20">
                          <svg
                            className="h-6 w-6 translate-x-0.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Watch label */}
                      <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        Watch Delivery
                      </div>
                    </div>

                    {/* Card bottom info */}
                    <div className="flex flex-col gap-1 p-4 sm:p-5">
                      <p className="font-display text-base font-semibold text-white">
                        {story.customer_name} 🎉
                      </p>

                      {story.vehicle_label && (
                        <p className="text-sm text-graphite-400">
                          {story.vehicle_label}
                        </p>
                      )}

                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-500">
                        {formatDate(story.delivery_date)}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            EMPTY STATE
        ══════════════════════════════════════ */}
        {stories.length === 0 && (
          <section className="mt-20 rounded-3xl border border-white/[0.08] bg-white/[0.02] px-8 py-24 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brass-500/20 bg-brass-500/10">
              <svg className="h-8 w-8 text-brass-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-white/90">
              Stories coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-graphite-400">
              We are collecting our latest customer stories. Check back soon!
            </p>
          </section>
        )}

        {/* ══════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════ */}
        <section className="mt-20 sm:mt-28">
          <div className="relative overflow-hidden rounded-[28px] border border-brass-500/20 bg-black/40 px-8 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:px-12">
            {/* Glow */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brass-500/10 blur-[80px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brass-500/10 blur-[80px]" />

            <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-brass-500">
              Your story could be next
            </p>

            <h2 className="relative mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to find your next car?
            </h2>

            <p className="relative mx-auto mt-3 max-w-xl text-sm leading-7 text-graphite-400">
              Join hundreds of happy customers who trusted VS Auto Mart for
              their next vehicle — quality cars, honest service.
            </p>

            <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/inventory"
                className="group flex items-center gap-2 rounded-xl bg-brass-500 px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-brass-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                Browse Inventory
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link
                href="/reviews"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-brass-500/40 hover:text-brass-400"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}