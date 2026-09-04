// Thin wrapper so every outbound CTA fires a named GA4 event.
// Gracefully no-ops in dev or if gtag hasn't loaded.

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

// Meta pixel standard event. No-ops if the pixel has not loaded.
export function metaEvent(event: string, params: GtagEventParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

export function track(event: string, params: GtagEventParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

// Google Ads conversion labels. Sent alongside the GA4 event so booked calls
// are attributable in Ads without relying on a GA4 import.
const ADS_BOOK_APPOINTMENT = "AW-17540678529/GW84CMC1p5gbEIGHhqxB";

// Fires the Ads conversion. Safe to call more than once for the same booking:
// the conversion action counts one per click, so Google dedupes.
export function adsConversion(sendTo: string) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: sendTo });
}

export const ADS_LABELS = {
  bookAppointment: ADS_BOOK_APPOINTMENT,
};

// Pre-defined events — use these so event names stay consistent
// and don't drift into free-form strings sprinkled through the codebase.
export const analytics = {
  bookCall: (location: string) => track("book_call_click", { location }),
  callBooked: (location: string) => {
    track("call_booked", { location });
    adsConversion(ADS_BOOK_APPOINTMENT);
  },
  emailClick: (location: string) => track("email_click", { location }),
  caseStudyOpen: (slug: string) => track("case_study_open", { slug }),
  toolUse: (tool: string, action: string) =>
    track("tool_use", { tool, action }),
  termsSubmit: () => track("terms_submit"),
  termsSubmitError: (reason: string) =>
    track("terms_submit_error", { reason }),
  outbound: (url: string, location: string) =>
    track("outbound_click", { url, location }),
};
