import Image from "next/image";

import { ContactForm } from "@/components/site/contact-form";
import { Eyebrow, MarkedText } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * 05 — Contact, as locked with the client on 2026-09-24 (canvas artboards
 * "Liên hệ — Desktop" / "— Mobile").
 *
 * The two arrangements are not two layouts. From `lg` the HQ photograph holds
 * the left half of the section top to bottom, with the eyebrow, title, lead and
 * the three mini-stats set on it; below `lg` the same photograph is a 300px band
 * carrying only the eyebrow and the title, and the lead and the stats read as
 * ordinary copy beneath it. That is one DOM with the photo layer changing which
 * box it resolves against:
 *
 *  - the layer lives inside the eyebrow/title wrapper, which is `relative` on a
 *    phone (so the photo is exactly the 300px band) and `lg:static` (so the same
 *    absolute layer resolves against the column instead and covers all four
 *    blocks). One `<Image>`, not one per breakpoint — a `lg:hidden` twin is still
 *    fetched by the browser, and this is the heaviest asset on the page.
 *  - the photo bleeds to the section edge at both widths, which is why the layer
 *    carries `-inset-x-gutter` while the copy keeps the gutter: full-bleed on a
 *    phone, and from `lg` the column itself is pulled left by the gutter and
 *    pads it back, so the picture reaches the edge and the text does not.
 *
 * The column also bleeds vertically (`-mt-section` / `lg:-mb-section`, padding
 * put back with `lg:py-section`) so the photograph touches the section's top and
 * bottom edges. Two things have to be true for that to actually happen:
 *
 *  - the bleed has to be the section's own padding, not a hand-typed clamp that
 *    falls short of it by up to 12px.
 *  - the grid has to fill the section. This is a `screen center` block, so on a
 *    wide viewport the content is shorter than the 100svh minimum and
 *    `justify-center` split the surplus above and below it — ~160px at 1440×900.
 *    That surplus landed *outside* the card and the photograph floated in the
 *    middle of the section with a gap at both ends. `grow` hands the surplus to
 *    the grid, where the bleed can reach past it; inert at every width where the
 *    content is already taller than the minimum.
 *
 * `lg:gap-x-0`: the mock butts the photograph straight against the form (photo
 * edge at 660/1440, form starting there), so the column gap is spent as padding
 * inside the two halves instead of as a strip of navy between them.
 *
 * The three mini-stats are pushed to the bottom with `mt-auto`, which is what
 * lines their baseline up with the submit row opposite — the form bottom-anchors
 * its own last row for the same reason.
 *
 * The scrims are Tailwind gradients over `--color-navy-lit` rather than the
 * `.scrim-contact` utility: that utility was written for the previous
 * arrangement (it goes *solid* towards the right, which would bury the half of
 * the photograph this design shows) and globals.css is not this change's file.
 * Every stop is the section's own surface token at an alpha, and the fade to
 * `navy-lit/0` rather than `transparent` keeps the midpoint from greying out —
 * Tailwind interpolates gradients in oklab, where a fade to transparent black is
 * not the same colour.
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
      spend="center"
      className="band-contact bg-navy-lit"
    >
      <div className="grid grow items-stretch gap-y-[clamp(22px,2.6vw,36px)] lg:grid-cols-2 lg:gap-x-0">
        <div className="relative -mx-gutter -mt-section flex flex-col gap-5 px-gutter lg:mr-0 lg:-mb-section lg:gap-[22px] lg:py-section lg:pr-section lg:pl-gutter">
          <div className="relative flex min-h-[300px] flex-col justify-end gap-2.5 pb-[22px] lg:static lg:min-h-0 lg:gap-[22px] lg:pb-0">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-gutter inset-y-0 z-0 overflow-hidden lg:inset-x-0"
            >
              {/* `object-position` follows the mock's crop: the building's mass
                  sits right of centre in the asset, and the text goes on the
                  darkened left. */}
              <Image
                src={content.image}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-[62%_center] lg:object-[60%_center]"
              />
              {/* Phone: one upward fade to solid, so the title sits on the
                  section's own surface and the sky stays visible at the top.
                  From `lg`: a 120° wash, heaviest where the copy is and thinnest
                  at the photograph's outer edge. */}
              <div className="scrim-contact-photo absolute inset-0" />
              {/* Second desktop layer: the mini-stats sit on the bottom edge and
                  need near-solid ground under them. */}
              <div className="scrim-contact-foot absolute inset-0 hidden lg:block" />
            </div>

            <Eyebrow className="relative z-[2]">{copy.eyebrow[locale]}</Eyebrow>
            {/* The accent phrase is the CMS string's own `*…*` mark
                (lib/content/markup.ts): where a headline takes its stress
                differs per locale, and the layout cannot guess it. */}
            <h2
              id="contact-title"
              className="relative z-[2] font-heading text-h2 text-balance lg:max-w-[18ch]"
            >
              <MarkedText value={content.title[locale]} />
            </h2>
          </div>

          <p className="relative z-[2] max-w-[46ch] text-lead text-contact">
            <MarkedText value={content.lead[locale]} />
          </p>

          {/* Three columns is a desktop shape. At 390px it left each stat ~110px
           * wide, so every title broke over two lines and the bodies below them
           * stopped agreeing. The mock's phone answer is a row per stat instead
           * — title left, qualifier right — which fits all three locales on one
           * line each and reads as a list rather than a broken grid. */}
          <div className="relative z-[2] mt-auto flex flex-col gap-2.5 sm:grid sm:grid-cols-3 sm:gap-x-5">
            {copy.stats.map((stat) => (
              <div
                key={stat.title.en}
                className="flex items-baseline justify-between gap-3 sm:flex-col sm:items-start sm:gap-1.5"
              >
                <span className="text-card font-semibold">{stat.title[locale]}</span>
                <span className="text-note text-muted">{stat.body[locale]}</span>
              </div>
            ))}
          </div>
        </div>

        <ContactForm locale={locale} submitLabel={content.cta[locale]} note={content.note[locale]} />
      </div>
    </Section>
  );
}
