/* ================= 記録 #020 帝銀事件: scenes ================= */
const HN = (c, t) => closeUp(c, t, hanninFace({ blink: blinkOf(t, 5) }), { bg: ['#140c08', '#4c3424'], spk: 'hannin' });
const HR = (c, t) => closeUp(c, t, hirasawaFace({ blink: blinkOf(t, 4) }), { bg: ['#141418', '#3c3c4c'], spk: 'hirasawa' });
const HRS = (c, t) => closeUp(c, t, hirasawaFace({ blink: blinkOf(t, 7), old: true, sad: true }), { bg: ['#0c0c10', '#2c2c34'], talk: false, s: 3.1 });
const DR = (c, t) => closeUp(c, t, dairiFace({ blink: blinkOf(t, 3) }), { bg: ['#14141c', '#3c3c4c'], spk: 'dairi' });
const KO = (c, t) => closeUp(c, t, koinFace({ blink: blinkOf(t, 6) }), { bg: ['#14141c', '#3c4c5c'], spk: 'koin' });
const EG = (c, t) => closeUp(c, t, eriguchiFace({ blink: blinkOf(t, 5) }), { bg: ['#1c140c', '#4c3824'], spk: 'eriguchi' });
const MU = (c, t) => closeUp(c, t, musumeFace({ blink: blinkOf(t, 5) }), { bg: ['#14101c', '#3c2c3c'], spk: 'musume' });
// the sixteen at the counter (clerks and the caretaker's family); k: 0 standing .. 1 all fallen; lift: cups raised
function sixteen(c, t, x0, y, o = {}) {
  const cast = [...CLERKS, ...CLERKS.slice(0, 4).map((st, i) => Object.assign({}, st, { id: 'c2' + i })), DAIRI, KOIN, FATHER, MOTHER, BOY, Object.assign({}, KOIN, { id: 'gl2', coat: '#8c5c6c' })].slice(0, 16);
  for (let i = 0; i < 16; i++) {
    const row = i < 8 ? 0 : 1, x = x0 + (i % 8) * 26 + row * 13, yy = y - row * 12, fall = o.k != null && hash(i * 7) < o.k;
    if (fall) person(c, cast[i], x, yy + 4, { k: 'f' + i, rot: (i % 2 ? 1.45 : -1.45), blink: 2 });
    else person(c, cast[i], x, yy, { k: 's' + i + (o.lift ? 'l' : ''), arm: o.lift ? 'wave' : null, expr: o.sick ? 'sad' : 'normal', blink: blinkOf(t + i, 3 + (i % 4)) });
  }
}

/* ---- TZ: cold open — closing time, sixteen raise their cups at once; minutes later they lie on the floor; the man is gone (moves: the cups rise, people fall one by one, the empty doorway) ---- */
const TZ = withCuts({
  name: '閉店後の銀行', ch: '閉店後の銀行', bgm: 'dread',
  init(S) { S.tFall = at(S, 'C1', 0) - 0.3; S.tGone = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tGone) { bankFront(c, t, { dusk: true }); R(c, 140, 76, 40, 44, '#0c0c0c'); for (let i = 0; i < 6; i++) { const u = fr(t * 0.6 + i / 6); P(c, u * 340 - 10, 130 + i * 6, '#c8c8c0'); } return { z: 1.12, fx: 160, fy: 100 }; }
    if (t > S.tFall) { bankInside(c, t, { dark: 0.45, clock: 15, min: 30 }); sixteen(c, t, 50, 150, { k: sg(t, S.tFall, S.tFall + 3) }); plate(c, 110, 50, '死者　12人', '#f8a0a0'); return { z: 1.08, fx: 160, fy: 120 }; }
    bankInside(c, t, { clock: 15, min: 20 }); sixteen(c, t, 50, 150, { lift: t > 1.5 }); teacups(c, 30, 90, 4, { fill: true });
    return { z: 1.06 + 0.06 * sg(t, 0, S.tFall), fx: 160, fy: 118 };
  }
}, [['V0', HN]]);

