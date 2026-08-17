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
    <tr
      className={`border-b border-graphite-800 text-sm text-graphite-200 transition-opacity ${
        isPending ? "opacity-50" : ""
      }`}
    >
      <td className="py-3 pr-4 font-medium text-graphite-100">
        {vehicle.brand} {vehicle.model}{" "}
        <span className="text-graphite-400 font-normal">{vehicle.year}</span>
      </td>
      <td className="py-3 pr-4">
        {vehicle.registration_no ? (
          <span className="rounded border border-graphite-700 bg-graphite-800 px-2 py-0.5 font-mono text-xs text-graphite-200">
            {vehicle.registration_no}
          </span>
        ) : (
          <span className="text-xs text-graphite-500">No plate on file</span>
        )}
      </td>
      <td className="py-3 pr-4 text-graphite-200">{formatLKR(vehicle.price)}</td>
      <td className="py-3 pr-4">
        <select
          defaultValue={vehicle.status}
          onChange={handleStatusChange}
          disabled={isPending}
          className="rounded-md border border-graphite-700 bg-graphite-900 px-2.5 py-1 text-xs font-semibold text-graphite-100 capitalize focus:border-graphite-500 focus:outline-none disabled:cursor-not-allowed"
        >
          <option value="available" className="bg-graphite-900 text-emerald-400">
            Available
          </option>
          <option value="reserved" className="bg-graphite-900 text-amber-400">
            Reserved
          </option>
          <option value="sold" className="bg-graphite-900 text-rose-400">
            Sold
          </option>
        </select>
      </td>
      <td className="py-3 pr-4 text-brass-400">{vehicle.is_featured ? "★" : ""}</td>
      <td className="py-3 text-right">
        <Link
          href={`/admin/vehicles/${vehicle.id}/edit`}
          className="mr-4 text-brass-400 hover:text-brass-300 hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-rose-400 hover:text-rose-300 hover:underline disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}