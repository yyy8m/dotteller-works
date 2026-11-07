/* ================= 文庫 #003 杜子春: cast & props ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => (S.lines.length ? S.lines[S.lines.length - 1].se : 0);
const TOSHI = { id: 'to', coat: '#3c7c8c', coat2: '#2c5c6c', pants: '#2c3c4c', dress: '#3c7c8c', skin: '#f0c8a0', hair: '#1c1c24' };
const TOSHI_RICH = { id: 'tr', coat: '#d8a838', coat2: '#a87c1c', pants: '#7c2c2c', dress: '#c8302c', skin: '#f0c8a0', hair: '#1c1c24' };
const OLD = { id: 'ol', coat: '#b8b4a8', coat2: '#8c887c', pants: '#6c6860', dress: '#a8a498', skin: '#e0b894', hair: '#f4f4f0' };
function toshi(c, x, y, s, o = {}) {
  blit(c, personSpr(o.rich ? TOSHI_RICH : TOSHI, { f: o.f == null ? -1 : o.f, arm: o.arm, shock: o.shock, id: 'ts' + (o.k || '') }), x, y, PER_AX, PER_AY, { s, flip: o.flip });
  E(c, x + (o.flip ? -1 : 1) * 0.5 * s, y - 39 * s, 2 * s, 1.6 * s, '#1c1c24'); // top-knot
}
function oldMan(c, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return;
  const spr = personSpr(OLD, { f: o.f == null ? -1 : o.f, arm: o.arm, id: 'om' + (o.k || '') });
  blit(c, a < 1 ? ditherFade(spr, a, 'omf') : spr, x, y, PER_AX, PER_AY, { s, flip: o.flip });
  if (a >= 1) { const sx = x + (o.flip ? -7 : 7) * s; L(c, sx, y - 26 * s, sx + (o.flip ? -1 : 1) * s, y, '#6c4c2c', Math.max(1, s)); R(c, x - 3 * s, y - 31 * s, 6 * s, 3 * s, '#f4f4f0'); }
}
/* faces for the dialog window (48x48) */
function toshiFace(o = {}) {
  return SPR('tf' + (o.blink || 0) + (o.cry ? 'c' : '') + (o.rich ? 'r' : ''), 48, 48, c => {
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.rich ? '#d8a838' : '#3c7c8c'); PF(c, [18, 37, 24, 46, 30, 37], '#e8e0d0');
    R(c, 19, 30, 10, 8, '#c8946c'); E(c, 24, 21, 11, 12.5, '#c8946c'); E(c, 23.5, 20.5, 10.5, 12, '#f0c8a0');
    PF(c, [12, 18, 13, 8, 22, 5, 33, 7, 36, 18, 32, 11, 22, 10, 16, 12], '#1c1c24'); E(c, 24, 3, 4, 3.5, '#1c1c24'); R(c, 22, 6, 4, 2, '#c8302c');
    for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 3, 21, C.k); continue; } R(c, x0, 20, 3, 3, C.k); P(c, x0, 20, C.white); }
    L(c, 23, 22, 22, 26, '#c8946c'); R(c, 21, 30, 6, 1, '#8c4c3c');
    if (o.cry) for (const x0 of [19, 28]) R(c, x0, 24, 1, 7, '#88c8f8');
  });
}
function tekkanFace(o = {}) { // one eye squinting, long white beard, a small black cap
  return SPR('kf' + (o.blink || 0) + (o.stern ? 's' : ''), 48, 48, c => {
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#a8a498');
    R(c, 19, 30, 10, 8, '#b88c6c'); E(c, 24, 21, 11, 12.5, '#b88c6c'); E(c, 23.5, 20.5, 10.5, 12, '#e0b894');
    E(c, 24, 8, 10, 5, '#f4f4f0'); R(c, 17, 2, 14, 6, '#1c1c24'); R(c, 15, 7, 18, 2, '#2c2c34');
    L(c, 16, 17, 21, o.stern ? 19 : 18, '#f4f4f0', 2); L(c, 27, o.stern ? 19 : 18, 32, 17, '#f4f4f0', 2);
    if (o.blink === 2) { L(c, 17, 21, 21, 21, C.k); } else { R(c, 18, 20, 3, 3, C.k); }
    L(c, 27, 21, 31, 21, '#5c4430'); // the squinting eye
    L(c, 23, 22, 22, 26, '#b88c6c');
    PF(c, [15, 27, 33, 27, 30, 40, 24, 46, 18, 40], '#f4f4f0'); PF(c, [19, 28, 29, 28, 24, 30], '#e0b894'); R(c, 21, 29, 6, 1, '#8c5c4c');
  });
}
function shinshoFace() { // gold helmet, red angry face
  return SPR('jf', 48, 48, c => {
    PF(c, [0, 48, 6, 36, 42, 36, 48, 48], '#d8a838'); for (let x = 4; x < 46; x += 6) R(c, x, 40, 4, 3, '#a87c1c');
    E(c, 24, 23, 12, 13, '#a83c2c'); E(c, 23.5, 22.5, 11.5, 12.5, '#d8583c');
    PF(c, [9, 16, 12, 2, 24, -2, 36, 2, 39, 16, 32, 11, 16, 11], '#d8a838'); PF(c, [20, 4, 24, -6, 28, 4], '#f8d860'); R(c, 10, 15, 28, 2, '#a87c1c');
    L(c, 15, 18, 22, 21, C.k, 2); L(c, 26, 21, 33, 18, C.k, 2); for (const x0 of [17, 27]) { R(c, x0, 22, 4, 2, '#f8f0c0'); R(c, x0 + 1, 22, 2, 2, C.k); }
    PF(c, [17, 29, 31, 29, 29, 33, 19, 33], '#3c0c0c'); R(c, 19, 29, 2, 2, C.white); R(c, 27, 29, 2, 2, C.white);
  });
}
function enmaFace() { // flat black crown, red face, black beard
  return SPR('ef', 48, 48, c => {
    PF(c, [0, 48, 6, 36, 42, 36, 48, 48], '#1c1c24'); R(c, 20, 36, 8, 12, '#c8302c');
    E(c, 24, 23, 12, 13, '#8c241c'); E(c, 23.5, 22.5, 11.5, 12.5, '#c83c2c');
    R(c, 8, 4, 32, 4, '#1c1c24'); R(c, 14, 6, 20, 8, '#1c1c24'); R(c, 20, 8, 8, 4, '#f8d860');
    L(c, 15, 17, 22, 20, C.k, 2); L(c, 26, 20, 33, 17, C.k, 2); for (const x0 of [17, 27]) { R(c, x0, 21, 4, 3, '#f8f0c0'); R(c, x0 + 1, 22, 2, 2, C.k); }
    PF(c, [11, 26, 16, 28, 24, 30, 32, 28, 37, 26, 34, 40, 24, 46, 14, 40], '#141418'); R(c, 19, 30, 10, 2, '#5c0c0c');
  });
}
function hahaFace(o = {}) { // the mother — gentle, a little pale
  return SPR('hf' + (o.blink || 0), 48, 48, c => {
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#8c7c9c'); PF(c, [18, 37, 24, 44, 30, 37], '#e8e0d0');
    R(c, 19, 30, 10, 8, '#c0a08c'); E(c, 24, 21, 11, 12.5, '#c0a08c'); E(c, 23.5, 20.5, 10.5, 12, '#ecd4c0');
    PF(c, [11, 22, 12, 8, 22, 4, 33, 6, 37, 22, 32, 11, 22, 10, 16, 12], '#3c3038'); E(c, 24, 4, 7, 4, '#3c3038'); R(c, 30, 2, 6, 1, '#d8c890');
    for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 3, 21, '#3c3038'); continue; } L(c, x0, 21, x0 + 3, 20, '#3c3038'); R(c, x0 + 1, 21, 2, 1, C.k); }
    R(c, 21, 29, 6, 1, '#a86c6c'); P(c, 20, 28, '#a86c6c'); P(c, 27, 28, '#a86c6c');
  });
}
const PORTRAITS = {
  toshi: p => withMouth('pmT', toshiFace({ blink: p.blink, cry: p.expr === 'cry', rich: p.expr === 'rich' }), p, 23, 29),
  tekkan: p => withMouth('pmK', tekkanFace({ blink: p.blink, stern: p.expr === 'stern' }), p, 23, 28),
  shinsho: p => withMouth('pmJ', shinshoFace(), p, 23, 30),
  enma: p => withMouth('pmE', enmaFace(), p, 23, 30),
  haha: p => withMouth('pmH', hahaFace({ blink: p.blink }), p, 23, 28),
};