/* ---- TA: 1948 — three years after the war, under occupation; no sewers, epidemics feared (moves: chimney smoke, a jeep passes, people walk) ---- */
const TA = {
  name: '占領下の東京', ch: '1948年の東京', bgm: 'eerie',
  init(S) { S.tFear = at(S, 'L2', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    postwar(c, t); for (let i = 0; i < 3; i++) { const u = fr(t * 0.08 + i / 3); person(c, [FATHER, MOTHER, DETS[0]][i], lerp(-20, 340, u), 160, { k: 'pw' + i, f: Math.floor(t * 4 + i) % 4, flip: false }); }
    yearFlash(c, t, 0.4, '1948', 216, 10, '昭和23年');
    if (t > S.tFear) { plate(c, 40, 56, '伝染病への恐れ', '#f8e8b0'); for (let i = 0; i < 6; i++) { const a = t * 2 + i; P(c, 90 + Math.cos(a) * 30 + i * 20, 96 + Math.sin(a * 1.3) * 8, '#141414'); } }
    return { z: 1.04, fx: 160, fy: 110 };
  }
};

/* ---- TB: the visitor — 3 p.m., the Shiina-machi branch; a white armband; a card: Ministry of Health; "a case of dysentery nearby" (moves: he walks in, the card slides across, the armband) ---- */
const TB = withCuts({
  name: '白い腕章', ch: '白い腕章の男', bgm: 'pulse',
  init(S) { S.tIn = at(S, 'L3', 2) - 0.3; S.tCard = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCard) { bankInside(c, t, { clock: 15, min: 10 }); person(c, HANNIN, 120, 150, { k: 'cb', arm: 'wave', blink: blinkOf(t, 5) }); person(c, DAIRI, 210, 150, { k: 'cd', flip: true, blink: blinkOf(t, 3) }); const k = sg(t, S.tCard + 1.2, S.tCard + 2); R(c, lerp(126, 162, k), 84, 54, 20, '#f4f0e8'); TX(c, '厚生省', lerp(130, 166, k), 85, '#2c2c2c', 16, null); plate(c, 40, 50, '厚生省技官の名刺', '#f8e8b0'); return { z: 1.12, fx: 160, fy: 112 }; }
    bankFront(c, t); yearFlash(c, t, 0.4, '1.26', 216, 10, '午後3時'); person(c, HANNIN, t > S.tIn ? 160 : lerp(20, 160, sg(t, 0.5, S.tIn)), 150, { k: 'wb', f: t > S.tIn ? -1 : Math.floor(t * 4) % 4 });
    return { z: 1.06, fx: 160, fy: 108 };
  }
}, [['H2', HN]]);

