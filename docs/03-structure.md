# 03 — Cấu trúc landing

## 1. Mười ba khối, đi từ quan trọng xuống

Thứ tự do GM chốt (2026-08-20): **timing → họ đã làm gì ở đâu → sản phẩm → họ là ai → họ ở đâu →
domain** — rồi mới đến phần Việt Nam và phần chốt.

```
HEADER (dính)   wordmark · 5 mục · chuyển ngữ · 1 nút
│
    HERO             tối · luận đề timing + 2 CTA + trust strip 4 mục
01  WHY NOW          3 sự thật vĩ mô + 4 tính chất PS thiết kế để đạt
    THE NUMBERS      4 con số, mỗi số một nhãn + nguồn
02  TRACK RECORD     4 thị trường: Hàn · Nhật · Ả Rập Xê Út · Việt Nam
    TIMELINE         tối · 14 mốc công khai + 1 mốc lộ trình có nhãn
03  PRODUCTS         3 tầng danh mục theo đúng cấu trúc của trang mẹ
04  WHO THEY ARE     4 lãnh đạo kỹ thuật + hậu thuẫn
05  WHERE            4 địa chỉ trên 2 châu lục
06  DOMAINS          6 business sector của PS + 2 lớp của PV, tag rõ nguồn gốc
07  PEBBLE VINA      4 thứ mua thẳng từ Hàn không có · CTA giữa trang
08  GETTING STARTED  4 bước, mỗi bước một deliverable
09  QUESTIONS        8 câu FAQ + JSON-LD FAQPage
    CTA              tối · 2 lối + số điện thoại
FOOTER          4 cột + thanh đáy
```

**Vì sao thứ tự này chứ không phải thứ tự cũ:** bản đầu mở bằng *"bạn không mua một startup hai tháng
tuổi"* — tức là mở bằng **nỗi lo của người bán**. Thứ tự mới mở bằng **bài toán của thế giới** (điện năng),
rồi mới đến bằng chứng rằng nhóm này giải được. Người đọc không quan tâm ta có đáng tin không cho tới khi
họ tin rằng vấn đề là có thật.

## 2. Luật một khối = một màn hình

Mỗi `<Section>` cao `calc(100svh - 4rem)` (trừ chiều cao header dính), nội dung **căn giữa dọc**, và mang
`scroll-snap-align: start`. Container cuộn là `html` với:

```css
scroll-padding-top: 4rem;                 /* neo và điểm snap không chui dưới header */
@media (min-width: 768px) and (min-height: 640px) {
  html { scroll-snap-type: y mandatory; } /* một cú cuộn = một khối */
}
```

**`mandatory` chứ không `proximity`.** Proximity chỉ bắt khi người dùng vô tình dừng gần điểm snap, nên một
cú lăn chuột mạnh vẫn treo lơ lửng giữa hai khối — đúng lỗi cần sửa. Mandatory an toàn ở đây vì mọi khối đã
được cắt gọn để vừa một màn; và theo spec, khối nào cao hơn khung nhìn thì trình duyệt vẫn cho cuộn tự do
bên trong, không nhốt người đọc.

**Tắt dưới 768px hoặc màn thấp hơn 640px.** Trên điện thoại nội dung chắc chắn tràn màn hình (mỗi khối
974–1899px ở bề rộng 390px), snap ở đó chỉ gây khó chịu.

**Hệ quả khi viết nội dung:** thêm chữ vào một khối là làm khối đó tràn màn. Muốn thêm ý thì cắt ý khác,
hoặc tách thành khối mới. Đây là ràng buộc biên tập, không phải ràng buộc kỹ thuật.

## 3. Header và footer — best practice landing

**Header** — một hàng cao 4rem, dính, nền tối xuyên suốt (không đổi màu theo cuộn nên không cần JS):
wordmark trái · **tối đa 5** mục điều hướng · chuyển ngữ · **đúng một** nút hành động. Dưới `lg`, cụm điều
hướng thu vào một disclosure `<details>` thuần HTML — không JS, không rủi ro lệch hydrate. **Nút hành động
vẫn hiện ở mọi bề rộng**, kể cả 360px: giấu CTA vào trong hamburger là lỗi chuyển đổi kinh điển.

