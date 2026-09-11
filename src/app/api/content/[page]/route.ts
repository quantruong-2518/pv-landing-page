import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/auth/admin";
import { CONTENT_PAGE_IDS, type ContentPageId } from "@/lib/content/schema";
import { getPageContent, resetSection, saveSection } from "@/lib/content/store";
import { LOCALES } from "@/lib/i18n/config";
import { routes } from "@/lib/routes";

/**
 * Content API for one page.
 *
 *   GET     read the published document for the page
 *   PATCH   save one section
 *   DELETE  revert one section to the seeded value
 *
 * Reads are open — this is the same content the public pages already serve, so
 * gating it would protect nothing. Writes require the CMS session.
 *
 * Every successful write revalidates the public routes, so a save is visible on
 * the live page immediately rather than at the end of the ISR window.
 */

const pageParam = z.enum(CONTENT_PAGE_IDS);

const patchBody = z.object({
  section: z.string().min(1),
  values: z.record(z.string(), z.unknown()),
});

const deleteBody = z.object({
  section: z.string().min(1),
});

type RouteContext = { params: Promise<{ page: string }> };

async function resolvePage(context: RouteContext): Promise<ContentPageId | null> {
  const { page } = await context.params;
  const parsed = pageParam.safeParse(page);
  return parsed.success ? parsed.data : null;
}

async function requireSession(): Promise<NextResponse | null> {
  if (await isAdminAuthenticated()) return null;
  return NextResponse.json({ error: "Not authorised" }, { status: 401 });
}

/**
 * Public pages are prerendered, so a save is only published once their cache
 * entries are dropped.
 *
 * Concrete paths, not the `/[locale]` pattern: `revalidatePath("/[locale]",
 * "layout")` does not clear the cache entry for an already-prerendered page —
 * measured as a save that reached disk but never reached /vi. (An earlier
 * version of this comment blamed `dynamicParams = false`; that flag has since
 * been removed from `[locale]` for the same reason — see CLAUDE.md §4 — but
 * revalidating by concrete path is still required regardless.) /llms.txt and
 * /sitemap.xml read the same document and have to go with them.
 */
function publish() {
  for (const locale of LOCALES) {
    revalidatePath(routes.home(locale));
    revalidatePath(routes.products(locale));
    // /bio renders no copy of its own — every paragraph on it comes from the
    // home document. Leave it out of this loop and a published edit shows on
    // /vi and silently does not on /vi/bio until the ISR window expires.
    revalidatePath(routes.bio(locale));
  }
  revalidatePath("/llms.txt");
  // sitemap.ts now reads getPublishedAt() for `lastModified`, so a publish
  // changes this generated route's output too — drop its cache along with
  // the pages, or /sitemap.xml keeps serving the previous lastmod until the
  // route's own revalidation window passes.
  revalidatePath("/sitemap.xml");
}

export async function GET(_request: Request, context: RouteContext) {
  const page = await resolvePage(context);
  if (!page) return NextResponse.json({ error: "Unknown page" }, { status: 404 });

  return NextResponse.json(await getPageContent(page));
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireSession();
  if (denied) return denied;

  const page = await resolvePage(context);
  if (!page) return NextResponse.json({ error: "Unknown page" }, { status: 404 });

  const body = patchBody.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "Malformed body" }, { status: 400 });
  }

  try {
    const document = await saveSection(page, body.data.section, body.data.values);
    publish();
    return NextResponse.json(document[page]);
  } catch (error) {
    // A schema violation is the editor's problem to see, not a 500.
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const denied = await requireSession();
  if (denied) return denied;

  const page = await resolvePage(context);
  if (!page) return NextResponse.json({ error: "Unknown page" }, { status: 404 });

  const body = deleteBody.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "Malformed body" }, { status: 400 });
  }

  try {
    const document = await resetSection(page, body.data.section);
    publish();
    return NextResponse.json(document[page]);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not reset" },
      { status: 400 },
    );
  }
}
