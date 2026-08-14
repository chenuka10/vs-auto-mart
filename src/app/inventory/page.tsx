import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import VehicleCard from "@/components/VehicleCard";
import InventoryFilters from "@/components/InventoryFilters";
import { PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS } from "@/lib/queries";
import type { PublicVehicleWithImages } from "@/lib/types";

export const metadata = {
  title: "Vehicle Inventory — Used Cars in Kadawatha",
  description:
    "Browse quality used vehicles at VS Auto Mart, Kadawatha. Filter by brand, price, year, fuel, and transmission. Find your perfect car today.",
  keywords: [
    "Kadawatha car sale",
    "used cars Kadawatha",
    "buy cars Sri Lanka",
    "Japanese cars Kadawatha",
    "Toyota for sale Kadawatha",
    "Honda cars Kadawatha",
    "VS Auto Mart inventory",
  ],
};

async function getVehicles(
  searchParams: Record<string, string | undefined>
) {
  const supabase = await createClient();

  let query = supabase
    .from("vehicles")
    .select(PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS)
    .neq("status", "sold")
    .order("date_added", { ascending: false });

  if (searchParams.brand) {
    query = query.ilike("brand", searchParams.brand);
  }

  if (searchParams.minYear) {
    query = query.gte("year", Number(searchParams.minYear));
  }

  if (searchParams.maxPrice) {
    query = query.lte("price", Number(searchParams.maxPrice));
  }

  if (searchParams.fuel) {
    query = query.eq("fuel", searchParams.fuel);
  }

  if (searchParams.transmission) {
    query = query.eq("transmission", searchParams.transmission);
  }

  const { data } = await query;

  return (data ?? []) as PublicVehicleWithImages[];
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const vehicles = await getVehicles(params);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-brass-600">
            VS Auto Mart
          </p>

          <h1 className="font-display text-3xl font-semibold tracking-tight text-graphite-100 sm:text-4xl">
            Vehicle Inventory
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-graphite-400 sm:text-base">
            Browse our latest selection of quality used vehicles in Sri Lanka.
            Find the right car using the filters below.
          </p>
        </div>

        {/* Vehicle count */}
        <div className="shrink-0 rounded-lg border border-brass-500/20 bg-graphite-900/50 backdrop-blur-sm px-4 py-2.5">
          <p className="text-sm text-graphite-400">
            <span className="font-semibold text-brass-400">
              {vehicles.length}
            </span>{" "}
            vehicle{vehicles.length === 1 ? "" : "s"} available
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mt-8">
        <Suspense fallback={null}>
          <InventoryFilters />
        </Suspense>
      </section>

      {/* Inventory */}
      {vehicles.length === 0 ? (
        <section className="mt-12 rounded-xl border border-dashed border-brass-500/20 bg-graphite-900/30 px-6 py-16 text-center backdrop-blur-sm sm:py-20">
          <div className="mx-auto max-w-md">
            <h2 className="font-display text-xl font-semibold text-graphite-100">
              No vehicles found
            </h2>

            <p className="mt-2 text-sm leading-6 text-graphite-400">
              No vehicles match your current filters. Try widening your search
              or removing some filters.
            </p>
          </div>
        </section>
      ) : (
        <section className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}