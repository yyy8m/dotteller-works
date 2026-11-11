/* ================= 記録 #008 メアリー・セレスト号事件: helpers, ships, sea, props & portraits ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 1e9) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); }; return sc; }
function yearFlash(c, t, t0, year, x = 216, y = 10, sub) { if (t > t0) { const k = eOut(sg(t, t0, t0 + 0.35)); if (k > 0) yearCard(c, x, lerp(-70, y, k), year, sub || ''); } }
function bigFace(c, spr, cx, cy, s, id) { const [pc, px] = slot(id, spr.width * s, spr.height * s); px.imageSmoothingEnabled = false; px.clearRect(0, 0, pc.width, pc.height); px.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(pc, Math.round(cx - spr.width * s / 2), Math.round(cy - spr.height * s / 2)); }
function dim(c, a, col = '#06040a') { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, W, H); c.restore(); }
function stamp(c, t, t0, x, y, txt, w = 80) { const k = eOut(sg(t, t0, t0 + 0.25)); if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(-0.14); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -w / 2, -16, w, 32, '#c81818'); R(c, -w / 2 + 3, -13, w - 6, 26, '#f4f0e8'); const s = textSpr(txt, 16, '#c81818'); c.drawImage(s, Math.round(-s.width / 2), -9); c.restore(); }
function softBeam(c, x, y, ang, len, half, a = 0.3, col = '#fff4c8') { const p = (r, k) => [x + Math.cos(ang + k) * r, y + Math.sin(ang + k) * r]; c.save(); c.globalAlpha = a * 0.5; PF(c, [x, y, ...p(len, -half), ...p(len, half)], col); c.globalAlpha = a; PF(c, [x, y, ...p(len * 0.9, -half * 0.5), ...p(len * 0.9, half * 0.5)], col); c.restore(); }
function person(c, st, x, y, o = {}) { blit(c, (st.modern ? modFig : suitFig)(st, { f: o.f == null ? -1 : o.f, arm: o.arm || null, expr: o.expr || 'normal', blink: o.blink || 0, k: o.k || '' }), x, y, st.modern ? FIG_AX2 : 13, st.modern ? FIG_AY2 : 57, { flip: !!o.flip, s: o.s || 1 }); }

/* ---- people ---- */
const BRIGGS = { id: 'brg', coat: '#1c2440', coat2: '#141c34', pants: '#1c1c24', boots: '#141414', skin: '#e8c0a0', hair: '#3c2818', hat: 'bowler', hatCol: '#141420', moustache: true };
const MOREHOUSE = { id: 'mor', coat: '#3c2c24', coat2: '#2c201c', pants: '#24201c', boots: '#141414', skin: '#e0b090', hair: '#6c4c2c', hat: 'bowler', hatCol: '#2c2018', moustache: true };
const SARAH = { id: 'sar', modern: true, top: 'dress', coat: '#5c2c3c', skin: '#f0c8a8', hair: '#4c3020', hairStyle: 'long' };
const SOFIA = { id: 'sof', modern: true, kid: true, top: 'dress', coat: '#e8d8b8', skin: '#f4d0b0', hair: '#c8a060', hairStyle: 'long' };
const SAILORS = ['#2c3c5c', '#3c4c6c', '#24344c', '#4c4c5c', '#2c3448', '#3c3c54', '#34405c'].map((col, i) => ({ id: 'sl' + i, coat: col, coat2: shadeCol(col, 0.75), pants: ['#c8c0b0', '#3c3c44', '#c8c0b0', '#3c3c44', '#c8c0b0', '#3c3c44', '#c8c0b0'][i], boots: '#2c2420', skin: ['#e8c0a0', '#e0b090', '#f0c8a8', '#dcac88', '#e8c4a4', '#f0c8a8', '#e0b898'][i], hair: ['#3c2818', '#c8a060', '#a86c3c', '#1c1814', '#8c6c3c', '#e8d090', '#5c3c24'][i], moustache: i % 3 === 0 }));
const DEVO = { id: 'devo', coat: '#3c3c4c', coat2: '#2c2c3c', pants: '#2c2c34', boots: '#141414', skin: '#e0b090', hair: '#5c3c24', hat: 'hunt', hatCol: '#2c2c3c', moustache: true };

