#!/usr/bin/env python3
"""Build one self-contained HTML file from index.html (an offline review copy).

Usage:
    python3 tools/bundle.py --modules m1[,m2...] [--out FILE] [--index PATH]
                            [--review [--notes NOTES.json]]

--review makes a copy for a human reviewer: every hint and worked solution is
shown at once (with a button to switch back to the student view), and --notes
adds a "reviewer note" under each question from a JSON file {"m2-q01": "text"
or ["line", "line"], ...}. Review copies are for the teaching team only.

What it does
- Inlines every <link rel="stylesheet" href="..."> that points at a local file
  as a <style> block.
- Inlines every <script src="..."> that points at a local file (assets/figures.js,
  assets/app.js, ...). Scripts that carry a data-module attribute are "data
  scripts": one is kept (as <script data-module="<id>">...</script>) only when its
  id is in --modules, and any id in --modules that has no tag in index.html is
  appended from data/<id>.js (or data/moduleN.js for an id mN), so the bundle carries exactly
  the modules asked for.
- Escapes "</script" inside inlined code as "<\\/script" so the HTML parser does
  not end the block early (JS and JSON both read "<\\/script" as "</script").
- Writes UTF-8 with LF line endings to --out, or to stdout when --out is absent.

The result opens from file:// with the same behaviour as the live site.
Standard library only; nothing TA-only is ever written here.
"""

import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote

REPO = Path(__file__).resolve().parent.parent

# A tag body is a run of non-quote, non-'>' characters or whole quoted strings,
# so a '>' inside a quoted attribute value does not end the tag early.
_TAG_BODY = r'(?:[^>"\']|"[^"]*"|\'[^\']*\')*'
LINK_RE = re.compile(r'<link\b(' + _TAG_BODY + r')>', re.I)
SCRIPT_RE = re.compile(r'<script\b(' + _TAG_BODY + r')>(.*?)</script\s*>', re.I | re.S)
DOCTYPE_RE = re.compile(r'<!doctype\b[^>]*>', re.I)
BODY_END_RE = re.compile(r'</body\s*>', re.I)
# name, then optionally = "double-quoted" | 'single-quoted' | bare value
ATTR_RE = re.compile(r'([^\s=/>"\']+)(?:\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^\s>"\']+)))?')
SRC_ATTR_RE = re.compile(r'\s*\bsrc\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>"\']+)', re.I)
SCHEME_RE = re.compile(r'^[A-Za-z][A-Za-z0-9+.-]*:')  # http:, https:, data:, ...
MODULE_ID_RE = re.compile(r'^[A-Za-z0-9_-]+$')


def die(msg):
    sys.stderr.write(f'bundle.py: error: {msg}\n')
    sys.exit(1)


def read_text(path, what):
    """Read a UTF-8 file and normalise line endings to LF."""
    try:
        text = path.read_text(encoding='utf-8')
    except FileNotFoundError:
        die(f'{what} not found: {path}')
    except UnicodeDecodeError as exc:
        die(f'{what} is not valid UTF-8: {path} ({exc})')
    return text.replace('\r\n', '\n').replace('\r', '\n')


def parse_attrs(attr_str):
    """Return {lower-case name: value} for the attributes in a tag body."""
    attrs = {}
    for m in ATTR_RE.finditer(attr_str):
        value = next((g for g in m.group(2, 3, 4) if g is not None), '')
        attrs[m.group(1).lower()] = value
    return attrs


def local_path(ref, base_dir):
    """Path of a local href/src relative to index.html, or None if it is remote
    (has a scheme or starts with //) or root-relative (starts with /)."""
    ref = ref.strip()
    if not ref or SCHEME_RE.match(ref) or ref.startswith('/'):
        return None
    ref = ref.split('#', 1)[0].split('?', 1)[0]  # drop ?query and #hash
    return (base_dir / unquote(ref)).resolve()


def safe_js(code):
    return re.sub(r'</(script)', r'<\\/\1', code, flags=re.I)


def safe_css(code):
    return re.sub(r'</(style)', r'<\\/\1', code, flags=re.I)


