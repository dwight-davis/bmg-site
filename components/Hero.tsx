import Image from "next/image";
import Link from "next/link";
import { Nav } from "./Nav";

// Hero is sized to fill the viewport — no scroll required to read the
// pitch. Uses flex column so the nav sits at top and the hero body
// vertically centers in the remaining space. H1 scales down on shorter
// viewports via clamp so 4 lines of headline plus sub plus dual CTA
// plus portrait all fit on a 720p laptop.
export function Hero() {
  return (
    <section
      className="relative bg-navy text-white overflow-hidden flex flex-col"
      style={{ minHeight: "100vh" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,162,105,0.12),_transparent_60%)] pointer-events-none" />

      <Nav />

      <div className="container-content flex-1 grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-center relative pt-24 pb-12">
        <div className="text-left">
          <h1
            className="leading-[0.95]"
            style={{
              // Scales from 2.6rem on small phones up to 5.25rem on big
              // desktops, with viewport-relative middle term so the H1
              // never blows out vertical space on short laptops.
              fontSize: "clamp(2.6rem, 5.4vw, 5.25rem)",
            }}
          >
            We help small businesses in Boise{" "}
            <span className="accent">grow</span>{" "}
            without the marketing struggle.
          </h1>

          <p
            className="mt-6 max-w-xl font-body text-white/85 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.15vw, 1.25rem)" }}
          >
            If you&apos;re tired of pouring money into marketing that
            doesn&apos;t bring customers, you&apos;re not alone. We get it.
            We&apos;ve been helping Boise small businesses grow for more than
            20 years.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
            <Link href="#solution" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
              See how it works
            </Link>
          </div>
        </div>

        {/* Portrait sized with clamp so it grows on big monitors but
            stays compact on a 720p laptop where vertical space is the
            constraint. */}
        <div
          className="relative mx-auto md:mx-0 aspect-square"
          style={{ width: "clamp(220px, 28vw, 380px)" }}
        >
          <div className="absolute inset-0 rounded-full bg-paper" />
          <div className="absolute inset-3 rounded-full overflow-hidden">
            <Image
              src="/dwight.png"
              alt="Dwight Davis, Boise Marketing Guy"
              fill
              priority
              sizes="(max-width: 768px) 220px, 380px"
              className="object-cover object-top"
            />
          </div>

          <div className="absolute -top-2 -left-2 sm:-left-4 z-10 bg-ink text-white px-3 py-2 shadow-crisp-sm rotate-[-6deg]">
            <div className="font-display text-sm sm:text-base leading-none uppercase tracking-tight">
              Dwight Davis
            </div>
            <div className="font-body text-[9px] uppercase tracking-eyebrow text-paper mt-1">
              Boise Marketing Guy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
