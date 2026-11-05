/* ================= 記録 (true-story) series helpers: night, snow, captions, people, props ================= */
const K = {
  night0: '#05070f', night1: '#0b1226', night2: '#18223f', night3: '#2c3858',
  snow0: '#f4f8fc', snow1: '#cad6e6', snow2: '#8e9fba', snow3: '#5c6c8c',
  wood0: '#7c6450', wood1: '#5a4638', wood2: '#3a2c26', wood3: '#221a18',
  win0: '#fff0b0', win1: '#f8c860', win2: '#b88830',
  red0: '#f04040', red1: '#c81818', red2: '#7c0c10', red3: '#3c0408',
  paper0: '#f2ead4', paper1: '#d8ccac', ink: '#1c1814',
  cop0: '#34405c', cop1: '#222a40', cop2: '#141a2a', badge: '#f8d860'
};

/* ---- sky / weather ---- */
function nightSky(c, t, h = 140, cols = [K.night0, K.night1, K.night2, K.night3]) {
  VG(c, 0, 0, W, h, cols);
  for (let i = 0; i < 46; i++) { const x = hash(i * 13) * W, y = hash(i * 7 + 3) * h * 0.7, tw = (Math.floor(t * 3 + i * 1.7) % 7) === 0; P(c, x, y, tw ? K.snow2 : (i % 5 ? K.snow3 : K.snow1)); }
}
function moon(c, x, y, r, t) { E(c, x, y, r + 6, r + 6, DA(K.snow1, 0.12)); E(c, x, y, r + 2, r + 2, DA(K.snow1, 0.25)); E(c, x, y, r, r, '#e8ecf0'); E(c, x + 2, y - 1, r * 0.3, r * 0.25, '#c8d0dc'); E(c, x - r * 0.4, y + r * 0.3, r * 0.2, r * 0.18, '#d0d6e0'); }
function snowfall(c, t, n = 60, seed = 1, wind = 8, sp = 18, col = K.snow0) {
  for (let i = 0; i < n; i++) {
    const v = sp * (0.6 + hash(seed + i * 3) * 0.8), y = mod(hash(seed + i) * 260 + t * v, 260) - 10;
    const x = mod(hash(seed + i * 7) * 380 + t * wind * (0.5 + hash(i)) + Math.sin(t * 1.3 + i) * 4, 380) - 30;
    if (i % 4 === 0) R(c, x, y, 2, 2, col); else P(c, x, y, i % 3 ? col : K.snow1);
  }
}
function snowGround(c, y, ox = 0, h = H - y) {
  VG(c, 0, y, W, h, [K.snow1, K.snow2, K.snow3]);
  for (let i = 0; i < 9; i++) { const x = mod(i * 53 - ox, W + 60) - 30; E(c, x, y + 2, 22 + (i * 7 % 10), 4, K.snow1); E(c, x - 3, y + 1, 14, 2.5, K.snow0); }
}
function bareTree(c, x, y, h, seed, col = K.wood3) {
  const r = rngf(seed), br = (x0, y0, a, l, w, d) => {
    const x1 = x0 + Math.cos(a) * l, y1 = y0 + Math.sin(a) * l; L(c, x0, y0, x1, y1, col, w);
    if (d > 0) { br(x1, y1, a - 0.35 - r() * 0.3, l * 0.68, Math.max(1, w - 1), d - 1); br(x1, y1, a + 0.3 + r() * 0.35, l * 0.62, Math.max(1, w - 1), d - 1); }
  };
  br(x, y, -Math.PI / 2 + (r() - 0.5) * 0.2, h * 0.42, 3, 4);
}

