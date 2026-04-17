export default function CTA() {
  return (
    <section id="book" className="relative overflow-hidden bg-ink text-cream py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-purple) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
          Ready when you are
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Let&apos;s move your{" "}
          <span className="text-gradient-glow">numbers.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-inv-muted">
          Fifteen minutes. One call. We ask about your funnel, show you how
          we&apos;d approach it, and tell you straight whether we&apos;re a
          fit. No slide deck. No sales script.
        </p>

        {/* Risk reversal pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs text-text-inv-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-purple-2">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No pitch deck
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs text-text-inv-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-purple-2">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            No pressure to book
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs text-text-inv-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-purple-2">
              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Three winning tests, or you don&apos;t pay
          </span>
        </div>

        <a
          href="https://app.cal.com/jono-matla-8ixyzk/15-minute-free-consult"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-purple px-8 py-4 text-base font-semibold text-white transition-all hover:bg-purple-2 hover:scale-105"
        >
          Book a 15-minute intro call
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <p className="mt-6 text-sm text-text-inv-muted">
          Prefer email?{" "}
          <a href="mailto:jono@impactconversion.com" className="text-cream underline underline-offset-4">
            jono@impactconversion.com
          </a>
        </p>
      </div>
    </section>
  );
}
