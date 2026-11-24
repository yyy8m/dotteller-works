/* ================= 記録 #021 下山事件: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1, rot: o.rot }); }
function shadow(c, st, x, y, o = {}) { blit(c, tintSpr(modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, k: 'sh' + (o.k || '') }), o.col || '#06060a', 'shd' + st.id + (o.k || '') + (o.arm || '') + (o.f == null ? -1 : o.f)), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { x = Math.max(x, 40); const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function rain(c, t, a = 1) { c.save(); c.globalAlpha = 0.45 * a; for (let i = 0; i < 80; i++) { const x = (hash(i) * 360 + t * 40) % 340 - 10, y = (hash(i + 99) * 200 + t * 280) % 200 - 10; L(c, x, y, x - 2, y + 8, '#8ca0c0'); } c.restore(); }
// the 1941 Buick (side view); o.driver, o.passenger
function buick(c, x, y, t, o = {}) {
  const b = o.move ? Math.round(Math.sin(t * 12) * 0.6) : 0;
  PF(c, [x, y - 10 + b, x + 8, y - 16 + b, x + 22, y - 17 + b, x + 30, y - 28 + b, x + 62, y - 28 + b, x + 72, y - 17 + b, x + 88, y - 15 + b, x + 94, y - 8 + b, x + 94, y + b, x, y + b], '#1c1c24');
  R(c, x + 34, y - 25 + b, 12, 8, '#5c6c7c'); R(c, x + 48, y - 25 + b, 12, 8, '#5c6c7c'); R(c, x + 4, y - 6 + b, 88, 2, '#8c8c94');
  if (o.driver) { E(c, x + 54, y - 21 + b, 3, 3, '#c8946c'); R(c, x + 51, y - 25 + b, 6, 2, '#2c2c3c'); } if (o.passenger) { E(c, x + 40, y - 21 + b, 3, 3, '#d8b08c'); R(c, x + 38, y - 19 + b, 4, 1, '#3c3c3c'); }
  for (const wx of [x + 18, x + 76]) { E(c, wx, y + 1, 7, 7, '#0c0c10'); E(c, wx, y + 1, 3, 3, '#a8acb4'); if (o.move) { const a = t * 20; P(c, wx + Math.cos(a) * 5, y + 1 + Math.sin(a) * 5, '#5c5c64'); } }
  R(c, x + 90, y - 12 + b, 4, 3, '#f8f0c0');
}
// the steam locomotive D51 (side), dim headlight; with freight cars trailing
function d51(c, x, y, t, o = {}) {
  R(c, x, y - 30, 80, 24, '#141418'); R(c, x + 4, y - 40, 22, 12, '#141418'); E(c, x + 80, y - 18, 6, 12, '#1c1c24'); R(c, x + 50, y - 46, 26, 18, '#1c1c24'); R(c, x + 10, y - 44, 6, 6, '#2c2c34');
  for (let i = 0; i < 4; i++) { E(c, x + 14 + i * 18, y - 4, 8, 8, '#0c0c10'); ER(c, x + 14 + i * 18, y - 4, 8, 8, '#5c5c64'); } L(c, x + 14, y - 4, x + 68, y - 4 + Math.sin(t * 8) * 2, '#8c8c94', 2);
  E(c, x + 86, y - 26, 3, 3, o.dim ? '#a89c6c' : '#f8f0c0'); if (!o.dim) glow(c, x + 100, y - 20, 40, 14, '#f8f0c0', 0.4); else glow(c, x + 92, y - 24, 10, 6, '#c8b880', 0.2);
  for (let i = 0; i < 4; i++) { const u = fr(t * 0.6 + i / 4); c.save(); c.globalAlpha = 0.4 * (1 - u); E(c, x + 16 - u * 40, y - 48 - u * 20, 6 + u * 10, 4 + u * 6, '#5c5c64'); c.restore(); }
  for (let k = 1; k <= 4; k++) { R(c, x - k * 70, y - 34, 64, 30, '#2c241c'); R(c, x - k * 70 + 4, y - 30, 56, 20, '#3c3024'); for (const wx of [8, 52]) E(c, x - k * 70 + wx, y - 2, 5, 5, '#0c0c10'); }
}
// the viaduct crossing at Gotanno: the Tobu line high above the Joban line; o.night, o.rain, o.glow (luminol on the sleepers)
function crossing(c, t, o = {}) {
  VG(c, 0, 0, W, 110, o.night ? ['#04040a', '#0c0c18', '#141424'] : o.dusk ? ['#2c2c44', '#7c5c6c', '#d89c7c'] : ['#7c98b8', '#a8b8c8', '#d8d8d0']);
  R(c, 0, 46, W, 14, o.night ? '#1c1c24' : '#5c5c64'); for (let x = 30; x < W; x += 80) R(c, x, 60, 14, 50, o.night ? '#14141c' : '#4c4c54'); R(c, 0, 44, W, 3, o.night ? '#2c2c34' : '#7c7c84');
  R(c, 0, 110, W, 80, o.night ? '#14120e' : '#5c5448'); PF(c, [0, 126, W, 120, W, 150, 0, 156], o.night ? '#1c1a16' : '#7c7064');
  for (let x = -4; x < W; x += 12) R(c, x, 128 - x * 0.02, 8, 22, o.night ? '#241c14' : '#5c4430'); R(c, 0, 130, W, 2, o.night ? '#5c5c64' : '#a8a8b0'); R(c, 0, 144, W, 2, o.night ? '#5c5c64' : '#a8a8b0');
  if (o.glow) { const n = Math.floor(o.glow * 26); for (let i = 0; i < n; i++) { const x = 300 - i * 12; c.save(); c.globalAlpha = 0.6 + 0.3 * Math.sin(t * 3 + i); E(c, x, 138, 4, 3, '#5cf8f0'); glow(c, x, 138, 10, 6, '#5cf8f0', 0.35); c.restore(); } }
  if (o.rain) rain(c, t, o.rain);
}
function lantern(c, x, y, t) { L(c, x, y, x, y + 10, '#3c3c3c'); E(c, x, y + 14, 4, 5, '#f8c060'); glow(c, x, y + 14, 22, 16, '#f8c060', 0.3 + 0.05 * Math.sin(t * 6 + x)); }
// Nihonbashi Mitsukoshi: the grand stone front, the lion, the south entrance
function mitsukoshi(c, t, o = {}) {
  VG(c, 0, 0, W, 120, ['#8ca8c8', '#b8c8d8', '#e0e0d8']); R(c, 30, 14, 260, 106, '#d8d0bc'); for (let i = 0; i < 6; i++) { R(c, 46 + i * 44, 30, 14, 56, '#c8c0ac'); R(c, 44 + i * 44, 28, 18, 4, '#e8e0cc'); } R(c, 30, 12, 260, 5, '#a89c88'); R(c, 120, 86, 80, 34, '#3c2c20'); R(c, 100, 72, 120, 10, '#2c2c2c'); TX(c, '三越', 144, 70, '#e8d8a0', 16, null);
  E(c, 92, 112, 10, 7, '#7c6c4c'); E(c, 86, 104, 6, 6, '#7c6c4c'); E(c, 84, 103, 3, 3, '#5c4c34'); // the bronze lion
  R(c, 0, 120, W, 70, '#8c8478'); for (let i = 0; i < 30; i++) P(c, (i * 37) % W, 124 + (i * 17) % 60, '#7c7468');
}
function office(c, t) { R(c, 0, 0, W, H, '#5c5448'); R(c, 0, 0, W, 120, '#7c7060'); R(c, 220, 20, 70, 50, '#a8c0d0'); R(c, 253, 20, 3, 50, '#5c4c3c'); R(c, 0, 120, W, 70, '#6c5844'); R(c, 100, 106, 120, 14, '#5c3c24'); R(c, 100, 104, 120, 3, '#7c5c3c'); for (let i = 0; i < 3; i++) R(c, 120 + i * 30, 98, 20, 6, '#f0ece0'); R(c, 40, 30, 50, 40, '#3c5c3c'); TX(c, '国鉄', 50, 40, '#e8e8e0', 16, null); }
function tokyoRoad(c, t, o = {}) { VG(c, 0, 0, W, 110, ['#8cacd0', '#b8c8d8', '#e0e0d8']); for (let i = 0; i < 8; i++) { const x = ((i * 64 - t * (o.speed || 0)) % 520 + 520) % 520 - 60, h = 34 + (i * 13) % 30; R(c, x, 110 - h, 54, h, i % 2 ? '#a89c8c' : '#c8bca8'); for (let k = 0; k < 2; k++) R(c, x + 8 + k * 24, 110 - h + 8, 12, 10, '#5c6c7c'); } R(c, 0, 110, W, 80, '#6c6c6c'); for (let i = 0; i < 8; i++) { const x = ((i * 50 - t * (o.speed || 0) * 1.3) % 400 + 400) % 400 - 40; R(c, x, 144, 24, 2, '#e8e8e0'); } }
function ryokan(c, t) { R(c, 0, 0, W, H, '#5c4c38'); R(c, 0, 0, W, 130, '#c8b898'); for (let x = 0; x < W; x += 48) R(c, x, 0, 4, 130, '#8c6c48'); R(c, 200, 20, 90, 70, '#a8c0c8'); R(c, 244, 20, 3, 70, '#8c6c48'); R(c, 200, 54, 90, 3, '#8c6c48'); R(c, 0, 130, W, 60, '#a89c64'); for (let x = 0; x < W; x += 40) R(c, x, 130, 1, 60, '#8c8048'); R(c, 60, 140, 90, 12, '#e8e4dc'); R(c, 60, 138, 90, 3, '#f8f4ec'); }
function lab(c, t) { R(c, 0, 0, W, H, '#3c4448'); R(c, 0, 0, W, 120, '#5c6468'); for (let i = 0; i < 5; i++) { R(c, 30 + i * 56, 40, 30, 50, '#c8d0d8'); R(c, 34 + i * 56, 44, 22, 8, ['#8ca8c8', '#c8a88c', '#a8c88c', '#c88ca8', '#c8c88c'][i]); } R(c, 0, 120, W, 70, '#4c5458'); R(c, 0, 114, W, 8, '#7c8488'); }
function archive(c, t) { R(c, 0, 0, W, H, '#3c3428'); for (let r = 0; r < 4; r++) { R(c, 0, 30 + r * 30, W, 3, '#5c4c38'); for (let i = 0; i < 12; i++) R(c, 6 + i * 26, 12 + r * 30, 22, 18, ['#8c7c5c', '#7c6c4c', '#9c8c6c'][(i + r) % 3]); } R(c, 0, 150, W, 40, '#2c2418'); }

/* ---- cast (1949 Japan) ---- */
const SHIMO = { id: 'sm', spk: 'shimoyama', top: 'jacket', coat: '#7c7c7c', shirt: '#f4f0e8', tie: '#3c2c2c', pants: '#6c6c6c', shoes: '#4c3424', skin: '#e0c0a0', hair: '#4c4844', hairStyle: 'side', glasses: true, heavy: true };
const OHNISHI = { id: 'on', spk: 'ohnishi', top: 'uniform', coat: '#2c2c34', pants: '#2c2c34', shoes: '#141414', skin: '#c8946c', hair: '#1c1814', hat: 'cap', hatCol: '#1c1c24' };
const OKAMI = { id: 'ok', spk: 'okami', top: 'dress', coat: '#7c5c5c', skin: '#e8c4a4', hair: '#1c1814', hairStyle: 'long' };
const STRANGER = { id: 'st', spk: 'otoko', top: 'jacket', coat: '#8c8070', shirt: '#f0ece4', pants: '#7c7064', shoes: '#4c3424', skin: '#d8b48c', hair: '#5c5850', hairStyle: 'side', heavy: true };
const WORKERS = ['#5c5c6c', '#6c5c4c', '#4c5c5c', '#5c4c4c', '#6c6c5c', '#4c4c5c'].map((col, i) => ({ id: 'wk' + i, top: i % 3 ? 'shirt' : 'jacket', coat: col, shirt: '#e8e4d8', pants: '#3c3c3c', shoes: '#1c1c1c', skin: '#c8946c', hair: '#1c1814', hairStyle: 'short', hat: i % 2 ? 'cap' : null, hatCol: '#2c2c2c' }));
const POLICE = { id: 'po', top: 'uniform', coat: '#2c3444', pants: '#2c3444', shoes: '#141414', skin: '#d8ac88', hair: '#1c1814', hat: 'police', hatCol: '#1c2434' };
const DETS = ['#3c3c44', '#4c4438', '#2c3440', '#443c34'].map((col, i) => ({ id: 'dt' + i, top: 'jacket', coat: col, shirt: '#e8e4d8', tie: '#2c2c2c', pants: col, shoes: '#141414', skin: '#d0a07c', hair: '#1c1814', hairStyle: 'short', hat: i % 2 ? 'fedora' : null, hatCol: '#2c2c2c' }));
const DOCS = ['#f0f0ec', '#e8e8e4'].map((col, i) => ({ id: 'dc' + i, top: 'jacket', coat: col, shirt: '#f8f8f4', tie: '#2c2c3c', pants: '#3c3c44', shoes: '#141414', skin: '#d8b08c', hair: i ? '#8c8c84' : '#1c1814', hairStyle: 'side', glasses: !!i }));
const GI = { id: 'gi', top: 'uniform', coat: '#6c6c4c', pants: '#6c6c4c', shoes: '#3c2c1c', skin: '#e8c8a8', hair: '#c8a86c', hat: 'cap', hatCol: '#5c5c3c' };

