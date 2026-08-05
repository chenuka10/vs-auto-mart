"use client";

import { useMemo, useState } from "react";
import VehicleRow from "./VehicleRow";
import type { Vehicle } from "@/lib/types";

export default function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter((v) =>
      [v.brand, v.model, v.registration_no, String(v.year)]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    );
  }, [vehicles, query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by plate number, brand, or model…"
        className="w-full max-w-sm rounded-plate border border-graphite-700/15 px-3 py-2 text-sm"
      />

      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr className="border-b border-graphite-700/15 text-left text-xs uppercase tracking-wide text-graphite-500">
            <th className="pb-2 font-medium">Vehicle</th>
            <th className="pb-2 font-medium">Plate</th>
            <th className="pb-2 font-medium">Price</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Featured</th>
            <th className="pb-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((vehicle) => (
            <VehicleRow key={vehicle.id} vehicle={vehicle} />
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-graphite-500">
          {vehicles.length === 0 ? "No vehicles yet — add your first one." : "No vehicles match that search."}
        </p>
      )}
    </div>
  );
}
