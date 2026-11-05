/* ================= 記録 #002 ジョン・ゲイシー: scenes (1) — the smile, the past, the first murder ================= */
/* ---- GA: the hook — a clown on top, the crawl space below ---- */
const GA = {
  name: '床下の秘密', ch: 'オープニング', bgm: 'eerie',
  init(S) { S.tDown = at(S, 'L1', 4) - 0.2; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const k = ss(sg(t, S.tDown, S.tDown + 2.2));
    crossSection(c, t, k > 0 ? 24 : 0, { blood: true });
    // the clown entertaining in the living room above
    blit(c, clownSpr(t), 150, 90 - Math.round(Math.abs(Math.sin(t * 4)) * 3), 12, 43, { s: 1.2 });
    for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.1; E(c, 150 + Math.cos(a) * 14, 32 + Math.sin(a) * 8, 2.5, 2.5, ['#d83838', '#f8d040', '#3c8cd8'][i]); }
    for (let i = 0; i < 3; i++) blit(c, personSpr({ id: 'ka' + i, coat: ['#d84c4c', '#4c8cd8', '#e8b83c'][i], coat2: '#3c3c3c', pants: '#3c3c5c', skin: '#f0c8a8', hair: '#6c4c2c' }, { f: -1, id: 'ka' + i }), 70 + i * 26 + (i > 1 ? 120 : 0), 90, PER_AX, PER_AY, { s: 0.8 });
    if (k < 1) { c.fillStyle = '#000000'; c.fillRect(0, 102 + 60 * k, W, 60 - 60 * k + 80); }
    return { z: 1 + 0.4 * (1 - k), fx: 150, fy: lerp(70, 120, k) };
  }
};

