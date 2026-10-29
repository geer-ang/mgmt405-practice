/* assets/figures.js — inline SVG figures for the practice site.
 *
 * window.Figures.render(spec) -> string of SVG markup, or "" for an unknown/invalid spec.
 * Pure function: no DOM access, no dependencies, never throws. All text is escaped.
 * Colors use CSS variables with fallbacks so a stylesheet can retheme the figures.
 *
 * Kinds:
 *   "sd"            supply & demand with shifts, 1 or 2 panels side by side
 *   "demand-areas"  linear inverse demand with a price line and shaded areas
 *   "staircase"     discrete willingness-to-pay demand (one buyer per step)
 */
(function () {
  'use strict';

  // ---------- palette ----------
  const C = {
    demand: 'var(--fig-demand,#0066cc)',
    supply: 'var(--fig-supply,#b85c00)',
    dot: '#1a1a1a',
    drop: '#888',
    arrow: '#777',
    axis: '#444',
    text: '#1a1a1a',
    muted: '#555',
    fill: { cs: 'rgba(42,138,62,.22)', revenue: 'rgba(0,102,204,.18)', unexploited: 'rgba(184,92,0,.18)' },
    ink: { cs: '#1f6b30', revenue: '#004c99', unexploited: '#8a4500' },
  };
  const FONT = 12;   // base text size in px (axis titles and captions use 13)
  const LH = 14;     // line height for stacked 12px labels

  // ---------- small utilities ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isNum = v => typeof v === 'number' && isFinite(v);
  const obj = v => (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
  const str = (v, d) => (typeof v === 'string' && v.trim()) ? v.trim() : d;
  const r2 = n => Math.round(n * 100) / 100;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const same = (a, b) => Math.abs(a - b) < 0.05;

  // Number with thousands separators and at most 2 decimals.
  function fmt(n) {
    const parts = String(r2(n)).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  // Rough text width estimate in px (there is no DOM to measure with). Used only for layout decisions.
  function tw(s, size) {
    size = size || FONT;
    let w = 0;
    for (const ch of String(s)) {
      if ('₀₁₂₃₄₅₆₇₈₉'.includes(ch)) w += 0.45;
      else if ("ijl|!.,:;'′ ".includes(ch)) w += 0.3;
      else if ('ftrI-()[]'.includes(ch)) w += 0.38;
      else if ('mwMW'.includes(ch)) w += 0.85;
      else if (ch >= 'A' && ch <= 'Z') w += 0.68;
      else w += 0.57;
    }
    return w * size;
  }

  // Greedy word wrap to a pixel width; always returns at least one line.
  function wrap(s, maxW, size) {
    const words = String(s).split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = '';
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w;
      if (cur && tw(t, size) > maxW) { lines.push(cur); cur = w; } else cur = t;
    }
    lines.push(cur);
    return lines;
  }

  // Split an area label at " = " so "Revenue = $20 × 30 = $600" can stack as
  // ["Revenue", "= $20 × 30 = $600"]; greedy, the "=" starts the new line.
  function splitEq(s, maxW) {
    const parts = String(s).split(' = ');
    const lines = [];
    let cur = parts[0];
    for (let i = 1; i < parts.length; i++) {
      const piece = '= ' + parts[i];
      const t = cur + ' ' + piece;
      if (tw(t) > maxW) { lines.push(cur); cur = piece; } else cur = t;
    }
    lines.push(cur);
    return lines;
  }

  // Lines for `label` inside an area. availW(n) = max line width when the block has n lines
  // (0 when n lines do not fit vertically). Returns an array of lines, or null if nothing fits.
  function fitLabel(label, availW) {
    const fits = (lines, w) => lines.every(l => tw(l) <= w);
    for (let n = 1; n <= 3; n++) {
      const w = availW(n);
      if (w <= 20) continue;
      let lines = n === 1 ? [label] : splitEq(label, w);
      if (lines.length <= n && fits(lines, w)) return lines;
      lines = wrap(label, w);
      if (lines.length <= n && fits(lines, w)) return lines;
    }
    return null;
  }

  // Push two label positions apart to at least `gap` px, keeping their midpoint.
  function spread(pos, gap) {
    if (pos.length !== 2 || Math.abs(pos[0] - pos[1]) >= gap) return pos.slice();
    const mid = (pos[0] + pos[1]) / 2, s = pos[0] <= pos[1] ? 1 : -1;
    return [mid - s * gap / 2, mid + s * gap / 2];
  }

  // Candidate farthest from every value in `avoid` (first wins ties).
  function farthest(cands, avoid) {
    let best = cands[0], bestD = -1;
    for (const c of cands) {
      const d = avoid.length ? Math.min(...avoid.map(a => Math.abs(a - c))) : Infinity;
      if (d > bestD) { best = c; bestD = d; }
    }
    return best;
  }

  // ---------- SVG primitives (all values are numbers we computed; text goes through esc) ----------
  function attrs(o) {
    return Object.keys(o).filter(k => o[k] !== null && o[k] !== undefined && o[k] !== false)
      .map(k => ` ${k}="${o[k]}"`).join('');
  }

  function text(x, y, s, o) {
    o = o || {};
    const a = {
      x: r2(x), y: r2(y), 'text-anchor': o.anchor, 'font-size': o.size || FONT,
      'font-weight': o.weight, 'font-style': o.italic ? 'italic' : null,
      transform: o.rotate ? `rotate(${o.rotate} ${r2(x)} ${r2(y)})` : null,
    };
    let style = `fill:${o.fill || C.text}`;
    if (o.halo) style += ';stroke:#fff;stroke-opacity:.9;stroke-width:3px;stroke-linejoin:round;paint-order:stroke';
    return `<text${attrs(a)} style="${style}">${esc(s)}</text>`;
  }

  // Stacked lines; yLast is the baseline of the last line.
  function textLines(x, yLast, lines, o) {
    return lines.map((l, i) => text(x, yLast - (lines.length - 1 - i) * LH, l, o)).join('');
  }

  function seg(x1, y1, x2, y2, o) {
    o = o || {};
    const a = { x1: r2(x1), y1: r2(y1), x2: r2(x2), y2: r2(y2), 'stroke-width': o.width || 1,
      'stroke-dasharray': o.dash, 'stroke-linecap': o.cap };
    return `<line${attrs(a)} style="stroke:${o.stroke || C.axis}"/>`;
  }

  function poly(pts, fill) {
    const d = pts.map(p => `${r2(p[0])},${r2(p[1])}`).join(' ');
    return `<polygon points="${d}" style="fill:${fill};stroke:none"/>`;
  }

  function rect(x, y, w, h, style) {
    return `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(Math.max(0, w))}" height="${r2(Math.max(0, h))}" style="${style}"/>`;
  }

  const dot = (x, y) => `<circle cx="${r2(x)}" cy="${r2(y)}" r="3.5" style="fill:${C.dot}"/>`;

  function arrow(x1, y1, x2, y2, color) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    if (L < 10) return '';
    const ux = dx / L, uy = dy / L, bx = x2 - ux * 7, by = y2 - uy * 7;   // base of the head
    return seg(x1, y1, bx, by, { stroke: color, width: 1.3 }) +
      poly([[x2, y2], [bx - uy * 3.2, by + ux * 3.2], [bx + uy * 3.2, by - ux * 3.2]], color);
  }

  // Swatch + text per entry, text wrapped to maxW. Returns { svg, bottom } (bottom = y of the last baseline).
  function legend(x, yFirst, entries, maxW) {
    let s = '', y = yFirst;
    for (const e of entries) {
      const lines = wrap(e.text, maxW);
      s += rect(x, y - 10, 12, 12, `fill:${e.fill};stroke:${e.ink};stroke-width:.5`);
      lines.forEach((l, i) => { s += text(x + 18, y + i * LH, l, { fill: e.ink }); });
      y += (lines.length - 1) * LH + 16;
    }
    return { svg: s, bottom: y - 16 };
  }

  function svg(W, H, label, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}" font-size="${FONT}">${body}</svg>`;
  }

  // ---------- shared plot pieces ----------
  // Linear scales from data (q, p) to pixels; the plot rectangle is [x0,x1]×[y0,y1].
  function scale(x0, x1, y0, y1, xmax, ymax) {
    return {
      x0, x1, y0, y1, xmax, ymax,
      x: q => x0 + (q / xmax) * (x1 - x0),
      y: p => y1 - (p / ymax) * (y1 - y0),
      pxPerP: (y1 - y0) / ymax,
    };
  }

  function axes(sc) {
    return seg(sc.x0, sc.y0 - 6, sc.x0, sc.y1, { width: 1.2 }) + seg(sc.x0, sc.y1, sc.x1 + 6, sc.y1, { width: 1.2 });
  }

  function axisTitles(sc, xlabel, ylabel, xTitleY, yTitleX) {
    let s = '';
    if (str(xlabel, '')) s += text((sc.x0 + sc.x1) / 2, xTitleY, str(xlabel), { anchor: 'middle', size: 13, fill: C.axis });
    if (str(ylabel, '')) s += text(yTitleX, (sc.y0 + sc.y1) / 2, str(ylabel), { anchor: 'middle', size: 13, fill: C.axis, rotate: -90 });
    return s;
  }

  // Segment of the line P = a + b·Q inside [0,xmax]×[0,ymax]: [[qLo,pLo],[qHi,pHi]] or null.
  function clipLine(a, b, xmax, ymax) {
    let lo = 0, hi = xmax;
    if (b !== 0) {
      const q1 = -a / b, q2 = (ymax - a) / b;
      lo = Math.max(lo, Math.min(q1, q2));
      hi = Math.min(hi, Math.max(q1, q2));
    } else if (a < 0 || a > ymax) return null;
    if (hi - lo < 1e-6) return null;
    return [[lo, a + b * lo], [hi, a + b * hi]];
  }

  // Draw a straight curve ({a,b} line or {vq} vertical) clipped to the plot, labelled at its right-hand end.
  function curve(sc, cur, color, dashed, label) {
    const pts = cur.vq !== undefined ? [[cur.vq, 0], [cur.vq, sc.ymax]] : clipLine(cur.a, cur.b, sc.xmax, sc.ymax);
    if (!pts) return '';
    const [p1, p2] = pts;
    let s = seg(sc.x(p1[0]), sc.y(p1[1]), sc.x(p2[0]), sc.y(p2[1]),
      { stroke: color, width: 2, dash: dashed ? '7 4' : null, cap: 'round' });
    // Label beside the plot when the curve exits on the right; otherwise just inside the plot, at the end.
    const ex = sc.x(p2[0]), ey = sc.y(p2[1]);
    let ly = ey + 4;
    if (p2[0] < sc.xmax - 1e-6) ly = p2[1] <= 1e-6 ? ey - 5 : ey + 12;
    s += text(ex + 5, ly, label, { fill: color, weight: 600, halo: true });
    return s;
  }

  // ======================================================================
  // kind "sd" — supply & demand with shifts
  // Internal geometry on 0–100 axes: D₀: P = 80 − 0.8Q, S₀: P = 10 + 0.8Q, E₀ = (43.75, 45).
  // ======================================================================
  const SD = { dA: 80, dB: -0.8, sA: 10, sB: 0.8, small: 12, large: 24, vq: 50 };

  // Signed horizontal shift in Q units (right +, left −).
  function shiftUnits(c) {
    const dir = c.shift === 'left' ? -1 : c.shift === 'right' ? 1 : 0;
    return dir * (c.size === 'small' ? SD.small : SD.large);
  }

  // Intersection of a demand line with a supply line (or a vertical supply at Q = vq).
  function equilibrium(d, s) {
    const q = s.vq !== undefined ? s.vq : (s.a - d.a) / (d.b - s.b);
    return { q, p: d.a + d.b * q };
  }

  // Curves and equilibria implied by one panel spec.
  function sdModel(panel) {
    const dem = obj(panel.demand), sup = obj(panel.supply);
    const vertical = sup.vertical === true;
    const dSh = shiftUnits(dem), sSh = vertical ? 0 : shiftUnits(sup);
    const d0 = { a: SD.dA, b: SD.dB };
    const d1 = dSh ? { a: SD.dA - SD.dB * dSh, b: SD.dB } : null;   // P = 80 − 0.8(Q − shift)
    const s0 = vertical ? { vq: SD.vq } : { a: SD.sA, b: SD.sB };
    const s1 = sSh ? { a: SD.sA - SD.sB * sSh, b: SD.sB } : null;   // P = 10 + 0.8(Q − shift)
    const e0 = equilibrium(d0, s0), e1 = equilibrium(d1 || d0, s1 || s0);
    return { d0, d1, s0, s1, e0, e1, changed: !!(d1 || s1) };
  }

  // Axis labels for the before/after values: "P₀" and "P₁", or "P₀ = P₁" when unchanged.
  function pair(label, v0, v1) {
    if (v1 === null) return [{ v: v0, text: label + '₀' }];
    if (same(v0, v1)) return [{ v: v0, text: `${label}₀ = ${label}₁` }];
    return [{ v: v0, text: label + '₀' }, { v: v1, text: label + '₁' }];
  }

  // Price level for a horizontal "shift" arrow from curve c0 to its copy c1, scored to stay clear of
  // equilibrium dots, drop lines and the other curves.
  function arrowLevel(c0, c1, others, eqs, candidates, pref) {
    let best = null;
    for (const P of candidates) {
      const qa = (P - c0.a) / c0.b, qb = (P - c1.a) / c1.b;
      if (qa < 2 || qa > 98 || qb < 2 || qb > 98) continue;
      const lo = Math.min(qa, qb) - 2, hi = Math.max(qa, qb) + 2;
      let score = Math.abs(P - pref) / 20;
      for (const e of eqs) {
        if (Math.abs(P - e.p) < 6) score += 10;                 // on a dot / horizontal drop line
        if (P < e.p && e.q >= lo && e.q <= hi) score += 5;      // crosses a vertical drop line
      }
      for (const o of others) {
        const q = o.vq !== undefined ? o.vq : (P - o.a) / o.b;
        if (q >= lo && q <= hi) score += 3;                     // crosses another curve
      }
      if (!best || score < best.score) best = { P, qa, qb, score };
    }
    return best;
  }

  function sdPanel(panel, spec, ox, pw, lay) {
    const m = sdModel(panel);
    const pl = str(spec.plabel, 'P'), ql = str(spec.qlabel, 'Q');
    const pLabs = pair(pl, m.e0.p, m.changed ? m.e1.p : null);
    const qLabs = pair(ql, m.e0.q, m.changed ? m.e1.q : null);
    const padL = clamp(26 + Math.max(...pLabs.map(l => tw(l.text))) + 8, 46, 120);
    const sc = scale(ox + padL, ox + pw - 34, lay.y0, lay.y1, 100, 100);
    let s = '';

    lay.caps.forEach((l, i) => { s += text(ox + pw / 2, 17 + i * 16, l, { anchor: 'middle', size: 13, weight: 600 }); });
    s += axes(sc);

    // shift arrows first so the curves sit on top
    const eqs = [m.e0, m.e1];
    if (m.d1) {
      const a = arrowLevel(m.d0, m.d1, [m.s0].concat(m.s1 ? [m.s1] : []), eqs, [60, 56, 64, 52, 68, 48, 72, 44, 40, 36], 60);
      if (a) s += arrow(sc.x(a.qa), sc.y(a.P), sc.x(a.qb), sc.y(a.P), C.arrow);
    }
    if (m.s1) {
      const a = arrowLevel(m.s0, m.s1, [m.d0].concat(m.d1 ? [m.d1] : []), eqs, [66, 62, 70, 58, 74, 54, 50, 46, 42, 38, 34, 30], 66);
      if (a) s += arrow(sc.x(a.qa), sc.y(a.P), sc.x(a.qb), sc.y(a.P), C.arrow);
    }

    s += curve(sc, m.d0, C.demand, false, 'D');
    s += curve(sc, m.s0, C.supply, false, 'S');
    if (m.d1) s += curve(sc, m.d1, C.demand, true, 'D′');
    if (m.s1) s += curve(sc, m.s1, C.supply, true, 'S′');

    // equilibria: dashed drop lines, dots, axis labels
    const marks = m.changed ? [m.e0, m.e1] : [m.e0];
    for (const e of marks) {
      s += seg(sc.x0, sc.y(e.p), sc.x(e.q), sc.y(e.p), { stroke: C.drop, dash: '4 3' });
      s += seg(sc.x(e.q), sc.y(e.p), sc.x(e.q), sc.y1, { stroke: C.drop, dash: '4 3' });
    }
    for (const e of marks) s += dot(sc.x(e.q), sc.y(e.p));
    const py = spread(pLabs.map(l => sc.y(l.v)), 13);
    pLabs.forEach((l, i) => { s += text(sc.x0 - 6, py[i] + 4, l.text, { anchor: 'end' }); });
    const qx = spread(qLabs.map(l => sc.x(l.v)), Math.max(...qLabs.map(l => tw(l.text))) + 6);
    qLabs.forEach((l, i) => { s += text(qx[i], sc.y1 + 16, l.text, { anchor: 'middle' }); });

    s += axisTitles(sc, spec.xlabel, spec.ylabel, sc.y1 + 34, ox + 13);
    lay.res.forEach((l, i) => { s += text(ox + pw / 2, lay.resY + i * 16, l, { anchor: 'middle', size: 12.5, italic: true, fill: C.muted }); });
    return s;
  }

  function renderSD(spec) {
    const raw = Array.isArray(spec.panels) ? spec.panels : [];
    const panels = raw.filter(p => p && typeof p === 'object' && !Array.isArray(p));
    if (panels.length < 1 || panels.length > 2 || panels.length !== raw.length) return '';
    const W = panels.length === 2 ? 760 : 440, pw = W / panels.length;
    // Captions and results may wrap to a second line; both panels share one vertical layout.
    const caps = panels.map(p => str(p.caption, '') ? wrap(str(p.caption), pw - 16, 13) : []);
    const res = panels.map(p => str(p.result, '') ? wrap(str(p.result), pw - 16, 12.5) : []);
    const nCap = Math.max(1, ...caps.map(c => c.length)), nRes = Math.max(1, ...res.map(r => r.length));
    const y0 = 31 + 16 * (nCap - 1), y1 = y0 + 222, resY = y1 + 56;
    const H = resY + 16 * (nRes - 1) + 10;
    let body = '';
    panels.forEach((p, i) => { body += sdPanel(p, spec, i * pw, pw, { y0, y1, resY, caps: caps[i], res: res[i] }); });
    if (panels.length === 2) body += seg(pw, 8, pw, H - 8, { stroke: '#ddd' });
    const label = 'Supply and demand diagram. ' +
      panels.map(p => [str(p.caption, ''), str(p.result, '')].filter(Boolean).join('. ')).join(' | ');
    return svg(W, H, label, body);
  }

  // ======================================================================
  // kind "demand-areas" — P = intercept − slope·Q with a price line and shaded areas
  // ======================================================================
  function renderDemandAreas(spec) {
    const A = spec.intercept, b = spec.slope, P = spec.price;
    if (!isNum(A) || !isNum(b) || !isNum(P) || A <= 0 || b <= 0 || P < 0 || P > A) return '';
    const Qz = A / b;                                                   // quantity where P = 0
    const xmax = isNum(spec.xmax) && spec.xmax > 0 ? spec.xmax : Qz;
    const ymax = Math.max(isNum(spec.ymax) && spec.ymax > 0 ? spec.ymax : A, A);
    const Qs = (A - P) / b;                                             // quantity sold at the price
    if (Qs > xmax * (1 + 1e-9)) return '';
    const areas = obj(spec.areas), marks = obj(spec.marks);
    const cps = (Array.isArray(spec.compare_prices) ? spec.compare_prices : [])
      .filter(c => c && typeof c === 'object' && isNum(c.price) && c.price > 0 && c.price < A && (A - c.price) / b <= xmax);

    const pLabs = [{ v: A, text: fmt(A) }];
    if (str(marks.p, '')) pLabs.push({ v: P, text: str(marks.p) });
    const padL = clamp(26 + Math.max(...pLabs.map(l => tw(l.text))) + 8, 46, 120);
    const W = 440, y0 = 22, y1 = 244;
    const sc = scale(padL, W - 34, y0, y1, xmax, ymax);
    const X = sc.x, Y = sc.y;
    let s = '';
    const pending = [];   // area labels that did not fit → legend under the plot
    const aLabels = [];   // area labels, drawn after the compare-price outlines so their halo sits on top

    // shaded areas with their labels
    if (areas.cs && A > P) {
      s += poly([[X(0), Y(A)], [X(0), Y(P)], [X(Qs), Y(P)]], C.fill.cs);
      const lines = fitLabel(String(areas.cs), n => {
        const topP = P + (n * LH + 8) / sc.pxPerP;                      // price at the top of the text block
        return topP >= A ? 0 : X((A - topP) / b) - sc.x0 - 12;
      });
      if (lines) aLabels.push(textLines(sc.x0 + 6, Y(P) - 8, lines, { fill: C.ink.cs, weight: 600, halo: true }));
      else pending.push({ fill: C.fill.cs, ink: C.ink.cs, text: String(areas.cs) });
    }
    if (areas.revenue && P > 0 && Qs > 0) {
      s += rect(X(0), Y(P), X(Qs) - X(0), Y(0) - Y(P), `fill:${C.fill.revenue}`);
      const lines = fitLabel(String(areas.revenue), n => (n * LH + 8 <= Y(0) - Y(P)) ? X(Qs) - sc.x0 - 12 : 0);
      if (lines) {
        // centre the block, but keep it off any compare-price line running through the rectangle
        const inside = cps.map(c => c.price).filter(p => p < P);
        const pc = farthest([0.5, 0.3, 0.7, 0.4, 0.6].map(f => P * f), inside);
        aLabels.push(textLines(X(Qs / 2), Y(pc) + 4 + 7 * (lines.length - 1), lines,
          { anchor: 'middle', fill: C.ink.revenue, weight: 600, halo: true }));
      } else pending.push({ fill: C.fill.revenue, ink: C.ink.revenue, text: String(areas.revenue) });
    }
    const Qend = Math.min(xmax, Qz);
    if (areas.unexploited && Qend > Qs) {
      const pts = [[X(Qs), Y(P)], [X(Qs), Y(0)], [X(Qend), Y(0)]];
      if (xmax < Qz) pts.push([X(xmax), Y(A - b * xmax)]);
      s += poly(pts, C.fill.unexploited);
      const lines = fitLabel(String(areas.unexploited), n => {
        const topP = (n * LH + 8) / sc.pxPerP;
        return topP >= P ? 0 : X(Math.min(xmax, (A - topP) / b)) - X(Qs) - 12;
      });
      if (lines) aLabels.push(textLines(X(Qs) + 6, Y(0) - 8, lines, { fill: C.ink.unexploited, weight: 600, halo: true }));
      else pending.push({ fill: C.fill.unexploited, ink: C.ink.unexploited, text: String(areas.unexploited) });
    }

    // compare-price rectangles (thin dashed outlines); labels are collected and drawn last, on top
    const cpLabels = [];
    for (const c of cps) {
      const Qc = (A - c.price) / b, cx = X(Qc), cy = Y(c.price);
      s += rect(X(0), cy, cx - X(0), Y(0) - cy, 'fill:none;stroke:#555;stroke-width:1;stroke-dasharray:3 3');
      const label = str(c.label, '');
      if (!label) continue;
      // Just outside the top-right corner: the region right of the demand line is always empty.
      const room = W - 4 - (cx + 6);
      let lines = tw(label) <= room ? [label] : splitEq(label, room), x = cx + 6, anchor = 'start';
      if (!lines.every(l => tw(l) <= room)) {                           // no room → inside, left of the corner
        lines = splitEq(label, cx - sc.x0 - 8); x = cx - 6; anchor = 'end';
      }
      let yLast = cy + 1;
      const top = yLast - (lines.length - 1) * LH - 10;
      if (top < 2) yLast += 2 - top;
      cpLabels.push(textLines(x, yLast, lines, { anchor, fill: '#333', halo: true }));
    }

    s += axes(sc);
    s += curve(sc, { a: A, b: -b }, C.demand, false, 'D');
    s += seg(sc.x0, Y(P), X(Qs), Y(P), { stroke: C.dot, width: 1.4 });          // price line
    if (Qs > 0) s += seg(X(Qs), Y(P), X(Qs), Y(0), { stroke: C.drop, dash: '4 3' }) + dot(X(Qs), Y(P));

    // tick labels: intercept and price on the P axis, Q* and xmax on the Q axis
    const py = spread(pLabs.map(l => Y(l.v)), 13);
    pLabs.forEach((l, i) => { s += text(sc.x0 - 6, py[i] + 4, l.text, { anchor: 'end' }); });
    const qLabs = [{ v: xmax, text: fmt(xmax) }];
    if (str(marks.q, '')) qLabs.unshift({ v: Qs, text: str(marks.q) });
    const qx = spread(qLabs.map(l => X(l.v)), (tw(qLabs[0].text) + tw(qLabs[qLabs.length - 1].text)) / 2 + 8);
    qLabs.forEach((l, i) => { s += text(qx[i], Y(0) + 16, l.text, { anchor: 'middle' }); });

    s += axisTitles(sc, spec.xlabel, spec.ylabel, Y(0) + 34, 13);
    let H = 320;
    if (pending.length) {
      const lg = legend(sc.x0, Y(0) + 56, pending, W - sc.x0 - 24);
      s += lg.svg;
      H = Math.max(H, lg.bottom + 10);
    }
    s += aLabels.join('') + cpLabels.join('');

    const label = `Demand curve P = ${fmt(A)} − ${fmt(b)}Q with a price of ${fmt(P)} and quantity ${fmt(Qs)}. ` +
      ['cs', 'revenue', 'unexploited'].filter(k => areas[k]).map(k => String(areas[k])).join('. ');
    return svg(W, H, label, s);
  }

  // ======================================================================
  // kind "staircase" — discrete willingness to pay, one buyer per unit
  // ======================================================================
  function niceCeil(v) {
    if (!(v > 0)) return 1;
    const mag = Math.pow(10, Math.floor(Math.log10(v)));
    return Math.ceil(v / mag) * mag;
  }

  function renderStaircase(spec) {
    if (!Array.isArray(spec.wtp) || !spec.wtp.length || !spec.wtp.every(v => isNum(v) && v >= 0)) return '';
    const names = Array.isArray(spec.names) ? spec.names : [];
    const people = spec.wtp.map((w, i) => ({ w, name: names[i] != null ? String(names[i]) : String(i + 1) }))
      .sort((a, b) => b.w - a.w);                                       // highest WTP first
    const n = people.length;
    const price = isNum(spec.price) && spec.price >= 0 ? spec.price : null;
    const nB = price === null ? 0 : people.filter(p => p.w >= price).length;   // buyers
    const ymax = niceCeil(Math.max(...people.map(p => p.w), price || 0) * 1.15);
    const areas = obj(spec.areas);

    const pText = price === null ? '' : 'P = $' + fmt(price);
    const padL = clamp(26 + Math.max(20, tw(pText)) + 8, 46, 120);
    const W = 440, y0 = 22, y1 = 244;
    const sc = scale(padL, W - 34, y0, y1, n, ymax);
    const X = sc.x, Y = sc.y;
    let s = '';
    const pending = [];

    // one light bar per person, then revenue / CS shading on top
    people.forEach((p, i) => { s += rect(X(i), Y(p.w), X(i + 1) - X(i), Y(0) - Y(p.w), 'fill:rgba(0,102,204,.07)'); });
    if (price !== null && areas.revenue && nB > 0) s += rect(X(0), Y(price), X(nB) - X(0), Y(0) - Y(price), `fill:${C.fill.revenue}`);
    let lastCS = -1;   // index of the last buyer with positive surplus (for the label leader)
    if (price !== null && areas.cs) people.forEach((p, i) => {
      if (i < nB && p.w > price) { s += rect(X(i), Y(p.w), X(i + 1) - X(i), Y(price) - Y(p.w), `fill:${C.fill.cs}`); lastCS = i; }
    });
    for (let i = 1; i < n; i++) s += seg(X(i), Y(Math.min(people[i - 1].w, people[i].w)), X(i), Y(0), { stroke: 'rgba(0,0,0,.12)' });

    // the staircase itself
    let d = `M${r2(X(0))},${r2(Y(people[0].w))}`;
    people.forEach((p, i) => {
      d += ` L${r2(X(i + 1))},${r2(Y(p.w))} L${r2(X(i + 1))},${r2(Y(i + 1 < n ? people[i + 1].w : 0))}`;
    });
    s += `<path d="${d}" style="fill:none;stroke:${C.demand}" stroke-width="2" stroke-linejoin="round"/>`;

    if (price !== null) {
      s += seg(sc.x0, Y(price), sc.x1, Y(price), { stroke: C.dot, width: 1.4 });
      s += text(sc.x0 - 6, Y(price) + 4, pText, { anchor: 'end' });
    }

    // area labels: CS to the right of the buyers just above the price line; revenue centred in its rectangle
    if (price !== null && areas.cs) {
      const lines = fitLabel(String(areas.cs), k => {
        const top = Y(price) - 8 - (k - 1) * LH - 10;
        return (nB >= n || top < sc.y0) ? 0 : sc.x1 - (X(nB) + 8) - 2;
      });
      if (lines) {
        s += textLines(X(nB) + 8, Y(price) - 8, lines, { fill: C.ink.cs, weight: 600, halo: true });
        if (lastCS >= 0 && X(nB) - X(lastCS + 1) > 6)                  // leader to the nearest green block
          s += seg(X(nB) + 5, Y(price) - 12, X(lastCS + 1) + 1, Y((price + people[lastCS].w) / 2), { stroke: C.ink.cs, width: 0.8 });
      } else pending.push({ fill: C.fill.cs, ink: C.ink.cs, text: String(areas.cs) });
    }
    if (price !== null && areas.revenue) {
      const lines = nB > 0 ? fitLabel(String(areas.revenue), k => (k * LH + 8 <= Y(0) - Y(price)) ? X(nB) - sc.x0 - 12 : 0) : null;
      if (lines) s += textLines(X(nB / 2), Y(price / 2) + 4 + 7 * (lines.length - 1), lines,
        { anchor: 'middle', fill: C.ink.revenue, weight: 600, halo: true });
      else pending.push({ fill: C.fill.revenue, ink: C.ink.revenue, text: String(areas.revenue) });
    }

    // WTP above each step, name below it (drawn late so the halos sit over the leader line)
    people.forEach((p, i) => {
      s += text(X(i + 0.5), Y(p.w) - 5, '$' + fmt(p.w), { anchor: 'middle', fill: C.axis, halo: true });
      s += text(X(i + 0.5), Y(0) + 16, p.name, { anchor: 'middle' });
    });

    s += axes(sc);
    s += axisTitles(sc, spec.xlabel, spec.ylabel, Y(0) + 34, 13);
    let H = 320;
    if (pending.length) {
      const lg = legend(sc.x0, Y(0) + 56, pending, W - sc.x0 - 24);
      s += lg.svg;
      H = Math.max(H, lg.bottom + 10);
    }

    const label = `Discrete demand: ${n} buyers with willingness to pay ${people.map(p => fmt(p.w)).join(', ')}` +
      (price === null ? '.' : `; price ${fmt(price)}, ${nB} buy. `) +
      ['cs', 'revenue'].filter(k => areas[k]).map(k => String(areas[k])).join('. ');
    return svg(W, H, label, s);
  }

  // ---------- public API ----------
  const KINDS = { 'sd': renderSD, 'demand-areas': renderDemandAreas, 'staircase': renderStaircase };

  function render(spec) {
    try {
      if (!spec || typeof spec !== 'object' || typeof spec.kind !== 'string' || !Object.prototype.hasOwnProperty.call(KINDS, spec.kind)) return '';
      const out = KINDS[spec.kind](spec);
      return typeof out === 'string' ? out : '';
    } catch (e) {
      return '';
    }
  }

  window.Figures = { render };
})();
