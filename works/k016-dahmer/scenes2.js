/* ================= 記録 #016 ジェフリー・ダーマー: scenes ================= */
const GY = 150;

/* ---- DX: cold open — a man runs down the night street with a handcuff; two officers; the apartment, one window lit green (moves: running, siren light, the window glows) ---- */
const DX = withCuts({
  name: '手錠の男', ch: '213号室', bgm: 'eerie',
  init(S) { S.tCry = at(S, 'C1', 0) - 0.3; S.tApt = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tApt) { nightSky(c, t); street(c, t, GY + 10); apartment(c, t, 90, GY + 10, { lit213: true }); const u = sg(t, S.tApt, S.tApt + 3); person(c, COPS[0], lerp(20, 120, u), GY + 16, { k: 'dx', f: u < 1 ? Math.floor(t * 4) & 3 : -1 }); person(c, COPS[1], lerp(0, 100, u), GY + 16, { k: 'dx', f: u < 1 ? Math.floor(t * 4 + 1) & 3 : -1 }); person(c, EDW, lerp(40, 140, u), GY + 16, { k: 'dx', arm: 'point' }); glow(c, 136, 74, 18, 12, '#c8d878', 0.4 + 0.2 * Math.sin(t * 3)); return { z: 1.03 + 0.08 * ss(sg(t, S.tApt, S.dur)), fx: 150, fy: 90 }; }
    nightSky(c, t); for (let i = 0; i < 6; i++) { const x = i * 56 - 4, h = 60 + (i * 29 % 30); R(c, x, GY - h, 52, h, ['#3c3444', '#443c4c', '#34303c'][i % 3]); } street(c, t, GY);
    const u = sg(t, at(S, 'C0', 3) - 0.3, S.tCry + 1); person(c, EDW, lerp(330, 190, u), GY + 8, { k: 'run', f: u < 1 ? Math.floor(t * 8) & 3 : -1, flip: true, arm: u >= 1 ? 'wave' : null, expr: 'shock' }); handcuff(c, lerp(330, 190, u) - 16, GY - 20, 0.8);
    const b = Math.floor(t * 4) & 1; R(c, 20, GY - 22, 90, 18, '#e8e8e0'); R(c, 34, GY - 32, 50, 12, '#e8e8e0'); R(c, 52, GY - 36, 14, 4, b ? '#e81c1c' : '#2c5cf8'); glow(c, 59, GY - 34, 30, 16, b ? '#e81c1c' : '#2c5cf8', 0.35); for (const wx of [38, 94]) E(c, wx, GY - 4, 7, 7, '#141414');
    yearFlash(c, t, at(S, 'C0', 0), 1991, 216, 10, '7月22日');
    return { z: 1.04, fx: 200, fy: 110 };
  }
}, [['M1', (c, t, S) => closeUp(c, t, jeffFace({ dark: true, blink: blinkOf(t, 4) }), { bg: ['#0c0408', '#3c1018'], glow: '#c81818' })]]);

