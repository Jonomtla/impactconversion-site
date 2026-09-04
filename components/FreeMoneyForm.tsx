"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track, metaEvent } from "@/lib/analytics";

export const REVENUE_OPTIONS = [
  "Under $1M / year",
  "$1M to $2M / year",
  "$2M to $5M / year",
  "$5M to $10M / year",
  "$10M to $20M / year",
  "Over $20M / year",
];

// Anything at or above $1M a year is a qualified lead for Meta optimisation.
const QUALIFIED = new Set(REVENUE_OPTIONS.slice(1));

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
    setSubmitting(true);
    // Shared with the server-side Conversions API call so Meta dedupes the pair.
    const eventId = crypto.randomUUID();
    try {
      const res = await fetch("/api/magnet-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: location, eventId, url: window.location.href }),
      });
      if (!res.ok) throw new Error("bad_status");
      const qualified = QUALIFIED.has(String(data.revenue));
      track("lead_submit", { location, qualified });
      metaEvent(
        qualified ? "Lead" : "CompleteRegistration",
        { content_name: "free-money-playbook" },
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
          <select name="revenue" defaultValue={REVENUE_OPTIONS[1]} className={`${input} bg-white`}>
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
