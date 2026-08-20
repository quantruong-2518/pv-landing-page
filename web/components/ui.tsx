import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { FactStatus } from "@/content/types";

/* ── Khung chung ─────────────────────────────────────────────────────────── */

export const SHELL = "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10";

/**
 * Một khối = một màn hình. `min-h-svh` + căn giữa dọc + `snap-start`, để khi cuộn
 * người đọc luôn dừng ở đầu một khối trọn vẹn thay vì đứng giữa hai khối.
 *
 * Dùng `svh` chứ không `vh`: trên di động thanh địa chỉ co giãn làm `vh` nhảy.
 * Khối nào nội dung cao hơn màn hình vẫn tự giãn — snap để `proximity` (globals.css)
 * nên không bao giờ nhốt người đọc lại.
 */
export function Section({
  id,
  tone = "light",
  fit = true,
  className,
  children,
}: {
  id?: string;
  tone?: "light" | "dark";
  fit?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex flex-col justify-center py-20 sm:py-24",
        fit && "min-h-[calc(100svh-4rem)] snap-start",
        tone === "dark" && "tone-dark bg-bg text-fg",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Số thứ tự khối + tên khối. Giữ đúng thứ tự của docs/03-structure.md §1. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted sm:text-[0.7rem]">
      <span className="h-px w-6 bg-line-strong sm:w-8" aria-hidden />
      {children}
    </p>
  );
}

export function Heading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[1.75rem] font-semibold leading-[1.15] sm:text-4xl lg:text-[2.6rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg", className)}>
      {children}
    </p>
  );
}

/** Cụm mở đầu khối — dùng ở mọi section để nhịp mở đầu giống nhau. */
export function SectionHead({
  kicker,
  heading,
  lead,
}: {
  kicker: string;
  heading: string;
  lead: string;
}) {
  return (
    <header>
      <Kicker>{kicker}</Kicker>
      <Heading>{heading}</Heading>
      <Lead>{lead}</Lead>
    </header>
  );
}

/* ── Nút ─────────────────────────────────────────────────────────────────── */

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition-colors sm:px-6 sm:py-3.5",
        variant === "primary"
          ? "bg-primary text-primary-fg hover:opacity-90"
          : "border border-line-strong text-fg hover:bg-surface",
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ── Nhãn trạng thái bằng chứng ──────────────────────────────────────────────
   Luật số 1 của repo (CLAUDE.md §2): mọi fact kỹ thuật phải mang nhãn. Component
   bắt buộc nhận `status`, nên không thể vô tình quên. */

export function StatusBadge({
  status,
  label,
  note,
}: {
  status: FactStatus;
  label: string;
  note?: string;
}) {
  const shipped = status === "shipped";
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase leading-none tracking-[0.12em] sm:text-[0.65rem]",
        shipped ? "bg-shipped-bg text-shipped" : "bg-roadmap-bg text-roadmap",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", shipped ? "bg-shipped" : "bg-roadmap")} aria-hidden />
      {note ?? label}
    </span>
  );
}

/* ── Mảnh nhỏ dùng lại ───────────────────────────────────────────────────── */

/** Cặp nhãn/giá trị dạng bảng thông số — nhãn mono nhỏ, giá trị đọc được. */
export function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line py-3.5">
      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{label}</dt>
      <dd className="mt-1.5 text-sm leading-snug text-fg">{value}</dd>
    </div>
  );
}

export function Ordinal({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-sm font-medium tracking-[0.1em] text-accent" aria-hidden>
      {children}
    </span>
  );
}
