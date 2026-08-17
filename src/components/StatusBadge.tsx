import { statusLabel } from "@/lib/utils";
import type { VehicleStatus } from "@/lib/types";

const STATUS_CONFIG: Record<
  VehicleStatus,
  { dot: string; text: string; bg: string; border: string }
> = {
  available: {
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    bg: "bg-emerald-950/50",
    border: "border-emerald-800/60",
  },
  reserved: {
    dot: "bg-amber-400",
    text: "text-amber-300",
    bg: "bg-amber-950/50",
    border: "border-amber-800/60",
  },
  sold: {
    dot: "bg-rose-400",
    text: "text-rose-300",
    bg: "bg-rose-950/50",
    border: "border-rose-800/60",
  },
};

export default function StatusBadge({ status }: { status: VehicleStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.available;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {statusLabel(status)}
    </span>
  );
}