# Pebble Vina — website + CMS

Trang công khai song ngữ của Pebble Vina (chip bán dẫn tích hợp AI ngoại biên, công nghệ
Processing-in-Memory) và CMS nội bộ để sửa nội dung từng section.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 ·
motion · Zustand · TanStack Query · Zod + React Hook Form · pnpm.

## Chạy

```bash
pnpm install
pnpm dev          # http://localhost:3000 — Turbopack
pnpm build        # next build --turbopack
pnpm start
pnpm typecheck && pnpm lint
```

Node ≥ 20.9. Trên máy dev hiện tại xem `CLAUDE.md` §5 (build trong WSL, mở qua IP của WSL).

## Biến môi trường

| Biến | Bắt buộc | Dùng để |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | nên có | Gốc canonical/hreflang/sitemap/JSON-LD. Mặc định `https://pebblevina.com`. |
| `ADMIN_PASSWORD` | có, ở production | Mật khẩu vào `/admin`. Không đặt ⇒ CMS đóng ở production, mở ở dev. |
| `ADMIN_SECRET` | không | Khoá ký cookie phiên CMS. Mặc định dùng `ADMIN_PASSWORD`. |
| `CONTACT_WEBHOOK_URL` | không | Nơi đẩy lead từ form liên hệ. Chưa đặt ⇒ ghi log phía server. |

## Route

| URL | Là gì |
|---|---|
| `/vi`, `/en` | Trang chủ — hero, PIM, tại sao PIM, năng lực cốt lõi, giải pháp, tin tức, form liên hệ |
| `/vi/products`, `/en/products` | Danh mục + chi tiết MINT · PAPAYA/FLEX · ESPRESSO · E-Series · phần mềm · đào tạo |
| `/` , `/products` | Redirect 308 về bản tiếng Việt |
| `/admin` | CMS, sau mật khẩu, `noindex` |
| `/api/content/[page]` | `GET` đọc · `PATCH` lưu một section · `DELETE` trả section về gốc |
| `/api/contact` | Nhận lead từ form |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | SEO và GEO |

## Nội dung

Chữ đến từ hai chỗ, cố ý tách bạch:

- `src/lib/i18n/dictionary.ts` — phần cố định (điều hướng, footer, thân thẻ, bảng thông số, nhãn form).
- `src/lib/content/seed.ts` — phần CMS sở hữu (tiêu đề, mô tả, ảnh, cờ hiển thị section). Lưu từ
  `/admin` ghi vào `data/content.runtime.json` và xuất bản ngay ra trang tĩnh.

Mọi chuỗi đều là `{ vi, en }`. Đổi cấu trúc nội dung: sửa `schema.ts` (Zod) và `fields.ts` (form CMS)
cùng lúc.

## SEO / GEO

Cả hai ngôn ngữ có URL riêng, đủ canonical + hreflang (`vi-VN`, `en-US`, `x-default`), OpenGraph,
sitemap khai báo song ngữ. JSON-LD: `Organization` + `WebSite` ở trang chủ, `BreadcrumbList` +
`ItemList`/`Product` ở trang sản phẩm — sản phẩm chưa ra mắt không có `offers`, chỉ có trạng thái.
`/llms.txt` nêu thẳng đâu là hàng đang sản xuất, đâu là lộ trình, để một trợ lý AI không trích nhầm.

Thiết kế gốc và ảnh nằm ở `design_handoff_pebble_vina/`.
