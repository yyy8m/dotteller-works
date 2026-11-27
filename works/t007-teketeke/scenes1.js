/* ================= 都市伝説 #007 テケテケ: helpers, places, props, cast & portraits ================= */
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


/* ---- places ---- */
// a path beside the railway at dusk/night: the fence, power poles, the embankment (o.night, o.v scroll)
function lineRoad(c, t, o = {}) {
  const n = !!o.night, v = o.v || 0;
  VG(c, 0, 0, W, 120, n ? ['#04040c', '#0c0c1c', '#1c1428'] : ['#3c2c4c', '#8c4c4c', '#e8905c']);
  for (let i = 0; i < 8; i++) { const x = ((i * 50 - t * v * 0.3) % 400 + 400) % 400 - 40; R(c, x, 70 + (i % 3) * 6, 36, 50 - (i % 3) * 6, n ? '#0c0c14' : '#2c1c2c'); }
  R(c, 0, 108, W, 14, n ? '#14141c' : '#3c2c2c'); R(c, 0, 110, W, 2, '#6c6c74'); R(c, 0, 116, W, 2, '#6c6c74'); for (let i = 0; i < 20; i++) { const x = ((i * 18 - t * v) % 360 + 360) % 360 - 20; R(c, x, 112, 8, 3, '#3c3028'); }
  for (let i = 0; i < 16; i++) { const x = ((i * 22 - t * v) % 352 + 352) % 352 - 16; R(c, x, 122, 2, 14, n ? '#3c3c44' : '#5c4c4c'); } R(c, 0, 124, W, 2, n ? '#3c3c44' : '#5c4c4c');
  R(c, 0, 136, W, 54, n ? '#1c1c24' : '#4c3c3c');
  for (let i = 0; i < 3; i++) { const x = ((i * 130 - t * v * 0.8) % 390 + 390) % 390 - 20; R(c, x, 40, 3, 96, n ? '#1c1c1c' : '#2c1c1c'); R(c, x - 8, 44, 19, 2, n ? '#1c1c1c' : '#2c1c1c'); }
}
// a railway crossing with barrier and flashing lights (o.down, o.snow, o.night)
function crossing(c, t, o = {}) {
  const n = !!o.night; VG(c, 0, 0, W, 120, o.snow ? ['#5c6c8c', '#8c9cb0', '#c8d0d8'] : n ? ['#04040c', '#0c0c1c', '#1c1428'] : ['#3c2c4c', '#8c4c4c', '#e8905c']);
  R(c, 0, 110, W, 80, o.snow ? '#e8ecf0' : n ? '#1c1c24' : '#4c3c3c'); R(c, 120, 110, 80, 80, o.snow ? '#d8dce4' : '#3c3c44'); R(c, 0, 132, W, 3, '#8c8c94'); R(c, 0, 146, W, 3, '#8c8c94'); for (let x = -8; x < W; x += 18) R(c, x, 135, 10, 11, o.snow ? '#a8a8b0' : '#3c3028');
  const ph = Math.floor(t * 3) % 2; R(c, 90, 60, 4, 50, '#e8e8e0'); R(c, 84, 56, 16, 4, '#2c2c2c'); for (const [dx, on] of [[-6, ph], [12, !ph]]) { E(c, 92 + dx, 66, 5, 5, on && o.flash ? '#ff3030' : '#4c1c1c'); if (on && o.flash) glow(c, 92 + dx, 66, 16, 14, '#ff3030', 0.4); }
  for (let i = 0; i < 6; i++) R(c, 96 + i * 4, 62, 3, 3, i % 2 ? '#141414' : '#f8d838');
  if (o.down) { for (let i = 0; i < 9; i++) R(c, 94 + i * 12, 100, 12, 4, i % 2 ? '#141414' : '#f8d838'); } else { c.save(); c.translate(94, 100); c.rotate(-1.4); for (let i = 0; i < 9; i++) R(c, i * 12, 0, 12, 4, i % 2 ? '#141414' : '#f8d838'); c.restore(); }
  if (o.snow) for (let i = 0; i < 50; i++) { const x = (i * 37 + t * 15) % W, y = (i * 23 + t * 30) % 180; P(c, x, y, '#ffffff'); }
}
// a train passing (x = nose)
function train(c, x, y, o = {}) { R(c, x - 400, y - 46, 400, 40, '#c8c8c0'); R(c, x - 400, y - 30, 400, 6, '#3c6cac'); for (let i = 0; i < 12; i++) R(c, x - 390 + i * 32, y - 42, 22, 10, o.lit ? '#f8e8a0' : '#2c3c5c'); R(c, x - 10, y - 46, 10, 40, '#a8a8a0'); E(c, x - 4, y - 14, 3, 3, '#f8f0c0'); for (let i = 0; i < 8; i++) E(c, x - 380 + i * 50, y - 4, 5, 5, '#141414'); if (o.lit) glow(c, x + 10, y - 14, 40, 14, '#f8f0c0', 0.5); }
// a school corridor (o.dusk orange windows)
function corridor(c, t, o = {}) { R(c, 0, 0, W, H, '#c8c4b4'); R(c, 0, 0, W, 12, '#a8a494'); for (let i = 0; i < 5; i++) { R(c, 10 + i * 64, 24, 48, 56, o.dusk ? '#e8905c' : '#a8c8e0'); R(c, 32 + i * 64, 24, 3, 56, '#8c8474'); } R(c, 0, 84, W, 4, '#8c8474'); R(c, 0, 124, W, 66, '#8c8070'); for (let x = 0; x < W; x += 40) R(c, x, 124, 1, 66, '#7c7060'); if (o.dusk) dim(c, 0.25, '#3c1c1c'); }
// a classroom with desks (kids drawn by the scene)
function classroom(c, t, o = {}) { R(c, 0, 0, W, H, '#d8cca8'); R(c, 40, 24, 240, 50, '#2c4c3c'); R(c, 40, 74, 240, 4, '#8c6c44'); R(c, 0, 124, W, 66, '#a8885c'); for (let i = 0; i < 4; i++) { R(c, 30 + i * 74, 116, 40, 6, '#8c6c44'); R(c, 34 + i * 74, 122, 3, 20, '#6c4c30'); R(c, 63 + i * 74, 122, 3, 20, '#6c4c30'); } if (o.night) { dim(c, 0.6, '#06060c'); } }
// a footbridge over the road: stairs on the left, a deck across
function footbridge(c, t, o = {}) { VG(c, 0, 0, W, 130, ['#04040c', '#0c0c1c', '#1c1428']); R(c, 0, 128, W, 62, '#1c1c24'); R(c, 0, 150, W, 2, '#e8e8e0'); R(c, 40, 50, 260, 8, '#5c6c7c'); R(c, 40, 42, 260, 2, '#8c9cac'); for (let x = 44; x < 300; x += 12) R(c, x, 42, 1, 8, '#8c9cac'); R(c, 280, 58, 6, 92, '#5c6c7c'); for (let i = 0; i < 10; i++) R(c, 40 - i * 4 + 40, 58 + i * 9, 30, 3, '#5c6c7c'); R(c, 50, 58, 4, 92, '#4c5c6c'); lampPost(c, t, 200, 150); }
// the snowy field at night
function snowField(c, t) { VG(c, 0, 0, W, 120, ['#1c2438', '#3c4c68', '#6c7c98']); R(c, 0, 110, W, 80, '#d8dce8'); for (let i = 0; i < 60; i++) { const x = (i * 37 + t * 10) % W, y = (i * 23 + t * 24) % 190; P(c, x, y, '#ffffff'); } }

