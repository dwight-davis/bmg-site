"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

export function ThanksBookedTracker({ site }: { site: string }) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", "booking_confirmed", { site });
  }, [site]);
  return null;
}
