import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrainingPage } from "@/components/site/product/training-page";
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

/** Static sibling of `[product]` — see the identical note on
 *  `products/software/page.tsx`. */
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata("productTraining", locale);
}

export default async function ProductTrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getPageContent("product");
  const publishedAt = await getPublishedAt();

  if (!content.training.visible) notFound();

  return (
    <>
      <SiteHeader locale={locale} active="products" />
      <main>
        <TrainingPage content={content.training} locale={locale} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          organisationJsonLd(locale),
          websiteJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: dictionary.header.nav.home[locale], path: routes.home(locale) },
            { name: dictionary.header.nav.products[locale], path: routes.products(locale) },
            { name: content.training.title[locale], path: routes.productTraining(locale) },
          ]),
          standalonePageJsonLd(locale, {
            path: routes.productTraining(locale),
            dateModified: publishedAt.toISOString(),
            title: content.training.title[locale],
            description: content.training.lead[locale],
            image: content.training.image,
          }),
        ])}
      />
    </>
  );
}
