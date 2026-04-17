import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { posts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Essays on conversion rate optimisation, research-led experimentation, and how to actually move the needle for D2C ecommerce and online education brands.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="bg-ink text-cream pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <Breadcrumbs items={[{ label: "Blog" }]} />
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-2">
                Writing
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Notes from the field.
              </h1>
              <p className="mt-5 text-lg text-text-inv-muted">
                Essays on CRO, research-led experimentation, and what actually
                moves the needle for D2C and online education brands.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 space-y-6">
            {posts.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block rounded-2xl border border-ink/10 bg-white p-8 transition-all hover:border-purple/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-text-muted">
                    <span className="font-semibold text-purple">{p.tag}</span>
                    <span>·</span>
                    <span>{p.date}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-text group-hover:text-purple transition-colors md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-text-muted">{p.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple group-hover:gap-3 transition-all">
                    Read post
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
