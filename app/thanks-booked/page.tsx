import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "You're booked — Boise Marketing Guy",
  description:
    "Your strategy call is confirmed. Check your email for the calendar invite.",
  alternates: { canonical: "/thanks-booked/" },
  robots: { index: false, follow: false },
};

export default function ThanksBookedPage() {
  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-20 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">
            You&apos;re booked
          </div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl">
            See you on the <span className="accent">call.</span>
          </h1>
          <p className="font-serif italic text-white/85 mt-7 max-w-2xl mx-auto text-xl">
            You&apos;ll get a confirmation email with the calendar invite and
            the meeting link. If you don&apos;t see it in the next couple
            minutes, check spam.
          </p>
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-content py-16">
          <div className="bg-white border-2 border-ink shadow-crisp p-8 max-w-2xl mx-auto">
            <div className="font-display uppercase tracking-eyebrow text-xs text-red mb-3">
              What Happens Next
            </div>
            <ol className="font-body text-lg leading-relaxed text-ink space-y-4 list-decimal pl-6">
              <li>Calendar invite hits your inbox in the next few minutes.</li>
              <li>The night before, I look at your site, your Google profile, and your ads so we don&apos;t waste the call on setup.</li>
              <li>On the call: what&apos;s working, what isn&apos;t, and three concrete next moves. No pitch.</li>
            </ol>
          </div>

          <div className="mt-12 text-center">
            <p className="font-body text-base text-ink/80 max-w-xl mx-auto leading-relaxed">
              Need to reschedule? Use the link in the confirmation email, or reply and Maya will handle it.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/" className="btn-pill bg-ink text-white">
                Back to home
              </Link>
              <Link href="/blog/" className="btn-pill bg-transparent text-ink border-2 border-ink shadow-none">
                Read Field Notes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
