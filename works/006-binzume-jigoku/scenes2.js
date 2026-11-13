/* ================= 文庫 #006 瓶詰地獄: scenes ================= */
const BY = 150; // the sand line

/* ---- XA: cold open — three bottles washed up on a southern beach (moves: waves, a bottle rolling in the surf) ---- */
const XA = withCuts({
  name: '南の浜', ch: '三本の瓶', bgm: 'eerie',
  init(S) { S.tLetter = at(S, 'C1', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tLetter) { R(c, 0, 0, W, H, '#241c14'); glow(c, 160, 90, 120, 70, '#f8d080', 0.25); for (let i = 0; i < 3; i++) bottle(c, 100 + i * 60, 110, -0.1 + i * 0.1, 2.2, { paper: true }); return { z: 1.04 + 0.06 * ss(sg(t, S.tLetter, S.dur)), fx: 160, fy: 90 }; }
    tropicSky(c, t, { h: 110 }); tropicSea(c, t, 100); R(c, 0, 130, W, 110, '#e8d8a0'); for (let i = 0; i < 20; i++) P(c, hash(i) * W, 134 + hash(i * 3) * 60, '#d8c890');
    const sw = Math.sin(t * 1.6); PF(c, [0, 128 + sw * 2, W, 124 - sw * 2, W, 134, 0, 134], DA('#f4f8fc', 0.6));
    bottle(c, 90, 150, 1.4, 1.4); bottle(c, 180 + sw * 3, 140, 1.2 + sw * 0.1, 1.4); bottle(c, 262, 156, 1.6, 1.4); for (let i = 0; i < 4; i++) E(c, 40 + i * 70, 140, 10, 3, DA('#ffffff', 0.3));
    capPlate(c, t, 0.5, ['ある島の', '南の浜']);
    return { z: 1.03, fx: 180, fy: 120 };
  }
}, [['T0', (c, t, S) => closeUp(c, t, taroFace({ sad: true, blink: blinkOf(t, 4) }), { bg: ['#14243c', '#3c6c9c'], glow: '#a8d8f8' })]]);

/* ---- XB: the village office sends them to the institute (moves: a stamp, a parcel slides) ---- */
const XB = {
  name: '村役場', bgm: 'memory',
  init(S) { S.dur = lastSe(S) + 1.0; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#3c3428'); for (let x = 0; x < W; x += 16) R(c, x, 0, 8, 150, '#443a2c'); R(c, 0, 150, W, 90, '#2c2418');
    R(c, 60, 110, 200, 10, '#6c4c2c'); letterPage(c, 80, 30, 90, 76, { old: true }); TX(c, '拝呈', 88, 34, '#2c2c34', 16, null);
    const k = sg(t, 2, 5); R(c, lerp(190, 230, k), 70, 60, 40, '#a8884c'); L(c, lerp(190, 230, k), 90, lerp(190, 230, k) + 60, 90, '#5c3c24', 2); TX(c, '海洋研究所', lerp(186, 226, k), 50, '#f4f0e8', 16, '#000000');
    const s = sg(t, 1, 1.3); if (s > 0) { c.save(); c.globalAlpha = s; E(c, 150, 96, 9, 9, '#c81818'); E(c, 150, 96, 6, 6, '#e8d8c0'); c.restore(); }
    return { z: 1.03, fx: 160, fy: 90 };
  }
};

