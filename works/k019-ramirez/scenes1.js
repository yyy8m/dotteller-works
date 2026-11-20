/* ================= 記録 #019 リチャード・ラミレス: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', weapon: o.weapon || null }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function shadow(c, st, x, y, o = {}) { blit(c, tintSpr(modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, k: 'sh' + (o.k || ''), weapon: o.weapon || null }), o.col || '#06060a', 'shd' + st.id + (o.k || '') + (o.arm || '') + (o.f == null ? -1 : o.f) + (o.weapon || '')), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
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
function courtroom(c, t, o = {}) {
  R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#56402c'); R(c, 0, 0, W, 6, '#2c1c10');
  R(c, 120, 10, 80, 50, '#3c2c1c'); E(c, 160, 34, 20, 20, '#c8a048'); E(c, 160, 34, 16, 16, '#5c4428'); R(c, 158, 20, 4, 28, '#c8a048'); // seal
  R(c, 90, 64, 140, 50, '#3c2414'); R(c, 90, 64, 140, 4, '#6c4c2c'); R(c, 86, 60, 148, 6, '#5c3c24'); // the bench
  R(c, 0, 150, W, 90, '#3c2c20'); for (let y = 156; y < H; y += 8) R(c, 0, y, W, 1, '#342418');
  R(c, 0, 126, W, 26, '#4c3420'); for (let x = 6; x < W; x += 12) R(c, x, 126, 4, 26, '#3c2818'); R(c, 0, 124, W, 3, '#6c4c2c'); // rail
}
function cellBg(c, t, o = {}) {
  R(c, 0, 0, W, H, '#5c5c58'); for (let y = 0; y < H; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#545450');
  R(c, 0, 0, W, 28, '#7c7c74'); R(c, 0, 26, W, 3, '#4c4c48'); R(c, 0, 168, W, 72, '#3c3c3c');
  R(c, 30, 120, 90, 14, '#8c7c5c'); R(c, 32, 116, 86, 6, '#e8e4d8'); R(c, 34, 134, 4, 34, '#3c3c3c'); R(c, 112, 134, 4, 34, '#3c3c3c'); // bunk
  for (let i = 0; i < 9; i++) R(c, 210 + i * 12, 30, 3, 140, '#2c2c30'); R(c, 206, 30, 112, 4, '#2c2c30'); R(c, 206, 96, 112, 4, '#2c2c30'); // bars
  if (o.hole) { R(c, 140, 0, 34, 28, '#0c0c10'); R(c, 140, 26, 34, 3, '#2c2c28'); for (let i = 0; i < 6; i++) P(c, 142 + i * 5, 28 + (i & 1), '#c8c8c0'); }
}

/* ---- cast ---- */
const RICH = { id: 'rr', top: 'jacket', coat: '#1c1c20', shirt: '#2c2c30', pants: '#1c1c24', shoes: '#141414', skin: '#c89c74', hair: '#0c0c10', hairStyle: 'curly' };
const RICH_KID = { id: 'rk', kid: true, top: 'tee', coat: '#5c6c8c', pants: '#3c3c44', shoes: '#2c2c2c', skin: '#c89c74', hair: '#0c0c10', hairStyle: 'short' };
const RICH_TEEN = { id: 'rt', top: 'tee', coat: '#141418', pants: '#2c3c5c', shoes: '#2c2c2c', skin: '#c89c74', hair: '#0c0c10', hairStyle: 'curly' };
const COUSIN = { id: 'cs', top: 'uniform', coat: '#4c5c3c', pants: '#4c5c3c', shoes: '#2c2420', skin: '#c89c74', hair: '#1c1814', hairStyle: 'short', badge: true };
const PAPA = { id: 'pa', top: 'shirt', coat: '#c8c0a8', pants: '#3c3c44', skin: '#c08c64', hair: '#1c1814', hairStyle: 'short', moustache: true };
const MAMA = { id: 'ma', top: 'dress', coat: '#5c3c5c', pants: '#5c3c5c', skin: '#c89c74', hair: '#1c1814', hairStyle: 'long' };
const CLERK = { id: 'ck', top: 'shirt', coat: '#c83c3c', pants: '#2c2c3c', skin: '#e8c4a0', hair: '#5c3c24', hairStyle: 'side' };
const DEPUTY = { id: 'dp', top: 'uniform', coat: '#8c7c5c', pants: '#3c4c3c', shoes: '#141414', skin: '#c08c64', hair: '#1c1814', hairStyle: 'short', badge: true };
const DETS = ['#3c3c44', '#4c4438', '#2c3440'].map((col, i) => ({ id: 'dt' + i, top: 'jacket', coat: col, shirt: '#e8e4dc', tie: ['#6c2c2c', '#2c3c6c', '#3c5c3c'][i], pants: col, skin: ['#e8c4a0', '#c89c74', '#f0c8a8'][i], hair: ['#2c2420', '#1c1814', '#8c6c4c'][i], hairStyle: 'side', glasses: i === 1 }));
const ENGS = [0, 1, 2].map(i => ({ id: 'en' + i, top: 'shirt', coat: '#f0f0ec', tie: ['#2c3c6c', '#3c3c3c', '#6c2c2c'][i], pants: '#3c3c44', skin: '#f0d0b0', hair: '#141418', hairStyle: i === 2 ? 'short' : 'side', glasses: i !== 1 }));
const FOLK = [['#c83c3c', '#3c3c5c', 'short', '#8c5c3c'], ['#e8c83c', '#2c4c8c', 'long', '#a8704c'], ['#3c8c5c', '#3c3c3c', 'short', '#9c6c48'], ['#f0f0ec', '#5c4c3c', 'side', '#8c5c3c'], ['#5c8cc8', '#2c2c3c', 'short', '#b07c54'], ['#c86c9c', '#3c3c44', 'long', '#9c6c48']]
  .map(([coat, pants, hs, skin], i) => ({ id: 'fk' + i, top: i === 1 || i === 5 ? 'dress' : i % 2 ? 'sweater' : 'tee', coat, pants: i === 1 || i === 5 ? coat : pants, skin, hair: '#141418', hairStyle: hs, moustache: i === 2 || i === 4 }));
