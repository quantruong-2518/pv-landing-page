import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ApplicationBento, ApplicationDetails } from "@/components/site/product/application-bento";
import {
  DetailAppRow,
  DetailAppTile,
  DetailCta,
  DetailGroupLabel,
  DetailHero,
  DetailPanel,
  DetailPill,
  PapayaAppTile,
  PapayaPanel,
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
         * MINT / PAPAYA / ESPRESSO — DETAIL brief (2026-09-24, locked). Each is
         * one light hero + white spec panel + navy CTA band (`product/detail.tsx`),
         * not the dark `ProductDetail` shell E-Series still uses below. The long
         * per-application prose (`ApplicationBento`'s bento grid, `ApplicationDetails`)
         * is no longer rendered on these three pages — the panel's ỨNG DỤNG row is a
         * photo + label, not a body paragraph — but both components and
         * `copy.<chip>.visuals`'s `body` text stay in the codebase (same "kept, not
         * shown" treatment as E-Series itself, routes.ts) since the photo/label tiles
         * below still read `visuals[].image` / `.alt`.
         */}
        {product === "mint" ? (
          <section id={routes.anchors.mint} aria-labelledby="mint-title" className="relative bg-navy">
            <DetailHero
              locale={locale}
              titleId="mint-title"
              eyebrow={copy.shared.hardware[locale]}
              title={content.mint.title[locale]}
              lead={content.mint.lead[locale]}
              image={content.mint.image}
              imageAlt={copy.mint.imageAlt[locale]}
            />
            <div className="relative z-10 -mt-10 px-gutter lg:-mt-16">
              <div className="mx-auto max-w-[1440px]">
                <DetailPanel
                  name="MINT"
                  pills={
                    <>
                      <DetailPill>{copy.shared.pillPebbleSquare}</DetailPill>
                      <DetailPill tone="accent">{copy.mint.pillStatus[locale]}</DetailPill>
                      <DetailPill>{copy.mint.pillType}</DetailPill>
                    </>
                  }
                  specLabel={copy.shared.keySpecs[locale]}
                  specs={copy.mint.specs}
                  locale={locale}
                  appsLabel={copy.shared.applications[locale]}
                  apps={
                    <DetailAppRow>
                      {/* `copy.mint.apps` and `.visuals` are two parallel lists that
                          share an order but not a length — IoT (apps[1]) has no
                          photo asset, so it sits between the two images below
                          rather than being visuals[1]. */}
                      <DetailAppTile
                        image={copy.mint.visuals[0].image}
                        alt={copy.mint.visuals[0].alt[locale]}
                        label={copy.mint.apps[0]}
                      />
                      <DetailAppTile icon="chip" label={copy.mint.apps[1]} />
                      <DetailAppTile
                        image={copy.mint.visuals[1].image}
                        alt={copy.mint.visuals[1].alt[locale]}
                        label={copy.mint.apps[2]}
                      />
                    </DetailAppRow>
                  }
                  nameColWidth="170px"
                />
              </div>
            </div>
            <DetailCta locale={locale} />
          </section>
        ) : null}

        {product === "papaya" ? (
          <section id={routes.anchors.papaya} aria-labelledby="papaya-title" className="relative bg-navy">
            <DetailHero
              locale={locale}
              titleId="papaya-title"
              eyebrow={copy.shared.hardware[locale]}
              // First two sentences only — D-Papaya-desktop-render.png stops
              // before the third (PAPAYA's own 30 TOPS/W efficiency line);
              // `firstSentences` reads the full CMS lead so the two never drift.
              lead={firstSentences(content.papaya.lead[locale], 2)}
              title={content.papaya.title[locale]}
              pillsUnderLead={
                <div className="flex flex-wrap gap-2.5">
                  <DetailPill>{copy.shared.pillPebbleSquare}</DetailPill>
                  <DetailPill tone="accent">{copy.papaya.pillStatus[locale]}</DetailPill>
                  <DetailPill>{copy.papaya.pillType}</DetailPill>
                </div>
              }
              image={content.papaya.image}
              imageAlt={copy.papaya.imageAlt[locale]}
              maxWidthClassName="lg:max-w-[550px] xl:max-w-[680px] min-[1400px]:max-w-[1000px]"
            />
            <div className="relative z-10 -mt-10 flex flex-col gap-3 px-gutter lg:-mt-16 lg:gap-4">
              {/* `xl:grid-cols-2`, not `lg:` — at 1024px each panel's own
                  3-tile-plus-thumbnail row (`PapayaPanel`) only has ~480px to
                  work with once split two-up, and "Performance" / "0,1–0,15"
                  wrapped and overran their tiles. Brief § "Mobile" calls the
                  768–1023 zone "sane intermediate (panel columns may stack)"
                  — they stack through `lg` and only go side by side from
                  `xl` (1280px), where each panel gets ~700px. */}
              <div className="mx-auto grid w-full max-w-[1440px] gap-3 xl:grid-cols-2 xl:gap-4">
                <PapayaPanel
                  name="PAPAYA"
                  tag={copy.papaya.nameTag}
                  specLabel={copy.shared.keySpecs[locale]}
                  // First 3 only — `specs[3]` (POWER, "~10.000") is a
                  // Jetson Nano comparison figure this panel doesn't carry
                  // (brief: PAPAYA tiles are 0,5 TOPS · 30 TOPS/W · 5 × 5 MM²).
                  specs={copy.papaya.specs.slice(0, 3)}
                  locale={locale}
                  chipImage={content.papaya.image}
                  chipAlt={copy.papaya.imageAlt[locale]}
                  tone="blue"
                />
                <PapayaPanel
                  name="PAPAYA FLEX"
                  tag={copy.papaya.flexNameTag}
                  specLabel={copy.shared.keySpecs[locale]}
                  specs={copy.papaya.flexAbsoluteSpecs}
                  locale={locale}
                  // Hardcoded like `mint`/`papaya`/`espresso`'s own `content.*.image`
                  // call sites elsewhere on this page — FLEX has no CMS-owned image
                  // field (schema.ts's `productContentSchema` has no `papayaFlex`
                  // section), same as the old dark `ProductDetail` branch this
                  // replaces (see `flexImageAlt`'s own doc comment, dictionary.ts).
                  chipImage="/images/papaya-flex-chrome-v4.png"
                  chipAlt={copy.papaya.flexImageAlt[locale]}
                  tone="teal"
                />
              </div>
              <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 bg-navy-lit p-6 lg:gap-[14px] lg:p-[26px]">
                <DetailGroupLabel className="text-[17px] lg:text-[20px]">
                  {copy.shared.applications[locale]}
                </DetailGroupLabel>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
                  {/* Display order is the brief's own (Nhận dạng hình ảnh / Thị
                      giác máy / Hệ thống an ninh / Robot), which is not
                      `copy.papaya.apps`'s stored order — indices below are
                      picked to match, not sequential. */}
                  <PapayaAppTile
                    image={copy.papaya.visuals[0].image}
                    alt={copy.papaya.visuals[0].alt[locale]}
                    icon="scan"
                    label={copy.papaya.apps[0][locale]}
                  />
                  <PapayaAppTile
                    image={copy.papaya.visuals[1].image}
                    alt={copy.papaya.visuals[1].alt[locale]}
                    icon="eye"
                    label={copy.papaya.apps[3][locale]}
                  />
                  <PapayaAppTile
                    image={copy.papaya.visuals[2].image}
                    alt={copy.papaya.visuals[2].alt[locale]}
                    icon="shield"
                    label={copy.papaya.apps[1][locale]}
                  />
                  <PapayaAppTile icon="robot" label={copy.papaya.apps[2][locale]} />
                </div>
              </div>
            </div>
            <DetailCta locale={locale} />
          </section>
        ) : null}

        {product === "espresso" ? (
          <section id={routes.anchors.espresso} aria-labelledby="espresso-title" className="relative bg-navy">
            <DetailHero
              locale={locale}
              titleId="espresso-title"
              eyebrow={copy.shared.hardware[locale]}
              title={content.espresso.title[locale]}
              lead={content.espresso.lead[locale]}
              image={content.espresso.image}
              imageAlt={copy.espresso.imageAlt[locale]}
            />
            <div className="relative z-10 -mt-10 px-gutter lg:-mt-16">
              <div className="mx-auto max-w-[1440px]">
                <DetailPanel
                  name="ESPRESSO"
                  pills={
                    <>
                      <DetailPill>{copy.shared.pillPebbleSquare}</DetailPill>
                      <DetailPill tone="info">{copy.espresso.pillStatus[locale]}</DetailPill>
                      <DetailPill>{copy.espresso.pillType}</DetailPill>
                    </>
                  }
                  specLabel={copy.shared.keySpecs[locale]}
                  // 160 TOPS, not the ~140 that shows up in some working
                  // comps — `copy.espresso.specs[0]` is this file's one
                  // source for the figure (CLAUDE.md § 1/§ 2).
                  specs={copy.espresso.specs}
                  // Desktop-only: D-Espresso-mobile-mock.html's tile 01 has no
                  // "Card 4 chip" line at all — index/label/value/unit alone,
                  // same as tiles 02/03 — so this only renders from `lg`.
                  specTileFooter={(index) =>
                    index === 0 ? (
                      <span className="hidden flex-wrap items-baseline gap-x-1.5 text-[13px] text-body lg:mt-2 lg:flex">
                        {copy.espresso.cardNote[locale]}
                        <strong className="font-bold text-accent">{copy.espresso.cardValue}</strong>
                      </span>
                    ) : null
                  }
                  locale={locale}
                  appsLabel={copy.shared.applications[locale]}
                  apps={
                    <DetailAppRow>
                      {/* Only the first two `targets` — Data Center (targets[2])
                          has no application photo and the brief's own tile list
                          for this page is "AI PC / Robotics" alone. */}
                      <DetailAppTile
                        image={copy.espresso.visuals[0].image}
                        alt={copy.espresso.visuals[0].alt[locale]}
                        label={copy.espresso.targets[0].name}
                        date={copy.espresso.targets[0].when[locale]}
                        className="lg:w-[160px]"
                      />
                      <DetailAppTile
                        image={copy.espresso.visuals[1].image}
                        alt={copy.espresso.visuals[1].alt[locale]}
                        label={copy.espresso.targets[1].name}
                        date={copy.espresso.targets[1].when[locale]}
                        className="lg:w-[160px]"
                      />
                    </DetailAppRow>
                  }
                  nameColWidth="250px"
                />
              </div>
            </div>
            <DetailCta locale={locale} />
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
