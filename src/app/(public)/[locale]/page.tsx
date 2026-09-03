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
import { getPageContent } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { jsonLdScript, organisationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
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

  return (
    <>
      <SiteHeader locale={locale} active="home" />

      <main>
        {content.hero.visible ? <Hero content={content.hero} locale={locale} /> : null}
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

      {/* Structured data: who the company is and what this site is. No
          breadcrumb here — a one-item trail on the root says nothing. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([organisationJsonLd(locale), websiteJsonLd(locale)])}
      />
    </>
  );
}
