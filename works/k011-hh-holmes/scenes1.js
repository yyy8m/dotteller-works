/* ================= 記録 #011 H・H・ホームズ: helpers, cast, places & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function bigFace(c, spr, cx, cy, s, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function softBeam(c, x, y, ang, len, half, a = 0.3, col = '#fff4c8') { const p = (r, k) => [x + Math.cos(ang + k) * r, y + Math.sin(ang + k) * r]; c.save(); c.globalAlpha = a * 0.5; PF(c, [x, y, ...p(len, -half), ...p(len, half)], col); c.globalAlpha = a; PF(c, [x, y, ...p(len * 0.9, -half * 0.5), ...p(len * 0.9, half * 0.5)], col); c.restore(); }
// 1890s people are drawn with suitFig (26x58, anchor 13,57)
function man(c, st, x, y, o = {}) { blit(c, suitFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, 13, 57, { flip: !!o.flip, s: o.s || 1 }); }
function woman(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, 13, 57, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- cast ---- */
const HOLMES = { id: 'hol', spk: 'holmes', coat: '#2c2c34', coat2: '#1c1c24', pants: '#24242c', boots: '#141414', skin: '#e8c4a4', hair: '#5c3c24', hat: 'bowler', hatCol: '#1c1c20', moustache: true };
const PITEZEL = { id: 'pit', coat: '#5c4c3c', coat2: '#4c3c2c', pants: '#3c3428', boots: '#2c2018', skin: '#dcac88', hair: '#8c6c44', hat: 'hunt', hatCol: '#4c3c2c', moustache: true };
const GEYER = { id: 'gey', coat: '#2c3448', coat2: '#1c2438', pants: '#24283c', boots: '#141414', skin: '#e0b898', hair: '#8c8c8c', hat: 'bowler', hatCol: '#141420', moustache: true };
const COPS = [0, 1].map(i => ({ id: 'cop' + i, coat: '#1c2c5c', coat2: '#142048', pants: '#1c2448', boots: '#141414', skin: ['#e8c0a0', '#dcac88'][i], hair: '#3c2818', hat: 'bowler', hatCol: '#1c2c5c', moustache: i === 0 }));
const LADIES = [['#7c2c3c', '#5c1c2c', '#3c2818'], ['#2c4c6c', '#1c3c5c', '#c8a060'], ['#5c4c7c', '#4c3c6c', '#1c1410'], ['#6c5c3c', '#5c4c2c', '#8c5c3c']].map(([r, r2, h], i) => ({ id: 'lady' + i, robe: r, robe2: r2, trim: '#f0e8d8', sash: '#f0e8d8', skin: '#f0c8a8', hair: h, female: true }));
const KIDS = [['#c86c6c', '#3c2818'], ['#6c8cc8', '#8c6c44'], ['#5c7c4c', '#5c3c24']].map(([col, h], i) => ({ id: 'kid' + i, robe: col, robe2: shadeCol(col, 0.8), trim: '#f0e8d8', sash: '#f0e8d8', skin: '#f4d0b0', hair: h, female: i < 2 }));
const CROWD = ['#5c4c3c', '#3c4c5c', '#6c3c3c', '#4c5c4c', '#5c5c6c'].map((col, i) => ({ id: 'cr' + i, coat: col, coat2: shadeCol(col, 0.8), pants: '#2c2c34', boots: '#1c1c1c', skin: ['#e8c0a0', '#f0c8a8', '#dcac88', '#e8c4a4', '#d8a884'][i], hair: '#3c2818', hat: i % 2 ? 'bowler' : 'hunt', hatCol: '#2c2c2c' }));

