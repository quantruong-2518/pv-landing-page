import type { Intro, Product, SiteContent, SoftwareGroup } from "@/content/types";
import { path } from "@/lib/routes";
import { PageShell } from "@/components/page-shell";
import {
  AppRail,
  Body,
  Button,
  ChipPlinth,
  Figure,
  ItemList,
  Lead,
  OriginTag,
  Section,
  SectionHead,
  SHELL,
  SpecCard,
  StatusBadge,
} from "@/components/ui";
import { cn } from "@/lib/cn";

/** 2. PRODUCTS & SOLUTIONS — 2.1 hardware, 2.2 software. */
export function ProductsPage({ c }: { c: SiteContent }) {
  const { intro, hardware, software } = c.products;

  return (
    <PageShell c={c} page="products">
      {/* ── Index ────────────────────────────────────────────────────────── */}
      <Section tone="dark" screen className="overflow-hidden">
        <div className="crossbar absolute inset-0 opacity-40" aria-hidden />

        <div className={cn(SHELL, "relative")}>
          <SectionHead intro={intro} as="h1" />

          <nav className="mt-8 grid gap-8 sm:grid-cols-2 md:mt-10 lg:mt-12" aria-label={intro.title}>
            <IndexColumn
              c={c}
              intro={hardware}
              entries={hardware.items.map((i) => ({ id: i.id, name: i.name, tagline: i.tagline }))}
            />
            <IndexColumn
              c={c}
              intro={software}
              entries={software.groups.map((g) => ({ id: g.id, name: g.name, tagline: g.tagline }))}
            />
          </nav>
        </div>
      </Section>

      {/* ── 2.1 Hardware ─────────────────────────────────────────────────────
          The group heading rides on top of the first product instead of owning a
          block: on its own it held a kicker, an h2 and a lead, then took a whole
          rest position and left MINT cut off mid-list underneath. */}
      {hardware.items.map((item, i) => (
        <ChipBlock
          key={item.id}
          c={c}
          product={item}
          flip={i % 2 === 1}
          groupIntro={i === 0 ? { id: "hardware", intro: hardware } : undefined}
        />
      ))}

      {/* ── 2.2 Software ─────────────────────────────────────────────────── */}
      {software.groups.map((group, i) => (
        <SoftwareBlock
          key={group.id}
          c={c}
          group={group}
          flip={i % 2 === 1}
          groupIntro={i === 0 ? { id: "software", intro: software } : undefined}
        />
      ))}

      {/* ── The one action on the page ───────────────────────────────────── */}
      <PageCta c={c} />
    </PageShell>
  );
}

/* ── Index ────────────────────────────────────────────────────────────────── */

