/* ================= 記録 #013 ペドロ・ロペス: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function rain(c, t, n = 40, col = '#7c8cac') { for (let i = 0; i < n; i++) { const u = fr(t * 1.4 + hash(i)); const x = mod(hash(i * 3) * W - u * 30, W); L(c, x, u * 200 - 20, x - 3, u * 200 - 10, col); } }
function mist(c, t, y0 = 96, a = 0.16, col = '#c8d0e0') { c.save(); for (let i = 0; i < 6; i++) { const x = mod(i * 97 + t * (10 + i * 3), W + 200) - 100, y = y0 + (i % 3) * 14 + Math.sin(t * 0.5 + i) * 4; c.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 0.7 + i * 2)); E(c, x, y, 70 + (i % 2) * 30, 8 + (i % 3) * 3, col); } c.restore(); }

/* ---- cast ---- */
const LOPEZ = { id: 'lpz', spk: 'lopez', top: 'shirt', coat: '#8c7c5c', coat2: '#6c5c44', pants: '#3c3428', shoes: '#2c2018', skin: '#c8946c', hair: '#1c1410', hairStyle: 'short', moustache: true };
const LOPEZ_J = { ...LOPEZ, id: 'lpzj', coat: '#c8a46c', coat2: '#a8844c', pants: '#a8844c' }; // prison clothes
const PRIEST = { id: 'prs', spk: 'priest', top: 'shirt', coat: '#1c1c20', pants: '#1c1c20', shoes: '#141414', skin: '#d8ac84', hair: '#8c8c8c', hairStyle: 'side', glasses: true };
const MOM = { id: 'mom', top: 'dress', coat: '#3c6c9c', skin: '#c8946c', hair: '#1c1410', hairStyle: 'long' };
const OLDMOM = { id: 'old', top: 'dress', coat: '#5c4c5c', skin: '#b88c6c', hair: '#c8c8c8', hairStyle: 'long' };
const COPS = [0, 1].map(i => ({ id: 'cop' + i, top: 'uniform', coat: '#3c5c3c', pants: '#2c442c', shoes: '#141414', skin: ['#c8946c', '#b8845c'][i], hair: '#1c1410', hairStyle: 'short', hat: 'police', hatCol: '#2c442c', moustache: i === 0 }));
const CROWD = ['#c84c3c', '#3c7cc8', '#e8b83c', '#5c9c4c', '#9c5cac', '#e87c3c'].map((col, i) => ({ id: 'cr' + i, top: i % 2 ? 'tee' : 'shirt', coat: col, pants: ['#3c3c5c', '#5c4c3c', '#2c2c34'][i % 3], shoes: '#2c2018', skin: ['#c8946c', '#b8845c', '#d8a47c'][i % 3], hair: '#1c1410', hairStyle: i % 3 === 1 ? 'long' : 'short' }));
const TRIBE = ['#c83c3c', '#3c8c5c', '#c8a03c'].map((col, i) => ({ id: 'tb' + i, robe: col, robe2: shadeCol(col, 0.8), trim: '#f0e0c0', sash: '#1c1c2c', skin: '#a8744c', hair: '#141010', female: i === 1 }));
const MISSION = { id: 'mis', top: 'dress', coat: '#e8e0c8', skin: '#f0c8a8', hair: '#c8a060', hairStyle: 'long' };
const JUDGE = { id: 'jdg', top: 'jacket', coat: '#141418', shirt: '#f4f0e8', tie: '#1c1c1c', pants: '#141418', shoes: '#141414', skin: '#c8946c', hair: '#5c5c5c', hairStyle: 'side', glasses: true };

