/* ================= 記録 #008 メアリー・セレスト号事件: scenes ================= */
const SEA_Y = 132; // waterline for ships seen from afar (kept above the dialog window by wideDY)

/* ---- YX: cold open — a ship under sail with nobody aboard ---- */
const YX = withCuts({
  name: '大西洋', ch: '無人の船', bgm: 'eerie',
  init(S) { S.tDeck = at(S, 'C1', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tDeck) { deckView(c, t, { grey: true }); dim(c, 0.25 * sg(t, S.tDeck, S.tDeck + 2), '#0c1018'); return { z: 1.04 + 0.08 * ss(sg(t, S.tDeck, S.dur)), fx: 160, fy: 120 }; }
    seaSky(c, t, { grey: true, hz: SEA_Y }); for (let i = 0; i < 3; i++) E(c, mod(i * 130 + t * 6, W + 160) - 80, 60 + i * 14, 70, 10, DA('#c8ccd0', 0.4));
    sea(c, t, SEA_Y, { grey: true }); brig(c, 180, SEA_Y + 4, t, { s: 1.0 }); rowboat(c, lerp(40, 110, sg(t, 0, 10)), SEA_Y + 22, t, 4);
    capPlate(c, t, 0.5, ['1872年12月', 'アゾレス諸島の近く']);
    return { z: 1.04 + 0.04 * ss(t / 10), fx: 170, fy: 100 };
  }
}, [['M1', (c, t, S) => closeUp(c, t, devoFace({ shock: true, blink: blinkOf(t, 5) }), { bg: ['#141c24', '#3c4c5c'], glow: '#a8c8e8' })]]);

/* ---- YA: 1861, Nova Scotia — the Amazon; accidents; renamed ---- */
const YA = {
  name: 'ノバスコシア', ch: 'いわくつきの船', bgm: 'memory',
  init(S) { S.tAcc = at(S, 'L2', 0) - 0.3; S.tName = at(S, 'L3', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tName) { // the name board repainted
      R(c, 0, 0, W, H, '#2c2018'); for (let y = 0; y < H; y += 12) R(c, 0, y, W, 1, '#24180f');
      R(c, 40, 70, 240, 60, '#3c2c1c'); R(c, 44, 74, 232, 52, '#1c2440'); const k = sg(t, S.tName + 0.4, S.tName + 2.0);
      const a = textSpr('AMAZON', 24, '#d8b040'), b = textSpr('MARY CELESTE', 24, '#f4e8a0');
      c.save(); c.globalAlpha = 1 - k; c.drawImage(a, Math.round(160 - a.width / 2), 86); c.globalAlpha = k; c.drawImage(b, Math.round(160 - b.width / 2), 86); c.restore();
      if (k > 0 && k < 1) { const bx = lerp(50, 270, k); L(c, bx, 76, bx + 8, 124, '#8c6c44', 3); R(c, bx + 4, 116, 8, 8, '#f4e8a0'); }
      yearFlash(c, t, S.tName - 0.6, 1869, 216, 6, '改名');
      return { z: 1.04, fx: 160, fy: 100 };
    }
    // the shipyard: a hull on the slip, scaffolds, workers; a beam falls
    seaSky(c, t, { hz: 110 }); sea(c, t, 110); R(c, 0, 128, W, 112, '#7c6c54'); for (let i = 0; i < 20; i++) P(c, hash(i) * W, 132 + hash(i * 3) * 40, '#5c4c3c');
    for (let i = 0; i < 6; i++) { const x = 90 + i * 24; L(c, x, 150, x, 70, '#8c6c44', 2); } L(c, 84, 90, 240, 90, '#8c6c44', 2); L(c, 84, 112, 240, 112, '#8c6c44', 2); // scaffold
    PF(c, [80, 108, 250, 108, 262, 96, 254, 124, 236, 148, 96, 148, 76, 124], '#7c5c3c'); for (let k = 0; k < 6; k++) L(c, 96 + k * 26, 110, 92 + k * 26, 146, '#5c4430'); // ribs & planking
    for (let i = 0; i < 4; i++) { const st = SAILORS[i]; person(c, { ...st, id: 'wk' + i, hat: 'hunt', hatCol: '#5c4c3c' }, 60 + i * 64, 168, { arm: i % 2 ? 'up' : null, f: Math.floor(t * 3 + i) & 3, k: 'yard' }); }
    if (t > S.tAcc) { const k = sg(t, S.tAcc + 0.4, S.tAcc + 1.0); const by = lerp(84, 150, k * k); c.save(); c.translate(180, by); c.rotate(k * 0.6); R(c, -20, -2, 40, 5, '#8c6c44'); c.restore(); if (k >= 1) { for (let i = 0; i < 8; i++) E(c, 180 + (i - 4) * 6, 152 - hash(i) * 6, 5, 3, DA('#c8b898', 0.5)); } }
    yearFlash(c, t, 0.4, 1861, 216, 10, 'アマゾン'); capPlate(c, t, 0.7, ['カナダ', 'ノバスコシア']);
    return { z: 1.03, fx: 170, fy: 116, sy: t > S.tAcc + 1 && t < S.tAcc + 1.2 ? 2 : 0 };
  }
};

