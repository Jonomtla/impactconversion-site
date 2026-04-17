"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";

type Props = {
  source: string;
  /** Shown after a successful submit. Ideally a link to the PDF. */
  downloadHref?: string;
  /** Button label on the idle state. */
  cta?: string;
  /** Heading text above the form. */
  heading?: string;
  /** Small supporting line under the heading. */
  subhead?: string;
};

export default function LeadMagnetForm({
  source,
  downloadHref,
  cta = "Send it to me",
  heading = "Get the 7 Conversion Killers PDF",
  subhead = "One email. The PDF in your inbox in under a minute. No drip funnel junk.",
}: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/kit-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, source }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }
      analytics.toolUse("lead_magnet", source);
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-purple/30 bg-purple-soft/40 p-8 text-center">
        <h3 className="text-xl font-semibold text-text">Check your inbox.</h3>
        <p className="mt-2 text-text-muted">
          The PDF is on its way. Subject line: &ldquo;Your conversion killers PDF&rdquo;.
        </p>
        {downloadHref ? (
          <a
            href={downloadHref}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-2"
          >
            Or download it now
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-xl font-semibold tracking-tight text-text md:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm text-text-muted">{subhead}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="sr-only">First name</span>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:border-purple focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="sr-only">Work email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:border-purple focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2 disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? "Sending…" : cta}
      </button>
      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      ) : (
        <p className="mt-3 text-xs text-text-muted">
          We&rsquo;ll add you to the occasional CRO newsletter. Unsubscribe any time.
        </p>
      )}
    </form>
  );
}