/* ---- places ---- */
function andesSky(c, t, o = {}) { VG(c, 0, 0, W, 120, o.night ? ['#05060f', '#0e1430', '#1e2a4c'] : o.dusk ? ['#2c2448', '#9c4c4c', '#e8a060'] : o.storm ? ['#2c3038', '#4c5058', '#6c7078'] : ['#4c9ce8', '#8cccf4', '#d0ecf4']); if (o.night) for (let i = 0; i < 30; i++) P(c, hash(i) * W, hash(i * 3) * 70, '#c8d0e8'); }
function andes(c, t, o = {}) { andesSky(c, t, o); const cols = o.night ? ['#141c2c', '#10182a', '#0c121c'] : o.storm ? ['#4c5058', '#3c4048', '#2c3038'] : ['#8c8ca8', '#6c7c6c', '#5c6c4c']; for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) { const x = mod(i * 70 + j * 33, 420) - 50, h = 50 + (i * 23 % 34) - j * 8; PF(c, [x - 56, 120 + j * 8, x, 120 + j * 8 - h, x + 56, 120 + j * 8], cols[j]); if (j === 0 && !o.night && !o.storm) PF(c, [x - 10, 120 - h + 12, x, 120 - h, x + 10, 120 - h + 12], '#f4f4f8'); } }
function stall(c, x, y, col, t) { R(c, x, y - 30, 4, 30, '#5c4c3c'); R(c, x + 40, y - 30, 4, 30, '#5c4c3c'); PF(c, [x - 4, y - 30, x + 22, y - 40, x + 48, y - 30], col); for (let k = 0; k < 4; k++) R(c, x + 2 + k * 10, y - 30, 5, 3, '#f4f0e8'); R(c, x, y - 12, 44, 12, '#7c5c3c'); for (let k = 0; k < 6; k++) E(c, x + 5 + k * 7, y - 14, 3, 3, ['#e8c83c', '#c83c3c', '#5c9c3c', '#e87c3c'][k % 4]); }
function candles(c, t, n, x0, y, gap = 12, lit = 1) { for (let i = 0; i < n; i++) { const x = x0 + (i % 20) * gap, yy = y + Math.floor(i / 20) * 10; candle(c, x, yy, t, i, lit); glow(c, x, yy - 7, 8, 6, '#f8c060', 0.25 * lit); } }
function jeep(c, x, y, o = {}) { const col = o.col || '#5c6c3c'; R(c, x, y - 22, 70, 14, col); R(c, x + 40, y - 34, 24, 12, shadeCol(col, 0.85)); R(c, x + 44, y - 32, 16, 8, '#8cacc8'); R(c, x + 66, y - 18, 6, 4, '#f8e070'); for (const wx of [x + 14, x + 56]) { E(c, wx, y - 6, 7, 7, '#141414'); E(c, wx, y - 6, 3, 3, '#8c8c8c'); } if (o.rope) L(c, x - 2, y - 14, x - 30, y - 6, '#c8a860', 1); }
function samMap(c, t, o = {}) { // north-western South America: Colombia, Ecuador, Peru
  R(c, 0, 0, W, H, '#0c1c34'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#10223c');
  const COL = [[150, 10], [210, 20], [240, 40], [230, 80], [200, 90], [170, 86], [140, 74], [120, 50]], ECU = [[120, 74], [140, 74], [150, 90], [140, 104], [112, 100], [104, 84]], PER = [[112, 100], [140, 104], [170, 100], [200, 120], [210, 160], [190, 200], [160, 220], [130, 190], [100, 140]];
  const hl = o.hl || {}; [[COL, 'col', 'コロンビア', 168, 40], [ECU, 'ecu', 'エクアドル', 14, 84], [PER, 'per', 'ペルー', 146, 106]].forEach(([pts, k, name, tx, ty]) => { PF(c, pts.flat(), hl[k] ? '#c86c4c' : '#8c8460'); if (hl[k]) for (const [x, y] of pts) P(c, x, y, '#f8e0b0'); TX(c, name, tx, ty, '#f4f0e8', 16, '#000000'); });
}
function cell(c, t) { R(c, 0, 0, W, H, '#3c3c40'); for (let y = 0; y < 150; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#444448'); R(c, 0, 150, W, 90, '#2c2c30'); R(c, 220, 30, 40, 44, '#141418'); for (let i = 0; i < 4; i++) R(c, 224 + i * 10, 30, 2, 44, '#5c5c64'); const k = 0.18 + 0.06 * Math.sin(t * 1.3); c.save(); c.globalAlpha = k; PF(c, [224, 74, 256, 74, 300, 150, 190, 150], '#fff4c8'); c.restore(); }
function poster(c, x, y, k = 1, o = {}) { if (k <= 0) return; c.save(); c.globalAlpha = k; R(c, x, y, 40, 52, '#f0e8d4'); R(c, x + 4, y + 4, 32, 6, o.red ? '#c81818' : '#3c3c44'); R(c, x + 10, y + 14, 20, 22, '#a8a49c'); E(c, x + 20, y + 22, 6, 6, '#7c7870'); R(c, x + 6, y + 40, 28, 2, '#8c8474'); R(c, x + 6, y + 45, 22, 2, '#8c8474'); c.restore(); }

/* ---- portraits (48x48) ---- */
function lopezFace(o = {}) {
  return SPR('lpF' + (o.blink || 0) + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.dark ? '#7c5c44' : '#c8946c', sk2 = o.dark ? '#4c3424' : '#94684c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#8c7c5c'); PF(c, [18, 37, 24, 44, 30, 37], '#6c5c44');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11, 13, sk2); E(c, 23.5, 21.5, 10.5, 12.5, sk);
    PF(c, [12, 18, 13, 8, 20, 4, 30, 4, 36, 9, 36, 18, 33, 11, 25, 8, 16, 11], '#141010');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 15, x0 + 4, 16, '#141010', 2); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#1c1410'); continue; } R(c, x0, 18, 5, 3, o.dark ? '#a89c8c' : '#f0ece4'); R(c, x0 + 1, 18, 3, 3, '#1c1410'); P(c, x0 + 2, 18, o.dark ? '#c81818' : '#ffffff'); }
    L(c, 24, 21, 23, 26, sk2); PF(c, [17, 28, 24, 27, 31, 28, 29, 30, 19, 30], '#1c1410'); R(c, 21, 32, 6, 1, '#6c3c2c');
    if (o.dark) for (let y = 2; y < 14; y++) for (let x = 8; x < 40; x++) if ((x + y) % 3 === 0) P(c, x, y, '#0c0808');
  });
}
function priestFace(o = {}) {
  return SPR('prF' + (o.blink || 0), 48, 48, c => {
    const sk = '#d8ac84', sk2 = '#a87c5c';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#1c1c20'); R(c, 21, 37, 6, 4, '#f4f0e8');
    R(c, 19, 30, 10, 7, sk2); E(c, 24, 22, 11.5, 13, sk2); E(c, 23.5, 21.5, 11, 12.5, sk);
    PF(c, [12, 18, 13, 10, 20, 6, 28, 6, 35, 10, 36, 18, 32, 12, 24, 10, 16, 12], '#9c9c9c');
    for (const x0 of [17, 27]) { ER(c, x0 + 2, 19, 4, 3.5, '#3c3c3c'); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c1c14'); continue; } R(c, x0 + 1, 18, 3, 2, '#2c2c34'); } L(c, 22, 19, 26, 19, '#3c3c3c');
    L(c, 24, 21, 23, 26, sk2); L(c, 20, 31, 28, 31, '#7c4c3c'); L(c, 16, 26, 18, 30, sk2); L(c, 32, 26, 30, 30, sk2);
  });
}
const PORTRAITS = {
  lopez: p => withMouth('pmlp', lopezFace({ blink: p.blink }), p, 24, 32),
  priest: p => withMouth('pmpr', priestFace({ blink: p.blink }), p, 24, 31),
};
