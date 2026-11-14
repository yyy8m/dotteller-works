/* ================= 記録 #012 タマム・シュッド事件: scenes ================= */
const BY = 146; // the man lies at this sand line

/* ---- YX: cold open — the night beach, the man under the lamp, the scrap (moves: waves, the lamp flickers, the scrap unrolls) ---- */
const YX = {
  name: 'ソマートン海岸', ch: '浜辺の男', bgm: 'eerie',
  init(S) { S.tScrap = at(S, 'C1', 3) - 0.3; S.tWord = at(S, 'C1', 5) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (inLine(S, t, 'M1') || t > S.tScrap) { // the scrap close-up
      R(c, 0, 0, W, H, '#0c0a10'); glow(c, 160, 90, 130, 70, '#f8e8b0', 0.18);
      const u = inLine(S, t, 'M1') ? 1 : sg(t, S.tScrap + 0.2, S.tWord); scrap(c, 160, 84, u, 2.6);
      if (inLine(S, t, 'M1') && t > at(S, 'M1', 1) - 0.3) bigCap(c, '「終わった」', 120, 24, '#f8d860', sg(t, at(S, 'M1', 1) - 0.3, at(S, 'M1', 1) + 0.2));
      return { z: 1.02 + 0.03 * Math.sin(t * 0.4), fx: 160, fy: 90 };
    }
    beach(c, t, { night: t < at(S, 'C0', 1) - 0.3, dawn: t >= at(S, 'C0', 1) - 0.3, lamp: true });
    if (t > at(S, 'C0', 4) - 0.3) somLying(c, 190, BY, { k: 'x' });
    capPlate(c, t, at(S, 'C0', 0) + 0.2, ['1948年12月1日', 'ソマートン・パーク']);
    if (t > at(S, 'C1', 0) - 0.3) { dim(c, 0.35); stamp(c, t, at(S, 'C1', 0), 230, 60, '名前？', 80); stamp(c, t, at(S, 'C1', 1), 230, 100, '死因？', 80); }
    return { z: 1.03 + 0.06 * ss(sg(t, 0, S.tScrap)), fx: 150, fy: 120 };
  }
};

