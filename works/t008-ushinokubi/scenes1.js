/* ================= 都市伝説 #008 牛の首: helpers, places, props, cast & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1, rot: o.rot }); }
function shadow(c, st, x, y, o = {}) { blit(c, tintSpr(modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, k: 'sh' + (o.k || '') }), o.col || '#06060a', 'shd' + st.id + (o.k || '') + (o.arm || '') + (o.f == null ? -1 : o.f)), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function lampPost(c, t, x, y = 160, o = {}) { R(c, x, y - 110, 3, 110, '#4c4c54'); R(c, x - 12, y - 112, 16, 3, '#4c4c54'); glow(c, x - 6, y - 106, 40, 60, '#f8d890', 0.3 + 0.03 * Math.sin(t * 2)); R(c, x - 10, y - 109, 9, 2, '#f8f0c0'); c.save(); c.globalAlpha = 0.12; PF(c, [x - 8, y - 106, x - 50, y, x + 36, y], '#f8e8b0'); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }

/* ---- places ---- */
// an old tatami room lit by one candle (o.out: the candle is out; o.shake: the listeners tremble)
function candleRoom(c, t, o = {}) {
  R(c, 0, 0, W, H, '#1c140c'); for (let x = 0; x < W; x += 40) R(c, x, 0, 3, 120, '#140e08'); R(c, 0, 118, W, 72, '#3c3420'); for (let x = 0; x < W; x += 54) R(c, x, 118, 2, 72, '#2c2414');
  R(c, 220, 30, 70, 60, '#2c2418'); for (let i = 0; i < 3; i++) R(c, 222 + i * 23, 32, 21, 56, '#3c3424');
  if (!o.out) { const f = 1 + 0.15 * Math.sin(t * 11) + 0.1 * Math.sin(t * 7); R(c, 157, 128, 6, 16, '#e8e0c8'); E(c, 160, 122, 3 * f, 6 * f, '#f8c040'); E(c, 160, 124, 1.5, 3, '#fff8d8'); glow(c, 160, 120, 140 * f, 90 * f, '#f8a030', 0.22); }
  else { R(c, 157, 128, 6, 16, '#8c8478'); for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = 0.4 - i * 0.1; E(c, 160 + Math.sin(t * 2 + i) * 3, 116 - i * 8 - (t * 6 % 8), 2, 3, '#a8a8a8'); c.restore(); } dim(c, 0.45); }
}
// a mountain temple gate in mist
function templeGate(c, t) { VG(c, 0, 0, W, 130, ['#3c4450', '#6c7480', '#9ca4a8']); PF(c, [0, 110, 70, 50, 150, 80, 240, 40, 320, 80, 320, 130, 0, 130], '#2c3c34'); R(c, 0, 128, W, 62, '#5c5c54'); for (let i = 0; i < 8; i++) R(c, 120 - i * 6, 128 + i * 8, 80 + i * 12, 6, '#7c7c74');
  PF(c, [90, 56, 160, 36, 230, 56], '#2c2420'); R(c, 100, 56, 120, 8, '#3c2c24'); R(c, 110, 64, 10, 64, '#5c3c2c'); R(c, 200, 64, 10, 64, '#5c3c2c'); R(c, 120, 70, 80, 4, '#3c2c24');
  for (let i = 0; i < 4; i++) { c.save(); c.globalAlpha = 0.18; R(c, ((i * 97 + t * 8) % 400) - 60, 90 + i * 14, 120, 6, '#d8dce0'); c.restore(); } }
