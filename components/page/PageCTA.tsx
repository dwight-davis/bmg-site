import Link from "next/link";
import { CalendlyButton } from "@/components/CalendlyButton";

// CTA for Tier-2 pages — Calendly book + phone fallback. Per-page heading
// + sub copy so the close ties to the specific narrative on that page.

export function PageCTA({
  eyebrow = "Ready when you are",
  heading,
  headingAccent,
  sub,
}: {
  eyebrow?: string;
  heading: string;
  headingAccent?: string;
  sub: string;
}) {
  return (
    <section id="schedule" className="relative bg-navy text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-ink to-ink opacity-95" />
      <div className="container-content section text-center relative">
        <div className="font-body text-xs font-bold uppercase tracking-eyebrow text-paper mb-4">
          {eyebrow}
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 max-w-4xl mx-auto">
          {heading}{" "}
          {headingAccent ? <span className="accent">{headingAccent}</span> : null}
        </h2>
        <p className="font-serif italic text-xl md:text-2xl text-white/90 mb-10 max-w-column mx-auto">
          {sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CalendlyButton className="btn-pill bg-paper text-ink">
            Schedule a strategy call
          </CalendlyButton>
          <Link href="tel:+12089575828" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
            Call Maya: (208) 957-5828
          </Link>
        </div>

        <p className="font-body text-sm text-white/60 mt-8">
          Maya is my 24/7 AI assistant. She picks up, asks the right
          questions, and gets a call on my calendar.
        </p>
      </div>
    </section>
  );
}
