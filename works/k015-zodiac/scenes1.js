/* ================= 記録 #015 ゾディアック事件: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', weapon: o.weapon || null }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function shadow(c, st, x, y, o = {}) { blit(c, tintSpr(modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, k: 'sh' + (o.k || ''), weapon: o.weapon || null }), o.col || '#06060a', 'shd' + st.id + (o.k || '') + (o.arm || '') + (o.f == null ? -1 : o.f)), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function mist(c, t, y0 = 96, a = 0.16, col = '#c8d0e0') { c.save(); for (let i = 0; i < 6; i++) { const x = mod(i * 97 + t * (10 + i * 3), W + 200) - 100, y = y0 + (i % 3) * 14 + Math.sin(t * 0.5 + i) * 4; c.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 0.7 + i * 2)); E(c, x, y, 70 + (i % 2) * 30, 8 + (i % 3) * 3, col); } c.restore(); }
function muzzle(c, x, y, t, t0, dir = 1, n = 5, gap = 0.22) { for (let k = 0; k < n; k++) { const u = t - (t0 + k * gap); if (u > 0 && u < 0.08) { PF(c, [x, y - 4, x + dir * 16, y, x, y + 4], '#fff4b0'); flashScreen(c, 0.25); } } }

/* ---- the Zodiac symbol: a circle with a cross ---- */
function zsym(c, x, y, r, col = '#f4f0e8', w = 2) { c.save(); c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.arc(x, y, r, 0, TAU); c.stroke(); c.restore(); L(c, x - r - 4, y, x + r + 4, y, col, w); L(c, x, y - r - 4, x, y + r + 4, col, w); }
function crosshair(c, x, y, r, t) { const p = 1 + 0.06 * Math.sin(t * 6); zsym(c, x, y, r * p, '#e81c1c', 2); }

/* ---- cast ---- */
const ZOD = { id: 'zd', top: 'jacket', coat: '#2c2c34', shirt: '#4c4c54', pants: '#24242c', shoes: '#141414', skin: '#e0b898', hair: '#8c6c44', hairStyle: 'short', glasses: true, heavy: true };
const ZODHOOD = { id: 'zh', top: 'shirt', coat: '#141418', pants: '#141418', shoes: '#141414', skin: '#141418', hair: '#141418', hairStyle: 'bald' };
const TEENS = [{ id: 'dv', top: 'jacket', coat: '#8c5c3c', shirt: '#f0ece4', pants: '#3c3c5c', shoes: '#2c2018', skin: '#ecc4a4', hair: '#5c3c24', hairStyle: 'short' }, { id: 'bt', top: 'dress', coat: '#5c8cc8', skin: '#f0c8a8', hair: '#c8a060', hairStyle: 'long' }];
const PAIR2 = [{ id: 'mk', top: 'tee', coat: '#c8c8c0', pants: '#3c3c5c', shoes: '#2c2018', skin: '#ecc4a4', hair: '#8c5c3c', hairStyle: 'curly' }, { id: 'dl', top: 'dress', coat: '#c85c5c', skin: '#f0c8a8', hair: '#3c2818', hairStyle: 'long' }];
const PAIR3 = [{ id: 'br', top: 'sweater', coat: '#5c7c4c', pants: '#3c3c44', shoes: '#2c2018', skin: '#ecc4a4', hair: '#3c2818', hairStyle: 'short' }, { id: 'cc', top: 'dress', coat: '#e8c85c', skin: '#f0c8a8', hair: '#8c5c3c', hairStyle: 'long' }];
const STINE = { id: 'st', top: 'shirt', coat: '#e8e4dc', pants: '#3c3c44', shoes: '#141414', skin: '#e0b898', hair: '#5c4c3c', hairStyle: 'side' };
const BOYS = [0, 1, 2].map(i => ({ id: 'by' + i, kid: true, top: 'tee', coat: ['#c84c3c', '#3c7cc8', '#e8b83c'][i], pants: '#3c3c5c', shoes: '#2c2018', skin: '#ecc4a4', hair: ['#3c2818', '#8c5c3c', '#1c1410'][i], hairStyle: 'short' }));
const COPS = [0, 1].map(i => ({ id: 'cp' + i, top: 'uniform', coat: '#1c2c4c', pants: '#142040', shoes: '#141414', skin: ['#ecc4a4', '#e0b090'][i], hair: '#3c2818', hairStyle: 'short', hat: 'police', hatCol: '#1c2c4c' }));
const KATH = { id: 'kj', top: 'dress', coat: '#7c5c9c', skin: '#f0c8a8', hair: '#5c3c24', hairStyle: 'long' };
const TOSCHI = { id: 'ts', top: 'jacket', coat: '#5c5c64', shirt: '#f0ece4', tie: '#c81818', pants: '#3c3c44', shoes: '#141414', skin: '#e0b898', hair: '#1c1814', hairStyle: 'side' };
const ALLEN = { id: 'al', top: 'shirt', coat: '#6c7c8c', pants: '#3c3c44', shoes: '#2c2018', skin: '#ecc4a4', hair: '#5c4c3c', hairStyle: 'bald', glasses: true, heavy: true };
const HARDEN = [{ id: 'hd', top: 'sweater', coat: '#8c6c4c', pants: '#3c3c44', shoes: '#2c2018', skin: '#ecc4a4', hair: '#3c2818', hairStyle: 'side', glasses: true }, { id: 'hb', top: 'dress', coat: '#c87c5c', skin: '#f0c8a8', hair: '#8c5c3c', hairStyle: 'curly' }];
const SOLVERS = [0, 1, 2].map(i => ({ id: 'sv' + i, top: 'tee', coat: ['#3c5c8c', '#5c8c5c', '#8c5c5c'][i], pants: '#3c3c44', shoes: '#2c2c2c', skin: ['#ecc4a4', '#e0b090', '#f0c8a8'][i], hair: ['#5c3c24', '#c8a060', '#1c1410'][i], hairStyle: i === 1 ? 'curly' : 'short', glasses: i !== 1 }));

