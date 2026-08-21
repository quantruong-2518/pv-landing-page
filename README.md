# pv-landing-lab — Phòng thí nghiệm landing page Pebble Vina

Repo **nghiên cứu + dựng thử** site kiểu mẫu cho Pebble Vina: **ba trang** — HOME · SẢN PHẨM & GIẢI PHÁP ·
LIÊN HỆ — song ngữ **EN (chính) / VI (phụ)**, **nội dung bám sát trang chính thức của công ty mẹ
Pebble Square Inc.**

Đây là **sandbox độc lập** — không phải website chính thức. Website chính là
`pebblevn-ppt-first-meet/projects/pv-main-web` (đa trang, brand kit đã khoá). Repo này tự do thử
hướng thị giác và cấu trúc khác; cái gì chạy được thì mới ghép ngược sang site chính.

## Vì sao repo này tồn tại

Research của site chính (`pv-main-web/docs/landing/RESEARCH-cau-truc-section.md`, 2026-08-03) kết luận
hai lỗ hổng đỏ của trang chủ hiện tại là **G1 — không có tầng bằng chứng** và **G2 — không có một con số nào**,
và ghi rõ: *"chưa có (1) spec chip từ HQ và (2) proof mượn từ công ty mẹ thì G1/G2 chưa đóng được"*.

Từ **IR Deck Pebble Square 05/01/2026** (nguồn cấp 1, đã nằm trong `company/sources/`), hai đầu vào đó
**giờ đã có**. Repo này là câu trả lời: một landing dựng quanh đúng những bằng chứng ấy.

## Bản đồ

| Đường dẫn | Là gì |
|---|---|
| `docs/00-brief.md` | Mục tiêu, đối tượng, một hành động, phạm vi, luật chơi |
| `docs/01-proof-bank.md` | ★ **Ngân hàng bằng chứng Pebble Square** — mọi con số + nguồn + nhãn dùng-được / lộ-trình / cấm |
| `docs/02-message-map.md` | Điểm mạnh PS → thông điệp landing (song ngữ), kèm bằng chứng đỡ lưng từng câu |
| `docs/03-structure.md` | Khung ba nhánh, định tuyến, luật khối + snap, nhịp thị giác |
| `docs/04-benchmarks.md` | Bóc cấu trúc site tham chiếu — nhóm chip edge-AI + nhóm "công ty con mượn uy tín mẹ" |
| `docs/05-backlog.md` | Cái còn thiếu — chỉ người mới cấp được, không bịa |
| `scripts/wsl.sh` | Chạy npm bằng Node trong WSL — xem mục **Chạy** |
| `context/` | Bàn soạn nội dung — nháp theo khung mới + kho nội dung cũ còn dùng được |
| `web/` | Next.js 15 + Tailwind v4 — 3 trang × 2 ngôn ngữ, EN `/` + VI `/vi` |
| `.claude/skills/content-i18n/` | ★ **Hệ thống nội dung đa ngôn ngữ** (vi/en/ko) — compiler ngữ nghĩa + QA tự động. Xem README trong thư mục đó |
| `content-system/` | Sự thật của dự án ở dạng máy đọc được — facts, claim ledger, thuật ngữ, brand voice |
| `tests/` | `python3 -m unittest discover tests` — kiểm định của hệ thống nội dung |

**Nội dung chữ sống ở code:** `web/content/en.ts` (canonical) và `web/content/vi.ts` là nguồn sự thật
của copy **đang chạy**. `context/` là bàn soạn — nháp và kho nội dung cũ; khi nghi ngờ, `*.ts` thắng.
Docs mô tả *vì sao*, code giữ *cái gì*.

Phần lớn `lead`/`body` hiện là chuỗi rỗng: cấu trúc lên trước, chữ điền sau.

```bash
grep -o ': ""' web/content/en.ts | wc -l   # đếm ô còn trống (hiện: 63)
```

## Chạy

```bash
cd web
npm install
npm run dev      # http://localhost:3000 · /products · /contact · và /vi/…
npm run build    # phải xanh trước khi commit
```

**Chỉ trên máy Windows/WSL** mới cần `scripts/wsl.sh`: khi repo nằm trên đường dẫn UNC
(`\\wsl.localhost\...`), Node cài trên Windows không chạy được ở đó, còn `wsl bash -lc` thì không tự nạp
nvm nên `npm` rơi về bản Windows. Trên macOS/Linux chạy thẳng `npm` như trên, không cần script này.

```bash
wsl bash ~/work/pebble-vina/pv-landing-lab/scripts/wsl.sh npm run build
wsl bash ~/work/pebble-vina/pv-landing-lab/scripts/wsl.sh npm run dev
```

## Bốn luật không được phá

1. **Tách "đã có" khỏi "lộ trình".** ESPRESSO 160 TOPS là *lộ trình 9/2026* theo deck IR — trên trang
   phải có nhãn. MINT 17,6 TOPS/W là *đã sản xuất hàng loạt 5/2023*. Trộn hai thứ = mất uy tín.
2. **Không gán arc-fault cho Pebble Square.** Trang chính thức của PS **không** liệt kê arc-fault/điện mặt
   trời. Năng lực PS khớp được là *anomaly / bảo trì dự đoán*; arc-fault là góc tiếp cận do Pebble Vina dựng.
3. **Không trích "MDPI Electronics 2024 — Electrical Anomaly Detection Based on PIM Chip".** Bài này
   **không tồn tại**. Đã bị gỡ khỏi mọi tài liệu công ty từ 2026-06-14.

4. **Không nói ESPRESSO như hàng đang có.** Kiểm chứng 2026-08-20: ESPRESSO **không xuất hiện ở bất kỳ
   trang công khai nào** của Pebble Square — chỉ có trong IR Deck. Mọi lần nhắc phải kèm nhãn vàng và
   ghi rõ đó là tài liệu nhà đầu tư.

Chi tiết + nguồn: `docs/01-proof-bank.md`.
