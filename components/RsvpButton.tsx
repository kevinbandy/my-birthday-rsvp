"use client";

import { useEffect, useState } from "react";

export default function RsvpButton() {
  const [rsvpd, setRsvpd] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("birthday-f1-rsvp");
      if (saved) {
        const { attending } = JSON.parse(saved);
        setRsvpd(attending === "yes" || attending === "maybe");
      }
    } catch {}
  }, []);

  if (rsvpd) {
    return (
      <span className="inline-flex items-center gap-2 bg-[#1a3a1a] border border-[#2a6a2a] text-[#4caf50] font-bold text-sm tracking-widest uppercase px-8 py-4 cursor-default select-none">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        RSVP&apos;d
      </span>
    );
  }

  return (
    <a
      href="#rsvp"
      className="inline-block bg-[#e10600] text-white font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#ff1a1a] active:scale-95 transition-all duration-150"
    >
      RSVP Now
    </a>
  );
}
