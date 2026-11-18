/* ================= 都市伝説 #001 口裂け女: scenes ================= */
const GY = 156;
const KCLOSE = (c, t) => closeUp(c, t, kuchiFace({ blink: blinkOf(t, 5) }), { bg: ['#0c0810', '#3c1c2c'], glow: '#f0965c', talk: false });

/* ---- UZ: cold open — dusk lane, a tall woman under the pole, a kid walking home (moves: the kid walks, she steps out, the light dies) ---- */
const UZ = withCuts({
  name: '夕暮れの女', ch: '夕暮れの帰り道', bgm: 'eerie',
  init(S) { S.tNear = at(S, 'C1', 0) - 0.3; S.tQ = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tQ) { R(c, 0, 0, W, H, '#0a0610'); glow(c, 160, 90, 120, 70, '#3c1c2c', 0.5); womanShade(c, 160, 166, { s: 1.6 }); bigCap(c, '？', 64, 48, '#e81c1c', sg(t, S.tQ + 0.3, S.tQ + 0.9)); return { z: 1.03, fx: 160, fy: 100 }; }
    lane(c, t, { light: 0.3 });
    const near = t > S.tNear, u = sg(t, S.tNear, S.tNear + 2.4);
    woman(c, near ? lerp(232, 170, u) : 232, 156, { f: near && u < 1 ? Math.floor(t * 2) & 3 : -1, flip: true });
    const v = sg(t, at(S, 'C0', 0), S.tNear + 0.4); kid(c, BOY, lerp(30, 130, v), 158, { k: 'uz', f: v < 1 ? Math.floor(t * 4) & 3 : -1, expr: near ? 'shock' : 'normal', blink: blinkOf(t, 3) });
    dim(c, 0.35 * sg(t, S.tNear, S.tQ), '#140818');
    return { z: 1.03 + 0.05 * ss(sg(t, 0, S.tQ)), fx: 170, fy: 110 };
  }
}, [['M1', KCLOSE], ['V0', KCLOSE]]);