/* ---- sea & sky ---- */
function seaSky(c, t, o = {}) { const k = o.night ? ['#04060e', '#0c1424', '#1c2c44'] : o.dusk ? ['#2c2448', '#7c4c5c', '#e88c5c'] : o.grey ? ['#5c6470', '#8c949c', '#b4b8bc'] : ['#4c8cd8', '#8cbce8', '#d8ecf4']; VG(c, 0, 0, W, o.hz || 100, k); if (!o.night && !o.grey) for (let i = 0; i < 4; i++) { const x = mod(i * 97 + t * 3, W + 120) - 60; E(c, x, 18 + i * 9, 40, 6, DA('#ffffff', 0.6)); } }
function sea(c, t, y = 100, o = {}) {
  const c0 = o.night ? '#0c1830' : o.grey ? '#3c5468' : '#2c5c8c', c1 = o.night ? '#142440' : o.grey ? '#4c6478' : '#3c74a8', hi = o.night ? '#3c5c8c' : o.grey ? '#8ca0b0' : '#a8d0f0';
  R(c, 0, y, W, H - y, c0); for (let r = 0; r < 14; r++) { const yy = y + r * r * 0.9 + r * 2, sp = 6 + r * 3; for (let i = 0; i < 12; i++) { const x = mod(i * 41 + r * 17 - t * sp * (r & 1 ? 1 : -0.6), W + 40) - 20; R(c, x, yy, 10 + r * 2, 1 + (r > 8 ? 1 : 0), r % 3 ? c1 : hi); } }
}
function bob(t, s = 1) { return Math.sin(t * 1.3) * 2 * s; }
// a brigantine (two masts: square sails on the fore, fore-and-aft on the main), facing right. x,y = waterline centre
function brig(c, x, y, t, o = {}) {
  const s = o.s || 1, roll = Math.sin(t * 1.1 + (o.ph || 0)) * 0.03, sails = o.sails == null ? 1 : o.sails, hull = o.hull || '#2c2018';
  c.save(); c.translate(x, y + bob(t, s)); c.rotate(roll); c.scale(s, s);
  PF(c, [-56, -14, 54, -14, 64, -22, 58, -6, 46, 4, -48, 4, -58, -6], hull); R(c, -54, -14, 108, 3, '#c8b088'); R(c, -50, -8, 96, 2, '#5c4430');
  for (let i = 0; i < 6; i++) R(c, -40 + i * 16, -11, 4, 2, '#141010'); // gunports/windows
  L(c, 56, -18, 84, -34, '#4c3424', 2); // bowsprit
  R(c, -22, -18, 26, 6, '#5c4430'); R(c, -20, -20, 22, 3, '#3c2c20'); // deckhouse
  const fm = 22, mm = -24; L(c, fm, -14, fm, -96, '#3c2c1c', 2); L(c, mm, -14, mm, -100, '#3c2c1c', 2); // masts
  L(c, 84, -34, fm, -92, '#5c4c3c'); L(c, fm, -92, mm, -96, '#5c4c3c'); L(c, mm, -96, -56, -16, '#5c4c3c'); // stays
  if (sails > 0) {
    const sc = o.sailCol || '#ece4d0', sh = shadeCol(sc, 0.82), wv = Math.sin(t * 2.4) * 2 * sails, torn = o.torn;
    for (let k = 0; k < 3; k++) { const yy = -90 + k * 24, w = 30 - k * 0 + k * 3; PF(c, [fm - w / 2, yy, fm + w / 2, yy, fm + w / 2 + 3 + wv, yy + 20 * sails, fm - w / 2 + 3 + wv, yy + 20 * sails], k & 1 ? sh : sc); L(c, fm - w / 2 - 2, yy, fm + w / 2 + 2, yy, '#3c2c1c'); if (torn && k === 1) { PF(c, [fm + 2, yy + 6, fm + 12, yy + 10, fm + 4, yy + 18], '#2c2c34'); } }
    PF(c, [mm + 2, -94, mm + 2, -20, mm - 34 + wv, -20, mm - 26 + wv, -60], sc); L(c, mm + 2, -20, mm - 36, -20, '#3c2c1c'); // gaff mainsail
    PF(c, [fm + 4, -86, 82, -36, fm + 6, -40], sh); // jib
    if (torn) { L(c, mm - 10, -50, mm - 20, -30, '#2c2c34'); }
  } else { for (let k = 0; k < 3; k++) R(c, fm - 16, -90 + k * 24, 32, 3, '#d8d0bc'); }
  if (o.flag) { PF(c, [mm, -100, mm + 10 + Math.sin(t * 6) * 2, -97, mm, -94], o.flag); }
  c.restore();
}
function rowboat(c, x, y, t, n = 3, o = {}) { const yy = y + bob(t, 0.6); PF(c, [x - 16, yy - 4, x + 16, yy - 4, x + 12, yy + 3, x - 12, yy + 3], o.col || '#6c4c2c'); R(c, x - 16, yy - 5, 32, 2, '#8c6c44'); for (let i = 0; i < n; i++) { const px = x - 8 + i * 8; E(c, px, yy - 9, 2.5, 2.5, '#e0b090'); R(c, px - 2, yy - 7, 4, 4, '#3c3c4c'); } const ph = Math.sin(t * 4); L(c, x - 6, yy - 4, x - 22 + ph * 4, yy + 4, '#8c6c44'); L(c, x + 6, yy - 4, x + 22 - ph * 4, yy + 4, '#8c6c44'); }
// barrels
function barrel(c, x, y, s = 1, o = {}) { const w = 10 * s, h = 14 * s, col = o.col || '#8c5c34'; E(c, x, y - h / 2, w / 2, h / 2, col); R(c, x - w / 2, y - h + 2 * s, w, h - 4 * s, col); R(c, x - w / 2, y - h * 0.75, w, 1.5 * s, '#4c4c54'); R(c, x - w / 2, y - h * 0.3, w, 1.5 * s, '#4c4c54'); L(c, x - w * 0.25, y - h + 2, x - w * 0.25, y - 2, shadeCol(col, 1.2)); if (o.empty) { E(c, x, y - h + 2 * s, w / 2 - 1, 2 * s, '#1c1410'); } }
// the deck seen from the stern: planks running to the bow, rails, masts
function deckView(c, t, o = {}) {
  seaSky(c, t, { grey: o.grey, hz: 70 }); sea(c, t, 66, { grey: o.grey });
  const rl = Math.sin(t * 1.1) * 3; c.save(); c.translate(0, rl);
  PF(c, [40, 240, 120, 80, 200, 80, 280, 240], '#9c7c54'); for (let i = 0; i < 9; i++) { const u = i / 8; L(c, lerp(40, 280, u), 240, lerp(120, 200, u), 80, '#7c5c3c'); } for (let y = 92; y < 240; y += 14) L(c, lerp(120, 40, (y - 80) / 160), y, lerp(200, 280, (y - 80) / 160), y, '#8c6c48');
  PF(c, [20, 240, 112, 76, 120, 80, 40, 240], '#5c4430'); PF(c, [300, 240, 208, 76, 200, 80, 280, 240], '#5c4430'); // bulwarks
  for (let i = 0; i < 6; i++) { const u = i / 5; L(c, lerp(30, 116, u), lerp(232, 78, u), lerp(30, 116, u), lerp(232, 78, u) - lerp(26, 8, u), '#4c3424', 2); L(c, lerp(290, 204, u), lerp(232, 78, u), lerp(290, 204, u), lerp(232, 78, u) - lerp(26, 8, u), '#4c3424', 2); }
  L(c, 30, 206, 116, 70, '#6c4c34', 3); L(c, 290, 206, 204, 70, '#6c4c34', 3); // rails
  R(c, 157, -20, 6, 130, '#3c2c1c'); R(c, 159, -60, 3, 60, '#3c2c1c'); for (let k = 0; k < 3; k++) R(c, 130, -10 + k * 24 - 30, 60, 3, '#4c3c2c');
  if (o.sails !== false) { const wv = Math.sin(t * 2.2) * 2; for (let k = 0; k < 2; k++) PF(c, [132, k * 24 - 38, 188, k * 24 - 38, 190 + wv, k * 24 - 18, 130 + wv, k * 24 - 18], k ? '#d8d0bc' : '#ece4d0'); }
  if (o.water) { c.globalAlpha = 0.55; PF(c, [70, 240, 135, 130, 185, 130, 250, 240], '#5c8cb8'); c.globalAlpha = 1; for (let i = 0; i < 10; i++) { const x = mod(i * 31 + t * 8, 160) + 80, y = 150 + (i * 17 % 80); R(c, x, y, 8, 1, '#a8c8e8'); } }
  c.restore();
}

