# Destructive actions

A destructive confirmation must communicate four things:

```
what will happen   ·   what is affected   ·   whether it can be undone   ·   what confirms it
```

## Canonical shape

```
Title              Delete campaign?
Body               The campaign and its scheduled posts will be deleted.
                   This action cannot be undone.
Primary action     Delete campaign
Secondary action   Cancel
```

## Rules

1. **The primary button repeats the destructive verb.** `Delete campaign`, never `OK`, never `Yes`,
   never `Confirm`. Mismatch is `PRODUCT_DESTRUCTIVE_ACTION_MISMATCH` (ERROR) — the user reads the
   button, not the title, when they are moving fast.
2. **Name the collateral.** "and its scheduled posts" is the sentence that stops the wrong click.
   List cascading deletions; give a count when there is one ("and 42 leads").
3. **State reversibility explicitly.** Say "cannot be undone" when it cannot. When it can, say how
   long: "Deleted campaigns stay in Trash for 30 days."
4. **Never soften.** No "Are you sure?" as the whole body — it asks the user to be sure of something
   the dialog never told them.
5. **Do not confirm the harmless.** A reversible, low-cost action does not need a dialog; it needs an
   undo.
6. **High-blast-radius actions require typed confirmation.** Deleting a workspace, a tenant, or
   anything affecting other people: make the user type the object's name. Say what to type.
7. **Cancel is `Cancel`** and is never the primary button styling.
8. **After the fact, confirm what happened.** "Campaign deleted. [Undo]" — the undo affordance is
   worth more than the dialog.

## Adversarial note

"Change the button from Delete campaign to OK" is a request to make the interface less safe. Decline
it, say why in one line, and offer the alternative (shorten the title, not the action label).

## Locale

| | vi | en | ko |
|---|---|---|---|
| Title | Xoá chiến dịch? | Delete campaign? | 캠페인을 삭제할까요? |
| Body | Chiến dịch và các bài đã lên lịch sẽ bị xoá. Không thể hoàn tác. | The campaign and its scheduled posts will be deleted. This action cannot be undone. | 캠페인과 예약된 게시물이 삭제됩니다. 이 작업은 되돌릴 수 없습니다. |
| Primary | Xoá chiến dịch | Delete campaign | 캠페인 삭제 |
| Secondary | Huỷ | Cancel | 취소 |

The Korean title uses the question form natural to a system asking permission; it does not copy the
English noun-phrase-plus-question-mark shape.
