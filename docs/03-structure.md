# 03 — Cấu trúc site

> Viết lại 2026-08-20 khi GM chốt khung ba nhánh. Bản 13-khối-một-trang cũ đã bị thay; nội dung của nó
> giữ ở `context/99-unplaced/`.

## 1. Ba nhánh — khung chuẩn

```
├── 1. HOME                     /            · /vi
│   ├── Slogan / Hero
│   ├── Why Now?
│   └── Lịch sử hình thành
│
├── 2. SẢN PHẨM & GIẢI PHÁP     /products    · /vi/products
│   ├── 2.1 HARDWARE
│   │   ├── MINT        → Sensor AI · Voice AI · Ultra-low-power edge AI
│   │   ├── PAPAYA      → Vision AI · Camera · Inspection · Robotics
│   │   ├── ESPRESSO    → Large-model inference · AI accelerator · AI server
│   │   └── GPU / HPC   → GPU · AI training · Large-scale inference · HPC · AI data center
│   └── 2.2 SOFTWARE
│       ├── AI-optimized enterprise software → CRM · ERP/Ops · Workflow · Data & reporting · AI agent
│       └── Private AI  → Build · Train/Adapt · Deploy
│                         Deploy: on-device · edge · on-premise · private cloud · GPU/AI infra
│
└── 3. LIÊN HỆ                  /contact     · /vi/contact
```

**Ba trang, không phải năm.** Mỗi sản phẩm là một khối có anchor (`#mint`, `#papaya`, `#espresso`,
`#gpu`, `#enterprise`, `#private-ai`) chứ không phải một route riêng — vì nội dung chi tiết chưa có,
mở thêm route chỉ tạo thêm trang rỗng. Khi một sản phẩm đủ dày để đứng một mình thì tách sau; anchor
đã sẵn nên URL cũ vẫn trỏ đúng chỗ.

## 2. Định tuyến

| Route | Trang | h1 |
|---|---|---|
| `/` · `/vi` | HOME | slogan trong hero |
| `/products` · `/vi/products` | SẢN PHẨM & GIẢI PHÁP | `products.intro.title` |
| `/contact` · `/vi/contact` | LIÊN HỆ | `contact.intro.title` |

**EN canonical ở `/`**, VI song song đầy đủ ở `/vi` — tệp quyết định (FDI Hàn, đối tác Nhật, GCC, nhà
đầu tư) đọc tiếng Anh. Hai bản đối xứng tuyệt đối: cùng khớp type `SiteContent` nên lệch một field là
`tsc` gãy.

Kỹ thuật: **hai root layout** (`app/(en)/` và `app/(vi)/`, không có `app/layout.tsx`) để mỗi ngôn ngữ
có `<html lang>` của nó. Đường dẫn tính bằng `lib/routes.ts`, không hardcode ở component. Cả 6 trang
đều prerender tĩnh.

## 3. Luật khối — đã nới

Mọi `<Section>` vẫn mang `scroll-snap-align: start`, nên cuộn luôn dừng ở **đầu** một khối. Khác bản cũ
ở chỗ **không phải khối nào cũng cao đúng một màn**:

| Khối | Chiều cao |
|---|---|
| Hero, Why Now, index của `/products`, hero của `/contact` | `min-h-[calc(100svh - var(--header-h))]` (`screen`) |
| Lịch sử, từng khối sản phẩm, khối văn phòng | theo nội dung |

Container cuộn là `html`:

```css
scroll-padding-top: var(--header-h);      /* 3.5rem mobile · 4rem ≥640px */
@media (min-width: 768px) and (min-height: 640px) {
  html { scroll-snap-type: y mandatory; }
}
```

**Vì sao nới:** khung mới có 9 khối trên `/products` với độ dày rất khác nhau, và phần lớn `body` còn
trống chờ nội dung. Ép mọi khối cao trọn màn khi chưa có chữ chỉ tạo ra những màn hình rỗng. Đo thực
tế ở 1440×900: mỗi khối sản phẩm ~860px ≈ vừa một màn, nên nhịp "một sản phẩm = một màn" vẫn giữ được
mà không cần ép.

**Hệ quả khi viết nội dung vẫn còn nguyên:** khối `screen` mà nhồi thêm chữ là tràn màn. Muốn thêm ý
thì cắt ý khác hoặc tách khối mới.

## 4. Nhịp thị giác

