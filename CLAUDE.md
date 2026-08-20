# CLAUDE.md — Luật chơi của repo pv-landing-lab

Đọc file này trước khi sửa bất cứ thứ gì. `README.md` nói repo là gì; file này nói **được phép làm gì**.

## 1. Nguồn sự thật

| Cần biết | Đọc ở đâu |
|---|---|
| Bằng chứng / con số về Pebble Square | `docs/01-proof-bank.md` — **không lấy số từ trí nhớ, luôn tra bảng này** |
| Thông điệp & giọng | `docs/02-message-map.md` |
| Trang có những khối nào, vì sao | `docs/03-structure.md` |
| Copy thật (EN/VI) | `web/content/en.ts` (canonical), `web/content/vi.ts` — **duy nhất**, không chép sang markdown |
| Hồ sơ pháp nhân, liên hệ | `web/content/site.ts` |

Nguồn cấp 1 nằm ở repo hàng xóm `../pebblevn-ppt-first-meet/company/` (IR Deck 05/01/2026,
`parent-pebble-square.md`, `memory/`). Repo này **không** sao chép chúng — chỉ trích và ghi nguồn.

## 2. Bốn điều cấm (mất uy tín tức thì)

1. **Không trộn "đã có" với "lộ trình".** Mọi fact đưa lên trang phải mang một trong ba nhãn của
   `proof-bank`: `shipped` · `roadmap` · `internal`. Component `<Fact>` bắt buộc nhận `status`.
2. **Không gán arc-fault / điện mặt trời cho Pebble Square.** PS làm *anomaly + bảo trì dự đoán cho
   robot/máy móc*. Arc-fault là lớp ứng dụng Pebble Vina tự dựng cho thị trường VN.
3. **Không trích bài "MDPI Electronics 2024 — Electrical Anomaly Detection Based on PIM Chip"** — nguồn ma,
   đã kiểm chứng 2026-06-14 là không tồn tại.
4. **Không nói ESPRESSO như hàng đang có.** Nó chỉ nằm trong IR Deck, không có trên trang công khai của PS
   (kiểm chứng 2026-08-20). Mọi lần nhắc phải kèm nhãn `roadmap` và ghi rõ nguồn là tài liệu nhà đầu tư.

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

- **EN là canonical** (`/`), **VI là bản đầy đủ song song** (`/vi`) — không bản nào rút gọn. Tệp quyết định
  (FDI Hàn, đối tác Nhật, GCC, nhà đầu tư, kỹ sư) đọc tiếng Anh.
- Số trong bản EN dùng **dấu chấm thập phân** (17.6 TOPS/W); bản VI dùng **dấu phẩy** (17,6 TOPS/W).
- Giữ nguyên tên riêng: Pebble Square Inc. · MOCHA · MINT · PAPAYA FLEX · ESPRESSO · Pebble AI Studio ·
  Analog-PIM · Digital-PIM, và tên sáu business sector của họ.
- Bám sát nội dung trang mẹ nhưng **viết lại bằng lời của mình**; chỉ giữ nguyên văn tên riêng, thông số,
  và vài cụm chữ ký ngắn đặt trong ngoặc kép. Không bê nguyên đoạn.

## 4b. Luật một khối = một màn hình

Mỗi `<Section>` cao `calc(100svh - 4rem)`, căn giữa dọc, `snap-start`; `html` có
`scroll-snap-type: y mandatory` từ 768px và cao ≥640px. **Thêm chữ vào một khối là làm khối đó tràn màn.**
Muốn thêm ý thì cắt ý khác hoặc tách khối mới. Chi tiết: `docs/03-structure.md` §2.

## 5. Quan hệ với pv-main-web

Repo này **không** import code từ `pv-main-web` và **không** tự ý sửa nó. Nếu một khối ở đây chứng minh
được giá trị, viết đề xuất vào `docs/05-backlog.md`, GM quyết có port sang site chính hay không.
