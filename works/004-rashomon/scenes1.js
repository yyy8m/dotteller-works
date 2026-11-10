/* ================= 文庫 #004 羅生門: cast & places ================= */
const ln = (S, id) => S.lines.find(l => l.id === id);
const at = (S, id, k = 0, def = 0) => { const l = ln(S, id); return l ? l.t0 + l.segs[Math.min(k, l.segs.length - 1)].a : def; };
const lastSe = S => S.lines[S.lines.length - 1].se;
const inLine = (S, t, id) => { const l = ln(S, id); return l && t > l.t0 - 0.2 && t < l.se + 0.3; };
function withCuts(sc, cuts) { const base = sc.draw; sc.draw = function (c, t, S) { for (const [id, fn] of cuts) if (inLine(S, t, id)) { const r = fn(c, t, S); if (r) return r; } return base.call(this, c, t, S); /* a cut may return null to fall back */ }; return sc; }

/* ---- the servant (下人): faded indigo jacket over yellow, a sword at the hip, a pimple on the right cheek ---- */
const GENIN = { id: 'gen', robe: '#2c3c5c', robe2: '#1c2840', trim: '#d8b84c', sash: '#3c2c1c', skin: '#d8a880', hair: '#1c1814', hat: 'bun' };
const BABA = { id: 'baba', robe: '#7c5c3c', robe2: '#5c4428', trim: '#8c6c48', sash: '#3c2c1c', skin: '#c8a080', hair: '#e8e4dc', old: true, female: true };
const BABA_BARE = { id: 'babaN', robe: '#c8a080', robe2: '#a88060', trim: '#c8a080', sash: '#a88060', skin: '#c8a080', hair: '#e8e4dc', old: true, female: true };
function genin(c, x, y, o = {}) { blit(c, robeFig(GENIN, { f: o.f == null ? -1 : o.f, pose: o.pose, arm: o.arm, expr: o.expr, k: 'g' + (o.k || '') }), x, y, FIG_AX2, FIG_AY2, { s: o.s || 1, flip: o.flip });
  if (o.sword !== false && o.pose !== 'kneel') { const d = o.flip ? -1 : 1, s = o.s || 1; L(c, x - d * 8 * s, y - 24 * s, x - d * 20 * s, y - 14 * s, '#2c2420', 2); R(c, x - d * 9 * s - 1, y - 25 * s, 3, 3, '#8c7c4c'); }
  if (o.blade) { const d = o.flip ? -1 : 1, s = o.s || 1; L(c, x + d * 10 * s, y - 30 * s, x + d * 34 * s, y - 34 * s, '#e8ecf4', 2); P(c, x + d * 33 * s, y - 34 * s, '#ffffff'); } }
function baba(c, x, y, o = {}) { blit(c, robeFig(o.bare ? BABA_BARE : BABA, { f: -1, pose: o.pose || 'kneel', arm: o.arm, expr: o.expr, k: 'b' + (o.k || '') }), x, y, FIG_AX2, FIG_AY2, { s: o.s || 1, flip: o.flip }); }

