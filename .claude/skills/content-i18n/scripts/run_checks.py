#!/usr/bin/env python3
"""Run every gate that applies to an artifact and return one verdict.

    run_checks.py output/content.json
    run_checks.py output/content.json --json

Exit code 1 means at least one ERROR. Content with an open ERROR is not finished content.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import _common as C
import check_claims
import check_i18n
import check_placeholders
import check_terms
import lint_marketing
import lint_product
import validate_schema


def run(path):
    artifact = C.load_artifact(path)
    combined = C.Report("run_checks")
    combined.extend(validate_schema.run(path))
    combined.extend(check_i18n.run_artifact(artifact))
    combined.extend(check_placeholders.run(artifact))
    combined.extend(check_terms.run(artifact))
    combined.extend(check_claims.run(artifact))
    if artifact.get("content_type") == "product_ui":
        combined.extend(lint_product.run(artifact))
    else:
        combined.extend(lint_marketing.run(artifact))
    combined.dedupe()
    return combined


def main(argv=None):
    parser = C.base_parser(__doc__.splitlines()[0])
    args = parser.parse_args(argv)
    path = C.resolve_content_arg(parser, args)
    return C.emit(run(path), args.json)


if __name__ == "__main__":
    sys.exit(main())
