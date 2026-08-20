# FAQ — 8 câu (kèm JSON-LD FAQPage)

Đi kèm hàm `faqSchema()` (đã gỡ khỏi `web/components/schema.tsx`). Dựng lại là có ngay `FAQPage` schema.

---
**Q1 — EN** Is Pebble Vina a Vietnamese or a Korean company?
**VI** Pebble Vina là công ty Việt Nam hay Hàn Quốc?

**A EN** It is a Vietnamese legal entity — PEBBLE VINA COMPANY LIMITED, tax code 0111545175, registered in Hanoi — and the Vietnam member of the Pebble Square group. You sign with the Vietnamese entity; the technology comes from the parent company in Seongnam.
**A VI** Là pháp nhân Việt Nam — CÔNG TY TNHH PEBBLE VINA, mã số thuế 0111545175, đăng ký tại Hà Nội — đồng thời là thành viên Việt Nam của nhóm Pebble Square. Bạn ký hợp đồng với pháp nhân Việt; công nghệ đến từ công ty mẹ ở Seongnam.

---
**Q2 — EN** Who is Pebble Square, and where can I verify this?
**VI** Pebble Square là ai, tôi tra ở đâu?

**A EN** Pebble Square Inc. is a fabless AI semiconductor company founded in September 2021, headquartered at ABN Tower, 331 Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea, with CEO ChoongHyun Lee and business licence 879-88-02299. Everything on this page about the parent company can be checked at pebble-square.com.
**A VI** Pebble Square Inc. là công ty bán dẫn AI fabless thành lập tháng 9/2021, trụ sở tại ABN Tower, 331 Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Hàn Quốc, CEO là ChoongHyun Lee, giấy phép kinh doanh 879-88-02299. Mọi thông tin về công ty mẹ trên trang này đều tra được tại pebble-square.com.

---
**Q3 — EN** Is the silicon shipping, or is this still research?
**VI** Chip đã bán được chưa, hay còn là nghiên cứu?

**A EN** MINT, the second-generation chip, has been in mass production since May 2023 at 17.6 TOPS/W. The 160 TOPS ESPRESSO AI SoC has not shipped: it appears in the investor deck dated 5 January 2026 as expected in September 2026, and it is not on the public product catalogue. Every figure on this page carries a label so the two are never confused.
**A VI** MINT, chip thế hệ 2, đã sản xuất hàng loạt từ tháng 5/2023, đạt 17,6 TOPS/W. AI SoC ESPRESSO 160 TOPS thì chưa: nó xuất hiện trong tài liệu nhà đầu tư ngày 05/01/2026 với mốc dự kiến tháng 9/2026, và không nằm trong danh mục sản phẩm công khai. Mọi con số trên trang này đều mang nhãn để không lẫn hai loại.

---
**Q4 — EN** How is this different from an NVIDIA Jetson or a GPU card?
**VI** Khác gì so với NVIDIA Jetson hay một card GPU?

**A EN** It differs in power and size, not in being better at everything. Per Pebble Square's IR deck, PAPAYA FLEX draws 0.1–0.15 W against 5–10 W for a Jetson Nano on the same class of machine-vision workload, in a package around 25× smaller. If your problem is training large models, a GPU is still the right answer.
**A VI** Khác ở điện năng và kích thước, không phải mạnh hơn về mọi mặt. Theo IR Deck của Pebble Square, PAPAYA FLEX tiêu thụ 0,1–0,15 W so với 5–10 W của Jetson Nano trên cùng loại tải thị giác máy, trong gói nhỏ hơn khoảng 25 lần. Nếu bài toán của bạn là huấn luyện mô hình lớn, GPU vẫn là lựa chọn đúng.

---
**Q5 — EN** Does our data leave the company?
**VI** Dữ liệu của chúng tôi có ra khỏi doanh nghiệp không?

**A EN** Not under an on-site architecture. Pebble Square designs explicitly for processing "without reliance on internet or network", and an LLM server placed inside your own infrastructure keeps both the data and the model behind your firewall.
**A VI** Không, nếu triển khai theo kiến trúc tại chỗ. Pebble Square thiết kế rõ ràng cho việc xử lý "không phụ thuộc internet hay mạng", còn máy chủ LLM đặt trong hạ tầng của bạn thì cả dữ liệu lẫn mô hình đều nằm sau tường lửa của bạn.

---
**Q6 — EN** We need arc-fault detection for a solar installation. Can you do that?
**VI** Chúng tôi cần phát hiện hồ quang điện cho hệ điện mặt trời. Có làm được không?

**A EN** This one deserves a precise answer. Pebble Square does not list arc-fault detection among its business sectors; what it publishes is Fault Analysis and Risk Management — real-time diagnostics and anomaly detection for automated robots and machinery. Electrical safety is an application layer Pebble Vina builds on that capability for the Vietnamese market, against UL 1699B, IEC 63027:2023 and TCVN 11855-1:2017. The platform exists; the application layer is built with you.
**A VI** Câu này cần trả lời chính xác. Pebble Square không liệt kê phát hiện hồ quang điện trong các business sector của họ; cái họ công bố là Fault Analysis và Risk Management — chẩn đoán thời gian thực và phát hiện bất thường cho robot, máy móc tự động. An toàn điện là lớp ứng dụng Pebble Vina dựng trên năng lực đó cho thị trường Việt Nam, bám UL 1699B, IEC 63027:2023 và TCVN 11855-1:2017. Nền tảng đã có; lớp ứng dụng làm cùng bạn.

---
**Q7 — EN** What does it cost?
**VI** Chi phí bao nhiêu?

**A EN** It depends on architecture and scale, so there is no price list here. What can be said now is that the cost model differs from the cloud: you pay once for hardware instead of paying monthly per inference. The first session and the yes/no answer are free.
**A VI** Phụ thuộc kiến trúc và quy mô, nên trang này không có bảng giá. Điều nói được ngay là mô hình chi phí khác đám mây: trả cho phần cứng một lần, thay vì trả theo lượt suy luận hằng tháng. Buổi làm việc đầu tiên và kết luận có/không là miễn phí.

---
**Q8 — EN** Why does this page spend so much of its space on the parent company?
**VI** Vì sao trang này dành nhiều chỗ đến vậy cho công ty mẹ?

**A EN** Because that is the most useful part of the file. Pebble Vina is a new entity with no publishable case studies yet. Rather than write generalities about a company without a past, this page puts forward what you can verify: Pebble Square's history, numbers, leadership and product catalogue — labelled to separate what exists from what is still a roadmap.
**A VI** Vì đó là phần hữu ích nhất của hồ sơ. Pebble Vina là pháp nhân mới, chưa có case study công bố được. Thay vì viết những câu chung chung về một công ty chưa có quá khứ, trang này đưa ra thứ bạn tra được: lịch sử, con số, ban lãnh đạo và danh mục sản phẩm của Pebble Square — kèm nhãn phân biệt cái đã có với cái còn là lộ trình.

---
⚠ `docs/05-backlog.md` #7: 8 câu này là câu **suy luận**, chưa phải câu sales bị hỏi thật.
