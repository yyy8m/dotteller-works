/* ================= 都市伝説 #001 口裂け女: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
// a school kid with a randoseru (backpack) drawn behind
function kid(c, st, x, y, o = {}) { const d = o.flip ? 1 : -1, s = o.s || 1, bx = d < 0 ? x - 10 * s : x + 2 * s; R(c, bx, y - 22 * s, 8 * s, 10 * s, st.bag || '#1c1c24'); R(c, bx, y - 22 * s, 8 * s, 2 * s, shadeCol(st.bag || '#1c1c24', 1.5)); person(c, st, x, y, o); }

/* ---- cast (1979) ---- */
const KIDS = [['#5c8cc8', '#2c2c3c', '#1c1c24'], ['#e86c6c', '#3c3c5c', '#c81c2c'], ['#e8c84c', '#2c3c2c', '#1c1c24'], ['#8cc86c', '#3c3c44', '#c81c2c'], ['#c88cc8', '#2c2c3c', '#c81c2c'], ['#6cb8c8', '#3c3c44', '#1c1c24']]
  .map(([top, pants, bag], i) => ({ id: 'kd' + i, kid: true, top: i % 2 ? 'dress' : 'tee', coat: top, pants, shoes: '#3c2c24', skin: ['#f0c8a8', '#ecc4a0', '#f4d0b0'][i % 3], hair: '#141418', hairStyle: i % 2 ? 'long' : 'short', bag }));
const BOY = KIDS[0];
const TEACH = { id: 'tc', top: 'jacket', coat: '#5c5c54', shirt: '#e8e4dc', tie: '#2c3c6c', pants: '#3c3c44', skin: '#e8c4a0', hair: '#2c2420', hairStyle: 'side', glasses: true };
const POLICE = { id: 'po', top: 'uniform', coat: '#2c3c5c', pants: '#24304c', shoes: '#141414', skin: '#e0b090', hair: '#141414', hairStyle: 'short', hat: 'police', hatCol: '#24304c' };
const MOM = { id: 'mm', top: 'sweater', coat: '#c8a080', skin: '#ecc8a4', hair: '#2c2018', hairStyle: 'curly' };

