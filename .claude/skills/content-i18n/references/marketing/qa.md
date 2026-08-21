# Marketing QA

The reviewer judges the artifact, not the writer's reasoning. Do not read the writer's rationale
before scoring; if the copy only works once explained, it does not work.

## Rubric

| Dimension | Weight | Scored on |
|---|---|---|
| Specificity | 20 | named mechanisms, numbers, constraints — not adjectives |
| Buyer relevance | 20 | answers *why this buyer cares*, at the right awareness level |
| Claim integrity | 20 | every claim traceable, strength unchanged, qualifiers intact |
| Human naturalness | 15 | a competent human would write this sentence here |
| Value density | 15 | information per line; no sentence that can be deleted for free |
| Locale nativeness | 10 | reads as written in that language, not rendered into it |

Total **100**. Pass ≥ **82**. Hard failures override the score — a 95 with an unsupported number is
a FAIL.

## Scoring guidance

- **Specificity** — count checkable facts per 100 words. Zero facts caps this at 6.
- **Buyer relevance** — if the copy would read identically for a different buyer persona, cap at 10.
- **Claim integrity** — binary in practice. Any drift or untraceable figure is 0 and a hard failure.
- **Human naturalness** — read it aloud. Over-symmetry, machine transitions and brochure voice cost
  points even when every fact is right.
- **Value density** — delete each sentence in turn; if nothing is lost, the sentence was a defect.
- **Locale nativeness** — judged by the locale rules, never by resemblance to the English.

## Hard failures

```
invented factual claim       unsupported number         unsupported superlative
claim-strength drift         lost qualification         roadmap item unlabelled
forbidden claim used         material meaning change    major semantic mismatch across locales
```

## Output

```json
{
  "status": "FAIL",
  "content_type": "marketing",
  "score": 76,
  "dimensions": {
    "specificity": 14,
    "buyer_relevance": 18,
    "claim_integrity": 20,
    "human_naturalness": 9,
    "value_density": 8,
    "locale_nativeness": 7
  },
  "hard_failures": [],
  "failures": [
    {
      "key": "home.hero.subtitle",
      "locale": "en",
      "rule": "AI_SLOP_EMPTY_BENEFIT",
      "reason": "Uses generic business benefits without explaining the mechanism.",
      "repair_instruction": "Replace abstract benefits with the verified deployment mechanism (C001)."
    }
  ]
}
```

`status`: `PASS` · `FAIL`. `failures[].key` must be a real key so repair can be targeted.
`repair_instruction` names what to write, not just what is wrong. No prose outside the JSON.
