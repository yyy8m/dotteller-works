/* ================= 記録 #010 西口彰事件: scenes ================= */
const GY = 150; // feet in front of the house

/* ---- JX: cold open — the "lawyer" at the priest's gate; the girl behind the sliding door ---- */
const JX = withCuts({
  name: '玉名の家', ch: '弁護士を名乗る男', bgm: 'eerie',
  init(S) { S.tGirl = at(S, 'C1', 1) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    showaSky(c, 110, { winter: true }); mountains(c, 80, '#7c8c94', '#6c7c84'); japHouse(c, t, {});
    const k = sg(t, 0.4, 4); person(c, NISHI_COAT, lerp(330, 236, ss(k)), GY, { f: k > 0 && k < 1 ? Math.floor(t * 6) & 3 : -1, flip: true, expr: 'smile', k: 'jx' });
    if (k >= 1) blit(c, badgeSpr(1), 230, GY - 34, 12, 12, { s: 0.35 });
    if (t > S.tGirl) { R(c, 126, 90, 12, 50, '#1c1410'); person(c, GIRL, 132, GY - 6, { expr: 'shock', k: 'peek' }); R(c, 138, 90, 22, 50, '#e8e0cc'); wantedPoster(c, 20, 40, sg(t, S.tGirl + 1.4, S.tGirl + 2.2), { id: 'jx' }); }
    capPlate(c, t, 0.5, ['1964年1月2日', '熊本県 玉名市']);
    return { z: 1.04 + 0.06 * ss(sg(t, S.tGirl, S.dur)), fx: lerp(190, 150, sg(t, S.tGirl, S.dur)), fy: 112 };
  }
}, [['N1', (c, t, S) => closeUp(c, t, nishiFace({ smile: true, blink: blinkOf(t, 5) }), { bg: ['#14141c', '#3c3c4c'], glow: '#f8e0a0' })]]);

/* ---- JA: 1925, Osaka; a Catholic family; four convictions ---- */
const JA = {
  name: '大阪', ch: '前科4犯', bgm: 'memory',
  init(S) { S.tRec = at(S, 'L2', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRec) { R(c, 0, 0, W, H, '#2c2418'); R(c, 80, 30, 160, 120, '#f0e8d4'); R(c, 80, 30, 160, 20, '#3c3c44'); TX(c, '犯歴', 140, 31, '#f4f0e8', 16, null); ['詐欺', '窃盗', '詐欺', '窃盗'].forEach((s, i) => { if (t > S.tRec + 0.4 + i * 0.5) { TX(c, (i + 1) + '．' + s, 100, 58 + i * 20, '#2c2c34', 16, null); } }); stamp(c, t, S.tRec + 2.6, 200, 130, '前科4犯', 96); yearFlash(c, t, S.tRec + 3.4, 1963, 216, 10, '37歳'); return { z: 1.03, fx: 160, fy: 90 }; }
    showaSky(c, 110, {}); for (let i = 0; i < 9; i++) { const x = i * 38, h = 20 + hash(i) * 26; R(c, x, 110 - h, 34, h, ['#8c7c6c', '#a8988c', '#7c6c5c'][i % 3]); for (let k = 0; k < 3; k++) R(c, x + 4 + k * 10, 116 - h, 6, 6, '#3c3428'); }
    R(c, 0, 110, W, 130, '#9c8c74'); R(c, 0, 140, W, 4, '#6c6c6c'); R(c, 0, 150, W, 4, '#6c6c6c'); // tram rails
    R(c, 190, 40, 30, 70, '#e8e0d0'); PF(c, [186, 40, 205, 14, 224, 40], '#5c4c4c'); R(c, 203, 2, 4, 14, '#d8b040'); R(c, 199, 6, 12, 3, '#d8b040'); // a church
    for (let i = 0; i < 3; i++) person(c, { id: 'os' + i, top: 'shirt', coat: ['#5c5c4c', '#4c4c5c', '#6c5c4c'][i], pants: '#3c3c3c', skin: '#e0b090', hair: '#1c1814', hat: i % 2 ? 'fedora' : null }, 60 + i * 80, 168, { f: Math.floor(t * 5 + i) & 3, k: 'os' });
    yearFlash(c, t, 0.4, 1925, 216, 10, '大阪');
    return { z: 1.03, fx: 160, fy: 112 };
  }
};

