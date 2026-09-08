import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SHEET_TOTAL, SectionMark } from "@/components/site/bio/sheet";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { productAnchor, routes } from "@/lib/routes";

/**
 * § 01 — what the company works on.
 *
 * The two paragraphs are `home.hero.lead` and `home.hero.sub` verbatim: the
 * profile page states the company's scope in exactly the words the home page
 * already publishes, so an edit in the CMS moves both and neither can drift.
 *
 * Beside them, the four solution rows are reduced to an index — number, title,
 * destination. Their bodies stay on the home page; repeating them here would
 * make this a second home page rather than a contents sheet.
 */
export function BioWork({ content, locale }: { content: HomeContent["hero"]; locale: Locale }) {
  const copy = dictionary.bio;
  const rows = dictionary.home.solutions.rows;

  return (
    <Section id={routes.anchors.bioWork} labelledBy="bio-work-title" className="bg-night">
      <SectionMark
        mark={copy.sections.work.mark}
        total={SHEET_TOTAL}
        title={copy.sections.work.title[locale]}
        headingId="bio-work-title"
      />

      <div className="mt-[clamp(26px,3vw,44px)] grid gap-row gap-x-col lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="max-w-[50ch] text-lead-hero text-ink/95">{content.lead[locale]}</p>
          <p className="max-w-[50ch] text-lead text-body">{content.sub[locale]}</p>
        </div>

        <ol className="flex flex-col">
          {rows.map((row, index) => (
            // The hairline sits on the list item: `last:border-b` on the link
            // inside would match every row, because the link is always the only
            // child of its own <li>.
            <Reveal
              key={row.index}
              as="li"
              delay={index * 0.06}
              className="border-t border-ink/12 last:border-b"
            >
              {/* `items-baseline`, not `items-start`: the number and the arrow
                  were held level with the title by a hand-typed `leading-[1.7]`
                  that happened to match the title's line box. The tokens carry
                  their own line-heights, so the alignment has to be stated —
                  and a baseline is what actually keeps the three level when the
                  title wraps, which it does on a phone in all three locales. */}
              <Link
                href={productAnchor(locale, row.anchor)}
                className="flex items-baseline gap-4 px-3 py-5 text-ink transition-colors hover:bg-accent/9"
              >
                <span className="font-mono text-kicker text-accent">{row.index}</span>
                <span className="flex-1 text-card font-semibold">{row.title[locale]}</span>
                <span aria-hidden className="font-mono text-kicker text-accent">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
