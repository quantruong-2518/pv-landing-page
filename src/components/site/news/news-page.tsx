import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { DetailCta, DetailKicker, DetailPill } from "@/components/site/product/detail";
import { MarkedText, Pill } from "@/components/site/primitives";
import type { HomeContent } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";

/**
 * `/news` — the standalone listing (N-News-dark mocks, DARK-BUILD-brief
 * PART B). Same four announcements as the home section's `NewsBoard`
 * (`home/news-board.tsx`), read from the same CMS fields
 * (`content.news.count` / `.image1-4`, `dictionary.home.news.items`) so an
 * editor never has to publish a story twice — just listed in full instead of
 * one featured card plus a 3-item phone slider.
 *
 * Cards are `<article>`s, not links, for the same reason `NewsBoard` gives:
 * there is still no per-article route, only this listing, so "Đọc toàn bài" /
 * "Đọc tin" render as plain text rather than a link with nowhere to go.
 */
export type NewsStory = ReturnType<typeof buildNewsStories>[number];

/**
 * Newest-first story list, shared with the route file
 * (`app/(public)/[locale]/news/page.tsx`) so its `NewsArticle` JSON-LD lists
 * the exact same stories in the exact same order this component renders —
 * one sort, not two that could drift apart.
 */
export function buildNewsStories(content: HomeContent["news"], locale: Locale) {
  const images = [content.image1, content.image2, content.image3, content.image4];

  return dictionary.home.news.items
    .slice(0, content.count)
    .map((item, index) => ({
      date: item.date,
      iso: toIsoDate(item.date),
      // For the "newest first" sort only — `Date.parse` on a bare
      // `dd.mm.yyyy` string is locale-dependent in a way `iso` (yyyy-mm-dd)
      // is not.
      sortKey: toIsoDate(item.date),
      title: item.title[locale],
      body: item.body[locale],
      image: images[index],
    }))
    // Newest first (brief: "listing: newest featured + the rest, newest
    // first by date") — the stored order is the CMS document's own order,
    // not necessarily date order.
    .sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1));
}

