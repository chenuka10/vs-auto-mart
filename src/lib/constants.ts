import type { GoogleReviewsConfig } from "@/lib/types";

// These are the fallback/last-known values, used if the live Places API
// call in lib/google-places.ts fails for any reason. The URLs below are
// static (Google account-issued), so they never need to come from the API.
export const GOOGLE_REVIEWS_CONFIG: GoogleReviewsConfig = {
  rating: 4.4,
  totalReviews: 52,
  googleReviewsUrl:
    "https://maps.google.com/?cid=1069641930314139576&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgBIAA",
  leaveReviewUrl: "https://g.page/r/CbjHPB2rIdgOEAE/review",
};

export const TESTIMONIALS_PAGE_SIZE = 6;