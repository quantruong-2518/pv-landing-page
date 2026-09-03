import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { NumberedItem, ProductKicker } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { ProductContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";

/**
 * 03 — Enterprise AI training.
 *
 * The second paragraph is set fainter than the first on purpose: it says the
 * 2027 roadmap is still at the survey stage, and that qualification has to
 * stay attached to the offer rather than be quietly dropped.
 */
export function TrainingSection({
  content,
  locale,
}: {
  content: ProductContent["training"];
  locale: Locale;
}) {
  const copy = dictionary.product.training;

  return (
    <Section
      id={routes.anchors.training}
      labelledBy="training-title"
      className="glow-training overflow-hidden bg-navy py-section-lg"
    >
      <Image src={content.image} alt="" fill sizes="100vw" className="z-0 object-cover" />
      <div
        aria-hidden
        className="scrim-left-navy-strong pointer-events-none absolute inset-0 z-[1]"
      />

      <div className="relative z-[2]">
        <ProductKicker label={copy.kicker[locale]} meta={copy.meta[locale]} />

        <div className="grid items-start gap-[clamp(26px,3vw,52px)] gap-x-col pt-[clamp(22px,2.4vw,36px)] lg:grid-cols-2">
          <h2 id="training-title" className="max-w-[20ch] font-heading text-h2-detail text-balance">
            {content.title[locale]}
          </h2>
          <div className="flex flex-col gap-4">
            <p className="max-w-[54ch] text-lead text-body">{content.lead[locale]}</p>
            <p className="max-w-[54ch] text-[0.9375rem] leading-[1.7] text-faint">
              {copy.secondary[locale]}
            </p>
          </div>
        </div>

        <div className="mt-[clamp(24px,2.6vw,40px)] grid gap-x-col sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <Reveal key={step.index} delay={index * 0.06}>
              <NumberedItem
                index={step.index}
                title={<span className="font-heading">{step.title[locale]}</span>}
                body={step.body[locale]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
