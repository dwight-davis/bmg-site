import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ManageCookiePreferencesButton } from "@/components/ManageCookiePreferencesButton";

export const metadata = {
  title: "Do Not Sell or Share My Personal Information — Boise Marketing Guy",
  alternates: { canonical: "/do-not-sell/" },
};

const EFFECTIVE = "July 23, 2026";
const EMAIL = "dwight@boisemarketingguy.com";

export default function DoNotSellPage() {
  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-16 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">Your Privacy Choices</div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-4xl md:text-5xl">Do Not Sell or Share My Personal Information</h1>
          <p className="mt-4 font-body text-xs uppercase tracking-eyebrow text-paper/80">Effective {EFFECTIVE}</p>
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-column py-16 wp-body font-body text-base leading-relaxed text-ink/90">
          <p>Under the California Consumer Privacy Act as amended by the California Privacy Rights Act (collectively, &ldquo;CCPA&rdquo;), and under similar comprehensive privacy laws in Colorado, Connecticut, Utah, Virginia, Texas, Oregon, and other states, you have the right to direct businesses to stop selling or sharing your personal information with third parties for cross-context behavioral advertising.</p>

          <h2>What This Right Covers</h2>
          <p>Boise Marketing Guy does not sell your personal information for money. When you have granted Marketing consent, we may share limited identifiers such as hashed email addresses and cookie identifiers with advertising and measurement platforms. Under California&rsquo;s expanded statutory definitions, that sharing may qualify as a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; even though no money changes hands. This page lets you turn that off.</p>

          <h2>Turn It Off Right Now</h2>
          <p>The simplest way to opt out is to reject Marketing cookies in the preferences panel. That immediately turns off the third-party sharing described above.</p>
          <p><ManageCookiePreferencesButton className="btn-pill bg-red text-white shadow-crisp-sm text-xs px-5 py-3" /></p>
          <p>We also honor the Global Privacy Control browser signal. If you have Global Privacy Control turned on in your browser, we treat that as an opt-out request without any further action needed from you.</p>

          <h2>Written Requests</h2>
          <p>You can also submit an opt-out request by email to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with the subject &ldquo;Do Not Sell or Share.&rdquo; Include the email address you have used to interact with us so we can verify your identity. We confirm receipt within 10 business days and process within 15 business days of confirmation.</p>
          <p>You can designate an authorized agent to make this request for you. The agent must provide signed written permission from you and confirm their identity.</p>

          <h2>Other Privacy Rights</h2>
          <p>Beyond opt-out of sale and sharing, you have additional rights including access, correction, deletion, and portability. Those rights are described in our <Link href="/privacy/">Privacy Policy</Link>. Submit any privacy request to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>

          <h2>Contact</h2>
          <p>Questions about your privacy choices: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
