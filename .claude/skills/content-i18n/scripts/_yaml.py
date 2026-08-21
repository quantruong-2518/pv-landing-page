"""Minimal YAML reader — standard library only.

Supports the subset the content-system files use: block mappings, block sequences,
inline sequence/mapping flow syntax, quoted and bare scalars, block scalars, comments.
It is not a general YAML implementation and does not try to be; it exists so this
toolchain has no third-party dependency. Anything it cannot parse raises YamlError
rather than guessing.
"""

import re

__all__ = ["load", "loads", "YamlError"]

_TRUE = {"true", "yes", "on"}
_FALSE = {"false", "no", "off"}
_NULL = {"null", "~", ""}
_INT = re.compile(r"^[+-]?\d+$")
_FLOAT = re.compile(r"^[+-]?(\d+\.\d*|\.\d+)([eE][+-]?\d+)?$")


class YamlError(Exception):
    pass


def load(path):
    with open(path, encoding="utf-8") as handle:
        return loads(handle.read())


def loads(text):
    lines = text.replace("\t", "    ").split("\n")
    parser = _Parser(lines)
    return parser.parse()


def _indent_of(line):
    return len(line) - len(line.lstrip(" "))


def _is_ignorable(line):
    stripped = line.strip()
    return not stripped or stripped.startswith("#") or stripped in ("---", "...")


def _split_comment(value):
    """Drop a trailing ` # comment` that is not inside quotes."""
    out, quote = [], None
    for i, char in enumerate(value):
        if quote:
            out.append(char)
            if char == quote:
                quote = None
            continue
        if char in "\"'":
            quote = char
            out.append(char)
            continue
        if char == "#" and (i == 0 or value[i - 1] in " \t"):
            break
        out.append(char)
    return "".join(out).rstrip()


def _find_key_sep(text):
    """Index of the `:` that ends a mapping key, or -1."""
    quote, depth = None, 0
    for i, char in enumerate(text):
        if quote:
            if char == quote:
                quote = None
            continue
        if char in "\"'":
            quote = char
        elif char in "[{":
            depth += 1
        elif char in "]}":
            depth -= 1
        elif char == ":" and depth == 0:
            if i + 1 == len(text) or text[i + 1] in " \t":
                return i
    return -1


def _unquote(value):
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        inner = value[1:-1]
        if value[0] == '"':
            return inner.replace('\\"', '"').replace("\\n", "\n").replace("\\\\", "\\")
        return inner.replace("''", "'")
    return value


def _split_flow(body):
    """Split a flow collection body on top-level commas."""
    parts, buf, quote, depth = [], [], None, 0
    for char in body:
        if quote:
            buf.append(char)
            if char == quote:
                quote = None
            continue
        if char in "\"'":
            quote = char
            buf.append(char)
        elif char in "[{":
            depth += 1
            buf.append(char)
        elif char in "]}":
            depth -= 1
            buf.append(char)
        elif char == "," and depth == 0:
            parts.append("".join(buf).strip())
            buf = []
        else:
            buf.append(char)
    tail = "".join(buf).strip()
    if tail:
        parts.append(tail)
    return parts


def _scalar(raw):
    value = raw.strip()
    if not value:
        return None
    if value[0] in "\"'":
        return _unquote(value)
    if value.startswith("["):
        if not value.endswith("]"):
            raise YamlError("unterminated flow sequence: %s" % raw)
        return [_scalar(p) for p in _split_flow(value[1:-1])]
    if value.startswith("{"):
        if not value.endswith("}"):
            raise YamlError("unterminated flow mapping: %s" % raw)
        out = {}
        for part in _split_flow(value[1:-1]):
            sep = _find_key_sep(part)
            if sep < 0:
                raise YamlError("flow mapping entry without a key: %s" % part)
            out[_unquote(part[:sep].strip())] = _scalar(part[sep + 1:])
        return out
    lowered = value.lower()
    if lowered in _TRUE:
        return True
    if lowered in _FALSE:
        return False
    if lowered in _NULL:
        return None
    if _INT.match(value):
        return int(value)
    if _FLOAT.match(value):
        return float(value)
    return value


class _Parser:
    def __init__(self, lines):
        self.lines = list(lines)
        self.i = 0

    # -- cursor ---------------------------------------------------------
    def _skip(self):
        while self.i < len(self.lines) and _is_ignorable(self.lines[self.i]):
            self.i += 1
        return self.i < len(self.lines)

    def _peek_indent(self):
        return _indent_of(self.lines[self.i])

    # -- entry point ----------------------------------------------------
    def parse(self):
        if not self._skip():
            return {}
        node = self._node(self._peek_indent())
        return {} if node is None else node

    def _node(self, indent):
        if not self._skip():
            return None
        current = self._peek_indent()
        if current < indent:
            return None
        text = self.lines[self.i].strip()
        if text == "-" or text.startswith("- "):
            return self._sequence(current)
        return self._mapping(current)

    # -- collections ----------------------------------------------------
    def _mapping(self, indent):
        result = {}
        while self._skip():
            current = self._peek_indent()
            if current < indent:
                break
            if current > indent:
                raise YamlError("unexpected indent at line %d: %s" % (self.i + 1, self.lines[self.i]))
            text = self.lines[self.i].strip()
            if text == "-" or text.startswith("- "):
                break
            sep = _find_key_sep(text)
            if sep < 0:
                raise YamlError("expected `key:` at line %d: %s" % (self.i + 1, self.lines[self.i]))
            key = _unquote(text[:sep].strip())
            rest = _split_comment(text[sep + 1:].strip())
            self.i += 1
            if rest in ("|", "|-", "|+", ">", ">-", ">+"):
                result[key] = self._block_scalar(rest, indent)
            elif rest == "":
                result[key] = self._node(indent + 1)
            else:
                result[key] = _scalar(rest)
        return result

    def _sequence(self, indent):
        items = []
        while self._skip():
            current = self._peek_indent()
            if current < indent:
                break
            line = self.lines[self.i]
            text = line.strip()
            if not (text == "-" or text.startswith("- ")):
                break
            if current > indent:
                raise YamlError("unexpected indent at line %d: %s" % (self.i + 1, line))
            after = text[1:]
            offset = len(after) - len(after.lstrip(" "))
            remainder = after.strip()
            if not remainder:
                self.i += 1
                items.append(self._node(indent + 1))
                continue
            column = indent + 1 + offset
            if not remainder[0] in "[{\"'" and _find_key_sep(remainder) >= 0:
                # `- key: value` — rewrite as a mapping line so alignment holds.
                self.lines[self.i] = " " * column + remainder
                items.append(self._mapping(column))
            else:
                self.i += 1
                items.append(_scalar(_split_comment(remainder)))
        return items

    def _block_scalar(self, marker, indent):
        fold = marker[0] == ">"
        chomp = marker[1] if len(marker) > 1 else ""
        body, base = [], None
        while self.i < len(self.lines):
            line = self.lines[self.i]
            if line.strip():
                current = _indent_of(line)
                if current <= indent:
                    break
                if base is None:
                    base = current
                body.append(line[base:])
            else:
                body.append("")
            self.i += 1
        while body and not body[-1]:
            body.pop()
        text = " ".join(x for x in body if x) if fold else "\n".join(body)
        if chomp != "-":
            text += "\n"
        return text
