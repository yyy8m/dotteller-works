/* ================= 記録 #017 津山三十人殺し: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80, col = '#c81818') { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, col); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, col); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }

/* ---- cast ---- */
// 都井睦雄: the black school uniform (stand collar, brass buttons), cropped hair
const MUTSUO = { id: 'mu', spk: 'toi', top: 'uniform', coat: '#1c1c28', coat2: '#12121c', pants: '#1c1c28', shoes: '#2c2420', skin: '#e8c4a0', hair: '#141418', hairStyle: 'short' };
const MUTSUO_KID = { id: 'mk', kid: true, top: 'uniform', coat: '#1c1c28', pants: '#1c1c28', shoes: '#2c2420', skin: '#f0c8a8', hair: '#141418', hairStyle: 'short' };
const POLICE = { id: 'cp', top: 'uniform', coat: '#1c1c2c', pants: '#1c1c2c', shoes: '#141414', skin: '#e0b090', hair: '#141414', hairStyle: 'short', hat: 'police', hatCol: '#1c1c2c', moustache: true };
const DOCTOR = { id: 'dr', top: 'jacket', coat: '#e8e8e0', shirt: '#f0ece4', pants: '#3c3c44', skin: '#e8c4a0', hair: '#5c5c5c', hairStyle: 'side', glasses: true, moustache: true };
const OFFICER = { id: 'of', top: 'uniform', coat: '#5c6c3c', pants: '#4c5c34', shoes: '#2c2018', skin: '#e0b090', hair: '#141414', hairStyle: 'short', hat: 'cap', hatCol: '#4c5c34', moustache: true };
// villagers in kimono (robeFig)
const GRAN = { id: 'gm', robe: '#5c5c6c', robe2: '#44444c', trim: '#d8d0c0', sash: '#2c2c34', hair: '#c8c8c8', female: true, skin: '#e0b894' };
const SISTER = { id: 'si', robe: '#8c5c6c', robe2: '#6c4454', trim: '#e8dcc8', sash: '#c8a040', hair: '#141418', female: true };
const WOMAN = { id: 'wo', robe: '#6c4c7c', robe2: '#4c3460', trim: '#e8dcc8', sash: '#8c2c2c', hair: '#141418', female: true };
const VW = ['#5c6c7c', '#7c5c4c', '#5c7c5c', '#8c7c5c', '#6c5c7c', '#4c5c6c'].map((col, i) => ({ id: 'vw' + i, robe: col, robe2: shadeCol(col, 0.72), trim: '#d8d0c0', sash: '#2c2018', hair: i === 1 ? '#8c8c8c' : '#141418', female: i % 2 === 1 }));
const ELDER = { id: 'el', robe: '#6c6458', robe2: '#4c463c', trim: '#c8c0b0', sash: '#2c2018', hair: '#d8d8d8' };
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '', weapon: o.weapon || null }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function robe(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f, pose: o.pose, arm: o.arm, expr: o.expr, blink: o.blink, k: o.k }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function shade(c, spr, x, y, o = {}) { blit(c, tintSpr(spr, o.col || '#06060a', 'sh' + (o.id || '')), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
// the night outfit drawn over the uniform figure: headband with two flashlights, lamp on the chest, sword at the hip, the shotgun
function gear(c, t, x, y, o = {}) {
  const d = o.flip ? -1 : 1, s = o.s || 1, X = v => x + d * v * s, Y = v => y + v * s;
  R(c, Math.min(X(-6), X(6)), Y(-52), 12 * s + 1, 2 * s, '#e8e4dc'); // hachimaki
  for (const v of [-6, 6]) { R(c, X(v) - s, Y(-54), 3 * s, 4 * s, '#3c3c44'); P(c, X(v + 1), Y(-53), '#fff4c8'); }
  if (o.beams !== false) { beam(c, X(7), Y(-52), o.flip ? Math.PI + 0.06 : -0.06, (o.blen || 90) * s, 0.16, o.ba || 0.28); }
  R(c, X(2) - 2 * s, Y(-34), 5 * s, 6 * s, '#5c4c2c'); R(c, X(2) - s, Y(-33), 3 * s, 4 * s, '#f8e8a0'); glow(c, X(2.5), Y(-31), 16 * s, 12 * s, '#f8d880', 0.3); // lamp
  L(c, X(-6), Y(-20), X(-16), Y(-2), '#2c2420', Math.max(1, s * 2)); L(c, X(-14), Y(-5), X(-22), Y(8), '#c8ccd4', Math.max(1, s)); // sword hilt and blade behind
  if (o.gun !== false) { if (o.aim) { L(c, X(4), Y(-38), X(30), Y(-40), '#3c2c1c', Math.max(1, s * 2)); L(c, X(14), Y(-39), X(34), Y(-41), '#4c4c54', Math.max(1, s)); } else { L(c, X(-2), Y(-24), X(14), Y(-48), '#3c2c1c', Math.max(1, s * 2)); L(c, X(8), Y(-38), X(16), Y(-52), '#4c4c54', Math.max(1, s)); } }
  // gaiters
  R(c, Math.min(X(-5), X(1)), Y(-12), 5 * s, 10 * s, '#5c5c44'); R(c, Math.min(X(1), X(6)), Y(-12), 5 * s, 10 * s, '#5c5c44');
}
function mutsuoNight(c, t, x, y, o = {}) { person(c, MUTSUO, x, y, { k: 'n' + (o.k || ''), f: o.f, flip: o.flip, expr: o.expr || 'angry', s: o.s }); gear(c, t, x, y, o); }

/* ---- places & props ---- */
function vSky(c, o = {}) { VG(c, 0, 0, W, 130, o.night ? ['#0a1028', '#18244a', '#2c3c68'] : o.dawn ? ['#2c2c4c', '#8c6c7c', '#e8b08c'] : o.dusk ? ['#2c2848', '#8c5c5c', '#e89c5c'] : ['#6c9cd0', '#a0c4e4', '#dce8ec']); if (o.night) for (let i = 0; i < 34; i++) P(c, hash(i) * W, hash(i * 3) * 80, i % 5 ? '#8c94b0' : '#e8ecf8'); }
function hills(c, y, o = {}) { const n = o.night; PF(c, [0, y, 40, y - 46, 100, y - 22, 150, y - 60, 220, y - 26, 270, y - 52, 320, y - 34, 320, y, 0, y], n ? '#1c2c3c' : '#3c5c44'); PF(c, [0, y, 30, y - 20, 90, y - 8, 170, y - 30, 230, y - 10, 290, y - 24, 320, y - 12, 320, y, 0, y], n ? '#202e34' : '#2c4c34'); for (let i = 0; i < 24; i++) { const x = hash(i * 5) * W, yy = y - 4 - hash(i * 7) * 14; PF(c, [x - 4, yy + 6, x, yy - 6, x + 4, yy + 6], n ? '#16242a' : '#24402c'); } }
// a thatched farmhouse (kayabuki): x = left, y = ground
function kaya(c, t, x, y, w = 70, o = {}) {
  const n = o.night, h = w * 0.34;
  R(c, x + 4, y - h, w - 8, h, n ? '#3c3830' : '#8c7c5c'); for (let k = x + 8; k < x + w - 6; k += 12) R(c, k, y - h, 2, h, n ? '#24201a' : '#5c4c34');
  PF(c, [x - 6, y - h + 2, x + w * 0.22, y - h - w * 0.42, x + w * 0.78, y - h - w * 0.42, x + w + 6, y - h + 2], n ? '#5c5440' : '#a88c54');
  PF(c, [x + w * 0.22, y - h - w * 0.42, x + w * 0.78, y - h - w * 0.42, x + w * 0.72, y - h - w * 0.36, x + w * 0.28, y - h - w * 0.36], n ? '#3c3628' : '#7c6438');
  for (let k = 0; k < 6; k++) L(c, x - 4 + k * (w + 8) / 6, y - h + 1, x + w * 0.24 + k * w * 0.1, y - h - w * 0.4, n ? '#4c4634' : '#94784a');
  const sx = x + w * 0.3, sw = w * 0.4;
  if (o.lit) { R(c, sx, y - h + 3, sw, h - 5, '#f0d890'); for (let k = 1; k < 4; k++) R(c, sx + k * sw / 4, y - h + 3, 1, h - 5, '#8c6c3c'); glow(c, sx + sw / 2, y - h / 2, w * 0.5, h, '#f8c860', 0.25 * (o.lit === true ? 1 : o.lit)); }
  else R(c, sx, y - h + 3, sw, h - 5, n ? '#1c1a20' : '#d8ccb0');
  if (o.flash) { R(c, sx, y - h + 3, sw, h - 5, '#fff8e0'); glow(c, sx + sw / 2, y - h / 2, w, h * 1.4, '#fff4c8', 0.6); }
  if (o.mark) { E(c, x + w / 2, y - h - w * 0.5, 4, 4, o.mark); }
}
// utility pole with the line running out of frame
function pole(c, x, y, o = {}) { R(c, x - 2, y - 96, 4, 96, '#4c3c2c'); R(c, x - 12, y - 88, 24, 3, '#3c2c1c'); for (const v of [-10, 10]) R(c, x + v - 1, y - 92, 2, 4, '#e8e8e0'); if (o.cut) { L(c, x - 10, y - 92, x - 60, y - 70 + Math.sin(o.t * 2) * 3, '#1c1c1c'); L(c, x + 10, y - 92, x + 26, y - 40 + Math.sin(o.t * 2 + 1) * 4, '#1c1c1c'); } else { L(c, x - 10, y - 92, 0, y - 84, '#1c1c1c'); L(c, x + 10, y - 92, W, y - 86, '#1c1c1c'); } }
function paddy(c, y, o = {}) { R(c, 0, y, W, H - y, o.night ? '#1c2a2c' : '#5c7c44'); for (let r = 0; r < 4; r++) R(c, 0, y + 6 + r * 9, W, 1, o.night ? '#2c3c3c' : '#4c6c3c'); if (o.night) for (let i = 0; i < 30; i++) P(c, hash(i * 11) * W, y + 3 + hash(i * 13) * 30, '#3c5058'); }
function road(c, y, o = {}) { PF(c, [130, y, 190, y, 260, H, 60, H], o.night ? '#1c1a16' : '#a8946c'); }
function room(c, o = {}) { const n = o.night; R(c, 0, 0, W, 150, n ? '#3c3024' : '#8c7454'); for (let x = 0; x < W; x += 40) { R(c, x, 0, 3, 150, n ? '#241c14' : '#5c4430'); R(c, x + 3, 0, 1, 150, n ? '#4c4030' : '#a08868'); } for (let y = 32; y < 150; y += 6) for (let x = (y % 12) ? 8 : 26; x < W; x += 36) R(c, x, y, 6, 1, n ? '#34291e' : '#7c6648'); R(c, 0, 24, W, 4, n ? '#241c14' : '#5c4430'); R(c, 0, 150, W, 90, n ? '#4c4430' : '#b8a878'); for (let x = -20; x < W; x += 60) { R(c, x, 150, 1, 90, n ? '#3c3424' : '#8c7c54'); } R(c, 0, 166, W, 1, n ? '#3c3424' : '#8c7c54'); }
function shoji(c, x, y, w, h, o = {}) { R(c, x, y, w, h, o.lit ? '#f0dca0' : o.night ? '#4c4636' : '#e8e0c8'); for (let k = 1; k < 4; k++) R(c, x + k * w / 4, y, 1, h, '#5c4430'); for (let k = 1; k < 5; k++) R(c, x, y + k * h / 5, w, 1, '#5c4430'); R(c, x, y, w, 2, '#3c2c1c'); R(c, x, y + h - 2, w, 2, '#3c2c1c'); }
function lantern(c, x, y, t, a = 1) { R(c, x - 5, y - 14, 10, 14, '#f0dca0'); R(c, x - 6, y - 15, 12, 2, '#3c2c1c'); R(c, x - 6, y - 1, 12, 2, '#3c2c1c'); glow(c, x, y - 7, 30, 24, '#f8c860', 0.35 * a + 0.04 * Math.sin(t * 6)); }
function gunSpr() { return SPR('gun5', 64, 14, c => { R(c, 0, 5, 20, 6, '#5c3c24'); PF(c, [0, 5, 6, 3, 20, 5, 20, 11, 0, 11], '#6c4c2c'); R(c, 20, 4, 14, 7, '#3c3c44'); R(c, 34, 5, 28, 3, '#4c4c54'); R(c, 34, 8, 22, 2, '#3c3c44'); R(c, 24, 11, 4, 3, '#2c2c34'); P(c, 60, 4, '#8c8c94'); }); }
function bike(c, x, y, f) { for (const v of [-10, 12]) { ER(c, x + v, y - 7, 7, 7, '#1c1c1c'); L(c, x + v, y - 7, x + v + Math.cos(f) * 6, y - 7 + Math.sin(f) * 6, '#5c5c5c'); } L(c, x - 10, y - 7, x, y - 16, '#3c3c44', 2); L(c, x, y - 16, x + 12, y - 7, '#3c3c44', 2); L(c, x, y - 16, x + 8, y - 18, '#3c3c44', 2); }
function watch(c, x, y, t, r = 22) { E(c, x, y, r + 3, r + 3, '#c8a040'); E(c, x, y, r, r, '#f4f0e4'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; P(c, x + Math.cos(a) * (r - 3), y + Math.sin(a) * (r - 3), '#3c3c3c'); } L(c, x, y, x + Math.cos(t * 0.8 - 1.5) * (r - 5), y + Math.sin(t * 0.8 - 1.5) * (r - 5), '#1c1c1c'); L(c, x, y, x + Math.cos(t * 0.07) * (r - 10), y + Math.sin(t * 0.07) * (r - 10), '#1c1c1c', 2); R(c, x - 2, y - r - 7, 4, 5, '#c8a040'); }
function letter(c, x, y, k = 1, o = {}) { if (k <= 0) return; c.save(); c.globalAlpha = k; R(c, x, y, o.w || 46, o.h || 58, '#f0ead8'); for (let r = 0; r < 7; r++) for (let col = 0; col < 5; col++) R(c, x + (o.w || 46) - 8 - col * 8, y + 6 + r * 7, 1, 4, '#3c3c4c'); if (o.title) TX(c, o.title, x + 4, y + (o.h || 58) - 20, '#8c1c1c', 16, null); c.restore(); }
function ihai(c, x, y, k = 1) { if (k <= 0) return; c.save(); c.globalAlpha = k; R(c, x - 7, y - 4, 14, 4, '#2c1c10'); R(c, x - 5, y - 40, 10, 36, '#1c1410'); R(c, x - 4, y - 38, 8, 32, '#2c2018'); for (let r = 0; r < 4; r++) R(c, x - 1, y - 34 + r * 7, 2, 4, '#c8a040'); E(c, x, y - 42, 6, 3, '#1c1410'); c.restore(); }
function shimmer(c, t, n = 30) { for (let i = 0; i < n; i++) { const u = fr(t * 0.15 + hash(i)); P(c, hash(i * 3) * W, H - u * H, DA('#c8c8e8', 0.4 * (1 - u))); } }

/* ---- portrait (48x48): 都井睦雄 — cropped hair, black stand collar; o.night adds the headband lights ---- */
function toiFace(o = {}) {
  return SPR('toiF' + (o.blink || 0) + (o.night ? 'n' : '') + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.dark ? '#a88c74' : '#e8c4a0', sk2 = o.dark ? '#5c4c40' : '#b8906c';
    PF(c, [2, 48, 8, 36, 40, 36, 46, 48], '#14141c'); R(c, 15, 34, 18, 5, '#1c1c28'); R(c, 17, 35, 14, 2, '#2c2c3c'); for (const yy of [41, 46]) R(c, 23, yy, 2, 2, '#c8a040');
    R(c, 19, 29, 10, 7, sk2); E(c, 24, 21, 10.5, 13, sk2); E(c, 23.5, 20.5, 10, 12.5, sk); E(c, 24, 27, 7, 4, sk); R(c, 14, 24, 2, 4, sk2); R(c, 32, 24, 2, 4, sk2); // hollow cheeks
    PF(c, [13, 16, 14, 8, 22, 6, 32, 7, 35, 12, 35, 17, 32, 11, 22, 10, 16, 12], '#141418'); for (let x = 14; x < 35; x += 2) P(c, x, 9 + (x % 3), '#2c2c34');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 19, 4, 2, o.dark ? '#e8e0d0' : '#ffffff'); R(c, x0 + 1, 19, 2, 2, '#141418'); }
    L(c, 16, 17, 21, 18, '#141418'); L(c, 27, 18, 32, 17, '#141418'); L(c, 23, 21, 22, 25, sk2); R(c, 20, 29, 8, 1, '#7c3c34');
    if (o.night) { R(c, 11, 11, 26, 3, '#e8e4dc'); R(c, 8, 9, 5, 6, '#3c3c44'); R(c, 35, 9, 5, 6, '#3c3c44'); P(c, 9, 11, '#fff4c8'); P(c, 38, 11, '#fff4c8'); }
    if (o.dark) for (let y = 2; y < 15; y++) for (let x = 8; x < 40; x++) if ((x + y) % 3 === 0) P(c, x, y, '#0c0808');
  });
}
const PORTRAITS = { toi: p => withMouth('pmtoi', toiFace({ blink: p.blink, night: true, dark: true }), p, 24, 30) };
