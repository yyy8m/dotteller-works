/* ================= 記録 #018 グリコ・森永事件: scenes ================= */
const GY = 158;
const KAICLOSE = (c, t) => closeUp(c, t, kaiFace({ blink: blinkOf(t, 4) }), { bg: ['#06060a', '#2c1c24'], glow: '#c81818' });

/* ---- GZ: cold open — a convenience-store shelf, one box with a paper slip, the name (moves: a shopper walks, the camera pushes in) ---- */
const GZ = withCuts({
  name: 'どくいり きけん', ch: '1984年10月', bgm: 'eerie',
  init(S) { S.tBox = at(S, 'C1', 0) - 0.3; S.tName = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#06060a'); glow(c, 160, 90, 120, 70, '#3c1c24', 0.5); const k = sg(t, S.tName + 0.3, S.tName + 2); c.save(); c.globalAlpha = k; blit(c, tintSpr(modFig(KAI, { k: 'gz' }), '#141418', 'gzk'), 160, 168, FIG_AX2, FIG_AY2, { s: 2 }); c.restore(); bigCap(c, 'かい人21面相', 64, 32, '#e81c1c', sg(t, at(S, 'C2', 1) - 0.2, at(S, 'C2', 1) + 0.4)); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tBox) { R(c, 0, 0, W, H, '#d8d4c8'); R(c, 60, 140, 200, 6, '#8c8c94'); c.save(); c.translate(160, 140); c.scale(4, 4); sweetBox(c, -7, 0, '#e8b83c', { label: true }); c.restore(); if (t > at(S, 'C1', 1) - 0.2) plate(c, 104, 40, 'どくいり きけん', '#c81818', '#f8f8f0'); if (t > at(S, 'C1', 4) - 0.3) plate(c, 200, 100, '13個', '#f8e8b0'); return { z: 1.02 + 0.04 * ss(sg(t, S.tBox, S.tName)), fx: 160, fy: 110 }; }
    shelf(c, t, { labels: [24] }); const u = sg(t, at(S, 'C0', 2) - 0.3, S.tBox); person(c, CROWD[1], lerp(-10, 200, u), 166, { k: 'gz', f: u < 1 ? Math.floor(t * 4) & 3 : -1 });
    yearFlash(c, t, at(S, 'C0', 0), 1984, 216, 10, '10月'); capPlate(c, t, at(S, 'C0', 1), ['大阪・兵庫・京都・愛知'], 44);
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tBox)), fx: 120, fy: 110 };
  }
}, [['M1', KAICLOSE]]);

