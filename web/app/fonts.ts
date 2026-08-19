import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Cả ba nạp subset `vietnamese` — thiếu subset này là mất dấu tiếng Việt.
 * Space Grotesk = tiêu đề · Inter = thân bài · IBM Plex Mono = số và nhãn (giọng "khí cụ đo").
 * Mỗi font phơi một CSS var; `app/globals.css` @theme trỏ vào các var đó.
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
