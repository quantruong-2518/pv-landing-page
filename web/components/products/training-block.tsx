import type { Intro, SiteContent, TrainingOffer } from "@/content/types";
import { Figure, OriginTag, Section, SHELL, StatusBadge } from "@/components/ui";
import {
  BlockCta,
  BlockHeadline,
  BlockKicker,
  CAT_BAND,
  CAT_BORDER,
  SpecIsland,
  StepCard,
  StepRow,
  TagRow,
} from "@/components/products/ui";
import { cn } from "@/lib/cn";
import { path } from "@/lib/routes";

/**
 * Canva artboard 7, and the last block on the page: its button is where the
 * page ends now that the embedded form has moved to `/vi/contact` in full.
 *
 * The callout is a boxed line beside the body — the master uses it to keep the
 * 2027 milestone visible as a survey, not a delivery commitment (CLAUDE.md §2).
 */
export function TrainingBlock({ c, intro, offer }: { c: SiteContent; intro: Intro; offer: TrainingOffer }) {
  return (
    <Section id={offer.id} dense tone="dark" className={cn(CAT_BAND.training, "overflow-hidden")}>
      <div className={SHELL}>
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="min-w-0">
            <BlockKicker category="training">{intro.kicker}</BlockKicker>
            <BlockHeadline className="mt-3" headline={offer.headline} name={offer.name} category="training" />
            {offer.tagline ? (
              <p className="mt-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-subtle sm:text-[0.78rem]">
                {offer.tagline}
              </p>
            ) : null}
            {offer.body ? (
              <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-muted">{offer.body}</p>
            ) : null}

            {offer.calloutNote ? (
              <p
                className={cn(
                  "mt-5 max-w-[54ch] border-l-2 bg-surface-training px-4 py-3 text-[0.9rem] leading-relaxed text-fg",
                  CAT_BORDER.training,
                )}
              >
                {offer.calloutNote}
              </p>
            ) : null}

            <TagRow className="mt-5">
              <OriginTag origin={offer.origin} label={c.origin[offer.origin]} />
              <StatusBadge status={offer.status} label={offer.statusNote} />
            </TagRow>
          </div>

          {offer.media.src ? (
            <Figure
              media={offer.media}
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 92vw"
              pendingLabel={c.ui.imagePending}
              className="rounded-xl border-0 shadow-[0_24px_60px_rgb(4_12_19_/_0.42)]"
            />
          ) : null}
        </div>

        <SpecIsland className="mt-8 sm:mt-10">
          <StepRow columns="lg:grid-cols-4">
            {offer.principles.map((item, index) => (
              <StepCard
                key={item.title}
                index={index}
                item={item}
                category="training"
                connect={index < offer.principles.length - 1}
              />
            ))}
          </StepRow>
        </SpecIsland>

        <div className="mt-8">
          <BlockCta href={path("contact")} label={c.products.ctaLabel} fallbackLabel={c.nav.cta} />
        </div>
      </div>
    </Section>
  );
}
