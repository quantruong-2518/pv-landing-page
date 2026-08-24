---
name: ship-page
description: The finishing loop for one page of the Pebble Vina site — HOME, PRODUCTS or CONTACT. Runs content, mobile review, desktop/UX review and code fixes as rounds against a shared ledger until no blocker is left, then gates on strategy review. Use when someone says "hoàn thiện trang", "làm cho xong HOME", "chạy vòng review", "ship trang products", "loop 3 trang", or asks for the page to be brought to launch quality. Not for a single isolated fix — that goes straight to the owning agent.
---

# ship-page — the finishing loop

Four specialists, one page at a time, rounds against one ledger.

```
CONTENT ──▶ REVIEW ──▶ TRIAGE ──▶ FIX ──▶ VERIFY ──┐
   ▲                                                │
   └──────────── blockers remain ───────────────────┘
                          │ none remain
                          ▼
                    STRATEGY GATE ──▶ page done
```

## Who does what

| Role | Agent | Owns |
|---|---|---|
| Copy | `web-content-writer` | Every string in `web/content/*.ts`, via the `content-i18n` skill |
| Language, per market | `content-market-critic` | Whether the Vietnamese reads as Vietnamese |
| Phone | `mobile-ui-reviewer` | 360–430px, touch, forms, overflow — measured in a browser |
| Desktop and feel | `web-ux-reviewer` | 1024–1920px, block heights, scan path, snap rhythm, conversion path |
| Code | `web-ui-engineer` | The only agent that edits `web/` code |
| Launch gate | `strategy-reviewer` | Whether a buyer would act on this page at all |

**Nobody crosses a boundary.** A reviewer never writes code. The engineer never writes copy. The
writer never moves a component. When a fix needs two owners, it becomes two findings.

## The seven laws of the loop

1. **A finding is closed only by the agent that raised it.** The engineer reports `FIXED` with a
   measurement; the reviewer re-measures and marks `verified`. An engineer closing his own finding is
   how a page passes three rounds and still fails on a phone.
2. **No finding disappears.** Every id ends `verified`, `rejected` (with the measurement that
   disproves it), `routed` (with a new owner), or `backlog` (with a `docs/05-backlog.md` row number).
   An id that stops appearing in the ledger is a process failure, not a fixed defect.
3. **One page at a time.** `/vi` → `/vi/products` → `/vi/contact`. Running three pages at once makes
   it impossible to tell which round broke what, and every page shares `ui.tsx`.
4. **Content gates run in the main session, with the human.** A subagent cannot interview anyone.
   Intake gates A–E and the spec `go` (gate F) happen in the conversation before `web-content-writer`
   is dispatched. A writer sent out without a closed spec returns `UNANSWERED` and the round is wasted.
5. **Browser reviewers run one at a time.** They share one Chrome. `mobile-ui-reviewer` first — its
   defects are more likely to force layout changes that invalidate a desktop pass. `content-market-critic`
   needs no browser and runs in parallel with either.
6. **Three rounds, then it is a decision, not a bug.** A finding alive after three rounds goes to the
   human with the two options and a recommendation. Loops that never exit are how quality work turns
   into motion.
7. **Shared-component changes trigger a regression sweep.** Any edit to `ui.tsx`, `page-shell.tsx`,
   `site-header.tsx`, `site-footer.tsx` or `globals.css` means the already-verified pages get one
   cheap re-check at 390px and 1440px before the loop moves on.

## Running a round

### R0 — Baseline (once per page)

```bash
cd web && npm run build            # must be green before the loop starts
cd web && npm run dev              # background; note the port
grep -c ': ""' web/content/vi.ts   # empty slots left
```
Open or create `docs/07-loop/<page>.md` from the template below. Record the starting state: build
status, how many strings on this page are still i18n keys, which findings are inherited from the
previous round.

### R1 — Content

Only when the page still carries placeholder strings or the copy is known to be wrong.

In the main session, with the human: run the `content-i18n` intake gates A–E, write the spec, read it
back, get a `go`. Then dispatch `web-content-writer` with the confirmed spec path and the explicit
statement that gates 0 and 5 are already closed. It compiles, validates with
`scripts/content-check`, applies per `references/core/apply.md`, and reports which keys moved.

