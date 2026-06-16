import Link from "next/link";
import { LocationExtras } from "@/lib/location-extras";

// Stat strip for location pages. Shows what we know about the town —
// county, population, region — and the services we deliver there.
// Renders only when meta is present (regional-level pages like
// "Treasure Valley" don't carry city-level fields).

export function LocationStats({
  extras,
  cityShortName,
}: {
  extras: LocationExtras;
  cityShortName: string;
}) {
  const stats: { label: string; value: string }[] = [];
  if (extras.county) stats.push({ label: "County", value: extras.county });
  if (extras.population) {
    const pop = Number(extras.population);
    stats.push({
      label: "Population",
      value: Number.isFinite(pop)
        ? new Intl.NumberFormat("en-US").format(pop)
        : extras.population,
    });
  }
  if (extras.region_name) {
    stats.push({ label: "Region", value: extras.region_name });
  }

  if (stats.length === 0 && !extras.what_we_do) return null;

  return (
    <section className="bg-bg-muted">
      <div className="container-content section">
        {stats.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-display uppercase tracking-tight text-red leading-none"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                >
                  {s.value}
                </div>
                <div className="font-body text-xs uppercase tracking-eyebrow text-ink/60 mt-3">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {extras.what_we_do ? (
          <div className="max-w-column mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-5">
              What I do{" "}
              <span className="accent">
                in {cityShortName || "this area"}.
              </span>
            </h2>
            <p className="font-body text-lg text-ink/85 leading-relaxed">
              {extras.what_we_do}
            </p>
            {extras.region_slug ? (
              <p className="font-body text-sm text-ink/60 mt-6">
                Part of{" "}
                <Link
                  href={`/locations/${extras.region_slug}/`}
                  className="text-red underline hover:text-ink"
                >
                  {extras.region_name}
                </Link>
                .
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
