'use strict';
/* ================= core: math, palette, pixel primitives ================= */
const W = 320, H = 240, TAU = Math.PI * 2;
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const ss = t => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const eOut = t => { t = clamp(t, 0, 1); return 1 - (1 - t) * (1 - t); };
const eIn = t => { t = clamp(t, 0, 1); return t * t; };
const sg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const fr = x => x - Math.floor(x);
const mod = (a, n) => ((a % n) + n) % n;
function hash(n) { n = (n | 0) ^ 0x9e3779b9; n = Math.imul(n ^ (n >>> 16), 0x85ebca6b); n = Math.imul(n ^ (n >>> 13), 0xc2b2ae35); n ^= n >>> 16; return (n >>> 0) / 4294967296; }
function rngf(seed) { let s = (seed >>> 0) || 1; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
/* step a time to a sprite frame rate (8-12fps "dot animation" look) */
const stepT = (t, fps) => Math.floor(t * fps) / fps;

function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d', { willReadFrequently: true }); x.imageSmoothingEnabled = false; return [c, x]; }

const C = {
  ol: '#1c1424', k: '#0c0810', white: '#fcfcf8',
  sky0: '#5088d8', sky1: '#78b0f0', sky2: '#a8d4f8', sky3: '#dcecf0', sky4: '#f8e8c0',
  cloud0: '#fcfcfc', cloud1: '#e4e4f4', cloud2: '#bcbce0', cloud3: '#9494c4',
  gold0: '#fff4b8', gold1: '#f8d860', gold2: '#d8a830', gold3: '#a07020',
  water0: '#b8e4f8', water1: '#78bce8', water2: '#4888c8', water3: '#2c5c9c', water4: '#1c3870',
  leaf0: '#98d478', leaf1: '#58a848', leaf2: '#2c7838', leaf3: '#1c4c2c',
  lotus0: '#fff4f8', lotus1: '#f8bcd4', lotus2: '#e87ca8', lotus3: '#b04878',
  marble0: '#fcf8f0', marble1: '#e4dccc', marble2: '#bcac94', marble3: '#8c7c68',
  skinG0: '#fce8b0', skinG1: '#f0c478', skinG2: '#c88c48', skinG3: '#8c5c30',
  robe0: '#f89c5c', robe1: '#e06038', robe2: '#a83c2c', robe3: '#702430',
  under0: '#fcf4e0', under1: '#e0d0b0', under2: '#b4a080',
  hairB0: '#5c74bc', hairB1: '#34488c', hairB2: '#202c5c',
  scarf0: '#b4e8d0', scarf1: '#68b098', scarf2: '#3c7c6c',
  skinK0: '#eab07c', skinK1: '#c47c50', skinK2: '#8c5034', skinK3: '#5c3020',
  hairK0: '#4c3828', hairK1: '#2c1e16',
  clothK0: '#a89474', clothK1: '#7c6850', clothK2: '#54443a', rope: '#c8a860',
  hell0: '#100408', hell1: '#2c0810', hell2: '#581018', hell3: '#901c20', hell4: '#c83020', hell5: '#f06830', hell6: '#f8b048', hell7: '#fce890',
  blood0: '#3c0810', blood1: '#6c1018', blood2: '#a01c20', blood3: '#d04030', blood4: '#f08868',
  rock0: '#6c4c50', rock1: '#462e36', rock2: '#28181e',
  oni0: '#f87858', oni1: '#c83c30', oni2: '#882028', tiger0: '#f8c838', tiger1: '#2c2018', iron0: '#9c9cb0', iron1: '#5c5c70', iron2: '#34343c',
  sin0: '#c4aca0', sin1: '#94786c', sin2: '#644c48',
  spi0: '#8078b8', spi1: '#4c4478', spi2: '#2c2444', cheek: '#f890a8',
  tree0: '#7cb060', tree1: '#4c8044', tree2: '#2c5434', bark0: '#8c6448', bark1: '#5c3c2c',
  grass0: '#9cc85c', grass1: '#5c9440', dirt0: '#c8a878', dirt1: '#a07c58', dirt2: '#785838',
  ui0: '#0c1640', ui1: '#1c2c6c', ui2: '#2c449c', uiB: '#f8f8f8', uiY: '#f8e070', uiD: '#060a20',
  tr: 'rgba(0,0,0,0)'
};

/* ---- primitives (no anti-aliasing: everything is spans of fillRect) ---- */
function R(c, x, y, w, h, col) { if (col) c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }
function P(c, x, y, col) { if (col) c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), 1, 1); }
function E(c, cx, cy, rx, ry, col) {
  if (col) c.fillStyle = col; if (rx <= 0 || ry <= 0) return;
  const y0 = Math.round(cy - ry), y1 = Math.round(cy + ry);
  for (let y = y0; y < y1; y++) {
    const dy = (y + 0.5 - cy) / ry; if (dy * dy > 1) continue;
    const hw = rx * Math.sqrt(1 - dy * dy);
    const a = Math.round(cx - hw), b = Math.round(cx + hw);
    if (b > a) c.fillRect(a, y, b - a, 1);
  }
}
function ER(c, cx, cy, rx, ry, col, a0 = 0, a1 = TAU) { // ellipse outline / arc
  if (col) c.fillStyle = col;
  const n = Math.max(8, Math.ceil((rx + ry) * 3.2 * (a1 - a0) / TAU));
  let lx = 1e9, ly = 1e9;
  for (let i = 0; i <= n; i++) {
    const a = a0 + (a1 - a0) * i / n, x = Math.round(cx + Math.cos(a) * rx), y = Math.round(cy + Math.sin(a) * ry);
    if (x !== lx || y !== ly) c.fillRect(x, y, 1, 1); lx = x; ly = y;
  }
}
function PF(c, pts, col) { // scanline polygon fill, pts=[x,y,x,y...]
  if (col) c.fillStyle = col;
  let mn = 1e9, mx = -1e9; const n = pts.length / 2;
  for (let i = 1; i < pts.length; i += 2) { mn = Math.min(mn, pts[i]); mx = Math.max(mx, pts[i]); }
  const xs = [];
  for (let y = Math.round(mn); y < Math.round(mx); y++) {
    const sy = y + 0.5; xs.length = 0;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, x0 = pts[i * 2], y0 = pts[i * 2 + 1], x1 = pts[j * 2], y1 = pts[j * 2 + 1];
      if ((y0 <= sy && y1 > sy) || (y1 <= sy && y0 > sy)) xs.push(x0 + (sy - y0) / (y1 - y0) * (x1 - x0));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) { const a = Math.round(xs[k]), b = Math.round(xs[k + 1]); if (b > a) c.fillRect(a, y, b - a, 1); }
  }
}
function L(c, x0, y0, x1, y1, col, w = 1) { // bresenham with square brush
  if (col) c.fillStyle = col;
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let e = dx + dy;
  const o = Math.floor((w - 1) / 2);
  for (let g = 0; g < 4000; g++) {
    c.fillRect(x0 - o, y0 - o, w, w);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * e; if (e2 >= dy) { e += dy; x0 += sx; } if (e2 <= dx) { e += dx; y0 += sy; }
  }
}
function PL(c, pts, col, w = 1) { for (let i = 0; i + 3 < pts.length; i += 2) L(c, pts[i], pts[i + 1], pts[i + 2], pts[i + 3], col, w); }

