import Link from "next/link";
import GamePlanForm from "@/components/GamePlanForm";

export const metadata = {
  title: "The Leaky Funnel Game Plan · Impact Conversion",
  description:
    "A free 15-minute session for D2C brands spending on ads. We look at your funnel live, show you where it leaks, and tell you straight if CRO is a fit.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/game-plan" },
};

const CTA_LABEL = "Book your free Game Plan";

function CtaButton({ location }: { location: string }) {
  return (
    <a
      href="#form"
      data-ga-event="book_call_click"
      data-ga-location={location}
      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-2"
    >
      {CTA_LABEL}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="transition-transform group-hover:translate-y-0.5"
      >
        <path
          d="M12 5v14M5 13l7 7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

export default function GamePlan() {
  return (
    <main id="main">
      {/* Hero: market callout + VSL */}
      <section className="bg-ink text-cream">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple-2">
            For D2C brands in Australia and New Zealand spending on ads
          </p>
          <h1 className="mt-4 text-balance font-black leading-[0.98] tracking-[-0.03em] text-[clamp(2.1rem,5.5vw,3.8rem)]">
            Spending more on ads every month,{" "}
            <span className="text-purple-2">but making less?</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-cream/80">
            The problem is almost never the ads. It is the pages the clicks land
            on. Watch the short video, then book a free 15-minute Leaky Funnel
            Game Plan and we will show you exactly where yours leaks.
          </p>

          {/* VSL slot — replace this block with the video embed once filmed */}
          <div className="mt-8 flex aspect-video w-full items-center justify-center rounded-2xl border border-cream/15 bg-cream/5">
            <div className="px-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cream/60">
                Two-minute video
              </p>
              <p className="mt-2 text-cream/80">
                How the Verified Lift Method works, coming here.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <CtaButton location="game_plan_hero" />
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="bg-cream-2 py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
            You will recognise at least one of these
          </h2>
          <ul className="mt-8 grid gap-4">
            {[
              "Ad costs climb every quarter, but revenue does not follow.",
              "You redesigned the site, and nothing changed.",
              "Your agency tests button colours and sends reports full of clicks.",
              "Nobody can tell you what any of it actually made you.",
            ].map((line) => (
              <li
                key={line}
                className="rounded-xl border border-ink/10 bg-white px-5 py-4 text-lg text-text"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple">
            A real example
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Everyone said trust. The research said confusion.
          </h2>
          <div className="mt-6 grid gap-5 text-lg leading-relaxed text-text-muted">
            <p>
              A premium bike rack brand came to us converting below where its
              traffic deserved. Every playbook said add badges, add reviews,
              add guarantees. Instead we read 1,910 customer reviews and
              surveyed over 500 shoppers. Trust scored 4.5 out of 5. It was a
              non-problem.
            </p>
            <p>
              The real problem: buyers could not tell which model fit their
              bike, and fit issues drove 80 percent of returns. We put the
              answer on the page where people choose. No popup, no quiz.
              Orders of the right model rose 28 percent.
            </p>
            <p className="text-text">
              Then the part almost no agency does: seven weeks after rollout we
              went back and verified the win held. Worth between $7,000 and
              $16,000 a month, still there.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["+28%", "orders of the right model"],
              ["98%", "statistical confidence"],
              ["$7-16k", "per month, verified it held"],
            ].map(([n, label]) => (
              <div
                key={label}
                className="rounded-xl border border-ink/10 bg-cream-2 px-4 py-5 text-center"
              >
                <div className="text-2xl font-black tracking-tight text-purple md:text-3xl">
                  {n}
                </div>
                <div className="mt-1 text-xs text-text-muted md:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System */}
      <section className="bg-ink py-16 text-cream md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            The Verified Lift Method
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              [
                "01 · Research",
                "Your customers tell us what is broken, in their own words. Reviews, surveys, session recordings, user tests.",
              ],
              [
                "02 · Test",
                "Real experiments judged on revenue per visitor, not clicks. We publish our losses as well as our wins.",
              ],
              [
                "03 · Verify",
                "Weeks after a win ships, we go back and check the money is still there. Almost nobody in this industry does this step.",
              ],
            ].map(([h, p]) => (
              <div
                key={h}
                className="rounded-2xl border border-cream/15 bg-cream/5 p-6"
              >
                <div className="font-mono text-xs uppercase tracking-wider text-purple-2">
                  {h}
                </div>
                <p className="mt-3 leading-relaxed text-cream/80">{p}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CtaButton location="game_plan_system" />
          </div>
        </div>
      </section>

      {/* What the call is */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
            What happens on the Game Plan call
          </h2>
          <ul className="mt-8 grid gap-4 text-lg text-text-muted">
            <li>
              <strong className="text-text">15 minutes, on your funnel, live.</strong>{" "}
              We open your store together and show you where the leaks most
              likely are.
            </li>
            <li>
              <strong className="text-text">You leave with the plan either way.</strong>{" "}
              Where we would look first and what the first tests would be.
              Yours to keep, work with us or not.
            </li>
            <li>
              <strong className="text-text">We are straight about fit.</strong> If your
              traffic is too low for testing to pay, we say so on the call and
              point you at better uses of the money.
            </li>
          </ul>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-cream-2 py-16 md:py-20">
        <div className="mx-auto w-full max-w-xl px-6">
          <GamePlanForm />
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 text-sm text-text-muted">
          <span>Impact Conversion · Queenstown, NZ</span>
          <Link href="/privacy" className="hover:text-text">
            Privacy
          </Link>
        </div>
      </footer>
    </main>
  );
}
