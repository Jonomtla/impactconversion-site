import GamePlanCal from "@/components/GamePlanCal";

export const metadata = {
  title: "Pick a time · The Leaky Funnel Game Plan",
  description: "Choose a time for your free 15-minute Leaky Funnel Game Plan.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/game-plan/schedule" },
};

export default function GamePlanSchedule() {
  return (
    <main id="main" className="min-h-screen bg-cream-2">
      <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-16">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-purple">
          Step 2 of 2
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Pick a time for your Game Plan
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-text-muted">
          15 minutes, on your funnel, live. Grab any slot that suits.
        </p>
        <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-2 shadow-sm md:p-4">
          <GamePlanCal />
        </div>
      </div>
    </main>
  );
}