// a closed book or scroll with only its title; o.open: blank pages
function titleBook(c, x, y, o = {}) {
  if (o.open) { R(c, x - 60, y - 40, 120, 80, '#e8e0c8'); R(c, x - 1, y - 40, 2, 80, '#a8a088'); TX(c, '牛の首', x + 10, y - 34, '#2c1c14', 16, null); return; }
  R(c, x - 34, y - 46, 68, 92, '#2c1c1c'); R(c, x - 30, y - 42, 60, 84, '#3c2424'); R(c, x + 4, y - 36, 20, 70, '#e8e0c8'); for (let i = 0; i < 3; i++) TX(c, '牛の首'[i], x + 6, y - 32 + i * 20, '#2c1c14', 16, null);
}
// the mountain road with autumn leaves; o.dark dims, v scroll speed
function mountainRoad(c, t, o = {}) { const v = o.v || 0, d = o.dark || 0; VG(c, 0, 0, W, 120, ['#7c9cc8', '#a8c0d8', '#d8dcd8']); PF(c, [0, 100, 60, 50, 130, 80, 210, 40, 290, 70, 320, 60, 320, 120, 0, 120], '#5c6c4c');
  for (let i = 0; i < 14; i++) { const x = ((i * 31 - t * v * 0.5) % 434 + 434) % 434 - 40; E(c, x, 104 + (i % 3) * 6, 16, 12, ['#c8642c', '#d8a03c', '#a83c2c'][i % 3]); }
  R(c, 0, 120, W, 40, '#5c5c58'); for (let i = 0; i < 8; i++) { const x = ((i * 60 - t * v) % 480 + 480) % 480 - 60; R(c, x, 138, 26, 2, '#e8e4c8'); } R(c, 0, 160, W, 30, '#4c3c2c'); if (d) dim(c, d); }
// the dark cedar forest seen past the window
function cedars(c, t, v = 60, x0 = 0, w = W) { for (let i = 0; i < 12; i++) { const x = x0 + ((i * 34 - t * v) % (w + 40) + w + 40) % (w + 40) - 20; PF(c, [x, 120, x + 12, 20 + (i % 3) * 10, x + 24, 120], i % 2 ? '#14241c' : '#1c2c20'); } }
// a 1970s sightseeing bus, side view (x = rear, y = ground), o.stop
function bus(c, x, y, o = {}) { R(c, x, y - 52, 150, 44, '#e8e4d8'); R(c, x, y - 30, 150, 8, '#c84c2c'); for (let i = 0; i < 6; i++) R(c, x + 10 + i * 22, y - 48, 18, 14, '#5c7c9c'); R(c, x + 140, y - 48, 10, 22, '#7c9cbc'); R(c, x, y - 52, 150, 3, '#c8c4b8'); for (const wx of [x + 28, x + 118]) { E(c, wx, y - 8, 9, 9, '#141414'); E(c, wx, y - 8, 4, 4, '#8c8c8c'); } if (o.stop) R(c, x - 2, y - 26, 4, 4, '#f83c3c'); }
// inside the bus, from the front: aisle, rows of seat backs; o.back(c) draws the passengers before the seats cover them; o.dark
function busInside(c, t, o = {}) {
  R(c, 0, 0, W, H, '#4c4c50'); R(c, 0, 0, W, 14, '#2c2c30'); for (let s = 0; s < 2; s++) { const x0 = s ? 196 : 0; R(c, x0, 22, 124, 70, '#1c2c24'); cedars(c, t, o.v == null ? 60 : o.v, x0, 124); R(c, x0, 22, 124, 4, '#8c8c90'); R(c, x0, 88, 124, 4, '#8c8c90'); }
  R(c, 130, 20, 60, 100, '#5c5c60'); R(c, 0, 150, W, 40, '#3c3c40'); R(c, 140, 120, 40, 70, '#5c5454');
  if (o.back) o.back(c);
  for (let r = 0; r < 2; r++) for (const x of [66, 96, 192, 222]) { const y = 130 + r * 26, s = 1 + r * 0.15; R(c, x - 2 * s, y, 30 * s, 20, '#8c3c3c'); R(c, x - 2 * s, y, 30 * s, 4, '#a84c4c'); }
  if (o.dark) dim(c, o.dark);
}
// the driver's seat seen from behind/side: wheel, windshield with the road
function driverSeat(c, t, o = {}) { R(c, 0, 0, W, H, '#3c3c40'); R(c, 20, 10, 280, 90, '#5c6c7c'); mountainRoadMini(c, t, o.v || 0); R(c, 20, 96, 280, 8, '#2c2c30'); R(c, 0, 104, W, 86, '#2c2c30'); }
function mountainRoadMini(c, t, v) { c.save(); c.beginPath(); c.rect(20, 10, 280, 86); c.clip(); VG(c, 20, 10, 280, 50, ['#7c9cc8', '#a8c0d8', '#c8d0d0']); PF(c, [20, 70, 100, 30, 190, 56, 300, 36, 300, 96, 20, 96], '#2c4030'); PF(c, [130, 96, 156, 50, 164, 50, 190, 96], '#5c5c58'); R(c, 159, 60 + (t * v % 30), 2, 10, '#e8e4c8'); c.restore(); }
function wheel(c, x, y, a = 0) { E(c, x, y, 26, 26, '#1c1c1c'); E(c, x, y, 21, 21, '#3c3c40'); L(c, x - Math.cos(a) * 21, y - Math.sin(a) * 21, x + Math.cos(a) * 21, y + Math.sin(a) * 21, '#1c1c1c', 3); }
// a newspaper / magazine page (title, sub, date) drawn flat
function pageSpr(id, head, sub, date, col = '#f0ece0') { return cached('pg' + id, () => { const [cv, x] = mk(140, 100); R(x, 0, 0, 140, 100, col); TX(x, date || '', 6, 4, '#3c3c3c', 16, null); R(x, 4, 22, 132, 1, '#3c3c3c'); TX(x, head, 6, 28, '#8c1c1c', 16, null); TX(x, sub || '', 6, 48, '#2c2c2c', 16, null); for (let r = 0; r < 5; r++) R(x, 6, 72 + r * 5, 128 - (r * 13) % 30, 2, '#8c8c8c'); return cv; }); }
// an old CRT monitor with a message board (lines of posts; o.hl highlights one line)
function monitor(c, t, lines, o = {}) { R(c, 0, 0, W, H, '#1c1c24'); R(c, 50, 14, 220, 150, '#c8c4b4'); R(c, 62, 24, 196, 124, '#f0f0e8'); R(c, 130, 164, 60, 10, '#a8a498'); R(c, 100, 174, 120, 8, '#c8c4b4');
  lines.forEach((s, i) => { if (o.n != null && i >= o.n) return; TX(c, s, 68, 40 + i * 22, i === o.hl ? '#c81818' : '#1c1c1c', 16, null); }); if (Math.floor(t * 2) % 2) R(c, 68, 40 + Math.min(lines.length, o.n == null ? lines.length : o.n) * 22, 8, 14, '#1c1c1c'); }
