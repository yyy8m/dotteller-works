/* ================= 記録 #012 タマム・シュッド事件: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function softBeam(c, x, y, ang, len, half, a = 0.3, col = '#fff4c8') { const p = (r, k) => [x + Math.cos(ang + k) * r, y + Math.sin(ang + k) * r]; c.save(); c.globalAlpha = a * 0.5; PF(c, [x, y, ...p(len, -half), ...p(len, half)], col); c.globalAlpha = a; PF(c, [x, y, ...p(len * 0.9, -half * 0.5), ...p(len * 0.9, half * 0.5)], col); c.restore(); }
function cross(c, x, y, s = 10, col = '#e81c1c') { L(c, x - s, y - s, x + s, y + s, col, 3); L(c, x + s, y - s, x - s, y + s, col, 3); }
// 1940s men in suits: suitFig (26x58, anchor 13,57); women: robeFig
function man(c, st, x, y, o = {}) { blit(c, suitFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', cream: !!o.cream }), x, y, 13, 57, { flip: !!o.flip, s: o.s || 1 }); }
function woman(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, 13, 57, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- cast ---- */
// the Somerton Man: no hat, no wallet; brown suit, light reddish hair combed back
const SOM = { id: 'som', coat: '#5c4c3c', coat2: '#4c3c2c', pants: '#4c3c2c', boots: '#1c1410', skin: '#e8c4a4', hair: '#a8704c', hat: null };
const LYONS = { id: 'lyo', coat: '#3c4c5c', coat2: '#2c3c4c', pants: '#2c3440', boots: '#1c1c1c', skin: '#dcac88', hair: '#3c2818', hat: 'bowler', hatCol: '#2c2c34', moustache: true };
const COPS = [0, 1].map(i => ({ id: 'cop' + i, coat: '#1c2c4c', coat2: '#142040', pants: '#1c2440', boots: '#141414', skin: ['#e8c0a0', '#dcac88'][i], hair: '#3c2818', hat: 'bowler', hatCol: '#1c2c4c', moustache: i === 1 }));
const LEANE = { id: 'lea', coat: '#4c4c54', coat2: '#3c3c44', pants: '#34343c', boots: '#141414', skin: '#e0b898', hair: '#5c4c3c', hat: 'bowler', hatCol: '#2c2c30', moustache: true };
const NURSE = { id: 'nur', robe: '#4c6c8c', robe2: '#3c5c7c', trim: '#f0e8d8', sash: '#f0e8d8', skin: '#f0c8a8', hair: '#5c3c24', female: true };
const COUPLE = [{ id: 'cpm', coat: '#6c5c44', coat2: '#5c4c34', pants: '#4c4034', boots: '#2c2018', skin: '#e8c0a0', hair: '#3c2818', hat: 'bowler', hatCol: '#3c3428' }, { id: 'cpw', robe: '#a84c4c', robe2: '#8c3c3c', trim: '#f0e8d8', sash: '#f0e8d8', skin: '#f0c8a8', hair: '#c8a060', female: true }];
const ARMY = [0, 1, 2].map(i => ({ id: 'sa' + i, coat: '#1c2448', coat2: '#141c38', pants: '#1c2040', boots: '#141414', skin: ['#e8c0a0', '#dcac88', '#f0c8a8'][i], hair: '#3c2818', hat: 'bowler', hatCol: '#1c2448', moustache: i === 0 }));

