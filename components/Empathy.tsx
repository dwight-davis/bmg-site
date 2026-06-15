import Link from "next/link";

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
            What if you could increase your visibility and sales?
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
          <Link href="#schedule" className="btn-red">Schedule an appointment</Link>
        </div>
      </div>
    </section>
  );
}
