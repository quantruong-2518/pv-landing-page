# Semantic parity

Parity is not similarity of words. Two locales are at parity when a reader of each ends up with the
same set of beliefs, obligations and available actions.

## Unit-by-unit comparison

Extract from each locale and compare as sets:

```
claims          mechanisms       qualifiers      numbers (normalized)
system state    user intent      actions         consequences
CTA intent      terminology      placeholders
```

## Verdicts

| Finding | Severity | Rule id |
|---|---|---|
| Meaning present in one locale, missing in another | ERROR | `PARITY_MISSING_MEANING` |
| Meaning present in one locale only, unsupported | ERROR | `PARITY_ADDED_MEANING` |
| Same claim, stronger in one locale | ERROR | `CLAIM_STRENGTH_DRIFT` |
| Same claim, weaker in one locale | WARNING | `CLAIM_STRENGTH_DRIFT` |
| Qualifier dropped | ERROR | `PARITY_LOST_QUALIFIER` |
| Different system state described | ERROR | `PARITY_STATE_MISMATCH` |
| Different primary action | ERROR | `PARITY_ACTION_MISMATCH` |
| Different CTA intent | ERROR | `PARITY_CTA_MISMATCH` |
| Different sentence count / order / rhythm | none | — |
| Different idiom for the same meaning | none | — |

The last two rows matter as much as the first ones. Penalizing natural grammatical difference is how
a parity check turns back into a translation check, and the output starts reading like a translation
again.

## Worked example

Spec qualifier: *applies to the on-premise deployment model*.

```
EN  Data stays inside your network when the model runs on-premise.        ok
VI  Dữ liệu ở lại trong hệ thống của bạn khi mô hình chạy tại chỗ.        ok
KO  데이터가 외부로 나가지 않습니다.                                          FAIL
```

The Korean line is fluent, natural and shorter — and it dropped the condition, turning a conditional
capability into an absolute guarantee. `PARITY_LOST_QUALIFIER`, ERROR. The repair regenerates the KO
key only.

## Numbers

Normalize before comparing: `17,6` (vi) and `17.6` (en) are the same value. `khoảng 18` is not —
that is a different number wearing an approximation.

## Running it

Parity is model-judged against the spec, with the deterministic half automated:
`check_placeholders.py` (variable sets), `check_terms.py` (terminology), `check_claims.py` (numbers
and claim strength). What remains for the reviewer is meaning — read `references/*/qa.md`.
