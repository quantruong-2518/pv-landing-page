import Link from "next/link";
import type { ReactNode } from "react";

import { GroupRule, ProductKicker, VignetteImage } from "@/components/site/primitives";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { anchor, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * The shell every hardware section on the product page shares: status kicker,
 * two columns of copy and render, then whatever spec blocks the part needs.
 *
 * MINT, PAPAYA, ESPRESSO and E-Series differ only in what goes under that —
 * one spec row, two, an application matrix — which is why the specifics arrive
 * as `children` rather than as a growing list of booleans.
 */
export function ProductDetail({
  id,
  locale,
  kicker,
  meta,
  title,
  lead,
  image,
  media,
  apps,
  showCta = true,
  beforeCta,
  className,
  children,
}: {
  id: string;
  locale: Locale;
  kicker: string;
  meta: string;
  title: string;
  lead: string;
  /** Omitted when the block renders its own imagery (E-Series sub-cards). */
  image?: { src: string; alt: string };
  /** A richer visual system (for example, chip + application bento). */
  media?: ReactNode;
  apps?: readonly string[];
  showCta?: boolean;
  /** Extra content in the left-hand column, between the copy and the CTA. */
  beforeCta?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const headingId = `${id}-title`;

  return (
    <Section
      id={id}
      labelledBy={headingId}
      screen
      spend="between"
      className={cn("py-section-lg", className)}
    >
      <ProductKicker label={kicker} meta={meta} />

      <div className="grid items-start gap-[clamp(26px,3vw,52px)] gap-x-col pt-[clamp(22px,2.4vw,36px)] lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h2 id={headingId} className="font-heading text-h2-detail text-balance">
            {title}
          </h2>
          <p className="max-w-[58ch] text-lead text-body">{lead}</p>

          {apps?.length ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-5">
              <span className="font-mono text-label whitespace-nowrap text-faint">
                {dictionary.product.shared.applications[locale]}
              </span>
              {/* The separator trails its tag instead of leading the next one.
                  Bound the other way it wrapped with the word that followed it,
                  so E-Series' five-tag row opened line 2 with an orphaned "/".
                  `text-faint`, not the `--color-rule` the token table names for
                  this: #2A3550 measured 1.66:1 on night-deep and #5C6980 3.34:1
                  — present in the DOM, invisible on the screen. #7C8AA3 reaches
                  5.3:1 and still sits well under the `text-contact` it divides.
                  Sized with the tags so the rule shares their line box. */}
              {apps.map((app, index) => (
                <span key={app} className="flex items-center gap-x-5">
                  <span className="text-card text-contact">{app}</span>
                  {index < apps.length - 1 ? (
                    <span aria-hidden className="text-card text-faint">
                      /
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          ) : null}

          {beforeCta}

          {showCta ? (
            <Button asChild variant="ghost" size="md" className="self-start">
              <Link href={anchor(routes.anchors.contact)}>
                {dictionary.product.shared.consult[locale]}
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          {media}
          {!media && image ? (
            <VignetteImage
              src={image.src}
              alt={image.alt}
              fit="contain"
              sizes="(max-width: 1023px) 94vw, 46vw"
              className="product-chrome-art lg:ml-auto"
            />
          ) : null}
        </div>
      </div>

      {children}
    </Section>
  );
}

/**
 * `THÔNG SỐ CHÍNH` / a product name above a spec row.
 *
 * A thin wrapper over `GroupRule` rather than its own layout: a spec row is the
 * commonest "second kind of content inside a section" on this page, so it opens
 * with the same hairline every other group does. The two slots swap by whether
 * there is a wordmark — with a `name` the label is the qualifier under it
 * ("PAPAYA FLEX" · MACHINE VISION BENCHMARK), without one the label *is* the
 * group's name and is set in accent like the catalogue's group heads.
 */
export function SpecHeading({
  name,
  label,
  className,
}: {
  name?: string;
  label: string;
  className?: string;
}) {
  return (
    <GroupRule
      name={name}
      label={name ? undefined : label}
      meta={name ? label : undefined}
      className={className}
    />
  );
}
