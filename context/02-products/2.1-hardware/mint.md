# 2.1.1 — MINT

**Key i18n:** `products.hardware.items[0].*` — `name` · `tagline` · `body` · `capabilities[].{title,body}` · `specs[]` · `media.alt`
**Nhãn:** `shipped` · **Origin:** `ps` (Pebble Square)

## Đã điền

| Key | EN | VI |
|---|---|---|
| `name` | MINT | MINT |
| `tagline` | Analog-PIM · second-generation edge AI chip | Analog-PIM · chip edge AI thế hệ 2 |
| `capabilities[0].title` | Sensor AI | AI cảm biến |
| `capabilities[1].title` | Voice AI | AI giọng nói |
| `capabilities[2].title` | Ultra-low-power Edge AI | Edge AI siêu tiết kiệm điện |

## Spec đang chạy (`specs[0]`)

| | |
|---|---|
| Giá trị | **17.6 TOPS/W** (VI: 17,6 TOPS/W) |
| Nhãn | MINT energy efficiency / Hiệu suất năng lượng chip MINT |
| Ghi chú EN | Analog-PIM, ~30 GOPS, 5×5 mm die. Measured on real silicon, in mass production since May 2023. |
| Ghi chú VI | Analog-PIM, ~30 GOPS, die 5×5 mm. Đo trên chip thật, sản xuất hàng loạt từ 5/2023. |
| Nguồn | Pebble Square · SmartTimes/JBNU · IR Deck tr.21 |
| Status | `shipped` |

## Vật liệu để viết `body` và các `capabilities[].body`

- Kiến trúc: crossbar array cho tính toán analog, ô khớp thần kinh **256 trạng thái**, độ chính xác
  **8-bit**, bộ xử lý tín hiệu hỗn hợp số/analog. Chạy FCNN, CNN, DNN, RNN ngay trên thiết bị.
- Mốc: phát triển 12/2022 → **sản xuất hàng loạt 5/2023**.
- Bằng chứng ứng dụng **Voice AI**: PoC 02/2024 — hệ đèn điều khiển bằng giọng nói kèm chuông khẩn cấp.
- Bằng chứng thị trường **Sensor AI / Home IoT**: NDA mua có điều kiện với MEISEI ELECTRIC Co., Ltd.
  (Nhật) cho hệ Home IoT dùng MINT, 03/2024.
- Nguồn: `docs/01-proof-bank.md`; pebble-square.com đọc 20/08/2026.

⚠ **Không** gán arc-fault / điện mặt trời cho MINT (`CLAUDE.md` §2 luật 2).