/* ---- GB: 1942, Chicago — the father ---- */
const GB = {
  name: '父と息子', ch: '生い立ち', bgm: 'eerie',
  init(S) { S.tDad = at(S, 'L2', 3) - 0.3; S.tHeart = at(S, 'L3', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    roomBg(c, { wall: '#6c5c4c', wall2: '#64544a', floor: '#4c3c30', fy: 140, window: [24, 30], lamp: [200, 22] });
    R(c, 160, 110, 70, 6, '#5c4430'); R(c, 166, 116, 4, 24, '#4c3424'); R(c, 222, 116, 4, 24, '#4c3424'); R(c, 180, 104, 4, 6, '#3c6c3c'); R(c, 188, 105, 4, 5, '#3c6c3c');
    const yell = t > S.tDad && (Math.floor(t * 3) & 1);
    blit(c, personSpr(DAD, { f: -1, weapon: 'bottle', arm: yell ? 'up' : 'fwd', id: yell ? 'dy' : 'dn' }), 200, 140, PER_AX, PER_AY, { s: 1.6, flip: true });
    if (t > S.tDad) { const s = ['このできそこないめ！', 'なさけない奴だ！'][Math.floor(t / 2.2) % 2]; speech(c, s, 186, 64, 200); }
    blit(c, personSpr(KID, { f: -1, id: 'kg', shock: t > S.tDad }), 120, 140, PER_AX, PER_AY, { s: 1.0 });
    if (t > S.tHeart) { const u = t - S.tHeart, b = 1 + 0.25 * Math.max(0, Math.sin(u * 7)); E(c, 120, 112, 4 * b, 3.5 * b, K.red0); E(c, 118, 111, 1.5 * b, 1, '#f88888'); }
    yearFlash(c, t, 0.2, 1942); capPlate(c, t, 0.5, ['1942年', 'イリノイ州 シカゴ']);
    return { z: 1.04, fx: 160, fy: 110 };
  }
};

/* ---- GC: Iowa — the promising young man; 1968 conviction ---- */
const GC = {
  name: 'アイオワ', bgm: 'memory',
  init(S) { S.tCourt = at(S, 'L5', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tCourt) {
      VG(c, 0, 0, W, 120, ['#7ca4d8', '#c8d8e8']); R(c, 0, 120, W, 120, '#7c7c80');
      R(c, 70, 60, 180, 70, '#f4ecd8'); R(c, 70, 60, 180, 8, '#c82828'); for (let x = 70; x < 250; x += 12) R(c, x, 60, 6, 8, '#f4ecd8');
      R(c, 96, 36, 128, 22, '#c82828'); TX(c, 'FRIED CHICKEN', 104, 39, '#fcfcfc', 16, null); R(c, 158, 58, 4, 4, '#5c5c64');
      for (const wx of [84, 196]) R(c, wx, 80, 40, 30, '#8cb4d8'); R(c, 146, 90, 28, 40, '#5c3c2c');
      blit(c, personSpr(GACY, { f: -1, arm: (Math.floor(t * 2) & 1) ? 'up' : null, id: (Math.floor(t * 2) & 1) ? 'gu' : 'gn' }), 160, 150, PER_AX, PER_AY, { s: 1.3 });
      for (let i = 0; i < 3; i++) blit(c, personSpr(YOUTH[i], { f: -1, id: 'yc' + i }), 214 + i * 22, 152, PER_AX, PER_AY, { flip: true });
      capPlate(c, t, 0.5, ['1960年代', 'アイオワ州 ウォータールー']);
      return { z: 1.03, fx: 160, fy: 110 };
    }
    VG(c, 0, 0, W, H, ['#3c2a20', '#2c1e18', '#1c1410']); for (let x = 0; x < W; x += 24) R(c, x, 0, 2, 120, '#4c3628');
    R(c, 80, 60, 160, 60, '#5c3c28'); R(c, 80, 60, 160, 4, '#7c5438'); E(c, 160, 40, 9, 10, '#d8b090'); R(c, 148, 48, 24, 14, '#141010'); R(c, 152, 28, 16, 6, '#c8c8c8');
    blit(c, personSpr(GACY, { f: -1, id: 'gct' }), 120, 156, PER_AX, PER_AY, { flip: true, s: 1.4 });
    const u = t - S.tCourt; if (u > 1.4) { const bars = Math.min(12, Math.floor((u - 1.4) * 10)); for (let i = 0; i < bars; i++) R(c, 8 + i * 26, 0, 6, H, '#5c5c64'); }
    yearFlash(c, t, S.tCourt + 0.2, 1968, 14, 10, '懲役10年');
    return { z: 1.05, fx: 160, fy: 90 };
  }
};

/* ---- GD: back in Chicago — the house, the business, the neighbours ---- */
const GD = {
  name: '人気者の顔', ch: '人気者の顔', bgm: 'memory',
  init(S) { S.tParty = at(S, 'L7', 0) - 0.2; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    VG(c, 0, 0, W, 130, ['#4c78c0', '#7ca4d8', '#c8d8e8', '#f0d8b0']);
    R(c, 0, 104, W, 40, '#6c9c48'); for (let i = 0; i < 40; i++) P(c, i * 31 % W, 106 + (i * 7 % 30), '#88b858');
    ranchHouse(c, 110, 142, t, { wall: '#b8a488' }); R(c, 0, 142, W, 6, '#c8c0b0'); VG(c, 0, 148, W, H - 148, ['#5c5c60', '#4c4c50']);
    // contractor's van
    const vx = 20; R(c, vx, 118, 70, 26, '#e8e4d8'); R(c, vx + 50, 112, 20, 10, '#e8e4d8'); R(c, vx + 54, 114, 14, 6, '#7c8ca8'); E(c, vx + 14, 144, 6, 6, '#141414'); E(c, vx + 56, 144, 6, 6, '#141414'); TX(c, 'CONTRACTOR', vx + 2, 122, '#2c4c7c', 16, null);
    if (t > S.tParty) { // a backyard party
      for (let i = 0; i < 16; i++) PF(c, [i * 20, 20, i * 20 + 20, 20, i * 20 + 10, 32], ['#d83838', '#f8d040', '#3c8cd8', '#48b048'][i % 4]); L(c, 0, 20, W, 20, C.white);
      [[230, '#e8c0a0', '#7c3c4c'], [258, '#e0b090', '#4c5c8c'], [286, '#f0c8a8', '#5c7c4c']].forEach(([x, sk, col], i) => blit(c, personSpr({ id: 'nb' + i, coat: col, coat2: col, pants: '#3c3c44', skin: sk, hair: '#5c3c2c' }, { f: -1, arm: (Math.floor(t * 2) + i) & 1 ? 'up' : null, id: ((Math.floor(t * 2) + i) & 1) ? 'u' : '' }), x, 150, PER_AX, PER_AY, { flip: true }));
      E(c, 196, 132, 10, 4, '#3c3c3c'); for (let i = 0; i < 4; i++) { const u = fr(t * 0.5 + i / 4); E(c, 196 + Math.sin(u * 6 + i) * 3, 126 - u * 30, 3 + u * 4, 2 + u * 3, DA('#e8e8e8', 0.5 * (1 - u))); } // grill smoke
    }
    blit(c, personSpr(GACY, { f: -1, arm: (Math.floor(t * 2) & 1) ? 'up' : 'fwd', id: (Math.floor(t * 2) & 1) ? 'gw' : 'gf' }), 196, 150, PER_AX, PER_AY, { s: 1.3 });
    yearFlash(c, t, 0.2, 1970, 216, 10, '釈放'); capPlate(c, t, 0.5, ['1970年代', 'シカゴ郊外の家']);
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- GE: Pogo the clown; the photo with the First Lady ---- */
const GE = {
  name: 'ピエロのポゴ', ch: 'ピエロのポゴ', bgm: 'memory',
  init(S) { S.tPhoto = at(S, 'L9', 0) - 0.2; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t < S.tPhoto) {
      VG(c, 0, 0, W, 140, ['#5c88d0', '#8cb4e0', '#d8e4f0']); R(c, 0, 120, W, 120, '#6c9c48');
      for (let x = 0; x < W; x += 10) R(c, x, 100, 3, 22, '#e8e0d0'); R(c, 0, 104, W, 2, '#e8e0d0'); R(c, 0, 114, W, 2, '#e8e0d0');
      [[40, 50, '#e83c3c', '#a01c1c'], [64, 60, '#f8d040', '#b89020'], [262, 48, '#3c8cd8', '#1c5c9c'], [284, 62, '#e83c3c', '#a01c1c']].forEach(([x, y, a, b], i) => balloon(c, x, y + Math.sin(t * 1.4 + i) * 2, a, b, t, i));
      [[70, '#d84c4c'], [100, '#4c8cd8'], [210, '#e8b83c'], [240, '#5cb05c']].forEach(([x, col], i) => blit(c, personSpr({ id: 'kp' + i, coat: col, coat2: col, pants: '#3c3c5c', skin: '#f0c8a8', hair: '#6c4c2c' }, { f: -1, arm: (Math.floor(t * 3 + i) & 1) ? 'up' : null, id: (Math.floor(t * 3 + i) & 1) ? 'u' : '' }), x, 156 - Math.round(Math.abs(Math.sin(t * 5 + i)) * 2), PER_AX, PER_AY, { s: 0.9, flip: x > 150 }));
      blit(c, clownSpr(t), 156, 156 - Math.round(Math.abs(Math.sin(t * 4)) * 3), 12, 43, { s: 1.4 });
      for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.1; E(c, 156 + Math.cos(a) * 14, 74 + Math.sin(a) * 10, 3, 3, ['#d83838', '#f8d040', '#3c8cd8'][i]); }
      capPlate(c, t, 0.5, ['ピエロの「ポゴ」']);
      return { z: 1.04, fx: 160, fy: 110 };
    }
    // a photo: Gacy beside the First Lady (silhouettes in a framed print)
    const u = t - S.tPhoto;
    R(c, 0, 0, W, H, '#2c241c'); for (let y = 0; y < H; y += 6) R(c, 0, y, W, 1, '#342a20');
    const k = eOut(sg(u, 0, 0.6)); R(c, 70, lerp(-140, 24, k), 180, 130, '#f4f0e8'); const py = lerp(-132, 32, k);
    VG(c, 78, py, 164, 98, ['#8c98a8', '#c8ccd0']); R(c, 78, py + 70, 164, 28, '#6c6c74');
    blit(c, personSpr(GACY, { f: -1, id: 'gph' }), 130, py + 96, PER_AX, PER_AY, { s: 1.8 }); blit(c, personSpr({ id: 'fl', coat: '#c8a4b8', coat2: '#a88498', pants: '#3c3c44', dress: '#c8a4b8', skin: '#ecc8b0', hair: '#7c5c3c' }, { f: -1, id: 'fl' }), 190, py + 96, PER_AX, PER_AY, { s: 1.8, flip: true });
    const im = c.getImageData(70, Math.max(0, py), 180, 98), d = im.data; for (let i = 0; i < d.length; i += 4) { const g = d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11; d[i] = d[i + 1] = d[i + 2] = g; } c.putImageData(im, 70, Math.max(0, py));
    if (u < 0.15) flashScreen(c, 0.8);
    yearFlash(c, t, S.tPhoto + 0.4, 1978);
    return { z: 1.03, fx: 160, fy: 90 };
  }
};

/* ---- GF: January 1972 — the first murder ---- */
const GF = {
  name: '最初の殺人', ch: '最初の殺人', bgm: 'dread',
  init(S) { S.tHouse = at(S, 'L10', 3) - 0.3; S.tStab = at(S, 'L10', 3) + 0.6; S.tBury = at(S, 'L11', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t < S.tHouse) { // the bus terminal at night
      VG(c, 0, 0, W, H, ['#1c2030', '#2c3040', '#1c2028']); R(c, 0, 140, W, 100, '#3c3c40');
      R(c, 20, 30, 280, 110, '#4c4c58'); R(c, 20, 30, 280, 18, '#2c2c34'); TX(c, 'BUS TERMINAL', 110, 31, '#f8e070', 16, null);
      for (let i = 0; i < 6; i++) R(c, 30 + i * 46, 60, 34, 40, K.win0); R(c, 40, 120, 240, 6, '#6c5c4c');
      blit(c, personSpr(YOUTH[0], { f: -1, id: 'tm' }), 130, 150, PER_AX, PER_AY, { s: 1.3 }); blit(c, personSpr(GACY, { f: -1, arm: 'fwd', id: 'gb' }), 176, 150, PER_AX, PER_AY, { s: 1.4, flip: true });
      yearFlash(c, t, 0.2, 1972); capPlate(c, t, 0.5, ['1972年1月', 'シカゴのバスターミナル']);
      return { z: 1.04, fx: 160, fy: 100 };
    }
    if (t < S.tBury) { // the kitchen: a knife — shown as shadows on the wall
      const stab = t > S.tStab, v = t - S.tStab;
      roomBg(c, { wall: '#c8b890', wall2: '#bca880', floor: '#8c7c64', fy: 150, lamp: [100, 20] });
      R(c, 210, 90, 100, 60, '#e8e0d0'); R(c, 214, 84, 92, 8, '#a8a8b0');
      const yx = 170, gx = 120;
      wallShadow(c, personSpr(GACY, { f: -1, arm: stab ? 'stab' : 'fwd', weapon: 'knife', id: 'gk' }), gx + 40, 150, 2.2, 'shg');
      wallShadow(c, personSpr(YOUTH[0], { f: -1, id: 'ty', shock: true }), yx + 50, 150, 2.2, 'shy');
      blit(c, personSpr(GACY, { f: -1, arm: stab ? 'stab' : 'fwd', weapon: 'knife', id: 'gk2' }), gx, 150, PER_AX, PER_AY, { s: 1.4 });
      if (!stab) blit(c, personSpr(YOUTH[0], { f: -1, id: 'ty2', shock: true }), yx, 150, PER_AX, PER_AY, { s: 1.3, flip: true });
      else { const fall = eOut(sg(v, 0.3, 0.8)); blit(c, personSpr(YOUTH[0], { f: -1, id: 'ty3', shock: true }), yx + fall * 6, 150 - fall * 4, PER_AX, PER_AY, { s: 1.3, flip: true, rot: fall * 1.5 });
        bloodSplat(c, yx - 6, 110, 28, 5, Math.min(1, v * 4)); for (let i = 0; i < 4; i++) bloodDrip(c, 200 + i * 14, 60 + i * 9, 10 + i * 5, t, i); bloodPool(c, yx + 10, 154, Math.min(26, v * 10), 6);
        if (v < 0.15) flashScreen(c, 0.5, '#c81818'); }
      return { z: 1.06, fx: 150, fy: 110, sx: stab && v < 0.3 ? Math.round(Math.sin(t * 80) * 2) : 0 };
    }
    // buried in the crawl space
    const u = t - S.tBury, k = sg(u, 0.4, 3);
    crossSection(c, t, 0);
    E(c, 160, 124, 13, 3.5, '#4c3c2c'); E(c, 151, 123, 3.5, 3, '#5c4834');
    R(c, 136, 92, 30, 10, '#000000'); // the hatch
    for (let i = 0; i < 10 * k; i++) E(c, 160 + (hash(i) - 0.5) * 30, 126 - i * 0.5, 6, 2, '#3c2c1c');
    darkness(c, 160, 118, 80, 0.9);
    return { z: 1.3, fx: 160, fy: 118 };
  }
};

/* ---- GG: 1975 on — the job offers, the handcuff trick, the river ---- */
const GG = {
  name: '手錠の手品', ch: '手錠の手品', bgm: 'dread',
  init(S) { S.tCuff = at(S, 'L13', 0) - 0.3; S.tRope = at(S, 'L13', 3) - 0.1; S.tFill = ln(S, 'L14') ? at(S, 'L14', 0) - 0.3 : 1e9; S.tRiver = ln(S, 'L14') ? at(S, 'L14', 2) - 0.2 : 1e9; S.dur = lastSe(S) + 1.2;
    S.short = !ln(S, 'L12'); if (S.short) S.tCuff = 0; },
  draw(c, t, S) {
    if (!S.short && t < S.tCuff) { // picking up young men with job offers
      nightSky(c, t, 130, [K.night0, K.night1, K.night2]); R(c, 0, 130, W, 110, '#3c3c40'); for (let x = 0; x < W; x += 30) R(c, x - mod(t * 30, 30), 176, 14, 2, '#e8d070');
      for (let i = 0; i < 5; i++) { R(c, i * 70, 40, 50, 90, '#2c2c34'); for (let k = 0; k < 6; k++) R(c, i * 70 + 6 + (k % 2) * 22, 50 + Math.floor(k / 2) * 24, 14, 12, (i + k) % 3 ? '#1c1c24' : K.win1); }
      const cx = lerp(-80, 120, eOut(sg(t, 0.4, 2.4))); PF(c, [cx, 160, cx + 8, 148, cx + 24, 140, cx + 64, 140, cx + 78, 148, cx + 92, 150, cx + 94, 160], '#2c2c3c'); R(c, cx + 28, 142, 32, 6, '#5c6c8c'); E(c, cx + 18, 160, 6, 6, '#0c0c10'); E(c, cx + 76, 160, 6, 6, '#0c0c10');
      blit(c, personSpr(YOUTH[1], { f: -1, id: 'yh' }), 236, 156, PER_AX, PER_AY, { s: 1.3, flip: true });
      if (t > 3) speech(c, 'いい仕事があるんだ', 190, 70, 210);
      yearFlash(c, t, 0.2, 1975);
      return { z: 1.03, fx: 160, fy: 110 };
    }
    if (t < S.tFill) { // the living room: handcuffs, then the rope — as shadows
      const u = t - S.tCuff;
      roomBg(c, { wall: '#7c6c54', wall2: '#74644c', floor: '#5c4c3c', fy: 150, lamp: [60, 18], window: [250, 30] });
      R(c, 200, 112, 90, 28, '#8c4c3c'); R(c, 200, 100, 90, 14, '#7c4434');
      if (t < S.tRope) {
        const sh = 1 + 0.15 * Math.sin(u * 3); E(c, 160, 70, 34, 14, DA(K.win0, 0.15));
        R(c, 140, 62, 14, 10, '#c8c8d0'); R(c, 166, 62, 14, 10, '#c8c8d0'); R(c, 143, 65, 8, 4, '#7c5c4c'); R(c, 169, 65, 8, 4, '#7c5c4c'); L(c, 154, 67, 166, 67, '#a8a8b0', 2);
        speech(c, '手錠の手品を見せてやろう', 160, 20, 160);
        blit(c, personSpr(GACY, { f: -1, arm: 'fwd', id: 'gh' }), 130, 150, PER_AX, PER_AY, { s: 1.4 }); blit(c, personSpr(YOUTH[1], { f: -1, arm: 'fwd', id: 'yh2' }), 180, 150, PER_AX, PER_AY, { s: 1.3, flip: true });
        void sh; return { z: 1.06, fx: 160, fy: 100 };
      }
      const v = t - S.tRope, pull = Math.sin(v * 5) * 2;
      c.fillStyle = DA('#000000', 0.5); c.fillRect(0, 0, W, H);
      wallShadow(c, personSpr(GACY, { f: -1, arm: 'up', id: 'gr' }), 150 + pull, 150, 2.4, 'shg2');
      wallShadow(c, personSpr(YOUTH[1], { f: -1, arm: 'fwd', id: 'yr', shock: true }), 180, 150 - Math.min(10, v * 4), 2.2, 'shy2');
      L(c, 150 + pull, 40, 180, 56, '#c8a860', 2);
      redVignette(c, Math.min(0.7, v * 0.3));
      return { z: 1.08, fx: 165, fy: 90, sx: Math.round(Math.sin(t * 40) * 1) };
    }
    if (t < S.tRiver) { // the crawl space filling up
      const n = Math.round(lerp(4, 26, sg(t, S.tFill, S.tRiver - 0.2)));
      crossSection(c, t, n, { blood: true }); darkness(c, 160, 128, 170, 0.6);
      bigCap(c, '床下に ' + n + '人', 8, 16, C.white);
      return { z: 1, fx: 160, fy: 120 };
    }
    // the bridge over the Des Plaines River
    nightSky(c, t, 120, [K.night0, K.night1, K.night2]); VG(c, 0, 120, W, 120, ['#1c2c3c', '#0c1824']); for (let i = 0; i < 20; i++) R(c, mod(i * 41 - t * 12, W), 130 + (i * 13 % 100), 10, 1, '#2c4c6c');
    R(c, 0, 92, W, 10, '#4c4c54'); for (let x = 0; x < W; x += 20) R(c, x, 72, 3, 20, '#4c4c54'); R(c, 0, 72, W, 3, '#5c5c64'); for (const x of [60, 260]) R(c, x, 102, 14, 60, '#3c3c44');
    const u = t - S.tRiver; blit(c, personSpr(GACY, { f: -1, arm: 'fwd', id: 'gbr' }), 150, 92, PER_AX, PER_AY, { s: 1.2 });
    if (u > 0.8) { const v = u - 0.8, y = 96 + v * v * 60; if (y < 140) E(c, 172, y, 10, 4, '#5c4c3c'); else { const r2 = (v - 0.7) * 30; if (r2 < 40) { ER(c, 172, 142, r2, r2 * 0.25, '#8cb4d8'); ER(c, 172, 142, r2 * 0.6, r2 * 0.15, '#c8dce8'); } } }
    capPlate(c, t, S.tRiver + 0.2, ['デスプレーンズ川']);
    return { z: 1.04, fx: 160, fy: 110 };
  }
};
