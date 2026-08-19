import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVars } from "@/app/fonts";
import "@/app/globals.css";
import { SITE } from "@/content/site";
import { en } from "@/content/en";

/** Root layout nhánh EN — xem ghi chú ở `app/(vi)/layout.tsx`. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    canonical: "/en",
    languages: { vi: "/", en: "/en" },
  },
};

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
