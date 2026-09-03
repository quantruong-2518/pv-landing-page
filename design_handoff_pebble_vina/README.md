# Handoff: Pebble Vina — Website công khai + CMS nội bộ

## Tổng quan
Bộ 3 màn: **Trang chủ**, **Sản phẩm & giải pháp**, **Quản trị nội dung (CMS)** cho công ty bán dẫn AI Pebble Vina. Site song ngữ VI/EN, tối màu (navy/đen), có form liên hệ và một CMS nội bộ chỉnh nội dung + ảnh cho từng section.

Stack đích cho bản build thật: **Next.js (App Router, Turbopack) + TypeScript + Tailwind CSS + Framer Motion (motion) + shadcn/ui + Zustand + TanStack Query**.

## Về các file thiết kế
Các file trong `design-refs/` (`*.dc.html`) là **thiết kế tham khảo dựng bằng HTML** — mock có tương tác, không phải code production để copy thẳng. Nhiệm vụ là **dựng lại giao diện này bằng Next.js/Tailwind/shadcn** theo đúng bố cục, màu sắc, chữ, khoảng cách và hành vi mô tả dưới đây — không import file `.dc.html` vào repo, không giữ `image-slot.js`/`support.js` (đó là runtime của môi trường thiết kế).

## Độ chính xác (Fidelity)
**Hi-fi** — màu, chữ, spacing, layout đã là giá trị cuối. Copy text tiếng Việt là bản thật; text tiếng Anh (thuộc tính `data-en` trong markup) là bản dịch đi kèm, dùng cho việc chuyển ngôn ngữ. Ảnh đang là **placeholder chờ ảnh thật** (`<image-slot>`), kèm mô tả + kích thước đề xuất — xem mục Assets.

---

## 1. Kiến trúc Next.js đề xuất

```
app/
  layout.tsx                 # font loading, <html lang>, providers
  (site)/
    page.tsx                 # Trang chủ  → Home.dc.html
    products/page.tsx        # Sản phẩm    → Product.dc.html
  admin/page.tsx              # CMS         → Admin.dc.html (chặn bằng auth thật, KHÔNG public)
components/
  site/                       # Header, Hero, Marquee, PimSection, WhySection, CoreStats,
                               # SolutionsList, NewsGrid, ContactForm, SiteFooter
  admin/                      # AdminHeader, SectionSidebar, FieldEditor(text/area/number/image)
  ui/                         # shadcn/ui generated components (button, input, textarea, checkbox, tabs…)
lib/
  content/schema.ts           # Zod schema — 1:1 với SCHEMA trong Admin.dc.html
  content/seed.ts              # dữ liệu mặc định — 1:1 với DEFAULTS trong Admin.dc.html
  i18n/dictionary.ts           # {vi:{}, en:{}} cho mọi field content
  store/locale-store.ts        # Zustand — ngôn ngữ hiện tại
  store/admin-store.ts         # Zustand — page/section đang chọn, dirty flag (KHÔNG chứa content — content do TanStack Query giữ)
  api/content.ts               # fetchers cho TanStack Query (getPageContent, saveSection…)
app/api/content/[page]/route.ts  # route handler tạm (đọc/ghi DB thật khi có)
```

Turbopack: dùng mặc định của `next dev`/`next build --turbopack` (Next 15+), không cần cấu hình thêm — dự án không có gì đặc biệt (không webpack loader tuỳ biến, không SVGR) ngăn Turbopack.

## 2. Mapping thư viện → nhu cầu thực tế

