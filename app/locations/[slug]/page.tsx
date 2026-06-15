import { notFound } from "next/navigation";
import { getLocations, getLocation, firstParagraph } from "@/lib/wp-content";
import { getLocationSpec } from "@/lib/page-specs";
import { PageHero } from "@/components/page/PageHero";
import { PainList } from "@/components/page/PainList";
import { Guide } from "@/components/Guide";
import { Plan } from "@/components/Plan";
import { WpBody } from "@/components/page/WpBody";
import { PageStakes } from "@/components/page/PageStakes";
import { PageCTA } from "@/components/page/PageCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return getLocations().map((l) => ({ slug: l.slug }));
}

// "Marketing Services in Boise, Idaho" → "Boise". Used in hero copy.
function shortName(title: string): string {
  return title.replace(/^Marketing Services in /, "").replace(/, Idaho$/, "")
    .replace(/Marketing Services$/, "")
    .trim();
}

const DEFAULT_LOCATION_PAINS = [
  "New residents are searching for what you sell and finding the competition first.",
  "Your ad budget feels like it disappears into Google with nothing measurable to show.",
  "Word-of-mouth used to be enough. Now the first place customers check is Google.",
  "You're great at the work. You're not a marketer and you don't have time to become one.",
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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
  const name = shortName(item.title);
  const firstP = firstParagraph(item.content_html, 240);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Locations", url: "/locations/" },
        { name: name, url: `/locations/${slug}/` },
      ])} />
      <PageHero
        eyebrow={spec.hero_eyebrow ?? `Marketing in ${name}`}
        h1={spec.hero_h1 ?? `${name.toUpperCase()}:`}
        h1Accent={spec.hero_accent ?? "MARKETING THAT BRINGS CUSTOMERS."}
        sub={spec.hero_sub ?? (item.excerpt || firstP)}
      />

      <PainList
        eyebrow={spec.empathy_eyebrow ?? "I know how this feels"}
        heading={spec.empathy_heading ?? `You're a great business in ${name}.`}
        headingAccent={spec.empathy_heading_accent ?? "The right customers still can't find you."}
        pains={spec.pains ?? DEFAULT_LOCATION_PAINS}
        summary={spec.empathy_summary}
      />

      <Guide />
      <Plan />

      <WpBody
        eyebrow={`About ${name}`}
        heading="The market"
        headingAccent="you're competing in."
        html={item.content_html}
      />

      <PageStakes
        negBody={
          spec.stakes_neg ??
          `${name} keeps growing. The businesses that don't sharpen their marketing keep losing new arrivals to the ones that do.`
        }
        posBody={
          spec.stakes_pos ??
          `You become the ${name} business customers find first, recommend by name, and call without checking three competitors.`
        }
      />

      <PageCTA
        heading={spec.cta_heading ?? `Let's grow your business in ${name}`}
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
