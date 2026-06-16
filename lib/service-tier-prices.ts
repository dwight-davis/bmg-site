// Per-tier pricing lookup. Read from data/service-tier-prices.json at
// build time. Returns null when a tier doesn't have a price entry; the
// renderer then shows a "Schedule a call to scope pricing" CTA instead.

import { readFileSync } from "node:fs";
import { join } from "node:path";

export type TierPrice = {
  amount: number;
  interval: "one-time" | "monthly" | "quarterly" | "yearly" | "project";
  starting_at: boolean;
  setup_fee: number | null;
  note: string | null;
};

let _prices: Record<string, TierPrice> | null = null;

function load(): Record<string, TierPrice> {
  if (_prices) return _prices;
  const raw = JSON.parse(
    readFileSync(
      join(process.cwd(), "data", "service-tier-prices.json"),
      "utf8",
    ),
  );
  // Strip the meta keys; only retain real price entries.
  const out: Record<string, TierPrice> = {};
  for (const [slug, entry] of Object.entries(raw)) {
    if (slug.startsWith("_")) continue;
    if (entry && typeof entry === "object" && "amount" in (entry as object)) {
      out[slug] = entry as TierPrice;
    }
  }
  _prices = out;
  return out;
}

export function getPriceForTier(slug: string): TierPrice | null {
  return load()[slug] ?? null;
}

export function formatPrice(p: TierPrice): {
  amount: string;
  cadence: string;
  prefix: string;
} {
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const cadenceMap: Record<TierPrice["interval"], string> = {
    "one-time": "one-time",
    monthly: "per month",
    quarterly: "per quarter",
    yearly: "per year",
    project: "per project",
  };
  return {
    amount: fmt.format(p.amount),
    cadence: cadenceMap[p.interval],
    prefix: p.starting_at ? "Starting at" : "",
  };
}
