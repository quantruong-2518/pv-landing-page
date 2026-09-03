# 03 — Cấu trúc site

> Viết lại 2026-08-20 khi GM chốt khung ba nhánh. Bản 13-khối-một-trang cũ đã bị thay; nội dung của nó
> giữ ở `context/99-unplaced/`.

## 1. Ba nhánh — khung chuẩn

```
├── 1. HOME                     /vi
│   ├── Slogan / Hero
│   └── Why Now?                     — ba điểm bắt đầu
│       ├── Phần cứng                — 2 luận điểm: bài toán → giải pháp → kết quả
│       │   └── Timeline chip        — nằm ngay dưới phần cứng
│       ├── Phần mềm                 — ERP trung tâm, AI hỗ trợ quyết định
│       └── Đào tạo                  — theo nhu cầu, đo đầu ra
│
├── 2. SẢN PHẨM & GIẢI PHÁP     /vi/products
│   ├── 2.1 HARDWARE                 — một chip = một khối, theo thứ tự họ chip
│   │   ├── MINT                     → Sensor AI · Voice AI · Ultra-low-power edge AI
│   │   ├── PAPAYA · PAPAYA FLEX     → Vision AI · Camera · Inspection · Robotics — một khối "thông tin đôi"
│   │   ├── ESPRESSO                 → Large-model inference · AI accelerator · AI server
│   │   └── GPU / HPC                → GPU · AI training · Large-scale inference · HPC · AI data center
│   └── 2.2 SOFTWARE
│       └── AI-optimized enterprise software → CRM · ERP/Ops · Workflow · Data & reporting · AI agent
│
└── 3. LIÊN HỆ                  /vi/contact
```

> **`/vi/products` dựng lại từ bản Canva "Product - Pebble Vina" (1536×1024, 7 artboard nội dung),
> đọc và áp dụng 02/09/2026.** Giống lần HOME dựng lại từ Canva master, bản thiết kế này **thay** phần
> luật khối của trang sản phẩm ở §4 và §4b bên dưới; cây ba nhánh, thứ tự khối và bộ anchor **không
> đổi** (`#mint`, `#papaya-flex`, `#espresso`, `#gpu`, `#enterprise`, `#enterprise-ai-training`, cộng
> `#hardware`/`#software`/`#training` bọc nhóm). Ngôn ngữ thị giác cũ — hồ sơ viền mảnh, dải số đo
> mono, bệ chip vuông — bị bỏ hoàn toàn. Chi tiết giải phẫu mới: §4b.
>
> Hai điều trong bản Canva **không** được bê nguyên, có chủ ý: (1) Canva tô một màu xanh cho cả trang,
> ở đây giữ hệ ba màu danh mục đã có (phần cứng xanh · phần mềm tím · đào tạo nâu); (2) hero khối phần
> mềm của Canva là ảnh dashboard mang con số "82%" — không tra được về `docs/01-proof-bank.md` nên
> không lên trang (CLAUDE.md §2), chỗ đó dùng lại minh hoạ trừu tượng `software-enterprise-suite.webp`
> vốn không nêu con số nào.

> **Nhánh Private AI gỡ khỏi trang — GM chốt 24/08/2026.** `2.2 SOFTWARE` còn một nhánh. Khối, mục
> trong mục lục `/products`, mục trong menu di động và anchor `#private-ai` đều sinh từ
> `products.software.groups` nên biến mất theo — không có chỗ nào phải sửa tay. Đo lại sau khi gỡ:
> `/vi/products` còn **7 khối**, dài **5.717px** ở 1440 (trước 6.448), và khối index về **788/788 ở
> 390px** — đóng backlog #29 ở 390 và 430, còn thừa 106px ở 360.
>
> **Bốn khoá chữ chưa theo kịp và đang sai trên bản đang chạy:** `products.software.title`
> ("**Hai nhánh** phần mềm…") và `products.software.lead` ("**Cả hai** trả lời một câu hỏi…") —
> hai câu này người dùng nhìn thấy, đứng ngay trên khối phần mềm duy nhất còn lại; cùng với
> `meta.products.title` và `meta.products.description`, cả hai vẫn kể tên "AI riêng tư". GM biết và
> chấp nhận trạng thái tạm này khi chốt; chúng chờ một lượt qua skill `content-i18n`.
> Vật liệu gốc của nhánh giữ nguyên ở `context/02-products/2.2-software/private-ai.md` — bàn soạn
> không xoá theo trang (CLAUDE.md §1).