/* ---- the upper-body figure (40x36, anchor 20,35 = where the arms touch the ground); never bloody: a dark dress, long hair hiding the face ---- */
function tekeSpr(o = {}) {
  return SPR('tk' + (o.f || 0) + (o.face ? 'f' : ''), 40, 36, c => {
    const f = o.f || 0, sk = '#d8d0cc';
    PF(c, [12, 34, 14, 16, 26, 16, 28, 34], '#2c2c3c'); R(c, 10, 32, 20, 3, '#1c1c24');
    const la = f ? [4, 34] : [8, 34], ra = f ? [36, 34] : [32, 34]; L(c, 14, 18, la[0], la[1], sk, 3); L(c, 26, 18, ra[0], ra[1], sk, 3);
    E(c, 20, 10, 7, 8, sk); PF(c, [11, 4, 20, 0, 29, 4, 31, 30, 24, 22, 20, 26, 16, 22, 9, 30], '#0c0c10');
    if (o.face) { P(c, 17, 10, '#f8f8f8'); P(c, 18, 10, '#141414'); } else { R(c, 16, 8, 8, 10, '#0c0c10'); P(c, 18, 11, '#c8c8c8'); }
  });
}
function teke(c, t, x, y, o = {}) { const f = Math.floor(t * (o.run ? 10 : 3)) & 1; c.save(); if (o.a != null) c.globalAlpha = o.a; blit(c, tekeSpr({ f, face: o.face }), x, y, 20, 35, { flip: !!o.flip, s: o.s || 1 }); c.restore(); }