/* ---- YA: the jeweller finds him; the cigarettes (moves: the finder walks up, waves) ---- */
const YA = withCuts({
  name: '発見', ch: '発見', bgm: 'memory',
  init(S) { S.tLie = at(S, 'L1', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    beach(c, t, { dawn: true, lamp: true });
    somLying(c, 190, BY);
    const k = sg(t, 0.3, S.tLie); man(c, LYONS, lerp(330, 250, k), BY + 8, { f: k < 1 ? Math.floor(t * 5) & 3 : -1, flip: true, arm: k >= 1 ? 'point' : null, expr: k >= 1 ? 'shock' : 'normal', k: 'ly' });
    if (k >= 1) exclaim(c, 244, BY - 60, t - S.tLie);
    capPlate(c, t, 0.4, ['発見者', '近所の宝石商']);
    return { z: 1.04 + 0.04 * ss(sg(t, S.tLie, S.dur)), fx: lerp(190, 130, ss(sg(t, S.tLie, S.dur))), fy: 128 };
  }
}, [['L2', (c, t, S) => closeUp(c, t, somFace({ blink: 2, cig: true }), { bg: ['#1c1c2c', '#5c4c5c'], glow: '#f8d8a0', talk: false })]]);

/* ---- YB: the pockets — items laid out one by one; what is missing (moves: each item drops in, labels cut away) ---- */
const YB = {
  name: '所持品', ch: '所持品', bgm: 'pulse',
  init(S) { S.tNo = at(S, 'L4', 1) - 0.3; S.tTag = at(S, 'L4', 5) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#1c1814'); R(c, 14, 14, 292, 120, '#3c4c3c'); R(c, 16, 16, 288, 116, '#4c5c44');
    if (t < S.tNo) {
      if (t < at(S, 'L3', 1) - 0.3) { R(c, 130, 50, 60, 50, '#5c4c3c'); R(c, 134, 54, 52, 20, '#3c2c1c'); E(c, 160, 64, 14, 4, '#1c140c'); }
      const items = [[1, '列車の切符', (x, y) => { R(c, x - 16, y - 8, 32, 16, '#8cc88c'); R(c, x - 14, y - 6, 28, 2, '#3c6c3c'); R(c, x - 14, y + 2, 20, 1, '#3c6c3c'); }], [2, 'バスの切符', (x, y) => { R(c, x - 14, y - 7, 28, 14, '#f0e0a0'); E(c, x + 8, y, 3, 3, '#4c5c44'); }], [3, 'くし', (x, y) => { R(c, x - 16, y - 3, 32, 4, '#c8ccd4'); for (let i = 0; i < 15; i++) R(c, x - 15 + i * 2, y + 1, 1, 6, '#a8acb4'); }], [4, 'ガム', (x, y) => { R(c, x - 12, y - 6, 24, 12, '#f8e070'); R(c, x - 12, y - 1, 24, 2, '#e85c3c'); }], [5, 'マッチ', (x, y) => { R(c, x - 12, y - 8, 24, 16, '#c83c2c'); R(c, x - 10, y - 6, 20, 12, '#f0e0c0'); E(c, x, y, 4, 4, '#c83c2c'); }]];
      items.forEach(([seg, name, fn], i) => { const t0 = at(S, 'L3', seg) - 0.3, k = eOut(sg(t, t0, t0 + 0.3)); if (k <= 0) return; const [x, y] = [[60, 42], [160, 42], [260, 42], [110, 92], [210, 92]][i]; fn(x, lerp(y - 10, y, k)); if (k >= 1) { const w = textSpr(name, 16, '#f4f0e8').width; TX(c, name, Math.round(x - w / 2), y + 10, '#f4f0e8', 16, '#000000'); } });
      return { z: 1.02, fx: 160, fy: 74 };
    }
    if (t < S.tTag) { [['財布', 2], ['帽子', 2], ['身分証', 3]].forEach(([s, w], i) => { const t0 = at(S, 'L4', 1 + i) - 0.3; if (t < t0) return; const x = 100 + i * 60; R(c, x - 26, 40, 52, 60, '#2c3c2c'); const tw = textSpr(s, 16, '#f4f0e8').width; TX(c, s, Math.round(x - tw / 2), 104, '#f4f0e8', 16, '#000000'); if (t > t0 + 0.3) cross(c, x, 70, 16); if (i === 0) { R(c, x - 14, 60, 28, 18, '#5c3c24'); } else if (i === 1) { E(c, x, 72, 20, 5, '#3c3428'); R(c, x - 11, 56, 22, 16, '#3c3428'); } else { R(c, x - 12, 58, 24, 18, '#e8e0cc'); R(c, x - 9, 62, 8, 10, '#a8a49c'); } }); return { z: 1.02, fx: 160, fy: 74 }; }
    // the jacket lining: the maker's tag has been cut out
    R(c, 70, 24, 180, 106, '#5c4c3c'); R(c, 76, 30, 168, 94, '#8c7c6c'); L(c, 160, 30, 160, 124, '#6c5c4c');
    const k = sg(t, S.tTag + 0.4, S.tTag + 1.6); R(c, 136, 46, 48, 20, '#f4f0e8'); TX(c, 'TAILOR', 137, 47, '#3c3c44', 16, null); if (k > 0) { c.save(); c.globalAlpha = k; R(c, 134, 44, 52, 24, '#8c7c6c'); for (let i = 0; i < 7; i++) R(c, 134 + i * 8, 44 + (i & 1) * 22, 2, 2, '#f4f0e8'); c.restore(); }
    if (k >= 1) stamp(c, t, S.tTag + 1.8, 160, 96, 'タグなし', 90);
    return { z: 1.03, fx: 160, fy: 76 };
  }
};

/* ---- YC: the evening before — a couple sees a man lying there (moves: dusk falls, mosquitoes buzz) ---- */
const YC = {
  name: '前の晩', ch: '前の晩の目撃', bgm: 'memory',
  init(S) { S.tMosq = at(S, 'L5', 4) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    beach(c, t, { dusk: true, lamp: true });
    somLying(c, 190, BY, { k: 'ev' }); if (t > S.tMosq) for (let i = 0; i < 5; i++) { const a = t * 6 + i * 1.7; R(c, 120 + Math.cos(a) * 12 + i * 8, BY - 24 + Math.sin(a * 1.3) * 6, 2, 2, '#1c1c1c'); }
    man(c, COUPLE[0], 236, BY + 6, { flip: true, k: 'cp', arm: t > S.tMosq ? 'point' : null }); woman(c, COUPLE[1], 260, BY + 6, { flip: true, k: 'cp' });
    if (t > at(S, 'L5', 5) - 0.3) { const k = sg(t, at(S, 'L5', 5) - 0.3, at(S, 'L5', 5)); c.save(); c.globalAlpha = k; R(c, 196, 56, 92, 30, '#f4f0e8'); PF(c, [226, 86, 236, 86, 232, 94], '#f4f0e8'); TX(c, '酔っ払いか', 204, 62, '#2c2c34', 16, null); c.restore(); }
    yearFlash(c, t, 0.3, 1948, 8, 10, '11月30日');
    return { z: 1.04, fx: 190, fy: 120 };
  }
};

/* ---- YD: the autopsy; "almost certainly poison"; photographs and fingerprints around the world (moves: the globe turns, cards fly out) ---- */
const YD = withCuts({
  name: '検視', ch: '検視', bgm: 'dread',
  init(S) { S.tPoison = at(S, 'L7', 0) - 0.3; S.tNone = at(S, 'L7', 3) - 0.3; S.tWorld = at(S, 'L8', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWorld) { R(c, 0, 0, W, H, '#0c1424'); globe(c, 160, 76, 48, t); for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + 0.3, u = fr(sg(t, S.tWorld + 0.3, S.tWorld + 4) * 1.8 + i * 0.13); if (t < S.tWorld + 0.4) continue; const x = 160 + Math.cos(a) * (40 + u * 110), y = 80 + Math.sin(a) * (26 + u * 30); R(c, x - 7, y - 9, 14, 18, '#f4f0e8'); R(c, x - 5, y - 7, 10, 10, '#a8a49c'); E(c, x, y - 4, 3, 3, '#5c5850'); } if (t > at(S, 'L8', 3) - 0.3) stamp(c, t, at(S, 'L8', 4), 160, 110, '該当者なし', 110); return { z: 1.02, fx: 160, fy: 80 }; }
    R(c, 0, 0, W, H, '#2c2c34'); for (let x = 0; x < W; x += 20) R(c, x, 0, 10, 150, '#34343c'); R(c, 0, 150, W, 90, '#3c3c40');
    const sw = Math.sin(t * 1.1) * 6; L(c, 160, 0, 160 + sw, 30, '#1c1c1c'); PF(c, [150 + sw, 30, 170 + sw, 30, 176 + sw, 40, 144 + sw, 40], '#8c8c7c'); softBeam(c, 160 + sw, 40, Math.PI / 2, 100, 0.5, 0.18);
    R(c, 90, 112, 140, 10, '#a8a8b0'); R(c, 98, 122, 6, 34, '#6c6c74'); R(c, 216, 122, 6, 34, '#6c6c74'); sheetBody(c, 160, 108, 110);
    if (t < S.tPoison) { R(c, 14, 20, 112, 70, '#f0e8d4'); TX(c, '40〜45歳', 22, 26, '#2c2c34', 16, null); if (t > at(S, 'L6', 1) - 0.3) TX(c, '健康', 22, 46, '#2c7c3c', 16, null); if (t > at(S, 'L6', 3) - 0.3) TX(c, 'ふくらはぎ', 22, 66, '#2c2c34', 16, null); if (t > at(S, 'L6', 4) - 0.3) { const k = sg(t, at(S, 'L6', 4) - 0.3, at(S, 'L6', 4) + 1); const x = 270 + Math.sin(k * TAU) * 6; blit(c, robeFig({ id: 'bal', robe: '#f4d8e8', robe2: '#e8c8d8', trim: '#f4d8e8', sash: '#c87c9c', skin: '#f0c8a8', hair: '#3c2818', female: true }, { arm: 'up', k: 'bal' }), x, 96, 13, 57); } }
    else { R(c, 236, 30, 70, 70, '#f0e8d4'); for (let i = 0; i < 3; i++) { R(c, 246 + i * 18, 44, 10, 30, '#a8c8d8'); E(c, 251 + i * 18, 70 - Math.sin(t * 2 + i) * 2, 4, 3, '#8cf87c'); } TX(c, '毒？', 254, 78, '#a81c1c', 16, null); if (t > S.tNone) stamp(c, t, S.tNone + 0.4, 270, 64, '検出されず', 100); }
    return { z: 1.03, fx: 160, fy: 96 };
  }
}, [['D1', (c, t, S) => closeUp(c, t, coronerFace({ blink: blinkOf(t, 5) }), { bg: ['#141c24', '#3c4c5c'], glow: '#d8e8f8' })]]);

