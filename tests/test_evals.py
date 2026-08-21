"""Eval contract: every fixture must still trigger the rules it was written to trigger.

This is the regression net. A rule that quietly stops firing — a pattern list edited, a
severity relaxed — fails here rather than shipping unsupported copy six weeks later.
"""

import unittest

from _helpers import EVALS, load_expectations
import run_checks


class TestEvalFixtures(unittest.TestCase):
    def test_expectations_cover_every_fixture(self):
        declared = set(load_expectations())
        on_disk = {str(p.relative_to(EVALS)) for p in EVALS.rglob("*.json")
                   if p.name != "expectations.json"}
        self.assertEqual(on_disk - declared, set(),
                         "fixtures with no entry in expectations.json")

    def test_fixtures_behave_as_declared(self):
        for relative, expected in sorted(load_expectations().items()):
            with self.subTest(fixture=relative):
                report = run_checks.run(EVALS / relative)
                report.dedupe()
                fired = {f.rule for f in report.findings}
                status = "FAIL" if report.failed else "PASS"
                self.assertEqual(status, expected["status"],
                                 "%s: %s" % (relative, report.render()))
                for rule in expected["must_fire"]:
                    self.assertIn(rule, fired, "%s did not fire for %s" % (rule, relative))
                if "max_warnings" in expected:
                    self.assertLessEqual(report.count("WARNING"), expected["max_warnings"],
                                         "%s: %s" % (relative, report.render()))


class TestGoldensStayClean(unittest.TestCase):
    def test_no_golden_has_an_error_or_a_warning(self):
        for path in sorted((EVALS / "regression").glob("*.golden.json")):
            with self.subTest(golden=path.name):
                report = run_checks.run(path)
                report.dedupe()
                self.assertFalse(report.failed, report.render())
                self.assertEqual(report.count("WARNING"), 0, report.render())


if __name__ == "__main__":
    unittest.main()
