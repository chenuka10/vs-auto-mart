import type { GoogleReviewsConfig } from "@/lib/types";

// Values are hardcoded for now. Swap `GOOGLE_REVIEWS_CONFIG` for a live
// Google Places API fetch later — every component that uses it already
// accepts an optional `config` prop, so no callers need to change.
export const GOOGLE_REVIEWS_CONFIG: GoogleReviewsConfig = {
  rating: 4.9,
  totalReviews: 214,
  googleReviewsUrl: "https://www.google.com/maps/place/VS+Auto+Mart/reviews",
  leaveReviewUrl: "https://g.page/r/YOUR_GOOGLE_PLACE_ID/review",
};

export const TESTIMONIALS_PAGE_SIZE = 6;