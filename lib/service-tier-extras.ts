// Per-tier rich content (FAQs, monthly deliverables, footer inclusions,
// case studies) recovered from the WP MySQL dump on 2026-06-15. Used by
// the service-tier page to surface what the visitor actually wants to
// know — what's included, when, and answers to common questions.

import { readFileSync } from "node:fs";
import { join } from "node:path";

export type TierExtras = {
  faqs_html: string;
  deliverables_month_1: string;
  deliverables_month_2: string;
  deliverables_ongoing: string;
  footer_inclusions: string;
  cta_text: string;
  case_studies: string;
};

let _all: Record<string, TierExtras> | null = null;

function load(): Record<string, TierExtras> {
  if (_all) return _all;
  const raw = JSON.parse(
    readFileSync(
      join(process.cwd(), "data", "service-tier-extras.json"),
      "utf8",
    ),
  ) as Record<string, TierExtras>;
  _all = raw;
  return raw;
}

export function getTierExtras(slug: string): TierExtras | null {
  return load()[slug] ?? null;
}

// Parse a FAQ HTML block (h2 + alternating <p><strong>Q</strong></p><p>A</p>
// shape from WP) into a structured Q&A list. Used both for rendering and
// for emitting FAQPage schema.
export type Faq = { question: string; answer: string };

const STRIP_TAGS = /<\/?(?:p|h2|strong|em|br)\s*\/?>/gi;
const ENTITIES: Record<string, string> = {
  "&rsquo;": "’", "&lsquo;": "‘", "&ldquo;": "“", "&rdquo;": "”",
  "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": "\"",
  "&#8217;": "’", "&#8216;": "‘", "&#8220;": "“", "&#8221;": "”",
};

function decode(s: string): string {
  let out = s;
  for (const [k, v] of Object.entries(ENTITIES)) out = out.split(k).join(v);
  return out;
}

export function parseFaqs(html: string): Faq[] {
  if (!html) return [];
  // Drop the H2 title — it's always "Frequently Asked Questions".
  const body = html.replace(/<h2[^>]*>.*?<\/h2>/i, "");
  // Split into <p>...</p> segments.
  const segments: string[] = [];
  const rx = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m: RegExpExecArray | null;
  while ((m = rx.exec(body))) {
    segments.push(decode(m[1].replace(STRIP_TAGS, "")).trim());
  }
  // Alternating question/answer pairs. Questions are wrapped in <strong>,
  // detect by trailing '?' — fallback when bold tag was stripped.
  const out: Faq[] = [];
  for (let i = 0; i + 1 < segments.length; i += 2) {
    const q = segments[i];
    const a = segments[i + 1];
    if (q && a) out.push({ question: q, answer: a });
  }
  return out;
}
