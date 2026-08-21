# Vietnamese

Write as a Vietnamese product person writes for Vietnamese professionals. Not as a translator, not
as a ministry, not as a press release.

```
natural · concise · professional · modern · direct · business-aware
```

## Prefer

- Concrete verbs: *chạy, đo, gán, xoá, kiểm tra, triển khai*
- Short clauses; one idea per clause
- Active constructions with a real subject
- Explicit relationships: *vì, nên, khi, sau khi* — not clauses stacked by commas
- Natural Vietnamese order: topic first, then what happens to it

## Avoid

- **Hán-Việt stacking** — *thực hiện việc triển khai giải pháp tối ưu hoá vận hành*. Say
  *triển khai* and stop.
- **Bureaucratic register** — *nhằm mục đích, đối với việc, trong khuôn khổ, tiến hành*
- **Academic tone** in interface copy
- **Inflated corporate language** — *giải pháp toàn diện, hệ sinh thái, nền tảng đột phá*
- **English syntax in Vietnamese words** — the "translation smell": *Chúng tôi cung cấp các giải
  pháp được thiết kế để giúp doanh nghiệp của bạn…*

## Words that need to earn their place

```
nâng tầm · kiến tạo · đột phá · toàn diện · mạnh mẽ · tiên tiến · bứt phá
mở ra · khai phá · thúc đẩy · tối ưu · vượt trội · hàng đầu
```

Not banned. They require semantic value — a mechanism, a number, a constraint in the same block.
`hàng đầu` additionally needs a claim-ledger entry, and almost never gets one.

```
BAD   Giải pháp AI toàn diện giúp doanh nghiệp nâng tầm vận hành.
GOOD  Kết nối dữ liệu nội bộ với AI và đưa kết quả thẳng vào quy trình đang chạy.
```

## Register

- **Marketing** — *bạn* for the reader; no *quý khách* unless the brand config asks for it. Avoid
  *chúng tôi* at the start of every sentence; the company is not the subject of the reader's day.
- **Product UI** — drop the pronoun. *Chọn người phụ trách*, not *Bạn hãy chọn người phụ trách*.
  Imperative, no *vui lòng* except where the system is genuinely asking a favour (waiting, retrying).
- **Errors** — no *rất tiếc*, no *xin lỗi*. State, then action.

## Mechanics

- Decimal **comma**: `17,6 TOPS/W`. Thousands **dot**: `15.000`.
- Dates: `9/2026`, `05/2023`.
- Keep proper nouns and units unchanged: `MINT`, `TOPS/W`, `Analog-PIM`, `PCIe Gen4 ×4`.
- Diacritics always, including in UPPERCASE headings — *XOÁ CHIẾN DỊCH*, never *XOA CHIEN DICH*.
- Loanwords: keep the term the industry actually says (`lead`, `email`, `server`, `cloud`) when the
  glossary says so. Do not invent a Vietnamese equivalent nobody uses.
- No terminal period on buttons, labels, table headers.

## Product UI examples

| en | vi |
|---|---|
| Save changes | Lưu thay đổi |
| Delete campaign? | Xoá chiến dịch? |
| This lead is already assigned. | Lead này đã có người phụ trách. |
| No leads match these filters | Không có lead nào khớp bộ lọc |
| Could not load leads. | Không tải được danh sách lead. |
| Import started — results appear in Leads. | Đã bắt đầu nhập — kết quả sẽ hiện trong mục Lead. |

## Marketing example

```
BAD   Với công nghệ AI tiên tiến hàng đầu, chúng tôi mang đến giải pháp toàn diện
      giúp doanh nghiệp của bạn bứt phá trong kỷ nguyên số.
GOOD  Chip suy luận chạy ngay trong bộ nhớ, ở mức 17,6 TOPS/W — đủ tiết kiệm điện để
      đặt AI tại nơi trước đây chỉ có cảm biến.
```
