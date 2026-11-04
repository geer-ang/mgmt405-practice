# MGMT 405 practice exercises — site guide

Live site: **https://geer-ang.github.io/mgmt405-practice/**

## What this is

A small website with the practice exercises for MGMT 405 (Managerial Economics, UCLA Anderson).
Students open the link, pick a module and answer multiple-choice questions. A wrong answer reveals
the next hint; after the third wrong attempt, or as soon as they get it right, the full worked
solution appears (with a graph where one helps). Progress is saved in the student's own browser.
There is no login and nothing is sent anywhere.

The site is just files in this repository. GitHub publishes them for free; every time a file
changes on the `main` branch, the site updates itself within a minute or two.

## Where things live

| File or folder | What it is |
|---|---|
| `data/module1.js` | The questions for Module 1 — **the only file you normally edit** |
| `data/module2.js`, ... | One file per module |
| `index.html` | The page itself (title bar and the gray disclosure line under it) |
| `assets/` | Look and behaviour (`style.css`, `app.js`, `figures.js`) |
| `tools/` | Helper scripts for the TA (see "Local checks") |
| `.github/workflows/deploy.yml` | The automatic check-and-publish step |

## Editing a question on github.com

You need edit rights on the repository: the TA adds your GitHub username under
**Settings → Collaborators** and you accept the invitation email once. Without this, GitHub offers
to fork the repository and open a pull request instead of saving your change.

1. Open https://github.com/geer-ang/mgmt405-practice (sign in to GitHub first).
2. Click the **`data`** folder, then **`module1.js`**.
3. Click the **pencil icon** (top right of the file box, "Edit this file").
4. Make your change in the editor. To jump to a question, press Ctrl+F (Cmd+F on a Mac) and
   search for its id, for example `m1-q07`.
5. Click the green **Commit changes...** button (top right). Type a short note such as
   "Fix typo in Q7 hint 2", leave **"Commit directly to the main branch"** selected, and click
   **Commit changes**.
6. Wait one to two minutes, then reload the site. If you still see the old text, do a hard refresh
   (Ctrl+F5 on Windows, Cmd+Shift+R on a Mac).

If the editor shows a banner saying you do not have write access, asks you to **Fork this
repository**, or the commit dialog offers **Propose changes** with no "Commit directly to the main
branch" option, you are not a collaborator yet — ask the TA to add you, then edit again.

A question in the file looks like this (shortened):

```js
{
  "id": "m1-q07",
  "theme": "Consumer Surplus",
  "source": "In-person Lecture 2: Supply and Demand",
  "kind": "numeric",
  "stem": "A tutor faces demand P = 50 − Q.\nShe charges $20 per lesson.",
  "ask": "What is the consumer surplus?",
  "choices": ["$450", "$600", "$300", "$900"],
  "correct_index": 0,
  "hints": ["Draw the demand line.", "Find Q at P = 20.", "Area of a triangle: ½ × base × height."],
  "solution": ["At P = 20, Q = 30.", "CS = ½ × 30 × 30 = $450."]
}
```

- `correct_index` is **0 for A, 1 for B, 2 for C, 3 for D**.
- Every question has exactly **4 choices** and exactly **3 hints**. `solution` is a list of
  paragraphs, one string each.
- `stem` and `ask` are shown to students; `source` appears as "Covered in: ...".
- Keep the first line `registerModule({` and the last line `})` exactly as they are.
- Keep the `"id"` values as they are: a student's saved progress is tied to the id.

## The three mistakes that break the file

The file is in a strict format (JSON). Three rules cover nearly every problem.

**1. A quotation mark inside the text needs a backslash in front of it.**

```
Wrong:  "ask": "What is the "fair" price?",
Right:  "ask": "What is the \"fair\" price?",
```
(Curly quotes “like these” need no backslash — only the straight `"` does.)

**2. No line breaks inside the quotes.** Each piece of text stays on one line. Only `stem` may
contain paragraph breaks, written as `\n`:

```
Wrong:  "stem": "A tutor faces demand P = 50 − Q.
        She charges $20 per lesson.",
Right:  "stem": "A tutor faces demand P = 50 − Q.\nShe charges $20 per lesson.",
```
For a new paragraph in the solution, add another string to the list instead:
`"solution": ["First paragraph.", "Second paragraph."]`.

**3. No comma after the last item in a list.** Every item except the last ends with a comma.

```
Wrong:  "hints": [
          "Draw the demand line.",
          "Find Q at P = 20.",
          "Use the triangle formula.",
        ],
Right:  "hints": [
          "Draw the demand line.",
          "Find Q at P = 20.",
          "Use the triangle formula."
        ],
```
The same applies to the list of questions and to the fields inside a question: the last field
has no trailing comma.

## What a red ✗ means

Every commit is checked automatically before it is published. On the repository's front page,
next to the latest commit message, you will see a **yellow dot** (checking), a **green ✓**
(published) or a **red ✗** (rejected).

A red ✗ never breaks the site: **the live site keeps the previous version until a commit passes.**
To see what to fix:

