"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track, metaEvent } from "@/lib/analytics";

const SPEND_OPTIONS = [
  "Under $5k / month",
  "$5k to $20k / month",
  "$20k to $50k / month",
  "Over $50k / month",
];

export default function GamePlanForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.email) {
      setError("Name and email are the only two things we need.");
      return;
    }

    setSubmitting(true);
    // Shared with the CAPI call in /api/lead so Meta dedupes the pair.
    const eventId = crypto.randomUUID();
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventId, url: window.location.href }),
      });
      if (!res.ok) throw new Error("bad_status");
      track("lead_submit", { location: "game_plan" });
      metaEvent(
        "Lead",
        { content_name: "leaky-funnel-game-plan", location: "game_plan" },
        eventId,
      );
      router.push("/game-plan/schedule");
    } catch {
      setError("Something broke on our end. Try again, or email jono@impactconversion.com.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-xl font-semibold tracking-tight text-text md:text-2xl">
        Book your Leaky Funnel Game Plan
      </h3>
      <p className="mt-2 text-sm text-text-muted">
        Fill this in and pick a time on the next page. Takes about 20 seconds.
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
          <input
            name="name"
            required
            autoComplete="name"
            className="rounded-xl border border-ink/15 px-4 py-3 text-base text-text outline-none transition focus:border-purple"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-text">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-xl border border-ink/15 px-4 py-3 text-base text-text outline-none transition focus:border-purple"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-text">
          Store URL <span className="font-normal text-text-muted">(optional)</span>
          <input
            name="store"
            inputMode="url"
            placeholder="yourstore.com"
            className="rounded-xl border border-ink/15 px-4 py-3 text-base text-text outline-none transition focus:border-purple"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-text">
          Monthly ad spend
          <select
            name="adSpend"
            defaultValue={SPEND_OPTIONS[1]}
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-text outline-none transition focus:border-purple"
          >
            {SPEND_OPTIONS.map((o) => (
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
        {submitting ? "One sec..." : "Next: pick a time"}
      </button>
      <p className="mt-3 text-center text-xs text-text-muted">
        No spam, no drip sequence. We use this to prep your Game Plan before the call.
      </p>
    </form>
  );
}
