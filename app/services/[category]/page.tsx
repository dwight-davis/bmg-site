import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceCategories, firstParagraph } from "@/lib/wp-content";
import { SERVICE_CATEGORY_LABELS } from "@/lib/wp-types";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Plan } from "@/components/Plan";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

// Category landing page. Lists every tier inside a service category and
// keeps the URL /services/<category>/ live (footer + /services overview
// both link here). Static-generates one page per category at build time.

export function generateStaticParams() {
  return getServiceCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = SERVICE_CATEGORY_LABELS[category] ?? category;
  return {
    title: `${label} — Boise Marketing Guy`,
    description: `Every ${label} tier we offer. Pick the one that matches where your business is right now.`,
    alternates: { canonical: `/services/${category}/` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cats = getServiceCategories();
  const cat = cats.find((c) => c.slug === category);
  if (!cat) notFound();

  return (
    <>
      <section className="relative bg-navy text-white">
        <AnnouncementBar />
        <Nav />
        <div className="container-content pt-28 pb-20 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            {cat.tiers.length} {cat.tiers.length === 1 ? "tier" : "tiers"}
          </div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl">
            {cat.label}.
          </h1>
          <p className="font-serif italic text-white/85 mt-7 max-w-2xl mx-auto text-xl">
            Pick the tier that matches where your business is right now, or
            schedule a call and I&apos;ll point you to the right one.
          </p>
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-content section">
          <ul className="grid gap-5 sm:grid-cols-2">
            {cat.tiers.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/services/${cat.slug}/${t.slug}/`}
                  className="block bg-white border-2 border-ink p-6 shadow-crisp-sm hover:-translate-y-0.5 transition-transform h-full"
                >
                  <div className="font-display uppercase tracking-tight text-xl text-ink leading-none mb-3">
                    {t.title}
                  </div>
                  <p className="font-body text-sm text-ink/70 leading-snug">
                    {(t.excerpt || firstParagraph(t.content_html, 160)).slice(0, 200)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Plan />
      <CTA />
      <Footer />
    </>
  );
}
