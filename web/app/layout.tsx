import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVars } from "@/app/fonts";
import "@/app/globals.css";
import { SITE } from "@/content/site";

/** Root layout. The site ships Vietnamese only, so there is a single `<html lang>`. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={fontVars}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
