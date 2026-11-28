/* ================= 都市伝説 #006 メリーさんの電話: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function lampPost(c, t, x, y = 160, o = {}) { R(c, x, y - 110, 3, 110, '#4c4c54'); R(c, x - 12, y - 112, 16, 3, '#4c4c54'); glow(c, x - 6, y - 106, 40, 60, '#f8d890', 0.3 + 0.03 * Math.sin(t * 2)); R(c, x - 10, y - 109, 9, 2, '#f8f0c0'); c.save(); c.globalAlpha = 0.12; PF(c, [x - 8, y - 106, x - 50, y, x + 36, y], '#f8e8b0'); c.restore(); }

/* ---- cast ---- */
const GIRL = { id: 'gl', kid: true, top: 'sweater', coat: '#c86c7c', pants: '#3c3c54', shoes: '#2c2c2c', skin: '#f0c8a8', hair: '#1c1418', hairStyle: 'side' };
const GIRL_S = Object.assign({}, GIRL, { id: 'gls', top: 'dress', coat: '#e8c8d8' }); // the girl years ago, small, in a nightdress
const MOM = { id: 'mm', top: 'sweater', coat: '#7c8c6c', pants: '#4c4438', shoes: '#2c2c2c', skin: '#f0c8a8', hair: '#2c2018', hairStyle: 'long' };
const DAD = { id: 'dd', top: 'shirt', coat: '#5c6c8c', pants: '#3c3c44', shoes: '#2c2c2c', skin: '#e8c4a0', hair: '#141414', hairStyle: 'short', glasses: true };
const KIDS = ['#5c8cc8', '#c8a03c', '#7cac6c', '#a86ca8'].map((col, i) => ({ id: 'kd' + i, kid: true, top: i % 2 ? 'dress' : 'tee', coat: col, pants: '#3c3c48', shoes: '#2c2c2c', skin: ['#f0c8a8', '#e8c4a0'][i % 2], hair: '#1c1418', hairStyle: ['short', 'long', 'side', 'long'][i] }));

/* ---- Merry: a foreign doll, golden curls, blue glass eyes, a faded pink dress (22x34, anchor 11,33); o.faded: colours gone dull; o.back: seen from behind ---- */
function merrySpr(o = {}) {
  return SPR('mry' + (o.faded ? 'f' : '') + (o.back ? 'b' : '') + (o.sit ? 's' : ''), 22, 34, c => {
    const hair = o.faded ? '#b8a060' : '#e8c048', hair2 = o.faded ? '#8c7840' : '#c89c28', dress = o.faded ? '#b89ca0' : '#e88ca8', dress2 = o.faded ? '#8c7478' : '#c86c88', sk = '#f4e4d8';
    if (o.sit) { R(c, 4, 26, 6, 4, sk); R(c, 12, 26, 6, 4, sk); R(c, 2, 28, 4, 3, '#5c3c2c'); R(c, 16, 28, 4, 3, '#5c3c2c'); }
    else { R(c, 7, 27, 3, 6, sk); R(c, 12, 27, 3, 6, sk); R(c, 6, 31, 4, 3, '#5c3c2c'); R(c, 12, 31, 4, 3, '#5c3c2c'); }
    PF(c, [7, 14, 15, 14, 19, 28, 3, 28], dress); R(c, 3, 26, 16, 2, dress2); R(c, 5, 27, 12, 1, '#f8f0f0'); L(c, 7, 15, 3, 23, dress, 2); L(c, 15, 15, 19, 23, dress, 2); E(c, 3, 24, 1.5, 1.5, sk); E(c, 19, 24, 1.5, 1.5, sk);
    E(c, 11, 8, 8, 8, hair); for (const x of [3, 5, 17, 19]) E(c, x, 13, 2, 3, hair2);
    if (o.back) { E(c, 11, 9, 7, 7, hair); for (let i = 0; i < 4; i++) L(c, 6 + i * 3, 6, 6 + i * 3, 15, hair2); R(c, 8, 1, 6, 2, dress2); return; }
    E(c, 11, 9, 6, 6, sk); R(c, 5, 2, 12, 4, hair); P(c, 8, 9, '#3c7cd8'); P(c, 14, 9, '#3c7cd8'); P(c, 8, 8, '#1c2c5c'); P(c, 14, 8, '#1c2c5c'); P(c, 11, 12, '#c84c5c'); E(c, 7, 11, 1, 0.6, '#f0b8b8'); E(c, 15, 11, 1, 0.6, '#f0b8b8'); R(c, 8, 1, 6, 2, dress2);
  });
}
function merry(c, x, y, o = {}) { c.save(); if (o.a != null) c.globalAlpha = o.a; blit(c, merrySpr(o), x, y, 11, 33, { flip: !!o.flip, s: o.s || 1, rot: o.rot }); c.restore(); }
// a small dark silhouette with two blue points (never a full monster): o.eyes 0..1
function merryShadow(c, x, y, o = {}) { const sp = tintSpr(merrySpr({ back: !o.front }), '#4c5c8c', 'mrim' + (o.front ? 'f' : 'b')); for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1]]) blit(c, sp, x + dx, y + dy, 11, 33, { s: o.s || 1 }); blit(c, tintSpr(merrySpr({ back: !o.front }), '#04040a', 'mshd' + (o.front ? 'f' : 'b')), x, y, 11, 33, { s: o.s || 1 }); if (o.eyes) { c.save(); c.globalAlpha = o.eyes; const s = o.s || 1; P(c, x - 3 * s, y - 24 * s, '#5ca8f8'); P(c, x + 3 * s, y - 24 * s, '#5ca8f8'); glow(c, x, y - 24 * s, 8, 4, '#5ca8f8', 0.3); c.restore(); } }

