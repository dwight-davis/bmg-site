// Server-side loaders for the WordPress export bundle. The JSON file is
// read once per process and cached in memory; Next.js calls these from
// generateStaticParams + page server components at build time.
//
// All Tier-2 pages (industries / locations / service tiers / blog / legal)
// flow through these helpers so the URL set, content, and navigation
// surfaces stay in sync with the source WP data.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { WpBundle, WpItem } from "./wp-types";
import { SERVICE_CATEGORY_LABELS } from "./wp-types";

let _bundle: WpBundle | null = null;

function loadBundle(): WpBundle {
  if (_bundle) return _bundle;
  const p = join(process.cwd(), "data", "wp-export", "wp-export.json");
  const raw = readFileSync(p, "utf8");
  _bundle = JSON.parse(raw) as WpBundle;
  return _bundle;
}

export function getIndustries(): WpItem[] {
  return [...loadBundle().industries].sort((a, b) => a.title.localeCompare(b.title));
}

export function getIndustry(slug: string): WpItem | null {
  return loadBundle().industries.find((x) => x.slug === slug) ?? null;
}

export function getLocations(): WpItem[] {
  return [...loadBundle().locations].sort((a, b) => a.title.localeCompare(b.title));
}

export function getLocation(slug: string): WpItem | null {
  return loadBundle().locations.find((x) => x.slug === slug) ?? null;
}

export function getServiceTiers(): WpItem[] {
  return loadBundle().service_tiers;
}

export function getServiceTier(category: string, slug: string): WpItem | null {
  // WP encodes the category in the slug: "seo__local-gold-aeo". The route
  // path also carries the category segment, so we match on both.
  const bundle = loadBundle();
  return bundle.service_tiers.find((x) => {
    const slugCat = x.slug.split("__")[0];
    return slugCat === category && x.slug === slug;
  }) ?? null;
}

// Group service tiers by category for the footer + /services overview.
export function getServiceCategories(): { slug: string; label: string; tiers: WpItem[] }[] {
  const grouped = new Map<string, WpItem[]>();
  for (const tier of getServiceTiers()) {
    const cat = tier.slug.split("__")[0];
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(tier);
  }
  return Array.from(grouped.entries())
    .map(([slug, tiers]) => ({
      slug,
      label: SERVICE_CATEGORY_LABELS[slug] ?? slug.replace(/-/g, " "),
      tiers: tiers.sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getPosts(): WpItem[] {
  return [...loadBundle().posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPost(slug: string): WpItem | null {
  return loadBundle().posts.find((x) => x.slug === slug) ?? null;
}

export function getPostCategories(): { slug: string; name: string; count: number }[] {
  const tally = new Map<string, { name: string; count: number }>();
  for (const post of loadBundle().posts) {
    const tax = post.taxonomies as Record<string, { slug: string; name: string }[]>;
    const cats = tax?.category ?? [];
    for (const c of cats) {
      const prev = tally.get(c.slug);
      tally.set(c.slug, { name: c.name, count: (prev?.count ?? 0) + 1 });
    }
  }
  return Array.from(tally.entries())
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsInCategory(slug: string): WpItem[] {
  return getPosts().filter((p) => {
    const tax = p.taxonomies as Record<string, { slug: string; name: string }[]>;
    return (tax?.category ?? []).some((c) => c.slug === slug);
  });
}

export function getPage(slug: string): WpItem | null {
  return loadBundle().pages.find((x) => x.slug === slug) ?? null;
}

// First paragraph (text only) of a post body — used as the per-page hero
// support copy on Tier-2 pages. Strips block comments + tags conservatively.
export function firstParagraph(html: string, maxChars = 280): string {
  const noBlocks = html.replace(/<!--[\s\S]*?-->/g, "");
  const m = noBlocks.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const text = (m ? m[1] : noBlocks)
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;/g, "’")
    .replace(/&#8217;/g, "’")
    .replace(/&#8211;/g, ", ")
    .replace(/&#8212;/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).replace(/[.,;:\s]+\S*$/, "") + "…";
}
