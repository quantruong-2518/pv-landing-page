import type { SiteContent, WhyNowComparison } from "@/content/types";
import Image from "next/image";
import { path } from "@/lib/routes";
import { PageShell } from "@/components/page-shell";
import {
  Body,
  Button,
  Illustration,
  Lead,
  OriginTag,
  Section,
  SectionDivider,
  SectionHead,
  SHELL,
  StatusBadge,
} from "@/components/ui";
import { cn } from "@/lib/cn";

function DirectionComparison({ comparison }: { comparison: WhyNowComparison }) {
  if (comparison.items.length === 0) return null;

  return (
    <div className="mt-10 border-y border-line-strong sm:mt-12">
      <div className="hidden grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] border-b border-line md:grid">
        <p className="py-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
          {comparison.painLabel}
        </p>
        <span aria-hidden />
        <p className="py-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
          {comparison.responseLabel}
        </p>
      </div>

      <ol>
        {comparison.items.map((item) => (
          <li key={item.id} className="border-b border-line py-7 last:border-b-0 md:py-8">
            <div className="md:hidden">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                {comparison.painLabel}
              </p>
              <h4 className="mt-2 text-lg font-semibold leading-snug text-fg">{item.painTitle}</h4>
              <Body className="mt-2">{item.painBody}</Body>

              <div className="flex h-12 justify-center py-2" aria-hidden>
                <span className="relative h-full w-px bg-line-strong after:absolute after:bottom-0 after:left-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:rotate-45 after:border after:border-accent after:bg-bg" />
              </div>

              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                {comparison.responseLabel}
              </p>
              <h4 className="mt-2 text-lg font-semibold leading-snug text-fg">{item.responseTitle}</h4>
              <Body className="mt-2">{item.responseBody}</Body>
            </div>

            <div className="hidden grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] items-center md:grid">
              <div className="pr-6">
                <h4 className="text-lg font-semibold leading-snug text-fg">{item.painTitle}</h4>
                <Body className="mt-2">{item.painBody}</Body>
              </div>
              <div className="flex items-center gap-2" aria-hidden>
                <span className="h-px flex-1 bg-line-strong" />
                <span className="h-2 w-2 rotate-45 border border-accent bg-bg" />
                <span className="h-px flex-1 bg-line-strong" />
              </div>
              <div className="pl-6">
                <h4 className="text-lg font-semibold leading-snug text-fg">{item.responseTitle}</h4>
                <Body className="mt-2">{item.responseBody}</Body>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** 1. HOME — slogan and three company directions. */
export function HomePage({ c }: { c: SiteContent }) {
  const { hero, whyNow, history } = c.home;

  return (
    <PageShell c={c} page="home">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section tone="dark" screen className="hero-atmosphere overflow-hidden">
        <div
          className="pointer-events-none absolute left-[60%] top-1/2 aspect-square w-[112vw] max-w-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] sm:w-[70vw] lg:w-[48vw]"
          aria-hidden
        >
          {hero.media.src ? (
            <Image
              src={hero.media.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 48vw, (min-width: 640px) 70vw, 112vw"
              className="object-contain"
              priority
            />
          ) : null}
        </div>

        <div className={cn(SHELL, "relative isolate flex items-center justify-center text-center")}>
          <div className="mx-auto w-full max-w-5xl">
            {hero.eyebrow ? (
              <p className="flex items-center justify-center gap-3 font-mono text-[0.56rem] uppercase tracking-[0.08em] text-accent sm:text-[0.7rem] sm:tracking-[0.16em]">
                <span className="hidden h-px w-8 bg-accent/60 sm:block" aria-hidden />
                {hero.eyebrow}
                <span className="hidden h-px w-8 bg-accent/60 sm:block" aria-hidden />
              </p>
            ) : null}

            {hero.brand && hero.slogan ? (
              <h1 className="mx-auto mt-4 max-w-5xl tracking-normal sm:mt-5">
                <span className="hero-brand-metal block text-[2.35rem] font-semibold leading-none sm:text-[3.2rem] md:text-[4.4rem] lg:text-[5.2rem]">
                  {hero.brand}
                </span>
                <span className="mx-auto mt-2 block max-w-4xl text-[1.75rem] font-semibold leading-[1.1] sm:mt-3 sm:text-[2.35rem] md:text-[2.9rem] lg:text-[3.4rem]">
                  {hero.slogan}
                </span>
              </h1>
            ) : null}

            <Lead className="mx-auto max-w-4xl md:text-xl">{hero.lead}</Lead>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              {/* Home hands off to the catalogue; booking stays on the sticky header. */}
              <Button href={path("products")}>{hero.ctaPrimary}</Button>
              <Button href={path("contact")} variant="ghost">
                {hero.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ── 01 · Why now ─────────────────────────────────────────────────── */}
      <Section id="why-now" className="section-field">
        <div className={SHELL}>
          <SectionHead intro={whyNow} />

          <ol className="mt-10 border-t border-line-strong sm:mt-14">
            {whyNow.directions.map((direction, index) => {
              const mediaFirst = index % 2 === 1;

              return (
                <li key={direction.id} id={direction.id} className="border-b border-line-strong py-9 sm:py-12 lg:py-14">
                  <article
                    className={cn(
                      direction.media.src && "grid items-start gap-7 md:grid-cols-2 md:gap-12 lg:gap-16",
                    )}
                  >
                    <div
                      className={cn(
                        direction.media.src
                          ? mediaFirst && "md:col-start-2 md:row-start-1"
                          : "md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-12 lg:gap-x-16",
                      )}
                    >
                      <div className={cn("flex flex-wrap items-center gap-2.5", !direction.media.src && "md:col-span-2")}>
                        <OriginTag origin={direction.origin} label={c.origin[direction.origin]} />
                        <StatusBadge status={direction.status} label={direction.statusNote || c.status[direction.status]} />
                      </div>

                      <div className="mt-6 border-l-2 border-primary pl-4 sm:pl-5">
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                          {whyNow.needLabel}
                        </p>
                        <p className="mt-2 text-lg font-semibold leading-snug text-fg sm:text-xl">{direction.need}</p>
                        <Body className="mt-2.5">{direction.consequence}</Body>
                      </div>

                      <div className={cn("mt-7", !direction.media.src && "md:mt-6")}>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                          {whyNow.directionLabel}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold leading-snug sm:text-3xl">{direction.title}</h3>
                        <Body className={cn("mt-3 sm:text-base", direction.media.src && "max-w-xl")}>
                          {direction.body}
                        </Body>
                      </div>
                    </div>

                    {direction.media.src ? (
                      <div className={cn("md:row-start-1", mediaFirst ? "md:col-start-1" : "md:col-start-2")}>
                        <Illustration media={direction.media} />
                      </div>
                    ) : null}
                  </article>

                  {direction.comparison ? <DirectionComparison comparison={direction.comparison} /> : null}

                  {index === 0 ? (
                    <div id="history" className="mt-10 bg-surface px-5 py-7 sm:mt-12 sm:px-7 sm:py-8 lg:px-9">
                      <SectionHead intro={history} />

                      {/* The chip record belongs to the hardware direction, not a separate page chapter. */}
                      <ol className="relative mt-8 grid gap-7 before:absolute before:bottom-2 before:left-[5px] before:top-[5px] before:w-px before:bg-line-strong md:grid-cols-4 md:gap-6 md:before:bottom-auto md:before:left-0 md:before:right-0 md:before:h-px md:before:w-auto">
                        {history.milestones.map((milestone) => (
                          <li key={milestone.date + milestone.title} className="relative pl-7 md:pl-0 md:pt-7">
                            <span
                              className={cn(
                                "absolute left-0 top-0 h-3 w-3 rounded-full",
                                milestone.status === "roadmap"
                                  ? "border border-roadmap bg-bg"
                                  : milestone.starred
                                    ? "bg-accent"
                                    : "bg-line-strong",
                              )}
                              aria-hidden
                            />
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-subtle">
                                {milestone.date}
                              </span>
                              <StatusBadge
                                status={milestone.status}
                                label={milestone.statusNote || c.status[milestone.status]}
                              />
                            </div>
                            <h4 className="mt-2.5 text-base font-semibold leading-snug text-fg">{milestone.title}</h4>
                            <Body className="mt-2">{milestone.body}</Body>
                          </li>
                        ))}
                      </ol>

                      <p className="mt-7 max-w-4xl font-mono text-[0.62rem] leading-relaxed text-subtle">
                        {history.footnote}
                      </p>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </Section>
    </PageShell>
  );
}
