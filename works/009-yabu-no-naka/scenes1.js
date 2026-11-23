/* ================= 文庫 #009 藪の中: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { x = Math.max(x, 40); const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function robe(c, st, x, y, o = {}) {
  blit(c, robeFig(st, { f: o.f, pose: o.pose, arm: o.arm, expr: o.expr, blink: o.blink, k: o.k }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1, rot: o.rot });
  if (o.rot) return; const top = o.pose === 'sit' ? 18 : o.pose === 'kneel' ? 16 : 0, hy = y - 46 + top + (o.pose === 'bow' ? 10 : 0);
  if (st.eboshi) PF(c, [x - 5, hy - 5, x + 5, hy - 5, x + 3, hy - 16, x - 2, hy - 14], st.eboshi);
  if (st.stubble) { for (let i = 0; i < 5; i++) P(c, x - 3 + i * 1.5, hy + 5, st.stubble); }
  if (st.wild) { L(c, x - 6, hy - 3, x - 9, hy - 1, st.hair); L(c, x + 6, hy - 3, x + 9, hy - 2, st.hair); L(c, x - 5, hy - 6, x - 8, hy - 7, st.hair); L(c, x + 5, hy - 6, x + 8, hy - 8, st.hair); }
  if (st.kasa && !o.noKasa) { E(c, x, hy - 7, 13, 3, st.kasa); E(c, x, hy - 9, 5, 3, st.kasa); if (st.veil) { c.save(); c.globalAlpha = o.lift ? 0.25 : 0.6; for (let i = -12; i <= 12; i += 2) L(c, x + i, hy - 5, x + i * 1.05, hy + 14, st.veil); c.restore(); } }
}
// the dead man lying among the leaves (no wound shown; the leaves around are stained dark)
function corpse(c, x, y, t, o = {}) {
  if (o.blood !== false) { E(c, x + 4, y - 2, 26, 6, '#4c1414'); E(c, x + 2, y - 3, 18, 4, '#6c1c1c'); }
  robe(c, TAKEHIRO, x, y, { k: 'cp', pose: 'sit', blink: 2, rot: -1.57 });
  if (o.fly) { const a = t * 6; P(c, x + 6 + Math.cos(a) * 5, y - 10 + Math.sin(a * 1.3) * 3, '#141414'); }
}
function horse(c, x, y, t, o = {}) { // a pale cream (tsukige) horse, side view, grazing or walking
  const g = o.graze ? 1 : 0, b = o.walk ? Math.round(Math.sin(t * 8)) : 0, col = '#e8dcb8', col2 = '#c8b890';
  for (let i = 0; i < 4; i++) { const sw = o.walk ? Math.sin(t * 8 + i * 1.6) * 3 : 0; R(c, x - 18 + i * 10 + sw, y - 14, 3, 14, col2); R(c, x - 18 + i * 10 + sw, y - 1, 3, 2, '#3c3028'); }
  E(c, x, y - 20 + b, 22, 9, col); E(c, x - 2, y - 17 + b, 18, 6, col2);
  if (g) { L(c, x + 18, y - 22 + b, x + 26, y - 6, col, 7); E(c, x + 28, y - 4, 5, 3, col); } else { L(c, x + 18, y - 22 + b, x + 26, y - 38 + b, col, 7); E(c, x + 30, y - 38 + b, 7, 4, col); P(c, x + 29, y - 40 + b, '#141414'); }
  L(c, x + 16, y - 28 + b, x + (g ? 24 : 22), y - (g ? 12 : 40) + b, '#f4f0e0', 2); L(c, x - 22, y - 22 + b, x - 30, y - 8 + b + Math.sin(t * 3) * 2, '#f4f0e0', 2);
  if (o.saddle) { R(c, x - 8, y - 30 + b, 16, 4, '#8c2c2c'); }
}
function knife(c, x, y, a = -0.8, glint = 0) { L(c, x, y, x + Math.cos(a) * 12, y + Math.sin(a) * 12, '#e0e4ec', 2); L(c, x, y, x - Math.cos(a) * 5, y - Math.sin(a) * 5, '#5c3c24', 2); if (glint > 0) { const gx = x + Math.cos(a) * 10, gy = y + Math.sin(a) * 10; c.save(); c.globalAlpha = glint; L(c, gx - 5, gy, gx + 5, gy, '#ffffff'); L(c, gx, gy - 5, gx, gy + 5, '#ffffff'); c.restore(); } }
function ropes(c, x, y, n = 4) { for (let i = 0; i < n; i++) L(c, x - 10, y + i * 5, x + 10, y + 2 + i * 5, '#e8c888', 2); }
function blackFlash(c, t, t0, col = '#000000', len = 0.5) { if (t > t0 && t < t0 + len) dim(c, 1 - (t - t0) / len, col); }

/* ---- cast (Heian period) ---- */
const TAKEHIRO = { id: 'th', spk: 'takehiro', robe: '#5c84ac', robe2: '#4c6c94', trim: '#d8e0e8', sash: '#2c3c54', skin: '#e0c0a0', skin2: '#b89878', hair: '#141418', eboshi: '#141418' };
const MASAGO = { id: 'ms', spk: 'masago', robe: '#a85c84', robe2: '#5c7c4c', trim: '#f0e0e8', sash: '#c8a848', skin: '#ecd0b8', skin2: '#c8a890', hair: '#0c0c10', female: true };
const MASAGO_KASA = Object.assign({}, MASAGO, { id: 'mk', kasa: '#c8b080', veil: '#e8e0d8' });
const TAJOU = { id: 'tj', spk: 'tajou', robe: '#242c4c', robe2: '#1c2440', trim: '#8c8cac', sash: '#5c2c1c', skin: '#c89468', skin2: '#a07048', hair: '#141010', wild: true, stubble: '#3c2c20' };
const KIKORI = { id: 'kk', spk: 'kikori', robe: '#6c5c44', robe2: '#5c4c34', trim: '#a89c84', sash: '#3c3024', skin: '#c89c74', skin2: '#a07c58', hair: '#2c241c', hat: 'bun' };
const HOUSHI = { id: 'hs', spk: 'houshi', robe: '#2c2c34', robe2: '#1c1c24', trim: '#a8844c', sash: '#a8844c', skin: '#e0c0a0', skin2: '#b89878', hair: '#d8b898' };
const HOUMEN = { id: 'hm', spk: 'houmen', robe: '#6c3c2c', robe2: '#5c2c1c', trim: '#c8b8a8', sash: '#2c1c14', skin: '#c8946c', skin2: '#a0704c', hair: '#141010', hat: 'cap', hatCol: '#141418' };
const OUNA = { id: 'on', spk: 'ouna', robe: '#5c5048', robe2: '#4c4038', trim: '#a89c8c', sash: '#2c2420', hair: '#c8c8c0', female: true, old: true };
const KEBII = { id: 'kb', robe: '#1c1c2c', robe2: '#14141c', trim: '#c8c0b0', sash: '#5c4c3c', skin: '#e0c0a0', skin2: '#b89878', hair: '#141418', eboshi: '#141418' };
const MIKO = { id: 'mi', robe: '#f4f0e8', robe2: '#c82c2c', trim: '#f8f8f0', sash: '#c82c2c', skin: '#f0d8c4', skin2: '#c8b0a0', hair: '#0c0c10', female: true };
const GHOST = { id: 'gh', spk: 'takehiro', robe: '#6c8cb4', robe2: '#5c7ca4', trim: '#c8d8f0', sash: '#3c4c6c', skin: '#c8d8e8', skin2: '#a8b8c8', hair: '#1c2434', eboshi: '#1c2434' };

