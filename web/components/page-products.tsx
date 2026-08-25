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
  SectionDivider,
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
      <Section screen className="products-index bg-surface">
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

      <SectionDivider />
      <div className="bg-surface-hardware">
        <GroupLead id="hardware" intro={hardware} category="hardware" />
        {hardware.items.map((product) => (
          <ChipBlock key={product.id} c={c} product={product} />
        ))}
      </div>

      <SectionDivider />
      <div id="software" className="bg-surface-software">
        {software.groups.map((group) => (
          <SoftwareBlock key={group.id} c={c} intro={software} group={group} />
        ))}
      </div>

      <SectionDivider />
      <div id="training" className="bg-surface-training">
        <TrainingBlock c={c} intro={training} offer={training.offer} />
      </div>

      <SectionDivider />
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
                "group flex h-full min-h-[6.75rem] flex-col border border-line-strong border-t-2 bg-bg p-3 transition-transform hover:-translate-y-0.5 sm:min-h-32 sm:p-4",
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
}: {
  id: string;
  intro: Intro;
  category: Category;
}) {
  return (
    <section id={id} className="py-8 sm:py-10">
      <div className={SHELL}>
        <header className="max-w-4xl">
          <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.18em]", CATEGORY_TEXT[category])}>
            {intro.kicker}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">{intro.title}</h2>
          {intro.lead ? <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{intro.lead}</p> : null}
        </header>
      </div>
    </section>
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

function DossierPill({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center border px-2.5 py-1 font-mono text-[0.6rem] uppercase leading-none tracking-[0.12em] sm:text-[0.65rem]",
        className,
      )}
    >
      {label}
    </span>
  );
}

function DossierPills({ c, product }: { c: SiteContent; product: Product }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2 md:justify-end">
      <DossierPill label={c.origin[product.origin]} className="border-line-strong text-subtle" />
      <DossierPill label={product.indexStageLabel} className={STAGE_STYLE[product.stage]} />
      <DossierPill label={product.technologyLabel} className="border-hardware text-hardware" />
    </div>
  );
}

function Transition({ children, category, className }: { children: string; category: Category; className?: string }) {
  return (
    <p className={cn("flex max-w-3xl items-start gap-3 text-sm leading-relaxed text-muted sm:text-base", className ?? "mb-4 sm:mb-5")}>
      <span className={cn("mt-[0.65em] h-px w-8 shrink-0", category === "hardware" ? "bg-hardware" : category === "software" ? "bg-software" : "bg-training")} aria-hidden />
      {children}
    </p>
  );
}

