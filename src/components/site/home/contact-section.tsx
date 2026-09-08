import Image from "next/image";

import { ContactForm } from "@/components/site/contact-form";
import { Eyebrow } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * 05 — Contact. Left column is the pitch over the HQ photograph, right column
 * is the working form.
 *
 * The left card bleeds past the section padding so the photograph reaches the
 * section edge while the text keeps its inset. Two things have to be true for
 * that to actually happen, and only one of them used to be:
 *
 *  - the bleed has to be the section's own padding. It was `clamp(24px, 2.6vw,
 *    40px)` against a `py-section` of `clamp(28px, 3vw, 52px)`, so it fell
 *    short by up to 12px on its own.
 *  - the grid has to fill the section. This is a `screen center` block, so on a
 *    wide viewport the content is shorter than the 100svh minimum and
 *    `justify-center` split the surplus above and below it — ~160px at
 *    1440×900. That surplus landed *outside* the card, and the photograph
 *    floated in the middle of the section with a gap at both ends. `grow` hands
 *    the surplus to the grid instead, where the bleed can reach past it; it is
 *    inert at every width where the content is already taller than the minimum.
 *
 * The three mini-stats are pushed to the bottom with `mt-auto`, which is what
 * lines their baseline up with the submit row opposite — the form bottom-
 * anchors its own last row for the same reason.
 */
export function ContactSection({
  content,
  locale,
}: {
  content: HomeContent["contact"];
  locale: Locale;
}) {
  const copy = dictionary.home.contact;

  return (
    <Section
      id={routes.anchors.contact}
      labelledBy="contact-title"
      screen
      center
      className="band-contact bg-navy-lit"
    >
      <div className="grid grow items-stretch gap-[clamp(30px,3.4vw,60px)] gap-x-col lg:grid-cols-2">
        <div className="relative -my-section flex flex-col gap-[clamp(22px,2.6vw,36px)] p-section">
          <Image
            src={content.image}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="z-0 object-cover"
          />
          <div aria-hidden className="scrim-contact pointer-events-none absolute inset-0 z-[1]" />

          <Eyebrow className="relative z-[2]">{copy.eyebrow[locale]}</Eyebrow>
          <h2
            id="contact-title"
            className="relative z-[2] max-w-[20ch] font-heading text-h2 text-balance"
          >
            {content.title[locale]}
          </h2>
          <p className="relative z-[2] max-w-[46ch] text-lead text-contact">
            {content.lead[locale]}
          </p>

          {/* Three columns is a desktop shape. At 390px it left each stat ~110px
           * wide, so every title broke over two lines and the bodies below them
           * stopped agreeing — over the brightest part of the photograph at
           * that. One column below `sm` gives each stat the full width of the
           * card and no title wraps in any of the three locales. */}
          <div className="relative z-[2] mt-auto grid gap-x-3.5 sm:grid-cols-3">
            {copy.stats.map((stat) => (
              <div key={stat.title.en} className="py-3 sm:py-5">
                <div className="text-card font-semibold">{stat.title[locale]}</div>
                <div className="mt-1.5 text-note text-muted">{stat.body[locale]}</div>
              </div>
            ))}
          </div>
        </div>

        <ContactForm
          locale={locale}
          submitLabel={content.cta[locale]}
          note={content.note[locale]}
        />
      </div>
    </Section>
  );
}
