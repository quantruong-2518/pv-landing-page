# System states

## Async work

**BAD**
> Processing your request…

Fails: describes the system's day. The user does not know if they can leave.

**GOOD**
> Import started — results appear in Leads when it finishes. You can leave this page.

Works: names the work, names where the result lands, and releases the user.

## Disabled controls

**BAD** — a greyed `Assign` button with no explanation. Reads as a broken product.

**GOOD** — greyed `Assign`, with helper text or a tooltip: *Only the campaign owner can assign
leads.*

## Partial load

**BAD**
> Leads loaded.

when only 200 of 4,182 arrived.

**GOOD**
> Showing 200 of 4,182 leads. [Load more]

## Offline

**BAD**
> You are offline.

**GOOD**
> You are offline. Edits are saved on this device and sync when the connection returns.

Works: draws the line between what still works and what does not. That line is the only thing the
user needs.

## Success

**BAD**
> Success!

**GOOD**
> Campaign deleted. [Undo]

Works: names the entity and what changed. A success message is the one moment the user is looking —
spending it on the word "Success" wastes it.

## Stale data

**GOOD**
> Last updated 14 minutes ago. [Refresh]

Works: a dashboard that does not say when it was fetched invites a decision based on old numbers.
