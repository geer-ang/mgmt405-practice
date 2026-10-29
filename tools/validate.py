#!/usr/bin/env python3
"""Validate practice-module data files (data/*.js) before they are published.

Usage:  python3 tools/validate.py data/*.js

Each file must be a single `registerModule(<strict JSON>)` call. The script
strips the wrapper, parses the JSON, and checks the module against the data
contract. On a syntax error the FIRST output line names the file, line and
column together with the likely cause, followed by the offending line, so
the fix can be made directly on github.com.

Exit status 0 = every file passed (one summary line per file; warnings do
not fail). Exit status 1 = at least one error.
"""

import json
import re
import sys

ID_RE = re.compile(r"^m\d+-q\d{2}$")
KINDS = ("numeric", "conceptual")
FIGURE_KINDS = ("sd", "demand-areas", "staircase")
# Words that, inside a parenthetical of a theme, would give away the answer.
THEME_PAREN_LEAKS = ("shift", "vertical", "both curves", "revenue maximization")
REQUIRED_TEXT = ("id", "theme", "source", "kind", "stem", "ask")


def likely_cause(msg):
    """Translate json's error message into a plain-English hint."""
    m = msg.lower()
    if "illegal trailing comma" in m:   # Python 3.13+
        return "a comma after the last item in a list or block — delete it"
    if "expecting ',' delimiter" in m:
        return ("missing comma after the previous item, or an unescaped \" inside a text "
                "string (write it as \\\")")
    if "expecting ':' delimiter" in m:
        return "a key is not followed by a colon, or there is an unescaped quote inside a key"
    if "expecting property name" in m:
        return "trailing comma before a closing }, or a key that is not in double quotes"
    if "unterminated string" in m:
        return ("a string is missing its closing quote, or contains a raw line break "
                "(join the lines; only stem may contain \\n)")
    if "invalid control character" in m:
        return ("a raw line break or tab inside a quoted string — join the lines or "
                "use \\n (allowed in stem only)")
    if "invalid \\escape" in m or "invalid \\uxxxx" in m:
        return "a backslash that is not a valid escape — write \\\\ for a literal backslash"
    if "extra data" in m:
        return "something follows the closing } of the module — an extra }, ] or a duplicated block"
    if "expecting value" in m:
        return ("missing value, trailing comma before a closing ], or a stray character "
                "(for example a curly quote instead of \")")
    return "JSON syntax problem near this position"


class Report:
    def __init__(self, path):
        self.path = path
        self.errors = []
        self.warnings = []

    def error(self, msg):
        self.errors.append(msg)

    def warning(self, msg):
        self.warnings.append(msg)


def load_text(path, rep):
    """Read the file as strict UTF-8; return the text or None."""
    try:
        with open(path, "rb") as f:
            raw = f.read()
    except OSError as e:
        rep.error("%s: cannot read file (%s)" % (path, e.strerror))
        return None
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as e:
        line = raw[:e.start].count(b"\n") + 1
        rep.error("%s line %d: file is not valid UTF-8 (byte 0x%02x) — re-save the file as UTF-8"
                  % (path, line, raw[e.start]))
        return None
    if text.startswith("﻿"):
        rep.warning("file starts with a UTF-8 BOM; it is ignored here but better removed")
        text = " " + text[1:]  # keep offsets stable
    if "\r" in text:
        rep.warning("file has CRLF line endings; LF is preferred")
    return text


def strip_wrapper(text, path, rep):
    """Blank out `registerModule(` and the final `)` so JSON positions match the file."""
    head = re.match(r"\s*registerModule\s*\(", text)
    if not head:
        rep.error("%s line 1 col 1: file must start with registerModule(" % path)
        return None
    tail = re.search(r"\)\s*;?\s*$", text)
    if not tail or tail.start() < head.end():
        rep.error("%s: file must end with the closing ) of registerModule(...)" % path)
        return None
    blank = lambda s: re.sub(r"\S", " ", s)  # keep newlines, drop characters
    return blank(text[:head.end()]) + text[head.end():tail.start()] + blank(text[tail.start():])


