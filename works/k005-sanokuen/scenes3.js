/* ================= 記録 #005 三億円事件: scenes (2) — three minutes, the search, the end ================= */
const goldBg = ['#1c140c', '#5c442c'], blueBg = ['#0c1020', '#2c3c5c'], greyBg = ['#141418', '#4c4c54'];

/* ---- SE: at the driver's window ---- */
const SE = {
  name: '停車', bgm: 'pulse',
  init(S) { S.tOut = ln(S, 'L11') ? at(S, 'L11', 0) - 0.3 : 1e9; S.tKey = ln(S, 'L11') ? at(S, 'L11', 1) - 0.2 : 1e9; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tKey) { // the key left in the ignition, on the same ring as the trunk and case keys
      VG(c, 0, 0, W, H, ['#14161c', '#2c3038', '#14161c']); R(c, 40, 60, 240, 90, '#1c1e24'); R(c, 40, 60, 240, 4, '#3c4048'); E(c, 160, 106, 26, 26, '#2c2e34'); E(c, 160, 106, 22, 22, '#3c3e44'); E(c, 160, 106, 8, 8, '#141418');
      const sw = Math.sin(t * 3) * 0.12; c.save(); c.translate(160, 106); c.rotate(sw);
      R(c, -2, -2, 26, 4, '#c8b060'); R(c, 20, -4, 6, 8, '#a89040'); E(c, 34, 10, 9, 9, '#a8acb4'); E(c, 34, 10, 7, 7, '#1c1e24');
      [[30, 22, '#c8b060'], [40, 24, '#c8ccd4'], [46, 18, '#c8b060']].forEach(([x, y, col], i) => { L(c, 34, 16, x, y, col, 2); R(c, x - 2, y, 4, 14, col); P(c, x - 1, y + 12, '#ffffff'); }); c.restore();
      glow(c, 170, 112, 60, 40, '#f8e0a0', 0.15);
      return { z: 1.0 + 0.08 * ss(sg(t, S.tKey, S.dur)), fx: 170, fy: 110 };
    }
    roadScene(c, t, 0, { tower: 300 });
    blit(c, bikeSpr({}), 250, CAR_Y + 4, 30, 49); trailingSheet(c, 224, CAR_Y - 8, 0.2, -1, 18);
    blit(c, cedricSpr('#16181e', { open: t > S.tOut }), 150, CAR_Y, 50, 35);
    if (t < S.tOut) blit(c, modFig(FAKE, { f: -1, arm: 'point', k: 'se' }), 196, CAR_Y + 4, FIG_AX2, FIG_AY2, { flip: true });
    else { BANKERS.concat([DRIVER]).forEach((st, i) => { const k = sg(t, S.tOut + i * 0.3, S.tOut + 0.8 + i * 0.3); if (k > 0) blit(c, modFig(st, { f: -1, expr: 'sad', k: 'out' }), 112 + i * 16, CAR_Y + 4 + (1 - k) * 4, FIG_AX2, FIG_AY2); }); blit(c, modFig(FAKE, { f: -1, arm: 'point', k: 'se2' }), 212, CAR_Y + 4, FIG_AX2, FIG_AY2, { flip: true }); }
    return { z: 1.18, fx: 168, fy: 112 };
  }
};
withCuts(SE, [
  ['D1', (c, t) => closeUp(c, t, withMouth('cdrv', driverFace({ blink: blinkOf(t, 4) }), {}, 24, 31), { bg: greyBg, glow: '#a8b8c8' })],
  ['F2', (c, t) => closeUp(c, t, fakeFace({ blink: blinkOf(t, 7) }), { bg: ['#1c2030', '#6c7c9c'], glow: '#e8f0ff' })],
  ['L10', (c, t) => closeUp(c, t, bankerFace({ blink: blinkOf(t, 9) }), { bg: ['#140c0c', '#4c2c2c'], lines: '#c83c3c' })],
]);

