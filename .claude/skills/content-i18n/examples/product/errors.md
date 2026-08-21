# Errors

## Known cause

**BAD**
> Error 409.

Fails: exposes an internal code and tells the user nothing they can act on.

**BAD**
> Something went wrong. Please try again.

Fails differently: the system *knows* what happened and chose not to say. Retrying will fail again.

**GOOD**
```
This lead is already assigned
{owner} owns this lead. Check with them before assigning it again.
[View owner]
```

Works: state, cause, action. The placeholder carries the specific person, which is what makes the
message useful rather than merely accurate.

| | vi | ko |
|---|---|---|
| Title | Lead này đã có người phụ trách | 이미 담당자가 지정된 리드입니다 |
| Body | {owner} đang phụ trách lead này. Trao đổi với họ trước khi gán lại. | {owner}님이 이 리드를 담당하고 있습니다. 다시 지정하기 전에 확인하세요. |

`{owner}` is identical in all three. Translating it to `{담당자}` breaks the lookup at runtime.

## Unknown cause

**GOOD**
> Could not load leads. Your filters are unchanged — try again.

Works: does not invent a cause, does not blame the user, and says what survived. When a request
fails mid-edit, saying "Your draft is saved" is worth more than any apology.

## Validation

**BAD**
> Invalid email.

**GOOD**
> Enter an email address with an @ — for example name@company.com

Works: states the rule instead of the verdict. The example does more than the rule.

**VI** — `Số điện thoại gồm 10 chữ số, không có dấu cách.` States the shape, not "không hợp lệ".

## Permission

**BAD**
> You do not have access.

**GOOD**
> Only the campaign owner can delete this campaign. Ask {owner} to delete it, or request owner
> access.

Works: names the rule, names the route forward. A dead end here becomes a support ticket.
