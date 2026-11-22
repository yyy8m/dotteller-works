/* ================= 文庫 #012 高瀬舟: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function robe(c, st, x, y, o = {}) { blit(c, robeFig(st, { f: o.f, pose: o.pose, arm: o.arm, expr: o.expr, blink: o.blink, k: o.k }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1, rot: o.rot }); }

/* ---- cast ---- */
const KISUKE = { id: 'ks', spk: 'kisuke', robe: '#5c5c64', robe2: '#4c4c54', trim: '#8c8c94', sash: '#2c2c34', skin: '#e0ccb8', skin2: '#c0a890', hair: '#141418', hat: 'bun' };
const SHOBE = { id: 'sb', spk: 'shobe', robe: '#1c1c24', robe2: '#2c2c3c', trim: '#c8c0b0', sash: '#5c4c3c', skin: '#e0b890', skin2: '#c09870', hair: '#2c2420', hat: 'bun' };
const OTOUTO = { id: 'ot', spk: 'otouto', robe: '#6c6c74', robe2: '#5c5c64', trim: '#8c8c94', sash: '#3c3c44', skin: '#e4d4c8', skin2: '#c8b4a8', hair: '#141418', hat: 'bun' };
const SENDO = { id: 'sd', robe: '#3c4c5c', robe2: '#2c3c4c', trim: '#a8a8a0', sash: '#1c1c24', skin: '#c89c74', skin2: '#a87c58', hair: '#1c1814', hat: 'cap', hatCol: '#c8b888' };
const RELATIVE = { id: 'rl', robe: '#7c5c5c', robe2: '#6c4c4c', trim: '#c8b8a8', sash: '#3c2c2c', hair: '#141418', female: true };
const CRIMINAL = { id: 'cr', robe: '#6c6c64', robe2: '#5c5c54', trim: '#a8a8a0', sash: '#2c2c2c', hair: '#141418', hat: 'bun' };
const WIFE = { id: 'wf', robe: '#a86c7c', robe2: '#8c5c6c', trim: '#e8d8c8', sash: '#c8a848', hair: '#141418', female: true };
const MOTHER = { id: 'mo', robe: '#6c5c4c', robe2: '#5c4c3c', trim: '#c8b8a8', sash: '#3c3028', hair: '#c8c8c0', female: true, old: true };
const KID_K = { id: 'kk', robe: '#5c5c64', robe2: '#4c4c54', trim: '#8c8c94', sash: '#2c2c34', hair: '#141418', kid: true };
const KID_O = { id: 'ko', robe: '#6c6c74', robe2: '#5c5c64', trim: '#8c8c94', sash: '#3c3c44', hair: '#141418', kid: true };
const BUGYO = { id: 'bg', robe: '#2c2c4c', robe2: '#1c1c3c', trim: '#c8c0b0', sash: '#8c6c3c', skin: '#e0b890', hair: '#2c2420', hat: 'bun' };
const KIDS = ['#c87c3c', '#5c8cc8', '#c85c7c', '#7cac5c'].map((col, i) => ({ id: 'kd' + i, robe: col, robe2: shadeCol(col, 0.85), trim: '#e8e0d0', sash: '#2c2c34', hair: '#141418', kid: true, female: i % 2 === 0 }));
const BABA = { id: 'bb', robe: '#5c5048', robe2: '#4c4038', trim: '#a89c8c', sash: '#2c2420', hair: '#c8c8c0', female: true, old: true };

