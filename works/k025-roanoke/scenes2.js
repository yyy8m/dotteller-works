/* ================= 記録 #025 ロアノーク植民地の消失: scenes ================= */
const KC = (c, t) => closeUp(c, t, kenkyuFace({ blink: blinkOf(t, 5) }), { bg: ['#0c1c14', '#2c4c3c'], spk: 'kenkyu' });

/* ---- PZ: cold open — Aug 18, 1590: a man returns to Roanoke after three years; his granddaughter's third birthday; the island empty, one word on a post (moves: the ship nears, the empty beach, the post lit) ---- */
const PZ = {
  name: '3年ぶりの島', ch: '消えた開拓者たち', bgm: 'eerie',
  init(S) { S.tBday = at(S, 'C1', 0) - 0.3; S.tEmpty = at(S, 'C2', 0) - 0.3; S.tPost = at(S, 'C2', 2) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tPost) { R(c, 0, 0, W, H, '#0c0c10'); carvedPost(c, 145, 40, 'CROATOAN', { glow: 0.2 + 0.1 * Math.sin(t * 3) }); return { z: 1.06 + 0.06 * sg(t, S.tPost, S.dur), fx: 160, fy: 96 }; }
    if (t > S.tEmpty) { island(c, t, { ruined: true }); for (let i = 0; i < 30; i++) { const u = fr(t * 0.2 + i / 30); P(c, u * W, 60 + (i * 17) % 60, '#a8a090'); } return { z: 1.04 + 0.05 * sg(t, S.tEmpty, S.tPost), fx: 160, fy: 104 }; }
    if (t > S.tBday) { island(c, t, { fort: false }); person(c, WHITE, 150, 150, { k: 'zw', blink: blinkOf(t, 5) }); ship(c, 270, 116, 0.6, { t }); plate(c, 40, 46, '孫娘の、3歳の誕生日', '#f8e8b0'); return { z: 1.1, fx: 170, fy: 108 }; }
    sea(c, t); const k = sg(t, 0.4, S.tBday); R(c, 0, 92, lerp(40, 120, k), 16, '#2c4c2c'); R(c, 0, 102, lerp(40, 120, k), 6, '#c8b888'); ship(c, lerp(210, 150, k), 128, 0.9, { flip: true, t }); yearFlash(c, t, 0.4, '1590', 216, 10, '8月18日');
    return { z: 1.04, fx: 160, fy: 104 };
  }
};