function ChipBlock({ c, product }: { c: SiteContent; product: Product }) {
  if (product.variants?.length) {
    return <AcceleratorBlock c={c} product={product} variants={product.variants} />;
  }

  return (
    <Section id={product.id} dense className="product-dossier">
      <div className={SHELL}>
        <Transition category="hardware">{product.transition}</Transition>

        <article className="overflow-hidden border border-line bg-bg">
          <header className="grid items-start gap-3 border-b border-line px-4 py-3 sm:px-5 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">{product.name}</h3>
            </div>
            <DossierPills c={c} product={product} />
          </header>

          <div className="grid grid-cols-12 items-stretch">
            <div className="col-span-5 border-r border-line p-3 sm:col-span-4 sm:p-4 lg:p-5">
              <ChipPlinth
                media={product.media}
                pendingLabel={c.ui.imagePending}
                className="sticky top-[calc(var(--header-h)+1rem)]"
              />
            </div>

            <div className="col-span-7 min-w-0 p-3.5 sm:col-span-8 sm:p-5 lg:p-5">
              <p className="max-w-2xl text-base font-medium leading-snug text-hardware sm:text-xl lg:text-2xl">
                {product.applicationLead}
              </p>
              <MetricList label={c.ui.productMetrics} labels={c.ui.metricLabels} metrics={product.metrics} />
              <AppRail
                label={c.ui.applications}
                items={product.capabilities}
                pendingLabel={c.ui.imagePending}
                className="mt-5 border-t border-line pt-4 sm:mt-6"
              />
            </div>
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
      <ol className="mt-1 grid gap-1">
        {metrics.map((metric, index) => (
          <li
            key={metric.label}
            className="grid grid-cols-[1.65rem_minmax(0,1fr)] gap-x-2 py-2 sm:grid-cols-[2rem_minmax(7rem,0.8fr)_minmax(0,1fr)] sm:items-baseline sm:gap-x-3"
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
  const wideMedia = product.id === "gpu";

  return (
    <Section id={product.id} dense className="product-dossier">
      <div className={SHELL}>
        <Transition category="hardware">{product.transition}</Transition>
        <article className="overflow-hidden border border-line bg-bg">
          <header className="grid items-start gap-3 border-b border-line px-4 py-3 sm:px-5 sm:py-4 md:grid-cols-[minmax(0,1fr)_auto] lg:px-6">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">{product.name}</h3>
              <p className="mt-2 max-w-3xl text-[0.8rem] leading-relaxed text-muted sm:text-sm">{product.body}</p>
            </div>
            <DossierPills c={c} product={product} />
          </header>

          <div className="divide-y divide-line">
            {variants.map((variant, index) => (
              <div key={variant.name} className="grid items-center lg:grid-cols-12">
                <div
                  className={cn(
                    "p-4 sm:p-6 lg:p-8",
                    wideMedia ? "lg:col-span-7" : "lg:col-span-5",
                    index % 2 === 1 && "lg:order-2",
                  )}
                >
                  <ChipPlinth
                    media={variant.media}
                    pendingLabel={c.ui.imagePending}
                    ratio={wideMedia ? "aspect-[16/9]" : undefined}
                    sizes={wideMedia ? "(min-width: 1024px) 56vw, 92vw" : undefined}
                    imageClassName={wideMedia ? "p-[4%] lg:p-[6%]" : undefined}
                  />
                </div>
                <div
                  className={cn(
                    "min-w-0 border-t border-line p-5 sm:p-6 lg:border-t-0 lg:p-8",
                    wideMedia ? "lg:col-span-5" : "lg:col-span-7",
                    index % 2 === 1 ? "lg:border-r" : "lg:border-l",
                  )}
                >
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

          <div className="border-t border-line px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
            <AppRail label={c.ui.applications} items={product.capabilities} pendingLabel={c.ui.imagePending} />
          </div>
        </article>
      </div>
    </Section>
  );
}

function CategorySectionHead({
  c,
  intro,
  category,
  stage,
  stageLabel,
  origin,
  body,
  className,
}: {
  c: SiteContent;
  intro: Intro;
  category: "software" | "training";
  stage: ProductStage;
  stageLabel: string;
  origin: "ps" | "pv";
  body: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.18em]", CATEGORY_TEXT[category])}>
        {intro.kicker}
      </p>
      <h2 className="mt-3 max-w-4xl font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">
        {intro.title}
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <OriginTag origin={origin} label={c.origin[origin]} />
        <StageBadge stage={stage} label={stageLabel} compact />
      </div>
      <Body className="mt-4 max-w-3xl">{body}</Body>
    </header>
  );
}

function SoftwareBlock({ c, intro, group }: { c: SiteContent; intro: Intro; group: SoftwareGroup }) {
  return (
    <Section id={group.id} dense>
      <div className={SHELL}>
        <CategorySectionHead
          c={c}
          intro={intro}
          category="software"
          origin={group.origin}
          stage={group.stage}
          stageLabel={group.statusNote ?? c.status[group.status]}
          body={group.body}
        />
        <Transition category="software" className="mt-7">{group.transition}</Transition>
        <IconCardGrid items={group.modules} category="software" className="mt-5 md:mt-7" />
      </div>
    </Section>
  );
}

function TrainingBlock({ c, intro, offer }: { c: SiteContent; intro: Intro; offer: TrainingOffer }) {
  return (
    <Section id={offer.id} dense>
      <div className={SHELL}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-5">
            <CategorySectionHead
              c={c}
              intro={intro}
              category="training"
              origin={offer.origin}
              stage={offer.stage}
              stageLabel={offer.statusNote}
              body={offer.body}
            />
            <Transition category="training" className="mt-6">{offer.transition}</Transition>
          </div>

          <IconCardGrid items={offer.principles} category="training" className="lg:col-span-7" />
        </div>
      </div>
    </Section>
  );
}

function IconCardGrid({ items, category, className }: { items: Item[]; category: "software" | "training"; className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4",
        category === "software" && "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          className={cn(
            "relative isolate min-h-40 overflow-hidden border border-line bg-bg p-4 sm:min-h-44 sm:p-5",
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
    <Section id="book" dense className="bg-surface-brand">
      <div className={SHELL}>
        <header className="grid gap-2 border-b border-line pb-5 md:grid-cols-12 md:items-end">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent md:col-span-3">{kicker}</p>
          <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl md:col-span-9 lg:text-4xl">{title}</h2>
        </header>
        <div className="-mx-5 mt-6 max-w-4xl border-y border-line bg-bg px-5 py-6 sm:mx-0 sm:border sm:p-6 sm:shadow-[0_12px_40px_rgb(15_23_42_/_0.05)]">
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
