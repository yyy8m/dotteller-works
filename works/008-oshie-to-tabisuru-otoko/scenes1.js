/* ================= 文庫 #008 押絵と旅する男: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function robe(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f, pose: o.pose, arm: o.arm, expr: o.expr, blink: o.blink, k: o.k }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1, rot: o.rot }); }
function frame(c, x, y, w, h, col) { R(c, x, y, w, 2, col); R(c, x, y + h - 2, w, 2, col); R(c, x, y, 2, h, col); R(c, x + w - 2, y, 2, h, col); }
function suit(c, st, x, y, o = {}) { blit(c, suitFig(st, { f: o.f, arm: o.arm, expr: o.expr, blink: o.blink, k: o.k, noHat: true }), x, y, 13, 57, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- cast ---- */
const ROJIN = { id: 'rj', spk: 'rojin', coat: '#1c1c24', coat2: '#2c2c34', pants: '#1c1c24', boots: '#141414', skin: '#e8d8c8', hair: '#141418' };     // the old man: black hair, a narrow old-fashioned suit
const WATASHI = { id: 'ws', coat: '#5c5c64', coat2: '#4c4c54', pants: '#3c3c44', boots: '#2c2420', skin: '#e8c4a0', hair: '#2c2420', hat: 'fedora', hatCol: '#4c4c54' };
const ANI = { id: 'an', spk: 'ani', coat: '#2c1c3c', coat2: '#3c2c4c', pants: '#2c1c3c', boots: '#141414', skin: '#ecd8c4', hair: '#141418' };          // the brother at 25: black velvet suit
const OTOTO = { id: 'oy', top: 'jacket', coat: '#3c4c3c', shirt: '#e8e4dc', pants: '#3c3c34', boots: '#2c2420', skin: '#e8c4a0', hair: '#141418', hat: 'fedora', hatCol: '#1c1c24' };
const CROWD = ['#8c5c4c', '#5c6c8c', '#7c7c5c', '#a86c7c', '#5c7c6c'].map((col, i) => ({ id: 'cw' + i, robe: col, robe2: shadeCol(col, 0.85), trim: '#e8e0d0', sash: '#2c2c34', hair: '#141418', hat: i % 2 ? 'bun' : null, female: i % 2 === 0 }));

/* ---- the oshie (padded-cloth picture) : a white-haired old man in black velvet and a girl in a scarlet furisode leaning on his knee ----
   drawn inside a frame at (x, y), scale s; o.young: the brother at 25 (black hair); o.oshichi: the original Kichiza (in kimono); o.smile */
