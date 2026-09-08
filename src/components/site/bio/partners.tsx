import { Reveal } from "@/components/motion/reveal";
import { SHEET_TOTAL, SectionMark } from "@/components/site/bio/sheet";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * § 05 — collaboration, as a dated ledger.
 *
 * The home page shows these four items as illustrated cards. Here they are
 * rows: date, headline, one line of detail. A profile sheet is read for the
 * record, and a record is a list — not a gallery.
 *
 * Like the home grid these are not links. There is no /news route and no
 * article URLs, and a row that navigates back to itself is worse than one that
 * does not move. Give them `href` when the route exists.
 *
 * `count` is honoured for the same reason it is on the home page: hiding an
 * item in the CMS has to hide it everywhere it is published.
 */
export function BioPartners({ content, locale }: { content: HomeContent["news"]; locale: Locale }) {
  const copy = dictionary.bio;
  const items = dictionary.home.news.items.slice(0, content.count);

  return (
    <Section id={routes.anchors.bioPartners} labelledBy="bio-partners-title" className="bg-night">
      <SectionMark
        mark={copy.sections.partners.mark}
        total={SHEET_TOTAL}
        title={copy.sections.partners.title[locale]}
        lead={content.lead[locale]}
        headingId="bio-partners-title"
      />

      <ol className="mt-[clamp(26px,3vw,44px)] flex flex-col">
        {items.map((item, index) => (
          <Reveal
            key={item.date}
            as="li"
            delay={index * 0.06}
            className="grid gap-2 gap-x-col border-t border-ink/12 py-[clamp(18px,2vw,28px)] last:border-b md:grid-cols-[7rem_1fr_1.1fr] md:items-baseline"
          >
            <span className="font-mono text-[0.75rem] tracking-[0.1em] text-accent">
              {item.date}
            </span>
            <span className="text-[1.0625rem] leading-[1.5] font-semibold text-ink">
              {item.title[locale]}
            </span>
            <p className="max-w-[52ch] text-card text-body">{item.body[locale]}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
