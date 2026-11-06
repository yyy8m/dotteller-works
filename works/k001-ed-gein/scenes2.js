/* ================= 記録 #001 エド・ゲイン: scenes (2) — 1957 to the end ================= */
function copCar(c, x, y, t) {
  PF(c, [x, y - 6, x + 6, y - 14, x + 18, y - 22, x + 44, y - 22, x + 54, y - 14, x + 64, y - 12, x + 66, y - 4, x + 64, y, x, y], '#1c2028');
  PF(c, [x + 4, y - 10, x + 62, y - 10, x + 62, y - 6, x + 4, y - 6], '#e8e8e0');
  PF(c, [x + 20, y - 20, x + 30, y - 20, x + 30, y - 14, x + 14, y - 14], '#5c6c8c'); PF(c, [x + 33, y - 20, x + 43, y - 20, x + 50, y - 14, x + 33, y - 14], '#5c6c8c');
  for (const wx of [x + 12, x + 52]) { E(c, wx, y, 6, 6, '#0c0c10'); E(c, wx, y, 3, 3, '#8c8c94'); }
  const on = (Math.floor(t * 4) & 1) === 0; R(c, x + 28, y - 26, 6, 4, on ? K.red0 : K.red2);
  if (on) { E(c, x + 31, y - 24, 22, 12, DA(K.red0, 0.22)); E(c, x + 31, y - 24, 60, 30, DA(K.red0, 0.08)); }
}
const junkCv = (() => {
  const [cv, x] = mk(W, H), r = rngf(17);
  VG(x, 0, 0, W, H, ['#3c3430', '#2c2622', '#1c1814']); for (let y = 0; y < 150; y += 5) R(x, 0, y, W, 1, '#342c28');
  R(x, 0, 150, W, 90, '#2c241e'); for (let i = 0; i < 30; i++) R(x, r() * W, 150 + r() * 90, 20 + r() * 30, 1, '#3c3028');
  for (let i = 0; i < 26; i++) { const bx = r() * W, bw = 14 + r() * 30, bh = 10 + r() * 26, by = 150 - r() * 30; R(x, bx, by - bh, bw, bh, ['#5c4c3c', '#4c4034', '#6c5c48', '#3c342c'][i % 4]); R(x, bx, by - bh, bw, 2, '#7c6c58'); }
  for (let i = 0; i < 18; i++) { const bx = r() * W, by = 120 + r() * 60; for (let k = 0; k < 6; k++) R(x, bx + k, by - k * 3, 22, 2, k & 1 ? '#c8bc9c' : '#a89c80'); }
  for (let i = 0; i < 20; i++) { const bx = r() * W, by = 100 + r() * 70; R(x, bx, by, 5, 7, '#7c7c84'); R(x, bx, by, 5, 1, '#a8a8b0'); }
  R(x, 20, 40, 60, 50, '#4c3c30'); R(x, 24, 44, 52, 42, '#1c1814'); R(x, 230, 30, 70, 6, '#4c3c30');
  return cv;
})();
function copFace() { return SPR('copFace', 32, 32, c => { R(c, 6, 26, 20, 6, K.cop1); E(c, 16, 15, 9, 10, '#e0b08c'); R(c, 6, 4, 20, 6, K.cop1); R(c, 4, 9, 24, 2, K.cop2); P(c, 16, 6, K.badge); for (const x0 of [11, 18]) { R(c, x0, 13, 4, 4, C.white); R(c, x0 + 1, 14, 2, 2, C.k); } L(c, 10, 11, 14, 10, '#7c5038'); L(c, 18, 10, 22, 11, '#7c5038'); E(c, 16, 22, 2.5, 3, '#401010'); }); }
function slipSpr() {
  return cached('slip', () => { const [cv, x] = mk(120, 90);
    R(x, 0, 0, 120, 90, '#e8e2cc'); x.fillStyle = DP('#e8e2cc', '#d4ccb0', 3); x.fillRect(0, 0, 120, 90);
    R(x, 0, 0, 120, 14, '#c8bc9c'); TX(x, 'SALES SLIP', 8, 0, '#5c4c3c', 16, null); for (let y = 20; y < 90; y += 12) R(x, 4, y + 10, 112, 1, '#b8c4dc');
    TX(x, 'ANTIFREEZE', 8, 20, '#1c2c6c', 16, null); TX(x, '1 GAL.', 8, 36, '#1c2c6c', 16, null); TX(x, '（不凍液）', 50, 36, '#5c4c3c', 16, null); R(x, 6, 70, 60, 1, '#1c2c6c'); return cv; });
}
function storeInside(c, t) {
  roomBg(c, { wall: '#7c6c58', wall2: '#746450', floor: '#5c4c3c', fy: 132, window: [250, 30] });
  for (let s = 0; s < 3; s++) { R(c, 10, 30 + s * 24, 140, 3, '#5c4430'); for (let i = 0; i < 14; i++) R(c, 14 + i * 10, 18 + s * 24, 6, 12, ['#8c8c94', '#c8a048', '#7c3c2c', '#4c6c8c'][(i + s) % 4]); }
  for (let i = 0; i < 5; i++) { R(c, 170 + i * 10, 24, 3, 46, '#5c3c24'); R(c, 170 + i * 10, 24, 3, 8, '#3c3c44'); } // the gun rack
  counterFront(c);
}
function counterFront(c) { R(c, 196, 90, 124, 6, '#8c6c48'); R(c, 196, 94, 124, 38, '#6c4c30'); }
function speech(c, s, cx, y, tailX) { const w = textSpr(s, 16, '#000').width + 12; R(c, cx - w / 2, y, w, 24, '#000000'); R(c, cx - w / 2 + 2, y + 2, w - 4, 20, C.white); if (tailX != null) PF(c, [tailX - 5, y + 23, tailX + 5, y + 23, tailX, y + 32], C.white); TX(c, s, cx - w / 2 + 6, y + 4, '#000000', 16, null); }

