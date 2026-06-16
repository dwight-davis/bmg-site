import { notFound } from "next/navigation";
import {
  getServiceCategories,
  getServiceTiers,
  getServiceTier,
  firstParagraph,
} from "@/lib/wp-content";
import { getPriceForTier } from "@/lib/service-tier-prices";
import { getServiceTierSpec } from "@/lib/page-specs";
import { SERVICE_CATEGORY_LABELS } from "@/lib/wp-types";
import { PageHero } from "@/components/page/PageHero";
import { WpBody } from "@/components/page/WpBody";
import { PricingCard } from "@/components/page/PricingCard";
import { RelatedTiers } from "@/components/page/RelatedTiers";
import { PageCTA } from "@/components/page/PageCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

// Service-tier page (the storefront for one specific offer). Restructured
// 2026-06-15 per Dwight: the previous template put PainList + a full
// Guide block + a generic 3-step Plan before the actual content, which
// meant every visitor had to scroll past 2,400 words of empathy and bio
// before reaching what they came for. New shape leads with the content,
// surfaces price, exposes siblings, and closes — like a product page.

// Static generate every tier from the WP export.
export function generateStaticParams() {
  return getServiceTiers().map((t) => {
    const category = t.slug.split("__")[0];
    return { category, slug: t.slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const item = getServiceTier(category, slug);
  if (!item) return {};
  return {
    title: `${item.title} — Boise Marketing Guy`,
    description: item.excerpt || firstParagraph(item.content_html, 160),
    alternates: { canonical: `/services/${category}/${slug}/` },
  };
}

export default async function ServiceTierPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const item = getServiceTier(category, slug);
  if (!item) notFound();

  const spec = getServiceTierSpec(slug);
  const price = getPriceForTier(slug);
  const catLabel = SERVICE_CATEGORY_LABELS[category] ?? category.replace(/-/g, " ");
  const firstP = firstParagraph(item.content_html, 240);

  // Pull sibling tiers in the same category for the related row at the
  // bottom of the page.
  const cats = getServiceCategories();
  const thisCat = cats.find((c) => c.slug === category);
  const siblings = thisCat?.tiers ?? [];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: catLabel, url: `/services/${category}/` },
          { name: item.title, url: `/services/${category}/${slug}/` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: item.title,
          description: item.excerpt || firstP,
          url: `/services/${category}/${slug}/`,
          category: catLabel,
        })}
      />

      <PageHero
        eyebrow={spec.hero_eyebrow ?? catLabel}
        h1={spec.hero_h1 ?? item.title}
        h1Accent={spec.hero_accent ?? ""}
        sub={spec.hero_sub ?? (item.excerpt || firstP)}
        primaryLabel="Schedule a call"
        secondaryHref="#what-you-get"
        secondaryLabel="See what's included"
      />

      {/* Content first — what the visitor came for. */}
      <section id="what-you-get">
        <WpBody html={item.content_html} />
      </section>

      <PricingCard price={price} tierTitle={item.title} />

      <RelatedTiers
        current={item}
        siblings={siblings}
        categorySlug={category}
        categoryLabel={catLabel}
      />

      <PageCTA
        heading={spec.cta_heading ?? `Ready to talk about ${item.title.toLowerCase()}?`}
        headingAccent={spec.cta_accent ?? ""}
        sub={
          spec.cta_sub ??
          "30-minute call. We talk about your business, whether this tier fits, and what the next step looks like."
        }
      />

      <Footer />
    </>
  );
}
