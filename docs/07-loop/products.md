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
- ux-14 (MINOR) — slot ảnh #private-ai (sơ đồ 5 đích triển khai) đang lặp lại đúng nội dung của thang bậc chữ 60px bên dưới nó (cùng 5 bước, cùng tên phần cứng). Đề xuất: HOẶC bỏ slot ảnh (thang chữ chiếm trọn 1072px), HOẶC brief lại để sơ đồ thể hiện thứ chữ không làm được — thang điện năng từ milliwatt tới rack, vẽ theo tỉ lệ tương đối.
- ux-12 — backlog #29 (bỏ `screen` khỏi khối index) đúng hướng nhưng số liệu ghi trong đó thấp hơn thực tế 1 bậc: thực đo 755px/703px budget ở 1024×768 (+52px), không phải mức lệch 4px như backlog ghi ở 1366×768. Cần cập nhật số trong docs/05-backlog.md #29 trước khi GM quyết.

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
