"""The bundled YAML reader must handle every construct the data files use."""

import unittest

import _helpers  # noqa: F401  (sets sys.path)
import _yaml


class TestYamlSubset(unittest.TestCase):
    def test_nested_mappings_and_lists(self):
        data = _yaml.loads(
            "a:\n"
            "  b: 1\n"
            "  c:\n"
            "    - x\n"
            "    - y\n"
        )
        self.assertEqual(data, {"a": {"b": 1, "c": ["x", "y"]}})

    def test_list_of_mappings_keeps_alignment(self):
        data = _yaml.loads(
            "people:\n"
            "  - name: A\n"
            "    role: CEO\n"
            "  - name: B\n"
            "    role: CTO\n"
        )
        self.assertEqual(data["people"][1], {"name": "B", "role": "CTO"})

    def test_flow_collections(self):
        data = _yaml.loads('x: [a, "b, c"]\ny: { p: 1, q: two }\n')
        self.assertEqual(data["x"], ["a", "b, c"])
        self.assertEqual(data["y"], {"p": 1, "q": "two"})

    def test_scalars_and_comments(self):
        data = _yaml.loads(
            "# leading comment\n"
            'id: "0111545175"   # quoted stays a string\n'
            "n: 17\n"
            "f: 17.6\n"
            "flag: true\n"
            "empty:\n"
        )
        self.assertEqual(data["id"], "0111545175")
        self.assertEqual((data["n"], data["f"], data["flag"], data["empty"]), (17, 17.6, True, None))

    def test_block_scalar(self):
        data = _yaml.loads("note: |\n  line one\n  line two\n")
        self.assertEqual(data["note"], "line one\nline two\n")

    def test_unicode_survives(self):
        data = _yaml.loads("vi: Chưa có lead nào\nko: 아직 리드가 없습니다\n")
        self.assertEqual(data["vi"], "Chưa có lead nào")
        self.assertEqual(data["ko"], "아직 리드가 없습니다")

    def test_broken_flow_raises_instead_of_guessing(self):
        with self.assertRaises(_yaml.YamlError):
            _yaml.loads("x: [a, b\n")


if __name__ == "__main__":
    unittest.main()
