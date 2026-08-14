// Matches the public-page form aesthetic used across the site (see faq/page.tsx,
// vehicle admin forms use a dark-theme variant of the same tokens).
export const inputClass =
  "w-full rounded-plate border border-graphite-700/15 bg-white px-3.5 py-2.5 text-sm text-graphite-900 placeholder:text-graphite-400 focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500/40";

export const labelClass = "flex flex-col gap-1.5 text-sm font-medium text-graphite-800";

export const errorClass = "mt-1 text-xs font-medium text-rose-600";

export function fieldError(errors: Record<string, string> | undefined, name: string) {
  return errors?.[name];
}
