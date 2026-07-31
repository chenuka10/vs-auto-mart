import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import VehicleRow from "@/components/admin/VehicleRow";
import type { Vehicle } from "@/lib/types";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .order("date_added", { ascending: false });

  const vehicles = (data ?? []) as Vehicle[];
  const counts = {
    available: vehicles.filter((v) => v.status === "available").length,
    reserved: vehicles.filter((v) => v.status === "reserved").length,
    sold: vehicles.filter((v) => v.status === "sold").length,
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-charcoal-900 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-graphite-300">Available</p>
          <p className="mt-1 font-display text-2xl font-semibold text-emerald-400">
            {counts.available}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-charcoal-900 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-graphite-300">Reserved</p>
          <p className="mt-1 font-display text-2xl font-semibold text-amber-400">
            {counts.reserved}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-charcoal-900 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-graphite-300">Sold</p>
          <p className="mt-1 font-display text-2xl font-semibold text-red-400">{counts.sold}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end sm:hidden">
        <Link
          href="/admin/vehicles/new"
          className="rounded-plate bg-brass-500 px-4 py-2 text-sm font-semibold text-graphite-950 transition-all duration-200 hover:bg-brass-400"
        >
          + Add Vehicle
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-charcoal-900">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-graphite-300">
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="px-4">
            {vehicles.map((vehicle) => (
              <VehicleRow key={vehicle.id} vehicle={vehicle} />
            ))}
          </tbody>
        </table>

        {vehicles.length === 0 && (
          <p className="px-4 py-10 text-center text-graphite-300">
            No vehicles yet — add your first one.
          </p>
        )}
      </div>
    </div>
  );
}