/* ---- places & props ---- */
// the Takase river at dusk (o.night: hazy moon), Kyoto houses on both banks, cherry petals (o.petals)
function river(c, t, o = {}) {
  const night = !!o.night;
  VG(c, 0, 0, W, 96, night ? ['#0c0c1c', '#1c1c34', '#2c2c44'] : ['#3c2c4c', '#a85c6c', '#f0a070']);
  if (night) { const mx = 250, my = 40; glow(c, mx, my, 40, 30, '#e8e4d0', 0.25); E(c, mx, my, 10, 10, '#e8e4d0'); c.save(); c.globalAlpha = 0.55; for (let i = 0; i < 3; i++) E(c, ((i * 90 + t * 6) % 360) - 20, 32 + i * 10, 50, 6, '#3c3c54'); c.restore(); }
  for (let i = 0; i < 9; i++) { const x = ((i * 44 - (o.drift || 0) * t) % 396 + 396) % 396 - 40; R(c, x, 74, 38, 22, night ? '#141420' : '#3c2c34'); PF(c, [x - 3, 76, x + 19, 64, x + 41, 76], night ? '#0c0c14' : '#2c2028'); if ((i * 7) % 3 === 0) R(c, x + 14, 84, 8, 6, night ? '#c8a050' : '#f0c870'); }
  R(c, 0, 96, W, 8, night ? '#1c1c1c' : '#5c4c3c');
  VG(c, 0, 104, W, 86, night ? ['#0c0c18', '#06060c'] : ['#5c5c7c', '#3c3c5c']); for (let i = 0; i < 14; i++) { const x = ((i * 31 - t * 18) % 340 + 340) % 340 - 10, y = 112 + (i * 17) % 60; R(c, x, y, 10 + (i % 3) * 6, 1, night ? '#2c2c44' : '#8c8cac'); }
  if (o.petals) for (let i = 0; i < 24; i++) { const u = fr(t * 0.12 + i * 0.37), x = ((i * 53 + t * 20) % 340) - 10, y = u * 170; P(c, x + Math.sin(t * 2 + i) * 4, y, '#f8c8d8'); }
}
// the Takase boat (side view), poled by the boatman; riders: [[st, x, o]]
function boat(c, t, x, y, riders = [], o = {}) {
  const bob = Math.round(Math.sin(t * 1.6) * 1);
  for (const [st, dx, ro] of riders) robe(c, st, x + dx, y - 6 + bob, Object.assign({ pose: 'sit' }, ro || {}));
  PF(c, [x - 70, y - 8 + bob, x + 74, y - 8 + bob, x + 64, y + 4 + bob, x - 60, y + 4 + bob], '#5c4030'); R(c, x - 70, y - 9 + bob, 144, 2, '#7c5c40'); R(c, x - 60, y + 2 + bob, 124, 2, '#3c2818');
  if (o.sendo !== false) { robe(c, SENDO, x + 60, y - 8 + bob, { k: 'sd', arm: 'staff' }); L(c, x + 66, y - 50 + bob, x + 84, y + 30, '#8c6c44', 2); }
  if (o.lamp) { R(c, x - 64, y - 30 + bob, 2, 22, '#3c2c1c'); R(c, x - 68, y - 36 + bob, 10, 8, '#f8d890'); glow(c, x - 63, y - 32 + bob, 24, 20, '#f8d890', 0.3); }
  E(c, x, y + 8, 80, 3, '#0c0c18');
}
function bank(c, t) { river(c, t, { petals: true }); R(c, 0, 128, W, 62, '#8c8478'); for (let x = 0; x < W; x += 24) for (let y = 128; y < 190; y += 12) R(c, x + ((y / 12) & 1) * 12, y, 22, 10, '#a89c8c'); R(c, 0, 126, W, 3, '#5c5448'); R(c, 230, 118, 90, 10, '#6c5038'); for (let x = 236; x < 320; x += 20) R(c, x, 128, 4, 30, '#4c3828'); }
function hut(c, t, o = {}) { R(c, 0, 0, W, H, '#1c1814'); for (let x = 0; x < W; x += 22) R(c, x, 0, 2, 140, '#2c241c'); R(c, 0, 140, W, 50, '#2c2418'); R(c, 230, 40, 50, 100, o.door ? '#a8a090' : '#3c3024'); if (o.door) glow(c, 255, 90, 40, 50, '#c8c0a8', 0.2); }
function futonFlat(c, x, y) { R(c, x, y, 90, 14, '#8c8478'); R(c, x, y, 90, 3, '#a89c8c'); R(c, x + 4, y - 6, 20, 8, '#c8c0b0'); }
function loom(c, x, y, t) { R(c, x, y - 60, 6, 60, '#5c4030'); R(c, x + 74, y - 60, 6, 60, '#5c4030'); R(c, x, y - 62, 80, 5, '#5c4030'); for (let i = 0; i < 14; i++) L(c, x + 8 + i * 5, y - 56, x + 8 + i * 5, y - 14, ['#c83c3c', '#e8c83c', '#3c6cc8'][i % 3]); R(c, x + 4, y - 14 + Math.round(Math.sin(t * 6) * 2), 72, 3, '#8c6c44'); }
function coins(c, x, y, n = 20) { L(c, x - 6, y, x + n * 6 + 6, y, '#5c4c3c', 2); for (let i = 0; i < n; i++) { E(c, x + i * 6, y, 4, 7, '#c8a050'); E(c, x + i * 6 - 1, y - 2, 2, 3, '#e8c878'); R(c, x + i * 6 - 1, y - 1, 2, 2, '#3c2810'); } }
function halo(c, x, y, t, a = 1) { glow(c, x, y - 6, 26, 30, '#f8e8a0', 0.45 * a); for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = 0.4 * a * (0.6 + 0.4 * Math.sin(t * 2 + i)); ER(c, x, y - 14, 10 + i * 5, 4 + i * 2, '#f8e8a0'); c.restore(); } }
function shirasu(c, t) { R(c, 0, 0, W, H, '#3c3428'); R(c, 0, 0, W, 60, '#5c4c3c'); for (let x = 0; x < W; x += 30) R(c, x, 0, 4, 60, '#3c2c20'); R(c, 0, 60, W, 130, '#e8e4dc'); for (let i = 0; i < 60; i++) P(c, (i * 37) % W, 62 + (i * 23) % 120, '#c8c4bc'); R(c, 100, 30, 120, 36, '#2c2420'); }

