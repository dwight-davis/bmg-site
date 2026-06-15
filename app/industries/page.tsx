import Link from "next/link";
import { getIndustries, firstParagraph } from "@/lib/wp-content";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Marketing by Industry — Boise Marketing Guy",
  description:
    "Marketing services tuned for the way your industry actually wins customers. Pick yours.",
  alternates: { canonical: "/industries/" },
};

export default function IndustriesArchive() {
  const industries = getIndustries();

  return (
    <>
      <section className="relative bg-navy text-white">
        <AnnouncementBar />
        <Nav />
        <div className="container-content pt-28 pb-20 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            Marketing by industry
          </div>
          <h1 className="font-display uppercase tracking-tight text-white leading-[0.95]
                         text-5xl md:text-6xl lg:text-7xl">
            Your industry is{" "}
            <span className="accent">different.</span>
            <br />
            Your marketing should be too.
          </h1>
          <p className="font-serif italic text-white/85 mt-7 max-w-2xl mx-auto text-xl">
            How customers find you, what convinces them, what kills the deal,
            all of it changes by industry. Pick yours.
          </p>
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-content section">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}/`}
                  className="block bg-white border-2 border-ink p-6 shadow-crisp-sm hover:-translate-y-0.5 transition-transform"
                >
                  <div className="font-display uppercase tracking-tight text-2xl text-ink leading-none mb-3">
                    {i.title}
                  </div>
                  <p className="font-body text-sm text-ink/70 leading-snug">
                    {(i.excerpt || firstParagraph(i.content_html, 140)).slice(0, 160)}
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
