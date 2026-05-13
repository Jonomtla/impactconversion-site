import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { posts } from "@/lib/blog";

const BASE = "https://impactconversion.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/how-we-work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/for-d2c-ecommerce`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/for-online-education`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/conversion-rate-optimisation`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/services/shopify-cro`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/ab-testing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/cro-agency-australia`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/cro-agency-nz`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tools/roi-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tools/shipping-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/tools/ab-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/conversion-killers`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${BASE}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
