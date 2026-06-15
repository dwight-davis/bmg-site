// Empathy beat for Tier-2 pages. Takes a per-page pain array — typically
// 3 or 4 statements specific to the industry/location/service so each page
// has its own voice for "I know what you're dealing with."

export function PainList({
  eyebrow = "I know how this feels",
  heading,
  headingAccent,
  pains,
  summary,
}: {
  eyebrow?: string;
  heading: string;
  headingAccent?: string;
  pains: string[];
  summary?: string;
}) {
  return (
    <section id="problem" className="bg-bg">
      <div className="container-content section">
        <div className="max-w-column mx-auto">
          <div className="eyebrow mb-4">{eyebrow}</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-8">
            {heading}{" "}
            {headingAccent ? <span className="accent">{headingAccent}</span> : null}
          </h2>
          <ul className="space-y-4 mb-8">
            {pains.map((p, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-red shrink-0" />
                <span className="font-body text-lg leading-relaxed text-ink">
                  {p}
                </span>
              </li>
            ))}
          </ul>
          {summary ? (
            <p className="font-serif italic text-xl leading-relaxed text-ink/80">
              {summary}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
