import type { SiteContent } from "@/content/types";
import Image from "next/image";
import { path } from "@/lib/routes";
import { PageShell } from "@/components/page-shell";
import {
  Body,
  Button,
  Illustration,
  Lead,
  Section,
  SectionDivider,
  SectionHead,
  SHELL,
  StatusBadge,
} from "@/components/ui";
import { cn } from "@/lib/cn";

/** 1. HOME — slogan, why now, history. */
export function HomePage({ c }: { c: SiteContent }) {
  const { hero, whyNow, history } = c.home;
  const problemPoints = whyNow.points.slice(0, 2);
  const solutionPoint = whyNow.points[2];

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
      <Section id="why-now" className="bg-canvas">
        <div className={SHELL}>
          <SectionHead intro={whyNow} />

          <div className="mt-9 md:mt-12">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
              {whyNow.problemLabel}
            </p>
          </div>

          <ol className="mt-5 grid gap-9 md:grid-cols-2 md:gap-10">
            {problemPoints.map((p, i) => (
              <li key={p.title} className="flex w-full max-w-md flex-col md:max-w-none">
                <Illustration media={p.media} />
                <div className="mt-5">
                  <span className="font-mono text-sm font-medium tracking-[0.1em] text-accent" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug sm:text-xl">{p.title}</h3>
                  <Body className="mt-2.5">{p.body}</Body>
                </div>
              </li>
            ))}
          </ol>

          {solutionPoint ? (
            <div className="mt-12 border border-line border-t-2 border-t-primary bg-surface-brand px-5 py-7 sm:px-7 md:mt-16 md:px-9 md:py-9">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                {whyNow.solutionLabel}
              </p>

              <div className="mt-5 grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-5">
                  <Illustration media={solutionPoint.media} />
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-2xl font-semibold leading-snug sm:text-3xl">{solutionPoint.title}</h3>
                  <Body className="mt-3 max-w-2xl sm:text-lg">{solutionPoint.body}</Body>
                </div>
              </div>

              <div className="mt-8 md:mt-10">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                  {whyNow.pillarsTitle}
                </p>
                <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-3">
                  {whyNow.pillars.map((p) => (
                    <div key={p.title}>
                      <h4 className="text-sm font-semibold">{p.title}</h4>
                      <Body className="mt-1.5">{p.body}</Body>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Section>

      <SectionDivider />

      {/* ── 02 · History ─────────────────────────────────────────────────── */}
      <Section id="history" className="bg-surface">
        <div className={cn(SHELL, "relative")}>
          <SectionHead intro={history} />

          {/* One continuous rail: vertical on phones, horizontal from `md`. */}
          <ol className="relative mt-10 grid gap-8 before:absolute before:bottom-2 before:left-[5px] before:top-[5px] before:w-px before:bg-line-strong md:mt-12 md:grid-cols-4 md:gap-8 md:before:bottom-auto md:before:left-0 md:before:right-0 md:before:h-px md:before:w-auto">
            {history.milestones.map((m) => (
              <li key={m.date + m.title} className="relative pl-8 md:pl-0 md:pt-8">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-3 w-3 rounded-full md:top-0",
                    m.status === "roadmap"
                      ? "border border-roadmap bg-bg"
                      : m.starred
                        ? "bg-accent"
                        : "bg-line-strong",
                  )}
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-subtle">{m.date}</span>
                  {m.status === "roadmap" ? (
                    <StatusBadge status="roadmap" label={m.statusNote ?? c.status.roadmap} />
                  ) : null}
                </div>
                <h3
                  className={cn(
                    "mt-3 text-xl leading-snug",
                    m.starred ? "font-semibold text-fg" : "text-fg/85",
                  )}
                >
                  {m.title}
                </h3>
                <Body className="mt-3">{m.body}</Body>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-3xl font-mono text-[0.62rem] leading-relaxed text-subtle">
            {history.footnote}
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
