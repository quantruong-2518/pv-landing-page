"""Key parity, in both bundle mode and artifact mode."""

import json
import tempfile
import unittest
from pathlib import Path

from _helpers import DATA, entry, errors, make
import check_i18n


class TestArtifactMode(unittest.TestCase):
    def test_declared_locale_with_no_string(self):
        report = check_i18n.run_artifact(make("product_ui", [
            entry("a.b", "button", {"en": "Save changes", "vi": "Lưu thay đổi"})]))
        self.assertIn("I18N_MISSING_KEY", errors(report))

    def test_empty_string(self):
        report = check_i18n.run_artifact(make("product_ui", [
            entry("a.b", "button", {"en": "Save", "vi": "", "ko": "저장"})]))
        self.assertIn("I18N_EMPTY_VALUE", errors(report))

    def test_undeclared_locale(self):
        report = check_i18n.run_artifact(make("product_ui", [
            entry("a.b", "button", {"en": "Save", "ja": "保存"})], locales=("en",)))
        self.assertIn("I18N_KEY_MISMATCH", errors(report))

    def test_duplicate_key(self):
        report = check_i18n.run_artifact(make("product_ui", [
            entry("a.b", "button", {"en": "Save"}), entry("a.b", "button", {"en": "Store"})],
            locales=("en",)))
        self.assertIn("I18N_DUPLICATE_KEY", errors(report))


class TestBundleMode(unittest.TestCase):
    def test_project_bundles_are_at_parity(self):
        report = check_i18n.run_bundles(DATA / "i18n")
        self.assertEqual(errors(report), set())

    def test_missing_and_extra_keys_are_both_caught(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "en.json").write_text(json.dumps({"a": {"b": "B"}, "c": "C"}), encoding="utf-8")
            (root / "vi.json").write_text(json.dumps({"a": {"b": "B"}, "d": "D"}), encoding="utf-8")
            report = check_i18n.run_bundles(root, canonical="en")
            found = errors(report)
            self.assertIn("I18N_MISSING_KEY", found)
            self.assertIn("I18N_KEY_MISMATCH", found)

    def test_flatten_walks_lists(self):
        flat = check_i18n.flatten({"a": [{"b": 1}, {"b": 2}]})
        self.assertEqual(sorted(flat), ["a[0].b", "a[1].b"])


if __name__ == "__main__":
    unittest.main()