> **PAPAYA gộp lại với PAPAYA FLEX thành một khối "thông tin đôi" — GM chốt 24/08/2026,** đóng luôn
> `docs/05-backlog.md` #33 và #34. Lý do GM đưa ra: hai con dùng chung ứng dụng (vision/edge AI), chỉ khác
> mức hiệu năng — không phải hai sản phẩm cần hai câu chuyện riêng. Có cơ sở trong proof-bank: §D chỉ ghi
> họ chip *MOCHA → MINT → PAPAYA FLEX*, chưa từng liệt PAPAYA đứng riêng; §E2 có đúng một dòng gắn nhãn
> "PAPAYA" trần (trạm gốc 5G, ~10.000×) cạnh ba dòng "PAPAYA FLEX" (điện, hiệu suất, kích thước, cả ba vs
> Jetson Nano) — khớp với việc "PAPAYA" trong deck là tên họ/tầng hiệu năng thấp hơn, không phải một
> sản phẩm tách biệt. Khối giữ `id`/anchor `papaya-flex` (đã có ảnh, đã có content thật); tagline, body và
> dải số đo viết lại để mang cả hai mức hiệu năng — qua cổng A→E của skill `content-i18n`, không viết tay.

**Ba trang, không phải năm.** Mỗi sản phẩm là một khối có anchor (`#mint`, `#papaya-flex`,
`#espresso`, `#gpu`, `#enterprise`) chứ không phải một route riêng — vì nội dung chi tiết chưa có,
mở thêm route chỉ tạo thêm trang rỗng. Khi một sản phẩm đủ dày để đứng một mình thì tách sau; anchor
đã sẵn nên URL cũ vẫn trỏ đúng chỗ.

### Why Now — bài toán / giải pháp / kết quả

Why Now không còn là ba thẻ năng lực. Nó giúp cùng một người ra quyết định xác định bài toán đầu
tiên: hạ tầng, thông tin quản trị hay năng lực đội ngũ. Thứ tự đã chốt là **phần cứng → timeline chip
→ phần mềm → đào tạo**.

GM đổi khung ngày 26/08/2026: nhánh phần cứng chỉ giữ hai luận điểm, **điện hao vì di chuyển dữ liệu**
và **độ trễ/phạm vi bảo vệ khi đưa dữ liệu qua cloud**. Mỗi luận điểm đọc theo ba phần có nhãn rõ:
**Bài toán → Giải pháp → Kết quả**. Desktop đặt ba phần thành ba cột thẳng hàng; mobile xếp dọc đúng
thứ tự trong từng luận điểm. Mũi tên chỉ đường đọc, không biến ba phần thành một lời đảm bảo kết quả.
Không cần ảnh hoặc bộ icon trang trí để khối hoàn chỉnh.

Ngoại lệ duy nhất cho luật không lặp thông số trên HOME là hai benchmark đã xác minh của PAPAYA FLEX:
điện năng so với NVIDIA Jetson Nano và hiệu suất ResNet-50. Đối tượng so sánh và workload phải đứng
cùng con số. Không dùng claim về nước làm mát, không mở rộng benchmark thành kết quả của mọi chip,
mọi thiết bị hoặc mọi workload.

## 2. Định tuyến

| Route | Trang | h1 |
|---|---|---|
| `/vi` | HOME | slogan trong hero |
| `/vi/products` | SẢN PHẨM & GIẢI PHÁP | `products.intro.title` |
| `/vi/contact` | LIÊN HỆ | `contact.intro.title` |

**Chỉ tiếng Việt.** Bản EN bị gỡ 2026-08-23 — ba trang trên là toàn bộ site. **Tiền tố `/vi` giữ lại
có chủ ý**: hôm nay chỉ một ngôn ngữ, nhưng thêm ngôn ngữ sau không phải dời lại từng URL và xin
redirect lần nữa. Gốc trần không phục vụ gì:

| Vào | Ra |
|---|---|
| `/` | 308 → `/vi` |
| `/products` | 308 → `/vi/products` |
| `/contact` | 308 → `/vi/contact` |

Redirect khai ở `next.config.mjs`, chạy trước filesystem route nên không cần một `app/page.tsx` rỗng.
Hai URL không tiền tố nằm trong bảng vì chúng từng sống thật một lúc (commit 6547770).

