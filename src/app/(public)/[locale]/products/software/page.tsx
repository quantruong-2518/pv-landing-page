import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SoftwarePage } from "@/components/site/product/software-page";
import { SiteHeader } from "@/components/site/site-header";
import { getPageContent, getPublishedAt } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  organisationJsonLd,
  standalonePageJsonLd,
  websiteJsonLd,
} from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * `/[locale]/products/software` — a static sibling of `[product]/page.tsx`'s
 * dynamic `[product]` segment. Next resolves the static route before the
 * dynamic one at the same level, so this never reaches that file's
 * `isProductSlug` check; `PRODUCT_SLUGS` (routes.ts) never gained a
 * "software" entry, so there is nothing there to collide with anyway.
 */
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata("productSoftware", locale);
}

export default async function ProductSoftwarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getPageContent("product");
  const publishedAt = await getPublishedAt();

  // Same CMS visibility rule as every other product section (`[product]/
  // page.tsx`): an editor hiding this section must 404 the page, not leave
  // an empty shell live.
  if (!content.software.visible) notFound();

  return (
    <>
      <SiteHeader locale={locale} active="products" />
      <main>
        <SoftwarePage content={content.software} locale={locale} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          organisationJsonLd(locale),
          websiteJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: dictionary.header.nav.home[locale], path: routes.home(locale) },
            { name: dictionary.header.nav.products[locale], path: routes.products(locale) },
            { name: content.software.title[locale], path: routes.productSoftware(locale) },
          ]),
          standalonePageJsonLd(locale, {
            path: routes.productSoftware(locale),
            dateModified: publishedAt.toISOString(),
            title: content.software.title[locale],
            description: content.software.lead[locale],
            image: content.software.image,
          }),
        ])}
      />
    </>
  );
}
