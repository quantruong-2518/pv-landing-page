/**
 * Language-independent constants: legal entity, contact, parent company.
 * Figures come from docs/01-proof-bank.md §A and §D — do not edit here alone.
 */
export const SITE = {
  name: "Pebble Vina",
  legalName: "PEBBLE VINA COMPANY LIMITED",
  legalNameVi: "CÔNG TY TNHH PEBBLE VINA",
  taxId: "0111545175",
  /** The lab has no domain of its own; the main site is pebblevina.vn. */
  url: "https://pebblevina.vn",
  office: {
    vi: "Văn phòng O1912, Tầng 19, Landmark 72 Tower, Khu E6, Khu đô thị mới Cầu Giấy, P. Yên Hoà, Hà Nội",
    en: "Suite O1912, 19th Floor, Landmark 72 Tower, E6 Block, Cau Giay New Urban Area, Yen Hoa Ward, Hanoi, Vietnam",
  },
  contact: {
    email: "contact@pebblevina.com",
    phone: "0345 913 369",
    phoneHref: "tel:+84345913369",
  },
  /**
   * Source: pebble-square.com (read 2026-08-20) — every line here is theirs, published.
   * Only what the site actually renders lives here; the full parent-company record
   * (CEO, phone, full address) is in docs/01-proof-bank.md §A.
   */
  parent: {
    name: "Pebble Square Inc.",
    url: "https://www.pebble-square.com",
    businessLicense: "879-88-02299",
    city: { en: "Seongnam, Korea", vi: "Seongnam, Hàn Quốc" },
  },
} as const;

/** Conversion target. No real form in this lab — go straight to email (docs/00-brief.md). */
export const CTA_HREF = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
  "Consultation request — Pebble Vina",
)}`;

export const MAIL_HREF = `mailto:${SITE.contact.email}`;
