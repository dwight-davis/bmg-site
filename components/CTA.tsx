import Link from "next/link";

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
          If you&apos;re overwhelmed by marketing, our services are your
          solution.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="https://calendly.com/davisdwight/30-minute-strategy-call"
            className="btn-pill bg-paper text-ink"
          >
            Schedule a strategy call
          </Link>
          <Link href="tel:+12087617016" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
            Call Dwight: (208) 761-7016
          </Link>
        </div>

        <p className="font-body text-sm text-white/60 mt-8">
          Or talk to Maya, our 24/7 assistant: (208) 957-5828
        </p>
      </div>
    </section>
  );
}
