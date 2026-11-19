/* ================= 文庫 #010 鏡地獄: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function robe(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f, pose: o.pose, arm: o.arm, expr: o.expr, blink: o.blink, k: o.k }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- cast (Taisho-era) ---- */
const KARE = { id: 'ka', spk: 'kare', top: 'jacket', coat: '#2c2c3c', shirt: '#f0ece4', tie: '#5c1c2c', pants: '#24242c', shoes: '#141414', skin: '#e8ccb0', hair: '#141418', hairStyle: 'side' };
const KARE_KID = { id: 'kk', kid: true, top: 'uniform', coat: '#1c1c28', pants: '#1c1c28', skin: '#f0d0b0', hair: '#141418', hairStyle: 'short' };
const KAY = { id: 'ky', top: 'jacket', coat: '#5c4c3c', shirt: '#f0ece4', tie: '#2c3c5c', pants: '#3c3428', shoes: '#2c2018', skin: '#e8c4a0', hair: '#2c2420', hairStyle: 'short', glasses: true };
const KAY_KID = { id: 'kyk', kid: true, top: 'uniform', coat: '#1c1c28', pants: '#1c1c28', skin: '#ecc4a0', hair: '#2c2420', hairStyle: 'short' };
const MAID = { id: 'md', robe: '#8c5c6c', robe2: '#6c4454', trim: '#f0e8dc', sash: '#c8a040', hair: '#141418', female: true };
const SERV = ['#5c6c7c', '#6c5c4c', '#4c5c4c'].map((col, i) => ({ id: 'sv' + i, robe: col, robe2: shadeCol(col, 0.72), trim: '#e8e0d0', sash: '#2c2018', hair: i === 1 ? '#8c8c8c' : '#141418', female: i === 0 }));
const TECH = { id: 'te', top: 'shirt', coat: '#c8c0b0', pants: '#4c4c44', skin: '#e0b894', hair: '#2c2420', hairStyle: 'short', moustache: true };

