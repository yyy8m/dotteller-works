/* ================= 文庫 #007 山月記: helpers, cast, places, the tiger & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
// Tang-dynasty people are drawn with robeFig (26x58, anchor 13,57)
function fig(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f == null ? -1 : o.f, pose: o.pose || 'stand', arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, 13, 57, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- cast ---- */
const RICHO = { id: 'ri', spk: 'richo', robe: '#3c4c6c', robe2: '#2c3c5c', trim: '#c8b880', sash: '#c8b880', skin: '#e8c4a0', hair: '#1c1814', hat: 'cap', hatCol: '#141418' };
const RICHO_T = { ...RICHO, id: 'rit', skin: '#d8b090', robe: '#4c4c58', robe2: '#3c3c48' }; // gaunt years
const ENSAN = { id: 'en', spk: 'ensan', robe: '#7c2c2c', robe2: '#6c1c1c', trim: '#e8c860', sash: '#e8c860', skin: '#ecc8a4', hair: '#2c2018', hat: 'cap', hatCol: '#141418', beard: true };
const MEN = ['#5c6c4c', '#6c5c3c', '#4c5c6c', '#5c4c5c'].map((col, i) => ({ id: 'mn' + i, robe: col, robe2: shadeCol(col, 0.8), trim: '#d8ccb0', sash: '#d8ccb0', skin: ['#e8c0a0', '#dcac88', '#f0c8a8', '#e0b898'][i], hair: '#1c1814', hat: i % 2 ? 'bun' : 'cap', hatCol: '#1c1c24' }));
const PEERS = ['#7c2c5c', '#2c5c7c', '#7c6c2c'].map((col, i) => ({ id: 'pr' + i, robe: col, robe2: shadeCol(col, 0.8), trim: '#e8c860', sash: '#e8c860', skin: '#ecc8a4', hair: '#1c1814', hat: 'cap', hatCol: '#141418', beard: i === 1 }));
const WIFE = { id: 'wf', robe: '#a86c7c', robe2: '#8c5c6c', trim: '#f0e0c8', sash: '#f0e0c8', skin: '#f0c8a8', hair: '#1c1410', female: true, hat: 'bun' };
const CHILD = { id: 'ch', robe: '#6c8cac', robe2: '#5c7c9c', trim: '#f0e0c8', sash: '#f0e0c8', skin: '#f4d0b0', hair: '#1c1410', hat: 'bun' };

