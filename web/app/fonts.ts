import { Space_Grotesk, Inter, IBM_Plex_Mono, Bricolage_Grotesque, Cabin } from "next/font/google";

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

/**
 * HOME and the site header are set from the Canva master, which uses Bricolage
 * Grotesque throughout and Cabin on two link labels (read 2026-08-30). Both
 * carry the `vietnamese` subset — without it the diacritics fall back and the
 * page stops matching the design.
 */
const artboard = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  variable: "--font-bricolage",
  display: "swap",
});

const artboardAlt = Cabin({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cabin",
  display: "swap",
});

export const fontVars = `${display.variable} ${sans.variable} ${mono.variable} ${artboard.variable} ${artboardAlt.variable}`;