/* ---- props ---- */
// the black dial telephone (40x24 at x,y = top-left); o.ring: shakes and draws ring marks; o.off: receiver lifted
function kuroden(c, t, x, y, o = {}) {
  const sh = o.ring ? Math.round(Math.sin(t * 60)) : 0; x += sh;
  R(c, x + 4, y + 10, 32, 14, '#141418'); R(c, x + 2, y + 20, 36, 4, '#0c0c10'); E(c, x + 20, y + 16, 7, 6, '#2c2c34'); E(c, x + 20, y + 16, 3, 3, '#d8d0c0'); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; P(c, x + 20 + Math.cos(a) * 5, y + 16 + Math.sin(a) * 5, '#5c5c64'); }
  if (!o.off) { R(c, x, y + 4, 40, 6, '#141418'); E(c, x + 4, y + 7, 5, 4, '#141418'); E(c, x + 36, y + 7, 5, 4, '#141418'); R(c, x + 8, y + 3, 24, 2, '#3c3c44'); }
  else { R(c, x + 10, y + 8, 20, 2, '#2c2c34'); }
  if (o.ring) { c.save(); c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 20); for (const d of [-1, 1]) { L(c, x + 20 + d * 24, y + 2, x + 20 + d * 30, y - 4, '#f8e8a0', 2); L(c, x + 20 + d * 26, y + 10, x + 20 + d * 34, y + 8, '#f8e8a0', 2); } c.restore(); }
}
// a receiver held to the ear / dangling: drawn beside a person
function receiver(c, x, y, o = {}) { R(c, x, y, 4, 12, '#141418'); R(c, x - 1, y - 1, 6, 4, '#141418'); R(c, x - 1, y + 10, 6, 4, '#141418'); if (o.cord) for (let i = 0; i < 10; i++) P(c, x + 2 + Math.sin(i) * 2, y + 14 + i * 2, '#2c2c34'); }
function boxes(c, x, y, n = 3) { for (let i = 0; i < n; i++) { const bx = x + i * 26 - (i > 2 ? 60 : 0), by = y - (i > 2 ? 20 : 0); R(c, bx, by - 20, 24, 20, '#b8905c'); R(c, bx, by - 20, 24, 3, '#8c6c44'); R(c, bx + 10, by - 20, 4, 20, '#d8c098'); } }
function ringMarks(c, t, x, y) { c.save(); c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 20); TX(c, 'リリリ', x, y, '#f8e8a0', 16, null); c.restore(); }
function crow(c, x, y, t, k = 0) { const f = Math.floor(t * 3 + k) & 1; E(c, x, y, 5, 3, '#0c0c10'); E(c, x + 5, y - 3, 2.5, 2.5, '#0c0c10'); PF(c, [x + 7, y - 3, x + 10, y - 2, x + 7, y - 1], '#3c3c3c'); if (f) PF(c, [x - 3, y - 1, x + 2, y - 8, x + 3, y], '#141418'); L(c, x - 1, y + 3, x - 1, y + 6, '#3c3c3c'); }

