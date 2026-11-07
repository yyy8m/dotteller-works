/* ================= 文庫 #002 注文の多い料理店: cast & props ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => (S.lines.length ? S.lines[S.lines.length - 1].se : 0);

/* the two young gentlemen, dressed like British soldiers (red coats); A has a moustache, B wears glasses */
const GENT = [
  { id: 'gA', coat: '#a8302c', coat2: '#7c1c1c', pants: '#2c2c3c', skin: '#f0c8a8', hair: '#5c3c24', hat: 'hunt', hatCol: '#2c2c3c', hatCol2: '#3c3c4c' },
  { id: 'gB', coat: '#b84030', coat2: '#8c2420', pants: '#3c3428', skin: '#f4d0b0', hair: '#2c1c14', hat: 'hunt', hatCol: '#5c4c34', hatCol2: '#6c5c44' },
];
/* g: 0/1, o: { f, arm, weapon, noHat, noCoat, cream } */
function gentSpr(g, o = {}) {
  const st = Object.assign({}, GENT[g]);
  if (o.noHat) st.hat = null;
  if (o.noCoat) { st.coat = '#e8e0d0'; st.coat2 = '#c8c0b0'; }
  if (o.cream) st.skin = '#fcfaf2';
  return personSpr(st, { f: o.f == null ? -1 : o.f, arm: o.arm, weapon: o.weapon, shock: o.shock, id: 'g' + g + (o.k || '') });
}
function drawGents(c, x, y, s, o = {}) { // the pair, B a little behind A
  for (const g of [1, 0]) {
    const oo = Object.assign({}, o, typeof o.per === 'function' ? o.per(g) : {}), dx = g ? -22 * s : 0;
    blit(c, gentSpr(g, oo), x + dx + (oo.dx || 0), y + (oo.dy || 0), PER_AX, PER_AY, { s, flip: oo.flip });
    if (g === 1 && !o.noGlasses) { const gx = x + dx + (oo.flip ? -2 : 2) * s, gy = y - 34 * s + (oo.dy || 0); R(c, gx - s, gy, 3 * s, s, '#1c1c1c'); }
  }
}
/* white dog "like a polar bear", 24x16, facing right; pose: walk / dizzy / dead / run */
function dogSpr(t, pose = 'walk', k = 0) {
  return SPR('dog' + k, 26, 18, c => {
    const f = Math.floor(t * 8 + k) & 3, sw = pose === 'walk' || pose === 'run' ? [0, 2, 0, -2][f] : 0;
    if (pose === 'dead') { E(c, 12, 13, 10, 4, '#f4f4f0'); E(c, 21, 12, 4, 3, '#f4f4f0'); for (let i = 0; i < 4; i++) L(c, 6 + i * 4, 15, 4 + i * 4, 17, '#e0e0d8'); P(c, 23, 11, C.k); return; }
    E(c, 11, 9, 9, 5, '#f8f8f4'); E(c, 11, 10, 8, 3, '#e4e4dc');
    E(c, 20, 6, 4.5, 4, '#f8f8f4'); E(c, 24, 7, 2, 1.5, '#e4e4dc'); P(c, 25, 7, C.k); R(c, 17, 2, 2, 2, '#e4e4dc');
    P(c, 21, 5, pose === 'dizzy' ? '#8c8c94' : C.k);
    for (const [lx, d] of [[5, sw], [9, -sw], [14, sw], [17, -sw]]) L(c, lx, 13, lx + d, 17, '#e8e8e0', 2);
    L(c, 2, 8, 0, 5 + (f & 1), '#f0f0e8', 2);
  });
}
/* faces for the dialog window (48x48) */
function gentFace(g, o = {}) {
  const st = GENT[g];
  return SPR('gf' + g + (o.cream ? 'c' : '') + (o.crumple ? 'k' : '') + (o.scared ? 's' : '') + (o.blink || 0), 48, 48, c => {
    const sk = o.cream ? '#fcfaf2' : st.skin, sk2 = o.cream ? '#e0dcd0' : '#c89c7c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], st.coat); R(c, 21, 37, 6, 11, '#f4f0e8'); R(c, 23, 39, 2, 9, '#2c2c3c');
    for (const y of [41, 45]) { P(c, 14, y, '#f8d860'); P(c, 33, y, '#f8d860'); }
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 21, 11, 12.5, sk2); E(c, 23.5, 20.5, 10.5, 12, sk);
    PF(c, [12, 16, 14, 8, 22, 5, 32, 6, 36, 12, 36, 17, 31, 11, 22, 10, 16, 12], st.hair);
    const ey = 20;
    for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, ey + 1, x0 + 3, ey + 1, '#3c2c24'); continue; } R(c, x0, ey, 4, 3, '#fcfaf2'); R(c, x0 + 1, ey + (o.scared ? 0 : 1), 2, 2, C.k); }
    if (g === 1) { for (const x0 of [17, 26]) { R(c, x0 - 1, ey - 2, 7, 1, '#2c2c2c'); R(c, x0 - 1, ey + 4, 7, 1, '#2c2c2c'); R(c, x0 - 1, ey - 2, 1, 7, '#2c2c2c'); R(c, x0 + 5, ey - 2, 1, 7, '#2c2c2c'); } R(c, 22, ey, 3, 1, '#2c2c2c'); }
    L(c, 23, 22, 22, 26, sk2);
    if (g === 0) { PF(c, [16, 28, 23, 26, 25, 26, 32, 28, 30, 29, 24, 28, 18, 29], '#4c3020'); }
    if (o.scared) { E(c, 24, 30, 3, 2.5, '#5c1c1c'); } else R(c, 20, 30, 8, 1, '#8c4c3c');
    if (o.crumple) { for (const [x0, y0, x1, y1] of [[14, 14, 19, 16], [29, 16, 34, 14], [15, 25, 18, 28], [31, 28, 34, 25], [20, 12, 27, 13], [21, 33, 27, 33]]) L(c, x0, y0, x1, y1, sk2); for (const x0 of [19, 28]) { R(c, x0, ey + 3, 1, 6, '#88c8f8'); } }
  });
}
function nekoFace(o = {}) { // the wildcat's henchman: grey tabby, blue eyes
  return SPR('nf' + (o.blink || 0) + (o.grin ? 'g' : ''), 48, 48, c => {
    PF(c, [4, 48, 10, 38, 38, 38, 44, 48], '#e8e4dc'); PF(c, [18, 38, 24, 45, 30, 38], '#c82828');
    PF(c, [8, 22, 10, 4, 20, 14], '#8c8c94'); PF(c, [40, 22, 38, 4, 28, 14], '#8c8c94'); PF(c, [11, 18, 12, 9, 17, 14], '#e8b0b0'); PF(c, [37, 18, 36, 9, 31, 14], '#e8b0b0');
    E(c, 24, 25, 16, 13, '#9c9ca4'); E(c, 24, 30, 9, 7, '#d8d8dc');
    for (const x0 of [14, 21, 28]) { L(c, x0, 13, x0 + 2, 18, '#6c6c74'); }
    for (const x0 of [17, 31]) { if (o.blink === 2) { L(c, x0 - 3, 23, x0 + 3, 23, C.k); continue; } E(c, x0, 23, 3.5, 3.5, '#3c8cf0'); R(c, x0, 21, 1, 5, C.k); P(c, x0 - 2, 21, C.white); }
    PF(c, [22, 28, 26, 28, 24, 30], '#e86c8c');
    if (o.grin) { PF(c, [17, 31, 31, 31, 28, 35, 20, 35], '#3c0c10'); R(c, 20, 31, 2, 2, C.white); R(c, 26, 31, 2, 2, C.white); } else { L(c, 24, 30, 21, 33, '#4c4c54'); L(c, 24, 30, 27, 33, '#4c4c54'); }
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) L(c, 24 + s * 9, 29 + k * 2, 24 + s * 20, 27 + k * 3, '#f4f4f4');
  });
}
function hunterFace(o = {}) { // the professional hunter with a straw (mino) hat
  return SPR('hf' + (o.blink || 0), 48, 48, c => {
    PF(c, [3, 48, 9, 38, 39, 38, 45, 48], '#8c7c4c'); for (let x = 6; x < 44; x += 3) L(c, x, 39, x - 2, 48, '#6c5c34');
    R(c, 19, 30, 10, 8, '#a8744c'); E(c, 24, 22, 10.5, 12, '#a8744c'); E(c, 23.5, 21.5, 10, 11.5, '#c89060');
    PF(c, [4, 16, 24, 1, 44, 16], '#c8a860'); for (let k = 0; k < 6; k++) L(c, 24, 2, 6 + k * 7, 16, '#a88c48'); R(c, 4, 15, 40, 2, '#8c7034');
    for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, 22, x0 + 3, 22, C.k); continue; } R(c, x0, 21, 3, 2, C.k); }
    L(c, 23, 23, 22, 27, '#8c5c3c'); for (let i = 0; i < 14; i++) P(c, 16 + (i * 7 % 17), 29 + (i * 3 % 6), '#5c4430'); R(c, 20, 30, 8, 1, '#5c2c24');
  });
}
const PORTRAITS = {
  hige: p => withMouth('pmA', gentFace(0, { blink: p.blink, cream: p.expr === 'cream', crumple: p.expr === 'crumple', scared: p.expr === 'scared' }), p, 23, 29),
  megane: p => withMouth('pmB', gentFace(1, { blink: p.blink, cream: p.expr === 'cream', crumple: p.expr === 'crumple', scared: p.expr === 'scared' }), p, 23, 29),
  neko1: p => withMouth('pmN', nekoFace({ blink: p.blink, grin: p.expr === 'grin' }), p, 23, 31),
  neko2: p => withMouth('pmN2', nekoFace({ blink: p.blink, grin: true }), p, 23, 31),
  ryoushi: p => withMouth('pmH', hunterFace({ blink: p.blink }), p, 23, 29),
};