/* ---- places ---- */
function skyMt(c, t, o = {}) { // o.dawn 0..1 (night → pale dawn)
  const k = o.dawn || 0;
  VG(c, 0, 0, W, 130, k < 0.5 ? ['#05060f', '#0e1430', '#1e2a4c'] : ['#2c3458', '#7c7c9c', '#d8b8a8']);
  if (k < 0.7) for (let i = 0; i < 40; i++) P(c, hash(i) * W, hash(i * 3) * 90, (Math.floor(t * 2) + i) % 7 ? '#c8d0e8' : '#5c6080');
  // far mountains, layered
  const cols = k < 0.5 ? ['#141c34', '#10162a', '#0c1020'] : ['#5c5c7c', '#4c4c6c', '#3c3c5c'];
  for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) { const x = mod(i * 64 + j * 29, 400) - 40, h = 34 + (i * 17 % 26) + j * 6; PF(c, [x - 46, 112 + j * 10, x, 112 + j * 10 - h, x + 46, 112 + j * 10], cols[j]); }
  if (o.moon !== false) { const mx = o.mx || 214, my = o.my || 54, pale = k >= 0.5; glow(c, mx, my, 26, 26, pale ? '#f4f4f0' : '#f8f0c8', pale ? 0.12 : 0.3); E(c, mx, my, 11, 11, pale ? '#e8e8e4' : '#f8f0d0'); E(c, mx - 3, my - 2, 3, 2.5, pale ? '#d8d8d4' : '#e8dcb0'); }
}
function mist(c, t, y0 = 96, a = 0.16, col = '#c8d0e0') { c.save(); for (let i = 0; i < 6; i++) { const x = mod(i * 97 + t * (10 + i * 3), W + 200) - 100, y = y0 + (i % 3) * 14 + Math.sin(t * 0.5 + i) * 4; c.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 0.7 + i * 2)); E(c, x, y, 70 + (i % 2) * 30, 8 + (i % 3) * 3, col); } c.restore(); }
function lampPulse(c, t, x, y, r = 120, col = '#f8c060') { const k = 0.5 + 0.5 * Math.sin(t * 1.3) * Math.sin(t * 0.7 + 1); glow(c, x, y, r * (0.8 + 0.25 * k), r * 0.6 * (0.8 + 0.25 * k), col, 0.16 + 0.14 * k); for (let i = 0; i < 14; i++) { const u = fr(t * 0.08 + i / 14); P(c, x - r * 0.6 + hash(i) * r * 1.2, y + 30 - u * 90, DA('#f8e8c0', 0.8 * Math.sin(u * Math.PI))); } }
function pine(c, x, y, h = 60, dark = false, t = 0) { R(c, x - 2, y - h * 0.4, 4, h * 0.4, dark ? '#1c140c' : '#3c2c1c'); for (let k = 0; k < 4; k++) { const w = 22 - k * 4, yy = y - h * 0.3 - k * h * 0.17, sw = Math.sin(t * 1.2 + x) * (k * 0.4); PF(c, [x - w + sw, yy, x + sw, yy - h * 0.24, x + w + sw, yy], dark ? '#0c1c14' : (k & 1 ? '#2c4c2c' : '#3c5c34')); } }
// the grassy clearing in the woods, with the thicket (叢) on the left
function clearing(c, t, o = {}) {
  skyMt(c, t, o);
  for (let i = 0; i < 6; i++) pine(c, 20 + i * 56 + (i & 1) * 10, 124, 54 + (i % 3) * 10, (o.dawn || 0) < 0.5, t);
  const g = (o.dawn || 0) < 0.5 ? ['#1c2c1c', '#24382a', '#2c442c'] : ['#3c5c34', '#4c6c3c', '#5c7c44'];
  R(c, 0, 122, W, 118, g[0]); for (let i = 0; i < 50; i++) P(c, hash(i) * W, 124 + hash(i * 5) * 110, g[2]);
  // the road
  PF(c, [120, 122, 200, 122, 300, 240, 40, 240], (o.dawn || 0) < 0.5 ? '#3c3428' : '#8c7c5c');
  if (o.bush !== false) thicket(c, o.bx || 60, o.by || 150, t, o.shake || 0, o);
  mist(c, t, 100, (o.dawn || 0) < 0.5 ? 0.14 : 0.2, (o.dawn || 0) < 0.5 ? '#8c9cc0' : '#f0eef0');
}
function thicket(c, x, y, t, shake = 0, o = {}) {
  const dk = (o.dawn || 0) < 0.5; const cols = dk ? ['#142414', '#1c301c', '#244024'] : ['#2c4c24', '#3c5c2c', '#4c6c34'];
  for (let i = 0; i < 26; i++) { const bx = x - 50 + (i * 37 % 100), h = 22 + (i * 13 % 18), sw = Math.sin(t * 1.4 + i) * 1.5 + (shake ? Math.sin(t * 30 + i) * shake : 0); L(c, bx, y + 6, bx + sw * 2, y - h, cols[i % 3], 3); }
  E(c, x, y + 2, 56, 16, cols[1]); E(c, x, y - 4, 48, 14, cols[2]);
  if (o.eyes) { const bl = (Math.floor(t * 0.7) % 5 === 0 && fr(t * 0.7) < 0.15); if (!bl) { R(c, x - 8, y - 8, 4, 2, '#f8e060'); R(c, x + 4, y - 8, 4, 2, '#f8e060'); glow(c, x - 2, y - 7, 14, 6, '#f8e060', 0.18); } }
  for (let i = 0; i < 26; i++) { const bx = x - 54 + (i * 29 % 108), h = 12 + (i * 7 % 12), sw = Math.sin(t * 1.6 + i * 2) * 1.5 + (shake ? Math.sin(t * 34 + i) * shake : 0); L(c, bx, y + 14, bx + sw * 2, y + 2 - h, cols[(i + 1) % 3], 2); }
}
function inkLamp(c, x, y, t) { R(c, x - 3, y - 10, 6, 10, '#8c6c3c'); const f = Math.sin(t * 9) * 0.5; E(c, x, y - 13 + f, 2, 3, '#f8d860'); glow(c, x, y - 12, 40, 30, '#f8c060', 0.22); }
function scroll(c, x, y, w, h, o = {}) { R(c, x, y, w, h, '#efe4c8'); R(c, x - 3, y - 2, w + 6, 3, '#7c5c34'); R(c, x - 3, y + h - 1, w + 6, 3, '#7c5c34'); const n = o.n == null ? 99 : o.n; for (let i = 0; i < Math.min(n, Math.floor((w - 8) / 7)); i++) for (let k = 0; k < Math.floor((h - 8) / 6); k++) if (hash(i * 13 + k) > 0.25) R(c, x + w - 8 - i * 7, y + 5 + k * 6, 3, 3, '#2c2420'); }
function inn(c, x, y, o = {}) { R(c, x, y - 50, 120, 50, '#5c4c3c'); PF(c, [x - 14, y - 50, x + 60, y - 74, x + 134, y - 50], '#2c2420'); PF(c, [x - 14, y - 50, x - 20, y - 46, x - 8, y - 48], '#2c2420'); PF(c, [x + 134, y - 50, x + 140, y - 46, x + 128, y - 48], '#2c2420'); for (const wx of [x + 12, x + 84]) { R(c, wx, y - 38, 22, 16, '#1c1410'); if (o.lit) { R(c, wx + 2, y - 36, 18, 12, '#f8c860'); glow(c, wx + 11, y - 30, 16, 10, '#f8c860', 0.3); } for (let k = 0; k < 3; k++) R(c, wx + 6 + k * 6, y - 38, 1, 16, '#3c2c1c'); } R(c, x + 50, y - 34, 20, 34, o.open ? '#0c0806' : '#3c2c1c'); }
function horse(c, x, y, t, o = {}) { const col = o.col || '#8c6c4c', dk = shadeCol(col, 0.75); E(c, x, y - 22, 20, 9, col); for (const [lx, ph] of [[-13, 0], [-7, 1], [8, 2], [14, 3]]) { const sw = o.walk ? Math.sin(t * 6 + ph * 1.6) * 3 : 0; L(c, x + lx, y - 16, x + lx + sw, y, dk, 3); } L(c, x + 17, y - 26, x + 26, y - 40, col, 7); E(c, x + 29, y - 41, 7, 4, col); R(c, x + 19, y - 44, 2, 5, dk); L(c, x - 19, y - 24, x - 26, y - 12, '#2c2018', 2); R(c, x - 8, y - 32, 16, 4, '#7c2c2c'); }

