import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import GuaranteeBlock from "@/components/GuaranteeBlock";

export const metadata = {
  title: "A/B Testing Agency · Statistical Rigour for Ecommerce",
  description:
    "An A/B testing agency that runs tests with proper power analysis, Bayesian peeking rules, and verdicts that hold under scrutiny. For $5M to $20M D2C ecommerce and online education brands.",
  alternates: { canonical: "/services/ab-testing" },
};

const broken = [
  {
    h: "Stopping the test the second it crosses 95%",
    p: "Bayesian peeking is allowed, but only with rules. Continuous monitoring without sequential correction inflates false positives by two to three times. A test that hits 95% on day two and gets called is more likely to be noise than signal.",
  },
  {
    h: "Segment hunting after the fact",
    p: "Splitting the audience by device, source, country, and new-vs-returning until one of them goes green is how you generate confident-looking wins that don&rsquo;t replicate. Segments are pre-registered or they don&rsquo;t count.",
  },
  {
    h: "Linked metrics counted as independent confirmations",
    p: "ATC and CVR are mechanistically linked. Same noise event pumps both. Two metrics moving in the same direction is directional confirmation, not independent validation. Most teams treat them as the latter.",
  },
  {
    h: "Calling wins on point estimate alone",
    p: "The point estimate is the central best guess of a posterior with a range that often spans zero to seventy percent. Shipping based on the headline number without reading the credible interval is how you ship lifts that don&rsquo;t hold up after rollout.",
  },
];

const rules = [
  { h: "Pre-test power analysis", p: "Before launch, we calculate the minimum detectable effect at your target test duration. If the surface doesn&rsquo;t have the volume to detect a lift you&rsquo;d care about, we don&rsquo;t run the test." },
  { h: "Primary metric locked in the brief", p: "Default to CVR unless there&rsquo;s a specific reason for a funnel step or revenue metric. Locked before launch, not after." },
  { h: "Track A versus Track B", p: "Low-risk UX tests follow a three-day stability rule. Functional and commercial tests have a fourteen-day minimum to capture day-of-week effects. The track is picked at brief time, not at call time." },
  { h: "Stable signal, not magic dates", p: "A win needs three consecutive days at or above ninety-five percent probability-to-beat-baseline, with primary and secondary metrics in agreement, and minimum order count per arm." },
  { h: "Descriptive language at handoff", p: "&lsquo;During the test we observed +28 percent CVR uplift with 96 percent confidence&rsquo;, not &lsquo;you got a +28 percent lift&rsquo;. We don&rsquo;t promise replication. We hardcode and watch." },
];

const platforms = [
  { name: "Intelligems", note: "Preferred for Shopify. Server-side rendering, native theme integration." },
  { name: "GrowthBook", note: "Open-source, self-hostable. Strong feature flag and stats engine." },
  { name: "Convert", note: "Solid generalist. Good for non-Shopify ecommerce." },
  { name: "ABTasty", note: "Enterprise license already in place? Fine. Otherwise expensive." },
  { name: "Optimizely", note: "Works. Capable. Expensive. We don&rsquo;t lead with it." },
];

const faqs = [
  {
    q: "Do I need a testing tool already installed?",
    a: "No. Part of the engagement covers tool selection if you don&rsquo;t already have one. We don&rsquo;t take referral fees, so the recommendation is based on your stack and traffic volume, not on what pays us.",
  },
  {
    q: "How many tests can I expect per month?",
    a: "Two to four shipped experiments. More is possible on high-traffic stores. Less is sometimes the right call when a single test needs three weeks to detect the lift that matters.",
  },
  {
    q: "What happens to the test code after a win?",
    a: "Hardcoded into your theme or platform during the next release window. The learnings library captures the hypothesis, the result, and the reasoning. Future hypotheses build on it.",
  },
  {
    q: "Do you do multivariate testing?",
    a: "Rarely. Most teams need fewer, sharper tests rather than more arms. Multivariate is the right call when interaction effects matter and you have the traffic to support eight or sixteen variants. Most ecommerce surfaces don&rsquo;t.",
  },
  {
    q: "Can you audit our current testing program?",
    a: "Yes. The first month of every engagement is, in part, exactly that. We look at the tests you&rsquo;ve called, the calling rule you used, and the results that actually replicated post-rollout. Most programs have a hidden false-positive rate above twenty percent.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "A/B Testing",
  provider: {
    "@type": "Organization",
    name: "Impact Conversion",
    url: "https://impactconversion.com",
  },
  description:
    "A/B testing agency for ecommerce and online education brands. Statistical rigour, Bayesian methodology, verdicts that hold.",
};

export default function ABTestingPage() {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumbs items={[{ label: "Services" }, { label: "A/B testing" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Services · A/B testing agency
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                A/B testing run with statistical rigour, not vibes.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-text-inv-muted">
                Most A/B testing programs are statistically broken. Peeking, segment hunting, calling wins on point estimate, treating linked metrics as independent confirmations. We run testing programs that hold up six months after rollout, not just at the moment the dashboard goes green.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  data-ga-event="book_call_click"
                  data-ga-location="services_ab_hero"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
                >
                  Book a 15-min intro call
                </Link>
                <Link
                  href="/blog/ab-tests-statistically-broken"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
                >
                  Read: why most A/B tests are statistically broken
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What goes wrong
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Four ways A/B testing programs quietly lie to you.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {broken.map((b) => (
                <Reveal key={b.h}>
                  <div className="h-full rounded-2xl border border-ink/10 bg-white p-8">
                    <h3 className="text-xl font-semibold text-text">{b.h}</h3>
                    <p
                      className="mt-3 text-text-muted"
                      dangerouslySetInnerHTML={{ __html: b.p }}
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
                How we run it
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Five rules locked at brief time, not at call time.
              </h2>
            </Reveal>
            <ol className="mt-10 space-y-5">
              {rules.map((r, i) => (
                <Reveal key={r.h}>
                  <li className="flex gap-5 rounded-2xl border border-ink/10 bg-cream p-6">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text">{r.h}</h3>
                      <p
                        className="mt-1 text-text-muted"
                        dangerouslySetInnerHTML={{ __html: r.p }}
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
                Tools we work with
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Platform-agnostic. No referral fees.
              </h2>
              <p className="mt-5 text-lg text-text-muted">
                We deploy through your existing testing tool, or help you pick one. The methodology matters more than the platform. These are the tools we ship through most often.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {platforms.map((p) => (
                <Reveal key={p.name}>
                  <div className="rounded-2xl border border-ink/10 bg-white p-6">
                    <h3 className="text-lg font-semibold text-text">{p.name}</h3>
                    <p
                      className="mt-2 text-sm text-text-muted"
                      dangerouslySetInnerHTML={{ __html: p.note }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                Frequently asked
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
                Questions A/B testing buyers ask before booking.
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
