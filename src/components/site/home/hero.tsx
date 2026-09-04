import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/primitives";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { anchor, routes } from "@/lib/routes";

/**
 * Hero — full viewport height minus the header, content anchored to the bottom.
 *
 * The background image is `priority` and unoptimised-size-aware: it is the LCP
 * element on the most-visited page, so it must not wait behind the font or the
 * JS bundle. Its `alt` is empty because it is decorative — the headline beside
 * it already carries the meaning, and describing a chip render twice only
 * lengthens a screen reader's path to the CTA.
 */
export function Hero({ content, locale }: { content: HomeContent["hero"]; locale: Locale }) {
  return (
    <section
      id={routes.anchors.top}
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-var(--spacing-header))] items-end overflow-hidden"
    >
      <Image
        src={content.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="scrim-hero pointer-events-none absolute inset-0" />

      <div className="relative flex w-full flex-col gap-[clamp(18px,2.2vw,30px)] px-gutter pb-[clamp(32px,3.8vw,58px)]">
        <div className="flex max-w-[1180px] flex-col gap-5">
          <Eyebrow>{content.eyebrow[locale]}</Eyebrow>
          <h1
            id="hero-title"
            className="max-w-[23ch] font-heading text-h1-hero break-words sm:text-balance"
          >
            {content.title[locale]}
          </h1>
        </div>

        <div className="grid items-end gap-[clamp(24px,3vw,64px)] gap-x-col pt-8 lg:grid-cols-[1fr_1fr_auto]">
          <p className="max-w-[46ch] text-lead-hero text-ink/95">{content.lead[locale]}</p>
          <p className="max-w-[46ch] text-lead-hero text-ink/95">{content.sub[locale]}</p>
          <Button asChild variant="primary" size="lg" className="justify-self-start">
            <Link href={anchor(routes.anchors.pim)}>{content.cta[locale]}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
