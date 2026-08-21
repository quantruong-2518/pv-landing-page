# Empty states

First, decide which emptiness this is. Using one message for all six is the defining empty-state
failure.

| Kind | Message must say |
|---|---|
| first-use | nothing exists yet + what creates the first one |
| user-filtered | the filter is hiding rows + how to clear it |
| no-results | the query matched nothing + how to widen it |
| permission | data exists, access does not + who grants it |
| loading failure | it failed, not empty + retry |
| true zero-data | genuinely nothing, and nothing to do here yet |

## Examples

**First use**
```
BAD    Start your journey to smarter sales.
GOOD   No leads yet
       Leads from campaigns or imported files appear here.
       [Import leads]  [Create campaign]
```

**Filtered**
```
GOOD   No leads match these filters
       4,182 leads are hidden by the current filters.
       [Clear filters]
```
The count is what tells the user their data still exists.

**No results**
```
GOOD   No results for "{query}"
       Check the spelling, or search by company name.
```

**Permission**
```
GOOD   You do not have access to this campaign
       Ask the campaign owner for access.
```

**Loading failure**
```
GOOD   Could not load leads
       [Try again]
```
Never render this as "No leads".

## Rules

1. **Heading names the state.** Body explains what fills it. Action lets them fill it.
2. **No marketing voice.** Operational empty states are not a place for brand storytelling — unless
   the product deliberately treats first-use onboarding as marketing surface, and says so in the
   contract.
3. **Do not offer an action the user cannot take.** A `[Create campaign]` button for a read-only user
   is worse than no button.
4. **Placeholders are exact.** `"{query}"` keeps its quotes and its braces in every locale.

## Locale

```
en   No leads yet — Leads from campaigns or imported files appear here.
vi   Chưa có lead nào — Lead từ chiến dịch hoặc tệp nhập sẽ xuất hiện ở đây.
ko   아직 리드가 없습니다 — 캠페인이나 가져온 파일의 리드가 여기에 표시됩니다.
```
