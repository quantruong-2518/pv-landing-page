#!/usr/bin/env python3
"""Deterministic marketing linter — AI-slop patterns, superlatives, style, duplicates.

Patterns, not a blacklist: a phrase is only a defect when nothing checkable stands
behind it. See references/core/anti-ai-slop.md.
"""

import re
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import _common as C

# --- pattern tables -------------------------------------------------------

GENERIC_OPENINGS = {
    "en": [r"in today'?s\b", r"in the age of\b", r"in an era\b", r"in the world of\b",
           r"nowadays\b", r"in recent years\b", r"as technology (continues to )?evolve"],
    "vi": [r"trong kỷ nguyên", r"trong bối cảnh", r"ngày nay", r"trong thời đại",
           r"cùng với sự phát triển"],
    "ko": [r"오늘날", r"급변하는", r"AI 시대에", r"4차 산업혁명", r"바야흐로"],
}

EMPTY_BENEFITS = {
    "en": [r"optimi[sz]e (your )?operations", r"drive growth", r"enhance efficiency",
           r"unlock (possibilities|the power|potential)", r"create lasting value",
           r"transform your business", r"maximi[sz]e efficiency", r"boost productivity",
           r"take .{1,24} to the next level", r"streamline everything"],
    "vi": [r"tối ưu vận hành", r"nâng cao hiệu quả", r"thúc đẩy tăng trưởng", r"nâng tầm",
           r"bứt phá", r"khai phá tiềm năng", r"giải pháp toàn diện", r"chuyển đổi số toàn diện"],
    "ko": [r"운영 최적화", r"효율성 증대", r"비즈니스 혁신", r"한 단계 도약", r"가치를 창출"],
}

# Something checkable in the same string licenses an abstract benefit.
MECHANISM_SIGNALS = {
    "en": [r"\d", r"\bwithout\b", r"\binside\b", r"\bruns? on\b", r"\bon-premise\b",
           r"\bper\b", r"\binstead of\b", r"\bso that\b", r"\bby \w+ing\b"],
    "vi": [r"\d", r"không cần", r"ngay trong", r"tại chỗ", r"thay vì", r"bằng cách", r"nhờ"],
    "ko": [r"\d", r"없이", r"내부에서", r"대신", r"통해", r"온프레미스"],
}

EMPTY_CONTRAST = {
    "en": [r"not just .{1,40} but\b", r"more than just\b"],
    "vi": [r"không chỉ .{1,40} mà còn", r"không đơn thuần là"],
    "ko": [r"단순한 .{1,30} 아니라", r"뿐만 아니라 .{1,20}까지"],
}

ARTIFICIAL_CONCLUSIONS = {
    "en": [r"the future starts here", r"this is more than", r"the possibilities are endless",
           r"welcome to the future", r"the journey begins"],
    "vi": [r"tương lai bắt đầu từ đây", r"khả năng là vô hạn", r"hành trình bắt đầu",
           r"không chỉ là công nghệ"],
    "ko": [r"미래가 시작됩니다", r"가능성은 무한합니다", r"여정이 시작됩니다"],
}

SUPERLATIVES = {
    "en": [r"#\s?1\b", r"\bnumber one\b", r"\b(the )?leading\b", r"\bindustry[- ]leading\b",
           r"\bworld[- ]class\b", r"\bbest[- ]in[- ]class\b", r"\bthe best\b", r"\bfastest\b",
           r"\bmost advanced\b", r"\bunmatched\b", r"\bunparalleled\b", r"\bunrivalled\b",
           r"\bmilitary[- ]grade\b", r"\bzero data leakage\b", r"\bmarket leader\b",
           r"\bpioneer(ing)? the\b", r"\bfirst in vietnam\b"],
    "vi": [r"hàng đầu", r"số 1\b", r"số một", r"tốt nhất", r"nhanh nhất", r"mạnh nhất",
           r"duy nhất trên thị trường", r"đẳng cấp thế giới", r"tiên phong dẫn đầu",
           r"đầu tiên tại việt nam", r"tuyệt đối an toàn"],
    "ko": [r"업계 (최고|선도|1위)", r"세계 최고", r"최상의", r"1위\b", r"독보적", r"완벽한 보안"],
}

