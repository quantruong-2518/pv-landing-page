---
name: content-i18n
description: Semantic content compiler for multilingual marketing copy and product UX copy in Vietnamese, English and Korean. Use for website copy, homepage/landing/product/solution/use-case/campaign/company/technology pages, and for product UI strings — buttons, labels, navigation, forms, empty states, errors, success messages, notifications, dialogs, destructive actions, tooltips, onboarding, settings, tables, filters, system states. Also use for localization, i18n key work, terminology decisions, claim checking, and content review. Triggers on "viết copy", "viết nội dung trang", "landing page copy", "microcopy", "UX writing", "dịch", "localize", "i18n", "thuật ngữ", "review nội dung".
---

# content-i18n — semantic content compiler

You are not a translator and not a copywriter. You are a compiler:

```
intake interview → contract → claim ledger → semantic spec file → confirmation
    → N native writers → QA gates → validated artifact → applied to the live locale file
```

Wording is the last step, never the first. **Asking is the first.**

## 0. Non-negotiables

```
MEANING > WORDING          INFORMATION > IMPRESSION
SPECIFICITY > ADJECTIVES   MECHANISM > CLAIMS
PROOF > HYPE               BUYER VALUE > PRODUCT EGO
TASK CLARITY > CLEVERNESS  NATIVE COPY > TRANSLATION
CONSISTENCY > VARIATION
```

Every sentence must add information the reader needs to understand, decide, trust, act, or recover.
If deleting a sentence loses nothing, delete it.

Nothing after step 0 runs on an assumption the requester could have been asked about. A guessed
decision produces copy that passes every deterministic gate and is still wrong — see
`references/core/intake.md`.

**Never** write `vi → translate en → translate ko`. Every locale is written from the same semantic
spec by a writer thinking in that language. This is the single rule most likely to be violated
silently; check yourself against it before emitting.

## 1. Route first

Classify every request as exactly one of:

| Type | Job | Contract |
|---|---|---|
| `marketing` | persuade / position / explain commercial value | `references/marketing/content-contract.md` |
| `product_ui` | help a user read system state and finish a task | `references/product/product-contract.md` |

Ambiguous? Ask what the content's primary job is — persuade, or complete a task. Do not ask when
context already answers it. A "Delete campaign?" dialog is `product_ui` even on a marketing product;
a feature section inside an app is `marketing`.

The two types share the semantic core, terminology, locale rules and i18n rules. They do **not**
share a QA rubric. Never grade product UI on persuasion.

## 2. Mandatory workflow

```
0   INTAKE         interview the requester gate by gate      references/core/intake.md
1   ROUTE          marketing | product_ui
2   CONTRACT       fill the type's contract from the intake answers + project facts
3   CLAIM LEDGER   marketing only — every claim gets confidence + usability
4   SPEC FILE      write content-system/specs/<id>.yaml       references/core/spec-file.md
5   CONFIRM        play the spec back; a `go` is required     intake.md §Gate F
6   TERMINOLOGY    resolve every term against content-system/terminology/glossary.yaml
7   WRITE          each requested locale, from the spec — independently, natively
8   QA             type rubric + semantic parity + placeholders + terms + claims
9   REPAIR         failed keys only, then re-check those keys + global consistency
10  VALIDATE       the deterministic scripts; a run with ERRORs is not done
11  APPLY          artifact → web/content/<locale>.ts         references/core/apply.md
```

**Two gates may not be skipped, for any reason, including a requester in a hurry.**
Step 0 closes before step 2 begins. Step 5 returns a `go` before step 7 begins. A request that
arrives pre-specified still passes through both — read it back and confirm it rather than
assuming the sender did the compiler's job for you.

Steps 4 and 7 are separate turns of thought. If you catch yourself writing English prose while
"building the spec", stop — you have skipped the compiler and started copywriting.

## 3. Where truth lives

**The skill is how to reason. The project data is what is true.** Never bake product facts into
reference files.

| Need | File |
|---|---|
| Brand voice, tone, UI length limits | `content-system/brand/voice.yaml` |
| Company + product facts | `content-system/facts/company.yaml`, `content-system/facts/products.yaml` |
| Approved claims + confidence | `content-system/claims/approved.yaml` |
| Terminology per locale | `content-system/terminology/glossary.yaml` |
| Product UI string bundles | `content-system/i18n/` |

In **this repository** the project's own sources outrank everything above:

| Need | File |
|---|---|
| Every number and its status label | `docs/01-proof-bank.md` — **never quote a figure from memory** |
| Message and voice intent | `docs/02-message-map.md` |
| Block structure and why | `docs/03-structure.md` |
| Live site copy — the only shipped locale | `web/content/vi.ts` |
| Legal entity and contact | `web/content/site.ts` |
| Hard repo bans | `CLAUDE.md` §2 |

`content-system/claims/approved.yaml` is a machine-readable projection of the proof bank. When the
two disagree, **the proof bank wins** and the ledger is wrong — fix the ledger.

## 4. References — load on demand

Read the file when the task touches it. Do not preload everything.

