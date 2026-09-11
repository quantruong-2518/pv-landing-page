import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Marquee } from "@/components/motion/marquee";
import { ContactSection } from "@/components/site/home/contact-section";
import { CoreStats } from "@/components/site/home/core-stats";
import { Hero } from "@/components/site/home/hero";
import { NewsGrid } from "@/components/site/home/news-grid";
import { PimSection } from "@/components/site/home/pim-section";
import { SolutionsList } from "@/components/site/home/solutions-list";
import { WhySection } from "@/components/site/home/why-section";
import { SiteHeader } from "@/components/site/site-header";
import { getPageContent, getPublishedAt } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { jsonLdScript, organisationJsonLd, webPageJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * Home page.
 *
 * Rendered on the server and revalidated on a timer, so the HTML a crawler
 * receives is the finished page — every heading, every figure, every paragraph
 * present without running a line of JavaScript. Publishing from the CMS calls
 * `revalidatePath`, so an edit does not wait out the window.
 *
 * Section visibility comes from the CMS `visible` flag rather than a build-time
 * prop, which is what makes the admin toggle mean anything.
 */
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata("home", locale);
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getPageContent("home");
  // Same memoised `getContent()` as `getPageContent` above, so this costs no
  // extra disk read — the only honest source for JSON-LD `dateModified`
  // (never a build-time `new Date()`, which would claim every page changed
  // on every build).
  const publishedAt = await getPublishedAt();

  return (
    <>
      <SiteHeader locale={locale} active="home" />

      <main>
        {content.hero.visible ? (
          <Hero content={content.hero} locale={locale} />
        ) : (
          // Hero owns the page's only <h1>. Hiding it from the CMS `visible`
          // toggle must not strip the document of its heading, so a sr-only
          // one carries the page's own title instead.
          <h1 className="sr-only">{dictionary.meta.home.title[locale]}</h1>
        )}
        {content.marquee.visible ? <Marquee items={content.marquee.items[locale]} /> : null}
        {content.pim.visible ? <PimSection content={content.pim} locale={locale} /> : null}
        {content.why.visible ? <WhySection content={content.why} locale={locale} /> : null}
        {content.core.visible ? <CoreStats content={content.core} locale={locale} /> : null}
        {content.solutions.visible ? (
          <SolutionsList content={content.solutions} locale={locale} />
        ) : null}
        {content.news.visible ? <NewsGrid content={content.news} locale={locale} /> : null}
        {content.contact.visible ? (
          <ContactSection content={content.contact} locale={locale} />
        ) : null}
      </main>

      {/* Structured data: who the company is, what this site is, and this page
          itself. No breadcrumb here — a one-item trail on the root says
          nothing. `webPageJsonLd`'s image is the CMS hero image the page
          actually leads with, not a hardcoded path — it stays correct if an
          editor swaps the hero asset. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          organisationJsonLd(locale),
          websiteJsonLd(locale),
          webPageJsonLd(locale, {
            dateModified: publishedAt.toISOString(),
            image: content.hero.image,
          }),
        ])}
      />
    </>
  );
}
