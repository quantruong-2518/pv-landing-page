import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Multi-line twin of `Input` — same resting, focus and invalid rules; see the
 *  reasoning and the measured ratios in `input.tsx`. */
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full resize-y border-b border-ink/28 bg-ink/6 px-[14px] py-3 text-[1rem] leading-[1.6] text-ink",
        "placeholder:text-muted",
        "transition-colors hover:bg-ink/10",
        "focus-visible:border-accent focus-visible:bg-ink/10",
        "aria-invalid:border-accent-hover",
        className,
      )}
      {...props}
    />
  );
}