```
HOME                          /products                      /contact
tối ▓▓▓  Hero                 tối ▓▓▓  Index                 tối ▓▓▓  Hero + số điện thoại
sáng ░   01 Why now           sáng ░   2.1 Hardware          sáng ░   Văn phòng + pháp nhân
tối ▓▓▓  02 Lịch sử           sáng ░   MINT                  tối ▓▓▓  Footer
tối ▓▓▓  Footer               xám ▒    PAPAYA
                              sáng ░   ESPRESSO
                              xám ▒    GPU / HPC
                              tối ▓▓▓  2.2 Software     ← vạch ngăn phần cứng / phần mềm
                              sáng ░   Enterprise
                              xám ▒    Private AI
                              tối ▓▓▓  Footer
```

Dải tối = chỗ mắt **phải** dừng: mở màn, lịch sử công ty mẹ, ranh giới 2.1/2.2, lời mời. Xen kẽ sáng/xám
giữ ranh giới khối rõ ngay cả khi hai khối cùng tông đứng cạnh nhau.

Khối sản phẩm **đổi bên so le**: MINT ảnh phải, PAPAYA ảnh trái, ESPRESSO ảnh phải… Dưới `lg` tất cả
xếp dọc: chữ trước, ảnh sau, số đo cuối.

## 5. Bảy ô ảnh

Ô ảnh là `Media { src?, alt }` trong i18n. `src` trống thì `<Figure>` vẽ placeholder có thiết kế — lưới
crossbar, khung ngắm 4 góc, và chính chữ `alt` — nên chỗ trống tự nói nó chờ ảnh gì. Danh sách ô, tỉ lệ
và art direction: `context/media-plan.md`.

## 6. Nội dung chờ điền

Tiêu đề khối, tên sản phẩm, tên năng lực, mốc lịch sử và số đo: **đã điền**. Toàn bộ `lead` và `body`:
**để trống có chủ ý**, bản nháp nằm ở `context/`. Component bỏ qua chuỗi rỗng thay vì vẽ khoảng trắng,
nên trang vẫn đọc được ở trạng thái này.

```bash
grep -o ': ""' web/content/en.ts | wc -l    # còn bao nhiêu ô trống (hiện: 63)
```

## 7. Header và footer

**Header** — một hàng cao `var(--header-h)`, dính, nền tối xuyên suốt: wordmark · 3 mục · chuyển ngữ ·
**đúng một** nút hành động. Dưới `lg` cụm điều hướng thu vào disclosure `<details>` thuần HTML (không JS,
không lệch hydrate) và menu đó chứa cả 6 anchor sản phẩm. **Nút hành động hiện ở mọi bề rộng**, kể cả
360px — giấu CTA vào hamburger là lỗi chuyển đổi kinh điển. Mọi vùng chạm ≥ 44px.

**Footer** — bốn cột: bản sắc + link ra trang mẹ · điều hướng · liên hệ · pháp lý (pháp nhân, MST, công
ty mẹ). Thanh đáy: bản quyền + chú giải hệ nhãn, rồi tuyên bố nguồn dữ liệu.

## 8. Khoảng trống G1–G9 sau refactor

| Gap | Trước | Sau | Ghi chú |
|---|---|---|---|
| **G1** không tầng proof | ✅ | ✅ | Nhãn `shipped`/`roadmap` + tag `ps`/`pv` trên từng sản phẩm |
| **G2** không con số | ✅ | ✅ | Dải **số đo** dưới MINT · PAPAYA · ESPRESSO |
| **G3** không FAQ | ✅ | ❌ **mở lại** | Khung mới không có ô cho FAQ — mất luôn JSON-LD `FAQPage`. Nội dung giữ ở `context/99-unplaced/faq.md` |
| **G4** không "bấm nút xong thì sao" | ✅ | ❌ **mở lại** | 4 bước triển khai giữ ở `context/99-unplaced/getting-started.md` |
| **G5** một lối chuyển đổi | ✅ | ✅ | Hero 2 nút · trang liên hệ 2 nút |
| **G6** CTA chỉ ở hero và đáy | ✅ | ✅ | Header dính ở mọi màn |
| **G7** không tín hiệu "còn sống" | ✅ | ✅ | Lịch sử hình thành, mốc cuối KPAS 2025 |
| **G8** tầm nhìn chắn khối chốt | ✅ | ✅ | Không có khối tầm nhìn |
| **G9** không ảnh | ❌ | ❌ | 7 ô đã chừa, chưa có file — `docs/05-backlog.md` #5 |

**G3 và G4 là cái giá của khung mới.** Xem `docs/05-backlog.md` #14, #15.
