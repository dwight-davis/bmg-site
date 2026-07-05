import { SchedulingButton } from "./SchedulingButton";

// Empathy & Competency block from the StoryBrand.ai wireframe. Real proof
// points from Dwight's brand story sit on the left; verified LinkedIn
// recommendations from senior executives sit on the right. No fabricated
// awards, no invented testimonials.
const PROOF_POINTS = [
  { value: "$450K/mo", label: "in paid media managed personally" },
  { value: "3.78x", label: "ROAS sustained for a $150M packaging distributor" },
  { value: "2x", label: "organic SEO performance for mid-market clients" },
  { value: "20+ yrs", label: "from green screens to AI-powered search" },
];

// Paraphrased from real LinkedIn recommendations. Substance preserved,
// length tightened so each quote earns its space on the page. Names and
// titles unchanged.
const TESTIMONIALS = [
  {
    quote:
      "When I need the smartest person in the room, I look to Dwight. He's a master digital strategist who weighs research, competition, goals, and ROI before recommending anything.",
    author: "Chuck Arnold",
    title: "Executive Director, 30+ years in communications and marketing",
  },
  {
    quote:
      "Dwight managed our entire digital marketing program and drove real outcomes: new prospects, more qualified leads. He's the rare strategist who tests, measures, and keeps iterating.",
    author: "Vinny Poliseno",
    title: "President, Technology Operations Services",
  },
];

export function Trust() {
  return (
    <section className="bg-ink text-white border-t border-white/10">
      <div className="container-content py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="font-body text-xs font-bold uppercase tracking-eyebrow text-paper mb-4">
            Why work with us
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            We&apos;ve got{" "}
            <span className="accent">your back.</span>
          </h2>
          <p className="font-serif italic text-xl md:text-2xl text-white/85 mt-5">
            With this experience, you won&apos;t be alone in this.
          </p>
        </div>

        {/* Real proof points, not vanity stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {PROOF_POINTS.map((p) => (
            <div key={p.value} className="text-center">
              <div className="font-display uppercase tracking-tight text-red leading-none"
                   style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}>
                {p.value}
              </div>
              <div className="font-body text-xs uppercase tracking-eyebrow text-white/70 mt-3 leading-snug">
                {p.label}
              </div>
            </div>
          ))}
        </div>

        {/* Real verified testimonials from senior executives who managed
            or worked alongside Dwight. Sourced from LinkedIn recommendations. */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="bg-white/5 border border-white/10 p-8">
              <blockquote className="font-serif italic text-lg md:text-xl text-white/95 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-body text-sm">
                <div className="text-white font-bold">{t.author}</div>
                <div className="text-white/60">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex justify-center">
          <SchedulingButton className="btn-red">Schedule an appointment</SchedulingButton>
        </div>
      </div>
    </section>
  );
}
