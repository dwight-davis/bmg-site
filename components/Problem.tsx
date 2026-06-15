const PILLARS = [
  {
    label: "External",
    title: "Wasting money on ineffective ad spend.",
  },
  {
    label: "Internal",
    title: "Frustrated with lack of visibility.",
  },
  {
    label: "Philosophical",
    title: "You shouldn't have to struggle with marketing.",
  },
];

export function Problem() {
  return (
    <section className="bg-bg">
      <div className="container-content section">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">Sound familiar?</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            Marketing should grow your business,{" "}
            <span className="accent">not drain it.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.label}
              className="bg-bg-muted border-2 border-ink/10 p-8 shadow-crisp-sm"
            >
              <div className="eyebrow mb-3">{p.label}</div>
              <p className="font-body text-xl font-medium text-ink leading-snug">
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
