/* ================= 文庫 #002 注文の多い料理店: cast & props ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => (S.lines.length ? S.lines[S.lines.length - 1].se : 0);

/* the two young gentlemen, dressed like British soldiers (red coats); A has a moustache, B wears glasses */
const GENT = [
  { id: 'gA', coat: '#a8302c', coat2: '#7c1c1c', pants: '#2c2c3c', skin: '#f0c8a8', hair: '#5c3c24', hat: 'hunt', hatCol: '#2c2c3c', hatCol2: '#3c3c4c' },
  { id: 'gB', coat: '#b84030', coat2: '#8c2420', pants: '#3c3428', skin: '#f4d0b0', hair: '#2c1c14', hat: 'hunt', hatCol: '#5c4c34', hatCol2: '#6c5c44' },
];
/* g: 0/1, o: { f, arm, weapon, noHat, noCoat, cream, shock, flip, dx, dy } */
const GENT2 = [
  { id: 'gA', coat: '#a8302c', coat2: '#7c1c1c', pants: '#e8dcc0', boots: '#3c2418', hair: '#5c3c24', hat: 'hunt', hatCol: '#3c3c4c', moustache: true },
  { id: 'gB', coat: '#b84c2c', coat2: '#8c2c1c', pants: '#d8ccb0', boots: '#2c1c14', hair: '#2c1c14', hat: 'hunt', hatCol: '#5c4c34', glasses: true },
];
function gentSpr(g, o = {}) {
  const arm = o.weapon === 'rifle' && !o.arm ? 'rifle' : o.arm === 'fwd' ? 'reach' : o.arm;
  return suitFig(GENT2[g], { f: o.f, arm, expr: o.expr || (o.shock ? 'shock' : 'normal'), blink: o.blink, noHat: o.noHat, noCoat: o.noCoat, cream: o.cream, k: o.k });
}
function drawGents(c, x, y, s, o = {}) { // the pair, B a little behind A
  for (const g of [1, 0]) {
    const oo = Object.assign({}, o, typeof o.per === 'function' ? o.per(g) : {}), dx = g ? -24 * s : 0;
    blit(c, gentSpr(g, oo), x + dx + (oo.dx || 0), y + (oo.dy || 0), FIG_AX2, FIG_AY2, { s: s * 0.7, flip: oo.flip });
  }
}
/* white dog "like a polar bear", 24x16, facing right; pose: walk / dizzy / dead / run */
function dogSpr(t, pose = 'walk', k = 0) { // big white dog "like a polar bear", 36x24, facing right
  return SPR('dog' + k + pose + (pose === 'walk' || pose === 'run' ? Math.floor(t * 8 + k) & 3 : 0), 36, 24, c => {
    const f = Math.floor(t * 8 + k) & 3, sw = pose === 'walk' || pose === 'run' ? [0, 3, 0, -3][f] : 0, W1 = '#fbfbf6', W2 = '#e2e2da', W3 = '#c8c8c0';
    if (pose === 'dead') { E(c, 16, 18, 14, 5, W1); E(c, 16, 21, 12, 2, W3); E(c, 30, 17, 5, 4, W1); E(c, 34, 18, 2, 1.5, W2); L(c, 29, 17, 31, 17, C.k); for (let i = 0; i < 4; i++) L(c, 6 + i * 6, 21, 4 + i * 6, 23, W3, 3); return; }
    E(c, 15, 12, 13, 7, W1); E(c, 15, 15, 11, 4, W2); for (let i = 0; i < 6; i++) L(c, 6 + i * 4, 8, 7 + i * 4, 11, W2);
    E(c, 28, 8, 6.5, 6, W1); E(c, 33, 10, 3, 2.5, W2); E(c, 35, 10, 1.4, 1.2, C.k); E(c, 25, 3, 2.2, 2.2, W2);
    if (pose === 'dizzy') { L(c, 28, 6, 30, 8, '#5c5c64'); L(c, 30, 6, 28, 8, '#5c5c64'); } else R(c, 29, 6, 2, 2, C.k);
    if (pose === 'run') { R(c, 31, 12, 4, 2, '#3c0c0c'); R(c, 32, 13, 2, 1, '#f8f8f8'); }
    for (const [lx, d] of [[6, sw], [11, -sw], [20, sw], [25, -sw]]) { L(c, lx, 17, lx + d, 23, W2, 3); R(c, lx + d - 1, 22, 3, 2, W3); }
    L(c, 2, 10, 0, 6 + (f & 1), W1, 3);
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
function nekoFace(o = {}) { // the wildcat's henchman: grey tabby, cold blue eyes with slit pupils
  return SPR('nf' + (o.blink || 0) + (o.grin ? 'g' : ''), 48, 48, c => {
    PF(c, [4, 48, 10, 39, 38, 39, 44, 48], '#3c3c44'); PF(c, [16, 39, 24, 46, 32, 39], '#f4f4f0'); R(c, 22, 40, 4, 3, '#c82828');
    PF(c, [7, 24, 9, 2, 21, 13], '#5c5c64'); PF(c, [41, 24, 39, 2, 27, 13], '#5c5c64'); PF(c, [10, 19, 11, 8, 17, 14], '#c89090'); PF(c, [38, 19, 37, 8, 31, 14], '#c89090');
    E(c, 24, 25, 16, 13.5, '#6c6c74'); E(c, 24, 31, 9, 6, '#e8e8ec');
    for (const x0 of [12, 18, 24, 30, 36]) L(c, x0, 13, x0 + (x0 - 24) * 0.1, 19, '#3c3c44');
    for (const x0 of [16, 32]) { if (o.blink === 2) { L(c, x0 - 4, 24, x0 + 4, 24, C.k); continue; } E(c, x0, 24, 4.5, 4, '#e8f0f8'); E(c, x0, 24, 3.5, 3.5, '#2c7cf0'); R(c, x0, 21, 1, 7, C.k); P(c, x0 - 2, 22, C.white); L(c, x0 - 5, 20, x0 + 4, 21, '#3c3c44'); }
    PF(c, [22, 29, 26, 29, 24, 31], '#c86c8c');
    if (o.grin) { PF(c, [17, 32, 31, 32, 28, 37, 20, 37], '#2c0408'); for (const x0 of [19, 27]) PF(c, [x0, 32, x0 + 2, 32, x0 + 1, 35], C.white); } else { L(c, 24, 31, 21, 34, '#3c3c44'); L(c, 24, 31, 27, 34, '#3c3c44'); }
    for (const s2 of [-1, 1]) for (let k = 0; k < 4; k++) L(c, 24 + s2 * 8, 30 + k * 2, 24 + s2 * (21 + k), 26 + k * 4, '#f4f4f4');
  });
}
/* the wildcat boss (山猫): shaggy dark fur, white muzzle, huge round orange eyes, bristling whiskers */
function bossFace(o = {}) {
  return SPR('bf' + (o.blink || 0) + (o.lick ? 'l' : ''), 48, 48, c => {
    for (let i = 0; i < 18; i++) { const a = i / 18 * TAU; PF(c, [24 + Math.cos(a) * 15, 25 + Math.sin(a) * 13, 24 + Math.cos(a + 0.17) * 21, 25 + Math.sin(a + 0.17) * 18, 24 + Math.cos(a + 0.35) * 15, 25 + Math.sin(a + 0.35) * 13], '#2c2a2c'); }
    PF(c, [5, 22, 8, -1, 20, 11], '#2c2a2c'); PF(c, [43, 22, 40, -1, 28, 11], '#2c2a2c'); PF(c, [9, 16, 9, 5, 16, 12], '#8c6c6c'); PF(c, [39, 16, 39, 5, 32, 12], '#8c6c6c');
    L(c, 8, -1, 7, -4, '#2c2a2c'); L(c, 40, -1, 41, -4, '#2c2a2c');
    E(c, 24, 25, 17, 15, '#3c3a3e'); for (let k = 0; k < 14; k++) L(c, 10 + k * 2, 10 + (k % 3), 9 + k * 2, 16, '#1c1a1c');
    PF(c, [14, 26, 24, 18, 34, 26, 32, 38, 24, 42, 16, 38], '#ecebe6'); E(c, 24, 34, 9, 6, '#f8f8f4');
    for (const x0 of [15, 33]) { if (o.blink === 2) { L(c, x0 - 6, 24, x0 + 6, 24, C.k); continue; }
      E(c, x0, 24, 7, 7, '#1c1a1c'); E(c, x0, 24, 6, 6, '#fcf8f0'); E(c, x0, 24, 4.2, 4.2, '#e86c1c'); E(c, x0, 24, 3, 3, '#f8a03c'); E(c, x0, 24, 1.8, 1.8, C.k); P(c, x0 - 2, 22, C.white); P(c, x0 - 1, 22, C.white);
      L(c, x0 - 6, 20, x0 + 5, 19, '#1c1a1c'); }
    PF(c, [21, 30, 27, 30, 24, 33], '#3c2c2c');
    if (o.lick) { PF(c, [19, 36, 29, 36, 27, 40, 21, 40], '#2c0408'); E(c, 26, 39, 3, 2, '#e86c8c'); } else { L(c, 24, 33, 20, 36, '#5c5c5c'); L(c, 24, 33, 28, 36, '#5c5c5c'); }
    for (const s2 of [-1, 1]) for (let k = 0; k < 5; k++) L(c, 24 + s2 * 7, 32 + k, 24 + s2 * (23 + k % 2 * 2), 25 + k * 4 + (k & 1) * 2, '#f8f8f8');
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
  boss: p => withMouth('pmBo', bossFace({ blink: p.blink, lick: p.expr === 'grin' }), p, 23, 35),
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
