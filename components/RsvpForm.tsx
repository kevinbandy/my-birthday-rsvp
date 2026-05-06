"use client";

import { useState } from "react";

const ATTENDING_OPTIONS = [
  { value: "yes", label: "Yes, I'll be there!" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "Can't make it" },
];

const RACING_OPTIONS = [
  {
    value: "you're going down",
    label: "\"You're going down!\"",
    sub: "I'm here to win",
  },
  {
    value: "lights out and away we go",
    label: "\"Lights out and away we go\"",
    sub: "I'm racing, full send",
  },
  {
    value: "i could be convinced",
    label: "\"I could be convinced\"",
    sub: "On the fence",
  },
  {
    value: "i'd rather just hang",
    label: "\"I'd rather just hang\"",
    sub: "Cheering from the sidelines",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("");
  const [racingLevel, setRacingLevel] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const showRacing = attending === "yes" || attending === "maybe";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !attending) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, racingLevel, note }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="rsvp" className="bg-[#111111] px-6 py-16 border-t border-[#2a2a2a]">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-5xl mb-4">🏁</div>
          <h2 className="text-3xl font-black text-[#f5f5f5] mb-3">
            You&apos;re on the grid!
          </h2>
          <p className="text-[#888]">
            Thanks {name}. Kevin will have more details soon. See you May 13th!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="bg-[#111111] px-6 py-16 border-t border-[#2a2a2a]"
    >
      <div className="max-w-lg mx-auto">
        <p className="text-[#e10600] font-bold tracking-[0.3em] text-xs uppercase mb-2">
          RSVP
        </p>
        <h2 className="text-3xl font-black text-[#f5f5f5] mb-8">
          Are you in?
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name */}
          <div>
            <label className="block text-[#f5f5f5] text-sm font-semibold mb-2 uppercase tracking-widest">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="First name is fine"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-[#f5f5f5] placeholder-[#444] px-4 py-3 focus:outline-none focus:border-[#e10600] transition-colors"
            />
          </div>

          {/* Attending */}
          <div>
            <label className="block text-[#f5f5f5] text-sm font-semibold mb-3 uppercase tracking-widest">
              Can you make it?
            </label>
            <div className="flex flex-col gap-2">
              {ATTENDING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setAttending(opt.value);
                    if (opt.value === "no") setRacingLevel("");
                  }}
                  className={`w-full text-left px-4 py-3 border font-medium text-sm transition-all duration-150 ${
                    attending === opt.value
                      ? "border-[#e10600] bg-[#e10600]/10 text-[#f5f5f5]"
                      : "border-[#2a2a2a] bg-[#0a0a0a] text-[#888] hover:border-[#444] hover:text-[#f5f5f5]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Racing level — conditional */}
          {showRacing && (
            <div>
              <label className="block text-[#f5f5f5] text-sm font-semibold mb-1 uppercase tracking-widest">
                Racing Enthusiasm
              </label>
              <p className="text-[#888] text-xs mb-3">
                How&apos;s your competitive spirit feeling?
              </p>
              <div className="flex flex-col gap-2">
                {RACING_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRacingLevel(opt.value)}
                    className={`w-full text-left px-4 py-3 border transition-all duration-150 ${
                      racingLevel === opt.value
                        ? "border-[#e10600] bg-[#e10600]/10"
                        : "border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#444]"
                    }`}
                  >
                    <p
                      className={`font-semibold text-sm ${
                        racingLevel === opt.value
                          ? "text-[#f5f5f5]"
                          : "text-[#ccc]"
                      }`}
                    >
                      {opt.label}
                    </p>
                    <p className="text-[#888] text-xs mt-0.5">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            <label className="block text-[#f5f5f5] text-sm font-semibold mb-2 uppercase tracking-widest">
              Note{" "}
              <span className="text-[#888] font-normal normal-case tracking-normal">
                (optional)
              </span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Phone number, questions, trash talk..."
              rows={3}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-[#f5f5f5] placeholder-[#444] px-4 py-3 focus:outline-none focus:border-[#e10600] transition-colors resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-[#e10600] text-sm">
              Something went wrong. Try again or text Kevin directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting" || !name || !attending}
            className="bg-[#e10600] text-white font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#ff1a1a] active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {status === "submitting" ? "Submitting..." : "Submit RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}
