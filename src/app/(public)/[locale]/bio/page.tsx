import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Marquee } from "@/components/motion/marquee";
import { BioDirections } from "@/components/site/bio/directions";
import { BioFaq } from "@/components/site/bio/faq";
import { BioFigures } from "@/components/site/bio/figures";
import { BioIdentity } from "@/components/site/bio/identity";
import { BioMasthead } from "@/components/site/bio/masthead";
import { BioPartners } from "@/components/site/bio/partners";
import { BioTimeline } from "@/components/site/bio/timeline";
import { BioWork } from "@/components/site/bio/work";
import { SiteHeader } from "@/components/site/site-header";
import { getPageContent, getPublishedAt } from "@/lib/content/store";
import { isLocale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import {
  aboutPageJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
  organisationJsonLd,
} from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * /bio — the company profile.
 *
 * A profile page is where a company is most tempted to invent: a founding
 * story, a headcount, a mission statement, a wall of client logos. This one
 * states nothing the site does not already publish. Every paragraph is read out
 * of the CMS document the home page renders, every figure out of the product
 * spec tables, and every legal value out of `dictionary.footer` — so the sheet
 * cannot say something /vi does not, and an edit in the CMS moves both.
 *
 * That is also why it reads the *home* document rather than owning one. It has
 * no CMS section of its own, and the `visible` flags are still honoured: a
 * block the editor hides on the home page disappears from the profile too.
 *
 * § 06, the FAQ, is the one exception: it renders `dictionary.bio.faq`
 * rather than a CMS field, so it has no `visible` flag and always renders —
 * see the render call below for why. Its answers restate the same figures and
 * dates the rest of this page and /products already publish; see that
 * dictionary block's own header comment for the source of each one.
 *
 * `faqJsonLd` below must quote exactly the text `BioFaq` renders — Google
 * only credits `FAQPage` markup when it matches what a reader actually sees.
 *
 * The look is a deliberate departure — a numbered technical sheet with a
 * drawing grid, a rotated rail, one inverted daylight band and a stamped legal
 * block. All of it is built from the same @theme tokens as the other pages;
 * see the "/bio" block in globals.css.
 */
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata("bio", locale);
}

export default async function BioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getPageContent("home");
  const publishedAt = await getPublishedAt();

  // The FAQ text itself, resolved to the current locale, so the JSON-LD below
  // quotes exactly what this render puts on the page — never a second copy of
  // the same words that could drift from it.
  const faqItems = dictionary.bio.faq.items.map((item) => ({
    id: item.id,
    question: item.question[locale],
    answer: item.answer[locale],
  }));

  return (
    <>
      <SiteHeader locale={locale} active="bio" />

      <main className="bio-sheet">
        <BioMasthead locale={locale} />

        {content.marquee.visible ? <Marquee items={content.marquee.items[locale]} /> : null}

        {content.hero.visible ? <BioWork content={content.hero} locale={locale} /> : null}
        {content.pim.visible ? <BioDirections content={content.pim} locale={locale} /> : null}
        {content.core.visible ? <BioFigures content={content.core} locale={locale} /> : null}
        <BioTimeline locale={locale} />
        {content.news.visible ? <BioPartners content={content.news} locale={locale} /> : null}
        {/* Unlike every block above, § 06 has no CMS section of its own — it
            renders `dictionary.bio.faq` rather than a `HomeContent` field, so
            there is no `visible` flag to check. Gating it on an unrelated
            flag (e.g. `content.news.visible`) would hide the FAQ for a reason
            that has nothing to do with the FAQ, so it always renders. */}
        <BioFaq locale={locale} />
        {content.contact.visible ? (
          <BioIdentity content={content.contact} locale={locale} />
        ) : null}
      </main>

      {/* The organisation node is repeated here rather than referenced across
          pages: `AboutPage.about` points at an @id, and that @id has to be
          defined on the document a crawler is currently reading. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          organisationJsonLd(locale),
          aboutPageJsonLd(locale, { dateModified: publishedAt.toISOString() }),
          faqJsonLd(locale, faqItems),
          breadcrumbJsonLd(locale, [
            { name: dictionary.header.nav.home[locale], path: routes.home(locale) },
            { name: dictionary.header.nav.bio[locale], path: routes.bio(locale) },
          ]),
        ])}
      />
    </>
  );
}
