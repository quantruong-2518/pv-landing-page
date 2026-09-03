import Link from "next/link";

import { SectionHead } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { productAnchor, routes, type AnchorId } from "@/lib/routes";

/**
 * 03 — Solutions. Four full-bleed rows rather than cards.
 *
 * Each row is one link covering number, title, body and arrow, so the whole
 * band is the target — the arrow on its own would be a 28px hit area.
 * `solutions.count` from the CMS decides how many rows appear.
 */
export function SolutionsList({
  content,
  locale,
}: {
  content: HomeContent["solutions"];
  locale: Locale;
}) {
  const rows = dictionary.home.solutions.rows.slice(0, content.count);

  return (
    <Section
      id={routes.anchors.solutions}
      labelledBy="solutions-title"
      screen
      center
      padded={false}
      className="glow-solutions bg-navy-lit py-section"
    >
      <SectionHead
        eyebrow={content.eyebrow[locale]}
        title={content.title[locale]}
        lead={content.lead[locale]}
        headingId="solutions-title"
        className="px-gutter pb-[clamp(24px,2.8vw,42px)]"
      />

      <ul>
        {rows.map((row) => (
          <li key={row.index}>
            <Link
              href={productAnchor(locale, row.anchor as AnchorId)}
              className="grid grid-cols-[28px_1fr] items-start gap-[clamp(14px,1.6vw,28px)] px-gutter py-[clamp(20px,2.2vw,30px)] text-ink transition-colors hover:bg-accent/7 lg:grid-cols-[44px_minmax(210px,0.9fr)_minmax(260px,1.15fr)_28px]"
            >
              <span className="font-mono text-[0.8125rem] text-accent">{row.index}</span>
              <span className="font-heading text-h3">{row.title[locale]}</span>
              <span className="col-start-2 text-[0.9375rem] leading-[1.8] text-body lg:col-start-3">
                {row.body[locale]}
              </span>
              <span
                aria-hidden
                className="hidden justify-self-end font-mono text-[1.125rem] text-accent lg:block"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
