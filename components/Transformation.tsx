import { CalendlyButton } from "./CalendlyButton";

// Explanatory Paragraph from the StoryBrand.ai wireframe. Empathy +
// authority + transformation in a single block. Lands right before the
// final CTA — last narrative beat that earns the appointment.
export function Transformation() {
  return (
    <section className="bg-bg-muted">
      <div className="container-content section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-5">
            Stop struggling with{" "}
            <span className="accent">ineffective marketing.</span>
          </h2>
          <p className="font-serif italic text-xl md:text-2xl text-ink/80 mb-10">
            You deserve a marketing strategy that works.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-ink/90 mb-10">
            Are you tired of pouring money into marketing strategies that
            yield little to no results? At Boise Marketing Guy, we know how
            frustrating it can be to feel invisible in today&apos;s
            competitive landscape. I get to know you and your business,
            then craft a tailored digital marketing strategy designed to
            drive leads and sales. Experience the satisfaction that comes
            from seeing measurable growth and finally gaining the
            visibility you deserve.
          </p>

          <CalendlyButton className="btn-red">Schedule an appointment</CalendlyButton>
        </div>
      </div>
    </section>
  );
}
