"use client";

// Email-gated lead-magnet capture. Modeled on storybrand.com's "Get the
// FREE Sales Funnel Template" mid-page section: short headline, a peek at
// what's inside, single inline form (just email), one clear button. On
// success the form replaces itself with a "Here's your guide" reveal
// linking to the PDF directly.

import { useState } from "react";

type State =
  | { phase: "idle" }
  | { phase: "sending" }
  | { phase: "success"; pdfUrl: string }
  | { phase: "error"; message: string };

export function LeadMagnet() {
  const [state, setState] = useState<State>({ phase: "idle" });
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.phase === "sending") return;
    setState({ phase: "sending" });
    try {
      const res = await fetch("/api/lead-magnet/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, first_name: firstName }),
      });
      const data = (await res.json()) as { ok?: boolean; pdf_url?: string; error?: string };
      if (res.ok && data.ok && data.pdf_url) {
        setState({ phase: "success", pdfUrl: data.pdf_url });
      } else {
        setState({
          phase: "error",
          message:
            data.error === "invalid_email"
              ? "That doesn't look like a valid email. Try again?"
              : "Something went wrong. Try again or email me directly.",
        });
      }
    } catch (err) {
      setState({
        phase: "error",
        message: `${(err as Error).message}`,
      });
    }
  }

  return (
    <section id="guide" className="bg-bg-muted">
      <div className="container-content section">
        <div className="grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
          {/* PDF preview — CSS-rendered "book cover" facade */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative bg-navy text-white shadow-crisp"
              style={{
                width: "clamp(220px, 28vw, 320px)",
                aspectRatio: "8.5 / 11",
                transform: "perspective(1200px) rotateY(-8deg) rotateX(2deg)",
                transformOrigin: "right center",
              }}
            >
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="bg-white text-ink inline-block self-start px-2 py-1.5 leading-none">
                  <div className="font-display uppercase tracking-tight text-sm leading-none">
                    Boise
                  </div>
                  <div className="font-display uppercase tracking-tight text-sm leading-none mt-0.5">
                    Marketing Guy
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="font-body text-xs uppercase tracking-eyebrow text-paper mb-3">
                    Free guide
                  </div>
                  <div className="font-display uppercase tracking-tight leading-[0.92] text-white"
                       style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)" }}>
                    Transform <br/>
                    your <br/>
                    <span className="accent">marketing.</span>
                  </div>
                  <div className="font-serif italic text-white/85 mt-4 leading-snug"
                       style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)" }}>
                    5 steps to turn your small business into a revenue machine.
                  </div>
                </div>
                <div className="font-body text-[10px] uppercase tracking-eyebrow text-paper">
                  By Dwight Davis
                </div>
              </div>
            </div>
          </div>

          {/* Headline + form */}
          <div>
            <div className="font-body text-xs uppercase tracking-eyebrow text-red mb-4">
              Free guide
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl mb-5">
              Get the free 5-step guide.{" "}
              <span className="accent">No fluff.</span>
            </h2>
            <p className="font-body text-lg text-ink/85 leading-relaxed mb-7">
              The StoryBrand framework + practical digital tactics for
              small businesses. The exact thing I&apos;d walk you through if you
              hired me, written down so you can do it yourself if you want.
            </p>

            {state.phase === "success" ? (
              <div className="bg-white border-2 border-ink shadow-crisp-sm p-6">
                <div className="eyebrow mb-3">It&apos;s on the way</div>
                <p className="font-body text-base text-ink leading-relaxed mb-5">
                  Thanks. Here&apos;s your guide, and I&apos;ll send a copy to
                  your inbox too.
                </p>
                <a
                  href={state.pdfUrl}
                  className="btn-pill bg-red text-white shadow-crisp-sm text-sm inline-flex"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download the guide (PDF)
                </a>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="bg-white border-2 border-ink shadow-crisp-sm p-6 space-y-3"
              >
                <div className="grid sm:grid-cols-[2fr_3fr] gap-3">
                  <input
                    type="text"
                    placeholder="First name (optional)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={state.phase === "sending"}
                    className="border border-ink/30 px-4 py-3 font-body text-base focus:border-red focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={state.phase === "sending"}
                    className="border border-ink/30 px-4 py-3 font-body text-base focus:border-red focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={state.phase === "sending"}
                  className="btn-pill bg-red text-white shadow-crisp-sm w-full text-sm disabled:opacity-50"
                >
                  {state.phase === "sending"
                    ? "Sending..."
                    : "Send me the guide"}
                </button>
                {state.phase === "error" ? (
                  <p className="font-body text-sm text-red leading-snug">
                    {state.message}
                  </p>
                ) : null}
                <p className="font-body text-xs text-ink/55 leading-relaxed">
                  No spam. Unsubscribe anytime. Idaho marketing notes, only
                  when I have something useful to say.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
