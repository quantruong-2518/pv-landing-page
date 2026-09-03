import { z } from "zod";

/**
 * The CMS-managed slice of site content.
 *
 * One-to-one with the `SCHEMA` object in
 * `design_handoff_pebble_vina/design-refs/Pebble Vina Admin.dc.html`, with two
 * deliberate changes the handoff asks for in section 7:
 *
 *  1. Every text field is bilingual (`{ vi, en }`) instead of Vietnamese-only.
 *  2. `visible` is a real field on every section, so hiding a block in the CMS
 *     actually removes it from the public page — the mock used hard-coded
 *     `showStats` / `showNews` props instead.
 *
 * Copy that the CMS does not own (nav, footer, card bodies, spec tables, form
 * labels) lives in `src/lib/i18n/dictionary.ts`. The split is intentional: this
 * file is the editable surface, that file is the fixed one.
 */

const localized = z.object({
  vi: z.string(),
  en: z.string(),
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

export const contentSchema = z.object({
  home: homeContentSchema,
  product: productContentSchema,
});

export type HomeContent = z.infer<typeof homeContentSchema>;
export type ProductContent = z.infer<typeof productContentSchema>;
export type SiteContent = z.infer<typeof contentSchema>;

export type ContentPageId = keyof SiteContent;
export type HomeSectionId = keyof HomeContent;
export type ProductSectionId = keyof ProductContent;

export const CONTENT_PAGE_IDS = ["home", "product"] as const;

/** A partial patch for one section — what the admin panel PATCHes. */
export const sectionPatchSchema = z.record(z.string(), z.unknown());
