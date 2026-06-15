import type { Config } from "tailwindcss";

// Brand tokens extracted from a careful audit of storybrand.com's
// homepage HTML + CSS. Pill buttons, hard-offset drop shadows, all-caps
// display headlines in Anton (open analog to Adobe's dharma-gothic-e),
// Montserrat body. The color is StoryBrand red because it works for a
// Boise-marketer voice that is direct and urgent — not because we are
// imitating them. Dwight signed off on red 2026-06-15.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: "#e01f26" },
        ink: { DEFAULT: "#151515" },
        navy: { DEFAULT: "#000028" },
        paper: { DEFAULT: "#b4a269" },
        bg: { DEFAULT: "#ffffff", muted: "#f7f7f5" },
      },
      fontFamily: {
        display: ["Anton", "Impact", "Helvetica Inserat", "system-ui", "sans-serif"],
        body: ['"Montserrat"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Source Serif 4"', "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        content: "960px",
        column: "660px",
      },
      boxShadow: {
        // Signature SB hard offset, no blur. Used on primary CTAs.
        crisp: "6px 6px 0 0 rgba(0,0,0,1)",
        "crisp-sm": "4px 4px 0 0 rgba(0,0,0,1)",
      },
      borderRadius: {
        pill: "9999px",
      },
      letterSpacing: {
        tight: "-0.01em",
        eyebrow: "0.14em",
      },
    },
  },
  plugins: [],
};
export default config;
