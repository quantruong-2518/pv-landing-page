import type { DomainOrigin, LandingContent } from "@/content/types";
import { SITE, CTA_HREF, MAIL_HREF } from "@/content/site";
import {
  Button,
  FactRow,
  Heading,
  Lead,
  Ordinal,
  Section,
  SectionHead,
  SHELL,
  StatusBadge,
} from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Landing ghép theo thứ tự quan trọng giảm dần (docs/03-structure.md §1):
 * hero → vì sao lúc này → con số → đã làm gì ở đâu → dòng thời gian → sản phẩm →
 * họ là ai → họ ở đâu → lĩnh vực → Pebble Vina → cách bắt đầu → FAQ → chốt.
 *
 * Mỗi <Section> chiếm trọn một màn hình và snap, nên cuộn luôn dừng ở đầu khối.
 * Component không giữ chữ — chữ đi từ `content` xuống (CLAUDE.md §3).
 */
export function Landing({ c }: { c: LandingContent }) {
  const home = c.locale === "en" ? "/" : "/vi";
  const address = c.locale === "en" ? SITE.office.en : SITE.office.vi;
  const legalName = c.locale === "en" ? SITE.legalName : SITE.legalNameVi;
  const parentCity = c.locale === "en" ? SITE.parent.city.en : SITE.parent.city.vi;

  return (
    <>
      <SiteHeader c={c} home={home} />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <Section tone="dark" className="overflow-hidden">
          <div className="crossbar absolute inset-0 opacity-40" aria-hidden />
          <div className="aura absolute inset-0" aria-hidden />

          <div className={cn(SHELL, "relative")}>
            <p className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent sm:text-[0.7rem] sm:tracking-[0.18em]">
              <span className="h-px w-6 bg-accent/60 sm:w-8" aria-hidden />
              {c.hero.eyebrow}
            </p>

            <h1 className="mt-6 max-w-4xl text-[2.15rem] font-semibold leading-[1.06] sm:text-5xl lg:text-[4rem]">
              {c.hero.h1}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:text-xl">
              {c.hero.lead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={CTA_HREF}>{c.hero.ctaPrimary}</Button>
              <Button href={c.hero.ctaSecondaryHref} variant="ghost">
                {c.hero.ctaSecondary}
              </Button>
            </div>

            <dl className="mt-12 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {c.hero.trust.map((t) => (
                <div key={t.label} className="border-t border-line pt-4">
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">
                    {t.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-snug text-fg">{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href="#why-now"
            className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit font-mono text-[0.62rem] uppercase tracking-[0.16em] text-subtle transition-colors hover:text-fg lg:block"
          >
            {c.hero.scrollHint} ↓
          </a>
        </Section>

        {/* ── 01 · VÌ SAO LÀ LÚC NÀY ───────────────────────────────────────── */}
        <Section id="why-now">
          <div className={SHELL}>
            <SectionHead kicker={c.whyNow.kicker} heading={c.whyNow.heading} lead={c.whyNow.lead} />

            <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-3 lg:gap-10">
              {c.whyNow.points.map((p) => (
                <div key={p.no} className="border-t-2 border-fg pt-5">
                  <Ordinal>{p.no}</Ordinal>
                  <h3 className="mt-2.5 text-lg font-semibold leading-snug sm:text-xl">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-line pt-6 lg:mt-14">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                {c.whyNow.pillarsTitle}
              </p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {c.whyNow.pillars.map((p) => (
                  <div key={p.title}>
                    <h4 className="text-sm font-semibold">{p.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── CON SỐ ───────────────────────────────────────────────────────── */}
        <Section id="numbers" className="bg-surface">
          <div className={SHELL}>
            <SectionHead kicker={c.stats.kicker} heading={c.stats.heading} lead={c.stats.lead} />

            <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {c.stats.items.map((s) => (
                <div key={s.label} className="flex flex-col bg-bg p-5 sm:p-6">
                  <StatusBadge
                    status={s.status}
                    label={c.statusLabel[s.status]}
                    note={s.statusNote ?? c.statusLabel[s.status]}
                  />
                  <p className="mt-5 font-mono text-3xl font-medium leading-none tracking-tight text-fg sm:text-4xl">
                    {s.value}
                    {s.unit ? <span className="ml-1.5 text-base text-muted sm:text-lg">{s.unit}</span> : null}
                  </p>
                  <p className="mt-3.5 text-sm font-medium leading-snug sm:text-[0.95rem]">{s.label}</p>
                  <p className="mt-2.5 flex-1 text-[0.82rem] leading-relaxed text-muted sm:text-sm">
                    {s.note}
                  </p>
                  <p className="mt-5 border-t border-line pt-3 font-mono text-[0.6rem] leading-relaxed text-subtle">
                    {s.source}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 max-w-2xl text-sm text-muted">{c.stats.legend}</p>
          </div>
        </Section>

        {/* ── 02 · ĐÃ LÀM GÌ Ở ĐÂU ─────────────────────────────────────────── */}
        <Section id="track-record">
          <div className={SHELL}>
            <SectionHead kicker={c.track.kicker} heading={c.track.heading} lead={c.track.lead} />

            <div className="mt-10 grid gap-px bg-line lg:mt-12 lg:grid-cols-2">
              {c.track.markets.map((m) => (
                <article key={m.region} className="bg-bg p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">{m.region}</h3>
                    <span className="font-mono text-xs tracking-[0.1em] text-subtle">{m.period}</span>
                  </div>
                  <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">
                    {m.org}
                  </p>
                  <p className="mt-3.5 text-sm leading-relaxed text-muted">{m.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        {/* ── DÒNG THỜI GIAN (tối — neo giữa trang) ─────────────────────────── */}
        <Section id="timeline" tone="dark">
          <div className="crossbar absolute inset-0 opacity-30" aria-hidden />
          <div className={cn(SHELL, "relative")}>
            <SectionHead kicker={c.timeline.kicker} heading={c.timeline.heading} lead={c.timeline.lead} />

            <ol className="mt-9 grid gap-x-12 lg:mt-11 lg:grid-cols-2">
              {c.timeline.items.map((t) => (
                <li key={t.date} className="relative border-l border-line-strong py-2.5 pl-6">
                  <span
                    className={cn(
                      "absolute -left-[4.5px] top-4 h-2 w-2 rounded-full",
                      t.status === "roadmap"
                        ? "border border-roadmap bg-bg"
                        : t.starred
                          ? "bg-accent"
                          : "bg-line-strong",
                    )}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="font-mono text-[0.68rem] tracking-[0.1em] text-subtle">{t.date}</span>
                    {t.status === "roadmap" ? (
                      <StatusBadge status="roadmap" label={c.statusLabel.roadmap} note={t.statusNote} />
                    ) : null}
                  </div>
                  <p
                    className={cn(
                      "mt-1 text-sm leading-snug sm:text-[0.95rem]",
                      t.starred ? "font-semibold text-fg" : "text-fg/85",
                    )}
                  >
                    {t.title}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-3xl font-mono text-[0.62rem] leading-relaxed text-subtle">
              {c.timeline.footnote}
            </p>
          </div>
        </Section>

        {/* ── 03 · SẢN PHẨM ────────────────────────────────────────────────── */}
        <Section id="products" className="bg-surface">
          <div className={SHELL}>
            <SectionHead kicker={c.products.kicker} heading={c.products.heading} lead={c.products.lead} />

            <p className="mt-8 max-w-3xl border-l-2 border-accent bg-bg p-5 text-[0.95rem] leading-relaxed sm:p-6 sm:text-base">
              {c.products.plain}
            </p>

            <div className="mt-8 grid gap-px bg-line lg:mt-10 lg:grid-cols-3">
              {c.products.layers.map((l) => (
                <article key={l.name} className="flex flex-col bg-bg p-6 sm:p-7">
                  <StatusBadge
                    status={l.status}
                    label={c.statusLabel[l.status]}
                    note={l.statusNote ?? c.statusLabel[l.status]}
                  />
                  <h3 className="mt-4 font-display text-xl font-semibold sm:text-2xl">{l.name}</h3>
                  <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-subtle">
                    {l.tagline}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{l.body}</p>
                  <p className="mt-5 border-t border-line pt-3.5 font-mono text-[0.68rem] leading-relaxed text-fg">
                    {l.items}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 04 · HỌ LÀ AI ────────────────────────────────────────────────── */}
        <Section id="team">
          <div className={SHELL}>
            <SectionHead kicker={c.team.kicker} heading={c.team.heading} lead={c.team.lead} />

            <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {c.team.people.map((p) => (
                <div key={p.name} className="bg-bg p-5 sm:p-6">
                  <p className="font-display text-lg font-semibold leading-tight">{p.name}</p>
                  <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent">
                    {p.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.credential}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 lg:mt-12">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                {c.team.backingTitle}
              </p>
              <dl className="mt-3 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
                {c.team.backing.map((b) => (
                  <FactRow key={b.label} label={b.label} value={b.value} />
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* ── 05 · HỌ Ở ĐÂU ────────────────────────────────────────────────── */}
        <Section id="where" className="bg-surface">
          <div className={SHELL}>
            <SectionHead kicker={c.places.kicker} heading={c.places.heading} lead={c.places.lead} />

            <ul className="mt-10 lg:mt-12">
              {c.places.offices.map((o) => (
                <li
                  key={o.label}
                  className="grid gap-1.5 border-t border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6 lg:grid-cols-[10rem_16rem_1fr]"
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                    {o.label}
                  </span>
                  <span className="text-sm font-semibold sm:text-[0.95rem]">{o.org}</span>
                  <span className="text-sm leading-relaxed text-muted">{o.address}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── 06 · LĨNH VỰC ────────────────────────────────────────────────── */}
        <Section id="domains">
          <div className={SHELL}>
            <SectionHead kicker={c.domains.kicker} heading={c.domains.heading} lead={c.domains.lead} />

            <div className="mt-9 grid gap-px bg-line sm:grid-cols-2 lg:mt-11 lg:grid-cols-4">
              {c.domains.items.map((d) => (
                <article key={d.title} className="flex flex-col bg-bg p-5">
                  <OriginTag origin={d.origin} label={c.domains.legend[d.origin]} />
                  <h3 className="mt-3.5 text-base font-semibold leading-snug">{d.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{d.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 07 · PEBBLE VINA (+ CTA giữa trang) ───────────────────────────── */}
        <Section id="vietnam" className="bg-surface">
          <div className={SHELL}>
            <SectionHead kicker={c.local.kicker} heading={c.local.heading} lead={c.local.lead} />

            <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:mt-12">
              {c.local.items.map((i) => (
                <div key={i.no} className="flex gap-4 sm:gap-5">
                  <Ordinal>{i.no}</Ordinal>
                  <div>
                    <h3 className="text-base font-semibold leading-snug sm:text-lg">{i.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.95rem]">{i.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
              <p className="font-display text-xl font-semibold sm:text-2xl lg:text-3xl">{c.local.punch}</p>
              <Button href={CTA_HREF} className="w-full sm:w-auto">
                {c.local.cta}
              </Button>
            </div>
          </div>
        </Section>

        {/* ── 08 · CÁCH BẮT ĐẦU ────────────────────────────────────────────── */}
        <Section id="start">
          <div className={SHELL}>
            <SectionHead kicker={c.start.kicker} heading={c.start.heading} lead={c.start.lead} />

            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {c.start.steps.map((s) => (
                <li key={s.no} className="border-t-2 border-fg pt-5">
                  <Ordinal>{s.no}</Ordinal>
                  <h3 className="mt-2.5 text-base font-semibold leading-snug sm:text-lg">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.body}</p>
                  <p className="mt-4 border-t border-line pt-3 font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.1em] text-accent">
                    {s.deliverable}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-2xl text-sm text-muted">{c.start.note}</p>
          </div>
        </Section>

        {/* ── 09 · FAQ — <details> nguyên bản: không JS, crawler đọc được cả khi gập ── */}
        <Section id="faq" className="bg-surface">
          <div className={SHELL}>
            <SectionHead kicker={c.faq.kicker} heading={c.faq.heading} lead={c.faq.lead} />

            <div className="mt-8 border-b border-line lg:mt-10">
              {c.faq.items.map((f, i) => (
                <details key={f.q} className="group border-t border-line">
                  <summary className="flex cursor-pointer list-none items-start gap-4 py-3.5">
                    <span className="mt-0.5 font-mono text-[0.68rem] text-accent" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-medium leading-snug sm:text-base">{f.q}</span>
                    <span
                      className="shrink-0 text-lg leading-none text-muted transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-5 pl-8 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* ── CHỐT ─────────────────────────────────────────────────────────── */}
        <Section id="contact" tone="dark">
          <div className="crossbar absolute inset-0 opacity-30" aria-hidden />
          <div className={cn(SHELL, "relative")}>
            <Heading className="max-w-3xl">{c.cta.heading}</Heading>
            <Lead>{c.cta.lead}</Lead>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={CTA_HREF}>{c.cta.primary}</Button>
              <Button href={MAIL_HREF} variant="ghost">
                {c.cta.secondary}
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-7">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                {c.cta.contactLabel}
              </span>
              <a href={SITE.contact.phoneHref} className="font-mono text-lg text-fg hover:text-accent">
                {SITE.contact.phone}
              </a>
              <a href={MAIL_HREF} className="break-all font-mono text-sm text-muted hover:text-accent">
                {SITE.contact.email}
              </a>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter c={c} address={address} legalName={legalName} parentCity={parentCity} />
    </>
  );
}

/* ── Header ────────────────────────────────────────────────────────────────
   Best practice landing: một hàng mỏng, dính, wordmark trái, tối đa 5 mục điều
   hướng, một chuyển ngữ, đúng MỘT nút hành động. Menu di động dùng <details>
   nên không cần JS và không có rủi ro lệch hydrate. */
function SiteHeader({ c, home }: { c: LandingContent; home: string }) {
  return (
    <header className="tone-dark sticky top-0 z-50 border-b border-line bg-bg/92 text-fg backdrop-blur">
      <div className={cn(SHELL, "flex h-16 items-center justify-between gap-4")}>
        <a href={home} className="flex items-baseline gap-2.5">
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
            Pebble Vina
          </span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.16em] text-subtle sm:inline">
            Pebble Square Group
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={c.nav.menuLabel}>
          {c.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={c.alternate.href}
            hrefLang={c.alternate.hrefLang}
            className="font-mono text-xs tracking-[0.12em] text-muted transition-colors hover:text-fg"
          >
            {c.alternate.label}
          </a>
          <a
            href={CTA_HREF}
            className="inline-flex rounded-sm bg-primary px-3 py-2 text-[0.7rem] font-medium text-primary-fg transition-opacity hover:opacity-90 sm:px-4 sm:text-xs"
          >
            {c.nav.cta}
          </a>

          {/* Menu di động — disclosure thuần HTML. */}
          <details className="group relative lg:hidden">
            <summary
              className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-sm border border-line-strong"
              aria-label={c.nav.menuLabel}
            >
              <span className="relative block h-[9px] w-4" aria-hidden>
                <span className="absolute inset-x-0 top-0 h-px bg-fg transition-transform group-open:top-1 group-open:rotate-45" />
                <span className="absolute inset-x-0 top-1 h-px bg-fg transition-opacity group-open:opacity-0" />
                <span className="absolute inset-x-0 top-2 h-px bg-fg transition-transform group-open:top-1 group-open:-rotate-45" />
              </span>
            </summary>
            <div className="absolute right-0 top-11 w-60 border border-line bg-bg p-4 shadow-xl">
              <nav className="flex flex-col" aria-label={c.nav.menuLabel}>
                {c.nav.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="border-b border-line py-2.5 text-sm text-muted last:border-0 hover:text-fg"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

/* ── Footer ────────────────────────────────────────────────────────────────
   Best practice landing: bốn cột — bản sắc, điều hướng lặp lại, liên hệ, pháp lý —
   rồi một thanh đáy cho bản quyền, chuyển ngữ, chú giải nhãn và tuyên bố nguồn. */
function SiteFooter({
  c,
  address,
  legalName,
  parentCity,
}: {
  c: LandingContent;
  address: string;
  legalName: string;
  parentCity: string;
}) {
  return (
    <footer className="tone-dark snap-start border-t border-line bg-bg-deep text-fg">
      <div className={cn(SHELL, "py-12 sm:py-14")}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold">Pebble Vina</p>
            <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-muted">{c.footer.tagline}</p>
            <a
              href={SITE.parent.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block font-mono text-xs tracking-[0.1em] text-accent hover:underline"
            >
              pebble-square.com ↗
            </a>
          </div>

          <nav aria-label={c.footer.navTitle}>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">
              {c.footer.navTitle}
            </p>
            <ul className="mt-3 space-y-2">
              {c.nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">
              {c.footer.contactTitle}
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={SITE.contact.phoneHref} className="text-sm text-muted hover:text-fg">
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                <a href={MAIL_HREF} className="break-all text-sm text-muted hover:text-fg">
                  {SITE.contact.email}
                </a>
              </li>
              <li className="pt-1 text-sm leading-relaxed text-muted">{address}</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">
              {c.footer.legalTitle}
            </p>
            <dl className="mt-1">
              <FactRow label={c.footer.legalLabel} value={legalName} />
              <FactRow label={c.footer.taxLabel} value={SITE.taxId} />
              <FactRow
                label={c.footer.parentLabel}
                value={`${SITE.parent.name} — ${parentCity}`}
              />
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-subtle">
            {c.footer.copyright}
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-subtle">
            {c.footer.statusLegend}
          </p>
        </div>

        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-subtle">{c.footer.disclaimer}</p>
      </div>
    </footer>
  );
}

/** Ô lĩnh vực phải nói rõ năng lực của ai — luật số 2 (CLAUDE.md §2) thi hành bằng bố cục. */
function OriginTag({ origin, label }: { origin: DomainOrigin; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center border px-2 py-0.5 font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.1em]",
        origin === "ps" ? "border-line-strong text-muted" : "border-primary text-primary",
      )}
    >
      {label}
    </span>
  );
}
