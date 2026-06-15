export function Transformation() {
  return (
    <section className="bg-bg-muted">
      <div className="container-content section">
        <div className="text-center mb-12">
          <div className="eyebrow mb-4">The transformation</div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center">
          <div className="text-center md:text-right">
            <div className="font-body text-sm font-bold uppercase tracking-eyebrow text-ink/60 mb-3">
              From
            </div>
            <p className="font-serif italic text-3xl md:text-4xl text-ink/70 leading-tight">
              Struggling to compete.
            </p>
          </div>

          <div className="hidden md:block font-display text-7xl text-red">→</div>
          <div className="md:hidden font-display text-5xl text-red text-center">↓</div>

          <div className="text-center md:text-left">
            <div className="font-body text-sm font-bold uppercase tracking-eyebrow text-red mb-3">
              To
            </div>
            <p className="font-display text-4xl md:text-5xl text-ink leading-none">
              Confident in your{" "}
              <span className="accent">marketing strategy</span> and growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