Kỹ thuật: **một root layout** `app/layout.tsx` (`<html lang="vi">`); hai route group `(en)`/`(vi)` cũ
đã bỏ vì không còn lý do tồn tại. Đường dẫn tính bằng `lib/routes.ts` — `LOCALE_BASE` là chỗ duy nhất
biết tiền tố. Cả 3 trang đều prerender tĩnh.

## 3. Luật khối — đã nới

Mọi `<Section>` vẫn mang `scroll-snap-align: start`, nên cuộn luôn dừng ở **đầu** một khối. Khác bản cũ
ở chỗ **không phải khối nào cũng cao đúng một màn**:

| Khối | Chiều cao |
|---|---|
| Hero HOME, **hero `/products`**, **khối LIÊN HỆ** | `min-h-[calc(100svh - var(--header-h))]` (`screen`) |
| **Why Now**, Lịch sử, khối danh mục và từng khối sản phẩm | theo nội dung |

> **Khối index của `/products` bỏ `screen` ngày 02/09/2026** cùng lần dựng lại từ Canva: hero mới
> nhận vai khối mở màn, còn danh mục sáu thẻ cao 1.332px ở 390px — không viewport điện thoại nào
> chứa nổi. Chi tiết: §4b.

Tám khối `/products` dùng bước đệm hẹp `<Section dense>` (`py-7 sm:py-12 lg:py-14` thay cho
`py-14 sm:py-20 lg:py-24`): mỗi khối đã tự mở bằng một dải tối và tự đóng bằng một nút, nên ranh
giới đã rõ mà không cần thêm 80px trống, tám lần.

> **`/vi/contact` bỏ khối `<dl>` điện thoại/email và khối văn phòng + pháp lý ngày 2026-08-24.**
> GM chốt trực tiếp: mobile-ui-reviewer đo được footer lặp y nguyên bốn dữ kiện đó ngay sau nút
> submit (`docs/05-backlog.md` mob-06), và GM quyết đi xa hơn khuyến nghị của vòng review — bỏ hẳn
> khối đó khỏi trang LIÊN HỆ thay vì chỉ bớt ở footer. Trang giờ chỉ còn `SectionHead` (title + lead)
> và form; điện thoại/email/văn phòng/pháp lý sống duy nhất ở footer. Bảng cũ liệt "khối văn phòng"
> — không còn khối đó nữa.

> **Rồi `/vi/contact` gộp luôn hai khối còn lại thành một, cùng ngày 2026-08-24.** GM chốt trực
> tiếp: một nền trắng, lời mời và form nằm chung **một** `<Section id="book" screen>` — hero tối,
> `crossbar` và `aura` bị bỏ. Từ 768px, cột lời mời hẹp và cột form rộng; dưới ngưỡng đó xếp chồng,
> lời mời trước, form sau. **Ảnh văn phòng bị bỏ khỏi route ngày 2026-08-26**: cột trái chỉ giữ
> kicker, một headline trực tiếp và một câu cam kết 24 giờ được nhấn thị giác.
>
> Vì thế bảng trên đọc là **khối LIÊN HỆ**, không còn là "hero của `/contact`" — trang chỉ còn đúng
> một khối. **Đo được 836px trên budget 836px ở 1440×900 trước khi viết lại copy: khối này không còn
> một pixel dư nào.** Bản lean bỏ Figure và khoá `contact.intro.lead` ở đúng một câu
> (`content-system/specs/contact.yaml` → `decisions/one-white-surface`).

> **Why Now bỏ `screen` ngày 2026-08-21.** Đo trên build production: khối này cao **1018px** ở 1440×900 (budget 836px) và **1093px** khi mới điền chữ. Quan trọng hơn: đo lúc còn là i18n key thì đã **922px** — tức khối tràn từ trước khi có một chữ nào, do ảnh minh hoạ 248px cộng lưới ba cột. Cắt chữ không cứu được, nên trả nó về chiều cao theo nội dung. `snap-start` giữ nguyên nên nhịp cuộn không đổi.

Container cuộn là `html`:

```css
scroll-padding-top: var(--header-h);      /* 3.5rem mobile · 4rem ≥640px */
@media (min-width: 768px) and (min-height: 640px) {
  html { scroll-snap-type: y proximity; }
}
```

