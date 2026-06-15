// Stakes beat for Tier-2 pages. Same two-column negative/positive frame as
// the homepage Stakes, but copy is pluggable so each page can speak to its
// specific niche.

export function PageStakes({
  heading = "Two roads from",
  headingAccent = "here.",
  negTitle = "Tragic results",
  negBody,
  posTitle = "Successful results",
  posBody,
}: {
  heading?: string;
  headingAccent?: string;
  negTitle?: string;
  negBody: string;
  posTitle?: string;
  posBody: string;
}) {
  return (
    <section className="bg-bg">
      <div className="container-content section">
        <div className="text-center max-w-column mx-auto mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            {heading} <span className="accent">{headingAccent}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-ink text-white p-10 shadow-crisp">
            <div className="font-body text-xs uppercase tracking-eyebrow text-white/70 mb-3">
              If you do nothing
            </div>
            <h3 className="font-display !font-normal !text-white !uppercase text-3xl mb-4 tracking-tight leading-none">
              {negTitle}
            </h3>
            <p className="font-body text-base leading-relaxed text-white/90">
              {negBody}
            </p>
          </div>

          <div className="bg-red text-white p-10 shadow-crisp">
            <div className="font-body text-xs uppercase tracking-eyebrow text-white/90 mb-3">
              If we work together
            </div>
            <h3 className="font-display !font-normal !text-white !uppercase text-3xl mb-4 tracking-tight leading-none">
              {posTitle}
            </h3>
            <p className="font-body text-base leading-relaxed text-white">
              {posBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
