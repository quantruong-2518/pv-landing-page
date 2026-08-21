# Anti-AI-slop

A blacklist is not a defence. Words are not the problem; **empty structure** is. A sentence with no
banned word can still carry zero information, and a banned word can be the only correct word.

Test every sentence:

```
Does it name something checkable — a mechanism, a constraint, a number, a state, an action?
If yes, keep it, whatever vocabulary it uses.
If no, delete it, however elegant it is.
```

## Patterns to detect

### 1. Generic opening — `AI_SLOP_GENERIC_OPENING`

```
In today's rapidly evolving landscape…      In the age of AI…
Trong kỷ nguyên số…                          Trong bối cảnh hiện nay…      Ngày nay…
오늘날 급변하는…                               AI 시대에…
```

The reader already lives in the present. Open with the specific thing.

### 2. Empty benefit — `AI_SLOP_EMPTY_BENEFIT`

```
optimize operations       drive growth        enhance efficiency
unlock possibilities      create lasting value
tối ưu vận hành           nâng cao hiệu quả   thúc đẩy tăng trưởng
운영 최적화                  효율성 증대
```

Not banned — **unsupported** is banned. Legal only when the same block states the mechanism that
produces the benefit. "Enhance efficiency" alone fails. "Cuts the approval loop from three steps to
one" passes and does not need the abstraction on top.

### 3. Empty contrast — `AI_SLOP_EMPTY_CONTRAST`

```
not just a chip, but a platform
không chỉ X mà còn Y
단순한 X가 아니라 Y
```

The construction promises a distinction and delivers a mood. If X and Y are genuinely different,
say what the difference does.

### 4. Formulaic triple — `AI_SLOP_FORMULAIC_TRIPLE`

```
Faster. Smarter. Better.        Build. Scale. Transform.
Nhanh hơn. Thông minh hơn. Tốt hơn.
```

Three fragments in a row is a rhythm, not an argument. Rare exception: three *named, distinct*
items — "Design. Fabrication. Integration." is a scope list, not a triple.

### 5. Adjective stack — `AI_SLOP_ADJECTIVE_STACK`

```
powerful, flexible, secure, intelligent
mạnh mẽ, linh hoạt, toàn diện, hiện đại
```

Three or more evaluative adjectives on one noun. Each one costs the reader trust because none can be
checked. Replace the stack with the one property that matters and its evidence.

### 6. Artificial conclusion — `AI_SLOP_ARTIFICIAL_CONCLUSION`

```
The future starts here.       This is more than technology.       The possibilities are endless.
Tương lai bắt đầu từ đây.      Khả năng là vô hạn.
미래가 시작됩니다.
```

A closing line must give the reader an action or a fact. A mood is not a close.

### 7. Rhetorical question padding — `AI_SLOP_RHETORICAL_QUESTION`

Do not open a section with a question the reader did not ask in order to answer it yourself.
A section *heading* framed as the reader's real question is fine — that is message architecture.

### 8. Fake sophistication — `AI_SLOP_FAKE_SOPHISTICATION`

Abstract nouns stacked into a sentence with no subject doing anything:
"a paradigm of intelligent orchestration across the enterprise fabric". Ask who does what to what.

### 9. Over-symmetry — `AI_SLOP_OVER_SYMMETRY`

Every bullet the same length, every heading the same grammatical shape, every section exactly three
items. Real writing is uneven because reality is uneven. Perfect symmetry is the strongest tell that
a machine filled a template.

### 10. Em-dash tic — `STYLE_PUNCTUATION_TIC`

Repeated em dashes, repeated ellipses, `!!`, `?!`. One em dash in a paragraph is prose; three is a
tic.

## Human-naturalness test

> Would a competent human product marketer or UX writer actually write this sentence, in this
> context, for this reader?

Signals of failure: unnatural rhythm, over-symmetry, generic abstraction, machine transitions
("Moreover", "Furthermore", "Hơn nữa" in every paragraph), fake confidence, machine-translated
syntax, brochure voice.

Professional does not mean robotic. Human does not mean casual.

## Severity

| Pattern | Default |
|---|---|
| Empty benefit with no mechanism in block | ERROR |
| Generic opening | WARNING |
| Empty contrast, formulaic triple, adjective stack | WARNING |
| Artificial conclusion | WARNING |
| Punctuation tic | WARNING |
| Duplicate sentence or heading | ERROR |

Warnings are not noise to be silenced. Three warnings in one block means the block has no content.
