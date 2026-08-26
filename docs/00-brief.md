# 00 — Brief

## Landing này là gì

**Ba trang** — HOME · SẢN PHẨM & GIẢI PHÁP · LIÊN HỆ — giới thiệu **Pebble Vina** cho người lần đầu
nghe tên, bằng cách **mượn gần như toàn bộ sức nặng từ công ty mẹ Pebble Square Inc. (Hàn Quốc)**.

> Cập nhật 2026-08-20: bản đầu là landing một trang 13 khối. GM chốt khung ba nhánh; cấu trúc mới ở
> `03-structure.md`, nội dung của khung cũ giữ ở `context/99-unplaced/`.

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

| Tệp                                                              | Họ tự hỏi gì trong 5 giây đầu                      | Trang trả lời bằng khối nào                 |
| ---------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------- |
| **Doanh nghiệp / tập đoàn VN** (sản xuất, năng lượng, tài chính) | "Đây là ai, có thật không?"                        | Hero + Proof strip + Con số                 |
| **Doanh nghiệp Hàn tại VN** (qua mạng lưới KOCHAM)               | "Công ty mẹ Hàn nào? Tôi tra được không?"          | Proof strip + Dòng chip + Footer có link PS |
| **Khối gov / đơn vị nhạy cảm dữ liệu**                           | "Chạy AI mà dữ liệu không ra khỏi nhà được không?" | Vấn đề + Công nghệ + Ứng dụng (private LLM) |
| **Kỹ sư / người thẩm định kỹ thuật**                             | "Số đâu? Đo thế nào? Có gì đã ship?"               | Con số có nhãn `shipped`/`roadmap` + FAQ    |

Tệp kỹ sư là **người phá trang**. Một con số không nguồn hoặc một claim quá tay là đủ để họ đóng tab —
và họ là người khuyên sếp ký. Vì vậy trang này gắn **nhãn trạng thái công khai** lên từng fact.

## Một hành động

**`Đặt lịch tư vấn`** — đích chuyển đổi chính, giống site chính.

Lối thứ hai (theo khuyến nghị G5 của research cũ): **`Xem hồ sơ năng lực`** — cho người chưa sẵn sàng
nói chuyện. Hiện là placeholder, chờ file PDF (xem `05-backlog.md`).

## Ngôn ngữ

**Tiếng Anh là bản chính, ở `/`.** Tiếng Việt là bản phụ đầy đủ ở `/vi`. Tệp quyết định — FDI Hàn tại VN,
đối tác Nhật, GCC, nhà đầu tư, và cả kỹ sư đọc datasheet — đọc tiếng Anh. Hai bản đối xứng tuyệt đối, không
bản nào bị rút gọn.

## Phạm vi

**Có:** 3 trang, một ngôn ngữ (3 route tĩnh dưới `/vi`), khối cuộn có snap, SSR toàn bộ, JSON-LD
`Organization`, header/footer theo best practice, 7 ô ảnh đã chừa sẵn, chạy được từ 360px, và
**form liên hệ ghi vào Postgres** qua `POST /api/contact`.

**Không có:** blog, route riêng cho từng sản phẩm (dùng anchor), CMS, ngôn ngữ ngoài VI,
animation nặng, **FAQ + JSON-LD `FAQPage`** (khung mới không có ô — xem `05-backlog.md` #14).
Đây là lab để kiểm chứng **cấu trúc + thông điệp**, không phải sản phẩm cuối.

> **Sửa phạm vi 2026-08-24 (GM chốt).** Bản trước ghi _"không có form gửi thật (chỉ `mailto:`/`tel:`)"_.
> Không còn đúng: nút CTA ở hero điều hướng sang `/vi/contact` thay vì mở nháp mail, và form ghi
> submission vào Postgres trên Vercel. Repo do đó **không còn thuần tĩnh** — cần runtime Node, hai
> biến môi trường (`.env.example`), và mang **dữ liệu cá nhân thật**: Nghị định 13/2023/NĐ-CP áp dụng,
> xem `05-backlog.md` #22 và #23. Bản EN gỡ 2026-08-23 nên "2 ngôn ngữ / 6 route" ở trên cũng đã sửa.

## Thước đo "kiểu mẫu"

Trang được coi là đạt nếu đóng được **cả 9 khoảng trống G1–G9** mà research của site chính đã chỉ ra
(`pv-main-web/docs/landing/RESEARCH-cau-truc-section.md` §3.2). Bảng đối chiếu ở `03-structure.md` §8.