/* ---- the woman: tall (34x72), long beige coat, long black hair, a white mask; o.mask false shows the face shadowed; anchor feet (17, 71) ---- */
function womanSpr(o = {}) {
  const f = o.f == null ? -1 : o.f, k = 'wm' + f + (o.mask === false ? 'n' : '') + (o.arm || '') + (o.coat || '') + (o.dark ? 'd' : '');
  return SPR(k, 34, 72, c => {
    const coat = o.coat || '#b8a07c', coat2 = shadeCol(coat, 0.75), hair = '#0c0c10', sk = o.dark ? '#a89080' : '#ecd8c8', sw = f < 0 ? 0 : [0, 2, 0, -2][f & 3];
    R(c, 12 + sw, 66, 4, 5, '#2c2420'); R(c, 18 - sw, 66, 4, 5, '#2c2420');
    PF(c, [10, 22, 24, 22, 27, 67, 7, 67], coat); PF(c, [17, 22, 24, 22, 27, 67, 17, 67], coat2); R(c, 9, 40, 18, 2, coat2); L(c, 17, 24, 17, 66, shadeCol(coat, 0.6));
    for (const y of [28, 34, 46]) P(c, 15, y, '#5c4c34');
    // arms
    if (o.arm === 'mask') { L(c, 22, 24, 25, 16, coat2, 3); E(c, 24, 14, 2, 2, sk); } else if (o.arm === 'scissors') { L(c, 22, 24, 30, 30, coat2, 3); E(c, 30, 31, 2, 2, sk); L(c, 30, 30, 33, 20, '#c8ccd4', 2); L(c, 30, 30, 34, 22, '#c8ccd4'); ER(c, 28, 33, 2, 2, '#3c3c44'); } else { L(c, 23, 24, 25, 44, coat2, 3); E(c, 25, 45, 2, 2, sk); }
    L(c, 11, 24, 9, 44, coat, 3);
    // head, long hair down the back
    PF(c, [9, 8, 17, 2, 25, 8, 26, 34, 21, 30, 13, 30, 8, 36], hair);
    E(c, 17, 13, 6, 7, sk); R(c, 14, 19, 6, 3, shadeCol(sk, 0.85));
    PF(c, [10, 12, 13, 5, 21, 4, 24, 10, 22, 9, 15, 8], hair);
    R(c, 14, 11, 2, 1, '#141414'); R(c, 19, 11, 2, 1, '#141414');
    if (o.mask !== false) { R(c, 12, 14, 11, 6, '#f8f8f4'); R(c, 12, 14, 11, 1, '#d8d8d4'); L(c, 12, 15, 10, 13, '#e8e8e4'); L(c, 22, 15, 24, 13, '#e8e8e4'); }
    else { L(c, 12, 16, 23, 16, '#5c1c1c', 1); P(c, 11, 15, '#5c1c1c'); P(c, 24, 15, '#5c1c1c'); }
  });
}
function woman(c, x, y, o = {}) { blit(c, womanSpr(o), x, y, 17, 71, { flip: !!o.flip, s: o.s || 1 }); }
function womanShade(c, x, y, o = {}) { blit(c, tintSpr(womanSpr(o), o.col || '#0a0810', 'wsh' + (o.f == null ? -1 : o.f) + (o.arm || '')), x, y, 17, 71, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- places & props ---- */
function duskSky(c, o = {}) { VG(c, 0, 0, W, 130, o.night ? ['#0a0c20', '#1c2040', '#3c3050'] : ['#3c2c58', '#a8546c', '#f0965c']); if (o.night) for (let i = 0; i < 20; i++) P(c, hash(i) * W, hash(i * 3) * 50, '#a8a8c8'); }
// a 1970s residential lane: block walls, tiled-roof houses, utility poles and wires; light 0..1 streetlights on
function lane(c, t, o = {}) {
  duskSky(c, o); const n = o.night;
  for (let i = 0; i < 5; i++) { const x = i * 70 - 10 + (o.ox || 0) % 70; R(c, x, 70, 56, 52, n ? '#3c3840' : '#8c7c6c'); PF(c, [x - 6, 72, x + 28, 52, x + 62, 72], n ? '#1c1c2c' : '#3c3c4c'); R(c, x + 10, 84, 14, 12, (i + Math.floor((o.ox || 0) / 70)) % 2 ? (n ? '#f8d880' : '#6c7c8c') : (n ? '#2c2c34' : '#8c9cac')); if (n && (i % 2)) glow(c, x + 17, 90, 16, 10, '#f8d880', 0.2); }
  R(c, 0, 108, W, 30, n ? '#5c5c64' : '#a8a49c'); for (let x = 0; x < W; x += 16) for (let r = 0; r < 3; r++) R(c, x + (r % 2) * 8, 108 + r * 10, 1, 10, n ? '#4c4c54' : '#8c8880');
  for (let r = 1; r < 3; r++) R(c, 0, 108 + r * 10, W, 1, n ? '#4c4c54' : '#8c8880');
  R(c, 0, 138, W, 50, n ? '#3c3c40' : '#7c7870'); R(c, 0, 138, W, 2, n ? '#4c4c54' : '#8c8880');
  for (const px of (o.poles || [60, 240])) { R(c, px - 2, 40, 4, 112, n ? '#2c2420' : '#5c4c3c'); R(c, px - 10, 46, 20, 3, '#3c2c1c'); if (o.light != null) { const on = o.light > (px / W) * 0.8; R(c, px + 2, 66, 10, 3, '#3c3c3c'); if (on) { E(c, px + 11, 70, 3, 2, '#fff8d8'); glow(c, px + 11, 100, 40, 60, '#f8f0c8', 0.18); } } }
  L(c, 0, 50, W, 46, '#1c1c1c'); L(c, 0, 56, W, 53, '#1c1c1c');
}
function classroom(c, t, o = {}) { R(c, 0, 0, W, H, '#c8b494'); R(c, 0, 0, W, 30, '#a89474'); R(c, 40, 34, 160, 56, '#2c4c3c'); R(c, 38, 32, 164, 2, '#8c6c4c'); R(c, 38, 90, 164, 4, '#8c6c4c'); for (let i = 0; i < 3; i++) { R(c, 230 + i * 30, 36, 24, 50, '#c8dce8'); R(c, 241 + i * 30, 36, 2, 50, '#8c8c8c'); } R(c, 0, 128, W, 60, '#a8845c'); for (let x = 0; x < W; x += 24) R(c, x, 128, 1, 60, '#8c6c4c'); if (o.text) TX(c, o.text, 60, 50, '#f4f4e8', 16, null); }
function desk(c, x, y) { R(c, x - 14, y - 22, 28, 4, '#c89c64'); R(c, x - 12, y - 18, 2, 18, '#5c5c5c'); R(c, x + 10, y - 18, 2, 18, '#5c5c5c'); }
function whisper(c, t, x, y, i = 0) { const ph = fr(t * 0.7 + i * 0.37); c.save(); c.globalAlpha = 1 - ph; E(c, x, y - ph * 16, 8, 6, '#f4f4f4'); PF(c, [x - 3, y + 4 - ph * 16, x - 6, y + 9 - ph * 16, x + 1, y + 5 - ph * 16], '#f4f4f4'); TX(c, '…', x - 6, y - 10 - ph * 16, '#3c3c3c', 16, null); c.restore(); }
function candy(c, x, y, s = 1) { E(c, x, y, 5 * s, 5 * s, '#e8a03c'); E(c, x - 1, y - 1, 3 * s, 3 * s, '#f8c860'); L(c, x, y + 4 * s, x, y + 14 * s, '#f4f0e8', Math.max(1, s)); }
const JP = [[227, 20], [245, 28], [239, 44], [221, 48], [212, 62], [203, 76], [188, 87], [171, 94], [154, 99], [137, 105], [120, 110], [110, 116], [105, 107], [117, 100], [132, 94], [149, 88], [166, 81], [183, 74], [197, 63], [208, 47], [218, 32]];
const KYU = [[96, 118], [112, 116], [114, 128], [106, 137], [94, 132], [92, 123]];
function japanMap(c) { R(c, 0, 0, W, H, '#0c1c30'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#10243a'); c.save(); c.translate(-20, 18); PF(c, JP.flat(), '#a8a07c'); PF(c, KYU.flat(), '#a8a07c'); PF(c, [219, 9, 250, 8, 257, 22, 232, 28], '#a8a07c'); PF(c, [128, 105, 148, 104, 142, 112, 128, 112], '#a8a07c'); c.restore(); }

/* ---- portraits (48x48) ---- */
function kuchiFace(o = {}) { // masked: only the eyes; o.open: the mask off — a wide red slit to the ears (mid-video only)
  return SPR('kuF' + (o.blink || 0) + (o.open ? 'o' : '') + (o.smile ? 's' : ''), 48, 48, c => {
    const sk = '#ecdccc', sk2 = '#b8a494';
    PF(c, [2, 48, 6, 36, 42, 36, 46, 48], '#b8a07c'); PF(c, [18, 36, 24, 44, 30, 36], '#8c7c5c');
    PF(c, [6, 48, 6, 14, 12, 4, 24, 1, 36, 4, 42, 14, 42, 48, 36, 48, 34, 24, 14, 24, 12, 48], '#0c0c10');
    R(c, 19, 30, 10, 7, sk2); E(c, 24, 21, 10, 13, sk2); E(c, 23.5, 20.5, 9.5, 12.5, sk);
    PF(c, [13, 16, 15, 7, 24, 4, 33, 7, 35, 16, 31, 10, 24, 9, 17, 11], '#0c0c10');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 18, x0 + 4, 18, '#2c2028'); continue; } R(c, x0, 17, 4, 2, '#f8f8f0'); R(c, x0 + 1, 17, 2, 2, '#141018'); }
    L(c, 16, 15, 21, 15, '#1c1418'); L(c, 27, 15, 32, 15, '#1c1418');
    if (!o.open) { R(c, 14, 21, 20, 11, '#f8f8f4'); R(c, 14, 21, 20, 1, '#d8d8d4'); for (let k = 0; k < 3; k++) R(c, 15, 24 + k * 3, 18, 1, '#e4e4e0'); L(c, 14, 22, 11, 19, '#e8e8e4'); L(c, 33, 22, 36, 19, '#e8e8e4'); }
    else { L(c, 23, 21, 23, 24, sk2); PF(c, [12, 24, 18, 25, 24, 26, 30, 25, 36, 24, 30, 28, 24, 30, 18, 28], o.smile ? '#3c0c10' : '#5c1018'); L(c, 12, 24, 36, 24, '#8c1c24'); if (o.smile) for (let i = 0; i < 6; i++) R(c, 16 + i * 3, 25, 2, 2, '#e8e4d8'); L(c, 11, 23, 13, 25, '#8c1c24'); L(c, 37, 23, 35, 25, '#8c1c24'); }
  });
}
const PORTRAITS = { kuchi: p => kuchiFace({ blink: p.blink }) }; // the mask hides the mouth, so it does not move
