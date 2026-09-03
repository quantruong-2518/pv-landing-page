import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Text input. 16px on purpose: anything smaller makes iOS Safari zoom the
 * viewport on focus, which throws the whole layout sideways mid-form.
 *
 * Two surfaces exist in the design — a translucent wash on the public contact
 * form and a solid `--color-field` box in the CMS — so the background is left
 * to the caller via `className`.
 */
export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full border-0 bg-ink/6 px-[14px] py-3 text-[1rem] text-ink outline-none",
        "placeholder:text-dim",
        "aria-invalid:ring-2 aria-invalid:ring-accent/60",
        className,
      )}
      {...props}
    />
  );
}
