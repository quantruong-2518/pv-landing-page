# Vòng hoàn thiện — HOME (/vi)

> Bắt đầu 2026-08-24. Trạng thái: đang chạy. Vòng hiện tại: 1/3.

## Tình trạng đầu vào
- build: ✔        · ô trống trong vi.ts: 0 (16 field rỗng ban đầu đều chủ đích — `alt` trang trí, `lead` rỗng, `body` timeline rỗng)
- chuỗi còn là key: 0 (content/vi.ts được một phiên khác viết đầy đủ trong lúc vòng này đang chạy, 2026-08-24 ~14:22)
- kế thừa từ vòng trước: không có (vòng đầu tiên)
- server dùng để đo mobile: production build tại :3100 (dev :3002 502 do cache `.next` cũ — đã `rm -rf .next` và khởi động lại ở :3000)

## Sổ finding

| id | round | severity | owner | where | requirement | state | number |
|---|---|---|---|---|---|---|---|
| mob-01/ux-09 | 1 | MAJOR | engineer | site-header.tsx:75 | Header phải có nút hành động dùng được ở mọi kích thước, không cần mở `<details>` | fixed | 0 nút → 1 nút, mọi width; 360px 86,5×44px, 768px+ 207,5×44px, không tràn ngang |
| mob-02/ux-06 | 1 | MAJOR | engineer | globals.css:29,34 (--color-subtle, --color-line-strong vùng sáng) · contact-form.tsx:161 · ui.tsx:171 | Mọi chữ/viền dùng token subtle phải đạt ≥4,5:1 (chữ) / ≥3:1 (viền) trên nền nó đứng | fixed | #97a4bd→#5f6f94 (2,51→5,01:1 trên trắng, 2,32→4,68:1 trên surface); #cbd5e1→#818fa9 (1,48→3,26:1); HOME 0 node lỗi (trước 10) |
| mob-03 | 1 | MAJOR | engineer | site-footer.tsx | Link footer ≥44×44, có khoảng cách >0 | fixed (đã sửa bởi phiên khác, engineer xác nhận) | 0 link dưới 44px, khoảng cách nhỏ nhất giữa 2 link 4px |
| mob-04 | 1 | MAJOR | engineer | ui.tsx (screen) · page-home.tsx hero | Khối mở màn không vượt 1 viewport ở 360x640 | open — CHƯA ĐỘNG VÀO | hero vẫn 861,4px/584px (+277px) ở 360x640; 872,2/756 ở 375x812 — y hệt số cũ |
| mob-05 | 1 | MINOR | engineer | mobile-menu.tsx | Toàn bộ menu phải hiện hết ở 360x640 | fixed | 41px bị che → 0px; mục cuối hiện đủ, panel đáy 544,8px trong khung 640px |
| mob-06 | 1 | MINOR | engineer | mobile-menu.tsx (file mới) | Menu phải đóng khi Escape hoặc tap ra ngoài | fixed | cả hai đường đóng đều hoạt động (trước: không cái nào) |
| mob-07 | 1 | MINOR | writer | page-home.tsx eyebrow/pillarsTitle/footnote | Nhãn mono không xuống dòng ở 360px | routed — chưa chạm, đúng ranh giới | chờ vòng content |
| mob-08 | 1 | MINOR | engineer | ui.tsx, page-home.tsx | Body copy điện thoại ≥16px, nhất quán | fixed | 14px→16px toàn bộ; tiêu đề cũng nâng theo để không nhỏ hơn body của nó |
| ux-01 | 1 | BLOCKER | engineer | site-header.tsx (breakpoint lg→md) · page-home.tsx · ui.tsx | Dải 768-1023px phải fit ngân sách `screen` + nav dùng được | fixed | hero 1007/703→704/704 tại 1023×768; nav hiện (không còn hamburger) ở 1023px; 0px tràn ngang |
| ux-03 | 1 | MAJOR | engineer | ui.tsx:38-39, globals.css:98 | Snap không được cắt cụt nội dung ở khối tràn ngân sách | fixed, nhưng **routed → cần người quyết** | snap-align chỉ còn trên khối `screen` (luôn fit); mandatory→proximity. Hàng 4-pillar giờ dừng được, lệch 0,4px (trước 256,6px). **docs/03-structure.md §3 hiện trích dẫn đúng luật cũ (snap-align:start mọi Section, y mandatory) — tài liệu và trang đang nói khác nhau, cần GM cập nhật §3 giống cách Why Now đã được sửa 2026-08-21** |
| ux-11 | 1 | MAJOR | engineer | page-home.tsx:115-123 | Rail trang trí của timeline phải trỏ đúng chiều đọc (ngang theo hàng) | fixed | border-left→border-top, dot chuyển góc trên-trái mỗi ô; không còn rail dọc kéo mắt xuống cột |
| ux-16 | 1 | MINOR | engineer | site-header.tsx:37 | Token --header-h phải khớp chiều cao thật render ra | fixed | 65px→64px (border-b→box-shadow); mọi anchor lệch ≤0,3px (trước 1px) |
| ux-18 | 1 | MINOR | engineer | site-footer.tsx | Footer không được khai báo snap-start nếu vị trí đó không tới được | fixed | snap-align:start→none trên footer cả 3 trang |

