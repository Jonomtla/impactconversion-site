// Runs before React hydration. Initialises gtag and fires the first pageview
// with document.referrer captured, so fast bouncers and originating sources
// are recorded reliably — @next/third-parties' default afterInteractive
// timing was losing both.

export {};

const GA_ID = "G-LDW54LST21";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

if (typeof window !== "undefined" && !window.gtag) {
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  const gtag = (...args: unknown[]) => {
    dataLayer.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, {
    page_referrer: document.referrer || undefined,
    send_page_view: true,
  });

  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
}
