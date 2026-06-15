// Per-page SB narrative overrides. The Tier-2 templates ship with sensible
// defaults derived from each WP item; whenever a slug has an entry in
// data/page-specs.json we use that hand-crafted copy instead. This is how
// we keep narrative quality high while still rendering every URL.

import { readFileSync } from "node:fs";
import { join } from "node:path";

export type PageSpec = {
  hero_eyebrow?: string;
  hero_h1?: string;
  hero_accent?: string;
  hero_sub?: string;
  empathy_eyebrow?: string;
  empathy_heading?: string;
  empathy_heading_accent?: string;
  pains?: string[];
  empathy_summary?: string;
  stakes_neg?: string;
  stakes_pos?: string;
  cta_heading?: string;
  cta_accent?: string;
  cta_sub?: string;
};

type AllSpecs = {
  industries?: Record<string, PageSpec>;
  locations?: Record<string, PageSpec>;
  service_tiers?: Record<string, PageSpec>;
};

let _specs: AllSpecs | null = null;

function load(): AllSpecs {
  if (_specs) return _specs;
  const p = join(process.cwd(), "data", "page-specs.json");
  _specs = JSON.parse(readFileSync(p, "utf8")) as AllSpecs;
  return _specs;
}

export function getIndustrySpec(slug: string): PageSpec {
  return load().industries?.[slug] ?? {};
}

export function getLocationSpec(slug: string): PageSpec {
  return load().locations?.[slug] ?? {};
}

export function getServiceTierSpec(slug: string): PageSpec {
  return load().service_tiers?.[slug] ?? {};
}
