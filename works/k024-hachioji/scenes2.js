/* ================= 記録 #024 八王子スーパー強盗殺人事件: scenes ================= */
// a stand-in office with the light on, seen from the car park at night
function litOffice(c, t, o = {}) { superFront(c, t, { night: true, lit: true, closed: true }); if (o.flash && fr(t * 1.3) < 0.08) { glow(c, 272, 59, 40, 30, '#f8f8e0', 0.6); } }
const MZ = {
  name: '夏祭りの夜', ch: '閉店後の事務所', bgm: 'dread',
  init(S) { S.tOffice = at(S, 'C1', 0) - 0.3; S.tSafe = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tSafe) { R(c, 0, 0, W, H, '#0c0c10'); R(c, 100, 40, 120, 100, '#4c4c54'); R(c, 106, 46, 108, 88, '#5c5c64'); E(c, 160, 80, 16, 16, '#8c8c94'); E(c, 160, 80, 6, 6, '#2c2c34'); R(c, 186, 100, 6, 14, '#c8a048'); plate(c, 92, 112, '500万円を超える売上金', '#f8e8b0'); return { z: 1.04 + 0.05 * sg(t, S.tSafe, S.dur), fx: 160, fy: 92 }; }
    if (t > S.tOffice) { litOffice(c, t); lights3(c, t, 132, 110); dim(c, 0.2); return { z: 1.1, fx: 220, fy: 90 }; }
    litOffice(c, t, { flash: t > at(S, 'C0', 3) - 0.3 }); yearFlash(c, t, 0.4, '1995', 216, 10, '7月30日'); if (t > at(S, 'C0', 3) - 0.3) plate(c, 40, 46, '乾いた音が、数回', '#f8a0a0');
    return { z: 1.06, fx: 200, fy: 96 };
  }
};

/* ---- MA: the store and the three — Nanpei Owada; the part-timer, 47, and two high-school girls; a promise to go to the festival; Sunday sale; 5 pm, the night shift (moves: the sign, the registers, the girls laughing) ---- */
const MA = {
  name: 'ナンペイ大和田店', ch: '事件の日', bgm: 'memory',
  init(S) { S.tThree = at(S, 'L2', 0) - 0.3; S.tPromise = at(S, 'L2', 3) - 0.3; S.tSale = at(S, 'L3', 0) - 0.3; S.tShift = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tShift) { superInside(c, t); person(c, PART, 218, 150, { k: 'as', blink: blinkOf(t, 5) }); person(c, GIRLS[0], 278, 150, { k: 'ag', blink: blinkOf(t, 4), flip: true }); clockCard(c, 40, 46, '17:00'); return { z: 1.1, fx: 220, fy: 104 }; }
    if (t > S.tSale) { superInside(c, t, { sale: true }); for (let i = 0; i < 4; i++) person(c, CUSTOMERS[i], lerp(-20, 300, fr(t * 0.08 + i / 4)), 156, { k: 'sc' + i, f: Math.floor(t * 4 + i) & 3 }); yearFlash(c, t, S.tSale + 0.3, '日曜日', 216, 10, ''); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tThree) { superInside(c, t); person(c, PART, 130, 156, { k: 'ap', expr: 'smile', blink: blinkOf(t, 5) }); person(c, GIRLS[0], 170, 156, { k: 'ag1', expr: 'smile', blink: blinkOf(t, 4) }); person(c, GIRLS[1], 196, 156, { k: 'ag2', expr: 'smile', blink: blinkOf(t, 6), flip: true }); if (t > S.tPromise) plate(c, 40, 46, '仕事のあと、お祭りへ', '#f8e8b0'); return { z: 1.14, fx: 165, fy: 112 }; }
    superFront(c, t, {}); for (let i = 0; i < 3; i++) person(c, CUSTOMERS[i], 60 + i * 70, 158, { k: 'fc' + i, f: Math.floor(t * 4 + i) & 3 }); plate(c, 40, 100, '八王子市大和田町', '#f8e8b0');
    return { z: 1.04, fx: 160, fy: 100 };
  }
};

