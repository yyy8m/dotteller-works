/* ================= 都市伝説 #004 カシマさん: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function kid(c, st, x, y, o = {}) { const d = o.flip ? 1 : -1, s = o.s || 1, bx = d < 0 ? x - 10 * s : x + 2 * s; R(c, bx, y - 22 * s, 8 * s, 10 * s, st.bag || '#1c1c24'); R(c, bx, y - 22 * s, 8 * s, 2 * s, shadeCol(st.bag || '#1c1c24', 1.5)); person(c, st, x, y, o); }
function duskSky(c, o = {}) { VG(c, 0, 0, W, 130, o.night ? ['#0a0c20', '#1c2040', '#3c3050'] : ['#3c2c58', '#a8546c', '#f0965c']); }
function school(c, t, o = {}) { duskSky(c, o); R(c, 20, 50, 280, 100, '#c8c0b0'); R(c, 20, 46, 280, 6, '#8c8478'); for (let f = 0; f < 3; f++) for (let k = 0; k < 9; k++) { const lit = o.lit && o.lit.includes(f * 9 + k); R(c, 30 + k * 30, 58 + f * 30, 20, 18, lit ? '#f8e8a0' : '#5c6c7c'); R(c, 39 + k * 30, 58 + f * 30, 2, 18, '#8c8478'); } R(c, 145, 24, 30, 26, '#c8c0b0'); E(c, 160, 36, 9, 9, '#f4f4f0'); L(c, 160, 36, 160, 30, '#2c2c2c'); L(c, 160, 36, 164, 36, '#2c2c2c'); R(c, 0, 150, W, 40, '#a88c64'); }
function corridor(c, t, o = {}) { R(c, 0, 0, W, H, o.dark ? '#3c3840' : '#c8bca4'); R(c, 0, 0, W, 30, o.dark ? '#2c2830' : '#b0a48c'); for (let i = 0; i < 4; i++) { R(c, 10 + i * 80, 40, 56, 50, o.dark ? '#5c4c6c' : '#f0b07c'); R(c, 37 + i * 80, 40, 2, 50, '#8c7c6c'); R(c, 10 + i * 80, 64, 56, 2, '#8c7c6c'); } R(c, 0, 100, W, 12, o.dark ? '#4c4440' : '#a8946c'); R(c, 0, 112, W, 80, o.dark ? '#5c5048' : '#b89c74'); for (let x = 0; x < W; x += 30) R(c, x, 112, 1, 80, o.dark ? '#4c4038' : '#a08460'); }
function futon(c, x, y, n = 4) { for (let i = 0; i < n; i++) { R(c, x + i * 50, y, 44, 22, '#e8e4dc'); R(c, x + i * 50, y - 4, 16, 8, '#f4f0e8'); E(c, x + i * 50 + 8, y - 6, 6, 5, '#f0c8a8'); R(c, x + i * 50 + 3, y - 12, 10, 4, '#141418'); } }
function toilet(c, t, o = {}) {
  const dk = o.dark ? 0.7 : 1, tile = o.dark ? '#7c8c94' : '#c8dce4', tile2 = o.dark ? '#6c7c84' : '#b0c4cc';
  R(c, 0, 0, W, H, tile); for (let y = 0; y < 150; y += 10) for (let x = (y / 10) % 2 ? 0 : 10; x < W; x += 20) R(c, x, y, 19, 9, tile2);
  R(c, 0, 140, W, 50, o.dark ? '#5c6468' : '#a8b4b8'); for (let x = 0; x < W; x += 16) R(c, x, 140, 1, 50, '#8c989c');
  const n = o.n || 4; for (let i = 0; i < n; i++) { const x = 120 + i * 50; R(c, x - 2, 44, 50, 4, '#8c7c6c'); const op = o.open === i ? 1 : (i === 2 && o.ajar) ? o.ajar : 0; R(c, x, 48, 44, 96, '#3c3440'); R(c, x + op * 34, 48, 44 - op * 34, 96, i === 2 && o.mark ? '#c8a8a0' : '#d8c8b8'); R(c, x + op * 34, 48, 2, 96, '#8c7c6c'); if (op < 0.8) E(c, x + 36, 96, 2, 2, '#5c5c5c'); TX(c, String(i + 1), x + 18, 54, '#8c7c6c', 16, null); }
  R(c, 14, 74, 80, 40, o.dark ? '#5c6c74' : '#a8c8d8'); R(c, 12, 72, 84, 2, '#8c8c8c'); R(c, 20, 118, 70, 10, '#e8ecf0'); R(c, 50, 112, 4, 6, '#a8a8a8');
  if (o.drip) { const u = fr(t * 0.9); E(c, 52, 120 + u * 4, 1, 1.5, '#8cc8f8'); }
}
function classroom(c, t) { R(c, 0, 0, W, H, '#c8b494'); R(c, 40, 34, 240, 70, '#2c4c3c'); R(c, 40, 104, 240, 4, '#8c6c44'); R(c, 0, 150, W, 40, '#a8885c'); for (let x = 0; x < W; x += 28) R(c, x, 150, 1, 40, '#8c6c44'); }
function lampPost(c, t, x, y = 160, o = {}) { R(c, x, y - 110, 3, 110, '#4c4c54'); R(c, x - 12, y - 112, 16, 3, '#4c4c54'); glow(c, x - 6, y - 106, 40, 60, '#f8d890', 0.3 + 0.03 * Math.sin(t * 2)); R(c, x - 10, y - 109, 9, 2, '#f8f0c0'); c.save(); c.globalAlpha = 0.12; PF(c, [x - 8, y - 106, x - 50, y, x + 36, y], '#f8e8b0'); c.restore(); }

/* ---- cast ---- */
const GIRLS = [['#e8a0b8', '#3c3c5c'], ['#8cc8e8', '#3c3c44'], ['#f8d870', '#5c4c3c'], ['#a8d88c', '#3c3c44']]
  .map(([top, pants], i) => ({ id: 'kg' + i, kid: true, top: 'dress', coat: top, pants, shoes: '#f4f4f0', skin: ['#f0c8a8', '#ecc4a0', '#f4d0b0'][i % 3], hair: '#141418', hairStyle: i % 2 ? 'curly' : 'long', bag: '#c81c2c' }));
