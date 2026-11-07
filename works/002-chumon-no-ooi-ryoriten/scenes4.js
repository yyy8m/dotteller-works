/* ================= 文庫 #002 注文の多い料理店: art pass — backgrounds and props with depth, light and texture ================= */
/* --- palettes --- */
const PAL = {
  sky: ['#f8d8a0', '#e8a068', '#b86c5c', '#6c4c6c'], dusk: ['#3c2c4c', '#6c3c5c', '#b8604c', '#e89c5c'],
  far: ['#9c7c8c', '#7c5c74'], mid: ['#6c3c34', '#4c2c2c'], leafA: ['#f8b848', '#e8802c', '#c8501c', '#8c2c14'], leafB: ['#f8d870', '#d8a030', '#a8681c', '#6c3c14'],
  trunk: ['#5c3c2c', '#3c2418', '#24140c'], grass: ['#a8844c', '#8c6838', '#6c4c28'],
};
/* dithered vertical band */
function band(c, y0, y1, a, b) { for (let y = y0; y < y1; y++) { const k = (y - y0) / Math.max(1, y1 - y0); c.fillStyle = DP(a, b, Math.round(k * 16)); c.fillRect(0, y, W, 1); } }
/* a leafy tree crown made of clusters with light from the upper left */
function crown(c, x, y, r, pal, seed, t) {
  const rr = rngf(seed);
  for (let k = 0; k < 14; k++) { const a = rr() * TAU, d = rr() * r * 0.8, cx = x + Math.cos(a) * d * 1.2, cy = y + Math.sin(a) * d * 0.8 + Math.sin(t * 1.2 + k) * 0.6, cr = r * (0.35 + rr() * 0.25);
    E(c, cx + 1, cy + 2, cr, cr * 0.85, pal[3]); E(c, cx, cy, cr, cr * 0.85, pal[2]); E(c, cx - cr * 0.25, cy - cr * 0.25, cr * 0.7, cr * 0.6, pal[1]); E(c, cx - cr * 0.4, cy - cr * 0.4, cr * 0.3, cr * 0.25, pal[0]); }
}
function trunk(c, x, y0, y1, w) { R(c, x - w / 2, y0, w, y1 - y0, PAL.trunk[1]); R(c, x - w / 2, y0, Math.max(1, w / 3), y1 - y0, PAL.trunk[0]); R(c, x + w / 2 - 1, y0, 1, y1 - y0, PAL.trunk[2]); for (let y = y0 + 4; y < y1; y += 7) P(c, x - w / 4, y, PAL.trunk[2]); }
/* the autumn mountain forest with 4 parallax layers */
function forestDeep(c, t, ox, o = {}) {
  const sky = o.dusk ? PAL.dusk : PAL.sky;
  band(c, 0, 40, sky[3], sky[2]); band(c, 40, 80, sky[2], sky[1]); band(c, 80, 110, sky[1], sky[0]);
  if (!o.dusk) { glow(c, 250, 40, 30, 30, '#fff0c0', 2 * (0.25)); E(c, 250, 40, 14, 14, '#fff4d0'); } else { ER(c, 260, 28, 8, 8, '#fcf4d8', -1.3, 1.3); }
  for (let i = 0; i < 8; i++) { const x = mod(i * 60 - ox * 0.1, 480) - 80, h = 44 + (i * 23 % 30); PF(c, [x - 70, 112, x, 112 - h, x + 70, 112], o.dusk ? '#4c3c5c' : PAL.far[0]); PF(c, [x, 112 - h, x + 70, 112, x + 20, 112], o.dusk ? '#3c2c4c' : PAL.far[1]); }
  band(c, 96, 114, DA(o.dusk ? '#6c5c7c' : '#f8e0c0', 0.0), o.dusk ? '#5c4c64' : '#e8c8a8'); // mist
  for (let i = 0; i < 10; i++) { const x = mod(i * 44 - ox * 0.35, 460) - 60; crown(c, x, 92 + (i % 3) * 4, 18, o.dusk ? ['#a86c5c', '#8c4c4c', '#6c3440', '#4c2434'] : PAL.leafB, 10 + i, t); }
  R(c, 0, 110, W, H - 110, PAL.grass[1]); band(c, 110, 130, PAL.grass[2], PAL.grass[1]);
  for (let i = 0; i < 80; i++) { const x = mod(i * 29 - ox * 0.9, W + 20) - 10, y = 114 + (i * 13 % 110); R(c, x, y, 3, 1, i % 3 ? PAL.grass[0] : PAL.leafA[(i >> 2) % 4]); }
  for (let i = 0; i < 6; i++) { const x = mod(i * 70 + 20 - ox * 0.7, 460) - 60; trunk(c, x, 40, 120, 7); crown(c, x, 36, 30, PAL.leafA, 30 + i, t); }
  if (o.rays !== false && !o.dusk) for (let i = 0; i < 4; i++) { const x = 40 + i * 70; PF(c, [x, 0, x + 14, 0, x + 70, 150, x + 46, 150], DA('#fff0c0', 0.08 + 0.04 * Math.sin(t + i))); }
  for (let i = 0; i < 14; i++) { const u = fr(t * 0.08 + hash(i)), x = mod(hash(i * 3) * 360 - ox * 0.6 + Math.sin(t + i) * 10 + (o.wind ? t * 80 : 0), 360) - 20, y = u * 160; R(c, x, y, 3, 2, PAL.leafA[i % 4]); P(c, x + 1, y, PAL.leafA[0]); }
}
/* tall trunks passing in the foreground */
function foreTrunks(c, t, ox) { for (let i = 0; i < 3; i++) { const x = mod(i * 170 + 60 - ox * 1.6, 520) - 100; R(c, x - 12, 0, 24, H, '#1c100a'); R(c, x - 12, 0, 6, H, '#2c1a10'); crown(c, x, 4, 40, ['#8c3c14', '#6c2c10', '#4c1c0c', '#2c100a'], 70 + i, t); } }
/* pampas grass with heads catching the light */
function susuki2(c, t, y, wind, n = 22, seed = 3) {
  for (let i = 0; i < n; i++) { const x = (i * 17 + seed * 7) % (W + 20) - 10, h = 30 + (i * 7 % 18), sw = Math.sin(t * (wind ? 5 : 1.2) + i) * (wind ? 8 : 2);
    L(c, x, y, x + sw * 0.6, y - h * 0.6, '#8c7448'); L(c, x + sw * 0.6, y - h * 0.6, x + sw, y - h, '#a88c58');
    for (let k = 0; k < 4; k++) L(c, x + sw, y - h + k * 2, x + sw + 3 + k, y - h + 4 + k * 2, k & 1 ? '#f8ecd0' : '#e0d0b0'); }
}

