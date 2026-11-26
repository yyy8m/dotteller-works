/* ================= 記録 #024 八王子スーパー強盗殺人事件: helpers, places, props, cast ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', weapon: o.weapon || null }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1, rot: o.rot }); if (st.band && !o.rot) R(c, x + (o.flip ? 3 : -9), y - 37, 6, 4, '#f4f0e8'); }
function shadow(c, st, x, y, o = {}) { blit(c, tintSpr(modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, k: 'sh' + (o.k || '') }), o.col || '#06060a', 'shd' + st.id + (o.k || '') + (o.arm || '') + (o.f == null ? -1 : o.f)), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { x = Math.max(x, 40); const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
// a tray of small tea cups; o.n cups; o.drink: the cups lift
function courtroom(c, t, o = {}) {
  R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#56402c'); R(c, 0, 0, W, 6, '#2c1c10');
  R(c, 120, 10, 80, 50, '#3c2c1c'); E(c, 160, 34, 20, 20, '#c8a048'); E(c, 160, 34, 16, 16, '#5c4428'); R(c, 158, 20, 4, 28, '#c8a048');
  R(c, 90, 64, 140, 50, '#3c2414'); R(c, 90, 64, 140, 4, '#6c4c2c'); R(c, 86, 60, 148, 6, '#5c3c24');
  R(c, 0, 150, W, 90, '#3c2c20'); for (let y = 156; y < H; y += 8) R(c, 0, y, W, 1, '#342418');
  R(c, 0, 126, W, 26, '#4c3420'); for (let x = 6; x < W; x += 12) R(c, x, 126, 4, 26, '#3c2818'); R(c, 0, 124, W, 3, '#6c4c2c');
}
function cellBg(c, t, o = {}) {
  R(c, 0, 0, W, H, '#5c5c58'); for (let y = 0; y < H; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#545450');
  R(c, 0, 0, W, 28, '#7c7c74'); R(c, 0, 26, W, 3, '#4c4c48'); R(c, 0, 168, W, 72, '#3c3c3c');
  for (let i = 0; i < 9; i++) R(c, 210 + i * 12, 30, 3, 140, '#2c2c30'); R(c, 206, 30, 112, 4, '#2c2c30'); R(c, 206, 96, 112, 4, '#2c2c30');
  R(c, 150, 20, 26, 18, '#c8d8e8'); for (let i = 0; i < 3; i++) R(c, 156 + i * 7, 20, 2, 18, '#3c3c3c');
}
const POLICE = { id: 'po', top: 'uniform', coat: '#2c3444', pants: '#2c3444', shoes: '#141414', skin: '#d8ac88', hair: '#1c1814', hat: 'police', hatCol: '#1c2434' };
const DETS = ['#3c3c44', '#4c4438', '#2c3440', '#443c34'].map((col, i) => ({ id: 'dt' + i, top: 'jacket', coat: col, shirt: '#e8e4d8', tie: '#2c2c2c', pants: col, shoes: '#141414', skin: '#d0a07c', hair: '#1c1814', hairStyle: 'short', hat: i % 2 ? 'fedora' : null, hatCol: '#2c2c2c' }));

/* ---- places ---- */
// the two-storey supermarket of 1995 (o.night, o.lit office window, o.closed shutters); outer stairs to the office on the right
function superFront(c, t, o = {}) {
  const n = !!o.night; VG(c, 0, 0, W, 120, n ? ['#04040c', '#0c0c1c', '#141428'] : ['#e8a85c', '#f8c880', '#f8e0b0']);
  R(c, 30, 40, 220, 98, n ? '#3c3c44' : '#d8d0c0'); R(c, 30, 40, 220, 4, n ? '#2c2c34' : '#a8a090'); R(c, 30, 56, 220, 18, n ? '#2c3c5c' : '#3c6cac'); TX(c, 'スーパー', 156, 57, '#f8f8f0', 16, null);
  for (let i = 0; i < 4; i++) R(c, 44 + i * 50, 86, 40, 52, o.closed ? '#8c8c84' : n ? '#f8e8a0' : '#c8e0f0'); if (o.closed) for (let i = 0; i < 4; i++) for (let y = 88; y < 138; y += 4) R(c, 44 + i * 50, y, 40, 1, '#6c6c64');
  R(c, 252, 44, 40, 40, n ? '#3c3c44' : '#c8c0b0'); R(c, 262, 52, 20, 14, o.lit ? '#f8e8a0' : n ? '#1c1c24' : '#8cacc8'); if (o.lit) glow(c, 272, 59, 22, 16, '#f8e8a0', 0.35);
  for (let i = 0; i < 9; i++) R(c, 252 + i * 5, 84 + i * 6, 12, 2, n ? '#5c5c64' : '#8c8c84'); L(c, 252, 84, 300, 138, n ? '#4c4c54' : '#7c7c74');
  R(c, 0, 138, W, 52, n ? '#1c1c20' : '#6c6c64'); for (let x = 10; x < W; x += 40) R(c, x, 160, 24, 2, n ? '#3c3c3c' : '#e8e8e0');
}
// the store inside: shelves, the two registers (o.busy customers drawn by the scene)
function superInside(c, t, o = {}) {
  R(c, 0, 0, W, H, '#e8e4d8'); R(c, 0, 0, W, 14, '#c8c4b8'); for (let i = 0; i < 4; i++) R(c, 20 + i * 80, 4, 40, 4, '#f8f8f0');
  for (let i = 0; i < 3; i++) { const x = 10 + i * 100; R(c, x, 40, 80, 70, '#b8a88c'); for (let r = 0; r < 4; r++) { R(c, x, 50 + r * 16, 80, 2, '#8c7c64'); for (let k = 0; k < 8; k++) R(c, x + 3 + k * 10, 42 + r * 16, 7, 8, ['#c84c3c', '#e8c848', '#5c9c5c', '#5c7cc8', '#f0f0e8'][(k + r + i) % 5]); } }
  if (o.sale) { R(c, 100, 30, 120, 18, '#c81818'); TX(c, '涼風セール', 120, 31, '#f8f8f0', 16, null); }
  R(c, 0, 120, W, 70, '#c8c0b0'); for (let i = 0; i < 2; i++) { R(c, 200 + i * 60, 112, 40, 20, '#5c5c64'); R(c, 204 + i * 60, 104, 16, 10, '#2c2c34'); }
}
// the bon-odori in the park: a yagura with lanterns, drum, dancers (shadow figures) circling
function bonOdori(c, t, o = {}) {
  VG(c, 0, 0, W, 130, ['#04040c', '#0c0c1c', '#1c1428']); R(c, 0, 126, W, 64, '#2c2418');
  L(c, 0, 40, 160, 20, '#3c3c3c'); L(c, 160, 20, 320, 40, '#3c3c3c'); for (let i = 0; i < 14; i++) { const x = 10 + i * 22, y = 40 - Math.abs(160 - x) / 160 * -20 - 20 + Math.abs(x - 160) / 8; E(c, x, y + 6, 4, 5, '#f86c3c'); glow(c, x, y + 6, 10, 10, '#f8a060', 0.3); }
  R(c, 130, 70, 60, 8, '#8c3c2c'); R(c, 134, 78, 4, 50, '#6c4c30'); R(c, 182, 78, 4, 50, '#6c4c30'); R(c, 126, 62, 68, 8, '#5c3c24'); E(c, 160, 58, 8, 6, '#c8a060'); if (o.drum !== false && Math.floor(t * 3) % 2) { E(c, 160, 58, 12, 8, '#f8e0a0'); }
  if (o.dance !== false) for (let i = 0; i < 8; i++) { const a = t * 0.5 + i / 8 * TAU, x = 160 + Math.cos(a) * 110, y = 150 + Math.sin(a) * 10; shadow(c, DANCERS[i % 4], x, y, { k: 'bo' + i, col: '#140c18', f: Math.floor(t * 3 + i) & 3, arm: Math.floor(t * 2 + i) % 2 ? 'up' : null, s: 0.8 }); }
}
// the office upstairs: the safe at the back, a desk, the counter by the door (o.dim for after)
function office(c, t, o = {}) {
  R(c, 0, 0, W, H, '#c8c4b4'); R(c, 0, 0, W, 12, '#a8a494'); R(c, 0, 126, W, 64, '#8c8474');
  R(c, 220, 60, 50, 66, '#4c4c54'); R(c, 224, 64, 42, 58, '#5c5c64'); E(c, 245, 86, 8, 8, '#8c8c94'); E(c, 245, 86, 3, 3, '#2c2c34'); R(c, 258, 96, 4, 8, '#c8a048');
  R(c, 274, 70, 30, 56, '#e8e8e0'); R(c, 274, 96, 30, 2, '#a8a8a0');
  R(c, 120, 96, 70, 8, '#6c5c4c'); R(c, 124, 104, 4, 22, '#4c3c2c'); R(c, 182, 104, 4, 22, '#4c3c2c'); R(c, 140, 86, 16, 10, '#2c2c34'); R(c, 160, 90, 18, 6, '#f0ece0');
  R(c, 10, 90, 70, 36, '#8c7c64'); R(c, 10, 88, 70, 4, '#a89878'); R(c, 0, 30, 10, 96, '#6c5c48');
  R(c, 120, 26, 40, 30, '#e8e4d8'); R(c, 124, 30, 32, 20, '#c8d8e8'); E(c, 60, 32, 10, 10, '#f8f4e8'); L(c, 60, 32, 60, 25, '#141414'); L(c, 60, 32, 65, 32, '#141414');
  if (o.dim) dim(c, o.dim);
}
// a revolver (silhouette only), at x,y pointing right
function revolver(c, x, y, s = 1, col = '#2c2c34') { c.save(); c.translate(x, y); c.scale(s, s); R(c, 0, 0, 30, 6, col); R(c, 6, 6, 12, 8, col); PF(c, [2, 6, 10, 6, 6, 22, -2, 22], col); R(c, 30, 1, 4, 3, col); c.restore(); }
// a fingerprint (concentric ovals)
function fingerprint(c, x, y, s = 1, col = '#3c3c5c') { for (let i = 0; i < 7; i++) { const rx = (4 + i * 3) * s, ry = (6 + i * 4) * s; for (let a = 0; a < 40; a++) { if ((a + i) % 9 === 0) continue; const an = a / 40 * TAU; P(c, x + Math.cos(an) * rx, y + Math.sin(an) * ry, col); } } }
// a roll of tape
function tape(c, x, y, col = '#8c7c5c') { E(c, x, y, 12, 12, col); E(c, x, y, 6, 6, '#c8c4b4'); R(c, x + 8, y - 2, 20, 8, shadeCol(col, 1.1)); }
// three small lights (the three, remembered)
function lights3(c, t, x, y) { for (let i = 0; i < 3; i++) { const lx = x + i * 30; c.save(); c.globalAlpha = 0.6 + 0.15 * Math.sin(t * 2 + i); glow(c, lx, y, 12, 12, '#f8e8b0', 0.6); E(c, lx, y, 3, 3, '#f8f0d8'); c.restore(); } }
function clockCard(c, x, y, txt) { R(c, x, y, 96, 26, '#141414'); R(c, x + 3, y + 3, 90, 20, '#0c1c0c'); TX(c, txt, x + 10, y + 4, '#5cf85c', 16, null); }
function flowers3(c, t, x, y) { for (let i = 0; i < 3; i++) { const fx = x + i * 22; L(c, fx, y + 4, fx, y + 16, '#3c6c3c'); for (let k = 0; k < 6; k++) E(c, fx + Math.cos(k) * 3, y + Math.sin(k) * 3, 2.5, 2.5, '#f4f0e8'); E(c, fx, y, 1.5, 1.5, '#e8d870'); } }

