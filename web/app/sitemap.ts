import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PAGES, path } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return (["en", "vi"] as const).flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${SITE.url}${path(locale, page)}`.replace(/\/$/, "") || SITE.url,
      changeFrequency: "monthly" as const,
      priority: page === "home" ? (locale === "en" ? 1 : 0.8) : 0.7,
    })),
  );
}