/* --- the Western house "WILDCAT HOUSE" --- */
function wildcatHouse(c, t, hx, hy, a = 1, sign = 1) {
  c.save(); c.globalAlpha = a;
  const wW = 150, wH = 92;
  // brick wall (white porcelain bricks) with mortar and shading
  R(c, hx, hy - wH, wW, wH, '#e8e2d6');
  for (let y = hy - wH; y < hy; y += 6) for (let x = hx + ((((y - hy) / 6) | 0) & 1) * 6; x < hx + wW; x += 12) { R(c, x, y, 11, 5, '#f4f0e8'); R(c, x, y + 4, 11, 1, '#d4ccbc'); }
  R(c, hx + wW - 10, hy - wH, 10, wH, DA('#5c4c5c', 0.25));
  // roof with slates, dormer and chimney with smoke
  PF(c, [hx - 10, hy - wH, hx + 20, hy - wH - 30, hx + wW - 20, hy - wH - 30, hx + wW + 10, hy - wH], '#3c2c3c');
  for (let r = 0; r < 5; r++) for (let x = hx - 6 + r * 6; x < hx + wW + 6 - r * 6; x += 8) R(c, x, hy - wH - 4 - r * 6, 7, 3, r & 1 ? '#4c3c4c' : '#5c4c5c');
  R(c, hx + 110, hy - wH - 46, 12, 22, '#8c5c4c'); R(c, hx + 108, hy - wH - 48, 16, 4, '#5c3c34'); smoke(c, hx + 116, hy - wH - 50, t, 3);
  // windows glowing warm
  for (const wx of [hx + 14, hx + 106]) { R(c, wx - 2, hy - 72, 32, 40, '#5c3c2c'); R(c, wx, hy - 70, 28, 36, '#f8d070'); R(c, wx + 13, hy - 70, 2, 36, '#5c3c2c'); R(c, wx, hy - 54, 28, 2, '#5c3c2c'); glow(c, wx + 14, hy - 52, 30, 26, '#f8c060', 2 * (0.15)); PF(c, [wx - 4, hy - 72, wx + 14, hy - 80, wx + 32, hy - 72], '#5c3c2c'); }
  // porch, glass door with gold letters, lamps
  R(c, hx + 52, hy - 60, 46, 60, '#3c2c20'); R(c, hx + 56, hy - 56, 38, 56, '#a8c8d8'); for (let k = 0; k < 3; k++) L(c, hx + 60 + k * 10, hy - 54, hx + 58 + k * 10, hy - 30, '#e0f0f8');
  R(c, hx + 74, hy - 56, 2, 56, '#3c2c20'); for (let k = 0; k < 3; k++) R(c, hx + 60, hy - 46 + k * 5, 30, 1, '#f8d050');
  for (const lx of [hx + 46, hx + 104]) { R(c, lx - 2, hy - 64, 5, 8, '#2c2420'); E(c, lx, hy - 58, 3, 3, '#f8e080'); glow(c, lx, hy - 58, 9, 9, '#f8d060', 2 * (0.2 + 0.05 * Math.sin(t * 7 + lx))); }
  R(c, hx + 44, hy, 62, 4, '#c8c0b0'); R(c, hx + 48, hy + 4, 54, 3, '#a8a090');
  c.restore();
  if (sign > 0) { // the signboard over the door
    const bx = hx + 75, by = hy - wH - 4 + (1 - sign) * -16, w = 104, h = 56;
    R(c, bx - w / 2 + 2, by + 2, w, h, DA('#000000', 0.4)); R(c, bx - w / 2, by, w, h, '#2c1c10'); R(c, bx - w / 2 + 2, by + 2, w - 4, h - 4, '#c8a040'); R(c, bx - w / 2 + 4, by + 4, w - 8, h - 8, '#f4ecd8');
    for (const [cx2, cy2] of [[bx - w / 2 + 4, by + 4], [bx + w / 2 - 6, by + 4], [bx - w / 2 + 4, by + h - 6], [bx + w / 2 - 6, by + h - 6]]) R(c, cx2, cy2, 2, 2, '#c8a040');
    const tx = (s, y, col, z) => TX(c, s, bx - textSpr(s, z, col).width / 2, y, col, z, null);
    tx('RESTAURANT', by + 5, '#3c2c20', 16); tx('西洋料理店', by + 21, '#a8301c', 16); tx('山猫軒', by + 37, '#1c1c1c', 16);
  }
}

