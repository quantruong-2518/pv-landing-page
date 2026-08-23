import type { PageKey } from "@/content/types";

/** Page order in the header, the footer and the sitemap. */
export const PAGES: readonly PageKey[] = ["home", "products", "contact"];

const SEGMENT: Record<PageKey, string> = {
  home: "",
  products: "/products",
  contact: "/contact",
};

/** URL scheme: the site is Vietnamese-only, so every page sits at the root. */
export function path(page: PageKey, hash?: string): string {
  return `${SEGMENT[page]}${hash ? `#${hash}` : ""}` || "/";
}
