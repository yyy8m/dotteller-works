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
  if (window.__uiCollect) { window.__uiCollect.push(['cap', t, t0, lines]); return; }
  if (window.__uiq) { window.__uiq.push(cc => { const q = window.__uiq; window.__uiq = null; capPlate(cc, t, t0, lines, y); window.__uiq = q; }); return; }
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
    // body (coat) / dress
    if (st.dress) { PF(c, [5, 22 - bob, 14, 22 - bob, 16, 36, 3, 36], st.dress); R(c, 4, 35, 13, 1, st.coat2); }
    R(c, 5, 12 - bob, 9, 16, st.coat); R(c, 5, 12 - bob, 2, 16, st.coat2); if (st.plaid) for (let yy = 13; yy < 27; yy += 3) R(c, 5, yy - bob, 9, 1, st.coat2);
    if (st.badge) P(c, 12, 15 - bob, K.badge);
    // arm
    const ar = p.arm === 'up' ? [15, 9] : p.arm === 'fwd' || p.arm === 'aim' ? [17, 17] : p.arm === 'stab' ? [16, 4] : p.arm === 'dig' ? [16, 24] : [9 - sw * 0.8, 26];
    L(c, 9, 14 - bob, ar[0], ar[1] - bob, st.coat2, 2); P(c, ar[0], ar[1] + 1 - bob, st.skin);
    if (p.weapon === 'rifle') { L(c, 6, 18 - bob, 17, 16 - bob, '#5c3c24', 2); L(c, 13, 16 - bob, 17, 15 - bob, '#3c3c44', 1); }
    if (p.weapon === 'pistol') { R(c, ar[0], ar[1] - 2 - bob, 4, 2, '#2c2c34'); P(c, ar[0], ar[1] - bob, '#2c2c34'); }
    if (p.weapon === 'bottle') { R(c, ar[0] - 1, ar[1] - 4 - bob, 2, 5, '#3c6c3c'); }
    if (p.weapon === 'book') { R(c, ar[0] - 2, ar[1] - 3 - bob, 5, 4, '#1c1c1c'); }
    if (p.weapon === 'register') { R(c, ar[0] - 6, ar[1] - 6 - bob, 10, 7, '#8c8c94'); R(c, ar[0] - 5, ar[1] - 5 - bob, 8, 2, '#5c5c64'); }
    if (p.weapon === 'knife') { L(c, ar[0], ar[1] - bob, ar[0] + 1, ar[1] - 5 - bob, '#d8dce4'); }
    if (p.weapon === 'shovel') { L(c, ar[0] - 6, ar[1] - 10 - bob, ar[0] + 1, ar[1] + 8 - bob, '#7c5c3c'); R(c, ar[0], ar[1] + 7 - bob, 3, 4, '#8c8c94'); }
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
  if (window.__uiCollect) { window.__uiCollect.push(['year', year, sub]); return; }
  if (window.__uiq) { window.__uiq.push(cc => { const q = window.__uiq; window.__uiq = null; yearCard(cc, x, y, year, sub); window.__uiq = q; }); return; }
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


