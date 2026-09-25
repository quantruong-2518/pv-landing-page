import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildNewsStories, NewsPage } from "@/components/site/news/news-page";
import { SiteHeader } from "@/components/site/site-header";
import { getPageContent, getPublishedAt } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, jsonLdScript, newsPageJsonLd, organisationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * `/[locale]/news` — the standalone listing (DARK-BUILD-brief PART B). Reads
 * the same `home` CMS document as the home page's news section
 * (`getPageContent("home")`, not `"product"`) — see `NewsPage`'s own doc
 * comment for why the two never publish a different set of stories.
 */
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata("news", locale);
}

export default async function NewsListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getPageContent("home");
  const publishedAt = await getPublishedAt();

  // Same CMS-visibility rule as every other section: hiding the home news
  // block must 404 this page too, not leave a copy of it live with nothing
  // to back it.
  if (!content.news.visible) notFound();

  const stories = buildNewsStories(content.news, locale);

  return (
    <>
      <SiteHeader locale={locale} active="news" />
      <main>
        <NewsPage content={content.news} locale={locale} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          organisationJsonLd(locale),
          websiteJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: dictionary.header.nav.home[locale], path: routes.home(locale) },
            { name: dictionary.header.nav.news[locale], path: routes.news(locale) },
          ]),
          newsPageJsonLd(locale, {
            dateModified: publishedAt.toISOString(),
            items: stories.map((story) => ({
              id: story.iso,
              datePublished: story.iso,
              headline: story.title,
              description: story.body,
              image: story.image,
            })),
          }),
        ])}
      />
    </>
  );
}
