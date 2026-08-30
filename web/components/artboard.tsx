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
 * The canvas is the site's width standard: `--frame-max` in `globals.css` is
 * 1408px, so at and above the cap this art renders at exactly the size it was
 * drawn, and the header and the body text below it share its margins.
 *
 * **The canvas ships at 1:1 or not at all** — the `canvas:` variant defined at
 * the top of `globals.css`, which is where the reasoning and the measurements
 * live. Under that condition every section renders the responsive flow layout
 * in `components/home/flow.tsx` instead: same content, same order, type on a
 * rem scale (GM, 2026-08-30, closing `docs/05-backlog.md` #42).
 */
export const CANVAS_W = 1408;
export const CANVAS_H = 768;

/**
 * The viewport the canvas needs to render at 1:1 — `CANVAS_W` plus the widest
 * classic scrollbar, and `CANVAS_H` plus the header. These are the two numbers
 * inside the `canvas:` variant; they are exported so a reviewer measuring the
 * switch reads them from one place rather than from a media query string.
 */
export const CANVAS_MIN_VIEWPORT = { width: 1425, height: 832 };

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

/**
 * One section of HOME: a colour band spanning the viewport, with the canvas
 * centred inside it on the site frame.
 *
 * The band carries the background so that a window wider than the frame — or
 * shorter than the canvas needs — letterboxes the art in its own tone instead
 * of exposing the page canvas behind it. Geometry lives in `.artboard`
 * (globals.css), which fits the canvas to the frame and to the screen budget
 * at once.
 *
 * `flow` is the same section written as flow, shown whenever the `canvas:`
 * condition fails. Both trees are in the DOM and one is `display:none`, which
 * takes it out of the accessibility tree and stops its lazy images from
 * loading; the two share image URLs, so a shot used by both is fetched once.
 */
export function Artboard({
  id,
  className,
  flow,
  children,
}: {
  id?: string;
  className?: string;
  flow?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} data-motion-section className={cn("font-artboard relative w-full snap-start", className)}>
      {flow ? <div className="canvas:hidden">{flow}</div> : null}

      <div className={cn("artboard relative overflow-hidden", flow ? "hidden canvas:block" : undefined)}>
        {children}
      </div>
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
  reveal,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  className?: string;
  style?: CSSProperties;
  reveal?: number;
  children?: ReactNode;
}) {
  return (
    <div
      data-reveal={reveal}
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
  reveal,
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
  reveal?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag
      data-reveal={reveal}
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
  sizes,
  className,
  reveal,
}: {
  src: string;
  alt?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fit?: "contain" | "cover";
  priority?: boolean;
  sizes?: string;
  className?: string;
  reveal?: number;
}) {
  return (
    <div data-reveal={reveal} className="absolute" style={{ left: u(x), top: u(y), width: u(w), height: u(h) }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? sizeHint(w)}
        priority={priority}
        className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
      />
    </div>
  );
}