/* ---- YE: Adelaide station — the brown suitcase (moves: the case slides out, opens, the orange thread glows) ---- */
const YE = {
  name: 'アデレード駅', ch: '茶色のスーツケース', bgm: 'pulse',
  init(S) { S.tFound = at(S, 'L9', 2) - 0.3; S.tOpen = at(S, 'L10', 0) - 0.3; S.tThread = at(S, 'L10', 6) - 0.3; S.tKeane = at(S, 'L11', 2) - 0.3; S.tNone = at(S, 'L11', 5) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tOpen) { // the case open on a table
      R(c, 0, 0, W, H, '#241c14'); glow(c, 160, 70, 140, 60, '#f8d8a0', 0.2); R(c, 30, 120, 260, 12, '#5c3c24');
      R(c, 40, 30, 240, 90, '#5c3c1c'); R(c, 46, 36, 228, 78, '#8c6c4c');
      const show = (seg, fn) => { if (t > at(S, 'L10', seg) - 0.3) fn(); };
      show(1, () => { R(c, 54, 44, 50, 34, '#c83c3c'); for (let i = 0; i < 5; i++) { R(c, 54 + i * 10, 44, 2, 34, '#8c1c1c'); R(c, 54, 44 + i * 7, 50, 1, '#8c1c1c'); } });
      show(2, () => { E(c, 128, 60, 12, 6, '#a82c2c'); E(c, 130, 72, 12, 6, '#a82c2c'); });
      show(3, () => { R(c, 160, 50, 26, 4, '#c8ccd4'); R(c, 186, 48, 12, 8, '#3c2c1c'); });
      show(4, () => { R(c, 160, 70, 28, 3, '#e8ecf4'); R(c, 188, 69, 10, 5, '#3c2c1c'); });
      if (t > S.tThread) { const k = 0.3 + 0.2 * Math.sin(t * 4); glow(c, 234, 70, 22, 16, '#f8a040', k); } show(6, () => { R(c, 222, 58, 24, 24, '#e0d4b8'); for (let i = 0; i < 5; i++) R(c, 224, 62 + i * 4, 20, 2, '#f8841c'); });
      if (t > S.tKeane) { R(c, 112, 86, 96, 22, '#f4f0e8'); TX(c, 'T. KEANE', 124, 89, '#2c2c34', 16, null); }
      if (t > S.tNone) stamp(c, t, S.tNone + 1, 160, 70, '行方不明者 0', 120);
      return { z: 1.03, fx: 160, fy: 76 };
    }
    R(c, 0, 0, W, H, '#3c3428'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#443a2c'); R(c, 0, 150, W, 90, '#2c2418');
    for (let row = 0; row < 3; row++) { R(c, 20, 40 + row * 36, 280, 4, '#5c3c24'); for (let i = 0; i < 6; i++) { if (row === 1 && i === 3) continue; suitcase(c, 28 + i * 46, 18 + row * 36, { w: 38, h: 22 }); } }
    const k = eOut(sg(t, S.tFound, S.tFound + 1)); if (t > S.tFound) { suitcase(c, 166, lerp(54, 104, k), { w: 44, h: 30 }); glow(c, 188, lerp(70, 118, k), 30, 20, '#f8d8a0', 0.2 * k); }
    man(c, { id: 'clk', coat: '#2c3c2c', coat2: '#1c2c1c', pants: '#2c3428', boots: '#141414', skin: '#e8c0a0', hair: '#3c2818', hat: 'bowler', hatCol: '#2c3c2c' }, 250, 162, { flip: true, k: 'clk', arm: t > S.tFound ? 'point' : null });
    yearFlash(c, t, 0.2, 1949, 216, 10, '1月14日'); capPlate(c, t, 0.6, ['アデレード駅', '荷物預かり所']);
    if (t > at(S, 'L9', 3) - 0.3) { R(c, 20, 112, 110, 22, '#000000'); TX(c, '預けた日 11/30', 24, 114, '#f8d860', 16, null); }
    return { z: 1.03, fx: 180, fy: 96 };
  }
};

