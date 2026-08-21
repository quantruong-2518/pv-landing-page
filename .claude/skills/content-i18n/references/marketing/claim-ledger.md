# Claim ledger

Before any marketing copy exists, every factual statement the page could make is enumerated,
graded, and given an id. The writer may only reference ids.

```yaml
claims:
  C001:
    statement: AI inference can run on customer-controlled infrastructure
    type: capability
    confidence: verified
    usable: true
    source: docs/01-proof-bank.md §D

  C002:
    statement: company data can remain internal with on-premise deployment
    type: security
    confidence: conditional
    usable: conditional
    qualification: applies to the on-premise deployment model
    source: docs/01-proof-bank.md §E4

  C003:
    statement: reduces operating costs by 40%
    type: outcome
    confidence: unsupported
    usable: false
```

## Vocabulary

`confidence`: `verified` · `supported` · `conditional` · `inferred` · `unknown` · `unsupported`
`usable`: `true` · `conditional` · `false`
`type`: `capability` · `performance` · `security` · `outcome` · `comparison` · `status` ·
`credential` · `scale`

## Rules

1. **`usable: false` never reaches output.** Not softened, not hedged, not "some customers report".
2. **`usable: conditional` carries its qualification into every locale.** The qualification is part
   of the claim, not a footnote that can be dropped for rhythm.
3. **Strength is invariant.** Forbidden transformations, in any language:

```
can → will              may → does              supports → guarantees
designed for → proven for                       can reduce → eliminates
helps → ensures         up to → always          typically → in all cases
được thiết kế để → đảm bảo                       có thể → luôn
```

4. **A number is a claim.** Every figure needs a ledger entry with a source. `check_claims.py`
   rejects numbers it cannot trace (`CLAIM_UNSUPPORTED_NUMBER`).
5. **A superlative is a claim, and almost never a supportable one.** "leading", "best", "#1",
   "fastest", "hàng đầu", "số 1", "최고" → `CLAIM_UNSUPPORTED_SUPERLATIVE`, ERROR.
6. **A comparison names its counterparty and its method.** "~50× lower power" is meaningless without
   "than NVIDIA Jetson Nano" and, for the FPS/W figure, "on ResNet-50".

## Status labels

Where a project separates shipped capability from roadmap, the label travels with the claim into the
copy — it is not a design decoration that can be dropped when space is tight.

This repo's labels (`docs/01-proof-bank.md`):

| Label | Meaning | On the page |
|---|---|---|
| `shipped` | happened, measured, publicly sourced | green badge |
| `roadmap` | in investor material, not shipped, not on the public catalogue | **mandatory** amber badge + date |
| `internal` | true internally, not cleared to say | never on the page |
| `forbidden` | wrong, ghost source, or misattributed | never, anywhere |

A `roadmap` claim written without its label is a hard failure even if every word is true.

## Machine-readable copy

`content-system/claims/approved.yaml` holds the ledger the scripts read. It is a projection of the
proof bank — when they disagree, the proof bank is right.
