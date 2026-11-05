/* ================= 記録 #002 ジョン・ゲイシー: scenes 1-3 ================= */
const GACY = { id: 'gacy', coat: '#2c4c7c', coat2: '#1c3458', pants: '#3c3c40', skin: '#e8c0a0', hair: '#2c1c14' };
const BOY = { id: 'boy', coat: '#8c3c2c', coat2: '#5c2418', pants: '#2c3c5c', skin: '#f0c8a8', hair: '#6c4c2c' };
/* Pogo the clown (portrait 48x48): white face, red nose, blue pointed eye marks, red mouth with pointed corners */
function pogoFace(p = {}) {
  const ex = p.expr || 'smile', bl = p.blink || 0;
  return SPR('pogo' + ex + bl, 48, 48, c => {
    // ruff collar & suit
    PF(c, [2, 48, 8, 40, 40, 40, 46, 48], '#c82828'); for (let i = 0; i < 7; i++) E(c, 8 + i * 5.5, 39, 4, 3, i & 1 ? '#f4f4f4' : '#d8d8e8');
    // hair tufts (orange-red)
    for (const [x, y] of [[8, 18], [6, 24], [9, 29], [40, 18], [42, 24], [39, 29]]) E(c, x, y, 4.5, 4, '#e8582c');
    // face
    E(c, 24, 23, 13, 15, '#d8d8dc'); E(c, 24, 22.5, 12.5, 14.5, '#fcfcfc');
    // little hat
    PF(c, [17, 9, 24, -1, 31, 9], '#2c4cb8'); R(c, 15, 8, 18, 3, '#1c348c'); E(c, 24, -1, 2.5, 2.5, '#f8e070');
    // blue pointed eye marks
    for (const x0 of [18, 30]) { PF(c, [x0 - 3, 17, x0, 11, x0 + 3, 17], '#2c6cd8'); PF(c, [x0 - 2, 24, x0, 29, x0 + 2, 24], '#2c6cd8'); }
    for (const x0 of [18, 30]) {
      if (bl === 2) { L(c, x0 - 2, 20, x0 + 2, 20, C.ol); continue; }
      R(c, x0 - 2, 18, 5, 5, '#fcfcfc'); if (ex === 'creepy') { P(c, x0, 20, C.k); L(c, x0 - 3, 16, x0 + 3, 18, C.ol); continue; } R(c, x0 - 1, 19, 3, 3, ex === 'cold' ? '#1c1c1c' : C.k); if (ex !== 'cold') P(c, x0 - 1, 19, C.white);
      L(c, x0 - 3, 17, x0 + 3, 17, C.ol);
    }
    // red nose
    E(c, 24, 26, 3.5, 3.2, '#d81818'); R(c, 22, 24, 2, 1, '#f8a0a0');
    // mouth: red outline with pointed corners up
    if (ex === 'cold') { PF(c, [15, 31, 33, 31, 31, 34, 17, 34], '#c81818'); R(c, 18, 32, 12, 1, '#5c0c0c'); }
    else if (ex === 'creepy') { PF(c, [10, 25, 16, 31, 24, 33, 32, 31, 38, 25, 33, 36, 24, 39, 15, 36], '#d81818'); PF(c, [16, 31, 24, 33, 32, 31, 30, 36, 24, 37, 18, 36], '#3c0408'); for (let x = 18; x < 31; x += 2) R(c, x, 32, 1, 2, '#f4f0e8'); }
    else { PF(c, [12, 27, 17, 32, 24, 34, 31, 32, 36, 27, 31, 35, 24, 37, 17, 35], '#d81818'); PF(c, [17, 32, 24, 34, 31, 32, 28, 34, 24, 35, 20, 34], '#5c0c0c'); }
  });
}
/* John Wayne Gacy (portrait 48x48): round face, dark hair, double chin */
function gacyFace(p = {}) {
  const bl = p.blink || 0;
  return SPR('gacyF' + bl, 48, 48, c => {
    const sk = '#e8c0a0', sk2 = '#c09070', sk3 = '#8c6448';
    PF(c, [2, 48, 8, 38, 40, 38, 46, 48], '#2c4c7c'); PF(c, [18, 38, 24, 46, 30, 38], '#e8e8f0'); L(c, 24, 40, 24, 48, '#8c2c2c', 2);
    E(c, 24, 34, 11, 6, sk2); E(c, 24, 22, 13, 15, sk3); E(c, 24, 21.5, 12.5, 14.5, sk2); E(c, 23.5, 21, 11.5, 13.5, sk);
    E(c, 24, 33, 9, 3.5, sk); L(c, 16, 34, 32, 34, sk2); // double chin
    PF(c, [11, 16, 13, 6, 22, 3, 32, 4, 37, 10, 37, 16, 33, 11, 24, 9, 15, 11], '#2c1c14'); E(c, 18, 6, 6, 3, '#3c2a1c');
    for (const x0 of [17, 27]) { if (bl === 2) { L(c, x0, 20, x0 + 4, 20, C.ol); continue; } R(c, x0, 19, 4, 2, '#f8f4ec'); R(c, x0 + 1, 19, 2, 2, C.k); L(c, x0 - 1, 17, x0 + 4, 17, '#3c2a1c'); }
    L(c, 24, 21, 23, 26, sk3); R(c, 22, 26, 4, 1, sk3);
    L(c, 19, 30, 29, 30, '#7c3c34'); P(c, 18, 29, '#7c3c34'); P(c, 30, 29, '#7c3c34');
  });
}
/* small clown (front, 24x44) for the party scene */
function clownSpr(t, f) {
  return SPR('clownS', 24, 44, c => {
    const sw = Math.sin(t * 6) * 2;
    L(c, 9, 30, 8 - sw, 42, '#f4f4f4', 3); L(c, 15, 30, 16 + sw, 42, '#c82828', 3); R(c, 4 - sw, 41, 7, 3, '#c82828'); R(c, 13 + sw, 41, 7, 3, '#2c4cb8');
    R(c, 6, 16, 12, 16, '#f4f4f4'); R(c, 12, 16, 6, 16, '#c82828'); for (const y of [19, 24, 29]) E(c, 12, y, 1.5, 1.5, '#2c4cb8');
    L(c, 7, 18, 1, 10 + Math.round(sw), '#f4f4f4', 2); L(c, 17, 18, 23, 10 - Math.round(sw), '#c82828', 2);
    for (let i = 0; i < 5; i++) E(c, 6 + i * 3, 15, 2, 1.5, '#d8d8e8');
    E(c, 12, 9, 5, 6, '#fcfcfc'); E(c, 6, 8, 2.5, 3, '#e8582c'); E(c, 18, 8, 2.5, 3, '#e8582c'); PF(c, [9, 4, 12, -1, 15, 4], '#2c4cb8');
    P(c, 10, 8, C.k); P(c, 14, 8, C.k); P(c, 12, 10, '#d81818'); L(c, 9, 12, 15, 12, '#d81818');
  });
}
function ranchHouse(c, x, y, t, o = {}) { // single-storey 1970s house
  R(c, x, y - 30, 96, 30, o.wall || '#b8a488'); for (let k = y - 28; k < y; k += 4) R(c, x, k, 96, 1, o.wall2 || '#a8947c');
  PF(c, [x - 6, y - 29, x + 20, y - 44, x + 76, y - 44, x + 102, y - 29], o.roof || '#5c4c44'); if (o.snow) { L(c, x - 6, y - 30, x + 20, y - 45, K.snow0, 2); R(c, x + 20, y - 46, 56, 2, K.snow0); }
  R(c, x + 40, y - 22, 12, 22, '#5c3c2c'); P(c, x + 49, y - 11, K.win2);
  for (const wx of [10, 62, 78]) { R(c, x + wx, y - 22, 12, 10, o.lit ? K.win0 : '#3c4c64'); R(c, x + wx + 5, y - 22, 1, 10, '#ffffff'); }
}

