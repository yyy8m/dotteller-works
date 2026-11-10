/* ================= 記録 #005 三億円事件: cast, vehicles & places ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) return fn(c, t, S); return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function bigFace(c, spr, cx, cy, s, a, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(a < 1 ? ditherFade(pc, a, id + 'd') : pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }

/* ---- people (modFig, 36x58, feet anchor FIG_AX2/FIG_AY2) ---- */
const FAKE = { id: 'fake', top: 'uniform', coat: '#34405c', pants: '#2c3448', shoes: '#141414', skin: '#e0b090', hair: '#1c1814', hat: 'helmet' };
const DRIVER = { id: 'drv', top: 'jacket', coat: '#3c4048', shirt: '#ece8e0', tie: '#5c2c2c', pants: '#2c2c34', skin: '#dcac88', hair: '#3c3430', hairStyle: 'side', glasses: true };
const BANKERS = [
  { id: 'bk1', top: 'jacket', coat: '#2c3448', shirt: '#f0ece4', tie: '#3c3c6c', pants: '#24242c', skin: '#e8c0a0', hair: '#1c1814', hairStyle: 'side' },
  { id: 'bk2', top: 'jacket', coat: '#4c4c54', shirt: '#f0ece4', tie: '#6c2c2c', pants: '#2c2c34', skin: '#e0b090', hair: '#2c2420' },
  { id: 'bk3', top: 'jacket', coat: '#3c342c', shirt: '#e8e4dc', tie: '#2c4c3c', pants: '#2c2824', skin: '#e8c0a0', hair: '#1c1814', glasses: true },
];
const WORKERS = ['#6c7c8c', '#5c6c7c', '#7c8494', '#68788a', '#5c6878'].map((col, i) => ({ id: 'wk' + i, top: 'shirt', coat: col, pants: '#3c4048', skin: ['#e8c0a0', '#e0b090', '#dcac88', '#e8c4a4', '#d8a884'][i], hair: '#1c1814', hairStyle: ['side', 'short', 'short', 'side', 'curly'][i], hat: i % 2 ? 'cap' : null, hatCol: '#4c5c6c', glasses: i === 3 }));
const COPS = [0, 1, 2, 3].map(i => ({ id: 'cp' + i, top: 'uniform', coat: '#2c3448', pants: '#24283c', skin: ['#e0b090', '#e8c0a0', '#dcac88', '#e0b490'][i], hair: '#1c1814', hat: 'police', hatCol: '#1c2438' }));

