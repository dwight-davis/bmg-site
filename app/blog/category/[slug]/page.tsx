import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPostCategories,
  getPostsInCategory,
  firstParagraph,
} from "@/lib/wp-content";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return getPostCategories().map((c) => ({ slug: c.slug }));
}

function fmtDate(s: string): string {
  const d = new Date(s);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getPostCategories().find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Boise Marketing Guy Blog`,
    alternates: { canonical: `/blog/category/${slug}/` },
  };
}

export default async function CategoryArchive({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getPostCategories().find((c) => c.slug === slug);
  if (!cat) notFound();
  const posts = getPostsInCategory(slug);

  return (
    <>
      <section className="relative bg-navy text-white">
        <AnnouncementBar />
        <Nav />
        <div className="container-content pt-28 pb-16 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            Category · {cat.count} {cat.count === 1 ? "post" : "posts"}
          </div>
          <h1
            className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl"
            dangerouslySetInnerHTML={{ __html: cat.name }}
          />
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-content section">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}/`}
                  className="block bg-white border-2 border-ink shadow-crisp-sm p-6 h-full hover:-translate-y-0.5 transition-transform"
                >
                  <div className="font-body text-xs uppercase tracking-eyebrow text-red mb-3">
                    {fmtDate(p.date)}
                  </div>
                  <h2 className="font-display uppercase tracking-tight text-2xl text-ink leading-none mb-4">
                    {p.title}
                  </h2>
                  <p className="font-body text-sm text-ink/70 leading-snug">
                    {firstParagraph(p.content_html, 160)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <Link href="/blog/" className="font-body text-sm font-bold uppercase tracking-eyebrow text-red hover:text-ink">
              ← All field notes
            </Link>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}