/* ---- GA: the kidnapping — the two houses at night, the back door, the bathroom, the car (moves: shadows creep, steam, the car leaves) ---- */
const GA = {
  name: '社長誘拐', ch: '社長誘拐', bgm: 'dread',
  init(S) { S.tIn = at(S, 'L2', 0) - 0.3; S.tPres = at(S, 'L3', 0) - 0.3; S.tBath = at(S, 'L4', 0) - 0.3; S.tCar = at(S, 'L4', 3) - 0.3; S.t110 = at(S, 'L4b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.t110) { R(c, 0, 0, W, H, '#3c3830'); R(c, 0, 140, W, 40, '#5c5444'); R(c, 120, 100, 80, 40, '#6c5c44'); const r = t < at(S, 'L4b', 2); phone(c, 140, 100, r ? 0 : 0); person(c, WIFE, 190, 160, { k: 'tl', arm: 'hold', expr: 'shock' }); if (t > at(S, 'L4b', 2) - 0.3) plate(c, 60, 50, '110番通報', '#f8e8b0'); return { z: 1.04, fx: 170, fy: 110 }; }
    if (t > S.tCar) { houseExt(c, t, { night: true }); const u = sg(t, S.tCar + 0.4, S.t110); car(c, lerp(150, 380, u * u), 160, '#3c3c44', { lights: true }); for (let i = 0; i < 2; i++) if (u < 0.05) shadow(c, KAI, 110 + i * 16, 160, { k: 'cr' + i }); return { z: 1.03, fx: 180, fy: 120 }; }
    if (t > S.tBath) { R(c, 0, 0, W, H, '#8cacb8'); for (let y = 0; y < 150; y += 10) for (let x = (y / 10) % 2 ? 0 : 10; x < W; x += 20) R(c, x, y, 19, 9, '#a8c4cc'); R(c, 20, 110, 160, 50, '#e8ecf0'); R(c, 26, 116, 148, 36, '#9cc8e0'); for (let i = 0; i < 8; i++) { const u = fr(t * 0.3 + i / 8); c.save(); c.globalAlpha = 0.3 * (1 - u); E(c, 40 + i * 18, 110 - u * 70, 10 + u * 10, 6 + u * 6, '#ffffff'); c.restore(); } shadow(c, KAI, 230, 160, { k: 'ba', arm: 'fwd', weapon: 'flash', flip: true }); shadow(c, KAI, 270, 160, { k: 'ba2', flip: true }); E(c, 100, 112, 8, 8, '#e8c4a0'); R(c, 92, 104, 16, 4, '#2c2420'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tPres) { R(c, 0, 0, W, H, '#5c5040'); R(c, 0, 140, W, 40, '#7c6c54'); R(c, 200, 50, 60, 90, '#a89880'); R(c, 204, 54, 52, 86, '#c8b898'); E(c, 250, 96, 3, 3, '#8c7c5c'); plate(c, 210, 36, 'トイレ', '#2c2c2c', '#f4f0e8'); shadow(c, KAI, 130, 160, { k: 'pr', arm: 'point', weapon: 'flash' }); if (t < at(S, 'L3', 2)) { person(c, WIFE, 180, 160, { k: 'pr', expr: 'shock' }); } return { z: 1.03, fx: 180, fy: 110 }; }
    if (t > S.tIn) { houseExt(c, t, { night: true }); R(c, 70, 120, 14, 30, t > at(S, 'L2', 1) ? '#141414' : '#5c4c3c'); for (let i = 0; i < 2; i++) shadow(c, KAI, 40 + i * 18 + sg(t, S.tIn, at(S, 'L2', 1)) * 30, 156, { k: 'in' + i, f: Math.floor(t * 4 + i) & 3, arm: 'fwd' }); if (t > at(S, 'L2', 3) - 0.3) { R(c, 200, 40, 30, 14, '#000000'); R(c, 206, 44, 14, 4, '#c8b060'); E(c, 204, 46, 4, 4, '#c8b060'); plate(c, 236, 40, '合鍵', '#f8e8b0'); } return { z: 1.04, fx: 120, fy: 120 }; }
    houseExt(c, t, { night: true }); yearFlash(c, t, 0.3, 1984, 216, 10, '3月18日'); capPlate(c, t, at(S, 'L1', 2), ['兵庫県 西宮市', '社長の母の家'], 44);
    return { z: 1.03 + 0.03 * ss(sg(t, 0, S.tIn)), fx: 120, fy: 110 };
  }
};

/* ---- GB: the ransom — a ringing phone, the note, a tower of money, "金はいらん" (moves: the stack grows, gold drops) ---- */
const GB = withCuts({
  name: '10億円と金塊', ch: '身代金', bgm: 'pulse',
  init(S) { S.tMoney = at(S, 'L6', 0) - 0.3; S.tOdd = at(S, 'L7', 0) - 0.3; S.tWhy = at(S, 'L7b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWhy) { R(c, 0, 0, W, H, '#1c1c24'); glow(c, 160, 90, 140, 70, '#3c3c5c', 0.4); person(c, { id: 'kd', kid: true, top: 'dress', coat: '#e8a8b8', skin: '#f0c8a8', hair: '#2c2018', hairStyle: 'long' }, 90, 150, { k: 'why' }); person(c, PRES, 230, 150, { k: 'why' }); if (t > at(S, 'L7b', 2) - 0.3) { dim(c, 0); c.save(); c.globalAlpha = 0.6; R(c, 60, 80, 60, 80, '#1c1c24'); c.restore(); ER(c, 230, 100, 30, 40, '#f8e070'); } if (t > at(S, 'L7b', 4) - 0.3) plate(c, 110, 40, 'お金ではなく、恨み？', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tOdd) { R(c, 0, 0, W, H, '#3c3830'); R(c, 0, 140, W, 40, '#5c5444'); person(c, MOM, 120, 156, { k: 'od', arm: 'fwd' }); person(c, WIFE, 150, 158, { k: 'od' }); shadow(c, KAI, 240, 156, { k: 'od', flip: true }); plate(c, 60, 50, 'お金なら出します', '#f8e8b0'); return { z: 1.03, fx: 170, fy: 110 }; }
    if (t > S.tMoney) { R(c, 0, 0, W, H, '#2c2418'); glow(c, 160, 90, 160, 80, '#f8e0a0', 0.18); const n = Math.floor(sg(t, S.tMoney, at(S, 'L6', 1)) * 30); money(c, 90, 160, n); person(c, CROWD[5], 70, 160, { k: 'mn' }); L(c, 120, 160, 120, 160 - n * 4, '#f8e8b0'); if (n > 3) TX(c, '9.5m', 126, 160 - n * 4, '#f8e8b0', 16, '#000000'); for (let i = 0; i < 6; i++) goldBar(c, 190 + (i % 3) * 24, 160 - Math.floor(i / 3) * 7); if (t > at(S, 'L6', 1) - 0.3) plate(c, 200, 70, '130キロ', '#f8e8b0'); if (t > at(S, 'L6', 3) - 0.3) stamp(c, t, at(S, 'L6', 3), 240, 120, '現れず', 80); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#1c1c24'); glow(c, 120, 100, 80, 60, '#f8e0a0', 0.15); R(c, 60, 120, 120, 20, '#5c4430'); phone(c, 100, 120, t < at(S, 'L5', 1) ? t : 0); if (t > at(S, 'L5', 2) - 0.3) showLetter(c, t, at(S, 'L5', 2) - 0.3, 'rn', ['現金 10億円', '金塊 100キロ'], 170, 50, { col: '#2c2c3c' });
    capPlate(c, t, at(S, 'L5', 0), ['午前1時ごろ', '取締役の家'], 44);
    return { z: 1.03, fx: 160, fy: 100 };
  }
}, [['V1', KAICLOSE]]);

/* ---- GC: the escape — the flood-control shed by the river, he runs to the freight yard (moves: water flows, the door opens, the run) ---- */
const GC = {
  name: '水防倉庫', ch: '脱出', bgm: 'climb',
  init(S) { S.tRun = at(S, 'L8', 3) - 0.3; S.tEnd = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tEnd) { R(c, 0, 0, W, H, '#0c0c10'); const k = sg(t, S.tEnd + 0.3, S.tEnd + 1.6); c.save(); c.globalAlpha = k * 0.8; blit(c, kaiFace({}), 160, 90, 24, 24, { s: 2.4 }); c.restore(); return { z: 1.02 + 0.04 * k, fx: 160, fy: 90 }; }
    citySky(c, {}); R(c, 0, 100, W, 30, '#7c8c6c'); R(c, 0, 128, W, 22, '#4c7c9c'); for (let i = 0; i < 10; i++) R(c, mod(i * 40 + t * 20, W), 134 + (i % 3) * 5, 10, 1, '#8cbcd8'); R(c, 0, 150, W, 40, '#8c8c6c');
    R(c, 30, 100, 70, 50, '#8c7c6c'); PF(c, [24, 102, 65, 84, 106, 102], '#5c4c44'); R(c, 56, 120, 18, 30, t > at(S, 'L8', 1) ? '#141414' : '#5c4c3c');
    for (let i = 0; i < 4; i++) R(c, 220 + i * 26, 70, 22, 30, ['#c85c3c', '#3c6c9c', '#c8a03c', '#5c8c5c'][i]); R(c, 210, 100, 110, 3, '#5c5c5c');
    const u = sg(t, at(S, 'L8', 1), S.tEnd - 0.3); person(c, { ...PRES, id: 'pr2', top: 'jacket', coat: '#7c6c5c', shirt: '#e8e4dc' }, lerp(66, 270, u), 160, { k: 'es', f: u > 0 && u < 1 ? Math.floor(t * 6) & 3 : -1, expr: 'shock' });
    if (t > S.tRun) { for (let i = 0; i < 2; i++) person(c, { id: 'wk' + i, top: 'uniform', coat: '#5c6c8c', pants: '#4c5c7c', skin: '#e0b090', hair: '#141414', hat: 'cap', hatCol: '#e8e8e0' }, 290 + i * 18, 160, { k: 'wk', flip: true, arm: 'wave' }); }
    capPlate(c, t, at(S, 'L8', 0), ['3月21日', '大阪府 茨木市'], 44);
    return { z: 1.03, fx: 160, fy: 120 };
  }
};

/* ---- GD: letters, the fire, a name (moves: flames, a man runs, letters land) ---- */
const GD = {
  name: '挑戦状と放火', ch: '挑戦状', bgm: 'dread',
  init(S) { S.tFire = at(S, 'L11', 0) - 0.3; S.tVan = at(S, 'L11b', 0) - 0.3; S.tName = at(S, 'L12', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#140e0a'); glow(c, 160, 90, 140, 70, '#c8a060', 0.15); const sw = t > at(S, 'L12', 2) - 0.3; plate(c, 92, 50, '怪人二十面相', sw ? '#8c8c8c' : '#f8e8b0'); if (sw) { L(c, 88, 60, 200, 60, '#c81818', 2); bigCap(c, 'かい人21面相', 96, 32, '#e81c1c'); } return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tFire) { citySky(c, { night: true }); skyline(c, 150, { night: true }); R(c, 0, 150, W, 40, '#2c2c34'); const vanTime = t > S.tVan; if (!vanTime) { R(c, 80, 70, 160, 80, '#5c5c64'); for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) R(c, 90 + k * 25, 80 + r * 22, 16, 12, r === 2 && k < 3 ? '#f8a03c' : '#1c1c24'); fireHouse(c, 90, 150, 70, 30, t, 1); if (t > at(S, 'L11', 1) - 0.3) { const u = sg(t, at(S, 'L11', 1), at(S, 'L11', 3) + 1); shadow(c, { ...KAI, id: 'cap', hat: 'cap' }, lerp(180, 330, u), 160, { k: 'rn', f: Math.floor(t * 6) & 3, arm: 'hold' }); } capPlate(c, t, S.tFire + 0.2, ['4月10日 夜', 'グリコ本社'], 44); return { z: 1.03, fx: 160, fy: 110 }; }
      van(c, 160, 160); for (let i = 0; i < 8; i++) { const u = fr(t * 1.4 + i / 8); E(c, 140 + i * 6, 134 - u * 30, 4 + 3 * (1 - u), 6 * (1 - u), i % 2 ? '#f8c03c' : '#e8603c'); } plate(c, 30, 50, '3キロ先でも', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 120 }; }
    R(c, 0, 0, W, H, '#2c2418'); R(c, 0, 130, W, 50, '#5c4430'); showLetter(c, t, 0.3, 'th1', ['けいさつの あほども え', '……'], 20, 34); R(c, 40, 100, 8, 24, '#e8e8f0'); R(c, 41, 94, 6, 6, '#c81818'); plate(c, 60, 108, '塩酸入りの目薬', '#f8e8b0');
    if (t > at(S, 'L10', 3) - 0.3) spinPaper(c, paperSpr('gn1', '挑戦状', '新聞社へ', '1984年4月'), 240, 96, sg(t, at(S, 'L10', 3) - 0.3, at(S, 'L10', 3) + 0.5));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- GE: the poison threat and empty shelves (moves: boxes vanish, a clerk carries them off) ---- */
const GE = {
  name: '青酸ソーダ', ch: '毒入り予告', bgm: 'dread',
  init(S) { S.tEmpty = at(S, 'L14', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tEmpty) { shelf(c, t, { empty: true }); const u = sg(t, S.tEmpty, S.dur); person(c, { id: 'clk', top: 'shirt', coat: '#e8e4dc', pants: '#3c3c44', skin: '#e8c4a0', hair: '#141414', hairStyle: 'short' }, lerp(100, 300, u), 166, { k: 'clk', f: Math.floor(t * 4) & 3, arm: 'hold' }); R(c, lerp(100, 300, u) + 6, 120, 20, 14, '#c8a878'); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#1c1814'); showLetter(c, t, 0.3, 'pz', ['グリコの せい品に', 'せいさんソーダ いれた'], 20, 34); if (t > at(S, 'L13', 3) - 0.3) showLetter(c, t, at(S, 'L13', 3) - 0.3, 'pz2', ['グリコを たべて', 'はかばへ 行こう'], 40, 96, { bg: '#f8f0e8', col: '#8c1c1c', rot: 0.04 });
    yearFlash(c, t, 0.3, 1984, 216, 10, '5月');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- GF: Neyagawa — the couple attacked, the man held by police; the girl's postcard; "ゆるしたる" (moves: headlights, struggle, police lights) ---- */
const GF = withCuts({
  name: '寝屋川', ch: '巻き込まれた人', bgm: 'pulse',
  init(S) { S.tHeld = at(S, 'L16', 0) - 0.3; S.tCard = at(S, 'L16b', 0) - 0.3; S.tLet = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLet) { R(c, 0, 0, W, H, '#1c1814'); showLetter(c, t, S.tLet + 0.3, 'yr', ['こども なかせたら', 'わしらも こまる', '江崎グリコ ゆるしたる'], 60, 36); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tCard) { R(c, 0, 0, W, H, '#e8e4d8'); R(c, 40, 34, 240, 120, '#f8f4ec'); R(c, 60, 50, 90, 64, '#f0e0c8'); for (let r = 0; r < 4; r++) R(c, 70, 60 + r * 12, 70, 2, '#8c7c6c'); E(c, 210, 90, 30, 30, '#f8c8a8'); R(c, 196, 84, 6, 4, '#2c2c2c'); R(c, 218, 84, 6, 4, '#2c2c2c'); L(c, 202, 100, 218, 100, '#c84c3c', 2); plate(c, 60, 124, '応援のはがき', '#2c2c2c', '#f8e070'); yearFlash(c, t, S.tCard + 0.2, 1984, 216, 10, '6月24日'); return { z: 1.03, fx: 160, fy: 90 }; }
    citySky(c, { night: true }); skyline(c, 140, { night: true }); R(c, 0, 140, W, 40, '#2c2c30');
    if (t > S.tHeld) { car(c, 160, 160, '#e8e8e0'); for (let i = 0; i < 3; i++) car(c, [40, 280, 160][i], i === 2 ? 186 : 160, '#2c3c5c', { police: true, t, flip: i === 1 }); person(c, MAN, 200, 160, { k: 'hd', expr: 'shock', arm: 'up' }); for (let i = 0; i < 2; i++) person(c, DETS[i], 230 + i * 18, 160, { k: 'hd', flip: true, arm: 'fwd' }); if (t > at(S, 'L16', 3) - 0.3) stamp(c, t, at(S, 'L16', 3) - 0.1, 110, 70, '無関係', 80); return { z: 1.03, fx: 180, fy: 120 }; }
    car(c, 120, 160, '#8c2c2c'); person(c, MAN, 160, 160, { k: 'at', expr: 'shock' }); for (let i = 0; i < 3; i++) shadow(c, KAI, 200 + i * 20, 160, { k: 'at' + i, flip: true, arm: i === 0 ? 'fwd' : null, f: Math.floor(t * 4 + i) & 3 }); capPlate(c, t, at(S, 'L15', 1), ['6月2日 夜', '寝屋川市'], 44);
    return { z: 1.03, fx: 160, fy: 120, sx: t > at(S, 'L15', 3) && t < at(S, 'L15', 3) + 0.5 ? Math.round(Math.sin(t * 60) * 2) : 0 };
  }
}, [['V2', KAICLOSE]]);

/* ---- GG: the train — the white flag, the detectives, the fox-eyed man; no authority; he vanishes (turning point; moves: scenery scrolls, the stare, the crowd swallows him) ---- */
const GG = {
  name: 'キツネ目の男', ch: 'キツネ目の男', bgm: 'pulse',
  init(S) { S.tEnd0 = at(S, 'L18', 0) - 0.3; S.tTrain = Math.min(at(S, 'L19', 0), at(S, 'T2', 0)) - 0.3; S.tFox = Math.min(at(S, 'L21', 0), at(S, 'T2', 0)) - 0.3; S.tSketch = at(S, 'L22', 0) - 0.3; S.tRule = at(S, 'L23', 0) - 0.3; S.tGone = at(S, 'L24', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGone) { R(c, 0, 0, W, H, '#8c8c84'); R(c, 0, 30, W, 20, '#5c5c64'); plate(c, 120, 34, '改札口', '#f8f8f0', '#2c3c6c'); R(c, 0, 150, W, 40, '#a8a49c'); const u = sg(t, S.tGone + 0.3, S.dur - 0.6); for (let i = 0; i < 9; i++) { const x = mod(i * 40 + t * (i % 2 ? 30 : -24), W + 40) - 20; person(c, CROWD[i % 7], x, 160 + (i % 3) * 2, { k: 'cw' + i, f: Math.floor(t * 4 + i) & 3, flip: i % 2 === 0 }); } c.save(); c.globalAlpha = 1 - u; person(c, FOX, 170, 164, { k: 'go', f: Math.floor(t * 4) & 3 }); c.restore(); return { z: 1.03, fx: 170, fy: 120 }; }
    if (t > S.tRule) { R(c, 0, 0, W, H, '#1c2030'); glow(c, 160, 90, 140, 70, '#3c4c6c', 0.3); for (let i = 0; i < 3; i++) person(c, DETS[i], 60 + i * 30, 156, { k: 'ru', blink: blinkOf(t, i + 2) }); stamp(c, t, at(S, 'L23', 1) - 0.1, 176, 84, '逮捕権限なし', 110); if (t > at(S, 'L23', 3) - 0.3) plate(c, 56, 40, '一網打尽の方針', '#f8e8b0'); return { z: 1.03, fx: 140, fy: 110 }; }
    if (t > S.tSketch) { R(c, 0, 0, W, H, '#2c2c34'); const k = eOut(sg(t, S.tSketch, S.tSketch + 0.6)); blit(c, foxFace({ paper: true }), 160, 80, 24, 24, { s: 2 * k + 0.01 }); if (k >= 1) plate(c, 104, 132, 'キツネ目の男', '#f8e8b0'); return { z: 1.02, fx: 160, fy: 92 }; }
    if (t > S.tFox) { trainIn(c, t); person(c, DETS[0], 70, 168, { k: 'fx0', blink: blinkOf(t, 3) }); person(c, FOX, 230, 168, { k: 'fx', flip: true }); const k = sg(t, S.tFox + 0.6, S.tFox + 2); if (k > 0) { c.save(); c.globalAlpha = k; R(c, 160, 34, 150, 70, '#000000'); blit(c, foxFace({}), 235, 69, 24, 24, { s: 1.4 }); c.restore(); } return { z: 1.03 + 0.05 * k, fx: 210, fy: 100 }; }
    if (t > S.tTrain) { trainIn(c, t); const fl = t > at(S, 'L19', 4, 1e9) - 0.3; if (fl) { R(c, 96, 52, 1, 30, '#8c8c8c'); cloth(c, t, 97, 52); } for (let i = 0; i < 3; i++) person(c, DETS[i], 50 + i * 26, 168, { k: 'tr' + i, blink: blinkOf(t, i + 3) }); R(c, 140, 150, 26, 18, '#3c2c1c'); capPlate(c, t, S.tTrain + 0.3, ['6月28日', '丸大食品'], 44); if (t > at(S, 'L19', 5, 1e9) - 0.3) plate(c, 70, 92, 'バッグを投げ落とせ', '#f8e8b0'); return { z: 1.03, fx: 140, fy: 110 }; }
    if (t > S.tEnd0) { R(c, 0, 0, W, H, '#0c0c10'); const k = sg(t, S.tEnd0 + 0.2, S.tEnd0 + 1.2); c.save(); c.globalAlpha = k; blit(c, kaiFace({}), 160, 90, 24, 24, { s: 2.4 }); c.restore(); return { z: 1.02, fx: 160, fy: 90 }; }
    return { z: 1, fx: 160, fy: 90 };
  }
};

/* ---- GH: Morinaga — letter with candy, the child-voice tape, the taunt, the labelled boxes across four prefectures, the CCTV still (moves: tape reels, pins appear) ---- */
const GH = withCuts({
  name: '森永製菓', ch: '森永製菓', bgm: 'dread',
  init(S) { S.tTape = at(S, 'L26', 0) - 0.3; S.tMap = at(S, 'L27', 0) - 0.3; S.tCam = at(S, 'L28', 0) - 0.3; S.tNhk = at(S, 'L28b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tNhk) { R(c, 0, 0, W, H, '#2c2418'); R(c, 60, 60, 140, 70, '#e8dcc0'); PF(c, [60, 60, 130, 100, 200, 60], '#d8ccb0'); for (let i = 0; i < 5; i++) E(c, 230 + (i % 3) * 14, 110 + Math.floor(i / 3) * 12, 5, 4, '#f4f4f0'); plate(c, 70, 36, 'NHK大阪放送局へ', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tCam) { R(c, 0, 0, W, H, '#141414'); R(c, 50, 30, 220, 130, '#5c5c54'); c.save(); c.beginPath(); c.rect(50, 30, 220, 130); c.clip(); for (let r = 0; r < 2; r++) R(c, 60, 70 + r * 40, 200, 3, '#7c7c74'); shadow(c, { ...KAI, id: 'cam', hat: 'cap' }, 150, 160, { k: 'cam', col: '#3c3c38', arm: 'fwd' }); for (let y = 30; y < 160; y += 2) R(c, 50, y, 220, 1, DA('#000000', 0.25)); c.restore(); TX(c, 'REC', 230, 36, '#e81c1c', 16, null); if (Math.floor(t * 2) & 1) E(c, 224, 44, 3, 3, '#e81c1c'); plate(c, 60, 136, '10月16日 写真を公開', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tMap) { shelf(c, t, { labels: [3, 22, 44] }); if (t > at(S, 'L27', 2) - 0.3) plate(c, 40, 36, 'どくいり きけん たべたら しぬで', '#c81818', '#f8f8f0'); if (t > at(S, 'L27', 5) - 0.3) plate(c, 220, 140, '2府2県', '#f8e8b0'); return { z: 1.03 + 0.04 * ss(sg(t, S.tMap, S.tCam)), fx: 160, fy: 100 }; }
    if (t > S.tTape) { R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 100, 120, 60, '#f8e0a0', 0.15); tapeRec(c, 70, 90, t); phone(c, 200, 130, t); if (t > at(S, 'L26', 2) - 0.3) plate(c, 150, 120, '警察をあざ笑う挑戦状', '#e8a0a0'); plate(c, 60, 40, '子どもの声の録音', '#f8e8b0'); return { z: 1.03, fx: 140, fy: 100 }; }
    R(c, 0, 0, W, H, '#1c1814'); showLetter(c, t, 0.3, 'mr', ['グリコと 同じめに', 'あいたくなければ'], 20, 40); for (let i = 0; i < 3; i++) sweetBox(c, 220 + i * 18, 130, BOXC[i + 1]); if (t > at(S, 'L25', 2) - 0.3) plate(c, 200, 140, '青酸入りの菓子', '#e8a0a0');
    yearFlash(c, t, 0.3, 1984, 216, 10, '9月');
    return { z: 1.03, fx: 160, fy: 100 };
  }
}, [['V3', KAICLOSE]]);

/* ---- GI: House Foods — the restaurant, the bench, four changes; the fox-eyed man at the service area; the white cloth; the white van and the chase (moves: route lines, the cloth flutters, the chase) ---- */
const GI = {
  name: 'ハウス食品', ch: 'ハウス食品', bgm: 'pulse',
  init(S) { S.tSA = at(S, 'L30', 0) - 0.3; S.tCloth = at(S, 'L31', 0) - 0.3; S.tVan = at(S, 'L31', 2) - 0.3; S.tChase = at(S, 'L32', 1) - 0.3; S.tStolen = at(S, 'L32b', 0) - 0.3; S.tFuji = at(S, 'L32c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFuji) { citySky(c, {}); skyline(c, 160); R(c, 90, 60, 140, 100, '#c8c0b0'); R(c, 86, 56, 148, 6, '#8c8c8c'); for (let i = 0; i < 12; i++) { const u = fr(t * 0.4 + i / 12); R(c, 100 + hash(i) * 120, 50 + u * 110, 6, 3, '#c8b88c'); } plate(c, 80, 34, '屋上から2000万円', '#f8e8b0'); if (t > at(S, 'L32c', 3) - 0.3) stamp(c, t, at(S, 'L32c', 3) - 0.1, 250, 110, '従わず', 80); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tStolen) { citySky(c, {}); R(c, 0, 140, W, 40, '#6c6c64'); van(c, 160, 160); stamp(c, t, S.tStolen + 0.4, 160, 80, '盗難車', 80); if (t > at(S, 'L32b', 1) - 0.3) person(c, POL[0], 260, 160, { k: 'res', expr: 'sad' }); return { z: 1.03, fx: 170, fy: 120 }; }
    if (t > S.tChase) { citySky(c, { night: true }); R(c, 0, 120, W, 60, '#2c2c30'); for (let i = 0; i < 8; i++) R(c, mod(i * 48 - t * 260, W + 40) - 20, 148, 20, 2, '#e8e0a0'); van(c, 220, 160); car(c, 90 + Math.sin(t * 3) * 10, 160, '#e8e8e0', { police: true, t, lights: true }); return { z: 1.04, fx: 160, fy: 130, sx: Math.round(Math.sin(t * 30)) }; }
    if (t > S.tVan) { citySky(c, { night: true }); R(c, 0, 120, W, 60, '#24242a'); van(c, 200, 160); person(c, POL[0], 110, 160, { k: 'vn', arm: 'fwd', weapon: 'flash' }); if (t > at(S, 'L32', 0) - 0.3) { beam(c, 122, 128, -0.1, 70, 0.14, 0.4); shadow(c, FOX, 226, 150, { k: 'drv', s: 0.6, col: '#141418' }); } plate(c, 30, 40, '明かりを消した白いライトバン', '#f8e8b0'); return { z: 1.04, fx: 170, fy: 120 }; }
    if (t > S.tCloth) { citySky(c, { night: true }); R(c, 0, 100, W, 20, '#3c3c40'); for (let i = 0; i < 6; i++) R(c, mod(i * 64 - t * 120, W + 40) - 20, 108, 20, 2, '#e8e0a0'); fence(c, 100); R(c, 160, 100, 1, 4, '#8c8c8c'); cloth(c, t, 161, 102); R(c, 0, 130, W, 50, '#1c2418'); L(c, 0, 150, W, 140, '#3c3c38', 6); plate(c, 30, 40, '白い布', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tSA) { citySky(c, { night: true }); R(c, 0, 120, W, 60, '#3c3c40'); for (let i = 0; i < 5; i++) R(c, 20 + i * 64, 150, 2, 20, '#e8e8e0'); R(c, 200, 60, 110, 60, '#5c5c64'); glow(c, 255, 90, 60, 30, '#f8d880', 0.3); car(c, 70, 164, '#e8e8e0'); person(c, FOX, 160, 160, { k: 'sa', flip: true }); for (let i = 0; i < 2; i++) person(c, DETS[i], 250 + i * 20, 160, { k: 'sa' + i, flip: true }); if (t > at(S, 'L30', 3) - 0.3) stamp(c, t, at(S, 'L30', 3) - 0.1, 240, 50, '職務質問 禁止', 120); capPlate(c, t, S.tSA + 0.3, ['大津サービスエリア'], 44); return { z: 1.03, fx: 160, fy: 120 }; }
    R(c, 0, 0, W, H, '#1c2030'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#202838'); const pts = [[50, 124], [110, 70], [190, 110], [250, 64], [290, 120]]; const n = Math.floor(sg(t, at(S, 'L29', 2), at(S, 'L29', 5)) * 4.99);
    for (let i = 0; i < pts.length; i++) { if (i > 0 && i <= n) L(c, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], '#f8e070', 2); if (i <= n) { E(c, pts[i][0], pts[i][1], 5, 5, '#e81c1c'); } } TX(c, 'レストラン', 26, 130, '#f8e8b0', 16, '#000000'); if (n >= 1) TX(c, 'バス停', 92, 76, '#f8e8b0', 16, '#000000');
    yearFlash(c, t, 0.3, 1984, 216, 10, '11月14日'); if (n >= 4) plate(c, 30, 40, '変更 4回', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- GJ: 1985 — Valentine chocolates; the police chief; the last letter; the same day (moves: hearts, an empty chair, a quiet sky) ---- */
const GJ = withCuts({
  name: '1985年', ch: '終わりの手紙', bgm: 'requiem',
  init(S) { S.tChief = at(S, 'L34', 0) - 0.3; S.tWords = at(S, 'L35', 0) - 0.3; S.tCareer = at(S, 'L35b', 0) - 0.3; S.tLet = at(S, 'L36', 0) - 0.3; S.tSky = at(S, 'L37', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tSky) { citySky(c, { dusk: true }); R(c, 0, 130, W, 50, '#3c4c34'); R(c, 140, 100, 30, 40, '#8c8c84'); R(c, 136, 136, 38, 6, '#6c6c64'); for (let i = 0; i < 4; i++) E(c, 132 + i * 14, 134, 4, 4, ['#f8f0f0', '#f8e070', '#e87cac', '#f8f0f0'][i]); const u = fr(t * 0.03); R(c, 40 + u * 240, 40, 12, 2, '#3c3c4c'); R(c, 44 + u * 240, 37, 4, 8, '#3c3c4c'); capPlate(c, t, S.tSky + 0.3, ['8月12日'], 44); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tLet) { R(c, 0, 0, W, H, '#1c1814'); showLetter(c, t, S.tLet + 0.3, 'end', ['くいもんの 会社', 'いびるの もお やめや'], 70, 50); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tCareer) { R(c, 0, 0, W, H, '#3c3830'); R(c, 0, 140, W, 40, '#5c5444'); for (let i = 0; i < 5; i++) { const y = 150 - i * 18; R(c, 80 + i * 34, y, 30, 4, '#c8b888'); } person(c, { ...POL[1], id: 'chf2', coat: '#1c2c4c' }, 240, 150, { k: 'car', expr: 'sad' }); plate(c, 40, 40, '巡査からの叩き上げ', '#f8e8b0'); if (t > at(S, 'L35b', 3) - 0.3) plate(c, 40, 66, '全国でわずか4人', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tWords) { R(c, 0, 0, W, H, '#1c1c24'); glow(c, 160, 90, 140, 70, '#3c3c5c', 0.3); plate(c, 50, 50, '責任は、すべて私にある', '#f8e8b0'); if (t > at(S, 'L35', 1) - 0.3) plate(c, 50, 80, '取り逃がした警察官に', '#f8e8b0'); if (t > at(S, 'L35', 2) - 0.3) plate(c, 50, 104, '責任はない', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tChief) { R(c, 0, 0, W, H, '#2c2820'); R(c, 0, 140, W, 40, '#4c4434'); R(c, 100, 100, 120, 10, '#5c4430'); R(c, 140, 70, 40, 30, '#3c3c44'); for (let i = 0; i < 3; i++) E(c, 120 + i * 10, 94, 4, 6, ['#f8f0f0', '#f8e070', '#f8f0f0'][i]); yearFlash(c, t, S.tChief + 0.2, 1985, 216, 10, '8月7日'); capPlate(c, t, S.tChief + 0.4, ['滋賀県警 本部長'], 44); return { z: 1.03 + 0.03 * ss(sg(t, S.tChief, S.tWords)), fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#3c1c24'); for (let i = 0; i < 10; i++) { const u = fr(t * 0.2 + i / 10); const x = 20 + i * 30, y = 170 - u * 160; E(c, x - 3, y, 4, 4, '#e84c7c'); E(c, x + 3, y, 4, 4, '#e84c7c'); PF(c, [x - 7, y + 1, x, y + 9, x + 7, y + 1], '#e84c7c'); }
    for (let i = 0; i < 5; i++) { R(c, 50 + i * 46, 110, 36, 22, '#5c3418'); R(c, 50 + i * 46, 116, 36, 4, '#c81818'); if (i % 2 === 0) { R(c, 54 + i * 46, 98, 28, 10, '#f8f8f0'); } }
    if (t > at(S, 'L33', 3) - 0.3) plate(c, 60, 50, 'どくいり きけん', '#c81818', '#f8f8f0'); if (t > at(S, 'L33', 6) - 0.3) plate(c, 190, 50, 'どくなし あんしん', '#3c6c3c', '#f8f8f0');
    yearFlash(c, t, 0.3, 1985, 216, 10, '2月');
    return { z: 1.03, fx: 160, fy: 100 };
  }
}, [['V4', KAICLOSE]]);

/* ---- GK: the end — 144 letters, 1.3 million officers, digital radios, the statute of limitations, no deaths, why (moves: letters pile, the counter, the sketch fades) ---- */
const GK = {
  name: '完全犯罪', ch: '時効', bgm: 'requiem',
  init(S) { S.tCount = at(S, 'L39', 0) - 0.3; S.tItems = at(S, 'L39b', 0) - 0.3; S.tRadio = at(S, 'L40', 0) - 0.3; S.tLimit = at(S, 'L41', 0) - 0.3; S.tNo = at(S, 'L42', 0) - 0.3; S.tStock = at(S, 'L42b', 0) - 0.3; S.tWhy = at(S, 'L43', 0) - 0.3; S.tFox = at(S, 'L44', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tFox) { R(c, 0, 0, W, H, '#8c8c84'); R(c, 0, 150, W, 40, '#a8a49c'); for (let i = 0; i < 9; i++) { const x = mod(i * 40 + t * (i % 2 ? 26 : -20), W + 40) - 20; person(c, CROWD[i % 7], x, 160 + (i % 3) * 2, { k: 'ec' + i, f: Math.floor(t * 4 + i) & 3, flip: i % 2 === 0 }); } c.save(); c.globalAlpha = 0.85 * (1 - sg(t, S.tFox + 1, S.tFox + 5)); blit(c, foxFace({ paper: true }), 160, 76, 24, 24, { s: 1.8 }); c.restore(); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tWhy) { R(c, 0, 0, W, H, '#0c0c10'); bigCap(c, '？', 80, 48, '#e81c1c', sg(t, S.tWhy + 0.3, S.tWhy + 1)); return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tStock) { R(c, 0, 0, W, H, '#0c1c14'); for (let x = 0; x < W; x += 20) R(c, x, 30, 1, 130, '#14281c'); let py = 100; for (let i = 0; i < 40; i++) { const ny = 100 + Math.sin(i * 0.9) * 30 + (hash(i) - 0.5) * 30; if (i * 7 < sg(t, S.tStock, S.tStock + 3) * 280) L(c, 20 + i * 7, py, 27 + i * 7, ny, ny < py ? '#3cc85c' : '#e84c3c', 2); py = ny; } plate(c, 40, 36, '株価の値動き', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tNo) { shelf(c, t, {}); plate(c, 90, 36, '毒入り菓子による死者 0人', '#2c2c2c', '#f8f8f0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tLimit) { R(c, 0, 0, W, H, '#1c1c24'); R(c, 100, 34, 120, 92, '#f4f0e8'); R(c, 100, 34, 120, 24, '#c81818'); TX(c, '2000', 140, 38, '#f8f0e0', 16, null); TX(c, '2月13日', 128, 70, '#2c2c2c', 16, null); stamp(c, t, at(S, 'L41', 1) - 0.1, 160, 106, '時効', 70); if (t > at(S, 'L41', 3) - 0.3) plate(c, 96, 138, '初めての未解決', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tRadio) { R(c, 0, 0, W, H, '#1c1814'); radioSet(c, 60, 90, t, false); radioSet(c, 200, 90, t, t > at(S, 'L40', 2) - 0.3); L(c, 130, 106, 190, 106, '#f8e8b0', 2); PF(c, [184, 100, 194, 106, 184, 112], '#f8e8b0'); plate(c, 40, 40, '警察無線を傍受', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tItems) { R(c, 0, 0, W, H, '#2c2c34'); R(c, 30, 120, 260, 30, '#5c4c3c'); const items = [() => R(c, 50, 100, 16, 20, '#3c3c44'), () => R(c, 90, 108, 24, 12, '#e8e4dc'), () => tapeRec(c, 130, 92, 0), () => R(c, 220, 104, 20, 16, '#c8a878'), () => sweetBox(c, 256, 120, '#e8b83c')]; items.forEach(f => f()); plate(c, 40, 40, '大量に出回った品', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tCount) { R(c, 0, 0, W, H, '#2c2418'); const n = Math.floor(sg(t, S.tCount, S.tCount + 1.6) * 144); for (let i = 0; i < Math.min(n, 72); i++) R(c, 20 + (i % 12) * 12, 150 - Math.floor(i / 12) * 8 - (i % 2), 14, 8, i % 3 ? '#f0ead8' : '#e0d8c4'); plate(c, 30, 36, '脅迫状・挑戦状 ' + n + '通', '#f8e8b0'); if (t > at(S, 'L39', 2) - 0.3) { for (let i = 0; i < 3; i++) person(c, DETS[i], 210 + i * 26, 156, { k: 'cn' + i }); plate(c, 180, 70, 'のべ130万人', '#f8e8b0'); } return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#0c0c10'); const k = 1 - sg(t, 0.5, S.tCount); c.save(); c.globalAlpha = k; blit(c, kaiFace({}), 160, 90, 24, 24, { s: 2.4 }); c.restore();
    return { z: 1.02, fx: 160, fy: 90 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: 'どくいり', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { shelf(c, t, { labels: [24] }); const k = sg(t, 0.2, 2); c.save(); c.translate(160, 108); c.scale(1 + 2 * k, 1 + 2 * k); c.translate(-(14 + 5 * 16 + 7), -104); sweetBox(c, 14 + 5 * 16, 104, BOXC[(5 + 2) % 6], { label: true }); c.restore(); c.save(); c.globalAlpha = 0.8; R(c, 0, 34, W, 44, '#f8f8f0'); c.restore(); bigCap(c, 'どくいり きけん', 40, 32, '#c81818', sg(t, 0.2, 0.8)); return { z: 1.02, fx: 160, fy: 100 }; } };
const SS2 = { name: '人混み', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { R(c, 0, 0, W, H, '#8c8c84'); R(c, 0, 150, W, 40, '#a8a49c'); for (let i = 0; i < 9; i++) { const x = mod(i * 40 + t * (i % 2 ? 30 : -24), W + 40) - 20; person(c, CROWD[i % 7], x, 160 + (i % 3) * 2, { k: 's2' + i, f: Math.floor(t * 4 + i) & 3, flip: i % 2 === 0 }); } c.save(); c.globalAlpha = 1 - sg(t, 0.5, 3.5); person(c, FOX, 170, 164, { k: 's2f', f: Math.floor(t * 4) & 3 }); c.restore(); return { z: 1.03, fx: 170, fy: 120 }; } };
