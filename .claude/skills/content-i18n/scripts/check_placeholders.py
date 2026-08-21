#!/usr/bin/env python3
"""Placeholder gate — variables must survive localization intact.

never remove · never rename · never translate · plural categories are per-locale
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import _common as C

# A name is only a placeholder when a `}` or a known ICU kind follows it — that keeps
# plural branch bodies like `{# leads}` out of the set. Names may be non-ASCII so a
# translated placeholder is caught rather than silently unseen.
ICU = re.compile(r"\{\s*([^\s{}(),#]+)\s*(?:\}|,\s*(plural|select|selectordinal|number|date|time)\b)")
LEGACY = re.compile(r"%(\d+\$)?[sd]|\$\{\s*([\w.]+)\s*\}|\{\{\s*([\w.]+)\s*\}\}")
PLURAL_BRANCH = re.compile(r"\b(zero|one|two|few|many|other)\s*\{")

# Locales with no grammatical plural: an English-style `one` branch is a templating tell.
NO_PLURAL = {"vi", "ko", "ja", "zh", "th"}


def extract(text):
    names, kinds = set(), {}
    for match in ICU.finditer(text):
        names.add(match.group(1))
        if match.group(2):
            kinds[match.group(1)] = match.group(2)
    for match in LEGACY.finditer(text):
        names.add(match.group(0))
    return names, kinds


def balanced(text):
    depth = 0
    for char in text:
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth < 0:
                return False
    return depth == 0


def run(artifact):
    report = C.Report("check_placeholders")
    locales = artifact.get("locales") or []

    for entry in artifact.get("entries", []):
        key = entry.get("key", "?")
        strings = entry.get("locales") or {}
        found = {}
        for locale, text in strings.items():
            if not balanced(text):
                report.add("I18N_PLACEHOLDER_UNBALANCED", C.ERROR,
                           "unbalanced braces — the string will not render",
                           key=key, locale=locale)
            names, kinds = extract(text)
            found[locale] = names
            for name in names:
                if any(ord(ch) > 127 for ch in name):
                    report.add("I18N_PLACEHOLDER_TRANSLATED", C.ERROR,
                               "placeholder %r was translated — the runtime looks up the "
                               "original name" % name, key=key, locale=locale)
            if kinds:
                branches = set(PLURAL_BRANCH.findall(text))
                if "plural" in kinds.values():
                    if "other" not in branches:
                        report.add("I18N_PLURAL_MISSING_OTHER", C.ERROR,
                                   "plural block without an `other` branch", key=key, locale=locale)
                    if locale in NO_PLURAL and branches - {"other"}:
                        report.add("I18N_PLURAL_INVALID_CATEGORY", C.ERROR,
                                   "%s has no grammatical plural; branches %s are English grammar "
                                   "templated onto it" % (locale, sorted(branches - {"other"})),
                                   key=key, locale=locale,
                                   repair="Keep only the `other` branch.")

        union = set().union(*found.values()) if found else set()
        for name in sorted(union):
            carriers = [loc for loc, names in found.items() if name in names]
            missing = [loc for loc in locales if loc in strings and name not in found.get(loc, set())]
            if len(carriers) == 1 and len(strings) > 1:
                report.add("I18N_PLACEHOLDER_CHANGED", C.ERROR,
                           "%r exists only in %s — renamed or invented" % (name, carriers[0]),
                           key=key, locale=carriers[0],
                           repair="Use the same variable name in every locale.")
            for locale in missing:
                report.add("I18N_PLACEHOLDER_MISSING", C.ERROR,
                           "%r is missing" % name, key=key, locale=locale,
                           repair="Restore the variable; a dropped placeholder loses data at "
                                  "runtime, not at review time.")

    report.add("INFO_PLACEHOLDERS", C.INFO, "%d entries scanned" % len(artifact.get("entries", [])))
    return report


def main(argv=None):
    parser = C.base_parser(__doc__.splitlines()[0])
    args = parser.parse_args(argv)
    path = C.resolve_content_arg(parser, args)
    return C.emit(run(C.load_artifact(path)), args.json)


if __name__ == "__main__":
    sys.exit(main())
