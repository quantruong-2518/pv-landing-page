import type { LandingContent, UseCaseOrigin } from "@/content/types";
import { SITE, CTA_HREF, PROFILE_HREF } from "@/content/site";
import { Button, FactRow, Heading, Kicker, Lead, Ordinal, Section, SHELL, StatusBadge } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Toàn bộ landing, ghép từ 12 khối của docs/03-structure.md §1.
 * Component không giữ chữ — chữ đi từ `content` xuống (CLAUDE.md §3).
 */
export function Landing({ c }: { c: LandingContent }) {
  const home = c.locale === "vi" ? "/" : "/en";
  const address = c.locale === "vi" ? SITE.office.vi : SITE.office.en;
  const parentHq = c.locale === "vi" ? SITE.parent.hq : SITE.parent.hqEn;

  return (
    <>
      {/* ── NAV — dính, luôn nền tối để không phải đo vị trí cuộn bằng JS ──── */}
      <header className="tone-dark sticky top-0 z-50 border-b border-line bg-bg/92 text-fg backdrop-blur">
        <nav className={cn(SHELL, "flex h-16 items-center justify-between gap-6")}>
          <a href={home} className="flex items-baseline gap-2.5">
            <span className="font-display text-lg font-semibold tracking-tight">Pebble Vina</span>
            <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.16em] text-subtle sm:inline">
              Pebble Square Group
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {c.nav.links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={c.alternate.href}
              hrefLang={c.alternate.hrefLang}
              className="font-mono text-xs tracking-[0.12em] text-muted transition-colors hover:text-fg"
            >
              {c.alternate.label}
            </a>
            <a
              href={CTA_HREF}
              className="rounded-sm bg-primary px-4 py-2 text-xs font-medium text-primary-fg transition-opacity hover:opacity-90"
            >
              {c.nav.cta}
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* ── 01 · HERO ────────────────────────────────────────────────────── */}
        <section className="tone-dark relative overflow-hidden bg-bg text-fg">
          <div className="crossbar absolute inset-0 opacity-40" aria-hidden />
          <div className="aura absolute inset-0" aria-hidden />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg"
            aria-hidden
          />

          <div className={cn(SHELL, "relative py-24 lg:py-36")}>
            <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-8 bg-accent/60" aria-hidden />
              {c.hero.eyebrow}
            </p>

            <h1 className="mt-7 max-w-4xl text-[2.6rem] font-semibold leading-[1.08] sm:text-6xl lg:text-[4.25rem]">
              {c.hero.h1}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted lg:text-xl">{c.hero.lead}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={CTA_HREF}>{c.hero.ctaPrimary}</Button>
              <Button href={PROFILE_HREF} variant="ghost">
                {c.hero.ctaSecondary}
              </Button>
            </div>

            {/* Trust strip nằm TRONG hero, không đợi xuống dưới — >54% người đọc
                chỉ tập trung trên fold (docs/03-structure.md §2). */}
            <dl className="mt-16 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {c.hero.trust.map((t) => (
                <div key={t.label} className="bg-bg px-1 pt-5">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                    {t.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug text-fg">{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 02 · PROOF STRIP ─────────────────────────────────────────────── */}
        <Section id="bang-chung">
          <div className={SHELL}>
            <Kicker>{c.proof.kicker}</Kicker>
            <Heading>{c.proof.heading}</Heading>
            <Lead>{c.proof.lead}</Lead>

            <div className="mt-12 border border-line bg-surface p-8 lg:p-10">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="font-display text-2xl font-semibold lg:text-3xl">{c.proof.parent.name}</p>
                  <p className="mt-2 text-sm text-muted">{c.proof.parent.role}</p>
                </div>
                <a
                  href={c.proof.parent.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs tracking-[0.1em] text-primary underline-offset-4 hover:underline"
                >
                  {c.proof.parent.hrefLabel} ↗
                </a>
              </div>

              <dl className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
                {c.proof.parent.facts.map((f) => (
                  <FactRow key={f.label} label={f.label} value={f.value} />
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* ── 03 · CON SỐ ──────────────────────────────────────────────────── */}
        <Section className="bg-surface">
          <div className={SHELL}>
            <Kicker>{c.stats.kicker}</Kicker>
            <Heading>{c.stats.heading}</Heading>
            <Lead>{c.stats.lead}</Lead>

            <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {c.stats.items.map((s) => (
                <div key={s.label} className="flex flex-col bg-bg p-7">
                  <StatusBadge
                    status={s.status}
                    label={c.statusLabel[s.status]}
                    note={s.statusNote ?? c.statusLabel[s.status]}
                  />
                  <p className="mt-6 font-mono text-4xl font-medium leading-none tracking-tight text-fg">
                    {s.value}
                    {s.unit ? <span className="ml-1.5 text-lg text-muted">{s.unit}</span> : null}
                  </p>
                  <p className="mt-4 text-[0.95rem] font-medium leading-snug">{s.label}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.note}</p>
                  <p className="mt-6 border-t border-line pt-3 font-mono text-[0.62rem] leading-relaxed text-subtle">
                    {s.source}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-sm text-muted">{c.stats.legend}</p>
          </div>
        </Section>

        {/* ── 04 · VẤN ĐỀ ──────────────────────────────────────────────────── */}
        <Section>
          <div className={SHELL}>
            <Kicker>{c.problem.kicker}</Kicker>
            <Heading>{c.problem.heading}</Heading>
            <Lead>{c.problem.lead}</Lead>

            <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12">
              {c.problem.items.map((p) => (
                <div key={p.no} className="border-t-2 border-fg pt-6">
                  <Ordinal>{p.no}</Ordinal>
                  <h3 className="mt-3 text-xl font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 05 · CÔNG NGHỆ ───────────────────────────────────────────────── */}
        <Section id="cong-nghe" className="bg-surface">
          <div className={SHELL}>
            <Kicker>{c.tech.kicker}</Kicker>
            <Heading>{c.tech.heading}</Heading>
            <Lead>{c.tech.lead}</Lead>

            {/* Giải thích cho người phi kỹ thuật trước, thuật ngữ sau. */}
            <p className="mt-10 max-w-3xl border-l-2 border-accent bg-bg p-7 text-[1.05rem] leading-relaxed">
              {c.tech.plainEnglish}
            </p>

            <div className="mt-12 grid gap-px bg-line lg:grid-cols-2">
              {c.tech.branches.map((b) => (
                <div key={b.name} className="bg-bg p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold">{b.name}</h3>
                    <StatusBadge
                      status={b.status}
                      label={c.statusLabel[b.status]}
                      note={b.statusNote ?? c.statusLabel[b.status]}
                    />
                  </div>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-subtle">{b.arch}</p>
                  <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{b.body}</p>
                  <p className="mt-6 border-t border-line pt-4 font-mono text-xs tracking-wide text-fg">
                    {b.chips}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {c.tech.pillars.map((p) => (
                <div key={p.no} className="border-t border-line-strong pt-5">
                  <Ordinal>{p.no}</Ordinal>
                  <h3 className="mt-2 text-base font-semibold">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 06 · DÒNG THỜI GIAN (tối — neo giữa trang) ────────────────────── */}
        <Section id="lich-su" tone="dark">
          <div className="crossbar absolute inset-0 opacity-30" aria-hidden />
          <div className={cn(SHELL, "relative")}>
            <Kicker>{c.timeline.kicker}</Kicker>
            <Heading>{c.timeline.heading}</Heading>
            <Lead>{c.timeline.lead}</Lead>

            <ol className="mt-14 border-l border-line">
              {c.timeline.items.map((t) => (
                <li key={t.date} className="relative pb-10 pl-8 last:pb-0">
                  <span
                    className={cn(
                      "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full",
                      t.status === "roadmap"
                        ? "border border-roadmap bg-bg"
                        : t.starred
                          ? "bg-accent"
                          : "bg-line-strong",
                    )}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="font-mono text-xs tracking-[0.12em] text-subtle">{t.date}</span>
                    {t.status === "roadmap" ? (
                      <StatusBadge status="roadmap" label={c.statusLabel.roadmap} note={t.statusNote} />
                    ) : null}
                  </div>
                  <h3
                    className={cn(
                      "mt-2 text-lg leading-snug",
                      t.starred ? "font-semibold text-fg" : "font-medium text-fg/90",
                    )}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{t.body}</p>
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-2xl font-mono text-[0.68rem] leading-relaxed text-subtle">
              {c.timeline.footnote}
            </p>
          </div>
        </Section>

        {/* ── 07 · PEBBLE VINA LÀM GÌ (+ CTA giữa trang) ────────────────────── */}
        <Section>
          <div className={SHELL}>
            <Kicker>{c.local.kicker}</Kicker>
            <Heading>{c.local.heading}</Heading>
            <Lead>{c.local.lead}</Lead>

            <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {c.local.items.map((i) => (
                <div key={i.no} className="flex gap-5">
                  <Ordinal>{i.no}</Ordinal>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">{i.title}</h3>
                    <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{i.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
              <p className="font-display text-2xl font-semibold lg:text-3xl">{c.local.punch}</p>
              <Button href={CTA_HREF}>{c.local.cta}</Button>
            </div>
          </div>
        </Section>

        {/* ── 08 · ỨNG DỤNG ────────────────────────────────────────────────── */}
        <Section id="ung-dung" className="bg-surface">
          <div className={SHELL}>
            <Kicker>{c.useCases.kicker}</Kicker>
            <Heading>{c.useCases.heading}</Heading>
            <Lead>{c.useCases.lead}</Lead>

            <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {c.useCases.items.map((u) => (
                <div key={u.title} className="flex flex-col bg-bg p-7">
                  <OriginTag origin={u.origin} label={c.useCases.legend[u.origin]} />
                  <h3 className="mt-5 text-lg font-semibold leading-snug">{u.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 09 · CÁCH BẮT ĐẦU ────────────────────────────────────────────── */}
        <Section>
          <div className={SHELL}>
            <Kicker>{c.start.kicker}</Kicker>
            <Heading>{c.start.heading}</Heading>
            <Lead>{c.start.lead}</Lead>

            <ol className="mt-14 grid gap-10 lg:grid-cols-4">
              {c.start.steps.map((s) => (
                <li key={s.no} className="border-t-2 border-fg pt-6">
                  <Ordinal>{s.no}</Ordinal>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                  <p className="mt-5 border-t border-line pt-3 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.1em] text-accent">
                    {s.deliverable}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-2xl text-sm text-muted">{c.start.note}</p>
          </div>
        </Section>

        {/* ── 10 · FAQ — <details> nguyên bản: không JS, crawler đọc được cả khi gập ── */}
        <Section id="cau-hoi" className="bg-surface">
          <div className={SHELL}>
            <Kicker>{c.faq.kicker}</Kicker>
            <Heading>{c.faq.heading}</Heading>
            <Lead>{c.faq.lead}</Lead>

            <div className="mt-12 border-b border-line">
              {c.faq.items.map((f, i) => (
                <details key={f.q} className="group border-t border-line">
                  <summary className="flex cursor-pointer list-none items-start gap-5 py-5">
                    <span className="mt-1 font-mono text-xs text-accent" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[1.05rem] font-medium leading-snug">{f.q}</span>
                    <span
                      className="mt-0.5 shrink-0 text-xl leading-none text-muted transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-6 pl-10 text-[0.95rem] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 11 · CTA CUỐI ────────────────────────────────────────────────── */}
        <Section id="lien-he" tone="dark">
          <div className="crossbar absolute inset-0 opacity-30" aria-hidden />
          <div className={cn(SHELL, "relative")}>
            <Heading className="max-w-3xl">{c.cta.heading}</Heading>
            <Lead>{c.cta.lead}</Lead>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={CTA_HREF}>{c.cta.primary}</Button>
              <Button href={PROFILE_HREF} variant="ghost">
                {c.cta.secondary}
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-8">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">
                {c.cta.contactLabel}
              </span>
              <a href={SITE.contact.phoneHref} className="font-mono text-lg text-fg hover:text-accent">
                {SITE.contact.phone}
              </a>
              <a href={`mailto:${SITE.contact.email}`} className="font-mono text-sm text-muted hover:text-accent">
                {SITE.contact.email}
              </a>
            </div>
          </div>
        </Section>
      </main>

      {/* ── 12 · FOOTER ────────────────────────────────────────────────────── */}
      <footer className="tone-dark border-t border-line bg-bg text-fg">
        <div className={cn(SHELL, "py-14")}>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-display text-lg font-semibold">Pebble Vina</p>
            <p className="text-sm text-muted">{c.footer.tagline}</p>
          </div>

          <dl className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            <FactRow label={c.footer.legalLabel} value={SITE.legalName} />
            <FactRow label={c.footer.taxLabel} value={SITE.taxId} />
            <FactRow label={c.footer.addressLabel} value={address} />
            <FactRow
              label={c.footer.parentLabel}
              value={`${SITE.parent.name} (${SITE.parent.nameKo}) — ${parentHq}`}
            />
          </dl>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-line pt-6">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">
              {c.footer.contactLabel}
            </span>
            <a href={SITE.contact.phoneHref} className="text-sm text-muted hover:text-fg">
              {SITE.contact.phone}
            </a>
            <a href={`mailto:${SITE.contact.email}`} className="text-sm text-muted hover:text-fg">
              {SITE.contact.email}
            </a>
            <a
              href={SITE.parent.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted hover:text-fg"
            >
              pebble-square.com ↗
            </a>
          </div>

          <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-subtle">
            {c.footer.statusLegend}
          </p>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-subtle">{c.footer.disclaimer}</p>
        </div>
      </footer>
    </>
  );
}

/** Ô ứng dụng phải nói rõ năng lực của ai — luật số 2 (CLAUDE.md §2) thi hành bằng bố cục. */
function OriginTag({ origin, label }: { origin: UseCaseOrigin; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em]",
        origin === "ps" ? "border-line-strong text-muted" : "border-primary text-primary",
      )}
    >
      {label}
    </span>
  );
}
