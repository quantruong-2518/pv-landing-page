"""Placeholder gate — a dropped variable fails at runtime, in front of a user."""

import unittest

from _helpers import entry, errors, make, rules
import check_placeholders


def check(*entries, **kw):
    return check_placeholders.run(make("product_ui", list(entries), **kw))


class TestPlaceholders(unittest.TestCase):
    def test_matching_sets_pass(self):
        report = check(entry("t.k", "toast", {"en": "{count} leads for {owner}",
                                              "vi": "{count} lead cho {owner}",
                                              "ko": "{owner}님의 리드 {count}개"}))
        self.assertEqual(errors(report), set())

    def test_dropped_placeholder(self):
        report = check(entry("t.k", "toast", {"en": "{count} leads", "vi": "Các lead", "ko": "리드"}))
        self.assertIn("I18N_PLACEHOLDER_MISSING", errors(report))

    def test_renamed_placeholder(self):
        report = check(entry("t.k", "toast", {"en": "{count} leads", "vi": "{soluong} lead",
                                              "ko": "리드 {count}개"}))
        self.assertIn("I18N_PLACEHOLDER_CHANGED", errors(report))

    def test_translated_placeholder(self):
        report = check(entry("t.k", "toast", {"en": "{owner} assigned", "vi": "{owner} đã gán",
                                              "ko": "{담당자}가 지정함"}))
        self.assertIn("I18N_PLACEHOLDER_TRANSLATED", errors(report))

    def test_unbalanced_braces(self):
        report = check(entry("t.k", "toast", {"en": "{count leads"}), locales=("en",))
        self.assertIn("I18N_PLACEHOLDER_UNBALANCED", errors(report))


class TestPlurals(unittest.TestCase):
    def test_english_two_forms_are_fine(self):
        report = check(entry("t.k", "toast",
                             {"en": "{count, plural, one {# lead} other {# leads}}"}),
                       locales=("en",))
        self.assertEqual(errors(report), set())

    def test_english_plural_grammar_templated_onto_vietnamese(self):
        report = check(entry("t.k", "toast",
                             {"vi": "{count, plural, one {# lead} other {# lead}}"}),
                       locales=("vi",))
        self.assertIn("I18N_PLURAL_INVALID_CATEGORY", errors(report))

    def test_korean_single_form_passes(self):
        report = check(entry("t.k", "toast", {"ko": "{count, plural, other {리드 #개}}"}),
                       locales=("ko",))
        self.assertEqual(errors(report), set())

    def test_missing_other_branch(self):
        report = check(entry("t.k", "toast", {"en": "{count, plural, one {# lead}}"}),
                       locales=("en",))
        self.assertIn("I18N_PLURAL_MISSING_OTHER", errors(report))


if __name__ == "__main__":
    unittest.main()
