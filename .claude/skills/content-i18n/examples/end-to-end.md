# End to end

Two complete passes, raw input to validated output. Read these before running the workflow for the
first time.

---

# A. Marketing — homepage hero

## 1. Raw input

> Homepage hero for Pebble Vina. Audience is a plant maintenance director at a Korean-invested
> manufacturer in Vietnam. We sell the parent company's edge AI chips plus local support. Locales:
> vi, en, ko.

## 2. Marketing content contract

```yaml
page:
  type: homepage
  goal: get a qualified engineer to book a technical call
  funnel_stage: consideration

audience:
  primary: plant maintenance director, FDI manufacturer in Vietnam
  buyer: plant maintenance director
  evaluator: automation engineer          # can veto; reads numbers first
  awareness_level: problem_aware
  primary_problem: unplanned line stoppages; no power or bandwidth at the machine

product:
  name: Pebble Vina edge AI
  category: edge AI inference hardware and local integration
  capabilities: [on-device inference, anomaly detection, predictive maintenance]
  mechanisms: [multiply-accumulate performed inside the memory array, no network round trip]
  deployment_models: [on-device, on-premise]
  constraints:
    - needs a vibration or current signature to exist
    - ESPRESSO configuration is not shipping

proof:
  verified: [C001, C002, C004, C014, C019]
  contextual: [C015]
  unavailable: [customer names, deployment counts, ROI]   # → docs/05-backlog.md

differentiators:
  - Korean fabless parent with a part in mass production, operated by a Vietnamese legal entity

objections:
  - "a two-month-old Vietnamese entity"
  - "why not buy directly from Korea?"

cta: { primary: book a technical call }
claims_policy: { allow_inference: false, require_proof_for_numbers: true }
locale: { requested: [vi, en, ko] }
```

## 3. Claim ledger extract

| id | statement | confidence | usable | label |
|---|---|---|---|---|
| C001 | fabless Edge AI company founded September 2021 | verified | true | shipped |
| C002 | MINT reaches 17.6 TOPS/W | verified | true | shipped |
| C004 | MINT in mass production since May 2023 | verified | true | shipped |
| C015 | data can remain internal **when deployed on-premise** | conditional | conditional | shipped |
| C019 | Vietnamese **member of the group**, tax code 0111545175 | verified | conditional | shipped |
| C003 | *"cuts costs 40%"* | — | **not in the ledger** | — |

C019's qualification is load-bearing: *member of the group*, never *wholly-owned subsidiary*.

## 4. Semantic spec

```yaml
id: home.hero
type: marketing
intent:
  communicate: inference that runs at the machine, sold and supported by a Vietnamese entity
  reader_question: What is this and why should I care?
claims: [C001, C002, C004, C015, C019]
mechanisms:
  - multiply-accumulate runs inside the memory array
  - inference completes without a network round trip
values:
  - detection happens where the event happens
  - procurement can buy it locally
qualifiers:
  - data stays internal only under on-premise deployment
forbidden:
  - absolute security guarantee
  - presenting ESPRESSO as available
cta: { intent: book_technical_call }
```

## 5. Three writers, one spec

`evals/regression/marketing-home-hero.golden.json`. The subheadline in each locale:

```
en  MINT runs inference inside memory at 17.6 TOPS/W and has been in mass production since May 2023.
vi  MINT chạy suy luận ngay trong bộ nhớ ở mức 17,6 TOPS/W và đã sản xuất hàng loạt từ 5/2023.
ko  MINT는 메모리 내부에서 추론을 실행해 17.6 TOPS/W를 구현하며, 2023년 5월부터 양산을 시작했습니다.
```

Same value, three number formats, three date formats, three sentence shapes. Nobody translated
anybody.

## 6. QA

```bash
scripts/content-check .claude/skills/content-i18n/evals/regression/marketing-home-hero.golden.json
# run_checks: PASS — 0 error, 0 warning, 6 info
```

| Dimension | Score |
|---|---:|
| Specificity | 18 / 20 |
| Buyer relevance | 18 / 20 |
| Claim integrity | 20 / 20 |
| Human naturalness | 13 / 15 |
| Value density | 13 / 15 |
| Locale nativeness | 9 / 10 |
| **Total** | **91** — PASS (≥ 82) |

## 7. What the gates would have caught

| If the writer had written | Rule |
|---|---|
| "cuts operating costs by 40%" | `CLAIM_UNSUPPORTED_NUMBER` |
| "Vietnam's leading AI chip company" | `CLAIM_UNSUPPORTED_SUPERLATIVE` |
| "we guarantee your data never leaves" | `CLAIM_STRENGTH_DRIFT` |
| "ESPRESSO delivers 160 TOPS today" | `CLAIM_ROADMAP_UNLABELLED` |
| "Pebble Square does arc-fault detection" | `CLAIM_FORBIDDEN` (F001) |
| "In today's rapidly evolving landscape…" | `AI_SLOP_GENERIC_OPENING` |
| "powerful, flexible, secure, intelligent" | `AI_SLOP_ADJECTIVE_STACK` |

