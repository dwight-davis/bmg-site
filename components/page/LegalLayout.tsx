import { notFound } from "next/navigation";
import { getPage } from "@/lib/wp-content";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Shared layout for the three legal pages (/privacy, /terms, /accessibility).
// Pulls the WP page body straight from the export so we don't fork the
// canonical text in code.

export function LegalLayout({ slug }: { slug: string }) {
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-16 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            Boise Marketing Guy
          </div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl">
            {page.title}
          </h1>
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-column py-16">
          <div
            className="wp-body font-body text-base leading-relaxed text-ink/90"
            dangerouslySetInnerHTML={{ __html: page.content_html }}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
