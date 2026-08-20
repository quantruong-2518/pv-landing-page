import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVars } from "@/app/fonts";
import "@/app/globals.css";
import { SITE } from "@/content/site";

/** VI root layout (parallel version at `/vi`) — see the note in `app/(en)/layout.tsx`. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

export default function ViRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={fontVars}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