/* ---- YB: November 1872, New York — 1,700 barrels; Captain Briggs; ten aboard ---- */
function harbour(c, t) {
  seaSky(c, t, { hz: 96 }); for (let i = 0; i < 9; i++) { const x = i * 38, h = 20 + hash(i) * 30; R(c, x, 96 - h, 30, h, ['#8c8c94', '#a8a0a0', '#7c8494'][i % 3]); for (let k = 0; k < 3; k++) R(c, x + 4 + k * 8, 96 - h + 6, 4, 4, '#d8d4c8'); }
  sea(c, t, 96); brig(c, 210, 140, t, { s: 0.9, sails: 0 }); R(c, 0, 140, 150, 100, '#6c5c48'); for (let x = 0; x < 150; x += 10) R(c, x, 140, 1, 100, '#5c4c3c'); R(c, 0, 138, 150, 3, '#8c7c64');
}
const YB = withCuts({
  name: 'ニューヨーク', ch: '出航', bgm: 'memory',
  init(S) { S.tCap = at(S, 'L5', 0) - 0.3; S.tTen = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTen) { // ten people on deck: the crew, Sarah and little Sofia
      seaSky(c, t, { hz: 100 }); sea(c, t, 100); R(c, 0, 128, W, 112, '#9c7c54'); for (let y = 134; y < H; y += 8) R(c, 0, y, W, 1, '#8c6c48'); R(c, 0, 122, W, 8, '#5c4430');
      const all = [...SAILORS, BRIGGS, SARAH, SOFIA]; const n = Math.min(all.length, Math.floor(sg(t, S.tTen + 0.2, S.tTen + 4.6) * all.length + 0.99));
      for (let i = 0; i < n; i++) { const st = all[i], x = 22 + i * 28 + (i > 6 ? 8 : 0); person(c, st, x, 166 - (st.kid ? 0 : 0), { expr: i > 6 ? 'smile' : 'normal', blink: blinkOf(t, i), k: 'ten' }); }
      if (n > 0) bigCap(c, n + '人', 36, 24, '#f4f0e8');
      return { z: 1.02, fx: 160, fy: 112 };
    }
    harbour(c, t);
    const n = Math.floor(sg(t, 0.6, S.tCap - 0.4) * 1700), shown = Math.min(36, Math.ceil(n / 48));
    for (let i = 0; i < shown; i++) barrel(c, 14 + (i % 9) * 14, 166 - Math.floor(i / 9) * 13, 1);
    person(c, SAILORS[0], 136, 168, { arm: 'reach', f: Math.floor(t * 4) & 3, k: 'load' });
    c.save(); c.globalAlpha = 0.6; c.fillStyle = '#000'; c.fillRect(150, 106, 160, 26); c.restore(); TX(c, 'アルコール ' + n + '樽', 158, 110, '#f8d860', 16, null);
    yearFlash(c, t, 0.4, 1872, 216, 0, '11月7日'); capPlate(c, t, 0.7, ['ニューヨーク']);
    return { z: 1.03, fx: 150, fy: 110 };
  }
}, [['L5', (c, t, S) => closeUp(c, t, briggsFace({ blink: blinkOf(t, 4) }), { bg: ['#0c1428', '#2c3c5c'], glow: '#a8c8f8' })]]);

/* ---- YC: seven days later, the Dei Gratia; two captains, old friends, dinner before sailing ---- */
const YC = {
  name: 'デイ・グラツィア号', bgm: 'memory',
  init(S) { S.tDine = at(S, 'L8', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDine) { // dinner by candlelight
      R(c, 0, 0, W, H, '#2c1c14'); for (let x = 0; x < W; x += 14) R(c, x, 0, 6, 150, '#34221a'); glow(c, 160, 110, 120, 70, '#f8c060', 0.35);
      R(c, 70, 120, 180, 8, '#6c4428'); R(c, 80, 128, 8, 40, '#4c2c18'); R(c, 232, 128, 8, 40, '#4c2c18'); R(c, 70, 116, 180, 5, '#f0e8d8');
      for (const x of [120, 200]) { E(c, x, 116, 12, 3, '#e8e4dc'); E(c, x, 115, 7, 2, '#a85c34'); } candle(c, 160, 114, t, 0, 1); R(c, 140, 106, 4, 10, '#7c2c3c'); R(c, 176, 106, 4, 10, '#7c2c3c');
      person(c, BRIGGS, 96, 150, { expr: 'smile', blink: blinkOf(t, 3), k: 'din' }); person(c, MOREHOUSE, 224, 150, { flip: true, expr: 'smile', blink: blinkOf(t, 8), k: 'din' });
      TX(c, '親友', 146, 40, '#f8d860', 16, '#000000');
      return { z: 1.04, fx: 160, fy: 110 };
    }
    harbour(c, t); brig(c, lerp(240, 330, sg(t, 1, 8)), 132, t, { s: 0.8, sailCol: '#e8dcc0', ph: 1 }); R(c, 0, 140, 150, 100, '#6c5c48');
    TX(c, 'DEI GRATIA', 200, 112, '#f4f0e8', 16, '#000000'); bigCap(c, '7日後', 20, 24, '#f8d860', sg(t, 0.4, 1));
    return { z: 1.03, fx: 180, fy: 106 };
  }
};