/* ---- YF: the hidden pocket and the scrap; the Rubaiyat (moves: the scrap slides out and unrolls, book pages turn) ---- */
const YF = {
  name: '隠しポケット', ch: 'タマム・シュッド', bgm: 'eerie',
  init(S) { S.tOut = at(S, 'L12', 3) - 0.3; S.tWord = at(S, 'L13', 1) - 0.3; S.tBook = at(S, 'L13', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#14100c'); glow(c, 160, 80, 140, 60, '#f8e8b0', 0.15);
    if (t > S.tBook) { book(c, 60, 26); TX(c, 'RUBAIYAT', 63, 96, '#f8d860', 16, null); const k = sg(t, S.tBook + 0.4, at(S, 'L13', 4)); R(c, 170, 26, 100, 96, '#e8dcc0'); for (let i = 0; i < 4; i++) R(c, 180, 56 + i * 9, 80 - (i * 13) % 20, 1, '#8c8474'); if (k > 0) { R(c, 196, 96, 52, 16, DA('#f8d860', 0.3 * k)); TX(c, 'Tamám Shud', 180, 96, '#2c2420', 16, null); } if (t > at(S, 'L13', 4) - 0.3) TX(c, '最後のページ', 174, 30, '#a81c1c', 16, null); return { z: 1.03, fx: 160, fy: 76 }; }
    // trousers: the waistband with a sewn-in pocket
    R(c, 70, 20, 180, 120, '#7c6c58'); R(c, 70, 20, 180, 14, '#5c4c3c'); for (let i = 0; i < 5; i++) R(c, 80 + i * 40, 20, 6, 14, '#8c7c68'); L(c, 160, 34, 160, 140, '#5c4c3c');
    R(c, 110, 44, 50, 40, '#5c4c3c'); for (let i = 0; i < 12; i++) R(c, 112 + i * 4, 44, 2, 1, '#e8d8a8'); for (let i = 0; i < 10; i++) R(c, 110, 46 + i * 4, 1, 2, '#e8d8a8'); for (let i = 0; i < 10; i++) R(c, 159, 46 + i * 4, 1, 2, '#e8d8a8');
    if (t > S.tOut) { const k = eOut(sg(t, S.tOut, S.tOut + 1)); scrap(c, lerp(135, 160, k), lerp(64, 80, k), sg(t, S.tOut + 0.8, S.tOut + 1.6), lerp(0.8, 1.6, k)); }
    if (t > S.tWord) bigCap(c, '「終わった」', 108, 24, '#f8d860', sg(t, S.tWord, S.tWord + 0.4));
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tOut)), fx: 150, fy: 70 };
  }
};

