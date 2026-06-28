import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import {
  renderWelcomeHtml,
  renderWelcomeText,
  renderNotificationText,
} from "@/lib/purchase-emails";

// Stripe webhook receiver for self-serve checkout.
//
// On `checkout.session.completed`:
//   1) Send the buyer a transactional welcome email with a "Book your kickoff"
//      CTA (Resend).
//   2) Send Dwight a notification email at dwight@cadrey.boisemarketingguy.com
//      with the purchase details.
//
// Replaces the BMG-CRM /stripe/webhook handler (BMG-CRM is being retired).
// Does NOT write to BigQuery, does NOT touch the drip, does NOT manage
// onboarding_status. The whole point is the site is self-sufficient.
//
// Signature verification: tries LIVE secret first, then TEST. Whichever
// validates, that's the source of the event. This lets Stripe-CLI test
// events work without a separate config flag.
//
// Idempotency: relies on Stripe's at-least-once delivery + the
// fast-and-stateless nature of this handler. A duplicate event would mean
// a duplicate welcome — rare, low-risk. Once we get billing volume worth
// guarding, store event IDs in a tiny key-value store and dedupe.

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const STRIPE_WEBHOOK_SECRET_TEST = process.env.STRIPE_WEBHOOK_SECRET_TEST || "";
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";

const NOTIFY_EMAIL =
  process.env.NOTIFY_EMAIL || "dwight@cadrey.boisemarketingguy.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "Boise Marketing Guy <notifications@mail.boisemarketingguy.com>";
const ONBOARDING_CALENDLY_URL =
  process.env.ONBOARDING_CALENDLY_URL ||
  "https://calendly.com/davisdwight/30-minute-strategy-call";
const BILLING_PORTAL_URL =
  process.env.BMG_BILLING_PORTAL_URL ||
  "https://billing.stripe.com/p/login/4gM14o0jg1Sn6Ip5yMfQI00";

// Stripe SDK only used to constructEvent (signature verify) and to fetch
// line items for the product name. If STRIPE_API_KEY is missing we skip the
// line-item lookup and fall back to "your purchase".
const stripe = STRIPE_API_KEY
  ? new Stripe(STRIPE_API_KEY)
  : new Stripe("sk_unused_for_webhook_only");

export async function POST(req: NextRequest) {
  // Stripe needs the RAW request body for HMAC verification.
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  const secretCandidates: Array<[string, "live" | "test"]> = [
    [STRIPE_WEBHOOK_SECRET, "live"],
    [STRIPE_WEBHOOK_SECRET_TEST, "test"],
  ];
  let event: Stripe.Event | null = null;
  let mode: "live" | "test" = "live";
  for (const [secret, m] of secretCandidates) {
    if (!secret) continue;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, secret);
      mode = m;
      break;
    } catch {
      // try the next secret
    }
  }
  if (!event) {
    console.warn(JSON.stringify({
      type: "stripe_webhook_unverified",
      reason: "no_valid_signature",
      have_live_secret: !!STRIPE_WEBHOOK_SECRET,
      have_test_secret: !!STRIPE_WEBHOOK_SECRET_TEST,
    }));
    return NextResponse.json(
      { ok: false, error: "signature_verification_failed" },
      { status: 400 }
    );
  }

  // We only react to checkout.session.completed. Other events get a 200 so
  // Stripe doesn't retry — they were sent successfully, we just don't do
  // anything with them.
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email =
    session.customer_details?.email || session.customer_email || "";
  const name = session.customer_details?.name || "";
  const sessionId = session.id;
  const amountTotal = session.amount_total ?? 0;
  const currency = (session.currency || "usd").toLowerCase();
  const amountStr = amountTotal > 0 ? formatMoney(amountTotal, currency) : "";

  if (!email) {
    console.error(JSON.stringify({
      type: "stripe_webhook_no_email",
      session_id: sessionId,
    }));
    // Still return 200 — there's nothing useful we can do; Stripe shouldn't
    // retry forever.
    return NextResponse.json({ ok: true, warning: "no_customer_email" });
  }

  // Pull line items for a real product name when possible.
  let productName: string | null = null;
  if (STRIPE_API_KEY) {
    try {
      const items = await stripe.checkout.sessions.listLineItems(sessionId, {
        limit: 5,
      });
      const names = items.data
        .map((li) => li.description || (li.price?.product as string) || "")
        .filter(Boolean);
      if (names.length === 1) productName = names[0];
      else if (names.length > 1) productName = names.join(" + ");
    } catch (e) {
      console.warn("stripe webhook: line item lookup failed:", e);
    }
  }

  const greeting = greetingName(name, email);

  // Stdout snapshot — Cloud Run logs capture this so the purchase is
  // recoverable even if the email fails.
  console.log(JSON.stringify({
    type: "stripe_checkout_completed",
    mode,
    session_id: sessionId,
    customer_email: email,
    customer_name: name,
    product_name: productName,
    amount: amountStr,
    received_at: new Date().toISOString(),
  }));

  if (!RESEND_API_KEY) {
    console.warn("stripe webhook: RESEND_API_KEY not set; purchase logged but no emails sent");
    return NextResponse.json({ ok: true, warning: "no_resend_key" });
  }

  const resend = new Resend(RESEND_API_KEY);

  // 1) Welcome the buyer.
  const welcomeHtml = renderWelcomeHtml({
    greeting,
    productName,
    amountStr,
    calendlyUrl: ONBOARDING_CALENDLY_URL,
    billingPortalUrl: BILLING_PORTAL_URL,
  });
  const welcomeText = renderWelcomeText({
    greeting,
    productName,
    amountStr,
    calendlyUrl: ONBOARDING_CALENDLY_URL,
    billingPortalUrl: BILLING_PORTAL_URL,
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: NOTIFY_EMAIL,
      subject: "Welcome aboard. Let's get your kickoff scheduled.",
      html: welcomeHtml,
      text: welcomeText,
    });
  } catch (e) {
    console.error("stripe webhook: customer welcome send failed:", e);
    // Don't fail the webhook — we still want Dwight notified below.
  }

  // 2) Notify Dwight.
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      replyTo: email,
      subject: `BMG purchase: ${name || email}${productName ? " — " + productName : ""}${mode === "test" ? " (TEST)" : ""}`,
      text: renderNotificationText({
        customerName: name,
        customerEmail: email,
        productName,
        amountStr,
        stripeSessionId: sessionId,
        mode,
        occurredAt: new Date().toISOString(),
      }),
    });
  } catch (e) {
    console.error("stripe webhook: Dwight notification send failed:", e);
  }

  return NextResponse.json({ ok: true });
}

function formatMoney(amountInCents: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountInCents / 100);
  } catch {
    return `${(amountInCents / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

function greetingName(name: string, email: string): string {
  const trimmed = (name || "").trim();
  if (trimmed) {
    const first = trimmed.split(/\s+/)[0];
    if (first) return first;
  }
  return email.split("@")[0];
}
