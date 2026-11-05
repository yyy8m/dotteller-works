/* ================= 記録 #001 エド・ゲイン: scenes 1-3 ================= */
/* Ed Gein: plaid hunting cap with ear flaps, brown checked jacket */
const GEIN = { id: 'gein', coat: '#7c4c34', coat2: '#4c2c20', plaid: true, pants: '#3c3c44', skin: '#dcb08c', hat: 'hunt', hatCol: '#b82020', hatCol2: '#2c1010' };
/* portrait 48x48 (thumbnail / reveal): gaunt face, plaid cap with flaps, lopsided half-smile */
function geinFace(p = {}) {
  const ex = p.expr || 'smile', bl = p.blink || 0;
  return SPR('geinFace' + ex + bl, 48, 48, c => {
    const sk = '#dcb08c', sk2 = '#b48464', sk3 = '#84583c', red = '#b82020', blk = '#2c1010';
    // jacket (checked)
    PF(c, [2, 48, 8, 38, 18, 36, 30, 36, 40, 38, 46, 48], '#7c4c34');
    for (let x = 4; x < 46; x += 5) L(c, x, 38, x - 2, 48, '#4c2c20'); for (let y = 40; y < 48; y += 4) R(c, 4, y, 40, 1, '#5c3424');
    PF(c, [18, 36, 24, 44, 30, 36, 27, 35, 24, 39, 21, 35], '#d8d0c0');
    // neck + gaunt face
    R(c, 19, 31, 10, 6, sk2);
    E(c, 24, 22, 10, 13, sk3); E(c, 24, 21.5, 9.5, 12.5, sk2); E(c, 23.5, 20.5, 8.5, 11.5, sk);
    L(c, 16, 25, 18, 30, sk2); L(c, 32, 25, 30, 30, sk2); // hollow cheeks
    // ears
    E(c, 14, 21, 2, 3, sk2); E(c, 34, 21, 2, 3, sk2);
    // cap: crown, brim, ear flaps (red/black check)
    PF(c, [13, 13, 15, 5, 24, 2, 33, 5, 35, 13], red); for (let x = 15; x < 35; x += 4) R(c, x, 4, 2, 9, blk); R(c, 13, 9, 22, 1, blk);
    R(c, 12, 12, 24, 2, '#8c1818'); PF(c, [22, 13, 38, 13, 36, 16, 24, 16], '#8c1818');
    for (const fx of [10, 33]) { R(c, fx, 13, 5, 10, red); R(c, fx + 1, 15, 3, 1, blk); R(c, fx + 1, 19, 3, 1, blk); }
    // brows, small squinting eyes
    L(c, 18, 16, 22, 16, sk3); L(c, 26, 16, 30, 15, sk3);
    for (const x0 of [18, 26]) { if (bl === 2) { L(c, x0, 19, x0 + 3, 19, C.ol); continue; } R(c, x0, 18, 4, 2, '#f4ecdc'); R(c, x0 + 1, 18, 2, 2, C.k); L(c, x0, 17, x0 + 3, 17, C.ol); }
    // nose, stubble
    L(c, 24, 19, 23, 24, sk3); P(c, 22, 25, sk3); P(c, 25, 25, sk3);
    for (let i = 0; i < 18; i++) P(c, 17 + hash(i * 5) * 14, 26 + hash(i * 3) * 6, sk3);
    // lopsided half-smile
    if (ex === 'smile') { L(c, 20, 29, 25, 29, '#5c2c24'); L(c, 25, 29, 28, 27, '#5c2c24'); }
    else R(c, 21, 29, 6, 1, '#5c2c24');
  });
}

