# 2.1.4 — GPU / High-performance compute

**Key i18n:** `products.hardware.items[3].*`
**Nhãn:** `shipped` · **Origin:** `pv` — **đây là lớp Pebble Vina dựng, KHÔNG phải sản phẩm Pebble Square**

> Nhánh này không có trong danh mục của công ty mẹ. Nó là phần Pebble Vina tự làm tại Việt Nam: cung cấp
> và tích hợp hạ tầng tính toán thương mại cho khách hàng chưa hợp với chip edge, hoặc cần huấn luyện.
> Trình bày phải gắn tag `pv` để không ai hiểu nhầm là năng lực của PS (`CLAUDE.md` §2 luật 2).

## Đã điền

| Key | EN | VI |
|---|---|---|
| `name` | GPU & high-performance compute | GPU & tính toán hiệu năng cao |
| `tagline` | Pebble Vina integration layer · commercial silicon | Lớp tích hợp của Pebble Vina · phần cứng thương mại |
| `capabilities[0].title` | GPU products | Sản phẩm GPU |
| `capabilities[1].title` | AI training | Huấn luyện AI |
| `capabilities[2].title` | Large-scale inference | Suy luận quy mô lớn |
| `capabilities[3].title` | HPC | HPC |
| `capabilities[4].title` | AI data center | Trung tâm dữ liệu AI |

## Vật liệu để viết `body`

- Câu định vị đã có, dùng lại được: *"Cấu hình chạy được ngay hôm nay dùng GPU thương mại; bản ESPRESSO
  theo lộ trình 9/2026."*
- Lý do nhánh này tồn tại (nói thẳng, đúng giọng repo): edge chip giải bài toán suy luận tại chỗ, **không**
  giải bài toán huấn luyện. Khách cần huấn luyện hoặc suy luận quy mô lớn thì GPU vẫn là lời giải đúng, và
  Pebble Vina dựng nó cho họ thay vì giả vờ chip PIM làm được mọi thứ.

## ⛔ Cấm

- Không bịa tên hãng GPU đang phân phối, không bịa cấu hình, không bịa số khách hàng (`CLAUDE.md` §2).
- Chưa có thoả thuận phân phối nào công bố được → nói ở mức **năng lực tích hợp**, không nói **đại lý của X**.
- Cần [NGƯỜI] xác nhận: có quan hệ phân phối GPU nào nêu tên công khai được không? → `docs/05-backlog.md`.
