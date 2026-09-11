import Image from "next/image";

import type { Locale, Localized } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

type ApplicationVisual = {
  image: string;
  title: Localized;
  alt: Localized;
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
      <div aria-hidden className="pointer-events-none absolute -inset-5 opacity-60">
        <span className="absolute top-0 left-0 h-8 w-px bg-gradient-to-b from-accent/65 to-transparent" />
        <span className="absolute top-0 left-0 h-px w-24 bg-gradient-to-r from-accent/65 to-transparent" />
        <span className="absolute right-0 bottom-0 h-8 w-px bg-gradient-to-t from-accent/45 to-transparent" />
        <span className="absolute right-0 bottom-0 h-px w-24 bg-gradient-to-l from-accent/45 to-transparent" />
      </div>

      <div className="mb-3 flex items-center justify-between gap-4 font-mono text-label text-faint">
        <span>{copy.visualSystem[locale]}</span>
        <span aria-hidden className="flex items-center gap-2 whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
          {String(applications.length).padStart(2, "0")} / EDGE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
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
        "group relative min-h-0 overflow-hidden border border-ink/14 bg-night-deep",
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

      <span aria-hidden className="absolute top-0 left-0 size-3 border-t border-l border-accent/70" />
      <span
        aria-hidden
        className="absolute right-0 bottom-0 size-3 border-r border-b border-accent/40"
      />
    </figure>
  );
}
