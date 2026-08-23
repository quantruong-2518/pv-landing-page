# context/ — kho nội dung chờ điền

Thư mục này **không phải nguồn sự thật đang chạy**. Nguồn đang chạy vẫn là `web/content/en.ts`
(canonical) và `web/content/vi.ts`. Đây là **bàn soạn**: nơi giữ lại nội dung cũ còn dùng được sau khi
refactor sang khung 3 nhánh, và nơi viết nháp nội dung mới trước khi bê vào i18n.

> `CLAUDE.md` §1 cấm chép copy sang markdown để tránh hai nguồn sự thật. Thư mục này là **ngoại lệ có
> chủ đích** do GM yêu cầu (2026-08-20), với một luật bù: **file nào đã điền vào `en.ts`/`vi.ts` thì đánh
> dấu `ĐÃ ĐIỀN` ở đầu file.** Khi nghi ngờ, `*.ts` thắng.

## Cách dùng

1. Mở file tương ứng với khối cần viết.
2. Mỗi file ghi sẵn **key i18n** của khối đó → viết xong thì dán thẳng vào `en.ts` và `vi.ts`.
3. Mọi fact phải tra được về `docs/01-proof-bank.md` và mang nhãn `shipped` / `roadmap` (`CLAUDE.md` §2).

## Bản đồ

```
01-home/            1. HOME
  1.1-hero.md         slogan / hero
  1.2-why-now.md      why now
  1.3-history.md      lịch sử hình thành
02-products/        2. SẢN PHẨM & GIẢI PHÁP
  2.1-hardware/       MINT · PAPAYA · ESPRESSO · GPU/HPC
  2.2-software/       enterprise software · private AI
03-contact/         3. LIÊN HỆ
99-unplaced/        nội dung cũ KHÔNG còn chỗ trong khung mới — giữ lại để khỏi mất
media-plan.md       ảnh nào nên có ở đâu, tỉ lệ, cách diễn giải
```

## Trạng thái

| File | Trạng thái |
|---|---|
| `01-home/1.1-hero.md` | **VI ĐÃ ĐIỀN** (21/08) · EN chờ, compile từ `content-system/specs/home.yaml` |
| `01-home/1.2-why-now.md` | **VI ĐÃ ĐIỀN** (21/08) · EN chờ, compile từ `content-system/specs/home.yaml` |
| `01-home/1.3-history.md` | **VI ĐÃ ĐIỀN** (21/08) · EN chờ, compile từ `content-system/specs/home.yaml` |
| `02-products/**` | tiêu đề ĐÃ ĐIỀN · mô tả chờ |
| `03-contact/contact.md` | ĐÃ ĐIỀN (dữ liệu pháp nhân) · lead chờ |
| `99-unplaced/**` | kho lưu, không nằm trên trang |
