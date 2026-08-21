"""One test per marketing rule — a rule that stops firing must fail the build."""

import unittest

from _helpers import entry, errors, make, rules
import lint_marketing


def lint(*entries, **kw):
    return lint_marketing.run(make("marketing", list(entries), **kw))


def one(text, component="body", locale="en", **kw):
    return entry("test.block.line", component, {locale: text}, **kw)


class TestSlopPatterns(unittest.TestCase):
    def test_generic_opening(self):
        self.assertIn("AI_SLOP_GENERIC_OPENING",
                      rules(lint(one("In today's fast-moving market, we build chips."))))

    def test_generic_opening_only_at_the_start(self):
        self.assertNotIn("AI_SLOP_GENERIC_OPENING",
                         rules(lint(one("Power budgets are tighter nowadays than in 2019."))))

    def test_empty_benefit_without_mechanism_is_an_error(self):
        self.assertIn("AI_SLOP_EMPTY_BENEFIT", errors(lint(one("We help you optimize operations."))))

    def test_empty_benefit_with_a_mechanism_is_only_a_warning(self):
        report = lint(one("Runs inference on the device, so you optimize operations without a link."))
        self.assertIn("AI_SLOP_EMPTY_BENEFIT", rules(report))
        self.assertNotIn("AI_SLOP_EMPTY_BENEFIT", errors(report))

    def test_adjective_stack(self):
        self.assertIn("AI_SLOP_ADJECTIVE_STACK",
                      rules(lint(one("A powerful, flexible, secure platform."))))

    def test_formulaic_triple(self):
        self.assertIn("AI_SLOP_FORMULAIC_TRIPLE", rules(lint(one("Build. Scale. Transform."))))

    def test_empty_contrast(self):
        self.assertIn("AI_SLOP_EMPTY_CONTRAST",
                      rules(lint(one("Not just a chip, but a platform."))))

    def test_artificial_conclusion(self):
        self.assertIn("AI_SLOP_ARTIFICIAL_CONCLUSION", rules(lint(one("The future starts here."))))

    def test_rhetorical_question_in_body(self):
        self.assertIn("AI_SLOP_RHETORICAL_QUESTION",
                      rules(lint(one("So what does that actually mean for your plant?"))))

    def test_over_symmetry_across_siblings(self):
        entries = [entry("f.points[%d].title" % i, "list_item",
                         {"en": "alpha beta gamma delta%d" % i}) for i in range(3)]
        self.assertIn("AI_SLOP_OVER_SYMMETRY", rules(lint(*entries)))

    def test_vietnamese_patterns(self):
        report = lint(one("Trong kỷ nguyên số, giải pháp toàn diện giúp bạn nâng tầm vận hành.",
                          locale="vi"))
        self.assertIn("AI_SLOP_GENERIC_OPENING", rules(report))
        self.assertIn("AI_SLOP_EMPTY_BENEFIT", rules(report))

    def test_korean_patterns(self):
        report = lint(one("오늘날 급변하는 환경에서 운영 최적화를 지원합니다.", locale="ko"))
        self.assertIn("AI_SLOP_GENERIC_OPENING", rules(report))
        self.assertIn("AI_SLOP_EMPTY_BENEFIT", rules(report))


class TestClaimsAndStyle(unittest.TestCase):
    def test_superlative_is_an_error_in_each_locale(self):
        for locale, text in (("en", "The leading AI chip company."),
                             ("vi", "Công ty chip AI hàng đầu."),
                             ("ko", "업계 최고의 AI 반도체 기업.")):
            self.assertIn("CLAIM_UNSUPPORTED_SUPERLATIVE",
                          errors(lint(one(text, locale=locale))), locale)

    def test_duplicate_text_across_keys(self):
        report = lint(entry("a.one", "body", {"en": "Inference runs on the device."}),
                      entry("a.two", "body", {"en": "Inference runs on the device."}))
        self.assertIn("STYLE_DUPLICATE_TEXT", errors(report))

    def test_headline_word_limit(self):
        long_headline = " ".join(["word"] * 14)
        self.assertIn("STYLE_HEADLINE_TOO_LONG",
                      rules(lint(one(long_headline, component="headline"))))

    def test_placeholder_leakage(self):
        self.assertIn("I18N_PLACEHOLDER_LEAKAGE", errors(lint(one("Hello {{name}} — TODO"))))

    def test_punctuation_tic(self):
        self.assertIn("STYLE_PUNCTUATION_TIC", rules(lint(one("Fast! Cheap! Small!"))))

    def test_empty_string_is_an_error(self):
        self.assertIn("STYLE_EMPTY_STRING", errors(lint(one("   "))))

    def test_clean_copy_produces_nothing(self):
        report = lint(one("MINT runs inference inside memory at 17.6 TOPS/W."))
        self.assertEqual(errors(report), set())
        self.assertEqual({f.rule for f in report.findings if f.severity == "WARNING"}, set())

    def test_product_artifacts_are_skipped(self):
        report = lint_marketing.run(make("product_ui", [one("The future starts here.")]))
        self.assertEqual(rules(report), {"LINT_SKIPPED"})


if __name__ == "__main__":
    unittest.main()


class TestRegister(unittest.TestCase):
    def test_vietnamese_bureaucratic_register(self):
        report = lint(one("Chúng tôi tiến hành thực hiện việc triển khai hệ thống.", locale="vi"))
        self.assertIn("LOCALE_BUREAUCRATIC_REGISTER", rules(report))

    def test_plain_vietnamese_passes(self):
        report = lint(one("Chúng tôi triển khai hệ thống tại nhà máy của bạn.", locale="vi"))
        self.assertNotIn("LOCALE_BUREAUCRATIC_REGISTER", rules(report))

    def test_english_administrative_register(self):
        report = lint(one("It should be noted that the system runs on-premise."))
        self.assertIn("LOCALE_BUREAUCRATIC_REGISTER", rules(report))
