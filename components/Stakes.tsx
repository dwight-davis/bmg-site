export function Stakes() {
  return (
    <section id="stakes" className="bg-bg">
      <div className="container-content section">
        <div className="text-center max-w-column mx-auto mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            Two roads from <span className="accent">here.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-ink text-white p-10 shadow-crisp">
            <div className="font-body text-xs uppercase tracking-eyebrow text-white/70 mb-3">
              If you do nothing
            </div>
            <h3 className="font-display !font-normal !text-white !uppercase text-3xl mb-4 tracking-tight leading-none">
              Tragic results
            </h3>
            <p className="font-body text-base leading-relaxed text-white/90">
              Continue wasting money on ineffective marketing. Stay stuck in
              obscurity with no growth or leads. Watch competitors take the
              customers who should have been yours.
            </p>
          </div>

          <div className="bg-red text-white p-10 shadow-crisp">
            <div className="font-body text-xs uppercase tracking-eyebrow text-white/90 mb-3">
              If we work together
            </div>
            <h3 className="font-display !font-normal !text-white !uppercase text-3xl mb-4 tracking-tight leading-none">
              Successful results
            </h3>
            <p className="font-body text-base leading-relaxed text-white">
              Increase sales and discover your growth potential. Achieve
              online visibility that drives results. Become the business in
              Boise people call first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