/* ---- cast ---- */
const SHONEN = { id: 'sn', kid: true, top: 'uniform', coat: '#1c2434', pants: '#1c2434', shoes: '#141414', skin: '#e8c4a0', hair: '#141418', hairStyle: 'short' };
const ONNA = { id: 'on', top: 'jacket', coat: '#6c4c5c', shirt: '#e8e4d8', pants: '#3c3c44', shoes: '#2c2c2c', skin: '#f0c8a8', hair: '#1c1418', hairStyle: 'long' };
const KIDS = ['#2c3c5c', '#2c3c5c', '#2c3c5c', '#2c3c5c'].map((col, i) => ({ id: 'kd' + i, kid: true, top: i % 2 ? 'dress' : 'uniform', coat: col, pants: col, shoes: '#141414', skin: ['#f0c8a8', '#e8c4a0'][i % 2], hair: '#1c1418', hairStyle: ['short', 'long', 'side', 'long'][i] }));

/* ---- portraits (48x48) ---- */
function tekeFace(o = {}) { // long black hair over a pale face, one eye showing through
  return SPR('tkF' + (o.blink || 0) + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.dark ? '#a8a0a0' : '#e0d8d4'; PF(c, [4, 48, 10, 38, 38, 38, 44, 48], '#2c2c3c');
    E(c, 24, 21, 16, 18, '#0c0c10'); E(c, 24, 23, 10, 12, sk); PF(c, [10, 8, 24, 2, 38, 8, 40, 46, 30, 30, 26, 40, 22, 30, 18, 42, 8, 46], '#0c0c10');
    if (o.blink !== 2) { E(c, 28, 22, 3, 2.5, '#f8f8f8'); E(c, 28, 22, 1.5, 1.5, o.dark ? '#c81818' : '#141414'); } else L(c, 25, 22, 31, 22, '#2c2c2c');
    R(c, 26, 31, 4, 1, '#6c4c4c'); if (o.dark) { c.save(); c.globalAlpha = 0.3; R(c, 0, 0, 48, 48, '#0c0410'); c.restore(); }
  });
}
function shonenFace(o = {}) { // a junior-high boy in a gakuran, short black hair
  return SPR('snF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e8c4a0'; PF(c, [4, 48, 10, 38, 38, 38, 44, 48], '#1c2434'); R(c, 21, 32, 6, 7, sk); E(c, 24, 22, 11, 13, sk); PF(c, [12, 18, 12, 9, 18, 6, 32, 6, 36, 10, 36, 18, 32, 12, 16, 13], '#141418');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 22, x0 + 4, 22, '#2c2020'); continue; } R(c, x0, 20, 4, 5, '#141018'); P(c, x0 + 1, 20, '#f8f8f8'); } L(c, 16, 17, 21, 16, '#141418'); L(c, 27, 16, 32, 17, '#141418'); E(c, 24, 31, 2.5, 2, '#8c4c4c');
  });
}
const PORTRAITS = { teke: p => withMouth('pmtk', tekeFace({ blink: p.blink }), p, 28, 31, 4), shonen: p => withMouth('pmsn', shonenFace({ blink: p.blink }), p, 24, 31) };
