/* ================= 記録 #011 H・H・ホームズ: scenes ================= */
const ST_Y = 150; // the street line

/* ---- ZX: cold open — the Castle at night near the World's Fair (moves: the Ferris wheel turns, windows flicker) ---- */
const ZX = withCuts({
  name: 'シカゴ', ch: '殺人の城', bgm: 'eerie',
  init(S) { S.tMyth = at(S, 'C1', 1) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    gasSky(c, 120, { night: true }); for (let i = 0; i < 30; i++) P(c, hash(i) * W, hash(i * 3) * 60, '#c8d0e8');
    ferris(c, t, 50, 70, 40); for (let i = 0; i < 8; i++) glow(c, 20 + i * 12, 118, 10, 6, '#f8d880', 0.3);
    castle(c, t, 130, ST_Y, { lit: true }); street(c, t, ST_Y);
    if (t > S.tMyth) stamp(c, t, S.tMyth + 0.6, 214, 70, '作り話？', 90);
    capPlate(c, t, 0.5, ['1893年', 'シカゴ']);
    return { z: 1.03 + 0.05 * ss(t / S.dur), fx: 200, fy: 100 };
  }
}, [['M1', (c, t, S) => closeUp(c, t, holmesFace({ dark: true, blink: blinkOf(t, 4) }), { bg: ['#0c0408', '#3c1018'], glow: '#c81818' })]]);

/* ---- ZA: 1861, Gilmanton; teacher; medical school (moves: the anatomy-room lamp swings) ---- */
const ZA = {
  name: 'ニューハンプシャー', ch: '医学生', bgm: 'memory',
  init(S) { S.tMed = at(S, 'L2', 2) - 0.3; S.tBody = at(S, 'L3', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMed) { // the anatomy room
      R(c, 0, 0, W, H, '#2c2c30'); for (let x = 0; x < W; x += 20) R(c, x, 0, 10, 150, '#34343a'); R(c, 0, 150, W, 90, '#3c3428');
      const sw = Math.sin(t * 1.2) * 10; L(c, 160, 0, 160 + sw, 40, '#1c1c1c'); PF(c, [150 + sw, 40, 170 + sw, 40, 176 + sw, 50, 144 + sw, 50], '#8c7c4c'); softBeam(c, 160 + sw, 50, Math.PI / 2, 110, 0.5, 0.2);
      R(c, 100, 120, 120, 10, '#8c8c94'); R(c, 108, 130, 6, 30, '#5c5c64'); R(c, 206, 130, 6, 30, '#5c5c64'); sheetBody(c, 160, 116, 90);
      man(c, { ...HOLMES, id: 'holyoung', hat: null }, 240, 160, { k: 'med', blink: blinkOf(t, 2) }); man(c, CROWD[0], 80, 160, { k: 'med', flip: true });
      if (t > S.tBody) stamp(c, t, S.tBody + 2, 160, 70, '保険金詐欺', 110);
      capPlate(c, t - S.tMed, 0.3, ['ミシガン大学', '医学部']);
      return { z: 1.04, fx: 160, fy: 110 };
    }
    gasSky(c, 120, {}); R(c, 0, 120, W, 120, '#5c7c4c'); for (let i = 0; i < 5; i++) { L(c, 20 + i * 70, 130, 20 + i * 70, 70, '#3c2c1c', 3); E(c, 20 + i * 70, 70, 20, 26, '#3c5c34'); }
    R(c, 110, 76, 100, 60, '#e8e4dc'); PF(c, [104, 78, 160, 50, 216, 78], '#7c2c2c'); R(c, 150, 104, 20, 32, '#5c3c24'); for (const x of [122, 186]) { R(c, x, 90, 14, 16, '#5c7c9c'); }
    man(c, { ...HOLMES, id: 'holtch', hat: null }, 90, 160, { k: 'tch', arm: 'point' }); for (let i = 0; i < 3; i++) woman(c, KIDS[i], 130 + i * 24, 162, { k: 'pup' });
    yearFlash(c, t, 0.4, 1861, 216, 10, 'ギルマントン'); capPlate(c, t, 0.7, ['ニューハンプシャー州']);
    return { z: 1.03, fx: 140, fy: 116 };
  }
};

