# Product UX QA

Judge the artifact against the state it describes. Never grade product UI on persuasion, brand voice
or emotional resonance.

## Rubric

| Dimension | Weight | Scored on |
|---|---|---|
| State clarity | 20 | the user can name the system's state after reading |
| Action clarity | 20 | the user knows exactly what to do, and the label says it |
| Consequence clarity | 15 | outcome and reversibility are stated where they matter |
| Task usefulness | 15 | the copy moves the task forward instead of describing it |
| Terminology consistency | 10 | glossary-preferred terms, no drift across strings |
| Human naturalness | 10 | a UX writer would write this; not translated, not robotic |
| Locale nativeness | 10 | native grammar and register per `references/locales/*` |

Total **100**. Pass ≥ **85** — higher than marketing, because ambiguity here costs the user directly.
Hard failures override the score.

## Scoring guidance

- **State clarity** — if the copy could describe two different states, cap at 8.
- **Action clarity** — a vague primary button (`OK`, `Confirm`, `Submit`) caps this at 8 whenever a
  specific action exists.
- **Consequence clarity** — irreversible action with no reversibility statement is 0 and a hard
  failure.
- **Task usefulness** — a dead end with no next step or recovery caps at 5.
- **Terminology** — any forbidden variant is 0 and a hard failure.
- **Naturalness** — a Korean string with English word order fails here even if every word is right.

## Hard failures

```
wrong system state         wrong action              wrong consequence
invented cause             missing placeholder       renamed placeholder
translated placeholder     destructive action mismatch
critical terminology error technical detail leaked without cause
```

## Output

```json
{
  "status": "PASS",
  "content_type": "product_ui",
  "score": 89,
  "dimensions": {
    "state_clarity": 18,
    "action_clarity": 18,
    "consequence_clarity": 14,
    "task_usefulness": 13,
    "terminology_consistency": 10,
    "human_naturalness": 8,
    "locale_nativeness": 8
  },
  "hard_failures": [],
  "failures": [
    {
      "key": "lead.empty.body",
      "locale": "ko",
      "rule": "LOCALE_TRANSLATIONESE",
      "reason": "English clause order with an explicit subject Korean would drop.",
      "repair_instruction": "Rewrite from the semantic spec in natural Korean information order."
    }
  ]
}
```

No prose outside the JSON.