const MIKA = { ...GIRLS[0], id: 'mk', coat: '#f0c8d8', hairStyle: 'long' };           // the girl in the story
const PJ = { ...MIKA, id: 'mkp', coat: '#c8d8f0', pants: '#c8d8f0' };                  // in pyjamas
const BOYS = [['#5c8cc8', 'short'], ['#c86c3c', 'short']].map(([col, hs], i) => ({ id: 'kb' + i, kid: true, top: 'tee', coat: col, pants: '#2c2c3c', shoes: '#f4f4f0', skin: '#f0c8a8', hair: '#141418', hairStyle: hs }));
const PARENT = { id: 'pr', top: 'sweater', coat: '#8c7c6c', pants: '#4c4c54', skin: '#e8c4a0', hair: '#2c2018', hairStyle: 'side' };

/* ---- カシマさん: long black hair to the waist, a pale face, a long grey-violet dress; below the knees she melts into the dark (32x64, anchor 16,63)
   o: { fade: 0..1 how much of the lower body is gone, arm: 'reach', noArms, half (hair over half the face), back } */
function kashimaSpr(o = {}) {
  return SPR('ksm2' + (o.arm || '') + (o.back ? 'b' : '') + (o.noArms ? 'n' : '') + (o.half ? 'h' : ''), 32, 64, c => {
    const dr = '#4c4458', dr2 = '#3c3448', hi = '#5c5468', sk = '#f0e8ec', hr = '#0c0a0e';
    PF(c, [9, 22, 23, 22, 27, 62, 5, 62], dr); PF(c, [16, 22, 23, 22, 27, 62, 16, 62], dr2); L(c, 10, 24, 7, 60, hi); for (let y = 30; y < 62; y += 7) L(c, 7, y, 25, y + 1, dr2);
    R(c, 12, 22, 8, 4, '#e8e0e8');
    if (!o.noArms) { if (o.arm === 'reach') { L(c, 23, 25, 30, 31, dr, 3); E(c, 30, 32, 1.8, 1.8, sk); } else { L(c, 23, 25, 24, 40, dr, 3); E(c, 24, 41, 1.8, 1.8, sk); } L(c, 9, 25, 8, 40, dr, 3); E(c, 8, 41, 1.8, 1.8, sk); }
    E(c, 16, 12, 7.5, 8.5, hr); R(c, 8, 11, 16, 6, hr); PF(c, [8, 14, 6, 40, 11, 38, 11, 18], hr); PF(c, [24, 14, 26, 40, 21, 38, 21, 18], hr);
    if (!o.back) {
      E(c, 16, 13, 5, 6.5, sk); E(c, 17, 14, 3.5, 5, '#e0d8e0'); R(c, 11, 6, 10, 4, hr);
      P(c, 14, 13, '#1c1418'); P(c, 18, 13, '#1c1418'); L(c, 13, 12, 15, 12, '#5c5060'); L(c, 17, 12, 19, 12, '#5c5060'); R(c, 15, 17, 3, 1, '#8c6c74');
      if (o.half) PF(c, [10, 8, 17, 8, 16, 20, 11, 22], hr);
    }
  });
}
// draw her; the lower body dissolves into dark smoke from the knees down (o.fade 0..1, o.a: alpha)
function kashima(c, x, y, o = {}) {
  const s = o.s || 1, f = o.fade == null ? 1 : o.fade, a = o.a == null ? 1 : o.a; if (a <= 0) return;
  c.save(); c.globalAlpha = a; c.beginPath(); c.rect(x - 24 * s, y - 70 * s, 48 * s, (70 - 26 * f) * s); c.clip(); blit(c, kashimaSpr(o), x, y, 16, 63, { flip: !!o.flip, s }); c.restore();
  const y0 = y - 26 * f * s, tt = performance.now() / 1000;
  for (let i = 0; i < 5; i++) { c.save(); c.globalAlpha = a * (0.45 - i * 0.08); E(c, x + Math.sin(tt * 1.3 + i) * 2 * s, y0 + (1 + i * 3) * s, (10 - i) * s, 3 * s, '#2c2438'); c.restore(); }
}
/* ---- places & props ---- */
// a child's bedroom at night: futon on tatami, a window with the moon, the door (o.dark: lights off; o.morning)
function bedroom(c, t, o = {}) {
  const night = !o.morning; R(c, 0, 0, W, H, night ? '#1c1c2c' : '#e8dcc4'); R(c, 0, 120, W, 70, night ? '#3c3a2c' : '#c8b88c'); for (let x = 0; x < W; x += 40) L(c, x, 120, x - 20, 190, night ? '#2c2a20' : '#a8986c');
  R(c, 30, 30, 70, 56, night ? '#0c1028' : '#a8d0f0'); R(c, 28, 28, 74, 3, '#5c4c3c'); R(c, 28, 86, 74, 3, '#5c4c3c'); R(c, 64, 30, 2, 56, '#5c4c3c');
  if (night) { E(c, 48, 46, 7, 7, '#e8ecf0'); glow(c, 48, 46, 20, 20, '#e8ecf0', 0.15); } else glow(c, 66, 60, 60, 40, '#f8f0c0', 0.3);
  R(c, 250, 30, 44, 90, night ? '#2c2430' : '#a8845c'); E(c, 286, 80, 2, 2, '#c8a860');
  R(c, 120, 128, 120, 22, night ? '#c8c8d8' : '#f4f0e8'); R(c, 120, 124, 34, 10, night ? '#e8e8f0' : '#ffffff'); R(c, 150, 126, 90, 18, night ? '#8c9cc8' : '#c8d8f0');
  if (night) { c.save(); c.globalAlpha = 0.25; PF(c, [30, 30, 100, 30, 200, 130, 120, 130], '#c8d0e8'); c.restore(); }
}
function sleeper(c, x, y, o = {}) { E(c, x, y, 7, 6, o.skin || '#f0c8a8'); R(c, x - 7, y - 7, 14, 5, '#141418'); if (o.awake) { P(c, x - 3, y, '#141018'); P(c, x + 2, y, '#141018'); } else { L(c, x - 4, y, x - 1, y, '#6c4c3c'); L(c, x + 1, y, x + 4, y, '#6c4c3c'); } }
// an old station at night (the dream): platform, a bench, lamps, the tracks running into the dark (o.lit: number of lamps still on)
function nightStation(c, t, o = {}) {
  VG(c, 0, 0, W, 120, ['#06060e', '#0c0c1c', '#1c1c2c']); R(c, 0, 92, W, 30, '#141420');
  const lit = o.lit == null ? 4 : o.lit; for (let i = 0; i < 4; i++) { const x = 40 + i * 80; R(c, x, 40, 3, 84, '#3c3c44'); R(c, x - 8, 38, 18, 4, '#3c3c44'); if (i < lit) { glow(c, x + 1, 46, 30, 22, '#f8e8b0', 0.3 + 0.03 * Math.sin(t * 3 + i)); R(c, x - 5, 42, 12, 3, '#f8f0c8'); } }
  R(c, 0, 122, W, 28, '#5c5850'); R(c, 0, 122, W, 3, '#e8d870'); for (let x = 0; x < W; x += 20) R(c, x, 125, 1, 25, '#4c4840');
  R(c, 0, 150, W, 40, '#1c1814'); for (let x = -10; x < W; x += 16) R(c, x, 156, 10, 3, '#3c3428'); R(c, 0, 154, W, 2, '#8c8c94'); R(c, 0, 162, W, 2, '#8c8c94');
  R(c, 230, 64, 60, 16, '#e8e4d8'); R(c, 232, 66, 56, 12, '#f4f0e8'); TX(c, '　？　', 236, 64, '#2c2c2c', 16, null);
  if (o.bench !== false) { R(c, 150, 104, 60, 4, '#5c4030'); R(c, 150, 96, 60, 3, '#5c4030'); R(c, 154, 108, 3, 14, '#3c3028'); R(c, 203, 108, 3, 14, '#3c3028'); }
}
function oldTrain(c, x, y, o = {}) { R(c, x, y - 40, 170, 34, '#2c2c2c'); R(c, x + 170, y - 30, 30, 24, '#1c1c1c'); E(c, x + 185, y - 40, 6, 10, '#1c1c1c'); for (let i = 0; i < 6; i++) R(c, x + 10 + i * 26, y - 34, 16, 12, o.lit ? '#f8e0a0' : '#5c5c64'); for (let k = 0; k < 7; k++) E(c, x + 14 + k * 26, y - 4, 6, 6, '#141414'); if (o.smoke) for (let i = 0; i < 5; i++) { const u = fr(o.smoke * 0.5 + i / 5); E(c, x + 185 - u * 60, y - 50 - u * 30, 6 + u * 10, 4 + u * 6, DA('#c8c8c8', 0.4 * (1 - u))); } }
function handprint(c, x, y, s = 1, a = 1, col = '#5c6c7c') { c.save(); c.globalAlpha = a; E(c, x, y, 3 * s, 3.5 * s, col); for (let k = 0; k < 4; k++) R(c, x - 3 * s + k * 2 * s, y - 7 * s, 1.2 * s, 4 * s, col); L(c, x + 3 * s, y, x + 5 * s, y - 3 * s, col, 1.2 * s); c.restore(); }
function phone(c, x, y, t, ring) { R(c, x, y, 40, 22, '#1c1c1c'); E(c, x + 20, y + 12, 7, 7, '#3c3c3c'); for (let k = 0; k < 10; k++) P(c, x + 20 + Math.cos(k * 0.63) * 5, y + 12 + Math.sin(k * 0.63) * 5, '#c8c8c8'); R(c, x - 2, y - 6 + (ring ? Math.round(Math.sin(t * 40)) : 0), 44, 6, '#1c1c1c'); }
function spellPlate(c, x, y, big, small, icon, a = 1) { c.save(); c.globalAlpha = a; R(c, x, y, 84, 60, '#f0e8d0'); R(c, x, y, 84, 3, '#8c1c1c'); TX(c, big, x + 34, y + 6, '#8c1c1c', 16, null); TX(c, small, x + 8, y + 36, '#2c2c2c', 16, null); c.restore(); if (icon === 'mask') { E(c, x + 16, y + 16, 8, 9, '#f4f0e8'); ER(c, x + 16, y + 16, 8, 9, '#5c5c5c'); R(c, x + 12, y + 14, 3, 2, '#141414'); R(c, x + 18, y + 14, 3, 2, '#141414'); } else if (icon === 'skull') { E(c, x + 16, y + 15, 7, 7, '#e8e4d8'); R(c, x + 13, y + 20, 7, 5, '#e8e4d8'); R(c, x + 12, y + 13, 3, 3, '#141414'); R(c, x + 18, y + 13, 3, 3, '#141414'); } else { PF(c, [x + 9, y + 10, x + 12, y + 4, x + 14, y + 10], '#8c1c1c'); PF(c, [x + 18, y + 10, x + 20, y + 4, x + 23, y + 10], '#8c1c1c'); E(c, x + 16, y + 16, 7, 7, '#5c1c1c'); P(c, x + 13, y + 15, '#f8e870'); P(c, x + 19, y + 15, '#f8e870'); } }

