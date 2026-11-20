/* ================= 都市伝説 #003 人面犬: helpers, cast, places, props & portraits ================= */
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

/* ---- cast ---- */
const YOUNG = { id: 'yg', top: 'jacket', coat: '#3c4c6c', shirt: '#e8e4dc', tie: '#8c1c2c', pants: '#2c2c3c', skin: '#f0c8a8', hair: '#1c1814', hairStyle: 'side' };
const DAD = { id: 'dd', top: 'shirt', coat: '#c8d8e8', pants: '#3c3c44', skin: '#e8c4a0', hair: '#1c1814', hairStyle: 'short', glasses: true };
const MOM = { id: 'mm', top: 'sweater', coat: '#c88c8c', pants: '#5c5c6c', skin: '#f0c8a8', hair: '#2c2018', hairStyle: 'long' };
const KEN = { id: 'kn', kid: true, top: 'tee', coat: '#e8b03c', pants: '#2c3c6c', shoes: '#f4f4f0', skin: '#f0c8a8', hair: '#141418', hairStyle: 'short' };
const GPA = { id: 'gp', top: 'sweater', coat: '#8c7c5c', pants: '#4c4c44', skin: '#c89064', hair: '#e8e4dc', hairStyle: 'short' };
const PUPILS = [['#5c8cc8', 'short'], ['#e8a0b8', 'long'], ['#a8d88c', 'short'], ['#f8d870', 'curly']].map(([col, hs], i) => ({ id: 'pp' + i, kid: true, top: 'tee', coat: col, pants: '#2c2c3c', shoes: '#f4f4f0', skin: ['#f0c8a8', '#ecc4a0'][i % 2], hair: '#141418', hairStyle: hs }));
const SUITS = ['#3c3c44', '#4c4c5c', '#2c3440', '#5c5448'].map((col, i) => ({ id: 'sm' + i, top: 'jacket', coat: col, shirt: '#e8e4dc', tie: ['#2c3c6c', '#6c2c2c', '#3c5c3c', '#5c5c2c'][i], pants: col, skin: ['#e8c4a0', '#f0c8a8'][i % 2], hair: i === 2 ? '#5c5c5c' : '#1c1814', hairStyle: 'side', glasses: i === 1 }));

/* ---- 人面犬: a tan mongrel's body with a tired middle-aged man's face (60x42, feet anchor 30,41, facing right) ----
   o: { f: run frame (-1 = stand), sit, noHead (head in a bag), old (the grandfather's face), back (face turned away), look: face turned to the viewer } */
