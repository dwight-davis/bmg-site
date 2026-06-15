import Image from "next/image";
import Link from "next/link";
import { Nav } from "./Nav";

export function Hero() {
  return (
    <section
      className="relative bg-navy text-white overflow-hidden flex flex-col"
      style={{ minHeight: "100vh" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,162,105,0.12),_transparent_60%)] pointer-events-none" />

      <Nav />

      <div className="container-content flex-1 grid md:grid-cols-[1.5fr_1fr] gap-8 md:gap-10 items-center relative pt-20 pb-6">
        <div className="text-left">
          <h1
            className="leading-[0.92]"
            style={{
              // Down from 5.25rem to 3.8rem max. At 1366px this is ~3.5rem
              // which wraps the 60-char H1 into ~3 lines instead of 6.
              fontSize: "clamp(2rem, 3.6vw, 3rem)",
            }}
          >
            We help small businesses in Boise{" "}
            <span className="accent">grow</span>{" "}
            without the marketing struggle.
          </h1>

          <p
            className="mt-4 max-w-xl font-body text-white/85 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.15rem)" }}
          >
            If you&apos;re tired of pouring money into marketing that
            doesn&apos;t bring customers, you&apos;re not alone. We get it.
            We&apos;ve been helping Boise small businesses grow for more than
            20 years.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
            <Link href="#solution" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
              See how it works
            </Link>
          </div>
        </div>

        {/* Smaller portrait so the text column gets more width. */}
        <div
          className="relative mx-auto md:mx-0 aspect-square"
          style={{ width: "clamp(180px, 22vw, 280px)" }}
        >
          <div className="absolute inset-0 rounded-full bg-paper" />
          <div className="absolute inset-3 rounded-full overflow-hidden">
            <Image
              src="/dwight.png"
              alt="Dwight Davis, Boise Marketing Guy"
              fill
              priority
              sizes="(max-width: 768px) 200px, 320px"
              className="object-cover object-top"
            />
          </div>

          <div className="absolute -top-2 -left-2 sm:-left-4 z-10 bg-ink text-white px-3 py-2 shadow-crisp-sm rotate-[-6deg]">
            <div className="font-display text-sm leading-none uppercase tracking-tight">
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