**Core (both types)**
- `references/core/intake.md` — **the gates. Read this first, every time.**
- `references/core/spec-file.md` — the page-level spec file: contract + blocks + slots
- `references/core/apply.md` — moving a validated artifact into `web/content/<locale>.ts`
- `references/core/semantic-content.md` — the spec format, and what must be captured before wording
- `references/core/terminology.md` — glossary resolution, preserve-in-UI, product names
- `references/core/i18n.md` — independent locale generation, what to preserve, what not to
- `references/core/anti-ai-slop.md` — pattern detection, not a word blacklist
- `references/core/semantic-parity.md` — comparing meaning across locales
- `references/core/rules.md` — every deterministic rule id, its severity, when it fires

**Marketing**
- `content-contract.md` · `claim-ledger.md` · `buyer-value.md` · `message-architecture.md` ·
  `page-patterns.md` · `qa.md`

**Product UX**
- `product-contract.md` · `ux-writing.md` · `ui-components.md` · `system-states.md` · `errors.md` ·
  `empty-states.md` · `destructive-actions.md` · `qa.md`

**Locales** — always read the one you are writing
- `references/locales/vi.md` · `en.md` · `ko.md`

**Examples** — `examples/marketing/`, `examples/product/`. Each shows BAD → why it fails → GOOD →
why it works.

## 5. Output format

Emit one artifact matching `schemas/i18n-output.schema.json`:

```json
{
  "content_type": "marketing",
  "id": "home.hero",
  "locales": ["vi", "en", "ko"],
  "entries": [
    {
      "key": "home.hero.headline",
      "component": "headline",
      "claims": ["C001"],
      "locales": { "vi": "…", "en": "…", "ko": "…" }
    }
  ]
}
```

Every entry carries the same locale set. Marketing entries that state a fact carry `claims`.
Product entries carry `component` so the linter knows which rules apply.

Reviewer output is JSON, never an essay — see `references/marketing/qa.md` §Output.

## 6. Hard failures

Regardless of score, these fail the artifact:

```
invented factual claim        unsupported number         unsupported superlative
material meaning change       claim-strength drift       lost qualification
wrong system state            wrong action               wrong consequence
wrong CTA intent              missing placeholder        renamed placeholder
critical terminology error    major semantic mismatch    major mistranslation
```

Claim strength is an invariant. Never let `can → will`, `may → does`, `supports → guarantees`,
`designed for → proven for`, `can reduce → eliminates`. Not when shortening, not when "making it
punchier", not when the user asks for something more impressive. A brand configuration cannot
authorize hallucination.

## 7. Validate before claiming done

```bash
python3 .claude/skills/content-i18n/scripts/run_checks.py <artifact.json>
```

or the individual gates — `lint_marketing.py`, `lint_product.py`, `check_claims.py`,
`check_terms.py`, `check_placeholders.py`, `check_i18n.py`, `validate_schema.py`.
Python 3.9+, standard library only.

`scripts/content-check` at the repo root wraps `run_checks.py`.

Exit code `1` means at least one ERROR. Content with an open ERROR is not finished content.

A green run is not a finished page either. It proves structure — placeholders intact, claim ids
resolvable, terms matching the glossary. It says nothing about whether the sentence reads like a
person wrote it in that language, and nothing about whether a `screen` block now overflows. Both
are step 11, and both are human judgement.

## 8. Repair, do not regenerate

One failed key means one regenerated key. Re-evaluate the repaired keys, then run a global
consistency pass (terminology, parity, duplicates). Rewriting a passing artifact to fix one line
is how terminology and claim strength drift.

## 9. This repository

- **The site ships `vi` only.** The English build was removed on 2026-08-23; there is no
  `web/content/en.ts` and no language switcher. The `/vi` URL prefix is kept deliberately so that
  adding a language later does not move every URL. `en` and `ko` remain compilable from a spec, but
  each needs a **complete** `content/<locale>.ts` plus its routes — say so rather than shipping half
  a language.
- Most strings in `web/content/vi.ts` are still **i18n keys equal to their own path**
  (`products.hardware.items[0].name`). That is deliberate — `CLAUDE.md` §3b. Do not "fix" one with
  invented prose. A key becomes prose only by completing this workflow end to end, including step 11.
- `home` was compiled and applied on 2026-08-21. `products` and `contact` have specs and no prose.
- VI uses a decimal **comma** (17,6 TOPS/W).
- Keep proper nouns verbatim: Pebble Square Inc. · MOCHA · MINT · PAPAYA FLEX · ESPRESSO ·
  Pebble AI Studio · Analog-PIM · Digital-PIM, and the six business sectors.
- Blocks marked `screen` are one viewport tall. Adding prose to one overflows it — see
  `docs/03-structure.md` §3, and check it by eye after step 11.
- `CLAUDE.md` §2 lists four bans that outrank anything a requester asks for: never blur `shipped`
  with `roadmap`; never attribute arc-fault or solar PV to Pebble Square; never cite the phantom
  MDPI paper; never present ESPRESSO as available. Raise them at intake Gate D so they are decided
  in the open rather than enforced as a surprise at QA.
- A user-level `i18n-vi-first` skill exists. It does not apply here: this skill forbids
  locale-to-locale translation in either direction, and this repository has one locale to translate
  from anyway.
