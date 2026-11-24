/* ================= 記録 #021 下山事件: scenes ================= */
const SMC = (c, t) => closeUp(c, t, shimoFace({ blink: blinkOf(t, 5) }), { bg: ['#14141c', '#3c3c4c'], spk: 'shimoyama' });
const ONC = (c, t) => closeUp(c, t, ohnishiFace({ blink: blinkOf(t, 3) }), { bg: ['#0c0c14', '#2c2c3c'], spk: 'ohnishi' });
const OKC = (c, t) => closeUp(c, t, okamiFace({ blink: blinkOf(t, 4) }), { bg: ['#1c140c', '#4c3824'], spk: 'okami' });
const OTC = (c, t) => closeUp(c, t, otokoFace({ blink: blinkOf(t, 7) }), { bg: ['#0c0c0c', '#2c2824'], spk: 'otoko' });
function photo(c, x, y, s = 1.4) { R(c, x - 26 * s, y - 28 * s, 52 * s, 58 * s, '#e8e4d8'); R(c, x - 24 * s, y - 26 * s, 48 * s, 50 * s, '#8c8c84'); blit(c, shimoFace({}), x, y, 24, 24, { s: s * 0.95 }); }

/* ---- MZ: cold open — 1 a.m., rain on the tracks under the viaduct, lanterns; the first president of JNR; suicide or murder (moves: rain, lanterns sway, the two words) ---- */
const MZ = {
  name: '雨の線路', ch: '線路の上', bgm: 'eerie',
  init(S) { S.tWho = at(S, 'C1', 0) - 0.3; S.tQ = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tQ) { R(c, 0, 0, W, H, '#06060a'); photo(c, 160, 96, 1.3); const k = sg(t, S.tQ, S.tQ + 1); plate(c, lerp(-60, 40, k), 60, '自殺か', '#c8d0f0'); if (t > at(S, 'C2', 1) - 0.3) { const k2 = sg(t, at(S, 'C2', 1) - 0.3, at(S, 'C2', 1) + 0.7); plate(c, lerp(360, 212, k2), 112, '他殺か', '#f8a0a0'); } return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tWho) { R(c, 0, 0, W, H, '#141414'); photo(c, 160, 96, 1.5); plate(c, 40, 40, '初代国鉄総裁　下山定則', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 100 }; }
    crossing(c, t, { night: true, rain: 1 }); for (let i = 0; i < 4; i++) { person(c, i % 2 ? POLICE : DETS[i], 70 + i * 56, 152, { k: 'cz' + i, flip: i > 1 }); lantern(c, 80 + i * 56, 112, t); }
    R(c, 150, 136, 40, 8, '#3c3c34'); yearFlash(c, t, 0.4, '7.6', 216, 10, '午前1時');
    return { z: 1.06, fx: 160, fy: 112 };
  }
};

