import Image from "next/image";
import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Plan } from "@/components/Plan";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { SchedulingButton } from "@/components/SchedulingButton";
import { LogoWall } from "@/components/LogoWall";
import { JsonLd } from "@/components/schema/JsonLd";
import { personSchema, breadcrumbSchema } from "@/lib/seo";

// Tier-1 /about page. Full Guide narrative from data/dwight-story.json so
// the homepage Guide block and this page stay in sync. Story body lives in
// data, not in the component, so future edits don't risk drift.

export const metadata = {
  title: "About Dwight — Boise Marketing Guy",
  description:
    "Twenty years from green screens to AI search. $450k/month in paid media managed personally. Meet Dwight Davis, the Boise Marketing Guy.",
  alternates: { canonical: "/about/" },
};

type Story = {
  tagline: string;
  proof_points: string[];
  guide_short: string;
  guide_full: string[];
  credentials_line: string;
};

function loadStory(): Story {
  return JSON.parse(
    readFileSync(join(process.cwd(), "data", "dwight-story.json"), "utf8"),
  ) as Story;
}

export default function AboutPage() {
  const story = loadStory();

  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Dwight", url: "/about/" },
      ])} />
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-20 grid md:grid-cols-[2fr_3fr] gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="relative aspect-square w-60 sm:w-72 md:w-80">
              <div className="absolute inset-0 rounded-full bg-paper" />
              <div className="absolute inset-3 rounded-full overflow-hidden">
                <Image
                  src="/dwight.png"
                  alt="Dwight Davis, Boise Marketing Guy"
                  fill
                  priority
                  sizes="(max-width: 768px) 240px, 320px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl lg:text-7xl">
              Dwight Davis,{" "}
              <span className="accent">Boise Marketing Guy.</span>
            </h1>
            <p className="font-serif italic text-white/85 mt-6 text-xl md:text-2xl leading-snug">
              {story.tagline}
            </p>
            <SchedulingButton className="btn-pill bg-red text-white shadow-crisp mt-8 inline-flex">
              Schedule an appointment
            </SchedulingButton>
          </div>
        </div>
      </section>

      {/* Long-form story */}
      <section className="bg-bg">
        <div className="container-column section">
          <div className="space-y-7 font-body text-lg leading-relaxed text-ink/90">
            {story.guide_full.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Proof points */}
      <section className="bg-ink text-white">
        <div className="container-content section">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl">
              Receipts, not{" "}
              <span className="accent">slogans.</span>
            </h2>
            <p className="font-serif italic text-xl md:text-2xl text-white/85 mt-5">
              {story.credentials_line}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {story.proof_points.map((point, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-7">
                <div className="font-display text-red text-4xl mb-3 leading-none">
                  ✓
                </div>
                <p className="font-body text-base leading-snug text-white">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LogoWall />
      <Plan />
      <CTA />
      <Footer />
    </>
  );
}
