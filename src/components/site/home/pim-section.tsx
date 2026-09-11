import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/section";
import { GroupRule, SectionHead } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { productAnchor, routes } from "@/lib/routes";

type PimSignalKind = "analog" | "digital";

/** A static drafting layer. The raster chip beneath it is the only moving part. */
function PimSignalDrawing({ kind }: { kind: PimSignalKind }) {
  const signal =
    kind === "analog"
      ? "M-60 420C10 420 20 286 90 286S160 520 230 520S300 286 370 286S440 520 510 520S580 286 650 286S720 520 790 520S860 286 930 286S1000 520 1070 520S1140 286 1210 286S1280 420 1340 420"
      : "M-40 475H80V315H180V475H300V315H400V475H520V315H620V475H740V315H840V475H960V315H1060V475H1180V315H1240";

  const nodes =
    kind === "analog"
      ? [90, 230, 370, 510, 650, 790, 930, 1070, 1210]
      : [80, 180, 300, 400, 520, 620, 740, 840, 960, 1060, 1180];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 675"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full text-accent"
    >
      <g fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke">
        <path d="M0 395H1200" strokeWidth="0.75" strokeDasharray="2 12" opacity="0.2" />
        <path d={signal} strokeWidth="5" opacity="0.05" />
        <path d={signal} strokeWidth="1.25" opacity="0.62" />
        <path
          d={signal}
          transform="translate(0 18)"
          strokeWidth="0.75"
          strokeDasharray="3 8"
          opacity="0.22"
        />
      </g>

      <g fill="currentColor" opacity="0.56">
        {nodes.map((x, index) => (
          <circle
            key={x}
            cx={x}
            cy={kind === "analog" ? (index % 2 === 0 ? 286 : 520) : index % 2 === 0 ? 315 : 475}
            r="2.75"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * 01 — Processing in Memory. Two columns, Analog then Digital.
 *
 * The mock's CTAs pointed at `#analog` and `#digital`, which do not exist on
 * the product page. They now land on the chips that actually implement each
 * approach: MINT for Analog PIM, ESPRESSO for Digital-PIM.
 */
export function PimSection({ content, locale }: { content: HomeContent["pim"]; locale: Locale }) {
  const copy = dictionary.home.pim;

  const columns = [
    {
      ...copy.analog,
      kind: "analog" as const,
      image: content.imageA,
      href: productAnchor(locale, routes.anchors.mint),
    },
    {
      ...copy.digital,
      kind: "digital" as const,
      image: content.imageB,
      href: productAnchor(locale, routes.anchors.espresso),
    },
  ];

  return (
    <Section
      id={routes.anchors.pim}
      labelledBy="pim-title"
      screen
      spend="between"
      className="glow-pim bg-night-deep"
    >
      <SectionHead
        eyebrow={content.eyebrow[locale]}
        title={content.title[locale]}
        lead={content.lead[locale]}
        headingId="pim-title"
        className="pb-[clamp(16px,1.8vw,28px)]"
      />

      {/* `grow` so the surplus a full screen hands this section lands in the
          two renders rather than in the gaps between the four blocks. */}
      <div className="grid grow gap-x-col lg:grid-cols-2">
        {columns.map((column, index) => (
          <Reveal
            key={column.name}
            delay={index * 0.08}
            className="flex h-full flex-col gap-[clamp(14px,1.6vw,20px)]"
          >
            {/* One card per direction: the copy sits on the render, and only
                the CTA is left below it.

                Stacked — name, render, heading, body, button in five bands —
                this column was 625px tall and the section came to 1.50 screens
                at 1440×900. Folding the three text bands onto the image is what
                buys the height back, and it is the treatment the hero, "Tại sao
                PIM" and the training block already use, so it adds no new idea
                to the page.

                `grow` rather than `flex-1`: grow alone keeps `flex-basis:auto`,
                so the card's own content is its floor and the surplus height a
                full screen hands the section is spent making the render taller.
                `flex-1` would set the basis to 0 and let the box shrink under
                its own type.

                The reveal is bottom *padding*, not a `min-height`. A fixed
                `min-h-[clamp(320px,28vw,460px)]` held at 390px while the copy
                grew to 313px inside it, leaving 7px of chip — the card was
                scrim and type, and the render it exists to show was gone.
                Padding is measured from the end of the copy instead, so the
                same band of image survives at every width and every line
                count. */}
            <div className="pim-technical-card group relative flex grow flex-col overflow-hidden border border-ink/10 pb-[clamp(64px,6vw,84px)]">
              <div aria-hidden className="pim-technical-grid pointer-events-none absolute inset-0" />
              <div className="absolute inset-x-[-7%] top-[18%] bottom-[-14%] z-10">
                <Image
                  src={column.image}
                  alt={column.imageAlt[locale]}
                  fill
                  sizes="(max-width: 1023px) 114vw, 57vw"
                  className="pim-chip-render object-contain object-[50%_76%]"
                />
              </div>
              <PimSignalDrawing kind={column.kind} />
              {/* The scrim rides on the copy block itself rather than on an
                  `inset-0` layer, which is what ties the fade to the height of
                  the type instead of to the height of the card. */}
              <div className="scrim-pim-card relative z-30 flex flex-col gap-4 px-[clamp(18px,2vw,30px)] pt-[clamp(18px,2vw,30px)] pb-[var(--scrim-pim-fade)]">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-kicker text-accent">{column.index}</span>
                  <span className="font-heading text-wordmark tracking-[0.06em]">
                    {column.name}
                  </span>
                </div>

                {/* `text-h3` with the weight held at 600, as `NumberedItem`
                 * does: the token's 700 is meant for the heading face, and the
                 * design refs set these sans sub-heads at 600. */}
                <div className="text-h3 font-semibold">{column.heading[locale]}</div>
                {/* `text-contact`, not `text-body`: #C6D1E5 is the token the
                 * design already reserves for copy that sits over imagery
                 * behind a scrim (handoff § 4, "Text cột trái section Liên
                 * hệ"), and #A8B6CF does not hold up over the brightest part
                 * of this render. Measured against the composited pixels
                 * rather than against the section colour. */}
                <p className="max-w-[42ch] text-lead text-contact">{column.body[locale]}</p>
              </div>
            </div>

            <Button asChild variant="ghost" size="md" className="self-start">
              <Link href={column.href}>{column.cta[locale]}</Link>
            </Button>
          </Reveal>
        ))}
      </div>

      {/* Closing statement. The rule is what separates it from the two-column
          row above: this is the section's conclusion, not a third column.

          One baseline row, not a two-column block. As a `sm:grid-cols-[1fr_auto]`
          block with the lead-in stacked over the statement and the chip PNG at
          168px it stood 233px tall, and 233 of the 317px this section had to
          lose to reach one screen at 1440×900 were sitting right here — the PNG
          alone drove the row height, because 168px is taller than the two lines
          of type beside it. Inline, with the figure at 72px, the row is the
          height of its own type and the PNG is an ornament again rather than
          the tallest thing in the section.

          `text-card-title` rather than `text-h2-detail`: at 27px the statement
          still reads as the loudest line in the row without being a second H2
          competing with the section's own heading three blocks above it. */}
      <GroupRule className="mt-[clamp(16px,1.8vw,26px)]" />

      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2.5 pt-[clamp(14px,1.6vw,22px)] pb-[clamp(4px,0.6vw,10px)]">
        <span className="text-lead text-body">{copy.statementLead[locale]}</span>
        <p className="font-heading text-card-title text-accent">{content.statement[locale]}</p>
        <Image
          src={content.imageC}
          alt=""
          width={72}
          height={72}
          sizes="72px"
          className="ml-auto w-[clamp(40px,3.4vw,52px)] self-center"
        />
      </div>
    </Section>
  );
}
