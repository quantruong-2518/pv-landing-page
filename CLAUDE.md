# CLAUDE.md — luật của repo pv-landing-lab

Website công khai của Pebble Vina (VI/EN) + CMS nội bộ. Next.js 16 · React 19 · Tailwind 4 ·
Turbopack · pnpm · motion · Zustand · TanStack Query · Zod.

## 1. Nguồn sự thật

| Cần biết | Đọc ở đâu |
|---|---|
| Bố cục, màu, chữ, spacing, hành vi | `design_handoff_pebble_vina/README.md` + 3 file `.dc.html` trong `design-refs/` |
| Copy VI/EN của khối cố định | `src/lib/i18n/dictionary.ts` |
| Copy VI/EN sửa được qua CMS | `src/lib/content/seed.ts` (giá trị gốc) → `data/content.runtime.json` (đã xuất bản) |
| Schema nội dung | `src/lib/content/schema.ts` (Zod) · `src/lib/content/fields.ts` (form CMS) |
| URL | `src/lib/routes.ts` |
| Token thiết kế | `src/app/globals.css` (`@theme`) |

Ba file `.dc.html` là **mock tham khảo**, không import vào `src/`.

## 2. Bốn điều cấm

1. **Không bịa con số, năng lực, khách hàng, logo đối tác.** Mọi thông số (30 GOPS · 17,6 TOPS/W ·
   160 TOPS · 640 TOPS · 400K · 82%) chép nguyên từ thiết kế. Cần số mới thì hỏi người, không đoán.
2. **Không trộn "đã có" với "lộ trình".** MINT đang sản xuất (05/2023); PAPAYA là PoC 2024;
   ESPRESSO, E-Series, phần mềm doanh nghiệp, đào tạo AI đều là lộ trình. Mọi lần nhắc phải kèm mốc
   thời gian tại chỗ. JSON-LD của phần lộ trình **không** được có `offers`.
3. **Không so sánh trần trụi.** `~50× / ~100× / ~25×` của PAPAYA FLEX luôn đi kèm phép đo sinh ra nó
   và tên linh kiện đối chứng (NVIDIA Jetson Nano).
4. **Không hardcode màu, chữ, hay URL trong component.** Màu → token `@theme`. Chữ → `dictionary.ts`
   hoặc CMS. URL → `routes.ts`.

## 3. Kỷ luật code

- **Code, tên biến và comment viết bằng tiếng Anh.** Comment nói *vì sao*, và trỏ về nguồn của con
  số (mục nào trong handoff, tên asset, dòng nào trong bảng token). Không sinh thêm file docs.
- **SSR mặc định.** `"use client"` chỉ khi thật sự cần tương tác. Cả 4 trang công khai phải prerender
  được — đó là điều kiện của SEO/GEO.
- **Hai locale luôn đủ đôi.** Mỗi chuỗi là `{ vi, en }`; thêm khóa là thêm cả hai.
- **Không bo góc, không đổ bóng.** Thiết kế vuông góc hoàn toàn; chiều sâu tạo bằng nền tối/sáng và
  viền `border-ink/8…28`.
- **Khối `screen` chỉ cao trọn màn từ `md` trở lên**, và dùng `svh` chứ không `vh`. Thêm chữ vào một
  khối `screen` là làm nó tràn màn trên điện thoại.
- Trước khi commit: `pnpm typecheck`, `pnpm lint`, `pnpm build` phải xanh.

## 4. Ba cái bẫy đã trả giá (đừng lặp lại)

- **`dynamicParams = false` trên `[locale]` làm hỏng xuất bản.** Sau khi CMS gọi `revalidatePath`,
  Next từ chối dựng lại và `/vi`, `/en`, `/vi/products` cùng 404 tới lần build kế tiếp. Đã đo.
  Locale sai được chặn bằng `isLocale()` + `notFound()`.
- **`revalidatePath("/[locale]", "layout")` không xoá cache trang đã prerender.** Phải revalidate
  đường dẫn cụ thể (`/vi`, `/en`, `/vi/products`, `/en/products`, `/llms.txt`) — xem
  `src/app/api/content/[page]/route.ts`.
- **`scroll-behavior: smooth` trong CSS làm hỏng deep link.** Trình duyệt cuộn có hoạt ảnh tới
  `#fragment` lúc tải trang, hydration cắt ngang, người đọc rơi về đầu trang. Smooth được bật sau khi
  deep link đã đáp, trong `src/components/site/scroll-behaviour.tsx`.

## 5. Chạy trên máy này

Build trong WSL, phục vụ từ WSL, mở bằng IP của WSL (`localhost` phía Windows trả 500 do IPv6):

```bash
wsl.exe -d Ubuntu-20.04 -e bash -lc 'export PATH=$HOME/.nvm/versions/node/v22.20.0/bin:$PATH; \
  cd /home/stevetruong/work/pebble-vina/pv-landing-lab && pnpm build'
```

**Luôn dừng server trước khi build.** `next build` và `next start` dùng chung `.next`; build khi
server đang chạy làm server hỏng với `Cannot find module` và CSS 404 — dễ đọc nhầm thành lỗi layout.
