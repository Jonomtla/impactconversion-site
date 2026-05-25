import Link from "next/link";
import { posts, type Post } from "@/lib/blog";

type Props = { currentSlug: string; limit?: number };

function pickRelated(currentSlug: string, limit: number): Post[] {
  const others = posts.filter((p) => p.slug !== currentSlug);
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return others.slice(0, limit);

  const sameTag = others.filter((p) => p.tag === current.tag);
  const rest = others.filter((p) => p.tag !== current.tag);
  return [...sameTag, ...rest].slice(0, limit);
}

export default function RelatedPosts({ currentSlug, limit = 3 }: Props) {
  const related = pickRelated(currentSlug, limit);
  if (related.length === 0) return null;

  return (
    <aside
      aria-labelledby="related-posts-heading"
      className="mt-16 border-t border-ink/10 pt-12"
    >
      <h2
        id="related-posts-heading"
        className="text-2xl font-semibold tracking-tight text-text md:text-3xl"
      >
        Keep reading
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {related.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block h-full rounded-2xl border border-ink/10 bg-white p-6 transition-all hover:border-purple/40 hover:shadow-lg"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-text-muted">
                <span className="font-semibold text-purple">{p.tag}</span>
                <span>·</span>
                <span>{p.readTime}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text transition-colors group-hover:text-purple">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted line-clamp-3">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
