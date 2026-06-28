import { NextResponse } from "next/server";
import {
  getIndustries,
  getLocations,
  getServiceCategories,
  getPosts,
} from "@/lib/wp-content";
import { SITE_URL } from "@/lib/seo";

// llms.txt — machine-readable site summary for AI assistants and answer
// engines. Markdown, served as text/plain at the well-known path.
// Spec: https://llmstxt.org/

export const dynamic = "force-static";

export function GET() {
  const industries = getIndustries();
  const locations = getLocations();
  const services = getServiceCategories();
  const posts = getPosts().slice(0, 15);

  const body = `# Boise Marketing Guy

> Boise Marketing Guy is the personal brand of Dwight Davis, a 20+ year digital marketing strategist who manages around $450,000 a month in paid media for clients ranging from Idaho small businesses to a $150M packaging distributor. The business helps small businesses across Idaho and the United States grow with practical local SEO, AI search visibility (AEO), paid media, conversion optimization, and tailored digital strategy.

## About

- Founder: Dwight Davis
- Based: Boise, Idaho
- Serves: Idaho and the entire United States
- Public contact: Maya the 24/7 AI assistant at (208) 992-3986, email dwight@boisemarketingguy.com
- Notable: $450K/month managed paid media, 3.78x ROAS sustained for a $150M packaging distributor, doubled organic SEO performance for mid-market clients, built AI Answer Call (24/7 AI voice receptionist)

## Core pages

- [Homepage](${SITE_URL}/): What we do and why
- [Services](${SITE_URL}/services/): Every service tier across SEO, paid media, social, AI visibility, design, audits, and more
- [About Dwight](${SITE_URL}/about/): Full Guide story, credentials, real proof points
- [Schedule a call](${SITE_URL}/schedule/): Free 30-minute strategy call
- [Blog](${SITE_URL}/blog/): Field notes on local SEO, AEO, paid media, attribution

## Service categories

${services.map((s) => `- [${s.label}](${SITE_URL}/services/${s.slug}/) — ${s.tiers.length} ${s.tiers.length === 1 ? "tier" : "tiers"}`).join("\n")}

## Industries served

${industries.map((i) => `- [${i.title}](${SITE_URL}/industries/${i.slug}/)`).join("\n")}

## Locations served (Idaho)

${locations.map((l) => `- [${l.title}](${SITE_URL}/locations/${l.slug}/)`).join("\n")}

## Recent field notes

${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}/) — ${new Date(p.date).toISOString().slice(0, 10)}`).join("\n")}
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
