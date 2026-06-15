import Link from "next/link";

export function Trust() {
  return (
    <section className="bg-ink text-white border-t border-white/10">
      <div className="container-content py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            <span className="accent">Trusted</span> by Boise small businesses
            and built on <span className="accent">two decades</span> of
            experience.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          <div className="text-center">
            <div className="font-display text-5xl md:text-7xl text-red">20+</div>
            <div className="font-body text-xs uppercase tracking-eyebrow text-white/70 mt-2">years experience</div>
          </div>
          <div className="text-center">
            <div className="font-display text-5xl md:text-7xl text-red">100s</div>
            <div className="font-body text-xs uppercase tracking-eyebrow text-white/70 mt-2">businesses helped</div>
          </div>
          <div className="text-center">
            <div className="font-display text-5xl md:text-7xl text-red">208</div>
            <div className="font-body text-xs uppercase tracking-eyebrow text-white/70 mt-2">Boise born and based</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
          <Link href="tel:+12089575828" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
            Call Maya — 24/7
          </Link>
        </div>
      </div>
    </section>
  );
}
