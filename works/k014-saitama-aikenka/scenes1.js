/* ================= 記録 #014 埼玉愛犬家連続殺人事件: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', weapon: o.weapon || null }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function ghost(c, st, x, y, a, o = {}) { if (a <= 0) return; c.save(); c.globalAlpha = a; person(c, st, x, y, o); c.restore(); }
function mist(c, t, y0 = 96, a = 0.16, col = '#c8d0e0') { c.save(); for (let i = 0; i < 6; i++) { const x = mod(i * 97 + t * (10 + i * 3), W + 200) - 100, y = y0 + (i % 3) * 14 + Math.sin(t * 0.5 + i) * 4; c.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 0.7 + i * 2)); E(c, x, y, 70 + (i % 2) * 30, 8 + (i % 3) * 3, col); } c.restore(); }

/* ---- cast (the main offenders are drawn without detailed faces: S in shadow) ---- */
const SMAN = { id: 'sm', spk: 'smale', top: 'jacket', coat: '#5c4c3c', shirt: '#e8e0d0', tie: '#7c2c2c', pants: '#3c3428', shoes: '#1c1410', skin: '#d8a880', hair: '#1c1814', hairStyle: 'bald', glasses: true, heavy: true };
const KAZAMA = { id: 'kz', top: 'dress', coat: '#7c3c5c', skin: '#ecc4a4', hair: '#2c1c14', hairStyle: 'long' };
const YAMA = { id: 'ym', top: 'shirt', coat: '#5c6c7c', pants: '#2c3440', shoes: '#1c1c1c', skin: '#e0b090', hair: '#1c1814', hairStyle: 'short' };
const VA = { id: 'va', top: 'jacket', coat: '#3c4c6c', shirt: '#f0ece4', tie: '#2c3c5c', pants: '#2c3448', shoes: '#141414', skin: '#e0b090', hair: '#1c1814', hairStyle: 'side' };
const VB = { id: 'vb', top: 'shirt', coat: '#c8c8c0', pants: '#1c1c20', shoes: '#141414', skin: '#d8a880', hair: '#1c1814', hairStyle: 'short', glasses: true };
const VC = { id: 'vc', top: 'tee', coat: '#4c6c4c', pants: '#3c3c44', shoes: '#2c2c2c', skin: '#e0b090', hair: '#2c2018', hairStyle: 'short' };
const VD = { id: 'vd', top: 'sweater', coat: '#a87c5c', skin: '#ecc4a4', hair: '#3c2c1c', hairStyle: 'curly' };
const COPS = [0, 1, 2].map(i => ({ id: 'cop' + i, top: 'jacket', coat: ['#2c2c34', '#3c3c44', '#2c3440'][i], shirt: '#e8e8e0', tie: '#1c1c2c', pants: '#24242c', shoes: '#141414', skin: ['#e0b090', '#d8a880', '#e8c0a0'][i], hair: '#1c1814', hairStyle: 'short' }));
const SEARCH = [0, 1, 2, 3].map(i => ({ id: 'sr' + i, top: 'uniform', coat: '#3c4c6c', pants: '#2c3c5c', shoes: '#141414', skin: ['#e0b090', '#d8a880', '#e8c0a0', '#dcac88'][i], hair: '#1c1814', hairStyle: 'short', hat: 'cap', hatCol: '#2c3c5c' }));
const PRESS = [0, 1, 2, 3].map(i => ({ id: 'pr' + i, top: i % 2 ? 'jacket' : 'shirt', coat: ['#5c5c6c', '#8c7c5c', '#4c5c4c', '#6c4c4c'][i], shirt: '#f0ece4', tie: '#3c3c5c', pants: '#2c2c34', shoes: '#141414', skin: '#e0b090', hair: '#1c1814', hairStyle: 'short' }));