/* ---- ordered dither patterns ---- */
const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const BAYER8 = (() => {
  const r = [[0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26], [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22], [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25], [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]];
  return r.flat().map(v => (v + 0.5) / 64); })();
const _pc = new Map();
let _pctx = null;
function DP(c1, c2, lv) { // pattern with lv/16 of c2
  lv = clamp(Math.round(lv), 0, 16); if (lv === 0) return c1; if (lv === 16) return c2;
  const k = c1 + '|' + c2 + '|' + lv; let p = _pc.get(k); if (p) return p;
  const [cv, x] = mk(4, 4);
  for (let i = 0; i < 16; i++) { const col = BAYER4[i] < lv ? c2 : c1; if (col !== C.tr) { x.fillStyle = col; x.fillRect(i & 3, i >> 2, 1, 1); } }
  if (!_pctx) _pctx = mk(1, 1)[1];
  p = _pctx.createPattern(cv, 'repeat'); _pc.set(k, p); return p;
}
/* translucent fill: color at alpha a (0..1) via dither */
const DA = (col, a) => DP(C.tr, col, a * 16);
function VG(c, x, y, w, h, cols) { // vertical dithered gradient
  const n = cols.length - 1;
  for (let r = 0; r < h; r++) {
    const t = h > 1 ? r / (h - 1) * n : 0, i = Math.min(n - 1, Math.floor(t)), f = t - i;
    c.fillStyle = n === 0 ? cols[0] : DP(cols[i], cols[i + 1], f * 16); c.fillRect(x, y + r, w, 1);
  }
}
function hex(col) { const v = parseInt(col.slice(1), 16); return [(v >> 16) & 255, (v >> 8) & 255, v & 255]; }