/* ---- SF: under the car — smoke and fire ---- */
const SF = {
  name: '発炎筒', ch: '3分間', bgm: 'dread',
  init(S) { S.tUnder = ln(S, 'L12') ? at(S, 'L12', 0) : -1; S.tFire = ln(S, 'L12') ? at(S, 'L12', 2) + 0.3 : 0.2; S.tRun = ln(S, 'L13') ? at(S, 'L13', 1) - 0.2 : (ln(S, 'F1') ? ln(S, 'F1').se : 1e9); S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    roadScene(c, t, 0, {});
    blit(c, bikeSpr({}), 250, CAR_Y + 4, 30, 49); trailingSheet(c, 224, CAR_Y - 8, 0.2, -1, 18);
    blit(c, cedricSpr('#16181e', { open: true }), 150, CAR_Y, 50, 35);
    const fire = t > S.tFire;
    if (!fire && t > S.tUnder) { R(c, 170, CAR_Y - 4, 20, 5, '#2c3448'); R(c, 188, CAR_Y - 4, 6, 4, '#141414'); R(c, 188, CAR_Y + 1, 6, 4, '#141414'); } // only his legs stick out
    if (fire) { flareSmoke(c, 150, CAR_Y + 2, t, Math.min(1, (t - S.tFire) * 1.5)); blit(c, modFig(FAKE, { f: -1, arm: 'wave', expr: 'shock', k: 'sf' }), 200, CAR_Y + 4, FIG_AX2, FIG_AY2, { flip: true }); }
    const run = sg(t, S.tRun, S.tRun + 2.4);
    BANKERS.concat([DRIVER]).forEach((st, i) => { const x = lerp(112 + i * 16, 22 + i * 20, eOut(run)); if (run < 1) blit(c, modFig(st, { f: run > 0 ? Math.floor(t * 10 + i) & 3 : -1, expr: fire ? 'shock' : 'sad', k: 'sfr' }), x, CAR_Y + 4 - run * 6, FIG_AX2, FIG_AY2, { flip: run > 0 }); else crouch(c, st, x, ROAD_Y - 4, 0, { k: i }); });
    hedge(c, 0);
    return { z: 1.12, fx: 150, fy: 112, sx: fire && t - S.tFire < 0.4 ? Math.round(Math.sin(t * 80) * 2) : 0 };
  }
};
withCuts(SF, [['F1', (c, t) => closeUp(c, t, fakeFace({ blink: 0 }), { bg: ['#2c0c08', '#a83c14'], lines: '#f8c040' })]]);

