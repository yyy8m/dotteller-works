/* ================= shared scenery pieces ================= */
/* clip-safe: shading above may spill outside shape; mask again with alpha of puffs */
function cloudSpr(seed, w, h, cols) {
  return cached('cl' + seed + w + h + cols[0], () => {
    const [m, mx] = mk(w + 2, h + 2); mx.translate(1, 1);
    const n = Math.max(3, Math.round(w / 12));
    const shape = c => { for (let i = 0; i < n; i++) { const cx = w * (0.12 + 0.76 * i / (n - 1)), rr = h * (0.26 + hash(seed * 31 + i) * 0.22), cy = h - rr - 1 - hash(seed * 7 + i) * h * 0.18 * Math.sin(i / (n - 1) * Math.PI); E(c, cx, cy, rr * 1.25, rr, cols[0]); } E(c, w / 2, h * 0.45, w * 0.26, h * 0.38, cols[0]); R(c, w * 0.12, h * 0.72, w * 0.76, h * 0.28 - 1, cols[0]); };
    return SPR(null, w, h, c => {
      shape(c);
      c.globalCompositeOperation = 'source-atop';
      for (let y = Math.floor(h * 0.55); y < h; y++) { c.fillStyle = DP(C.tr, cols[1], (y - h * 0.55) / (h * 0.45) * 15); c.fillRect(-1, y, w + 2, 1); }
      c.fillStyle = DP(C.tr, cols[3] || cols[0], 6); c.fillRect(-1, 0, w + 2, Math.floor(h * 0.3));
      c.globalCompositeOperation = 'source-over';
    }, null, cols[2]);
  });
}
function lotusPetal(c, bx, by, ang, len, wid, fill, edge) {
  const ca = Math.sin(ang), cb = -Math.cos(ang), nx = -cb, ny = ca;
  const pts = (l, w) => [bx, by, bx + ca * l * 0.45 + nx * w, by + cb * l * 0.45 + ny * w, bx + ca * l, by + cb * l, bx + ca * l * 0.45 - nx * w, by + cb * l * 0.45 - ny * w];
  PF(c, pts(len + 1.2, wid + 1), edge); PF(c, pts(len, wid), fill);
  L(c, bx + ca * len * 0.55, by + cb * len * 0.55, bx + ca * (len - 1), by + cb * (len - 1), C.lotus0);
}
function lotus(c, x, y, s, open, t, seed = 0) { // s scale, open 0..1
  const sw = Math.sin(t * 1.3 + seed) * 0.06;
  const spread = lerp(0.12, 0.95, open), L0 = 8 * s, Wd = 2.6 * s;
  const back = [-2, -1, 0, 1, 2];
  for (const k of back) lotusPetal(c, x, y, sw + k * spread * 0.55, L0 * 0.95, Wd, C.lotus2, C.lotus3);
  if (open > 0.45) { E(c, x, y - 2 * s, 2.6 * s, 1.6 * s, C.gold2); E(c, x, y - 2.4 * s, 2 * s, 1 * s, C.gold1); }
  for (const k of [-1.5, -0.5, 0.5, 1.5]) lotusPetal(c, x, y + 1, sw + k * spread * 0.62, L0 * 0.8, Wd * 1.05, C.lotus1, C.lotus2);
  lotusPetal(c, x, y + 1, sw, L0 * 0.7 * (1 - open * 0.3), Wd, C.lotus0, C.lotus2);
}
function lotusPad(c, x, y, rx, ry, a = 0) {
  E(c, x, y + 1, rx + 1, ry + 1, C.leaf3); E(c, x, y, rx, ry, C.leaf1);
  E(c, x - rx * 0.15, y - ry * 0.2, rx * 0.7, ry * 0.55, DP(C.leaf1, C.leaf0, 6));
  PF(c, [x, y, x + rx * Math.cos(a - 0.25), y + ry * Math.sin(a - 0.25) + 1, x + rx * Math.cos(a + 0.25), y + ry * Math.sin(a + 0.25) + 1], C.leaf3);
  for (let i = 1; i < 6; i++) { const b = a + i / 6 * TAU; L(c, x, y, x + Math.cos(b) * rx * 0.8, y + Math.sin(b) * ry * 0.8, C.leaf2); }
}
function ripple(c, x, y, age, life, size, col) {
  if (age < 0 || age > life) return; const q = age / life, r = 2 + q * size;
  ER(c, x, y, r, r * 0.32, DA(col, 1 - q)); if (q > 0.15) ER(c, x, y, r * 0.6, r * 0.2, DA(col, (1 - q) * 0.7));
}
function star4(c, x, y, s, col, col2) { // twinkle
  L(c, x - s, y, x + s, y, col); L(c, x, y - s, x, y + s, col); if (s > 2) { P(c, x - 1, y - 1, col2); P(c, x + 1, y + 1, col2); P(c, x + 1, y - 1, col2); P(c, x - 1, y + 1, col2); } P(c, x, y, C.white);
}
function flame(c, x, y, s, t, i) {
  const f = Math.floor(t * 12) + i * 7;
  const lay = [[C.hell4, 1], [C.hell5, 0.72], [C.hell6, 0.46], [C.hell7, 0.22]];
  for (const [col, k] of lay) {
    const h = s * k * (1.6 + hash(f * 3 + k * 10) * 0.6), w = s * k * 0.55, tx = (hash(f * 5 + k * 7) - 0.5) * s * 0.5;
    PF(c, [x - w, y, x - w * 0.8, y - h * 0.45, x + tx, y - h, x + w * 0.8, y - h * 0.45, x + w, y], col);
  }
}
function embers(c, t, n, seed, area, cols) {
  for (let i = 0; i < n; i++) {
    const sp = 0.06 + hash(seed + i) * 0.12, ph = fr(t * sp + hash(seed + i * 3)), x = area[0] + hash(seed + i * 7) * area[2] + Math.sin(t * (1 + hash(i) * 2) + i) * 8;
    const y = area[1] + area[3] - ph * (area[3] + 10);
    if (hash(i * 13 + Math.floor(t * 10)) < 0.15) continue;
    const col = cols[Math.min(cols.length - 1, Math.floor(ph * cols.length))];
    R(c, x, y, hash(i * 5) > 0.75 ? 2 : 1, hash(i * 5) > 0.75 ? 2 : 1, col);
  }
}
function needleMountains(c, ox, y, w, h, seed, col, hi) {
  for (let i = 0; i < 40; i++) {
    const x = ox + hash(seed + i) * w, hh = h * (0.35 + hash(seed + i * 3) * 0.65), bw = 6 + hash(i + seed * 5) * 10;
    PF(c, [x - bw, y, x, y - hh, x + bw, y], col);
    if (hi) L(c, x, y - hh, x - bw * 0.4, y - hh * 0.6, hi);
  }
}
/* blood pond wave band */
function waveBand(c, y, amp, k, sp, t, col, crest, x0 = 0, w = W, yBottom = H) {
  const pts = [x0, yBottom];
  for (let x = x0; x <= x0 + w; x += 4) pts.push(x, y + Math.sin(x * k + t * sp) * amp + Math.sin(x * k * 2.3 - t * sp * 0.7) * amp * 0.4);
  pts.push(x0 + w, yBottom); PF(c, pts, col);
  if (crest) for (let x = x0; x <= x0 + w; x += 2) { const yy = y + Math.sin(x * k + t * sp) * amp + Math.sin(x * k * 2.3 - t * sp * 0.7) * amp * 0.4; if (Math.sin(x * k + t * sp + 1.2) > 0.55) P(c, x, yy, crest); }
}
function waveY(x, y, amp, k, sp, t) { return y + Math.sin(x * k + t * sp) * amp + Math.sin(x * k * 2.3 - t * sp * 0.7) * amp * 0.4; }
function miniSinner(c, x, y, t, i, col, col2) {
  const a1 = 1.2 + Math.sin(t * (3 + i % 3) + i) * 0.6, a2 = 1.9 + Math.sin(t * (2.6 + i % 2) + i * 2) * 0.6;
  L(c, x - 2, y, x - 2 - Math.cos(a1) * 5, y - Math.sin(a1) * 5, col2); L(c, x + 2, y, x + 2 + Math.cos(a2) * -5 * -1, y - Math.sin(a2) * 5, col2);
  E(c, x, y + 2, 3, 3, col); E(c, x, y - 3, 2.5, 2.5, col); P(c, x - 1, y - 3, C.k); P(c, x + 1, y - 3, C.k);
}
function splashFx(c, x, y, u, big, seed, cols) {
  if (u < 0 || u > 2.4) return;
  const n = Math.round(16 + big * 44);
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (hash(seed + i) - 0.5) * 2.2, sp = (70 + hash(seed + i * 3) * 170) * (0.55 + big * 0.7);
    const px = x + Math.cos(a) * sp * u, py = y + Math.sin(a) * sp * u + 260 * u * u;
    if (py > y + 3) continue; const s = hash(i + seed) > 0.5 ? 2 : 1;
    R(c, px, py, s + 1, s + 1, i % 4 === 0 ? C.white : i % 3 ? cols[0] : cols[1]);
  }
  if (u < 1.0) { // crown
    const h = big * 46 * Math.sin(Math.PI * u / 1.0), w = 8 + big * 14 + u * 16;
    for (let k = -4; k <= 4; k++) { const xx = x + k * w / 4, hh = h * (1 - Math.abs(k) / 5.5) * (0.75 + hash(seed + k + 9) * 0.5); if (hh < 1) continue; PF(c, [xx - 2.5, y + 1, xx, y - hh, xx + 2.5, y + 1], k & 1 ? cols[0] : cols[2]); P(c, xx, y - hh, cols[1]); E(c, xx, y - hh - 2, 1.5, 1.5, cols[1]); }
  }
  if (big > 0.6 && u > 0.35 && u < 1.6) { // rebound jet
    const q = (u - 0.35) / 1.25, hh = 60 * Math.sin(Math.PI * q);
    PF(c, [x - 3, y + 1, x - 1, y - hh, x + 1, y - hh, x + 3, y + 1], cols[0]); L(c, x, y, x, y - hh, cols[1]); E(c, x, y - hh - 3, 3, 3, cols[1]);
  }
  if (u < 0.12) E(c, x, y - 4, 16 * big + 6, 8 * big + 3, DA(C.white, 0.8));
  for (let r = 0; r < 3; r++) { const q = u - r * 0.25; if (q > 0 && q < 2) ER(c, x, y + 1, 4 + q * (26 + big * 30), (4 + q * (26 + big * 30)) * 0.25, DA(cols[1], 1 - q / 2)); }
}
/* sweat / water drop */
function drop(c, x, y, col) { P(c, x, y - 1, col); R(c, x - 1, y, 3, 2, col); P(c, x, y, C.white); }
function exclaim(c, x, y, age) { // bouncy "!"
  if (age < 0) return;
  const s = age < 0.12 ? age / 0.12 * 1.5 : age < 0.3 ? lerp(1.5, 0.85, (age - 0.12) / 0.18) : age < 0.42 ? lerp(0.85, 1.05, (age - 0.3) / 0.12) : 1;
  const by = y - Math.abs(Math.sin(age * 9)) * 3 * Math.exp(-age * 2.5);
  const spr = cached('excl', () => SPR(null, 11, 15, c => { R(c, 1, 0, 9, 13, C.white); R(c, 0, 1, 11, 11, C.white); R(c, 4, 2, 3, 6, '#e03030'); R(c, 4, 9, 3, 2, '#e03030'); PF(c, [3, 12, 7, 12, 3, 15], C.white); }));
  blit(c, spr, x, by, 6, 16, { s: Math.max(0.1, s) });
}
