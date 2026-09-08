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
| `NEXT_PUBLIC_SITE_URL` | nên có | Gốc canonical/hreflang/sitemap/JSON-LD. Mặc định `https://www.pebblevina.com` — phải là host thật sự có chứng chỉ, xem *Tên miền và chứng chỉ*. |
| `ADMIN_PASSWORD` | có, ở production | Mật khẩu vào `/admin`. Không đặt ⇒ CMS đóng ở production, mở ở dev. |
| `ADMIN_SECRET` | không | Khoá ký cookie phiên CMS. Mặc định dùng `ADMIN_PASSWORD`. |
| `NEXT_PUBLIC_PV_ONE_CRM_API_URL` | không | Endpoint CRM nhận lead. Công khai theo thiết kế — không đặt secret vào đây. Mặc định `https://pvone-crm-api.fly.dev`. |
| `NEXT_PUBLIC_PV_ONE_CRM_LANDING_PAGE` | không | Slug trang landing gửi kèm lead, phải khớp `PV_INTAKE_LANDING_PAGES` phía CRM. Mặc định `pv-one-main`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | không | ID GA4 (`G-…`). Bỏ trống ⇒ không bao giờ nạp GA. Có giá trị vẫn chỉ nạp cho khách đã đồng ý nhóm *phân tích*. |

## Route

| URL | Là gì |
|---|---|
| `/vi`, `/en` | Trang chủ — hero, PIM, tại sao PIM, năng lực cốt lõi, giải pháp, tin tức, form liên hệ |
| `/vi/products`, `/en/products` | Danh mục + chi tiết MINT · PAPAYA/FLEX · ESPRESSO · E-Series · phần mềm · đào tạo |
| `/vi/bio`, `/en/bio` | Hồ sơ doanh nghiệp — sáu mục đánh số: lĩnh vực, hai hướng PIM, con số kèm trạng thái, lộ trình, hợp tác, pháp nhân. Không sở hữu nội dung CMS nào: mọi đoạn văn đọc từ tài liệu `home`, mọi con số đọc từ bảng spec sản phẩm |
| `/` , `/products`, `/bio` | Redirect 308 về bản tiếng Việt |
| `/admin` | CMS, sau mật khẩu, `noindex` |
| `/api/content/[page]` | `GET` đọc · `PATCH` lưu một section · `DELETE` trả section về gốc |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | SEO và GEO |

Form liên hệ không có route riêng — trình duyệt POST thẳng lên PV One CRM
(`src/lib/contact/crm.ts`), endpoint công khai không cần key.

## Nội dung

Chữ đến từ hai chỗ, cố ý tách bạch:

- `src/lib/i18n/dictionary.ts` — phần cố định (điều hướng, footer, thân thẻ, bảng thông số, nhãn form).
- `src/lib/content/seed.ts` — phần CMS sở hữu (tiêu đề, mô tả, ảnh, cờ hiển thị section). Lưu từ
  `/admin` ghi vào `data/content.runtime.json` và xuất bản ngay ra trang tĩnh.

Mọi chuỗi đều là `{ vi, en }`. Đổi cấu trúc nội dung: sửa `schema.ts` (Zod) và `fields.ts` (form CMS)
cùng lúc.

## Cookie & đồng ý

Trang công khai **không đặt cookie nào trước khi khách trả lời**. Banner nằm ở
`src/components/site/consent/`, trạng thái ở `src/lib/store/consent-store.ts`, còn hợp đồng cookie
(tên, hạn, cách xoá) ở `src/lib/consent/cookie.ts` — đổi một chỗ thì đổi cả bản mô tả trong
`dictionary.consent`, vì đó là phần khách đọc và là phần có giá trị pháp lý.

| Nhóm | Cookie | Hạn | Ai đặt |
|---|---|---|---|
| Cần thiết | `pv_consent` | 180 ngày | chính trang, ghi lại lựa chọn |
| Cần thiết | `pv_admin` | 12 giờ | chỉ khi đăng nhập `/admin` |
| Phân tích | `_ga`, `_ga_*` | tối đa 2 năm | Google, **chỉ sau khi khách bật** |