ADJECTIVES = {
    "en": {"powerful", "flexible", "secure", "intelligent", "innovative", "robust", "seamless",
           "scalable", "advanced", "cutting-edge", "modern", "comprehensive", "smart", "efficient",
           "reliable", "dynamic", "holistic", "transformative"},
    "vi": {"mạnh mẽ", "linh hoạt", "toàn diện", "hiện đại", "thông minh", "tiên tiến", "vượt trội",
           "đột phá", "ưu việt", "tối ưu", "chuyên nghiệp", "đáng tin cậy"},
    "ko": {"강력한", "혁신적인", "유연한", "안전한", "스마트한", "선진적인", "포괄적인", "효율적인"},
}

# Register tells, not vocabulary bans. See references/locales/vi.md.
BUREAUCRATIC = {
    "vi": [r"nhằm mục đích", r"đối với việc", r"trong khuôn khổ", r"tiến hành thực hiện",
           r"thực hiện việc", r"nhằm đáp ứng nhu cầu", r"góp phần vào việc"],
    "en": [r"\bwith regard to\b", r"\bin order to be able to\b", r"\bfor the purpose of\b",
           r"\bit should be noted that\b"],
    "ko": [r"~에 대하여", r"바 있습니다", r"하고자 합니다"],
}

LEAKAGE = [r"\{\{", r"%[sd]\b", r"\$\{", r"</?\d+>", r"\bTODO\b", r"\bTBD\b",
           r"lorem ipsum", r"\bXXX\b", r"\[placeholder\]"]

SAFE_REPEATS = {"cancel", "huỷ", "hủy", "취소", "close", "đóng", "닫기"}


def _hits(text, patterns):
    return [p for p in patterns if re.search(p, text, re.IGNORECASE | re.UNICODE)]


def _opens_with(text, patterns):
    head = text.strip()[:64]
    return [p for p in patterns if re.match(r"^\W*" + p, head, re.IGNORECASE | re.UNICODE)]


def _adjective_run(text, locale):
    vocabulary = ADJECTIVES.get(locale, set())
    if not vocabulary:
        return 0
    best = 0
    for chunk in re.split(r"[.;:!?\n]", text):
        pieces = re.split(r",| and | và | 및 |&", chunk, flags=re.IGNORECASE)
        run = sum(1 for piece in pieces
                  if any(C.has_word(piece, adjective) for adjective in vocabulary))
        best = max(best, run)
    return best


def _is_triple(text):
    parts = [p.strip() for p in re.split(r"[.!]", text) if p.strip()]
    if not 3 <= len(parts) <= 4:
        return False
    return all(len(C.words(p)) <= 3 for p in parts)


