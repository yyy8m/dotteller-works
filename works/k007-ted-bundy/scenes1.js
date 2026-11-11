/* ================= 記録 #007 テッド・バンディ: cast, props, places & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function bigFace(c, spr, cx, cy, s, a, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(a < 1 ? ditherFade(pc, a, id + 'd') : pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }

/* ---- people (modFig 36x58, feet anchor FIG_AX2/FIG_AY2) ---- */
const TED = { id: 'ted', top: 'jacket', coat: '#6c4c34', shirt: '#ece4d4', tie: '#7c2c2c', pants: '#3c3428', shoes: '#2c1c14', skin: '#e8c0a0', hair: '#4c3020', hairStyle: 'side' };
const TED_DARK = { id: 'tedk', top: 'sweater', coat: '#2c2c34', pants: '#1c1c24', shoes: '#141414', skin: '#d8b090', hair: '#3c2418', hairStyle: 'side' };
const TED_SUIT = { id: 'teds', top: 'jacket', coat: '#2c3040', shirt: '#f0ece4', tie: '#3c4c7c', pants: '#24283c', shoes: '#141414', skin: '#e8c0a0', hair: '#4c3020', hairStyle: 'side' };
const TED_JAIL = { id: 'tedj', top: 'shirt', coat: '#c8b48c', pants: '#a8946c', shoes: '#3c2c1c', skin: '#e0b898', hair: '#4c3020', hairStyle: 'side' };
const TED_KID = { id: 'tedkid', kid: true, top: 'shirt', coat: '#8c7c4c', pants: '#5c5034', shoes: '#2c1c14', skin: '#f0c8a8', hair: '#5c3c24', hairStyle: 'side' };
const WOMAN = { id: 'wmn', top: 'dress', coat: '#3c6c8c', shirt: '#f4f0e8', skin: '#f0c8a8', hair: '#2c1c14', hairStyle: 'long' };
const GIRLS = ['#8c3c4c', '#4c6c3c', '#5c4c8c', '#8c6c3c', '#3c5c7c', '#7c4c6c'].map((col, i) => ({ id: 'g' + i, top: 'dress', coat: col, skin: ['#f0c8a8', '#e8c0a0', '#f4d0b0', '#ecc4a4', '#f0c8a8', '#e4bc9c'][i], hair: ['#2c1c14', '#3c2418', '#1c1410', '#4c3020', '#2c1c14', '#3c2c1c'][i], hairStyle: 'long' }));
const COPS = [0, 1, 2].map(i => ({ id: 'cp' + i, top: 'uniform', coat: '#2c3448', pants: '#24283c', skin: ['#e0b090', '#e8c0a0', '#dcac88'][i], hair: '#1c1814', hat: 'police', hatCol: '#1c2438' }));
const FOLKS = ['#7c5c3c', '#3c5c6c', '#6c3c3c', '#4c6c4c', '#5c5c7c'].map((col, i) => ({ id: 'fk' + i, top: ['shirt', 'sweater', 'jacket', 'shirt', 'tee'][i], coat: col, shirt: '#ece8e0', pants: ['#3c3c44', '#2c3448', '#4c4034', '#3c3c44', '#5c5c64'][i], skin: ['#e8c0a0', '#f0c8a8', '#dcac88', '#e8c4a4', '#d8a884'][i], hair: ['#3c2818', '#c8a060', '#1c1814', '#6c4c2c', '#2c1c14'][i], hairStyle: ['short', 'side', 'short', 'curly', 'long'][i] }));
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- props ---- */
// the tan Volkswagen Type 1: a rounded beetle shape (80x36, anchor 40,35)
function vwSpr(col = '#c8a46c', o = {}) {
  return cached('vw' + col + (o.lit ? 'l' : '') + (o.open ? 'o' : ''), () => SPR(null, 80, 36, c => {
    const hi = shadeCol(col, 1.25), lo = shadeCol(col, 0.72);
    E(c, 40, 22, 36, 14, col); R(c, 4, 22, 72, 8, col); E(c, 38, 14, 22, 12, col); // body & domed roof
    E(c, 36, 10, 16, 6, hi); L(c, 8, 22, 72, 22, lo);
    PF(c, [24, 11, 36, 5, 36, 15, 24, 15], '#4c5c70'); PF(c, [39, 5, 50, 7, 56, 15, 39, 15], '#4c5c70'); L(c, 27, 10, 30, 8, '#a8b8c8'); L(c, 42, 7, 46, 8, '#a8b8c8'); // windows
    E(c, 16, 26, 11, 7, lo); E(c, 64, 26, 11, 7, lo); // wheel arches (fenders)
    for (const x of [16, 64]) { E(c, x, 29, 6.5, 6.5, '#141418'); E(c, x, 29, 3.5, 3.5, '#c8ccd4'); P(c, x - 1, 28, '#ffffff'); }
    R(c, 2, 30, 10, 2, '#c8ccd4'); R(c, 68, 30, 10, 2, '#c8ccd4'); E(c, 74, 22, 2.5, 3, o.lit ? '#fff4c0' : '#e8e0b8'); R(c, 4, 20, 2, 4, '#c82828');
    L(c, 38, 15, 38, 30, lo); R(c, 44, 18, 4, 1, '#c8ccd4');
    if (o.open) { PF(c, [39, 15, 56, 15, 60, 32, 39, 32], '#1c1c24'); }
  }));
}
// a 1970s police cruiser with a light bar (96x38, anchor 48,37)
function cruiserSpr(t, o = {}) {
  const ph = Math.floor(t * 6) & 1;
  return cached('cru' + ph, () => SPR(null, 96, 38, c => {
    PF(c, [3, 22, 10, 16, 28, 15, 34, 6, 68, 6, 76, 15, 90, 16, 94, 22, 94, 31, 3, 31], '#f0f0ec'); PF(c, [3, 25, 94, 25, 94, 31, 3, 31], '#1c2438');
    PF(c, [37, 8, 51, 8, 51, 15, 32, 15], '#4c5c70'); PF(c, [54, 8, 66, 8, 72, 15, 54, 15], '#4c5c70'); R(c, 51, 7, 3, 9, '#f0f0ec');
    R(c, 42, 2, 24, 4, '#2c2c34'); R(c, 43, 2, 10, 3, ph ? '#ff3030' : '#8c1c1c'); R(c, 55, 2, 10, 3, ph ? '#2c3c8c' : '#4c8cff'); // light bar
    R(c, 36, 19, 26, 4, '#1c2438');
    for (const x of [20, 76]) { E(c, x, 31, 7, 7, '#0c0c10'); E(c, x, 31, 3.5, 3.5, '#a8acb4'); }
    R(c, 90, 19, 4, 3, '#fff8d0'); R(c, 3, 19, 3, 3, '#c82828');
  }));
}
function lightBar(c, x, y, t, r = 60) { const ph = Math.floor(t * 6) & 1; glow(c, x - 6, y, r, r * 0.6, ph ? '#ff3030' : '#3c5cff', 0.35); }
// handcuffs (open), with a glint
function cuffs(c, x, y, t, k = 1) { if (k <= 0) return; c.save(); c.globalAlpha = k; ER(c, x, y, 5, 5, '#c8ccd4'); ER(c, x + 12, y + 2, 5, 5, '#a8acb4'); L(c, x + 4, y + 1, x + 8, y + 2, '#8c8c94'); P(c, x - 3, y - 3, '#ffffff'); const g = 0.5 + 0.5 * Math.sin(t * 6); star4(c, x - 3, y - 4, 3 * g, '#ffffff', '#f8f8ff'); c.restore(); }
// shopping mall front in the evening (sign + glass doors + parking lot)
function mallFront(c, t, o = {}) {
  VG(c, 0, 0, W, 70, o.night ? ['#0c1028', '#1c2448', '#3c3c5c'] : ['#2c2c5c', '#7c4c6c', '#e88c5c']);
  if (!o.night) glow(c, 60, 66, 90, 18, '#f8a060', 0.4);
  R(c, 20, 40, 280, 74, '#a89c8c'); R(c, 20, 40, 280, 4, '#c8bcac'); for (let x = 28; x < 300; x += 20) R(c, x, 52, 1, 62, '#9c9080');
  R(c, 110, 46, 100, 18, '#2c1c14'); R(c, 112, 48, 96, 14, '#c83c2c'); TX(c, 'SHOPPING MALL', 116, 47, '#fff4d8', 16, null);
  for (let i = 0; i < 5; i++) { const x = 40 + i * 52 + (i > 1 ? 30 : 0); if (i === 2) continue; R(c, x, 74, 34, 30, '#3c4458'); R(c, x + 2, 76, 30, 26, '#f8e0a0'); glow(c, x + 17, 92, 30, 18, '#f8d880', 0.18); }
  R(c, 140, 70, 40, 44, '#3c4458'); R(c, 142, 72, 17, 42, '#f8e8b8'); R(c, 161, 72, 17, 42, '#f8e8b8'); // doors
  R(c, 0, 114, W, 126, '#4c4c54'); for (let x = -mod(o.ox || 0, 48); x < W; x += 48) { R(c, x, 176, 2, 30, '#c8c4b0'); } R(c, 0, 176, W, 2, '#c8c4b0'); // parking stall lines (low, behind the dialog)
  for (let i = 0; i < 3; i++) { const x = 30 + i * 120; R(c, x, 60, 2, 56, '#3c3c44'); R(c, x - 6, 58, 14, 3, '#2c2c34'); glow(c, x, 66, 16, 10, '#f8f0c0', 0.45); }
}
// a soft flashlight cone (solid alpha, no dither mesh)
function softBeam(c, x, y, ang, len, half, a = 0.3, col = '#fff4c8') { const p = (r, k) => [x + Math.cos(ang + k) * r, y + Math.sin(ang + k) * r]; c.save(); c.globalAlpha = a * 0.5; PF(c, [x, y, ...p(len, -half), ...p(len, half)], col); c.globalAlpha = a; PF(c, [x, y, ...p(len * 0.9, -half * 0.5), ...p(len * 0.9, half * 0.5)], col); c.restore(); }
// rainy night
function rain(c, t, n = 70, a = 0.4) { for (let i = 0; i < n; i++) { const x = mod(hash(i) * W * 1.3 - t * 60, W + 20) - 10, y = mod(hash(i * 3) * H + t * 320, H); L(c, x, y, x - 3, y + 8, DA('#a8b8d8', a)); } }
// a wooden US house at night with a basement window
function basementHouse(c, t, o = {}) {
  VG(c, 0, 0, W, 140, ['#04060e', '#0c1424', '#1c2438']);
  for (let i = 0; i < 5; i++) { const x = i * 80 - 20; PF(c, [x, 120, x + 40, 92, x + 80, 120], '#0c1018'); }
  R(c, 70, 64, 180, 80, '#3c4048'); for (let y = 68; y < 144; y += 5) R(c, 70, y, 180, 1, '#34383e'); PF(c, [60, 66, 160, 26, 260, 66], '#1c1c24');
  R(c, 90, 82, 26, 30, '#141820'); R(c, 92, 84, 22, 26, '#2c3c5c'); R(c, 204, 82, 26, 30, '#141820'); R(c, 206, 84, 22, 26, o.lit ? '#f8d880' : '#2c3c5c'); R(c, 150, 96, 24, 48, '#2c2018');
  R(c, 0, 144, W, 96, '#1c2018'); R(c, 0, 144, W, 2, '#2c3428');
  R(c, 112, 136, 40, 14, '#0c0c10'); R(c, 114, 138, 36, 10, o.base ? '#f8c870' : '#1c2434'); if (o.base) glow(c, 132, 143, 30, 10, '#f8c870', 0.35); // basement window at ground level
}
// a wooded mountain slope with search lights
function mountainWoods(c, t, o = {}) {
  VG(c, 0, 0, W, 130, o.autumn ? ['#2c2438', '#6c4c4c', '#c88c5c'] : ['#04060e', '#0c1424', '#1c2c3c']);
  PF(c, [0, 110, 60, 50, 110, 80, 170, 34, 240, 86, 290, 60, 320, 80, 320, 140, 0, 140], o.autumn ? '#4c3c3c' : '#141c28');
  R(c, 0, 132, W, 108, o.autumn ? '#3c2c1c' : '#0c1410');
  for (let i = 0; i < 12; i++) { const x = (i * 29 + 7) % 330 - 5, h = 40 + hash(i) * 30, col = o.autumn ? ['#8c3c1c', '#a8641c', '#5c3c1c'][i % 3] : '#0c1c14'; R(c, x - 1, 140 - h * 0.4, 3, h * 0.4 + 6, '#1c140c'); PF(c, [x - 12, 142 - h * 0.35, x, 140 - h, x + 12, 142 - h * 0.35], col); }
}
// the courtroom
function courtroom(c, t, o = {}) {
  R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#56402c'); R(c, 0, 0, W, 6, '#2c1c10');
  R(c, 120, 10, 80, 50, '#3c2c1c'); E(c, 160, 34, 20, 20, '#c8a048'); E(c, 160, 34, 16, 16, '#5c4428'); R(c, 158, 20, 4, 28, '#c8a048'); // seal
  R(c, 90, 64, 140, 50, '#3c2414'); R(c, 90, 64, 140, 4, '#6c4c2c'); R(c, 86, 60, 148, 6, '#5c3c24'); // the bench
  R(c, 0, 150, W, 90, '#3c2c20'); for (let y = 156; y < H; y += 8) R(c, 0, y, W, 1, '#342418');
  R(c, 0, 126, W, 26, '#4c3420'); for (let x = 6; x < W; x += 12) R(c, x, 126, 4, 26, '#3c2818'); R(c, 0, 124, W, 3, '#6c4c2c'); // rail
}
// a cell with a square hole in the ceiling
function cellBg(c, t, o = {}) {
  R(c, 0, 0, W, H, '#5c5c58'); for (let y = 0; y < H; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#545450');
  R(c, 0, 0, W, 28, '#7c7c74'); R(c, 0, 26, W, 3, '#4c4c48'); R(c, 0, 168, W, 72, '#3c3c3c');
  R(c, 30, 120, 90, 14, '#8c7c5c'); R(c, 32, 116, 86, 6, '#e8e4d8'); R(c, 34, 134, 4, 34, '#3c3c3c'); R(c, 112, 134, 4, 34, '#3c3c3c'); // bunk
  for (let i = 0; i < 9; i++) R(c, 210 + i * 12, 30, 3, 140, '#2c2c30'); R(c, 206, 30, 112, 4, '#2c2c30'); R(c, 206, 96, 112, 4, '#2c2c30'); // bars
  if (o.hole) { R(c, 140, 0, 34, 28, '#0c0c10'); R(c, 140, 26, 34, 3, '#2c2c28'); for (let i = 0; i < 6; i++) P(c, 142 + i * 5, 28 + (i & 1), '#c8c8c0'); }
}
// the electric chair (front view)
function chairSpr() {
  return cached('echair', () => SPR(null, 60, 80, c => {
    R(c, 10, 30, 40, 6, '#5c3c24'); R(c, 12, 4, 36, 30, '#6c4828'); R(c, 14, 6, 32, 26, '#5c3c20'); R(c, 4, 40, 52, 6, '#6c4828'); R(c, 6, 46, 6, 32, '#4c3018'); R(c, 48, 46, 6, 32, '#4c3018');
    R(c, 2, 34, 8, 4, '#4c3018'); R(c, 50, 34, 8, 4, '#4c3018'); R(c, 0, 30, 6, 16, '#5c3c24'); R(c, 54, 30, 6, 16, '#5c3c24');
    for (const y of [16, 26]) R(c, 12, y, 36, 2, '#1c1410'); R(c, 4, 36, 6, 2, '#1c1410'); R(c, 50, 36, 6, 2, '#1c1410'); R(c, 8, 64, 6, 2, '#1c1410'); R(c, 46, 64, 6, 2, '#1c1410');
    E(c, 30, 2, 9, 4, '#8c8c94'); L(c, 30, -2, 30, 0, '#2c2c2c');
  }));
}
// simple map of the continental USA with named dots
const USA = [[30, 46], [62, 28], [120, 26], [170, 30], [214, 24], [252, 20], [282, 28], [276, 48], [262, 72], [256, 98], [270, 128], [258, 136], [240, 112], [212, 116], [180, 126], [150, 144], [126, 126], [96, 116], [70, 106], [44, 88], [32, 68]];
function usaMap(c, t, o = {}) {
  R(c, 0, 0, W, H, '#0c1828'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#10203a'); for (let y = 0; y < H; y += 20) R(c, 0, y, W, 1, '#10203a');
  PF(c, USA.flat(), '#c8b88c'); PL(c, USA.concat([USA[0]]).flat(), '#7c6c4c');
}
const CITY = { seattle: [46, 36], utah: [92, 74], colorado: [118, 80], denver: [124, 74], chicago: [198, 52], annarbor: [216, 46], atlanta: [222, 104], tallahassee: [222, 122], pensacola: [206, 122], burlington: [270, 28] };
function mapDot(c, k, label, col = '#f8d860', lx = 6, ly = -8) { const [x, y] = CITY[k]; E(c, x, y, 3, 3, '#141414'); E(c, x, y, 2, 2, col); if (label) TX(c, label, x + lx, y + ly, '#f4f0e8', 16, '#000000'); }

/* ---- portraits (48x48) ---- */
// Ted: wavy brown hair parted on the side, a clean face, a pleasant smile; dark = in shadow with the light from below
function tedFace(o = {}) {
  return SPR('tedF' + (o.blink || 0) + (o.smile ? 's' : '') + (o.dark ? 'd' : '') + (o.beard ? 'b' : '') + (o.look || '') + (o.jail ? 'j' : ''), 48, 48, c => {
    const sk = o.dark ? '#8c6c5c' : '#ecc4a4', sk2 = o.dark ? '#4c3430' : '#bc8c6c', hc = o.look === 'blond' ? '#a8844c' : '#4c3020', hc2 = shadeCol(hc, 1.4);
    if (o.jail) { PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#c8b48c'); PF(c, [18, 37, 24, 44, 30, 37], '#a8946c'); }
    else { PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#6c4c34'); PF(c, [17, 37, 24, 47, 31, 37], '#ece4d4'); L(c, 24, 40, 24, 48, '#7c2c2c', 2); L(c, 17, 37, 22, 46, '#5c3c28'); L(c, 31, 37, 26, 46, '#5c3c28'); }
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11, 13.5, sk2); E(c, 23.5, 21.5, 10.5, 13, sk); E(c, 32, 22, 2, 9, sk2); E(c, 13, 23, 2, 4, sk2); E(c, 35, 23, 2, 4, sk2); // face, ears
    // hair: thick wavy hair swept from a side part
    PF(c, [11, 20, 11, 11, 16, 5, 26, 3, 34, 5, 38, 11, 37, 19, 34, 12, 26, 9, 20, 10, 15, 14, 13, 20], hc);
    for (let i = 0; i < 5; i++) E(c, 16 + i * 4.4, 7 + (i & 1), 3, 2.4, i & 1 ? hc2 : hc); L(c, 18, 9, 30, 6, hc2); L(c, 14, 12, 18, 9, hc2); R(c, 33, 13, 4, 6, hc); // part & wave highlight
    if (o.look === 'long') { R(c, 10, 14, 4, 16, hc); R(c, 34, 14, 4, 16, hc); }
    // eyes, brows
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, 16, shadeCol(hc, 0.8)); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c1c14'); continue; } R(c, x0, 18, 5, 3, o.dark ? '#c8b8a8' : '#f8f4ec'); R(c, x0 + 1, 18, 3, 3, o.dark ? '#141010' : '#3c5c7c'); P(c, x0 + 2, 19, C.k); P(c, x0 + 1, 18, '#ffffff'); }
    L(c, 24, 21, 23, 26, sk2); P(c, 25, 26, sk2);
    if (o.beard) { R(c, 18, 28, 12, 2, hc); E(c, 24, 32, 7, 4, hc); E(c, 24, 31, 3, 1.4, sk); }
    else if (o.smile) { L(c, 19, 29, 22, 31, '#8c4c3c'); L(c, 22, 31, 27, 31, '#8c4c3c'); L(c, 27, 31, 29, 29, '#8c4c3c'); R(c, 22, 30, 5, 1, '#f8f4ec'); }
    else R(c, 20, 30, 8, 1, '#8c4c3c');
    L(c, 15, 26, 16, 29, sk2); L(c, 33, 26, 32, 29, sk2); // cheekbones
    if (o.dark) { for (let y = 2; y < 18; y++) for (let x = 8; x < 40; x++) if ((x + y) % 3 === 0) P(c, x, y, '#0c0808'); }
  });
}
// the young woman: long dark hair parted in the middle
function womanFace(o = {}) {
  return SPR('wmF' + (o.blink || 0) + (o.shock ? 's' : ''), 48, 48, c => {
    const sk = '#f4d0b0', sk2 = '#c8a080', hc = '#2c1c14', hc2 = '#4c3424';
    R(c, 9, 14, 8, 34, hc); R(c, 31, 14, 8, 34, hc); // long hair behind
    PF(c, [2, 48, 9, 38, 39, 38, 46, 48], '#3c6c8c'); R(c, 20, 37, 8, 4, sk);
    R(c, 20, 30, 8, 8, sk2); E(c, 24, 22, 10, 12.5, sk2); E(c, 23.6, 21.6, 9.6, 12, sk);
    PF(c, [13, 22, 14, 9, 22, 4, 24, 6, 26, 4, 34, 9, 35, 22, 32, 12, 25, 8, 24, 9, 23, 8, 16, 12], hc); L(c, 24, 5, 24, 9, '#5c4434'); L(c, 17, 9, 22, 6, hc2); L(c, 27, 6, 31, 9, hc2); // parted in the middle
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, 15, '#3c2818'); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c1c14'); continue; } R(c, x0, 18, 5, o.shock ? 4 : 3, '#f8f4ec'); R(c, x0 + 1, 18, 3, o.shock ? 4 : 3, '#4c3424'); P(c, x0 + 2, 19, C.k); P(c, x0 + 1, 18, '#ffffff'); L(c, x0 - 1, 17, x0, 17, '#2c1c14'); }
    L(c, 24, 21, 23, 25, sk2); E(c, 18, 26, 2.5, 1.2, '#f4b0a0'); E(c, 30, 26, 2.5, 1.2, '#f4b0a0');
    if (o.shock) E(c, 24, 30, 2.2, 2.4, '#7c2c2c'); else { R(c, 21, 29, 6, 1, '#b8605c'); P(c, 22, 30, '#c87068'); }
  });
}
// the party colleague: glasses, short hair, a campaign button
function memberFace(o = {}) {
  return SPR('mbF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e8c0a0', sk2 = '#b88c6c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#3c4c6c'); PF(c, [18, 37, 24, 46, 30, 37], '#f0ece4'); L(c, 24, 39, 24, 48, '#c83c2c', 2); E(c, 12, 42, 3, 3, '#f4f0e8'); E(c, 12, 42, 2, 2, '#c82828');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    PF(c, [12, 18, 13, 8, 22, 4, 33, 6, 36, 16, 33, 10, 24, 8, 17, 10], '#8c6c3c'); L(c, 16, 7, 30, 5, '#a8884c');
    for (const x0 of [16, 27]) { R(c, x0 - 1, 17, 7, 6, '#1c1c1c'); R(c, x0, 18, 5, 4, '#c8d4dc'); if (o.blink === 2) L(c, x0, 20, x0 + 4, 20, '#2c1c14'); else R(c, x0 + 1, 19, 2, 2, C.k); }
    R(c, 22, 19, 4, 1, '#1c1c1c'); L(c, 24, 23, 23, 27, sk2); L(c, 20, 30, 23, 32, '#8c4c3c'); L(c, 23, 32, 28, 30, '#8c4c3c');
  });
}
// the Florida judge: grey hair, black robe, spectacles low on the nose
function judgeFace(o = {}) {
  return SPR('jdF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e4bc9c', sk2 = '#b08c6c';
    PF(c, [2, 48, 7, 36, 41, 36, 46, 48], '#141418'); PF(c, [19, 36, 24, 44, 29, 36], '#f0ece4'); R(c, 22, 38, 4, 3, '#3c3c3c');
    R(c, 19, 30, 10, 7, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    PF(c, [11, 22, 11, 14, 15, 8, 20, 8, 15, 14, 14, 22], '#c8c8cc'); PF(c, [37, 22, 37, 14, 33, 8, 28, 8, 33, 14, 34, 22], '#c8c8cc'); R(c, 18, 7, 12, 2, '#b4b4bc'); // grey, thinning on top
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, 16, '#a8a8b0'); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c1c14'); continue; } R(c, x0, 18, 5, 2, '#f4f0e8'); R(c, x0 + 1, 18, 2, 2, C.k); }
    R(c, 16, 21, 7, 4, '#3c3c3c'); R(c, 17, 22, 5, 2, '#d8e4ec'); R(c, 26, 21, 7, 4, '#3c3c3c'); R(c, 27, 22, 5, 2, '#d8e4ec'); L(c, 23, 22, 26, 22, '#3c3c3c'); // half-moon glasses
    L(c, 24, 24, 23, 28, sk2); R(c, 20, 31, 9, 1, '#7c4c3c'); L(c, 15, 27, 17, 32, sk2); L(c, 33, 27, 31, 32, sk2);
  });
}
const PORTRAITS = {
  bundy: p => withMouth('pmtd', tedFace({ blink: p.blink, smile: true }), p, 24, 30),
  woman: p => withMouth('pmwm', womanFace({ blink: p.blink, shock: true }), p, 24, 30),
  member: p => withMouth('pmmb', memberFace({ blink: p.blink }), p, 24, 31),
  judge: p => withMouth('pmjd', judgeFace({ blink: p.blink }), p, 24, 31),
};