/* ---- YD: December 4 — the ship found; two hours watching; no distress signal; Deveau rows over ---- */
const YD = withCuts({
  name: '発見', ch: '発見', bgm: 'eerie',
  init(S) { S.tScope = at(S, 'L10', 0) - 0.3; S.tRow = at(S, 'L11', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRow) { // the small boat pulls toward the silent ship
      seaSky(c, t, { grey: true, hz: SEA_Y }); sea(c, t, SEA_Y, { grey: true }); brig(c, 220, SEA_Y + 4, t, { s: 1.1 }); const k = sg(t, S.tRow, S.dur);
      rowboat(c, lerp(40, 150, k), SEA_Y + 26, t, 4);
      return { z: 1.05 + 0.05 * k, fx: lerp(120, 180, k), fy: 110 };
    }
    if (t > S.tScope) { // the spyglass view: no flag of distress, no one on deck
      R(c, 0, 0, W, H, '#06080c'); c.save(); c.beginPath(); c.arc(160, 100, 86, 0, TAU); c.clip();
      seaSky(c, t, { grey: true, hz: 120 }); sea(c, t, 120, { grey: true }); brig(c, 160 + Math.sin(t * 0.4) * 6, 130, t, { s: 1.4 }); c.restore();
      ER(c, 160, 100, 86, 86, '#2c2c34'); ER(c, 160, 100, 88, 88, '#141418'); L(c, 74, 100, 246, 100, DA('#000000', 0.4)); L(c, 160, 14, 160, 186, DA('#000000', 0.4));
      bigCap(c, '2時間', 10, 16, '#f8d860', sg(t, S.tScope + 0.3, S.tScope + 0.9));
      return { z: 1.03, fx: 160, fy: 100 };
    }
    seaSky(c, t, { grey: true, hz: SEA_Y }); sea(c, t, SEA_Y, { grey: true }); brig(c, 250, SEA_Y + 2, t, { s: 0.5, ph: 2 }); brig(c, 80, SEA_Y + 10, t, { s: 1.0, sailCol: '#e8dcc0', ph: 1 });
    person(c, MOREHOUSE, 96, SEA_Y - 2, { arm: 'point', k: 'look', s: 0.6 });
    yearFlash(c, t, 0.4, 1872, 216, 10, '12月4日'); capPlate(c, t, 0.7, ['アゾレス諸島の近く']);
    return { z: 1.03, fx: 170, fy: 104 };
  }
}, [['G1', (c, t, S) => closeUp(c, t, crewFace({ blink: blinkOf(t, 9) }), { bg: ['#141c24', '#3c4c5c'], glow: '#c8d8e8' })]]);

/* ---- YE: soaked; water in the hold; pumps; the hull sound ---- */
const YE = {
  name: '甲板', bgm: 'dread',
  init(S) { S.tHull = at(S, 'L13', 0) - 0.3; S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    if (t > S.tHull) { seaSky(c, t, { grey: true, hz: SEA_Y }); sea(c, t, SEA_Y, { grey: true }); brig(c, 160, SEA_Y + 4, t, { s: 1.3 }); bigCap(c, '船体に、目立った傷なし', 26, 16, '#f4f0e8', sg(t, S.tHull + 0.6, S.tHull + 1.2)); return { z: 1.03, fx: 160, fy: 100 }; }
    deckView(c, t, { grey: true, water: true });
    for (let i = 0; i < 2; i++) { const x = 104 + i * 110, y = 150; R(c, x, y - 30, 8, 30, '#4c4c54'); L(c, x + 4, y - 30, x + 22, y - 36 + Math.sin(t * 3 + i) * (i ? 0 : 4), '#6c6c74', 3); }
    person(c, DEVO, 160, 176, { expr: 'shock', blink: blinkOf(t, 2), k: 'wet' });
    const k = sg(t, 2.6, 4); if (k > 0) { R(c, 228, 60, 76, 70, '#141c28'); R(c, 230, 62, 72, 66, '#2c3c4c'); for (let i = 0; i < 4; i++) barrel(c, 240 + i * 16, 124, 1); R(c, 230, 104, 72, 24, DA('#3c6c9c', 0.8)); TX(c, '船倉', 234, 62, '#f4f0e8', 16, null); TX(c, '約1m', 254, 84, '#a8d8f8', 16, null); }
    return { z: 1.03, fx: 160, fy: 120 };
  }
};

