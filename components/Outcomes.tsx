import Link from "next/link";

const OUTCOMES = [
  { glyph: "◎", title: "A clear message that attracts the right customers" },
  { glyph: "↗", title: "Marketing spend that pays for itself" },
  { glyph: "▲", title: "Visible growth, month over month" },
  { glyph: "✓", title: "Less time worrying. More time running the business" },
];

export function Outcomes() {
  return (
    <section className="bg-ink text-white">
      <div className="container-content section">
        <div className="text-center max-w-column mx-auto mb-10">
          <div className="font-body text-xs font-bold uppercase tracking-eyebrow text-paper mb-4">
            The solution
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            <span className="accent">Marketing</span> that finally{" "}
            <span className="accent">works.</span>
          </h2>
          <p className="font-body text-base md:text-lg text-white/75 mt-6">
            When your marketing is clear, customers engage, your phone rings,
            and your business grows. We build the strategy that gets you there.
          </p>
          <p className="font-body text-base md:text-lg text-white/75 mt-4">
            <span className="font-bold text-white">With us, you&apos;ll get:</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 max-w-4xl mx-auto mb-12">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-white text-ink flex items-center justify-center font-display text-4xl mb-4">
                {o.glyph}
              </div>
              <p className="font-body text-sm md:text-base text-white leading-snug">
                {o.title}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
          <Link href="#" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
            See how it works
          </Link>
        </div>

        <p className="text-center font-body text-sm text-white/60 mt-10 max-w-column mx-auto">
          For more than 20 years, we have helped hundreds of Boise businesses
          grow their revenue. Now it&apos;s your turn.
        </p>
      </div>
    </section>
  );
}
