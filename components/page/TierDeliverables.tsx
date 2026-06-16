// Deliverables-by-month timeline. The WP dump captured what's delivered
// in month 1, month 2, and ongoing for each tier — a "here's what
// actually happens, in order" view that answers the second-most-asked
// question on any productized service page: when do I get what.

function CleanHtml({ html }: { html: string }) {
  return (
    <div
      className="wp-body font-body text-base text-ink/85 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function TierDeliverables({
  month1,
  month2,
  ongoing,
  footerInclusion,
}: {
  month1: string;
  month2: string;
  ongoing: string;
  footerInclusion: string;
}) {
  // Show only the columns that have content. Some tiers are one-time
  // (month 1 only), some recurring (month 1 + ongoing), some long-tail
  // (all three).
  const cols: { label: string; html: string }[] = [];
  if (month1) cols.push({ label: "Month 1", html: month1 });
  if (month2) cols.push({ label: "Month 2", html: month2 });
  if (ongoing) cols.push({ label: "Ongoing", html: ongoing });

  if (cols.length === 0 && !footerInclusion) return null;

  return (
    <section className="bg-bg">
      <div className="container-content section">
        {cols.length > 0 ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl">
                Here&apos;s what{" "}
                <span className="accent">actually happens.</span>
              </h2>
            </div>
            <div
              className={
                cols.length === 1
                  ? "max-w-2xl mx-auto"
                  : cols.length === 2
                  ? "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                  : "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              }
            >
              {cols.map((c, i) => (
                <div
                  key={c.label}
                  className="bg-white border-2 border-ink p-7 shadow-crisp-sm"
                >
                  <div className="font-display text-5xl text-red mb-3 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display uppercase tracking-tight text-2xl text-ink leading-none mb-5">
                    {c.label}
                  </div>
                  <CleanHtml html={c.html} />
                </div>
              ))}
            </div>
          </>
        ) : null}
        {footerInclusion ? (
          <p className="font-serif italic text-lg text-ink/70 mt-10 text-center max-w-2xl mx-auto">
            {footerInclusion}
          </p>
        ) : null}
      </div>
    </section>
  );
}
