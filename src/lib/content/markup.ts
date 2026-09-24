/**
 * Inline markup for CMS strings.
 *
 * Editable copy has to carry its own typesetting: a headline breaks and stresses
 * differently in Vietnamese, English and Korean, and the layout cannot guess
 * where. The grammar is deliberately three marks wide.
 *
 *   "\n"      a line break — one visual line per segment
 *   "*x*"     x set in the accent colour
 *   "**x**"   x set bright and semibold — the lead-in of a paragraph
 *
 * It is not Markdown and must not grow into one: anything a section needs beyond
 * these belongs in the layout, not in the string. A string with no mark renders
 * exactly as typed, which is why adding this changed no existing field.
 *
 * Emphasis is style, not content, so marking a phrase is inside the redesign's
 * remit; adding, cutting or rewording is not (CLAUDE.md § 2).
 */
export type Emphasis = "none" | "accent" | "strong";

export type MarkedSegment = { text: string; emphasis: Emphasis };

/** `**x**` first: the alternation is ordered, so the longer mark wins. */
const INLINE_MARK = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

/** One entry per visual line. A string without `\n` yields a single line. */
export function splitLines(value: string): string[] {
  return value.split("\n");
}

export function parseInline(value: string): MarkedSegment[] {
  const segments: MarkedSegment[] = [];
  let cursor = 0;

  for (const match of value.matchAll(INLINE_MARK)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      segments.push({ text: value.slice(cursor, start), emphasis: "none" });
    }
    segments.push(
      match[1] !== undefined
        ? { text: match[1], emphasis: "strong" }
        : { text: match[2], emphasis: "accent" },
    );
    cursor = start + match[0].length;
  }

  if (cursor < value.length) {
    segments.push({ text: value.slice(cursor), emphasis: "none" });
  }

  return segments;
}

/**
 * The same grammar read back out as prose. /llms.txt and any future plain-text
 * surface serve CMS copy verbatim and must not leak the marks into it.
 */
export function plainText(value: string): string {
  return value.replace(INLINE_MARK, (_match, strong, accent) => strong ?? accent).replace(/\n/g, " ");
}