/* ---- vehicles (side view, face right; anchor at the ground under the middle) ---- */
// 1964 Nissan Cedric-type sedan, black, chrome trim (100x36, anchor 50,35)
function cedricSpr(col = '#16181e', o = {}) {
  return cached('ced' + col + (o.open ? 'o' : '') + (o.lit ? 'l' : ''), () => SPR(null, 100, 36, c => {
    const hi = shadeCol(col, 2.2), mid = shadeCol(col, 1.5);
    PF(c, [4, 20, 10, 14, 30, 13, 36, 3, 74, 3, 82, 13, 94, 14, 98, 20, 98, 28, 4, 28], col); // body + cabin
    PF(c, [39, 5, 56, 5, 56, 13, 34, 13], '#5c6c80'); PF(c, [59, 5, 72, 5, 79, 13, 59, 13], '#5c6c80'); // windows
    L(c, 40, 6, 44, 6, '#a8b8c8'); L(c, 61, 6, 66, 6, '#a8b8c8'); R(c, 56, 4, 3, 10, col); // glass shine, B pillar
    L(c, 4, 18, 98, 18, '#c8ccd4'); L(c, 10, 14, 30, 14, mid); L(c, 82, 14, 94, 14, mid); R(c, 34, 3, 40, 1, mid); // chrome strip, highlights
    R(c, 2, 24, 8, 4, '#c8ccd4'); R(c, 92, 24, 8, 4, '#c8ccd4'); R(c, 95, 17, 3, 4, o.lit ? '#fff8d0' : '#e8e0b0'); R(c, 4, 17, 2, 4, '#c82828'); // bumpers, lights
    for (const x of [22, 78]) { E(c, x, 28, 7, 7, '#0c0c10'); E(c, x, 28, 3.5, 3.5, '#a8acb4'); P(c, x - 1, 27, '#e8ecf4'); }
    PF(c, [14, 21, 30, 21, 32, 24, 12, 24], hi); L(c, 57, 14, 57, 27, shadeCol(col, 0.6)); L(c, 34, 14, 34, 27, shadeCol(col, 0.6)); // door lines
    if (o.open) { PF(c, [58, 14, 80, 14, 84, 30, 58, 30], shadeCol(col, 0.7)); }
  }));
}
// small 1960s Corolla-type car (84x30, anchor 42,29)
function corollaSpr(col) {
  return cached('cor' + col, () => SPR(null, 84, 30, c => {
    PF(c, [3, 16, 8, 11, 24, 10, 30, 2, 60, 2, 68, 10, 80, 11, 82, 16, 82, 23, 3, 23], col);
    PF(c, [33, 4, 46, 4, 46, 10, 28, 10], '#5c6c80'); PF(c, [49, 4, 58, 4, 64, 10, 49, 10], '#5c6c80'); R(c, 46, 3, 3, 8, col);
    L(c, 3, 15, 82, 15, '#c8ccd4'); R(c, 2, 20, 6, 3, '#c8ccd4'); R(c, 77, 20, 6, 3, '#c8ccd4'); R(c, 79, 14, 2, 3, '#e8e0b0'); R(c, 3, 14, 2, 3, '#c82828');
    for (const x of [18, 66]) { E(c, x, 23, 6, 6, '#0c0c10'); E(c, x, 23, 3, 3, '#a8acb4'); }
    L(c, 10, 11, 24, 11, shadeCol(col, 1.5)); L(c, 30, 3, 58, 3, shadeCol(col, 1.5));
  }));
}
// the fake police bike: a stolen motorcycle painted white, a red lamp, a megaphone, a cookie tin as the document box (60x40, anchor 30,39)
function bikeSpr(o = {}) {
  const rider = !!o.rider, k = 'bike' + (rider ? 'r' : '') + (o.lean ? 'l' : '');
  // 60x50 with 10 px of headroom so the rider's helmet is never cut off (anchor 30,49)
  return cached(k, () => SPR(null, 60, 50, c => { c.translate(0, 10);
    for (const x of [12, 46]) { E(c, x, 32, 7, 7, '#141414'); E(c, x, 32, 4.5, 4.5, '#5c5c64'); E(c, x, 32, 1.5, 1.5, '#c8ccd4'); for (let a = 0; a < 6; a++) L(c, x, 32, x + Math.cos(a) * 4, 32 + Math.sin(a) * 4, '#8c8c94'); }
    L(c, 46, 32, 40, 14, '#c8ccd4', 2); L(c, 12, 32, 22, 22, '#3c3c44', 2); // fork, swingarm
    PF(c, [18, 22, 30, 16, 42, 16, 44, 22, 36, 26, 20, 26], '#f4f4f0'); PF(c, [24, 18, 38, 16, 40, 19, 26, 21], '#ffffff'); // white tank & body
    R(c, 22, 24, 16, 6, '#5c5c64'); R(c, 24, 26, 10, 3, '#3c3c44'); L(c, 22, 30, 4, 30, '#8c8c94', 2); // engine, exhaust
    PF(c, [8, 18, 22, 16, 24, 19, 8, 21], '#2c2c2c'); // seat
    R(c, 2, 10, 12, 10, '#f0f0ec'); R(c, 2, 10, 12, 2, '#d8d8d4'); L(c, 4, 13, 12, 13, '#c8c4bc'); // cookie tin as a document box (taped)
    R(c, 6, 9, 2, 12, '#a89c7c');
    L(c, 40, 14, 44, 8, '#c8ccd4', 2); L(c, 44, 8, 50, 8, '#2c2c2c', 2); // handlebar
    E(c, 50, 16, 3.5, 3, '#e8e0b0'); R(c, 46, 6, 5, 4, '#e81818'); P(c, 47, 6, '#ff9090'); // headlight, red lamp
    PF(c, [52, 11, 58, 8, 58, 16, 52, 14], '#f4f4f0'); // megaphone painted white
    if (rider) {
      const lean = o.lean ? 3 : 0;
      L(c, 26, 18, 34, 26, '#2c3448', 4); L(c, 34, 26, 36, 34, '#2c3448', 4); R(c, 34, 33, 5, 4, '#141414'); // leg, boot
      PF(c, [20 + lean, 4, 30 + lean, 2, 32, 18, 22, 18], '#34405c'); L(c, 28 + lean, 6, 44, 9, '#34405c', 3); E(c, 44, 9, 1.6, 1.6, '#e0b090'); // body, arm
      R(c, 24 + lean, 10, 8, 2, '#f0f0ec'); // white cross-belt
      E(c, 27 + lean, -2, 5, 4.5, '#f4f4f0'); R(c, 23 + lean, -1, 9, 2, '#3c3c44'); R(c, 29 + lean, -1, 3, 2, '#8cb4d8'); E(c, 30 + lean, 2, 2.5, 2, '#e0b090'); // helmet, goggles, chin
    }
  }));
}
// the green car-cover caught on the back of the bike, flapping behind it (drawn behind the bike: x = bike's rear)
function trailingSheet(c, x, y, t, dir = -1, len = 30) {
  const pts = []; for (let i = 0; i <= 6; i++) { const u = i / 6; pts.push([x + dir * u * len, y - 4 + Math.sin(t * 14 + u * 5) * (1 + u * 4) + u * 6]); }
  const poly = pts.map(p => [p[0], p[1] - 3]).concat(pts.slice().reverse().map(p => [p[0], p[1] + 4 + 3 * Math.sin(t * 9 + p[0])]));
  PF(c, poly.flat(), '#3c6c3c'); PL(c, pts.flat(), '#5c8c4c');
}
// smoke & flame of the flare under the car
function flareSmoke(c, x, y, t, k = 1, seed = 3) {
  for (let i = 0; i < 18; i++) { const u = fr(t * 0.35 + i / 18), sx = x + Math.sin(i * 2.3 + t) * 10 * u + (i % 3 - 1) * 8 * u, sy = y - u * 70 * k; if (u < 0.97) E(c, sx, sy, 3 + u * 16, 2 + u * 9, DA(i % 4 ? '#d8d8d4' : '#f4f4f0', 0.75 * (1 - u) * k)); }
  flame(c, x, y + 2, 3, t, seed); glow(c, x, y, 16, 8, '#f86020', 0.5 * k);
}

