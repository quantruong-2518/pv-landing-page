import { SectionHead } from "@/components/site/primitives";
import { MobileDeck } from "@/components/site/home/mobile-deck";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/** Editorial layout: no illustrative photo presented as a record of an event. */
export function NewsGrid({ content, locale }: { content: HomeContent["news"]; locale: Locale }) {
  return (
    <section id={routes.anchors.news} aria-labelledby="news-title" className="home-panel home-news">
      <SectionHead eyebrow={content.eyebrow[locale]} title={content.title[locale]} lead={content.lead[locale]} headingId="news-title" />
      <MobileDeck locale={locale} className="home-news-list">
        {dictionary.home.news.items.slice(0, content.count).map((item) => (
          <article key={item.date}>
            <time dateTime={item.date.split(".").reverse().join("-")}>{item.date}</time>
            <div><h3>{item.title[locale]}</h3><p>{item.body[locale]}</p></div>
          </article>
        ))}
      </MobileDeck>
    </section>
  );
}
