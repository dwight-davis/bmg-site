// Render the lead-magnet HTML from content.json, then drive headless
// Chrome to print it to PDF. Outputs:
//   tools/lead-magnets/transform-your-marketing/output.html
//   public/lead-magnets/transform-your-marketing.pdf
//
// Run:  node tools/lead-magnets/transform-your-marketing/render.mjs
// Requires the Google Chrome app to be installed at the standard macOS path
// (same one we use for site screenshots).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const content = JSON.parse(readFileSync(join(HERE, "content.json"), "utf8"));

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// ── HTML composition ──────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphs(arr) {
  return arr.map((p) => `<p>${esc(p)}</p>`).join("\n");
}

function renderHook(p) {
  return `<section class="page hook">
    <div class="eyebrow">${esc(p.eyebrow)}</div>
    <h1 class="display">${esc(p.headline)}</h1>
    <div class="body large">${paragraphs(p.paragraphs)}</div>
  </section>`;
}

function renderPrimer(p) {
  const beats = p.beats
    .map(
      (b) => `
      <li>
        <div class="beat-n">${esc(b.n)}</div>
        <div>
          <div class="beat-label">${esc(b.label)}</div>
          <div class="beat-text">${esc(b.text)}</div>
        </div>
      </li>`,
    )
    .join("");
  return `<section class="page primer">
    <div class="eyebrow">${esc(p.eyebrow)}</div>
    <h2 class="display">${esc(p.headline)}</h2>
    <div class="body">${paragraphs(p.paragraphs)}</div>
    <ol class="beats">${beats}</ol>
    <p class="closer">${esc(p.closer)}</p>
  </section>`;
}

function renderStep(p) {
  return `<section class="page step">
    <div class="step-mark">${esc(p.step)}</div>
    <div class="step-label">${esc(p.label)}</div>
    <h2 class="display">${esc(p.headline)}</h2>
    <div class="body">${paragraphs(p.paragraphs)}</div>
    <div class="callout do"><div class="callout-tag">Do this</div><p>${esc(p.do_this)}</p></div>
    <div class="callout dont"><div class="callout-tag">Don&apos;t do this</div><p>${esc(p.dont_do_this)}</p></div>
    <div class="callout mistake"><div class="callout-tag">Common mistake</div><p>${esc(p.common_mistake)}</p></div>
    <div class="example"><div class="callout-tag">Real example</div><p>${esc(p.example)}</p></div>
    <div class="tool"><div class="callout-tag">Tool I&apos;d use</div><p>${esc(p.tool)}</p></div>
  </section>`;
}

function renderAssessment(p) {
  const items = p.items
    .map(
      (label, i) =>
        `<li>
          <span class="item-label">${esc(label)}</span>
          <span class="item-rating">1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5</span>
        </li>`,
    )
    .join("");
  return `<section class="page assessment">
    <div class="eyebrow">${esc(p.eyebrow)}</div>
    <h2 class="display">${esc(p.headline)}</h2>
    <p class="intro">${esc(p.intro)}</p>
    <ol class="rating-list">${items}</ol>
    <p class="outro">${esc(p.outro)}</p>
  </section>`;
}

function renderAbout(p) {
  return `<section class="page about">
    <div class="eyebrow">${esc(p.eyebrow)}</div>
    <h2 class="display">${esc(p.headline)}</h2>
    <div class="body">${paragraphs(p.paragraphs)}</div>
    <div class="final-cta">
      <p>${esc(p.cta)}</p>
      <a class="cta-button" href="${esc(p.url)}">${esc(p.url_label)}</a>
    </div>
  </section>`;
}

function renderCover() {
  return `<section class="page cover">
    <div class="cover-inner">
      <div class="logo-box">
        <div class="logo-line">Boise</div>
        <div class="logo-line">Marketing Guy</div>
      </div>
      <h1 class="cover-title">${esc(content.title)}</h1>
      <p class="cover-sub">${esc(content.subtitle)}</p>
      <p class="byline">${esc(content.byline)}</p>
    </div>
  </section>`;
}

