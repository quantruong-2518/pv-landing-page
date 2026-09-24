import { NewsBoard, type NewsStory } from "@/components/site/home/news-board";
import { MarkedText, SectionHead } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * 04 — News & partnerships.
 *
 * The section is the head plus `NewsBoard`, which holds the layout the client
 * locked on 2026-09-24: one featured story beside three compact rows from `md`,
 * one story per screen in a slider below it. The head stays here because it is
 * static, so only the board — which needs `useState` for the slider — crosses
 * the client boundary. Each story is flattened to strings before it does, so the
 * dictionaries and the `Localized` values never travel.
 *
 * Full height from `md`, surplus spent `between`. Forcing the min-height with
 * `center` centred the grid in a mostly empty section — ~31% empty measured at
 * 1360px wide — which is why this block lost `screen` the first time round.
 * Anchoring the header to the top edge and letting the featured story's image
 * grow into the rest spends the same surplus without the hole.
 */
export function NewsGrid({ content, locale }: { content: HomeContent["news"]; locale: Locale }) {
  const images = [content.image1, content.image2, content.image3, content.image4];

  const stories: NewsStory[] = dictionary.home.news.items
    .slice(0, content.count)
    .map((item, index) => ({
      date: item.date,
      iso: toIsoDate(item.date),
      title: item.title[locale],
      body: item.body[locale],
      image: images[index],
    }));

  return (
    <Section
      id={routes.anchors.news}
      labelledBy="news-title"
      screen
      spend="between"
      className="glow-news bg-navy"
    >
      <SectionHead
        eyebrow={content.eyebrow[locale]}
        title={content.title[locale]}
        // The lead carries `**…**` emphasis, so it is a node rather than a
        // string — `SectionHead` types `lead` as `ReactNode` for exactly this.
        lead={<MarkedText value={content.lead[locale]} />}
        headingId="news-title"
        align="end"
        className="pb-[clamp(22px,2.6vw,38px)]"
      />

      <NewsBoard
        stories={stories}
        controls={{
          previous: dictionary.home.news.controls.previous[locale],
          next: dictionary.home.news.controls.next[locale],
        }}
      />
    </Section>
  );
}

/** "02.04.2025" → "2025-04-02" for the `datetime` attribute. */
function toIsoDate(display: string): string {
  const [day, month, year] = display.split(".");
  return `${year}-${month}-${day}`;
}
