/* ================= scenes 1-3 ================= */
/* ---- paradise backdrop shared by S1 / S4 / S7 ---- */
const skyCv = (() => { const [cv, x] = mk(W, 120); VG(x, 0, 0, W, 120, [C.sky0, C.sky1, C.sky2, C.sky3, C.sky4]); return cv; })();
const skyNoonCv = (() => { const [cv, x] = mk(W, 120); VG(x, 0, 0, W, 120, [C.sky1, C.sky2, C.sky3, C.gold0, C.white]); return cv; })();
const palaceCv = (() => {
  const [cv, x] = mk(760, 50);
  const r = rngf(5);
  for (let i = 0; i < 14; i++) { const cx = i * 58 + r() * 20, h = 14 + r() * 16; PF(x, [cx - 40, 50, cx, 50 - h - 10, cx + 40, 50], '#c8c4e8'); PF(x, [cx - 20, 50, cx + 4, 50 - h - 2, cx + 30, 50], '#b4b0dc'); }
  for (let i = 0; i < 6; i++) { // golden pagodas
    const cx = 60 + i * 125 + r() * 30, by = 46;
    for (let k = 0; k < 4; k++) { const ww = 16 - k * 3, yy = by - 6 - k * 7; R(x, cx - ww / 2 + 2, yy + 2, ww - 4, 5, '#e8d8b0'); PF(x, [cx - ww, yy + 2, cx, yy - 3, cx + ww, yy + 2], k & 1 ? C.gold2 : C.gold1); }
    L(x, cx, by - 36, cx, by - 44, C.gold1); P(x, cx, by - 45, C.gold0);
  }
  for (let i = 0; i < 40; i++) { const cx = r() * 760, y = 44 + r() * 6, rr = 4 + r() * 5; E(x, cx, y, rr, rr * 0.8, ['#a8d8a0', '#88c098', '#f8c8d8'][i % 3]); }
  R(x, 0, 47, 760, 3, '#98c890');
  return cv;
})();
function rays(c, t, ox, k = 1) {
  for (let i = 0; i < 5; i++) {
    const x = 20 + i * 70 - ox + Math.sin(t * 0.3 + i) * 6, a = (0.1 + 0.07 * Math.sin(t * (0.9 + i * 0.23) + i * 2)) * k;
    PF(c, [x, -2, x + 18 + i * 2, -2, x + 90, 150, x + 60, 150], DA(C.gold0, a));
  }
}
function paradiseBack(c, t, camX, noon) {
  c.drawImage(noon ? skyNoonCv : skyCv, 0, 0);
  // sun glow
  const sx = 40 - camX * 0.05, fl = 0.85 + 0.15 * Math.sin(t * 2.1);
  E(c, sx, 8, 46, 34, DA(C.gold0, 0.25 * fl)); E(c, sx, 8, 26, 20, DA(C.white, 0.45 * fl)); E(c, sx, 8, 12, 10, C.white);
  // cloud layer A (far, slow)
  const cA = [C.cloud0, C.cloud2, C.cloud2, C.white];
  for (let i = 0; i < 5; i++) { const w = 40 + (i * 13 % 20), x = mod(i * 97 - t * 3 - camX * 0.1, 420) - 60; c.drawImage(cloudSpr(10 + i, w, 14, cA), Math.round(x), 18 + (i * 17 % 26)); }
  c.drawImage(palaceCv, Math.round(-camX * 0.2), 34);
  // cloud layer B (nearer, faster)
  const cB = [C.white, C.cloud1, C.cloud2, C.white];
  for (let i = 0; i < 3; i++) { const w = 70 + i * 12, x = mod(i * 160 - t * 8 - camX * 0.35, 520) - 100; c.drawImage(cloudSpr(30 + i, w, 22, cB), Math.round(x), 2 + i * 9); }
}
/* ripple events: deterministic list [{t,x,y,s}] in world coords */
function koiPos(i, t) {
  const sp = [0.32, 0.25, 0.4][i], cx = [140, 330, 240][i], cy = [178, 160, 205][i], rx = [90, 80, 110][i], ry = [14, 10, 12][i];
  const a = t * sp + i * 2;
  return [cx + Math.cos(a) * rx, cy + Math.sin(a * 1.3) * ry, -Math.sin(a) * rx, Math.cos(a * 1.3) * ry * 1.3];
}
function drawKoi(c, i, t, ox) {
  const cols = [['#f8a060', '#fce8d8', '#d85030'], ['#fcf4e8', '#f86848', '#d8c8b8'], ['#f8c060', '#f8f0d0', '#d88828']][i];
  for (let k = 7; k >= 0; k--) {
    const [x, y] = koiPos(i, t - k * 0.09), r = k === 0 ? 3 : Math.max(1, 3.6 - k * 0.45);
    E(c, x - ox, y, r + 0.5, r * 0.75, DP(cols[k % 3 === 1 ? 1 : 0], C.water2, 6));
    if (k === 7) { const [x2, y2] = koiPos(i, t - 0.75); const w = Math.sin(t * 12 + i) * 2; PF(c, [x - ox, y, x2 - ox + w, y2 - 3, x2 - ox - w, y2 + 3], DP(cols[2], C.water2, 6)); }
  }
}
function petalPath(i, t, seed, wind) { // falling petal; returns [x,y,landed,landT]
  const per = 7 + hash(seed + i) * 5, ph = hash(seed + i * 3) * per, cyc = Math.floor((t + ph) / per), u = (t + ph) - cyc * per;
  const x0 = hash(seed + i * 7 + cyc * 13) * 420 - 40, yl = 132 + hash(seed + i * 11 + cyc) * 60, fallT = (yl + 10) / (14 + hash(i) * 8);
  if (u < fallT) return [x0 + u * wind + Math.sin(u * 2 + i) * 10, -10 + u * (yl + 10) / fallT, false, t - u + fallT];
  return [x0 + fallT * wind + Math.sin(fallT * 2 + i) * 10 + (u - fallT) * 3, yl + Math.sin(u * 2) * 0.5, true, t - u + fallT, u - fallT, per - fallT];
}
function drawPetal(c, x, y, t, i, landed) {
  const f = landed ? 0 : Math.floor(t * 10 + i) & 3;
  const col = i % 3 ? C.lotus1 : C.lotus0;
  if (f === 0) { R(c, x, y, 3, 2, col); P(c, x + 2, y + 1, C.lotus2); } else if (f === 1) { R(c, x, y, 2, 2, col); } else if (f === 2) { R(c, x, y, 1, 3, col); P(c, x, y + 2, C.lotus2); } else R(c, x, y, 2, 1, C.lotus2);
}
function dragonfly(c, x, y, t) {
  const fl = Math.floor(t * 24) & 1;
  L(c, x, y, x + 8, y, '#3c8cbc'); R(c, x - 1, y - 1, 3, 3, '#2c6c9c'); P(c, x - 1, y - 1, C.white);
  if (fl) { L(c, x + 1, y - 1, x + 4, y - 4, C.white); L(c, x + 2, y - 1, x + 6, y - 3, C.cloud1); }
  else { L(c, x + 1, y + 1, x + 4, y + 3, C.white); L(c, x + 2, y + 1, x + 6, y + 2, C.cloud1); }
}
function causeway(c, ox, y) {
  R(c, -4, y, W + 8, 4, C.marble0); R(c, -4, y + 4, W + 8, 1, C.gold1); R(c, -4, y + 5, W + 8, 6, C.marble1); R(c, -4, y + 11, W + 8, 1, C.marble2);
  for (let i = -1; i < 9; i++) { const x = Math.round(i * 48 - mod(ox, 48)); R(c, x + 18, y + 12, 10, 8, C.marble2); R(c, x + 19, y + 12, 3, 8, C.marble1); R(c, x + 16, y + 4, 14, 2, C.gold2); P(c, x + 23, y + 5, C.gold0); }
  for (let x = 0; x < W; x += 8) P(c, x - mod(ox, 8) + 4, y + 1, C.marble1);
}
/* reflection of a sprite in water: flipped, wavy rows, dither-faded, tinted */
function reflect(c, spr, x, y, t, a = 0.55) {
  const w = spr.width, h = spr.height, [cv, x2] = slot('refl', w + 8, h);
  for (let r = 0; r < h; r++) { const off = Math.round(Math.sin(r * 0.45 + t * 3.2) * (1 + r * 0.03)); x2.drawImage(spr, 0, h - 1 - r, w, 1, 4 + off, r, w, 1); }
  x2.globalCompositeOperation = 'source-atop'; x2.fillStyle = DP(C.tr, C.water1, 9); x2.fillRect(0, 0, w + 8, h); x2.globalCompositeOperation = 'source-over';
  c.drawImage(ditherFade(cv, a, 'reflf'), Math.round(x - 4), Math.round(y));
}
function nearWater(c, t, camX, yTop, noon) {
  VG(c, 0, yTop, W, H - yTop, noon ? [C.water0, C.water1, C.water2] : [C.water1, C.water2, C.water3]);
  for (let i = 0; i < 26; i++) { // shimmer
    const y = yTop + 4 + (i * 37 % (H - yTop - 4)), x = mod(i * 71 - camX * (0.8 + (i % 3) * 0.1) + Math.sin(t * 0.8 + i) * 10, W + 40) - 20, l = 4 + (i % 4) * 3;
    if (Math.sin(t * 2 + i * 1.7) > -0.3) R(c, x, y, l, 1, DA(C.water0, 0.8));
  }
}

