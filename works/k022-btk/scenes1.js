/* ================= 記録 #022 BTK（デニス・レイダー）: helpers, cast, places, props & portraits ================= */
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
// a typed letter / parcel (o.lines, o.stamp text)
function letter(c, x, y, w, h, o = {}) { R(c, x, y, w, h, '#f0ece0'); R(c, x, y, w, 2, '#c8c4b8'); for (let i = 0; i < (o.lines || 6); i++) R(c, x + 6, y + 8 + i * 6, w - 12 - (i % 3) * 8, 1, '#3c3c3c'); if (o.head) TX(c, o.head, x + 6, y + h - 20, '#c81818', 16, null); }
function floppy(c, x, y, s = 1) { R(c, x, y, 34 * s, 34 * s, '#1c1c24'); R(c, x + 8 * s, y, 18 * s, 12 * s, '#a8acb4'); R(c, x + 18 * s, y + 2 * s, 5 * s, 8 * s, '#1c1c24'); R(c, x + 5 * s, y + 17 * s, 24 * s, 15 * s, '#f0ece0'); R(c, x + 7 * s, y + 20 * s, 20 * s, 1, '#5c5c5c'); R(c, x + 7 * s, y + 24 * s, 14 * s, 1, '#5c5c5c'); }
function jeep(c, x, y, o = {}) { R(c, x, y - 22, 70, 18, '#141418'); R(c, x + 8, y - 34, 48, 13, '#141418'); R(c, x + 12, y - 31, 18, 8, '#4c5c6c'); R(c, x + 34, y - 31, 18, 8, '#4c5c6c'); for (const wx of [x + 14, x + 56]) { E(c, wx, y - 3, 7, 7, '#0c0c10'); E(c, wx, y - 3, 3, 3, '#8c8c94'); } R(c, x + 66, y - 18, 4, 3, '#f8f0c0'); }
// Wichita suburbs (o.night; o.snow): ranch houses, bare trees, street lamps
function suburb(c, t, o = {}) {
  const n = !!o.night; VG(c, 0, 0, W, 120, n ? ['#04040c', '#0c0c1c', '#1c1c2c'] : ['#7c9cc8', '#a8c0d8', '#d8dcd8']);
  if (n) for (let i = 0; i < 24; i++) P(c, (i * 47) % W, (i * 29) % 70, '#a8a8c8');
  for (let i = 0; i < 4; i++) { const x = i * 84 - 10; R(c, x, 84, 70, 36, n ? '#1c1c24' : '#c8b8a0'); PF(c, [x - 6, 86, x + 35, 66, x + 76, 86], n ? '#14141c' : '#7c5c4c'); R(c, x + 10, 96, 14, 12, n ? (i === 1 ? '#c8a050' : '#0c0c14') : '#5c6c7c'); R(c, x + 44, 98, 12, 22, n ? '#0c0c10' : '#5c4030'); }
  for (let i = 0; i < 3; i++) { const x = 60 + i * 110; L(c, x, 120, x, 76, '#3c3028', 2); for (let k = 0; k < 4; k++) L(c, x, 90 - k * 4, x + (k % 2 ? 12 : -12), 80 - k * 6, '#3c3028'); }
  R(c, 0, 120, W, 70, n ? '#14141a' : '#8c8c84'); R(c, 0, 140, W, 24, n ? '#1c1c22' : '#5c5c5c'); for (let x = 0; x < W; x += 40) R(c, x + 10, 151, 18, 2, '#c8c070');
  if (n) for (const x of [30, 250]) { R(c, x, 90, 3, 50, '#2c2c2c'); E(c, x + 1, 88, 5, 3, '#f8e8a0'); glow(c, x + 1, 100, 26, 30, '#f8e8a0', 0.18); }
}
function tvStation(c, t) { R(c, 0, 0, W, H, '#2c2c34'); VG(c, 0, 0, W, 120, ['#3c3c48', '#4c4c58', '#5c5c68']); R(c, 30, 30, 120, 70, '#141418'); R(c, 34, 34, 112, 62, '#2c3c5c'); for (let i = 0; i < 3; i++) { const u = fr(t * 0.3 + i / 3); R(c, 40, 40 + i * 18, 100 * u, 4, '#5c7cac'); } R(c, 160, 34, 40, 50, '#5c1c1c'); E(c, 180, 52, 10, 10, '#c83c3c'); R(c, 176, 62, 8, 18, '#8c8c94'); R(c, 0, 120, W, 70, '#3c3834'); R(c, 40, 110, 240, 14, '#5c4c3c'); }
function library(c, t) { R(c, 0, 0, W, H, '#4c3c2c'); for (let r = 0; r < 4; r++) { R(c, 0, 20 + r * 26, W, 3, '#3c2c1c'); for (let i = 0; i < 26; i++) R(c, 4 + i * 12, 2 + r * 26, 9, 18, ['#8c3c3c', '#3c5c8c', '#5c7c3c', '#8c7c3c', '#5c3c6c'][(i + r * 3) % 5]); } R(c, 0, 124, W, 66, '#5c4c38'); R(c, 40, 112, 240, 12, '#7c5c3c'); }
function parkingLot(c, t) { VG(c, 0, 0, W, 110, ['#7c9cc8', '#a8c0d8', '#d8dcd8']); R(c, 30, 40, 260, 70, '#e8a838'); R(c, 30, 40, 260, 14, '#c8781c'); TX(c, 'HOME', 130, 42, '#f8f8f0', 16, null); R(c, 140, 70, 40, 40, '#3c3c44'); R(c, 0, 110, W, 80, '#5c5c5c'); for (let x = 0; x < W; x += 50) R(c, x, 140, 2, 40, '#e8e8e0'); R(c, 270, 60, 16, 10, '#2c2c2c'); E(c, 284, 66, 3, 3, '#c81818'); }
function church(c, t) { VG(c, 0, 0, W, 120, ['#8ca8c8', '#b8c8d8', '#e0e0d8']); R(c, 110, 40, 100, 80, '#c8b8a0'); PF(c, [104, 42, 160, 10, 216, 42], '#7c4c3c'); R(c, 156, 0, 8, 20, '#5c4c3c'); R(c, 152, 4, 16, 4, '#5c4c3c'); R(c, 150, 80, 20, 40, '#5c3c24'); for (let i = 0; i < 2; i++) { R(c, 124 + i * 60, 60, 14, 22, '#5c8cc8'); E(c, 131 + i * 60, 60, 7, 6, '#5c8cc8'); } R(c, 0, 120, W, 70, '#8ca06c'); }
function pressRoom(c, t) { R(c, 0, 0, W, H, '#2c3040'); R(c, 0, 0, W, 110, '#3c4458'); R(c, 100, 30, 120, 40, '#1c2c5c'); TX(c, 'WICHITA POLICE', 104, 40, '#e8e8f0', 16, null); R(c, 110, 96, 100, 24, '#5c4030'); for (let i = 0; i < 4; i++) { L(c, 126 + i * 22, 96, 126 + i * 22 + 2, 86, '#2c2c2c', 2); E(c, 128 + i * 22, 84, 3, 3, '#3c3c3c'); } R(c, 0, 120, W, 70, '#24283a'); }
function stopSign(c, x, y) { R(c, x - 1, y, 3, 60, '#8c8c94'); PF(c, [x - 10, y - 24, x - 4, y - 30, x + 4, y - 30, x + 10, y - 24, x + 10, y - 16, x + 4, y - 10, x - 4, y - 10, x - 10, y - 16], '#c81818'); TX(c, 'STOP', x - 15, y - 28, '#f8f8f0', 16, null); }
function doll(c, x, y) { E(c, x, y - 18, 5, 5, '#e8c8a8'); R(c, x - 5, y - 13, 10, 14, '#a8584c'); L(c, x - 5, y - 10, x - 9, y - 2, '#e8c8a8', 2); L(c, x + 5, y - 10, x + 9, y - 2, '#e8c8a8', 2); L(c, x - 3, y + 1, x - 3, y + 8, '#e8c8a8', 2); L(c, x + 3, y + 1, x + 3, y + 8, '#e8c8a8', 2); L(c, x - 10, y - 4, x + 10, y - 4, '#c8a870'); L(c, x - 5, y + 5, x + 5, y + 5, '#c8a870'); }

