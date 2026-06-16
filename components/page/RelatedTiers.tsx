import Link from "next/link";
import { WpItem } from "@/lib/wp-types";

// Sibling tiers inside the same service category. Shown at the bottom of
// every service-tier page so a visitor who isn't sure this is the right
// tier can step up/down to one that fits. Filters out the current tier
// and caps the row at 6 — past that becomes noise.

export function RelatedTiers({
  current,
  siblings,
  categorySlug,
  categoryLabel,
}: {
  current: WpItem;
  siblings: WpItem[];
  categorySlug: string;
  categoryLabel: string;
}) {
  const others = siblings.filter((t) => t.slug !== current.slug).slice(0, 6);
  if (others.length === 0) return null;

  return (
    <section className="bg-bg-muted">
      <div className="container-content section">
        <div className="text-center mb-10">
          <div className="eyebrow mb-3">More {categoryLabel}</div>
          <h2 className="text-3xl sm:text-4xl">
            Other tiers in this category.
          </h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/services/${categorySlug}/${t.slug}/`}
                className="block bg-white border border-ink/10 p-5 hover:border-red transition-colors"
              >
                <div className="font-display uppercase tracking-tight text-lg text-ink leading-none">
                  {t.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-8">
          <Link
            href={`/services/${categorySlug}/`}
            className="font-body text-sm font-bold uppercase tracking-eyebrow text-red hover:text-ink"
          >
            See all {categoryLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
