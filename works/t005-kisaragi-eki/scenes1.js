/* ================= 都市伝説 #005 きさらぎ駅: helpers, cast, places, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function plate(c, x, y, txt, col = '#f8e8b0', bg = '#000000') { const s = textSpr(txt, 16, col); R(c, x - 4, y - 3, s.width + 8, 22, bg); TX(c, txt, x, y, col, 16, null); }
function person(c, st, x, y, o = {}) { blit(c, modFig(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, FIG_AX2, FIG_AY2, { flip: !!o.flip, s: o.s || 1 }); }
function oldCar(c, x, y, o = {}) { const col = o.col || '#5c6c7c', dk = shadeCol(col, 0.75); R(c, x, y - 18, 80, 12, col); PF(c, [x + 14, y - 18, x + 22, y - 30, x + 56, y - 30, x + 64, y - 18], col); R(c, x + 24, y - 28, 14, 9, o.lit ? '#f8e8a0' : '#5c7c9c'); R(c, x + 41, y - 28, 14, 9, o.lit ? '#f8e8a0' : '#5c7c9c'); R(c, x, y - 8, 80, 2, dk); for (const wx of [x + 16, x + 64]) { E(c, wx, y - 5, 7, 7, '#141414'); E(c, wx, y - 5, 3, 3, '#8c8c8c'); } if (o.head) { R(c, x + 78, y - 15, 3, 3, '#f8f0c0'); c.save(); c.globalAlpha = 0.18; PF(c, [x + 80, y - 15, x + 200, y - 40, x + 200, y + 10], '#f8f0c0'); c.restore(); } if (o.tail) { R(c, x, y - 16, 3, 4, '#e81c1c'); if (o.brake) glow(c, x, y - 14, 14, 8, '#ff2020', 0.5); } }
function inCar(c, st, carX, y, slot = 0, o = {}) { const wx = carX + 24 + slot * 17; c.save(); c.beginPath(); c.rect(wx, y - 28, 14, 9); c.clip(); blit(c, modFig(st, { k: 'car' + (o.k || ''), expr: o.expr || 'normal', blink: o.blink || 0 }), wx + 7, y + 10 - (st.kid ? 14 : 0), FIG_AX2, FIG_AY2, { s: 0.7, flip: !!o.flip }); c.restore(); }
function frame(c, x, y, w, h, col) { R(c, x, y, w, 2, col); R(c, x, y + h - 2, w, 2, col); R(c, x, y, 2, h, col); R(c, x + w - 2, y, 2, h, col); }
function lampPost(c, t, x, y = 160, o = {}) { R(c, x, y - 110, 3, 110, '#4c4c54'); R(c, x - 12, y - 112, 16, 3, '#4c4c54'); glow(c, x - 6, y - 106, 40, 60, '#f8d890', 0.3 + 0.03 * Math.sin(t * 2)); R(c, x - 10, y - 109, 9, 2, '#f8f0c0'); c.save(); c.globalAlpha = 0.12; PF(c, [x - 8, y - 106, x - 50, y, x + 36, y], '#f8e8b0'); c.restore(); }

/* ---- cast ---- */
const OL = { id: 'ol', top: 'jacket', coat: '#5c5c6c', shirt: '#f0ece4', pants: '#3c3c48', shoes: '#2c2c2c', skin: '#f0c8a8', hair: '#2c2018', hairStyle: 'long' };
const OLDMAN = { id: 'om', top: 'jacket', coat: '#5c5040', shirt: '#c8c0a8', pants: '#4c4438', skin: '#d8b090', hair: '#c8c8c0', hairStyle: 'short' };
const DRIVER = { id: 'dv', top: 'jacket', coat: '#2c2c34', shirt: '#c8c8c8', tie: '#3c1c1c', pants: '#2c2c34', skin: '#e0c0a0', hair: '#141414', hairStyle: 'side' };
const READERS = ['#3c4c6c', '#5c3c3c', '#3c5c4c', '#4c4c4c'].map((col, i) => ({ id: 'rd' + i, top: i % 2 ? 'sweater' : 'tee', coat: col, pants: '#2c2c34', skin: ['#f0c8a8', '#e8c4a0'][i % 2], hair: '#141418', hairStyle: ['short', 'side', 'long', 'curly'][i], glasses: i === 0 }));
const COMMUTERS = ['#3c3c44', '#4c4c5c', '#5c5448'].map((col, i) => ({ id: 'cm' + i, top: 'jacket', coat: col, shirt: '#e8e4dc', tie: ['#2c3c6c', '#6c2c2c', null][i], pants: col, skin: '#f0c8a8', hair: '#1c1814', hairStyle: i === 2 ? 'long' : 'side' }));
// the old man with one leg and a crutch (28x58, anchor 14,57): drawn simply, not gory — one trouser leg pinned up
function oldManSpr(o = {}) {
  return SPR('omn' + (o.face === false ? 'n' : ''), 28, 58, c => {
    const sk = '#d8b090', co = '#5c5040', pa = '#4c4438';
    R(c, 11, 36, 5, 19, pa); R(c, 10, 54, 7, 3, '#2c2420'); R(c, 16, 36, 5, 8, pa); P(c, 18, 44, '#3c3428');
    L(c, 22, 22, 24, 56, '#8c6c44', 2); R(c, 20, 21, 7, 2, '#8c6c44');
    PF(c, [8, 20, 20, 20, 22, 38, 7, 38], co); L(c, 20, 22, 22, 30, co, 3); E(c, 22, 30, 1.5, 1.5, sk); L(c, 8, 22, 6, 34, co, 3); E(c, 6, 35, 1.5, 1.5, sk);
    E(c, 14, 12, 6, 7, sk); R(c, 8, 6, 12, 4, '#c8c8c0'); P(c, 11, 12, '#2c2420'); P(c, 16, 12, '#2c2420'); L(c, 11, 16, 16, 16, '#7c5c4c'); L(c, 10, 9, 13, 9, '#a8a8a0'); L(c, 15, 9, 18, 9, '#a8a8a0');
  });
}
function oldMan(c, x, y, o = {}) { c.save(); if (o.a != null) c.globalAlpha = o.a; blit(c, oldManSpr(o), x, y, 14, 57, { flip: !!o.flip, s: o.s || 1 }); c.restore(); }

