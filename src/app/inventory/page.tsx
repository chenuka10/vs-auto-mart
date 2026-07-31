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
    <div className="min-h-screen bg-graphite-950 text-paper">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
          Showroom
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
          Vehicle Inventory
        </h1>
        <p className="mt-2 text-graphite-300">
          <span className="font-semibold text-brass-400">{vehicles.length}</span>{" "}
          vehicle{vehicles.length === 1 ? "" : "s"} available
        </p>

        <div className="sticky top-0 z-10 mt-6 -mx-6 border-y border-white/5 bg-graphite-950/90 px-6 py-4 backdrop-blur">
          <Suspense fallback={null}>
            <InventoryFilters />
          </Suspense>
        </div>

        {vehicles.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-white/10 bg-charcoal-900 p-12 text-center">
            <p className="font-display text-lg font-semibold">No matches yet</p>
            <p className="mt-2 text-graphite-300">
              No vehicles match those filters. Try widening your search.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.6)]"
              >
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}