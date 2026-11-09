/* ================= 記録 #006 ディアトロフ峠事件: cast & places ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) return fn(c, t, S); return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function bigFace(c, spr, cx, cy, s, a, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(a < 1 ? ditherFade(pc, a, id + 'd') : pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }

/* ---- the nine (plus Yudin): 1950s winter clothes — knitted sweaters, wool caps, anoraks ---- */
const HIKERS = [
  { id: 'h0', name: 'ディアトロフ', top: 'sweater', coat: '#3c4c6c', pants: '#2c2c34', skin: '#e8c4a4', hair: '#4c3424', hairStyle: 'side', hat: 'cap', hatCol: '#5c6c8c' },
  { id: 'h1', name: 'ジナイダ', top: 'sweater', coat: '#8c3c3c', pants: '#2c2c34', skin: '#f0ccb0', hair: '#5c3c24', hairStyle: 'long', hat: 'cap', hatCol: '#d8d0c0' },
  { id: 'h2', name: 'リュドミラ', top: 'sweater', coat: '#6c5c8c', pants: '#3c3434', skin: '#f0ccb0', hair: '#c89c5c', hairStyle: 'curly', hat: 'cap', hatCol: '#c83c3c' },
  { id: 'h3', name: 'コレヴァトフ', top: 'jacket', coat: '#4c5c3c', shirt: '#c8c0b0', pants: '#2c2c2c', skin: '#e0b494', hair: '#2c2018', hat: 'cap', hatCol: '#3c3c3c', glasses: true },
  { id: 'h4', name: 'スロボディン', top: 'sweater', coat: '#7c6c4c', pants: '#2c2c34', skin: '#e0b494', hair: '#2c2018', hairStyle: 'side' },
  { id: 'h5', name: 'クリヴォニシチェンコ', top: 'sweater', coat: '#5c7c8c', pants: '#2c3034', skin: '#e8c0a0', hair: '#6c4c2c', hat: 'cap', hatCol: '#2c4c6c' },
  { id: 'h6', name: 'ドロシェンコ', top: 'sweater', coat: '#8c6c3c', pants: '#3c3428', skin: '#e8c0a0', hair: '#2c2018', hairStyle: 'curly' },
  { id: 'h7', name: 'チボ＝ブリニョーリ', top: 'jacket', coat: '#5c4c3c', shirt: '#d8d0c0', pants: '#2c2824', skin: '#e0b494', hair: '#1c1814', hat: 'cap', hatCol: '#7c2c2c', moustache: true },
  { id: 'h8', name: 'ゾロタリョフ', top: 'jacket', coat: '#3c3c34', shirt: '#a8a090', pants: '#2c2824', skin: '#d8a888', hair: '#3c3028', hat: 'cap', hatCol: '#5c4c3c', moustache: true },
];
const YUDIN = { id: 'yu', top: 'sweater', coat: '#4c6c5c', pants: '#2c2c34', skin: '#e8c4a4', hair: '#3c2c1c', hairStyle: 'side', hat: 'cap', hatCol: '#8c8c7c' };
const SEARCH = [0, 1, 2, 3].map(i => ({ id: 'sr' + i, top: 'jacket', coat: ['#5c3c2c', '#3c4c3c', '#2c3c5c', '#4c4c4c'][i], shirt: '#c8c0b0', pants: '#2c2c2c', skin: '#e0b494', hair: '#2c2018', hat: 'cap', hatCol: ['#3c3c3c', '#5c2c2c', '#2c2c3c', '#4c3c2c'][i] }));
// a hiker on skis with a rucksack (figure + gear), facing right
function skier(c, st, x, y, t, o = {}) {
  const f = o.walk ? Math.floor(t * 5 + (o.ph || 0)) & 3 : -1, k = o.k || 'sk';
  if (o.skis !== false) { L(c, x - 18, y + 1, x + 22, y + 1, '#8c5c34', 2); L(c, x + 20, y + 1, x + 24, y - 2, '#8c5c34', 2); }
  blit(c, modFig(st, { f, arm: o.arm || 'hold', expr: o.expr, k }), x, y, FIG_AX2, FIG_AY2, { flip: o.flip });
  if (o.pack !== false) { const px = o.flip ? x + 5 : x - 13; R(c, px, y - 40, 8, 14, '#5c4c34'); R(c, px, y - 40, 8, 2, '#7c6c4c'); R(c, px + 1, y - 34, 6, 1, '#3c3020'); }
  if (o.pole !== false) L(c, x + (o.flip ? -9 : 9), y - 30, x + (o.flip ? -14 : 14), y + 1, '#5c5c64');
}

