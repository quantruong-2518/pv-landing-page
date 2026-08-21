# Product UX eval cases

Judge state clarity and action clarity. Never judge persuasion.

| Case | State | Expect |
|---|---|---|
| Empty state, first use | no leads ever created | names the state, names what fills it, offers the action |
| Empty state, filtered | 4,182 leads hidden by a filter | says the filter is hiding them, gives the count, offers clear-filters |
| Known error | lead already assigned | names the cause and the next action; no apology, no error code |
| Unknown error | request failed, cause unavailable | states failure, does not invent a cause, says what survived |
| Success | campaign deleted | names the entity, offers undo if it exists |
| Delete confirmation | irreversible, cascades to scheduled posts | scope, reversibility, button repeats the verb |
| Form validation | phone number wrong shape | states the rule, not the violation; inline, not a toast |
| Disabled state | user lacks permission | explains the precondition, names who grants it |
| Permission empty | data exists, access does not | distinguishes from "no data"; routes to the owner |
| No search results | query matched nothing | echoes the query, offers a way to widen |
| Filter returns zero | filters too narrow | distinguishes from first-use empty |
| Bulk action | 42 leads selected, action irreversible | states the count and the consequence before confirming |
| Notification | someone reassigned a lead | who, what, which entity, when; action if any |

Failure signals to watch for: one message reused across two different states; a cause invented when
`cause_known` is false; a button that says `OK`; a Korean string with English clause order; a
Vietnamese string built from `Bạn hãy…`.
