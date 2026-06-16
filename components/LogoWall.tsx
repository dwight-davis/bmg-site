import Image from "next/image";

// Logo wall for the /about page. Mixed past/current — recognizable
// enterprise marks signal 20-year-real-chops, recent client marks signal
// "still in the trenches with small businesses." One strip, not two,
// because the visitor reads it as cumulative track record.

const LOGOS = [
  // Past / large work (named first because recognition does the work)
  { slug: "ibm",                 label: "IBM" },
  { slug: "intuit",              label: "Intuit" },
  { slug: "quickbooks",          label: "QuickBooks" },
  { slug: "tiffany",             label: "Tiffany & Co." },
  { slug: "academy",             label: "Academy Sports" },
  { slug: "houston-chronicle",   label: "Houston Chronicle" },
  { slug: "ypcom",               label: "YP.com" },
  // Recent / current client work
  { slug: "container-packaging", label: "Container and Packaging" },
  { slug: "idaho-roasting",      label: "Idaho Roasting" },
  { slug: "houston-ssda",        label: "Houston SSD Attorney" },
  { slug: "fastfixtn",           label: "Fast Fix TN" },
  { slug: "txheatandair",        label: "TX Heat & Air" },
];

export function LogoWall() {
  return (
    <section className="bg-bg-muted">
      <div className="container-content section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow mb-3">Twenty years, real work</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl">
            Brands I&apos;ve worked with{" "}
            <span className="accent">over the years.</span>
          </h2>
          <p className="font-serif italic text-lg text-ink/70 mt-5">
            From in-house roles at large companies to the small businesses
            calling me up this month. Same job: get the phone to ring.
          </p>
        </div>
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-10 items-center max-w-5xl mx-auto">
          {LOGOS.map((l) => (
            <li
              key={l.slug}
              className="flex items-center justify-center h-16"
              title={l.label}
            >
              <Image
                src={`/logos/${l.slug}.png`}
                alt={l.label}
                width={140}
                height={64}
                className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