/* ---- ZB: the false name; three wives (moves: name cards flip) ---- */
const ZB = {
  name: '偽名', ch: '偽名と重婚', bgm: 'pulse',
  init(S) { S.tName = at(S, 'L4', 3) - 0.3; S.tWives = at(S, 'L5', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 90, 140, 70, '#f8c060', 0.2);
    if (t < S.tWives) {
      const names = ['Herman W. Mudgett', 'H. H. Holmes']; const k = t > S.tName ? 1 : 0; R(c, 36, 48, 248, 70, '#f0e8d4'); R(c, 36, 48, 248, 14, '#5c3c24');
      const s = textSpr(names[k], 16, '#2c2c34'); c.drawImage(s, Math.round(160 - s.width / 2), 70); if (k) { L(c, 70, 78, 250, 78, '#c81818', 2); const n2 = 'ヘンリー・ハワード・ホームズ', w2 = textSpr(n2, 16, '#a81c1c').width; TX(c, n2, Math.round(160 - w2 / 2), 88, '#a81c1c', 16, null); }
      man(c, HOLMES, 160, 162, { k: 'nm', blink: blinkOf(t, 5), expr: 'smile', s: 0.9 });
      return { z: 1.03, fx: 160, fy: 90 };
    }
    // three wives, three wedding certificates
    for (let i = 0; i < 3; i++) { const k = sg(t, S.tWives + 0.4 + i * 1.4, S.tWives + 0.9 + i * 1.4); if (k <= 0) continue; c.save(); c.globalAlpha = k; const x = 20 + i * 100; R(c, x, 30, 80, 100, '#f4ecd8'); R(c, x + 4, 34, 72, 92, '#e8dcc0'); TX(c, ['1878', '1887', '1894'][i], x + 22, 36, '#5c3c24', 16, null); woman(c, LADIES[i], x + 40, 120, { k: 'wf', expr: 'smile' }); c.restore(); }
    man(c, HOLMES, 300, 140, { k: 'wv', flip: true, expr: 'smile' });
    return { z: 1.02, fx: 160, fy: 90 };
  }
};

/* ---- ZC: Englewood — the drugstore, the building rising, the hotel that never opened (moves: the walls go up storey by storey) ---- */
const ZC = {
  name: 'エングルウッド', ch: '城を建てる', bgm: 'memory',
  init(S) { S.tBuild = at(S, 'L7', 0) - 0.3; S.tThird = at(S, 'L7', 1) - 0.3; S.tHotel = at(S, 'L8', 0) - 0.3; S.tDebt = at(S, 'L9', 0) - 0.3; S.tNever = at(S, 'L10', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDebt && t < S.tNever) { // a hidden room stacked with unpaid furniture
      R(c, 0, 0, W, H, '#241c14'); softBeam(c, 30, 40, 0.3, 260, 0.25, 0.25);
      for (let i = 0; i < 9; i++) { const x = 40 + (i % 5) * 50, y = 150 - Math.floor(i / 5) * 40; R(c, x, y - 30, 40, 30, ['#7c5c34', '#5c4c3c', '#8c6c44'][i % 3]); R(c, x + 4, y - 26, 32, 4, '#3c2c1c'); }
      R(c, 0, 150, W, 90, '#1c1410'); stamp(c, t, S.tDebt + 1.6, 220, 80, '未払い', 80);
      return { z: 1.04, fx: 160, fy: 110 };
    }
    gasSky(c, 120, { smog: true, t }); street(c, t, ST_Y);
    const fl = t < S.tBuild ? 0 : t < S.tThird ? 2 : 3;
    if (fl === 0) { R(c, 130, 110, 170, 40, '#6c5c48'); for (let i = 0; i < 6; i++) E(c, 140 + i * 28, 140, 8, 3, '#5c4c3c'); }
    else { const k = sg(t, S.tBuild, S.tBuild + 3); c.save(); c.beginPath(); c.rect(0, ST_Y - lerp(0, 160, k), W, H); c.clip(); castle(c, t, 130, ST_Y, { floors: fl }); c.restore(); if (k < 1) for (let i = 0; i < 4; i++) L(c, 136 + i * 50, ST_Y, 136 + i * 50, ST_Y - 120, '#8c6c44', 2); }
    R(c, 20, 100, 90, 50, '#a89c88'); R(c, 26, 108, 78, 18, '#d8c088'); TX(c, 'DRUGS', 40, 108, '#5c2c1c', 16, null); R(c, 52, 128, 24, 22, '#5c3c24');
    man(c, HOLMES, 110, ST_Y + 4, { k: 'eng', arm: t > S.tHotel ? 'point' : null, expr: 'smile' });
    if (t > S.tHotel) { for (let i = 0; i < 2; i++) man(c, CROWD[i + 1], 150 + i * 24, ST_Y + 4, { k: 'inv', flip: true }); TX(c, 'HOTEL?', 190, 40, '#f8d860', 16, '#000000'); }
    if (t > S.tNever) stamp(c, t, S.tNever + 0.4, 214, 84, '未完成', 80);
    if (t < S.tBuild) { yearFlash(c, t, 0.4, 1886, 216, 10, 'シカゴ'); capPlate(c, t, 0.7, ['エングルウッド', '63番通り']); }
    return { z: 1.03, fx: 180, fy: 110 };
  }
};