/* ---- places ---- */
function beachSky(c, t, o = {}) { VG(c, 0, 0, W, 104, o.night ? ['#04060e', '#0c1430', '#1c2c4c'] : o.dusk ? ['#241c3c', '#a8545c', '#f0a860'] : o.dawn ? ['#3c4c7c', '#c8889c', '#f8d8a8'] : ['#5c9cd8', '#9cccec', '#d8ecf4']); if (o.night) for (let i = 0; i < 30; i++) P(c, hash(i) * W, hash(i * 3) * 70, '#c8d0e8'); else for (let i = 0; i < 3; i++) E(c, mod(i * 120 + t * 4, W + 120) - 60, 22 + i * 9, 40, 5, DA('#ffffff', o.dusk ? 0.25 : 0.6)); }
function sea(c, t, y = 100, o = {}) { const col = o.night ? '#0c1c3c' : o.dusk ? '#5c4c6c' : '#2c7cb0'; R(c, 0, y, W, 34, col); for (let r = 0; r < 6; r++) for (let i = 0; i < 9; i++) R(c, mod(i * 43 + r * 17 - t * (5 + r * 2) * (r & 1 ? 1 : -0.6), W + 40) - 20, y + 2 + r * 5, 10 + r * 2, 1, o.night ? '#2c4c7c' : o.dusk ? '#c88c8c' : '#8cc8ec'); }
// Somerton Park beach: sand in front, the stone seawall along the back-left, a lamp post
function beach(c, t, o = {}) {
  beachSky(c, t, o); sea(c, t, 100, o);
  const sand = o.night ? '#4c4434' : o.dusk ? '#b8987c' : '#e4d4a4';
  R(c, 0, 134, W, 106, sand); for (let i = 0; i < 40; i++) P(c, hash(i) * W, 138 + hash(i * 3) * 100, o.night ? '#3c3428' : '#c8b888');
  // foam line where the sea meets the sand
  for (let i = 0; i < 12; i++) R(c, mod(i * 31 + Math.sin(t * 1.2 + i) * 6, W), 133 + Math.sin(t * 1.5 + i) * 1.5, 18, 2, '#f4f8f8');
  if (o.wall !== false) { // stone seawall, slanting in from the left
    PF(c, [0, 112, 150, 128, 150, 158, 0, 172], o.night ? '#3c3c44' : '#8c8478'); for (let k = 0; k < 6; k++) L(c, 0, 118 + k * 9, 150, 132 + k * 4.6, o.night ? '#2c2c34' : '#7c7468');
    for (let k = 0; k < 7; k++) L(c, k * 22, 113 + k * 2.2, k * 22, 170 - k * 2, o.night ? '#2c2c34' : '#7c7468');
  }
  if (o.lamp) { R(c, 230, 70, 3, 70, '#2c2c2c'); R(c, 224, 64, 15, 8, '#2c2c2c'); if (o.night) { const fl = 0.35 + 0.08 * Math.sin(t * 7) * (hash(Math.floor(t * 3)) > 0.8 ? 1 : 0); glow(c, 231, 70, 30, 24, '#f8e8b0', fl); softBeam(c, 231, 72, Math.PI / 2 + 0.5, 90, 0.35, 0.12); } }
}
// the man, lying against the seawall, legs crossed (suitFig rotated)
function somLying(c, x, y, o = {}) { const spr = suitFig(SOM, { k: 'lie' + (o.k || ''), blink: 2, cream: !!o.cream }); blit(c, spr, x, y, 13, 57, { rot: -1.32, s: o.s || 1.5 }); }
function street(c, y = 150, o = {}) { R(c, 0, y, W, H - y, o.night ? '#2c2c30' : '#5c5850'); R(c, 0, y, W, 4, o.night ? '#4c4c50' : '#8c8478'); }
function bungalow(c, x, y, o = {}) { R(c, x, y - 40, 70, 40, o.col || '#d8c8a8'); PF(c, [x - 6, y - 40, x + 35, y - 62, x + 76, y - 40], '#7c3c2c'); R(c, x + 28, y - 26, 14, 26, '#5c3c24'); for (const wx of [x + 8, x + 50]) { R(c, wx, y - 32, 12, 12, '#3c4c5c'); if (o.lit) { R(c, wx + 1, y - 31, 10, 10, '#f8d880'); glow(c, wx + 6, y - 26, 10, 8, '#f8d880', 0.3); } } R(c, x - 10, y - 8, 90, 8, '#5c7c3c'); }
// a 1940s sedan, side view
function car(c, x, y, o = {}) { const col = o.col || '#2c3c3c'; PF(c, [x, y - 14, x + 8, y - 26, x + 30, y - 34, x + 70, y - 34, x + 86, y - 24, x + 100, y - 22, x + 104, y - 12, x + 104, y - 6, x, y - 6], col); R(c, x + 34, y - 31, 18, 10, '#8cacc8'); R(c, x + 55, y - 31, 18, 10, '#8cacc8'); R(c, x + 76, y - 22, 20, 2, '#c8c8d0'); for (const wx of [x + 20, x + 82]) { E(c, wx, y - 6, 8, 8, '#141414'); E(c, wx, y - 6, 3, 3, '#a8a8b0'); } if (o.book) R(c, x + 38, y - 24, 8, 3, '#7c2c1c'); }

