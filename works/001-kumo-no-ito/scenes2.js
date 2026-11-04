/* ================= scenes 4-7 ================= */
/* tall gradient used under the pond (S4) and along the thread (S5/S6) */
const descentCv = (() => { const [cv, x] = mk(W, 1100); VG(x, 0, 0, W, 130, [C.water2, C.water3, C.sky0]); VG(x, 0, 130, W, 970, [C.sky0, C.sky1, C.sky2, '#9c9cd8', '#7464a8', '#583c78', C.hell2, C.hell1, C.hell0]); return cv; })();
const climbCv = (() => { const [cv, x] = mk(W, 1000); VG(x, 0, 0, W, 1000, [C.white, C.gold0, C.sky2, C.sky1, '#6c74c0', '#463478', C.hell2, C.hell1, C.hell0]); return cv; })();
function threadLine(c, x0, y0, x1, y1, t, glow) {
  L(c, x0, y0, x1, y1, '#dce8f8');
  if (glow) for (let y = Math.max(0, Math.ceil(y0)); y < Math.min(H, y1); y += 1) { if (hash(y * 7 + Math.floor(t * 14)) < 0.08) { const x = lerp(x0, x1, (y - y0) / (y1 - y0 || 1)); P(c, x, y, C.white); P(c, x - 1, y, DA(C.gold0, 0.6)); } }
}
function threadPulses(c, x, y0, y1, t, n = 4, sp = 0.9) {
  for (let k = 0; k < n; k++) { const q = fr(t * sp + k / n), y = lerp(y0, y1, q); if (y < -4 || y > H + 4) continue; R(c, x - 1, y - 3, 3, 6, DA(C.gold0, 0.7)); R(c, x, y - 2, 1, 4, C.white); }
}
function tipSpark(c, x, y, t) {
  const s = (Math.floor(t * 10) & 1) ? 4 : 2;
  E(c, x, y, 7, 7, DA(C.gold0, 0.3 + 0.15 * Math.sin(t * 9))); star4(c, x, y, s, C.white, C.gold0);
}