/* ---- YF: the open hatch, the dead clock, the broken compass, the missing instruments & boat, the "blood", the food ---- */
function cabin(c, t) { R(c, 0, 0, W, H, '#3c2c1c'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 160, '#45321f'); R(c, 0, 160, W, 80, '#2c2014'); for (let y = 166; y < H; y += 8) R(c, 0, y, W, 1, '#24180f'); E(c, 260, 50, 16, 16, '#2c2c34'); E(c, 260, 50, 13, 13, '#5c7c9c'); glow(c, 260, 50, 40, 30, '#c8d8e8', 0.2); }
const YF = {
  name: '船室', ch: '消えたもの', bgm: 'dread',
  init(S) { S.tClock = at(S, 'L14', 1) - 0.3; S.tComp = at(S, 'L14', 2) - 0.3; S.tGone = at(S, 'L15', 0) - 0.3; S.tBoat = at(S, 'L15', 2) - 0.3; S.tBlood = at(S, 'L16', 0) - 0.3; S.tSword = at(S, 'L16', 1) - 0.3; S.tRust = at(S, 'L16', 2) - 0.3; S.tFood = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFood) { // the stores: barrels of food and water, untouched
      R(c, 0, 0, W, H, '#241a12'); glow(c, 160, 90, 140, 80, '#f8d080', 0.18);
      for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) barrel(c, 40 + i * 30 + (r & 1) * 15, 168 - r * 30, 2, { col: r === 0 ? '#7c5c34' : '#8c6c3c' });
      bigCap(c, '6か月分', 30, 24, '#f8d860', sg(t, S.tFood + 0.6, S.tFood + 1.2));
      return { z: 1.03, fx: 160, fy: 110 };
    }
    if (t > S.tBlood) { // the rail with marks; the sword under the bunk — rust, not blood
      if (t < S.tSword) { deckView(c, t, { grey: true }); for (let i = 0; i < 3; i++) { const x = 60 + i * 18, y = 186 - i * 30; E(c, x, y, 3, 2, '#7c1c1c'); P(c, x + 2, y + 2, '#5c1414'); } L(c, 250, 170, 258, 160, '#e8e0d0'); L(c, 252, 172, 262, 162, '#e8e0d0'); return { z: 1.1, fx: 90, fy: 150 }; }
      cabin(c, t); R(c, 40, 120, 200, 40, '#5c3c24'); R(c, 40, 112, 200, 10, '#e8e0d0'); R(c, 40, 160, 200, 4, '#3c2818'); // bunk
      R(c, 40, 140, 200, 20, '#140c08'); const rust = t > S.tRust; glow(c, 140, 152, 60, 10, '#fff4c8', 0.25);
      L(c, 80, 152, 200, 150, rust ? '#a8542c' : '#a8b0bc', 3); R(c, 200, 146, 6, 10, '#d8b040'); R(c, 206, 149, 14, 4, '#5c3c24'); if (!rust) for (let i = 0; i < 4; i++) E(c, 100 + i * 24, 151, 4, 2, '#8c1c1c'); else for (let i = 0; i < 9; i++) P(c, 84 + i * 12, 151 + (i & 1), '#7c3c1c');
      if (rust) bigCap(c, '赤錆', 60, 24, '#e88c4c', sg(t, S.tRust + 0.6, S.tRust + 1.2));
      return { z: 1.06, fx: 150, fy: 140 };
    }
    if (t > S.tBoat) { // empty boat chocks on the deck
      deckView(c, t, { grey: true }); R(c, 120, 150, 80, 6, '#5c4430'); R(c, 126, 136, 6, 16, '#5c4430'); R(c, 188, 136, 6, 16, '#5c4430'); L(c, 128, 136, 134, 120, '#c8b898'); L(c, 190, 136, 186, 120, '#c8b898'); // chocks & cut ropes
      c.save(); c.globalAlpha = 0.35; PF(c, [120, 136, 200, 136, 192, 148, 128, 148], '#f4f0e8'); c.restore(); bigCap(c, '救命ボート', 30, 16, '#f4f0e8', sg(t, S.tBoat + 0.2, S.tBoat + 0.8)); stamp(c, t, S.tBoat + 0.9, 160, 104, 'ない', 70);
      return { z: 1.06, fx: 160, fy: 140 };
    }
    cabin(c, t);
    R(c, 20, 40, 60, 40, '#141008'); R(c, 18, 38, 64, 4, '#6c4c2c'); PF(c, [20, 40, 80, 40, 92, 20, 32, 20], '#5c4430'); glow(c, 50, 60, 30, 16, '#c8d8e8', 0.25); // open hatch
    E(c, 160, 54, 20, 20, '#5c3c24'); E(c, 160, 54, 16, 16, '#f4ecd8'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; P(c, 160 + Math.cos(a) * 13, 54 + Math.sin(a) * 13, '#2c2c34'); } L(c, 160, 54, 160 + 7, 54 - 6, '#141414', 2); L(c, 160, 54, 160 - 2, 54 + 11, '#141414'); R(c, 156, 76, 8, 30, '#5c3c24'); // clock (stopped)
    if (t > S.tComp) { R(c, 110, 140, 40, 14, '#5c3c24'); E(c, 130, 136, 16, 8, '#8c7c5c'); E(c, 130, 135, 13, 6, '#e8e0c8'); L(c, 120, 132, 142, 140, '#3c3c44'); L(c, 124, 140, 136, 130, '#3c3c44'); P(c, 130, 135, '#c81818'); } // broken compass
    if (t > S.tGone) { for (let i = 0; i < 2; i++) { const x = 190 + i * 50; R(c, x, 130, 40, 26, '#4c3420'); R(c, x + 3, 133, 34, 20, '#2c1c10'); c.save(); c.globalAlpha = 0.3; if (i) { E(c, x + 20, 143, 9, 9, '#c8c0a8'); } else { PF(c, [x + 8, 150, x + 20, 136, x + 32, 150], '#c8c0a8'); } c.restore(); } TX(c, '六分儀', 186, 110, '#f4f0e8', 16, '#000000'); TX(c, '時計', 244, 110, '#f4f0e8', 16, '#000000'); }
    if (t > S.tClock) bigCap(c, '止まった時計', 6, 16, '#f4f0e8', sg(t, S.tClock + 0.2, S.tClock + 0.8));
    return { z: 1.03, fx: 150, fy: 100 };
  }
};

