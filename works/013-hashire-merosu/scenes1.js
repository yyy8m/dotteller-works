/* ================= 文庫 #013 走れメロス: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { x = Math.max(x, 40); const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function robe(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f, pose: o.pose, arm: o.arm, expr: o.expr, blink: o.blink, k: o.k }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1, rot: o.rot }); if (st.dbeard && !o.rot && (o.s || 1) === 1) { const top = o.pose === 'sit' ? 18 : o.pose === 'kneel' ? 16 : 0, hy = y - 46 + top + (o.pose === 'bow' ? 10 : 0); PF(c, [x - 4, hy + 2, x + 4, hy + 2, x + 3, hy + 7, x, hy + 8, x - 3, hy + 7], st.dbeard); R(c, x - 1, hy + 4, 3, 1, '#8c4c3c'); } }
// a running figure: legs cycle, a forward lean, dust kicked up behind (dir: -1 runs left, 1 runs right)
function runner(c, st, x, y, t, o = {}) {
  const dir = o.dir || 1, sp = o.sp || 12, f = Math.floor(t * sp) % 4, bob = (f & 1) ? -1 : 0;
  if (o.dust !== false) for (let i = 0; i < 4; i++) { const u = fr(t * 2.2 + i / 4); c.save(); c.globalAlpha = 0.5 * (1 - u); E(c, x - dir * (8 + u * 26), y - 2 - u * 8, 2 + u * 5, 1 + u * 3, o.dustCol || '#c8b088'); c.restore(); }
  robe(c, st, x, y + bob, { f, k: o.k || 'run', flip: dir < 0, rot: dir * (o.lean == null ? 0.16 : o.lean), expr: o.expr, arm: o.arm, s: o.s });
}
// a laurel-less Greek king's gold crown, drawn over a robeFig head (feet at x,y; scale s)
function crown(c, x, y, s = 1) { const hy = y - 55 * s; R(c, x - 6 * s, hy, 12 * s, 3 * s, '#e8c848'); for (let i = 0; i < 3; i++) PF(c, [x - 6 * s + i * 4.5 * s, hy, x - 4 * s + i * 4.5 * s, hy - 4 * s, x - 2 * s + i * 4.5 * s, hy], '#e8c848'); P(c, x, hy + 1 * s, '#c83c3c'); }
// a short club in the hand of a bandit
function club(c, x, y, a) { L(c, x, y, x + Math.cos(a) * 14, y + Math.sin(a) * 14, '#6c4c2c', 3); E(c, x + Math.cos(a) * 14, y + Math.sin(a) * 14, 3, 3, '#5c3c1c'); }
function sun(c, x, y, r, col = '#f8a040') { glow(c, x, y, r * 4, r * 3, col, 0.35); E(c, x, y, r, r, col); E(c, x - r * 0.3, y - r * 0.3, r * 0.5, r * 0.5, '#f8d890'); }

/* ---- cast (robeFig; a chiton is drawn as a light robe with a belt) ---- */
const MEROS = { id: 'me', spk: 'merosu', robe: '#e8e0c8', robe2: '#c8bca0', trim: '#8c6c3c', sash: '#6c4c2c', skin: '#d8a878', skin2: '#b08058', hair: '#4c2c1c' };
const MEROS_BARE = { id: 'mb', spk: 'merosu', robe: '#d8a878', robe2: '#b08058', trim: '#e8e0c8', sash: '#e8e0c8', skin: '#d8a878', skin2: '#b08058', hair: '#3c2418' };
const MEROS_RAG = { id: 'mr', spk: 'merosu', robe: '#b8a890', robe2: '#8c7c64', trim: '#d8a878', sash: '#5c3c24', skin: '#d8a878', skin2: '#b08058', hair: '#3c2418' };
const KING = { id: 'kg', spk: 'ou', robe: '#5c1c4c', robe2: '#3c0c34', trim: '#e8c848', sash: '#e8c848', skin: '#ecd4bc', skin2: '#c8a890', hair: '#1c1c24' };
const SERINU = { id: 'se', spk: 'serinu', dbeard: '#3c2c20', robe: '#8c9cac', robe2: '#6c7c8c', trim: '#c8c0b0', sash: '#3c4c5c', skin: '#dcb08c', skin2: '#b48c6c', hair: '#2c241c' };
const SISTER = { id: 'si', robe: '#e8c8d8', robe2: '#c8a8b8', trim: '#f8f0e8', sash: '#c86c8c', skin: '#e8c0a0', skin2: '#c89c7c', hair: '#5c3c24', female: true };
const BRIDE = { id: 'br', robe: '#f8f4ec', robe2: '#e0d8cc', trim: '#e8c848', sash: '#e8c848', skin: '#e8c0a0', skin2: '#c89c7c', hair: '#5c3c24', female: true };
const GROOM = { id: 'gr', robe: '#c8b07c', robe2: '#a8905c', trim: '#f0e8d0', sash: '#5c4c2c', skin: '#d0a07c', skin2: '#a87c5c', hair: '#2c1c14' };
const OLDMAN = { id: 'om', spk: 'roujin', robe: '#7c6c5c', robe2: '#5c4c3c', trim: '#a89c8c', sash: '#3c3028', old: true };
const GUARD = { id: 'gd', robe: '#8c2c2c', robe2: '#6c1c1c', trim: '#c8c8d0', sash: '#3c3c44', hat: 'cap', hatCol: '#a8a8b8' };
const BANDIT = { id: 'bd', spk: 'sanzoku', robe: '#4c3c2c', robe2: '#3c2c1c', trim: '#6c5c44', sash: '#1c1410', skin: '#c08c64', skin2: '#9c6c48', hair: '#141010', hat: 'cap', hatCol: '#2c241c' };
const FIRO = { id: 'fi', spk: 'firo', robe: '#a89070', robe2: '#8c7454', trim: '#e0d0b0', sash: '#c83c3c', skin: '#e0b48c', skin2: '#b88c68', hair: '#141418' };
const GIRL = { id: 'gi', robe: '#f0e8d8', robe2: '#d8cfc0', trim: '#c83c3c', sash: '#c83c3c', skin: '#f0c8a8', skin2: '#d0a484', hair: '#6c4424', female: true, kid: true };
const CROWD = ['#a87c5c', '#5c7c9c', '#8c5c7c', '#7c8c5c', '#c8a86c', '#6c6c7c', '#9c5c4c', '#5c8c7c'].map((col, i) => ({ id: 'cw' + i, robe: col, robe2: shadeCol(col, 0.85), trim: '#e8e0d0', sash: '#2c2c34', hair: ['#2c1c14', '#5c3c24', '#141418'][i % 3], female: i % 3 === 1, old: i === 5 }));