/* ---- places ---- */
// the old house: a tatami room, the oshiire (closet) open, cardboard boxes; daylight
function oldRoom(c, t, o = {}) {
  R(c, 0, 0, W, H, '#d8c8a0'); R(c, 0, 0, W, 16, '#8c6c44'); R(c, 0, 116, W, 74, '#b8b070'); for (let x = 0; x < W; x += 54) R(c, x, 116, 2, 74, '#8c8848');
  R(c, 20, 26, 110, 92, '#5c4c3c'); R(c, 24, 30, 102, 40, '#2c241c'); R(c, 24, 74, 102, 40, '#1c1810'); R(c, 20, 70, 110, 4, '#7c6448'); if (o.doll !== false) merry(c, 74, 66, { faded: true, sit: true });
  R(c, 200, 30, 90, 60, '#e8f0f8'); R(c, 244, 30, 2, 60, '#8c6c44'); R(c, 200, 58, 90, 2, '#8c6c44'); glow(c, 245, 60, 60, 40, '#f8f0d0', 0.25);
  boxes(c, 160, 128, 3);
}
// the girl's bed years ago (night, a small lamp)
function bedRoom(c, t) { R(c, 0, 0, W, H, '#1c1c34'); glow(c, 250, 70, 60, 50, '#f8d890', 0.3); R(c, 244, 70, 12, 12, '#f8e8b0'); R(c, 60, 104, 170, 30, '#e8e4f0'); R(c, 60, 96, 40, 12, '#f8f8f8'); R(c, 60, 134, 170, 8, '#5c4c3c'); R(c, 120, 100, 110, 30, '#c8a0c8'); }
// the town's rubbish place: a net-covered heap, a fence, a lamp; morning or night
function dump(c, t, o = {}) {
  const n = !!o.night; VG(c, 0, 0, W, 120, n ? ['#0c0c1c', '#1c1c34', '#2c2c44'] : ['#a8c0d8', '#c8d4dc', '#e0e0d8']);
  R(c, 0, 116, W, 74, n ? '#24242c' : '#8c8c84'); R(c, 40, 60, 2, 60, n ? '#3c3c4c' : '#5c5c64'); for (let x = 40; x < 290; x += 12) L(c, x, 60, x, 118, n ? '#34344c' : '#7c7c84'); for (let y = 60; y < 118; y += 10) L(c, 40, y, 290, y, n ? '#34344c' : '#7c7c84');
  PF(c, [60, 130, 90, 100, 140, 96, 190, 104, 240, 98, 280, 130], n ? '#24242c' : '#5c5c64'); for (let i = 0; i < 9; i++) R(c, 70 + i * 22, 108 + (i * 7) % 14, 16, 10, n ? ['#2c3448', '#3c3c44', '#2c3c34'][i % 3] : ['#4c6c9c', '#c8c8c0', '#5c8c5c'][i % 3]);
  R(c, 280, 30, 3, 90, '#3c3c44'); if (n) { glow(c, 281, 34, 50, 50, '#f8e8b0', 0.35); R(c, 270, 30, 14, 4, '#f8f0c8'); }
}
// the new house: a bare room at night, boxes stacked, the curtained window; the black phone by the entrance (o.phone x)
function newRoom(c, t, o = {}) {
  R(c, 0, 0, W, H, o.lit ? '#d8d4c8' : '#5c5868'); R(c, 0, 0, W, 14, o.lit ? '#b8b4a8' : '#3c3848'); R(c, 0, 124, W, 66, o.lit ? '#a89878' : '#4c4438');
  R(c, 30, 30, 80, 60, o.curtain ? '#8c4c5c' : '#0c0c1c'); R(c, 26, 28, 88, 4, '#3c3430'); if (!o.curtain) { for (let i = 0; i < 12; i++) P(c, 36 + (i * 17) % 70, 36 + (i * 11) % 30, '#8c8cac'); R(c, 69, 30, 2, 60, '#3c3430'); } else { R(c, 68, 30, 4, 60, '#6c3c4c'); }
  boxes(c, 130, 136, 4); R(c, 262, 40, 50, 100, '#4c3c30'); R(c, 266, 44, 42, 92, '#5c4838'); E(c, 302, 92, 2, 2, '#c8b070');
  if (!o.lit) dim(c, 0.15);
}
// a night street corner with one street lamp; o.what: 'station' | 'park' | 'tabako' | 'house'
function nightPlace(c, t, o = {}) {
  VG(c, 0, 0, W, 130, ['#04040c', '#0c0c1c', '#141428']); for (let i = 0; i < 20; i++) P(c, (i * 67) % W, (i * 23) % 50, '#6c6c8c'); R(c, 0, 128, W, 62, '#1c1c24'); R(c, 0, 128, W, 2, '#3c3c44');
  const w = o.what;
  if (w === 'station') { R(c, 60, 50, 200, 78, '#2c2c38'); R(c, 50, 44, 220, 10, '#3c3c48'); R(c, 120, 58, 80, 16, '#e8e4d8'); TX(c, 'えき', 144, 58, '#1c1c1c', 16, null); for (let i = 0; i < 4; i++) R(c, 80 + i * 44, 84, 30, 30, '#f8e8b0'); R(c, 140, 84, 40, 44, '#0c0c14'); }
  else if (w === 'park') { for (let i = 0; i < 3; i++) { const x = 40 + i * 110; R(c, x + 14, 70, 6, 58, '#2c241c'); E(c, x + 17, 64, 26, 22, '#0c1c10'); } R(c, 150, 90, 3, 38, '#5c5c64'); R(c, 200, 90, 3, 38, '#5c5c64'); R(c, 148, 88, 58, 3, '#5c5c64'); L(c, 170, 91, 168 + Math.sin(t) * 3, 112, '#3c3c44'); R(c, 160, 112, 16, 3, '#6c4c3c'); }
  else if (w === 'tabako') { R(c, 150, 46, 140, 82, '#4c3c30'); R(c, 150, 40, 140, 10, '#2c241c'); R(c, 222, 54, 60, 14, '#c81c1c'); TX(c, 'たばこ', 228, 52, '#f8f0e0', 16, null); R(c, 160, 76, 100, 40, '#0c0c14'); R(c, 240, 80, 40, 48, '#c8c8c0'); R(c, 244, 84, 32, 20, '#5c8cc8'); }
  else if (w === 'house') { R(c, 130, 50, 160, 78, '#5c5868'); PF(c, [120, 52, 210, 20, 300, 52], '#2c2838'); R(c, 150, 70, 30, 24, '#f8e8b0'); R(c, 220, 80, 30, 48, '#3c3028'); R(c, 0, 120, 120, 8, '#3c3c44'); }
  lampPost(c, t, o.lamp || 110, 160);
}
// a kitchen table with a smartphone (modern days)
function phoneTable(c, t, o = {}) { R(c, 0, 0, W, H, '#14141c'); R(c, 0, 112, W, 78, '#2c241c'); R(c, 0, 110, W, 4, '#3c3028'); const sh = o.ring ? Math.round(Math.sin(t * 60)) : 0; R(c, 146 + sh, 80, 28, 34, '#0c0c10'); R(c, 145 + sh, 81, 30, 32, '#3c3c44'); R(c, 148 + sh, 84, 24, 24, o.ring ? '#a8d8f8' : '#2c3c5c'); R(c, 156 + sh, 110, 8, 2, '#5c5c64'); if (o.ring) { E(c, 160 + sh, 102, 4, 4, '#3cc85c'); for (const d of [-1, 1]) L(c, 160 + d * 18, 88, 160 + d * 22, 84, '#a8d8f8'); } if (!o.ring) glow(c, 160, 100, 30, 14, '#5c7cac', 0.2); if (o.ring) { glow(c, 160, 100, 40, 20, '#a8d8f8', 0.3); TX(c, '非通知', 142 + sh, 74, '#a8d8f8', 16, null); } }