/* ---- places ---- */
function nightSkyCA(c, t, o = {}) { VG(c, 0, 0, W, 120, o.dusk ? ['#1c1c3c', '#5c3c5c', '#c8785c'] : ['#04050c', '#0c1028', '#1c2444']); for (let i = 0; i < 40; i++) P(c, hash(i) * W, hash(i * 3) * 80, (Math.floor(t * 2) + i) % 9 ? '#c8d0e8' : '#4c5070'); }
function hills(c, y = 110, col = '#141c1c') { PF(c, [0, y, 40, y - 18, 100, y - 8, 160, y - 26, 230, y - 10, 290, y - 22, 320, y - 12, 320, y + 10, 0, y + 10], col); }
function oldCar(c, x, y, o = {}) { const col = o.col || '#5c6c7c', dk = shadeCol(col, 0.75); R(c, x, y - 18, 80, 12, col); PF(c, [x + 14, y - 18, x + 22, y - 30, x + 56, y - 30, x + 64, y - 18], col); R(c, x + 24, y - 28, 14, 9, o.lit ? '#f8e8a0' : '#5c7c9c'); R(c, x + 41, y - 28, 14, 9, o.lit ? '#f8e8a0' : '#5c7c9c'); R(c, x, y - 8, 80, 2, dk); for (const wx of [x + 16, x + 64]) { E(c, wx, y - 5, 7, 7, '#141414'); E(c, wx, y - 5, 3, 3, '#8c8c8c'); } if (o.head) { R(c, x + 78, y - 15, 3, 3, '#f8f0c0'); c.save(); c.globalAlpha = 0.18; PF(c, [x + 80, y - 15, x + 200, y - 40, x + 200, y + 10], '#f8f0c0'); c.restore(); } if (o.door) { PF(c, [x + 40, y - 18, x + 52, y - 30, x + 58, y - 6], dk); } }
function taxi(c, x, y) { oldCar(c, x, y, { col: '#e8c83c' }); R(c, x + 34, y - 36, 12, 6, '#f4f0e8'); TX(c, 'TAXI', x + 30, y - 52, '#2c2c2c', 16, null); }
function streetSF(c, t, o = {}) { nightSkyCA(c, t, o); for (let i = 0; i < 6; i++) { const x = i * 56 - 4, h = 60 + (i * 29 % 30); R(c, x, 140 - h, 52, h, ['#3c3444', '#443c4c', '#34303c'][i % 3]); for (let k = 0; k < 6; k++) { const lit = hash(i * 11 + k + Math.floor(t * 0.3)) > 0.5; R(c, x + 8 + (k % 2) * 22, 150 - h + Math.floor(k / 2) * 18, 12, 10, lit ? '#f8d880' : '#1c1c24'); } } R(c, 0, 140, W, 100, '#2c2c30'); R(c, 0, 140, W, 4, '#5c5c64'); for (let i = 0; i < 3; i++) { const x = 40 + i * 120; R(c, x, 84, 3, 56, '#1c1c1c'); glow(c, x + 1, 86, 16, 10, '#f8e8b0', 0.35 + 0.05 * Math.sin(t * 5 + i)); } mist(c, t, 110, 0.12, '#8c94a8'); }
function newsroom(c, t) { R(c, 0, 0, W, H, '#3c3428'); for (let x = 0; x < W; x += 40) R(c, x, 0, 2, 150, '#4c4234'); R(c, 0, 150, W, 90, '#2c2418'); for (let i = 0; i < 3; i++) { const x = 20 + i * 104; R(c, x, 116, 80, 8, '#5c4430'); R(c, x + 10, 104, 30, 12, '#2c2c2c'); R(c, x + 12, 106, 26, 6, '#5c5c5c'); } const sw = Math.sin(t * 1.4) * 4; L(c, 160, 0, 160 + sw, 24, '#1c1c1c'); E(c, 160 + sw, 28, 10, 5, '#c8b878'); glow(c, 160 + sw, 40, 60, 40, '#f8e0a0', 0.18); }
function letter(c, x, y, w = 60, h = 76, o = {}) { R(c, x, y, w, h, o.col || '#f0e8d4'); R(c, x, y, w, 2, '#c8bca0'); for (let i = 0; i < Math.floor((h - 12) / 7); i++) R(c, x + 5, y + 6 + i * 7, w - 10 - (i * 7 % 14), 1, '#2c4c8c'); if (o.sym) zsym(c, x + w - 12, y + h - 12, 5, '#2c4c8c', 1); }
function cipherGrid(c, x, y, cols, rows, t, o = {}) { const glyphs = ['A', '+', 'K', '/', 'P', 'Z', '>', 'O', 'W', '9', 'L', 'T', '^', '#', 'R', 'q', 'b', '<']; R(c, x - 6, y - 6, cols * 12 + 16, rows * 14 + 10, o.bg || '#f0e8d4'); for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) { const g = glyphs[Math.floor(hash(r * 31 + k * 7 + (o.seed || 0)) * glyphs.length)]; const hl = o.hl && Math.floor(t * 6) % (rows * cols) === r * cols + k; TX(c, g, x + k * 12, y + r * 14 - 3, hl ? '#c81818' : '#2c2c34', 16, null); } }
function scoreBoard(c, x, y, me, sf, k = 1) { if (k <= 0) return; c.save(); c.globalAlpha = k; R(c, x, y, 150, 44, '#000000'); R(c, x + 2, y + 2, 146, 40, '#1c1c24'); zsym(c, x + 20, y + 22, 9, '#f4f0e8'); TX(c, '= ' + me, x + 36, y + 13, '#f4f0e8', 16, null); TX(c, 'SFPD = ' + sf, x + 76, y + 13, '#e81c1c', 16, null); c.restore(); }
function inCar(c, st, carX, y, slot = 0, o = {}) { const wx = carX + 24 + slot * 17; c.save(); c.beginPath(); c.rect(wx, y - 28, 14, 9); c.clip(); blit(c, modFig(st, { k: 'car' + (o.k || ''), expr: o.expr || 'normal', blink: o.blink || 0 }), wx + 7, y + 10, FIG_AX2, FIG_AY2, { s: 0.7, flip: !!o.flip }); c.restore(); }
function phoneBooth(c, x, y, t, o = {}) { R(c, x, y - 60, 30, 60, '#3c5c3c'); R(c, x + 3, y - 56, 24, 50, o.lit === false ? '#1c241c' : '#c8d8b8'); glow(c, x + 15, y - 34, 24, 30, '#f8f0c0', o.lit === false ? 0 : 0.2); R(c, x + 10, y - 44, 10, 10, '#2c2c2c'); if (o.hang) { const sw = Math.sin(t * 2.4) * 4; L(c, x + 15, y - 34, x + 15 + sw, y - 14, '#1c1c1c'); R(c, x + 11 + sw, y - 14, 8, 4, '#1c1c1c'); } }
function schoolBus(c, x, y) { R(c, x, y - 34, 110, 28, '#e8b83c'); R(c, x + 4, y - 30, 102, 10, '#5c7c9c'); for (let k = 0; k < 7; k++) R(c, x + 6 + k * 14, y - 30, 2, 10, '#e8b83c'); R(c, x, y - 18, 110, 2, '#1c1c1c'); for (const wx of [x + 18, x + 90]) { E(c, wx, y - 6, 8, 8, '#141414'); E(c, wx, y - 6, 3, 3, '#8c8c8c'); } }
function fireworks(c, t, x, y, i) { const u = fr(t * 0.35 + i * 0.37); if (u > 0.7) return; const r = u * 40, col = ['#f84040', '#f8e070', '#80c8f8', '#f8f8f8'][i % 4]; for (let k = 0; k < 14; k++) { const a = k / 14 * TAU; P(c, x + Math.cos(a) * r, y + Math.sin(a) * r + u * u * 20, DA(col, 1 - u / 0.7)); } }