def run(artifact, config=None):
    report = C.Report("lint_marketing")
    if artifact.get("content_type") != "marketing":
        report.add("LINT_SKIPPED", C.INFO, "artifact is not marketing content")
        return report

    config = config or C.voice_config()
    headline_limit = ((config.get("marketing") or {}).get("hero") or {}).get("headline_soft_limit") or {}
    sentence_limit = ((config.get("marketing") or {}).get("body") or {}).get("sentence_soft_limit_words") or 28

    seen_text = defaultdict(list)
    shapes = defaultdict(list)

    for entry, key, locale, text in C.iter_texts(artifact):
        if not text.strip():
            report.add("STYLE_EMPTY_STRING", C.ERROR, "empty string in a shipped locale",
                       key=key, locale=locale)
            continue
        component = entry.get("component", "body")
        bare = C.strip_placeholders(text)

        for pattern in _opens_with(bare, GENERIC_OPENINGS.get(locale, [])):
            report.add("AI_SLOP_GENERIC_OPENING", C.WARNING,
                       "opens with a generic scene-setter (%s)" % pattern, key=key, locale=locale,
                       repair="Open with the specific thing this block is about.")

        benefit_hits = _hits(bare, EMPTY_BENEFITS.get(locale, []))
        if benefit_hits:
            supported = _hits(bare, MECHANISM_SIGNALS.get(locale, []))
            report.add("AI_SLOP_EMPTY_BENEFIT",
                       C.WARNING if supported else C.ERROR,
                       "abstract benefit (%s) %s" % (benefit_hits[0],
                                                     "with a mechanism nearby" if supported
                                                     else "with no mechanism in the same string"),
                       key=key, locale=locale,
                       repair="State the mechanism that produces the benefit, or delete the line.")

        for pattern in _hits(bare, EMPTY_CONTRAST.get(locale, [])):
            report.add("AI_SLOP_EMPTY_CONTRAST", C.WARNING,
                       "empty contrast construction (%s)" % pattern, key=key, locale=locale,
                       repair="Say what the difference does, or drop the contrast.")

        for pattern in _hits(bare, ARTIFICIAL_CONCLUSIONS.get(locale, [])):
            report.add("AI_SLOP_ARTIFICIAL_CONCLUSION", C.WARNING,
                       "closing line carries mood, not a fact or an action (%s)" % pattern,
                       key=key, locale=locale, repair="End with the next step or a fact.")

        for pattern in _hits(bare, SUPERLATIVES.get(locale, [])):
            report.add("CLAIM_UNSUPPORTED_SUPERLATIVE", C.ERROR,
                       "superlative claim (%s) with no ledger entry that could support it"
                       % pattern, key=key, locale=locale,
                       repair="Remove it, or replace it with the measured figure and its source.")

        if _adjective_run(bare, locale) >= 3:
            report.add("AI_SLOP_ADJECTIVE_STACK", C.WARNING,
                       "three or more evaluative adjectives in one run", key=key, locale=locale,
                       repair="Keep the one property that matters and give its evidence.")

        if _is_triple(bare):
            report.add("AI_SLOP_FORMULAIC_TRIPLE", C.WARNING,
                       "three short fragments used as an argument", key=key, locale=locale,
                       repair="Replace the rhythm with one sentence that says something.")

        if component in ("body", "subheadline") and bare.rstrip().endswith("?"):
            report.add("AI_SLOP_RHETORICAL_QUESTION", C.WARNING,
                       "body copy framed as a question the reader did not ask",
                       key=key, locale=locale)

        for pattern in _hits(bare, BUREAUCRATIC.get(locale, [])):
            report.add("LOCALE_BUREAUCRATIC_REGISTER", C.WARNING,
                       "administrative register (%s) — interfaces and landing pages are read at "
                       "speed" % pattern, key=key, locale=locale,
                       repair="Use the plain verb: `triển khai`, not `tiến hành thực hiện việc "
                              "triển khai`.")

        for pattern in _hits(text, LEAKAGE):
            report.add("I18N_PLACEHOLDER_LEAKAGE", C.ERROR,
                       "template or draft marker left in the copy (%s)" % pattern,
                       key=key, locale=locale)

        if re.search(r"!!|\?!|!\s*!", text) or text.count("!") > 1:
            report.add("STYLE_PUNCTUATION_TIC", C.WARNING, "excessive exclamation",
                       key=key, locale=locale)
        if text.count("—") >= 3:
            report.add("STYLE_PUNCTUATION_TIC", C.WARNING, "three or more em dashes in one string",
                       key=key, locale=locale)

        if component in ("headline", "eyebrow"):
            limit = headline_limit.get(locale)
            if limit and len(C.words(bare)) > limit:
                report.add("STYLE_HEADLINE_TOO_LONG", C.WARNING,
                           "%d words, soft limit %d for %s" % (len(C.words(bare)), limit, locale),
                           key=key, locale=locale)
        else:
            for sentence in C.sentences(bare):
                if len(C.words(sentence)) > sentence_limit:
                    report.add("STYLE_SENTENCE_TOO_LONG", C.WARNING,
                               "%d-word sentence, soft limit %d" % (len(C.words(sentence)), sentence_limit),
                               key=key, locale=locale)
                    break

        normalized = C.norm(bare)
        if normalized not in SAFE_REPEATS:
            seen_text[(locale, normalized)].append(key)
        shapes[(C.list_shape(key), locale)].append(len(C.words(bare)))

    for (locale, normalized), keys in seen_text.items():
        if len(keys) > 1:
            report.add("STYLE_DUPLICATE_TEXT", C.ERROR,
                       "identical string under %s" % ", ".join(sorted(keys)),
                       key=sorted(keys)[0], locale=locale,
                       repair="Say something different, or reuse one key instead of two.")

    for (group, locale), counts in shapes.items():
        if len(counts) >= 3 and len(set(counts)) == 1 and counts[0] >= 4:
            report.add("AI_SLOP_OVER_SYMMETRY", C.WARNING,
                       "%d sibling strings all exactly %d words — templated rhythm"
                       % (len(counts), counts[0]), key=group, locale=locale)

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