/* ---- SG: he drives away; nothing explodes; a flare and a fake bike ---- */
const SG = {
  name: '消えた輸送車', bgm: 'dread',
  init(S) { S.tGo = at(S, 'L14', 1) - 0.2; S.tWait = ln(S, 'L16') ? at(S, 'L16', 0) - 0.3 : 1e9; S.tFlare = ln(S, 'L17') ? at(S, 'L17', 0) - 0.3 : 1e9; S.tFake = ln(S, 'L18') ? at(S, 'L18', 0) - 0.3 : 1e9; S.tCall = ln(S, 'B1') ? at(S, 'B1', 0) - 0.4 : 1e9; S.tClock = ln(S, 'L19') ? at(S, 'L19', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tClock) { // ten minutes already gone
      VG(c, 0, 0, W, H, ['#0c0c10', '#1c1c24', '#0c0c10']); const k = sg(t, S.tClock + 0.4, S.tClock + 3);
      E(c, 160, 84, 52, 52, '#2c2c34'); E(c, 160, 84, 48, 48, '#f4f0e8'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; R(c, 160 + Math.cos(a) * 42 - 1, 84 + Math.sin(a) * 42 - 1, 3, 3, '#2c2c34'); }
      const m = 21 + 10 * k, am = (m / 60) * TAU - TAU / 4, ah = ((9 + m / 60) / 12) * TAU - TAU / 4;
      c.save(); c.globalAlpha = 0.35; c.fillStyle = '#c83c3c'; c.beginPath(); c.moveTo(160, 84); c.arc(160, 84, 40, (21 / 60) * TAU - TAU / 4, am); c.fill(); c.restore();
      L(c, 160, 84, 160 + Math.cos(ah) * 24, 84 + Math.sin(ah) * 24, '#141414', 3); L(c, 160, 84, 160 + Math.cos(am) * 38, 84 + Math.sin(am) * 38, '#141414', 2); E(c, 160, 84, 3, 3, '#c81818');
      bigCap(c, '+' + Math.round(10 * k) + '分', 150, 24, '#f86060');
      return { z: 1.02, fx: 160, fy: 96 };
    }
    if (t > S.tCall) { // shouting up to the prison watchtower
      wintrySky(c, t, 120); R(c, 0, 100, W, 140, '#9c9890'); for (let x = 0; x < W; x += 24) R(c, x, 100, 1, 140, '#8c8880');
      R(c, 150, 20, 40, 90, '#a8a49c'); R(c, 140, 6, 60, 22, '#8c8880'); R(c, 136, 2, 68, 6, '#6c6860'); R(c, 150, 12, 40, 12, '#3c4450'); blit(c, modFig(COPS[1], { f: -1, k: 'tw' }), 170, 30, FIG_AX2, FIG_AY2, { s: 0.6 });
      blit(c, modFig(BANKERS[0], { f: -1, arm: 'up', expr: 'shock', k: 'call' }), 100, 158, FIG_AX2, FIG_AY2, { s: 1.4 });
      for (let i = 0; i < 3; i++) { const u = fr(t * 2 + i / 3); c.save(); c.globalAlpha = 1 - u; c.strokeStyle = '#ffffff'; c.beginPath(); c.arc(116, 84, 10 + u * 30, -1.3, -0.3); c.stroke(); c.restore(); }
      return { z: 1.04, fx: 150, fy: 90 };
    }
    if (t > S.tFlare) { // the "dynamite": a flare on the road; the white bike with the sheet still hooked on
      wintrySky(c, t, 60); R(c, 0, 60, W, 180, '#5c5c60'); for (let i = 0; i < 60; i++) P(c, hash(i * 3) * W, 64 + hash(i * 7) * 100, '#6c6c70');
      const k = t > S.tFake ? 0.3 : 1; flareSmoke(c, 92, 136, t, k, 5); R(c, 76, 134, 34, 6, '#c83c24'); R(c, 76, 134, 34, 2, '#e85c3c'); R(c, 106, 133, 6, 8, '#3c3c44'); for (let i = 0; i < 3; i++) L(c, 82 + i * 8, 134, 84 + i * 8, 140, '#5c8cc8'); // the flare wrapped in a circuit diagram
      trailingSheet(c, 206, 108, 0.2, -1, 22); blit(c, bikeSpr({}), 240, 144, 30, 49, { s: 1.6 });
      if (t > S.tFake) { const k2 = eOut(sg(t, S.tFake, S.tFake + 0.4)); c.save(); c.translate(240, 96); c.rotate(-0.2); c.globalAlpha = k2; R(c, -38, -16, 76, 32, '#c81818'); R(c, -35, -13, 70, 26, '#f4f0e8'); TX(c, 'ニセモノ', -30, -9, '#c81818', 16, null); c.restore(); }
      return { z: 1.04, fx: 160, fy: 110 };
    }
    // the car drives off, the bankers watch from the hedge, then wait for a blast that never comes
    roadScene(c, t, 0, {});
    blit(c, bikeSpr({}), 250, CAR_Y + 4, 30, 49); trailingSheet(c, 224, CAR_Y - 8, 0.2, -1, 18);
    flareSmoke(c, 150, CAR_Y + 2, t, 1);
    const go = Math.max(0, t - S.tGo), cx = 150 + go * go * 30;
    if (go <= 0) blit(c, modFig(FAKE, { f: Math.floor(t * 10) & 3, k: 'sg' }), lerp(200, 166, sg(t, S.tGo - 1.2, S.tGo)), CAR_Y + 4, FIG_AX2, FIG_AY2, { flip: true });
    if (cx < W + 70) { blit(c, cedricSpr(), cx, CAR_Y, 50, 35); if (go > 0) for (let i = 0; i < 5; i++) E(c, cx - 56 - i * 8, CAR_Y - 2, 4 + i * 2, 2 + i, DA('#c8c8c4', 0.4 - i * 0.07)); }
    BANKERS.concat([DRIVER]).forEach((st, i) => crouch(c, st, 22 + i * 20, ROAD_Y - 4, 0, { k: 'g' + i, expr: t > S.tWait ? 'sad' : 'normal', flip: false })); hedge(c, 0);
    const quiet = t > S.tWait ? sg(t, S.tWait, S.tWait + 3) : 0;
    return { z: 1.08 + 0.12 * quiet, fx: lerp(150, 120, quiet), fy: 112 };
  }
};
withCuts(SG, [['L15', (c, t) => closeUp(c, t, bankerFace({ blink: blinkOf(t, 11) }), { bg: ['#1c2030', '#8c9cb8'], glow: '#ffffff' })]]);

