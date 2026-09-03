import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { routes } from "@/lib/routes";

/**
 * 404 inside the public site. Bilingual because a dead link can arrive from
 * either language and this page cannot know which.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-center gap-6 px-gutter">
      <span className="font-mono text-label tracking-[0.14em] text-accent">404</span>
      <h1 className="max-w-[20ch] font-heading text-h2">
        Không tìm thấy trang này
        <span className="mt-2 block text-body">This page does not exist</span>
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