/* ---- S1: the suburbs of Chicago, 1970s ---- */
const S1 = {
  name: 'シカゴ郊外', bgm: 'memory',
  init(S) { const L = S.lines[0]; S.tWave = L.t0 + L.segs[2].a; S.dur = L.se + 1.4; },
  draw(c, t, S) {
    const camX = 60 * ss(t / S.dur);
    VG(c, 0, 0, W, 130, ['#4c78c0', '#7ca4d8', '#c8d8e8', '#f0d8b0']);
    for (let i = 0; i < 3; i++) { const x = mod(i * 140 - t * 4, 440) - 60; c.drawImage(cloudSpr(70 + i, 60, 16, [C.white, C.cloud1, C.cloud2, C.white]), Math.round(x), 12 + i * 14); }
    // Chicago skyline, far
    const r = rngf(9); for (let i = 0; i < 24; i++) { const bx = 150 + i * 9 - camX * 0.15, bh = 14 + r() * 30 + (i === 11 ? 26 : 0); R(c, bx, 104 - bh, 8, bh, '#8c98b4'); if (i === 11) { R(c, bx + 2, 104 - bh - 8, 1, 8, '#8c98b4'); R(c, bx + 5, 104 - bh - 8, 1, 8, '#8c98b4'); } }
    R(c, 0, 104, W, 40, '#6c9c48'); for (let i = 0; i < 40; i++) P(c, mod(i * 31 - camX, W), 106 + (i * 7 % 30), '#88b858');
    for (let i = 0; i < 4; i++) { const x = i * 120 - camX - 20; ranchHouse(c, x, 142, t, { wall: ['#b8a488', '#c8b8a0', '#a8b4c0', '#c8a888'][i] }); E(c, x + 108, 128, 10, 14, '#3c6c2c'); R(c, x + 107, 134, 2, 10, '#5c3c2c'); }
    R(c, 0, 142, W, 6, '#c8c0b0'); VG(c, 0, 148, W, H - 148, ['#5c5c60', '#4c4c50']); for (let x = 0; x < W; x += 24) R(c, x - mod(camX, 24), 176, 12, 2, '#e8d070');
    // a 70s car
    const cx = 230 - camX * 1.1; PF(c, [cx, 168, cx + 6, 158, cx + 18, 152, cx + 44, 152, cx + 54, 158, cx + 66, 160, cx + 68, 168], '#a85c2c'); R(c, cx + 20, 154, 22, 5, '#6c84a8'); E(c, cx + 14, 168, 5, 5, '#141414'); E(c, cx + 54, 168, 5, 5, '#141414');
    // Gacy waving to neighbours
    const wave = t > S.tWave && Math.floor(t * 4) & 1;
    blit(c, personSpr(GACY, { f: -1, arm: wave ? 'up' : null, id: wave ? 'w' : '' }), 150, 146, PER_AX, PER_AY, { s: 1.3 });
    blit(c, personSpr(BOY, { f: -1, id: 'n1' }), 196, 146, PER_AX, PER_AY, { flip: true, s: 1.1 });
    capPlate(c, t, 0.9, ['1970年代　アメリカ', 'イリノイ州 シカゴ郊外']);
    return { z: 1 + 0.08 * ss(t / S.dur), fx: 160, fy: 120 };
  }
};

