export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
};

// Hand-maintained list — drop a new folder in app/blog/<slug>/page.mdx and add an entry here.
export const posts: Post[] = [
  {
    slug: "why-most-ecommerce-redesigns-lose",
    title: "Why most ecommerce redesigns lose",
    description:
      "Redesigns ship one giant untested change against a site with years of accidental optimisation. Why the new version usually loses on revenue, and what to do instead.",
    date: "May 2026",
    readTime: "6 min read",
    tag: "Methodology",
  },
  {
    slug: "online-education-cro-where-the-money-hides",
    title: "Online education CRO: where the money hides in webinar and replay funnels",
    description:
      "Most online education brands optimise the opt-in and ignore the funnel after it. Five surfaces where the real revenue moves on Kajabi, Teachable, and custom platforms.",
    date: "May 2026",
    readTime: "7 min read",
    tag: "Online education",
  },
  {
    slug: "cost-of-a-false-positive",
    title: "The cost of a false positive",
    description:
      "False positives in CRO are not free. Quantifying the dollar drag of shipped non-wins on a $10M D2C P&L, and how rigorous calling rules pay for themselves.",
    date: "May 2026",
    readTime: "6 min read",
    tag: "Methodology",
  },
  {
    slug: "what-evergreen-cro-research-looks-like",
    title: "What evergreen CRO research looks like",
    description:
      "Most CRO research dies at the end of the first month. Evergreen research is the practice of making it compound for eighteen months. How it works.",
    date: "May 2026",
    readTime: "7 min read",
    tag: "Research",
  },
  {
    slug: "how-to-choose-a-cro-agency",
    title: "How to choose a CRO agency without falling for the dashboard theatre",
    description:
      "Five questions to ask before signing a twelve-month CRO retainer, plus five things that should make you pause. Methodology over slides.",
    date: "May 2026",
    readTime: "7 min read",
    tag: "Methodology",
  },
  {
    slug: "shopify-cro-whats-moving-the-needle-2026",
    title: "Shopify CRO in 2026: what's actually moving the needle",
    description:
      "Five Shopify surfaces moving real revenue in 2026, plus what's quietly stopped working since 2022.",
    date: "May 2026",
    readTime: "7 min read",
    tag: "D2C ecommerce",
  },
  {
    slug: "conversion-rate-optimisation-australia-anz-market",
    title: "Conversion rate optimisation in Australia: what's different about the ANZ market",
    description:
      "Five things that change when you run conversion rate optimisation on a $5M to $20M Australian D2C brand. Payment mix, GST display, EOFY, shipping by state.",
    date: "May 2026",
    readTime: "6 min read",
    tag: "D2C ecommerce",
  },
  {
    slug: "follow-up-test-48-cr-loss-six-figures",
    title: "How a follow-up test turned a 48% CR loss into six figures of additional revenue",
    description:
      "Why the same conceptual fix lost 48% on the PDP and added six figures of profit on the category page. The case for follow-up tests on a different surface before you bury the idea.",
    date: "April 2026",
    readTime: "5 min read",
    tag: "Methodology",
  },
  {
    slug: "cro-for-shopify-where-to-look",
    title: "CRO for Shopify: where to look first",
    description:
      "The five places on a Shopify store where the biggest wins usually hide. Plus the three places most teams waste their first quarter.",
    date: "April 2026",
    readTime: "6 min read",
    tag: "D2C ecommerce",
  },
  {
    slug: "ab-tests-statistically-broken",
    title: "Why most A/B tests are statistically broken",
    description:
      "Peeking, premature stops, and the quiet false-positive problem costing teams real money. How to run tests that hold up.",
    date: "April 2026",
    readTime: "5 min read",
    tag: "Experimentation",
  },
  {
    slug: "research-methods-that-find-wins",
    title: "Research methods that actually find wins",
    description:
      "Six research methods, ranked by how often they surface a hypothesis that wins in test. Plus when to use each one.",
    date: "April 2026",
    readTime: "6 min read",
    tag: "Research",
  },
  {
    slug: "ice-l-prioritisation",
    title: "ICE-L: the prioritisation filter we actually use",
    description:
      "Why ICE scores fall apart in practice, what the L adds, and how to stop arguing about which test to run next.",
    date: "April 2026",
    readTime: "5 min read",
    tag: "Methodology",
  },
  {
    slug: "why-most-cro-programs-fail",
    title: "Why most CRO programs fail in the first 90 days",
    description:
      "The four patterns I see over and over again and the research-led structure that makes them go away.",
    date: "April 2026",
    readTime: "6 min read",
    tag: "Methodology",
  },
];
