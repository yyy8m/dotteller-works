/* ================= 記録 #004 切り裂きジャック: cast & props (Victorian East End, 1888) ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => (S.lines.length ? S.lines[S.lines.length - 1].se : 0);
const yearFlash = (c, t, t0, year, x = 214, y = 10, sub) => { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } };

/* ---- people ---- */
/* Victorian woman (26x58, anchor 13,57): bell skirt, shawl, bonnet */
function vWoman(st, o = {}) {
  const f = o.f == null ? -1 : o.f;
  return SPR('vw' + st.id + f + (o.expr || '') + (o.k || ''), 26, 58, c => {
    const sw = f < 0 ? 0 : [0, 1, 0, -1][f & 3];
    PF(c, [7, 30, 19, 30, 23 + sw, 56, 3 + sw, 56], st.skirt); PF(c, [13, 30, 19, 30, 23 + sw, 56, 13, 56], st.skirt2 || st.skirt); for (let x = 6; x < 22; x += 4) L(c, x, 34, x + sw - 1, 55, DA('#000000', 0.2));
    R(c, 8, 18, 10, 13, st.bodice); PF(c, [5, 18, 21, 18, 18, 30, 8, 30], st.shawl); L(c, 13, 18, 13, 30, DA('#000000', 0.3));
    L(c, 7, 20, 4, 32, st.shawl, 3); L(c, 19, 20, 22 + (o.arm === 'reach' ? 3 : 0), 32 - (o.arm === 'reach' ? 8 : 0), st.shawl, 3);
    const hx = 13, hy = 11; E(c, hx, hy, 5.5, 6.5, '#c89c80'); E(c, hx - 0.4, hy - 0.4, 5, 6, st.skin || '#ecc8b0');
    PF(c, [hx - 6, hy + 1, hx - 6, hy - 5, hx, hy - 8, hx + 6, hy - 5, hx + 6, hy + 1, hx + 4, hy - 3, hx - 4, hy - 3], st.hair || '#3c2c24');
    PF(c, [hx - 7, hy - 2, hx - 5, hy - 9, hx + 3, hy - 10, hx + 7, hy - 4, hx + 4, hy - 6, hx - 4, hy - 6], st.bonnet || '#2c2430'); R(c, hx - 1, hy - 9, 3, 1, st.ribbon || '#8c2c3c');
    const ex = o.expr || 'normal';
    if (ex === 'shock') { R(c, hx - 3, hy - 1, 2, 3, C.k); R(c, hx + 2, hy - 1, 2, 3, C.k); E(c, hx, hy + 4, 1.3, 1.5, '#5c1c1c'); }
    else { R(c, hx - 3, hy, 2, 1, C.k); R(c, hx + 2, hy, 2, 1, C.k); R(c, hx - 1, hy + 4, 3, 1, '#8c4c4c'); }
  });
}
const WOMEN = [
  { id: 'w0', skirt: '#3c3044', skirt2: '#2c2434', bodice: '#5c4c3c', shawl: '#6c5c4c', bonnet: '#2c2430', ribbon: '#8c2c3c' },
  { id: 'w1', skirt: '#4c3c2c', skirt2: '#3c2c20', bodice: '#3c3c4c', shawl: '#7c4c3c', bonnet: '#1c1c24', ribbon: '#4c6c8c' },
  { id: 'w2', skirt: '#2c3c3c', skirt2: '#1c2c2c', bodice: '#5c3c3c', shawl: '#5c5c6c', bonnet: '#3c2c2c', ribbon: '#a88c3c' },
  { id: 'w3', skirt: '#4c2c34', skirt2: '#3c2028', bodice: '#3c3434', shawl: '#8c7c5c', bonnet: '#2c2c34', ribbon: '#6c8c5c' },
  { id: 'w4', skirt: '#2c2c3c', skirt2: '#1c1c2c', bodice: '#6c4c4c', shawl: '#4c4c3c', bonnet: '#3c3044', ribbon: '#c86c6c' },
];
function woman(c, i, x, y, s, o = {}) { blit(c, vWoman(WOMEN[i % 5], o), x, y, FIG_AX2, FIG_AY2, { s: s * 0.72, flip: o.flip }); }
/* the man in the deerstalker and dark overcoat — always a silhouette */
const JACK = { id: 'jk', coat: '#0c0a0e', coat2: '#06050a', pants: '#0c0a0e', boots: '#050405', hair: '#0c0a0e', hat: 'hunt', hatCol: '#3c2c20', skin: '#1c1418' };
function jack(c, x, y, s, o = {}) { blit(c, suitFig(JACK, { f: o.f, arm: o.arm, k: 'j' + (o.k || '') }), x, y, FIG_AX2, FIG_AY2, { s: s * 0.72, flip: o.flip }); if (o.eyes) { const k = s * 0.72; for (const dx of [-2, 2]) R(c, x + dx * k, y - 46 * k, Math.max(1, k), Math.max(1, k * 0.6), '#f8e0a0'); } }
const PC = { id: 'pc', coat: '#141c34', coat2: '#0c1428', pants: '#141c34', boots: '#0c0c0c', hair: '#2c2018', hat: 'bowler', hatCol: '#0c1428', moustache: true };
function police(c, x, y, s, o = {}) { blit(c, suitFig(PC, { f: o.f, arm: o.arm, expr: o.expr, k: 'p' + (o.k || '') }), x, y, FIG_AX2, FIG_AY2, { s: s * 0.72, flip: o.flip }); if (o.lantern) { const k = s * 0.72, lx = x + (o.flip ? -10 : 10) * k, ly = y - 26 * k; R(c, lx - 2 * k, ly - 2 * k, 4 * k, 5 * k, '#c8a040'); glow(c, lx, ly, 26 * s, 18 * s, '#f8d080', 0.45); } }
const GENTS = [
  { id: 'g0', coat: '#3c3428', coat2: '#2c2420', pants: '#2c2c2c', boots: '#141414', hair: '#2c2018', hat: 'bowler', hatCol: '#1c1c1c' },
  { id: 'g1', coat: '#2c3434', coat2: '#1c2424', pants: '#3c3c3c', boots: '#141414', hair: '#5c4434', hat: 'hunt', hatCol: '#5c4c3c', moustache: true },
];