export function NewsPage({ content, locale }: { content: HomeContent["news"]; locale: Locale }) {
  const copy = dictionary.news;
  const stories = buildNewsStories(content, locale);

  const [featured, ...rest] = stories;
  const titleParts = splitAmpersand(content.title[locale]);

  return (
    <section className="relative overflow-hidden bg-night pb-16 lg:pb-24">
      <div aria-hidden className="glow-detail-hero pointer-events-none absolute inset-x-0 top-0 h-[560px]" />

      <div className="relative mx-auto max-w-[1440px] px-gutter pt-8 lg:pt-14">
        <div className="flex max-w-[900px] flex-col gap-4 lg:gap-[22px]">
          <DetailKicker label={copy.kicker[locale]} className="text-[13px] lg:text-[18px]" />
          <h1 className="text-[26px] leading-[1.1] font-bold text-balance text-ink uppercase lg:text-[48px] lg:tracking-[-0.01em]">
            {titleParts.lead}
            {titleParts.rest ? <span className="text-accent"> {titleParts.rest}</span> : null}
          </h1>
          <p className="max-w-[54ch] text-[15px] leading-[1.6] text-body lg:text-[18px] lg:leading-[1.7]">
            <MarkedText value={content.lead[locale]} />
          </p>
          {featured ? (
            <div className="mt-1 flex flex-wrap gap-2.5">
              <Pill tone="accent">
                {copy.newestLabel[locale]} {featured.date}
              </Pill>
              <DetailPill>{copy.countTemplate[locale].replace("{count}", String(stories.length))}</DetailPill>
            </div>
          ) : null}
        </div>
      </div>

      {featured ? (
        <div className="relative z-10 mt-9 px-gutter">
          <div className="mx-auto grid max-w-[1440px] gap-y-6 border border-ink/10 bg-ink/[0.035] p-6 lg:grid-cols-2 lg:gap-x-14 lg:p-11">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 lg:border-l lg:border-ink/10 lg:pl-14">
              <span className="font-mono text-[12px] font-medium tracking-[0.14em] text-accent uppercase">
                {copy.newestLabel[locale]}
              </span>
              <time dateTime={featured.iso}>
                <Pill tone="info">{featured.date}</Pill>
              </time>
              <h2 className="text-[24px] leading-[1.3] font-bold text-ink lg:text-[30px]">{featured.title}</h2>
              <p className="text-[16px] leading-[1.7] text-body lg:text-[17px]">
                <MarkedText value={featured.body} />
              </p>
              {/* `copy.readFullLabel` is not rendered until an article route
                  exists: accent text with an arrow reads as a link, and one
                  that goes nowhere is worse than none. */}
            </div>
          </div>
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="relative z-10 mt-5 px-gutter">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-7 border border-ink/10 bg-ink/[0.035] p-6 lg:p-11">
            <span className="font-mono text-[12px] font-medium tracking-[0.14em] text-accent uppercase">
              {copy.previousLabel[locale]}
            </span>

            {/* Phone: a horizontal scroll-snap rail (N-News-dark-Mobile
                mock), not the stacked grid below — three full-width cards
                back to back nearly doubled this page's scroll length for
                content a reader only skims. The dots are static (first
                card active) rather than scroll-driven: this is a server
                component and the CMS-visibility gate above requires it to
                stay one, so there is no JS index to track. `snap-start`
                still gives the rail real per-card paging on touch. */}
            <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 sm:hidden">
              {rest.map((story) => (
                <PreviousStoryCard key={story.iso} story={story} className="w-[280px] flex-none snap-start" />
              ))}
            </div>
            <div aria-hidden className="flex gap-1.5 sm:hidden">
              {rest.map((story, index) => (
                <span key={story.iso} className={index === 0 ? "h-[3px] w-6 bg-accent" : "h-[3px] w-3 bg-ink/16"} />
              ))}
            </div>

            <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((story, index) => (
                <Reveal key={story.iso} delay={index * 0.06} className="flex">
                  <PreviousStoryCard story={story} className="w-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex justify-center bg-navy py-14">
        {/* Same one-CTA band as the software / training / chip pages, not the
            all-caps `consult` button: the four pages read as one family. */}
        <DetailCta locale={locale} />
      </div>
    </section>
  );
}

/**
 * One "Các tin trước" card, shared by the phone scroll-snap rail and the
 * `sm`-and-up grid so the two layouts never drift apart (N-News-dark-Mobile
 * vs -Desktop mocks render the exact same card, just reflowed).
 */
function PreviousStoryCard({
  story,
  className,
}: {
  story: NewsStory;
  className?: string;
}) {
  return (
    <article className={`flex flex-col border border-ink/8 bg-ink/[0.04] ${className ?? ""}`}>
      <div className="relative aspect-[4/3]">
        <Image
          src={story.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 280px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3.5 p-6 pb-7">
        <time dateTime={story.iso}>
          <Pill tone="info">{story.date}</Pill>
        </time>
        <h3 className="text-[19px] leading-[1.4] font-semibold text-ink">{story.title}</h3>
        <p className="flex-1 text-[15px] leading-[1.65] text-body">
          <MarkedText value={story.body} />
        </p>

      </div>
    </article>
  );
}

/** "02.04.2025" → "2025-04-02", for `<time dateTime>` and the newest-first
 *  sort — same conversion `NewsGrid` uses (home/news-grid.tsx). */
function toIsoDate(display: string): string {
  const [day, month, year] = display.split(".");
  return `${year}-${month}-${day}`;
}

/**
 * Splits "TIN TỨC & HỢP TÁC" / "NEWS & PARTNERSHIPS" / "뉴스 & 협력" on their
 * shared " & " — true in all three locales of `home.news.title` (seed.ts) —
 * so the H1 can colour the second half accent, as N-News-dark-Desktop-
 * mock.html does ("Tin tức & <span accent>hợp tác</span>"), without adding an
 * inline-markup mark to a CMS string the home page reads unchanged.
 */
function splitAmpersand(value: string): { lead: string; rest: string | null } {
  const at = value.indexOf(" & ");
  if (at === -1) return { lead: value, rest: null };
  return { lead: value.slice(0, at) + " &", rest: value.slice(at + 3) };
}
