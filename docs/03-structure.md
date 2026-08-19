# 03 — Cấu trúc landing kiểu mẫu

## 1. Khung 12 khối

```
NAV (dính, tối)  ·  VI ⇄ EN  ·  CTA nhỏ
│
01  HERO                    tối, full-viewport — H1 ≤ 9 từ + 2 CTA + trust strip 4 mục
02  PROOF STRIP             ★ ngay dưới fold — pháp nhân mẹ + 3 mốc tra được          → đóng G1
03  CON SỐ                  ★ 4 số lớn, mỗi số một nhãn trạng thái + nguồn            → đóng G2
04  VẤN ĐỀ                  3 nỗi đau của tổ chức Việt (dữ liệu · điện · độ trễ)
05  CÔNG NGHỆ               PIM là gì · hai nhánh Analog / Digital · 4 trụ lợi thế
06  DÒNG THỜI GIAN          ★★ 7 mốc của mẹ, mốc 2026 nét đứt                         → đóng G7
07  PEBBLE VINA LÀM GÌ      4 việc chỉ pháp nhân Việt làm được  ‖  CTA giữa trang     → đóng G6
08  ỨNG DỤNG                lưới 6 use case, tách rõ "PS có sẵn" vs "PV dựng thêm"
09  CÁCH BẮT ĐẦU            4 bước, mỗi bước một deliverable                          → đóng G4
10  FAQ                     8 câu + JSON-LD FAQPage                                   → đóng G3
11  CTA CUỐI                tối, 2 lối: đặt lịch ‖ hồ sơ năng lực                     → đóng G5
12  FOOTER                  pháp nhân, MST, địa chỉ, liên hệ, link Pebble Square
```

## 2. Vì sao từng khối tồn tại

**01 HERO — dark, một câu, hai nút.** H1 ≤ 9 từ theo luật CRO (trung bình trang chuyển đổi cao < 8 từ).
Nền tối vì cả trang chơi nhịp *tối → sáng → tối*: hero và CTA cuối là hai đầu neo, thân bài sáng để đọc.
Trust strip 4 mục nằm **trong** hero, không đợi xuống dưới — >54% người dùng chỉ tập trung trên fold.

**02 PROOF STRIP — khối quan trọng nhất của cả trang.** Research site chính chấm G1 mức 🔴: *"suốt 6 section
không một logo, một con số, một tên khách, một giải thưởng"*. Cả 4 site edge-AI được bóc (Kneron, Hailo,
Axelera, SiMa) đều đặt proof trong 3 màn đầu. Ta không có logo khách → **dùng pháp nhân mẹ làm proof**:
tên đầy đủ, địa chỉ, năm thành lập, link tra chéo.

**03 CON SỐ — đóng G2.** Axelera và SiMa neo toàn bộ độ tin cậy kỹ thuật vào 3 con số. Ta có bốn:
17,6 TOPS/W (`shipped`) · 양산 5/2023 (`shipped`) · ~50× vs Jetson Nano (`shipped`) · 160 TOPS
(🟡 `roadmap`). Số thứ tư **cố ý** để nhãn vàng — xem `02-message-map.md` §4.

**04 VẤN ĐỀ đứng trước 05 GIẢI PHÁP.** Bốn site edge-AI kia bỏ qua khối problem vì họ **product-led**,
bán cho kỹ sư đã biết mình cần gì. Pebble Vina bán cho **tổ chức Việt chưa xác định được bài toán** →
thứ tự canon `HERO → PROBLEM → SOLUTION` đúng hơn. **Đừng bắt chước nhầm chỗ này.**

