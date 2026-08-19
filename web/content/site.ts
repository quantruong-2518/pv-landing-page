/**
 * Hằng số không phụ thuộc ngôn ngữ: pháp nhân, liên hệ, công ty mẹ.
 * Số liệu lấy từ docs/01-proof-bank.md §D — không sửa ở đây mà không sửa ở đó.
 */
export const SITE = {
  name: "Pebble Vina",
  legalName: "CÔNG TY TNHH PEBBLE VINA",
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
  parent: {
    name: "Pebble Square Inc.",
    nameKo: "페블스퀘어",
    url: "https://www.pebble-square.com",
    hq: "Seongnam, Gyeonggi-do, Hàn Quốc",
    hqEn: "Seongnam, Gyeonggi-do, South Korea",
    founded: "09/2021",
  },
} as const;

/** Đích chuyển đổi. Chưa có form thật ở lab này — đi thẳng vào email (docs/00-brief.md §Phạm vi). */
export const CTA_HREF = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
  "Đặt lịch tư vấn 30 phút — Pebble Vina",
)}`;

/** Lối chuyển đổi thứ hai. Chờ file PDF từ GM — xem docs/05-backlog.md #6. */
export const PROFILE_HREF = "#lien-he";
