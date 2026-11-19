/* ================= 文庫 #011 夢十夜: scenes ================= */
const GY = 156;
const ZCLOSE = (c, t) => closeUp(c, t, kozoFace({ smile: true }), { bg: ['#06080c', '#1c2430'], glow: '#5c7c9c', spk: 'kozo', talk: false });
const OCLOSE = (c, t) => closeUp(c, t, onnaFace({ blink: blinkOf(t, 5) }), { bg: ['#1c1820', '#4c3c48'], glow: '#f8e8f0', spk: 'onna', talk: false });
const JCLOSE = (c, t) => closeUp(c, t, jibunFace({ blink: blinkOf(t, 4) }), { bg: ['#0c1424', '#3c4c6c'], glow: '#f8f0c8', spk: 'jibun' });

/* ---- YZ: cold open — the dark paddy path, a man with his blind child on his back; "こんな夢を見た" (moves: walking, herons, mist) ---- */
const YZ = withCuts({
  name: '背中の子', ch: 'こんな夢を見た', bgm: 'eerie',
  init(S) { S.tTalk = at(S, 'C1', 0) - 0.3; S.tDream = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tDream) { R(c, 0, 0, W, H, '#06060a'); bigCap(c, 'こんな夢を見た。', 70, 32, '#e8e4dc', sg(t, S.tDream + 0.2, S.tDream + 1)); return { z: 1.02, fx: 160, fy: 96 }; }
    nightField(c, t, {}); const u = sg(t, 0.5, S.tDream); carrying(c, t, lerp(120, 200, u), 160, { f: Math.floor(t * 3) & 3 }); heron(c, 60 + mod(t * 20, 260), 70, t);
    if (t > S.tTalk) { c.save(); c.globalAlpha = 0.85; blit(c, kozoFace({}), 260, 70, 24, 24, { s: 1.2 }); c.restore(); }
    return { z: 1.04 + 0.04 * ss(sg(t, 0, S.tDream)), fx: 170, fy: 120 };
  }
}, [['M1', ZCLOSE]]);

/* ---- YA: the frame — ten dreams, three tonight (moves: pages turn) ---- */
const YA = {
  name: '十の夢', ch: '十の夢', bgm: 'memory',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#2c2418'); R(c, 40, 40, 240, 110, '#f0ead8'); R(c, 158, 40, 4, 110, '#c8bca0');
    const nights = ['第一夜', '第二夜', '第三夜', '第四夜', '第五夜', '第六夜', '第七夜', '第八夜', '第九夜', '第十夜']; const n = Math.floor(sg(t, 0.3, at(S, 'L1', 1, 4)) * 10.99);
    for (let i = 0; i < Math.min(10, n); i++) { const sel = [0, 2, 6].includes(i) && t > at(S, 'L1', 2, 1e9) - 0.3; TX(c, nights[i], i < 5 ? 56 : 176, 48 + (i % 5) * 20, sel ? '#c82c2c' : '#5c5040', 16, null); }
    if (t > at(S, 'L2', 0, 1e9) - 0.3) bigCap(c, '第一夜', 60, 32, '#f8e8b0', sg(t, at(S, 'L2', 0) - 0.3, at(S, 'L2', 0) + 0.3));
    return { z: 1.03, fx: 160, fy: 96 };
  }
};

