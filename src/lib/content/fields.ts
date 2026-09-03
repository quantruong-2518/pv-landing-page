import type { ContentPageId } from "@/lib/content/schema";

/**
 * How the admin panel renders each editable field.
 *
 * Labels and hints are the Vietnamese ones from the handoff's `SCHEMA` — the
 * CMS is an internal tool for a Vietnamese team, so it is not localised.
 * `kind: "localized"` marks a field that must be filled in for every locale;
 * the editor shows one input per language for those.
 */
export type FieldType = "text" | "area" | "number" | "image";

export interface FieldDescriptor {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  /** Only localized fields get a per-language input. */
  localized: boolean;
  /** Crop guidance shown under an image picker. */
  fit?: string;
}

export interface SectionDescriptor {
  id: string;
  label: string;
  fields: FieldDescriptor[];
}

export interface PageDescriptor {
  id: ContentPageId;
  label: string;
  sections: SectionDescriptor[];
}

const text = (key: string, label: string, hint = ""): FieldDescriptor => ({
  key,
  label,
  type: "text",
  hint,
  localized: true,
});

const area = (key: string, label: string, hint = ""): FieldDescriptor => ({
  key,
  label,
  type: "area",
  hint,
  localized: true,
});

const number = (key: string, label: string, hint = ""): FieldDescriptor => ({
  key,
  label,
  type: "number",
  hint,
  localized: false,
});

const img = (key: string, label: string, hint: string, fit: string): FieldDescriptor => ({
  key,
  label,
  type: "image",
  hint,
  localized: false,
  fit,
});

/** Plain (non-localized) short text — a figure such as "400K". */
const raw = (key: string, label: string, hint = ""): FieldDescriptor => ({
  key,
  label,
  type: "text",
  hint,
  localized: false,
});