/* ---- S2: Pogo the clown at a party ---- */
const S2 = {
  name: 'ピエロのポゴ', bgm: 'memory',
  init(S) { const L = S.lines[0]; S.tClown = L.t0 + L.segs[1].a - 0.2; S.tZoom = L.se - 1.0; S.dur = L.se + 1.8; },
  draw(c, t, S) {
    VG(c, 0, 0, W, 140, ['#5c88d0', '#8cb4e0', '#d8e4f0']);
    R(c, 0, 120, W, 120, '#6c9c48'); for (let i = 0; i < 50; i++) P(c, i * 37 % W, 124 + (i * 11 % 110), '#88b858');
    for (let x = 0; x < W; x += 10) R(c, x, 100, 3, 22, '#e8e0d0'); R(c, 0, 104, W, 2, '#e8e0d0'); R(c, 0, 114, W, 2, '#e8e0d0'); // picket fence
    // bunting
    for (let i = 0; i < 16; i++) PF(c, [i * 20, 20, i * 20 + 20, 20, i * 20 + 10, 32], ['#d83838', '#f8d040', '#3c8cd8', '#48b048'][i % 4]); L(c, 0, 20, W, 20, C.white);
    // balloons
    [[40, 50, '#e83c3c', '#a01c1c'], [64, 60, '#f8d040', '#b89020'], [262, 48, '#3c8cd8', '#1c5c9c'], [284, 62, '#e83c3c', '#a01c1c'], [244, 70, '#48b048', '#2c7c2c']].forEach(([x, y, a, b], i) => balloon(c, x, y + Math.sin(t * 1.4 + i) * 2, a, b, t, i));
    // table & cake
    R(c, 210, 150, 70, 4, '#f4f4f4'); R(c, 214, 154, 4, 18, '#8c6c4c'); R(c, 272, 154, 4, 18, '#8c6c4c'); R(c, 234, 138, 22, 12, '#f8d8e8'); R(c, 234, 138, 22, 3, '#f4f4f4'); for (const x of [238, 245, 252]) { R(c, x, 132, 1, 6, '#f8f8f8'); P(c, x, 131, '#f8c040'); }
    // kids
    [[60, 'k1', '#d84c4c'], [90, 'k2', '#4c8cd8'], [180, 'k3', '#e8b83c'], [300, 'k4', '#5cb05c']].forEach(([x, id, col], i) => {
      blit(c, personSpr({ id, coat: col, coat2: col, pants: '#3c3c5c', skin: '#f0c8a8', hair: ['#6c4c2c', '#e8c070', '#2c1c14', '#8c4c2c'][i] }, { f: -1, arm: (Math.floor(t * 3 + i) & 1) ? 'up' : null, id: (Math.floor(t * 3 + i) & 1) ? 'u' : '' }), x, 172 + (i & 1) * 4 - Math.round(Math.abs(Math.sin(t * 5 + i)) * 2), PER_AX, PER_AY, { s: 0.9, flip: x > 140 });
    });
    // Pogo
    if (t > S.tClown) { const k = eOut(sg(t, S.tClown, S.tClown + 0.6)); blit(c, clownSpr(t), lerp(-20, 140, k), 168 - Math.round(Math.abs(Math.sin(t * 4)) * 3), 12, 43, { s: 1.4 });
      for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.1; E(c, lerp(-20, 140, k) + Math.cos(a) * 14, 100 + Math.sin(a) * 10 - 20, 3, 3, ['#d83838', '#f8d040', '#3c8cd8'][i]); } } // juggling
    capPlate(c, t, 0.6, ['ピエロの「ポゴ」']);
    const zk = ss(sg(t, S.tZoom, S.dur));
    if (zk > 0) { c.fillStyle = DA('#000000', 0.7 * zk); c.fillRect(0, 0, W, H); const f = pogoFace({ blink: blinkOf(t, 12) }); const [pc, px] = slot('pgz', f.width * 2, f.height * 2); px.imageSmoothingEnabled = false; px.drawImage(f, 0, 0, f.width * 2, f.height * 2); c.drawImage(ditherFade(pc, zk, 'pgzd'), 160 - f.width, 86 - f.height); }
    return { z: 1 + 0.05 * ss(t / S.dur), fx: 160, fy: 110 };
  }
};

