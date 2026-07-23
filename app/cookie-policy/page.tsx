import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ManageCookiePreferencesButton } from "@/components/ManageCookiePreferencesButton";

export const metadata = {
  title: "Cookie Policy — Boise Marketing Guy",
  alternates: { canonical: "/cookie-policy/" },
};

const EFFECTIVE = "July 23, 2026";
const EMAIL = "dwight@boisemarketingguy.com";

export default function CookiePolicyPage() {
  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-16 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">Legal</div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl">Cookie Policy</h1>
          <p className="mt-4 font-body text-xs uppercase tracking-eyebrow text-paper/80">Effective {EFFECTIVE}</p>
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-column py-16 wp-body font-body text-base leading-relaxed text-ink/90">
          <p>This Cookie Policy describes the cookies and similar technologies we use on boisemarketingguy.com (the &ldquo;Site&rdquo;), why we use them, and how you can control them. It supplements our <Link href="/privacy/">Privacy Policy</Link>.</p>

          <h2>What Cookies Are</h2>
          <p>Cookies are small text files a website stores on your device when you visit. They let the site recognize your device on future visits, remember settings, and measure how the site is used. &ldquo;Similar technologies&rdquo; include pixels, tags, web beacons, and local storage entries that perform equivalent functions.</p>
          <p>First-party cookies are set by the site you are visiting. Third-party cookies are set by a service embedded in the site. Both are governed by this Policy.</p>

          <h2>How You Control Cookies</h2>
          <p>Three categories run on this Site:</p>
          <ul>
            <li><strong>Necessary.</strong> Always on. Keep the Site functional and remember your cookie choice.</li>
            <li><strong>Analytics.</strong> Aggregate usage measurement. No advertising identifiers.</li>
            <li><strong>Marketing.</strong> Third-party embedded tools including the on-page chat widget.</li>
          </ul>
          <p>For visitors in the European Economic Area, the United Kingdom, Switzerland, or where a Global Privacy Control signal is present, Analytics and Marketing cookies are off by default and only run after affirmative opt in. For visitors elsewhere, including the United States, they run under an opt-out model and can be turned off any time.</p>
          <p><ManageCookiePreferencesButton className="text-accent font-bold uppercase tracking-eyebrow text-xs underline" /></p>
          <p>You can also block or delete cookies through your browser settings: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>, <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Firefox</a>, <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>, <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a>. Blocking all cookies limits parts of the Site.</p>

          <h2>Cookies We Use</h2>
          <h3>Necessary</h3>
          <ul>
            <li><strong><code>bmg_consent</code></strong> (Boise Marketing Guy, first-party). Stores your cookie preferences. Lifetime: 12 months.</li>
          </ul>
          <h3>Analytics</h3>
          <ul>
            <li><strong><code>_ga</code></strong> (Google Analytics 4, third-party). Distinguishes unique visitors. Lifetime: 24 months.</li>
            <li><strong><code>_ga_RKZJBWG0XP</code></strong> (Google Analytics 4, third-party). Property-specific identifier. Lifetime: 24 months.</li>
          </ul>
          <h3>Marketing</h3>
          <ul>
            <li><strong>Cadrey chat cookies</strong> (Cadrey AI, third-party). Set when the on-page chat loads. Lifetime: session to 12 months depending on functionality.</li>
            <li><strong>OneCal cookies</strong> (OneCal, third-party). Set only if you open the OneCal booking iframe. Lifetime: session to 12 months.</li>
          </ul>

          <h2>Third-Party Recipients</h2>
          <ul>
            <li>Google LLC (Google Analytics 4, Google Cloud). <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
            <li>Cadrey AI, Inc. (chat widget).</li>
            <li>OneCal (scheduling). <a href="https://onecal.io/privacy" target="_blank" rel="noopener noreferrer">OneCal Privacy Policy</a>.</li>
            <li>Cloudflare, Inc. (DNS). <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare Privacy Policy</a>.</li>
          </ul>

          <h2>Do Not Track</h2>
          <p>We do not currently respond to Do Not Track browser signals because no consistent industry standard has emerged. We do honor the Global Privacy Control signal as an opt-out under state privacy laws that recognize it.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Cookie Policy as tags change or laws evolve. Material changes will update the &ldquo;Effective&rdquo; date and, where required, a notice on the Site.</p>

          <h2>Contact</h2>
          <p>Questions: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