/* ---- cast (Wichita) ---- */
const RADER = { id: 'rd', spk: 'rader', top: 'jacket', coat: '#5c5448', shirt: '#e8e4d8', tie: '#3c3c5c', pants: '#3c3c44', shoes: '#1c1c1c', skin: '#e0c0a0', hair: '#6c6458', hairStyle: 'side', glasses: true };
const RADER_UNI = { id: 'ru', spk: 'rader', top: 'uniform', coat: '#8c7c5c', pants: '#5c5444', shoes: '#2c2420', skin: '#e0c0a0', hair: '#6c6458', hat: 'cap', hatCol: '#5c5444', glasses: true };
const RADER_JAIL = { id: 'rj', spk: 'rader', top: 'shirt', coat: '#c86c2c', pants: '#c86c2c', shoes: '#3c3c3c', skin: '#e0c0a0', hair: '#a8a8a0', hairStyle: 'side', glasses: true };
const WIFE = { id: 'wf', top: 'dress', coat: '#7c6c8c', skin: '#ecd0b4', hair: '#8c6c4c', hairStyle: 'long' };
const KIDS = [{ id: 'k1', kid: true, top: 'tee', coat: '#5c8cc8', pants: '#3c3c44', shoes: '#2c2c2c', skin: '#ecd0b4', hair: '#8c6c4c', hairStyle: 'short' }, { id: 'k2', kid: true, top: 'dress', coat: '#c85c7c', skin: '#ecd0b4', hair: '#8c6c4c', hairStyle: 'long' }];
const KEIKAN = { id: 'kk', spk: 'keikan', top: 'uniform', coat: '#2c3444', pants: '#2c3444', shoes: '#141414', skin: '#d8ac88', hair: '#3c3028', hat: 'police', hatCol: '#1c2434' };
const SHOCHO = { id: 'sc', spk: 'shocho', top: 'uniform', coat: '#1c2434', pants: '#1c2434', shoes: '#141414', skin: '#8c5c3c', hair: '#1c1814', hairStyle: 'short' };
const DETS = ['#3c3c44', '#4c4438', '#2c3440', '#443c34'].map((col, i) => ({ id: 'dt' + i, top: 'jacket', coat: col, shirt: '#e8e4d8', tie: '#2c2c2c', pants: col, shoes: '#141414', skin: ['#e0c0a0', '#c8946c', '#e8c8a8', '#8c5c3c'][i], hair: ['#5c4c3c', '#1c1814', '#c8a86c', '#1c1814'][i], hairStyle: 'short' }));
const TOWN = ['#8c5c3c', '#5c7c9c', '#7c6c8c', '#6c8c5c', '#a87c5c', '#5c5c6c'].map((col, i) => ({ id: 'tw' + i, top: i % 2 ? 'dress' : 'jacket', coat: col, shirt: '#e8e4d8', pants: '#3c3c44', shoes: '#1c1c1c', skin: ['#e0c0a0', '#ecd0b4', '#c8946c'][i % 3], hair: ['#5c4c3c', '#c8a86c', '#1c1814'][i % 3], hairStyle: i % 2 ? 'long' : 'short' }));
const JUDGE = { id: 'jg', top: 'jacket', coat: '#141418', shirt: '#f0f0ec', tie: '#141418', pants: '#141418', shoes: '#141414', skin: '#c8946c', hair: '#1c1814', hairStyle: 'short' };

