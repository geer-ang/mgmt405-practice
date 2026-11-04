#!/usr/bin/env python3
"""Convert a module's practice-exercise .docx into a data/<module>.js file.

The output is strict JSON (json.dumps, indent=2, ensure_ascii=False) wrapped in a
single ``registerModule(...)`` call, which assets/app.js consumes.

Usage
-----
  python3 tools/docx_to_data.py "<file.docx>" --module m1 --title "Module 1" \
      --subtitle "Firm value, thinking at the margin, supply and demand" \
      --out data/module1.js [--check]

  --check   re-emit the parsed text and diff it against `pandoc <docx> -t plain`
            (whitespace-collapsed, sliced from the "Q1." line). The only expected
            differences are paragraphs dropped on purpose (DROP_SOLUTION_PREFIXES).
            Exit status 1 if anything else differs. Works with or without --out.

Expected docx layout (Word paragraph style in brackets)
-------------------------------------------------------
  [Heading 2]  Qn. Theme
  [Normal]     Source: ...   |   Type: Numeric|Conceptual
  [Normal]     stem paragraph(s)           (a table may follow the stem; Q4 has one)
  [Normal]     the question sentence (the "ask")
  [Normal]     A.  ...   B.  ...   C.  ...   D.  ...   (two spaces after the period)
  [Normal]     Correct answer: X
  [Heading 3]  Progressive hints
  [Normal]     Hint 1:  ...   Hint 2:  ...   Hint 3:  ...
  [Heading 3]  Solution
  [Normal]     solution paragraph(s)

Body children (paragraphs and tables) are read in document order, so a table
lands where it appears. Everything before the first "Qn." heading is ignored.

Requires python-docx. --check also requires pandoc on PATH.

NOTE (2026-11-03): data/module1.js was revised by hand after the docx (real-life Los
Angeles examples, 15 questions, ids renumbered). The docx is now historical: re-running
this script on it would overwrite those revisions. Edit data/module1.js directly.
"""

import argparse
import difflib
import json
import re
import subprocess
import sys

try:
    from docx import Document
    from docx.table import Table
    from docx.text.paragraph import Paragraph
except ImportError:  # pragma: no cover
    sys.exit("python-docx is required: pip install python-docx")


# ----------------------------------------------------------------------------
# Content rules (student-safe). Keyed by question number within the module.
# ----------------------------------------------------------------------------

# Themes whose docx heading would give away the answer get a neutral tag.
THEME_OVERRIDES = {
    10: "Market Equilibrium",
    12: "Comparative Statics: Inferring Shifts from Data",
    14: "Comparative Statics: Inferring Shifts from Data",
    15: "Fixed Supply",
    16: "Profit Maximization with Zero Marginal Cost",
    17: "Gender Pay Gap",
}

# Solution paragraphs starting with one of these prefixes are author notes, not
# student content, and are dropped.
DROP_SOLUTION_PREFIXES = {
    7: ("Optional graph:",),
}

# Hints reworded for the student version, e.g. a hint that quoted a specific
# figure better left for students to recall themselves. {question: {hint no: text}}
HINT_OVERRIDES = {
    17: {
        1: "Recall the Chicago Booth chart comparing male and female MBA graduates: "
           "is the gap largest at graduation, or later in the career?",
    },
}

