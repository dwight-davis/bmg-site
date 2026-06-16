import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Boise Marketing Guy",
  description:
    "Send Dwight a message, call Maya (24/7), or grab the next 30-minute strategy call directly. Three ways to start a conversation.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-16 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            Three ways to start
          </div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl">
            Let&apos;s <span className="accent">talk.</span>
          </h1>
          <p className="font-serif italic text-white/85 mt-7 max-w-2xl mx-auto text-xl">
            Pick whichever feels right. I read everything personally and
            usually reply the same day.
          </p>
        </div>
      </section>

      {/* Three-channel grid */}
      <section className="bg-bg">
        <div className="container-content section">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a
              href="tel:+12089575828"
              className="block bg-white border-2 border-ink p-7 shadow-crisp hover:-translate-y-0.5 transition-transform"
            >
              <div className="font-display text-red text-5xl mb-4 leading-none">
                ☎
              </div>
              <div className="font-display uppercase tracking-tight text-2xl text-ink leading-none mb-3">
                Call Maya
              </div>
              <p className="font-body text-sm text-ink/70 leading-relaxed mb-4">
                My 24/7 AI assistant. She picks up, asks the right
                questions, and gets the right next step on the calendar.
              </p>
              <div className="font-body text-base font-bold text-ink">
                (208) 957-5828
              </div>
            </a>

            <a
              href="mailto:dwight@boisemarketingguy.com"
              className="block bg-white border-2 border-ink p-7 shadow-crisp hover:-translate-y-0.5 transition-transform"
            >
              <div className="font-display text-red text-5xl mb-4 leading-none">
                ✉
              </div>
              <div className="font-display uppercase tracking-tight text-2xl text-ink leading-none mb-3">
                Email me
              </div>
              <p className="font-body text-sm text-ink/70 leading-relaxed mb-4">
                Drop me a line directly. I read every email and try to
                reply same day, always within one business day.
              </p>
              <div className="font-body text-sm font-bold text-ink break-words">
                dwight@boisemarketingguy.com
              </div>
            </a>

            <Link
              href="/schedule/"
              className="block bg-navy text-white border-2 border-navy p-7 shadow-crisp hover:-translate-y-0.5 transition-transform"
            >
              <div className="font-display text-paper text-5xl mb-4 leading-none">
                ◷
              </div>
              <div className="font-display uppercase tracking-tight text-2xl text-white leading-none mb-3">
                Book a call
              </div>
              <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
                30 minutes, free, no pitch. We look at your site, your
                Google profile, and your ads, then walk through your three
                highest-leverage moves.
              </p>
              <div className="font-body text-sm font-bold text-paper">
                Open calendar →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Inline contact form */}
      <section className="bg-bg-muted">
        <div className="container-content section">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl">
              Or send a <span className="accent">quick note.</span>
            </h2>
            <p className="font-serif italic text-lg text-ink/75 mt-3">
              Tell me what&apos;s on your mind. No fields are gated.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Office card */}
      <section className="bg-bg">
        <div className="container-content section">
          <div className="max-w-2xl mx-auto text-center">
            <div className="eyebrow mb-3">Office</div>
            <p className="font-body text-lg text-ink/85 leading-relaxed">
              Boise Marketing Guy<br />
              999 W Main St, Suite 100<br />
              Boise, ID 83702
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
