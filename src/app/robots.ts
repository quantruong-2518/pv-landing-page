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
 *
 * The `*` rule below is the actual rule — it already allows everything an
 * answer-engine crawler would want. The named-crawler rule that follows
 * repeats the same allow/disallow; it changes nothing today. It exists so
 * the welcome is explicit rather than implicit (a maintainer reading this
 * file should not have to infer "answer engines are fine" from a bare `*`),
 * and so there is one place to tighten access for a single crawler later —
 * e.g. disallowing one of these without touching what `*` grants everyone
 * else — without having to add it for the first time under deadline.
 * Yeti and Daum cover Naver and Daum, the two non-Google engines that matter
 * for the /ko locale.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "meta-externalagent",
          "Yeti",
          "Daum",
        ],
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: absolute("/sitemap.xml"),
    host: absolute("/"),
  };
}