/* ---- places ---- */
// grey winter morning sky over the Tama area
function wintrySky(c, t, h = 120) { VG(c, 0, 0, W, h, ['#8c98a8', '#a8b0bc', '#c4c8cc']); for (let i = 0; i < 4; i++) { const x = mod(i * 97 - t * 3, W + 120) - 60; E(c, x, 20 + i * 9, 50, 8, DA('#d4d8dc', 0.5)); } }
// the long concrete wall of Fuchu Prison along Gakuen-dori, with a watchtower
function prisonWall(c, ox, y = 116, o = {}) {
  R(c, 0, y - 46, W, 46, '#9c9890'); for (let x = -mod(ox, 24); x < W; x += 24) R(c, x, y - 46, 1, 46, '#8c8880'); R(c, 0, y - 48, W, 3, '#b4b0a8'); R(c, 0, y - 4, W, 4, '#7c7870');
  for (let i = 0; i < 40; i++) P(c, mod(i * 53 - ox, W), y - 40 + (i * 13 % 34), '#a8a49c');
  if (o.tower != null) { const tx = mod(o.tower - ox, W + 200) - 100; R(c, tx - 8, y - 92, 16, 46, '#a8a49c'); R(c, tx - 13, y - 104, 26, 13, '#8c8880'); R(c, tx - 15, y - 106, 30, 3, '#6c6860'); R(c, tx - 9, y - 101, 18, 6, '#3c4450'); R(c, tx - 8, y - 92, 2, 46, '#b8b4ac'); }
}
function roadSide(c, ox, y = 116) { // the asphalt road and its centre line, a sidewalk with roadside trees
  R(c, 0, y, W, 50, '#5c5c60'); R(c, 0, y, W, 2, '#8c8c8c'); for (let x = -mod(ox * 1.0, 40); x < W; x += 40) R(c, x, y + 24, 20, 2, '#e8e4d8'); R(c, 0, y + 48, W, 3, '#8c8c8c');
  R(c, 0, y + 51, W, 20, '#7c7c74');
  for (let i = 0; i < 6; i++) { const x = mod(i * 64 + 20 - ox * 1.3, W + 80) - 40; L(c, x, y + 66, x, y + 40, '#3c2c20', 3); for (let k = 0; k < 6; k++) L(c, x, y + 46 - k * 2, x + (k % 2 ? 10 : -10) - k, y + 36 - k * 3, '#4c3c2c'); } // bare winter trees (front)
}
// a factory with saw-tooth roofs and a chimney (Toshiba's Fuchu works)
function factory(c, t) {
  for (let i = 0; i < 6; i++) { const x = 20 + i * 40; PF(c, [x, 96, x + 30, 70, x + 30, 96], '#8c949c'); PF(c, [x + 30, 70, x + 40, 96, x + 30, 96], '#6c747c'); R(c, x + 30, 74, 2, 22, '#c8d8e8'); }
  R(c, 10, 96, 270, 40, '#a8aca8'); for (let x = 20; x < 270; x += 18) R(c, x, 104, 10, 12, '#5c6c7c');
  R(c, 284, 30, 12, 106, '#8c8480'); R(c, 282, 30, 16, 4, '#6c6460'); for (let i = 0; i < 6; i++) { const u = fr(t * 0.2 + i / 6); E(c, 292 + u * 20, 26 - u * 30, 4 + u * 10, 3 + u * 5, DA('#c8ccd0', 0.6 * (1 - u))); }
  R(c, 266, 50, 22, 44, '#3c4450'); R(c, 266, 50, 2, 44, '#5c6878'); TX(c, '東', 269, 52, '#f4f0e8', 16, null); TX(c, '芝', 269, 72, '#f4f0e8', 16, null); // the company name hung on the chimney
}
// the bank: a 1960s branch with a sign
function bankFront(c, t, o = {}) {
  R(c, 0, 20, W, 110, '#c8c0b0'); for (let x = 0; x < W; x += 40) R(c, x, 20, 2, 110, '#b4ac9c');
  R(c, 118, 30, 196, 22, '#2c3c5c'); R(c, 118, 30, 196, 2, '#4c5c7c'); TX(c, '日本信託銀行 国分寺支店', 216 - textSpr('日本信託銀行 国分寺支店', 16, '#f4f0e8').width / 2, 33, '#f4f0e8', 16, null);
  R(c, 120, 66, 80, 64, '#3c4450'); R(c, 124, 70, 34, 60, '#6c7c8c'); R(c, 162, 70, 34, 60, '#6c7c8c'); L(c, 130, 74, 136, 74, '#a8b8c8');
  for (const x of [50, 220]) { R(c, x, 66, 52, 40, '#5c6c80'); R(c, x + 25, 66, 2, 40, '#c8c0b0'); }
  R(c, 0, 130, W, 40, '#6c6c6c'); R(c, 0, 130, W, 2, '#9c9c9c');
}

