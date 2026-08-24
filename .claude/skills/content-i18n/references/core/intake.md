# Intake — interview the requester before compiling anything

The compiler needs two different kinds of input and they come from two different places.

```
FACTS      →  the repository answers.  Never ask.  Look it up.
DECISIONS  →  only the requester answers.  Never guess.  Ask.
```

A model that guesses a decision produces copy that passes every deterministic gate and is still
wrong, because the gates check structure and the decision was about meaning. That failure is
invisible until a buyer reads the page. Intake exists to make it visible before a single sentence
is written.

## The split rule

Before asking anything, decide which side of the line the question falls on.

| Never ask — look it up | Always ask — nobody else knows |
|---|---|
| any number, and its status label — `docs/01-proof-bank.md` | which of those numbers belong on THIS page |
| whether a claim is approved — `claims/approved.yaml` | whether a claim the ledger lacks is worth stopping for |
| the legal entity, address, tax code — `web/content/site.ts` | who the page is being written at, this time |
| tone limits and UI ceilings — `brand/voice.yaml` | what the page must make the reader DO |
| which blocks exist and their order — `docs/03-structure.md` | whether the order is still what they want |
| the glossary — `terminology/glossary.yaml` | a term the glossary does not cover yet |
| the four repository bans — `CLAUDE.md` §2 | a framing THEY consider off-limits beyond those |

Asking a question the repository already answers is not thoroughness. It teaches the requester that
the interview is theatre and they start answering carelessly — which is how a wrong number gets in.

## How to ask

- **Batch by gate.** One message per gate carrying that gate's whole question set. Never
  one question per message; never all six gates at once.
- **Propose, then confirm.** Where the repository supports a default, state it and ask for a yes or
  a correction: *"`docs/03-structure.md` puts the catalogue index first and marks it `screen` — keep
  that?"* is a better question than *"how should the page be structured?"*
- **Name the consequence.** Say what the answer changes. *"If this is a packaged product, modules
  may be described in feature tense; if it is a service, they may not."*
- **Take silence as unanswered, not as yes.** An unanswered gate blocks the pipeline.
- Write the answers down as you go. They become `contract:` and `decisions:` in the spec file.

## The gates

Gates A–E gather. Gate F confirms. Steps 6–11 of the workflow do not begin until the
confirmation returns a go.

### Gate A — Scope

- Which page, and which blocks or keys within it? A whole page, or a repair?
- New copy, or a rewrite of keys that already carry prose?
- Which locales are requested now, and which are deferred?
- Is there a version they already rejected, and what was wrong with it?

**Blocking:** a repair with no key list. Repair means regenerating named keys, never a page
(workflow §8). "Fix the products page" is not a scope.

### Gate B — Job and reader

- Route: is this page's job to persuade, or to help someone finish a task? Do not ask when the
  artefact answers it — a delete dialog is `product_ui` on any product.
- What is the ONE action this page must produce?
- Who arrives, from where, already knowing what?
- What single problem are they carrying when they land?
- What makes them close the tab? Name the block where it happens.
- Are there several audiences that leave for different reasons? List them separately or say there
  is one.

**Blocking:** no named action, or an audience described only as "customers".

### Gate C — Offer and proof

- What is actually being offered on this page — and what is deliberately NOT on it?
- Walk the claim ids: which are in play, which are contextual, which are being held back?
- What do they know is unavailable, and where is it logged?
- Is there anything they WANT said that the ledger does not carry?

**Blocking:** a wanted claim with no ledger entry. Do not soften it into vague copy and do not write
around it. Stop and route: change `docs/01-proof-bank.md` first with a source, mirror into
`claims/approved.yaml`, then resume. That is `content-system/README.md` §Changing an approved claim,
and it is not negotiable.

### Gate D — Boundaries and open decisions

- Beyond the four repository bans, what must this page never imply?
- Status label per entity named on the page — `shipped`, `roadmap` or `internal`. Every one.
- **The open questions.** Surface every ambiguity you hit while reading the sources and make them
  choose. Record the answer, what it does not license, and what stays open.

The shape to record, from `specs/products.yaml`:

```yaml
decisions:
  enterprise_software:
    question: packaged product or project service — docs/05-backlog.md #17
    answered: packaged product
    but: no customer is running it yet
    consequence: >-
      Modules may be described by what the product DOES. Nothing may imply a
      deployment, a customer, a count or a track record.
    still_open: [platform base, which model powers best-next-action, where its data sits]
```

**Blocking:** an ambiguity you noticed and did not raise. Deciding it yourself is the failure this
whole file exists to prevent.

### Gate E — Shape and voice

- Which blocks, in what order? Which are one viewport tall (`height: screen`)?
- Which slots does each block carry, and does any of them have a length ceiling?
- What already ships that must not move?
- Tone: what is wanted, what is to be avoided?
- Anything to keep verbatim beyond the proper nouns `CLAUDE.md` §4 already protects?

**Blocking:** a `screen` block whose slot list is longer than a viewport can hold. Raise it here.
Discovering it after the copy is written means throwing the copy away — see `docs/03-structure.md`
§3.

### Gate F — Confirm the compiled spec

Write `content-system/specs/<id>.yaml` first, then play back ONE screen:

```
ROUTE        marketing
ACTION       book a 30-minute consultation
READER       <one line>  ·  leaves at: <block>
CLAIMS       in play: C002 C003 …   held back: C017   wanted-but-absent: none
FORBIDDEN    <the list, including the repository bans that bite on this page>
BLOCKS       id · height · slots           (one line each)
DECISIONS    <question → answer → what it does not license>
UNAVAILABLE  <fact → where it is logged>
LOCALES      writing: vi    deferred: en, ko
```

Then ask for exactly one of: **go** · **change X** · **stop**.

No prose is written before a go. If the answer is *change*, edit the spec and play it back again —
do not carry an unconfirmed change into the writing step.

## When you cannot ask

If the run has no channel to the requester — a background job, a subagent without a question tool —
do not proceed on assumptions. Return the gates you could not close, in the playback format above,
with each unanswered item marked `UNANSWERED`, and stop. A returned interview is a completed unit of
work. A page compiled on guesses is not.
