import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "./AnnouncementBar";
import { Nav } from "./Nav";
import { SchedulingButton } from "./SchedulingButton";

export function Hero() {
  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,162,105,0.12),_transparent_60%)] pointer-events-none" />

        <Nav />

        <div className="mx-auto w-full max-w-[1280px] px-6 grid md:grid-cols-[3fr_2fr] gap-10 md:gap-14 items-center relative pt-24 md:pt-28 pb-16 md:pb-20">
          <div className="text-left">
            <h1
              className="leading-[0.92] uppercase"
              style={{ fontSize: "clamp(2.4rem, 4.6vw, 4rem)" }}
            >
              Transform your marketing<br />
              into a <span className="accent">revenue machine.</span>
            </h1>

            <p
              className="mt-6 max-w-2xl font-body text-white/85 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.15vw, 1.2rem)" }}
            >
              Are you spending too much on ineffective ads? Stop pouring
              money into marketing that doesn&apos;t bring customers.
              Let&apos;s build a plan that does.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <SchedulingButton className="btn-red">Schedule an appointment</SchedulingButton>
              <Link href="#solution" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
                See how it works
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-5">
            <div
              className="relative aspect-square"
              style={{ width: "clamp(280px, 32vw, 460px)" }}
            >
              <div className="absolute inset-0 rounded-full bg-paper" />
              <div className="absolute inset-3 rounded-full overflow-hidden">
                <Image
                  src="/dwight.png"
                  alt="Dwight Davis, Boise Marketing Guy"
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, 460px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Clean attribution caption below the portrait. Replaces the
                random-looking rotated chip with something purposeful. */}
            <div className="text-center md:text-left">
              <div className="font-display uppercase tracking-tight leading-none" style={{ fontSize: "clamp(1.5rem, 2vw, 1.875rem)" }}>
                Dwight Davis
              </div>
              <div className="font-body text-xs uppercase tracking-eyebrow text-paper mt-2">
                Boise Marketing Guy
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
