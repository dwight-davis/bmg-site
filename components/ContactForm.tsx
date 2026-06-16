"use client";

// Inline contact form for /contact/. POSTs to /api/contact, displays a
// thank-you inline on success.

import { useState } from "react";

type State =
  | { phase: "idle" }
  | { phase: "sending" }
  | { phase: "success" }
  | { phase: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<State>({ phase: "idle" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.phase === "sending") return;
    setState({ phase: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          business_name: businessName,
          message,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setState({ phase: "success" });
      } else {
        setState({
          phase: "error",
          message:
            data.error === "invalid_email"
              ? "Email doesn't look right. Mind double-checking?"
              : data.error === "name_required"
              ? "I need a name to reply."
              : data.error === "message_required"
              ? "Add a sentence or two so I know what to look at."
              : "Something went wrong on my end. Try again or email me directly.",
        });
      }
    } catch (err) {
      setState({ phase: "error", message: (err as Error).message });
    }
  }

  if (state.phase === "success") {
    return (
      <div className="bg-white border-2 border-ink shadow-crisp p-8 max-w-2xl mx-auto text-center">
        <div className="eyebrow mb-3">Got it</div>
        <h3 className="font-display uppercase tracking-tight text-3xl text-ink leading-none mb-4">
          Talk soon.
        </h3>
        <p className="font-body text-base text-ink/80 leading-relaxed">
          Thanks for the note. I&apos;ll read it personally and get back to
          you within one business day, usually same day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white border-2 border-ink shadow-crisp p-8 max-w-2xl mx-auto space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="font-body text-xs uppercase tracking-eyebrow text-ink/70">
            Your name
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={state.phase === "sending"}
            className="block w-full border border-ink/30 px-4 py-3 mt-1 font-body text-base focus:border-red focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="font-body text-xs uppercase tracking-eyebrow text-ink/70">
            Your email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state.phase === "sending"}
            className="block w-full border border-ink/30 px-4 py-3 mt-1 font-body text-base focus:border-red focus:outline-none"
          />
        </label>
      </div>
      <label className="block">
        <span className="font-body text-xs uppercase tracking-eyebrow text-ink/70">
          Business name (optional)
        </span>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          disabled={state.phase === "sending"}
          className="block w-full border border-ink/30 px-4 py-3 mt-1 font-body text-base focus:border-red focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="font-body text-xs uppercase tracking-eyebrow text-ink/70">
          What&apos;s on your mind?
        </span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={state.phase === "sending"}
          placeholder="A sentence or two about your business and what you're trying to fix. I read everything."
          className="block w-full border border-ink/30 px-4 py-3 mt-1 font-body text-base focus:border-red focus:outline-none resize-y"
        />
      </label>
      <button
        type="submit"
        disabled={state.phase === "sending"}
        className="btn-pill bg-red text-white shadow-crisp w-full disabled:opacity-50"
      >
        {state.phase === "sending" ? "Sending..." : "Send"}
      </button>
      {state.phase === "error" ? (
        <p className="font-body text-sm text-red text-center">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