/* ---- YG: Glenelg — a book left on a back seat; the torn last page (moves: the car's shadow, the page flutters) ---- */
const YG = {
  name: 'グレネルグ', ch: '車の中の本', bgm: 'pulse',
  init(S) { S.tCar = at(S, 'L14', 3) - 0.3; S.tTorn = at(S, 'L15', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTorn - 1.2) { R(c, 0, 0, W, H, '#14100c'); glow(c, 160, 80, 140, 60, '#f8e8b0', 0.15); R(c, 90, 22, 140, 110, '#e8dcc0'); for (let i = 0; i < 8; i++) R(c, 104, 34 + i * 9, 110 - (i * 13) % 24, 1, '#8c8474'); const k = sg(t, S.tTorn, S.tTorn + 0.8); if (k > 0) { PF(c, [150, 132, 156, 110, 170, 116, 186, 106, 196, 120, 204, 112, 210, 132], '#14100c'); const f = Math.sin(t * 6) * 3; scrap(c, lerp(180, 270, k), lerp(124, 60 + f, k), 0.2, 1.2); } return { z: 1.03, fx: 160, fy: 80 }; }
    beachSky(c, t, {}); street(c, 140); for (let i = 0; i < 4; i++) bungalow(c, 10 + i * 82, 140, { col: ['#d8c8a8', '#c8d0c0', '#e0d0b8', '#c8b8a8'][i] });
    car(c, 110, 160, { book: true }); if (t > S.tCar) { const k = sg(t, S.tCar, S.tCar + 0.6); c.save(); c.globalAlpha = k; ER(c, 152, 136, 16, 10, '#f8d860'); c.restore(); }
    man(c, COPS[0], 270, 166, { flip: true, k: 'cp' }); man(c, { id: 'own', coat: '#6c6c5c', coat2: '#5c5c4c', pants: '#4c4c40', boots: '#2c2c2c', skin: '#e8c0a0', hair: '#3c2818', hat: 'bowler', hatCol: '#4c4c40' }, 244, 166, { k: 'own', arm: 'reach', flip: true });
    capPlate(c, t, 0.4, ['届けられた本', 'ルバイヤート']);
    if (t > at(S, 'L14', 4) - 0.3) stamp(c, t, at(S, 'L14', 4), 200, 60, '誰が？', 70);
    return { z: 1.03, fx: 170, fy: 120 };
  }
};

