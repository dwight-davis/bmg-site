import Image from "next/image";

// Logo wall for the /about page. Mixed past/current — recognizable
// enterprise marks signal 20-year-real-chops, recent client marks signal
// "still in the trenches with small businesses." One strip with flex-wrap
// so the row count is natural and the last row centers gracefully.

const LOGOS = [
  // Past / large work (recognition does the work)
  { slug: "ibm",                   label: "IBM" },
  { slug: "quickbooks",            label: "QuickBooks" },
  { slug: "tiffany",               label: "Tiffany & Co." },
  { slug: "ringcentral",           label: "RingCentral" },
  { slug: "salsa-labs",            label: "Salsa Labs" },
  { slug: "houston-chronicle",     label: "Houston Chronicle" },
  // Current major clients
  { slug: "container-packaging",   label: "Container and Packaging" },
  { slug: "idaho-roasting",        label: "Idaho Roasting" },
  // Current SMB client roster
  { slug: "heritage-construction", label: "Heritage Construction Co." },
  { slug: "texas-comfort",         label: "Texas Comfort Systems" },
  { slug: "fastfixtn",             label: "Fast Fix TN" },
  { slug: "tap-dance-wine",        label: "Tap Dance Wine Works" },
  { slug: "luv-pet-store",         label: "Luv Pet Store" },
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
        {/* Flex-wrap with centered justification — last row centers naturally
            regardless of total count. Each slot is a fixed-width box so logos
            sit consistently on every breakpoint. */}
        <ul className="flex flex-wrap justify-center items-center gap-x-10 gap-y-12 max-w-5xl mx-auto">
          {LOGOS.map((l) => (
            <li
              key={l.slug}
              className="flex items-center justify-center w-32 sm:w-36 md:w-40 h-20"
              title={l.label}
            >
              <Image
                src={`/logos/${l.slug}.png`}
                alt={l.label}
                width={240}
                height={120}
                className="max-h-16 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
