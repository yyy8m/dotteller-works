/* ================= 記録 #025 ロアノーク植民地の消失: helpers, places, props, cast & portraits ================= */
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

/* ---- places ---- */
// open sea with waves (o.storm darkens and tilts), o.night
function sea(c, t, o = {}) {
  const st = !!o.storm, n = !!o.night;
  VG(c, 0, 0, W, 110, st ? ['#1c1c24', '#2c2c38', '#3c3c48'] : n ? ['#04040c', '#0c0c1c', '#141428'] : ['#7caad8', '#a8c8e0', '#d0e0e8']);
  R(c, 0, 104, W, 86, st ? '#1c2c3c' : n ? '#0c1424' : '#3c6c9c'); for (let i = 0; i < 24; i++) { const x = ((i * 37 + t * (st ? 60 : 20)) % 360) - 20, y = 110 + (i * 13) % 50; R(c, x, y + Math.sin(t * 2 + i) * 2, 12, 1, st ? '#5c6c7c' : '#8cb8d8'); }
  if (st) { for (let i = 0; i < 40; i++) { const x = (i * 29 + t * 200) % W, y = (i * 47 + t * 300) % 110; L(c, x, y, x - 4, y + 8, '#6c7c8c'); } if (fr(t * 0.7) < 0.05) dim(c, 0.4, '#f8f8f0'); }
}
// a 16th-century sailing ship (x = centre, y = waterline), s scale, o.flip faces left
function ship(c, x, y, s = 1, o = {}) {
  c.save(); c.translate(x, y + Math.round(Math.sin((o.t || 0) * 2))); c.scale(o.flip ? -s : s, s);
  PF(c, [-36, -14, 36, -14, 28, 0, -30, 0], '#5c3c24'); R(c, -36, -18, 20, 6, '#6c4c2c'); R(c, 20, -18, 16, 6, '#6c4c2c'); R(c, -30, -8, 58, 1, '#3c2414');
  for (const [mx, h] of [[-12, 46], [10, 54]]) { R(c, mx, -14 - h, 2, h, '#3c2414'); PF(c, [mx - 14, -14 - h + 6, mx + 16, -14 - h + 6, mx + 18, -22, mx - 16, -22], o.torn ? '#a8a090' : '#f0ece0'); }
  R(c, 10, -14 - 58, 10, 5, '#c81818'); c.restore();
}
// Roanoke Island: beach, dark pines, the fort's palisade (o.ruined: empty, posts down)
function island(c, t, o = {}) {
  const n = !!o.night; VG(c, 0, 0, W, 110, n ? ['#04040c', '#0c0c1c', '#141428'] : o.dusk ? ['#5c3c5c', '#c86c4c', '#f8b860'] : ['#8cb0d0', '#b8cce0', '#e0e4d8']);
  for (let i = 0; i < 14; i++) { const x = i * 24 - 4, h = 40 + (i * 17) % 24; PF(c, [x, 110, x + 12, 110 - h, x + 24, 110], n ? '#0c140c' : '#2c4c2c'); }
  R(c, 0, 108, W, 82, n ? '#2c2818' : '#c8b888'); R(c, 0, 108, W, 4, n ? '#3c3424' : '#a89868');
  if (o.fort !== false) { for (let i = 0; i < 20; i++) { const x = 60 + i * 10, down = o.ruined && (i * 7) % 3 !== 0; if (down) { R(c, x - 6, 134 + (i % 2) * 3, 14, 4, '#6c5038'); continue; } R(c, x, 90, 7, 44, '#7c5c3c'); PF(c, [x, 90, x + 3.5, 84, x + 7, 90], '#7c5c3c'); } }
  if (o.houses) for (let i = 0; i < 3; i++) { const x = 90 + i * 50; PF(c, [x - 4, 104, x + 16, 90, x + 36, 104], '#8c7c54'); R(c, x, 104, 32, 22, '#a8906c'); R(c, x + 12, 112, 8, 14, '#3c2c1c'); }
}
// the English court: tapestries, a throne
function court(c, t) { R(c, 0, 0, W, H, '#3c1c2c'); for (let x = 0; x < W; x += 40) { R(c, x + 4, 10, 32, 100, '#5c2c3c'); R(c, x + 8, 14, 24, 92, '#7c3c4c'); for (let y = 20; y < 100; y += 16) R(c, x + 14, y, 12, 6, '#c8a048'); } R(c, 0, 126, W, 64, '#5c4430'); R(c, 140, 70, 40, 58, '#8c1c2c'); R(c, 136, 64, 48, 8, '#c8a048'); }
// a Native village: round-roofed longhouses and a fire
function village(c, t, o = {}) { VG(c, 0, 0, W, 110, o.night ? ['#04040c', '#0c0c1c', '#1c1428'] : ['#8cb0d0', '#b8cce0', '#e0e4d8']); for (let i = 0; i < 10; i++) { const x = i * 34 - 6; PF(c, [x, 110, x + 17, 64 + (i % 3) * 8, x + 34, 110], '#2c4c2c'); } R(c, 0, 108, W, 82, '#8c7c4c'); for (let i = 0; i < 3; i++) { const x = 50 + i * 80; R(c, x, 82, 56, 30, '#a89068'); E(c, x + 28, 82, 28, 12, '#a89068'); R(c, x + 22, 96, 12, 16, '#3c2c1c'); for (let k = 0; k < 5; k++) R(c, x + 4 + k * 11, 84, 1, 28, '#8c7454'); } if (o.fire) { const fx = o.fireX || 150; for (let k = 0; k < 4; k++) { const f = Math.sin(t * 9 + k) * 2; PF(c, [fx + k * 4, 134, fx + 2 + k * 4 + f, 118 - k * 2, fx + 6 + k * 4, 134], k % 2 ? '#f8a03c' : '#f8d860'); } glow(c, fx + 8, 126, 30, 20, '#f8a03c', 0.4); } }
// the carved post: CROATOAN
function carvedPost(c, x, y, txt, o = {}) { if (o.glow) glow(c, x + 15, y + 50, 70, 60, '#f8e8b0', o.glow); x -= 26; R(c, x, y, 82, 110, '#7c5c3c'); R(c, x + 4, y, 4, 110, '#8c6c4c'); R(c, x + 76, y, 4, 110, '#5c3c24'); for (let i = 0; i < 9; i++) R(c, x + 10 + (i * 13) % 60, y + 4 + i * 12, 10, 1, '#6c4c30'); if (txt) { R(c, x + 6, y + 40, 70, 22, '#c8a878'); TX(c, txt, x + 41 - txt.length * 4, y + 43, '#2c1c10', 16, null); } }
// a pine trunk with letters carved (CRO)
function carvedTree(c, x, y, txt) { R(c, x, y, 34, 110, '#5c4430'); for (let i = 0; i < 8; i++) R(c, x + 4 + (i * 7) % 26, y + i * 13, 2, 8, '#4c3424'); R(c, x + 6, y + 30, 22, 46, '#c8a878'); for (let i = 0; i < txt.length; i++) TX(c, txt[i], x + 10, y + 32 + i * 14, '#3c2414', 16, null); }
// a hand-drawn map of the islands (John White style)
function oldMap(c, t, o = {}) { R(c, 0, 0, W, H, '#c8b48c'); R(c, 20, 20, 280, 130, '#e8d8b0'); R(c, 20, 20, 280, 2, '#8c7454'); PF(c, [40, 140, 60, 40, 90, 30, 100, 140], '#a8b878'); for (let i = 0; i < 6; i++) PF(c, [130 + i * 24, 60 + (i % 3) * 20, 138 + i * 24, 50 + (i % 3) * 20, 150 + i * 24, 64 + (i % 3) * 20, 140 + i * 24, 72 + (i % 3) * 20], '#a8b878'); for (let y = 30; y < 140; y += 8) for (let x = 110; x < 290; x += 16) P(c, x + (y % 16) / 2, y, '#8ca8c8'); if (o.mark) { E(c, o.mark[0], o.mark[1], 5, 5, '#c81818'); TX(c, o.label || '', o.mark[0] - 20, o.mark[1] + 8, '#5c1c1c', 16, null); } }
// tree rings (cross-section)
function treeRings(c, x, y, r, t, hl) { for (let i = 0; i < 16; i++) { const rr = r - i * (r / 16); E(c, x, y, rr, rr * 0.9, i % 2 ? '#c8a070' : '#b08858'); } if (hl) { c.save(); c.globalAlpha = 0.6 + 0.3 * Math.sin(t * 4); ER(c, x, y, r * 0.55, r * 0.5, '#c81818'); c.restore(); } }
function ring(c, x, y, s = 1) { E(c, x, y, 10 * s, 10 * s, '#e8c048'); E(c, x, y, 6 * s, 6 * s, '#2c2c34'); R(c, x - 6 * s, y - 16 * s, 12 * s, 8 * s, '#e8c048'); if (s >= 2) { const q = s; R(c, x - 3 * q, y - 13 * q, 5 * q, 2 * q, '#8c6c1c'); R(c, x + 1 * q, y - 15 * q, 2 * q, 2 * q, '#8c6c1c'); R(c, x - 3 * q, y - 11 * q, 1 * q, 1.5 * q, '#8c6c1c'); R(c, x + 1 * q, y - 11 * q, 1 * q, 1.5 * q, '#8c6c1c'); R(c, x - 4 * q, y - 14 * q, 1 * q, 1 * q, '#8c6c1c'); } else P(c, x, y - 12 * s, '#8c6c1c'); }