/* ---- SH: November 16, 1957 — deer season opens ---- */
const SH = {
  name: '鹿狩りの日', ch: '1957年11月16日', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, 130, ['#8c949c', '#b0b4b8', '#c8c4bc']);
    for (let i = 0; i < 20; i++) { const x = i * 18 - t * 4; PF(c, [x, 130, x + 9, 60 + (i * 13 % 30), x + 18, 130], i & 1 ? '#3c4c34' : '#2c3c28'); }
    snowGround(c, 128, t * 6, 112);
    for (let i = 0; i < 4; i++) { const x = 40 + i * 50 + t * 12; blit(c, personSpr(HUNTER, { f: Math.floor(t * 7 + i) & 3, weapon: 'rifle', arm: 'fwd', id: 'h' + i }), x, 150 + (i & 1) * 6, PER_AX, PER_AY, { s: 1.2 }); }
    const dx = 300 - t * 10; PF(c, [dx, 150, dx + 14, 150, dx + 16, 142, dx + 2, 140], '#8c6c4c'); E(c, dx + 18, 138, 4, 3, '#8c6c4c'); L(c, dx + 18, 134, dx + 22, 128, '#5c4430'); L(c, dx + 4, 150, dx + 4, 158, '#5c4430'); L(c, dx + 12, 150, dx + 12, 158, '#5c4430');
    yearFlash(c, t, 0.2, 1957); capPlate(c, t, 0.5, ['1957年11月16日', '鹿狩りの解禁日']);
    return { z: 1.03, fx: 160, fy: 120 };
  }
};

