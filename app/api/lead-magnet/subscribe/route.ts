import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lead-magnet capture endpoint. Records the email + optional first name and
// returns the PDF URL. The frontend reveals the download link in-place on
// success.
//
// Notification path: emails Dwight at dwight@cadrey.boisemarketingguy.com via
// Resend so he knows who downloaded the guide. Stdout log captures the lead
// even if the email fails. The previous BMG-CRM /lead-magnet/subscribe
// forward was removed 2026-06-28 as part of the BMG → Cadrey migration.

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "dwight@cadrey.boisemarketingguy.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Boise Marketing Guy <notifications@mail.boisemarketingguy.com>";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string; first_name?: string; business_name?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const firstName = (body.first_name || "").trim();
  const businessName = (body.business_name || "").trim();

  if (!email || !EMAIL_RX.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Stdout for log aggregation. Even if the downstream email fails this
  // ensures the lead is recoverable from Cloud Run logs.
  console.log(JSON.stringify({
    type: "lead_magnet_subscribe",
    email,
    first_name: firstName || null,
    business_name: businessName || null,
    source: "lead_magnet_5_steps",
    received_at: new Date().toISOString(),
  }));

  // Notify Dwight via Resend.
  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      const lines = [
        `From:     ${firstName ? firstName + " " : ""}<${email}>`,
        businessName ? `Business: ${businessName}` : null,
        `Source:   Lead magnet — Transform Your Marketing (5 steps)`,
        `Received: ${new Date().toISOString()}`,
      ].filter(Boolean).join("\n");
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: email,
        subject: `Lead magnet download: ${firstName || email}${businessName ? " — " + businessName : ""}`,
        text: lines,
      });
    } catch (e) {
      console.error("lead-magnet: resend send failed:", e);
    }
  } else {
    console.warn("lead-magnet: RESEND_API_KEY not set; lead logged but not emailed");
  }

  return NextResponse.json({
    ok: true,
    pdf_url: "/lead-magnets/transform-your-marketing.pdf",
  });
}