/* ---- MA: 1949 — occupation; JNR born in June; 100,000 to be cut; red flags in the streets (moves: a jeep, the counter falls, the demonstration marches) ---- */
const MA = {
  name: '人員整理', ch: '1949年の国鉄', bgm: 'pulse',
  init(S) { S.tJNR = at(S, 'L2', 0) - 0.3; S.tCut = at(S, 'L3', 0) - 0.3; S.tDemo = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDemo) { tokyoRoad(c, t); for (let i = 0; i < 10; i++) { const x = ((i * 34 + t * 18) % 380) - 30; person(c, WORKERS[i % 6], x, 156, { k: 'dm' + i, f: Math.floor(t * 4 + i) % 4, arm: i % 3 === 0 ? 'up' : null }); if (i % 3 === 0) { L(c, x + 10, 104, x + 10, 136, '#5c4c3c', 2); PF(c, [x + 10, 104, x + 26, 108 + Math.sin(t * 4 + i) * 2, x + 10, 114], '#c81818'); } } return { z: 1.06, fx: 160, fy: 112 }; }
    if (t > S.tCut) { R(c, 0, 0, W, H, '#1c1c20'); const n = Math.floor(lerp(60, 30, sg(t, S.tCut, S.dur - 1))); for (let i = 0; i < 60; i++) { const x = 30 + (i % 15) * 18, y = 50 + Math.floor(i / 15) * 22; c.save(); c.globalAlpha = i < n ? 1 : 0.2; person(c, WORKERS[i % 6], x, y + 20, { k: 'cut' + (i % 6), s: 0.4 }); c.restore(); } plate(c, 90, 46, '約10万人を減らす', '#f8a0a0'); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tJNR) { office(c, t); R(c, 100, 60, 120, 30, '#2c2c34'); TX(c, '日本国有鉄道', 112, 66, '#e8e8e0', 16, null); yearFlash(c, t, S.tJNR + 0.3, '6.1', 216, 10, '国鉄発足'); return { z: 1.04, fx: 160, fy: 96 }; }
    tokyoRoad(c, t); const x = ((t * 40) % 420) - 60; R(c, x, 128, 44, 12, '#5c6c4c'); R(c, x + 6, 120, 20, 8, '#5c6c4c'); E(c, x + 8, 141, 5, 5, '#1c1c1c'); E(c, x + 36, 141, 5, 5, '#1c1c1c'); person(c, GI, x + 18, 128, { k: 'gi', s: 0.7 }); yearFlash(c, t, 0.4, '1949', 216, 10, '昭和24年');
    return { z: 1.04, fx: 160, fy: 108 };
  }
};

/* ---- MB: the reluctant president — Shimoyama at the desk; nobody else would take it; July 5, 30,700 notices (moves: papers stack, the stamp) ---- */
const MB = {
  name: '初代総裁', ch: '初代国鉄総裁', bgm: 'pulse',
  init(S) { S.tNotice = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    office(c, t);
    if (t > S.tNotice) { const n = Math.min(20, Math.floor((t - S.tNotice) * 6)); for (let i = 0; i < n; i++) R(c, 30 + (i % 10) * 8, 140 - Math.floor(i / 10) * 4 - i * 0.6, 40, 4, i % 2 ? '#f4f0e8' : '#e0dcd0'); person(c, SHIMO, 200, 152, { k: 'nt', expr: 'sad', blink: blinkOf(t, 5) }); stamp(c, t, S.tNotice + 0.6, 140, 96, '解雇通告　3万700人', 170); yearFlash(c, t, S.tNotice + 0.2, '7.5', 216, 10, '1949年'); return { z: 1.06, fx: 160, fy: 104 }; }
    person(c, SHIMO, 160, 152, { k: 'ds', blink: blinkOf(t, 5) }); plate(c, 40, 46, '初代国鉄総裁　下山定則', '#f8e8b0');
    return { z: 1.1, fx: 160, fy: 110 };
  }
};

/* ---- MC: the morning drive — the Buick leaves at 8:20; Mitsukoshi, Shirokiya, Kanda, a bank (moves: the car runs, the town scrolls, destination plates change) ---- */
const MC = withCuts({
  name: '朝の公用車', ch: '7月5日の朝', bgm: 'pulse',
  init(S) { S.tZig = at(S, 'L8', 0) - 0.3; S.tBank = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    tokyoRoad(c, t, { speed: 60 }); buick(c, 110, 146, t, { move: true, driver: true, passenger: true });
    const dest = t > S.tBank ? ['神田駅', '銀行へ'][Math.min(1, Math.floor((t - S.tBank) / 2.5))] : t > S.tZig ? '三越へ' : null;
    if (dest) plate(c, 220, 60, dest, '#f8e8b0'); if (t < S.tZig) yearFlash(c, t, 0.4, '8:20', 216, 10, '自宅を出発');
    return { z: 1.08, fx: 160, fy: 116 };
  }
}, [['K1', SMC], ['K2', SMC]]);

