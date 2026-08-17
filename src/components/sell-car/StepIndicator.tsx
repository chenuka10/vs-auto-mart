const STEPS = ["Seller", "Vehicle", "Details", "Photos", "Review"];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:gap-2">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === current;
        const isDone = stepNumber < current;

        return (
          <li key={label} className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-gradient-gold text-graphite-950 shadow-glow-gold"
                  : isDone
                    ? "bg-brass-500/80 text-graphite-950"
                    : "border border-graphite-700/40 bg-graphite-900/40 text-graphite-500"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              {isDone ? "✓" : stepNumber}
            </span>
            <span
              className={`hidden text-xs font-medium sm:inline ${
                isActive ? "text-graphite-100" : "text-graphite-500"
              }`}
            >
              {label}
            </span>
            {stepNumber < STEPS.length && (
              <span className="h-px w-3 shrink-0 bg-graphite-700/40 sm:w-6" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
