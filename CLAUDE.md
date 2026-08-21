# CLAUDE.md — Luật chơi của repo pv-landing-lab

Đọc file này trước khi sửa bất cứ thứ gì. `README.md` nói repo là gì; file này nói **được phép làm gì**.

## 1. Nguồn sự thật

| Cần biết | Đọc ở đâu |
|---|---|
| Bằng chứng / con số về Pebble Square | `docs/01-proof-bank.md` — **không lấy số từ trí nhớ, luôn tra bảng này** |
| Thông điệp & giọng | `docs/02-message-map.md` |
| Trang có những khối nào, vì sao | `docs/03-structure.md` |
| Nội dung nháp / nội dung cũ còn dùng được | `context/` — **bàn soạn**, không phải nguồn đang chạy |
| Copy thật (EN/VI) | `web/content/en.ts` (canonical), `web/content/vi.ts` — **nguồn đang chạy, duy nhất** |
| Hồ sơ pháp nhân, liên hệ | `web/content/site.ts` |

Nguồn cấp 1 nằm ở repo hàng xóm `../pebblevn-ppt-first-meet/company/` (IR Deck 05/01/2026,
`parent-pebble-square.md`, `memory/`). Repo này **không** sao chép chúng — chỉ trích và ghi nguồn.

## 2. Bốn điều cấm (mất uy tín tức thì)

1. **Không trộn "đã có" với "lộ trình".** Mọi fact đưa lên trang phải mang một trong ba nhãn của
   `proof-bank`: `shipped` · `roadmap` · `internal`. Component `<Fact>` bắt buộc nhận `status`.
2. **Không gán arc-fault / điện mặt trời cho Pebble Square.** PS làm *anomaly + bảo trì dự đoán cho
   robot/máy móc*. Arc-fault là lớp ứng dụng Pebble Vina tự dựng cho thị trường VN.
3. **Không trích bài "MDPI Electronics 2024 — Electrical Anomaly Detection Based on PIM Chip"** — nguồn ma,
   đã kiểm chứng 2026-06-14 là không tồn tại.
4. **Không nói ESPRESSO như hàng đang có.** Nó chỉ nằm trong IR Deck, không có trên trang công khai của PS
   (kiểm chứng 2026-08-20). Mọi lần nhắc phải kèm nhãn `roadmap` và ghi rõ nguồn là tài liệu nhà đầu tư.

Thêm: **không bịa số doanh thu, số khách hàng, tên khách hàng, logo đối tác.** Chưa có thì để trống và
ghi vào `docs/05-backlog.md`.

## 3. Kỷ luật code

- **Song ngữ đối xứng.** `vi.ts` và `en.ts` cùng khớp type `SiteContent` trong `web/content/types.ts`.
  Thêm field ở một bên mà không thêm bên kia → `tsc` gãy. Đó là chủ ý.
- **Không hardcode màu.** Chỉ dùng token trong `web/app/globals.css`. Đổi brand = đổi một chỗ.
- **Không hardcode chữ trong component.** Chữ đi từ `content/*` xuống qua props. Component chỉ biết bố cục.
- **SSR mặc định.** Không `"use client"` trừ khi thật sự cần tương tác. Trang phải crawl được (GEO/AEO).
  Hiện cả 6 route đều prerender tĩnh, không có một dòng JS tương tác nào — menu di động dùng `<details>`.
- **Code và comment bằng tiếng Anh.** Docs (`docs/`, `context/`) viết tiếng Việt. Comment ngắn, nói *vì sao*.
- **Không hardcode đường dẫn.** Route tính bằng `lib/routes.ts` để đổi cấu trúc URL chỉ sửa một chỗ.
- Trước khi commit: `npm run build` phải xanh.

## 4. Quy ước ngôn ngữ

- **EN là canonical** (`/`), **VI là bản đầy đủ song song** (`/vi`) — không bản nào rút gọn. Tệp quyết định
  (FDI Hàn, đối tác Nhật, GCC, nhà đầu tư, kỹ sư) đọc tiếng Anh.
