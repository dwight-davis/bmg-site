import Link from "next/link";
import { CalendlyButton } from "./CalendlyButton";

export function CTA() {
  return (
    <section id="schedule" className="relative bg-navy text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-ink to-ink opacity-95" />
      <div className="container-content section text-center relative">
        <div className="font-body text-xs font-bold uppercase tracking-eyebrow text-paper mb-4">
          Ready when you are
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 max-w-4xl mx-auto">
          Let&apos;s build the marketing your business{" "}
          <span className="accent">actually deserves.</span>
        </h2>
        <p className="font-serif italic text-xl md:text-2xl text-white/90 mb-10 max-w-column mx-auto">
          If you&apos;re overwhelmed by marketing, I&apos;m your solution.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CalendlyButton className="btn-pill bg-paper text-ink">
            Schedule a strategy call
          </CalendlyButton>
          <Link href="tel:+12089923986" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
            Call Maya: (208) 992-3986
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
