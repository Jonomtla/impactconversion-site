import Image from "next/image";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

type T = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  initials?: string;
  featured?: boolean;
  stats: { k: string; v: string }[];
};

const testimonials: T[] = [
  {
    quote:
      "We&rsquo;ve seen single wins that brought in six figures of additional revenue. The ROI is a no-brainer. Beyond the numbers, the testing process has instilled a culture of experimentation that&rsquo;s removed assumptions from how we make decisions.",
    name: "Ben Silcock",
    role: "Co-founder, High Performance Academy",
    initials: "BS",
    featured: true,
    stats: [
      { k: "$1M+", v: "Extra revenue" },
      { k: "35%", v: "Win rate" },
    ],
  },
  {
    quote:
      "Having Impact on our team has been a major asset. The support and expertise we needed to finally make our funnel work. The project has been a game changer.",
    name: "Ryan Cartlidge",
    role: "Founder, Animal Training Academy",
    initials: "RC",
    stats: [
      { k: "+57%", v: "Membership / 9mo" },
      { k: "+63%", v: "MRR / 9mo" },
    ],
  },
  {
    quote:
      "Impact have been fantastic to work with. They&rsquo;ve provided actionable advice and the changes have made a real difference.",
    name: "Matthew Morrison",
    role: "Co-founder, Kite Therapy",
    photo: "/assets/avatar-matt.png",
    stats: [
      { k: "Higher", v: "Lead quality" },
      { k: "Lower", v: "CAC" },
    ],
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            What clients say
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            Boring is the point.{" "}
            <span className="text-gradient-flow">Compounding is the result.</span>
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            We stay away from viral redesigns and rip-and-replace rebuilds, and
            instead ship tests that hit significance and move the line in the
            P&amp;L where it actually matters.
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-4" stagger={0.12}>
          {testimonials.map((t, i) => (
            <StaggerItem key={i} className={t.featured ? "lg:col-span-2" : "lg:col-span-1"}>
              <figure
                className={`flex h-full flex-col justify-between rounded-2xl bg-white p-8 transition-all hover:-translate-y-1 ${
                  t.featured
                    ? "border-2 border-purple/50 shadow-[0_20px_60px_-20px_rgba(124,90,236,0.35)] hover:border-purple/70"
                    : "border border-ink/10 hover:border-purple/30"
                }`}
              >
                <svg
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  fill="none"
                  className="text-purple"
                >
                  <path
                    d="M0 24V14C0 6.268 4.477 0 12 0v4C7.582 4 4 7.582 4 12h4v12H0zm16 0V14C16 6.268 20.477 0 28 0v4c-4.418 0-8 3.582-8 8h4v12h-8z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote
                  className="mt-6 text-lg leading-relaxed text-text"
                  dangerouslySetInnerHTML={{ __html: t.quote }}
                />
                <div className="mt-8">
                  <div className="flex flex-wrap gap-6 border-t border-ink/10 pt-6">
                    {t.stats.map((s) => (
                      <div key={s.v}>
                        <div className="text-2xl font-semibold text-purple">
                          {s.k}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-text-muted">
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {t.photo ? (
                      <Image
                        src={t.photo}
                        alt={t.name}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-soft text-sm font-semibold text-purple">
                        {t.initials}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-text">{t.name}</div>
                      <div className="text-sm text-text-muted">{t.role}</div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
