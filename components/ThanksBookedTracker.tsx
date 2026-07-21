"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Fires booking_confirmed on /thanks-booked/ load. transaction_id keeps
// GA4 from double-counting on refresh; site tag lets us slice reports by
// domain if the property is ever shared.
export function ThanksBookedTracker() {
  useEffect(() => {
    const txId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    trackEvent("booking_confirmed", { site: "bmg", transaction_id: txId });
  }, []);
  return null;
}