The voice is not negotiable and not invented per page: `content-system/brand/voice.yaml`, the
`persona` block. Selling vision is wanted; a vision sentence without its date and status label is a
hard failure.

### R2 — Review

Dispatch, in this order:

1. `mobile-ui-reviewer` — the page URL, the build mode, and the previous round's open findings
   addressed to it.
2. `web-ux-reviewer` — same payload, after the mobile pass returns.
3. `content-market-critic` — in parallel with either; it reads files, not pixels.

Every reviewer is told: **re-measure the open findings addressed to you; do not carry any forward
unmeasured.**

### R3 — Triage (main session)

Merge the three JSON reports into the ledger. Then:

- Dedupe. The same 24px overflow reported by two reviewers is one finding with two witnesses.
- Assign an owner from each finding's `owner` field; where they disagree with your reading, say so
  in the ledger rather than silently reassigning.
- Sort BLOCKER → MAJOR → MINOR, then group by file.
- **Resolve contradictions before dispatch.** Two findings requiring opposite changes go to the human
  with a recommendation. Never hand the engineer an averaged requirement.

### R4 — Fix

Dispatch `web-ui-engineer` once, with the whole triaged list. It returns
`FIXED / ROUTED / REJECTED / BUILD / NOTICED`, every id accounted for exactly once.

Findings routed to the writer go back through R1 — one key regenerated, not a page rewritten
(`content-i18n` §8). Findings routed to the GM go to `docs/05-backlog.md` and out of the loop.

### R5 — Verify

Send each reviewer only its own `FIXED` and `REJECTED` ids. It re-measures and returns
`verified` / `still open, new number`. Update the ledger.

Open blockers or majors → R2 of the next round. None → the gate.

### R6 — Strategy gate (once, before a page is called done)

`strategy-reviewer` reads the finished page and answers the only question the other five cannot:
would a real buyer act on this. Its findings are usually `writer` or `GM` findings, and they can
legitimately reopen R1.

## Exit criteria — a page is done when

- Zero open BLOCKER, zero open MAJOR.
- Every MINOR is either verified or in `docs/05-backlog.md` with a row number.
- `npm run build` green; console clean on the page at 390px and 1440px.
- No `screen` block over its viewport budget — measured, in px, in the ledger.
- No string on the page is still equal to its own key path.
- `strategy-reviewer` has run and its blockers are closed or explicitly accepted by the human.
- The ledger's closing verdict is written, in Vietnamese, by the session — not by an agent.

## Ledger template — `docs/07-loop/<page>.md`

```markdown
# Vòng hoàn thiện — <PAGE>

> Bắt đầu <ngày>. Trạng thái: <đang chạy | xong>. Vòng hiện tại: <n>/3.

## Tình trạng đầu vào
- build: ✔ / ✘        · ô trống trong vi.ts: <n>
- chuỗi còn là key: <n>
- kế thừa từ vòng trước: <ids>

## Sổ finding

| id | round | severity | owner | where | requirement | state | number |
|---|---|---|---|---|---|---|---|
| mob-01 | 1 | BLOCKER | engineer | site-header.tsx:41 | tap target ≥44px at 360 | verified | 40x38 → 48x44 |

state: open · assigned · fixed · verified · rejected · routed · backlog

## Quyết định đã chốt
- <ngày> — <quyết định> — <ai chốt>

## Còn treo cho người
- <việc> — <backlog #n>

## Kết luận
<một đoạn tiếng Việt: trang này đã bán được chưa, và cái gì còn chặn>
```

## Where the truth lives

`CLAUDE.md` — the four bans and the code discipline, above everything here ·
`docs/01-proof-bank.md` — every number · `docs/03-structure.md` — the block frame, the height law,
the band rhythm · `content-system/brand/voice.yaml` — who is speaking ·
`docs/05-backlog.md` — what is already known-missing, so no round reports it as news.

## What this loop is not

It is not a licence to redesign. The three-branch frame, the block order and the height law were
decided by the GM and live in `docs/03-structure.md`. A round may prove one of them wrong — and then
it produces a proposal for the human, not a commit.