/* ---------------- Scene 4: 蜘蛛の糸 ---------------- */
const S4 = {
  name: '蜘蛛の糸', bgm: 'thread',
  init(S) {
    const L = S.lines[0];
    S.tBend = L.t0 + 0.4; S.tReach = L.t0 + L.segs[2].a - 0.1; S.tPick = L.t0 + L.segs[2].a + 0.6; S.tLower = L.t0 + L.segs[3].a + 0.2;
    S.tTouch = S.tLower + 1.1; S.tDesc = L.se + 0.25; S.D = 4.8; S.tipEnd = 882; S.tNotice = S.tDesc + S.D - 1.5; S.dur = S.tDesc + S.D + 1.8;
    S.bx = 152;
  },
  pose(S, t) {
    const bend = t < S.tBend ? 0.25 : t < S.tBend + 0.25 ? 0.25 - 0.12 * sg(t, S.tBend, S.tBend + 0.25) : lerp(0.13, 0.85, ss(sg(t, S.tBend + 0.25, S.tBend + 1.1)));
    const reach = t < S.tReach ? 0.1 : t < S.tLower ? lerp(0.1, 0.8, ss(sg(t, S.tReach, S.tReach + 0.8))) : lerp(0.8, 1, ss(sg(t, S.tLower, S.tLower + 0.6)));
    return { bend, reach };
  },
  tip(S, t, hy) {
    if (t < S.tLower) return null;
    if (t < S.tDesc) return lerp(hy + 4, 170, eOut(sg(t, S.tLower, S.tTouch + 0.9)));
    return lerp(170, S.tipEnd, ss(sg(t, S.tDesc, S.tDesc + S.D)));
  },
  draw(c, t, S) {
    const p = this.pose(S, t), bk = buddhaKneel({ t, bend: p.bend, reach: p.reach, blink: blinkOf(t, 12) });
    const hand = [S.bx - bk.ax + bk.hand[0], 112 - bk.ay + bk.hand[1]];
    const tipY = this.tip(S, t, hand[1]);
    const camY = tipY == null ? 0 : clamp(tipY - 130, 0, 800), tx = 196;
    c.drawImage(descentCv, 0, Math.round(122 - camY));
    if (camY < 140) { // paradise bank
      c.save(); c.translate(0, -Math.round(camY));
      c.drawImage(skyCv, 0, -14, W, 136); paradiseBack(c, t, 20); c.drawImage(skyCv, 0, 100, W, 22, 0, 100, W, 22);
      rays(c, t, 0, 0.8);
      VG(c, 0, 96, W, 26, [C.water0, C.water1]);
      for (let i = 0; i < 6; i++) { const x = 200 + i * 26, y = 100 + (i * 7 % 14); lotusPad(c, x, y + Math.sin(t * 1.4 + i) * 0.6, 8, 2, i); if (i % 2) lotus(c, x, y - 1, 0.6, 0.8, t, i); }
      PF(c, [-4, 112, 186, 112, 190, 126, -4, 126], C.marble0); R(c, -4, 116, 192, 1, C.gold1); R(c, -4, 117, 192, 9, C.marble1); R(c, -4, 125, 192, 1, C.marble2);
      halo(c, S.bx - bk.ax + 24 + Math.sin(p.bend * 0.75) * 24 + 4 + p.bend * 4, 112 - bk.ay + 50 - Math.cos(p.bend * 0.75) * 24 - 9 + p.bend * 2, 11, t);
      blit(c, bk.spr, S.bx, 112 + Math.round(Math.sin(t * 2.1) * 0.5), bk.ax, bk.ay);
      // pond surface (side) with pads and the spider's leaf
      R(c, 186, 122, W, 4, C.water1);
      for (let i = 0; i < 4; i++) lotusPad(c, 230 + i * 30, 124 + Math.sin(t * 1.5 + i) * 0.7, 12, 2.5, i);
      lotusPad(c, 214, 124 + Math.sin(t * 1.3) * 0.7, 15, 3, 1); lotus(c, 236, 122, 1, 0.9, t, 2);
      const spy = 121 + Math.sin(t * 1.3) * 0.7;
      blit(c, spiderSpr({ t, f: 0, walk: false, blink: blinkOf(t, 52), up: t < S.tLower, happy: t > S.tPick && t < S.tLower + 1.5 }), 214, spy, SPI_AX, SPI_AY);
      if (t > S.tPick - 0.3 && t < S.tLower + 0.3) { const k = sg(t, S.tPick - 0.3, S.tPick); L(c, 214, spy - 8, lerp(214, hand[0], k), lerp(spy - 8, hand[1], k), '#e8f0ff'); if (t > S.tPick) tipSpark(c, hand[0], hand[1], t); }
      for (let k = -1; k <= 0; k++) ripple(c, tx, 123, t - S.tTouch - k * 0.0, 1.8, 18, C.white);
      ripple(c, tx, 123, t - S.tTouch - 0.5, 1.6, 12, C.white);
      c.restore();
    }
    // under the pond surface: hanging lotus roots
    const uy = 126 - camY;
    if (uy > -60) { R(c, 0, uy, W, 2, DA(C.water0, 0.6)); for (let i = 0; i < 9; i++) { const x = 190 + i * 16, sw = Math.sin(t + i) * 2; L(c, x, uy, x + sw, uy + 22 + (i * 7 % 20), C.leaf3); } for (let i = 0; i < 12; i++) { const x = mod(i * 29 + t * 6, W), y = uy + 6 + (i * 13 % 30); if (Math.sin(t * 2 + i) > 0) R(c, x, y, 3, 1, DA(C.white, 0.5)); } }
    // back clouds (slow)
    const cB = [C.white, C.cloud1, C.cloud2, C.white];
    for (let i = 0; i < 8; i++) { const y = 230 + i * 56 - camY * 0.6, x = mod(i * 83 + t * (4 + i), 420) - 70; if (y > -30 && y < H + 10) c.drawImage(cloudSpr(60 + i, 60 + (i % 3) * 16, 18, cB), Math.round(x), Math.round(y)); }
    for (let i = 0; i < 30; i++) { const y = mod(i * 47 - camY * 0.4, 600) - 40, x = (i * 89) % W; if (y < H && (Math.floor(t * 6 + i) % 5)) P(c, x, y, DA(C.white, 0.7)); }
    // hell at the bottom
    const hy = 925 - camY;
    if (hy < H + 60) {
      c.save(); c.translate(0, Math.round(hy - 112)); hellBack(c, t, 0, 0, true); c.restore();
      waveBand(c, hy + 2, 1.5, 0.08, 0.8, t, C.blood1, C.blood2); for (let i = 0; i < 8; i++) miniSinner(c, 20 + i * 40, waveY(20 + i * 40, hy + 6, 1.5, 0.08, 0.8, t) + Math.sin(t * 1.5 + i) * 1.5, t, i, C.sin1, C.sin2);
      waveBand(c, hy + 10, 2, 0.06, -1.3, t, C.blood2, C.blood3);
      const nt = t - S.tNotice;
      const rch = nt < 0.35 ? 0 : ss(sg(nt, 0.35, 0.9)), dip = nt > 0.2 && nt < 0.38 ? 2 : 0;
      const pz = nt < 0 ? kanPose('pond', 0, t) : kanPose('reach', rch, t);
      const ex = nt < 0 ? 'scared' : nt < 0.9 ? 'surp' : 'grin';
      const ks = kanFrontSpr({ t, pz, expr: ex, blink: nt > 0 ? 0 : blinkOf(t, 22) });
      blit(c, ks, tx - 5, hy + 18 + dip + (nt < 0 ? Math.sin(t * 2.3) * 1.5 : 0), FIG_AX, FIG_AY);
      if (nt > 0 && nt < 0.6) exclaim(c, tx - 5, hy - 34, nt);
      waveBand(c, hy + 22, 2.4, 0.05, 2, t, C.blood2, C.blood4); VG(c, 0, hy + 34, W, 80, [C.blood1, C.blood0]);
      embers(c, t, 24, 3, [0, hy - 140, W, 170], [C.hell7, C.hell6, C.hell5]);
    }
    // the thread
    if (tipY != null) {
      const top = hand[1] + 2 - camY, ty = tipY - camY;
      threadLine(c, hand[0], top, tx, ty, t, true); threadPulses(c, tx, top, ty, t, 4, 0.8); tipSpark(c, tx, ty, t);
    }
    // front clouds (fast) pass in front of the thread
    for (let i = 0; i < 6; i++) { const y = 520 + i * 120 - camY * 1.5, x = mod(i * 120 - t * (10 + i * 2), 460) - 90; if (y > -40 && y < H + 10) c.drawImage(ditherFade(cloudSpr(80 + i, 110, 30, [C.white, C.cloud1, C.cloud2, C.white]), 0.8, 'fcl'), Math.round(x), Math.round(y)); }
    const z = tipY == null || camY < 1 ? lerp(1, 1.18, ss(sg(t, S.tReach - 0.5, S.tPick))) * (1 - 0) : lerp(1.18, 1, ss(sg(t, S.tDesc, S.tDesc + 0.8)));
    return { z: Math.max(1, z), fx: 196, fy: 110 };
  }
};

