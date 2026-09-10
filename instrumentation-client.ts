// Runs before React hydration. Initialises gtag and fires the first pageview
// with document.referrer captured, so fast bouncers and originating sources
// are recorded reliably — @next/third-parties' default afterInteractive
// timing was losing both.

export {};

const GA_ID = "G-LDW54LST21";
// Google Ads. Conversions are sent as gtag events with a send_to label;
// see lib/analytics.ts adsConversion().
const ADS_ID = "AW-17540678529";
// Meta pixel (Impact Conversion ad account). Standard events are fired from
// lib/analytics.ts metaEvent(); Lead is reserved for qualified magnet leads.
const META_PIXEL_ID = "810167591458471";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

if (typeof window !== "undefined" && !window.gtag) {
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  // gtag.js only processes Arguments objects pushed to dataLayer; a plain
  // array from rest params is silently ignored.
  function gtag(..._args: unknown[]) {
    void _args;
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, {
    page_referrer: document.referrer || undefined,
    send_page_view: true,
  });
  gtag("config", ADS_ID);

  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
}

if (typeof window !== "undefined" && !window.fbq) {
  type FbqStub = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[];
    push: unknown;
    loaded: boolean;
    version: string;
  };
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as FbqStub;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
  const f = document.createElement("script");
  f.src = "https://connect.facebook.net/en_US/fbevents.js";
  f.async = true;
  document.head.appendChild(f);
}
