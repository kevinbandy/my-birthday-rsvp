import Hero from "@/components/Hero";
import Itinerary from "@/components/Itinerary";
import Directions from "@/components/Directions";
import AttendeeGrid from "@/components/AttendeeGrid";
import RsvpForm from "@/components/RsvpForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <Itinerary />
      <Directions />
      <AttendeeGrid />
      <RsvpForm />
      <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] px-6 py-8 text-center">
        <div className="checkered h-1 w-24 mx-auto mb-4 opacity-40" />
        <p className="text-[#888] text-xs tracking-widest uppercase">
          Kevin&apos;s 37th · May 13, 2026 · F1 Arcade Atlanta
        </p>
      </footer>
    </main>
  );
}