/* ---- JB: October 18, 1963, Fukuoka — two bodies on mountain roads; wanted nationwide ---- */
function mtRoad(c, t, o = {}) { showaSky(c, 110, o); mountains(c, 110); R(c, 0, 110, W, 130, '#4c6c3c'); PF(c, [120, 240, 150, 110, 176, 110, 220, 240], '#6c6458'); for (let y = 120; y < 240; y += 16) R(c, 160 + (y - 110) * 0.12, y, 2, 8, '#e8e0c8'); for (let i = 0; i < 8; i++) { const x = i < 4 ? 20 + i * 26 : 230 + (i - 4) * 24; L(c, x, 150, x, 100, '#3c2c1c', 3); E(c, x, 96, 12, 18, '#2c4c2c'); } }
const JB = {
  name: '福岡県', ch: '最初の事件', bgm: 'dread',
  init(S) { S.tPass = at(S, 'L3', 3) - 0.3; S.tWanted = at(S, 'L4', 0) - 0.3; S.tNation = at(S, 'L4', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWanted) { japanMap(c, t); const k = sg(t, S.tNation, S.tNation + 2.5); for (let i = 0; i < 40; i++) { const p = JP[i % JP.length]; if (hash(i) < k) E(c, p[0] + (hash(i * 3) - 0.5) * 20, p[1] + (hash(i * 5) - 0.5) * 16, 2, 2, '#f84040'); } wantedPoster(c, 200, 100, sg(t, S.tWanted, S.tWanted + 0.6), { id: 'jb' }); bigCap(c, '全国指名手配', 30, 24, '#f84040', sg(t, S.tNation, S.tNation + 0.6)); return { z: 1.02, fx: 160, fy: 110 }; }
    if (t > S.tPass) { mtRoad(c, t, { dusk: true }); R(c, 236, 100, 4, 50, '#5c5c5c'); R(c, 224, 86, 28, 16, '#f4f0e8'); TX(c, '峠', 230, 86, '#2c2c34', 16, null); for (let i = 0; i < 3; i++) person(c, COPS[i], 120 + i * 28, 176, { k: 'ps' }); E(c, 170, 196, 24, 6, '#e8e4dc'); capPlate(c, t - S.tPass, 0.3, ['仲哀峠']); return { z: 1.04, fx: 160, fy: 130 }; }
    mtRoad(c, t, {}); for (let i = 0; i < 2; i++) person(c, COPS[i], 140 + i * 40, 176, { k: 'rd', flip: i === 1 }); E(c, 168, 200, 24, 6, '#e8e4dc');
    yearFlash(c, t, 0.4, 1963, 216, 10, '10月18日'); capPlate(c, t, 0.7, ['福岡県', '苅田町の山道']);
    return { z: 1.04, fx: 160, fy: 130 };
  }
};