/* ---- places & props ---- */
// inside the last train: seats, dark windows (o.lights: passing lights), hanging straps swaying
function trainInside(c, t, o = {}) {
  R(c, 0, 0, W, H, '#c8c8b8'); R(c, 0, 0, W, 22, '#e8e8d8'); for (let i = 0; i < 4; i++) R(c, 20 + i * 80, 6, 40, 4, '#f8f8f0');
  for (let i = 0; i < 3; i++) { const x = 16 + i * 104; R(c, x, 36, 88, 56, '#0c0c18'); R(c, x - 2, 34, 92, 3, '#8c8c84'); if (o.lights) { const lx = ((t * 260 + i * 70) % 400) - 40; if (lx > x && lx < x + 88) glow(c, lx, 64, 14, 20, '#f8e8a0', 0.4); } }
  R(c, 0, 96, W, 6, '#8c8c84'); R(c, 0, 102, W, 24, '#5c7c5c'); R(c, 0, 120, W, 6, '#3c5c3c'); R(c, 0, 126, W, 64, '#8c8478');
  for (let i = 0; i < 8; i++) { const x = 20 + i * 40, sw = Math.sin(t * 2 + i) * 2; L(c, x, 22, x + sw, 34, '#5c5c5c'); ER(c, x + sw, 38, 3, 4, '#c8c8c8'); }
}
// the unmanned station: one lamp, a bench, a sign; fields and the mountains' shadow
function kisaragi(c, t, o = {}) {
  VG(c, 0, 0, W, 120, ['#04040c', '#0c0c1c', '#141428']); for (let i = 0; i < 30; i++) P(c, (i * 67) % W, (i * 29) % 60, '#8c8cac');
  PF(c, [0, 100, 50, 70, 110, 88, 170, 62, 230, 86, 300, 66, 320, 76, 320, 110, 0, 110], '#0c0c14'); R(c, 0, 108, W, 20, '#14180c'); for (let i = 0; i < 40; i++) L(c, (i * 23) % W, 116, (i * 23) % W + Math.sin(t + i) * 2, 108, '#1c2410');
  R(c, 0, 126, W, 24, '#4c4840'); R(c, 0, 126, W, 2, '#c8c070'); R(c, 0, 150, W, 40, '#1c1814'); for (let x = -10; x < W; x += 16) R(c, x, 156, 10, 3, '#3c3428'); R(c, 0, 154, W, 2, '#8c8c94'); R(c, 0, 162, W, 2, '#8c8c94');
  if (o.lamp !== false) { R(c, 60, 50, 3, 76, '#3c3c44'); R(c, 52, 48, 18, 4, '#3c3c44'); glow(c, 61, 54, 40, 30, '#f8e8b0', 0.3 + 0.04 * Math.sin(t * 5)); R(c, 55, 51, 12, 3, '#f8f0c8'); }
  if (o.sign !== false) { R(c, 150, 78, 3, 48, '#5c5c64'); R(c, 214, 78, 3, 48, '#5c5c64'); R(c, 140, 74, 86, 26, '#e8e4d8'); R(c, 140, 74, 86, 3, '#2c4c8c'); TX(c, 'きさらぎ', 152, 80, '#1c1c1c', 16, null); }
  R(c, 240, 112, 40, 4, '#5c4030'); R(c, 244, 116, 3, 10, '#3c3028'); R(c, 273, 116, 3, 10, '#3c3028');
}
// the anonymous board on a 2004 monitor: posts appear line by line (o.posts: array of [name, text, mine])
function board(c, t, posts, o = {}) {
  R(c, 0, 0, W, H, '#1c1c24'); R(c, 30, 30, 260, 116, '#c8c8c0'); R(c, 36, 36, 248, 104, '#efefef'); R(c, 140, 146, 40, 12, '#a8a8a0'); R(c, 110, 156, 100, 6, '#8c8c84');
  R(c, 36, 36, 248, 12, '#2c4c8c'); TX(c, '掲示板', 40, 34, '#f8f8f8', 16, null);
  const show = posts.slice(-4); show.forEach(([nm, tx, mine], i) => { const y = 52 + i * 22; TX(c, nm, 40, y, mine ? '#c81c2c' : '#3c7c3c', 16, null); TX(c, tx, 40 + nm.length * 16 + 6, y, '#1c1c1c', 16, null); });
  if (o.cursor && Math.floor(t * 2) % 2) R(c, 40, 52 + show.length * 22, 6, 14, '#1c1c1c');
}
function keitai(c, x, y, t, o = {}) { R(c, x, y, 22, 40, '#5c6c8c'); R(c, x + 2, y + 2, 18, 18, o.off ? '#1c1c24' : '#a8d8f8'); if (!o.off) glow(c, x + 11, y + 11, 20, 20, '#a8d8f8', 0.2); for (let i = 0; i < 9; i++) R(c, x + 3 + (i % 3) * 6, y + 23 + Math.floor(i / 3) * 5, 4, 3, '#c8c8d0'); if (o.bat != null) { R(c, x + 4, y + 4, 10, 5, '#1c1c1c'); R(c, x + 5, y + 5, 8 * o.bat, 3, o.bat < 0.3 ? '#e81c1c' : '#3cc86c'); R(c, x + 14, y + 5, 1, 3, '#1c1c1c'); } }
// walking the tracks at night (side view): sleepers, rails, black hills; o.tunnel: a tunnel mouth at x
function trackWalk(c, t, o = {}) { VG(c, 0, 0, W, 130, ['#04040c', '#0c0c18', '#14141c']); PF(c, [0, 110, 60, 60, 120, 90, 200, 50, 270, 80, 320, 60, 320, 130, 0, 130], '#08080c'); R(c, 0, 126, W, 64, '#1c1814'); for (let i = 0; i < 24; i++) { const x = ((i * 16 - (o.v || 0) * t) % 384 + 384) % 384 - 32; R(c, x, 150, 10, 4, '#3c3428'); } R(c, 0, 148, W, 2, '#8c8c94'); R(c, 0, 156, W, 2, '#8c8c94'); if (o.tunnel != null) { const x = o.tunnel; R(c, x, 70, 110, 80, '#2c2c30'); E(c, x + 55, 110, 34, 40, '#000000'); R(c, x + 21, 110, 68, 40, '#000000'); } }
function mountainRoad(c, t, o = {}) { VG(c, 0, 0, W, 130, ['#04040c', '#08081a', '#0c0c18']); for (let i = 0; i < 10; i++) { const x = ((i * 50 - t * 80) % 500 + 500) % 500 - 60; PF(c, [x, 130, x + 18, 60 + (i % 3) * 12, x + 36, 130], '#0c140c'); } R(c, 0, 128, W, 62, '#1c1c1c'); R(c, 0, 128, W, 2, '#3c3c3c'); }

