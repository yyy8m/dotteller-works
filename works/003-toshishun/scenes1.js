/* ================= 文庫 #003 杜子春: cast & props ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => (S.lines.length ? S.lines[S.lines.length - 1].se : 0);
const TOSHI = { id: 'to', coat: '#3c7c8c', coat2: '#2c5c6c', pants: '#2c3c4c', dress: '#3c7c8c', skin: '#f0c8a0', hair: '#1c1c24' };
const TOSHI_RICH = { id: 'tr', coat: '#d8a838', coat2: '#a87c1c', pants: '#7c2c2c', dress: '#c8302c', skin: '#f0c8a0', hair: '#1c1c24' };
const OLD = { id: 'ol', coat: '#b8b4a8', coat2: '#8c887c', pants: '#6c6860', dress: '#a8a498', skin: '#e0b894', hair: '#f4f4f0' };
function toshi(c, x, y, s, o = {}) {
  const st = o.rich ? { id: 'tsR', robe: '#c8302c', robe2: '#9c1c1c', trim: '#f8d050', sash: '#f8d050', hair: '#1c1c24', hat: 'bun', hatCol: '#f8d050' }
                    : { id: 'tsN', robe: '#3c7c8c', robe2: '#2c5c6c', trim: '#c8d8d0', sash: '#1c2c34', hair: '#1c1c24', hat: 'bun', hatCol: '#c8302c' };
  const expr = o.expr || (o.shock ? 'shock' : 'normal');
  blit(c, robeFig(st, { f: o.f, pose: o.pose, arm: o.arm === 'dig' ? 'reach' : o.arm === 'fwd' ? 'reach' : o.arm, expr, blink: o.blink, k: o.k }), x, y, FIG_AX2, FIG_AY2, { s: s * 0.72, flip: o.flip });
}
function oldMan(c, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return;
  const st = { id: 'omK', robe: '#a8a498', robe2: '#8c887c', trim: '#e8e4d8', sash: '#5c4c3c', old: true, beard: true, squint: true, hat: 'cap', hatCol: '#1c1c24' };
  const spr = robeFig(st, { f: o.f, arm: o.arm === 'fwd' ? 'point' : (o.arm || 'staff'), expr: o.expr, blink: o.blink, k: o.k });
  blit(c, a < 1 ? ditherFade(spr, a, 'omf' + (o.k || '')) : spr, x, y, FIG_AX2, FIG_AY2, { s: s * 0.72, flip: o.flip });
  if (o.glow) glow(c, x, y - 30 * s * 0.72, 22, 30, '#f8f0c0', 2 * (0.12 * a));
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
  for (let i = 0; i < 4; i++) { const x = mod(i * 110 - t * 3, 440) - 60; glow(c, x, 40 + i * 9, 50, 5, '#f8c8a8', 2 * (0.5)); }
}
/* the west gate of Luoyang: city wall + a two-storey gate tower */
function westGate(c, t, o = {}) {
  sunsetSky(c, t, o);
  if (!o.night) { const sy = 92; glow(c, 60, sy, 34, 34, '#f8d080', 2 * (0.35)); E(c, 60, sy, 20, 20, '#f8c060'); E(c, 60, sy, 14, 14, '#fce8a0'); }
  // far city roofs
  for (let i = 0; i < 9; i++) { const x = i * 40 - 10, h = 10 + (i * 7 % 12); PF(c, [x, 78, x + 10, 78 - h, x + 30, 78 - h, x + 40, 78], o.night ? '#2c2034' : '#8c5c5c'); R(c, x + 6, 78 - h + 2, 28, 2, o.night ? '#1c1424' : '#6c3c44'); }
  // wall with crenellations
  R(c, 0, 76, W, 74, '#8c6c54'); for (let y = 80; y < 150; y += 8) for (let x = ((y / 8) & 1) * 10; x < W; x += 20) { R(c, x, y, 19, 7, '#9c7c60'); R(c, x, y, 19, 1, '#a88c6c'); }
  for (let x = 0; x < W; x += 16) R(c, x, 68, 10, 8, '#7c5c44'); R(c, 0, 74, W, 3, '#5c4434');
  const gx = 160;
  R(c, gx - 40, 88, 80, 62, '#5c4434'); R(c, gx - 34, 94, 68, 56, '#140c08'); E(c, gx, 94, 34, 16, '#140c08');
  for (let k = 0; k < 2; k++) { const dx = k ? 34 : -34; R(c, gx + dx - 2, 96, 4, 54, '#3c2414'); for (let y = 100; y < 150; y += 8) E(c, gx + dx * 0.6, y, 1.5, 1.5, '#c8a040'); }
  // two-storey gate tower with red pillars and upturned eaves
  R(c, gx - 58, 54, 116, 16, '#a82c24'); for (let x = gx - 54; x < gx + 56; x += 12) R(c, x, 54, 3, 16, '#5c1c14'); R(c, gx - 60, 68, 120, 3, '#d8a838');
  PF(c, [gx - 76, 58, gx - 66, 50, gx - 50, 42, gx + 50, 42, gx + 66, 50, gx + 76, 58, gx + 60, 54, gx - 60, 54], '#2c2430'); L(c, gx - 76, 58, gx - 50, 42, '#4c4054'); L(c, gx + 76, 58, gx + 50, 42, '#4c4054');
  R(c, gx - 40, 30, 80, 12, '#a82c24'); for (let x = gx - 36; x < gx + 38; x += 10) R(c, x, 30, 2, 12, '#5c1c14');
  PF(c, [gx - 56, 32, gx - 48, 26, gx - 34, 18, gx + 34, 18, gx + 48, 26, gx + 56, 32, gx + 42, 30, gx - 42, 30], '#2c2430'); R(c, gx - 4, 12, 8, 6, '#2c2430'); E(c, gx, 11, 2, 2, '#d8a838');
  R(c, gx - 14, 44, 28, 9, '#1c140c'); R(c, gx - 13, 45, 26, 7, '#3c2c1c'); TX(c, '西門', gx - 13, 44, '#f8d050', 8, null);
  // lanterns
  for (const lx of [gx - 50, gx + 50]) { L(c, lx, 71, lx, 76, '#1c1c1c'); E(c, lx, 81, 4, 5, o.night ? '#f86030' : '#e84c2c'); R(c, lx - 3, 76, 6, 1, '#1c1c1c'); if (o.night) glow(c, lx, 81, 10, 10, '#f8a040', 2 * (0.25)); }
  // willow
  { const wx = 286; R(c, wx - 2, 96, 5, 54, '#4c3424'); for (let k = 0; k < 9; k++) { const sx = wx - 20 + k * 5, sw2 = Math.sin(t * 1.2 + k) * 2; L(c, sx, 92 + (k % 3) * 2, sx + sw2, 132 + (k % 4) * 4, o.night ? '#2c4c34' : '#6c9c48'); } E(c, wx, 92, 24, 10, o.night ? '#2c4c34' : '#7cac54'); }
  R(c, 0, 150, W, H - 150, o.night ? '#5c4c44' : '#b8946c'); for (let i = 0; i < 30; i++) R(c, (i * 47) % W, 152 + (i * 13 % 80), 6, 1, o.night ? '#4c3c34' : '#a8845c');
  if (!o.empty) for (let i = 0; i < 10; i++) { // people, carts and a white horse flowing by (kept behind the main characters)
    const dir = i & 1 ? 1 : -1, x = mod(i * 41 + t * (i & 1 ? 12 : 9) * dir, 380) - 30; if (o.clear && x > o.clear[0] && x < o.clear[1]) continue; const _u = 0, col = ['#c84c3c', '#3c6c9c', '#d8b84c', '#6c9c4c', '#8c5ca8'][i % 5];
    if (i === 4) { // a white horse with coloured reins
      const hx2 = x; E(c, hx2, 136, 12, 6, '#f4f4f0'); E(c, hx2 + dir * 12, 128, 4, 5, '#f4f4f0'); for (const lx of [-8, -4, 5, 9]) L(c, hx2 + lx, 140, hx2 + lx + Math.sin(t * 8 + lx) * 1.5, 150, '#e0e0d8', 2); L(c, hx2 + dir * 12, 128, hx2 - dir * 2, 132, '#e83c8c'); continue; }
    blit(c, robeFig({ id: 'cw' + i, robe: col, robe2: col, trim: '#f4f0e8', sash: '#2c2c34', hair: '#1c1c24', hat: i % 3 ? 'bun' : 'cap', female: i % 4 === 1 }, { f: Math.floor(t * 6 + i) & 3, k: 'c' }), x, 146 - (i % 3), FIG_AX2, FIG_AY2, { s: 0.7, flip: dir < 0 });
  }
  if (o.night && o.bats !== false) for (let i = 0; i < 3; i++) { const x = mod(i * 90 + t * 20, 360) - 20, y = 24 + i * 9 + Math.sin(t * 4 + i) * 4, w2 = Math.sin(t * 16 + i) > 0 ? 4 : 1; PF(c, [x - 6, y - w2, x, y + 1, x + 6, y - w2, x, y - 1], '#1c1424'); }
  if (o.dusk) { c.fillStyle = DA('#f8a040', 0.1); c.fillRect(0, 0, W, H); }
  if (o.shadows !== false && !o.night) c.fillStyle = 'rgba(0,0,0,0)';
}
function goldPile(c, x, y, n, t) { for (let i = 0; i < n; i++) { const a = hash(i) * Math.PI, r = Math.sqrt(i / n) * 26; const px = x + Math.cos(a) * r * 1.4, py = y - Math.sin(a) * r * 0.7; R(c, px, py, 4, 3, i % 3 ? '#f8d050' : '#c89c28'); if ((Math.floor(t * 4) + i) % 23 === 0) P(c, px + 1, py, C.white); } }
function mountainsFar(c, t, ox, y, cols) { for (let k = 0; k < 3; k++) for (let i = 0; i < 10; i++) { const x = mod(i * 70 + k * 23 - ox * (0.3 + k * 0.3), 560) - 80, h = 40 + (i * 17 % 30) + k * 10; PF(c, [x - 50, y + k * 18, x, y - h + k * 18, x + 50, y + k * 18], cols[k]); } }
function bigDipper(c, t, x, y, s) { const pts = [[0, 0], [14, 4], [26, 4], [36, 10], [40, 22], [56, 24], [58, 10]]; pts.forEach(([a, b], i) => { const tw = 0.7 + 0.3 * Math.sin(t * 3 + i); glow(c, x + a * s, y + b * s, 3 * s * tw, 3 * s * tw, '#f8f0c0', 2 * (0.25)); E(c, x + a * s, y + b * s, 1.2 * s, 1.2 * s, '#ffffff'); }); }
function cliffRock(c, t) {
  VG(c, 0, 0, W, 150, ['#03040c', '#0a0e24', '#1a1e3c']);
  for (let i = 0; i < 60; i++) { const tw = (Math.floor(t * 2) + i) % 7; P(c, (i * 71 + 13) % W, (i * 37 + 5) % 118, tw ? '#c8c8e0' : '#5c5c80'); }
  bigDipper(c, t, 26, 16, 1.7);
  for (let i = 0; i < 6; i++) { const x = i * 60 - 20; PF(c, [x, 132, x + 30, 92 - (i * 13 % 26), x + 60, 132], '#141830'); }
  PF(c, [216, 150, 230, 60, 246, 30, 270, 14, 320, 6, 320, 150], '#1a1a2a'); for (let k = 0; k < 8; k++) L(c, 236 + k * 9, 40 + k * 6, 240 + k * 9, 140, '#24243a');
  // the twisted pine on the cliff
  const sw = Math.sin(t * 1.6) * 2; L(c, 268, 22, 250, 14, '#3c2c20', 4); L(c, 250, 14, 226 + sw, 20, '#3c2c20', 3); L(c, 236, 17, 230 + sw, 6, '#3c2c20', 2);
  for (const [px, py, r] of [[226, 18, 14], [240, 8, 10], [254, 12, 11], [222, 6, 9]]) { E(c, px + sw, py, r, r * 0.45, '#1c3c2c'); E(c, px + sw, py - 2, r * 0.8, r * 0.3, '#2c5c40'); }
  // the flat rock
  PF(c, [0, 136, 30, 126, 120, 122, 210, 124, 270, 128, 320, 126, 320, 150, 0, 150], '#4c4c64'); PF(c, [0, 136, 30, 126, 120, 122, 210, 124, 270, 128, 320, 126, 320, 130, 0, 140], '#6c6c88');
  for (let i = 0; i < 12; i++) L(c, 10 + i * 26, 130 + (i % 3) * 3, 22 + i * 26, 132 + (i % 3) * 3, '#3c3c54');
  R(c, 0, 150, W, H - 150, '#06060e'); for (let i = 0; i < 6; i++) glow(c, 30 + i * 56, 170 + (i % 2) * 6, 40, 6, '#3c3c64', 2 * (0.4));
}
/* a thin horse with a human face (the parents, reborn as beasts) */
function horseSpr(t, who, o = {}) {
  return SPR('hs' + who + (o.down ? 'd' : '') + (o.tear ? 't' : ''), 60, 40, c => {
    const body = who ? '#9c8c78' : '#8c7c68', dark = who ? '#6c5c4c' : '#5c4c3c', face = who ? '#ecd0b8' : '#e0b894', hair = who ? '#3c3038' : '#2c2c2c';
    if (o.down) {
      E(c, 26, 30, 20, 7, body); E(c, 26, 33, 18, 4, dark); for (let i = 0; i < 5; i++) L(c, 14 + i * 6, 25, 15 + i * 6, 33, DA('#2c1c14', 0.6));
      for (let i = 0; i < 4; i++) L(c, 10 + i * 10, 35, 4 + i * 10, 38, body, 3); L(c, 6, 28, 0, 34, dark, 2);
      L(c, 44, 30, 50, 28, body, 6); E(c, 52, 29, 7, 7, face); PF(c, [45, 24, 52, 20, 59, 24, 56, 25, 48, 25], hair);
      L(c, 49, 29, 51, 29, C.k); L(c, 54, 29, 56, 29, C.k); R(c, 51, 33, 3, 1, '#8c4c4c');
      if (o.tear) { R(c, 50, 30, 1, 5, '#c81818'); R(c, 55, 30, 1, 5, '#c81818'); }
      for (let i = 0; i < 3; i++) R(c, 18 + i * 9, 26, 3, 1, '#c81818');
      return;
    }
    E(c, 26, 18, 17, 8, body); E(c, 26, 21, 15, 4, dark); for (let i = 0; i < 5; i++) L(c, 18 + i * 4, 12, 19 + i * 4, 22, DA('#2c1c14', 0.55));
    for (const [lx, ph] of [[13, 0], [19, 1], [33, 2], [39, 3]]) { const sw = Math.sin(t * 2 + ph) * 0.6; L(c, lx, 24, lx + sw, 31, body, 3); L(c, lx + sw, 31, lx + sw, 38, dark, 2); R(c, lx - 1 + sw, 38, 3, 1, '#1c1414'); }
    L(c, 9, 16, 3, 26, '#4c3c2c', 2); L(c, 40, 14, 46, 6, body, 6); for (let k = 0; k < 4; k++) L(c, 40 + k * 2, 12 - k * 2, 37 + k * 2, 10 - k * 2, hair);
    E(c, 50, 8, 7, 7, face); PF(c, [43, 3, 50, -1, 57, 3, 54, 4, 46, 4], hair);
    L(c, 47, 8, 49, 8, C.k); L(c, 52, 8, 54, 8, C.k); R(c, 49, 12, 3, 1, '#8c4c4c');
    if (o.tear) { R(c, 48, 9, 1, 5, '#c81818'); R(c, 53, 9, 1, 5, '#c81818'); }
  });
}
