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
    slug: "why-most-cro-programs-fail",
    title: "Why most CRO programs fail in the first 90 days",
    description:
      "The four patterns I see over and over again — and the research-led structure that makes them go away.",
    date: "April 2026",
    readTime: "6 min read",
    tag: "Methodology",
  },
];