/* ---- cast ---- */
const WHITE = { id: 'jw', top: 'jacket', coat: '#3c3c44', shirt: '#f0ece0', pants: '#4c4c54', shoes: '#2c2018', skin: '#e8c8a8', hair: '#a8a49c', hairStyle: 'short', hat: 'fedora', hatCol: '#2c2c2c' };
const RALEIGH = { id: 'wr', top: 'jacket', coat: '#5c2c3c', shirt: '#f0ece0', pants: '#3c2c2c', shoes: '#2c2018', skin: '#e8c8a8', hair: '#3c2c1c', hairStyle: 'side', hat: 'fedora', hatCol: '#1c1c1c' };
const QUEEN = { id: 'qe', top: 'dress', coat: '#c8a048', skin: '#f4e4d8', hair: '#c8582c', hairStyle: 'long' };
const GRENVILLE = { id: 'gv', top: 'jacket', coat: '#2c3c5c', shirt: '#e8e4d8', pants: '#2c2c3c', shoes: '#1c1c1c', skin: '#d8b090', hair: '#2c2018', hairStyle: 'short', hat: 'helmet', hatCol: '#4c4c54' };
const DRAKE = { id: 'dk', top: 'jacket', coat: '#5c3c1c', shirt: '#e8e4d8', pants: '#3c2c1c', shoes: '#1c1c1c', skin: '#d8b090', hair: '#8c5c2c', hairStyle: 'short', hat: 'fedora', hatCol: '#2c2c2c' };
const ELEANOR = { id: 'el', top: 'dress', coat: '#7c8c6c', skin: '#f0d0b4', hair: '#8c5c3c', hairStyle: 'long' };
const COLONISTS = ['#6c5c4c', '#5c6c5c', '#7c6c5c', '#5c5c6c', '#8c6c5c', '#6c6c4c'].map((col, i) => ({ id: 'co' + i, top: i % 3 === 1 ? 'dress' : 'shirt', coat: col, pants: '#4c4438', shoes: '#2c2018', skin: ['#e8c8a8', '#f0d0b4', '#e0c0a0'][i % 3], hair: ['#5c3c1c', '#c8a060', '#2c2018'][i % 3], hairStyle: i % 3 === 1 ? 'long' : 'short', kid: i === 5 }));
const NATIVES = ['#8c5c34', '#7c4c2c', '#9c6c3c'].map((col, i) => ({ id: 'na' + i, top: 'tee', coat: col, pants: '#6c4c2c', shoes: '#5c3c24', skin: '#b8805c', hair: '#141010', hairStyle: 'long' }));
const SAILORS = ['#3c4c6c', '#5c4c3c', '#4c5c5c'].map((col, i) => ({ id: 'sa' + i, top: 'shirt', coat: col, pants: '#3c3c44', shoes: '#2c2018', skin: '#d0a07c', hair: '#2c2018', hairStyle: 'short', hat: i === 1 ? 'cap' : null, hatCol: '#3c3c3c' }));
const SCIENTISTS = ['#e8e8e0', '#8c9cac'].map((col, i) => ({ id: 'sc' + i, top: i ? 'jacket' : 'shirt', coat: col, shirt: '#e8e4d8', pants: '#3c3c44', shoes: '#2c2c2c', skin: ['#e0c0a0', '#c8946c'][i], hair: ['#5c4c3c', '#1c1814'][i], hairStyle: 'short', glasses: i === 0 }));
const BABY = { id: 'bb', kid: true, top: 'dress', coat: '#f0ece0', skin: '#f4d8c0', hair: '#c8a060', hairStyle: 'short' };

