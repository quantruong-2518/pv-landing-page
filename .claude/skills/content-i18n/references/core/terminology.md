# Terminology

Terminology is data, not judgement. It lives in `content-system/terminology/glossary.yaml` and is
authoritative — a writer who prefers a different word is wrong until the glossary changes.

## Entry shape

```yaml
terms:
  lead:
    concept:
      definition: a potential customer record
    locales:
      vi:
        preferred: Lead
        forbidden: [Khách hàng, Khách tiềm năng]
      en:
        preferred: Lead
      ko:
        preferred: 리드
    preserve_in_ui: true
    scope: [product_ui]
```

- `preferred` — the string that must appear.
- `forbidden` — variants that are wrong in that locale, including near-synonyms that shift meaning.
  `Khách hàng` is forbidden for `lead` because it means *customer* — someone who already bought.
  That is a different entity in the product, and the mistranslation quietly changes the data model
  the user believes in.
- `preserve_in_ui: true` — do not translate inside product UI even if a natural translation exists;
  it must match the label the user sees elsewhere in the app.
- `scope` — which content types the term governs. `lead` is an app entity: forbidding *khách hàng*
  is right inside the product and wrong on a landing page, where it is ordinary Vietnamese for
  *customer*. Omit `scope` for terms that govern both.

## Product names

Never translate, never inflect, never localize casing:

```
Pebble Square Inc. · Pebble Vina · MOCHA · MINT · PAPAYA FLEX · ESPRESSO
Pebble AI Studio · Analog-PIM · Digital-PIM
```

The six official business sectors keep their published English names:
**Fault Analysis · Home IoT · Risk Management · Security · Healthcare · Vision**.

## Resolution order

1. Glossary `preferred` for the target locale.
2. Project facts (`content-system/facts/*.yaml`) for proper nouns.
3. Only then the writer's own judgement — and if judgement is needed twice for the same term, add it
   to the glossary instead of deciding again.

## Consistency beats elegance

Within one product, one concept gets one word in each locale. Synonym variation reads as richness in
an essay and as *two different things* in an interface. Do not alternate `lead` / `contact` /
`prospect` for stylistic variety.

## Checked by

`scripts/check_terms.py`:

| Rule | Severity | Fires when |
|---|---|---|
| `TERM_FORBIDDEN_VARIANT` | ERROR | a forbidden variant appears in that locale, within scope |
| `TERM_PROPER_NOUN_CASING` | WARNING | a protected proper noun appears with different casing |
| `TERM_PREFERRED_MISSING` | INFO | a `preserve_in_ui` term is named in every locale but one |

The last one is an **observation, not a defect**. Languages restructure: an English passive can
carry the entity Vietnamese names outright, and penalizing that turns a terminology check back into
a translation check. It is reported so a reviewer can look; it never fails a build.

Placeholder names are stripped before matching — `{owner}` is a runtime variable, not the word
*owner*.
