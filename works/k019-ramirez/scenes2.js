/* ================= 記録 #019 リチャード・ラミレス: scenes ================= */
const RCLOSE = (c, t) => closeUp(c, t, ramirezFace({ blink: blinkOf(t, 5), scared: true }), { bg: ['#1c1410', '#4c3424'], spk: 'ramirez' });
const RGRIN = (c, t) => closeUp(c, t, ramirezFace({ blink: blinkOf(t, 3), grin: true }), { bg: ['#140408', '#3c0c14'], glow: '#c81c1c', spk: 'ramirez' });
function bloodPool(c, x, y, k, w = 26) { if (k <= 0) return; E(c, x, y, w * k, w * 0.3 * k, '#6c0c10'); E(c, x - 2, y - 1, w * 0.7 * k, w * 0.18 * k, '#8c1418'); }
function mapLA(c, t, o = {}) { R(c, 0, 0, W, H, '#1c3c5c'); PF(c, [60, 30, 320, 30, 320, 160, 230, 160, 170, 146, 120, 120, 80, 96, 50, 60], '#c8b48c'); for (let i = 0; i < 6; i++) L(c, 80 + i * 40, 40, 70 + i * 44, 150, '#a89c74'); TX(c, 'LOS ANGELES', 100, 120, '#3c2c1c', 16, null); TX(c, '太平洋', 14, 130, '#a8c8e0', 16, null); }

/* ---- QZ: cold open — the store, donuts and Pepsi on the counter, the paper on the rack, his own face (moves: the clerk rings up, the camera pushes in on the paper) ---- */
const QZ = {
  name: 'レジの新聞', ch: 'コンビニのレジ', bgm: 'eerie',
  init(S) { S.tGoods = at(S, 'C1', 0) - 0.3; S.tPaper = at(S, 'C1', 2) - 0.3; S.tFace = at(S, 'C2', 0) - 0.3; S.tHim = at(S, 'C2', 1) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tHim) { R(c, 0, 0, W, H, '#2c2820'); newspaper(c, 40, 34, 140, 120, { face: true, head: 'WANTED' }); blit(c, ramirezFace({ blink: blinkOf(t, 4) }), 250, 96, 24, 24, { s: 2.2 }); return { z: 1.03 + 0.04 * ss(sg(t, S.tHim, S.dur)), fx: 160, fy: 100 }; }
    if (t > S.tFace) { R(c, 0, 0, W, H, '#2c2820'); newspaper(c, 70, 34, 180, 124, { face: true, head: 'WANTED' }); return { z: 1.04 + 0.12 * ss(sg(t, S.tFace, S.tHim)), fx: 120, fy: 110 }; }
    store(c, t, { face: true, goods: t > S.tGoods }); person(c, CLERK, 290, 164, { k: 'ck', flip: true, blink: blinkOf(t, 6) }); person(c, RICH, 180, 164, { k: 'zr', flip: false, blink: blinkOf(t, 3) });
    if (t > S.tPaper) return { z: 1.1 + 0.25 * ss(sg(t, S.tPaper, S.tFace)), fx: 226, fy: 92 };
    return { z: 1.03, fx: 200, fy: 110 };
  }
};