const FUR = '#b08c5c', FUR2 = '#8c6c44', FUR3 = '#d0b080';
function dogHead(c, x, y, o = {}) { // a man's face with floppy dog ears, centred at (x, y) (about 18x20)
  const sk = o.old ? '#c89064' : '#d8b090', sk2 = shadeCol(sk, 0.86), hr = o.old ? '#e8e4dc' : '#3c3430';
  PF(c, [x - 7, y - 8, x - 12, y - 2, x - 11, y + 6, x - 7, y + 4], FUR2); PF(c, [x + 7, y - 8, x + 12, y - 2, x + 11, y + 6, x + 7, y + 4], FUR2);
  E(c, x, y + 9, 8, 3.5, FUR3);
  if (o.back) { E(c, x, y, 7.5, 8.5, FUR); E(c, x - 1, y - 2, 5, 4, FUR3); return; }
  E(c, x, y, 7, 8.5, sk); E(c, x + 2, y + 1, 4.5, 7, shadeCol(sk, 0.94));
  if (o.old) { R(c, x - 7, y - 4, 2, 6, hr); R(c, x + 5, y - 4, 2, 6, hr); } else { R(c, x - 6, y - 8, 3, 6, hr); R(c, x + 4, y - 8, 3, 6, hr); P(c, x - 2, y - 8, hr); P(c, x + 1, y - 9, hr); P(c, x, y - 8, sk2); }
  L(c, x - 5, y - 3, x - 2, y - 3, o.old ? '#d8d4cc' : '#2c2420'); L(c, x + 1, y - 3, x + 4, y - 3, o.old ? '#d8d4cc' : '#2c2420');
  R(c, x - 4, y - 1, 2, 2, '#141010'); R(c, x + 2, y - 1, 2, 2, '#141010'); L(c, x - 5, y + 2, x - 2, y + 2, '#a07858'); L(c, x + 1, y + 2, x + 4, y + 2, '#a07858');
  L(c, x, y, x - 1, y + 3, sk2); P(c, x - 1, y + 4, '#6c4c3c'); P(c, x + 1, y + 4, '#6c4c3c');
  L(c, x - 2, y + 6, x + 2, y + 6, '#6c3c30');
  if (!o.old) for (const [dx, dy] of [[-4, 6], [-3, 7], [-1, 8], [1, 8], [3, 7], [4, 6], [-2, 7], [2, 7]]) P(c, x + dx, y + dy, '#9c8070');
  else { L(c, x - 4, y - 5, x + 4, y - 5, shadeCol(sk, 0.8)); P(c, x - 6, y + 1, '#a07050'); P(c, x + 6, y + 1, '#a07050'); L(c, x - 3, y + 5, x - 2, y + 6, '#a07050'); L(c, x + 3, y + 5, x + 2, y + 6, '#a07050'); }
}
function jinmenSpr(o = {}) { // 64x48, feet anchor (30,47), facing right
  const f = o.f == null ? -1 : o.f;
  return SPR('jmd2' + f + (o.sit ? 's' : '') + (o.noHead ? 'n' : '') + (o.old ? 'o' : '') + (o.back ? 'b' : ''), 64, 48, c => {
    if (o.sit) {
      L(c, 13, 40, 5, 33, FUR, 3); P(c, 4, 32, FUR3);
      E(c, 22, 38, 10, 8, FUR); E(c, 20, 36, 6, 4, shadeCol(FUR, 1.08)); R(c, 14, 44, 14, 3, FUR2);
      PF(c, [24, 38, 30, 20, 42, 20, 42, 40], FUR); E(c, 37, 30, 5, 8, FUR3);
      R(c, 33, 36, 3, 11, FUR); R(c, 38, 36, 3, 11, FUR2); R(c, 32, 45, 5, 2, FUR2); R(c, 37, 45, 5, 2, FUR2);
      if (!o.noHead) dogHead(c, 37, 13, o); else PF(c, [32, 22, 38, 12, 44, 16, 42, 24], FUR);
      return;
    }
    const ph = f < 0 ? 0 : (f & 3), sp = [0, 5, 1, -4][ph], up = f < 0 ? 0 : [0, 2, 1, 1][ph];
    const tw = f < 0 ? 0 : [-2, 1, 2, 1][ph]; L(c, 13, 24 - up, 6, 15 - up + tw, FUR, 3); L(c, 6, 15 - up + tw, 4, 11 - up + tw, FUR3, 2);
    for (const [lx, back, col] of [[15, 1, FUR2], [19, 1, FUR], [37, 0, FUR2], [41, 0, FUR]]) { const s2 = (back ? -sp : sp) * (col === FUR ? 1 : -1); L(c, lx, 30 - up, lx + s2 * 0.6, 38 - up, col, 3); L(c, lx + s2 * 0.6, 38 - up, lx + s2, 45 - up * 0.5, col, 2); R(c, lx + s2 - 1, 45 - up * 0.5, 4, 2, FUR2); }
    E(c, 27, 27 - up, 14, 7, FUR); E(c, 27, 31 - up, 11, 3, FUR3); E(c, 38, 25 - up, 7, 8, FUR); E(c, 25, 22 - up, 10, 2, shadeCol(FUR, 1.08));
    if (!o.noHead) { PF(c, [36, 24 - up, 40, 14 - up, 50, 13 - up, 46, 28 - up], FUR); dogHead(c, 47, 12 - up, o); }
    else PF(c, [38, 24, 44, 16, 50, 20, 46, 28], FUR);
  });
}
function jinmen(c, x, y, o = {}) { blit(c, jinmenSpr(o), x, y, 30, 47, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- places & props ---- */
// night highway (side view): sky, far city lights, a guardrail and lamps sliding past, lane dashes; o.fog, o.v: speed, o.still
function highway(c, t, o = {}) {
  const v = o.still ? 0 : (o.v || 220);
  VG(c, 0, 0, W, 120, o.fog ? ['#2c3440', '#4c5864', '#5c6874'] : ['#06081c', '#141c38', '#2c2c4c']);
  if (!o.fog) { for (let i = 0; i < 40; i++) { const x = ((i * 53 - t * v * 0.05) % 340 + 340) % 340 - 10; R(c, x, 96 + (i * 7) % 14, 2, 2, ['#f8e8a0', '#c8d8f8', '#f8c070'][i % 3]); } R(c, 0, 108, W, 6, '#0c0c18'); }
  for (let i = 0; i < 4; i++) { const x = ((i * 120 - t * v * 0.6) % 480 + 480) % 480 - 60; R(c, x, 40, 3, 72, '#5c5c64'); R(c, x - 10, 38, 14, 3, '#5c5c64'); glow(c, x - 6, 44, 30, 20, '#f8b050', o.fog ? 0.25 : 0.35); R(c, x - 9, 41, 8, 2, '#f8e0a0'); }
  R(c, 0, 112, W, 6, '#a8a8b0'); for (let i = 0; i < 12; i++) { const x = ((i * 40 - t * v * 0.6) % 480 + 480) % 480 - 40; R(c, x, 112, 3, 14, '#7c7c84'); }
  R(c, 0, 118, W, 72, '#2c2c34'); R(c, 0, 118, W, 2, '#3c3c44');
  for (let i = 0; i < 6; i++) { const x = ((i * 80 - t * v) % 480 + 480) % 480 - 40; R(c, x, 140, 34, 3, '#d8d8c8'); }
  R(c, 0, 164, W, 3, '#d8d8c8');
  if (o.fog) { c.save(); c.globalAlpha = 0.28; c.fillStyle = '#c8d0d8'; c.fillRect(0, 0, W, H); c.restore(); for (let i = 0; i < 4; i++) { const x = ((i * 110 - t * v * 0.3) % 440 + 440) % 440 - 60; glow(c, x, 120 + (i & 1) * 20, 80, 26, '#e8ecf0', 0.22); } }
}
// a back alley of the night town: neon (one flickering), the bag pile, a puddle
function alley(c, t, o = {}) {
  R(c, 0, 0, W, H, '#140c18'); R(c, 0, 0, 120, 160, '#2c2430'); R(c, 200, 0, 120, 160, '#241c2c'); R(c, 120, 0, 80, 150, '#0c0810');
  for (let y = 10; y < 150; y += 12) { L(c, 0, y, 120, y, '#241c28'); L(c, 200, y, 320, y, '#1c1424'); }
  const fl = o.flicker ? (Math.sin(t * 23) > 0.3 || Math.sin(t * 3.1) > 0) : true;
  const signs = [[16, 44, 'スナック', '#f878b8'], [216, 44, 'BAR', '#78d8f8'], [230, 84, '喫茶', '#f8c050']];
  signs.forEach(([x, y0, s, col], i) => { const y = y0 + (o.low ? 26 : 0); const on = i === 0 ? fl : true; R(c, x - 4, y - 4, s.length * 17 + 8, 26, '#0c0810'); if (on) { glow(c, x + s.length * 8, y + 8, 40, 16, col, 0.3); TX(c, s, x, y, col, 16, null); } else TX(c, s, x, y, '#3c2c3c', 16, null); });
  R(c, 0, 150, W, 40, '#241c24'); for (let x = 0; x < W; x += 24) R(c, x, 150, 1, 40, '#1c141c');
  E(c, 100, 166, 30, 4, '#2c2c44'); E(c, 100, 166, 26, 3, fl ? '#5c3c5c' : '#3c3448');
  if (o.bags !== false) { const bx = o.bagX || 150; for (const [dx, dy, r] of [[0, 0, 14], [20, 2, 12], [10, -12, 11], [-16, 3, 11], [32, -2, 9]]) { E(c, bx + dx, 150 + dy - r * 0.5, r, r * 0.8, '#141418'); E(c, bx + dx - r * 0.3, 150 + dy - r * 0.9, r * 0.3, r * 0.2, '#3c3c48'); } }
}
// interior of the family car at night (rear seat view: the side window, the boy's face, what runs outside)
function carWindow(c, t, o = {}) {
  R(c, 0, 0, W, H, '#1c1c24'); R(c, 40, 34, 240, 106, '#141418');
  c.save(); c.beginPath(); c.rect(48, 40, 224, 94); c.clip(); c.translate(48, 40); c.scale(0.7, 0.75); c.translate(0, -24); highway(c, t, { fog: o.fog, v: 260 }); c.restore();
  if (o.after) { c.save(); c.beginPath(); c.rect(48, 40, 224, 94); c.clip(); o.after(c, t); c.restore(); }
  c.save(); c.globalAlpha = 0.15; PF(c, [48, 40, 120, 40, 60, 134, 48, 134], '#a8b8c8'); c.restore();
  R(c, 40, 134, 240, 8, '#2c2c34'); R(c, 0, 142, W, 48, '#3c3440'); R(c, 0, 142, W, 3, '#4c4450');
}
function overturnedTruck(c, x, y) { R(c, x, y - 34, 110, 30, '#c8c8c0'); R(c, x, y - 34, 110, 3, '#a8a8a0'); R(c, x + 110, y - 30, 30, 26, '#3c6c9c'); R(c, x + 114, y - 26, 14, 10, '#5c7c9c'); for (const wx of [x + 18, x + 50, x + 124]) { E(c, wx, y - 38, 7, 4, '#141414'); } R(c, x + 136, y - 22, 4, 4, '#f8a020'); }
function lab(c, t) { R(c, 0, 0, W, H, '#1c2c2c'); R(c, 0, 120, W, 70, '#2c3c3c'); R(c, 20, 100, 280, 8, '#5c6c6c'); for (let i = 0; i < 5; i++) { const x = 40 + i * 54; R(c, x, 70, 14, 30, DA('#8ce8c8', 0.35)); R(c, x, 70, 14, 2, '#c8f8e8'); const lv = 0.5 + 0.3 * Math.sin(t * 2 + i); R(c, x + 1, 100 - 28 * lv, 12, 28 * lv, ['#3cc88c', '#c83c8c', '#3c8cc8'][i % 3]); if (Math.sin(t * 3 + i * 2) > 0.6) E(c, x + 7, 66 - fr(t + i * 0.3) * 20, 2, 2, '#c8f8e8'); } R(c, 200, 112, 90, 50, '#3c4c4c'); for (let k = 0; k < 9; k++) R(c, 204 + k * 10, 112, 2, 50, '#8c9c9c'); }
function frame(c, x, y, w, h, col) { R(c, x, y, w, 2, col); R(c, x, y + h - 2, w, 2, col); R(c, x, y, 2, h, col); R(c, x + w - 2, y, 2, h, col); }
function bagOver(c, x, y, s = 1) { const bx = x + 22 * s, by = y - 34 * s; E(c, bx, by, 13 * s, 11 * s, '#1c1c24'); E(c, bx - 4 * s, by - 5 * s, 5 * s, 3 * s, '#4c4c5c'); E(c, bx + 5 * s, by + 3 * s, 3 * s, 2 * s, '#3c3c48'); PF(c, [bx + 6 * s, by - 10 * s, bx + 10 * s, by - 17 * s, bx + 13 * s, by - 9 * s], '#1c1c24'); L(c, bx - 9 * s, by + 4 * s, bx - 5 * s, by + 2 * s, '#3c3c48'); }
// the family car, large (side view, facing right): riders [[st, slot, o], ...]
function bigCar(c, t, x, y, s, riders, o = {}) { c.save(); c.translate(x, y); c.scale(s, s); oldCar(c, 0, 0, { col: o.col || '#c8c8d0', head: o.head, tail: true, brake: o.brake }); for (const [st, slot, ro] of riders) inCar(c, st, 0, 0, slot, ro || {}); c.restore(); }
function scroll(c, t, x, y) { R(c, x, y, 160, 90, '#e8dcb8'); R(c, x - 6, y - 4, 6, 98, '#7c4c2c'); R(c, x + 160, y - 4, 6, 98, '#7c4c2c'); for (let i = 0; i < 5; i++) L(c, x + 140 - i * 10, y + 10, x + 140 - i * 10, y + 50 + (i & 1) * 20, '#3c3430'); c.save(); c.globalAlpha = 0.8; blit(c, tintSpr(jinmenSpr({ sit: true }), '#3c3430', 'inkdog'), x + 50, y + 84, 30, 47, { s: 1.3 }); c.restore(); }
function calendar(c, x, y, top, big, col = '#c81c2c') { R(c, x, y, 70, 80, '#f4f0e8'); R(c, x, y, 70, 18, col); TX(c, top, x + 6, y + 1, '#f8f8f0', 16, null); TX(c, big, x + 35 - big.length * 8, y + 36, '#2c2c2c', 16, null); }

/* ---- portraits (48x48) ---- */
function jinmenFace(o = {}) { // a tired man's face framed by floppy dog ears and a fur ruff; o.old: the grandfather (white hair, tanned, kind)
  return SPR('jmF' + (o.blink || 0) + (o.old ? 'o' : '') + (o.dark ? 'd' : ''), 48, 48, c => {
    const sk = o.old ? '#c89064' : '#d8b090', sk2 = shadeCol(sk, 0.85), hr = o.old ? '#e8e4dc' : '#3c3430';
    PF(c, [2, 48, 6, 36, 14, 33, 34, 33, 42, 36, 46, 48], FUR); for (let i = 0; i < 9; i++) L(c, 6 + i * 4.5, 40 + (i & 1) * 3, 4 + i * 4.5, 48, FUR2); PF(c, [16, 34, 24, 40, 32, 34], FUR3);
    PF(c, [9, 8, 2, 14, 1, 30, 6, 34, 11, 26, 13, 12], FUR2); PF(c, [39, 8, 46, 14, 47, 30, 42, 34, 37, 26, 35, 12], FUR2); L(c, 5, 16, 5, 30, FUR, 1); L(c, 43, 16, 43, 30, FUR, 1);
    E(c, 24, 21, 12, 14, sk); E(c, 26, 22, 9, 12, shadeCol(sk, 0.95)); E(c, 11.5, 22, 2, 3, sk2); E(c, 36.5, 22, 2, 3, sk2);
    R(c, 13, 8, 22, 3, sk2); if (o.old) { R(c, 12, 9, 4, 8, hr); R(c, 32, 9, 4, 8, hr); for (let x = 16; x < 32; x += 3) P(c, x, 8, hr); L(c, 16, 12, 32, 12, '#a07050'); L(c, 17, 14, 31, 14, '#a07050'); }
    else { R(c, 12, 9, 3, 9, hr); R(c, 33, 9, 3, 9, hr); for (const x of [18, 21, 25, 28]) L(c, x, 8, x + 1, 11, hr); }
    L(c, 15, 16, 21, 15, o.old ? '#c8c4bc' : '#2c2420', 2); L(c, 27, 15, 33, 16, o.old ? '#c8c4bc' : '#2c2420', 2);
    for (const x0 of [16, 27]) { if (o.blink === 2) { L(c, x0, 20, x0 + 5, 20, '#3c2c24'); continue; } R(c, x0, 19, 5, 3, '#f0ece4'); R(c, x0 + 2, 19, 2, 3, '#1c1410'); L(c, x0, 18, x0 + 5, 18, '#5c3c2c'); L(c, x0, 23, x0 + 5, 23, '#a07858'); if (!o.old) L(c, x0 + 1, 24, x0 + 4, 24, '#b08868'); }
    if (o.old) { L(c, 13, 20, 14, 22, '#a07050'); L(c, 34, 20, 33, 22, '#a07050'); L(c, 17, 30, 15, 26, '#a07050'); L(c, 31, 30, 33, 26, '#a07050'); }
    L(c, 24, 20, 23, 27, sk2); R(c, 21, 27, 6, 2, sk2); P(c, 22, 28, '#6c4c3c'); P(c, 26, 28, '#6c4c3c');
    R(c, 20, 31, 8, 1, '#7c4c3c'); if (o.old) { L(c, 19, 30, 20, 31, '#7c4c3c'); L(c, 28, 31, 29, 30, '#7c4c3c'); }
    if (!o.old) for (let y = 29; y < 35; y += 2) for (let x = 15 + (y & 2); x < 34; x += 3) if (x < 20 || x > 28 || y > 32) P(c, x, y, '#a08470');
    if (o.dark) { c.save(); c.globalAlpha = 0.35; c.fillStyle = '#0c0c18'; c.fillRect(0, 0, 48, 48); c.restore(); }
  });
}
function kenFace(o = {}) { // a boy, short black hair, wide eyes
  return SPR('knF' + (o.blink || 0) + (o.shock ? 's' : ''), 48, 48, c => {
    const sk = '#f0c8a8'; PF(c, [4, 48, 8, 38, 40, 38, 44, 48], '#e8b03c'); R(c, 20, 34, 8, 6, sk); PF(c, [18, 38, 24, 42, 30, 38], '#c8902c');
    E(c, 24, 20, 13, 14, '#141418'); E(c, 24, 23, 11, 12, sk); E(c, 12.5, 23, 2, 3, sk); E(c, 35.5, 23, 2, 3, sk);
    R(c, 12, 9, 24, 7, '#141418'); for (let x = 13; x < 36; x += 3) R(c, x, 15, 2, 2, '#141418');
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 22, x0 + 4, 22, '#2c2020'); continue; } R(c, x0, 20, 4, o.shock ? 5 : 4, '#141018'); P(c, x0 + 1, 20, '#f8f8f8'); }
    L(c, 16, 18, 21, 17, '#141418'); L(c, 27, 17, 32, 18, '#141418'); P(c, 24, 27, '#d8a888');
    if (o.shock) E(c, 24, 31, 2, 2, '#7c3c3c'); else R(c, 22, 31, 4, 1, '#a8645c');
    E(c, 16, 28, 2, 1, '#f0b0a8'); E(c, 32, 28, 2, 1, '#f0b0a8');
  });
}
function chichiFace(o = {}) { // the father: short hair, glasses, tired
  return SPR('ccF' + (o.blink || 0), 48, 48, c => {
    const sk = '#e8c4a0'; PF(c, [2, 48, 6, 37, 42, 37, 46, 48], '#c8d8e8'); PF(c, [18, 37, 24, 44, 30, 37], '#a8b8c8'); R(c, 20, 32, 8, 6, sk);
    E(c, 24, 21, 12, 14, sk); E(c, 12, 22, 2, 3, sk); E(c, 36, 22, 2, 3, sk);
    PF(c, [11, 18, 12, 9, 20, 6, 30, 6, 36, 9, 37, 18, 34, 12, 14, 12], '#1c1814');
    for (const x0 of [15, 26]) { R(c, x0, 17, 8, 6, '#3c3c44'); R(c, x0 + 1, 18, 6, 4, '#e0e4e8'); if (o.blink === 2) L(c, x0 + 2, 20, x0 + 5, 20, '#2c2020'); else R(c, x0 + 3, 19, 2, 2, '#1c1410'); } L(c, 23, 19, 26, 19, '#3c3c44');
    L(c, 24, 22, 23, 27, '#c8a080'); R(c, 21, 31, 6, 1, '#8c5c4c'); L(c, 16, 25, 20, 25, '#c8a080'); L(c, 28, 25, 32, 25, '#c8a080');
  });
}
const PORTRAITS = { jinmen: p => withMouth('pmjm', jinmenFace({ blink: p.blink }), p, 24, 31), ken: p => withMouth('pmkn', kenFace({ blink: p.blink }), p, 24, 31), chichi: p => withMouth('pmcc', chichiFace({ blink: p.blink }), p, 24, 31) };
