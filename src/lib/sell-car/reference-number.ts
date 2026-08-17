/**
 * Generates a human-friendly reference number like "VSA-2026-04821".
 *
 * This is intentionally NOT sequential/predictable (no "next number" query
 * against the table, which would race under concurrent submissions). The
 * suffix is random; collisions are astronomically unlikely (1 in 90,000
 * per year) but are still handled defensively — see submitSellCarForm in
 * ./submit.ts, which retries on a unique-constraint violation.
 */
export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(10000 + Math.random() * 90000); // 5 digits, 10000–99999
  return `VSA-${year}-${suffix}`;
}

/** Postgres unique_violation error code. */
export const UNIQUE_VIOLATION_CODE = "23505";
