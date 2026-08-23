import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PAGES, path } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${SITE.url}${path(page)}`.replace(/\/$/, "") || SITE.url,
    changeFrequency: "monthly" as const,
    priority: page === "home" ? 1 : 0.7,
  }));
}