/* ---- places & props ---- */
function lab(c, t, o = {}) { const d = o.dark; R(c, 0, 0, W, H, d ? '#1c1814' : '#5c4c3c'); for (let x = 0; x < W; x += 24) R(c, x, 0, 2, 150, d ? '#141008' : '#4c3c2c'); R(c, 0, 26, W, 3, d ? '#141008' : '#3c2c1c'); R(c, 0, 150, W, 40, d ? '#2c241c' : '#7c6448'); for (let x = 0; x < W; x += 30) R(c, x, 150, 1, 40, d ? '#1c1810' : '#6c5438'); if (o.shelves !== false) { R(c, 220, 50, 90, 4, '#3c2c1c'); R(c, 220, 86, 90, 4, '#3c2c1c'); for (let i = 0; i < 6; i++) { E(c, 230 + i * 14, 44, 5, 6, ['#a8c8d8', '#c8d8e8', '#8cacc8'][i % 3]); R(c, 228 + i * 14, 72, 6, 14, '#5c5c64'); E(c, 231 + i * 14, 72, 4, 3, '#a8c8d8'); } } }
function mirrorPane(c, x, y, w, h, o = {}) { R(c, x - 2, y - 2, w + 4, h + 4, o.frame || '#8c7c5c'); VG(c, x, y, w, h, o.dark ? ['#2c3440', '#4c5c6c'] : ['#a8c0d0', '#e0ecf4']); L(c, x + w * 0.2, y + 4, x + w * 0.05, y + h * 0.4, '#ffffff'); L(c, x + w * 0.3, y + 4, x + w * 0.12, y + h * 0.45, DA('#ffffff', 0.5)); }
function trunk(c, x, y, open = 0) { R(c, x, y - 30, 70, 30, '#6c4c2c'); for (let k = 0; k < 3; k++) R(c, x + 4 + k * 22, y - 30, 2, 30, '#4c3420'); if (open) { PF(c, [x, y - 30, x + 70, y - 30, x + 76, y - 48, x + 6, y - 48], '#7c5c3c'); } else R(c, x - 2, y - 36, 74, 8, '#7c5c3c'); }
function telescope(c, x, y, ang = -0.4) { L(c, x, y, x + Math.cos(ang) * 40, y + Math.sin(ang) * 40, '#8c7c5c', 5); L(c, x - 6, y + 2, x - 12, y + 24, '#3c3c3c', 2); L(c, x + 2, y + 2, x + 8, y + 24, '#3c3c3c', 2); }
function sphere(c, t, x, y, r, o = {}) { E(c, x, y + r * 0.9, r * 0.9, r * 0.15, DA('#000000', 0.3)); E(c, x, y, r, r, o.cloth ? '#a89c84' : '#c8d8e4'); if (o.cloth) { for (let k = -2; k <= 2; k++) ER(c, x, y, r * Math.abs(Math.cos(t * 0.8 + k * 0.6)) + 0.1, r, '#8c806c'); L(c, x - r, y, x + r, y, '#8c806c'); } else { E(c, x - r * 0.35, y - r * 0.35, r * 0.25, r * 0.18, '#f8fcff'); } }
function shards(c, x, y, n, k, seed = 1) { for (let i = 0; i < n; i++) { const a = hash(seed + i) * TAU, d = k * (10 + hash(seed * 3 + i) * 60); PF(c, [x + Math.cos(a) * d, y + Math.sin(a) * d * 0.6 - 4, x + Math.cos(a) * d + 4, y + Math.sin(a) * d * 0.6, x + Math.cos(a) * d - 2, y + Math.sin(a) * d * 0.6 + 3], i % 2 ? '#c8dce8' : '#e8f4fc'); } }
// infinite mirror corridor: nested frames with a figure in each
function mirrorRoom(c, t, o = {}) { R(c, 0, 0, W, H, '#0c1018'); for (let i = 7; i >= 0; i--) { const k = Math.pow(0.78, i), w = 300 * k, h = 160 * k, x = 160 - w / 2 + Math.sin(t * 0.9 + i * 0.7) * i * 2.5, y = 92 - h / 2 + Math.cos(t * 0.7 + i) * i; R(c, x, y, w, h, i % 2 ? '#2c3848' : '#3c4858'); R(c, x + 2, y + 2, w - 4, h - 4, i % 2 ? '#1c2838' : '#24303c'); if (o.fig !== false) { c.save(); c.globalAlpha = 0.9 - i * 0.08; blit(c, modFig(o.st || KARE, { k: 'mr' + i }), 160 + (i % 2 ? -1 : 1) * 2 * i, y + h - 4, FIG_AX2, FIG_AY2, { s: Math.max(0.2, k * 1.2), flip: i % 2 === 1 }); c.restore(); } } if (o.candle) { for (let i = 0; i < 6; i++) { const k = Math.pow(0.78, i); glow(c, 160 + 18 * k + Math.sin(t * 0.9 + i * 0.7) * i * 2.5, 92 + 40 * k, 30 * k, 20 * k, '#f8d880', 0.25 + 0.15 * Math.sin(t * 7 + i)); } } }

