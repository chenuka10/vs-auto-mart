import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SellRequestsTable from "@/components/admin/SellRequestsTable";
import type { SellCarSubmission } from "@/lib/types";

export default async function SellRequestsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sell_car_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const submissions = (data ?? []) as SellCarSubmission[];
  const newCount = submissions.filter((s) => s.status === "NEW").length;

  return (
    <div className="text-graphite-100">
      <div className="flex items-center justify-between">
        <div className="flex gap-6 text-sm">
          <p className="text-graphite-300">
            <span className="font-semibold text-white">{submissions.length}</span> total
          </p>
          <p className="text-graphite-300">
            <span className="font-semibold text-amber-400">{newCount}</span> new
          </p>
        </div>
        <Link
          href="/admin"
          className="rounded-plate border border-graphite-700 bg-graphite-900 px-4 py-2 text-sm font-semibold text-graphite-100 transition-colors hover:bg-graphite-800"
        >
          ← Vehicles
        </Link>
      </div>

      <div className="mt-6">
        <SellRequestsTable submissions={submissions} />
      </div>
    </div>
  );
}