/* ---- YH: the code on the back cover (moves: letters are written one by one, a question mark pulses) ---- */
const YH = {
  name: '暗号', ch: '解けない暗号', bgm: 'dread',
  init(S) { S.tCode = at(S, 'L16', 2) - 0.3; S.tNo = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#0c0a10'); glow(c, 160, 70, 140, 70, '#f8e8b0', 0.14);
    codePage(c, 85, 22, t, S.tCode);
    if (t < S.tCode) { const px = 100 + Math.sin(t * 3) * 30, py = 30; L(c, px, py, px + 26, py - 26, '#c8a860', 3); R(c, px - 1, py - 1, 3, 3, '#2c2c2c'); }
    if (t > S.tNo) { const ppl = [['専門家', '#2c3448'], ['軍', '#3c4c2c']]; ppl.forEach(([s, col], i) => { const t0 = at(S, 'L17', i) - 0.3; if (t < t0) return; const x = i ? 290 : 40; man(c, { id: 'cx' + i, coat: col, coat2: shadeCol(col, 0.8), pants: '#2c2c34', boots: '#141414', skin: '#e8c0a0', hair: '#3c2818', hat: 'bowler', hatCol: col }, x, 130, { flip: !!i, k: 'cx', expr: 'sad' }); const w = textSpr(s, 16, '#f4f0e8').width; TX(c, s, Math.round(x - w / 2), 50, '#f4f0e8', 16, '#000000'); }); if (t > at(S, 'L17', 2) - 0.3) stamp(c, t, at(S, 'L17', 2), 160, 112, '未解読', 80); }
    return { z: 1.03 + 0.03 * ss(sg(t, S.tCode, S.dur)), fx: 160, fy: 70 };
  }
};