/* ---- the East End street at night: brick terraces, gas lamps, cobbles, a little haze ---- */
function brickWall(c, x, y, w, h, col = '#4c2c24', col2 = '#3c2018') { R(c, x, y, w, h, col); for (let yy = y; yy < y + h; yy += 4) { R(c, x, yy, w, 1, col2); for (let xx = x + ((yy - y) / 4 & 1) * 4; xx < x + w; xx += 8) R(c, xx, yy, 1, 4, col2); } }
function gasLamp(c, x, y, t, on = 1) {
  R(c, x - 1, y - 60, 3, 60, '#1c1c1c'); R(c, x - 4, y - 4, 9, 4, '#1c1c1c'); PF(c, [x - 6, y - 70, x + 6, y - 70, x + 4, y - 60, x - 4, y - 60], '#2c2c2c');
  if (on) { const fl = 0.9 + 0.1 * Math.sin(t * 9 + x); R(c, x - 3, y - 69, 7, 8, '#f8e0a0'); glow(c, x, y - 64, 60 * fl, 50 * fl, '#f8c870', 0.4); glow(c, x, y - 4, 40, 8, '#f8c870', 0.25); }
}
function eastEnd(c, t, o = {}) {
  VG(c, 0, 0, W, 60, ['#05060c', '#0c1020', '#1c1c2c']);
  for (let i = 0; i < 30; i++) P(c, hash(i * 13) * W, hash(i * 7) * 40, '#5c6478');
  const ox = o.ox || 0;
  // far rooftops and chimneys
  for (let i = 0; i < 10; i++) { const x = mod(i * 40 - ox * 0.3, 400) - 40, h = 50 + (i * 17 % 20); R(c, x, h, 40, 60, '#14121c'); R(c, x + 6, h - 12, 6, 12, '#14121c'); R(c, x + 24, h - 8, 5, 8, '#14121c'); }
  // near terraced houses
  for (let i = 0; i < 4; i++) { const x = mod(i * 110 - ox, 440) - 60, top = 30 + (i % 2) * 10;
    brickWall(c, x, top, 104, 118, i % 2 ? '#4c2c24' : '#3c2c2c', i % 2 ? '#3c2018' : '#2c2020');
    for (let k = 0; k < 3; k++) { const wx = x + 10 + k * 32, lit = (i * 3 + k) % 4 === 1; R(c, wx, top + 14, 16, 22, '#0c0c14'); if (lit) { R(c, wx + 1, top + 15, 14, 20, '#d8a050'); glow(c, wx + 8, top + 25, 18, 16, '#f8b050', 0.25); } R(c, wx + 7, top + 14, 2, 22, '#2c2020'); R(c, wx - 2, top + 36, 20, 2, '#5c4c44'); }
    R(c, x + 40, top + 70, 22, 48, '#1c1414'); R(c, x + 38, top + 68, 26, 3, '#5c4c44'); }
  // cobbles
  R(c, 0, 148, W, H - 148, '#2c2c34'); for (let y = 150; y < H; y += 6) for (let x = ((y / 6) & 1) * 6; x < W; x += 12) { R(c, x - ox % 12, y, 10, 4, '#3c3c48'); P(c, x - ox % 12 + 2, y, '#5c5c6c'); }
  R(c, 0, 146, W, 3, '#5c5c64');
  if (o.lamps !== false) for (let i = 0; i < 2; i++) gasLamp(c, mod(80 + i * 170 - ox, 360) - 20, 148, t);
  // haze
  for (let i = 0; i < 6; i++) { const x = mod(i * 70 + t * 6, 420) - 50; glow(c, x, 120 + (i % 3) * 14, 90, 14, '#8c94a8', 0.18); }
}
/* the "Dear Boss" letter */
function letterSheet(c, x, y, w, h, t, o = {}) {
  R(c, x + 3, y + 3, w, h, DA('#000000', 0.5)); R(c, x, y, w, h, '#e8dcbc'); R(c, x, y, w, 2, '#c8b894');
  for (let i = 0; i < 9; i++) R(c, x + 6, y + 30 + i * 9, w - 12, 1, '#c8b8a0');
  const n = Math.floor((o.k == null ? 1 : o.k) * 12);
  for (let i = 0; i < Math.min(n, 9); i++) { const lw = (w - 20) * (0.6 + 0.4 * hash(i)); for (let k = 0; k < lw; k += 3) P(c, x + 8 + k, y + 28 + i * 9 + Math.round(Math.sin(k * 0.7 + i) * 1.5), '#8c1c1c'); }
  if (o.head) TX(c, o.head, x + 8, y + 8, '#8c1c1c', 16, null);
  if (o.sign && n > 9) TX(c, o.sign, x + w - textSpr(o.sign, 16, '#8c1c1c').width - 6, y + h - 22, '#8c1c1c', 16, null);
}
/* faces for the dialog window */
function vFace(id, o) {
  return SPR('vf' + id + (o.blink || 0), 48, 48, c => {
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.coat); if (o.collar !== false) PF(c, [18, 37, 24, 44, 30, 37], '#e8e4dc');
    R(c, 19, 30, 10, 8, '#b88c6c'); E(c, 24, 21, 11, 12.5, '#b88c6c'); E(c, 23.5, 20.5, 10.5, 12, o.skin || '#ecc8a8');
    if (o.female) { PF(c, [11, 22, 12, 8, 22, 4, 33, 6, 37, 22, 32, 11, 22, 10, 16, 12], o.hair || '#4c3428'); PF(c, [8, 14, 12, 2, 24, -1, 36, 2, 40, 14, 34, 7, 14, 7], o.bonnet || '#2c2430'); R(c, 28, 3, 6, 2, '#8c2c3c'); }
    else { PF(c, [12, 16, 14, 8, 22, 5, 33, 7, 36, 16, 32, 11, 22, 10, 16, 12], o.hair || '#3c2c24'); if (o.top) { R(c, 13, -2, 22, 10, '#141414'); R(c, 9, 7, 30, 2, '#141414'); } }
    for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 3, 21, C.k); continue; } R(c, x0, 20, 3, 2, C.k); }
    L(c, 17, 17, 21, o.stern ? 18 : 17, '#3c2c24'); L(c, 27, o.stern ? 18 : 17, 31, 17, '#3c2c24');
    L(c, 23, 22, 22, 26, '#b88c6c'); if (o.moustache) PF(c, [16, 27, 23, 26, 25, 26, 32, 27, 30, 29, 24, 28, 18, 29], o.mcol || '#5c4434'); if (o.whiskers) { R(c, 12, 22, 3, 10, o.mcol || '#5c4434'); R(c, 33, 22, 3, 10, o.mcol || '#5c4434'); }
    R(c, 21, 30, 6, 1, '#8c4c3c');
  });
}
/* the shadow man's face: deerstalker, no features, two dim eyes */
function jackFace(o = {}) {
  return SPR('jf' + (o.blink || 0), 48, 48, c => {
    PF(c, [2, 48, 8, 36, 40, 36, 46, 48], '#0c0a0e'); PF(c, [10, 48, 16, 34, 22, 48], '#06050a'); PF(c, [26, 48, 32, 34, 38, 48], '#06050a'); // the collar turned up
    E(c, 24, 22, 11, 13, '#0c0a0e');
    PF(c, [10, 14, 14, 4, 24, 1, 34, 4, 38, 14, 34, 12, 14, 12], '#3c2c20'); for (let i = 0; i < 6; i++) L(c, 14 + i * 4, 4, 13 + i * 4, 12, '#2c2018'); PF(c, [8, 14, 24, 18, 40, 14, 36, 17, 12, 17], '#2c2018'); // deerstalker
    if (o.blink !== 2) for (const x0 of [19, 28]) { R(c, x0, 22, 2, 1, '#f8e0a0'); }
  });
}
const PORTRAITS = {
  man: p => jackFace({ blink: p.blink }),
  annie: p => withMouth('pmAn', vFace('an', { coat: '#6c5c4c', female: true, bonnet: '#2c2430', blink: p.blink }), p, 23, 29),
  writer: p => jackFace({ blink: 0 }),
  warren: p => withMouth('pmWa', vFace('wa', { coat: '#141c34', moustache: true, stern: true, mcol: '#8c8c8c', hair: '#8c8c8c', blink: p.blink }), p, 23, 29),
  macnaghten: p => withMouth('pmMa', vFace('ma', { coat: '#2c2c34', whiskers: true, moustache: true, top: true, blink: p.blink }), p, 23, 29),
};
