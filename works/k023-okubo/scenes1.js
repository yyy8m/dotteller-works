/* ================= 記録 #023 大久保清: helpers, places, props, cast & portraits ================= */
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
// Gunma country road: the Haruna-like hills, fields, telegraph poles; o.dusk / o.night; o.v scroll speed
function countryRoad(c, t, o = {}) {
  const n = !!o.night, d = !!o.dusk, v = o.v || 0;
  VG(c, 0, 0, W, 120, n ? ['#04040c', '#0c0c1c', '#14142a'] : d ? ['#5c3c5c', '#c86c4c', '#f8b860'] : ['#7caad8', '#a8c8e0', '#d8e4e8']);
  PF(c, [0, 104, 40, 74, 90, 58, 130, 70, 170, 48, 220, 66, 270, 56, 320, 78, 320, 112, 0, 112], n ? '#0c0c14' : d ? '#4c3048' : '#6c8c7c');
  PF(c, [0, 112, 60, 92, 140, 100, 200, 88, 260, 98, 320, 92, 320, 118, 0, 118], n ? '#101410' : d ? '#3c2c30' : '#5c7c4c');
  R(c, 0, 116, W, 22, n ? '#141810' : d ? '#5c4c30' : '#8cac5c'); for (let i = 0; i < 12; i++) { const x = ((i * 34 - t * v * 0.5) % 408 + 408) % 408 - 44; R(c, x, 120, 20, 2, n ? '#1c2418' : d ? '#6c5c38' : '#7c9c4c'); }
  R(c, 0, 138, W, 30, n ? '#1c1c20' : '#5c5c5c'); for (let i = 0; i < 8; i++) { const x = ((i * 60 - t * v) % 480 + 480) % 480 - 60; R(c, x, 152, 26, 2, n ? '#5c5c4c' : '#e8e4c8'); }
  for (let i = 0; i < 4; i++) { const x = ((i * 110 - t * v * 0.8) % 440 + 440) % 440 - 30; R(c, x, 70, 3, 68, n ? '#141414' : '#4c3c2c'); R(c, x - 8, 74, 19, 2, n ? '#141414' : '#4c3c2c'); }
}
// the 1971 white coupe (72x26 at x = rear-left, y = ground); o.flip faces left; o.lights
function coupe(c, x, y, o = {}) {
  c.save(); if (o.flip) { c.translate(x * 2 + 72, 0); c.scale(-1, 1); }
  R(c, x, y - 16, 72, 11, '#f0f0ec'); PF(c, [x + 14, y - 16, x + 26, y - 27, x + 50, y - 27, x + 62, y - 16], '#f0f0ec'); R(c, x + 28, y - 25, 10, 8, '#5c7c9c'); PF(c, [x + 40, y - 25, x + 49, y - 25, x + 57, y - 17, x + 40, y - 17], '#5c7c9c');
  R(c, x, y - 7, 72, 2, '#a8a8a8'); R(c, x + 68, y - 14, 4, 3, o.lights ? '#f8f0a0' : '#e8e4c8'); R(c, x, y - 14, 3, 3, '#c83c3c');
  for (const wx of [x + 14, x + 58]) { E(c, wx, y - 4, 6, 6, '#141414'); E(c, wx, y - 4, 2.5, 2.5, '#a8a8b0'); }
  if (o.lights) glow(c, x + 84, y - 12, 26, 8, '#f8f0a0', 0.35);
  c.restore();
}
// an ordinary 1970s car of the search party (col)
function sedan(c, x, y, col = '#5c6c7c', o = {}) { R(c, x, y - 15, 64, 10, col); R(c, x + 12, y - 25, 38, 10, shadeCol(col, 0.85)); R(c, x + 15, y - 23, 14, 7, '#8cacc8'); R(c, x + 32, y - 23, 14, 7, '#8cacc8'); for (const wx of [x + 12, x + 52]) E(c, wx, y - 4, 6, 6, '#141414'); if (o.lights) { R(c, x + 61, y - 13, 3, 3, '#f8f0a0'); glow(c, x + 72, y - 12, 20, 7, '#f8f0a0', 0.3); } }
function bicycle(c, x, y, col = '#5c8cc8') { for (const wx of [x, x + 26]) { E(c, wx, y - 8, 8, 8, '#2c2c2c'); E(c, wx, y - 8, 6.5, 6.5, '#a8a8a8'); } L(c, x, y - 8, x + 10, y - 20, col, 2); L(c, x + 10, y - 20, x + 26, y - 8, col, 2); L(c, x + 8, y - 8, x + 22, y - 20, col, 2); L(c, x + 22, y - 20, x + 26, y - 8, col, 2); R(c, x + 6, y - 23, 8, 3, '#2c2c2c'); L(c, x + 22, y - 20, x + 24, y - 26, '#2c2c2c', 2); R(c, x + 20, y - 27, 8, 2, '#2c2c2c'); }
// the village of 1935: thatched farmhouses, a mulberry field
function village(c, t) { VG(c, 0, 0, W, 120, ['#8cb0d0', '#b8cce0', '#e0e4d8']); PF(c, [0, 100, 70, 62, 150, 84, 230, 56, 320, 90, 320, 120, 0, 120], '#6c8c6c'); R(c, 0, 116, W, 74, '#8c7c54'); for (let i = 0; i < 3; i++) { const x = 30 + i * 100; PF(c, [x - 6, 92, x + 30, 62, x + 66, 92], '#a8905c'); R(c, x, 92, 60, 30, '#6c5c44'); R(c, x + 22, 102, 16, 20, '#2c241c'); } for (let i = 0; i < 14; i++) E(c, 12 + i * 22, 128, 7, 5, '#5c7c3c'); }
// the radio repair shop of 1953 (o.empty)
function radioShop(c, t, o = {}) { VG(c, 0, 0, W, 120, ['#a8c0d8', '#c8d4dc', '#e0e0d8']); R(c, 0, 120, W, 70, '#8c8478'); R(c, 60, 36, 200, 84, '#8c7c64'); R(c, 60, 40, 200, 20, '#4c3c2c'); TX(c, '清光電器商会', 112, 42, '#f8f0d8', 16, null); R(c, 80, 64, 160, 50, '#2c2c30'); for (let i = 0; i < 4; i++) { R(c, 90 + i * 38, 78, 26, 18, '#6c4c30'); E(c, 98 + i * 38, 87, 4, 4, '#c8a060'); R(c, 104 + i * 38, 82, 8, 8, '#d8c8a8'); } if (o.sign) { R(c, 130, 68, 60, 20, '#e8e4d8'); TX(c, '閉店', 144, 70, '#c81818', 16, null); } }
// a small milk shop with crates of bottles
function milkShop(c, t) { VG(c, 0, 0, W, 120, ['#a8c0d8', '#c8d4dc', '#e0e0d8']); R(c, 0, 120, W, 70, '#8c8478'); R(c, 70, 50, 180, 70, '#c8b898'); R(c, 70, 44, 180, 20, '#3c5c8c'); TX(c, '牛乳', 144, 46, '#f8f8f0', 16, null); for (let i = 0; i < 3; i++) { R(c, 90 + i * 50, 100, 40, 20, '#c8a040'); for (let k = 0; k < 4; k++) { R(c, 93 + i * 50 + k * 9, 90, 6, 12, '#f8f8f8'); R(c, 93 + i * 50 + k * 9, 88, 6, 3, '#e8c848'); } } }
// the prison wall and gate (o.open)
function prison(c, t, o = {}) { VG(c, 0, 0, W, 120, ['#8ca0b8', '#b0c0cc', '#d0d4d4']); R(c, 0, 50, W, 90, '#8c8c84'); for (let x = 0; x < W; x += 20) R(c, x, 50, 1, 90, '#7c7c74'); R(c, 0, 46, W, 6, '#6c6c64'); R(c, 120, 64, 80, 76, '#3c3c40'); if (o.open) R(c, 130, 70, 60, 70, '#d8dcd8'); const s = textSpr(o.name || '刑務所', 16, '#2c2c2c'); R(c, 160 - s.width / 2 - 4, 44, s.width + 8, 20, '#d8d8cc'); TX(c, o.name || '刑務所', 160 - s.width / 2, 46, '#2c2c2c', 16, null); R(c, 0, 138, W, 52, '#6c6c64'); }
function policeStation(c, t, o = {}) { VG(c, 0, 0, W, 120, o.night ? ['#04040c', '#0c0c1c', '#141428'] : ['#a8c0d8', '#c8d4dc', '#e0e0d8']); R(c, 40, 34, 240, 104, o.night ? '#3c3c44' : '#b8b4a8'); for (let i = 0; i < 5; i++) for (let r = 0; r < 2; r++) R(c, 56 + i * 46, 46 + r * 30, 26, 18, o.night ? (i === 2 && r === 1 ? '#f8e8a0' : '#1c1c24') : '#5c7c9c'); R(c, 140, 104, 40, 34, '#2c2c30'); const s = textSpr(o.name || '警察署', 16, '#1c1c1c'); R(c, 186, 104, s.width + 8, 20, '#e8e4d8'); TX(c, o.name || '警察署', 190, 106, '#1c1c1c', 16, null); E(c, 166, 98, 3, 3, '#c81818'); R(c, 0, 138, W, 52, o.night ? '#1c1c20' : '#7c7c74'); }
// the interrogation room: a desk, a bare bulb, a barred window
function interro(c, t, o = {}) { R(c, 0, 0, W, H, '#5c5448'); R(c, 0, 0, W, 10, '#3c3428'); R(c, 230, 30, 50, 40, '#2c3448'); for (let i = 0; i < 4; i++) R(c, 236 + i * 12, 30, 2, 40, '#1c1c1c'); L(c, 160, 0, 160, 24, '#2c2c2c'); E(c, 160, 28, 6, 6, '#f8e8b0'); glow(c, 160, 40, 90, 70, '#f8e8b0', 0.2 + 0.03 * Math.sin(t * 3)); R(c, 0, 140, W, 50, '#3c342c'); R(c, 100, 118, 120, 10, '#6c4c30'); R(c, 106, 128, 6, 22, '#4c3420'); R(c, 208, 128, 6, 22, '#4c3420'); }
// a sheet of vertical poem lines (Japanese manuscript paper look)
function poem(c, x, y, w, h, o = {}) { R(c, x, y, w, h, '#f0ece0'); R(c, x, y, w, 2, '#c8a870'); for (let i = 0; i < Math.floor((w - 8) / 8); i++) { const len = h - 16 - ((i * 7) % 3) * 10; R(c, x + w - 8 - i * 8, y + 8, 2, Math.max(10, len), o.col || '#3c3c5c'); } if (o.title) plate(c, x + 4, y - 22, o.title, '#f8e8b0'); }
// the night dig: lanterns, spades, police around a covered pit (never a body)
function nightDig(c, t, o = {}) { R(c, 0, 0, W, H, '#06060c'); R(c, 0, 120, W, 70, '#141410'); PF(c, [0, 96, 80, 70, 170, 88, 260, 64, 320, 90, 320, 122, 0, 122], '#0c0c10'); ER(c, 160, 134, 50, 8, '#2c2418'); R(c, 120, 126, 80, 6, '#3c4c5c'); for (const lx of [90, 230]) { R(c, lx, 106, 2, 30, '#3c3c3c'); E(c, lx + 1, 104, 4, 5, '#f8d880'); glow(c, lx + 1, 106, 40, 30, '#f8d880', 0.35 + 0.05 * Math.sin(t * 4 + lx)); } for (let i = 0; i < 3; i++) person(c, POLICE, 110 + i * 50, 150, { k: 'nd' + i, flip: i === 2 }); }
// eight small white flowers on the roadside (the eight women, remembered)
function flowers8(c, t, x, y) { for (let i = 0; i < 8; i++) { const fx = x + (i % 4) * 22, fy = y + Math.floor(i / 4) * 14; L(c, fx, fy + 4, fx, fy + 14, '#3c6c3c'); for (let k = 0; k < 6; k++) E(c, fx + Math.cos(k) * 3, fy + Math.sin(k) * 3, 2, 2, '#f4f0e8'); E(c, fx, fy, 1.5, 1.5, '#e8d870'); } }
function odo(c, x, y, km) { R(c, x, y, 90, 30, '#1c1c1c'); R(c, x + 4, y + 4, 82, 22, '#0c0c0c'); TX(c, String(km).padStart(5, '0') + 'km', x + 8, y + 6, '#f8f0c0', 16, null); }

