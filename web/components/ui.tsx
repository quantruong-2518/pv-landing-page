import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { FactStatus } from "@/content/types";

/* ── Khung chung ─────────────────────────────────────────────────────────── */

export const SHELL = "mx-auto w-full max-w-6xl px-6 lg:px-10";

export function Section({
  id,
  tone = "light",
  className,
  children,
}: {
  id?: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 py-20 lg:py-28",
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
    <p className="mb-5 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
      <span className="h-px w-8 bg-line-strong" aria-hidden />
      {children}
    </p>
  );
}

export function Heading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[2.75rem]", className)}>
      {children}
    </h2>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-5 max-w-2xl text-lg leading-relaxed text-muted", className)}>{children}</p>;
}

/* ── Nút ─────────────────────────────────────────────────────────────────── */

export function Button({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center rounded-sm px-6 py-3.5 text-sm font-medium tracking-wide transition-colors";
  return (
    <a
      href={href}
      className={cn(
        base,
        variant === "primary"
          ? "bg-primary text-primary-fg hover:opacity-90"
          : "border border-line-strong text-fg hover:bg-surface",
      )}
    >
      {children}
    </a>
  );
}

/* ── Nhãn trạng thái bằng chứng ──────────────────────────────────────────────
   Luật số 1 của repo (CLAUDE.md §2): mọi fact kỹ thuật phải mang nhãn. Component
   này bắt buộc nhận `status`, nên không thể vô tình quên. */

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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em]",
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
    <div className="border-t border-line py-4">
      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">{label}</dt>
      <dd className="mt-1.5 text-[0.95rem] leading-snug text-fg">{value}</dd>
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