/* ---------------- Scene 1: 極楽の蓮池 ---------------- */
const S1 = {
  name: '極楽の蓮池', bgm: 'paradise',
  init(S) { const L = S.lines[0]; S.w0 = 0.2; S.w1 = L.se - 0.8; S.x0 = 70; S.x1 = 286; S.look0 = S.w1 + 0.45; S.dur = L.se + 2.6; },
  bud(S, t) {
    const u = sg(t, S.w0, S.w1), a = 1 / 0.9, p = u < 0.8 ? a * u : a * 0.8 + a * (u - 0.8) - 2.5 * a * (u - 0.8) * (u - 0.8);
    const x = lerp(S.x0, S.x1, p), moving = u < 1 && t > S.w0;
    const lk = t < S.look0 ? 0 : t < S.look0 + 0.18 ? -0.4 * sg(t, S.look0, S.look0 + 0.18) : lerp(-0.4, 1, eOut(sg(t, S.look0 + 0.18, S.look0 + 0.7)));
    const settle = !moving && t > S.w1 && t < S.w1 + 0.25 ? 1 : 0;
    return { x, f: moving ? Math.floor((x - S.x0) / 3.4) & 3 : -1, look: lk, settle };
  },
  draw(c, t, S) {
    const b = this.bud(S, t), camX = clamp(b.x - 150, 0, 200);
    paradiseBack(c, t, camX);
    rays(c, t, camX * 0.15);
    // far pond
    VG(c, 0, 80, W, 36, [C.water0, C.water1]);
    for (let i = 0; i < 14; i++) { const x = mod(i * 41 - camX * 0.5, 460) - 40, y = 86 + (i * 7 % 22), bob = Math.sin(t * 1.4 + i) * 0.7; lotusPad(c, x, y + bob, 7 + (i % 3) * 2, 2 + (i % 2), i); if (i % 3 === 0) lotus(c, x + 2, y - 1 + bob, 0.55, 0.7, t, i); }
    for (let i = 0; i < 10; i++) { const x = mod(i * 53 - camX * 0.5 + Math.sin(t + i) * 4, 400) - 40, y = 84 + (i * 11 % 26); if (Math.sin(t * 3 + i) > 0.4) R(c, x, y, 3, 1, C.white); }
    // causeway & buddha
    causeway(c, camX, 114);
    const bs = buddhaSpr({ t, f: b.f, look: b.look, blink: blinkOf(t, 11) });
    const sx = b.x - camX, breath = b.f < 0 ? Math.round(Math.sin(t * 2.2) * 0.6 + 0.4) : 0;
    halo(c, sx + 0, 117 - BUD_AY + BUD_HEAD[1] + breath + b.settle + b.look * 1.5, 11, t);
    blit(c, bs, sx, 118 + breath + b.settle, BUD_AX, BUD_AY);
    // near water, reflection, koi, pads
    nearWater(c, t, camX, 126);
    reflect(c, bs, sx - BUD_AX - 1, 132, t, 0.5);
    for (let i = 0; i < 3; i++) drawKoi(c, i, t, camX);
    // ripples: koi surfacing + petals
    for (let i = 0; i < 3; i++) { const per = 3.1 + i * 0.7; for (let k = -1; k <= 0; k++) { const te = (Math.floor(t / per) + k) * per + i; const [x, y] = koiPos(i, te); ripple(c, x - camX, y, t - te, 1.6, 14, C.water0); } }
    for (let i = 0; i < 9; i++) { const x = mod(i * 67 - camX, 520) - 50, y = 140 + (i * 23 % 34), bob = Math.sin(t * 1.6 + i * 1.3) * 1; lotusPad(c, x, y + bob, 12 + (i % 3) * 3, 3.5 + (i % 2), i * 0.7); if (i % 2 === 0) lotus(c, x + 1, y - 1 + bob, 1, 0.75, t, i); }
    for (let i = 0; i < 12; i++) {
      const p = petalPath(i, t, 101, 10);
      const x = p[0] - camX * 0.9;
      if (p[2]) { ripple(c, x + 1, p[1] + 1, p[4], 1.4, 12, C.white); drawPetal(c, x, p[1], t, i, true); } else drawPetal(c, x, p[1], t, i, false);
    }
    // dragonfly
    const dx = 160 + Math.sin(t * 0.45) * 140 - camX * 0.3, dy = 96 + Math.sin(t * 0.9) * 16 + Math.sin(t * 2.7) * 3;
    dragonfly(c, dx, dy, t);
    // foreground (fast parallax)
    for (let i = 0; i < 4; i++) {
      const x = i * 190 + 60 - camX * 1.6, sw = Math.sin(t * 1.1 + i * 2) * 2;
      if (x < -60 || x > W + 60) continue;
      L(c, x, H, x + sw, 128 + i * 6, C.leaf3, 2); lotus(c, x + sw, 128 + i * 6, 1.7, 0.85, t, i + 3);
      lotusPad(c, x - 26, 224, 34, 9, 0.5); lotusPad(c, x + 30, 236, 30, 8, 2);
    }
    const z = 1 + 0.28 * ss(sg(t, S.look0 + 0.3, S.dur));
    return { z, fx: sx, fy: 150 };
  }
};

