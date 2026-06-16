import { notFound } from "next/navigation";
import {
  getLocations,
  getLocation,
  firstParagraph,
} from "@/lib/wp-content";
import { getLocationSpec } from "@/lib/page-specs";
import { getLocationExtras } from "@/lib/location-extras";
import { PageHero } from "@/components/page/PageHero";
import { WpBody } from "@/components/page/WpBody";
import { LocationStats } from "@/components/page/LocationStats";
import { PageCTA } from "@/components/page/PageCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return getLocations().map((l) => ({ slug: l.slug }));
}

// "Marketing Services in Boise, Idaho" → "Boise". Used in hero copy.
function shortName(title: string): string {
  return title
    .replace(/^Marketing Services in /, "")
    .replace(/, Idaho$/, "")
    .replace(/Marketing Services$/, "")
    .trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getLocation(slug);
  if (!item) return {};
  return {
    title: `${item.title} — Boise Marketing Guy`,
    description: item.excerpt || firstParagraph(item.content_html, 160),
    alternates: { canonical: `/locations/${slug}/` },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getLocation(slug);
  if (!item) notFound();

  const spec = getLocationSpec(slug);
  const extras = getLocationExtras(slug);
  const name = shortName(item.title);
  const firstP = firstParagraph(item.content_html, 240);

  // Lean structure (2026-06-15): mirrors the industry + service-tier
  // restructure. Cut the generic PainList + Guide + Plan + Stakes wall
  // that repeated on all 48 location pages. The location WP body is
  // place-specific and does the empathy work itself. Hero → content → CTA.

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations/" },
          { name: name, url: `/locations/${slug}/` },
        ])}
      />

      <PageHero
        eyebrow={spec.hero_eyebrow ?? `Marketing in ${name}`}
        h1={spec.hero_h1 ?? name}
        h1Accent={spec.hero_accent ?? ""}
        sub={spec.hero_sub ?? (item.excerpt || firstP)}
        primaryLabel="Schedule a call"
        secondaryHref="#about"
        secondaryLabel="About this market"
      />

      <section id="about">
        <WpBody html={item.content_html} />
      </section>

      {extras ? (
        <LocationStats extras={extras} cityShortName={name} />
      ) : null}

      <PageCTA
        heading={
          spec.cta_heading ?? `Let's grow your business in ${name}`
        }
        headingAccent={spec.cta_accent ?? "the right way."}
        sub={
          spec.cta_sub ??
          "Free 30-minute strategy call. I look at your site, your Google profile, and your ads. Tell you what's working, what isn't, and where to start."
        }
      />

      <Footer />
    </>
  );
}