/* ---- props ---- */
// the scrap of paper with the printed words; u = how far it has unrolled
function scrap(c, x, y, u = 1, s = 1) { c.save(); c.translate(x, y); c.scale(s, s); const tw = textSpr('Tamám Shud', 16, '#2c2420').width + 8, w = Math.round(lerp(6, tw, u)); R(c, -w / 2, -8, w, 16, '#e8dcc0'); R(c, -w / 2, -8, w, 1, '#c8bca0'); c.save(); c.beginPath(); c.rect(-w / 2, -10, w, 20); c.clip(); TX(c, 'Tamám Shud', -tw / 2 + 4, -9, '#2c2420', 16, null); c.restore(); if (u < 1) { R(c, -w / 2 - 3, -9, 4, 18, '#d8ccb0'); R(c, w / 2 - 1, -9, 4, 18, '#d8ccb0'); } c.restore(); }
function book(c, x, y, o = {}) { R(c, x, y, 70, 96, '#2c1410'); R(c, x + 2, y + 2, 66, 92, o.col || '#7c2c1c'); R(c, x + 6, y + 6, 58, 84, o.col2 || '#8c3c24'); if (!o.back) { for (let k = 0; k < 3; k++) R(c, x + 12, y + 50 + k * 8, 46, 1, '#d8a860'); E(c, x + 35, y + 28, 10, 10, '#d8a860'); E(c, x + 35, y + 28, 7, 7, '#8c3c24'); } }
function suitcase(c, x, y, o = {}) { const w = o.w || 60, h = o.h || 40; R(c, x, y, w, h, '#6c4424'); R(c, x + 2, y + 2, w - 4, h - 4, '#8c5c34'); R(c, x, y + h / 2 - 1, w, 2, '#5c3c1c'); R(c, x + w / 2 - 8, y - 6, 16, 6, '#3c2414'); R(c, x + w / 2 - 6, y - 4, 12, 3, '#8c5c34'); for (const bx of [x + 8, x + w - 12]) R(c, bx, y + 2, 4, h - 4, '#5c3c1c'); }
function foxglove(c, x, y, t, s = 1) { L(c, x, y, x, y - 70 * s, '#3c7c3c', 2); for (let i = 0; i < 9; i++) { const yy = y - 18 * s - i * 6 * s, sw = Math.sin(t * 1.4 + i) * 0.8; E(c, x + (i & 1 ? 5 : -5) * s + sw, yy, 4 * s, 3 * s, i % 3 ? '#b85cb8' : '#c87cc8'); P(c, x + (i & 1 ? 6 : -6) * s, yy, '#f4e8f4'); } for (let i = 0; i < 3; i++) E(c, x + (i - 1) * 10, y - 4, 9, 4, '#4c8c3c'); }
function helix(c, x, y, t, h = 90) { for (let i = 0; i < 24; i++) { const u = i / 24, a = u * TAU * 2 + t * 1.6, yy = y - h / 2 + u * h, x1 = x + Math.cos(a) * 18, x2 = x - Math.cos(a) * 18, front = Math.sin(a) > 0; L(c, x1, yy, x2, yy, DA('#8cc8f8', 0.5)); E(c, x1, yy, 2.5, 2.5, front ? '#f8d860' : '#8c7c3c'); E(c, x2, yy, 2.5, 2.5, front ? '#8c7c3c' : '#f8d860'); } }
// the coded letters on the back cover (line 2 struck out)
const CODE = ['WRGOABABD', 'MLIAOI', 'WTBIMPANETP', 'MLIABOAIAQC', 'ITTMTSAMSTGAB'];
function codePage(c, x, y, t, t0, o = {}) { R(c, x, y, 150, 118, '#e8dcc0'); R(c, x, y, 150, 2, '#c8bca0'); for (let i = 0; i < 5; i++) { const s = CODE[i], n = o.all ? s.length : Math.max(0, Math.min(s.length, Math.floor((t - t0 - i * 0.9) * 10))); if (n <= 0) continue; TX(c, s.slice(0, n), x + 12, y + 8 + i * 21, '#3c3c44', 16, null); if (i === 1 && n === s.length) L(c, x + 10, y + 18 + i * 21, x + 12 + s.length * 8 + 2, y + 18 + i * 21, '#3c3c44', 1); } }
function globe(c, x, y, r, t) { E(c, x, y, r, r, '#1c4c7c'); for (let i = 0; i < 6; i++) { const a = t * 0.3 + i; E(c, x + Math.cos(a) * r * 0.55, y + Math.sin(i * 2.1) * r * 0.5, r * 0.25, r * 0.16, '#5c8c4c'); } ER(c, x, y, r, r, '#8cc8f8'); }
function grave(c, x, y, o = {}) { R(c, x - 22, y - 6, 44, 10, '#6c6458'); R(c, x - 14, y - 40, 28, 36, '#a8a49c'); PF(c, [x - 14, y - 40, x, y - 48, x + 14, y - 40], '#a8a49c'); R(c, x - 9, y - 32, 18, 1, '#7c7870'); R(c, x - 9, y - 26, 18, 1, '#7c7870'); }

