import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "The Guarantee, in Plain English",
  description:
    "You see a revenue uplift by the end of the 90-day sprint, or we refund the final 50% of the sprint fee. Here is exactly how that is measured and what it covers.",
  alternates: { canonical: "/guarantee" },
};

const terms = [
  {
    h: "The promise",
    p: "If a 90-day sprint does not produce a measurable revenue uplift by the end of the quarter, we refund the final 50% of the sprint fee. No argument, no renegotiation.",
  },
  {
    h: "What counts as a measurable uplift",
    p: "At least one experiment shipped during the sprint shows a lift on its primary metric, measured by your A/B testing platform against a live control, at the confidence threshold we agree in the test brief before launch. The primary metric is conversion rate or revenue per visitor, locked in writing before the test starts, never picked after the results come in. A conversion rate lift counts: pure revenue effects are often statistically hard to detect even when they are real, so the metric is agreed up front rather than argued about at the end.",
  },
  {
    h: "How it is measured",
    p: "Split-test data only. Variant against control, running at the same time, on the same traffic. We do not use before-and-after comparisons, because seasonality and ad-spend changes make them meaningless. The numbers come from the testing platform you can log into yourself.",
  },
  {
    h: "The guarantee needs you to do the work too",
    p: "Test code reviewed and approved within five business days of hand-off, access to your store, analytics, and testing tool granted at kick-off, and no unannounced changes to surfaces under test. If responses, approvals, or access stall long enough to block the program from running, the guarantee no longer applies. If that line is ever close, we will tell you in writing at the time, not at the end of the sprint.",
  },
  {
    h: "If there is no uplift",
    p: "We refund the final 50% of the sprint fee within 14 days. You keep everything the sprint produced: the research, the test code, and the documented learnings.",
  },
];

export default function GuaranteePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <WavyLines />
          <div className="relative mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "Guarantee" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                The guarantee
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                You see a revenue uplift, or you don&rsquo;t pay. Here are the
                terms.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                A guarantee only means something if you can see exactly how it
                is measured. This page is the whole deal, in plain English,
                with nothing hiding in a footnote.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <dl className="space-y-6">
              {terms.map((t) => (
                <Reveal key={t.h}>
                  <div className="rounded-2xl border border-ink/10 bg-white p-8">
                    <dt className="text-xl font-semibold text-text">{t.h}</dt>
                    <dd className="mt-3 text-text-muted leading-relaxed">
                      {t.p}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal>
              <p className="mt-10 text-text-muted leading-relaxed">
                Why we can offer this: every test we ship is measured against a
                live control, so by the end of a sprint there is no ambiguity
                about whether the program worked. The same discipline that
                makes the results trustworthy makes the guarantee safe to put
                in writing.
              </p>
            </Reveal>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