/* ---- the Gein farm (shared by S2 / S4 / title) ---- */
function geinFarm(c, t, ox, o = {}) {
  // far tree line
  for (let i = 0; i < 16; i++) { const x = i * 46 - ox * 0.4 - 20, h = 34 + (i * 13 % 18); PF(c, [x, 132, x + 12, 132 - h, x + 24, 132], K.night0); }
  snowGround(c, 128, ox * 0.6, H - 128);
  // fence
  for (let i = 0; i < 18; i++) { const x = i * 30 - ox; if (x < -10 || x > W + 10) continue; R(c, x, 134, 2, 12, K.wood2); }
  L(c, -ox, 138, 540 - ox, 138, K.wood2);
  // barn / shed
  const bx = 300 - ox; R(c, bx, 92, 60, 44, '#4c2424'); PF(c, [bx - 4, 94, bx + 30, 74, bx + 64, 94], K.wood3); L(c, bx - 4, 93, bx + 30, 73, K.snow0, 2); L(c, bx + 30, 73, bx + 64, 93, K.snow1, 2);
  R(c, bx + 20, 112, 20, 24, '#2c1414'); L(c, bx + 20, 112, bx + 40, 136, '#5c2c2c'); L(c, bx + 40, 112, bx + 20, 136, '#5c2c2c');
  // farmhouse (two storeys)
  house(c, 170 - ox, 136, 76, 58, { t, wall: '#4c4038', wall2: '#383028', roof: K.wood3, rh: 26, snow: true, chimney: true, door: 30,
    windows: [[8, 34, o.lit !== false], [56, 34, false], [10, 8, false], [56, 8, false]] });
  // upstairs left window boarded up (the closed rooms)
  const wx = 170 - ox + 10, wy = 136 - 58 + 8;
  L(c, wx - 2, wy + 1, wx + 9, wy + 6, K.wood0, 2); L(c, wx - 2, wy + 6, wx + 9, wy + 1, K.wood0, 2);
  // bare trees
  for (const [x, h, sd] of [[120, 70, 3], [262, 60, 8], [420, 80, 5], [40, 54, 9]]) bareTree(c, x - ox, 136, h, sd);
  smoke(c, 170 - ox + 55, 136 - 58 - 20, t, 2);
}

/* ---- S1: a quiet farming town, 1950s ---- */
const S1 = {
  name: '1950年代の町', bgm: 'eerie',
  init(S) { const L = S.lines[0]; S.dur = L.se + 1.4; },
  draw(c, t, S) {
    const camX = 90 * ss(t / S.dur);
    nightSky(c, t); moon(c, 262 - camX * 0.1, 30, 10, t);
    // far hills
    PF(c, [0, 122, 60, 104, 140, 116, 220, 100, 320, 112, 420, 102, 420, 140, 0, 140].map((v, i) => i % 2 ? v : v - camX * 0.2), K.night1);
    // town: church, water tower, houses
    const ox = camX;
    const tx = 260 - ox * 0.7; R(c, tx, 70, 2, 40, K.wood3); R(c, tx + 12, 70, 2, 40, K.wood3); L(c, tx, 90, tx + 14, 80, K.wood3); E(c, tx + 7, 66, 11, 8, K.wood3); R(c, tx - 4, 64, 22, 2, K.wood2);
    for (const [x, w, h, lit] of [[10, 40, 26, false], [60, 46, 30, true], [118, 36, 24, true], [214, 44, 28, false], [266, 40, 26, true], [318, 50, 30, true], [380, 42, 24, false]]) {
      house(c, x - ox, 140, w, h, { t, wall: K.wood1, wall2: K.wood2, roof: K.wood3, snow: true, windows: [[6, 8, lit], [w - 14, 8, lit && x % 3 === 0]] });
    }
    // church with steeple
    const cx = 160 - ox; R(c, cx, 100, 40, 40, '#5c5458'); PF(c, [cx - 3, 101, cx + 20, 86, cx + 43, 101], K.wood3); R(c, cx + 14, 64, 12, 26, '#5c5458'); PF(c, [cx + 12, 65, cx + 20, 46, cx + 28, 65], K.wood3);
    R(c, cx + 19, 38, 2, 9, K.snow1); R(c, cx + 16, 41, 8, 2, K.snow1); R(c, cx + 17, 108, 6, 10, K.win1); R(c, cx + 16, 126, 8, 14, K.wood3);
    // street + lamps
    snowGround(c, 140, ox, 100);
    R(c, 0, 158, W, 10, K.snow2); for (let x = 0; x < W; x += 16) R(c, x - mod(ox, 16), 162, 8, 1, K.snow1);
    for (let i = 0; i < 6; i++) { const x = i * 80 + 30 - ox; R(c, x, 128, 2, 30, K.wood3); R(c, x - 2, 126, 6, 3, K.win1); PF(c, [x - 1, 129, x - 14, 158, x + 16, 158, x + 3, 129], DA(K.win0, 0.12)); }
    snowfall(c, t, 70, 3, 10, 16);
    capPlate(c, t, 0.9, ['1950年代　アメリカ', 'ウィスコンシン州 プレインフィールド']);
    return { z: 1 + 0.06 * ss(t / S.dur), fx: 160, fy: 100 };
  }
};