/* ---- places ---- */
// the grove: bamboo with thin cedars, slanting light, drifting leaves (o.dark: dusk/dim; o.red: memory tint)
function grove(c, t, o = {}) {
  VG(c, 0, 0, W, 130, o.dark ? ['#0c140c', '#14201c', '#1c2c24'] : ['#4c6c3c', '#7c9c5c', '#a8bc7c']);
  for (let i = 0; i < 14; i++) { const x = (i * 29 + 7) % W, sw = Math.sin(t * 0.7 + i) * 1.5; R(c, x + sw, 0, 4, 140, o.dark ? '#1c3020' : '#5c8c3c'); for (let k = 0; k < 6; k++) R(c, x + sw, 10 + k * 22, 4, 1, o.dark ? '#14241c' : '#3c6c2c'); for (let k = 0; k < 3; k++) PF(c, [x + sw + 3, 20 + k * 30, x + sw + 16, 14 + k * 30, x + sw + 4, 24 + k * 30], o.dark ? '#24402c' : '#7cac4c'); }
  for (const x of [60, 200, 280]) { R(c, x, 0, 10, 140, o.dark ? '#2c2018' : '#5c4030'); R(c, x + 2, 0, 2, 140, o.dark ? '#3c2c20' : '#7c5c40'); }
  if (!o.dark) for (let i = 0; i < 4; i++) { c.save(); c.globalAlpha = 0.12 + 0.05 * Math.sin(t + i); PF(c, [40 + i * 70, 0, 60 + i * 70, 0, 20 + i * 70, 140, 0 + i * 70, 140], '#f8f0c0'); c.restore(); }
  R(c, 0, 130, W, 60, o.dark ? '#2c2418' : '#7c6440'); for (let i = 0; i < 80; i++) { const x = (i * 37) % W, y = 132 + (i * 23) % 56; L(c, x, y, x + 4, y + 1, o.dark ? '#3c3020' : (i % 3 ? '#a88c4c' : '#c8a860')); }
  for (let i = 0; i < 6; i++) { const u = fr(t * 0.12 + i / 6); const x = (i * 61 + Math.sin(t + i) * 10) % W; L(c, x, u * 140, x + 3, u * 140 + 1, o.dark ? '#5c6c3c' : '#c8c068'); }
  if (o.red) dim(c, o.red, '#4c0c0c');
}
// the magistrate's court: a raised veranda with a bamboo blind, the official, white gravel
function court(c, t, o = {}) {
  R(c, 0, 0, W, H, '#2c2420'); VG(c, 0, 0, W, 70, ['#1c1410', '#3c2c20', '#4c3828']);
  R(c, 0, 20, W, 50, '#3c2c20'); for (let x = 0; x < W; x += 60) R(c, x + 6, 0, 8, 80, '#5c4030');
  R(c, 80, 24, 160, 40, '#8c7c54'); for (let y = 26; y < 64; y += 3) R(c, 82, y, 156, 1, '#6c5c3c'); R(c, 78, 22, 164, 3, '#c8302c');
  c.save(); c.globalAlpha = 0.6; robe(c, KEBII, 160, 76, { k: 'kb', pose: 'sit', blink: blinkOf(t, 9) }); c.restore();
  R(c, 0, 70, W, 10, '#5c4030'); R(c, 0, 80, W, 4, '#3c2818');
  R(c, 0, 84, W, 106, '#e8e4dc'); for (let i = 0; i < 90; i++) P(c, (i * 37) % W, 86 + (i * 23) % 100, '#c8c4bc');
  if (o.mat !== false) { R(c, 110, 140, 100, 20, '#a89c6c'); for (let x = 112; x < 210; x += 6) R(c, x, 140, 1, 20, '#8c7c4c'); }
}
// the Yamashina road at noon: hills, pampas grass, the path into the trees
function road(c, t, o = {}) {
  VG(c, 0, 0, W, 100, ['#6c9cd8', '#a8c8e8', '#e8ecd8']);
  for (let i = 0; i < 3; i++) { const x = ((i * 140 + t * 4) % 460) - 60; E(c, x, 24 + i * 10, 26, 6, '#f8f8f0'); }
  PF(c, [0, 100, 60, 56, 140, 84, 220, 46, 300, 76, 320, 70, 320, 110, 0, 110], '#4c7c4c'); PF(c, [180, 100, 230, 70, 290, 100], '#3c6c3c');
  R(c, 0, 100, W, 90, '#9cac6c'); PF(c, [0, 150, W, 138, W, 166, 0, 174], '#c8b080');
  for (let i = 0; i < 16; i++) { const x = (i * 23) % W, y = 112 + (i * 7) % 24, sw = Math.sin(t * 1.5 + i) * 3; L(c, x, y + 14, x + sw, y, '#c8b878'); E(c, x + sw, y, 2, 4, '#e8dcb0'); }
}
// the Awataguchi stone bridge at night, a lone horse grazing by the road
function bridgeNight(c, t) {
  VG(c, 0, 0, W, 110, ['#06060e', '#0c0c1c', '#1c1c34']); for (let i = 0; i < 30; i++) P(c, (i * 47) % W, (i * 29) % 70, (i + Math.floor(t * 2)) % 7 ? '#a8a8c8' : '#4c4c6c'); E(c, 260, 30, 9, 9, '#e8e4d0'); glow(c, 260, 30, 30, 24, '#e8e4d0', 0.2);
  R(c, 0, 110, W, 80, '#1c2430'); for (let i = 0; i < 12; i++) { const x = ((i * 31 + t * 10) % 340) - 10; R(c, x, 140 + (i * 7) % 40, 12, 1, '#3c4c64'); }
  PF(c, [40, 118, 240, 118, 250, 128, 30, 128], '#8c8c94'); R(c, 30, 128, 220, 6, '#6c6c74'); for (let x = 50; x < 240; x += 40) R(c, x, 134, 10, 30, '#5c5c64'); R(c, 40, 112, 200, 3, '#a8a8b0');
  R(c, 250, 112, 70, 18, '#2c3424'); for (let i = 0; i < 8; i++) L(c, 256 + i * 8, 116, 258 + i * 8 + Math.sin(t + i) * 2, 102, '#5c6c4c');
}
// Kiyomizu temple at dusk: the great wooden stage, lanterns, incense smoke
function kiyomizu(c, t) {
  VG(c, 0, 0, W, 120, ['#2c1c3c', '#8c4c5c', '#e8906c']); for (let i = 0; i < 5; i++) PF(c, [i * 80 - 20, 120, i * 80 + 30, 70 + (i % 2) * 14, i * 80 + 80, 120], '#3c2c3c');
  R(c, 40, 40, 240, 12, '#5c2c24'); PF(c, [30, 42, 160, 20, 290, 42], '#3c2420'); for (let x = 50; x < 280; x += 30) R(c, x, 52, 6, 80, '#8c3c2c');
  R(c, 0, 120, W, 70, '#6c4c34'); for (let x = 0; x < W; x += 16) R(c, x, 120, 1, 70, '#5c3c28');
  for (const x of [70, 250]) { R(c, x - 6, 84, 12, 16, '#f8d890'); R(c, x - 7, 82, 14, 3, '#3c2c20'); glow(c, x, 92, 24, 20, '#f8c870', 0.35); }
  for (let i = 0; i < 4; i++) { const u = fr(t * 0.2 + i / 4); c.save(); c.globalAlpha = 0.4 * (1 - u); E(c, 160 + Math.sin(t + i * 2) * 8 * u, 112 - u * 60, 3 + u * 6, 2 + u * 3, '#c8c0d0'); c.restore(); }
  R(c, 152, 112, 16, 8, '#8c7c4c');
}
// the medium's room: candles, paper streamers, a cold blue light
function mikoRoom(c, t, o = {}) {
  R(c, 0, 0, W, H, '#0c0c14'); VG(c, 0, 0, W, 140, ['#06060c', '#0c1020', '#141c2c']);
  for (const x of [100, 220]) { R(c, x - 2, 100, 4, 30, '#c8c0b0'); const fl = Math.sin(t * 9 + x) * 1.5; E(c, x, 94 + fl * 0.3, 3, 6 + fl, '#f8c870'); glow(c, x, 96, 30, 26, '#f8c870', 0.25); }
  R(c, 158, 40, 4, 60, '#c8b890'); for (let i = 0; i < 4; i++) PF(c, [162, 44 + i * 10, 172, 48 + i * 10, 162, 52 + i * 10], '#f8f8f0');
  R(c, 0, 130, W, 60, '#2c2420'); for (let x = 0; x < W; x += 40) R(c, x, 130, 1, 60, '#1c1814');
  if (o.ghost) { glow(c, 160, 100, 90, 70, '#5c8cf8', 0.18 + 0.08 * Math.sin(t * 2)); for (let i = 0; i < 10; i++) { const u = fr(t * 0.2 + i / 10); P(c, 100 + (i * 13) % 120, 140 - u * 100, '#a8c8f8'); } }
}
// the dark between lives (chu-u): drifting dim motes
function chuu(c, t, a = 1) { R(c, 0, 0, W, H, '#020206'); for (let i = 0; i < 40; i++) { const u = fr(t * 0.03 + hash(i)); c.save(); c.globalAlpha = a * (0.2 + 0.3 * Math.sin(t + i)); P(c, (hash(i + 7) * W + Math.sin(t * 0.3 + i) * 10) | 0, (u * 190) | 0, '#4c5c7c'); c.restore(); } }
function pond(c, t) { grove(c, t, { dark: true }); E(c, 220, 150, 100, 22, '#1c2c3c'); E(c, 220, 148, 90, 18, '#2c4458'); for (let i = 0; i < 3; i++) { const u = fr(t * 0.4 + i / 3); c.save(); c.globalAlpha = 1 - u; ER(c, 230, 148, 6 + u * 40, 2 + u * 8, '#8cacc8'); c.restore(); } }

