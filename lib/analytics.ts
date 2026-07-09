// GA4 measurement + typed event tracker for boisemarketingguy.com.
export const GA_MEASUREMENT_ID = "G-EQTX5D2YWR";

// Google Ads conversion account for boisemarketingguy.com.
export const GOOGLE_ADS_ID = "AW-16573408846";
export const ADS_BOOKING_CONVERSION_LABEL = "-VD1CKrA180cEM7M6N49";

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(action: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}

export function trackAdsConversion(label: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}` });
}
