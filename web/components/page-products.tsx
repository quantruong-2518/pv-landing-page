import type { Intro, Product, SiteContent, SoftwareGroup } from "@/content/types";
import { path } from "@/lib/routes";
import { PageShell } from "@/components/page-shell";
import {
  Body,
  Figure,
  ItemList,
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

          <nav className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12" aria-label={intro.title}>
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
      <Section id="hardware" className="py-10 sm:py-14 lg:py-16">
        <div className={SHELL}>
          <SectionHead intro={hardware} />
        </div>
      </Section>

      {hardware.items.map((item, i) => (
        <ProductBlock key={item.id} c={c} product={item} flip={i % 2 === 1} />
      ))}

      {/* ── 2.2 Software ─────────────────────────────────────────────────── */}
      <Section id="software" tone="dark" className="py-10 sm:py-14 lg:py-16">
        <div className="crossbar absolute inset-0 opacity-30" aria-hidden />
        <div className={cn(SHELL, "relative")}>
          <SectionHead intro={software} />
        </div>
      </Section>

      {software.groups.map((group, i) => (
        <SoftwareBlock key={group.id} c={c} group={group} flip={i % 2 === 1} />
      ))}
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
      <ul className="mt-3">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={path("products", e.id)}
              className="flex min-h-12 flex-col justify-center border-t border-line py-2.5 transition-colors hover:bg-surface"
            >
              <span className="text-sm font-medium">{e.name}</span>
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

/** One hardware family. The media side alternates so the catalogue reads as a run. */
function ProductBlock({ c, product, flip }: { c: SiteContent; product: Product; flip: boolean }) {
  return (
    <Section id={product.id} className={cn(flip && "bg-surface")}>
      <div className={SHELL}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className={cn(flip && "lg:order-2")}>
            <div className="flex flex-wrap items-center gap-2">
              <OriginTag origin={product.origin} label={c.origin[product.origin]} />
              <StatusBadge
                status={product.status}
                label={product.statusNote ?? c.status[product.status]}
              />
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">{product.name}</h3>
            <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent">
              {product.tagline}
            </p>
            <Body className="mt-4 max-w-xl">{product.body}</Body>

            <ItemList items={product.capabilities} className="mt-6" />
          </div>

          <Figure
            media={product.media}
            ratio="aspect-[4/3]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            pendingLabel={c.ui.imagePending}
            className={cn(flip && "lg:order-1")}
          />
        </div>

        {product.specs.length > 0 ? (
          <div className="mt-10 border-t border-line pt-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{c.ui.specs}</p>
            <div className="mt-5 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
    </Section>
  );
}

/** One software family. Private AI adds the deployment-target row underneath. */
function SoftwareBlock({ c, group, flip }: { c: SiteContent; group: SoftwareGroup; flip: boolean }) {
  return (
    <Section id={group.id} className={cn(flip && "bg-surface")}>
      <div className={SHELL}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className={cn(flip && "lg:order-2")}>
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
            sizes="(min-width: 1024px) 50vw, 100vw"
            pendingLabel={c.ui.imagePending}
            className={cn(flip && "lg:order-1")}
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
                  <p className="mt-1.5 text-sm font-medium leading-snug">{t.title}</p>
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
