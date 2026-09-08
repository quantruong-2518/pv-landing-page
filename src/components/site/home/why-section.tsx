import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { NumberedItem } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

/**
 * "Why does PIM matter for AI?" — the NPU↔DRAM diagram sits behind the copy,
 * fading in from the right so the text always lands on the dark side of the
 * image rather than on the diagram itself.
 *
 * The scrim is the `-strong` variant, not the plain one. Plain `scrim-left-navy`
 * bottoms out at 58% navy on the right edge, and this section puts copy there —
 * the lead paragraph fills the right half of the header grid and card 03 is the
 * third of three columns — so both landed on the brightest part of the
 * photograph and read a full contrast step below cards 01/02. The strong variant
 * ends at 86%, which is what the training block on /products already uses over
 * the same kind of photography: the image still reads through, the copy no
 * longer competes with it.
 *
 * Layer order is explicit (image 0, scrim 1, content 2) rather than relying on
 * source order: a negative z-index would put the image behind the section's own
 * background colour and make it disappear entirely.
 *
 * Sized to its content rather than `screen`: the copy here is only a header and
 * three short cards, so pinning it to the viewport left a void above and below
 * that grew as the window narrowed and lines wrapped less. Measured at 1360px
 * wide — 220px of empty margin on each side, more than half the section.
 */
export function WhySection({ content, locale }: { content: HomeContent["why"]; locale: Locale }) {
  return (
    <Section labelledBy="why-title" className="overflow-hidden bg-navy">
      <Image src={content.image} alt="" fill sizes="100vw" className="z-0 object-cover" />
      <div
        aria-hidden
        className="scrim-left-navy-strong pointer-events-none absolute inset-0 z-[1]"
      />

      <div className="relative z-[2] grid items-start gap-row gap-x-col lg:grid-cols-2">
        <h2 id="why-title" className="max-w-[18ch] font-heading text-h2 text-balance">
          {content.title[locale]}
        </h2>
        <p className="max-w-[62ch] text-lead text-body">{content.lead[locale]}</p>
      </div>

      <div className="relative z-[2] mt-[clamp(26px,3vw,44px)] grid gap-x-col sm:grid-cols-2 lg:grid-cols-3">
        {dictionary.home.why.cards.map((card, index) => (
          <Reveal key={card.index} delay={index * 0.08}>
            <NumberedItem index={card.index} title={card.title[locale]} body={card.body[locale]} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