/* ---- DA: childhood — the cold house; the chemistry set; jars and the bone pile; the rope through the house (moves: the jar bubbles, the boy kneels, the rope sways) ---- */
const DA_ = {
  name: '少年時代', ch: '少年時代', bgm: 'memory',
  init(S) { S.tKit = at(S, 'L3', 0) - 0.3; S.tBones = at(S, 'L4', 0) - 0.3; S.tRope = at(S, 'L5', 0) - 0.3; S.tAlone = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tAlone) { R(c, 0, 0, W, H, '#3c3428'); for (let x = 0; x < W; x += 20) R(c, x, 0, 10, 150, '#443a2c'); R(c, 0, 150, W, 90, '#2c2418'); R(c, 220, 50, 60, 80, '#5c7c9c'); R(c, 224, 54, 52, 72, '#8cacc8'); const u = sg(t, S.tAlone + 0.4, at(S, 'L6', 4)); person(c, DAD, lerp(200, 340, u), 160, { k: 'go', f: u < 1 ? Math.floor(t * 4) & 3 : -1 }); person(c, MOM, lerp(170, 360, u), 160, { k: 'go', f: u < 1 ? Math.floor(t * 4 + 1) & 3 : -1 }); person(c, JEFF, 90, 160, { k: 'al', expr: 'sad', blink: blinkOf(t, 4) }); yearFlash(c, t, S.tAlone + 0.2, 1978, 8, 10, '離婚'); return { z: 1.03 + 0.04 * ss(sg(t, at(S, 'L6', 5), S.dur)), fx: 110, fy: 110 }; }
    if (t > S.tRope) { R(c, 0, 0, W, H, '#4c4434'); for (let x = 0; x < W; x += 20) R(c, x, 0, 10, 150, '#544a38'); R(c, 0, 150, W, 90, '#3c2c1c'); const sw = Math.sin(t * 1.2) * 2; L(c, 160, 0, 160 + sw, 150, '#c8a860', 2); person(c, DAD, 80, 160, { k: 'rp', flip: true }); person(c, MOM, 250, 160, { k: 'rp', expr: 'angry' }); person(c, JEFF_KID, 160, 170, { k: 'rp', expr: 'sad' }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tBones) { nightSky(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#3c4c2c'); R(c, 20, 60, 120, 64, '#c8b89c'); PF(c, [12, 62, 80, 36, 148, 62], '#5c3c2c'); boneMound(c, 210, 150); boneMound(c, 240, 154); person(c, JEFF_KID, 190, 166, { k: 'bn', arm: 'dig' }); return { z: 1.04, fx: 200, fy: 120 }; }
    if (t > S.tKit) { R(c, 0, 0, W, H, '#2c2418'); glow(c, 160, 70, 120, 60, '#f8e0a0', 0.2 + 0.05 * Math.sin(t * 3)); R(c, 40, 120, 240, 8, '#5c4430'); for (let i = 0; i < 8; i++) bottlesJar(c, 60 + i * 26, 120, t); for (let i = 0; i < 6; i++) { const u = fr(t * 0.7 + i / 6); P(c, 66 + (i * 26) % 180, 112 - u * 10, '#e8f8e8'); } person(c, JEFF_KID, 260, 166, { k: 'kt', arm: 'fwd', blink: blinkOf(t, 3) }); return { z: 1.04, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#4c4434'); for (let x = 0; x < W; x += 20) R(c, x, 0, 10, 150, '#544a38'); R(c, 0, 150, W, 90, '#3c2c1c'); R(c, 40, 90, 70, 50, '#5c3c24'); glow(c, 75, 70, 30, 20, '#f8e0a0', 0.2); person(c, DAD, 70, 160, { k: 'st', flip: true }); person(c, MOM, 240, 160, { k: 'st', expr: 'sad' }); person(c, JEFF_KID, 170, 168, { k: 'st', blink: blinkOf(t, 5) });
    yearFlash(c, t, 0.3, 1960, 216, 10, '誕生');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- DB: 1978 — the hitchhiker, the empty house, the dumbbell (moves: the car rolls, music notes, the lamp swings, then darkness) ---- */
const DB = {
  name: '最初の殺人', ch: '最初の殺人', bgm: 'dread',
  init(S) { S.tHouse = at(S, 'L8', 1) - 0.3; S.tLeave = at(S, 'L9', 0) - 0.3; S.tHit = at(S, 'L9', 4) - 0.3; S.tFirst = at(S, 'L10', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFirst) { R(c, 0, 0, W, H, '#0c0808'); dim(c, 0); const k = sg(t, S.tFirst, S.tFirst + 2); c.save(); c.globalAlpha = 0.7 * k; blit(c, tintSpr(modFig(JEFF, { k: 'f1' }), '#0a0606', 'f1s'), 200, 160, FIG_AX2, FIG_AY2, { s: 2.2 }); c.restore(); bigCap(c, '最初の殺人', 30, 24, '#e81c1c', k); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tHouse) { R(c, 0, 0, W, H, '#3c3428'); for (let x = 0; x < W; x += 20) R(c, x, 0, 10, 150, '#443a2c'); R(c, 0, 150, W, 90, '#2c2418'); const sw = Math.sin(t * (t > S.tHit ? 4 : 1.2)) * 10; L(c, 160, 0, 160 + sw, 34, '#1c1c1c'); PF(c, [150 + sw, 34, 170 + sw, 34, 176 + sw, 44, 144 + sw, 44], '#8c7c4c'); glow(c, 160 + sw, 60, 80, 50, '#f8e0a0', 0.2);
      if (t < S.tLeave) for (let i = 0; i < 4; i++) { const u = fr(t * 0.6 + i / 4); c.save(); c.globalAlpha = 1 - u; R(c, 150 + Math.sin(u * 6 + i) * 20, 110 - u * 70, 3, 8, '#f8e8b0'); E(c, 148 + Math.sin(u * 6 + i) * 20, 118 - u * 70, 3, 2, '#f8e8b0'); c.restore(); }
      person(c, JEFF, 120, 160, { k: 'h1', arm: t > S.tHit ? 'up' : null, expr: t > S.tLeave ? 'angry' : 'smile' }); if (t < S.tHit + 0.4) person(c, HIKER, 200, 160, { k: 'h1', flip: t < S.tLeave, f: t > S.tLeave ? Math.floor(t * 4) & 3 : -1 }); if (t > S.tHit) { R(c, 126, 100, 14, 4, '#3c3c3c'); E(c, 124, 102, 4, 4, '#3c3c3c'); E(c, 142, 102, 4, 4, '#3c3c3c'); dim(c, 0.7 * sg(t, S.tHit + 0.3, S.tHit + 1.5), '#200000'); }
      return { z: 1.04, fx: 160, fy: 110, sx: t > S.tHit && t < S.tHit + 0.4 ? Math.round(Math.sin(t * 70) * 2) : 0 }; }
    nightSky(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#5c5c4c'); for (let i = 0; i < 8; i++) R(c, mod(i * 50 - t * 50, W + 40) - 20, 172, 22, 2, '#e8e0a0'); R(c, 120, 140, 90, 16, '#7c2c2c'); R(c, 140, 128, 44, 14, '#7c2c2c'); R(c, 144, 130, 36, 8, '#8cacc8'); for (const wx of [136, 196]) E(c, wx, 158, 7, 7, '#141414');
    person(c, HIKER, 260, 168, { k: 'hk', flip: true, arm: 'up' });
    yearFlash(c, t, 0.3, 1978, 216, 10, '6月18日'); capPlate(c, t, 0.6, ['オハイオ州', '19歳のヒッチハイカー']);
    return { z: 1.03, fx: 180, fy: 120 };
  }
};

/* ---- DC: drifting — university, the army in Germany, bottles; "you'll hear about me again"; grandmother's house (moves: bottles pile, the flag waves, church bells) ---- */
const DC = withCuts({
  name: '空白の年月', ch: '空白の年月', bgm: 'memory',
  init(S) { S.tArmy = at(S, 'L11', 2) - 0.3; S.tGran = at(S, 'L13', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGran) { nightSky(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#5c7c3c'); R(c, 30, 70, 120, 60, '#d8c8a8'); PF(c, [22, 72, 90, 44, 158, 72], '#7c3c2c'); R(c, 80, 100, 18, 30, '#5c3c24'); R(c, 190, 50, 50, 80, '#c8c0b0'); PF(c, [186, 52, 215, 20, 244, 52], '#5c4c4c'); L(c, 215, 20, 215, 6, '#3c3c3c', 2); L(c, 209, 12, 221, 12, '#3c3c3c', 2); person(c, GRAN, 150, 166, { k: 'gr', expr: 'smile' }); person(c, JEFF, 172, 166, { k: 'gr', blink: blinkOf(t, 4) }); R(c, 250, 90, 50, 30, '#5c3c24'); TX(c, 'CHOCOLATE', 236, 70, '#f8e8b0', 16, '#000000'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tArmy) { VG(c, 0, 0, W, 120, ['#7c8ca0', '#a8b4c0', '#d0d4d4']); R(c, 0, 120, W, 120, '#6c6c5c'); for (let i = 0; i < 4; i++) R(c, 20 + i * 76, 70, 60, 50, '#8c8c7c'); R(c, 160, 20, 3, 60, '#5c5c5c'); const f = Math.sin(t * 3) * 3; PF(c, [163, 22, 200, 24 + f, 200, 40 + f, 163, 38], '#3c5c9c'); person(c, JEFF_ARMY, 120, 168, { k: 'ar' }); const n = Math.floor(sg(t, S.tArmy + 0.5, S.dur) * 12); for (let i = 0; i < n; i++) R(c, 180 + (i % 6) * 10, 160 - Math.floor(i / 6) * 16, 6, 14, i % 2 ? '#5c8c4c' : '#8c6c3c'); capPlate(c, t - S.tArmy, 0.3, ['陸軍', '西ドイツの基地']); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#3c3428'); R(c, 0, 150, W, 90, '#2c2418'); R(c, 40, 40, 100, 70, '#5c7c9c'); for (let i = 0; i < 3; i++) R(c, 40 + i * 33, 40, 2, 70, '#3c2c1c'); R(c, 160, 120, 120, 8, '#5c4430'); const n = Math.floor(sg(t, 0.5, S.tArmy) * 10); for (let i = 0; i < n; i++) R(c, 168 + i * 11, 104, 7, 16, i % 2 ? '#5c8c4c' : '#8c6c3c'); person(c, JEFF, 120, 166, { k: 'un', expr: 'sad' });
    capPlate(c, t, 0.4, ['オハイオ州立大学', '3か月で退学']);
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V1', (c, t, S) => closeUp(c, t, jeffFace({ dark: true, blink: blinkOf(t, 4) }), { bg: ['#0c0408', '#3c1018'], glow: '#c81818' })]]);

/* ---- DD: the routine — a bar, the offer, the drink; grandmother's basement smell; 1989 sentence (moves: neon flickers, the glass, fumes rise) ---- */
const DD = {
  name: 'ルーティンワーク', ch: '手口', bgm: 'dread',
  init(S) { S.tBar = at(S, 'L16', 0) - 0.3; S.tSmell = at(S, 'L18', 0) - 0.3; S.tCourt = at(S, 'L19', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCourt) { R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 30) R(c, x, 0, 4, 150, '#5c4030'); R(c, 0, 150, W, 90, '#3c2c1c'); R(c, 96, 92, 128, 40, '#6c4c34'); E(c, 160, 110, 8, 8, '#c8a040'); person(c, JEFF, 160, 170, { k: 'ct', flip: true }); yearFlash(c, t, S.tCourt + 0.2, 1989, 216, 10, '有罪'); if (t > at(S, 'L19', 3) - 0.3) { R(c, 12, 50, 140, 46, '#000000'); TX(c, '昼：工場', 20, 54, '#f8e8b0', 16, null); TX(c, '夜：施設', 20, 74, '#a8c8f8', 16, null); } return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tSmell) { R(c, 0, 0, W, H, '#2c2820'); for (let x = 0; x < W; x += 24) R(c, x, 0, 12, 150, '#34301e'); R(c, 0, 150, W, 90, '#1c1810'); R(c, 120, 0, 80, 40, '#3c3428'); for (let k = 0; k < 6; k++) R(c, 124 + k * 12, 10 + k * 5, 10, 4, '#5c4c3c'); fumes(c, t, 220, 140, 10, '#8c9c4c'); R(c, 214, 126, 30, 24, '#5c5c64'); R(c, 216, 122, 26, 4, '#3c3c44'); person(c, DAD, 120, 162, { k: 'bs', arm: 'point', expr: 'angry' }); person(c, JEFF, 180, 162, { k: 'bs', flip: true }); return { z: 1.04, fx: 170, fy: 110 }; }
    if (t > S.tBar) { R(c, 0, 0, W, H, '#140c1c'); const on = (Math.floor(t * 3) % 7) !== 0; TX(c, 'CLUB 219', 110, 50, on ? '#f84cc8' : '#5c2c4c', 16, '#000000'); glow(c, 150, 60, 80, 20, '#f84cc8', on ? 0.25 : 0.05); R(c, 0, 120, W, 8, '#5c3c2c'); R(c, 0, 128, W, 112, '#2c1c24'); for (let i = 0; i < 5; i++) R(c, 30 + i * 60, 96, 10, 24, ['#5c8c4c', '#8c6c3c', '#c8c8c0'][i % 3]); person(c, JEFF, 120, 166, { k: 'br', arm: 'fwd', expr: 'smile', blink: blinkOf(t, 3) }); shadow(c, CROWD[0], 200, 166, { k: 'br', col: '#2c2034', flip: true }); if (t > at(S, 'L16', 3) - 0.3) { R(c, 150, 104, 8, 14, DA('#e8c8a8', 0.8)); for (let i = 0; i < 4; i++) { const u = fr(t * 2 + i / 4); P(c, 152 + i, 116 - u * 10, '#ffffff'); } } return { z: 1.04, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#5c4c44'); for (let x = 0; x < W; x += 30) R(c, x, 0, 2, 150, '#6c5c54'); R(c, 0, 150, W, 90, '#3c2c24'); R(c, 50, 70, 10, 80, '#5c3c24'); R(c, 50, 70, 170, 10, '#5c3c24'); R(c, 56, 110, 160, 26, '#e8e4dc'); R(c, 56, 136, 160, 6, '#8c6c4c'); R(c, 60, 100, 34, 12, '#f4f0e8'); for (let k = 0; k < 4; k++) R(c, 210 + k * 2, 136, 2, 14, '#5c3c24'); R(c, 230, 50, 50, 40, '#1c2c4c'); R(c, 233, 53, 44, 34, '#3c5c8c'); dim(c, 0.3); person(c, JEFF, 250, 162, { k: 'ht', expr: 'shock', flip: true });
    yearFlash(c, t, 0.3, 1987, 216, 10, 'ホテル');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- DE: Oxford Apartments #213 — the building, the room: tank, fridge, photos; the drill (moves: fish swim, fumes, a buzzing light) ---- */
const DE = {
  name: 'オックスフォード・アパートメント', ch: '213号室', bgm: 'dread',
  init(S) { S.tRoom = at(S, 'L21', 0) - 0.3; S.tDrill = at(S, 'L22', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRoom) { room213(c, t, { photos: Math.floor(sg(t, at(S, 'L21', 5) - 0.3, S.dur) * 18) }); person(c, JEFF, 180, 166, { k: 'rm', blink: blinkOf(t, 4), arm: t > S.tDrill ? 'hold' : null });
      if (t > S.tDrill) { const v = Math.sin(t * 60) * 1; R(c, 196 + v, 112, 16, 6, '#3c3c44'); R(c, 212 + v, 114, 8, 2, '#c8c8d0'); dim(c, 0.35, '#200008'); glow(c, 214, 115, 10, 6, '#ffffff', 0.4); }
      return { z: 1.04, fx: 170, fy: 100, sx: t > S.tDrill ? Math.round(Math.sin(t * 50)) : 0 }; }
    nightSky(c, t); street(c, t, GY + 10); apartment(c, t, 90, GY + 10, { lit213: true }); person(c, JEFF, 60, GY + 16, { k: 'ap', f: Math.floor(t * 3) & 3 });
    yearFlash(c, t, 0.3, 1990, 216, 10, '北25番街'); if (t > at(S, 'L20', 4) - 0.3) { R(c, 12, 50, 100, 24, '#000000'); TX(c, '月147ドル', 20, 54, '#f8e070', 16, null); }
    return { z: 1.03 + 0.06 * ss(sg(t, 0, S.tRoom)), fx: 165, fy: 90 };
  }
};

/* ---- DF: May 27, 1991 — the boy outside, three women, the police, the tape (moves: siren lights, the tape reels turn) ---- */
const DF = withCuts({
  name: '警察の失態', ch: '警察の失態', bgm: 'pulse',
  init(S) { S.tWomen = at(S, 'L25', 0) - 0.3; S.tBack = at(S, 'L26', 0) - 0.3; S.tGone = at(S, 'L27', 0) - 0.3; S.tTape = at(S, 'L28', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTape) { R(c, 0, 0, W, H, '#1c1c24'); tape(c, t, 130, 50); for (let i = 0; i < 6; i++) { const u = fr(t * 0.8 + i / 6); c.save(); c.globalAlpha = 1 - u; TX(c, 'ha', 120 + i * 14 + Math.sin(t + i) * 4, 44 - u * 30, '#c8c8d0', 16, null); c.restore(); } if (t > at(S, 'L28', 4) - 0.3) { R(c, 30, 104, 260, 24, '#000000'); TX(c, 'ラジオとテレビで全米に', 70, 108, '#f8e070', 16, null); } return { z: 1.04, fx: 160, fy: 80 }; }
    if (t > S.tGone) { nightSky(c, t); street(c, t, GY + 10); apartment(c, t, 90, GY + 10, { lit213: true }); dim(c, 0.5); for (let i = 0; i < 6; i++) { candle(c, 120 + i * 16, GY + 16, t, i, 1); glow(c, 120 + i * 16, GY + 10, 8, 6, '#f8c060', 0.3); } return { z: 1.04, fx: 160, fy: 100 }; }
    nightSky(c, t); street(c, t, GY + 10); apartment(c, t, 160, GY + 10, { lit213: true });
    if (t > S.tWomen) WOMEN.forEach((st, i) => person(c, st, 40 + i * 22, GY + 16, { k: 'wm', arm: i === 0 ? 'point' : null, expr: 'shock' }));
    if (t > at(S, 'L25', 2) - 0.3) { const b = Math.floor(t * 4) & 1; R(c, 100, GY - 6, 70, 16, '#e8e8e0'); R(c, 112, GY - 14, 40, 10, '#e8e8e0'); R(c, 126, GY - 18, 12, 4, b ? '#e81c1c' : '#2c5cf8'); glow(c, 132, GY - 16, 30, 16, b ? '#e81c1c' : '#2c5cf8', 0.35); for (let i = 0; i < 3; i++) person(c, COPS[i], 180 + i * 18, GY + 16, { k: 'pf', flip: true, expr: t > S.tBack ? 'smile' : 'normal', f: t > S.tBack ? Math.floor(t * 4 + i) & 3 : -1 }); person(c, JEFF, 250, GY + 16, { k: 'pf', flip: true, expr: 'smile' }); }
    else { R(c, 196, GY + 4, 20, 6, '#3c3c44'); glow(c, 206, GY, 30, 14, '#5c5c7c', 0.25); }
    yearFlash(c, t, 0.3, 1991, 8, 10, '5月27日');
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V2', (c, t, S) => closeUp(c, t, jeffFace({ blink: blinkOf(t, 4) }), { bg: ['#1c1c24', '#3c3c4c'], glow: '#d8d8f0', mouthAt: [24, 31] })]]);

/* ---- DG: the end of the mask — fired, eviction notice, the stench; July 22 the mall (moves: notices pile, fumes thicken) ---- */
const DG = {
  name: '剥がれる仮面', ch: '剥がれる仮面', bgm: 'dread',
  init(S) { S.tFired = at(S, 'L30', 0) - 0.3; S.tMall = at(S, 'L31', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMall) { VG(c, 0, 0, W, 120, ['#c8a8a0', '#e8c8a0', '#f8e8c8']); R(c, 0, 50, W, 100, '#c8c0b0'); for (let i = 0; i < 4; i++) { R(c, 10 + i * 80, 70, 66, 60, '#8cacc8'); R(c, 10 + i * 80, 64, 66, 8, ['#c83c3c', '#3c7cc8', '#e8b83c', '#5c9c4c'][i]); } R(c, 0, 150, W, 90, '#a89c88'); for (let i = 0; i < 3; i++) person(c, CROWD[i + 1], mod(t * 14 + i * 110, W + 40) - 20, 170, { k: 'ml', f: Math.floor(t * 4 + i) & 3 }); person(c, JEFF, 130, 166, { k: 'ml', expr: 'smile', arm: 'fwd' }); person(c, EDW, 190, 166, { k: 'ml', flip: true }); yearFlash(c, t, S.tMall + 0.2, 1991, 216, 10, '7月22日'); return { z: 1.04, fx: 160, fy: 110 }; }
    room213(c, t, { photos: 18 }); fumes(c, t, 160, 130, 14, '#8c9c4c'); fumes(c, t, 60, 130, 10, '#8c9c4c');
    if (t > S.tFired) { const n = Math.floor(sg(t, S.tFired + 0.3, S.dur) * 4); for (let i = 0; i < n; i++) { R(c, 120 + i * 34, 60 + (i % 2) * 6, 30, 38, '#f0e8d4'); R(c, 122 + i * 34, 62 + (i % 2) * 6, 26, 6, '#c81818'); } stamp(c, t, S.tFired + 0.3, 90, 74, '解雇', 60); if (t > at(S, 'L30', 2) - 0.3) stamp(c, t, at(S, 'L30', 3), 90, 112, '立ち退き', 80); }
    person(c, JEFF, 200, 166, { k: 'mk', expr: 'sad', blink: blinkOf(t, 3) });
    if (t < S.tFired) capPlate(c, t, 0.3, ['6月・7月', '短くなる間隔']);
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- DH: Tracy Edwards in #213 — the smell, the tank, the handcuff, the photos, the heartbeat, the punch, the escape (moves: fish, the cuff snaps, the knife glints, the door bursts) ---- */
const DH = withCuts({
  name: 'トレイシー・エドワーズ', ch: '生還', bgm: 'dread',
  init(S) { S.tSmell = at(S, 'L32', 0) - 0.3; S.tTank = at(S, 'L33', 0) - 0.3; S.tCuff = at(S, 'L34', 2) - 0.3; S.tPhotos = at(S, 'L35', 0) - 0.3; S.tHeart = at(S, 'L36', 0) - 0.3; S.tTalk = at(S, 'L37', 0) - 0.3; S.tPunch = at(S, 'L38', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPunch) { nightSky(c, t); street(c, t, GY + 10); apartment(c, t, 160, GY + 10, { lit213: true }); const u = sg(t, S.tPunch + 0.4, S.dur); person(c, EDW, lerp(200, 20, u), GY + 16, { k: 'esc', f: Math.floor(t * 8) & 3, flip: true, expr: 'shock' }); handcuff(c, lerp(200, 20, u) - 14, GY - 12, 0.8); if (t < S.tPunch + 0.4) flashScreen(c, 0.5); return { z: 1.04, fx: 140, fy: 110, sx: t < S.tPunch + 0.5 ? Math.round(Math.sin(t * 70) * 3) : 0 }; }
    if (t > S.tPhotos) { R(c, 0, 0, W, H, '#2c2018'); for (let x = 0; x < W; x += 24) R(c, x, 0, 12, 150, '#342818'); R(c, 0, 150, W, 90, '#1c1410'); const n = Math.floor(sg(t, S.tPhotos, S.tPhotos + 2.5) * 30); for (let i = 0; i < n; i++) polaroid(c, 14 + (i % 10) * 30, 8 + Math.floor(i / 10) * 32, 1); drum(c, 280, 150); fumes(c, t, 280, 112, 8, '#7c8c4c'); dim(c, 0.25, '#200000');
      if (t > S.tHeart) { const beat = (Math.floor(t * 1.8) & 1); person(c, EDW, 120, 166, { k: 'ht', expr: 'shock' }); person(c, JEFF, 150, 166, { k: 'ht', flip: true, weapon: 'knife', arm: 'hold' }); if (beat) { E(c, 130, 80, 4, 4, '#e81c1c'); E(c, 136, 80, 4, 4, '#e81c1c'); PF(c, [126, 81, 133, 90, 140, 81], '#e81c1c'); } }
      return { z: 1.04, fx: 150, fy: 90 }; }
    room213(c, t, { tx: 40, fx: 260 }); fumes(c, t, 160, 120, 10, '#8c9c4c');
    const sit = t > S.tTank; person(c, EDW, 140, 166, { k: 'ed', expr: t > S.tCuff ? 'shock' : sit ? 'sad' : 'normal', blink: t > S.tTank + 2 && t < S.tCuff ? 2 : blinkOf(t, 3) }); person(c, JEFF, 190, 166, { k: 'ed', flip: true, arm: t > S.tCuff ? 'fwd' : null });
    if (t > S.tCuff) { handcuff(c, 150, 136, 1); flashScreen(c, t < S.tCuff + 0.15 ? 0.5 : 0); }
    if (t < S.tTank) { yearFlash(c, t, 0.3, 1991, 216, 10, '7月22日'); }
    return { z: 1.04, fx: 160, fy: 110, sx: t > S.tCuff && t < S.tCuff + 0.3 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
}, [['V3', (c, t, S) => closeUp(c, t, jeffFace({ dark: true, blink: blinkOf(t, 4) }), { bg: ['#0c0408', '#3c1018'], glow: '#c81818' })]]);

/* ---- DI: the door opens; the polaroids; the search in hazmat suits; the crowd; 17 (moves: flashlights, the fridge rolls out, the crowd backs away) ---- */
const DI = {
  name: '死体の部屋', ch: '発覚', bgm: 'eerie',
  init(S) { S.tRage = at(S, 'L40', 2) - 0.3; S.tFound = at(S, 'L41', 3) - 0.3; S.tSuits = at(S, 'L42', 3) - 0.3; S.tCrowd = at(S, 'L43', 2) - 0.3; S.t17 = at(S, 'L44', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.t17) { R(c, 0, 0, W, H, '#0c0a10'); const n = Math.floor(sg(t, S.t17 + 0.5, S.dur) * 17); for (let i = 0; i < n; i++) { candle(c, 50 + (i % 9) * 28, 100 + Math.floor(i / 9) * 22, t, i, 1); glow(c, 50 + (i % 9) * 28, 94 + Math.floor(i / 9) * 22, 8, 6, '#f8c060', 0.3); } bigCap(c, '犠牲者 17人', 28, 24, '#f4f0e8', sg(t, at(S, 'L44', 2) - 0.3, at(S, 'L44', 2))); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tSuits) { nightSky(c, t); street(c, t, GY + 10); apartment(c, t, 160, GY + 10, { lit213: true }); const u = sg(t, S.tCrowd - 1, S.tCrowd + 2); HAZ.forEach((st, i) => person(c, st, lerp(220, 120, u) + i * 26, GY + 16, { k: 'hz', f: Math.floor(t * 3 + i) & 3 })); fridge(c, lerp(300, 250, u), GY + 16, t); for (let i = 0; i < 4; i++) person(c, CROWD[i], 20 + i * 18 - (t > S.tCrowd ? sg(t, S.tCrowd, S.tCrowd + 1.5) * 20 : 0), GY + 16, { k: 'cw', expr: t > S.tCrowd ? 'shock' : 'normal' }); fumes(c, t, lerp(320, 270, u), GY - 40, 10, '#8c9c4c'); for (let i = 0; i < 3; i++) { const b = (Math.floor(t * 4) + i) & 1; glow(c, 40 + i * 30, 40, 20, 10, b ? '#e81c1c' : '#2c5cf8', 0.25); } return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tFound) { room213(c, t, { photos: 24 }); for (let i = 0; i < 2; i++) person(c, COPS[i], 90 + i * 40, 166, { k: 'fd', arm: 'point', expr: 'shock' }); const a = Math.sin(t * 2) * 0.6; c.save(); c.globalAlpha = 0.2; PF(c, [110, 120, 110 + Math.cos(a - 1.2) * 200, 120 + Math.sin(a - 1.2) * 200, 110 + Math.cos(a - 1) * 200, 120 + Math.sin(a - 1) * 200], '#f8f8d0'); c.restore(); return { z: 1.04, fx: 160, fy: 90 }; }
    R(c, 0, 0, W, H, '#3c3428'); R(c, 0, 150, W, 90, '#2c2418'); R(c, 140, 30, 60, 120, '#5c3c24'); R(c, 146, 36, 48, 108, '#1c140c'); fumes(c, t, 170, 120, 10, '#8c9c4c');
    person(c, JEFF, 170, 166, { k: 'dr', expr: t > S.tRage ? 'angry' : 'smile', arm: t > S.tRage ? 'up' : null }); for (let i = 0; i < 2; i++) person(c, COPS[i], 90 + i * 150, 166, { k: 'dr', flip: i === 1, arm: t > S.tRage ? 'fwd' : null }); person(c, EDW, 50, 166, { k: 'dr', arm: 'point' });
    return { z: 1.04, fx: 160, fy: 110, sx: t > S.tRage && t < S.tRage + 1.5 ? Math.round(Math.sin(t * 40) * 2) : 0 };
  }
};

/* ---- DJ: outrage; Ressler; trial 936 years; death in 1994 (moves: protest signs bob, the gavel, a shower drips) ---- */
const DJ = withCuts({
  name: '裁判と死', ch: '裁判と死', bgm: 'requiem',
  init(S) { S.tRess = at(S, 'L46', 0) - 0.3; S.tTrial = at(S, 'L47', 0) - 0.3; S.tDeath = at(S, 'L49', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDeath) { R(c, 0, 0, W, H, '#c8ccd0'); for (let y = 0; y < 150; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#b8bcc0'); R(c, 0, 150, W, 90, '#8c9094'); for (let i = 0; i < 3; i++) { R(c, 60 + i * 90, 30, 6, 10, '#8c8c94'); for (let k = 0; k < 5; k++) { const u = fr(t * 1.5 + k / 5 + i * 0.3); P(c, 62 + i * 90 + k, 40 + u * 100, '#8cc8f8'); } } dim(c, 0.4 * sg(t, at(S, 'L49', 4), at(S, 'L49', 5) + 1)); yearFlash(c, t, S.tDeath + 0.2, 1994, 216, 10, '11月28日'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tTrial) { R(c, 0, 0, W, H, '#4c3424'); for (let x = 0; x < W; x += 30) R(c, x, 0, 4, 150, '#5c4030'); R(c, 0, 150, W, 90, '#3c2c1c'); R(c, 96, 92, 128, 40, '#6c4c34'); E(c, 160, 110, 8, 8, '#c8a040'); person(c, JEFF_JAIL, 160, 172, { k: 'tr', flip: true, blink: blinkOf(t, 3) }); if (t < at(S, 'L48', 2) - 0.3) yearFlash(c, t, S.tTrial + 0.2, 1992, 216, 10, '2月'); if (t > at(S, 'L47', 5) - 0.3) stamp(c, t, at(S, 'L47', 5), 80, 50, '禁固936年', 120); if (t > at(S, 'L48', 2) - 0.3) { dim(c, 0.4); bigCap(c, '死刑はなかった', 70, 24, '#f4f0e8', 1); } return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tRess) { R(c, 0, 0, W, H, '#3c3c40'); for (let y = 0; y < 150; y += 12) for (let x = (y / 12 & 1) * 12; x < W; x += 24) R(c, x, y, 23, 11, '#444448'); R(c, 0, 150, W, 90, '#2c2c30'); R(c, 110, 120, 100, 8, '#5c4c3c'); person(c, RESSLER, 90, 166, { k: 'rs', blink: blinkOf(t, 4) }); person(c, JEFF_JAIL, 230, 166, { k: 'rs', flip: true, blink: blinkOf(t + 1, 3) }); capPlate(c, t - S.tRess, 0.3, ['元FBI捜査官', 'ロバート・レスラー']); return { z: 1.04, fx: 160, fy: 110 }; }
    nightSky(c, t, { dusk: true }); R(c, 0, 120, W, 120, '#5c5c5c'); R(c, 60, 40, 200, 80, '#8c8c94'); TX(c, 'POLICE', 130, 46, '#1c2c4c', 16, null); for (let i = 0; i < 5; i++) { const x = 30 + i * 60, bob = Math.sin(t * 3 + i) * 3; person(c, CROWD[i], x, 170, { k: 'pr', arm: 'up' }); R(c, x - 8, 98 + bob, 34, 18, '#f0e8d4'); R(c, x - 6, 102 + bob, 30, 2, '#c81818'); R(c, x - 6, 108 + bob, 22, 2, '#2c2c34'); }
    return { z: 1.03, fx: 160, fy: 100 };
  }
}, [['V4', (c, t, S) => closeUp(c, t, jeffFace({ jail: true, blink: blinkOf(t, 5) }), { bg: ['#1c1c24', '#3c3c4c'], glow: '#d8d8f0' })]]);

/* ---- DK: ending — the empty lot behind a tall fence, grass in the wind; 17 candles (moves: grass sways, candles flicker) ---- */
const DK = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tLot = at(S, 'L51', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    nightSky(c, t, { dusk: t < S.tLot }); R(c, 0, 120, W, 120, '#3c4c2c'); for (let i = 0; i < 60; i++) { const x = hash(i) * W, y = 124 + hash(i * 3) * 40, sw = Math.sin(t * 1.5 + i) * 2; L(c, x, y, x + sw, y - 8, '#5c7c3c'); }
    if (t < S.tLot) { const k = 1 - sg(t, 0.5, at(S, 'L50', 1)); c.save(); c.globalAlpha = k; apartment(c, t, 90, GY + 10, {}); c.restore(); }
    for (let k = 0; k < 34; k++) L(c, k * 10, 160, k * 10, 96, '#8c8c94'); L(c, 0, 96, W, 96, '#a8a8b0', 2); for (let k = 0; k < 32; k++) { L(c, k * 10, 96, k * 10 + 10, 106, DA('#8c8c94', 0.5)); L(c, k * 10 + 10, 96, k * 10, 106, DA('#8c8c94', 0.5)); }
    if (t > at(S, 'L52', 0) - 0.3) for (let i = 0; i < 17; i++) { candle(c, 40 + i * 15, 172, t, i, 1); glow(c, 40 + i * 15, 166, 8, 6, '#f8c060', 0.3); }
    return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 110 };
  }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { nightSky(c, t); street(c, t, GY); const u = sg(t, 0, 4); person(c, EDW, lerp(220, 170, u), GY + 8, { k: 'run', f: u < 1 ? Math.floor(t * 8) & 3 : -1, flip: true, arm: u >= 1 ? 'wave' : null, expr: 'shock' }); handcuff(c, lerp(220, 170, u) - 16, GY - 20, 0.8); return { z: 1.1, fx: 170, fy: 110 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.5; },
  draw(c, t, S) { nightSky(c, t); street(c, t, GY + 10); apartment(c, t, 90, GY + 10, { lit213: true }); glow(c, 136, 74, 18, 12, '#c8d878', 0.4 + 0.2 * Math.sin(t * 3)); return { z: 1.15, fx: 165, fy: 90 }; }
};
