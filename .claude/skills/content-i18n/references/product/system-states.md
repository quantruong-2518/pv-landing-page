# System states

Every screen is in a state. Copy that does not name the state forces the user to guess.

| State | The user must learn | Copy carries |
|---|---|---|
| `loading` | it is working, roughly how long | what is loading, not "Please wait" |
| `loading_slow` | it is still working, not stuck | elapsed context or a cancel |
| `empty_first_use` | nothing exists yet, and what would fill it | the trigger that creates the first item |
| `empty_filtered` | the data exists, the filter hid it | which filter, and how to clear it |
| `empty_no_results` | the query matched nothing | the query, and a way to widen it |
| `empty_permission` | the data exists, access does not | who to ask |
| `partial` | some of it loaded | what is missing and whether it will retry |
| `error_known` | what happened and why | cause + next action |
| `error_unknown` | it failed, cause unavailable | what to try, and what to keep (draft, id) |
| `offline` | the boundary of what still works | what is queued vs lost |
| `disabled` | why this control cannot be used now | the precondition, not just greyed pixels |
| `readonly` | editing is not available here | why (permission, lifecycle stage) |
| `processing_async` | it will finish without them | where the result appears |
| `success` | what changed | the specific entity, and the next step if any |
| `stale` | what they see is out of date | when it was fetched, how to refresh |

## Rules

1. **Distinguish empty from failed.** "No leads" when the request errored is a lie that costs hours.
2. **Distinguish empty from filtered.** The most common empty-state bug: a user with 4,000 leads and
   a filter sees "No leads yet" and concludes their data is gone.
3. **A disabled control must explain itself.** Put the precondition in a tooltip or helper text.
   Silent disabling reads as a broken product.
4. **Async means saying where the result lands.** "Import started" is half a message; "Import started
   — results appear in Leads when it finishes" is the whole one.
5. **Never invent a cause.** `cause_known: false` licenses "Could not load leads. Try again." and
   nothing more specific.
