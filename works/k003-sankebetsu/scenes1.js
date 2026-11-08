/* ================= 記録 #003 三毛別羆事件: cast & props ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => (S.lines.length ? S.lines[S.lines.length - 1].se : 0);
const yearFlash = (c, t, t0, year, x = 214, y = 10, sub) => { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } };

/* ---- people (pioneers, 1915): detailed robed figures ---- */
const PIONEER = [
  { id: 'p0', robe: '#5c4c3c', robe2: '#3c3028', trim: '#a89c88', sash: '#2c2420', hair: '#1c1c24', hat: 'cap', hatCol: '#3c3430' },
  { id: 'p1', robe: '#3c4c5c', robe2: '#2c3844', trim: '#a8b0b8', sash: '#1c1c24', hair: '#1c1c24' },
  { id: 'p2', robe: '#6c5c44', robe2: '#4c4030', trim: '#c8b898', sash: '#3c2c1c', hair: '#2c2420', hat: 'cap', hatCol: '#5c4c3c' },
  { id: 'p3', robe: '#4c3c34', robe2: '#342824', trim: '#b8a890', sash: '#1c1414', hair: '#1c1c24' },
];
const SABURO = { id: 'sab', robe: '#5c4834', robe2: '#3c3024', trim: '#c8b494', sash: '#2c2018', hair: '#1c1c24' };
const YAYO = { id: 'yay', robe: '#6c4c5c', robe2: '#4c3444', trim: '#d8c8b8', sash: '#8c2c2c', hair: '#1c1c24', female: true };
const SUGA = { id: 'sug', coat: '#1c2434', coat2: '#141a28', pants: '#1c2434', boots: '#141414', hair: '#1c1c24', hat: 'bowler', hatCol: '#141a28', moustache: true };
const HUNTER = { id: 'hun', robe: '#6c5434', robe2: '#4c3c24', trim: '#8c7c5c', sash: '#2c2018', hair: '#3c3434', hat: 'cap', hatCol: '#4c3c2c', old: false };
function pioneer(c, st, x, y, s, o = {}) { blit(c, robeFig(st, o), x, y, FIG_AX2, FIG_AY2, { s: s * 0.72, flip: o.flip }); }
/* a rifle held by a figure drawn at (x,y) feet, scale s; aim: 0 carried, 1 aimed */
function figRifle(c, x, y, s, aim, flip) {
  const d = flip ? -1 : 1, k = s * 0.72, sx = x + d * 4 * k, sy = y - 32 * k;
  if (aim) { L(c, sx, sy, sx + d * 26 * k, sy - 2 * k, '#3c2c1c', Math.max(1, k * 2)); L(c, sx + d * 12 * k, sy - 1 * k, sx + d * 28 * k, sy - 2.5 * k, '#5c5c64', Math.max(1, k)); }
  else { L(c, sx - d * 4 * k, sy + 10 * k, sx + d * 6 * k, sy - 16 * k, '#3c2c1c', Math.max(1, k * 2)); }
}

/* ---- the brown bear (Ezo higuma), side view facing right ----
   pose: 'walk' (f 0..3) | 'stand' (upright) | 'lunge' | 'down'  — 84x56 (walk) / 50x84 (stand) */