/* ---- cast ---- */
const PART = { id: 'pt', top: 'shirt', coat: '#c87c5c', pants: '#4c4438', shoes: '#2c2c2c', skin: '#e8c4a0', hair: '#2c2018', hairStyle: 'long' };
const GIRLS = [{ id: 'g1', top: 'shirt', coat: '#c86c7c', pants: '#3c3c54', shoes: '#2c2c2c', skin: '#f0c8a8', hair: '#1c1418', hairStyle: 'long' }, { id: 'g2', top: 'tee', coat: '#5c9cc8', pants: '#3c3c54', shoes: '#2c2c2c', skin: '#f0c8a8', hair: '#2c2018', hairStyle: 'side' }];
const CUSTOMERS = ['#7c8c6c', '#8c6c7c', '#6c7c9c', '#9c8c5c'].map((col, i) => ({ id: 'cu' + i, top: i % 2 ? 'dress' : 'shirt', coat: col, pants: '#3c3c44', shoes: '#2c2c2c', skin: ['#e8c4a0', '#d8b090'][i % 2], hair: ['#2c2018', '#5c5c58'][i % 2], hairStyle: i % 2 ? 'long' : 'short' }));
const STRANGER = { id: 'st', top: 'shirt', coat: '#e8e8e0', pants: '#7c7c7c', shoes: '#2c2c2c', skin: '#c8a080', hair: '#3c3834', hairStyle: 'short' };
const COUPLE = [{ id: 'cp1', top: 'tee', coat: '#e8e0c8', pants: '#3c4c6c', shoes: '#2c2c2c', skin: '#e0c0a0', hair: '#2c2018', hairStyle: 'short' }, { id: 'cp2', top: 'dress', coat: '#c8a0b8', skin: '#f0c8a8', hair: '#5c3c2c', hairStyle: 'long' }];
const CHIJIN = { id: 'cj', top: 'shirt', coat: '#6c7c8c', pants: '#3c3c44', shoes: '#2c2c2c', skin: '#d0a07c', hair: '#3c3834', hairStyle: 'short' };
const OKAMI = { id: 'om', top: 'dress', coat: '#5c4c6c', skin: '#e8c4a0', hair: '#2c2018', hairStyle: 'long' };
const DANCERS = ['#c8c0d8', '#d8a0a0', '#a0c0d8', '#d8d0a0'].map((col, i) => ({ id: 'dc' + i, top: 'dress', coat: col, skin: '#e8c4a0', hair: '#1c1418', hairStyle: 'long' }));
const TEENS = [{ id: 'tn1', top: 'shirt', coat: '#e8e8f0', pants: '#2c2c3c', shoes: '#2c2c2c', skin: '#e0c0a0', hair: '#1c1418', hairStyle: 'side' }, { id: 'tn2', top: 'tee', coat: '#e8c848', pants: '#4c5c8c', shoes: '#2c2c2c', skin: '#f0c8a8', hair: '#1c1418', hairStyle: 'long' }];
const STUDENTS = ['#2c3c5c', '#2c3c5c', '#2c3c5c', '#2c3c5c'].map((col, i) => ({ id: 'sd' + i, top: i % 2 ? 'dress' : 'jacket', coat: col, shirt: '#f0f0ec', tie: '#8c1c1c', pants: col, shoes: '#1c1c1c', skin: ['#f0c8a8', '#e8c4a0'][i % 2], hair: '#1c1418', hairStyle: i % 2 ? 'long' : 'short' }));