/* ---- YG: the captain's log — the last entry, November 24 ---- */
const YG = withCuts({
  name: '航海日誌', bgm: 'eerie',
  init(S) { S.tBlank = at(S, 'L19', 0) - 0.3; S.tNone = at(S, 'L19', 2) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#1c140c'); glow(c, 160, 100, 140, 80, '#f8d080', 0.3);
    R(c, 40, 24, 240, 150, '#3c2414'); R(c, 46, 28, 112, 142, '#f0e4c8'); R(c, 162, 28, 112, 142, '#f4e8cc'); R(c, 158, 28, 4, 142, '#c8b898');
    for (let i = 0; i < 8; i++) { R(c, 54, 42 + i * 14, 96 - (i * 7) % 30, 1, '#8c7c64'); } TX(c, 'Nov. 24', 168, 34, '#3c2c1c', 16, null); for (let i = 0; i < 3; i++) R(c, 170, 58 + i * 14, 90 - i * 22, 1, '#5c4c3c');
    if (t > S.tBlank) { const k = sg(t, S.tBlank, S.tBlank + 3); for (let i = 3; i < 8; i++) R(c, 170, 58 + i * 14, 90, 1, DA('#c8b898', 0.3)); c.save(); c.globalAlpha = 0.25 * k; c.fillStyle = '#000'; c.fillRect(0, 0, W, H); c.restore(); }
    if (t > S.tNone) bigCap(c, '10人は、どこへ', 98, 16, '#f4f0e8', sg(t, S.tNone, S.tNone + 0.6));
    capPlate(c, t, 0.5, ['航海日誌', '最後の書き込み']);
    return { z: 1.03 + 0.05 * ss(sg(t, 0, S.dur)), fx: 216, fy: 80 };
  }
}, [['B1', (c, t, S) => closeUp(c, t, briggsFace({ blink: blinkOf(t, 4) }), { bg: ['#1c140c', '#4c3424'], glow: '#f8d080' })]]);

