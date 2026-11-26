/* ================= 記録 #023 大久保清: scenes ================= */
const OC = (c, t) => closeUp(c, t, okuboFace({ blink: blinkOf(t, 6), jail: true }), { bg: ['#14100c', '#3c3024'], spk: 'okubo' });
const JC = (c, t) => closeUp(c, t, judgeFace({ blink: blinkOf(t, 5) }), { bg: ['#1c140c', '#4c3824'], spk: 'judge' });
// the eight women, remembered as soft lights (never drawn as victims)
function lights8(c, t, x, y, n = 8, o = {}) { for (let i = 0; i < n; i++) { const lx = x + (i % 4) * 26, ly = y + Math.floor(i / 4) * 22; const a = o.out && i < o.out ? 0.12 : 0.55 + 0.15 * Math.sin(t * 2 + i); c.save(); c.globalAlpha = a; glow(c, lx, ly, 10, 10, '#f8e8b0', 0.6); E(c, lx, ly, 3, 3, '#f8f0d8'); c.restore(); } }

/* ---- NZ: cold open — May 13, 1971, dusk in Gunma: dozens of cars chase one white coupe; not the police — a brother and his friends; the coupe's driver had taken eight lives (moves: the road scrolls, the cars close in, eight lights) ---- */
const NZ = {
  name: '白いクーペ', ch: '追跡', bgm: 'pulse',
  init(S) { S.tBro = at(S, 'C1', 0) - 0.3; S.tMan = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tMan) { R(c, 0, 0, W, H, '#06060c'); coupe(c, 60, 130, { lights: true }); lights8(c, t, 190, 60, 8); return { z: 1.04 + 0.05 * sg(t, S.tMan, S.dur), fx: 160, fy: 100 }; }
    countryRoad(c, t, { dusk: true, v: 220 }); const k = t > S.tBro ? 1 : sg(t, 0, S.tBro);
    coupe(c, 200 + Math.sin(t * 3) * 4, 158, { lights: true }); for (let i = 0; i < 3; i++) sedan(c, lerp(-60, 10, k) + i * -70 + 30, 160 - (i % 2) * 2, ['#5c6c7c', '#7c5c4c', '#4c6c4c'][i], { lights: true });
    yearFlash(c, t, 0.4, '1971', 216, 10, '5月13日'); if (t > S.tBro) plate(c, 40, 104, '妹を探す兄と、仲間たち', '#f8e8b0');
    return { z: 1.06, fx: 150, fy: 112 };
  }
};

/* ---- NA: the boy and the young man — 1935, Yawata village; "Bocchan"; bullied in wartime; a radio shop that failed; shoplifted parts (moves: the village, children pointing, customers leaving, the closed sign) ---- */
const NA = {
  name: '生い立ち', ch: '生い立ち', bgm: 'memory',
  init(S) { S.tWar = at(S, 'L2', 0) - 0.3; S.tShop = at(S, 'L3', 1) - 0.3; S.tFail = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFail) { radioShop(c, t, { sign: t > at(S, 'L4', 2) - 0.3 }); person(c, OKUBO, 120, 156, { k: 'af', expr: 'sad' }); if (t < at(S, 'L4', 1)) for (let i = 0; i < 2; i++) person(c, SEARCHERS[i], lerp(200, 340, sg(t, S.tFail + 0.5, S.tFail + 3)) + i * 24, 156, { k: 'cu' + i, f: Math.floor(t * 4) & 3 }); else person(c, POLICE, 200, 156, { k: 'ap', flip: true }); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tShop) { radioShop(c, t); person(c, OKUBO, 160, 156, { k: 'as', blink: blinkOf(t, 5), arm: 'wave' }); yearFlash(c, t, S.tShop + 0.3, '1953', 216, 10, 'ラジオ店'); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tWar) { village(c, t); person(c, OKUBO_KID, 160, 154, { k: 'aw', expr: 'sad', blink: blinkOf(t, 4) }); for (let i = 0; i < 3; i++) person(c, CLASSMATES[i], 210 + i * 24, 154, { k: 'cl' + i, flip: true, arm: i === 1 ? 'up' : null }); return { z: 1.1, fx: 190, fy: 112 }; }
    village(c, t); person(c, FATHER, 120, 154, { k: 'af0' }); person(c, MOTHER, 146, 154, { k: 'am0', expr: 'smile' }); person(c, OKUBO_KID, 168, 154, { k: 'ak0', blink: blinkOf(t, 4) }); yearFlash(c, t, 0.4, '1935', 216, 10, '八幡村');
    return { z: 1.08, fx: 150, fy: 110 };
  }
};

