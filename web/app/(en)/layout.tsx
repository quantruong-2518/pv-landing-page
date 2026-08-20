import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVars } from "@/app/fonts";
import "@/app/globals.css";
import { SITE } from "@/content/site";
import { en } from "@/content/en";

/**
 * Root layout nhánh EN — EN là canonical ở `/`, VI là bản phụ ở `/vi`.
 * Repo dùng NHIỀU root layout (route group `(en)` và `(vi)`, không có `app/layout.tsx`)
 * để mỗi ngôn ngữ có thuộc tính `lang` đúng của nó.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    canonical: "/",
    languages: { en: "/", vi: "/vi" },
  },
};

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
