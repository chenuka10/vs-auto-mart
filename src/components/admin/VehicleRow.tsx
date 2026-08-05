"use client";

import Link from "next/link";
import { useTransition } from "react";
import { updateVehicleStatus, deleteVehicle } from "@/app/admin/(protected)/actions";
import { formatLKR } from "@/lib/utils";
import type { Vehicle, VehicleStatus } from "@/lib/types";

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
    <tr className={`border-b border-graphite-700/10 text-sm ${isPending ? "opacity-50" : ""}`}>
      <td className="py-3 pr-4 font-medium">
        {vehicle.brand} {vehicle.model} <span className="text-graphite-500">{vehicle.year}</span>
      </td>
      <td className="py-3 pr-4">
        {vehicle.registration_no ? (
          <span className="plate-tag">{vehicle.registration_no}</span>
        ) : (
          <span className="text-xs text-graphite-400">No plate on file</span>
        )}
      </td>
      <td className="py-3 pr-4">{formatLKR(vehicle.price)}</td>
      <td className="py-3 pr-4">
        <select
          defaultValue={vehicle.status}
          onChange={handleStatusChange}
          disabled={isPending}
          className="rounded-plate border border-graphite-700/15 px-2 py-1 text-xs capitalize"
        >
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
      </td>
      <td className="py-3 pr-4">{vehicle.is_featured ? "★" : ""}</td>
      <td className="py-3 text-right">
        <Link href={`/admin/vehicles/${vehicle.id}/edit`} className="mr-4 text-brass-600 hover:underline">
          Edit
        </Link>
        <button onClick={handleDelete} disabled={isPending} className="text-signal-600 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  );
}
