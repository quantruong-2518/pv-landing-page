"""Terminology gate."""

import unittest

from _helpers import DATA, entry, errors, make, rules
import _common as C
import check_terms

GLOSSARY = C.load_yaml(DATA / "terminology" / "glossary.yaml")


def check(*entries, **kw):
    return check_terms.run(make(kw.pop("content_type", "product_ui"), list(entries), **kw), GLOSSARY)


class TestForbiddenVariants(unittest.TestCase):
    def test_vietnamese_variant_that_changes_the_entity(self):
        report = check(entry("l.title", "label", {"vi": "Danh sách khách hàng tiềm năng"}),
                       locales=("vi",))
        self.assertIn("TERM_FORBIDDEN_VARIANT", errors(report))

    def test_english_variant(self):
        report = check(entry("l.title", "label", {"en": "Prospect owner"}), locales=("en",))
        self.assertIn("TERM_FORBIDDEN_VARIANT", errors(report))

    def test_korean_variant(self):
        report = check(entry("l.title", "label", {"ko": "잠재고객 목록"}), locales=("ko",))
        self.assertIn("TERM_FORBIDDEN_VARIANT", errors(report))

    def test_preferred_terms_pass(self):
        report = check(entry("l.title", "label", {"en": "Lead owner", "vi": "Người phụ trách lead",
                                                  "ko": "리드 담당자"}))
        self.assertNotIn("TERM_FORBIDDEN_VARIANT", rules(report))


class TestScope(unittest.TestCase):
    def test_app_entity_terms_do_not_govern_marketing_copy(self):
        # "khách hàng" is ordinary Vietnamese on a landing page; it is only wrong as a name
        # for the `lead` entity inside the product.
        report = check(entry("h.body", "body", {"vi": "Khách hàng của chúng tôi ở Hà Nội."}),
                       content_type="marketing", locales=("vi",))
        self.assertNotIn("TERM_FORBIDDEN_VARIANT", rules(report))

    def test_app_entity_terms_do_govern_product_copy(self):
        report = check(entry("l.body", "label", {"vi": "Khách hàng"}), locales=("vi",))
        self.assertIn("TERM_FORBIDDEN_VARIANT", errors(report))


class TestAsymmetry(unittest.TestCase):
    def test_asymmetry_is_reported_but_never_fails(self):
        report = check(entry("l.title", "label",
                             {"en": "Assigned", "vi": "Người phụ trách", "ko": "담당자"}))
        findings = [f for f in report.findings if f.rule == "TERM_PREFERRED_MISSING"]
        self.assertTrue(findings)
        self.assertEqual({f.severity for f in findings}, {"INFO"})
        self.assertFalse(report.failed)

    def test_placeholder_names_are_not_prose(self):
        report = check(entry("l.body", "body",
                             {"en": "{owner} owns this.", "vi": "{owner} phụ trách mục này.",
                              "ko": "{owner}님이 담당합니다."}))
        self.assertNotIn("TERM_PREFERRED_MISSING", rules(report))


if __name__ == "__main__":
    unittest.main()