/* ---------------- Scene 2: 池の底の地獄 ---------------- */
const hellSkyCv = (() => { const [cv, x] = mk(W, 120); VG(x, 0, 0, W, 120, [C.hell0, C.hell1, C.hell2, C.hell3]); return cv; })();
function hellBack(c, t, ox, oy = 0, noSky) {
  if (!noSky) c.drawImage(hellSkyCv, 0, oy); else VG(c, 0, oy + 60, W, 54, [C.tr, C.hell2]);
  const g = 0.5 + 0.25 * Math.sin(t * 1.7) + 0.1 * Math.sin(t * 5.3);
  E(c, 160 - ox * 0.1, 112 + oy, 200, 30, DA(C.hell4, 0.35 * g));
  if (!noSky) for (let i = 0; i < 4; i++) { const x = mod(i * 110 - t * 4 - ox * 0.15, 460) - 70; E(c, x, 30 + i * 13 + oy, 50, 9, DA(C.hell1, 0.7)); E(c, x + 20, 26 + i * 13 + oy, 30, 7, DA(C.k, 0.4)); }
  needleMountains(c, -ox * 0.2 - 20, 112 + oy, 420, 46, 7, C.rock2, C.hell3);
  needleMountains(c, -ox * 0.35 - 30, 114 + oy, 440, 28, 21, C.rock1, C.hell4);
  for (let i = 0; i < 6; i++) { const x = mod(i * 63 - ox * 0.35, 400) - 40; flame(c, x, 114 + oy, 5, t, i); }
}
const S2 = {
  name: '池の底の地獄', bgm: 'hell',
  init(S) { const L = S.lines[0]; S.dur = L.se + 2.2; S.clear = 3.0; },
  oniF(t) { const per = 2.6, u = fr((t + 0.9) / per); return u < 0.45 ? 0 : u < 0.6 ? 1 : u < 0.68 ? 2 : u < 0.76 ? 3 : u < 0.93 ? 4 : 0; },
  oniHits(t0, t1) { const per = 2.6, out = []; for (let k = Math.floor((t0 + 0.9) / per) - 1; k <= Math.ceil((t1 + 0.9) / per); k++) { const te = k * per + 0.69 * per - 0.9; if (te >= t0 && te < t1) out.push(te); } return out; },
  draw(c, t, S) {
    const ox = Math.sin(t * 0.2) * 12 + t * 1.5;
    hellBack(c, t, ox);
    // pond back wave
    waveBand(c, 114, 1.5, 0.08, 0.7, t, C.blood1, C.blood2);
    for (let i = 0; i < 9; i++) { const x = mod(i * 43 + 10 - ox * 0.6, 400) - 40, y = waveY(x, 118, 1.5, 0.08, 0.7, t) + Math.sin(t * (1.3 + i * 0.17) + i) * 1.5; miniSinner(c, x, y, t, i, C.sin1, C.sin2); }
    waveBand(c, 122, 2, 0.06, -1.2, t, C.blood2, C.blood3);
    // bubbles
    for (let i = 0; i < 10; i++) {
      const per = 2.2 + hash(i) * 2, u = fr(t / per + hash(i * 5)), x = mod(i * 37 - ox, 340) - 10, y0 = 160 + hash(i * 3) * 50, ys = waveY(x, 124, 2, 0.06, -1.2, t);
      if (u < 0.7) { const y = lerp(y0, ys + 2, u / 0.7); ER(c, x, y, 1.5, 1.5, C.blood4); }
      else if (u < 0.85) { E(c, x, ys - 1, 3, 2.5, C.blood3); ER(c, x, ys - 1, 3, 2.5, C.blood4); P(c, x - 1, ys - 2, C.white); }
      else { const q = (u - 0.85) / 0.15; for (let k = 0; k < 4; k++) P(c, x + Math.cos(k * 1.6 + 0.4) * (3 + q * 5), ys - 2 - Math.sin(k * 1.6 + 0.4) * q * 5 + q * q * 6, C.blood4); }
    }
    // kandata + spotlight
    const kx = 170 - ox * 0.6 + 6, ky = waveY(kx, 130, 2, 0.06, -1.2, t), pulse = 0.5 + 0.5 * Math.sin(t * 3.2);
    PF(c, [kx - 10, -2, kx + 10, -2, kx + 26, ky + 4, kx - 26, ky + 4], DA(C.gold0, 0.05 + 0.07 * pulse));
    PF(c, [kx - 4, -2, kx + 4, -2, kx + 12, ky + 4, kx - 12, ky + 4], DA(C.gold0, 0.05 + 0.08 * pulse));
    E(c, kx, ky - 12, 16 + pulse * 3, 18 + pulse * 3, DA(C.gold0, 0.12 + 0.12 * pulse));
    const pz = kanPose('pond', 0, t);
    const ks = kanFrontSpr({ t, pz, expr: fr(t / 3.4) < 0.6 ? 'scared' : 'angry', blink: blinkOf(t, 21), mouth: Math.floor(t * 6) % 3 === 0 ? 1 : 0 });
    blit(c, ks, kx, ky + 8 + Math.sin(t * 2.3) * 1.5, FIG_AX, FIG_AY);
    ER(c, kx, ky + 6, 18 + pulse * 6, 4 + pulse * 1.5, DA(C.gold0, 0.4 + 0.4 * pulse));
    // near sinners
    for (let i = 0; i < 3; i++) { const x = [90, 250, 40][i] - ox * 0.6, y = waveY(x, 132, 2, 0.06, -1.2, t), f = Math.floor(t * (7 + i * 1.7) + i * 5) & 3; blit(c, sinnerSpr(i, 'pond', f), x, y + 12 + Math.sin(t * (1.7 + i * 0.4) + i) * 2, FIG_AX, FIG_AY); }
    waveBand(c, 138, 2.6, 0.05, 2.0, t, C.blood2, C.blood4);
    waveBand(c, 150, 2, 0.07, 2.6, t, C.blood1, C.blood3);
    VG(c, 0, 170, W, 70, [C.blood1, C.blood0]);
    // oni on rock (right)
    const rx = 262 - ox * 0.8;
    PF(c, [rx - 40, 150, rx - 30, 108, rx - 8, 98, rx + 30, 100, rx + 60, 130, rx + 60, 150], C.rock1); PF(c, [rx - 30, 108, rx - 8, 98, rx + 30, 100, rx + 10, 106], C.rock0);
    const of = this.oniF(t), os = oniSpr({ f: of, t, blink: blinkOf(t, 31) });
    blit(c, os, rx + 10, 104 + (of === 0 ? Math.round(Math.sin(t * 2.6) * 0.8) : 0), 32, 69);
    for (const te of this.oniHits(t - 0.6, t)) { // sparks
      const age = t - te, [tx, ty] = oniClubTip(3, 2), px = rx + 10 - 32 + tx, py = 104 - 69 + ty;
      for (let k = 0; k < 10; k++) { const a = -Math.PI * (0.1 + hash(k + Math.floor(te * 10)) * 0.8), sp = 30 + hash(k * 3) * 50; P(c, px + Math.cos(a) * sp * age, py + Math.sin(a) * sp * age + 90 * age * age, k & 1 ? C.hell7 : C.hell6); }
      if (age < 0.1) E(c, px, py, 6, 4, DA(C.white, 0.8));
    }
    // foreground rocks and flames
    const fx = -ox * 1.4;
    PF(c, [fx - 20, H, fx - 10, 150, fx + 30, 140, fx + 60, 170, fx + 70, H], C.rock2); PF(c, [fx + 330, H, fx + 340, 156, fx + 380, 146, fx + 420, H], C.rock2);
    flame(c, fx + 30, 142, 9, t, 1); flame(c, fx + 50, 160, 7, t, 2); flame(c, fx + 370, 150, 10, t, 3);
    embers(c, t, 40, 7, [0, 0, W, H], [C.hell7, C.hell6, C.hell5, C.hell4]);
    // lotus leaf shadows while still seen through the pond surface
    const wv = 1 - ss(t / S.clear);
    if (wv > 0) { for (let i = 0; i < 4; i++) E(c, [30, 260, 120, 300][i] + Math.sin(t + i) * 4, [20, 40, 210, 190][i], 34, 14, DA(C.leaf3, 0.55 * wv)); }
    let shake = 0; for (const te of this.oniHits(t - 0.2, t)) shake = Math.max(shake, 2 * (1 - (t - te) / 0.2));
    return { z: lerp(1.04, 1.3, ss(t / S.dur)), fx: kx, fy: 110, sx: Math.round(Math.sin(t * 60) * shake), sy: Math.round(Math.cos(t * 47) * shake) };
  },
  post(im, t, S) { // seen through the water surface: wavy and tinted, clearing up
    const k = 1 - ss(t / S.clear); if (k <= 0.01) return;
    const d = im.data, src = new Uint8ClampedArray(d), A = 4 * k;
    for (let y = 0; y < H; y++) {
      const off = Math.round(A * Math.sin(y * 0.11 + t * 3.1) + A * 0.5 * Math.sin(y * 0.29 - t * 2.3));
      for (let x = 0; x < W; x++) {
        const sx = clamp(x + off, 0, W - 1), i = (y * W + x) * 4, j = (y * W + sx) * 4;
        const m = k * 0.6;
        d[i] = src[j] * (1 - m) + 40 * m; d[i + 1] = src[j + 1] * (1 - m) + 110 * m; d[i + 2] = src[j + 2] * (1 - m) + 170 * m;
        if (((x + y * 3 + Math.floor(t * 8)) % 23 === 0) && Math.sin(x * 0.2 + y * 0.13 + t * 2) > 0.7 && k > 0.2) { d[i] = 200; d[i + 1] = 240; d[i + 2] = 255; }
      }
    }
  }
};