/* ---- SI: the hardware store — Bernice Worden is shot ---- */
const SI = {
  name: '金物店', bgm: 'dread',
  init(S) { const l = ln(S, 'L18'); S.tGrab = l.t0 + 0.2; S.tShot = l.t0 + l.segs[2].a + 0.3; S.tDrag = S.tShot + 1.2; S.tEmpty = l.t0 + l.segs[4].a - 0.3; S.dur = l.se + 1.4; },
  draw(c, t, S) {
    storeInside(c, t);
    if (t < S.tEmpty) {
      const shot = t > S.tShot, fall = eOut(sg(t, S.tShot, S.tShot + 0.5)), drag = sg(t, S.tDrag, S.tEmpty);
      if (!shot) blit(c, personSpr(BERNICE, { f: -1, id: 'b1' }), 250, 92, PER_AX, PER_AY, { s: 1.3 });
      else if (drag <= 0) blit(c, personSpr(BERNICE, { f: -1, id: 'b2', shock: true }), 250 + fall * 8, 92 + fall * 40, PER_AX, PER_AY, { s: 1.3, rot: fall * 1.45 });
      counterFront(c);
      const gx = lerp(100, 150, sg(t, S.tGrab, S.tShot - 0.4)), aim = t > S.tShot - 0.5;
      if (drag <= 0) blit(c, personSpr(GEIN, { f: aim ? -1 : Math.floor(t * 6) & 3, weapon: 'rifle', arm: aim ? 'aim' : 'fwd', id: aim ? 'gs' : 'gg' }), gx, 154, PER_AX, PER_AY, { s: 1.4 });
      if (shot) { const v = t - S.tShot; muzzleFlash(c, gx + 26, 129, 1, 1 - v * 6); flashScreen(c, 0.7 - v * 4); bloodSplat(c, 252, 64, 30, 9, Math.min(1, v * 4)); for (let i = 0; i < 3; i++) bloodDrip(c, 236 + i * 9, 88, 6 + i * 4, t, i); }
      if (drag > 0) { const bx = lerp(240, 40, drag); bloodPool(c, 240, 146, 18, 3); bloodTrail(c, [240, 146, bx, 150], 7); lyingBody(c, BERNICE, bx, 148, -1, { id: 'bd' });
        blit(c, personSpr(GEIN, { f: Math.floor(t * 5) & 3, arm: 'fwd', id: 'gd' }), bx - 26, 154, PER_AX, PER_AY, { s: 1.4, flip: true }); }
      return { z: 1.05, fx: shot ? 220 : 180, fy: 110, sx: shot && t < S.tShot + 0.25 ? Math.round(Math.sin(t * 80) * 3) : 0 };
    }
    bloodPool(c, 240, 146, 24, 3); bloodTrail(c, [240, 146, 140, 150, 30, 154, -10, 156], 8); for (let i = 0; i < 3; i++) bloodDrip(c, 236 + i * 9, 96, 10 + i * 4, t, i);
    R(c, 236, 80, 30, 10, '#5c4430'); ER(c, 251, 85, 22, 10, K.red0); TX(c, '？', 244, 46, K.red0, 32, '#000000');
    return { z: 1 + 0.15 * ss(sg(t, S.tEmpty, S.dur)), fx: 200, fy: 120 };
  }
};

/* ---- SJ: her son, the deputy; the receipt ---- */
const SJ = {
  name: '保安官代理の息子', bgm: 'pulse',
  init(S) { S.tBack = at(S, 'F1', 0) - 0.2; S.tSlip = at(S, 'L20', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t < S.tBack) { storeInside(c, t); bloodTrail(c, [240, 146, 140, 150, 30, 154], 8);
      blit(c, personSpr(COP, { f: -1, id: 'fw', shock: true }), 150, 154, PER_AX, PER_AY, { s: 1.5, flip: true });
      capPlate(c, t, 0.4, ['保安官代理', 'フランク・ウォーデン']); return { z: 1.05, fx: 180, fy: 110 }; }
    if (t < S.tSlip) { // the night before (sepia memory)
      storeInside(c, t); blit(c, personSpr(BERNICE, { f: -1, id: 'bm' }), 250, 92, PER_AX, PER_AY, { s: 1.3 }); counterFront(c);
      blit(c, personSpr(GEIN, { f: -1, id: 'gm' }), 176, 154, PER_AX, PER_AY, { s: 1.4 });
      speech(c, '明日 不凍液を買いに来るよ', 140, 52, 176);
      const im = c.getImageData(0, 0, W, H), d = im.data; for (let i = 0; i < d.length; i += 4) { const g = d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11; d[i] = Math.min(255, g * 1.05 + 24); d[i + 1] = Math.min(255, g * 0.92 + 12); d[i + 2] = g * 0.7; } c.putImageData(im, 0, 0);
      capPlate(c, t, S.tBack + 0.2, ['前の晩']); return { z: 1.04, fx: 200, fy: 110 }; }
    const u = t - S.tSlip;
    VG(c, 0, 0, W, H, ['#3c2c24', '#2c201c', '#1c1410']); for (let y = 0; y < H; y += 6) R(c, 0, y, W, 1, '#342620');
    blit(c, slipSpr(), 160, lerp(260, 92, eOut(sg(u, 0, 0.6))), 60, 45, { s: 1.6, rot: -0.05 });
    if (u > 1.2) E(c, 120, 66, 56, 14, DA('#f8e070', 0.25 * sg(u, 1.2, 1.7)));
    return { z: 1 + 0.06 * ss(sg(u, 0, 6)), fx: 160, fy: 96 };
  }
};