/* ---------------- climbing helpers (S5/S6) ---------------- */
function climbBack(c, t, alt, h) {
  const yv = (1 - alt) * 760;
  c.drawImage(climbCv, 0, -Math.round(yv));
  // far: tiny stars / embers drifting with altitude
  for (let i = 0; i < 40; i++) { const y = mod(i * 37 + h * 0.6, H + 20) - 10, x = (i * 71) % W; if ((Math.floor(t * 5) + i) % 6) P(c, x, y, alt > 0.4 ? DA(C.white, 0.8) : C.hell5); }
  // mid: rock pillars at the sides
  for (let i = 0; i < 6; i++) { const y = mod(i * 90 + h * 1.6, 540) - 160, side = i & 1, x = side ? W - 30 - (i * 13 % 20) : 10 + (i * 17 % 20); PF(c, [x - 26, y + 130, x - 10, y, x + 6, y + 8, x + 26, y + 130], alt > 0.5 ? '#40386c' : C.rock2); L(c, x - 10, y, x - 20, y + 100, alt > 0.5 ? '#5c5490' : C.rock1); }
  // near: smoke / cloud wisps
  const cl = alt > 0.45 ? [C.white, C.cloud1, C.cloud2, C.white] : [C.rock0, C.rock1, C.rock2, C.rock0];
  for (let i = 0; i < 4; i++) { const y = mod(i * 140 + h * 3.6, 560) - 80, x = (i & 1 ? 200 : -40) + Math.sin(t * 0.3 + i) * 20; c.drawImage(ditherFade(cloudSpr(90 + i, 120, 28, cl), 0.7, 'wisp'), Math.round(x), Math.round(y)); }
}
function sweat(c, x, y, t, te, seed) { const u = t - te; if (u < 0 || u > 0.8) return; const vx = (hash(seed) - 0.5) * 70, vy = -30 - hash(seed * 3) * 40; drop(c, x + vx * u, y + vy * u + 160 * u * u, '#b8e0f8'); }
const SIN_V = [16, 18.5, 14.5, 17, 19, 15.5, 17.5, 16.5, 18];

