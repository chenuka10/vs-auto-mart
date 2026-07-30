import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import VehicleCard from "@/components/VehicleCard";
import InventoryFilters from "@/components/InventoryFilters";
import type { VehicleWithImages } from "@/lib/types";

export const metadata = {
  title: "Inventory — Used Cars in Sri Lanka",
  description: "Browse quality used vehicles in Sri Lanka. Filter by brand, price, year, fuel and transmission.",
};

async function getVehicles(searchParams: Record<string, string | undefined>) {
  const supabase = await createClient();
  let query = supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .neq("status", "sold")
    .order("date_added", { ascending: false });

  if (searchParams.brand) query = query.ilike("brand", searchParams.brand);
  if (searchParams.minYear) query = query.gte("year", Number(searchParams.minYear));
  if (searchParams.maxPrice) query = query.lte("price", Number(searchParams.maxPrice));
  if (searchParams.fuel) query = query.eq("fuel", searchParams.fuel);
  if (searchParams.transmission) query = query.eq("transmission", searchParams.transmission);

  const { data } = await query;
  return (data ?? []) as VehicleWithImages[];
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const vehicles = await getVehicles(params);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold">Vehicle Inventory</h1>
      <p className="mt-2 text-graphite-500">
        {vehicles.length} vehicle{vehicles.length === 1 ? "" : "s"} available
      </p>

      <div className="mt-6">
        <Suspense fallback={null}>
          <InventoryFilters />
        </Suspense>
      </div>

      {vehicles.length === 0 ? (
        <div className="mt-16 rounded-lg border border-dashed border-graphite-700/20 p-12 text-center text-graphite-500">
          No vehicles match those filters yet. Try widening your search.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