/* ---- YI: the phone number; the nurse 400 m away; the plaster bust; her name kept off the record (moves: the route draws, the folder closes) ---- */
const YI = withCuts({
  name: '元看護師', ch: '電話番号の女性', bgm: 'memory',
  init(S) { S.tMap = at(S, 'L18', 3) - 0.3; S.tBust = at(S, 'L19', 0) - 0.3; S.tName = at(S, 'L20', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#1c1814'); R(c, 70, 20, 180, 112, '#c8a868'); R(c, 76, 26, 168, 100, '#e8dcc0'); TX(c, '捜査記録', 88, 30, '#3c3c44', 16, null); for (let i = 0; i < 4; i++) R(c, 88, 56 + i * 16, 140, 1, '#8c8474'); TX(c, '女性：', 88, 62, '#3c3c44', 16, null); R(c, 138, 62, 90, 16, '#141414'); if (t > at(S, 'L20', 4) - 0.3) stamp(c, t, at(S, 'L20', 5), 170, 104, '調査できず', 100); return { z: 1.03, fx: 160, fy: 76 }; }
    if (t > S.tBust) { // a front room: the nurse sees the plaster bust
      R(c, 0, 0, W, H, '#3c3428'); for (let x = 0; x < W; x += 24) R(c, x, 0, 12, 150, '#443a2c'); R(c, 0, 150, W, 90, '#2c2418'); R(c, 120, 100, 60, 50, '#5c3c24');
      blit(c, somFace({ bust: true }), 150, 92, 24, 46, { s: 1.4 });
      const shock = t > at(S, 'L19', 4) - 0.3; woman(c, NURSE, 220, 162, { flip: true, k: 'nu', expr: shock ? 'shock' : 'normal', arm: shock ? 'clasp' : null }); man(c, LEANE, 70, 162, { k: 'le' });
      if (shock) exclaim(c, 222, 96, t - at(S, 'L19', 4));
      return { z: 1.04, fx: 160, fy: 100 };
    }
    if (t > S.tMap) { // the map: the body's spot, and her house 400 m north
      R(c, 0, 0, W, H, '#c8d8c0'); R(c, 0, 0, 60, H, '#2c7cb0'); for (let i = 0; i < 8; i++) R(c, 60, i * 30, 4, 30, '#e4d4a4'); for (let y = 20; y < H; y += 40) R(c, 64, y, W, 6, '#f4f0e8'); for (let x = 120; x < W; x += 70) R(c, x, 0, 6, H, '#f4f0e8');
      const k = sg(t, S.tMap + 0.4, at(S, 'L18', 5)); cross(c, 80, 120, 7); TX(c, '遺体', 92, 112, '#a81c1c', 16, '#f4f0e8'); L(c, 80, 120, 80, lerp(120, 40, k), '#c81818', 2); if (k >= 1) { R(c, 74, 26, 14, 12, '#7c3c2c'); TX(c, '元看護師の家', 92, 22, '#2c2c34', 16, '#f4f0e8'); TX(c, '400m', 92, 64, '#c81818', 16, '#f4f0e8'); }
      return { z: 1.02, fx: 140, fy: 80 };
    }
    // the back cover: a phone number
    R(c, 0, 0, W, H, '#0c0a10'); glow(c, 160, 70, 140, 70, '#f8e8b0', 0.14); codePage(c, 85, 12, t, 0, { all: true }); dim(c, 0.4);
    const k = sg(t, at(S, 'L18', 1) - 0.3, at(S, 'L18', 1) + 0.3); if (k > 0) { R(c, 110, 50, 100, 30, '#f4f0e8'); TX(c, 'TEL ×××', 122, 56, '#2c2c34', 16, null); ER(c, 160, 65, 56 * k, 22 * k, '#c81818'); }
    return { z: 1.03, fx: 160, fy: 70 };
  }
}, [['P1', (c, t, S) => closeUp(c, t, leaneFace({ blink: blinkOf(t, 5) }), { bg: ['#141418', '#3c3c4c'], glow: '#d8d8f0' })]]);

/* ---- YJ: June 1949 — the burial; years later, flowers (moves: the mourners bow, flowers appear) ---- */
const YJ = {
  name: '埋葬', ch: '名前のない墓', bgm: 'requiem',
  init(S) { S.tLater = at(S, 'L22', 0) - 0.3; S.tFlower = at(S, 'L22', 3) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    beachSky(c, t, { dusk: t > S.tLater }); R(c, 0, 104, W, 136, t > S.tLater ? '#4c5c3c' : '#5c6c4c'); for (let i = 0; i < 6; i++) { const x = 14 + i * 54; if (x > 120 && x < 200) continue; grave(c, x, 130, {}); }
    bareTree(c, 300, 140, 80, 3); grave(c, 160, 128);
    if (t < S.tLater) { ARMY.forEach((st, i) => man(c, st, 100 + i * 30 + (i > 1 ? 60 : 0), 172, { k: 'sa', expr: 'sad', flip: i > 1 })); yearFlash(c, t, 0.3, 1949, 216, 10, '6月14日'); capPlate(c, t, 0.7, ['ウエスト・テラス墓地', '救世軍の葬儀']); }
    else { capPlate(c, t, S.tLater + 0.2, ['数年後']); const n = sg(t, S.tFlower, S.tFlower + 2) * 6; for (let i = 0; i < 6; i++) { if (n < i + 0.5) continue; const x = 144 + i * 6; L(c, x, 132, x + (i - 2.5), 122, '#3c7c3c'); E(c, x + (i - 2.5), 121, 3, 3, ['#e84c5c', '#f8d860', '#f4f0e8'][i % 3]); } }
    return { z: 1.03 + 0.04 * ss(sg(t, S.tLater, S.dur)), fx: 160, fy: 120 };
  }
};

/* ---- YK: the Cold War spy rumour; 1994, digitalis (moves: a searchlight sweeps, foxgloves sway) ---- */
const YK = {
  name: '冷戦', ch: 'スパイ説と毒', bgm: 'dread',
  init(S) { S.t94 = at(S, 'L24', 0) - 0.3; S.tWho = at(S, 'L24', 4) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.t94) { R(c, 0, 0, W, H, '#1c1824'); glow(c, 160, 80, 120, 70, '#c87cc8', 0.15); foxglove(c, 110, 140, t, 1.4); foxglove(c, 150, 144, t + 1, 1.1); if (t < at(S, 'L24', 2) - 0.3) yearFlash(c, t, S.t94 + 0.2, 1994, 216, 10, '再調査'); if (t > at(S, 'L24', 2) - 0.3) bigCap(c, 'ジギタリス', 28, 24, '#e8a8e8', sg(t, at(S, 'L24', 2) - 0.3, at(S, 'L24', 2) + 0.2)); if (t > S.tWho) { dim(c, 0.4); stamp(c, t, S.tWho + 0.6, 230, 110, '身元不明', 90); } return { z: 1.03, fx: 150, fy: 100 }; }
    R(c, 0, 0, W, H, '#0c0c14'); for (let i = 0; i < 6; i++) R(c, i * 56, 60, 50, 100, '#141420'); for (let i = 0; i < 6; i++) for (let k = 0; k < 4; k++) R(c, i * 56 + 8 + (k % 2) * 20, 70 + Math.floor(k / 2) * 30, 10, 12, hash(i * 7 + k + Math.floor(t)) > 0.7 ? '#f8d880' : '#1c1c2c');
    const a = Math.PI / 2 + Math.sin(t * 0.8) * 0.6; softBeam(c, 160, 0, a, 220, 0.12, 0.25, '#d8e8f8');
    blit(c, tintSpr(suitFig({ ...SOM, id: 'spy', hat: 'bowler', hatCol: '#141414' }, { k: 'spy' }), '#06060a', 'spyt'), 160, 172, 13, 57, { s: 1.6 });
    bigCap(c, 'スパイ？', 24, 24, '#f4f0e8', sg(t, at(S, 'L23', 1) - 0.3, at(S, 'L23', 1) + 0.3));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- YL: what was lost; 2022 DNA; the questions (moves: the case falls away, the helix spins) ---- */
const YL = {
  name: 'その後', ch: '消えた証拠とDNA', bgm: 'memory',
  init(S) { S.t86 = at(S, 'L25', 3) - 0.3; S.tDNA = at(S, 'L26', 0) - 0.3; S.tQ = at(S, 'L27', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tQ) { beach(c, t, { dusk: true }); dim(c, 0.3); const q = [['なぜ浜辺で？', 1], ['暗号の意味は？', 3]]; q.forEach(([s, seg], i) => { if (t > at(S, 'L27', seg) - 0.3 && t < at(S, 'L27', 5) + 0.05) bigCap(c, s, 20 + i * 36, 24, '#f4f0e8', sg(t, at(S, 'L27', seg) - 0.3, at(S, 'L27', seg) + 0.2)); }); if (t > at(S, 'L27', 5) - 0.3) stamp(c, t, at(S, 'L27', 5), 160, 70, '答えは まだ', 110); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tDNA) { R(c, 0, 0, W, H, '#0c1424'); helix(c, 40, 70, t); yearFlash(c, t, S.tDNA + 0.2, 2022, 200, 10, 'DNA検査'); if (t > at(S, 'L26', 2) - 0.3) { const k = eOut(sg(t, at(S, 'L26', 2) - 0.3, at(S, 'L26', 2) + 0.2)); R(c, lerp(320, 70, k), 96, 176, 38, '#f4f0e8'); TX(c, 'Carl Charles Webb', lerp(320, 76, k), 97, '#2c2c34', 16, null); TX(c, '1905年生まれ', lerp(320, 76, k), 114, '#a81c1c', 16, null); } return { z: 1.02, fx: 160, fy: 80 }; }
    R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 70, 130, 60, '#f8d8a0', 0.15);
    const kb = sg(t, at(S, 'L25', 2) - 0.3, at(S, 'L25', 2) + 1.2); if (kb < 1) { c.save(); c.globalAlpha = 1 - kb; book(c, 215, 34); c.restore(); } capPlate(c, t, 0.2, ['1950年代', 'ルバイヤートが紛失']);
    if (t > S.t86) { const k = sg(t, at(S, 'L25', 7) - 0.3, at(S, 'L25', 7) + 1); suitcase(c, 170, 60 + k * 120, { w: 70, h: 46 }); if (k > 0) for (let i = 0; i < 5; i++) R(c, 160 + i * 18, 128, 10, 4, '#5c5850'); TX(c, '1986年', 230, 40, '#f8d860', 16, '#000000'); if (k >= 1) stamp(c, t, at(S, 'L25', 7) + 1, 200, 96, '破棄', 70); }
    return { z: 1.02, fx: 160, fy: 80 };
  }
};

/* ---- YM: ending — the empty beach at dusk, the scrap blows out to sea (moves: waves, the scrap flutters away) ---- */
const YM = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tNot = at(S, 'L28', 2) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    beach(c, t, { dusk: true, lamp: true });
    const u = sg(t, 0.4, S.tNot + 2); const x = lerp(110, 240, u), y = lerp(BY - 10, 60, u) + Math.sin(t * 5) * 3; if (u < 1) { c.save(); c.globalAlpha = 1 - sg(u, 0.75, 1); scrap(c, x, y, 1, lerp(1.2, 0.6, u)); c.restore(); }
    if (t > S.tNot) stamp(c, t, S.tNot + 1.6, 160, 60, '未解決', 80);
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 110 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { beach(c, t, { night: true, lamp: true }); somLying(c, 190, BY, { k: 's1' }); if (t > at(S, 'S1', 2) - 0.3) { dim(c, 0.4); scrap(c, 160, 70, sg(t, at(S, 'S1', 2), at(S, 'S1', 3)), 1.3); } return { z: 1.1, fx: 150, fy: 110 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { beach(c, t, { night: true, lamp: true }); somLying(c, 190, BY, { k: 's2' }); dim(c, 0.35); return { z: 1.12, fx: 160, fy: 120 }; }
};
