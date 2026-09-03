import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * The mono, uppercase, letter-spaced label above every field in the design —
 * public contact form and CMS alike. A real `<label>`, so tapping it focuses
 * the control; `htmlFor` is required rather than optional for that reason.
 */
export function FieldLabel({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("font-mono text-label text-muted", className)} {...props} />;
}