/* ---- portraits (48x48) ---- */
function shimoFace(o = {}) { // Shimoyama Sadanori: a broad, fleshy face, round dark spectacles, drooping thick brows, hair parted
  return SPR('smF' + (o.blink || 0) + (o.tired ? 't' : ''), 48, 48, c => {
    const sk = '#e0c0a0', sk2 = '#b89878';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#7c7c7c'); PF(c, [18, 37, 24, 44, 30, 37], '#f4f0e8'); L(c, 24, 40, 24, 48, '#3c2c2c', 2); R(c, 18, 31, 12, 7, sk2);
    E(c, 24, 22, 13, 14, sk2); E(c, 23.5, 21.5, 12.5, 13.5, sk); PF(c, [11, 16, 12, 7, 20, 3, 34, 5, 37, 12, 36, 16, 31, 9, 21, 9], '#4c4844'); L(c, 21, 4, 23, 9, '#6c6864');
    L(c, 14, 15, 21, 16, '#2c2824', 2); L(c, 27, 16, 34, 15, '#2c2824', 2);
    for (const x0 of [15, 27]) { E(c, x0 + 3, 21, 4.5, 4, '#2c241c'); E(c, x0 + 3, 21, 3.4, 3, '#e8ecf0'); if (o.blink === 2) L(c, x0 + 1, 21, x0 + 5, 21, '#2c241c'); else { R(c, x0 + 2, 20, 2, 2, '#1c1814'); P(c, x0 + 4, 19, '#ffffff'); } }
    L(c, 21, 21, 24, 21, '#2c241c'); L(c, 24, 22, 23, 28, sk2); R(c, 21, 28, 6, 1, sk2); E(c, 15, 28, 2, 2, '#e8b8a0'); E(c, 33, 28, 2, 2, '#e8b8a0'); R(c, 20, 32, 8, 1, '#7c4c3c'); L(c, 14, 31, 16, 34, sk2); L(c, 34, 31, 32, 34, sk2);
  });
}
function ohnishiFace(o = {}) { return SPR('onF' + (o.blink || 0), 48, 48, c => { const sk = '#c8946c', sk2 = '#a0704c'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#2c2c34'); R(c, 19, 31, 10, 7, sk2); E(c, 24, 22, 11, 14, sk2); E(c, 23.5, 21.5, 10.5, 13.5, sk); R(c, 12, 4, 24, 9, '#1c1c24'); R(c, 10, 12, 28, 3, '#141418'); R(c, 20, 6, 8, 3, '#c8a848'); L(c, 15, 17, 21, 17, '#1c1814', 2); L(c, 27, 17, 33, 17, '#1c1814', 2); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 5, 21, '#1c1410'); continue; } R(c, x0, 20, 5, 3, '#f0e4d0'); R(c, x0 + 2, 20, 2, 3, '#1c1410'); } L(c, 24, 22, 23, 27, sk2); R(c, 21, 31, 6, 1, '#6c3c2c'); }); }
function okamiFace(o = {}) { return SPR('okF' + (o.blink || 0), 48, 48, c => { const sk = '#e8c4a4', sk2 = '#c4a084'; PF(c, [6, 48, 10, 38, 38, 38, 42, 48], '#7c5c5c'); PF(c, [18, 38, 24, 45, 30, 38], '#f0e8e0'); R(c, 20, 31, 8, 7, sk2); E(c, 24, 22, 10, 13, sk2); E(c, 23.5, 21.5, 9.5, 12.5, sk); E(c, 24, 6, 9, 6, '#1c1814'); PF(c, [13, 18, 14, 8, 24, 4, 34, 8, 35, 18, 31, 11, 17, 11], '#1c1814'); R(c, 30, 3, 6, 2, '#c8a848'); for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c1c14'); continue; } L(c, x0, 19, x0 + 5, 19, '#2c1c14'); R(c, x0 + 1, 20, 3, 2, '#2c1c14'); } L(c, 24, 22, 23, 26, sk2); L(c, 21, 30, 24, 31, '#a8584c'); L(c, 24, 31, 27, 30, '#a8584c'); E(c, 17, 26, 2, 1, '#f0b0a0'); E(c, 31, 26, 2, 1, '#f0b0a0'); }); }
function otokoFace(o = {}) { // the man at the inn / by the tracks: half in shadow, the glint of spectacles, no clear features
  return SPR('otF' + (o.blink || 0) + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.dark ? '#6c5c4c' : '#a8907c', sk2 = o.dark ? '#3c3028' : '#7c6858';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#5c5448'); R(c, 18, 31, 12, 7, sk2); E(c, 24, 22, 13, 14, sk2); E(c, 23.5, 21.5, 12.5, 13.5, sk); PF(c, [11, 16, 12, 7, 20, 3, 34, 5, 37, 12, 36, 16, 31, 9, 21, 9], '#2c2824');
    c.save(); c.globalAlpha = 0.6; PF(c, [24, 0, 48, 0, 48, 48, 24, 48], '#000000'); c.restore();
    for (const x0 of [15, 27]) { E(c, x0 + 3, 21, 4.5, 4, '#141010'); if (o.blink !== 2) R(c, x0 + 1, 19, 3, 2, '#e8e8f0'); }
    L(c, 24, 22, 23, 28, sk2); R(c, 20, 32, 8, 1, '#3c2c24');
  });
}
const PORTRAITS = {
  shimoyama: p => withMouth('pmsm', shimoFace({ blink: p.blink }), p, 24, 32),
  ohnishi: p => withMouth('pmon', ohnishiFace({ blink: p.blink }), p, 24, 31),
  okami: p => withMouth('pmok', okamiFace({ blink: p.blink }), p, 24, 30),
  otoko: p => withMouth('pmot', otokoFace({ blink: p.blink }), p, 24, 32),
};
