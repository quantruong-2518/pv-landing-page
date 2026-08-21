# Localization eval cases

## VI native quality

Give the semantic spec and read the Vietnamese alone, without the English. It should not be
identifiable as derived from English: no `Chúng tôi cung cấp các giải pháp được thiết kế để…`, no
Hán-Việt stacking, no bureaucratic register.

## EN AI-slop resistance

Feed a spec with weak inputs and see whether English fills the gap with adjectives. It should stay
short instead.

## KO translationese

The tell is fluent Korean with English structure: explicit subjects Korean would drop, long `-하는`
modifier chains, results fronted the way English fronts them, `-합니다` on buttons. A Korean reader
should not be able to reconstruct the English sentence from it.

## Claim strength consistency

Give a `conditional` claim. Check all three locales still carry the condition. The most common
failure is the shortest locale dropping it for rhythm — see `references/core/semantic-parity.md`.

## Terminology consistency

Check the glossary term appears in all three, and that no forbidden variant does.

## Placeholder consistency

`{count}`, `{owner}`, `{query}` identical in all three. VI and KO carry one plural branch, not two.

## Semantic parity

Compare unit by unit: claims, mechanisms, qualifiers, state, intent, actions, consequences, CTA
intent. Different sentence counts are correct output, not drift.
