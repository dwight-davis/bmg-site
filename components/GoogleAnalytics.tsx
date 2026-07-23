import Script from "next/script";
import { defaultConsentSnippet } from "@/lib/consent";

// Standalone GA4 tag with Google Consent Mode v2. An inline <script> in the
// beforeInteractive slot pushes 'consent default' into dataLayer BEFORE gtag
// loads, so nothing tracks until either a stored consent cookie is decoded
// (upgraded from default) or the visitor opts in via the banner. Geo-aware:
// EEA/UK/Swiss/GPC visitors get denied-by-default, US visitors granted.
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null;
  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {defaultConsentSnippet()}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`gtag('js', new Date());
gtag('config', '${measurementId}', { send_page_view: false });`}
      </Script>
    </>
  );
}
