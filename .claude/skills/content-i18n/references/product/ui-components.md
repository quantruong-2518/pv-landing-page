# UI component rules

Soft length limits live in `content-system/brand/voice.yaml` and produce **warnings**, never silent
truncation. Never delete meaning to fit a character count — resize the component instead.

## buttons
Describe the action. See §Button rules below.

## labels
Name the field's content, not its input widget. "Owner", not "Select owner from list". No colons.

## tabs / nav
Nouns, parallel in grammar, 1–2 words. A tab is a place, not an instruction.

## forms
Label = what it is. Placeholder = example format, never the label repeated, never required
information. Helper text = the rule the user must know *before* typing, not after failing.

```
Label        Phone
Placeholder  0345 913 369
Helper       Used only for scheduling the call
```

An empty-looking field whose only label is a placeholder loses its label the moment typing starts.

## helper text
One sentence. Explains a constraint or consequence. Not reassurance.

## tooltips
For secondary detail only. Never the sole carrier of information needed to act — tooltips do not
exist on touch, and screen readers reach them unevenly.

## empty states
See `empty-states.md`.

## errors / warnings
See `errors.md`. A warning precedes a risky action; an error reports a state that already happened.

## success messages
Confirm the specific thing and, when useful, the next step. "Saved" is fine inline; a toast that
says only "Success" wastes the one moment the user is paying attention.

## notifications
Who did what to which entity, and when. Actionable ones carry the action.

## dialogs
Title is the question or the decision. Body carries scope and consequence. Buttons carry the
actions. No line repeats another.

## destructive actions
See `destructive-actions.md`.

## onboarding
Say what the user gets and what the step costs. Skippable steps say so. No inspirational framing.

## filters
State the filter and the result count. When a filter empties the table, the empty state must say the
filter did it — see `empty-states.md`.

## tables
Headers are short nouns, unit in the header (`Power (W)`) rather than repeated in every cell. Empty
cells mean "no value" — if that is ambiguous, use an explicit `—` and explain it once.

## settings
Label states what the setting controls. Description states what changes when it is on, and any
consequence. Never label a toggle with a bare adjective ("Advanced") and no description.

## Button rules

Buttons name their action.

```
AVOID    OK · Yes · Confirm · Continue · Submit · Done      (when a specific action exists)
PREFER   Save changes · Delete campaign · Assign lead · Create task · Import leads
```

- Verb + object. 1–3 words. Sentence case.
- The primary button in a dialog repeats the dialog's action verb — a "Delete campaign?" dialog is
  never confirmed by "OK".
- The cancel button says `Cancel`. Do not get creative with the escape hatch.
- Never make two buttons in one view start with the same verb unless the objects differ clearly.
- `OK` is acceptable only for a pure acknowledgement with no alternative action.

| | vi | en | ko |
|---|---|---|---|
| Save changes | Lưu thay đổi | Save changes | 변경사항 저장 |
| Delete campaign | Xoá chiến dịch | Delete campaign | 캠페인 삭제 |
| Cancel | Huỷ | Cancel | 취소 |

Korean buttons take the noun form. `저장합니다` on a button is a sentence, not a label.
