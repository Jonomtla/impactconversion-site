import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";

export const metadata = {
  title: "CRO for Online Education & Digital Products",
  description:
    "Conversion rate optimisation for online education brands doing $5M to $20M. Research-led experimentation on webinar funnels, launch pages, and evergreen flows.",
  alternates: { canonical: "/for-online-education" },
};

const pains = [
  {
    h: "Registrations are fine, show-up and buy rates are the problem",
    p: "You can fill a webinar, but the drop-off between registration and purchase is where the margin actually lives, and most funnels never get properly tested past the registration page.",
  },
  {
    h: "Launch revenue depends on a handful of pages you never test",
    p: "The sales page, the checkout, and the upsell sequence are the pages that decide whether a launch hits forecast, yet they usually get shipped once, tweaked on vibes, and never properly experimented on.",
  },
  {
    h: "Evergreen funnels drift and nobody notices",
    p: "Conversion rates on evergreen funnels decay quietly over time as the market shifts, so without continuous research and testing you are serving last year&rsquo;s message to this year&rsquo;s audience.",
  },
];

const surfaces = [
  { h: "Webinar registration to show-up", p: "The confirmation page, email sequence, SMS reminders, and pre-webinar engagement assets together usually hide the biggest gap in the whole funnel." },
  { h: "The replay page", p: "Usually where the money actually gets made, which is why proof density, urgency mechanics, offer-stack clarity, and checkout friction all deserve proper testing." },
  { h: "Sales page above the fold", p: "The headline has to do the work, and for most online education brands, outcome-led headlines beat feature-led headlines by a wide margin." },
  { h: "Checkout and order bumps", p: "A one-page checkout with the right order bump typically pulls a 15 to 25 percent take rate, and most programs are not testing this surface at all." },
  { h: "Post-purchase upsell sequence", p: "The five-minute window after purchase is the single highest-converting surface you own, and it is under-optimised almost everywhere." },
];

export default function ForOnlineEducationPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "For online education" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                For online education &amp; digital products
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                More buyers from the funnel you already have.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Research-led CRO for online education brands doing $5M to $20M
                on Kajabi, Teachable, or custom platforms. Our eighteen months
                with High Performance Academy added one to two million in
                revenue on the same ad spend, and every engagement runs on the
                same promise: you see a revenue uplift, or you don&rsquo;t pay.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  data-ga-event="book_call_click"
                  data-ga-location="icp_edu_hero"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/case-studies/hpa"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  See the HPA case study
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
                The three problems every online ed team hits at scale.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pains.map((p) => (
                <Reveal key={p.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                    <h3
                      className="text-xl font-semibold text-text"
                      dangerouslySetInnerHTML={{ __html: p.h }}
                    />
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
                Five surfaces, ranked by expected impact per unit of effort.
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
                      <p className="mt-1 text-text-muted">{s.p}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Proof, not theory
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                High Performance Academy, eighteen months, 180 tests.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                One to two million in additional revenue without increasing ad
                spend, with single-test wins driving $300k+ in projected
                annual revenue. Homepage messaging alone lifted new-visitor
                purchases 69 percent, and a checkout upsell at a 26 percent
                take rate added 15 percent to AOV.
              </p>
              <div className="mt-8">
                <Link
                  href="/case-studies/hpa"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple hover:gap-3 transition-all"
                >
                  Read the HPA case study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
