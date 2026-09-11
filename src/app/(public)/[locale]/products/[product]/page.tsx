import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpecGrid } from "@/components/site/primitives";
import { ApplicationBento, ApplicationDetails } from "@/components/site/product/application-bento";
import { ESeriesCards } from "@/components/site/product/eseries-cards";
import { ProductDetail, SpecHeading } from "@/components/site/product/product-detail";
import { SiteHeader } from "@/components/site/site-header";
import { getPageContent, getPublishedAt } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import {
  PRODUCT_SLUG_TO_CONTENT_KEY,
  PRODUCT_SLUGS,
  routes,
  type ProductSlug,
} from "@/lib/routes";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  organisationJsonLd,
  productPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * One product line's own page — MINT, PAPAYA, ESPRESSO or E-Series.
 *
 * These four chips used to be one section each on `/[locale]/products`,
 * reachable only as `#mint` / `#papaya` / `#espresso` / `#e-series` — a
 * fragment the server never sees, so one URL was standing in for four
 * different product subjects. Splitting them out is what lets each chip rank
 * on its own. `/[locale]/products` keeps the catalogue that links here, plus
 * the software/training/contact sections — see that file's own header
 * comment.
 */
export const revalidate = 300;

function isProductSlug(value: string): value is ProductSlug {
  return (PRODUCT_SLUGS as readonly string[]).includes(value);
}

/**
 * The one place a product slug maps to its `buildMetadata` page key — see
 * `src/lib/seo/metadata.ts`, whose `PageKey` union already lists these four
 * literals for the same reason. Read off `buildMetadata`'s own parameter type
 * instead of retyping the union here, so the two can never drift apart.
 */
const PAGE_KEY_BY_SLUG: Record<ProductSlug, Parameters<typeof buildMetadata>[0]> = {
  mint: "productMint",
  papaya: "productPapaya",
  espresso: "productEspresso",
  "e-series": "productESeries",
};

export async function generateStaticParams() {
  // The parent `[locale]` layout already enumerates the three locales through
  // its own `generateStaticParams` (src/app/(public)/[locale]/layout.tsx).
  // Per generate-static-params.md, "Multiple Dynamic Segments in a Route":
  // "A child route segment's generateStaticParams function is executed once
  // for each set of params the parent generates." This segment sits below
  // that layout, so it only needs to return the dimension it owns — Next
  // runs this once per parent-generated locale and composes the two,
  // producing all 3 locales × 4 slugs = 12 pages without this file
  // re-listing locales (and without risking the two lists disagreeing).
  return PRODUCT_SLUGS.map((product) => ({ product }));
}

