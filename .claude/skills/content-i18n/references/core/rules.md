# Rule catalogue

Every deterministic finding the scripts can emit. Ids are stable — track them, suppress them
deliberately, never by accident. `tests/test_rules_documented.py` fails if the code emits an id that
is not on this page.

**ERROR** fails the artifact. **WARNING** needs a human judgement. **INFO** is a count or an
observation and never fails anything.

## Claims — `check_claims.py`

| Rule | Severity | Fires when |
|---|---|---|
| `CLAIM_UNSUPPORTED_NUMBER` | ERROR | a figure has no entry in the claim ledger |
| `CLAIM_UNSUPPORTED_SUPERLATIVE` | ERROR | a superlative no ledger entry could support (`lint_marketing.py`) |
| `CLAIM_FORBIDDEN` | ERROR | a `forbidden` statement's detection pattern matches |
| `CLAIM_UNKNOWN_ID` | ERROR | an entry cites a claim id the ledger does not have |
| `CLAIM_UNSUPPORTED_USED` | ERROR | an entry cites a claim marked `usable: false` |
| `CLAIM_ROADMAP_UNLABELLED` | ERROR | a roadmap claim is used without the entry's `label` |
| `CLAIM_MISSING_REQUIRED_CONTEXT` | ERROR | a comparison omits its counterparty or benchmark |
| `CLAIM_STRENGTH_DRIFT` | ERROR | absolute wording on a claim the ledger marks conditional |
| `CLAIM_STRENGTH_DRIFT` | WARNING | absolute wording with no stated condition and no cited claim |

## Anti-slop — `lint_marketing.py`

| Rule | Severity | Fires when |
|---|---|---|
| `AI_SLOP_EMPTY_BENEFIT` | ERROR | an abstract benefit with no mechanism in the same string |
| `AI_SLOP_EMPTY_BENEFIT` | WARNING | the same, but a mechanism is present nearby |
| `AI_SLOP_GENERIC_OPENING` | WARNING | the string opens with a scene-setter |
| `AI_SLOP_EMPTY_CONTRAST` | WARNING | `not just X but Y` and its locale equivalents |
| `AI_SLOP_FORMULAIC_TRIPLE` | WARNING | three short fragments used as an argument |
| `AI_SLOP_ADJECTIVE_STACK` | WARNING | three or more evaluative adjectives in one run |
| `AI_SLOP_ARTIFICIAL_CONCLUSION` | WARNING | a closing line carrying mood instead of a fact or action |
| `AI_SLOP_RHETORICAL_QUESTION` | WARNING | body copy framed as a question the reader did not ask |
| `AI_SLOP_OVER_SYMMETRY` | WARNING | three or more sibling strings with identical word counts |

## Locale — `lint_marketing.py`, `lint_product.py`

| Rule | Severity | Fires when |
|---|---|---|
| `LOCALE_BUREAUCRATIC_REGISTER` | WARNING | administrative register in marketing copy |
| `LOCALE_KO_SENTENCE_LABEL` | WARNING | a Korean label written as a sentence rather than a noun |
| `LOCALE_VI_PRONOUN_PADDING` | WARNING | a Vietnamese label padded with `Bạn hãy` / `Vui lòng` |

## Product UX — `lint_product.py`

| Rule | Severity | Fires when |
|---|---|---|
| `PRODUCT_VAGUE_ACTION` | ERROR | a button label that does not name its action |
| `PRODUCT_DESTRUCTIVE_ACTION_MISMATCH` | ERROR | the confirm button does not repeat the destructive verb |
| `PRODUCT_TECHNICAL_LEAKAGE` | ERROR | a status code, exception or internal name shown to the user |
| `PRODUCT_GENERIC_FAILURE` | WARNING | "something went wrong" — legitimate only when the cause is unknown |
| `PRODUCT_MARKETING_VOICE` | WARNING | persuasion language in an operational surface |
| `PRODUCT_MISSING_ACTION` | WARNING | an empty state with nothing the user can do |

## i18n — `check_i18n.py`, `check_placeholders.py`

| Rule | Severity | Fires when |
|---|---|---|
| `I18N_MISSING_KEY` | ERROR | a declared locale has no string for a key |
| `I18N_KEY_MISMATCH` | ERROR | a key or locale exists outside the canonical set |
| `I18N_DUPLICATE_KEY` | ERROR | the same key is declared twice |
| `I18N_EMPTY_VALUE` | ERROR | an empty string in a shipped locale |
| `I18N_NO_BUNDLES` | ERROR | bundle mode found no `*.json` locale files |
| `I18N_PLACEHOLDER_MISSING` | ERROR | a variable present in one locale is absent from another |
| `I18N_PLACEHOLDER_CHANGED` | ERROR | a variable exists in exactly one locale — renamed or invented |
| `I18N_PLACEHOLDER_TRANSLATED` | ERROR | a variable name contains non-ASCII characters |
| `I18N_PLACEHOLDER_UNBALANCED` | ERROR | unbalanced braces — the string will not render |
| `I18N_PLACEHOLDER_LEAKAGE` | ERROR | `{{`, `%s`, `TODO`, lorem ipsum left in the copy |
| `I18N_PLURAL_MISSING_OTHER` | ERROR | an ICU plural block with no `other` branch |
| `I18N_PLURAL_INVALID_CATEGORY` | ERROR | English plural categories templated onto vi or ko |

## Terminology — `check_terms.py`

| Rule | Severity | Fires when |
|---|---|---|
| `TERM_FORBIDDEN_VARIANT` | ERROR | a forbidden variant appears in that locale, within scope |
| `TERM_PROPER_NOUN_CASING` | WARNING | a protected proper noun appears with different casing |
| `TERM_PREFERRED_MISSING` | INFO | a preserved term is named in every locale but one |

## Style and structure

| Rule | Severity | Fires when |
|---|---|---|
| `STYLE_DUPLICATE_TEXT` | ERROR | identical marketing copy under two keys |
| `STYLE_DUPLICATE_TEXT` | WARNING | two product controls sharing one label |
| `STYLE_EMPTY_STRING` | ERROR | a whitespace-only string |
| `STYLE_HEADLINE_TOO_LONG` | WARNING | over the locale's headline word limit |
| `STYLE_SENTENCE_TOO_LONG` | WARNING | over the body sentence word limit |
| `STYLE_LABEL_TOO_LONG` | WARNING | over the component's character limit for that locale |
| `STYLE_PUNCTUATION_TIC` | WARNING | repeated exclamation marks or em dashes |
| `STYLE_TERMINAL_PERIOD` | WARNING | a period on a button, label or table header |
| `SCHEMA_INVALID` | ERROR | the artifact does not match its JSON schema |

## Informational

`INFO_COVERAGE` · `INFO_BUNDLES` · `INFO_GLOSSARY` · `INFO_LEDGER` · `INFO_PLACEHOLDERS` ·
`SCHEMA_CHECKED` · `LINT_SKIPPED`

## Reviewer-only

These come from the model, not the scripts — see `references/*/qa.md` and
`references/core/semantic-parity.md`:

`PARITY_MISSING_MEANING` · `PARITY_ADDED_MEANING` · `PARITY_LOST_QUALIFIER` ·
`PARITY_STATE_MISMATCH` · `PARITY_ACTION_MISMATCH` · `PARITY_CTA_MISMATCH` ·
`LOCALE_TRANSLATIONESE` · `LOW_VALUE_DENSITY`
