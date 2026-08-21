# Semantic content spec

The language-free representation of what must be communicated. Written **before** any locale copy,
and the only input the locale writers are allowed to read.

Why it exists: if VI is written first and EN is derived from it, EN inherits Vietnamese sentence
shape, Vietnamese emphasis order, and any wording accident VI made. The spec breaks that chain.
Three writers, one meaning, three native shapes.

Schema: `schemas/semantic-content.schema.json`.

## Marketing spec

```yaml
id: home.hero
type: marketing

intent:
  communicate: AI inference that runs inside the customer's own infrastructure
  reader_question: What is this and why should I care?

claims:                       # ids from the claim ledger, never free prose
  - C001
  - C002

mechanisms:                   # how it works — concrete, checkable
  - inference executes on customer-controlled hardware
  - no request leaves the customer network

values:                       # operational meaning for this buyer
  - internal documents can be used with AI without leaving the organization

qualifiers:                   # conditions that must survive into every locale
  - applies to the on-premise deployment model

forbidden:                    # things this block must not imply
  - complete security guarantee

cta:
  intent: discuss_use_case
```

## Product UX spec

```yaml
id: lead.assignment.error
type: product_ui

component: error

context:
  screen: Lead detail
  entity: lead

state:
  current: lead_already_assigned
  cause_known: true
  cause: another user owns this lead

user:
  intent: assign_lead
  expected_action: check_current_owner

available_actions:
  - view_owner
  - cancel

primary_action: view_owner

consequence:
  reversible: true
  description: nothing changes until the owner is reassigned

recovery:
  available: true
  action: reassign from the owner field

technical_detail:
  expose_to_user: false
  value: HTTP 409

placeholders:
  - name: owner
    type: string

terminology:
  - lead
  - owner
```

## Rules

1. **No adjectives in the spec.** `mechanisms` holds verbs and nouns. If you cannot state the
   mechanism, you do not yet know what you are selling — go back to the contract.
2. **Claims are ids, not sentences.** Prose in the `claims` field is how unsupported statements
   sneak past `check_claims.py`.
3. **Qualifiers are mandatory to carry.** A qualifier dropped in one locale is a hard failure, not
   a style difference.
4. **Placeholders are declared in the spec**, so all three writers receive the same variable set.
5. **One spec, one block.** A spec covering a whole page produces mush; a spec per section produces
   copy that answers one question.
6. `technical_detail.expose_to_user: false` means the value exists for logs, not for the user. A
   locale writer must never surface it "for clarity".

## Handoff to the writers

Each locale writer receives, and only receives:

```
semantic spec + locale rules + terminology + brand rules (+ claim ledger for marketing)
```

They do **not** receive another locale's output. If you are tempted to show the EN draft to the
KO writer "for consistency", that is the translation pipeline reappearing under a new name.
Consistency is enforced afterwards by `references/core/semantic-parity.md`, on meaning — not by
copying sentence shape.