export const CONTENT_PAGES: PageDescriptor[] = [
  {
    id: "home",
    label: "Trang chủ",
    sections: [
      {
        id: "hero",
        label: "Hero",
        fields: [
          text("eyebrow", "EYEBROW", "Dòng mono nhỏ phía trên tiêu đề"),
          area("title", "TIÊU ĐỀ", "Chữ hoa, 2–3 dòng là vừa"),
          area("lead", "MÔ TẢ CHÍNH", "Cột trái, chữ sáng"),
          area("sub", "MÔ TẢ PHỤ", "Cột giữa, chữ nhạt hơn"),
          text("cta", "NHÃN CTA"),
          img("image", "ẢNH NỀN", "Tràn toàn khung, cắt theo cover", "cover — tràn viền, cắt phần thừa"),
        ],
      },
      {
        id: "marquee",
        label: "Thanh chạy chữ",
        fields: [area("items", "NỘI DUNG", "Mỗi mục cách nhau bằng dấu ·")],
      },
      {
        id: "pim",
        label: "01 · Công nghệ PIM",
        fields: [
          text("eyebrow", "EYEBROW"),
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          img("imageA", "ẢNH ANALOG", "Cột trái", "cover 16:9 — vignette tròn"),
          img("imageB", "ẢNH DIGITAL", "Cột phải", "cover 16:9 — vignette tròn"),
          text("statement", "CÂU CHỐT"),
          img("imageC", "ẢNH CHIP PIM", "PNG nền trong suốt", "PNG trong suốt, không khung"),
        ],
      },
      {
        id: "why",
        label: "02 · Tại sao PIM",
        fields: [
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          img("image", "ẢNH NỀN", "Ảnh nền dải ngang", "cover — nằm dưới gradient tối"),
        ],
      },
      {
        id: "core",
        label: "03 · Năng lực cốt lõi",
        fields: [
          text("eyebrow", "EYEBROW"),
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          raw("stat", "SỐ LIỆU NHẤN", "Ví dụ: 400K"),
        ],
      },
      {
        id: "solutions",
        label: "04 · Giải pháp",
        fields: [
          text("eyebrow", "EYEBROW"),
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          number("count", "SỐ HÀNG HIỂN THỊ", "Tối đa 4"),
        ],
      },
      {
        id: "news",
        label: "05 · Tin tức",
        fields: [
          text("eyebrow", "EYEBROW"),
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          number("count", "SỐ TIN HIỂN THỊ", "Tối đa 4"),
          img("image1", "ẢNH TIN 1", "", "cover 16:9"),
          img("image2", "ẢNH TIN 2", "", "cover 16:9"),
          img("image3", "ẢNH TIN 3", "", "cover 16:9"),
          img("image4", "ẢNH TIN 4", "", "cover 16:9"),
        ],
      },
      {
        id: "contact",
        label: "06 · Liên hệ",
        fields: [
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          text("cta", "NHÃN NÚT GỬI"),
          area("note", "GHI CHÚ BẢO MẬT"),
          img("image", "ẢNH NỀN CỘT TRÁI", "Nằm dưới lớp scrim navy", "cover — ảnh nền, có scrim"),
        ],
      },
    ],
  },
  {
    id: "product",
    label: "Sản phẩm",
    sections: [
      {
        id: "catalog",
        label: "Danh mục",
        fields: [
          text("eyebrow", "EYEBROW"),
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          text("hint", "GỢI Ý THAO TÁC"),
        ],
      },
      {
        id: "mint",
        label: "01 · MINT",
        fields: [
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          img("image", "ẢNH SẢN PHẨM", "", "contain 16:9 — thấy trọn chip"),
        ],
      },
      {
        id: "papaya",
        label: "02 · PAPAYA / FLEX",
        fields: [
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          img("image", "ẢNH SẢN PHẨM", "", "contain 16:9"),
        ],
      },
      {
        id: "espresso",
        label: "03 · ESPRESSO",
        fields: [
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          img("image", "ẢNH SẢN PHẨM", "", "contain 16:9"),
        ],
      },
      {
        id: "eseries",
        label: "04 · E-Series",
        fields: [
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          img("image", "ẢNH CARD", "", "contain 16:9"),
        ],
      },
      {
        id: "software",
        label: "05 · Phần mềm",
        fields: [
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          number("progress", "TIẾN ĐỘ (%)", "1–100"),
          img("image", "ẢNH DASHBOARD", "", "cover — ảnh nền, có gradient"),
        ],
      },
      {
        id: "training",
        label: "06 · Đào tạo AI",
        fields: [
          area("title", "TIÊU ĐỀ"),
          area("lead", "MÔ TẢ"),
          img("image", "ẢNH LỚP HỌC", "", "cover — ảnh nền, có gradient"),
        ],
      },
      {
        id: "contact",
        label: "07 · Liên hệ",
        fields: [area("title", "TIÊU ĐỀ"), area("lead", "MÔ TẢ"), text("cta", "NHÃN CTA")],
      },
    ],
  },
];

/**
 * Quick-pick list in the image field — every asset shipped with the handoff.
 * Uploading is a separate action to add later; this list stays either way so
 * an image already used elsewhere on the site is one click away.
 */
export const ASSETS = [
  "/images/chip-hero.png",
  "/images/npu-dram.png",
  "/images/pim-chip.png",
  "/images/chip-analog.png",
  "/images/chip-digital.png",
  "/images/hq-building.png",
  "/images/bg-web.png",
  "/images/news-1.png",
  "/images/news-2.png",
  "/images/news-3.png",
  "/images/news-4.png",
  "/images/pd-mint.png",
  "/images/pd-papaya.png",
  "/images/pd-espresso.png",
  "/images/pd-eseries.png",
  "/images/pd-software.png",
  "/images/pd-training.png",
] as const;

export function findPage(id: string): PageDescriptor | undefined {
  return CONTENT_PAGES.find((page) => page.id === id);
}