/* ---------------- Scene 5: 登る ---------------- */
const S5 = {
  name: '登る', bgm: 'climb',
  init(S) {
    const L = S.lines[0]; S.dur = L.se + 1.2;
    S.c0 = 0.5; S.p0 = L.t0 + L.segs[2].b; S.p1 = L.t0 + L.segs[3].a; S.s4 = L.t0 + L.segs[4].a; S.s5 = L.t0 + L.segs[5].a;
  },
  h(S, t) { return Math.max(0, Math.min(t, S.p0) - S.c0) * 22; },
  draw(c, t, S) {
    const h = this.h(S, t), climbing = t > S.c0 && t < S.p0;
    const alt = 0.08 + h / 80 * 0.4;
    const offY = t < S.s4 ? 0 : lerp(0, 100, ss(sg(t, S.s4, S.s4 + 0.9))) - lerp(0, 50, ss(sg(t, S.s5 + 0.4, S.s5 + 1.4)));
    climbBack(c, t, alt, h);
    const ky = 112 - offY, kx = 160;
    L(c, 160, -2, 160, H + 2, '#dce8f8'); threadPulses(c, 160, -40, H + 40, t, 5, 0.5);
    // sinners below
    for (let k = 0; k < 9; k++) {
      const s = -(150 + 48 * k + hash(k) * 10) + SIN_V[k] * t, rel = h - s, y = ky + rel;
      if (y < -40 || y > H + 50) continue;
      const f = Math.floor(s / 1.8 + k * 1.7) & 3;
      blit(c, sinnerSpr(k % 3, 'climb', f), kx + (k & 1 ? 1 : -1), y, FIG_AX, FIG_AY);
    }
    // kandata
    let pz, ex = 'grin', by = 0;
    if (t < S.p0) { pz = kanPose('climb', climbing ? Math.floor(h / 2.75) & 3 : 0, t); ex = t < S.c0 + 1.2 ? 'grin' : 'angry'; }
    else if (t < S.p1) { pz = kanPose('rest', 0, t); by = Math.round(Math.sin(t * 10) * 1); ex = 'angry'; }
    else { pz = kanPose('look', 0, t); by = Math.round(Math.sin(t * 5) * 1); ex = t < S.s5 ? 'surp' : 'angry'; }
    const ks = kanFrontSpr({ t, pz, by, expr: ex, blink: blinkOf(t, 23), mouth: t > S.p0 && t < S.p1 ? (Math.floor(t * 4) & 1) : 0 });
    blit(c, ks, kx, ky, FIG_AX, FIG_AY);
    // sweat & breath during the pause, burst on "なっ"
    for (let i = 0; i < 6; i++) sweat(c, kx + (i & 1 ? 6 : -6), ky - 36, t, S.p0 + 0.1 + i * 0.17, i + 1);
    for (let i = 0; i < 6; i++) sweat(c, kx + (i & 1 ? 7 : -7), ky - 34, t, S.p1 + i * 0.04, i + 20);
    for (let i = 0; i < 3; i++) { const u = t - (S.p0 + 0.15 + i * 0.36); if (u > 0 && u < 0.5) E(c, kx + 8 + u * 14, ky - 27 - u * 6, 2 + u * 6, 1.5 + u * 3, DA(C.white, 0.7 * (1 - u / 0.5))); }
    if (t > S.p1 && t < S.p1 + 0.5) { exclaim(c, kx + 14, ky - 46, t - S.p1); }
    const zIn = ss(sg(t, S.p1, S.p1 + 0.22)) * (1 - ss(sg(t, S.s4, S.s4 + 0.5)));
    return { z: 1 + 0.7 * zIn, fx: kx, fy: ky - 31 };
  }
};

