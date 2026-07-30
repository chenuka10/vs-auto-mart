import { statusLabel } from "@/lib/utils";
import type { VehicleStatus } from "@/lib/types";

const DOT_COLOR: Record<VehicleStatus, string> = {
  available: "bg-moss-600",
  reserved: "bg-amber-600",
  sold: "bg-signal-600",
};

export default function StatusBadge({ status }: { status: VehicleStatus }) {
  return (
    <span className="plate-tag">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_COLOR[status]}`} />
      {statusLabel(status)}
    </span>
  );
}