Ba điều không được phá khi sửa:

- **Từ chối phải dễ đúng bằng đồng ý** — một cú bấm, cùng cỡ nút. Chôn nút từ chối vào trong
  "Tùy chỉnh" là lỗi bị phạt nhiều nhất ở châu Âu.
- **Không nạp gtag rồi mới xin phép.** Request tới googletagmanager.com đã mang theo IP của khách.
  `<Analytics>` chưa mount thì chưa có request nào — đó là toàn bộ cơ chế gác.
- **Rút lại phải làm được.** Link "Cài đặt cookie" ở chân trang mở lại đúng bảng đó; tắt nhóm phân
  tích là `_ga*` bị xoá ngay trong cùng thao tác.

Banner không render phía server: sáu trang công khai phải prerender được, mà đọc `cookies()` trong
layout thì cả sáu thành dynamic. Store khởi tạo ở `unknown`, khớp HTML tĩnh khi hydrate, rồi effect
mới đọc cookie và quyết định có hỏi hay không.

## Tên miền và chứng chỉ

Đo ngày 08/09/2026, `https://pebblevina.com` (apex) **hỏng**, và đó là nguồn của cảnh báo
"Your connection is not private" mà khách gặp lúc được lúc không:

```
pebblevina.com      A 216.198.79.1     Vercel — 308 sang www, nhưng chứng chỉ chỉ có 1 SAN:
                                       www.pebblevina.com ⇒ sai tên host
pebblevina.com      A 162.255.119.15   Namecheap URL Forwarding — không trả lời cổng 443
www.pebblevina.com                     Vercel, Let's Encrypt hợp lệ, có HSTS
```

DNS trả về luân phiên hai IP nên nửa số lần vào apex là lỗi chứng chỉ, nửa còn lại là treo. Chrome
lại tự nâng `http://` thành `https://` (HTTPS-First), nên gõ "pebblevina.com" cũng rơi vào đúng
đường đó. Bản thân bản ghi `162.255.119.15` còn là lý do Vercel không cấp được chứng chỉ cho apex:
challenge HTTP-01 của Let's Encrypt cũng bị luân phiên sang Namecheap và trượt.

Sửa dứt điểm — **ở Namecheap và Vercel, không phải trong repo**:

1. Namecheap → Advanced DNS: xoá bản ghi A `162.255.119.15` và tắt URL Forwarding cho `@`.
2. Để apex chỉ còn A `216.198.79.1` (hoặc ALIAS/CNAME về `cname.vercel-dns.com`).
3. Vercel → Project → Domains: thêm `pebblevina.com`, đợi cấp chứng chỉ, đặt `www.pebblevina.com`
   làm Primary để apex 308 sang www.
4. Kiểm lại: `curl -sSI https://pebblevina.com/` phải ra 308 chứ không lỗi TLS, và
   `openssl s_client -connect pebblevina.com:443 -servername pebblevina.com` phải thấy cả hai tên
   trong SAN.

Chừng nào apex chưa có chứng chỉ thì `NEXT_PUBLIC_SITE_URL` phải trỏ `www` — canonical, hreflang,
sitemap, JSON-LD `@id` và `robots.host` đều đọc biến đó, và trỏ vào host lỗi là tự khai với Google
rằng bản chính là bản hỏng.

## SEO / GEO

Cả hai ngôn ngữ có URL riêng, đủ canonical + hreflang (`vi-VN`, `en-US`, `x-default`), OpenGraph,
sitemap khai báo song ngữ. JSON-LD: `Organization` + `WebSite` ở trang chủ, `BreadcrumbList` +
`ItemList`/`Product` ở trang sản phẩm — sản phẩm chưa ra mắt không có `offers`, chỉ có trạng thái —
`AboutPage` + `BreadcrumbList` ở `/bio`, trỏ `about`/`mainEntity` về đúng node `Organization`.
`/llms.txt` nêu thẳng đâu là hàng đang sản xuất, đâu là lộ trình, để một trợ lý AI không trích nhầm.

Thiết kế gốc và ảnh nằm ở `design_handoff_pebble_vina/`.