/* ---- buildings ---- */
function house(c, x, y, w, h, o = {}) { // x,y = bottom-left
  const wall = o.wall || K.wood1, wall2 = o.wall2 || K.wood2, roof = o.roof || K.wood3, t = o.t || 0;
  R(c, x, y - h, w, h, wall); for (let k = y - h + 3; k < y; k += 3) R(c, x, k, w, 1, wall2);
  const rh = o.rh || Math.round(w * 0.42);
  PF(c, [x - 3, y - h + 1, x + w / 2, y - h - rh, x + w + 3, y - h + 1], roof); L(c, x - 3, y - h, x + w / 2, y - h - rh, o.snow ? K.snow0 : roof, 2); L(c, x + w / 2, y - h - rh, x + w + 3, y - h, o.snow ? K.snow1 : roof, 2);
  if (o.chimney) { R(c, x + w * 0.7, y - h - rh * 0.8, 5, rh * 0.6, K.wood3); }
  (o.windows || []).forEach(([wx, wy, lit], i) => {
    const fl = lit ? (Math.sin(t * 7 + i * 3) > 0.92 ? K.win1 : K.win0) : K.night1;
    R(c, x + wx - 1, y - h + wy - 1, 9, 10, K.wood3); R(c, x + wx, y - h + wy, 7, 8, fl); R(c, x + wx + 3, y - h + wy, 1, 8, K.wood3); R(c, x + wx, y - h + wy + 3, 7, 1, K.wood3);
    if (lit) { c.fillStyle = DA(K.win1, 0.18); c.fillRect(x + wx - 6, y - h + wy - 4, 19, 18); }
  });
  if (o.door) { R(c, x + o.door, y - 13, 8, 13, K.wood3); P(c, x + o.door + 6, y - 7, K.win2); }
}
function smoke(c, x, y, t, seed = 1) { for (let i = 0; i < 8; i++) { const u = fr(t * 0.25 + i / 8), xx = x + Math.sin(u * 5 + seed + i) * 4 + u * 10, yy = y - u * 40; if (u < 0.95) E(c, xx, yy, 2 + u * 5, 1.5 + u * 3, DA(K.snow2, 0.5 * (1 - u))); } }

/* ---- captions ---- */
/* plate sliding in from the left at t0: lines = ['1957年11月', 'アメリカ・ウィスコンシン州'] */
function capPlate(c, t, t0, lines, y = 8) {
  const k = eOut(sg(t, t0, t0 + 0.45)); if (k <= 0) return;
  const w = Math.max(...lines.map(s => textSpr(s, 16, BR.cream).width)) + 18, h = lines.length * 18 + 8, x = Math.round(-w + (w + 6) * k);
  R(c, x, y, w, h, '#000000'); R(c, x + 1, y + 1, w - 2, h - 2, DA(BR.dark, 0.9)); R(c, x, y, 4, h, BR.orange);
  lines.forEach((s, i) => TX(c, s, x + 10, y + 4 + i * 18, i ? BR.cream : BR.orange, 16, '#000000'));
}
/* big centred caption (title cards) */
function bigCap(c, str, y, size, col, a = 1) { const s = textSpr(str, size, col); const x = Math.round(160 - (s.width - 2) / 2); if (a < 1) { c.drawImage(ditherFade(textSpr(str, size, '#000000'), a, 'bcs' + size), x + 2, y + 2); c.drawImage(ditherFade(s, a, 'bc' + size), x, y); } else { c.drawImage(textSpr(str, size, '#000000'), x + 2, y + 2); c.drawImage(s, x, y); } }

