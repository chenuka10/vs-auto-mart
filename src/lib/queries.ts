/**
 * Column list for any query that runs on a public page (homepage, inventory,
 * vehicle detail, sitemap). Deliberately excludes `registration_no` (plate
 * number) and `created_by` — those are admin-only and must never reach a
 * public response, even though the anon key can technically read the row
 * (RLS in this schema is row-level, not column-level).
 *
 * Admin pages should keep using `select("*")` so staff can see everything.
 */
export const PUBLIC_VEHICLE_COLUMNS = `
  id, slug, brand, model, year, price, mileage_km, fuel, transmission,
  engine_capacity, colour, condition, description, location, status,
  is_featured, video_url, date_added, date_sold
`;

export const PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS = `${PUBLIC_VEHICLE_COLUMNS}, vehicle_images(*)`;