/* ---- portraits (48x48) ---- */
function kisukeFace(o = {}) { // thin, pale, a gentle smile, eyes with a faint shine
  return SPR('ksF' + (o.blink || 0) + (o.sad ? 's' : ''), 48, 48, c => {
    const sk = '#e4d0bc', sk2 = '#c4ac98'; PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#5c5c64'); PF(c, [18, 38, 24, 44, 30, 38], '#8c8c94'); R(c, 20, 32, 8, 7, sk2);
    E(c, 24, 22, 10, 13, sk2); E(c, 23.5, 21.5, 9.5, 12.5, sk); R(c, 14, 8, 20, 6, '#141418'); R(c, 21, 3, 6, 6, '#141418'); E(c, 12.5, 22, 1.5, 3, sk2); E(c, 35.5, 22, 1.5, 3, sk2);
    L(c, 17, 16, 21, 16, '#2c2420'); L(c, 27, 16, 31, 16, '#2c2420');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c2020'); continue; } R(c, x0, 19, 4, 3, '#141010'); P(c, x0 + 1, 19, '#f8f8f0'); if (!o.sad) P(c, x0 + 3, 21, '#c8c8d8'); }
    L(c, 24, 21, 23, 26, sk2); E(c, 17, 27, 2, 1, '#e8b8a8'); E(c, 31, 27, 2, 1, '#e8b8a8'); if (o.sad) R(c, 21, 30, 6, 1, '#8c5c4c'); else { L(c, 20, 29, 22, 30, '#8c5c4c'); L(c, 22, 30, 26, 30, '#8c5c4c'); L(c, 26, 30, 28, 29, '#8c5c4c'); }
  });
}
function shobeFace(o = {}) { // a middle-aged samurai official: topknot, thick brows, thoughtful
  return SPR('sbF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0b890', sk2 = '#c09870'; PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#1c1c24'); PF(c, [18, 37, 24, 44, 30, 37], '#c8c0b0'); R(c, 19, 31, 10, 7, sk2);
    E(c, 24, 22, 12, 14, sk2); E(c, 23.5, 21.5, 11.5, 13.5, sk); R(c, 13, 7, 22, 4, '#2c2420'); R(c, 16, 9, 16, 3, '#c8a888'); R(c, 21, 2, 6, 5, '#2c2420'); R(c, 23, 0, 2, 3, '#2c2420'); E(c, 11.5, 22, 2, 3, sk2); E(c, 36.5, 22, 2, 3, sk2);
    L(c, 15, 16, 21, 15, '#2c2420', 2); L(c, 27, 15, 33, 16, '#2c2420', 2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#2c2020'); continue; } R(c, x0, 19, 5, 3, '#f0e8dc'); R(c, x0 + 2, 19, 2, 3, '#141010'); L(c, x0, 23, x0 + 5, 23, sk2); }
    L(c, 24, 21, 23, 27, sk2); R(c, 21, 27, 6, 1, sk2); R(c, 20, 31, 8, 1, '#7c4c3c'); L(c, 15, 30, 17, 32, sk2); L(c, 33, 30, 31, 32, sk2);
  });
}
function otoutoFace(o = {}) { // the younger brother: pale with sickness, hollow cheeks; no wound shown (a dark collar and his hand)
  return SPR('otF' + (o.blink || 0) + (o.calm ? 'c' : ''), 48, 48, c => {
    const sk = '#e4d4c8', sk2 = '#c4b0a4'; PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#6c6c74'); R(c, 20, 32, 8, 8, '#3c2c2c');
    E(c, 24, 22, 10, 13, sk2); E(c, 23.5, 21.5, 9.5, 12.5, sk); PF(c, [15, 26, 18, 32, 18, 26], sk2); PF(c, [33, 26, 30, 32, 30, 26], sk2); R(c, 14, 8, 20, 6, '#141418'); R(c, 21, 3, 6, 6, '#141418');
    for (const x0 of [17, 27]) { E(c, x0 + 2, 21, 3.5, 2.5, '#a8949c'); if (o.blink === 2 || o.calm) { L(c, x0, 21, x0 + 4, 21, '#2c2020'); continue; } R(c, x0, 20, 4, 3, '#141010'); P(c, x0 + 1, 20, '#f0f0f0'); }
    L(c, 24, 21, 23, 26, sk2); R(c, 21, 30, 6, 1, '#8c6c6c'); E(c, 34, 36, 5, 4, sk);
  });
}
const PORTRAITS = { shobe: p => withMouth('pmsb', shobeFace({ blink: p.blink }), p, 24, 31), kisuke: p => withMouth('pmks', kisukeFace({ blink: p.blink }), p, 24, 30), otouto: p => withMouth('pmot', otoutoFace({ blink: p.blink }), p, 24, 30) };
