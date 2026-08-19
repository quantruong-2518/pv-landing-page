# 05 — Việc còn chờ

> Chia hai loại: **[NGƯỜI]** — chỉ GM/HQ cấp được, không bịa thay. **[LAB]** — làm được trong repo này.

## [NGƯỜI] — chặn nội dung

| # | Cần gì | Chặn cái gì | Ai cấp |
|---|---|---|---|
| 1 | **Xác nhận tên + chức danh CEO Pebble Square** (chính tả KO) | Trang chưa dám nêu tên lãnh đạo mẹ — mất một tầng nhân bản. Hồ sơ từng ghi **ngược** một lần | HQ |
| 2 | **Cấu trúc sở hữu chính xác** (công ty con 100% / liên doanh / % góp vốn / ngày hiệu lực) | Trang chỉ nói "thành viên nhóm". Không nói được "công ty con của…" — đó là cách gọi có sức nặng hơn hẳn | GM + HQ |
| 3 | **File logo gốc SVG** của Pebble Square + quyền dùng nhãn hiệu | Proof strip đang dùng chữ thay logo. Một logo thật ở đó đổi hẳn register khối 02 | HQ |
| 4 | **Thời lượng chuẩn từng bước triển khai** (khảo sát bao lâu, thí điểm bao lâu) | Khối 09 hiện chỉ có deliverable, không có thời gian — người mua muốn biết "mất bao lâu" | GM |
| 5 | **Ảnh thật**: văn phòng Landmark 72, đội ngũ, phần cứng trên bàn | **G9 chưa đóng.** Trang deep-tech thuần đồ hoạ dễ bị đọc là "công ty chưa có gì" | GM |
| 6 | **Hồ sơ năng lực PDF** | Lối chuyển đổi thứ hai (nút "Xem hồ sơ năng lực") đang trỏ vào chỗ trống | GM |
| 7 | **5–8 câu hỏi sales bị hỏi nhiều nhất** (thật, từ cuộc gặp thật) | FAQ hiện là 8 câu **suy luận**, chưa phải câu người ta thật sự hỏi | GM |
| 8 | Xác nhận **được phép nêu tên SK hynix / MEISEI / JV Saudi** trên web công khai | Ba mốc đắt nhất của khối 06. Nằm trong Company History **chính thức** của PS nên nhiều khả năng OK — nhưng NDA là NDA, phải hỏi | HQ |

**#8 là rủi ro cao nhất trong danh sách.** Nếu HQ nói không, khối 06 mất ba mốc mạnh nhất và phải dựng lại.
Hỏi trước khi đem trang này đi đâu.

## [LAB] — làm được ngay trong repo

| # | Việc | Ghi chú |
|---|---|---|
| 9 | Bóc §3 của `04-benchmarks.md` — nhóm "công ty con mượn uy tín mẹ" | Ưu tiên: **Pebble Square Japan** trước tiên, cùng mẹ, đi trước 1 năm |
| 10 | Hình cho khối 05 (công nghệ) — sơ đồ PIM: phép tính chạy trong bộ nhớ vs kiến trúc tách rời | Hiện là chữ. Một sơ đồ SVG đúng nghĩa sẽ gánh cả khối |
| 11 | Đo tốc độ + Lighthouse, tối ưu nếu cần | Chưa đo lần nào |
| 12 | Bản EN — nhờ người bản ngữ soát | Bản hiện tại do máy dịch từ VI, đối xứng nhưng chưa được người đọc lại |
| 13 | A/B hai bản H1 (nhấn *lineage Hàn Quốc* vs nhấn *dữ liệu ở lại*) | Cần traffic thật, chưa làm được ở giai đoạn này |

## Đề xuất port ngược sang `pv-main-web`

Ba thứ ở repo này nếu chạy được thì đáng đem sang site chính:

1. **Hệ nhãn `shipped` / `roadmap`** — `proof-bank` + component `<Fact status>`. Đây là thứ có giá trị
   nhất repo này tạo ra, và nó là **quy trình**, không phải code, nên port rẻ.
2. **Khối 02 Proof strip** và **khối 03 Con số** — đóng thẳng G1 + G2 mà research site chính đã chấm 🔴.
3. **FAQ + `FAQPage` JSON-LD** — kit `Faq` đã có sẵn bên đó, chỉ thiếu nội dung. Đóng G3.

GM quyết định có port hay không (`CLAUDE.md` §5) — repo này không tự sửa `pv-main-web`.
