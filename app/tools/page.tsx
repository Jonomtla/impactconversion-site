import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Free CRO Tools",
  description:
    "Free calculators for ecommerce operators: CRO ROI forecasting and free-shipping profitability modelling.",
  alternates: { canonical: "/tools" },
};

const tools = [
  {
    href: "/tools/roi-calculator",
    title: "CRO ROI Calculator",
    blurb:
      "See exactly how much revenue you could unlock from the traffic you&rsquo;re already paying for. 12-month forecast with break-even analysis.",
    tag: "Forecasting",
  },
  {
    href: "/tools/ab-calculator",
    title: "A/B Test Significance Calculator",
    blurb:
      "Two-tailed z-test for proportions. Drop in visitors and conversions, get confidence, p-value, and relative lift.",
    tag: "Experimentation",
  },
  {
    href: "/tools/shipping-calculator",
    title: "Free Shipping Profitability Calculator",
    blurb:
      "Model the net impact of offering free shipping above a threshold. Break-even lift, scenario matrix, and per-bucket margin impact.",
    tag: "Pricing",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "Tools" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free tools
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Calculators for operators who care about the unit economics.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                The same models we use inside client engagements to pressure-test
                ideas before we ship them. Free, no email required.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {tools.map((t) => (
                <Reveal key={t.href}>
                  <Link
                    href={t.href}
                    className="group block rounded-2xl border border-ink/10 bg-white p-8 transition-all hover:border-purple/40 hover:shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple">
                      {t.tag}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-text">
                      {t.title}
                    </h2>
                    <p
                      className="mt-3 text-text-muted"
                      dangerouslySetInnerHTML={{ __html: t.blurb }}
                    />
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple group-hover:gap-3 transition-all">
                      Open calculator
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M13 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
