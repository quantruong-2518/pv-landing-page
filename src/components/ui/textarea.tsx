import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full resize-y border-0 bg-ink/6 px-[14px] py-3 text-[1rem] leading-[1.6] text-ink outline-none",
        "placeholder:text-dim",
        "aria-invalid:ring-2 aria-invalid:ring-accent/60",
        className,
      )}
      {...props}
    />
  );
}
