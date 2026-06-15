// Renders an inline <script type="application/ld+json"> with the supplied
// schema object. Use one per page (or one per logical entity per page).
// Next.js inlines the script in the static HTML, which is what crawlers
// and AI summarizers need to see structured data without JS execution.

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify auto-escapes the </script> close tag inside string
      // values via the surrounding quotes; no extra sanitization needed.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
