import Link from "next/link";

type Props = {
  /** Light mode sits on cream/white pages; dark mode sits on ink/dark sections. */
  tone?: "light" | "dark";
  /** Where the CTA points. Pages with an on-page booking embed pass "#book". */
  ctaHref?: string;
};

/**
 * The guarantee block: revenue uplift by the end of the 90-day sprint, or we
 * refund the final 50% of the sprint fee.
 *
 * Use it near case studies, on /how-we-work, and anywhere trust friction is
 * high (ICP pages, final CTAs). The headline copy should not be reworded
 * without updating the inline mentions elsewhere so the promise stays
 * consistent across the site, and it must always match the terms on /guarantee.
 */
export default function GuaranteeBlock({
  tone = "light",
  ctaHref = "/contact#book",
}: Props) {
  const isDark = tone === "dark";

  return (
    <section
      className={`py-12 md:py-16 ${isDark ? "bg-ink" : "bg-cream"}`}
      aria-labelledby="guarantee-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`relative overflow-hidden rounded-3xl border px-6 py-10 md:px-12 md:py-12 ${
            isDark
              ? "border-purple-2/30 bg-purple/15"
              : "border-purple/20 bg-purple-soft"
          }`}
        >
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-10">
            {/* Headline + body */}
            <div className="flex-1">
              <h2
                id="guarantee-heading"
                className={`text-balance text-4xl font-semibold tracking-tight md:text-5xl ${
                  isDark ? "text-cream" : "text-text"
                }`}
              >
                A written guarantee on every 90-day sprint.
              </h2>
              <p
                className={`mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${
                  isDark ? "text-text-inv-muted" : "text-text-muted"
                }`}
              >
                If the sprint does not produce a measurable revenue uplift by the
                end of the quarter, we refund the final 50% of the sprint fee.
                The terms are written down before we start, and you can read
                them now.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-shrink-0 flex-col items-start gap-3 md:items-center">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
              >
                Get in touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/guarantee"
                className={`text-sm font-medium underline underline-offset-4 ${
                  isDark ? "text-text-inv-muted hover:text-cream" : "text-text-muted hover:text-text"
                }`}
              >
                See the terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
