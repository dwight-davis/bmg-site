// Standalone GA4 property for boisemarketingguy.com. Owned under
// dwight@dwightdavisconsulting.com. No consolidated Google Tag / fan-out.
export const GA_MEASUREMENT_ID = "G-RKZJBWG0XP";

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

// Safe wrapper. Drops the event silently if gtag isn't loaded yet.
export function trackEvent(action: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}
