/**
 * Hằng số không phụ thuộc ngôn ngữ: pháp nhân, liên hệ, công ty mẹ.
 * Số liệu lấy từ docs/01-proof-bank.md §A và §D — không sửa ở đây mà không sửa ở đó.
 */
export const SITE = {
  name: "Pebble Vina",
  legalName: "PEBBLE VINA COMPANY LIMITED",
  legalNameVi: "CÔNG TY TNHH PEBBLE VINA",
  taxId: "0111545175",
  /** Lab chưa có domain riêng; site chính là pebblevina.vn. */
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
  /** Nguồn: pebble-square.com (đọc 2026-08-20) — mọi dòng ở đây họ tự công bố. */
  parent: {
    name: "Pebble Square Inc.",
    url: "https://www.pebble-square.com",
    ceo: "ChoongHyun Lee",
    businessLicense: "879-88-02299",
    founded: "September 2021",
    phone: "+82-31-702-7378",
    email: "info@pebble-square.com",
    address:
      "331, 402 Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea (ABN Tower, Sampyeong-dong)",
    city: { en: "Seongnam, Korea", vi: "Seongnam, Hàn Quốc" },
  },
} as const;

/** Đích chuyển đổi. Chưa có form thật ở lab này — đi thẳng vào email (docs/00-brief.md). */
export const CTA_HREF = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
  "Consultation request — Pebble Vina",
)}`;

export const MAIL_HREF = `mailto:${SITE.contact.email}`;
