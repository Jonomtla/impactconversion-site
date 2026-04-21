const faqs = [
  {
    q: "What does a CRO agency actually do?",
    a: "We find where buyers leave your funnel and why, turn those findings into testable ideas, ship proper A/B tests, and then keep the winners, kill the losers, and queue up the next round.",
  },
  {
    q: "How fast will I see ROI?",
    a: "Most clients see their first winning test inside twelve weeks, though traffic volume and purchase cycle shift the timing. We go after the biggest, most likely wins first, so the program usually pays for itself well before it ends.",
  },
  {
    q: "Isn't this expensive?",
    a: "It depends on the alternative you are comparing it to. A full redesign runs $50k to $150k and nobody can promise the new site beats the old one, whereas six months of testing costs less and every winner you ship stays live forever. Every 90-day sprint also carries the guarantee: you see a revenue uplift by the end of the quarter, or we refund the final 50% of the sprint fee.",
  },
  {
    q: "What makes you different from other agencies?",
    a: "We only do CRO, so nobody on our team is quietly trying to sell you a rebrand. Strategy, dev, and design are in-house, so tests ship fast. And we refuse to report on vanity metrics, because every test has to map to revenue or we will not run it.",
  },
  {
    q: "Do we have enough traffic to A/B test?",
    a: "As a rough rule, around 800 conversions a month is enough, which works out to 20-30k sessions at a 3% conversion rate or 5-7k at a higher one. If you are not sure, book a call and we will tell you straight.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Yes, and most of our clients have one. We share the backlog, run fortnightly calls, and stay available between them, so our wins become your team&apos;s wins. When the engagement ends, you keep the testing culture rather than inheriting a dependency.",
  },
  {
    q: "Which industries do you work best in?",
    a: "D2C ecommerce and online education, though we have also shipped work in SaaS, subscriptions, and tourism. If you sell online and you care about lifetime value, chances are we can help.",
  },
  {
    q: "How do we start?",
    a: "Book a free fifteen-minute intro call and we will ask about your funnel, explain how we would approach it, and tell you honestly whether we are a fit, with no pitch deck or sales script.",
  },
];

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q.replace(/&apos;/g, "'"),
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.replace(/&apos;/g, "'"),
      },
    })),
  };
  return (
    <section id="faq" className="bg-cream py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
