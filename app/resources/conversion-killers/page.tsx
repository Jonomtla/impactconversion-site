import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import WavyLines from "@/components/WavyLines";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata = {
  title: "7 Conversion Killers quietly draining revenue from D2C sites",
  description:
    "A plain-English PDF on the seven patterns we see over and over in D2C funnels, and what to do about each one. Free.",
  alternates: { canonical: "/resources/conversion-killers" },
};

const killers = [
  {
    n: "01",
    t: "Weak value proposition (and not being consistent)",
    b: "The ad makes a promise, the page does not back it up, and the visitor leaves. How to restore ad-to-page scent, match the message to the buyer&rsquo;s awareness stage, and pass the 5-second test.",
  },
  {
    n: "02",
    t: "The trust and authority gap",
    b: "If your website does not earn trust, you might as well throw away half your customers. The full list of factors that move trust, and how to fix each one.",
  },
  {
    n: "03",
    t: "Above-the-fold fog",
    b: "Everything visible before scrolling is seen by 100% of your traffic, and no other part of the page has that reach. The five elements that belong there, plus the 5-second test protocol.",
  },
  {
    n: "04",
    t: "Friction: speed, forms, payments, logins",
    b: "Removing forced login before checkout alone has been worth $300k+ a year in our testing. Speed targets, checkout field audits, and the friction fixes that pay fastest.",
  },
  {
    n: "05",
    t: "Leaving money on the table post-purchase",
    b: "The moment someone buys is when trust and motivation peak. Order bumps, one-click upsells, and activation sequences that compound lifetime value instead of capping it.",
  },
  {
    n: "06",
    t: "No experimentation or measurement discipline",
    b: "Testing is how you stop guessing, and messy testing is barely better than none. The protocol, the pitfalls, and the low-traffic path if you are not at testing volume yet.",
  },
  {
    n: "07",
    t: "You don't know why people buy (or don't)",
    b: "The most important killer in the playbook, saved for last so you arrive with quick wins already banked. Three research methods with the exact questions to ask, because every other fix works better once this is in place.",
  },
];

export default function ConversionKillersPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <WavyLines />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 80% 30%, var(--color-purple) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6">
            <Breadcrumbs
              items={[
                { label: "Resources", href: "/resources/conversion-killers" },
                { label: "7 Conversion Killers" },
              ]}
            />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Free PDF · D2C
              </p>
              <h1 className="mt-4 text-balance font-black leading-[1.0] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                7 conversion killers quietly{" "}
                <span className="text-gradient-glow">draining revenue</span>{" "}
                from D2C sites.
              </h1>
              <p className="mt-6 text-lg text-text-inv-muted md:text-xl">
                These are the patterns we see on almost every audit, along
                with the damage each one causes and the fastest way to fix it.
                Fourteen pages, plain English, no fluff.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-5">
            <div className="md:col-span-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
                What&rsquo;s inside
              </p>
              <ol className="mt-6 space-y-6">
                {killers.map((k) => (
                  <li key={k.n} className="flex gap-5">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-soft text-sm font-bold text-purple">
                      {k.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text">
                        {k.t}
                      </h3>
                      <p className="mt-2 text-text-muted">{k.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="md:col-span-2">
              <div className="md:sticky md:top-28">
                <LeadMagnetForm
                  source="conversion_killers_pdf"
                  heading="Email me the PDF"
                  subhead="Fourteen pages, arriving in under a minute, and you can unsubscribe any time."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
