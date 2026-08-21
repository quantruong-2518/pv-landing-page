# content-i18n — multilingual content system

Marketing copy and product UX copy in **vi · en · ko**, produced by a compiler rather than by a
copywriter or a translation engine.

```
RAW INPUT
    ↓
CONTENT TYPE ROUTER ───────────────┐
    ↓                              ↓
MARKETING                      PRODUCT UX
  content contract               product contract
  claim ledger                   context · state · intent
  buyer problem → mechanism      available action
  → buyer value → proof          consequence · recoverability
    └──────────────┬─────────────┘
                   ↓
          SEMANTIC CONTENT SPEC        ← language-free meaning
                   ↓
          TERMINOLOGY / GLOSSARY
                   ↓
         ┌─────────┼─────────┐
         ↓         ↓         ↓
        VI        EN        KO         ← three native writers, one spec, zero translation
         └─────────┼─────────┘
                   ↓
               QA ROUTER
         marketing QA │ product UX QA
                   ↓
            semantic parity QA
                   ↓
          deterministic checks         ← scripts/, exit 1 on any ERROR
                   ↓
            targeted repair            ← failed keys only
                   ↓
              FINAL OUTPUT
```

The forbidden shortcut is `vi → translate en → translate ko`. Each locale is written from the
semantic spec by a writer thinking in that language; consistency is enforced afterwards on meaning,
not on sentence shape.

## Routing

| The content's job | Type | Rubric |
|---|---|---|
| persuade, position, explain commercial value | `marketing` | `references/marketing/qa.md`, pass ≥ 82 |
| help a user read state and finish a task | `product_ui` | `references/product/qa.md`, pass ≥ 85 |

Both share the semantic core, terminology, locale rules, i18n rules, parity and lint. Neither is
graded on the other's rubric — product UI is never scored on persuasion.

## Where the facts live

**The skill is how to reason. `content-system/` is what is true.**

```
content-system/
├── brand/voice.yaml            tone, locale roster, UI length limits
├── facts/company.yaml          legal entity, parent, leadership, milestones
├── facts/products.yaml         chips, software, benchmarks, status labels
├── claims/approved.yaml        the claim ledger — confidence + usability + source
├── terminology/glossary.yaml   preferred and forbidden terms per locale
└── i18n/{en,vi,ko}.json        product UI string bundles
```

In this repository `docs/01-proof-bank.md` outranks all of it. `facts/` and `claims/` are
machine-readable projections of the proof bank; when they disagree, the projection is stale.

> Named `content-system/` rather than the generic `content/` because `web/content/*.ts` (live site
> copy) and `context/` (drafts) already exist — a third `content/` would be ambiguous.

## Invoking it

Type `/content-i18n` or just describe the work — the skill triggers on marketing copy, UX writing,
localization, terminology and content review requests, in English or Vietnamese.

```
/content-i18n

Create a homepage hero for an enterprise AI platform.
Audience: COO
Facts:
- supports on-premise deployment
- connects internal company data
- can integrate with existing workflows
Locales: vi, en, ko
```

```
/content-i18n

Create an empty state for the Lead page.
State: campaign exists but no leads have arrived.
Actions: create campaign, import leads
Locales: vi, en, ko
```

Output is one JSON artifact matching `schemas/i18n-output.schema.json`.

## Validation

Python 3.9+, standard library only. No third-party dependencies — the bundled `scripts/_yaml.py`
reads the YAML subset the data files use.

```bash
S=.claude/skills/content-i18n/scripts

python3 $S/run_checks.py          output/content.json     # everything that applies
python3 $S/lint_marketing.py      output/content.json
python3 $S/lint_product.py        output/content.json
python3 $S/check_claims.py        --content output/content.json \
                                  --claims content-system/claims/approved.yaml
python3 $S/check_terms.py         --content output/content.json \
                                  --glossary content-system/terminology/glossary.yaml
python3 $S/check_placeholders.py  output/content.json
python3 $S/check_i18n.py          content-system/i18n/
python3 $S/validate_schema.py     output/content.json
python3 -m unittest discover tests
```

`scripts/content-check` at the repo root wraps `run_checks.py`. Add `--json` to any check for
machine-readable output. **Exit code 1 means at least one ERROR** — content with an open ERROR is
not finished content.

### Severity

| | Means | Examples |
|---|---|---|
| `ERROR` | fails the artifact | unsupported number, missing placeholder, forbidden claim, vague destructive button |
| `WARNING` | judgement required | possible cliché, long sentence, UI length risk, terminology asymmetry |
| `INFO` | counts and observations | key coverage, glossary size |

Rule ids are stable so findings can be tracked and suppressed deliberately rather than by accident.
The full catalogue — every id, its severity, and what makes it fire — is
`references/core/rules.md`, and a test fails if the code emits an id the catalogue does not list.

## Daily tasks

**Add a locale** — add it to `brand/voice.yaml` → `locales.supported`; write
`references/locales/<code>.md` with real native rules (not a translated `en.md`); add the locale to
every glossary term; add UI length limits; regenerate from the semantic specs, never from another
locale; run `check_i18n.py`.

**Update an approved claim** — edit `docs/01-proof-bank.md` first, with the source. Mirror it into
`claims/approved.yaml` keeping the id stable. Re-run `check_claims.py` on every artifact citing it.
If the status label moved between `shipped` and `roadmap`, re-check every page that mentions it.

**Add a term** — one entry in `glossary.yaml` covering all supported locales. Set `scope` when the
term only governs one content type (`lead` is an app entity, not a landing-page word). Set
`preserve_in_ui: true` when it must not be translated inside the product.

**Add an eval** — drop a fixture in `evals/<area>/fixtures/`, add its expected rules to
`evals/expectations.json`, run the tests. `tests/test_evals.py` fails if a fixture has no
expectation, so coverage cannot silently rot.

**Run regression** — `python3 -m unittest discover tests`. Goldens in `evals/regression/` must stay
at zero errors *and* zero warnings. A golden going red means the rule got noisier or the golden was
never as clean as it looked. Decide which before editing either.

## Layout

```
.claude/skills/content-i18n/
├── SKILL.md                    trigger, routing, mandatory workflow
├── references/
│   ├── core/                   semantic spec · terminology · i18n · anti-slop · parity · rules
│   ├── marketing/              contract · claim ledger · buyer value · message architecture
│   │                           · page patterns · QA
│   ├── product/                contract · UX writing · components · system states · errors
│   │                           · empty states · destructive actions · QA
│   └── locales/                vi · en · ko
├── schemas/                    7 JSON schemas
├── scripts/                    8 checks + a YAML reader + shared plumbing
├── evals/                      fixtures, expectations, judged cases, goldens
└── examples/                   BAD → why → GOOD → why, marketing and product
```
