import { StarRating } from "@/components/StarRating";
import { GOOGLE_REVIEWS_CONFIG } from "@/lib/constants";
import type { GoogleReviewsConfig } from "@/lib/types";
import { a } from "framer-motion/client";

interface GoogleReviewSummaryCardProps {
  config?: GoogleReviewsConfig;
}

export function GoogleReviewSummaryCard({ config = GOOGLE_REVIEWS_CONFIG }: GoogleReviewSummaryCardProps) {
  const { rating, totalReviews, googleReviewsUrl, leaveReviewUrl } = config;

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-graphite-700/10 bg-white p-8 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <StarRating rating={Math.round(rating)} className="justify-center sm:justify-start text-lg" />
        <p className="mt-2 font-display text-2xl font-semibold">{rating.toFixed(1)} on Google</p>
        <p className="text-sm text-graphite-500">
          Based on {totalReviews.toLocaleString("en-LK")} reviews
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-graphite-700/10 px-5 py-2.5 text-sm font-medium hover:bg-graphite-100"
        <a>
          View Google Reviews
        </a>

        <a
          href={leaveReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-brass-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brass-700"
        >
          Leave a Review
        </a>
      </div>
    </div>
  );
}