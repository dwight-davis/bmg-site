import { notFound } from "next/navigation";
import {
  getServiceTiers,
  getServiceTier,
  firstParagraph,
} from "@/lib/wp-content";
import { getServiceTierSpec } from "@/lib/page-specs";
import { SERVICE_CATEGORY_LABELS } from "@/lib/wp-types";
import { PageHero } from "@/components/page/PageHero";
import { PainList } from "@/components/page/PainList";
import { Guide } from "@/components/Guide";
import { Plan } from "@/components/Plan";
import { WpBody } from "@/components/page/WpBody";
import { PageStakes } from "@/components/page/PageStakes";
import { PageCTA } from "@/components/page/PageCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

// Static generate every service tier. The WP route segments are
// "/services/<category>/<slug>/" and the slug already carries the
// "<category>__" prefix, which we preserve byte-for-byte.
export function generateStaticParams() {
  return getServiceTiers().map((t) => {
    const category = t.slug.split("__")[0];
    return { category, slug: t.slug };
  });
}

const DEFAULT_SERVICE_PAINS = [
  "You've paid for this kind of service before and the results were murky at best.",
  "The reports you got didn't tell you whether the phone was ringing.",
  "Your competitors are getting the result this is supposed to deliver and you're not.",
  "You're not sure if you need this exact level of service or something different.",
];

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
  const catLabel = SERVICE_CATEGORY_LABELS[category] ?? category.replace(/-/g, " ");
  const firstP = firstParagraph(item.content_html, 240);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services/" },
        { name: catLabel, url: `/services/${category}/` },
        { name: item.title, url: `/services/${category}/${slug}/` },
      ])} />
      <JsonLd data={serviceSchema({
        name: item.title,
        description: item.excerpt || firstP,
        url: `/services/${category}/${slug}/`,
        category: catLabel,
      })} />
      <PageHero
        eyebrow={spec.hero_eyebrow ?? catLabel}
        h1={spec.hero_h1 ?? item.title.toUpperCase() + "."}
        h1Accent={spec.hero_accent ?? ""}
        sub={spec.hero_sub ?? (item.excerpt || firstP)}
      />

      <PainList
        eyebrow={spec.empathy_eyebrow ?? "I know how this feels"}
        heading={spec.empathy_heading ?? "You've been here before."}
        headingAccent={spec.empathy_heading_accent ?? "This time it works."}
        pains={spec.pains ?? DEFAULT_SERVICE_PAINS}
        summary={spec.empathy_summary}
      />

      <Guide />
      <Plan />

      <WpBody
        eyebrow="What's included"
        heading="What you actually"
        headingAccent="get."
        html={item.content_html}
      />

      <PageStakes
        negBody={
          spec.stakes_neg ??
          "Another quarter spent on marketing that doesn't move the number you actually care about."
        }
        posBody={
          spec.stakes_pos ??
          "Real visibility, real calls, and a monthly report that proves it."
        }
      />

      <PageCTA
        heading={spec.cta_heading ?? `Let's talk about whether ${item.title}`}
        headingAccent={spec.cta_accent ?? "is right for you."}
        sub={
          spec.cta_sub ??
          "Free 30-minute call. I look at what you're actually trying to grow and tell you whether this tier fits or something else does."
        }
      />

      <Footer />
    </>
  );
}
