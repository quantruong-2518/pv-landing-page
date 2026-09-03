import Image from "next/image";
import type { HardwareVariant, Intro, Media, Product, SiteContent } from "@/content/types";
import { OriginTag, Section, SHELL, StatusBadge } from "@/components/ui";
import {
  ApplicationRow,
  BlockCta,
  BlockHeadline,
  BlockKicker,
  CAT_BAND,
  CAT_TEXT,
  IconList,
  SpecIsland,
  StatTiles,
  TagPill,
  TagRow,
} from "@/components/products/ui";
import { cn } from "@/lib/cn";
import { path } from "@/lib/routes";

/**
 * Canva artboards 2–5: one hardware family per block, all four the same shape.
 * Dark band carrying the identity and the render, a white specification island
 * cutting into it, the applications, one button.
 *
 * A family with `variants` gets one island per variant — PAPAYA/PAPAYA FLEX and
 * E10/E20 are two measured parts under one name, and merging their numbers into
 * one table is how a benchmark loses the part it was measured on.
 */
export function HardwareBlock({ c, intro, product }: { c: SiteContent; intro: Intro; product: Product }) {
  const variants = product.variants ?? [];
  const islands = variants.length + (product.supportingItems?.length ? 1 : 0);

  return (
    <Section id={product.id} dense tone="dark" className={cn(CAT_BAND.hardware, "overflow-hidden")}>
      <div className={SHELL}>
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="min-w-0">
            <BlockKicker category="hardware">{intro.kicker}</BlockKicker>
            <BlockHeadline
              className="mt-3"
              headline={product.headline}
              name={product.name}
              category="hardware"
            />
            {product.tagline ? (
              <p className="mt-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-subtle sm:text-[0.78rem]">
                {product.tagline}
              </p>
            ) : null}
            {product.body ? (
              <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-muted">{product.body}</p>
            ) : null}

            <TagRow className="mt-5">
              <OriginTag origin={product.origin} label={c.origin[product.origin]} />
              <StatusBadge status={product.status} label={product.statusNote ?? c.status[product.status]} />
              <TagPill category="hardware">{product.technologyLabel}</TagPill>
            </TagRow>
          </div>

          <div
            className={cn(
              "grid gap-4",
              variants.length > 1 ? "grid-cols-2" : "mx-auto w-full max-w-[26rem] lg:mx-0 lg:max-w-none",
            )}
          >
            {variants.length > 1
              ? variants.map((variant) => (
                  <Render key={variant.name} media={variant.media} label={variant.name} pendingLabel={c.ui.imagePending} />
                ))
              : <Render media={product.media} pendingLabel={c.ui.imagePending} />}
          </div>
        </div>

        <div
          className={cn(
            "mt-8 grid gap-4 sm:mt-10",
            islands >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : islands === 2 ? "md:grid-cols-2" : "",
          )}
        >
          {variants.length > 0 ? (
            variants.map((variant) => (
              <MetricsIsland
                key={variant.name}
                c={c}
                title={variant.name}
                eyebrow={variant.tagline}
                lead={variant.applicationLead}
                metrics={variant.metrics}
                columns={2}
              />
            ))
          ) : (
            <MetricsIsland c={c} metrics={product.metrics} />
          )}

          {product.supportingItems?.length ? (
            <SpecIsland title={product.supportingTitle ?? c.ui.softwareStack}>
              <IconList items={product.supportingItems} category="hardware" />
            </SpecIsland>
          ) : null}
        </div>

        {/* Where the numbers above came from — rule #1: a figure ships with its
            provenance. It sits under the islands rather than inside each one
            because `source` belongs to the family: printing it in both of
            PAPAYA's panels would only say the same sentence twice. */}
        {product.source ? (
          <p className="mt-3 font-mono text-[0.65rem] leading-relaxed text-subtle">
            <span className="sr-only">{c.ui.source}: </span>
            {product.source}
          </p>
        ) : null}

        {product.applicationLead ? (
          <p className="mt-8 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted sm:mt-10">{product.applicationLead}</p>
        ) : null}

        <div className={cn(product.applicationLead ? "mt-4" : "mt-8 sm:mt-10")}>
          <ApplicationRow
            label={c.ui.applications}
            items={product.capabilities}
            pendingLabel={c.ui.imagePending}
            category="hardware"
          />
        </div>

        <div className="mt-8">
          <BlockCta href={path("contact")} label={c.products.ctaLabel} fallbackLabel={c.nav.cta} />
        </div>
      </div>
    </Section>
  );
}

/**
 * The render sits straight on the band: every chip file is a cut-out with an
 * alpha channel, so a plinth behind one would only draw a box the photograph
 * does not have. The glow under it is the band's own accent, not a second one.
 */
function Render({ media, label, pendingLabel }: { media: Media; label?: string; pendingLabel: string }) {
  return (
    <figure className="relative">
      <span
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-hardware)_28%,transparent),transparent_68%)] blur-2xl"
        aria-hidden
      />
      <div className="relative aspect-[4/3]">
        {media.src ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 44vw, 88vw"
            className="object-contain"
          />
        ) : (
          <div className="tone-light absolute inset-0 rounded-lg border border-line bg-bg">
            <PendingBrief alt={media.alt} label={pendingLabel} />
          </div>
        )}
      </div>
      {label ? (
        <figcaption className="mt-2 text-center">
          <span className="inline-flex min-h-6 items-center rounded bg-primary px-2.5 py-1 text-[0.7rem] font-semibold text-primary-fg">
            {label}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}

/** The pending frame, reduced to what fits inside a render slot. */
function PendingBrief({ alt, label }: { alt: string; label: string }) {
  return (
    <div className="crossbar flex h-full flex-col items-center justify-center gap-2 p-5 text-center">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-subtle">{label}</p>
      {alt ? <p className="max-w-[30ch] text-xs leading-relaxed text-muted">{alt}</p> : null}
    </div>
  );
}

/**
 * One white island of numbers. Every one of them opens with the same mono
 * "THÔNG SỐ CHÍNH" line, so a block with two variant panels still reads as one
 * specification, split by part rather than by heading.
 */
function MetricsIsland({
  c,
  title,
  eyebrow,
  lead,
  metrics,
  columns,
}: {
  c: SiteContent;
  title?: string;
  eyebrow?: string;
  lead?: string;
  metrics: HardwareVariant["metrics"];
  columns?: 2 | 4;
}) {
  return (
    <SpecIsland title={title} eyebrow={eyebrow}>
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-subtle">{c.ui.productMetrics}</p>
      {lead ? (
        <p className={cn("mt-2 text-[0.85rem] font-medium leading-snug", CAT_TEXT.hardware)}>{lead}</p>
      ) : null}
      <div className="mt-4">
        <StatTiles metrics={metrics} labels={c.ui.metricLabels} category="hardware" columns={columns} />
      </div>
    </SpecIsland>
  );
}
