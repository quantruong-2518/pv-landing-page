# Marketing content contract

Fill this before writing anything. An unfillable field is a question for the requester, not a gap to
paper over with adjectives.

```yaml
page:
  type: homepage | landing_page | product_page | solution_page | use_case_page |
        campaign_page | company_page | technology_page
  goal:                       # the one thing this page must achieve
  funnel_stage: awareness | consideration | decision

audience:
  primary:                    # who reads it most
  buyer:                      # who signs
  evaluator:                  # who can veto — usually an engineer
  user:                       # who lives with it daily
  awareness_level: unaware | problem_aware | solution_aware | product_aware | most_aware
  primary_problem:

product:
  name:
  category:
  description:
  capabilities: []            # what it does, verifiable
  mechanisms: []              # how it does it
  deployment_models: []
  constraints: []             # what it does not do — write these down, they build trust

problems: []                  # buyer problems, in the buyer's words

buyer_values: []              # operational meaning, derived from mechanisms

proof:
  verified: []                # published, checkable
  contextual: []              # true under stated conditions
  unavailable: []             # what we wish we had — name it, never invent it

differentiators: []           # true only of us; if a competitor can claim it, it is not one

objections: []                # what makes them not buy

cta:
  primary:
  secondary:

tone:
  desired: []
  avoid: []

claims_policy:
  allow_inference: false
  require_proof_for_numbers: true
  require_proof_for_superlatives: true

locale:
  requested: [vi, en, ko]
```

## Fields that are usually filled wrong

- **`evaluator`** — on deep-tech pages the buyer signs but the engineer vetoes. Copy written only for
  the buyer dies in the technical review.
- **`constraints`** — an empty list means nobody asked. A page that names its own limits is read as
  honest everywhere else on the page.
- **`proof.unavailable`** — the field exists so missing proof gets logged instead of invented. In
  this repo, log it to `docs/05-backlog.md`.
- **`differentiators`** — "quality", "support", "innovation" are not differentiators. If the sentence
  survives having a competitor's name pasted in, delete it.
- **`awareness_level`** — decides whether the page opens with the problem or the product. A
  `product_aware` reader does not need the problem explained again.

## This repository

`page.type` for the three live pages: `homepage` (`/`), `product_page` (`/products`),
`company_page`-flavoured contact (`/contact`).

`audience` is set in `docs/00-brief.md`; `proof.verified` must come line-by-line from
`docs/01-proof-bank.md` §A–§F with the status label attached. Anything at `internal` in the proof
bank belongs in `proof.unavailable`, not in `proof.contextual`.
