// Renders the body content carried over from WordPress inside a clean
// reading column. The HTML comes from apply_filters('the_content', ...)
// so block markup, paragraphs, lists, and inline links are all preserved.
//
// Prose styling lives in globals.css under the .wp-body scope.

export function WpBody({
  eyebrow,
  heading,
  headingAccent,
  html,
}: {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  html: string;
}) {
  return (
    <section className="bg-bg-muted">
      <div className="container-content section">
        <div className="max-w-column mx-auto">
          {eyebrow ? <div className="eyebrow mb-4">{eyebrow}</div> : null}
          {heading ? (
            <h2 className="text-4xl sm:text-5xl md:text-6xl mb-10">
              {heading}{" "}
              {headingAccent ? <span className="accent">{headingAccent}</span> : null}
            </h2>
          ) : null}
          <div
            className="wp-body font-body text-lg leading-relaxed text-ink/90"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </section>
  );
}
