"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/how-we-work", label: "How we work" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-cream/10 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="Impact Conversion"
            width={150}
            height={36}
            className="h-7 w-auto brightness-0 invert"
            priority
          />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 text-sm text-text-inv-muted md:flex">
          {links.map((l) => {
            const active =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-1.5 transition-colors ${
                  active
                    ? "text-cream"
                    : "hover:text-cream hover:bg-cream/5"
                }`}
              >
                {l.label}
                {active ? (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-purple-2" />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1.5 rounded-full bg-purple px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-2 hover:scale-105"
        >
          Book a call
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path
              d="M5 12h14M13 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
