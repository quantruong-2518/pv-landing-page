import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Catalogue } from "@/components/site/product/catalogue";
import { ProductContact } from "@/components/site/product/product-contact";
import { SiteHeader } from "@/components/site/site-header";
import { getPageContent, getPublishedAt } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  jsonLdScript,
  organisationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * Products & solutions hub.
 *
 * The catalogue (which owns the page's `<h1>`) and contact. The four
 * hardware lines it used to render inline (MINT, PAPAYA, ESPRESSO, E-Series)
 * now each have their own page at `/[locale]/products/<slug>`
 * (`src/app/(public)/[locale]/products/[product]/page.tsx`); software and
 * training — the two solution sections that used to sit between the
 * catalogue and contact — moved the same way, to
 * `/[locale]/products/{software,training}/page.tsx`, for the same reason:
 * one URL cannot rank for two different subjects, and rendering the same
 * copy here as well as there would be the duplicate-content problem that
 * split exists to avoid. The catalogue's hardware AND solution cards below
 * link out to those pages instead of to an in-page anchor.
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
  // Same memoised `getContent()` as `getPageContent` above, so this costs no
  // extra disk read — the only honest source for JSON-LD `dateModified`
  // (never a build-time `new Date()`, which would claim every page changed
  // on every build).
  const publishedAt = await getPublishedAt();

  return (
    <>
      <SiteHeader locale={locale} active="products" />

      <main>
        {content.catalog.visible ? (
          <Catalogue
            content={content.catalog}
            locale={locale}
            softwareImage={content.software.image}
            trainingImage={content.training.image}
          />
        ) : (
          // Catalogue owns the page's only <h1>. Hiding the catalog section
          // from the CMS `visible` toggle must not strip the document of its
          // heading, so a sr-only one carries the page's own title instead.
          <h1 className="sr-only">{dictionary.meta.products.title[locale]}</h1>
        )}

        {content.contact.visible ? (
          <ProductContact content={content.contact} locale={locale} />
        ) : null}
      </main>

      {/* CollectionPage nests the product ItemList as its own `mainEntity`
          instead of sitting beside it as a second, bare ItemList node — see
          `collectionPageJsonLd` in jsonld.ts for why the two share one body
          builder. Emitting both here would print the product list twice in
          one document. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          // The organisation and website nodes are repeated on this document
          // for the same reason /bio repeats the organisation: every `@id`
          // reference below — each product's `brand` and `manufacturer`, and
          // `CollectionPage.isPartOf` — has to resolve inside the document a
          // crawler is currently reading. Emitted nowhere on this page, those
          // references pointed at nothing.
          organisationJsonLd(locale),
          websiteJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: dictionary.header.nav.home[locale], path: routes.home(locale) },
            { name: dictionary.header.nav.products[locale], path: routes.products(locale) },
          ]),
          collectionPageJsonLd(locale, {
            dateModified: publishedAt.toISOString(),
            content: {
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
            },
          }),
        ])}
      />
    </>
  );
}
