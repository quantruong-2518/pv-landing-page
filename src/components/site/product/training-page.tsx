import Image from "next/image";
import type { ReactNode, SVGProps } from "react";

import { Reveal } from "@/components/motion/reveal";
import { DetailCta, DetailKicker, DetailPill } from "@/components/site/product/detail";
import { MarkedText, Pill } from "@/components/site/primitives";
import type { ProductContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

/**
 * `/products/training` — the standalone enterprise AI training page
 * (N-Training-dark mocks, DARK-BUILD-brief PART B). Replaces the hub's old
 * `TrainingSection` (deleted).
 *
 * `content.training.title` / `.lead` (seed.ts) are read unchanged, per the
 * brief: unlike `product.software`, this page's CMS copy was not cleared to
 * update — they already say almost verbatim what the mock's hero does. No
 * `**mark**` was added to `content.training.lead` for that reason (it is a
 * CMS field, out of scope here); `dictionary.product.training.steps[].body`
 * did get marks, since that file is fixed copy this task owns.
 */
export function TrainingPage({
  content,
  locale,
}: {
  content: ProductContent["training"];
  locale: Locale;
}) {
  const copy = dictionary.product.training;
  const shared = dictionary.product.shared;

  return (
    <section className="relative overflow-hidden bg-navy pb-16 lg:pb-24">
      <div aria-hidden className="glow-detail-hero pointer-events-none absolute inset-x-0 top-0 h-[560px]" />
      <CircuitTrace />

      <div className="relative mx-auto max-w-[1440px] px-gutter pt-8 lg:pt-14">
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

        <div className="relative z-10 flex max-w-[860px] flex-col gap-3.5 lg:gap-[18px]">
          <DetailKicker label={copy.kicker[locale]} className="text-[13px] lg:text-[18px]" />
          <TrainingTitle
            value={content.title[locale]}
            locale={locale}
            className="text-[26px] leading-[1.16] font-bold text-balance text-ink uppercase lg:text-[46px] lg:leading-[1.14] lg:tracking-[-0.01em]"
          />
          <p className="mt-1 max-w-[54ch] text-[15px] leading-[1.6] text-body lg:text-[18px] lg:leading-[1.7]">
            {content.lead[locale]}
          </p>
          <p className="max-w-[60ch] text-[14px] leading-[1.6] text-body lg:text-[15px]">
            {copy.secondary[locale]}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-2.5">
            <Pill tone="info">{copy.heroPillSurvey[locale]}</Pill>
            <DetailPill>{shared.roadmapLabel[locale]}</DetailPill>
          </div>
        </div>
      </div>

      {/* "CÁCH XÂY DỰNG CHƯƠNG TRÌNH" — opaque `navy`, matching THEME-BRIEF's
          "#0d1422 where a panel straddles the hero/band edge" (navy is a few
          hex units from that value, see the note on `DetailPanel`,
          product/detail.tsx). */}
      <div className="relative z-10 mt-5 px-gutter">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 border border-ink/10 bg-navy p-6 lg:p-11">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[12px] font-medium tracking-[0.14em] text-accent uppercase">
              {copy.buildLabel[locale]}
            </span>
            <span className="font-mono text-[12px] font-medium tracking-[0.14em] text-faint uppercase">
              {copy.stepsCountLabel[locale]}
            </span>
          </div>
          {/* Below `sm`: a snap-scroll row, one card in view at a time — the
              mock's mobile carousel (N-Training-dark-Mobile-mock.html), kept
              CSS-only (no scroll listener) since nothing here needs a
              client component: the static dots below just mark the resting,
              scrolled-to-start position a fresh page load shows.
              `sm`–`lg`: a 2-col grid. `lg` and up: one row of 4 cards +
              connecting arrows — 7 flat grid children once `lg:contents`
              unwraps each `step.index` wrapper, so the track needs 7
              columns (four `1fr` cards, three 18px arrow gutters), not 4:
              `lg:grid-cols-4` here previously wrapped the row into 2×2. */}
          <div
            className={cn(
              "flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1",
              "sm:grid sm:snap-none sm:grid-cols-2 sm:gap-x-3 sm:gap-y-3 sm:overflow-visible sm:pb-0",
              "lg:grid-cols-[minmax(0,1fr)_18px_minmax(0,1fr)_18px_minmax(0,1fr)_18px_minmax(0,1fr)] lg:gap-x-0",
            )}
          >
            {copy.steps.map((step, index) => (
              <div
                key={step.index}
                className="flex w-[82%] shrink-0 snap-start items-stretch sm:w-auto sm:shrink lg:contents"
              >
                <Reveal delay={index * 0.05} className="flex flex-1">
                  <StepCard
                    index={step.index}
                    icon={STEP_ICONS[index]}
                    title={step.title[locale]}
                    body={<MarkedText value={step.body[locale]} />}
                  />
                </Reveal>
                {index < copy.steps.length - 1 ? (
                  <span aria-hidden className="hidden shrink-0 items-center justify-center px-1 lg:flex">
                    <ArrowIcon className="size-[18px] text-ink/28" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          {/* Static pagination read-out, mobile carousel only — matches the
              mock's resting (unscrolled) state; see the comment above. */}
          <div className="flex items-center justify-between sm:hidden">
            <div className="flex gap-1.5">
              {copy.steps.map((step, index) => (
                <span
                  key={step.index}
                  aria-hidden
                  className={cn("h-0.5", index === 0 ? "w-[22px] bg-accent" : "w-3 bg-ink/10")}
                />
              ))}
            </div>
            <span className="font-mono text-[12px] font-medium tracking-[0.08em] text-faint">
              01 / {String(copy.steps.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* "LỘ TRÌNH 2027" — same opaque-navy panel treatment. */}
      <div className="relative z-10 mt-4 px-gutter">
        <div className="mx-auto grid max-w-[1440px] gap-x-12 gap-y-6 border border-ink/10 bg-navy p-6 lg:grid-cols-[340px_1px_minmax(0,1fr)] lg:p-11">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[12px] font-medium tracking-[0.14em] text-accent uppercase">
              {copy.roadmap2027Label[locale]}
            </span>
            <p className="text-[16px] leading-[1.65] text-body">
              <MarkedText value={copy.roadmap2027Body[locale]} />
            </p>
          </div>
          <span aria-hidden className="hidden w-px self-stretch bg-ink/10 lg:block" />
          <div className="grid items-stretch gap-x-3 gap-y-4 sm:grid-cols-[minmax(0,1fr)_18px_minmax(0,1fr)]">
            <PhaseCard
              index="01"
              year="2027"
              status={copy.currentPhaseLabel[locale]}
              title={copy.phase1Title[locale]}
              current
            />
            <span aria-hidden className="hidden items-center justify-center sm:flex">
              <ArrowIcon className="size-[18px] text-ink/28" />
            </span>
            <PhaseCard
              index="02"
              year="2027"
              status={copy.nextPhaseLabel[locale]}
              title={copy.phase2Title[locale]}
            />
          </div>
        </div>
      </div>

      <DetailCta locale={locale} />
    </section>
  );
}

/**
 * `content.training.title` (seed.ts) is CMS copy, read verbatim — but
 * N-Training-dark-Desktop-mock.html colours its topic phrase in accent while
 * the rest stays `text-ink`, and that phrase leads the sentence in VI/EN but
 * trails it in KO ("... 기업 AI 교육"). A per-locale substring match (not a
 * fixed word count, which would colour the wrong words in KO) reproduces the
 * mock without adding markup to the stored CMS string; if a future CMS edit
 * drops the phrase, `indexOf` returns -1 and the title just renders plain,
 * same as before this split existed.
 */
const TITLE_ACCENT: Record<Locale, string> = {
  vi: "ĐÀO TẠO AI",
  en: "ENTERPRISE AI",
  ko: "AI 교육",
};

function TrainingTitle({
  value,
  locale,
  className,
}: {
  value: string;
  locale: Locale;
  className?: string;
}) {
  const phrase = TITLE_ACCENT[locale];
  const at = value.indexOf(phrase);
  if (at === -1) {
    return <h1 className={className}>{value}</h1>;
  }
  const end = at + phrase.length;
  return (
    <h1 className={className}>
      {value.slice(0, at)}
      <span className="text-accent">{value.slice(at, end)}</span>
      {value.slice(end)}
    </h1>
  );
}

function StepCard({
  index,
  icon: Icon,
  title,
  body,
}: {
  index: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  title: string;
  body: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-3 border border-ink/6 bg-ink/[0.04] p-[26px] pb-[30px]">
      <span className="flex items-center justify-between">
        <span className="font-mono text-[15px] font-medium tracking-[0.04em] text-accent">{index}</span>
        <Icon className="size-[26px] text-accent" />
      </span>
      <span className="mt-2 text-[19px] leading-[1.3] font-semibold text-ink">{title}</span>
      <p className="text-[15px] leading-[1.65] text-body">{body}</p>
    </div>
  );
}

function PhaseCard({
  index,
  year,
  status,
  title,
  current,
}: {
  index: string;
  year: string;
  status: string;
  title: string;
  current?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3.5 border border-ink/6 bg-ink/[0.04] p-[26px] pb-7",
        current && "border-t-2 border-t-accent",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="font-mono text-[15px] font-medium tracking-[0.04em] text-accent">{index}</span>
        <Pill tone="info">{year}</Pill>
        <span
          className={cn(
            "whitespace-nowrap text-[14px] font-medium",
            current ? "font-semibold text-accent" : "text-faint",
          )}
        >
          {status}
        </span>
      </div>
      <span className="text-[19px] leading-[1.3] font-semibold text-ink">{title}</span>
    </div>
  );
}

function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M4 12h15M14 7l5 5-5 5" />
    </svg>
  );
}

/** Decorative circuit trace, left edge — same path data as
 *  `product/detail.tsx` and `product/software-page.tsx`. */
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

/** The 4-step row's own icons — path data copied verbatim from
 *  N-Training-dark-Desktop-mock.html, in the row's own order. Local to this
 *  page for the same reason `software-page.tsx`'s icons are: a different
 *  glyph vocabulary from `AppIconId` (dictionary.ts). */
const StepIcon = {
  survey: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M4 5h9M4 10h6M4 15h4" />
      <circle cx="15.5" cy="14.5" r="4" />
      <path d="M18.5 17.5L21 20" />
    </svg>
  ),
  design: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  ),
  practice: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <rect x="3" y="4" width="18" height="12" />
      <path d="M8 20h8M12 16v4" />
      <path d="M10 8l4 2-4 2z" />
    </svg>
  ),
  roi: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden {...props}>
      <path d="M4 20h16" />
      <path d="M6 16v-3M10 16v-6M14 16v-4M18 16V7" />
      <path d="M5 9l5-4 4 3 5-4" />
    </svg>
  ),
};

const STEP_ICONS = [StepIcon.survey, StepIcon.design, StepIcon.practice, StepIcon.roi];