/* ---- portraits (48x48) ---- */
function tajouFace(o = {}) { // the bandit Tajomaru: wild hair, stubble, a sharp gaze; o.grin
  return SPR('tjF' + (o.blink || 0) + (o.grin ? 'g' : ''), 48, 48, c => {
    const sk = '#c89468', sk2 = '#a07048', hr = '#141010'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#242c4c'); L(c, 14, 38, 22, 48, '#8c8cac', 2); L(c, 34, 38, 26, 48, '#8c8cac', 2); R(c, 19, 31, 10, 7, sk2);
    E(c, 24, 22, 12, 14, sk2); E(c, 23.5, 21.5, 11.5, 13.5, sk);
    PF(c, [9, 20, 8, 8, 14, 2, 22, 5, 28, 0, 34, 4, 40, 8, 39, 20, 35, 12, 28, 10, 20, 11, 13, 12], hr); for (let i = 0; i < 6; i++) L(c, 10 + i * 6, 6, 8 + i * 6, -1, hr);
    L(c, 14, 16, 21, 18, hr, 2); L(c, 27, 18, 34, 16, hr, 2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 5, 21, hr); continue; } R(c, x0, 20, 5, 2, '#f0e4d0'); R(c, x0 + 2, 20, 2, 2, hr); P(c, x0 + 2, 20, '#f8f8f0'); }
    L(c, 24, 22, 23, 27, sk2); for (let i = 0; i < 18; i++) P(c, 15 + (i * 7) % 19, 28 + (i * 5) % 9, '#5c3c28');
    if (o.grin) { PF(c, [18, 31, 30, 31, 28, 34, 20, 34], '#5c1c14'); R(c, 19, 31, 10, 1, '#f0e8d8'); } else R(c, 19, 32, 10, 1, '#5c2c1c');
  });
}
function masagoFace(o = {}) { // Masago: pale oval face, long black hair, a mole at the left eye's corner, intense eyes; o.tear; o.burn: eyes burning
  return SPR('msF' + (o.blink || 0) + (o.tear ? 't' : '') + (o.burn ? 'b' : ''), 48, 48, c => {
    const sk = '#ecd0b8', sk2 = '#c8a890', hr = '#0c0c10';
    PF(c, [6, 48, 10, 38, 38, 38, 42, 48], '#a85c84'); L(c, 14, 39, 24, 48, '#5c7c4c', 2); L(c, 34, 39, 24, 48, '#f0e0e8', 2);
    PF(c, [8, 48, 6, 20, 12, 6, 24, 2, 36, 6, 42, 20, 40, 48, 34, 48, 34, 20, 14, 20, 14, 48], hr);
    R(c, 20, 31, 8, 7, sk2); E(c, 24, 22, 10, 13, sk2); E(c, 23.5, 21.5, 9.5, 12.5, sk); PF(c, [14, 14, 18, 6, 30, 6, 34, 14, 30, 10, 18, 10], hr);
    R(c, 17, 15, 4, 1, hr); R(c, 27, 15, 4, 1, hr);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 21, hr); continue; } R(c, x0, 19, 5, 3, '#f8f0e8'); R(c, x0 + 1, 19, 3, 3, o.burn ? '#6c1c14' : '#1c1414'); P(c, x0 + 1, 19, o.burn ? '#f8c040' : '#ffffff'); L(c, x0 - 1, 18, x0 + 5, 18, hr); }
    P(c, 33, 23, '#2c1c1c'); // the mole by her left eye (viewer's right)
    L(c, 24, 22, 23, 26, sk2); E(c, 24, 30, 3, 1, '#c84c5c'); R(c, 22, 30, 5, 1, '#a83c4c');
    if (o.tear) { R(c, 18, 23, 1, 6, '#88c8f8'); R(c, 30, 23, 1, 5, '#88c8f8'); }
    E(c, 17, 26, 2, 1, '#f0b8b0'); E(c, 31, 26, 2, 1, '#f0b8b0');
  });
}
function takehiroFace(o = {}) { if (o.gag) { const f = takehiroFace(Object.assign({}, o, { gag: false })); return SPR('thFg' + (o.blink || 0) + (o.glare ? 'c' : ''), 48, 48, c => { c.drawImage(f, 0, 0); for (let i = 0; i < 5; i++) PF(c, [17 + i * 3, 29, 21 + i * 3, 27 + (i % 2) * 2, 22 + i * 3, 32, 18 + i * 3, 33], i % 2 ? '#5c8c3c' : '#7cac4c'); }); } // Takehiro the samurai: eboshi cap, calm features; o.ghost: blue-pale, hollow; o.glare: cold contempt
  return SPR('thF' + (o.blink || 0) + (o.ghost ? 'g' : '') + (o.glare ? 'c' : ''), 48, 48, c => {
    const sk = o.ghost ? '#c8d8e8' : '#e0c0a0', sk2 = o.ghost ? '#8ca0b8' : '#b89878', hr = o.ghost ? '#1c2434' : '#141418';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.ghost ? '#6c8cb4' : '#5c84ac'); PF(c, [16, 37, 24, 45, 32, 37], '#d8e0e8'); R(c, 19, 31, 10, 7, sk2);
    E(c, 24, 22, 11, 14, sk2); E(c, 23.5, 21.5, 10.5, 13.5, sk); R(c, 13, 9, 22, 4, hr); PF(c, [15, 10, 33, 10, 31, -2, 22, 0], hr); E(c, 11.5, 22, 2, 3, sk2); E(c, 36.5, 22, 2, 3, sk2);
    if (o.glare) { L(c, 15, 15, 21, 17, hr, 2); L(c, 27, 17, 33, 15, hr, 2); } else { L(c, 15, 16, 21, 16, hr, 2); L(c, 27, 16, 33, 16, hr, 2); }
    for (const x0 of [16, 27]) { if (o.blink === 2 || o.ghost) { L(c, x0, 20, x0 + 5, 20, o.ghost ? '#3c4c6c' : '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f0ece4'); R(c, x0 + 2, 19, 2, 3, '#141418'); if (o.glare) { P(c, x0 + 3, 19, '#c8e8ff'); } }
    L(c, 24, 21, 23, 27, sk2); R(c, 21, 27, 6, 1, sk2); R(c, 20, 31, 8, 1, o.ghost ? '#4c5c7c' : '#7c4c3c'); P(c, 16, 29, hr); P(c, 32, 29, hr);
    if (o.ghost) { c.save(); c.globalAlpha = 0.3; for (let y = 0; y < 48; y += 2) R(c, 0, y, 48, 1, '#a8c8f8'); c.restore(); }
  });
}
function kikoriFace(o = {}) { return SPR('kkF' + (o.blink || 0), 48, 48, c => { const sk = '#c89c74', sk2 = '#a07c58'; PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#6c5c44'); R(c, 20, 32, 8, 7, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk); R(c, 13, 6, 22, 7, '#2c241c'); E(c, 24, 4, 3, 3, '#2c241c'); R(c, 12, 10, 24, 2, '#8c7c5c'); L(c, 15, 16, 21, 15, '#2c241c', 2); L(c, 27, 15, 33, 16, '#2c241c', 2); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f0e8dc'); R(c, x0 + 1, 19, 2, 3, '#2c1c14'); } L(c, 24, 21, 23, 26, sk2); L(c, 15, 25, 18, 26, sk2); R(c, 20, 31, 8, 1, '#6c3c2c'); for (let i = 0; i < 10; i++) P(c, 17 + (i * 5) % 14, 29 + (i * 3) % 6, '#5c4430'); }); }
function houshiFace(o = {}) { return SPR('hsF' + (o.blink || 0), 48, 48, c => { const sk = '#e0c0a0', sk2 = '#b89878'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#2c2c34'); PF(c, [24, 37, 46, 48, 30, 48], '#a8844c'); R(c, 20, 31, 8, 7, sk2); E(c, 24, 20, 12, 15, sk2); E(c, 23.5, 19.5, 11.5, 14.5, sk); E(c, 20, 10, 4, 2, '#f0d8c0'); L(c, 15, 16, 21, 17, '#8c7c6c'); L(c, 27, 17, 33, 16, '#8c7c6c'); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } L(c, x0, 20, x0 + 2, 19, '#2c1c14'); L(c, x0 + 2, 19, x0 + 5, 20, '#2c1c14'); } L(c, 24, 21, 23, 26, sk2); R(c, 21, 30, 6, 1, '#7c4c3c'); L(c, 14, 26, 16, 29, sk2); L(c, 34, 26, 32, 29, sk2); }); }
function houmenFace(o = {}) { return SPR('hmF' + (o.blink || 0), 48, 48, c => { const sk = '#c8946c', sk2 = '#a0704c'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#6c3c2c'); R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 12, 14, sk2); E(c, 23.5, 21.5, 11.5, 13.5, sk); R(c, 12, 4, 24, 9, '#141418'); R(c, 10, 11, 28, 2, '#141418'); L(c, 14, 15, 21, 17, '#141010', 3); L(c, 27, 17, 34, 15, '#141010', 3); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 5, 21, '#141010'); continue; } R(c, x0, 20, 5, 2, '#f0e4d0'); R(c, x0 + 1, 20, 2, 2, '#141010'); } L(c, 24, 22, 23, 27, sk2); PF(c, [16, 29, 22, 28, 26, 28, 32, 29, 30, 31, 18, 31], '#2c1c14'); R(c, 21, 32, 6, 1, '#6c2c1c'); }); }
function ounaFace(o = {}) { return SPR('onF' + (o.blink || 0), 48, 48, c => { const sk = '#e0c4a8', sk2 = '#b89c84'; PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#5c5048'); R(c, 20, 32, 8, 6, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk); PF(c, [11, 30, 10, 12, 16, 5, 24, 3, 32, 5, 38, 12, 37, 30, 34, 16, 14, 16], '#c8c8c0'); L(c, 15, 17, 21, 16, '#a8a8a0'); L(c, 27, 16, 33, 17, '#a8a8a0'); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } L(c, x0, 19, x0 + 5, 21, '#5c4c44'); R(c, x0 + 1, 20, 3, 2, '#2c1c14'); } R(c, 18, 23, 1, 5, '#88c8f8'); L(c, 15, 25, 18, 27, sk2); L(c, 33, 25, 30, 27, sk2); L(c, 24, 21, 23, 26, sk2); L(c, 20, 31, 24, 30, '#7c4c3c'); L(c, 24, 30, 28, 31, '#7c4c3c'); L(c, 19, 33, 22, 34, sk2); L(c, 29, 33, 26, 34, sk2); }); }
const PORTRAITS = {
  tajou: p => withMouth('pmtj', tajouFace({ blink: p.blink }), p, 24, 32),
  masago: p => withMouth('pmms', masagoFace({ blink: p.blink }), p, 24, 30),
  takehiro: p => withMouth('pmth', takehiroFace({ blink: p.blink, ghost: true }), p, 24, 31),
  kikori: p => withMouth('pmkk', kikoriFace({ blink: p.blink }), p, 24, 31),
  houshi: p => withMouth('pmhs', houshiFace({ blink: p.blink }), p, 24, 30),
  houmen: p => withMouth('pmhm', houmenFace({ blink: p.blink }), p, 24, 32),
  ouna: p => withMouth('pmon', ounaFace({ blink: p.blink }), p, 24, 31),
};
