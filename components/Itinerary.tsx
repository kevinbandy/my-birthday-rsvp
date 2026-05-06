const events = [
  {
    time: "7:00 PM",
    title: "Drinks, Food & Hang",
    detail: "Location TBD — details to follow",
    icon: "🥂",
  },
  {
    time: "8:00 PM",
    title: "F1 Arcade Atlanta",
    detail: "1115 Howell Mill Rd NW · Helmet up, it's go time",
    icon: "🏎️",
    accent: true,
  },
  {
    time: "After Races",
    title: "Jeni's Splendid Ice Creams",
    detail: "Victory lap deserves a scoop",
    icon: "🍦",
  },
];

export default function Itinerary() {
  return (
    <section className="bg-[#111111] px-6 py-16">
      <div className="max-w-lg mx-auto">
        <p className="text-[#e10600] font-bold tracking-[0.3em] text-xs uppercase mb-2">
          The Plan
        </p>
        <h2 className="text-3xl font-black text-[#f5f5f5] mb-10">
          Race Day Itinerary
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#2a2a2a]" />

          <div className="flex flex-col gap-0">
            {events.map((event, i) => (
              <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Dot */}
                <div
                  className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 ${
                    event.accent
                      ? "bg-[#e10600] border-[#e10600]"
                      : "bg-[#1a1a1a] border-[#2a2a2a]"
                  }`}
                >
                  {event.icon}
                </div>

                {/* Content */}
                <div className="pt-1">
                  <p className="text-[#e10600] text-xs font-bold tracking-widest uppercase mb-0.5">
                    {event.time}
                  </p>
                  <p
                    className={`font-bold text-lg leading-tight ${
                      event.accent ? "text-[#f5f5f5]" : "text-[#f5f5f5]"
                    }`}
                  >
                    {event.title}
                  </p>
                  <p className="text-[#888] text-sm mt-0.5">{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
