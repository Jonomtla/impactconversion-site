import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: "CRO for D2C Ecommerce Brands",
  description:
    "Conversion rate optimisation for $5M to $20M D2C brands on Shopify. Research-led experimentation that turns the traffic you&rsquo;re already paying for into revenue.",
  alternates: { canonical: "/for-d2c-ecommerce" },
};

const pains = [
  {
    h: "Paid CAC is up, margin is down",
    p: "Meta and Google keep asking for more to deliver the same result. The only lever that compounds in the other direction is site conversion, and most Shopify stores leave real revenue on the table in the surfaces nobody is actively testing.",
  },
  {
    h: "Every site change is a guess",
    p: "Your team ships redesigns, copy tweaks, and new sections based on taste and opinion, and nobody knows which ones helped, hurt, or drifted. Revenue per visitor tells the truth. Most teams aren&rsquo;t measuring it.",
  },
  {
    h: "The backlog is full, the calendar is empty",
    p: "You have thirty ideas from three agencies and nothing has been tested. Nobody has the hours to prioritise them, instrument the tracking, and ship experiments with the rigour they need.",
  },
];

const surfaces = [
  { h: "PDP above the fold", p: "The PDP is the highest-leverage surface on most sites. Three things tend to move the number: a headline that names the outcome, the top two objections handled in line, and genuine in-use imagery." },
  { h: "Checkout and post-purchase", p: "Shopify checkout has more room to move than most teams realise. Post-purchase upsells, shipping-threshold nudges, and extra trust density at payment usually unlock AOV worth caring about." },
  { h: "Collection pages for paid traffic", p: "If you run paid traffic to a collection, it&rsquo;s a landing page. Treat it like one: restate the promise, prime the category, and put proof above the product grid." },
  { h: "Homepage hero for returning traffic", p: "Problem-led heroes beat brand-voice heroes when the visitor is already comparing options, which describes most of your repeat traffic." },
  { h: "Cart drawer cross-sells", p: "Bundle apps get installed once and forgotten. Recommendation logic tuned to the actual basket lifts AOV, but only when you test which logic actually fires." },
];

export default function ForD2CPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "For D2C ecommerce" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                For D2C ecommerce brands
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Your ad spend is fine, your site is leaking.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                We run research-led CRO for Shopify brands doing $5M to $20M,
                turning the traffic you&rsquo;re already paying for into
                revenue with tests that hold up in the P&amp;L. Every
                engagement runs the same promise. Revenue uplift, or you
                don&rsquo;t pay.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  data-ga-event="book_call_click"
                  data-ga-location="icp_d2c_hero"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  See how we work
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Sound familiar?
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                The three problems every D2C team hits between $5M and $20M.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pains.map((p) => (
                <Reveal key={p.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                    <h3 className="text-xl font-semibold text-text">{p.h}</h3>
                    <p className="mt-3 text-text-muted">{p.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Where the wins usually hide
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Five surfaces, ranked by what moves the most for the least work.
              </h2>
            </Reveal>
            <ol className="mt-10 space-y-5">
              {surfaces.map((s, i) => (
                <Reveal key={s.h}>
                  <li className="flex gap-5 rounded-2xl border border-ink/10 bg-cream p-6">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{s.h}</h3>
                      <p
                        className="mt-1 text-text-muted"
                        dangerouslySetInnerHTML={{ __html: s.p }}
                      />
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <div className="mt-10 text-center">
              <Link
                href="/blog/cro-for-shopify-where-to-look"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple hover:gap-3 transition-all"
              >
                Read the full Shopify CRO breakdown
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Proof, not theory
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                What a typical engagement looks like.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                Weeks one and two are deep discovery research, where we survey
                your recent buyers, mine session recordings, and audit the top
                five funnels. The following ten weeks cover eight to twelve
                experiments, scored by ICE-L, shipped through a proper testing
                platform, and reported against revenue per visitor.
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">35%</p>
                  <p className="mt-2 text-sm text-text-muted">typical win rate on properly researched tests</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">2 cycles</p>
                  <p className="mt-2 text-sm text-text-muted">minimum test duration, with no peeking or early stops</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">RPV</p>
                  <p className="mt-2 text-sm text-text-muted">primary metric, locked before launch</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <GuaranteeBlock />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