/* ---- YH: towed to Gibraltar; praise and suspicion; friends meeting in mid-ocean; a low award ---- */
const YH = {
  name: 'ジブラルタル', ch: '疑い', bgm: 'dread',
  init(S) { S.tCourt = at(S, 'L21', 0) - 0.3; S.tDoubt = at(S, 'L21', 2) - 0.3; S.tMap = at(S, 'L22', 0) - 0.3; S.tPrize = at(S, 'L23', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPrize) { R(c, 0, 0, W, H, '#1c1810'); glow(c, 160, 100, 100, 60, '#f8d860', 0.2); const n = Math.floor(sg(t, S.tPrize + 0.2, S.tPrize + 1.6) * 20); for (let i = 0; i < n; i++) { E(c, 110 + (i % 10) * 10, 140 - Math.floor(i / 10) * 6, 6, 3, '#c8a040'); E(c, 110 + (i % 10) * 10, 139 - Math.floor(i / 10) * 6, 5, 2, '#f0d060'); } const k = sg(t, S.tPrize + 2.4, S.tPrize + 3.4); L(c, 100, lerp(60, 120, k), 230, lerp(60, 120, k) - 20, '#f84040', 3); bigCap(c, '賞金', 40, 24, '#f8d860'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tMap) { // the Atlantic: two courses meeting
      R(c, 0, 0, W, H, '#0c1c30'); for (let x = 0; x < W; x += 20) R(c, x, 0, 1, H, '#10243a'); PF(c, [0, 20, 60, 30, 80, 90, 50, 150, 0, 170], '#a89c7c'); PF(c, [320, 30, 270, 50, 262, 100, 280, 140, 320, 150], '#a89c7c'); TX(c, 'ニューヨーク', 4, 70, '#f4f0e8', 16, '#000000'); TX(c, 'ジェノヴァ', 236, 22, '#f4f0e8', 16, '#000000');
      const k1 = sg(t, S.tMap + 0.2, S.tMap + 2.4), k2 = sg(t, S.tMap + 0.8, S.tMap + 3.0); L(c, 60, 80, lerp(60, 200, k1), lerp(80, 96, k1), '#f8d860', 2); L(c, 60, 92, lerp(60, 200, k2), lerp(92, 100, k2), '#80c8f8', 2); E(c, 214, 98, 4, 4, '#ffffff');
      if (k2 >= 1) { ER(c, 204, 98, 16, 12, '#f84040'); bigCap(c, '出来すぎた話？', 114, 16, '#f84040', sg(t, S.tMap + 3.1, S.tMap + 3.6)); }
      return { z: 1.03, fx: 160, fy: 100 };
    }
    if (t > S.tCourt) { // the court in Gibraltar
      R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#56402c'); R(c, 80, 60, 160, 50, '#3c2414'); R(c, 76, 56, 168, 6, '#6c4c2c'); R(c, 0, 150, W, 90, '#3c2c20');
      person(c, { id: 'jdg', coat: '#c81818', coat2: '#a81414', pants: '#1c1c24', skin: '#e8c0a0', hair: '#f4f4f0' }, 160, 98, { k: 'jd', blink: blinkOf(t, 2) }); R(c, 80, 72, 160, 38, '#3c2414');
      person(c, MOREHOUSE, 70, 166, { k: 'crt' }); person(c, DEVO, 96, 168, { k: 'crt' });
      if (t > S.tDoubt) { person(c, { id: 'fld', coat: '#141418', coat2: '#0c0c10', pants: '#141418', skin: '#e0b898', hair: '#a8a8a8', moustache: true }, 250, 166, { flip: true, arm: 'point', expr: 'angry', k: 'fld' }); TX(c, 'フラッド', 222, 104, '#f8d860', 16, '#000000'); }
      return { z: 1.03, fx: 160, fy: 110 };
    }
    seaSky(c, t, { hz: 120 }); PF(c, [170, 120, 220, 34, 250, 40, 300, 120], '#8c8070'); PF(c, [220, 34, 236, 38, 250, 40, 240, 70], '#a89c8c'); for (let i = 0; i < 10; i++) R(c, 200 + i * 9, 110 - (i % 3) * 4, 6, 6, '#e8e0d0'); // the Rock of Gibraltar
    sea(c, t, 120); const k = sg(t, 0.4, S.tCourt); brig(c, lerp(-20, 110, k), 140, t, { s: 0.7, sailCol: '#e8dcc0', ph: 1 }); L(c, lerp(-20, 110, k) - 40, 138, lerp(-20, 110, k) - 64, 140, '#c8b898'); brig(c, lerp(-20, 110, k) - 100, 142, t, { s: 0.7, sails: 0.4, ph: 2 });
    capPlate(c, t, 0.5, ['ジブラルタル']);
    return { z: 1.03, fx: 150, fy: 106 };
  }
};

/* ---- YI: theories; the alcohol vapour; the 2005 experiment ---- */
const YI = {
  name: '諸説', ch: '何が起きたのか', bgm: 'eerie',
  init(S) { S.tNo = at(S, 'L25', 0) - 0.3; S.tAlc = at(S, 'L26', 0) - 0.3; S.tVap = at(S, 'L27', 0) - 0.3; S.tBoat = at(S, 'L27', 3) - 0.3; S.tRope = at(S, 'L27', 4) - 0.3; S.tLab = at(S, 'L28', 0) - 0.3; S.tFire = at(S, 'L28', 2) - 0.3; S.tDoor = at(S, 'L28', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLab) { // the model: a coffin-sized hold with paper cubes; flash; the hatch blows open; the cubes unburnt
      R(c, 0, 0, W, H, '#1c1c24'); R(c, 0, 150, W, 90, '#2c2c34'); if (t < S.tDoor + 1.3) yearFlash(c, t, S.tLab + 0.2, 2005, 12, 10, 'ロンドン');
      R(c, 70, 90, 180, 60, '#6c4c2c'); R(c, 74, 94, 172, 52, '#2c1c10'); for (let i = 0; i < 8; i++) { R(c, 84 + i * 20, 126, 14, 14, '#e8e4d8'); L(c, 84 + i * 20, 126, 98 + i * 20, 126, '#c8c4b8'); }
      const open = t > S.tDoor; if (!open) R(c, 70, 84, 180, 8, '#7c5c34'); else { c.save(); c.translate(70, 84); c.rotate(-0.9 * eOut(sg(t, S.tDoor, S.tDoor + 0.3))); R(c, 0, -8, 180, 8, '#7c5c34'); c.restore(); }
      if (t > S.tFire && t < S.tFire + 1.2) { const k = 1 - sg(t, S.tFire, S.tFire + 1.2); glow(c, 160, 110, 120, 50, '#5c8cf8', 0.6 * k); E(c, 160, 116, 70 * k + 10, 14 * k + 4, DA('#8cb4f8', 0.5 * k)); }
      if (t > S.tDoor + 1.4) bigCap(c, '焦げ跡なし', 40, 24, '#8cf87c', sg(t, S.tDoor + 1.4, S.tDoor + 2));
      return { z: 1.04, fx: 160, fy: 110, sy: t > S.tDoor && t < S.tDoor + 0.2 ? 2 : 0 };
    }
    if (t > S.tVap) { // vapour from the hold; everyone into the boat; the rope parts
      if (t < S.tBoat) { R(c, 0, 0, W, H, '#1c140c'); for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) barrel(c, 40 + i * 30 + (r & 1) * 15, 168 - r * 30, 2); for (let i = 0; i < 16; i++) { const u = fr(t * 0.4 + i / 16); E(c, 60 + (i * 37 % 200) + Math.sin(t + i) * 10, 150 - u * 120, 10 + u * 24, 6 + u * 10, DA('#c8d8b8', 0.5 * (1 - u))); } return { z: 1.04, fx: 160, fy: 110 }; }
      seaSky(c, t, { grey: true, hz: SEA_Y }); sea(c, t, SEA_Y, { grey: true }); const k = sg(t, S.tRope, S.tRope + 6); brig(c, 230 + k * 40, SEA_Y + 4, t, { s: 0.9 });
      const bx = 110 - k * 30; rowboat(c, bx, SEA_Y + 22, t, 5); if (t < S.tRope + 0.6) L(c, bx + 16, SEA_Y + 18, 180, SEA_Y + 2, '#c8b898'); else { L(c, bx + 16, SEA_Y + 18, bx + 30, SEA_Y + 24, '#c8b898'); L(c, 190 + k * 40, SEA_Y + 2, 176 + k * 40, SEA_Y + 16, '#c8b898'); }
      return { z: 1.04, fx: 150, fy: 110 };
    }
    if (t > S.tAlc) { R(c, 0, 0, W, H, '#1c140c'); glow(c, 160, 110, 120, 60, '#f8c060', 0.2); for (let i = 0; i < 5; i++) barrel(c, 80 + i * 40, 160, 3); bigCap(c, 'アルコール', 40, 24, '#f8d860', sg(t, S.tAlc + 0.6, S.tAlc + 1.2)); return { z: 1.04, fx: 160, fy: 110 }; }
    // three theory panels
    R(c, 0, 0, W, H, '#14141c'); const labs = ['反乱', '海賊', '竜巻'];
    for (let i = 0; i < 3; i++) { const x = 20 + i * 100, k = sg(t, 0.3 + i * 1.0, 0.8 + i * 1.0); if (k <= 0) continue; R(c, x, 30, 80, 100, '#2c2c3c'); R(c, x + 2, 32, 76, 96, '#3c4c64');
      if (i === 0) { person(c, SAILORS[1], x + 26, 120, { arm: 'up', expr: 'angry', k: 'mut' }); person(c, SAILORS[3], x + 52, 120, { arm: 'up', expr: 'angry', k: 'mut' }); }
      if (i === 1) { brig(c, x + 40, 120, t, { s: 0.45, sailCol: '#2c2c2c', flag: '#141414' }); }
      if (i === 2) { for (let k2 = 0; k2 < 14; k2++) { const y = 40 + k2 * 6, w = 4 + k2 * 1.2 + Math.sin(t * 6 + k2) * 2; R(c, x + 40 - w / 2 + Math.sin(t * 2 + k2 * 0.4) * 4, y, w, 5, k2 & 1 ? '#8c9cac' : '#a8b8c8'); } }
      TX(c, labs[i], x + 24, 34, '#f4f0e8', 16, '#000000'); if (t > S.tNo) { L(c, x + 4, 34, x + 76, 126, '#f84040', 3); L(c, x + 76, 34, x + 4, 126, '#f84040', 3); } }
    return { z: 1.02, fx: 160, fy: 90 };
  }
};

