import CountUp from "./CountUp";

export default function CaseStudy() {
  return (
    <section id="results" className="relative overflow-hidden bg-ink text-cream py-24 md:py-32">
      <div
        className="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-purple) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
              Case study
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              High Performance Academy.{" "}
              <span className="text-gradient-glow">18 months in.</span>
            </h2>
            <p className="mt-6 text-lg text-text-inv-muted">
              Online automotive education platform. Strong traffic. Stalling
              conversion rate. We embedded a full testing program, rebuilt
              their hypothesis pipeline around customer research, and shipped
              experiments week after week.
            </p>
            <p className="mt-4 text-lg text-text-inv-muted">
              The result wasn&apos;t one big win. It was dozens of smaller
              wins stacked on top of each other until the numbers moved.
            </p>
            <blockquote className="mt-10 border-l-2 border-purple-2 pl-6 text-lg italic text-cream">
              &ldquo;We&apos;ve seen single wins that brought in six figures of
              additional revenue. The ROI is a no-brainer. Beyond the numbers,
              the testing process has instilled a culture of experimentation
              that&apos;s removed assumptions from how we make decisions.&rdquo;
              <footer className="mt-4 not-italic text-sm text-text-inv-muted">
                Ben Silcock, Co-founder
              </footer>
            </blockquote>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Metric label="Extra revenue" sub="No extra ad spend">
                <CountUp to={1} prefix="$" suffix="M+" />
              </Metric>
              <Metric label="Tests shipped" sub="Over 18 months">
                <CountUp to={180} />
              </Metric>
              <Metric label="Win rate" sub="Industry avg ~22%">
                <CountUp to={35} suffix="%" />
              </Metric>
            </div>
            <div className="mt-4 rounded-2xl border border-cream/10 bg-cream/5 p-8">
              <p className="text-sm uppercase tracking-wider text-text-inv-muted">
                What actually moved
              </p>
              <ul className="mt-4 space-y-3 text-lg text-cream">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                  Messaging rewrite on the homepage drove 69% more new-visitor purchases.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                  Post-cart upsells lifted AOV 15% at a 26% take rate.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                  Logged-in cross-sells moved revenue per visitor up 30%.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  children,
  sub,
}: {
  label: string;
  children: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
      <div className="text-xs uppercase tracking-wider text-text-inv-muted">
        {label}
      </div>
      <div className="mt-2 text-5xl font-semibold tracking-tight text-cream">
        {children}
      </div>
      <div className="mt-1 text-sm text-text-inv-muted">{sub}</div>
    </div>
  );
}