/* ---- portraits (48x48) ---- */
// the police composite sketch of the man (crew cut, heavy glasses) — drawn as a pencil sketch on paper
function sketchFace(o = {}) {
  return SPR('skF' + (o.blink || 0) + (o.dark ? 'd' : ''), 48, 48, c => {
    const bg = o.dark ? '#0c0c10' : '#e8e0cc', ink = o.dark ? '#c8c8d0' : '#3c3c44', sk = o.dark ? '#1c1c24' : '#e8e0cc';
    R(c, 0, 0, 48, 48, bg); PF(c, [4, 48, 10, 37, 38, 37, 44, 48], o.dark ? '#14141c' : '#c8c0ac');
    E(c, 24, 23, 12, 14, ink); E(c, 24, 23, 11, 13, sk); R(c, 13, 8, 22, 4, ink); for (let x = 13; x < 35; x += 2) L(c, x, 8, x, 12, ink);
    for (const x0 of [16, 27]) { ER(c, x0 + 3, 19, 4.5, 3.2, ink); ER(c, x0 + 3, 19, 4, 2.8, ink); if (o.blink === 2) L(c, x0 + 1, 19, x0 + 5, 19, ink); else { R(c, x0 + 2, 18, 2, 2, ink); if (o.dark) P(c, x0 + 2, 18, '#e81c1c'); } } L(c, 23, 19, 25, 19, ink);
    L(c, 24, 21, 23, 27, ink); L(c, 21, 32, 27, 32, ink); L(c, 13, 26, 15, 32, ink); L(c, 35, 26, 33, 32, ink);
    for (let i = 0; i < 18; i++) P(c, 14 + hash(i) * 20, 28 + hash(i * 3) * 8, DA(ink, 0.3));
  });
}
const PORTRAITS = { zodiac: p => withMouth('pmzd', sketchFace({ blink: p.blink, dark: true }), p, 24, 32) };
