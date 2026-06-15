// Shape of the WP export bundle pulled from boisemarketingguy.com.
// One row per published post per CPT. Content lives in post_content; no ACF.

export type WpItem = {
  id: number;
  title: string;
  slug: string;
  date: string;
  modified: string;
  excerpt: string;
  content_raw: string;
  content_html: string;
  permalink: string;
  parent: number;
  menu_order: number;
  thumbnail_url: string | null;
  meta: Record<string, unknown> | unknown[];
  taxonomies: Record<string, { slug: string; name: string }[]> | unknown[];
};

export type WpBundle = {
  exported_at: string;
  site_url: string;
  pages: WpItem[];
  posts: WpItem[];
  industries: WpItem[];
  locations: WpItem[];
  service_tiers: WpItem[];
};

// Service categories are derived from the slug prefix on service_tier
// items (slug looks like "seo__local-gold-aeo"). The category portion
// matches the URL path segment that WP renders, so we use it as-is.
export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  seo: "SEO & AEO",
  ppc: "Google & Paid Ads",
  smo: "Social Media",
  "ai-visibility": "AI Visibility",
  design: "Design & Web",
  "a-la-carte": "A La Carte",
  affiliate: "Affiliate Marketing",
  cro: "Conversion Optimization",
  "audits-strategy": "Audits & Strategy",
  "special-offers": "Bundled Offers",
  saas: "Dashboards",
};

// Locations are tagged by region in the WP slug naming. We map the seven
// regional landing pages so the footer/sitemap can group cities under them.
export const LOCATION_REGIONS: { slug: string; label: string; cities: string[] }[] = [
  {
    slug: "treasure-valley",
    label: "Treasure Valley",
    cities: ["boise", "meridian", "nampa", "caldwell", "eagle", "kuna", "star",
      "garden-city", "middleton", "emmett", "fruitland", "payette", "weiser"],
  },
  {
    slug: "magic-valley",
    label: "Magic Valley",
    cities: ["twin-falls", "jerome", "burley", "rupert", "gooding"],
  },
  {
    slug: "eastern-idaho",
    label: "Eastern Idaho",
    cities: ["idaho-falls", "rexburg", "pocatello", "blackfoot", "ammon",
      "chubbuck", "shelley", "rigby", "american-falls", "preston",
      "st-anthony", "rupert"],
  },
  {
    slug: "central-idaho",
    label: "Central Idaho",
    cities: ["salmon", "mountain-home"],
  },
  {
    slug: "panhandle",
    label: "North Idaho",
    cities: ["coeur-dalene", "post-falls", "hayden", "rathdrum", "sandpoint"],
  },
  {
    slug: "north-central-idaho",
    label: "North Central Idaho",
    cities: ["lewiston", "moscow"],
  },
  {
    slug: "southeast-idaho",
    label: "Southeast Idaho",
    cities: ["mccall", "ketchum", "hailey"],
  },
];
