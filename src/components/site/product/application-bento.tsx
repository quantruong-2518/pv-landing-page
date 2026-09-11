import Image from "next/image";

import { GroupRule, NumberedItem } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import type { Locale, Localized } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

type ApplicationVisual = {
  image: string;
  title: Localized;
  alt: Localized;
  /**
   * Two or three sentences: the problem, why PIM suits it, which part serves
   * it. Added to every `dictionary.product.*.visuals[]` entry alongside
   * `title`/`alt` — see `ApplicationDetails` below for where it renders.
   */
  body: Localized;
};

/**
 * A product-system view, not another isolated chip render.
 *
 * Every application image is generated to the same 3:2 canvas, graphite
 * material family and cyan/copper studio light. The layout gives a three-item
 * system a wider chip anchor; PAPAYA's four-item system becomes an even 2 × 2
 * matrix so none of its vision applications reads as secondary.
 */
export function ApplicationBento({
  locale,
  product,
  chip,
  applications,
}: {
  locale: Locale;
  product: string;
  chip: { image: string; alt: string };
  applications: readonly ApplicationVisual[];
}) {
  const copy = dictionary.product.shared;
  const evenGrid = applications.length === 3;

  return (
    <div className="relative isolate w-full lg:ml-auto" aria-label={copy.visualSystem[locale]}>
      <div className="mb-2.5 flex items-center justify-between gap-4 font-mono text-label text-faint">
        <span>{copy.visualSystem[locale]}</span>
        <span aria-hidden className="flex items-center gap-2 whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
          {String(applications.length).padStart(2, "0")} / EDGE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        <VisualCard
          src={chip.image}
          alt={chip.alt}
          eyebrow={copy.chipCore[locale]}
          title={product}
          index="00"
          contain
          className={cn(!evenGrid && "col-span-2 aspect-[16/7]", evenGrid && "aspect-[3/2]")}
        />

        {applications.map((application, index) => (
          <VisualCard
            key={application.image}
            src={application.image}
            alt={application.alt[locale]}
            eyebrow={copy.applicationDevice[locale]}
            title={application.title[locale]}
            index={String(index + 1).padStart(2, "0")}
            className="aspect-[3/2]"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * The application prose `ApplicationBento` above cannot carry.
 *
 * That grid is a glance: an image and a four-word title per card, sized to sit
 * beside the copy column inside `ProductDetail`'s one-viewport `screen`
 * section (CLAUDE.md §3 — a `screen` block is only full height from `md`, but
 * it is still calibrated by `spend="between"` to end its surplus at the
 * bottom edge, and three more paragraphs stuffed into that budget would
 * either overflow the fixed 3:2 vignette cards or push the whole hero section
 * well past one viewport). The real prose — what problem, why PIM, which part
 * — needs its own room to read, so it is a plain block below the hero
 * section instead of inside it. A plain `Section` has no height budget to
 * break: it has no `screen`/`min-h`, so it simply grows with its content on a
 * 360px phone exactly like every other non-hero block on the site, and
 * nothing in it is wider than its own text column, so there is no horizontal
 * overflow to check for either.
 *
 * This is server-rendered text, not a caption or a hover reveal — it has to
 * be readable in the served HTML for the searches this content is meant to
 * rank for.
 */
export function ApplicationDetails({
  locale,
  label,
  applications,
}: {
  locale: Locale;
  label: string;
  applications: readonly ApplicationVisual[];
}) {
  const headingId = "applications-title";

  return (
    // This band is the page's second real section, so it is marked up as one:
    // the rule's label is its `h2`, and each application's name is an `h3`.
    // Before this they were a `span` and a `div` styled to look like headings,
    // which left the whole band — the only prose on the page that names what
    // the chip is used for — outside the document outline.
    <Section labelledBy={headingId}>
      <GroupRule label={label} labelAs="h2" labelId={headingId} />
      <div className="mt-[clamp(16px,1.8vw,26px)] grid gap-x-col gap-y-2 sm:grid-cols-2">
        {applications.map((application, index) => (
          <NumberedItem
            key={application.image}
            index={String(index + 1).padStart(2, "0")}
            title={application.title[locale]}
            body={application.body[locale]}
            titleAs="h3"
          />
        ))}
      </div>
    </Section>
  );
}

function VisualCard({
  src,
  alt,
  eyebrow,
  title,
  index,
  contain,
  className,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  index: string;
  contain?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group relative min-h-0 overflow-hidden bg-night-deep",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 639px) 47vw, (max-width: 1023px) 46vw, 23vw"
        className={cn(
          "transition duration-700 ease-out group-hover:scale-[1.025]",
          contain ? "object-contain p-[3%]" : "object-cover",
        )}
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/5 to-transparent"
      />
      <span
        aria-hidden
        className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.14em] text-contact/70"
      >
        {index}
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 sm:p-4">
        <span className="min-w-0">
          <span className="block font-mono text-[9px] leading-none tracking-[0.13em] text-accent sm:text-[10px]">
            {eyebrow}
          </span>
          <span className="mt-1.5 block text-[clamp(0.78rem,1.1vw,0.95rem)] leading-tight font-semibold text-ink">
            {title}
          </span>
        </span>
        <span aria-hidden className="mb-0.5 h-px w-5 shrink-0 bg-accent/70" />
      </figcaption>

    </figure>
  );
}