/* ---- UA: how the rumour spread — 1979, a map lighting up from Gifu; whispers in a classroom; "someone nearby" (moves: dots spread, whispers rise) ---- */
const UA = {
  name: '噂の始まり', ch: '噂の始まり', bgm: 'memory',
  init(S) { S.tMap = at(S, 'L2', 0) - 0.3; S.tSpread = at(S, 'L3', 0) - 0.3; S.tClass = at(S, 'L4', 0) - 0.3; S.tNear = at(S, 'L5', 0) - 0.3; S.tChain = at(S, 'L5b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tChain) { R(c, 0, 0, W, H, '#140c18'); const n = Math.floor(sg(t, S.tChain, S.dur - 1) * 7.99); for (let i = 0; i < 8; i++) { const x = 30 + i * 38; if (i <= n) kid(c, KIDS[i % 6], x, 150, { k: 'ch' + i, flip: i % 2 === 1 }); if (i < n) { L(c, x + 8, 100, x + 30, 100, '#e8a0c8', 1); PF(c, [x + 28, 97, x + 32, 100, x + 28, 103], '#e8a0c8'); } } plate(c, 40, 40, 'この話を聞いた人のところにも…', '#f8c8d8'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNear) { classroom(c, t); for (let i = 0; i < 4; i++) { desk(c, 60 + i * 64, 150); kid(c, KIDS[i], 60 + i * 64, 150, { k: 'nr' + i, flip: i % 2 === 1, blink: blinkOf(t, i + 2) }); } plate(c, 50, 44, '友だちのいとこが見た', '#f8e8b0'); if (t > at(S, 'L5', 1) - 0.3) plate(c, 120, 70, '隣の学校の子が…', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tClass) { classroom(c, t, { text: '' }); for (let i = 0; i < 4; i++) { desk(c, 60 + i * 64, 150); kid(c, KIDS[i + 1], 60 + i * 64, 150, { k: 'cl' + i, flip: i % 2 === 0 }); whisper(c, t, 66 + i * 64, 84, i); } if (t < at(S, 'L4', 2)) { R(c, 250, 104, 40, 20, '#5c4430'); R(c, 258, 92, 24, 12, '#2c2c2c'); E(c, 270, 98, 4, 4, '#e8e4dc'); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tMap) { japanMap(c); const gx = 138, gy = 104; const k = t > S.tSpread ? sg(t, S.tSpread, S.tClass) : 0; E(c, gx, gy, 3, 3, '#e81c1c'); glow(c, gx, gy, 10 + k * 30, 10 + k * 30, '#e81c1c', 0.3); const pts = [[120, 116], [160, 104], [176, 98], [200, 88], [90, 130], [80, 140], [214, 64], [232, 46], [240, 28], [104, 124]]; pts.forEach(([x, y], i) => { if (k * 10 > i) E(c, x, y, 2, 2, '#f8a0a0'); }); TX(c, '岐阜', gx - 12, gy + 6, '#f4f0e8', 16, '#000000'); if (k > 0.6) { plate(c, 246, 34, '北海道', '#f8e8b0'); plate(c, 40, 112, '九州', '#f8e8b0'); } return { z: 1.03, fx: 160, fy: 100 }; }
    lane(c, t, {}); for (let i = 0; i < 3; i++) kid(c, KIDS[i], 90 + i * 40, 158, { k: 'yr' + i, f: Math.floor(t * 4 + i) & 3 }); yearFlash(c, t, 0.3, 1979, 216, 10, 'ごろ');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- UB: what she looks like, and one told story — the boy in the alley at dusk (moves: lamps light one by one, she falls in beside him, footsteps) ---- */
const UB = withCuts({
  name: '路地の男の子', ch: 'こんなふうに語られた', bgm: 'dread',
  init(S) { S.tWhen = at(S, 'L8', 0) - 0.3; S.tStory = at(S, 'L9b', 0) - 0.3; S.tLamp = at(S, 'L9c', 0) - 0.3; S.tCoat = at(S, 'L9d', 0) - 0.3; S.tSide = at(S, 'L9e', 0) - 0.3; S.tWalk = at(S, 'L9f', 0) - 0.3; S.tEar = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSide) { const w = t > S.tWalk ? sg(t, S.tWalk, S.tEar + 1) : 0; lane(c, t, { light: 1, night: true, ox: Math.floor(w * 60) }); kid(c, BOY, 150, 158, { k: 'sd', f: t > S.tWalk ? Math.floor(t * 3) & 3 : -1, expr: 'sad', blink: 0 }); woman(c, 180, 156, { f: t > S.tWalk ? Math.floor(t * 3) & 3 : -1, flip: true }); if (t > S.tEar) { dim(c, 0.4, '#140818'); whisper(c, t, 168, 80, 0); } return { z: 1.06 + 0.06 * ss(sg(t, S.tSide, S.dur)), fx: 165, fy: 110 }; }
    if (t > S.tStory) { const lightK = sg(t, S.tLamp, S.tLamp + 3); lane(c, t, { light: lightK, night: t > S.tLamp + 1 }); const u = sg(t, S.tStory + 0.2, S.tCoat); kid(c, BOY, lerp(20, 120, u), 158, { k: 'st', f: u < 1 ? Math.floor(t * 4) & 3 : -1 }); if (t > S.tLamp + 1) { const sw = Math.sin(t * 1.3) * 2; woman(c, 236, 156, { flip: true, coat: t > S.tCoat && t < at(S, 'L9d', 1) ? '#a83c3c' : undefined }); L(c, 228 + sw, 94, 226 + sw * 2, 110, '#0c0c10', 2); } plate(c, 30, 40, '塾の帰り', '#f8e8b0'); return { z: 1.03 + 0.04 * ss(sg(t, S.tStory, S.tSide)), fx: 170, fy: 110 }; }
    if (t > S.tWhen) { lane(c, t, { light: 0.2 }); const u = sg(t, S.tWhen, S.tStory); kid(c, KIDS[2], lerp(20, 140, u), 158, { k: 'wh', f: Math.floor(t * 4) & 3 }); c.save(); c.globalAlpha = sg(t, at(S, 'L8', 2), at(S, 'L8', 2) + 0.6); woman(c, 220, 156, { flip: true }); c.restore(); if (t > at(S, 'L8b', 0) - 0.3) plate(c, 30, 40, '決まりは学校ごとに違った', '#f8e8b0'); return { z: 1.03, fx: 170, fy: 110 }; }
    R(c, 0, 0, W, H, '#1c1420'); glow(c, 160, 90, 120, 70, '#5c3c4c', 0.3); woman(c, 160, 160, { s: 1.6 }); const tags = [['背が高い', 0], ['長い髪', 1], ['長いコート', 2], ['白いマスク', 4]]; tags.forEach(([s, k], i) => { if (t > at(S, 'L7', k + 1) - 0.3) plate(c, i % 2 ? 200 : 30, 46 + Math.floor(i / 2) * 40 + (i % 2) * 20, s, '#f8e8b0'); });
    return { z: 1.02, fx: 160, fy: 100 };
  }
}, [['V1', KCLOSE]]);

/* ---- UC: the answers — scissors; the mask comes off (the reveal); she runs 100 m in 6 s; no way out; screams; a sleepless night (moves: the hand to the mask, speed lines, the futon) ---- */
const UC = withCuts({
  name: 'わたし、きれい？', ch: 'どう答えても', bgm: 'dread',
  init(S) { S.tPretty = at(S, 'L11', 0) - 0.8; S.tMask = at(S, 'L12', 0) - 0.3; S.tOpen = at(S, 'L13', 0) - 0.3; S.tCut = at(S, 'L14', 0) - 0.3; S.tRun = at(S, 'L15', 0) - 0.3; S.tBike = at(S, 'L15b', 0) - 0.3; S.tNo = at(S, 'L16', 0) - 0.3; S.tScream = at(S, 'L16b', 0) - 0.3; S.tBed = at(S, 'L16c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBed) { R(c, 0, 0, W, H, '#0c0c1c'); R(c, 40, 40, 70, 60, '#1c2440'); for (let k = 1; k < 3; k++) { R(c, 40 + k * 23, 40, 1, 60, '#2c3450'); } R(c, 40, 70, 70, 1, '#2c3450'); R(c, 80, 120, 180, 36, '#e8e4dc'); R(c, 80, 116, 50, 12, '#f4f0e8'); E(c, 104, 116, 9, 8, '#f0c8a8'); R(c, 96, 108, 18, 5, '#141418'); R(c, 100, 116, 3, 2, '#141418'); R(c, 108, 116, 3, 2, '#141418'); c.save(); c.globalAlpha = 0.25 + 0.1 * Math.sin(t * 2); womanShade(c, 200, 112, { s: 1.2, col: '#2c2440' }); c.restore(); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tScream) { classroom(c, t, { text: '' }); for (let i = 0; i < 5; i++) { const x = 40 + i * 58, j = Math.sin(t * 20 + i) * 1.5; kid(c, KIDS[i], x, 150 + j, { k: 'sc' + i, expr: 'shock', arm: i % 2 ? 'up' : null, flip: i % 2 === 1 }); } for (let i = 0; i < 6; i++) { const ph = fr(t * 1.2 + i / 6); c.save(); c.globalAlpha = 1 - ph; TX(c, i % 2 ? 'キャー' : 'ひっ', 30 + i * 46, 60 - ph * 20, '#e81c1c', 16, '#000000'); c.restore(); } return { z: 1.03, fx: 160, fy: 110, sx: Math.round(Math.sin(t * 40)) }; }
    if (t > S.tNo) { R(c, 0, 0, W, H, '#140818'); glow(c, 160, 90, 120, 70, '#5c1c2c', 0.35); womanShade(c, 230, 156, { s: 1.6 }); kid(c, BOY, 110, 156, { k: 'no', expr: 'shock' }); plate(c, 30, 40, 'どう答えても、助からない', '#f8c8d8'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tBike) { lane(c, t, { night: true, light: 1, ox: Math.floor(t * 120) }); const bx = 170; for (const v of [-10, 12]) { ER(c, bx + v, 152, 7, 7, '#1c1c1c'); } L(c, bx - 10, 152, bx, 142, '#c83c3c', 2); L(c, bx, 142, bx + 12, 152, '#c83c3c', 2); kid(c, BOY, bx, 146, { k: 'bk', f: Math.floor(t * 8) & 3, expr: 'shock' }); woman(c, 70 + Math.sin(t * 3) * 6, 156, { f: Math.floor(t * 8) & 3 }); for (let i = 0; i < 6; i++) L(c, 20 + i * 8, 100 + i * 8, 50 + i * 8, 100 + i * 8, '#f8f8f8'); return { z: 1.04, fx: 140, fy: 110 }; }
    if (t > S.tRun) { R(c, 0, 0, W, H, '#2c3c2c'); R(c, 0, 120, W, 60, '#a86c4c'); for (let r = 0; r < 4; r++) R(c, 0, 126 + r * 10, W, 1, '#f4f0e8'); R(c, 260, 112, 2, 50, '#f4f0e8'); const u = sg(t, S.tRun + 0.3, S.tRun + 1.6); woman(c, lerp(30, 250, u * u), 156, { f: Math.floor(t * 10) & 3 }); for (let i = 0; i < 5; i++) L(c, lerp(30, 250, u * u) - 30 - i * 6, 110 + i * 9, lerp(30, 250, u * u) - 14 - i * 6, 110 + i * 9, '#f8f8f0'); if (t > at(S, 'L15', 2) - 0.3) plate(c, 100, 50, '100メートル 6秒', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tCut) { R(c, 0, 0, W, H, '#1c0810'); glow(c, 160, 90, 120, 70, '#8c1c2c', 0.35); plate(c, 40, 50, 'あなたの口も、同じように…', '#f8c8d8'); L(c, 140, 110, 200, 130, '#c8ccd4', 3); L(c, 140, 130, 200, 110, '#c8ccd4', 3); ER(c, 134, 108, 6, 5, '#3c3c44'); ER(c, 134, 132, 6, 5, '#3c3c44'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tOpen) { return closeUp(c, t, kuchiFace({ open: true, smile: t > at(S, 'L13b', 0, 1e9) - 0.3, blink: blinkOf(t, 5) }), { bg: ['#0c0408', '#4c0c18'], glow: '#c81818', talk: false }); }
    if (t > S.tMask) { R(c, 0, 0, W, H, '#1c1018'); glow(c, 160, 80, 120, 70, '#5c2c3c', 0.3); woman(c, 160, 168, { s: 2, arm: 'mask' }); return { z: 1.02 + 0.06 * ss(sg(t, S.tMask, S.tOpen)), fx: 160, fy: 60 }; }
    if (t > S.tPretty) { R(c, 0, 0, W, H, '#140818'); plate(c, 110, 60, 'きれい、と答えたら', '#f8e8b0'); womanShade(c, 160, 166, { s: 1.4 }); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#140818'); glow(c, 160, 90, 120, 70, '#3c1c2c', 0.4); womanShade(c, 170, 160, { s: 1.4, arm: 'scissors' }); plate(c, 30, 40, 'きれいじゃない、と答えたら', '#f8e8b0');
    return { z: 1.04, fx: 170, fy: 110 };
  }
}, [['V2', (c, t) => closeUp(c, t, kuchiFace({ open: true, smile: true, blink: blinkOf(t, 3) }), { bg: ['#0c0408', '#4c0c18'], glow: '#c81818', talk: false })]]);

/* ---- UD: the turning point — the ways to escape: "ポマード" x3, a butterscotch candy, "まあまあ"; kids practising (moves: the words pop, the candy, she freezes) ---- */
const UD = {
  name: '逃げる方法', ch: '逃げる方法', bgm: 'pulse',
  init(S) { S.tWays = at(S, 'L18', 0) - 0.3; S.tCandy = at(S, 'L20', 0) - 0.3; S.tCalm = at(S, 'L20b', 0) - 0.3; S.tSoso = at(S, 'L21', 0) - 0.3; S.tKids = at(S, 'L22', 0) - 0.3; S.tWhy = at(S, 'L23', 0) - 0.3; S.tFail = at(S, 'L23b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFail) { lane(c, t, { night: true, light: 1 }); woman(c, 200, 156, { flip: true }); kid(c, BOY, 110, 158, { k: 'fl', expr: 'shock', arm: 'fwd' }); candy(c, 130, 110); plate(c, 30, 40, 'まったく効かない？', '#f8c8d8'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tWhy) { duskSky(c); R(c, 0, 120, W, 60, '#7c7870'); for (let i = 0; i < 4; i++) kid(c, KIDS[i], 70 + i * 50, 156, { k: 'wy' + i, f: Math.floor(t * 4 + i) & 3, expr: 'smile' }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tKids) { classroom(c, t, { text: 'ポマード ×3' }); for (let i = 0; i < 4; i++) { kid(c, KIDS[i + 1], 60 + i * 66, 156, { k: 'pk' + i, flip: i % 2 === 1, arm: i === 2 ? 'fwd' : null }); } candy(c, 212, 110); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tSoso) { lane(c, t, { light: 0.4 }); kid(c, BOY, 120, 158, { k: 'ss', arm: 'fwd' }); woman(c, 200, 156, { flip: true }); const k = sg(t, S.tSoso + 0.6, S.tSoso + 1.4); if (k > 0) plate(c, 60, 40, 'まあまあです', '#f8e8b0'); if (t > at(S, 'L21', 2) - 0.3) { for (let i = 0; i < 3; i++) TX(c, '？', 196 + i * 8, 64 - i * 6, '#e8c040', 16, '#000000'); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tCalm) { R(c, 0, 0, W, H, '#1c1428'); bigCap(c, '慌てないこと', 80, 32, '#f8e8b0', sg(t, S.tCalm + 0.2, S.tCalm + 0.8)); return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tCandy) { R(c, 0, 0, W, H, '#2c1c14'); glow(c, 160, 90, 120, 60, '#f8c860', 0.3); candy(c, 150, 90, 3); plate(c, 110, 40, 'べっこう飴', '#f8e8b0'); womanShade(c, 260, 156, { flip: true }); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tWays) { R(c, 0, 0, W, H, '#140c20'); if (t < at(S, 'L19', 0) - 0.2) bigCap(c, '逃げる方法', 80, 32, '#f8e8b0', sg(t, S.tWays + 0.2, S.tWays + 0.8)); const n = t > at(S, 'L19', 0) - 0.2 ? Math.min(3, 1 + Math.floor(sg(t, at(S, 'L19', 0), at(S, 'L19', 1)) * 3)) : 0; for (let i = 0; i < n; i++) plate(c, 60 + i * 30, 40 + i * 34, 'ポマード', '#f8e8b0'); if (t > at(S, 'L19', 2) - 0.3) { const u = sg(t, at(S, 'L19', 3), at(S, 'L19', 3) + 1.5); womanShade(c, lerp(250, 360, u), 156, { flip: false, f: u > 0 ? Math.floor(t * 6) & 3 : -1 }); } return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#1c1028'); glow(c, 160, 100, 140, 70, '#5c3c6c', 0.4); c.save(); c.globalAlpha = 0.5; womanShade(c, 250, 156, { flip: true, col: '#2c1c3c' }); c.restore(); bigCap(c, 'ところが――', 80, 32, '#f8e8b0', sg(t, 0.3, 1.0));
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- UE: who was she? — a hospital corridor light, three sisters' silhouettes, question marks multiplying (moves: the light buzzes, marks pop) ---- */
const UE = {
  name: '女の正体', ch: '女の正体', bgm: 'memory',
  init(S) { S.tHosp = at(S, 'L25', 0) - 0.3; S.tSis = at(S, 'L26', 0) - 0.3; S.tQ = at(S, 'L26b', 0) - 0.3; S.tMany = at(S, 'L27', 0) - 0.3; S.tMonster = at(S, 'L27b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMonster) { R(c, 0, 0, W, H, '#140818'); glow(c, 160, 90, 140, 80, '#5c1c2c', 0.3 + 0.05 * Math.sin(t * 2)); woman(c, 160, 168, { s: 1.8 }); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + t * 0.3; TX(c, '？', 156 + Math.cos(a) * 110, 90 + Math.sin(a) * 50, '#5c3c4c', 16, null); } return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tQ) { R(c, 0, 0, W, H, '#1c1428'); const n = Math.floor(sg(t, S.tQ, S.dur) * 20); for (let i = 0; i < n; i++) TX(c, '？', 20 + hash(i) * 280, 36 + hash(i * 3) * 110, ['#e8c040', '#e86c6c', '#c8c8e8'][i % 3], 16, '#000000'); if (t > S.tMany) plate(c, 60, 140, '語られるたびに、正体が増えた', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tSis) { R(c, 0, 0, W, H, '#1c1420'); glow(c, 160, 90, 120, 70, '#5c3c4c', 0.3); for (let i = 0; i < 3; i++) { if (i < 2) woman(c, 90 + i * 70, 160, { k: 's' + i, coat: ['#c8a0b0', '#a0b0c8'][i] }); else womanShade(c, 240, 160, {}); } plate(c, 30, 40, '三人姉妹の末の妹', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tHosp) { R(c, 0, 0, W, H, '#c8d0cc'); R(c, 0, 130, W, 50, '#8c9c98'); for (let i = 0; i < 4; i++) { R(c, 30 + i * 80, 50, 40, 80, '#a8b4b0'); R(c, 34 + i * 80, 54, 32, 72, '#b8c4c0'); } const fl = Math.sin(t * 17) > 0.6 ? 0.6 : 0; R(c, 140, 20, 40, 6, '#f8f8f0'); glow(c, 160, 30, 60, 20, '#f8f8f0', 0.3 - fl * 0.3); dim(c, fl * 0.4); womanShade(c, 160, 160, { col: '#3c4448' }); plate(c, 30, 40, '手術に失敗した女', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#140c18'); womanShade(c, 160, 166, { s: 1.6 }); bigCap(c, '正体は？', 64, 32, '#f8e8b0', sg(t, 0.3, 0.9));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- UF: the rumour leaves the playground — group walk home, a patrol car, the papers, kids looking back (moves: the line walks, the siren light, a head turns) ---- */
const UF = {
  name: '集団下校', ch: '大人たちも', bgm: 'pulse',
  init(S) { S.tGroup = at(S, 'L29', 0) - 0.3; S.tPol = at(S, 'L29', 3) - 0.3; S.tTeach = at(S, 'L29b', 0) - 0.3; S.tNews = at(S, 'L30', 0) - 0.3; S.tFast = at(S, 'L30b', 0) - 0.3; S.tSaw = at(S, 'L31', 0) - 0.3; S.tBack = at(S, 'L32', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBack) { lane(c, t, { light: 0.6 }); const turn = Math.sin(t * 0.9) > 0; kid(c, KIDS[1], 140, 158, { k: 'bk', flip: turn, f: turn ? -1 : Math.floor(t * 4) & 3, expr: turn ? 'shock' : 'normal' }); if (turn) { c.save(); c.globalAlpha = 0.25; womanShade(c, 40, 156, {}); c.restore(); } return { z: 1.04, fx: 140, fy: 110 }; }
    if (t > S.tSaw) { R(c, 0, 0, W, H, '#0c0810'); bigCap(c, '見た人は、いたのか', 80, 32, '#f8e8b0', sg(t, S.tSaw + 0.2, S.tSaw + 0.8)); return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tFast) { lane(c, t, { night: true, light: 1, ox: Math.floor(t * 90) }); for (let i = 0; i < 3; i++) kid(c, KIDS[i + 2], 120 + i * 30, 158, { k: 'fs' + i, f: Math.floor(t * 7 + i) & 3 }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNews) { R(c, 0, 0, W, H, '#2c2418'); spinPaper(c, paperSpr('kz1', '口裂け女', '噂広がる', '1979年'), 160, 96, sg(t, S.tNews, S.tNews + 0.8)); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tTeach) { classroom(c, t, { text: 'ひとりで帰らない' }); person(c, TEACH, 220, 152, { k: 'tc', arm: 'point', flip: true }); for (let i = 0; i < 3; i++) { desk(c, 50 + i * 50, 156); kid(c, KIDS[i], 50 + i * 50, 156, { k: 'tk' + i }); } return { z: 1.03, fx: 160, fy: 110 }; }
    lane(c, t, { light: 0.3 }); const u = sg(t, S.tGroup, S.tGroup + 8); for (let i = 0; i < 6; i++) kid(c, KIDS[i], lerp(-40, 220, u) + i * 20, 158, { k: 'gp' + i, f: Math.floor(t * 4 + i) & 3 }); person(c, TEACH, lerp(-40, 220, u) + 130, 156, { k: 'gp', f: Math.floor(t * 4) & 3 });
    if (t > S.tPol) { const b = Math.floor(t * 4) & 1; const cx = lerp(380, 250, sg(t, S.tPol, S.tPol + 2)); R(c, cx - 30, 140, 60, 12, '#f4f4f0'); R(c, cx - 30, 146, 60, 4, '#141414'); PF(c, [cx - 18, 140, cx - 12, 130, cx + 14, 130, cx + 22, 140], '#f4f4f0'); R(c, cx - 4, 126, 8, 4, b ? '#e81c1c' : '#8c1c1c'); glow(c, cx, 128, 20, 10, '#e81c1c', b ? 0.4 : 0.1); for (const v of [-18, 18]) E(c, cx + v, 152, 6, 6, '#141414'); }
    plate(c, 30, 40, '集団で下校', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- UG: the end of the summer, and how she lived on — red mask, a sickle, a motorbike; books and films; grown-ups remember (moves: the season turns, variants appear) ---- */
const UG = {
  name: '生き残った噂', ch: '生き残った噂', bgm: 'eerie',
  init(S) { S.tAutumn = at(S, 'L33b', 0) - 0.3; S.tGone = at(S, 'L34', 0) - 0.3; S.tNo = at(S, 'L35', 0) - 0.3; S.tRetell = at(S, 'L35b', 0) - 0.3; S.tVar = at(S, 'L36', 0) - 0.3; S.tBooks = at(S, 'L36b', 0) - 0.3; S.tNow = at(S, 'L37', 0) - 0.3; S.tAdult = at(S, 'L37b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tAdult) { lane(c, t, { light: 0.4 }); person(c, { id: 'ad', top: 'jacket', coat: '#4c5c6c', shirt: '#e8e4dc', pants: '#2c2c34', skin: '#e8c4a0', hair: '#3c3c3c', hairStyle: 'side' }, 150, 156, { k: 'ad', expr: 'sad', blink: blinkOf(t, 4) }); c.save(); c.globalAlpha = 0.35; kid(c, BOY, 190, 158, { k: 'adk' }); c.restore(); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNow) { classroom(c, t); for (let i = 0; i < 4; i++) { kid(c, { ...KIDS[i], id: 'nw' + i, top: 'tee', coat: ['#3cc8a8', '#f8a03c', '#8c6cf8', '#f86ca8'][i] }, 60 + i * 64, 156, { k: 'nw' + i, flip: i % 2 === 1 }); whisper(c, t, 66 + i * 64, 90, i); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tBooks) { R(c, 0, 0, W, H, '#2c2418'); for (let i = 0; i < 5; i++) { R(c, 40 + i * 30, 50, 26, 90, ['#8c1c2c', '#2c2c5c', '#1c4c3c', '#5c3c1c', '#3c3c3c'][i]); R(c, 44 + i * 30, 60, 18, 4, '#e8d8b0'); } R(c, 210, 60, 70, 70, '#141414'); for (let k = 0; k < 6; k++) { R(c, 212, 62 + k * 11, 4, 6, '#d8d8d0'); R(c, 274, 62 + k * 11, 4, 6, '#d8d8d0'); } R(c, 222, 70, 46, 50, '#3c2c3c'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tVar) { R(c, 0, 0, W, H, '#140c18'); const k = Math.floor(sg(t, S.tVar, at(S, 'L36', 4)) * 3.99); woman(c, 70, 160, {}); if (k >= 1) { woman(c, 160, 160, { coat: '#8c2c2c' }); R(c, 154, 103, 11, 6, '#c81c2c'); } if (k >= 2) { woman(c, 250, 160, { coat: '#4c4c5c' }); L(c, 268, 120, 276, 100, '#c8ccd4', 2); ER(c, 270, 96, 8, 6, '#c8ccd4', Math.PI, 1.6 * Math.PI); } if (k >= 3) { R(c, 30, 140, 50, 10, '#2c2c34'); E(c, 34, 152, 6, 6, '#141414'); E(c, 76, 152, 6, 6, '#141414'); } plate(c, 40, 34, '白から赤へ、はさみから鎌へ', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tRetell) { R(c, 0, 0, W, H, '#140c18'); for (let i = 0; i < 6; i++) { const a = fr(t * 0.2 + i / 6); c.save(); c.globalAlpha = Math.sin(a * Math.PI); kid(c, KIDS[i], 30 + i * 52, 156, { k: 'rt' + i }); c.restore(); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNo) { R(c, 0, 0, W, H, '#1c0c18'); glow(c, 160, 100, 140, 70, '#5c1c2c', 0.4); c.save(); c.globalAlpha = 0.4 + 0.2 * Math.sin(t * 3); womanShade(c, 160, 166, { s: 1.4, col: '#3c1c2c' }); c.restore(); bigCap(c, 'いいえ。', 80, 32, '#e81c1c', sg(t, S.tNo + 0.1, S.tNo + 0.6)); return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tGone) { lane(c, t, { light: 0.2 }); c.save(); c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2); womanShade(c, 230, 156, { flip: true }); c.restore(); return { z: 1.03 + 0.04 * ss(sg(t, S.tGone, S.tNo)), fx: 220, fy: 110 }; }
    duskSky(c); R(c, 0, 110, W, 70, '#c8a050'); for (let i = 0; i < 30; i++) { const u = fr(t * 0.15 + hash(i)); E(c, hash(i * 7) * W + Math.sin(t + i) * 6, u * 170, 2, 1.5, ['#e86c2c', '#e8a03c', '#c84c2c'][i % 3]); } for (let i = 0; i < 3; i++) kid(c, KIDS[i + 3], 90 + i * 50, 156, { k: 'au' + i, f: Math.floor(t * 4 + i) & 3 });
    if (t > S.tAutumn) plate(c, 30, 40, '新しい噂がやって来る', '#f8e8b0'); else yearFlash(c, t, 0.3, 1979, 216, 10, '夏の終わり');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- UH: why it spread, and the question back to you (moves: faces behind masks, the dusk returns, she asks again) ---- */
const UH = withCuts({
  name: 'あなたは何と答える', ch: 'なぜ広まったのか', bgm: 'requiem',
  init(S) { S.tAdult = at(S, 'L39', 0) - 0.3; S.tMask = at(S, 'L39b', 0) - 0.3; S.tHide = at(S, 'L40', 0) - 0.3; S.tAll = at(S, 'L40b', 0) - 0.3; S.tIf = at(S, 'L41', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tIf) { lane(c, t, { light: 0.3 }); woman(c, 220, 156, { flip: true }); const u = sg(t, S.tIf, S.tIf + 4); kid(c, BOY, lerp(40, 150, u), 158, { k: 'if', f: u < 1 ? Math.floor(t * 4) & 3 : -1, expr: u >= 1 ? 'shock' : 'normal' }); return { z: 1.03 + 0.05 * ss(sg(t, S.tIf, S.tIf + 8)), fx: 190, fy: 110 }; }
    if (t > S.tAll) { R(c, 0, 0, W, H, '#140818'); plate(c, 40, 40, '答えのない質問', '#f8e8b0'); if (t > at(S, 'L40b', 1) - 0.3) plate(c, 70, 70, '逃げられない夕暮れ', '#f8e8b0'); if (t > at(S, 'L40b', 2) - 0.3) plate(c, 100, 100, 'すぐ近くにいる、誰か', '#f8c8d8'); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tMask) { lane(c, t, {}); for (let i = 0; i < 5; i++) { person(c, { id: 'ms' + i, top: ['jacket', 'shirt', 'dress', 'sweater', 'shirt'][i], coat: ['#5c5c6c', '#8cacc8', '#c86c6c', '#8c8c5c', '#e8e4dc'][i], shirt: '#e8e4dc', pants: '#2c2c34', skin: '#e8c4a0', hair: '#141414', hairStyle: i === 2 ? 'long' : 'short' }, 40 + i * 60, 156, { k: 'ms' + i, f: Math.floor(t * 3 + i) & 3, flip: i % 2 === 1 }); R(c, 34 + i * 60, 103, 10, 5, '#f8f8f4'); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tHide) { R(c, 0, 0, W, H, '#140c18'); blit(c, kuchiFace({ blink: blinkOf(t, 6) }), 160, 88, 24, 24, { s: 2.6 }); return { z: 1.02, fx: 160, fy: 88 }; }
    if (t > S.tAdult) { lane(c, t, { light: 0.2 }); woman(c, 200, 156, { flip: true }); for (let i = 0; i < 2; i++) person(c, { id: 'pw' + i, top: 'jacket', coat: '#5c5c6c', shirt: '#e8e4dc', pants: '#2c2c34', skin: '#e8c4a0', hair: '#141414', hairStyle: 'short' }, 80 + i * 40, 156, { k: 'pw' + i, f: Math.floor(t * 3 + i) & 3 }); plate(c, 30, 40, 'お化けではない、ひとりの大人', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#0c0810'); bigCap(c, 'なぜ？', 70, 48, '#f8e8b0', sg(t, 0.3, 0.9));
    return { z: 1.02, fx: 160, fy: 100 };
  }
}, [['V3', KCLOSE]]);

/* ---- SS1 / SS2: Short & TikTok bookends (the loop ends on her hand at the mask) ---- */
const SS1 = { name: 'わたし、きれい？', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { lane(c, t, { light: 0.4 }); woman(c, 196, 156, { flip: true }); kid(c, BOY, 130, 158, { k: 's1', expr: 'shock' }); c.save(); c.globalAlpha = 0.85; R(c, 0, 34, W, 44, '#000000'); c.restore(); bigCap(c, 'わたし、きれい？', 40, 32, '#f8e8b0', sg(t, 0.1, 0.6)); return { z: 1.04, fx: 170, fy: 100 }; } };
const SS2 = { name: 'マスクに手を', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { R(c, 0, 0, W, H, '#1c1018'); glow(c, 160, 80, 120, 70, '#5c2c3c', 0.3); woman(c, 160, 168, { s: 2, arm: t > at(S, 'S2', 1) ? 'mask' : null }); return { z: 1.02 + 0.06 * ss(sg(t, 0, S.dur)), fx: 160, fy: 60 }; } };
