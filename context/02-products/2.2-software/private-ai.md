# 2.2.2 — Private AI

**Key i18n:** `products.software.groups[1].*` — `modules[]` = Build · Train/Adapt · Deploy;
`targets[]` = 5 đích triển khai.
**Origin:** `pv`

## Đã điền

| Key | EN | VI |
|---|---|---|
| `name` | Private AI | AI riêng tư |
| `tagline` | Your model, your data, your infrastructure | Mô hình của bạn, dữ liệu của bạn, hạ tầng của bạn |
| `modules[0].title` | Build | Xây dựng |
| `modules[1].title` | Train / adapt | Huấn luyện / tinh chỉnh |
| `modules[2].title` | Deploy | Triển khai |
| `targetsTitle` | Deployment targets | Đích triển khai |
| `targets[0].title` | On-device | Trên thiết bị |
| `targets[1].title` | Edge | Biên |
| `targets[2].title` | On-premise | Tại chỗ |
| `targets[3].title` | Private cloud | Đám mây riêng |
| `targets[4].title` | GPU / AI infrastructure | Hạ tầng GPU / AI |

## Vật liệu tái sử dụng (từ landing cũ)

**Định vị — EN:** Pebble Vina deploys on-premise inference servers so an organisation can run its own
models on its own documents. A configuration ships today on commercial GPUs; the ESPRESSO version follows
the Sep 2026 roadmap.
**VI:** Pebble Vina triển khai máy chủ suy luận tại chỗ để tổ chức chạy mô hình của mình trên tài liệu của
mình. Cấu hình chạy được ngay hôm nay dùng GPU thương mại; bản ESPRESSO theo lộ trình 9/2026.

**Câu trả lời "dữ liệu có ra khỏi công ty không" — EN:** Not under an on-site architecture. Pebble Square
designs explicitly for processing "without reliance on internet or network", and an LLM server placed
inside your own infrastructure keeps both the data and the model behind your firewall.
**VI:** Không, nếu triển khai theo kiến trúc tại chỗ. Pebble Square thiết kế rõ ràng cho việc xử lý "không
phụ thuộc internet hay mạng", còn máy chủ LLM đặt trong hạ tầng của bạn thì cả dữ liệu lẫn mô hình đều nằm
sau tường lửa của bạn.

**Tệp người đọc** (`docs/00-brief.md`): khối gov / đơn vị nhạy cảm dữ liệu — câu hỏi 5 giây đầu của họ là
*"Chạy AI mà dữ liệu không ra khỏi nhà được không?"*. Nhánh này là câu trả lời.

## Mối nối xuống phần cứng — điểm mạnh nhất của trang

Năm đích triển khai xếp đúng theo thang điện năng, và mỗi đích có phần cứng thật đứng sau:

| Đích | Phần cứng | Nhãn |
|---|---|---|
| On-device | MINT | `shipped` |
| Edge | PAPAYA FLEX | `shipped` |
| On-premise | ESPRESSO / GPU | `roadmap` / `shipped` |
| Private cloud | GPU | `shipped` |
| GPU / AI infrastructure | GPU, HPC | `shipped` |

Nên thể hiện bằng **hình** chứ không bằng chữ — xem `context/media-plan.md`.

## Còn thiếu — chờ [NGƯỜI]

- "Build" và "Train/Adapt" thực tế Pebble Vina làm tới đâu (tự huấn luyện? fine-tune? chỉ tích hợp?).
- Có mô hình nội bộ nào của PS dùng được không (IR Deck nhắc "in-house LLMs up to 120B" — thuộc ESPRESSO).
