// Thin wrapper so every outbound CTA fires a named GA4 event.
// Gracefully no-ops in dev or if gtag hasn't loaded.

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: GtagEventParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

// Pre-defined events — use these so event names stay consistent
// and don't drift into free-form strings sprinkled through the codebase.
export const analytics = {
  bookCall: (location: string) => track("book_call_click", { location }),
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
