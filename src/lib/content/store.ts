import { cache } from "react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { contentSchema, type ContentPageId, type SiteContent } from "@/lib/content/schema";
import { SEED_CONTENT } from "@/lib/content/seed";

/**
 * Server-side content store.
 *
 * The design mock kept CMS edits in `localStorage`, which means every visitor
 * sees the seed and only the editor sees their own changes. Here the document
 * lives on the server so a save is a real publish.
 *
 * The backing store is a single JSON file. It is the smallest thing that is
 * genuinely server state, and it keeps the swap to a database honest: replace
 * `readDocument` / `writeDocument` and nothing above this file changes.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const DOCUMENT_PATH = path.join(DATA_DIR, "content.runtime.json");

type Json = Record<string, unknown>;

const isPlainObject = (value: unknown): value is Json =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Overlay saved values on the seed, key by key.
 *
 * Recursive because a saved section may carry a partially filled localized
 * field (`{ vi }` with no `en` yet) — the seed has to supply the rest rather
 * than the field disappearing from the page.
 */
function merge<T>(base: T, patch: unknown): T {
  if (!isPlainObject(patch) || !isPlainObject(base)) {
    return (patch === undefined ? base : (patch as T));
  }
  const result: Json = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    result[key] = key in base ? merge((base as Json)[key], value) : value;
  }
  return result as T;
}

async function readDocument(): Promise<unknown> {
  try {
    return JSON.parse(await readFile(DOCUMENT_PATH, "utf8"));
  } catch {
    // No file yet (first run) or unreadable — the seed is the answer either way.
    return {};
  }
}

async function writeDocument(document: SiteContent): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DOCUMENT_PATH, `${JSON.stringify(document, null, 2)}\n`, "utf8");
}

/**
 * The published document. Memoised per request so a page that renders eight
 * sections still touches the disk once.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  const merged = merge(SEED_CONTENT, await readDocument());
  const parsed = contentSchema.safeParse(merged);
  // A hand-edited or half-migrated file must not take the site down; fall back
  // to the seed and let the CMS surface the problem on the next save.
  return parsed.success ? parsed.data : SEED_CONTENT;
});

export async function getPageContent<P extends ContentPageId>(page: P): Promise<SiteContent[P]> {
  return (await getContent())[page];
}

/**
 * Apply a patch to one section and publish it.
 *
 * Section-scoped on purpose: two editors working on different sections of the
 * same page must not overwrite each other, which a whole-document PUT would do.
 */
export async function saveSection(
  page: ContentPageId,
  sectionId: string,
  patch: unknown,
): Promise<SiteContent> {
  const current = await getContent();
  const pageContent = current[page] as Record<string, unknown>;

  if (!(sectionId in pageContent)) {
    throw new Error(`Unknown section "${sectionId}" on page "${page}"`);
  }

  const next = contentSchema.parse({
    ...current,
    [page]: {
      ...pageContent,
      [sectionId]: merge(pageContent[sectionId], patch),
    },
  });

  await writeDocument(next);
  return next;
}

/** Discard local edits for one section — revert to what the seed shipped. */
export async function resetSection(
  page: ContentPageId,
  sectionId: string,
): Promise<SiteContent> {
  const seedSection = (SEED_CONTENT[page] as Record<string, unknown>)[sectionId];
  if (seedSection === undefined) {
    throw new Error(`Unknown section "${sectionId}" on page "${page}"`);
  }

  const current = await getContent();
  const next = contentSchema.parse({
    ...current,
    [page]: { ...(current[page] as Record<string, unknown>), [sectionId]: seedSection },
  });

  await writeDocument(next);
  return next;
}
