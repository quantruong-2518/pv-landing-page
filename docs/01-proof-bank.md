# 01 — Ngân hàng bằng chứng Pebble Square

> **Luật:** không lấy số từ trí nhớ. Mọi fact lên trang phải có một dòng ở đây, và phải mang **nhãn trạng thái**.
> Cập nhật gần nhất: 2026-08-20. Nguồn cấp 1 nằm ở `../../pebblevn-ppt-first-meet/company/`.

## Hệ nhãn

| Nhãn | Nghĩa | Cách hiện trên trang |
|---|---|---|
| `shipped` | Đã xảy ra / đã sản xuất / đã đo được. Nói thẳng, không rào. | Không badge, hoặc badge xanh "đã sản xuất" |
| `roadmap` | Có trong IR Deck nhưng **chưa ship** tại thời điểm lập deck. | **Bắt buộc** badge vàng kèm mốc thời gian |
| `internal` | Đúng nội bộ nhưng **chưa được xác nhận để nói đối ngoại**. | **Không đưa lên trang** cho tới khi HQ xác nhận |
| `forbidden` | Sai / nguồn ma / gán nhầm cho principal. | Cấm tuyệt đối |

---

## A. Nhận diện công ty mẹ — `shipped`

| Fact | Giá trị | Nguồn |
|---|---|---|
| Tên pháp lý | Pebble Square Inc. (페블스퀘어) | Trang chính thức |
| Loại hình | Bán dẫn AI **fabless**, chuyên **Edge AI** | Trang chính thức |
| Trụ sở | Seongnam, Gyeonggi-do, Hàn Quốc | Trang chính thức |
| Thành lập | **09/2021** | Company History |
| Vốn đã gọi | ~**15 tỷ KRW** (gồm 2 tỷ KRW từ UTC Investment) | Hồ sơ công ty |
| Website | https://www.pebble-square.com | — |
| Năng lực lãnh đạo (tổng) | **>200 bài báo SCI · >800 bằng sáng chế Mỹ** | IR Deck tr.20 |

**Dùng được vì:** đây là những thứ người đọc tra chéo được trong 30 giây. Toàn bộ tầng tin cậy của trang
đứng trên chúng.

## B. Cột mốc — `shipped` (Company History chính thức, đối chiếu 2026-06-15)

| Mốc | Việc | Vì sao đắt trên landing |
|---|---|---|
| 2021-11 | Phát triển chip Edge AI PIM gen-1 (**MOCHA**) | Mở dòng thời gian — chứng minh không phải công ty giấy |
| 2022-07 | MOU nghiên cứu chung **KAIST – ĐH Quốc gia Jeonbuk – Pebble Square** | Uy tín học thuật, tên KAIST tự nói |
| 2022-12 | Phát triển chip PIM gen-2 (**MINT**) | — |
| 2023-03 | **NDA với SK hynix** — Analog Computing-in-Memory + AI accelerator | ★ Tên nặng nhất trong bộ. Một hãng nhớ top-3 thế giới ngồi xuống ký |
| 2023-05 | **양산 — sản xuất hàng loạt MINT** | ★ Ranh giới giữa "nghiên cứu" và "có hàng". Fact chống lại phản biện "chỉ là paper" |
| 2024-01 | Bằng sáng chế thiết bị neuromorphic | — |
| 2024-02 | **PoC thành công bằng MINT**: hệ đèn nhận diện giọng nói + chuông khẩn cấp | Bằng chứng chạy thật, không phải benchmark phòng lab |
| 2024-03 | **NDA mua có điều kiện — MEISEI ELECTRIC Co., Ltd. (Nhật)**, Home IoT dùng MINT | Khách nước ngoài đầu tiên có tên |
| 2024-03 | **Liên doanh Saudi "Cluster AI Lab"** | ★ Chứng minh mô hình lập pháp nhân địa phương — chính là mô hình Pebble Vina |
| 2025-05 | **Pebble Square Japan, Inc. (Tokyo)** — được chọn "Tokyo Overseas Company Project" | ★ Tiền lệ trực tiếp của Pebble Vina |
| 2025-08 | Gọi vốn **Pre-A** | — |
| 2025-10 | Được chọn **KPAS 2025** (Korea Promising AI Startups) | Giải thưởng cấp quốc gia, mới nhất |

**Cách dùng trên landing:** khối "Dòng thời gian công ty mẹ" chọn **6–7 mốc** đắt nhất (2021-11, 2022-07,
2023-03, 2023-05, 2024-03 Saudi, 2025-05 Japan, 2025-10 KPAS) — không liệt kê hết, sẽ loãng.

## C. Con số kỹ thuật

### C1. MINT — `shipped` ★ con số xương sống của trang