/* ---- SK: the arrest; the shed ---- */
function hangingBody(c, x, y, t) { // dark silhouette hanging upside down from the beam, slowly turning
  const sw = Math.sin(t * 0.9) * 0.05;
  c.save(); c.translate(x, y); c.rotate(sw);
  L(c, -4, 0, -3, 14, '#8c7c5c'); L(c, 4, 0, 3, 14, '#8c7c5c');
  PF(c, [-6, 12, 6, 12, 7, 40, 10, 70, -10, 70, -7, 40], '#2c1a1c'); PF(c, [-4, 14, 4, 14, 5, 40, 7, 66, -7, 66, -5, 40], '#3c2426');
  L(c, -9, 50, -15, 74, '#2c1a1c', 3); L(c, 9, 50, 15, 74, '#2c1a1c', 3);
  R(c, -7, 66, 14, 6, BLOOD[0]);
  c.restore();
}
const SK = {
  name: '農場の小屋', ch: '農場の小屋', bgm: 'pulse',
  init(S) { S.has21 = !!ln(S, 'L21'); S.tFarm = S.has21 ? at(S, 'L21', 2) - 0.2 : -1; S.tShed = S.has21 ? at(S, 'L22', 0) - 0.4 : 0.1; S.tReveal = at(S, 'L22', 3); S.tShock = ln(S, 'C1') ? at(S, 'C1', 0) - 0.1 : at(S, 'L22', 4) + 1.0; S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    if (S.has21 && t < S.tFarm) { // arrested at a grocery
      roomBg(c, { wall: '#6c6454', wall2: '#645c4c', floor: '#4c443c', window: [30, 34] });
      R(c, 180, 100, 140, 56, '#5c4430'); for (let i = 0; i < 5; i++) R(c, 186 + i * 26, 78, 18, 22, ['#c8a048', '#8c3c2c', '#5c7c4c'][i % 3]);
      blit(c, personSpr(GEIN, { f: -1, id: 'gar', shock: true }), 150, 156, PER_AX, PER_AY, { s: 1.4 });
      for (let i = 0; i < 2; i++) blit(c, personSpr(COP, { f: -1, arm: 'fwd', id: 'ca' + i }), 116 + i * 70, 156, PER_AX, PER_AY, { s: 1.4, flip: i === 1 });
      return { z: 1.05, fx: 150, fy: 130 };
    }
    if (t < S.tShed) { nightSky(c, t, 140, [K.night0, K.night0, K.night1, K.night2]); geinFarm(c, t, 60, { lit: false }); copCar(c, 10, 150, t); copCar(c, 84, 156, t + 0.3);
      for (let i = 0; i < 3; i++) { const x = lerp(150 + i * 20, 230 + i * 20, sg(t, S.tFarm, S.tShed)); blit(c, personSpr(COP, { f: Math.floor(t * 7 + i) & 3, arm: 'fwd', id: 'cw' + i }), x, 150, PER_AX, PER_AY); beam(c, x + 8, 128, -0.1 + Math.sin(t * 1.4 + i) * 0.3, 80, 0.18, 0.4); }
      snowfall(c, t, 40, 9, 10, 14); capPlate(c, t, S.tFarm + 0.3, ['その夜', 'ゲインの農場']); return { z: 1.05, fx: 160, fy: 110 }; }
    const u = t - S.tShed;
    R(c, 0, 0, W, H, '#1c1410'); for (let x = 0; x < W; x += 14) R(c, x, 0, 13, 150, '#2c201a'); R(c, 0, 150, W, 90, '#141008'); R(c, 0, 20, W, 8, '#3c2c20');
    hangingBody(c, 160, 28, t);
    for (let i = 0; i < 3; i++) bloodDrip(c, 156 + i * 4, 100, 6 + i * 4, t, i + 3);
    bloodPool(c, 160, 156, 20 + Math.min(10, u * 2), 11);
    const k = eOut(sg(u, 0.5, 2.8)), lx = lerp(40, 160, k) + Math.sin(u * 1.3) * 8, ly = lerp(150, 70, k);
    darkness(c, lx, ly, t > S.tReveal ? 90 : 50, 0.97); E(c, lx, ly, 26, 20, DA('#fff4c8', 0.1));
    if (t > S.tShock) { c.fillStyle = DA('#000000', 0.55); c.fillRect(0, 0, W, H); blit(c, copFace(), 160, 86, 17, 17, { s: 3 }); redVignette(c, 0.6); }
    return { z: 1 + 0.25 * ss(sg(u, 0, 5)), fx: 160, fy: 90, sx: t > S.tShock && t < S.tShock + 0.3 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
};

/* ---- SL: inside the house — what the flashlights found ---- */
const SL = {
  name: '家の中', ch: '家の中', bgm: 'pulse',
  init(S) { S.it = [2, 3, 4, 6].map(k => at(S, 'L23', k) - 0.2); S.tBag = ln(S, 'L24') ? at(S, 'L24', 0) - 0.3 : 1e9; S.tConf = ln(S, 'L25') ? at(S, 'L25', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    if (t < S.tBag) {
      c.drawImage(junkCv, 0, 0);
      R(c, 30, 130, 80, 6, '#5c4430'); R(c, 36, 136, 4, 30, '#4c3424'); R(c, 100, 136, 4, 30, '#4c3424');
      for (const x of [44, 66, 88]) { E(c, x, 126, 9, 6, '#d8ccb0'); E(c, x, 124, 7, 3, '#5c4c3c'); R(c, x - 3, 128, 2, 2, '#8c7c64'); } // skull bowls
      R(c, 140, 96, 30, 26, '#d4b494'); for (let k = 0; k < 4; k++) L(c, 142, 100 + k * 6, 168, 100 + k * 6, '#b89070'); R(c, 140, 120, 30, 6, '#d8b898'); R(c, 140, 96, 4, 60, '#5c4430'); R(c, 166, 126, 4, 30, '#5c4430'); // skin chair
      PF(c, [214, 70, 236, 70, 244, 96, 206, 96], '#e4c8a8'); L(c, 225, 40, 225, 70, '#3c3c44'); R(c, 222, 96, 6, 20, '#5c4430'); R(c, 214, 116, 22, 4, '#5c4430'); // lampshade
      for (let i = 0; i < 4; i++) { const x = 145 + i * 30, y = 30; E(c, x, y, 9, 11, '#d8b898'); R(c, x - 5, y - 3, 3, 4, '#1c1410'); R(c, x + 3, y - 3, 3, 4, '#1c1410'); R(c, x - 2, y + 5, 6, 2, '#1c1410'); } // masks
      const k = S.it.filter(v => t >= v).length;
      const tg = [[120, 110], [66, 126], [155, 108], [225, 84], [190, 34]][k], lx = tg[0] + Math.sin(t * 1.2) * 10, ly = tg[1] + Math.cos(t * 1.5) * 6;
      darkness(c, lx, ly, 62, 0.97);
      return { z: 1.1, fx: lx, fy: ly };
    }
    if (t < S.tConf) { const u = t - S.tBag; // the paper bag
      R(c, 0, 0, W, H, '#1c1410'); R(c, 0, 150, W, 90, '#2c2018');
      PF(c, [130, 150, 136, 90, 184, 90, 190, 150], '#a88c5c'); L(c, 136, 90, 184, 90, '#c8a878'); for (let k = 0; k < 4; k++) L(c, 140 + k * 12, 92, 138 + k * 12, 148, '#8c7448');
      darkness(c, 160, 120, 70, 0.97); if (u > 1.4) { redVignette(c, 0.7); bigCap(c, '3年前に消えた女主人', 30, 16, C.white); }
      return { z: 1 + 0.2 * ss(u / 4), fx: 160, fy: 120 }; }
    const u = t - S.tConf; // the confession
    R(c, 0, 0, W, H, '#14100c'); L(c, 160, 0, 160, 40, '#2c2c2c'); PF(c, [144, 50, 150, 40, 170, 40, 176, 50], '#4c4c44'); E(c, 160, 120, 100, 80, DA(K.win0, 0.1));
    R(c, 110, 130, 100, 8, '#3c2c20'); blit(c, personSpr(GEIN, { f: -1, id: 'gq' }), 136, 156, PER_AX, PER_AY, { s: 1.4 }); blit(c, personSpr(DET, { f: -1, id: 'dq' }), 196, 156, PER_AX, PER_AY, { s: 1.4, flip: true });
    if (u > 2.5) c.drawImage(ditherFade(augustaFace(), Math.min(0.5, sg(u, 2.5, 4) * 0.5), 'augg'), 136, 30);
    return { z: 1.06, fx: 160, fy: 110 };
  }
};

/* ---- SM: 1958 — the hospital, the fire, the car at the carnival ---- */
const SM = {
  name: 'その後', ch: 'その後', bgm: 'requiem',
  init(S) { S.tFire = at(S, 'L26', 3) - 0.3; S.tCar = at(S, 'L27', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tFire) { nightSky(c, t, 150, [K.night1, K.night2, K.night3, '#3c4868']); snowGround(c, 140, 0, 100);
      R(c, 70, 76, 180, 64, '#5c5c64'); PF(c, [140, 76, 160, 58, 180, 76], '#3c3c44'); for (let r = 0; r < 2; r++) for (let k = 0; k < 8; k++) { const x = 80 + k * 21, y = 88 + r * 24; R(c, x, y, 10, 14, (k + r) % 3 ? '#1c1c24' : K.win1); for (let b = 2; b < 10; b += 3) R(c, x + b, y, 1, 14, '#8c8c94'); }
      yearFlash(c, t, 0.2, 1958); capPlate(c, t, 0.5, ['1958年', '州立の精神病院へ']); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t < S.tCar) { nightSky(c, t, 150, ['#1c0806', '#3c0c08', '#5c1c0c', '#8c3c14']); R(c, 0, 140, W, 100, '#1c1410');
      fireHouse(c, 120, 140, 80, 58, t, Math.min(1, (t - S.tFire) / 1.5 + 0.3)); embers(c, t, 30, 3, [0, 0, W, 150], [C.hell6, C.hell7]);
      return { z: 1 + 0.08 * ss(sg(t, S.tFire, S.tCar)), fx: 160, fy: 100 }; }
    VG(c, 0, 0, W, 140, ['#1c0c2c', '#3c1c4c', '#5c2c5c']); R(c, 0, 140, W, 100, '#3c2c20');
    for (let i = 0; i < 4; i++) { const x = i * 90 - 10; PF(c, [x, 140, x + 40, 70, x + 80, 140], i & 1 ? '#c82828' : '#f4ecd8'); for (let k = 0; k < 4; k++) PF(c, [x + 40, 70, x + 10 + k * 20, 140, x + 20 + k * 20, 140], k & 1 ? '#f4ecd8' : '#c82828'); }
    for (let i = 0; i < 20; i++) { const on = (Math.floor(t * 4) + i) & 1; E(c, i * 17, 60 + Math.sin(i) * 4, 2, 2, on ? '#f8e070' : '#7c6c30'); }
    const cx = 110; PF(c, [cx, 156, cx + 8, 142, cx + 24, 132, cx + 70, 132, cx + 84, 142, cx + 100, 144, cx + 102, 156], '#2c3c4c'); E(c, cx + 20, 156, 7, 7, '#0c0c10'); E(c, cx + 82, 156, 7, 7, '#0c0c10'); R(c, cx + 28, 134, 40, 7, '#7c8ca8');
    R(c, 104, 92, 116, 30, '#000000'); R(c, 106, 94, 112, 26, '#f8e070'); TX(c, '殺人鬼の車', 122, 98, '#c81818', 16, null);
    for (let i = 0; i < 6; i++) { const x = 20 + i * 50; E(c, x, 196, 9, 9, '#0c0806'); R(c, x - 10, 202, 20, 40, '#0c0806'); }
    return { z: 1.04, fx: 160, fy: 120 };
  }
};

/* ---- SN: 1968 trial, 1984 death ---- */
const SN = {
  name: '裁判と最期', bgm: 'requiem',
  init(S) { S.tGavel = at(S, 'L28', 2) + 0.4; S.tHosp = at(S, 'L29', 0) - 0.3; S.tY = at(S, 'L29', 3) - 0.2; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t < S.tHosp) { VG(c, 0, 0, W, H, ['#3c2a20', '#2c1e18', '#1c1410']); for (let x = 0; x < W; x += 24) R(c, x, 0, 2, 120, '#4c3628');
      R(c, 80, 60, 160, 60, '#5c3c28'); R(c, 80, 60, 160, 4, '#7c5438'); E(c, 160, 40, 9, 10, '#d8b090'); R(c, 148, 48, 24, 14, '#141010'); R(c, 152, 28, 16, 6, '#c8c8c8');
      const hit = t > S.tGavel && t < S.tGavel + 0.25; blit(c, cached('gavel', () => SPR(null, 22, 8, x => { R(x, 0, 0, 10, 8, '#6c4428'); R(x, 10, 3, 12, 2, '#8c5c38'); })), 200, 66, 20, 4, { rot: hit ? 0.2 : -0.9 }); R(c, 186, 70, 20, 4, '#4c2c1c');
      if (hit) for (let i = 0; i < 6; i++) L(c, 192, 70, 192 + Math.cos(i) * 14, 70 - Math.abs(Math.sin(i)) * 10, C.white);
      blit(c, personSpr(GEIN, { f: -1, id: 'gct' }), 120, 162, PER_AX, PER_AY, { flip: true, s: 1.4 });
      for (let i = 0; i < 5; i++) { const x = 20 + i * 64; E(c, x, 190, 12, 12, '#0c0806'); R(c, x - 14, 196, 28, 44, '#0c0806'); }
      yearFlash(c, t, 0.2, 1968, 14); return { z: 1.05, fx: 160, fy: 80, sy: hit ? 2 : 0 }; }
    nightSky(c, t, 150, [K.night1, K.night2, K.night3, '#3c4868']); snowGround(c, 140, 0, 100);
    R(c, 70, 76, 180, 64, '#5c5c64'); for (let r = 0; r < 2; r++) for (let k = 0; k < 8; k++) { const x = 80 + k * 21, y = 88 + r * 24; R(c, x, y, 10, 14, (k + r) % 3 ? '#1c1c24' : K.win1); }
    const y = t < S.tY ? 1968 : Math.round(lerp(1968, 1984, eOut(sg(t, S.tY, S.tY + 1.6)))); yearCard(c, 216, 10, y, y === 1984 ? '77歳で死去' : '');
    snowfall(c, t, 50, 11, 6, 12); return { z: 1.04, fx: 160, fy: 100 };
  }
};

/* ---- SO: Psycho, Leatherface, Buffalo Bill ---- */
const SO = {
  name: '映画への影響', ch: '映画への影響', bgm: 'eerie',
  init(S) { S.tBook = 0.3; S.tFilm = at(S, 'L30', 2) - 0.2; S.f = [at(S, 'L31', 0) - 0.3, at(S, 'L31', 0) + 0.5]; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#0c0c14', '#141420', '#08080c']);
    if (t < S.f[0]) { const k = eOut(sg(t, S.tBook, S.tBook + 0.6)), by = lerp(-120, 30, k);
      R(c, 60, by, 80, 110, '#000000'); R(c, 61, by + 1, 78, 108, '#e8d8b0'); TX(c, 'PSYCHO', 72, by + 10, '#c81818', 16, null); TX(c, 'R. Bloch', 74, by + 70, '#3c3c3c', 16, null); TX(c, '1959', 84, by + 88, '#3c3c3c', 16, null); E(c, 100, by + 46, 14, 12, '#3c3c3c'); R(c, 92, by + 42, 4, 3, '#e8d8b0'); R(c, 104, by + 42, 4, 3, '#e8d8b0');
      if (t > S.tFilm) { const k2 = eOut(sg(t, S.tFilm, S.tFilm + 0.6)); filmFrame(c, 170, lerp(-80, 40, k2), 100, 70, (cc, X, Y, w, h) => { VG(cc, X, Y, w, h, ['#2c3448', '#4c5468']); PF(cc, [X + 40, Y + 46, X + 52, Y + 20, X + 66, Y + 24, X + 76, Y + 46], '#0c0c10'); R(cc, X + 8, Y + 50, 60, 12, '#0c0c10'); }); TX(c, '映画 1960年', 182, lerp(-10, 124, k2), C.white, 16, '#000000'); }
      return { z: 1.03, fx: 160, fy: 100 }; }
    filmFrames(c, t, S.f, ['サイコ', '羊たちの沈黙'], 44, [0, 2]);
    for (let i = 0; i < 10; i++) { const x = i * 34; E(c, x + 14, 200, 12, 13, '#000000'); R(c, x, 206, 30, 40, '#000000'); }
    return { z: 1, fx: 160, fy: 100 };
  }
};

/* ---- SP: remembering the victims ---- */
const SP = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    nightSky(c, t, 150); moon(c, 250, 36, 11, t);
    for (let i = 0; i < 14; i++) { const x = i * 26 - 10, h = 20 + (i * 7 % 14); PF(c, [x, 130, x + 10, 130 - h, x + 20, 130], K.night0); }
    snowGround(c, 128, 0, 112);
    const fl = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 4.3);
    E(c, 160, 132, 46, 18, DA(K.win1, 0.12 + 0.05 * fl)); E(c, 160, 128, 20, 12, DA(K.win0, 0.15 + 0.06 * fl));
    R(c, 154, 114, 12, 2, '#3c2c1c'); R(c, 153, 116, 14, 16, '#3c2c1c'); R(c, 155, 118, 10, 12, DP('#f8b040', '#fff0b0', Math.round(6 + fl * 8))); E(c, 160, 124, 1.5, 3 + fl, '#fffce8'); L(c, 160, 110, 160, 114, '#3c2c1c');
    for (const [x, col] of [[136, '#f4f0f8'], [142, '#e8c0d0'], [178, '#f4f0f8'], [184, '#d8d0f0']]) { L(c, x, 132, x + 2, 122, '#3c6c3c'); E(c, x + 2, 121, 3, 2.5, col); P(c, x + 2, 121, '#f8e070'); }
    for (const x of [110, 210]) { R(c, x, 104, 4, 26, '#c8c8d0'); R(c, x - 6, 110, 16, 4, '#c8c8d0'); }
    snowfall(c, t, 55, 13, 5, 10);
    return { z: 1 + 0.5 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 118 };
  }
};

