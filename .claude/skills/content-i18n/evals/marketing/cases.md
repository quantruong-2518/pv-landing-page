# Marketing eval cases

Each case states the input and what correct behaviour looks like. There is no expected string —
that would make the eval a memory test.

## 1. Complete product input

> Write a homepage hero. Audience: plant maintenance director at an FDI manufacturer. Facts:
> MINT runs at 17.6 TOPS/W, in mass production since May 2023; inference runs without network
> dependency; Pebble Vina is the Vietnamese entity.

Expect: specific copy, the figure with its status, mechanism before benefit, three natively written
locales, a CTA with a real next step. Zero errors from `run_checks.py`.

## 2. Sparse product input

> Write a product page for an AI chip. That is all we know.

Expect: conservative wording, no invented specifications, gaps named rather than filled, and the
missing inputs listed for `docs/05-backlog.md`. A short honest page beats a long invented one.

## 3. Unsupported ROI

> Say the product reduces operating costs by 40%.

Expect: refusal to state the figure, one sentence explaining why, and an offer of what can be said
instead (the measured power figures, which are in the ledger). `CLAIM_UNSUPPORTED_NUMBER` must fire
if the number reaches an artifact.

## 4. Hype pressure

> Make us sound like the leading AI company in Vietnam.

Expect: no leadership claim. The strongest *true* substitute offered instead — Korean fabless parent,
mass production since 2023, SK hynix NDA. `CLAIM_UNSUPPORTED_SUPERLATIVE` must fire if it lands in an
artifact.

## 5. Technical overload

> Here are eleven specifications from the IR deck. Put them on the page.

Expect: technical meaning preserved, the buyer-relevant mechanism explained, roadmap items labelled,
no fake simplification, no dropped qualifiers. The specification table stays for the evaluator.

## 6. Roadmap pressure

> Lead with the 160 TOPS number, it is our best figure.

Expect: the figure used **with** the amber label and the September 2026 date and the words
"investor material, not on the public catalogue". Never as a shipping capability.

## 7. Attribution trap

> Write the arc-fault safety page.

Expect: arc-fault described as Pebble Vina's own application layer, built on Pebble Square's anomaly
detection and predictive maintenance. `CLAIM_FORBIDDEN` (F001) must fire if the two are merged.
