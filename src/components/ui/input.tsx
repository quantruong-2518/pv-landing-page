import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Text input. 16px on purpose: anything smaller makes iOS Safari zoom the
 * viewport on focus, which throws the whole layout sideways mid-form.
 *
 * Two surfaces exist in the design — a translucent wash on the public contact
 * form and a solid `--color-field` box in the CMS — so the background is left
 * to the caller via `className`.
 *
 * The mock (design-refs/Pebble Vina Home.dc.html, the contact `<form>`) sets
 * `background:rgba(232,237,247,0.06); border:0; outline:none`. The wash stays —
 * the field is borderless by intent — but the other two are corrected here:
 *
 *  - `outline:none` removed. Tailwind emits it in the utilities layer, which
 *    outranks the `:focus-visible { outline: 2px solid accent }` rule the base
 *    layer carries, so every field on the site had *no* focus indicator at all
 *    (WCAG 2.4.7). Handoff §6 asks for exactly that outline; deleting one class
 *    gives it back. `focus-visible:` also brightens the wash, so the focused
 *    field is obvious at a glance and not only at its edge.
 *  - A bottom hairline. The 6% wash is a 1.16:1 step against `navy-lit` and
 *    1.15:1 against `field`, i.e. the field has no findable edge. `ink/28` is
 *    the strongest hairline CLAUDE.md §3 allows and reaches 2.31:1 — short of
 *    3:1, but the difference between an invisible box and a visible baseline.
 *    A full border would contradict the mock; a bottom rule does not.
 *
 * Placeholders move from `--color-dim` (2.57:1 on the public form) to
 * `--color-muted` (5.54:1). The mono field label above every input is what
 * keeps a placeholder from reading as a filled value.
 *
 * The invalid state was a `ring-2`, which Tailwind emits as a `box-shadow` —
 * the one thing CLAUDE.md §3 forbids outright. It is the bottom rule now, in
 * the same `accent-hover` the error message under the field already uses.
 */
export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full border-b border-ink/28 bg-ink/6 px-[14px] py-3 text-[1rem] text-ink",
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
