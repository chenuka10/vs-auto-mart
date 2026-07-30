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
      <div className="flex items-center justify-between">
        <div className="flex gap-6 text-sm">
          <p><span className="font-semibold text-moss-600">{counts.available}</span> available</p>
          <p><span className="font-semibold text-amber-600">{counts.reserved}</span> reserved</p>
          <p><span className="font-semibold text-signal-600">{counts.sold}</span> sold</p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="rounded-plate bg-graphite-950 px-4 py-2 text-sm font-semibold text-paper hover:bg-graphite-900"
        >
          + Add Vehicle
        </Link>
      </div>

      <table className="mt-6 w-full border-collapse">
        <thead>
          <tr className="border-b border-graphite-700/15 text-left text-xs uppercase tracking-wide text-graphite-500">
            <th className="pb-2 font-medium">Vehicle</th>
            <th className="pb-2 font-medium">Price</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Featured</th>
            <th className="pb-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <VehicleRow key={vehicle.id} vehicle={vehicle} />
          ))}
        </tbody>
      </table>

      {vehicles.length === 0 && (
        <p className="mt-10 text-center text-graphite-500">No vehicles yet — add your first one.</p>
      )}
    </div>
  );
}
