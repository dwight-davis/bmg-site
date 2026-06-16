"use client";

// Calendly inline popup CTA. Used everywhere a "Schedule an appointment"
// button appears so visitors stay on-page — clicking opens Calendly as a
// modal over the current view instead of navigating to a separate page or
// scrolling to an in-page section.
//
// On first interaction we lazy-load Calendly's widget.css/widget.js (no
// blocking load on first paint). Falls back to navigating to /schedule/
// if the widget script hasn't loaded yet for any reason.

import { useEffect, useRef } from "react";

const CALENDLY_URL =
  "https://calendly.com/davisdwight/30-minute-strategy-call";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

function ensureCalendlyLoaded() {
  if (typeof window === "undefined") return;
  if (!document.getElementById("calendly-css")) {
    const css = document.createElement("link");
    css.id = "calendly-css";
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);
  }
  if (!document.getElementById("calendly-script")) {
    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }
}

export function CalendlyButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  // Preload on mount so the widget is ready by the time anyone clicks.
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    // Defer one tick so we don't block the page becoming interactive.
    const id = window.setTimeout(ensureCalendlyLoaded, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <a
      href={CALENDLY_URL}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (window.Calendly?.initPopupWidget) {
          window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        } else {
          // Widget script hasn't loaded yet — send them to the
          // /schedule/ page which has an inline iframe embed as a
          // belt-and-suspenders fallback.
          window.location.href = "/schedule/";
        }
      }}
    >
      {children}
    </a>
  );
}
