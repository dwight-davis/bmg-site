import { notFound } from "next/navigation";
import { getIndustries, getIndustry, firstParagraph } from "@/lib/wp-content";
import { getIndustrySpec } from "@/lib/page-specs";
import { PageHero } from "@/components/page/PageHero";
import { PainList } from "@/components/page/PainList";
import { Guide } from "@/components/Guide";
import { Plan } from "@/components/Plan";
import { WpBody } from "@/components/page/WpBody";
import { PageStakes } from "@/components/page/PageStakes";
import { PageCTA } from "@/components/page/PageCTA";
import { Footer } from "@/components/Footer";

// Static generate every industry from the WP export.
export function generateStaticParams() {
  return getIndustries().map((i) => ({ slug: i.slug }));
}

// Default empathy bullets for industries without a hand-crafted spec.
// Worded so they apply to any local service business in Idaho. Real
// per-industry pain copy lives in data/page-specs.json and overrides these.
const DEFAULT_INDUSTRY_PAINS = [
  "Customers are searching for what you sell and finding a competitor first.",
  "You're paying for marketing but you can't tell what's actually working.",
  "Your competitors with sharper ads and more reviews win the calls you should win.",
  "You're running the business AND running marketing, and one of them always slips.",
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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

  return (
    <>
      <PageHero
        eyebrow={spec.hero_eyebrow ?? `Marketing for ${item.title}`}
        h1={spec.hero_h1 ?? `${item.title.toUpperCase()}:`}
        h1Accent={spec.hero_accent ?? "MARKETING THAT ACTUALLY WORKS."}
        sub={spec.hero_sub ?? (item.excerpt || firstP)}
      />

      <PainList
        eyebrow={spec.empathy_eyebrow ?? "I know how this feels"}
        heading={spec.empathy_heading ?? "You do great work."}
        headingAccent={spec.empathy_heading_accent ?? "The phone still doesn't ring."}
        pains={spec.pains ?? DEFAULT_INDUSTRY_PAINS}
        summary={spec.empathy_summary}
      />

      <Guide />
      <Plan />

      <WpBody
        eyebrow={`How I work with ${item.title.toLowerCase()} businesses`}
        heading="What I actually"
        headingAccent="do here."
        html={item.content_html}
      />

      <PageStakes
        negBody={
          spec.stakes_neg ??
          "Another quarter losing customers to competitors with sharper marketing. Another year invisible in the searches that matter."
        }
        posBody={
          spec.stakes_pos ??
          "Customers find you first, call you first, and choose you over the competition. Real growth, measured every month."
        }
      />

      <PageCTA
        heading={spec.cta_heading ?? `Let's grow your ${item.title.toLowerCase()} business`}
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
