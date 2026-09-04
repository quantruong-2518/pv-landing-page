import Link from "next/link";
import type { ReactNode } from "react";

import { ProductKicker, VignetteImage } from "@/components/site/primitives";
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
  apps,
  showCta = true,
  aside,
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
  apps?: readonly string[];
  showCta?: boolean;
  /** Extra content in the right-hand column, under the render. */
  aside?: ReactNode;
  /** Extra content in the left-hand column, between the copy and the CTA. */
  beforeCta?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} className={cn("py-section-lg", className)}>
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
              {apps.map((app, index) => (
                <span key={app} className="flex items-center gap-x-5">
                  {index > 0 ? (
                    <span aria-hidden className="text-rule">
                      /
                    </span>
                  ) : null}
                  <span className="text-[0.9375rem] text-contact">{app}</span>
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
          {image ? (
            <VignetteImage
              src={image.src}
              alt={image.alt}
              fit="contain"
              sizes="(max-width: 1023px) 94vw, 46vw"
              className="max-w-[clamp(320px,42vw,560px)] drop-shadow-[0_0_34px_rgba(0,174,255,0.22)] lg:ml-auto"
            />
          ) : null}
          {aside}
        </div>
      </div>

      {children}
    </Section>
  );
}

/** `THÔNG SỐ CHÍNH` / a product name above a spec row. */
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
    <div className={cn("flex flex-wrap items-baseline gap-4 pt-4", className)}>
      {name ? (
        <span className="font-heading text-[clamp(1.25rem,1.8vw,1.625rem)] tracking-[0.04em]">
          {name}
        </span>
      ) : null}
      <span className="font-mono text-label whitespace-nowrap text-faint">{label}</span>
    </div>
  );
}
