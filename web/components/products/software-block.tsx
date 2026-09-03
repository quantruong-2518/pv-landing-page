import type { Intro, SiteContent, SoftwareGroup } from "@/content/types";
import { Figure, OriginTag, Section, SHELL, StatusBadge } from "@/components/ui";
import {
  BlockCta,
  BlockHeadline,
  BlockKicker,
  CAT_BAND,
  SpecIsland,
  StepCard,
  StepRow,
  TagRow,
} from "@/components/products/ui";
import { cn } from "@/lib/cn";
import { path } from "@/lib/routes";

/**
 * Canva artboard 6. Same anatomy as a hardware block, with the module row
 * standing where the numbers stand: five connected steps instead of stat tiles.
 *
 * The master's hero is a dashboard mock-up carrying an "82%" that is in no
 * source — `docs/01-proof-bank.md` does not hold it, so it does not ship
 * (CLAUDE.md §2). The existing abstract suite illustration takes that slot: it
 * shows the same five modules converging and states no figure at all.
 */
export function SoftwareBlock({ c, intro, group }: { c: SiteContent; intro: Intro; group: SoftwareGroup }) {
  return (
    <Section id={group.id} dense tone="dark" className={cn(CAT_BAND.software, "overflow-hidden")}>
      <div className={SHELL}>
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="min-w-0">
            <BlockKicker category="software">{intro.kicker}</BlockKicker>
            <BlockHeadline className="mt-3" headline={group.headline} name={group.name} category="software" />
            {group.tagline ? (
              <p className="mt-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-subtle sm:text-[0.78rem]">
                {group.tagline}
              </p>
            ) : null}
            {group.body ? (
              <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-muted">{group.body}</p>
            ) : null}

            <TagRow className="mt-5">
              <OriginTag origin={group.origin} label={c.origin[group.origin]} />
              <StatusBadge status={group.status} label={group.statusNote ?? c.status[group.status]} />
            </TagRow>
          </div>

          {group.media.src ? (
            <Figure
              media={group.media}
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 92vw"
              pendingLabel={c.ui.imagePending}
              className="rounded-xl border-0 shadow-[0_24px_60px_rgb(4_12_19_/_0.42)]"
            />
          ) : null}
        </div>

        <SpecIsland className="mt-8 sm:mt-10">
          <StepRow columns="lg:grid-cols-5">
            {group.modules.map((item, index) => (
              <StepCard
                key={item.title}
                index={index}
                item={item}
                category="software"
                connect={index < group.modules.length - 1}
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
