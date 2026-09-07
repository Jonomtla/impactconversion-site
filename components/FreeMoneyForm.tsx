"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track, metaEvent } from "@/lib/analytics";
import { isFreemail } from "@/lib/freemail";
import { REVENUE_OPTIONS, isQualified } from "@/lib/revenue";

export default function FreeMoneyForm({ location }: { location: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (!data.email) {
      setError("We need an email to send the guide to.");
      return;
    }
    if (isFreemail(String(data.email))) {
      track("lead_freemail_blocked", { location });
      setError("Use your work email so we know which brand this is for.");
      return;
    }
    setSubmitting(true);
    // Shared with the server-side Conversions API call so Meta dedupes the pair.
    const eventId = crypto.randomUUID();
    try {
      const res = await fetch("/api/magnet-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: location, eventId, url: window.location.href }),
      });
      if (res.status === 400) {
        const { error: code } = (await res.json().catch(() => ({}))) as { error?: string };
        setError(
          code === "freemail"
            ? "Use your work email so we know which brand this is for."
            : "That email address doesn't look right. Check it and try again.",
        );
        setSubmitting(false);
        return;
      }
      if (!res.ok) throw new Error("bad_status");
      const revenue = String(data.revenue ?? "");
      const qualified = isQualified(revenue);
      track("lead_submit", { location, qualified });
      // Always Lead. Splitting the event name starved the ad set's optimisation
      // signal; revenue rides along as custom data so reporting can still split.
      metaEvent(
        "Lead",
        { content_name: "free-money-playbook", store_revenue: revenue, qualified },
        eventId,
      );
      router.push("/thank-you-7ck");
    } catch {
      setError("Something broke on our end. Try again, or email jono@impactconversion.com.");
      setSubmitting(false);
    }
  }

  const input =
    "rounded-xl border border-ink/15 px-4 py-3 text-base text-text outline-none transition focus:border-purple";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-xl font-semibold tracking-tight text-text md:text-2xl">
        Email me the guide
      </h3>
      <p className="mt-2 text-sm text-text-muted">
        Free. No pitch, no drip sequence. Unsubscribe any time.
      </p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="mt-5 grid gap-4">
        <label className="grid gap-1.5 text-sm font-medium text-text">
          Work email
          <input name="email" type="email" required autoComplete="email" className={input} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-text">
          First name
          <input name="name" autoComplete="given-name" className={input} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-text">
          Store revenue
          <select name="revenue" required defaultValue="" className={`${input} bg-white`}>
            <option value="" disabled>
              Select revenue
            </option>
            {REVENUE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-2 disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send me the guide"}
      </button>
    </form>
  );
}
