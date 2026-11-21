/* ================= 都市伝説 #004 カシマさん: scenes ================= */
const KCLOSE = (c, t) => closeUp(c, t, kashimaFace({ blink: blinkOf(t, 7) }), { bg: ['#0c0a10', '#2c2434'], glow: '#5c4c7c', spk: 'kashima', mouthAt: [28, 31] });
const GCLOSE = (c, t) => closeUp(c, t, girlFace({ scared: true, blink: blinkOf(t, 3) }), { bg: ['#141420', '#3c3c54'], spk: 'shoujo' });
function chain(c, t, n, y = 156) { for (let i = 0; i < n; i++) { const st = i % 3 === 2 ? BOYS[i % 2] : GIRLS[i % 4]; kid(c, st, 30 + i * 48, y, { k: 'ch' + i, flip: i % 2 === 1 }); if (i < n - 1 && Math.floor(t * 2) % n === i) plate(c, 40 + i * 48, 96, 'ひそ', '#f8e8b0'); } }
function campRoom(c, t, o = {}) { R(c, 0, 0, W, H, '#1c1c28'); R(c, 0, 0, W, 36, '#2c2c38'); R(c, 0, 120, W, 70, '#3c3a2c'); for (let x = 0; x < W; x += 40) L(c, x, 120, x - 20, 190, '#2c2a20'); futon(c, 40, 128, 5); if (o.torch) { glow(c, o.torch, 120, 40, 30, '#f8e8a0', 0.3); } }

/* ---- KZ: cold open — midnight, the cold room, a woman at the foot of the futon, below the waist only dark; "足、いるか" (moves: the moonlight shifts, her hair sways, the dark swirls at her knees) ---- */
const KZ = withCuts({
  name: '足もとの女', ch: '真夜中', bgm: 'eerie',
  init(S) { S.tWake = at(S, 'C0', 1) - 0.3; S.tHer = at(S, 'C1', 0) - 0.3; S.tAsk = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    bedroom(c, t, {}); sleeper(c, 136, 128, { awake: t > S.tWake });
    if (t > S.tHer) { const a = sg(t, S.tHer, S.tHer + 2); kashima(c, 252, 160, { s: 1.9, a }); }
    for (let i = 0; i < 12; i++) { const u = fr(t * 0.2 + i / 12); P(c, 20 + (i * 53) % 280, 140 - u * 80, DA('#c8c8e8', 0.4 * (1 - u))); }
    if (t > S.tAsk) return { z: 1.1 + 0.15 * ss(sg(t, S.tAsk, S.dur)), fx: 230, fy: 104 };
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tHer)), fx: 180, fy: 110 };
  }
}, [['M1', KCLOSE], ['V0', KCLOSE]]);

