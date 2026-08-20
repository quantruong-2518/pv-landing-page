# 99 — Nội dung không còn chỗ trong khung mới

Khung 3 nhánh (HOME · SẢN PHẨM & GIẢI PHÁP · LIÊN HỆ) do GM chốt 2026-08-20 không có chỗ cho các khối
dưới đây. Code đã gỡ khỏi `web/`; **chữ giữ nguyên ở đây** để khỏi phải viết lại nếu cần dùng.

| File | Khối cũ | Đề xuất nếu muốn dùng lại |
|---|---|---|
| `track-record.md` | 02 — 4 thị trường | Đưa vào HOME, ngay sau *Lịch sử hình thành* |
| `team-and-backing.md` | 04 — lãnh đạo + hậu thuẫn | Trang "Về chúng tôi" nếu sau này mở nhánh 4 |
| `offices.md` | 05 — 4 địa chỉ | Xuống chân trang LIÊN HỆ |
| `domains.md` | 06 — 6 business sector + 2 lớp PV | Rải xuống từng sản phẩm ở 2.1 làm ứng dụng |
| `getting-started.md` | 08 — 4 bước triển khai | Trang LIÊN HỆ, dưới phần kênh liên lạc |
| `faq.md` | 09 — 8 câu + JSON-LD FAQPage | **Đáng tiếc nhất khi mất** — xem cảnh báo bên dưới |
| `why-vietnamese-entity.md` | 07 — vì sao không mua thẳng từ Hàn | HOME hoặc LIÊN HỆ |
| `mocha-and-ai-studio.md` | 03 — MOCHA, Pebble AI Studio | 2.1 Hardware (MOCHA) · 2.2 Software (AI Studio) |

## ⚠ Cảnh báo về FAQ

`docs/03-structure.md` §6 chấm FAQ + JSON-LD `FAQPage` là **tài sản GEO mạnh nhất của trang** và là thứ
duy nhất đóng khoảng trống **G3**. Gỡ FAQ đồng nghĩa mở lại G3. Nếu muốn giữ GEO, cách rẻ nhất là dựng lại
FAQ ở chân trang LIÊN HỆ — nội dung đã có sẵn trong `faq.md`, chỉ cần dán lại và bật `faqSchema` trong
`web/components/schema.tsx`.