/* ---- places ---- */
function sky(c, t, o = {}) { VG(c, 0, 0, W, 120, o.night ? ['#05060f', '#0e1430', '#1e2a4c'] : o.dusk ? ['#2c2448', '#9c5c4c', '#e8a860'] : o.winter ? ['#8c9cac', '#b8c4cc', '#d8dcdc'] : ['#5c9ce0', '#9cc8ec', '#d8ecf4']); if (o.night) for (let i = 0; i < 30; i++) P(c, hash(i) * W, hash(i * 3) * 70, '#c8d0e8'); }
// the kennel shop on a country road in Kumagaya
function kennel(c, t, x = 60, y = 150, o = {}) {
  R(c, x, y - 60, 150, 60, '#e8e0cc'); R(c, x - 4, y - 66, 158, 8, '#5c3c24'); R(c, x + 10, y - 56, 130, 18, '#2c5c3c'); TX(c, 'AFRICA KENNEL', x + 18, y - 56, '#f8e8b0', 16, null);
  for (let i = 0; i < 3; i++) { R(c, x + 12 + i * 44, y - 32, 30, 22, '#8cacc8'); R(c, x + 12 + i * 44, y - 32, 30, 2, '#5c5c64'); }
  R(c, x + 60, y - 30, 26, 30, '#5c3c24'); if (o.lit) for (let i = 0; i < 3; i++) glow(c, x + 27 + i * 44, y - 21, 14, 10, '#f8d880', 0.3);
  // the fence and kennels beside
  for (let k = 0; k < 6; k++) R(c, x + 160 + k * 16, y - 26, 2, 26, '#8c8c8c'); R(c, x + 160, y - 26, 82, 2, '#8c8c8c'); R(c, x + 160, y - 14, 82, 1, '#8c8c8c');
}
function dog(c, x, y, t, o = {}) { const col = o.col || '#c8c8c8', dk = o.dk || '#5c5c5c', wag = Math.sin(t * (o.wag || 8)) * 3, w = o.walk ? Math.sin(t * 8) * 2 : 0; E(c, x, y - 10, 11, 6, col); E(c, x - 2, y - 13, 9, 3, dk); for (const [lx, ph] of [[-7, 0], [-3, 1], [4, 2], [8, 3]]) L(c, x + lx, y - 6, x + lx + (ph & 1 ? w : -w), y, dk, 2); E(c, x + 12, y - 16, 6, 5, col); E(c, x + 13, y - 18, 4, 2, dk); PF(c, [x + 9, y - 21, x + 11, y - 26, x + 13, y - 21], dk); PF(c, [x + 13, y - 21, x + 15, y - 26, x + 17, y - 21], dk); E(c, x + 17, y - 14, 3, 2, col); P(c, x + 19, y - 15, '#141414'); P(c, x + 14, y - 17, '#141414'); L(c, x - 11, y - 12, x - 15, y - 18 + wag, col, 3); }
function pickup(c, x, y, o = {}) { const col = o.col || '#e8e8e0'; R(c, x, y - 18, 80, 12, col); R(c, x + 44, y - 32, 32, 16, col); R(c, x + 48, y - 30, 24, 10, '#8cacc8'); for (const wx of [x + 14, x + 64]) { E(c, wx, y - 5, 7, 7, '#141414'); E(c, wx, y - 5, 3, 3, '#8c8c8c'); } if (o.lights) { glow(c, x + 80, y - 14, 30, 8, '#f8f0c0', 0.3); } }
function mountainHouse(c, t, o = {}) { sky(c, t, o); for (let i = 0; i < 6; i++) PF(c, [i * 70 - 40, 120, i * 70 + 10, 60 + (i % 3) * 12, i * 70 + 60, 120], o.night ? '#141c24' : '#3c5c3c'); R(c, 0, 118, W, 122, o.night ? '#1c241c' : '#4c6c3c'); for (let i = 0; i < 8; i++) { const x = 10 + i * 40; R(c, x, 84, 3, 40, '#2c2018'); PF(c, [x - 10, 100, x + 1, 70, x + 12, 100], o.night ? '#0c1c14' : '#2c4c2c'); } R(c, 180, 90, 90, 40, '#7c6c5c'); PF(c, [174, 92, 225, 68, 276, 92], '#4c3c34'); R(c, 200, 104, 14, 14, o.night ? '#f8d880' : '#3c4c5c'); if (o.night) glow(c, 207, 111, 14, 10, '#f8d880', 0.3); }
function river(c, t, y = 140, o = {}) { R(c, 0, y, W, H - y, o.winter ? '#5c7c8c' : '#3c6c8c'); for (let r = 0; r < 8; r++) for (let i = 0; i < 8; i++) R(c, mod(i * 47 + r * 19 + t * (14 + r * 3), W + 40) - 20, y + 6 + r * 8, 14 + r, 1, '#a8c8d8'); }
function tv(c, x, y, w, h, fn) { R(c, x - 6, y - 6, w + 12, h + 16, '#3c3c40'); R(c, x - 4, y - 4, w + 8, h + 8, '#1c1c20'); c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); fn(c, x, y, w, h); c.restore(); for (let k = 0; k < h; k += 2) R(c, x, y + k, w, 1, DA('#000000', 0.15)); R(c, x + w - 12, y + h + 2, 4, 4, '#c81818'); }
function capsule(c, x, y, s = 1) { c.save(); c.translate(x, y); c.scale(s, s); E(c, -4, 0, 5, 4, '#f0e8d8'); E(c, 4, 0, 5, 4, '#c83c3c'); R(c, -4, -4, 8, 8, '#f0e8d8'); R(c, 0, -4, 4, 8, '#c83c3c'); P(c, -5, -2, '#ffffff'); c.restore(); }
function cashStack(c, x, y, n) { for (let i = 0; i < n; i++) { R(c, x + (i % 5) * 18, y - Math.floor(i / 5) * 6, 16, 5, '#c8b890'); R(c, x + (i % 5) * 18 + 6, y - Math.floor(i / 5) * 6, 4, 5, '#8c6c4c'); } }