const BEAR = { f0: '#1c140e', f1: '#2c2016', f2: '#3c2c1e', f3: '#5c4430', snout: '#6c5440', eye: '#c8281c' };
function bearSpr(pose = 'walk', f = 0, o = {}) {
  const key = 'bear' + pose + f + (o.eyes ? 'e' : '');
  if (pose === 'stand') return SPR(key, 50, 84, c => {
    E(c, 25, 52, 17, 26, BEAR.f1); E(c, 23, 48, 14, 22, BEAR.f2); for (let i = 0; i < 18; i++) L(c, 12 + (i * 5 % 26), 30 + (i * 7 % 40), 11 + (i * 5 % 26), 34 + (i * 7 % 40), BEAR.f0);
    R(c, 13, 74, 10, 10, BEAR.f1); R(c, 28, 74, 10, 10, BEAR.f1); for (const x0 of [13, 28]) for (let k = 0; k < 3; k++) R(c, x0 + 1 + k * 3, 83, 2, 1, '#c8c0b0');
    L(c, 12, 34, 2, 18, BEAR.f1, 7); L(c, 38, 34, 48, 18, BEAR.f1, 7); for (const [x0, y0] of [[2, 16], [46, 16]]) for (let k = 0; k < 3; k++) L(c, x0 - 2 + k * 2, y0, x0 - 3 + k * 2, y0 - 4, '#d8d0c0');
    E(c, 25, 18, 13, 12, BEAR.f1); E(c, 24, 16, 11, 10, BEAR.f2); E(c, 15, 7, 4, 4, BEAR.f1); E(c, 35, 7, 4, 4, BEAR.f1); E(c, 25, 24, 6, 5, BEAR.snout); E(c, 25, 21, 3, 2, BEAR.f0);
    R(c, 18, 15, 3, 2, BEAR.eye); R(c, 29, 15, 3, 2, BEAR.eye); PF(c, [20, 27, 30, 27, 28, 31, 22, 31], '#3c0808'); for (const x0 of [21, 28]) PF(c, [x0, 27, x0 + 1, 27, x0 + 0.5, 30], '#f0e8d8');
  });
  if (pose === 'down') return SPR(key, 84, 34, c => { E(c, 40, 22, 34, 11, BEAR.f1); E(c, 38, 19, 30, 8, BEAR.f2); E(c, 72, 24, 11, 9, BEAR.f1); E(c, 80, 27, 5, 4, BEAR.snout); L(c, 70, 22, 74, 22, BEAR.f0); for (let i = 0; i < 4; i++) L(c, 16 + i * 16, 30, 12 + i * 16, 33, BEAR.f1, 4); });
  // side view (faces right), 84x56, anchor at the feet (42, 55): high shoulder hump, round head with two round ears,
  // short thick muzzle, thick legs with pale claws — so it never reads as a rat or a dog
  return SPR(key, 84, 56, c => {
    const lunge = pose === 'lunge', sw = lunge ? 0 : [0, 4, 0, -4][f & 3], bob = lunge ? 0 : (f & 1);
    const claws = (x, y, dir = 1) => { E(c, x + 4, y - 1, 6, 2.5, BEAR.f1); for (let k = 0; k < 3; k++) L(c, x + 4 + k * 2.5, y, x + 6 + k * 2.5, y + 2, '#d8d0c0'); };
    // far legs (darker)
    L(c, 20, 34 + bob, 20 - sw, 52, BEAR.f0, 9); claws(16 - sw, 53);
    if (!lunge) { L(c, 58, 32 + bob, 58 + sw, 52, BEAR.f0, 9); claws(54 + sw, 53); }
    // body: low rump, big shoulder hump rising above the head line
    E(c, 34, 32 + bob, 26, 15, BEAR.f1); E(c, 54, 26 + bob, 17, 17, BEAR.f1); E(c, 52, 15 + bob, 13, 9, BEAR.f1);
    E(c, 34, 28 + bob, 20, 9, BEAR.f2); E(c, 53, 16 + bob, 8, 4, BEAR.f2); E(c, 54, 14 + bob, 4, 2, BEAR.f3); E(c, 12, 26 + bob, 4, 3, BEAR.f2); // back light, hump light, tail
    for (let i = 0; i < 30; i++) { const x = 12 + (i * 11 % 56), y = 16 + (i * 7 % 26) + bob; L(c, x, y, x - 2, y + 4, BEAR.f0); } // shaggy fur
    for (let x = 16; x < 64; x += 4) L(c, x, 45 + bob, x - 1, 48 + bob, BEAR.f0); // belly fringe
    // near legs: thick, long claws
    L(c, 26, 36 + bob, 26 + sw, 52, BEAR.f1, 10); L(c, 24, 38 + bob, 24 + sw, 50, BEAR.f2, 3); claws(22 + sw, 53);
    if (lunge) { L(c, 58, 30, 76, 40, BEAR.f1, 10); L(c, 58, 28, 75, 37, BEAR.f2, 3); E(c, 78, 41, 4, 4, BEAR.f1); for (let k = 0; k < 4; k++) L(c, 80, 38 + k * 2, 84, 39 + k * 2, '#e8e0d0'); // a forepaw swiping forward, claws out
      L(c, 56, 34, 60, 52, BEAR.f0, 9); claws(56, 53); }
    else { L(c, 62, 34 + bob, 62 - sw, 52, BEAR.f1, 10); L(c, 60, 36 + bob, 60 - sw, 50, BEAR.f2, 3); claws(58 - sw, 53); }
    // head: big and round, sitting low and forward of the hump
    const hx = 70, hy = (lunge ? 22 : 30) + bob;
    E(c, hx - 4, hy - 9, 4, 4, BEAR.f1); E(c, hx + 3, hy - 10, 4, 4, BEAR.f1); E(c, hx - 4, hy - 9, 1.8, 1.8, BEAR.snout); E(c, hx + 3, hy - 10, 1.8, 1.8, BEAR.snout); // two round ears
    E(c, hx, hy, 10, 9, BEAR.f1); E(c, hx - 1, hy - 2, 8, 6, BEAR.f2); for (let k = 0; k < 6; k++) L(c, hx - 9 + k * 2, hy + 6, hx - 10 + k * 2, hy + 9, BEAR.f1); // cheek ruff
    E(c, hx + 8, hy + 3, 5.5, 4.5, BEAR.snout); E(c, hx + 8, hy + 1, 4, 2.5, BEAR.f3); E(c, hx + 12, hy + 1, 2.2, 2, '#0c0806'); P(c, hx + 11, hy, '#5c5c64'); // short thick muzzle, nose
    R(c, hx + 1, hy - 3, 2, 2, o.eyes ? BEAR.eye : '#0c0806'); if (o.eyes) P(c, hx + 1, hy - 3, '#f8c0a0'); L(c, hx - 1, hy - 5, hx + 3, hy - 4, BEAR.f0);
    if (lunge) { PF(c, [hx + 4, hy + 5, hx + 14, hy + 4, hx + 12, hy + 12, hx + 5, hy + 10], '#3c0808'); E(c, hx + 9, hy + 9, 2.5, 1.2, '#8c2c2c'); for (const x0 of [hx + 6, hx + 11]) { PF(c, [x0, hy + 5, x0 + 1.5, hy + 5, x0 + 0.7, hy + 8], '#f0e8d8'); PF(c, [x0, hy + 11, x0 + 1.5, hy + 11, x0 + 0.7, hy + 8.5], '#f0e8d8'); } }
  });
}
/* the bear's face (48x48) — horror close-up, thumbnail */
function bearFace(o = {}) {
  return SPR('bearF' + (o.roar ? 'r' : '') + (o.blink || 0), 48, 48, c => {
    for (let i = 0; i < 20; i++) { const a = i / 20 * TAU; PF(c, [24 + Math.cos(a) * 16, 26 + Math.sin(a) * 15, 24 + Math.cos(a + 0.16) * 22, 26 + Math.sin(a + 0.16) * 21, 24 + Math.cos(a + 0.32) * 16, 26 + Math.sin(a + 0.32) * 15], BEAR.f0); }
    E(c, 6, 6, 6, 6, BEAR.f1); E(c, 42, 6, 6, 6, BEAR.f1); E(c, 6, 7, 3, 3, BEAR.f3); E(c, 42, 7, 3, 3, BEAR.f3);
    E(c, 24, 26, 18, 17, BEAR.f1); E(c, 24, 23, 15, 13, BEAR.f2); for (let i = 0; i < 16; i++) L(c, 10 + i * 2, 10 + (i % 3), 9 + i * 2, 16 + (i % 4), BEAR.f1);
    E(c, 24, 34, 9, 8, BEAR.snout); E(c, 24, 32, 7, 5, BEAR.f3); E(c, 24, 29, 4.5, 3, BEAR.f0); P(c, 22, 28, '#5c5c64');
    for (const x0 of [15, 33]) { if (o.blink === 2) { L(c, x0 - 3, 21, x0 + 3, 21, BEAR.f0); continue; } E(c, x0, 21, 3, 2.5, '#0c0604'); R(c, x0 - 1, 20, 2, 2, BEAR.eye); P(c, x0 - 1, 20, '#f8b090'); L(c, x0 - 4, 18, x0 + 3, 19, BEAR.f0); }
    if (o.roar) { PF(c, [16, 36, 32, 36, 30, 46, 18, 46], '#2c0404'); E(c, 24, 44, 5, 2, '#8c2c2c'); for (const x0 of [17, 29]) PF(c, [x0, 36, x0 + 2, 36, x0 + 1, 41], '#f0e8d8'); for (const x0 of [18, 28]) PF(c, [x0, 46, x0 + 2, 46, x0 + 1, 42], '#f0e8d8'); }
    else { L(c, 24, 33, 20, 37, BEAR.f0); L(c, 24, 33, 28, 37, BEAR.f0); }
  });
}
/* faces for the dialog window */
function pFace(id, o) {
  return SPR('pf' + id + (o.blink || 0), 48, 48, c => {
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.robe); PF(c, [18, 37, 24, 44, 30, 37], o.trim || '#e8e0d0');
    R(c, 19, 30, 10, 8, '#b88c6c'); E(c, 24, 21, 11, 12.5, '#b88c6c'); E(c, 23.5, 20.5, 10.5, 12, o.skin || '#e0b48c');
    if (o.female) { PF(c, [11, 24, 12, 8, 22, 4, 33, 6, 37, 24, 32, 11, 22, 10, 16, 12], '#1c1c24'); E(c, 24, 4, 8, 4, '#1c1c24'); R(c, 30, 2, 6, 1, '#d8c890'); }
    else PF(c, [12, 16, 14, 8, 22, 5, 33, 7, 36, 16, 32, 11, 22, 10, 16, 12], '#1c1c24');
    if (o.cap) { R(c, 12, 4, 24, 7, o.cap); R(c, 10, 10, 28, 2, '#0c0c14'); if (o.badge) R(c, 22, 5, 4, 3, '#f8d860'); }
    for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 3, 21, C.k); continue; } R(c, x0, 20, 3, 2, C.k); }
    L(c, 17, 17, 21, o.stern ? 18 : 17, '#2c2020'); L(c, 27, o.stern ? 18 : 17, 31, 17, '#2c2020');
    L(c, 23, 22, 22, 26, '#b88c6c'); if (o.moustache) R(c, 19, 27, 10, 2, '#1c1414'); R(c, 21, 30, 6, 1, '#8c4c3c'); if (o.stubble) for (let i = 0; i < 10; i++) P(c, 17 + (i * 7 % 14), 28 + (i * 3 % 5), '#8c6c5c');
  });
}
const PORTRAITS = {
  saburo: p => withMouth('pmSa', pFace('sa', { robe: SABURO.robe, trim: SABURO.trim, stubble: true, blink: p.blink }), p, 23, 29),
  yayo: p => withMouth('pmYa', pFace('ya', { robe: YAYO.robe, trim: YAYO.trim, female: true, skin: '#e8c0a0', blink: p.blink }), p, 23, 29),
  suga: p => withMouth('pmSu', pFace('su', { robe: '#1c2434', trim: '#d8d8d8', cap: '#141a28', badge: true, moustache: true, stern: true, blink: p.blink }), p, 23, 29),
};