/* ---- Shorts only: hook and end card ---- */
function bigPortrait(c, spr, x, y, s, a, id) { const [gc, gx] = slot(id, spr.width * s, spr.height * s); gx.imageSmoothingEnabled = false; gx.drawImage(spr, 0, 0, spr.width * s, spr.height * s); c.drawImage(a < 1 ? ditherFade(gc, a, id + 'd') : gc, Math.round(x - spr.width * s / 2), Math.round(y - spr.height * s / 2)); }
function burstK(c, t) { for (let i = 0; i < 22; i++) { const a = i / 22 * TAU + t * 0.1, w = 0.05; PF(c, [160, 72, 160 + Math.cos(a - w) * 260, 72 + Math.sin(a - w) * 260, 160 + Math.cos(a + w) * 260, 72 + Math.sin(a + w) * 260], DA(K.red0, 0.16)); } }
const SS1 = {
  name: 'ショート冒頭', bgm: 'pulse',
  init(S) { S.tFace = at(S, 'S1', 2) - 0.3; S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#0c0206', '#2c060a', '#0c0206']);
    filmFrames(c, t, [0.1, 0.6], ['サイコ', '羊たちの沈黙'], 30, [0, 2]);
    if (t > S.tFace) { const a = sg(t, S.tFace, S.tFace + 0.4); c.fillStyle = DA('#000000', 0.85 * a); c.fillRect(0, 0, W, H); E(c, 160, 84, 80, 70, DA(K.red2, 0.6 * a));
      if (a > 0) bigPortrait(c, geinFace({ blink: blinkOf(t, 66) }), 160, 84, 2, a, 'ssg');
      if (a >= 1) { const s = 'EDWARD GEIN', w = textSpr(s, 16, C.white).width; R(c, 160 - w / 2 - 8, 136, w + 16, 22, '#000000'); R(c, 160 - w / 2 - 8, 136, w + 16, 2, K.red1); TX(c, s, 160 - w / 2, 139, C.white, 16, null); } }
    return { z: 1, fx: 160, fy: 100 };
  }
};
const SS2 = {
  name: 'ショート締め', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + 2.4; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#0c0206', '#2c060a', '#0c0206']); burstK(c, t);
    bigPortrait(c, geinFace({ blink: blinkOf(t, 66) }), 160, 72, 2, 1, 'ssg2'); redVignette(c, 0.6);
    const t1 = lastSe(S) - 1.4; if (t > t1) { const k = eOut(sg(t, t1, t1 + 0.4)), s = '▶ 続きは本編で'; R(c, 60, 126, 200, Math.round(30 * k), '#000000'); R(c, 62, 128, 196, Math.round(26 * k), K.red1); if (k >= 1) TX(c, s, 160 - textSpr(s, 16, C.white).width / 2, 133, C.white, 16, null); }
    return { z: 1, fx: 160, fy: 100 };
  }
};

/* ---- SX: horror close-up (no narration) ---- */
const SX = { name: '素顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, geinFace({ expr: 'smile', blink: 0 }), [[20, 19], [28, 19]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };
