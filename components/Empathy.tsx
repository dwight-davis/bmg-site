import Link from "next/link";

// Empathy section. StoryBrand executes this as a two-column 6-item pain
// list with red bullet dots, specific phrasing (not abstract), bold
// emphasis on the verb-noun pair, and a sharp closer line. Single CTA
// below. We mimic the structure beat for beat; the words are Boise-SMB
// specific.
const PAINS_LEFT = [
  ["Your ad budget", "doesn't bring customers."],
  ["Customers in Boise", "don't know you exist."],
  ["Your competitors", "are getting the calls you should be getting."],
];
const PAINS_RIGHT = [
  ["You're DIY-ing marketing", "while trying to run the business."],
  ["You spend money on marketing", "with nothing to show for it."],
  ["Your offer is strong", "but nothing seems to work."],
];

function Item({ pair }: { pair: [string, string] }) {
  return (
    <li className="flex items-start gap-3 text-left">
      <span className="mt-2 w-2.5 h-2.5 rounded-full bg-red shrink-0" />
      <span className="font-body text-base sm:text-lg leading-snug text-ink">
        {pair[0]} <strong className="font-bold">{pair[1]}</strong>
      </span>
    </li>
  );
}

export function Empathy() {
  return (
    <section className="bg-bg">
      <div className="container-content section">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            We understand how{" "}
            <span className="accent">ineffective marketing</span> drains a
            small business.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14 max-w-4xl mx-auto">
          <ul className="space-y-5">
            {PAINS_LEFT.map((p, i) => <Item key={i} pair={p as [string,string]} />)}
          </ul>
          <ul className="space-y-5">
            {PAINS_RIGHT.map((p, i) => <Item key={i} pair={p as [string,string]} />)}
          </ul>
        </div>

        <div className="text-center mt-14 max-w-column mx-auto">
          <p className="font-body text-lg text-ink">
            In Boise, attention is scarce.{" "}
            <span className="font-bold">Confusion costs you customers.</span>
          </p>
          <div className="mt-8">
            <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
