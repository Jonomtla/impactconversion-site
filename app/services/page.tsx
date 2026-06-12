import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WavyLines from "@/components/WavyLines";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";
import How from "@/components/How";

export const metadata = {
  title: "CRO Services & Pricing",
  description:
    "Conversion rate optimisation for direct-to-consumer brands. One research-led testing loop: research, prioritise, test, compound. Pricing starts at $5,000 per month.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    href: "/services/conversion-rate-optimisation",
    label: "Conversion rate optimisation",
  },
  {
    href: "/services/shopify-cro",
    label: "Shopify CRO",
  },
  {
    href: "/services/ab-testing",
    label: "A/B testing",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://impactconversion.com${s.href}`,
    name: s.label,
  })),
};

export default function ServicesIndexPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <WavyLines />
          <div className="relative mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "Services" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Services
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                We do one thing, and we do it well: CRO.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Every engagement runs the same four-stage loop: research, prioritise, test, compound. Pricing starts at $5,000 per month.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="services_index_hero"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center gap-2 rounded-xl border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  See how we work
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <How />

        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">
                Looking for a specific shape?
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="inline-flex items-center gap-1.5 text-base font-semibold text-purple hover:gap-2.5 transition-all"
                  >
                    {s.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Based in Queenstown. Working with brands in NZ, AU, US, and the UK.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                Running an Australian or New Zealand brand? These pages cover the
                same program in your timezone and local-currency pricing. Same
                methodology, run no differently than anywhere else.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/cro-agency-australia"
                  className="inline-flex items-center gap-2 rounded-xl border border-purple/30 bg-white px-5 py-2 text-sm font-semibold text-purple transition-colors hover:bg-purple hover:text-white"
                >
                  CRO Agency Australia
                </Link>
                <Link
                  href="/cro-agency-nz"
                  className="inline-flex items-center gap-2 rounded-xl border border-purple/30 bg-white px-5 py-2 text-sm font-semibold text-purple transition-colors hover:bg-purple hover:text-white"
                >
                  CRO Agency NZ
                </Link>
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
