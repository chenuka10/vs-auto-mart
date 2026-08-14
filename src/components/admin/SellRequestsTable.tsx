"use client";

import { useMemo, useState } from "react";
import SellRequestRow from "./SellRequestRow";
import type { SellCarSubmission, SellCarStatus } from "@/lib/types";

const STATUS_OPTIONS: (SellCarStatus | "ALL")[] = [
  "ALL",
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "INSPECTION",
  "OFFER_MADE",
  "PURCHASED",
  "REJECTED",
  "CLOSED",
];

export default function SellRequestsTable({ submissions }: { submissions: SellCarSubmission[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SellCarStatus | "ALL">("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return submissions.filter((s) => {
      if (status !== "ALL" && s.status !== status) return false;
      if (!q) return true;
      return [
        s.seller_name,
        s.seller_phone,
        s.vehicle_make,
        s.vehicle_model,
        s.registration_number,
        s.reference_number,
      ]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q));
    });
  }, [submissions, query, status]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, vehicle, plate, or reference…"
          className="w-full max-w-sm rounded-plate border border-graphite-700/40 bg-graphite-900 px-3 py-2 text-sm text-graphite-100 placeholder:text-graphite-500 focus:border-graphite-500 focus:outline-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as SellCarStatus | "ALL")}
          className="rounded-plate border border-graphite-700/40 bg-graphite-900 px-3 py-2 text-sm text-graphite-100 focus:border-graphite-500 focus:outline-none"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "ALL" ? "All statuses" : opt}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-graphite-200">
          <thead>
            <tr className="border-b border-graphite-800 text-xs uppercase tracking-wide text-graphite-400">
              <th className="pb-3 font-medium">Vehicle</th>
              <th className="pb-3 font-medium">Seller</th>
              <th className="pb-3 font-medium">Mileage</th>
              <th className="pb-3 font-medium">Asking Price</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-800/60">
            {filtered.map((submission) => (
              <SellRequestRow key={submission.id} submission={submission} />
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-graphite-400">
          {submissions.length === 0
            ? "No sell requests yet."
            : "No submissions match that search."}
        </p>
      )}
    </div>
  );
}
