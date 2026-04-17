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
        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Let&apos;s see if we can{" "}
          <span className="text-gradient-glow">fix it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-inv-muted">
          Fifteen minutes. One call. We&apos;ll ask about your funnel, tell
          you how we&apos;d approach it, and be straight with you about
          whether we&apos;re a fit. No sales script.
        </p>
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
          Or email{" "}
          <a href="mailto:jono@impactconversion.com" className="text-cream underline underline-offset-4">
            jono@impactconversion.com
          </a>
        </p>
      </div>
    </section>
  );
}
