import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * 04 — News & partnerships.
 *
 * Cards are `<article>` elements, not links. The design mock pointed every card
 * and the "all news" button back at `#tin-tuc`, this section's own anchor:
 * there is no /news route and no article URLs yet. A card that scrolls you to
 * where you already are is worse than a card that does not move — so the cards
 * carry their content and nothing else until real destinations exist, at which
 * point wrap each in a Link and restore the CTA.
 *
 * `<time dateTime>` is machine-readable on purpose: it is what lets a crawler
 * date these announcements. The display format stays the Vietnamese DD.MM.YYYY.
 */
export function NewsGrid({ content, locale }: { content: HomeContent["news"]; locale: Locale }) {
  const images = [content.image1, content.image2, content.image3, content.image4];
  const items = dictionary.home.news.items.slice(0, content.count);

  return (
    <Section
      id={routes.anchors.news}
      labelledBy="news-title"
      screen
      center
      className="glow-news bg-navy"
    >
      <SectionHead
        eyebrow={content.eyebrow[locale]}
        title={content.title[locale]}
        lead={content.lead[locale]}
        headingId="news-title"
        align="end"
        className="pb-[clamp(22px,2.6vw,38px)]"
      />

      <div className="-mx-[18px] grid gap-x-[clamp(14px,1.8vw,30px)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal
            key={item.date}
            as="article"
            delay={index * 0.06}
            className="flex h-full flex-col gap-[18px] px-[18px] pt-[26px] pb-[30px]"
          >
            <div className="relative aspect-video">
              <Image
                src={images[index]}
                alt=""
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <time dateTime={toIsoDate(item.date)} className="font-mono text-[0.75rem] text-accent">
              {item.date}
            </time>
            <h3 className="text-[1.125rem] leading-[1.3] font-semibold">{item.title[locale]}</h3>
            <p className="text-card text-body">{item.body[locale]}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** "02.04.2025" → "2025-04-02" for the `datetime` attribute. */
function toIsoDate(display: string): string {
  const [day, month, year] = display.split(".");
  return `${year}-${month}-${day}`;
}