/* ---- portraits (48x48) ---- */
function merryFace(o = {}) { // the doll: porcelain face, golden curls, round blue glass eyes, a tiny red mouth; o.dark for the horror cut
  return SPR('mrF' + (o.blink || 0) + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.dark ? '#8c7c7c' : '#f4e4d8', hair = o.dark ? '#7c6430' : '#e8c048', hair2 = o.dark ? '#5c4820' : '#c89c28';
    PF(c, [4, 48, 10, 38, 38, 38, 44, 48], o.dark ? '#5c3c48' : '#e88ca8'); PF(c, [14, 40, 24, 46, 34, 40], o.dark ? '#a8a0a0' : '#f8f0f0');
    E(c, 24, 21, 17, 17, hair); for (const [x, y] of [[8, 30], [10, 36], [40, 30], [38, 36], [6, 22], [42, 22]]) E(c, x, y, 4, 5, hair2); E(c, 24, 23, 12, 13, sk); R(c, 12, 6, 24, 8, hair); for (let i = 0; i < 5; i++) E(c, 14 + i * 5, 12, 3, 3, hair2);
    for (const x0 of [16, 27]) { if (o.blink === 2 && !o.dark) { L(c, x0, 23, x0 + 5, 23, '#5c3c3c'); continue; } E(c, x0 + 2.5, 23, 3.5, 3.5, '#f8f8f8'); E(c, x0 + 2.5, 23, 2.5, 2.5, o.dark ? '#5ca8f8' : '#3c7cd8'); E(c, x0 + 2.5, 23, 1, 1, '#0c1c3c'); P(c, x0 + 1, 21, '#ffffff'); }
    L(c, 15, 18, 20, 18, '#8c6c3c'); L(c, 28, 18, 33, 18, '#8c6c3c'); E(c, 24, 31, 2, 1.2, '#c84c5c'); E(c, 15, 28, 2.5, 1.5, '#f0b0b8'); E(c, 33, 28, 2.5, 1.5, '#f0b0b8');
    if (o.dark) { c.save(); c.globalAlpha = 0.35; c.fillStyle = '#0c0814'; c.fillRect(0, 0, 48, 48); c.restore(); L(c, 30, 14, 34, 22, '#3c2c2c'); L(c, 34, 22, 32, 26, '#3c2c2c'); }
  });
}
function shojoFace(o = {}) { // the girl, about ten: a black side-parted bob, a pink sweater
  return SPR('sjF' + (o.blink || 0) + (o.scared ? 's' : ''), 48, 48, c => {
    const sk = '#f0c8a8'; PF(c, [4, 48, 10, 38, 38, 38, 44, 48], '#c86c7c'); R(c, 20, 33, 8, 6, sk);
    E(c, 24, 21, 14, 15, '#1c1418'); R(c, 10, 21, 28, 14, '#1c1418'); E(c, 24, 24, 10.5, 11.5, sk); PF(c, [12, 10, 36, 10, 36, 16, 18, 18], '#1c1418');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 23, x0 + 4, 23, '#2c2020'); continue; } R(c, x0, 21, 4, o.scared ? 5 : 4, '#141018'); P(c, x0 + 1, 21, '#f8f8f8'); }
    L(c, 16, 18, 21, o.scared ? 19 : 18, '#1c1418'); L(c, 27, o.scared ? 19 : 18, 32, 18, '#1c1418'); if (o.scared) E(c, 24, 31, 2, 1.5, '#8c4c4c'); else R(c, 22, 31, 4, 1, '#c86c6c'); E(c, 16, 28, 2, 1, '#f0b0a8'); E(c, 32, 28, 2, 1, '#f0b0a8');
  });
}
const PORTRAITS = { merry: p => withMouth('pmmr', merryFace({ blink: p.blink }), p, 24, 31, 4), shojo: p => withMouth('pmsj', shojoFace({ blink: p.blink, scared: true }), p, 24, 31) };