---

# B. Product UX — delete confirmation

## 1. State

> Deleting a campaign also deletes its scheduled posts. It cannot be undone. Locales: vi, en, ko.

## 2. Product UX contract

```yaml
component: { type: destructive_dialog }
context: { screen: Campaign detail, workflow: campaign management, entity: campaign }
state: { current: campaign_active_with_scheduled_posts, cause_known: true }
user: { intent: delete_campaign, expected_action: confirm_or_cancel }
available_actions: [delete_campaign, cancel]
primary_action: delete_campaign
secondary_actions: [cancel]
consequence:
  reversible: false
  description: the campaign and its scheduled posts are removed
recovery: { available: false }
technical_detail: { expose_to_user: false }
placeholders: [{ name: count, type: number }]
terminology: [campaign]
locale: { requested: [vi, en, ko] }
```

## 3. Semantic spec

```yaml
id: campaign.delete.confirm
type: product_ui
component: destructive_dialog
state: { current: campaign_active_with_scheduled_posts, cause_known: true }
user: { intent: delete_campaign }
primary_action: delete_campaign
consequence: { reversible: false, description: campaign and scheduled posts removed }
recovery: { available: false }
placeholders: [{ name: count, type: number }]
```

## 4. Output

`evals/regression/product-campaign-delete.golden.json`.

| | vi | en | ko |
|---|---|---|---|
| Title | Xoá chiến dịch? | Delete campaign? | 캠페인을 삭제할까요? |
| Primary | Xoá chiến dịch | Delete campaign | 캠페인 삭제 |
| Secondary | Huỷ | Cancel | 취소 |

Plurals differ by locale because grammar differs, not because someone was inconsistent:

```
en  {count, plural, one {# scheduled post} other {# scheduled posts}}
vi  {count, plural, other {# bài đã lên lịch}}
ko  {count, plural, other {예약된 게시물 #개}}
```

## 5. QA

```bash
scripts/content-check .claude/skills/content-i18n/evals/regression/product-campaign-delete.golden.json
# run_checks: PASS — 0 error, 0 warning, 6 info
```

| Dimension | Score |
|---|---:|
| State clarity | 19 / 20 |
| Action clarity | 20 / 20 |
| Consequence clarity | 15 / 15 |
| Task usefulness | 14 / 15 |
| Terminology consistency | 10 / 10 |
| Human naturalness | 9 / 10 |
| Locale nativeness | 9 / 10 |
| **Total** | **96** — PASS (≥ 85) |

## 6. What the gates would have caught

| If the writer had written | Rule |
|---|---|
| `[OK]` instead of `[Delete campaign]` | `PRODUCT_VAGUE_ACTION` + `PRODUCT_DESTRUCTIVE_ACTION_MISMATCH` |
| "Error 409" in the failure toast | `PRODUCT_TECHNICAL_LEAKAGE` |
| `{count, plural, one {…} other {…}}` in Korean | `I18N_PLURAL_INVALID_CATEGORY` |
| `{개수}` instead of `{count}` in Korean | `I18N_PLACEHOLDER_TRANSLATED` |
| `저장합니다` on a button | `LOCALE_KO_SENTENCE_LABEL` |
| "Chiến dịch của khách hàng" for a lead-owned campaign | `TERM_FORBIDDEN_VARIANT` |

---

# C. Semantic parity result

Unit-by-unit comparison of `campaign.delete` across the three locales.

| Unit | vi | en | ko | Verdict |
|---|---|---|---|---|
| System state | campaign with scheduled posts | same | same | match |
| Scope of deletion | campaign + scheduled posts | same | same | match |
| Reversibility | "Không thể hoàn tác" | "cannot be undone" | "되돌릴 수 없습니다" | match |
| Primary action | Xoá chiến dịch | Delete campaign | 캠페인 삭제 | match |
| Secondary action | Huỷ | Cancel | 취소 | match |
| Placeholders | `{count}` | `{count}` | `{count}` | match |
| Plural categories | other | one, other | other | correct per locale |
| Terminology | Chiến dịch | Campaign | 캠페인 | match |
| Sentence count | 2 | 2 | 2 | not scored |
| Clause order | VI order | EN order | KO order | not scored |

```json
{ "status": "PASS", "content_type": "product_ui", "score": 96,
  "hard_failures": [], "failures": [] }
```

A near miss worth studying — the Korean draft before repair:

```
데이터가 외부로 나가지 않습니다.
```

Fluent, shorter, and wrong: it dropped the on-premise condition and turned a conditional capability
into an absolute guarantee. `PARITY_LOST_QUALIFIER`, ERROR. Repair regenerated **that key only**;
everything else in the artifact stayed untouched.
