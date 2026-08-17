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

  const { count: newSellRequests } = await supabase
    .from("sell_car_submissions")
    .select("id", { count: "exact", head: true })
    .eq("status", "NEW");

  return (
    <div className="text-graphite-100">
      <div className="flex items-center justify-between">
        <div className="flex gap-6 text-sm">
          <p className="text-graphite-300">
            <span className="font-semibold text-emerald-400">{counts.available}</span> available
          </p>
          <p className="text-graphite-300">
            <span className="font-semibold text-amber-400">{counts.reserved}</span> reserved
          </p>
          <p className="text-graphite-300">
            <span className="font-semibold text-rose-400">{counts.sold}</span> sold
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/sell-requests"
            className="relative rounded-plate border border-graphite-700 bg-graphite-900 px-4 py-2 text-sm font-semibold text-graphite-100 transition-colors hover:bg-graphite-800"
          >
            Sell Requests
            {!!newSellRequests && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brass-500 px-1 text-xs font-bold text-graphite-950">
                {newSellRequests}
              </span>
            )}
          </Link>
          <Link
            href="/admin/testimonials"
            className="rounded-plate border border-graphite-700 bg-graphite-900 px-4 py-2 text-sm font-semibold text-graphite-100 transition-colors hover:bg-graphite-800"
          >
            Manage Testimonials
          </Link>
          <Link
            href="/admin/vehicles/new"
            className="rounded-plate bg-brass-500 px-4 py-2 text-sm font-semibold text-graphite-950 transition-colors hover:bg-brass-400"
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