/* ---- KA: the rule — whoever hears it, she visits within days; no one knows when it began; whispered at camp after lights-out; a child who can't sleep; the parent laughs (moves: the torch under the covers, the calendar days, the whisper) ---- */
const KA = {
  name: '恐ろしい決まり', ch: '恐ろしい決まり', bgm: 'dread',
  init(S) { S.tDays = at(S, 'L1b', 0) - 0.3; S.tSafe = at(S, 'L1c', 0) - 0.3; S.tWhen = at(S, 'L2', 0) - 0.3; S.tCamp = at(S, 'L2b', 1) - 0.3; S.tFun = at(S, 'L2c', 0) - 0.3; S.tLate = at(S, 'L3', 0) - 0.3; S.tAwake = at(S, 'L3b', 0) - 0.3; S.tLaugh = at(S, 'L3b', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLaugh) { R(c, 0, 0, W, H, '#e8dcc4'); R(c, 0, 120, W, 70, '#c8b88c'); person(c, PARENT, 200, 164, { k: 'lg', expr: 'smile', flip: true }); kid(c, PJ, 120, 164, { k: 'lk', expr: 'sad' }); if (Math.sin(t * 4) > 0) plate(c, 210, 70, 'ただの作り話よ', '#5c3c2c', '#f8f0e0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tAwake) { bedroom(c, t, {}); sleeper(c, 136, 128, { awake: true }); plate(c, 20, 40, '眠れない', '#c8d0f0'); return { z: 1.06, fx: 140, fy: 110 }; }
    if (t > S.tLate) { campRoom(c, t, { torch: 140 }); for (let i = 0; i < 5; i++) sleeper(c, 52 + i * 50, 124, { awake: true }); bigCap(c, '知ったら、もう遅い', 44, 32, '#f8c8c8', sg(t, S.tLate + 0.2, S.tLate + 0.8)); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tFun) { campRoom(c, t, { torch: 160 }); for (let i = 0; i < 5; i++) sleeper(c, 52 + i * 50, 124, { awake: true }); plate(c, 20, 40, 'とっておきの楽しみ', '#f8e8b0'); return { z: 1.05, fx: 160, fy: 110 }; }
    if (t > S.tCamp) { campRoom(c, t, { torch: 80 + Math.sin(t) * 40 }); for (let i = 0; i < 5; i++) sleeper(c, 52 + i * 50, 124, { awake: i < 3 }); plate(c, 20, 40, '消灯のあと', '#f8e8b0'); return { z: 1.04, fx: 140, fy: 110 }; }
    if (t > S.tWhen) { classroom(c, t); TX(c, 'いつから？', 120, 56, '#e8ecd8', 16, null); chain(c, t, 4); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#1c1c28'); const d = t > S.tDays ? Math.min(3, 1 + Math.floor(sg(t, S.tDays + 1, S.tSafe) * 3)) : 0;
    for (let i = 0; i < 3; i++) { const x = 60 + i * 80; R(c, x, 50, 60, 70, '#f4f0e8'); R(c, x, 50, 60, 16, i < d ? '#c81c2c' : '#5c5c6c'); TX(c, (i + 1) + '日目', x + 8, 76, '#2c2c2c', 16, null); }
    if (t > S.tSafe) plate(c, 70, 128, '知るだけでは、すまない', '#f8c8c8'); else if (t > S.tDays) plate(c, 70, 128, '数日のうちに、やって来る', '#f8c8c8');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- KB: what she is — no legs, no arms, half a face; a woman who lost her legs in a train accident long ago (the old train passes, never shown hitting); searching every night; where she appears: dream, phone, toilet, futon (moves: silhouettes fade in, the steam train, the receiver shakes) ---- */
const KB = {
  name: 'その姿', ch: 'その姿', bgm: 'dread',
  init(S) { S.tVar = at(S, 'L4b', 0) - 0.3; S.tCommon = at(S, 'L4c', 0) - 0.3; S.tTrain = at(S, 'L5', 0) - 0.3; S.tSearch = at(S, 'L5b', 0) - 0.3; S.tUnk = at(S, 'L5c', 0) - 0.3; S.tWhere = at(S, 'L6', 0) - 0.3; S.tPhone = at(S, 'L6b', 0) - 0.3; S.tToilet = at(S, 'L6b', 2) - 0.3; S.tAlone = at(S, 'L6c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tAlone) { bedroom(c, t, {}); sleeper(c, 136, 128, { awake: true }); dim(c, 0.3); bigCap(c, 'ひとりきりの時', 50, 32, '#c8c0d0', sg(t, S.tAlone + 0.2, S.tAlone + 0.8)); return { z: 1.04, fx: 140, fy: 110 }; }
    if (t > S.tToilet) { toilet(c, t, { dark: true, drip: true }); dim(c, 0.3); plate(c, 150, 128, '扉の下から……声', '#c8c0d0'); return { z: 1.05, fx: 220, fy: 110 }; }
    if (t > S.tPhone) { R(c, 0, 0, W, H, '#1c1820'); R(c, 0, 120, W, 70, '#2c2820'); R(c, 100, 104, 120, 20, '#5c4030'); phone(c, 140, 84, t, false); for (let i = 0; i < 30; i++) P(c, 120 + (i * 37) % 80, 50 + (i * 13 + Math.floor(t * 20)) % 30, '#8c8c9c'); plate(c, 20, 40, 'ざあざあ……　女の声', '#c8c0d0'); return { z: 1.06, fx: 160, fy: 100 }; }
    if (t > S.tWhere) { R(c, 0, 0, W, H, '#0c0c14'); const labels = ['夢の中', '夜中の電話', '真夜中のトイレ', '布団の足もと']; const n = Math.min(4, 1 + Math.floor(sg(t, S.tWhere, S.tPhone) * 4)); for (let i = 0; i < n; i++) { const x = 12 + (i % 2) * 152, y = 36 + Math.floor(i / 2) * 64; R(c, x, y, 144, 58, '#1c1c2c'); frame(c, x, y, 144, 58, '#8c8cac'); plate(c, x + 8, y + 18, labels[i], '#f8e8b0'); const ix = x + 118, iy = y + 30; if (i === 0) { E(c, ix, iy, 8, 8, '#e8ecf0'); E(c, ix + 4, iy - 3, 7, 7, '#1c1c2c'); } else if (i === 1) phone(c, ix - 18, iy - 8, t, true); else if (i === 2) { R(c, ix + 4, iy - 18, 12, 34, '#d8c8b8'); P(c, ix + 13, iy, '#5c5c5c'); } else { R(c, ix - 14, iy, 28, 10, '#c8c8d8'); E(c, ix - 10, iy, 4, 4, '#f0c8a8'); } } return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tUnk) { R(c, 0, 0, W, H, '#1c1c24'); for (let i = 0; i < 3; i++) TX(c, '?', 80 + i * 80, 70 + Math.sin(t * 2 + i) * 6, '#8c8cac', 16, null); TX(c, 'いつ？', 90, 110, '#c8c8d8', 16, null); TX(c, 'どこで？', 180, 110, '#c8c8d8', 16, null); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tSearch) { nightStation(c, t, { bench: false }); const u = fr(t * 0.08); kashima(c, lerp(40, 280, u), 150, { s: 1.6, flip: false }); plate(c, 20, 40, 'なくした足を、探して', '#c8c0d0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tTrain) { VG(c, 0, 0, W, 130, ['#3c3428', '#5c4c38', '#8c7454']); R(c, 0, 130, W, 60, '#3c3428'); R(c, 0, 150, W, 3, '#8c8c8c'); oldTrain(c, lerp(-220, 340, sg(t, S.tTrain, S.tSearch)), 152, { lit: true, smoke: t }); c.save(); c.globalAlpha = 0.35; c.fillStyle = '#8c6c3c'; c.fillRect(0, 0, W, H); c.restore(); plate(c, 20, 40, '昔の汽車の事故……', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#14141c'); const vs = [['足のない女', 0.2], ['腕のない女', 0.2], ['顔の半分がない女', 0.2]]; const n = t > S.tVar ? Math.min(3, 1 + Math.floor(sg(t, S.tVar, S.tCommon) * 3)) : 1;
    for (let i = 0; i < n && t < S.tCommon; i++) { kashima(c, 130 + i * 70, 160, { s: 1.5, fade: i === 0 ? 1 : 0.15, noArms: i === 1, half: i === 2 }); if (t < S.tCommon) plate(c, 8, 40 + i * 26, vs[i][0], '#c8c0d0'); }
    if (t > S.tCommon) dim(c, 0.55); if (t > S.tCommon) bigCap(c, '何かを、探している', 64, 32, '#f8c8c8', sg(t, S.tCommon, S.tCommon + 0.6));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- KC: the questions and the answers — "足、いるか" → 今、使っています; "この話、誰に聞いた" → カシマさん; the spell: 仮面のカ、死人のシ、悪魔のマ; children chanting; a slip in a pencil case (moves: plates flip in, mouths move, the slip folds) ---- */
const KC = withCuts({
  name: '質問と答え', ch: '質問と答え', bgm: 'pulse',
  init(S) { S.tWrong = at(S, 'L7b', 0) - 0.3; S.tAns = at(S, 'L8', 0) - 0.3; S.tMore = at(S, 'L8b', 0) - 0.3; S.tName = at(S, 'L9', 0) - 0.3; S.tSpell = at(S, 'L9b', 1) - 0.3; S.tChant = at(S, 'L9c', 0) - 0.3; S.tSlip = at(S, 'L9d', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSlip) { R(c, 0, 0, W, H, '#c8b494'); R(c, 60, 70, 200, 50, '#3c6c9c'); R(c, 64, 74, 192, 42, '#5c8cc8'); for (let i = 0; i < 3; i++) R(c, 80 + i * 30, 80, 6, 30, ['#c83c3c', '#3c9c5c', '#f8c83c'][i]); const k = sg(t, S.tSlip + 0.3, S.tSlip + 1.5); R(c, 120, 78 - 34 * k, 140, 30, '#f4f0e8'); TX(c, '今、使っています', 132, 84 - 34 * k, '#2c2c2c', 16, null); R(c, 60, 116, 200, 3, '#c8c8d0'); plate(c, 20, 122, '筆箱の奥に', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tChant) { classroom(c, t); for (let i = 0; i < 4; i++) kid(c, i === 3 ? BOYS[0] : GIRLS[i], 60 + i * 66, 156, { k: 'cn' + i, flip: i % 2 === 1, f: Math.floor(t * 3 + i) & 1 ? 0 : -1 }); TX(c, 'カは、仮面のカ', 100, 50, '#e8ecd8', 16, null); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tSpell) { R(c, 0, 0, W, H, '#1c1820'); const items = [['カ', '仮面のカ', 'mask'], ['シ', '死人のシ', 'skull'], ['マ', '悪魔のマ', 'devil']]; items.forEach(([b, s, ic], i) => { const k = sg(t, S.tSpell + i * 1.1, S.tSpell + i * 1.1 + 0.4); if (k > 0) spellPlate(c, 22 + i * 96, 60, b, s, ic, k); }); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tName) { R(c, 0, 0, W, H, '#1c1820'); plate(c, 40, 50, 'この話、誰から？', '#c8c0d0'); if (t > at(S, 'L9', 2) - 0.3) plate(c, 120, 100, '――カシマさん', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tMore) { R(c, 0, 0, W, H, '#14141c'); kashima(c, 220, 156, { s: 2.1 }); plate(c, 20, 40, '質問は、まだ続く', '#c8c0d0'); return { z: 1.04, fx: 200, fy: 100 }; }
    if (t > S.tAns) { R(c, 0, 0, W, H, '#1c1820'); plate(c, 40, 50, '足、いるか？', '#c8c0d0'); bigCap(c, '今、使っています', 100, 32, '#f8e8b0', sg(t, at(S, 'L8', 1) - 0.3, at(S, 'L8', 1) + 0.3)); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tWrong) { R(c, 0, 0, W, H, '#0c0608'); glow(c, 160, 100, 120, 60, '#5c0c14', 0.3); bigCap(c, '間違えると……', 60, 32, '#f8c8c8', sg(t, S.tWrong + 0.2, S.tWrong + 0.8)); return { z: 1.04 + 0.04 * ss(sg(t, S.tWrong, S.tAns)), fx: 160, fy: 90 }; }
    R(c, 0, 0, W, H, '#14141c'); kashima(c, 220, 156, { s: 2.1 }); plate(c, 20, 40, '決まって、質問をする', '#c8c0d0');
    return { z: 1.04, fx: 180, fy: 100 };
  }
}, [['V1', KCLOSE], ['V2', KCLOSE]]);

/* ---- KD: the story — the camp night; chanting at bedtime; the third night; the dream station; the woman on the bench, the hem with nothing below; frozen feet; "足、いるか"; "今、使っています"; the spell; lamps go out one by one (moves: the days flip, the wind, the lamps die) ---- */
const KD = withCuts({
  name: '3日目の夜', ch: '3日目の夜', bgm: 'dread',
  init(S) { S.tCamp = at(S, 'L10b', 0) - 0.3; S.tHome = at(S, 'L11', 0) - 0.3; S.tDay3 = at(S, 'L12', 0) - 0.3; S.tDream = at(S, 'L12b', 0) - 0.3; S.tRail = at(S, 'L12c', 0) - 0.3; S.tBench = at(S, 'L13', 0) - 0.3; S.tNone = at(S, 'L13b', 0) - 0.3; S.tStuck = at(S, 'L13c', 0) - 0.3; S.tLook = at(S, 'L14', 0) - 0.3; S.tSpell = at(S, 'L15', 0) - 0.3; S.tOut = at(S, 'L15b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tOut) { const lit = Math.max(0, 4 - Math.floor(sg(t, S.tOut, S.tOut + 4) * 5)); nightStation(c, t, { lit }); dim(c, 0.5 - lit * 0.1); kashima(c, 186, 126, { s: 1.3, a: 1 - sg(t, S.tOut + 3, S.tOut + 5) }); kid(c, PJ, 90, 146, { k: 'ot', expr: 'shock' }); return { z: 1.04, fx: 150, fy: 110 }; }
    if (t > S.tSpell) { nightStation(c, t, {}); kashima(c, 186, 126, { s: 1.3 }); kid(c, PJ, 90, 146, { k: 'sp', expr: 'shock', f: Math.floor(t * 3) & 1 ? 0 : -1 }); const items = ['仮面のカ', '死人のシ', '悪魔のマ']; for (let i = 0; i < 3; i++) if (t > at(S, 'L15', 2 + i) - 0.3) plate(c, 12, 40 + i * 26, items[i], '#f8e8b0'); return { z: 1.04, fx: 150, fy: 110 }; }
    if (t > S.tLook) { nightStation(c, t, {}); kashima(c, 186, 126, { s: 1.3 }); kid(c, PJ, 90, 146, { k: 'lk', expr: 'shock' }); return { z: 1.1 + 0.1 * ss(sg(t, S.tLook, S.tLook + 3)), fx: 180, fy: 96 }; }
    if (t > S.tStuck) { nightStation(c, t, {}); kashima(c, 186, 126, { s: 1.3 }); kid(c, PJ, 90, 146, { k: 'st', expr: 'shock', f: Math.floor(t * 8) & 3 }); plate(c, 20, 40, '足が、動かない', '#c8d0f0'); return { z: 1.04, fx: 120, fy: 120, sx: Math.round(Math.sin(t * 30) * 0.5) }; }
    if (t > S.tNone) { nightStation(c, t, {}); kashima(c, 186, 126, { s: 1.3, fade: 1 }); glow(c, 180, 104, 30, 14, '#3c3448', 0.4); return { z: 1.2 + 0.1 * ss(sg(t, S.tNone, S.tStuck)), fx: 186, fy: 104 }; }
    if (t > S.tBench) { nightStation(c, t, {}); kashima(c, 186, 126, { s: 1.3, fade: 0.6 }); kid(c, PJ, 60, 146, { k: 'bn' }); return { z: 1.06 + 0.06 * ss(sg(t, S.tBench, S.tNone)), fx: 170, fy: 100 }; }
    if (t > S.tRail) { VG(c, 0, 0, W, H, ['#06060e', '#0c0c1c', '#1c1814']); PF(c, [150, 70, 170, 70, 320, 190, 0, 190], '#2c2620'); for (let i = 0; i < 12; i++) { const u = i / 12, y = 70 + u * u * 120, hw = 10 + u * u * 150; R(c, 160 - hw, y, hw * 2, 2, '#4c4030'); } L(c, 156, 70, 60, 190, '#8c8c94', 2); L(c, 164, 70, 260, 190, '#8c8c94', 2); glow(c, 160, 70, 30, 14, '#1c1c3c', 0.5); if (Math.sin(t * 6) > 0) glow(c, 230, 90, 8, 8, '#ff3030', 0.7); return { z: 1.03 + 0.05 * ss(sg(t, S.tRail, S.tBench)), fx: 160, fy: 100 }; }
    if (t > S.tDream) { nightStation(c, t, { bench: false }); kid(c, PJ, lerp(20, 140, sg(t, S.tDream, S.tRail)), 150, { k: 'dr', f: Math.floor(t * 4) & 3 }); c.save(); c.globalAlpha = 0.25; c.fillStyle = '#5c5c8c'; c.fillRect(0, 0, W, H); c.restore(); if (!SHORT) plate(c, 20, 40, '夢の中の、夜の駅', '#c8d0f0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tDay3) { bedroom(c, t, {}); sleeper(c, 136, 128, {}); R(c, 200, 40, 50, 56, '#f4f0e8'); R(c, 200, 40, 50, 14, '#c81c2c'); TX(c, '3日目', 204, 64, '#2c2c2c', 16, null); return { z: 1.05, fx: 200, fy: 90 }; }
    if (t > S.tHome) { bedroom(c, t, {}); sleeper(c, 136, 128, { awake: true }); plate(c, 20, 40, '毎晩、答えを唱える', '#c8d0f0'); return { z: 1.04, fx: 140, fy: 110 }; }
    if (t > S.tCamp) { campRoom(c, t, { torch: 160 }); for (let i = 0; i < 5; i++) sleeper(c, 52 + i * 50, 124, { awake: true }); plate(c, 20, 40, '林間学校の夜', '#f8e8b0'); return { z: 1.04, fx: 150, fy: 110 }; }
    R(c, 0, 0, W, H, '#1c1c28'); bigCap(c, 'たとえば', 60, 32, '#f8e8b0', sg(t, 0.3, 0.9)); kid(c, MIKA, 160, 156, { k: 'tf' });
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V3', KCLOSE], ['K1', GCLOSE]]);

/* ---- KE: morning — sunlight; she checks her feet (two); "saved" — then on the floor: wet handprints from the window to the foot of the bed; she tells a friend the same day (moves: the light, the prints appear one by one, the whisper) ---- */
const KE = {
  name: '手の跡', ch: '朝', bgm: 'memory',
  init(S) { S.tFeet = at(S, 'L16c', 0) - 0.3; S.tSaved = at(S, 'L16b', 0) - 0.3; S.tMark = at(S, 'L17', 0) - 0.3; S.tHands = at(S, 'L17b', 0) - 0.3; S.tCrawl = at(S, 'L17c', 0) - 0.3; S.tTell = at(S, 'L17d', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTell) { classroom(c, t); kid(c, MIKA, 130, 156, { k: 'tl', arm: 'fwd' }); kid(c, GIRLS[1], 190, 156, { k: 'tl2', flip: true, expr: 'shock' }); plate(c, 120, 70, 'ひそ……', '#f8e8b0'); return { z: 1.05, fx: 160, fy: 110 }; }
    bedroom(c, t, { morning: true });
    if (t > S.tHands) { R(c, 0, 0, W, H, '#c8b88c'); for (let x = 0; x < W; x += 40) L(c, x, 0, x - 20, 190, '#a8986c'); const n = Math.floor(sg(t, S.tHands, S.tCrawl) * 9); for (let i = 0; i < 9; i++) { if (i > n) break; const u = i / 8; handprint(c, lerp(40, 270, u) + (i & 1) * 8, 140 - (i & 1) * 18 - u * 10, 1.6, 0.8, '#6c7c8c'); } if (t > S.tCrawl) plate(c, 20, 40, '両手だけで、這ってきた', '#5c3c2c', '#f8f0e0'); return { z: 1.04, fx: 160, fy: 120 }; }
    if (t > S.tMark) { kid(c, PJ, 96, 164, { k: 'mk', expr: 'shock' }); for (let i = 0; i < 3; i++) handprint(c, 180 + i * 26, 160 - (i & 1) * 6, 1.4, 0.7, '#6c7c8c'); return { z: 1.1, fx: 180, fy: 140 }; }
    if (t > S.tSaved) { kid(c, PJ, 96, 164, { k: 'sv', expr: 'smile' }); plate(c, 20, 40, '助かった', '#5c3c2c', '#f8f0e0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tFeet) { sleeper(c, 136, 128, { awake: true }); R(c, 190, 128, 40, 14, '#a8b8d8'); plate(c, 20, 40, '足は、ちゃんとふたつ', '#5c3c2c', '#f8f0e0'); return { z: 1.06, fx: 180, fy: 130 }; }
    sleeper(c, 136, 128, { awake: t > 1.5 });
    return { z: 1.03, fx: 140, fy: 110 };
  }
};

/* ---- KF: the turning point — tell someone and you're saved; the fear passes on; the rumour carries its own rule to spread; class to class, school to school (moves: the chain grows, dots spread on the map) ---- */
const KF = {
  name: '話せば助かる', ch: 'もうひとつの仕組み', bgm: 'pulse',
  init(S) { S.tTell = at(S, 'L19', 0) - 0.3; S.tCall = at(S, 'L19c', 0) - 0.3; S.tPass = at(S, 'L19b', 0) - 0.3; S.tRule = at(S, 'L20', 0) - 0.3; S.tFar = at(S, 'L20b', 0) - 0.3; S.tShare = at(S, 'L20c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tShare) { classroom(c, t); for (let i = 0; i < 3; i++) kid(c, GIRLS[i], 100 + i * 50, 156, { k: 'sh' + i, expr: 'smile', flip: i === 2 }); plate(c, 60, 70, '怖さを、少し分ける', '#e8ecd8', '#2c4c3c'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tFar) { R(c, 0, 0, W, H, '#1c2c3c'); const n = Math.floor(sg(t, S.tFar, S.tShare) * 30); for (let i = 0; i < n; i++) { const x = 160 + Math.cos(i * 2.39) * i * 4.2, y = 96 + Math.sin(i * 2.39) * i * 2.4; R(c, x - 3, y - 3, 7, 6, '#c8c0b0'); R(c, x - 3, y - 5, 7, 2, '#c81c2c'); } plate(c, 20, 40, '学校から、学校へ', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tRule) { R(c, 0, 0, W, H, '#0c0c14'); bigCap(c, '自分を広める決まり', 60, 32, '#f8c8c8', sg(t, S.tRule + 0.2, S.tRule + 0.8)); for (let i = 0; i < 6; i++) { const a = t * 0.8 + i * TAU / 6; E(c, 160 + Math.cos(a) * 60, 126 + Math.sin(a) * 12, 3, 3, '#c8c0d0'); } return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tPass) { corridor(c, t, { dark: true }); chain(c, t, 6); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tCall) { R(c, 0, 0, W, H, '#1c1c28'); R(c, 0, 120, W, 70, '#2c2820'); R(c, 100, 104, 120, 20, '#5c4030'); phone(c, 140, 84, t, true); kid(c, PJ, 90, 164, { k: 'cl', expr: 'shock' }); plate(c, 20, 40, '夜中の電話で', '#c8d0f0'); return { z: 1.05, fx: 140, fy: 110 }; }
    if (t > S.tTell) { classroom(c, t); kid(c, GIRLS[2], 130, 156, { k: 'tt', arm: 'fwd' }); kid(c, BOYS[0], 190, 156, { k: 'tt2', flip: true, expr: 'shock' }); plate(c, 60, 70, '話せば、助かる', '#e8ecd8', '#2c4c3c'); return { z: 1.04, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#14141c'); bigCap(c, 'ところが', 60, 32, '#f8e8b0', sg(t, 0.4, 1));
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tTell)), fx: 160, fy: 100 };
  }
};

/* ---- KG: who is she? — a surname; the spell's initials; tied to sad wartime stories; nobody can check; answers differ school to school (moves: plates swap, sepia flicker, chalk counts) ---- */
const KG = {
  name: '名前の由来', ch: 'カシマさんとは', bgm: 'memory',
  init(S) { S.tName = at(S, 'L21b', 0) - 0.3; S.tInit = at(S, 'L21b', 1) - 0.3; S.tWar = at(S, 'L22', 0) - 0.3; S.tNone = at(S, 'L22b', 0) - 0.3; S.tVar = at(S, 'L22c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tVar) { classroom(c, t); TX(c, '3回となえる', 70, 50, '#e8ecd8', 16, null); TX(c, '順番どおりに', 70, 76, '#e8ecd8', 16, null); for (let i = 0; i < 3; i++) kid(c, GIRLS[i + 1], 120 + i * 60, 156, { k: 'vr' + i, flip: i === 1 }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNone) { R(c, 0, 0, W, H, '#1c1c24'); for (let i = 0; i < 3; i++) TX(c, '?', 70 + i * 90, 90 + Math.sin(t * 2 + i) * 6, '#8c8cac', 16, null); plate(c, 60, 130, '確かめようのない話', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tWar) { VG(c, 0, 0, W, 130, ['#3c3428', '#5c4c38', '#7c6448']); R(c, 0, 130, W, 60, '#3c3428'); oldTrain(c, 60, 150, { smoke: t }); c.save(); c.globalAlpha = 0.35; c.fillStyle = '#8c6c3c'; c.fillRect(0, 0, W, H); c.restore(); plate(c, 20, 40, '戦争の頃の、悲しい出来事？', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#1c1820'); if (t > S.tInit) { ['mask', 'skull', 'devil'].forEach((ic, i) => spellPlate(c, 22 + i * 96, 60, ['カ', 'シ', 'マ'][i], ['仮面', '死人', '悪魔'][i], ic)); } else if (t > S.tName) { R(c, 110, 50, 100, 70, '#f0e8d0'); TX(c, '○○', 140, 64, '#2c2c2c', 16, null); TX(c, '名字？', 132, 92, '#8c1c1c', 16, null); } else { bigCap(c, 'カシマさんとは', 60, 32, '#f8e8b0', sg(t, 0.3, 0.9)); }
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- KH: why so feared — Kuchisake-onna met you on the road at dusk; Kashima-san comes to you, into your futon; the one way out: remember the answer (moves: dusk to night, eyes close, the answer glows) ---- */
const KH = {
  name: 'なぜ怖いのか', ch: 'なぜ怖いのか', bgm: 'dread',
  init(S) { S.tKuchi = at(S, 'L24', 0) - 0.3; S.tNoBlood = at(S, 'L23b', 0) - 0.3; S.tYou = at(S, 'L24b', 0) - 0.3; S.tEyes = at(S, 'L24c', 0) - 0.3; S.tOne = at(S, 'L25', 0) - 0.3; S.tCope = at(S, 'L25b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCope) { campRoom(c, t, { torch: 160 }); for (let i = 0; i < 5; i++) sleeper(c, 52 + i * 50, 124, { awake: true }); TX(c, '今、使っています', 100, 70, '#f8e8b0', 16, null); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tOne) { R(c, 0, 0, W, H, '#0c0c14'); glow(c, 160, 100, 100, 40, '#f8e8b0', 0.2 + 0.1 * Math.sin(t * 2)); bigCap(c, '正しい答え', 60, 32, '#f8e8b0', sg(t, S.tOne + 0.2, S.tOne + 0.8)); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tEyes) { bedroom(c, t, {}); sleeper(c, 136, 128, {}); dim(c, sg(t, S.tEyes, S.tOne) * 0.5); return { z: 1.06 + 0.1 * ss(sg(t, S.tEyes, S.tOne)), fx: 136, fy: 128 }; }
    if (t > S.tYou) { bedroom(c, t, {}); sleeper(c, 136, 128, { awake: true }); kashima(c, 252, 160, { s: 1.9, a: 0.5 + 0.2 * Math.sin(t) }); plate(c, 20, 40, '逃げる場所は、ない', '#c8c0d0'); return { z: 1.04, fx: 180, fy: 110 }; }
    if (t > S.tNoBlood && t < S.tKuchi) { campRoom(c, t, { torch: 140 }); for (let i = 0; i < 5; i++) sleeper(c, 52 + i * 50, 124, { awake: true }); plate(c, 20, 40, '血も刃物も、ほとんど出てこない', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tKuchi) { duskSky(c, {}); R(c, 0, 130, W, 60, '#5c4c44'); for (let i = 0; i < 4; i++) R(c, 30 + i * 80, 60, 3, 70, '#3c3430'); kid(c, BOYS[1], 140, 156, { k: 'ku', f: Math.floor(t * 4) & 3 }); plate(c, 20, 40, '口裂け女は、夕暮れの道', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#14141c'); bigCap(c, 'なぜ、怖いのか', 60, 32, '#f8e8b0', sg(t, 0.3, 0.9));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- KI: ending — you have heard it all; do you remember the answer?; the foot of your futon; "足、いるか" (moves: the moon, a shape slowly appears) ---- */
const KI = withCuts({
  name: 'あなたの部屋', ch: 'おわりに', bgm: 'requiem',
  init(S) { S.tFoot = at(S, 'L26c', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    bedroom(c, t, {}); sleeper(c, 136, 128, { awake: true }); if (t > S.tFoot) kashima(c, 252, 160, { s: 1.9, a: sg(t, S.tFoot, S.tFoot + 3) });
    return { z: 1.04 + 0.06 * ss(sg(t, 0, 12)), fx: 200, fy: 108 };
  }
}, [['V4', KCLOSE]]);

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '聞いた人のところへ', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { bedroom(c, t, {}); sleeper(c, 136, 128, { awake: true }); kashima(c, 252, 160, { s: 1.9 }); return { z: 1.08 + 0.04 * ss(sg(t, 0, S.dur)), fx: 200, fy: 108 }; } };
const SS2 = { name: 'あなたも', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { bedroom(c, t, {}); sleeper(c, 136, 128, { awake: true }); kashima(c, 252, 160, { s: 1.9, a: sg(t, 0.3, S.dur) }); return { z: 1.04 + 0.04 * ss(sg(t, 0, S.dur)), fx: 200, fy: 108 }; } };