/* ---- portraits (48x48) ---- */
function hikerFace(st, o = {}) {
  return SPR('hkF' + st.id + (o.blink || 0), 48, 48, c => {
    const sk = st.skin, sk2 = shadeCol(sk, 0.78);
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], st.coat); for (let y = 39; y < 48; y += 3) L(c, 6, y, 42, y, shadeCol(st.coat, 0.82)); R(c, 17, 36, 14, 4, shadeCol(st.coat, 0.7)); // knit collar
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    if (st.hairStyle === 'long' || st.hairStyle === 'curly') { R(c, 11, 14, 4, 18, st.hair); R(c, 33, 14, 4, 18, st.hair); }
    PF(c, [12, 18, 13, 9, 22, 5, 33, 6, 36, 17, 33, 12, 24, 10, 16, 12], st.hair);
    if (st.hat === 'cap') { E(c, 24, 9, 14, 8, st.hatCol); R(c, 10, 9, 28, 5, st.hatCol); for (let x = 12; x < 37; x += 3) L(c, x, 2, x, 13, shadeCol(st.hatCol, 0.8)); E(c, 24, 0, 4, 3, shadeCol(st.hatCol, 1.3)); }
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 4, 21, '#2c1c14'); continue; } R(c, x0, 19, 4, 3, '#f8f4ec'); R(c, x0 + 1, 19, 2, 3, C.k); L(c, x0 - 1, 16, x0 + 4, 16, shadeCol(st.hair, 0.9)); }
    if (st.glasses) { R(c, 15, 18, 8, 6, '#1c1c1c'); R(c, 25, 18, 8, 6, '#1c1c1c'); R(c, 16, 19, 6, 4, '#c8d4dc'); R(c, 26, 19, 6, 4, '#c8d4dc'); R(c, 18, 20, 2, 2, C.k); R(c, 28, 20, 2, 2, C.k); }
    L(c, 24, 23, 23, 27, sk2); if (st.moustache) R(c, 19, 28, 10, 2, shadeCol(st.hair, 0.9)); R(c, 21, 31, 6, 1, '#8c4c3c');
    E(c, 16, 26, 2, 1.5, '#e8a090'); E(c, 32, 26, 2, 1.5, '#e8a090'); // cold cheeks
  });
}
const PORTRAITS = {
  searcher: p => withMouth('pmsr', hikerFace(SEARCH[0], { blink: p.blink }), p, 24, 31),
  yudin: p => withMouth('pmyu', hikerFace(YUDIN, { blink: p.blink }), p, 24, 31),
};