/* ---------------- Scene 6: 糸が切れる ---------------- */
const S6 = {
  name: '糸が切れる', bgm: 'snap',
  init(S) {
    const A = S.lines[0], B = S.lines[1];
    S.k1 = A.t0 + 0.05; S.k2 = A.t0 + A.segs[2].a - 0.05;
    S.tF = B.t0 + 0.2; S.ts = B.t0 + B.segs[2].a - 0.08; S.sm0 = S.ts - 0.38; S.sm1 = S.ts - 0.08;
    S.offs = []; for (let k = 0; k < 9; k++) S.offs.push(62 + 44 * k + hash(k + 40) * 8);
    // fall: find splash times
    S.pondY = u => u < 1.7 ? 400 : lerp(400, 158, ss(sg(u, 1.7, 2.55)));
    S.ky = u => 104 + 9 * u * u;
    S.us = 9; for (let u = 0; u < 5; u += 0.01) if (S.ky(u) >= S.pondY(u)) { S.us = u; break; }
    S.uk = S.offs.map((o, k) => { for (let u = 0; u < 5; u += 0.01) if (104 + o * (1 - Math.min(1, u * 0.35)) + 9 * u * u * (1 + 0.06 * k) >= S.pondY(u)) return u; return 9; });
    S.dur = S.ts + S.us + 2.4;
  },
  warp(S, t) { return t < S.sm0 ? t : t < S.sm1 ? S.sm0 + (t - S.sm0) * 0.2 : S.sm0 + 0.06 + (t - S.sm1); },
  draw(c, t, S) {
    const tw = this.warp(S, t), u = t - S.ts, fell = u >= 0;
    const amp = fell ? 0 : 1 + 5 * ss(sg(tw, 0, S.ts));
    const tx = y => 160 + Math.sin(tw * 4.2) * amp * Math.sin(clamp(y, 0, 240) / 240 * Math.PI) * 0.9;
    const alt = fell ? 0.62 - Math.min(u, S.us) * 0.17 : 0.62;
    climbBack(c, tw, alt, fell ? -u * u * 260 : tw * 2);
    const shakeA = fell ? 0 : 2.5 * ss(sg(tw, 0, S.ts));
    let sx = Math.round(Math.sin(tw * 53) * shakeA), sy = Math.round(Math.cos(tw * 41) * shakeA);
    const fy0 = 46;
    if (!fell) {
      // thread with fray above kandata
      const fa = ss(sg(t, S.tF, S.ts));
      L(c, tx(0), -2, tx(fy0 - 6), fy0 - 6, '#dce8f8'); L(c, tx(fy0 + 6), fy0 + 6, tx(H), H + 2, '#dce8f8');
      if (fa > 0) { E(c, tx(fy0), fy0, 5 + fa * 5, 6 + fa * 6, DA(C.gold0, 0.25 + 0.25 * fa * (0.6 + 0.4 * Math.sin(tw * 30)))); }
      for (let k = -1; k <= 1; k++) { const bx = tx(fy0) + k * fa * 3.5; PL(c, [tx(fy0 - 6), fy0 - 6, bx, fy0 - 2, bx + k * fa, fy0 + 2, tx(fy0 + 6), fy0 + 6], k ? C.cloud2 : '#dce8f8'); }
      threadPulses(c, tx(100), fy0 + 8, H, tw, 3, 0.7);
      for (let i = 0; i < Math.round(fa * 14); i++) { const q = fr(tw * 2.2 + hash(i)), a = hash(i * 3 + Math.floor(tw * 2.2 + hash(i))) * TAU; const px = tx(fy0) + Math.cos(a) * q * 16, py = fy0 + Math.sin(a) * q * 10 + q * q * 12; P(c, px, py, i & 1 ? C.gold0 : C.white); }
      if (fa > 0.3 && (Math.floor(tw * 12) & 1)) star4(c, tx(fy0) + 1, fy0, 2, C.white, C.gold0);
      // sinners
      for (let k = 0; k < 9; k++) {
        const kick = (te) => { const q = t - te - 0.32; return q > 0 && q < 0.4 && k === 0 ? Math.sin(q / 0.4 * Math.PI) * 6 : 0; };
        const y = 104 + S.offs[k] - SIN_V[k] * tw * 0.6 + kick(S.k1) + kick(S.k2);
        if (y > H + 50) continue;
        blit(c, sinnerSpr(k % 3, 'climb', Math.floor((SIN_V[k] * tw * 0.6) / 1.1 + k * 1.7) & 3), tx(y) + (k & 1 ? 1 : -1), Math.max(104 + 60 + k * 42, y), FIG_AX, FIG_AY);
      }
      // kandata kicking
      const kf = te => { const q = t - te; return q < 0 ? 0 : q < 0.22 ? 1 : q < 0.42 ? 2 : q < 0.6 ? 1 : 0; };
      const f = Math.max(kf(S.k1), kf(S.k2));
      const ks = kanFrontSpr({ t: tw, pz: kanPose('kick', f, tw), expr: 'angry', blink: blinkOf(tw, 24), by: f === 1 ? -1 : 0 });
      blit(c, ks, tx(104), 104, FIG_AX, FIG_AY);
      if (f === 2) for (let i = 0; i < 4; i++) L(c, tx(104) + 2 + i * 2 - 3, 128 + i * 3, tx(104) + 2 + i * 2 - 3, 138 + i * 3, DA(C.white, 0.7));
    } else {
      // speed lines
      const spd = Math.min(1, u * 0.9);
      for (let i = 0; i < 26; i++) { const x = (i * 53 + 17) % W, y = mod(hash(i) * 400 - u * 700, H + 60) - 30, l = 12 + (i % 4) * 8; if (spd > hash(i * 5)) L(c, x, y, x, y + l * spd, DA(C.white, 0.6)); }
      // recoiling upper thread
      const ye = fy0 - 6 - 70 * (1 - Math.exp(-6 * u) * Math.cos(13 * u)) - u * u * 120;
      if (ye > -2) { L(c, 160, -2, 160, ye, '#dce8f8'); for (let k = 0; k < 3; k++) P(c, 160 + (k - 1) * 2, ye + 1 + (k & 1), C.white); }
      const py = S.pondY(u);
      if (py < H + 40) { // hell pond rising into view
        c.save(); c.translate(0, Math.round(py - 114)); hellBack(c, t, 0, 0, true); c.restore();
        waveBand(c, py, 2, 0.06, -1.2, t, C.blood2, C.blood3); waveBand(c, py + 10, 2.6, 0.05, 2, t, C.blood1, C.blood4);
        VG(c, 0, py + 24, W, Math.max(1, H - py), [C.blood1, C.blood0]);
      }
      // sinners falling
      for (let k = 0; k < 9; k++) {
        const uk = S.uk[k], y = 104 + S.offs[k] * (1 - Math.min(1, u * 0.35)) + 9 * u * u * (1 + 0.06 * k), x = 160 + (hash(k * 9) - 0.5) * 220 * Math.min(1, u * 0.8);
        if (u < uk) { if (y < H + 50) blit(c, sinnerSpr(k % 3, 'fall', 0), x, y, FIG_AX, FIG_AY - 10, { rot: u * (3 + hash(k) * 4) * (k & 1 ? 1 : -1) }); }
        else splashFx(c, x, py, u - uk, 0.35, k * 31, [C.blood3, C.blood4, C.blood2]);
      }
      // kandata falling
      if (u < S.us) {
        const ky = S.ky(u), kx = 160 + u * 6;
        const ks = kanFrontSpr({ t, pz: kanPose('fall', 0, t), expr: 'scared', blink: 0, mouth: 1 });
        const rot = u * 5.5 * (1 + u * 0.4);
        L(c, kx + Math.sin(rot) * 40, ky - Math.cos(rot) * 40, kx + Math.sin(rot) * 16, ky - Math.cos(rot) * 16, '#dce8f8');
        blit(c, ks, kx, ky, FIG_AX, FIG_AY - 12, { rot });
      } else {
        const v = u - S.us, kx = 160 + S.us * 6;
        splashFx(c, kx, py, v, 1, 77, [C.blood3, C.blood4, C.blood2]);
        for (let i = 0; i < 6; i++) { const q = fr(v * 0.7 + i / 6); if (v > 0.6) ER(c, kx + Math.sin(i * 2 + v) * 8, py + 12 - q * 10, 1.5, 1.5, C.blood4); }
        const sk = Math.max(0, 1 - v / 0.7) * 4; sx = Math.round(Math.sin(t * 70) * sk); sy = Math.round(Math.cos(t * 55) * sk);
      }
      // flash
      if (u < 0.45) { R(c, 0, 0, W, H, u < 0.07 ? C.white : DA(C.white, 1 - (u - 0.07) / 0.38)); }
      if (u < 0.15) { sx = Math.round(Math.sin(t * 80) * 4); sy = Math.round(Math.cos(t * 66) * 3); }
    }
    const zs = fell ? lerp(1.3, 1, ss(u / 0.35)) : 1 + 0.3 * ss(sg(t, S.sm0 - 0.1, S.sm1));
    const zEnd = fell && u > S.us + 0.6 ? 1 + 0.15 * ss(sg(u, S.us + 0.6, S.us + 2.4)) : 1;
    return { z: Math.max(zs, zEnd), fx: 160, fy: fell ? (u > S.us ? S.pondY(u) : 120) : fy0 + 10, sx, sy };
  }
};

