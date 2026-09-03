import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpecGrid } from "@/components/site/primitives";
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
            <SpecGrid specs={copy.mint.specs} locale={locale} />
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
            <SpecGrid specs={copy.papaya.flexSpecs} locale={locale} className="lg:grid-cols-3" />
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
            aside={
              <>
                <SpecGrid specs={copy.espresso.specs} locale={locale} />
                <div className="flex items-baseline gap-4 pt-4">
                  <span className="font-mono text-label whitespace-nowrap text-faint">
                    {copy.espresso.cardLabel[locale]}
                  </span>
                  <span className="font-heading text-[clamp(1.5rem,2.2vw,2.125rem)] leading-none text-accent">
                    {copy.espresso.cardValue}
                  </span>
                </div>
              </>
            }
          >
            {/* Target platforms with their dates — ESPRESSO is a Q3/2026 part,
                so every application below carries when it is expected. */}
            <div className="grid grid-cols-3 gap-x-3.5 pt-2 lg:max-w-[50%]">
              {copy.espresso.targets.map((target) => (
                <div key={target.name} className="py-4">
                  <div className="text-[1rem] font-semibold">{target.name}</div>
                  <div className="mt-1 text-[0.8125rem] text-faint">{target.when[locale]}</div>
                </div>
              ))}
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
