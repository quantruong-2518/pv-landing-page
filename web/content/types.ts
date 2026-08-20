/**
 * Content shape for the whole site. `en.ts` (canonical) and `vi.ts` both satisfy
 * `SiteContent`, so adding a field on one side and forgetting the other breaks
 * `tsc` — that is deliberate (CLAUDE.md §3).
 *
 * Empty strings are intentional placeholders: the structure ships now, the prose
 * lands later. Components skip empty values rather than render blank space.
 * Drafts live in `context/`.
 */

export type Locale = "en" | "vi";

export type PageKey = "home" | "products" | "contact";

/** Evidence label — repo rule #1 (docs/01-proof-bank.md). */
export type FactStatus = "shipped" | "roadmap";

/** Whose capability this is: `ps` = Pebble Square, `pv` = the layer Pebble Vina builds. */
export type Origin = "ps" | "pv";

/** Image slot. An empty `src` renders a designed placeholder — see context/media-plan.md. */
export interface Media {
  src?: string;
  /** Doubles as the art direction shown in the placeholder while `src` is empty. */
  alt: string;
}

/** Title is always rendered; body is prose written later. */
export interface Item {
  title: string;
  body: string;
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
  tagline: string;
  body: string;
  capabilities: Item[];
  specs: Spec[];
  media: Media;
  status: FactStatus;
  statusNote?: string;
  origin: Origin;
}

/** One software family — enterprise software, private AI. */
export interface SoftwareGroup {
  id: string;
  name: string;
  tagline: string;
  body: string;
  modules: Item[];
  /** Private AI only: where a model can be deployed. */
  targetsTitle?: string;
  targets?: Item[];
  media: Media;
  origin: Origin;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    slogan: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
    media: Media;
  };
  whyNow: Intro & {
    points: Item[];
    pillarsTitle: string;
    pillars: Item[];
    media: Media;
  };
  history: Intro & {
    milestones: Milestone[];
    footnote: string;
  };
}

export interface ProductsContent {
  intro: Intro;
  hardware: Intro & { items: Product[] };
  software: Intro & { groups: SoftwareGroup[] };
}

export interface ContactContent {
  intro: Intro;
  ctaPrimary: string;
  ctaSecondary: string;
  media: Media;
}

export interface SiteContent {
  locale: Locale;
  /** Label of the link to the other locale. */
  alternateLabel: string;
  meta: Record<PageKey, { title: string; description: string }>;

  nav: {
    home: string;
    products: string;
    contact: string;
    hardware: string;
    software: string;
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
    parent: string;
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
    imagePending: string;
  };

  status: Record<FactStatus, string>;
  origin: Record<Origin, string>;
}
