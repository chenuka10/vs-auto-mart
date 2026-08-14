import Link from "next/link";
import { formatLKR, formatMileage } from "@/lib/utils";
import SellRequestStatusBadge from "./SellRequestStatusBadge";
import type { SellCarSubmission } from "@/lib/types";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-LK", { day: "numeric", month: "short" });
}

export default function SellRequestRow({ submission }: { submission: SellCarSubmission }) {
  return (
    <tr className="border-b border-graphite-800 text-sm text-graphite-200">
      <td className="py-3 pr-4">
        <Link
          href={`/admin/sell-requests/${submission.id}`}
          className="font-medium text-white hover:text-brass-400 hover:underline"
        >
          {submission.vehicle_make} {submission.vehicle_model}
        </Link>{" "}
        <span className="text-graphite-400">{submission.vehicle_year}</span>
        <div className="text-xs text-graphite-500">{submission.reference_number}</div>
      </td>
      <td className="py-3 pr-4">
        <div>{submission.seller_name}</div>
        <div className="text-xs text-graphite-500">{submission.seller_phone}</div>
      </td>
      <td className="py-3 pr-4 text-graphite-300">{formatMileage(submission.mileage)}</td>
      <td className="py-3 pr-4 text-graphite-200">{formatLKR(submission.asking_price)}</td>
      <td className="py-3 pr-4">
        <SellRequestStatusBadge status={submission.status} />
      </td>
      <td className="py-3 pr-4 text-graphite-400">{timeAgo(submission.created_at)}</td>
    </tr>
  );
}
