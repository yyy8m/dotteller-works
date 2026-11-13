/* ================= 文庫 #006 瓶詰地獄: helpers, island, cast & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function bigFace(c, spr, cx, cy, s, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
// the two children grow up: kid figures early, then young adults (robeFig, island clothes of leaves)
function kid(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f == null ? -1 : o.f, pose: o.pose || 'stand', arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, 13, 57, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- cast ---- */
const TARO_S = { id: 'taros', spk: 'taro', robe: '#e8e0cc', robe2: '#c8c0ac', trim: '#5c7cac', sash: '#5c7cac', skin: '#f0c8a0', hair: '#2c1c14' };       // 11, sailor suit
const AYA_S = { id: 'ayas', spk: 'ayako', robe: '#f4d8d8', robe2: '#d8b8b8', trim: '#c85c6c', sash: '#c85c6c', skin: '#f4d0b0', hair: '#2c1c14', female: true }; // 7, dress
const TARO = { id: 'taro', spk: 'taro', robe: '#5c7c3c', robe2: '#4c6c2c', trim: '#3c5c2c', sash: '#7c5c34', skin: '#d8a478', hair: '#1c1410' };         // grown, leaf cloth, sun-tanned
const AYA = { id: 'aya', spk: 'ayako', robe: '#6c8c3c', robe2: '#5c7c2c', trim: '#c84c5c', sash: '#c84c5c', skin: '#e8b890', hair: '#1c1410', female: true };

/* ---- the island ---- */
function tropicSky(c, t, o = {}) { VG(c, 0, 0, W, o.h || 110, o.night ? ['#04060e', '#0c1430', '#1c2c4c'] : o.dusk ? ['#2c2448', '#c85c4c', '#f8b860'] : ['#3c9ce8', '#8cccf4', '#d8f0f8']); if (!o.night) for (let i = 0; i < 3; i++) E(c, mod(i * 120 + t * 4, W + 120) - 60, 20 + i * 10, 40, 6, DA('#ffffff', 0.7)); }
function tropicSea(c, t, y = 110, o = {}) { R(c, 0, y, W, H - y, o.night ? '#0c1c3c' : '#1c7cb8'); for (let r = 0; r < 12; r++) { const yy = y + r * r * 0.8 + r * 2; for (let i = 0; i < 10; i++) R(c, mod(i * 41 + r * 17 - t * (6 + r * 2) * (r & 1 ? 1 : -0.6), W + 40) - 20, yy, 10 + r * 2, 1, r % 3 ? (o.night ? '#1c3c6c' : '#3c9cd8') : (o.night ? '#3c5c8c' : '#a8e0f8')); } }
function palm(c, x, y, h = 70, t = 0, s = 1) { for (let k = 0; k < 10; k++) { const u = k / 10; E(c, x + Math.sin(u * 1.4) * 8 * s, y - u * h, 3, 4, k % 2 ? '#8c6c44' : '#7c5c34'); } const tx = x + 8 * s, ty = y - h; for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.55 + Math.sin(t * 1.5 + i) * 0.05; for (let k = 0; k < 7; k++) E(c, tx + Math.cos(a) * k * 5, ty + Math.sin(a) * k * 5 + k * k * 0.4, 4 - k * 0.3, 2.5, i % 2 ? '#2c8c3c' : '#3c9c4c'); } E(c, tx - 3, ty + 4, 3, 3, '#8c6c34'); E(c, tx + 3, ty + 5, 3, 3, '#8c6c34'); }
function island(c, t, o = {}) {
  tropicSky(c, t, o); tropicSea(c, t, 110, o);
  PF(c, [0, 132, 40, 104, 120, 96, 210, 100, 300, 108, 320, 120, 320, 240, 0, 240], o.night ? '#1c2c1c' : '#3c8c3c'); // jungle
  for (let i = 0; i < 14; i++) E(c, 10 + i * 24, 108 + (i % 3) * 4, 16, 10, o.night ? '#142414' : ['#2c7c34', '#3c8c3c', '#4c9c44'][i % 3]);
  R(c, 0, 140, W, 100, o.night ? '#4c4434' : '#e8d8a0'); for (let i = 0; i < 30; i++) P(c, hash(i) * W, 144 + hash(i * 3) * 90, o.night ? '#3c3428' : '#d8c890');
  palm(c, 40, 140, 80, t); palm(c, 280, 142, 70, t, -1);
  // the cliff "God's foot" on the right
  if (o.cliff !== false) { PF(c, [230, 140, 252, 80, 276, 70, 300, 82, 320, 90, 320, 140], o.night ? '#2c2c34' : '#7c7064'); PF(c, [252, 80, 276, 70, 300, 82, 290, 86, 262, 86], o.night ? '#3c3c44' : '#9c8c7c'); if (o.pole !== false) { L(c, 278, 70, 278, 40, '#5c4430', 2); PF(c, [278, 40, 292 + Math.sin(t * 3) * 2, 44, 278, 50], '#3c9c3c'); } }
}
function hut(c, x, y, o = {}) { PF(c, [x, y, x + 20, y - 34, x + 60, y - 30, x + 70, y], '#8c6c44'); PF(c, [x + 6, y - 2, x + 22, y - 30, x + 58, y - 26, x + 64, y - 2], '#5c4430'); R(c, x + 26, y - 18, 16, 18, '#2c2018'); for (let i = 0; i < 8; i++) L(c, x + 4 + i * 8, y - 2, x + 20 + i * 5, y - 32, '#a8884c'); }
function bottle(c, x, y, a = 0, s = 1, o = {}) { c.save(); c.translate(x, y); c.rotate(a); c.scale(s, s); R(c, -4, -14, 8, 18, '#3c6c3c'); R(c, -2, -20, 4, 7, '#3c6c3c'); R(c, -3, -22, 6, 3, '#a85c2c'); R(c, -3, -11, 2, 10, '#6c9c6c'); if (o.paper) R(c, -2, -10, 4, 10, '#f0e8d4'); c.restore(); }
function letterPage(c, x, y, w, h, o = {}) { R(c, x, y, w, h, o.old ? '#d8ccb0' : '#f0e8d4'); R(c, x, y, w, 2, '#c8bca0'); if (!o.blank) for (let i = 0; i < Math.floor((h - 14) / 12); i++) R(c, x + 8, y + 10 + i * 12, w - 16 - ((i * 13) % 20), 1, '#8c8474'); }
function shark(c, x, y, t, s = 1) { const b = Math.sin(t * 2 + x) * 2; PF(c, [x, y + b, x + 6 * s, y - 12 * s + b, x + 12 * s, y + b], '#4c5c6c'); L(c, x - 6, y + 2 + b, x + 18, y + 2 + b, '#a8c8e8'); }

