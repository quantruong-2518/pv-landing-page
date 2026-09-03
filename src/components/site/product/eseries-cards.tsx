import { Reveal } from "@/components/motion/reveal";
import { SpecGrid, VignetteImage } from "@/components/site/primitives";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

/**
 * The two E-Series accelerator cards side by side.
 *
 * E20's figures are set in accent while E10's are not — that contrast is the
 * whole point of showing them together, and it is why the accent flag lives on
 * the spec data rather than on the card.
 */
export function ESeriesCards({ locale }: { locale: Locale }) {
  const copy = dictionary.product.eseries;

  return (
    <>
      <div className="mt-[clamp(24px,2.6vw,40px)] grid gap-x-col lg:grid-cols-2">
        {copy.cards.map((card, index) => (
          <Reveal key={card.name} delay={index * 0.08} className="flex flex-col gap-[18px] py-8">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-heading text-[clamp(1.5rem,2.2vw,2.125rem)] tracking-[0.02em]">
                {card.name}
              </span>
              <span className="font-mono text-label text-accent">{card.index}</span>
            </div>

            <VignetteImage
              src={card.image}
              alt={card.name}
              fit="contain"
              sizes="(max-width: 1023px) 90vw, 380px"
              className="max-w-[clamp(260px,30vw,380px)]"
            />

            <span className="text-[1.0625rem] font-semibold">{card.heading[locale]}</span>
            <p className="max-w-[46ch] text-[0.9375rem] leading-[1.8] text-body">
              {card.body[locale]}
            </p>

            <SpecGrid specs={card.specs} locale={locale} className="mt-1.5" />
          </Reveal>
        ))}
      </div>

      <div className="mt-[clamp(24px,2.6vw,40px)] flex flex-col gap-5 pt-6">
        <div className="flex flex-wrap items-baseline gap-4">
          <span className="font-mono text-label tracking-[0.12em] whitespace-nowrap text-accent">
            {copy.stackLabel}
          </span>
          <span className="text-[1rem] text-contact">{copy.stackLead[locale]}</span>
        </div>
        <ul className="grid gap-x-col sm:grid-cols-2 lg:grid-cols-5">
          {copy.stack.map((item) => (
            <li key={item} className="py-[18px] text-[0.9375rem] text-contact">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