const pagesHtml = [
  renderCover(),
  ...content.pages.map((p) => {
    switch (p.kind) {
      case "hook":       return renderHook(p);
      case "primer":     return renderPrimer(p);
      case "step":       return renderStep(p);
      case "assessment": return renderAssessment(p);
      case "about":      return renderAbout(p);
      default:           return "";
    }
  }),
].join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(content.title)} — Boise Marketing Guy</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --ink:    #151515;
    --navy:   #000028;
    --red:    #e01f26;
    --paper:  #b4a269;
    --bg:     #ffffff;
    --muted:  #f7f7f5;
    --line:   #e5e5e5;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    color: var(--ink);
    background: var(--bg);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 8.5in;
    min-height: 11in;
    padding: 0.75in 0.85in;
    page-break-after: always;
    background: var(--bg);
    position: relative;
  }
  .page:last-child { page-break-after: auto; }

  .display {
    font-family: "Anton", "Helvetica Inserat", Impact, Arial Black, sans-serif;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    line-height: 0.95;
    color: var(--navy);
    margin: 0 0 22px 0;
  }
  h1.display { font-size: 52px; }
  h2.display { font-size: 40px; }

  .eyebrow {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-weight: 700;
    color: var(--red);
    margin-bottom: 14px;
  }

  .body p {
    font-size: 13.5px;
    line-height: 1.65;
    color: var(--ink);
    margin: 0 0 14px 0;
  }
  .body.large p {
    font-size: 15px;
    line-height: 1.7;
  }

  /* Cover */
  .cover {
    background: var(--navy);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cover-inner { text-align: center; max-width: 6in; }
  .logo-box {
    display: inline-block;
    background: #ffffff;
    color: var(--navy);
    padding: 12px 18px;
    margin-bottom: 60px;
  }
  .logo-line {
    font-family: "Anton", Impact, sans-serif;
    text-transform: uppercase;
    font-size: 26px;
    line-height: 1;
    letter-spacing: -0.01em;
  }
  .logo-line + .logo-line { margin-top: 3px; }
  .cover-title {
    font-family: "Anton", Impact, sans-serif;
    text-transform: uppercase;
    color: #ffffff;
    font-size: 72px;
    line-height: 0.95;
    letter-spacing: -0.01em;
    margin: 0 0 18px 0;
  }
  .cover-sub {
    font-family: "Source Serif 4", Georgia, serif;
    font-style: italic;
    font-size: 22px;
    line-height: 1.35;
    color: rgba(255,255,255,0.92);
    margin: 0 0 50px 0;
  }
  .byline {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--paper);
    margin: 0;
  }

  /* Primer */
  .beats {
    list-style: none;
    padding: 0;
    margin: 24px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .beats li {
    display: flex;
    gap: 14px;
    padding: 14px;
    background: var(--muted);
    border-left: 3px solid var(--red);
  }
  .beat-n {
    font-family: "Anton", Impact, sans-serif;
    color: var(--red);
    font-size: 28px;
    line-height: 1;
    min-width: 24px;
  }
  .beat-label {
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .beat-text { font-size: 12.5px; line-height: 1.5; color: var(--ink); }
  .closer {
    font-family: "Source Serif 4", Georgia, serif;
    font-style: italic;
    font-size: 14px;
    line-height: 1.6;
    color: var(--ink);
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid var(--line);
  }

  /* Step */
  .step-mark {
    font-family: "Anton", Impact, sans-serif;
    font-size: 96px;
    color: var(--red);
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .step-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-weight: 700;
    color: var(--navy);
    margin: 4px 0 14px 0;
  }
  .callout, .example, .tool {
    background: var(--muted);
    padding: 12px 16px;
    margin: 12px 0;
    border-left: 3px solid var(--red);
  }
  .callout.dont { border-left-color: #8a8a8a; background: #f0f0ed; }
  .callout.mistake { border-left-color: var(--navy); }
  .example { border-left-color: var(--paper); }
  .tool { border-left-color: var(--navy); background: var(--muted); }
  .callout-tag {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .callout p, .example p, .tool p {
    font-size: 12.5px;
    line-height: 1.55;
    color: var(--ink);
    margin: 0;
  }

  /* Assessment */
  .intro, .outro {
    font-size: 13.5px;
    line-height: 1.65;
    color: var(--ink);
    margin: 0 0 16px 0;
  }
  .rating-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }
  .rating-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
    font-size: 12.5px;
  }
  .rating-list li:last-child { border-bottom: 1px solid var(--navy); }
  .item-label { color: var(--ink); padding-right: 16px; }
  .item-rating {
    font-family: "Anton", Impact, sans-serif;
    color: var(--navy);
    font-size: 18px;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .outro {
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid var(--line);
    font-family: "Source Serif 4", Georgia, serif;
    font-style: italic;
  }

  /* About */
  .final-cta {
    margin-top: 24px;
    padding: 22px;
    background: var(--navy);
    color: #ffffff;
    text-align: center;
  }
  .final-cta p {
    font-size: 13.5px;
    line-height: 1.6;
    color: #ffffff;
    margin: 0 0 14px 0;
  }
  .cta-button {
    display: inline-block;
    background: var(--red);
    color: #ffffff !important;
    text-decoration: none;
    font-family: "Anton", Impact, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 14px;
    padding: 12px 28px;
    border-radius: 9999px;
  }

  @page { size: letter; margin: 0; }
</style>
</head>
<body>
${pagesHtml}
</body>
</html>`;

writeFileSync(join(HERE, "output.html"), html);
console.log("wrote output.html");

const outPdfDir = join(REPO, "public", "lead-magnets");
mkdirSync(outPdfDir, { recursive: true });
const outPdf = join(outPdfDir, "transform-your-marketing.pdf");

const cmd = `"${CHROME}" --headless=new --disable-gpu --no-sandbox --hide-scrollbars --no-pdf-header-footer --virtual-time-budget=4000 --print-to-pdf="${outPdf}" --print-to-pdf-no-header "file://${join(HERE, "output.html")}"`;
execSync(cmd, { stdio: "ignore" });
console.log(`wrote ${outPdf}`);