function IndexColumn({
  c,
  intro,
  entries,
}: {
  c: SiteContent;
  intro: Intro;
  entries: Array<{ id: string; name: string; tagline: string }>;
}) {
  return (
    <div>
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">{intro.kicker}</p>
      <p className="mt-1 max-w-sm font-display text-lg font-semibold leading-snug">{intro.title}</p>
      {/* `gap-y-1.5` so neighbouring rows are separated by space as well as by a
          hairline — measured 0.1px apart before. Hover moves the rule and the
          name to accent, the same hover step the header and footer links use. */}
      <ul className="mt-3 grid gap-y-1.5">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={path("products", e.id)}
              className="group flex min-h-11 flex-col justify-center border-t border-line py-2.5 transition-colors hover:border-accent"
            >
              <span className="text-sm font-medium transition-colors group-hover:text-accent">{e.name}</span>
              <span className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-subtle">
                {e.tagline}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Blocks ───────────────────────────────────────────────────────────────── */

/** The heading of 2.1 / 2.2, carried by the first block of its group. */
type GroupIntro = { id: string; intro: Intro };

function GroupHead({ group }: { group: GroupIntro }) {
  return (
    <div id={group.id} className="mb-10 border-b border-line pb-8 sm:mb-12 sm:pb-10">
      <SectionHead intro={group.intro} />
    </div>
  );
}

/**
 * The single action on the catalogue — one closing block, one button, a line of
 * copy above it (GM, 2026-08-24). The previous fix for "no CTA in <main>" hung a
 * button off all six product blocks; six identical buttons dilute the one place
 * the reader is meant to act, and cost ~90px each on a page already 10.885px tall.
 *
 * The line is `contact.intro.title` rather than a string of its own: it is the
 * promise the next page opens with, already written and already checked. A
 * dedicated line is a work order for the writer, not for this component.
 */
function PageCta({ c }: { c: SiteContent }) {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div className="crossbar absolute inset-0 opacity-30" aria-hidden />
      <div className={cn(SHELL, "relative")}>
        <p className="max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl">
          {c.contact.intro.title}
        </p>
        <Lead className="mt-4">{c.products.intro.lead}</Lead>
        <Button className="mt-8" href={path("contact")}>
          {c.nav.cta}
        </Button>
      </div>
    </Section>
  );
}

/**
 * One hardware family, one block, one screen-ish.
 *
 * Reading order is the same on every width — identity, portrait, claim, numbers,
 * use cases — and only the geometry changes:
 *
 *   phone            ≥ lg
 *   identity         identity ─────────────────────  ← the shared datum
 *   portrait         portrait │ claim
 *   claim                     │ ══ numbers
 *   numbers          use-case rail ────────────────
 *   use-case rail
 *
 * The identity bar spans the full width above the split, so every block starts
 * its two columns on one horizontal line (ux-10: the media used to float
 * 10–119px off the copy, differently in each block).
 */
function ChipBlock({
  c,
  product,
  flip,
  groupIntro,
}: {
  c: SiteContent;
  product: Product;
  flip: boolean;
  groupIntro?: GroupIntro;
}) {
  const statusLabel = product.statusNote ?? c.status[product.status];

  return (
    <Section id={product.id} className={cn(flip && "bg-surface")}>
      <div className={SHELL}>
        {groupIntro ? <GroupHead group={groupIntro} /> : null}

        {/* ── Identity ─────────────────────────────────────────────────── */}
        <header className="border-b border-line pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <OriginTag origin={product.origin} label={c.origin[product.origin]} />
            <StatusBadge status={product.status} label={statusLabel} />
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl lg:text-4xl">{product.name}</h3>
          {product.tagline ? (
            <p className="mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent sm:text-[0.78rem]">
              {product.tagline}
            </p>
          ) : null}
        </header>

        {/* ── Portrait + claim ─────────────────────────────────────────── */}
        {/* The split starts at `md`, not `lg`: 768–1023px is a real band and a
            stacked plinth there rendered 704×563 and pushed MINT to 1927px. */}
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-start md:gap-8 lg:gap-12">
          {/* The plinth is short and the proof band is long, so from `md` the
              copy column runs ~780px past the bottom of the portrait. Stretching
              the cell and pinning the figure inside it keeps the chip in view
              while its numbers scroll past, instead of leaving a dead column. */}
          <div className={cn("md:col-span-5 md:self-stretch", flip ? "md:order-2" : "md:order-1")}>
            <ChipPlinth
              media={product.media}
              pendingLabel={c.ui.imagePending}
              // A `roadmap` part keeps its label inside the frame: the render is
              // glossy enough to read as shipping hardware if the two ever come
              // apart — a screenshot, a scroll position (CLAUDE.md §2 luật 4).
              // The short label, not `statusNote`: the full sentence wrapped to
              // two lines at 360px and covered the die. Caveat stays in the header.
              badge={
                product.status === "roadmap" ? (
                  <StatusBadge status={product.status} label={c.status[product.status]} />
                ) : undefined
              }
              className="md:sticky md:top-[calc(var(--header-h)_+_1.5rem)]"
            />
          </div>

          <div className={cn("md:col-span-7", flip ? "md:order-1" : "md:order-2")}>
            <Body className="max-w-xl">{product.body}</Body>

            {/* A hairline opens the band; the heavy rule belongs to each number.
                Columns follow the spec count, so the heavy rule always runs the
                full width it is given — one spec no longer promises three and
                leaves 68% of the band empty (ux-05). The band opener stays light
                so it does not stack a second identical rule 60px above the
                first when a product has one number. */}
            {product.specs.length > 0 ? (
              <div className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{c.ui.specs}</p>
                {/* Two numbers side by side only from `lg`: at `md` the copy
                    column is 392px and two 180px columns shred the note lines. */}
                <div className={cn("mt-5 grid gap-x-8 gap-y-7", product.specs.length > 1 && "lg:grid-cols-2")}>
                  {product.specs.map((spec) => (
                    <SpecCard
                      key={spec.label}
                      spec={spec}
                      statusLabel={c.status[spec.status]}
                      sourceLabel={c.ui.source}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* ── Use cases ────────────────────────────────────────────────── */}
        <AppRail
          label={c.ui.applications}
          items={product.capabilities}
          pendingLabel={c.ui.imagePending}
          className="mt-10 border-t border-line pt-6"
        />
      </div>
    </Section>
  );
}

/** One software family. Private AI adds the deployment-target row underneath. */
function SoftwareBlock({
  c,
  group,
  flip,
  groupIntro,
}: {
  c: SiteContent;
  group: SoftwareGroup;
  flip: boolean;
  groupIntro?: GroupIntro;
}) {
  // The 2.1/2.2 boundary keeps its dark band (docs/03-structure.md §4); it now
  // rides on the first software block instead of on an empty separator screen.
  const dark = Boolean(groupIntro);

  return (
    <Section id={group.id} tone={dark ? "dark" : "light"} className={cn(!dark && flip && "bg-surface")}>
      {dark ? <div className="crossbar absolute inset-0 opacity-30" aria-hidden /> : null}
      <div className={cn(SHELL, "relative")}>
        {groupIntro ? <GroupHead group={groupIntro} /> : null}

        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <div className={cn(flip && "md:order-2")}>
            <OriginTag origin={group.origin} label={c.origin[group.origin]} />
            <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">{group.name}</h3>
            <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent">
              {group.tagline}
            </p>
            <Body className="mt-4 max-w-xl">{group.body}</Body>

            <ItemList items={group.modules} className="mt-6" />
          </div>

          <Figure
            media={group.media}
            ratio="aspect-[16/10]"
            sizes="(min-width: 768px) 50vw, 100vw"
            pendingLabel={c.ui.imagePending}
            className={cn(flip && "md:order-1")}
          />
        </div>

        {group.targets && group.targetsTitle ? (
          <div className="mt-10 border-t border-line pt-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
              {group.targetsTitle}
            </p>
            <ol className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
              {group.targets.map((t, i) => (
                <li key={t.title} className="border-t-2 border-fg pt-3">
                  <span className="font-mono text-[0.65rem] tracking-[0.1em] text-accent" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1.5 text-base font-medium leading-snug sm:text-sm">{t.title}</p>
                  <Body className="mt-1.5">{t.body}</Body>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
