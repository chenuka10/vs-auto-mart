"use client";

import Link from "next/link";
import { useTransition } from "react";
import { updateVehicleStatus, deleteVehicle } from "@/app/admin/(protected)/actions";
import { formatLKR } from "@/lib/utils";
import type { Vehicle, VehicleStatus } from "@/lib/types";

const statusStyles: Record<VehicleStatus, string> = {
  available: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  reserved: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  sold: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function VehicleRow({ vehicle }: { vehicle: Vehicle }) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value as VehicleStatus;
    startTransition(() => updateVehicleStatus(vehicle.id, status));
  }

  function handleDelete() {
    if (!confirm(`Delete ${vehicle.brand} ${vehicle.model}? This can't be undone.`)) return;
    startTransition(() => deleteVehicle(vehicle.id));
  }

  return (
    <tr
      className={`border-b border-white/5 text-sm text-paper transition-opacity duration-200 hover:bg-white/[0.03] ${
        isPending ? "opacity-50" : ""
      }`}
    >
      <td className="py-3 pr-4 font-medium">
        {vehicle.brand} {vehicle.model}{" "}
        <span className="text-graphite-300">{vehicle.year}</span>
      </td>
      <td className="py-3 pr-4 text-graphite-300">{formatLKR(vehicle.price)}</td>
      <td className="py-3 pr-4">
        <select
          defaultValue={vehicle.status}
          onChange={handleStatusChange}
          disabled={isPending}
          className={`rounded-plate border px-2 py-1 text-xs font-medium capitalize outline-none transition-colors duration-200 disabled:cursor-not-allowed ${statusStyles[vehicle.status]}`}
        >
          <option value="available" className="bg-graphite-950 text-paper">
            Available
          </option>
          <option value="reserved" className="bg-graphite-950 text-paper">
            Reserved
          </option>
          <option value="sold" className="bg-graphite-950 text-paper">
            Sold
          </option>
        </select>
      </td>
      <td className="py-3 pr-4 text-brass-400">{vehicle.is_featured ? "★" : ""}</td>
      <td className="py-3 text-right">
        <Link
          href={`/admin/vehicles/${vehicle.id}/edit`}
          className="mr-4 text-brass-400 transition-colors duration-200 hover:text-brass-300 hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-400 transition-colors duration-200 hover:text-red-300 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}