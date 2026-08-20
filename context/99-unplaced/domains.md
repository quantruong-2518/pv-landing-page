# 6 business sector của Pebble Square + 2 lớp của Pebble Vina

**Tiêu đề — EN** Six sectors the platform already works in — **VI** Sáu lĩnh vực nền tảng này đã chạy
Tag nguồn gốc: `ps` = business sector PS tự công bố · `pv` = lớp ứng dụng Pebble Vina dựng thêm.

| Lĩnh vực | Origin | EN | VI |
|---|---|---|---|
| Fault Analysis / Phân tích sự cố | `ps` | Real-time diagnostics for automated robots and machinery — catching a failure before the line stops rather than after. | Chẩn đoán thời gian thực cho robot và máy móc tự động — bắt được hỏng hóc trước khi dây chuyền dừng, thay vì sau. |
| Risk Management / Quản trị rủi ro | `ps` | Continuous anomaly detection on live data, running at the equipment instead of in a monitoring centre. | Phát hiện bất thường liên tục trên dữ liệu sống, chạy ngay tại thiết bị thay vì ở trung tâm giám sát. |
| Vision / Thị giác máy | `ps` | High-speed, low-power image processing for manufacturing and healthcare: inspection, counting, classification. | Xử lý ảnh tốc độ cao, điện năng thấp cho sản xuất và y tế: kiểm tra ngoại quan, đếm, phân loại. |
| Security / An ninh | `ps` | Threat detection with no reliance on internet or network — the footage and the decision both stay on the device. | Phát hiện mối đe doạ không phụ thuộc internet hay mạng — cả hình ảnh lẫn quyết định đều ở lại trên thiết bị. |
| Home IoT | `ps` | Speech recognition for smart homes and wearables. Demonstrated on MINT in February 2024: voice-controlled lighting with an emergency call bell. | Nhận diện giọng nói cho nhà thông minh và thiết bị đeo. Đã trình diễn trên MINT tháng 2/2024: hệ đèn điều khiển bằng giọng nói kèm chuông khẩn cấp. |
| Healthcare / Y tế | `ps` | Image and signal processing inside medical devices, where power, latency and patient privacy are all constraints at once. | Xử lý ảnh và tín hiệu ngay trong thiết bị y tế, nơi điện năng, độ trễ và quyền riêng tư của bệnh nhân đồng thời là ràng buộc. |
| Private LLM deployment / Triển khai LLM riêng | `pv` | Pebble Vina deploys on-premise inference servers so an organisation can run its own models on its own documents. A configuration ships today on commercial GPUs; the ESPRESSO version follows the Sep 2026 roadmap. | Pebble Vina triển khai máy chủ suy luận tại chỗ để tổ chức chạy mô hình của mình trên tài liệu của mình. Cấu hình chạy được ngay hôm nay dùng GPU thương mại; bản ESPRESSO theo lộ trình 9/2026. |
| Electrical safety and solar / An toàn điện và điện mặt trời | `pv` | Not a Pebble Square product. Pebble Vina builds this layer on the parent's anomaly-detection capability for the Vietnamese market, against UL 1699B, IEC 63027:2023 and TCVN 11855-1:2017. | Không phải sản phẩm của Pebble Square. Pebble Vina dựng lớp này trên năng lực phát hiện bất thường của công ty mẹ cho thị trường Việt Nam, bám chuẩn UL 1699B, IEC 63027:2023 và TCVN 11855-1:2017. |

→ 6 dòng `ps` đầu là **ứng dụng của MINT và PAPAYA** — dùng lại làm `capabilities[].body` ở `02-products/2.1-hardware/`.
→ 2 dòng `pv` thuộc về `2.2-software/private-ai.md` và một nhánh an toàn điện chưa có chỗ trong khung mới.
