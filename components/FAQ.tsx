const faqs = [
  {
    q: "What does a CRO agency actually do?",
    a: "Four things. Find where buyers leave your funnel and why. Turn those findings into testable ideas. Ship proper A/B tests. Keep the winners, kill the losers, queue up the next round. That&apos;s it.",
  },
  {
    q: "How fast will I see ROI?",
    a: "Most clients see their first winning test inside 12 weeks. Traffic volume and purchase cycle affect the timing. We go after the biggest, most likely wins first, so the program tends to pay for itself well before it ends.",
  },
  {
    q: "Isn't this expensive?",
    a: "Compare it to the alternative. A full redesign runs $50k to $150k and nobody can promise the new site beats the old one. Six months of testing costs less, and every winner you ship stays live forever. On our 90-day sprints we guarantee at least three winning tests, or you don&apos;t pay.",
  },
  {
    q: "What makes you different from other agencies?",
    a: "Three things. One: we only do CRO, so nobody on our team is quietly trying to sell you a rebrand. Two: strategy, dev, and design are in-house, so tests ship fast. Three: we refuse to report on vanity metrics. Every test maps to revenue, or we don&apos;t run it.",
  },
  {
    q: "Do we have enough traffic to A/B test?",
    a: "Rough rule: around 800 conversions a month and you&apos;re good. That&apos;s 20-30k sessions at a 3% conversion rate, or 5-7k at a higher one. Not sure? Book a call. We&apos;ll tell you straight.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Yes. Most of our clients have one. Shared backlog, fortnightly calls, available between. Our wins become your team&apos;s wins. When we&apos;re done we leave the testing culture behind, not a dependency.",
  },
  {
    q: "Which industries do you work best in?",
    a: "D2C ecommerce and online education. We&apos;ve also shipped work in SaaS, subscriptions, and tourism. If you sell online and you care about lifetime value, chances are we can help.",
  },
  {
    q: "How do we start?",
    a: "Book a free 15-minute intro call. We ask about your funnel, explain how we&apos;d approach it, tell you honestly whether we&apos;re a fit. No pitch deck. No sales script.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            FAQ
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            The stuff you&apos;re actually wondering.
          </h2>
        </div>

        <div className="mt-16 space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-ink/10 bg-white p-6 transition-colors open:border-purple/40 md:p-8"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-medium text-text marker:content-['']">
                <span>{f.q}</span>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink/10 text-text-muted transition-transform group-open:rotate-45 group-open:border-purple group-open:text-purple">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p
                className="mt-4 text-text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: f.a }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