- Số trong bản EN dùng **dấu chấm thập phân** (17.6 TOPS/W); bản VI dùng **dấu phẩy** (17,6 TOPS/W).
- Giữ nguyên tên riêng: Pebble Square Inc. · MOCHA · MINT · PAPAYA FLEX · ESPRESSO · Pebble AI Studio ·
  Analog-PIM · Digital-PIM, và tên sáu business sector của họ.
- Bám sát nội dung trang mẹ nhưng **viết lại bằng lời của mình**; chỉ giữ nguyên văn tên riêng, thông số,
  và vài cụm chữ ký ngắn đặt trong ngoặc kép. Không bê nguyên đoạn.

## 3b. Nội dung để trống là có chủ ý

`lead` và `body` trong `en.ts`/`vi.ts` phần lớn là chuỗi rỗng — cấu trúc lên trước, chữ điền sau
(GM chốt 2026-08-20). **Đừng "sửa" chúng bằng chữ tự nghĩ ra.** Bản nháp và vật liệu nằm ở `context/`,
mọi fact phải tra được về `docs/01-proof-bank.md`. Component đã bỏ qua chuỗi rỗng thay vì vẽ khoảng trắng.

## 4b. Luật một khối = một màn hình (đã nới)

Mọi `<Section>` mang `snap-start`, nhưng chỉ khối mở màn (hero, Why Now, index `/products`, hero
`/contact`) mới cao trọn `calc(100svh - var(--header-h))` — truyền `screen` cho `<Section>`. Khối danh mục
cao theo nội dung. `html` vẫn `scroll-snap-type: y mandatory` từ 768px và cao ≥640px.
**Thêm chữ vào một khối `screen` là làm khối đó tràn màn.** Chi tiết: `docs/03-structure.md` §3.

## 5. Quan hệ với pv-main-web

Repo này **không** import code từ `pv-main-web` và **không** tự ý sửa nó. Nếu một khối ở đây chứng minh
được giá trị, viết đề xuất vào `docs/05-backlog.md`, GM quyết có port sang site chính hay không.

## 6. Hệ thống nội dung đa ngôn ngữ — skill `content-i18n`

Repo này dùng **tiếng Việt, tiếng Anh và tiếng Hàn**. Mọi việc dưới đây đi qua skill
`content-i18n` (`.claude/skills/content-i18n/`), không viết tay trực tiếp:

- copy marketing cho trang web
- microcopy / UX writing trong sản phẩm
- bản địa hoá, đổi khoá i18n
- thay đổi thuật ngữ
- review nội dung

**Luật của hệ thống:**

- **Không sinh copy sản xuất thẳng từ yêu cầu thô.** Đi qua contract → claim ledger → semantic spec
  → viết từng ngôn ngữ → QA. Chuẩn hoá ngữ nghĩa trước, chữ sau.
- **Không bịa năng lực sản phẩm hay tuyên bố kinh doanh.** Mọi con số tra về `docs/01-proof-bank.md`.
- **Giữ nguyên khoá dịch** bất cứ khi nào có thể. Đổi tên khoá = mất bản dịch ở mọi ngôn ngữ khác.
- **File thuật ngữ là nguồn có thẩm quyền** — `content-system/terminology/glossary.yaml`.
- **Sinh từng ngôn ngữ độc lập từ ngữ nghĩa.** Cấm `vi → dịch en → dịch ko` theo cả hai chiều.
- **Không làm mạnh hay yếu đi một claim khi bản địa hoá.** `có thể` không thành `sẽ`,
  `hỗ trợ` không thành `đảm bảo`. Điều kiện đi kèm claim phải sống sót ở cả ba ngôn ngữ.
- **Luôn kiểm placeholder.** `{count}` giữ nguyên trong tiếng Hàn.
- **Sửa đúng khoá hỏng, không viết lại cả khối.**
- **Chạy kiểm định trước khi coi là xong:** `scripts/content-check <artifact.json>` — exit 1 là chưa xong.

Sự thật của dự án nằm ở `content-system/` (projection máy đọc được của `docs/01-proof-bank.md`),
không nằm trong file reference của skill. Khi hai bên lệch nhau, **proof-bank thắng**.

`web/` hiện chỉ ship **en + vi**. `ko` skill sinh được nhưng `web/content/types.ts` chưa có —
thêm `ko` nghĩa là thêm một `content/ko.ts` đầy đủ, không phải một nửa.
