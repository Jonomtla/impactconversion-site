const faqs = [
  {
    q: "What does a CRO agency actually do?",
    a: "Four things. We find where people are leaving your funnel and why. We turn the fixes into testable ideas. We run proper A/B tests. We keep the winners, kill the losers, and queue up the next round. That&apos;s it.",
  },
  {
    q: "How fast will I see ROI?",
    a: "Most clients see their first winning test inside 12 weeks. Traffic volume and purchase cycle both affect the timing. Our roadmap always goes after the biggest, most likely wins first.",
  },
  {
    q: "What makes you different?",
    a: "Three things. We only do CRO, so nobody on our team is secretly trying to sell you branding. Dev and design are in house, so tests ship fast. And we refuse to report on vanity metrics. Every test we run maps to revenue, or we don&apos;t run it.",
  },
  {
    q: "Do we have enough traffic to A/B test?",
    a: "Rough rule: if you&apos;re getting around 800 conversions per month, you have what you need. That&apos;s 20-30k sessions at a 3% conversion rate, or 5-7k sessions at a higher one. Book a call if you&apos;re not sure.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Yes. Most of our clients have one. We share a backlog, run fortnightly calls, stay available between. Our wins become your team&apos;s wins.",
  },
  {
    q: "Which industries?",
    a: "D2C ecommerce and online education are where we&apos;re strongest. We&apos;ve also shipped work in SaaS, subscriptions, and tourism. If you sell online and you care about lifetime value, chances are we can help.",
  },
  {
    q: "How do we start?",
    a: "Book a free 15-minute intro call. We&apos;ll ask about your funnel, explain how we&apos;d approach it, and tell you honestly whether we&apos;re a fit. No pitch.",
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
            What most people want to know first.
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