/* ---- the safe as a face (48x48), for the horror cut: its dial an eye, its keyhole a mouth ---- */
function kinkoFace(o = {}) {
  return SPR('knF' + (o.dark ? 'd' : ''), 48, 48, c => {
    R(c, 4, 4, 40, 44, '#4c4c54'); R(c, 7, 7, 34, 38, '#5c5c64'); E(c, 22, 24, 9, 9, '#8c8c94'); E(c, 22, 24, 4, 4, '#2c2c34'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; P(c, 22 + Math.cos(a) * 7, 24 + Math.sin(a) * 7, '#c8c8d0'); } R(c, 36, 18, 3, 14, '#c8a048'); for (let i = 0; i < 4; i++) P(c, 8 + i * 10, 44, '#2c2c2c');
  });
}
const PORTRAITS = {};
function sedan(c, x, y, col = '#5c6c7c', o = {}) { R(c, x, y - 15, 64, 10, col); R(c, x + 12, y - 25, 38, 10, shadeCol(col, 0.85)); R(c, x + 15, y - 23, 14, 7, '#8cacc8'); R(c, x + 32, y - 23, 14, 7, '#8cacc8'); for (const wx of [x + 12, x + 52]) E(c, wx, y - 4, 6, 6, '#141414'); if (o.lights) { R(c, x + 61, y - 13, 3, 3, '#f8f0a0'); glow(c, x + 72, y - 12, 20, 7, '#f8f0a0', 0.3); } }
function bicycle(c, x, y, col = '#5c8cc8') { for (const wx of [x, x + 26]) { E(c, wx, y - 8, 8, 8, '#2c2c2c'); E(c, wx, y - 8, 6.5, 6.5, '#a8a8a8'); } L(c, x, y - 8, x + 10, y - 20, col, 2); L(c, x + 10, y - 20, x + 26, y - 8, col, 2); L(c, x + 8, y - 8, x + 22, y - 20, col, 2); L(c, x + 22, y - 20, x + 26, y - 8, col, 2); R(c, x + 6, y - 23, 8, 3, '#2c2c2c'); L(c, x + 22, y - 20, x + 24, y - 26, '#2c2c2c', 2); R(c, x + 20, y - 27, 8, 2, '#2c2c2c'); }