/* ---- portraits (48x48) ---- */
function whiteFace(o = {}) { // John White: grey hair and beard, a dark hat, tired eyes
  return SPR('jwF' + (o.blink || 0) + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.dark ? '#8c7c6c' : '#e8c8a8', sk2 = o.dark ? '#5c4c40' : '#c0a080';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#3c3c44'); PF(c, [16, 37, 24, 42, 32, 37], '#f0ece0');
    R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11.5, 14, sk2); E(c, 23.5, 21.5, 11, 13.5, sk); PF(c, [13, 26, 16, 36, 24, 40, 32, 36, 35, 26, 30, 31, 18, 31], '#b8b4ac');
    R(c, 10, 8, 28, 6, '#2c2c2c'); R(c, 14, 2, 20, 8, '#2c2c2c'); R(c, 12, 14, 4, 6, '#a8a49c'); R(c, 32, 14, 4, 6, '#a8a49c');
    L(c, 16, 17, 21, 17, '#8c8884', 2); L(c, 27, 17, 32, 17, '#8c8884', 2); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 5, 21, '#2c1c14'); continue; } R(c, x0, 20, 5, 3, '#f0e8dc'); R(c, x0 + 2, 20, 2, 3, '#2c2c44'); }
    L(c, 24, 22, 23, 27, sk2); R(c, 21, 31, 6, 1, '#6c4c3c');
    if (o.dark) { c.save(); c.globalAlpha = 0.3; R(c, 0, 0, 48, 48, '#0c0410'); c.restore(); }
  });
}
function kenkyuFace(o = {}) { // a climate researcher of 1998: glasses, short brown hair, a white shirt
  return SPR('kkF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0c0a0', sk2 = '#b89878'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#e8e8e0'); R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11.5, 14, sk2); E(c, 23.5, 21.5, 11, 13.5, sk);
    PF(c, [12, 18, 12, 9, 18, 6, 32, 6, 36, 10, 36, 18, 32, 12, 16, 12], '#5c4c3c'); for (const x0 of [15, 27]) { R(c, x0, 17, 7, 6, '#2c2c2c'); R(c, x0 + 1, 18, 5, 4, '#d8e0e8'); if (o.blink === 2) { L(c, x0 + 1, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0 + 3, 19, 2, 2, '#141414'); }
    L(c, 22, 20, 26, 20, '#2c2c2c'); L(c, 24, 22, 23, 27, sk2); R(c, 20, 31, 8, 1, '#8c4c3c');
  });
}
const PORTRAITS = { kenkyu: p => withMouth('pmkk', kenkyuFace({ blink: p.blink }), p, 24, 31) };
