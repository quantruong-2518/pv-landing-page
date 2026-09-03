import type { Metadata } from "next";
import { Be_Vietnam_Pro, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

import { QueryProvider } from "@/components/providers/query-provider";

import "@/app/globals.css";

/**
 * Root layout for the CMS.
 *
 * A second root layout, in its own route group, because /admin is a different
 * application from the public site: it is Vietnamese-only, it is never indexed,
 * and it shares nothing with the marketing chrome except the design tokens.
 */

const chakraPetch = Chakra_Petch({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pebble Vina CMS",
  // Belt and braces with robots.ts: an internal tool should never be a result.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${chakraPetch.variable} ${beVietnamPro.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-night text-ink antialiased">
        <QueryProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className:
                "!rounded-none !border !border-ink/20 !bg-navy !font-mono !text-[0.75rem] !tracking-[0.06em] !text-ink",
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