/* ---- S2: the farm on the edge of town; the closed rooms ---- */
const S2 = {
  name: '町はずれの農場', bgm: 'eerie',
  init(S) {
    const A = S.lines[0], B = S.lines[1];
    S.tW0 = 0.6; S.tDoor = A.se - 0.2; S.tIn = S.tDoor + 0.6; S.tZ0 = B.t0 - 0.3; S.tGhost = B.t0 + B.segs[1].a; S.dur = B.se + 1.6;
  },
  draw(c, t, S) {
    const ox = 20;
    nightSky(c, t); moon(c, 60, 34, 12, t);
    geinFarm(c, t, ox);
    // Ed walks to the door
    if (t < S.tIn) {
      const k = sg(t, S.tW0, S.tDoor), x = lerp(10, 170 - ox + 34, k), walking = t > S.tW0 && t < S.tDoor;
      blit(c, personSpr(GEIN, { f: walking ? Math.floor(t * 8) & 3 : -1 }), x, 138, PER_AX, PER_AY);
      for (let i = 0; i < 8; i++) { const fx = lerp(10, x, i / 8); if (fx < x - 6) R(c, fx, 138, 3, 1, K.snow2); }
    }
    if (t > S.tDoor && t < S.tIn + 0.2) { const a = 1 - Math.abs(t - (S.tDoor + 0.4)) / 0.4; if (a > 0) { R(c, 170 - ox + 30, 123, 8, 13, DA(K.win0, a)); } }
    // the closed upstairs room: a faint figure behind the boards
    const wx = 170 - ox + 13, wy = 136 - 58 + 12;
    if (t > S.tGhost) { const a = Math.min(sg(t, S.tGhost, S.tGhost + 1.2), 1 - sg(t, S.dur - 1.6, S.dur - 0.6)) * 0.7; if (a > 0) {
      const g = cached('ghostMom', () => SPR(null, 10, 12, x => { E(x, 5, 3, 2.5, 2.5, '#c8c4cc'); E(x, 5, 1, 2.5, 1.5, '#8c8890'); PF(x, [1, 12, 3, 6, 7, 6, 9, 12], '#6c6870'); }, null, null));
      c.drawImage(ditherFade(g, a, 'ghm'), wx - 4, wy - 4); } }
    snowfall(c, t, 50, 5, 14, 14);
    const zk = ss(sg(t, S.tZ0, S.tZ0 + 3.2));
    return { z: 1 + 1.6 * zk, fx: lerp(160, wx, zk), fy: lerp(110, wy, zk) };
  }
};

