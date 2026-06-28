// Email render functions for the post-purchase flow. Two emails:
//   1) Customer welcome — transactional, warm, single CTA to book onboarding
//   2) Dwight notification — terse, just the facts of who/what/how-much
//
// Voice rules (per BMG): no em-dashes, plainspoken, single CTA, slight
// imperfection. Lifted from BMG-CRM's purchase_welcome.py with phone +
// signature updated to the post-migration values.

const PHONE_DISPLAY = "(208) 992-3986";
const PHONE_HREF = "tel:+12089923986";
const BMG_NAME = "Boise Marketing Guy";
const SIGNATURE_NAME = "Dwight Davis";

export type WelcomeArgs = {
  greeting: string;
  productName: string | null;
  amountStr: string; // e.g. "$1,500.00" or "" when no amount available
  calendlyUrl: string;
  billingPortalUrl: string;
};

export function renderWelcomeHtml(a: WelcomeArgs): string {
  const productLine = a.productName
    ? `<p style="margin:0 0 16px 0; color:#555; font-size:15px;">
You signed up for <strong>${escapeHtml(a.productName)}</strong>${a.amountStr ? ` (${a.amountStr})` : ""}.
Thank you. I do not take that lightly.
</p>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Welcome aboard</title>
</head>
<body style="margin:0; padding:0; background:#f6f6f4; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#222;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f6f4; padding:32px 16px;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px; background:#ffffff; border:1px solid #e5e5e2; border-radius:8px; padding:32px;">
<tr><td>

<p style="margin:0 0 24px 0; font-size:16px;">Hi ${escapeHtml(a.greeting)},</p>

<p style="margin:0 0 16px 0; font-size:16px;">
Welcome aboard. Your purchase came through.
</p>

${productLine}

<p style="margin:0 0 16px 0; font-size:16px;">
Here is what happens next:
</p>

<ol style="margin:0 0 24px 20px; padding:0; font-size:15px; color:#333;">
  <li style="margin-bottom:10px;">Pick a kickoff slot using the button below. Thirty minutes, on Zoom, recorded.</li>
  <li style="margin-bottom:10px;">Before we meet, I will look at your site and pull a short read on where you stand.</li>
  <li style="margin-bottom:10px;">On the call we walk through what I found, agree on the first move, and you leave knowing exactly what is happening.</li>
</ol>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px auto;">
<tr><td align="center" bgcolor="#1e40af" style="border-radius:6px;">
<a href="${a.calendlyUrl}" target="_blank" style="display:inline-block; padding:14px 28px; color:#ffffff; text-decoration:none; font-weight:600; font-size:16px;">Book your kickoff</a>
</td></tr>
</table>

<p style="margin:0 0 16px 0; font-size:15px; color:#555;">
If none of those slots work, just reply to this email with two or three times that do and I will hold one.
</p>

<p style="margin:0 0 8px 0; font-size:15px;">Talk soon,</p>
<p style="margin:0 0 4px 0; font-size:15px;"><strong>${SIGNATURE_NAME}</strong></p>
<p style="margin:0 0 24px 0; font-size:14px; color:#777;">${BMG_NAME}<br>
<a href="${PHONE_HREF}" style="color:#777; text-decoration:none;">${PHONE_DISPLAY}</a></p>

<hr style="border:0; border-top:1px solid #eee; margin:0 0 16px 0;">
<p style="margin:0 0 8px 0; font-size:12px; color:#999;">
Manage your subscription, update payment, or download invoices anytime:
<a href="${a.billingPortalUrl}" style="color:#777;">customer billing portal</a>.
</p>
<p style="margin:0; font-size:12px; color:#999;">
This is the welcome note for your purchase. Stripe sent a separate receipt with the line items and amount. Hang on to both.
</p>

</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function renderWelcomeText(a: WelcomeArgs): string {
  const productLine = a.productName
    ? `You signed up for ${a.productName}${a.amountStr ? ` (${a.amountStr})` : ""}. Thank you. I do not take that lightly.\n\n`
    : "";

  return (
    `Hi ${a.greeting},\n\n` +
    `Welcome aboard. Your purchase came through.\n\n` +
    productLine +
    `Here is what happens next:\n\n` +
    `  1. Pick a kickoff slot here: ${a.calendlyUrl}\n` +
    `     Thirty minutes, on Zoom, recorded.\n` +
    `  2. Before we meet I will look at your site and pull a short read on where you stand.\n` +
    `  3. On the call we walk through what I found, agree on the first move, ` +
    `and you leave knowing exactly what is happening.\n\n` +
    `If none of those slots work, just reply to this email with two or three times ` +
    `that do and I will hold one.\n\n` +
    `Talk soon,\n` +
    `${SIGNATURE_NAME}\n` +
    `${BMG_NAME}\n` +
    `${PHONE_DISPLAY}\n\n` +
    `---\n` +
    `Manage your subscription, update payment, or download invoices anytime:\n` +
    `  ${a.billingPortalUrl}\n\n` +
    `This is the welcome note for your purchase. Stripe sent a separate receipt ` +
    `with the line items and amount. Hang on to both.\n`
  );
}

// ── Dwight notification ─────────────────────────────────────────────────────

export type NotificationArgs = {
  customerName: string;
  customerEmail: string;
  productName: string | null;
  amountStr: string;
  stripeSessionId: string;
  mode: "live" | "test";
  occurredAt: string; // ISO
};

export function renderNotificationText(a: NotificationArgs): string {
  return (
    `New BMG purchase ${a.mode === "test" ? "(TEST MODE)" : ""}\n\n` +
    `From:        ${a.customerName ? `${a.customerName} <${a.customerEmail}>` : a.customerEmail}\n` +
    `Product:     ${a.productName || "(not in session — check Stripe dashboard)"}\n` +
    `Amount:      ${a.amountStr || "(zero/unknown)"}\n` +
    `Stripe sess: ${a.stripeSessionId}\n` +
    `Received:    ${a.occurredAt}\n\n` +
    `The customer was sent the welcome + kickoff email automatically.\n`
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
