# Apply — moving a validated artifact into the live locale file

The artifact is not the website. Until its strings are inside `web/content/<locale>.ts`, nothing has
shipped. This step has no script; it is done by hand, key by key, and it is where the pipeline has
already lost data once.

```
content-system/output/<page>.<locale>.json   →   web/content/<locale>.ts   →   npm run build
```

Do not start until `scripts/content-check <artifact>` exits 0. Applying a red artifact means editing
the live file twice.

## The mapping

Every artifact entry carries a `key` that is the dotted path of the field it belongs to:

```json
{ "key": "products.hardware.items[0].specs[0].note", "locales": { "vi": "…" } }
```

Walk `web/content/<locale>.ts` down that exact path and replace the value. The file currently holds
its own key path as a placeholder for every unwritten string (`CLAUDE.md` §3b), so a correct apply
replaces `"products.hardware.items[0].specs[0].note"` with prose — the string you are overwriting
should be identical to the key you are applying. **If it is not, stop and find out why** before
touching it: either the artifact is stale, or someone already wrote that key.

## Fields that are not content

These hold real values already and must survive the apply untouched — `CLAUDE.md` §3b:

```
id   status   origin   starred   media.src   media.srcWide   home.hero.media.alt
```

`home.hero.media.alt` is empty on purpose; the image is decorative. An `alt` filled in during an
apply is a regression, not an improvement.

## Before you write a single key

**Reconcile the key sets in both directions.** The two failure modes are not symmetric and neither is
caught by any gate:

| Direction | Means | Do |
|---|---|---|
| key in the artifact, absent from the `.ts` | the schema moved after the artifact was written | do not add the field. Find out what removed it, drop the entry, note it |
| placeholder in the `.ts`, absent from the artifact | the spec missed a slot | go back to the spec — do not invent the string here |

This has already happened: `content-system/output/home.vi.json` still carries an
`alternateLabel: "EN"` entry for a language switcher that was removed on 2026-08-23. The artifact
passes `run_checks` green, because the checks read the artifact and never open `web/`.

## Locale mechanics

- **Vietnamese uses a decimal comma** — `17,6 TOPS/W`. English uses a point. The number is copied
  from the artifact, which took it from `docs/01-proof-bank.md`; it is never retyped from memory at
  this step.
- Proper nouns stay verbatim: Pebble Square Inc. · MOCHA · MINT · PAPAYA FLEX · ESPRESSO ·
  Pebble AI Studio · Analog-PIM · Digital-PIM, and the six business sectors.
- Adding a locale means a complete `content/<locale>.ts` plus its routes, never a partial one. Say so
  rather than shipping half a language.

## After

1. `cd web && npm run build` — must be green before the change is considered applied.
2. **Look at every block the spec marked `height: screen`.** Prose has just been added to a box that
   is exactly one viewport tall; the build cannot see an overflow and neither can any check. Why Now
   already lost its `screen` flag this way on 2026-08-21.
3. Read the applied Vietnamese once, end to end, as a reader rather than as a compiler. Green gates
   prove structure — that placeholders survived, that claims resolve, that terms match the glossary.
   They prove nothing about whether the sentence sounds like it was written by a person in this
   language. That judgement has no automation and cannot be delegated to a checker.
4. Report which keys moved, which stayed placeholders, and anything found during reconciliation.
