"""Every rule id the scripts can emit must appear in the rule catalogue.

Documentation drifts silently; this makes it fail loudly instead.
"""

import re
import unittest

from _helpers import SKILL

CATALOGUE = SKILL / "references" / "core" / "rules.md"
EMITTED = re.compile(r'report\.add\(\s*"([A-Z][A-Z0-9_]*)"')


class TestRulesDocumented(unittest.TestCase):
    def test_no_undocumented_rule(self):
        documented = set(re.findall(r"`([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+)`",
                                    CATALOGUE.read_text(encoding="utf-8")))
        emitted = set()
        for path in sorted((SKILL / "scripts").glob("*.py")):
            emitted |= set(EMITTED.findall(path.read_text(encoding="utf-8")))
        self.assertEqual(emitted - documented, set(),
                         "rules emitted by the scripts but missing from rules.md")

    def test_catalogue_does_not_invent_rules(self):
        """Ids in the catalogue must exist in the scripts, except the reviewer-only section."""
        text = CATALOGUE.read_text(encoding="utf-8")
        deterministic = text.split("## Reviewer-only")[0]
        documented = set(re.findall(r"`([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+)`", deterministic))
        emitted = set()
        for path in sorted((SKILL / "scripts").glob("*.py")):
            emitted |= set(EMITTED.findall(path.read_text(encoding="utf-8")))
        self.assertEqual(documented - emitted, set(),
                         "rules documented in rules.md that no script emits")


if __name__ == "__main__":
    unittest.main()
