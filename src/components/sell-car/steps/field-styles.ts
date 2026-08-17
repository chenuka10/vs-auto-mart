// Matches the liquid-glass dark aesthetic used across the rest of the site
// (see app/customers/page.tsx, components/reviews/*) — glassy inputs on a
// dark backdrop rather than the old flat light-theme form controls.
export const inputClass =
  "w-full rounded-plate border border-graphite-700/40 bg-graphite-900/40 px-3.5 py-2.5 text-sm text-graphite-100 placeholder:text-graphite-500 backdrop-blur-md transition-colors focus:border-brass-500/60 focus:outline-none focus:ring-1 focus:ring-brass-500/40";

export const selectClass =
  inputClass + " [color-scheme:light] dark:[color-scheme:dark] [&>option]:bg-graphite-900 [&>option]:text-graphite-100";

export const labelClass = "flex flex-col gap-1.5 text-sm font-medium text-graphite-200";

export const errorClass = "mt-1 text-xs font-medium text-rose-400";

export function fieldError(errors: Record<string, string> | undefined, name: string) {
  return errors?.[name];
}