/* ---- portraits ---- */
function geninFace(o = {}) {
  return SPR('genF' + (o.blink || 0) + (o.ex || ''), 48, 48, c => {
    const sk = '#d8a880', sk2 = '#a87c58';
    PF(c, [2, 48, 8, 37, 40, 37, 46, 48], '#2c3c5c'); PF(c, [16, 37, 24, 44, 32, 37], '#d8b84c'); for (let y = 40; y < 48; y += 3) L(c, 8, y, 40, y, '#24304c');
    R(c, 19, 30, 10, 8, sk2); E(c, 24, 21, 11, 12.5, sk2); E(c, 23.5, 20.5, 10.5, 12, sk);
    PF(c, [12, 18, 13, 8, 22, 4, 33, 6, 36, 18, 32, 11, 22, 10, 16, 12], '#1c1814'); E(c, 24, 3, 4, 3.5, '#1c1814');
    for (let i = 0; i < 9; i++) P(c, 17 + (i * 5 % 14), 28 + (i * 3 % 5), '#5c4c3c'); // short stubble
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 4, 21, C.k); continue; } R(c, x0, 20, 4, 2, '#f4ecdc'); R(c, x0 + 1, 20, 2, 2, C.k); }
    if (o.ex === 'cold') { L(c, 16, 17, 21, 18, '#1c1814'); L(c, 27, 18, 32, 17, '#1c1814'); } else { L(c, 16, 17, 21, 17, '#1c1814'); L(c, 27, 17, 32, 17, '#1c1814'); }
    L(c, 23, 22, 22, 26, sk2); R(c, 21, 30, 6, 1, '#7c4c3c');
    E(c, 31, 26, 2, 2, '#c83c2c'); P(c, 31, 25, '#f87c5c'); // the big red pimple on the right cheek
  });
}
function babaFace(o = {}) {
  return SPR('babaF' + (o.blink || 0), 48, 48, c => {
    const sk = '#c8a080', sk2 = '#8c6c4c';
    PF(c, [4, 48, 10, 38, 38, 38, 44, 48], o.bare ? sk2 : '#7c5c3c');
    R(c, 20, 31, 8, 8, sk2); E(c, 24, 22, 10, 12, sk2); E(c, 23.5, 21.5, 9.5, 11.5, sk);
    E(c, 24, 9, 13, 7, '#e8e4dc'); for (let i = 0; i < 5; i++) { L(c, 11 + i, 8, 9 + i, 24 + (i % 3) * 2, '#e8e4dc', 2); L(c, 37 - i, 8, 39 - i, 24 + (i % 3) * 2, '#e8e4dc', 2); } for (let i = 0; i < 6; i++) L(c, 14 + i * 4, 4, 13 + i * 4 + (i % 2) * 2, 0, '#f4f0e8'); // short, wild white hair (sides and top only)
    for (let k = 0; k < 3; k++) L(c, 18, 13 + k * 2, 30, 13 + k * 2, sk2); L(c, 15, 25, 17, 30, sk2); L(c, 33, 25, 31, 30, sk2); // wrinkles
    for (const x0 of [17, 27]) { if (o.blink === 2) { L(c, x0, 21, x0 + 4, 21, C.k); continue; } R(c, x0, 19, 5, 4, '#e8c8b8'); R(c, x0 + 1, 20, 3, 3, '#3c0c0c'); P(c, x0 + 1, 20, '#c83c2c'); } // red-rimmed, bird-of-prey eyes
    L(c, 24, 22, 22, 28, sk2); E(c, 23, 29, 3, 2, sk2); // a hooked nose almost meeting the lips
    R(c, 20, 32, 8, 1, '#5c3c2c'); L(c, 22, 35, 26, 35, sk2); // thin lips, sharp throat
  });
}
const PORTRAITS = {
  genin: p => withMouth('pmG', geninFace({ blink: p.blink, ex: p.expr === 'cold' ? 'cold' : '' }), p, 23, 29),
  baba: p => withMouth('pmB', babaFace({ blink: p.blink }), p, 23, 31),
};

