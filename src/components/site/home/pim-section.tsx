import { Eyebrow, MarkedText } from "@/components/site/primitives";
import { PimDirections, type PimDirection } from "@/components/site/home/pim-directions";
import { Section } from "@/components/site/section";
import { splitLines } from "@/lib/content/markup";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

/**
 * 01 — Processing in Memory, as locked in the 2026-09 review (canvas artboards
 * "PIM — Desktop" / "PIM — Mobile").
 *
 * Two changes from what shipped before, both of them the reviewer's call:
 *
 *  - The copy no longer sits *on* the chip renders. Folding it onto the image
 *    was how the old card bought its height back, and it cost the renders: the
 *    scrim covered the part of the chip the section exists to show. The card is
 *    four bands now — name, render, copy, CTA rail — and the render band is the
 *    one that stretches.
 *  - The closing statement row is gone ("cho lên trên hoặc bỏ hẳn đi"), and with
 *    it `pim.statement` and `pim.imageC` in the CMS. Its lead-in sentence said
 *    what the two cards already say, and the chip PNG beside it was the tallest
 *    thing in a section that had to lose 317px to fit one screen.
 *
 * The head is written out here rather than through `SectionHead` because the
 * mock gives it two things that primitive does not have: a second title line set
 * in `muted`, and a lead of two paragraphs on two steps of the scale. Both are
 * typesetting the CMS string carries itself (`lib/content/markup.ts`), so a
 * locale that wants one line and one paragraph still gets them.
 */
export function PimSection({ content, locale }: { content: HomeContent["pim"]; locale: Locale }) {
  const copy = dictionary.home.pim;

  const directions: PimDirection[] = [
    {
      kind: "analog",
      index: copy.analog.index,
      name: copy.analog.name,
      heading: copy.analog.heading[locale],
      body: copy.analog.body[locale],
      cta: copy.analog.cta[locale],
      image: content.imageA,
      imageAlt: copy.analog.imageAlt[locale],
      // The chip lines have their own pages; this used to point at a hub
      // section that the URL split removed, so the button dead-ended.
      href: routes.product(locale, "mint"),
    },
    {
      kind: "digital",
      index: copy.digital.index,
      name: copy.digital.name,
      heading: copy.digital.heading[locale],
      body: copy.digital.body[locale],
      cta: copy.digital.cta[locale],
      image: content.imageB,
      imageAlt: copy.digital.imageAlt[locale],
      href: routes.product(locale, "espresso"),
    },
  ];

  const titleLines = splitLines(content.title[locale]);
  const leadParagraphs = splitLines(content.lead[locale]);

  return (
    <Section
      id={routes.anchors.pim}
      labelledBy="pim-title"
      screen
      spend="between"
      className="glow-pim gap-[clamp(22px,2.6vw,32px)] bg-night-deep"
    >
      <div className="grid gap-row gap-x-col lg:grid-cols-2 lg:items-end">
        <div className="flex flex-col gap-[clamp(10px,1.4vw,18px)]">
          <Eyebrow>{content.eyebrow[locale]}</Eyebrow>
          <h2 id="pim-title" className="font-heading text-h2 text-balance">
            {titleLines.map((line, index) => (
              // Lines after the first are the qualifying half of the headline and
              // are set in `muted`, as the mock does. They are `block` only from
              // `md`: on a phone a 22px display line has no room to break where
              // a desktop layout wants it, so the lines run on and wrap.
              <span key={index} className={cn("md:block", index > 0 && "text-muted")}>
                {index > 0 ? " " : null}
                <MarkedText value={line} />
              </span>
            ))}
          </h2>
        </div>

        <div className="flex max-w-[56ch] flex-col gap-[clamp(10px,1.1vw,14px)]">
          {leadParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={index === 0 ? "text-lead text-contact" : "text-card text-body"}
            >
              <MarkedText value={paragraph} />
            </p>
          ))}
        </div>
      </div>

      <PimDirections directions={directions} />
    </Section>
  );
}
