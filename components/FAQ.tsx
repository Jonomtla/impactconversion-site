const faqs = [
  {
    q: "What does a CRO agency do?",
    a: "We find where buyers leave your funnel and why, turn those findings into testable ideas, run controlled experiments, and use the results to decide what changes.",
  },
  {
    q: "How fast will I see ROI?",
    a: "Most clients see their first winning test inside twelve weeks. We usually aim for at least a 10x ROI on our fee in the first year. We go after the biggest, most likely wins first, so the program usually pays for itself well before it ends.",
  },
  {
    q: "What makes you different from other agencies?",
    a: "We only do CRO. Jono and a small group of specialists run the work, and research, design, development and analysis are included in the engagement.",
  },
  {
    q: "Do we have enough traffic to A/B test?",
    a: "As a rough rule, $2M+ a year in online revenue, or around 1,000 orders a month, is enough to test. If you are not sure, book a call and we will tell you straight.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Yes. We share the research, backlog and test results, run fortnightly calls, and work directly with your marketers and developers. We can also train your team, help with hiring, and plan a clean handover.",
  },
  {
    q: "Which industries do you work best in?",
    a: "Direct-to-consumer e-commerce mostly, though we have also shipped work in online education, SaaS, subscriptions, and tourism. The process works in almost any industry and vertical.",
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
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            The questions people ask before we start.
          </h2>
        </div>

        <div className="mt-16 space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-ink/10 bg-white p-6 transition-colors open:border-purple/40 md:p-8"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-medium text-text marker:content-[''] [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink/10 text-text-muted transition-transform group-open:rotate-45 group-open:border-purple group-open:text-purple">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="faq-answer-grid">
                <div className="overflow-hidden">
                  <p className="pt-4 text-text-muted leading-relaxed">{f.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