/* ---- TC: the gathering — sixteen called together, the youngest eight; he drinks first; "舌を出して飲むように" (moves: people gather, he lifts his own cup with the pipette) ---- */
const TC = withCuts({
  name: '予防薬', ch: '予防薬', bgm: 'pulse',
  init(S) { S.tFirst = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    bankInside(c, t, { clock: 15, min: 15 });
    if (t > S.tFirst) { sixteen(c, t, 6, 150, {}); person(c, HANNIN, 262, 150, { k: 'dk', arm: 'wave', blink: blinkOf(t, 5), flip: true }); pipette(c, 286, 104); teacups(c, 226, 90, 3, { fill: true }); plate(c, 40, 50, 'まず、自分が飲んでみせた', '#f8e8b0'); return { z: 1.14, fx: 160, fy: 116 }; }
    sixteen(c, t, 50, 150, {}); person(c, HANNIN, 270, 150, { k: 'gt', flip: true, arm: 'wave' }); teacups(c, 200, 90, 8);
    plate(c, 40, 50, '16人', '#f8e8b0');
    return { z: 1.06, fx: 160, fy: 116 };
  }
}, [['H3', HN]]);
const TH0 = { name: '素顔', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, hanninFace({ dark: true, blink: 0 }), [[18, 20], [29, 20]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- TD: the two doses — chest burning like whisky; the second dose, gulped; "let us rinse our mouths"; the water, collapse (moves: cups up, figures sway, then fall one by one at the sink) ---- */
const TD = {
  name: '第2薬', ch: '第1薬と第2薬', bgm: 'dread',
  init(S) { S.tSecond = at(S, 'L8', 0) - 0.3; S.tSink = at(S, 'L9', 2) - 0.3; S.tFall = at(S, 'L9', 4) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSink) { bankInside(c, t, { clock: 15, min: 25, dark: 0.15 + 0.4 * sg(t, S.tFall, S.dur) }); R(c, 20, 100, 60, 22, '#a8a8a8'); R(c, 20, 98, 60, 3, '#c8c8c8'); R(c, 46, 84, 3, 14, '#8c8c8c'); for (let i = 0; i < 4; i++) P(c, 47, 100 + fr(t * 3 + i / 4) * 10, '#88c8f8'); sixteen(c, t, 80, 150, { k: sg(t, S.tFall, S.dur), sick: true }); return { z: 1.08, fx: 150, fy: 118 }; }
    const sway = t > S.tSecond; if (sway) { R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 100, 90, 60, '#f8e8b0', 0.15); R(c, 120, 86, 80, 50, '#f0ece0'); R(c, 120, 86, 80, 6, '#c8c4b8'); R(c, 126, 96, 68, 8, '#c8b890'); for (let i = 0; i < 4; i++) { const u = fr(t * 0.8 + i / 4); P(c, 160, 70 + u * 20, '#c8d8b0'); } L(c, 160, 44, 160, 68, '#d8e0e8', 3); E(c, 160, 42, 4, 5, '#a8483c'); for (let i = 0; i < 6; i++) person(c, CLERKS[i], 20 + i * 50, 172, { k: 'gd' + i, arm: 'wave', expr: 'sad' }); plate(c, 40, 46, '約1分後　第2薬', '#f8c8a0'); return { z: 1.0, fx: 160, fy: 104 }; }
    bankInside(c, t, { clock: 15, min: 22 }); sixteen(c, t, 50, 150, { lift: true, sick: sway });
    if (!sway) { glow(c, 160, 110, 120, 30, '#f86c2c', 0.12 + 0.08 * Math.sin(t * 4)); plate(c, 40, 50, '第1薬　胸が焼ける', '#f8c8a0'); } else plate(c, 40, 50, '約1分後　第2薬', '#f8c8a0');
    return { z: 1.1 + 0.04 * Math.sin(t * 3), fx: 160, fy: 116 };
  }
};