> **`mandatory` → `proximity` ngày 2026-08-24.** Với những khối cao theo nội dung và cao hơn một
> màn, `mandatory` chỉ chừa đúng **hai** chỗ dừng cho mỗi khối — một chỗ cắt hàng 4 pillar xuống
> dưới fold, một chỗ giấu `h2` dưới header — và không có gì ở giữa (`docs/07-loop/home.md` ux-03).
> `proximity` vẫn bắt cú lướt dừng gần đầu khối, nhưng không biến phần giữa của một khối cao thành
> chỗ không tới được.

**Vì sao nới:** khung mới có 9 khối trên `/products` với độ dày rất khác nhau, và phần lớn `body` còn
trống chờ nội dung. Ép mọi khối cao trọn màn khi chưa có chữ chỉ tạo ra những màn hình rỗng. Đo thực
tế ở 1440×900: mỗi khối sản phẩm ~860px ≈ vừa một màn, nên nhịp "một sản phẩm = một màn" vẫn giữ được
mà không cần ép.

**Hệ quả khi viết nội dung vẫn còn nguyên:** khối `screen` mà nhồi thêm chữ là tràn màn. Muốn thêm ý
thì cắt ý khác hoặc tách khối mới.

## 4. Nhịp thị giác

```
HOME                          /products (Canva, 02/09/2026)   /contact
tối ▓▓▓  Hero                 tối ▓▓▓  Hero (screen)          sáng ░   Lời mời + form
sáng ░   01 Why now           sáng ░   Danh mục 6 thẻ         tối ▓▓▓  Footer
tối ▓▓▓  02 Lịch sử           tối ▓▓▓  MINT
tối ▓▓▓  Footer               tối ▓▓▓  PAPAYA · PAPAYA FLEX
                              tối ▓▓▓  ESPRESSO
                              tối ▓▓▓  E-Series
                              tối ▓▓▓  Enterprise
                              tối ▓▓▓  Đào tạo AI      ← khối cuối, nút của nó đóng trang
                              tối ▓▓▓  Footer
```

**`/products` không còn xen kẽ sáng/xám.** Sáu khối danh mục đều là **dải tối**, mỗi khối mang một
**đảo trắng** ở giữa (bảng thông số / hàng module / hàng bước). Ranh giới giữa hai khối không do màu
nền vẽ nữa mà do đảo trắng và hàng ứng dụng vẽ — đó là bố cục Canva. Trang chỉ còn đúng **một** mặt
sáng liên tục: khối danh mục dưới hero.

Vì mọi khối đều tối, hệ ba màu danh mục được **đổi lại trong `.tone-dark`** (globals.css) chứ không
đổi utility: `--color-hardware` `#7aa6f2` · `--color-software` `#b39ae0` · `--color-training`
`#e0a684`, lần lượt 7,0:1 · 7,0:1 · 8,1:1 trên nền `#101a2e`. Bản gốc sáng chỉ đạt ~3:1 ở đó.
Đảo trắng bên trong dải tối dùng lớp `.tone-light` — bản đối xứng của `.tone-dark`, khai lại đúng bộ
token sáng để chữ phụ, hairline và nhãn trạng thái đọc lại trên nền trắng.

Trên HOME, dải tối vẫn là chỗ mắt **phải** dừng: mở màn, lịch sử công ty mẹ.

`/contact` là ngoại lệ có chủ ý kể từ 2026-08-24: trang chỉ có một việc, nên nó chỉ có một nền —
trắng. Không có dải tối nào để "mở màn" vì không có gì phải cuộn qua trước khi tới form.

> ~~**Một CTA cho cả trang (GM, 24/08/2026).**~~ **Bị thay bởi bản Canva 02/09/2026: mỗi khối một
> nút.** Bản Canva đặt nút "đăng ký tư vấn" ở cuối **từng** khối phần cứng / phần mềm / đào tạo, và
> đó là bố cục được chốt. Sáu nút, cùng một nhãn, cùng trỏ `/vi/contact`: người mua quyết ở khối vừa
> thuyết phục họ, không phải bốn màn sau đó. Khối "lời mời" cuối trang cùng form nhúng của nó
> **đã bị gỡ** — bản Canva không có artboard đóng trang, và `/vi/contact` là toàn bộ cuộc trao đổi
> chứ không phải một bản sao thứ hai của nó. Nút CTA trên header của `/products` vì thế trỏ thẳng
> `/vi/contact` thay cho anchor `#book` đã biến mất.
>
> Hai khoá `products.followUp.kicker` và `products.followUp.title` không còn được render. Chúng vẫn
> nằm trong `types.ts` và `vi.ts` cho tới khi `content-system/specs/products.yaml` cho chúng nghỉ —
> xoá copy đi qua pipeline `content-i18n`, không xoá tay (CLAUDE.md §6).

