#!/usr/bin/env python3
"""Deterministic product UX linter — vague actions, leaked internals, length, duplicates.

Product UI is graded on whether a user can read the state and finish the task.
Nothing here scores persuasion; see references/product/qa.md.
"""

import re
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import _common as C

VAGUE_ACTIONS = {
    "en": {"ok", "okay", "yes", "no", "confirm", "continue", "submit", "done", "proceed", "go"},
    "vi": {"đồng ý", "xác nhận", "tiếp tục", "gửi", "có", "không", "ok", "hoàn tất"},
    "ko": {"확인", "예", "아니오", "계속", "제출", "완료"},
}

# The escape hatch is a real acknowledgement with no alternative action.
VAGUE_EXEMPT_NOTE = "acknowledgement-only"

CANCELS = {"cancel", "huỷ", "hủy", "취소", "close", "đóng", "닫기", "back", "quay lại", "뒤로"}

TECHNICAL_LEAKAGE = [
    r"\b(HTTP\s*)?(4\d{2}|5\d{2})\b(?=\s*(error|\.|$|:))",
    r"\berror\s+\d{3}\b", r"\blỗi\s+\d{3}\b", r"\b오류\s*\d{3}\b",
    r"\b\w+Exception\b", r"\btraceback\b", r"\bstack trace\b", r"\bnull pointer\b",
    r"\bundefined\b", r"\bNaN\b", r"\bECONN\w*\b", r"\berrno\b",
    r"\bSQL(?:State)?\b", r"\bconstraint violation\b", r"\bsegmentation fault\b",
]

GENERIC_FAILURE = {
    "en": [r"something went wrong", r"an error (has )?occurred", r"oops"],
    "vi": [r"đã có lỗi xảy ra", r"có lỗi xảy ra", r"rất tiếc"],
    "ko": [r"문제가 발생했습니다", r"오류가 발생했습니다"],
}

# Persuasion in an operational surface. See references/product/ux-writing.md.
MARKETING_VOICE = {
    "en": [r"\bjourney\b", r"\bunlock\b", r"\bempower\b", r"\bseamless\b", r"\bsmarter\b",
           r"\btransform\b", r"\bsupercharge\b", r"\belevate\b", r"\bget started today\b"],
    "vi": [r"hành trình", r"khai phá", r"nâng tầm", r"thông minh hơn", r"bứt phá", r"đột phá"],
    "ko": [r"여정", r"혁신적", r"한 단계 도약", r"더 스마트한"],
}

# Translationese tells that survive fluent grammar. See references/locales/{ko,vi}.md.
KO_SENTENCE_ENDINGS = re.compile(r"(합니다|습니다|하세요|하십시오|할까요)[.?!]?$")
VI_PRONOUN_PADDING = re.compile(r"^\s*(bạn hãy|vui lòng|xin vui lòng|quý khách)\b", re.IGNORECASE)

LABEL_COMPONENTS = {"button", "label", "nav", "tab", "menu", "table_header", "filter"}
LIMIT_COMPONENTS = {"button", "tab", "menu", "dialog_title", "toast", "helper_text", "table_header"}

STOPWORDS = {
    "the", "a", "an", "this", "that", "your", "you", "will", "be", "is", "are", "and", "or", "to",
    "of", "it", "its", "in", "on", "for", "with", "can", "cannot", "not",
    "này", "các", "và", "sẽ", "bị", "được", "không", "của", "cho",
}


def _content_words(text):
    cleaned = re.sub(r"[^\w\s가-힣]", " ", C.strip_placeholders(text), flags=re.UNICODE).lower()
    return {w for w in cleaned.split() if len(w) > 1 and w not in STOPWORDS}


def _ko_tokens(text):
    """Korean has no spaces around morphemes we can rely on — compare substrings of length 2+."""
    letters = re.findall(r"[가-힣]{2,}", text)
    return {piece[i:i + 2] for piece in letters for i in range(len(piece) - 1)}


def _shares_action(title, label, locale):
    if locale == "ko":
        return bool(_ko_tokens(title) & _ko_tokens(label))
    return bool(_content_words(title) & _content_words(label))


