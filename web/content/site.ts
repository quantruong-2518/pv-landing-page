/**
 * Language-independent constants: legal entity, contact, technology partner.
 * Figures come from docs/01-proof-bank.md §A and §D — do not edit here alone.
 */
export const SITE = {
  name: "Pebble Vina",
  legalName: "CÔNG TY TNHH PEBBLE VINA",
  /**
   * The English name on the same business registration, not a translation made
   * here — both appear in docs/01-proof-bank.md §F. Structured data only: the
   * page itself is Vietnamese and renders `legalName`.
   */
  legalNameEn: "PEBBLE VINA COMPANY LIMITED",
  taxId: "0111545175",
  /** The lab has no domain of its own; the main site is pebblevina.com — same domain as the contact email below. */
  url: "https://pebblevina.com",
  office: "Văn phòng O1912, Tầng 19, Landmark 72 Tower, Khu E6, Khu đô thị mới Cầu Giấy, P. Yên Hoà, Hà Nội",
  contact: {
    email: "contact@pebblevina.com",
    phone: "0345 913 369",
    phoneHref: "tel:+84345913369",
  },
  /** Technology partner, not a parent company or owner of Pebble Vina. */
  partner: {
    name: "Pebble Square Inc.",
    url: "https://www.pebble-square.com",
    businessLicense: "879-88-02299",
    city: "Seongnam, Hàn Quốc",
  },
} as const;


export const MAIL_HREF = `mailto:${SITE.contact.email}`;