# Figure specs rendered by assets/figures.js inside the solution block.
FIGURES = {
    6: {
        "kind": "staircase",
        "wtp": [80, 65, 50, 35, 20],
        "names": ["Ana", "Ben", "Chloe", "Dev", "Emma"],
        "price": 50,
        "xlabel": "Tickets",
        "ylabel": "WTP ($)",
        "areas": {"cs": "Consumer surplus = $45", "revenue": "Revenue = $150"},
    },
    7: {
        "kind": "demand-areas",
        "intercept": 50,
        "slope": 1,
        "price": 20,
        "xmax": 50,
        "ymax": 50,
        "xlabel": "Lessons per week",
        "ylabel": "Price ($)",
        "areas": {
            "cs": "Consumer surplus = ½ × 30 × 30 = $450",
            "revenue": "Revenue = $20 × 30 = $600",
        },
        "marks": {"q": "Q = 30", "p": "P = $20"},
    },
    11: {
        "kind": "sd",
        "xlabel": "Translators employed",
        "ylabel": "Wage",
        "plabel": "W",
        "qlabel": "L",
        "panels": [
            {
                "caption": "AI tools reduce employers' demand for translators; supply unchanged",
                "demand": {"shift": "left", "size": "large"},
                "supply": {"shift": "none"},
                "result": "Wage falls, employment falls",
            }
        ],
    },
    12: {
        "kind": "sd",
        "xlabel": "Scooters sold",
        "ylabel": "Price",
        "panels": [
            {
                "caption": "Demand and supply both shift right by similar amounts",
                "demand": {"shift": "right", "size": "large"},
                "supply": {"shift": "right", "size": "large"},
                "result": "Quantity rises a lot; price roughly unchanged",
            }
        ],
    },
    13: {
        "kind": "sd",
        "xlabel": "Strawberries",
        "ylabel": "Price",
        "panels": [
            {
                "caption": "Case 1: the supply shift is larger",
                "demand": {"shift": "right", "size": "small"},
                "supply": {"shift": "left", "size": "large"},
                "result": "Price rises, quantity falls",
            },
            {
                "caption": "Case 2: the demand shift is larger",
                "demand": {"shift": "right", "size": "large"},
                "supply": {"shift": "left", "size": "small"},
                "result": "Price rises, quantity rises",
            },
        ],
    },
    14: {
        "kind": "sd",
        "xlabel": "Used cars sold",
        "ylabel": "Price",
        "panels": [
            {
                "caption": "Demand shifts left (large); supply shifts left (small)",
                "demand": {"shift": "left", "size": "large"},
                "supply": {"shift": "left", "size": "small"},
                "result": "Price falls, quantity falls",
            }
        ],
    },
    15: {
        "kind": "sd",
        "xlabel": "Pairs in circulation",
        "ylabel": "Resale price",
        "panels": [
            {
                "caption": "Fixed supply of 10,000 pairs; demand shifts right",
                "demand": {"shift": "right", "size": "large"},
                "supply": {"vertical": True},
                "result": "Price rises, quantity unchanged at 10,000",
            }
        ],
    },
    16: {
        "kind": "demand-areas",
        "intercept": 100,
        "slope": 0.1,
        "price": 50,
        "xmax": 1000,
        "ymax": 100,
        "xlabel": "Downloads",
        "ylabel": "Price ($)",
        "areas": {
            "revenue": "Revenue = $50 × 500 = $25,000",
            "cs": "Consumer surplus",
            "unexploited": "Unexploited market",
        },
        "compare_prices": [
            {"price": 25, "label": "Revenue at $25 = $18,750"},
            {"price": 75, "label": "Revenue at $75 = $18,750"},
        ],
        "marks": {"q": "Q = 500", "p": "P = $50"},
    },
}


# ----------------------------------------------------------------------------
# docx parsing
# ----------------------------------------------------------------------------

RE_HEADING = re.compile(r"^Q(\d+)\.\s*(.+?)\s*$")
RE_SOURCE = re.compile(r"^Source:\s*(.*?)\s*\|\s*Type:\s*(\S+)\s*$")
RE_OPTION = re.compile(r"^([A-D])\.\s{2,}(.*\S)\s*$")
RE_ANSWER = re.compile(r"^Correct answer:\s*([A-D])\s*$")
RE_HINT = re.compile(r"^Hint\s*(\d+):\s{2,}(.*\S)\s*$")


def warn(msg):
    print("warning: " + msg, file=sys.stderr)


def iter_body(doc):
    """Yield Paragraph and Table objects in document order."""
    if hasattr(doc, "iter_inner_content"):  # python-docx >= 1.0
        yield from doc.iter_inner_content()
        return
    for child in doc.element.body.iterchildren():  # pragma: no cover (old python-docx)
        if child.tag.endswith("}p"):
            yield Paragraph(child, doc)
        elif child.tag.endswith("}tbl"):
            yield Table(child, doc)


