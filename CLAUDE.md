# CLAUDE.md — Luật chơi của repo pv-landing-lab

Đọc file này trước khi sửa bất cứ thứ gì. `README.md` nói repo là gì; file này nói **được phép làm gì**.

## 1. Nguồn sự thật

| Cần biết | Đọc ở đâu |
|---|---|
| Bằng chứng / con số về Pebble Square | `docs/01-proof-bank.md` — **không lấy số từ trí nhớ, luôn tra bảng này** |
| Thông điệp & giọng | `docs/02-message-map.md` |
| Trang có những khối nào, vì sao | `docs/03-structure.md` |
| Copy thật (VI/EN) | `web/content/vi.ts`, `web/content/en.ts` — **duy nhất**, không chép sang markdown |
| Hồ sơ pháp nhân, liên hệ | `web/content/site.ts` |

Nguồn cấp 1 nằm ở repo hàng xóm `../pebblevn-ppt-first-meet/company/` (IR Deck 05/01/2026,
`parent-pebble-square.md`, `memory/`). Repo này **không** sao chép chúng — chỉ trích và ghi nguồn.

## 2. Ba điều cấm (mất uy tín tức thì)

1. **Không trộn "đã có" với "lộ trình".** Mọi fact đưa lên trang phải mang một trong ba nhãn của
   `proof-bank`: `shipped` · `roadmap` · `internal`. Component `<Fact>` bắt buộc nhận `status`.
2. **Không gán arc-fault / điện mặt trời cho Pebble Square.** PS làm *anomaly + bảo trì dự đoán cho
   robot/máy móc*. Arc-fault là lớp ứng dụng Pebble Vina tự dựng cho thị trường VN.
3. **Không trích bài "MDPI Electronics 2024 — Electrical Anomaly Detection Based on PIM Chip"** — nguồn ma,
   đã kiểm chứng 2026-06-14 là không tồn tại.

Thêm: **không bịa số doanh thu, số khách hàng, tên khách hàng, logo đối tác.** Chưa có thì để trống và
ghi vào `docs/05-backlog.md`.

## 3. Kỷ luật code

- **Song ngữ đối xứng.** `vi.ts` và `en.ts` cùng khớp type `LandingContent` trong `web/content/types.ts`.
  Thêm field ở một bên mà không thêm bên kia → `tsc` gãy. Đó là chủ ý.
- **Không hardcode màu.** Chỉ dùng token trong `web/app/globals.css`. Đổi brand = đổi một chỗ.
- **Không hardcode chữ trong component.** Chữ đi từ `content/*` xuống qua props. Component chỉ biết bố cục.
- **SSR mặc định.** Không `"use client"` trừ khi thật sự cần tương tác. Landing phải crawl được (GEO/AEO).
- Trước khi commit: `npm run build` phải xanh.

## 4. Quy ước ngôn ngữ

- **VI là canonical** (`/`), **EN là bản đầy đủ song song** (`/en`) — không rút gọn, vì tệp FDI Hàn/GCC
  đọc EN là chính.
- Số trong bản VI dùng **dấu phẩy thập phân** (17,6 TOPS/W); bản EN dùng **dấu chấm** (17.6 TOPS/W).
- Giữ nguyên tên riêng: Pebble Square Inc. · MOCHA · MINT · PAPAYA FLEX · ESPRESSO · Analog-PIM · Digital-PIM.

## 5. Quan hệ với pv-main-web

Repo này **không** import code từ `pv-main-web` và **không** tự ý sửa nó. Nếu một khối ở đây chứng minh
được giá trị, viết đề xuất vào `docs/05-backlog.md`, GM quyết có port sang site chính hay không.