/* ---- SH: 9:50 — emergency deployment over Tokyo ---- */
const SH = {
  name: '緊急配備', ch: '緊急配備', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#1c2430'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#243040'); for (let y = 0; y < H; y += 20) R(c, 0, y, W, 1, '#243040');
    PF(c, [20, 40, 120, 26, 210, 30, 300, 50, 304, 120, 260, 150, 180, 156, 90, 150, 30, 130], '#3c4c3c'); PF(c, [200, 120, 300, 110, 304, 150, 220, 160], '#2c3c5c'); // Tokyo, the bay
    L(c, 30, 100, 300, 108, '#4c6c9c', 2); L(c, 240, 30, 260, 140, '#4c6c9c', 2); // rivers
    E(c, 96, 96, 4, 4, '#f8d860'); TX(c, '府中', 80, 76, '#f4f0e8', 16, '#000000');
    const n = Math.floor(sg(t, 0.4, S.dur - 1) * 40); for (let i = 0; i < n; i++) { const x = 30 + hash(i * 3) * 260, y = 36 + hash(i * 7) * 110, on = (Math.floor(t * 4) + i) & 1; R(c, x - 2, y - 2, 4, 4, on ? '#ff3030' : '#8c1818'); }
    for (let i = 0; i < 18; i++) { const x = mod(i * 17 + t * 4, 150) + 110, y = 128 + (i % 3) * 5; R(c, x, y, 6, 3, ['#c8c8c8', '#5c5c64', '#8c4c3c'][i % 3]); } // the traffic jam at the checkpoints
    capPlate(c, t, 0.3, ['午前9時50分', '緊急配備']);
    return { z: 1.02 + 0.04 * ss(t / S.dur), fx: 160, fy: 100 };
  }
};