/*
 * `dynamicParams` stays at its default (true) — see the identical note on the
 * `[locale]` layout. Unknown slugs are rejected by `isProductSlug` below,
 * the same way `[locale]` rejects unknown locales with `isLocale`.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}): Promise<Metadata> {
  const { locale, product } = await params;
  if (!isLocale(locale) || !isProductSlug(product)) return {};
  return buildMetadata(PAGE_KEY_BY_SLUG[product], locale);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product } = await params;
  if (!isLocale(locale)) notFound();
  if (!isProductSlug(product)) notFound();

  const content = await getPageContent("product");
  const copy = dictionary.product;
  const publishedAt = await getPublishedAt();

  // CMS visibility: an editor can hide any product section with the `visible`
  // toggle. `saveSection` revalidates this exact path on publish (see
  // src/app/api/content/[page]/route.ts), so a hidden section must 404 rather
  // than render an empty shell — otherwise the publish that hides MINT would
  // leave `/vi/products/mint` live with no content on it until the next edit.
  const section = content[PRODUCT_SLUG_TO_CONTENT_KEY[product]];
  if (!section.visible) notFound();

  return (
    <>
      <SiteHeader locale={locale} active="products" />

      <main>
        {product === "mint" ? (
          <>
            <ProductDetail
              id={routes.anchors.mint}
              locale={locale}
              headingLevel="h1"
              kicker={copy.shared.hardware[locale]}
              meta={copy.mint.meta[locale]}
              title={content.mint.title[locale]}
              lead={content.mint.lead[locale]}
              media={
                <ApplicationBento
                  locale={locale}
                  product="MINT"
                  chip={{ image: content.mint.image, alt: copy.mint.imageAlt[locale] }}
                  applications={copy.mint.visuals}
                />
              }
              className="glow-mint bg-navy"
            >
              {/* Three fixed 12rem tracks, not `auto-fit`. `auto-fit` collapses
                  its empty tracks and hands the free space back to the survivors,
                  so three short figures were spread over the full 1390px with
                  ~350px of void between them. At 12rem the row is the width of
                  the copy column above it and the figures read as one group. */}
              <SpecHeading label={copy.shared.keySpecs[locale]} className="mt-3" />
              <SpecGrid
                specs={copy.mint.specs}
                locale={locale}
                className="lg:grid-cols-[repeat(3,minmax(0,12rem))]"
              />
            </ProductDetail>
            <ApplicationDetails
              locale={locale}
              label={copy.shared.applications[locale]}
              applications={copy.mint.visuals}
            />
          </>
        ) : null}

        {product === "papaya" ? (
          <>
            <ProductDetail
              id={routes.anchors.papaya}
              locale={locale}
              headingLevel="h1"
              kicker={copy.shared.hardware[locale]}
              meta={copy.papaya.meta[locale]}
              title={content.papaya.title[locale]}
              lead={content.papaya.lead[locale]}
              media={
                <ApplicationBento
                  locale={locale}
                  product="PAPAYA"
                  chip={{ image: content.papaya.image, alt: copy.papaya.imageAlt[locale] }}
                  applications={copy.papaya.visuals}
                />
              }
              className="glow-papaya bg-night-deep"
            >
              {/* Two spec blocks: PAPAYA's own figures, then FLEX stated purely as
                  multiples against a named competitor part — each with the
                  measurement that produced it, because "~100×" alone is a slogan. */}
              <div className="grid gap-x-6 xl:grid-cols-2">
                <div>
                  <SpecHeading
                    name="PAPAYA"
                    label={copy.shared.keySpecs[locale]}
                    className="mt-3"
                  />
                  <SpecGrid
                    specs={copy.papaya.specs}
                    locale={locale}
                    className="lg:grid-cols-2"
                  />
                </div>
                <div>
                  <SpecHeading
                    name="PAPAYA FLEX"
                    label={copy.papaya.flexLabel}
                    className="mt-3"
                  />
                  <SpecGrid
                    specs={copy.papaya.flexSpecs}
                    locale={locale}
                    className="lg:grid-cols-2"
                  />
                </div>
              </div>
            </ProductDetail>
            <ApplicationDetails
              locale={locale}
              label={copy.shared.applications[locale]}
              applications={copy.papaya.visuals}
            />
          </>
        ) : null}

        {product === "espresso" ? (
          <>
            <ProductDetail
              id={routes.anchors.espresso}
              locale={locale}
              headingLevel="h1"
              kicker={copy.shared.hardware[locale]}
              meta={copy.espresso.meta[locale]}
              title={content.espresso.title[locale]}
              lead={content.espresso.lead[locale]}
              media={
                <ApplicationBento
                  locale={locale}
                  product="ESPRESSO"
                  chip={{ image: content.espresso.image, alt: copy.espresso.imageAlt[locale] }}
                  applications={copy.espresso.visuals}
                />
              }
              className="glow-espresso bg-navy"
              beforeCta={
                // Target platforms with their dates — ESPRESSO is a Q3/2026 part,
                // so every application below carries when it is expected. It sits
                // in the left column, where it gives the copy block the height to
                // meet the render beside it.
                //
                // `grid-cols-2` first: at three columns on a 390px screen the row
                // is ~110px per track and "Data Center" ran into the right gutter.
                <div className="grid grid-cols-2 gap-x-3.5 pt-2 sm:grid-cols-3">
                  {copy.espresso.targets.map((target) => (
                    <div key={target.name} className="py-4">
                      <div className="text-lead font-semibold">{target.name}</div>
                      <div className="mt-1 text-note text-faint">{target.when[locale]}</div>
                    </div>
                  ))}
                </div>
              }
            >
              {/* The specs close the section as a full-width band, the way MINT's
                  and PAPAYA's do. Stacked under the render in the right column
                  they left ~700×230px of empty page in the bottom-left quadrant,
                  because the copy column ends at its CTA while the render column
                  kept going. Same 12rem tracks as MINT so the two rows of three
                  figures on this page are set identically.

                  `card-title`, not the old clamp(1.5rem,2.2vw,2.125rem): 640 TOPS
                  is what four of these chips add up to, so it must read under the
                  per-chip figures in `stat` beside it, not over them. */}
              {/* ESPRESSO's figures were the one spec row on this page opening with
                  neither a rule nor a label — four target platforms with their
                  dates ran straight into three per-chip figures, and the reader
                  had whitespace alone to tell the two apart. */}
              <SpecHeading label={copy.shared.keySpecs[locale]} className="mt-3" />
              <div className="flex flex-col gap-2">
                <SpecGrid
                  specs={copy.espresso.specs}
                  locale={locale}
                  className="lg:grid-cols-[repeat(3,minmax(0,12rem))]"
                />
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-label whitespace-nowrap text-faint">
                    {copy.espresso.cardLabel[locale]}
                  </span>
                  <span className="font-heading text-card-title text-accent">
                    {copy.espresso.cardValue}
                  </span>
                </div>
              </div>
            </ProductDetail>
            <ApplicationDetails
              locale={locale}
              label={copy.shared.applications[locale]}
              applications={copy.espresso.visuals}
            />
          </>
        ) : null}

        {product === "e-series" ? (
          <>
            <ProductDetail
              id={routes.anchors.eSeries}
              locale={locale}
              headingLevel="h1"
              kicker={copy.eseries.kicker}
              meta={copy.eseries.meta[locale]}
              title={content.eseries.title[locale]}
              lead={content.eseries.lead[locale]}
              media={
                <ApplicationBento
                  locale={locale}
                  product="E-SERIES"
                  chip={{ image: content.eseries.image, alt: copy.eseries.imageAlt[locale] }}
                  applications={copy.eseries.visuals}
                />
              }
              showCta={false}
              className="glow-eseries bg-night-deep"
            >
              <ESeriesCards locale={locale} />
            </ProductDetail>
            <ApplicationDetails
              locale={locale}
              label={copy.shared.applications[locale]}
              applications={copy.eseries.visuals}
            />
          </>
        ) : null}
      </main>

      {/* The organisation and website nodes are repeated here for the same
          reason /products and /bio repeat them: this page's `Product.brand` /
          `manufacturer` and `ItemPage.isPartOf` @id references have to resolve
          inside the document a crawler is currently reading. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          organisationJsonLd(locale),
          websiteJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: dictionary.header.nav.home[locale], path: routes.home(locale) },
            { name: dictionary.header.nav.products[locale], path: routes.products(locale) },
            { name: section.title[locale], path: routes.product(locale, product) },
          ]),
          productPageJsonLd(locale, {
            slug: product,
            // Never `new Date()` — see the shared `DatedPageOptions` comment in
            // jsonld.ts; this is the CMS document's own last-publish timestamp.
            dateModified: publishedAt.toISOString(),
            title: section.title[locale],
            description: section.lead[locale],
            image: section.image,
          }),
        ])}
      />
    </>
  );
}
