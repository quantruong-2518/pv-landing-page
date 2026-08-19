# 02 — Bản đồ thông điệp

> Mỗi dòng: **điểm mạnh công ty mẹ → câu nói trên trang → bằng chứng đỡ lưng**.
> Câu chữ thật sống ở `web/content/vi.ts` / `en.ts`. File này giữ *lý do*, không giữ bản copy.

## 0. Luận điểm gốc

> **Bạn không mua một startup Việt hai tháng tuổi. Bạn mua quyền tiếp cận một nền tảng bán dẫn AI
> Hàn Quốc — vận hành bởi pháp nhân Việt, hỗ trợ tại chỗ.**

Mọi khối trên trang là một biến thể của câu này. Khi phân vân bỏ hay giữ một khối, hỏi: *khối này có
làm câu trên đáng tin hơn không?* Không → bỏ.

## 1. Trục chính — bốn lợi thế PS tự nhấn, dịch sang nỗi đau Việt Nam

Pebble Square nói bốn thứ: **điện năng cực thấp · riêng tư on-device · suy luận nhanh · chi phí hiệu quả**
(`01-proof-bank.md` §C5). Bốn thứ đó không phải feature — chúng là **bốn cách thoát khỏi đám mây**.
Landing dịch chúng thành ngôn ngữ người mua Việt:

| Lợi thế PS | Nỗi đau VN nó gỡ | Câu trên trang (ý) | Bằng chứng |
|---|---|---|---|
| Riêng tư / on-device | Dữ liệu nhạy cảm **không được phép** rời tổ chức (gov, ngân hàng, y tế, sản xuất FDI) | "AI chạy trong nhà bạn. Dữ liệu không đi đâu cả." | §C5 Security: *without reliance on internet or network* · §C6 on-prem LLM |
| Điện năng cực thấp | Thiết bị hiện trường: không điện dư, không băng thông, chạy pin | "Đủ tiết kiệm để đặt AI ở nơi trước đây chỉ có cảm biến." | §C1 **17,6 TOPS/W** · §C4 **~50×** vs Jetson Nano |
| Suy luận nhanh | An toàn máy móc: phát hiện chậm 1 giây là đã muộn | "Quyết định tại chỗ, không chờ đường truyền." | §C5 *Low Latency* · §C4 trạm gốc 5G |
| Chi phí hiệu quả | Hoá đơn API theo token tăng không kiểm soát | "Trả một lần cho phần cứng, không trả mãi theo token." | §C6 *giảm chi phí API* |

**Ghi chú giọng:** đừng viết cả bốn thành bốn ô đều nhau, người đọc lướt qua. Trên trang, **riêng tư**
đứng đầu và to nhất — đó là nỗi đau duy nhất mà đối thủ cloud **không** giải được bằng giảm giá.

## 2. Trục uy tín — mượn gì từ mẹ, và mượn thế nào

| Tài sản của mẹ | Trả lời câu hỏi ngầm nào | Đặt ở khối |
|---|---|---|
| Thành lập 2021, Seongnam, fabless | "Có thật không, ở đâu?" | Hero trust strip |
| **양산 MINT từ 5/2023** | "Đã có hàng hay còn nghiên cứu?" | Con số + Dòng thời gian |
| **NDA SK hynix (2023-03)** | "Ai trong ngành coi trọng họ?" | Dòng thời gian ★ |
| **MOU KAIST – JBNU** | "Nền khoa học ở đâu ra?" | Dòng thời gian |
| **JV Saudi (2024-03)** · **PS Japan (2025-05)** | "Mô hình công ty con này có tiền lệ không?" | Dòng thời gian ★★ — *đây là khối biện minh cho chính sự tồn tại của Pebble Vina* |
| **KPAS 2025** | "Gần đây có gì mới không?" | Dòng thời gian (mốc cuối) |
| **>800 bằng sáng chế Mỹ · >200 bài SCI** | "Chiều sâu kỹ thuật?" | Khối công nghệ |
| **MEISEI ELECTRIC (Nhật)** | "Có ai ngoài Hàn mua chưa?" | Dòng thời gian |

**Nguyên tắc mượn:** luôn gọi tên **Pebble Square Inc.** đầy đủ và **link ra pebble-square.com**. Người
mua nghi ngờ sẽ đi tra — cho họ đường đi thẳng là hành vi của bên tự tin. Giấu link là hành vi của bên có
gì đó để giấu.

## 3. Trục Việt Nam — bốn thứ công ty mẹ không tự làm được

Nếu trang chỉ nói về mẹ, người đọc sẽ hỏi *"vậy mua thẳng từ Hàn cho rồi?"*. Khối này tồn tại để trả lời.

1. **Pháp nhân Việt** — hợp đồng, hoá đơn VAT, bảo hành bằng tiếng Việt. MST 0111545175, văn phòng Hà Nội.
2. **Hỗ trợ kỹ thuật tại chỗ** — kỹ sư ứng dụng đến nhà máy, không phải email sang Seongnam rồi chờ.
3. **Tuân thủ tiêu chuẩn Việt Nam** — TCVN/QCVN, thủ tục nhập khẩu, hồ sơ nghiệm thu.
4. **Mạng lưới KOCHAM** — cửa vào cộng đồng doanh nghiệp Hàn tại VN (nhà đầu tư là Phó Chủ tịch KOCHAM).

→ Câu chốt của khối: **"Công nghệ Hàn Quốc, trách nhiệm Việt Nam."**

## 4. Trục trung thực — thứ làm trang này khác mọi landing deep-tech khác

Đây là **chủ ý thiết kế**, không phải sự thận trọng thừa.

Trang gắn **nhãn trạng thái công khai** lên fact kỹ thuật: `đã sản xuất` (xanh) và `dự kiến 9/2026` (vàng).
Người đọc thấy chính chúng ta tự phân biệt cái đã có với cái sắp có.

Vì sao đáng: tệp quyết định là **kỹ sư**, mà kỹ sư đọc landing deep-tech với giả định mặc định là *đang bị
thổi*. Một trang tự tay hạ nhãn con số đẹp nhất của mình (160 TOPS) xuống "dự kiến" sẽ mua được thứ mà
không câu chữ nào mua được: **quyền được tin ở những chỗ còn lại**.

Áp dụng cụ thể — ba câu **không** nói, và câu thay thế:

| Không nói | Nói |
|---|---|
| "Chip 160 TOPS của chúng tôi" | "ESPRESSO — 160 TOPS, **dự kiến 9/2026**" |
| "Pebble Square làm phát hiện hồ quang điện" | "Pebble Square làm phát hiện bất thường & bảo trì dự đoán. **Pebble Vina** dựng lớp ứng dụng an toàn điện trên nền đó cho thị trường VN." |
| "Nhanh hơn 100× đối thủ" | "PAPAYA FLEX vs NVIDIA Jetson Nano trên ResNet-50: ~100× FPS/W" |

## 5. Giọng

- **Câu ngắn. Số cụ thể. Không tính từ rỗng.** Bỏ hết "tiên phong", "hàng đầu", "đột phá", "giải pháp toàn diện".
- **Chủ ngữ rõ:** "Pebble Square đã…", "Pebble Vina sẽ…" — người đọc phải luôn biết ai làm gì.
- **Không dùng "chúng tôi" khi đang nói về mẹ.** Trang mất uy tín ngay khi nhập nhèm hai pháp nhân.
- Bản EN **không rút gọn** so với VI: tệp FDI Hàn và GCC đọc EN là chính (`CLAUDE.md` §4).
