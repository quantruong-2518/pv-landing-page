# 07 — Sổ vòng hoàn thiện

Mỗi trang một file: `home.md` · `products.md` · `contact.md`.

Đây là **trạng thái chung của tổ đội**, không phải nhật ký. Bốn agent đọc và ghi vào đây, nên format
giữ nguyên theo mẫu trong `.claude/skills/ship-page/SKILL.md` §Ledger template.

Ba điều làm sổ này còn giá trị:

- Mỗi finding có **một id sống suốt vòng đời** — `mob-03` ở vòng 1 vẫn là `mob-03` ở vòng 3.
- Cột `number` bắt buộc: đo bao nhiêu trước, bao nhiêu sau. Không có số thì không có gì để tin.
- Không xoá dòng. Finding bị bác vẫn nằm đó kèm lý do — nếu không, vòng sau sẽ nêu lại y hệt.

Cột `state`: `open` · `assigned` · `fixed` · `verified` · `rejected` · `routed` · `backlog`.