/* ---- blood, bodies, guns (dot style) ---- */
const BLOOD = ['#5c080c', '#8c1014', '#c01c1c', '#e84040'];
function bloodPool(c, x, y, r, seed = 1) {
  if (r <= 0.5) return;
  E(c, x, y, r, r * 0.36, BLOOD[0]); E(c, x - 1, y - 0.5, r * 0.82, r * 0.28, BLOOD[1]); E(c, x - r * 0.35, y - r * 0.1, r * 0.22, r * 0.07, BLOOD[3]);
  for (let i = 0; i < 6; i++) { const a = hash(seed + i) * TAU, d = r * (0.9 + hash(seed * 3 + i) * 0.4); E(c, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.36, 1 + hash(seed + i * 7) * r * 0.18, 1 + hash(seed + i * 7) * r * 0.07, BLOOD[0]); }
}
function bloodSplat(c, x, y, s, seed = 1, k = 1) { // burst of drops, k = 0..1 progress
  for (let i = 0; i < 16; i++) { const a = -Math.PI * (0.1 + hash(seed + i) * 0.8) + (hash(seed * 5 + i) > 0.7 ? Math.PI : 0), d = s * (0.3 + hash(seed * 2 + i) * 0.9) * k;
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * 0.7 + d * d * 0.004; R(c, px, py, i % 4 ? 1 : 2, i % 4 ? 1 : 2, BLOOD[i % 3 + 1]); }
}
function bloodDrip(c, x, y0, len, t, seed = 1) { // a streak with a drop falling
  R(c, x, y0, 1, len, BLOOD[1]); P(c, x, y0 + len, BLOOD[2]);
  const u = fr(t * 0.7 + hash(seed)); E(c, x, y0 + len + u * 30, 1, 1.4, BLOOD[2]);
}
function bloodTrail(c, pts, seed = 1) { for (let i = 0; i + 3 < pts.length; i += 2) { const n = Math.ceil(Math.hypot(pts[i + 2] - pts[i], pts[i + 3] - pts[i + 1]) / 5); for (let k = 0; k < n; k++) { const u = k / n; R(c, lerp(pts[i], pts[i + 2], u) + (hash(seed + i * 9 + k) - 0.5) * 3, lerp(pts[i + 1], pts[i + 3], u) + (hash(seed + k) - 0.5) * 2, 2, 1, BLOOD[k % 2]); } } }
/* a person lying on the floor (side view sprite rotated), dir 1 = head to the right */
function lyingBody(c, st, x, y, dir = 1, o = {}) {
  const spr = personSpr(st, { f: -1, id: 'lie' + (o.id || ''), shock: o.shock });
  blit(c, o.dark ? tintSpr(spr, o.dark, 'lyd' + (o.id || '')) : spr, x, y, 9, 20, { rot: dir * Math.PI / 2 });
}
function sheetBody(c, x, y, w = 40) { E(c, x, y, w / 2, 6, '#c8c8c0'); E(c, x - 1, y - 1, w / 2 - 2, 5, '#e8e8e0'); E(c, x - w / 2 + 6, y - 3, 6, 5, '#e8e8e0'); }
function muzzleFlash(c, x, y, dir = 1, k = 1) { if (k <= 0) return; PF(c, [x, y - 4, x + dir * 14, y, x, y + 4], '#fff4b0'); PF(c, [x, y - 2, x + dir * 8, y, x, y + 2], C.white); E(c, x, y, 18, 12, DA('#fff4b0', 0.3 * k)); }
function flashScreen(c, a, col = '#ffffff') { if (a > 0) { c.fillStyle = DA(col, a); c.fillRect(0, 0, W, H); } }
function redVignette(c, a = 0.5) { for (let r = 0; r < 6; r++) { c.fillStyle = DA(BLOOD[0], a * (r + 1) / 8); c.fillRect(0, 0, W, 4 + r * 3); c.fillRect(0, H - 4 - r * 3, W, 4 + r * 3); c.fillRect(0, 0, 4 + r * 4, H); c.fillRect(W - 4 - r * 4, 0, 4 + r * 4, H); } }
/* black shadow of a sprite cast on a wall (big, slightly distorted) */
function wallShadow(c, spr, x, y, s, id) { blit(c, tintSpr(spr, '#0a0608', id || 'wsh'), x, y, spr.width / 2, spr.height, { sx: s * 1.1, sy: s * 1.4 }); }