**05 CÔNG NGHỆ.** Giải thích PIM bằng một câu người phi kỹ thuật hiểu được (*"phép tính chạy ngay trong
bộ nhớ, thay vì khiêng dữ liệu qua lại"*), rồi mới tách hai nhánh Analog (MINT/PAPAYA) và Digital
(ESPRESSO). Luật "guided walkthrough" cho sản phẩm phức tạp.

**06 DÒNG THỜI GIAN — khối biện minh cho sự tồn tại của Pebble Vina.** Hai mốc JV Saudi (2024-03) và
Pebble Square Japan (2025-05) chứng minh mô hình *lập pháp nhân địa phương* là **cách mẹ vẫn mở rộng**,
không phải ngoại lệ dựng cho VN. Đồng thời là tín hiệu "công ty còn sống" (G7) mà 3/4 site đối chiếu đều có.

**07 PEBBLE VINA LÀM GÌ.** Trả lời phản biện *"vậy mua thẳng từ Hàn cho rồi?"*. CTA giữa trang đặt ở đây
(G6) vì đây là điểm thuyết phục cao nhất trước khi trang chuyển sang chi tiết kỹ thuật.

**08 ỨNG DỤNG.** Lưới use-case — cả 4 site đối chiếu đều có, luôn là lối rẽ vào tầng sâu hơn. Điểm riêng
của ta: **mỗi ô ghi rõ nguồn gốc** — `Pebble Square` (Sound/Vision/Security/Predictive Maintenance) hay
`Pebble Vina` (an toàn điện, LLM riêng triển khai tại VN). Đây là chỗ luật "không gán arc-fault cho PS"
được thi hành bằng bố cục, không bằng lời hứa.

**09 CÁCH BẮT ĐẦU — đóng G4.** SiMa thay bằng "Getting Started — 3 lối vào"; ta dùng 4 bước có deliverable.
Với bán hàng kiểu tư vấn, *"bấm nút xong thì chuyện gì xảy ra"* là phản biện lớn nhất còn lại.
⚠ **Chưa có thời lượng từng bước** — chờ GM chốt (`05-backlog.md` #4). Không bịa số tuần.

**10 FAQ — đóng G3, và là đòn GEO mạnh nhất.** Heading dạng câu hỏi + đoạn mở kiểu định nghĩa là thứ
answer engine trích. Kèm JSON-LD `FAQPage`. Câu số 7 (*"Có làm được arc-fault không?"*) là câu khó nhất
và được trả lời **thẳng**: PS không liệt kê arc-fault; PV dựng lớp ứng dụng trên năng lực anomaly của PS;
có chuẩn UL 1699B · IEC 63027:2023 · TCVN 11855-1:2017 để bám.

**11 CTA CUỐI — hai lối (G5).** 4/4 site đối chiếu có ≥2 lối chuyển đổi. Người chưa sẵn sàng đặt lịch —
chiếm đa số — cần một việc để làm ngoài đóng tab.

**12 FOOTER.** MST + pháp nhân + địa chỉ = tín hiệu E-E-A-T và là input cho JSON-LD `Organization`.

## 3. Đối chiếu G1–G9

| Gap (research site chính, 2026-08-03) | Mức | Khối đóng nó |
|---|---|---|
| **G1** Không tầng proof | 🔴 | **02** Proof strip + **06** Dòng thời gian |
| **G2** Không con số nào | 🔴 | **03** Con số (4 số có nguồn + nhãn) |
| **G3** Không FAQ | 🔴 | **10** FAQ 8 câu + `FAQPage` |
| **G4** Không "bấm nút xong thì sao" | 🟠 | **09** Cách bắt đầu, 4 bước có deliverable |
| **G5** Chỉ một lối chuyển đổi | 🟠 | **01** + **11** hai nút (đặt lịch ‖ hồ sơ năng lực) |
| **G6** CTA chỉ ở hero và đáy | 🟠 | **07** CTA giữa trang + nav dính |
| **G7** Không tín hiệu "còn sống" | 🟡 | **06** mốc mới nhất KPAS 2025 |
| **G8** Tầm nhìn chắn trước khối chốt | 🟡 | Bỏ hẳn khối tầm nhìn; **11** là lời mời cụ thể |
| **G9** Không mặt người, không ảnh | 🟡 | ❌ **chưa đóng** — chưa có ảnh thật (`05-backlog.md` #5) |

**8/9 đóng được bằng cấu trúc + nội dung sẵn có. G9 cần người chụp ảnh.**

## 4. Nhịp thị giác

```
tối ▓▓▓  01 Hero
sáng ░   02 Proof · 03 Con số
sáng ░   04 Vấn đề · 05 Công nghệ
tối ▓▓▓  06 Dòng thời gian        ← neo giữa trang, khối "lịch sử mẹ" xứng đáng nền tối
sáng ░   07 Pebble Vina · 08 Ứng dụng · 09 Cách bắt đầu · 10 FAQ
tối ▓▓▓  11 CTA · 12 Footer
```

Ba vùng tối = ba lần người đọc **phải** dừng mắt: mở màn, lịch sử công ty mẹ, lời mời. Thân bài giữ nền
sáng vì đây là trang **đọc để thẩm định**, không phải trang để ngắm.

## 5. Nguồn phương pháp

Khung `HERO → PROBLEM → SOLUTION → SOCIAL PROOF → HOW IT WORKS → CTA`, luật H1 ≤ 8 từ, luật trust-trên-fold,
luật nhiều điểm CTA, luật phân tầng người đọc, luật GEO/AEO — tổng hợp trong
`../../pebblevn-ppt-first-meet/projects/pv-main-web/docs/landing/RESEARCH-cau-truc-section.md` §1, kèm
nguồn gốc (Instapage · Genesys Growth · Baymard/Serbyte · Salespanel · Flowtrix · Airfleet · WRITER · AirOps).
Bóc cấu trúc site đối chiếu: xem `04-benchmarks.md`.
