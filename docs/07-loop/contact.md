# Vòng hoàn thiện — CONTACT (/vi/contact)

> Bắt đầu 2026-08-24. Trạng thái: đang chạy. Vòng hiện tại: 1/3.

## Tình trạng đầu vào
- build: ✔        · ô trống trong vi.ts: 0 — content/vi.ts được viết đầy đủ bởi một phiên khác trong lúc vòng này đang chạy (2026-08-24 ~14:22). content-market-critic (chạy trước 14:22) báo ctaPrimary/successTitle/successBody/ui.imagePending còn là key path — **đã lỗi thời**, cần review ngôn ngữ lại cho nội dung mới.
- kế thừa từ vòng trước: không có (vòng đầu tiên)
- server dùng để đo mobile: production build tại :3100

## Sổ finding

| id | round | severity | owner | where | requirement | state | number |
|---|---|---|---|---|---|---|---|
| mob-16 | 1 | BLOCKER | engineer | contact-form.tsx:19,23-27,72 | Xác nhận sau submit phải là thứ đầu tiên nhìn thấy | fixed | y=-221px → y=+80,3px trong viewport, focus chuyển tới panel; ở 375×812 scroll tự chỉnh 1319→573 |
| mob-17 | 1 | BLOCKER | engineer | contact-form.tsx | Mọi control form ≥16px trên điện thoại | fixed | 14px → 16px cả 5 control, hết zoom iOS |
| mob-20 | 1 | MAJOR | engineer | page-contact.tsx | 2 link tel/mailto hero phải ≥44px cao | **rejected — đã lỗi thời** | cả `<dl>` chứa 2 link này đã bị phiên song song gỡ khỏi hero theo quyết định GM ghi ở docs/03-structure.md §3 (2026-08-24); link tương đương giờ nằm trong panel thành công, đã ≥44px (min-h-11) |
| mob-18/ux-06 | 1 | MAJOR | engineer | globals.css --color-subtle vùng sáng · contact-form.tsx:161 | Label form ≥4,5:1 | fixed | 2,51:1 → 5,01:1, cả 5 label |
| mob-19 | 1 | MAJOR | engineer | contact-form.tsx:161 | Mọi control form ≥44px cao | fixed | 42px → 46px |
| ux-07 | 1 | MAJOR | engineer | page-contact.tsx:38 | Trang không được mở màn trống không gợi ý có form; #book cần 1 h2 | fixed | h2 thêm vào #book, dùng key có sẵn `contact.form.title` ("Đặt lịch tư vấn", promote từ `<p>` mono lên heading — không viết chữ mới); nút submit giờ ở y=647,6px tại 1440×900, TRÊN fold đầu tiên (trước 491px dưới fold) |
| ux-13 | 1 | MINOR | engineer | page-contact.tsx:26 | Ảnh văn phòng phải hiện trước khi submit | fixed | 0→1 figure trước submit (đặt cột trái #book); gỡ khỏi panel thành công nên chỉ còn hiện 1 lần, không phải 2 |
| mob-21 | 1 | MINOR | engineer | contact-form.tsx:39-52,196-200 | Submit không hợp lệ phải tạo lỗi do trang sở hữu | fixed | 0→4 node [role=alert], aria-invalid null→true, aria-describedby được nối; focus chuyển tới field lỗi đầu tiên. Form chuyển `noValidate`, dùng `validationMessage` của trình duyệt — **routed → writer**: chữ lỗi phụ thuộc locale trình duyệt người xem, cần 1 key tiếng Việt riêng (VD `contact.form.requiredError`) để không phụ thuộc ngôn ngữ máy khách |
| mob-22 | 1 | MINOR | engineer→writer | contact-form.tsx:55-65 | Nội dung email (subject, nhãn Name/Company/Email/Phone) phải tiếng Việt, sống trong content/vi.ts | **routed — chưa sửa, có chủ đích** | vẫn là literal tiếng Anh. Engineer không tự thêm field rỗng vào types.ts (vỡ typecheck) và không tự dịch. Cần key mới: `contact.form.mailSubject`, `contact.form.mailLabels.{name,company,email,phone}` — việc của writer |
| mob-23 | 1 | MINOR | engineer | contact-form.tsx | Nút gửi phải bấm được khi bàn phím ảo mở | **rejected — không có giải pháp CSS đơn giản** | `position: sticky` không co theo visual viewport trên iOS khi bàn phím mở, chỉ layout viewport — cần JS quan sát `visualViewport`, vượt phạm vi 1 fix nhỏ. Engineer chủ động không ship 1 "fix" chỉ đúng trên desktop emulator |
| ux-16 | 1 | MINOR | engineer | site-header.tsx:37 (chung 3 trang) | Token --header-h khớp chiều cao thật | fixed | cùng bản sửa toàn site |

state: open · assigned · fixed · verified · rejected · routed · backlog

## Cần làm lại
- Review ngôn ngữ/typo cho toàn bộ nội dung contact.* (đã có chữ thật, chưa qua review vì content-market-critic chạy trước khi viết xong) — điều phối lại content-market-critic.
- lang-24/lang-25 (BLOCKER cũ, đã lỗi thời — ctaPrimary/successTitle/successBody giờ đã có chữ thật "Mở email đã điền sẵn" / "Thư đã soạn sẵn..." / "Bấm gửi trong cửa sổ vừa mở..."). Đánh dấu **rejected — đã lỗi thời**, nhưng chữ mới CHƯA qua review ngôn ngữ, xem mục trên.
- mob-22, mob-21 follow-up — 2 work order mới cho writer: key cho subject/nhãn email mailto (tiếng Việt), key cho thông báo lỗi bắt buộc (tiếng Việt, không phụ thuộc locale trình duyệt).

## Quyết định đã chốt
- 2026-08-24 — bỏ hẳn khối tel/mailto trong hero contact, thay bằng thông tin liên hệ trong panel sau submit — GM (ghi ở docs/03-structure.md §3), thực thi bởi phiên song song. mob-20 đóng theo quyết định này.

## Còn treo cho người
- Không có mục nào cần GM quyết riêng cho trang này ngoài 2 work order writer ở trên.

## Kết luận
Round 1 sửa xong 8/10 finding có owner=engineer (2 rejected có lý do đo được: mob-20 do đổi thiết kế hero, mob-23 do giới hạn kỹ thuật iOS). 2 finding routed sang writer (mob-21 follow-up, mob-22) — cần work order riêng, chưa phải một vòng content đầy đủ. Trang này ít bị phiên song song động vào hơn products, nhưng vẫn nên re-verify bằng mobile-ui-reviewer trước khi đóng vòng.