/* ---- cast ---- */
const OKUBO = { id: 'ok', top: 'jacket', coat: '#8c6c4c', shirt: '#e8e0d0', tie: '#5c2c2c', pants: '#4c4038', shoes: '#2c2018', skin: '#e0c0a0', hair: '#1c1814', hairStyle: 'side' };
const OKUBO_KID = { id: 'okk', kid: true, top: 'shirt', coat: '#c8c0a8', pants: '#5c4c3c', shoes: '#2c2018', skin: '#e0c0a0', hair: '#1c1814', hairStyle: 'short' };
const OKUBO_JAIL = { id: 'okj', top: 'shirt', coat: '#8c8c84', pants: '#6c6c64', shoes: '#3c3c3c', skin: '#d8b898', hair: '#1c1814', hairStyle: 'short' };
const WIFE = { id: 'wf', top: 'dress', coat: '#7c8cac', skin: '#ecd0b4', hair: '#1c1814', hairStyle: 'long' };
const FATHER = { id: 'fa', top: 'shirt', coat: '#8c7454', pants: '#5c4c3c', shoes: '#2c2018', skin: '#c8946c', hair: '#2c2824', hairStyle: 'short' };
const MOTHER = { id: 'mo', top: 'dress', coat: '#8c6c7c', skin: '#e8c8a8', hair: '#2c2018', hairStyle: 'long' };
const ANI = { id: 'an', top: 'jacket', coat: '#4c5c6c', shirt: '#e8e4d8', pants: '#3c3c44', shoes: '#1c1c1c', skin: '#d0a07c', hair: '#1c1814', hairStyle: 'short' };
const SEARCHERS = ['#6c5c4c', '#4c6c5c', '#5c5c6c', '#6c4c4c'].map((col, i) => ({ id: 'sr' + i, top: i % 2 ? 'shirt' : 'jacket', coat: col, shirt: '#e8e4d8', pants: '#3c3c44', shoes: '#1c1c1c', skin: ['#d0a07c', '#c8946c'][i % 2], hair: '#1c1814', hairStyle: 'short', hat: i === 2 ? 'cap' : null, hatCol: '#3c3c3c' }));
const KEIBU = { id: 'kb', top: 'jacket', coat: '#3c3c44', shirt: '#e8e4d8', tie: '#2c2c3c', pants: '#3c3c44', shoes: '#141414', skin: '#c8946c', hair: '#3c3834', hairStyle: 'short', glasses: true };
const JUDGE = { id: 'jg', top: 'jacket', coat: '#141418', shirt: '#f0f0ec', tie: '#141418', pants: '#141418', shoes: '#141414', skin: '#d8b08c', hair: '#5c5c58', hairStyle: 'side', glasses: true };
const BENGO = { id: 'bg', top: 'jacket', coat: '#2c2c34', shirt: '#e8e4d8', tie: '#5c4c2c', pants: '#2c2c34', shoes: '#141414', skin: '#d8b08c', hair: '#8c8c84', hairStyle: 'side' };
const CLASSMATES = ['#8c7c5c', '#6c7c8c', '#7c6c5c'].map((col, i) => ({ id: 'cm' + i, kid: true, top: 'shirt', coat: col, pants: '#4c4438', shoes: '#2c2018', skin: '#d8b090', hair: '#1c1814', hairStyle: 'short' }));

