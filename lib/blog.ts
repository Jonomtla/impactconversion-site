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
