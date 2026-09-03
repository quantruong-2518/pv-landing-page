"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Square checkbox — the CMS "show this section" toggle. Radix supplies the
 * keyboard and ARIA behaviour; the look is a plain 18px accent box, matching
 * `accent-color: #4E92FF` in the mock.
 */
export function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "size-[18px] shrink-0 border border-ink/28 bg-field transition-colors",
        "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-night">
        {/* Inline rather than an icon package: one 14px tick is not worth a
            dependency, and this ships zero extra bytes of JavaScript. */}
        <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="none">
          <path
            d="M4 12.5 9.5 18 20 6.5"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="square"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
