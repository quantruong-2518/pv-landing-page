import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Eyebrow, MarkedText } from "@/components/site/primitives";
import { splitLines } from "@/lib/content/markup";
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
 *
 * Layout is the one signed off in the 2026-09 hero review: the two paragraphs
 * hold the bottom-left, the CTA holds the bottom-right corner from `lg`, and
 * below `md` the secondary paragraph is dropped from view — on a phone it was
 * a quarter of the text block and only restated the first one. It stays in the
 * HTML, so crawlers and /bio (which quotes it) lose nothing.
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
        className="object-cover max-md:object-[62%_50%]"
      />
      <div aria-hidden className="scrim-hero pointer-events-none absolute inset-0" />

      <div className="relative flex w-full flex-col gap-[clamp(18px,2.2vw,30px)] px-gutter pb-[clamp(28px,3.8vw,58px)]">
        <div className="flex max-w-[1180px] flex-col gap-3 md:gap-5">
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <span aria-hidden className="h-0.5 w-3.5 shrink-0 bg-accent md:w-6" />
            {/* Truncate rather than wrap below sm: the line is CMS copy, and a
                longer one than today's must not push past the viewport edge. */}
            <Eyebrow className="min-w-0 max-sm:truncate max-sm:text-eyebrow-compact">
              {content.eyebrow[locale]}
            </Eyebrow>
          </div>
          <h1 id="hero-title" className="font-heading text-h1-hero break-words">
            <HeroTitle title={content.title[locale]} />
          </h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:items-end md:gap-x-col md:gap-y-8 md:pt-8 lg:grid-cols-[minmax(0,46ch)_minmax(0,46ch)_1fr]">
          <p className="max-w-[46ch] text-lead-hero text-ink/95">{content.lead[locale]}</p>
          <p className="hidden max-w-[46ch] text-lead-hero text-ink/62 md:block">
            {content.sub[locale]}
          </p>
          <Button
            asChild
            variant="primary"
            size="lg"
            className="w-full justify-center md:col-span-2 md:w-auto md:justify-self-start lg:col-span-1 lg:justify-self-end"
          >
            <Link href={anchor(routes.anchors.pim)}>{content.cta[locale]}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * The CMS title carries its own typesetting, so each locale can break and
 * accent where its own grammar puts the stress: a newline is a line break from
 * `md` (below it the lines run on and wrap naturally), and `*…*` is the phrase
 * set in the accent colour — the grammar in `lib/content/markup.ts`, which the
 * PIM block's head reads too. A title without either renders exactly as before.
 */
function HeroTitle({ title }: { title: string }) {
  return splitLines(title).map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? " " : null}
      <span className="md:block">
        <MarkedText value={line} />
      </span>
    </Fragment>
  ));
}