## 4b. Giải phẫu một khối sản phẩm — bản Canva 02/09/2026

> **Luật "một chip = một màn" (GM, 24/08/2026) không còn áp cho `/products`.** Bản Canva "Product -
> Pebble Vina" định nghĩa một khối sản phẩm là bốn tầng đọc liên tiếp, không phải một khung hình.
> Ép bốn tầng đó vào một viewport là bỏ bớt một tầng. Khối `screen` duy nhất còn lại trên trang là
> **hero**; mọi khối khác cao theo nội dung, `snap-start` theo đúng luật §3 (chỉ khối `screen` mang
> snap stop).

**Bốn tầng, theo thứ tự, giống hệt nhau ở cả sáu khối:**

```
1. dải tối     kicker "01 · Phần cứng" → tiêu đề dài → tagline → body → hàng pill
               (nguồn gốc · trạng thái · kiến trúc)   ·   ảnh render bên phải
2. đảo trắng   "THÔNG SỐ CHÍNH" + ô số đo đánh số 01/02/03/04
               (họ có variant → mỗi variant một đảo; E-Series thêm đảo SOFTWARE STACK)
3. hàng ứng dụng  thẻ ảnh (rail dưới md, lưới từ md) hoặc thẻ chữ khi họ chip không có ảnh
4. một nút     "Liên hệ ngay →" tới /vi/contact
```

- **Đảo trắng dùng `.tone-light`**, nên nhãn `shipped`/`roadmap` bên trong nó vẫn là cặp màu sáng.
  Trên dải tối, cặp màu của `.tone-dark` vẫn dùng — nhãn không bao giờ mất nghĩa vì đổi nền.
- **Mọi `note` của số đo in đầy đủ, không rút, không tooltip.** Nó là biên mà con số chỉ đúng bên
  trong (proof-bank §E2). PAPAYA FLEX ba benchmark vs Jetson Nano, PAPAYA ~10.000× vs NVIDIA L4 ở
  trạm gốc 5G, E-Series dòng RDMA — cả sáu chú thích đứng ngay dưới con số của chúng.
- **Họ có hai variant thì có hai đảo, không gộp bảng.** Gộp là cách một benchmark mất phần "đo trên
  cái gì".
- **Ảnh render nằm thẳng trên dải tối**, không có bệ trắng: cả sáu file chip đều là ảnh cắt nền có
  kênh alpha (kiểm 02/09/2026), nên một bệ phía sau chỉ vẽ thêm cái hộp mà bức ảnh không có. Hai
  variant thì hai render đứng cạnh nhau, mỗi cái một thẻ tên xanh (`variant.name`).
- **Ảnh ứng dụng thì ngược lại**: cũng là ảnh cắt nền, nhưng vật thể tối, nên mỗi thẻ ứng dụng là
  một thẻ **sáng trọn vẹn** — ảnh trắng bên trên và chân thẻ tối là một đường nối ngang giữa thẻ.
- **Hàng module (phần mềm) và hàng bước (đào tạo) là cùng một vật**: vòng tròn icon + số thứ tự +
  tiêu đề + mô tả, nối bằng một đường nét đứt. Đường đó chỉ vẽ từ `lg`, nơi các bước thật sự đứng
  thành một hàng; mỗi thẻ tự vẽ đoạn của nó tới thẻ sau, nên đoạn cuối không thừa ra.
- **Kết cấu mạch trên dải tối là CSS**, không phải ảnh: hai lưới gradient hai bước (28px và 112px)
  cộng một quầng radial, mask về góc có ảnh render (`.product-band` trong globals.css). Không file,
  không request, không LCP.
- **Ô ảnh chờ vẫn tự biết mình rộng bao nhiêu** — `MediaPending` giữ nguyên container query. Thẻ
  E-Series trong danh mục hiện là ô chờ (`gpu.media.src` còn trống).

