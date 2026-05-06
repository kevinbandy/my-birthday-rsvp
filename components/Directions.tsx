const address = "1115 Howell Mill Rd NW, Atlanta, GA 30318";
const parkingCoords = "33.785194,-84.410390";
const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
const appleMapsUrl = `https://maps.apple.com/?daddr=${encodeURIComponent(address)}`;
const parkingGoogleUrl = `https://www.google.com/maps/dir/?api=1&destination=${parkingCoords}`;
const parkingAppleUrl = `https://maps.apple.com/?daddr=${parkingCoords}`;

export default function Directions() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-16 border-t border-[#2a2a2a]">
      <div className="max-w-lg mx-auto">
        <p className="text-[#e10600] font-bold tracking-[0.3em] text-xs uppercase mb-2">
          Getting There
        </p>
        <h2 className="text-3xl font-black text-[#f5f5f5] mb-8">Directions</h2>

        {/* Address card */}
        <div className="bg-[#111111] border border-[#2a2a2a] p-5 mb-6">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-1">
            F1 Arcade Atlanta
          </p>
          <p className="text-[#f5f5f5] font-semibold text-lg">{address}</p>
        </div>

        {/* Parking card */}
        <div className="bg-[#111111] border border-[#2a2a2a] p-5 mb-6">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-1">
            Parking
          </p>
          <p className="text-[#f5f5f5] font-semibold">The Interlock Deck</p>
          <div className="flex gap-3 mt-3">
            <a
              href={parkingGoogleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-[#e10600] hover:text-[#ff1a1a] transition-colors"
            >
              Google Maps →
            </a>
            <a
              href={parkingAppleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-[#888] hover:text-[#f5f5f5] transition-colors"
            >
              Apple Maps →
            </a>
          </div>
        </div>

        {/* Map buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#e10600] text-white font-bold text-sm tracking-widest uppercase px-6 py-4 hover:bg-[#ff1a1a] active:scale-95 transition-all duration-150"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Open in Google Maps
          </a>
          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] font-bold text-sm tracking-widest uppercase px-6 py-4 hover:bg-[#2a2a2a] active:scale-95 transition-all duration-150"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Open in Apple Maps
          </a>
        </div>

        {/* Notes */}
        <div className="border-t border-[#2a2a2a] pt-6 flex flex-col gap-3">
          <div className="flex gap-3">
            <span className="text-[#e10600] mt-0.5 flex-shrink-0">→</span>
            <p className="text-[#888] text-sm">
              <span className="text-[#f5f5f5] font-medium">Parking:</span>{" "}
              Use The Interlock deck — links above drop a pin at the entrance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