/* ---- portraits (48x48) ---- */
// the Somerton Man: lean face, light reddish hair combed back, sharp nose; bust = the white plaster cast
function somFace(o = {}) {
  return SPR('soF' + (o.blink || 0) + (o.bust ? 'b' : '') + (o.cig ? 'c' : ''), 48, 48, c => {
    const sk = o.bust ? '#f0ece4' : '#ecc8a8', sk2 = o.bust ? '#c8c4bc' : '#b8906c', hc = o.bust ? '#dcd8d0' : '#a8704c';
    if (o.bust) PF(c, [4, 48, 10, 38, 38, 38, 44, 48], '#d8d4cc'); else { PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#5c4c3c'); PF(c, [18, 37, 24, 44, 30, 37], '#f4f0e8'); R(c, 23, 39, 2, 8, '#8c2c2c'); }
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 10.5, 13, sk2); E(c, 23.5, 21.5, 10, 12.5, sk); E(c, 14, 22, 2, 4, sk2); E(c, 34, 22, 2, 4, sk2);
    PF(c, [13, 16, 14, 7, 22, 3, 30, 4, 35, 8, 35, 16, 32, 10, 24, 8, 17, 10], hc); for (let k = 0; k < 4; k++) L(c, 17 + k * 4, 6, 19 + k * 4, 10, o.bust ? '#c8c4bc' : '#8c5c3c');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 15, x0 + 4, 15, o.bust ? '#bcb8b0' : '#8c5c3c'); if (o.blink === 2 || o.bust) { L(c, x0, 18, x0 + 4, 18, o.bust ? '#a8a49c' : '#2c1c14'); continue; } R(c, x0, 17, 5, 3, '#f4f0e8'); R(c, x0 + 1, 17, 3, 3, '#5c6c7c'); P(c, x0 + 2, 18, C.k); }
    L(c, 24, 19, 22, 25, sk2); P(c, 23, 26, sk2); R(c, 21, 30, 6, 1, o.bust ? '#b8b4ac' : '#9c5c4c'); L(c, 19, 33, 29, 33, sk2);
    if (o.cig) { L(c, 29, 18, 39, 15, '#f4f0e8', 2); L(c, 38, 15, 40, 14, '#c88c5c', 2); }
  });
}
function coronerFace(o = {}) { // Coroner Cleland: grey hair, round spectacles
  return SPR('crF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e8c4a4', sk2 = '#b8906c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#2c2c34'); PF(c, [18, 37, 24, 45, 30, 37], '#f4f0e8'); R(c, 22, 39, 4, 6, '#3c1c2c');
    R(c, 19, 30, 10, 7, sk2); E(c, 24, 22, 11.5, 13, sk2); E(c, 23.5, 21.5, 11, 12.5, sk);
    PF(c, [12, 18, 13, 10, 20, 6, 28, 6, 35, 10, 36, 18, 32, 12, 24, 10, 16, 12], '#a8a8a8'); E(c, 13, 22, 2, 5, '#b8b8b8'); E(c, 35, 22, 2, 5, '#b8b8b8');
    for (const x0 of [17, 27]) { ER(c, x0 + 2, 19, 4, 3.5, '#5c5c5c'); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c1c14'); continue; } R(c, x0 + 1, 18, 3, 2, '#2c2c34'); } L(c, 22, 19, 26, 19, '#5c5c5c');
    L(c, 24, 21, 23, 26, sk2); R(c, 21, 31, 6, 1, '#8c4c3c');
  });
}
function leaneFace(o = {}) { // Detective Sergeant Leane: dark hat brim, thin moustache
  return SPR('lnF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0b898', sk2 = '#ac8464';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#4c4c54'); PF(c, [18, 37, 24, 45, 30, 37], '#f4f0e8'); R(c, 22, 39, 4, 7, '#2c3c5c');
    R(c, 19, 30, 10, 7, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    R(c, 14, 3, 20, 9, '#2c2c30'); R(c, 8, 11, 32, 3, '#2c2c30'); R(c, 14, 9, 20, 2, '#5c3c24');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, 16, '#3c2c1c'); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c1c14'); continue; } R(c, x0, 18, 5, 3, '#f4f0e8'); R(c, x0 + 1, 18, 3, 3, '#3c2c1c'); }
    L(c, 24, 21, 23, 26, sk2); R(c, 19, 28, 10, 2, '#4c3424'); R(c, 21, 31, 6, 1, '#8c4c3c');
  });
}
const PORTRAITS = {
  doctor: p => withMouth('pmcr', coronerFace({ blink: p.blink }), p, 24, 31),
  officer: p => withMouth('pmln', leaneFace({ blink: p.blink }), p, 24, 31),
};
