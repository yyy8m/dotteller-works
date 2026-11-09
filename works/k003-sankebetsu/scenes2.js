/* ================= 記録 #003 三毛別羆事件: scenes ================= */
/* ---- KA: the pioneer village of Rokusensawa, winter 1915 ---- */
const KA = {
  name: '開拓の村', ch: '開拓の村', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    const ox = t * 8; winterSky(c, t, 'day', ox);
    forestBand(c, t, 104, 14, 'day', ox * 0.4, 0.7, 3);
    snowGround(c, 104, ox * 0.6);
    for (let i = 0; i < 5; i++) { const x = mod(i * 78 + 20 - ox * 0.8, 400) - 40; kHouse(c, x, 136 + (i % 2) * 6, 40, 22, { smoke: true, t, lit: i === 2 }); }
    // a man splitting firewood, a woman carrying water
    const ax = 150 - ox * 0.8 + 60; pioneer(c, PIONEER[0], ax, 160, 1.3, { arm: Math.floor(t * 1.5) & 1 ? 'up' : 'reach', k: 'w' }); R(c, ax + 10, 154, 10, 6, '#7c5c3c');
    pioneer(c, YAYO, ax + 70, 162, 1.2, { f: Math.floor(t * 4) & 3, k: 'w' });
    snowfall(c, t, 30, 3, 6, 12);
    yearFlash(c, t, 0.3, 1915, 214, 10, '大正4年'); capPlate(c, t, 0.8, ['北海道 苫前村', '三毛別 六線沢']);
    return { z: 1.04, fx: 160, fy: 110 };
  }
};
/* ---- KB: the eaves, the corn, the ambush ---- */
const KB = {
  name: 'トウキビ', bgm: 'eerie',
  init(S) { S.tBear = at(S, 'L2', 1) - 0.2; S.tMatagi = at(S, 'L2', 3) - 0.2; S.tShot = at(S, 'L2', 5) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    winterSky(c, t, 'night'); forestBand(c, t, 110, 12, 'night', 0, 0.8, 5); snowGround(c, 110, 0);
    c.fillStyle = DA('#04060e', 0.35); c.fillRect(0, 110, W, H);
    kHouse(c, 60, 150, 96, 54, { mood: 'night', corn: t < S.tBear + 3 });
    const bk = t < S.tMatagi ? ss(sg(t, S.tBear, S.tBear + 2.5)) : 1, run = t > S.tShot ? (t - S.tShot) * 120 : 0;
    if (t > S.tBear) { const bx = lerp(330, 170, bk) + run; blit(c, bearSpr(t > S.tShot ? 'walk' : 'walk', Math.floor(t * (t > S.tShot ? 10 : 4)) & 3, { eyes: true }), bx, 150, 42, 55, { s: 0.9, flip: t > S.tShot ? false : true }); }
    if (t > S.tMatagi) { for (let k = 0; k < 2; k++) { pioneer(c, PIONEER[2 + k], 26 + k * 18, 166, 1.2, { k: 'm' + k }); figRifle(c, 26 + k * 18, 166, 1.2, 1); }
      if (t > S.tShot && t < S.tShot + 0.25) { muzzleFlash(c, 60, 138, 1, 1); flashScreen(c, 0.4); } }
    snowfall(c, t, 20, 9, 4, 10, '#a8b8d8');
    capPlate(c, t, 0.4, ['1915年11月']);
    return { z: 1.06, fx: 160, fy: 112, sx: t > S.tShot && t < S.tShot + 0.3 ? Math.round(Math.sin(t * 60) * 2) : 0 };
  }
};
/* ---- KC: Dec 9 — the Ota house; the boy by the hearth; the window ---- */
const KC = {
  name: '太田の家', ch: '12月9日', bgm: 'dread',
  init(S) { S.tIn = 0.5; S.tNear = at(S, 'L4', 0) - 0.2; S.tWin = at(S, 'L4', 2) - 0.3; S.tDusk = ln(S, 'L5') ? at(S, 'L5', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDusk) { // outside at dusk: the forest swallows the light
      winterSky(c, t, 'dusk'); forestBand(c, t, 112, 14, 'night', 0, 0.9, 7); snowGround(c, 112, 0); c.fillStyle = DA('#0c0814', 0.4); c.fillRect(0, 112, W, H);
      kHouse(c, 120, 150, 80, 46, { mood: 'night', lit: true }); for (let i = 0; i < 4; i++) pioneer(c, PIONEER[i], 70 + i * 22 + (i > 1 ? 120 : 0), 168, 1.1, { expr: 'sad', k: 'd' });
      return { z: 1.05, fx: 160, fy: 110 };
    }
    if (t > S.tWin) { // the window frame: dozens of strands of hair caught in it
      R(c, 0, 0, W, H, '#140c08'); R(c, 60, 20, 200, 130, '#3c2c20'); VG(c, 72, 32, 176, 106, ['#1c2c4c', '#4c5c7c']); R(c, 158, 20, 4, 130, '#3c2c20'); R(c, 60, 82, 200, 4, '#3c2c20');
      for (let i = 0; i < 6; i++) E(c, 100 + i * 24, 60 + (i % 2) * 30, 3, 3, '#e8eef8');
      for (let i = 0; i < 26; i++) { const x0 = 120 + hash(i) * 70, y0 = 84; PL(c, [x0, y0, x0 + Math.sin(i) * 6, y0 + 8 + hash(i * 3) * 14, x0 + Math.sin(i * 2) * 10, y0 + 20 + hash(i * 5) * 20], '#0c0808'); }
      R(c, 60, 146, 200, 8, '#5c4430'); for (let i = 0; i < 20; i++) P(c, 70 + i * 9, 150, '#e8eef4');
      return { z: lerp(1.05, 1.25, ss(sg(t, S.tWin, S.tWin + 5))), fx: 160, fy: 92 };
    }
    irori(c, t, t < S.tNear ? 0.7 : 0.5, { lamp: false });
    pioneer(c, { id: 'boy', robe: '#5c6c7c', robe2: '#3c4c5c', trim: '#c8c8c8', sash: '#2c2c34', hair: '#1c1c24' }, 132, 142, 1.25, { pose: 'sit', expr: 'normal', blink: 2, k: 'b' });
    const sx = t < S.tNear ? lerp(-20, 80, ss(sg(t, S.tIn, S.tIn + 3))) : 96;
    pioneer(c, SABURO, sx, 144, 1.7, { f: t < S.tIn + 3 ? Math.floor(t * 6) & 3 : -1, expr: t > S.tNear + 1 ? 'shock' : 'normal', arm: t > S.tNear + 1 ? 'reach' : null, k: 's' });
    if (t > S.tNear + 1) redVignette(c, 0.25);
    capPlate(c, t, 0.4, ['12月9日', '太田三郎の家']);
    return { z: 1.06 + (t > S.tNear ? 0.08 : 0), fx: 130, fy: 112 };
  }
};
/* ---- KD: Dec 10 — the search party; one rifle fires; under the Todo fir ---- */
const KD = {
  name: '捜索隊', bgm: 'pulse',
  init(S) { S.tBear = at(S, 'L6', 1) - 0.2; S.tAim = at(S, 'L6', 2) - 0.2; S.tShot = at(S, 'L6', 4) - 0.1; S.tFir = ln(S, 'L7') ? at(S, 'L7', 0) + 0.8 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tFir) { // the root of a Todo fir, half in the snow — a dark shape, no detail
      winterSky(c, t, 'day'); forestBand(c, t, 100, 10, 'day', 0, 0.9, 9); snowGround(c, 100, 0);
      R(c, 150, 30, 14, 110, '#2c2018'); fir(c, 157, 120, 130, 'day'); E(c, 157, 138, 40, 8, '#c8d4e4');
      E(c, 170, 138, 12, 4, '#1c1414'); E(c, 176, 140, 6, 3, '#5c3c4c'); glow(c, 172, 140, 20, 6, '#7c1414', 0.35);
      for (let i = 0; i < 4; i++) pioneer(c, PIONEER[i], 40 + i * 22, 166, 1.15, { expr: 'sad', k: 'f' });
      return { z: lerp(1.05, 1.2, ss(sg(t, S.tFir, S.dur))), fx: 165, fy: 120 };
    }
    const ox = t < S.tBear ? t * 14 : S.tBear * 14;
    winterSky(c, t, 'day', ox); forestBand(c, t, 100, 14, 'day', ox * 0.5, 0.9, 11); snowGround(c, 100, ox);
    for (let i = 0; i < 5; i++) { const x = 40 + i * 24; pioneer(c, PIONEER[i % 4], x, 166, 1.2, { f: t < S.tBear ? Math.floor(t * 6 + i) & 3 : -1, expr: t > S.tBear ? 'shock' : 'normal', k: 'k' + (t > S.tAim ? 'a' : '') }); figRifle(c, x, 166, 1.2, t > S.tAim ? 1 : 0); }
    if (t > S.tBear) { const k = ss(sg(t, S.tBear, S.tBear + 0.8)), run = t > S.tShot + 0.3 ? (t - S.tShot - 0.3) * 140 : 0; blit(c, bearSpr(t > S.tShot ? 'walk' : 'lunge', Math.floor(t * 10) & 3, { eyes: true }), lerp(330, 250, k) + run, 160, 42, 55, { s: 1.2, flip: true }); }
    if (t > S.tShot && t < S.tShot + 0.25) { muzzleFlash(c, 100, 136, 1, 1); flashScreen(c, 0.35); }
    // the other rifles: click, nothing
    if (t > S.tShot + 0.5 && t < S.tShot + 2.5) for (let i = 0; i < 3; i++) TX(c, '…', 50 + i * 24, 108, '#e8eef4', 16, '#000000');
    capPlate(c, t, 0.4, ['12月10日', '捜索隊']);
    return { z: 1.04, fx: 170, fy: 112, sx: t > S.tShot && t < S.tShot + 0.3 ? Math.round(Math.sin(t * 60) * 2) : 0 };
  }
};
/* ---- KE: the wake; the bear bursts in; people on the beams ---- */
const KE = {
  name: '通夜', ch: '通夜の夜', bgm: 'dread',
  init(S) { S.tBurst = at(S, 'L9', 1) - 0.2; S.tOut = ln(S, 'L10') ? at(S, 'L10', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tOut) { // outside: men with torches; then everyone heads downstream
      winterSky(c, t, 'night'); forestBand(c, t, 110, 12, 'night', 0, 0.8, 13); snowGround(c, 110, 0); c.fillStyle = DA('#04060e', 0.35); c.fillRect(0, 110, W, H);
      kHouse(c, 40, 150, 80, 46, { mood: 'night' }); const u = t - S.tOut;
      for (let i = 0; i < 9; i++) { const x = mod(330 - u * 30 + i * 26, 400) - 20; pioneer(c, PIONEER[i % 4], x, 168 + (i % 3) * 3, 1.0, { f: Math.floor(t * 6 + i) & 3, flip: true, k: 't' }); if (i % 2 === 0) { flame(c, x - 6, 128 + (i % 3) * 3, 5, t, i); glow(c, x - 6, 126, 20, 16, '#f8a040', 0.35); } }
      return { z: 1.04, fx: 160, fy: 112 };
    }
    const hit = t > S.tBurst, k = sg(t, S.tBurst, S.tBurst + 0.4);
    irori(c, t, hit ? Math.max(0, 0.7 - k * 0.7) : 0.7, { lampOn: !hit, wx: 240, broken: hit });
    if (!hit) { R(c, 60, 120, 50, 16, '#8c7c64'); R(c, 62, 118, 46, 4, '#a89878'); for (let i = 0; i < 2; i++) { flame(c, 56 + i * 58, 116, 3, t, i); glow(c, 56 + i * 58, 114, 14, 10, '#f8c060', 0.4); } } // the coffin and two candles
    else { PF(c, [40, 140, 96, 128, 104, 140, 48, 148], '#8c7c64'); }
    if (!hit) for (let i = 0; i < 6; i++) pioneer(c, PIONEER[i % 4], 30 + i * 22 + (i > 2 ? 150 : 0), 148, 1.3, { pose: 'kneel', expr: 'sad', k: 'n' });
    else {
      for (let i = 0; i < 4; i++) { const x = 30 + i * 70; R(c, 0, 34, W, 6, '#1c140c'); blit(c, robeFig(PIONEER[i], { arm: 'up', expr: 'shock', k: 'beam' }), x, 74, FIG_AX2, FIG_AY2, { s: 0.85 }); R(c, 0, 72, W, 5, '#1c140c'); }
      blit(c, bearSpr('lunge', 0, { eyes: true }), 230, 146, 42, 55, { s: 1.4, flip: true });
      for (let i = 0; i < 12; i++) R(c, 230 + Math.cos(i) * 40 * k, 70 + Math.sin(i * 2) * 30 * k + k * k * 60, 4, 3, '#5c4c3c');
    }
    capPlate(c, t, 0.4, ['12月10日 夜']);
    return { z: hit ? 1.0 : 1.04, fx: 160, fy: hit ? 120 : 104, sx: hit && t < S.tBurst + 0.5 ? Math.round(Math.sin(t * 60) * 3) : 0 };
  }
};
/* ---- KF: the Myokei house — the window bursts; darkness ---- */
const KF = {
  name: '明景の家', ch: '明景の家', bgm: 'dread',
  init(S) { if (ln(S, 'C0')) { S.tBurst = at(S, 'C0', 3) - 0.1; S.tDark = at(S, 'C0', 4) + 0.9; S.dur = lastSe(S) + 1.6; return; } S.tBurst = ln(S, 'L12') ? at(S, 'L12', 1) + 0.2 : (ln(S, 'S1') ? at(S, 'S1', 0) + 0.5 : 1); S.tDark = ln(S, 'L13') ? at(S, 'L13', 1) - 0.2 : S.tBurst + 3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDark) { // only darkness; two red eyes; the fire is out
      R(c, 0, 0, W, H, '#030204'); const x = 160 + Math.sin(t * 0.9) * 90, y = 96 + Math.sin(t * 1.7) * 10;
      for (const dx of [-7, 7]) { R(c, x + dx - 1, y, 3, 2, '#e8281c'); glow(c, x + dx, y + 1, 8, 6, '#f83020', 0.5); }
      for (let i = 0; i < 6; i++) { const u = fr(t * 0.8 + i / 6); E(c, 160 + Math.cos(i * 2) * 100, 150 - u * 20, 2, 2, DA('#f8a040', 0.6 * (1 - u))); }
      redVignette(c, 0.35);
      return { z: 1, fx: 160, fy: 100 };
    }
    const hit = t > S.tBurst, k = sg(t, S.tBurst, S.tBurst + 0.5);
    irori(c, t, hit ? 0.9 - k * 0.4 : 0.9, { wx: 236, broken: hit });
    const fam = [YAYO, { id: 'k1', robe: '#5c6c7c', robe2: '#3c4c5c', trim: '#c8c8c8', sash: '#2c2c34', hair: '#1c1c24' }, { id: 'k2', robe: '#7c5c4c', robe2: '#5c3c34', trim: '#d8c8b8', sash: '#2c2c34', hair: '#1c1c24' }, { id: 'tk', robe: '#5c4c6c', robe2: '#3c3450', trim: '#d8d0c8', sash: '#6c2c2c', hair: '#1c1c24', female: true }, { id: 'k3', robe: '#6c7c5c', robe2: '#4c5c3c', trim: '#d8d8c8', sash: '#2c2c34', hair: '#1c1c24' }];
    fam.forEach((st, i) => pioneer(c, st, 30 + i * 30 + (i > 2 ? 140 : 0), 144, i === 0 || i === 3 ? 1.45 : 1.1, { pose: 'sit', expr: hit ? 'shock' : 'normal', k: 'h' }));
    if (hit) { const bx = lerp(270, 210, eOut(k)); blit(c, tintSpr(bearSpr('lunge', 0), '#050304', 'bsil'), bx, 140, 42, 55, { s: 1.6, flip: true }); for (const dx of [-38, -34]) R(c, bx + dx * 1.6 + 70, 140 - 30 * 1.6 + 2, 2, 2, '#e8281c'); for (let i = 0; i < 16; i++) R(c, 260 + Math.cos(i) * 60 * k, 64 + Math.sin(i * 2) * 40 * k + k * k * 50, 4, 2, i & 1 ? '#5c4c3c' : '#a8c0d8'); }
    if (!ln(S, 'C0')) capPlate(c, t, 0.4, ['12月10日 午後8時50分', '明景の家']);
    return { z: hit ? 1.12 : 1.03, fx: hit ? 220 : 160, fy: 100, sx: hit && t < S.tBurst + 0.6 ? Math.round(Math.sin(t * 60) * 4) : 0 };
  }
};
/* ---- KG: the toll; the boy behind the bales ---- */
const KG = {
  name: '犠牲', bgm: 'requiem',
  init(S) { S.tBoy = ln(S, 'L15') ? at(S, 'L15', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBoy) { // a straw bale; a small boy hidden behind it, lit by a torch from the door
      R(c, 0, 0, W, H, '#0c0806'); glow(c, 260, 60, 120, 90, '#f8a040', 0.25);
      for (let i = 0; i < 3; i++) { const x = 90 + i * 40; E(c, x, 140, 22, 16, '#a8844c'); E(c, x, 136, 20, 12, '#c8a464'); for (let k = 0; k < 6; k++) L(c, x - 16 + k * 6, 126, x - 18 + k * 6, 154, '#8c6c3c'); }
      pioneer(c, { id: 'rk', robe: '#5c6c7c', robe2: '#3c4c5c', trim: '#c8c8c8', sash: '#2c2c34', hair: '#1c1c24' }, 132, 146, 1.1, { pose: 'kneel', expr: 'shock', k: 'r' });
      return { z: 1.1, fx: 140, fy: 120 };
    }
    winterSky(c, t, 'night'); forestBand(c, t, 110, 12, 'night', 0, 0.8, 15); snowGround(c, 110, 0); c.fillStyle = DA('#04060e', 0.45); c.fillRect(0, 110, W, H);
    kHouse(c, 110, 150, 100, 56, { mood: 'night', window: false });
    candleRows(c, t, 5, Math.min(5, Math.floor(sg(t, 1, 6) * 6)), 116, 126, 5, 22, 0);
    snowfall(c, t, 30, 17, 3, 8, '#a8b8d8');
    return { z: 1.05, fx: 160, fy: 120 };
  }
};
/* ---- KH: evacuation to the school; the fires do not keep the bear away ---- */
const KH = {
  name: '分教場へ', bgm: 'eerie',
  init(S) { S.tFire = at(S, 'L16', 1) - 0.3; S.tBear = at(S, 'L16', 2) - 0.2; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    winterSky(c, t, 'night', t * 6); forestBand(c, t, 110, 12, 'night', t * 3, 0.85, 19); snowGround(c, 110, t * 6); c.fillStyle = DA('#04060e', 0.35); c.fillRect(0, 110, W, H);
    // the branch school
    R(c, 220, 108, 90, 40, '#3c3024'); PF(c, [214, 110, 265, 88, 316, 110], '#8c9cb8'); R(c, 236, 120, 14, 10, '#f8c860'); R(c, 272, 120, 14, 10, '#f8c860'); glow(c, 260, 124, 50, 20, '#f8b040', 0.3);
    if (t > S.tFire) for (let i = 0; i < 4; i++) { const x = 30 + i * 52; for (let k = 0; k < 3; k++) flame(c, x + k * 4, 150, 8, t, i * 3 + k); glow(c, x + 4, 140, 30, 22, '#f8a040', 0.4); }
    for (let i = 0; i < 8; i++) { const x = mod(i * 34 + t * 18, 260) - 20; pioneer(c, i % 3 ? PIONEER[i % 4] : YAYO, x, 172, 1.0, { f: Math.floor(t * 6 + i) & 3, expr: 'sad', k: 'e' }); }
    if (t > S.tBear) { const bx = lerp(-60, 130, ss(sg(t, S.tBear, S.tBear + 5))); blit(c, tintSpr(bearSpr('walk', Math.floor(t * 4) & 3), '#06050a', 'bsh'), bx, 128, 42, 55, { s: 0.8 }); for (const dx of [26, 30]) R(c, bx + dx * 0.8, 128 - 30 * 0.8, 1, 1, '#e8281c'); }
    return { z: 1.04, fx: 160, fy: 120 };
  }
};
/* ---- KI: the hunting party is formed; the ambush at the house ---- */
const KI = {
  name: '討伐隊', ch: '討伐隊', bgm: 'pulse',
  init(S) { S.tNight = at(S, 'L17', 2) - 0.3; S.tBear = ln(S, 'L18') ? at(S, 'L18', 0) - 0.4 : 1e9; S.tBack = ln(S, 'L18') ? at(S, 'L18', 2) - 0.2 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tNight) {
      winterSky(c, t, 'day'); forestBand(c, t, 104, 12, 'day', 0, 0.85, 21); snowGround(c, 104, 0);
      kHouse(c, 220, 140, 70, 38, { smoke: true, t });
      blit(c, suitFig(SUGA, { arm: 'point', k: 's' }), 70, 160, FIG_AX2, FIG_AY2, { s: 1.3 });
      for (let i = 0; i < 6; i++) { const x = 120 + i * 22; pioneer(c, PIONEER[i % 4], x, 166 + (i % 2) * 4, 1.05, { flip: true, k: 'q' }); figRifle(c, x, 166 + (i % 2) * 4, 1.05, 0, true); }
      yearFlash(c, t, 0.3, 1915, 214, 10, '12月12日'); capPlate(c, t, 0.5, ['討伐隊の本部', '隊長 菅貢']);
      return { z: 1.04, fx: 140, fy: 110 };
    }
    winterSky(c, t, 'night'); forestBand(c, t, 110, 14, 'night', 0, 0.9, 23); snowGround(c, 110, 0); c.fillStyle = DA('#04060e', 0.45); c.fillRect(0, 110, W, H);
    kHouse(c, 120, 152, 90, 50, { mood: 'night', window: false });
    for (let i = 0; i < 4; i++) { const x = 20 + i * 14; pioneer(c, PIONEER[i], x, 172, 0.9, { pose: 'kneel', k: 'h' }); figRifle(c, x, 172, 0.9, 1); }
    if (t > S.tBear) { const u = t - S.tBear, back = t > S.tBack, bx = back ? lerp(250, 340, sg(t, S.tBack, S.tBack + 3)) : 300 - Math.min(u, 2) * 25 + Math.sin(u * 1.2) * 6;
      blit(c, tintSpr(bearSpr('walk', back || u < 2 ? Math.floor(t * 4) & 3 : 0), '#06050a', 'bsk'), bx, 150, 42, 55, { s: 1.0, flip: !back }); R(c, bx - 30, 124, 2, 1, '#e8281c'); }
    return { z: 1.05, fx: 200, fy: 120 };
  }
};
/* ---- KX: horror close-up of the bear ---- */
const KX = { name: 'ヒグマの顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, bearFace({ roar: t > 2.2, blink: 0 }), [[14, 20], [32, 20]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t > 2.2 && t < 2.6 ? Math.round(Math.sin(t * 90) * 3) : 0 }; } };
/* ---- KJ: the empty houses broken into one after another ---- */
const KJ = {
  name: '無人の家', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    winterSky(c, t, 'dusk', t * 4); forestBand(c, t, 106, 12, 'night', t * 2, 0.85, 25); snowGround(c, 106, t * 4); c.fillStyle = DA('#0c0814', 0.3); c.fillRect(0, 106, W, H);
    const n = Math.min(8, Math.floor(sg(t, 0.5, S.dur - 1) * 9));
    for (let i = 0; i < 8; i++) { const x = 4 + i * 40, y = 132 + (i % 2) * 10; kHouse(c, x, y, 32, 18, { mood: 'night', window: false }); if (i < n) { R(c, x + 18, y - 13, 6, 13, '#05040a'); for (let k = 0; k < 4; k++) R(c, x + 16 + k * 3, y + 2 + k, 2, 1, '#3c2c20'); } }
    for (let i = 0; i < 26; i++) { const x = 10 + i * 12, y = 160 + Math.sin(i * 1.3) * 6; if (i < n * 3.3) { E(c, x, y, 3, 2, '#5c6c84'); E(c, x + 3, y + 3, 2, 1.5, '#5c6c84'); } }
    snowfall(c, t, 50, 27, 10, 14, '#c8d0e0');
    capPlate(c, t, 0.4, ['12月13日']);
    return { z: 1.04, fx: 160, fy: 118 };
  }
};
/* ---- KK: the ice bridge; one stump too many ---- */
const KK = {
  name: '氷橋', ch: '氷橋', bgm: 'pulse',
  init(S) { S.tCount = at(S, 'L20', 2) - 0.3; S.tMove = at(S, 'L20', 3) - 0.3; S.tFire = ln(S, 'L21') ? at(S, 'L21', 1) - 0.2 : 1e9; S.tGone = ln(S, 'L21') ? at(S, 'L21', 2) : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    winterSky(c, t, 'night'); forestBand(c, t, 92, 14, 'night', 0, 0.75, 29);
    R(c, 0, 92, W, 30, '#5c6c88'); for (let i = 0; i < 14; i++) E(c, i * 26, 106 + (i % 3) * 4, 14, 2, '#7c8ca8'); // the far bank in snow
    R(c, 0, 122, W, 34, '#1c2c44'); for (let i = 0; i < 20; i++) R(c, mod(i * 31 + t * 6, W), 128 + (i * 7 % 24), 10, 1, '#4c6c94'); // the frozen river
    // the stumps on the far bank — one too many, and it moves
    for (let i = 0; i < 6; i++) { const x = 150 + i * 20; R(c, x - 4, 98, 8, 10, '#2c2018'); E(c, x, 98, 4, 1.5, '#8c9cb8'); }
    if (t < S.tGone) { const mv = t > S.tMove ? Math.sin(t * 2) * 1.5 : 0, x = 272; E(c, x + mv, 102, 7, 6, '#140c08'); E(c, x + mv, 97, 5, 3, '#2c2018'); if (t > S.tMove) for (const dx of [-2, 2]) R(c, x + dx + mv, 99, 1, 1, '#e8281c'); }
    else { const u = t - S.tGone; blit(c, tintSpr(bearSpr('walk', Math.floor(t * 8) & 3), '#06050a', 'bbr'), 272 + u * 60, 108, 42, 55, { s: 0.5 }); }
    if (t > S.tCount && t < S.tFire) { const x = 272; ER(c, x, 102, 12, 10, DA('#f8f0c0', 0.6 + 0.4 * Math.sin(t * 8))); TX(c, '7', x + 12, 80, '#f8f0c0', 16, '#000000'); }
    // the bridge and the guards
    R(c, 0, 150, W, 8, '#3c2c20'); for (let x = 4; x < W; x += 24) R(c, x, 140, 3, 18, '#3c2c20'); R(c, 0, 140, W, 2, '#3c2c20');
    for (let i = 0; i < 5; i++) { const x = 40 + i * 34; if (i === 0) blit(c, suitFig(SUGA, { arm: 'point', k: 'k' }), x, 150, FIG_AX2, FIG_AY2, { s: 1.0 }); else { pioneer(c, PIONEER[i % 4], x, 150, 1.0, { k: 'g' }); figRifle(c, x, 150, 1.0, t > S.tFire - 0.5 ? 1 : 0); } }
    if (t > S.tFire && t < S.tFire + 0.6) for (let i = 1; i < 5; i++) { muzzleFlash(c, 40 + i * 34 + 16, 126, 1, 1 - (t - S.tFire) / 0.6); }
    R(c, 0, 158, W, H - 158, '#0c1420');
    capPlate(c, t, 0.4, ['12月13日 夜', '三毛別と六線沢の境の氷橋']);
    return { z: lerp(1.0, 1.15, ss(sg(t, S.tCount, S.tMove + 2))), fx: 230, fy: 110, sx: t > S.tFire && t < S.tFire + 0.4 ? Math.round(Math.sin(t * 60) * 2) : 0 };
  }
};
/* ---- KL: the morning — tracks and blood; Yamamoto Heikichi goes alone ---- */
const KL = {
  name: '足跡', ch: '山本兵吉', bgm: 'eerie',
  init(S) { S.tHunter = ln(S, 'L23') ? at(S, 'L23', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t < S.tHunter) {
      VG(c, 0, 0, W, H, ['#c8d4e4', '#e8eef4', '#f4f8fc']);
      for (let i = 0; i < 9; i++) { const x = 20 + i * 34, y = 200 - i * 14; E(c, x, y, 7, 4, '#9cacc4'); for (let k = 0; k < 4; k++) E(c, x - 5 + k * 3.5, y - 5, 1.5, 1.5, '#9cacc4'); if (i % 2) { E(c, x + 10, y + 4, 2, 1.5, '#a81c1c'); P(c, x + 14, y + 1, '#a81c1c'); } }
      return { z: lerp(1.2, 1.0, ss(sg(t, 0, S.tHunter))), fx: 160, fy: 140 };
    }
    const ox = (t - S.tHunter) * 16; winterSky(c, t, 'day', ox); forestBand(c, t, 98, 14, 'day', ox * 0.5, 1.0, 31); snowGround(c, 98, ox);
    pioneer(c, HUNTER, 150, 168, 1.5, { f: Math.floor(t * 5) & 3, expr: 'normal', k: 'y' }); figRifle(c, 150, 168, 1.5, 0);
    capPlate(c, t, S.tHunter + 0.4, ['猟師 山本兵吉（57歳）']);
    return { z: 1.06, fx: 150, fy: 112 };
  }
};
/* ---- KM: the end — two shots ---- */
const KM = {
  name: '決着', ch: '決着', bgm: 'dread',
  init(S) { S.tShot1 = at(S, 'L24', 1) + 0.6; S.tStand = at(S, 'L24', 3) - 0.2; S.tShot2 = ln(S, 'L25') ? at(S, 'L25', 0) + 0.3 : S.tStand + 4; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    winterSky(c, t, 'day'); forestBand(c, t, 96, 14, 'day', 0, 1.0, 33); snowGround(c, 96, 0);
    // the bear (back to the hunter), then standing, then down
    const bx = 236, by = 150;
    if (t < S.tStand) blit(c, bearSpr('walk', 0), bx, by, 42, 55, { s: 1.2 });
    else if (t < S.tShot2 + 0.3) blit(c, bearSpr('stand', 0, { eyes: true }), bx, by, 25, 83, { s: 1.25, flip: true });
    else blit(c, bearSpr('down', 0), bx, by, 42, 33, { s: 1.2, flip: true });
    // the elm and the hunter
    R(c, 80, 20, 18, 136, '#4c3c2c'); R(c, 80, 20, 5, 136, '#5c4c3c'); for (let k = 0; k < 4; k++) L(c, 90, 40 + k * 18, 40 + k * 10, 20 + k * 14, '#4c3c2c', 3);
    pioneer(c, HUNTER, 112, 166, 1.4, { expr: t > S.tStand ? 'angry' : 'normal', k: 'z' }); figRifle(c, 112, 166, 1.4, 1);
    for (const ts of [S.tShot1, S.tShot2]) if (t > ts && t < ts + 0.25) { muzzleFlash(c, 140, 132, 1, 1); flashScreen(c, 0.5); }
    if (t > S.tShot2 + 0.4) glow(c, bx, by - 6, 40, 8, '#7c1414', 0.35);
    capPlate(c, t, 0.4, ['12月14日', 'ハルニレの木の陰から']);
    if (t > S.tShot2 + 1.5) yearFlash(c, t, S.tShot2 + 1.5, 1915, 214, 10, '午前10時');
    const z = t > S.tStand && t < S.tShot2 ? 1.2 : 1.05;
    return { z, fx: t > S.tStand && t < S.tShot2 ? 220 : 170, fy: 108, sx: (t > S.tShot1 && t < S.tShot1 + 0.3) || (t > S.tShot2 && t < S.tShot2 + 0.3) ? Math.round(Math.sin(t * 60) * 3) : 0 };
  }
};
/* ---- KN: the sled down the mountain; the "bear wind" blizzard ---- */
const KN = {
  name: '熊風', ch: '熊風', bgm: 'requiem',
  init(S) { S.tStorm = at(S, 'L26', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const k = ss(sg(t, S.tStorm, S.tStorm + 3)), ox = t * 10;
    winterSky(c, t, 'day', ox); c.fillStyle = DA('#5c6474', 0.7 * k); c.fillRect(0, 0, W, 120);
    forestBand(c, t, 104, 14, 'day', ox * 0.5, 0.9, 35); snowGround(c, 104, ox);
    for (let i = 0; i < 4; i++) { const x = 70 + i * 20; pioneer(c, PIONEER[i], x, 166, 1.1, { f: Math.floor(t * 4 + i) & 3, flip: true, k: 'r' }); L(c, x - 4, 140, 160, 158, '#3c2c20'); }
    R(c, 150, 156, 110, 6, '#5c4430'); blit(c, bearSpr('down', 0), 205, 158, 42, 33, { s: 1.1 });
    snowfall(c, t, 30 + Math.floor(160 * k), 37, -20 - 120 * k, 20 + 60 * k, '#f4f8fc');
    if (k > 0) { c.fillStyle = DA('#e8eef4', 0.35 * k); c.fillRect(0, 0, W, H); }
    return { z: 1.04, fx: 170, fy: 116, sx: Math.round(Math.sin(t * 30) * k) };
  }
};
/* ---- KO: the record — interviews 40+ years later; the cleared forest ---- */
const KO = {
  name: '記録', ch: '記録', bgm: 'memory',
  init(S) { S.tForest = ln(S, 'L28') ? at(S, 'L28', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tForest) { // forest cut for the settlement; stumps; a bear far in the woods
      winterSky(c, t, 'day'); forestBand(c, t, 100, 8, 'day', 0, 0.9, 41); snowGround(c, 100, 0);
      for (let i = 0; i < 12; i++) { const x = 10 + i * 27, y = 140 + (i % 3) * 10; R(c, x - 5, y - 6, 10, 6, '#5c4430'); E(c, x, y - 6, 5, 2, '#c8a878'); }
      kHouse(c, 220, 128, 50, 26, { smoke: true, t }); blit(c, tintSpr(bearSpr('walk', Math.floor(t * 3) & 3), '#1c1410', 'bfo'), 60, 100, 42, 55, { s: 0.45 });
      return { z: 1.03, fx: 160, fy: 112 };
    }
    R(c, 0, 0, W, H, '#3c3024'); for (let x = 0; x < W; x += 16) R(c, x, 0, 15, 150, '#4c3c2c'); R(c, 0, 150, W, H - 150, '#2c2018');
    glow(c, 160, 60, 120, 80, '#f8d080', 0.3); R(c, 120, 118, 110, 8, '#6c5038'); R(c, 130, 108, 40, 10, '#e8e0cc'); for (let k = 0; k < 4; k++) R(c, 134, 110 + k * 2, 30, 1, '#5c5c64');
    blit(c, suitFig({ id: 'kim', coat: '#4c5c4c', coat2: '#3c4c3c', pants: '#3c3c3c', boots: '#2c2420', hair: '#1c1c24', glasses: true }, { arm: 'reach', k: 'k' }), 100, 148, FIG_AX2, FIG_AY2, { s: 1.4 });
    for (let i = 0; i < 2; i++) pioneer(c, { id: 'ol' + i, robe: ['#5c5444', '#4c4c5c'][i], robe2: '#3c3c3c', trim: '#c8c0b0', sash: '#2c2420', old: true, beard: i === 0 }, 196 + i * 46, 148, 1.4, { pose: 'sit', k: 'o' });
    yearFlash(c, t, 0.4, 1961, 214, 10, '聞き取り'); capPlate(c, t, 0.6, ['林務官 木村盛武']);
    return { z: 1.04, fx: 160, fy: 110 };
  }
};
/* ---- KP: the memorial; seven candles ---- */
const KP = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tCand = at(S, 'L30', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t < S.tCand) {
      winterSky(c, t, 'dusk'); forestBand(c, t, 106, 14, 'night', 0, 0.9, 43); snowGround(c, 106, 0);
      R(c, 140, 86, 40, 70, '#5c5c64'); R(c, 140, 86, 6, 70, '#7c7c84'); PF(c, [136, 88, 160, 76, 184, 88], '#4c4c54'); for (let k = 0; k < 4; k++) R(c, 150, 100 + k * 12, 20, 2, '#3c3c44');
      for (let i = 0; i < 3; i++) { flame(c, 120 + i * 40, 160, 4, t, i); glow(c, 120 + i * 40, 156, 12, 10, '#f8c060', 0.4); }
      yearFlash(c, t, 0.4, 2015, 214, 10, '百回忌'); capPlate(c, t, 0.6, ['三毛別羆事件 復元地']);
      return { z: 1.05, fx: 160, fy: 110 };
    }
    VG(c, 0, 0, W, H, ['#06040a', '#0c0810', '#140c10']); snowfall(c, t, 30, 47, 2, 6, '#5c6478');
    candleRows(c, t, 7, Math.min(7, Math.floor(sg(t, S.tCand, S.tCand + 3) * 8)), 94, 110, 7, 22, 0);
    return { z: 1 + 0.08 * ss(sg(t, S.tCand, S.tEnd + 2)), fx: 160, fy: 100 };
  }
};
/* ---- Shorts ---- */
const SS2 = {
  name: 'ショート結び', bgm: 'dread',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.6); },
  draw(c, t, S) { R(c, 0, 0, W, H, '#030204'); const k = ss(sg(t, 0.2, 1.5)); c.save(); c.globalAlpha = k; blit(c, bearFace({ roar: t > 2 }), 160, 100, 24, 24, { s: 3.2 }); c.restore(); redVignette(c, 0.3); return { z: 1, fx: 160, fy: 100 }; }
};