/* ---- portraits (48x48) ---- */
function taroFace(o = {}) {
  return SPR('trF' + (o.blink || 0) + (o.kid ? 'k' : '') + (o.sad ? 's' : ''), 48, 48, c => {
    const sk = o.kid ? '#f0c8a0' : '#d8a478', sk2 = o.kid ? '#c8946c' : '#a8744c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.kid ? '#e8e0cc' : sk2); if (o.kid) { PF(c, [10, 37, 24, 46, 38, 37], '#5c7cac'); } else { PF(c, [4, 48, 10, 42, 38, 42, 44, 48], '#4c6c2c'); }
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    PF(c, [12, 22, 12, 10, 18, 4, 30, 4, 36, 10, 36, 22, 33, 12, 27, 9, 22, 12, 16, 11], '#1c1410'); if (!o.kid) { R(c, 11, 18, 3, 12, '#1c1410'); R(c, 34, 18, 3, 12, '#1c1410'); }
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, o.sad ? 15 : 16, '#1c1410'); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c1c14'); continue; } R(c, x0, 18, 5, 3, '#f8f4ec'); R(c, x0 + 1, 18, 3, 3, '#2c1c14'); P(c, x0 + 1, 18, '#ffffff'); }
    L(c, 24, 21, 23, 25, sk2); R(c, 21, 30, 6, 1, '#8c4c3c'); if (o.sad) { R(c, 18, 22, 1, 4, '#88c8f8'); }
  });
}
function ayaFace(o = {}) {
  return SPR('ayF' + (o.blink || 0) + (o.kid ? 'k' : ''), 48, 48, c => {
    const sk = o.kid ? '#f4d0b0' : '#e8b890', sk2 = o.kid ? '#c8a080' : '#b8885c', hc = '#1c1410';
    R(c, 9, 14, 8, o.kid ? 22 : 34, hc); R(c, 31, 14, 8, o.kid ? 22 : 34, hc);
    PF(c, [2, 48, 9, 38, 39, 38, 46, 48], o.kid ? '#f4d8d8' : '#6c8c3c'); if (!o.kid) { E(c, 34, 14, 3, 3, '#f84c6c'); E(c, 34, 14, 1.5, 1.5, '#f8e070'); } // a red flower in her hair
    R(c, 20, 30, 8, 8, sk2); E(c, 24, 22, 10, 12.5, sk2); E(c, 23.6, 21.6, 9.6, 12, sk);
    PF(c, [13, 22, 14, 9, 22, 4, 26, 4, 34, 9, 35, 22, 32, 13, 24, 10, 16, 13], hc); R(c, 15, 12, 18, 3, hc);
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 18, 5, 4, '#f8f4ec'); R(c, x0 + 1, 18, 3, 4, '#3c2c1c'); P(c, x0 + 2, 19, C.k); P(c, x0 + 1, 18, '#ffffff'); }
    P(c, 24, 25, sk2); E(c, 18, 26, 2.5, 1.2, '#f4a8a0'); E(c, 30, 26, 2.5, 1.2, '#f4a8a0'); R(c, 22, 30, 4, 1, '#b8605c');
  });
}
const PORTRAITS = {
  taro: p => withMouth('pmtr', taroFace({ blink: p.blink }), p, 24, 30),
  ayako: p => withMouth('pmay', ayaFace({ blink: p.blink }), p, 24, 30),
};
