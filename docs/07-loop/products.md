# Vòng hoàn thiện — PRODUCTS (/vi/products)

> Bắt đầu 2026-08-24. Trạng thái: đang chạy. Vòng hiện tại: **2/3** (mở lại 2026-09-03).
>
> **Vòng 2 đo một trang khác với vòng 1.** Ngày 02–03/09/2026 `/vi/products` được dựng lại từ bản
> Canva master "Product - Pebble Vina" (7 artboard). Mọi số đo của vòng 1 dưới đây là **lịch sử**;
> chúng đo `page-products.tsx` một khối 700 dòng với `ChipBlock`/`ChipPlinth`/`AppRail`, và những
> component đó không còn tồn tại. Sổ vòng 2 nằm ở cuối file.

## Tình trạng đầu vào
- build: ✔        · ô trống trong vi.ts: 0 — content/vi.ts được viết đầy đủ bởi một phiên khác trong lúc vòng này đang chạy (2026-08-24 ~14:22). content-market-critic (chạy trước 14:22) báo 114 chuỗi còn là key path trên trang này — **đã lỗi thời**, cần review ngôn ngữ lại từ đầu cho nội dung mới.
- kế thừa từ vòng trước: không có (vòng đầu tiên)
- server dùng để đo mobile: production build tại :3100

## Sổ finding

| id | round | severity | owner | where | requirement | state | number |
|---|---|---|---|---|---|---|---|
| mob-09/ux-08 | 1 | BLOCKER | engineer | page-products.tsx | Trang danh mục phải có hành động liên hệ ngay trong trang, không phụ thuộc menu header | fixed | 0→1 link tới /vi/contact. **Lưu ý:** engineer đặt nút cuối mỗi khối, phiên song song sau đó thay bằng 1 `<PageCta>` cuối trang duy nhất — khớp quyết định GM 2026-08-24 "một CTA mỗi trang, không phải mỗi khối" (memory `one-cta-per-page-not-per-block`). Cần re-verify vì trang vẫn đang bị sửa tiếp (xem NOTICED) |
| mob-15/ux-01 | 1 | BLOCKER | engineer | site-header.tsx, page-products.tsx | Dải 768-1023px phải fit ngân sách + nav dùng được | fixed (còn dư nhỏ) | 1023×768: 755/703→728,6/704 — còn dư 24,6px, cần rút ngắn h1/lead (việc của writer) để về khít hẳn; iPad chuẩn 768×1024 khít tuyệt đối |
| mob-10/ux-06 | 1 | MAJOR | engineer | globals.css --color-subtle vùng sáng | 4,5:1 cho mọi chữ token subtle | fixed | 0 node lỗi trên PRODUCTS (trước 17-33 tuỳ đo), cả 5 viewport |
| ux-04/mob-14 | 1 | MAJOR | engineer | page-products.tsx | Khối ngăn cách không được tự chiếm 1 điểm dừng snap rồi cắt cụt khối kế tiếp | fixed | #hardware/#software gộp vào khối sản phẩm đầu tiên của nhóm; số section 9→7; anchor #hardware/#software vẫn đúng vị trí |
| ux-05 | 1 | MAJOR | engineer | page-products.tsx:158 | Dải "Số đo" không được hứa 3 cột rồi chỉ có 1 spec | fixed | số cột theo đúng số spec thật có; rule chạy hết 605,3/605,3px (trước dừng ở 339/1072px) |
| ux-10 | 1 | MAJOR | engineer | page-products.tsx:208 | Cột ảnh và cột chữ phải chia sẻ 1 mốc ngang chung | fixed | offset 10-119px → 0px cả 6 khối (`items-center`→`items-start`, phiên song song thêm 1 thanh identity full-width phía trên) |
| mob-12 | 1 | MINOR | engineer | ui.tsx:153,168 | Nhãn trạng thái/nguồn gốc phải đọc được ở 360px | fixed | OriginTag 9,28→11,2px; StatusBadge 9,6→12px |
| mob-13 | 1 | MINOR | engineer | page-products.tsx:98 | Hàng chỉ mục cần khoảng cách rõ hơn hairline | fixed (phần layout) | 0,1-0,2px → 6px; hàng cao 57,9px. Phần tagline vỡ dòng vẫn treo cho writer |
| ux-15 | 1 | MINOR | engineer | site-header.tsx:48, page-products.tsx:103, site-footer.tsx:11 | Một ngôn ngữ hover duy nhất | fixed (một phần) | 6 kiểu + 1 không có → 3 quy tắc (link chữ→accent · control viền→border-accent · nút đặc→opacity-90). Chưa hợp nhất tuyệt đối, engineer tự ghi là "không phải unify hoàn toàn" |
| ux-19 | 1 | MINOR | engineer | page-products.tsx:30 | Sửa hố trống 4-vs-2 cột nav index | **rejected** | đo lại sau khi sửa mob-13: hố 520×116px → 520×127,7px (tệ hơn 11,7px, đánh đổi trực tiếp với khoảng cách hàng mob-13). Engineer không rebalance 3/3 vì đó là ranh giới phần cứng/phần mềm theo docs/03-structure.md §1 — chấp nhận theo đúng phương án "bỏ qua" mà ledger đã cho phép |
| ux-16 | 1 | MINOR | engineer | site-header.tsx:37 | Token --header-h khớp chiều cao thật | fixed | tất cả 6 anchor sản phẩm + #hardware/#software lệch ≤0,3px (trước 1px) |
| eng-01 | 1 | MINOR | ux-reviewer | ui.tsx `ChipPlinth` (`md:sticky`) | Bệ chip dính khi cuộn có phá nhịp snap không — quyết định của reviewer, không phải engineer | open | ghim đúng 88px (header 64 + 24) suốt dải số đo ở 854px, nhả ở đáy ô. Ở ≥1024px cột chữ (336–370px) thấp hơn bệ (419px) nên sticky vô hiệu — không hại, cũng không giúp |
| eng-02 | 1 | MINOR | ux-reviewer | page-products.tsx khối `#gpu` | Khối GPU: cột chữ 45px cạnh bệ ảnh 419px, mất cân đối ở desktop | open | đo 1309px. Gốc là nội dung mỏng (0 spec, body ngắn), không phải bố cục — liên quan backlog #18 |
| eng-03 | 1 | MINOR | mobile-reviewer | ui.tsx `AppRail` | Rail 15 thẻ placeholder phải đọc ra "chờ ảnh", không phải "vỡ", trên máy thật | open | 4 rail × 3–5 thẻ; thẻ 237px @360 · 334px @491 · 324px @854, ló 103–137px; scrollLeft mở ra = 0, thẻ đầu thẳng lề 20px; 0 ô chạm <44px trong `<main>` |
| eng-04 | 1 | MINOR | mobile-reviewer | page-products.tsx `ChipBlock` (breakpoint `md`) | Dải 768–1023px của **khối sản phẩm** (khác khối index ở mob-15) phải là bố cục riêng | fixed | ở 768px: tổng trang 11.754 → **9.593px** (−18%); khối sản phẩm 1666–1927 → **991–1376px**; ô ảnh 704×563 → **275×275**. Điểm gãy hai cột hạ từ `lg` xuống `md` |

state: open · assigned · fixed · verified · rejected · routed · backlog

## Việc route sang GM (không phải code)

> **GM đã quyết trực tiếp trong phiên 2026-08-24 — ba mục dưới đây khép lại phần lớn mob-11/ux-02.**
> 1. **Ảnh chip: đã cấp.** Bốn render 3D (MINT · PAPAYA · PAPAYA FLEX · ESPRESSO) → `web/public/media/chips/*.webp`,
>    chạy qua `<ChipPlinth>`. 4/5 ô phần cứng hết trống; khối MINT không còn cảnh nhãn "sản xuất hàng loạt
>    từ 5/2023" đứng cạnh một ô rỗng. Còn thiếu: **GPU** (rack thật), 2 ô software, ảnh văn phòng.
> 2. **ESPRESSO được dùng render 3D** — ngược với khuyến nghị "sơ đồ khối" của ux-02 bên dưới. Đổi lại,
>    `<ChipPlinth>` **ghim `StatusBadge` "Dự kiến" vào trong khung ảnh**, nên nhãn không rời ảnh được kể
>    cả khi ai đó chụp màn hình. Ràng buộc này ghi ở `context/media-plan.md` luật 4.
> 3. **Họ chip tách năm khối:** MINT → PAPAYA → PAPAYA FLEX → ESPRESSO → GPU. Khung `#papaya` đã dựng và
>    đã có ảnh, **nội dung chưa có một chữ** → backlog #33, phải qua cổng A→E của `content-i18n`.
>
> **Còn cần GM trả lời:** số đo trạm gốc 5G (320–332 W → 0,03 W) thuộc PAPAYA hay PAPAYA FLEX —
> proof-bank §E2 ghi **PAPAYA**, trang đang để ở khối **FLEX**. Backlog #34. Không tự chuyển: đây là
> quyết định về fact, không phải về bố cục.