/* ---------------- Scene 3: 回想 ---------------- */
const forestCv = (() => {
  const [cv, x] = mk(900, 110), r = rngf(9);
  for (let i = 0; i < 18; i++) { const cx = i * 52 + r() * 20, h = 30 + r() * 25; PF(x, [cx - 50, 110, cx, 110 - h, cx + 50, 110], i & 1 ? '#7c9c8c' : '#8cac98'); }
  return cv;
})();
function tree(c, x, y, s, seed) {
  R(c, x - 3 * s, y - 40 * s, 6 * s, 40 * s, C.bark1); R(c, x - 3 * s, y - 40 * s, 2 * s, 40 * s, C.bark0);
  for (let k = 0; k < 4; k++) { const cx = x + (hash(seed + k) - 0.5) * 22 * s, cy = y - (40 + hash(seed + k * 3) * 22) * s, rr = (12 + hash(seed + k * 7) * 6) * s; E(c, cx, cy + 2, rr, rr * 0.8, C.tree2); E(c, cx - 1, cy, rr - 1, rr * 0.8 - 1, C.tree1); E(c, cx - 3 * s, cy - 3 * s, rr * 0.45, rr * 0.35, C.tree0); }
}
const S3 = {
  name: '回想', bgm: 'memory',
  init(S) {
    const L = S.lines[0]; S.dur = L.se + 1.6;
    S.tStop = L.t0 + L.segs[3].a - 0.5; S.tLift = S.tStop + 0.22; S.tUp = S.tLift + 0.28; S.tExcl = S.tUp + 0.05;
    S.tLower = L.t0 + L.segs[4].a + 0.05; S.tDown = S.tLower + 0.4; S.tGo = S.tDown + 0.9;
    S.kx0 = 30; S.kStop = 260; S.walkV = (S.kStop - S.kx0) / (S.tStop - 0.3);
    S.spX = S.kStop + 20; S.tSpArr = S.tStop - 0.25;
  },
  kan(S, t) {
    let x, f = -1, raise = 0, lean = 0, look = 0;
    if (t < S.tStop) { x = S.kx0 + S.walkV * Math.max(0, t - 0.3); f = Math.floor(Math.max(0, x - S.kx0) / 4.2) & 3; }
    else if (t < S.tGo) {
      x = S.kStop;
      if (t < S.tLift) lean = Math.sin(sg(t, S.tStop, S.tLift) * Math.PI) * 1.5; // anticipation: weight shift back
      raise = t < S.tLift ? -0.1 * sg(t, S.tStop, S.tLift) : t < S.tUp ? eOut(sg(t, S.tLift, S.tUp)) : t < S.tLower ? 1 + Math.sin((t - S.tUp) * 5) * 0.03 : 1 - ss(sg(t, S.tLower, S.tDown)) * 1.0;
      look = t > S.tUp - 0.1 ? 1 : 0; lean += raise > 0 ? -raise * 1 : 0;
    } else { x = S.kStop + S.walkV * (t - S.tGo); f = Math.floor((x - S.kStop) / 4.2 + 1) & 3; look = t < S.tGo + 0.4 ? 1 : 0; }
    return { x, f, raise: Math.max(0, raise), lean, look };
  },
  spider(S, t) {
    if (t < S.tSpArr) { const u = (S.tSpArr - t); return { x: S.spX + u * 26, walk: true, f: Math.floor(t * 12) & 3, run: false }; }
    if (t < S.tDown + 0.1) return { x: S.spX + (t > S.tUp ? (Math.floor(t * 20) & 1) : 0), walk: false, f: 0, scared: t > S.tUp, hop: t < S.tUp ? Math.round(Math.abs(Math.sin(t * 3)) * 0.6) : 0 };
    const u = t - S.tDown - 0.1; return { x: S.spX + u * 70 + (u > 0 ? Math.abs(Math.sin(u * 14)) * 0 : 0), hop: Math.abs(Math.sin(u * 16)) * 2, walk: true, f: Math.floor(t * 12) & 3, happy: true };
  },
  draw(c, t, S) {
    const k = this.kan(S, t), sp = this.spider(S, t);
    const camX = clamp(k.x - 130, 0, 330);
    VG(c, 0, 0, W, 110, [C.sky1, C.sky2, C.sky3]);
    for (let i = 0; i < 3; i++) { const x = mod(i * 140 - t * 4 - camX * 0.08, 440) - 60; c.drawImage(cloudSpr(50 + i, 56, 16, [C.white, C.cloud1, C.cloud2, C.white]), Math.round(x), 10 + i * 12); }
    c.drawImage(forestCv, Math.round(-camX * 0.15), 40);
    for (let i = 0; i < 12; i++) { const x = i * 70 + 20 - camX * 0.45; if (x > -40 && x < W + 40) tree(c, x, 122, 0.8, i * 9); }
    // ground
    R(c, 0, 120, W, 22, C.grass1); VG(c, 0, 138, W, H - 138, [C.dirt0, C.dirt1, C.dirt2]);
    for (let i = 0; i < 40; i++) { const x = mod(i * 23 - camX, W + 30) - 10; P(c, x, 140 + (i * 7 % 30), C.dirt2); P(c, x + 5, 122 + (i % 4) * 4, C.grass0); }
    for (let i = 0; i < 30; i++) { const x = mod(i * 31 - camX, W + 30) - 10, sw = Math.sin(t * 2 + i) * 1; L(c, x, 139, x + sw, 133, C.grass0); }
    // kandata
    const ks = kanSideSpr({ t, f: k.f, raise: k.raise, lean: k.lean, look: k.look, blink: blinkOf(t, 41), surp: t > S.tUp && t < S.tDown });
    blit(c, ks, k.x - camX, 152, KS_AX, KS_AY);
    // spider
    const ss2 = spiderSpr({ t, f: sp.f, walk: sp.walk, blink: blinkOf(t, 51), up: sp.scared, happy: sp.happy });
    blit(c, ss2, sp.x - camX, 152 - (sp.hop || 0), SPI_AX, SPI_AY);
    if (t > S.tExcl && t < S.tDown + 0.2) exclaim(c, sp.x - camX, 132, t - S.tExcl);
    // sweat of relief
    if (t > S.tDown && t < S.tDown + 0.8) drop(c, sp.x - camX + 9, 134 + (t - S.tDown) * 10, '#a8d8f8');
    // foreground grass & hanging leaves
    for (let i = 0; i < 6; i++) { const x = i * 130 + 30 - camX * 1.6; if (x < -40 || x > W + 40) continue; for (let j = 0; j < 7; j++) { const sw = Math.sin(t * 1.8 + i + j) * 2; PF(c, [x + j * 5, H, x + j * 5 + 4, H, x + j * 5 + 2 + sw, 196 - (j * 7 % 20)], j & 1 ? C.tree2 : C.tree1); } }
    for (let i = 0; i < 4; i++) { const x = i * 170 + 80 - camX * 1.8; if (x < -60 || x > W + 60) continue; const sw = Math.sin(t * 1.2 + i) * 2; L(c, x - 30, -2, x + 30 + sw, 14, C.bark1, 2); for (let j = 0; j < 6; j++) E(c, x - 25 + j * 10 + sw * j / 6, 10 + (j % 2) * 4, 7, 4, j & 1 ? C.tree2 : C.tree1); }
    for (let i = 0; i < 5; i++) { const u = fr(t * 0.12 + i * 0.21), x = mod(i * 77 + u * 60 - camX * 1.2, W + 40) - 20, y = u * 170 + Math.sin(t * 2 + i) * 4; R(c, x, y, 2, 1, C.tree0); }
    const zf = ss(sg(t, S.tStop - 0.35, S.tStop + 0.25)) * (1 - ss(sg(t, S.tDown + 0.5, S.tDown + 1.4)));
    const jit = hash(Math.floor(t * 12) * 7) < 0.1 ? 1 : 0;
    return { z: 1 + 0.4 * zf, fx: S.kStop - camX + 12, fy: 140, sy: jit };
  },
  post(im, t) { // sepia film: palette quantize w/ dither, flicker, scratches, dust, vignette
    const d = im.data, st = Math.floor(t * 12), fl = 1 + (hash(st * 3) - 0.5) * 0.16;
    const pal = [[38, 24, 16], [86, 60, 38], [140, 104, 68], [190, 152, 104], [228, 200, 150], [248, 232, 196]];
    const sc = []; for (let k = 0; k < 2; k++) if (hash(st * 5 + k) < 0.55) sc.push(Math.floor(hash(st * 7 + k) * W));
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4; let l = (d[i] * 0.3 + d[i + 1] * 0.55 + d[i + 2] * 0.15) / 255 * fl;
      const vx = (x - 160) / 170, vy = (y - 120) / 140; l *= 1 - (vx * vx + vy * vy) * 0.35;
      let v = clamp(l * 5 + (BAYER4[(y & 3) * 4 + (x & 3)] / 16 - 0.5) * 0.9, 0, 5); let q = Math.round(v);
      for (const s of sc) if (x === s || (x === s + 1 && hash(y + st) > 0.5)) q = Math.min(5, q + 2);
      const p = pal[q]; d[i] = p[0]; d[i + 1] = p[1]; d[i + 2] = p[2];
    }
    for (let k = 0; k < 6; k++) { const x = Math.floor(hash(st * 11 + k) * W), y = Math.floor(hash(st * 13 + k) * H), i = (y * W + x) * 4; if (hash(st + k * 17) < 0.6) { d[i] = d[i + 1] = d[i + 2] = 30; if (x + 1 < W) { d[i + 4] = d[i + 5] = d[i + 6] = 30; } } }
  }
};
