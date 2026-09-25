import Image from "next/image";
import type { ReactNode, SVGProps } from "react";

import { Reveal } from "@/components/motion/reveal";
import { DetailCta, DetailKicker } from "@/components/site/product/detail";
import { MarkedText, Pill } from "@/components/site/primitives";
import { splitLines } from "@/lib/content/markup";
import type { ProductContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

/**
 * `/products/software` — the standalone enterprise-software page
 * (N-Software-dark mocks, DARK-BUILD-brief PART B). Replaces the hub's old
 * `SoftwareSection` (deleted): that block's single 82% "target completion"
 * figure is gone from this page entirely (brief: "NO 82% anywhere") in
 * favour of the mocks' own two panels — the CRM→ERP→HRM→DMS chain and the
 * AI operations centre that reads all four — which is a fuller, more honest
 * account of the same roadmap than one percentage ever was. `content.
 * software.progress` stays in the CMS schema (still the source for a stat
 * nothing on the public site renders right now) in case a future page wants
 * it back.
 *
 * Same token vocabulary as the just-recoloured `/products/{mint,papaya,
 * espresso}` (`product/detail.tsx`): translucent `ink/[0.035]` panels with a
 * `ink/10` hairline, `ink/[0.04]` tiles inside them, `accent`/`info` for
 * "shipping"/"roadmap" respectively (CLAUDE.md § 2 — CRM alone has a ship
 * date, ERP/HRM/DMS and the operations centre do not).
 */
export function SoftwarePage({
  content,
  locale,
}: {
  content: ProductContent["software"];
  locale: Locale;
}) {
  const copy = dictionary.product.software;
  const shared = dictionary.product.shared;
  const titleLines = splitLines(content.title[locale]);

  return (
    <section className="relative overflow-hidden bg-navy pb-16 lg:pb-24">
      {/* Same faint top-right glow as the recoloured DETAIL hero
          (`.glow-detail-hero`, globals.css) — THEME-BRIEF.md § DARK's "faint
          radial glow top-right" is one rule for every page this brief
          touches, not a new gradient per page. */}
      <div aria-hidden className="glow-detail-hero pointer-events-none absolute inset-x-0 top-0 h-[620px]" />
      {/* Decorative circuit trace, left edge — same path data as the chip
          detail pages (`product/detail.tsx`), copied verbatim from the
          N-Software-dark-Desktop-mock.html, desktop only per that mock. */}
      <CircuitTrace />

      <div className="relative mx-auto max-w-[1440px] px-gutter pt-8 lg:pt-14">
        {/* Hero image — the CMS's own software illustration, masked into the
            hero the same way the chip renders are on the DETAIL pages. */}
        <div className="relative -mx-gutter mb-6 h-[220px] overflow-hidden lg:absolute lg:inset-y-0 lg:right-[-64px] lg:mx-0 lg:mb-0 lg:h-auto lg:w-[46%] xl:w-[54%]">
          <Image
            src={content.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="mask-chip-hero object-cover lg:object-contain"
          />
        </div>

        <div className="relative z-10 flex max-w-[860px] flex-col gap-4 lg:gap-[22px]">
          <DetailKicker label={copy.kicker[locale]} className="text-[13px] lg:text-[18px]" />
          <h1 className="text-[26px] leading-[1.16] font-bold text-balance uppercase lg:text-[46px] lg:leading-[1.14] lg:tracking-[-0.01em]">
            {titleLines.map((line, index) => (
              <span key={index} className={cn("block", index === 0 ? "text-accent" : "text-ink")}>
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[56ch] text-[15px] leading-[1.6] text-body lg:text-[18px] lg:leading-[1.7]">
            <MarkedText value={content.lead[locale]} />
          </p>
          <div className="flex flex-wrap gap-3">
            <Pill tone="accent">{copy.heroPillCrm[locale]}</Pill>
            <Pill tone="info">{copy.heroPillRoadmap[locale]}</Pill>
          </div>
        </div>
      </div>

      {/* "BỘ SẢN PHẨM" — the CRM→ERP→HRM→DMS chain, then the operations
          centre that reads all four (N-Software-dark mocks). */}
      <div className="relative z-10 mt-10 px-gutter lg:mt-16">
        <div className="mx-auto grid max-w-[1440px] gap-x-[44px] gap-y-6 border border-ink/10 bg-ink/[0.035] p-6 lg:grid-cols-[220px_1px_minmax(0,1fr)] lg:gap-y-0 lg:p-11">
          <div className="flex flex-col gap-[18px]">
            <span className="font-mono text-[12px] font-medium tracking-[0.14em] text-accent uppercase">
              {copy.suiteLabel[locale]}
            </span>
            <p className="text-[16px] leading-[1.65] text-body">
              <MarkedText value={copy.suiteBody1[locale]} />
            </p>
            <p className="text-[16px] leading-[1.65] text-body">
              <MarkedText value={copy.suiteBody2[locale]} />
            </p>
          </div>
          <span aria-hidden className="hidden w-px self-stretch bg-ink/10 lg:block" />
          <div className="flex min-w-0 flex-col gap-3.5">
            {/* `→` connectors between cards, `lg` only — a 7-track grid
                (card/arrow/card/arrow/card/arrow/card) below `lg`, exactly
                the training-page.tsx 4-step row's own pattern, matching this
                row's mock (N-Software-dark-Desktop-mock.html: a 22px arrow
                column between each of the four cards). */}
            {/* The 4-across + arrow-connector row (N-Software-dark-Desktop-
                mock.html) only has room for the "01" card's "Ra mắt 12/2026"
                pill at >=1280px — at exactly 1024 (Tailwind `lg`) each of the
                four columns is too narrow and the pill overflows into the
                next card. `xl` keeps the 2-up `sm:grid-cols-2` fallback
                through 1024-1279 instead of forcing four columns early. */}
            <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_18px_minmax(0,1fr)_18px_minmax(0,1fr)_18px_minmax(0,1fr)] xl:gap-y-0">
              {copy.modules.slice(0, 4).map((module, index) => (
                <div key={module.index} className="flex lg:contents">
                  <Reveal delay={index * 0.05} className="flex flex-1">
                    <ChainCard
                      index={module.index}
                      // `modules[].name` is `string | Localized` — CRM/ERP/HRM/
                      // DMS are plain English category names (same rule as
                      // `catalog.hardware[].family`), module 05's own name is
                      // translated. Same read `SoftwareSection` (deleted) used.
                      name={typeof module.name === "string" ? module.name : module.name[locale]}
                      body={module.body[locale]}
                      icon={MODULE_ICONS[index]}
                      badge={
                        index === 0 ? (
                          <Pill tone="accent">{copy.launchLabel[locale]}</Pill>
                        ) : (
                          <Pill tone="info">{shared.roadmapLabel[locale]}</Pill>
                        )
                      }
                      highlighted={index === 0}
                    />
                  </Reveal>
                  {index < 3 ? (
                    <span aria-hidden className="hidden items-center justify-center xl:flex">
                      <ArrowIcon className="size-[18px] text-faint" />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            {/* "05" — the operations centre every module's data reaches.
                Highlighted accent tint, same rule the DETAIL pages' status
                pill uses for "this exists/is committed" vs. roadmap. */}
            <div className="flex flex-col gap-3 border border-accent/45 bg-accent/10 p-5 sm:flex-row sm:items-center sm:gap-6">
              <span className="flex items-center gap-3">
                <span className="font-mono text-[13px] font-medium tracking-[0.08em] text-accent">
                  {copy.modules[4].index}
                </span>
                <SoftwareIcon.chip className="size-[22px] text-accent" />
                <span className="text-[20px] leading-none font-semibold text-ink">
                  {typeof copy.modules[4].name === "string"
                    ? copy.modules[4].name
                    : copy.modules[4].name[locale]}
                </span>
              </span>
              <Pill tone="info">{shared.roadmapLabel[locale]}</Pill>
              <p className="text-[15px] leading-[1.6] text-body sm:flex-1">
                <MarkedText value={copy.modules[4].body[locale]} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* "TRUNG TÂM VẬN HÀNH AI" — the second panel: what the operations
          centre above actually does, as a 4-step row. */}
      <div className="relative z-10 mt-5 px-gutter">
        <div className="mx-auto grid max-w-[1440px] gap-x-[44px] gap-y-6 border border-ink/10 bg-ink/[0.035] p-6 lg:grid-cols-[220px_1px_minmax(0,1fr)] lg:p-11">
          <div className="flex flex-col items-start gap-[18px]">
            <span className="font-mono text-[12px] font-medium tracking-[0.14em] text-accent uppercase">
              {splitLines(copy.hubLabel[locale]).map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </span>
            <Pill tone="info">{shared.roadmapLabel[locale]}</Pill>
          </div>
          <span aria-hidden className="hidden w-px self-stretch bg-ink/10 lg:block" />
          <div className="flex min-w-0 flex-col gap-6">
            <p className="max-w-[72ch] text-[17px] leading-[1.7] text-body">
              <MarkedText value={copy.hubBody[locale]} />
            </p>
            <div className="grid gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {copy.hubSteps.map((step, index) => (
                <Reveal key={step.index} delay={index * 0.05} className="flex">
                  <HubStepCard
                    index={step.index}
                    title={step.title[locale]}
                    body={step.body[locale]}
                    icon={HUB_ICONS[index]}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DetailCta locale={locale} />
    </section>
  );
}

function ChainCard({
  index,
  name,
  body,
  icon: Icon,
  badge,
  highlighted,
}: {
  index: string;
  name: string;
  body: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  badge: ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-3.5 border p-[22px] pb-6",
        highlighted ? "border-accent/45 bg-accent/12" : "border-ink/8 bg-ink/[0.04]",
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-mono text-[13px] font-medium tracking-[0.08em] text-accent">{index}</span>
        {badge}
      </span>
      <span className="flex items-center gap-2.5">
        <Icon className="size-[22px] shrink-0 text-accent" />
        <span className="text-[20px] leading-none font-semibold text-ink">{name}</span>
      </span>
      <p className="text-[15px] leading-[1.6] text-body">{body}</p>
    </div>
  );
}

function HubStepCard({
  index,
  title,
  body,
  icon: Icon,
}: {
  index: string;
  title: string;
  body: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 border border-ink/8 bg-ink/[0.04] p-[22px] pb-6">
      <span className="flex items-center justify-between">
        <span className="font-mono text-[13px] font-medium tracking-[0.08em] text-accent">{index}</span>
        <Icon className="size-[22px] text-accent" />
      </span>
      <span className="text-[18px] leading-[1.35] font-semibold text-ink">{title}</span>
      <span className="text-[15px] leading-[1.55] text-body">{body}</span>
    </div>
  );
}

/** Decorative circuit trace, left edge — identical path data to
 *  `product/detail.tsx`'s own copy (both come from the same locked mock
 *  family), desktop only. */
/** Chain connector arrow, same path data as `training-page.tsx`'s own copy —
 *  both come from the same mock family's "→" separator glyph. */
function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden
      {...props}
    >
      <path d="M4 12h15M14 7l5 5-5 5" />
    </svg>
  );
}

function CircuitTrace() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="120"
      height="420"
      viewBox="0 0 120 420"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className="pointer-events-none absolute top-[84px] left-0 hidden text-accent/[0.13] lg:block"
    >
      <path d="M0 40h40l20 20h40M0 90h60l20-20M0 150h30l30 30h50M0 220h70M0 270h20l25 25h55M0 340h45l20-20h30" />
      <circle cx="100" cy="60" r="3" />
      <circle cx="80" cy="70" r="3" />
      <circle cx="110" cy="180" r="3" />
      <circle cx="70" cy="220" r="3" />
      <circle cx="100" cy="295" r="3" />
      <circle cx="95" cy="320" r="3" />
    </svg>
  );
}

/**
 * The "BỘ SẢN PHẨM" chain's four icons plus the operations centre's own —
 * path data copied verbatim from N-Software-dark-Desktop-mock.html (one
 * `<svg>` per module in source order). Local to this page rather than added
 * to `AppIconId` (dictionary.ts): that type is the hardware cards' own
 * "ỨNG DỤNG" icon set, a different vocabulary from a software module glyph.
 */
const SoftwareIcon = {
  crm: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.1.7 3.5 2.8 3.5 5.7" />
    </svg>
  ),
  erp: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
      <path d="M3 7l9 4 9-4M12 11v10" />
    </svg>
  ),
  hrm: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" />
      <circle cx="9" cy="11" r="2.2" />
      <path d="M5.5 16.5c.6-1.6 1.9-2.5 3.5-2.5s2.9.9 3.5 2.5M14.5 10h4M14.5 13.5h4" />
    </svg>
  ),
  dms: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4M9 12h7M9 16h7" />
    </svg>
  ),
  chip: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <rect x="8" y="8" width="8" height="8" />
      <path d="M10 8V5M14 8V5M10 19v-3M14 19v-3M5 10h3M5 14h3M16 10h3M16 14h3" />
    </svg>
  ),
};

const MODULE_ICONS = [SoftwareIcon.crm, SoftwareIcon.erp, SoftwareIcon.hrm, SoftwareIcon.dms];

/** The "TRUNG TÂM VẬN HÀNH AI" panel's own 4-step icons — again copied
 *  verbatim from the same mock, in the row's own order. */
const HubIcon = {
  aggregate: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M4 4v4l8 6 8-6V4M12 14v7M9 18l3 3 3-3" />
    </svg>
  ),
  analyse: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 16v-4M11 16V8M15 16v-6M19 16V6" />
    </svg>
  ),
  detect: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 17.5v.5" />
    </svg>
  ),
  decide: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12h.01" />
    </svg>
  ),
};

const HUB_ICONS = [HubIcon.aggregate, HubIcon.analyse, HubIcon.detect, HubIcon.decide];
