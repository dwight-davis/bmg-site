import Link from "next/link";
import { getServiceCategories, firstParagraph } from "@/lib/wp-content";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Plan } from "@/components/Plan";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { SchedulingButton } from "@/components/SchedulingButton";

export const metadata = {
  title: "Marketing Services — Boise Marketing Guy",
  description:
    "From local SEO to AI visibility to paid media. Pick the service tier that fits where you are, or schedule a call and we'll figure it out together.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  const categories = getServiceCategories();
  const totalTiers = categories.reduce((acc, c) => acc + c.tiers.length, 0);

  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-20 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            What we do
          </div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl lg:text-7xl">
            Marketing services that{" "}
            <span className="accent">move the number.</span>
          </h1>
          <p className="font-serif italic text-white/85 mt-7 max-w-3xl mx-auto text-xl md:text-2xl leading-snug">
            {totalTiers} service tiers across {categories.length} categories.
            Pick where you are, or skip the menu and schedule a call.
          </p>
          <SchedulingButton className="btn-pill bg-red text-white shadow-crisp mt-9 inline-flex">
            Schedule an appointment
          </SchedulingButton>
        </div>
      </section>

      {/* Categories — one block per service area, top tiers linked inline */}
      <section className="bg-bg">
        <div className="container-content section">
          <div className="space-y-12">
            {categories.map((c) => (
              <div key={c.slug} className="bg-white border-2 border-ink p-8 shadow-crisp">
                <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                  <div>
                    <div className="eyebrow mb-2">{c.tiers.length} tiers</div>
                    <h2 className="font-display uppercase tracking-tight text-3xl md:text-4xl text-ink leading-none mb-4">
                      {c.label}
                    </h2>
                    <Link
                      href={`/services/${c.slug}/`}
                      className="font-body text-sm font-bold uppercase tracking-eyebrow text-red hover:text-ink"
                    >
                      See all {c.label} options →
                    </Link>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {c.tiers.slice(0, 8).map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/services/${c.slug}/${t.slug}/`}
                          className="block font-body text-sm text-ink hover:text-red leading-snug py-1"
                        >
                          → {t.title}
                        </Link>
                      </li>
                    ))}
                    {c.tiers.length > 8 ? (
                      <li className="font-body text-xs uppercase tracking-eyebrow text-ink/50 self-end">
                        + {c.tiers.length - 8} more
                      </li>
                    ) : null}
                  </ul>
                </div>
                {c.tiers[0]?.excerpt ? (
                  <p className="font-body text-sm text-ink/70 mt-6 leading-relaxed">
                    {firstParagraph(c.tiers[0].content_html, 220)}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Plan />
      <CTA />
      <Footer />
    </>
  );
}
