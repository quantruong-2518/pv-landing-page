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
    <div className="mt-6 sm:mt-8">
      <ol className="grid gap-5 sm:gap-6">
        {comparison.items.map((item, index) => {
          const alternateSurface = index % 2 === 1;

          return (
            <li
              key={item.id}
              className={cn(
                "relative isolate overflow-hidden border border-line-strong",
                alternateSurface ? "bg-surface" : "bg-bg",
              )}
            >
              <span
                className="pointer-events-none absolute -right-2 -top-6 z-0 font-display text-[7rem] font-semibold leading-none text-line opacity-[0.45] sm:-right-1 sm:text-[8rem]"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 hidden grid-cols-3 divide-x divide-line border-b border-line md:grid">
                <p className="px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                  {comparison.painLabel}
                </p>
                <p className="px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  {comparison.responseLabel}
                </p>
                <p className="px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  {comparison.resultLabel}
                </p>
              </div>

              <article className="relative z-10 grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
                <div className="px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-8">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle md:hidden">
                    {comparison.painLabel}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold leading-snug text-fg md:mt-0">{item.painTitle}</h4>
                  <Body className="mt-2">{item.painBody}</Body>
                </div>

                <div
                  className={cn(
                    "px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-8",
                    alternateSurface ? "bg-bg" : "bg-surface",
                  )}
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent md:hidden">
                    {comparison.responseLabel}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold leading-snug text-fg md:mt-0">{item.responseTitle}</h4>
                  <Body className="mt-2">{item.responseBody}</Body>
                </div>

                <div className="border-l-2 border-accent px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-8">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent md:hidden">
                    {comparison.resultLabel}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold leading-snug text-primary md:mt-0">{item.resultTitle}</h4>
                  <Body className="mt-2">{item.resultBody}</Body>
                </div>
              </article>
            </li>
          );
        })}
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
                  {direction.comparison ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <OriginTag origin={direction.origin} label={c.origin[direction.origin]} />
                        <StatusBadge status={direction.status} label={direction.statusNote || c.status[direction.status]} />
                      </div>
                      <DirectionComparison comparison={direction.comparison} />
                    </>
                  ) : (
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
                          <StatusBadge
                            status={direction.status}
                            label={direction.statusNote || c.status[direction.status]}
                          />
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
                  )}

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