/* ---- portraits (48x48) ---- */
function kareFace(o = {}) { // thin, pale, intense; o.mad: slack face, wild hair, mouth open
  return SPR('kaF' + (o.blink || 0) + (o.mad ? 'm' : '') + (o.lips ? 'l' : '') + (o.big ? 'b' : ''), 48, 48, c => {
    const sk = o.mad ? '#d8c4b0' : '#e8ccb0', sk2 = '#b89c84';
    PF(c, [2, 48, 8, 36, 40, 36, 46, 48], '#2c2c3c'); PF(c, [18, 36, 24, 44, 30, 36], '#f0ece4'); L(c, 24, 38, 24, 46, '#5c1c2c', 2);
    R(c, 19, 29, 10, 8, sk2); E(c, 24, 21, 10, 13, sk2); E(c, 23.5, 20.5, 9.5, 12.5, sk); R(c, 14, 24, 2, 5, sk2); R(c, 32, 24, 2, 5, sk2);
    if (o.mad) { for (let i = 0; i < 14; i++) { const a = -Math.PI * (0.1 + i / 16); L(c, 24, 12, 24 + Math.cos(a) * (14 + (i % 3) * 4), 12 + Math.sin(a) * (10 + (i % 4) * 3), '#141418', 2); } }
    else PF(c, [13, 16, 14, 7, 22, 4, 32, 6, 35, 12, 35, 16, 32, 10, 20, 9], '#141418');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 19, 4, 3, '#f8f4ec'); R(c, x0 + (o.mad ? 2 : 1), 19, 2, 2, '#141418'); if (o.mad) { P(c, x0, 21, '#c83c3c'); P(c, x0 + 3, 19, '#c83c3c'); } }
    if (!o.mad) { L(c, 16, 17, 21, 16, '#141418'); L(c, 27, 16, 32, 17, '#141418'); } else { L(c, 16, 16, 21, 17, '#141418'); L(c, 27, 17, 32, 16, '#141418'); }
    L(c, 24, 21, 23, 25, sk2);
    if (o.mad) { E(c, 24, 30, 4, 3, '#3c1c1c'); R(c, 21, 28, 6, 1, '#e8e4dc'); } else if (o.lips) { R(c, 20, 28, 8, 3, '#c82c3c'); R(c, 21, 29, 6, 1, '#f8f0e8'); } else R(c, 21, 29, 6, 1, '#8c4c3c');
  });
}
function kidFace(o = {}) { // K as a schoolboy looking into the concave mirror (pimples — kept small and mild)
  return SPR('kyF' + (o.big ? 'b' : ''), 48, 48, c => {
    PF(c, [2, 48, 8, 36, 40, 36, 46, 48], '#1c1c28'); R(c, 16, 35, 16, 4, '#2c2c3c');
    R(c, 19, 29, 10, 8, '#c8a080'); E(c, 24, 21, 11, 13, '#c8a080'); E(c, 23.5, 20.5, 10.5, 12.5, '#ecc4a0');
    PF(c, [12, 16, 14, 7, 22, 4, 32, 6, 36, 14, 34, 16, 31, 10, 20, 9], '#2c2420');
    for (const x0 of [16, 27]) { R(c, x0 - 1, 17, 7, 6, '#1c1c1c'); R(c, x0, 18, 5, 4, '#c8d4dc'); R(c, x0 + 2, 19, 2, 2, '#141418'); } L(c, 22, 20, 26, 20, '#1c1c1c');
    for (let i = 0; i < (o.big ? 8 : 5); i++) { const x = 15 + hash(i) * 18, y = 24 + hash(i * 3) * 6; E(c, x, y, o.big ? 1.5 : 1, o.big ? 1.5 : 1, '#e09080'); P(c, x, y, '#f0c0a8'); }
    E(c, 24, 30, 2.5, 1.5, '#8c4c3c');
  });
}
function maidFace(o = {}) { return SPR('mdF' + (o.blink || 0), 48, 48, c => { PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#8c5c6c'); PF(c, [18, 37, 24, 44, 30, 37], '#f0e8dc'); R(c, 19, 30, 10, 8, '#c8a080'); E(c, 24, 21, 11, 12.5, '#c8a080'); E(c, 23.5, 20.5, 10.5, 12, '#f0d0b4'); PF(c, [11, 24, 12, 8, 22, 4, 33, 6, 37, 24, 32, 11, 22, 10, 16, 12], '#141418'); E(c, 24, 4, 8, 4, '#141418'); for (const x0 of [18, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 3, 21, '#2c1c14'); continue; } R(c, x0, 20, 3, 2, '#141418'); } L(c, 17, 17, 21, 18, '#2c2020'); L(c, 27, 18, 31, 17, '#2c2020'); R(c, 21, 30, 6, 1, '#8c4c3c'); }); }
const PORTRAITS = { kare: p => withMouth('pmka', kareFace({ blink: p.blink }), p, 24, 29), maid: p => withMouth('pmmd', maidFace({ blink: p.blink }), p, 24, 30) };
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