/* ---- rooms ---- */
function roomBg(c, o = {}) {
  const wall = o.wall || '#5c4c3c', wall2 = o.wall2 || '#4c3c30', floor = o.floor || '#3c2c22', fy = o.fy || 150;
  R(c, 0, 0, W, fy, wall); for (let x = 0; x < W; x += 12) R(c, x, 0, 4, fy, wall2);
  R(c, 0, fy - 28, W, 28, o.wains || '#3c2c22'); R(c, 0, fy - 30, W, 2, '#6c5444');
  R(c, 0, fy, W, H - fy, floor); for (let y = fy + 6; y < H; y += 8) R(c, 0, y, W, 1, '#2c2018');
  if (o.window) { const [wx, wy] = o.window; R(c, wx, wy, 40, 44, '#2c2018'); VG(c, wx + 3, wy + 3, 34, 38, [K.night0, K.night1, K.night2]); R(c, wx + 19, wy, 2, 44, '#2c2018'); R(c, wx, wy + 20, 40, 2, '#2c2018'); }
  if (o.lamp) { const [lx, ly] = o.lamp; L(c, lx, 0, lx, ly, '#1c1410'); PF(c, [lx - 8, ly + 8, lx - 4, ly, lx + 4, ly, lx + 8, ly + 8], '#c8a048'); E(c, lx, ly + 30, 60, 40, DA(K.win0, 0.08)); }
}
function fireHouse(c, x, y, w, h, t, k = 1) { // a burning wooden house
  house(c, x, y, w, h, { wall: '#3c2418', wall2: '#2c1810', roof: '#1c100c', rh: 24, windows: [[8, 10, true], [w - 16, 10, true], [8, h - 24, true]] , t});
  for (let i = 0; i < 14 * k; i++) flame(c, x + (i * 37 % w), y - h * (0.4 + hash(i) * 0.9), 1 + hash(i * 3) * 1.4, t, i);
  E(c, x + w / 2, y - h, w, h, DA('#f86830', 0.12 * k));
  for (let i = 0; i < 10; i++) { const u = fr(t * 0.3 + i / 10); E(c, x + w / 2 + Math.sin(i * 2 + t) * 20 + u * 30, y - h - 30 - u * 90, 6 + u * 14, 4 + u * 9, DA('#2c2420', 0.6 * (1 - u))); }
}

/* ---- horror close-up: the killer's face out of the dark, lit from below, flickering ---- */
/* spr: 48x48 portrait (SPR, 50x50 with the outline); eyes: [[x, y], ...] in sprite pixels */
function horrorCloseup(c, t, spr, eyes = [], dur = 4) {
  R(c, 0, 0, W, H, '#000000');
  const on = !(fr(t * 1.7) > 0.86 && t > 0.8) && t > 0.25, z = 4.2 + t * 0.35, cx = 160 + Math.sin(t * 9) * (t < 0.6 ? 2 : 0), cy = 112;
  if (on) {
    const [hc, hx] = slot('hcz', Math.ceil(spr.width * z), Math.ceil(spr.height * z)); hx.imageSmoothingEnabled = false; hx.clearRect(0, 0, hc.width, hc.height); hx.drawImage(spr, 0, 0, hc.width, hc.height);
    const x0 = Math.round(cx - hc.width / 2), y0 = Math.round(cy - hc.height / 2);
    c.drawImage(ditherFade(hc, clamp(t / 0.5, 0, 1), 'hczd'), x0, y0);
    for (let r = 0; r < 12; r++) { c.fillStyle = DA('#000000', 0.85 - r * 0.07); c.fillRect(0, r * 10, W, 10); } // lit from below: the top falls into darkness
    c.fillStyle = DA('#c81818', 0.18); c.fillRect(0, 0, W, H);
    E(c, 160, 236, 140, 60, DA('#f86830', 0.12));
    for (const [ex, ey] of eyes) { const gx = x0 + ex * z, gy = y0 + ey * z, g = 0.6 + 0.4 * Math.sin(t * 13); R(c, gx, gy, Math.max(2, z * 0.8), Math.max(2, z * 0.8), DA('#ffffff', g)); E(c, gx + 2, gy + 2, 10, 8, DA('#f84040', 0.25 * g)); }
  }
  for (let i = 0; i < 6; i++) { const y = Math.floor(hash(i * 13 + Math.floor(t * 24)) * H), w = 20 + hash(i * 7 + Math.floor(t * 24)) * 120; if (hash(i + Math.floor(t * 24) * 3) < 0.4) R(c, hash(i * 3 + Math.floor(t * 24)) * W, y, w, 1, DA('#ffffff', 0.25)); } // static
  redVignette(c, 0.8);
  if (t > dur - 0.35) { c.fillStyle = DA('#000000', clamp((t - dur + 0.35) / 0.3, 0, 1)); c.fillRect(0, 0, W, H); }
}

/* ---- horror grade for the 記録 series (applied to every scene after the camera, before captions) ----
   desaturate toward a cold tint, keep blood reds, crush the blacks, vignette, film grain, scanlines,
   and a light flicker; S.sc.grade can override { k: strength 0..1 } or set false */
