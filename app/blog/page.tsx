import Link from "next/link";
import { getPosts, getPostCategories, firstParagraph } from "@/lib/wp-content";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Blog — Boise Marketing Guy",
  description:
    "Field notes on local SEO, AI search visibility, paid media, and what's actually working in Idaho small-business marketing right now.",
  alternates: { canonical: "/blog/" },
};

function fmtDate(s: string): string {
  const d = new Date(s);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogArchive() {
  const posts = getPosts();
  const cats = getPostCategories();

  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-20 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            Field notes
          </div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl">
            What&apos;s actually working in{" "}
            <span className="accent">marketing</span> right now.
          </h1>
          <p className="font-serif italic text-white/85 mt-7 max-w-2xl mx-auto text-xl">
            Local SEO, AI search visibility, paid media, attribution. No
            recycled best-practice posts. Just what I&apos;m seeing in real
            campaigns this week.
          </p>
        </div>
      </section>

      {/* Category chips */}
      {cats.length > 0 ? (
        <section className="bg-bg-muted border-b border-ink/10">
          <div className="container-content py-6">
            <ul className="flex flex-wrap gap-3 justify-center">
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/blog/category/${c.slug}/`}
                    className="inline-flex items-center font-body text-xs font-bold uppercase tracking-eyebrow px-4 py-2 bg-white border border-ink/10 hover:border-red"
                    dangerouslySetInnerHTML={{ __html: `${c.name} <span class="text-ink/40 ml-1">(${c.count})</span>` }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Posts grid */}
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
                    {firstParagraph(p.content_html, 180)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}
