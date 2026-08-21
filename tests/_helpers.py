"""Shared test setup: put the skill's scripts on sys.path and locate its data."""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / ".claude" / "skills" / "content-i18n"
SCRIPTS = SKILL / "scripts"
EVALS = SKILL / "evals"
DATA = ROOT / "content-system"

if str(SCRIPTS) not in sys.path:
    sys.path.insert(0, str(SCRIPTS))


def artifact(*parts):
    import _common as C
    return C.load_artifact(EVALS.joinpath(*parts))


def make(content_type="marketing", entries=None, locales=("en", "vi", "ko"), **kw):
    """Build a minimal in-memory artifact for a single-rule test."""
    payload = {
        "content_type": content_type,
        "id": kw.pop("id", "test.block"),
        "locales": list(locales),
        "entries": entries or [],
    }
    payload.update(kw)
    return payload


def entry(key, component, texts, **kw):
    item = {"key": key, "component": component, "locales": dict(texts)}
    item.update(kw)
    return item


def rules(report):
    return {f.rule for f in report.findings}


def errors(report):
    return {f.rule for f in report.findings if f.severity == "ERROR"}


def load_expectations():
    with open(EVALS / "expectations.json", encoding="utf-8") as handle:
        return {k: v for k, v in json.load(handle).items() if not k.startswith("_")}
