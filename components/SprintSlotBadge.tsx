"use client";

import { useEffect, useState } from "react";

/**
 * Returns a label like "May 2026" for the next upcoming calendar month.
 *
 * DEV NOTE: this auto-rolls each time the page loads, so we never display a
 * stale "Next sprint opens June 2026" after June has passed. If the real
 * sprint cadence is quarterly, swap to a quarter-start calculation here.
 * If open slots change, update the `slots` prop on <SprintSlotBadge />.
 */
function nextSprintMonthLabel(date = new Date()): string {
  const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return next.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

type Props = {
  slots?: number;
};

export default function SprintSlotBadge({ slots = 2 }: Props) {
  // Compute client-side so a visitor a month later sees a fresh date
  // without requiring a redeploy.
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => setLabel(nextSprintMonthLabel()), []);

  const text = label
    ? `Next sprint opens ${label} · ${slots} ${slots === 1 ? "slot" : "slots"}`
    : `Next sprint · ${slots} ${slots === 1 ? "slot" : "slots"}`;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-purple-2/40 bg-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-purple-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-2 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-2" />
      </span>
      {text}
    </span>
  );
}
