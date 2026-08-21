"""The project's own source of truth must stay loadable and schema-valid."""

import unittest

from _helpers import DATA, SKILL
import validate_schema


class TestProjectData(unittest.TestCase):
    def _validate(self, relative):
        report = validate_schema.run(DATA / relative)
        self.assertEqual([f.reason for f in report.findings if f.severity == "ERROR"], [],
                         "%s failed schema validation" % relative)

    def test_glossary_is_valid(self):
        self._validate("terminology/glossary.yaml")

    def test_claim_ledger_is_valid(self):
        self._validate("claims/approved.yaml")

    def test_every_claim_cites_a_source(self):
        import _common as C
        ledger = C.load_yaml(DATA / "claims" / "approved.yaml")
        for cid, claim in ledger["claims"].items():
            self.assertTrue(claim.get("source"), "%s has no source" % cid)

    def test_conditional_claims_carry_their_qualification(self):
        import _common as C
        ledger = C.load_yaml(DATA / "claims" / "approved.yaml")
        for cid, claim in ledger["claims"].items():
            if claim.get("usable") == "conditional":
                self.assertTrue(claim.get("qualification"),
                                "%s is conditional but states no qualification" % cid)

    def test_forbidden_claims_are_detectable(self):
        import _common as C
        ledger = C.load_yaml(DATA / "claims" / "approved.yaml")
        for fid, item in ledger["forbidden"].items():
            self.assertTrue(item.get("detect"), "%s has no detect patterns" % fid)
            self.assertTrue(item.get("reason"), "%s has no reason" % fid)

    def test_glossary_covers_every_supported_locale(self):
        import _common as C
        glossary = C.load_yaml(DATA / "terminology" / "glossary.yaml")
        supported = set(C.load_yaml(DATA / "brand" / "voice.yaml")["locales"]["supported"])
        for name, term in glossary["terms"].items():
            self.assertEqual(supported - set(term["locales"]), set(),
                             "`%s` is missing a locale" % name)

    def test_schemas_are_wellformed_json(self):
        import json
        for path in sorted((SKILL / "schemas").glob("*.json")):
            with open(path, encoding="utf-8") as handle:
                json.load(handle)


if __name__ == "__main__":
    unittest.main()
