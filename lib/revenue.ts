// Store revenue bands offered on the magnet form, lowest first.
export const REVENUE_OPTIONS = [
  "Under $1M / year",
  "$1M to $2M / year",
  "$2M to $5M / year",
  "$5M to $10M / year",
  "$10M to $20M / year",
  "Over $20M / year",
];

// Anything at or above $1M a year is a qualified lead. Shared by the form and
// the API route so the browser pixel and the Conversions API can never disagree
// about a submission, and so the bands only ever need editing in one place.
const QUALIFIED = new Set(REVENUE_OPTIONS.slice(1));

export function isQualified(revenue: string | undefined | null): boolean {
  return QUALIFIED.has((revenue ?? "").trim());
}
