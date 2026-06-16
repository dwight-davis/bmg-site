import { NextRequest, NextResponse } from "next/server";

// Lead-magnet capture endpoint. Records the email + optional first name and
// returns the PDF URL. The frontend reveals the download link in-place on
// success.
//
// Persistence path (best-effort): forwards the lead to bmg-crm-api so it
// lands as a prospect row in BigQuery, enrolled with source =
// 'lead_magnet_5_steps'. If the CRM API is unreachable we still return
// success so the visitor isn't punished for backend hiccups, and we log
// the lead to stdout (Cloud Run logs capture it).

const CRM_API =
  process.env.BMG_CRM_API_URL ||
  "https://bmg-crm-api-580501752464.us-central1.run.app";
const TICK_SECRET = process.env.CRM_TICK_SECRET || "";

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

  // Stdout for log aggregation. Even if the downstream forward fails this
  // ensures the lead is recoverable from Cloud Run logs.
  console.log(JSON.stringify({
    type: "lead_magnet_subscribe",
    email,
    first_name: firstName || null,
    business_name: businessName || null,
    source: "lead_magnet_5_steps",
    received_at: new Date().toISOString(),
  }));

  // Best-effort forward to CRM API. Don't block the user if it fails.
  try {
    await fetch(`${CRM_API}/lead-magnet/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(TICK_SECRET ? { "X-Tick-Secret": TICK_SECRET } : {}),
      },
      body: JSON.stringify({
        email,
        first_name: firstName || null,
        business_name: businessName || null,
        source: "lead_magnet_5_steps",
      }),
      // Short timeout — don't make the visitor wait for the CRM if it's slow.
      signal: AbortSignal.timeout(3000),
    });
  } catch (e) {
    console.warn(`crm forward failed: ${(e as Error).message}`);
  }

  return NextResponse.json({
    ok: true,
    pdf_url: "/lead-magnets/transform-your-marketing.pdf",
  });
}