def style_name(paragraph):
    try:
        return paragraph.style.name or ""
    except AttributeError:
        return ""


def table_to_dict(table):
    """Word table -> {"headers": [...], "rows": [[...], ...]} with collapsed whitespace."""
    rows = []
    for row in table.rows:
        cells = []
        prev = None
        for cell in row.cells:
            if cell._tc is prev:  # merged cells repeat the same <w:tc>; keep one copy
                continue
            prev = cell._tc
            cells.append(" ".join(cell.text.split()))
        rows.append(cells)
    if not rows:
        return None
    return {"headers": rows[0], "rows": rows[1:]}


def new_raw(num, heading):
    return {
        "num": num,
        "heading": heading,
        "source": None,
        "type": None,
        "body": [],       # ("p", text) and ("t", table-dict), in order
        "options": [],    # (letter, text)
        "correct": None,
        "hints": [],      # (n, text)
        "solution": [],   # text
    }


def parse_questions(doc):
    """Walk the document once and return one raw record per question."""
    raws = []
    cur = None
    section = None  # None | "body" | "options" | "hints" | "solution"

    for item in iter_body(doc):
        if isinstance(item, Table):
            if cur is not None and section == "body":
                t = table_to_dict(item)
                if t:
                    cur["body"].append(("t", t))
            # tables elsewhere (the overview sheet before Q1) are ignored
            continue

        text = item.text.strip()
        style = style_name(item)

        if style.startswith("Heading 2"):
            m = RE_HEADING.match(text)
            if m:
                cur = new_raw(int(m.group(1)), text)
                raws.append(cur)
                section = "body"
            else:
                cur, section = None, None  # a non-question heading (front matter)
            continue

        if cur is None or not text:
            continue

        if style.startswith("Heading 3"):
            low = text.lower()
            if low.startswith("progressive hints"):
                section = "hints"
            elif low.startswith("solution"):
                section = "solution"
            else:
                warn("Q%d: unexpected sub-heading %r" % (cur["num"], text))
            continue

        if section == "body":
            m = RE_SOURCE.match(text)
            if m and cur["source"] is None:
                cur["source"], cur["type"] = m.group(1), m.group(2)
                continue
            m = RE_OPTION.match(text)
            if m:
                section = "options"
            else:
                cur["body"].append(("p", text))
                continue

        if section == "options":
            m = RE_OPTION.match(text)
            if m:
                cur["options"].append((m.group(1), m.group(2)))
                continue
            m = RE_ANSWER.match(text)
            if m:
                cur["correct"] = m.group(1)
                continue
            warn("Q%d: unexpected paragraph after the options: %r" % (cur["num"], text[:60]))
            continue

        if section == "hints":
            m = RE_HINT.match(text)
            if m:
                cur["hints"].append((int(m.group(1)), m.group(2)))
            else:
                warn("Q%d: paragraph in hints without 'Hint n:' label: %r" % (cur["num"], text[:60]))
            continue

        if section == "solution":
            cur["solution"].append(text)
            continue

    return raws


# ----------------------------------------------------------------------------
# raw record -> question object (contract §1)
# ----------------------------------------------------------------------------

