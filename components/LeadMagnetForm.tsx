"use client";

import { useEffect, useRef } from "react";
import { track, metaConversion } from "@/lib/analytics";

type Props = {
  /** Analytics label for where this form is rendered. */
  source?: string;
  /** Heading text above the form. */
  heading?: string;
  /** Small supporting line under the heading. */
  subhead?: string;
  /** Optional override for the Kit form UID. */
  formUid?: string;
};

const DEFAULT_UID = "b2175f7e6a";
const SRC = (uid: string) => `https://impact-conversion.kit.com/${uid}/index.js`;

export default function LeadMagnetForm({
  source = "lead_magnet_7ck",
  heading = "Get the 7 Conversion Killers PDF",
  subhead = "One email. The PDF in your inbox in under a minute. No drip funnel junk.",
  formUid = DEFAULT_UID,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    if (host.querySelector(`script[data-uid="${formUid}"]`)) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = SRC(formUid);
    s.setAttribute("data-uid", formUid);
    host.appendChild(s);
  }, [formUid]);

  // Kit renders its own form inside this container and handles the subscribe
  // itself, so there is no server step of ours to hang tracking off. Delegate
  // a submit listener on the host instead: it fires on the visitor's submit,
  // which is the only signal Kit's embed gives us.
  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    const onSubmit = (e: Event) => {
      const form = (e.target as HTMLElement | null)?.closest("form");
      if (!form) return;
      const email = form.querySelector<HTMLInputElement>(
        'input[type="email"], input[name="email_address"]',
      )?.value;
      track("lead_submit", { location: source });
      metaConversion(
        "Lead",
        { content_name: "7-conversion-killers", location: source },
        { email: email || undefined },
      );
    };
    host.addEventListener("submit", onSubmit, true);
    return () => host.removeEventListener("submit", onSubmit, true);
  }, [source]);

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-xl font-semibold tracking-tight text-text md:text-2xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm text-text-muted">{subhead}</p>
      <style>{`.formkit-powered-by-convertkit { display: none !important; }`}</style>
      <div ref={containerRef} className="mt-5" />
    </div>
  );
}
