#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const [, , slug, ...titleParts] = process.argv;
const title = titleParts.join(" ");

if (!slug || !title) {
  console.error('Usage: node scripts/new-post.mjs <slug> "<title>"');
  console.error(
    'Example: node scripts/new-post.mjs how-to-write-a-pdp "How to write a PDP that converts"',
  );
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error("Slug must be lowercase letters, numbers, and hyphens only.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const monthYear = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});
const dest = path.join("app/blog", slug);

if (fs.existsSync(dest)) {
  console.error(`Error: ${dest} already exists`);
  process.exit(1);
}

fs.mkdirSync(dest, { recursive: true });

const mdx = `import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "${title}",
  description: "TODO: write a one-line description",
  alternates: { canonical: "/blog/${slug}" },
};

export const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "${title}",
  description: "TODO: write a one-line description",
  author: { "@type": "Person", name: "Jono Matla", url: "https://impactconversion.com/about" },
  publisher: { "@type": "Organization", name: "Impact Conversion", logo: { "@type": "ImageObject", url: "https://impactconversion.com/assets/logo.png" } },
  datePublished: "${today}",
  dateModified: "${today}",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://impactconversion.com/blog/${slug}" },
};

<Nav />

<main id="main">
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
  <article className="bg-cream pt-32 pb-20 md:pt-40">
    <div className="mx-auto max-w-3xl px-6">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "${title}" }]} />
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
        TODO: Category · ${monthYear}
      </p>

# ${title}

TODO: write the post body.

---

If this resonates, <a href="/contact">book a 15-minute call</a>.

    </div>
  </article>
</main>

<Footer />
`;

fs.writeFileSync(path.join(dest, "page.mdx"), mdx);

const blogTs = fs.readFileSync("lib/blog.ts", "utf8");
const entry = `  {
    slug: "${slug}",
    title: "${title}",
    description: "TODO: write a one-line description",
    date: "${monthYear}",
    readTime: "X min read",
    tag: "TODO",
  },
`;
const updated = blogTs.replace(
  /(export const posts: Post\[\] = \[\n)/,
  `$1${entry}`,
);

if (updated === blogTs) {
  console.error("Warning: could not insert entry into lib/blog.ts.");
  console.error("Add this manually at the top of the posts array:");
  console.error("");
  console.error(entry);
} else {
  fs.writeFileSync("lib/blog.ts", updated);
}

console.log(`Created:  ${dest}/page.mdx`);
console.log(`Updated:  lib/blog.ts (new entry at top of posts array)`);
console.log("");
console.log("Next:");
console.log(`  1. Edit ${dest}/page.mdx (replace TODOs in metadata, schema, header, body)`);
console.log("  2. Edit lib/blog.ts (replace TODOs: description, readTime, tag)");
console.log("  3. git commit + push to deploy");
