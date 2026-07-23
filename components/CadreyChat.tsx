"use client";

import { useEffect } from "react";
import { readConsent, isOptInJurisdiction } from "@/lib/consent";

const CADREY_KEY = "f28181a59ff64e64a0e1ff14014edb29";

export function CadreyChat() {
  useEffect(() => {
    function loadIfAllowed() {
      const state = readConsent();
      const optIn = isOptInJurisdiction();
      const allowed = state ? state.marketing === true : !optIn;
      if (!allowed) return;
      if (document.querySelector('script[data-cadrey-loaded="1"]')) return;
      const s = document.createElement("script");
      s.src = "https://app.cadrey.ai/widget.js";
      s.async = true;
      s.setAttribute("data-cadrey-key", CADREY_KEY);
      s.setAttribute("data-cadrey-loaded", "1");
      document.head.appendChild(s);
    }
    loadIfAllowed();
    window.addEventListener("consent:change", loadIfAllowed);
    return () => window.removeEventListener("consent:change", loadIfAllowed);
  }, []);
  return null;
}