/* ---- portraits (48x48) ---- */
function kashimaFace(o = {}) { // pale, long black hair falling over one side, hollow dark eyes; calm and sad, not gory
  return SPR('ksF' + (o.blink || 0), 48, 48, c => {
    PF(c, [4, 48, 8, 36, 40, 36, 44, 48], '#2c2430'); E(c, 24, 22, 16, 18, '#0c0a0e'); R(c, 8, 22, 32, 26, '#0c0a0e');
    E(c, 25, 24, 10, 12, '#d8d0d8'); E(c, 26, 25, 8.5, 10.5, '#e8e0e4'); R(c, 21, 34, 8, 6, '#c8c0c8');
    PF(c, [12, 8, 30, 8, 26, 16, 20, 30, 16, 40, 12, 40], '#0c0a0e'); for (let i = 0; i < 4; i++) L(c, 18 + i * 2, 12, 15 + i * 2, 36, '#1c181c');
    if (o.blink === 2) L(c, 27, 22, 32, 22, '#2c2028'); else { E(c, 29.5, 22, 3, 2, '#2c2430'); R(c, 28, 21, 3, 2, '#08060a'); P(c, 29, 21, '#8c8c9c'); }
    L(c, 27, 19, 32, 18, '#3c3440'); E(c, 30, 25, 3, 1, '#c8b8c4'); R(c, 26, 30, 5, 1, '#8c6c74');
  });
}
function girlFace(o = {}) { // the girl: long black hair, wide eyes
  return SPR('grF' + (o.blink || 0) + (o.scared ? 's' : ''), 48, 48, c => {
    const sk = '#f0c8a8'; PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#c8d8f0'); R(c, 20, 33, 8, 6, sk);
    E(c, 24, 20, 14, 15, '#141418'); R(c, 10, 20, 28, 22, '#141418'); E(c, 24, 23, 11, 12, sk);
    R(c, 13, 9, 22, 6, '#141418'); for (let x = 14; x < 35; x += 3) R(c, x, 14, 2, 2, '#141418');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 22, x0 + 4, 22, '#2c2020'); continue; } R(c, x0, 20, 4, o.scared ? 5 : 4, '#141018'); P(c, x0 + 1, 20, '#f8f8f8'); }
    if (o.scared) { L(c, 16, 17, 21, 18, '#141418'); L(c, 27, 18, 32, 17, '#141418'); E(c, 24, 31, 2, 2, '#7c3c3c'); } else R(c, 22, 31, 4, 1, '#a8645c');
    E(c, 16, 28, 2, 1, '#f0b0a8'); E(c, 32, 28, 2, 1, '#f0b0a8');
  });
}
const PORTRAITS = { kashima: p => withMouth('pmks', kashimaFace({ blink: p.blink }), p, 28, 30), shoujo: p => withMouth('pmsj', girlFace({ blink: p.blink, scared: true }), p, 24, 31) };
function frame(c, x, y, w, h, col) { R(c, x, y, w, 2, col); R(c, x, y + h - 2, w, 2, col); R(c, x, y, 2, h, col); R(c, x + w - 2, y, 2, h, col); }
