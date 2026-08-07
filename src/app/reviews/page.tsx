import { createClient } from "@/lib/supabase/server";
import { getPublishedTestimonials, getPublishedTestimonialsCount } from "@/lib/queries";
import { TESTIMONIALS_PAGE_SIZE, GOOGLE_REVIEWS_CONFIG } from "@/lib/constants";
import { GoogleReviewSummaryCard } from "@/components/reviews/GoogleReviewSummaryCard";
import { TestimonialsSection } from "@/components/reviews/TestimonialsSection";

export const metadata = {
  title: "Customer Reviews",
  description: "Real experiences from customers who trusted VS Auto Mart.",
};

export default async function ReviewsPage() {
  const supabase = await createClient();
  const [testimonials, totalCount] = await Promise.all([
    getPublishedTestimonials(supabase, { limit: TESTIMONIALS_PAGE_SIZE, offset: 0 }),
    getPublishedTestimonialsCount(supabase),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold">Customer Reviews</h1>
      <p className="mt-2 max-w-xl text-graphite-500">
        Real experiences from customers who trusted VS Auto Mart.
      </p>

      <div className="mt-10">
        <GoogleReviewSummaryCard />
      </div>

      <div className="mt-14">
        <TestimonialsSection initialTestimonials={testimonials} totalCount={totalCount} />
      </div>

      <div className="mt-16 rounded-lg border border-graphite-700/10 bg-graphite-100 p-8 text-center">
        <h2 className="font-display text-xl font-semibold">Loved your experience?</h2>
        <p className="mt-2 text-sm text-graphite-500">
          A quick Google review helps other buyers trust VS Auto Mart too.
        </p>
        <a
          href={GOOGLE_REVIEWS_CONFIG.leaveReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-brass-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brass-700"
        >
          Leave a Google Review
        </a>
      </div>
    </div>
  );
}