def build_question(raw, module):
    """Apply the content rules and return (question dict, list of dropped paragraphs)."""
    n = raw["num"]
    problems = []

    paragraphs = [t for k, t in raw["body"] if k == "p"]
    tables = [t for k, t in raw["body"] if k == "t"]
    if not paragraphs:
        problems.append("no stem/ask paragraphs")
    if len(tables) > 1:
        problems.append("more than one table")
    # The ask is the last paragraph before the options; the rest is the stem.
    ask = paragraphs[-1] if paragraphs else ""
    stem_parts = paragraphs[:-1]
    if tables and raw["body"][-1][0] == "t":
        problems.append("table is the last body item (expected the ask after it)")
    if tables:
        # Paragraphs after the table but before the ask cannot be represented.
        idx = raw["body"].index(("t", tables[0]))
        after = [t for k, t in raw["body"][idx + 1:-1] if k == "p"]
        if after:
            problems.append("stem text after the table would be lost")

    if raw["source"] is None:
        problems.append("missing 'Source: ... | Type: ...' line")
    kind = (raw["type"] or "").lower()
    if kind not in ("numeric", "conceptual"):
        problems.append("Type must be Numeric or Conceptual, got %r" % raw["type"])

    letters = [l for l, _ in raw["options"]]
    if letters != ["A", "B", "C", "D"]:
        problems.append("options are %s, expected A-D" % letters)
    if raw["correct"] not in ("A", "B", "C", "D"):
        problems.append("missing/invalid 'Correct answer:' line")

    hint_nums = [k for k, _ in raw["hints"]]
    if hint_nums != [1, 2, 3]:
        problems.append("hints are %s, expected 1-3" % hint_nums)

    dropped = []
    solution = []
    for p in raw["solution"]:
        if any(p.startswith(pre) for pre in DROP_SOLUTION_PREFIXES.get(n, ())):
            dropped.append(p)
        else:
            solution.append(p)
    if not solution:
        problems.append("no solution paragraphs")

    if problems:
        sys.exit("Q%d: " % n + "; ".join(problems))
    if not stem_parts:
        warn("Q%d has no stem paragraph (only the ask)" % n)

    m = RE_HEADING.match(raw["heading"])
    theme = THEME_OVERRIDES.get(n, m.group(2) if m else raw["heading"])

    q = {
        "id": "%s-q%02d" % (module, n),
        "theme": theme,
        "source": raw["source"],
        "kind": kind,
        "stem": "\n".join(stem_parts),
    }
    if tables:
        q["table"] = tables[0]
    q["ask"] = ask
    q["choices"] = [t for _, t in raw["options"]]
    q["correct_index"] = "ABCD".index(raw["correct"])
    q["hints"] = [t for _, t in raw["hints"]]
    replaced = []  # (old re-emitted line, new re-emitted line) for the fidelity check
    for hint_no, new_text in HINT_OVERRIDES.get(n, {}).items():
        old_text = q["hints"][hint_no - 1]
        q["hints"][hint_no - 1] = new_text
        replaced.append(("Hint %d: %s" % (hint_no, old_text), "Hint %d: %s" % (hint_no, new_text)))
    q["solution"] = solution
    if n in FIGURES:
        q["figure"] = FIGURES[n]
    return q, dropped, replaced


def build_module(raws, module, title, subtitle):
    nums = [r["num"] for r in raws]
    if nums != list(range(1, len(nums) + 1)):
        warn("question numbers are not 1..N in order: %s" % nums)
    questions, dropped, replaced = [], [], []
    for raw in raws:
        q, d, r = build_question(raw, module)
        questions.append(q)
        dropped.extend(d)
        replaced.extend(r)
    mod = {"id": module, "title": title, "subtitle": subtitle, "questions": questions}
    return mod, dropped, replaced


def emit(mod):
    return "registerModule(" + json.dumps(mod, indent=2, ensure_ascii=False) + ")\n"


# ----------------------------------------------------------------------------
# --check: fidelity diff against pandoc's plain-text rendering
# ----------------------------------------------------------------------------

def collapse(s):
    return " ".join(s.split())


def reemit_lines(mod, raws):
    """Rebuild the docx text (labels included) from the final data, one logical line each."""
    out = []
    for q, raw in zip(mod["questions"], raws):
        out.append(raw["heading"])
        out.append("Source: %s | Type: %s" % (q["source"], raw["type"]))
        out.extend(q["stem"].split("\n") if q["stem"] else [])
        if "table" in q:
            out.append(" ".join(q["table"]["headers"]))
            out.extend(" ".join(r) for r in q["table"]["rows"])
        out.append(q["ask"])
        out.extend("%s. %s" % (l, c) for l, c in zip("ABCD", q["choices"]))
        out.append("Correct answer: %s" % "ABCD"[q["correct_index"]])
        out.append("Progressive hints")
        out.extend("Hint %d: %s" % (i + 1, h) for i, h in enumerate(q["hints"]))
        out.append("Solution")
        out.extend(q["solution"])
    return [collapse(l) for l in out if collapse(l)]