/* ---- places ---- */
// the open plain at a given sun height (sunY: 30 high .. 100 on the horizon), a road running across
function plains(c, t, o = {}) {
  const sy = o.sunY == null ? 70 : o.sunY, red = Math.min(1, Math.max(0, (sy - 40) / 60));
  VG(c, 0, 0, W, 104, red > 0.5 ? ['#2c1c3c', '#a83c3c', '#f88c40'] : ['#3c6cb8', '#78a8d8', '#f0d8a0']);
  sun(c, o.sunX || 250, sy, 11, red > 0.5 ? '#f86c2c' : '#f8d060');
  for (let i = 0; i < 6; i++) { const x = ((i * 70 - t * (o.drift || 4)) % 420 + 420) % 420 - 50; PF(c, [x, 104, x + 40, 84 + (i % 3) * 4, x + 90, 104], red > 0.5 ? '#3c2c3c' : '#5c7c5c'); }
  R(c, 0, 100, W, 90, red > 0.5 ? '#6c4c2c' : '#8cac5c'); VG(c, 0, 100, W, 30, red > 0.5 ? ['#7c5434', '#5c3c24'] : ['#9cbc6c', '#7c9c4c']);
  PF(c, [0, 150, W, 140, W, 168, 0, 176], red > 0.5 ? '#a87c4c' : '#c8b07c');
  for (let i = 0; i < 18; i++) { const x = ((i * 23 - t * (o.speed || 0)) % 340 + 340) % 340 - 10, y = 112 + (i * 13) % 28; L(c, x, y, x + 2, y - 4, red > 0.5 ? '#4c341c' : '#6c8c3c'); }
  R(c, 0, 176, W, 14, red > 0.5 ? '#3c2814' : '#6c8c3c');
}
// the city of Syracuse: white walls, columns, towers (o.night: empty dark streets, a few lamps)
function city(c, t, o = {}) {
  const n = !!o.night;
  VG(c, 0, 0, W, 110, n ? ['#06060e', '#141428', '#1c1c34'] : ['#5c8cc8', '#a8c8e8', '#e8d8b0']);
  if (n) for (let i = 0; i < 30; i++) P(c, (i * 47) % W, (i * 29) % 60, (i + Math.floor(t * 2)) % 7 ? '#c8c8e0' : '#5c5c7c');
  for (let i = 0; i < 7; i++) { const x = i * 50 - 10, h = 40 + (i * 17) % 30; R(c, x, 110 - h, 44, h, n ? '#2c2c3c' : '#e8e0d0'); R(c, x, 110 - h, 44, 4, n ? '#3c3c4c' : '#f8f4ec'); for (let k = 0; k < 2; k++) R(c, x + 8 + k * 18, 110 - h + 14, 8, 12, n ? ((i + k) % 3 === 0 ? '#c8a050' : '#14141c') : '#5c4c3c'); }
  R(c, 120, 30, 26, 80, n ? '#24243a' : '#f0e8d8'); PF(c, [116, 30, 133, 16, 150, 30], n ? '#3c2c3c' : '#c86c4c');
  R(c, 0, 110, W, 80, n ? '#1c1c28' : '#c8b898'); for (let x = 0; x < W; x += 20) for (let y = 112; y < 190; y += 10) R(c, x + ((y / 10) & 1) * 10, y, 18, 8, n ? '#24243a' : '#d8ccb0');
  if (n) for (let i = 0; i < 6; i++) { const u = fr(t * 0.3 + i / 6); c.save(); c.globalAlpha = 0.25; R(c, ((u * 400) | 0) - 40, 120 + i * 9, 30, 1, '#8c8cac'); c.restore(); }
}
// the throne hall: columns, red curtains, torches, a raised throne
function hall(c, t, o = {}) {
  R(c, 0, 0, W, H, '#2c1c24'); VG(c, 0, 0, W, 130, ['#1c1018', '#3c2430', '#4c2c34']);
  for (let i = 0; i < 6; i++) { const x = 10 + i * 60; R(c, x, 20, 16, 110, '#c8bca8'); R(c, x - 3, 18, 22, 6, '#e8dcc8'); R(c, x - 3, 126, 22, 6, '#a89c88'); for (let k = 0; k < 3; k++) R(c, x + 3 + k * 4, 26, 1, 98, '#a89c88'); }
  for (const x of [40, 280]) { PF(c, [x - 30, 0, x + 30, 0, x + 18, 110, x - 18, 110], '#7c1c24'); L(c, x - 8, 0, x - 4, 108, '#5c1018'); }
  for (const x of [100, 220]) { R(c, x - 2, 60, 4, 30, '#3c2c1c'); const fl = Math.sin(t * 12 + x) * 2; E(c, x, 54 + fl * 0.3, 5, 8 + fl, '#f8a040'); E(c, x, 56, 3, 5, '#f8e8a0'); glow(c, x, 56, 40, 34, '#f8a040', 0.25); }
  R(c, 0, 130, W, 60, '#5c4c44'); for (let x = 0; x < W; x += 32) R(c, x, 130, 1, 60, '#4c3c34'); R(c, 0, 130, W, 2, '#7c6c5c');
  if (o.throne !== false) { const x = o.tx || 160; R(c, x - 40, 122, 80, 10, '#8c7c6c'); R(c, x - 18, 80, 36, 44, '#7c1c24'); R(c, x - 22, 74, 44, 8, '#e8c848'); R(c, x - 22, 108, 8, 16, '#e8c848'); R(c, x + 14, 108, 8, 16, '#e8c848'); }
}
// the shepherd's village: green hills, white farmhouse, a flock of sheep (o.rain, o.night)
function village(c, t, o = {}) {
  VG(c, 0, 0, W, 100, o.rain ? ['#2c3038', '#4c5058', '#5c6068'] : o.dawn ? ['#3c3c5c', '#8c7c8c', '#e8b8a0'] : ['#5c9cd8', '#9cc8e8', '#e8f0d8']);
  if (!o.rain && !o.dawn) for (let i = 0; i < 3; i++) { const x = ((i * 130 + t * 5) % 420) - 60; E(c, x, 26 + i * 8, 22, 6, '#f8f8f0'); }
  PF(c, [0, 100, 70, 70, 150, 92, 230, 66, 320, 90, 320, 110, 0, 110], o.rain ? '#3c4c38' : '#6c9c4c');
  R(c, 0, 104, W, 86, o.rain ? '#4c5c3c' : '#8cbc5c'); for (let i = 0; i < 30; i++) P(c, (i * 37) % W, 110 + (i * 19) % 70, o.rain ? '#3c4c30' : '#6c9c3c');
  R(c, 220, 66, 70, 44, '#e8e0d0'); PF(c, [212, 68, 255, 46, 298, 68], '#a8583c'); R(c, 246, 86, 14, 24, '#5c3c24'); R(c, 228, 78, 10, 10, o.night ? '#f8c860' : '#3c4c5c');
  if (o.sheep !== false) for (let i = 0; i < 6; i++) sheep(c, 40 + i * 26 + Math.sin(t * 0.6 + i) * 4, 132 + (i % 2) * 10, t + i);
  if (o.rain) rain(c, t, 0.9);
}
function sheep(c, x, y, t) { const b = Math.round(Math.sin(t * 3) * 0.6); E(c, x, y - 6 + b, 9, 6, '#f4f0e8'); for (let i = 0; i < 4; i++) E(c, x - 6 + i * 4, y - 10 + b, 3, 3, '#ffffff'); E(c, x + 9, y - 8 + b, 3, 3, '#3c3430'); R(c, x - 6, y - 1, 2, 4, '#3c3430'); R(c, x + 4, y - 1, 2, 4, '#3c3430'); }
function rain(c, t, a = 1) { c.save(); c.globalAlpha = 0.5 * a; for (let i = 0; i < 70; i++) { const x = (hash(i) * 360 + t * 60) % 340 - 10, y = (hash(i + 99) * 200 + t * 260) % 200 - 10; L(c, x, y, x - 3, y + 8, '#a8b8d0'); } c.restore(); }
// inside the farmhouse at the wedding feast (rain outside the window)
function feast(c, t) {
  R(c, 0, 0, W, H, '#5c3c24'); VG(c, 0, 0, W, 130, ['#3c2414', '#6c4428', '#7c5030']); for (let x = 0; x < W; x += 40) R(c, x, 0, 3, 130, '#4c2c18');
  R(c, 230, 30, 50, 40, '#2c3038'); rainBox(c, t, 230, 30, 50, 40); R(c, 226, 26, 58, 4, '#3c2414'); R(c, 226, 70, 58, 4, '#3c2414'); R(c, 226, 26, 4, 48, '#3c2414'); R(c, 280, 26, 4, 48, '#3c2414'); R(c, 253, 30, 3, 40, '#3c2414'); PF(c, [222, 24, 236, 24, 230, 76, 222, 76], '#a8483c'); PF(c, [288, 24, 274, 24, 280, 76, 288, 76], '#a8483c');
  for (let i = 0; i < 5; i++) { const x = 30 + i * 50; L(c, x, 0, x + 25, 14, '#e8c848'); E(c, x + 25, 14, 3, 3, ['#c83c3c', '#e8e0d0', '#5c8cc8'][i % 3]); }
  R(c, 0, 130, W, 60, '#4c2c18'); R(c, 60, 118, 200, 10, '#8c5c34'); R(c, 66, 128, 6, 16, '#6c4428'); R(c, 248, 128, 6, 16, '#6c4428');
  for (let i = 0; i < 6; i++) { E(c, 80 + i * 32, 116, 8, 3, '#e8e0d0'); E(c, 80 + i * 32, 114, 4, 2, ['#c8483c', '#e8b848', '#8cac5c'][i % 3]); }
  glow(c, 160, 90, 140, 70, '#f8c870', 0.18);
}
function rainBox(c, t, x0, y0, w, h) { for (let i = 0; i < 14; i++) { const x = x0 + (hash(i) * w + t * 20) % w, y = y0 + (hash(i + 5) * h + t * 120) % h; L(c, x, y, x - 1, Math.min(y0 + h - 1, y + 5), '#8ca0c0'); } }
// the flooded river: a smashed bridge, brown water roaring
function flood(c, t, o = {}) {
  VG(c, 0, 0, W, 90, ['#3c4048', '#6c7078', '#8c9098']);
  PF(c, [0, 90, 60, 60, 140, 84, 220, 56, 320, 82, 320, 100, 0, 100], '#4c5c44');
  R(c, 0, 96, W, 94, '#5c5440'); VG(c, 0, 96, W, 94, ['#7c7058', '#5c5038', '#3c3424']);
  for (let i = 0; i < 26; i++) { const y = 100 + i * 3.4; c.save(); c.globalAlpha = 0.35; for (let x = -20; x < W + 20; x += 6) P(c, x + ((t * (90 + (i % 5) * 25)) % 6), y + Math.sin(x * 0.08 + t * 5 + i) * 2, '#a89c78'); c.restore(); }
  for (let i = 0; i < 46; i++) { const x = ((i * 29 + t * (70 + (i % 4) * 25)) % 360) - 20, y = 100 + (i * 13) % 86, w = 8 + (i % 3) * 7, yy = y + Math.sin(t * 4 + i) * 3; ER(c, x, yy, w, 3, '#f4f0e0', Math.PI, TAU); ER(c, x + 2, yy + 1, w - 3, 2, '#c8bc98', Math.PI, TAU); if (i % 4 === 0) for (let k = 0; k < 3; k++) P(c, x - 4 + k * 4, yy - 4 - fr(t * 3 + i) * 4, '#ffffff'); }
  if (o.bridge !== false) { R(c, 0, 88, 70, 6, '#6c4c2c'); R(c, 60, 92, 6, 40, '#5c3c1c'); R(c, 250, 88, 70, 6, '#6c4c2c'); R(c, 254, 92, 6, 40, '#5c3c1c'); for (let i = 0; i < 4; i++) { const x = ((120 + i * 30 + t * 50) % 360) - 20; R(c, x, 120 + i * 12 + Math.sin(t * 3 + i) * 3, 22, 4, '#6c4c2c'); } }
  rain(c, t, 0.35);
}
// the mountain pass: rocks, pines, the road climbing and falling
function pass(c, t, o = {}) {
  VG(c, 0, 0, W, 110, o.hot ? ['#c86c2c', '#f8b860', '#f8e8a0'] : ['#5c8cc8', '#a8c8e8', '#f0e0c0']);
  if (o.hot) { sun(c, 160, 26, 14, '#f8f0c0'); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + t * 0.3; L(c, 160 + Math.cos(a) * 22, 26 + Math.sin(a) * 22, 160 + Math.cos(a) * 36, 26 + Math.sin(a) * 36, '#f8f0c0'); } }
  PF(c, [0, 110, 50, 50, 110, 90, 170, 40, 240, 86, 300, 54, 320, 70, 320, 120, 0, 120], o.hot ? '#8c5c3c' : '#6c6c74');
  for (let i = 0; i < 5; i++) { const x = 20 + i * 70; PF(c, [x, 110, x + 8, 84, x + 16, 110], '#2c4c34'); R(c, x + 7, 110, 2, 6, '#3c2c1c'); }
  R(c, 0, 112, W, 78, o.hot ? '#a87c4c' : '#8c7c64'); PF(c, [0, 160, 140, 132, 320, 150, 320, 176, 0, 182], o.hot ? '#c8a070' : '#a8987c');
  for (let i = 0; i < 6; i++) E(c, 30 + i * 56, 124 + (i % 2) * 40, 10, 6, '#6c5c4c');
  if (o.hot) for (let i = 0; i < 8; i++) { c.save(); c.globalAlpha = 0.2; const y = 120 + i * 8; L(c, 0, y + Math.sin(t * 3 + i) * 2, W, y + Math.sin(t * 3 + i + 1) * 2, '#f8e8c0'); c.restore(); }
}
// the spring at sunset: a cleft in the rock, clear water, leaves burning red-gold
function springPlace(c, t, o = {}) {
  VG(c, 0, 0, W, 120, ['#5c2c3c', '#c85c3c', '#f8a050']);
  for (let i = 0; i < 4; i++) { const x = 20 + i * 90; R(c, x + 10, 40, 6, 80, '#3c2418'); for (let k = 0; k < 14; k++) { const a = hash(i * 20 + k); E(c, x + 13 + Math.cos(a * 9) * 22, 40 + Math.sin(a * 7) * 16, 9, 6, k % 3 ? '#e86c2c' : '#f8c040'); } }
  R(c, 0, 120, W, 70, '#5c4c2c'); PF(c, [150, 120, 190, 60, 250, 64, 290, 120], '#6c5c54'); PF(c, [168, 120, 194, 72, 240, 76, 270, 120], '#7c6c64'); L(c, 214, 78, 212, 120, '#3c2c28', 2); R(c, 210, 108, 5, 24, '#8cc8e8'); R(c, 211, 108, 2, 24, '#c8e8f8');
  for (let i = 0; i < 6; i++) { const u = fr(t * 1.5 + i / 6); P(c, 213 + Math.sin(i) * 2, 82 + u * 38, '#c8e8f8'); }
  E(c, 214, 132, 40, 8, '#5c8cac'); E(c, 214, 131, 34, 6, '#8cc8e8'); for (let i = 0; i < 3; i++) { const u = fr(t * 0.8 + i / 3); c.save(); c.globalAlpha = 1 - u; ER(c, 214, 131, 6 + u * 28, 1 + u * 5, '#e8f8ff'); c.restore(); }
  if (o.glint) for (let i = 0; i < 6; i++) { const u = fr(t * 0.7 + i / 6); P(c, 190 + i * 9, 128 + Math.sin(i * 3) * 3, u < 0.5 ? '#ffffff' : '#c8e8f8'); }
}
// the execution ground: a tall post with a crossbar, the crowd, the town walls, the sun on the horizon
function plaza(c, t, o = {}) {
  const sy = o.sunY == null ? 96 : o.sunY;
  VG(c, 0, 0, W, 110, sy > 100 ? ['#14142c', '#3c2c4c', '#8c4c4c'] : ['#2c1c3c', '#a83c3c', '#f88c40']);
  if (sy < 112) { sun(c, 60, sy, 12, '#f86c2c'); }
  for (let i = 0; i < 6; i++) { const x = 100 + i * 40, h = 30 + (i * 13) % 24; R(c, x, 104 - h, 36, h, '#5c3c3c'); R(c, x + 10, 104 - h + 10, 8, 10, '#2c1c1c'); }
  R(c, 0, 104, W, 86, '#7c5c44'); for (let x = 0; x < W; x += 22) for (let y = 106; y < 190; y += 12) R(c, x + ((y / 12) & 1) * 11, y, 20, 10, '#6c4c38');
  if (o.post !== false) { const px = o.px || 220; R(c, px - 30, 120, 60, 10, '#5c3c24'); R(c, px - 3, 34, 6, 88, '#5c3c24'); R(c, px - 16, 44, 32, 5, '#5c3c24'); }
}
function crowdRow(c, t, y, n = 9, o = {}) { for (let i = 0; i < n; i++) { const x = (o.x0 || 10) + i * (o.gap || 34), j = o.jump ? Math.abs(Math.sin(t * 6 + i)) * 4 : Math.sin(t * 1.5 + i) * 0.6; robe(c, CROWD[i % 8], x, y - j, { k: 'cr' + i + (o.k || ''), arm: o.jump && i % 2 ? 'up' : null, flip: i % 2 === 0, expr: o.expr, s: o.s }); } if (o.shade) { c.save(); c.globalAlpha = o.shade; R(c, 0, y - 70, W, 72, '#1c1018'); c.restore(); } }
function dog(c, x, y, r) { c.save(); c.translate(Math.round(x), Math.round(y)); c.rotate(r); E(c, 0, 0, 9, 5, '#a8784c'); E(c, 9, -4, 4, 4, '#a8784c'); R(c, 11, -9, 2, 4, '#7c5434'); R(c, -4, 4, 2, 5, '#7c5434'); R(c, 4, 4, 2, 5, '#7c5434'); L(c, -9, -1, -13, -5, '#a8784c', 2); P(c, 10, -5, '#141010'); c.restore(); }
function speedLines(c, t, dir = 1, col = '#f8e8d0') { c.save(); c.globalAlpha = 0.45; for (let i = 0; i < 16; i++) { const y = 40 + (i * 37) % 130, x = ((hash(i) * 400 - dir * t * 420) % 400 + 400) % 400 - 40; L(c, x, y, x + 40 + (i % 3) * 20, y, col); } c.restore(); }

