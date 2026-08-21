"""Product UX linter — state, action, consequence, and what must never leak."""

import unittest

from _helpers import entry, errors, make, rules
import lint_product


def lint(*entries, **kw):
    return lint_product.run(make("product_ui", list(entries), **kw))


class TestActions(unittest.TestCase):
    def test_vague_button_in_each_locale(self):
        for locale, label in (("en", "OK"), ("vi", "Đồng ý"), ("ko", "확인")):
            report = lint(entry("d.confirm", "button", {locale: label}))
            self.assertIn("PRODUCT_VAGUE_ACTION", errors(report), locale)

    def test_acknowledgement_escape_hatch(self):
        report = lint(entry("d.ack", "button", {"en": "OK"}, notes="acknowledgement-only"))
        self.assertNotIn("PRODUCT_VAGUE_ACTION", rules(report))

    def test_specific_button_passes(self):
        self.assertNotIn("PRODUCT_VAGUE_ACTION",
                         rules(lint(entry("d.go", "button", {"en": "Delete campaign"}))))

    def test_destructive_button_must_repeat_the_verb(self):
        report = lint(
            entry("c.delete.title", "dialog_title", {"en": "Delete campaign?"}, destructive=True),
            entry("c.delete.confirm", "button", {"en": "Continue"},
                  destructive=True, primary_action=True),
            locales=("en",))
        self.assertIn("PRODUCT_DESTRUCTIVE_ACTION_MISMATCH", errors(report))

    def test_matching_destructive_pair_passes(self):
        report = lint(
            entry("c.delete.title", "dialog_title", {"en": "Delete campaign?"}, destructive=True),
            entry("c.delete.confirm", "button", {"en": "Delete campaign"},
                  destructive=True, primary_action=True),
            locales=("en",))
        self.assertNotIn("PRODUCT_DESTRUCTIVE_ACTION_MISMATCH", rules(report))

    def test_korean_destructive_pair_matches_on_morphemes(self):
        report = lint(
            entry("c.delete.title", "dialog_title", {"ko": "캠페인을 삭제할까요?"}, destructive=True),
            entry("c.delete.confirm", "button", {"ko": "캠페인 삭제"},
                  destructive=True, primary_action=True),
            locales=("ko",))
        self.assertNotIn("PRODUCT_DESTRUCTIVE_ACTION_MISMATCH", rules(report))

    def test_destructive_group_without_a_primary_action(self):
        report = lint(entry("c.delete.title", "dialog_title", {"en": "Delete campaign?"},
                            destructive=True), locales=("en",))
        self.assertIn("PRODUCT_DESTRUCTIVE_ACTION_MISMATCH", errors(report))


class TestStateAndLeakage(unittest.TestCase):
    def test_technical_leakage(self):
        for text in ("Error 409.", "NullPointerException in LeadService", "Traceback follows"):
            self.assertIn("PRODUCT_TECHNICAL_LEAKAGE",
                          errors(lint(entry("e.body", "error", {"en": text}), locales=("en",))), text)

    def test_leakage_can_be_opted_into(self):
        report = lint(entry("e.body", "error", {"en": "Quote reference 409 to support."},
                            notes="expose_technical_detail"), locales=("en",))
        self.assertNotIn("PRODUCT_TECHNICAL_LEAKAGE", rules(report))

    def test_generic_failure_text_is_flagged(self):
        report = lint(entry("e.body", "error", {"en": "Something went wrong. Please try again."}),
                      locales=("en",))
        self.assertIn("PRODUCT_GENERIC_FAILURE", rules(report))

    def test_marketing_voice_in_product_surface(self):
        report = lint(entry("l.empty.title", "empty_state",
                            {"en": "Start your journey to smarter sales"}), locales=("en",))
        self.assertIn("PRODUCT_MARKETING_VOICE", rules(report))

    def test_empty_state_without_an_action(self):
        report = lint(entry("l.empty.title", "empty_state", {"en": "No leads yet"}),
                      locales=("en",))
        self.assertIn("PRODUCT_MISSING_ACTION", rules(report))

    def test_empty_state_with_an_action_passes(self):
        report = lint(entry("l.empty.title", "empty_state", {"en": "No leads yet"}),
                      entry("l.empty.action", "button", {"en": "Import leads"}),
                      locales=("en",))
        self.assertNotIn("PRODUCT_MISSING_ACTION", rules(report))


class TestStyle(unittest.TestCase):
    def test_label_length_warning(self):
        report = lint(entry("t.b", "button", {"ko": "매우 긴 한국어 버튼 라벨입니다 정말로 깁니다"}),
                      locales=("ko",))
        self.assertIn("STYLE_LABEL_TOO_LONG", rules(report))

    def test_terminal_period_on_a_button(self):
        report = lint(entry("t.b", "button", {"en": "Save changes."}), locales=("en",))
        self.assertIn("STYLE_TERMINAL_PERIOD", rules(report))

    def test_cancel_may_repeat(self):
        report = lint(entry("a.cancel", "button", {"en": "Cancel"}),
                      entry("b.cancel", "button", {"en": "Cancel"}), locales=("en",))
        self.assertNotIn("STYLE_DUPLICATE_TEXT", rules(report))

    def test_two_controls_one_name(self):
        report = lint(entry("a.save", "button", {"en": "Save"}),
                      entry("b.save", "button", {"en": "Save"}), locales=("en",))
        self.assertIn("STYLE_DUPLICATE_TEXT", rules(report))

    def test_marketing_artifacts_are_skipped(self):
        self.assertEqual(rules(lint_product.run(make("marketing", [
            entry("x.y", "button", {"en": "OK"})]))), {"LINT_SKIPPED"})


if __name__ == "__main__":
    unittest.main()


class TestLocaleNativeness(unittest.TestCase):
    def test_korean_sentence_form_on_a_button(self):
        report = lint(entry("t.b", "button", {"ko": "저장합니다"}), locales=("ko",))
        self.assertIn("LOCALE_KO_SENTENCE_LABEL", rules(report))

    def test_korean_noun_form_passes(self):
        report = lint(entry("t.b", "button", {"ko": "변경사항 저장"}), locales=("ko",))
        self.assertNotIn("LOCALE_KO_SENTENCE_LABEL", rules(report))

    def test_vietnamese_pronoun_padding_on_a_label(self):
        report = lint(entry("t.b", "button", {"vi": "Bạn hãy chọn người phụ trách"}),
                      locales=("vi",))
        self.assertIn("LOCALE_VI_PRONOUN_PADDING", rules(report))

    def test_vietnamese_bare_imperative_passes(self):
        report = lint(entry("t.b", "button", {"vi": "Chọn người phụ trách"}), locales=("vi",))
        self.assertNotIn("LOCALE_VI_PRONOUN_PADDING", rules(report))
