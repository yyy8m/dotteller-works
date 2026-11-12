/* ================= 記録 #010 西口彰事件: helpers, cast, places & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function bigFace(c, spr, cx, cy, s, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- people ---- */
const NISHI = { id: 'nsh', top: 'jacket', coat: '#2c2c34', shirt: '#f0ece4', tie: '#5c2c2c', pants: '#24242c', shoes: '#141414', skin: '#dcac88', hair: '#1c1814', hairStyle: 'side', badge: true };
const NISHI_COAT = { ...NISHI, id: 'nshc', top: 'shirt', coat: '#4c4438', hat: 'fedora', hatCol: '#2c2820' };
const MONK = { id: 'mnk', top: 'shirt', coat: '#2c2c2c', pants: '#2c2c2c', skin: '#e0b090', hair: '#1c1814', hairStyle: 'bald' };
const GIRL = { id: 'grl', kid: true, top: 'dress', coat: '#c85c5c', skin: '#f0c8a8', hair: '#1c1814', hairStyle: 'long' };
const MOTHER = { id: 'mth', top: 'dress', coat: '#5c5c6c', skin: '#e8c4a4', hair: '#1c1814', hairStyle: 'long' };
const COPS = [0, 1, 2].map(i => ({ id: 'cp' + i, top: 'uniform', coat: '#2c3448', pants: '#24283c', skin: ['#e0b090', '#e8c0a0', '#dcac88'][i], hair: '#1c1814', hat: 'police', hatCol: '#1c2438' }));
const DETECT = [0, 1].map(i => ({ id: 'dt' + i, top: 'jacket', coat: ['#3c3c34', '#2c3440'][i], shirt: '#e8e4dc', tie: '#2c2c3c', pants: '#2c2c2c', skin: '#e0b090', hair: '#1c1814', hat: 'fedora', hatCol: '#2c2820' }));

