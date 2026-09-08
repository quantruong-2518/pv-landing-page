import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SHEET_TOTAL, SectionMark } from "@/components/site/bio/sheet";
import { VignetteImage } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { productAnchor, routes, type AnchorId } from "@/lib/routes";

/**
 * § 02 — the two PIM directions, on the sheet's one daylight band.
 *
 * The inversion is the page's biggest visual move and it costs nothing in theme
 * terms: `.bio-day` swaps the text tokens for the day scale, so every shared
 * primitive inside it re-resolves on the light surface without a single
 * hard-coded colour (globals.css, "/bio — the company profile sheet").
 *
 * What this block does *not* do is repeat the home PIM section. That one now
 * renders the signal diagrams from `pim.imageA` / `imageB` under a heading and
 * a body; showing the same two pictures under the same two headings one click
 * later is the failure mode of a profile page. So the sheet takes the angle
 * only a profile can take: which parts actually implement each direction, and
 * where each of those parts stands today.
 *
 * That list is filtered out of the catalogue badges — "ANALOG PIM · 05/2023",
 * "DIGITAL PIM · Q3/2026" — rather than written out here. A part that changes
 * families, or a date that moves, moves with it; and E-Series, whose badge
 * reads "GP-GPU / GP-DSA", correctly appears under neither.
 *
 * The chip renders are the two the home block left behind when it moved to the
 * signal diagrams. They are still in the CMS asset list, so nothing is orphaned
 * by using them, and the page gains imagery that exists nowhere else.
 */
export function BioDirections({
  content,
  locale,
}: {
  content: HomeContent["pim"];
  locale: Locale;
}) {
  const copy = dictionary.bio;
  const pim = dictionary.home.pim;
  const hardware = dictionary.product.catalog.hardware;

  const columns = [
    {
      ...pim.analog,
      image: copy.directions.analogImage,
      href: productAnchor(locale, routes.anchors.mint),
      parts: hardware.filter((card) => card.badge.startsWith("ANALOG PIM")),
    },
    {
      ...pim.digital,
      image: copy.directions.digitalImage,
      href: productAnchor(locale, routes.anchors.espresso),
      parts: hardware.filter((card) => card.badge.startsWith("DIGITAL PIM")),
    },
  ];

  return (
    <Section id={routes.anchors.bioTech} labelledBy="bio-tech-title" className="bio-day">
      <SectionMark
        mark={copy.sections.tech.mark}
        total={SHEET_TOTAL}
        title={copy.sections.tech.title[locale]}
        lead={content.lead[locale]}
        headingId="bio-tech-title"
      />

      <div className="mt-[clamp(26px,3vw,44px)] grid gap-x-col lg:grid-cols-2">
        {columns.map((column, index) => (
          <Reveal
            key={column.name}
            delay={index * 0.08}
            className="flex h-full flex-col gap-5 border-t border-ink/20 pt-[clamp(20px,2.2vw,32px)] pb-[clamp(24px,2.6vw,40px)]"
          >
            <div className="flex items-baseline gap-3.5">
              <span className="font-mono text-kicker text-accent">{column.index}</span>
              <span className="font-heading text-wordmark tracking-[0.06em]">{column.name}</span>
            </div>

            {/* Mounted plate, not a bare render.
                Both chips were photographed on black with a blue bloom, and § 02
                is the sheet's one inverted band: dropped straight onto the ice
                ground, `mask-vignette-contain` fades them into it and they read
                as dark rectangles with a halo rather than as pictures. Giving
                them back a `night-deep` ground — the surface the figure wall
                uses two sections later — is what makes the vignette land on the
                colour it was cut for. The hairline frame and the ring of band
                showing through the padding are the masthead's device: "a
                hairline frame is what makes this one read as a plate in a
                document". No new colour: both tokens already exist, and
                `.bio-day` re-resolves `border-ink` to the day scale for us. */}
            <div className="border border-ink/20 p-[clamp(10px,1.2vw,18px)]">
              <div className="bg-night-deep">
                <VignetteImage
                  src={column.image}
                  alt={column.name}
                  fit="contain"
                  sizes="(max-width: 1023px) 92vw, 44vw"
                />
              </div>
            </div>

            <p className="max-w-[46ch] text-card text-body">{column.body[locale]}</p>

            <div className="flex flex-col gap-1 pt-1">
              <span className="font-mono text-label text-faint">
                {copy.directions.implementedBy[locale]}
              </span>
              <ul className="flex flex-col">
                {column.parts.map((part) => (
                  <li key={part.name}>
                    <Link
                      href={productAnchor(locale, part.anchor as AnchorId)}
                      className="flex flex-col gap-1 border-b border-ink/14 py-3 transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <span className="text-card font-semibold">{part.name}</span>
                      <span className="font-mono text-label whitespace-nowrap text-faint">
                        {part.badge}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild variant="outline" size="md" className="mt-auto self-start">
              <Link href={column.href}>{column.cta[locale]}</Link>
            </Button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
