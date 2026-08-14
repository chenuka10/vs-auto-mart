"use client";

import { useTransition, type ChangeEvent } from "react";
import { updateSubmissionStatus } from "@/app/admin/(protected)/sell-requests/actions";
import type { SellCarStatus } from "@/lib/types";

const STATUSES: SellCarStatus[] = [
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "INSPECTION",
  "OFFER_MADE",
  "PURCHASED",
  "REJECTED",
  "CLOSED",
];

export default function SellRequestStatusControl({
  id,
  status,
}: {
  id: string;
  status: SellCarStatus;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as SellCarStatus;
    startTransition(() => updateSubmissionStatus(id, next));
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      disabled={isPending}
      className="rounded-plate border border-graphite-700 bg-graphite-900 px-3 py-2 text-sm font-semibold text-graphite-100 focus:border-graphite-500 focus:outline-none disabled:cursor-not-allowed"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
