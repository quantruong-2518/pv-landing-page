# Empty states

## First use

**BAD**
> Start your journey to smarter sales.

Fails: marketing voice in an operational surface. It does not say the list is empty, does not say
what would fill it, and offers nothing to do.

**GOOD**
```
No leads yet
Leads from campaigns or imported files appear here.
[Import leads]  [Create campaign]
```

Works: state, cause, two ways out.

| | vi | ko |
|---|---|---|
| Title | Chưa có lead nào | 아직 리드가 없습니다 |
| Body | Lead từ chiến dịch hoặc tệp nhập sẽ xuất hiện ở đây. | 캠페인이나 가져온 파일의 리드가 여기에 표시됩니다. |
| Action | Nhập lead | 리드 가져오기 |

Korean drops the subject and puts the location last. Vietnamese uses the bare imperative. Neither
copies the English clause order.

## Filtered

**BAD**
> No leads yet

Fails catastrophically: the user has 4,182 leads. They now believe their data is gone.

**GOOD**
```
No leads match these filters
4,182 leads are hidden by the current filters.
[Clear filters]
```

The count is the whole message. Without it the user still doubts.

## Loading failure

**BAD**
> No leads

**GOOD**
```
Could not load leads
[Try again]
```

Empty and failed are different states. Rendering a failure as emptiness is a lie the interface tells
by omission.
