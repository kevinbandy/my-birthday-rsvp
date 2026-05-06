"use client";

import { useEffect, useState } from "react";
import HelmetSvg, { type ColorId, type DesignId } from "./HelmetSvg";

interface Attendee {
  name: string;
  attending: string;
  note: string;
  helmetDesign: string;
  helmetColor: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const BUBBLE_COLORS = [
  "bg-[#1e1e2e] border-[#3a3a5e]",
  "bg-[#1e2a1e] border-[#3a5e3a]",
  "bg-[#2a1e1e] border-[#5e3a3a]",
  "bg-[#1e2a2a] border-[#3a5e5e]",
  "bg-[#2a2a1e] border-[#5e5e3a]",
];

export default function AttendeeGrid() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/attendees")
      .then((r) => r.json())
      .then((d) => {
        setAttendees(d.records ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const notes = shuffle(attendees.filter((a) => a.note.trim()));
  const helmets = attendees;

  if (loading) {
    return (
      <section className="py-20 px-6 text-center">
        <div className="text-[#888] text-sm tracking-widest uppercase animate-pulse">
          Loading crew...
        </div>
      </section>
    );
  }

  if (attendees.length === 0) return null;

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-14">
        <div className="checkered h-1 w-16 mx-auto mb-6 opacity-50" />
        <h2 className="text-3xl font-black tracking-tight text-white uppercase">
          The Crew
        </h2>
        <p className="text-[#888] text-sm tracking-widest uppercase mt-2">
          {helmets.length} {helmets.length === 1 ? "racer" : "racers"} on the grid
        </p>
      </div>

      {/* Helmet grid */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {helmets.map((a, i) => {
          const firstName = a.name.split(" ")[0];
          const isMaybe = a.attending === "maybe";
          return (
            <div key={i} className="flex flex-col items-center gap-2 group">
              <div
                className={`transition-transform duration-200 group-hover:-translate-y-1 ${
                  isMaybe ? "opacity-60 grayscale" : ""
                }`}
              >
                <HelmetSvg
                  design={(a.helmetDesign as DesignId) || "solid"}
                  colorId={(a.helmetColor as ColorId) || "scuderia"}
                  size={90}
                  uid={`grid-${i}`}
                />
              </div>
              <span className="text-white text-sm font-bold tracking-wide">
                {firstName}
              </span>
              {isMaybe && (
                <span className="text-[#888] text-[10px] tracking-widest uppercase -mt-1">
                  maybe
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Anonymous notes */}
      {notes.length > 0 && (
        <>
          <div className="text-center mb-8">
            <p className="text-[#888] text-xs tracking-widest uppercase">
              From the paddock
            </p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {notes.map((a, i) => (
              <div
                key={i}
                className={`break-inside-avoid border rounded-xl px-5 py-4 relative ${
                  BUBBLE_COLORS[i % BUBBLE_COLORS.length]
                }`}
              >
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 left-6 w-4 h-4 rotate-45 border-b border-r border-inherit bg-inherit" />
                <p className="text-[#ddd] text-sm leading-relaxed italic">
                  &ldquo;{a.note}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
