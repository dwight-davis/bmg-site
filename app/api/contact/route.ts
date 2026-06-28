import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Contact-form endpoint. Validates input, then (a) logs the lead to stdout so
// it's recoverable from Cloud Run logs even if email fails, and (b) emails the
// submission to dwight@cadrey.boisemarketingguy.com via Resend.
// The previous BMG-CRM /contact/submit forward was removed 2026-06-28 as part
// of the BMG → Cadrey migration cleanup (no CRM call here anymore).

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "dwight@cadrey.boisemarketingguy.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Boise Marketing Guy <notifications@mail.boisemarketingguy.com>";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    business_name?: string;
    message?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const businessName = (body.business_name || "").trim();
  const message = (body.message || "").trim();

  if (!name) {
    return NextResponse.json({ ok: false, error: "name_required" }, { status: 400 });
  }
  if (!email || !EMAIL_RX.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ ok: false, error: "message_required" }, { status: 400 });
  }

  // Stdout snapshot — Cloud Run logs capture this so a lead survives even if
  // Resend is down.
  console.log(JSON.stringify({
    type: "contact_form_submit",
    name,
    email,
    business_name: businessName || null,
    message,
    source: "contact_form",
    received_at: new Date().toISOString(),
  }));

  // Email Dwight. Best-effort — if the send fails, the visitor still sees
  // success (the stdout log is the recovery path).
  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      const lines = [
        `From:     ${name} <${email}>`,
        businessName ? `Business: ${businessName}` : null,
        `Source:   Contact form (boisemarketingguy.com/contact)`,
        `Received: ${new Date().toISOString()}`,
        "",
        "Message:",
        message,
      ].filter(Boolean).join("\n");
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: email,
        subject: `Contact form: ${name}${businessName ? " — " + businessName : ""}`,
        text: lines,
      });
    } catch (e) {
      console.error("contact form: resend send failed:", e);
    }
  } else {
    console.warn("contact form: RESEND_API_KEY not set; lead logged but not emailed");
  }

  return NextResponse.json({ ok: true });
}
