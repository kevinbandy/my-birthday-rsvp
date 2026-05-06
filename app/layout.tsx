import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  icons: { icon: "/f1-icon.png" },
  title: "Kevin's 37th — F1 Arcade Atlanta",
  description:
    "Join Kevin for his 37th birthday at F1 Arcade Atlanta on May 13th. Drinks, racing, and ice cream. You're going down.",
  openGraph: {
    title: "Kevin's 37th — F1 Arcade Atlanta",
    description: "May 13th · 7 PM · F1 Arcade · Jeni's Ice Cream",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
