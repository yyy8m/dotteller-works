/* ================= 文庫 #003 杜子春: scenes ================= */
/* ---- ZA: the west gate of Luoyang, a spring dusk ---- */
const ZA = {
  name: '洛陽の門', ch: '洛陽の西の門', bgm: 'memory',
  init(S) { S.dur = lastSe(S) + 0.8; },
  draw(c, t, S) {
    westGate(c, t, { dusk: true });
    toshi(c, 100, 150, 1.6, { k: 'a' });
    return { z: lerp(1.0, 1.15, ss(t / S.dur)), fx: 110, fy: 104 };
  }
};
/* ---- ZB: the one-eyed old man; "dig where the head of your shadow falls" ---- */
const ZB = {
  name: '片目すがめの老人', bgm: 'eerie',
  init(S) { S.tOld = at(S, 'L3', 0) + 1.0; S.tShadow = ln(S, 'K2') ? at(S, 'K2', 4) - 0.2 : 1e9; S.tGone = ln(S, 'L4') ? at(S, 'L4', 1) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    westGate(c, t, { dusk: true });
    if (t > S.tShadow) { // the long shadow of Toshishun on the ground, and the spot of its head
      PF(c, [96, 150, 104, 150, 178, 168, 170, 172], DA('#3c2414', 0.6)); E(c, 176, 170, 6, 3, DA('#3c2414', 0.7));
      const k = sg(t, S.tShadow + 1.5, S.tShadow + 2); if (k > 0) { L(c, 170, 164, 182, 176, '#f8d050', 2); L(c, 182, 164, 170, 176, '#f8d050', 2); }
    }
    toshi(c, 100, 150, 1.6, { shock: t > S.tGone && t < S.tGone + 2, k: 'b' });
    const a = t < S.tOld ? sg(t, S.tOld - 1, S.tOld) : t < S.tGone ? 1 : 1 - sg(t, S.tGone, S.tGone + 0.8);
    oldMan(c, 150, 150, 1.6, { flip: true, a, arm: t > S.tShadow - 1 && t < S.tShadow + 3 ? 'fwd' : null, k: 'b' });
    if (t > S.tGone) for (let i = 0; i < 3; i++) { const u = fr(t * 0.3 + i / 3), x = 60 + i * 80 + Math.sin(t * 3 + i) * 20, y = 30 + u * 10; PF(c, [x - 6, y, x, y + 3 + Math.sin(t * 20 + i) * 2, x + 6, y], '#1c1424'); }
    return { z: 1.12, fx: 130, fy: 108 };
  }
};
/* ---- ZC: digging at night — a cart full of gold ---- */
const ZC = {
  name: '黄金', ch: '大金持ち', bgm: 'carnival',
  init(S) { S.tGold = at(S, 'L5', 2) - 0.3; S.tRich = at(S, 'L5', 3) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, 150, ['#0c0c24', '#1c1c3c', '#3c2c4c']); for (let i = 0; i < 30; i++) P(c, (i * 71) % W, (i * 37) % 110, '#c8c8d8');
    R(c, 0, 132, W, 20, '#5c4434'); R(c, 0, 150, W, H - 150, '#3c2c20');
    const k = ss(sg(t, S.tGold, S.tGold + 1.6));
    toshi(c, 110, 148, 1.6, { arm: t < S.tGold ? (Math.floor(t * 3) & 1 ? 'dig' : 'up') : 'up', rich: t > S.tRich, k: 'c' + (Math.floor(t * 3) & 1) });
    if (t < S.tGold) for (let i = 0; i < 4; i++) { const u = fr(t * 1.5 + i / 4); R(c, 150 + u * 20, 140 - Math.sin(u * 3) * 14, 3, 3, '#7c5c3c'); }
    if (k > 0) { E(c, 190, 120, 70 * k, 40 * k, DA('#f8d050', 0.18)); R(c, 160, 118, 70, 22, '#7c4c2c'); E(c, 172, 144, 8, 8, '#3c2c20'); E(c, 220, 144, 8, 8, '#3c2c20'); goldPile(c, 195, 120, Math.floor(120 * k), t); }
    for (let i = 0; i < 12 * k; i++) { const u = fr(t * 0.8 + i / 12); P(c, 160 + hash(i) * 80, 118 - u * 50, (i & 1) ? '#ffffff' : '#f8d050'); }
    return { z: 1.06, fx: 160, fy: 108 };
  }
};
/* ---- ZD: the feasts — peacocks, peonies, friends ---- */
const ZD = {
  name: '酒盛り', bgm: 'carnival',
  init(S) { S.tFriends = at(S, 'L6', 3) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, 150, '#5c1c1c'); for (let x = 20; x < W; x += 70) { R(c, x, 0, 10, 150, '#a82c24'); R(c, x - 2, 0, 14, 6, '#d8a838'); }
    for (let i = 0; i < 5; i++) { const x = 40 + i * 62, y = 26 + Math.sin(t * 2 + i) * 2; L(c, x, 0, x, y - 10, '#3c1c14'); E(c, x, y, 7, 10, '#e83c2c'); R(c, x - 2, y - 11, 4, 2, '#d8a838'); E(c, x, y, 3, 6, DA('#f8d050', 0.6)); }
    R(c, 0, 132, W, 20, '#7c3c2c'); R(c, 0, 150, W, H - 150, '#3c1c14');
    for (let i = 0; i < 3; i++) { const px = 230 + i * 26, py = 124; lotus(c, px, py, 1.4, 1, t, i); } // peonies (flowers)
    { const px = 270, py = 140; E(c, px, py - 6, 6, 5, '#f8f8f8'); for (let k = 0; k < 7; k++) { const a = -Math.PI + k * 0.45; L(c, px - 6, py - 8, px - 6 + Math.cos(a) * 22, py - 8 + Math.sin(a) * 16, '#f4f4f0', 2); } } // white peacock
    toshi(c, 140, 148, 1.6, { rich: true, arm: Math.floor(t * 2) & 1 ? 'up' : 'fwd', k: 'd' + (Math.floor(t * 2) & 1) });
    R(c, 150, 104, 4, 6, '#f8d050');
    if (t > S.tFriends) for (let i = 0; i < 4; i++) { const x = lerp(-30 - i * 24, 50 + i * 22, ss(sg(t, S.tFriends + i * 0.3, S.tFriends + 1.5 + i * 0.3))); blit(c, personSpr({ id: 'fr' + i, coat: ['#3c6c9c', '#8c5ca8', '#6c9c4c', '#d87c3c'][i], coat2: '#3c3c44', pants: '#3c3c44', dress: ['#3c6c9c', '#8c5ca8', '#6c9c4c', '#d87c3c'][i], skin: '#f0c8a0', hair: '#1c1c24' }, { f: Math.floor(t * 4 + i) & 3, arm: Math.floor(t * 2 + i) & 1 ? 'up' : null, id: 'fw' + i }), x, 148, PER_AX, PER_AY, { s: 1.4 }); }
    return { z: 1.04, fx: 160, fy: 104 };
  }
};
/* ---- ZE: penniless again — the friends pass by without a word ---- */
const ZE = {
  name: '一文無し', bgm: 'eerie',
  init(S) { S.tPoor = at(S, 'L7', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    const poor = t > S.tPoor;
    if (!poor) { ZD.draw(c, t, { tFriends: -10 }); c.fillStyle = DA('#000000', 0.4 * sg(t, S.tPoor - 2, S.tPoor)); c.fillRect(0, 0, W, H); return { z: 1.04, fx: 160, fy: 104 }; }
    westGate(c, t, { empty: true, night: true });
    toshi(c, 100, 150, 1.6, { k: 'e' });
    for (let i = 0; i < 3; i++) { const x = mod(300 - (t - S.tPoor) * 18 - i * 30, 420) - 40; blit(c, personSpr({ id: 'fp' + i, coat: ['#3c6c9c', '#8c5ca8', '#6c9c4c'][i], coat2: '#3c3c44', pants: '#3c3c44', dress: ['#3c6c9c', '#8c5ca8', '#6c9c4c'][i], skin: '#f0c8a0', hair: '#1c1c24' }, { f: Math.floor(t * 6 + i) & 3, id: 'fq' + i }), x, 150, PER_AX, PER_AY, { s: 1.4, flip: true }); }
    return { z: 1.1, fx: 120, fy: 108 };
  }
};
/* ---- ZF: the second time: the chest of his shadow; gold again, gone again ---- */
const ZF = {
  name: '二度目', bgm: 'memory',
  init(S) { S.tOld = at(S, 'L8', 1) - 0.2; S.tGold = at(S, 'L8', 3) - 0.2; S.tGone = ln(S, 'L9') ? at(S, 'L9', 0) + 1.5 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    westGate(c, t, { dusk: true, empty: t > S.tGone });
    const g = t < S.tGold ? 0 : t < S.tGone ? ss(sg(t, S.tGold, S.tGold + 1)) : 1 - ss(sg(t, S.tGone, S.tGone + 2.5));
    if (g > 0) { E(c, 220, 140, 50 * g, 14 * g, DA('#f8d050', 0.3)); goldPile(c, 220, 140, Math.floor(80 * g), t); }
    toshi(c, 100, 150, 1.6, { rich: t > S.tGold && t < S.tGone + 1, k: 'f' });
    oldMan(c, 150, 150, 1.6, { flip: true, a: t < S.tOld ? 0 : t < S.tGold ? 1 : 1 - sg(t, S.tGold, S.tGold + 0.6), arm: 'fwd', k: 'f' });
    return { z: 1.1, fx: 140, fy: 108 };
  }
};
/* ---- ZG: the third time — "I don't want money"; the hermit Tekkanshi ---- */
const ZG = {
  name: '仙人', ch: '仙人の弟子', bgm: 'eerie',
  init(S) { S.tStop = ln(S, 'L10') ? at(S, 'L10', 2) - 0.2 : 1e9; S.tReveal = ln(S, 'K4') ? at(S, 'K4', 0) - 0.3 : 1e9; S.tBow = ln(S, 'K4') ? at(S, 'K4', 3) : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    westGate(c, t, { night: true, empty: true });
    const r = ss(sg(t, S.tReveal, S.tReveal + 1.5));
    if (r > 0) { for (let k = 0; k < 3; k++) E(c, 160, 110, (30 + k * 16) * r, (40 + k * 14) * r, DA('#f8f0c0', 0.08)); for (let i = 0; i < 10; i++) { const u = fr(t * 0.4 + i / 10); P(c, 160 + Math.cos(i * 2 + t) * 30, 140 - u * 80, DA('#fff8d0', 1 - u)); } }
    toshi(c, 110, 150, 1.6, { arm: t > S.tStop && t < S.tStop + 3 ? 'up' : null, f: t > S.tBow ? -1 : -1, k: 'g' + (t > S.tStop && t < S.tStop + 3 ? 'u' : '') });
    oldMan(c, 170, 150, 1.6, { flip: true, k: 'g' });
    return { z: 1.12 + 0.1 * r, fx: 140, fy: 104 };
  }
};
/* ---- ZH: flying on the green bamboo staff to Mount Emei ---- */
const ZH = {
  name: '空を飛ぶ', ch: '峨眉山へ', bgm: 'paradise',
  init(S) { S.tUp = at(S, 'L11', 2) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    const u = Math.max(0, t - S.tUp), up = ss(sg(t, S.tUp, S.tUp + 2));
    VG(c, 0, 0, W, H, ['#3c4c8c', '#a8788c', '#f0a860']);
    mountainsFar(c, t, u * 60, 160 + 60 * up, ['#5c6c8c', '#3c4c6c', '#2c3c54']);
    for (let i = 0; i < 6; i++) { const x = mod(i * 70 - u * 140, 420) - 50; c.drawImage(cloudSpr(60 + i, 70, 14, [C.white, C.cloud1, C.cloud2, C.white]), x, 30 + i * 18); }
    const y = lerp(140, 80, up) + Math.sin(t * 3) * 3, x = 160;
    L(c, x - 40, y + 4, x + 40, y - 4, '#4ca84c', 3); for (let k = -36; k < 40; k += 12) R(c, x + k, y - k / 10 - 1, 2, 3, '#2c7c2c');
    if (up > 0.1) for (let i = 0; i < 8; i++) { const yy = y - 20 + i * 6, xx = mod(-u * 300 + i * 40, 360) - 20; L(c, xx, yy, xx + 20, yy, DA('#ffffff', 0.6)); }
    oldMan(c, x + 16, y + 2, 1.4, { k: 'h' }); toshi(c, x - 10, y + 4, 1.4, { shock: up > 0.3, k: 'h' });
    return { z: 1.05, fx: 160, fy: lerp(110, 90, up) };
  }
};
/* ---- ZI: the flat rock on Mount Emei; "do not make a sound" ---- */
const ZI = {
  name: '一枚岩', ch: '試練', bgm: 'eerie',
  init(S) { S.tLeave = ln(S, 'T5') ? S.lines[S.lines.length - 1].se + 0.2 : 1e9; S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    cliffRock(c, t);
    toshi(c, 140, 136, 1.6, { k: 'i' });
    const u = t - S.tLeave;
    if (u < 0) oldMan(c, 190, 136, 1.6, { flip: true, arm: 'fwd', k: 'i' });
    else { const x = 190 + u * 60, y = 136 - u * 70; L(c, x - 20, y, x + 20, y - 4, '#4ca84c', 3); oldMan(c, x, y, 1.2, { k: 'i2' }); }
    return { z: 1.1, fx: 160, fy: 96 };
  }
};
/* ---- ZJ: the tiger and the white snake ---- */
const ZJ = {
  name: '虎と白蛇', bgm: 'dread',
  init(S) { S.tTiger = at(S, 'L13', 1) - 0.3; S.tSnake = at(S, 'L13', 3) - 0.3; S.tJump = at(S, 'L13', 4) - 0.2; S.tVanish = at(S, 'L13', 7, lastSe(S) - 2) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    cliffRock(c, t);
    const v = 1 - ss(sg(t, S.tVanish, S.tVanish + 1.2)), j = ss(sg(t, S.tJump, S.tJump + 0.6));
    if (t > S.tTiger && v > 0) { // tiger
      const x = lerp(lerp(-40, 60, ss(sg(t, S.tTiger, S.tTiger + 1.2))), 110, j), y = 134 - Math.sin(j * Math.PI) * 30;
      c.save(); c.globalAlpha = v;
      E(c, x, y - 12, 22, 10, '#e8902c'); for (let k = 0; k < 5; k++) R(c, x - 16 + k * 8, y - 20, 2, 12, '#1c1c1c'); E(c, x + 24, y - 18, 9, 8, '#e8902c'); R(c, x + 20, y - 21, 3, 2, '#f8f040'); R(c, x + 27, y - 21, 3, 2, '#f8f040'); R(c, x + 28, y - 13, 6, 2, '#f8f8f8');
      for (const lx of [-14, -6, 8, 16]) L(c, x + lx, y - 4, x + lx + 2, y + 2, '#c8701c', 3); L(c, x - 22, y - 14, x - 32, y - 22, '#e8902c', 2);
      c.restore();
    }
    if (t > S.tSnake && v > 0) { // white snake coming down the cliff
      c.save(); c.globalAlpha = v; const k = ss(sg(t, S.tSnake, S.tSnake + 2)), hy = lerp(20, 100, k) + j * 20, hx = lerp(250, 200, k) - j * 30;
      const pts = []; for (let i = 0; i < 16; i++) { pts.push(hx + i * 4 + Math.sin(t * 4 + i * 0.6) * 5, hy - i * 6); }
      for (let i = pts.length - 2; i >= 0; i -= 2) E(c, pts[i], pts[i + 1], 6, 5, '#f4f4ec');
      E(c, hx, hy, 8, 6, '#f8f8f0'); P(c, hx - 3, hy - 2, '#c81818'); L(c, hx - 8, hy + 2, hx - 16, hy + 4 + Math.sin(t * 20) * 2, '#e83c2c', 2);
      c.restore();
    }
    if (v < 1 && v > 0) { c.fillStyle = DA('#c8c8d8', 0.4 * (1 - v)); c.fillRect(0, 0, W, 150); }
    toshi(c, 140, 136, 1.6, { k: 'j' });
    return { z: 1.06, fx: 150, fy: 96 };
  }
};
/* ---- ZK: the storm and the pillar of fire ---- */
const ZK = {
  name: '嵐', bgm: 'dread',
  init(S) { S.tFire = at(S, 'L14', 4) - 0.2; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    cliffRock(c, t); c.fillStyle = DA('#05050a', 0.75); c.fillRect(0, 0, W, 150);
    for (let i = 0; i < 6; i++) { const x = mod(i * 70 - t * 30, 420) - 50; E(c, x, 20 + (i % 3) * 10, 60, 18, '#141420'); }
    const fl = fr(t * 0.6) < 0.08 || fr(t * 0.6 + 0.37) < 0.05;
    if (fl) { c.fillStyle = DA('#c8a8f8', 0.5); c.fillRect(0, 0, W, H); const x0 = 60 + hash(Math.floor(t * 0.6)) * 200; PL(c, [x0, 0, x0 - 10, 30, x0 + 6, 50, x0 - 4, 80], '#f0e0ff', 2); }
    for (let i = 0; i < 70; i++) { const x = (i * 37 + t * 200) % (W + 40) - 20, y = (i * 53 + t * 420) % 160; L(c, x, y, x - 4, y + 10, '#8c9cc8'); }
    if (t > S.tFire && t < S.tFire + 1.4) { const k = sg(t, S.tFire, S.tFire + 0.3); R(c, 132, 0, 18, 136 * k, '#f04020'); R(c, 136, 0, 10, 136 * k, '#f8c040'); c.fillStyle = DA('#f08040', 0.3); c.fillRect(0, 0, W, H); }
    toshi(c, 140, 136, 1.6, { arm: t > S.tFire && t < S.tFire + 2 ? 'up' : null, k: 'k' });
    return { z: 1.06, fx: 150, fy: 96, sx: t > S.tFire && t < S.tFire + 0.6 ? Math.round(Math.sin(t * 60) * 3) : 0 };
  }
};
/* ---- ZL: the god-general in golden armour; the heavenly soldiers; the trident ---- */
const ZL = {
  name: '神将', bgm: 'dread',
  init(S) { S.tGen = at(S, 'L15', 1) - 0.3; S.tArmy = ln(S, 'J2') ? at(S, 'J2', 0) - 0.3 : 1e9; S.tStab = ln(S, 'L17') ? at(S, 'L17', 1) + 0.2 : 1e9; S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    cliffRock(c, t);
    const a = ss(sg(t, S.tArmy, S.tArmy + 1.5)) * (t > S.tStab + 1 ? 1 - sg(t, S.tStab + 1, S.tStab + 2.5) : 1);
    if (a > 0) for (let i = 0; i < 40; i++) { const x = (i * 29) % W, y = 12 + (i * 17 % 70); R(c, x, y, 3, 6, DA('#a8a8b8', a)); L(c, x + 1, y - 4, x + 1, y, DA('#e8e8f8', a)); }
    const g = ss(sg(t, S.tGen, S.tGen + 1.2)), gx = 210;
    if (g > 0) { // the giant
      c.save(); c.globalAlpha = g;
      R(c, gx - 24, 40, 48, 84, '#d8a838'); for (let y = 46; y < 120; y += 8) R(c, gx - 24, y, 48, 2, '#a87c1c'); R(c, gx - 30, 40, 60, 10, '#f8d050');
      E(c, gx, 28, 13, 14, '#d8583c'); PF(c, [gx - 14, 22, gx, 4, gx + 14, 22], '#d8a838'); R(c, gx - 6, 24, 4, 2, C.k); R(c, gx + 3, 24, 4, 2, C.k);
      R(c, gx - 20, 124, 14, 12, '#7c5c1c'); R(c, gx + 6, 124, 14, 12, '#7c5c1c');
      const st = t > S.tStab ? 1 : 0, tx = st ? gx - 70 : gx - 34;
      L(c, gx - 26, 60, tx, 70 + st * 30, '#c8c8d0', 3); PF(c, [tx - 2, 64 + st * 30, tx - 12, 60 + st * 30, tx - 12, 80 + st * 30, tx - 2, 76 + st * 30], '#e8e8f0');
      c.restore();
    }
    if (t > S.tStab) { if (t < S.tStab + 0.2) flashScreen(c, 0.8); R(c, 112, 128, 46, 8, '#3c7c8c'); E(c, 160, 130, 5, 5, '#f0c8a0'); }
    else toshi(c, 140, 136, 1.6, { k: 'l' });
    return { z: 1.04, fx: 170, fy: 96, sx: t > S.tStab && t < S.tStab + 0.4 ? Math.round(Math.sin(t * 60) * 3) : 0 };
  }
};
/* ---- ZM: hell — the palace Shinra-den and King Enma ---- */
const ZM = {
  name: '森羅殿', ch: '地獄', bgm: 'hell',
  init(S) { S.tPalace = at(S, 'L18', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#05040a', '#1c0c14', '#3c0c0c']);
    if (t < S.tPalace) { for (let i = 0; i < 20; i++) { const u = fr(t * 0.8 + i / 20); L(c, 160 + Math.cos(i) * u * 200, 90 + Math.sin(i * 1.7) * u * 120, 160 + Math.cos(i) * u * 220, 90 + Math.sin(i * 1.7) * u * 130, '#3c3c5c'); } const y = 60 + Math.sin(t * 2) * 10; toshi(c, 160, y + 40, 1.2, { a: 0.6, k: 'm' }); return { z: 1, fx: 160, fy: 100 }; }
    for (let i = 0; i < 8; i++) flame(c, 10 + i * 42, 150, 8, t, i);
    R(c, 40, 30, 240, 100, '#3c0c0c'); PF(c, [24, 34, 160, 4, 296, 34], '#1c0c0c'); for (let x = 50; x < 280; x += 40) R(c, x, 34, 8, 96, '#8c1c14');
    R(c, 120, 38, 80, 18, '#1c140c'); TX(c, '森羅殿', 136, 39, '#f8d050', 16, null);
    R(c, 100, 104, 120, 8, '#5c2c1c'); R(c, 90, 112, 140, 8, '#4c241c'); R(c, 80, 120, 160, 10, '#3c1c14');
    { const ex = 160, ey = 100; R(c, ex - 20, ey - 30, 40, 34, '#1c1c24'); E(c, ex, ey - 40, 11, 12, '#c83c2c'); R(c, ex - 14, ey - 56, 28, 6, '#1c1c24'); R(c, ex - 4, ey - 54, 8, 3, '#f8d050'); PF(c, [ex - 9, ey - 36, ex + 9, ey - 36, ex, ey - 24], '#141418'); R(c, ex - 5, ey - 44, 3, 2, '#f8f0c0'); R(c, ex + 3, ey - 44, 3, 2, '#f8f0c0'); }
    for (const [ox, fl] of [[60, false], [262, true]]) blit(c, oniSpr({ f: 0, t, blink: blinkOf(t, ox) }), ox, 150, 32, 69, { flip: fl });
    toshi(c, 160, 150, 1.4, { k: 'm2' });
    return { z: 1.04, fx: 160, fy: 96 };
  }
};
/* ---- ZN: the hells — mountain of swords, valley of fire, sea of ice ---- */
const ZN = {
  name: '責め苦', bgm: 'hell',
  init(S) { S.t1 = at(S, 'L19', 1) - 0.3; S.t2 = at(S, 'L19', 2) - 0.3; S.t3 = at(S, 'L19', 3) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    const ph = t < S.t2 ? 0 : t < S.t3 ? 1 : 2;
    VG(c, 0, 0, W, H, ph === 2 ? ['#0c1c3c', '#1c3c6c', '#4c7cac'] : ['#1c0404', '#3c0c0c', '#7c1c0c']);
    if (ph === 0) { needleMountains(c, -20, 150, 380, 90, 3, '#5c5c6c', '#c8c8d8'); }
    if (ph === 1) { for (let i = 0; i < 16; i++) flame(c, 4 + i * 21, 150, 14 + (i % 3) * 6, t, i); embers(c, t, 40, 5, [0, 0, W, 150], [C.hell6, C.hell7]); }
    if (ph === 2) { R(c, 0, 120, W, 40, '#a8d0f0'); for (let i = 0; i < 10; i++) PF(c, [i * 34, 150, i * 34 + 14, 110 - (i % 3) * 10, i * 34 + 28, 150], '#e0f0ff'); }
    const y = 96 + Math.sin(t * 3) * 6, x = 160 + Math.sin(t * 1.3) * 30;
    blit(c, personSpr(TOSHI, { f: -1, shock: true, id: 'tn' }), x, y, PER_AX, PER_AY, { s: 1.4, rot: Math.sin(t * 2) * 0.4 });
    for (const [ox, fl] of [[40, false], [280, true]]) blit(c, oniSpr({ f: Math.floor(t * 2) % 5, t, blink: 0 }), ox, 150, 32, 69, { flip: fl });
    return { z: 1.04, fx: 160, fy: 96 };
  }
};
/* ---- ZO: the two horses with the faces of his dead parents; the whips ---- */
const ZO = {
  name: '父母の馬', ch: '母の声', bgm: 'requiem',
  init(S) { S.tHorse = at(S, 'L20', 1) - 0.3; S.tFace = at(S, 'L20', 2) - 0.2; S.tWhip = ln(S, 'L21') ? at(S, 'L21', 0) - 0.3 : 1e9; S.tDown = ln(S, 'L22') ? at(S, 'L22', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#05040a', '#1c0c14', '#3c0c0c']); R(c, 0, 140, W, H - 140, '#2c0c0c');
    R(c, 100, 104, 120, 8, '#5c2c1c'); R(c, 90, 112, 140, 8, '#4c241c');
    const hk = ss(sg(t, S.tHorse, S.tHorse + 1.2)), down = t > S.tDown;
    for (let k = 0; k < 2; k++) { const hx = lerp(-60, 120 + k * 80, hk), spr = horseSpr(t, k, { down, tear: t > S.tWhip }); blit(c, spr, hx, 148, 26, 33, { s: 1.4, flip: false }); }
    if (t > S.tWhip && !down) for (let i = 0; i < 2; i++) { const ox = 60 + i * 200, f = Math.floor(t * 4 + i * 2) % 5; blit(c, oniSpr({ f, t, blink: 0 }), ox, 150, 32, 69, { flip: i === 1 }); if (f === 3) for (let k = 0; k < 5; k++) L(c, ox + (i ? -30 : 30), 90, ox + (i ? -50 : 50) + k * 4, 110 + k * 3, '#f8f8f8'); }
    toshi(c, 50, 150, 1.4, { k: 'o' });
    if (t > S.tFace && t < S.tFace + 3) { const a = 1; E(c, 132, 112, 16, 16, DA('#f8f0c0', 0.15 * a)); E(c, 212, 112, 16, 16, DA('#f8f0c0', 0.15 * a)); }
    if (down) { c.fillStyle = DA('#000000', 0.35); c.fillRect(0, 0, W, H); }
    return { z: 1.06 + (down ? 0.2 * ss(sg(t, S.tDown, S.tDown + 3)) : 0), fx: down ? 140 : 150, fy: 110, sx: t > S.tWhip && !down ? Math.round(Math.sin(t * 30)) : 0 };
  }
};
/* ---- ZP: the mother's voice; "Mother!" ---- */
const ZP = {
  name: 'お母さん', bgm: 'requiem',
  init(S) { S.tRun = ln(S, 'L23') ? at(S, 'L23', 2) - 0.2 : 1e9; S.tHug = ln(S, 'L23') ? at(S, 'L23', 4) - 0.3 : 1e9; S.tCry = ln(S, 'T6') ? at(S, 'T6', 0) - 0.1 : 1e9; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#140810', '#2c0c14', '#3c1018']); R(c, 0, 140, W, H - 140, '#2c0c0c');
    const glow = t > S.tCry ? ss(sg(t, S.tCry, S.tCry + 1.2)) : 0.3 + 0.1 * Math.sin(t * 2);
    E(c, 180, 120, 60, 30, DA('#f8f0c0', 0.12 * glow));
    blit(c, horseSpr(t, 1, { down: true, tear: true }), 180, 148, 26, 33, { s: 1.6 });
    const x = t < S.tRun ? 60 : lerp(60, 150, ss(sg(t, S.tRun, S.tHug)));
    toshi(c, x, 150, 1.6, { f: t > S.tRun && t < S.tHug ? Math.floor(t * 8) & 3 : -1, arm: t > S.tHug ? 'fwd' : null, k: 'p' + (t > S.tHug ? 'h' : '') });
    if (t > S.tHug) for (let i = 0; i < 3; i++) { const u = fr(t * 1.4 + i / 3); R(c, x + 6, 102 + u * 30, 1, 3, DA('#88c8f8', 1 - u)); }
    if (glow > 0.6) { c.fillStyle = DA('#ffffff', (glow - 0.6) * 1.5); c.fillRect(0, 0, W, H); }
    return { z: 1.12, fx: 150, fy: 108 };
  }
};
/* ---- ZQ: back at the gate at sunset ---- */
const ZQ = {
  name: '夕日の門', ch: '結び', bgm: 'memory',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) {
    westGate(c, t, { dusk: true });
    toshi(c, 120, 150, 1.6, { arm: ln(S, 'T7') && t > at(S, 'T7', 0) && t < at(S, 'T7', 0) + 4 ? 'fwd' : null, k: 'q' });
    oldMan(c, 170, 150, 1.6, { flip: true, k: 'q' });
    return { z: 1.15, fx: 145, fy: 106 };
  }
};
/* ---- ZR: a house at the southern foot of Mount Tai, peach blossoms everywhere ---- */
const ZR = {
  name: '桃の花', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.2; S.dur = 1e9; },
  draw(c, t, S) {
    VG(c, 0, 0, W, 150, ['#8cb4e0', '#c8d8f0', '#f8e8f0']); mountainsFar(c, t, 0, 120, ['#a8b4cc', '#8c9cb8', '#7c8cac']);
    R(c, 0, 118, W, H - 118, '#8cb468'); for (let i = 0; i < 30; i++) R(c, (i * 37) % W, 122 + (i * 11 % 40), 6, 1, '#7ca458');
    R(c, 130, 92, 60, 30, '#d8ccb4'); PF(c, [120, 94, 160, 74, 200, 94], '#5c4c5c'); R(c, 154, 104, 12, 18, '#5c3c24');
    for (let i = 0; i < 9; i++) { const x = 20 + i * 36 + (i & 1) * 8, y = 100 + (i % 3) * 10; R(c, x - 2, y, 4, 22, '#6c4c3c'); for (let k = 0; k < 7; k++) E(c, x + Math.cos(k * 1.3 + i) * 12, y - 4 + Math.sin(k * 1.9) * 8, 7, 6, ['#f8b8c8', '#f4a0b8', '#fcd0dc'][(i + k) % 3]); }
    for (let i = 0; i < 26; i++) { const u = fr(t * 0.12 + hash(i)), x = mod(hash(i * 3) * 360 + t * 14, 360) - 20, y = u * 160; R(c, x + Math.sin(t * 2 + i) * 4, y, 2, 2, '#f8c0d0'); }
    toshi(c, 100, 140, 1.4, { f: Math.floor(t * 5) & 3, k: 'r' });
    return { z: lerp(1.2, 1.0, ss(sg(t, 0, S.tEnd))), fx: 150, fy: 100 };
  }
};
