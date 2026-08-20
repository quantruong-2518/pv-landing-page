# 05 — Việc còn chờ

> Chia hai loại: **[NGƯỜI]** — chỉ GM/HQ cấp được, không bịa thay. **[LAB]** — làm được trong repo này.

## [NGƯỜI] — chặn nội dung

| # | Cần gì | Chặn cái gì | Ai cấp |
|---|---|---|---|
| 1 | ~~Xác nhận tên + chức danh CEO~~ ✅ **XONG 2026-08-20** — trang Technical Leadership của PS công khai đủ 4 người. Còn lại: chính tả KO nếu cần bản tiếng Hàn | Không còn chặn gì | — |
| 2 | **Cấu trúc sở hữu chính xác** (công ty con 100% / liên doanh / % góp vốn / ngày hiệu lực) | Trang chỉ nói "thành viên nhóm". Không nói được "công ty con của…" — đó là cách gọi có sức nặng hơn hẳn | GM + HQ |
| 3 | **File logo gốc SVG** của Pebble Square + quyền dùng nhãn hiệu | Trang đang dùng chữ thay logo ở header và footer. Một logo thật đổi hẳn register của cả site | HQ |
| 4 | **Thời lượng chuẩn từng bước triển khai** (khảo sát bao lâu, thí điểm bao lâu) | Khối 09 hiện chỉ có deliverable, không có thời gian — người mua muốn biết "mất bao lâu" | GM |
| 5 | **Ảnh thật**: văn phòng Landmark 72, đội ngũ, phần cứng trên bàn | **G9 chưa đóng.** Trang deep-tech thuần đồ hoạ dễ bị đọc là "công ty chưa có gì" | GM |
| 6 | **Hồ sơ năng lực PDF** | Lối chuyển đổi thứ hai (nút "Xem hồ sơ năng lực") đang trỏ vào chỗ trống | GM |
| 7 | **5–8 câu hỏi sales bị hỏi nhiều nhất** (thật, từ cuộc gặp thật) | FAQ hiện là 8 câu **suy luận**, chưa phải câu người ta thật sự hỏi | GM |
| 8 | Xác nhận **được phép nêu tên SK hynix / MEISEI / JV Saudi** trên web công khai | 🟢 **Rủi ro giảm mạnh 2026-08-20**: cả ba đều nằm trong Company History **do chính PS đăng công khai**, ta chỉ nhắc lại thứ họ đã công bố. Vẫn nên báo HQ một tiếng trước khi phát hành | HQ |

**Rủi ro cao nhất giờ là #9 mới, không phải #8.** Sau khi đọc trang công khai của PS ngày 2026-08-20, ba
mốc SK hynix / MEISEI / Saudi hoá ra do chính họ đăng — ta chỉ nhắc lại. Thứ còn rủi ro là **ESPRESSO**:
nó **không xuất hiện ở bất kỳ trang công khai nào** của PS, chỉ có trong IR Deck. Trang đang gắn nhãn vàng
và ghi rõ "investor material", nhưng vẫn phải hỏi HQ xem có được nói ra ngoài hay không.

## [LAB] — làm được ngay trong repo

| # | Việc | Ghi chú |
|---|---|---|
| 9 | **[NGƯỜI] Hỏi HQ: có được nêu ESPRESSO / số 160 TOPS đối ngoại không?** Nếu không, gỡ khối `#espresso` ở `/products` và mốc 9/2026 ở *Lịch sử hình thành* | ⚠ ưu tiên cao nhất |
| 10 | Bóc §3 của `04-benchmarks.md` — nhóm "công ty con mượn uy tín mẹ" | Ưu tiên: **Pebble Square Japan** trước tiên, cùng mẹ, đi trước 1 năm |
| 10 | Sơ đồ PIM — phép tính chạy trong bộ nhớ vs kiến trúc tách rời | Ô ảnh đã chừa sẵn: `home.whyNow.media`, tỉ lệ 16/9. Một sơ đồ SVG đúng nghĩa sẽ gánh cả khối |
| 11 | Đo tốc độ + Lighthouse, tối ưu nếu cần | Chưa đo lần nào |
| 12 | Bản EN — nhờ người bản ngữ soát | Bản hiện tại do máy dịch từ VI, đối xứng nhưng chưa được người đọc lại |
| 13 | A/B hai bản H1 (nhấn *lineage Hàn Quốc* vs nhấn *dữ liệu ở lại*) | Cần traffic thật, chưa làm được ở giai đoạn này |