/* ---- XC: the first bottle — the rescue ship; the cliff (moves: the ship's smoke, white handkerchiefs) ---- */
function steamer(c, x, y, t, s = 1) { c.save(); c.translate(x, y); c.scale(s, s); PF(c, [-60, -10, 60, -10, 52, 8, -52, 8], '#2c2c34'); R(c, -50, -22, 90, 12, '#e8e4dc'); for (let i = 0; i < 7; i++) R(c, -44 + i * 12, -19, 6, 5, '#3c5c7c'); for (const ex of [-14, 12]) { R(c, ex, -44, 10, 22, '#c83c2c'); R(c, ex, -44, 10, 4, '#2c2c2c'); for (let k = 0; k < 4; k++) { const u = fr(t * 0.4 + k / 4); E(c, ex + 5 + u * 20, -48 - u * 30, 4 + u * 8, 3 + u * 5, DA('#f4f4f0', 0.7 * (1 - u))); } } c.restore(); }
const XC = withCuts({
  name: '第一の瓶', ch: '第一の瓶', bgm: 'eerie',
  init(S) { S.tShip = ln(S, 'L3') ? at(S, 'L3', 0) - 0.3 : 0.2; S.tFear = at(S, 'L5', 0) - 0.3; S.tCliff = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t < S.tShip) { R(c, 0, 0, W, H, '#14100c'); bottle(c, 160, 110, 0, 3, { paper: true }); bigCap(c, '第一の瓶', 30, 24, '#f8e8b0', sg(t, 0.2, 0.8)); return { z: 1.04, fx: 160, fy: 100 }; }
    island(c, t, { pole: false }); steamer(c, 120, 106, t, 0.8); for (let i = 0; i < 2; i++) { const bx = 90 + i * 40 + sg(t, S.tShip, S.dur) * 30; PF(c, [bx - 10, 122, bx + 10, 122, bx + 7, 128, bx - 7, 128], '#e8e4dc'); P(c, bx - 4 + (Math.floor(t * 4) & 1), 118, '#ffffff'); P(c, bx + 4, 118 - (Math.floor(t * 4 + 1) & 1), '#ffffff'); }
    if (t > S.tCliff) { kid(c, TARO, 268, 80, { k: 'cl', expr: 'cry' }); kid(c, AYA, 284, 80, { k: 'cl', expr: 'cry', flip: true }); for (let i = 0; i < 2; i++) shark(c, 250 + i * 30, 170, t); }
    if (t > S.tFear) dim(c, 0.3 * sg(t, S.tFear, S.tFear + 2), '#1c0408');
    return { z: 1.03 + 0.06 * ss(sg(t, S.tCliff, S.dur)), fx: t > S.tCliff ? 260 : 160, fy: 100 };
  }
}, [['L5', (c, t, S) => closeUp(c, t, taroFace({ sad: true, blink: blinkOf(t, 4) }), { bg: ['#1c0c0c', '#5c1c1c'] })], ['L7', (c, t, S) => closeUp(c, t, taroFace({ sad: true, blink: blinkOf(t, 4) }), { bg: ['#0c0c1c', '#2c2c5c'] })]]);

/* ---- XD: the second bottle — shipwrecked, the few things they had (moves: the items appear one by one, a boat breaks on the reef) ---- */
const XD = withCuts({
  name: '第二の瓶', ch: '第二の瓶', bgm: 'memory',
  init(S) { S.tWreck = ln(S, 'L10') ? at(S, 'L10', 0) - 0.3 : -1; S.tAges = at(S, 'L11', 0) - 0.3; S.tItems = at(S, 'L12', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t < S.tWreck) { R(c, 0, 0, W, H, '#14100c'); bottle(c, 160, 110, 0, 3, { paper: true }); bigCap(c, '第二の瓶', 30, 24, '#f8e8b0', sg(t, 0.2, 0.8)); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tItems) { // the things they had, laid out on the sand
      R(c, 0, 0, W, H, '#e8d8a0'); for (let i = 0; i < 40; i++) P(c, hash(i) * W, hash(i * 3) * H, '#d8c890');
      const items = [(x, y) => { L(c, x - 12, y, x + 12, y - 4, '#e8c84c', 2); P(c, x + 12, y - 4, '#2c2c2c'); }, (x, y) => { R(c, x - 2, y - 10, 4, 10, '#5c3c24'); L(c, x, y - 10, x, y - 20, '#c8ccd4', 2); }, (x, y) => { R(c, x - 10, y - 14, 20, 14, '#5c7cac'); R(c, x - 8, y - 12, 16, 10, '#f0e8d4'); }, (x, y) => { ER(c, x, y - 8, 7, 7, '#8c8c94'); L(c, x + 5, y - 3, x + 12, y + 4, '#5c3c24', 2); }, (x, y) => { for (let k = 0; k < 3; k++) bottle(c, x - 10 + k * 10, y, 0, 0.9); }, (x, y) => { R(c, x - 9, y - 14, 18, 14, '#2c2c34'); R(c, x - 2, y - 12, 4, 10, '#d8b040'); R(c, x - 5, y - 9, 10, 3, '#d8b040'); }];
      const n = Math.min(6, Math.floor(sg(t, S.tItems + 0.2, S.dur - 1.5) * 6 + 1)); for (let i = 0; i < n; i++) items[i](50 + (i % 3) * 110, 70 + Math.floor(i / 3) * 56);
      return { z: 1.02, fx: 160, fy: 90 };
    }
    island(c, t, { pole: false, cliff: false }); PF(c, [150, 126, 190, 120, 196, 132, 156, 136], '#7c5c34'); L(c, 170, 122, 166, 96, '#5c4430', 2); for (let i = 0; i < 6; i++) E(c, 140 + i * 12, 130 + Math.sin(t * 2 + i) * 2, 6, 2, DA('#ffffff', 0.5)); // the wrecked boat on the reef
    if (t > S.tWreck + 1) { const k = sg(t, S.tWreck + 1, S.tWreck + 4); kid(c, TARO_S, lerp(200, 120, k), BY + 10, { k: 'k1', expr: 'sad', f: k < 1 ? Math.floor(t * 5) & 3 : -1 }); kid(c, AYA_S, lerp(222, 142, k), BY + 12, { k: 'k1', expr: 'cry', s: 0.8, f: k < 1 ? Math.floor(t * 5 + 2) & 3 : -1 }); }
    if (t > S.tAges) { TX(c, '太郎 11歳', 20, 70, '#f4f0e8', 16, '#000000'); TX(c, 'アヤ子 7歳', 20, 90, '#f4f0e8', 16, '#000000'); }
    return { z: 1.04, fx: 150, fy: 120 };
  }
}, [['L13', (c, t, S) => closeUp(c, t, taroFace({ kid: true, blink: blinkOf(t, 4) }), { bg: ['#2c6c3c', '#8cc86c'], glow: '#f8f0b0' })]]);

