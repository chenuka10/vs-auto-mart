import type { SellCarStatus } from "@/lib/types";

const STATUS_CONFIG: Record<SellCarStatus, { dot: string; text: string; bg: string; border: string }> = {
  NEW: { dot: "bg-sky-400", text: "text-sky-300", bg: "bg-sky-950/50", border: "border-sky-800/60" },
  REVIEWING: {
    dot: "bg-amber-400",
    text: "text-amber-300",
    bg: "bg-amber-950/50",
    border: "border-amber-800/60",
  },
  CONTACTED: {
    dot: "bg-violet-400",
    text: "text-violet-300",
    bg: "bg-violet-950/50",
    border: "border-violet-800/60",
  },
  INSPECTION: {
    dot: "bg-cyan-400",
    text: "text-cyan-300",
    bg: "bg-cyan-950/50",
    border: "border-cyan-800/60",
  },
  OFFER_MADE: {
    dot: "bg-brass-400",
    text: "text-brass-300",
    bg: "bg-graphite-800",
    border: "border-brass-700/60",
  },
  PURCHASED: {
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    bg: "bg-emerald-950/50",
    border: "border-emerald-800/60",
  },
  REJECTED: {
    dot: "bg-rose-400",
    text: "text-rose-300",
    bg: "bg-rose-950/50",
    border: "border-rose-800/60",
  },
  CLOSED: {
    dot: "bg-graphite-500",
    text: "text-graphite-400",
    bg: "bg-graphite-800/60",
    border: "border-graphite-700",
  },
};

export default function SellRequestStatusBadge({ status }: { status: SellCarStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.NEW;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {status.replace("_", " ")}
    </span>
  );
}
