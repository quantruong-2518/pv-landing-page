#!/usr/bin/env python3
"""Validate a JSON document against a JSON Schema subset — standard library only.

Supported: type, required, properties, additionalProperties, items, enum, pattern,
minLength, minItems, minProperties, minimum, maximum, $ref to #/definitions/*,
allOf, anyOf, oneOf, not. Anything else in a schema is ignored rather than guessed at.
"""

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import _common as C

TYPES = {
    "object": dict,
    "array": list,
    "string": str,
    "boolean": bool,
    "null": type(None),
}


def _type_ok(value, name):
    if name == "integer":
        return isinstance(value, int) and not isinstance(value, bool)
    if name == "number":
        return isinstance(value, (int, float)) and not isinstance(value, bool)
    if name == "boolean":
        return isinstance(value, bool)
    expected = TYPES.get(name)
    if expected is None:
        return True
    if expected is dict or expected is list or expected is str:
        return isinstance(value, expected)
    return isinstance(value, expected)


def _resolve(schema, root):
    seen = 0
    while isinstance(schema, dict) and "$ref" in schema and seen < 16:
        ref = schema["$ref"]
        seen += 1
        if not ref.startswith("#/"):
            return schema
        node = root
        for part in ref[2:].split("/"):
            node = node.get(part, {})
        schema = node
    return schema


def validate(instance, schema, root=None, path="$"):
    """Return a list of (path, message) problems."""
    root = root if root is not None else schema
    schema = _resolve(schema, root)
    problems = []
    if not isinstance(schema, dict):
        return problems

    for combiner in ("allOf",):
        for sub in schema.get(combiner, []):
            problems.extend(validate(instance, sub, root, path))
    if "anyOf" in schema:
        if not any(not validate(instance, s, root, path) for s in schema["anyOf"]):
            problems.append((path, "matches none of anyOf"))
    if "oneOf" in schema:
        matched = sum(1 for s in schema["oneOf"] if not validate(instance, s, root, path))
        if matched != 1:
            problems.append((path, "matches %d of oneOf, expected exactly 1" % matched))
    if "not" in schema and not validate(instance, schema["not"], root, path):
        problems.append((path, "must not match the `not` schema"))

    if "enum" in schema and instance not in schema["enum"]:
        problems.append((path, "%r is not one of %s" % (instance, schema["enum"])))

    declared = schema.get("type")
    if declared:
        names = declared if isinstance(declared, list) else [declared]
        if not any(_type_ok(instance, n) for n in names):
            problems.append((path, "expected type %s, got %s" % (declared, type(instance).__name__)))
            return problems

    if isinstance(instance, str):
        if "minLength" in schema and len(instance) < schema["minLength"]:
            problems.append((path, "shorter than minLength %d" % schema["minLength"]))
        if "pattern" in schema and not re.search(schema["pattern"], instance):
            problems.append((path, "does not match pattern %s" % schema["pattern"]))

    if isinstance(instance, (int, float)) and not isinstance(instance, bool):
        if "minimum" in schema and instance < schema["minimum"]:
            problems.append((path, "below minimum %s" % schema["minimum"]))
        if "maximum" in schema and instance > schema["maximum"]:
            problems.append((path, "above maximum %s" % schema["maximum"]))

    if isinstance(instance, list):
        if "minItems" in schema and len(instance) < schema["minItems"]:
            problems.append((path, "fewer than minItems %d" % schema["minItems"]))
        item_schema = schema.get("items")
        if isinstance(item_schema, dict):
            for i, item in enumerate(instance):
                problems.extend(validate(item, item_schema, root, "%s[%d]" % (path, i)))

    if isinstance(instance, dict):
        for name in schema.get("required", []):
            if name not in instance:
                problems.append((path, "missing required property `%s`" % name))
        if "minProperties" in schema and len(instance) < schema["minProperties"]:
            problems.append((path, "fewer than minProperties %d" % schema["minProperties"]))
        properties = schema.get("properties", {})
        for name, value in instance.items():
            if name in properties:
                problems.extend(validate(value, properties[name], root, "%s.%s" % (path, name)))
            else:
                extra = schema.get("additionalProperties", True)
                if extra is False:
                    problems.append((path, "unexpected property `%s`" % name))
                elif isinstance(extra, dict):
                    problems.extend(validate(value, extra, root, "%s.%s" % (path, name)))
    return problems


def schema_for(instance, explicit=None):
    if explicit:
        return Path(explicit)
    if isinstance(instance, dict):
        if "entries" in instance:
            return C.SCHEMA_DIR / "i18n-output.schema.json"
        if "claims" in instance:
            return C.SCHEMA_DIR / "claim-ledger.schema.json"
        if "terms" in instance:
            return C.SCHEMA_DIR / "terminology.schema.json"
        if "hard_failures" in instance:
            return C.SCHEMA_DIR / "review-result.schema.json"
        if "page" in instance and "audience" in instance:
            return C.SCHEMA_DIR / "marketing-content.schema.json"
        if "component" in instance and "state" in instance:
            return C.SCHEMA_DIR / "product-content.schema.json"
        if "type" in instance and "id" in instance:
            return C.SCHEMA_DIR / "semantic-content.schema.json"
    raise SystemExit("cannot infer a schema for this document — pass --schema")


def run(path, explicit=None):
    report = C.Report("validate_schema")
    suffix = Path(path).suffix.lower()
    instance = C.load_yaml(path) if suffix in (".yaml", ".yml") else C.load_json(path)
    schema_path = schema_for(instance, explicit)
    schema = C.load_json(schema_path)
    for where, message in validate(instance, schema):
        report.add("SCHEMA_INVALID", C.ERROR, message, key=where, source=str(path))
    report.add("SCHEMA_CHECKED", C.INFO, "validated against %s" % schema_path.name, source=str(path))
    return report


def main(argv=None):
    parser = C.base_parser(__doc__.splitlines()[0])
    parser.add_argument("--schema", help="explicit schema path")
    args = parser.parse_args(argv)
    path = C.resolve_content_arg(parser, args)
    return C.emit(run(path, args.schema), args.json)


if __name__ == "__main__":
    sys.exit(main())