/* ---- XE: paradise — birds, fruit, the hut, prayers on the cliff, the first bottle thrown (moves: a parrot flies, the bottle drifts out) ---- */
function parrot(c, x, y, t) { const f = Math.floor(t * 8) & 1; E(c, x, y, 5, 3, '#c83c2c'); E(c, x + 5, y - 1, 3, 3, '#3c8cc8'); PF(c, [x - 2, y, x - 8, y - (f ? 6 : -2), x + 2, y], '#f8c830'); P(c, x + 7, y - 2, '#f8c830'); }
const XE = {
  name: '楽園', ch: '天国のような島', bgm: 'memory',
  init(S) { S.tHut = at(S, 'L15', 0) - 0.3; S.tBottle = at(S, 'L16', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    island(c, t, { pole: t > S.tBottle + 2 }); for (let i = 0; i < 3; i++) parrot(c, mod(i * 110 + t * 30, W + 40) - 20, 40 + i * 14 + Math.sin(t * 2 + i) * 4, t + i);
    for (let i = 0; i < 4; i++) { E(c, 200 + i * 10, 136, 4, 4, ['#f8c830', '#c8a040', '#8c6c34', '#f8e070'][i]); }
    if (t > S.tHut) { hut(c, 80, BY, {}); kid(c, TARO_S, 160, BY + 6, { k: 'pr', pose: 'kneel', arm: 'clasp' }); kid(c, AYA_S, 182, BY + 6, { k: 'pr', pose: 'kneel', arm: 'clasp', s: 0.85 }); }
    else { kid(c, TARO_S, 130, BY + 6, { k: 'pl', f: Math.floor(t * 6) & 3, expr: 'smile' }); kid(c, AYA_S, 156, BY + 8, { k: 'pl', f: Math.floor(t * 6 + 2) & 3, expr: 'smile', s: 0.85 }); }
    if (t > S.tBottle) { const k = sg(t, S.tBottle + 0.4, S.tBottle + 2.4); if (k < 1) bottle(c, lerp(200, 300, k), lerp(130, 70, Math.sin(k * Math.PI)) , k * 8, 1); }
    return { z: 1.03, fx: 160, fy: 112 };
  }
};

/* ---- XF: ten years — Ayako grows; "Brother..." (moves: the sun sets, waves) ---- */
const XF = withCuts({
  name: '十年', ch: '変わっていく二人', bgm: 'eerie',
  init(S) { S.tGrow = at(S, 'L17', 0) - 0.3; S.tAsk = at(S, 'L19', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const dusk = t > S.tAsk; island(c, t, { dusk, pole: true });
    if (t < S.tGrow + 2) { const k = sg(t, S.tGrow, S.tGrow + 2); c.save(); c.globalAlpha = 1 - k; kid(c, TARO_S, 130, BY + 6, { k: 'g0' }); kid(c, AYA_S, 156, BY + 8, { k: 'g0', s: 0.85 }); c.restore(); c.save(); c.globalAlpha = k; kid(c, TARO, 130, BY + 8, { k: 'g1', s: 1.15 }); kid(c, AYA, 156, BY + 8, { k: 'g1', s: 1.1 }); c.restore(); }
    else if (!dusk) { kid(c, TARO, 120, BY + 8, { k: 'g2', s: 1.15, expr: 'sad' }); kid(c, AYA, 170, BY + 8, { k: 'g2', s: 1.1, flip: true, expr: 'smile' }); }
    else { kid(c, TARO, 130, BY + 10, { k: 'g3', pose: 'sit', s: 1.15 }); kid(c, AYA, 160, BY + 10, { k: 'g3', pose: 'sit', s: 1.1, flip: true, expr: 'sad' }); }
    if (t < S.tGrow + 2) TX(c, '十年', 20, 52, '#f4f0e8', 16, '#000000');
    return { z: 1.04, fx: 150, fy: 112 };
  }
}, [['A1', (c, t, S) => closeUp(c, t, ayaFace({ blink: blinkOf(t, 7) }), { bg: ['#2c6c3c', '#8cc86c'], glow: '#f8e0b0' })], ['A2', (c, t, S) => closeUp(c, t, ayaFace({ blink: blinkOf(t, 7) }), { bg: ['#2c1c3c', '#c85c4c'], glow: '#f8b860' })]]);

/* ---- XG: the cliff — the prayer unanswered; the pole thrown down; the Bible burned (moves: sharks circle, fire) ---- */
const XG = withCuts({
  name: '神様の足', ch: '神様の足', bgm: 'dread',
  init(S) { S.tPole = at(S, 'L21', 0) - 0.3; S.tFire = at(S, 'L22', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFire) { R(c, 0, 0, W, H, '#1c1410'); hut(c, 120, 160, {}); for (let i = 0; i < 12; i++) flame(c, 130 + (i * 13 % 60), 150 - hash(i) * 20, 1.4, t, i); glow(c, 160, 130, 80, 50, '#f86820', 0.4); R(c, 150, 140, 18, 12, '#2c2c34'); R(c, 157, 142, 4, 8, '#d8b040'); R(c, 154, 145, 10, 2, '#d8b040'); return { z: 1.05, fx: 160, fy: 120 }; }
    tropicSky(c, t, {}); tropicSea(c, t, 110); c.save(); c.translate(0, 22); PF(c, [0, 240, 0, 60, 80, 40, 200, 50, 220, 240], '#7c7064'); PF(c, [0, 60, 80, 40, 200, 50, 190, 56, 70, 48, 0, 66], '#9c8c7c'); c.restore();
    for (let i = 0; i < 3; i++) shark(c, 240 + i * 26 + Math.sin(t + i) * 10, 170 + i * 10, t, 1.2);
    c.save(); c.translate(0, 22);
    if (t < S.tPole) { kid(c, TARO, 120, 64, { k: 'cl', pose: 'kneel', arm: 'clasp', expr: 'cry', s: 1.1 }); L(c, 180, 46, 180, 12, '#5c4430', 2); PF(c, [180, 12, 194, 16, 180, 22], '#3c9c3c'); }
    else { const k = sg(t, S.tPole, S.tPole + 1.5); kid(c, TARO, 160, 62, { k: 'cl2', arm: 'up', expr: 'angry', s: 1.1 }); c.save(); c.translate(lerp(180, 260, k), lerp(30, 190, k * k)); c.rotate(k * 3); L(c, 0, -16, 0, 16, '#5c4430', 2); c.restore(); }
    c.restore();
    return { z: 1.03, fx: 150, fy: 90 };
  }
}, [['T2', (c, t, S) => closeUp(c, t, taroFace({ blink: blinkOf(t, 4) }), { bg: ['#1c0c0c', '#5c1c1c'], glow: '#f84c2c' })]]);

/* ---- XH: Ayako praying on the cape rock; the rescue; the hut gone to smoke; the island becomes hell (moves: tide, smoke) ---- */
const XH = withCuts({
  name: '岬の岩', bgm: 'dread',
  init(S) { S.tRun = at(S, 'L23', 2) - 0.3; S.tGone = at(S, 'L24', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tGone) { island(c, t, { dusk: true, pole: false }); for (let i = 0; i < 10; i++) { const u = fr(t * 0.25 + i / 10); E(c, 100 + Math.sin(i + t) * 10, 130 - u * 120, 8 + u * 20, 5 + u * 10, DA('#c8c8c8', 0.5 * (1 - u))); } R(c, 80, 140, 60, 8, '#2c2420'); kid(c, TARO, 170, BY + 10, { k: 'h1', expr: 'cry', s: 1.15 }); kid(c, AYA, 196, BY + 10, { k: 'h1', expr: 'cry', s: 1.1, flip: true }); return { z: 1.04, fx: 150, fy: 110 }; }
    tropicSky(c, t, { dusk: true }); tropicSea(c, t, 100); glow(c, 160, 90, 120, 40, '#f8b860', 0.35);
    PF(c, [120, 150, 150, 120, 200, 116, 230, 150], '#5c4c6c'); for (let i = 0; i < 6; i++) E(c, 130 + i * 18, 148 + Math.sin(t * 2 + i) * 2, 10, 3, DA('#ffffff', 0.5));
    kid(c, AYA, 176, 120, { k: 'rock', pose: 'kneel', arm: 'clasp', s: 1.05 });
    if (t > S.tRun) { const k = sg(t, S.tRun, S.tRun + 1.5); kid(c, TARO, lerp(40, 150, k), 150, { k: 'run', f: Math.floor(t * 10) & 3, expr: 'shock', s: 1.1 }); }
    return { z: 1.04, fx: 170, fy: 112 };
  }
}, [['L25', (c, t, S) => closeUp(c, t, taroFace({ sad: true, blink: blinkOf(t, 4) }), { bg: ['#1c0c0c', '#5c1c1c'] })]]);

/* ---- XI: the third bottle — a child's katakana note; the first letter they ever sent (moves: the letters are written one by one) ---- */
const XI = {
  name: '第三の瓶', ch: '第三の瓶', bgm: 'requiem',
  init(S) { S.tNote = at(S, 'L28', 0) - 0.3; S.tRead = at(S, 'L29', 0) - 0.3; S.tFirst = at(S, 'L30', 0) - 0.3; S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    if (t > S.tFirst) { island(c, t, {}); kid(c, TARO_S, 120, BY + 6, { k: 'end', expr: 'smile', arm: 'up' }); kid(c, AYA_S, 142, BY + 8, { k: 'end', expr: 'smile', s: 0.85 }); const k = sg(t, S.tFirst + 0.4, S.tFirst + 2.4); if (k < 1) bottle(c, lerp(130, 230, k), lerp(110, 60, Math.sin(k * Math.PI)), k * 8, 1); return { z: 1.03 + 0.04 * sg(t, S.tFirst, S.dur), fx: 140, fy: 112 }; }
    if (t < S.tNote) { R(c, 0, 0, W, H, '#14100c'); bottle(c, 160, 110, 0, 3, { paper: true }); bigCap(c, '第三の瓶', 30, 24, '#f8e8b0', sg(t, 0.2, 0.8)); return { z: 1.04, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#241c14'); glow(c, 160, 70, 140, 60, '#f8d080', 0.25); letterPage(c, 40, 20, 240, 110, { blank: true });
    const txt = 'オ父サマ。オ母サマ。ボクタチ兄ダイハ、ナカヨク、タッシャニ、コノシマニ、クラシテイマス。ハヤク、タスケニ、キテクダサイ。';
    const n = Math.floor(sg(t, S.tRead, S.tFirst - 0.5) * txt.length); const rows = []; for (let i = 0; i < n; i += 13) rows.push(txt.slice(i, Math.min(n, i + 13)));
    rows.forEach((r, i) => TX(c, r, 52, 28 + i * 18, '#3c2c1c', 16, null));
    if (n >= txt.length) { TX(c, '市川　太郎', 180, 104, '#3c2c1c', 16, null); }
    return { z: 1.03, fx: 160, fy: 80 };
  }
};

/* ---- XJ: the end — two bottles in the sea at dusk (moves: waves, the bottle bobs) ---- */
const XJ = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { tropicSky(c, t, { dusk: true }); tropicSea(c, t, 100); glow(c, 160, 100, 140, 30, '#f8b860', 0.4); bottle(c, 160, 130 + Math.sin(t * 1.5) * 3, Math.sin(t) * 0.3, 1.4, { paper: true }); return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 110 }; }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { island(c, t, { pole: false }); steamer(c, 110, 106, t, 0.8); kid(c, TARO, 268, 80, { k: 'ss', expr: 'cry' }); kid(c, AYA, 284, 80, { k: 'ss', expr: 'cry', flip: true }); for (let i = 0; i < 2; i++) shark(c, 250 + i * 30, 170, t); return { z: 1.12, fx: 240, fy: 90 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { tropicSky(c, t, { h: 110 }); tropicSea(c, t, 100); R(c, 0, 130, W, 110, '#e8d8a0'); for (let i = 0; i < 3; i++) bottle(c, 100 + i * 60, 150, 1.4, 1.6); return { z: 1.1, fx: 160, fy: 120 }; }
};
