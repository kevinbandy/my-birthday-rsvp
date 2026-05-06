"use client";

export type DesignId = "solid" | "stripe" | "twin" | "diagonal" | "halves";
export type ColorId = keyof typeof COLOR_SCHEMES;

export const COLOR_SCHEMES = {
  scuderia:  { primary: "#e10600", accent: "#ffffff", visor: "#0a1628", name: "Scuderia"     },
  papaya:    { primary: "#ff8000", accent: "#222222", visor: "#0a1020", name: "Papaya"       },
  silver:    { primary: "#8a9aaa", accent: "#e8e8e8", visor: "#0a0a14", name: "Silver Arrow" },
  bull:      { primary: "#1e3a7e", accent: "#e8002d", visor: "#05050f", name: "Bull Run"     },
  alpine:    { primary: "#0078c8", accent: "#ff87bc", visor: "#0a0a1e", name: "Alpine"       },
  vantage:   { primary: "#006f62", accent: "#cedc00", visor: "#040e04", name: "Vantage"      },
  midnight:  { primary: "#1a1a4e", accent: "#ffd700", visor: "#050508", name: "Midnight"     },
  phantom:   { primary: "#333333", accent: "#00e87a", visor: "#020204", name: "Phantom"      },
} as const;

export const DESIGNS: { id: DesignId; name: string }[] = [
  { id: "solid",    name: "Clean"    },
  { id: "stripe",   name: "Stripe"   },
  { id: "twin",     name: "Twin"     },
  { id: "diagonal", name: "Slash"    },
  { id: "halves",   name: "Halves"   },
];

// Helmet outer shell — side profile facing right (visor on the right)
const SHELL =
  // "M 38,132 C 15,130 6,108 5,80 C 4,50 14,23 44,11 C 68,3 104,0 134,7 " +
  // "C 162,14 179,36 180,62 C 180,88 169,108 150,113 L 138,118 " +
  // "C 124,130 94,137 64,136 C 49,135 40,133 38,132 Z";
  "M 10 103 C 5 82 3 67 9 49 C 16 27 26 17 38 11 C 54 4 69 1 89 2 " +
  "C 131 5 143 22 154 46 C 176 89 176 95 175 117 C 173 128 171 136 164 147 " +
  "C 117 158 56 154 21 143 Z";

// Visor — slightly inset from the right/front face
const VISOR =
  // "M 118,17 C 138,10 160,23 172,43 C 178,57 178,75 173,91 " +
  // "C 168,104 156,111 144,114 L 108,109 C 95,101 91,81 93,61 " +
  // "C 95,39 108,21 118,17 Z";
  "M 76 66 C 105 58 119 53 152 39 C 160 48 172 66 175 107 " +
  "C 174 112 173 122 151 124 L 81 124 C 62 124 45 112 38 106 " +
  "C 34 94 33 89 34 80 C 35 70 46 66 55 66 Z";

// Small visor shine (top-left of visor glass)
const VISOR_SHINE =
  // "M 121,20 C 136,14 156,24 167,40 L 158,37 C 148,28 133,21 121,20 Z";
  "M 112 54 C 130 77 133 85 151 118 L 101 118 C 92 90 87 78 80 62 Z";

export default function HelmetSvg({
  design,
  colorId,
  size = 120,
  uid = "h",
}: {
  design: DesignId;
  colorId: ColorId;
  size?: number;
  uid?: string;
}) {
  const { primary, accent, visor } = COLOR_SCHEMES[colorId];
  const clipId = `helmet-clip-${uid}`;

  return (
    <svg
      width={size}
      height={size * 0.82}
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SHELL} />
        </clipPath>
      </defs>

      {/* Base shell */}
      <path d={SHELL} fill={primary} />

      {/* Design overlays — clipped to helmet shape */}
      <g clipPath={`url(#${clipId})`}>
        {design === "stripe" && (
          <rect x="0" y="45" width="200" height="36" fill={accent} opacity="0.92" />
        )}
        {design === "twin" && (
          <>
            <rect x="0" y="46" width="200" height="15" fill={accent} opacity="0.92" />
            <rect x="0" y="76" width="200" height="15" fill={accent} opacity="0.92" />
          </>
        )}
        {design === "diagonal" && (
          <polygon
            points="0,100 200,190 200,22 0,38"
            fill={accent}
            opacity="0.92"
          />
        )}
        {design === "halves" && (
          <rect x="90" y="0" width="100" height="160" fill={accent} opacity="0.92" />
        )}
      </g>

      {/* Visor glass */}
      <path d={VISOR} fill={visor} />

      {/* Visor shine */}
      <path d={VISOR_SHINE} fill="rgba(255,255,255,0.18)" />

      {/* Subtle visor inner gradient hint */}
      <path d={VISOR} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Shell outline */}
      <path d={SHELL} fill="none" stroke="rgba(0,0,0,0.38)" strokeWidth="2.5" />

      {/* Visor frame */}
      <path d={VISOR} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8" />
    </svg>
  );
}