| Thư viện | Dùng cho |
|---|---|
| **Tailwind CSS** | Toàn bộ layout/spacing/typography. Định nghĩa design tokens ở mục 4 vào `tailwind.config.ts` (`theme.extend.colors`, `fontFamily`, `letterSpacing`) — không hard-code hex trong component. |
| **shadcn/ui** | `Button` (primary/ghost — xem mục Components), `Input`/`Textarea` (form liên hệ + Admin field editor), `Checkbox` (toggle hiển thị section trong Admin), `Tabs` hoặc `Sidebar` (chuyển Home/Product tab và danh sách section trong Admin), `Sonner`/`Toast` (thông báo "Đã lưu" thay cho text tĩnh). Restyle theo token của Pebble Vina (xem mục 4), **không dùng theme mặc định của shadcn**. |
| **Framer Motion (`motion/react`)** | Marquee chạy chữ (thay keyframes CSS bằng `animate={{x: '-50%'}}` loop vô hạn — dễ pause on hover), fade/slide-in khi section vào viewport (`whileInView`), chuyển đổi mượt khi bấm VI/EN (crossfade text), hiệu ứng khi mở/đóng field ảnh trong Admin, progress bar 82% ở section Phần mềm animate từ 0→82%. |
| **Zustand** | `locale-store`: `lang: 'vi'|'en'`, `toggleLang()` — thay cho việc lục DOM bằng `data-en`/`textContent` như bản mock. `admin-store`: `activePage`, `activeSection`, `dirty` — KHÔNG lưu nội dung field trong Zustand, nội dung là server state (xem TanStack Query). `contact-form-store` không cần Zustand — dùng state cục bộ hoặc React Hook Form. |
| **TanStack Query** | Nguồn dữ liệu content thật thay cho `localStorage` của bản mock: `useQuery(['content','home'])` / `['content','product']` để Trang chủ và Sản phẩm render nội dung; `useMutation` cho nút "Lưu thay đổi" trong Admin (`PATCH /api/content/:page/:section`) với optimistic update + invalidate; `useMutation` cho submit form liên hệ (`POST /api/contact`). Tin tức (News) nếu sau này có nhiều hơn 4 mục nên có `useInfiniteQuery`. |

## 3. Sơ đồ trang & mục lục section

| Trang | Route | Sections (theo thứ tự) |
|---|---|---|
| Trang chủ | `/` | Header · Hero (`#top`) · Marquee · 01 Công nghệ PIM (`#cong-nghe-pim`) · Tại sao PIM quan trọng · 02 Năng lực cốt lõi (ẩn/hiện được — `showStats`) · 03 Giải pháp (`#giai-phap`) · 04 Tin tức (ẩn/hiện được — `showNews`, `#tin-tuc`) · 05 Liên hệ (`#lien-he`) · Footer |
| Sản phẩm & giải pháp | `/products` | Header · Catalogue/hero (`#top`) · 01 MINT (`#mint`) · 02 PAPAYA/PAPAYA FLEX (`#papaya`) · 03 ESPRESSO (`#espresso`) · 04 E-Series (`#e-series`) · 05 Phần mềm doanh nghiệp (`#phan-mem`) · 06 Đào tạo AI (`#dao-tao`) · 07 Liên hệ (`#lien-he`) · Footer |
| CMS quản trị | `/admin` | Header (chọn trang, Lưu/Hoàn tác) · Sidebar (danh sách section của trang đang chọn) · Panel field editor của section đang chọn |

Cả hai trang public dùng **chung Header và Footer** (component `SiteHeader`/`SiteFooter`) — chỉ khác trạng thái active của nav link.

---

## 4. Design tokens

### Màu
| Token | Hex | Dùng cho |
|---|---|---|
| `bg-base` | `#05070F` | Nền `<body>`, nền trang mặc định |
| `bg-deep` | `#04060E` | Nền các section PIM/Core capability |
| `bg-marquee` | `#070B18` | Nền thanh chạy chữ |
| `bg-navy` | `#0A1326` | Nền section "Why PIM", MINT/ESPRESSO detail |
| `bg-navy-2` | `#111E3A` | Nền section Giải pháp, Phần mềm, Liên hệ |
| `bg-footer` | `#03050B` | Nền footer |
| `bg-admin-panel` | `#080D1B` | Nền sidebar Admin |
| `bg-admin-input` | `#0C1730` | Nền input/textarea Admin |
| `text-primary` | `#E8EDF7` | Heading, text chính trên nền tối |
| `text-body` | `#A8B6CF` | Đoạn mô tả (body copy) |
| `text-muted` | `#93A2BE` | Label nav, chú thích phụ |
| `text-faint` | `#7C8AA3` | Mono label rất nhẹ, ghi chú |
| `text-disabled` | `#5C6980` | Placeholder input, link disabled (CMS trong footer) |
| `text-copyright` | `#4A5872` | Marquee text, copyright |
| `accent` | `#4E92FF` | CTA chính, số liệu nhấn, link, active state |
| `accent-hover` | `#8FBAFF` | Hover của accent (nút, link) |
| `accent-eyebrow` | `#5F9DFF` | Eyebrow label trên nền ảnh (hero, PIM) |
| `accent-glow` | `rgba(29,78,216, 0.14–0.20)` | Radial-gradient glow nền section (dùng làm nguồn cho `accent-700`/`800` trong Tailwind scale) |
| `accent-tint-hover` | `rgba(78,146,255, 0.07–0.16)` | Background hover cho row/link dạng "ghost" |
| `border-hairline` | `rgba(232,237,247, 0.08–0.28)` | Mọi border/divider trên nền tối (opacity thay đổi theo mức nhấn) |
| `contact-copy` | `#C6D1E5` | Text cột trái section Liên hệ (trên nền ảnh + scrim) |