def pandoc_lines(docx_path):
    try:
        res = subprocess.run(
            ["pandoc", docx_path, "-t", "plain", "--wrap=none"],
            capture_output=True, text=True, encoding="utf-8", check=True,
        )
    except FileNotFoundError:
        sys.exit("--check needs pandoc on PATH")
    except subprocess.CalledProcessError as e:
        sys.exit("pandoc failed: " + e.stderr.strip())
    lines = res.stdout.splitlines()
    # Slice from the first question heading; drop blank lines and table rules.
    start = next((i for i, l in enumerate(lines) if re.match(r"^\s*Q1\.\s", l)), None)
    if start is None:
        sys.exit("--check: could not find a 'Q1.' line in the pandoc output")
    out = []
    for l in lines[start:]:
        c = collapse(l)
        if not c or re.fullmatch(r"[-\s]+", c):
            continue
        out.append(c)
    return out


def fidelity_check(docx_path, mod, raws, dropped, replaced):
    """Print the diff; return True when only the deliberate drops/rewordings differ."""
    a = pandoc_lines(docx_path)
    b = reemit_lines(mod, raws)
    diff = list(difflib.unified_diff(a, b, fromfile="pandoc", tofile="re-emitted", lineterm="", n=0))
    expected_minus = {collapse(d) for d in dropped} | {collapse(old) for old, _ in replaced}
    expected_plus = {collapse(new) for _, new in replaced}
    unexpected = []
    for line in diff:
        if line.startswith(("---", "+++", "@@")):
            continue
        if line.startswith("-") and line[1:] in expected_minus:
            continue
        if line.startswith("+") and line[1:] in expected_plus:
            continue
        unexpected.append(line)

    print("=== fidelity diff (pandoc plain text vs re-emitted data) ===")
    if diff:
        print("\n".join(diff))
    else:
        print("(no differences)")
    print("=== %d pandoc lines, %d re-emitted lines; %d expected drop(s), %d expected rewording(s), "
          "%d unexpected difference(s) ===" % (len(a), len(b), len(dropped), len(replaced), len(unexpected)))
    for d in dropped:
        print("dropped on purpose: " + d[:80] + ("..." if len(d) > 80 else ""))
    for old, new in replaced:
        print("reworded on purpose: " + old[:60] + "... -> " + new[:60] + "...")
    return not unexpected


# ----------------------------------------------------------------------------

def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("docx", help="path to the module's practice-exercise .docx")
    ap.add_argument("--module", required=True, help="module id, e.g. m1")
    ap.add_argument("--title", required=True, help='module title, e.g. "Module 1"')
    ap.add_argument("--subtitle", default="", help="module subtitle (shown under the title)")
    ap.add_argument("--out", help="output file, e.g. data/module1.js (stdout if omitted and no --check)")
    ap.add_argument("--check", action="store_true", help="diff the parsed text against pandoc plain text")
    args = ap.parse_args(argv)

    if not re.fullmatch(r"m\d+", args.module):
        sys.exit("--module must look like m1, m2, ...")

    doc = Document(args.docx)
    raws = parse_questions(doc)
    if not raws:
        sys.exit("no 'Qn.' Heading 2 paragraphs found")
    mod, dropped, replaced = build_module(raws, args.module, args.title, args.subtitle)
    text = emit(mod)

    # Round-trip guard: what we wrote must parse back as strict JSON.
    json.loads(text[len("registerModule("):-2])

    if args.out:
        with open(args.out, "w", encoding="utf-8", newline="\n") as f:
            f.write(text)
        print("wrote %s: %d questions (%d numeric, %d conceptual), %d with figures"
              % (args.out, len(mod["questions"]),
                 sum(q["kind"] == "numeric" for q in mod["questions"]),
                 sum(q["kind"] == "conceptual" for q in mod["questions"]),
                 sum("figure" in q for q in mod["questions"])))
    elif not args.check:
        sys.stdout.write(text)

    if args.check:
        ok = fidelity_check(args.docx, mod, raws, dropped, replaced)
        return 0 if ok else 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