/* ---- the tiger (side view, faces right; 70x40, anchor at feet 35,39) ---- */
function tigerSpr(o = {}) {
  const pose = o.pose || 'stand', f = o.f || 0;
  return SPR('tg' + pose + f + (o.wet ? 'w' : ''), 70, 40, c => {
    const or = '#e8862c', or2 = '#c86c1c', wh = '#f8ecd8', bk = '#1c1410';
    const by = pose === 'leap' ? 14 : pose === 'crouch' ? 22 : 18, bl = pose === 'leap' ? 24 : 20;
    // tail
    const tw = pose === 'howl' ? -6 : Math.sin(f * 1.6) * 3; L(c, 35 - bl, by - 2, 35 - bl - 10, by - 10 + tw, or, 3); L(c, 35 - bl - 10, by - 10 + tw, 35 - bl - 14, by - 6 + tw, bk, 3);
    // legs
    const lg = (lx, ph, back) => { let dx = 0, dy = 0; if (pose === 'run') { dx = Math.sin(f * 1.6 + ph) * 5; } if (pose === 'leap') { dx = back ? -9 : 9; dy = -4; } L(c, lx, by + 4, lx + dx, 37 + dy, back ? or2 : or, 5); R(c, lx + dx - 2, 36 + dy, 6, 3, wh); };
    lg(35 - bl + 6, 0, true); lg(35 - bl + 12, 2, true); lg(35 + bl - 10, 1, false); lg(35 + bl - 4, 3, false);
    // body
    E(c, 35, by, bl, pose === 'crouch' ? 8 : 10, or); E(c, 35, by + 6, bl - 4, 4, wh);
    for (let i = 0; i < 7; i++) { const sx = 35 - bl + 8 + i * (bl * 2 - 16) / 6; L(c, sx, by - 9, sx + 2, by - 1, bk, 2); L(c, sx + 2, by - 1, sx, by + 3, bk, 1); }
    // head
    const hx = 35 + bl + 4, hy = pose === 'howl' ? by - 14 : by - 6;
    if (pose === 'howl') L(c, 35 + bl - 6, by - 4, hx - 2, hy + 4, or, 9);
    E(c, hx, hy, 10, 9, or); E(c, hx + 6, hy + 3, 6, 5, wh); E(c, hx - 4, hy - 8, 3, 3, or); E(c, hx + 3, hy - 9, 3, 3, or); P(c, hx - 4, hy - 8, bk); P(c, hx + 3, hy - 9, bk);
    for (let k = 0; k < 3; k++) L(c, hx - 6 + k * 3, hy - 6, hx - 5 + k * 3, hy - 2, bk, 1);
    R(c, hx + 1, hy - 3, 3, 2, '#f8e060'); P(c, hx + 2, hy - 3, bk); R(c, hx + 10, hy + 1, 2, 2, '#3c1c1c');
    if (pose === 'howl' || pose === 'leap') { PF(c, [hx + 4, hy + 5, hx + 12, hy + 4, hx + 10, hy + 10], '#5c1c1c'); P(c, hx + 6, hy + 5, wh); P(c, hx + 10, hy + 5, wh); }
    if (o.wet) for (let k = 0; k < 4; k++) P(c, 30 + k * 6, by - 4 + (k & 1), '#c8e0f8');
  });
}
function tiger(c, x, y, o = {}) { blit(c, tigerSpr(o), x, y, 35, 39, { flip: !!o.flip, s: o.s || 1 }); }
function rabbit(c, x, y, t) { const hop = Math.abs(Math.sin(t * 8)) * 6; E(c, x, y - 4 - hop, 6, 4, '#e8e4dc'); E(c, x + 5, y - 7 - hop, 3, 3, '#e8e4dc'); L(c, x + 5, y - 9 - hop, x + 3, y - 16 - hop, '#e8e4dc', 2); P(c, x + 6, y - 8 - hop, '#c81818'); }