/* ---- YJ: Conan Doyle's story — warm tea, breakfast on the stove; the fiction ---- */
const YJ = {
  name: '伝説', ch: '作られた伝説', bgm: 'memory',
  init(S) { S.tTea = at(S, 'L30', 0) - 0.3; S.tFake = at(S, 'L30', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTea) { // the legend: steaming tea, a pan on the stove — then the stamp
      cabin(c, t); R(c, 60, 120, 200, 8, '#6c4428'); R(c, 66, 128, 8, 40, '#4c2c18'); R(c, 246, 128, 8, 40, '#4c2c18');
      E(c, 110, 118, 14, 4, '#f4f0e8'); R(c, 100, 106, 18, 12, '#f4f0e8'); R(c, 102, 108, 14, 4, '#a85c2c'); for (let i = 0; i < 3; i++) { const u = fr(t * 0.6 + i / 3); E(c, 108 + Math.sin(t * 2 + i) * 3, 100 - u * 20, 3, 4, DA('#f4f4f0', 0.6 * (1 - u))); }
      E(c, 170, 118, 18, 4, '#e8e4dc'); E(c, 168, 116, 6, 3, '#f8f4ec'); E(c, 168, 116, 2.5, 2, '#f8c830'); R(c, 200, 108, 40, 10, '#2c2c34'); for (let i = 0; i < 3; i++) flame(c, 210 + i * 10, 122, 1, t, i);
      stamp(c, t, S.tFake + 0.4, 160, 60, '作り話', 96);
      return { z: 1.04, fx: 160, fy: 110 };
    }
    // the writer at his desk by lamplight
    R(c, 0, 0, W, H, '#241a12'); glow(c, 120, 90, 120, 70, '#f8c060', 0.35); R(c, 40, 120, 240, 10, '#5c3c24'); R(c, 50, 130, 10, 40, '#3c2818'); R(c, 260, 130, 10, 40, '#3c2818');
    R(c, 100, 108, 70, 12, '#f0e4c8'); for (let i = 0; i < 4; i++) R(c, 104, 110 + i * 2, 50 + (i * 9) % 14, 1, '#5c4c3c'); R(c, 70, 92, 6, 28, '#2c2c2c'); E(c, 73, 90, 10, 5, DA('#f8e0a0', 0.8));
    person(c, { id: 'doyle', coat: '#3c3c34', coat2: '#2c2c28', pants: '#2c2c28', skin: '#e8c0a0', hair: '#5c3c24', moustache: true }, 200, 150, { arm: 'reach', flip: true, blink: blinkOf(t, 6), k: 'doy' });
    capPlate(c, t, 0.6, ['アーサー・コナン・ドイル']);
    return { z: 1.04, fx: 150, fy: 110 };
  }
};

