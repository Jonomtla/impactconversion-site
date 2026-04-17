"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Hide on the /contact page (already has the primary CTA above the fold)
  const hide = pathname === "/contact" || pathname.startsWith("/terms-of-service");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hide) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="https://app.cal.com/jono-matla-8ixyzk/15-minute-free-consult"
        target="_blank"
        rel="noopener noreferrer"
        data-ga-event="book_call_click"
        data-ga-location="sticky_mobile"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-purple px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-purple-2"
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