/* ---- portraits (48x48) ---- */
function tigerFace(o = {}) {
  return SPR('tgF' + (o.blink || 0) + (o.sad ? 's' : '') + (o.roar ? 'r' : ''), 48, 48, c => {
    const or = '#e8862c', or2 = '#c86c1c', wh = '#f8ecd8', bk = '#1c1410';
    E(c, 10, 9, 6, 6, or); E(c, 38, 9, 6, 6, or); E(c, 10, 10, 3, 3, '#f0c8a8'); E(c, 38, 10, 3, 3, '#f0c8a8');
    E(c, 24, 26, 19, 18, or2); E(c, 24, 25, 18, 17, or);
    E(c, 11, 34, 8, 7, wh); E(c, 37, 34, 8, 7, wh); E(c, 24, 38, 9, 7, wh);
    for (const [x0, y0, x1, y1] of [[24, 9, 24, 17], [19, 10, 20, 16], [29, 10, 28, 16], [8, 22, 13, 24], [8, 27, 13, 28], [40, 22, 35, 24], [40, 27, 35, 28], [16, 14, 18, 19], [32, 14, 30, 19]]) L(c, x0, y0, x1, y1, bk, 2);
    for (const x0 of [15, 28]) { if (o.blink === 2) { L(c, x0, 22, x0 + 5, 22, bk); continue; } PF(c, [x0, 22, x0 + 3, 19, x0 + 6, 22, x0 + 3, 24], '#f8d850'); R(c, x0 + 2, 20, 2, 4, bk); }
    if (o.sad) { R(c, 16, 25, 1, 6, '#8cc8f8'); R(c, 32, 25, 1, 6, '#8cc8f8'); }
    PF(c, [21, 29, 27, 29, 24, 32], '#5c2c2c'); L(c, 24, 32, 24, 35, bk); L(c, 24, 35, 20, 37, bk); L(c, 24, 35, 28, 37, bk);
    if (o.roar) { E(c, 24, 39, 6, 4, '#5c1c1c'); R(c, 19, 36, 2, 3, wh); R(c, 27, 36, 2, 3, wh); }
    for (let k = 0; k < 3; k++) { L(c, 12, 32 + k * 2, 2, 30 + k * 3, '#f4f0e8'); L(c, 36, 32 + k * 2, 46, 30 + k * 3, '#f4f0e8'); }
  });
}
function ensanFace(o = {}) {
  return SPR('enF' + (o.blink || 0) + (o.sad ? 's' : ''), 48, 48, c => {
    const sk = '#ecc8a4', sk2 = '#b8906c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#7c2c2c'); PF(c, [16, 37, 24, 46, 32, 37], '#e8c860'); PF(c, [18, 37, 24, 44, 30, 37], '#7c2c2c');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    R(c, 13, 4, 22, 9, '#141418'); E(c, 24, 4, 8, 4, '#141418'); L(c, 12, 8, 4, 12, '#141418', 2); L(c, 36, 8, 44, 12, '#141418', 2); R(c, 13, 12, 22, 2, '#2c2018');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, o.sad ? 15 : 16, '#2c2018'); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c2018'); continue; } R(c, x0, 18, 5, 3, '#f4f0e8'); R(c, x0 + 1, 18, 3, 3, '#2c2018'); }
    if (o.sad) { R(c, 18, 22, 1, 5, '#8cc8f8'); R(c, 30, 22, 1, 5, '#8cc8f8'); }
    L(c, 24, 21, 23, 26, sk2); PF(c, [18, 29, 24, 27, 30, 29, 28, 30, 20, 30], '#2c2018'); PF(c, [21, 33, 24, 40, 27, 33], '#2c2018');
  });
}
// the young Li Zheng (human), for the memory scenes
function richoFace(o = {}) {
  return SPR('riF' + (o.blink || 0) + (o.gaunt ? 'g' : ''), 48, 48, c => {
    const sk = o.gaunt ? '#d8b090' : '#ecc8a4', sk2 = o.gaunt ? '#9c7c5c' : '#b8906c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#3c4c6c'); PF(c, [18, 37, 24, 44, 30, 37], '#c8b880');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, o.gaunt ? 9.5 : 11, 13, sk2); E(c, 23.5, 21.5, o.gaunt ? 9 : 10.5, 12.5, sk);
    R(c, 13, 4, 22, 9, '#141418'); E(c, 24, 4, 8, 4, '#141418'); R(c, 13, 12, 22, 2, '#1c1814');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 15, x0 + 4, 17, '#1c1814'); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c2018'); continue; } R(c, x0, 18, 5, 3, '#f4f0e8'); R(c, x0 + 1, 18, 3, 3, o.gaunt ? '#c8a020' : '#1c1814'); if (o.gaunt) P(c, x0 + 2, 19, '#f8f0a0'); }
    if (o.gaunt) { L(c, 16, 26, 18, 30, sk2); L(c, 32, 26, 30, 30, sk2); }
    L(c, 24, 21, 23, 26, sk2); R(c, 21, 31, 6, 1, '#8c4c3c');
  });
}
const PORTRAITS = {
  richo: p => withMouth('pmri', tigerFace({ blink: p.blink }), p, 24, 36, 8),
  ensan: p => withMouth('pmen', ensanFace({ blink: p.blink }), p, 24, 31),
};