/* ---- backgrounds ---- */
function autumnForest(c, t, ox, o = {}) {
  VG(c, 0, 0, W, 120, o.dusk ? ['#4c4c6c', '#8c6c7c', '#d8a07c'] : ['#7ca4c8', '#a8c4d8', '#d8e0d8']);
  for (let i = 0; i < 9; i++) { const x = mod(i * 52 - ox * 0.2, 470) - 40; PF(c, [x - 50, 112, x, 60 + (i * 17 % 30), x + 50, 112], o.dusk ? '#4c3c4c' : '#7c8c6c'); }
  R(c, 0, 108, W, H - 108, '#6c5430'); for (let i = 0; i < 60; i++) R(c, mod(i * 37 - ox, W + 20) - 10, 112 + (i * 13 % 120), 3, 1, ['#c87c2c', '#a8541c', '#e0a040'][i % 3]);
  for (let i = 0; i < 7; i++) { // trees with autumn leaves
    const x = mod(i * 64 + 20 - ox * 0.7, 460) - 50, sh = o.wind ? Math.sin(t * 6 + i) * 3 : Math.sin(t * 0.8 + i) * 0.6;
    R(c, x - 3, 40, 6, 74, '#4c3424');
    for (let k = 0; k < 6; k++) E(c, x + sh + Math.cos(k * 1.3) * 16, 40 + Math.sin(k * 1.7) * 10, 16, 12, ['#c85c1c', '#e08c2c', '#a83c14', '#d8a03c'][(i + k) % 4]);
  }
}
function susuki(c, t, y, wind, n = 18, seed = 3) { // pampas grass in front
  for (let i = 0; i < n; i++) { const x = (i * 23 + seed * 7) % (W + 20) - 10, h = 26 + (i * 7 % 14), sw = Math.sin(t * (wind ? 5 : 1.2) + i) * (wind ? 6 : 2);
    L(c, x, y, x + sw, y - h, '#b8a46c'); E(c, x + sw, y - h, 2.5, 5, '#e8dcc0'); }
}
function hallway(c, o = {}) { // the corridor with a door in the middle
  const wall = o.wall || '#d8ccb4', door = o.door || '#5c3c24';
  R(c, 0, 0, W, 150, wall); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, 150, DA('#000000', 0.06));
  R(c, 0, 122, W, 28, o.wains || '#8c6c4c'); R(c, 0, 120, W, 2, '#5c4430');
  R(c, 0, 150, W, H - 150, o.floor || '#7c4c34'); for (let x = -40; x < W; x += 30) L(c, x, 150, x - 30, H, '#6c4030');
  // door (x 170..250)
  R(c, 168, 26, 84, 124, '#3c2c20'); R(c, 172, 30, 76, 120, door); R(c, 176, 34, 68, 112, o.door2 || door); if (o.glass) { R(c, 180, 38, 60, 104, '#a8c8d8'); for (let k = 0; k < 4; k++) L(c, 186 + k * 14, 40, 180 + k * 14, 70, DA('#ffffff', 0.5)); }
  E(c, 242, 92, 2.5, 2.5, '#f8d860');
}
/* the message on the door (gold / yellow / red letters), lines of up to 9 chars */
function doorSign(c, lines, col, a = 1) {
  if (!lines || a <= 0) return;
  const w = Math.max(...lines.map(s => textSpr(s, 16, col).width)) + 14, h = lines.length * 18 + 10, x = Math.round(210 - w / 2), y = 40;
  R(c, x, y, w, h, '#1c140c'); R(c, x + 1, y + 1, w - 2, h - 2, '#3c2c1c'); R(c, x + 1, y + 1, w - 2, 1, '#8c6c3c');
  lines.forEach((s, i) => TX(c, s, x + 7, y + 5 + i * 18, col, 16, '#000000'));
}
/* list of [time, lines, col] built in init; the latest one (time <= t) is shown */
function signAt(S, t) { let cur = null; for (const s of S.signs) if (t >= s[0]) cur = s; return cur; }
