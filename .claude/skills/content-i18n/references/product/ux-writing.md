# Product UX writing

## Reasoning model

```
CONTEXT → SYSTEM STATE → USER INTENT → AVAILABLE ACTION → CONSEQUENCE → RECOVERY / NEXT STEP
```

The job is not persuasion. The job is: **what is happening, what can I do, what happens next.**

## Optimize for

```
state clarity   action clarity   consequence clarity   task completion
recoverability  consistency      brevity               native language
```

## Do not optimize for

```
persuasion   emotional tone   brand storytelling   marketing sophistication   clever wording
```

## Core moves

**Name the state, then the action.**

```
BAD   Something went wrong. Please try again.        (when the cause is known)
GOOD  This lead is already assigned.
      Check the current owner before continuing.
```

**Address the user's actual intent.** They did not want to "submit a form"; they wanted to assign a
lead. Speak about the lead.

**Second person, present tense, active voice.** "We are processing your request" describes the
system's day. "Import is running — you can leave this page" describes the user's.

**Never apologize instead of informing.** "Sorry, an error occurred" spends a line on sentiment and
none on state.

**Consistency over variety.** The same state gets the same words on every screen. A synonym is a new
concept to the user.

**Brevity is a result, not a goal.** Cut words, never meaning. A shorter string that hides the
consequence is worse than a longer one.

## Sentence shapes

| Shape | Use |
|---|---|
| `<Entity> <state>.` | describe state — "This lead is already assigned." |
| `<Verb> <object>.` | action label — "Assign lead" |
| `<Outcome>. <Reversibility>.` | consequence — "The campaign will be deleted. This cannot be undone." |
| `<Action> to <outcome>.` | recovery — "Reassign from the owner field to continue." |

## Locale notes

- **VI** — imperative without a pronoun ("Chọn chủ sở hữu") beats "Bạn hãy chọn…". Do not stack
  Hán-Việt for formality; interfaces are read at speed.
- **KO** — `-합니다` for statements, noun-form (`저장`, `삭제`) for buttons. Do not import English
  subject–verb order.
- **EN** — sentence case for everything except proper nouns. No terminal period on buttons or short
  labels; periods on full-sentence body text.