/* ---- places ---- */
function rainSky(c, t, h = 120, mood = 'dusk') {
  VG(c, 0, 0, W, h, mood === 'night' ? ['#04040a', '#0c0c18', '#141824'] : ['#1c1c2c', '#3c3448', '#5c4c5c']);
  for (let i = 0; i < 5; i++) { const x = mod(i * 83 - t * 4, W + 120) - 60; E(c, x, 14 + i * 10, 70, 12, DA('#2c2838', 0.7)); }
}
function rainFall(c, t, k = 1, col = '#a8b4c8') { for (let i = 0; i < 90 * k; i++) { const x = mod(hash(i * 3) * W * 1.3 - t * 40, W + 20) - 10, y = mod(hash(i * 7) * H + t * (260 + hash(i) * 100), H + 20) - 10; L(c, x, y, x - 2, y + 7, DA(col, 0.55)); } }
// the great two-storey gate, vermilion peeling, seen from Suzaku avenue
function rashomon(c, t, o = {}) {
  const gx = o.x || 160, dk = o.night ? 0.55 : 1, col = (a) => shadeCol(a, dk);
  R(c, 0, 150, W, H - 150, col('#4c4038')); for (let i = 0; i < 40; i++) R(c, (i * 53) % W, 152 + (i * 13 % 80), 8, 1, col('#5c5048'));
  for (let i = 0; i < 18; i++) E(c, (i * 67 + 13) % W, 158 + (i * 29 % 60), 10, 2, DA('#6c7c8c', 0.5)); // puddles
  // stone steps (7)
  for (let k = 0; k < 7; k++) R(c, gx - 70 - k * 2, 150 - k * 3, 140 + k * 4, 3, col(k & 1 ? '#6c6460' : '#7c7470'));
  for (let i = 0; i < 6; i++) { R(c, gx - 60 + i * 24, 132 + (i % 2), 2, 1, '#e8e4dc'); } // crow droppings
  // lower storey: big round pillars, dark passage
  R(c, gx - 96, 64, 192, 66, col('#1c1410')); for (const dx of [-90, -46, 0, 46, 90]) { R(c, gx + dx - 6, 64, 12, 66, col('#8c2c20')); R(c, gx + dx - 6, 64, 3, 66, col('#a83c2c')); for (let y = 70; y < 128; y += 9) if (hash(dx + y) > 0.5) R(c, gx + dx - 4 + (y % 5), y, 4, 5, col('#5c4c40')); } // peeling vermilion
  R(c, gx - 104, 58, 208, 8, col('#5c3c2c')); for (let x = gx - 100; x < gx + 104; x += 8) R(c, x, 58, 4, 4, col('#7c5438'));
  // middle roof
  PF(c, [gx - 128, 64, gx - 112, 52, gx - 96, 44, gx + 96, 44, gx + 112, 52, gx + 128, 64, gx + 104, 58, gx - 104, 58], col('#2c2830')); for (let x = gx - 96; x < gx + 96; x += 6) L(c, x, 45, x - 2, 57, col('#3c3840'));
  // upper storey (the loft) and top roof with the shibi ornaments
  R(c, gx - 76, 26, 152, 20, col('#7c2c20')); for (let x = gx - 72; x < gx + 74; x += 10) R(c, x, 26, 3, 20, col('#4c1c14'));
  if (o.loftLight) { R(c, gx - 30, 32, 16, 8, '#f8b040'); glow(c, gx - 22, 36, 24, 14, '#f8a040', 0.35 + 0.1 * Math.sin(t * 9)); }
  PF(c, [gx - 104, 28, gx - 88, 16, gx - 70, 8, gx + 70, 8, gx + 88, 16, gx + 104, 28, gx + 80, 24, gx - 80, 24], col('#24202a'));
  for (const sx of [-72, 72]) PF(c, [gx + sx - 4, 8, gx + sx, -4, gx + sx + 4, 8], col('#3c3438'));
  if (o.grass) for (let i = 0; i < 10; i++) L(c, gx - 60 + i * 12, 8, gx - 62 + i * 12, 2 + (i % 3) * 2, col('#4c6c34'));
}
function crow(c, x, y, t, i, s = 1) { const w = Math.sin(t * 10 + i) > 0 ? 4 : -1; PF(c, [x - 6 * s, y - w * s, x, y + 1, x + 6 * s, y - w * s, x, y - 1], '#0c0a10'); E(c, x, y, 2 * s, 1.5 * s, '#0c0a10'); }
// inside the loft: low ceiling with cobwebs, floorboards, bodies, one pine torch
function loft(c, t, o = {}) {
  const fx = o.fx || 150, fl = 0.85 + 0.15 * Math.sin(t * 11) * Math.sin(t * 7);
  R(c, 0, 0, W, H, '#060406'); R(c, 0, 0, W, 40, '#0c0808'); for (let x = 0; x < W; x += 40) R(c, x, 0, 6, 40, '#140c08'); R(c, 0, 38, W, 4, '#1c140c');
  for (const [x, y] of [[30, 40], [270, 42]]) for (let k = 0; k < 6; k++) L(c, x, y, x + Math.cos(k) * 22, y + 16 + Math.sin(k) * 6, '#2c2c2c'); // cobwebs
  R(c, 0, 150, W, H - 150, '#140c08'); for (let x = 0; x < W; x += 22) R(c, x, 150, 1, H - 150, '#0c0604');
  if (o.torch !== false) { glow(c, fx, 110, 150 * fl, 70 * fl, '#f8a040', 0.38); R(c, fx - 1, 128, 2, 22, '#5c3c24'); flame(c, fx, 126, 4, t, 1); }
  // the bodies, like clay dolls: mouths open, hands reaching
  const bodies = [[40, 152, 1, 'kd0'], [86, 158, -1, 'kd1'], [196, 156, 1, 'kd2'], [244, 150, -1, 'kd3'], [292, 158, 1, 'kd4'], [120, 166, 1, 'kd5']];
  bodies.forEach(([x, y, d, k], i) => { const st = { id: k, robe: ['#5c5444', '#c8a888', '#4c4c54', '#c8a888', '#6c5c4c', '#7c6c54'][i], robe2: '#3c3428', trim: '#5c5444', sash: '#3c3428', skin: '#a89880', hair: '#1c1814', female: i % 2 === 0 };
    c.save(); c.globalAlpha = 0.9; blit(c, robeFig(st, { f: -1, pose: 'stand', arm: i % 2 ? 'reach' : null, expr: 'shock', blink: 2, k: 'dd' }), x, y, FIG_AX2, FIG_AY2 - 12, { rot: d * Math.PI / 2, s: 0.95 }); c.restore(); });
  // darkness outside the torchlight
  c.save(); const g = c.createRadialGradient(fx, 120, 30, fx, 120, 190); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.85)'); c.fillStyle = g; c.fillRect(0, 0, W, H); c.restore();
}
