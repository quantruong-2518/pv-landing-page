# pv-landing-lab — Phòng thí nghiệm landing page Pebble Vina

Repo **nghiên cứu + dựng thử** một **landing page kiểu mẫu** cho Pebble Vina: một trang duy nhất,
song ngữ VI/EN, **nội dung gần như hoàn toàn tựa vào điểm mạnh của công ty mẹ Pebble Square Inc. (Hàn Quốc)**.

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
| `docs/03-structure.md` | Khung 12 khối của landing kiểu mẫu + vì sao từng khối tồn tại |
| `docs/04-benchmarks.md` | Bóc cấu trúc site tham chiếu — nhóm chip edge-AI + nhóm "công ty con mượn uy tín mẹ" |
| `docs/05-backlog.md` | Cái còn thiếu — chỉ người mới cấp được, không bịa |
| `scripts/wsl.sh` | Chạy npm bằng Node trong WSL — xem mục **Chạy** |
| `web/` | Next.js 15 + Tailwind v4 — landing 1 trang, VI `/` + EN `/en` |

**Nội dung chữ sống ở code, không ở docs:** `web/content/vi.ts` và `web/content/en.ts` là nguồn sự thật
duy nhất của copy. Docs mô tả *vì sao*, code giữ *cái gì*. Không chép copy sang markdown.

## Chạy

```bash
cd web
npm install
npm run dev      # http://localhost:3000  (VI)  ·  /en  (EN)
npm run build    # phải xanh trước khi commit
```

**Trên máy hiện tại phải chạy qua WSL.** Repo nằm trên đường dẫn UNC (`\\wsl.localhost\...`): Node cài
trên Windows không chạy được ở đó, còn `wsl bash -lc` thì không tự nạp nvm nên `npm` rơi về bản Windows.
`scripts/wsl.sh` xử lý cả hai:

```bash
wsl bash ~/work/pebble-vina/pv-landing-lab/scripts/wsl.sh npm run build
wsl bash ~/work/pebble-vina/pv-landing-lab/scripts/wsl.sh npm run dev
```

## Ba luật không được phá

1. **Tách "đã có" khỏi "lộ trình".** ESPRESSO 160 TOPS là *lộ trình 9/2026* theo deck IR — trên trang
   phải có nhãn. MINT 17,6 TOPS/W là *đã sản xuất hàng loạt 5/2023*. Trộn hai thứ = mất uy tín.
2. **Không gán arc-fault cho Pebble Square.** Trang chính thức của PS **không** liệt kê arc-fault/điện mặt
   trời. Năng lực PS khớp được là *anomaly / bảo trì dự đoán*; arc-fault là góc tiếp cận do Pebble Vina dựng.
3. **Không trích "MDPI Electronics 2024 — Electrical Anomaly Detection Based on PIM Chip".** Bài này
   **không tồn tại**. Đã bị gỡ khỏi mọi tài liệu công ty từ 2026-06-14.

Chi tiết + nguồn: `docs/01-proof-bank.md`.
