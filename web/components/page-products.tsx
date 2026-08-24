import type {
  HardwareVariant,
  Intro,
  Item,
  Product,
  ProductMetric,
  ProductStage,
  SiteContent,
  SoftwareGroup,
  SystemIconName,
  TrainingOffer,
} from "@/content/types";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import {
  AppRail,
  Body,
  ChipPlinth,
  OriginTag,
  Section,
  SectionHead,
  SHELL,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { path } from "@/lib/routes";

type Category = "hardware" | "software" | "training";

const CATEGORY_BORDER: Record<Category, string> = {
  hardware: "border-hardware",
  software: "border-software",
  training: "border-training",
};

const CATEGORY_TEXT: Record<Category, string> = {
  hardware: "text-hardware",
  software: "text-software",
  training: "text-training",
};

const STAGE_STYLE: Record<ProductStage, string> = {
  "mass-production": "border-shipped text-shipped",
  "customer-poc": "border-poc text-poc",
  "product-data": "border-integration text-integration",
  integration: "border-integration text-integration",
  roadmap: "border-roadmap text-roadmap",
  research: "border-research text-research",
};

/** One catalogue page, three visibly distinct decision layers. */
export function ProductsPage({ c }: { c: SiteContent }) {
  const { intro, hardware, software, training, followUp } = c.products;

  return (
    <PageShell c={c} page="products">
      <Section screen className="products-index border-b border-line">
        <div className={cn(SHELL, "grid items-start gap-7 lg:grid-cols-12 lg:gap-12")}>
          <div className="lg:col-span-4 lg:pt-2">
            <SectionHead intro={intro} as="h1" />
            <a
              href={path("products", "hardware")}
              className="group mt-5 hidden min-h-11 items-center gap-3 border-b border-line-strong text-sm font-medium text-fg transition-colors hover:border-hardware hover:text-hardware lg:inline-flex"
            >
              {intro.scrollLabel}
              <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-4 lg:col-span-8" aria-label={intro.title}>
            <DecisionGroup
              category="hardware"
              label={c.nav.hardware}
              className="col-span-2"
              entries={hardware.items.map((item) => ({
                id: item.id,
                name: item.indexName ?? item.name,
                decisionLabel: item.decisionLabel,
                stage: item.stage,
                stageLabel: item.indexStageLabel,
              }))}
            />
            <DecisionGroup
              category="software"
              label={c.nav.software}
              entries={software.groups.map((group) => ({
                id: group.id,
                name: group.indexName ?? group.name,
                decisionLabel: group.decisionLabel,
                stage: group.stage,
                stageLabel: group.indexStageLabel,
              }))}
            />
            <DecisionGroup
              category="training"
              label={c.nav.training}
              entries={[{
                id: training.offer.id,
                name: training.offer.indexName ?? training.offer.name,
                decisionLabel: training.offer.decisionLabel,
                stage: training.offer.stage,
                stageLabel: training.offer.indexStageLabel,
              }]}
            />
          </nav>
        </div>
      </Section>

      <GroupLead id="hardware" intro={hardware} category="hardware" />
      {hardware.items.map((product) => (
        <ChipBlock key={product.id} c={c} product={product} />
      ))}

      <GroupLead
        id="software"
        intro={software}
        category="software"
        stage={software.groups[0]?.stage}
        stageLabel={software.groups[0]?.statusNote}
      />
      {software.groups.map((group) => (
        <SoftwareBlock key={group.id} c={c} group={group} />
      ))}

      <GroupLead
        id="training"
        intro={training}
        category="training"
        stage={training.offer.stage}
        stageLabel={training.offer.statusNote}
      />
      <TrainingBlock c={c} offer={training.offer} />

      <FollowUp c={c} kicker={followUp.kicker} title={followUp.title} />
    </PageShell>
  );
}

function DecisionGroup({
  category,
  label,
  entries,
  className,
}: {
  category: Category;
  label: string;
  entries: Array<{
    id: string;
    name: string;
    decisionLabel: string;
    stage: ProductStage;
    stageLabel: string;
  }>;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={cn("mb-2 font-mono text-[0.65rem] uppercase tracking-[0.16em]", CATEGORY_TEXT[category])}>
        {label}
      </p>
      <ul className={cn("grid gap-3", entries.length > 1 && "grid-cols-2")}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={path("products", entry.id)}
              className={cn(
                "group flex h-full min-h-[6.75rem] flex-col border border-line-strong border-t-2 p-3 transition-transform hover:-translate-y-0.5 sm:min-h-32 sm:p-4",
                CATEGORY_BORDER[category],
              )}
            >
              <span className="flex items-start justify-between gap-2">
                <span className="font-display text-[0.92rem] font-semibold leading-tight sm:text-lg">{entry.name}</span>
                <span className={cn("shrink-0 transition-transform group-hover:translate-x-0.5", CATEGORY_TEXT[category])} aria-hidden>
                  ↘
                </span>
              </span>
              <span className="mt-1.5 text-[0.7rem] leading-snug text-muted sm:mt-2 sm:text-sm">{entry.decisionLabel}</span>
              <StageBadge stage={entry.stage} label={entry.stageLabel} compact className="mt-auto pt-3" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GroupLead({
  id,
  intro,
  category,
  stage,
  stageLabel,
}: {
  id: string;
  intro: Intro;
  category: Category;
  stage?: ProductStage;
  stageLabel?: string;
}) {
  return (
    <div id={id} className={cn("border-t-2 py-6 sm:py-8", CATEGORY_BORDER[category])}>
      <div className={SHELL}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.18em]", CATEGORY_TEXT[category])}>
            {intro.kicker}
          </p>
          <h2 className="font-display text-xl font-semibold leading-tight sm:text-2xl">{intro.title}</h2>
          {stage && stageLabel ? <StageBadge stage={stage} label={stageLabel} /> : null}
        </div>
        {intro.lead ? <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted sm:text-base">{intro.lead}</p> : null}
      </div>
    </div>
  );
}

function StageBadge({
  stage,
  label,
  compact = false,
  className,
}: {
  stage: ProductStage;
  label: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex w-fit items-center", className)}>
      <span
        className={cn(
          "inline-flex w-fit items-center gap-1.5 rounded-full border font-mono uppercase leading-none tracking-[0.1em]",
          compact ? "px-2 py-1 text-[0.58rem] sm:text-[0.65rem]" : "px-2.5 py-1.5 text-[0.65rem] sm:text-[0.7rem]",
          STAGE_STYLE[stage],
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
        {label}
      </span>
    </span>
  );
}

function Transition({ children, category }: { children: string; category: Category }) {
  return (
    <p className="mb-4 flex max-w-3xl items-start gap-3 text-sm leading-relaxed text-muted sm:mb-5 sm:text-base">
      <span className={cn("mt-[0.65em] h-px w-8 shrink-0", category === "hardware" ? "bg-hardware" : category === "software" ? "bg-software" : "bg-training")} aria-hidden />
      {children}
    </p>
  );
}

function ChipBlock({ c, product }: { c: SiteContent; product: Product }) {
  const stageLabel = product.statusNote ?? c.status[product.status];

  if (product.variants?.length) {
    return <AcceleratorBlock c={c} product={product} variants={product.variants} />;
  }

  return (
    <Section id={product.id} dense className="product-dossier border-t border-line">
      <div className={SHELL}>
        <Transition category="hardware">{product.transition}</Transition>

        <article className="overflow-hidden border border-line">
          <header className="grid items-start gap-3 border-b border-line px-4 py-3 sm:px-5 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">{product.name}</h3>
              <p className="mt-1 font-mono text-[0.66rem] uppercase leading-snug tracking-[0.1em] text-hardware sm:text-[0.75rem]">
                {product.tagline}
              </p>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2 md:justify-end">
              <OriginTag origin={product.origin} label={c.origin[product.origin]} />
              <StageBadge stage={product.stage} label={stageLabel} compact />
            </div>
          </header>

          <div className="grid grid-cols-12 items-stretch">
            <div className="col-span-5 border-r border-line p-3 sm:col-span-4 sm:p-4 lg:p-5">
              <ChipPlinth
                media={product.media}
                pendingLabel={c.ui.imagePending}
                className="sticky top-[calc(var(--header-h)+1rem)]"
                badge={product.stage === "roadmap" ? <StageBadge stage={product.stage} label={stageLabel} compact /> : undefined}
              />
            </div>

            <div className="col-span-7 min-w-0 p-3.5 sm:col-span-8 sm:p-5 lg:p-5">
              <p className="max-w-2xl text-base font-medium leading-snug text-hardware sm:text-xl lg:text-2xl">
                {product.applicationLead}
              </p>
              <MetricList label={c.ui.productMetrics} labels={c.ui.metricLabels} metrics={product.metrics} />
              {product.source ? (
                <p className="mt-4 border-t border-line pt-3 font-mono text-[0.58rem] leading-relaxed text-subtle sm:text-[0.65rem]">
                  <span className="mr-2 uppercase tracking-[0.12em]">{c.ui.source}</span>
                  {product.source}
                </p>
              ) : null}
            </div>
          </div>

          <div className="border-t border-line px-4 py-3.5 sm:px-5 sm:py-4">
            <AppRail label={c.ui.applications} items={product.capabilities} pendingLabel={c.ui.imagePending} />
          </div>
        </article>
      </div>
    </Section>
  );
}

function MetricList({ label, labels, metrics }: { label: string; labels: SiteContent["ui"]["metricLabels"]; metrics: ProductMetric[] }) {
  return (
    <div className="mt-3 sm:mt-4">
      <p className="sr-only">{label}</p>
      <ol className="border-t border-line">
        {metrics.map((metric, index) => (
          <li
            key={metric.label}
            className="grid grid-cols-[1.65rem_minmax(0,1fr)] gap-x-2 border-b border-line py-2 sm:grid-cols-[2rem_minmax(7rem,0.8fr)_minmax(0,1fr)] sm:items-baseline sm:gap-x-3"
          >
            <span className="font-mono text-[0.6rem] text-hardware">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.06em] text-muted sm:text-xs">{labels[metric.label]}</span>
            <span className="col-start-2 mt-0.5 min-w-0 font-mono text-base font-semibold leading-tight text-fg sm:col-start-3 sm:mt-0 sm:text-xl">
              {metric.value}
              {metric.note ? (
                <small className="mt-1 block font-sans text-[0.68rem] font-normal leading-relaxed text-muted sm:text-xs">{metric.note}</small>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function AcceleratorBlock({ c, product, variants }: { c: SiteContent; product: Product; variants: HardwareVariant[] }) {
  const stageLabel = product.statusNote ?? c.status[product.status];

  return (
    <Section id={product.id} dense className="product-dossier border-t border-line">
      <div className={SHELL}>
        <Transition category="hardware">{product.transition}</Transition>
        <article className="overflow-hidden border border-line">
          <header className="grid items-start gap-3 border-b border-line px-4 py-3 sm:px-5 sm:py-4 md:grid-cols-[minmax(0,1fr)_auto] lg:px-6">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">{product.name}</h3>
              <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-hardware sm:text-[0.75rem]">{product.tagline}</p>
              <p className="mt-2 max-w-3xl text-[0.8rem] leading-relaxed text-muted sm:text-sm">{product.body}</p>
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2 md:justify-end">
              <OriginTag origin={product.origin} label={c.origin[product.origin]} />
              <StageBadge stage={product.stage} label={stageLabel} compact />
            </div>
          </header>

          <div className="grid divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {variants.map((variant) => (
              <div key={variant.name} className="grid grid-cols-12 items-stretch">
                <div className="col-span-4 border-r border-line p-3 sm:p-4 lg:p-4">
                  <ChipPlinth media={variant.media} pendingLabel={c.ui.imagePending} />
                </div>
                <div className="col-span-8 min-w-0 p-3.5 sm:p-5 lg:p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="font-display text-2xl font-semibold leading-none sm:text-3xl">{variant.name}</h4>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-hardware sm:text-[0.7rem]">{variant.tagline}</p>
                  </div>
                  <p className="mt-2 max-w-2xl text-[0.78rem] font-medium leading-snug text-hardware sm:text-base">{variant.applicationLead}</p>
                  <MetricList label={c.ui.productMetrics} labels={c.ui.metricLabels} metrics={variant.metrics} />
                </div>
              </div>
            ))}
          </div>

          {product.supportingItems?.length ? (
            <div className="border-t border-line px-4 py-3 sm:px-5 lg:px-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{product.supportingTitle ?? c.ui.softwareStack}</p>
              <ul className="rail mt-2 flex gap-2 overflow-x-auto pb-1">
                {product.supportingItems.map((item) => (
                  <li key={item.title} className="shrink-0 border border-line px-3 py-2 text-xs font-medium leading-snug text-fg" title={item.body}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="border-t border-line px-4 py-2.5 font-mono text-[0.58rem] leading-relaxed text-subtle sm:px-5 sm:text-[0.65rem] lg:px-6">
            <span className="mr-2 uppercase tracking-[0.12em]">{c.ui.source}</span>
            {product.source}
          </p>

          <div className="border-t border-line px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
            <AppRail label={c.ui.applications} items={product.capabilities} pendingLabel={c.ui.imagePending} />
          </div>
        </article>
      </div>
    </Section>
  );
}

function SoftwareBlock({ c, group }: { c: SiteContent; group: SoftwareGroup }) {
  return (
    <Section id={group.id} dense className="border-t border-line">
      <div className={SHELL}>
        <Transition category="software">{group.transition}</Transition>

        <header className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-line pb-4">
          <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">{group.name}</h3>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-software sm:text-[0.75rem]">{group.tagline}</p>
          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            <OriginTag origin={group.origin} label={c.origin[group.origin]} />
            <StageBadge stage={group.stage} label={group.statusNote ?? c.status[group.status]} compact />
          </div>
        </header>

        <Body className="mt-4 max-w-3xl">{group.body}</Body>
        <IconCardGrid items={group.modules} category="software" className="mt-5 md:mt-6" />
      </div>
    </Section>
  );
}

function TrainingBlock({ c, offer }: { c: SiteContent; offer: TrainingOffer }) {
  return (
    <Section id={offer.id} dense className="border-t border-line">
      <div className={SHELL}>
        <Transition category="training">{offer.transition}</Transition>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
          <header className="lg:col-span-5">
            <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">{offer.name}</h3>
            <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-training sm:text-[0.75rem]">{offer.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <OriginTag origin={offer.origin} label={c.origin[offer.origin]} />
              <StageBadge stage={offer.stage} label={offer.statusNote} compact />
            </div>
            <Body className="mt-4 max-w-xl">{offer.body}</Body>
          </header>

          <IconCardGrid items={offer.principles} category="training" className="lg:col-span-7" />
        </div>
      </div>
    </Section>
  );
}

function IconCardGrid({ items, category, className }: { items: Item[]; category: "software" | "training"; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3", className)}>
      {items.map((item, index) => (
        <li
          key={item.title}
          className={cn(
            "relative isolate min-h-40 overflow-hidden border border-line-strong p-4 sm:min-h-44 sm:p-5",
            category === "software" && index === items.length - 1 && "col-span-2 lg:col-span-2",
          )}
        >
          {item.icon ? (
            <SystemIcon
              name={item.icon}
              className={cn("absolute -right-3 -top-3 -z-10 h-28 w-28 opacity-[0.09] sm:h-32 sm:w-32", CATEGORY_TEXT[category])}
            />
          ) : null}
          <p className={cn("font-mono text-[0.62rem] uppercase tracking-[0.14em]", CATEGORY_TEXT[category])}>
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-7 max-w-[14rem] font-display text-lg font-semibold leading-tight sm:text-xl">{item.title}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

function FollowUp({ c, kicker, title }: { c: SiteContent; kicker: string; title: string }) {
  return (
    <Section id="book" dense className="border-t-2 border-fg">
      <div className={SHELL}>
        <header className="grid gap-2 border-b border-line pb-5 md:grid-cols-12 md:items-end">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent md:col-span-3">{kicker}</p>
          <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl md:col-span-9 lg:text-4xl">{title}</h2>
        </header>
        <div className="mt-6 max-w-4xl">
          <ContactForm c={c} successHeadingAs="h3" />
        </div>
      </div>
    </Section>
  );
}

function SystemIcon({ name, className }: { name: SystemIconName; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {name === "crm" ? (
        <g {...common}><circle cx="24" cy="23" r="9" /><path d="M8 50c2-10 8-15 16-15s14 5 16 15" /><path d="M43 18h13v19H43zM47 24h5M47 29h5" /></g>
      ) : name === "erp" ? (
        <g {...common}><path d="M9 11h18v18H9zM37 11h18v18H37zM9 39h18v14H9zM37 39h18v14H37z" /><path d="M27 20h10M18 29v10M46 29v10" /></g>
      ) : name === "hrm" ? (
        <g {...common}><circle cx="32" cy="19" r="8" /><circle cx="15" cy="27" r="6" /><circle cx="49" cy="27" r="6" /><path d="M19 52c1-12 5-18 13-18s12 6 13 18M5 51c1-9 4-14 10-14 4 0 7 2 9 6M59 51c-1-9-4-14-10-14-4 0-7 2-9 6" /></g>
      ) : name === "dms" ? (
        <g {...common}><path d="M15 8h25l10 10v38H15z" /><path d="M40 8v11h10M23 29h19M23 37h19M23 45h13" /></g>
      ) : name === "ai" ? (
        <g {...common}><circle cx="32" cy="32" r="9" /><circle cx="12" cy="15" r="4" /><circle cx="52" cy="15" r="4" /><circle cx="12" cy="49" r="4" /><circle cx="52" cy="49" r="4" /><path d="M18 19l8 7M46 19l-8 7M18 46l8-7M46 46l-8-7" /></g>
      ) : name === "survey" ? (
        <g {...common}><path d="M18 10h28v46H18zM25 10V6h14v4" /><path d="M25 23l4 4 8-9M25 38h14M25 46h14" /></g>
      ) : name === "tailored" ? (
        <g {...common}><circle cx="32" cy="32" r="23" /><circle cx="32" cy="32" r="13" /><path d="M32 9v8M32 47v8M9 32h8M47 32h8M32 32l15-15" /></g>
      ) : name === "practice" ? (
        <g {...common}><path d="M10 49l17-17 7 7-17 17H10zM31 28l5-5 7 7-5 5" /><path d="M39 17l5-9 4 7 8 3-9 5" /></g>
      ) : (
        <g {...common}><path d="M10 52h44M15 46V31h8v15M28 46V21h8v25M41 46V11h8v35" /><path d="M13 23l13-8 11 2 14-10" /></g>
      )}
    </svg>
  );
}