state: open · assigned · fixed · verified · rejected · routed · backlog

## Việc route sang GM (không phải code)
- ux-17 (MINOR) — decorator logo hero 419×419 = 36% chiều rộng nội dung, ~15x logo header, không mang thông tin gì mới. GM đã chốt trong context/media-plan.md #1 — chỉ ghi nhận, không phải finding cần sửa. Nợ "chứng minh có thật" của nó đổ về History (xem ux-11 và backlog ảnh ở products.md/contact.md).

## Cần làm lại
- lang-02, lang-03, lang-04, lang-06, lang-09, lang-10 và các finding ngôn ngữ khác từ content-market-critic (vòng trước 14:22) — vẫn còn hiệu lực trên HOME vì nội dung HOME không đổi nhiều từ lúc đó. Cần một vòng content với web-content-writer, phải mở intake gate A→E với người trước (CLAUDE.md §7 luật biên giới #4) — CHƯA làm trong vòng này.
- lang-01 (BLOCKER — "Hồ sơ công ty mẹ" mâu thuẫn với "thành viên nhóm") — **CHƯA sửa**, dù `labels.parent` và `footer.tagline` đã được một phiên khác sửa đúng hướng (Nhóm công ty → Thành viên của). `home.history.kicker` vẫn còn "02 · Hồ sơ công ty mẹ" — cần sửa cùng đợt.
- mob-01 follow-up (routed → writer) — nút CTA header mới đang tạm dùng `nav.contact`/`nav.cta` sẵn có; "Đặt lịch tư vấn 30 phút" vỡ 2 dòng (60,6px) trong hàng header 56px ở 360px. Cần 1 nhãn header ngắn riêng.
- mob-04 (MAJOR, engineer — chưa ai động vào) — hero vẫn tràn 277px ở 360x640 (861/584px) và 872/756 ở 375x812; 410px trống thuần trang trí giữa CTA và h2 kế tiếp. Còn nguyên trong danh sách round 2.

## Quyết định đã chốt
- 2026-08-24 — snap đổi từ `mandatory`/`start` sang `proximity`/`none` trên các khối tràn ngân sách, chỉ giữ snap cứng cho khối `screen` (luôn fit) — web-ui-engineer, theo yêu cầu đo được ở ux-03.

## Còn treo cho người
- ux-03 → docs/03-structure.md §3 cần cập nhật để khớp hành vi snap mới (giống lần sửa Why Now 2026-08-21) — GM.
- lang-01 → home.history.kicker "Hồ sơ công ty mẹ" cần sửa cùng lúc mở vòng content — writer, sau khi GM/HQ chốt cấu trúc sở hữu (docs/05-backlog.md #2).

## Kết luận
Round 1 sửa xong 10/13 finding có owner=engineer (build xanh, đo lại xác nhận). mob-04 (hero tràn ngân sách 360px) chưa ai chạm tới — sang round 2. Nội dung tiếng Việt (lang-01 và các finding ngôn ngữ khác) vẫn treo, cần một vòng content riêng với intake người thật. Hai phiên Claude Code khác đang sửa song song trên cùng cây làm việc — số đo trên chỉ đúng tại thời điểm đo, cần re-verify trước khi đóng vòng.
