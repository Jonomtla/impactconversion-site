"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

// Inline Cal.com embed with a GA4 hook on bookingSuccessful so booked
// calls show up as conversions rather than disappearing into the iframe.
export default function CalEmbed() {
  useEffect(() => {
    const callback = () => {
      analytics.callBooked("contact_embed");
    };
    let cancelled = false;
    (async () => {
      const cal = await getCalApi();
      if (cancelled) return;
      cal("on", { action: "bookingSuccessful", callback });
    })();
    return () => {
      cancelled = true;
      getCalApi().then((cal) =>
        cal("off", { action: "bookingSuccessful", callback })
      );
    };
  }, []);

  return (
    <Cal
      calLink="jono-matla-8ixyzk/15-minute-free-consult"
      style={{ width: "100%", height: "680px" }}
      config={{ layout: "month_view" }}
    />
  );
}
