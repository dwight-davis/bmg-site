// Plan section, from the StoryBrand.ai wireframe. Three labelled steps with
// a short description under each. Same column structure as the wireframe;
// step names lifted verbatim.
const STEPS = [
  {
    n: "01",
    title: "Schedule a call",
    body: "Talk to me about your business goals.",
  },
  {
    n: "02",
    title: "Define your vision",
    body: "Share your unique needs and challenges.",
  },
  {
    n: "03",
    title: "Witness the results",
    body: "Watch your revenue and visibility soar.",
  },
];

export function Plan() {
  return (
    <section id="plan" className="bg-bg">
      <div className="container-content section">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            3 simple steps to{" "}
            <span className="accent">marketing success.</span>
          </h2>
          <p className="font-serif italic text-xl md:text-2xl text-ink/80 mt-5">
            Enjoy a hassle-free path to growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="bg-bg border-2 border-ink p-8 shadow-crisp"
            >
              <div className="font-display text-6xl text-red mb-4">{s.n}</div>
              <h3 className="font-body text-2xl font-bold text-ink leading-snug mb-3">
                {s.title}
              </h3>
              <p className="font-body text-base text-ink/80 leading-snug">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