/* ---- NB: the crimes before — 1955 arrest; model prisoner, parole; again within half a year; 1962 marriage under a false name, a son, a poetry book, the milk shop; extortion; 1967 prison; four commendations; March 2, 1971 (moves: stamps, the gate opens and shuts) ---- */
const NB = {
  name: '模範囚', ch: '繰り返された罪', bgm: 'dread',
  init(S) { S.tPrison = at(S, 'L6', 0) - 0.3; S.tWed = at(S, 'L7', 0) - 0.3; S.tShop = at(S, 'L7', 3) - 0.3; S.tFuchu = at(S, 'L8', 0) - 0.3; S.tAward = at(S, 'L9', 0) - 0.3; S.tOut = at(S, 'L9', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tOut) { prison(c, t, { open: true, name: '府中刑務所' }); person(c, OKUBO, lerp(160, 230, sg(t, S.tOut + 0.5, S.tOut + 3)), 156, { k: 'bo', f: Math.floor(t * 4) & 3 }); yearFlash(c, t, S.tOut + 0.2, '1971', 216, 10, '3月2日'); return { z: 1.06, fx: 180, fy: 104 }; }
    if (t > S.tAward) { R(c, 0, 0, W, H, '#2c2c30'); for (let i = 0; i < 4; i++) { const tt = S.tAward + 0.8 + i * 0.6; if (t > tt) { R(c, 54 + i * 56, 50, 46, 60, '#f0ece0'); R(c, 54 + i * 56, 50, 46, 6, '#c8a048'); E(c, 77 + i * 56, 94, 8, 8, '#c81818'); } } plate(c, 100, 120, '表彰　4度', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tFuchu) { prison(c, t, { name: '府中刑務所' }); person(c, OKUBO, 160, 156, { k: 'bf', expr: 'sad' }); person(c, POLICE, 190, 156, { k: 'bp', flip: true }); person(c, WIFE, 60, 156, { k: 'bw', expr: 'shock' }); yearFlash(c, t, S.tFuchu + 1.5, '1967', 216, 10, ''); return { z: 1.06, fx: 150, fy: 104 }; }
    if (t > S.tShop) { milkShop(c, t); person(c, OKUBO, 130, 156, { k: 'bm' }); person(c, WIFE, 154, 156, { k: 'bw2', expr: 'smile' }); poem(c, 196, 92, 34, 44, {}); R(c, 196, 92, 34, 8, '#2c3c6c'); plate(c, 190, 66, '詩集', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 108 }; }
    if (t > S.tWed) { R(c, 0, 0, W, H, '#e8dcc8'); R(c, 0, 120, W, 70, '#b8a07c'); R(c, 100, 30, 120, 60, '#f0e8d8'); TX(c, '寿', 150, 50, '#c81818', 16, null); person(c, OKUBO, 140, 156, { k: 'bwd', blink: blinkOf(t, 5) }); person(c, WIFE, 176, 156, { k: 'bwf', expr: 'smile' }); yearFlash(c, t, S.tWed + 0.3, '1962', 216, 10, '結婚'); if (t > at(S, 'L7', 1) - 0.3) plate(c, 40, 46, '偽の名前と、偽の経歴', '#f8c8c8'); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tPrison) { prison(c, t, { open: t > S.tPrison + 2.5, name: '松本少年刑務所' }); if (t > S.tPrison + 2.5) person(c, OKUBO, 200, 156, { k: 'bpr', f: Math.floor(t * 4) & 3 }); return { z: 1.06, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#14141c'); R(c, 0, 120, W, 70, '#1c1c24'); policeStation(c, t, { night: true, name: '前橋' }); dim(c, 0.3); stamp(c, t, 1.2, 110, 70, '逮捕', 70); yearFlash(c, t, 0.4, '1955', 216, 10, '');
    return { z: 1.04, fx: 160, fy: 100 };
  }
};

/* ---- NC: March 1971 — the wife says no; family against living together; "despair" (his own words); the white coupe bought with his parents' money; March 31; 170 km a day, 150 women; 30 in the car; eight (moves: the door that stays shut, the coupe shining, the odometer, eight lights) ---- */
const NC = withCuts({
  name: '白いクーペの男', ch: '1971年の春', bgm: 'dread',
  init(S) { S.tCar = at(S, 'L11', 0) - 0.3; S.tFirst = at(S, 'L12', 0) - 0.3; S.tDrive = at(S, 'L13', 0) - 0.3; S.tEight = at(S, 'L14', 0) - 0.3; S.tWho = at(S, 'L15', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWho) { R(c, 0, 0, W, H, '#0c0c14'); lights8(c, t, 100, 56, 8); const js = ['女子高校生', 'ウェイトレス', '県庁の臨時職員', '会社員']; for (let i = 0; i < 4; i++) if (t > at(S, 'L15', 1 + i) - 0.3) plate(c, 40 + (i % 2) * 140, 96 + Math.floor(i / 2) * 22, js[i], '#e8e0f0'); if (t < at(S, 'L15', 1) - 0.3) plate(c, 100, 104, '16歳から21歳', '#e8e0f0'); return { z: 1.02, fx: 160, fy: 96 }; }
    if (t > S.tEight) { R(c, 0, 0, W, H, '#0c0c14'); const n = Math.floor(lerp(0, 30, sg(t, S.tEight + 0.3, S.tEight + 2))); for (let i = 0; i < n; i++) E(c, 40 + (i % 10) * 26, 50 + Math.floor(i / 10) * 20, 3, 3, i < 8 && t > at(S, 'L14', 1) - 0.3 ? '#f8e8b0' : '#5c5c6c'); if (t > at(S, 'L14', 1) - 0.3) plate(c, 120, 118, '8人', '#f8e8b0'); return { z: 1.02, fx: 160, fy: 96 }; }
    if (t > S.tDrive) { countryRoad(c, t, { v: 240 }); coupe(c, 130, 158, {}); odo(c, 40, 46, Math.floor(lerp(0, 7650, sg(t, S.tDrive, S.tEight)))); const n = Math.floor(lerp(0, 150, sg(t, S.tDrive + 2, S.tEight - 0.5))); plate(c, 40, 80, '声をかけた　' + n + '人', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tFirst) { countryRoad(c, t, { night: true }); coupe(c, lerp(-80, 140, sg(t, S.tFirst, S.tFirst + 3)), 158, { lights: true }); yearFlash(c, t, S.tFirst + 0.2, '1971', 216, 10, '3月31日'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tCar) { R(c, 0, 0, W, H, '#1c1c24'); R(c, 0, 130, W, 60, '#2c2c34'); glow(c, 160, 110, 120, 50, '#f8f0e0', 0.25); coupe(c, 124, 150, {}); for (let i = 0; i < 4; i++) { const u = fr(t * 0.8 + i / 4); P(c, 130 + u * 70, 128 - i * 3, '#ffffff'); } plate(c, 40, 46, '当時最新型のクーペ', '#f8e8b0'); return { z: 1.1, fx: 160, fy: 120 }; }
    R(c, 0, 0, W, H, '#c8b898'); R(c, 0, 120, W, 70, '#8c7c5c'); R(c, 180, 40, 70, 96, '#4c3c2c'); R(c, 186, 46, 58, 90, '#5c4838'); person(c, OKUBO, 140, 156, { k: 'cw', expr: 'sad', blink: blinkOf(t, 4) }); if (t > at(S, 'L10', 2) - 0.3) for (let i = 0; i < 2; i++) shadow(c, i ? MOTHER : FATHER, 270 + i * 22, 156, { k: 'cf' + i, col: '#6c5c48', flip: true });
    return { z: 1.06, fx: 170, fy: 104 };
  }
}, [['L10b', (c, t) => closeUp(c, t, okuboFace({ blink: blinkOf(t, 7) }), { bg: ['#1c0c0c', '#4c2424'], talk: false })]]);
const NH0 = { name: '男の目', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, okuboFace({ dark: true }), [[18, 20], [29, 20]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- ND: the turn — the seventh woman's brother forms a search party; her bicycle in Fujioka; he watches; a man comes, strokes the bicycle with gloved hands (pause) to wipe the prints; the car and its plate; the dealer; (pause) Okubo Kiyoshi (moves: the brother in his parked car, the gloved hand, the plate lighting up, the name) ---- */
const ND = {
  name: '兄の捜索隊', ch: '兄の捜索隊', bgm: 'pulse',
  init(S) { S.tBike = at(S, 'L18', 0) - 0.3; S.tMan = at(S, 'L19', 0) - 0.3; S.tGlove = at(S, 'L19', 2) - 0.3; S.tWipe = at(S, 'L19b', 0) - 0.3; S.tPlate = at(S, 'L20', 0) - 0.3; S.tDealer = at(S, 'L21', 0) - 0.3; S.tName = at(S, 'L21b', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#06060c'); const k = sg(t, S.tName + 0.1, S.tName + 0.5); c.save(); c.globalAlpha = k; R(c, 90, 70, 140, 40, '#f0ece0'); TX(c, '大久保清', 128, 80, '#1c1c1c', 16, null); c.restore(); return { z: 1.1 + 0.1 * k, fx: 160, fy: 90 }; }
    if (t > S.tDealer) { R(c, 0, 0, W, H, '#c8c0b0'); R(c, 0, 120, W, 70, '#8c8478'); R(c, 40, 40, 110, 70, '#f0ece0'); for (let i = 0; i < 6; i++) R(c, 48, 50 + i * 9, 90 - (i % 3) * 14, 2, '#5c5c5c'); R(c, 180, 72, 40, 18, '#2c2c2c'); E(c, 200, 80, 6, 6, '#5c5c5c'); R(c, 178, 62, 44, 8, '#2c2c2c'); E(c, 180, 66, 5, 5, '#2c2c2c'); E(c, 220, 66, 5, 5, '#2c2c2c'); person(c, DETS[0], 240, 156, { k: 'dd', flip: true }); plate(c, 40, 120, '販売店に照会', '#f8e8b0'); return { z: 1.04, fx: 140, fy: 90 }; }
    if (t > S.tPlate) { countryRoad(c, t, {}); coupe(c, lerp(150, 380, sg(t, S.tPlate + 0.6, S.tPlate + 3.5)), 158, {}); person(c, ANI, 90, 156, { k: 'dp', expr: 'shock' }); R(c, 60, 44, 140, 26, '#f0f0ec'); R(c, 62, 46, 136, 22, '#2c5c3c'); TX(c, '群馬　・・－・・', 70, 48, '#f8f8f0', 16, null); return { z: 1.06, fx: 140, fy: 100 }; }
    if (t > S.tWipe) { R(c, 0, 0, W, H, '#0c0c10'); bicycle(c, 120, 140); const k = Math.sin((t - S.tWipe) * 3); R(c, 96 + k * 10, 110, 46, 10, '#8c6c4c'); R(c, 140 + k * 10, 108, 16, 14, '#2c2c2c'); for (let f = 0; f < 4; f++) R(c, 156 + k * 10, 109 + f * 3, 5, 2, '#2c2c2c'); plate(c, 120, 80, '手袋の手', '#f8e8b0'); for (let i = 0; i < 5; i++) { c.save(); c.globalAlpha = 0.5 * (1 - fr(t + i / 5)); E(c, 150 + i * 6, 126, 3, 2, '#c8c8c8'); c.restore(); } return { z: 2.0, fx: 150, fy: 120 }; }
    if (t > S.tGlove) { countryRoad(c, t, {}); bicycle(c, 170, 156); person(c, OKUBO, 162, 156, { k: 'dg', arm: Math.floor(t * 3) % 2 ? 'up' : null }); R(c, 172, 118, 6, 5, '#2c2c2c'); return { z: 1.5, fx: 175, fy: 126 }; }
    if (t > S.tMan) { countryRoad(c, t, {}); bicycle(c, 170, 156); sedan(c, 30, 160, '#4c5c6c'); shadow(c, ANI, 66, 136, { k: 'dw', col: '#1c2430', s: 0.6 }); person(c, OKUBO, lerp(330, 210, sg(t, S.tMan + 0.3, S.tMan + 2.6)), 156, { k: 'dm', flip: true, f: t < S.tMan + 2.6 ? Math.floor(t * 4) & 3 : -1 }); return { z: 1.06, fx: 180, fy: 110 }; }
    if (t > S.tBike) { countryRoad(c, t, {}); bicycle(c, 170, 156); person(c, ANI, 130, 156, { k: 'db', expr: 'shock' }); plate(c, 40, 46, '藤岡市内', '#f8e8b0'); return { z: 1.1, fx: 160, fy: 112 }; }
    R(c, 0, 0, W, H, '#c8b898'); R(c, 0, 120, W, 70, '#8c7c5c'); R(c, 20, 30, 120, 70, '#e8e4d8'); for (let i = 0; i < 4; i++) R(c, 30, 40 + i * 14, 80, 3, '#5c5c5c'); person(c, ANI, 170, 156, { k: 'da', arm: 'wave' }); for (let i = 0; i < 4; i++) person(c, SEARCHERS[i], 210 + i * 26, 156, { k: 'ds' + i, flip: true });
    if (t > at(S, 'L17', 1) - 0.3) plate(c, 40, 46, '捜索隊', '#f8e8b0'); return { z: 1.04, fx: 170, fy: 104 };
  }
};

/* ---- NE: the chase and the silence — 70 cars, May 12; the car chase on the 13th; no bodies, no proof; "I'll never say where" as revenge on the police; Lake Haruna, May 21; poems and Rilke; May 26–27; "秋まで、言わない" (moves: cars, the dark station window, lanterns by the lake, a poem read aloud) ---- */
const NE = withCuts({
  name: '秋まで言わない', ch: '逮捕', bgm: 'dread',
  init(S) { S.tStation = at(S, 'L23', 0) - 0.3; S.tHaruna = at(S, 'L25', 0) - 0.3; S.tPoem = at(S, 'L26', 0) - 0.3; S.tFound = at(S, 'L27', 1) - 0.3; S.tSilent = at(S, 'L28', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSilent) { interro(c, t); person(c, OKUBO_JAIL, 130, 150, { k: 'es', blink: blinkOf(t, 6) }); person(c, DETS[1], 200, 150, { k: 'ed', flip: true }); return { z: 1.1, fx: 160, fy: 104 }; }
    if (t > S.tFound) { countryRoad(c, t, {}); ER(c, 160, 160, 40, 6, '#5c4c34'); R(c, 124, 152, 72, 6, '#3c4c5c'); for (let i = 0; i < 3; i++) person(c, POLICE, 100 + i * 60, 158, { k: 'ef' + i, flip: i === 2 }); yearFlash(c, t, S.tFound + 0.2, '5.27', 216, 10, '翌日'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tPoem) { interro(c, t); person(c, OKUBO_JAIL, 120, 150, { k: 'ep', blink: blinkOf(t, 6) }); person(c, DETS[2], 210, 150, { k: 'ed2', flip: true }); poem(c, 140, 80, 50, 36, { title: t > at(S, 'L26', 2) - 0.3 ? 'リルケ' : null }); return { z: 1.1, fx: 160, fy: 100 }; }
    if (t > S.tHaruna) { VG(c, 0, 0, W, 110, ['#8ca8c8', '#b0c4d4', '#d8dcd8']); PF(c, [0, 96, 60, 60, 120, 40, 180, 64, 250, 50, 320, 84, 320, 110, 0, 110], '#5c7c6c'); R(c, 0, 100, W, 30, '#5c8cac'); R(c, 0, 128, W, 62, '#6c7c4c'); for (let i = 0; i < 3; i++) person(c, POLICE, 140 + i * 40, 158, { k: 'eh' + i, flip: i === 2 }); plate(c, 40, 46, '榛名湖の近く', '#f8e8b0'); yearFlash(c, t, S.tHaruna + 0.3, '1971', 216, 10, '5月21日'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tStation) { policeStation(c, t, { night: true, name: '警察署' }); plate(c, 40, 70, '藤岡警察署', '#f8e8b0'); if (t > at(S, 'L24', 0) - 0.3) plate(c, 40, 46, '遺体の場所は、話さない', '#f8a0a0'); return { z: 1.06 + 0.04 * sg(t, S.tStation, S.tHaruna), fx: 160, fy: 92 }; }
    countryRoad(c, t, { dusk: true, v: 260 }); const ph = t > at(S, 'L22', 2) - 0.3; coupe(c, ph ? 150 : 200 + Math.sin(t * 4) * 6, 158, { lights: true }); for (let i = 0; i < 4; i++) sedan(c, (ph ? 90 : 20) - i * 66 + (i % 2) * 10, 160, ['#5c6c7c', '#7c5c4c', '#4c6c4c', '#6c6c4c'][i], { lights: true }); if (ph) { sedan(c, 206, 160, '#5c5c6c', { lights: true }); person(c, ANI, 270, 160, { k: 'ec', arm: 'up', flip: true }); }
    plate(c, 40, 46, ph ? 'カーチェイスの末に' : '70台の車', '#f8e8b0'); return { z: 1.06, fx: 170, fy: 112 };
  }
}, [['O1', OC]]);

/* ---- NF: the detective alone — June 24; seven conditions; refused; the detective's own poem; June 27 at dawn; silence again, the July 13 reversal; the National Police Agency steps in; Matsuida, an empty jail, cell No. 3; July 20–29, five more; digs at midnight; 80 days; the divorce (moves: the list struck out, the poem, the dawn, the lone cell, stamps) ---- */
const NF = {
  name: '警部の詩', ch: '取り調べ', bgm: 'eerie',
  init(S) { S.tRefuse = at(S, 'L30', 0) - 0.3; S.tPoem = at(S, 'L30', 2) - 0.3; S.tDawn = at(S, 'L31', 1) - 0.3; S.tAgain = at(S, 'L32', 0) - 0.3; S.tNPA = at(S, 'L33', 0) - 0.3; S.tAlone = at(S, 'L34', 0) - 0.3; S.tThree = at(S, 'L35', 0) - 0.3; S.tFive = at(S, 'L36', 0) - 0.3; S.tDays = at(S, 'L37', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDays) { R(c, 0, 0, W, H, '#1c1c24'); const n = Math.floor(lerp(0, 80, sg(t, S.tDays + 0.3, S.tDays + 3))); for (let i = 0; i < n; i++) R(c, 30 + (i % 20) * 13, 40 + Math.floor(i / 20) * 16, 10, 12, '#c8c0b0'); plate(c, 110, 116, 'およそ80日', '#f8e8b0'); return { z: 1.02, fx: 160, fy: 96 }; }
    if (t > S.tFive) { nightDig(c, t); const ds = ['7.20', '7.21', '7.22', '7.29']; for (let i = 0; i < 4; i++) stamp(c, t, at(S, 'L36', i) - 0.1, 50 + i * 72, 54, ds[i], 60); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tThree) { cellBg(c, t); R(c, 100, 40, 40, 20, '#e8e4d8'); TX(c, '第3房', 102, 42, '#1c1c1c', 16, null); person(c, OKUBO_JAIL, 260, 168, { k: 'f3', expr: 'sad' }); return { z: 1.1, fx: 190, fy: 100 }; }
    if (t > S.tAlone) { cellBg(c, t); person(c, OKUBO_JAIL, 260, 168, { k: 'fa', blink: blinkOf(t, 6) }); dim(c, 0.2); plate(c, 40, 46, '松井田警察署', '#f8e8b0'); return { z: 1.06, fx: 200, fy: 100 }; }
    if (t > S.tNPA) { policeStation(c, t, { name: '警察庁' }); for (let i = 0; i < 3; i++) person(c, DETS[i], 206 + i * 34, 166, { k: 'fn' + i, f: Math.floor(t * 4 + i) & 3 }); const rs = ['条件で取引しない', '現場に連れて行かない', '身柄を移す']; for (let i = 0; i < 3; i++) if (t > at(S, 'L33', 1 + i) - 0.3) plate(c, 40, 44 + i * 22, rs[i], '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tAgain) { interro(c, t); person(c, OKUBO_JAIL, 120, 150, { k: 'fg', arm: 'wave' }); person(c, KEIBU, 210, 150, { k: 'fk', flip: true, expr: 'sad' }); yearFlash(c, t, at(S, 'L32', 2) - 0.3, '7.13', 216, 10, ''); return { z: 1.1, fx: 160, fy: 100 }; }
    if (t > S.tDawn) { VG(c, 0, 0, W, 120, ['#3c3c6c', '#c88c7c', '#f8c890']); PF(c, [0, 100, 80, 60, 170, 84, 260, 54, 320, 88, 320, 120, 0, 120], '#3c3c4c'); R(c, 0, 118, W, 72, '#2c2c24'); for (let i = 0; i < 3; i++) person(c, POLICE, 120 + i * 40, 158, { k: 'fd' + i }); yearFlash(c, t, S.tDawn + 0.2, '6.27', 216, 10, '未明'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tPoem) { interro(c, t); person(c, OKUBO_JAIL, 120, 150, { k: 'fp', blink: blinkOf(t, 6) }); person(c, KEIBU, 210, 150, { k: 'fk2', flip: true }); poem(c, 140, 76, 50, 40, { col: '#2c3c6c' }); return { z: 1.2, fx: 165, fy: 100 }; }
    interro(c, t); person(c, OKUBO_JAIL, 120, 150, { k: 'fc', blink: blinkOf(t, 6) }); person(c, KEIBU, 210, 150, { k: 'fk0', flip: true }); R(c, 136, 64, 50, 52, '#f0ece0'); for (let i = 0; i < 7; i++) { R(c, 142, 70 + i * 6, 38, 2, '#3c3c3c'); if (t > S.tRefuse + 0.5 + i * 0.3) L(c, 140, 71 + i * 6, 184, 71 + i * 6, '#c81818', 2); } if (t < S.tRefuse) plate(c, 40, 46, '7つの条件', '#f8e8b0');
    return { z: 1.1, fx: 160, fy: 100 };
  }
};

/* ---- NG: the court — Oct 25, 1971, Maebashi; "なにも、いうことはありません"; the psychiatric report; rants, a dismissed lawyer, the judges sued; the state lawyer who wanted an apology; Feb 22, 1973: death; no appeal (moves: the gavel, the papers, the stamp) ---- */
const NG = withCuts({
  name: '判決', ch: '裁判', bgm: 'requiem',
  init(S) { S.tReport = at(S, 'L39', 0) - 0.3; S.tRant = at(S, 'L40', 0) - 0.3; S.tLawyer = at(S, 'L41', 0) - 0.3; S.tVerdict = at(S, 'L42', 0) - 0.3; S.tFinal = at(S, 'L43', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFinal) { R(c, 0, 0, W, H, '#1c1814'); R(c, 100, 40, 120, 80, '#f0ece0'); for (let i = 0; i < 6; i++) R(c, 110, 52 + i * 9, 96, 2, '#5c5c5c'); stamp(c, t, S.tFinal + 1.5, 196, 100, '確定', 64); yearFlash(c, t, S.tFinal + 0.3, '1973', 216, 10, '3月9日'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tVerdict) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'gj', blink: blinkOf(t, 5) }); person(c, OKUBO_JAIL, 160, 172, { k: 'gv' }); stamp(c, t, at(S, 'L42', 1) - 0.1, 80, 60, '死刑', 70); yearFlash(c, t, S.tVerdict + 0.3, '1973', 216, 10, '2月22日'); return { z: 1.08, fx: 160, fy: 108 }; }
    if (t > S.tLawyer) { courtroom(c, t); person(c, BENGO, 120, 172, { k: 'gl', arm: 'wave' }); person(c, OKUBO_JAIL, 170, 172, { k: 'gl2', flip: true }); plate(c, 40, 46, '国選弁護人', '#f8e8b0'); return { z: 1.1, fx: 150, fy: 112 }; }
    if (t > S.tRant) { courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'gj2', blink: blinkOf(t, 5) }); person(c, OKUBO_JAIL, 160, 172, { k: 'gr', arm: Math.floor(t * 2) % 2 ? 'up' : 'wave' }); const ws = ['弁護人を解任', '裁判官を訴える']; for (let i = 0; i < 2; i++) if (t > at(S, 'L40', 2 + i) - 0.3) plate(c, 40, 44 + i * 22, ws[i], '#f8c8c8'); return { z: 1.08, fx: 160, fy: 108 }; }
    if (t > S.tReport) { R(c, 0, 0, W, H, '#2c2c30'); R(c, 90, 30, 140, 100, '#f0ece0'); TX(c, '精神鑑定', 128, 36, '#1c1c1c', 16, null); for (let i = 0; i < 6; i++) R(c, 100, 60 + i * 10, 120 - (i % 2) * 20, 2, '#5c5c5c'); return { z: 1.04, fx: 160, fy: 90 }; }
    courtroom(c, t); person(c, JUDGE, 160, 112, { k: 'gj0', blink: blinkOf(t, 5) }); person(c, OKUBO_JAIL, 160, 172, { k: 'g0' }); for (let i = 0; i < 3; i++) person(c, DETS[i], 40 + i * 24, 166, { k: 'gd' + i }); yearFlash(c, t, 0.4, '1971', 216, 10, '初公判');
    return { z: 1.08, fx: 160, fy: 108 };
  }
}, [['O2', OC], ['J1', JC]]);

/* ---- NI: afterwards — the memoir that cast himself as the victim; Jan 22, 1976; no apology, no motive; the brother who found the clue (moves: the book's pages, the detention-centre wall, the brother on the road at dusk) ---- */
const NI = {
  name: 'その後', ch: 'その後', bgm: 'requiem',
  init(S) { S.tExec = at(S, 'L45', 0) - 0.3; S.tWhy = at(S, 'L46', 0) - 0.3; S.tBro = at(S, 'L47', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBro) { countryRoad(c, t, { dusk: true }); bicycle(c, 190, 156); person(c, ANI, 160, 156, { k: 'ib', expr: 'sad', blink: blinkOf(t, 6) }); return { z: 1.1, fx: 170, fy: 112 }; }
    if (t > S.tWhy) { R(c, 0, 0, W, H, '#14141c'); TX(c, '？', 154, 70, '#c8c8e0', 16, null); lights8(c, t, 100, 110, 8); return { z: 1.02, fx: 160, fy: 96 }; }
    if (t > S.tExec) { prison(c, t, { name: '東京拘置所' }); dim(c, 0.4); yearFlash(c, t, S.tExec + 0.3, '1976', 216, 10, '1月22日'); return { z: 1.04, fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#1c1814'); R(c, 110, 40, 100, 90, '#e8e0d0'); R(c, 110, 40, 6, 90, '#a8a090'); TX(c, '訣別の章', 128, 50, '#2c2c2c', 16, null); for (let i = 0; i < 6; i++) R(c, 126, 76 + i * 8, 70, 2, '#5c5c5c');
    return { z: 1.06, fx: 160, fy: 96 };
  }
};
const NM = {
  name: '鎮魂', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { countryRoad(c, t, { dusk: true }); flowers8(c, t, 126, 120); dim(c, 0.25 * sg(t, 2, 14)); return { z: 1.06, fx: 160, fy: 112 }; }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '追跡', ch: '', bgm: 'pulse', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { countryRoad(c, t, { dusk: true, v: 240 }); coupe(c, 190, 158, { lights: true }); for (let i = 0; i < 2; i++) sedan(c, 20 - i * 70, 160, ['#5c6c7c', '#7c5c4c'][i], { lights: true }); return { z: 1.1, fx: 170, fy: 116 }; } };
const SS2 = { name: '1971年の春', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { countryRoad(c, t, { v: 200 }); coupe(c, 130, 158, {}); return { z: 1.06 + 0.06 * sg(t, 0, S.dur), fx: 160, fy: 112 }; } };
