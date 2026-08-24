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
  SectionHead,
  SHELL,
  StatusBadge,
} from "@/components/ui";
import { cn } from "@/lib/cn";

/** 1. HOME — slogan, why now, history. */
export function HomePage({ c }: { c: SiteContent }) {
  const { hero, whyNow, history } = c.home;

  return (
    <PageShell c={c} page="home">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Section tone="dark" screen className="overflow-hidden">
        <div className="crossbar absolute inset-0 opacity-40" aria-hidden />
        <div className="aura absolute inset-0" aria-hidden />

        {/* Two columns from `md`, not `lg`: stacked, the decorator sat under the
            copy and pushed this `screen` block 304px past budget at 1023x768. */}
        <div className={cn(SHELL, "relative grid items-center gap-6 sm:gap-10 md:grid-cols-12 md:gap-12")}>
          <div className="md:col-span-7">
            {hero.eyebrow ? (
              <p className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent sm:text-[0.7rem] sm:tracking-[0.18em]">
                <span className="h-px w-6 bg-accent/60 sm:w-8" aria-hidden />
                {hero.eyebrow}
              </p>
            ) : null}

            {hero.slogan ? (
              <h1 className="mt-4 text-[2.1rem] font-semibold leading-[1.06] sm:mt-5 sm:text-5xl lg:text-[3.6rem]">
                {hero.slogan}
              </h1>
            ) : null}

            <Lead className="md:text-xl">{hero.lead}</Lead>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              {/* Home hands off to the catalogue; booking stays on the sticky header. */}
              <Button href={path("products")}>{hero.ctaPrimary}</Button>
              <Button href={path("contact")} variant="ghost">
                {hero.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* A third of the width on phones, not three quarters: stacked under
              the CTAs the mark was 252px of a 788px budget at 390 — the biggest
              element of the opening screen was decoration, and it alone pushed
              this `screen` block past the viewport. Unchanged from `sm` up. */}
          <div className="relative mx-auto aspect-square w-[38%] sm:w-1/2 md:col-span-5 md:w-full" aria-hidden>
            {hero.media.src ? (
              <Image
                src={hero.media.src}
                alt=""
                fill
                sizes="(min-width: 768px) 38vw, (min-width: 640px) 46vw, 36vw"
                className="object-contain"
                priority
              />
            ) : null}
          </div>
        </div>
      </Section>

      {/* ── 01 · Why now ─────────────────────────────────────────────────── */}
      <Section id="why-now">
        <div className={SHELL}>
          <SectionHead intro={whyNow} />

          {/* One illustration per point: square on phones, a wider recomposition
              from lg — see context/media-plan.md. */}
          <ol className="mt-9 grid gap-9 md:mt-12 md:grid-cols-3 md:gap-10">
            {whyNow.points.map((p, i) => (
              <li key={p.title} className="flex w-full max-w-md flex-col md:max-w-none">
                <Illustration media={p.media} />
                <div className="mt-5 border-t-2 border-fg pt-4">
                  <span className="font-mono text-sm font-medium tracking-[0.1em] text-accent" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug sm:text-xl">{p.title}</h3>
                  <Body className="mt-2.5">{p.body}</Body>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 border-t border-line pt-6 md:mt-14">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
              {whyNow.pillarsTitle}
            </p>
            <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 md:grid-cols-4">
              {whyNow.pillars.map((p) => (
                <div key={p.title} className="border-t border-line-strong pt-3">
                  <h4 className="text-sm font-semibold">{p.title}</h4>
                  <Body className="mt-1.5">{p.body}</Body>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 02 · History ─────────────────────────────────────────────────── */}
      <Section id="history" tone="dark">
        <div className="crossbar absolute inset-0 opacity-30" aria-hidden />
        <div className={cn(SHELL, "relative")}>
          <SectionHead intro={history} />

          {/* Two columns flow by ROW, so the decorator is a rule per row, not a
              rail per column: a vertical rail told the eye to read down the left
              column and skip the five strongest milestones on the right. */}
          <ol className="mt-9 grid gap-x-12 md:mt-11 md:grid-cols-2">
            {history.milestones.map((m) => (
              <li key={m.date + m.title} className="relative border-t border-line-strong pb-5 pt-4">
                <span
                  className={cn(
                    "absolute -top-[4.5px] left-0 h-2 w-2 rounded-full",
                    m.status === "roadmap"
                      ? "border border-roadmap bg-bg"
                      : m.starred
                        ? "bg-accent"
                        : "bg-line-strong",
                  )}
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-mono text-[0.68rem] tracking-[0.1em] text-subtle">{m.date}</span>
                  {m.status === "roadmap" ? (
                    <StatusBadge status="roadmap" label={m.statusNote ?? c.status.roadmap} />
                  ) : null}
                </div>
                <p
                  className={cn(
                    "mt-1 text-base leading-snug sm:text-[0.95rem]",
                    m.starred ? "font-semibold text-fg" : "text-fg/85",
                  )}
                >
                  {m.title}
                </p>
                <Body className="mt-1">{m.body}</Body>
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
