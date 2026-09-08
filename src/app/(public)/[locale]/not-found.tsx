import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { routes } from "@/lib/routes";

/**
 * 404 inside the public site.
 *
 * It states itself in all three languages because a dead link can arrive from
 * any of them and this page cannot know which: it renders outside the
 * `[locale]` segment's resolved param, so there is no locale to read. The
 * buttons go to the Vietnamese pages, the source language.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-center gap-6 px-gutter">
      <span className="font-mono text-label tracking-[0.14em] text-accent">404</span>
      <h1 className="max-w-[24ch] font-heading text-h2">
        Không tìm thấy trang này
        <span className="mt-2 block text-body" lang="en-US">
          This page does not exist
        </span>
        {/* Hangul needs the Korean face, which this route does not load — the
            font variable is attached per locale and there is no locale here.
            One line of fallback-rendered Korean is the right trade against
            pulling a webfont onto a 404. */}
        <span className="mt-1 block text-body" lang="ko-KR">
          요청하신 페이지를 찾을 수 없습니다
        </span>
      </h1>
      <div className="flex flex-wrap gap-4">
        <Button asChild variant="primary" size="lg">
          <Link href={routes.home(DEFAULT_LOCALE)}>VỀ TRANG CHỦ →</Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href={routes.products(DEFAULT_LOCALE)}>SẢN PHẨM & GIẢI PHÁP →</Link>
        </Button>
      </div>
    </main>
  );
}