const JUDGE = { id: 'jg', top: 'jacket', coat: '#141418', shirt: '#f0f0ec', tie: '#141418', pants: '#141418', skin: '#f0c8a8', hair: '#c8c8c8', hairStyle: 'side', glasses: true };

/* ---- places & props ---- */
// the convenience store: shelves, fluorescent tubes, the counter, a newspaper rack (o.face: the wanted face on the front page)
function store(c, t, o = {}) {
  R(c, 0, 0, W, H, '#e8e4d4'); R(c, 0, 0, W, 30, '#d8d4c4'); for (let i = 0; i < 4; i++) { R(c, 20 + i * 80, 32, 50, 3, '#f8f8f0'); glow(c, 45 + i * 80, 36, 40, 10, '#f8f8f0', 0.25); }
  R(c, 0, 40, 70, 112, '#a8c8d8'); R(c, 0, 40, 70, 3, '#8c8c8c'); R(c, 34, 40, 2, 112, '#8c8c8c'); glow(c, 30, 90, 50, 50, '#f8f0c0', 0.25);
  for (let r = 0; r < 3; r++) { R(c, 80, 60 + r * 28, 110, 3, '#8c8478'); for (let i = 0; i < 13; i++) R(c, 82 + i * 8, 46 + r * 28, 6, 14, ['#c83c3c', '#3c6cc8', '#f8c83c', '#3c9c5c', '#f0f0ec', '#c86c2c'][(i + r * 2) % 6]); }
  R(c, 196, 104, 124, 48, '#a85c3c'); R(c, 196, 104, 124, 4, '#c87c5c'); R(c, 270, 86, 30, 18, '#3c3c44'); R(c, 274, 89, 22, 8, '#3cc88c');
  R(c, 200, 70, 50, 34, '#7c7c84'); for (let k = 0; k < 2; k++) newspaper(c, 204 + k * 3, 74 + k * 2, 40, 28, { face: o.face, small: true });
  if (o.goods) { R(c, 232, 96, 10, 8, '#c8a050'); E(c, 237, 96, 4, 2, '#e8c070'); R(c, 246, 90, 6, 14, '#1c3c8c'); R(c, 246, 94, 6, 3, '#c81c1c'); }
}
// a newspaper front page: masthead, headline bars, the photo (o.face: Ramirez's face)
function newspaper(c, x, y, w, h, o = {}) {
  R(c, x, y, w, h, '#f0ece0'); R(c, x, y, w, 1, '#c8c4b8'); R(c, x + 2, y + 2, w - 4, Math.max(2, h * 0.12), '#2c2c2c');
  if (!o.small && o.head) TX(c, o.head, x + 6, y + h * 0.16, '#141414', 16, null); else R(c, x + 3, y + h * 0.2, w - 6, Math.max(2, h * 0.1), '#5c5c5c');
  const px = x + 3, py = y + h * 0.38, pw = w * 0.42, ph = h * 0.55; R(c, px, py, pw, ph, '#8c8c84');
  if (o.face) { c.save(); c.beginPath(); c.rect(px, py, pw, ph); c.clip(); R(c, px, py, pw, ph, '#d8d4c8'); blit(c, ramirezFace({}), px + pw / 2, py + ph / 2 + 2, 24, 24, { s: Math.max(0.2, pw / 44) }); c.globalAlpha = 0.35; c.fillStyle = '#8c8c84'; c.fillRect(px, py, pw, ph); c.restore(); }
  for (let i = 0; i < 6; i++) R(c, x + w * 0.5, py + i * ph / 6, w * 0.45, Math.max(1, ph / 14), '#8c8c8c');
}
function pentagram(c, x, y, r, col, k = 1) { const pts = []; for (let i = 0; i < 5; i++) { const a = Math.PI / 2 + i * TAU / 5; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } const ord = [0, 2, 4, 1, 3, 0]; const n = Math.floor(k * 5 + 0.001); for (let i = 0; i < Math.min(5, n); i++) L(c, pts[ord[i]][0], pts[ord[i]][1], pts[ord[i + 1]][0], pts[ord[i + 1]][1], col, 2); ER(c, x, y, r + 3, r + 3, col); }
// night suburbs of Los Angeles: palms, low houses, windows (o.out: indices whose light has gone out)
function suburbs(c, t, o = {}) { nightSky(c, t, 120); R(c, 0, 120, W, 30, '#1c1c2c'); for (let i = 0; i < 40; i++) P(c, (i * 71) % W, (i * 23) % 70, '#c8c8e8'); for (let i = 0; i < 4; i++) { const x = 30 + i * 80; R(c, x + 50, 60, 3, 60, '#2c2418'); for (let k = 0; k < 5; k++) L(c, x + 51, 60, x + 51 + Math.cos(k * 1.3) * 16, 56 + Math.sin(k * 1.3) * 6 + 8, '#1c3c24', 2); } for (let i = 0; i < 5; i++) { const x = 10 + i * 64; PF(c, [x, 104, x + 28, 86, x + 56, 104], '#3c2c34'); R(c, x + 4, 104, 48, 46, '#4c4450'); const lit = !(o.out || []).includes(i); R(c, x + 12, 114, 12, 10, lit ? '#f8d880' : '#1c1c28'); R(c, x + 32, 114, 12, 10, lit ? '#f8d880' : '#1c1c28'); R(c, x + 24, 128, 10, 22, '#2c2428'); if (lit) glow(c, x + 28, 118, 30, 12, '#f8d880', 0.15); } R(c, 0, 150, W, 40, '#2c2c34'); }
// a dark room at night: a window with a screen, a lamp
function nightRoom(c, t, o = {}) { R(c, 0, 0, W, H, '#1c1c28'); R(c, 0, 140, W, 50, '#2c2430'); R(c, 200, 40, 70, 60, '#2c3c5c'); R(c, 200, 40, 70, 60, DA('#8ca8c8', 0.25)); for (let x = 202; x < 270; x += 4) L(c, x, 40, x, 100, '#3c4c6c'); ER(c, 200, 40, 0, 0, '#000'); R(c, 198, 38, 74, 3, '#5c5048'); R(c, 198, 100, 74, 3, '#5c5048'); R(c, 40, 110, 80, 30, '#5c4c3c'); R(c, 40, 104, 80, 8, '#e8e0d0'); if (o.lamp) { R(c, 140, 100, 4, 40, '#3c3c3c'); PF(c, [132, 100, 152, 100, 148, 88, 136, 88], '#c8a060'); glow(c, 142, 96, 40, 30, '#f8d890', 0.2); } }
function elPaso(c, t) { VG(c, 0, 0, W, 110, ['#5c8cc8', '#a8c8e0', '#f0d8a8']); PF(c, [0, 100, 60, 70, 110, 90, 170, 60, 240, 92, 320, 74, 320, 110, 0, 110], '#a87c5c'); R(c, 0, 110, W, 80, '#d8b888'); for (let i = 0; i < 5; i++) { const x = 20 + i * 64; R(c, x, 100, 40, 30, '#e8d0a8'); R(c, x, 98, 40, 4, '#a8704c'); R(c, x + 16, 114, 8, 16, '#7c5c3c'); } R(c, 0, 138, W, 3, '#5c5048'); for (let x = 0; x < W; x += 10) R(c, x, 141, 6, 2, '#7c5c3c'); const tx = ((t * 40) % 520) - 200; R(c, tx, 120, 160, 16, '#5c3c2c'); R(c, tx + 140, 112, 26, 24, '#3c3c44'); for (let k = 0; k < 6; k++) E(c, tx + 14 + k * 26, 137, 4, 4, '#141414'); }
function church(c, t) { R(c, 0, 0, W, H, '#5c4c3c'); for (let x = 0; x < W; x += 20) R(c, x, 0, 10, 140, '#64543f'); R(c, 140, 20, 40, 70, '#2c3c6c'); PF(c, [140, 20, 160, 6, 180, 20], '#2c3c6c'); R(c, 145, 26, 30, 60, DA('#c8a0f0', 0.5)); R(c, 158, 30, 4, 50, '#f8e8a0'); R(c, 148, 44, 24, 4, '#f8e8a0'); glow(c, 160, 50, 50, 50, '#f8e8a0', 0.2); for (let r = 0; r < 2; r++) R(c, 10, 130 + r * 18, 300, 8, '#3c2c1c'); R(c, 0, 150, W, 40, '#4c3c2c'); }
function skidRow(c, t, o = {}) { nightSky(c, t, 120); R(c, 0, 120, W, 30, '#1c1820'); R(c, 0, 30, 120, 120, '#3c3438'); R(c, 200, 20, 120, 130, '#342c34'); R(c, 20, 40, 80, 20, '#141418'); TX(c, 'HOTEL', 32, 42, Math.sin(t * 9) > -0.3 ? '#f86c5c' : '#5c2c2c', 16, null); for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) R(c, 212 + i * 26, 40 + r * 30, 14, 16, (i + r) % 3 ? '#1c1c24' : '#c8a860'); R(c, 0, 150, W, 40, '#2c2c30'); for (const [x, y] of [[130, 146], [150, 148], [176, 145]]) E(c, x, y, 8, 5, '#3c3c3c'); }
function parkedCar(c, x, y, o = {}) { R(c, x, y - 18, 86, 12, o.col || '#6c5c4c'); PF(c, [x + 14, y - 18, x + 22, y - 30, x + 60, y - 30, x + 68, y - 18], o.col || '#6c5c4c'); R(c, x + 24, y - 28, 16, 9, '#3c4c5c'); R(c, x + 43, y - 28, 16, 9, '#3c4c5c'); for (const wx of [x + 16, x + 70]) { E(c, wx, y - 5, 7, 7, '#141414'); E(c, wx, y - 5, 3, 3, '#8c8c8c'); } }
function corkBoard(c, t, o = {}) { R(c, 0, 0, W, H, '#3c3430'); R(c, 20, 34, 280, 110, '#a87c4c'); R(c, 18, 32, 284, 3, '#5c3c24'); const n = o.n || 10; const pts = []; for (let i = 0; i < n; i++) { const x = 34 + (i % 5) * 54, y = 44 + Math.floor(i / 5) * 48; pts.push([x + 14, y + 4]); R(c, x, y, 30, 34, '#f0ece0'); R(c, x + 3, y + 3, 24, 18, ['#5c5c6c', '#6c5c4c', '#4c5c5c'][i % 3]); E(c, x + 15, y + 2, 2, 2, '#c81c1c'); } if (o.strings) for (let i = 0; i < n - 1; i++) L(c, pts[i][0], pts[i][1], pts[(i * 3 + 2) % n][0], pts[(i * 3 + 2) % n][1], '#c81c1c'); }
function terminals(c, t, o = {}) { R(c, 0, 0, W, H, '#1c2028'); R(c, 0, 0, W, 26, '#2c3038'); for (let i = 0; i < 3; i++) { const x = 30 + i * 96; R(c, x, 60, 70, 52, '#c8c8c0'); R(c, x + 6, 66, 58, 38, '#0c140c'); for (let k = 0; k < 6; k++) { const w = 10 + ((k * 7 + i * 3 + Math.floor(t * 4)) % 9) * 5; R(c, x + 9, 70 + k * 5, w, 2, o.hit && i === 1 ? '#f8e83c' : '#3cc86c'); } R(c, x + 20, 112, 30, 6, '#a8a8a0'); R(c, x - 4, 118, 78, 4, '#5c5c64'); } R(c, 0, 122, W, 68, '#3c3c44'); if (o.night) { c.save(); c.globalAlpha = 0.3; c.fillStyle = '#0c0c28'; c.fillRect(0, 0, W, H); c.restore(); R(c, 270, 30, 30, 22, '#0c0c1c'); E(c, 285, 41, 5, 5, '#e8ecf0'); } }
function thumbprint(c, x, y, s, col, k = 1) { c.save(); c.globalAlpha = k; for (let i = 0; i < 7; i++) ER(c, x, y, (3 + i * 2.2) * s * 0.8, (3 + i * 2.2) * s, col); c.restore(); }
function barrio(c, t) { VG(c, 0, 0, W, 140, ['#78a8e0', '#a8c8e8', '#e8e0c8']); for (let i = 0; i < 5; i++) { const x = 6 + i * 64, col = ['#e8a87c', '#a8d8c8', '#f0d878', '#c8a8d8', '#e8c8a0'][i]; R(c, x, 70, 56, 70, col); PF(c, [x - 4, 72, x + 28, 54, x + 60, 72], '#8c4c3c'); R(c, x + 8, 86, 12, 12, '#3c4c6c'); R(c, x + 34, 100, 14, 40, '#5c3c2c'); } R(c, 0, 140, W, 50, '#a8a8a0'); R(c, 0, 140, W, 3, '#c8c8c0'); }