/* ---- QA: 1984–85, Los Angeles suburbs — houses go dark one by one; 13; the man who called himself a Satanist (moves: lights go out, a counter ticks, a shadow passes) ---- */
const QA = {
  name: 'ロサンゼルス郊外', ch: '1984〜85年', bgm: 'dread',
  init(S) { S.t13 = at(S, 'L1b', 0) - 0.3; S.tSat = at(S, 'L2', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSat) { R(c, 0, 0, W, H, '#0c0608'); glow(c, 160, 90, 120, 80, '#8c1018', 0.3); pentagram(c, 160, 84, 44, '#c81c1c', sg(t, S.tSat + 0.2, S.tSat + 1.6)); shadow(c, RICH, 160, 166, { s: 1.5, col: '#1c0c10' }); return { z: 1.03, fx: 160, fy: 100 }; }
    const out = []; const n = t > S.t13 ? 5 : Math.floor(sg(t, 1, S.t13) * 4); for (let i = 0; i < n; i++) out.push([2, 0, 4, 1, 3][i]); suburbs(c, t, { out });
    shadow(c, RICH, lerp(-20, 340, fr(t * 0.06)), 166, { f: Math.floor(t * 5) & 3, col: '#06060a' }); yearFlash(c, t, 0.6, '1984', 216, 10, '〜1985年');
    if (t > S.t13) { R(c, 20, 40, 100, 40, '#000000'); TX(c, '13人', 40, 44, '#f8c8c8', 16, null); }
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QB: El Paso, 1960 — a railroad town, the family at mass, shoplifting at 9, smoke at 14, heavy metal and the Bible study, cousin Mike's war stories (moves: the train passes, the candle flickers, the photos fan out) ---- */
const QB = {
  name: 'エルパソ', ch: '生い立ち', bgm: 'memory',
  init(S) { S.tMass = at(S, 'L3b', 0) - 0.3; S.tSteal = at(S, 'L4', 0) - 0.3; S.tSmoke = at(S, 'L4', 1) - 0.3; S.tMetal = at(S, 'L5', 0) - 0.3; S.tDevil = at(S, 'L5', 1) - 0.3; S.tMike = at(S, 'L6', 0) - 0.3; S.tPhoto = at(S, 'L6b', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPhoto) { R(c, 0, 0, W, H, '#2c2418'); R(c, 0, 130, W, 60, '#3c3024'); person(c, COUSIN, 90, 164, { k: 'ph', arm: 'up', expr: 'smile' }); person(c, RICH_KID, 200, 164, { k: 'pk', flip: true, expr: 'shock' }); for (let i = 0; i < 3; i++) { const k = eOut(sg(t, S.tPhoto + i * 0.3, S.tPhoto + i * 0.3 + 0.4)); if (k > 0) { R(c, 110 + i * 22, 70 - 10 * k, 20, 24, '#f0ece0'); R(c, 112 + i * 22, 72 - 10 * k, 16, 14, '#3c3c34'); } } plate(c, 20, 40, '写真まで見せて、自慢した', '#f8e8b0'); return { z: 1.04, fx: 150, fy: 110 }; }
    if (t > S.tMike) { R(c, 0, 0, W, H, '#2c2418'); R(c, 0, 130, W, 60, '#3c3024'); glow(c, 160, 100, 80, 50, '#f8c870', 0.15); person(c, COUSIN, 120, 164, { k: 'mk', expr: 'smile' }); person(c, RICH_KID, 200, 164, { k: 'mkk', flip: true }); plate(c, 20, 40, 'グリーンベレーの従兄弟', '#f8e8b0'); yearFlash(c, t, S.tMike + 0.2, '11歳', 216, 10, ''); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tMetal) { R(c, 0, 0, W, H, '#1c1820'); if (t > S.tDevil) { church(c, t); dim(c, 0.55, '#1c0c10'); R(c, 120, 110, 80, 10, '#5c3c24'); R(c, 130, 100, 30, 12, '#e8e0c8'); R(c, 160, 100, 30, 12, '#e8e0c8'); glow(c, 160, 104, 40, 20, '#c81c1c', 0.3 + 0.1 * Math.sin(t * 3)); person(c, RICH_TEEN, 160, 164, { k: 'bs' }); plate(c, 20, 40, '悪魔に関する本を読み漁る', '#f8c8c8'); } else { R(c, 0, 130, W, 60, '#2c2430'); person(c, RICH_TEEN, 160, 164, { k: 'mt', f: Math.floor(t * 4) & 3 }); for (let k = 0; k < 3; k++) TX(c, '♪', 120 + k * 36, 70 - fr(t * 0.8 + k * 0.3) * 20, '#c8c8f8', 16, null); plate(c, 20, 40, 'ヘヴィメタル', '#f8e8b0'); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tSteal) { R(c, 0, 0, W, H, '#c8b494'); for (let r = 0; r < 2; r++) { R(c, 40, 70 + r * 30, 240, 3, '#8c7458'); for (let i = 0; i < 20; i++) R(c, 42 + i * 12, 56 + r * 30, 9, 14, ['#c83c3c', '#3c6cc8', '#f8c83c', '#3c9c5c'][(i + r) % 4]); } R(c, 0, 140, W, 50, '#a88c64'); if (t > S.tSmoke) { person(c, RICH_TEEN, 160, 164, { k: 'sm' }); for (let i = 0; i < 6; i++) { const u = fr(t * 0.4 + i / 6); E(c, 172 + Math.sin(t + i) * 6, 104 - u * 50, 3 + u * 8, 2 + u * 4, DA('#c8c8c0', 0.4 * (1 - u))); } yearFlash(c, t, S.tSmoke + 0.2, '14歳', 216, 10, ''); } else { person(c, RICH_KID, 160, 164, { k: 'st', arm: 'up', flip: Math.sin(t * 2) > 0 }); yearFlash(c, t, S.tSteal + 0.2, '9歳', 216, 10, 'ごろ'); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tMass) { church(c, t); person(c, PAPA, 120, 164, { k: 'cp' }); person(c, MAMA, 150, 164, { k: 'cm' }); person(c, RICH_KID, 180, 164, { k: 'ck', blink: blinkOf(t, 2) }); plate(c, 20, 40, '厳格なカトリックの家', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    elPaso(c, t); person(c, PAPA, 90, 164, { k: 'ep' }); person(c, MAMA, 120, 164, { k: 'em' }); blit(c, modFig(RICH_KID, { k: 'eb' }), 140, 164, FIG_AX2, FIG_AY2, { s: 0.7 }); plate(c, 20, 40, 'テキサス州エルパソ', '#f8e8b0'); yearFlash(c, t, 0.6, '1960', 216, 10, '2月28日');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QC: drifting west — 17 and out of school; Los Angeles 1983: a backpack, cheap hotels, sleeping in parked cars; cocaine, cola and cupcakes (moves: the neon flickers, he walks, the car window fogs) ---- */
const QC = {
  name: 'ロサンゼルスへ', ch: '根無し草', bgm: 'dread',
  init(S) { S.tLA = at(S, 'L8', 0) - 0.3; S.tCar = at(S, 'L8', 3) - 0.3; S.tJunk = at(S, 'L8b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tJunk) { skidRow(c, t); dim(c, 0.2); person(c, RICH, 140, 164, { k: 'jk', expr: 'sad', blink: blinkOf(t, 5) }); R(c, 170, 130, 8, 14, '#8c2c1c'); R(c, 170, 132, 8, 3, '#f0f0ec'); E(c, 190, 140, 6, 4, '#c8783c'); E(c, 190, 137, 5, 3, '#f0d0e0'); plate(c, 20, 40, 'コーラとカップケーキ', '#f8e8b0'); return { z: 1.05, fx: 150, fy: 120 }; }
    if (t > S.tCar) { skidRow(c, t); parkedCar(c, 110, 160, {}); c.save(); c.beginPath(); c.rect(134, 132, 16, 9); c.clip(); blit(c, modFig(RICH, { k: 'cr', blink: 2 }), 142, 172, FIG_AX2, FIG_AY2, { s: 0.7 }); c.restore(); plate(c, 20, 40, '駐車中の車で眠る', '#f8e8b0'); return { z: 1.08, fx: 150, fy: 130 }; }
    if (t > S.tLA) { skidRow(c, t); const u = sg(t, S.tLA, S.tCar); person(c, RICH, lerp(20, 200, u), 164, { k: 'wa', f: Math.floor(t * 5) & 3 }); R(c, lerp(20, 200, u) - 12, 116, 9, 16, '#3c4c3c'); yearFlash(c, t, S.tLA + 0.2, '1983', 216, 10, 'LA'); return { z: 1.03, fx: 160, fy: 110 }; }
    elPaso(c, t); dim(c, 0.3, '#2c1c10'); person(c, RICH_TEEN, lerp(160, 340, sg(t, 1, S.tLA)), 164, { k: 'lv', f: Math.floor(t * 5) & 3 }); plate(c, 20, 40, '二度と戻らなかった', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QD: 28 June 1984, Eagle Rock — a shadow at the screen, the knife's glint, the dark stain; a fingerprint on the frame that matches no one (moves: the screen bends, the glint, the print glows) ---- */
const QD = {
  name: 'イーグル・ロック', ch: '最初の殺人', bgm: 'dread',
  init(S) { S.tIn = at(S, 'L10', 0) - 0.3; S.tKill = at(S, 'L10', 3) - 0.3; S.tPrint = at(S, 'L10b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPrint) { R(c, 0, 0, W, H, '#14141c'); R(c, 60, 34, 200, 120, '#2c3c5c'); for (let x = 64; x < 260; x += 5) L(c, x, 34, x, 154, '#3c4c6c'); thumbprint(c, 160, 94, 2, '#f8e8a0', 0.4 + 0.3 * Math.sin(t * 3)); plate(c, 20, 40, '窓と網戸に、指紋', '#f8e8b0'); if (t > at(S, 'L10b', 1) - 0.3) stamp(c, t, at(S, 'L10b', 1) - 0.1, 240, 130, '不明', 80); return { z: 1.03, fx: 160, fy: 100 }; }
    nightRoom(c, t, { lamp: true });
    if (t > S.tKill) { dim(c, 0.4, '#1c0408'); shadow(c, RICH, 160, 164, { s: 1.4, arm: 'stab', col: '#06040a' }); if (Math.sin(t * 7) > 0.6) R(c, 186, 80, 2, 10, '#f0f0f0'); bloodPool(c, 120, 156, sg(t, S.tKill + 1, S.tPrint)); return { z: 1.05, fx: 160, fy: 110, sx: t < S.tKill + 0.3 ? Math.round(Math.sin(t * 60)) : 0 }; }
    if (t > S.tIn) { const k = sg(t, S.tIn, S.tIn + 1.5); shadow(c, RICH, lerp(250, 200, k), 164, { s: 1.2, col: '#06040a' }); yearFlash(c, t, S.tIn + 0.2, '1984', 216, 10, '6月28日'); return { z: 1.04, fx: 200, fy: 100 }; }
    suburbs(c, t, { out: [0, 1, 3, 4] }); plate(c, 20, 40, '刑務所を出て、間もなく', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QE: 17 March 1985 — the garage shot, the bullet stopped by a car key; the kitchen; the AC/DC cap; the car on the avenue; ten days later the son comes home; "the Valley Intruder" (moves: the key spins, the ambulance light, the headline types) ---- */
const QE = {
  name: '1985年3月', ch: '峡谷の侵入者', bgm: 'pulse',
  init(S) { S.tKey = at(S, 'L11b', 0) - 0.3; S.tKit = at(S, 'L12', 0) - 0.3; S.tCap = at(S, 'L12b', 0) - 0.3; S.tAve = at(S, 'L13', 0) - 0.3; S.tAmb = at(S, 'L13', 3) - 0.3; S.tSon = at(S, 'L14', 0) - 0.3; S.tName = at(S, 'L14b', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#2c2820'); newspaper(c, 50, 30, 220, 128, { head: 'VALLEY INTRUDER' }); return { z: 1.03 + 0.04 * ss(sg(t, S.tName, S.dur)), fx: 160, fy: 90 }; }
    if (t > S.tSon) { suburbs(c, t, { out: [0, 1, 3, 4] }); R(c, 0, 0, W, 40, '#5c7ca8'); dim(c, 0.2); shadow(c, DETS[2], 154, 166, { col: '#1c1c28' }); glow(c, 154, 140, 30, 30, '#f8e8a0', 0.15); if (t > at(S, 'L14b', 0) - 0.3) { R(c, 0, 0, W, H, '#1c1c28'); corkBoard(c, t, { n: 4 }); person(c, DETS[0], 70, 164, { k: 'sd', expr: 'sad' }); } else plate(c, 20, 40, '10日後', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tAve) { R(c, 0, 0, W, H, '#0c0c18'); R(c, 0, 120, W, 70, '#2c2c34'); for (let i = 0; i < 6; i++) R(c, i * 60 - 10, 140, 34, 3, '#c8c8b0'); parkedCar(c, 120, 158, { col: '#8c8c9c' }); if (t > S.tAmb) { const ph = Math.floor(t * 6) & 1; glow(c, 270, 120, 60, 30, ph ? '#ff3030' : '#f8f8f8', 0.35); bloodPool(c, 110, 162, 0.6, 18); } else shadow(c, RICH, 100, 164, { col: '#06040a', arm: 'up' }); plate(c, 20, 40, '1時間もしないうちに', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 120 }; }
    if (t > S.tCap) { R(c, 0, 0, W, H, '#2c2420'); R(c, 0, 120, W, 70, '#5c4c40'); for (let x = 0; x < W; x += 20) R(c, x, 120, 1, 70, '#4c3c30'); E(c, 160, 132, 30, 20, '#1c1c1c'); R(c, 130, 132, 62, 10, '#1c1c1c'); E(c, 196, 141, 26, 5, '#141414'); E(c, 150, 122, 8, 4, '#3c3c3c'); TX(c, 'AC/DC', 138, 118, '#e8e8e8', 16, null); plate(c, 20, 40, '残された野球帽', '#f8e8b0'); return { z: 1.08, fx: 160, fy: 130 }; }
    if (t > S.tKit) { R(c, 0, 0, W, H, '#3c3430'); R(c, 0, 100, W, 90, '#5c5048'); R(c, 200, 60, 100, 40, '#8c7c6c'); R(c, 40, 40, 60, 30, '#c8c0a8'); shadow(c, RICH, 160, 164, { s: 1.3, arm: 'up', col: '#06040a' }); if (t > at(S, 'L12', 2) - 0.3) { person(c, { ...FOLK[1], id: 'wit' }, 290, 164, { k: 'wt', expr: 'shock', flip: true }); plate(c, 20, 40, '顔を、はっきり見ていた', '#f8e8b0'); } return { z: 1.04, fx: 180, fy: 110 }; }
    if (t > S.tKey) { R(c, 0, 0, W, H, '#1c1c24'); const sp = t * 6; c.save(); c.translate(160, 90); c.scale(2.5, 2.5); c.translate(-160, -85); R(c, 150, 80, 20, 10, '#c8b060'); c.save(); c.translate(160, 85); c.rotate(Math.sin(sp) * 0.4); R(c, 0, -2, 30, 4, '#c8c8c8'); for (let k = 0; k < 4; k++) R(c, 22 + k * 2, 2, 1, 3, '#c8c8c8'); c.restore(); E(c, 158, 86, 3, 3, '#3c3c3c'); star4(c, 150, 78, 4 + Math.sin(t * 8) * 2, '#ffffff', '#f8f8ff'); c.restore(); plate(c, 20, 40, '弾は、車のキーに', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 90 }; }
    R(c, 0, 0, W, H, '#1c1c24'); R(c, 0, 40, W, 110, '#2c2c34'); R(c, 0, 150, W, 40, '#3c3c40'); parkedCar(c, 40, 156, { col: '#6c6c7c' }); person(c, { ...FOLK[5], id: 'gw' }, 180, 164, { k: 'gw', expr: t > at(S, 'L11', 3) - 0.3 ? 'shock' : 'normal' }); shadow(c, RICH, 270, 164, { arm: t > at(S, 'L11', 3) - 0.3 ? 'up' : null, col: '#06040a', flip: true }); if (t > at(S, 'L11', 3) && t < at(S, 'L11', 3) + 0.25) glow(c, 250, 110, 20, 14, '#f8e870', 0.8); yearFlash(c, t, 0.4, '1985', 216, 10, '3月17日');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QF: May–June — Monrovia: a hammer left behind; the lipstick sign (a pause), the inverted star on the wall; the newspaper names him "Night Stalker" (moves: the star is drawn stroke by stroke, the press types) ---- */
const QF = {
  name: 'モンロビア', ch: '悪魔の印', bgm: 'dread',
  init(S) { S.tMon = at(S, 'L16', 0) - 0.3; S.tMark = at(S, 'L16b', 0) - 0.3; S.tStar = at(S, 'L16c', 0) - 0.3; S.tNS = at(S, 'L17', 0) - 0.3; S.tName = at(S, 'L17', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#2c2820'); newspaper(c, 50, 30, 220, 128, { head: 'NIGHT STALKER' }); return { z: 1.03 + 0.05 * ss(sg(t, S.tName, S.dur)), fx: 160, fy: 80 }; }
    if (t > S.tNS) { R(c, 0, 0, W, H, '#2c2c34'); for (let i = 0; i < 3; i++) { R(c, 40 + i * 90, 90, 60, 30, '#4c4c54'); R(c, 46 + i * 90, 80, 48, 12, '#c8c8c0'); person(c, DETS[i], 70 + i * 90, 164, { k: 'pr' + i, f: Math.floor(t * 6 + i) & 3 }); } plate(c, 20, 40, '新聞の記者がつけた名前', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tStar) { R(c, 0, 0, W, H, '#4c4440'); for (let x = 0; x < W; x += 30) R(c, x, 0, 1, 150, '#443c38'); R(c, 0, 150, W, 40, '#3c3430'); pentagram(c, 160, 92, 46, '#c81c2c', sg(t, S.tStar, S.tStar + 2)); plate(c, 20, 40, '逆五芒星', '#f8c8c8'); return { z: 1.04 + 0.06 * ss(sg(t, S.tStar, S.tNS)), fx: 160, fy: 92 }; }
    if (t > S.tMark) { R(c, 0, 0, W, H, '#14141c'); glow(c, 160, 100, 80, 50, '#c81c2c', 0.15); R(c, 140, 110, 6, 18, '#c81c2c'); R(c, 140, 106, 6, 5, '#e8c8a0'); R(c, 138, 126, 10, 4, '#c8b060'); plate(c, 20, 40, '口紅で描かれた、ある印', '#f8c8c8'); return { z: 1.1, fx: 150, fy: 110 }; }
    if (t > S.tMon) { nightRoom(c, t, {}); dim(c, 0.4); R(c, 120, 150, 20, 5, '#5c4c3c'); R(c, 138, 146, 10, 10, '#8c8c8c'); plate(c, 20, 40, 'モンロビア　凶器のハンマー', '#f8e8b0'); bloodPool(c, 90, 158, 0.7, 20); return { z: 1.06, fx: 140, fy: 130 }; }
    suburbs(c, t, {}); const n = Math.floor(sg(t, 0.4, S.tMon) * 4.99); for (let i = 0; i < n; i++) { const x = 40 + i * 64; stamp(c, t, 0.4 + i * 0.6, x, 70, ['5月', '6月', '7月', '8月', '?'][i], 50); }
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QG: the frenzy — 20 July, two houses in one night; vows to Satan; 17 August San Francisco: the star and "JACK THE KNIFE"; 24 August Mission Viejo, the last (moves: pins drop on the map, the lipstick writes) ---- */
const QG = {
  name: '狂乱', ch: '狂乱の夏', bgm: 'pulse',
  init(S) { S.tVow = at(S, 'L18b', 0) - 0.3; S.tSF = at(S, 'L19', 0) - 0.3; S.tWall = at(S, 'L19', 1) - 0.3; S.tLast = at(S, 'L20', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLast) { suburbs(c, t, { out: [0, 1, 2, 4] }); const ph = Math.floor(t * 6) & 1; glow(c, 220, 130, 60, 30, ph ? '#ff3030' : '#3c5cff', 0.3); plate(c, 20, 40, 'ミッションビエホ', '#f8e8b0'); plate(c, 20, 66, '最後の犯行', '#f8c8c8'); yearFlash(c, t, S.tLast + 0.2, '1985', 216, 10, '8月24日'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tWall) { R(c, 0, 0, W, H, '#c8bca4'); for (let y = 0; y < 150; y += 20) R(c, 0, y, W, 1, '#b0a48c'); R(c, 0, 150, W, 40, '#8c7c64'); pentagram(c, 110, 86, 36, '#c81c2c', sg(t, S.tWall, S.tWall + 1.5)); const s = 'JACK THE KNIFE'; const n = Math.floor(sg(t, S.tWall + 1.5, S.tWall + 3.5) * s.length); TX(c, s.slice(0, n), 170, 70, '#c81c2c', 16, null); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tSF) { mapLA(c, t); E(c, 70, 40, 4, 4, '#e81c1c'); TX(c, 'サンフランシスコ', 80, 36, '#f8e8b0', 16, '#000000'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tVow) { R(c, 0, 0, W, H, '#0c0608'); glow(c, 160, 100, 120, 70, '#8c1018', 0.25 + 0.1 * Math.sin(t * 2)); shadow(c, RICH, 200, 164, { s: 1.5, arm: 'up', col: '#06040a' }); pentagram(c, 90, 90, 28, '#c81c2c', 1); plate(c, 20, 40, '悪魔への忠誠を誓わせる', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#0c0c18'); R(c, 0, 120, W, 70, '#2c2c34'); R(c, 60, 70, 200, 50, '#3c3c44'); R(c, 60, 66, 200, 6, '#c83c3c'); TX(c, 'GAS', 140, 50 + 20, '#f8f8f0', 16, null); for (let i = 0; i < 2; i++) { R(c, 90 + i * 100, 100, 14, 20, '#c8c8c0'); } glow(c, 160, 90, 100, 30, '#f8f0c0', 0.2); yearFlash(c, t, 0.4, '1985', 216, 10, '7月20日');
    if (t > at(S, 'L18', 3) - 0.3) { mapLA(c, t); const n = Math.floor(sg(t, at(S, 'L18', 3) - 0.3, S.tVow) * 6.99); for (let i = 0; i < n; i++) { const [x, y] = [[200, 90], [230, 110], [180, 120], [260, 80], [210, 140], [150, 100], [240, 130]][i]; E(c, x, y, 4, 4, '#e81c1c'); } }
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QH: why so long? — clues everywhere, nothing matches: gun, knife, hammer; every age and race; the profile does not fit; June 1985, a year late, the task force (moves: icons shuffle, the string web grows, detectives fill the room) ---- */
const QH = {
  name: '捜査', ch: '捜査の壁', bgm: 'pulse',
  init(S) { S.tMix = at(S, 'L21b', 2) - 0.3; S.tProf = at(S, 'L21c', 0) - 0.3; S.tTF = at(S, 'L22', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTF) { corkBoard(c, t, { n: 10, strings: true }); for (let i = 0; i < 3; i++) person(c, DETS[i], 60 + i * 100, 166, { k: 'tf' + i, flip: i === 2 }); yearFlash(c, t, S.tTF + 0.2, '1985', 216, 10, '6月'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tProf) { R(c, 0, 0, W, H, '#2c2c34'); R(c, 80, 34, 160, 120, '#f0ece0'); R(c, 88, 42, 144, 10, '#2c2c2c'); for (let k = 0; k < 6; k++) R(c, 92, 60 + k * 12, 120, 3, '#8c8c8c'); bigCap(c, '当てはまらない', 80, 32, '#c81c1c', sg(t, S.tProf + 0.3, S.tProf + 0.8)); plate(c, 20, 40, 'プロファイリング', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#2c2c34'); const ic = ['銃', '刃物', 'ハンマー']; const ag = ['若者', '老人', '男', '女']; const k = Math.floor(t * 1.5);
    for (let i = 0; i < 3; i++) plate(c, 30 + i * 96, 50, ic[(i + k) % 3], '#f8e8b0'); if (t > S.tMix) for (let i = 0; i < 4; i++) plate(c, 20 + i * 76, 100, ag[(i + k) % 4], '#c8d8f8');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- QI: the turning point — one car: neighbours saw it; a friend calls; the car abandoned, wiped; a laser, one left thumbprint; NEC's system, Japanese engineers through the night (a pause) — HIT; born 28 Feb 1960, just inside the new records; the press conference (moves: the laser sweeps, the print rises, the screens scroll, "HIT" flashes) ---- */
const QI = {
  name: '1台の車', ch: '急展開', bgm: 'pulse',
  init(S) { S.tSaw = at(S, 'L23b', 0) - 0.3; S.tFound = at(S, 'L24', 0) - 0.3; S.tLaser = at(S, 'L24b', 0) - 0.3; S.tNEC = at(S, 'L25', 0) - 0.3; S.tNight = at(S, 'L25b', 0) - 0.3; S.tHit = at(S, 'L26', 0) - 0.3; S.tDate = at(S, 'L26b', 0) - 0.3; S.tIf = at(S, 'L26c', 0) - 0.3; S.tPress = at(S, 'L27', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPress) { R(c, 0, 0, W, H, '#2c3c5c'); R(c, 0, 120, W, 70, '#3c3c44'); R(c, 120, 40, 80, 70, '#f0ece0'); blit(c, ramirezFace({}), 160, 76, 24, 24, { s: 1.3 }); TX(c, 'WANTED', 128, 98, '#c81c1c', 16, null); for (let i = 0; i < 4; i++) if (Math.sin(t * 7 + i * 2) > 0.7) glow(c, 40 + i * 80, 140, 20, 20, '#ffffff', 0.6); person(c, DETS[0], 70, 166, { k: 'pc', arm: 'up' }); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tIf) { R(c, 0, 0, W, H, '#1c1c24'); R(c, 40, 70, 240, 4, '#c8c8c0'); const cut = 120; R(c, cut, 60, 3, 24, '#f8e83c'); TX(c, '1960.1.1', cut - 30, 40, '#f8e83c', 16, null); E(c, 152, 72, 5, 5, '#e81c1c'); TX(c, '2.28', 140, 86, '#f8c8c8', 16, null); c.save(); c.globalAlpha = 0.5 + 0.3 * Math.sin(t * 4); E(c, 96, 72, 5, 5, '#8c8c8c'); c.restore(); TX(c, 'もし……', 60, 110, '#c8c8c8', 16, null); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tDate) { R(c, 0, 0, W, H, '#1c1c24'); R(c, 40, 70, 240, 4, '#c8c8c0'); const k = sg(t, S.tDate + 0.3, S.tDate + 2); R(c, 120, 74 - 14 * k, 160, 14 * k, DA('#3cc86c', 0.4)); R(c, 120, 60, 3, 24, '#f8e83c'); TX(c, '1960.1.1', 90, 40, '#f8e83c', 16, null); if (t > at(S, 'L26b', 2) - 0.3) { E(c, 152, 72, 5, 5, '#e81c1c'); TX(c, '1960.2.28', 130, 86, '#f8c8c8', 16, null); } return { z: 1.03, fx: 160, fy: 80 }; }
    if (t > S.tHit) { terminals(c, t, { hit: true }); const fl = Math.sin(t * 10) > 0; if (fl) bigCap(c, 'HIT', 40, 32, '#f8e83c'); for (let i = 0; i < 3; i++) person(c, ENGS[i], 60 + i * 96, 166, { k: 'eh' + i, arm: i === 1 ? 'up' : null, expr: 'smile' }); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tNight) { terminals(c, t, { night: true }); for (let i = 0; i < 3; i++) person(c, ENGS[i], 60 + i * 96, 166, { k: 'en' + i, blink: blinkOf(t, i + 2), f: -1 }); const hr = Math.floor(sg(t, S.tNight, S.tHit) * 12); plate(c, 20, 40, '一昼夜の照合　' + (20 + hr) % 24 + '時', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNEC) { terminals(c, t, {}); for (let i = 0; i < 3; i++) person(c, ENGS[i], 60 + i * 96, 166, { k: 'ne' + i }); plate(c, 20, 40, '日本電気製の指紋システム', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tLaser) { R(c, 0, 0, W, H, '#0c0c14'); R(c, 60, 50, 200, 90, '#3c3c48'); const x = 60 + fr(t * 0.5) * 200; L(c, x, 50, x, 140, '#e81c1c', 2); glow(c, x, 95, 20, 50, '#ff3030', 0.3); thumbprint(c, 160, 95, 1.6, '#f8e8a0', sg(t, S.tLaser + 1, S.tLaser + 3)); if (t > at(S, 'L24b', 2) - 0.3) plate(c, 20, 40, '左手の親指', '#f8e8b0'); return { z: 1.05, fx: 160, fy: 95 }; }
    if (t > S.tFound) { R(c, 0, 0, W, H, '#2c3c4c'); R(c, 0, 130, W, 60, '#4c4c54'); parkedCar(c, 110, 160, { col: '#c87c3c' }); person(c, DETS[1], 230, 166, { k: 'fd', arm: 'up', flip: true }); R(c, 160, 128, 30, 3, DA('#f8f8f8', 0.6)); plate(c, 20, 40, '乗り捨てられた車', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 120 }; }
    if (t > S.tSaw) { suburbs(c, t, {}); parkedCar(c, lerp(-90, 330, fr(t * 0.15)), 160, { col: '#c87c3c' }); for (let i = 0; i < 4; i++) { const x = 22 + i * 64; c.save(); c.beginPath(); c.rect(x - 2, 114, 12, 10); c.clip(); blit(c, modFig(FOLK[i], { k: 'ws' + i }), x + 4, 146, FIG_AX2, FIG_AY2, { s: 0.6 }); c.restore(); } plate(c, 20, 40, '証言が、完全に一致', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 120 }; }
    R(c, 0, 0, W, H, '#1c1c28'); parkedCar(c, 110, 140, { col: '#c87c3c' }); bigCap(c, '1台の車', 40, 32, '#f8e8b0', sg(t, 0.4, 1));
    return { z: 1.05, fx: 160, fy: 110 };
  }
};

/* ---- QJ: 31 August 1985 — back from Phoenix, he doesn't know; the store; donuts and Pepsi; his face on the front page (moves: the bus pulls in, the camera snaps to the rack) ---- */
const QJ = {
  name: '8月31日', ch: '8月31日', bgm: 'eerie',
  init(S) { S.tKnow = at(S, 'L28b', 0) - 0.3; S.tStore = at(S, 'L29', 0) - 0.3; S.tSee = at(S, 'L29b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSee) { R(c, 0, 0, W, H, '#2c2820'); newspaper(c, 50, 34, 150, 120, { face: true, head: 'WANTED' }); blit(c, ramirezFace({ scared: true, blink: 0 }), 256, 96, 24, 24, { s: 2.0 }); return { z: 1.04 + 0.08 * ss(sg(t, S.tSee, S.dur)), fx: 150, fy: 100, sx: t < S.tSee + 0.3 ? Math.round(Math.sin(t * 60)) : 0 }; }
    if (t > S.tStore) { store(c, t, { face: true, goods: true }); person(c, CLERK, 290, 164, { k: 'jc', flip: true }); person(c, RICH, 180, 164, { k: 'js', blink: blinkOf(t, 3) }); return { z: 1.05 + 0.1 * ss(sg(t, S.tStore + 2, S.tSee)), fx: 222, fy: 100 }; }
    if (t > S.tKnow) { R(c, 0, 0, W, H, '#e8e4d0'); R(c, 0, 120, W, 70, '#a8a8a0'); for (let i = 0; i < 4; i++) newspaper(c, 30 + i * 70, 40, 56, 70, { face: true }); person(c, RICH, lerp(20, 300, sg(t, S.tKnow, S.tStore)), 164, { k: 'kw', f: Math.floor(t * 5) & 3 }); plate(c, 20, 124, '彼は、知らなかった', '#2c2c2c', '#f8f0e0'); return { z: 1.03, fx: 160, fy: 110 }; }
    VG(c, 0, 0, W, 110, ['#5c8cc8', '#a8c8e0', '#f0d8a8']); R(c, 0, 110, W, 80, '#a8a8a0'); const u = sg(t, 0.2, 3); R(c, lerp(-160, 60, u), 96, 150, 46, '#c8c8d0'); R(c, lerp(-160, 60, u), 96, 150, 6, '#3c5ca8'); for (let k = 0; k < 6; k++) R(c, lerp(-160, 60, u) + 10 + k * 22, 108, 16, 12, '#3c4c5c'); for (const wx of [30, 120]) E(c, lerp(-160, 60, u) + wx, 142, 8, 8, '#141414'); yearFlash(c, t, 0.4, '1985', 216, 10, '8月31日'); if (t > 3.2) person(c, RICH, 180, 164, { k: 'bs', blink: blinkOf(t, 3) });
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- QK: the chase — 3 km in 10 minutes; three failed carjackings; into the barrio; not mercy but fury; the crowd; Deputy Andreas Ramirez; "俺を捕まえてくれ" (moves: the run, the crowd swells, the cruiser's lights) ---- */
const QK = withCuts({
  name: '追跡', ch: '住民たち', bgm: 'pulse',
  init(S) { S.tCar = at(S, 'L30b', 0) - 0.3; S.tBarrio = at(S, 'L30b', 2) - 0.3; S.tHope = at(S, 'L31', 0) - 0.3; S.tMid = at(S, 'T2', 0) - 0.3; S.tRage = at(S, 'L31b', 0) - 0.3; S.tCaught = at(S, 'L32', 0) - 0.3; S.tDep = at(S, 'L32b', 0) - 0.3; S.tPlead = at(S, 'L33', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPlead) { barrio(c, t); for (let i = 0; i < 6; i++) person(c, FOLK[i], 30 + i * 34 + (i > 2 ? 150 : 0), 164, { k: 'pl' + i, expr: 'shock', arm: i % 2 ? 'up' : null, flip: i > 2 }); person(c, RICH, 150, 164, { k: 'pr', expr: 'shock', arm: 'up' }); person(c, DEPUTY, 190, 164, { k: 'pd', flip: true }); return { z: 1.08, fx: 170, fy: 110 }; }
    if (t > S.tDep) { barrio(c, t); blit(c, cruiserSpr(t), 260, 154, 48, 37, {}); lightBar(c, 260, 120, t); person(c, DEPUTY, lerp(240, 190, sg(t, S.tDep, S.tDep + 1.5)), 164, { k: 'dd', f: Math.floor(t * 6) & 3, flip: true }); person(c, RICH, 130, 164, { k: 'dr', expr: 'shock' }); for (let i = 0; i < 3; i++) person(c, FOLK[i], 40 + i * 26, 164, { k: 'dk' + i, arm: 'up' }); plate(c, 20, 40, 'アンドレアス・ラミレス保安官代理', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tCaught) { barrio(c, t); for (let i = 0; i < 6; i++) person(c, FOLK[i], 100 + Math.cos(i * 1.05) * 50, 164 - Math.abs(Math.sin(i)) * 2, { k: 'cg' + i, arm: 'up', flip: Math.cos(i * 1.05) > 0 }); person(c, RICH, 100, 164, { k: 'cr', expr: 'shock' }); return { z: 1.05, fx: 110, fy: 110, sx: Math.round(Math.sin(t * 30) * 0.6) }; }
    if (t > S.tRage) { barrio(c, t); const u = sg(t, S.tRage, S.tCaught); person(c, RICH, lerp(150, 290, u), 164, { k: 'rg', f: Math.floor(t * 9) & 3, expr: 'shock' }); for (let i = 0; i < 6; i++) person(c, FOLK[i], lerp(150, 290, u) - 50 - i * 22, 164, { k: 'rf' + i, f: Math.floor(t * 9 + i) & 3, arm: i % 2 ? 'up' : null }); return { z: 1.03, fx: lerp(150, 260, u), fy: 110 }; }
    if (t > S.tMid) { barrio(c, t); person(c, RICH, 160, 164, { k: 'md', expr: 'shock' }); for (let i = 0; i < 4; i++) person(c, FOLK[i], 30 + i * 22, 164, { k: 'mf' + i, f: Math.floor(t * 6 + i) & 3 }); return { z: 1.05, fx: 120, fy: 110 }; }
    if (t > S.tHope) { barrio(c, t); person(c, RICH, 160, 164, { k: 'hp', f: -1, blink: blinkOf(t, 3) }); plate(c, 20, 40, '同じヒスパニックなら……', '#5c3c1c', '#f8f0d8'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tBarrio) { barrio(c, t); person(c, RICH, lerp(-10, 160, sg(t, S.tBarrio, S.tHope)), 164, { k: 'br', f: Math.floor(t * 9) & 3, expr: 'shock' }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tCar) { VG(c, 0, 0, W, 110, ['#5c8cc8', '#a8c8e0', '#f0d8a8']); R(c, 0, 110, W, 80, '#7c7c84'); const k = Math.min(2, Math.floor(sg(t, S.tCar, S.tBarrio) * 3)); parkedCar(c, 100, 160, { col: ['#c83c3c', '#3c6cc8', '#e8c83c'][k] }); person(c, RICH, 90, 164, { k: 'cj', arm: 'up', expr: 'shock' }); plate(c, 20, 40, '車を奪おうとして、失敗　' + (k + 1) + '度目', '#f8e8b0'); return { z: 1.04, fx: 150, fy: 120 }; }
    VG(c, 0, 0, W, 110, ['#5c8cc8', '#a8c8e0', '#f0d8a8']); R(c, 0, 110, W, 80, '#7c7c84'); for (let i = 0; i < 6; i++) { const x = ((i * 70 - t * 120) % 420 + 420) % 420 - 60; R(c, x, 60, 40, 50, '#c8b8a0'); } person(c, RICH, 160, 164, { k: 'rn', f: Math.floor(t * 10) & 3, expr: 'shock' }); const m = 1 + Math.floor(sg(t, 0.3, S.tCar) * 9.99); plate(c, 20, 40, '3キロを ' + m + '分', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V1', RCLOSE], ['V1b', RCLOSE]]);

/* ---- QL: the trial — six lawyers, 3½ years; the palm pentagram; a juror asleep, a juror shot; September 1989: guilty; "反吐が出る"; twelve death sentences, the laugh, the wave — "Disneyland" (moves: the gavel, the palm turns, the press flashes) ---- */
const QL = withCuts({
  name: '裁判', ch: '裁判', bgm: 'dread',
  init(S) { S.tPalm = at(S, 'L35', 0) - 0.3; S.tJury = at(S, 'L35b', 0) - 0.3; S.tVerd = at(S, 'L36', 0) - 0.3; S.tAsk = at(S, 'L37', 0) - 0.3; S.tLaugh = at(S, 'L38', 0) - 0.3; S.tPun = at(S, 'L38b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPun) { R(c, 0, 0, W, H, '#1c1c24'); TX(c, 'DISNEYLAND', 80, 60, '#c8c8f8', 16, null); TX(c, '↓', 150, 82, '#f8e8b0', 16, null); TX(c, 'DEATH IN LAND', 70, 104, '#c81c1c', 16, null); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tLaugh) { courtroom(c, t); person(c, RICH, 160, 164, { k: 'lg', arm: 'wave', expr: 'smile' }); for (let i = 0; i < 4; i++) if (Math.sin(t * 8 + i * 1.7) > 0.7) glow(c, 30 + i * 90, 140, 20, 16, '#ffffff', 0.6); stamp(c, t, S.tLaugh + 0.6, 250, 60, '死刑×12', 90); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tAsk) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'jd' }); person(c, RICH, 160, 164, { k: 'ak', flip: true }); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tVerd) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'jv' }); yearFlash(c, t, S.tVerd + 0.2, '1989', 216, 10, '9月'); stamp(c, t, at(S, 'L36', 2) - 0.1, 160, 140, '有罪', 80); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tJury) { courtroom(c, t); for (let i = 0; i < 6; i++) person(c, FOLK[i], 30 + i * 22, 164, { k: 'jr' + i, blink: i === 1 ? 2 : blinkOf(t, i) }); if (t > at(S, 'L35b', 1)) TX(c, 'Z z', 50, 96, '#c8c8e8', 16, null); plate(c, 140, 40, '悪魔の力？', '#f8c8c8'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tPalm) { R(c, 0, 0, W, H, '#2c2018'); E(c, 160, 100, 40, 46, '#c89c74'); for (let i = 0; i < 4; i++) R(c, 128 + i * 18, 34, 12, 30, '#c89c74'); R(c, 104, 96, 20, 12, '#c89c74'); pentagram(c, 160, 104, 22, '#1c0c10', 1); return { z: 1.04, fx: 160, fy: 100 }; }
    courtroom(c, t); person(c, RICH, 160, 164, { k: 'cl' }); for (let i = 0; i < 6; i++) { const k = sg(t, 0.4 + i * 0.5, 0.8 + i * 0.5); if (k > 0) { c.save(); c.globalAlpha = 1 - sg(t, 1.2 + i * 0.5, 1.6 + i * 0.5); person(c, DETS[i % 3], 60 + i * 40, 164, { k: 'lw' + i, flip: true }); c.restore(); } } plate(c, 20, 40, '弁護士を6人、解任', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V2', RGRIN], ['V3', RGRIN]]);

/* ---- QM: San Quentin — 24 years of appeals, a prison wedding; 2013, dead at 53, never executed; ending: one fingerprint and ordinary people (moves: the calendar pages fall, the cell light, the street at dawn) ---- */
const QM = {
  name: 'その後', ch: 'その後', bgm: 'requiem',
  init(S) { S.tDeath = at(S, 'L40', 0) - 0.3; S.tEnd2 = at(S, 'L41', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tEnd2) { barrio(c, t); for (let i = 0; i < 6; i++) person(c, FOLK[i], 40 + i * 48, 164, { k: 'en' + i, blink: blinkOf(t, i + 1) }); thumbprint(c, 270, 70, 1.2, '#f8e8a0', 0.6); return { z: 1.03 + 0.04 * ss(sg(t, S.tEnd2, S.tEnd2 + 8)), fx: 160, fy: 110 }; }
    if (t > S.tDeath) { cellBg(c, t); dim(c, 0.5); yearFlash(c, t, S.tDeath + 1.5, '2013', 216, 10, '6月7日'); stamp(c, t, S.tDeath + 0.4, 100, 70, '執行されず', 110, '#5c5c5c'); return { z: 1.03, fx: 160, fy: 100 }; }
    cellBg(c, t); person(c, RICH, 80, 166, { k: 'cl', blink: blinkOf(t, 4) }); const yr = 1989 + Math.floor(sg(t, 0.5, S.tDeath - 1) * 24); R(c, 150, 70, 60, 44, '#f4f0e8'); R(c, 150, 70, 60, 12, '#c81c1c'); TX(c, String(yr), 160, 86, '#2c2c2c', 16, null); plate(c, 20, 40, 'サン・クエンティン', '#f8e8b0');
    return { z: 1.03, fx: 140, fy: 110 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '一面の顔', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { R(c, 0, 0, W, H, '#2c2820'); newspaper(c, 85, 30, 150, 132, { face: true, head: 'WANTED' }); return { z: 1.04 + 0.04 * ss(sg(t, 0, S.dur)), fx: 160, fy: 100 }; } };
const SS2 = { name: 'レジへ', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { store(c, t, { face: true, goods: true }); person(c, CLERK, 290, 164, { k: 's2c', flip: true }); person(c, RICH, lerp(120, 180, sg(t, 0, S.dur)), 164, { k: 's2', f: Math.floor(t * 5) & 3 }); return { z: 1.05 + 0.15 * ss(sg(t, 0, S.dur)), fx: 222, fy: 96 }; } };
