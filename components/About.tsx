import Link from "next/link";

export default function About() {
  return (
    <section className="bg-cream-2 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
              We run narrow.{" "}
              <span className="text-gradient-purple">On purpose.</span>
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white border border-ink/10 p-6">
                <p className="text-xs uppercase tracking-wider text-text-muted">Based in</p>
                <p className="mt-2 text-2xl font-semibold text-text">Queenstown, NZ</p>
                <p className="mt-1 text-sm text-text-muted">We pick up the phone early and late.</p>
              </div>
              <div className="rounded-2xl bg-white border border-ink/10 p-6">
                <p className="text-xs uppercase tracking-wider text-text-muted">Working with brands in</p>
                <p className="mt-2 text-2xl font-semibold text-text">US, AU, EU, APAC</p>
                <p className="mt-1 text-sm text-text-muted">Timezone never gets in the way.</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-white border border-ink/10 p-6">
              <p className="text-xs uppercase tracking-wider text-text-muted">
                Who we work with
              </p>
              <p className="mt-2 text-base text-text">
                D2C and online education brands where there is enough
                traffic to test fast and enough revenue on the line to
                care.
              </p>
            </div>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-text-muted">
            <p>
              Impact Conversion started because too many agencies were
              charging good companies $100k for redesigns and couldn&apos;t
              prove the new site would beat the old one.
            </p>
            <p>
              Revenue moves when you find what is broken, test the fix against
              the real thing, and keep what works, week after week, for as
              long as the program runs.
            </p>
            <p>
              So that is all we do. We keep a small number of clients on long
              engagements with deep relationships, and every test gets
              documented so the wins are attributable and the losses are
              explained.
            </p>
            <p>
              Running a brand closer to home? See how the program works as a{" "}
              <Link href="/cro-agency-nz" className="font-medium text-purple hover:underline">
                CRO agency in New Zealand
              </Link>{" "}
              or{" "}
              <Link href="/cro-agency-australia" className="font-medium text-purple hover:underline">
                Australia
              </Link>
              .
            </p>
            <p className="text-text font-medium">
              If that sounds like what your current setup is missing,
              let&apos;s talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
