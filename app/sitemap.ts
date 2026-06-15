import type { MetadataRoute } from "next";
import {
  getIndustries,
  getLocations,
  getServiceTiers,
  getServiceCategories,
  getPosts,
  getPostCategories,
} from "@/lib/wp-content";
import { SITE_URL } from "@/lib/seo";

// Site map — covers every static route plus every static-generated CPT
// URL. Industry and service-tier pages are content-heavy and rank-eligible
// so they get higher priority; legal pages drop to 0.3.

function url(path: string, opts: { priority?: number; changefreq?: MetadataRoute.Sitemap[number]["changeFrequency"]; lastmod?: string } = {}) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: opts.lastmod ? new Date(opts.lastmod) : new Date(),
    changeFrequency: opts.changefreq ?? ("monthly" as const),
    priority: opts.priority ?? 0.6,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  // Tier-1 hand-written pages.
  out.push(url("/", { priority: 1.0, changefreq: "weekly" }));
  out.push(url("/services/", { priority: 0.9 }));
  out.push(url("/about/", { priority: 0.8 }));
  out.push(url("/schedule/", { priority: 0.9 }));
  out.push(url("/blog/", { priority: 0.8, changefreq: "weekly" }));
  out.push(url("/industries/", { priority: 0.8 }));

  // Industries (32).
  for (const i of getIndustries()) {
    out.push(url(`/industries/${i.slug}/`, { priority: 0.7, lastmod: i.modified }));
  }

  // Locations (48).
  for (const l of getLocations()) {
    out.push(url(`/locations/${l.slug}/`, { priority: 0.7, lastmod: l.modified }));
  }

  // Service categories (11).
  for (const c of getServiceCategories()) {
    out.push(url(`/services/${c.slug}/`, { priority: 0.75 }));
  }

  // Service tiers (144).
  for (const t of getServiceTiers()) {
    const category = t.slug.split("__")[0];
    out.push(url(`/services/${category}/${t.slug}/`, { priority: 0.65, lastmod: t.modified }));
  }

  // Blog posts (26).
  for (const p of getPosts()) {
    out.push(url(`/blog/${p.slug}/`, { priority: 0.7, changefreq: "monthly", lastmod: p.modified }));
  }

  // Blog category archives.
  for (const c of getPostCategories()) {
    out.push(url(`/blog/category/${c.slug}/`, { priority: 0.5 }));
  }

  // Legal.
  out.push(url("/privacy/", { priority: 0.3, changefreq: "yearly" }));
  out.push(url("/terms/", { priority: 0.3, changefreq: "yearly" }));
  out.push(url("/accessibility/", { priority: 0.3, changefreq: "yearly" }));

  return out;
}
