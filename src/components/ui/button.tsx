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
 *  - `ghost`    barely-there white wash that fills with accent on hover
 *  - `outline`  hairline border, used for destructive-adjacent actions in the CMS
 *
 * `mono` is a modifier rather than a variant because it cuts across all three:
 * every uppercase letter-spaced label in the design is set in JetBrains Mono.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-night font-semibold hover:bg-accent-hover",
        ghost: "bg-ink/8 text-ink hover:bg-accent hover:text-night",
        outline: "border border-ink/28 text-ink hover:border-accent hover:text-accent",
        bare: "text-muted hover:text-accent",
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