/* ---- portraits (48x48) ---- */
function raderFace(o = {}) { // Dennis Rader: receding grey-brown hair, square glasses, a thin mouth, an ordinary office face; o.dark for the horror cut; o.old in prison
  return SPR('rdF' + (o.blink || 0) + (o.dark ? 'd' : '') + (o.old ? 'o' : ''), 48, 48, c => {
    const sk = o.dark ? '#7c6c5c' : '#e0c0a0', sk2 = o.dark ? '#4c3c30' : '#b89878', hr = o.old ? '#a8a8a0' : '#6c6458';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.old ? '#c86c2c' : '#5c5448'); if (!o.old) { PF(c, [18, 37, 24, 44, 30, 37], '#e8e4d8'); L(c, 24, 40, 24, 48, '#3c3c5c', 2); }
    R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 12, 14, sk2); E(c, 23.5, 21.5, 11.5, 13.5, sk); PF(c, [12, 18, 12, 10, 16, 8, 18, 12, 30, 12, 32, 8, 36, 10, 36, 18, 34, 14, 14, 14], hr); E(c, 11.5, 22, 2, 3, sk2); E(c, 36.5, 22, 2, 3, sk2);
    L(c, 15, 16, 21, 16, hr, 2); L(c, 27, 16, 33, 16, hr, 2);
    for (const x0 of [15, 27]) { R(c, x0, 18, 7, 6, '#2c2c2c'); R(c, x0 + 1, 19, 5, 4, o.dark ? '#5c5c64' : '#d8e0e8'); if (o.blink === 2) { L(c, x0 + 1, 21, x0 + 5, 21, '#2c1c14'); continue; } R(c, x0 + 3, 20, 2, 2, '#141414'); }
    L(c, 22, 21, 26, 21, '#2c2c2c'); L(c, 24, 22, 23, 28, sk2); R(c, 21, 28, 6, 1, sk2); R(c, 20, 32, 8, 1, '#7c4c3c'); L(c, 16, 29, 17, 32, sk2); L(c, 32, 29, 31, 32, sk2);
    if (o.dark) { c.save(); c.globalAlpha = 0.25; R(c, 0, 0, 48, 48, '#0c0410'); c.restore(); }
  });
}
function keikanFace(o = {}) { return SPR('kkF' + (o.blink || 0), 48, 48, c => { const sk = '#d8ac88', sk2 = '#b08c6c'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#2c3444'); R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11, 14, sk2); E(c, 23.5, 21.5, 10.5, 13.5, sk); R(c, 11, 4, 26, 9, '#1c2434'); R(c, 9, 12, 30, 3, '#141414'); P(c, 24, 7, '#f0d060'); L(c, 15, 17, 21, 17, '#3c3028', 2); L(c, 27, 17, 33, 17, '#3c3028', 2); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 5, 21, '#1c1410'); continue; } R(c, x0, 20, 5, 3, '#f0e4d0'); R(c, x0 + 2, 20, 2, 3, '#1c1410'); } L(c, 24, 22, 23, 27, sk2); R(c, 21, 31, 6, 1, '#6c3c2c'); }); }
function shochoFace(o = {}) { return SPR('scF' + (o.blink || 0), 48, 48, c => { const sk = '#8c5c3c', sk2 = '#6c4428'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#1c2434'); PF(c, [18, 37, 24, 44, 30, 37], '#e8e4d8'); R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 12, 14, sk2); E(c, 23.5, 21.5, 11.5, 13.5, sk); PF(c, [12, 14, 13, 7, 24, 4, 35, 7, 36, 14, 32, 10, 16, 10], '#1c1814'); L(c, 15, 16, 21, 16, '#1c1814', 2); L(c, 27, 16, 33, 16, '#1c1814', 2); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#1c1410'); continue; } R(c, x0, 19, 5, 3, '#f0e4d0'); R(c, x0 + 2, 19, 2, 3, '#1c1410'); } L(c, 24, 21, 23, 27, sk2); R(c, 20, 31, 8, 2, '#4c2c1c'); R(c, 19, 29, 10, 1, '#1c1814'); }); }
const PORTRAITS = {
  rader: p => withMouth('pmrd', raderFace({ blink: p.blink }), p, 24, 32),
  keikan: p => withMouth('pmkk', keikanFace({ blink: p.blink }), p, 24, 31),
  shocho: p => withMouth('pmsc', shochoFace({ blink: p.blink }), p, 24, 31),
};