/* ---- MB: the evening — 5:30 a man peering in; 6:30 the bon-odori starts; 6:50 the 16-year-old arrives by bicycle; 8:30 a man wandering, 8:45 a white car crawling past; 8:56 the last customers; 9:00 closing, the money carried outside and up the stairs — everyone knew; 9:07 the drums stop (moves: clock cards, the dance circling, the car, the stairs) ---- */
const MB = {
  name: 'その夜の経過', ch: '閉店まで', bgm: 'eerie',
  init(S) { S.tOdori = at(S, 'L6', 0) - 0.3; S.tBike = at(S, 'L7', 0) - 0.3; S.tMan = at(S, 'L8', 0) - 0.3; S.tCar = at(S, 'L8', 3) - 0.3; S.tCouple = at(S, 'L9', 0) - 0.3; S.tClose = at(S, 'L10', 0) - 0.3; S.tStairs = at(S, 'L10', 2) - 0.3; S.tKnew = at(S, 'L11', 0) - 0.3; S.tQuiet = at(S, 'L12', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tQuiet) { bonOdori(c, t, { drum: false, dance: false }); dim(c, 0.3 * sg(t, S.tQuiet, S.tQuiet + 2)); clockCard(c, 40, 46, '21:07'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tKnew) { superFront(c, t, { night: true, closed: true }); for (let i = 0; i < 3; i++) { R(c, 4 + i * 2, 30 + i * 30, 22, 18, '#f8e8a0'); shadow(c, CUSTOMERS[i], 14, 50 + i * 30, { k: 'kn' + i, s: 0.4, col: '#2c2418' }); } person(c, PART, 262, 108, { k: 'kp', s: 0.8 }); R(c, 270, 92, 10, 6, '#c8c0a8'); return { z: 1.08, fx: 160, fy: 96 }; }
    if (t > S.tStairs) { superFront(c, t, { night: true, closed: true }); const k = sg(t, S.tStairs, S.tStairs + 4); person(c, GIRLS[0], lerp(240, 286, k), lerp(150, 98, k), { k: 'gs', f: Math.floor(t * 4) & 3, s: 0.9 }); R(c, lerp(248, 294, k), lerp(124, 72, k), 12, 8, '#c8c0a8'); return { z: 1.3, fx: 260, fy: 100 }; }
    if (t > S.tClose) { superFront(c, t, { night: true, closed: true }); clockCard(c, 40, 46, '21:00'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tCouple) { superFront(c, t, { night: true }); person(c, COUPLE[0], 120, 158, { k: 'c0', flip: true }); person(c, COUPLE[1], 140, 158, { k: 'c1', flip: true }); R(c, 116, 140, 10, 10, '#f0e8d0'); sedan(c, lerp(60, -120, sg(t, S.tCouple + 3, S.tCouple + 6)), 176, '#e8e8e0'); clockCard(c, 40, 46, '20:56'); return { z: 1.06, fx: 150, fy: 110 }; }
    if (t > S.tCar) { superFront(c, t, { night: true }); sedan(c, lerp(330, -80, sg(t, S.tCar, S.tCouple)), 176, '#e8e8e0', { lights: true }); clockCard(c, 40, 46, '20:45'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tMan) { superInside(c, t); shadow(c, STRANGER, lerp(40, 140, sg(t, S.tMan, S.tCar)), 156, { k: 'mm', col: '#2c2c34', f: Math.floor(t * 3) & 3 }); person(c, GIRLS[0], 218, 150, { k: 'mg' }); person(c, GIRLS[1], 246, 150, { k: 'mg2', flip: true }); clockCard(c, 40, 46, '20:30'); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tBike) { superFront(c, t, { night: true }); bicycle(c, lerp(-40, 120, sg(t, S.tBike, S.tBike + 3)), 160, '#c86c7c'); person(c, GIRLS[1], lerp(-30, 130, sg(t, S.tBike, S.tBike + 3)), 156, { k: 'bk', f: Math.floor(t * 4) & 3 }); clockCard(c, 40, 46, '18:50'); return { z: 1.06, fx: 150, fy: 108 }; }
    if (t > S.tOdori) { bonOdori(c, t); clockCard(c, 40, 46, '18:30'); return { z: 1.04, fx: 160, fy: 100 }; }
    superFront(c, t, {}); shadow(c, STRANGER, 200, 158, { k: 'm0', col: '#3c3c44' }); clockCard(c, 40, 100, '17:30'); plate(c, 40, 46, '白いシャツの、50代の男', '#f8e8b0');
    return { z: 1.06, fx: 180, fy: 104 };
  }
};

/* ---- MC: nine minutes — 9:15 the call, the lock; they were leaving; 9:16 unlocked (pause) pushed back; 9:17 the sound, the couple at the crossing; 9:20 the friend arrives, the light on; waiting, the restaurant, back with the landlady; ~10 pm, found (moves: the clock, the lock icon, the window light, the car, the door) ---- */
const MC = {
  name: '9時15分', ch: '午後9時15分', bgm: 'dread',
  init(S) { S.tLeave = at(S, 'L14', 0) - 0.3; S.tOpen = at(S, 'L15', 0) - 0.3; S.tPushed = at(S, 'L15b', 0) - 0.3; S.tSound = at(S, 'L16', 0) - 0.3; S.tCar = at(S, 'L17', 0) - 0.3; S.tWait = at(S, 'L18', 0) - 0.3; S.tFound = at(S, 'L19', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFound) { superFront(c, t, { night: true, lit: true, closed: true }); person(c, CHIJIN, 270, 98, { k: 'ff', expr: 'shock', s: 0.8 }); person(c, OKAMI, 250, 110, { k: 'fo', expr: 'shock', s: 0.8 }); clockCard(c, 40, 46, '22:00'); return { z: 1.3, fx: 250, fy: 96 }; }
    if (t > S.tWait) { superFront(c, t, { night: true, lit: true, closed: true }); sedan(c, 120, 176, '#5c6c7c'); shadow(c, CHIJIN, 152, 158, { k: 'fw', col: '#1c2430', s: 0.6 }); const k = (t - S.tWait) / 6; clockCard(c, 40, 46, k < 0.5 ? '21:45' : '21:50'); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tCar) { superFront(c, t, { night: true, lit: true, closed: true }); sedan(c, lerp(-80, 120, sg(t, S.tCar, S.tCar + 2.5)), 176, '#5c6c7c', { lights: true }); clockCard(c, 40, 46, '21:20'); return { z: 1.06, fx: 180, fy: 100 }; }
    if (t > S.tSound) { VG(c, 0, 0, W, 130, ['#04040c', '#0c0c1c', '#141428']); R(c, 0, 128, W, 62, '#1c1c24'); R(c, 0, 150, W, 2, '#e8e8e0'); R(c, 230, 60, 3, 70, '#3c3c44'); E(c, 231, 58, 5, 5, Math.floor(t) % 2 ? '#c81818' : '#3c1c1c'); person(c, COUPLE[0], 140, 156, { k: 'sx0', expr: 'shock', flip: true }); person(c, COUPLE[1], 160, 156, { k: 'sx1', expr: 'shock', flip: true }); if (fr(t * 1.2) < 0.15) dim(c, 0.3, '#f8f0e0'); clockCard(c, 40, 46, '21:17'); return { z: 1.1, fx: 150, fy: 112 }; }
    if (t > S.tPushed) { superFront(c, t, { night: true, lit: true, closed: true }); shadow(c, STRANGER, 262, 84, { k: 'sp', col: '#04040a', s: 0.85 }); dim(c, 0.35); return { z: 1.5, fx: 260, fy: 80 }; }
    if (t > S.tOpen) { R(c, 0, 0, W, H, '#14141c'); R(c, 120, 50, 80, 70, '#3c3c44'); R(c, 130, 60, 60, 50, '#5c5c64'); E(c, 160, 72, 12, 12, '#8c8c94'); R(c, 152, 80, 16, 22, '#8c8c94'); R(c, 156, lerp(72, 60, sg(t, S.tOpen + 0.3, S.tOpen + 0.8)), 8, 14, '#5cf85c'); clockCard(c, 40, 46, '21:16'); return { z: 1.06, fx: 160, fy: 90 }; }
    if (t > S.tLeave) { office(c, t); person(c, PART, 120, 150, { k: 'lv0' }); person(c, GIRLS[0], 150, 150, { k: 'lv1' }); person(c, GIRLS[1], 176, 150, { k: 'lv2' }); return { z: 1.1, fx: 150, fy: 104 }; }
    office(c, t); person(c, PART, 150, 150, { k: 'tl', arm: 'up' }); R(c, 152, 108, 5, 10, '#2c2c34'); R(c, 20, 60, 30, 30, '#141418'); R(c, 28, 70, 14, 12, t > at(S, 'L13', 3) - 0.3 ? '#f8c848' : '#5c5c64'); clockCard(c, 200, 30, '21:15');
    return { z: 1.08, fx: 160, fy: 100 };
  }
};
const MH0 = { name: '金庫', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, kinkoFace({ dark: true }), [[18, 20], [32, 20]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- MD: what was left — the three (lights), the tape; under five minutes; five shots, one at the safe; the turn: nothing taken; 5.26 million yen, the combination taped to the desk; purses untouched; a straight line of footprints; why? (moves: the clock sweep, bullet icons, the safe door, the footprint path) ---- */
const MD = {
  name: '奪われなかった金', ch: '何も奪われていなかった', bgm: 'dread',
  init(S) { S.tFive = at(S, 'L21', 0) - 0.3; S.tShots = at(S, 'L22', 0) - 0.3; S.tTurn = at(S, 'L23', 0) - 0.3; S.tMoney = at(S, 'L24', 0) - 0.3; S.tPurse = at(S, 'L25', 0) - 0.3; S.tSteps = at(S, 'L26', 0) - 0.3; S.tWhy = at(S, 'L27', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWhy) { R(c, 0, 0, W, H, '#0c0c14'); R(c, 120, 50, 80, 70, '#4c4c54'); TX(c, '？', 154, 74, '#f8e8b0', 16, null); return { z: 1.04 + 0.06 * sg(t, S.tWhy, S.dur), fx: 160, fy: 90 }; }
    if (t > S.tSteps) { R(c, 0, 0, W, H, '#c8c4b4'); R(c, 40, 40, 240, 100, '#d8d4c4'); R(c, 40, 40, 240, 2, '#8c8474'); R(c, 40, 40, 2, 100, '#8c8474'); R(c, 278, 40, 2, 100, '#8c8474'); R(c, 40, 138, 240, 2, '#8c8474'); R(c, 40, 120, 20, 20, '#5c4c3c'); TX(c, '入口', 44, 98, '#2c2c2c', 16, null); R(c, 240, 50, 30, 30, '#4c4c54'); TX(c, '金庫', 238, 84, '#2c2c2c', 16, null); const n = Math.floor(lerp(0, 10, sg(t, S.tSteps + 0.5, S.tSteps + 4))); for (let i = 0; i < n; i++) { const x = 64 + i * 18, y = 118 - i * 5; E(c, x, y, 3, 5, '#3c3428'); } return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tPurse) { R(c, 0, 0, W, H, '#c8c4b4'); for (let i = 0; i < 3; i++) { R(c, 80 + i * 60, 80, 40, 28, ['#8c4c5c', '#5c7cac', '#c8a048'][i]); R(c, 80 + i * 60, 80, 40, 6, shadeCol(['#8c4c5c', '#5c7cac', '#c8a048'][i], 0.8)); } plate(c, 90, 120, '手つかずのまま', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 94 }; }
    if (t > S.tMoney) { R(c, 0, 0, W, H, '#14141c'); R(c, 90, 30, 110, 100, '#4c4c54'); R(c, 96, 36, 98, 88, '#2c2c34'); for (let i = 0; i < 8; i++) R(c, 110 + (i % 4) * 18, 60 + Math.floor(i / 4) * 20, 14, 16, '#c8b888'); R(c, 200, 70, 10, 6, '#c8a048'); if (t > at(S, 'L24', 2) - 0.3) plate(c, 104, 104, '約526万円', '#f8e8b0'); if (t > at(S, 'L24', 3) - 0.3) { R(c, 226, 60, 50, 36, '#f8f0a0'); TX(c, '番号', 234, 70, '#2c2c2c', 16, null); } return { z: 1.06, fx: 170, fy: 84 }; }
    if (t > S.tTurn) { R(c, 0, 0, W, H, '#0c0c10'); R(c, 100, 40, 120, 100, '#4c4c54'); R(c, 106, 46, 108, 88, '#5c5c64'); E(c, 160, 80, 16, 16, '#8c8c94'); E(c, 160, 80, 6, 6, '#2c2c34'); R(c, 186, 100, 6, 14, '#c8a048'); return { z: 1.06 + 0.3 * eOut(sg(t, S.tTurn, S.tTurn + 2)), fx: 160, fy: 86 }; }
    if (t > S.tShots) { R(c, 0, 0, W, H, '#14141c'); for (let i = 0; i < 5; i++) { const tt = S.tShots + 0.4 + i * 0.4; if (t > tt) { R(c, 70 + i * 40, 70, 8, 22, i === 4 ? '#c8a048' : '#8c7c5c'); E(c, 74 + i * 40, 70, 4, 4, i === 4 ? '#c8a048' : '#8c7c5c'); } } if (t > at(S, 'L22', 1) - 0.3) plate(c, 160, 110, '1発は金庫へ', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tFive) { R(c, 0, 0, W, H, '#0c0c14'); E(c, 160, 86, 40, 40, '#e8e4d8'); E(c, 160, 86, 36, 36, '#f8f4e8'); const a = -Math.PI / 2 + Math.PI / 2 * sg(t, S.tFive + 0.3, S.tFive + 3); c.save(); c.globalAlpha = 0.35; c.fillStyle = '#c81818'; c.beginPath(); c.moveTo(160, 86); c.arc(160, 86, 34, -Math.PI / 2, a); c.fill(); c.restore(); L(c, 160, 86, 160 + Math.cos(a) * 30, 86 + Math.sin(a) * 30, '#141414', 2); plate(c, 110, 132, '5分未満', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#0c0c14'); lights3(c, t, 130, 70); tape(c, 160, 118); return { z: 1.04, fx: 160, fy: 96 };
  }
};

/* ---- ME: robbery or grudge — both lines of inquiry; the threatening letter with a cutter blade; the office burgled before, women alone at night; pistol robberies across Tama; the clues: a 26 cm shoe and iron dust, a crude Philippine revolver fired with skill, the tape with a partial print and sweat (moves: two arrows, the letter, map pins, evidence cards) ---- */
const ME = {
  name: '強盗か、恨みか', ch: '強盗か、恨みか', bgm: 'eerie',
  init(S) { S.tLetter = at(S, 'L29', 0) - 0.3; S.tBurg = at(S, 'L30', 0) - 0.3; S.tTama = at(S, 'L31', 0) - 0.3; S.tClues = at(S, 'L32', 0) - 0.3; S.tShoe = at(S, 'L33', 0) - 0.3; S.tGun = at(S, 'L34', 0) - 0.3; S.tTape = at(S, 'L35', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTape) { R(c, 0, 0, W, H, '#1c2028'); tape(c, 110, 90, '#a89878'); fingerprint(c, 210, 86, 1, '#a8d8f8'); if (t > at(S, 'L35', 2) - 0.3) for (let i = 0; i < 4; i++) E(c, 120 + i * 8, 120 + (i % 2) * 4, 2, 3, '#a8d8f8'); plate(c, 40, 46, '指紋の一部と、汗', '#a8f8f0'); return { z: 1.06, fx: 160, fy: 90 }; }
    if (t > S.tGun) { R(c, 0, 0, W, H, '#1c2028'); revolver(c, 120, 70, 2.2, '#3c3c44'); plate(c, 40, 46, 'フィリピン製', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 96 }; }
    if (t > S.tShoe) { R(c, 0, 0, W, H, '#1c2028'); ER(c, 120, 90, 22, 46, '#c8c0a8'); for (let i = 0; i < 9; i++) R(c, 104, 56 + i * 8, 32, 2, '#8c8474'); plate(c, 90, 140, '26センチ', '#f8e8b0'); if (t > at(S, 'L33', 1) - 0.3) { for (let i = 0; i < 30; i++) P(c, 190 + (i * 37) % 70, 60 + (i * 23) % 50, '#a8a8b0'); plate(c, 180, 120, '鉄粉', '#f8e8b0'); } return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tClues) { office(c, t, { dim: 0.4 }); for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3 + i); glow(c, 80 + i * 80, 110, 16, 10, '#f8e8b0', 0.5); c.restore(); } return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tTama) { R(c, 0, 0, W, H, '#c8d4c0'); for (let i = 0; i < 12; i++) L(c, 20 + i * 26, 30, 30 + i * 24, 140, '#a8b4a0'); PF(c, [30, 60, 120, 40, 230, 50, 290, 90, 250, 140, 90, 138, 40, 110], '#d8e0cc'); TX(c, '多摩地域', 120, 86, '#3c4c3c', 16, null); const n = Math.min(6, Math.floor((t - S.tTama) * 1.5)); for (let i = 0; i < n; i++) { const x = 70 + (i * 53) % 180, y = 60 + (i * 31) % 60; R(c, x, y - 10, 2, 10, '#5c5c5c'); E(c, x + 1, y - 12, 4, 4, '#c81818'); } return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tBurg) { superFront(c, t, { night: true, closed: true }); shadow(c, STRANGER, 280, 98, { k: 'bu', col: '#04040a', s: 0.7 }); plate(c, 40, 46, '何度も空き巣に', '#f8e8b0'); return { z: 1.2, fx: 240, fy: 96 }; }
    if (t > S.tLetter) { R(c, 0, 0, W, H, '#1c1814'); R(c, 90, 40, 140, 90, '#f0ece0'); for (let i = 0; i < 5; i++) R(c, 100, 52 + i * 12, 110 - i * 10, 2, '#5c5c5c'); PF(c, [190, 100, 220, 96, 222, 100, 192, 104], '#c8c8d0'); plate(c, 40, 140 - 14, '差出人は不明', '#f8c8c8'); return { z: 1.06, fx: 160, fy: 90 }; }
    R(c, 0, 0, W, H, '#14141c'); R(c, 60, 60, 80, 40, '#3c4c6c'); TX(c, '強盗', 82, 70, '#f8f8f0', 16, null); R(c, 180, 60, 80, 40, '#6c3c4c'); TX(c, '恨み', 202, 70, '#f8f8f0', 16, null); TX(c, '？', 154, 70, '#c8c8e0', 16, null);
    return { z: 1.04, fx: 160, fy: 90 };
  }
};

/* ---- MF: the long investigation — 2010, the statute of limitations abolished; the testimony from a Chinese prison; the man in Canada, the passport case, sent back; 2015, the fingerprint: 8 points of 12; the store renamed, closed 1998, now a car park; "turning point" for gun crime; the students' campaign; the quiet summer night; the couple still sought (moves: stamps, planes, the point meter, the empty lot, the banner) ---- */
const MF = {
  name: '終わらない捜査', ch: '終わらない捜査', bgm: 'requiem',
  init(S) { S.tChina = at(S, 'L37', 0) - 0.3; S.tCanada = at(S, 'L38', 0) - 0.3; S.tPrint = at(S, 'L39', 0) - 0.3; S.tPts = at(S, 'L40', 0) - 0.3; S.tStore = at(S, 'L41', 0) - 0.3; S.tGun = at(S, 'L42', 0) - 0.3; S.tSchool = at(S, 'L43', 0) - 0.3; S.tNight = at(S, 'L44', 0) - 0.3; S.tAsk = at(S, 'L45', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tAsk) { R(c, 0, 0, W, H, '#e8e4d8'); R(c, 80, 30, 160, 110, '#f8f8f0'); R(c, 80, 30, 160, 20, '#2c3c6c'); TX(c, '情報提供を', 120, 31, '#f8f8f0', 16, null); for (let i = 0; i < 2; i++) shadow(c, COUPLE[i], 140 + i * 40, 128, { k: 'ap' + i, col: '#8c8c9c', s: 0.9 }); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tNight) { bonOdori(c, t, { drum: false, dance: false }); dim(c, 0.35); return { z: 1.04 + 0.04 * sg(t, S.tNight, S.tAsk), fx: 160, fy: 96 }; }
    if (t > S.tSchool) { VG(c, 0, 0, W, 120, ['#8cb0d8', '#b8cce0', '#e0e4d8']); R(c, 0, 116, W, 74, '#a89c7c'); R(c, 60, 40, 200, 24, '#f8f8f0'); TX(c, '銃器根絶を考える会', 92, 44, '#c81818', 16, null); for (let i = 0; i < 4; i++) person(c, STUDENTS[i], 100 + i * 40, 156, { k: 'ss' + i, arm: i % 2 ? 'up' : null }); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tGun) { R(c, 0, 0, W, H, '#14141c'); revolver(c, 60, 70, 1.6, '#5c5c64'); L(c, 130, 80, 180, 80, '#c8c8c8', 2); PF(c, [180, 74, 192, 80, 180, 86], '#c8c8c8'); superInside(c, t); dim(c, 0.6); revolver(c, 60, 70, 1.6, '#c8c8d0'); plate(c, 40, 46, '日本の銃犯罪のターニングポイント', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tStore) { const ph = t > at(S, 'L41', 3) - 0.3; if (!ph) { superFront(c, t, { closed: true }); R(c, 30, 56, 220, 18, '#c8a040'); TX(c, '店の名前を変えて', 80, 57, '#2c2c2c', 16, null); yearFlash(c, t, at(S, 'L41', 2) - 0.3, '1998', 216, 10, '閉店'); } else { VG(c, 0, 0, W, 120, ['#e8a85c', '#f8c880', '#f8e0b0']); R(c, 0, 120, W, 70, '#5c5c5c'); for (let x = 20; x < W; x += 50) R(c, x, 130, 2, 50, '#e8e8e0'); sedan(c, 60, 176, '#8c8c94'); sedan(c, 180, 176, '#5c6c7c'); plate(c, 40, 46, '跡地は、駐車場', '#f8e8b0'); } return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tPts) { R(c, 0, 0, W, H, '#1c2028'); for (let i = 0; i < 12; i++) R(c, 40 + i * 20, 70, 16, 24, i < 8 ? '#a8f8f0' : '#3c4c5c'); plate(c, 40, 46, '8点', '#a8f8f0'); plate(c, 240, 46, '基準 12点', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tPrint) { R(c, 0, 0, W, H, '#1c2028'); fingerprint(c, 110, 86, 1.1, '#a8d8f8'); fingerprint(c, 210, 86, 1.1, '#c8c8d8'); yearFlash(c, t, S.tPrint + 0.3, '2015', 216, 10, ''); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tCanada) { VG(c, 0, 0, W, 130, ['#7c9cc8', '#a8c0d8', '#d8dcd8']); R(c, 0, 126, W, 64, '#5c7c9c'); const k = sg(t, S.tCanada + 1, S.tCanada + 5); R(c, lerp(240, 40, k), 60, 50, 8, '#f0f0ec'); PF(c, [lerp(240, 40, k) + 20, 60, lerp(240, 40, k) + 30, 48, lerp(240, 40, k) + 34, 60], '#f0f0ec'); TX(c, 'カナダ', 250, 100, '#2c2c2c', 16, null); TX(c, '日本', 30, 100, '#2c2c2c', 16, null); if (t > at(S, 'L38', 3) - 0.3) plate(c, 60, 46, '供述は得られず', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tChina) { cellBg(c, t); shadow(c, DETS[0], 260, 168, { k: 'cn', col: '#2c2c34' }); person(c, DETS[1], 140, 168, { k: 'cd', flip: true }); yearFlash(c, t, S.tChina + 0.3, '2009', 216, 10, '中国'); return { z: 1.06, fx: 200, fy: 100 }; }
    R(c, 0, 0, W, H, '#1c1814'); R(c, 100, 40, 120, 80, '#f0ece0'); TX(c, '公訴時効', 128, 56, '#1c1c1c', 16, null); stamp(c, t, at(S, 'L36', 3) - 0.1, 200, 100, '廃止', 64); yearFlash(c, t, 0.4, '2010', 216, 10, '');
    return { z: 1.04, fx: 160, fy: 90 };
  }
};
const MM = {
  name: '鎮魂', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { VG(c, 0, 0, W, 130, ['#04040c', '#0c0c1c', '#1c1428']); R(c, 0, 128, W, 62, '#1c1c20'); for (let x = 20; x < W; x += 50) R(c, x, 136, 2, 40, '#3c3c3c'); flowers3(c, t, 138, 130); dim(c, 0.25 * sg(t, 2, 14)); return { z: 1.06, fx: 160, fy: 112 }; }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '事務所', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { litOffice(c, t); return { z: 1.2, fx: 240, fy: 90 }; } };
const SS2 = { name: '盆踊り', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { bonOdori(c, t); return { z: 1.04 + 0.06 * sg(t, 0, S.dur), fx: 160, fy: 100 }; } };
