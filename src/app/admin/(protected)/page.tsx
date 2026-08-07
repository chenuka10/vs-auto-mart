import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import VehicleTable from "@/components/admin/VehicleTable";
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
        <div className="flex gap-3">
          <Link
            href="/admin/testimonials"
            className="rounded-plate bg-graphite-950 px-4 py-2 text-sm font-semibold text-paper hover:bg-graphite-900"
          >
            Manage Testimonials
          </Link>
          <Link
            href="/admin/vehicles/new"
            className="rounded-plate bg-graphite-950 px-4 py-2 text-sm font-semibold text-paper hover:bg-graphite-900"
          >
            + Add Vehicle
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <VehicleTable vehicles={vehicles} />
      </div>
    </div>
  );
}