/* ---- backgrounds ---- */
function sunsetSky(c, t, o = {}) {
  VG(c, 0, 0, W, 130, o.night ? ['#1c1c3c', '#3c2c4c', '#7c4c4c'] : ['#5c6ca8', '#c8788c', '#f0a860', '#f8d08c']);
  const mx = 250, my = 24; ER(c, mx, my, 9, 9, '#fcf8e8', -1.2, 1.2); // thin crescent moon
  for (let i = 0; i < 4; i++) { const x = mod(i * 110 - t * 3, 440) - 60; E(c, x, 40 + i * 9, 50, 5, DA('#f8c8a8', 0.5)); }
}
/* the west gate of Luoyang: city wall + a two-storey gate tower */
function westGate(c, t, o = {}) {
  sunsetSky(c, t, o);
  R(c, 0, 76, W, 74, '#8c6c54'); for (let y = 80; y < 150; y += 8) for (let x = ((y / 8) & 1) * 10; x < W; x += 20) R(c, x, y, 19, 7, '#9c7c60');
  R(c, 0, 72, W, 6, '#5c4434');
  const gx = 160; R(c, gx - 36, 92, 72, 58, '#1c140c'); E(c, gx, 92, 36, 18, '#1c140c');
  PF(c, [gx - 70, 64, gx, 38, gx + 70, 64], '#3c2c34'); R(c, gx - 56, 62, 112, 14, '#a82c24'); for (let x = gx - 52; x < gx + 54; x += 14) R(c, x, 62, 3, 14, '#5c1c14');
  PF(c, [gx - 52, 44, gx, 24, gx + 52, 44], '#3c2c34'); R(c, gx - 38, 42, 76, 8, '#a82c24');
  R(c, 0, 150, W, H - 150, '#b8946c'); for (let i = 0; i < 30; i++) R(c, (i * 47) % W, 152 + (i * 13 % 80), 6, 1, '#a8845c');
  if (!o.empty) for (let i = 0; i < 9; i++) { // people and carts flowing by
    const x = mod(i * 47 + t * (i & 1 ? 14 : -10), 380) - 30, col = ['#c84c3c', '#3c6c9c', '#d8b84c', '#6c9c4c', '#8c5ca8'][i % 5];
    blit(c, personSpr({ id: 'cr' + i, coat: col, coat2: col, pants: '#3c3c44', dress: col, skin: '#f0c8a0', hair: '#1c1c24' }, { f: Math.floor(t * 6 + i) & 3, id: 'cw' + i }), x, 148 + (i % 3), PER_AX, PER_AY, { flip: !(i & 1) });
  }
  if (o.dusk) { c.fillStyle = DA('#f8a040', 0.12); c.fillRect(0, 0, W, H); }
}
function goldPile(c, x, y, n, t) { for (let i = 0; i < n; i++) { const a = hash(i) * Math.PI, r = Math.sqrt(i / n) * 26; const px = x + Math.cos(a) * r * 1.4, py = y - Math.sin(a) * r * 0.7; R(c, px, py, 4, 3, i % 3 ? '#f8d050' : '#c89c28'); if ((Math.floor(t * 4) + i) % 23 === 0) P(c, px + 1, py, C.white); } }
function mountainsFar(c, t, ox, y, cols) { for (let k = 0; k < 3; k++) for (let i = 0; i < 10; i++) { const x = mod(i * 70 + k * 23 - ox * (0.3 + k * 0.3), 560) - 80, h = 40 + (i * 17 % 30) + k * 10; PF(c, [x - 50, y + k * 18, x, y - h + k * 18, x + 50, y + k * 18], cols[k]); } }
function bigDipper(c, t, x, y, s) { const pts = [[0, 0], [14, 4], [26, 4], [36, 10], [40, 22], [56, 24], [58, 10]]; pts.forEach(([a, b], i) => { const tw = 0.7 + 0.3 * Math.sin(t * 3 + i); E(c, x + a * s, y + b * s, 3 * s * tw, 3 * s * tw, DA('#f8f0c0', 0.25)); E(c, x + a * s, y + b * s, 1.2 * s, 1.2 * s, '#ffffff'); }); }
function cliffRock(c, t) {
  VG(c, 0, 0, W, 150, ['#05060f', '#0c1028', '#1c2040']);
  for (let i = 0; i < 40; i++) P(c, (i * 71) % W, (i * 37) % 120, (Math.floor(t * 2) + i) % 5 ? '#c8c8d8' : '#5c5c7c');
  bigDipper(c, t, 40, 20, 1.6);
  PF(c, [220, 150, 236, 40, 260, 20, 320, 10, 320, 150], '#1c1c2c'); // the cliff behind
  L(c, 262, 30, 236, 18, '#3c2c20', 3); for (let k = 0; k < 4; k++) E(c, 232 - k * 10 + Math.sin(t * 1.4 + k) * 2, 16 + (k & 1) * 6, 12, 5, '#1c3c2c'); // the twisted pine
  R(c, 0, 132, W, 20, '#3c3c4c'); PF(c, [0, 132, 40, 124, 200, 122, 260, 128, 320, 126, 320, 140, 0, 140], '#4c4c5c'); // the flat rock
  R(c, 0, 150, W, H - 150, '#0c0c18');
}
/* a thin horse with a human face (the parents, reborn as beasts) */
function horseSpr(t, who, o = {}) {
  return SPR('hs' + who + (o.down ? 'd' : ''), 52, 34, c => {
    const body = who ? '#8c7c6c' : '#7c6c5c';
    if (o.down) { E(c, 24, 26, 18, 6, body); for (let i = 0; i < 4; i++) L(c, 10 + i * 9, 30, 6 + i * 9, 33, body, 2); E(c, 44, 24, 6, 6, '#e8c8a8'); R(c, 40, 18, 9, 4, who ? '#3c3038' : '#2c2c2c'); P(c, 43, 24, C.k); P(c, 46, 24, C.k); if (o.tear) R(c, 44, 26, 1, 4, '#c81818'); return; }
    E(c, 22, 16, 16, 7, body); for (let x of [10, 16, 28, 34]) L(c, x, 20, x - 1 + Math.sin(t * 2 + x) * 0.5, 32, body, 2);
    L(c, 6, 13, 2, 22, '#5c4c3c', 2); L(c, 36, 12, 42, 4, body, 4);
    E(c, 44, 8, 6, 6, '#e8c8a8'); R(c, 40, 1, 9, 4, who ? '#3c3038' : '#2c2c2c'); P(c, 42, 8, C.k); P(c, 46, 8, C.k); R(c, 43, 11, 3, 1, '#8c4c4c');
    for (let i = 0; i < 4; i++) L(c, 12 + i * 5, 10, 13 + i * 5, 20, DA('#3c2c20', 0.5)); // ribs
    if (o.tear) { R(c, 42, 9, 1, 4, '#c81818'); R(c, 46, 9, 1, 4, '#c81818'); }
  });
}
