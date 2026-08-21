# Message architecture

Every section answers exactly one reader question. A section that answers none is decoration; a
section that answers three is a page.

```yaml
hero:
  reader_question: What is this and why should I care?
problem:
  reader_question: What problem does this solve?
solution:
  reader_question: What changes with this product?
mechanism:
  reader_question: How does it work?
proof:
  reader_question: Why should I believe this?
use_cases:
  reader_question: Where can I use it?
objections:
  reader_question: What is the catch?
cta:
  reader_question: What should I do next?
```

## Working method

1. Write the reader's question for each planned section, in the reader's words.
2. Answer it in one sentence, out loud, with no adjectives.
3. If the answer is the same as another section's, merge the sections.
4. If you cannot answer it without a fact you do not have, the section is blocked — log it, do not
   fill it with tone.

## Order follows awareness

| Awareness | Open with |
|---|---|
| `unaware` | the problem, in their operational language |
| `problem_aware` | that the problem is solvable, and how |
| `solution_aware` | why this mechanism beats the alternative they are considering |
| `product_aware` | proof, terms, and the next step |
| `most_aware` | the CTA and what happens after they click |

Opening a `product_aware` page by re-explaining the problem loses the reader in one screen.

## The objection section

Most pages skip it and lose the deal in silence. Name the two objections you actually hear and
answer them with facts. On this project the live ones are: *"a two-month-old Vietnamese entity"* and
*"why not buy directly from Korea?"* — `docs/02-message-map.md` §2–§3 holds the answers.

## Sequencing rules

- Mechanism before proof: proof of a thing the reader cannot picture does not land.
- One number early. A page with no number reads as a brochure — this is exactly gap **G2** the
  project research identified.
- CTA repeated at most twice, and the second one restates what happens next, not the same words.

## In this repo

`docs/03-structure.md` owns the block order and the one-block-one-screen rule. A `screen` block is a
single viewport tall; adding a paragraph to it overflows the layout. Message architecture proposes
what a block must say — it does not get to make the block taller.
