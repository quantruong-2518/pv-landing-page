#!/usr/bin/env python3
"""Key-parity gate.

Two modes:
  check_i18n.py content-system/i18n/     — compare locale bundles key set by key set
  check_i18n.py artifact.json            — every entry must carry every declared locale
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import _common as C


def flatten(node, prefix=""):
    out = {}
    if isinstance(node, dict):
        for name, value in node.items():
            out.update(flatten(value, "%s.%s" % (prefix, name) if prefix else name))
    elif isinstance(node, list):
        for i, value in enumerate(node):
            out.update(flatten(value, "%s[%d]" % (prefix, i)))
    else:
        out[prefix] = node
    return out


def run_bundles(directory, canonical=None):
    report = C.Report("check_i18n")
    directory = Path(directory)
    files = sorted(p for p in directory.glob("*.json"))
    if not files:
        report.add("I18N_NO_BUNDLES", C.ERROR, "no *.json locale bundles in %s" % directory)
        return report

    bundles = {p.stem: flatten(C.load_json(p)) for p in files}
    config = C.voice_config()
    canonical = canonical or (config.get("locales") or {}).get("canonical") or sorted(bundles)[0]
    if canonical not in bundles:
        canonical = sorted(bundles)[0]
    reference = set(bundles[canonical])

    for locale, keys in sorted(bundles.items()):
        for key in sorted(reference - set(keys)):
            report.add("I18N_MISSING_KEY", C.ERROR, "missing in %s (present in %s)"
                       % (locale, canonical), key=key, locale=locale)
        for key in sorted(set(keys) - reference):
            report.add("I18N_KEY_MISMATCH", C.ERROR, "present in %s but not in canonical %s"
                       % (locale, canonical), key=key, locale=locale)
        for key, value in sorted(keys.items()):
            if isinstance(value, str) and not value.strip():
                report.add("I18N_EMPTY_VALUE", C.ERROR, "empty string", key=key, locale=locale)

    report.add("INFO_BUNDLES", C.INFO, "%d locales, %d canonical keys (%s)"
               % (len(bundles), len(reference), ", ".join(sorted(bundles))))
    return report


def run_artifact(artifact):
    report = C.Report("check_i18n")
    locales = artifact.get("locales") or []
    keys = [e.get("key") for e in artifact.get("entries", [])]
    for key in sorted({k for k in keys if keys.count(k) > 1}):
        report.add("I18N_DUPLICATE_KEY", C.ERROR, "declared more than once", key=key)
    for entry in artifact.get("entries", []):
        strings = entry.get("locales") or {}
        for locale in locales:
            if locale not in strings:
                report.add("I18N_MISSING_KEY", C.ERROR, "declared locale has no string",
                           key=entry.get("key"), locale=locale)
            elif not str(strings[locale]).strip():
                report.add("I18N_EMPTY_VALUE", C.ERROR, "empty string",
                           key=entry.get("key"), locale=locale)
        for locale in sorted(set(strings) - set(locales)):
            report.add("I18N_KEY_MISMATCH", C.ERROR,
                       "string for %s, which the artifact does not declare" % locale,
                       key=entry.get("key"), locale=locale)
    report.add("INFO_COVERAGE", C.INFO, "%d keys × %d locales" % (len(keys), len(locales)))
    return report


def main(argv=None):
    parser = C.base_parser(__doc__.splitlines()[0])
    parser.add_argument("--canonical", help="reference locale for bundle mode")
    args = parser.parse_args(argv)
    target = Path(args.content or C.I18N_DIR)
    if not target.exists():
        raise SystemExit("no such path: %s" % target)
    report = run_bundles(target, args.canonical) if target.is_dir() \
        else run_artifact(C.load_artifact(target))
    return C.emit(report, args.json)


if __name__ == "__main__":
    sys.exit(main())