Đây thực chất là **một scale duy nhất của accent xanh** (`#4E92FF`) + navy/đen nền + trắng-xanh nhạt cho text — khi đưa vào Tailwind, định nghĩa `accent.DEFAULT/hover` và một scale `ink-50…950` cho các mức nền/text ở trên, tránh dùng arbitrary hex rải rác trong JSX.

### Typography
- **Heading font**: `Chakra Petch`, weight 700 (h1/h2, số liệu lớn, nhãn nút). Google Fonts weights cần: 500/600/700.
- **Body font**: `Be Vietnam Pro`, weight 400–800. Dùng cho toàn bộ paragraph, label, nav.
- **Mono font**: `JetBrains Mono`, weight 400/500. Dùng cho *mọi* eyebrow/label viết hoa letter-spaced, số liệu đơn vị (TOPS, GB…), nút CTA dạng outline, số thứ tự (01/02/03), lang toggle (VI/EN).
- Không dùng font khác ngoài 3 font trên.

| Vai trò | Kích thước (desktop, `clamp()` gốc) | Weight | Letter-spacing |
|---|---|---|---|
| H1 Hero | `clamp(32px, 4.6vw, 72px)` | 700 | −0.008em |
| H1 Catalogue (Product) | `clamp(29px, 3.7vw, 56px)` | 700 | −0.014em |
| H2 section | `clamp(26px, 2.9vw, 44px)` | 700 | −0.012em |
| H2 product-detail | `clamp(24px, 2.6vw, 40px)` | 700 | −0.012em |
| Số liệu nhấn (stat) | `clamp(28px, 2.6–3vw, 44px)`; case đặc biệt "82%" → `clamp(52px, 6vw, 92px)` | 700 | −0.008em |
| Lead paragraph | `clamp(15px, 1.05vw, 17px)` (hero: `clamp(16px, 1.1vw, 19px)`) | 400 | line-height 1.7–1.8 |
| Body nhỏ (card) | 15–15.5px | 400 | line-height 1.78 |
| Eyebrow/mono label | 11–13px | 500 | 0.09–0.15em |
| Nav link | 14px | 500 | 0.02em |
| CTA button label | 12–14px | 600 | 0.1–0.12em |

Quy tắc dựng lại bằng Tailwind: khai báo các bước clamp trên là custom `fontSize` entries trong `tailwind.config.ts` (`'h1-hero': ['clamp(2rem,4.6vw,4.5rem)', {lineHeight:'1.2', letterSpacing:'-0.008em', fontWeight:'700'}]`…) để không phải viết `clamp()` tay trong từng component.

### Spacing / Grid
- Section padding ngang: `clamp(20px, 3.4vw, 56px)`. Padding dọc: `clamp(28px, 3vw, 52px)` (Home) hoặc `clamp(40px, 4.4vw, 76px)` (Product detail).
- Header cao **84px** (site public), **72px** (Admin).
- Grid nội dung: hầu hết dùng `grid-template-columns: repeat(auto-fit, minmax(Npx, 1fr))` với N = 190–340px tuỳ section, gap `clamp(20–26px, ~2.6vw, 44–56px)`. Khi chuyển sang Tailwind, map thành `grid-cols-1 md:grid-cols-2`/`lg:grid-cols-3` v.v. tại breakpoint tương ứng cỡ N — không cần giữ nguyên `auto-fit`.
- **Không có border-radius ở đâu cả** — mọi nút, thẻ, input là hình chữ nhật vuông góc. Giữ `rounded-none` xuyên suốt.
- Không có box-shadow — độ sâu chỉ tạo bằng nền tối hơn/sáng hơn và border hairline mờ.

