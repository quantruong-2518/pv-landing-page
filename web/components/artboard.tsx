import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { RichText } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * HOME is drawn 1:1 from the Canva master "Home - Pebble Vina", 1408 × 768 px
 * (read 2026-08-30). Canva is the source of truth for this page: every number
 * in `components/home/*` is a coordinate read off that canvas.
 *
 * `u()` converts a canvas pixel into a container-relative unit so one artboard
 * scales as a single piece at any viewport width. It is `cqw`, not `%`, because
 * the same helper has to size type, line-height and vertical offsets too, and
 * only a width-derived unit keeps all of them in proportion.
 *
 * Reflowing this for narrow viewports is a separate pass (GM: "UI/UX tối ưu sau").
 */
export const CANVAS_W = 1408;
export const CANVAS_H = 768;

export const u = (px: number) => `${((px / CANVAS_W) * 100).toFixed(4)}cqw`;

/**
 * Canva gives a run's position as the top of its text box, not of the CSS line
 * box. A line-height taller than the glyphs would therefore drop every run by
 * half the leading. `CONTENT_RATIO` is the content-box height Bricolage
 * Grotesque draws for one em, so this puts each box back on the master's line.
 */
const CONTENT_RATIO = 1.2;

const textTop = (y: number, size: number, leading?: number) =>
  leading === undefined ? y : y - (leading - CONTENT_RATIO * size) / 2;

/** Viewport share an image occupies, so `next/image` picks a sane srcset entry. */
const sizeHint = (w: number) => `${Math.min(100, Math.ceil((w / CANVAS_W) * 100))}vw`;

export function Artboard({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("font-artboard relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}`, containerType: "inline-size" }}
    >
      {children}
    </section>
  );
}

/** A box placed on the canvas. Everything else composes from this. */
export function Abs({
  x,
  y,
  w,
  h,
  className,
  style,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        left: u(x),
        top: u(y),
        width: w === undefined ? undefined : u(w),
        height: h === undefined ? undefined : u(h),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * A text run. Geometry comes from the canvas; colour comes from `className`
 * so it stays on a token (CLAUDE.md §3) instead of an inline hex.
 */
export function Txt({
  as: Tag = "div",
  x,
  y,
  w,
  size,
  weight = 400,
  leading,
  tracking,
  uppercase,
  className,
  style,
  children,
}: {
  as?: "div" | "p" | "h1" | "h2" | "h3";
  x: number;
  y: number;
  w?: number;
  size: number;
  weight?: number;
  leading?: number;
  tracking?: number;
  uppercase?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn("absolute", uppercase && "uppercase", className)}
      style={{
        left: u(x),
        top: u(textTop(y, size, leading)),
        width: w === undefined ? undefined : u(w),
        fontSize: u(size),
        fontWeight: weight,
        lineHeight: leading === undefined ? undefined : u(leading),
        letterSpacing: tracking === undefined ? undefined : u(tracking),
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * A line whose accented runs the design colours differently — "PIM" inside a
 * question, "đột phá" at the end of an invitation. `accent` is the class those
 * runs get, so the colour stays a token and the content stays plain text.
 */
export function Rich({ value, accent }: { value: RichText; accent: string }) {
  return (
    <>
      {value.map((run) => (
        <span key={run.text} className={run.accent ? accent : undefined}>
          {run.text}
        </span>
      ))}
    </>
  );
}

/** A canvas image. `fit` mirrors how Canva placed it: contain by default. */
export function Img({
  src,
  alt = "",
  x,
  y,
  w,
  h,
  fit = "contain",
  priority,
  className,
}: {
  src: string;
  alt?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fit?: "contain" | "cover";
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className="absolute" style={{ left: u(x), top: u(y), width: u(w), height: u(h) }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizeHint(w)}
        priority={priority}
        className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
      />
    </div>
  );
}
