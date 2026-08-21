#!/usr/bin/env python3
"""Claim gate — untraceable numbers, forbidden claims, claim-strength drift, missing labels.

Every figure on a page is a claim. This script refuses the ones the ledger cannot back.
Ledger: content-system/claims/approved.yaml (a projection of docs/01-proof-bank.md).
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import _common as C

NUMBER = re.compile(r"(?<![\w.,])\d[\d.,]*")

# Masked before extraction: these numbers are structural, not claims.
MASKS = [
    r"\{[^{}]*\}",                                   # placeholders
    r"\b(UL|IEC|TCVN|QCVN|ISO|EN|ANSI|IEEE)\s?\d[\w:.\-]*",   # standards
    r"\b[A-Za-z][\w.\-]*\d[\w.\-]*\b",               # ResNet-50, PCIe, Gen4, INT8, 5G, 4U
    r"\b\d{4}-\d{2}(-\d{2})?\b",                     # ISO dates
    r"[+]?\d[\d\s().\-]{7,}\d",                      # phone numbers
]

ABSOLUTIZERS = {
    "en": [r"\bguarantee(d|s)?\b", r"\balways\b", r"\bnever leaves?\b", r"\beliminates?\b",
           r"\bensures?\b", r"\b100% (secure|private|safe)\b", r"\bzero (risk|leakage|downtime)\b",
           r"\bcompletely (secure|private)\b", r"\bfully (private|secure) by design\b",
           r"\bproven for\b", r"\bimpossible to\b"],
    "vi": [r"\bđảm bảo\b", r"\bluôn luôn\b", r"\btuyệt đối\b", r"\bhoàn toàn (an toàn|riêng tư)\b",
           r"\bloại bỏ hoàn toàn\b", r"\bkhông bao giờ\b", r"\bchắc chắn\b"],
    "ko": [r"보장", r"항상", r"절대", r"완벽(한|하게)", r"100% (안전|보안)", r"제거합니다"],
}

QUALIFIER_SIGNALS = {
    "en": [r"\bwhen\b", r"\bif\b", r"\bon-premise\b", r"\bwith .{0,24}deployment\b",
           r"\bdepends? on\b", r"\bfor the\b", r"\bup to\b", r"\broadmap\b", r"\bexpected\b"],
    "vi": [r"\bkhi\b", r"\bnếu\b", r"\btại chỗ\b", r"\btuỳ\b", r"\btùy\b", r"\bdự kiến\b",
           r"\btối đa\b", r"\bvới cấu hình\b"],
    "ko": [r"경우", r"하면", r"온프레미스", r"에 따라", r"최대", r"예정", r"로드맵"],
}


def _mask(text):
    masked = text
    for pattern in MASKS:
        masked = re.sub(pattern, " ", masked, flags=re.IGNORECASE | re.UNICODE)
    return masked


def _variants(token):
    token = token.strip(".,")
    if not token:
        return set()
    out = {token}
    out.add(token.replace(",", "."))
    out.add(token.replace(".", ","))
    out.add(token.replace(",", ""))
    out.add(token.replace(".", ""))
    out.add(token.replace(",", "").replace(".", ""))
    swapped = token.replace(".", "\0").replace(",", ".").replace("\0", ",")
    out.add(swapped)
    stripped = {v.lstrip("0") or "0" for v in out}
    return {v for v in out | stripped if v}


def _allowed_numbers(ledger):
    allowed = set()
    for claim in (ledger.get("claims") or {}).values():
        if claim.get("usable") is False:
            continue
        for number in claim.get("numbers") or []:
            allowed |= _variants(str(number))
        for token in NUMBER.findall(str(claim.get("statement", ""))):
            allowed |= _variants(token)
    # Years read as dates, and single digits used as list positions, are not claims.
    for year in range(2000, 2041):
        allowed.add(str(year))
    return allowed


def run(artifact, ledger=None, facts=None):
    report = C.Report("check_claims")
    ledger = ledger if ledger is not None else C.load_yaml(C.CLAIMS)
    claims = ledger.get("claims") or {}
    forbidden = ledger.get("forbidden") or {}
    policy = ledger.get("policy") or {}
    allowed = _allowed_numbers(ledger)
    marketing = artifact.get("content_type") == "marketing"

    for entry in artifact.get("entries", []):
        for claim_id in entry.get("claims") or []:
            if claim_id not in claims:
                report.add("CLAIM_UNKNOWN_ID", C.ERROR,
                           "entry cites %s, which is not in the ledger" % claim_id,
                           key=entry.get("key"),
                           repair="Add the claim to the ledger with a source, or drop the citation.")
                continue
            claim = claims[claim_id]
            if claim.get("usable") is False:
                report.add("CLAIM_UNSUPPORTED_USED", C.ERROR,
                           "entry cites %s, which is marked usable: false" % claim_id,
                           key=entry.get("key"))
            if claim.get("label") == "roadmap" and entry.get("label") != "roadmap":
                report.add("CLAIM_ROADMAP_UNLABELLED", C.ERROR,
                           "%s is a roadmap claim; the entry carries no roadmap label" % claim_id,
                           key=entry.get("key"),
                           repair='Set "label": "roadmap" and render the amber badge with the date.')
            for token in claim.get("required_tokens") or []:
                for locale, text in (entry.get("locales") or {}).items():
                    if token.lower() not in text.lower():
                        report.add("CLAIM_MISSING_REQUIRED_CONTEXT", C.ERROR,
                                   "%s must name %r wherever it is used" % (claim_id, token),
                                   key=entry.get("key"), locale=locale,
                                   repair=claim.get("qualification") or
                                          "Name the counterparty or benchmark in the copy.")

    for entry, key, locale, text in C.iter_texts(artifact):
        cited = [claims[c] for c in (entry.get("claims") or []) if c in claims]

        for fid, item in forbidden.items():
            for pattern in item.get("detect") or []:
                if re.search(pattern, text, re.IGNORECASE | re.UNICODE):
                    report.add("CLAIM_FORBIDDEN", C.ERROR,
                               "%s — %s" % (fid, item.get("reason", "forbidden claim")),
                               key=key, locale=locale, repair="Remove it. See %s."
                               % item.get("source", "docs/01-proof-bank.md"))

        absolutizer = [p for p in ABSOLUTIZERS.get(locale, [])
                       if re.search(p, text, re.IGNORECASE | re.UNICODE)]
        if absolutizer:
            qualified = any(re.search(p, text, re.IGNORECASE | re.UNICODE)
                            for p in QUALIFIER_SIGNALS.get(locale, []))
            conditional = any(c.get("usable") == "conditional" for c in cited)
            if conditional and not qualified:
                report.add("CLAIM_STRENGTH_DRIFT", C.ERROR,
                           "absolute wording (%s) on a conditional claim" % absolutizer[0],
                           key=key, locale=locale,
                           repair="Restore the condition; conditional claims stay conditional "
                                  "in every locale.")
            elif not qualified:
                report.add("CLAIM_STRENGTH_DRIFT", C.WARNING,
                           "absolute wording (%s) with no stated condition" % absolutizer[0],
                           key=key, locale=locale)

        if not marketing or not policy.get("require_proof_for_numbers", True):
            continue
        for token in NUMBER.findall(_mask(text)):
            if _variants(token) & allowed:
                continue
            report.add("CLAIM_UNSUPPORTED_NUMBER", C.ERROR,
                       "the figure %r has no entry in the claim ledger" % token,
                       key=key, locale=locale,
                       repair="Add it to content-system/claims/approved.yaml with a source from "
                              "docs/01-proof-bank.md, or remove it.")

    report.add("INFO_LEDGER", C.INFO, "%d claims, %d forbidden statements"
               % (len(claims), len(forbidden)))
    return report


def main(argv=None):
    parser = C.base_parser(__doc__.splitlines()[0])
    parser.add_argument("--claims", default=str(C.CLAIMS), help="claim ledger path")
    parser.add_argument("--content", dest="content_flag", help="artifact path (same as positional)")
    args = parser.parse_args(argv)
    if args.content_flag:
        args.content = args.content_flag
    path = C.resolve_content_arg(parser, args)
    return C.emit(run(C.load_artifact(path), C.load_yaml(args.claims)), args.json)


if __name__ == "__main__":
    sys.exit(main())
