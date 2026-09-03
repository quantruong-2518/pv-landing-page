import Image from "next/image";
import type { ProductsContent } from "@/content/types";
import { Section, SHELL } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Canva artboard 1, upper half: the page opener. A full-bleed dark band with
 * the chip macro bleeding in from the right and the whole identity held in a
 * column on the left.
 *
 * This is the only `screen` block on PRODUCTS (docs/03-structure.md §3) — the
 * catalogue grid underneath it is content-height, because a six-card grid
 * inside a one-viewport block is the overflow §4b keeps warning about.
 */
export function ProductsHero({ c }: { c: ProductsContent["intro"] }) {
  return (
    <Section screen tone="dark" className="product-band overflow-hidden">
      {/* The photograph is full width and anchored right: a narrower box puts a
          vertical seam down the band exactly where it starts. */}
      {c.media.src ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src={c.media.src}
            alt={c.media.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-right"
          />
          {/* The scrim is what makes the headline legible over a photograph:
              opaque where the type sits, gone by the time it reaches the die. */}
          <span className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_88%,transparent)_48%,transparent_100%)] md:bg-[linear-gradient(90deg,var(--color-bg)_6%,color-mix(in_srgb,var(--color-bg)_62%,transparent)_46%,transparent_92%)]" />
        </div>
      ) : null}

      <div className={cn(SHELL, "relative z-[1]")}>
        <div className="max-w-[36rem] lg:max-w-[55%]">
          {c.kicker ? (
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-hardware">{c.kicker}</p>
          ) : null}
          <h1 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.12] sm:text-[2.6rem] lg:text-[3.1rem]">
            {c.title}
          </h1>
          {c.lead ? (
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg">{c.lead}</p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