/* ---- places ---- */
function uralSky(c, t, mood = 'day', h = 120) {
  const sky = mood === 'night' ? ['#02040c', '#060c1c', '#0c1830'] : mood === 'storm' ? ['#3c4454', '#5c6474', '#8c949c'] : mood === 'dusk' ? ['#1c2440', '#4c4c6c', '#a8888c'] : ['#7c98bc', '#a8bcd4', '#d4dce8'];
  VG(c, 0, 0, W, h, sky);
  if (mood === 'night') for (let i = 0; i < 50; i++) P(c, hash(i * 13) * W, hash(i * 7 + 3) * h * 0.8, (Math.floor(t * 3 + i) % 7) ? '#6c7c9c' : '#e8f0ff');
}
// rounded, treeless Ural ridges (far → near)
function uralRidges(c, t, mood = 'day', y = 110, ox = 0) {
  const cols = mood === 'night' ? [['#0c1424', '#1c2838'], ['#141c2c', '#2c3848']] : mood === 'storm' ? [['#6c7484', '#8c949c'], ['#7c8494', '#a8b0b8']] : [['#8c9cb4', '#c8d4e4'], ['#a8b4c8', '#e0e8f0']];
  for (let L2 = 0; L2 < 2; L2++) { const base = y - L2 * -8, [dk, lt] = cols[L2];
    c.fillStyle = dk; c.beginPath(); c.moveTo(0, base + 20); for (let x = 0; x <= W; x += 8) c.lineTo(x, base - 18 - L2 * 4 - Math.sin((x + ox * (0.2 + L2 * 0.2)) * 0.018 + L2 * 2) * 14 - Math.sin((x + ox) * 0.05 + L2) * 4); c.lineTo(W, base + 20); c.fill();
    for (let x = 0; x < W; x += 6) { const yy = base - 18 - L2 * 4 - Math.sin((x + ox * (0.2 + L2 * 0.2)) * 0.018 + L2 * 2) * 14 - Math.sin((x + ox) * 0.05 + L2) * 4; R(c, x, yy, 6, 2, lt); } }
}
// a dark taiga band of spruce
function taiga(c, t, y, n, mood = 'day', ox = 0, sc = 1, seed = 1) {
  const dk = mood === 'night' ? '#08140e' : '#1c3428', md = mood === 'night' ? '#0e1c14' : '#2c4c38', sn = mood === 'night' ? '#6c7c98' : '#e8f0f8';
  for (let i = 0; i < n; i++) { const x = mod(i * (W / n) * 1.25 + hash(seed + i) * 26 - ox, W + 60) - 30, h = (30 + hash(seed * 3 + i) * 22) * sc, yy = y + (i % 3) * 3;
    R(c, x - 1, yy - h * 0.15, 2, h * 0.15, '#2c2018'); for (let k = 0; k < 6; k++) { const ty = yy - h * 0.12 - k * h * 0.15, w = h * (0.22 - k * 0.032); PF(c, [x - w, ty, x, ty - h * 0.2, x + w, ty], k & 1 ? md : dk); L(c, x - w * 0.7, ty - 1, x, ty - h * 0.17, sn); } }
}
// blowing snow streaks
function blizzard(c, t, k = 1, dir = -1) { for (let i = 0; i < 70 * k; i++) { const y = hash(i * 3) * H, x = mod(hash(i * 7) * W * 2 + dir * t * (180 + hash(i) * 120), W + 40) - 20; L(c, x, y, x + dir * -8, y + 2, DA('#f4f8ff', 0.6)); } }
// the tent: a ridge tent half buried, optionally cut open from the inside
function tent(c, x, y, o = {}) {
  const sag = o.cut ? 6 : 0;
  PF(c, [x - 40, y, x - 30, y - 22 + sag, x + 30, y - 22 + sag * 0.5, x + 40, y], o.night ? '#4c5444' : '#7c8468'); PF(c, [x - 30, y - 22 + sag, x + 30, y - 22 + sag * 0.5, x + 26, y - 18, x - 26, y - 18], o.night ? '#5c6454' : '#9ca484');
  L(c, x - 30, y - 22 + sag, x + 30, y - 22 + sag * 0.5, '#3c3c30'); L(c, x - 30, y - 22 + sag, x - 32, y + 2, '#5c4c34'); L(c, x + 30, y - 22, x + 32, y + 2, '#5c4c34');
  if (o.cut) { for (const [a, b] of [[-18, 6], [2, 16], [20, 4]]) { PF(c, [x + a, y - 18, x + a + 3, y - 12, x + a + 1, y - 3, x + a - 2, y - 9], '#141410'); L(c, x + a - 1, y - 18, x + a + 2, y - 4, '#d8d8c8'); } }
  if (o.snow) { E(c, x - 6, y - 24 + sag, 30, 4, '#f4f8fc'); E(c, x + 30, y - 2, 14, 4, '#e8eef4'); }
  if (o.lit) glow(c, x, y - 10, 44, 18, '#f8c060', 0.35);
}
function footprints(c, x0, y0, x1, y1, n, k = 1, a = 0.9) { for (let i = 0; i < n * k; i++) for (let j = 0; j < 9; j++) { const u = i / n, x = lerp(x0, x1, u) + (j - 4) * 5 + Math.sin(i + j) * 2, y = lerp(y0, y1, u) + (j % 3) * 2 + (i & 1); E(c, x, y, 1.6, 1, DA('#8c9cb4', a)); } }
// the big cedar at the forest edge
function cedar(c, x, y, h, o = {}) {
  R(c, x - 3, y - h, 7, h, '#3c2c1c'); R(c, x - 3, y - h, 2, h, '#5c4430');
  for (let k = 0; k < 7; k++) { const yy = y - h * 0.35 - k * h * 0.09, w = h * (0.42 - k * 0.05); if (o.broken && yy > y - h * 0.35 - 2) continue; PF(c, [x - w, yy, x, yy - h * 0.14, x + w, yy], k & 1 ? '#1c3428' : '#2c4c38'); L(c, x - w * 0.8, yy - 1, x, yy - h * 0.12, '#e8f0f8'); }
  if (o.broken) for (let k = 0; k < 6; k++) { const yy = y - 10 - k * 7; L(c, x + 3, yy, x + 9 + (k % 2) * 3, yy - 3, '#c8a878', 2); L(c, x - 3, yy - 3, x - 8, yy - 6, '#c8a878', 2); } // fresh broken stubs up to 5 m
}
// a figure lying in the snow (modFig rotated), partly covered
function frozen(c, st, x, y, o = {}) { c.save(); if (o.cover) { c.beginPath(); c.rect(0, 0, W, y - 2); c.clip(); } blit(c, modFig(st, { f: -1, expr: 'sad', blink: 2, k: 'fz' }), x, y, FIG_AX2, FIG_AY2 - 10, { rot: (o.dir || 1) * Math.PI / 2 }); c.restore(); E(c, x + (o.dir || 1) * 10, y + 1, 22, 4, '#f4f8fc'); }
