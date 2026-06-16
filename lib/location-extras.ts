// Per-location meta: city/county/population/region/services-rendered.
// Recovered from the WP dump on 2026-06-15. Renders as a stat strip on
// each location page so a visitor immediately sees what we know about
// their town and what we do there.

import { readFileSync } from "node:fs";
import { join } from "node:path";

export type LocationExtras = {
  location_type: string;
  city_name: string;
  county: string;
  population: string;
  region_name: string;
  region_slug: string;
  region_anchor: string;
  what_we_do: string;
};

let _all: Record<string, LocationExtras> | null = null;

export function getLocationExtras(slug: string): LocationExtras | null {
  if (!_all) {
    _all = JSON.parse(
      readFileSync(
        join(process.cwd(), "data", "location-extras.json"),
        "utf8",
      ),
    ) as Record<string, LocationExtras>;
  }
  return _all[slug] ?? null;
}
