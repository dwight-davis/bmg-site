"use client";

export function ManageCookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("openCookiePreferences"))}
      className={className}
    >
      Cookie Preferences
    </button>
  );
}
