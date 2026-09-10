import LeakyFunnel from "./LeakyFunnel";
import VirtuousLoop from "./VirtuousLoop";
import ABTestBars from "./ABTestBars";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import TiltCard from "./motion/TiltCard";

const pillars = [
  {
    h: "Convert more of the people already visiting",
    p: "For every person who buys or books, there are others who would have if the page had answered their question. They were in the market. The page they saw did not settle the doubt that stopped them. We find out what that doubt is and where they look for the answer, then put it there.",
    Visual: LeakyFunnel,
  },
  {
    h: "Earn more from every transaction",
    p: "Conversion rate is only half of it. What each customer spends matters just as much. We test the add-ons, upgrades and bundles that lift the value of every order or booking, so each customer you pay to acquire is worth more.",
    Visual: VirtuousLoop,
  },
  {
    h: "Find the price the market will actually pay",
    p: "Most businesses change prices when they are forced to, and guess at the number. Pricing can be tested like anything else on the site, so you find the point that grows revenue without losing the customers you have.",
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
            Paying more for every customer than ever, but{" "}
            <span className="text-gradient-flow">
              not much more to show for it?
            </span>
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            Every channel costs more than it did. Google and Meta clicks,
            commissions to marketplaces and booking platforms, creative,
            agencies. All of it spent to get people to a website that most of
            them leave.
          </p>
          <p className="mt-4 text-lg text-text-muted">
            If the website converts two visitors in a hundred, every dollar of
            that spend is working at two percent. Buying more traffic makes the
            leak bigger, not smaller.
          </p>
          <p className="mt-4 text-lg text-text-muted">
            You could keep pushing budgets up, make more creative, or switch
            agencies. We all know how that goes. More spend, less margin,
            results that swing with the platform.
          </p>
          <p className="mt-4 text-lg text-text-muted">
            Or you could find out what actually converts your customers. Why
            do they land, look, and leave? Why do they start a booking or add
            to cart and never finish? And what makes your best customers come
            back?
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
            Traffic only really moves the first one. A conversion program
            moves all four.
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
