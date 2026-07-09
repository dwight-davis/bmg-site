"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ThanksBookedTracker({ site }: { site: string }) {
  useEffect(() => {
    trackEvent("booking_confirmed", { site });
  }, [site]);
  return null;
}
