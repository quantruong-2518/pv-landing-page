import type { PageKey } from "@/content/types";

/** Page order in the header, the footer and the sitemap. */
export const PAGES: readonly PageKey[] = ["home", "products", "contact"];

const SEGMENT: Record<PageKey, string> = {
  home: "",
  products: "/products",
  contact: "/contact",
};

/**
 * URL scheme: the site ships Vietnamese only, but the content still lives under
 * the `/vi` prefix so a second language can be added without moving every URL.
 * `/` is a permanent redirect to `/vi` — see `next.config.mjs`.
 */
export const LOCALE_BASE = "/vi";

export function path(page: PageKey, hash?: string): string {
  return `${LOCALE_BASE}${SEGMENT[page]}${hash ? `#${hash}` : ""}`;
}
