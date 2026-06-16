import { CalendlyButton } from "./CalendlyButton";

// Thin red bar pinned above the nav. Adds chrome density that mirrors
// storybrand.com's "Get StoryBrand Certified — Next Training" bar.
// Copy is service-universal, not Boise-only — the brand is local but
// the offer is not.
export function AnnouncementBar() {
  return (
    <div className="relative z-40 bg-red text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-2 flex items-center justify-center gap-3 text-center">
        <span className="font-body text-xs sm:text-sm font-bold uppercase tracking-eyebrow">
          Free 30-minute strategy call. No commitment.
        </span>
        <CalendlyButton className="font-body text-xs sm:text-sm font-bold uppercase tracking-eyebrow underline underline-offset-4 hover:no-underline">
          Book yours →
        </CalendlyButton>
      </div>
    </div>
  );
}
