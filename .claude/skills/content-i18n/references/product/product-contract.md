# Product UX contract

```yaml
component:
  type: button | label | nav | form_field | placeholder | helper_text | tooltip |
        empty_state | error | warning | success | notification | dialog |
        destructive_dialog | onboarding | setting | table_header | filter | system_state

context:
  screen:
  workflow:
  entity:

state:
  current:                    # the system's actual state, named
  cause_known: true | false
  cause:                      # only when cause_known

user:
  intent:                     # what they were trying to do
  expected_action:            # what they should do next

available_actions: []
primary_action:
secondary_actions: []

consequence:
  reversible: true | false
  description:

recovery:
  available: true | false
  action:

technical_detail:
  expose_to_user: false
  value:                      # for logs, never for the user unless expose is true

placeholders: []              # name + type; identical across locales

terminology: []               # glossary concepts appearing in this string

locale:
  requested: [vi, en, ko]
```

## Fields that decide the copy

- **`state.cause_known`** — the single most important field. `true` licenses a specific message;
  `false` forbids inventing one. Most bad error copy is a writer answering "why" when the system
  never told them.
- **`consequence.reversible`** — decides whether a confirmation dialog is needed at all, and how
  blunt it must be.
- **`recovery.available`** — if recovery exists, the copy must name it. A dead end with no next step
  is a support ticket the product wrote itself.
- **`technical_detail.expose_to_user`** — `true` only when the user can act on it, or must quote it
  to support. `Error 409` is never actionable. A support reference id can be.

## Rules

1. Product UI copy never persuades. No brand voice, no storytelling, no encouragement the state does
   not justify.
2. One string, one job. A button label is not a place for reassurance.
3. If the contract cannot be filled because the system's behaviour is unknown, the answer is to ask
   an engineer, not to write something that sounds safe.