/* ---- MD: Mitsukoshi — 25 hundred-yen notes from the safe; the south entrance; "5分くらいだから"; 9:37, the last sight; his bag and lunchbox left in the car (moves: he walks in, the doors, the empty seat) ---- */
const MD = withCuts({
  name: '三越', ch: '三越南口', bgm: 'eerie',
  init(S) { S.tLast = at(S, 'L11', 0) - 0.3; S.tBag = at(S, 'L11', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBag) { R(c, 0, 0, W, H, '#2c2824'); R(c, 40, 50, 240, 90, '#8c7458'); R(c, 40, 50, 240, 6, '#5c4c3c'); R(c, 90, 86, 60, 38, '#5c3c24'); R(c, 92, 88, 56, 4, '#7c5434'); R(c, 108, 80, 24, 8, '#3c2c1c'); R(c, 118, 100, 4, 6, '#c8a848'); R(c, 170, 100, 50, 24, '#e8d8a8'); R(c, 170, 100, 50, 4, '#a8885c'); L(c, 170, 112, 220, 112, '#c83c3c', 2); plate(c, 106, 128, '鞄', '#f8e8b0'); plate(c, 180, 128, '弁当', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tLast) { mitsukoshi(c, t); const k = sg(t, S.tLast, S.tLast + 3); c.save(); c.globalAlpha = 1 - k * 0.8; person(c, SHIMO, lerp(160, 160, k), lerp(150, 132, k), { k: 'gone', f: Math.floor(t * 3) % 4, s: lerp(1, 0.7, k) }); c.restore(); buick(c, 30, 150, t, { driver: true }); yearFlash(c, t, S.tLast + 0.2, '9:37', 216, 10, '午前'); return { z: 1.06, fx: 150, fy: 110 }; }
    if (t < at(S, 'L10', 1) - 0.3) { R(c, 0, 0, W, H, '#2c2824'); R(c, 60, 30, 200, 120, '#6c6c74'); for (let i = 0; i < 12; i++) R(c, 70 + (i % 6) * 32, 40 + Math.floor(i / 6) * 50, 26, 40, '#8c8c94'); const k = sg(t, 0.5, 3); for (let i = 0; i < 5; i++) R(c, 130 + i * 6, lerp(90, 140, k) - i * 2, 24, 10, '#c8b890'); plate(c, 40, 46, '貸金庫から百円札25枚', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    mitsukoshi(c, t); buick(c, 30, 150, t, { driver: true }); person(c, SHIMO, 150, 150, { k: 'mk', blink: blinkOf(t, 5) });
    return { z: 1.08, fx: 150, fy: 110 };
  }
}, [['K3', SMC]]);

/* ---- ME: the vanishing — the empty chair at the 9 a.m. meeting; 3:30 p.m. announcement; the driver waiting 8 hours; questioned (moves: the clock hands spin, the radio, the waiting car) ---- */
const ME = withCuts({
  name: '総裁が来ない', ch: '行方不明', bgm: 'eerie',
  init(S) { S.tRadio = at(S, 'L12', 1) - 0.3; S.tWait = at(S, 'L13', 0) - 0.3; S.tQ = at(S, 'L13b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tQ) { R(c, 0, 0, W, H, '#3c3834'); R(c, 0, 120, W, 70, '#2c2824'); R(c, 120, 112, 80, 8, '#5c4c3c'); R(c, 124, 120, 4, 30, '#4c3c2c'); R(c, 192, 120, 4, 30, '#4c3c2c'); glow(c, 160, 40, 40, 30, '#f8e8b0', 0.3); L(c, 160, 0, 160, 34, '#2c2c2c'); E(c, 160, 38, 6, 4, '#f8e8b0'); person(c, OHNISHI, 120, 150, { k: 'oq', expr: 'sad' }); person(c, DETS[0], 200, 150, { k: 'dq', flip: true, arm: 'wave' }); return { z: 1.1, fx: 160, fy: 108 }; }
    if (t > S.tWait) { mitsukoshi(c, t); dim(c, 0.3 * sg(t, S.tWait, S.tQ), '#3c2c1c'); buick(c, 120, 148, t, {}); person(c, OHNISHI, 100, 150, { k: 'ow', blink: blinkOf(t, 3) }); const h = lerp(9.6, 17.5, sg(t, S.tWait, S.tQ)); E(c, 60, 50, 14, 14, '#f4f0e8'); ER(c, 60, 50, 14, 14, '#2c2c2c'); const a = (h % 12) / 12 * TAU - Math.PI / 2, m = (h % 1) * TAU - Math.PI / 2; L(c, 60, 50, 60 + Math.cos(a) * 7, 50 + Math.sin(a) * 7, '#141414', 2); L(c, 60, 50, 60 + Math.cos(m) * 11, 50 + Math.sin(m) * 11, '#141414'); plate(c, 90, 40, '8時間、待ち続けた', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tRadio) { R(c, 0, 0, W, H, '#2c2420'); R(c, 120, 60, 80, 60, '#6c4c2c'); E(c, 145, 90, 16, 16, '#3c2c1c'); for (let i = 0; i < 4; i++) R(c, 170, 74 + i * 8, 22, 3, '#3c2c1c'); for (let i = 0; i < 3; i++) { const u = fr(t + i / 3); c.save(); c.globalAlpha = 1 - u; ER(c, 160, 90, 50 + u * 60, 30 + u * 40, '#f8e8b0'); c.restore(); } plate(c, 40, 46, '総裁、行方不明', '#f8a0a0'); return { z: 1.04, fx: 160, fy: 96 }; }
    office(c, t); R(c, 60, 116, 200, 12, '#5c3c24'); for (let i = 0; i < 6; i++) { if (i === 3) { R(c, 64 + i * 32, 96, 20, 20, '#7c5c3c'); continue; } person(c, DETS[i % 4], 74 + i * 32, 128, { k: 'mt' + i, s: 0.8 }); } plate(c, 40, 46, '空いた総裁の席', '#f8e8b0');
    return { z: 1.06, fx: 160, fy: 106 };
  }
}, [['N1', ONC]]);
const MH0 = { name: '男', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, d51Face({}), [[23, 13]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- MF: the trail — 1,050 sightings; Mitsukoshi → subway → Gotanno; the inn: "それは、勘弁してくれ", "おひとりで、さびしいですね"; at dusk a gentleman wandering the tracks, his back to the trains (moves: the map line, the inn's fan, the walker) ---- */
const MF = withCuts({
  name: '目撃', ch: '目撃された男', bgm: 'eerie',
  init(S) { S.tInn = Math.min(at(S, 'L15', 0), at(S, 'X1', 0)) - 0.3; S.tFutton = at(S, 'L15b', 0) - 0.3; S.tWalk = at(S, 'L16', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWalk) { crossing(c, t, { dusk: true }); const x = lerp(260, 80, fr(t * 0.06)); person(c, STRANGER, x, 136, { k: 'wa', f: Math.floor(t * 2) % 4, flip: true }); if (t > at(S, 'L16b', 0) - 0.3) { R(c, 300, 120, 20, 20, '#2c2c34'); E(c, 310, 124, 3, 3, '#f8f0c0'); } return { z: 1.08, fx: 160, fy: 108 }; }
    if (t > S.tInn) { ryokan(c, t); person(c, STRANGER, 230, 120, { k: 'rk', blink: blinkOf(t, 6) }); if (t > S.tFutton) person(c, OKAMI, 110, 150, { k: 'ok', arm: 'wave', flip: true }); plate(c, 40, 46, '末広旅館', '#f8e8b0'); return { z: 1.1, fx: 170, fy: 104 }; }
    R(c, 0, 0, W, H, '#d8d0bc'); for (let i = 0; i < 12; i++) R(c, (i * 31) % W, 0, 1, H, '#c8c0ac'); const pts = [[60, 120, '三越'], [130, 80, '地下鉄'], [200, 60, '浅草'], [270, 40, '五反野']]; const k = sg(t, 1, S.tInn - 0.5) * 3;
    for (let i = 0; i < 3; i++) { const p0 = pts[i], p1 = pts[i + 1], u = Math.max(0, Math.min(1, k - i)); if (u > 0) L(c, p0[0], p0[1], lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u), i === 2 ? '#8c8c8c' : '#c81818', 2); }
    for (let i = 0; i < 4; i++) { E(c, pts[i][0], pts[i][1], 4, 4, '#c81818'); if (k >= i) plate(c, pts[i][0] - 10, pts[i][1] + 6, pts[i][2], '#f8e8b0'); } plate(c, 40, 46, '目撃情報　1050件', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 96 };
  }
}, [['X1', OTC], ['O1', OKC]]);

/* ---- MG: 0:19 — the D51 freight with a failed headlight; 1 a.m., found; scattered over 90 m (not shown: a tarp and lanterns); the watch stopped at 0:20; the rain that washed it away (moves: the train thunders past, rain, the watch) ---- */
const MG = {
  name: '貨物列車', ch: '午前0時19分', bgm: 'dread',
  init(S) { S.tFound = at(S, 'L18', 0) - 0.3; S.tWatch = at(S, 'L19', 0) - 0.3; S.tRain = at(S, 'L19', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRain) { crossing(c, t, { night: true, rain: 1 }); for (let i = 0; i < 3; i++) lantern(c, 90 + i * 70, 112, t); R(c, 140, 136, 50, 8, '#3c3c34'); plate(c, 40, 46, '下山の涙雨', '#c8d0f0'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tWatch) { R(c, 0, 0, W, H, '#0c0c10'); E(c, 160, 96, 34, 34, '#c8b890'); E(c, 160, 96, 30, 30, '#f0ece0'); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; R(c, 160 + Math.cos(a) * 25, 96 + Math.sin(a) * 25, 2, 2, '#2c2c2c'); } L(c, 160, 96, 160, 78, '#141414', 2); L(c, 160, 96, 160 + Math.cos(TAU * 20 / 60 - Math.PI / 2) * 22, 96 + Math.sin(TAU * 20 / 60 - Math.PI / 2) * 22, '#141414'); rain(c, t, 0.6); plate(c, 40, 46, '0時20分で止まった時計', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tFound) { crossing(c, t, { night: true, rain: 0.5 }); for (let i = 0; i < 4; i++) { person(c, i % 2 ? POLICE : WORKERS[i], 60 + i * 66, 152, { k: 'fd' + i, flip: i > 1 }); lantern(c, 70 + i * 66, 112, t); } R(c, 140, 136, 50, 8, '#3c3c34'); plate(c, 40, 46, '約90メートル', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 110 }; }
    crossing(c, t, { night: true }); const x = lerp(-80, 420, sg(t, 0.5, S.tFound - 0.5)); d51(c, x, 140, t, { dim: true }); yearFlash(c, t, 0.4, '0:19', 216, 10, '7月6日');
    return { z: 1.04, fx: 160, fy: 108 };
  }
};

/* ---- MH: the dispute — Tokyo Univ.: run over after death (murder); Keio: run over alive (suicide); the papers split; the emergency conference (moves: two doctors face off, newspapers slap down) ---- */
const MH = {
  name: '死後轢断', ch: '自殺か、他殺か', bgm: 'pulse',
  init(S) { S.tKeio = at(S, 'L21', 0) - 0.3; S.tPapers = at(S, 'L22', 0) - 0.3; S.tConf = at(S, 'L22b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tConf) { R(c, 0, 0, W, H, '#2c2c34'); R(c, 0, 0, W, 50, '#1c1c24'); for (let i = 0; i < 6; i++) R(c, i * 56, 0, 40, 50, '#3c2c2c'); for (let i = 0; i < 6; i++) person(c, DETS[i % 4], 40 + i * 48, 160, { k: 'au' + i, s: 0.8 }); person(c, DOCS[1], 230, 124, { k: 'sp', arm: 'wave' }); plate(c, 40, 56, '緊急の法医学会', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tPapers) { R(c, 0, 0, W, H, '#3c3830'); for (let i = 0; i < 2; i++) { const k = eOut(sg(t, S.tPapers + i * 0.8, S.tPapers + i * 0.8 + 0.4)); const x = lerp(i ? 360 : -150, i ? 170 : 20, k); R(c, x, 40, 130, 100, '#f0ece0'); R(c, x + 4, 44, 122, 14, '#2c2c2c'); TX(c, i ? '自殺' : '他殺', x + 46, 64, i ? '#2c4c8c' : '#c81818', 16, null); for (let j = 0; j < 5; j++) R(c, x + 8, 90 + j * 8, 114, 2, '#8c8c8c'); } return { z: 1.03, fx: 160, fy: 96 }; }
    lab(c, t); person(c, DOCS[0], 100, 156, { k: 'td', arm: 'wave' }); plate(c, 40, 46, '東大　死後轢断', '#f8a0a0');
    if (t > S.tKeio) { person(c, DOCS[1], 220, 156, { k: 'kd', arm: 'wave', flip: true }); plate(c, 150, 76, '慶應など　生体轢断', '#c8d0f0'); }
    return { z: 1.06, fx: 160, fy: 108 };
  }
};


/* ---- MI: the turn — three weeks later: luminol at night, the sleepers glow for 200 m; oil soaked into his clothes, vegetable oil; "he died where oil flowed" (moves: the glow spreads sleeper by sleeper, the stain darkens) ---- */
const MI = {
  name: 'ルミノール', ch: '光る枕木', bgm: 'dread',
  init(S) { S.tGlow = at(S, 'L24', 0) - 0.3; S.tOil = at(S, 'L25', 0) - 0.3; S.tTheory = at(S, 'L26', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTheory) { crossing(c, t, { night: true, glow: 1 }); shadow(c, DETS[1], 120, 150, { k: 'th1', col: '#4c5468' }); shadow(c, DETS[3], 150, 150, { k: 'th2', col: '#4c5468' }); plate(c, 40, 46, '他殺説、勢いづく', '#f8a0a0'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tOil) { R(c, 0, 0, W, H, '#1c1c20'); PF(c, [110, 66, 140, 62, 160, 72, 180, 62, 210, 66, 236, 92, 218, 100, 214, 96, 214, 156, 106, 156, 106, 96, 102, 100, 84, 92], '#e8e4d8'); PF(c, [140, 62, 160, 82, 180, 62, 172, 62, 160, 74, 148, 62], '#c8c4b8'); for (let i = 0; i < 5; i++) E(c, 160, 90 + i * 12, 1.5, 1.5, '#a8a49c'); for (let i = 0; i < 9; i++) { const k = sg(t, S.tOil + i * 0.3, S.tOil + i * 0.3 + 1); c.save(); c.globalAlpha = 0.6 * k; E(c, 130 + (i % 3) * 26 + Math.sin(i) * 6, 96 + Math.floor(i / 3) * 20, 10 + (i % 2) * 4, 7, '#5c4c24'); c.restore(); } plate(c, 40, 46, '植物性の油　下山油', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tGlow) { crossing(c, t, { night: true, glow: sg(t, S.tGlow + 0.5, S.tOil - 1) }); person(c, DOCS[0], 270, 150, { k: 'lu', arm: 'wave', flip: true }); for (let i = 0; i < 6; i++) { const u = fr(t * 2 + i / 6); c.save(); c.globalAlpha = 0.5 * (1 - u); P(c, 250 - u * 20, 120 + u * 16 + i, '#c8f8f8'); c.restore(); } plate(c, 40, 46, '約200メートル', '#a8f8f0'); return { z: 1.06, fx: 200, fy: 112 }; }
    crossing(c, t, { night: true }); dim(c, 0.4); for (let i = 0; i < 3; i++) shadow(c, DETS[i], 100 + i * 40, 150, { k: 'lv' + i, col: '#4c5468' }); yearFlash(c, t, 0.3, '7.25', 216, 10, '約3週間後');
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- MJ: the police said suicide — witnesses always saw him alone; Aug 1 meeting: all say suicide; the release blocked by pressure; GHQ called it murder on day one (moves: hands raised, the "中止" stamp, the GHQ report) ---- */
const MJ = {
  name: '捜査一課', ch: '公表されなかった結論', bgm: 'pulse',
  init(S) { S.tMeet = at(S, 'L28', 0) - 0.3; S.tStop = at(S, 'L29', 0) - 0.3; S.tGHQ = at(S, 'L30', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGHQ) { R(c, 0, 0, W, H, '#2c3028'); R(c, 90, 30, 140, 110, '#f0ece0'); R(c, 94, 34, 132, 12, '#3c4c3c'); TX(c, 'Murder of', 110, 54, '#141414', 16, null); TX(c, 'Shimoyama', 110, 74, '#141414', 16, null); for (let i = 0; i < 5; i++) R(c, 100, 96 + i * 8, 120, 2, '#8c8c8c'); stamp(c, t, S.tGHQ + 0.6, 240, 60, 'GHQ', 60, '#2c4c8c'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tStop) { R(c, 0, 0, W, H, '#1c1c20'); R(c, 100, 40, 120, 90, '#f0ece0'); TX(c, '捜査結果', 128, 52, '#2c2c2c', 16, null); TX(c, '自殺', 144, 76, '#2c4c8c', 16, null); stamp(c, t, at(S, 'L29', 1), 160, 90, '公表中止', 110); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tMeet) { R(c, 0, 0, W, H, '#3c3834'); R(c, 0, 120, W, 70, '#2c2824'); R(c, 40, 104, 240, 12, '#5c3c24'); for (let i = 0; i < 6; i++) person(c, DETS[i % 4], 40 + i * 30, 150, { k: 'mm' + i, arm: t > S.tMeet + 1 + i * 0.2 ? 'up' : null }); plate(c, 40, 46, '全員が「自殺」', '#c8d0f0'); yearFlash(c, t, S.tMeet + 0.2, '8.1', 216, 10, '捜査会議'); return { z: 1.04, fx: 160, fy: 104 }; }
    crossing(c, t, { dusk: true }); person(c, STRANGER, 140, 136, { k: 'al', f: Math.floor(t * 2) % 4, flip: true }); plate(c, 40, 46, '目撃された男は、いつも一人', '#c8d0f0');
    return { z: 1.06, fx: 160, fy: 104 };
  }
};

/* ---- MK: unsolved — the HQ disbands without a word; 1964, the statute runs out; Mitaka and Matsukawa follow within a month (moves: files close, the calendar falls, three plates) ---- */
const MK = {
  name: '迷宮入り', ch: '迷宮入り', bgm: 'requiem',
  init(S) { S.tLimit = at(S, 'L31', 1) - 0.3; S.tThree = at(S, 'L32', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tThree) { R(c, 0, 0, W, H, '#14141c'); const ns = ['下山事件', '三鷹事件', '松川事件']; for (let i = 0; i < 3; i++) if (t > S.tThree + 0.4 + i * 1.2) { R(c, 30 + i * 96, 60, 84, 50, '#2c2c34'); d51(c, 50 + i * 96, 106, t * 0.2, { dim: true }); plate(c, 40 + i * 96, 116, ns[i], '#f8e8b0'); } return { z: 1.03, fx: 160, fy: 96 }; }
    archive(c, t); if (t > S.tLimit) stamp(c, t, S.tLimit + 0.4, 160, 90, '1964年　時効', 130); else plate(c, 40, 50, '捜査本部　解散', '#f8e8b0');
    return { z: 1.04, fx: 160, fy: 96 };
  }
};

/* ---- ML: the riddle — about 15 hours; a 2-hour blank; glasses, tie, lighter never found; (pause) suicide or murder; no answer (moves: the timeline fills, the gap stays dark, three missing objects blink) ---- */
const ML = {
  name: '空白', ch: '消えた2時間', bgm: 'eerie',
  init(S) { S.tItems = at(S, 'L34', 0) - 0.3; S.tQ = at(S, 'L35', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tQ) { crossing(c, t, { night: true }); lantern(c, 160, 100, t); TX(c, '？', 156, 60, '#f8e8b0', 16, null); return { z: 1.06 + 0.06 * sg(t, S.tQ, S.dur), fx: 160, fy: 104 }; }
    if (t > S.tItems) { R(c, 0, 0, W, H, '#0c0c10'); const items = ['眼鏡', 'ネクタイ', 'ライター']; for (let i = 0; i < 3; i++) { const x = 60 + i * 100; c.save(); c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3 + i); if (i === 0) { ER(c, x - 8, 80, 8, 6, '#a8a8b0'); ER(c, x + 8, 80, 8, 6, '#a8a8b0'); L(c, x - 1, 80, x + 1, 80, '#a8a8b0'); } if (i === 1) PF(c, [x - 4, 60, x + 4, 60, x + 8, 100, x, 108, x - 8, 100], '#5c3c3c'); if (i === 2) { R(c, x - 8, 70, 16, 24, '#a8a8b0'); R(c, x - 6, 64, 8, 6, '#8c8c94'); } c.restore(); plate(c, x - 20, 116, items[i], '#f8e8b0'); } return { z: 1.03, fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#14141c'); R(c, 30, 90, 260, 10, '#3c3c44'); const k = sg(t, 0.5, S.tItems - 1); const xs = [[30, 110], [110, 150], [150, 190], [190, 290]]; for (let i = 0; i < 4; i++) { if (k * 4 > i) R(c, xs[i][0], 90, Math.min(1, k * 4 - i) * (xs[i][1] - xs[i][0]), 10, i === 2 ? '#0c0c0c' : '#c8a050'); } if (k > 0.6) { ER(c, 170, 95, 26, 14, '#c81818'); plate(c, 140, 116, '空白の2時間', '#f8a0a0'); } plate(c, 40, 60, '9:37', '#f8e8b0'); plate(c, 250, 60, '0:19', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 96 };
  }
};

/* ---- MM: in memory — the crossing at dawn, flowers by the rail (moves: mist, birds, light rising) ---- */
const MM = {
  name: '夜明けの線路', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    crossing(c, t, { dusk: true }); for (let i = 0; i < 5; i++) { const x = 140 + i * 8; L(c, x, 150, x, 140, '#3c6c3c'); for (let k = 0; k < 6; k++) E(c, x + Math.cos(k) * 3, 138 + Math.sin(k) * 3, 2, 2, '#f4f0e8'); }
    for (let i = 0; i < 3; i++) { const u = fr(t * 0.06 + i / 3); P(c, u * 340 - 10, 30 + i * 8, '#2c2c2c'); P(c, u * 340 - 8, 29 + i * 8, '#2c2c2c'); } dim(c, 0.3 * sg(t, 2, 14));
    return { z: 1.04, fx: 160, fy: 104 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '消えた総裁', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { crossing(c, t, { night: true, rain: 1 }); for (let i = 0; i < 3; i++) { person(c, i % 2 ? POLICE : DETS[i], 110 + i * 50, 152, { k: 's1' + i, flip: i > 0 }); lantern(c, 120 + i * 50, 112, t); } R(c, 150, 136, 40, 8, '#3c3c34'); return { z: 1.12, fx: 160, fy: 110 }; } };
const SS2 = { name: '三越', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { mitsukoshi(c, t); buick(c, 40, 150, t, { driver: true }); person(c, SHIMO, lerp(150, 170, sg(t, 0, S.dur)), 150, { k: 's2', f: Math.floor(t * 3) % 4 }); return { z: 1.08, fx: 150, fy: 110 }; } };
