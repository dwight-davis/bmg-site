import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "./AnnouncementBar";
import { Nav } from "./Nav";

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
              We help Boise businesses<br />
              <span className="accent">grow</span> without the<br />
              marketing struggle.
            </h1>

            <p
              className="mt-6 max-w-2xl font-body text-white/85 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.15vw, 1.2rem)" }}
            >
              If you&apos;re tired of pouring money into marketing that
              doesn&apos;t bring customers, you&apos;re not alone. We get it.
              We&apos;ve been helping small businesses grow for more than 20 years.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
              <Link href="#solution" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
                See how it works
              </Link>
            </div>
          </div>

          <div
            className="relative mx-auto md:mx-0 aspect-square"
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

            <div className="absolute -top-3 -left-2 sm:-left-6 z-10 bg-ink text-white px-4 py-2 shadow-crisp-sm rotate-[-6deg]">
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
    </>
  );
}