/* ---- portraits (48x48) ---- */
function okuboFace(o = {}) { // Okubo at 36: slicked side-parted hair, thick brows, narrow watchful eyes, a thin smile; o.dark for the horror cut
  return SPR('okF' + (o.blink || 0) + (o.dark ? 'd' : '') + (o.jail ? 'j' : ''), 48, 48, c => {
    const sk = o.dark ? '#8c7464' : '#e0c0a0', sk2 = o.dark ? '#5c4838' : '#b89878';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.jail ? '#8c8c84' : '#8c6c4c'); if (!o.jail) { PF(c, [18, 37, 24, 44, 30, 37], '#e8e0d0'); L(c, 24, 40, 24, 48, '#5c2c2c', 2); }
    R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11.5, 14, sk2); E(c, 23.5, 21.5, 11, 13.5, sk);
    PF(c, [12, 18, 12, 9, 18, 5, 32, 5, 37, 10, 36, 18, 33, 11, 24, 9, 16, 12], '#141210'); L(c, 18, 6, 30, 6, '#3c3834');
    L(c, 15, 16, 21, 15, '#141210', 2); L(c, 27, 15, 33, 16, '#141210', 2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f0e8dc'); R(c, x0 + 2, 19, 2, 3, '#141010'); L(c, x0, 18, x0 + 5, 18, '#2c2420'); }
    L(c, 24, 21, 23, 27, sk2); R(c, 21, 27, 6, 1, sk2); L(c, 20, 31, 27, 31, '#7c4c3c'); P(c, 28, 30, '#7c4c3c');
    if (o.dark) { c.save(); c.globalAlpha = 0.25; R(c, 0, 0, 48, 48, '#0c0410'); c.restore(); }
  });
}
function judgeFace(o = {}) { // the presiding judge: grey side-parted hair, glasses, a black robe
  return SPR('jgF' + (o.blink || 0), 48, 48, c => {
    const sk = '#d8b08c', sk2 = '#b08c6c'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#141418'); PF(c, [18, 37, 24, 44, 30, 37], '#f0f0ec');
    R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11.5, 14, sk2); E(c, 23.5, 21.5, 11, 13.5, sk); PF(c, [12, 17, 12, 9, 18, 6, 32, 6, 36, 10, 36, 17, 32, 11, 16, 12], '#7c7c78');
    L(c, 15, 15, 21, 15, '#5c5c58', 2); L(c, 27, 15, 33, 15, '#5c5c58', 2); for (const x0 of [15, 27]) { R(c, x0, 17, 7, 6, '#2c2c2c'); R(c, x0 + 1, 18, 5, 4, '#d8e0e8'); if (o.blink === 2) { L(c, x0 + 1, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0 + 3, 19, 2, 2, '#141414'); }
    L(c, 22, 20, 26, 20, '#2c2c2c'); L(c, 24, 22, 23, 27, sk2); R(c, 21, 27, 6, 1, sk2); R(c, 20, 31, 8, 1, '#6c3c2c'); L(c, 17, 29, 18, 32, sk2); L(c, 31, 29, 30, 32, sk2);
  });
}
const PORTRAITS = {
  okubo: p => withMouth('pmok', okuboFace({ blink: p.blink, jail: true }), p, 24, 31),
  judge: p => withMouth('pmjg', judgeFace({ blink: p.blink }), p, 24, 31),
};
