#!/usr/bin/env bash
# tools/screenshot.sh - render a page with Windows Chrome (headless) from WSL.
#
#   tools/screenshot.sh <url-or-path> <out.png> [WxH]   # screenshot (default 1200x4000)
#   tools/screenshot.sh --dom <url-or-path> [WxH]       # print the rendered DOM to stdout
#
# <url-or-path> is an http(s):// URL or a local file, relative or absolute. A local
# path may carry ?query or #hash, e.g. tools/selftest.html?reveal=1 or index.html#m1.
# Chrome's stderr is written to $REPO/chrome.log. The exit status is non-zero when
# Chrome fails, the PNG was not written, or any INFO:CONSOLE line in the log
# contains "Error" (JS errors from the page). All console lines are echoed to stderr.
# Override the browser with CHROME=/path/to/chrome.exe, the time limit with TIMEOUT=secs.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROME="${CHROME:-/mnt/c/Program Files/Google/Chrome/Application/chrome.exe}"
PROFILE="$REPO/.chrome-profile/screenshot"   # this script's own profile directory
LOG="$REPO/chrome.log"
TIMEOUT="${TIMEOUT:-120}"

usage() {
  sed -n '2,12p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//' >&2
  exit 2
}
die() { echo "screenshot.sh: $*" >&2; exit 1; }

# ---- arguments --------------------------------------------------------------
mode=shot
if [[ "${1:-}" == "--dom" ]]; then mode=dom; shift; fi
[[ $# -ge 1 ]] || usage
target="$1"; shift
out=""
if [[ $mode == shot ]]; then
  [[ $# -ge 1 ]] || usage
  out="$1"; shift
fi
size="${1:-1200x4000}"
[[ "$size" =~ ^[0-9]+x[0-9]+$ ]] || die "size must look like 1200x4000, got '$size'"
W="${size%x*}"; H="${size#*x}"

[[ -f "$CHROME" ]] || die "Chrome not found at: $CHROME (set CHROME=...)"
command -v wslpath >/dev/null 2>&1 || die "wslpath not found - run this inside WSL"

# ---- URL --------------------------------------------------------------------
# Anything with a scheme passes through; a local path becomes file:///E:/... via wslpath -w.
to_url() {
  local t="$1" path suffix="" abs win
  if [[ "$t" =~ ^[A-Za-z][A-Za-z0-9+.-]*:// ]]; then printf '%s' "$t"; return; fi
  path="$t"
  if [[ "$t" =~ ^([^?#]*)([?#].*)$ ]]; then path="${BASH_REMATCH[1]}"; suffix="${BASH_REMATCH[2]}"; fi
  [[ -f "$path" ]] || die "file not found: $path"
  abs="$(cd "$(dirname "$path")" && pwd)/$(basename "$path")"
  win="$(wslpath -w "$abs")"
  printf 'file:///%s%s' "${win//\\//}" "$suffix"
}
url="$(to_url "$target")"

# ---- Chrome arguments -------------------------------------------------------
mkdir -p "$PROFILE"
: > "$LOG"
args=(
  --headless=new --disable-gpu --hide-scrollbars --no-first-run --no-default-browser-check
  --user-data-dir="$(wslpath -w "$PROFILE")"
  --window-size="$W,$H"
  --enable-logging=stderr --v=0
)

png=""
if [[ $mode == shot ]]; then
  [[ "$out" == *.png ]] || die "output must end in .png, got '$out'"
  outdir="$(dirname "$out")"
  mkdir -p "$outdir"
  outdir="$(cd "$outdir" && pwd)"
  name="$(basename "$out")"
  png="$outdir/$name"
  rm -f "$png"                       # so a stale file cannot pass the check below
  # --screenshot MUST be a Windows path; a Linux path silently writes nothing.
  args+=( --screenshot="$(wslpath -w "$outdir")\\$name" )
fi

# ---- run --------------------------------------------------------------------
rc=0
if [[ $mode == dom ]]; then
  dom="$(mktemp)"
  trap 'rm -f "$dom"' EXIT
  timeout "$TIMEOUT" "$CHROME" "${args[@]}" --dump-dom "$url" > "$dom" 2> "$LOG" || rc=$?
else
  timeout "$TIMEOUT" "$CHROME" "${args[@]}" "$url" 2> "$LOG" || rc=$?
fi
(( rc == 0 )) || die "Chrome exited with status $rc for $url (see $LOG)"

# ---- results ----------------------------------------------------------------
console="$(grep -a 'INFO:CONSOLE' "$LOG" || true)"
errors="$(printf '%s\n' "$console" | grep -a 'Error' || true)"

if [[ $mode == dom ]]; then
  tr -d '\r' < "$dom"
else
  [[ -s "$png" ]] || die "no screenshot written at $png (see $LOG)"
  echo "$png"
fi
if [[ -n "$console" ]]; then
  echo "screenshot.sh: console output from $url:" >&2
  printf '%s\n' "$console" >&2
fi
[[ -z "$errors" ]] || die "console errors on $url (see $LOG)"
