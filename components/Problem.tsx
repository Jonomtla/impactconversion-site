import LeakyFunnel from "./LeakyFunnel";
import VirtuousLoop from "./VirtuousLoop";
import ABTestBars from "./ABTestBars";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import TiltCard from "./motion/TiltCard";

const pillars = [
  {
    h: "Make your website work for more of the market",
    p: "For every person who converts on your website, there are probably 3 others that would have, if they found the information they needed. They were in the market for your product, but the section of your website they saw didn’t help overcome their fears or concerns enough. We find out what stops people converting, and where they look, so these customers convert better.",
    Visual: LeakyFunnel,
  },
  {
    h: "The irony of conversion rate optimisation",
    p: "Conversion rate optimisation has made people obsessed with their conversion rate. The reality is, increasing the average order value is just as important. Our process tests bumps, upsells, and cross sells to increase your margin each time you acquire a customer.",
    Visual: VirtuousLoop,
  },
  {
    h: "Get current customers to buy at a higher price",
    p: "Most companies raise their prices when they’re forced to. COGS go up. The margins don't make sense. And they send some long winded email explaining why. The reality is pricing can be far more than just COGS and margin, and it can be tested to find the optimal price point for your customers (and your growth).",
    Visual: ABTestBars,
  },
];

const fourWays = [
  "Get more customers.",
  "Get your current customers to spend more.",
  "Get your current customers to buy more regularly.",
  "And raise your prices.",
];

export default function Problem() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            Donating more money to Zuck than ever, but{" "}
            <span className="text-gradient-flow">
              not much more to show for it?
            </span>
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            Everyone says their ads are costing more than ever. They&apos;re
            spending more, not only on ad budgets, but creative teams, media
            buying, all to get more customers to their site.
          </p>
          <p className="mt-4 text-lg text-text-muted">
            The problem is, if you&apos;re just pouring more water into a leaky
            bucket, you&apos;re never going to actually get the growth that
            you&apos;re after.
          </p>
          <p className="mt-4 text-lg text-text-muted">
            You could keep pushing up budgets, making more creative, or hire a
            new Meta ads agency. But we all know how that typically goes. More
            spending. Less margin. Volatile results. At the mercy of the
            algorithm and the platform.
          </p>
          <p className="mt-4 text-lg text-text-muted">
            Or, you could figure out what actually converts your customers. Why
            do they land from an ad, and then leave? Why do they add to cart
            and are never heard from again? And what makes your best customers
            buy again and again?
          </p>
          <p className="mt-4 text-lg font-medium text-text">
            There are only 4 ways to get your business to grow.
          </p>
          <ul className="mt-4 space-y-2 text-lg text-text-muted">
            {fourWays.map((w) => (
              <li key={w} className="flex items-start gap-3">
                <span className="mt-[0.7em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple" />
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg text-text-muted">
            Ads only really influence 2 of those 4 effectively. Our CRO
            programs have been proven to address all four.
          </p>
          <p className="mt-4 text-lg font-medium text-text">
            Here&apos;s how:
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-8 md:grid-cols-3" stagger={0.15}>
          {pillars.map((p) => {
            const V = p.Visual;
            return (
              <StaggerItem key={p.h}>
                <TiltCard className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-8 md:p-10 transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(124,90,236,0.35)]">
                  <div className="-mx-2 mb-2">
                    <V />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text md:text-[26px]">
                    {p.h}
                  </h3>
                  <p className="mt-4 flex-1 text-text-muted leading-relaxed">
                    {p.p}
                  </p>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