---

## 5. Chi tiết từng màn hình

### 5.1 Header (site public)
Sticky top, cao 84px, nền `rgba(5,7,15,0.82–0.86)` + `backdrop-filter: blur(14px)`. Trái: logo 36×36 + wordmark 2 dòng "PEBBLE / VINA" (VINA màu accent), font Chakra Petch 15px, letter-spacing 0.12em. Phải: nav (Trang chủ / Sản phẩm & giải pháp / Tin tức — chỉ Home có Tin tức), divider 1px cao 28px, nút VI/EN (mono, đổi màu khi hover), CTA "LIÊN HỆ NGAY" nền accent chữ đen đậm 13px.

### 5.2 Hero (Home, `#top`)
`min-height: 100vh - 84px`, ảnh full-bleed (`image-slot` id `pv-hero`) + 2 lớp gradient overlay (linear ngang tối dần bên trái + linear đứng tối phía dưới) để chữ luôn đọc được trên ảnh. Nội dung neo đáy (`align-items:flex-end`): eyebrow mono xanh → H1 2 dòng → grid 3 cột (auto-fit ≥230px) chứa 2 đoạn mô tả + 1 CTA "TÌM HIỂU THÊM →" nền accent.

### 5.3 Marquee
Băng chữ chạy vô hạn, nền `#070B18`, nội dung nhân đôi để loop liền mạch, `translateX(0→-50%)` 38s linear. Trong React: dựng bằng Framer Motion (`animate`, `repeat: Infinity, ease: 'linear'`), pause khi `prefers-reduced-motion`.

### 5.4 01 — Công nghệ PIM (Home, `#cong-nghe-pim`)
Full-height. Header 2 cột (eyebrow+H2 | lead). Dưới là 2 cột "ANALOG PIM" / "DIGITAL PIM" — mỗi cột: số + tên, ảnh 16:9 mask radial (vignette tròn mờ dần ra viền — dùng CSS `mask-image: radial-gradient(...)`), tiêu đề phụ, mô tả, CTA ghost "KHÁM PHÁ CHIP …". Cuối section: hàng câu chốt "NÂNG CAO HIỆU SUẤT TÍNH TOÁN CHO AI." màu accent cỡ lớn, cạnh icon chip PNG nền trong suốt (`pim-chip.png`, neo phải).

### 5.5 Tại sao PIM quan trọng? (Home)
Full-height, ảnh nền `npu-dram.png` phủ gradient ngang tối dần bên trái (chữ luôn nằm bên trái/trên nền tối hơn). H2 trái + lead phải (grid 2 cột). Dưới: 3 cột số 01/02/03 (Tiết kiệm điện năng / Tối ưu tính toán AI / Mở hướng ứng dụng mới).

### 5.6 02 — Năng lực cốt lõi (Home) — **có thể ẩn qua prop `showStats`**
3 cột thẻ số liệu: **PIM** (nhãn "Tối ưu Data Movement"), **400K** (điểm nơ-ron tính toán, màu accent), **"Phân bổ dữ liệu đồng đều"** (không phải số). Mỗi thẻ có dòng kết luận "→ ENERGY EFFICIENCY / HIGH THROUGHPUT / STABLE & CONSISTENT PROCESSING" cuối thẻ (`margin-top:auto` — thẻ là flex column full height).

### 5.7 03 — Giải pháp (Home, `#giai-phap`)
Header 2 cột, sau đó **4 hàng link full-width** (không phải card) tới trang Sản phẩm: grid `44px | ~0.9fr | ~1.15fr | 28px` = số thứ tự | tên giải pháp | mô tả | mũi tên. Hover: nền tint accent nhẹ toàn hàng. 4 hàng: Chip & giải pháp tích hợp AI ngoại biên → `Product.dc.html#chip`; Huấn luyện LLM cá nhân hoá → `#llm`; Tái sử dụng linh hoạt → `#reuse`; CRM thông minh → `#crm`. **Lưu ý:** các anchor `#chip`/`#llm`/`#reuse`/`#crm` hiện **không tồn tại** trong Product — cần thêm id tương ứng khi build thật, hoặc đổi route đích cho đúng section thật (MINT/PAPAYA/ESPRESSO/E-Series/Software).

