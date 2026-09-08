import { SectionHead } from "@/components/site/primitives";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

export function CoreStats({ content, locale }: { content: HomeContent["core"]; locale: Locale }) {
  return (
    <section aria-labelledby="core-title" className="home-panel home-core">
      <SectionHead eyebrow={content.eyebrow[locale]} title={content.title[locale]} lead={content.lead[locale]} headingId="core-title" />
      <div className="home-capabilities">
        {dictionary.home.core.cards.map((card) => (
          <article key={card.index}>
            <h3>{card.headline ? card.headline[locale] : card.fromCms ? content.stat : card.value}</h3>
            {card.label ? <span>{card.label[locale]}</span> : null}
            <p>{card.body[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