/* ---- SI: the switch in the oak wood at Kokubunji ---- */
const SI = {
  name: 'クヌギ林', bgm: 'eerie',
  init(S) { S.tSwap = at(S, 'L21', 2) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    wintrySky(c, t, 120); R(c, 0, 120, W, 120, '#4c4434');
    for (let i = 0; i < 12; i++) { const x = i * 28 + (i % 3) * 6, h = 70 + (i % 4) * 12; L(c, x, 150, x, 150 - h, '#3c2c20', 4); for (let k = 0; k < 5; k++) L(c, x, 150 - h * 0.5 - k * 8, x + (k % 2 ? 14 : -14), 150 - h * 0.6 - k * 10, '#4c3c2c', 2); } // bare oaks
    for (let i = 0; i < 40; i++) P(c, hash(i * 5) * W, 128 + hash(i * 11) * 30, '#8c6c3c');
    blit(c, cedricSpr(), 90, 150, 50, 35);
    const k = sg(t, S.tSwap, S.tSwap + 3), cx = 230 + Math.max(0, t - S.tSwap - 3.4) ** 2 * 24;
    if (cx < W + 60) blit(c, corollaSpr('#1c2c4c'), cx, 150, 42, 29);
    if (k > 0 && k < 1) { for (let i = 0; i < 3; i++) { const u = sg(k, i * 0.3, i * 0.3 + 0.4); if (u > 0 && u < 1) duraCase(c, lerp(130, 206, u), 126 - Math.sin(u * Math.PI) * 10); } blit(c, modFig({ id: 'shadow', top: 'jacket', coat: '#141418', shirt: '#2c2c34', pants: '#141418', skin: '#3c3434', hair: '#0c0c0c' }, { f: Math.floor(t * 8) & 3, arm: 'hold', k: 'sw' }), lerp(140, 200, fr(k * 3)), 152, FIG_AX2, FIG_AY2, { flip: Math.floor(k * 3) % 2 === 1 }); }
    capPlate(c, t, 0.3, ['国分寺', 'クヌギ林']);
    return { z: 1.04, fx: 160, fy: 112 };
  }
};

