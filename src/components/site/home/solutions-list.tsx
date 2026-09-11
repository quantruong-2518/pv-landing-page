import Link from "next/link";

import { SectionHead } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import {
  PRODUCT_SLUG_TO_ANCHOR,
  PRODUCT_SLUGS,
  productAnchor,
  routes,
  type AnchorId,
  type ProductSlug,
} from "@/lib/routes";

/**
 * `solutions.rows[].anchor` (dictionary.ts, owned by the copy agent) mixes
 * three product anchors ("mint", "papaya", "e-series") with one hub section
 * anchor ("phan-mem"). The former now have their own page; the latter is
 * still a section on `/products` (CLAUDE.md: leave `#phan-mem` alone). This
 * map — inverted from `PRODUCT_SLUG_TO_ANCHOR` (routes.ts) rather than
 * assumed — is how a row tells the two apart without the dictionary itself
 * having to change.
 */
const ANCHOR_TO_PRODUCT_SLUG = new Map<AnchorId, ProductSlug>(
  PRODUCT_SLUGS.map((slug) => [PRODUCT_SLUG_TO_ANCHOR[slug], slug]),
);

/**
 * 03 — Solutions. Four full-bleed rows rather than cards.
 *
 * Each row is one link covering number, title, body and arrow, so the whole
 * band is the target — the arrow on its own would be a 28px hit area.
 * `solutions.count` from the CMS decides how many rows appear.
 *
 * The hairline is what makes that target visible. Without it the accent hover
 * band was the only thing that ever revealed where one row ended and the next
 * began, and it is invisible until the pointer is already inside it — nothing
 * at all on a touch screen. Same treatment as /bio's row list: the border sits
 * on the `<li>`, not on the link, because `last:` on the link would match every
 * row (each link is the only child of its own `<li>`). It runs full bleed
 * because the rows do.
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
      spend="between"
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
        {rows.map((row) => {
          const slug = ANCHOR_TO_PRODUCT_SLUG.get(row.anchor as AnchorId);
          const href = slug
            ? routes.product(locale, slug)
            : productAnchor(locale, row.anchor as AnchorId);

          return (
            <li key={row.index} className="border-t border-ink/12 last:border-b">
              <Link
                href={href}
                className="grid grid-cols-[28px_1fr] items-start gap-[clamp(14px,1.6vw,28px)] px-gutter py-[clamp(20px,2.2vw,30px)] text-ink transition-colors hover:bg-accent/7 lg:grid-cols-[44px_minmax(210px,0.9fr)_minmax(260px,1.15fr)_28px]"
              >
                <span className="font-mono text-kicker text-accent">{row.index}</span>
                <span className="font-heading text-h3">{row.title[locale]}</span>
                <span className="col-start-2 text-card text-body lg:col-start-3">
                  {row.body[locale]}
                </span>
                {/* Same step as the title it belongs to, rather than its own
                 * size. The weight is pinned back to 500 because the token's 700
                 * is a heading weight and JetBrains Mono only ships 400/500 here
                 * — asking for 700 would hand the arrow a synthesised bold. */}
                <span
                  aria-hidden
                  className="hidden justify-self-end font-mono text-h3 font-medium text-accent lg:block"
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