| Chỉ số | Giá trị | Nguồn |
|---|---|---|
| Kiến trúc | **Analog-PIM** (tính toán ngay trong bộ nhớ flash nhúng) | Trang chính thức |
| Khớp thần kinh | ~**4 triệu** | SmartTimes / JBNU |
| Hiệu năng | ~**30 GOPS** | SmartTimes / JBNU · IR Deck tr.21 |
| **Hiệu suất năng lượng** | **17,6 TOPS/W** *(deck ghi tròn 17)* | SmartTimes / JBNU · IR Deck tr.21 |
| Kích thước die | 5 × 5 mm² | IR Deck tr.21 |
| Trạng thái | **Sản xuất hàng loạt từ 5/2023** | Company History |

> Đây là **số THẬT, đo được, đã kiểm chứng 2026-06-14**. Nếu chỉ được chọn một con số cho cả trang, chọn số này.

### C2. Lộ trình chip có số (IR Deck tr.21) — hỗn hợp

| Năm | Hiệu năng | Hiệu suất | Die | Mốc | Nhãn |
|---|---|---|---|---|---|
| 2021 | 25 GOPS | 10 TOPS/W | 5×5 mm² | Proof of Concept | `shipped` |
| 2022 | 30 GOPS | 17 TOPS/W | 5×5 mm² | **Mass Production** (MINT) | `shipped` |
| 2024 | 0,5 TOPS | **30 TOPS/W** | 5×5 mm² | PoC với khách hàng | `shipped` |
| 2026 | **160 TOPS** (card 4× = 640) | 16 TOPS/W | 20×23 mm² | High-end (ESPRESSO) | 🟡 `roadmap` — ready Q3/2026 |

**Cách trình đúng:** vẽ đường đi lên 2021 → 2026 với ba nấc đầu **đặc** và nấc 2026 **nét đứt + badge**.
Đường đi lên tự nó là lập luận; không cần thổi.

### C3. ESPRESSO — 🟡 `roadmap` (deck ghi "Available from Sep. 2026")

| Chỉ số | Giá trị |
|---|---|
| Kiến trúc | **SRAM-based Digital-PIM** (nhánh khác Analog-PIM của MINT/PAPAYA) |
| Hiệu năng | **160 TOPS @INT8 / 100 TFLOPS @bFP16** |
| Điện năng · hiệu suất | **10 W** · **16 TOPS/W** |
| Đóng gói | 20,5 × 23 mm, 1799-pin FCBGA · bản M.2 (22×80 mm) · Accelerator Card **4× = 640 TOPS / 400 TFLOPS** |
| Host | PCIe Gen4 ×4 · INT8/16, FP16/32, bFP16/24 |
| Khả năng | Chạy **LLM nội bộ tới 120 tỷ tham số** (model open-weight: DeepSeek, OpenAI, Google…) |
| Đích | AI PC · private LLM appliance · robotics · industrial edge · multimodal |

⚠ **Mọi lần nhắc ESPRESSO trên trang phải kèm badge `Dự kiến 9/2026`.** Đây là chỗ dễ sảy chân nhất
của cả landing: số 160 TOPS quá hấp dẫn để nói suông.

### C4. Benchmark so sánh — `shipped` (đều từ IR Deck)

| So sánh | Kết quả | Ghi chú khi dùng |
|---|---|---|
| **PAPAYA FLEX vs NVIDIA Jetson Nano** — điện năng | **~50×** thấp hơn (0,1–0,15 W vs 5–10 W) | Ghi rõ đối tượng so sánh, đừng viết "giảm 50× điện" trống không |
| **PAPAYA FLEX vs Jetson Nano** — hiệu suất tính toán | **~100×** (ResNet-50: 333–500 vs 3,6–7,2 FPS/W) | Nêu luôn ResNet-50 — kỹ sư cần biết tải nào |
| **PAPAYA FLEX vs Jetson Nano** — kích thước | **~25×** nhỏ hơn (10×10 mm vs 70×45 mm) | — |
| **Trạm gốc 5G: PAPAYA vs NVIDIA L4** | Tác vụ AI **320–332 W → 0,03 W** ≈ **~10.000×** | ★ Con số gây choáng nhất. **Phải** kèm "cho tác vụ AI tại trạm gốc", không phải toàn hệ thống |
| Bối cảnh deck | Data center ngốn ~**2% điện toàn cầu** + ~300.000 gallon nước/ngày | Dùng làm khung "vì sao điện năng là bài toán", không phải claim của PS |

### C5. Ngôn ngữ sản phẩm chính thức — `shipped` (pebble-square.com/en/page/21, verbatim 2026-06-15)

Ba tầng, giữ nguyên wording gốc khi dịch:

1. **Nền:** "AI Chip Family" · "Crossbar Array for Analog Computing" ·
   **"256-State Synaptic Cell (8-bit)"** · lợi thế: **"Ultra-Low Power · Low Latency · Compact"** ·
   **Pebble AI Studio** (Integrated SDK) · AI Accelerator.
2. **On-Device AI:** **Sound** (real-time voice recognition) · **Vision** (high-speed, low-power AI vision) ·
   **Security** ("without reliance on internet or network").