def run(artifact, config=None):
    report = C.Report("lint_product")
    if artifact.get("content_type") != "product_ui":
        report.add("LINT_SKIPPED", C.INFO, "artifact is not product UI content")
        return report

    config = config or C.voice_config()
    limits = config.get("ui_limits") or {}

    labels = defaultdict(list)
    groups = defaultdict(list)

    for entry in artifact.get("entries", []):
        groups[C.key_group(entry.get("key", "?"))].append(entry)

    for entry, key, locale, text in C.iter_texts(artifact):
        component = entry.get("component", "label")
        stripped = text.strip()
        if not stripped:
            report.add("I18N_MISSING_KEY", C.ERROR, "empty string for a declared locale",
                       key=key, locale=locale)
            continue

        if component in ("button", "cta"):
            if C.norm(stripped) in VAGUE_ACTIONS.get(locale, set()) \
                    and VAGUE_EXEMPT_NOTE not in (entry.get("notes") or ""):
                report.add("PRODUCT_VAGUE_ACTION", C.ERROR,
                           "button label %r does not name the action" % stripped,
                           key=key, locale=locale,
                           repair="Use verb + object, e.g. the action from the dialog title. "
                                  "If it truly is a bare acknowledgement, set notes to "
                                  "\"acknowledgement-only\".")
            if stripped.endswith((".", "。")):
                report.add("STYLE_TERMINAL_PERIOD", C.WARNING,
                           "button labels do not take a terminal period", key=key, locale=locale)

        if component in ("label", "table_header", "tab", "menu") and stripped.endswith((".", "。")):
            report.add("STYLE_TERMINAL_PERIOD", C.WARNING,
                       "%s does not take a terminal period" % component, key=key, locale=locale)

        for pattern in [p for p in TECHNICAL_LEAKAGE
                        if re.search(p, stripped, re.IGNORECASE | re.UNICODE)]:
            if entry.get("notes") and "expose_technical_detail" in entry["notes"]:
                continue
            report.add("PRODUCT_TECHNICAL_LEAKAGE", C.ERROR,
                       "internal detail exposed to the user (%s)" % pattern, key=key, locale=locale,
                       repair="State what happened and what to do. Keep the code in the logs, or "
                              "give a support reference the user can quote.")

        if component in ("button", "cta", "tab", "menu", "table_header"):
            if locale == "ko" and KO_SENTENCE_ENDINGS.search(stripped):
                report.add("LOCALE_KO_SENTENCE_LABEL", C.WARNING,
                           "Korean labels take the noun form — %r is a sentence" % stripped,
                           key=key, locale=locale,
                           repair="Use the noun form: 저장, 삭제, 캠페인 삭제.")
            if locale == "vi" and VI_PRONOUN_PADDING.search(stripped):
                report.add("LOCALE_VI_PRONOUN_PADDING", C.WARNING,
                           "Vietnamese labels use the bare imperative — drop the pronoun",
                           key=key, locale=locale,
                           repair="`Chọn người phụ trách`, not `Bạn hãy chọn người phụ trách`.")

        for pattern in MARKETING_VOICE.get(locale, []):
            if re.search(pattern, stripped, re.IGNORECASE | re.UNICODE):
                report.add("PRODUCT_MARKETING_VOICE", C.WARNING,
                           "persuasion language in an operational surface (%s)" % pattern,
                           key=key, locale=locale,
                           repair="Say what the state is and what the user can do. "
                                  "Brand voice belongs on marketing pages.")

        if component in ("error", "warning"):
            for pattern in GENERIC_FAILURE.get(locale, []):
                if re.search(pattern, stripped, re.IGNORECASE | re.UNICODE):
                    report.add("PRODUCT_GENERIC_FAILURE", C.WARNING,
                               "generic failure text — legitimate only when the cause is unknown",
                               key=key, locale=locale,
                               repair="If the system knows the cause, name it and the next action.")

        limit = (limits.get(component) or {}).get(locale)
        if component in LIMIT_COMPONENTS and limit and len(stripped) > limit:
            report.add("STYLE_LABEL_TOO_LONG", C.WARNING,
                       "%d characters, soft limit %d for %s/%s"
                       % (len(stripped), limit, component, locale), key=key, locale=locale,
                       repair="Resize the component or cut words — never cut the meaning.")

        if component in LABEL_COMPONENTS and C.norm(stripped) not in CANCELS:
            labels[(locale, component, C.norm(stripped))].append(key)

    for (locale, component, _), keys in labels.items():
        if len(set(keys)) > 1:
            report.add("STYLE_DUPLICATE_TEXT", C.WARNING,
                       "same %s label under %s — two controls, one name"
                       % (component, ", ".join(sorted(set(keys)))),
                       key=sorted(keys)[0], locale=locale)

    for group, entries in groups.items():
        titles = [e for e in entries if e.get("component") == "dialog_title"]
        primaries = [e for e in entries
                     if e.get("component") == "button" and e.get("primary_action")]
        destructive = any(e.get("destructive") for e in entries)
        if destructive and titles and primaries:
            for locale in artifact.get("locales", []):
                title = (titles[0].get("locales") or {}).get(locale, "")
                label = (primaries[0].get("locales") or {}).get(locale, "")
                if title and label and not _shares_action(title, label, locale):
                    report.add("PRODUCT_DESTRUCTIVE_ACTION_MISMATCH", C.ERROR,
                               "confirm button %r does not repeat the action in %r"
                               % (label, title), key=primaries[0].get("key"), locale=locale,
                               repair="Name the destructive action on the button itself.")
        if destructive and not primaries:
            report.add("PRODUCT_DESTRUCTIVE_ACTION_MISMATCH", C.ERROR,
                       "destructive group %s has no entry marked primary_action" % group, key=group)

        empties = [e for e in entries if e.get("component") == "empty_state"]
        if empties and not any(e.get("component") in ("button", "cta") for e in entries):
            report.add("PRODUCT_MISSING_ACTION", C.WARNING,
                       "empty state with no action the user can take", key=group,
                       repair="Offer the action that fills the state, or say why there is none.")

    report.add("INFO_COVERAGE", C.INFO,
               "%d entries × %d locales" % (len(artifact.get("entries", [])),
                                            len(artifact.get("locales", []))))
    return report


def main(argv=None):
    parser = C.base_parser(__doc__.splitlines()[0])
    args = parser.parse_args(argv)
    path = C.resolve_content_arg(parser, args)
    return C.emit(run(C.load_artifact(path)), args.json)


if __name__ == "__main__":
    sys.exit(main())