function oshie(c, t, x, y, s = 1, o = {}) {
  c.save(); c.translate(x, y); c.scale(s, s);
  R(c, -4, -4, 128, 88, '#3c2414'); R(c, -2, -2, 124, 84, '#8c6c3c'); R(c, 0, 0, 120, 80, '#2c4c7c');
  for (let i = 0; i < 6; i++) { const k = i / 6; R(c, 10 + k * 40, 10 + k * 14, 100 - k * 80, 2, '#c8b888'); } R(c, 0, 52, 120, 28, '#5c8c5c'); for (let i = 0; i < 6; i++) L(c, i * 24, 80, 60, 52, '#4c7c4c');
  R(c, 6, 14, 22, 26, '#141414'); R(c, 8, 16, 18, 22, '#c8d8e8'); R(c, 8, 26, 18, 1, '#141414'); R(c, 16, 16, 1, 22, '#141414'); R(c, 4, 42, 26, 8, '#3c2414');
  const hx = 54, hy = 50;
  if (o.oshichi) { E(c, hx, hy + 6, 9, 12, '#3c5c8c'); E(c, hx, hy - 10, 5, 6, '#e8d0b8'); R(c, hx - 5, hy - 16, 10, 4, '#141414'); }
  else { R(c, hx - 8, hy - 4, 16, 18, '#1c1424'); R(c, hx - 9, hy + 12, 20, 6, '#1c1424'); E(c, hx, hy - 10, 5.5, 6.5, '#e8d8c8'); R(c, hx - 5, hy - 17, 10, 4, o.young ? '#141418' : '#e8e8e4'); R(c, hx - 6, hy - 14, 2, 5, o.young ? '#141418' : '#e8e8e4'); R(c, hx + 4, hy - 14, 2, 5, o.young ? '#141418' : '#e8e8e4');
    P(c, hx - 2, hy - 10, '#141414'); P(c, hx + 2, hy - 10, '#141414'); if (!o.young) { L(c, hx - 3, hy - 13, hx + 3, hy - 13, '#a89888'); L(c, hx - 3, hy - 6, hx + 3, hy - 6, '#a89888'); } R(c, hx - 1, hy - 6, 3, 1, o.smile ? '#c86c6c' : '#8c5c5c'); }
  const gx = hx + 18, gy = hy + 2; PF(c, [gx - 10, gy - 4, gx + 8, gy - 6, gx + 14, gy + 16, gx - 14, gy + 16], '#d81c2c'); for (let k = 0; k < 6; k++) P(c, gx - 8 + k * 4, gy + (k & 1) * 6, '#f8c8c8'); R(c, gx - 9, gy + 2, 18, 3, '#141414');
  E(c, gx - 4, gy - 12, 5, 6, '#f8e8e0'); E(c, gx - 4, gy - 19, 6, 5, '#141414'); E(c, gx - 4, gy - 23, 4, 3, '#141414'); R(c, gx - 7, gy - 21, 6, 2, '#d81c2c'); P(c, gx - 6, gy - 12, '#141414'); P(c, gx - 2, gy - 12, '#141414'); E(c, gx - 7, gy - 10, 1.5, 1, '#f8a8b8'); R(c, gx - 5, gy - 8, 2, 1, '#c81c2c');
  L(c, gx - 10, gy - 2, hx + 4, hy + 2, '#d81c2c', 2);
  c.restore();
}
function wrapped(c, x, y, s = 1) { c.save(); c.translate(x, y); c.scale(s, s); R(c, -6, -6, 132, 92, '#3c2414'); R(c, -2, -2, 124, 84, '#1c1c24'); for (let i = 0; i < 6; i++) L(c, 10 + i * 20, 0, 0 + i * 20, 80, '#2c2c38', 2); L(c, -2, -2, 60, 34, '#3c3c4c', 2); L(c, 122, -2, 60, 34, '#3c3c4c', 2); E(c, 60, 34, 8, 6, '#3c3c4c'); c.restore(); }
// the night train compartment (o.night, o.window: what shows in the window)
function carriage(c, t, o = {}) {
  R(c, 0, 0, W, H, '#3c2c24'); R(c, 0, 0, W, 20, '#2c2018'); for (let i = 0; i < 3; i++) { R(c, 40 + i * 100, 6, 30, 6, '#f8e8b0'); glow(c, 55 + i * 100, 10, 40, 16, '#f8e8b0', 0.2); }
  for (let i = 0; i < 4; i++) { const x = 16 + i * 78; R(c, x, 30, 64, 60, o.night === false ? '#8c9cac' : '#06080c'); R(c, x - 2, 28, 68, 3, '#5c4030'); if (o.night !== false && (i + Math.floor(t * 0.5)) % 4 === 0) { const lx = x + fr(t * 0.7 + i) * 64; P(c, lx, 70, '#f8d890'); } }
  R(c, 0, 92, W, 6, '#5c4030'); R(c, 0, 98, W, 30, '#6c2c2c'); R(c, 0, 98, W, 3, '#8c3c3c'); for (let x = 0; x < W; x += 64) R(c, x, 98, 2, 30, '#4c1c1c'); R(c, 0, 128, W, 62, '#4c3828');
}
function mirageSea(c, t) {
  VG(c, 0, 0, W, 120, ['#9c9ca4', '#a8a8ac', '#b0b0b0']); R(c, 0, 110, W, 30, '#a0a0a4');
  for (let i = 0; i < 6; i++) { const k = 0.5 + 0.5 * Math.sin(t * 0.4 + i * 1.7), x = 30 + i * 52; c.save(); c.globalAlpha = 0.5; for (let j = 0; j < 4; j++) E(c, x + Math.sin(t * 0.3 + i + j) * 8, 96 - j * (10 + 12 * k), 22 - j * 3 + 6 * k, 6 + 4 * k, '#2c2c34'); c.restore(); }
  R(c, 0, 140, W, 50, '#c8b888'); for (let i = 0; i < 10; i++) { const x = 10 + i * 32; R(c, x, 110, 3, 30, '#3c2c1c'); E(c, x + 1, 106, 10, 6, '#2c4c2c'); } for (let i = 0; i < 14; i++) suitDot(c, 20 + i * 22, 150);
}
function suitDot(c, x, y) { R(c, x, y - 6, 3, 6, '#2c2c34'); P(c, x + 1, y - 7, '#e8c4a0'); }
// Asakusa, Meiji 28: the Ryounkaku (twelve-storey red-brick tower)
function ryounkaku(c, t, o = {}) {
  VG(c, 0, 0, W, 150, ['#a8a8b0', '#c8c8c8', '#d8d0c0']); for (let i = 0; i < 4; i++) E(c, ((i * 90 + t * 4) % 380) - 30, 30 + i * 12, 50, 8, '#e0e0e4');
  const x = o.x || 200; for (let k = 0; k < 12; k++) { const w = 46 - k * 1.2, y = 150 - (k + 1) * 10; R(c, x - w / 2, y, w, 10, k % 2 ? '#a84c3c' : '#984434'); R(c, x - 4, y + 3, 3, 4, '#2c2c34'); R(c, x + 4, y + 3, 3, 4, '#2c2c34'); }
  PF(c, [x - 18, 30, x, 12, x + 18, 30], '#5c3c2c'); R(c, x - 20, 30, 40, 2, '#3c2c1c');
  for (let i = 0; i < 8; i++) { const hx = 10 + i * 24; if (Math.abs(hx - x) < 30) continue; PF(c, [hx, 140, hx + 11, 130, hx + 22, 140], '#3c3434'); R(c, hx + 2, 140, 18, 12, '#5c4c44'); }
  R(c, 0, 150, W, 40, '#8c8070');
}
function towerTop(c, t) { VG(c, 0, 0, W, 150, ['#c8c8c8', '#d8d8d8', '#e8e4dc']); for (let i = 0; i < 5; i++) E(c, ((i * 80 - t * 6) % 400 + 400) % 400 - 40, 40 + (i % 3) * 30, 60, 10, '#f0f0f0'); R(c, 0, 140, W, 50, '#7c4c3c'); for (let x = 0; x < W; x += 16) R(c, x, 120, 2, 20, '#3c2c1c'); R(c, 0, 118, W, 3, '#3c2c1c'); }
function balloons(c, t, t0) { if (t < t0) return; const u = t - t0; for (let i = 0; i < 24; i++) { const x = 40 + (i * 37) % 240 + Math.sin(u + i) * 6, y = 150 - u * (12 + (i % 5) * 4) - (i % 4) * 8; if (y < -10) continue; E(c, x, y, 4, 5, ['#e83c3c', '#3c6ce8', '#a83ce8', '#e8c83c'][i % 4]); L(c, x, y + 5, x, y + 12, '#8c8c8c'); } }
function peepShow(c, t, x, y, o = {}) { R(c, x, y - 60, 90, 60, '#5c3c1c'); R(c, x - 4, y - 66, 98, 8, '#8c5c2c'); for (let i = 0; i < 3; i++) { E(c, x + 18 + i * 28, y - 36, 7, 7, '#141414'); ER(c, x + 18 + i * 28, y - 36, 8, 8, '#c8a848'); } R(c, x + 10, y - 58, 70, 12, '#f0e0c0'); TX(c, 'のぞき', x + 20, y - 60, '#8c1c1c', 16, null); if (o.lamp) glow(c, x + 45, y - 70, 30, 20, '#f8d890', 0.3); }
function binoculars(c, x, y, s = 1, rot = 0) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); for (const dx of [-8, 8]) { PF(c, [dx - 4, -10, dx + 4, -10, dx + 6, 10, dx - 6, 10], '#1c1c1c'); R(c, dx - 6, 10, 12, 3, '#b8904c'); E(c, dx, 13, 6, 2, '#8cb8d8'); R(c, dx - 4, -12, 8, 2, '#b8904c'); E(c, dx, -12, 3, 1.5, '#5c7c9c'); for (let k = -6; k < 8; k += 4) R(c, dx - 5, k, 10, 1, '#3c3c3c'); } R(c, -4, -4, 8, 6, '#b8904c'); E(c, 0, -6, 3, 2, '#8c6c3c'); c.restore(); }
function smallStation(c, t) { R(c, 0, 0, W, H, '#06060c'); for (let i = 0; i < 3; i++) glow(c, 80 + i * 80, 60, 20, 14, '#f8d890', 0.3); R(c, 0, 120, W, 30, '#3c3c3c'); R(c, 0, 118, W, 3, '#8c8c84'); R(c, 140, 100, 60, 3, '#5c4c3c'); for (let x = 140; x < 200; x += 10) R(c, x, 100, 2, 20, '#5c4c3c'); }

