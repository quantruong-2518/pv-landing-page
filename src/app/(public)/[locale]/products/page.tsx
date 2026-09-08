import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpecGrid, VignetteImage } from "@/components/site/primitives";
import { Catalogue } from "@/components/site/product/catalogue";
import { ESeriesCards } from "@/components/site/product/eseries-cards";
import { ProductContact } from "@/components/site/product/product-contact";
import { ProductDetail, SpecHeading } from "@/components/site/product/product-detail";
import { SoftwareSection } from "@/components/site/product/software-section";
import { TrainingSection } from "@/components/site/product/training-section";
import { SiteHeader } from "@/components/site/site-header";
import { getPageContent } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, jsonLdScript, productCatalogueJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * Products & solutions.
 *
 * Seven sections, one per product line, each with a stable anchor so the home
 * page and the catalogue cards can link straight into the part a reader asked
 * about. Order follows the roadmap, shipped first: MINT → PAPAYA → ESPRESSO →
 * E-Series → software → training → contact.
 */
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata("products", locale);
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getPageContent("product");
  const copy = dictionary.product;

  return (
    <>
      <SiteHeader locale={locale} active="products" />

      <main>
        {content.catalog.visible ? <Catalogue content={content.catalog} locale={locale} /> : null}

        {content.mint.visible ? (
          <ProductDetail
            id={routes.anchors.mint}
            locale={locale}
            kicker={copy.shared.hardware[locale]}
            meta={copy.mint.meta[locale]}
            title={content.mint.title[locale]}
            lead={content.mint.lead[locale]}
            image={{ src: content.mint.image, alt: "MINT" }}
            apps={copy.mint.apps}
            className="glow-mint bg-navy"
          >
            <SpecHeading label={copy.shared.keySpecs[locale]} className="mt-[clamp(22px,2.4vw,36px)]" />
            {/* Three fixed 12rem tracks, not `auto-fit`. `auto-fit` collapses
                its empty tracks and hands the free space back to the survivors,
                so three short figures were spread over the full 1390px with
                ~350px of void between them. At 12rem the row is the width of
                the copy column above it and the figures read as one group. */}
            <SpecGrid
              specs={copy.mint.specs}
              locale={locale}
              className="lg:grid-cols-[repeat(3,minmax(0,12rem))]"
            />
          </ProductDetail>
        ) : null}

        {content.papaya.visible ? (
          <ProductDetail
            id={routes.anchors.papaya}
            locale={locale}
            kicker={copy.shared.hardware[locale]}
            meta={copy.papaya.meta[locale]}
            title={content.papaya.title[locale]}
            lead={content.papaya.lead[locale]}
            image={{ src: content.papaya.image, alt: "PAPAYA" }}
            apps={copy.papaya.apps.map((app) => app[locale])}
            className="glow-papaya bg-night-deep"
          >
            {/* Two spec blocks: PAPAYA's own figures, then FLEX stated purely as
                multiples against a named competitor part — each with the
                measurement that produced it, because "~100×" alone is a slogan. */}
            <SpecHeading
              name="PAPAYA"
              label={copy.shared.keySpecs[locale]}
              className="mt-[clamp(26px,3vw,44px)]"
            />
            <SpecGrid specs={copy.papaya.specs} locale={locale} className="lg:grid-cols-4" />

            <SpecHeading
              name="PAPAYA FLEX"
              label={copy.papaya.flexLabel}
              className="mt-[clamp(22px,2.4vw,36px)]"
            />
            {/* `items-start`, not `items-center`: the FLEX render is far taller
                than the three-figure column, and centring the figures against
                it opened ~120px of nothing directly under the "PAPAYA FLEX"
                heading. Specs start under their own heading. */}
            <div className="grid items-start gap-col lg:grid-cols-[1fr_0.65fr]">
              <SpecGrid specs={copy.papaya.flexSpecs} locale={locale} className="lg:grid-cols-3" />
              <VignetteImage
                src="/images/papaya-flex-chrome-v4.png"
                alt="PAPAYA FLEX — PEBBLE SQUARE"
                sizes="(max-width: 1023px) 94vw, 38vw"
                className="product-chrome-art"
              />
            </div>
          </ProductDetail>
        ) : null}

        {content.espresso.visible ? (
          <ProductDetail
            id={routes.anchors.espresso}
            locale={locale}
            kicker={copy.shared.hardware[locale]}
            meta={copy.espresso.meta[locale]}
            title={content.espresso.title[locale]}
            lead={content.espresso.lead[locale]}
            image={{ src: content.espresso.image, alt: "ESPRESSO" }}
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
            <div className="mt-[clamp(22px,2.4vw,36px)] flex flex-col gap-2">
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
        ) : null}

        {content.eseries.visible ? (
          <ProductDetail
            id={routes.anchors.eSeries}
            locale={locale}
            kicker={copy.eseries.kicker}
            meta={copy.eseries.meta[locale]}
            title={content.eseries.title[locale]}
            lead={content.eseries.lead[locale]}
            image={{ src: content.eseries.image, alt: "E-Series" }}
            apps={copy.eseries.apps}
            showCta={false}
            className="glow-eseries bg-night-deep"
          >
            <ESeriesCards locale={locale} />
          </ProductDetail>
        ) : null}

        {content.software.visible ? (
          <SoftwareSection content={content.software} locale={locale} />
        ) : null}

        {content.training.visible ? (
          <TrainingSection content={content.training} locale={locale} />
        ) : null}

        {content.contact.visible ? (
          <ProductContact content={content.contact} locale={locale} />
        ) : null}
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbJsonLd(locale, [
            { name: dictionary.header.nav.home[locale], path: routes.home(locale) },
            { name: dictionary.header.nav.products[locale], path: routes.products(locale) },
          ]),
          productCatalogueJsonLd(locale, {
            mint: {
              title: content.mint.title[locale],
              description: content.mint.lead[locale],
              image: content.mint.image,
            },
            papaya: {
              title: content.papaya.title[locale],
              description: content.papaya.lead[locale],
              image: content.papaya.image,
            },
            espresso: {
              title: content.espresso.title[locale],
              description: content.espresso.lead[locale],
              image: content.espresso.image,
            },
            eseries: {
              title: content.eseries.title[locale],
              description: content.eseries.lead[locale],
              image: content.eseries.image,
            },
          }),
        ])}
      />
    </>
  );
}