**Footer** — bốn cột: bản sắc + link ra trang mẹ · điều hướng lặp lại · liên hệ · pháp lý (pháp nhân, MST,
công ty mẹ). Thanh đáy: bản quyền + chú giải hệ nhãn. Dưới cùng: tuyên bố nguồn dữ liệu. MST + pháp nhân +
địa chỉ vừa là tín hiệu E-E-A-T vừa là input cho JSON-LD `Organization`.

## 4. Nhịp thị giác

```
tối ▓▓▓  HERO
sáng ░   01 Why now
xám ▒    Numbers
sáng ░   02 Track record
tối ▓▓▓  Timeline            ← neo giữa trang; lịch sử công ty mẹ xứng đáng nền tối
xám ▒    03 Products
sáng ░   04 Who
xám ▒    05 Where
sáng ░   06 Domains
xám ▒    07 Pebble Vina
sáng ░   08 Getting started
xám ▒    09 FAQ
tối ▓▓▓  CTA · FOOTER
```

Ba vùng tối = ba lần người đọc **phải** dừng mắt: mở màn, lịch sử công ty mẹ, lời mời. Xen kẽ sáng/xám giữ
ranh giới khối rõ ngay cả khi snap đưa hai khối cùng tông đứng cạnh nhau.

## 5. Ngôn ngữ và định tuyến

**EN là canonical ở `/`**, VI là bản phụ đầy đủ ở `/vi`. Đảo so với bản đầu vì tệp quyết định — FDI Hàn,
đối tác Nhật, GCC, nhà đầu tư — đọc tiếng Anh. Hai bản đối xứng tuyệt đối: cùng khớp type `LandingContent`
nên lệch một field là `tsc` gãy.

Kỹ thuật: dùng **nhiều root layout** (`app/(en)/` và `app/(vi)/`, không có `app/layout.tsx`) để mỗi ngôn ngữ
có `<html lang>` đúng của nó, kèm `alternates.languages` trong metadata.

## 6. Đối chiếu G1–G9 (research của pv-main-web, 2026-08-03)

| Gap | Mức | Khối đóng nó |
|---|---|---|
| **G1** Không tầng proof | 🔴 | Trust strip trong hero · 02 Track record · Timeline · 04 Who |
| **G2** Không con số nào | 🔴 | **The numbers** (4 số có nguồn + nhãn) |
| **G3** Không FAQ | 🔴 | **09 Questions** + `FAQPage` |
| **G4** Không "bấm nút xong thì sao" | 🟠 | **08 Getting started**, 4 bước có deliverable |
| **G5** Chỉ một lối chuyển đổi | 🟠 | Hero 2 nút · CTA cuối 2 nút |
| **G6** CTA chỉ ở hero và đáy | 🟠 | Header dính (mọi màn) + CTA giữa trang ở **07** |
| **G7** Không tín hiệu "còn sống" | 🟡 | Timeline, mốc cuối KPAS 2025 + UTC 3/2025 |
| **G8** Tầm nhìn chắn trước khối chốt | 🟡 | Không có khối tầm nhìn; CTA là lời mời cụ thể |
| **G9** Không mặt người, không ảnh | 🟡 | ❌ **chưa đóng** — chưa có ảnh thật (`05-backlog.md`) |

**8/9 đóng bằng cấu trúc + nội dung. G9 vẫn cần người chụp ảnh.**

## 7. Nguồn phương pháp

Khung CRO/B2B (H1 ≤ 8 từ, trust trên fold, nhiều điểm CTA, phân tầng người đọc, GEO/AEO) và bản bóc 4 site
edge-AI: `../../pebblevn-ppt-first-meet/projects/pv-main-web/docs/landing/RESEARCH-cau-truc-section.md`.
Nội dung công ty mẹ: `pebble-square.com` đọc 2026-08-20 — chi tiết ở `01-proof-bank.md`.
