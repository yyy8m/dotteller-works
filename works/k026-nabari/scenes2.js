/* ================= 記録 #026 名張毒ぶどう酒事件: scenes ================= */
const RC = (c, t) => closeUp(c, t, rojinFace({ blink: blinkOf(t, 6) }), { bg: ['#1c1810', '#4c4030'], spk: 'rojin' });
const IC = (c, t) => closeUp(c, t, ishiFace({ blink: blinkOf(t, 5) }), { bg: ['#14181c', '#3c4448'], spk: 'ishi' });
// the five lives lost, remembered as soft lights (never drawn as victims); o.out: how many have dimmed
function lights5(c, t, x, y, o = {}) { for (let i = 0; i < 5; i++) { const lx = x + i * 26, ly = y + (i % 2) * 8; const a = o.out && i < o.out ? 0.12 : 0.55 + 0.15 * Math.sin(t * 2 + i); c.save(); c.globalAlpha = a; glow(c, lx, ly, 10, 10, '#f8e8b0', 0.6); E(c, lx, ly, 3, 3, '#f8f0d8'); c.restore(); } }
// people seated around the low table, drawn behind it (n women on the right, m men on the left)
const seated = (t, nw, nm, k) => c => { for (let i = 0; i < nm; i++) person(c, VILLAGERS_M[i % 3], 50 + i * 26, 136, { k: k + 'm' + i, blink: blinkOf(t, i + 2) }); for (let i = 0; i < nw; i++) person(c, VILLAGERS_W[i % 5], 160 + i * 26, 136, { k: k + 'w' + i, flip: true, blink: blinkOf(t, i + 7) }); };
// the map of the hamlet: Mie on the right, Nara wrapping north, west and south
function borderMap(c, t, k) { bgF(c, '#1c2c3c', t); R(c, 40, 20, 240, 150, '#6c8c6c'); PF(c, [40, 20, 280, 20, 280, 60, 190, 60, 190, 130, 280, 130, 280, 170, 40, 170], '#8c9c6c'); TX(c, '奈良県', 70, 90, '#2c2c1c', 16, null); TX(c, '奈良県', 200, 32, '#2c2c1c', 16, null); TX(c, '奈良県', 200, 142, '#2c2c1c', 16, null); TX(c, '三重県', 222, 70, '#1c2c1c', 16, null); L(c, 190, 60, 280, 60, '#c81818', 2); L(c, 190, 60, 190, 130, '#c81818', 2); L(c, 190, 130, 280, 130, '#c81818', 2); const p = 0.5 + 0.5 * Math.sin(t * 5); E(c, 196, 95, 4 + p * 2, 4 + p * 2, '#f8e8b0'); if (k > 0) TX(c, '葛尾', 200, 100, '#f8f0d8', 16, null); }
// a plain dark ground with a faint two-tone weave and a slow light, so no flat single colour fills the frame
function bgF(c, col, t = 0) { c.drawImage(cached('bgF' + col, () => { const [cv, x] = mk(W, H); R(x, 0, 0, W, H, col); const [r0, g0, b0] = hex(col), c2 = 'rgb(' + Math.min(255, r0 + 10) + ',' + Math.min(255, g0 + 10) + ',' + Math.min(255, b0 + 13) + ')'; for (let y = 0; y < H; y += 2) for (let xx = (y >> 1 & 1) * 2; xx < W; xx += 4) R(x, xx, y, 2, 2, c2); return cv; }), 0, 0); glow(c, 160 + Math.sin(t * 0.4) * 40, 100, 150, 90, '#f8e8b0', 0.06); }
function seal(c, x, y, s = 1) { R(c, x, y, 26 * s, 10 * s, '#e8e0c8'); R(c, x, y + 4 * s, 26 * s, 2 * s, '#c81818'); }

/* ---- QZ: cold open — March 28, 1961, night: the lit hall in the hills; the bottle on the table; the cups tip and the lights go out; 17 and 5; the verdict that flipped (moves: the windows dim, the lights fade, stamps) ---- */
const QZ = {
  name: '公民館の夜', ch: '事件', bgm: 'eerie',
  init(S) { S.tFall = at(S, 'C0', 3) - 0.3; S.tNum = at(S, 'C1', 0) - 0.3; S.tPoison = at(S, 'C1', 2) - 0.3; S.tMan = at(S, 'C2', 0) - 0.3; S.tDeath = at(S, 'C2', 3) - 0.2; S.tPrison = at(S, 'C2', 4) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tPrison) { prison(c, t, {}); dim(c, 0.45); plate(c, 60, 50, '死刑の確定から43年', '#f8e8b0'); return { z: 1.04 + 0.04 * sg(t, S.tPrison, S.dur), fx: 160, fy: 100 }; }
    if (t > S.tMan) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'zj', blink: blinkOf(t, 5) }); person(c, OKUNISHI, 160, 172, { k: 'zo' }); stamp(c, t, at(S, 'C2', 1) - 0.1, 76, 56, '無罪', 64, '#3c6cc8'); stamp(c, t, S.tDeath, 244, 56, '死刑', 64); return { z: 1.08, fx: 160, fy: 108 }; }
    if (t > S.tPoison) { bgF(c, '#0c0810', t); wineBottle(c, 160, 170, {}); glow(c, 160, 130, 40, 50, '#c81818', 0.15 + 0.1 * Math.sin(t * 6)); plate(c, 200, 60, '農薬', '#f8c8c8'); return { z: 1.1 + 0.05 * sg(t, S.tPoison, S.tMan), fx: 160, fy: 120 }; }
    if (t > S.tNum) { bgF(c, '#0c0c14', t); lights5(c, t, 108, 120, { out: 0 }); plate(c, 60, 60, '中毒 17人', '#f8e8b0'); if (t > at(S, 'C1', 1) - 0.3) plate(c, 180, 60, '死亡 5人', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tFall) { hallInside(c, t, { back: seated(t, 4, 0, 'zf'), dark: 0.35 * sg(t, S.tFall, S.tFall + 2) }); for (let i = 0; i < 4; i++) if (t > S.tFall + 0.4 + i * 0.5) R(c, 186 + i * 26, 124, 8, 4, '#c8c0a8'); return { z: 1.12, fx: 200, fy: 112 }; }
    const inside = t > at(S, 'C0', 2) - 0.3;
    if (inside) { hallInside(c, t, { back: seated(t, 4, 2, 'zi') }); return { z: 1.1 + 0.04 * sg(t, at(S, 'C0', 2), S.tFall), fx: 160, fy: 104 }; }
    hall(c, t, { night: true }); yearFlash(c, t, 0.4, '1961', 216, 10, '3月28日');
    return { z: 1.04 + 0.04 * sg(t, 0, S.dur), fx: 160, fy: 92 };
  }
};