/* ---- places & props ---- */
function gasSky(c, h = 110, o = {}) { VG(c, 0, 0, W, h, o.night ? ['#06060e', '#141428', '#2c2840'] : o.dusk ? ['#2c2440', '#7c4c4c', '#d8885c'] : ['#7c8ca0', '#a8b4c0', '#d0d4d4']); if (o.smog) for (let i = 0; i < 5; i++) E(c, mod(i * 80 + (o.t || 0) * 4, W + 100) - 50, 30 + i * 10, 60, 10, DA('#8c8c90', 0.3)); }
// the "Castle": a three-storey corner building with bay windows and a turret, 63rd Street
function castle(c, t, x, y, o = {}) {
  const w = 170, h = o.floors === 2 ? 70 : 100, wall = '#7c5c4c', wall2 = '#6c4c3c';
  R(c, x, y - h, w, h, wall); for (let k = y - h; k < y; k += 5) R(c, x, k, w, 1, wall2);
  for (let fl = 0; fl < (o.floors || 3); fl++) for (let i = 0; i < 6; i++) { const wx = x + 10 + i * 27, wy = y - h + 8 + fl * 32; R(c, wx, wy, 14, 20, '#2c2c34'); const lit = o.lit && (hash(i * 7 + fl * 3 + Math.floor(t * 0.5)) > 0.55); R(c, wx + 2, wy + 2, 10, 16, lit ? '#f8d880' : '#3c4458'); if (lit) glow(c, wx + 7, wy + 10, 12, 10, '#f8d880', 0.25); }
  if ((o.floors || 3) > 2) { R(c, x + w - 30, y - h - 24, 30, 24, wall2); PF(c, [x + w - 34, y - h - 24, x + w - 15, y - h - 44, x + w + 4, y - h - 24], '#3c2c24'); }
  R(c, x - 4, y - h - 4, w + 8, 5, '#4c3428'); R(c, x + 4, y - 30, 50, 30, '#5c3c24'); R(c, x + 8, y - 26, 42, 18, '#d8c088'); TX(c, 'DRUGS', x + 10, y - 26, '#5c2c1c', 16, null);
}
function street(c, t, y = 150) { R(c, 0, y, W, H - y, '#5c5850'); for (let x = -mod(t * 0, 30); x < W; x += 30) R(c, x, y, 1, H - y, '#545048'); R(c, 0, y, W, 4, '#8c8478'); for (let i = 0; i < 3; i++) { const x = 30 + i * 120; R(c, x, y - 60, 3, 60, '#2c2c2c'); R(c, x - 5, y - 66, 13, 8, '#2c2c2c'); glow(c, x + 1, y - 62, 14, 10, '#f8e8b0', 0.4); } }
function ferris(c, t, x, y, r = 44) { ER(c, x, y, r, r, '#c8c8d0'); ER(c, x, y, r - 2, r - 2, '#9c9ca8'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + t * 0.15; L(c, x, y, x + Math.cos(a) * r, y + Math.sin(a) * r, '#9c9ca8'); R(c, x + Math.cos(a) * r - 3, y + Math.sin(a) * r, 6, 5, i % 3 ? '#c83c3c' : '#3c5cc8'); } L(c, x - 20, y + r + 30, x, y, '#8c8c94', 2); L(c, x + 20, y + r + 30, x, y, '#8c8c94', 2); }
function newspaper(c, x, y, head, sub, k = 1) { if (k <= 0) return; c.save(); c.globalAlpha = k; R(c, x, y, 150, 104, '#e8e0cc'); R(c, x, y, 150, 3, '#2c2c2c'); TX(c, 'CHICAGO', x + 6, y + 4, '#2c2c2c', 16, null); R(c, x + 4, y + 24, 142, 1, '#2c2c2c'); TX(c, head, x + 6, y + 28, '#a81c1c', 16, null); if (sub) TX(c, sub, x + 6, y + 50, '#2c2c34', 16, null); for (let i = 0; i < 3; i++) R(c, x + 6, y + 74 + i * 8, 138, 2, '#8c8474'); c.restore(); }
const US = [[20, 60], [60, 40], [130, 36], [180, 40], [230, 30], [270, 26], [300, 40], [292, 64], [276, 92], [262, 118], [250, 132], [210, 128], [170, 136], [130, 128], [90, 120], [56, 110], [30, 92]];
const TOWN = { chicago: [190, 62], detroit: [222, 56], toronto: [244, 46], indy: [206, 80], phila: [266, 74], boston: [290, 50], stlouis: [174, 88] };
function usMap(c) { R(c, 0, 0, W, H, '#0c1828'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#10203a'); PF(c, US.flat(), '#c8b88c'); PF(c, [200, 30, 300, 20, 296, 36, 240, 44], '#a8a07c'); TX(c, 'CANADA', 230, 6, '#8c8470', 16, null); }

/* ---- portraits (48x48) ---- */
// Holmes: centre-parted hair, a big handlebar moustache, blue eyes, high collar; satan = gaunt and shadowed
function holmesFace(o = {}) {
  return SPR('hoF' + (o.blink || 0) + (o.dark ? 'd' : '') + (o.jail ? 'j' : ''), 48, 48, c => {
    const sk = o.dark ? '#8c7060' : '#ecc8a8', sk2 = o.dark ? '#4c3428' : '#b8906c', hc = '#5c3c24';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.jail ? '#8c8478' : '#2c2c34'); PF(c, [18, 36, 24, 42, 30, 36], '#f4f0e8'); R(c, 20, 40, 8, 2, '#f4f0e8'); if (!o.jail) { E(c, 24, 42, 2, 2, '#3c1c2c'); }
    R(c, 19, 30, 10, 7, sk2); E(c, 24, 21, 11, 13, sk2); E(c, 23.5, 20.5, 10.5, 12.5, sk); E(c, 13, 21, 2, 4, sk2); E(c, 35, 21, 2, 4, sk2);
    PF(c, [12, 16, 13, 7, 22, 4, 24, 6, 26, 4, 35, 7, 36, 16, 33, 10, 26, 7, 24, 8, 22, 7, 15, 10], hc); L(c, 24, 4, 24, 8, '#3c2414'); // centre part
    for (const x0 of [17, 27]) { L(c, x0 - 1, 15, x0 + 4, 15, '#3c2414'); if (o.blink === 2) { L(c, x0, 18, x0 + 4, 18, '#2c1c14'); continue; } R(c, x0, 17, 5, 3, o.dark ? '#c8b8a8' : '#f4f0e8'); R(c, x0 + 1, 17, 3, 3, '#3c6c9c'); P(c, x0 + 2, 18, C.k); }
    L(c, 24, 20, 23, 25, sk2); PF(c, [14, 28, 18, 25, 24, 26, 30, 25, 34, 28, 30, 29, 24, 28, 18, 29], '#4c2c1c'); // handlebar moustache
    R(c, 21, 31, 6, 1, '#8c4c3c');
    if (o.dark) for (let y = 2; y < 16; y++) for (let x = 8; x < 40; x++) if ((x + y) % 3 === 0) P(c, x, y, '#0c0808');
  });
}
function daFace(o = {}) {
  return SPR('daF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0b898', sk2 = '#ac8464';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#1c1c24'); PF(c, [18, 36, 24, 44, 30, 36], '#f4f0e8'); R(c, 22, 38, 4, 4, '#2c2c2c');
    R(c, 19, 30, 10, 7, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    PF(c, [12, 20, 12, 12, 18, 6, 30, 6, 36, 12, 36, 20, 33, 13, 24, 10, 15, 13], '#8c8c8c'); E(c, 13, 26, 3, 6, '#9c9c9c'); E(c, 35, 26, 3, 6, '#9c9c9c'); // grey side whiskers
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, 17, '#5c5c5c'); if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 2, '#f4f0e8'); R(c, x0 + 1, 19, 2, 2, C.k); }
    L(c, 24, 22, 23, 26, sk2); R(c, 20, 31, 8, 1, '#7c4c3c');
  });
}
const PORTRAITS = {
  holmes: p => withMouth('pmho', holmesFace({ blink: p.blink }), p, 24, 30),
  da: p => withMouth('pmda', daFace({ blink: p.blink }), p, 24, 31),
};