/* ---- portraits (48x48) ---- */
function merosFace(o = {}) { // a young shepherd: curly brown hair, sunburnt, strong brows; o.rag: blood at the lip, sweat; o.cry; o.angry
  return SPR('meF' + (o.blink || 0) + (o.rag ? 'r' : '') + (o.cry ? 'c' : '') + (o.angry ? 'a' : '') + (o.smile ? 's' : ''), 48, 48, c => {
    const sk = '#d8a878', sk2 = '#b08058', hr = '#4c2c1c';
    PF(c, [4, 48, 8, 38, 40, 38, 44, 48], o.rag ? '#b8a890' : '#e8e0c8'); L(c, 14, 40, 22, 48, '#8c6c3c', 2); R(c, 20, 32, 8, 7, sk2);
    E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    for (let i = 0; i < 9; i++) E(c, 12 + i * 3, 9 + (i % 2) * 2, 3.2, 3.2, hr); E(c, 12, 15, 3, 4, hr); E(c, 36, 15, 3, 4, hr); E(c, 11.5, 22, 2, 3, sk2); E(c, 36.5, 22, 2, 3, sk2);
    if (o.angry) { L(c, 15, 15, 21, 18, '#2c1c14', 2); L(c, 27, 18, 33, 15, '#2c1c14', 2); } else if (o.cry) { L(c, 15, 17, 21, 15, '#2c1c14', 2); L(c, 27, 15, 33, 17, '#2c1c14', 2); } else { L(c, 15, 16, 21, 16, '#2c1c14', 2); L(c, 27, 16, 33, 16, '#2c1c14', 2); }
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f8f0e0'); R(c, x0 + 1, 19, 3, 3, '#3c2414'); P(c, x0 + 1, 19, '#f8f8f0'); }
    if (o.cry) { R(c, 17, 23, 1, 6, '#88c8f8'); R(c, 31, 23, 1, 6, '#88c8f8'); }
    L(c, 24, 21, 23, 26, sk2); R(c, 21, 27, 6, 1, sk2);
    if (o.smile) { L(c, 19, 30, 22, 31, '#7c3c2c'); L(c, 22, 31, 26, 31, '#7c3c2c'); L(c, 26, 31, 29, 30, '#7c3c2c'); } else if (o.angry) { R(c, 20, 30, 8, 2, '#5c2418'); R(c, 21, 30, 6, 1, '#f0e8d8'); } else R(c, 20, 31, 8, 1, '#7c3c2c');
    if (o.rag) { L(c, 27, 32, 28, 35, '#a82c2c'); P(c, 28, 36, '#a82c2c'); P(c, 14, 14, '#c8e8f8'); P(c, 34, 25, '#c8e8f8'); L(c, 16, 26, 19, 27, '#a8785c'); }
  });
}
function ouFace(o = {}) { // King Dionys: pale, deep furrow between the brows, cold narrow eyes, a gold crown; o.soft: eyes eased, cheeks flushed; o.smirk
  return SPR('kgF' + (o.blink || 0) + (o.soft ? 's' : '') + (o.smirk ? 'm' : ''), 48, 48, c => {
    const sk = '#e0d8d0', sk2 = '#b8aca4';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#5c1c4c'); PF(c, [16, 37, 24, 46, 32, 37], '#e8c848'); R(c, 19, 31, 10, 7, sk2);
    E(c, 24, 22, 11, 14, sk2); E(c, 23.5, 21.5, 10.5, 13.5, sk); PF(c, [12, 14, 13, 6, 35, 6, 36, 14, 33, 10, 15, 10], '#1c1c24'); L(c, 12, 14, 12, 26, '#1c1c24', 2); L(c, 36, 14, 36, 26, '#1c1c24', 2);
    R(c, 12, 5, 24, 4, '#e8c848'); for (let i = 0; i < 4; i++) PF(c, [12 + i * 7, 5, 15 + i * 7, -1, 18 + i * 7, 5], '#e8c848'); P(c, 24, 6, '#c83c3c'); P(c, 16, 6, '#3c8cc8'); P(c, 32, 6, '#3c8cc8');
    if (o.soft) { L(c, 16, 16, 21, 15, '#1c1c24'); L(c, 27, 15, 32, 16, '#1c1c24'); } else { L(c, 15, 15, 21, 17, '#1c1c24', 2); L(c, 27, 17, 33, 15, '#1c1c24', 2); L(c, 23, 13, 23, 17, sk2); L(c, 25, 13, 25, 17, sk2); }
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#1c1c24'); continue; } if (o.soft) { R(c, x0, 19, 5, 3, '#f0ece4'); R(c, x0 + 2, 19, 2, 3, '#2c2c3c'); } else { R(c, x0, 20, 5, 2, '#f0ece4'); R(c, x0 + 2, 20, 2, 2, '#1c1c24'); } L(c, x0, 23, x0 + 5, 23, sk2); }
    L(c, 24, 21, 23, 27, sk2); R(c, 21, 27, 6, 1, sk2); L(c, 16, 26, 17, 31, sk2); L(c, 32, 26, 31, 31, sk2);
    if (o.soft) { E(c, 16, 27, 3, 1.5, '#e89c9c'); E(c, 32, 27, 3, 1.5, '#e89c9c'); R(c, 21, 31, 6, 1, '#7c4c4c'); }
    else if (o.smirk) { L(c, 19, 31, 25, 31, '#5c3c3c'); L(c, 25, 31, 29, 29, '#5c3c3c'); } else R(c, 20, 31, 8, 1, '#5c3c3c');
  });
}
function serinuFace(o = {}) { // Selinuntius the stonemason: calm, close-cropped dark hair and a short beard, steady eyes; o.smile; o.sad
  return SPR('seF' + (o.blink || 0) + (o.smile ? 's' : '') + (o.sad ? 'd' : ''), 48, 48, c => {
    const sk = '#dcb08c', sk2 = '#b48c6c', hr = '#2c241c';
    PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#8c9cac'); L(c, 12, 40, 20, 48, '#c8c0b0', 2); R(c, 20, 32, 8, 7, sk2);
    E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk); PF(c, [13, 16, 14, 8, 24, 5, 34, 8, 35, 16, 32, 11, 16, 11], hr); E(c, 11.5, 22, 2, 3, sk2); E(c, 36.5, 22, 2, 3, sk2);
    PF(c, [15, 26, 17, 33, 24, 37, 31, 33, 33, 26, 30, 30, 18, 30], '#3c2c20');
    if (o.sad) { L(c, 15, 17, 21, 16, hr, 2); L(c, 27, 16, 33, 17, hr, 2); } else { L(c, 15, 16, 21, 16, hr, 2); L(c, 27, 16, 33, 16, hr, 2); }
    for (const x0 of [16, 27]) { if (o.blink === 2 || o.smile) { L(c, x0, 20, x0 + 2, 19, '#2c1c14'); L(c, x0 + 2, 19, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f4ece0'); R(c, x0 + 1, 19, 3, 3, '#2c241c'); P(c, x0 + 1, 19, '#f8f8f0'); }
    L(c, 24, 21, 23, 26, sk2); if (o.smile) { L(c, 20, 30, 23, 31, '#f0e0d0'); L(c, 23, 31, 28, 30, '#f0e0d0'); } else R(c, 21, 31, 6, 1, '#8c6c5c');
    if (o.sad) { R(c, 18, 23, 1, 4, '#88c8f8'); }
  });
}
function roujinFace(o = {}) { // the frightened old man of the city: white hair, beard, darting eyes
  return SPR('omF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0c0a0', sk2 = '#b89878'; PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#7c6c5c'); R(c, 20, 32, 8, 6, sk2);
    E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk); PF(c, [12, 18, 13, 10, 20, 7, 28, 7, 35, 10, 36, 18, 33, 13, 15, 13], '#e8e8e0');
    L(c, 15, 16, 21, 17, '#e8e8e0', 2); L(c, 27, 17, 33, 16, '#e8e8e0', 2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f0e8dc'); R(c, x0 + (x0 < 24 ? 3 : 3), 19, 2, 3, '#2c1c14'); }
    L(c, 15, 24, 18, 25, sk2); L(c, 33, 24, 30, 25, sk2); L(c, 24, 21, 23, 26, sk2);
    PF(c, [16, 28, 32, 28, 30, 40, 24, 44, 18, 40], '#e8e8e0'); R(c, 21, 30, 6, 2, '#5c3c3c');
  });
}
function banditFace(o = {}) { // the mountain bandit: a dark cap, scar, wolfish grin
  return SPR('bdF' + (o.blink || 0), 48, 48, c => {
    const sk = '#c08c64', sk2 = '#9c6c48'; PF(c, [2, 48, 8, 38, 40, 38, 46, 48], '#4c3c2c'); R(c, 20, 32, 8, 7, sk2);
    E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk); R(c, 11, 6, 26, 9, '#2c241c'); R(c, 10, 13, 28, 3, '#1c1410');
    L(c, 15, 17, 21, 19, '#141010', 2); L(c, 27, 19, 33, 17, '#141010', 2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 5, 21, '#141010'); continue; } R(c, x0, 20, 5, 2, '#e8dcc8'); R(c, x0 + 2, 20, 2, 2, '#141010'); }
    L(c, 30, 16, 34, 26, '#8c4c3c'); L(c, 24, 22, 23, 27, sk2); PF(c, [14, 26, 34, 26, 32, 36, 16, 36], '#2c241c'); R(c, 19, 30, 10, 2, '#5c1c1c'); for (let i = 0; i < 4; i++) P(c, 20 + i * 2, 30, '#e8dcc8');
  });
}
function firoFace(o = {}) { // Philostratus, the young apprentice: boyish, wide wet eyes, dust on the cheek
  return SPR('fiF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0b48c', sk2 = '#b88c68', hr = '#141418'; PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#a89070'); R(c, 20, 32, 8, 7, sk2);
    E(c, 24, 23, 10, 12, sk2); E(c, 23.5, 22.5, 9.5, 11.5, sk); PF(c, [13, 20, 13, 10, 24, 6, 35, 10, 35, 20, 31, 13, 24, 14, 17, 13], hr);
    R(c, 13, 11, 22, 2, '#c83c3c'); L(c, 16, 17, 21, 16, hr); L(c, 27, 16, 32, 17, hr);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 5, 21, '#2c1c14'); continue; } R(c, x0, 19, 5, 4, '#f8f0e0'); R(c, x0 + 1, 19, 3, 4, '#3c2414'); P(c, x0 + 1, 19, '#ffffff'); P(c, x0 + 3, 22, '#c8e8f8'); }
    R(c, 18, 24, 1, 4, '#88c8f8'); E(c, 32, 27, 2, 1, '#a88c6c'); L(c, 24, 22, 23, 26, sk2); E(c, 24, 31, 2, 1.5, '#5c2c24');
  });
}
const PORTRAITS = {
  merosu: p => withMouth('pmme', merosFace({ blink: p.blink }), p, 24, 31),
  ou: p => withMouth('pmkg', ouFace({ blink: p.blink }), p, 24, 31),
  serinu: p => withMouth('pmse', serinuFace({ blink: p.blink }), p, 24, 31),
  roujin: p => withMouth('pmom', roujinFace({ blink: p.blink }), p, 24, 31),
  sanzoku: p => withMouth('pmbd', banditFace({ blink: p.blink }), p, 24, 31),
  firo: p => withMouth('pmfi', firoFace({ blink: p.blink }), p, 24, 31),
};
