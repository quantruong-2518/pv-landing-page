import Link from "next/link";
import { MobileDeck } from "@/components/site/home/mobile-deck";
import { SectionHead } from "@/components/site/primitives";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { productAnchor, routes, type AnchorId } from "@/lib/routes";

export function SolutionsList({ content, locale }: { content: HomeContent["solutions"]; locale: Locale }) {
  return (
    <section id={routes.anchors.solutions} aria-labelledby="solutions-title" className="home-panel home-solutions">
      <SectionHead eyebrow={content.eyebrow[locale]} title={content.title[locale]} lead={content.lead[locale]} headingId="solutions-title" />
      <MobileDeck locale={locale} className="home-solution-grid">
        {dictionary.home.solutions.rows.slice(0, content.count).map((row) => (
          <article key={row.index}><Link href={productAnchor(locale, row.anchor as AnchorId)}>
            <h3>{row.title[locale]}</h3><p>{row.body[locale]}</p>
            <span className="home-solution-link">{locale === "vi" ? "Xem giải pháp" : "Explore solution"} <span aria-hidden="true">↗</span></span>
          </Link></article>
        ))}
      </MobileDeck>
    </section>
  );
}
