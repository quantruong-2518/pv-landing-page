import type { Locale, PageKey } from "@/content/types";

/** Page order in the header, the footer and the sitemap. */
export const PAGES: readonly PageKey[] = ["home", "products", "contact"];

const SEGMENT: Record<PageKey, string> = {
  home: "",
  products: "/products",
  contact: "/contact",
};

/** URL scheme: EN is canonical at the root, VI sits under /vi. */
export function path(locale: Locale, page: PageKey, hash?: string): string {
  const base = locale === "vi" ? "/vi" : "";
  return `${base}${SEGMENT[page]}${hash ? `#${hash}` : ""}` || "/";
}

/** Same page, other language. */
export function alternatePath(locale: Locale, page: PageKey): string {
  return path(locale === "en" ? "vi" : "en", page);
}
