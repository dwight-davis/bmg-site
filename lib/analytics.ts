// GA4 measurement + typed event tracker for boisemarketingguy.com.
export const GA_MEASUREMENT_ID = "G-EQTX5D2YWR";

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
