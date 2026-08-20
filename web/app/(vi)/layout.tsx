import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVars } from "@/app/fonts";
import "@/app/globals.css";
import { SITE } from "@/content/site";
import { vi } from "@/content/vi";

/** Root layout nhánh VI (bản phụ, ở `/vi`) — xem ghi chú ở `app/(en)/layout.tsx`. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: vi.meta.title,
  description: vi.meta.description,
  alternates: {
    canonical: "/vi",
    languages: { en: "/", vi: "/vi" },
  },
};

export default function ViRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={fontVars}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
