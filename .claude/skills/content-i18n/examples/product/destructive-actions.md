# Destructive actions

## The dialog

**BAD**
```
Title    Are you sure?
Body     This action is permanent.
Buttons  [OK]  [Cancel]
```

Fails three ways: the title asks the user to be sure of something never named, the body does not say
what is affected, and `OK` does not tell a fast-moving user what they are about to confirm.

**GOOD**
```
Title    Delete campaign?
Body     The campaign and its 42 scheduled posts will be deleted.
         This action cannot be undone.
Buttons  [Delete campaign]  [Cancel]
```

Works: names the object, names the collateral with a count, states irreversibility, and puts the
destructive verb on the button the user actually reads.

| | vi | ko |
|---|---|---|
| Title | Xoá chiến dịch? | 캠페인을 삭제할까요? |
| Body | Chiến dịch và 42 bài đã lên lịch sẽ bị xoá. Không thể hoàn tác. | 캠페인과 예약된 게시물 42개가 삭제됩니다. 이 작업은 되돌릴 수 없습니다. |
| Primary | Xoá chiến dịch | 캠페인 삭제 |
| Secondary | Huỷ | 취소 |

The Korean title uses the natural asking form; it does not bolt a question mark onto a noun phrase
because English did.

## When not to confirm

A reversible action does not need a dialog. It needs an undo.

**GOOD**
> Campaign deleted. [Undo]

## When to confirm harder

Deleting a workspace affects other people. Make the user type the workspace name, and say so:

> Type **acme-production** to confirm.

## The request to make it worse

"Change the button from Delete campaign to OK." Decline it in one line — the button is what the user
reads when moving fast — and offer the real fix: shorten the title, not the action label.
