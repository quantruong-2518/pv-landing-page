"""The bundled JSON Schema subset validator."""

import unittest

from _helpers import SKILL, errors
import _common as C
import validate_schema as V

SCHEMA = C.load_json(SKILL / "schemas" / "i18n-output.schema.json")


class TestValidator(unittest.TestCase):
    def test_required_and_types(self):
        problems = V.validate({"content_type": "marketing"}, SCHEMA)
        joined = " ".join(m for _, m in problems)
        self.assertIn("id", joined)
        self.assertIn("entries", joined)

    def test_enum_rejects_unknown_locale(self):
        doc = {"content_type": "marketing", "id": "x", "locales": ["fr"],
               "entries": [{"key": "a.b", "locales": {"fr": "x"}}]}
        self.assertTrue(V.validate(doc, SCHEMA))

    def test_additional_properties_false(self):
        doc = {"content_type": "marketing", "id": "x", "locales": ["en"], "extra": 1,
               "entries": [{"key": "a.b", "locales": {"en": "x"}}]}
        self.assertTrue(any("extra" in m for _, m in V.validate(doc, SCHEMA)))

    def test_ref_resolution_reaches_definitions(self):
        doc = {"content_type": "marketing", "id": "x", "locales": ["en"],
               "entries": [{"key": "a b", "locales": {"en": "x"}}]}
        self.assertTrue(any("pattern" in m for _, m in V.validate(doc, SCHEMA)))

    def test_valid_document_is_clean(self):
        doc = {"content_type": "marketing", "id": "x", "locales": ["en"],
               "entries": [{"key": "a.b", "component": "body", "claims": ["C002"],
                            "locales": {"en": "x"}}]}
        self.assertEqual(V.validate(doc, SCHEMA), [])

    def test_schema_is_inferred_from_the_document(self):
        report = V.run(SKILL / "evals" / "regression" / "marketing-home-hero.golden.json")
        self.assertEqual(errors(report), set())


if __name__ == "__main__":
    unittest.main()