// a lone night road with a street lamp
function nightRoad(c, t, o = {}) { VG(c, 0, 0, W, 130, ['#04040c', '#0c0c1c', '#141428']); PF(c, [0, 120, 80, 96, 170, 108, 260, 90, 320, 104, 320, 132, 0, 132], '#0c0c14'); R(c, 0, 130, W, 60, '#1c1c24'); R(c, 0, 158, W, 2, '#3c3c44'); lampPost(c, t, 220, 160); }

/* ---- the cow's head: a black silhouette with two dim lights for eyes (it has no true shape) ---- */
function cowHeadSpr(o = {}) { return SPR('cowH' + (o.dark ? 'd' : '') + (o.eyes ? 'e' : ''), 48, 48, c => {
  const b = o.dark ? '#0c0808' : '#1c1414', h = o.dark ? '#2c1c1c' : '#3c2c2c';
  PF(c, [4, 10, 12, 16, 16, 12], '#5c5048'); PF(c, [44, 10, 36, 16, 32, 12], '#5c5048'); // horns
  E(c, 24, 22, 13, 12, b); R(c, 14, 22, 20, 18, b); E(c, 24, 40, 10, 7, h); E(c, 8, 20, 6, 3, b); E(c, 40, 20, 6, 3, b);
  E(c, 20, 41, 1.5, 1.5, '#0c0404'); E(c, 28, 41, 1.5, 1.5, '#0c0404');
  if (o.eyes) { R(c, 16, 22, 3, 2, '#f8d0a0'); R(c, 29, 22, 3, 2, '#f8d0a0'); } }); }