/* ---- TE: discovery — a clerk staggers outside; the patrolman; neighbours wander in; twelve dead, a whole family (moves: she staggers, the lantern, the crowd, twelve flowers appear) ---- */
const TE = {
  name: '発覚', ch: '発覚', bgm: 'requiem',
  init(S) { S.tCop = at(S, 'L11', 0) - 0.3; S.tDead = at(S, 'L12', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDead) { R(c, 0, 0, W, H, '#0c0c10'); for (let i = 0; i < 16; i++) { const x = 40 + (i % 8) * 32, y = 70 + Math.floor(i / 8) * 46, dead = i < 12; if (t > S.tDead + 0.3 + i * 0.18) { if (dead) { E(c, x, y, 6, 6, '#f4f0e8'); for (let k = 0; k < 6; k++) E(c, x + Math.cos(k) * 5, y + Math.sin(k) * 5, 3, 3, '#e8e4dc'); E(c, x, y, 2, 2, '#e8d870'); L(c, x, y + 6, x, y + 22, '#3c6c3c'); } else { person(c, CLERKS[i % 6], x, y + 24, { k: 'sv' + i, s: 0.6 }); } } } plate(c, 40, 44, '死者12人　生存者4人', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tCop) { bankInside(c, t, { dark: 0.5, clock: 15, min: 40 }); sixteen(c, t, 60, 154, { k: 1 }); person(c, POLICE, 40, 150, { k: 'cp', expr: 'shock' }); for (let i = 0; i < 3; i++) person(c, [FATHER, MOTHER, DETS[2]][i], 250 + i * 18, 150, { k: 'nb' + i, flip: true, expr: 'shock' }); return { z: 1.08, fx: 160, fy: 116 }; }
    bankFront(c, t, { dusk: true }); const k = sg(t, 0.5, S.tCop); person(c, KOIN, lerp(160, 120, k), 150, { k: 'ko', f: Math.floor(t * 2) % 4, expr: 'sad', rot: 0.12 * Math.sin(t * 3) }); return { z: 1.12, fx: 150, fy: 112 };
  }
};

/* ---- TF: the money — 160,000 yen and a cheque; a clerk earned 5,200 a month; chaos at the scene; the cheque cashed next day (moves: bills counted, the cheque slides, the lanterns) ---- */
const TF = {
  name: '奪われた金', ch: '奪われた金', bgm: 'pulse',
  init(S) { S.tChaos = at(S, 'L14', 0) - 0.3; S.tCash = at(S, 'L14', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCash) { bankInside(c, t, { clock: 11, min: 0 }); shadow(c, HANNIN, 150, 150, { k: 'cs' }); R(c, 180, 86, 40, 16, '#e8f0e0'); TX(c, '小切手', 184, 84, '#2c4c2c', 16, null); plate(c, 40, 50, '翌日、現金に換えられた', '#f8e8b0'); return { z: 1.12, fx: 170, fy: 110 }; }
    if (t > S.tChaos) { bankFront(c, t, { night: true }); for (let i = 0; i < 4; i++) person(c, i % 2 ? POLICE : DETS[i], 60 + i * 60, 150, { k: 'ch' + i, f: Math.floor(t * 4 + i) % 4, flip: i % 2 === 0 }); return { z: 1.06, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#2c2420'); R(c, 40, 50, 240, 110, '#4c3c2c'); const n = Math.min(16, Math.floor(t * 4)); for (let i = 0; i < n; i++) { R(c, 60 + (i % 8) * 24, 70 + Math.floor(i / 8) * 30, 20, 12, '#c8b890'); R(c, 62 + (i % 8) * 24, 72 + Math.floor(i / 8) * 30, 16, 8, '#a89c6c'); } plate(c, 60, 140, '約16万円と小切手', '#f8e8b0'); if (t > at(S, 'L13', 2) - 0.3) plate(c, 150, 40, '月給　約5200円', '#c8d0f0');
    return { z: 1.04, fx: 160, fy: 104 };
  }
};

/* ---- TG: the same trick twice before — Yasuda Ebara (Oct.), Mitsubishi Nakai (a week before); no deaths; the real card of Dr. Matsui Shigeru (moves: two bank fronts slide in, the card turns) ---- */
const TG = {
  name: '二つの未遂', ch: '二つの未遂事件', bgm: 'eerie',
  init(S) { S.tCard = at(S, 'L17', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCard) { R(c, 0, 0, W, H, '#1c1814'); glow(c, 160, 96, 100, 50, '#f8e8b0', 0.15); R(c, 90, 60, 140, 76, '#f4f0e8'); R(c, 90, 60, 140, 3, '#c8c4b8'); TX(c, '厚生技官', 104, 70, '#2c2c2c', 16, null); TX(c, '医学博士', 104, 90, '#2c2c2c', 16, null); TX(c, '松井 蔚', 140, 110, '#141414', 16, null); plate(c, 40, 44, '本物の名刺', '#f8e8b0'); return { z: 1.06 + 0.03 * Math.sin(t), fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#3c3830'); for (let i = 0; i < 2; i++) { const k = eOut(sg(t, 0.4 + i * 2.5, 1 + i * 2.5)); const x = lerp(i ? 360 : -160, i ? 170 : 10, k); c.save(); c.translate(x, 30); R(c, 0, 0, 140, 100, '#d8d0c0'); R(c, 0, 0, 140, 6, '#a89c88'); for (let j = 0; j < 3; j++) R(c, 12 + j * 42, 14, 24, 20, '#3c4c5c'); R(c, 50, 54, 40, 46, '#3c2c20'); c.restore(); plate(c, x + 8, 118, i ? '三菱銀行中井支店' : '安田銀行荏原支店', '#f8e8b0'); }
    return { z: 1.03, fx: 160, fy: 96 };
  }
};

/* ---- TMEI: two hunts — the main team after ex-army men (Noborito, Unit 731); the "name-card squad" of Ikii; 100 cards, accounted one by one (moves: soldier silhouettes, cards flip and are crossed off) ---- */
const TMEI = {
  name: '名刺班', ch: '二つの捜査', bgm: 'pulse',
  init(S) { S.tSquad = at(S, 'L19', 0) - 0.3; S.tCards = at(S, 'L20', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCards) { R(c, 0, 0, W, H, '#3c3830'); const segs = [[0, 8, 'keep'], [8, 70, 'got'], [70, 92, 'lost'], [92, 100, 'q']]; const seg = Math.min(3, Math.floor(sg(t, S.tCards, S.dur - 1.5) * 4)); for (let i = 0; i < 100; i++) { const x = 20 + (i % 20) * 14, y = 44 + Math.floor(i / 20) * 16; const g = segs.findIndex(s => i >= s[0] && i < s[1]); const shown = g <= seg; R(c, x, y, 12, 14, !shown ? '#5c5850' : g === 0 ? '#c8d8f0' : g === 1 ? '#f4f0e8' : g === 2 ? '#6c6c64' : '#f8c040'); if (shown && g === 3 && i === 97) { R(c, x - 1, y - 1, 14, 16, '#c81818'); } } plate(c, 40, 124, ['手元に8枚', '回収62枚', '紛失22枚', '行方不明8枚'][seg], seg === 3 ? '#f8c040' : '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tSquad) { hq(c, t); person(c, IKII, 160, 156, { k: 'ik', arm: 'wave', blink: blinkOf(t, 4) }); for (let i = 0; i < 3; i++) nameCard(c, 200 + i * 20, 128 - i * 6, true); plate(c, 212, 104, '名刺班', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 106 }; }
    hq(c, t); for (let i = 0; i < 3; i++) shadow(c, SOLDIER, 150 + i * 56, 156, { k: 'so' + i, col: '#1c1c14' }); plate(c, 40, 104, '旧軍の線', '#f8c8c8'); return { z: 1.06, fx: 160, fy: 110 };
  }
};

/* ---- TI: the painter — Hirasawa at the easel; Otaru: the sketch matches, two spots and a scar; arrest; reporters at every station (moves: brush strokes, faces compared, the stamp, flashbulbs) ---- */
const TI = {
  name: '画家', ch: '画家・平沢貞通', bgm: 'pulse',
  init(S) { S.tOtaru = at(S, 'L22', 0) - 0.3; S.tMatch = at(S, 'L22', 1) - 0.3; S.tArrest = at(S, 'L23', 0) - 0.3; S.tPress = at(S, 'L23b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPress) { platform(c, t); person(c, HIRASAWA, 160, 150, { k: 'pt', expr: 'sad' }); person(c, IKII, 136, 150, { k: 'pi' }); for (let i = 0; i < 5; i++) { person(c, PRESS[i], [40, 70, 230, 260, 290][i], 152, { k: 'ps' + i, flip: i > 1, arm: 'up' }); } if (fr(t * 2.5) < 0.2) dim(c, 0.6, '#ffffff'); return { z: 1.06, fx: 160, fy: 112 }; }
    if (t > S.tArrest) { otaru(c, t); person(c, HIRASAWA, 160, 150, { k: 'ar', expr: 'shock' }); person(c, IKII, 130, 150, { k: 'ai', arm: 'wave' }); person(c, DETS[1], 190, 150, { k: 'ad', flip: true }); stamp(c, t, S.tArrest + 0.4, 90, 64, '逮捕', 72); yearFlash(c, t, S.tArrest + 0.2, '8.21', 216, 10, '1948年'); return { z: 1.08, fx: 160, fy: 108 }; }
    if (t > S.tMatch) { R(c, 0, 0, W, H, '#2c2824'); R(c, 50, 50, 90, 90, '#d8d4c8'); blit(c, hanninFace({}), 95, 96, 24, 24, { s: 1.6 }); R(c, 180, 50, 90, 90, '#c8c4b8'); blit(c, hirasawaFace({}), 225, 96, 24, 24, { s: 1.6 }); plate(c, 62, 32, '人相書き', '#f8e8b0'); plate(c, 206, 32, '平沢', '#f8e8b0'); if (t > S.tMatch + 1.5) { ER(c, 76, 109, 6, 6, '#f8c040'); ER(c, 206, 109, 6, 6, '#f8c040'); } return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tOtaru) { otaru(c, t); person(c, IKII, lerp(-20, 120, sg(t, S.tOtaru, S.tOtaru + 3)), 150, { k: 'oi', f: Math.floor(t * 4) % 4 }); person(c, HIRASAWA, 200, 150, { k: 'oh', flip: true }); return { z: 1.06, fx: 160, fy: 108 }; }
    R(c, 0, 0, W, H, '#5c5448'); R(c, 0, 0, W, 120, '#7c7060'); R(c, 220, 20, 70, 50, '#a8c8d8'); R(c, 0, 120, W, 70, '#6c5c48'); easel(c, 160, 150, t); person(c, HIRASAWA, 110, 150, { k: 'pa', arm: Math.floor(t * 2) % 2 ? 'up' : 'wave', blink: blinkOf(t, 4) }); plate(c, 40, 50, 'テンペラ画の大家', '#f8e8b0');
    return { z: 1.08, fx: 150, fy: 110 };
  }
};

/* ---- TJ: the money he could not explain — a deposit under a false name; "なにも、殺さなくってもよかろうになあ" (moves: the bankbook opens, yen climbs, the newspaper rustles) ---- */
const TJ = withCuts({
  name: '謎の大金', ch: '謎の大金', bgm: 'eerie',
  init(S) { S.tHome = at(S, 'L24b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tHome) { R(c, 0, 0, W, H, '#5c4c3c'); R(c, 0, 0, W, 120, '#8c7c64'); for (let x = 0; x < W; x += 40) R(c, x, 0, 3, 120, '#6c5c48'); R(c, 0, 120, W, 70, '#a89c74'); person(c, HIRASAWA, 120, 150, { k: 'hn', blink: blinkOf(t, 4) }); person(c, MOTHER, 200, 150, { k: 'hm', flip: true, expr: 'shock' }); R(c, 176, 104, 30, 22, '#f0ece0'); R(c, 178, 106, 26, 3, '#2c2c2c'); for (let i = 0; i < 4; i++) R(c, 178, 112 + i * 3, 24, 1, '#8c8c8c'); return { z: 1.12, fx: 160, fy: 112 }; }
    R(c, 0, 0, W, H, '#1c1814'); R(c, 80, 40, 160, 100, '#c8d8c0'); R(c, 158, 40, 4, 100, '#8c9c84'); TX(c, '預金通帳', 96, 50, '#2c3c2c', 16, null); const v = Math.floor(lerp(0, 160000, sg(t, 0.2, 1.2))); TX(c, '¥' + v.toLocaleString(), 170, 80, '#2c2c2c', 16, null); if (t > at(S, 'L24', 2) - 0.3) plate(c, 60, 110, '出所は、説明できない', '#f8e8b0'); else plate(c, 90, 110, '偽名で預金', '#f8c8c8');
    return { z: 1.06, fx: 160, fy: 100 };
  }
}, [['P2', HR]]);

/* ---- TK: the turn — the line-up: no one says "that's him"; "タテからでもヨコからでも"; a month later, the confession (and three suicide attempts); in December he recants (moves: witnesses shake heads, the stamp "自供", then "否認") ---- */
const TK = withCuts({
  name: '面通し', ch: '面通しと自供', bgm: 'dread',
  init(S) { S.tConf = at(S, 'L26', 0) - 0.3; S.tRecant = at(S, 'L27', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRecant) { courtroom(c, t); person(c, HIRASAWA, 160, 156, { k: 'rc', arm: 'wave' }); stamp(c, t, at(S, 'L27', 2), 240, 60, '無罪を主張', 110); return { z: 1.1, fx: 170, fy: 110 }; }
    if (t > S.tConf) { R(c, 0, 0, W, H, '#3c3834'); R(c, 0, 120, W, 70, '#2c2824'); R(c, 120, 100, 80, 8, '#5c4c3c'); glow(c, 160, 40, 40, 30, '#f8e8b0', 0.3); L(c, 160, 0, 160, 34, '#2c2c2c'); E(c, 160, 38, 6, 4, '#f8e8b0'); person(c, HIRASAWA, 120, 150, { k: 'ic', expr: 'sad' }); person(c, DETS[0], 200, 150, { k: 'id', flip: true, arm: 'wave' }); stamp(c, t, at(S, 'L26', 1), 250, 60, '自供', 72); return { z: 1.1, fx: 160, fy: 108 }; }
    hq(c, t); person(c, HIRASAWA, 230, 156, { k: 'lu', blink: blinkOf(t, 4) }); for (let i = 0; i < 4; i++) { const sh = Math.sin(t * 6 + i) * (t > 1 ? 2 : 0); person(c, [DAIRI, KOIN, CLERKS[0], CLERKS[2]][i], 50 + i * 36 + sh, 156, { k: 'wt' + i, flip: false }); }
    if (t > 1.5) plate(c, 40, 40, '断言した人は、いない', '#f8e8b0');
    return { z: 1.08, fx: 160, fy: 112 };
  }
}, [['P1', HR]]);

/* ---- TT: the trial — four survivors split; death sentence 1950, final 1955; the judge's words (moves: the gavel, the verdict stamp) ---- */
const TT = withCuts({
  name: '法廷', ch: '裁判', bgm: 'requiem',
  init(S) { S.tVerdict = at(S, 'L29', 0) - 0.3; S.tFinal = at(S, 'L29', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'jd', blink: blinkOf(t, 5) }); person(c, HIRASAWA, 160, 172, { k: 'df', expr: t > S.tVerdict ? 'sad' : 'normal' });
    if (t > S.tVerdict) { stamp(c, t, S.tVerdict + 0.4, 70, 60, '死刑', 72); if (t > S.tFinal) { yearFlash(c, t, S.tFinal, '1955', 216, 10, '死刑確定'); } }
    else for (let i = 0; i < 4; i++) person(c, [DAIRI, CLERKS[0], KOIN, CLERKS[1]][i], 40 + i * 24 + (i > 1 ? 180 : 0), 160, { k: 'sv' + i, flip: i > 1 });
    return { z: 1.08, fx: 160, fy: 108 };
  }
}, [['Y1', DR], ['M1', KO], ['E1', EG]]);

/* ---- TM: 39 years in a cell — never executed; 18 petitions; painting behind bars; died at 95 (moves: the brush, years turning on a calendar, the window light shifting) ---- */
const TM = {
  name: '獄中', ch: '獄中の39年', bgm: 'requiem',
  init(S) { S.tPaint = at(S, 'L31', 2) - 0.3; S.tDie = at(S, 'L32', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDie) { cellBg(c, t); easel(c, 100, 168, t, { col: '#6c7c8c' }); dim(c, 0.3 + 0.3 * sg(t, S.tDie, S.dur)); yearFlash(c, t, S.tDie + 0.3, '1987', 216, 10, '95歳で死去'); return { z: 1.06, fx: 140, fy: 110 }; }
    cellBg(c, t); for (let i = 0; i < 6; i++) { const u = fr(t * 0.15 + i / 6); c.save(); c.globalAlpha = 0.5 * (1 - u); R(c, 50 + i * 8, 40 + u * 40, 14, 18, '#f4f0e8'); c.restore(); }
    if (t > S.tPaint) { easel(c, 130, 168, t); person(c, HIRA_PRISON, 90, 156, { k: 'pp', arm: Math.floor(t * 2) % 2 ? 'up' : 'wave' }); } else person(c, HIRA_PRISON, 140, 156, { k: 'pw', blink: blinkOf(t, 6), expr: 'sad' });
    if (t < at(S, 'L31', 0) - 0.3) plate(c, 100, 50, '死刑は執行されなかった', '#f8e8b0');
    return { z: 1.08, fx: 150, fy: 112 };
  }
};

/* ---- TN: the riddle — was he the man?; a pro or an amateur; the poison unknown; the money he never explained; (pause) he never said; his daughter's memory (moves: two silhouettes, two bottles, the bundle of bills, his bowed face) ---- */
const TN = withCuts({
  name: '謎', ch: '残された謎', bgm: 'eerie',
  init(S) { S.tTwo = at(S, 'L34', 0) - 0.3; S.tPoison = at(S, 'L35', 0) - 0.3; S.tMoney = at(S, 'L36', 0) - 0.3; S.tSilent = at(S, 'L37', 0) - 0.3; S.tDaughter = at(S, 'L37b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDaughter) { R(c, 0, 0, W, H, '#1c1820'); person(c, HIRASAWA, 140, 150, { k: 'db', expr: 'sad', blink: 2 }); person(c, Object.assign({}, MOTHER, { id: 'dg', coat: '#5c4c5c' }), 200, 150, { k: 'dgt', flip: true, expr: 'sad' }); return { z: 1.14, fx: 170, fy: 110 }; }
    if (t > S.tSilent) return HRS(c, t);
    if (t > S.tMoney) { R(c, 0, 0, W, H, '#14100c'); glow(c, 160, 100, 80, 50, '#c8b890', 0.2); for (let i = 0; i < 5; i++) R(c, 120 + i * 4, 80 - i * 6, 80, 16, i % 2 ? '#c8b890' : '#a89c6c'); TX(c, '？', 220, 60, '#f8e8b0', 16, null); plate(c, 40, 118, 'あの大金の出所', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 96 }; }
    if (t > S.tPoison) { R(c, 0, 0, W, H, '#0c0c10'); for (let i = 0; i < 2; i++) { const x = 110 + i * 100; R(c, x - 18, 54, 36, 56, '#5c8c7c'); R(c, x - 6, 44, 12, 12, '#3c3c3c'); R(c, x - 15, 74, 30, 20, '#f4f0e8'); TX(c, i ? '？' : '青酸', x - (i ? 8 : 16), 76, '#c81818', 16, null); } plate(c, 40, 118, '鑑定の食い違い', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tTwo) { R(c, 0, 0, W, H, '#14141c'); const k = sg(t, S.tTwo, at(S, 'L34', 3) - 0.3); shadow(c, SOLDIER, 100, 150, { k: 'tw1', col: '#3c3c2c' }); pipette(c, 116, 104); if (k > 0.5) { person(c, HIRASAWA, 220, 150, { k: 'tw2' }); } plate(c, 50, 50, '旧軍のプロ', '#f8c8c8'); if (k > 0.5) plate(c, 180, 50, '素人', '#c8d0f0'); return { z: 1.04, fx: 160, fy: 104 }; }
    R(c, 0, 0, W, H, '#0c0c10'); for (let i = 0; i < 6; i++) { const u = fr(t * 0.05 + i / 6); c.save(); c.globalAlpha = 0.15; E(c, u * 400 - 40, 60 + i * 20, 60, 10, '#c8c8d8'); c.restore(); } blit(c, hirasawaFace({ blink: blinkOf(t, 6) }), 160, 96, 24, 24, { s: 2.2 }); TX(c, '？', 220, 50, '#f8e8b0', 16, null);
    return { z: 1.04, fx: 160, fy: 100 };
  }
}, [['D1', MU]]);

/* ---- TO: for the twelve — the bank at dusk, flowers by the door; the families left without support (moves: petals in the wind, the light fades) ---- */
const TO = {
  name: '鎮魂', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    bankFront(c, t, { dusk: true }); R(c, 118, 132, 84, 6, '#5c4c3c'); for (let i = 0; i < 12; i++) { const x = 124 + (i % 6) * 14, y = 118 + Math.floor(i / 6) * 10; L(c, x, y + 4, x, y + 16, '#3c6c3c'); for (let k = 0; k < 6; k++) E(c, x + Math.cos(k) * 3, y + Math.sin(k) * 3, 2, 2, '#f4f0e8'); E(c, x, y, 1.5, 1.5, '#e8d870'); }
    for (let i = 0; i < 8; i++) { const u = fr(t * 0.1 + i / 8); P(c, u * 340 - 10, 60 + i * 10 + Math.sin(t + i) * 4, '#f4f0e8'); } dim(c, 0.3 * sg(t, 2, 14));
    return { z: 1.06, fx: 160, fy: 104 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '16人の湯のみ', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { bankInside(c, t, { clock: 15, min: 20 }); sixteen(c, t, 50, 150, { lift: t > 0.8 }); return { z: 1.14 + 0.04 * ss(sg(t, 0, S.dur)), fx: 160, fy: 118 }; } };
const SS2 = { name: '腕章の男', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { bankFront(c, t); person(c, HANNIN, lerp(60, 160, sg(t, 0, S.dur)), 150, { k: 's2', f: Math.floor(t * 4) % 4 }); return { z: 1.1, fx: 160, fy: 108 }; } };
