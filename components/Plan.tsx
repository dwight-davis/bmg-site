const STEPS = [
  { n: "01", title: "Schedule an appointment with us." },
  { n: "02", title: "Share your business goals." },
  { n: "03", title: "Watch as we deliver results." },
];

export function Plan() {
  return (
    <section className="bg-bg">
      <div className="container-content section">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">A simple plan</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            Three steps to <span className="accent">measurable growth.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="bg-bg border-2 border-ink p-8 shadow-crisp"
            >
              <div className="font-display text-6xl text-red mb-4">{s.n}</div>
              <p className="font-body text-xl font-medium text-ink leading-snug">
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
