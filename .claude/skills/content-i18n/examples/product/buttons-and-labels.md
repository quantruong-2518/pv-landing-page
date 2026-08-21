# Buttons, labels, forms

## Buttons

| BAD | GOOD | Why |
|---|---|---|
| `Submit` | `Send message` | names what happens |
| `OK` | `Delete campaign` | matches the action being confirmed |
| `Yes` | `Assign lead` | reads correctly out of context |
| `Continue` | `Review and pay` | says what the next screen is |
| `Save changes.` | `Save changes` | buttons take no terminal period |

`OK` survives in exactly one case: a pure acknowledgement with no alternative action.

| | vi | ko |
|---|---|---|
| Save changes | Lưu thay đổi | 변경사항 저장 |
| Send message | Gửi tin nhắn | 메시지 보내기 |
| Cancel | Huỷ | 취소 |

Korean buttons take the noun form. `저장합니다` is a sentence wearing a label's clothes.

## Labels and helper text

**BAD**
```
Label        Enter your phone number here
Placeholder  Phone
Helper       Required
```

Fails: the label is an instruction, the placeholder holds what should be the label, and the helper
repeats what the asterisk already said. When the user types, the only label disappears.

**GOOD**
```
Label        Phone
Placeholder  0345 913 369
Helper       Used only for scheduling the call
```

Works: the label names the content, the placeholder shows the format, the helper explains *why you
are being asked* — which is the actual reason people abandon a phone field.

## Tables

**BAD** — `Power consumption in watts` repeated in every cell as `5 W`, `10 W`, `12 W`.

**GOOD** — header `Power (W)`, cells `5`, `10`, `12`. The unit belongs in the header once.

## Settings

**BAD**
> **Advanced** ⬜

**GOOD**
> **Send weekly summary** ⬜
> Every Monday, each owner gets one email listing their open leads.

Works: the label names what is controlled, the description names what changes and when.
