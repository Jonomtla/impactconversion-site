"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { analytics } from "@/lib/analytics";

// Cal embed for the Game Plan funnel: fires the GA conversion, then moves
// the booker on to the confirmation page instead of ending in the iframe.
export default function GamePlanCal() {
  const router = useRouter();

  useEffect(() => {
    const callback = () => {
      analytics.callBooked("game_plan");
      router.push("/game-plan/confirmed");
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
  }, [router]);

  return (
    <Cal
      calLink="jono-matla-8ixyzk/15-minute-free-consult"
      style={{ width: "100%", height: "680px" }}
      config={{ layout: "month_view" }}
    />
  );
}
