# 2.1.2 — PAPAYA

**Key i18n:** `products.hardware.items[1].*`
**Nhãn:** `shipped` · **Origin:** `ps` (Pebble Square)

## Đã điền

| Key | EN | VI |
|---|---|---|
| `name` | PAPAYA FLEX | PAPAYA FLEX |
| `tagline` | Analog-PIM · vision at milliwatt scale | Analog-PIM · thị giác máy ở mức miliwatt |
| `capabilities[0].title` | Vision AI | AI thị giác |
| `capabilities[1].title` | Camera | Camera |
| `capabilities[2].title` | Inspection | Kiểm tra ngoại quan |
| `capabilities[3].title` | Robotics | Robot |

## Spec đang chạy

**`specs[0]` — ~50×**
- Nhãn EN: Lower power than NVIDIA Jetson Nano — VI: Điện năng thấp hơn NVIDIA Jetson Nano
- EN: PAPAYA FLEX at 0.1–0.15 W against 5–10 W on the same class of machine-vision workload (ResNet-50).
- VI: PAPAYA FLEX 0,1–0,15 W so với 5–10 W, trên cùng loại tải thị giác máy (ResNet-50).
- Nguồn: Pebble Square IR Deck 05/01/2026 · `shipped`

**`specs[1]` — ~10,000×** (VI: ~10.000×)
- Nhãn EN: Less power for the AI task at a 5G base station — VI: Ít điện hơn cho tác vụ AI tại trạm gốc 5G
- EN: PAPAYA against an NVIDIA L4: 320–332 W falls to 0.03 W. For the AI task specifically, not the whole station.
- VI: PAPAYA so với NVIDIA L4: 320–332 W còn 0,03 W. Cho riêng tác vụ AI, không phải cả trạm.
- Nguồn: Pebble Square IR Deck 05/01/2026 · `shipped`

## Vật liệu để viết `body`

- Gói nhỏ hơn Jetson Nano khoảng **25 lần** (IR Deck).
- Ứng dụng PS tự công bố có liên quan: **Vision** (xử lý ảnh tốc độ cao, điện năng thấp cho sản xuất và
  y tế: kiểm tra ngoại quan, đếm, phân loại), **Fault Analysis**, **Risk Management** (chẩn đoán thời gian
  thực và phát hiện bất thường cho robot, máy móc tự động), **Security** (phát hiện mối đe doạ không phụ
  thuộc internet hay mạng).
- Câu đối chiếu thẳng thắn nên giữ: *"Khác ở điện năng và kích thước, không phải mạnh hơn về mọi mặt.
  Nếu bài toán của bạn là huấn luyện mô hình lớn, GPU vẫn là lựa chọn đúng."*
