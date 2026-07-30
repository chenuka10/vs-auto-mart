import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: vehicles } = await supabase.from("vehicles").select("slug, date_added");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://vsautomart.lk", changeFrequency: "daily", priority: 1 },
    { url: "https://vsautomart.lk/inventory", changeFrequency: "daily", priority: 0.9 },
    { url: "https://vsautomart.lk/customers", changeFrequency: "weekly", priority: 0.6 },
    { url: "https://vsautomart.lk/about", changeFrequency: "monthly", priority: 0.4 },
  ];

  const vehicleRoutes: MetadataRoute.Sitemap = (vehicles ?? []).map((v) => ({
    url: `https://vsautomart.lk/cars/${v.slug}`,
    lastModified: v.date_added,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
