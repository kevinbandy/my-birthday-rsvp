"use client";

import { useEffect, useRef, useState } from "react";
import HelmetSvg, {
  COLOR_SCHEMES,
  DESIGNS,
  type ColorId,
  type DesignId,
} from "./HelmetSvg";

const STORAGE_KEY = "birthday-f1-rsvp";

const ATTENDING_OPTIONS = [
  { value: "yes",   label: "Yes, I'll be there!" },
  { value: "maybe", label: "Maybe"               },
  { value: "no",    label: "Can't make it"        },
];

const RACING_OPTIONS = [
  { value: "you're going down",        label: '"You\'re going down!"',        sub: "I'm here to win"           },
  { value: "lights out and away we go",label: '"Lights out and away we go"',  sub: "I'm racing, full send"     },
  { value: "i could be convinced",     label: '"I could be convinced"',        sub: "On the fence"              },
  { value: "i'd rather just hang",     label: '"I\'d rather just hang"',       sub: "Cheering from the sidelines" },
];

type Status = "idle" | "submitting" | "success" | "error";

interface SavedRsvp {
  name: string;
  attending: string;
  racingLevel: string;
  note: string;
  helmetDesign: DesignId;
  helmetColor: ColorId;
  submittedAt: string;
}

function loadSaved(): SavedRsvp | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedRsvp) : null;
  } catch {
    return null;
  }
}

function saveToDisk(data: SavedRsvp) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export default function RsvpForm() {
  const [name,         setName]         = useState("");
  const [attending,    setAttending]    = useState("");
  const [racingLevel,  setRacingLevel]  = useState("");
  const [note,         setNote]         = useState("");
  const [helmetDesign, setHelmetDesign] = useState<DesignId>("stripe");
  const [helmetColor,  setHelmetColor]  = useState<ColorId>("scuderia");
  const [status,       setStatus]       = useState<Status>("idle");
  const [isUpdate,     setIsUpdate]     = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const saved = loadSaved();
    if (!saved) return;
    setName(saved.name);
    setAttending(saved.attending);
    setRacingLevel(saved.racingLevel);
    setNote(saved.note);
    setHelmetDesign(saved.helmetDesign ?? "stripe");
    setHelmetColor(saved.helmetColor   ?? "scuderia");
    setIsUpdate(true);
  }, []);

  const showRacing = attending === "yes" || attending === "maybe";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !attending) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, racingLevel, note, helmetDesign, helmetColor }),
      });

      if (!res.ok) throw new Error("Failed");

      const saved: SavedRsvp = {
        name, attending, racingLevel, note,
        helmetDesign, helmetColor,
        submittedAt: new Date().toISOString(),
      };
      saveToDisk(saved);
      setIsUpdate(true);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="rsvp" className="bg-[#111111] px-6 py-16 border-t border-[#2a2a2a]">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-6">
            <HelmetSvg design={helmetDesign} colorId={helmetColor} size={160} uid="success" />
          </div>
          <h2 className="text-3xl font-black text-[#f5f5f5] mb-3">
            You&apos;re on the grid!
          </h2>
          <p className="text-[#888] mb-2">
            Thanks {name} — Kevin will have more details soon. See you May 13th!
          </p>
          <p className="text-[#555] text-xs mb-8">
            Your helmet is saved. It&apos;ll be here when you come back.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-[#e10600] text-sm font-semibold tracking-widest uppercase hover:text-[#ff1a1a] transition-colors"
          >
            Update your RSVP →
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="bg-[#111111] px-6 py-16 border-t border-[#2a2a2a]">
      <div className="max-w-lg mx-auto">
        <p className="text-[#e10600] font-bold tracking-[0.3em] text-xs uppercase mb-2">
          RSVP
        </p>
        <h2 className="text-3xl font-black text-[#f5f5f5] mb-8">
          {isUpdate ? "Update your RSVP" : "Are you in?"}
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
                    <p className={`font-semibold text-sm ${racingLevel === opt.value ? "text-[#f5f5f5]" : "text-[#ccc]"}`}>
                      {opt.label}
                    </p>
                    <p className="text-[#888] text-xs mt-0.5">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Helmet picker */}
          <div>
            <label className="block text-[#f5f5f5] text-sm font-semibold mb-1 uppercase tracking-widest">
              Your Helmet
            </label>
            <p className="text-[#888] text-xs mb-4">Design your race day livery</p>

            {/* Live preview */}
            <div className="flex justify-center mb-5">
              <div className="bg-[#0a0a0a] border border-[#2a2a2a] p-4 inline-block">
                <HelmetSvg
                  design={helmetDesign}
                  colorId={helmetColor}
                  size={150}
                  uid="preview"
                />
                <p className="text-center text-[#555] text-xs mt-2 tracking-widest uppercase">
                  {DESIGNS.find((d) => d.id === helmetDesign)?.name} ·{" "}
                  {COLOR_SCHEMES[helmetColor].name}
                </p>
              </div>
            </div>

            {/* Design selector */}
            <p className="text-[#666] text-xs uppercase tracking-widest mb-2">Stripe design</p>
            <div className="flex gap-2 mb-4">
              {DESIGNS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setHelmetDesign(d.id)}
                  title={d.name}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-2 border transition-all duration-150 ${
                    helmetDesign === d.id
                      ? "border-[#e10600] bg-[#e10600]/10"
                      : "border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#444]"
                  }`}
                >
                  <HelmetSvg design={d.id} colorId={helmetColor} size={44} uid={`design-${d.id}`} />
                  <span className={`text-[10px] font-medium tracking-wide uppercase ${helmetDesign === d.id ? "text-[#e10600]" : "text-[#555]"}`}>
                    {d.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Color selector */}
            <p className="text-[#666] text-xs uppercase tracking-widest mb-2">Color scheme</p>
            <div className="grid grid-cols-8 gap-1.5">
              {(Object.entries(COLOR_SCHEMES) as [ColorId, typeof COLOR_SCHEMES[ColorId]][]).map(
                ([id, scheme]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setHelmetColor(id)}
                    title={scheme.name}
                    className={`aspect-square border-2 transition-all duration-150 relative ${
                      helmetColor === id ? "border-[#f5f5f5] scale-110" : "border-transparent hover:border-[#444]"
                    }`}
                    style={{ background: scheme.primary }}
                  >
                    <span
                      className="absolute bottom-0 right-0 w-[45%] h-[45%]"
                      style={{ background: scheme.accent }}
                    />
                  </button>
                )
              )}
            </div>
            <div className="mt-1.5 text-center">
              <span className="text-[#555] text-xs">
                {COLOR_SCHEMES[helmetColor].name}
              </span>
            </div>
          </div>

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
            {status === "submitting"
              ? "Saving..."
              : isUpdate
              ? "Update RSVP"
              : "Submit RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}