## Phát sinh sau refactor khung ba nhánh (2026-08-20)

| # | Việc | Loại | Ghi chú |
|---|---|---|---|
| 14 | **G3 mở lại — mất FAQ và JSON-LD `FAQPage`** | LAB | Khung ba nhánh không có ô cho FAQ. Đây là tài sản GEO mạnh nhất của bản cũ. Nội dung 8 câu còn nguyên ở `context/99-unplaced/faq.md`; dựng lại ở chân trang LIÊN HỆ là rẻ nhất. **Cần GM đồng ý mới thêm khối ngoài khung.** |
| 15 | **G4 mở lại — mất "sau khi bấm nút thì chuyện gì xảy ra"** | LAB | 4 bước có deliverable giữ ở `context/99-unplaced/getting-started.md`. Chỗ tự nhiên nhất là dưới phần kênh liên lạc ở trang LIÊN HỆ. |
| 16 | **Điền `lead` + `body`** — hiện là chuỗi rỗng có chủ ý | NGƯỜI + LAB | 63 ô mỗi ngôn ngữ (`grep -o ': ""' web/content/en.ts | wc -l`): hero 1 · whyNow 8 · history 16 · products.intro 2 · hardware 20 · software 16. Nháp và vật liệu theo từng khối ở `context/`. Điền `en.ts` trước, `vi.ts` theo sau. |
| 17 | **Nội dung nhánh 2.2.1 (enterprise software) chưa có gì** | NGƯỜI | Bốn câu hỏi chặn liệt kê ở `context/02-products/2.2-software/enterprise-software.md`: sản phẩm hay dịch vụ? dựng trên nền nào? đã có khách chạy thật chưa? "best next action" chạy model nào, dữ liệu ở đâu? |
| 18 | **Nhánh GPU/HPC — xác nhận được nói gì đối ngoại** | NGƯỜI | Có quan hệ phân phối GPU nào nêu tên công khai được không? Hiện trang chỉ nói ở mức *năng lực tích hợp*, gắn tag `pv`, không nêu tên hãng. Không được bịa. |
| 19 | **MOCHA và Pebble AI Studio không có ô trong khung mới** | NGƯỜI | Cả hai đều `shipped` và có thật. Pebble AI Studio là mắt xích bắt buộc giữa Private AI (Build / Train) và phần cứng — thiếu nó thì nhánh 2.2.2 không có đường xuống chip. Đề xuất ở `context/99-unplaced/mocha-and-ai-studio.md`. |
| 20 | **Khối track record / team / offices / domains đã gỡ khỏi trang** | NGƯỜI | Bốn thị trường, ban lãnh đạo, 4 địa chỉ, 6 business sector — đều là proof mạnh, khung mới không có ô. Giữ ở `context/99-unplaced/`. Nếu mở nhánh 4 ("Về chúng tôi") thì lấy ra dùng lại được ngay. |
| 21 | **Ảnh: 7 ô đã chừa, 0 file** | NGƯỜI | Danh sách ô, tỉ lệ, art direction, và luật "bốn ảnh phần cứng phải là một bộ" ở `context/media-plan.md`. Đây là #5 nhìn từ góc kỹ thuật. |

## Đề xuất port ngược sang `pv-main-web`

Ba thứ ở repo này nếu chạy được thì đáng đem sang site chính:

1. **Hệ nhãn `shipped` / `roadmap`** — `proof-bank` + component `<Fact status>`. Đây là thứ có giá trị
   nhất repo này tạo ra, và nó là **quy trình**, không phải code, nên port rẻ.
2. **Dải số đo dưới mỗi sản phẩm** (`SpecCard`: giá trị + cách đo + nguồn + nhãn) — đóng thẳng G1 + G2 mà
   research site chính đã chấm 🔴. Nội dung sẵn ở `01-proof-bank.md`.
3. **FAQ + `FAQPage` JSON-LD** — kit `Faq` đã có sẵn bên đó, chỉ thiếu nội dung. Đóng G3. Tám câu ở
   `context/99-unplaced/faq.md`.

GM quyết định có port hay không (`CLAUDE.md` §5) — repo này không tự sửa `pv-main-web`.
