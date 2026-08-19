import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVars } from "@/app/fonts";
import "@/app/globals.css";
import { SITE } from "@/content/site";
import { vi } from "@/content/vi";

/**
 * Root layout nhánh VI. Repo dùng NHIỀU root layout (route group `(vi)` và `(en)`,
 * không có `app/layout.tsx`) để mỗi ngôn ngữ có thuộc tính `lang` đúng của nó.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: vi.meta.title,
  description: vi.meta.description,
  alternates: {
    canonical: "/",
    languages: { vi: "/", en: "/en" },
  },
};

export default function ViRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={fontVars}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
