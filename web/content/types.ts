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
 * One use case of a hardware family, shown as a card in the application row.
 * `media` is optional: until the photography exists the row draws the designed
 * placeholder and uses `title` as its brief, so it still reads as a row.
 */
export interface Application extends Item {
  media?: Media;
  /**
   * Sublabel under the title for a use case that is not shipping yet — the
   * Canva master prints "Dự kiến Q3/2026" under ESPRESSO's two roadmap cards.
   * Rule #1 by layout: a roadmap application says so on the card itself.
   */
  dateNote?: string;
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

/**
 * Which band of the catalogue index a hardware family belongs to. Both bands
 * are `hardware.items` in content — the split is only how the index groups
 * them, so the GP-GPU accelerator does not read as a fourth NPU chip.
 */
export type CatalogGroup = "npu" | "gpu";

/** One hardware family — MINT, PAPAYA, ESPRESSO, GPU. */
export interface Product {
  /** Anchor id, also the deep link from the nav. */
  id: string;
  name: string;
  indexName?: string;
  /** Long-form block title: product name plus what it is, one line in the
      Canva master ("MINT - CHIP ANALOG PIM CHO EDGE AI TẠI THIẾT BỊ"). Falls
      back to `name` while empty. */
  headline: string;
  tagline: string;
  decisionLabel: string;
  indexStageLabel: string;
  catalogGroup: CatalogGroup;
  /** Short architecture label shown beside origin and maturity in the dossier. */
  technologyLabel: string;
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
  /** Long-form block title — see `Product.headline`. Falls back to `name`. */
  headline: string;
  tagline: string;
  decisionLabel: string;
  indexStageLabel: string;
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
  /** Long-form block title — see `Product.headline`. Falls back to `name`. */
  headline: string;
  tagline: string;
  decisionLabel: string;
  indexStageLabel: string;
  body: string;
  /** One highlighted line beside the body — the master boxes it out. */
  calloutNote?: string;
  principles: Item[];
  media: Media;
  status: FactStatus;
  stage: ProductStage;
  statusNote: string;
  origin: Origin;
}

/* ==========================================================================
   HOME — shaped by the Canva master "Home - Pebble Vina" (1408×768, read
   2026-08-30), which is the source of truth for this page. Each interface below
   is one artboard in that file; the field names follow what the design shows,
   not what the old site happened to have.
   ========================================================================== */

/**
 * A line with accented runs inside it — the design colours single phrases mid
 * sentence ("PIM", "tối ưu luồng dữ liệu", "đột phá"). Splitting the string in
 * content keeps the component from having to know which words are special.
 */
export type RichText = Array<{ text: string; accent?: boolean }>;

/** One frame of the hero carousel. */
export interface HeroSlide {
  title: string;
  lead: string;
}

/** ANALOG or DIGITAL — the two PIM directions shown side by side. */
export interface PimBranch {
  id: string;
  index: string;
  name: string;
  tagline: string;
  body: string;
  cta: string;
  iconLabel: string;
  media: Media;
}

/** A numbered card or row: WHY-PIM uses three, SOLUTIONS uses four. */
export interface NumberedItem {
  id: string;
  index: string;
  title: string;
  body: string;
}

/** One of the three chip capabilities, each closing on a named outcome. */
export interface CoreCapability {
  id: string;
  index: string;
  /** Foreground figure when the capability leads with a number ("400K"). */
  value?: string;
  name: string;
  /** Second line under the name, e.g. "TỐI ƯU DATA MOVEMENT". */
  caption?: string;
  body: string;
  outcome: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  body: string;
  cta: string;
  media: Media;
}

/** A two-line trust badge beside the contact form. */
export interface ContactBadge {
  id: string;
  title: string;
  body: string;
  media: Media;
}

export interface HomeContent {
  hero: {
    slides: HeroSlide[];
    cta: string;
    pillars: string[];
    media: Media;
  };

  pim: {
    title: string;
    titleAccent: string;
    body: string;
    branches: PimBranch[];
    calloutLead: string;
    calloutGoal: string;
  };

  whyPim: {
    title: RichText;
    body: string;
    items: NumberedItem[];
    media: Media;
  };

  core: {
    title: string;
    body: RichText;
    capabilities: CoreCapability[];
    media: Media;
  };

  solutions: {
    title: string;
    titleAccent: string;
    body: string;
    items: NumberedItem[];
    media: Media;
  };

  news: {
    title: string;
    lead: string;
    items: NewsItem[];
    cta: string;
  };

  contact: {
    title: RichText;
    lead: string;
    badges: ContactBadge[];
    media: Media;
  };
}

/* ==========================================================================
   PRODUCTS — reshaped from the Canva master "Product - Pebble Vina"
   (1536×1024, 7 content artboards, read 2026-09-02). Artboard 1 is the dark
   hero plus the catalogue index; artboards 2–7 are one family each, all of
   them the same anatomy: dark band → white specification island → application
   row → one CTA.
   ========================================================================== */
export interface ProductsContent {
  intro: Intro & {
    /** Caption under the catalogue grid, with a down arrow: what a card does. */
    scrollLabel: string;
    /** Heading of the catalogue strip under the hero. */
    catalogTitle: string;
    catalogLead: string;
    /** Chip macro behind the hero headline — decorative, `alt` stays empty. */
    media: Media;
  };
  hardware: Intro & {
    items: Product[];
    /** Band labels in the catalogue index, one per `CatalogGroup`. */
    catalogGroups: Record<CatalogGroup, string>;
  };
  software: Intro & { groups: SoftwareGroup[] };
  training: Intro & { offer: TrainingOffer };
  /**
   * The one button every block closes on. Page-level, not per family: the master
   * prints the same words under all six, so the same key travels with them and a
   * later change lands once instead of six times.
   */
  ctaLabel: string;
}

export interface ContactContent {
  intro: Intro;
  ctaPrimary: string;
  form: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    optionalLabel: string;
    /** Line under the submit button — what happens to what was just typed. */
    privacyNote: string;
    successTitle: string;
    successBody: string;
    errorBody: string;
    invalidBody: string;
    rateLimitBody: string;
    networkErrorBody: string;
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