/* ---- QA: Kuzuo — 8 km down the river from Nabari; 25 homes; Nara on three sides, homes across the border; most of them relatives; the old man speaks (moves: the map pulses, the border lines, the hamlet) ---- */
const QA = withCuts({
  name: '葛尾', ch: '山あいの集落', bgm: 'memory',
  init(S) { S.tMap = at(S, 'L2', 1) - 0.3; S.tKin = at(S, 'L2', 4) - 0.3; S.tOld = at(S, 'L3', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tOld) { hamlet(c, t); person(c, ROJIN, 160, 156, { k: 'ar', blink: blinkOf(t, 6) }); return { z: 1.14, fx: 160, fy: 112 }; }
    if (t > S.tKin) { hamlet(c, t); for (let i = 0; i < 5; i++) person(c, i % 2 ? VILLAGERS_W[i] : VILLAGERS_M[i % 3], 70 + i * 44, 156, { k: 'ak' + i, expr: 'smile', blink: blinkOf(t, i + 3) }); plate(c, 60, 40, '多くの家が親戚どうし', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 108 }; }
    if (t > S.tMap) { borderMap(c, t, 1); return { z: 1.04, fx: 160, fy: 96 }; }
    hamlet(c, t); if (t > at(S, 'L2', 0) - 0.3) plate(c, 110, 40, '25戸', '#f8e8b0'); else plate(c, 40, 40, '三重県名張市　葛尾', '#f8e8b0');
    return { z: 1.04 + 0.05 * sg(t, 0, S.tMap), fx: 160, fy: 104 };
  }
}, [['R1', RC]]);

