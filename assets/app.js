/* MGMT 405 practice exercises — app logic.
 *
 * Plain JavaScript, no dependencies. Data files call `registerModule({...})`;
 * this file renders the module tabs, question cards, stats, the floating
 * calculator and keeps per-question progress in localStorage.
 *
 * Nothing here touches the DOM at load time: everything runs from init(),
 * which fires on DOMContentLoaded (or immediately if the DOM is already parsed).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'mgmt405_ucla_practice_v1';
  var MAX_ATTEMPTS = 3;
  var BANNER_TEXT = "Progress can't be saved in this browser or embed — open the page directly to keep your progress.";
  var FILTERS = ['all', 'numeric', 'conceptual'];

  var modules = [];        // registered modules, in registration order
  var state = {};          // { qid: {attempts, hints_shown, completed, correct, choice, feedback:{type,text}} }
  var storageOK = false;   // result of the storage probe at init
  var activeModule = null; // id of the module shown
  var typeFilter = 'all';  // 'all' | 'numeric' | 'conceptual'
  var initialized = false;
  var scriptErrors = [];   // window 'error' events, used to enrich the module-load error card
  var els = {};            // DOM elements looked up at init

  // ---------------------------------------------------------------------------
  // Script error capture. Registered at load so a SyntaxError inside a data file
  // (which runs after app.js but before DOMContentLoaded) is recorded. The
  // capture phase also catches <script> 404s, whose error event does not bubble.
  // ---------------------------------------------------------------------------
  window.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t !== window && t.tagName === 'SCRIPT') {
      scriptErrors.push({ src: t.src || '', lineno: 0, colno: 0, message: 'the script could not be loaded (file missing or blocked)' });
    } else {
      scriptErrors.push({ src: e.filename || '', lineno: e.lineno || 0, colno: e.colno || 0, message: e.message || '' });
    }
    if (initialized) renderMain();
  }, true);

  // ---------------------------------------------------------------------------
  // Module registry
  // ---------------------------------------------------------------------------
  function indexOfModule(id) {
    for (var i = 0; i < modules.length; i++) if (modules[i].id === id) return i;
    return -1;
  }
  function moduleById(id) { var i = indexOfModule(id); return i >= 0 ? modules[i] : null; }
  function currentModule() { return moduleById(activeModule); }

  // Returns {mod, q, idx} for a question id, or null.
  function findQuestion(qid) {
    for (var i = 0; i < modules.length; i++) {
      var qs = modules[i].questions;
      for (var j = 0; j < qs.length; j++) if (qs[j].id === qid) return { mod: modules[i], q: qs[j], idx: j };
    }
    return null;
  }

  window.registerModule = function registerModule(mod) {
    if (!mod || typeof mod.id !== 'string' || !Array.isArray(mod.questions)) {
      console.error('registerModule: expected an object {id, title, questions: [...]}', mod);
      return;
    }
    var i = indexOfModule(mod.id);
    if (i >= 0) modules[i] = mod; else modules.push(mod);
    if (initialized) {              // late registration: show it right away
      if (!activeModule) activeModule = hashModuleId() || mod.id;
      renderAll();
    }
  };

  // ---------------------------------------------------------------------------
  // Progress state + storage
  // ---------------------------------------------------------------------------
  function probeStorage() {
    try {
      var k = STORAGE_KEY + '__probe';
      window.localStorage.setItem(k, '1');
      var ok = window.localStorage.getItem(k) === '1';
      window.localStorage.removeItem(k);
      return ok;
    } catch (_) { return false; }
  }
  function loadState() {
    if (!storageOK) return {};
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var obj = raw ? JSON.parse(raw) : {};
      return (obj && typeof obj === 'object' && !Array.isArray(obj)) ? obj : {};
    } catch (_) { return {}; }
  }
  function saveState() {
    if (!storageOK) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* keep in memory */ }
  }
  // Re-read storage before a mutation so a write never discards progress another tab saved since init.
  function refreshState() { if (storageOK) state = loadState(); }
  function blankState() {
    return { attempts: 0, hints_shown: 0, completed: false, correct: false, choice: null, feedback: null };
  }
  // Read-only view (never creates an entry).
  function getS(qid) { return state[qid] || blankState(); }
  // Writable entry (creates it on first use).
  function ensureS(qid) { if (!state[qid]) state[qid] = blankState(); return state[qid]; }

  function showBanner() {
    var b = document.getElementById('storage-banner');
    if (!b) {
      b = document.createElement('div');
      b.id = 'storage-banner';
      b.className = 'banner';
      var anchor = document.getElementById('modnav') || els.main;
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(b, anchor); else document.body.insertBefore(b, document.body.firstChild);
    }
    b.textContent = BANNER_TEXT;
    b.hidden = false;
  }

  // ---------------------------------------------------------------------------
  // Small DOM helpers
  // ---------------------------------------------------------------------------
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }
  function letter(i) { return String.fromCharCode(65 + i) + ')'; }   // 0 → "A)"

  // ---------------------------------------------------------------------------
  // Rendering: tabs, module heading, cards
  // ---------------------------------------------------------------------------
  function renderAll() { renderTabs(); renderMain(); updateStats(); }

  function renderTabs() {
    if (!els.nav) return;
    els.nav.innerHTML = '';
    modules.forEach(function (m) {
      var b = el('button', m.id === activeModule ? 'active' : '', (m.title || m.id) + ' (' + m.questions.length + ')');
      b.type = 'button';
      b.dataset.mid = m.id;
      if (m.subtitle) b.title = m.subtitle;
      b.addEventListener('click', function () { selectModule(m.id); });
      els.nav.appendChild(b);
    });
  }

  function visibleQuestions() {
    var mod = currentModule();
    if (!mod) return [];
    return mod.questions.filter(function (q) { return typeFilter === 'all' || q.kind === typeFilter; });
  }

  function renderMain() {
    if (!els.main) return;
    els.main.innerHTML = '';
    var nErr = renderModuleErrors(els.main);
    var mod = currentModule();
    if (!mod) {
      if (!nErr) els.main.appendChild(el('p', 'muted', 'No practice modules are loaded yet.'));
      return;
    }
    var head = el('div', 'modtitle');
    head.appendChild(el('h2', null, mod.title || mod.id));
    if (mod.subtitle) head.appendChild(el('p', 'modsub', mod.subtitle));
    els.main.appendChild(head);

    var qs = visibleQuestions();
    if (!qs.length) { els.main.appendChild(el('p', 'muted', 'No questions match this filter.')); return; }
    qs.forEach(function (q) { els.main.appendChild(renderCard(q, mod.questions.indexOf(q))); });
  }

  // Which <script data-module> ids never registered? → one error card each.
  function missingModules() {
    var out = [];
    var scripts = document.querySelectorAll('script[data-module]');
    for (var i = 0; i < scripts.length; i++) {
      var id = scripts[i].getAttribute('data-module');
      if (id && indexOfModule(id) < 0) out.push({ id: id, rel: scripts[i].getAttribute('src') || '', abs: scripts[i].src || '' });
    }
    return out;
  }
  function describeScriptError(m, file, nMissing) {
    for (var i = 0; i < scriptErrors.length; i++) {
      var e = scriptErrors[i];
      var same = (m.abs && e.src === m.abs) || (m.rel && e.src && e.src.slice(-m.rel.replace(/^(\.\.?\/)+/, '').length) === m.rel.replace(/^(\.\.?\/)+/, ''));
      if (same) return e.message + (e.lineno ? ' at ' + file + ':' + e.lineno + (e.colno ? ':' + e.colno : '') : '');
    }
    // Browsers hide details of cross-origin scripts (e.g. when opened from file://).
    var hidden = scriptErrors.some(function (e) { return !e.src && /script error/i.test(e.message); });
    if (hidden && nMissing === 1) return 'The browser reported a script error but hid the line (this happens when the page is opened from file://). Open the browser console or run tools/validate.py to see the exact line.';
    return 'Make sure the file exists and holds valid JSON inside registerModule( … ); tools/validate.py reports the exact line.';
  }
  function renderModuleErrors(container) {
    var missing = missingModules();
    missing.forEach(function (m) {
      var file = m.rel || ('data/' + m.id + '.js');
      var card = el('div', 'q module-error');
      card.dataset.moduleError = m.id;
      card.appendChild(el('strong', null, 'Module data failed to load — check ' + file));
      card.appendChild(el('div', 'detail', describeScriptError(m, file, missing.length)));
      container.appendChild(card);
    });
    return missing.length;
  }

  function renderTable(t) {
    var table = el('table', 'qtable');
    if (t.headers && t.headers.length) {
      var thead = el('thead'), tr = el('tr');
      t.headers.forEach(function (h) { tr.appendChild(el('th', null, h)); });
      thead.appendChild(tr); table.appendChild(thead);
    }
    var tbody = el('tbody');
    (t.rows || []).forEach(function (row) {
      var r = el('tr');
      row.forEach(function (c) { r.appendChild(el('td', null, c)); });
      tbody.appendChild(r);
    });
    table.appendChild(tbody);
    return table;
  }

  // Figure via window.Figures (owned by assets/figures.js). Returns a wrapper or null.
  function renderFigure(spec) {
    if (!spec) return null;
    var svg = '';
    try {
      svg = (window.Figures && typeof window.Figures.render === 'function') ? window.Figures.render(spec) : '';
    } catch (e) { console.warn('Figures.render failed', e); svg = ''; }
    if (!svg || typeof svg !== 'string') return null;
    var wrap = el('div', 'fig' + (spec.panels && spec.panels.length === 2 ? ' two' : ''));
    wrap.innerHTML = svg;   // figures.js escapes its labels; the markup is ours
    return wrap;
  }

  function renderSolution(q) {
    var sol = el('div', 'solution');
    sol.appendChild(el('h4', null, 'Solution'));
    var paras = Array.isArray(q.solution) ? q.solution : [String(q.solution || '')];
    paras.forEach(function (p) { sol.appendChild(el('p', null, p)); });
    var fig = renderFigure(q.figure);
    if (fig) sol.appendChild(fig);
    return sol;
  }

  // One question card. opts.prompt shows a transient "pick an option" message.
  function renderCard(q, idx, opts) {
    var s = getS(q.id);
    var revealed = s.completed && !s.correct && s.attempts === 0;   // set by revealAll()
    var outcome = !s.completed ? '' : (s.correct ? 'correct' : (revealed ? 'revealed' : 'failed'));
    var hints = Array.isArray(q.hints) ? q.hints : [];
    var choices = Array.isArray(q.choices) ? q.choices : [];

    var card = el('article', 'q' + (s.completed ? ' done ' + outcome : ''));
    card.dataset.qid = q.id;
    card.id = q.id;

    // Head: number, theme tag, kind, status
    var head = el('div', 'qhead');
    head.appendChild(el('span', 'qnum', 'Q' + (idx + 1)));
    if (q.theme) head.appendChild(el('span', 'qtag', q.theme));
    if (q.kind) head.appendChild(el('span', 'qkind ' + (q.kind === 'numeric' ? 'numeric' : 'conceptual'), q.kind === 'numeric' ? 'Numeric' : 'Conceptual'));
    var statusText = outcome === 'correct' ? '✓ Solved' : outcome === 'failed' ? '✗ Not solved' : outcome === 'revealed' ? 'Solution shown' : '';
    head.appendChild(el('span', 'qstatus ' + outcome, statusText));
    card.appendChild(head);

    if (q.source) card.appendChild(el('div', 'qsource', 'Covered in: ' + q.source));

    // Stem paragraphs (split on \n), optional table, bold ask
    var stem = el('div', 'qstem');
    String(q.stem || '').split('\n').forEach(function (p) { if (p.trim()) stem.appendChild(el('p', null, p)); });
    card.appendChild(stem);
    if (q.table && typeof q.table === 'object') card.appendChild(renderTable(q.table));
    if (q.ask) card.appendChild(el('p', 'qask', q.ask));

    // Options as radio inputs
    var box = el('div', 'choices');
    box.setAttribute('role', 'radiogroup');
    choices.forEach(function (text, i) {
      var lbl = el('label');
      if (s.choice === i) lbl.classList.add('selected');
      if (s.completed && i === q.correct_index) lbl.classList.add('answer');
      if (s.completed && s.choice === i && i !== q.correct_index) lbl.classList.add('wrong');
      var inp = document.createElement('input');
      inp.type = 'radio'; inp.name = q.id; inp.value = String(i);
      inp.checked = s.choice === i;
      inp.disabled = !!s.completed;
      lbl.appendChild(inp);
      lbl.appendChild(el('strong', null, letter(i) + ' '));
      lbl.appendChild(document.createTextNode(text));
      box.appendChild(lbl);
    });
    card.appendChild(box);

    // Submit row
    var row = el('div', 'actions');
    var btn = el('button', 'action', 'Check answer');
    btn.type = 'button';
    btn.dataset.action = 'submit';
    btn.dataset.qid = q.id;
    btn.disabled = !!s.completed;
    row.appendChild(btn);
    row.appendChild(el('span', 'attempts', 'Attempts: ' + s.attempts + ' / ' + MAX_ATTEMPTS));
    if (opts && opts.prompt) row.appendChild(el('span', 'prompt', opts.prompt));
    card.appendChild(row);

    // Feedback (persisted), hints revealed so far, solution when completed
    if (s.feedback && s.feedback.text) {
      var fb = el('div', 'feedback ' + (s.feedback.type || 'info'), s.feedback.text);
      fb.setAttribute('role', 'status');
      card.appendChild(fb);
    }
    var n = Math.min(s.hints_shown || 0, hints.length);
    for (var h = 0; h < n; h++) {
      var hint = el('div', 'hint');
      hint.appendChild(el('b', null, 'Hint ' + (h + 1) + ': '));
      hint.appendChild(document.createTextNode(hints[h]));
      card.appendChild(hint);
    }
    if (s.completed) card.appendChild(renderSolution(q));
    return card;
  }

  // Replace just this question's card in place (keeps scroll position).
  function rerenderCard(found, opts) {
    if (!els.main) return;
    var old = els.main.querySelector('.q[data-qid="' + found.q.id + '"]');
    if (old) old.replaceWith(renderCard(found.q, found.idx, opts));
  }

  function updateStats() {
    var qs = visibleQuestions();
    var attempted = 0, correct = 0;
    qs.forEach(function (q) {
      var s = state[q.id];
      if (s && (s.completed || s.attempts > 0)) attempted++;
      if (s && s.correct) correct++;
    });
    if (els.progress) els.progress.textContent = attempted + ' / ' + qs.length + ' attempted';
    if (els.correct) els.correct.textContent = correct + ' correct';
  }

  // ---------------------------------------------------------------------------
  // Mechanics
  // ---------------------------------------------------------------------------
  // submit(qid, choiceIndex) → {ok, consumed, status}
  //   status: 'blank' (nothing selected, no attempt used) | 'wrong' | 'failed' (3rd wrong)
  //           | 'repeat' (same choice as the last wrong attempt, no attempt used)
  //           | 'correct' | 'completed' (already answered) | 'unknown' (bad qid)
  function submit(qid, choiceIndex) {
    var found = findQuestion(qid);
    if (!found) return { ok: false, consumed: false, status: 'unknown' };
    var q = found.q;
    var choices = Array.isArray(q.choices) ? q.choices : [];
    var hints = Array.isArray(q.hints) ? q.hints : [];
    refreshState();
    var s0 = getS(qid);
    if (s0.completed) return { ok: !!s0.correct, consumed: false, status: 'completed' };

    var idx = (choiceIndex === null || choiceIndex === undefined || choiceIndex === '') ? NaN : Number(choiceIndex);
    if (!(idx >= 0 && idx < choices.length && Math.floor(idx) === idx)) {
      rerenderCard(found, { prompt: 'Pick an option first.' });
      return { ok: false, consumed: false, status: 'blank' };
    }
    if (s0.attempts > 0 && idx === s0.choice) {   // double-click / re-click of the option just marked wrong
      rerenderCard(found, { prompt: 'You already tried ' + letter(idx) + ' — pick a different option.' });
      return { ok: false, consumed: false, status: 'repeat' };
    }

    var s = ensureS(qid);
    s.attempts += 1;
    s.choice = idx;
    var status;
    if (idx === q.correct_index) {
      s.completed = true; s.correct = true;
      s.feedback = { type: 'correct', text: '✓ Correct!' };
      status = 'correct';
    } else if (s.attempts >= MAX_ATTEMPTS) {
      s.completed = true; s.correct = false;
      s.hints_shown = hints.length;
      s.feedback = { type: 'wrong', text: '✗ Not quite — Hint ' + s.attempts + ' revealed below. No attempts left: the full solution is shown below.' };
      status = 'failed';
    } else {
      s.hints_shown = Math.min(s.attempts, hints.length);
      s.feedback = { type: 'wrong', text: '✗ Not quite — Hint ' + s.attempts + ' revealed below.' };
      status = 'wrong';
    }
    saveState();
    rerenderCard(found);
    updateStats();
    return { ok: status === 'correct', consumed: true, status: status };
  }

  function resetModule(mid) {
    var mod = moduleById(mid || activeModule);
    if (!mod) return false;
    refreshState();
    mod.questions.forEach(function (q) { delete state[q.id]; });
    saveState();
    if (mod.id === activeModule) { renderMain(); updateStats(); }
    return true;
  }

  // Marks every question of the active module completed and shows all solutions
  // (+ figures). Used for screenshots and the self-test.
  function revealAll() {
    var mod = currentModule();
    if (!mod) return false;
    refreshState();
    mod.questions.forEach(function (q) {
      var s = ensureS(q.id);
      if (!s.completed) {
        s.completed = true; s.correct = false;
        s.feedback = { type: 'info', text: 'Solution shown.' };
      }
    });
    saveState();
    renderMain();
    updateStats();
    return true;
  }

  function hashModuleId() {
    var id = (window.location.hash || '').replace(/^#/, '');
    return indexOfModule(id) >= 0 ? id : null;
  }
  function syncHash(mid) {
    var want = '#' + mid;
    if (window.location.hash === want) return;
    try { window.history.replaceState(null, '', want); } catch (_) { /* leave the URL alone */ }
  }
  function selectModule(mid) {
    if (indexOfModule(mid) < 0) return false;
    activeModule = mid;
    renderAll();
    syncHash(mid);
    return true;
  }
  function setFilter(kind) {
    if (FILTERS.indexOf(kind) < 0) return false;
    typeFilter = kind;
    if (els.filter && els.filter.value !== kind) els.filter.value = kind;
    renderMain();
    updateStats();
    return true;
  }

  // ---------------------------------------------------------------------------
  // Event handlers (delegated)
  // ---------------------------------------------------------------------------
  function onMainClick(e) {
    var btn = e.target.closest ? e.target.closest('button[data-action="submit"]') : null;
    if (!btn) return;
    var card = btn.closest('.q');
    var sel = card ? card.querySelector('input[type="radio"]:checked') : null;
    submit(btn.dataset.qid, sel ? parseInt(sel.value, 10) : null);
  }
  function onMainChange(e) {
    var t = e.target;
    if (!t || t.type !== 'radio') return;
    var box = t.closest('.choices');
    if (!box) return;
    var labels = box.querySelectorAll('label');
    for (var i = 0; i < labels.length; i++) labels[i].classList.remove('selected');
    var lbl = t.closest('label');
    if (lbl) lbl.classList.add('selected');
  }
  function onResetClick() {
    var mod = currentModule();
    if (!mod) return;
    if (!window.confirm('Reset your progress on ' + (mod.title || mod.id) + '? This cannot be undone.')) return;
    resetModule(mod.id);
  }
  // Another tab of this site saved progress: pick it up and re-render only the cards that changed.
  function onStorage(e) {
    if (!storageOK || (e.key !== null && e.key !== STORAGE_KEY)) return;
    var before = state;
    state = loadState();
    var mod = currentModule();
    if (!mod) return;
    mod.questions.forEach(function (q, idx) {
      if (JSON.stringify(before[q.id] || null) !== JSON.stringify(state[q.id] || null)) rerenderCard({ q: q, idx: idx });
    });
    updateStats();
  }
  function onHashChange() {
    var id = hashModuleId();
    if (id && id !== activeModule) selectModule(id);
  }

  // ---------------------------------------------------------------------------
  // Floating calculator (ported from the original single-file page)
  // ---------------------------------------------------------------------------
  function initCalculator() {
    var calc = document.getElementById('calc');
    var disp = document.getElementById('calcdisp');
    var toggle = document.getElementById('calctoggle');
    if (!calc || !disp || !toggle) return;
    var expr = '';
    var SAFE = /^[\d+\-*/().\s*]+$/;   // digits, + - * / ( ) . and whitespace; "**" is allowed for powers

    function update() { disp.textContent = expr || '0'; disp.classList.remove('err'); }
    function fail() { disp.textContent = 'Error'; disp.classList.add('err'); expr = ''; }
    function evaluate(src) {
      if (!SAFE.test(src.replace(/\*\*/g, ''))) throw new Error('bad input');
      src = src.replace(/(^|[^\d.])0+(?=\d)/g, '$1');   // "0012" → "12": a leading zero must not read as legacy octal
      var v = Function('"use strict"; return (' + src + ')')();   // keypad-only input that passed the whitelist; strict mode rejects any leftover octal form
      if (typeof v !== 'number' || !isFinite(v)) throw new Error('overflow');
      return v;
    }
    function format(v) { return String(+v.toFixed(10).replace(/\.?0+$/, '')); }

    toggle.addEventListener('click', function () { calc.classList.toggle('show'); });
    calc.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.keys button') : null;
      if (!b) return;
      var k = b.dataset.key, a = b.dataset.act;
      if (a === 'clear') { expr = ''; update(); }
      else if (a === 'back') { expr = expr.slice(0, -1); update(); }
      else if (a === 'eq') {
        if (!expr) return;
        try { expr = format(evaluate(expr)); update(); } catch (_) { fail(); }
      }
      else if (a === 'sqrt') {
        try {
          var v = expr ? evaluate(expr) : 0;
          if (v < 0) throw new Error('negative');
          expr = format(Math.sqrt(v)); update();
        } catch (_) { fail(); }
      }
      else if (k) { expr += k; update(); }
    });
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------
  function init() {
    if (initialized) return;
    initialized = true;

    els.nav = document.getElementById('modnav');
    els.main = document.getElementById('main');
    els.filter = document.getElementById('typefilter');
    els.progress = document.getElementById('progress');
    els.correct = document.getElementById('correct');
    els.reset = document.getElementById('reset');
    if (!els.main) {                       // minimal fallback so the page still shows something
      els.main = document.createElement('main');
      els.main.id = 'main';
      document.body.appendChild(els.main);
    }

    storageOK = probeStorage();
    state = loadState();
    if (!storageOK) showBanner();

    activeModule = hashModuleId() || (modules.length ? modules[0].id : null);
    if (els.filter) {
      if (FILTERS.indexOf(els.filter.value) >= 0) typeFilter = els.filter.value;
      els.filter.addEventListener('change', function () { setFilter(els.filter.value); });
    }
    if (els.reset) els.reset.addEventListener('click', onResetClick);
    els.main.addEventListener('click', onMainClick);
    els.main.addEventListener('change', onMainChange);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('storage', onStorage);

    initCalculator();
    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Test hooks / public API
  window.PracticeApp = {
    modules: function () { return modules.slice(); },
    state: function () { return JSON.parse(JSON.stringify(state)); },
    submit: submit,
    resetModule: resetModule,
    revealAll: revealAll,
    selectModule: selectModule,
    setFilter: setFilter
  };
})();