/* ---- portraits (48x48) ---- */
function sailorBase(c, o) { // shoulders in a pea coat
  PF(c, [2, 48, 8, 37, 40, 37, 46, 48], o.coat || '#2c3448'); PF(c, [18, 37, 24, 44, 30, 37], o.collar || '#e8e4dc'); P(c, 14, 42, '#c8b060'); P(c, 34, 42, '#c8b060');
}
// Oliver Deveau: first mate, thick moustache, knitted cap, wet with spray
function devoFace(o = {}) {
  return SPR('dvF' + (o.blink || 0) + (o.shock ? 's' : ''), 48, 48, c => {
    const sk = '#e4b490', sk2 = '#b0805c'; sailorBase(c, { coat: '#3c3c4c' });
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    E(c, 24, 10, 14, 8, '#2c2c3c'); R(c, 10, 11, 28, 5, '#3c3c4c'); for (let x = 12; x < 38; x += 3) R(c, x, 11, 1, 5, '#24242c'); // knit cap
    PF(c, [11, 16, 12, 22, 14, 16], '#5c3c24'); PF(c, [37, 16, 36, 22, 34, 16], '#5c3c24');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 17, x0 + 4, 17, '#4c3020'); if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, o.shock ? 4 : 3, '#f4f0e8'); R(c, x0 + 1, 19, 2, o.shock ? 4 : 3, C.k); }
    L(c, 24, 22, 23, 26, sk2); PF(c, [16, 29, 24, 27, 32, 29, 30, 31, 24, 30, 18, 31], '#5c3c24'); // moustache
    if (o.shock) E(c, 24, 33, 2, 1.6, '#5c1c1c'); else R(c, 21, 33, 6, 1, '#7c4c3c');
    for (let i = 0; i < 5; i++) P(c, 14 + hash(i) * 20, 14 + hash(i * 3) * 20, '#c8e0f0'); // spray
  });
}
// a Dei Gratia seaman: weathered face, beard, flat cap
function crewFace(o = {}) {
  return SPR('crF' + (o.blink || 0), 48, 48, c => {
    const sk = '#dcac88', sk2 = '#a87c5c'; sailorBase(c, { coat: '#2c3c5c', collar: '#c8c0b0' });
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    E(c, 24, 11, 13, 5, '#3c3428'); R(c, 24, 12, 16, 3, '#2c241c'); // flat cap
    E(c, 24, 31, 10, 6, '#8c6c44'); E(c, 24, 30, 4, 1.5, '#7c4c3c'); R(c, 13, 20, 3, 10, '#8c6c44'); R(c, 32, 20, 3, 10, '#8c6c44');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 17, x0 + 4, 17, '#6c5034'); if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 2, '#f4f0e8'); R(c, x0 + 2, 19, 2, 2, C.k); L(c, x0 - 1, 22, x0 + 1, 23, sk2); }
    L(c, 24, 21, 23, 25, sk2);
  });
}
// Captain Benjamin Briggs: dark hair, full beard, peaked captain's cap
function briggsFace(o = {}) {
  return SPR('bgF' + (o.blink || 0) + (o.ghost ? 'g' : ''), 48, 48, c => {
    const sk = '#e8c0a0', sk2 = '#b88c6c'; sailorBase(c, { coat: '#1c2440', collar: '#f0ece4' }); R(c, 12, 40, 3, 3, '#d8b040'); R(c, 33, 40, 3, 3, '#d8b040');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 22, 12, 13, sk2); E(c, 23.5, 21.5, 11.5, 12.5, sk);
    R(c, 10, 6, 28, 8, '#141c34'); R(c, 8, 13, 32, 3, '#0c0c14'); R(c, 21, 8, 6, 4, '#d8b040'); // cap
    PF(c, [12, 24, 14, 34, 20, 40, 28, 40, 34, 34, 36, 24, 32, 29, 24, 31, 16, 29], '#2c1c14'); E(c, 24, 30, 4, 1.4, '#7c4c3c'); // beard
    R(c, 11, 15, 3, 9, '#2c1c14'); R(c, 34, 15, 3, 9, '#2c1c14');
    for (const x0 of [17, 27]) { L(c, x0 - 1, 17, x0 + 4, 17, '#2c1c14'); if (o.blink === 2) { L(c, x0, 20, x0 + 4, 20, '#2c1c14'); continue; } R(c, x0, 19, 5, 3, '#f4f0e8'); R(c, x0 + 1, 19, 3, 3, '#3c4c6c'); P(c, x0 + 2, 20, C.k); }
    L(c, 24, 22, 23, 26, sk2);
  });
}
const PORTRAITS = {
  devo: p => withMouth('pmdv', devoFace({ blink: p.blink, shock: true }), p, 24, 32),
  crew: p => withMouth('pmcr', crewFace({ blink: p.blink }), p, 24, 29),
  briggs: p => withMouth('pmbg', briggsFace({ blink: p.blink }), p, 24, 29),
};