/* ---- QB: the meeting — March 28, 7 p.m.; 12 men and 20 women; the agenda; at 8 the banquet: sake for men, wine for women; the 1.8 L bottle shared; the chairman's decision that day (moves: counters fill, the agenda ticks, cups pass) ---- */
const QB = {
  name: '三奈の会', ch: '総会と宴会', bgm: 'paradise',
  init(S) { S.tCount = at(S, 'L4', 4) - 0.3; S.tAgenda = at(S, 'L4b', 0) - 0.3; S.tParty = at(S, 'L5', 0) - 0.3; S.tRule = at(S, 'L5', 2) - 0.3; S.tShare = at(S, 'L5b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tShare) { hallInside(c, t, { back: seated(t, 5, 0, 'bs') }); for (let i = 0; i < 5; i++) { const lift = Math.max(0, Math.sin(t * 2 - i)) * 4; R(c, 174 + i * 26, 118 - lift, 6, 6, '#8c2c4c'); } if (t > at(S, 'L5b', 2) - 0.3) plate(c, 40, 40, '会長の計らい', '#f8e8b0'); return { z: 1.14, fx: 220, fy: 110 }; }
    if (t > S.tRule) { bgF(c, '#2c2018', t); R(c, 60, 92, 14, 40, '#e8e4d8'); R(c, 64, 80, 6, 14, '#e8e4d8'); TX(c, '男性に清酒', 86, 100, '#f8e8b0', 16, null); if (t > at(S, 'L5', 3) - 0.3) { wineBottle(c, 250, 132, {}); TX(c, '女性に', 180, 60, '#f8e8b0', 16, null); } return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tParty) { hallInside(c, t, { back: seated(t, 3, 3, 'bp') }); yearFlash(c, t, S.tParty + 0.2, '20:00', 216, 10, '宴会'); return { z: 1.08, fx: 160, fy: 108 }; }
    if (t > S.tAgenda) { hallInside(c, t, { back: seated(t, 3, 3, 'ba'), wine: false }); const ag = ['挨拶', '会計報告', '役員改選']; for (let i = 0; i < 3; i++) if (t > at(S, 'L4b', 1 + i) - 0.3) plate(c, 40 + i * 92, 40, ag[i], '#f8e8b0'); yearFlash(c, t, S.tAgenda + 0.2, '19:00', 216, 70, ''); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tCount) { bgF(c, '#1c1c24', t); const nm = Math.floor(lerp(0, 12, sg(t, S.tCount + 0.3, S.tCount + 1.8))), nw = Math.floor(lerp(0, 20, sg(t, at(S, 'L4', 6) - 0.2, at(S, 'L4', 6) + 1.6))); for (let i = 0; i < nm; i++) R(c, 40 + (i % 6) * 18, 70 + Math.floor(i / 6) * 22, 10, 16, '#6c8cc8'); for (let i = 0; i < nw; i++) R(c, 180 + (i % 6) * 18, 50 + Math.floor(i / 6) * 22, 10, 16, '#c88cac'); TX(c, '男性12人', 50, 130, '#f8e8b0', 16, null); if (nw) TX(c, '女性20人', 186, 140, '#f8e8b0', 16, null); return { z: 1.04, fx: 160, fy: 96 }; }
    hall(c, t, {}); for (let i = 0; i < 3; i++) person(c, VILLAGERS_W[i], lerp(-20, 120, sg(t, 0.5 + i * 0.4, 4 + i * 0.4)) - i * 20, 158, { k: 'bw' + i, f: Math.floor(t * 4 + i) & 3 }); yearFlash(c, t, 0.4, '1961', 216, 10, '3月28日');
    return { z: 1.06, fx: 160, fy: 100 };
  }
};

/* ---- QC: the poisoning — 17 fall ill, 5 die (lights, never victims); the doctor recalls Teigin; "the second Teigin case"; TEPP in the wine, none in the sake; "it smelled of kerosene" (moves: the lights dim, the papers spin, the bottle glows) ---- */
const QC = withCuts({
  name: '中毒', ch: '5人の死', bgm: 'dread',
  init(S) { S.tFive = at(S, 'L6', 2) - 0.3; S.tPaper = at(S, 'L8', 0) - 0.3; S.tTepp = at(S, 'L9', 0) - 0.3; S.tClean = at(S, 'L9', 3) - 0.3; S.tSmell = at(S, 'L9b', 0) - 0.3; S.tDoc = at(S, 'L7', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSmell) { bgF(c, '#14100c', t); wineBottle(c, 140, 170, {}); for (let i = 0; i < 5; i++) { const y = 70 - ((t * 20 + i * 14) % 50); c.save(); c.globalAlpha = 0.4; R(c, 150 + i * 6 + Math.sin(t * 3 + i) * 4, y, 4, 4, '#a8a890'); c.restore(); } plate(c, 40, 44, '石油のような臭い', '#f8e8b0'); return { z: 1.1, fx: 150, fy: 110 }; }
    if (t > S.tClean) { bgF(c, '#1c1c24', t); R(c, 70, 92, 14, 40, '#e8e4d8'); R(c, 74, 80, 6, 14, '#e8e4d8'); R(c, 120, 118, 40, 12, '#e8e0c8'); TX(c, '○', 92, 56, '#8cc88c', 16, null); wineBottle(c, 240, 140, {}); TX(c, '×', 270, 70, '#f84040', 16, null); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tTepp) { bgF(c, '#0c0810', t); wineBottle(c, 160, 170, {}); glow(c, 160, 130, 40, 50, '#c81818', 0.2); plate(c, 92, 44, '農薬　テップ剤', '#f8c8c8'); return { z: 1.12, fx: 160, fy: 116 }; }
    if (t > S.tPaper) { bgF(c, '#2c2c30', t); spinPaper(c, paperSpr('nb1', '第二の帝銀事件', '名張で5人死亡', '昭和36年3月'), 160, 100, sg(t, S.tPaper, S.tPaper + 0.8)); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tDoc) { hall(c, t, { night: true }); person(c, DOCTOR, lerp(-20, 150, sg(t, S.tDoc, S.tDoc + 2.5)), 156, { k: 'cd', f: Math.floor(t * 5) & 3 }); return { z: 1.06, fx: 150, fy: 100 }; }
    bgF(c, '#0c0c14', t); lights5(c, t, 108, 120, { out: t > S.tFive ? Math.floor(lerp(0, 5, sg(t, S.tFive + 0.4, S.tFive + 3))) : 0 }); plate(c, 110, 60, t > S.tFive ? '5人が死亡' : '17人が中毒', t > S.tFive ? '#f8c8c8' : '#f8e8b0');
    return { z: 1.04, fx: 160, fy: 100 };
  }
}, [['I1', IC]]);

/* ---- QD: suspicion — six hours, four hands on the bottle; one of them Okunishi, who carried it; his wife and another woman among the dead; "the triangle"; April 2: "my wife put something in"; that night he reverses; April 3 dawn arrest; two children sent to different relatives (moves: the clock, four silhouettes, one lit, stamps) ---- */
const QD = {
  name: '4人', ch: '疑い', bgm: 'pulse',
  init(S) { S.tFour = at(S, 'L10', 2) - 0.3; S.tHim = at(S, 'L11', 0) - 0.3; S.tWives = at(S, 'L12', 0) - 0.3; S.tTri = at(S, 'L13', 0) - 0.3; S.tApr2 = at(S, 'L14', 0) - 0.3; S.tFlip = at(S, 'L14', 4) - 0.3; S.tConf = at(S, 'L15', 0) - 0.3; S.tArrest = at(S, 'L15', 2) - 0.3; S.tKids = at(S, 'L15b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tKids) { hamlet(c, t, { night: false }); dim(c, 0.2); person(c, SON, 130, 156, { k: 'dk', expr: 'sad', s: 0.8 }); person(c, VILLAGERS_W[1], 190, 156, { k: 'dd', expr: 'sad', s: 0.6 }); if (t > at(S, 'L15b', 2) - 0.3) plate(c, 60, 40, '別々の親戚に', '#f8e8b0'); return { z: 1.12, fx: 160, fy: 120 }; }
    if (t > S.tArrest) { policeStation(c, t, { night: true }); person(c, OKUNISHI, 150, 166, { k: 'da', expr: 'sad' }); person(c, POLICE, 180, 166, { k: 'dp', flip: true }); yearFlash(c, t, S.tArrest + 0.2, '4月3日', 216, 44, '未明'); return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tConf) { interro(c, t); person(c, OKUNISHI, 120, 150, { k: 'dc', expr: 'sad', blink: blinkOf(t, 4) }); person(c, DETS[0], 210, 150, { k: 'dt', flip: true }); plate(c, 40, 44, '「自分が入れた」', '#f8c8c8'); return { z: 1.12, fx: 160, fy: 100 }; }
    if (t > S.tApr2) { interro(c, t); person(c, OKUNISHI, 120, 150, { k: 'd2', blink: blinkOf(t, 4) }); person(c, DETS[1], 210, 150, { k: 'dt2', flip: true }); yearFlash(c, t, S.tApr2 + 0.2, '4月2日', 216, 10, ''); if (t > S.tFlip) { dim(c, 0.35); plate(c, 40, 44, 'その日の深夜', '#f8e8b0'); } else if (t > at(S, 'L14', 2) - 0.3) plate(c, 40, 44, '「妻が何かを入れた」', '#f8e8b0'); return { z: 1.1, fx: 160, fy: 100 }; }
    if (t > S.tTri) { policeStation(c, t, {}); for (let i = 0; i < 3; i++) person(c, DETS[i], 200 + i * 30, 178, { k: 'dtr' + i, flip: true }); R(c, 60, 40, 70, 60, '#f0ece0'); PF(c, [95, 50, 70, 90, 120, 90], '#f0ece0'); L(c, 95, 50, 70, 90, '#c81818', 2); L(c, 70, 90, 120, 90, '#c81818', 2); L(c, 120, 90, 95, 50, '#c81818', 2); return { z: 1.06, fx: 150, fy: 100 }; }
    if (t > S.tWives) { bgF(c, '#0c0c14', t); lights5(c, t, 108, 120, { out: 0 }); for (const i of [1, 3]) { c.save(); c.globalAlpha = 0.6; R(c, 108 + i * 26 - 6, 136, 12, 2, '#c8a048'); c.restore(); } plate(c, 60, 50, '妻と、親しい女性', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tHim) { bgF(c, '#14141c', t); for (let i = 0; i < 4; i++) { if (i === 2) person(c, OKUNISHI, 70 + i * 60, 160, { k: 'dh', blink: blinkOf(t, 4) }); else shadow(c, VILLAGERS_M[i % 3], 70 + i * 60, 160, { k: 'ds' + i }); } glow(c, 190, 120, 30, 50, '#f8e8b0', 0.2); plate(c, 40, 44, '奥西勝', '#f8e8b0'); return { z: 1.06, fx: 190, fy: 110 }; }
    bgF(c, '#14141c', t); E(c, 110, 90, 40, 40, '#e8e4d8'); E(c, 110, 90, 36, 36, '#1c1c24'); const a = sg(t, 0.3, S.tFour) * Math.PI * 2; L(c, 110, 90, 110 + Math.sin(a) * 30, 90 - Math.cos(a) * 30, '#f8e8b0', 2); TX(c, '約6時間', 66, 140, '#f8e8b0', 16, null);
    if (t > S.tFour) for (let i = 0; i < 4; i++) shadow(c, VILLAGERS_M[i % 3], 190 + i * 30, 160, { k: 'df' + i });
    return { z: 1.04, fx: 160, fy: 100 };
  }
};

/* ---- QE: the confession and the search — a bamboo tube, the bottle in the river, the tube burned in the hearth; divers and ama search the river: nothing; 16 days, 1000 officers; he recants; no decisive evidence (moves: the tube, the river, divers bob, the counter) ---- */
const QE = {
  name: '川の捜索', ch: '自白と物証', bgm: 'dread',
  init(S) { S.tTube = at(S, 'L16', 1) - 0.3; S.tPour = at(S, 'L16', 2) - 0.3; S.tRiver = at(S, 'L16', 4) - 0.3; S.tFire = at(S, 'L16', 5) - 0.3; S.tSearch = at(S, 'L17', 0) - 0.3; S.tCount = at(S, 'L17b', 0) - 0.3; S.tDeny = at(S, 'L18', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDeny) { interro(c, t); person(c, OKUNISHI, 120, 150, { k: 'en', arm: 'wave', blink: blinkOf(t, 4) }); person(c, DETS[0], 210, 150, { k: 'ed', flip: true }); if (t > at(S, 'L18', 2) - 0.3) plate(c, 40, 44, '決定的な物証なし', '#f8e8b0'); else plate(c, 40, 44, '再び否認', '#f8e8b0'); return { z: 1.1, fx: 160, fy: 100 }; }
    if (t > S.tCount) { river(c, t, { search: true }); const n = Math.floor(lerp(0, 1000, sg(t, S.tCount + 0.3, S.tCount + 1.8))); plate(c, 60, 40, '16日間　延べ' + n + '人', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tSearch) { river(c, t, { search: true }); for (let i = 0; i < 3; i++) person(c, POLICE, 60 + i * 30, 178, { k: 'es' + i }); if (t > at(S, 'L17', 3) - 0.3) plate(c, 150, 40, '瓶は見つからず', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 120 }; }
    if (t > S.tFire) { bgF(c, '#1c140c', t); R(c, 100, 140, 120, 20, '#3c2c1c'); for (let i = 0; i < 6; i++) { const h = 20 + Math.sin(t * 9 + i) * 8; PF(c, [120 + i * 14, 140, 127 + i * 14, 140 - h, 134 + i * 14, 140], i % 2 ? '#f8a030' : '#f86830'); } R(c, 140, 120, 40, 6, '#6c8c3c'); glow(c, 160, 120, 60, 30, '#f8a030', 0.3); TX(c, '囲炉裏', 136, 60, '#f8e8b0', 16, null); return { z: 1.08, fx: 160, fy: 120 }; }
    if (t > S.tRiver) { river(c, t); const k = sg(t, S.tRiver, S.tRiver + 1.2); R(c, lerp(60, 150, k), lerp(70, 120, k), 6, 12, '#8c8ca8'); return { z: 1.06, fx: 150, fy: 110 }; }
    if (t > S.tPour) { hallInside(c, t, { dark: 0.4 }); shadow(c, VILLAGERS_M[0], 130, 150, { k: 'ep' }); plate(c, 40, 44, '自白では', '#f8e8b0'); return { z: 1.12, fx: 160, fy: 104 }; }
    bgF(c, '#1c1c24', t); if (t > S.tTube) { R(c, 140, 60, 16, 70, '#8ca848'); for (let i = 0; i < 3; i++) R(c, 140, 76 + i * 20, 16, 2, '#6c8838'); R(c, 180, 100, 10, 24, '#8c8ca8'); TX(c, '竹筒', 124, 140, '#f8e8b0', 16, null); TX(c, '農薬', 176, 140, '#f8c8c8', 16, null); } else { R(c, 90, 40, 140, 100, '#f0ece0'); TX(c, '供述調書', 128, 46, '#1c1c1c', 16, null); for (let i = 0; i < 7; i++) R(c, 100, 70 + i * 9, 120 - (i % 3) * 14, 2, '#5c5c5c'); }
    return { z: 1.06, fx: 160, fy: 96 };
  }
};

/* ---- QF: the first trial — the crown cap and its marks; three experts split 1–2; the defense: no poison in the ash, the seal paper in the closet; December 23, 1964, Tsu District Court: not guilty (moves: the cap turns, the teeth, the votes, the stamp) ---- */
const QF = {
  name: '王冠', ch: '一審', bgm: 'requiem',
  init(S) { S.tCap = at(S, 'L19', 1) - 0.3; S.tTeeth = at(S, 'L19', 2) - 0.3; S.tExp = at(S, 'L19b', 0) - 0.3; S.tDef = at(S, 'L20', 0) - 0.3; S.tVerdict = at(S, 'L21', 0) - 0.3; S.tWhy = at(S, 'L21b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWhy) { bgF(c, '#1c1814', t); docPaper(c, 196, 34, 100, 100, '判決理由'); const ws = ['自白と証言の矛盾', '証拠が足りない']; for (let i = 0; i < 2; i++) if (t > at(S, 'L21b', 1 + i * 2) - 0.3) plate(c, 40, 60 + i * 34, ws[i], '#f8e8b0'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tVerdict) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'fj', blink: blinkOf(t, 5) }); person(c, OKUNISHI, 160, 172, { k: 'fv' }); yearFlash(c, t, S.tVerdict + 0.2, '1964', 216, 10, '12月23日'); plate(c, 40, 44, '津地方裁判所', '#f8e8b0'); stamp(c, t, at(S, 'L21', 3) - 0.2, 80, 80, '無罪', 70, '#3c6cc8'); return { z: 1.08, fx: 160, fy: 108 }; }
    if (t > S.tDef) { courtroom(c, t); person(c, LAWYERS[0], 120, 172, { k: 'fl', arm: 'wave' }); person(c, LAWYERS[1], 150, 172, { k: 'fl2' }); if (t > at(S, 'L20', 1) - 0.3) plate(c, 40, 44, '灰から農薬は出ない', '#f8e8b0'); if (t > at(S, 'L20', 3) - 0.3) { plate(c, 40, 68, '封の紙は押し入れに', '#f8e8b0'); seal(c, 220, 60, 2); } return { z: 1.06, fx: 150, fy: 100 }; }
    if (t > S.tExp) { bgF(c, '#1c1c24', t); E(c, 160, 50, 20, 20, '#c8a048'); for (let i = 0; i < 3; i++) { const x = 80 + i * 80; person(c, DOCTOR, x, 170, { k: 'fe' + i, blink: blinkOf(t, i + 3) }); if (t > at(S, 'L19b', i === 0 ? 3 : 4) - 0.3) TX(c, i === 0 ? '○' : '？', x - 8, 84, i === 0 ? '#f84040' : '#c8c8e0', 16, null); } plate(c, 40, 44, '歯型の鑑定', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 110 }; }
    bgF(c, '#14141c', t); const r = 34 + 4 * sg(t, S.tCap, S.tCap + 1); E(c, 160, 100, r, r, '#c8a048'); E(c, 160, 100, r - 6, r - 6, '#a8802c'); for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; R(c, 160 + Math.cos(a) * r - 2, 100 + Math.sin(a) * r - 2, 4, 4, '#8c6c2c'); }
    if (t > S.tTeeth) for (let i = 0; i < 3; i++) R(c, 146 + i * 10, 90, 4, 12 + (i % 2) * 4, '#5c4020'); if (t > at(S, 'L19', 4) - 0.3) plate(c, 60, 124, '検察「奥西の歯の跡」', '#f8c8c8');
    return { z: 1.06 + 0.06 * sg(t, 0, S.tExp), fx: 160, fy: 100 };
  }
};

/* ---- QG: free, then reversed — he works at a gas station in Yokkaichi with his son; September 10, 1969, Nagoya High Court overturns; the judge reads the sentence first; "Death." (moves: the pump, the son; the gavel; the hush before the stamp) ---- */
const QG = {
  name: '逆転', ch: '二審', bgm: 'chase',
  init(S) { S.tHigh = at(S, 'L23', 1) - 0.3; S.tFirst = Math.min(at(S, 'L24', 0), at(S, 'T2', 0)) - 0.3; S.tDeath = at(S, 'L24b', 0) - 0.2; S.dur = lastSe(S) + 1.8; },
  draw(c, t, S) {
    if (t > S.tDeath) { courtroom(c, t); dim(c, 0.3); person(c, JUDGE, 160, 112, { k: 'gj3' }); person(c, OKUNISHI, 160, 172, { k: 'gd', expr: 'shock' }); stamp(c, t, S.tDeath, 160, 84, '死刑', 80); return { z: 1.14 + 0.04 * sg(t, S.tDeath, S.dur), fx: 160, fy: 110, sx: t - S.tDeath < 0.4 ? Math.round(Math.sin(t * 80) * 2) : 0 }; }
    if (t > S.tFirst) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'gj2', blink: blinkOf(t, 5) }); person(c, OKUNISHI, 160, 172, { k: 'gf' }); docPaper(c, 220, 120, 80, 60, '主文'); dim(c, 0.2 * sg(t, S.tFirst, S.tDeath)); return { z: 1.06 + 0.1 * sg(t, S.tFirst, S.tDeath), fx: 160, fy: 104 }; }
    if (t > S.tHigh) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'gj', blink: blinkOf(t, 5) }); person(c, OKUNISHI, 160, 172, { k: 'gh' }); yearFlash(c, t, at(S, 'L23', 1) - 0.1, '1969', 216, 10, '9月10日'); plate(c, 40, 44, '名古屋高等裁判所', '#f8e8b0'); if (t > at(S, 'L23', 3) - 0.3) stamp(c, t, at(S, 'L23', 3) - 0.2, 80, 80, '無罪を破棄', 100); return { z: 1.08, fx: 160, fy: 108 }; }
    VG(c, 0, 0, W, 120, ['#8cb0d0', '#b8cce0', '#e0e4d8']); R(c, 0, 120, W, 70, '#8c8c84'); R(c, 60, 40, 200, 20, '#c81818'); R(c, 70, 60, 8, 60, '#e8e4d8'); R(c, 242, 60, 8, 60, '#e8e4d8'); R(c, 140, 84, 20, 36, '#e8e4d8'); R(c, 144, 90, 12, 10, '#1c1c1c'); TX(c, 'ガソリン', 128, 42, '#f8f8f0', 16, null);
    person(c, OKUNISHI, 190, 160, { k: 'gs', expr: 'smile', blink: blinkOf(t, 4) }); person(c, SON, 220, 160, { k: 'gss', s: 0.85, blink: blinkOf(t, 7) }); yearFlash(c, t, 0.4, '1964', 20, 70, '釈放'); plate(c, 214, 74, '四日市市', '#f8e8b0');
    return { z: 1.06, fx: 170, fy: 110 };
  }
};
// the cut after the reversal: the wine bottle in the dark, its label like a pale face (the culprit is never shown)
const GH0 = { name: '瓶', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, bottleFace({ dark: true }), [[23, 30]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- QH: the long fight — 1972 Supreme Court: death sentence final, a first under the modern system; retrial petitions from his cell, refused again and again; 2005: retrial granted (cap, red liquid, the tooth error); 2006: revoked (moves: the stamp, letters pile, three findings, a stamp crossed out) ---- */
const QH = {
  name: '再審', ch: '再審請求', bgm: 'requiem',
  init(S) { S.tFirst = at(S, 'L25', 3) - 0.3; S.tCell = at(S, 'L26', 0) - 0.3; S.tRefused = at(S, 'L26', 4) - 0.3; S.t05 = at(S, 'L27', 0) - 0.3; S.tWhy = at(S, 'L27', 3) - 0.3; S.t06 = at(S, 'L28', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.t06) { bgF(c, '#1c1814', t); docPaper(c, 70, 46, 140, 96, '再審開始決定'); const k = sg(t, at(S, 'L28', 3) - 0.3, at(S, 'L28', 3) + 0.4); if (k > 0) { L(c, 70, 46, lerp(70, 210, k), lerp(46, 142, k), '#c81818', 3); L(c, 210, 46, lerp(210, 70, k), lerp(46, 142, k), '#c81818', 3); } yearFlash(c, t, S.t06 + 0.2, '2006', 216, 10, '取り消し'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tWhy) { bgF(c, '#1c1c24', t); const fs = [['王冠を開ける方法', '#f8e8b0'], ['農薬は赤い液体', '#f8c8c8'], ['歯型鑑定のミス', '#f8e8b0']]; for (let i = 0; i < 3; i++) if (t > at(S, 'L27', 3 + i) - 0.3) plate(c, 60, 50 + i * 40, fs[i][0], fs[i][1]); E(c, 260, 60, 14, 14, '#c8a048'); R(c, 254, 124, 12, 20, '#c81818'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.t05) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'hj', blink: blinkOf(t, 5) }); for (let i = 0; i < 2; i++) person(c, LAWYERS[i], 130 + i * 40, 172, { k: 'hl' + i, arm: i ? 'up' : null, expr: 'smile' }); yearFlash(c, t, S.t05 + 0.2, '2005', 216, 10, '再審開始'); return { z: 1.06, fx: 160, fy: 108 }; }
    if (t > S.tCell) { cellBg(c, t); person(c, OKUNISHI_OLD, 260, 168, { k: 'hc', blink: blinkOf(t, 6) }); const n = Math.floor(lerp(0, 9, sg(t, S.tCell + 0.5, S.tRefused + 0.5))); for (let i = 0; i < n; i++) { R(c, 40 + (i % 5) * 26, 100 + Math.floor(i / 5) * 30, 20, 26, '#f0ece0'); if (t > S.tRefused && i < n - 1) TX(c, '×', 42 + (i % 5) * 26, 104 + Math.floor(i / 5) * 30, '#c81818', 16, null); } return { z: 1.06, fx: 180, fy: 110 }; }
    bgF(c, '#1c1814', t); docPaper(c, 70, 34, 140, 80, '最高裁判所'); stamp(c, t, at(S, 'L25', 2) - 0.2, 176, 90, '死刑確定', 90); yearFlash(c, t, 0.4, '1972', 216, 10, '');
    if (t > S.tFirst) { const s = ['一審 無罪', '二審 死刑', '確定']; for (let i = 0; i < 3; i++) plate(c, 50 + i * 80, 124, s[i], i === 0 ? '#c8d8f8' : '#f8c8c8'); }
    return { z: 1.04, fx: 160, fy: 96 };
  }
};

/* ---- QI: the family and the end — his mother's letters until 1988; his son's wish to live together, his death in 2010 and his last request; 2012 the Hachioji medical prison; October 4, 2015: dead, 43 years after the sentence (moves: letters fly, the son's empty place, the bed, the year counter) ---- */
const QI = {
  name: '家族', ch: '母と息子', bgm: 'memory',
  init(S) { S.tMomD = at(S, 'L29', 3) - 0.3; S.tSon = at(S, 'L30', 0) - 0.3; S.tSonD = at(S, 'L30', 3) - 0.3; S.tWill = at(S, 'L30', 5) - 0.3; S.tHosp = at(S, 'L31', 0) - 0.3; S.tEnd = at(S, 'L32', 0) - 0.3; S.t43 = at(S, 'L32', 3) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.t43) { bgF(c, '#0c0c14', t); const n = Math.floor(lerp(1972, 2015, sg(t, S.t43, S.t43 + 2.5))); plate(c, 100, 70, String(n), '#f8e8b0'); plate(c, 70, 110, '死刑確定から43年', '#f8e8b0'); return { z: 1.02, fx: 160, fy: 96 }; }
    if (t > S.tEnd) { prison(c, t, {}); dim(c, 0.4); plate(c, 40, 120, '八王子医療刑務所', '#f8e8b0'); yearFlash(c, t, S.tEnd + 0.2, '2015', 216, 10, '10月4日'); return { z: 1.04 + 0.04 * sg(t, S.tEnd, S.dur), fx: 160, fy: 96 }; }
    if (t > S.tHosp) { bgF(c, '#5c6464', t); R(c, 0, 150, W, 40, '#3c4444'); R(c, 80, 120, 160, 24, '#e8e8e0'); R(c, 80, 112, 20, 32, '#c8c8c0'); E(c, 104, 116, 9, 8, '#c8a888'); R(c, 100, 112, 4, 6, '#d8d8d0'); R(c, 260, 60, 4, 90, '#a8a8a8'); R(c, 250, 60, 24, 30, '#d8e8f0'); yearFlash(c, t, S.tHosp + 0.2, '2012', 216, 10, ''); plate(c, 40, 44, '寝たきり', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tWill) { bgF(c, '#14141c', t); docPaper(c, 200, 30, 90, 100, '遺言'); plate(c, 40, 70, '父には知らせないで', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 96 }; }
    if (t > S.tSonD) { hamlet(c, t); dim(c, 0.4); person(c, SON, 160, 156, { k: 'is2', expr: 'sad' }); yearFlash(c, t, S.tSonD + 0.2, '2010', 216, 10, '62歳'); return { z: 1.1, fx: 160, fy: 110 }; }
    if (t > S.tSon) { hamlet(c, t); person(c, SON, 140, 156, { k: 'is', blink: blinkOf(t, 6) }); shadow(c, OKUNISHI_OLD, 180, 156, { k: 'iso', col: '#8c8c9c' }); return { z: 1.1, fx: 160, fy: 110 }; }
    if (t < at(S, 'L29', 2) - 0.3) { hamlet(c, t); person(c, MOTHER_O, 160, 156, { k: 'imo', blink: blinkOf(t, 5) }); R(c, 172, 126, 12, 9, '#f0ece0'); L(c, 172, 126, 178, 131, '#a8a090'); L(c, 184, 126, 178, 131, '#a8a090'); return { z: 1.14, fx: 165, fy: 112 }; }
    cellBg(c, t); person(c, OKUNISHI_OLD, 260, 168, { k: 'im', blink: blinkOf(t, 6) }); const n = Math.floor(lerp(0, 8, sg(t, 0.5, S.tMomD))); for (let i = 0; i < n; i++) R(c, 40 + (i % 4) * 30, 90 + Math.floor(i / 4) * 30 + Math.sin(t * 2 + i) * 2, 24, 18, '#f0ece0');
    if (t > S.tMomD) { yearFlash(c, t, S.tMomD + 0.2, '1988', 216, 10, '母 88歳'); dim(c, 0.2); }
    return { z: 1.06, fx: 160, fy: 110 };
  }
};

/* ---- QJ: still asked — his sister takes up the petition; 2020: commercial glue on the seal paper; 2024: the 10th petition refused, one judge dissents; "who put poison in the wine?" (moves: the seal under a lens, ten stamps, a question mark) ---- */
const QJ = {
  name: '問い', ch: '今も続く問い', bgm: 'eerie',
  init(S) { S.tSis = at(S, 'L33', 0) - 0.3; S.tGlue = at(S, 'L33', 2) - 0.3; S.t24 = at(S, 'L34', 0) - 0.3; S.tDiss = at(S, 'L34', 3) - 0.3; S.tQ = at(S, 'L35', 0) - 0.3; S.tStill = at(S, 'L35', 4) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tStill) { hamlet(c, t); for (let i = 0; i < 3; i++) person(c, i === 1 ? SISTER : LAWYERS[i ? 1 : 0], 120 + i * 40, 156, { k: 'js' + i, blink: blinkOf(t, i + 4) }); return { z: 1.08, fx: 160, fy: 110 }; }
    if (t > S.tQ) { bgF(c, '#0c0810', t); wineBottle(c, 160, 170, {}); TX(c, '？', 154 + Math.sin(t * 2) * 2, 50, '#c8c8e0', 16, null); if (t > at(S, 'L35', 3) - 0.3) plate(c, 200, 100, '答え：死刑', '#f8c8c8'); return { z: 1.1, fx: 160, fy: 110 }; }
    if (t > S.tDiss) { courtroom(c, t); for (let i = 0; i < 5; i++) person(c, JUDGE, 100 + i * 30, 112, { k: 'jj' + i, expr: i === 4 ? 'sad' : 'normal' }); glow(c, 220, 80, 16, 30, '#f8e8b0', 0.3); plate(c, 60, 110, '一人の裁判官の意見', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.t24) { bgF(c, '#1c1814', t); for (let i = 0; i < 10; i++) { const x = 30 + (i % 5) * 56, y = 40 + Math.floor(i / 5) * 70; R(c, x, y, 44, 56, '#f0ece0'); if (t > S.t24 + 0.4 + i * 0.2) TX(c, '棄却', x + 6, y + 18, '#c81818', 16, null); } yearFlash(c, t, S.t24 + 0.2, '2024', 216, 10, '10回目'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tGlue) { bgF(c, '#1c1c24', t); seal(c, 110, 90, 4); E(c, 200, 110, 34, 34, '#c8d8e8'); E(c, 200, 110, 30, 30, '#88a8c8'); R(c, 226, 136, 30, 8, '#5c4c3c'); for (let i = 0; i < 5; i++) E(c, 190 + (i % 3) * 8, 104 + Math.floor(i / 3) * 10, 3, 3, '#f8f0a0'); yearFlash(c, t, S.tGlue + 0.2, '2020', 216, 10, '鑑定'); plate(c, 40, 44, '市販ののりの成分', '#f8e8b0'); return { z: 1.06, fx: 170, fy: 110 }; }
    hamlet(c, t); person(c, SISTER, 160, 156, { k: 'jsi', blink: blinkOf(t, 5) }); docPaper(c, 200, 60, 70, 80, '再審請求');
    return { z: 1.1, fx: 170, fy: 110 };
  }
};

/* ---- QM: the memorial — the Kannon by the graves, raised for the seventh memorial in 1967; the hall torn down in 1987, a park now; prayers for the five (moves: the five lights, the slow dim) ---- */
const QM = {
  name: '供養塔', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tPark = at(S, 'L36b', 0) - 0.3; S.tPray = at(S, 'L37', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tPray) { memorial(c, t); lights5(c, t, 108, 150); dim(c, 0.25 * sg(t, S.tPray + 2, S.tPray + 14)); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tPark) { VG(c, 0, 0, W, 120, ['#8cb0d0', '#b8cce0', '#e0e4d8']); PF(c, [0, 110, 60, 70, 140, 90, 230, 60, 320, 96, 320, 120, 0, 120], '#4c6c4c'); R(c, 0, 118, W, 72, '#7c9c5c'); R(c, 120, 130, 80, 4, '#8c6c44'); R(c, 124, 134, 4, 10, '#8c6c44'); R(c, 192, 134, 4, 10, '#8c6c44'); yearFlash(c, t, S.tPark + 0.2, '1987', 216, 10, '公民館の跡'); return { z: 1.06, fx: 160, fy: 110 }; }
    memorial(c, t); yearFlash(c, t, 0.6, '1967', 216, 10, '七回忌');
    return { z: 1.04 + 0.04 * sg(t, 0, S.tPark), fx: 160, fy: 100 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '宴会', ch: '', bgm: 'eerie', init(S) { S.tV = at(S, 'S1', 3) - 0.3; S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { if (t > S.tV) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 's1j' }); person(c, OKUNISHI, 160, 172, { k: 's1o' }); stamp(c, t, at(S, 'S1', 3) - 0.1, 76, 56, '無罪', 64, '#3c6cc8'); stamp(c, t, at(S, 'S1', 5) - 0.1, 244, 56, '死刑', 64); return { z: 1.08, fx: 160, fy: 108 }; } hallInside(c, t, { back: seated(t, 4, 0, 's1'), dark: 0.4 * sg(t, at(S, 'S1', 2), S.tV) }); return { z: 1.12, fx: 200, fy: 110 }; } };
const SS2 = { name: '1961年の夜', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { if (t > at(S, 'S2', 2) - 0.3) { hallInside(c, t, { back: seated(t, 4, 2, 's2') }); return { z: 1.1, fx: 160, fy: 104 }; } hall(c, t, { night: true }); return { z: 1.04 + 0.06 * sg(t, 0, S.dur), fx: 160, fy: 92 }; } };
