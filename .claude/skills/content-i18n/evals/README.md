# Evals

Two layers.

**Deterministic** — `*/fixtures/*.json` plus `expectations.json`. Every fixture is run through
`scripts/run_checks.py`; the listed `must_fire` rules have to appear and the status has to match.
Enforced by `tests/test_evals.py`, so a rule that silently stops firing fails the build.

**Judged** — `cases.md` in each folder. Prompts a model has to handle correctly; the expected
behaviour is written out, not the expected string. Run these when the reference files change.

**Regression** — `regression/*.golden.json` are approved outputs. They must stay at **zero errors
and zero warnings**. When a rule changes, a golden going red means either the rule got noisier or
the golden was never as clean as it looked; decide which before touching either file.

```bash
python3 .claude/skills/content-i18n/scripts/run_checks.py \
        .claude/skills/content-i18n/evals/regression/marketing-home-hero.golden.json
python3 -m unittest discover tests
```

Do not treat a rule change as successful because the output looks different. Compare quality, and
check for semantic, terminology and locale drift.