/* ---- S3: the hardware store, the receipt, the name ---- */
function slipSpr() {
  return cached('slip', () => {
    const [cv, x] = mk(120, 90);
    R(x, 0, 0, 120, 90, '#e8e2cc'); x.fillStyle = DP('#e8e2cc', '#d4ccb0', 3); x.fillRect(0, 0, 120, 90);
    R(x, 0, 0, 120, 14, '#c8bc9c'); TX(x, 'SALES SLIP', 8, 0, '#5c4c3c', 16, null);
    for (let y = 20; y < 90; y += 12) R(x, 4, y + 10, 112, 1, '#b8c4dc');
    TX(x, 'ANTIFREEZE', 8, 20, '#1c2c6c', 16, null); TX(x, '1 GAL.', 8, 36, '#1c2c6c', 16, null);
    TX(x, '（不凍液）', 50, 36, '#5c4c3c', 16, null); R(x, 6, 70, 60, 1, '#1c2c6c');
    return cv;
  });
}
const S3 = {
  name: '金物店', bgm: 'pulse',
  init(S) {
    const A = S.lines[0], B = S.lines[1];
    S.tSlip = B.t0 - 0.3; S.tName = B.t0 + B.segs[3].a - 0.25; S.dur = B.se + 1.8;
  },
  storefront(c, t, S) {
    VG(c, 0, 0, W, 120, ['#5c6474', '#7c8494', '#9ca4b0']);
    for (const [x, w, h] of [[-10, 70, 70], [250, 90, 64]]) { R(c, x, 140 - h, w, h, '#4c4440'); R(c, x, 140 - h, w, 4, '#3c3430'); }
    // the store
    R(c, 56, 52, 196, 88, '#7c6450'); R(c, 56, 52, 196, 6, '#5c4838'); for (let y = 60; y < 140; y += 4) R(c, 56, y, 196, 1, '#6c5444');
    R(c, 70, 58, 168, 22, '#2c2420'); R(c, 72, 60, 164, 18, '#e8dcc0'); TX(c, 'HARDWARE', 154 - textSpr('HARDWARE', 16, '#7c1c1c').width / 2, 60, '#7c1c1c', 16, null);
    // windows (dark inside) with an empty counter
    for (const wx of [70, 184]) { R(c, wx, 88, 54, 40, '#1c1a1c'); R(c, wx + 2, 90, 50, 36, '#2c2a30'); R(c, wx + 4, 116, 46, 8, '#4c3c30'); L(c, wx + 2, 90, wx + 16, 126, DA('#c8d0dc', 0.3)); }
    // door, swinging ajar
    const ang = 0.35 + Math.sin(t * 1.3) * 0.12; R(c, 132, 88, 26, 52, '#141214'); const dw = Math.round(26 * Math.cos(ang));
    R(c, 132, 88, dw, 52, '#5c4434'); R(c, 132 + 3, 92, Math.max(1, dw - 6), 18, '#2c2a30'); P(c, 132 + dw - 3, 116, K.win2);
    snowGround(c, 140, 0, 100); R(c, 0, 150, W, 18, K.snow2);
    for (let i = 0; i < 14; i++) { const x = 140 + i * 9 + Math.sin(i) * 2; R(c, x, 144 + (i & 1) * 2, 3, 1, K.snow3); } // footprints
    snowfall(c, t, 40, 8, 6, 12);
    capPlate(c, t, 0.8, ['1957年11月16日', '町の金物店']);
  },
  draw(c, t, S) {
    if (t < S.tSlip) { this.storefront(c, t, S); return { z: 1 + 0.1 * ss(t / S.tSlip), fx: 145, fy: 110 }; }
    // close-up: the last receipt on the counter
    const u = t - S.tSlip;
    VG(c, 0, 0, W, H, ['#3c2c24', '#2c201c', '#1c1410']); for (let y = 0; y < H; y += 6) R(c, 0, y, W, 1, '#342620');
    const sl = slipSpr(), k = eOut(sg(u, 0, 0.6));
    blit(c, sl, 160, lerp(260, 92, k), 60, 45, { s: 1.6, rot: -0.05 });
    if (u > 1.2) { const a = sg(u, 1.2, 1.7); E(c, 120, 66, 56, 14, DA('#f8e070', 0.25 * a)); }
    if (t > S.tName) { // the name: Ed Gein
      const v = t - S.tName, a = clamp(v / 0.5, 0, 1);
      c.fillStyle = DA('#000000', 0.85 * a); c.fillRect(0, 0, W, H);
      E(c, 160, 84, 80, 70, DA(K.red2, 0.6 * a));
      if (a > 0) { const f = geinFace({ expr: 'blank', blink: blinkOf(t, 66) }); const [gc, gx] = slot('gfz', f.width * 2, f.height * 2); gx.imageSmoothingEnabled = false; gx.drawImage(f, 0, 0, f.width * 2, f.height * 2); c.drawImage(ditherFade(gc, a, 'gfzd'), 160 - f.width, 84 - f.height); }
      if (v > 0.5) { const w = textSpr('EDWARD GEIN', 16, C.white).width; R(c, 160 - w / 2 - 8, 136, w + 16, 22, '#000000'); R(c, 160 - w / 2 - 8, 136, w + 16, 2, K.red1); TX(c, 'EDWARD GEIN', 160 - w / 2, 139, C.white, 16, null); }
    }
    return { z: 1 + 0.06 * ss(sg(u, 0, 6)), fx: 160, fy: 96 };
  }
};