/* ---- YK: 1885, the reef — wrecked for insurance; 2001, the remains found ---- */
const YK = {
  name: '船の最期', ch: '船の最期', bgm: 'requiem',
  init(S) { S.tFound = at(S, 'L32', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFound) { // under water: the remains, a diver's light
      VG(c, 0, 0, W, H, ['#0c3c5c', '#0c2c48', '#041828']); for (let i = 0; i < 6; i++) { const x = mod(i * 60 + t * 6, W + 40) - 20; softBeam(c, x, 0, Math.PI / 2 + 0.2, 160, 0.06, 0.12, '#a8e0f8'); }
      R(c, 0, 170, W, 70, '#3c3c2c'); for (let i = 0; i < 14; i++) E(c, i * 26, 170, 18, 6, '#4c4834'); for (let i = 0; i < 9; i++) { const x = 80 + i * 18; L(c, x, 168, x + 4 - i, 128 + (i % 3) * 8, '#3c2c1c', 3); } R(c, 76, 160, 170, 8, '#2c2418');
      const dx = 260 - sg(t, S.tFound, S.dur) * 60; E(c, dx, 110, 8, 6, '#2c2c34'); R(c, dx - 3, 104, 6, 4, '#c8c8c0'); softBeam(c, dx - 6, 112, 2.6, 110, 0.2, 0.3, '#fff4c8'); for (let i = 0; i < 4; i++) { const u = fr(t * 0.8 + i / 4); E(c, dx + 4, 100 - u * 80, 2, 2, DA('#c8f0f8', 0.7 * (1 - u))); }
      yearFlash(c, t, S.tFound + 0.2, 2001, 216, 10, '8月9日');
      return { z: 1.03, fx: 160, fy: 120 };
    }
    seaSky(c, t, { dusk: true, hz: 120 }); sea(c, t, 120); for (let i = 0; i < 10; i++) { const x = 80 + i * 18; E(c, x, 150 + (i % 3) * 3, 10, 4, '#8c7c5c'); E(c, x, 148 + (i % 3) * 3, 6, 2, '#f4f4f0'); } // reef with surf
    c.save(); c.translate(170, 146); c.rotate(0.22); c.translate(-170, -146); brig(c, 170, 146, 0.4, { s: 0.9, sails: 0.5, torn: true }); c.restore();
    yearFlash(c, t, 0.4, 1885, 216, 10, 'ハイチ沖'); stamp(c, t, 3.4, 90, 60, '保険金詐欺', 110);
    return { z: 1.03, fx: 170, fy: 110 };
  }
};

/* ---- YL: the end — ten candles on a dark sea ---- */
const YL = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tCand = at(S, 'L33', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    seaSky(c, t, { night: true, hz: SEA_Y }); const my = skyY(56); glow(c, 250, my, 36, 30, '#c8d8f8', 0.3); E(c, 250, my, 11, 11, '#e8ecf4'); E(c, 247, my - 3, 3, 2, '#ffffff'); sea(c, t, SEA_Y, { night: true }); c.save(); c.globalAlpha = 0.18; for (let i = 0; i < 8; i++) R(c, 238 + Math.sin(t * 2 + i) * 4, SEA_Y + 4 + i * 5, 24 - i * 2, 2, '#c8d8f8'); c.restore();
    c.save(); c.globalAlpha = 0.6; brig(c, 110, SEA_Y + 4, t, { s: 0.8, sailCol: '#8c94a8', hull: '#0c0c14' }); c.restore();
    const n = sg(t, S.tCand, S.tCand + 6) * 10; for (let i = 0; i < 10; i++) { const x = 70 + i * 20, k = clamp(n - i, 0, 1); if (k > 0) { candle(c, x, SEA_Y + 26 + (i & 1) * 4, t, i, k); glow(c, x, SEA_Y + 20 + (i & 1) * 4, 12, 8, '#f8c060', 0.3 * k); } }
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 120 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { seaSky(c, t, { grey: true, hz: SEA_Y }); for (let i = 0; i < 3; i++) E(c, mod(i * 130 + t * 6, W + 160) - 80, 60 + i * 14, 70, 10, DA('#c8ccd0', 0.4)); sea(c, t, SEA_Y, { grey: true }); brig(c, 160, SEA_Y + 4, t, { s: 1.2 }); return { z: 1.1, fx: 160, fy: 100 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { deckView(c, t, { grey: true }); for (let i = 0; i < 4; i++) barrel(c, 120 + i * 26, 170, 2); dim(c, 0.2, '#0c1018'); return { z: 1.06, fx: 160, fy: 120 }; }
};
