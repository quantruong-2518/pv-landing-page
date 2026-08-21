"""The claim gate — the difference between a landing page and a press release."""

import unittest

from _helpers import DATA, entry, errors, make, rules
import _common as C
import check_claims

LEDGER = C.load_yaml(DATA / "claims" / "approved.yaml")


def check(*entries, **kw):
    return check_claims.run(make(kw.pop("content_type", "marketing"), list(entries), **kw), LEDGER)


def one(text, locale="en", **kw):
    return entry("test.block.line", "body", {locale: text}, **kw)


class TestNumbers(unittest.TestCase):
    def test_ledger_figure_passes(self):
        self.assertNotIn("CLAIM_UNSUPPORTED_NUMBER",
                         rules(check(one("MINT reaches 17.6 TOPS/W."), locales=("en",))))

    def test_vietnamese_decimal_comma_is_the_same_number(self):
        self.assertNotIn("CLAIM_UNSUPPORTED_NUMBER",
                         rules(check(one("MINT đạt 17,6 TOPS/W.", locale="vi"), locales=("vi",))))

    def test_invented_figure_is_an_error(self):
        self.assertIn("CLAIM_UNSUPPORTED_NUMBER",
                      errors(check(one("Cuts costs by 40%."), locales=("en",))))

    def test_placeholders_are_not_claims(self):
        self.assertNotIn("CLAIM_UNSUPPORTED_NUMBER",
                         rules(check(one("{count} leads imported."), locales=("en",))))

    def test_standards_and_part_numbers_are_not_claims(self):
        text = "Tested to UL 1699B and IEC 63027:2023 on ResNet-50 over PCIe Gen4."
        self.assertNotIn("CLAIM_UNSUPPORTED_NUMBER", rules(check(one(text), locales=("en",))))

    def test_product_ui_strings_are_not_number_checked(self):
        report = check(one("42 rows updated."), content_type="product_ui", locales=("en",))
        self.assertNotIn("CLAIM_UNSUPPORTED_NUMBER", rules(report))


class TestClaimIntegrity(unittest.TestCase):
    def test_unknown_claim_id(self):
        self.assertIn("CLAIM_UNKNOWN_ID",
                      errors(check(one("Anything.", claims=["C999"]), locales=("en",))))

    def test_roadmap_claim_must_carry_its_label(self):
        report = check(one("ESPRESSO delivers 160 TOPS in 2026.", claims=["C017"]), locales=("en",))
        self.assertIn("CLAIM_ROADMAP_UNLABELLED", errors(report))

    def test_roadmap_claim_with_the_label_passes(self):
        report = check(one("ESPRESSO delivers 160 TOPS — roadmap, September 2026.",
                           claims=["C017"], label="roadmap"), locales=("en",))
        self.assertNotIn("CLAIM_ROADMAP_UNLABELLED", rules(report))

    def test_benchmark_must_name_its_counterparty(self):
        report = check(one("PAPAYA FLEX is about 100 times more efficient.", claims=["C006"]),
                       locales=("en",))
        self.assertIn("CLAIM_MISSING_REQUIRED_CONTEXT", errors(report))

    def test_benchmark_with_counterparty_and_method_passes(self):
        report = check(one("PAPAYA FLEX reaches about 100 times the ResNet-50 efficiency of an "
                           "NVIDIA Jetson Nano.", claims=["C006"]), locales=("en",))
        self.assertNotIn("CLAIM_MISSING_REQUIRED_CONTEXT", rules(report))

    def test_strength_drift_on_a_conditional_claim(self):
        report = check(one("We guarantee your data never leaves the building.", claims=["C015"]),
                       locales=("en",))
        self.assertIn("CLAIM_STRENGTH_DRIFT", errors(report))

    def test_the_condition_kept_is_not_drift(self):
        report = check(one("Data stays inside your network when the model runs on-premise.",
                           claims=["C015"]), locales=("en",))
        self.assertNotIn("CLAIM_STRENGTH_DRIFT", rules(report))

    def test_drift_is_detected_in_every_locale(self):
        for locale, text in (("vi", "Chúng tôi đảm bảo dữ liệu không bao giờ rời tổ chức."),
                             ("ko", "데이터가 절대 외부로 나가지 않음을 보장합니다.")):
            report = check(one(text, locale=locale, claims=["C015"]), locales=(locale,))
            self.assertIn("CLAIM_STRENGTH_DRIFT", errors(report), locale)


class TestForbidden(unittest.TestCase):
    def test_arc_fault_attributed_to_the_parent(self):
        report = check(one("Pebble Square has shipped arc-fault detection since 2022."),
                       locales=("en",))
        self.assertIn("CLAIM_FORBIDDEN", errors(report))

    def test_arc_fault_as_pebble_vina_work_is_allowed(self):
        report = check(one("Pebble Vina builds the arc-fault application layer for Vietnam."),
                       locales=("en",))
        self.assertNotIn("CLAIM_FORBIDDEN", rules(report))

    def test_ghost_source_is_refused(self):
        report = check(one("See MDPI Electronics 2024 for the method."), locales=("en",))
        self.assertIn("CLAIM_FORBIDDEN", errors(report))

    def test_wholly_owned_subsidiary_is_refused(self):
        report = check(one("Pebble Vina is a wholly-owned subsidiary."), locales=("en",))
        self.assertIn("CLAIM_FORBIDDEN", errors(report))


if __name__ == "__main__":
    unittest.main()
