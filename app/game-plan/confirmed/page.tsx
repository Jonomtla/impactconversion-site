import Link from "next/link";

export const metadata = {
  title: "You're booked · The Leaky Funnel Game Plan",
  description: "Your Game Plan call is booked. Here is how to get the most out of it.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/game-plan/confirmed" },
};

export default function GamePlanConfirmed() {
  return (
    <main id="main" className="min-h-screen bg-cream-2">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:py-16">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple">
          Booked
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Done. Your Game Plan is locked in.
        </h1>

        <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-text">
            Three things before the call
          </h2>
          <ol className="mt-4 grid gap-3 text-lg text-text-muted">
            <li>
              <strong className="text-text">1. Accept the calendar invite</strong> so
              the time is held in both diaries.
            </li>
            <li>
              <strong className="text-text">2. Have your store open</strong> and know
              your rough monthly sessions and ad spend. That is all the prep
              the call needs.
            </li>
            <li>
              <strong className="text-text">3. Bring the question that bugs you most.</strong>{" "}
              The call works best pointed at the thing you actually lose sleep
              over.
            </li>
          </ol>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-text">
            While you wait, see how we work
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ["/case-studies", "Case studies", "Real programs, real numbers, losses included."],
              ["/how-we-work", "How we work", "The method, step by step."],
              ["/guarantee", "Our guarantee", "How we take the risk out of trying us."],
            ].map(([href, h, p]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition-colors hover:border-purple"
              >
                <div className="font-semibold text-text">{h}</div>
                <p className="mt-1 text-sm text-text-muted">{p}</p>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 text-sm text-text-muted">
          Need to change the time? Use the link in your confirmation email, or
          just reply to it.
        </p>
      </div>
    </main>
  );
}
