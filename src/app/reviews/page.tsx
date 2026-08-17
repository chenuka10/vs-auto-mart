import { createClient } from "@/lib/supabase/server";
import { getPublishedTestimonials, getPublishedTestimonialsCount } from "@/lib/queries";
import { getGooglePlaceRating } from "@/lib/google-places";
import { TESTIMONIALS_PAGE_SIZE, GOOGLE_REVIEWS_CONFIG } from "@/lib/constants";
import { GoogleReviewSummaryCard } from "@/components/reviews/GoogleReviewSummaryCard";
import { TestimonialsSection } from "@/components/reviews/TestimonialsSection";

export const metadata = {
  title: "Customer Reviews",
  description: "Real experiences from customers who trusted VS Auto Mart.",
};

export default async function ReviewsPage() {
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold">Customer Reviews</h1>
      <p className="mt-2 max-w-xl text-graphite-500">
        Real experiences from customers who trusted VS Auto Mart.
      </p>

      <div className="mt-10">
        <GoogleReviewSummaryCard config={googleConfig} />
      </div>

      <div className="mt-14">
        <TestimonialsSection initialTestimonials={testimonials} totalCount={totalCount} />
      </div>

      <div className="mt-16 rounded-[24px] border border-graphite-700/20 bg-graphite-900/50 p-8 text-center backdrop-blur-md">
        <h2 className="font-display text-xl font-semibold text-graphite-100">Loved your experience?</h2>
        <p className="mt-2 text-sm text-graphite-400">
          A quick Google review helps other buyers trust VS Auto Mart too.
        </p>

        <a
          href={GOOGLE_REVIEWS_CONFIG.leaveReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-plate bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-graphite-950 transition-all hover:shadow-glow-gold hover:-translate-y-0.5"
        >
          Leave a Google Review
        </a>
      </div>
    </div>
  );
}