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

      {/* ── 2.1 Hardware ─────────────────────────────────────────────────── */}
      <GroupBand id="hardware" intro={hardware} />
      {hardware.items.map((item, i) => (
        <ChipBlock key={item.id} c={c} product={item} flip={i % 2 === 1} />
      ))}

      {/* ── 2.2 Software ─────────────────────────────────────────────────── */}
      <GroupBand id="software" intro={software} />
      {software.groups.map((group, i) => (
        <SoftwareBlock key={group.id} c={c} group={group} flip={i % 2 === 1} />
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
              <span className="flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-accent">
                {e.name}
                {/* A phone has no hover, so `group-hover:text-accent` was the
                    whole affordance and at rest these six read as body copy —
                    same colour as prose, no underline, no mark. A chevron in
                    accent says "goes somewhere" with no pointer involved. It
                    rides on the name line rather than at the row end so it
                    takes no width from the tagline: this block is `screen`, and
                    a tagline that wraps is height (CLAUDE.md §4b). Drawn from
                    borders, the way <Kicker> and the pending-frame ticks are. */}
                <span className="h-2 w-2 shrink-0 rotate-45 border-r-2 border-t-2 border-accent" aria-hidden />
              </span>
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

/**
 * The heading of 2.1 / 2.2 — a strip, not a block and not a passenger.
 *
 * It used to ride on top of the first product of its group, which cost that
 * product ~230px and put MINT at 995px against an 829px screen budget: one chip
 * no longer fitted one screen, which is the law (docs/03-structure.md §4b). It
 * cannot go back to owning a whole `<Section>` either — that is `ux-04`, where a
 * separator block took a rest position and cut MINT off underneath.
 *
 * So: a slim dark strip, kicker and title on one line, lead under it. It still
 * draws the 2.1/2.2 boundary the visual rhythm needs (§4), it still owns the
 * `#hardware` / `#software` anchors, and it is too short to be mistaken for a
 * screen of its own.
 */
function GroupBand({ id, intro }: { id: string; intro: Intro }) {
  return (
    <div id={id} className="tone-dark relative overflow-hidden bg-bg py-5 text-fg sm:py-6">
      <div className="crossbar absolute inset-0 opacity-30" aria-hidden />
      <div className={cn(SHELL, "relative")}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">{intro.kicker}</p>
          <h2 className="font-display text-lg font-semibold leading-snug sm:text-xl">{intro.title}</h2>
        </div>
        {intro.lead ? <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">{intro.lead}</p> : null}
      </div>
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
 * One hardware family, one block, one screen.
 *
 *   phone                  md / lg
 *   identity               identity ─────────────────────────  ← the shared datum
 *   portrait               portrait │ what it is
 *   what it is                      │ ══ what is measured
 *   what is measured       use-case row ─────────────────────
 *   use-case row
 *
 * The identity bar spans the full width above the split, so every block starts
 * its two columns on one horizontal line (ux-10: the media used to float
 * 10–119px off the copy, differently in each block). Name, tagline and the two
 * evidence labels share that one line rather than stacking three — the bar
 * still reads as the datum, at ~90px instead of ~160px.
 *
 * The portrait is 4/12 from `lg`, not 5/12, and no longer sticky: the copy
 * beside it is now a claim and a band of numbers, roughly the height of the
 * picture, so there is nothing left to scroll past and pin against.
 */
function ChipBlock({
  c,
  product,
  flip,
}: {
  c: SiteContent;
  product: Product;
  flip: boolean;
}) {
  const statusLabel = product.statusNote ?? c.status[product.status];
  // A product whose copy is still unwritten must not flip: it would park the
  // portrait on the right with half a screen of nothing beside it. Until there
  // is something to read, the picture stays on the reading side.
  const hasCopy = Boolean(product.body) || product.specs.length > 0;
  const mediaRight = flip && hasCopy;

  return (
    <Section id={product.id} dense className={cn(flip && "bg-surface")}>
      <div className={SHELL}>
        {/*
          One grid, two geometries — GM 2026-08-24, một chip = một màn ở mọi khổ:

            phone                     md / lg
            [portrait │ identity]     [ identity ──────────────────── ]
            [ claim ───────────]      [ portrait │ claim              ]
            [ numbers ─────────]      [          │ ══ numbers         ]
            [ use cases ───────]      [ use cases ──────────────────── ]

          On a phone the portrait rides beside the name: a 139px thumbnail there
          costs no height at all, where a full-width plinth cost 280px of a 788px
          budget and a column of its own left the copy running 200px past the
          bottom of the picture. The prose then gets all 350px, which is the width
          it needs to read as prose. From `md` the identity goes back to being the
          full-width datum above the split (ux-10).
        */}
        <div className="grid grid-cols-12 items-start gap-x-3 gap-y-4 sm:gap-x-5 md:gap-8 lg:gap-10">
          {/* ── Portrait ───────────────────────────────────────────────── */}
          <div
            className={cn(
              // 4/12 from `md`, not 5/12: the plinth is width-driven and square,
              // so in a 931px window it was 340px tall and pushed the block past
              // a short laptop viewport on its own.
              "col-span-5 row-start-1 md:col-span-4 md:row-start-2",
              mediaRight ? "md:order-2" : "md:order-1",
            )}
          >
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
            />
          </div>

          {/* ── Identity ───────────────────────────────────────────────── */}
          <header className="col-span-7 row-start-1 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 self-center md:col-span-12 md:self-auto md:gap-x-4 md:border-b md:border-line md:pb-3">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl lg:text-[2.1rem]">{product.name}</h3>
            {product.tagline ? (
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent sm:text-[0.78rem]">
                {product.tagline}
              </p>
            ) : null}
            {/* Pushed to the far end of the same line from `md`, never onto a line
                of their own: whose part it is, read with the name rather than
                after it. No "ĐÃ CÓ" here any more (GM, 2026-08-24) — a part on
                sale is the default and the label said nothing twice per block;
                `roadmap` still shouts, here and inside the frame. */}
            <div className="flex flex-wrap items-center gap-2 md:ml-auto">
              <OriginTag origin={product.origin} label={c.origin[product.origin]} />
              {product.status === "roadmap" ? <StatusBadge status={product.status} label={statusLabel} /> : null}
            </div>
          </header>

          {/* ── Claim + numbers ────────────────────────────────────────── */}
          <div
            className={cn(
              // `min-w-0`: a grid item is min-width:auto by default, so the
              // sliding numbers inside widened the whole grid — 931px viewport,
              // 1509px page — instead of scrolling in their own box.
              "col-span-12 row-start-2 min-w-0 md:col-span-8",
              mediaRight ? "md:order-1" : "md:order-2",
            )}
          >
            <Body className="max-w-2xl">{product.body}</Body>

            {/* The mono label alone opens the band — the hairline that used to sit
                above it was a second rule 40px from the heavy one every number
                already carries (GM: fewer dividers, 2026-08-24). Columns follow
                the spec count, so the heavy rule always runs the full width it is
                given — one spec no longer promises three and leaves 68% of the
                band empty (ux-05). */}
            {product.specs.length > 0 ? (
              <div className={cn(product.body && "mt-5 md:mt-6")}>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{c.ui.specs}</p>
                {/* Two numbers side by side only from `lg`: at `md` the copy
                    column is ~570px and two 270px columns still shred note lines
                    on the narrow end of that band. */}
                {/* Below `lg` the numbers slide, the same affordance the use-case
                    row uses: two of them stacked are 371px of a phone screen and
                    150px of a short laptop one, and nothing may be dropped — a
                    number keeps its method and its source. From `lg` the copy
                    column is 700px and they sit two-up, where a stacked pair
                    would leave the second one below the fold anyway. */}
                {/* `relative` decides where the `sr-only` span inside each
                    <SpecCard> is laid out. It is absolutely positioned, so it
                    resolves against the nearest positioned ancestor — and a
                    *static* scroll container never clips one. Left static, the
                    fourth card's span sat at its static x=907 in the section's
                    coordinates and dragged the whole document to 907/373 at
                    390px. Only a block with more than two numbers reaches that
                    far out, which is why PAPAYA FLEX leaked alone.
                    `tabIndex`/`role` match <AppRail>: below `lg` this is a
                    scroller and the cards past the edge have no other way in. */}
                <div
                  role="group"
                  aria-label={c.ui.specs}
                  tabIndex={0}
                  className={cn(
                    "rail relative -mx-5 mt-3 flex snap-x snap-mandatory gap-x-4 overflow-x-auto overscroll-x-contain px-5 pb-1 scroll-pl-5",
                    "sm:-mx-8 sm:px-8 sm:scroll-pl-8 md:mx-0 md:px-0 md:scroll-pl-0",
                    "lg:grid lg:gap-x-8 lg:gap-y-6 lg:overflow-visible lg:pb-0",
                    product.specs.length > 1 && "lg:grid-cols-2",
                  )}
                >
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className={cn(
                        "flex lg:w-auto",
                        // One number is not a rail — it keeps the whole width, so
                        // its heavy rule still runs edge to edge (ux-05).
                        product.specs.length > 1 ? "w-[84%] shrink-0 snap-start" : "w-full",
                      )}
                    >
                      <SpecCard spec={spec} statusLabel={c.status[spec.status]} sourceLabel={c.ui.source} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* ── Use cases: the closing row, thumbnails and labels ─────────── */}
        <AppRail
          label={c.ui.applications}
          items={product.capabilities}
          pendingLabel={c.ui.imagePending}
          className="mt-6 md:mt-8"
        />
      </div>
    </Section>
  );
}

/**
 * One software family — same rhythm as a chip block, so the page reads as one
 * catalogue: identity bar, picture on one side, what it is on the other, and a
 * horizontal row to close. Private AI closes with the deployment-target row.
 *
 * The modules run two-up inside the copy column instead of one long list beside
 * a dead picture column: five stacked rows put the block at 964px, and the
 * bottom three of them sat next to nothing at all.
 */
function SoftwareBlock({
  c,
  group,
  flip,
}: {
  c: SiteContent;
  group: SoftwareGroup;
  flip: boolean;
}) {
  return (
    // The 2.1/2.2 boundary is drawn by <GroupBand> above, not by painting a whole
    // product block dark (docs/03-structure.md §4): a strip marks a border, a
    // block that has to hold a picture and five modules should not have to.
    <Section id={group.id} dense className={cn(flip && "bg-surface")}>
      <div className={SHELL}>
        {/* Same grid as a chip block — see ChipBlock for the two geometries. */}
        <div className="grid grid-cols-12 items-start gap-x-3 gap-y-4 sm:gap-x-5 md:gap-8 lg:gap-10">
          <Figure
            media={group.media}
            ratio="aspect-[16/10]"
            sizes="(min-width: 1024px) 26vw, (min-width: 768px) 30vw, 38vw"
            pendingLabel={c.ui.imagePending}
            className={cn(
              "col-span-5 row-start-1 md:col-span-4 md:row-start-2",
              flip ? "md:order-2" : "md:order-1",
            )}
          />

          <header className="col-span-7 row-start-1 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 self-center md:col-span-12 md:self-auto md:gap-x-4 md:border-b md:border-line md:pb-3">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl lg:text-[2.1rem]">{group.name}</h3>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent sm:text-[0.78rem]">
              {group.tagline}
            </p>
            <div className="md:ml-auto">
              <OriginTag origin={group.origin} label={c.origin[group.origin]} />
            </div>
          </header>

          <div
            className={cn(
              "col-span-12 row-start-2 md:col-span-8",
              flip ? "md:order-1" : "md:order-2",
            )}
          >
            <Body className="max-w-2xl">{group.body}</Body>
          </div>
        </div>

        {/* The modules run the full width under the row rather than inside the
            copy column: five of them in a 197px phone column is a block no screen
            holds, and next to a 228px picture on desktop the bottom three sat
            beside nothing. */}
        <ItemList items={group.modules} className="mt-4 sm:grid-cols-2 sm:gap-x-8 lg:mt-6 lg:grid-cols-3" />

        {group.targets && group.targetsTitle ? (
          <div className="mt-6 md:mt-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
              {group.targetsTitle}
            </p>
            <ol
              className={cn(
                "rail -mx-5 mt-3 flex snap-x snap-mandatory gap-x-4 overflow-x-auto overscroll-x-contain px-5 pb-1 scroll-pl-5",
                "sm:mx-0 sm:grid sm:gap-x-6 sm:gap-y-4 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-3 lg:grid-cols-5",
              )}
            >
              {group.targets.map((t, i) => (
                <li key={t.title} className="w-40 shrink-0 snap-start border-t-2 border-fg pt-3 sm:w-auto">
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
