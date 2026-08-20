import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVars } from "@/app/fonts";
import "@/app/globals.css";
import { SITE } from "@/content/site";

/**
 * EN root layout — EN is canonical at `/`, VI is the parallel version at `/vi`.
 * The repo uses TWO root layouts (route groups `(en)` and `(vi)`, no
 * `app/layout.tsx`) so each language gets its own `<html lang>`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
