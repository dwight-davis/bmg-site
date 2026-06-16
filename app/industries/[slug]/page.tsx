import { notFound } from "next/navigation";
import {
  getIndustries,
  getIndustry,
  firstParagraph,
} from "@/lib/wp-content";
import { getIndustrySpec } from "@/lib/page-specs";
import { PageHero } from "@/components/page/PageHero";
import { WpBody } from "@/components/page/WpBody";
import { PageCTA } from "@/components/page/PageCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

// Static generate every industry from the WP export.
export function generateStaticParams() {
  return getIndustries().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getIndustry(slug);
  if (!item) return {};
  return {
    title: `${item.title} Marketing — Boise Marketing Guy`,
    description: item.excerpt || firstParagraph(item.content_html, 160),
    alternates: { canonical: `/industries/${slug}/` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getIndustry(slug);
  if (!item) notFound();

  const spec = getIndustrySpec(slug);
  const firstP = firstParagraph(item.content_html, 240);

  // Lean structure (2026-06-15): same restructure we did on service-tier
  // pages — drop the PainList + Guide + Plan + Stakes wall that appeared
  // on every one of the 32 industry pages. The industry WP body is
  // already pain-shaped and industry-specific, so it does the empathy
  // work without a generic PainList in front. Hero → content → CTA.

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries/" },
          { name: item.title, url: `/industries/${slug}/` },
        ])}
      />

      <PageHero
        eyebrow={spec.hero_eyebrow ?? `Marketing for ${item.title}`}
        h1={spec.hero_h1 ?? item.title}
        h1Accent={spec.hero_accent ?? ""}
        sub={spec.hero_sub ?? (item.excerpt || firstP)}
        primaryLabel="Schedule a call"
        secondaryHref="#approach"
        secondaryLabel="See the approach"
      />

      {/* Content first — the industry-specific take. */}
      <section id="approach">
        <WpBody html={item.content_html} />
      </section>

      <PageCTA
        heading={
          spec.cta_heading ??
          `Let's grow your ${item.title.toLowerCase()} business`
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
