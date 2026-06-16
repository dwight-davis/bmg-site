import { NextRequest, NextResponse } from "next/server";

// Contact-form endpoint. Same shape as the lead-magnet handler — log to
// stdout (Cloud Run captures), best-effort forward to bmg-crm-api so it
// lands as a prospect with source = 'contact_form', return success.

const CRM_API =
  process.env.BMG_CRM_API_URL ||
  "https://bmg-crm-api-580501752464.us-central1.run.app";
const TICK_SECRET = process.env.CRM_TICK_SECRET || "";

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

  console.log(JSON.stringify({
    type: "contact_form_submit",
    name,
    email,
    business_name: businessName || null,
    message,
    source: "contact_form",
    received_at: new Date().toISOString(),
  }));

  try {
    await fetch(`${CRM_API}/contact/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(TICK_SECRET ? { "X-Tick-Secret": TICK_SECRET } : {}),
      },
      body: JSON.stringify({
        name,
        email,
        business_name: businessName || null,
        message,
        source: "contact_form",
      }),
      signal: AbortSignal.timeout(3000),
    });
  } catch (e) {
    console.warn(`crm forward failed: ${(e as Error).message}`);
  }

  return NextResponse.json({ ok: true });
}
