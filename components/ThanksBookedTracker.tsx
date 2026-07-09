"use client";

import { useEffect } from "react";
import { trackEvent, trackAdsConversion, ADS_BOOKING_CONVERSION_LABEL } from "@/lib/analytics";

export function ThanksBookedTracker({ site }: { site: string }) {
  useEffect(() => {
    trackEvent("booking_confirmed", { site });
    trackAdsConversion(ADS_BOOKING_CONVERSION_LABEL);
  }, [site]);
  return null;
}
