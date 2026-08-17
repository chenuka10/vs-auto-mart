import "server-only";

interface GooglePlaceRating {
  rating: number;
  totalReviews: number;
}

// Runs only on the server — the API key never reaches the client bundle.
// Falls back to null on any failure so the page can fall back to the
// last known static values in GOOGLE_REVIEWS_CONFIG instead of breaking.
export async function getGooglePlaceRating(): Promise<GooglePlaceRating | null> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) return null;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 21600 } }); // refresh every 6h
    const data = await res.json();

    if (data.status !== "OK" || typeof data.result?.rating !== "number") return null;

    return {
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total ?? 0,
    };
  } catch {
    return null;
  }
}