3. **AI-Driven Failure Analysis:** **Risk Management** (real-time anomaly detection) ·
   **Fault Analysis / Predictive Maintenance** ("real-time diagnostics for automated robots and machinery").

**Bốn lợi thế lõi PS tự nhấn:** điện năng cực thấp · riêng tư (on-device, không phụ thuộc đám mây) ·
suy luận nhanh · chi phí hiệu quả. → Đây là **bộ khung 4 trụ** cho khối "Vì sao PIM" trên landing.

### C6. Nền tảng LLM On-Premise — `shipped` (dòng kinh doanh) / 🟡 `roadmap` (khi cấu hình bằng ESPRESSO)

Bán **server suy luận LLM đặt tại chỗ**: chạy LLM tùy biến (RAG/fine-tune) trên dữ liệu riêng, không cloud.
Cấu hình mẫu trong deck: chassis **4U**, CPU **Epyc 9355**, AI SoC = **NVIDIA hoặc ESPRESSO**.
Định hướng: **GPU-centric → NPU/AI SoC · Cloud AI → Private AI**.

> ★ Đây là **vũ khí pitch mạnh nhất cho thị trường VN**: dữ liệu không rời lãnh thổ / không rời doanh
> nghiệp. Và nó **bán được ngay hôm nay** vì cấu hình NVIDIA là hàng có sẵn — chỉ phần ESPRESSO mới
> là lộ trình. Tách hai vế này khi viết copy.

---

## D. Phía Pebble Vina — `shipped`

| Fact | Giá trị |
|---|---|
| Pháp nhân | **CÔNG TY TNHH PEBBLE VINA** |
| MST | **0111545175** |
| Trụ sở | Văn phòng O1912, Tầng 19, Landmark 72 Tower, Khu E6, Khu đô thị mới Cầu Giấy, P. Yên Hoà, Hà Nội |
| Liên hệ | contact@pebblevina.com · 0345 913 369 |
| Quan hệ với PS | **Thành viên Việt Nam của nhóm Pebble Square** (ADR 0002, 2026-06-16) |
| Hậu thuẫn | Nhà đầu tư là **Phó Chủ tịch KOCHAM** (Hội Doanh nghiệp Hàn Quốc tại Việt Nam) |

## E. `internal` — đúng nội bộ, **chưa** đưa lên trang

| Fact | Vì sao chặn |
|---|---|
| Tên/chức danh CEO Pebble Square | Hồ sơ từng ghi **ngược** (Bae=CEO); đã đính chính 2026-06-15 nhưng **chưa xác nhận trực tiếp với PS**. Đăng sai tên CEO công ty mẹ = sự cố ngoại giao |
| Vai trò hiện tại của GS. Bae Hak-yeol | Không xuất hiện ở trang team IR Deck |
| Cấu trúc sở hữu chính xác (% PS nắm, loại hình) | `[CẦN ĐIỀN]` — chưa kết tủa giấy tờ. Trang chỉ được nói "thành viên nhóm", **không** nói "công ty con 100%" |
| Tỉ lệ góp vốn / cam kết của nhà đầu tư KOCHAM | Chưa xác minh |
| Playbook 30 prospect / 5 nhóm thị trường | Tài sản GTM **MẬT** |
| Doanh thu Pebble Square | Hồ sơ DN ghi **−86% YoY** — không đưa, và cũng đừng để ai hỏi tới |

## F. `forbidden` — cấm tuyệt đối

1. **"MDPI Electronics 2024 — Electrical Anomaly Detection Based on PIM Chip"** — bài **không tồn tại**
   đúng tên đó (kiểm chứng web 2026-06-14). Đã gỡ khỏi mọi file công ty. Đừng để agent nào trích lại.
2. **Gán arc-fault / điện mặt trời cho Pebble Square.** Trang chính thức của PS **không** có chữ arc/solar.
   Năng lực khớp được là *anomaly + bảo trì dự đoán cho robot/máy móc*. Arc-fault là **góc tiếp cận do
   Pebble Vina khởi xướng cho thị trường VN** — nói vậy thì đúng, gán cho PS thì sai.
3. **Benchmark "MINT vs ST/TI"** — không tồn tại công khai. Benchmark hợp lệ duy nhất là PAPAYA vs
   Jetson Nano / L4 ở §C4.
4. Bịa **tên khách hàng, logo đối tác, số case study, doanh thu**.

---

## Khung trình đúng — 3 lớp tách bạch

Khi nói chuyện kỹ thuật trên trang, luôn tách:

```
(1) Nguyên lý PIM           — có nền học thuật, nói được
(2) Chip MINT 17,6 TOPS/W   — số thật, đã sản xuất hàng loạt
(3) Ứng dụng tại VN         — góc của Pebble Vina, kèm chuẩn UL 1699B · IEC 63027:2023 · TCVN 11855-1:2017
```

**KHÔNG** ghép ba lớp thành một câu kiểu *"Pebble Square đã làm arc-fault trên chip PIM"*. Đó là câu
sai duy nhất đủ sức phá cả trang trước một phòng kỹ sư.