**Khối danh mục là một `<Section>` riêng, cao theo nội dung.** Bản Canva vẽ nó nằm ngay dưới hero
trong cùng một trang, nhưng sáu thẻ cộng bốn nhãn nhóm không lọt một viewport điện thoại — nhét vào
khối `screen` là tái phạm đúng thứ §3 cảnh báo. Lưới: 2 cột ở điện thoại (nhóm NPU chiếm cả hai cột
với ba thẻ, rồi GP-GPU | Phần mềm cạnh nhau, Đào tạo xuống dòng), 6 cột từ `lg` (NPU 3 · GP-GPU 1 ·
Phần mềm 1 · Đào tạo 1).

**Đo trên build production, 02/09/2026** (`scrollWidth == clientWidth` ở cả tám bề ngang, không có
tràn ngang ở đâu):

| | 360×740 | 390×844 | 430×932 | 768×1024 | 1024×768 | 1440×900 | 1920×1080 |
|---|---|---|---|---|---|---|---|
| Hero (`screen`, budget) | **684/684** ✔ | **788/788** ✔ | **876/876** ✔ | **960/960** ✔ | **704/704** ✔ | **836/836** ✔ | **1016/1016** ✔ |
| Danh mục | 1332 | 1333 | 1332 | 1657 | 568 | 563 | 563 |
| MINT | 1239 | 1220 | 1218 | 1321 | 1050 | 1237 | 1237 |
| PAPAYA · PAPAYA FLEX | 1865 | 1794 | 1790 | 1565 | 1233 | 1245 | 1245 |
| ESPRESSO | 1311 | 1334 | 1287 | 1366 | 1050 | 1237 | 1237 |
| E-Series | 2204 | 2095 | 2036 | 1912 | 1233 | 1097 | 1097 |
| Phần mềm doanh nghiệp | 1553 | 1487 | 1496 | 1451 | 786 | 865 | 865 |
| Đào tạo AI | 1405 | 1374 | 1384 | 1335 | 744 | 844 | 844 |
| cả trang | 12.435 | 12.242 | 12.236 | 12.257 | 7.856 | 8.387 | 8.567 |

Trang dài gần gấp đôi bản dossier cũ (6.6k → 12.2k ở 390px). Đó là cái giá của bốn tầng và nó là
bố cục đã chốt, không phải một hồi quy: mỗi khối giờ mang đủ ảnh render, bảng số đo có chú thích,
hàng ứng dụng có ảnh và một nút.

<details>
<summary>Số đo của bản dossier cũ, giữ làm mốc lịch sử</summary>

Đo trên build production sau khi viết lại:

