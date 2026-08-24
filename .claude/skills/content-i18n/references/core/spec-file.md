# The spec file — one page of meaning, no language in it

`schemas/semantic-content.schema.json` describes the semantics of **one block**. A web page is many
blocks plus the contract they all serve, so the unit that actually gets written is a page-level file:

```
content-system/specs/<page-id>.yaml
```

One file per route. `home.yaml` · `products.yaml` · `contact.yaml` are the worked examples; read the
closest one before writing a new one.

**This file is the only input a locale writer may read.** That is its entire purpose: `en` and `ko`
must later be writable natively from the same meaning instead of being translated out of `vi`, which
this skill forbids in both directions. If a writer has to open `docs/` or the live `.ts` to
understand what a slot means, the spec is incomplete — fix the spec, not the writer.

## The reading rule, inherited by every spec

Put it in the header comment of every new file, verbatim:

> `docs/` and `context/` are written **about** the page. They are not the page. Read them for FACTS,
> never for editorial framing. `context/` carries English sentence shape — MATERIAL, not copy.

And the rule that keeps blocks from bloating:

> A `body` earns its place only by adding a FACT its `title` does not carry. No such fact → leave it
> empty. Components skip empty strings by design.

## Header

Every spec opens with a comment declaring when it was compiled and from which sources. The claim ids
inside it resolve against `content-system/claims/approved.yaml`. Nothing else is allowed to be a
source — not memory, not a previous draft, not another locale.

```yaml
# Semantic spec — PRODUCTS (/vi/products). Language-free by design.
#
# Compiled 2026-08-23. Sources: docs/01-proof-bank.md §D §E, docs/02-message-map.md,
# docs/03-structure.md §1, context/02-products/**, content-system/claims/approved.yaml.
```

## Top level

| Key | Required | Holds |
|---|---|---|
| `id` | yes | page id, matching the file name |
| `type` | yes | `marketing` or `product_ui` — the page default; a block may override it |
| `contract` | yes | the type's contract, filled from intake — field names come from `references/marketing/content-contract.md` or `references/product/product-contract.md`, unchanged |
| `decisions` | when any were taken | questions the requester **answered** at intake Gate D |
| `open_decisions` | when any remain | questions still unanswered, and what they would change |
| `blocks` | yes | the ordered list — one semantic spec per block |
| `chrome` | when the page has any | page furniture that belongs to no block: `meta`, shared nav labels |

`contract.proof` carries three lists and all three matter: `verified` (usable now), `contextual`
(usable with its qualification attached), `unavailable` (known missing, each pointing at where it is
logged). The third list is what stops a writer from inventing the fact later.

`contract.locale` records `requested`, `deferred`, and the note that a deferred locale must be
compiled from THIS file rather than from a written locale.

### Recording a decision

```yaml
decisions:
  <slug>:
    question: <what was ambiguous, and where it is logged>
    answered: <the choice>
    but: <the thing the choice does NOT license>
    consequence: <what writers may now do, stated as a rule>
    still_open: [<what remains undecided>]
```

`but` and `consequence` are not decoration. "Packaged product" alone reads as permission to imply
customers; `but: no customer is running it yet` is the half that keeps the copy honest.

## A block

```yaml
  - id: products.hardware.papaya      # must resolve to a real path in web/content/types.ts
    type: product_ui                  # optional — overrides the page default for this block
    origin: ps | pv                   # whose work it is — CLAUDE.md §2 rule 2 depends on this
    status: shipped | roadmap | internal   # the label the <Fact> component will carry
    height: screen | content          # screen = one viewport tall — CLAUDE.md §4b
    intent:
      communicate: <what the reader must leave with>
      reader_question: <the question in their head — marketing>
      task: <what they are trying to finish — product_ui>
    claims: [C005, C006, C007]        # ids only, ^C[0-9]{3}$, all must exist in the ledger
    mechanisms: [<how it works, physically or procedurally>]
    values: [<what the reader gets — never a feature restated>]
    qualifiers: [<the conditions that must survive into every locale>]
    forbidden: [<phrasings that fail this block specifically>]
    slots:
      <field>: <what this field must MEAN — never a draft of what it should say>
```

`origin`, `status` and `height` are page-level extensions to the block schema. They exist because
this repository's three hard constraints are all per-block: who did the work, whether it ships, and
whether the block has a viewport to spend.

### Slots are the contract with the code

A slot key must resolve to a real field in `web/content/types.ts`, because the apply step
(`references/core/apply.md`) matches on that path. A slot describes **meaning and the facts it must
carry** — never a sentence:

```yaml
    slots:
      body: what it is for, then the limit of the comparison stated by us before the reader finds it
      specs:
        - value: energy efficiency, the backbone number
          must_carry: [architecture, throughput, die size, measured on real silicon, mass production date]
```

`must_carry` is how a spec makes a number safe: the figure is meaningless without what it was
measured against, so the requirement travels with the slot into every locale.

If you catch yourself writing a slot that reads like finished copy, stop — you have skipped the
compiler and started copywriting. That is workflow §2, and it is the failure mode this format
exists to prevent.

### Block-local fields, used where they earn it

`emphasis` (which entries get a body and which stay bare, plus why) · `conflict` (two sources
disagree, and which wins) · `status_note` (the sentence the badge cannot carry alone) ·
`image_pending` (a slot whose artwork does not exist yet) · `warning_for_remaining_blocks` (a
constraint discovered in one block that binds the rest) · `owner` (who must answer an
`open_decision`) · `inherited_from` (this constraint was decided in another spec).

## What no script checks

Nothing validates this file. `run_checks.py` reads the output artifact only — a spec with a
non-existent claim id, a wrong `status`, or a slot that matches no field in `types.ts` still lets the
artifact pass green.

The spec is therefore checked by exactly one thing: the requester reading it back at intake Gate F.
Do not skip that gate on the grounds that the gates so far went smoothly.
