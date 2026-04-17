"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";

type Status = "idle" | "submitting" | "ok" | "error";

export default function TermsForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      agree: (form.elements.namedItem("agree") as HTMLInputElement).checked,
    };

    try {
      const res = await fetch("/api/terms-accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(
          j?.error === "email_not_configured"
            ? "The submission endpoint is not yet live — please email jono@impactconversion.com directly."
            : "Something went wrong. Try again, or email jono@impactconversion.com."
        );
        analytics.termsSubmitError(j?.error ?? "unknown");
        return;
      }
      analytics.termsSubmit();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(
        "Network error. Try again, or email jono@impactconversion.com."
      );
      analytics.termsSubmitError("network");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-purple/30 bg-purple-soft/40 p-8">
        <h3 className="text-2xl font-semibold text-text">Got it. Confirmation sent.</h3>
        <p className="mt-3 text-text-muted">
          A copy of your acceptance has been emailed to{" "}
          <a
            href="mailto:jono@impactconversion.com"
            className="text-purple hover:underline"
          >
            jono@impactconversion.com
          </a>
          . We&rsquo;ll be in touch shortly to finalise the engagement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field id="name" label="Full name" autoComplete="name" required />
        <Field
          id="email"
          label="Work email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          id="company"
          label="Company"
          autoComplete="organization"
          required
        />
        <Field id="role" label="Your role (optional)" autoComplete="organization-title" />
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white p-4 cursor-pointer hover:border-purple/40 transition-colors">
        <input
          type="checkbox"
          name="agree"
          required
          className="mt-1 h-5 w-5 flex-shrink-0 accent-purple"
        />
        <span className="text-sm text-text">
          I have read and agree to the Impact Conversion Terms of Engagement
          set out above on behalf of the company named, and confirm I am
          authorised to do so.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-purple-2 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit acceptance"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12h14M13 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {status === "error" && errorMsg ? (
        <p role="alert" className="text-sm text-red-700">
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text"
      >
        {label}
        {required ? <span className="ml-1 text-purple">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 block w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-text shadow-sm transition-colors focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/30"
      />
    </div>
  );
}
