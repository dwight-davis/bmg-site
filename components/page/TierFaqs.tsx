import { Faq } from "@/lib/service-tier-extras";
import { JsonLd } from "@/components/schema/JsonLd";

// FAQ block for the service-tier page. Renders as a stacked accordion-
// styled card list (no JS — open by default for read-flow), and emits
// FAQPage schema so Google can pull rich-result snippets and AI assistants
// can cite the answer when the question matches.

export function TierFaqs({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="bg-bg-muted" id="faqs">
      <JsonLd data={schema} />
      <div className="container-content section">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl">
            Common <span className="accent">questions.</span>
          </h2>
        </div>
        <div className="max-w-column mx-auto space-y-5">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="bg-white border-2 border-ink p-6 shadow-crisp-sm group"
              open
            >
              <summary className="cursor-pointer list-none font-body text-lg font-bold text-ink leading-snug select-none">
                {f.question}
              </summary>
              <p className="font-body text-base text-ink/80 leading-relaxed mt-4 whitespace-pre-line">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
