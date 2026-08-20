# 04 — Site đối chiếu

## 1. Đã bóc — 4 site chip edge-AI (kế thừa, không làm lại)

Bản bóc đầy đủ: `../../pebblevn-ppt-first-meet/projects/pv-main-web/docs/landing/RESEARCH-cau-truc-section.md` §2
(Kneron · Hailo · Axelera AI · SiMa.ai, bóc 2026-08-03). **Không chép lại ở đây.** Năm mẫu hình rút ra,
và repo này xử lý chúng thế nào:

| Mẫu hình lặp ở 4/4 site | pv-landing-lab làm gì |
|---|---|
| Proof nằm trong **2–3 màn đầu**, không phải cuối trang | Khối **02** ngay dưới hero |
| Luôn có **một khối con số** làm điểm tựa kỹ thuật | Khối **03**, 4 số có nguồn |
| Tín hiệu **"trang còn sống"** ở trên (giải thưởng, sự kiện, tin) | Khối **06**, mốc cuối KPAS 2025 |
| Luôn có **lưới ngành/use-case** | Khối **08**, 6 ô |
| **Nhiều lối chuyển đổi**, không phải một | Khối **01** + **11**, 2 nút |

**Một chỗ cố ý làm khác:** cả 4 site đó **product-led**, bán cho kỹ sư đã biết mình cần gì → họ bỏ khối
problem, bày hàng ngay màn 2. Pebble Vina bán cho tổ chức Việt **chưa xác định được bài toán** → giữ
`PROBLEM` trước `SOLUTION` (khối **04** trước **05**). Chi tiết lập luận: `03-structure.md` §2.

## 2. Câu hỏi nghiên cứu riêng của repo này — **chưa bóc**

Bốn site trên đều là **công ty độc lập tự nói về mình**. Pebble Vina là **công ty con nói về mình bằng
uy tín của mẹ** — một bài toán khác hẳn, và chưa có bằng chứng ngành nào trong repo trả lời được nó.

**Câu hỏi:** một pháp nhân địa phương mới lập, tiền doanh thu, làm thế nào để **mượn uy tín công ty mẹ mà
không biến trang của mình thành trang giới thiệu công ty mẹ**?

Ba biến cần đo trên mỗi site mẫu:

1. **Tỉ lệ diện tích** — bao nhiêu phần trang nói về mẹ, bao nhiêu nói về mình?
2. **Vị trí điểm cắt** — mẹ xuất hiện ở khối nào, và khối nào là chỗ trang "quay về" nói chuyện địa phương?
3. **Cách xưng hô** — khi nào dùng "chúng tôi", khi nào gọi tên mẹ đầy đủ? Có bao giờ nhập nhèm không?

**Nhóm mẫu đề xuất** (chưa bóc — xem `05-backlog.md` #6):

| Nhóm | Vì sao chọn |
|---|---|
| Công ty con VN của tập đoàn Nhật/Hàn ngành công nghiệp | Cùng cấu trúc pháp lý, cùng thị trường, cùng tệp khách |
| Pháp nhân địa phương của hãng bán dẫn tại ĐNÁ (SG/MY/TH) | Cùng ngành, cùng bài toán "chi nhánh khu vực" |
| **Pebble Square Japan** | Tiền lệ trực tiếp nhất — cùng công ty mẹ, đi trước 1 năm. **Ưu tiên cao nhất** |
| Công ty con VN của hãng phần cứng AI phương Tây | Đối chiếu cách viết EN cho tệp FDI |

**Phương pháp:** bóc thứ tự khối như §2 của research cũ, cộng thêm 3 biến trên. Ghi kết quả vào chính file
này thành §3. Kết luận phải trả lời được một câu: **tỉ lệ mẹ/con hợp lý là bao nhiêu, và trang nên "quay
về nói chuyện mình" ở khối thứ mấy?**

Bản dựng cũ đặt điểm cắt ở **khối 07**. Trong khung ba nhánh (2026-08-20) điểm cắt tương đương là
trang `/products`: HOME mượn sức mẹ, `/products` mới nói Pebble Vina làm gì. Đó là **giả thuyết**, chưa
phải kết luận có bằng chứng. Nếu §3 chỉ ra khác, sửa cấu trúc theo bằng chứng.
