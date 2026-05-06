import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background photo */}
      <Image
        src="/Snapshot_20260390_160312.jpg"
        alt="Kevin behind the wheel in a racing helmet"
        fill
        priority
        className="object-cover object-top"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Carbon fiber texture on top */}
      <div className="absolute inset-0 carbon opacity-40" />

      {/* Red top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#e10600]" />

      {/* Checkered bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 h-8 checkered opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="text-[#e10600] font-bold tracking-[0.3em] text-xs uppercase">
          Birthday Party
        </p>

        <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-[#f5f5f5] leading-none">
          Kevin&apos;s
          <br />
          <span className="text-[#e10600]">37th</span>
        </h1>

        <div className="flex items-center gap-3 mt-2">
          <div className="h-px w-8 bg-[#888]" />
          <p className="text-[#888] text-sm font-medium tracking-widest uppercase">
            F1 Arcade Atlanta
          </p>
          <div className="h-px w-8 bg-[#888]" />
        </div>

        <p className="text-[#f5f5f5] text-xl font-semibold mt-1">
          Wednesday, May 13th · 7 PM
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="#rsvp"
            className="inline-block bg-[#e10600] text-white font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#ff1a1a] active:scale-95 transition-all duration-150"
          >
            RSVP Now
          </a>
          <a
            href="/bandys-birthday.ics"
            download
            className="inline-block bg-black/40 backdrop-blur-sm border border-white/20 text-[#ccc] font-bold text-sm tracking-widest uppercase px-8 py-4 hover:border-white/40 hover:text-white active:scale-95 transition-all duration-150"
          >
            + Add to Calendar
          </a>
        </div>
      </div>

      {/* Side accents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-[#e10600] opacity-60" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-[#e10600] opacity-60" />
    </section>
  );
}