/* ---- SJ: 124 things left behind — all mass-produced ---- */
function cookieTin(c, x, y, s = 1) { R(c, x, y, 16 * s, 12 * s, '#f0f0ec'); R(c, x, y, 16 * s, 3 * s, '#d8d8d4'); R(c, x + 2 * s, y + 5 * s, 12 * s, 2 * s, '#c8c4bc'); }
function huntCap(c, x, y) { E(c, x, y, 9, 5, '#6c5c4c'); R(c, x, y - 1, 12, 3, '#5c4c3c'); for (let i = -6; i < 8; i += 3) P(c, x + i, y - 2, '#7c6c5c'); }
const SJ = {
  name: '遺留品', ch: '124点の遺留品', bgm: 'pulse',
  init(S) { S.tMass = at(S, 'L23', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#2c2a28'); R(c, 0, 100, W, 140, '#5c4c3c'); R(c, 0, 100, W, 3, '#7c6c5c');
    if (t < S.tMass) {
      const k = sg(t, 0.4, S.tMass - 0.4);
      if (k > 0.05) blit(c, bikeSpr({}), 70, 150, 30, 49, { s: 1.4 }); if (k > 0.3) cookieTin(c, 140, 120, 1.6); if (k > 0.5) huntCap(c, 200, 130); if (k > 0.65) { R(c, 228, 136, 30, 6, '#c83c24'); R(c, 228, 136, 30, 2, '#e85c3c'); } if (k > 0.8) PF(c, [262, 112, 290, 112, 296, 150, 256, 150], '#1c2448');
      const n = Math.round(124 * ss(k)); c.fillStyle = DA('#000000', 0.5); c.fillRect(0, 30, W, 34); bigCap(c, '遺留品 ' + n + '点', 34, 24, '#f4f0e8');
      [[70, 108], [148, 112], [200, 120], [242, 130], [276, 104]].forEach(([x, y], i) => { if (k > [0.05, 0.3, 0.5, 0.65, 0.8][i]) { R(c, x - 6, y - 14, 12, 8, '#f8f0c8'); TX(c, String(i + 1), x - 3, y - 15, '#141414', 16, null); } });
      return { z: 1.04, fx: 160, fy: 100 };
    }
    // the cookie tins multiply: 30,000 of the same tin were on sale
    const n = Math.floor(sg(t, S.tMass, S.tMass + 3) * 66); for (let i = 0; i < n; i++) cookieTin(c, 8 + (i % 11) * 28, 30 + Math.floor(i / 11) * 22, 1.2);
    c.fillStyle = DA('#000000', 0.5); c.fillRect(0, 152, W, 26); bigCap(c, '同じ缶が、3万個', 154, 16, '#f8d860');
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- SK: the "montage" — a photo of a young man who had already died ---- */
const SK = {
  name: 'モンタージュ', ch: 'モンタージュ写真', bgm: 'eerie',
  init(S) { S.tOther = at(S, 'L25', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#5c5850'); for (let y = 0; y < H; y += 8) R(c, 0, y, W, 1, '#54504a');
    const k = eOut(sg(t, 0.3, 0.9)); R(c, 96, lerp(-150, 18, k), 128, 136, '#f4f0e4'); const py = lerp(-140, 26, k);
    R(c, 104, py - 2, 112, 18, '#c81818'); TX(c, 'この顔を見たら', 112, py - 1, '#ffffff', 16, null);
    const other = t > S.tOther; R(c, 116, py + 22, 88, 92, other ? '#8c8c8c' : '#c8c0b0');
    bigFace(c, fakeFace({ dark: other }), 160, py + 70, 1.8, 1, 'mtg' + (other ? 'd' : ''));
    if (other) { c.save(); c.globalAlpha = 0.85 * sg(t, S.tOther, S.tOther + 1.5); R(c, 116, py + 22, 88, 92, '#3c3c40'); c.restore(); bigCap(c, '?', py + 54, 24, '#f4f0e8', sg(t, S.tOther + 0.8, S.tOther + 1.6)); }
    yearFlash(c, t, 0.4, 1968, 228, 14, '12月21日');
    return { z: 1.04 + 0.08 * ss(sg(t, S.tOther, S.dur)), fx: 160, fy: 90 };
  }
};

/* ---- SL: 110,000 names; 171,346 officers; a man arrested and cleared ---- */
const SL = {
  name: '大捜査', bgm: 'requiem',
  init(S) { S.tCops = at(S, 'L26', 2) - 0.3; S.tMan = ln(S, 'L27') ? at(S, 'L27', 0) - 0.3 : 1e9; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMan) { // one man under the eyes of the papers
      VG(c, 0, 0, W, H, ['#0c0c10', '#1c1c24', '#0c0c10']); glow(c, 160, 120, 60, 40, '#a8b0c0', 0.2);
      blit(c, modFig({ id: 'cleared', top: 'jacket', coat: '#3c3c44', shirt: '#c8c8c0', pants: '#2c2c34', skin: '#c8a080', hair: '#1c1814', hairStyle: 'side' }, { f: -1, expr: 'sad', k: 'cl' }), 160, 150, FIG_AX2, FIG_AY2, { s: 1.2 });
      for (let i = 0; i < 9; i++) { const a = i / 9 * TAU + t * 0.25, r = 92 + Math.sin(t + i) * 6, x = 160 + Math.cos(a) * r * 1.4, y = 100 + Math.sin(a) * r * 0.6; R(c, x - 14, y - 10, 28, 20, '#e8e4d8'); R(c, x - 12, y - 8, 24, 4, '#141414'); for (let k = 0; k < 3; k++) R(c, x - 12, y - 1 + k * 3, 22, 1, '#8c8c8c'); }
      return { z: 1.04, fx: 160, fy: 110 };
    }
    R(c, 0, 0, W, H, '#14141c');
    const n = Math.floor(sg(t, 0.4, S.tCops) * 264); for (let i = 0; i < n; i++) { const x = 8 + (i % 33) * 9.5, y = 40 + Math.floor(i / 33) * 13; E(c, x, y, 2, 2, '#8c8c94'); R(c, x - 2, y + 2, 5, 6, '#6c6c74'); }
    c.fillStyle = DA('#000000', 0.55); c.fillRect(0, 4, W, 30); bigCap(c, '重要参考人 11万人', 8, 16, '#f4f0e8');
    if (t > S.tCops) { const m = Math.floor(sg(t, S.tCops, S.tCops + 2.5) * 40); for (let i = 0; i < m; i++) { const x = 10 + (i % 20) * 15, y = 140 + Math.floor(i / 20) * 12; R(c, x - 3, y - 2, 7, 3, '#1c2438'); R(c, x - 4, y + 1, 9, 1, '#141414'); P(c, x, y - 1, '#d8b040'); E(c, x, y + 4, 2.5, 2.5, '#e0b090'); }
      bigCap(c, 'のべ17万人', 120, 16, '#8cb4f8'); }
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- SM: December 10, 1975 — the statute of limitations ---- */
const SM = {
  name: '時効', ch: '時効', bgm: 'requiem',
  init(S) { S.tStamp = at(S, 'L28', 2) - 0.2; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#0c0c14', '#1c1c2c', '#0c0c14']);
    const flips = Math.min(7, Math.floor(t * 2)); for (let i = 0; i < 7 - flips; i++) R(c, 100 + i * 2, 30 - i * 2, 120, 4, '#d8d4c8'); // years falling away
    R(c, 100, 30, 120, 110, '#f4f0e8'); R(c, 100, 30, 120, 26, '#c81818'); TX(c, String(1968 + flips) + '年', 128, 34, '#ffffff', 16, null);
    TX(c, '12', 120, 66, '#141414', 16, null); TX(c, '月', 144, 66, '#141414', 16, null); const d = textSpr('10', 16, '#141414'); c.drawImage(d, 0, 0, d.width, d.height, 128, 84, d.width * 2, d.height * 2);
    if (t > S.tStamp) { const k = eOut(sg(t, S.tStamp, S.tStamp + 0.25)); c.save(); c.translate(200, 110); c.rotate(-0.3); c.scale(2 - k, 2 - k); c.globalAlpha = k; R(c, -30, -14, 60, 28, '#c81818'); R(c, -27, -11, 54, 22, '#f4f0e8'); TX(c, '時効', -16, -9, '#c81818', 16, null); c.restore(); }
    return { z: 1.02, fx: 160, fy: 90, sy: t > S.tStamp && t < S.tStamp + 0.2 ? 2 : 0 };
  }
};

/* ---- SN: the bonus paid the next day; pay by bank transfer; "a robbery without hatred" ---- */
const SN = {
  name: 'その後', ch: 'その後', bgm: 'memory',
  init(S) { S.tBank = at(S, 'L30', 0) - 0.3; S.tGoro = at(S, 'L31', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tGoro) { // 2・9・4・3 → に・く・し・み
      VG(c, 0, 0, W, H, ['#14100c', '#2c2418', '#14100c']); const ds = ['2', '9', '4', '3'], ks = ['に', 'く', 'し', 'み'];
      ds.forEach((d, i) => { const k = sg(t, S.tGoro + 0.3 + i * 0.4, S.tGoro + 0.7 + i * 0.4); const x = 76 + i * 46; R(c, x - 16, 36, 34, 40, '#2c2418'); const s = textSpr(d, 24, '#f8d860'); c.drawImage(s, 0, 0, s.width, s.height, x - 10, 40, s.width * 1.4, s.height * 1.4); if (k > 0) { c.save(); c.globalAlpha = k; TX(c, ks[i], x - 6, 86, '#f4f0e8', 24, '#000000'); c.restore(); } });
      bigCap(c, '0万7500円', 120, 16, '#a89878', 0.6);
      return { z: 1.02, fx: 160, fy: 90 };
    }
    if (t > S.tBank) { // a passbook: the bonus paid in
      R(c, 0, 0, W, H, '#3c3428'); R(c, 70, 30, 180, 120, '#2c4c7c'); R(c, 76, 36, 168, 108, '#f4f0e4'); R(c, 76, 36, 168, 14, '#c8d8e8'); TX(c, '普通預金', 120, 35, '#2c3c5c', 16, null);
      const n = Math.floor(sg(t, S.tBank + 0.4, S.tBank + 3) * 4); for (let i = 0; i < n; i++) { TX(c, ['給与', '賞与', '給与', '賞与'][i] + ' 振込', 86, 56 + i * 20, '#2c2c34', 16, null); R(c, 196, 62 + i * 20, 40, 1, '#8c8c8c'); }
      return { z: 1.03, fx: 160, fy: 90 };
    }
    wintrySky(c, t, 100); factory(c, t); R(c, 0, 136, W, 104, '#7c7c78');
    for (let i = 0; i < 7; i++) { const st = WORKERS[i % 5], x = 40 + i * 40; blit(c, modFig(st, { f: -1, arm: 'hold', expr: 'smile', k: 'pay' }), x, 160, FIG_AX2, FIG_AY2, { flip: i > 3 }); R(c, x + (i > 3 ? -14 : 8), 128, 8, 5, '#e8dcb8'); }
    bigCap(c, '翌日、全額支給', 40, 24, '#f8d860', sg(t, 1.2, 1.8));
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- SO: dusk on Gakuen-dori; two officers who died from overwork; the man without a name ---- */
const SO = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tCand = at(S, 'L32', 3) - 0.3; S.tMan = ln(S, 'L33') ? at(S, 'L33', 0) - 0.3 : 1e9; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    VG(c, 0, 0, W, 90, ['#1c1830', '#5c3c5c', '#c87c5c', '#e8a868']); glow(c, 60, 78, 80, 20, '#f8b060', 0.4); prisonWall(c, 0, ROAD_Y, { tower: 250 }); roadSide(c, 0, ROAD_Y); c.save(); c.globalAlpha = 0.45; c.fillStyle = '#2c1c34'; c.fillRect(0, 68, W, H); c.restore();
    if (t > S.tCand) for (let i = 0; i < 2; i++) { const k = sg(t, S.tCand + i * 0.8, S.tCand + 0.6 + i * 0.8); if (k > 0) { candle(c, 140 + i * 40, 150, t, i, 1); glow(c, 140 + i * 40, 140, 20, 14, '#f8c060', 0.4 * k); R(c, 133 + i * 40, 152, 14, 3, '#1c2438'); } }
    if (t > S.tMan) { const k = sg(t, S.tMan, S.tMan + 4); c.save(); c.globalAlpha = 1 - k; blit(c, tintSpr(bikeSpr({ rider: true }), '#0c0a10', 'bsil'), 250 + k * 80, CAR_Y + 2, 30, 49); c.restore(); }
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 170, fy: 108 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { const ox = t * 90; roadScene(c, t, ox, { tower: 300 }); blit(c, cedricSpr(), 210, CAR_Y, 50, 35); const bx = lerp(112, 140, ss(sg(t, 0, 4))); trailingSheet(c, bx - 26, CAR_Y - 6, t, -1, 30); blit(c, bikeSpr({ rider: true, lean: true }), bx, CAR_Y + 6, 30, 49);
    for (let i = 0; i < 5; i++) L(c, bx - 40 - i * 10, CAR_Y - 14 + i * 3, bx - 30 - i * 10, CAR_Y - 14 + i * 3, DA('#ffffff', 0.5)); return { z: 1.1, fx: 150, fy: 112 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) {
    VG(c, 0, 0, W, H, ['#06040a', '#1c2440', '#06040a']); for (let i = 0; i < 22; i++) { const a = i / 22 * TAU + t * 0.1, w = 0.05; PF(c, [160, 72, 160 + Math.cos(a - w) * 260, 72 + Math.sin(a - w) * 260, 160 + Math.cos(a + w) * 260, 72 + Math.sin(a + w) * 260], DA('#5c7cc8', 0.16)); }
    bigFace(c, fakeFace({ blink: blinkOf(t, 12), dark: true }), 160, 72, 2, 1, 'ss2'); bigCap(c, '?', 40, 24, '#f8d860');
    return { z: 1, fx: 160, fy: 100 };
  }
};
