"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Listens for clicks on any element with `data-ga-event` and fires a GA4 event.
// Keeps event wiring in markup (co-located with the CTA) rather than requiring
// onClick handlers throughout the app.
export default function GAEventListener() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-ga-event]");
      if (!el) return;
      const event = el.dataset.gaEvent;
      if (!event) return;
      const params: Record<string, string> = {};
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k.startsWith("ga") && k !== "gaEvent" && v) {
          // data-ga-location -> location
          const name = k.replace(/^ga/, "").replace(/^./, (c) => c.toLowerCase());
          params[name] = v;
        }
      }
      track(event, params);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
