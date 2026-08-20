# MOCHA và Pebble AI Studio — hai thứ khung mới bỏ sót

Khung 3 nhánh liệt kê MINT · PAPAYA · ESPRESSO · GPU ở phần cứng, và Enterprise Software · Private AI ở
phần mềm. Hai thứ dưới đây **có thật, đã ship**, nhưng không có ô nào để đặt vào.

## MOCHA — chip PIM edge AI thế hệ 1 (2021) · `shipped` · `ps`
Ra mắt 11/2021, cùng đợt lập trung tâm nghiên cứu doanh nghiệp. Là thế hệ trước MINT.
**Đề xuất:** không dựng khối riêng — nhắc một dòng trong `body` của MINT như phần lịch sử dòng chip
("thế hệ 2, kế thừa MOCHA 2021"), hoặc để nguyên trong *Lịch sử hình thành* ở HOME (đã có mốc 11/2021).

## Pebble AI Studio — SDK tích hợp · `shipped` · `ps`
**EN tagline** Integrated SDK · the path from trained model to silicon
**VI tagline** SDK tích hợp · đường từ mô hình đã huấn luyện xuống chip

**EN** Deploys and optimises trained models onto PIM chips quickly and seamlessly, with an AI Accelerator alongside it for development work. Without this layer the chips would be a research result rather than a product.
**VI** Triển khai và tối ưu mô hình đã huấn luyện lên chip PIM nhanh và liền mạch, kèm AI Accelerator cho công việc phát triển. Thiếu tầng này thì chip chỉ là kết quả nghiên cứu, không phải sản phẩm.

**Đề xuất:** đây là **phần mềm của Pebble Square** và là mắt xích bắt buộc giữa 2.2 (Private AI → Build,
Train/Adapt) và 2.1 (phần cứng). Không có nó thì nhánh "Train / Adapt" của Private AI không có đường xuống
chip. Nên thêm làm `products.software.groups[2]` hoặc nhắc trong `body` của Private AI.
⚠ Đây là câu hỏi cần GM chốt, không tự thêm khối ngoài khung đã duyệt.