/* ---- portraits (48x48) ---- */
function rojinFace(o = {}) { // jet-black, neatly parted hair over a pale face cut with countless wrinkles; glittering eyes
  return SPR('rjF' + (o.blink || 0) + (o.smile ? 's' : '') + (o.fear ? 'f' : ''), 48, 48, c => {
    const sk = '#e8dcd0', sk2 = '#c8b8a8'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#1c1c24'); PF(c, [19, 37, 24, 44, 29, 37], '#e8e4dc'); L(c, 24, 38, 24, 48, '#3c1c2c', 2); R(c, 20, 31, 8, 7, sk2);
    E(c, 24, 21, 11, 14, sk2); E(c, 23.5, 20.5, 10.5, 13.5, sk); E(c, 12.5, 21, 1.5, 3, sk2); E(c, 35.5, 21, 1.5, 3, sk2);
    PF(c, [12, 18, 12, 9, 18, 5, 30, 5, 36, 9, 36, 18, 33, 11, 26, 9, 22, 12, 16, 12], '#0c0c10'); L(c, 22, 6, 22, 11, '#3c3c48');
    for (let y = 13; y < 33; y += 5) { L(c, 15, y, 18, y + 1, '#d0bcac'); L(c, 30, y + 1, 33, y, '#d0bcac'); } L(c, 18, 26, 20, 31, '#c0a898'); L(c, 30, 26, 28, 31, '#c0a898'); L(c, 19, 11, 29, 11, '#c8b0a0');
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 19, x0 + 5, 19, '#2c2020'); continue; } R(c, x0, 17, 5, 4, '#f4f0e8'); R(c, x0 + 1, 17, 3, 4, o.fear ? '#5c1c1c' : '#141010'); P(c, x0 + 2, 17, '#ffffff'); P(c, x0 + 1, 18, '#e8e8f8'); }
    L(c, 24, 20, 23, 26, sk2); if (o.smile) { L(c, 20, 30, 23, 31, '#7c4c4c'); L(c, 23, 31, 28, 29, '#7c4c4c'); } else R(c, 20, 30, 8, 1, '#7c4c4c');
  });
}
function aniFace(o = {}) { // the brother at 25: pale, handsome, dreamy eyes, black velvet collar
  return SPR('anF' + (o.blink || 0), 48, 48, c => {
    const sk = '#f0dcc8', sk2 = '#d0b8a4'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#2c1c3c'); PF(c, [19, 37, 24, 44, 29, 37], '#f0ece4'); R(c, 20, 31, 8, 7, sk2);
    E(c, 24, 21, 11, 14, sk2); E(c, 23.5, 20.5, 10.5, 13.5, sk); PF(c, [12, 18, 12, 9, 18, 5, 30, 5, 36, 9, 36, 18, 33, 11, 26, 9, 22, 12, 16, 12], '#141418'); E(c, 12.5, 21, 1.5, 3, sk2); E(c, 35.5, 21, 1.5, 3, sk2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 19, x0 + 5, 19, '#2c2020'); continue; } R(c, x0, 18, 5, 3, '#f4f0e8'); R(c, x0 + 1, 18, 3, 3, '#2c2438'); P(c, x0 + 2, 18, '#ffffff'); L(c, x0, 17, x0 + 5, 17, '#3c2c2c'); }
    L(c, 24, 20, 23, 26, sk2); R(c, 21, 30, 6, 1, '#b86c6c'); E(c, 17, 25, 2, 1, '#f0b8b0'); E(c, 31, 25, 2, 1, '#f0b8b0');
  });
}
const PORTRAITS = { rojin: p => withMouth('pmrj', rojinFace({ blink: p.blink }), p, 24, 30), ani: p => withMouth('pman', aniFace({ blink: p.blink }), p, 24, 30) };
