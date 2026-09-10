"use client";

import { useEffect } from "react";
import { adsConversion } from "@/lib/analytics";

// Backstop for the Ads conversion on a confirmation page. The Cal embed
// already fires it on bookingSuccessful; this covers the case where that
// callback is missed and the booker still lands here. The conversion action
// counts one per click, so the duplicate is deduped by Google.
export default function AdsConversionOnLoad({ sendTo }: { sendTo: string }) {
  useEffect(() => {
    // gtag loads async, so retry briefly rather than dropping the conversion.
    let tries = 0;
    const fire = () => {
      if (typeof window.gtag === "function") {
        adsConversion(sendTo);
        return;
      }
      if (tries++ < 20) setTimeout(fire, 250);
    };
    fire();
  }, [sendTo]);

  return null;
}
