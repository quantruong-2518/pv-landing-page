/**
 * Content shape for the whole site. `vi.ts` is the only locale that ships — the
 * English version was removed on 2026-08-23, so there is no cross-language
 * symmetry left for `tsc` to enforce.
 *
 * Every content string is currently its own i18n key (`home.whyNow.title`, …):
 * the structure ships now, the prose lands later and is rewritten in one pass.
 * Do not fill them in from memory — drafts live in `context/`, facts in
 * `docs/01-proof-bank.md`. Components still skip empty values rather than render
 * blank space.
 */

export type PageKey = "home" | "products" | "contact";

/** Evidence label — repo rule #1 (docs/01-proof-bank.md). */
export type FactStatus = "shipped" | "roadmap";

/** Buyer-facing maturity. It never replaces the evidence status above. */
export type ProductStage = "mass-production" | "customer-poc" | "product-data" | "integration" | "roadmap" | "research";

/** Code-native artwork key. It is layout data, not translatable content. */
export type SystemIconName = "crm" | "erp" | "hrm" | "dms" | "ai" | "survey" | "tailored" | "practice" | "roi";

/** Whose capability this is: `ps` = Pebble Square, `pv` = the layer Pebble Vina builds. */
export type Origin = "ps" | "pv";

/** Image slot. An empty `src` renders a designed placeholder — see context/media-plan.md. */
export interface Media {
  src?: string;
  /**
   * A differently *composed* crop for wide viewports (used from `lg` up), not
   * just a larger one. Set it only when the two files are genuinely different
   * artwork — `<Illustration>` swaps them, `next/image` never would.
   */
  srcWide?: string;
  /** Rendered in the placeholder while `src` is empty. Art direction: context/media-plan.md. */
  alt: string;
}

/** Title is always rendered; body is prose written later. */
export interface Item {
  title: string;
  body: string;
  icon?: SystemIconName;
}

/** An `Item` that carries its own artwork instead of sharing the block's one. */
export interface IllustratedItem extends Item {
  media: Media;
}

/**
 * One use case of a hardware family, shown as a card in the application rail.
 * `media` is optional: until the photography exists the rail draws the designed
 * placeholder and uses `title` as its brief, so the row still reads as a row.
 */
export interface Application extends Item {
  media?: Media;
}

/** Opening of a section: index label, heading, optional lead. */
export interface Intro {
  kicker: string;
  title: string;
  lead: string;
}

/** A measured number, its method, and where it came from. */
export interface Spec {
  value: string;
  unit?: string;
  label: string;
  /** What was measured against what — engineers read this before the number. */
  note: string;
  source: string;
  status: FactStatus;
  statusNote?: string;
}

/** One deliberately ordered product figure. Order is part of the catalogue UI. */
export interface ProductMetric {
  label: "performance" | "efficiency" | "power" | "area" | "compute" | "memory" | "connectivity";
  value: string;
  /** Precision, method or boundary that must travel with the foreground value. */
  note?: string;
}

/** One card inside a hardware family such as E-Series. */
export interface HardwareVariant {
  name: string;
  tagline: string;
  applicationLead: string;
  metrics: ProductMetric[];
  media: Media;
}

export interface Milestone {
  date: string;
  title: string;
  body: string;
  status: FactStatus;
  statusNote?: string;
  /** Highlighted milestone. */
  starred?: boolean;
}

/** One hardware family — MINT, PAPAYA, ESPRESSO, GPU. */
export interface Product {
  /** Anchor id, also the deep link from the nav. */
  id: string;
  name: string;
  indexName?: string;
  tagline: string;
  decisionLabel: string;
  indexStageLabel: string;
  /** Short architecture label shown beside origin and maturity in the dossier. */
  technologyLabel: string;
  transition: string;
  body: string;
  applicationLead: string;
  /** Chip families use three rows; a variant family keeps them on each variant. */
  metrics: ProductMetric[];
  variants?: HardwareVariant[];
  supportingTitle?: string;
  supportingItems?: Item[];
  capabilities: Application[];
  source: string;
  media: Media;
  status: FactStatus;
  stage: ProductStage;
  statusNote?: string;
  origin: Origin;
}

/** One software family — enterprise software, private AI. */
export interface SoftwareGroup {
  id: string;
  name: string;
  indexName?: string;
  tagline: string;
  decisionLabel: string;
  indexStageLabel: string;
  transition: string;
  body: string;
  modules: Item[];
  /** Private AI only: where a model can be deployed. */
  targetsTitle?: string;
  targets?: Item[];
  media: Media;
  status: FactStatus;
  stage: ProductStage;
  statusNote?: string;
  origin: Origin;
}

export interface TrainingOffer {
  id: string;
  name: string;
  indexName?: string;
  tagline: string;
  decisionLabel: string;
  indexStageLabel: string;
  transition: string;
  body: string;
  principles: Item[];
  media: Media;
  status: FactStatus;
  stage: ProductStage;
  statusNote: string;
  origin: Origin;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    brand: string;
    slogan: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    media: Media;
  };
  whyNow: Intro & {
    /** One illustration per point — the block has no single figure of its own. */
    problemLabel: string;
    solutionLabel: string;
    points: IllustratedItem[];
    pillarsTitle: string;
    pillars: Item[];
  };
  history: Intro & {
    milestones: Milestone[];
    footnote: string;
  };
}

export interface ProductsContent {
  intro: Intro & { scrollLabel: string };
  hardware: Intro & { items: Product[] };
  software: Intro & { groups: SoftwareGroup[] };
  training: Intro & { offer: TrainingOffer };
  followUp: {
    kicker: string;
    title: string;
  };
}

export interface ContactContent {
  intro: Intro;
  ctaPrimary: string;
  media: Media;
  form: {
    title: string;
    nameLabel: string;
    companyLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    optionalLabel: string;
    successTitle: string;
    successBody: string;
    errorBody: string;
  };
}

export interface SiteContent {
  meta: Record<PageKey, { title: string; description: string }>;

  nav: {
    home: string;
    products: string;
    contact: string;
    hardware: string;
    software: string;
    training: string;
    cta: string;
    menuLabel: string;
    skipToContent: string;
  };

  home: HomeContent;
  products: ProductsContent;
  contact: ContactContent;

  /** Field labels shared by the contact page and the footer. */
  labels: {
    call: string;
    email: string;
    office: string;
    entity: string;
    taxCode: string;
    partner: string;
  };

  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    legalTitle: string;
    statusLegend: string;
    disclaimer: string;
    copyright: string;
  };

  /** Repeated UI strings that are not section content. */
  ui: {
    specs: string;
    source: string;
    productMetrics: string;
    softwareStack: string;
    metricLabels: Record<ProductMetric["label"], string>;
    /** Heading of the use-case rail under a hardware family. */
    applications: string;
    imagePending: string;
  };

  status: Record<FactStatus, string>;
  origin: Record<Origin, string>;
}