/* --- the corridor in one-point perspective, with an ornate door at the end --- */
const VP = { x0: 104, x1: 216, y0: 26, y1: 150 }; // back wall rectangle
function corridor(c, t, o = {}) {
  const wall = o.wall || ['#8c3c34', '#6c2c28', '#4c1c1c'], door = o.door || ['#6c3c24', '#4c2818', '#2c1810'];
  // ceiling, side walls, floor
  PF(c, [0, 0, W, 0, VP.x1, VP.y0, VP.x0, VP.y0], '#2c1c18'); for (let k = 1; k < 5; k++) { const u = k / 5; L(c, lerp(0, VP.x0, u), lerp(0, VP.y0, u), lerp(W, VP.x1, u), lerp(0, VP.y0, u), '#3c2820'); }
  PF(c, [0, 0, VP.x0, VP.y0, VP.x0, VP.y1, 0, 230], wall[1]); PF(c, [W, 0, VP.x1, VP.y0, VP.x1, VP.y1, W, 230], wall[2]);
  // damask wallpaper stripes (perspective) and wainscot
  for (let k = 0; k < 9; k++) { const u = k / 9; const xl = lerp(0, VP.x0, u), xr = lerp(W, VP.x1, u); L(c, xl, lerp(0, VP.y0, u), xl, lerp(230, VP.y1, u) - lerp(46, 22, u), wall[0]); L(c, xr, lerp(0, VP.y0, u), xr, lerp(230, VP.y1, u) - lerp(46, 22, u), wall[1]);
    for (let m = 0; m < 4; m++) { const yy = lerp(lerp(20, VP.y0 + 6, u), lerp(170, VP.y1 - 30, u), m / 3); P(c, xl + 4 * (1 - u), yy, '#c8a040'); P(c, xr - 4 * (1 - u), yy, '#a8803c'); } }
  PF(c, [0, 184, VP.x0, VP.y1 - 22, VP.x0, VP.y1, 0, 230], '#3c2418'); PF(c, [W, 184, VP.x1, VP.y1 - 22, VP.x1, VP.y1, W, 230], '#2c1810'); L(c, 0, 184, VP.x0, VP.y1 - 22, '#c8a040'); L(c, W, 184, VP.x1, VP.y1 - 22, '#a8803c');
  PF(c, [0, 230, VP.x0, VP.y1, VP.x1, VP.y1, W, 230, W, H, 0, H], '#5c3424');
  for (let k = -6; k <= 6; k++) L(c, 160 + k * 12, VP.y1, 160 + k * 60, H, '#4c2a1c');
  PF(c, [70, H, 136, VP.y1, 184, VP.y1, 250, H], '#8c1c1c'); L(c, 70, H, 136, VP.y1, '#d8a838'); L(c, 250, H, 184, VP.y1, '#d8a838'); L(c, 78, H, 138, VP.y1, '#5c1010'); L(c, 242, H, 182, VP.y1, '#5c1010');
  // wall sconces with flickering light
  for (const [sx, sy, side] of [[24, 70, -1], [70, 54, -1], [296, 70, 1], [250, 54, 1]]) { const f = 0.8 + 0.2 * Math.sin(t * 9 + sx) * Math.sin(t * 5.3 + sy); glow(c, sx, sy, 22 * f, 18 * f, '#f8c060', 2 * (0.14)); R(c, sx - 1, sy, 3, 8, '#c8a040'); E(c, sx, sy - 2, 2, 3, '#fff0a0'); }
  // back wall and the door
  R(c, VP.x0, VP.y0, VP.x1 - VP.x0, VP.y1 - VP.y0, wall[0]); for (let x = VP.x0 + 4; x < VP.x1; x += 10) R(c, x, VP.y0, 1, VP.y1 - VP.y0 - 18, wall[1]); R(c, VP.x0, VP.y1 - 18, VP.x1 - VP.x0, 18, '#3c2418');
  const dx0 = 128, dx1 = 192, dy0 = 44;
  R(c, dx0 - 6, dy0 - 8, dx1 - dx0 + 12, VP.y1 - dy0 + 8, '#c8a040'); R(c, dx0 - 4, dy0 - 6, dx1 - dx0 + 8, VP.y1 - dy0 + 6, '#2c1810');
  PF(c, [dx0 - 8, dy0 - 8, 160, dy0 - 20, dx1 + 8, dy0 - 8], '#c8a040'); PF(c, [dx0 - 4, dy0 - 9, 160, dy0 - 17, dx1 + 4, dy0 - 9], '#2c1810');
  R(c, dx0, dy0, dx1 - dx0, VP.y1 - dy0, door[0]); R(c, dx0, dy0, 3, VP.y1 - dy0, door[1]); R(c, dx1 - 3, dy0, 3, VP.y1 - dy0, door[2]);
  if (o.glass) { R(c, dx0 + 6, dy0 + 6, dx1 - dx0 - 12, 60, '#a8c8d8'); for (let k = 0; k < 3; k++) L(c, dx0 + 12 + k * 14, dy0 + 8, dx0 + 8 + k * 14, dy0 + 30, '#e8f4f8'); }
  else for (const [px, py, pw, ph] of [[dx0 + 6, dy0 + 6, 22, 44], [dx1 - 28, dy0 + 6, 22, 44], [dx0 + 6, dy0 + 58, 22, 40], [dx1 - 28, dy0 + 58, 22, 40]]) { R(c, px, py, pw, ph, door[1]); R(c, px + 1, py + 1, pw - 2, ph - 2, door[0]); R(c, px + 1, py + 1, pw - 2, 1, DA('#ffffff', 0.25)); }
  E(c, dx1 - 9, dy0 + 56, 3, 3, '#f8d050'); P(c, dx1 - 10, dy0 + 55, '#fff8c0');
  // a strip of light under the door
  R(c, dx0, VP.y1 - 1, dx1 - dx0, 1, o.lightUnder || '#f8d070');
}
/* gilded plaque with the message, hanging in front of the door */
function plaque(c, lines, col, a = 1, y = 30, cx = 160) {
  if (!lines || !lines.length || a <= 0) return;
  const w = Math.max(...lines.map(s => textSpr(s, 16, col).width)) + 20, h = lines.length * 18 + 12, x = Math.round(cx - w / 2), yy = Math.round(y - (1 - a) * 8);
  c.save(); c.globalAlpha = a;
  L(c, x + 10, yy - 2, cx, yy - 12, '#c8a040'); L(c, x + w - 10, yy - 2, cx, yy - 12, '#c8a040'); E(c, cx, yy - 12, 2, 2, '#f8d050');
  R(c, x + 3, yy + 3, w, h, DA('#000000', 0.45)); R(c, x, yy, w, h, '#c8a040'); R(c, x + 2, yy + 2, w - 4, h - 4, '#1c1410'); R(c, x + 3, yy + 3, w - 6, h - 6, '#2c2018');
  for (const [cx2, cy2] of [[x + 4, yy + 4], [x + w - 6, yy + 4], [x + 4, yy + h - 6], [x + w - 6, yy + h - 6]]) R(c, cx2, cy2, 2, 2, '#f8d050');
  lines.forEach((s, i) => TX(c, s, x + 10, yy + 6 + i * 18, col, 16, '#000000'));
  c.restore();
}