/* ---- JH2: the horror close-up ---- */
const JZ = { name: '素顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, nishiFace({ dark: true, smile: true, blink: 0 }), [[19, 19], [29, 19]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- JC: the faked suicide on the ferry; the run east ---- */
function ferryDeck(c, t) { showaSky(c, 90, { winter: true }); R(c, 0, 90, W, 50, '#3c5c7c'); for (let i = 0; i < 14; i++) R(c, mod(i * 31 - t * 12, W), 96 + (i % 4) * 9, 14, 1, '#8cb0d0'); for (let i = 0; i < 4; i++) { const x = mod(i * 110 + t * 3, W + 100) - 50; PF(c, [x, 90, x + 30, 70, x + 70, 90], '#5c7c8c'); }
  R(c, 0, 140, W, 100, '#a89c84'); for (let x = 0; x < W; x += 16) R(c, x, 140, 1, 100, '#988c74'); R(c, 0, 128, W, 4, '#e8e4dc'); for (let x = 10; x < W; x += 30) R(c, x, 128, 3, 16, '#e8e4dc'); R(c, 0, 138, W, 3, '#e8e4dc'); }
const JC = {
  name: '瀬戸内海', ch: '身投げの偽装', bgm: 'eerie',
  init(S) { S.tShoes = at(S, 'L5', 2) - 0.3; S.tRun = at(S, 'L6', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRun) { japanMap(c, t); const r = ['saga', 'kobe', 'osaka', 'kyoto', 'nagoya'], labs = [null, '神戸', '大阪', '京都', '名古屋'], off = [[0, 0], [-34, 4], [-4, 6], [-20, -22], [-10, -22]]; const u = sg(t, S.tRun, S.dur - 1) * (r.length - 1);
      for (let i = 0; i < r.length - 1; i++) { const [x0, y0] = PLACE[r[i]], [x1, y1] = PLACE[r[i + 1]], k = clamp(u - i, 0, 1); if (k > 0) L(c, x0, y0, lerp(x0, x1, k), lerp(y0, y1, k), '#f84040', 2); }
      r.forEach((k, i) => { if (u >= i - 0.05) pin(c, k, labs[i], '#f8d860', off[i][0], off[i][1]); }); stamp(c, t, S.tRun + 0.3, 260, 40, '偽装', 70); return { z: 1.03, fx: 140, fy: 150 }; }
    ferryDeck(c, t); if (t > S.tShoes) { R(c, 140, 158, 14, 6, '#2c1c14'); R(c, 156, 158, 14, 6, '#2c1c14'); R(c, 180, 160, 20, 14, '#f4f0e4'); for (let i = 0; i < 3; i++) R(c, 183, 163 + i * 3, 14, 1, '#5c5c5c'); glow(c, 170, 162, 40, 12, '#ffffff', 0.2); }
    else person(c, NISHI_COAT, 160, 164, { k: 'fr', expr: 'normal' });
    capPlate(c, t, 0.5, ['瀬戸内海', '連絡船']);
    return { z: 1.04 + 0.06 * ss(sg(t, S.tShoes, S.tRun)), fx: 170, fy: 140 };
  }
};

/* ---- JD: November, Hamamatsu — the inn ---- */
const JD = {
  name: '浜松', bgm: 'dread',
  init(S) { S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    showaSky(c, 110, { night: true }); moon(c, 60, skyY(30), 10, t); R(c, 0, 110, W, 130, '#1c1c20');
    R(c, 70, 50, 180, 90, '#5c4c3c'); for (let x = 70; x < 250; x += 18) R(c, x, 50, 2, 90, '#3c2c20'); PF(c, [56, 54, 160, 22, 264, 54], '#2c2c34'); R(c, 120, 30, 80, 18, '#e8e0cc'); TX(c, '旅館', 144, 31, '#2c2c34', 16, null);
    for (let i = 0; i < 4; i++) R(c, 86 + i * 42, 74, 26, 30, '#1c1814'); R(c, 146, 110, 28, 30, '#2c2018');
    const k = sg(t, 2, 4); for (let i = 0; i < 2; i++) { candle(c, 150 + i * 20, 152, t, i, k); glow(c, 150 + i * 20, 146, 12, 8, '#f8c060', 0.3 * k); }
    yearFlash(c, t, 0.4, 1963, 216, 10, '11月'); capPlate(c, t, 0.7, ['静岡県', '浜松市']);
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- JE: the fake lawyer; swindles across Japan; December 29, Tokyo ---- */
const JE = {
  name: '偽の弁護士', ch: '偽の弁護士', bgm: 'pulse',
  init(S) { S.tMap = at(S, 'L9', 0) - 0.3; S.tTokyo = at(S, 'L10', 0) - 0.3; S.tFive = at(S, 'L10', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTokyo) { showaSky(c, 110, { night: true }); for (let i = 0; i < 10; i++) { const x = i * 34, h = 30 + hash(i) * 50; R(c, x, 110 - h, 30, h, '#1c2030'); for (let k = 0; k < 8; k++) if (hash(i * 9 + k) > 0.5) R(c, x + 4 + (k % 3) * 8, 114 - h + Math.floor(k / 3) * 12, 4, 6, '#f8e0a0'); }
      R(c, 0, 110, W, 130, '#2c2c34'); for (let i = 0; i < 4; i++) { R(c, 30 + i * 80, 70, 2, 44, '#3c3c44'); glow(c, 31 + i * 80, 72, 14, 10, '#f8f0c0', 0.4); }
      if (t > S.tFive) { const n = sg(t, S.tFive, S.tFive + 2.5) * 5; for (let i = 0; i < 5; i++) { const k = clamp(n - i, 0, 1); if (k > 0) { candle(c, 120 + i * 20, 160, t, i, k); glow(c, 120 + i * 20, 154, 10, 8, '#f8c060', 0.3 * k); } } }
      yearFlash(c, t, S.tTokyo + 0.2, 1963, 216, 10, '12月29日'); capPlate(c, t - S.tTokyo, 0.4, ['東京都', '豊島区']); return { z: 1.03, fx: 160, fy: 112 }; }
    if (t > S.tMap) { japanMap(c, t); const r = ['chiba', 'hokkaido', 'tokyo', 'tochigi'], labs = ['千葉', '北海道', '東京', '栃木'], off = [[8, 0], [-60, 0], [-40, 0], [-40, -18]]; r.forEach((k, i) => { if (t > S.tMap + 0.4 + i * 0.6) pin(c, k, labs[i], '#f8d860', off[i][0], off[i][1]); });
      const yen = Math.round(sg(t, S.tMap + 3, S.tMap + 6) * 80); R(c, 20, 20, 120, 30, '#000000'); TX(c, '詐取 ' + yen + '万円', 28, 26, '#f8d860', 16, null); return { z: 1.02, fx: 160, fy: 110 }; }
    // the badge, gleaming on a lapel
    R(c, 0, 0, W, H, '#1c1c24'); R(c, 0, 0, W, H, '#24242c'); PF(c, [80, 0, 200, 0, 240, 240, 40, 240], '#2c2c34'); PF(c, [140, 0, 160, 0, 170, 240, 130, 240], '#f0ece4'); L(c, 150, 30, 150, 240, '#5c2c2c', 6);
    blit(c, badgeSpr(1), 110, 110, 12, 12, { s: 2.6 }); const g = 0.5 + 0.5 * Math.sin(t * 4); glow(c, 110, 110, 40, 40, '#f8e8a0', 0.3 * g); star4(c, 96, 96, 4 * g, '#ffffff', '#f8e8a0');
    bigCap(c, '弁護士', 160, 24, '#f8d860', sg(t, 1.6, 2.2));
    return { z: 1.04, fx: 130, fy: 110 };
  }
};

/* ---- JF: January 2, 1964 — the priest's house; the badge, the false name; the girl knows ---- */
const JF = withCuts({
  name: '古川泰龍の家', ch: '少女の目', bgm: 'eerie',
  init(S) { S.tMeet = at(S, 'L12', 0) - 0.3; S.tGirl = at(S, 'L13', 0) - 0.3; S.tPhoto = at(S, 'L13', 2) - 0.3; S.tClass = at(S, 'L14', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tClass) { // a school roll: two similar names side by side (names are not given in the record — shown as marks)
      R(c, 0, 0, W, H, '#a8b4a0'); R(c, 40, 30, 240, 80, '#2c4c3c'); R(c, 36, 26, 248, 4, '#8c6c44'); TX(c, '５年', 60, 40, '#e8ece0', 16, null);
      R(c, 70, 120, 180, 80, '#f0e8d4'); for (let i = 0; i < 4; i++) R(c, 80, 132 + i * 16, 160, 1, '#a8a090'); R(c, 84, 148, 70, 12, '#f8e870'); TX(c, '同級生', 90, 146, '#2c2c34', 16, null); R(c, 160, 148, 70, 12, '#f8e870'); TX(c, '西口', 176, 146, '#2c2c34', 16, null); TX(c, '≒', 152, 146, '#c81818', 16, null);
      bigCap(c, '似た名前', 60, 24, '#f8d860', sg(t, S.tClass + 1.2, S.tClass + 1.8));
      return { z: 1.03, fx: 160, fy: 120 };
    }
    if (t > S.tGirl) { // the girl's memory: the wanted photo beside the visitor's face
      R(c, 0, 0, W, H, '#14141c'); const k = sg(t, S.tPhoto, S.tPhoto + 1.2);
      wantedPoster(c, 40, 30, 1, { id: 'jf' }); R(c, 190, 46, 90, 90, '#2c2c34'); bigFace(c, nishiFace({ smile: true, blink: blinkOf(t, 3) }), 235, 91, 1.6, 'jfv');
      if (k > 0) { c.save(); c.globalAlpha = k; L(c, 130, 90, 190, 90, '#f84040', 3); bigCap(c, '＝', 76, 24, '#f84040'); c.restore(); }
      bigFace(c, girlFace({ wide: t > S.tPhoto, blink: blinkOf(t, 7) }), 160, 190, 1.4, 'jfg');
      return { z: 1.02, fx: 160, fy: 110 };
    }
    showaSky(c, 110, { winter: true }); mountains(c, 80, '#7c8c94', '#6c7c84'); japHouse(c, t, {});
    if (t > S.tMeet) { person(c, NISHI, 200, GY, { flip: true, expr: 'smile', arm: 'fwd', k: 'meet' }); blit(c, badgeSpr(1), 194, GY - 34, 12, 12, { s: 0.35 }); person(c, MONK, 150, GY, { k: 'meet' }); person(c, GIRL, 120, GY, { k: 'meet', blink: blinkOf(t, 4) }); }
    else { person(c, MONK, 150, GY, { k: 'monk' }); capPlate(c, t, 0.4, ['教誨師・僧侶', '古川泰龍の家']); }
    return { z: 1.04, fx: 160, fy: 116 };
  }
}, [['G1', (c, t, S) => closeUp(c, t, girlFace({ wide: true, blink: blinkOf(t, 7) }), { bg: ['#1c1018', '#5c3c4c'], lines: '#f8c8c8' })]]);

/* ---- JG: the conversation unravels; the family calls the police ---- */
const JG = {
  name: '座敷', bgm: 'pulse',
  init(S) { S.tQ1 = at(S, 'L15', 1) - 0.3; S.tQ2 = at(S, 'L15', 2) - 0.3; S.tCall = at(S, 'L16', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCall) { R(c, 0, 0, W, H, '#3c2c20'); R(c, 0, 150, W, 90, '#5c4c34'); R(c, 120, 110, 80, 40, '#4c3424'); R(c, 140, 96, 40, 16, '#141414'); E(c, 160, 104, 8, 4, '#2c2c2c'); R(c, 132, 92, 56, 6, '#141414'); person(c, MOTHER, 100, 150, { arm: 'fwd', k: 'call', expr: 'shock' }); const r = Math.floor(t * 4) & 1; if (r) for (let i = 0; i < 3; i++) ER(c, 160, 96, 18 + i * 8, 10 + i * 4, '#f8e8a0', -2.6, -0.5); return { z: 1.04, fx: 140, fy: 110 }; }
    R(c, 0, 0, W, H, '#c8b894'); for (let x = 0; x < W; x += 40) R(c, x, 0, 2, 150, '#8c7c5c'); R(c, 0, 150, W, 90, '#a8a070'); for (let x = 0; x < W; x += 60) { R(c, x, 150, 1, 90, '#7c7c50'); } R(c, 0, 194, W, 1, '#7c7c50'); // tatami room
    R(c, 120, 140, 80, 14, '#5c3c24'); E(c, 140, 138, 6, 3, '#e8e4dc'); E(c, 180, 138, 6, 3, '#e8e4dc');
    person(c, NISHI, 220, 168, { flip: true, expr: t > S.tQ1 ? 'shock' : 'smile', k: 'zs' }); person(c, MONK, 100, 168, { k: 'zs', arm: 'point' });
    if (t > S.tQ1) { R(c, 30, 40, 130, 40, '#f4f0e8'); TX(c, '弁護士会は？', 40, 50, '#2c2c34', 16, null); }
    if (t > S.tQ2) { R(c, 30, 88, 150, 40, '#f4f0e8'); TX(c, '東大の教授は？', 40, 98, '#2c2c34', 16, null); bigCap(c, '？', 20, 24, '#f84040', sg(t, S.tQ2 + 1.6, S.tQ2 + 2.2)); }
    return { z: 1.04, fx: 160, fy: 120 };
  }
};

/* ---- JH: January 3, Tamana hot spring — the arrest; the official's words ---- */
const JH = withCuts({
  name: '玉名温泉', ch: '逮捕', bgm: 'pulse',
  init(S) { S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    showaSky(c, 110, { winter: true }); mountains(c, 90, '#7c8c94', '#6c7c84'); for (let i = 0; i < 4; i++) { const x = 20 + i * 80; R(c, x, 70, 60, 50, '#8c7c6c'); PF(c, [x - 6, 72, x + 30, 52, x + 66, 72], '#3c3c44'); R(c, x + 20, 96, 20, 24, '#4c3c2c'); }
    for (let i = 0; i < 10; i++) { const u = fr(t * 0.3 + i / 10); E(c, 30 + i * 30 + Math.sin(t + i) * 6, 120 - u * 70, 8 + u * 14, 5 + u * 8, DA('#f4f4f0', 0.4 * (1 - u))); } // steam
    R(c, 0, 120, W, 120, '#9c9488');
    person(c, NISHI_COAT, 170, 160, { expr: 'shock', k: 'arr' }); person(c, DETECT[0], 140, 162, { arm: 'fwd', k: 'arr' }); person(c, DETECT[1], 198, 162, { flip: true, arm: 'fwd', k: 'arr' }); person(c, COPS[0], 230, 164, { flip: true, k: 'arr' });
    yearFlash(c, t, 0.4, 1964, 216, 10, '1月3日'); capPlate(c, t, 0.7, ['熊本県', '玉名温泉']);
    return { z: 1.05, fx: 170, fy: 118 };
  }
}, [['K1', (c, t, S) => closeUp(c, t, officerFace({ blink: blinkOf(t, 8) }), { bg: ['#0c1428', '#2c3c5c'], glow: '#a8c8f8' })]]);

/* ---- JI: the trial — "the black gold medal champion"; "the devil's child"; executed 1970 ---- */
const JI = {
  name: '裁判', ch: '悪魔の申し子', bgm: 'requiem',
  init(S) { S.tMedal = at(S, 'L19', 5) - 0.3; S.tDevil = at(S, 'L20', 0) - 0.3; S.tDeath = at(S, 'L20', 2) - 0.3; S.tExec = at(S, 'L21', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tExec) { R(c, 0, 0, W, H, '#14141c'); R(c, 60, 40, 200, 110, '#3c3c44'); for (let i = 0; i < 10; i++) R(c, 70 + i * 20, 40, 4, 110, '#5c5c64'); glow(c, 160, 40, 60, 20, '#f8f4d8', 0.2); yearFlash(c, t, S.tExec + 0.2, 1970, 216, 10, '12月11日'); capPlate(c, t - S.tExec, 0.4, ['福岡拘置所']); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tDevil) { R(c, 0, 0, W, H, '#1c1410'); R(c, 80, 30, 160, 120, '#f0e8d4'); R(c, 80, 30, 160, 20, '#2c2c34'); TX(c, '判決', 144, 31, '#f4f0e8', 16, null); for (let i = 0; i < 5; i++) R(c, 92, 60 + i * 14, 136, 2, '#8c8474'); R(c, 92, 116, 120, 18, '#f8e870'); TX(c, '悪魔の申し子', 100, 116, '#c81818', 16, null); if (t > S.tDeath) stamp(c, t, S.tDeath + 0.3, 220, 60, '死刑', 70); return { z: 1.04, fx: 160, fy: 90 }; }
    // the counts, then a black medal
    R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#56402c'); R(c, 0, 150, W, 90, '#3c2c20');
    if (t < S.tMedal) { ['殺人 5件', '詐欺 10件', '窃盗 2件'].forEach((s, i) => { if (t > 0.6 + i * 1.0) bigCap(c, s, 66 + i * 30, 24, '#f4f0e8'); }); person(c, NISHI, 160, 190, { k: 'crt', s: 1.2 }); return { z: 1.03, fx: 160, fy: 100 }; }
    const k = eOut(sg(t, S.tMedal, S.tMedal + 0.6)); L(c, 160, 0, 140, lerp(-40, 60, k), '#5c1c1c', 4); L(c, 160, 0, 180, lerp(-40, 60, k), '#5c1c1c', 4); E(c, 160, lerp(-20, 90, k), 34, 34, '#141414'); E(c, 160, lerp(-20, 90, k), 28, 28, '#2c2c2c'); ER(c, 160, lerp(-20, 90, k), 30, 30, '#5c5c5c'); TX(c, '1', 155, lerp(-30, 80, k), '#5c5c5c', 16, null);
    bigCap(c, '黒い金メダル', 140, 24, '#f8d860', sg(t, S.tMedal + 0.8, S.tMedal + 1.4));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- JJ: afterwards — the nationwide system; the novel; five lives; the girl's eyes ---- */
const JJ = {
  name: 'その後', ch: '結び', bgm: 'requiem',
  init(S) { S.tBook = at(S, 'L23', 0) - 0.3; S.tCand = at(S, 'L24', 0) - 0.3; S.tGirl = at(S, 'L25', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tGirl) { showaSky(c, 110, { dusk: true }); mountains(c, 90, '#5c4c5c', '#4c3c4c'); japHouse(c, t, { lit: true }); dim(c, 0.3, '#1c0c1c'); person(c, GIRL, 150, GY, { k: 'end', blink: blinkOf(t, 4) }); for (let i = 0; i < 5; i++) { candle(c, 120 + i * 16, 180, t, i, 1); glow(c, 120 + i * 16, 174, 10, 8, '#f8c060', 0.3); } return { z: 1 + 0.06 * ss(sg(t, S.tGirl, S.tEnd + 2)), fx: 155, fy: 120 }; }
    if (t > S.tCand) { R(c, 0, 0, W, H, '#0c0a10'); const n = sg(t, S.tCand, S.tCand + 3) * 5; for (let i = 0; i < 5; i++) { const k = clamp(n - i, 0, 1); if (k > 0) { candle(c, 110 + i * 25, 130, t, i, k); glow(c, 110 + i * 25, 124, 14, 10, '#f8c060', 0.35 * k); } } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tBook) { R(c, 0, 0, W, H, '#241c14'); glow(c, 160, 100, 120, 70, '#f8d080', 0.25); R(c, 110, 30, 100, 130, '#6c1c1c'); R(c, 114, 34, 92, 122, '#8c2c2c'); TX(c, '小説', 144, 60, '#f4e8c8', 16, null); R(c, 120, 90, 80, 2, '#d8b040'); for (let i = 0; i < 6; i++) { R(c, 230, 40 + i * 20, 40, 14, '#2c2c2c'); R(c, 236, 44 + i * 20, 6, 6, '#c8c8c0'); } return { z: 1.03, fx: 160, fy: 100 }; }
    japanMap(c, t); const pts = Object.values(PLACE); const k = sg(t, 0.4, 3.4); for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) if (hash(i * 13 + j) < 0.3 * k) L(c, pts[i][0], pts[i][1], pts[j][0], pts[j][1], '#5c8cf8'); pts.forEach(p => E(c, p[0], p[1], 2.5, 2.5, '#f8d860'));
    bigCap(c, '広域重要指定事件', 20, 16, '#8cb4f8', sg(t, 2, 2.6));
    return { z: 1.02, fx: 160, fy: 110 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { showaSky(c, 110, { winter: true }); mountains(c, 80, '#7c8c94', '#6c7c84'); japHouse(c, t, {}); person(c, NISHI, 200, GY, { flip: true, expr: 'smile', k: 'ss1' }); blit(c, badgeSpr(1), 194, GY - 34, 12, 12, { s: 0.35 }); const g = 0.5 + 0.5 * Math.sin(t * 5); star4(c, 191, GY - 37, 3 * g, '#ffffff', '#f8e8a0'); person(c, GIRL, 120, GY, { k: 'ss1', expr: t > 3 ? 'shock' : 'normal' }); return { z: 1.12, fx: 170, fy: 118 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { showaSky(c, 110, { night: true }); japHouse(c, t, { lit: true, pine: false }); dim(c, 0.3, '#06060c'); blit(c, tintSpr(modFig(NISHI_COAT, { f: -1, k: 'ss2' }), '#0c0c14', 'ss2s'), 200, GY, FIG_AX2, FIG_AY2, { flip: true, s: 1.1 }); const k = Math.floor(t * 2) % 2; if (k) for (let i = 0; i < 2; i++) ER(c, 186, GY - 30, 8 + i * 6, 6 + i * 4, '#f8e8a0', 2.4, 3.8); return { z: 1.06, fx: 170, fy: 116 }; }
};
