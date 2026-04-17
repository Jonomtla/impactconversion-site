import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import CountUp from "@/components/CountUp";

export const metadata = {
  title: "Case studies · Impact Conversion",
  description: "Real testing programs. Real revenue moved. Six-figure single wins and compounding programs.",
};

const caseStudies = [
  {
    slug: "high-performance-academy",
    name: "High Performance Academy",
    industry: "Online education",
    tagline: "180 tests. 18 months. $1M+ added.",
    headline:
      "Rebuilt the testing pipeline from customer research. Dozens of small wins compounded into real revenue.",
    stats: [
      { v: "$1M+", l: "Extra revenue" },
      { v: "35%", l: "Win rate" },
      { v: "180", l: "Tests shipped" },
      { v: "69%", l: "Lift on homepage" },
    ],
    quote:
      "We&apos;ve seen single wins that brought in six figures of additional revenue. The ROI is a no-brainer.",
    quoteBy: "Ben Silcock, Co-founder",
    wins: [
      "Messaging rewrite on the homepage drove 69% more new-visitor purchases.",
      "Post-cart upsells lifted AOV 15% at a 26% take rate.",
      "Logged-in cross-sells moved revenue per visitor up 30%.",
      "8% checkout conversion uplift shipped at 99% confidence.",
    ],
    featured: true,
  },
  {
    slug: "animal-training-academy",
    name: "Animal Training Academy",
    industry: "Online education",
    tagline: "Funnel rebuild and research-led testing.",
    headline:
      "Finally made the funnel work. Year-on-year revenue and new members both stepped up. Then kept moving.",
    stats: [
      { v: "+63%", l: "Revenue YoY" },
      { v: "+46%", l: "New members" },
    ],
    quote:
      "Having Impact on our team has been a major asset. The support and expertise we needed to finally make our funnel work. The project has been a game changer.",
    quoteBy: "Ryan Cartlidge, Founder",
  },
  {
    slug: "edmprod",
    name: "EDMProd",
    industry: "Online education",
    tagline: "Better leads, not just more.",
    headline:
      "Year-on-year performance moved straight away. The testing culture ended up being worth more than the numbers.",
    stats: [{ v: "+20%", l: "Qualified leads" }],
    quote:
      "Their insights into the industry are second to none. The decision making culture it&apos;s built inside our team is arguably worth more than the numbers.",
    quoteBy: "Aden, General Manager",
    photo: "/assets/avatar-aden.png",
  },
  {
    slug: "lead-gen-compound",
    name: "Matthew Morrison",
    industry: "Lead gen",
    tagline: "Conversion lifts that compound.",
    headline:
      "Lift conversion and lead quality goes up, CAC goes down. All three moving at once is how real growth happens.",
    stats: [{ v: "+20%", l: "More leads" }],
    quote:
      "Working with Impact didn&apos;t just lift conversion. It improved lead quality. More leads. Better leads. Lower CAC. It compounds.",
    quoteBy: "Matthew Morrison, Founder",
    photo: "/assets/avatar-matt.png",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero · different headline from homepage */}
        <section className="relative overflow-hidden bg-ink text-cream pt-40 pb-24 md:pt-52 md:pb-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Case studies
              </p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
                Revenue moved.{" "}
                <span className="text-gradient-flow-light">Receipts attached.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-text-inv-muted md:text-xl">
                Real programs. Real numbers. Tests that shipped, hit
                significance, and showed up in the P&amp;L, not in a deck.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Overview grid · clickable jump links */}
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-6">
            <StaggerGroup
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              stagger={0.08}
            >
              {caseStudies.map((c) => (
                <StaggerItem key={c.slug}>
                  <a
                    href={`#${c.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all hover:border-purple/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(124,90,236,0.3)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple">
                      {c.industry}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-text">
                      {c.name}
                    </h2>
                    <p className="mt-3 flex-1 text-sm text-text-muted">
                      {c.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 border-t border-ink/10 pt-4">
                      {c.stats.slice(0, 2).map((s) => (
                        <div key={s.l}>
                          <div className="text-lg font-bold text-purple">
                            {s.v}
                          </div>
                          <div className="text-[11px] uppercase tracking-wider text-text-muted">
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* HPA · featured deep dive */}
        <section
          id="high-performance-academy"
          className="relative overflow-hidden bg-ink text-cream py-24 md:py-32"
        >
          <div
            className="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-purple) 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
              <Reveal className="lg:col-span-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                  Featured case study
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                  High Performance Academy.{" "}
                  <span className="text-gradient-flow-light">18 months in.</span>
                </h2>
                <p className="mt-6 text-lg text-text-inv-muted">
                  Online automotive education platform. Strong traffic. Stalling
                  conversion rate. We embedded a full testing program, rebuilt
                  their hypothesis pipeline around customer research, and
                  shipped experiments week after week.
                </p>
                <p className="mt-4 text-lg text-text-inv-muted">
                  The result wasn&apos;t one big win. It was dozens of smaller
                  wins stacked on top of each other until the numbers moved.
                </p>
                <blockquote className="mt-10 border-l-2 border-purple-2 pl-6 text-lg italic text-cream">
                  &ldquo;We&apos;ve seen single wins that brought in six figures
                  of additional revenue. The ROI is a no-brainer. Beyond the
                  numbers, the testing process has instilled a culture of
                  experimentation that&apos;s removed assumptions from how we
                  make decisions.&rdquo;
                  <footer className="mt-4 not-italic text-sm text-text-inv-muted">
                    Ben Silcock, Co-founder
                  </footer>
                </blockquote>
              </Reveal>

              <div className="lg:col-span-7">
                <StaggerGroup
                  className="grid grid-cols-2 gap-4"
                  stagger={0.1}
                >
                  {caseStudies[0].stats.map((s) => (
                    <StaggerItem key={s.l}>
                      <div className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
                        <div className="text-xs uppercase tracking-wider text-text-inv-muted">
                          {s.l}
                        </div>
                        <div className="mt-2 text-4xl font-semibold tracking-tight text-cream md:text-5xl">
                          {s.v.match(/^\d+%?$/) ? (
                            <CountUp to={parseInt(s.v)} suffix={s.v.includes("%") ? "%" : ""} />
                          ) : (
                            s.v
                          )}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
                <Reveal
                  delay={0.3}
                  className="mt-4 rounded-2xl border border-cream/10 bg-cream/5 p-8"
                >
                  <p className="text-sm uppercase tracking-wider text-text-inv-muted">
                    What actually moved
                  </p>
                  <ul className="mt-4 space-y-3 text-lg text-cream">
                    {caseStudies[0].wins?.map((w) => (
                      <li key={w} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-2" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Other case studies · alternating layout */}
        {caseStudies.slice(1).map((c, i) => (
          <section
            key={c.slug}
            id={c.slug}
            className={`py-24 md:py-32 ${
              i % 2 === 0 ? "bg-cream" : "bg-cream-2"
            }`}
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
                <Reveal className="lg:col-span-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                    {c.industry}
                  </p>
                  <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
                    {c.name}
                  </h2>
                  <p className="mt-6 text-lg text-text-muted">{c.headline}</p>
                  <blockquote
                    className="mt-10 border-l-2 border-purple pl-6 text-lg italic text-text"
                    dangerouslySetInnerHTML={{
                      __html: `&ldquo;${c.quote}&rdquo;`,
                    }}
                  />
                  <div className="mt-4 flex items-center gap-3 pl-6">
                    {c.photo ? (
                      <Image
                        src={c.photo}
                        alt={c.quoteBy}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : null}
                    <div className="text-sm font-semibold text-text">
                      {c.quoteBy}
                    </div>
                  </div>
                </Reveal>
                <div className="lg:col-span-7">
                  <StaggerGroup
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    stagger={0.1}
                  >
                    {c.stats.map((s) => (
                      <StaggerItem key={s.l}>
                        <div className="rounded-2xl border border-ink/10 bg-white p-8">
                          <div className="text-xs uppercase tracking-wider text-text-muted">
                            {s.l}
                          </div>
                          <div className="mt-2 text-5xl font-semibold tracking-tight text-purple">
                            {s.v}
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </div>
              </div>
            </div>
          </section>
        ))}

        <CTA />
      </main>
      <Footer />
    </>
  );
}