/* ---- portraits (48x48) ---- */
// the fake officer: white helmet, goggles, chin strap — the face itself stays in shadow (no one could describe it)
function fakeFace(o = {}) {
  return SPR('fakeF' + (o.blink || 0) + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.dark ? '#5c4c44' : '#d8a884', sk2 = o.dark ? '#3c302c' : '#a87c5c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#34405c'); PF(c, [16, 37, 24, 44, 32, 37], '#2c3448'); R(c, 10, 40, 6, 3, '#d8b040'); R(c, 22, 42, 4, 6, '#f0f0ec');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 24, 11, 12, sk2); E(c, 23.5, 23.5, 10.5, 11.5, sk);
    E(c, 24, 13, 15, 12, '#e8e8e4'); E(c, 22, 11, 12, 9, '#f8f8f4'); E(c, 18, 8, 4, 2.5, '#ffffff'); R(c, 8, 18, 32, 3, '#c8c8c4'); // helmet
    R(c, 10, 20, 28, 7, '#2c2c34'); R(c, 13, 21, 9, 5, o.dark ? '#3c5c7c' : '#7ca4c8'); R(c, 26, 21, 9, 5, o.dark ? '#3c5c7c' : '#7ca4c8'); P(c, 14, 21, '#e8f4ff'); P(c, 27, 21, '#e8f4ff'); // goggles
    L(c, 10, 22, 14, 36, '#2c2c2c'); L(c, 38, 22, 34, 36, '#2c2c2c'); // chin strap
    L(c, 24, 27, 23, 31, sk2); R(c, 20, 33, 8, 1, o.dark ? '#2c1c1c' : '#7c4c3c');
    if (o.dark) for (let y = 20; y < 38; y += 2) for (let x = 12; x < 36; x += 2) if (((x + y) >> 1) & 1) P(c, x, y, '#1c1418');
  });
}
function driverFace(o = {}) {
  return SPR('drvF' + (o.blink || 0) + (o.shock ? 's' : ''), 48, 48, c => {
    const sk = '#dcac88', sk2 = '#ac7c5c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#3c4048'); PF(c, [18, 37, 24, 46, 30, 37], '#ece8e0'); L(c, 24, 39, 24, 48, '#5c2c2c', 2);
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12, 14, sk2); E(c, 23.5, 21.5, 11.5, 13.5, sk);
    PF(c, [12, 16, 14, 7, 24, 4, 34, 6, 37, 14, 34, 11, 22, 10, 16, 12], '#3c3430'); L(c, 14, 10, 30, 6, '#5c544c'); R(c, 11, 16, 3, 6, '#8c847c'); // grey at the temples
    for (const x0 of [16, 27]) { R(c, x0 - 1, 18, 7, 6, '#1c1c1c'); R(c, x0, 19, 5, 4, '#c8d4dc'); if (o.blink === 2) L(c, x0, 21, x0 + 4, 21, '#2c1c14'); else { R(c, x0 + 1, 20, 2, o.shock ? 3 : 2, C.k); } }
    R(c, 22, 20, 4, 1, '#1c1c1c');
    L(c, 24, 23, 23, 27, sk2); if (o.shock) E(c, 24, 31, 2.5, 2, '#5c1c1c'); else R(c, 20, 31, 8, 1, '#7c4c3c'); L(c, 16, 26, 17, 30, sk2);
  });
}
function bankerFace(o = {}) {
  return SPR('bkF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e8c0a0', sk2 = '#b88c6c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#2c3448'); PF(c, [18, 37, 24, 46, 30, 37], '#f0ece4'); L(c, 24, 39, 24, 48, '#3c3c6c', 2);
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    PF(c, [12, 18, 13, 8, 22, 4, 33, 6, 36, 16, 33, 11, 24, 9, 17, 11], '#1c1814'); L(c, 18, 7, 30, 6, '#3c342c');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 4, 21, '#2c1c14'); continue; } R(c, x0, 19, 4, 4, '#f8f4ec'); R(c, x0 + 1, 20, 2, 3, C.k); L(c, x0 - 1, 16, x0 + 4, 15, '#2c241c'); }
    L(c, 24, 23, 23, 27, sk2); E(c, 24, 31, 2, 1.6, '#3c1c1c'); P(c, 23, 30, '#7c4c3c');
  });
}
const PORTRAITS = {
  fake: p => withMouth('pmfk', fakeFace({ blink: p.blink }), p, 24, 33),
  driver: p => withMouth('pmdr', driverFace({ blink: p.blink }), p, 24, 31),
  banker: p => bankerFace({ blink: p.blink }),
};
