#!/usr/bin/env python3
"""Terminology gate — forbidden variants, cross-locale term drift, proper-noun casing.

Glossary: content-system/terminology/glossary.yaml. It is authoritative; a writer who
prefers another word is wrong until the glossary changes.
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import _common as C


def _present(text, term):
    return C.has_term(text, term)


def _in_scope(term, content_type):
    scope = term.get("scope")
    return not scope or content_type in scope


def run(artifact, glossary=None):
    report = C.Report("check_terms")
    glossary = glossary if glossary is not None else C.load_yaml(C.GLOSSARY)
    terms = glossary.get("terms") or {}
    verbatim = glossary.get("preserve_verbatim") or []
    locales = artifact.get("locales") or []
    content_type = artifact.get("content_type", "marketing")
    terms = {name: term for name, term in terms.items() if _in_scope(term, content_type)}

    for entry, key, locale, raw in C.iter_texts(artifact):
        text = C.strip_placeholders(raw)
        for concept, term in terms.items():
            rules = (term.get("locales") or {}).get(locale)
            if not rules:
                continue
            for bad in rules.get("forbidden") or []:
                if _present(text, bad):
                    report.add("TERM_FORBIDDEN_VARIANT", C.ERROR,
                               "%r is forbidden for `%s` in %s — use %r"
                               % (bad, concept, locale, rules.get("preferred")),
                               key=key, locale=locale,
                               repair="Replace with the glossary term %r." % rules.get("preferred"))

        for name in verbatim:
            if _present(text, name):
                continue
            if re.search(re.escape(name), text, re.IGNORECASE) and name not in text:
                report.add("TERM_PROPER_NOUN_CASING", C.WARNING,
                           "%r appears with different casing" % name, key=key, locale=locale,
                           repair="Proper nouns keep their published form in every locale.")

    # Terminology asymmetry — an observation, never a defect. Languages restructure: an
    # English passive can carry the entity that Vietnamese names outright. Reported at INFO
    # so a reviewer can judge it, and only for the odd locale out on a preserved term.
    for entry in artifact.get("entries", []):
        strings = {loc: C.strip_placeholders(text)
                   for loc, text in (entry.get("locales") or {}).items()}
        for concept, term in terms.items():
            if not term.get("preserve_in_ui"):
                continue
            rules = term.get("locales") or {}
            candidates = [l for l in locales if l in strings and l in rules]
            if len(candidates) < 3:
                continue
            missing = [l for l in candidates
                       if not _present(strings[l], rules[l].get("preferred", ""))]
            if len(missing) != 1:
                continue
            locale = missing[0]
            report.add("TERM_PREFERRED_MISSING", C.INFO,
                       "`%s` is named in every locale except %s — check this is a natural "
                       "restructure, not a dropped entity" % (concept, locale),
                       key=entry.get("key"), locale=locale)

    report.add("INFO_GLOSSARY", C.INFO, "%d concepts, %d protected proper nouns"
               % (len(terms), len(verbatim)))
    return report


def main(argv=None):
    parser = C.base_parser(__doc__.splitlines()[0])
    parser.add_argument("--glossary", default=str(C.GLOSSARY))
    parser.add_argument("--content", dest="content_flag")
    args = parser.parse_args(argv)
    if args.content_flag:
        args.content = args.content_flag
    path = C.resolve_content_arg(parser, args)
    return C.emit(run(C.load_artifact(path), C.load_yaml(args.glossary)), args.json)


if __name__ == "__main__":
    sys.exit(main())
