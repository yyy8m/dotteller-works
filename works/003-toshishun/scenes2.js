/* ================= 文庫 #003 杜子春: scenes ================= */
/* ---- ZA: the west gate of Luoyang, a spring dusk ---- */
const ZA = {
  name: '洛陽の門', ch: '洛陽の西の門', bgm: 'memory',
  init(S) { S.dur = lastSe(S) + 0.8; },
  draw(c, t, S) {
    westGate(c, t, { dusk: true, clear: [80, 200] });
    toshi(c, 100, 150, 1.6, { k: 'a' });
    return { z: lerp(1.0, 1.15, ss(t / S.dur)), fx: 110, fy: 104 };
  }
};
/* ---- ZB: the one-eyed old man; "dig where the head of your shadow falls" ---- */
const ZB = {
  name: '片目すがめの老人', bgm: 'eerie',
  init(S) { S.tOld = at(S, 'L3', 0) + 1.0; S.tShadow = ln(S, 'K2') ? at(S, 'K2', 4) - 0.2 : 1e9; S.tGone = ln(S, 'L4') ? at(S, 'L4', 1) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    westGate(c, t, { dusk: true, clear: [80, 200] });
    if (t > S.tShadow) { // the long shadow of Toshishun on the ground, and the spot of its head
      PF(c, [96, 150, 104, 150, 178, 168, 170, 172], DA('#3c2414', 0.6)); glow(c, 176, 170, 6, 3, '#3c2414', 2 * (0.7));
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
    if (k > 0) { glow(c, 190, 120, 70 * k, 40 * k, '#f8d050', 2 * (0.18)); R(c, 160, 118, 70, 22, '#7c4c2c'); E(c, 172, 144, 8, 8, '#3c2c20'); E(c, 220, 144, 8, 8, '#3c2c20'); goldPile(c, 195, 120, Math.floor(120 * k), t); }
    for (let i = 0; i < 12 * k; i++) { const u = fr(t * 0.8 + i / 12); P(c, 160 + hash(i) * 80, 118 - u * 50, (i & 1) ? '#ffffff' : '#f8d050'); }
    return { z: 1.06, fx: 160, fy: 108 };
  }
};
/* ---- ZD: the feasts — peacocks, peonies, friends ---- */
const ZD = {
  name: '酒盛り', bgm: 'carnival',
  init(S) { S.tFriends = at(S, 'L6', 3) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, 150, ['#3c0c0c', '#6c1c14', '#8c2c1c']);
    for (let x = 14; x < W; x += 74) { R(c, x, 0, 12, 150, '#b8302c'); R(c, x + 2, 0, 3, 150, '#d84c3c'); R(c, x - 3, 0, 18, 8, '#d8a838'); R(c, x - 3, 140, 18, 10, '#d8a838'); }
    for (let x = 0; x < W; x += 24) { PF(c, [x, 0, x + 12, 10, x + 24, 0], '#d8a838'); }
    for (let i = 0; i < 5; i++) { const x = 50 + i * 56, y = 30 + Math.sin(t * 2 + i) * 2; L(c, x, 8, x, y - 11, '#3c1c14'); E(c, x, y, 8, 11, '#e83c2c'); R(c, x - 6, y - 4, 12, 1, '#c82c1c'); R(c, x - 6, y + 4, 12, 1, '#c82c1c'); R(c, x - 3, y - 12, 6, 2, '#d8a838'); R(c, x - 3, y + 11, 6, 2, '#d8a838'); glow(c, x, y, 16, 18, '#f8c040', 2 * (0.12)); }
    R(c, 0, 122, W, 28, '#5c2c1c'); for (let x = 0; x < W; x += 20) R(c, x, 122, 10, 28, '#6c3424'); R(c, 0, 150, W, H - 150, '#2c140c');
    // the banquet table with dishes and a gold cup
    R(c, 90, 118, 140, 8, '#8c3c1c'); R(c, 90, 116, 140, 3, '#a84c24'); R(c, 96, 126, 4, 22, '#5c2c14'); R(c, 220, 126, 4, 22, '#5c2c14');
    for (let i = 0; i < 6; i++) { E(c, 104 + i * 22, 114, 7, 2.5, '#f4f0e8'); E(c, 104 + i * 22, 112, 4, 2, ['#d86c2c', '#6c9c3c', '#c83c2c', '#e8c040', '#8c5c3c', '#d86c2c'][i]); }
    // peonies that change colour, a white peacock spreading its tail
    for (let i = 0; i < 4; i++) { const px = 24 + i * 14, py = 112 + (i & 1) * 6, col = ['#f84c8c', '#f8f8f8', '#c83c8c', '#f8a0c0'][(i + Math.floor(t / 2)) % 4]; L(c, px, py, px, 122, '#3c6c2c'); for (let k = 0; k < 6; k++) E(c, px + Math.cos(k) * 3, py + Math.sin(k) * 3, 3, 3, col); E(c, px, py, 2, 2, '#f8d050'); }
    { const px = 282, py = 118, k = 0.8 + 0.2 * Math.sin(t); for (let i = 0; i < 11; i++) { const a = -Math.PI + 0.15 + i * 0.28; L(c, px, py - 6, px + Math.cos(a) * 26 * k, py - 6 + Math.sin(a) * 22 * k, '#f8f8f4', 2); E(c, px + Math.cos(a) * 24 * k, py - 6 + Math.sin(a) * 20 * k, 2, 2, '#c8dce8'); } E(c, px, py - 2, 5, 7, '#f8f8f8'); E(c, px + 2, py - 10, 2.5, 2.5, '#f8f8f8'); P(c, px + 3, py - 10, C.k); P(c, px + 2, py - 14, '#f8f8f8'); }
    // the musicians (women with jade lotus / agate peony hair ornaments) and the magician swallowing a sword
    for (let i = 0; i < 4; i++) { const x = 66 + i * 18 + (i > 1 ? 120 : 0), st = { id: 'mu' + i, robe: ['#3c8c7c', '#c86c9c', '#d8b84c', '#6c7cc8'][i], robe2: '#3c3c4c', trim: '#f4f0e8', sash: '#f8d050', hair: '#1c1c24', female: true };
      blit(c, robeFig(st, { arm: 'clasp', k: 'm' }), x, 116, FIG_AX2, FIG_AY2, { s: 0.75 }); P(c, x, 116 - 50 * 0.75, i & 1 ? '#f84c8c' : '#4cc88c'); if ((Math.floor(t * 4) + i) % 3 === 0) TX(c, '♪', x + 4, 116 - 54 - (fr(t) * 6), '#f8f0c0', 8, null); }
    { const mx = 250, my = 116; blit(c, robeFig({ id: 'mag', robe: '#4c2c6c', robe2: '#2c1c4c', trim: '#f8d050', sash: '#c8302c', hair: '#1c1c24', hat: 'cap', hatCol: '#c8302c' }, { arm: 'up', k: 'g' }), mx, my, FIG_AX2, FIG_AY2, { s: 0.8 }); const k = fr(t * 0.4); L(c, mx + 2, my - 52 - (1 - k) * 12, mx + 1, my - 44, '#e8e8f0', 2); }
    toshi(c, 160, 148, 1.6, { rich: true, arm: Math.floor(t * 2) & 1 ? 'up' : 'reach', expr: 'smile', k: 'd' });
    { const cy = 148 - 46; E(c, 176, cy, 3, 2, '#f8d050'); R(c, 175, cy, 2, 4, '#d8a838'); E(c, 176, cy - 1, 2, 1, '#7c1c4c'); }
    if (t > S.tFriends) for (let i = 0; i < 4; i++) { const x = lerp(-30 - i * 24, 40 + i * 16, ss(sg(t, S.tFriends + i * 0.3, S.tFriends + 1.5 + i * 0.3))); blit(c, robeFig({ id: 'fr' + i, robe: ['#3c6c9c', '#8c5ca8', '#6c9c4c', '#d87c3c'][i], robe2: '#2c2c3c', trim: '#f4f0e8', sash: '#f8d050', hair: '#1c1c24', hat: 'cap' }, { f: Math.floor(t * 4 + i) & 3, arm: Math.floor(t * 2 + i) & 1 ? 'up' : null, expr: 'smile', k: 'f' }), x, 150, FIG_AX2, FIG_AY2, { s: 1.0 }); }
    for (let i = 0; i < 10; i++) { const u = fr(t * 0.3 + i / 10); P(c, 30 + i * 28, 10 + u * 130, DA('#f8d050', 1 - u)); }
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
    if (g > 0) { glow(c, 220, 140, 50 * g, 14 * g, '#f8d050', 2 * (0.3)); goldPile(c, 220, 140, Math.floor(80 * g), t); }
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
    if (r > 0) { for (let k = 0; k < 3; k++) glow(c, 160, 110, (30 + k * 16) * r, (40 + k * 14) * r, '#f8f0c0', 2 * (0.08)); for (let i = 0; i < 10; i++) { const u = fr(t * 0.4 + i / 10); P(c, 160 + Math.cos(i * 2 + t) * 30, 140 - u * 80, DA('#fff8d0', 1 - u)); } }
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
    toshi(c, 140, 136, 1.6, { pose: 'sit', k: 'i' });
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
    toshi(c, 140, 136, 1.6, { pose: 'sit', k: 'j' });
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
    toshi(c, 140, 136, 1.6, { pose: t > S.tFire && t < S.tFire + 2 ? 'bow' : 'sit', k: 'k' });
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
    if (a > 0) { c.save(); c.globalAlpha = a; c.fillStyle = '#c8c8f0'; for (let i = 0; i < 46; i++) { const x = (i * 29 + 7) % W, y = 10 + (i * 17 % 74), b = Math.sin(t * 3 + i); E(c, x, y, 3, 3.5, '#8c8cb0'); R(c, x - 3, y + 3, 6, 8, '#6c6c94'); L(c, x + 4, y - 8 + b, x + 4, y + 10, '#e8e8f8'); P(c, x + 4, y - 9 + b, '#ffffff'); } c.restore(); }
    const g = ss(sg(t, S.tGen, S.tGen + 1.2)), gx = 214, gy = 136;
    if (g > 0) {
      c.save(); c.globalAlpha = g; glow(c, gx, 70, 60, 70, '#f8c040', 2 * (0.12));
      // legs, armoured skirt, body
      R(c, gx - 18, gy - 26, 12, 26, '#8c6c1c'); R(c, gx + 6, gy - 26, 12, 26, '#8c6c1c'); R(c, gx - 22, gy - 4, 18, 5, '#3c2c14'); R(c, gx + 4, gy - 4, 18, 5, '#3c2c14');
      PF(c, [gx - 30, gy - 56, gx + 30, gy - 56, gx + 34, gy - 24, gx - 34, gy - 24], '#c89428'); for (let y = gy - 54; y < gy - 24; y += 4) for (let x = gx - 30 + ((y / 4) & 1) * 3; x < gx + 30; x += 6) R(c, x, y, 5, 3, '#e8b438');
      PF(c, [gx - 24, gy - 98, gx + 24, gy - 98, gx + 28, gy - 56, gx - 28, gy - 56], '#d8a838'); for (let y = gy - 96; y < gy - 58; y += 4) for (let x = gx - 22 + ((y / 4) & 1) * 3; x < gx + 22; x += 6) R(c, x, y, 5, 3, '#f8d050');
      E(c, gx, gy - 78, 9, 9, '#f8e080'); E(c, gx, gy - 78, 5, 5, '#c8302c'); R(c, gx - 26, gy - 60, 52, 5, '#c8302c');
      PF(c, [gx - 36, gy - 100, gx - 20, gy - 106, gx - 18, gy - 88, gx - 38, gy - 84], '#f8d050'); PF(c, [gx + 36, gy - 100, gx + 20, gy - 106, gx + 18, gy - 88, gx + 38, gy - 84], '#f8d050');
      for (let k = 0; k < 6; k++) L(c, gx - 26 + k * 2, gy - 96, gx - 50 + k * 4 + Math.sin(t * 2 + k) * 2, gy - 20, '#a8201c', 2); // cape
      // head with helmet and plume
      E(c, gx, gy - 116, 12, 13, '#b8402c'); E(c, gx - 0.5, gy - 116.5, 11.5, 12.5, '#d8583c');
      PF(c, [gx - 14, gy - 118, gx - 12, gy - 132, gx, gy - 138, gx + 12, gy - 132, gx + 14, gy - 118, gx + 9, gy - 124, gx - 9, gy - 124], '#d8a838'); R(c, gx - 15, gy - 120, 30, 3, '#a87c1c');
      for (let k = 0; k < 5; k++) L(c, gx, gy - 138, gx - 8 + k * 4 + Math.sin(t * 3 + k) * 2, gy - 152, '#e8302c', 2);
      L(c, gx - 9, gy - 121, gx - 3, gy - 118, C.k, 2); L(c, gx + 3, gy - 118, gx + 9, gy - 121, C.k, 2);
      const eg = 0.6 + 0.4 * Math.sin(t * 6); R(c, gx - 7, gy - 117, 4, 2, '#f8f0a0'); R(c, gx + 3, gy - 117, 4, 2, '#f8f0a0'); glow(c, gx - 5, gy - 116, 5, 3, '#f8f040', 2 * (0.3 * eg)); glow(c, gx + 5, gy - 116, 5, 3, '#f8f040', 2 * (0.3 * eg));
      PF(c, [gx - 7, gy - 109, gx + 7, gy - 109, gx + 5, gy - 105, gx - 5, gy - 105], '#3c0c0c'); R(c, gx - 5, gy - 109, 2, 2, C.white); R(c, gx + 3, gy - 109, 2, 2, C.white);
      PF(c, [gx - 9, gy - 108, gx - 12, gy - 98, gx - 4, gy - 104], '#1c1c1c'); PF(c, [gx + 9, gy - 108, gx + 12, gy - 98, gx + 4, gy - 104], '#1c1c1c');
      // the three-pronged halberd
      const st = t > S.tStab ? 1 : 0, hx2 = gx - 30, hy2 = gy - 74, tx = st ? 150 : gx - 60, ty = st ? 118 : gy - 140;
      E(c, hx2, hy2, 6, 6, '#d8a838'); L(c, hx2 + (hx2 - tx) * 0.5, hy2 + (hy2 - ty) * 0.5, tx, ty, '#c8c8d0', 3);
      { const dx = tx - hx2, dy = ty - hy2, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d, px = -uy, py = ux; for (const o2 of [-6, 0, 6]) L(c, tx + px * o2, ty + py * o2, tx + px * o2 + ux * (o2 ? 10 : 14), ty + py * o2 + uy * (o2 ? 10 : 14), '#f0f0f8', 2); L(c, tx - px * 6, ty - py * 6, tx + px * 6, ty + py * 6, '#f0f0f8', 2); }
      c.restore();
    }
    if (t > S.tStab) { if (t < S.tStab + 0.2) flashScreen(c, 0.8); blit(c, robeFig({ id: 'tsN', robe: '#3c7c8c', robe2: '#2c5c6c', trim: '#c8d8d0', sash: '#1c2c34', hair: '#1c1c24', hat: 'bun', hatCol: '#c8302c' }, { expr: 'shock', k: 'dead' }), 140, 132, FIG_AX2, FIG_AY2, { s: 1.15, rot: -Math.PI / 2 }); }
    else toshi(c, 140, 136, 1.6, { pose: 'sit', k: 'l' });
    return { z: 1.04, fx: 175, fy: 92, sx: t > S.tStab && t < S.tStab + 0.4 ? Math.round(Math.sin(t * 60) * 3) : 0 };
  }
};
/* ---- ZM: hell — the palace Shinra-den and King Enma ---- */
const ZM = {
  name: '森羅殿', ch: '地獄', bgm: 'hell',
  init(S) { S.tPalace = at(S, 'L18', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#05040a', '#1c0c14', '#3c0c0c']);
    if (t < S.tPalace) { // the dark road between this world and hell, cold wind
      for (let i = 0; i < 26; i++) { const u = fr(t * 0.6 + i / 26); L(c, -20 + u * 380, 20 + (i * 37 % 180), -40 + u * 380, 22 + (i * 37 % 180), DA('#5c5c8c', 0.6 * (1 - u))); }
      const y = 70 + Math.sin(t * 2) * 8; const spr = robeFig({ id: 'tsN', robe: '#3c7c8c', robe2: '#2c5c6c', trim: '#c8d8d0', sash: '#1c2c34', hair: '#1c1c24', hat: 'bun', hatCol: '#c8302c' }, { expr: 'sad', k: 'soul' });
      blit(c, ditherFade(spr, 0.6, 'soul'), 160 + Math.sin(t * 1.3) * 30, y + 40, FIG_AX2, FIG_AY2, { s: 1.0, rot: Math.sin(t) * 0.3 }); return { z: 1, fx: 160, fy: 100 };
    }
    for (let i = 0; i < 10; i++) flame(c, 6 + i * 34, 150, 9, t, i);
    // the palace
    R(c, 30, 30, 260, 104, '#3c0c0c'); PF(c, [10, 36, 30, 20, 160, 2, 290, 20, 310, 36], '#1c0c0c'); L(c, 10, 36, 160, 2, '#3c1c1c'); L(c, 310, 36, 160, 2, '#3c1c1c');
    for (let x = 40; x < 290; x += 36) { R(c, x, 36, 9, 98, '#a81c14'); R(c, x + 2, 36, 2, 98, '#d83c2c'); }
    R(c, 122, 38, 76, 18, '#1c140c'); R(c, 124, 40, 72, 14, '#2c1c0c'); TX(c, '森羅殿', 136, 39, '#f8d050', 16, null);
    for (let k = 0; k < 3; k++) R(c, 96 - k * 10, 106 + k * 8, 128 + k * 20, 8, ['#6c2c1c', '#5c241c', '#4c1c14'][k]);
    // King Enma on his throne
    const ex = 160, ey = 104;
    R(c, ex - 34, ey - 52, 68, 50, '#5c1c14'); R(c, ex - 30, ey - 48, 60, 46, '#3c0c0c'); E(c, ex, ey - 52, 34, 8, '#d8a838');
    PF(c, [ex - 26, ey - 30, ex + 26, ey - 30, ex + 32, ey, ex - 32, ey], '#141418'); L(c, ex, ey - 30, ex, ey, '#d8a838'); R(c, ex - 32, ey - 4, 64, 4, '#d8a838');
    E(c, ex, ey - 42, 12, 13, '#8c241c'); E(c, ex - 0.5, ey - 42.5, 11.5, 12.5, '#c83c2c');
    R(c, ex - 18, ey - 60, 36, 4, '#141418'); R(c, ex - 10, ey - 58, 20, 6, '#141418'); for (let k = 0; k < 7; k++) { L(c, ex - 16 + k * 5, ey - 56, ex - 16 + k * 5, ey - 50, '#d8a838'); P(c, ex - 16 + k * 5, ey - 49, '#f8d050'); }
    L(c, ex - 9, ey - 47, ex - 3, ey - 44, C.k, 2); L(c, ex + 3, ey - 44, ex + 9, ey - 47, C.k, 2); R(c, ex - 7, ey - 44, 4, 2, '#f8f0c0'); R(c, ex + 3, ey - 44, 4, 2, '#f8f0c0');
    PF(c, [ex - 12, ey - 36, ex + 12, ey - 36, ex + 8, ey - 22, ex, ey - 16, ex - 8, ey - 22], '#141418'); R(c, ex - 4, ey - 36, 8, 2, '#5c0c0c');
    R(c, ex + 20, ey - 40, 3, 22, '#d8c890');
    for (const [ox, fl] of [[56, false], [264, true]]) blit(c, oniSpr({ f: 0, t, blink: blinkOf(t, ox) }), ox, 150, 32, 69, { flip: fl });
    toshi(c, 160, 150, 1.4, { pose: 'kneel', k: 'm2' });
    return { z: 1.04, fx: 160, fy: 92 };
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
    for (let k = 0; k < 2; k++) { const hx = lerp(-60, 120 + k * 80, hk), spr = horseSpr(t, k, { down, tear: t > S.tWhip }); blit(c, spr, hx, 150, 30, 39, { s: 1.3, flip: false }); }
    if (t > S.tWhip && !down) for (let i = 0; i < 2; i++) { const ox = 60 + i * 200, f = Math.floor(t * 4 + i * 2) % 5; blit(c, oniSpr({ f, t, blink: 0 }), ox, 150, 32, 69, { flip: i === 1 }); if (f === 3) for (let k = 0; k < 5; k++) L(c, ox + (i ? -30 : 30), 90, ox + (i ? -50 : 50) + k * 4, 110 + k * 3, '#f8f8f8'); }
    toshi(c, 50, 150, 1.4, { k: 'o' });
    if (t > S.tFace && t < S.tFace + 3) { const a = 1; glow(c, 132, 112, 16, 16, '#f8f0c0', 2 * (0.15 * a)); glow(c, 212, 112, 16, 16, '#f8f0c0', 2 * (0.15 * a)); }
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
    glow(c, 180, 120, 60, 30, '#f8f0c0', 2 * (0.12 * glow));
    blit(c, horseSpr(t, 1, { down: true, tear: true }), 190, 150, 30, 39, { s: 1.5 });
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
    westGate(c, t, { dusk: true, clear: [80, 200] });
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
