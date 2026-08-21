"""Shared plumbing for the content-i18n checks: paths, loading, findings, reporting."""

import argparse
import json
import os
import re
import sys
from pathlib import Path

import _yaml

ERROR, WARNING, INFO = "ERROR", "WARNING", "INFO"
_RANK = {ERROR: 0, WARNING: 1, INFO: 2}

SKILL_DIR = Path(__file__).resolve().parents[1]
REPO_ROOT = Path(os.environ.get("CONTENT_I18N_ROOT") or SKILL_DIR.parents[2])
DATA_DIR = Path(os.environ.get("CONTENT_SYSTEM_DIR") or REPO_ROOT / "content-system")

GLOSSARY = DATA_DIR / "terminology" / "glossary.yaml"
CLAIMS = DATA_DIR / "claims" / "approved.yaml"
VOICE = DATA_DIR / "brand" / "voice.yaml"
I18N_DIR = DATA_DIR / "i18n"
SCHEMA_DIR = SKILL_DIR / "schemas"


class Finding:
    __slots__ = ("rule", "severity", "reason", "key", "locale", "source", "repair")

    def __init__(self, rule, severity, reason, key=None, locale=None, source=None, repair=None):
        self.rule = rule
        self.severity = severity
        self.reason = reason
        self.key = key
        self.locale = locale
        self.source = source
        self.repair = repair

    def identity(self):
        return (self.rule, self.key, self.locale, self.reason)

    def to_dict(self):
        out = {"rule": self.rule, "severity": self.severity, "reason": self.reason}
        for name in ("key", "locale", "source"):
            value = getattr(self, name)
            if value:
                out[name] = value
        if self.repair:
            out["repair_instruction"] = self.repair
        return out


class Report:
    def __init__(self, check):
        self.check = check
        self.findings = []

    def add(self, *args, **kwargs):
        self.findings.append(Finding(*args, **kwargs))

    def extend(self, other):
        self.findings.extend(other.findings)

    def dedupe(self):
        seen, kept = set(), []
        for finding in self.findings:
            if finding.identity() in seen:
                continue
            seen.add(finding.identity())
            kept.append(finding)
        self.findings = kept

    def count(self, severity):
        return sum(1 for f in self.findings if f.severity == severity)

    @property
    def failed(self):
        return self.count(ERROR) > 0

    def sorted(self):
        return sorted(self.findings, key=lambda f: (_RANK[f.severity], f.key or "", f.rule))

    def to_dict(self):
        return {
            "check": self.check,
            "status": "FAIL" if self.failed else "PASS",
            "counts": {
                "error": self.count(ERROR),
                "warning": self.count(WARNING),
                "info": self.count(INFO),
            },
            "findings": [f.to_dict() for f in self.sorted()],
        }

    def render(self):
        lines = []
        for finding in self.sorted():
            where = finding.key or finding.source or "-"
            if finding.locale:
                where = "%s [%s]" % (where, finding.locale)
            lines.append("%-7s %-38s %s" % (finding.severity, finding.rule, where))
            lines.append("        %s" % finding.reason)
            if finding.repair:
                lines.append("        → %s" % finding.repair)
        counts = self.to_dict()["counts"]
        lines.append(
            "%s: %s — %d error, %d warning, %d info"
            % (self.check, "FAIL" if self.failed else "PASS",
               counts["error"], counts["warning"], counts["info"])
        )
        return "\n".join(lines)


def emit(report, as_json):
    if as_json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(report.render())
    return 1 if report.failed else 0


def base_parser(description):
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("content", nargs="?", help="path to an i18n output artifact (JSON)")
    parser.add_argument("--json", action="store_true", help="machine-readable output")
    return parser


def load_json(path):
    with open(path, encoding="utf-8") as handle:
        return json.load(handle)


def load_yaml(path):
    return _yaml.load(path)


def load_artifact(path):
    data = load_json(path)
    if not isinstance(data, dict) or "entries" not in data:
        raise SystemExit("%s is not an i18n output artifact (no `entries`)" % path)
    data.setdefault("locales", sorted({loc for e in data["entries"] for loc in e.get("locales", {})}))
    data.setdefault("content_type", "marketing")
    return data


def iter_texts(artifact):
    """Yield (entry, key, locale, text) for every string in the artifact."""
    for entry in artifact.get("entries", []):
        key = entry.get("key", "?")
        for locale, text in sorted(entry.get("locales", {}).items()):
            if isinstance(text, str):
                yield entry, key, locale, text


def key_group(key):
    """`lead.empty.title` -> `lead.empty`; the sibling strings of one component."""
    return key.rsplit(".", 1)[0] if "." in key else key


def list_shape(key):
    """`home.points[0].title` -> `home.points[].title` — the same slot across list items."""
    return re.sub(r"\[\d+\]", "[]", key or "")


def words(text):
    return [w for w in re.split(r"[\s ]+", text.strip()) if w]


def sentences(text):
    parts = re.split(r"(?<=[.!?。])\s+|\n+", text)
    return [p.strip() for p in parts if p.strip()]


def strip_placeholders(text):
    return re.sub(r"\{[^{}]*\}", " ", text)


def norm(text):
    return re.sub(r"\s+", " ", text.strip().lower())


def has_word(text, phrase):
    """Case-insensitive containment that respects word edges for Latin scripts."""
    pattern = re.escape(phrase)
    if re.match(r"^[\w\s'-]+$", phrase, re.UNICODE) and re.search(r"[A-Za-z]", phrase):
        pattern = r"(?<![\w])" + pattern + r"(?![\w])"
    return re.search(pattern, text, re.IGNORECASE | re.UNICODE) is not None


def has_term(text, term):
    """Like `has_word`, but tolerant of a regular English plural on the term."""
    if not term:
        return False
    pattern = re.escape(term)
    if re.search(r"[A-Za-z]", term):
        pattern = r"(?<![\w])" + pattern + r"(?:e?s)?(?![\w])"
    return re.search(pattern, text, re.IGNORECASE | re.UNICODE) is not None


def voice_config():
    try:
        return load_yaml(VOICE)
    except (OSError, _yaml.YamlError):
        return {}


def resolve_content_arg(parser, args):
    if not args.content:
        parser.error("an artifact path is required")
    path = Path(args.content)
    if not path.exists():
        raise SystemExit("no such file: %s" % path)
    return path
