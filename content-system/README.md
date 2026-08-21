# content-system — what is true

The `content-i18n` skill holds **how to reason and write**. This folder holds **what is true** for
this project. Keep them separate: a generic writing rule must never contain a Pebble fact, and a fact
must never live only inside a prompt.

| Folder | Holds | Authority |
|---|---|---|
| `brand/` | voice, tone, UI length limits, locale roster | product decision |
| `facts/` | company and product facts | mirrors `docs/01-proof-bank.md` |
| `claims/` | approved claims with confidence and usability | mirrors `docs/01-proof-bank.md` |
| `terminology/` | glossary per locale | authoritative on its own |
| `i18n/` | product UI string bundles | authoritative on its own |

> **Naming.** The generic architecture calls this folder `content/`. This repo already has
> `web/content/*.ts` (live site copy) and `context/` (drafts), so a third `content/` at the root
> would be genuinely ambiguous. Renamed for that reason and no other.

## Precedence

```
docs/01-proof-bank.md   >   content-system/facts + claims   >   anything a model remembers
```

`facts/` and `claims/` are machine-readable **projections** of the proof bank. When they disagree,
the proof bank is right and the projection is stale — fix the projection, never the other way.

## Changing an approved claim

1. Change `docs/01-proof-bank.md` first, with the source.
2. Mirror it into `claims/approved.yaml`, keeping the claim id stable.
3. Run `python3 .claude/skills/content-i18n/scripts/check_claims.py --content <artifact>` for every
   artifact that references the id.
4. If the status label changed (`shipped` ↔ `roadmap`), every page that mentions it needs its badge
   re-checked — that is a hard failure surface, not a cosmetic one.
