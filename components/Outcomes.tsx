import { CalendlyButton } from "./CalendlyButton";

// Value Proposition section, from the StoryBrand.ai wireframe: the four
// outcomes a customer gets when they work with us. Light icon column over
// short benefit line, single CTA below.
const OUTCOMES = [
  { glyph: "◎", title: "Get tailored solutions that fit your business." },
  { glyph: "↗", title: "Receive ongoing support from industry experts." },
  { glyph: "▲", title: "Watch your leads and sales grow steadily." },
  { glyph: "✓", title: "Leverage 20+ years of successful strategies." },
];

export function Outcomes() {
  return (
    <section id="solution" className="bg-ink text-white">
      <div className="container-content section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            Achieve growth with{" "}
            <span className="accent">expert digital solutions.</span>
          </h2>
          <p className="font-serif italic text-xl md:text-2xl text-white/85 mt-5">
            Experience clarity, control, and increased sales.
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

        <div className="flex justify-center">
          <CalendlyButton className="btn-red">Schedule an appointment</CalendlyButton>
        </div>
      </div>
    </section>
  );
}