/* ---- portraits (48x48) ---- */
function onnaFace(o = {}) { // a young office worker, shoulder-length hair, scared
  return SPR('onF' + (o.blink || 0) + (o.scared ? 's' : ''), 48, 48, c => {
    const sk = '#f0c8a8'; PF(c, [2, 48, 6, 37, 42, 37, 46, 48], '#5c5c6c'); PF(c, [18, 37, 24, 44, 30, 37], '#f0ece4'); R(c, 20, 32, 8, 7, sk);
    E(c, 24, 20, 14, 15, '#2c2018'); R(c, 10, 20, 28, 18, '#2c2018'); E(c, 24, 23, 10.5, 12, sk); R(c, 13, 8, 22, 7, '#2c2018'); PF(c, [13, 10, 30, 10, 20, 17], '#2c2018');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 22, x0 + 4, 22, '#2c2020'); continue; } R(c, x0, 20, 4, o.scared ? 5 : 4, '#141018'); P(c, x0 + 1, 20, '#f8f8f8'); }
    L(c, 16, 17, 21, o.scared ? 18 : 17, '#2c2018'); L(c, 27, o.scared ? 18 : 17, 32, 17, '#2c2018'); if (o.scared) E(c, 24, 31, 2, 1.5, '#8c4c4c'); else R(c, 22, 31, 4, 1, '#c86c6c');
    E(c, 16, 28, 2, 1, '#f0b0a8'); E(c, 32, 28, 2, 1, '#f0b0a8');
  });
}
function roujinFace(o = {}) { // the old man by the tracks: white stubble, deep lines, eyes in shadow
  return SPR('rjF' + (o.blink || 0), 48, 48, c => {
    const sk = '#d8b090'; PF(c, [2, 48, 6, 37, 42, 37, 46, 48], '#5c5040'); R(c, 20, 32, 8, 7, '#c8a080');
    E(c, 24, 22, 12, 14, sk); E(c, 12, 23, 2, 3, sk); E(c, 36, 23, 2, 3, sk); R(c, 13, 8, 22, 6, '#c8c8c0'); E(c, 24, 10, 10, 4, '#d8d8d0');
    L(c, 15, 17, 21, 18, '#a8a8a0', 2); L(c, 27, 18, 33, 17, '#a8a8a0', 2); for (const x0 of [17, 27]) { R(c, x0, 19, 5, 4, '#5c4030'); if (o.blink !== 2) R(c, x0 + 2, 20, 2, 2, '#141010'); }
    L(c, 16, 14, 32, 14, '#a07850'); L(c, 24, 22, 23, 28, '#a07850'); R(c, 20, 31, 8, 1, '#6c3c30'); for (let x = 16; x < 33; x += 2) P(c, x, 34 + (x & 1), '#e8e4dc');
    c.save(); c.globalAlpha = 0.25; c.fillStyle = '#0c0c18'; c.fillRect(0, 0, 48, 48); c.restore();
  });
}
function otokoFace(o = {}) { // the driver: neat hair, a smile that doesn't reach the eyes (eyes in shadow)
  return SPR('okF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e0c0a0'; PF(c, [2, 48, 6, 37, 42, 37, 46, 48], '#2c2c34'); PF(c, [18, 37, 24, 44, 30, 37], '#c8c8c8'); L(c, 24, 38, 24, 48, '#3c1c1c', 2); R(c, 20, 32, 8, 6, sk);
    E(c, 24, 21, 12, 14, sk); E(c, 12, 22, 2, 3, sk); E(c, 36, 22, 2, 3, sk); PF(c, [11, 18, 12, 8, 22, 5, 34, 7, 37, 16, 33, 11, 16, 11], '#141414');
    c.save(); c.globalAlpha = 0.3; c.fillStyle = '#1c1420'; c.fillRect(14, 16, 20, 8); c.restore(); for (const x0 of [17, 27]) { R(c, x0, 19, 4, 2, '#0c0808'); if (o.blink !== 2) P(c, x0 + 1, 19, '#a8a0b0'); }
    L(c, 24, 22, 23, 27, '#c0a080'); L(c, 19, 30, 22, 32, '#7c4c3c'); L(c, 22, 32, 26, 32, '#7c4c3c'); L(c, 26, 32, 29, 30, '#7c4c3c');
  });
}
const PORTRAITS = { onna: p => withMouth('pmon', onnaFace({ blink: p.blink, scared: true }), p, 24, 31), roujin: p => withMouth('pmrj', roujinFace({ blink: p.blink }), p, 24, 31), otoko: p => withMouth('pmok', otokoFace({ blink: p.blink }), p, 24, 31) };
