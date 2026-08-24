# Vòng hoàn thiện — PRODUCTS (/vi/products)

> Bắt đầu 2026-08-24. Trạng thái: đang chạy. Vòng hiện tại: 1/3.

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
- 2026-08-24 — một CTA cuối trang, không phải một CTA mỗi khối sản phẩm (ghi trong memory người dùng `one-cta-per-page-not-per-block`) — GM, thực thi bởi phiên song song.

## Còn treo cho người
- mob-11/ux-02 — **phần chip đã xong** (GM cấp ảnh 24/08). Còn treo: rack GPU, 2 ô software, ảnh văn phòng.
- Số đo trạm gốc 5G thuộc PAPAYA hay PAPAYA FLEX (backlog #34) — GM.
- Nội dung khối PAPAYA (backlog #33) — cổng A→E phải chạy ở phiên chính, có người.
- ux-12 (backlog #29 cần cập nhật số đo) — GM.
- ux-19 — đã chấp nhận đánh đổi (xem sổ finding), không cần quyết thêm trừ khi GM muốn đảo ngược.

## Kết luận
Round 1 sửa xong 9/10 finding có owner=engineer (1 rejected có lý do đo được, 1 còn dư nhỏ 24,6px chờ writer). **Cảnh báo quan trọng:** trang này đang bị 2 phiên Claude Code khác viết lại activee (đổi cấu trúc component sang ChipBlock/ChipPlinth/AppRail) ngay trong lúc round này chạy — mọi số đo trên chỉ đúng tại thời điểm đo, PHẢI re-verify bằng mobile-ui-reviewer + web-ux-reviewer sau khi các phiên kia dừng lại, trước khi coi trang này là xong. Ảnh sản phẩm (mob-11/ux-02, BLOCKER về niềm tin) và review ngôn ngữ vẫn treo.
