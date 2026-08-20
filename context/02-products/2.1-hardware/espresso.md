# 2.1.3 — ESPRESSO

**Key i18n:** `products.hardware.items[2].*`
**Nhãn:** `roadmap` — dự kiến 9/2026 · **Origin:** `ps`

> ⚠ **Luật 4 của repo** (`CLAUDE.md` §2): ESPRESSO **không** xuất hiện trên bất kỳ trang công khai nào
> của Pebble Square, chỉ có trong IR Deck 05/01/2026. Mọi lần nhắc phải kèm nhãn `roadmap` **và** ghi rõ
> nguồn là tài liệu nhà đầu tư. Chưa được HQ duyệt cho đối ngoại — xem `docs/05-backlog.md` #9.

## Đã điền

| Key | EN | VI |
|---|---|---|
| `name` | ESPRESSO | ESPRESSO |
| `tagline` | Digital-PIM on SRAM · for heavy workloads and private LLMs | Digital-PIM nền SRAM · cho tải nặng và LLM riêng |
| `statusNote` | Expected Sep 2026 · investor material | Dự kiến 9/2026 · tài liệu nhà đầu tư |
| `capabilities[0].title` | Large-model inference | Suy luận mô hình lớn |
| `capabilities[1].title` | AI accelerator | Bộ tăng tốc AI |
| `capabilities[2].title` | AI server / infrastructure | Máy chủ AI / hạ tầng |

## Spec đang chạy (`specs[0]`, nhãn `roadmap`)

| | |
|---|---|
| Giá trị | **160 TOPS** @INT8 |
| Ghi chú EN | 10 W, 16 TOPS/W. Four-chip card reaches 640 TOPS. Runs in-house LLMs up to 120B parameters. |
| Ghi chú VI | 10 W, 16 TOPS/W. Card 4 chip đạt 640 TOPS. Chạy LLM nội bộ tới 120 tỷ tham số. |
| Nguồn | Pebble Square IR Deck 05/01/2026 |
| statusNote | Expected Sep 2026 / Dự kiến 9/2026 |

## Vật liệu để viết `body`

- Nhánh kiến trúc **thứ hai** (Digital-PIM trên SRAM), khác nhánh Analog-PIM của MINT/PAPAYA.
- Nhắm: AI PC, thiết bị LLM riêng, robot, edge công nghiệp.
- Dạng đóng gói theo IR Deck: chip ESPRESSO · module M.2 · card tăng tốc · máy chủ LLM tại chỗ.