/* ---- portraits (48x48): S is always half in shadow; Yamazaki-side faces are not needed ---- */
function smanFace(o = {}) {
  return SPR('smF' + (o.blink || 0), 48, 48, c => {
    const sk = '#d8a880', sk2 = '#9c704c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#5c4c3c'); PF(c, [18, 37, 24, 44, 30, 37], '#e8e0d0'); R(c, 23, 39, 3, 9, '#7c2c2c');
    R(c, 18, 30, 12, 8, sk2); E(c, 24, 22, 13, 14, sk2); E(c, 23.5, 21.5, 12.5, 13.5, sk); E(c, 11, 22, 2, 4, sk2); E(c, 37, 22, 2, 4, sk2);
    E(c, 24, 9, 11, 4, '#c89c74'); R(c, 11, 14, 3, 8, '#2c2018'); R(c, 34, 14, 3, 8, '#2c2018');
    for (const x0 of [16, 27]) { R(c, x0 - 1, 16, 8, 6, '#3c3c3c'); R(c, x0, 17, 6, 4, '#a8b0b8'); if (o.blink === 2) { L(c, x0 + 1, 19, x0 + 5, 19, '#2c1c14'); continue; } R(c, x0 + 2, 18, 2, 2, '#1c1410'); } L(c, 23, 19, 26, 19, '#3c3c3c');
    L(c, 24, 22, 23, 27, sk2); R(c, 20, 31, 8, 1, '#7c4c3c'); E(c, 24, 36, 7, 2, sk2);
    for (let y = 2; y < 46; y++) for (let x = 24; x < 46; x++) if ((x + y) % 2 === 0) P(c, x, y, DA('#0a0606', 0.55));
  });
}
const PORTRAITS = { smale: p => withMouth('pmsm', smanFace({ blink: p.blink }), p, 24, 31) };
