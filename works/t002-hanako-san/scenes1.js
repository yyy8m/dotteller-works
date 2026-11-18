/* ================= 都市伝説 #002 トイレの花子さん: helpers, cast, places, props & portraits ================= */
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

/* ---- cast ---- */
const GIRLS = [['#e8a0b8', '#3c3c5c'], ['#8cc8e8', '#3c3c44'], ['#f8d870', '#5c4c3c'], ['#a8d88c', '#3c3c44'], ['#c8a0e8', '#2c2c3c']]
  .map(([top, pants], i) => ({ id: 'gl' + i, kid: true, top: 'dress', coat: top, pants, shoes: '#f4f4f0', skin: ['#f0c8a8', '#ecc4a0', '#f4d0b0'][i % 3], hair: i === 2 ? '#5c3c24' : '#141418', hairStyle: i % 2 ? 'curly' : 'long', bag: '#c81c2c' }));
const KIDB = { id: 'kb', kid: true, top: 'tee', coat: '#5c8cc8', pants: '#2c2c3c', shoes: '#f4f4f0', skin: '#f0c8a8', hair: '#141418', hairStyle: 'short' };
const TEACH = { id: 'tc', top: 'jacket', coat: '#5c5c54', shirt: '#e8e4dc', tie: '#2c3c6c', pants: '#3c3c44', skin: '#e8c4a0', hair: '#2c2420', hairStyle: 'side', glasses: true };
// 花子さん: a small girl with a bob, white blouse and a red suspender skirt (24x46, feet anchor 12,45)
function hanakoSpr(o = {}) {
  return SPR('hnk' + (o.f == null ? -1 : o.f) + (o.arm || '') + (o.back ? 'b' : '') + (o.face === false ? 'n' : ''), 24, 46, c => {
    const sw = o.f == null || o.f < 0 ? 0 : [0, 1, 0, -1][o.f & 3], sk = '#f4e4dc';
    R(c, 8 + sw, 40, 3, 5, '#f4f4f0'); R(c, 13 - sw, 40, 3, 5, '#f4f4f0'); R(c, 8 + sw, 43, 3, 2, '#c81c2c'); R(c, 13 - sw, 43, 3, 2, '#c81c2c');
    PF(c, [7, 28, 17, 28, 19, 41, 5, 41], '#c81c2c'); PF(c, [12, 28, 17, 28, 19, 41, 12, 41], '#a8141c'); for (let x = 7; x < 18; x += 3) L(c, x, 30, x - 1, 40, '#9c1018');
    R(c, 7, 17, 10, 12, '#f8f8f4'); R(c, 12, 17, 5, 12, '#e4e4e0'); L(c, 9, 17, 9, 29, '#c81c2c'); L(c, 15, 17, 15, 29, '#c81c2c');
    if (o.arm === 'wave') { L(c, 17, 19, 21, 11, '#f8f8f4', 2); E(c, 21, 10, 1.5, 1.5, sk); } else if (o.arm === 'reach') { L(c, 17, 19, 23, 22, '#f8f8f4', 2); E(c, 23, 22, 1.5, 1.5, sk); } else { L(c, 17, 19, 18, 28, '#f8f8f4', 2); E(c, 18, 29, 1.5, 1.5, sk); }
    L(c, 7, 19, 6, 28, '#f8f8f4', 2); E(c, 6, 29, 1.5, 1.5, sk);
    E(c, 12, 10, 6.5, 7, '#0c0c10'); R(c, 5, 9, 14, 8, '#0c0c10');
    if (!o.back) { E(c, 12, 11, 5, 5.5, sk); R(c, 7, 5, 10, 4, '#0c0c10'); if (o.face !== false) { R(c, 9, 10, 2, 2, '#141414'); R(c, 13, 10, 2, 2, '#141414'); R(c, 11, 14, 2, 1, '#a85c5c'); } else { c.save(); c.globalAlpha = 0.6; c.fillStyle = '#0c0c10'; c.fillRect(7, 8, 10, 6); c.restore(); } }
  });
}
function hanako(c, x, y, o = {}) { blit(c, hanakoSpr(o), x, y, 12, 45, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- places & props ---- */
function duskSky(c, o = {}) { VG(c, 0, 0, W, 130, o.night ? ['#0a0c20', '#1c2040', '#3c3050'] : ['#3c2c58', '#a8546c', '#f0965c']); }
function school(c, t, o = {}) { duskSky(c, o); R(c, 20, 50, 280, 100, '#c8c0b0'); R(c, 20, 46, 280, 6, '#8c8478'); for (let f = 0; f < 3; f++) for (let k = 0; k < 9; k++) { const lit = o.lit && o.lit.includes(f * 9 + k); R(c, 30 + k * 30, 58 + f * 30, 20, 18, lit ? '#f8e8a0' : '#5c6c7c'); R(c, 39 + k * 30, 58 + f * 30, 2, 18, '#8c8478'); } R(c, 145, 24, 30, 26, '#c8c0b0'); E(c, 160, 36, 9, 9, '#f4f4f0'); L(c, 160, 36, 160, 30, '#2c2c2c'); L(c, 160, 36, 164, 36, '#2c2c2c'); R(c, 0, 150, W, 40, '#a88c64'); }
function corridor(c, t, o = {}) { R(c, 0, 0, W, H, o.dark ? '#3c3840' : '#c8bca4'); R(c, 0, 0, W, 30, o.dark ? '#2c2830' : '#b0a48c'); for (let i = 0; i < 4; i++) { R(c, 10 + i * 80, 40, 56, 50, o.dark ? '#5c4c6c' : '#f0b07c'); R(c, 37 + i * 80, 40, 2, 50, '#8c7c6c'); R(c, 10 + i * 80, 64, 56, 2, '#8c7c6c'); } R(c, 0, 100, W, 12, o.dark ? '#4c4440' : '#a8946c'); R(c, 0, 112, W, 80, o.dark ? '#5c5048' : '#b89c74'); for (let x = 0; x < W; x += 30) R(c, x, 112, 1, 80, o.dark ? '#4c4038' : '#a08460'); }
// girls' toilet: tiles, three (or four) stall doors, a sink and mirror; o.open: index of an open door (0..3), o.ajar: door 2 slightly open
function toilet(c, t, o = {}) {
  const dk = o.dark ? 0.7 : 1, tile = o.dark ? '#7c8c94' : '#c8dce4', tile2 = o.dark ? '#6c7c84' : '#b0c4cc';
  R(c, 0, 0, W, H, tile); for (let y = 0; y < 150; y += 10) for (let x = (y / 10) % 2 ? 0 : 10; x < W; x += 20) R(c, x, y, 19, 9, tile2);
  R(c, 0, 140, W, 50, o.dark ? '#5c6468' : '#a8b4b8'); for (let x = 0; x < W; x += 16) R(c, x, 140, 1, 50, '#8c989c');
  const n = o.n || 4; for (let i = 0; i < n; i++) { const x = 120 + i * 50; R(c, x - 2, 44, 50, 4, '#8c7c6c'); const op = o.open === i ? 1 : (i === 2 && o.ajar) ? o.ajar : 0; R(c, x, 48, 44, 96, '#3c3440'); R(c, x + op * 34, 48, 44 - op * 34, 96, i === 2 && o.mark ? '#c8a8a0' : '#d8c8b8'); R(c, x + op * 34, 48, 2, 96, '#8c7c6c'); if (op < 0.8) E(c, x + 36, 96, 2, 2, '#5c5c5c'); TX(c, String(i + 1), x + 18, 54, '#8c7c6c', 16, null); }
  R(c, 14, 74, 80, 40, o.dark ? '#5c6c74' : '#a8c8d8'); R(c, 12, 72, 84, 2, '#8c8c8c'); R(c, 20, 118, 70, 10, '#e8ecf0'); R(c, 50, 112, 4, 6, '#a8a8a8');
  if (o.drip) { const u = fr(t * 0.9); E(c, 52, 120 + u * 4, 1, 1.5, '#8cc8f8'); }
}
function knock(c, t, t0, x, y) { for (let k = 0; k < 3; k++) { const tk = t0 + k * 0.45; if (t > tk && t < tk + 0.35) { const u = (t - tk) / 0.35; c.save(); c.globalAlpha = 1 - u; ER(c, x, y, 6 + u * 14, 6 + u * 14, '#f8f8f0'); c.restore(); TX(c, 'こん', x + 14, y - 20 - k * 4, '#2c2c3c', 16, '#f4f4f0'); } } }
function futon(c, x, y, n = 4) { for (let i = 0; i < n; i++) { R(c, x + i * 50, y, 44, 22, '#e8e4dc'); R(c, x + i * 50, y - 4, 16, 8, '#f4f0e8'); E(c, x + i * 50 + 8, y - 6, 6, 5, '#f0c8a8'); R(c, x + i * 50 + 3, y - 12, 10, 4, '#141418'); } }

/* ---- portraits (48x48) ---- */
function hanakoFace(o = {}) { // bob cut, pale face; o.dark: the eyes in the hair's shadow
  return SPR('hnF' + (o.blink || 0) + (o.dark ? 'd' : '') + (o.smile ? 's' : ''), 48, 48, c => {
    PF(c, [4, 48, 8, 36, 40, 36, 44, 48], '#f8f8f4'); L(c, 14, 36, 12, 48, '#c81c2c', 3); L(c, 34, 36, 36, 48, '#c81c2c', 3); PF(c, [19, 36, 24, 42, 29, 36], '#e4e4e0');
    E(c, 24, 20, 15, 16, '#0c0c10'); R(c, 9, 20, 30, 16, '#0c0c10');
    R(c, 19, 30, 10, 7, '#d8c4b8'); E(c, 24, 22, 10, 12, '#d8c4b8'); E(c, 23.5, 21.5, 9.5, 11.5, '#f4e4dc');
    R(c, 13, 8, 22, 8, '#0c0c10'); for (let x = 14; x < 35; x += 3) R(c, x, 15, 2, 2, '#0c0c10');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 4, 21, '#2c2028'); continue; } R(c, x0, 19, 4, 3, '#141018'); P(c, x0 + 1, 19, '#f8f8f8'); }
    if (o.dark) { c.save(); c.globalAlpha = 0.55; c.fillStyle = '#1c1018'; c.fillRect(14, 15, 20, 9); c.restore(); for (const x0 of [17, 27]) { P(c, x0 + 1, 20, '#e8e0e0'); } }
    if (o.smile) { L(c, 21, 28, 24, 30, '#a85c5c'); L(c, 24, 30, 27, 28, '#a85c5c'); } else R(c, 22, 29, 4, 1, '#a85c5c');
    E(c, 17, 25, 2, 1, '#f0c0c0'); E(c, 31, 25, 2, 1, '#f0c0c0');
  });
}
const PORTRAITS = { hanako: p => withMouth('pmhn', hanakoFace({ blink: p.blink, dark: true }), p, 24, 29) };