1. Click the red ✗, then **Details** (or open the **Actions** tab and click the top run).
2. Click **validate** in the left column, then expand the step **Validate data files**.
3. The first line names the place and the likely cause, for example
   `data/module1.js line 212 col 7: a raw line break or tab inside a quoted string`, followed by
   the offending line with a `^` under the spot. A comma after the last item is reported as a
   trailing comma; the `^` sits either under the comma itself or under the closing `]` or `}` on the
   next line, so look one line up as well.
4. Edit the file again (line numbers are shown on the left of the editor), commit, and the check
   runs again.

If **validate** is green and only **deploy** is red, the data file is fine — the problem is on the
GitHub Pages side (most often the one-time setting below is missing). Tell the TA.

## First-time setup (TA, once)

Done on 2026-11-01; kept for reference. On github.com, **Settings → Pages → Build and deployment →
Source** must be **GitHub Actions**, and the repository variable `PAGES_ENABLED` must be `true`
(Settings → Secrets and variables → Actions → Variables). Until both are set the **deploy** job is
simply skipped and only **validate** runs; if **deploy** ever runs before Pages is enabled it fails
with "Get Pages site failed" even though the data files are fine. After enabling Pages, open the
**Actions** tab, click the failed run and press **Re-run all jobs** (or make any commit).

## Adding a module

Done once per module, normally by the TA:

1. Generate the data file from the module's Word document:
   ```
   python3 tools/docx_to_data.py "Module 2 Practice Exercises.docx" --module m2 --title "Module 2" \
       --subtitle "Short description of the module" --out data/module2.js --check
   ```
   `--check` compares the result against the Word text and reports any difference.
   (Module 1 was revised by hand after import, on 2026-11-03: edit `data/module1.js` directly and do
   not re-run the script on the Module 1 Word file, which is now historical.)
2. Check it: `python3 tools/validate.py data/*.js`.
3. In `index.html`, add one line after the existing module line:
   `<script src="data/module2.js" data-module="m2"></script>`.
4. Commit. The site now shows a "Module 2" tab, and the direct link is
   `https://geer-ang.github.io/mgmt405-practice/#m2`.

## Draft, review, publish

- **Work on the `draft` branch** when a module is not ready for students. Only `main` is
  published to the site.
- **Review copy:** `python3 tools/bundle.py --modules m1,m2 --out preview.html` builds one
  self-contained HTML file that works offline. Double-click it, or email it to a colleague for
  review. Files named `preview*.html` are ignored by git and never published.
- **Publish:** on github.com, click **Pull requests** → **New pull request**, set *base:* `main` and
  *compare:* `draft`, click **Create pull request**, then **Merge pull request** and
  **Confirm merge**. The check runs and the site updates.

## Who can see what

The repository is **public**: anyone can read its files, branches and full history (including
deleted or edited questions). The published site shows only the current questions on `main`.
Nothing links to it until the TA adds it to BruinLearn.

Two rules follow: never put anything confidential in the repository (exam material, graded work,
grades, notes meant only for the teaching team), and treat every commit as permanent.

## Putting it in BruinLearn

**Recommended: a link that opens in a new tab.** Saved progress works only when students open the
page directly.

1. In the course, open **Modules**, click **+** next to the module where it should appear.
2. Choose **External URL**, paste `https://geer-ang.github.io/mgmt405-practice/#m1`, give it a
   name such as "Module 1 practice exercises", tick **Load in a new tab**, and click **Add Item**.

**Second option: embed it in a page** — only if saved progress is not needed. In a BruinLearn page,
open the HTML editor (the `</>` icon) and paste:

```html
<iframe src="https://geer-ang.github.io/mgmt405-practice/#m1"
        width="100%" height="900" style="border:0"
        title="MGMT 405 practice exercises"></iframe>
```

Caveat: cross-site iframes get partitioned or blocked storage, so progress is usually lost when the
page is reloaded. The embedded page shows a small notice saying so and suggesting the direct link.

## Local checks (for the TA)

Run from the repository folder.

- **Data files:** `python3 tools/validate.py data/*.js` — the same check GitHub runs; the first
  output line of an error names the file, line and column.
- **Behaviour:** open `tools/selftest.html` in a browser. It prints one line per check,
  `SELFTEST PASS: ...` or `SELFTEST FAIL: ...`, ending with `SELFTEST DONE pass=n fail=m`.
  From WSL without opening a window: `tools/screenshot.sh --dom tools/selftest.html | grep SELFTEST`.
- **Rendering:** `tools/screenshot.sh index.html shots/index.png` (optionally add a size such as
  `1200x6000`) renders the page with Windows Chrome headless from WSL and writes a PNG; it exits with
  an error if the page logged any JavaScript error. `tools/screenshot.sh --dom <page>` prints the
  rendered HTML instead. Chrome's log goes to `chrome.log`; `shots/`, `chrome.log` and the Chrome
  profile are ignored by git.
- **Offline copy:** `python3 tools/bundle.py --modules m1 --out preview.html` (see "Draft, review,
  publish").