/* ---- people: small side-view figure (faces right; use flip) 18x40, anchor at feet (9, 39) ---- */
const PER_AX = 9, PER_AY = 39;
function personSpr(st, p) {
  const f = p.f == null ? -1 : p.f, key = 'per' + (st.id || '') + (p.id || '');
  return SPR(key, 18, 40, c => {
    const sw = f < 0 ? 0 : [0, 3, 0, -3][f & 3], bob = f < 0 ? 0 : (f & 1);
    // legs
    L(c, 8, 27 - bob, 8 + sw, 38, st.pants, 2); L(c, 10, 27 - bob, 10 - sw, 38, st.pants2 || st.pants, 2);
    R(c, 7 + sw, 38, 4, 1, K.wood3); R(c, 9 - sw, 38, 4, 1, K.wood3);
    // body (coat)
    R(c, 5, 12 - bob, 9, 16, st.coat); R(c, 5, 12 - bob, 2, 16, st.coat2); if (st.plaid) for (let yy = 13; yy < 27; yy += 3) R(c, 5, yy - bob, 9, 1, st.coat2);
    if (st.badge) P(c, 12, 15 - bob, K.badge);
    // arm
    const ar = p.arm === 'up' ? [15, 9] : p.arm === 'fwd' ? [17, 18] : [9 - sw * 0.8, 26];
    L(c, 9, 14 - bob, ar[0], ar[1] - bob, st.coat2, 2); P(c, ar[0], ar[1] + 1 - bob, st.skin);
    // head
    E(c, 9.5, 7 - bob, 4, 4.5, st.skin); P(c, 12, 6 - bob, C.k); if (p.shock) { R(c, 11, 5 - bob, 2, 3, C.white); P(c, 12, 6 - bob, C.k); R(c, 12, 9 - bob, 1, 2, '#401010'); }
    // hats
    if (st.hat === 'hunt') { R(c, 5, 1 - bob, 10, 4, st.hatCol); R(c, 7, 1 - bob, 2, 4, st.hatCol2); R(c, 11, 1 - bob, 2, 4, st.hatCol2); R(c, 13, 4 - bob, 4, 1, st.hatCol); R(c, 5, 4 - bob, 3, 5, st.hatCol); }
    else if (st.hat === 'police') { R(c, 5, 1 - bob, 10, 3, st.hatCol); R(c, 12, 4 - bob, 5, 1, K.cop2); P(c, 9, 2 - bob, K.badge); }
    else if (st.hat === 'fedora') { R(c, 3, 3 - bob, 14, 1, st.hatCol); R(c, 6, 0 - bob, 8, 3, st.hatCol); }
    else if (st.hair) { E(c, 9, 3.5 - bob, 4.5, 2.5, st.hair); R(c, 5, 3 - bob, 2, 5, st.hair); }
  });
}
const COP = { id: 'cop', coat: K.cop1, coat2: K.cop2, pants: K.cop2, skin: '#e0b08c', hat: 'police', hatCol: K.cop1, badge: true };
const DET = { id: 'det', coat: '#5c5048', coat2: '#3c342e', pants: '#2c2826', skin: '#e0b08c', hat: 'fedora', hatCol: '#2c2620' };

/* ---- flashlight beam (dithered cone) ---- */
function beam(c, x, y, ang, len, half, a = 0.35, col = '#fff4c8') {
  const p = (r, s) => [x + Math.cos(ang + s) * r, y + Math.sin(ang + s) * r];
  const [ax, ay] = p(len, -half), [bx, by] = p(len, half);
  PF(c, [x, y, ax, ay, bx, by], DA(col, a * 0.6)); const [cx2, cy2] = p(len * 0.9, -half * 0.5), [dx, dy] = p(len * 0.9, half * 0.5); PF(c, [x, y, cx2, cy2, dx, dy], DA(col, a));
  E(c, (ax + bx) / 2, (ay + by) / 2, half * len * 0.9, half * len * 0.6, DA(col, a * 0.5));
}
/* darkness with a circular "flashlight" hole */
function darkness(c, cx, cy, r, a = 0.92) {
  const im = c.getImageData(0, 0, W, H), d = im.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const dd = Math.hypot(x - cx, y - cy) / r, th = BAYER8[(y & 7) * 8 + (x & 7)];
    const k = clamp((dd - 0.6) / 0.5, 0, 1) * a; if (th < k) { const i = (y * W + x) * 4; d[i] = d[i] * 0.08; d[i + 1] = d[i + 1] * 0.08; d[i + 2] = d[i + 2] * 0.12; }
  }
  c.putImageData(im, 0, 0);
}