/* ---- places & props ---- */
function showaSky(c, h = 110, o = {}) { VG(c, 0, 0, W, h, o.night ? ['#04060e', '#0c1424', '#1c2c44'] : o.dusk ? ['#2c2848', '#8c5c5c', '#e89c5c'] : o.winter ? ['#8c98a8', '#a8b0bc', '#c8ccd0'] : ['#5c94d8', '#94c0e8', '#d8ecf4']); }
function mountains(c, y, col = '#3c5c3c', col2 = '#2c4c2c') { PF(c, [0, y, 50, y - 40, 110, y - 16, 170, y - 52, 240, y - 20, 290, y - 44, 320, y - 30, 320, y, 0, y], col); PF(c, [0, y, 30, y - 18, 90, y - 6, 160, y - 24, 220, y - 4, 280, y - 18, 320, y - 8, 320, y, 0, y], col2); }
// the 1960s Japanese house of the priest: tiled roof, sliding doors, a gate
function japHouse(c, t, o = {}) {
  R(c, 60, 70, 200, 70, '#c8b894'); for (let x = 60; x < 260; x += 20) R(c, x, 70, 2, 70, '#5c4430'); PF(c, [44, 74, 160, 36, 276, 74], '#3c4048'); for (let i = 0; i < 12; i++) L(c, 50 + i * 19, 72, 160, 38, '#2c3038'); R(c, 40, 72, 240, 5, '#2c3038');
  for (let i = 0; i < 4; i++) { R(c, 90 + i * 36, 90, 32, 50, '#e8e0cc'); for (let k = 0; k < 3; k++) R(c, 90 + i * 36, 100 + k * 14, 32, 1, '#8c7c5c'); R(c, 105 + i * 36, 90, 1, 50, '#8c7c5c'); }
  if (o.lit) for (let i = 0; i < 4; i++) glow(c, 106 + i * 36, 115, 20, 24, '#f8d880', 0.3);
  R(c, 0, 140, W, 100, '#8c7c64'); for (let i = 0; i < 20; i++) P(c, hash(i) * W, 144 + hash(i * 3) * 50, '#7c6c54');
  R(c, 20, 96, 8, 50, '#4c3424'); R(c, 292, 96, 8, 50, '#4c3424'); R(c, 14, 92, 20, 6, '#3c2818'); R(c, 286, 92, 20, 6, '#3c2818'); // gate posts
  if (o.pine !== false) { L(c, 300, 140, 296, 60, '#4c3424', 4); for (let k = 0; k < 4; k++) E(c, 286 + k * 8, 58 + k * 10, 16, 6, '#2c4c2c'); }
}
// the lawyer's badge: a sunflower with the scales of justice
function badgeSpr(s = 1) {
  return cached('badge' + s, () => SPR(null, 24 * s, 24 * s, c => { c.scale(s, s); for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; E(c, 12 + Math.cos(a) * 8, 12 + Math.sin(a) * 8, 3, 3, i % 2 ? '#d8b040' : '#f0d060'); } E(c, 12, 12, 6, 6, '#b8902c'); L(c, 8, 10, 16, 10, '#f8e8a0'); L(c, 12, 8, 12, 16, '#f8e8a0'); L(c, 8, 10, 7, 13, '#f8e8a0'); L(c, 16, 10, 17, 13, '#f8e8a0'); P(c, 9, 7, '#ffffff'); }));
}
function wantedPoster(c, x, y, k = 1, o = {}) { if (k <= 0) return; c.save(); c.globalAlpha = k; R(c, x, y, 90, 120, '#f0e8d4'); R(c, x, y, 90, 20, '#c81818'); TX(c, '指名手配', x + 13, y + 2, '#ffffff', 16, null); R(c, x + 15, y + 26, 60, 60, '#b8b0a0'); bigFace(c, nishiFace({ photo: true }), x + 45, y + 56, 1.15, 'wp' + (o.id || '')); TX(c, '西口　彰', x + 13, y + 92, '#141414', 16, null); c.restore(); }
// Japan (rough outline) with named points
const JP = [[227, 20], [245, 28], [239, 44], [221, 48], [212, 62], [203, 76], [188, 87], [171, 94], [154, 99], [137, 105], [120, 110], [110, 116], [105, 107], [117, 100], [132, 94], [149, 88], [166, 81], [183, 74], [197, 63], [208, 47], [218, 32]];
const KYU = [[96, 118], [112, 116], [114, 128], [106, 137], [94, 132], [92, 123]];
const PLACE = { fukuoka: [104, 118], saga: [98, 123], kobe: [141, 95], osaka: [146, 95], kyoto: [148, 90], nagoya: [162, 88], hamamatsu: [172, 90], tokyo: [192, 82], chiba: [198, 84], hokkaido: [232, 32], tochigi: [192, 74], kumamoto: [104, 130] };
function japanMap(c, t) { R(c, 0, 0, W, H, '#0c1c30'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#10243a'); PF(c, JP.flat(), '#a8a07c'); PF(c, KYU.flat(), '#a8a07c'); PF(c, [219, 9, 250, 8, 257, 22, 232, 28], '#a8a07c'); PF(c, [128, 105, 148, 104, 142, 112, 128, 112], '#a8a07c'); }
function pin(c, k, label, col = '#f8d860', dx = 6, dy = -16) { const [x, y] = PLACE[k]; E(c, x, y, 3, 3, '#141414'); E(c, x, y, 2, 2, col); if (label) TX(c, label, x + dx, y + dy, '#f4f0e8', 16, '#000000'); }

/* ---- portraits (48x48) ---- */
// Nishiguchi: slicked-back hair, thin moustache, a confident smile; photo = flat grey "wanted" photo
function nishiFace(o = {}) {
  return SPR('niF' + (o.blink || 0) + (o.photo ? 'p' : '') + (o.dark ? 'd' : '') + (o.smile ? 's' : ''), 48, 48, c => {
    const sk = o.photo ? '#b4aca0' : o.dark ? '#7c6454' : '#dcac88', sk2 = o.photo ? '#8c847c' : o.dark ? '#3c2c24' : '#a87c5c', hc = o.photo ? '#3c3c3c' : '#1c1814';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.photo ? '#5c5c5c' : '#2c2c34'); PF(c, [17, 37, 24, 47, 31, 37], o.photo ? '#d8d4cc' : '#f0ece4'); L(c, 24, 40, 24, 48, o.photo ? '#4c4c4c' : '#5c2c2c', 2);
    if (!o.photo) { for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; E(c, 12 + Math.cos(a) * 3, 42 + Math.sin(a) * 3, 1.5, 1.5, '#f0d060'); } E(c, 12, 42, 2, 2, '#b8902c'); }
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 11.5, 13.5, sk2); E(c, 23.5, 21.5, 11, 13, sk); E(c, 13, 22, 2, 4, sk2); E(c, 35, 22, 2, 4, sk2);
    PF(c, [12, 18, 12, 9, 18, 4, 30, 4, 36, 9, 36, 18, 33, 11, 24, 8, 15, 11], hc); L(c, 15, 8, 33, 7, o.photo ? '#5c5c5c' : '#3c342c'); L(c, 14, 10, 34, 9, o.photo ? '#5c5c5c' : '#3c342c'); // slicked back
    for (const x0 of [17, 27]) { L(c, x0 - 1, 16, x0 + 4, 15, hc); if (o.blink === 2) { L(c, x0, 19, x0 + 4, 19, '#2c1c14'); continue; } R(c, x0, 18, 5, 2, o.photo ? '#d8d4cc' : '#f4f0e8'); R(c, x0 + 2, 18, 2, 2, C.k); }
    L(c, 24, 21, 23, 26, sk2); R(c, 19, 28, 10, 1, hc); // thin moustache
    if (o.smile) { L(c, 19, 31, 22, 32, '#7c4c3c'); L(c, 22, 32, 27, 32, '#7c4c3c'); L(c, 27, 32, 29, 30, '#7c4c3c'); } else R(c, 20, 31, 8, 1, '#7c4c3c');
    if (o.dark) { for (let y = 2; y < 16; y++) for (let x = 8; x < 40; x++) if ((x + y) % 3 === 0) P(c, x, y, '#0c0808'); }
  });
}
// the girl (5th grade): bobbed hair, wide eyes
function girlFace(o = {}) {
  return SPR('gfF' + (o.blink || 0) + (o.wide ? 'w' : ''), 48, 48, c => {
    const sk = '#f4d0b0', sk2 = '#c8a080', hc = '#1c1814';
    PF(c, [4, 48, 10, 38, 38, 38, 44, 48], '#c85c5c'); R(c, 20, 37, 8, 3, '#f4f0e8');
    R(c, 20, 30, 8, 8, sk2); E(c, 24, 23, 11, 12, sk2); E(c, 23.6, 22.6, 10.6, 11.6, sk);
    PF(c, [12, 30, 11, 14, 16, 7, 24, 5, 32, 7, 37, 14, 36, 30, 33, 30, 33, 17, 28, 13, 24, 15, 20, 13, 15, 17, 15, 30], hc); R(c, 15, 13, 18, 3, hc); // bob with bangs
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 4, 21, '#2c1c14'); continue; } R(c, x0, 19, 5, o.wide ? 5 : 4, '#f8f4ec'); R(c, x0 + 1, 19, 3, o.wide ? 5 : 4, '#3c2c1c'); P(c, x0 + 2, 20, C.k); P(c, x0 + 1, 19, '#ffffff'); }
    P(c, 24, 26, sk2); E(c, 18, 27, 2.5, 1.2, '#f4a8a0'); E(c, 30, 27, 2.5, 1.2, '#f4a8a0'); if (o.wide) E(c, 24, 31, 1.8, 2, '#7c2c2c'); else R(c, 22, 31, 4, 1, '#b8605c');
  });
}
// the former senior police official (writer of the quote): grey hair, glasses, dark suit
function officerFace(o = {}) {
  return SPR('ofF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0b898', sk2 = '#ac8464';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#1c2440'); PF(c, [18, 37, 24, 46, 30, 37], '#f0ece4'); L(c, 24, 39, 24, 48, '#2c2c5c', 2);
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    PF(c, [12, 20, 12, 10, 20, 5, 30, 5, 36, 10, 36, 20, 33, 12, 24, 9, 15, 12], '#8c8c8c');
    for (const x0 of [16, 27]) { R(c, x0 - 1, 17, 7, 6, '#2c2c2c'); R(c, x0, 18, 5, 4, '#d8e4ec'); if (o.blink === 2) L(c, x0, 20, x0 + 4, 20, '#2c1c14'); else R(c, x0 + 1, 19, 2, 2, C.k); }
    R(c, 22, 19, 4, 1, '#2c2c2c'); L(c, 24, 23, 23, 27, sk2); R(c, 20, 31, 8, 1, '#7c4c3c');
  });
}
const PORTRAITS = {
  nishi: p => withMouth('pmni', nishiFace({ blink: p.blink, smile: true }), p, 24, 31),
  girl: p => withMouth('pmgf', girlFace({ blink: p.blink, wide: true }), p, 24, 31),
  officer: p => withMouth('pmof', officerFace({ blink: p.blink }), p, 24, 31),
};
