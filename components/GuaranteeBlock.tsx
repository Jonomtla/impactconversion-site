import Link from "next/link";

type Props = {
  /** Where "See the terms" should point. Defaults to the engagements section on how-we-work. */
  termsHref?: string;
  /** Light mode sits on cream/white pages; dark mode sits on ink/dark sections. */
  tone?: "light" | "dark";
};

/**
 * The "Revenue uplift, or you don't pay" guarantee block.
 *
 * Use it near case studies, on /how-we-work, and anywhere trust friction is
 * high (ICP pages, final CTAs). The headline copy should not be reworded
 * without updating the inline mentions elsewhere so the promise stays
 * consistent across the site.
 */
export default function GuaranteeBlock({
  termsHref = "/how-we-work#engagements",
  tone = "light",
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
            {/* Dashed circular badge */}
            <div
              aria-hidden
              className={`flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed ${
                isDark ? "border-purple-2" : "border-purple"
              }`}
            >
              <span
                className={`px-4 text-center text-[11px] font-bold uppercase leading-tight tracking-wider ${
                  isDark ? "text-purple-2" : "text-purple"
                }`}
              >
                Revenue
                <br />
                uplift
                <br />
                or you
                <br />
                don&apos;t pay
              </span>
            </div>

            {/* Headline + body */}
            <div className="flex-1">
              <h2
                id="guarantee-heading"
                className={`text-balance text-3xl font-semibold tracking-tight md:text-4xl ${
                  isDark ? "text-cream" : "text-text"
                }`}
              >
                You see a revenue uplift, or you don&apos;t pay.
              </h2>
              <p
                className={`mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${
                  isDark ? "text-text-inv-muted" : "text-text-muted"
                }`}
              >
                That is the deal on every 90-day sprint we run. If the program
                does not produce a measurable revenue uplift by the end of the
                quarter, we refund the final 50% of the sprint fee. No
                asterisks, no vanity metrics, and no hiding behind &ldquo;we
                ran some experiments.&rdquo;
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <Link
                href={termsHref}
                className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-2 hover:scale-105"
              >
                See the terms
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
