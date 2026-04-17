import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/assets/logo.png"
              alt="Impact Conversion"
              width={150}
              height={36}
              className="h-7 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-sm text-sm text-text-inv-muted">
              A CRO program for D2C ecommerce and online education brands that
              want more from the traffic they already paid for.
            </p>
            <a
              href="https://app.cal.com/jono-matla-8ixyzk/15-minute-free-consult"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-purple-2 hover:scale-105"
            >
              Book a 15-min intro call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-wider text-text-inv-muted">
              Site
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/how-we-work" className="text-cream/90 hover:text-cream transition-colors">How we work</Link></li>
              <li><Link href="/case-studies" className="text-cream/90 hover:text-cream transition-colors">Case studies</Link></li>
              <li><Link href="/about" className="text-cream/90 hover:text-cream transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-cream/90 hover:text-cream transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-wider text-text-inv-muted">
              Services
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/how-we-work" className="text-cream/90 hover:text-cream transition-colors">Conversion audits</Link></li>
              <li><Link href="/how-we-work" className="text-cream/90 hover:text-cream transition-colors">90-day sprints</Link></li>
              <li><Link href="/how-we-work" className="text-cream/90 hover:text-cream transition-colors">Ongoing programs</Link></li>
              <li><Link href="/how-we-work" className="text-cream/90 hover:text-cream transition-colors">Landing page builds</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-wider text-text-inv-muted">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:jono@impactconversion.com" className="text-cream/90 hover:text-cream transition-colors">
                  jono@impactconversion.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/impactconversion" target="_blank" rel="noopener noreferrer" aria-label="Impact Conversion on LinkedIn (opens in new tab)" className="text-cream/90 hover:text-cream transition-colors">
                  LinkedIn
                </a>
              </li>
              <li className="text-cream/90">Queenstown, New Zealand</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-text-inv-muted md:flex-row">
          <span>© {new Date().getFullYear()} Impact Conversion Ltd. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-cream transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
