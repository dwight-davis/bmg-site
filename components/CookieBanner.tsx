"use client";

import { useEffect, useState, useCallback } from "react";
import { readConsent, writeConsent } from "@/lib/consent";

interface Choices {
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_CHOICES: Choices = { analytics: true, marketing: true };

export function CookieBanner() {
  const [phase, setPhase] = useState<"hidden" | "banner" | "preferences">("hidden");
  const [choices, setChoices] = useState<Choices>(DEFAULT_CHOICES);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setPhase("banner");
    else setChoices({ analytics: existing.analytics, marketing: existing.marketing });
  }, []);

  useEffect(() => {
    const openHandler = () => {
      const existing = readConsent();
      if (existing) setChoices({ analytics: existing.analytics, marketing: existing.marketing });
      setPhase("preferences");
    };
    window.addEventListener("openCookiePreferences", openHandler);
    return () => window.removeEventListener("openCookiePreferences", openHandler);
  }, []);

  const acceptAll = useCallback(() => {
    writeConsent(true, true);
    setChoices({ analytics: true, marketing: true });
    setPhase("hidden");
  }, []);

  const rejectAll = useCallback(() => {
    writeConsent(false, false);
    setChoices({ analytics: false, marketing: false });
    setPhase("hidden");
  }, []);

  const savePreferences = useCallback(() => {
    writeConsent(choices.analytics, choices.marketing);
    setPhase("hidden");
  }, [choices]);

  if (phase === "hidden") return null;

  if (phase === "banner") {
    return (
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent"
        className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-ink bg-white text-ink shadow-crisp"
      >
        <div className="container-content py-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 font-body text-sm leading-relaxed">
            <p>
              We use cookies to run this site, understand how it&rsquo;s used, and support advertising. Necessary cookies are always on. You can accept everything, reject everything, or manage which categories run.
            </p>
            <p className="mt-2 text-ink/70">
              See our{" "}
              <a href="/privacy/" className="underline hover:text-red">Privacy Policy</a>{" "}and{" "}
              <a href="/cookie-policy/" className="underline hover:text-red">Cookie Policy</a>.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button type="button" onClick={rejectAll} className="btn-pill bg-transparent text-ink border-2 border-ink shadow-none text-xs px-4 py-2">
              Reject All
            </button>
            <button type="button" onClick={() => setPhase("preferences")} className="btn-pill bg-transparent text-ink border-2 border-ink shadow-none text-xs px-4 py-2">
              Manage
            </button>
            <button type="button" onClick={acceptAll} className="btn-pill bg-red text-white shadow-crisp-sm text-xs px-4 py-2">
              Accept All
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    >
      <div className="w-full max-w-lg bg-white text-ink border-2 border-ink shadow-crisp max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-ink/15">
          <h2 className="font-display uppercase text-2xl">Cookie Preferences</h2>
          <p className="mt-2 font-body text-sm text-ink/70">
            Choose which categories of cookies run on this site. You can update this from the &ldquo;Cookie Preferences&rdquo; link in the footer.
          </p>
        </div>
        <div className="p-6 space-y-5">
          <PreferenceRow label="Necessary" description="Required for the site to function, keep you signed in during a session, and remember your cookie choices. Always on." checked disabled />
          <PreferenceRow label="Analytics" description="Aggregate usage measurement so we can improve the site. Google Analytics 4. No advertising identifiers." checked={choices.analytics} onChange={(v) => setChoices((c) => ({ ...c, analytics: v }))} />
          <PreferenceRow label="Marketing" description="Advertising measurement and third-party tools that support the site experience, including the on-page chat widget." checked={choices.marketing} onChange={(v) => setChoices((c) => ({ ...c, marketing: v }))} />
        </div>
        <div className="p-6 border-t border-ink/15 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={rejectAll} className="btn-pill bg-transparent text-ink border-2 border-ink shadow-none text-xs px-4 py-2">
            Reject All
          </button>
          <button type="button" onClick={acceptAll} className="btn-pill bg-transparent text-ink border-2 border-ink shadow-none text-xs px-4 py-2">
            Accept All
          </button>
          <button type="button" onClick={savePreferences} className="btn-pill bg-red text-white shadow-crisp-sm text-xs px-4 py-2">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function PreferenceRow({ label, description, checked, disabled, onChange }: { label: string; description: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <label className={`block ${disabled ? "opacity-70" : ""}`}>
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} className="mt-1 h-4 w-4 accent-red" aria-label={`${label} cookies`} />
        <div className="flex-1">
          <div className="font-body text-sm font-bold uppercase tracking-eyebrow text-ink">{label}</div>
          <p className="mt-1 text-[13px] text-ink/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </label>
  );
}
