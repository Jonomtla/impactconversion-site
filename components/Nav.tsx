"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
          ? "border-b border-cream/5 bg-ink/75 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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
        <nav className="hidden items-center gap-8 text-sm text-text-inv-muted md:flex">
          <Link href="/how-we-work" className="hover:text-cream transition-colors">
            How we work
          </Link>
          <Link href="/case-studies" className="hover:text-cream transition-colors">
            Case studies
          </Link>
          <Link href="/about" className="hover:text-cream transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-cream transition-colors">
            Contact
          </Link>
        </nav>
        <Link
          href="/contact"
          className="rounded-full bg-purple px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-2 hover:scale-105"
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}