def bundle(index_path, modules):
    """Return (html, notes): the bundled page and a list of human-readable notes."""
    base = index_path.parent
    html = read_text(index_path, 'index.html')
    notes = []
    inlined_modules = []

    def rel(path):
        try:
            return str(path.relative_to(base))
        except ValueError:
            return str(path)

    def replace_link(m):
        attrs = parse_attrs(m.group(1))
        if 'stylesheet' not in attrs.get('rel', '').lower().split():
            return m.group(0)
        path = local_path(attrs.get('href', ''), base)
        if path is None:
            notes.append(f'kept as-is (not a relative local file): {m.group(0)}')
            return m.group(0)
        css = read_text(path, 'stylesheet')
        media = f' media="{attrs["media"]}"' if attrs.get('media') else ''
        notes.append(f'inlined stylesheet {rel(path)}')
        return f'<style{media}>\n{safe_css(css).strip()}\n</style>'

    def replace_script(m):
        attr_str = m.group(1)
        attrs = parse_attrs(attr_str)
        if 'src' not in attrs:
            return m.group(0)  # already inline
        path = local_path(attrs['src'], base)
        if path is None:
            notes.append(f'kept as-is (not a relative local file): {m.group(0)}')
            return m.group(0)
        module_id = attrs.get('data-module')
        if module_id is not None:
            if module_id not in modules:
                notes.append(f'dropped data script for module "{module_id}" (not in --modules)')
                return ''
            inlined_modules.append(module_id)
        code = read_text(path, 'script')
        # Keep every attribute except src (data-module in particular).
        kept = SRC_ATTR_RE.sub('', attr_str).strip()
        open_tag = '<script' + (' ' + kept if kept else '') + '>'
        notes.append(f'inlined script {rel(path)}')
        return f'{open_tag}\n{safe_js(code).strip()}\n</script>'

    html = LINK_RE.sub(replace_link, html)
    html = SCRIPT_RE.sub(replace_script, html)

    # Modules asked for but absent from index.html: append data/<id>.js after the
    # last script (app.js must already be loaded so registerModule exists).
    missing = [mid for mid in modules if mid not in inlined_modules]
    if missing:
        blocks = []
        for mid in missing:
            path = base / 'data' / f'{mid}.js'
            numbered = re.fullmatch(r'm(\d+)', mid)   # module ids m1, m2, ... live in data/module1.js, data/module2.js, ...
            if not path.exists() and numbered:
                path = base / 'data' / f'module{numbered.group(1)}.js'
            code = read_text(path, f'data file for module "{mid}"')
            blocks.append(f'<script data-module="{mid}">\n{safe_js(code).strip()}\n</script>')
            notes.append(f'added {rel(path)} (index.html has no <script data-module="{mid}">)')
        block = '\n' + '\n'.join(blocks) + '\n'
        last_script = None
        for last_script in re.finditer(r'</script\s*>', html, re.I):
            pass
        if last_script is not None:
            pos = last_script.end()
            html = html[:pos] + block + html[pos:]
        else:
            body_end = BODY_END_RE.search(html)
            pos = body_end.start() if body_end else len(html)
            html = html[:pos] + block + html[pos:]

    stamp = (f'<!-- Bundled by tools/bundle.py (modules: {", ".join(modules)}). '
             f'Offline review copy: edit the source files, not this file. -->')
    doctype = DOCTYPE_RE.search(html)
    if doctype:
        html = html[:doctype.end()] + '\n' + stamp + html[doctype.end():]
    else:
        html = stamp + '\n' + html
    if not html.endswith('\n'):
        html += '\n'
    return html, notes


REVIEW_CSS = """
.reviewbar { background:#fff7ea; border-bottom:1px solid #e3c88f; color:#5c4200; font-size:13px; padding:8px 22px; display:flex; gap:10px 14px; align-items:center; flex-wrap:wrap; }
.reviewbar strong { font-weight:600; }
.reviewbar button { font:inherit; font-size:12.5px; padding:3px 10px; border:1px solid #c9a55a; background:#fff; color:#5c4200; border-radius:4px; cursor:pointer; }
.reviewbar button[aria-pressed="true"] { background:#5c4200; color:#fff; border-color:#5c4200; }
.reviewnote { margin:10px 0 0; padding:8px 12px; border:1px dashed #c9a55a; background:#fffdf6; color:#5c4200; font-size:12.5px; border-radius:4px; }
.reviewnote b { display:block; margin-bottom:2px; }
.reviewnote p { margin:0 0 3px; }
@media print { .reviewbar button, .calc-toggle, .calc, .modfoot { display:none !important; } .q { break-inside:avoid; } }
"""

