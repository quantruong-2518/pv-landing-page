# Korean

Korean must read as Korean B2B product content written in Korean. The failure mode is not bad
grammar — it is fluent Korean carrying English structure. That reads as a translated product, and a
Korean buyer notices in one line.

```
natural information order · compact professional phrasing · factual clarity
business relevance · controlled formality
```

## Do not translate English syntax

```
BAD   저희의 강력한 AI 플랫폼은 귀사가 운영을 최적화할 수 있도록 지원합니다.
      (English shape: our + adjective + platform + enables + you + to + verb)
GOOD  내부 데이터를 외부로 보내지 않고 AI 추론을 실행합니다.
```

## Rules

1. **Drop the subject** when context supplies it. Korean marks topic sparingly; `저희는` at the start
   of every sentence is an English habit.
2. **Information order is Korean.** Condition first, result last: `온프레미스로 배포하면 데이터가
   조직 내부에 유지됩니다.` Do not front-load the result the way English does.
3. **Compress modifiers.** English stacks pre-modifiers; Korean prefers a short noun phrase or a
   separate clause. Long `-하는` chains before a noun are a translation tell.
4. **Loanwords only where the industry uses them.** `리드`, `캠페인`, `서버`, `클라우드` are normal.
   `솔루션`, `인사이트`, `밸류` used as filler are not. Prefer a Korean noun when one is standard.
5. **Formality is controlled, not maximal.** `-합니다` for statements. Avoid `-시겠습니다`,
   `귀하께서는`, and honorific stacking — enterprise UI is polite, not deferential.
6. **Buttons take the noun form.** `저장`, `삭제`, `캠페인 삭제`, `취소`. A `-합니다` ending on a
   button is a sentence pretending to be a label.
7. **Headings may be noun phrases.** `온프레미스 배포` is a complete Korean heading. It does not need
   a verb because English had one.
8. **Particles carry meaning.** `은/는` topic vs `이/가` subject changes emphasis; picking by ear from
   the English is how the emphasis lands in the wrong place.

## Mechanics

- Decimal **point**, thousands **comma**: `17.6 TOPS/W`, `15,000`.
- Dates: `2026년 9월`. Currency: `20억 원`.
- Units keep a space: `10 W`. Percentages do not: `50%`.
- Latin proper nouns stay Latin: `MINT`, `PAPAYA FLEX`, `Pebble Square Inc.`, `Analog-PIM`.
- Spacing (띄어쓰기) is not optional; run-on compounds read as machine output.
- No terminal period on buttons, labels, table headers. Body sentences take `.`.

## No structural mirroring

KO output does not need the same sentence count, clause order or paragraph shape as EN or VI. If the
Korean matches the English clause-for-clause, it was translated. Regenerate from the spec.

## Product UI examples

| en | ko |
|---|---|
| Save changes | 변경사항 저장 |
| Delete campaign? | 캠페인을 삭제할까요? |
| This lead is already assigned. | 이미 담당자가 지정된 리드입니다. |
| Check the current owner before assigning it again. | 현재 담당자를 확인한 후 다시 지정하세요. |
| No leads yet | 아직 리드가 없습니다 |
| Could not load leads. | 리드를 불러오지 못했습니다. |
| {count, plural, other {리드 #개}} | one form only — Korean has no grammatical plural |

## Marketing example

```
BAD   당사의 혁신적인 AI 솔루션은 고객사의 비즈니스를 한 단계 도약시킵니다.
GOOD  메모리 내부에서 추론을 실행해 17.6 TOPS/W를 구현합니다. 2023년 5월부터 양산 중입니다.
```

## Note for this repository

The parent company is Korean (Pebble Square Inc., Seongnam). Korean-language copy will be read by
people who can check the parent's own site. Terminology must match what Pebble Square publishes —
`Analog-PIM`, the six business sector names — rather than a fresh Korean rendering invented here.
