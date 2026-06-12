type Props = {
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
                className={`text-balance text-4xl font-semibold tracking-tight md:text-5xl ${
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
                quarter, we refund the final 50% of the sprint fee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