/* ---------------- Scene 7: 結び ---------------- */
const S7 = {
  name: '結び', bgm: 'ending',
  init(S) {
    const A = S.lines[0], B = S.lines[1];
    S.tUp = A.se + 0.2; S.tWalk = B.t0 + B.segs[1].a; S.tFade0 = S.tWalk + 0.9; S.tFade1 = S.tFade0 + 3.2; S.tEnd = B.se + 1.0; S.dur = 1e9; S.bx = 196;
  },
  bud(S, t) {
    if (t < S.tWalk) return { x: S.bx, f: -1, dip: 0 };
    const u = t - S.tWalk; if (u < 0.2) return { x: S.bx, f: -1, dip: u < 0.12 ? 1 : 0 };
    const v = u - 0.2, d = v < 0.6 ? 11 * v * v : 3.96 + 22 * (v - 0.6);
    return { x: S.bx + d, f: Math.floor(d / 2.6) & 3, dip: 0 };
  },
  draw(c, t, S) {
    const camX = 30 + t * 2.2, b = this.bud(S, t);
    const wind = 26 + 14 * Math.sin(t * 0.5);
    paradiseBack(c, t, camX, true);
    rays(c, t, camX * 0.15, 1.4);
    VG(c, 0, 80, W, 36, [C.water0, C.water1]);
    const bloom = ss(sg(t, 0, 16));
    for (let i = 0; i < 14; i++) { const x = mod(i * 41 - camX * 0.5, 460) - 40, y = 86 + (i * 7 % 22), bob = Math.sin(t * 1.4 + i) * 0.7; lotusPad(c, x, y + bob, 7 + (i % 3) * 2, 2 + (i % 2), i); if (i % 3 === 0) lotus(c, x + 2, y - 1 + bob, 0.55, lerp(0.3, 0.9, bloom), t, i); }
    causeway(c, camX, 114);
    const a = 1 - ss(sg(t, S.tFade0, S.tFade1)), sx = b.x - camX;
    if (a > 0) {
      const look = t < S.tUp ? 1 : lerp(1, 0, ss(sg(t, S.tUp, S.tUp + 0.8)));
      const bs = buddhaSpr({ t, f: b.f, look, sad: 1, blink: blinkOf(t, 13) });
      const br = b.f < 0 ? Math.round(Math.sin(t * 2.2) * 0.6 + 0.4) : 0;
      halo(c, sx, 118 - BUD_AY + BUD_HEAD[1] + br + look * 1.5, 11 + (1 - a) * 6, t, 1 + (1 - a));
      blit(c, a < 1 ? ditherFade(bs, a, 'budfade') : bs, sx, 118 + br + b.dip, BUD_AX, BUD_AY);
      if (a < 1) E(c, sx, 90, 26 * (1.2 - a), 40 * (1.2 - a), DA(C.white, (1 - a) * 0.5 * a * 2));
    }
    // light motes released while dissolving
    if (t > S.tFade0 - 0.3) for (let i = 0; i < 26; i++) { const st = S.tFade0 - 0.3 + hash(i) * 3.4, u = t - st; if (u < 0 || u > 2.2) continue; const x0 = S.bx - camX + (b.x - S.bx) * Math.min(1, (st - S.tWalk) / Math.max(0.1, t - S.tWalk)) + (hash(i * 3) - 0.5) * 30; P(c, x0 + Math.sin(u * 3 + i) * 4, 110 - hash(i * 7) * 60 - u * 26, (Math.floor(t * 10) + i) % 3 ? C.gold0 : C.white); }
    nearWater(c, t, camX, 126, true);
    if (a > 0) reflect(c, buddhaSpr({ t, f: b.f, look: 0, sad: 1, blink: 0, id: 'budr' }), sx - BUD_AX - 1, 132, t, 0.45 * a);
    for (let i = 0; i < 3; i++) drawKoi(c, i, t * 0.8, camX);
    for (let i = 0; i < 9; i++) { const x = mod(i * 67 - camX, 520) - 50, y = 140 + (i * 23 % 34), bob = Math.sin(t * 1.6 + i * 1.3) * 1; lotusPad(c, x, y + bob, 12 + (i % 3) * 3, 3.5 + (i % 2), i * 0.7); if (i % 2 === 0) lotus(c, x + 1, y - 1 + bob, 1, lerp(0.2, 1, ss(sg(t, i * 0.8, 9 + i * 0.8))), t, i); }
    // big foreground lotus opening slowly
    const fx = 70 - camX * 0.4 + 12, sw = Math.sin(t * 0.9) * 2;
    L(c, fx, H, fx + sw, 138, C.leaf3, 2); lotusPad(c, fx - 30, 226, 36, 9, 0.4); lotus(c, fx + sw, 138, 2.4, lerp(0.05, 1, ss(sg(t, 0.5, 13))), t, 4);
    lotusPad(c, 300 - camX * 0.4, 230, 40, 10, 2);
    // wind-blown petals
    for (let i = 0; i < 30; i++) {
      const sp = wind * (0.7 + hash(i) * 0.6), x = mod(hash(i * 3) * 400 + t * sp, 400) - 40, y = 20 + hash(i * 7) * 160 + Math.sin(t * (1.5 + hash(i)) + i) * 10 + Math.sin(t * 0.5 + i) * 8;
      drawPetal(c, x, y, t, i, false);
    }
    const z = lerp(1.45, 1, ss(sg(t, 0.2, S.tEnd + 1.5)));
    return { z, fx: lerp(S.bx - camX, 160, ss(sg(t, 0, S.tEnd))), fy: lerp(92, 120, ss(sg(t, 0, S.tEnd))) };
  }
};
const SCENES = [S1, S2, S3, S4, S5, S6, S7];
