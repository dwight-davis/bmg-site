import { notFound } from "next/navigation";
import Link from "next/link";
import { getPosts, getPost, firstParagraph } from "@/lib/wp-content";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/schema/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

// Single-post route. URL pattern mirrors WP exactly: /blog/<slug>/.
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

function fmtDate(s: string): string {
  const d = new Date(s);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const desc = post.excerpt || firstParagraph(post.content_html, 160);
  return {
    title: `${post.title} — Boise Marketing Guy`,
    description: desc,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: { type: "article", title: post.title, description: desc, publishedTime: post.date },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const tax = (post.taxonomies as Record<string, { slug: string; name: string }[]>) || {};
  const cats = tax.category ?? [];

  // Related: 3 most recent other posts.
  const related = getPosts().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog/" },
        ...(cats[0] ? [{ name: cats[0].name.replace(/&amp;/g, "&"), url: `/blog/category/${cats[0].slug}/` }] : []),
        { name: post.title, url: `/blog/${slug}/` },
      ])} />
      <JsonLd data={articleSchema({
        title: post.title,
        description: post.excerpt || firstParagraph(post.content_html, 160),
        url: `/blog/${slug}/`,
        datePublished: post.date,
        dateModified: post.modified,
        image: post.thumbnail_url,
      })} />
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-16 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            {fmtDate(post.date)}{" "}
            {cats[0] ? (
              <>
                {"·"}{" "}
                <Link href={`/blog/category/${cats[0].slug}/`} className="underline hover:text-white"
                      dangerouslySetInnerHTML={{ __html: cats[0].name }} />
              </>
            ) : null}
          </div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="bg-bg">
        <div className="container-column py-16">
          <div
            className="wp-body font-body text-lg leading-relaxed text-ink/90"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />

          <div className="mt-16 pt-10 border-t border-ink/10 text-center">
            <Link href="/blog/" className="font-body text-sm font-bold uppercase tracking-eyebrow text-red hover:text-ink">
              ← All field notes
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 ? (
        <section className="bg-bg-muted">
          <div className="container-content section">
            <h2 className="text-3xl md:text-4xl mb-10 text-center">
              Keep reading.
            </h2>
            <ul className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}/`}
                    className="block bg-white border-2 border-ink shadow-crisp-sm p-6 h-full hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="font-body text-xs uppercase tracking-eyebrow text-red mb-3">
                      {fmtDate(r.date)}
                    </div>
                    <div className="font-display uppercase tracking-tight text-xl text-ink leading-none">
                      {r.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTA />
      <Footer />
    </>
  );
}
