# Error messages

An error should answer, in this order:

```
what happened  →  why (only if the system knows)  →  what to do next
```

## Known cause

```
BAD    Error 409.
BAD    Something went wrong. Please try again.
GOOD   This lead is already assigned.
       Check the current owner before assigning it again.
```

## Unknown cause

Do not invent one. Do not imply the user caused it.

```
GOOD   Could not load leads.
       Your filters are unchanged — try again.
```

If the failure lost work, say what survived: "Your draft is saved."

## Technical detail

Hide it unless the user can act on it or must quote it. `PRODUCT_TECHNICAL_LEAKAGE` (ERROR) covers
raw status codes, exception class names, stack frames, SQL, and internal service names.

A support reference is different and useful: "Contact support with reference `A7F3`."

## Validation errors

State the rule, not the violation.

```
BAD    Invalid email.
GOOD   Enter an email address with an @ — for example name@company.com
BAD    Trường không hợp lệ.
GOOD   Số điện thoại gồm 10 chữ số, không có dấu cách.
```

Inline, next to the field, on blur or submit — not only as a toast the user must remember.

## Permission errors

Name the missing permission and who grants it. "You do not have access" with no route forward is a
dead end.

```
GOOD   Only the campaign owner can delete this campaign.
       Ask {owner} to delete it, or request owner access.
```

## Tone

No apology in place of information. No blame. No exclamation marks. One sentence for the state, one
for the action, at most.

## Locale

```
en   This lead is already assigned. Check the current owner before assigning it again.
vi   Lead này đã có người phụ trách. Kiểm tra người phụ trách hiện tại trước khi gán lại.
ko   이미 담당자가 지정된 리드입니다. 현재 담당자를 확인한 후 다시 지정하세요.
```

Three shapes, one meaning: state named, action named, no cause invented, `lead` / `Lead` / `리드`
per the glossary.