/* ---- newspaper (spins in) ---- */
function paperSpr(id, head, sub, date) {
  return cached('paper' + id, () => {
    const [cv, x] = mk(150, 104);
    R(x, 0, 0, 150, 104, K.paper0); x.fillStyle = DP(K.paper0, K.paper1, 3); x.fillRect(0, 0, 150, 104);
    R(x, 0, 0, 150, 1, K.paper1); R(x, 0, 103, 150, 1, K.paper1);
    TX(x, date || '', 6, 3, K.ink, 16, null); R(x, 4, 21, 142, 1, K.ink); R(x, 4, 23, 142, 1, K.ink);
    TX(x, head, 6, 27, K.red1, 16, null); TX(x, sub || '', 6, 46, K.ink, 16, null);
    for (let r = 0; r < 6; r++) for (let col = 0; col < 3; col++) { const yy = 68 + r * 6; R(x, 6 + col * 48, yy, 40 - (r * 7 + col * 3) % 9, 2, DP(K.paper1, K.ink, 6)); }
    R(x, 104, 64, 40, 34, '#9c9488'); R(x, 106, 66, 36, 30, '#6c665c');
    return cv;
  });
}
function spinPaper(c, spr, cx, cy, u) { // u 0..1 spin-in
  const k = eOut(u), s = Math.max(0.05, k * 1.0), rot = (1 - k) * Math.PI * 4;
  blit(c, spr, cx, cy, spr.width / 2, spr.height / 2, { s, rot });
}

/* ---- calendar / year card ---- */
function yearCard(c, x, y, year, sub) {
  const w = 96, h = sub ? 66 : 50;
  R(c, x, y, w, h, '#000000'); R(c, x + 1, y + 1, w - 2, h - 2, K.paper0); R(c, x + 1, y + 1, w - 2, 12, K.red1);
  for (const rx of [18, 74]) { R(c, x + rx, y - 3, 4, 7, K.wood3); }
  const s = String(year), sw = textSpr(s, 32, K.ink).width; TX(c, s, x + w / 2 - sw / 2, y + 14, K.ink, 32, null);
  if (sub) { const w2 = textSpr(sub, 16, K.ink).width; TX(c, sub, x + w / 2 - w2 / 2, y + 46, K.red2, 16, null); }
}

/* ---- film strip ---- */
function filmFrame(c, x, y, w, h, fn) {
  R(c, x - 6, y - 8, w + 12, h + 16, '#141414');
  for (let k = 0; k < w + 12; k += 8) { R(c, x - 4 + k, y - 6, 4, 3, '#d8d8d0'); R(c, x - 4 + k, y + h + 3, 4, 3, '#d8d8d0'); }
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); fn(c, x, y, w, h); c.restore();
}

/* ---- memorial candles (n lit in rows), balloons ---- */
function candle(c, x, y, t, i, lit = 1) {
  R(c, x - 1, y - 7, 3, 7, '#ece4d0'); R(c, x - 1, y - 7, 1, 7, '#fcf8ec'); R(c, x - 2, y, 5, 1, '#8c7c68');
  if (lit <= 0) return;
  const f = Math.sin(t * 9 + i * 1.7) * 0.5 + Math.sin(t * 13 + i) * 0.3;
  E(c, x, y - 12, 6, 7, DA(K.win1, 0.18 * lit)); E(c, x, y - 10, 1.5, 2.5 + f * 0.6, K.win1); P(c, x, y - 10, '#fffce8');
}
function candleRows(c, t, n, shown, x0, y0, cols = 11, dx = 22, dy = 18) {
  for (let i = 0; i < n; i++) { const r = Math.floor(i / cols), k = i % cols, off = r % 2 ? dx / 2 : 0;
    candle(c, x0 + k * dx + off, y0 + r * dy, t, i, clamp(shown - i, 0, 1)); }
}
function balloon(c, x, y, col, col2, t, i = 0) {
  const sw = Math.sin(t * 1.6 + i) * 2;
  L(c, x, y + 9, x + sw, y + 30, '#d8d8d8'); E(c, x, y, 7, 9, col2); E(c, x - 0.5, y - 0.5, 6.5, 8.5, col); R(c, x - 3, y - 5, 2, 3, C.white); PF(c, [x - 2, y + 10, x + 2, y + 10, x, y + 8], col2);
}