/* ---- S3: December 1978, the pharmacy ---- */
const S3 = {
  name: '薬局', bgm: 'eerie',
  init(S) { const L = S.lines[0]; S.tOut = L.t0 + L.segs[2].a - 0.4; S.tGone = L.t0 + L.segs[3].a; S.dur = L.se + 1.6; },
  draw(c, t, S) {
    nightSky(c, t, 130, [K.night0, K.night1, K.night2]);
    R(c, 0, 40, 60, 100, '#2c2c34'); R(c, 260, 50, 60, 90, '#2c2c34');
    R(c, 60, 50, 200, 90, '#5c5458'); R(c, 60, 50, 200, 4, '#3c3438');
    R(c, 76, 56, 168, 20, '#1c1c24'); const on = Math.sin(t * 20) > -0.9; TX(c, 'PHARMACY', 160 - textSpr('PHARMACY', 16, '#58e8a8').width / 2, 58, on ? '#58e8a8' : '#2c7c5c', 16, null);
    if (on) { c.fillStyle = DA('#58e8a8', 0.08); c.fillRect(60, 50, 200, 40); }
    for (const wx of [72, 186]) { R(c, wx, 84, 62, 44, K.win0); R(c, wx, 84, 62, 2, K.win2); for (let s = 0; s < 3; s++) R(c, wx + 4, 92 + s * 12, 54, 2, '#c8a860'); for (let i = 0; i < 10; i++) R(c, wx + 6 + i * 5, 86 + (i % 3) * 12, 3, 6, ['#d84c4c', '#4c8cd8', '#f4f4f4'][i % 3]); }
    R(c, 146, 86, 28, 54, '#3c2c24'); R(c, 149, 89, 22, 30, K.win1);
    c.fillStyle = DA(K.win1, 0.12); c.fillRect(60, 128, 200, 20);
    snowGround(c, 140, 0, 100);
    // the boy steps out and walks into the dark
    if (t > S.tOut) {
      const u = t - S.tOut, x = 160 + u * 22, a = 1 - sg(t, S.tGone, S.tGone + 1.4);
      for (let i = 0; i < u * 3 && i < 30; i++) R(c, 162 + i * 7, 150 + (i & 1) * 2, 3, 1, K.snow3);
      if (a > 0) c.drawImage(ditherFade(personSpr(BOY, { f: Math.floor(t * 7) & 3 }), a, 'boyf'), Math.round(x - PER_AX - 1), Math.round(152 - PER_AY - 1));
    }
    snowfall(c, t, 60, 31, 10, 14);
    capPlate(c, t, 0.7, ['1978年12月11日', 'イリノイ州 デスプレーンズ']);
    return { z: 1 + 0.08 * ss(t / S.dur), fx: 190, fy: 120 };
  }
};
