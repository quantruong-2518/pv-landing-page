import type { MetadataRoute } from "next";

import { absolute } from "@/lib/routes";

/**
 * Crawl rules.
 *
 * Search crawlers and answer-engine crawlers are both welcome — being quotable
 * by an assistant is the point of the structured data and of /llms.txt. What is
 * closed is the CMS and the API: /admin is an internal tool, and /api returns
 * the same content the pages already render, so indexing it only creates
 * duplicates competing with the real page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: absolute("/sitemap.xml"),
    host: absolute("/"),
  };
}
