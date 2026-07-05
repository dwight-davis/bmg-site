import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Schedule a Strategy Call — Boise Marketing Guy",
  description:
    "Free 30-minute strategy call. We look at your site, your Google profile, and your ads, then tell you what's working, what isn't, and where to start.",
  alternates: { canonical: "/schedule/" },
};

export default function SchedulePage() {
  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-16 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            Free 30-minute strategy call
          </div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl">
            Let&apos;s figure out{" "}
            <span className="accent">what's actually working</span>
            <br />
            and what isn&apos;t.
          </h1>
          <p className="font-serif italic text-white/85 mt-7 max-w-2xl mx-auto text-xl">
            I&apos;ll look at your site, your Google profile, and your ads.
            You&apos;ll leave with three concrete next moves. No pitch.
          </p>
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-content py-16">
          <div className="text-center">
            <a
              href="https://app.onecal.io/b/dwight-davis/boise-marketing-guy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-red text-white shadow-crisp inline-flex text-lg px-10 py-5"
            >
              Book my 30-minute call
            </a>
          </div>

          <div className="mt-14 text-center">
            <p className="font-body text-base text-ink/80 max-w-xl mx-auto leading-relaxed">
              Time doesn&apos;t work? Maya picks up 24/7. She&apos;ll ask the
              right questions and get a call on the calendar.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="tel:+12089923986" className="btn-pill bg-ink text-white">
                Call Maya: (208) 992-3986
              </Link>
              <Link href="mailto:dwight@boisemarketingguy.com" className="btn-pill bg-transparent text-ink border-2 border-ink shadow-none">
                Email instead
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