/* ---- sprites with automatic dark outline ---- */
const _slots = new Map();
function slot(id, w, h) { let s = _slots.get(id); if (!s || s[0].width !== w || s[0].height !== h) { s = mk(w, h); _slots.set(id, s); } s[1].setTransform(1, 0, 0, 1, 0, 0); s[1].clearRect(0, 0, w, h); return s; }
function outline(x, w, h, col) {
  const id = x.getImageData(0, 0, w, h), d = id.data, [r, g, b] = hex(col);
  for (let i = 3; i < d.length; i += 4) d[i] = d[i] >= 110 ? 255 : 0;
  const m = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let xx = 0; xx < w; xx++) {
    const i = y * w + xx; if (d[i * 4 + 3]) continue;
    if ((xx > 0 && d[(i - 1) * 4 + 3]) || (xx < w - 1 && d[(i + 1) * 4 + 3]) || (y > 0 && d[(i - w) * 4 + 3]) || (y < h - 1 && d[(i + w) * 4 + 3])) m[i] = 1;
  }
  for (let i = 0; i < w * h; i++) if (m[i]) { d[i * 4] = r; d[i * 4 + 1] = g; d[i * 4 + 2] = b; d[i * 4 + 3] = 255; }
  x.putImageData(id, 0, 0);
}
/* draw fn(ctx) into a (w+2)x(h+2) sprite (origin at 1,1), outline it, then post(ctx) unoutlined */
function SPR(id, w, h, fn, post, ol = C.ol) {
  const [cv, x] = id ? slot(id, w + 2, h + 2) : mk(w + 2, h + 2);
  x.translate(1, 1); fn(x); x.setTransform(1, 0, 0, 1, 0, 0);
  if (ol) outline(x, w + 2, h + 2, ol);
  if (post) { x.translate(1, 1); post(x); x.setTransform(1, 0, 0, 1, 0, 0); }
  return cv;
}
const _sc = new Map();
function cached(key, f) { let v = _sc.get(key); if (!v) { v = f(); _sc.set(key, v); } return v; }

/* blit sprite with anchor; optional nearest-neighbor scale / rotation */
function blit(c, spr, x, y, ax, ay, opt) {
  if (!opt) { c.drawImage(spr, Math.round(x - ax - 1), Math.round(y - ay - 1)); return; }
  c.save(); c.translate(Math.round(x), Math.round(y));
  if (opt.rot) c.rotate(opt.rot);
  const sx = opt.sx || opt.s || 1, sy = opt.sy || opt.s || 1;
  if (opt.flip) c.scale(-1, 1);
  c.scale(sx, sy);
  if (opt.alpha != null) c.globalAlpha = opt.alpha;
  c.drawImage(spr, -ax - 1, -ay - 1); c.restore();
}
/* dissolve a sprite with ordered dither (keep fraction a of pixels) */
function ditherFade(spr, a, id) {
  const w = spr.width, h = spr.height, [cv, x] = slot(id || 'df' + w + 'x' + h, w, h);
  x.drawImage(spr, 0, 0); if (a >= 1) return cv;
  const im = x.getImageData(0, 0, w, h), d = im.data;
  for (let y = 0; y < h; y++) for (let xx = 0; xx < w; xx++) if (BAYER8[(y & 7) * 8 + (xx & 7)] >= a) d[(y * w + xx) * 4 + 3] = 0;
  x.putImageData(im, 0, 0); return cv;
}
/* tint sprite to flat colour (for reflections / silhouettes) */
function tintSpr(spr, col, id) {
  const [cv, x] = slot(id, spr.width, spr.height); x.drawImage(spr, 0, 0);
  x.globalCompositeOperation = 'source-atop'; x.fillStyle = col; x.fillRect(0, 0, spr.width, spr.height); x.globalCompositeOperation = 'source-over'; return cv;
}

/* ---- crisp pixel text (DotGothic16, alpha thresholded) ---- */
const FONT = '"DotGothic16", "MS Gothic", "Osaka-Mono", monospace';
const _tc = new Map();
function textSpr(str, size, col) {
  const k = str + '|' + size + '|' + col; let s = _tc.get(k); if (s) return s;
  if (_tc.size > 400) _tc.clear();
  const [mc, mx] = mk(2, 2); mx.font = size + 'px ' + FONT;
  const w = Math.max(1, Math.ceil(mx.measureText(str).width) + 2), h = size + 4;
  const [cv, x] = mk(w, h); x.font = size + 'px ' + FONT; x.textBaseline = 'top'; x.fillStyle = col; x.fillText(str, 0, 1);
  const im = x.getImageData(0, 0, w, h), d = im.data, [r, g, b] = hex(col);
  for (let i = 0; i < d.length; i += 4) { const on = d[i + 3] >= 120; d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = on ? 255 : 0; }
  x.putImageData(im, 0, 0); _tc.set(k, cv); return cv;
}
function TX(c, str, x, y, col, size = 16, sh = C.uiD) {
  if (!str) return 0;
  if (sh) c.drawImage(textSpr(str, size, sh), Math.round(x) + 1, Math.round(y) + 1);
  const s = textSpr(str, size, col); c.drawImage(s, Math.round(x), Math.round(y)); return s.width - 2;
}
