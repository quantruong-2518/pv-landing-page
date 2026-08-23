# Kế hoạch hình ảnh

`docs/05-backlog.md` #5 và khoảng trống **G9** (`docs/03-structure.md` §6) đều chỉ vào cùng một chỗ:
trang deep-tech thuần đồ hoạ dễ bị đọc là *"công ty chưa có gì"*. Khung mới chừa sẵn **7 ô ảnh**.

## Cơ chế

Mỗi ô là một `Media` trong i18n: `{ src?: string; srcWide?: string; alt: string }`.

- `src` **trống** → component `<Figure>` vẽ **placeholder có thiết kế**: lưới crossbar (nhắc kiến trúc
  Crossbar Array của Analog-PIM) + khung ngắm 4 góc + chính chữ `alt` in bằng font mono ở giữa. Nghĩa là
  **chỗ trống tự nói nó chờ ảnh gì** — vừa là chỉ dẫn art direction, vừa không trông như lỗi vỡ ảnh.
- `src` có giá trị → `next/image` với `fill` + `object-cover`, `sizes` đã đặt sẵn theo cột.

- Có **`srcWide`** → ô đó dùng `<Illustration>` chứ không phải `<Figure>`: một thẻ `<picture>`, `src` là bản
  vuông cho điện thoại, `srcWide` là bản **vẽ lại theo bố cục ngang** nhận từ `lg` (1024px) trở lên. Dùng
  đúng khi hai file là *hai bản dựng khác nhau*; nếu chỉ khác độ phân giải thì để một file và `next/image`
  tự lo. `<Illustration>` không vẽ khung — dành cho ảnh đã tự mang khung.

Đặt file vào `web/public/media/`, đặt tên đúng cột "file" bên dưới, rồi điền `src` vào `en.ts` + `vi.ts`.
Không cần sửa component.

## Bảy ô

> **Cập nhật 2026-08-20 (GM):** ô #1 (`home.hero.media`) đã **chốt** — không còn chờ ảnh chụp MINT nữa.
> Hero giờ dùng cố định `/brand/pebble-vina-decorator.png` (mark 3D của brand), không đi qua `<Figure>`/
> placeholder nữa (component render thẳng, `object-contain`, `alt=""` vì thuần trang trí). Ảnh chụp MINT
> thật vẫn còn giá trị — chuyển việc "có thật không trong 1 giây" cho các khối khác (dòng thời gian, số đo).

| # | Key i18n | Tỉ lệ | File | Chụp/vẽ cái gì |
|---|---|---|---|---|
| 1 | ~~`home.hero.media`~~ | — | `/brand/pebble-vina-decorator.png` | **Đã chốt, không phải ảnh chụp.** Mark 3D của brand, cố định, không đổi theo nội dung. |
| 2 | ~~`home.whyNow.media`~~ → `home.whyNow.points[0..2].media` | 1/1 (mobile) · 4/3 (`lg`+) | `why-now-{1,2,3}-{mobile,desktop}.webp` | **Đã có, GM cấp 2026-08-21.** Ô ảnh chung của khối bị **xoá**; mỗi point giờ có ảnh riêng, mỗi ảnh hai bản dựng. Bộ ba minh hoạ nét mảnh trên nền kem, khung ngắm 4 góc vẽ sẵn trong file: **1** trung tâm dữ liệu — lưới điện, nước làm mát, quả cầu "2%"; **2** AI ở biên — trạm biến áp, pin mặt trời, cánh tay robot, đồng hồ, cảm biến quanh một lõi AI, tất cả gắn nhãn pin/mW; **3** von Neumann vs PIM — bus dày chạy giữa chip và bộ nhớ, đối lại là mảng crossbar tính tại chỗ, kèm hai thanh điện năng. Ảnh **3** thay luôn sơ đồ `pim-vs-von-neumann.svg` mà `docs/05-backlog.md` #10 đặt hàng. |
| 3 | `products.hardware.items[0].media` | 4/3 | `mint.webp` | MINT — chụp thẳng, hơi nghiêng 3/4, nền xám trung tính. |
| 4 | `products.hardware.items[1].media` | 4/3 | `papaya.webp` | PAPAYA FLEX — **cùng setup, cùng góc, cùng nền** với MINT. |
| 5 | `products.hardware.items[2].media` | 4/3 | `espresso.webp` | ESPRESSO — chưa có silicon thật (nhãn `roadmap`). **Không được dùng ảnh render trông như hàng thật.** Để trống, hoặc dùng sơ đồ khối kiến trúc, hoặc ảnh mockup có ghi rõ "concept". |
| 6 | `products.software.groups[].media` | 16/10 | `enterprise.webp` · `private-ai.webp` | Ảnh chụp màn hình sản phẩm trong khung trình duyệt tối giản. Với Private AI: một **sơ đồ** 5 đích triển khai (on-device → edge → on-premise → private cloud → GPU) xếp theo thang điện năng, có phần cứng thật đứng sau mỗi bậc, sẽ mạnh hơn ảnh chụp màn hình. |
| 7 | `contact.media` | 3/2 | `office.webp` | Landmark 72 hoặc chính văn phòng O1912 — có người trong khung thì tốt hơn kiến trúc rỗng. |

## Luật về ảnh

1. **Bốn ảnh phần cứng phải là một bộ.** Cùng nền, cùng góc, cùng nhiệt độ màu. Bốn ảnh lệch phong cách
   làm danh mục trông như đi mượn.
2. **Không dùng ảnh stock người mặc vest bắt tay.** Không dùng render 3D bóng bẩy cho hàng chưa tồn tại.
   Cả hai đều phá đúng thứ trang này đang cố dựng: sự đáng tin.
3. **`alt` là câu tả ảnh thật, không phải nhồi từ khoá.** Nó vừa cho screen reader, vừa là chữ hiện trong
   placeholder khi ảnh chưa có — nên viết như đang dặn thợ ảnh.
4. **ESPRESSO đang mang nhãn `roadmap`** (`CLAUDE.md` §2 luật 4). Ảnh của nó không được trông như hàng
   đang bán.
5. Xuất **WebP**, bề ngang ≥ 1600px, mỗi file ≤ 200KB. Ảnh hero nặng là mất LCP.
6. **Ảnh art-direction đi theo cặp.** Bản vuông và bản ngang phải cùng nét, cùng nền, cùng bảng màu — người
   xoay điện thoại phải thấy *cùng một bức*, dựng lại bố cục, chứ không phải hai bức khác nhau.
