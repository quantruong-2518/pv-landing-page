import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * All three load the `vietnamese` subset — without it Vietnamese diacritics break.
 * Space Grotesk = headings · Inter = body · IBM Plex Mono = numbers and labels.
 * Each exposes a CSS var that `app/globals.css` @theme points at.
 */
const display = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontVars = `${display.variable} ${sans.variable} ${mono.variable}`;
