import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CustomerStory } from "@/lib/types";
import { getPublishedTestimonials, getPublishedTestimonialsCount } from "@/lib/queries";
import { getGooglePlaceRating } from "@/lib/google-places";
import { TESTIMONIALS_PAGE_SIZE, GOOGLE_REVIEWS_CONFIG } from "@/lib/constants";
import { GoogleReviewSummaryCard } from "@/components/reviews/GoogleReviewSummaryCard";
import { TestimonialsSection } from "@/components/reviews/TestimonialsSection";
import { DeliveryGallery } from "@/components/gallery/DeliveryGallery";

export const metadata = {
  title: "Happy Customers & Reviews — VS Auto Mart Kadawatha",
  description:
    "500+ happy customers and counting — real deliveries, real smiles, and real Google reviews from VS Auto Mart, the premier Kadawatha car sale.",
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

async function getReviewsData() {
  const supabase = await createClient();
  const [testimonials, totalCount, liveRating] = await Promise.all([
    getPublishedTestimonials(supabase, { limit: TESTIMONIALS_PAGE_SIZE, offset: 0 }),
    getPublishedTestimonialsCount(supabase),
    getGooglePlaceRating(),
  ]);

  const googleConfig = {
    ...GOOGLE_REVIEWS_CONFIG,
    ...(liveRating && { rating: liveRating.rating, totalReviews: liveRating.totalReviews }),
  };

  return { testimonials, totalCount, googleConfig };
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
  const [stories, { testimonials, totalCount, googleConfig }] = await Promise.all([
    getStories(),
    getReviewsData(),
  ]);

  /* Split into photo stories and video stories */
  const photoStories = stories.filter(
    (s) => (s.customer_story_photos ?? []).length > 0
  );
  const videoStories = stories.filter((s) => s.video_url);

  /* Build a flat photo list for the gallery (up to 3 per story) */
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

  const galleryItems = photoWall.map((item) => ({
    image: item.url,
    text: item.vehicle ? `${item.customer} — ${item.vehicle}` : item.customer,
  }));

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

          <h1 className="animate-fade-up animation-delay-100 mt-4 font-display text-4xl font-bold tracking-tight text-graphite-100 sm:text-5xl lg:text-6xl">
            Happy Customers
          </h1>

          <p className="animate-fade-up animation-delay-200 mx-auto mt-5 max-w-2xl text-base leading-8 text-graphite-400 sm:text-lg">
            Every photo here is a real customer, a real delivery, and a real
            smile — the trust that keeps VS Auto Mart moving forward.
          </p>

          {/* Stats pills */}
          <div className="animate-fade-up animation-delay-300 mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-full border border-graphite-700/30 bg-graphite-900/60 px-5 py-2 text-sm font-medium text-graphite-200 backdrop-blur-xl">
              500+ Deliveries
            </div>
            <div className="rounded-full border border-brass-500/25 bg-brass-500/10 px-5 py-2 text-sm font-semibold text-brass-400 backdrop-blur-xl">
              ★ 5-Star Rated
            </div>
            <div className="rounded-full border border-graphite-700/30 bg-graphite-900/60 px-5 py-2 text-sm font-medium text-graphite-200 backdrop-blur-xl">
              Since 2012
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            GOOGLE RATING SUMMARY
        ══════════════════════════════════════ */}
        <section className="mx-auto mt-12 max-w-4xl sm:mt-16">
          <GoogleReviewSummaryCard config={googleConfig} />
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

            <DeliveryGallery items={galleryItems} />
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
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-graphite-700/20 bg-graphite-900/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-brass-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
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
                      <p className="font-display text-base font-semibold text-graphite-100">
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
            WRITTEN REVIEWS
        ══════════════════════════════════════ */}
        {testimonials.length > 0 && (
          <section id="reviews" className="mt-20 scroll-mt-24 sm:mt-28">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-brass-500/40 to-transparent" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-500">
                What Customers Say
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-brass-500/40 to-transparent" />
            </div>

            <TestimonialsSection initialTestimonials={testimonials} totalCount={totalCount} />
          </section>
        )}

        {/* ══════════════════════════════════════
            EMPTY STATE
        ══════════════════════════════════════ */}
        {stories.length === 0 && (
          <section className="mt-20 rounded-3xl border border-graphite-700/20 bg-graphite-900/30 px-8 py-24 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brass-500/20 bg-brass-500/10">
              <svg className="h-8 w-8 text-brass-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-graphite-100">
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
          <div className="relative overflow-hidden rounded-[28px] border border-brass-500/20 bg-graphite-900/50 px-8 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:px-12">
            {/* Glow */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brass-500/10 blur-[80px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brass-500/10 blur-[80px]" />

            <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-brass-500">
              Your story could be next
            </p>

            <h2 className="relative mt-4 font-display text-2xl font-bold text-graphite-100 sm:text-3xl">
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

              <a
                href={GOOGLE_REVIEWS_CONFIG.leaveReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-graphite-700/40 bg-graphite-900/60 px-8 py-3.5 text-sm font-medium text-graphite-200 backdrop-blur-sm transition-all hover:border-brass-500/40 hover:text-brass-400"
              >
                Leave a Google Review
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}