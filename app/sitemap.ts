import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { posts } from "@/lib/blog";

const BASE = "https://impactconversion.com";

// No lastModified: stamping every URL with the build date teaches Google to
// ignore the field. Omitting it is better than a wrong value.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/how-we-work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/case-studies`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/for-d2c-ecommerce`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/for-online-education`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/services/conversion-rate-optimisation`, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/services/shopify-cro`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/ab-testing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/cro-agency-australia`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/cro-agency-nz`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/tools`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tools/ab-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools/rpv-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools/shipping-calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/resources/conversion-killers`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((c) => !c.draft)
    .map((c) => ({
      url: `${BASE}/case-studies/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
