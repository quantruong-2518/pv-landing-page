import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui `Button` — same API (`asChild`, `variant`, `size`), restyled onto
 * the Pebble Vina tokens rather than shadcn's default theme.
 *
 * The design has exactly three button treatments and no rounded corners:
 *  - `primary`  solid accent on near-black text — one per screen, the real CTA
 *  - `ghost`    accent hairline over an accent wash, fills solid on hover
 *  - `outline`  neutral hairline, used for destructive-adjacent actions in the CMS
 *
 * `ghost` used to be the mock's `rgba(232,237,247,0.08)` wash and nothing else.
 * Measured, that wash is a 1.14:1 step against `night-deep` and 1.24:1 against
 * `navy-lit` — below the 3:1 WCAG 1.4.11 asks of a control's boundary by a wide
 * margin, and on /products the "register for a consultation" CTA read as a grey
 * smudge (bio/masthead.tsx had already documented this and routed around it).
 * No wash reaches 3:1 without turning into a grey slab, so the boundary is now
 * an `accent` hairline: 6.6:1 on `night`/`night-deep`, 6.1:1 on `navy`, 5.4:1 on
 * `navy-lit`. Hollow-with-a-tint against `primary`'s solid block is what still
 * reads as secondary, and hover fills it exactly as before.
 *
 * Every variant carries a border — `primary` a transparent one — so the four
 * are interchangeable at identical box metrics. The consent banner depends on
 * that: its reject and accept buttons must be the same size (see its doc
 * comment), and they are different variants.
 *
 * `mono` is a modifier rather than a variant because it cuts across all three:
 * every uppercase letter-spaced label in the design is set in JetBrains Mono.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border border-transparent bg-accent text-night font-semibold hover:bg-accent-hover",
        ghost: "border border-accent bg-accent/10 text-ink hover:bg-accent hover:text-night",
        outline: "border border-ink/28 text-ink hover:border-accent hover:text-accent",
        bare: "border border-transparent text-muted hover:text-accent",
      },
      size: {
        sm: "px-[13px] py-[7px] text-label",
        md: "px-[22px] py-[14px] text-[0.75rem] tracking-[0.11em]",
        lg: "px-6 py-[15px] text-[0.8125rem] tracking-[0.12em]",
        xl: "px-8 py-[17px] text-[0.875rem] tracking-[0.1em]",
        none: "",
      },
      mono: {
        true: "font-mono font-medium",
        false: "font-sans",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      mono: true,
    },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render as the single child element — used for links styled as buttons. */
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  mono,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size, mono }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
