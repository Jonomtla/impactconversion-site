"use client";

import { useState } from "react";
import { track, metaEvent } from "@/lib/analytics";
import { isFreemail } from "@/lib/freemail";
import { REVENUE_OPTIONS, isQualified } from "@/lib/revenue";
import Turnstile from "@/components/Turnstile";

const input =
  "rounded-xl border border-ink/15 px-4 py-3 text-base text-text outline-none transition focus:border-purple";

export default function ContactForm({ location = "contact" }: { location?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSubmitting(true);
    // Shared with the CAPI call in /api/contact so Meta dedupes the pair.
    const eventId = crypto.randomUUID();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken: token,
          eventId,
          url: window.location.href,
        }),
      });
      if (res.status === 403) {
        setError("That didn't get through our spam check. Refresh the page and try again.");
        setSubmitting(false);
        return;
      }
      if (res.status === 400) {
        setError("Something in there didn't look right. Check your email address and try again.");
        setSubmitting(false);
        return;
      }
      if (!res.ok) throw new Error("bad_status");

      const revenue = String(data.revenue ?? "");
      const qualified = isQualified(revenue);
      const freemail = isFreemail(String(data.email ?? ""));
      track("lead_submit", { location, qualified, freemail });
      metaEvent(
        "Lead",
        { content_name: "contact-form", store_revenue: revenue, qualified, freemail },
        eventId,
      );
      setSent(true);
    } catch {
      setError("Something broke on our end. Try again, or email jono@impactconversion.com.");
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
        <h3 className="text-xl font-semibold tracking-tight text-text">
          Got it. We&apos;ll come back to you.
        </h3>
        <p className="mt-3 text-text-muted leading-relaxed">
          Jono reads these himself and replies within one business day, usually
          with a couple of specific things he spotted on your site. If it is
          urgent, email{" "}
          <a
            href="mailto:jono@impactconversion.com"
            className="text-purple underline underline-offset-4"
          >
            jono@impactconversion.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-xl font-semibold tracking-tight text-text md:text-2xl">
        Or send us the details
      </h3>
      <p className="mt-2 text-sm text-text-muted">
        No calendar, no call. Tell us what is going on and we&apos;ll come back
        to you by email.
      </p>

      {/* Honeypot — hidden from real users, bots fill everything */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-5 grid gap-4">
        <label className="grid gap-1.5 text-sm font-medium text-text">
          Your name
          <input name="name" required autoComplete="name" className={input} />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-text">
          Work email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={input}
          />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-text">
          Store URL
          <input
            name="store"
            required
            inputMode="url"
            placeholder="yourstore.com"
            className={input}
          />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-text">
          Monthly store revenue
          <select
            name="revenue"
            required
            defaultValue=""
            className={`${input} bg-white`}
          >
            <option value="" disabled>
              Pick a range
            </option>
            {REVENUE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-text">
          What&apos;s the main thing you&apos;re trying to fix?
          <textarea
            name="challenge"
            required
            rows={3}
            placeholder="e.g. mobile checkout leaks, PDPs don't convert paid traffic, AOV is flat"
            className={`${input} resize-y`}
          />
        </label>
      </div>

      <Turnstile onToken={setToken} />

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-2 disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send it over"}
      </button>
      <p className="mt-3 text-center text-xs text-text-muted">
        Goes straight to Jono. No drip sequence, no sales rep.
      </p>
    </form>
  );
}
