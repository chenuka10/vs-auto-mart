/**
 * Column list for any query that runs on a public page (homepage, inventory,
 * vehicle detail, sitemap). Deliberately excludes `registration_no` (plate
 * number) and `created_by` — those are admin-only and must never reach a
 * public response, even though the anon key can technically read the row
 * (RLS in this schema is row-level, not column-level).
 *
 * Admin pages should keep using `select("*")` so staff can see everything.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Testimonial } from "@/lib/types";

export const PUBLIC_VEHICLE_COLUMNS = `
  id, slug, brand, model, year, price, mileage_km, fuel, transmission,
  engine_capacity, colour, condition, description, location, status,
  is_featured, video_url, date_added, date_sold
`;

export const PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS = `${PUBLIC_VEHICLE_COLUMNS}, vehicle_images(*)`;

export const PUBLISHED_TESTIMONIAL_COLUMNS =
  "id, reviewer_name, rating, review_text, photo_url, video_url, is_published, created_at";

export async function getPublishedTestimonials(
  supabase: SupabaseClient,
  { limit, offset }: { limit: number; offset: number }
): Promise<Testimonial[]> {
  const { data } = await supabase
    .from("testimonials")
    .select(PUBLISHED_TESTIMONIAL_COLUMNS)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  return (data ?? []) as Testimonial[];
}

export async function getPublishedTestimonialsCount(
  supabase: SupabaseClient
): Promise<number> {
  const { count } = await supabase
    .from("testimonials")
    .select("id", { count: "exact", head: true })
    .eq("is_published", true);
  return count ?? 0;
}