/* ---- ZH: the horror close-up ---- */
const ZH = { name: '素顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, holmesFace({ dark: true, blink: 0 }), [[19, 18], [29, 18]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- ZD: those who vanished — Julia and Pearl at Christmas, Emeline, Minnie and Nannie (moves: snow falls, figures fade) ---- */
const ZD = {
  name: '消えた人々', ch: '消えた人々', bgm: 'dread',
  init(S) { S.tGone1 = at(S, 'L11', 2) - 0.3; S.tMore = at(S, 'L12', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    gasSky(c, 120, { night: true }); castle(c, t, 70, ST_Y, { lit: true }); street(c, t, ST_Y); snowfall(c, t, 50, 6, 4, 12);
    const fade = (i, t0) => 1 - sg(t, t0, t0 + 1.4);
    const ppl = [[LADIES[0], 60, 1], [KIDS[0], 84, S.tGone1], [LADIES[1], 130, S.tMore + 1.0], [LADIES[2], 190, S.tMore + 3.0], [LADIES[3], 220, S.tMore + 3.4]];
    ppl.forEach(([st, x, t0], i) => { const k = i === 0 ? fade(0, S.tGone1) : (t0 < 1e8 ? fade(i, t0) : 1); const shown = i < 2 || t > S.tMore; if (!shown || k <= 0) return; c.save(); c.globalAlpha = k; woman(c, st, x + 60, ST_Y + 6, { k: 'vn' }); c.restore(); });
    if (t < S.tMore) yearFlash(c, t, 0.4, 1891, 216, 10, 'クリスマス');
    return { z: 1.03, fx: 170, fy: 116 };
  }
};

/* ---- ZE: Pitezel, "the tool"; the insurance plot; the fire; the three children (moves: flames, a laboratory flask) ---- */
const ZE = withCuts({
  name: 'ピツェル', ch: '保険金詐欺', bgm: 'dread',
  init(S) { S.tPlot = at(S, 'L14', 0) - 0.3; S.tFire = at(S, 'L15', 0) - 0.3; S.tKids = at(S, 'L16', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tKids) { // three children walk away hand in hand with Holmes
      gasSky(c, 120, { dusk: true }); R(c, 0, 120, W, 120, '#7c6c58'); R(c, 0, 150, W, 4, '#5c4c3c');
      const k = sg(t, S.tKids + 0.6, S.dur); for (let i = 0; i < 3; i++) woman(c, KIDS[i], lerp(150, 260, k) - i * 22, 156, { f: Math.floor(t * 5 + i) & 3, k: 'go' }); man(c, HOLMES, lerp(170, 280, k), 156, { f: Math.floor(t * 5) & 3, k: 'go' });
      woman(c, { ...LADIES[1], id: 'carrie' }, 60, 158, { k: 'mom', expr: 'smile', flip: true });
      return { z: 1.04, fx: 170, fy: 120 };
    }
    if (t > S.tFire) { gasSky(c, 120, { night: true }); R(c, 0, 150, W, 90, '#140c08'); fireHouse(c, 100, 150, 120, 60, t, 1); TX(c, 'LABORATORY', 116, 64, '#f8e8b0', 16, '#000000'); stamp(c, t, S.tFire + 2.4, 230, 50, '保険金', 80); return { z: 1.04, fx: 160, fy: 110, sx: Math.round(Math.sin(t * 40)) }; }
    if (t > S.tPlot) { // the fake laboratory
      R(c, 0, 0, W, H, '#2c2c30'); R(c, 0, 150, W, 90, '#3c3428'); R(c, 60, 110, 200, 10, '#5c3c24'); for (let i = 0; i < 5; i++) { const x = 80 + i * 36; R(c, x, 90, 10, 20, '#a8c8d8'); E(c, x + 5, 92 + Math.sin(t * 3 + i) * 2, 3, 2, '#8cf87c'); }
      TX(c, 'B. F. PERRY', 100, 40, '#f4f0e8', 16, '#000000'); man(c, HOLMES, 240, 160, { k: 'lab', arm: 'point', flip: true }); man(c, PITEZEL, 50, 160, { k: 'lab' });
      return { z: 1.04, fx: 160, fy: 110 };
    }
    R(c, 0, 0, W, H, '#3c3428'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#443a2c'); R(c, 0, 150, W, 90, '#2c2418');
    man(c, HOLMES, 200, 160, { k: 'pt', flip: true, expr: 'smile' }); man(c, PITEZEL, 130, 160, { k: 'pt', arm: 'reach' }); R(c, 80, 132, 24, 26, '#2c2c2c'); R(c, 82, 128, 20, 6, '#4c4c4c'); // his coal bin
    capPlate(c, t, 0.4, ['大工', 'ベンジャミン・ピツェル']);
    return { z: 1.04, fx: 160, fy: 112 };
  }
}, [['D1', (c, t, S) => closeUp(c, t, daFace({ blink: blinkOf(t, 6) }), { bg: ['#1c140c', '#4c3424'], glow: '#f8d8a0' })]]);

/* ---- ZF: the three journeys; the informer; the arrest in Boston (moves: three routes draw across the map) ---- */
const ZF = {
  name: '逃避行', ch: '三つの旅', bgm: 'pulse',
  init(S) { S.tTip = at(S, 'L18', 0) - 0.3; S.tArrest = at(S, 'L19', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tArrest) { gasSky(c, 120, { smog: true, t }); for (let i = 0; i < 7; i++) { const x = i * 48; R(c, x, 50, 44, 100, ['#8c6c5c', '#7c5c4c', '#9c7c64'][i % 3]); for (let k = 0; k < 6; k++) R(c, x + 6 + (k % 2) * 18, 60 + Math.floor(k / 2) * 26, 10, 14, '#3c4458'); } street(c, t, ST_Y);
      man(c, HOLMES, 160, ST_Y + 4, { k: 'arr', expr: 'shock' }); man(c, COPS[0], 130, ST_Y + 4, { k: 'arr', arm: 'reach' }); man(c, COPS[1], 190, ST_Y + 4, { k: 'arr', flip: true, arm: 'reach' });
      yearFlash(c, t, S.tArrest + 0.2, 1894, 216, 10, '11月17日'); capPlate(c, t - S.tArrest, 0.4, ['ボストン']); return { z: 1.05, fx: 160, fy: 112 }; }
    if (t > S.tTip) { R(c, 0, 0, W, H, '#2c2c34'); for (let i = 0; i < 12; i++) R(c, 20 + i * 26, 0, 6, H, '#3c3c44'); man(c, { id: 'hed', coat: '#8c8478', coat2: '#7c7468', pants: '#6c6458', boots: '#2c2c2c', skin: '#dcac88', hair: '#1c1814', moustache: true }, 140, 170, { k: 'hed', arm: 'point' }); man(c, CROWD[2], 200, 170, { k: 'hed', flip: true }); for (let i = 0; i < 12; i++) R(c, 22 + i * 26, 0, 4, H, '#5c5c64'); bigCap(c, '密告', 30, 24, '#f8d860'); return { z: 1.04, fx: 160, fy: 110 }; }
    usMap(c); const routes = [['phila', 'indy', 'detroit', 'toronto', '#f84040'], ['phila', 'detroit', 'toronto', '#f8d860'], ['phila', 'boston', '#8cb4f8']];
    routes.forEach((r, ri) => { const pts = r.slice(0, -1), col = r[r.length - 1], u = sg(t, 0.4 + ri * 0.8, 6 + ri * 0.8) * (pts.length - 1); for (let i = 0; i < pts.length - 1; i++) { const [x0, y0] = TOWN[pts[i]], [x1, y1] = TOWN[pts[i + 1]], k = clamp(u - i, 0, 1); if (k > 0) L(c, x0 + ri * 2, y0 + ri * 2, lerp(x0, x1, k) + ri * 2, lerp(y0, y1, k) + ri * 2, col, 2); } });
    Object.entries(TOWN).forEach(([k, [x, y]]) => E(c, x, y, 2.5, 2.5, '#f4f0e8'));
    TX(c, 'フィラデルフィア', 182, 80, '#f4f0e8', 16, '#000000'); TX(c, 'トロント', 254, 26, '#f4f0e8', 16, '#000000'); TX(c, 'インディアナポリス', 62, 100, '#f4f0e8', 16, '#000000');
    [['子ども', '#f84040'], ['ピツェルの妻', '#f8d860'], ['3番目の妻', '#8cb4f8']].forEach(([s, col], i) => { R(c, 10, 10 + i * 20, 12, 12, col); TX(c, s, 26, 8 + i * 20, '#f4f0e8', 16, '#000000'); });
    return { z: 1.02, fx: 200, fy: 70 };
  }
};

/* ---- ZG: detective Geyer's search — Toronto, Indianapolis (moves: Geyer walks, lamplight) ---- */
const ZG = {
  name: 'ガイヤー刑事', ch: '刑事の追跡', bgm: 'requiem',
  init(S) { S.tFind = at(S, 'L21', 2) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tFind) { R(c, 0, 0, W, H, '#0c0a10'); const n = sg(t, S.tFind + 0.4, S.tFind + 3) * 3; for (let i = 0; i < 3; i++) { const k = clamp(n - i, 0, 1); if (k > 0) { candle(c, 130 + i * 30, 140, t, i, k); glow(c, 130 + i * 30, 134, 14, 10, '#f8c060', 0.35 * k); } } return { z: 1.03, fx: 160, fy: 120 }; }
    gasSky(c, 120, { dusk: true }); for (let i = 0; i < 5; i++) { const x = i * 70; R(c, x, 70, 60, 80, ['#8c7c6c', '#7c6c5c'][i % 2]); PF(c, [x - 4, 72, x + 30, 50, x + 64, 72], '#4c3c3c'); R(c, x + 22, 110, 16, 40, '#4c3424'); }
    street(c, t, ST_Y); const k = sg(t, 0.2, S.tFind); man(c, GEYER, lerp(20, 260, k), ST_Y + 4, { k: 'gey', f: Math.floor(t * 5) & 3, arm: 'reach' });
    TX(c, k < 0.5 ? 'TORONTO' : 'INDIANAPOLIS', 20, 40, '#f4f0e8', 16, '#000000');
    capPlate(c, t, 0.4, ['フィラデルフィアの刑事', 'フランク・ガイヤー']);
    return { z: 1.03, fx: lerp(80, 240, k), fy: 112 };
  }
};

/* ---- ZI: the "Murder Castle" headlines; no evidence; the fire of August 1895 (moves: newspapers spin in, then flames) ---- */
const ZI = {
  name: '殺人の城', ch: '城の伝説', bgm: 'eerie',
  init(S) { S.tNone = at(S, 'L23', 0) - 0.3; S.tFire = at(S, 'L23', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFire) { gasSky(c, 120, { night: true }); castle(c, t, 70, ST_Y, {}); street(c, t, ST_Y); for (let i = 0; i < 16; i++) flame(c, 80 + (i * 37 % 160), ST_Y - 50 - hash(i) * 60, 1.6, t, i); glow(c, 150, 70, 120, 60, '#f86820', 0.35); for (let i = 0; i < 10; i++) { const u = fr(t * 0.3 + i / 10); E(c, 150 + Math.sin(i * 2 + t) * 30, 40 - u * 50, 10 + u * 20, 6 + u * 10, DA('#2c2420', 0.6 * (1 - u))); } yearFlash(c, t, S.tFire + 0.2, 1895, 216, 10, '8月'); return { z: 1.03, fx: 150, fy: 100 }; }
    R(c, 0, 0, W, H, '#2c2418');
    newspaper(c, 20, 20, 'MURDER CASTLE', '殺人の城', sg(t, 0.4, 1)); newspaper(c, 150, 36, 'HOLMES', '恐怖のホテル', sg(t, 1.6, 2.2));
    if (t > S.tNone) { dim(c, 0.5 * sg(t, S.tNone, S.tNone + 1)); bigCap(c, '証拠なし', 60, 24, '#8cf87c', sg(t, S.tNone + 0.6, S.tNone + 1.2)); }
    return { z: 1.03, fx: 160, fy: 90 };
  }
};

/* ---- ZJ: the trial; 27 confessions, 9 proven; "satanic" in his cell (moves: the confession pages pile up) ---- */
const ZJ = withCuts({
  name: '獄中', ch: '27件の自供', bgm: 'requiem',
  init(S) { S.tAlive = at(S, 'L25', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#3c3c40'); for (let y = 0; y < 150; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#444448'); R(c, 0, 150, W, 90, '#2c2c30');
    R(c, 210, 30, 40, 50, '#141418'); for (let i = 0; i < 4; i++) R(c, 214 + i * 10, 30, 2, 50, '#5c5c64'); softBeam(c, 230, 50, 2.2, 140, 0.25, 0.2);
    R(c, 60, 120, 120, 8, '#5c4c3c'); const n = Math.min(27, Math.floor(sg(t, 0.4, S.tAlive) * 27)); for (let i = 0; i < n; i++) R(c, 70 + (i % 3) * 30, 114 - Math.floor(i / 3) * 2, 24, 4, i % 2 ? '#f0e8d4' : '#e4dcc4');
    man(c, { ...HOLMES, id: 'holj', hat: null, coat: '#8c8478', coat2: '#7c7468', pants: '#6c6458' }, 200, 160, { k: 'jail', flip: true, arm: 'reach' });
    bigCap(c, t < S.tAlive ? '自供 ' + n + '件' : '立証 9件', 26, 24, t < S.tAlive ? '#f4f0e8' : '#f8d860');
    yearFlash(c, t, 0.3, 1895, 216, 10, '10月');
    return { z: 1.03, fx: 150, fy: 100 };
  }
}, [['H1', (c, t, S) => closeUp(c, t, holmesFace({ dark: true, jail: true, blink: blinkOf(t, 4) }), { bg: ['#0c0408', '#3c1018'], glow: '#c81818' })]]);

/* ---- ZK: May 7, 1896 — the gallows; a coffin set in cement (moves: the rope sways, cement pours) ---- */
const ZK = {
  name: '絞首刑', ch: '最期', bgm: 'requiem',
  init(S) { S.tCement = at(S, 'L27', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCement) { gasSky(c, 120, { dusk: true }); R(c, 0, 120, W, 120, '#3c3428'); for (let i = 0; i < 6; i++) { const x = 20 + i * 52 + (i > 2 ? 70 : 0); if (x > 300) continue; R(c, x, 96, 14, 26, '#8c8c90'); E(c, x + 7, 96, 7, 5, '#8c8c90'); } bareTree(c, 290, 122, 70, 3); man(c, CROWD[3], 250, 150, { k: 'gd', arm: 'reach', flip: true }); R(c, 90, 90, 140, 50, '#1c1410'); R(c, 110, 100, 100, 26, '#5c3c24'); const k = sg(t, S.tCement + 0.4, S.tCement + 3); R(c, 94, 140 - 46 * k, 132, 46 * k, '#a8a49c'); for (let i = 0; i < 6; i++) E(c, 100 + i * 22, 140 - 46 * k, 8, 3, '#b8b4ac'); return { z: 1.04, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#14141c'); R(c, 0, 150, W, 90, '#1c1c24'); glow(c, 160, 40, 80, 40, '#d8e0f8', 0.15);
    R(c, 100, 110, 120, 10, '#3c2c1c'); R(c, 106, 120, 8, 40, '#2c2018'); R(c, 206, 120, 8, 40, '#2c2018'); R(c, 150, 20, 6, 90, '#3c2c1c'); R(c, 150, 20, 60, 6, '#3c2c1c');
    const sw = Math.sin(t * 1.4) * 3; L(c, 200, 26, 200 + sw, 70, '#a88c5c', 2); ER(c, 200 + sw, 76, 6, 7, '#a88c5c');
    yearFlash(c, t, 0.4, 1896, 216, 10, '5月7日'); capPlate(c, t, 0.7, ['フィラデルフィア', 'モヤメンシング刑務所']);
    return { z: 1.03, fx: 170, fy: 90 };
  }
};

/* ---- ZL: legend vs truth; Pitezel and the three children (moves: the legend stamps fall, candles light) ---- */
const ZL = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tTrue = at(S, 'L29', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t < S.tTrue) { R(c, 0, 0, W, H, '#1c1418'); [['被害者 200人', 40], ['拷問の道具', 80], ['殺人ホテル', 120]].forEach(([s, y], i) => { const k = sg(t, 0.4 + i * 0.8, 0.8 + i * 0.8); if (k > 0) bigCap(c, s, y - 30, 24, '#f4f0e8', k); }); stamp(c, t, 3.4, 220, 110, '作り話', 90); return { z: 1.02, fx: 160, fy: 90 }; }
    gasSky(c, 120, { night: true }); castle(c, t, 70, ST_Y, {}); street(c, t, ST_Y); dim(c, 0.45, '#06060c');
    const n = (t - S.tTrue) * 2; for (let i = 0; i < 4; i++) { const k = clamp(n - i * 0.8, 0, 1); if (k > 0) { candle(c, 120 + i * 26, ST_Y + 8, t, i, k); glow(c, 120 + i * 26, ST_Y + 2, 12, 9, '#f8c060', 0.35 * k); } }
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 110 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { gasSky(c, 120, { night: true }); ferris(c, t, 50, 70, 40); castle(c, t, 130, ST_Y, { lit: true }); street(c, t, ST_Y); man(c, HOLMES, 116, ST_Y + 4, { k: 'ss1', expr: 'smile', blink: blinkOf(t, 3) }); return { z: 1.1, fx: 190, fy: 100 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { gasSky(c, 120, { night: true }); castle(c, t, 70, ST_Y, { lit: true }); street(c, t, ST_Y); dim(c, 0.3); return { z: 1.12, fx: 150, fy: 90 }; }
};
