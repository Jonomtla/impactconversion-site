import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const allItems: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href
        ? { item: `https://impactconversion.com${it.href}` }
        : {}),
    })),
  };
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 text-xs uppercase tracking-wider opacity-70"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {allItems.map((it, i) => {
          const last = i === allItems.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {it.href && !last ? (
                <Link
                  href={it.href}
                  className="transition-opacity hover:opacity-100"
                >
                  {it.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>
                  {it.label}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
