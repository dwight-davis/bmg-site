export function Stakes() {
  return (
    <section className="bg-ink text-white">
      <div className="container-content section">
        <div className="text-center mb-14">
          <div className="eyebrow !text-paper mb-4">What's at stake</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            Two roads from here.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white text-ink p-10 shadow-crisp">
            <div className="eyebrow mb-3">If you do nothing</div>
            <h3 className="font-display !font-normal !text-ink !uppercase text-3xl mb-4 tracking-tight">
              Tragic Results
            </h3>
            <p className="font-body text-lg leading-relaxed text-ink/85">
              Continue wasting money on ineffective marketing. Stay stuck in
              obscurity with no growth or leads.
            </p>
          </div>

          <div className="bg-red text-white p-10 shadow-crisp">
            <div className="eyebrow !text-white mb-3">If we work together</div>
            <h3 className="font-display !font-normal !text-white !uppercase text-3xl mb-4 tracking-tight">
              Successful Results
            </h3>
            <p className="font-body text-lg leading-relaxed text-white/95">
              Increase sales and discover your growth potential. Achieve online
              visibility that drives results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
