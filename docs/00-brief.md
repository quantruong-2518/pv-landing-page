# 00 — Brief

## Landing này là gì

**Một trang duy nhất** giới thiệu **Pebble Vina** cho người lần đầu nghe tên, bằng cách **mượn gần như
toàn bộ sức nặng từ công ty mẹ Pebble Square Inc. (Hàn Quốc)**.

Đây là lựa chọn có chủ ý, không phải thiếu nội dung. Pebble Vina đang ở giai đoạn **tiền doanh thu**:
chưa có khách hàng công bố được, chưa có case study, chưa có doanh thu để khoe. Trong trạng thái đó,
landing tự nói về mình sẽ rỗng. Nhưng công ty mẹ thì **có 5 năm lịch sử, có chip đã sản xuất hàng loạt,
có NDA với SK hynix, có liên doanh Saudi, có công ty con Tokyo, có số đo được**.

→ **Luận điểm gốc của trang: "Bạn không mua một startup Việt hai tháng tuổi. Bạn mua quyền tiếp cận một
nền tảng bán dẫn AI Hàn Quốc — vận hành bởi pháp nhân Việt, hỗ trợ tại chỗ."**

Đây đúng là kiến trúc thương hiệu GM đã chốt (ADR 0002, 2026-06-16): PV là **thành viên Việt Nam của nhóm
Pebble Square**, **lấy lịch sử PS làm marketing**, co-brand mức **vừa** — giữ tên Pebble Vina, gắn nhãn
thành viên nhóm.

## Đối tượng

| Tệp | Họ tự hỏi gì trong 5 giây đầu | Trang trả lời bằng khối nào |
|---|---|---|
| **Doanh nghiệp / tập đoàn VN** (sản xuất, năng lượng, tài chính) | "Đây là ai, có thật không?" | Hero + Proof strip + Con số |
| **Doanh nghiệp Hàn tại VN** (qua mạng lưới KOCHAM) | "Công ty mẹ Hàn nào? Tôi tra được không?" | Proof strip + Dòng chip + Footer có link PS |
| **Khối gov / đơn vị nhạy cảm dữ liệu** | "Chạy AI mà dữ liệu không ra khỏi nhà được không?" | Vấn đề + Công nghệ + Ứng dụng (private LLM) |
| **Kỹ sư / người thẩm định kỹ thuật** | "Số đâu? Đo thế nào? Có gì đã ship?" | Con số có nhãn `shipped`/`roadmap` + FAQ |

Tệp kỹ sư là **người phá trang**. Một con số không nguồn hoặc một claim quá tay là đủ để họ đóng tab —
và họ là người khuyên sếp ký. Vì vậy trang này gắn **nhãn trạng thái công khai** lên từng fact.

## Một hành động

**`Đặt lịch tư vấn 30 phút`** — đích chuyển đổi chính, giống site chính.

Lối thứ hai (theo khuyến nghị G5 của research cũ): **`Xem hồ sơ năng lực`** — cho người chưa sẵn sàng
nói chuyện. Hiện là placeholder, chờ file PDF (xem `05-backlog.md`).

## Ngôn ngữ

**Tiếng Anh là bản chính, ở `/`.** Tiếng Việt là bản phụ đầy đủ ở `/vi`. Tệp quyết định — FDI Hàn tại VN,
đối tác Nhật, GCC, nhà đầu tư, và cả kỹ sư đọc datasheet — đọc tiếng Anh. Hai bản đối xứng tuyệt đối, không
bản nào bị rút gọn.

## Phạm vi

**Có:** 1 trang, 13 khối, song ngữ EN + VI, mỗi khối vừa trọn một màn hình và cuộn có snap, SSR toàn bộ,
JSON-LD `Organization` + `FAQPage`, header/footer theo best practice landing, chạy được từ 360px.

**Không có:** blog, trang sản phẩm con, form gửi thật (chỉ `mailto:`/`tel:`), CMS, ngôn ngữ ngoài EN/VI,
animation nặng. Đây là lab để kiểm chứng **cấu trúc + thông điệp**, không phải sản phẩm cuối.

## Thước đo "kiểu mẫu"

Trang được coi là đạt nếu đóng được **cả 9 khoảng trống G1–G9** mà research của site chính đã chỉ ra
(`pv-main-web/docs/landing/RESEARCH-cau-truc-section.md` §3.2). Bảng đối chiếu ở `03-structure.md` §3.