def parse_json(body, text, path, rep):
    try:
        return json.loads(body)
    except json.JSONDecodeError as e:
        lines = text.splitlines()
        offending = lines[e.lineno - 1] if 0 < e.lineno <= len(lines) else ""
        rep.error("%s line %d col %d: %s" % (path, e.lineno, e.colno, likely_cause(e.msg)))
        rep.error("  > " + offending.rstrip())
        rep.error("  > " + " " * max(e.colno - 1, 0) + "^")
        rep.error("  JSON error: %s" % e.msg)
        return None


def is_text(v):
    return isinstance(v, str) and v.strip() != ""


def check_no_newlines(value, where, rep, skip_key=None):
    """Recursively make sure no string contains a line break (stem is exempt)."""
    if isinstance(value, str):
        if "\n" in value or "\r" in value:
            rep.error("%s: line break (\\n) is only allowed inside stem" % where)
    elif isinstance(value, dict):
        for k, v in value.items():
            if k == skip_key:
                continue
            check_no_newlines(v, "%s.%s" % (where, k), rep)
    elif isinstance(value, list):
        for i, v in enumerate(value):
            check_no_newlines(v, "%s[%d]" % (where, i), rep)


def check_theme(theme, where, rep):
    low = theme.lower()
    if "optional" in low:
        rep.error("%s: theme %r must not contain 'optional'" % (where, theme))
    for paren in re.findall(r"\(([^)]*)\)", low):
        hits = [w for w in THEME_PAREN_LEAKS if w in paren]
        if hits:
            rep.error("%s: theme %r has a parenthetical mentioning %s — it gives away the answer; "
                      "add a THEME_OVERRIDES entry in tools/docx_to_data.py"
                      % (where, theme, ", ".join(repr(h) for h in hits)))


def check_table(table, where, rep):
    if not isinstance(table, dict):
        rep.error("%s: table must be an object with headers and rows" % where)
        return
    headers, rows = table.get("headers"), table.get("rows")
    if not isinstance(headers, list) or not headers or not all(isinstance(h, str) for h in headers):
        rep.error("%s: table.headers must be a non-empty list of strings" % where)
        return
    if not isinstance(rows, list) or not rows:
        rep.error("%s: table.rows must be a non-empty list of rows" % where)
        return
    for i, row in enumerate(rows):
        if not isinstance(row, list) or len(row) != len(headers) or not all(isinstance(c, str) for c in row):
            rep.error("%s: table.rows[%d] must have %d string cells" % (where, i, len(headers)))


def check_figure(fig, where, rep):
    if not isinstance(fig, dict):
        rep.error("%s: figure must be an object" % where)
        return
    kind = fig.get("kind")
    if kind not in FIGURE_KINDS:
        rep.error("%s: figure.kind %r is not one of %s" % (where, kind, ", ".join(FIGURE_KINDS)))
        return
    if kind == "sd":
        panels = fig.get("panels")
        if not isinstance(panels, list) or not 1 <= len(panels) <= 2:
            rep.error("%s: sd figure needs 1 or 2 panels" % where)
    elif kind == "demand-areas":
        for key in ("intercept", "slope", "price"):
            if not isinstance(fig.get(key), (int, float)) or isinstance(fig.get(key), bool):
                rep.error("%s: demand-areas figure needs numeric %r" % (where, key))
    elif kind == "staircase":
        if not isinstance(fig.get("wtp"), list) or not fig["wtp"]:
            rep.error("%s: staircase figure needs a non-empty wtp list" % where)