### 5.8 04 — Tin tức & Hợp tác (Home, `#tin-tuc`) — **có thể ẩn qua prop `showNews`**
Header 2 cột (căn `align-items:end`). Grid 4 thẻ tin tức (`auto-fit minmax(168px,1fr)`, bleed ra 2 lề bằng margin âm) — mỗi thẻ: ảnh 16:9, ngày (mono accent), tiêu đề 18px, mô tả, "Xem chi tiết →" đẩy xuống đáy (`margin-top:auto`). CTA "XEM TẤT CẢ TIN TỨC →" cuối section.

### 5.9 05 — Liên hệ (Home + Product dùng chung mẫu, `#lien-he`)
Grid 2 cột. **Cột trái** (chỉ Home có bản đầy đủ): ảnh nền (`hq-building.png`) + scrim gradient navy, eyebrow, H2, lead, và cuối cột 3 mini-stat "Hợp tác tin cậy / Công nghệ tiên phong / Bảo mật tuyệt đối". **Cột phải**: form thật (xem 6. Form liên hệ). Bản Product chỉ có bản rút gọn: H2 + lead + 2 CTA (không form).

### 5.10 Footer (dùng chung mọi trang)
4 cột: (1) logo + mô tả công ty + link đối tác `pebble-square.com`; (2) Các trang (Trang chủ/Sản phẩm/Liên hệ/**Quản trị nội dung** — link admin nằm ngay trong footer public, cần **bỏ khỏi footer thật** và thay bằng route có auth riêng); (3) Thông tin liên hệ (phone/email/địa chỉ); (4) Hồ sơ doanh nghiệp (pháp nhân, mã số thuế). Dưới cùng: copyright mono nhạt.

### 5.11 Product — Catalogue hero (`#top`)
Giống cấu trúc Home hero nhưng không full-bleed ảnh — chỉ eyebrow+H1 (trái) / lead (phải), rồi 1 dòng "gợi ý thao tác" (`Bấm vào sản phẩm để xem chi tiết bên dưới`), rồi **grid 4 thẻ sản phẩm hardware** (MINT/PAPAYA/ESPRESSO/E-SERIES — ảnh `fit:contain` với vignette mask, mỗi thẻ link tới section chi tiết bằng anchor), **grid 2 thẻ non-hardware** (Phần mềm doanh nghiệp / Đào tạo AI), và **1 dải timeline 5 mốc** (05/2023 → 2027) cỡ nhỏ cuối section.

### 5.12 Product — MINT / PAPAYA / ESPRESSO / E-Series (mỗi hãng 1 section riêng)
Mẫu chung: dòng kicker "01 • PHẦN CỨNG · …", rồi grid 2 cột (copy trái gồm H2+lead+"ỨNG DỤNG" tag row+CTA tư vấn | ảnh phải `fit:contain` + vignette), rồi dải **thông số kỹ thuật** dạng thẻ số lớn (mono label 01/02/03 → số Chakra Petch to → đơn vị mono nhỏ). Biến thể riêng:
- **MINT**: 3 thông số (Performance/Efficiency/Die Area).
- **PAPAYA**: 2 block thông số (PAPAYA: 4 chỉ số, gồm 1 chỉ số so sánh với NVIDIA Jetson Nano; PAPAYA FLEX: 3 chỉ số nhân "~50×/~100×/~25×" so với Jetson Nano, số màu accent).
- **ESPRESSO**: copy trái có thêm 3 mini-tag ứng dụng (AI PC/Robotics/Data Center) trước CTA; phải là ảnh + 3 thông số + 1 dòng "CARD 4 CHIP → 640 TOPS".
- **E-Series**: không có ảnh hero riêng cạnh copy trái (ảnh card tổng ở phải), rồi **2 sub-card E10/E20** side-by-side (mỗi card: tên+số, ảnh 16:9 contain, mô tả, 3 thông số Compute/Memory/Connectivity — E20 số liệu tô màu accent để nhấn "gấp đôi"), cuối cùng dải "SOFTWARE STACK" 5 mục ngang.

### 5.13 Product — Phần mềm doanh nghiệp (`#phan-mem`)
Section có ảnh nền dashboard (`pd-software.png`) + gradient tối dần xuống đáy + glow accent góc phải. Copy trái (H2+lead+CTA) / phải là **progress bar 82%** (số lớn 92px + track 2px + fill accent). Đáy section: dải 5 cột (CRM/ERP/HRM/DMS/**Trung tâm vận hành AI**) neo `margin-top:auto`.

### 5.14 Product — Đào tạo AI (`#dao-tao`)
Ảnh nền lớp học + gradient tối ngang. H2 trái, 2 đoạn mô tả phải (đoạn 2 nhạt hơn — thứ yếu). Dưới: 4 cột "Khảo sát trước / Thiết kế riêng / Đi vào thực hành / Đo bằng ROI".

### 5.15 Product — Liên hệ rút gọn + Footer
Grid 2 cột căn đáy: trái là eyebrow+H2+lead, phải là 2 CTA (nền accent + nền ghost) — không có form ở trang Product, form chỉ ở Home.

### 5.16 Admin CMS (`/admin`)
**Không phải trang public** — cần đặt sau auth khi build thật (bản mock không có auth).
- **Header** (72px): logo+CMS badge, tab chuyển "Trang chủ/Sản phẩm" (nền accent khi active), status text (CÓ THAY ĐỔI CHƯA LƯU / ĐÃ LƯU / CHƯA CÓ THAY ĐỔI), link "XEM TRANG →", nút "Hoàn tác" (outline), nút "Lưu thay đổi" (nền accent).
- **Sidebar trái** (264px cố định): danh sách section của trang đang chọn, mỗi item = số thứ tự mono + tên + dot tròn 7px (sáng accent = section đang hiển thị public, mờ = đang ẩn). Item active có nền tint + border-left 2px accent.
- **Panel chính**: header con (kicker "TRANG / SECTION" + H2 tên section + checkbox "Hiển thị section này" ở góc phải) rồi **danh sách field động theo schema** — mỗi field render theo `type`:
  - `text` → input 1 dòng
  - `area` → textarea 4 dòng
  - `number` → input number, min 1 max 8
  - `image` → preview thumbnail 210×118 (16:9) + input path text + **grid quick-pick** mọi ảnh có sẵn trong `ASSETS` (button mono nhỏ, viền accent khi đang được chọn) + ghi chú fit (`cover`/`contain`…)
  - Field label: mono nhỏ 11px + 1 dòng hint xám nhạt bên dưới.
- Toàn bộ field theo schema JSON `SCHEMA`/dữ liệu mặc định `DEFAULTS` viết trong `Admin.dc.html` (phần script) — **đây chính là content schema cần build thành DB/API thật**, xem mục 7.

---

## 6. Tương tác & hành vi

- **Chuyển ngôn ngữ (VI/EN)**: bản mock dùng `data-en`/`data-vi` + thao tác DOM trực tiếp (đổi `textContent`/`placeholder` của mọi node có `data-en`). Bản thật: dùng dictionary `{vi: {...}, en: {...}}` theo key field, đọc qua Zustand `locale-store` + hook `useT()`; animate chuyển chữ bằng Framer Motion crossfade (opacity 0↔1, ~150ms) để không "nhảy" đột ngột.
- **Hover**: mọi nút/link/row có nền/màu đổi khi hover (xem `style-hover` trong markup gốc) — dùng Tailwind `hover:` (nền tối→accent hoặc accent→accent-hover) + `transition-colors duration-150`.
- **Focus**: outline 2px accent, offset 2–3px (`:focus-visible`) — giữ nguyên khi build shadcn (override focus ring token).
- **Marquee**: auto-scroll vô hạn, không tương tác; dừng khi `prefers-reduced-motion: reduce`.
- **Smooth scroll tới anchor**: chỉ Product có `html{scroll-behavior:smooth}`, Home thì không — nên **thêm cho cả 2 trang** khi build thật (đồng bộ trải nghiệm), cùng `scroll-margin-top: 84px` trên mọi section có `id` (để không bị header sticky che khi jump).
- **Form liên hệ (Home)**: submit chặn reload (`preventDefault`), hiện dòng "CẢM ƠN BẠN — CHÚNG TÔI SẼ LIÊN HỆ LẠI SỚM." (mono, accent) ngay dưới nút Gửi — bản mock **không gọi API nào**, chỉ đổi state cục bộ. Bản thật: `useMutation` (TanStack Query) `POST /api/contact` với các field `fullName*, company*, email*, phone, message*` (dấu `*` = required); validate bằng Zod + React Hook Form; hiện toast (shadcn `Sonner`) thay vì dòng text tĩnh, giữ cả dòng text đó làm fallback trong khu vực form khi mutation thành công.
- **Ẩn/hiện section (Home)**: 2 prop cấp trang `showStats`/`showNews` bọc quanh section bằng điều kiện render — bản thật nên đọc cờ hiển thị này **từ content API** (field `visible` mà Admin đang chỉnh) thay vì hard-code prop, để Admin toggle thật sự ảnh hưởng trang public.
- **Admin — sửa field**: mỗi input `onChange` cập nhật state cục bộ ngay (không debounce), đổi `dirty=true`. **Lưu**: ghi toàn bộ object vào `localStorage['pebblevina.cms.v1']`. **Hoàn tác**: reset về `DEFAULTS` gốc (không phải "undo bước cuối" — là reset toàn bộ). Bản thật: `onChange` nên debounce ~400ms trước khi coi là "dirty" gửi lên; "Lưu thay đổi" gọi `useMutation` PATCH theo section đang mở (không phải toàn bộ site) để tránh ghi đè các section khác đang được người khác sửa song song; "Hoàn tác" nên nghĩa là revert riêng section hiện tại về giá trị đã lưu gần nhất trên server (`queryClient.invalidateQueries` hoặc refetch), không phải xoá về giá trị mặc định cứng.
- **Admin — chọn ảnh nhanh**: click 1 asset có sẵn set path field luôn — hữu ích để demo nhưng khi có upload thật, thêm hành động "Tải ảnh lên" riêng (không thay hoàn toàn quick-pick, vẫn giữ quick-pick cho ảnh đã dùng trước đó trong site).

## 7. Content schema (nguồn cho DB/API + Zod)

`Admin.dc.html` (phần `<script>`) đã chứa **schema hoàn chỉnh bằng JS thuần** — dùng làm nguồn build thẳng thành Zod schema + seed data, không cần thiết kế lại từ đầu:

- Object `SCHEMA` (khoảng dòng có `const SCHEMA = {...}`): định nghĩa 2 "trang" (`home`, `product`), mỗi trang có danh sách `sections`, mỗi section có `id`, `label`, và `fields[]` — mỗi field có `key`, `label`, `type` (`text|area|number|image`), `hint`, và với field ảnh có thêm `fit` (mô tả cách crop: cover/contain + tỉ lệ).
- Object `DEFAULTS`: dữ liệu seed thật cho từng field theo section — **chính là nội dung tiếng Việt hiện tại của site**, dùng làm seed migration/DB đầu tiên.
- Field ảnh không có object riêng cho "danh sách ảnh khả dụng" — nó dùng chung mảng `ASSETS` (đường dẫn tới `assets/*.png` hiện có trong repo thiết kế) làm quick-pick.

Việc cần làm khi build thật:
1. Chuyển `SCHEMA` → Zod schema per-section (`z.object({ eyebrow: z.string(), title: z.string(), ... })`) để validate cả ở Admin form và ở API.
2. Chuyển `DEFAULTS` → seed data cho DB (mỗi field cần thêm bản `en` song song với bản `vi` đang có — hiện bản mock EN chỉ tồn tại rời rạc trong `data-en` của 2 file Home/Product, cần gộp lại theo đúng key của `DEFAULTS` khi tạo bảng song ngữ).
3. Thêm field `visible: boolean` (đã có trong record, ngang hàng field khác) làm cờ hiển thị section, để Home/Product đọc trực tiếp từ content thay vì cờ cứng `showStats`/`showNews`.

## 8. Assets

Ảnh hiện tại đều là **placeholder chờ ảnh thật** (component `<image-slot>` trong bản mock — khi build Next.js thay bằng `<Image>` next/image bình thường, không cần giữ component đó). Danh sách theo khuyến nghị kích thước lấy từ chính placeholder text trong thiết kế:

| File hiện có | Section dùng | Tỉ lệ / fit | Kích thước đề xuất |
|---|---|---|---|
| `chip-hero.png` | Home Hero (full-bleed) | cover | 3840×2160 |
| `chip-analog.png` | Home 01 PIM — cột Analog | cover 16:9, vignette | 1600×900 |
| `chip-digital.png` | Home 01 PIM — cột Digital | cover 16:9, vignette | 1600×900 |
| `pim-chip.png` | Home 01 PIM — icon chốt | PNG nền trong suốt | tự do, ~168px rộng |
| `npu-dram.png` | Home "Why PIM" — ảnh nền | cover, dải ngang | 2400×1000 |
| `hq-building.png` | Home Liên hệ — ảnh nền cột trái | cover | 1600×1200 |
| `bg-web.png` | Home + Product Liên hệ — nền CSS `background` | cover | — |
| `news-1..4.png` | Home Tin tức — 4 thẻ | cover 16:9 | 1200×800 mỗi ảnh |
| `pd-mint.png` | Product catalogue card + MINT hero | contain 16:9, vignette | 1200×900 (card) / 2000×1500 (hero) |
| `pd-papaya.png` | Product catalogue card + PAPAYA hero | contain 16:9, vignette | 1200×900 / 2000×1500 |
| `pd-espresso.png` | Product catalogue card + ESPRESSO hero | contain 16:9, vignette | 1200×900 / 2000×1400 |
| `pd-eseries.png` | Product catalogue card + E-Series hero | contain 16:9, vignette | 1200×900 / 2000×1400 |
| `pd-e10.png` | Product E-Series — sub-card E10 | contain 16:9, vignette | 1600×900 |
| `pd-e20.png` | Product E-Series — sub-card E20 | contain 16:9, vignette | 1600×900 |
| `pd-software.png` | Product Phần mềm — ảnh nền dashboard | cover, marketing | 2400×1600 |
| `pd-training.png` | Product Đào tạo — ảnh nền lớp học | cover | 2000×1400 |
| `logo.png` | Header + Footer (mọi trang) | — | hiện 36×36 (header) / 32×32 (footer) |

Có sẵn trong `assets/` nhưng **chưa được dùng** ở 3 màn hiện tại — giữ lại phòng khi mở rộng: `logo-mark.png`, `logo-3d.png`, `bg-mobile.png` (khả năng là biến thể nền cho breakpoint mobile — nên áp dụng nếu thiết kế mobile riêng được yêu cầu, hiện 3 file mock chỉ có 1 layout fluid, không có breakpoint mobile riêng).

Ảnh copy `assets/` gốc đã kèm trong bundle handoff này ở `design-refs/assets/` để dev có ảnh placeholder dùng tạm trong lúc chưa có ảnh thật.

## 9. Nội dung song ngữ (VI/EN)

Toàn bộ text tiếng Anh nằm trong thuộc tính `data-en="..."` đi kèm mỗi node tiếng Việt tương ứng trong `Home.dc.html` và `Product.dc.html` — đọc trực tiếp 2 file gốc trong `design-refs/` để lấy đúng cặp câu VI/EN cho từng vị trí (không note riêng ra file này vì số lượng lớn — tránh sai lệch khi copy tay). `Admin.dc.html` **chỉ có bản tiếng Việt** trong `DEFAULTS` — khi tạo bảng nội dung song ngữ, cần bổ sung thủ công cột `en` bằng cách đối chiếu `data-en` tương ứng ở 2 file public.

## 10. Files trong bundle này

```
design-refs/
  Pebble Vina Home.dc.html       # nguồn đối chiếu: Trang chủ (VI/EN, layout, hover, animation)
  Pebble Vina Product.dc.html    # nguồn đối chiếu: Sản phẩm & giải pháp
  Pebble Vina Admin.dc.html      # nguồn đối chiếu: CMS — chứa SCHEMA + DEFAULTS (mục 7)
  assets/                        # 23 ảnh/placeholder hiện dùng trong 3 màn trên
  image-slot.js                  # runtime của môi trường thiết kế — CHỈ để mở file .dc.html xem lại, không đưa vào repo Next.js
```

Mở các file `.dc.html` trực tiếp bằng browser để xem lại layout/hover/marquee/CMS hoạt động thật trước khi build.
