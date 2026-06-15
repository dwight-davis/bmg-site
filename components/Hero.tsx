import Image from "next/image";
import Link from "next/link";
import { Nav } from "./Nav";

export function Hero() {
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      {/* Subtle vignette so the hero feels deeper, mimics SB's photo-overlay
          warmth without needing an actual photo background. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,162,105,0.12),_transparent_60%)] pointer-events-none" />

      <Nav />

      <div className="container-content pt-32 pb-20 md:pt-40 md:pb-24 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center relative">
        <div className="text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95]">
            We help small businesses in Boise{" "}
            <span className="accent">grow</span>{" "}
            without the marketing struggle.
          </h1>

          <p className="mt-8 max-w-xl font-body text-lg md:text-xl text-white/85 leading-relaxed">
            If you&apos;re tired of pouring money into marketing that
            doesn&apos;t bring customers, you&apos;re not alone. We get it.
            We&apos;ve been helping Boise small businesses grow for more than
            20 years.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
            <Link href="#solution" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
              See how it works
            </Link>
          </div>
        </div>

        {/* Portrait composition: paper-tan circle backdrop, photo on top,
            badge chip floating upper-left. Mirrors the SB Don-Miller
            treatment. */}
        <div className="relative mx-auto md:mx-0 w-72 sm:w-80 md:w-full max-w-[420px] aspect-square">
          <div className="absolute inset-0 rounded-full bg-paper" />
          <div className="absolute inset-4 rounded-full overflow-hidden">
            <Image
              src="/dwight.png"
              alt="Dwight Davis, Boise Marketing Guy"
              fill
              priority
              sizes="(max-width: 768px) 320px, 420px"
              className="object-cover object-top"
            />
          </div>

          <div className="absolute -top-2 -left-2 sm:-left-6 z-10 bg-ink text-white px-4 py-3 shadow-crisp-sm rotate-[-6deg]">
            <div className="font-display text-base leading-none uppercase tracking-tight">
              Dwight Davis
            </div>
            <div className="font-body text-[10px] uppercase tracking-eyebrow text-paper mt-1">
              Boise Marketing Guy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