- ~~mob-11/ux-02~~ (phần phần cứng đã giải quyết ở trên; giữ nguyên phần còn lại) — (BLOCKER về niềm tin, không phải BLOCKER kỹ thuật) — 6/6 ảnh sản phẩm là khung placeholder rỗng, 12,5-14,3% chiều cao trang. Khối MINT đặc biệt nghiêm trọng: nhãn "Đã có/sản xuất hàng loạt từ 5/2023" đứng cạnh khung ảnh rỗng — tự mâu thuẫn. Cần GM quyết: chụp ít nhất MINT + PAPAYA FLEX, hoặc khối ngừng chừa chỗ ảnh full-size trên các trang chưa có ảnh.
- ux-02 đề xuất loại ảnh cho từng slot còn thiếu:
  - **Index /vi/products (màn mở đầu)** — 1 ảnh so sánh tỉ lệ 3 chip (MINT, PAPAYA FLEX, khối khái niệm ESPRESSO có nhãn rõ) trên 1 nền trung tính, kèm vật tham chiếu kích thước (đồng xu/đầu ngón tay). Vừa khít trong 359px trống hiện có, không phá luật `screen`.
  - **MINT, PAPAYA FLEX** — ảnh chụp sản phẩm thật, góc 3/4, nền xám trung tính, CÙNG một bộ rig/góc/nền (đúng brief alt text đã viết sẵn).
  - **ESPRESSO** — sơ đồ khối kỹ thuật (không phải render 3D — CLAUDE.md §2 điều 4 và media-plan cấm), cùng phong cách nét vẽ với bộ 3 minh hoạ Why Now.
  - **GPU & tính toán hiệu năng cao** — ảnh chụp thực tế 1 tủ rack Pebble Vina đã tích hợp, chính diện, ánh sáng nguội. Nếu chưa có rack thật thì đây là vấn đề claim (đưa strategy-reviewer), không phải vấn đề nhiếp ảnh.
  - **Enterprise software** — ảnh chụp màn hình sản phẩm thật, khung trình duyệt tối giản. Backlog #17 ghi nhánh phần mềm doanh nghiệp chưa có sản phẩm xác nhận — GM quyết trước khi chụp bất cứ gì.
- ~~ux-14~~ — **ĐÓNG 24/08/2026, mất đối tượng.** GM gỡ nhánh Private AI khỏi trang, nên slot ảnh mà finding này nói tới không còn tồn tại. Cố ý **không** ghi `verified` (không ai sửa nó) và **không** ghi `rejected` (số đo lúc nêu vẫn đúng). Nếu nhánh quay lại thì finding này quay lại cùng nó — brief giữ ở `context/02-products/2.2-software/private-ai.md`. Nguyên văn: slot ảnh #private-ai (sơ đồ 5 đích triển khai) đang lặp lại đúng nội dung của thang bậc chữ 60px bên dưới nó (cùng 5 bước, cùng tên phần cứng). Đề xuất: HOẶC bỏ slot ảnh (thang chữ chiếm trọn 1072px), HOẶC brief lại để sơ đồ thể hiện thứ chữ không làm được — thang điện năng từ milliwatt tới rack, vẽ theo tỉ lệ tương đối.
- ux-12 — backlog #29 (bỏ `screen` khỏi khối index) đúng hướng nhưng số liệu ghi trong đó thấp hơn thực tế 1 bậc: thực đo 755px/703px budget ở 1024×768 (+52px), không phải mức lệch 4px như backlog ghi ở 1366×768. Cần cập nhật số trong docs/05-backlog.md #29 trước khi GM quyết.

## Bố cục khối sản phẩm viết lại — GM chốt trực tiếp 2026-08-24 (ngoài vòng review)

Yêu cầu của GM, nguyên văn: *ảnh một bên, một bên là thông tin cực kỳ gọn — dùng cho loại việc gì, số đo
đã có — ứng dụng là dòng cuối cùng chạy ngang, ảnh nhỏ vừa đủ nhìn, có nhãn là đủ, không cần mô tả;
mobile chủ động; content vừa phải, spacing tối ưu trong section nhưng không được quá dài.*
Bố cục mới ghi ở `docs/03-structure.md` §4b. Đo trên build production, 1428×893:

| | trước | sau |
|---|---|---|
| tổng trang | 9.326px | **7.012px** (−25%) |
| MINT (cõng đầu mục 2.1) | 1.429px | **995px** |
| PAPAYA · FLEX · ESPRESSO · GPU | 747 · 1.185 · 1.185 · 1.185 | **524 · 748 · 780 · 748** |
| Enterprise · Private AI | 964 · 834 | **749 · 671** |
| budget một màn | 829px | 829px — mọi khối lọt, trừ MINT |

Ở 390×844 (production): không tràn ngang (`scrollWidth` = 390), không vùng chạm nào < 44px trong `<main>`.

**Ảnh hưởng tới sổ finding — cần đo lại, không tự đóng (luật 3, CLAUDE.md §7):**

| id | chuyện gì đã xảy ra |
|---|---|
| eng-01 | `md:sticky` đã bị **gỡ** khỏi `<ChipPlinth>` — câu hỏi "sticky có phá nhịp snap không" giờ vô nghĩa theo cách khác với lúc nêu. ux-reviewer đóng hay chuyển thành `rejected`, engineer không đóng hộ. |
| eng-02 | Khối GPU vẫn lệch nhưng nhẹ hơn: bệ 419 → **364px**, cột chữ vẫn ~50px. Gốc vẫn là nội dung mỏng (0 spec) — không phải bố cục. |
| eng-03 | Rail đã đổi hình: thẻ 237–334px → **136/160/176px cố định**, bỏ mô tả, placeholder chuyển sang bản `compact` (chỉ nhãn "Ảnh đang chờ", brief `alt` thành `sr-only`). Phải đo lại trên máy thật. |
| ux-05 | Giữ nguyên nguyên tắc (rule chạy hết bề ngang được cấp), nhưng `SpecCard` đã nén còn ~140px và nhãn bằng chứng chuyển lên cùng dòng con số. |
| ux-10 | Mốc ngang chung vẫn còn — dải nhận dạng vẫn full-width, chỉ còn một dòng thay vì ba. |

**Sinh ra một mục backlog mới:** #37 — 15 câu `capabilities[].body` không còn được render. Chuỗi vẫn nằm
trong `vi.ts`, nhưng những dữ kiện tra được trong đó (NDA MEISEI 3/2024, PoC 2/2024, 640 TOPS PCIe Gen4)
đã rời khỏi mắt người đọc. Quyết định của GM + writer, không phải của engineer.

## Vòng GM thứ hai — "một chip = một màn ở mọi khổ" (2026-08-24, cùng ngày)

Yêu cầu GM, nguyên văn: *ở màn điện thoại tôi muốn fit trong screen, spacing thật logic, các ứng dụng
thì nên slide, các divider ít thôi — bỏ đi nếu được, "ĐÃ CÓ" bỏ đi vì quá vô nghĩa. Nhớ nhé, dù ở size
màn hình nào cũng phải tối ưu content để 1 chip section 1 màn.*

Sáu thay đổi, không cái nào đụng vào một chuỗi content:

1. **Điện thoại: ảnh đứng cạnh cái tên**, mô tả chạy hết bề ngang dưới đó. Thumbnail 139px tốn 0px
   chiều cao; ảnh full-width tốn 280px của budget 788px.
2. **Đầu mục 2.1/2.2 rời khỏi khối sản phẩm** thành một dải tối mỏng ~100px (`<GroupBand>`). Nó là
   thứ đã đẩy MINT lên 995px. Không trả về `<Section>` riêng vì đó là `ux-04`.
3. **Bỏ nhãn "ĐÃ CÓ"** ở cả dải nhận dạng lẫn `SpecCard` — chỉ `roadmap` còn nhãn. Sinh backlog #38
   (`footer.statusLegend` giờ tả một quy ước chỉ còn đúng một nửa).
4. **Còn một đường kẻ trong khối**: hairline dưới dải nhận dạng, chỉ từ `md`. Bỏ hairline mở dải số
   đo và hairline mở rail ứng dụng.
5. **Số đo trượt ngang dưới `lg`** — cùng affordance với rail ứng dụng. Không số đo nào bị rút gọn;
   phương pháp và nguồn đi nguyên vẹn theo thẻ.
6. **Ảnh 4/12 từ `md`** (trước 5/12), và `MediaPending` chuyển sang **container query** nên ô ảnh chờ
   tự biết in được brief hay chỉ in nhãn.