REVIEW_JS = """
(function () {
  var NOTES = __NOTES__;
  var on = true, busy = false;
  function main() { return document.getElementById('main'); }
  function annotate() {
    var cards = document.querySelectorAll('.q[data-qid]');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i], note = NOTES[card.dataset.qid];
      if (!note || card.querySelector('.reviewnote')) continue;
      var box = document.createElement('div'); box.className = 'reviewnote';
      var head = document.createElement('b'); head.textContent = 'Reviewer note (not shown to students)'; box.appendChild(head);
      (Array.isArray(note) ? note : [note]).forEach(function (line) { var p = document.createElement('p'); p.textContent = String(line); box.appendChild(p); });
      card.appendChild(box);
    }
  }
  function apply() {
    if (busy || !window.PracticeApp) return;
    busy = true;
    try {
      if (on && document.querySelector('.q[data-qid]:not(.done), .q[data-qid].done:not(.has-hints)')) {
        window.PracticeApp.revealAll({ hints: true });
        var cards = document.querySelectorAll('.q[data-qid]');
        for (var i = 0; i < cards.length; i++) cards[i].classList.add('has-hints');
      }
      annotate();
    } finally { busy = false; }
  }
  function setMode(review) {
    on = review;
    document.getElementById('rv-all').setAttribute('aria-pressed', String(review));
    document.getElementById('rv-student').setAttribute('aria-pressed', String(!review));
    if (!review) { window.PracticeApp.modules().forEach(function (m) { window.PracticeApp.resetModule(m.id); }); window.PracticeApp.selectModule((location.hash || '').slice(1)) || 0; }
    apply();
  }
  function start() {
    var bar = document.createElement('div'); bar.className = 'reviewbar';
    bar.innerHTML = '<strong>Review copy for the teaching team.</strong> <span>Students see one hint per wrong answer and the solution only at the end.</span> ' +
      '<button type="button" id="rv-all" aria-pressed="true">Everything shown</button> <button type="button" id="rv-student" aria-pressed="false">Student view</button>';
    var nav = document.getElementById('modnav');
    nav.parentNode.insertBefore(bar, nav);
    document.getElementById('rv-all').addEventListener('click', function () { setMode(true); });
    document.getElementById('rv-student').addEventListener('click', function () { setMode(false); });
    new MutationObserver(function () { apply(); }).observe(main(), { childList: true });
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
"""


def add_review_layer(html, notes_path):
    """Append the reviewer bar, its styles and the optional per-question notes."""
    import json
    notes = {}
    if notes_path:
        try:
            notes = json.loads(read_text(Path(notes_path), 'notes file'))
        except ValueError as exc:
            die(f'notes file is not valid JSON: {notes_path} ({exc})')
        if not isinstance(notes, dict):
            die('notes file must be a JSON object {"question id": "note" or ["line", ...]}')
    js = REVIEW_JS.replace('__NOTES__', json.dumps(notes, ensure_ascii=False))
    block = f'<style>{safe_css(REVIEW_CSS)}</style>\n<script>{safe_js(js)}</script>\n'
    body_end = BODY_END_RE.search(html)
    pos = body_end.start() if body_end else len(html)
    return html[:pos] + block + html[pos:]


def parse_modules(values):
    """--modules m1,m2 or --modules m1 --modules m2 -> ordered, de-duplicated list."""
    ids = []
    for value in values:
        for mid in re.split(r'[,\s]+', value.strip()):
            if not mid:
                continue
            if not MODULE_ID_RE.match(mid):
                die(f'bad module id "{mid}" (letters, digits, - and _ only)')
            if mid not in ids:
                ids.append(mid)
    if not ids:
        die('--modules needs at least one module id, e.g. --modules m1')
    return ids


def main(argv=None):
    parser = argparse.ArgumentParser(
        description='Inline index.html, its assets and the listed data modules into one HTML file.')
    parser.add_argument('--modules', action='append', required=True, metavar='m1[,m2...]',
                        help='module ids to include (comma-separated or repeated)')
    parser.add_argument('--out', metavar='FILE', help='output file (default: stdout)')
    parser.add_argument('--index', metavar='PATH', default=str(REPO / 'index.html'),
                        help='page to bundle (default: <repo>/index.html)')
    parser.add_argument('--review', action='store_true',
                        help='review copy: show every hint and solution at once, with a toggle back to the student view')
    parser.add_argument('--notes', metavar='FILE',
                        help='with --review: JSON file {"question id": "note" or ["line", ...]} shown under each question')
    args = parser.parse_args(argv)
    if args.notes and not args.review:
        die('--notes only makes sense together with --review')

    modules = parse_modules(args.modules)
    index_path = Path(args.index).resolve()
    html, notes = bundle(index_path, modules)
    if args.review:
        html = add_review_layer(html, args.notes)
        notes.append('added the review layer' + (f' with notes from {args.notes}' if args.notes else ''))
    for note in notes:
        sys.stderr.write(f'bundle.py: {note}\n')

    if args.out:
        out = Path(args.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        with open(out, 'w', encoding='utf-8', newline='\n') as fh:
            fh.write(html)
        sys.stderr.write(f'bundle.py: wrote {out} ({len(html.encode("utf-8"))} bytes)\n')
    else:
        sys.stdout.buffer.write(html.encode('utf-8'))
    return 0


if __name__ == '__main__':
    sys.exit(main())