def check_question(q, i, mod_id, rep, seen_ids):
    where = "question %d" % (i + 1)
    if not isinstance(q, dict):
        rep.error("%s: must be an object" % where)
        return
    qid = q.get("id")
    if is_text(qid):
        where = qid
        if not ID_RE.match(qid):
            rep.error("%s: id must look like m1-q01" % where)
        elif not qid.startswith(mod_id + "-"):
            rep.warning("%s: id does not start with the module id %r" % (where, mod_id))
        elif int(qid.rsplit("q", 1)[1]) != i + 1:
            rep.warning("%s: id number does not match its position (%d)" % (where, i + 1))
        if qid in seen_ids:
            rep.error("%s: duplicate id" % where)
        seen_ids.add(qid)

    for key in REQUIRED_TEXT:
        if not is_text(q.get(key)):
            rep.error("%s: %r is missing or empty" % (where, key))

    if is_text(q.get("kind")) and q["kind"] not in KINDS:
        rep.error("%s: kind %r must be 'numeric' or 'conceptual'" % (where, q["kind"]))
    if is_text(q.get("theme")):
        check_theme(q["theme"], where, rep)

    choices = q.get("choices")
    if not isinstance(choices, list) or len(choices) != 4 or not all(is_text(c) for c in choices):
        rep.error("%s: choices must be exactly 4 non-empty strings" % where)
    ci = q.get("correct_index")
    if isinstance(ci, bool) or not isinstance(ci, int) or not 0 <= ci <= 3:
        rep.error("%s: correct_index must be an integer 0-3" % where)

    hints = q.get("hints")
    if not isinstance(hints, list) or len(hints) != 3 or not all(is_text(h) for h in hints):
        rep.error("%s: hints must be exactly 3 non-empty strings" % where)
    sol = q.get("solution")
    if not isinstance(sol, list) or not sol or not all(is_text(p) for p in sol):
        rep.error("%s: solution must be a list of at least 1 non-empty paragraph" % where)

    if "table" in q:
        check_table(q["table"], where, rep)
    if "figure" in q:
        check_figure(q["figure"], where, rep)

    known = set(REQUIRED_TEXT) | {"docx_heading", "table", "choices", "correct_index", "hints", "solution", "figure"}
    for key in q:
        if key not in known:
            rep.warning("%s: unknown field %r is ignored by the app" % (where, key))

    check_no_newlines(q, where, rep, skip_key="stem")


def validate_file(path):
    rep = Report(path)
    text = load_text(path, rep)
    if text is None:
        return rep, None
    body = strip_wrapper(text, path, rep)
    if body is None:
        return rep, None
    mod = parse_json(body, text, path, rep)
    if mod is None:
        return rep, None

    if not isinstance(mod, dict):
        rep.error("%s: registerModule must receive an object" % path)
        return rep, None
    for key in ("id", "title"):
        if not is_text(mod.get(key)):
            rep.error("module %r is missing or empty" % key)
    mod_id = mod.get("id") if is_text(mod.get("id")) else ""
    if mod_id and not re.fullmatch(r"m\d+", mod_id):
        rep.error("module id %r must look like m1" % mod_id)
    if "subtitle" in mod and not isinstance(mod["subtitle"], str):
        rep.error("module subtitle must be a string")
    m = re.search(r"module(\d+)\.js$", path)
    if m and mod_id and mod_id != "m" + m.group(1):
        rep.warning("module id %r does not match the file name (expected m%s)" % (mod_id, m.group(1)))

    questions = mod.get("questions")
    if not isinstance(questions, list) or not questions:
        rep.error("module must have a non-empty 'questions' list")
        return rep, mod
    seen = set()
    for i, q in enumerate(questions):
        check_question(q, i, mod_id, rep, seen)
    check_no_newlines({k: v for k, v in mod.items() if k != "questions"}, "module", rep)
    return rep, mod


def summary(path, mod):
    qs = mod.get("questions", [])
    kinds = [q.get("kind") for q in qs if isinstance(q, dict)]
    figs = sum(1 for q in qs if isinstance(q, dict) and "figure" in q)
    return "OK  %s — %s \"%s\": %d questions (%d numeric, %d conceptual), %d with figures" % (
        path, mod.get("id"), mod.get("title"), len(qs),
        kinds.count("numeric"), kinds.count("conceptual"), figs)


def main(argv):
    if not argv:
        print(__doc__.strip())
        return 2
    failed = False
    for path in argv:
        rep, mod = validate_file(path)
        for w in rep.warnings:
            print("warning: %s: %s" % (path, w))
        if rep.errors:
            failed = True
            for e in rep.errors:
                print(e if e.startswith(path) or e.startswith("  ") else "%s: %s" % (path, e))
            print("FAIL %s — %d error(s)" % (path, len([e for e in rep.errors if not e.startswith("  ")])))
        else:
            print(summary(path, mod))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
