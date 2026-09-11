import { z } from "zod";

/**
 * The CMS-managed slice of site content.
 *
 * One-to-one with the `SCHEMA` object in
 * `design_handoff_pebble_vina/design-refs/Pebble Vina Admin.dc.html`, with two
 * deliberate changes the handoff asks for in section 7:
 *
 *  1. Every text field carries all three locales (`{ vi, en, ko }`) instead of
 *     being Vietnamese-only.
 *  2. `visible` is a real field on every section, so hiding a block in the CMS
 *     actually removes it from the public page — the mock used hard-coded
 *     `showStats` / `showNews` props instead.
 *
 * Copy that the CMS does not own (nav, footer, card bodies, spec tables, form
 * labels) lives in `src/lib/i18n/dictionary.ts`. The split is intentional: this
 * file is the editable surface, that file is the fixed one.
 */

/** Every editable string exists in all three locales — see `LOCALES`. */
const localized = z.object({
  vi: z.string(),
  en: z.string(),
  ko: z.string(),
});

/** Asset path under /public. Kept as a plain string to match the CMS quick-pick. */
const image = z.string().min(1);

const section = <T extends z.ZodRawShape>(shape: T) => z.object({ visible: z.boolean(), ...shape });

export const homeContentSchema = z.object({
  hero: section({
    eyebrow: localized,
    title: localized,
    lead: localized,
    sub: localized,
    cta: localized,
    image,
  }),
  marquee: section({
    /** Items separated by " · ", exactly as the CMS textarea presents them. */
    items: localized,
  }),
  pim: section({
    eyebrow: localized,
    title: localized,
    lead: localized,
    imageA: image,
    imageB: image,
    statement: localized,
    imageC: image,
  }),
  why: section({
    title: localized,
    lead: localized,
    image,
  }),
  core: section({
    eyebrow: localized,
    title: localized,
    lead: localized,
    /** The highlighted figure in card 02. */
    stat: z.string(),
  }),
  solutions: section({
    eyebrow: localized,
    title: localized,
    lead: localized,
    /** How many of the four solution rows to render. */
    count: z.number().int().min(1).max(4),
  }),
  news: section({
    eyebrow: localized,
    title: localized,
    lead: localized,
    count: z.number().int().min(1).max(4),
    image1: image,
    image2: image,
    image3: image,
    image4: image,
  }),
  contact: section({
    title: localized,
    lead: localized,
    cta: localized,
    note: localized,
    image,
  }),
});

export const productContentSchema = z.object({
  catalog: section({
    eyebrow: localized,
    title: localized,
    lead: localized,
    hint: localized,
  }),
  mint: section({
    title: localized,
    lead: localized,
    image,
  }),
  papaya: section({
    title: localized,
    lead: localized,
    image,
  }),
  espresso: section({
    title: localized,
    lead: localized,
    image,
  }),
  eseries: section({
    title: localized,
    lead: localized,
    image,
  }),
  software: section({
    title: localized,
    lead: localized,
    /** Drives both the headline figure and the bar fill. */
    progress: z.number().int().min(1).max(100),
    image,
  }),
  training: section({
    title: localized,
    lead: localized,
    image,
  }),
  contact: section({
    title: localized,
    lead: localized,
    cta: localized,
  }),
});

/**
 * ISO timestamp of the seed copy's last hand edit.
 *
 * Sourced from `git log -1 --format=%cs -- src/lib/content/seed.ts`, which
 * returned `2026-09-09` (commit 508f0c5, "add Korean as a third locale" — the
 * last commit to touch the seed copy at the time this field was added).
 * Expressed here as UTC midnight of that date since the git command only
 * gives a calendar day.
 *
 * Lives in `schema.ts` rather than `seed.ts` because `seed.ts` already
 * imports `SiteContent` from this file; importing the other way round would
 * make the two files depend on each other. Bump this by hand whenever the
 * seed copy in `seed.ts` is hand-edited — it is the fallback `publishedAt`
 * for a document that has never been published through the CMS.
 */
export const SEED_PUBLISHED_AT = "2026-09-09T00:00:00.000Z";

export const contentSchema = z.object({
  home: homeContentSchema,
  product: productContentSchema,
  /**
   * When the document was last published. Stamped by `saveSection` and
   * `resetSection` in `store.ts` on every write; read back by `sitemap.ts`
   * (`lastModified`) and by the JSON-LD `dateModified` another agent is
   * wiring up, so both stop lying with a build-time `new Date()`.
   */
  publishedAt: z.iso.datetime(),
});

export type HomeContent = z.infer<typeof homeContentSchema>;
export type ProductContent = z.infer<typeof productContentSchema>;
export type SiteContent = z.infer<typeof contentSchema>;

export const CONTENT_PAGE_IDS = ["home", "product"] as const;

/**
 * Re-derived from `CONTENT_PAGE_IDS` instead of `keyof SiteContent`.
 *
 * `SiteContent` now has a third top-level key, `publishedAt`, that is a
 * document-level field, not a page. `keyof SiteContent` would silently accept
 * it as a valid page id, and `/api/content/[page]` — plus the admin panel's
 * page list — would then treat "publishedAt" as something you can GET/PATCH
 * like `home` or `product`. Do not flip this back to `keyof SiteContent`.
 */
export type ContentPageId = (typeof CONTENT_PAGE_IDS)[number];
export type HomeSectionId = keyof HomeContent;
export type ProductSectionId = keyof ProductContent;

/** A partial patch for one section — what the admin panel PATCHes. */
export const sectionPatchSchema = z.record(z.string(), z.unknown());
