"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Hide on the /contact page (already has the primary CTA above the fold)
  const hide = pathname === "/contact" || pathname.startsWith("/terms-of-service");

  useEffect(() => {
    const onScroll = () => {
      const scrolledPast = window.scrollY > 500;
      // Hide once the footer is close so the bar never covers it.
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 320;
      setVisible(scrolledPast && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (hide) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="/contact#book"
        tabIndex={visible ? 0 : -1}
        data-ga-event="book_call_click"
        data-ga-location="sticky_cta"
        className="mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-purple-2 md:max-w-xs"
      >
        Book a 15-min intro call
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
