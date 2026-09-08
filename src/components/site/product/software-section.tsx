import Image from "next/image";
import Link from "next/link";

import { ProgressTrack } from "@/components/motion/progress-track";
import { Reveal } from "@/components/motion/reveal";
import { ProductKicker } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import type { ProductContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { anchor, routes } from "@/lib/routes";

/**
 * 02 — Enterprise software. Dashboard photograph behind an accent bloom and a
 * heavy vertical fade, so the five module columns at the bottom sit on solid
 * navy while the top of the image still reads.
 *
 * The percentage is explicitly a target for a 12/2026 release, not a shipped
 * capability — which is why the kicker carries "EXPECTED 12/2026" and the
 * figure is labelled "target completion" rather than left to speak for itself.
 */
export function SoftwareSection({
  content,
  locale,
}: {
  content: ProductContent["software"];
  locale: Locale;
}) {
  const copy = dictionary.product.software;

  return (
    <Section
      id={routes.anchors.software}
      labelledBy="software-title"
      screen
      className="overflow-hidden bg-navy-lit py-section-lg"
    >
      <Image src={content.image} alt="" fill sizes="100vw" className="z-0 object-cover" />
      <div aria-hidden className="scrim-software pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-[2] flex h-full flex-col">
        <ProductKicker label={copy.kicker[locale]} meta={copy.meta[locale]} />

        <div className="grid items-start gap-[clamp(26px,3vw,52px)] gap-x-col pt-[clamp(22px,2.4vw,36px)] lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 id="software-title" className="font-heading text-h2-detail text-balance">
              {content.title[locale]}
            </h2>
            <p className="max-w-[58ch] text-lead text-body">{content.lead[locale]}</p>
            <Button asChild variant="ghost" size="md" className="self-start">
              <Link href={anchor(routes.anchors.contact)}>
                {dictionary.product.shared.consult[locale]}
              </Link>
            </Button>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <span className="font-heading text-stat-xl text-accent">{content.progress}%</span>
            <span className="font-mono text-kicker whitespace-nowrap text-muted">
              {copy.progressLabel[locale]}
            </span>
            <ProgressTrack value={content.progress} label={copy.progressLabel[locale]} />
          </div>
        </div>

        {/* No `lg:items-end`: bottom-aligning the columns pushed module 05 —
            the only one with a three-line body — 54px above 01–04, so the
            `01 02 03 04 05` line stopped being a line. The numbers are the
            rhythm of this row, so the tops align and the bodies end where
            their length ends. */}
        <div className="mt-auto grid gap-x-[clamp(16px,1.8vw,32px)] pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {copy.modules.map((module, index) => (
            <Reveal
              key={module.index}
              delay={index * 0.06}
              className="flex flex-col gap-3 pt-7 pb-8"
            >
              <span className="font-mono text-label text-accent">{module.index}</span>
              {/* `text-h3 font-semibold` is what `NumberedItem` sets for the
                  training steps below: same kind of numbered column, so the
                  two rows read as one component rather than two. */}
              <span className="font-heading text-h3 font-semibold">
                {typeof module.name === "string" ? module.name : module.name[locale]}
              </span>
              <span className="text-card text-body">{module.body[locale]}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
