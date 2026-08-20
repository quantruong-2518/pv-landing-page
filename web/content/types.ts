/**
 * Hình dạng nội dung landing. `en.ts` (canonical) và `vi.ts` cùng khớp `LandingContent`,
 * nên thêm field một bên mà quên bên kia thì `tsc` gãy — đó là chủ ý (CLAUDE.md §3).
 *
 * Thứ tự field trong interface = thứ tự khối trên trang, đi từ quan trọng xuống
 * (docs/03-structure.md §1). Đừng sắp xếp lại cho "gọn".
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

export interface NumberedItem {
  no: string;
  title: string;
  body: string;
}

export interface Pillar {
  title: string;
  body: string;
}

export interface StatItem {
  value: string;
  unit?: string;
  label: string;
  /** Đo cái gì, so với cái gì — kỹ sư đọc dòng này trước cả con số. */
  note: string;
  source: string;
  status: FactStatus;
  statusNote?: string;
}

/** Một thị trường Pebble Square đã đặt chân — khối trả lời "họ đã làm gì ở đâu". */
export interface Market {
  region: string;
  org: string;
  period: string;
  body: string;
  status: FactStatus;
  statusNote?: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  status: FactStatus;
  statusNote?: string;
  /** Mốc được nhấn — 4 mốc đắt nhất theo docs/02-message-map.md §2. */
  starred?: boolean;
}

/** Một tầng trong danh mục sản phẩm — giữ đúng 3 tầng của pebble-square.com/en/page/21. */
export interface ProductLayer {
  name: string;
  tagline: string;
  body: string;
  /** Tên sản phẩm/chip cụ thể, dòng mono dưới cùng thẻ. */
  items: string;
  status: FactStatus;
  statusNote?: string;
}

export interface Person {
  name: string;
  role: string;
  credential: string;
}

export interface Office {
  label: string;
  org: string;
  address: string;
  status: FactStatus;
}

/** `ps` = lĩnh vực Pebble Square tự công bố · `pv` = lớp Pebble Vina dựng thêm tại VN. */
export type DomainOrigin = "ps" | "pv";

export interface Domain {
  title: string;
  body: string;
  origin: DomainOrigin;
}

export interface Step extends NumberedItem {
  deliverable: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LandingContent {
  locale: "en" | "vi";
  /** Đường sang bản ngôn ngữ kia. */
  alternate: { href: string; label: string; hrefLang: string };
  meta: { title: string; description: string };

  nav: { links: NavLink[]; cta: string; menuLabel: string };

  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    trust: TrustItem[];
    scrollHint: string;
  };

  /** 01 — vì sao là lúc này. Khối quan trọng nhất sau hero. */
  whyNow: {
    kicker: string;
    heading: string;
    lead: string;
    points: NumberedItem[];
    pillarsTitle: string;
    pillars: Pillar[];
  };

  /** Dải con số — chứng minh bài toán ở whyNow đã có lời giải đo được. */
  stats: { kicker: string; heading: string; lead: string; items: StatItem[]; legend: string };

  /** 02 — họ đã làm gì ở các thị trường đã có mặt. */
  track: { kicker: string; heading: string; lead: string; markets: Market[] };

  timeline: { kicker: string; heading: string; lead: string; items: TimelineItem[]; footnote: string };

  /** 03 — sản phẩm của họ. */
  products: {
    kicker: string;
    heading: string;
    lead: string;
    plain: string;
    layers: ProductLayer[];
  };

  /** 04 — họ là ai, ai lập. */
  team: {
    kicker: string;
    heading: string;
    lead: string;
    people: Person[];
    backingTitle: string;
    backing: TrustItem[];
  };

  /** 05 — họ ở đâu. */
  places: { kicker: string; heading: string; lead: string; offices: Office[] };

  /** 06 — các domain họ đã giải trên toàn cầu. */
  domains: {
    kicker: string;
    heading: string;
    lead: string;
    items: Domain[];
    legend: Record<DomainOrigin, string>;
  };

  /** 07 — phần Việt Nam. */
  local: {
    kicker: string;
    heading: string;
    lead: string;
    items: NumberedItem[];
    punch: string;
    cta: string;
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
    navTitle: string;
    contactTitle: string;
    legalTitle: string;
    legalLabel: string;
    taxLabel: string;
    addressLabel: string;
    parentLabel: string;
    statusLegend: string;
    disclaimer: string;
    copyright: string;
  };

  statusLabel: Record<FactStatus, string>;
}
