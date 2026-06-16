import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { CalendlyButton } from "@/components/CalendlyButton";

// Tier-2 hero. Same chrome as the homepage hero (announcement bar + nav on
// the navy background, dual pill CTA), but no portrait — the layout is
// single-column and centered so the SB narrative can lead with the H1.
// Used by industry, location, and service-tier templates.

export function PageHero({
  eyebrow,
  h1,
  h1Accent,
  sub,
  primaryLabel = "Let's chat today",
  secondaryHref = "#problem",
  secondaryLabel = "See how it works",
}: {
  eyebrow: string;
  h1: string;
  h1Accent?: string;
  sub: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white min-h-[78vh] flex flex-col">
        <Nav />
        <div className="flex-1 flex items-center">
        <div className="mx-auto w-full max-w-[1100px] px-6 pt-28 pb-20 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-5">
            {eyebrow}
          </div>
          <h1
            className="font-display uppercase tracking-tight text-white leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
          >
            {h1}{" "}
            {h1Accent ? <span className="accent">{h1Accent}</span> : null}
          </h1>
          <p className="font-serif italic text-white/85 mt-7 max-w-3xl mx-auto leading-snug"
             style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)" }}>
            {sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-10">
            <CalendlyButton className="btn-pill bg-red text-white shadow-crisp">
              {primaryLabel}
            </CalendlyButton>
            <Link
              href={secondaryHref}
              className="btn-pill bg-transparent text-white border-2 border-white shadow-none"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