/* ---- PA: the charter — Raleigh and Elizabeth I; ten years or the right is lost; riches, a base against Spanish treasure fleets; 1584, the Outer Banks (moves: the court, the scroll, a treasure ship, the map mark) ---- */
const PA = {
  name: '女王の勅許', ch: '始まり', bgm: 'memory',
  init(S) { S.tTen = at(S, 'L2', 0) - 0.3; S.tGold = at(S, 'L3', 0) - 0.3; S.tNever = at(S, 'L3', 4) - 0.3; S.tMap = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMap) { oldMap(c, t, { mark: t > at(S, 'L4', 2) - 0.3 ? [80, 80] : null, label: 'アウターバンクス' }); yearFlash(c, t, S.tMap + 0.3, '1584', 216, 10, '探検'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tNever) { court(c, t); person(c, RALEIGH, 160, 156, { k: 'an', blink: blinkOf(t, 5) }); plate(c, 40, 46, '自身は、一度も渡らなかった', '#f8e8b0'); return { z: 1.1, fx: 160, fy: 108 }; }
    if (t > S.tGold) { sea(c, t); ship(c, 200, 124, 1, { t }); R(c, 180, 92, 40, 10, '#c8a048'); for (let i = 0; i < 6; i++) E(c, 186 + i * 6, 90, 3, 3, '#f8e070'); ship(c, lerp(-40, 90, sg(t, S.tGold + 1, S.tGold + 4)), 128, 0.7, { t }); plate(c, 40, 46, 'スペインの宝の船', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tTen) { R(c, 0, 0, W, H, '#2c1c14'); R(c, 80, 30, 160, 110, '#e8d8b0'); for (let i = 0; i < 8; i++) R(c, 92, 46 + i * 9, 130 - (i % 3) * 14, 2, '#5c4c3c'); E(c, 210, 120, 12, 12, '#c81818'); plate(c, 120, 110 - 12, '10年以内', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 90 }; }
    court(c, t); person(c, QUEEN, 160, 126, { k: 'aq', blink: blinkOf(t, 6) }); person(c, RALEIGH, 110, 156, { k: 'ar', blink: blinkOf(t, 5), flip: false }); yearFlash(c, t, 0.4, '1584', 216, 10, 'イングランド');
    return { z: 1.06, fx: 140, fy: 104 };
  }
};

/* ---- PB: the first colony — 1585, an all-male expedition, the ship aground; the silver cup, a village burned; Lane and 75 men left; April passes; Drake takes them home; Grenville finds the island empty, leaves a few (moves: smoke over trees, ships coming and going) ---- */
const PB = {
  name: '最初の開拓者', ch: '最初の開拓者', bgm: 'dread',
  init(S) { S.tCup = at(S, 'L6', 0) - 0.3; S.tLeft = at(S, 'L7', 0) - 0.3; S.tDrake = at(S, 'L8', 0) - 0.3; S.tEmpty = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tEmpty) { island(c, t, { houses: true }); ship(c, lerp(360, 250, sg(t, S.tEmpty, S.tEmpty + 3)), 118, 0.7, { t, flip: true }); person(c, GRENVILLE, 150, 152, { k: 'be', expr: 'shock' }); if (t > at(S, 'L9', 3) - 0.3) for (let i = 0; i < 3; i++) person(c, SAILORS[i], 190 + i * 22, 152, { k: 'bs' + i }); return { z: 1.06, fx: 170, fy: 104 }; }
    if (t > S.tDrake) { island(c, t, { houses: true }); ship(c, 250, 118, 0.9, { t }); if (t > at(S, 'L8', 3) - 0.3) { person(c, DRAKE, 200, 152, { k: 'bd', arm: 'wave' }); for (let i = 0; i < 4; i++) person(c, [COLONISTS[0], COLONISTS[2], SAILORS[0], SAILORS[2]][i], lerp(100 + i * 20, 230, sg(t, at(S, 'L8', 4), at(S, 'L8', 4) + 4)), 152, { k: 'bc' + i, f: Math.floor(t * 4 + i) & 3 }); } else { for (let i = 0; i < 4; i++) person(c, [COLONISTS[0], COLONISTS[2], SAILORS[0], SAILORS[2]][i], 90 + i * 24, 152, { k: 'bw' + i, expr: 'sad' }); } return { z: 1.04, fx: 170, fy: 104 }; }
    if (t > S.tLeft) { island(c, t, { houses: true }); ship(c, lerp(250, 380, sg(t, S.tLeft + 2, S.tLeft + 7)), 118, 0.8, { t }); for (let i = 0; i < 5; i++) person(c, i % 2 ? SAILORS[i % 3] : COLONISTS[[0, 2][(i / 2) % 2]], 70 + i * 26, 152, { k: 'bl' + i, arm: i === 2 ? 'wave' : null }); plate(c, 40, 46, '約75人', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tCup) { VG(c, 0, 0, W, 110, ['#5c4c5c', '#8c6c6c', '#c89c7c']); for (let i = 0; i < 12; i++) { const x = i * 28 - 6; PF(c, [x, 112, x + 14, 64 + (i % 3) * 10, x + 28, 112], '#1c2c1c'); } R(c, 0, 110, W, 80, '#4c4030'); for (let i = 0; i < 8; i++) { const u = fr(t * 0.25 + i / 8); c.save(); c.globalAlpha = 0.5 * (1 - u); E(c, 180 + Math.sin(t + i) * 8, 90 - u * 70, 12 + u * 16, 8 + u * 10, '#3c3c40'); c.restore(); } R(c, 120, 40, 40, 30, '#e8e0d0'); R(c, 128, 46, 24, 18, '#c8c8d0'); plate(c, 40, 120 - 2, '銀のカップの疑い', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 96 }; }
    sea(c, t); R(c, 0, 128, W, 20, '#c8b888'); ship(c, 120, 132, 1, { t: 0 }); c.save(); c.translate(160, 132); c.rotate(-0.1); c.restore(); yearFlash(c, t, 0.4, '1585', 216, 10, ''); if (t > at(S, 'L5', 4) - 0.3) plate(c, 40, 46, '浅瀬に乗り上げる', '#f8e8b0');
    return { z: 1.06, fx: 160, fy: 104 };
  }
};

/* ---- PC: the second colony — 1587, 117 settlers with women and children, John White; landing July 22; Virginia Dare born Aug 18; the tribe refuses; George Howe killed while crabbing (not shown); White persuaded to sail for help; 115 remain; the cross signal (moves: the landing, the baby, the shore at dusk, the ship leaving) ---- */
const PC = withCuts({
  name: 'ヴァージニア・デア', ch: '第二の開拓者', bgm: 'memory',
  init(S) { S.tLand = at(S, 'L11', 0) - 0.3; S.tBaby = at(S, 'L11', 2) - 0.3; S.tTribe = at(S, 'L12', 0) - 0.3; S.tHowe = at(S, 'L13', 0) - 0.3; S.tGo = at(S, 'L14', 0) - 0.3; S.tCross = at(S, 'L15', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCross) { island(c, t, { fort: false }); carvedTree(c, 180, 20, ''); const k = sg(t, S.tCross + 3, S.tCross + 5); c.save(); c.globalAlpha = 0.3 + 0.6 * k; R(c, 194, 50, 6, 30, '#f8e8b0'); R(c, 186, 58, 22, 6, '#f8e8b0'); c.restore(); person(c, WHITE, 130, 152, { k: 'cx', arm: 'wave' }); return { z: 1.1, fx: 170, fy: 96 }; }
    if (t > S.tGo) { island(c, t, { houses: true, dusk: true }); ship(c, lerp(230, 330, sg(t, at(S, 'L14', 3), at(S, 'L14', 3) + 6)), 118, 0.8, { t }); for (let i = 0; i < 5; i++) person(c, COLONISTS[i], 50 + i * 24, 152, { k: 'cg' + i, arm: i === 1 ? 'wave' : null }); person(c, ELEANOR, 180, 152, { k: 'cge', expr: 'sad' }); if (t > at(S, 'L14', 3) - 0.3) plate(c, 40, 46, '残った115人', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tHowe) { sea(c, t, {}); R(c, 0, 126, W, 64, '#c8b888'); const dark = t > at(S, 'L13', 3) - 0.3; person(c, COLONISTS[0], 160, 152, { k: 'ch', f: dark ? -1 : Math.floor(t * 2) & 3 }); if (dark) dim(c, 0.6 * sg(t, at(S, 'L13', 3) - 0.3, at(S, 'L13', 3) + 1), '#1c0808'); plate(c, 40, 46, 'ジョージ・ハウ', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tTribe) { village(c, t); person(c, WHITE, 90, 152, { k: 'ct', arm: 'wave' }); for (let i = 0; i < 3; i++) person(c, NATIVES[i], 200 + i * 26, 152, { k: 'cn' + i, flip: t < at(S, 'L12', 2) - 0.3 }); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tBaby) { island(c, t, { houses: true }); person(c, ELEANOR, 150, 152, { k: 'cb', expr: 'smile', blink: blinkOf(t, 5) }); E(c, 148, 122, 9, 6, '#f0ece0'); E(c, 153, 120, 3, 3, '#f4d8c0'); person(c, WHITE, 120, 152, { k: 'cw', expr: 'smile' }); yearFlash(c, t, S.tBaby + 0.2, '1587', 216, 10, '8月18日'); if (t > at(S, 'L11b', 0) - 0.3) plate(c, 40, 46, 'ヴァージニア・デア', '#f8e8b0'); return { z: 1.12, fx: 145, fy: 110 }; }
    if (t > S.tLand) { island(c, t, { fort: false }); ship(c, 260, 116, 0.7, { t }); for (let i = 0; i < 6; i++) person(c, COLONISTS[i], lerp(300, 80 + i * 26, sg(t, S.tLand, S.tLand + 4)), 152, { k: 'cl' + i, f: Math.floor(t * 4 + i) & 3 }); yearFlash(c, t, S.tLand + 0.2, '1587', 216, 10, '7月22日'); return { z: 1.04, fx: 160, fy: 104 }; }
    sea(c, t); ship(c, 160, 128, 1.1, { t }); for (let i = 0; i < 3; i++) person(c, COLONISTS[i * 2], 140 + i * 16, 108, { k: 'cs' + i, s: 0.5 }); plate(c, 40, 46, '117人の開拓者', '#f8e8b0'); if (t > at(S, 'L10', 3) - 0.3) plate(c, 40, 70, 'ジョン・ホワイト', '#f8e8b0');
    return { z: 1.06, fx: 160, fy: 104 };
  }
}, [['L11b', (c, t) => { island(c, t, { houses: true }); person(c, ELEANOR, 160, 156, { k: 'cbz', expr: 'smile', s: 1.3 }); E(c, 156, 118, 11, 7, '#f0ece0'); E(c, 162, 116, 4, 4, '#f4d8c0'); plate(c, 60, 64, 'ヴァージニア・デア', '#f8e8b0'); return { z: 1.3, fx: 160, fy: 110 }; }]]);

/* ---- PD: the war — winter, no captain; the Armada, every ship taken; 1588, two small ships turn pirate and are robbed; three years; 1590, a privateer's promise (moves: the harbour, the fleet, the calendar) ---- */
const PD = {
  name: '無敵艦隊', ch: '戻れない3年', bgm: 'pulse',
  init(S) { S.tArmada = at(S, 'L17', 0) - 0.3; S.tSmall = at(S, 'L18', 0) - 0.3; S.tYears = at(S, 'L19', 0) - 0.3; S.tPriv = at(S, 'L20', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPriv) { sea(c, t); const px = lerp(-40, 160, sg(t, S.tPriv + 0.5, S.tPriv + 5)); ship(c, px, 128, 1, { t }); R(c, px - 10, 60, 14, 8, '#141414'); yearFlash(c, t, S.tPriv + 0.3, '1590', 216, 10, ''); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tYears) { R(c, 0, 0, W, H, '#1c1c24'); const ys = ['1588', '1589', '1590']; for (let i = 0; i < 3; i++) if (t > S.tYears + 0.5 + i * 0.8) { R(c, 50 + i * 80, 50, 60, 60, '#e8e4d8'); R(c, 50 + i * 80, 50, 60, 12, '#c81818'); TX(c, ys[i], 60 + i * 80, 74, '#2c2c2c', 16, null); } return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tSmall) { sea(c, t); const ph = t > at(S, 'L18', 3) - 0.3; ship(c, ph ? 120 : lerp(80, 150, sg(t, S.tSmall, S.tSmall + 4)), 128, 0.6, { t }); ship(c, ph ? 90 : lerp(40, 110, sg(t, S.tSmall, S.tSmall + 4)), 132, 0.6, { t }); if (ph) { ship(c, 180, 124, 1, { t, flip: true }); R(c, 172, 100, 30, 8, '#c8a048'); } yearFlash(c, t, S.tSmall + 0.3, '1588', 216, 10, '春'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tArmada) { sea(c, t); for (let i = 0; i < 6; i++) ship(c, 60 + i * 44, 120 + (i % 2) * 10, 0.55, { t: t + i, flip: true }); R(c, 0, 0, W, 6, '#c81818'); plate(c, 40, 46, 'スペインの無敵艦隊', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 104 }; }
    VG(c, 0, 0, W, 110, ['#8c9cac', '#a8b4bc', '#c8ccd0']); R(c, 0, 104, W, 86, '#4c5c6c'); for (let i = 0; i < 30; i++) P(c, (i * 37 + t * 20) % W, (i * 19 + t * 30) % 110, '#f0f0f0'); R(c, 0, 120, 120, 70, '#6c5c48'); ship(c, 200, 132, 0.9, { t }); person(c, WHITE, 70, 152, { k: 'dw', expr: 'sad' }); person(c, SAILORS[1], 100, 152, { k: 'ds', flip: true, arm: 'wave' }); plate(c, 140, 46, '冬の海', '#f8e8b0');
    return { z: 1.04, fx: 140, fy: 104 };
  }
};

/* ---- PE: the turn — Aug 18, 1590, his granddaughter's birthday; ruins; 90 men, 17 women, 11 children gone, no sign of a fight; houses taken down; (pause) CROATOAN on the post; CRO on a tree; no cross; a storm, they leave; "the lost colony" (moves: the footsteps on sand, the counter, the post lit, the storm) ---- */
const PE = {
  name: 'CROATOAN', ch: 'CROATOAN', bgm: 'dread',
  init(S) { S.tRuin = at(S, 'L22', 0) - 0.3; S.tCount = at(S, 'L23', 0) - 0.3; S.tDown = at(S, 'L24', 0) - 0.3; S.tPost = at(S, 'L25', 0) - 0.3; S.tWord = at(S, 'L25b', 0) - 0.3; S.tTree = at(S, 'L26', 0) - 0.3; S.tNo = at(S, 'L27', 0) - 0.3; S.tStorm = at(S, 'L28', 2) - 0.3; S.tLost = at(S, 'L29', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLost) { oldMap(c, t, { mark: [70, 80], label: '失われた植民地' }); dim(c, 0.2); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tStorm) { sea(c, t, { storm: true }); ship(c, lerp(160, 360, sg(t, at(S, 'L28', 4) - 0.3, S.tLost)), 126, 0.9, { t: t * 2 }); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tNo) { island(c, t, { ruined: true }); carvedTree(c, 140, 20, ''); person(c, WHITE, 110, 152, { k: 'en', expr: 'shock' }); return { z: 1.1, fx: 150, fy: 100 }; }
    if (t > S.tTree) { R(c, 0, 0, W, H, '#1c2418'); carvedTree(c, 140, 10, 'CRO'); return { z: 1.1, fx: 157, fy: 66 }; }
    if (t > S.tWord) { R(c, 0, 0, W, H, '#0c0c10'); carvedPost(c, 145, 30, 'CROATOAN', { glow: 0.3 * sg(t, S.tWord, S.tWord + 1) }); return { z: 1.4, fx: 160, fy: 84 }; }
    if (t > S.tPost) { island(c, t, { ruined: true }); carvedPost(c, 150, 40, '', {}); person(c, WHITE, 120, 152, { k: 'ep', f: Math.floor(t * 3) & 3 }); return { z: 1.06 + 0.2 * sg(t, S.tPost, S.tWord), fx: 160, fy: 96 }; }
    if (t > S.tDown) { island(c, t, { ruined: true }); for (let i = 0; i < 5; i++) R(c, 70 + i * 40, 140 + (i % 2) * 3, 20, 4, '#6c5038'); person(c, WHITE, 160, 152, { k: 'ed', expr: 'sad' }); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tCount) { R(c, 0, 0, W, H, '#14141c'); const g = [['男', 90], ['女', 17], ['子ども', 11]]; for (let i = 0; i < 3; i++) if (t > at(S, 'L23', i) - 0.3) plate(c, 60 + i * 76, 60, g[i][0] + ' ' + g[i][1], '#f8e8b0'); if (t > at(S, 'L23', 3) - 0.3) plate(c, 110, 100, 'どこにもいない', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tRuin) { island(c, t, { ruined: true }); for (let i = 0; i < 30; i++) P(c, (i * 47 + t * 12) % W, 90 + (i * 13) % 40, '#a8a090'); person(c, WHITE, 150, 152, { k: 'er', expr: 'shock' }); return { z: 1.06, fx: 160, fy: 104 }; }
    island(c, t, { fort: false }); person(c, WHITE, lerp(60, 150, sg(t, 0.3, 3)), 152, { k: 'el', f: Math.floor(t * 4) & 3 }); for (let i = 0; i < 2; i++) person(c, SAILORS[i], lerp(30, 110 + i * 20, sg(t, 0.3, 3)), 152, { k: 'es' + i, f: Math.floor(t * 4 + i) & 3 }); yearFlash(c, t, 0.4, '1590', 216, 10, '8月18日');
    return { z: 1.04, fx: 140, fy: 104 };
  }
};
const PH0 = { name: '消えた人々', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, whiteFace({ dark: true }), [[18, 21], [29, 21]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- PF: the theories — among friendly peoples; John Smith's mission 1607; Powhatan's claim and the iron tools; shipwreck; Spain still searching ten years later (moves: figures together, a ship, tools, a question mark) ---- */
const PF2 = {
  name: '仮説', ch: 'どこへ消えたのか', bgm: 'eerie',
  init(S) { S.tAmong = at(S, 'L31', 0) - 0.3; S.tSmith = at(S, 'L32', 0) - 0.3; S.tPow = at(S, 'L33', 0) - 0.3; S.tTools = at(S, 'L33', 4) - 0.3; S.tWreck = at(S, 'L34', 0) - 0.3; S.tSpain = at(S, 'L34', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSpain) { oldMap(c, t, {}); ship(c, lerp(300, 200, sg(t, S.tSpain, S.tSpain + 4)), 120, 0.6, { t, flip: true }); R(c, 194, 54, 12, 6, '#f8d838'); TX(c, '？', 140, 60, '#5c1c1c', 16, null); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tWreck) { sea(c, t, { storm: true }); c.save(); c.translate(160, 130); c.rotate(0.3); c.translate(-160, -130); ship(c, 160, 130, 0.5, { t, torn: true }); c.restore(); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tTools) { R(c, 0, 0, W, H, '#2c241c'); for (let i = 0; i < 3; i++) { R(c, 80 + i * 60, 80, 8, 40, '#8c8c94'); R(c, 72 + i * 60, 74, 24, 10, '#6c6c74'); } plate(c, 60, 46, 'イングランド製の鉄の道具', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 96 }; }
    if (t > S.tPow) { village(c, t, { fire: true, fireX: 250 }); person(c, NATIVES[1], 150, 152, { k: 'fp', arm: 'wave' }); person(c, SAILORS[0], 200, 152, { k: 'fs', flip: true }); plate(c, 40, 46, 'ポウハタン族の酋長', '#f8e8b0'); return { z: 1.06, fx: 170, fy: 104 }; }
    if (t > S.tSmith) { sea(c, t); for (let i = 0; i < 3; i++) ship(c, 80 + i * 70, 124 + (i % 2) * 6, 0.6, { t: t + i }); yearFlash(c, t, S.tSmith + 0.3, '1607', 216, 10, ''); plate(c, 40, 46, 'ジェームズタウン', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tAmong) { village(c, t, { fire: true, fireX: 262 }); for (let i = 0; i < 3; i++) person(c, NATIVES[i], 100 + i * 50, 152, { k: 'fn' + i }); for (let i = 0; i < 2; i++) person(c, COLONISTS[i], 125 + i * 50, 152, { k: 'fc' + i, flip: true }); if (t > at(S, 'L31', 6) - 0.3) plate(c, 40, 46, '確かな証拠は、まだない', '#f8c8c8'); return { z: 1.06, fx: 160, fy: 104 }; }
    R(c, 0, 0, W, H, '#14141c'); carvedPost(c, 145, 40, 'CROATOAN', { glow: 0.1 }); TX(c, '？', 230, 60, '#c8c8e0', 16, null);
    return { z: 1.04, fx: 160, fy: 96 };
  }
};

/* ---- PG: the evidence — 1998, a gold signet ring at the Croatoan site, a lion crest, Kendall; tree rings: the worst drought in 800 years (the researcher's words); DNA; the play since 1937; the word on the post (moves: digging, the ring's shine, rings counting, the stage lights) ---- */
const PG = withCuts({
  name: '指輪と年輪', ch: '残された手がかり', bgm: 'memory',
  init(S) { S.tRing = at(S, 'L36', 0) - 0.3; S.tTree = at(S, 'L37', 0) - 0.3; S.tDNA = at(S, 'L38', 0) - 0.3; S.tPlay = at(S, 'L39', 0) - 0.3; S.tPost = at(S, 'L40', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPost) { R(c, 0, 0, W, H, '#0c0c14'); carvedPost(c, 145, 40, 'CROATOAN', { glow: 0.2 + 0.1 * Math.sin(t * 2) }); dim(c, 0.2 * sg(t, at(S, 'L40', 2), at(S, 'L40', 2) + 4)); return { z: 1.04 + 0.04 * sg(t, S.tPost, S.dur), fx: 160, fy: 96 }; }
    if (t > S.tPlay) { R(c, 0, 0, W, H, '#1c0c14'); R(c, 40, 30, 240, 100, '#3c1c2c'); R(c, 40, 30, 240, 8, '#8c1c2c'); for (let i = 0; i < 4; i++) person(c, COLONISTS[i], 80 + i * 30, 130, { k: 'gp' + i, arm: i % 2 ? 'wave' : null }); glow(c, 160, 90, 100, 50, '#f8e8b0', 0.25); yearFlash(c, t, S.tPlay + 0.3, '1937', 216, 10, ''); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tDNA) { R(c, 0, 0, W, H, '#101820'); for (let i = 0; i < 20; i++) { const y = 40 + i * 5, a = t * 2 + i * 0.5; E(c, 160 + Math.sin(a) * 40, y, 3, 2, '#5c8cc8'); E(c, 160 - Math.sin(a) * 40, y, 3, 2, '#c85c8c'); if (i % 2) L(c, 160 + Math.sin(a) * 40, y, 160 - Math.sin(a) * 40, y, '#3c4c5c'); } plate(c, 40, 46, 'DNA', '#a8f8f0'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tTree) { R(c, 0, 0, W, H, '#1c1810'); treeRings(c, 180, 90, 54, t, t > at(S, 'L37', 3) - 0.3); plate(c, 40, 46, '樹齢800年', '#f8e8b0'); if (t > at(S, 'L37', 3) - 0.3) plate(c, 160, 130 - 4, '最悪の干ばつ', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tRing) { R(c, 0, 0, W, H, '#2c241c'); ring(c, 160, 90, 3); c.save(); c.globalAlpha = 0.4 + 0.3 * Math.sin(t * 4); glow(c, 160, 90, 40, 40, '#f8e070', 0.4); c.restore(); if (t > at(S, 'L36', 2) - 0.3) plate(c, 40, 46, 'ケンドール', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 90 }; }
    island(c, t, { fort: false }); for (let i = 0; i < 2; i++) person(c, SCIENTISTS[i], 120 + i * 60, 152, { k: 'gd' + i, arm: Math.floor(t * 3 + i) % 2 ? 'up' : null }); ER(c, 150, 150, 30, 6, '#5c4c34'); if (t > at(S, 'L35', 2) - 0.3) ring(c, 150, 136, 0.8); yearFlash(c, t, 0.4, '1998', 216, 10, '発掘');
    return { z: 1.06, fx: 160, fy: 104 };
  }
}, [['R1', KC]]);
const PM = {
  name: '鎮魂', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { island(c, t, { night: true, ruined: true }); for (let i = 0; i < 30; i++) P(c, (i * 67) % W, (i * 29) % 60, '#8c8cac'); carvedPost(c, 230, 50, '', {}); dim(c, 0.25 * sg(t, 2, 14)); return { z: 1.04, fx: 160, fy: 100 }; }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '空っぽの島', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { island(c, t, { ruined: true }); person(c, WHITE, 150, 152, { k: 's1', expr: 'shock' }); return { z: 1.1, fx: 160, fy: 104 }; } };
const SS2 = { name: '出航', ch: '', bgm: 'memory', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { sea(c, t); ship(c, lerp(150, 220, sg(t, 0, S.dur)), 128, 1, { t }); return { z: 1.04 + 0.06 * sg(t, 0, S.dur), fx: 170, fy: 104 }; } };
