import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ManageCookiePreferencesButton } from "@/components/ManageCookiePreferencesButton";

export const metadata = {
  title: "Privacy Policy — Boise Marketing Guy",
  alternates: { canonical: "/privacy/" },
};

const EFFECTIVE = "July 23, 2026";
const EMAIL = "dwight@boisemarketingguy.com";
const SITE_URL = "boisemarketingguy.com";
const BRAND = "Boise Marketing Guy";

export default function PrivacyPage() {
  return (
    <>
      <AnnouncementBar />
      <section className="relative bg-navy text-white">
        <Nav />
        <div className="container-content pt-28 pb-16 text-center">
          <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-4">Legal</div>
          <h1 className="font-display uppercase tracking-tight leading-[0.95] text-5xl md:text-6xl">Privacy Policy</h1>
          <p className="mt-4 font-body text-xs uppercase tracking-eyebrow text-paper/80">Effective {EFFECTIVE}</p>
        </div>
      </section>

      <section className="bg-bg">
        <div className="container-column py-16 wp-body font-body text-base leading-relaxed text-ink/90">
          <p>This Privacy Policy explains how {BRAND} (&ldquo;{BRAND},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and protects information about visitors to and users of {SITE_URL} (the &ldquo;Site&rdquo;). It also describes your choices about how we handle your information and the rights you have under U.S. state privacy laws, the European Union&rsquo;s General Data Protection Regulation (GDPR), and the United Kingdom&rsquo;s data protection framework.</p>
          <p>By using the Site, you acknowledge you have read this Policy. If you do not agree with our practices, do not use the Site.</p>

          <h2>Who We Are</h2>
          <p>{BRAND} is a small-business marketing consulting practice. For any privacy question, request, or complaint, contact us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We are the &ldquo;data controller&rdquo; under GDPR and the &ldquo;business&rdquo; that collects your information under California terminology.</p>

          <h2>Information We Collect</h2>
          <h3>Information you provide directly</h3>
          <ul>
            <li><strong>Identifiers and contact details.</strong> Your name, email address, phone number, business name, business website, and any information you include when you submit a form, schedule a call, or email us.</li>
            <li><strong>Content of communications.</strong> The substance of messages you send us, notes we make during calls or engagements, and any files you share.</li>
            <li><strong>Payment and billing details.</strong> If you become a client, we may collect billing address, tax identifier, and payment method details. Payment processing is handled by third-party processors; we do not store full card numbers on our own systems.</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li><strong>Device and connection data.</strong> IP address, browser type and version, operating system, referring URL, pages viewed, time and duration of visits, links clicked, and general geographic location inferred from IP.</li>
            <li><strong>Cookie and similar technology data.</strong> See the <Link href="/cookie-policy/">Cookie Policy</Link> for a full list of cookies used on the Site.</li>
            <li><strong>Analytics and advertising measurement.</strong> When you have granted the corresponding consent, aggregate signals are transmitted to Google Analytics 4 for measurement.</li>
            <li><strong>Chat interactions.</strong> If you use the on-page chat widget, the widget provider processes the content of the conversation and metadata about it.</li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>To respond to your inquiries, schedule meetings, and provide the services you request.</li>
            <li>To operate, maintain, secure, and improve the Site and our services.</li>
            <li>To measure Site performance using consented analytics.</li>
            <li>To send you information related to a conversation you started or that you have opted into.</li>
            <li>To detect, investigate, and prevent fraud and security incidents.</li>
            <li>To comply with legal, tax, accounting, and regulatory obligations.</li>
          </ul>

          <h2>Legal Basis (EEA and UK)</h2>
          <p>If you are in the European Economic Area or United Kingdom, we process your personal data on the following legal bases: <strong>consent</strong> (non-essential cookies and marketing communications you opted into), <strong>contractual necessity</strong> (to provide services you requested), <strong>legitimate interests</strong> (operating and securing the Site), and <strong>legal obligation</strong>.</p>

          <h2>How We Share Information</h2>
          <ul>
            <li><strong>Service providers.</strong> Vendors that operate infrastructure and tools on our behalf, listed below.</li>
            <li><strong>Professional advisors.</strong> Lawyers, accountants, insurers, and auditors when necessary.</li>
            <li><strong>Legal and safety.</strong> When required by subpoena, court order, or applicable law, or to enforce our rights.</li>
            <li><strong>Business transfers.</strong> In connection with a merger, acquisition, or asset sale, subject to the same privacy commitments.</li>
            <li><strong>With your direction.</strong> When you ask us to share your information.</li>
          </ul>
          <p>We do <strong>not</strong> sell personal information for money. When you have granted Marketing consent, limited identifiers may be shared with advertising platforms for measurement. Under California&rsquo;s expanded &ldquo;sale&rdquo; and &ldquo;sharing&rdquo; definitions, those disclosures may qualify as such; opt out on our <Link href="/do-not-sell/">Do Not Sell or Share My Personal Information</Link> page.</p>

          <h2>Third-Party Services</h2>
          <ul>
            <li><strong>Google Analytics 4 (Google LLC).</strong> Aggregate site analytics.</li>
            <li><strong>Google Cloud Platform (Google LLC).</strong> Hosting via Cloud Run.</li>
            <li><strong>Cloudflare, Inc.</strong> DNS resolution.</li>
            <li><strong>Cadrey (Cadrey AI, Inc.).</strong> On-page chat widget.</li>
            <li><strong>OneCal.</strong> Consultation booking.</li>
          </ul>

          <h2>Cookies</h2>
          <p>We use cookies and similar technologies (pixels, local storage). A full description is on our <Link href="/cookie-policy/">Cookie Policy</Link>. Necessary cookies are always on. For visitors in the European Economic Area, the United Kingdom, Switzerland, or where a Global Privacy Control signal is present, Analytics and Marketing cookies are off by default and only run after you affirmatively opt in. For visitors elsewhere, including the United States, Analytics and Marketing cookies run under an opt-out model.</p>
          <p><ManageCookiePreferencesButton className="text-accent font-bold uppercase tracking-eyebrow text-xs underline" /></p>

          <h2>Data Retention</h2>
          <ul>
            <li>Inquiry records: up to 24 months from last contact.</li>
            <li>Client records: for the duration of the engagement plus 7 years for tax, accounting, and legal compliance.</li>
            <li>Analytics data: Google Analytics 4 configured with 14-month event retention.</li>
            <li>Server and security logs: up to 90 days.</li>
          </ul>

          <h2>Data Security</h2>
          <p>We use administrative, technical, and physical safeguards. Traffic to and from the Site is encrypted with TLS. Access to backend systems is restricted and logged. No system is perfectly secure, but we take practical steps to make an incident unlikely and to contain it quickly.</p>

          <h2>Your Rights</h2>
          <ul>
            <li><strong>Right to know or access</strong> the personal information we hold about you and its uses.</li>
            <li><strong>Right to correct</strong> inaccurate information.</li>
            <li><strong>Right to delete</strong> personal information, subject to legal exceptions.</li>
            <li><strong>Right to portability</strong> of your information in machine-readable format.</li>
            <li><strong>Right to opt out of sale or sharing</strong> via the <Link href="/do-not-sell/">Do Not Sell or Share</Link> page or by rejecting Marketing cookies.</li>
            <li><strong>Right to non-discrimination</strong> for exercising these rights.</li>
            <li><strong>Right to withdraw consent</strong> at any time.</li>
            <li><strong>Right to lodge a complaint</strong> with your applicable data protection authority.</li>
          </ul>
          <p>Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with the subject &ldquo;Privacy Request.&rdquo; We verify identity before responding. Standard timeline is 45 days; complex requests may take up to 90 days.</p>

          <h2>Notice to California Residents</h2>
          <p>Under the California Consumer Privacy Act as amended by the California Privacy Rights Act (&ldquo;CCPA&rdquo;), you have the rights above. In the last 12 months we have collected identifiers, commercial information, internet activity, geolocation (from IP), and audio or electronic information (chat transcripts and voicemails). We do not collect biometric information, precise geolocation, government identifiers, or protected classification characteristics.</p>

          <h2>Notice to Other U.S. State Residents</h2>
          <p>Residents of Colorado, Connecticut, Utah, Virginia, Texas, Oregon, and other states with comprehensive privacy laws have similar rights. Use the same email address for requests.</p>

          <h2>Notice to EEA and UK Residents</h2>
          <p>You have the rights described above under GDPR and equivalent UK law. You may withdraw consent at any time without affecting the lawfulness of prior processing. You may lodge a complaint with your local supervisory authority. When information is transferred to service providers in the United States, we rely on Standard Contractual Clauses or, where applicable, the EU-U.S. Data Privacy Framework and its UK and Swiss extensions.</p>

          <h2>Children</h2>
          <p>The Site is not directed to children under 16, and we do not knowingly collect personal information from them. If you believe your child has provided personal information, contact <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will delete it.</p>

          <h2>Do Not Track</h2>
          <p>We do not currently respond to Do Not Track signals because no consistent standard has emerged. You can still control tracking through our cookie banner, the <Link href="/do-not-sell/">Do Not Sell or Share</Link> page, and your browser settings. We do honor Global Privacy Control as an opt-out signal.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Policy from time to time. The &ldquo;Effective&rdquo; date at the top will change. Material changes will be highlighted on the Site for at least 30 days.</p>

          <h2>Contact</h2>
          <p>Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. See also our <Link href="/cookie-policy/">Cookie Policy</Link>, <Link href="/do-not-sell/">Do Not Sell or Share</Link>, <Link href="/terms/">Terms</Link>, and <Link href="/accessibility/">Accessibility</Link>.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