Đo trên build production **cách ly** (`next build` + `next start` từ một bản copy ở scratchdir — xem
"Ghi chú hạ tầng" bên dưới):

| | 390×844 (b. 788) | 360×800 (b. 744) | 1309×818 (b. 754) |
|---|---|---|---|
| MINT | **690** ✔ | **677** ✔ | **756** (+2) |
| PAPAYA FLEX | **705** ✔ | **692** ✔ | 854 (+100) |
| ESPRESSO | **699** ✔ | **725** ✔ | **767** (+13) |
| GPU | **476** ✔ | **472** ✔ | **737** ✔ |
| Enterprise | **788** (khít) | 788 (+44) | **630** ✔ |
| Private AI | 819 (+31) | 819 (+75) | **730** ✔ |
| Index | 888 (+100) | 918 (+174) | **754** ✔ |
| cả trang | **6.572** | 6.659 | **6.406** |

Trước hai vòng GM hôm nay: 9.326px ở desktop, 9.910px ở 390px. Không tràn ngang ở bất kỳ khổ nào
(`maxScrollX` = 0), không vùng chạm nào < 44px trong `<main>`.

**Bốn khối phần cứng đạt luật một-chip-một-màn trên điện thoại.** Ba chỗ còn vượt và vì sao:

| chỗ | vượt | nguyên nhân | ai sở hữu |
|---|---|---|---|
| Private AI (điện thoại) | +31 / +75 | 3 module + 5 đích triển khai, mỗi mục tiêu đề + mô tả | writer/GM — cắt chữ |
| Enterprise (360px) | +44 | 5 module, mỗi cái 2–3 dòng mô tả | writer/GM — cắt chữ |
| PAPAYA FLEX (desktop) | +100 | hai số đo, chú thích phương pháp 4 dòng mỗi số (vừa được viết dài thêm) | writer/GM — hoặc chấp nhận |
| Index | +100 / +174 | backlog #29, đã có khuyến nghị bỏ `screen` | GM |

**Một lỗi tự tìm thấy khi đo, đã sửa:** cột chữ là grid item nên mặc định `min-width: auto`; hàng số
đo trượt ngang bên trong nó nong cả lưới ra 1.509px trên viewport 931px. Thêm `min-w-0`.

**Ảnh hưởng tới sổ finding (vẫn không tự đóng — luật 3):** `eng-01` chết hẳn (`sticky` đã gỡ, `md`
cũng không còn cột 5/12). `eng-03` phải đo lại lần nữa: rail đổi từ 176px xuống `8rem/10rem/11rem` và
placeholder chuyển sang container query. `ux-05` vẫn đúng — một số đo giữ trọn bề ngang, chỉ khi có
từ hai số mới thành rail.

## Ghi chú hạ tầng (không phải finding)

`next dev` và `next start` ở repo này **dùng chung thư mục `.next`**, nên một lần `npm run build` là
dev server đang chạy gãy với `Cannot find module './331.js'` và CSS 404 — xảy ra ba lần trong phiên
này, mỗi lần đều bị nhầm thành lỗi layout trong lúc đo. Cách đo an toàn: copy `web/` sang scratchdir,
symlink `node_modules`, build và `next start` ở đó. Cách sửa gốc rẻ hơn: cho `distDir` đọc biến môi
trường trong `next.config.mjs` — **đề xuất, chưa làm**, vì nó là thay đổi cấu hình repo và không ai
yêu cầu.

## Cần làm lại
- Review ngôn ngữ/typo cho toàn bộ nội dung products.* (114 chuỗi giờ đã có chữ thật, chưa qua review vì content-market-critic chạy trước khi viết xong, và trang vẫn đang bị viết lại bởi phiên khác) — điều phối lại content-market-critic SAU KHI trang ngừng thay đổi.
- mob-15/ux-01 còn dư 24,6px ở 1023×768 — cần writer rút ngắn h1 hoặc lead của khối index.

## Quyết định đã chốt
- 2026-08-24 — bốn render chip được dùng; ESPRESSO được miễn lệnh cấm "render 3D cho hàng roadmap"
  **với điều kiện** nhãn `roadmap` bị ghim trong khung ảnh (`context/media-plan.md` luật 4).
- 2026-08-24 — họ chip là năm khối: MINT → PAPAYA → PAPAYA FLEX → ESPRESSO → GPU (`docs/03-structure.md` §1).
- ~~2026-08-24 — một CTA cuối trang, không phải một CTA mỗi khối sản phẩm~~ — **NGHỈ HƯU 2026-09-03.**
  GM: *"cứ làm theo canva đi"*. Bản Canva 02/09 đặt nút ở cuối **từng** khối; sáu nút là bố cục đúng.
  `docs/03-structure.md` §4 đã gạch bỏ luật này từ 02/09, quyết định 03/09 chỉ xác nhận. Không còn
  nguồn nào nói ngược lại — `ux-215` đóng.

