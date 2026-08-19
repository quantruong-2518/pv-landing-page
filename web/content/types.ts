/**
 * Hình dạng nội dung của landing. `vi.ts` và `en.ts` cùng khớp `LandingContent`,
 * nên thêm field một bên mà quên bên kia thì `tsc` gãy — đó là chủ ý (CLAUDE.md §3).
 */

/** Nhãn bằng chứng — luật số 1 của repo (docs/01-proof-bank.md). */
export type FactStatus = "shipped" | "roadmap";

export interface NavLink {
  label: string;
  href: string;
}

export interface TrustItem {
  label: string;
  value: string;
}

export interface StatItem {
  value: string;
  unit?: string;
  label: string;
  /** Nói rõ đo cái gì, so với cái gì — kỹ sư đọc dòng này trước cả con số. */
  note: string;
  source: string;
  status: FactStatus;
  /** Chỉ hiện khi status = roadmap. Ví dụ: "Dự kiến 9/2026". */
  statusNote?: string;
}

export interface NumberedItem {
  no: string;
  title: string;
  body: string;
}

export interface TechBranch {
  name: string;
  arch: string;
  body: string;
  chips: string;
  status: FactStatus;
  statusNote?: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  body: string;
  status: FactStatus;
  statusNote?: string;
  /** Mốc được nhấn — 4 mốc đắt nhất theo docs/02-message-map.md §2. */
  starred?: boolean;
}

/** `ps` = năng lực sẵn có của Pebble Square · `pv` = lớp ứng dụng Pebble Vina dựng thêm. */
export type UseCaseOrigin = "ps" | "pv";

export interface UseCase {
  title: string;
  body: string;
  origin: UseCaseOrigin;
}

export interface Step extends NumberedItem {
  deliverable: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LandingContent {
  locale: "vi" | "en";
  /** Đường dẫn sang bản ngôn ngữ kia + nhãn nút. */
  alternate: { href: string; label: string; hrefLang: string };
  meta: { title: string; description: string };

  nav: { links: NavLink[]; cta: string };

  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: TrustItem[];
  };

  proof: {
    kicker: string;
    heading: string;
    lead: string;
    parent: {
      name: string;
      role: string;
      facts: TrustItem[];
      href: string;
      hrefLabel: string;
    };
  };

  stats: { kicker: string; heading: string; lead: string; items: StatItem[]; legend: string };

  problem: { kicker: string; heading: string; lead: string; items: NumberedItem[] };

  tech: {
    kicker: string;
    heading: string;
    lead: string;
    plainEnglish: string;
    branches: TechBranch[];
    pillars: NumberedItem[];
  };

  timeline: {
    kicker: string;
    heading: string;
    lead: string;
    items: TimelineItem[];
    footnote: string;
  };

  local: {
    kicker: string;
    heading: string;
    lead: string;
    items: NumberedItem[];
    punch: string;
    cta: string;
  };

  useCases: {
    kicker: string;
    heading: string;
    lead: string;
    items: UseCase[];
    legend: Record<UseCaseOrigin, string>;
  };

  start: { kicker: string; heading: string; lead: string; steps: Step[]; note: string };

  faq: { kicker: string; heading: string; lead: string; items: FaqItem[] };

  cta: {
    heading: string;
    lead: string;
    primary: string;
    secondary: string;
    contactLabel: string;
  };

  footer: {
    tagline: string;
    legalLabel: string;
    taxLabel: string;
    addressLabel: string;
    contactLabel: string;
    parentLabel: string;
    statusLegend: string;
    disclaimer: string;
  };

  statusLabel: Record<FactStatus, string>;
}
