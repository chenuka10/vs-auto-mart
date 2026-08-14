import { StarRating } from "@/components/StarRating";
import { GOOGLE_REVIEWS_CONFIG } from "@/lib/constants";
import type { GoogleReviewsConfig } from "@/lib/types";

interface GoogleReviewSummaryCardProps {
  config?: GoogleReviewsConfig;
}

export function GoogleReviewSummaryCard({ config = GOOGLE_REVIEWS_CONFIG }: GoogleReviewSummaryCardProps) {
  const { rating, totalReviews, googleReviewsUrl, leaveReviewUrl } = config;

  return (
    <div className="flex flex-col items-center gap-4 rounded-[24px] border border-brass-500/20 bg-graphite-900/40 p-8 text-center sm:flex-row sm:justify-between sm:text-left shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <div>
        <StarRating rating={Math.round(rating)} className="justify-center sm:justify-start text-lg text-brass-400" />
        <p className="mt-2 font-display text-2xl font-semibold text-graphite-100">{rating.toFixed(1)} on Google</p>
        <p className="text-sm text-graphite-400">
          Based on {totalReviews.toLocaleString("en-LK")} reviews
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        
         <a href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-plate border border-brass-500/30 px-5 py-2.5 text-sm font-medium text-graphite-300 transition-colors hover:bg-graphite-900/60 hover:text-brass-400 hover:border-brass-500/50"
        >
          View Google Reviews
        </a>

        <a
          href={leaveReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-plate bg-gradient-gold px-5 py-2.5 text-sm font-medium text-graphite-950 transition-all hover:shadow-glow-gold hover:-translate-y-0.5"
        >
          Leave a Review
        </a>
      </div>
    </div>
  );
}