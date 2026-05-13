import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: "CRO Agency Australia · Conversion Rate Optimisation",
  description:
    "An Australia-focused CRO agency for $5M to $20M Shopify and online education brands. Local timezone, AU payment-method mix, GST-aware checkout testing, research-led testing program. Book a 15-minute call.",
  alternates: { canonical: "/cro-agency-australia" },
};

const australiaContext = [
  {
    h: "AU payment-method mix",
    p: "Afterpay, Zip, Klarna, Apple Pay, PayPal. Australian buyers are heavier BNPL users than US or UK shoppers. The way you display payment options at checkout, and the order you display them in, moves conversion in ways US-defaults don&rsquo;t.",
  },
  {
    h: "GST-aware pricing display",
    p: "GST-inclusive pricing is the AU norm. Stores that import US themes often display ex-GST on the PDP and add tax at checkout. Every percent of cart abandonment we&rsquo;ve traced back to this surprise has been worth fixing.",
  },
  {
    h: "Shipping rhythms by state",
    p: "WA, NT, and TAS pricing and delivery windows are genuinely different from the eastern seaboard. Free-shipping thresholds tuned for &lsquo;Australia&rsquo; as a single market leave money on the table on both ends of the country.",
  },
  {
    h: "Local timezone, local accountability",
    p: "We work AEDT/AEST hours. Test reviews land in your morning. When a test surfaces a result that needs a same-day call, you&rsquo;re not waiting until tomorrow your time for our reply.",
  },
];

const surfaces = [
  { h: "PDP above the fold", p: "Headline that names the outcome, top two objections handled in line, in-use imagery. Most Australian Shopify PDPs inherit US theme defaults that don&rsquo;t match local buyer behaviour." },
  { h: "Checkout", p: "Trust density at payment, BNPL placement, free-shipping mechanics tuned to AU state-by-state delivery costs. Shopify Checkout Extensibility now allows the level of testing we&rsquo;ve wanted for years." },
  { h: "Post-purchase upsells", p: "The thank-you page is the highest-converting surface in the funnel and almost nobody tests it. For one client a single post-purchase offer hit a twenty-six percent take rate." },
  { h: "Collection pages for paid traffic", p: "If you&rsquo;re paying Meta to send buyers to a collection, it&rsquo;s a landing page. Restate the promise, prime the category, put proof above the grid." },
  { h: "Cart drawer cross-sells", p: "Recommendation logic that fires on basket composition lifts AOV in a way bundle-app defaults never will." },
];

const faqs = [
  {
    q: "Are you based in Australia?",
    a: "No. We&rsquo;re based in New Zealand and work with AU clients across AEDT/AEST. Most of our active clients run on the same timezone-overlap pattern. Calls land in your business day, briefs land in your inbox by start-of-day.",
  },
  {
    q: "Which Australian brands have you worked with?",
    a: "We work with brands across D2C ecommerce and online education in the $5M to $20M revenue band. Case studies are available on the case studies page, including engagements that have run twelve months or longer.",
  },
  {
    q: "Do you charge in AUD?",
    a: "Yes. Engagements are priced in AUD for Australian clients. NZD or USD on request.",
  },
  {
    q: "Will you work with our existing dev team?",
    a: "Preferred. The cleanest engagements have your devs reviewing our code before it ships. Reduces theme conflicts and keeps everyone aligned.",
  },
  {
    q: "Do you run tests on Australian-specific surfaces like Afterpay placement?",
    a: "Yes, where the volume supports a clean test. Afterpay placement on PDP versus cart versus checkout is one of the recurring AU-specific tests we run. The right answer depends on AOV and category.",
  },
  {
    q: "Can you help us choose a CRO testing tool?",
    a: "Yes. Intelligems for Shopify, GrowthBook if you want to self-host, ABTasty or Convert for enterprise. We don&rsquo;t take referral fees, so the recommendation is honest.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a.replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'"),
    },
  })),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Impact Conversion",
  description: "Conversion rate optimisation agency working with Australian D2C ecommerce and online education brands.",
  url: "https://impactconversion.com/cro-agency-australia",
  areaServed: { "@type": "Country", name: "Australia" },
  priceRange: "$$$",
  serviceType: "Conversion Rate Optimisation",
};

export default function CROAgencyAustraliaPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "CRO Agency Australia" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                For Australian brands
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                A CRO agency for Australian D2C ecommerce and online education brands.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Conversion rate optimisation for $5M to $20M Australian Shopify stores, course brands, and digital products. Local timezone, AU payment-method mix, GST-aware checkout testing, statistical rigour your CFO can sign off.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="geo_au_hero"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/services/conversion-rate-optimisation"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  How we run engagements
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What&rsquo;s different about the Australian market
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Four things US-defaults get wrong on AU stores.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                Most Shopify themes ship with US defaults. Most CRO playbooks were written for US ecommerce. Both work, mostly. Both also leave Australian-specific revenue on the table.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {australiaContext.map((c) => (
                <Reveal key={c.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                    <h3 className="text-xl font-semibold text-text">{c.h}</h3>
                    <p
                      className="mt-3 text-text-muted"
                      dangerouslySetInnerHTML={{ __html: c.p }}
                    />
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
                Where we tend to find the wins
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Five surfaces that account for most of what we ship.
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
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Verified numbers
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                One D2C client. Eighteen months. The same loop, run properly.
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">$1M-$2M</p>
                  <p className="mt-2 text-sm text-text-muted">added revenue across the engagement</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">180 tests</p>
                  <p className="mt-2 text-sm text-text-muted">shipped, with a thirty-five percent win rate</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <p className="text-3xl font-bold text-purple">69%</p>
                  <p className="mt-2 text-sm text-text-muted">lift on the homepage that compounded for the rest of the engagement</p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple hover:gap-3 transition-all"
                >
                  Read the full case studies
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Frequently asked
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Questions Australian operators ask before booking.
              </h2>
            </Reveal>
            <dl className="mt-10 space-y-6">
              {faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="rounded-2xl border border-ink/10 bg-cream p-6">
                    <dt className="text-lg font-semibold text-text">{f.q}</dt>
                    <dd
                      className="mt-2 text-text-muted"
                      dangerouslySetInnerHTML={{ __html: f.a }}
                    />
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <GuaranteeBlock />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