/* ---- scenery ---- */
/* winter sky + far mountains; mood: 'day' | 'dusk' | 'night' */
function winterSky(c, t, mood = 'day', ox = 0) {
  const sky = mood === 'night' ? ['#04060e', '#0a1226', '#16223c'] : mood === 'dusk' ? ['#2c2a4c', '#6c4c64', '#c8806c'] : ['#8ca8c8', '#b8cce0', '#e0e8f0'];
  VG(c, 0, 0, W, 120, sky);
  if (mood === 'night') { for (let i = 0; i < 40; i++) P(c, hash(i * 13) * W, hash(i * 7 + 3) * 80, (Math.floor(t * 3 + i) % 6) ? '#8c9cbc' : '#e8f0ff'); const my = skyY(26); glow(c, 262, my, 22, 22, '#dce8ff', 0.35); E(c, 262, my, 7, 7, '#f0f4ff'); }
  const far = mood === 'night' ? ['#1c2638', '#2c3a50'] : mood === 'dusk' ? ['#4c3c5c', '#6c5c74'] : ['#8c9cb4', '#c8d4e4'];
  for (let i = 0; i < 9; i++) { const x = mod(i * 58 - ox * 0.1, 470) - 60, h = 34 + (i * 19 % 26); PF(c, [x - 60, 112, x, 112 - h, x + 60, 112], far[0]); PF(c, [x - 10, 112 - h + 8, x, 112 - h, x + 12, 112 - h + 10], far[1]); }
}
/* a snow-laden Todo fir */
function fir(c, x, y, h, mood = 'day', sway = 0) {
  const dk = mood === 'night' ? '#0c1c18' : '#1c3c2c', md = mood === 'night' ? '#14281e' : '#2c5c3c', sn = mood === 'night' ? '#8c9cb8' : '#f4f8fc';
  R(c, x - 1, y - h * 0.2, 3, h * 0.2, '#2c2018');
  for (let k = 0; k < 5; k++) { const yy = y - h * 0.15 - k * h * 0.17, w = h * (0.34 - k * 0.055); PF(c, [x - w + sway * k * 0.3, yy, x + sway * k * 0.4, yy - h * 0.26, x + w + sway * k * 0.3, yy], k & 1 ? md : dk); L(c, x - w * 0.8 + sway * k * 0.3, yy - 2, x + sway * k * 0.4, yy - h * 0.22, sn); }
}
function forestBand(c, t, y, n, mood, ox = 0, sc = 1, seed = 1) { for (let i = 0; i < n; i++) { const x = mod(i * (320 / n) * 1.3 + hash(seed + i) * 30 - ox, 400) - 40; fir(c, x, y + (i % 3) * 3, (34 + hash(seed * 3 + i) * 18) * sc, mood, Math.sin(t * 0.8 + i) * 0.5); } }
/* pioneer's board house with a snow-covered roof */
function kHouse(c, x, y, w, h, o = {}) {
  const night = o.mood === 'night';
  R(c, x, y - h, w, h, night ? '#2c241c' : '#6c5440'); for (let k = x + 3; k < x + w; k += 5) R(c, k, y - h, 1, h, night ? '#1c1810' : '#5c4434');
  PF(c, [x - 6, y - h + 1, x + w / 2, y - h - w * 0.38, x + w + 6, y - h + 1], night ? '#2c2c3c' : '#4c3c34');
  PF(c, [x - 6, y - h + 1, x + w / 2, y - h - w * 0.38, x + w + 6, y - h + 1, x + w + 2, y - h + 5, x + w / 2, y - h - w * 0.32, x - 2, y - h + 5], night ? '#8c9cb8' : '#f4f8fc');
  if (o.lit) { R(c, x + w * 0.2, y - h * 0.65, w * 0.22, h * 0.32, '#f8c860'); glow(c, x + w * 0.31, y - h * 0.5, 22, 16, '#f8b040', 0.35); }
  else if (o.window !== false) R(c, x + w * 0.2, y - h * 0.65, w * 0.22, h * 0.32, night ? '#0c0c14' : '#2c2420');
  R(c, x + w * 0.6, y - h * 0.7, w * 0.18, h * 0.7, night ? '#141010' : '#3c2c20');
  if (o.smoke) smoke(c, x + w * 0.8, y - h - w * 0.2, o.t || 0, x);
  if (o.corn) for (let i = 0; i < 6; i++) { const cx = x + 4 + i * 5; L(c, cx, y - h + 2, cx, y - h + 8, '#5c4c34'); E(c, cx, y - h + 12, 2, 5, '#e8c048'); }
  R(c, x - 4, y - 2, w + 8, 4, night ? '#7c8ca8' : '#e8eef4');
}
/* interior of a pioneer house: board walls, irori hearth with a pot hook, shelves, straw coats; light 0..1 */
function irori(c, t, light = 1, o = {}) {
  const FY = 136;
  R(c, 0, 0, W, FY, '#2c2018'); for (let x = 0; x < W; x += 14) { R(c, x, 0, 13, FY, '#3c2c20'); R(c, x, 0, 1, FY, '#4c3828'); }
  R(c, 0, 16, W, 7, '#1c140c'); R(c, 0, 100, W, 3, '#1c140c');
  // shelf with bowls and a jar, a straw raincoat and a hat on the wall, firewood stack
  R(c, 20, 52, 60, 3, '#5c4430'); for (let i = 0; i < 4; i++) E(c, 30 + i * 13, 49, 5, 3, ['#c8b898', '#8c6c4c', '#a89c88', '#6c5c4c'][i]); R(c, 70, 40, 8, 10, '#5c5c64');
  PF(c, [100, 30, 116, 30, 122, 76, 94, 76], '#a8884c'); for (let k = 0; k < 6; k++) L(c, 98 + k * 4, 34, 96 + k * 5, 76, '#8c6c38'); E(c, 108, 30, 9, 3, '#c8a860');
  for (let k = 0; k < 4; k++) R(c, 284, 110 + k * 6, 30, 5, k & 1 ? '#6c4c2c' : '#7c5c3c');
  if (o.window !== false) { const wx = o.wx || 236; R(c, wx, 40, 50, 40, '#1c140c'); VG(c, wx + 3, 43, 44, 34, ['#0c1430', '#1c2c4c']); R(c, wx + 24, 40, 2, 40, '#1c140c'); R(c, wx, 59, 50, 2, '#1c140c');
    if (o.broken) { R(c, wx, 40, 50, 40, '#05050a'); for (let i = 0; i < 8; i++) L(c, wx + 25, 60, wx + 25 + Math.cos(i) * 30, 60 + Math.sin(i) * 24, '#5c4c3c', 2); } else for (let i = 0; i < 4; i++) P(c, wx + 8 + i * 10, 50 + (i * 7 % 20), '#e8eef8'); }
  R(c, 0, FY, W, H - FY, '#3c2c1c'); for (let y = FY + 4; y < H; y += 7) R(c, 0, y, W, 1, '#2c2014'); R(c, 0, FY, W, 2, '#5c4430');
  // the hearth with the pot hook (jizai-kagi) and kettle
  R(c, 112, FY - 4, 96, 16, '#2c2014'); R(c, 116, FY - 2, 88, 12, '#5c5048'); E(c, 160, FY + 4, 28, 4, '#3c3430');
  L(c, 160, 23, 160, FY - 26, '#1c140c', 2); R(c, 156, FY - 28, 8, 3, '#3c2c20'); E(c, 160, FY - 18, 10, 8, '#1c1c1c'); E(c, 157, FY - 21, 3, 2, '#3c3c3c');
  if (light > 0) { for (let i = 0; i < 5; i++) flame(c, 150 + i * 5, FY + 2, 4 + light * 3, t, i); glow(c, 160, FY - 10, 140 * light, 90 * light, '#f8a040', 0.4 * light); for (let i = 0; i < 3; i++) { const u = fr(t * 0.4 + i / 3); E(c, 160 + Math.sin(t + i) * 4, FY - 30 - u * 40, 3 + u * 6, 2 + u * 4, DA('#a89888', 0.5 * (1 - u))); } }
  if (o.lamp !== false) { const lx = o.lx || 64, on = o.lampOn !== false; L(c, lx, 0, lx, 64, '#1c140c'); R(c, lx - 5, 64, 10, 12, on ? '#f8e0a0' : '#3c3c3c'); R(c, lx - 6, 76, 12, 3, '#5c4c3c'); if (on) glow(c, lx, 70, 80, 60, '#f8d080', 0.4); }
  if (light < 1) { c.fillStyle = DA('#05040a', 0.8 * (1 - light)); c.fillRect(0, 0, W, H); }
}
