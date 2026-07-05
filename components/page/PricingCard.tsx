import { SchedulingButton } from "@/components/SchedulingButton";
import { TierPrice, formatPrice } from "@/lib/service-tier-prices";

// Pricing card for service-tier pages. Two states:
//   - Price known: big number + cadence + "Get started" CTA
//   - Price unknown: "Schedule a call to scope pricing" framing.
// Either way the design carries the offer; this is the close on tier pages.

export function PricingCard({
  price,
  tierTitle,
}: {
  price: TierPrice | null;
  tierTitle: string;
}) {
  return (
    <section className="bg-bg">
      <div className="container-content section">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-2 border-ink shadow-crisp p-10 md:p-14 text-center">
            {price ? (
              <>
                {price.starting_at ? (
                  <div className="font-body text-xs uppercase tracking-eyebrow text-ink/60 mb-3">
                    Starting at
                  </div>
                ) : null}
                <div className="font-display text-red leading-none"
                     style={{ fontSize: "clamp(3.5rem, 9vw, 6.5rem)" }}>
                  {formatPrice(price).amount}
                </div>
                <div className="font-body text-base uppercase tracking-eyebrow text-ink/70 mt-2">
                  {formatPrice(price).cadence}
                </div>
                {price.setup_fee ? (
                  <div className="font-body text-sm text-ink/60 mt-4">
                    + ${price.setup_fee} one-time setup
                  </div>
                ) : null}
                {price.note ? (
                  <p className="font-body text-sm text-ink/70 mt-4 max-w-md mx-auto">
                    {price.note}
                  </p>
                ) : null}
                <div className="mt-8">
                  <SchedulingButton className="btn-pill bg-red text-white shadow-crisp">
                    Get started
                  </SchedulingButton>
                </div>
                <p className="font-body text-xs text-ink/50 mt-6">
                  30-minute call to confirm fit. No commitment.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-display uppercase tracking-tight text-3xl md:text-4xl text-ink leading-none mb-4">
                  Let&apos;s scope this together.
                </h3>
                <p className="font-body text-lg text-ink/80 leading-relaxed max-w-md mx-auto">
                  {tierTitle} pricing depends on the size of your business and
                  what we&apos;re tackling. A 30-minute call gets you a clear
                  number.
                </p>
                <div className="mt-8">
                  <SchedulingButton className="btn-pill bg-red text-white shadow-crisp">
                    Schedule a call
                  </SchedulingButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
