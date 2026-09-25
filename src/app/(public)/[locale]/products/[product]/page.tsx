import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ApplicationBento, ApplicationDetails } from "@/components/site/product/application-bento";
import {
  DetailBoard,
  DetailCta,
  DetailPill,
  DetailScreen,
  firstSentences,
} from "@/components/site/product/detail";
import { ESeriesCards } from "@/components/site/product/eseries-cards";
import { ProductDetail } from "@/components/site/product/product-detail";
import { SiteHeader } from "@/components/site/site-header";
import { getPageContent, getPublishedAt } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import {
  PRODUCT_SLUG_TO_CONTENT_KEY,
  PUBLIC_PRODUCT_SLUGS,
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

/**
 * Checked against PUBLIC_PRODUCT_SLUGS, not PRODUCT_SLUGS: a slug in
 * HIDDEN_PRODUCT_SLUGS (routes.ts, e.g. "e-series") must 404 here exactly
 * like a slug that was never real, even though its content and component
 * stay in the codebase for re-enabling later.
 */
function isProductSlug(value: string): value is ProductSlug {
  return (PUBLIC_PRODUCT_SLUGS as readonly string[]).includes(value);
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
  // producing all 3 locales × 3 public slugs = 9 pages without this file
  // re-listing locales (and without risking the two lists disagreeing).
  // PUBLIC_PRODUCT_SLUGS, not PRODUCT_SLUGS: prerendering "e-series" here
  // would publish the exact page this task hides. `dynamicParams` stays at
  // its default (true, see the note below), so a request for the hidden
  // slug still reaches `isProductSlug` and 404s instead of being rejected
  // for an unrelated reason.
  return PUBLIC_PRODUCT_SLUGS.map((product) => ({ product }));
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
        {/*
         * MINT / PAPAYA / ESPRESSO share one template (`product/detail.tsx`):
         * a one-screen hero + spec/application carousel + CTA. The long
         * per-application prose (`ApplicationBento`, `ApplicationDetails`) is
         * not rendered here; the larger auto-advancing cards stay glanceable
         * without forcing desktop readers onto a second screen.
         */}
        {product === "mint" ? (
          <section id={routes.anchors.mint} aria-labelledby="mint-title" className="relative bg-navy">
            <DetailScreen
              titleId="mint-title"
              eyebrow={copy.shared.hardware[locale]}
              title={content.mint.title[locale]}
              lead={content.mint.lead[locale]}
              pills={
                <>
                  <DetailPill>{copy.shared.pillPebbleSquare}</DetailPill>
                  <DetailPill tone="accent">{copy.mint.pillStatus[locale]}</DetailPill>
                  <DetailPill>{copy.mint.pillType}</DetailPill>
                </>
              }
              image={content.mint.image}
              imageAlt={copy.mint.imageAlt[locale]}
              action={<DetailCta locale={locale} inline />}
            >
              <DetailBoard
                locale={locale}
                specLabel={copy.shared.keySpecs[locale]}
                rows={[{ specs: copy.mint.specs }]}
                appsLabel={copy.shared.applications[locale]}
                apps={copy.mint.detailApps.map((app) => ({
                  label: app.label[locale],
                  image: app.image,
                  alt: app.alt[locale],
                }))}
              />
            </DetailScreen>
          </section>
        ) : null}

        {product === "papaya" ? (
          <section id={routes.anchors.papaya} aria-labelledby="papaya-title" className="relative bg-navy">
            <DetailScreen
              titleId="papaya-title"
              eyebrow={copy.shared.hardware[locale]}
              title={content.papaya.title[locale]}
              // First two sentences only: the third repeats PAPAYA's 30 TOPS/W,
              // which the board already prints. `firstSentences` reads the
              // full CMS lead so the two never drift.
              lead={firstSentences(content.papaya.lead[locale], 2)}
              pills={
                <>
                  <DetailPill>{copy.shared.pillPebbleSquare}</DetailPill>
                  <DetailPill tone="accent">{copy.papaya.pillStatus[locale]}</DetailPill>
                  <DetailPill>{copy.papaya.pillType}</DetailPill>
                </>
              }
              image={content.papaya.image}
              imageAlt={copy.papaya.imageAlt[locale]}
              action={<DetailCta locale={locale} inline />}
            >
              <DetailBoard
                locale={locale}
                specLabel={copy.shared.keySpecs[locale]}
                rows={[
                  // First 3 only — `specs[3]` (POWER, "~10.000") is a Jetson
                  // Nano comparison figure with no unit; it is not shown bare.
                  { name: "PAPAYA", tag: copy.papaya.nameTag, specs: copy.papaya.specs.slice(0, 3) },
                  {
                    name: "PAPAYA FLEX",
                    tag: copy.papaya.flexNameTag,
                    tone: "teal",
                    specs: copy.papaya.flexAbsoluteSpecs,
                  },
                ]}
                appsLabel={copy.shared.applications[locale]}
                apps={copy.papaya.detailApps.map((app) => ({
                  label: app.label[locale],
                  image: app.image,
                  alt: app.alt[locale],
                }))}
              />
            </DetailScreen>
          </section>
        ) : null}

        {product === "espresso" ? (
          <section id={routes.anchors.espresso} aria-labelledby="espresso-title" className="relative bg-navy">
            <DetailScreen
              titleId="espresso-title"
              eyebrow={copy.shared.hardware[locale]}
              title={content.espresso.title[locale]}
              lead={content.espresso.lead[locale]}
              pills={
                <>
                  <DetailPill>{copy.shared.pillPebbleSquare}</DetailPill>
                  <DetailPill tone="info">{copy.espresso.pillStatus[locale]}</DetailPill>
                  <DetailPill>{copy.espresso.pillType}</DetailPill>
                </>
              }
              image={content.espresso.image}
              imageAlt={copy.espresso.imageAlt[locale]}
              action={<DetailCta locale={locale} inline />}
            >
              <DetailBoard
                locale={locale}
                specLabel={copy.shared.keySpecs[locale]}
                // 160 TOPS, not the ~140 in some working comps —
                // `copy.espresso.specs[0]` is the one source (CLAUDE.md § 1/§ 2).
                rows={[{ specs: copy.espresso.specs }]}
                specNote={
                  <span className="flex flex-wrap items-baseline gap-x-1.5 text-[12px] text-body lg:text-[13px]">
                    {copy.espresso.cardNote[locale]}
                    <strong className="font-bold text-accent">{copy.espresso.cardValue}</strong>
                  </span>
                }
                appsLabel={copy.shared.applications[locale]}
                apps={copy.espresso.detailApps.map((app) => ({
                  label: app.label[locale],
                  date: copy.espresso.pillStatus[locale],
                  image: app.image,
                  alt: app.alt[locale],
                }))}
              />
            </DetailScreen>
          </section>
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