/* ---- YB: the first night — the woman who says she will die; her eyes; "wait a hundred years"; the pearl shell and the star; the red suns; the lily; the morning star (moves: suns arc, the stem grows) ---- */
const YB = withCuts({
  name: '百年待つ', ch: '第一夜', bgm: 'memory',
  init(S) { S.tLook = at(S, 'L5', 0) - 0.3; S.tSun = at(S, 'L6', 0) - 0.3; S.tDie = at(S, 'L7', 0) - 0.3; S.tDig = at(S, 'L8', 0) - 0.3; S.tStar = at(S, 'L9', 0) - 0.3; S.tWait = at(S, 'L10', 0) - 0.3; S.tMany = at(S, 'L11', 0) - 0.3; S.tDoubt = at(S, 'L12', 0) - 0.3; S.tLily = at(S, 'L13', 0) - 0.3; S.tKiss = at(S, 'L14', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tKiss) { VG(c, 0, 0, W, 130, ['#1c2848', '#5c6c9c', '#e8b0a0']); R(c, 0, 130, W, 60, '#2c3c2c'); E(c, 240, 30, 2, 2, '#ffffff'); glow(c, 240, 30, 20, 20, '#ffffff', 0.3 + 0.4 * Math.abs(Math.sin(t * 3))); const sw = Math.sin(t * 1.4) * 4; L(c, 150, 136, 150 + sw, 96, '#5c9c4c', 2); E(c, 150 + sw, 92, 7, 10, '#f8f8f4'); E(c, 146 + sw, 90, 4, 7, '#ffffff'); const dp = fr(t * 0.6); E(c, 152 + sw, 100 + dp * 30, 1.5, 2, '#c8e8f8'); E(c, 160, 128, 10, 6, '#9c9c94'); robe(c, JIBUN, 180, 156, { k: 'ks', pose: 'kneel', flip: true }); return { z: 1.04, fx: 170, fy: 110 }; }
    if (t > S.tLily) { R(c, 0, 0, W, H, '#0c1424'); R(c, 0, 130, W, 60, '#1c2c1c'); E(c, 160, 132, 14, 8, '#9c9c94'); const g = eOut(sg(t, S.tLily + 0.3, at(S, 'L13', 2))); L(c, 158, 128, 158 + 4 * g, 128 - 50 * g, '#5c9c4c', 2); if (g >= 1) { const o = sg(t, at(S, 'L13', 2), at(S, 'L13', 3)); E(c, 162, 76, 4 + 4 * o, 8 + 2 * o, '#f8f8f4'); } robe(c, JIBUN, 210, 156, { k: 'ly', pose: 'sit', flip: true }); for (let i = 0; i < 10; i++) { const x = 40 + i * 28 + Math.sin(t + i) * 10, y = 60 + Math.sin(t * 0.7 + i * 2) * 30 + i * 4; c.save(); c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4 + i); E(c, x, y, 1.5, 1.5, '#e8f8a0'); c.restore(); } return { z: 1.04 + 0.05 * ss(sg(t, S.tLily, S.tKiss)), fx: 170, fy: 110 }; }
    if (t > S.tDoubt) { VG(c, 0, 0, W, 130, ['#1c1008', '#5c2c18', '#8c4c2c']); sunArc(c, t, fr((t - S.tDoubt) / 4)); R(c, 0, 130, W, 60, '#2c2418'); E(c, 160, 132, 14, 8, '#9c9c94'); robe(c, JIBUN, 200, 156, { k: 'db', pose: 'sit', flip: true, expr: 'sad' }); for (let i = 0; i < 3; i++) TX(c, '？', 220 + i * 10, 80 - i * 8, '#c8c0b0', 16, null); return { z: 1.03, fx: 180, fy: 110 }; }
    if (t > S.tWait) { VG(c, 0, 0, W, 130, ['#2c1c18', '#8c4c2c', '#e8903c']); R(c, 0, 130, W, 60, '#3c3c24'); const per = t > S.tMany ? 1.2 : 3; const u = fr((t - S.tWait) / per); sunArc(c, t, u); if (t > S.tMany) for (let i = 1; i < 4; i++) sunArc(c, t, fr(u + i * 0.25)); E(c, 150, 132, 14, 8, '#9c9c94'); robe(c, JIBUN, 190, 156, { k: 'wt', pose: 'sit', flip: true }); const cnt = t > S.tMany ? '…' : (t > at(S, 'L10', 5) - 0.3 ? 'ふたつ' : t > at(S, 'L10', 3) - 0.3 ? 'ひとつ' : ''); if (cnt) plate(c, 30, 46, cnt, '#f8e8b0'); return { z: 1.03, fx: 170, fy: 110 }; }
    if (t > S.tStar) { R(c, 0, 0, W, H, '#060a18'); for (let i = 0; i < 30; i++) P(c, hash(i) * W, hash(i * 3) * 100, '#c8d0e8'); R(c, 0, 130, W, 60, '#1c2418'); E(c, 160, 132, 30, 8, '#3c3424'); const u = sg(t, S.tStar + 0.3, S.tWait - 0.6); E(c, lerp(260, 160, u), lerp(10, 124, u), 8, 7, '#e8e8d8'); glow(c, lerp(200, 160, u), lerp(20, 124, u), 16, 14, '#fff8d0', 0.4); robe(c, JIBUN, 210, 156, { k: 'st', pose: 'kneel', flip: true }); for (let i = 0; i < 12; i++) { const a = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.7); c.save(); c.globalAlpha = a; R(c, hash(i * 5) * W, hash(i * 9) * 100, 2, 2, '#f8f8ff'); c.restore(); } glow(c, 160, 124, 30, 18, '#fff8d0', 0.2 + 0.15 * Math.sin(t * 2)); return { z: 1.03, fx: 170, fy: 110 }; }
    if (t > S.tDig) { R(c, 0, 0, W, H, '#060a18'); E(c, 260, 40, 14, 14, '#f4f0dc'); glow(c, 260, 40, 40, 40, '#f8f0c8', 0.2); R(c, 0, 130, W, 60, '#1c2418'); E(c, 150, 136, 34, 8, '#14100c'); robe(c, JIBUN, 190, 156, { k: 'dg', pose: 'kneel', flip: true, arm: 'reach' }); const ph = fr(t * 0.8); E(c, 170, 128 + Math.sin(ph * TAU) * 4, 7, 4, '#e8e4f0'); if (Math.sin(t * 5) > 0.3) P(c, 170, 126, '#ffffff'); return { z: 1.04, fx: 170, fy: 120 }; }
    if (t > S.tDie) { return closeUp(c, t, onnaFace({ blink: t > at(S, 'L7', 2) - 0.3 ? 2 : 0, tear: t > at(S, 'L7', 3) - 0.3 }), { bg: ['#1c1820', '#4c3c48'], talk: false }); }
    if (t > S.tSun) { VG(c, 0, 0, W, 130, ['#1c1428', '#8c4c4c', '#e8803c']); R(c, 0, 130, W, 60, '#2c2418'); sunArc(c, t, fr((t - S.tSun) / 3)); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tLook) { R(c, 0, 0, W, H, '#0c0c10'); E(c, 160, 96, 70, 46, '#f8f4f0'); E(c, 160, 96, 38, 38, '#0c0c10'); c.save(); c.globalAlpha = 0.7; robe(c, JIBUN, 160, 120, { k: 'refl', s: 0.6 }); c.restore(); E(c, 144, 80, 6, 4, '#ffffff'); for (let i = 0; i < 9; i++) L(c, 96 + i * 16, 56, 92 + i * 16, 44, '#0c0c10', 2); return { z: 1.03 + 0.06 * ss(sg(t, S.tLook, S.tSun)), fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#3c3028'); R(c, 0, 0, W, 140, '#4c3c30'); for (let x = 0; x < W; x += 40) R(c, x, 0, 2, 140, '#3c2c20'); R(c, 0, 140, W, 50, '#a89c74'); futon(c, 50, 136); PF(c, [36, 126, 40, 118, 60, 116, 72, 122, 70, 134, 40, 134], '#0c0c10'); E(c, 62, 126, 8, 7, '#f8ece4'); L(c, 58, 125, 61, 125, '#2c1c1c'); L(c, 64, 125, 67, 125, '#2c1c1c'); R(c, 61, 129, 3, 1, '#c82c3c'); R(c, 70, 128, 104, 12, '#d8d0e0'); R(c, 70, 128, 104, 3, '#c8c0d4'); for (let k = 0; k < 4; k++) R(c, 84 + k * 24, 130, 1, 10, '#b8b0c8'); robe(c, JIBUN, 220, 156, { k: 'sit1', pose: 'sit', flip: true, blink: blinkOf(t, 4) });
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V1', OCLOSE], ['V2', OCLOSE], ['V3', JCLOSE]]);

/* ---- YC: the third night — the blind child who knows everything; herons; the forest; the red-lettered stone; the rain; the cedar; "a hundred years ago"; he becomes stone-heavy (moves: walking, herons, rain, the weight) ---- */
const YC = withCuts({
  name: '第三夜', ch: '第三夜', bgm: 'dread',
  init(S) { S.tStart = Math.min(at(S, 'L16', 0), at(S, 'L17', 0)) - 0.3; S.tField = at(S, 'L18', 0) - 0.3; S.tHeron = at(S, 'L19', 0) - 0.3; S.tFear = at(S, 'L20', 0, at(S, 'T2', 0)) - 0.3; S.tForest = at(S, 'L21', 0) - 0.3; S.tStone = at(S, 'L23', 0) - 0.3; S.tRain = at(S, 'L26', 0) - 0.3; S.tCedar = at(S, 'V8', 0) - 0.3; S.tYear = at(S, 'V9', 0) - 0.3; S.tRecall = at(S, 'L29', 0) - 0.3; S.tHeavy = at(S, 'L30', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tHeavy) { nightField(c, t, { rain: true }); cedar(c, 230, 160); const k = sg(t, at(S, 'L30', 2) - 0.2, at(S, 'L30', 3)); robe(c, JIBUN, 170, 156 + k * 6, { k: 'hv', pose: k > 0.5 ? 'kneel' : 'stand', expr: 'shock' }); blit(c, k > 0.5 ? tintSpr(robeFig(KOZO, { k: 'bk2', pose: 'sit' }), '#8c8c84', 'stoneK2') : robeFig(KOZO, { k: 'bk2', pose: 'sit', blink: 2 }), 164, 130 + k * 14, FIG_AX2, FIG_AY2, { s: 0.6 + k * 0.15 }); return { z: 1.05, fx: 180, fy: 120, sx: k > 0.5 && k < 1 ? Math.round(Math.sin(t * 50) * 2) : 0 }; }
    if (t > S.tRecall) { R(c, 0, 0, W, H, '#100808'); c.save(); c.globalAlpha = 0.8; nightField(c, t, { rain: true }); cedar(c, 200, 160); c.restore(); c.save(); c.globalAlpha = 0.35 + 0.25 * Math.sin(t * 3); c.fillStyle = '#7c1c1c'; c.fillRect(0, 0, W, H); c.restore(); blit(c, tintSpr(robeFig(JIBUN, { k: 'past', arm: 'up' }), '#140808', 'pastJ'), 150 + Math.sin(t * 2) * 6, 160, FIG_AX2, FIG_AY2, {}); return { z: 1.04, fx: 170, fy: 110 }; }
    if (t > S.tYear) { R(c, 0, 0, W, H, '#06080c'); nightField(c, t, { rain: true }); dim(c, 0.4); cedar(c, 230, 160); carrying(c, t, 170, 156, {}); if (t > S.tYear + 0.2) plate(c, 186, 46, '文化五年 辰年', '#e8a0a0'); return { z: 1.04, fx: 180, fy: 110 }; }
    if (t > S.tCedar) { nightField(c, t, { rain: true }); cedar(c, 240, 160); carrying(c, t, 180, 156, { f: t < at(S, 'L27', 1, 1e9) ? Math.floor(t * 3) & 3 : -1 }); return { z: 1.04 + 0.05 * ss(sg(t, S.tCedar, S.tYear)), fx: 210, fy: 110 }; }
    if (t > S.tRain) { nightField(c, t, { rain: true, forest: true }); carrying(c, t, 150, 156, { f: Math.floor(t * 5) & 3 }); glow(c, 144, 120, 16, 16, '#c8d8f8', 0.4 + 0.2 * Math.sin(t * 3)); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tStone) { nightField(c, t, { forest: true }); signStone(c, 140, 160); carrying(c, t, 190, 156, { f: t > at(S, 'L24', 0, 1e9) ? Math.floor(t * 3) & 3 : -1 }); if (t < at(S, 'L24', 0, 1e9)) plate(c, 20, 46, '左 日ヶ窪　右 堀田原', '#e8a0a0'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tForest) { nightField(c, t, { forest: true }); carrying(c, t, 120, 156, { f: Math.floor(t * 3) & 3 }); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tFear) { nightField(c, t, { forest: true, rain: t > S.tFear + 12 }); const fu = sg(t, S.tFear, S.tFear + 30); carrying(c, t, lerp(60, 220, fu), 156, { f: Math.floor(t * 4) & 3 }); dim(c, 0.2 + 0.1 * Math.sin(t * 2), '#06080c'); return { z: 1.06, fx: lerp(90, 220, fu), fy: 120 }; }
    if (t > S.tField) { nightField(c, t, {}); carrying(c, t, 140, 156, { f: Math.floor(t * 3) & 3 }); if (t > S.tHeron) { heron(c, 80 + (t - S.tHeron) * 14, 64, t); heron(c, 220 + (t - S.tHeron) * 10, 50, t + 1); } return { z: 1.04, fx: 150, fy: 110 }; }
    if (t > S.tStart) { nightField(c, t, {}); carrying(c, t, 160, 156, {}); c.save(); c.globalAlpha = 0.85; blit(c, kozoFace({}), 250, 70, 24, 24, { s: 1.2 }); c.restore(); if (t < at(S, 'L17', 0, 1e9)) bigCap(c, '第三夜', 60, 32, '#f8e8b0', sg(t, S.tStart, S.tStart + 0.6)); return { z: 1.04, fx: 170, fy: 110 }; }
    R(c, 0, 0, W, H, '#140c0c'); bigCap(c, '美しいとは限らない', 74, 24, '#c8c0b0', sg(t, 0.3, 1));
    return { z: 1.02, fx: 160, fy: 96 };
  }
}, [['V4', ZCLOSE], ['V5', ZCLOSE], ['V6', ZCLOSE], ['V7', ZCLOSE], ['V8', ZCLOSE], ['V10', (c, t) => closeUp(c, t, kozoFace({ smile: true }), { bg: ['#0c0406', '#3c0c10'], glow: '#c81c1c', spk: 'kozo', talk: false })]]);

/* ---- YD: the seventh night — the steamer chasing the sun; sailors' chant; the foreigner and the stars; the crying woman; the jump; the slow fall to black water (moves: smoke, the sun sinks hissing, the fall) ---- */
const YD = withCuts({
  name: '第七夜', ch: '第七夜', bgm: 'eerie',
  init(S) { S.tSun = at(S, 'L33', 0) - 0.3; S.tAsk = at(S, 'V11', 0) - 0.3; S.tChant = at(S, 'L34b', 0) - 0.3; S.tStars = at(S, 'L34c', 0) - 0.3; S.tLonely = at(S, 'L35', 0) - 0.3; S.tCry = at(S, 'L35b', 0) - 0.3; S.tJump = at(S, 'L36', 0) - 0.3; S.tRegret = at(S, 'L37', 0) - 0.3; S.tFall = at(S, 'L38', 0) - 0.3; S.tGone = at(S, 'L39', 0) - 0.3; S.tDown = at(S, 'L40', 0) - 0.3; S.tEnd = at(S, 'L40b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tEnd) { R(c, 0, 0, W, H, '#0c1424'); sea(c, t, 100, '#0c1c30'); for (let i = 0; i < 8; i++) { const u = fr(t * 0.2 + i / 8); c.save(); c.globalAlpha = 0.6 * (1 - u); ER(c, 160, 110, 20 + u * 140, 6 + u * 40, '#8cacc8'); c.restore(); } return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tDown) { R(c, 0, 0, W, H, '#141c30'); sea(c, t, 150, '#0c1424'); for (let i = 0; i < 10; i++) { const u = fr(t * 0.6 + i / 10); E(c, 40 + i * 26, 150 - u * 20, 2, 2, DA('#c8d8f8', 1 - u)); } const u = sg(t, S.tDown, S.tEnd); robe(c, JIBUN, 160, lerp(90, 150, u), { k: 'dn', arm: 'up', expr: 'sad', s: lerp(1, 0.5, u) }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tGone) { VG(c, 0, 0, W, 120, ['#0c0e18', '#1c2030']); sea(c, t, 120, '#0c1420'); ship(c, t, 160 + (t - S.tGone) * 14, 116); robe(c, JIBUN, 50, 112 + sg(t, S.tGone, S.tDown) * 10, { k: 'gn', arm: 'up', s: 0.5, rot: 0.4 }); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tFall) { R(c, 0, 0, W, H, '#0c1018'); R(c, 220, 0, 100, H, '#2c2420'); sea(c, t, 160, '#06080c'); const u = sg(t, S.tFall, S.tGone); robe(c, JIBUN, 160, lerp(60, 140, u * u * 0.6), { k: 'fl', arm: 'up', expr: 'shock', rot: Math.sin(t * 2) * 0.3 }); for (let i = 0; i < 5; i++) L(c, 150 + i * 5, 30, 150 + i * 5, 50, DA('#c8d8e8', 0.4)); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tRegret) { R(c, 0, 0, W, H, '#140c10'); for (let i = 0; i < 10; i++) L(c, 20 + i * 30, mod(t * 120 + i * 37, 190), 20 + i * 30, mod(t * 120 + i * 37, 190) + 20, '#3c4c6c'); robe(c, JIBUN, 160 + Math.sin(t * 3) * 8, 120, { k: 'rg', arm: 'up', expr: 'shock', rot: Math.sin(t * 2) * 0.2 }); bigCap(c, 'よせばよかった', 60, 32, '#e8a0a0', sg(t, at(S, 'L37', 2) - 0.3, at(S, 'L37', 2) + 0.3)); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tJump) { VG(c, 0, 0, W, 120, ['#06080c', '#141c28']); sea(c, t, 130, '#0c1420'); ship(c, t, 150, 126); const u = sg(t, S.tJump + 1, S.tRegret); robe(c, JIBUN, lerp(230, 260, u), lerp(102, 120, u), { k: 'jp', arm: u > 0 ? 'up' : null, s: 0.6 }); return { z: 1.04, fx: 200, fy: 100 }; }
    if (t > S.tStars) { R(c, 0, 0, W, H, '#060a18'); for (let i = 0; i < 40; i++) P(c, hash(i) * W, hash(i * 3) * 110, '#e8ecf8'); for (let i = 0; i < 7; i++) E(c, 200 + (i % 4) * 10, 40 + Math.floor(i / 4) * 8, 1.5, 1.5, '#f8f8c8'); R(c, 0, 140, W, 50, '#2c2420'); person(c, IJIN, 110, 156, { k: 'ij', arm: 'point' }); robe(c, JIBUN, 200, 156, { k: 'sg', flip: true }); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tCry) { R(c, 0, 0, W, H, '#5c6c7c'); sea(c, t, 120, '#3c5c7c'); R(c, 0, 140, W, 50, '#5c4c3c'); R(c, 0, 128, W, 4, '#3c2c1c'); for (let x = 0; x < W; x += 20) R(c, x, 128, 2, 14, '#3c2c1c'); const rk = Math.sin(t * 1.2) * 3; c.save(); c.translate(0, rk); person(c, LADY, 120, 156, { k: 'ld', expr: 'sad', blink: 2 }); R(c, 126, 106 + Math.sin(t * 3) * 3, 5, 4, '#f8f8f8'); robe(c, JIBUN, 220, 156, { k: 'cy', flip: true }); c.restore(); for (let i = 0; i < 8; i++) { const ph = fr(t * 0.5 + i / 8); c.save(); c.globalAlpha = 1 - ph; E(c, 30 + i * 36, 120 - ph * 10, 6, 2, '#e8f0f8'); c.restore(); } return { z: 1.03, fx: 170, fy: 110 }; }
    if (t > S.tLonely) { VG(c, 0, 0, W, 120, ['#3c4c6c', '#6c7c9c']); sea(c, t, 120, '#2c4c6c'); robe(c, JIBUN, 160, 156, { k: 'lo', expr: 'sad', blink: blinkOf(t, 4) }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tChant) { VG(c, 0, 0, W, 120, ['#8cacc8', '#c8dce8']); sea(c, t, 120, '#3c6c9c'); R(c, 0, 140, W, 50, '#6c5438'); for (let i = 0; i < 3; i++) person(c, SAILORS[i], 70 + i * 50, 156, { k: 'sl' + i, arm: 'fwd', f: Math.floor(t * 2 + i) & 3 }); L(c, 40, 120, 280, 80, '#c8b088', 2); plate(c, 20, 46, '西へ行く日の、果ては東か', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tAsk) { VG(c, 0, 0, W, 120, ['#8cacc8', '#c8dce8']); sea(c, t, 120, '#3c6c9c'); R(c, 0, 140, W, 50, '#6c5438'); robe(c, JIBUN, 120, 156, { k: 'ak', arm: 'point' }); person(c, SAILORS[0], 200, 156, { k: 'ak', flip: true, expr: t > at(S, 'L34', 0, 1e9) ? 'smile' : 'normal' }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tSun) { VG(c, 0, 0, W, 120, ['#2c1c18', '#8c3c1c', '#e8603c']); sea(c, t, 120, '#2c3c5c'); const u = fr((t - S.tSun) / 5); sunArc(c, t, u, 20, 300, 124, 30, '#f86c2c'); ship(c, t, 120, 126); if (u > 0.9) for (let i = 0; i < 6; i++) { const ph = fr(t * 2 + i / 6); E(c, 300 + Math.sin(i) * 10, 120 - ph * 20, 3, 3, DA('#f8f8f8', 1 - ph)); } return { z: 1.03, fx: 160, fy: 100 }; }
    VG(c, 0, 0, W, 120, ['#3c4c6c', '#6c7c9c']); sea(c, t, 120, '#2c4c6c'); ship(c, t, 160, 126); if (t < at(S, 'L32', 0, 1e9)) bigCap(c, '第七夜', 60, 32, '#f8e8b0', sg(t, 0.2, 0.8));
    return { z: 1.03, fx: 160, fy: 100 };
  }
}, [['V11', JCLOSE]]);

/* ---- YE: the end — three dreams, and a question (moves: three lights) ---- */
const YE = {
  name: '目が覚めたら', ch: 'おわりに', bgm: 'requiem',
  init(S) { S.tAsk = at(S, 'L42', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#0c0c14'); const k = sg(t, 0.3, S.tAsk);
    const items = [() => { E(c, 70, 96, 8, 12, '#f8f8f4'); L(c, 70, 108, 70, 130, '#5c9c4c', 2); }, () => { blit(c, kozoFace({}), 160, 100, 24, 24, { s: 1 }); }, () => { ship(c, t, 250, 120); }];
    for (let i = 0; i < 3; i++) if (k > i / 3) { c.save(); c.globalAlpha = 0.5 + 0.3 * Math.sin(t + i); items[i](); c.restore(); }
    if (t > S.tAsk) { dim(c, 0.4 * sg(t, S.tAsk, S.tAsk + 2)); }
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '重いかい', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { nightField(c, t, {}); carrying(c, t, 160, 156, { f: Math.floor(t * 3) & 3 }); c.save(); c.globalAlpha = 0.85; R(c, 0, 34, W, 44, '#000000'); c.restore(); bigCap(c, '重いかい？', 40, 32, '#f8e8b0', sg(t, 0.1, 0.6)); return { z: 1.04, fx: 160, fy: 110 }; } };
const SS2 = { name: '杉の根', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { nightField(c, t, { rain: true }); cedar(c, 240, 160); carrying(c, t, 180, 156, {}); return { z: 1.06, fx: 210, fy: 110 }; } };