## Còn treo cho người
- mob-11/ux-02 — **phần chip đã xong** (GM cấp ảnh 24/08). Còn treo: rack GPU, 2 ô software, ảnh văn phòng.
- Số đo trạm gốc 5G thuộc PAPAYA hay PAPAYA FLEX (backlog #34) — GM.
- Nội dung khối PAPAYA (backlog #33) — cổng A→E phải chạy ở phiên chính, có người.
- ux-12 (backlog #29 cần cập nhật số đo) — GM.
- ux-19 — đã chấp nhận đánh đổi (xem sổ finding), không cần quyết thêm trừ khi GM muốn đảo ngược.

## Kết luận vòng 1
Round 1 sửa xong 9/10 finding có owner=engineer (1 rejected có lý do đo được, 1 còn dư nhỏ 24,6px chờ writer). **Cảnh báo quan trọng:** trang này đang bị 2 phiên Claude Code khác viết lại activee (đổi cấu trúc component sang ChipBlock/ChipPlinth/AppRail) ngay trong lúc round này chạy — mọi số đo trên chỉ đúng tại thời điểm đo, PHẢI re-verify bằng mobile-ui-reviewer + web-ux-reviewer sau khi các phiên kia dừng lại, trước khi coi trang này là xong. Ảnh sản phẩm (mob-11/ux-02, BLOCKER về niềm tin) và review ngôn ngữ vẫn treo.

---

# VÒNG 2 — mở 2026-09-03, sau khi trang được dựng lại từ Canva master

## Tình trạng đầu vào

- **build ✔** — `next build` xanh, 9/9 trang tĩnh, `/vi/products` prerender `○`, 1,27 kB JS.
- **ô trống trong `vi.ts`: 0** trên trang này. Chín ô `alt: ""` còn lại đều là ảnh trang trí; tám ở
  HOME, một ở `products.intro.media.alt` — đúng ngoại lệ CLAUDE.md §3b.
- **chuỗi còn là key path: 0** (vòng 1 đóng lại ở 114 → 0).
- **`scripts/content-check` xanh** cả ba artifact: `products.canva-master.vi.json` (0 error,
  3 warning STYLE_HEADLINE_TOO_LONG), `products.vi.json`, `products.labels-and-alts.vi.json`.
- **kế thừa từ vòng 1:** `eng-01`, `eng-02`, `eng-03` (`open`) + phần chữ của `mob-13`, `ux-05`,
  `ux-15`, `ux-16` chờ đo lại.
- **server đo:** production build (`next start`) tại `:3100`, chạy bằng node của Windows để Chrome
  vào được — WSL2 không forward cổng sang Windows trong máy này (xem Ghi chú hạ tầng).
- **R1 (content) bỏ qua ở đầu vòng:** trang không còn placeholder và copy vừa qua pipeline
  `content-i18n`. R1 mở lại bằng những finding `owner=writer` bên dưới.

## Cấu trúc đang đo (khác hẳn vòng 1)

`page-products.tsx` còn 48 dòng, chỉ lắp ráp. Sáu component mới ở `web/components/products/`:
`hero.tsx` · `catalog-index.tsx` · `hardware-block.tsx` · `software-block.tsx` · `training-block.tsx`
· `ui.tsx`. Thứ tự khối: hero → danh mục 6 thẻ → `#mint` → `#papaya-flex` → `#espresso` → `#gpu`
(E-Series) → `#enterprise` → đào tạo. Không còn form liên hệ nhúng cuối trang (GM gỡ 02/09), không
còn nhánh Private AI.

## Sổ finding vòng 2

| id | round | severity | owner | where | requirement | state | number |
|---|---|---|---|---|---|---|---|
| mob-201 | 2 | BLOCKER | engineer | `products/hardware-block.tsx:56` (`StatusBadge` trong `TagRow`) vs `:141` (`Render`) | Nhãn `roadmap` của ESPRESSO phải nằm **trong** khung ảnh render, không tách được khỏi nó bằng một cú cuộn hay một cú chụp màn hình | open | `badgeInsideFigure = false`; nhãn [5849,7→5868,9], khung ảnh [5935,4→6175,4] → **cách 66,5px** @360/@390, 32,4px @430. Có **187px @360 / 198px @390 / 179px @430** hành trình cuộn mà render 3D chiếm ≥50% màn còn nhãn "Dự kiến · Q3/2026" không ở đâu trên màn. Ngưỡng 0px |
| mkt-201 | 2 | BLOCKER | writer | `meta.products.description` | ESPRESSO trong SERP snippet phải mang nhãn roadmap + ngày **trong cùng mệnh đề với tên nó**, hoặc bị gỡ khỏi mô tả | open | "dự kiến" duy nhất trong câu gắn vào *phần mềm*, ba mệnh đề sau ESPRESSO. Đây là bề mặt duy nhất không có badge/dải/`dateNote` nào cứu |
| mkt-202 | 2 | BLOCKER | writer | `products.hardware.catalogGroups.npu` | Nhãn dải danh mục không được mang acronym kiến trúc; phải là biển chỉ đường về *loại sản phẩm* | open | "Dòng chip NPU AI" đứng trên MINT/PAPAYA/ESPRESSO — ba chip PIM. Không dòng nào trong proof-bank §D/§E gọi chúng là NPU; §D gọi tầng này là "PIM-based AI Chip Technologies". `home.whyPim.body` dạy người đọc rằng NPU là thứ PIM sinh ra để thay. Chính pass 03/09 đã đổi GP-GPU → "Card tăng tốc AI" vì lý do này (`products.yaml` → `catalogue_band_gpu_relabel_2026_09_03`) mà bỏ sót NPU |
| mkt-203 | 2 | BLOCKER | writer | `products.intro.lead` | Câu duy nhất dưới H1 của khối `screen` phải giải mã được trong một lượt đọc | open | "Chọn theo nơi AI chạy, việc AI tham gia và mức độ sẵn sàng của từng nhánh." — ba vế không cùng loại; "việc AI tham gia" là danh từ hoá không có gốc tra được. Người đọc vấp ở vế thứ hai của câu đầu tiên |
| mob-202 | 2 | MAJOR | engineer | `mobile-menu.tsx:105–112` · `:38–45` | Menu `<details>` phải đóng khi người dùng chọn một mục trong nó | open | `touchscreen.tap` vào "ESPRESSO" rồi "Đào tạo AI": `details.open = true` sau 1,6s cả hai lần. Panel 272×477,2 che **48,3% @360** vùng nội dung (42,1% @390, 34,3% @430) và **đè lên `#espresso h2`**. Ngưỡng 0% |
| mob-203 | 2 | MAJOR | writer | `products/catalog-index.tsx:178` ← `…indexStageLabel` | Nhãn trạng thái trong thẻ danh mục phải vừa **một dòng** ở 360px | open | Viên nhãn vỡ hai dòng (19,2 → **30,4px**) trên **5/6 thẻ @360**, 4/6 @390, 1/6 @412 và @430. Bề ngang bị kẹp đúng 128px = trọn lòng thẻ |
| mkt-204 | 2 | MAJOR | GM → writer | `products.{hardware,software,training}.{title,lead}` | Nội dung được compile và ship, không phải compile rồi cất kho — sáu chuỗi này phải được render hoặc bị khai tử khỏi spec | **assigned** (GM chốt 03/09: **khai tử khỏi spec**) | `SectionHead` (`ui.tsx:150`) **chỉ được import bởi `contact-section.tsx`**; ba block component chỉ tiêu thụ `intro.kicker`. Sáu chuỗi không bao giờ lên màn, trong đó có "Dự kiến 12/2026: CRM, ERP, HRM và DMS cùng đổ về một màn hình vận hành. AI đề xuất; con người phê duyệt." — câu duy nhất định ngày cho phần mềm trước khi người đọc gặp nó |
| mkt-205 | 2 | MAJOR | writer | `products.hardware.items[3].applicationLead` | Claim phải dừng ở *lớp tải công việc dự kiến*, không được trượt sang *đã dùng ngoài thực địa* | open | "E-Series **thường được ứng dụng cho** máy chủ AI doanh nghiệp…" — proof-bank §E5 cấm suy ra tình trạng mở bán/khách hàng/số lượng triển khai từ datasheet |
| mkt-206 | 2 | MAJOR | GM | `products.hardware.items[3].statusNote` + `status: "shipped"` | Màu badge không được nói một claim mà chữ trong badge không nói | **rejected** (GM chốt 03/09) | `StatusBadge` tô `shipped` màu xanh; chữ chỉ ghi "Thông số sản phẩm". E-Series không có nguồn công khai (§E5: tài liệu GM cấp 25/08/2026). **GM: "cứ Canva như nào làm y như thế"** — bản master vẽ badge này như vậy và proof-bank không mâu thuẫn với *màu* (chỉ mâu thuẫn với câu "thường được ứng dụng", đã tách thành mkt-205). Giữ nguyên `shipped`. Lỗ hổng hai-nhãn-vs-ba-nhãn (`types.ts:16` thiếu `internal`) **không** được đóng ở đây — xem "Còn treo cho người" |
| mkt-207 | 2 | MAJOR | writer | `products.hardware.items[1].variants[0].metrics[3].note` | Mỗi con số phải dính chủ sở hữu của nó bằng sở hữu cách tường minh | open | "So với NVIDIA L4: 320–332 W còn 0,03 W…" — hai số trôi sau dấu hai chấm, mang bội số lớn nhất trang (~10.000×). Ba anh em cùng khối làm đúng: "0,1–0,15 W so với 5–10 W **của** NVIDIA Jetson Nano" |
| mkt-208 | 2 | MAJOR | writer | `products.training.offer.calloutNote` | Vế thứ hai không được khẳng định một chương trình/mô hình đào tạo đã tồn tại | open | "…khảo sát nhu cầu và **hoàn thiện** mô hình đào tạo." — proof-bank §F2 chỉ có một cuộc khảo sát; cấm suy ra ngày khai giảng, khoá học, học phí, chứng chỉ. Chuỗi này nằm trong đúng cái hộp callout được dựng ra để giữ mốc 2027 ở dạng khảo sát |
| mkt-209 | 2 | MAJOR | writer | `products.software.groups[0].body` | Fact `roadmap` không được chuyển sang thì hiện tại; và "được nối" phải có chủ thể | open | Hai câu hiện tại mô tả sản phẩm 12/2026 như hệ thống đang chạy, cộng "vẫn" (khẳng định một luồng phê duyệt đang tồn tại). ESPRESSO bốn khối trên làm đúng: "Dự kiến Q3/2026, ESPRESSO **sẽ** đưa…" |
| mkt-210 | 2 | MAJOR | writer | `products.hardware.items[0].tagline` | Ô nhãn phải cùng hình thái với ba anh em: danh ngữ, không động từ hữu định | open | "Analog-PIM · Edge AI đã sản xuất hàng loạt" đọc trước tiên thành *Edge AI đã sản xuất [cái gì đó]* — thiếu "được". Ba anh em đều là danh ngữ |
| mkt-211 | 2 | MAJOR | writer | `products.hardware.items[*].indexStageLabel` + `software.groups[0]` + `training.offer` | Một cột, một quy ước: một dấu phân cách, một ngôn ngữ, một mức chi tiết ngày | open | Sáu nhãn cạnh nhau trong `CatalogIndex`: hai dấu phân cách (gạch nối dính vs chấm giữa có khoảng trắng), hai ngôn ngữ ("Product Data" là mục tiếng Anh duy nhất), bốn mức ngày (tháng/năm · năm · quý · không có). Đây là cột người mua quét đầu tiên |
| mkt-213 | 2 | MAJOR | writer | `origin.ps` · `origin.pv` | `OriginTag` phải nói *quan hệ*, không chỉ tên | open | Hiện render "PEBBLE SQUARE" trần trong viên viền, cạnh badge trạng thái, ở cả sáu khối. Backlog #25 ghi hai khoá này là "Của Pebble Square" / "Của Pebble Vina"; pass apply làm rơi đúng chữ khiến chúng có nghĩa |
| mkt-214 | 2 | MAJOR | writer | `products.hardware.items[3].capabilities[0..4].title` | Một trang, một luật cho việc khi nào nhãn ứng dụng được giữ tiếng Anh — áp dụng như nhau ở cả bốn rail | open | Rail E-Series render 5 thẻ tiếng Anh dưới tiêu đề "Ứng dụng"; rail PAPAYA hai khối trên hoàn toàn tiếng Việt. Phụ: MINT dùng "Failure Analysis"/"Smart Home" trong khi glossary `preserve_verbatim` ghi "Fault Analysis"/"Home IoT" |
| mkt-215 | 2 | MAJOR | writer | `products.hardware.items[0].applicationLead` | Nêu thẳng lớp ứng dụng, thì hiện tại, không bị động và không rào tần suất | open | "MINT **thường được định hướng cho** Smart Home, IoT…" — chip đã sản xuất hàng loạt từ 5/2023 mà câu đọc như brochure không có ai trong phòng. proof-bank §E0 có sẵn danh sách ứng dụng lấy thẳng từ slide |
| mkt-216 | 2 | MAJOR | writer | `products.hardware.items[1].headline` | Headline `uppercase` 2,3rem không được kết thúc bằng hai giới ngữ chồng nhau | open | 16 từ (gate cảnh báo, xác nhận). "…cho thị giác máy trên thiết bị" tách hai cách; "máy trên thiết bị" là một parse sống. Cắt đuôi thì không mất gì; cắt "Analog-PIM" thì mất thứ phân biệt họ này với E-Series |
| mkt-212 | 2 | MAJOR | **GM** | 10 chỗ mang mốc ESPRESSO (tagline · decisionLabel · indexStageLabel · body · applicationLead · 3 × dateNote · source · statusNote) | Trang chỉ được giữ **một** cách viết mốc ESPRESSO | **rejected** (GM chốt 03/09) | Pass 03/09 đổi tất cả sang **Q3/2026**; backlog #9 ghi GM chốt **9/2026** hai lần (21/08, 24/08). proof-bank giữ cả hai: §E0 "Ready in Q3 2026", §E3 "Available from Sep. 2026". **GM chốt lại 03/09: Q3/2026 là mốc chính thức**, đảo hai lần chốt trước. Trang đã nhất quán 10/10 chỗ nên không ai phải sửa chữ. **Việc còn lại: cập nhật `docs/05-backlog.md` #9** — ghi quyết định mới, sửa danh sách 7→10 chỗ. Đồng hồ 01/10/2026 **không đổi**: quý 3 kết thúc 30/09 |
| mob-204 | 2 | MINOR | writer | `products/ui.tsx:173` (`StatTiles` → `metric.value`) | Một giá trị số đo không được vỡ giữa chừng sang dòng hai | open | 3/19 vỡ @360 ("512T FP8/INT8", "1024T FP8/INT8", "2 × PCIe 5.0 ×16"), 2/19 @390, **"2 × PCIe 5.0 ×16" vỡ ở mọi khổ** — đọc thành "2 × PCIe 5.0" / "×16". Ô rộng 132px, mono 18px |
| mob-205 | 2 | MINOR | engineer | `products/hardware-block.tsx:165` (`figcaption` tên variant) | Chữ 11,2px phải đạt 4,5:1 | open | `rgb(255,255,255)` trên `rgb(82,116,216)` = **4,33:1**. 4 node (PAPAYA · PAPAYA FLEX · E10 PCIe · E20) — đây là bốn lỗi contrast **duy nhất** trên trang |
| mob-206 | 2 | MINOR | GM | `products/ui.tsx:224` (`withPhotos`) ← `items[gpu].capabilities[*].media` | Hàng ứng dụng phải đọc cùng một ngôn ngữ thị giác ở cả bốn rail, hoặc nói rõ vì sao khác | open | Rail E-Series **0/5 thẻ có ảnh**, thẻ cao 63,4px; ba rail kia 3/3, 4/4, 3/3 ảnh thật, thẻ 133,6–153,2px. Thuộc backlog #21 |
| mob-207 | 2 | MINOR | engineer | `site-header.tsx:49–54` (skip link) | Mọi phần tử focus được và bấm được ≥44px chiều cao | open | Khi focus: **193×36px**; sàn 44 (`docs/03-structure.md` §7). Node dưới ngưỡng **duy nhất** trên trang |
| mob-208 | 2 | MINOR *(phán đoán, không phải vi phạm luật)* | GM | `products/hardware-block.tsx:75–102`, khối `#gpu` | Một khối sản phẩm không nên bắt người đọc lướt qua ba đảo trắng liên tiếp trước khi tới nút | open | `#gpu` = **2.277,7px @360** (3,06 màn), cao nhất trang; 1.235px trong đó là ba đảo trắng xếp dọc (E10 · E20 · SOFTWARE STACK 5 mục). Cả trang 12.718–13.067px = 16,2–17,6 màn. §4b đã bỏ luật một-chip-một-màn nên **không phải vi phạm** — đây là chỗ đo được ngón tay mất mạch |
| mkt-217 | 2 | MINOR | writer | `products.software.groups[0].headline` | Một danh từ trung tâm không mơ hồ | open | "tích hợp dữ liệu và AI" đọc được cả hai cách. Gate cảnh báo 13 từ nhưng độ dài không phải lỗi — parse mới là |
| mkt-218 | 2 | MINOR | writer | `products.hardware.items[3].supportingItems[3].body` | Các mục trong một liệt kê phải cùng loại | open | "Phân tích hiệu năng, độ chính xác và giám sát." — "giám sát" không phải thứ để phân tích. proof-bank §E5 có bốn mục; bản Việt gộp monitoring vào liệt kê phân tích và làm rơi debugging |
| mkt-219 | 2 | MINOR | writer | `products.hardware.items[3].variants[0].tagline` | Eyebrow cạnh tên variant phải nêu một điểm phân biệt | open | "Cân bằng để triển khai mở rộng" — "Cân bằng" không có vế thứ hai để cân; anh em của nó ("Gấp đôi quy mô cho tải AI lớn") nêu rõ |
| mkt-220 | 2 | MINOR | writer | `items[0].media.alt` · `items[1].media.alt` · `items[1].variants[0..1].media.alt` | `alt` phải tả đúng cái ảnh có | open | Bốn `alt` tả "trên nền xám" nhưng `hardware-block.tsx` ghi trong comment của chính nó: mọi file chip là cut-out có alpha. Backlog #35 vẫn sống |
| mkt-221 | 2 | MINOR | writer | `products.hardware.items[2].media.alt` | `alt` phải tả cái ảnh vẽ gì, *cộng* thêm nhãn trạng thái — không thay thế | open | "Ảnh dựng roadmap ESPRESSO, không phải ảnh chip đang sản xuất." — người dùng screen reader nhận được ranh giới roadmap và 0 mô tả. Ba `alt` ứng dụng của ESPRESSO làm đúng |
| mkt-222 | 2 | MINOR | writer | `software.groups[0].modules[3].title` · `modules[4].body` | Nhất quán và không calque | open | CRM/ERP/HRM để trần, chỉ DMS được chú tiếng Anh; "xuyên phân hệ" là calque của *cross-module* |
| mkt-223 | 2 | MINOR | writer | `items[3].variants[0].metrics[2].value` · `variants[1].metrics[2].value` | Một giao tiếp, một cách gọi | open | "PCIe 5.0 ×16" vs proof-bank §E5 "PCIe Gen5 ×16"; chuỗi E20 mang hai kiểu giãn `×` trong sáu ký tự |
| mkt-224 | 2 | MINOR | writer | `training.offer.headline` · `.name` · `.indexName` · `.decisionLabel` | Mỗi ô phải thêm thông tin ô trên chưa có | open | Bốn lần diễn đạt lại một ý; thẻ danh mục hiện "Đào tạo AI" rồi "Đào tạo AI doanh nghiệp" hai dòng liền nhau |
| mkt-225 | 2 | MINOR | writer | `products.ctaLabel` | Nhãn nút phải tả đúng việc sắp xảy ra | open | "Đăng ký tư vấn ngay" render sáu lần, dẫn tới `/vi/contact` — nơi mở đầu bằng "Điền form để Pebble Vina tiếp nhận bài toán" và nút gửi ghi "Gửi thông tin". Không có gì được đăng ký. "ngay" là từ khẩn cấp thứ hai sau `nav.cta` "Liên hệ ngay" |
| mkt-226 | 2 | MINOR | writer | `items[0].decisionLabel` · `items[0].body` | "giới hạn điện" đọc thành trần cấp điện của toà nhà, không phải ngân sách công suất của thiết bị | open | Khái niệm power budget có cách diễn đạt kỹ thuật chuẩn trong tiếng Việt; đây không phải nó |
| mkt-227 | 2 | MINOR | writer | `items[1].variants[1].metrics[1].note` · `variants[0].applicationLead` | Đơn vị phải đi với số đầu tiên; "nền" không phải cách nói chuẩn cho *baseline* | open | "333–500 so với 3,6–7,2 FPS/W của…" — người đọc gặp "333–500" không đơn vị và phải giữ nó tới cuối mệnh đề. "Thông số nền" đọc thành *background specs* |

state: open · assigned · fixed · verified · rejected · routed · backlog

> `ux-2xx` sẽ được thêm khi `web-ux-reviewer` trả kết quả. Lần chạy đầu của nó bị ngắt vì lỗi hạ tầng
> API (HTTP 429 giới hạn phiên), không phải vì trang; đã phóng lại.

## Quyết định GM — 2026-09-03, trong phiên chính

1. **Mốc ESPRESSO là `Q3/2026`.** Đảo hai lần chốt `9/2026` ngày 21/08 và 24/08. Trang đang nhất
   quán 10/10 chỗ nên không có chữ nào phải sửa; việc còn lại là **cập nhật `docs/05-backlog.md` #9**
   (ghi quyết định mới, sửa danh sách bảy chỗ thành mười). Đồng hồ 01/10/2026 giữ nguyên — quý 3 kết
   thúc 30/09, nên cách viết này không mua thêm một ngày nào.
2. **Sáu chuỗi `SectionHead` bị khai tử khỏi spec**, không phải được render. Lý do: bản Canva master
   có bảy artboard và không có lớp tiêu đề nhánh nào; thêm vào là thiết kế lại ngoài khung GM đã
   duyệt, trên một trang vốn đã cao 12.700px. **Hệ quả bắt buộc:** câu định ngày 12/2026 cho bộ phần
   mềm phải được writer đưa vào chính `products.software.groups[0].body` — mkt-209 vốn đã yêu cầu
   viết lại body đó, giờ nó cõng thêm cái ngày.
3. **Badge E-Series giữ nguyên `shipped`.** GM: *"cứ Canva như nào làm y như thế"*. Bản master vẽ
   badge như vậy, và `canva_fidelity_2026_09_03` chỉ cho phép sửa chuỗi Canva **khi proof-bank mâu
   thuẫn** — ở đây proof-bank không mâu thuẫn với *màu badge*, nó mâu thuẫn với câu "thường được ứng
   dụng cho" (§E5), và câu đó đã là finding riêng mkt-205.

> **Ranh giới của quyết định 3.** Nó đóng mkt-206, **không** đóng mkt-202. Nhãn dải "Dòng chip NPU AI"
> cũng là nhãn của bản master, nhưng nó rơi đúng vào ngoại lệ đã ghi thành luật trong chính spec:
> `catalogue_band_gpu_relabel_2026_09_03` → *"No band label may carry an architecture acronym again"*,
> và proof-bank §D gọi tầng này là "PIM-based AI Chip Technologies", không phải NPU. Đây là trường hợp
> mà luật đó được viết ra để xử lý. Nếu GM muốn trung thành tuyệt đối với master ở cả chỗ này thì đó
> là một chuỗi để hoàn nguyên, nói một tiếng là xong.

**Đợt hai, sau khi `web-ux-reviewer` trả kết quả:**

4. **`ux-201` sửa bằng kicker mang tên sản phẩm**, không dựng thanh nav anchor. "01 · Phần cứng — MINT",
   "01 · Phần cứng — ESPRESSO"… Lý do chọn phương án rẻ: thanh nav là UI không có trong bản master.
   Chia việc: engineer thêm trường kicker **tuỳ chọn** cho từng sản phẩm vào `types.ts` và cho
   component đọc `product.kicker ?? intro.kicker` (build vẫn xanh khi chưa có chữ); writer điền sáu
   chuỗi. Phần "không có nav tới sáu anchor ở desktop" **không được sửa** — nó chết cùng phương án
   được chọn, ghi lại ở đây để không ai nêu lại như tin mới.
5. **GM cấp 5 ảnh ứng dụng E-Series** (máy chủ AI doanh nghiệp · LLM · thị giác máy · NLP/Speech ·
   tính toán đa card), cùng phong cách với 10 ảnh ứng dụng đã có. `ux-205`/`mob-206` chuyển sang
   **chờ tài sản** — trang không đóng được vòng cho tới khi ảnh về.
6. **Sáu CTA trong thân trang là đúng.** GM: *"cứ làm theo canva đi"*. Luật "một CTA mỗi trang"
   (24/08) nghỉ hưu; `docs/03-structure.md` §4 đã gạch bỏ nó từ 02/09, quyết định này chỉ xác nhận.
   `ux-215` đóng. Nhãn nút vẫn là finding riêng của writer (`mkt-225`) — sáu nút là đúng, "Đăng ký
   tư vấn ngay" tả sai việc sắp xảy ra thì vẫn sai.
7. **Dải 768–1023px nằm trong phạm vi** — engineer hạ điểm gãy hai cột từ `lg` xuống `md`. Ở 1023px
   trang cao 12.990px, thêm 1px thành 1024px còn 8.357px (chênh 4.633px = +55%); riêng khối danh mục
   1.999,2px = 2,84 lần ngân sách. Vòng 1 đã làm đúng việc này cho *khối sản phẩm* (`eng-04`, −18%);
   khối danh mục dựng lại 02/09 chưa được hưởng.

## Sổ finding vòng 2 — phần desktop (`ux-2xx`)

| id | round | severity | owner | where | requirement | state | number |
|---|---|---|---|---|---|---|---|
| ux-201 | 2 | MAJOR | engineer + writer | `products/ui.tsx:50` (`BlockKicker`) · sáu `section[id]` | Người đọc phải gọi được tên sản phẩm từ bất kỳ vị trí cuộn nào trong khối của nó | **assigned** (GM chốt: kicker mang tên sản phẩm) | Cửa sổ dài nhất không có `h2` nào trên màn: **695,2px @1024×768**, 593,2px @1440×900, 413,2px @1920. 6/27 điểm dừng bánh xe @1440 không thấy `h2`. Kicker in "01 · Phần cứng" trên 4/4 khối phần cứng. Ngưỡng: 0px |
| ux-202 | 2 | MAJOR | engineer | `products/ui.tsx:117` `SpecIsland` / `:146` `StatTiles`, tại `#mint` và `#espresso` | Đảo "THÔNG SỐ CHÍNH" không được rộng hơn thứ nó chứa | open | `#mint` đảo 1286×165, 3 ô, cột **399,3px**, giá trị dài nhất 132px → **67% mỗi cột trống**; `#espresso` 1286×189 cùng 3 ô. Tổng mực 324/1286px |
| ux-216 | 2 | MAJOR | engineer | `site-header.tsx` · `products/ui.tsx:294` · `site-footer.tsx` · `catalog-index.tsx` | Một ngôn ngữ hover duy nhất; sáu thẻ danh mục phải có phản hồi hover | open | **5 hành vi / 4 lớp đích**, cộng thẻ danh mục **0 thay đổi** trên 6/6 (`borderColor` không đổi, `transform: none`, `box-shadow` không đổi). Hai token "chữ→màu": `#008afe` header vs `#6e97f5` footer. Gộp `ux-203`; là `ux-15` vòng 1 mở lại |
| ux-204 | 2 | MAJOR | engineer | `site-header.tsx` (`a.header-cta` + skip link) | Vòng focus đạt 3:1 so với thứ bao quanh (WCAG 2.2 SC 1.4.11); cả trang một vòng focus | open | Vòng 2px `rgb(35,72,148)` vs nền header `rgb(4,12,19)` = **2,27:1**; vs nền nút `rgb(9,92,255)` = **1,64:1**. 2 node. Trang mang **4 màu vòng focus**: `#fff` · `#234894` · `#6e97f5` · `#97a4bd` |
| ux-205 | 2 | MAJOR | GM | `products/ui.tsx:211` `ApplicationRow` tại `#gpu` | Lớp ứng dụng E-Series phải là cùng một vật với ba anh em, hoặc được tuyên bố là vật khác | **routed → GM, chờ tài sản** | @1440: `#gpu` 45,3px, **0/5 thẻ có ảnh**; `#mint` 279,3px · `#papaya-flex` 218,2px · `#espresso` 298,9px, đều có ảnh thật. Bằng **16%** chiều cao anh em. Gộp `mob-206`. GM chốt 03/09: sẽ cấp 5 ảnh |
| ux-206 | 2 | MINOR | engineer | `products/ui.tsx:230` (`tabIndex={0}` trên `ul[role=group]`) | Một tab stop phải làm được việc gì đó ở khổ nó xuất hiện | open | 4 rail focus được; từ `md` chúng là `md:grid md:overflow-visible` với `scrollWidth 1286 == clientWidth 1286` → **4/28 tab stop desktop (14%) vô nghĩa** |
| ux-207 | 2 | MINOR | engineer | `catalog-index.tsx`, hàng thẻ | Sáu thẻ nằm trên một đường chân, chịu được viên nhãn hai dòng | open | @1440 đáy thẻ 1407,9 / 1409,4 ×3 / 1410,0 / **1433,0** → `#enterprise` thấp hơn **23,6px**; nguyên nhân là nhãn 32px (2 dòng) vs 20px. Chuỗi gây ra là `mkt-211`/`mob-203` (writer) |
| ux-208 | 2 | MINOR | engineer | `products/ui.tsx:163`, nhánh `columns=2` | Số spec lẻ không được để lại hố trong panel dùng chung — đúng luật comment ở `:160` đã ghi cho nhánh 4 cột | open | **3/8 đảo số đo để lại 1 ô trống**: PAPAYA FLEX (đảo 635px), E10 PCIe và E20 (418px mỗi cái). Hố ~200×95px |
| ux-209 | 2 | MINOR | engineer | `products/hero.tsx:45` (lead) | Lead phải trên 4,5:1 trên toàn bộ hộp chữ, không chỉ ở trung vị | open | Đo trên chính ảnh đã render, ẩn chữ: **8,5% hộp 514×59 dưới 4,5:1 @1024×768** (thấp nhất 1,52:1); **13,3% / 1,45:1 @1023×768**; 1,6% / 2,54:1 @1440. **H1 đạt ở mọi khổ** (0% diện tích dưới 3:1) — không đụng scrim của H1 |
| ux-210 | 2 | MINOR | engineer | `catalog-index.tsx`, "Đi xuống phần cứng ↓" | Thứ trông như nút bàn giao của trang phải bấm được, hoặc thôi trông như bấm được | open | Render thành `<p>`, `tabIndex -1`, không có `<a>` tổ tiên, `cursor: auto`, 1286×20 đặt giữa ở y=1461 — vật cuối cùng của khối chỉ mục |
| ux-211 | 2 | MINOR | engineer | `site-header.tsx`, `<span>` "vi" | Header không được để lại tàn tích của nút chuyển ngữ đã gỡ 23/08/2026 (CLAUDE.md §4) | open | `<span>` không tương tác, 14×19px, `tabIndex -1`, `cursor: auto`, ô ngoài cùng phải x=1349 sau CTA |
| ux-212 | 2 | MINOR | engineer | `catalog-index.tsx`, ảnh thẻ | Một hàng sáu thẻ dùng một cách xử lý ảnh | open | **4 thẻ `object-fit: contain`** (198,3×111,5, cut-out có lề trắng) vs **2 thẻ `object-fit: cover`** (195,7×110,1, tràn khung) |
| ux-213 | 2 | MINOR | session | `docs/03-structure.md` §4b, bảng số đo | Bảng tham chiếu mà mọi reviewer đo đối chiếu phải khớp build đang chạy | open | @1440 ghi → đo: danh mục 563→**677** (+114), MINT 1237→1265,5, PAPAYA 1245→**1358** (+113), ESPRESSO 1237→1285,1, E-Series 1097→1141,7, tổng 8387→**8737** (+350). Phần mềm 865→864,5 và đào tạo 844→843,7 thì khớp |
| ux-214 | 2 | MAJOR | engineer | điểm gãy `lg`, đo tại 1023×768 | Dải 768–1023 phải nhận bố cục hai cột, không phải bố cục xếp chồng của điện thoại | **assigned** (GM chốt 03/09: có, hạ xuống `md`) | 1px chiều rộng đổi **4.633px** chiều cao: **12.990px @1023** vs **8.357px @1024** (+55%). Riêng khối danh mục 1.999,2px = **2,84 lần** ngân sách 704px. Không tràn ngang, hero khít 704/704 cả hai bên |
| ux-215 | 2 | MINOR | GM | memory `one-cta-per-page-not-per-block` vs trang đang chạy | Luật đã nghỉ hưu phải thôi sống trong nguồn thứ hai | **verified** (GM chốt 03/09) | 6 CTA trong thân, nhãn và hình học giống hệt (224,6×48 tại x=77), cách nhau 844–1358px, cộng CTA header 125×44 thấy được ở mọi vị trí cuộn. `docs/03-structure.md` §4 đã gạch từ 02/09; dòng "Quyết định đã chốt" của vòng 1 đã được gạch hôm nay. Không còn nguồn nào nói ngược |

### Chỉ số nền desktop — cái gì đã sạch

| Hạng mục | Số đo |
|---|---|
| Hero (`screen`) | **0px vượt ở cả 5 khổ**: 704/704 (1023 và 1024) · 736/736 (1280) · 836/836 (1440) · 1016/1016 (1920). `scrollHeight == height` |
| Tốc độ | LCP **452ms** lạnh / 224ms ấm; **CLS 0,0000**. Phần tử LCP là ảnh hero, có `priority` |
| Tràn ngang | 0 ở cả 5 khổ |
| Console @1440 | `[]` — 0 error, 0 warning, 0 pageerror, 0 request ≥400 |
| Anchor | **9/9** (`#mint #papaya-flex #espresso #gpu #enterprise #enterprise-ai-training #hardware #software #training`) rơi **0,0–1,0px** dưới mép header ở 1024/1440/1920. `--header-h` = 4rem × 16 = **64,0px** = chiều cao header thật = `scroll-padding-top` |
| Nhịp dải | `.product-band::before` đổi tông theo nhánh: phần cứng `rgba(122,166,242,.07)` · phần mềm `rgba(179,154,224,.07)` · đào tạo `rgba(224,166,132,.07)` — trang toàn tối đọc ra ba chương, không phải một bức tường |
| Giải phẫu có biến thiên thật | 1/2/3 đảo tuỳ khối; thẻ ảnh vs chip chữ; rail bậc thang cho phần mềm và đào tạo; số cột bám số spec 3→3, 4→4, 5→5 |

**Nhịp snap trên desktop là cơ chế chết.** `html { scroll-snap-type: y proximity }` đang sống, nhưng
chỉ `hero` mang `snap-start` (`Section` chỉ gắn cho khối `screen` — đúng như quyết định 24/08 đã
viết). Một lượt lăn 27 bước ở 1440 (mỗi bước 300px) dừng đúng bội số 300 cả 27 lần: **0 lần snap
trong 8.737px**. Không phải lỗi, nhưng nghĩa là khối cao theo nội dung không có kỷ luật nghỉ nào —
và đó chính là cơ chế đứng sau `ux-201`.

### Chiều cao khối × viewport, desktop (production)

| Khối | 1023×768 | 1024×768 | 1280×800 | 1440×900 | 1920×1080 |
|---|---|---|---|---|---|
| **ngân sách** (`100svh − 64`) | 704 | 704 | 736 | 836 | 1016 |
| **hero** (`screen`) | **704/704 ✔ +0** | **704/704 ✔ +0** | **736/736 ✔ +0** | **836/836 ✔ +0** | **1016/1016 ✔ +0** |
| danh mục | **1.999,2** (2,84×) | 682,1 (0,97×) | 666,0 | 677,0 | 677,0 |
| `#mint` | 1.393,6 | 1.078,9 | 1.203,3 | 1.265,5 | 1.265,5 |
| `#papaya-flex` | 1.653,4 | 1.388,4 | 1.341,6 | **1.358,0** | 1.358,0 |
| `#espresso` | 1.439,2 | 1.098,5 | 1.222,9 | 1.285,1 | 1.285,1 |
| `#gpu` | 1.907,0 | 1.304,7 | 1.166,7 | 1.141,7 | 1.141,7 |
| `#enterprise` | 1.625,3 | 802,9 | 825,0 | 864,5 | 864,5 |
| đào tạo | 1.600,5 | 809,1 | 803,5 | 843,7 | 843,7 |
| **cả trang** | **12.990** | 8.357 | 8.430 | **8.737** | 8.917 |
| tràn ngang | 0 | 0 | 0 | 0 | 0 |

`#gpu` **không còn là khối cao nhất trang** ở desktop (1.141,7px) — `#papaya-flex` mới là (1.358px).
Ở điện thoại thì ngược lại, `#gpu` cao nhất (2.277,7px) — xem `mob-208`.

## Finding vòng 1 — đợt đóng thứ hai, do chính người nêu đóng (luật 1)

| id | trạng thái | số đo chứng minh |
|---|---|---|
| eng-01 | **rejected** | `[...main *].filter(position==='sticky')` = `[]` tại **1024, 1280, 1440 và 1920**. Không còn phần tử sticky nào trong `<main>`; chỉ `<header>` là `position: sticky` (top 0, z 50, h 64). Câu hỏi "sticky có phá nhịp snap" mất đối tượng |
| eng-02 | **rejected** | `#gpu` lưới nhận dạng @1440: cột chữ **669,2×258,1** tại x=77, cột ảnh **568,8×242,1** tại x=794,2. Tỉ lệ **1,18:1** (vòng 1: 45px cạnh 419px). Cùng hình ở 1280 (606 vs 515,1) và 1024 (479,6 vs 407,7) |
| ux-05 | **verified fixed → mở lại thành `ux-202`** | Qua 8 đảo số đo, số spec 3/4/3/3/3/3/5/4 ↔ số cột 3/2/2/3/2/2/5/4 — **không chỗ nào một spec nằm trong dải nhiều cột**. Lỗi nguyên văn đã hết. Số mới là mật độ lấp đầy, thành `ux-202` |
| ux-15 | **open → đo lại thành `ux-216` + `ux-203`** | 5 hành vi / 4 lớp đích; 2 token "chữ→màu" khác nhau; sáu thẻ danh mục **0** delta hover. Việc hợp nhất 3 quy tắc của vòng 1 không sống sót qua lần dựng lại |
| ux-16 | **verified** | `--header-h` 4rem × 16px = **64,0px** = chiều cao `<header>` thật = `scroll-padding-top`. **9/9 anchor** rơi **0,0–1,0px** dưới mép header ở 1024, 1440, 1920. Không tiêu đề nào bị che ở khổ nào |

## Finding vòng 1 — đóng bằng số đo vòng 2 (luật 2: không finding nào biến mất)

| id | trạng thái | ai đóng | số đo chứng minh |
|---|---|---|---|
| eng-03 | **rejected** | mobile-reviewer (người nêu) | `AppRail` không còn; thay bằng `ApplicationRow` (`products/ui.tsx:211`). `main ul.rail .crossbar` = **0** ở 360/430/768 — không còn ô "chờ ảnh" nào. Bốn rail: MINT 3/3 ảnh, PAPAYA FLEX 4/4, ESPRESSO 3/3, E-Series 0/5 (không có Figure). Rail cuộn được: `scrollWidth` 504–848 vs `clientWidth` 320 @360, `scrollLeft`=0 khi mở, thẻ thứ hai hiện 148/160px — đọc ra "còn tiếp", không "vỡ". Phần E-Series thiếu ảnh **nêu lại thành mob-206**, không kéo dài eng-03 |
| mob-13 (phần chữ) | **routed → mob-203** | mobile-reviewer | Hàng chỉ mục cũ không còn. Lưới thẻ mới: `decisionLabel` 12,48px chạy 3–4 dòng, ~14–21 ký tự/dòng, lòng thẻ 143px @390 — ragged nhưng đọc được, không vỡ giữa từ → phần đó đóng. Cái thật sự vỡ giờ là viên nhãn trạng thái = mob-203 |
| eng-01 | chờ ux-reviewer | — | mobile đo `[...main *].filter(position==='sticky')` = `[]` ở 360/430/768. Luật 1: chỉ người nêu (ux-reviewer) được đóng — chờ nó xác nhận ở ≥1024px |
| eng-02 · ux-05 · ux-15 · ux-16 | chờ ux-reviewer | — | đã giao lại cho đúng người nêu |

## Kiểm nền vòng 2 — cái gì đã sạch trên điện thoại

Đo trên production `:3100`, Chrome 141 headless, DPR 3 + `isMobile` + `hasTouch`, UA Android. Năm khổ:
360×640 · 360×800 · 390×844 · 412×915 · 430×932.

| Hạng mục | Số đo |
|---|---|
| Tràn ngang | `scrollWidth − clientWidth` = **0** ở cả 5 khổ. Node duy nhất vượt `innerWidth` nằm **bên trong** `ul.rail` — đó là bộ cuộn ngang, không nong lưới. Lỗi `min-w-0` của vòng 1 không tái phát |
| Vùng chạm | 24 phần tử bấm được. Nhỏ nhất `summary` **44×44**; CTA header 68×44; nút khối 203,5×48; thẻ danh mục 154×243,6. Không cặp link liền kề nào cách nhau <8px |
| Luật `screen` | Hero là khối `screen` duy nhất, **dư 0px** ở cả 5 khổ: 584/584 · 744/744 · 788/788 · 859/859 · 876/876 |
| Anchor | 6/6 anchor lệch **−0,3…+0,4px** so với mép dưới header. Cú nhảy 10.730px ổn định sau 924ms, lệch +0,1px |
| Ảnh | **25 ảnh, 0 hỏng, 0 request ≥400** sau khi cuộn hết trang + `img.decode()` |
| Console | **0 error, 0 warning, 0 pageerror** ở cả 4 khổ |
| Snap | `scroll-snap-type: none` @360–430 ✔ đúng thiết kế; `y` từ 768 |

### Chiều cao khối × viewport (production, DPR 3)

| Khối | 360×640 (b.584) | 360×800 (b.744) | 390×844 (b.788) | 412×915 (b.859) | 430×932 (b.876) |
|---|---|---|---|---|---|
| Hero (`screen`) | **584 ✔ (0)** | **744 ✔ (0)** | **788 ✔ (0)** | **859 ✔ (0)** | **876 ✔ (0)** |
| Danh mục | — | 1.480,4 | 1.451,8 | 1.447,8 | 1.450,9 |
| MINT | — | 1.295,8 | 1.276,3 | 1.292,8 | 1.274,1 |
| PAPAYA · FLEX | — | 1.965,8 | 1.877,7 | 1.885,9 | 1.874,0 |
| ESPRESSO | — | 1.385,8 | 1.408,3 | 1.398,8 | 1.361,4 |
| E-Series (`#gpu`) | — | **2.277,7** | **2.168,2** | **2.118,3** | **2.092,8** |
| Phần mềm DN | — | 1.580,7 | 1.514,1 | 1.482,2 | 1.495,7 |
| Đào tạo AI | — | 1.496,0 | 1.465,3 | 1.481,8 | 1.474,5 |
| **cả trang** | 12.907 | **13.067** | **12.768** | 12.785 | **12.718** |

Cao hơn bảng §4b của `docs/03-structure.md` (12.242 @390) khoảng +4% — chênh do DPR 3 và metric font,
không phải hồi quy.

## Cái vòng 2 xác nhận là sạch về chữ

`content-market-critic` rà toàn bộ khối `products` và **không tìm thấy một chữ hỏng nào**: không có
hỏng kiểu Canva-transcription, không thiếu dấu, không sai hoa tên riêng. Bệnh của HOME ("Dông hành",
"dặc thủ", "nhu cậu vành hệ thực tế" — backlog #41) **không lan sang trang này**.

Quy ước số **đúng tuyệt đối, 0 vi phạm**: "17,6 TOPS/W", "0,5 TOPS", "~10.000×", "0,03 W",
"0,1–0,15 W", "3,6–7,2 FPS/W" — dấu phẩy thập phân và dấu chấm nghìn suốt lượt, `×` giãn cho kích
thước và dính cho số làn, đơn vị có khoảng trắng, tên riêng nguyên vẹn.

Ba chuỗi cõng cả trang, ghi lại để đừng ai sửa nhầm khi cắt chữ:

1. `products.hardware.items[2].body` — "Dự kiến Q3/2026, ESPRESSO **sẽ** đưa Digital-PIM lên… Đây là
   roadmap trong tài liệu nhà đầu tư, chưa có trong danh mục công khai." Ngày trước, `sẽ` chứ không
   `cho phép`, và câu thứ hai tự nêu điểm yếu của nguồn trước khi người mua nêu. Đây là câu mua giấy
   phép bán tầm nhìn cho cả phần còn lại của trang.
2. `products.hardware.items[1].body` — "Lợi thế nằm ở điện năng và kích thước; huấn luyện mô hình lớn
   vẫn cần GPU." Câu duy nhất tiêu một claim để mua uy tín, thay vì ngược lại.
3. `products.training.offer.principles[3].body` — "Thống nhất chỉ số đầu ra trước khi đào tạo; không
   cam kết một mức hoàn vốn."

## Ghi chú hạ tầng vòng 2 (không phải finding)

Ngoài chuyện `.next` dùng chung đã ghi ở vòng 1, thêm hai thứ của máy này:

1. **`npm` không chạy được từ Windows trên đường dẫn UNC.** `cmd.exe` không nhận `\\wsl.localhost\…`
   làm thư mục hiện tại. Build phải chạy trong WSL, và node ở đó nằm dưới `nvm`, không có trong
   `PATH` của shell không tương tác: `export PATH=$HOME/.nvm/versions/node/v22.20.0/bin:$PATH`.
2. **WSL2 không forward cổng sang Windows trên máy này** — `localhost:3100` và cả IP `172.17.38.151`
   đều không vào được từ Windows, nên Chrome không thấy server chạy trong WSL. Cách chạy được:
   build trong WSL, rồi **serve bằng node của Windows** trên chính cây thư mục UNC
   (`node ./node_modules/next/dist/bin/next start -p 3100`). `next start` chỉ đọc `.next` nên không
   vướng lỗi webpack của UNC; chỉ `next build` mới vướng.