function cowHead(c, t, x, y, o = {}) { c.save(); c.globalAlpha = o.a == null ? 1 : o.a; blit(c, cowHeadSpr({ dark: o.dark, eyes: o.eyes !== false }), x, y, 24, 24, { s: o.s || 3 }); c.restore(); if (o.eyes !== false) { const g = 0.3 + 0.2 * Math.sin(t * 5); glow(c, x - 6 * (o.s || 3), y - 1 * (o.s || 3), 10, 6, '#f86030', g * (o.a == null ? 1 : o.a)); glow(c, x + 6 * (o.s || 3), y - 1 * (o.s || 3), 10, 6, '#f86030', g * (o.a == null ? 1 : o.a)); } }

/* ---- cast ---- */
const SENSEI = { id: 'se', top: 'jacket', coat: '#5c5444', shirt: '#e8e4d8', tie: '#3c2c2c', pants: '#3c3c34', shoes: '#2c2018', skin: '#d8b08c', hair: '#1c1814', hairStyle: 'side', glasses: true };
const DRIVER = { id: 'dr', top: 'uniform', coat: '#2c3c5c', pants: '#2c3c5c', shoes: '#141414', skin: '#d0a07c', hair: '#1c1814', hat: 'police', hatCol: '#2c3c5c' };
const KIDS = ['#c8642c', '#3c6c9c', '#d8a03c', '#6c8c4c', '#a83c5c', '#5c5c9c'].map((col, i) => ({ id: 'kd' + i, kid: true, top: i % 2 ? 'dress' : 'shirt', coat: col, pants: '#3c3c44', shoes: '#141414', skin: ['#f0c8a8', '#e8c4a0'][i % 2], hair: '#1c1418', hairStyle: ['short', 'long', 'side', 'long', 'short', 'long'][i] }));
const KATARI = { id: 'kt', top: 'jacket', coat: '#3c3430', shirt: '#5c5048', pants: '#2c2824', shoes: '#1c1814', skin: '#c8a080', hair: '#a8a8a0', hairStyle: 'short' };
const MONK = { id: 'mk', top: 'jacket', coat: '#1c1c20', shirt: '#e8e4d8', pants: '#1c1c20', shoes: '#2c2018', skin: '#c8a080', hair: '#c8a080', hairStyle: 'short' };
const LISTENERS = ['#5c4c3c', '#4c5c4c', '#5c5c6c', '#6c4c4c'].map((col, i) => ({ id: 'ls' + i, top: i % 2 ? 'dress' : 'jacket', coat: col, shirt: '#d8d0c0', pants: '#3c3830', shoes: '#2c2018', skin: '#d0a07c', hair: '#1c1814', hairStyle: i % 2 ? 'long' : 'short' }));
const WRITER = { id: 'wr', top: 'jacket', coat: '#4c4c54', shirt: '#e8e4d8', tie: '#5c2c2c', pants: '#3c3c44', shoes: '#141414', skin: '#d8b08c', hair: '#1c1814', hairStyle: 'side', glasses: true };

/* ---- portraits (48x48) ---- */
function senseiFace(o = {}) { // the teacher: side-parted black hair, thick glasses, a cheerful mouth turning pale (o.pale)
  return SPR('seF' + (o.blink || 0) + (o.pale ? 'p' : ''), 48, 48, c => { const sk = o.pale ? '#c8b8a8' : '#d8b08c', sk2 = '#b08c6c'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#5c5444'); PF(c, [18, 37, 24, 44, 30, 37], '#e8e4d8'); L(c, 24, 40, 24, 48, '#3c2c2c', 2); R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11.5, 14, sk2); E(c, 23.5, 21.5, 11, 13.5, sk);
    PF(c, [12, 17, 12, 8, 18, 5, 32, 5, 36, 10, 36, 16, 30, 9, 16, 11], '#1c1814'); for (const x0 of [15, 27]) { R(c, x0, 17, 7, 6, '#1c1c1c'); R(c, x0 + 1, 18, 5, 4, '#d8e0e8'); if (o.blink === 2) { L(c, x0 + 1, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0 + 3, 19, 2, 2, '#141414'); }
    L(c, 22, 20, 26, 20, '#1c1c1c'); L(c, 24, 22, 23, 27, sk2); R(c, 20, 31, 8, 1, '#6c3c2c'); });
}
const PORTRAITS = { sensei: p => withMouth('pmse', senseiFace({ blink: p.blink }), p, 24, 31) };