/* ---- portrait (48x48): gaunt, long curly black hair, hollow cheeks, dark eyes; o.grin: the bad teeth ---- */
function ramirezFace(o = {}) {
  return SPR('rzF' + (o.blink || 0) + (o.grin ? 'g' : '') + (o.scared ? 's' : '') + (o.cap ? 'c' : ''), 48, 48, c => {
    const sk = '#c89c74', sk2 = '#a87c58';
    PF(c, [2, 48, 6, 38, 42, 38, 46, 48], '#1c1c20'); R(c, 20, 32, 8, 8, sk2);
    for (let i = 0; i < 12; i++) E(c, 11 + (i % 6) * 5.2, 9 + Math.floor(i / 6) * 4 + (i & 1) * 2, 4.5, 4, '#0c0c10'); E(c, 12, 20, 3, 6, '#0c0c10'); E(c, 36, 20, 3, 6, '#0c0c10');
    E(c, 24, 23, 11, 14, sk); R(c, 15, 28, 18, 8, sk); E(c, 26, 24, 8, 12, shadeCol(sk, 0.95)); for (let y = 29; y < 37; y += 2) for (let x = 15 + (y & 2); x < 34; x += 3) P(c, x, y, '#8c6c50'); L(c, 19, 30, 29, 30, '#5c3c28'); PF(c, [14, 26, 18, 34, 18, 26], sk2); PF(c, [34, 26, 30, 34, 30, 26], sk2);
    for (let i = 0; i < 5; i++) E(c, 15 + i * 4.5, 12, 3.5, 3, '#0c0c10');
    if (o.cap) { PF(c, [10, 14, 14, 4, 34, 4, 38, 14], '#141414'); R(c, 6, 13, 30, 3, '#141414'); TX(c, 'AC', 17, 3, '#c8c8c8', 16, null); }
    L(c, 15, 18, 21, 19, '#0c0c10', 2); L(c, 27, 19, 33, 18, '#0c0c10', 2);
    for (const x0 of [16, 27]) { E(c, x0 + 2.5, 22, 4, 3, '#7c5c48'); if (o.blink === 2) { L(c, x0, 22, x0 + 5, 22, '#2c1c14'); continue; } R(c, x0, 21, 5, 3, o.scared ? '#f0ece4' : '#c8c4bc'); R(c, x0 + 1, 21, 3, 3, '#0c0808'); P(c, x0 + 2, 21, '#e8e8e8'); }
    L(c, 24, 22, 23, 28, sk2); R(c, 21, 28, 6, 2, sk2);
    if (o.grin) { R(c, 18, 31, 12, 3, '#3c1c14'); R(c, 19, 31, 10, 1, '#d8ccb0'); P(c, 23, 31, '#8c7c5c'); }
    else if (o.scared) E(c, 24, 32, 3, 2.5, '#3c1c14'); else R(c, 19, 32, 10, 1, '#5c3428');
  });
}
const PORTRAITS = { ramirez: p => withMouth('pmrz', ramirezFace({ blink: p.blink }), p, 24, 32) };
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
