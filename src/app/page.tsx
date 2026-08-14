import { createClient } from "@/lib/supabase/server";
import { PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS } from "@/lib/queries";
import type { PublicVehicleWithImages, CustomerStory } from "@/lib/types";

import Hero from "@/components/home/Hero";
import TrustStats from "@/components/home/TrustStats";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import VehicleSearch from "@/components/home/VehicleSearch";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import LocationSection from "@/components/home/LocationSection";
import Footer from "@/components/home/Footer";
import VideoShowcase from "@/components/home/VideoShowcase";
import SellCarBanner from "@/components/SellCarBanner";

export const revalidate = 60;

async function getHomepageData() {
  const supabase = await createClient();

  const [{ data: featured }, { data: stories }] = await Promise.all([
    supabase
      .from("vehicles")
      .select(PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS)
      .eq("is_featured", true)
      .eq("status", "available")
      .order("date_added", { ascending: false })
      .limit(6),
    supabase
      .from("customer_stories")
      .select("*, customer_story_photos(*)")
      .eq("is_published", true)
      .order("delivery_date", { ascending: false })
      .limit(5),
  ]);

  return {
    featured: (featured ?? []) as PublicVehicleWithImages[],
    stories: (stories ?? []) as CustomerStory[],
  };
}

export default async function HomePage() {
  const { featured, stories } = await getHomepageData();

  return (
    <>
      <Hero />
      <TrustStats />
      <VideoShowcase />
      <FeaturedVehicles vehicles={featured} />
      <SellCarBanner />
      <WhyChooseUs />
      <Testimonials stories={stories} />
      <LocationSection />
    </>
  );
}