| | điện thoại 390×844 (budget 788) | điện thoại 360×800 (budget 744) | desktop 1309×818 (budget 754) |
|---|---|---|---|
| MINT | **690** ✔ | **677** ✔ | **756** (+2) |
| PAPAYA FLEX | **705** ✔ | **692** ✔ | 854 (+100) — hai số đo, mỗi số một chú thích 4 dòng |
| ESPRESSO | **699** ✔ | **725** ✔ | **767** (+13) |
| GPU | **476** ✔ | **472** ✔ | **737** ✔ |
| Phần mềm doanh nghiệp | **788** (khít) | 788 (+44) | **630** ✔ |
| ~~AI riêng tư~~ | *nhánh gỡ 24/08/2026 — xem §1* | — | — |
| Index | 888 (+100, backlog #29) | 918 (+174) | **754** ✔ |
| cả trang | **6.572px** (trước vòng này: 9.910) | 6.659 | **6.406px** |

> **Bảng trên là số của vòng viết lại 20–23/08, giữ lại làm mốc.** Vòng review 24/08 đã đổi phần lớn
> trong đó. Đo lại trên Chrome ở **390×844** (budget 788): MINT **674** · PAPAYA FLEX **692** ·
> ESPRESSO **717** · GPU **464** · Phần mềm doanh nghiệp **788** · Index **788 ✔**. Ở **1455×900**
> (budget 836, không cùng khung với cột desktop cũ): 745 · 844 · 756 · 726 · 631 · 836. Ba nguyên
> nhân, theo thứ tự tác động: nhánh Private AI bị gỡ, khối `screen` có bậc đệm dọc riêng cho điện
> thoại (`py-14` → `py-6`, chỉ ở base), và khung ảnh ứng dụng đổi 16/10 → 16/9.

**Bốn khối phần cứng vừa một màn trên điện thoại.** Hai khối phần mềm và khối index thì chưa: phần
còn lại của chúng là lượng chữ (5 module × tiêu đề + mô tả), không phải khoảng trắng.

Một sản phẩm = một `<Section dense>`. **Một khung lưới, hai hình học:**

```
điện thoại (<768)              md (768–1023)                lg (1024+)
──────────────────────         ─────────────────────────    ──────────────────────────
[ ảnh │ nhận dạng    ]         [ nhận dạng ──────────── ]   [ nhận dạng ────────────── ]
[ mô tả ─────────────]         [ ảnh 4/12 │ mô tả       ]   [ ảnh 4/12 │ mô tả         ]
[ số đo → trượt ─────]         [          │ số đo →     ]   [          │ số đo (2 cột) ]
[ rail ứng dụng → ───]         [ rail ứng dụng ──────── ]   [ rail ứng dụng ────────── ]
```

- **Trên điện thoại ảnh đứng cạnh cái tên, không đứng trên đoạn chữ.** Một thumbnail 139px cạnh dải
  nhận dạng tốn **0px chiều cao**; cùng tấm ảnh đó trải hết bề ngang tốn 280px của một budget 788px,
  và đặt nó thành một cột riêng thì cột chữ chạy quá đáy ảnh 200px. Đoạn mô tả nhờ thế được trọn
  350px — đúng bề ngang cần để đọc ra văn xuôi.
- **Từ `md` dải nhận dạng trở lại là mốc ngang full-width** phía trên chỗ chia cột (`ux-10`), và là
  **một dòng**: tên · tagline · nhãn nguồn gốc đẩy về cuối dòng.
- **Không còn nhãn "ĐÃ CÓ" (GM, 2026-08-24).** Hàng đang bán là mặc định; nhãn đó không nói gì với
  người mua và trước đây in **hai lần mỗi khối** — một ở sản phẩm, một ở con số. Chỉ `roadmap` mới
  mang nhãn, đúng quy ước dòng thời gian ở HOME vẫn dùng (`page-home.tsx`: `status="roadmap"`).
  Luật #1 không đổi ở chỗ nó có nghĩa: `status` vẫn là trường bắt buộc, vẫn quyết định cái gì được
  gắn nhãn, và dòng phương pháp + nguồn dưới mỗi số đo không bao giờ bị rút.
- **Ảnh chiếm 4/12 từ `md`** (trước là 5/12): bệ chip vuông nên bề ngang quyết định chiều cao — ở
  cửa sổ 931px nó cao 340px và một mình nó đẩy khối vượt màn laptop thấp.
- **Số đo trượt ngang dưới `lg`**, giống hệt affordance của rail ứng dụng: hai số đo xếp dọc là 371px
  của một màn điện thoại, và **không được phép bỏ bớt gì** — mỗi số giữ nguyên phương pháp đo và
  nguồn. Từ `lg` cột chữ rộng 701px nên chúng nằm hai cột. Một số đo thì không phải rail: nó giữ trọn
  bề ngang để rule đậm vẫn chạy hết (`ux-05`).
- **Còn đúng một đường kẻ trong khối** (GM: bớt divider): hairline dưới dải nhận dạng, và chỉ từ `md`.
  Hairline mở dải số đo và hairline mở rail đã bỏ — chữ mono nhỏ mở dải là đủ, và rule đậm của mỗi
  số đo đứng ngay dưới đó 40px là một đường kẻ thứ hai không ai cần.
- **Rail ứng dụng**: thẻ = ảnh nhỏ + nhãn, **không mô tả** (GM). Bề ngang thẻ cố định `8rem` ·
  `sm:10rem` · `lg:11rem` nên năm rail trên trang cắt ảnh cùng một cỡ. Dưới `lg` rail tràn ra mép màn
  hình (`-mx-5 px-5` + `scroll-pl-5`).
- **Ô ảnh chờ tự biết mình rộng bao nhiêu.** `MediaPending` dùng **container query**: dưới ~15rem chỉ
  in nhãn "Ảnh đang chờ", trên ngưỡng đó in cả brief (`alt`) — cùng một bệ chip là 139px cạnh dải
  nhận dạng trên điện thoại và 364px trong cột desktop, nên câu hỏi "có in brief được không" là câu
  hỏi về **cái khung**, không phải về bề ngang trang.
- **Sản phẩm chưa có chữ thì ảnh không đổi bên**: lật một khối có cột chữ rỗng là để nửa màn trống.

**Đầu mục 2.1 / 2.2 là một dải mỏng, không phải hành khách và cũng không phải một khối.** Trước đây nó
cưỡi lên sản phẩm đầu nhóm và tốn của MINT ~230px — đúng thứ khiến "một chip một màn" gãy. Trả nó về
một `<Section>` riêng thì tái phạm `ux-04` (một khối ngăn cách chiếm một điểm dừng rồi cắt cụt khối
sau). Nên: một dải tối cao ~100px, kicker và tiêu đề chung một dòng, lead ở dòng dưới. Nó vẫn vẽ ranh
giới 2.1/2.2 mà §4 cần, vẫn giữ anchor `#hardware` / `#software`, và quá thấp để bị nhầm là một màn.

**Khối phần mềm đi cùng một nhịp** (`SoftwareBlock`): cùng khung lưới, cùng hai hình học, ảnh 16/10
thay cho bệ chip. `modules` chạy **hết bề ngang dưới hàng ảnh–mô tả** (2 cột từ `sm`, 3 cột từ `lg`)
chứ không nằm trong cột chữ: năm module xếp dọc trong một cột 197px trên điện thoại là một khối không
màn nào chứa nổi, còn trên desktop ba module cuối đứng cạnh khoảng không. Hàng `targets` trượt ngang
dưới `sm` — vai "hàng đóng khối" mà rail ứng dụng giữ ở khối phần cứng — hiện không khối phần mềm nào
dùng tới, vì nhánh duy nhất còn lại không khai `targets`.

</details>

## 5. Bảy ô ảnh

Ô ảnh là `Media { src?, alt }` trong i18n. `src` trống thì `<Figure>` vẽ placeholder có thiết kế — lưới
crossbar, khung ngắm 4 góc, và chính chữ `alt` — nên chỗ trống tự nói nó chờ ảnh gì. Danh sách ô, tỉ lệ
và art direction: `context/media-plan.md`.

## 6. Nội dung chờ điền

Tiêu đề khối, tên sản phẩm, tên năng lực, mốc lịch sử và số đo: **đã điền**. Toàn bộ `lead` và `body`:
**để trống có chủ ý**, bản nháp nằm ở `context/`. Component bỏ qua chuỗi rỗng thay vì vẽ khoảng trắng,
nên trang vẫn đọc được ở trạng thái này.

**Ô mới mở ngày 02/09/2026 khi dựng lại `/products` theo Canva** — tất cả đang `""`, chờ một lượt
`content-i18n`:

| Khoá | Canva viết gì ở đó |
|---|---|
| `products.intro.catalogTitle` | "DANH MỤC CHIP AI VÀ GIẢI PHÁP AI" |
| `products.intro.catalogLead` | một dòng dẫn dưới tiêu đề đó |
| `products.hardware.catalogGroups.npu` | "DÒNG CHIP NPU AI" |
| `products.hardware.catalogGroups.gpu` | "GP-GPU SOLUTION" |
| `products.hardware.items[*].headline` | tiêu đề dài của khối, ví dụ "MINT - CHIP ANALOG PIM CHO EDGE AI TẠI THIẾT BỊ" |
| `products.software.groups[0].headline` | "NỀN TẢNG PHẦN MỀM TÍCH HỢP DỮ LIỆU VÀ AI CHO DOANH NGHIỆP" |
| `products.training.offer.headline` | "ĐÀO TẠO AI DOANH NGHIỆP THEO NHU CẦU THỰC TẾ" |
| `products.training.offer.calloutNote` | dòng nhấn "Lộ trình 2027 tập trung vào khảo sát nhu cầu…" |
| `…espresso.capabilities[*].dateNote` | "Dự kiến Q3/2026" dưới nhãn ứng dụng roadmap |

`headline` trống thì component in `name` — một `<h2>` không bao giờ được rỗng. Hai nhãn nhóm danh mục
trống thì hàng thẻ vẫn giữ đường kẻ màu và vị trí của nó, chỉ thiếu chữ.

```bash
grep -o ': ""' web/content/vi.ts | wc -l    # còn bao nhiêu ô trống
```

## 7. Header và footer

**Header** — một hàng cao `var(--header-h)`, dính, nền tối xuyên suốt: wordmark · 3 mục ·
**đúng một** nút hành động (nút chuyển ngữ đã gỡ cùng bản EN, 2026-08-23). Dưới `lg` cụm điều hướng
thu vào disclosure `<details>` thuần HTML (không JS, không lệch hydrate) và menu đó chứa cả 6 anchor
sản phẩm. **Nút hành động hiện ở mọi bề rộng**, kể cả
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