function horrorGrade(ox, tl, S) {
  const o = S.sc.grade === false ? null : Object.assign({ k: 1 }, S.sc.grade || {}); if (!o) return;
  const im = ox.getImageData(0, 0, W, H), d = im.data, k = o.k;
  const fl = 1 - 0.06 * (hash(Math.floor(tl * 12)) > 0.85 ? 1 : 0) * k, fseed = Math.floor(tl * 15);
  for (let y = 0; y < H; y++) {
    const scan = (y & 1) ? 0.96 : 1, vy = (y - 90) / 110;
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4; let r = d[i], g = d[i + 1], b = d[i + 2];
      const lum = r * 0.3 + g * 0.59 + b * 0.11;
      const red = r > 90 && r > g * 1.7 && r > b * 1.7; // blood / red light stays saturated
      let nr, ng, nb;
      if (red) { nr = r * 1.05; ng = g * 0.7; nb = b * 0.7; }
      else { const hi = clamp((lum - 150) / 80, 0, 1), s = 0.6 + 0.35 * hi, cool = 1 - hi; nr = lum + (r - lum) * s - 6 * cool; ng = lum + (g - lum) * s + 3 * cool; nb = lum + (b - lum) * s + 10 * cool; } // cold shadows, warm lights kept
      const vx = (x - 160) / 160, v = 1 - 0.3 * Math.min(1, (vx * vx + vy * vy) * 0.75); // vignette
      const crush = Math.pow(Math.max(0, lum) / 255, 0.25) ; // darker darks
      const gr = (hash(i * 7 + fseed * 131) - 0.5) * 18; // grain
      const m = 1.08 * scan * v * fl * (0.88 + 0.12 * crush);
      d[i] = lerp(r, nr * m + gr, k); d[i + 1] = lerp(g, ng * m + gr, k); d[i + 2] = lerp(b, nb * m + gr, k);
    }
  }
  if (hash(fseed * 17 + 3) > 0.94) { const y0 = Math.floor(hash(fseed) * (H - 8)), sh = Math.round((hash(fseed * 5) - 0.5) * 10); for (let y = y0; y < y0 + 4; y++) d.copyWithin((y * W + Math.max(0, sh)) * 4, (y * W + Math.max(0, -sh)) * 4, (y * W + W - Math.abs(sh)) * 4); } // rare glitch
  ox.putImageData(im, 0, 0);
}

/* ---- talking portraits: open a dark mouth on a still 48x48 portrait while the line is spoken ---- */
function withMouth(id, base, p, mx, my, w = 6) {
  if (!p || !p.mouth) return base;
  const [c, x] = slot(id, base.width, base.height); x.drawImage(base, 0, 0);
  E(x, mx + 1, my + 1, w / 2 + p.mouth * 0.5, 0.7 + p.mouth * 0.8, '#2c0c0c'); return c;
}
/* lawman portrait 48x48 (deputy / sheriff): peaked cap with badge, square jaw */
function lawFace(id, o = {}) {
  return cached('law' + id, () => SPR(null, 48, 48, c => {
    const sk = o.skin || '#e0b08c', sk2 = '#b48464', cap = o.cap || '#2c3448';
    PF(c, [2, 48, 8, 36, 40, 36, 46, 48], o.coat || '#34405c'); R(c, 20, 36, 8, 12, '#e8e4dc'); L(c, 24, 38, 24, 48, '#5c1c1c', 2); P(c, 14, 40, K.badge); P(c, 15, 40, K.badge);
    R(c, 19, 30, 10, 7, sk2); E(c, 24, 21, 11, 12, sk2); E(c, 23.5, 20.5, 10.5, 11.5, sk); R(c, 15, 28, 18, 4, sk);
    R(c, 11, 5, 26, 9, cap); R(c, 9, 12, 30, 3, '#141824'); R(c, 22, 7, 4, 4, K.badge);
    if (o.grey) { R(c, 13, 15, 3, 6, '#a8a8b0'); R(c, 32, 15, 3, 6, '#a8a8b0'); }
    L(c, 17, 18, 22, 18, '#5c4030'); L(c, 26, 18, 31, 18, '#5c4030'); for (const x0 of [18, 26]) { R(c, x0, 20, 4, 2, '#f4ecdc'); R(c, x0 + 1, 20, 2, 2, C.k); }
    L(c, 24, 21, 23, 26, sk2); R(c, 20, 29, 8, 1, '#7c3c34'); if (o.mustache) R(c, 19, 27, 10, 2, '#4c3424');
  }, null));
}
