import { CalendlyButton } from "./CalendlyButton";

// Stakes / pain section. Lifted from the StoryBrand.ai wireframe verbatim:
// 8 pains laid out in two columns with red bullet dots, headline call to
// action below. Cousin to the homepage's later "Two Roads" stakes block.
const PAINS_LEFT = [
  "Wasting money on ineffective ad spend.",
  "Frustrated with lack of sales growth.",
  "Invisible to potential customers online.",
  "Struggling to understand digital marketing.",
];
const PAINS_RIGHT = [
  "Feeling overwhelmed by technology changes.",
  "Lost in the sea of competition.",
  "Not reaching your business goals.",
  "Lacking powerful marketing strategies.",
];

function Item({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-left">
      <span className="mt-2 w-2.5 h-2.5 rounded-full bg-red shrink-0" />
      <span className="font-body text-base sm:text-lg leading-snug text-ink">
        {text}
      </span>
    </li>
  );
}

export function Empathy() {
  return (
    <section className="bg-bg">
      <div className="container-content section">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            Stop losing money on{" "}
            <span className="accent">poor marketing.</span>
          </h2>
          <p className="font-serif italic text-xl md:text-2xl text-ink/80 mt-5">
            What if you could increase your visibility and sales by stopping these?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14 max-w-4xl mx-auto mt-12">
          <ul className="space-y-5">
            {PAINS_LEFT.map((p, i) => <Item key={i} text={p} />)}
          </ul>
          <ul className="space-y-5">
            {PAINS_RIGHT.map((p, i) => <Item key={i} text={p} />)}
          </ul>
        </div>

        <div className="text-center mt-14">
          {/* Punchy tagline above the CTA — SB pattern */}
          <div className="max-w-xl mx-auto mb-8">
            <p
              className="font-display uppercase tracking-tight text-ink leading-tight"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}
            >
              The phone rings for the business{" "}
              <span className="accent">that decided.</span>
            </p>
            <p className="font-serif italic text-ink/70 mt-3 text-base md:text-lg">
              Don&apos;t let another quiet quarter be the one you remember.
            </p>
          </div>
          <CalendlyButton className="btn-red">Schedule an appointment</CalendlyButton>
        </div>
      </div>
    </section>
  );
}
