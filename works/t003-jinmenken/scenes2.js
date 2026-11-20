/* ================= 都市伝説 #003 人面犬: scenes ================= */
const JCLOSE = (c, t) => closeUp(c, t, jinmenFace({ blink: blinkOf(t, 5) }), { bg: ['#0c0c18', '#2c2c48'], glow: '#f8b050', spk: 'jinmen' });
const OCLOSE = (c, t) => closeUp(c, t, jinmenFace({ old: true, blink: blinkOf(t, 7) }), { bg: ['#3c4450', '#6c7884'], glow: '#e8ecf0', spk: 'jinmen' });
const KCLOSE = (c, t) => closeUp(c, t, kenFace({ shock: true, blink: blinkOf(t, 3) }), { bg: ['#1c1c24', '#3c3c4c'], spk: 'ken' });
const KCALM = (c, t) => closeUp(c, t, kenFace({ blink: blinkOf(t, 9) }), { bg: ['#1c1c24', '#4c4c5c'], spk: 'ken' });
const CCLOSE = (c, t) => closeUp(c, t, chichiFace({ blink: blinkOf(t, 4) }), { bg: ['#1c1c24', '#3c3c4c'], spk: 'chichi' });
const runF = (t, k = 12) => Math.floor(t * k) & 3;
function classroom(c, t) { R(c, 0, 0, W, H, '#c8b494'); R(c, 40, 34, 240, 70, '#2c4c3c'); R(c, 40, 104, 240, 4, '#8c6c44'); R(c, 0, 150, W, 40, '#a8885c'); for (let x = 0; x < W; x += 28) R(c, x, 150, 1, 40, '#8c6c44'); }
function lampPost(c, t, x, y = 160, o = {}) { R(c, x, y - 110, 3, 110, '#4c4c54'); R(c, x - 12, y - 112, 16, 3, '#4c4c54'); glow(c, x - 6, y - 106, 40, 60, '#f8d890', 0.3 + 0.03 * Math.sin(t * 2)); R(c, x - 10, y - 109, 9, 2, '#f8f0c0'); c.save(); c.globalAlpha = 0.12; PF(c, [x - 8, y - 106, x - 50, y, x + 36, y], '#f8e8b0'); c.restore(); }

/* ---- JZ: cold open — a car at 100 km/h on the night highway, a dog running level with it; it turns its head: a man's face (moves: lamps and lane dashes stream past, the dog gallops) ---- */
const JZ = withCuts({
  name: '高速道路の犬', ch: '夜の高速道路', bgm: 'eerie',
  init(S) { S.tIn = at(S, 'C0', 1) - 0.3; S.tTurn = at(S, 'C1', 2) - 0.3; S.tFace = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    highway(c, t, {}); const bob = Math.sin(t * 6) * 2;
    oldCar(c, 110, 152, { col: '#8c9cac', head: true, tail: true }); inCar(c, YOUNG, 110, 152, 0, { k: 'zr', flip: true });
    if (t > S.tIn) { const x = lerp(-40, 200, eOut(sg(t, S.tIn, S.tIn + 2.2))); jinmen(c, x, 166, { f: runF(t), back: t < S.tTurn }); }
    if (t > S.tFace) return { z: 1.1 + 0.5 * ss(sg(t, S.tFace, S.tFace + 2)), fx: 217, fy: 152 };
    if (t > S.tIn) { capPlate(c, t, S.tIn + 0.2, ['時速100キロ'], 44); return { z: 1.04, fx: 180, fy: 130 + bob * 0.2 }; }
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['M1', JCLOSE], ['V0', JCLOSE]]);

/* ---- JA: 1989–90 — a dog with a man's face; Showa ends, Heisei begins; every school, older kids too; magazines and TV; no clear photo (moves: calendar page flips, whispers pass, the TV flickers, empty photos slide in) ---- */
const JA = {
  name: '噂の広がり', ch: '1989年', bgm: 'memory',
  init(S) { S.tYear = at(S, 'L1', 2) - 0.3; S.tEra = at(S, 'L1b', 0) - 0.3; S.tSchool = at(S, 'L2', 0) - 0.3; S.tOld = at(S, 'L2b', 0) - 0.3; S.tTV = at(S, 'L3', 0) - 0.3; S.tPhoto = at(S, 'L3b', 1) - 0.3; S.tOnly = at(S, 'L3c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPhoto) { R(c, 0, 0, W, H, '#2c2820'); for (let i = 0; i < 4; i++) { const k = eOut(sg(t, S.tPhoto + i * 0.4, S.tPhoto + i * 0.4 + 0.5)); const x = 30 + i * 70, y = lerp(20, 50 + (i & 1) * 10, k); if (k <= 0) continue; R(c, x, y, 60, 70, '#f4f0e8'); R(c, x + 5, y + 5, 50, 46, '#3c3c44'); c.save(); c.globalAlpha = 0.5; E(c, x + 30, y + 30, 14, 10, '#8c7c6c'); c.restore(); TX(c, '?', x + 26, y + 18, '#f8e8b0', 16, null); } if (t > S.tOnly) plate(c, 80, 140, '見た人だけが知る姿', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tTV) { R(c, 0, 0, W, H, '#3c3024'); R(c, 0, 130, W, 60, '#5c4430'); R(c, 40, 50, 120, 90, '#2c2c2c'); R(c, 50, 58, 84, 68, Math.sin(t * 30) > 0.8 ? '#8c9cac' : '#5c6c7c'); jinmen(c, 92, 118, { sit: true, s: 1.1 }); for (let k = 0; k < 2; k++) E(c, 148, 72 + k * 18, 4, 4, '#8c8c8c'); R(c, 190, 60, 90, 80, '#f4f0e8'); R(c, 190, 60, 90, 22, '#c81c2c'); TX(c, '怪奇', 210, 63, '#f8f8f0', 16, null); jinmen(c, 236, 134, { s: 0.9 }); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tSchool) { classroom(c, t); TX(c, 'じんめんけん', 100, 50, '#e8ecd8', 16, null); const n = t > S.tOld ? 4 : 3; for (let i = 0; i < n; i++) person(c, i === 3 ? { ...PUPILS[0], id: 'hs', top: 'uniform', coat: '#1c2440', pants: '#1c2440' } : PUPILS[i], 60 + i * 66, 156, { k: 'cl' + i, flip: i % 2 === 1, expr: i === 1 ? 'shock' : 'normal' }); const w = Math.floor(t * 1.5) % 3; plate(c, 48 + w * 66, 70, 'ひそひそ', '#f8e8b0'); if (t > S.tOld) plate(c, 150, 70, '中学生や高校生も', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tEra) { R(c, 0, 0, W, H, '#1c1c24'); const k = sg(t, S.tEra + 0.6, S.tEra + 1.6); calendar(c, 70, 50, '昭和', '64年', '#5c5c6c'); if (k > 0) { c.save(); c.translate(0, -60 * eIn(k)); c.globalAlpha = 1 - k; calendar(c, 70, 50, '昭和', '64年', '#5c5c6c'); c.restore(); } calendar(c, 180, 50, '平成', '元年', '#c81c2c'); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#141420'); glow(c, 160, 100, 120, 70, '#5c5c7c', 0.3); jinmen(c, 140, 156, { s: 2.3, sit: true }); plate(c, 16, 40, '体は犬。顔は、人間の男', '#f8e8b0'); yearFlash(c, t, S.tYear + 0.2, '1989', 216, 10, '〜90年');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- JB: what it looks like — tan mongrel, a man's face, thinning hair, stubble, tired eyes; it speaks; "ほっといてくれ" and it walks off (moves: tags tick in, it sits, turns, trots away) ---- */
const JB = withCuts({
  name: 'その姿', ch: 'その姿', bgm: 'dread',
  init(S) { S.tFace = at(S, 'L4b', 1) - 0.3; S.tHair = at(S, 'L5', 0) - 0.3; S.tSpeak = at(S, 'L5b', 0) - 0.3; S.tFew = at(S, 'L6', 0) - 0.3; S.tGo = at(S, 'L6b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#1c1c28'); VG(c, 0, 100, W, 90, ['#1c1c28', '#2c2838']); lampPost(c, t, 250, 160);
    if (t > S.tGo) { const u = sg(t, S.tGo + 0.3, S.dur); jinmen(c, lerp(150, 360, u), 160, { f: runF(t, 8), s: 1.6, back: true }); plate(c, 20, 40, 'ほっといてくれ', '#f8c8a0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tFew) { jinmen(c, 150, 160, { sit: true, s: 2 }); plate(c, 20, 40, '短い、ぶっきらぼうな言葉', '#f8e8b0'); return { z: 1.05, fx: 150, fy: 100 }; }
    if (t > S.tSpeak) { jinmen(c, 292, 162, { sit: true, s: 1.0 }); bigCap(c, '人の言葉を話す', 44, 32, '#f8c8a0', sg(t, S.tSpeak + 0.2, S.tSpeak + 0.7)); return { z: 1.0, fx: 160, fy: 100 }; }
    jinmen(c, 200, 160, { s: 2.2 });
    const tags = [['薄茶色の雑種', 0], ['中年の男の顔', S.tFace], ['薄い髪、無精ひげ', S.tHair], ['目の下に深いくま', S.tHair + 1.6]];
    tags.forEach(([s, tt], i) => { if (t > tt + 0.3) plate(c, 12, 40 + i * 26, s, '#f8e8b0'); });
    return { z: 1.03, fx: 160, fy: 100 };
  }
}, [['V1', JCLOSE]]);

/* ---- JC: where it appears — the highway (runs level, overtakes, the overtaken car crashes) and the night town's back alley (rummaging, answering back) (moves: the race, brake lights, the bags rustle) ---- */
const JC = {
  name: '出る場所', ch: '出る場所', bgm: 'dread',
  init(S) { S.tHw = at(S, 'L8', 0) - 0.3; S.tPass = at(S, 'L8b', 0) - 0.3; S.tCrash = at(S, 'L8b', 1) - 0.3; S.tAl = at(S, 'L9', 0) - 0.3; S.tDrunk = at(S, 'L9b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDrunk) { alley(c, t, { bagX: 210 }); jinmen(c, 200, 164, { s: 1.4 }); const p = { ...YOUNG, id: 'dk', skin: '#f0a890' }; person(c, p, 90, 164, { k: 'dk', arm: 'wave', expr: 'smile', flip: true }); if (t > S.tDrunk + 1.6) plate(c, 150, 60, 'うるせえ', '#f8c8a0'); return { z: 1.04, fx: 150, fy: 110 }; }
    if (t > S.tAl) { alley(c, t, { flicker: true, bagX: 200 }); jinmen(c, 172, 164, { noHead: true, s: 1.4, f: -1 }); bagOver(c, 172, 164, 1.4); const sh = Math.sin(t * 20) > 0.5 ? 1 : 0; if (sh) plate(c, 150, 100, 'がさがさ', '#c8c8d8'); plate(c, 12, 84, '繁華街の裏通り', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tHw) {
      highway(c, t, {}); const pass = sg(t, S.tPass, S.tPass + 2), crash = t > S.tCrash;
      const carX = 110 + (crash ? -60 * eOut(sg(t, S.tCrash, S.tCrash + 1.5)) : 0);
      c.save(); if (crash) { c.translate(carX + 40, 140); c.rotate(-0.12 * ss(sg(t, S.tCrash, S.tCrash + 1))); c.translate(-(carX + 40), -140); } oldCar(c, carX, 152, { col: '#c8c0b0', head: true, tail: true, brake: crash }); c.restore();
      jinmen(c, 160 + 160 * eIn(pass), 166, { f: runF(t), back: true });
      if (crash) { glow(c, carX + 20, 140, 60, 30, '#ff3020', 0.2 + 0.1 * Math.sin(t * 10)); plate(c, 20, 40, '追い抜かれた車は……', '#f8c8a0'); } else plate(c, 20, 40, '時速100キロで並んで走る', '#f8e8b0');
      return { z: 1.03, fx: 170, fy: 120, sx: crash && t < S.tCrash + 0.4 ? Math.round(Math.sin(t * 60)) : 0 };
    }
    R(c, 0, 0, W, H, '#0c0c14');
    c.save(); c.beginPath(); c.rect(8, 40, 148, 110); c.clip(); c.translate(8, 40); c.scale(0.46, 0.6); highway(c, t, {}); jinmen(c, 220, 166, { f: runF(t), back: true }); c.restore();
    c.save(); c.beginPath(); c.rect(164, 40, 148, 110); c.clip(); c.translate(164, 40); c.scale(0.46, 0.6); alley(c, t, {}); jinmen(c, 172, 164, { noHead: true }); bagOver(c, 172, 164); c.restore();
    frame(c, 8, 40, 148, 110, '#f8e8b0'); frame(c, 164, 40, 148, 110, '#f8e8b0'); plate(c, 30, 46, '高速道路', '#f8e8b0'); plate(c, 190, 46, '夜の裏通り', '#f8e8b0');
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- JD: the alley story — a young man misses the last train, rustling bags, he whistles, it pulls its head out under the dying neon: "うるせえな"; it trots off; nobody believes him; he walks faster past bags ever after (moves: the walk, the neon flicker, the head comes out, the trot) ---- */
const JD = withCuts({
  name: '裏通りの夜', ch: '裏通りの夜', bgm: 'dread',
  init(S) { S.tWalk = at(S, 'L10b', 0) - 0.3; S.tBag = at(S, 'L11', 0) - 0.3; S.tWhis = at(S, 'L11b', 0) - 0.3; S.tStop = at(S, 'L12', 0) - 0.3; S.tOut = at(S, 'L12b', 0) - 0.3; S.tLook = at(S, 'L13', 0) - 0.3; S.tGone = at(S, 'L13b', 0) - 0.3; S.tMorn = at(S, 'L14', 0) - 0.3; S.tFast = at(S, 'L14b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFast) { alley(c, t, { bagX: 200 }); dim(c, 0.2); const u = sg(t, S.tFast + 0.2, S.dur); person(c, YOUNG, lerp(20, 300, u), 164, { k: 'ff', f: Math.floor(t * 10) & 3, expr: 'shock' }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tMorn) { R(c, 0, 0, W, H, '#e8dcc4'); R(c, 0, 0, W, 60, '#a8c8e0'); R(c, 0, 120, W, 70, '#a8886c'); R(c, 100, 112, 120, 8, '#7c5c3c'); person(c, YOUNG, 90, 164, { k: 'mt', arm: 'up', expr: 'shock' }); for (let i = 0; i < 2; i++) person(c, SUITS[i + 1], 200 + i * 44, 164, { k: 'lf' + i, flip: true, expr: 'smile' }); if (Math.sin(t * 4) > 0) plate(c, 200, 60, 'はははっ', '#5c3c2c', '#f8f0e0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tGone) { alley(c, t, { flicker: true }); person(c, YOUNG, 70, 164, { k: 'gn', expr: 'shock' }); const u = sg(t, S.tGone + 0.3, S.tGone + 3); c.save(); c.globalAlpha = 1 - u * 0.9; jinmen(c, lerp(170, 175, u), lerp(164, 150, u), { f: runF(t, 6), s: 1.4 - 0.6 * u, back: true }); c.restore(); return { z: 1.04, fx: 150, fy: 110 }; }
    if (t > S.tLook) { alley(c, t, { flicker: true, low: true }); person(c, YOUNG, 70, 164, { k: 'lk', expr: 'shock' }); jinmen(c, 170, 164, { s: 1.6, sit: true }); return { z: 1.1 + 0.2 * ss(sg(t, S.tLook, S.tLook + 3)), fx: 176, fy: 130 }; }
    if (t > S.tOut) { alley(c, t, { flicker: true }); person(c, YOUNG, 70, 164, { k: 'ou', expr: 'shock' }); const k = sg(t, S.tOut + 0.3, S.tOut + 1.6); jinmen(c, 172 - 4 * k, 164, { s: 1.4, noHead: k < 0.5 }); if (k < 0.5) bagOver(c, 172, 164, 1.4); return { z: 1.06, fx: 160, fy: 120 }; }
    if (t > S.tStop) { alley(c, t, {}); person(c, YOUNG, 70, 164, { k: 'st' }); jinmen(c, 172, 164, { s: 1.4, noHead: true }); bagOver(c, 172, 164, 1.4); return { z: 1.05, fx: 140, fy: 120 }; }
    if (t > S.tWhis) { alley(c, t, {}); person(c, YOUNG, 70, 164, { k: 'wh', arm: 'wave', expr: 'smile' }); jinmen(c, 172, 164, { s: 1.4, noHead: true }); bagOver(c, 172, 164, 1.4); const ny = 104 - fr(t * 0.8) * 20; TX(c, '♪', 96, ny, '#f8e8b0', 16, null); plate(c, 12, 76, 'おい、こっち来いよ', '#f8e8b0'); return { z: 1.04, fx: 130, fy: 110 }; }
    if (t > S.tBag) { alley(c, t, {}); person(c, YOUNG, 70, 164, { k: 'bg' }); jinmen(c, 172, 164, { s: 1.4, noHead: true }); bagOver(c, 172, 164, 1.4); if (Math.sin(t * 18) > 0.2) plate(c, 150, 96, 'がさ', '#c8c8d8'); return { z: 1.05 + 0.05 * ss(sg(t, S.tBag, S.tWhis)), fx: 170, fy: 130 }; }
    alley(c, t, { flicker: true }); const u = sg(t, S.tWalk, S.tBag); person(c, YOUNG, lerp(-10, 70, u), 164, { k: 'wk', f: u < 1 ? Math.floor(t * 6) & 3 : -1 }); if (t < S.tWalk + 5) plate(c, 200, 112, '終電のあと', '#f8e8b0');
    return { z: 1.03, fx: 140, fy: 110 };
  }
}, [['V2', JCLOSE]]);

/* ---- JE: what is it? — a secret lab, a man and a dog on a dark road becoming one, an old scroll; the rumour grows truer with each telling (moves: flasks bubble, headlights sweep, the scroll unrolls, the whisper chain) ---- */
const JE = {
  name: '正体', ch: '正体の噂', bgm: 'memory',
  init(S) { S.tLab = at(S, 'L16', 0) - 0.3; S.tRoad = at(S, 'L16b', 0) - 0.3; S.tEdo = at(S, 'L17', 0) - 0.3; S.tGrow = at(S, 'L17b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGrow) { classroom(c, t); dim(c, 0.35); const n = 1 + Math.floor(sg(t, S.tGrow, S.dur - 1) * 4.99); for (let i = 0; i < Math.min(5, n); i++) person(c, PUPILS[i % 4], 30 + i * 62, 156, { k: 'gr' + i, flip: true, expr: i === n - 1 ? 'shock' : 'normal' }); plate(c, 40, 40, '語られるたびに、本当らしく', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tEdo) { R(c, 0, 0, W, H, '#2c2418'); scroll(c, t, 34, 46); yearFlash(c, t, S.tEdo + 0.4, '江戸', 216, 10, '時代'); return { z: 1.03 + 0.03 * ss(sg(t, S.tEdo, S.tGrow)), fx: 160, fy: 100 }; }
    if (t > S.tRoad) { R(c, 0, 0, W, H, '#06060c'); const k = sg(t, S.tRoad + 0.8, S.tEdo - 0.4); glow(c, 40, 120, 120, 40, '#f8f0c0', 0.25 * (1 - k)); lampPost(c, t, 250, 166); c.save(); c.globalAlpha = 1 - k; blit(c, tintSpr(modFig(YOUNG, { k: 'sil' }), '#5c5c7c', 'silM2'), 140 + 20 * k, 160, FIG_AX2, FIG_AY2, { s: 1.4 }); c.restore(); blit(c, tintSpr(jinmenSpr({ sit: true }), '#5c5c7c', 'silD2'), 190 - 20 * k, 162, 30, 47, { s: 1.4 }); if (k > 0.6) { c.save(); c.globalAlpha = (k - 0.6) * 2.5; jinmen(c, 170, 162, { sit: true, s: 1.4 }); c.restore(); } plate(c, 20, 40, 'ひとつに混ざった？', '#f8e8b0'); return { z: 1.04, fx: 165, fy: 120 }; }
    if (t > S.tLab) { lab(c, t); jinmen(c, 240, 160, { sit: true, s: 1.1 }); plate(c, 20, 40, 'ひそかな実験？', '#c8f8e8'); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#141420'); jinmen(c, 292, 162, { s: 1.0, sit: true }); bigCap(c, '何者なのか', 44, 32, '#f8e8b0', sg(t, 0.4, 1)); for (let i = 0; i < 3; i++) TX(c, '?', 60 + i * 100, 110 + Math.sin(t * 2 + i) * 6, '#8c8cac', 16, null);
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- JF: the turning point — it never attacks; it mutters like a tired man; the face you have seen somewhere; "it comes to warn" (moves: it lies under a lamp, salarymen pass, the face looms, it stands on the overpass in the wind) ---- */
const JF = {
  name: 'もうひとつの顔', ch: 'もうひとつの顔', bgm: 'memory',
  init(S) { S.tNo = at(S, 'L19', 0) - 0.3; S.tMutter = at(S, 'L19b', 0) - 0.3; S.tFace = at(S, 'L20', 0) - 0.3; S.tWarn = at(S, 'L20b', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWarn) { highway(c, t, { v: 160 }); R(c, 0, 100, W, 10, '#5c5c64'); R(c, 0, 96, W, 4, '#7c7c84'); for (let x = 10; x < W; x += 24) R(c, x, 84, 2, 14, '#7c7c84'); jinmen(c, 160, 97, { sit: true, s: 1.2 }); plate(c, 20, 40, '危ないことを、知らせに来る', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 90 }; }
    if (t > S.tFace) { R(c, 0, 0, W, H, '#1c1c28'); glow(c, 160, 100, 110, 80, '#f8b050', 0.2); blit(c, jinmenFace({ blink: blinkOf(t, 2), dark: false }), 160, 104, 24, 24, { s: 2.6 }); plate(c, 20, 40, 'どこかで見た顔', '#f8e8b0'); return { z: 1.04 + 0.06 * ss(sg(t, S.tFace, S.tWarn)), fx: 160, fy: 100 }; }
    if (t > S.tMutter) { R(c, 0, 0, W, H, '#14141c'); R(c, 0, 130, W, 60, '#2c2c34'); for (let i = 0; i < 4; i++) { const x = ((i * 90 + t * 30) % 400) - 40; person(c, SUITS[i], x, 164, { k: 'mu' + i, f: Math.floor(t * 4 + i) & 3, expr: 'sad' }); } jinmen(c, 250, 166, { sit: true, s: 1.2 }); plate(c, 20, 40, '疲れたおじさんの、ひとりごと', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNo) { R(c, 0, 0, W, H, '#1c1c28'); lampPost(c, t, 200, 160); jinmen(c, 180, 160, { sit: true, s: 1.6 }); const k = Math.floor(sg(t, S.tNo, at(S, 'L19', 2)) * 2.99); const rs = ['人を襲わない', '追いかけない', '呪わない']; for (let i = 0; i <= Math.min(2, k); i++) plate(c, 16, 40 + i * 28, rs[i], '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#1c1c28'); lampPost(c, t, 200, 160); for (let i = 0; i < 40; i++) { const x = (i * 37) % W, y = fr(t * 0.9 + i * 0.13) * 180; L(c, x, y, x - 2, y + 6, '#5c6c8c'); } jinmen(c, 292, 162, { sit: true, s: 1.0 }); bigCap(c, '妙なところ', 44, 32, '#f8e8b0', sg(t, 0.6, 1.2));
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tNo)), fx: 170, fy: 110 };
  }
};

/* ---- JG: climax — a summer night, the family car home from the grandparents', fog; outside the boy's window a dog runs at 100 km/h; an old man's face; "止めろ"; "お父さん、止まって！"; brakes; the overturned truck in the fog (moves: the fog drifts, the dog gallops in the window, brake lights, the stop) ---- */
const JG = withCuts({
  name: '霧の夜', ch: '霧の夜', bgm: 'dread',
  init(S) { S.tCar = at(S, 'L21b', 0) - 0.3; S.tFog = at(S, 'L22', 0) - 0.3; S.tRadio = at(S, 'L22b', 0) - 0.3; S.tDog = at(S, 'L23', 0) - 0.3; S.tFast = at(S, 'L23b', 0) - 0.3; S.tNear = at(S, 'L24', 0) - 0.3; S.tTurn = at(S, 'L24', 1) - 0.3; S.tFace = at(S, 'L24b', 0) - 0.3; S.tSay = at(S, 'L25', 0) - 0.3; S.tBrake = at(S, 'L26', 0) - 0.3; S.tTruck = at(S, 'L26b', 0) - 0.3; S.tFrozen = at(S, 'L27', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const winDog = (old, back) => (c2, t2) => { const bob = Math.sin(t2 * 7) * 2; jinmen(c2, 168, 130 + bob, { f: runF(t2), s: 1.4, old, back }); };
    if (t > S.tFrozen) { highway(c, t, { fog: true, still: true }); overturnedTruck(c, 170, 150); plate(c, 150, 60, '横倒しのトラック', '#f8c8a0'); oldCar(c, 50, 152, { col: '#c8c8d0', tail: true, brake: true }); inCar(c, DAD, 50, 152, 1, { k: 'fz', expr: 'shock' }); if (Math.sin(t * 5) > 0) { glow(c, 52, 140, 10, 6, '#f8a020', 0.6); glow(c, 128, 140, 10, 6, '#f8a020', 0.6); } return { z: 1.04, fx: 120, fy: 120 }; }
    if (t > S.tTruck) { highway(c, t, { fog: true, still: true }); const k = sg(t, S.tTruck + 0.4, S.tTruck + 3); c.save(); c.globalAlpha = 0.3 + 0.7 * k; overturnedTruck(c, 170, 150); c.restore(); oldCar(c, 50, 152, { col: '#c8c8d0', tail: true, brake: true }); if (k > 0.5) plate(c, 150, 60, '横倒しのトラック', '#f8c8a0'); return { z: 1.06 + 0.06 * ss(k), fx: 200, fy: 120 }; }
    if (t > S.tBrake) { const u = eOut(sg(t, S.tBrake, S.tBrake + 2.5)); highway(c, t, { fog: true, v: 260 * (1 - u) }); oldCar(c, 60 + 30 * u, 152, { col: '#c8c8d0', tail: true, brake: true, head: true }); inCar(c, DAD, 60 + 30 * u, 152, 1, { k: 'bk', expr: 'shock' }); plate(c, 20, 40, 'キキーッ', '#f8c8a0'); return { z: 1.04, fx: 120, fy: 120, sx: t < S.tBrake + 0.8 ? Math.round(Math.sin(t * 50)) : 0 }; }
    if (t > S.tFace) { carWindow(c, t, { fog: true, after: winDog(true, false) }); return { z: 1.12 + 0.25 * ss(sg(t, S.tFace, S.tFace + 2.5)), fx: 180, fy: 110 }; }
    if (t > S.tNear) { carWindow(c, t, { fog: true, after: winDog(true, t < S.tTurn) }); c.save(); c.beginPath(); c.rect(48, 40, 224, 94); c.clip(); blit(c, kenFace({ shock: true }), 82, 118, 24, 24, { s: 1.4 }); c.restore(); return { z: 1.06, fx: 140, fy: 100 }; }
    if (t > S.tDog) { carWindow(c, t, { fog: true, after: winDog(true, true) }); if (t > S.tFast) plate(c, 60, 40, '時速100キロ', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tRadio) { highway(c, t, { fog: true, v: 220 }); bigCar(c, t, 70, 164, 2.2, [[DAD, 1, { k: 'rb', blink: blinkOf(t, 4) }], [KEN, 0, { k: 'rk' }]], { head: true }); TX(c, '♪', 200 + Math.sin(t * 3) * 3, 70 - fr(t * 0.7) * 16, '#f8e8b0', 16, null); plate(c, 20, 40, 'カーラジオの古い歌', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tFog) { highway(c, t, { fog: true }); oldCar(c, 120, 152, { col: '#c8c8d0', head: true, tail: true }); inCar(c, DAD, 120, 152, 1, { k: 'fg' }); inCar(c, KEN, 120, 152, 0, { k: 'fgk' }); return { z: 1.03 + 0.03 * ss(sg(t, S.tFog, S.tRadio)), fx: 160, fy: 120 }; }
    if (t > S.tCar) { highway(c, t, { v: 200 }); const kenOn = t > at(S, 'L21b', 2) - 0.3; bigCar(c, t, 70, 164, 2.2, [[DAD, 1, { k: 'c1', blink: blinkOf(t, 4) }], [kenOn ? KEN : MOM, 0, { k: kenOn ? 'c3' : 'c2', blink: kenOn ? 0 : 2 }]], { head: true }); if (!kenOn) plate(c, 60, 40, '母親は、眠っている', '#c8c8e8'); else plate(c, 60, 40, '後ろの席に、男の子', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    highway(c, t, {}); oldCar(c, 120, 152, { col: '#c8c8d0', head: true, tail: true }); inCar(c, DAD, 120, 152, 1, { k: 'h0' }); capPlate(c, t, 0.4, ['ある夏の夜'], 44);
    return { z: 1.03, fx: 160, fy: 120 };
  }
}, [['V3', OCLOSE], ['K1', KCLOSE]]);

/* ---- JH: whose face — the empty fog, the father asks, the boy answers: grandpa; the road grandpa drove every year (moves: the fog, a pause, a sunny memory of the old car, a dog watching from the hill fades) ---- */
const JH = withCuts({
  name: 'その顔', ch: 'その顔', bgm: 'requiem',
  init(S) { S.tAsk = at(S, 'L28b', 0) - 0.3; S.tThink = at(S, 'L29', 0) - 0.3; S.tQuiet = at(S, 'L30', 0) - 0.3; S.tRoad = at(S, 'L30b', 0) - 0.3; S.tWarn = at(S, 'L30c', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tWarn) { highway(c, t, { fog: true, still: true }); R(c, 0, 60, W, 52, '#6c7884'); E(c, 240, 112, 80, 20, '#5c6874'); const a = 1 - sg(t, S.tWarn + 2, S.dur - 0.5); c.save(); c.globalAlpha = a; jinmen(c, 240, 100, { sit: true, old: true, s: 1.1 }); c.restore(); oldCar(c, 50, 152, { col: '#c8c8d0', tail: true }); return { z: 1.06, fx: 200, fy: 100 }; }
    if (t > S.tRoad) { VG(c, 0, 0, W, 120, ['#78b8e8', '#a8d8f0', '#e8f0e0']); E(c, 60, 100, 90, 24, '#5c9c4c'); E(c, 260, 104, 100, 22, '#4c8c3c'); R(c, 0, 112, W, 6, '#a8a8b0'); R(c, 0, 118, W, 72, '#5c5c64'); for (let i = 0; i < 6; i++) { const x = ((i * 80 - t * 120) % 480 + 480) % 480 - 40; R(c, x, 140, 34, 3, '#e8e8d8'); } oldCar(c, 120, 152, { col: '#5c8c6c' }); inCar(c, GPA, 120, 152, 1, { k: 'gp', expr: 'smile' }); c.save(); c.globalAlpha = 0.25; c.fillStyle = '#a8844c'; c.fillRect(0, 0, W, H); c.restore(); plate(c, 20, 40, '孫の顔を見に行く道', '#5c3c1c', '#f8f0d8'); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tQuiet) { R(c, 0, 0, W, H, '#14141c'); R(c, 40, 30, 240, 80, '#6c7884'); R(c, 0, 110, W, 80, '#24242c'); E(c, 200, 140, 26, 26, '#1c1c1c'); blit(c, modFig(DAD, { k: 'qt', expr: 'sad', blink: blinkOf(t, 4) }), 200, 210, FIG_AX2, FIG_AY2, { s: 1.6, flip: true }); blit(c, modFig(KEN, { k: 'qk', expr: 'sad' }), 90, 200, FIG_AX2, FIG_AY2, { s: 1.3 }); dim(c, 0.2); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tThink) { R(c, 0, 0, W, H, '#1c1c24'); blit(c, kenFace({ blink: blinkOf(t, 6) }), 160, 104, 24, 24, { s: 2.6 }); return { z: 1.04 + 0.08 * ss(sg(t, S.tThink, S.tThink + 4)), fx: 160, fy: 100 }; }
    if (t > S.tAsk) { R(c, 0, 0, W, H, '#14141c'); R(c, 40, 30, 240, 80, '#6c7884'); R(c, 0, 110, W, 80, '#24242c'); blit(c, modFig(DAD, { k: 'as', expr: 'shock' }), 200, 210, FIG_AX2, FIG_AY2, { s: 1.6 }); blit(c, modFig(KEN, { k: 'ak' }), 90, 200, FIG_AX2, FIG_AY2, { s: 1.3 }); return { z: 1.03, fx: 160, fy: 100 }; }
    carWindow(c, t, { fog: true }); return { z: 1.04, fx: 160, fy: 80 };
  }
}, [['F1', CCLOSE], ['K2', KCALM]]);

/* ---- JI: aftermath — did anyone see it? drivers glance sideways; maybe just a stray; the 90s quieten; it lives on in books and comics (moves: cars stream, a stray under the lamp, the shelf fills) ---- */
const JI = {
  name: 'その後', ch: 'その後', bgm: 'memory',
  init(S) { S.tGlance = at(S, 'L32', 0) - 0.3; S.tStray = at(S, 'L32b', 0) - 0.3; S.t90 = at(S, 'L33', 0) - 0.3; S.tBooks = at(S, 'L33b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBooks) { R(c, 0, 0, W, H, '#8c6c4c'); for (let r = 0; r < 3; r++) { R(c, 20, 76 + r * 36, 280, 4, '#5c4430'); const n = Math.floor(sg(t, S.tBooks, S.tBooks + 3) * 20); for (let i = 0; i < n; i++) R(c, 24 + i * 14, 76 + r * 36 - 28, 12, 28, ['#c81c2c', '#2c4c8c', '#3c7c3c', '#c8a03c', '#5c3c7c'][(i + r) % 5]); } jinmen(c, 286, 76, { sit: true, s: 0.8 }); plate(c, 30, 40, '怖い話の本や漫画に', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.t90) { R(c, 0, 0, W, H, '#1c1c24'); yearFlash(c, t, S.t90 + 0.2, '1990', 216, 10, '年代'); calendar(c, 125, 60, '平成', '2年', '#c81c2c'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tStray) { R(c, 0, 0, W, H, '#1c1c28'); lampPost(c, t, 200, 160); jinmen(c, 180, 160, { sit: true, s: 1.5, back: true }); plate(c, 20, 40, 'ただの野良犬？', '#f8e8b0'); return { z: 1.03 + 0.05 * ss(sg(t, S.tStray, S.t90)), fx: 170, fy: 110 }; }
    if (t > S.tGlance) { highway(c, t, {}); for (let i = 0; i < 3; i++) { const x = ((i * 140 - t * 60) % 420 + 420) % 420 - 100; oldCar(c, x, 152 - (i & 1) * 6, { col: ['#c8c0b0', '#8c9cac', '#c88c6c'][i], head: true, tail: true }); inCar(c, SUITS[i], x, 152 - (i & 1) * 6, 0, { k: 'gl' + i, flip: Math.sin(t * 2 + i) > 0 }); } plate(c, 20, 40, 'ふと、横を見てしまう', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 120 }; }
    R(c, 0, 0, W, H, '#0c0c14'); jinmen(c, 292, 162, { s: 1.0, back: true }); bigCap(c, '見た人は、いたのか', 44, 32, '#f8e8b0', sg(t, 0.4, 1));
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- JJ: why it spread — not a far forest but our highway and alley; the face of the man next to you on the train; scary yet lonely; someone who lost the way home (moves: panels slide, the train sways, it walks toward far lights) ---- */
const JJ = {
  name: 'なぜ広まったか', ch: 'なぜ広まったか', bgm: 'memory',
  init(S) { S.tNear = at(S, 'L35', 0) - 0.3; S.tTrain = at(S, 'L35b', 0) - 0.3; S.tLone = at(S, 'L36', 0) - 0.3; S.tHome = at(S, 'L36b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tHome) { highway(c, t, { still: true }); R(c, 0, 0, W, 112, '#06081c'); for (let i = 0; i < 30; i++) R(c, 180 + (i * 13) % 130, 96 + (i * 5) % 12, 2, 2, '#f8e8a0'); const u = sg(t, S.tHome, S.dur); jinmen(c, lerp(60, 230, u), 166, { f: runF(t, 5), s: 1.2 - 0.4 * u, back: true }); plate(c, 20, 40, '帰る場所をなくした、誰か', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tLone) { R(c, 0, 0, W, H, '#1c1c28'); lampPost(c, t, 200, 160); jinmen(c, 292, 162, { sit: true, s: 1.0 }); bigCap(c, '怖いのに、さびしい', 44, 32, '#c8d8f8', sg(t, S.tLone + 0.3, S.tLone + 0.9)); return { z: 1.04, fx: 170, fy: 110 }; }
    if (t > S.tTrain) { R(c, 0, 0, W, H, '#c8c8b8'); R(c, 0, 30, W, 50, '#2c3040'); for (let i = 0; i < 4; i++) R(c, 20 + i * 80, 36, 60, 38, '#3c4c6c'); for (let i = 0; i < 10; i++) L(c, 20 + i * 30, 26, 20 + i * 30, 40, '#8c8c8c'); R(c, 0, 150, W, 40, '#8c8478'); const sw = Math.sin(t * 2) * 2; for (let i = 0; i < 4; i++) person(c, SUITS[i], 50 + i * 70 + sw, 164, { k: 'tr' + i, expr: 'sad', blink: blinkOf(t, i + 2) }); plate(c, 20, 90, 'ふつうの、くたびれた顔', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNear) { R(c, 0, 0, W, H, '#0c0c14'); c.save(); c.beginPath(); c.rect(8, 40, 148, 110); c.clip(); c.translate(8, 40); c.scale(0.46, 0.6); highway(c, t, {}); c.restore(); c.save(); c.beginPath(); c.rect(164, 40, 148, 110); c.clip(); c.translate(164, 40); c.scale(0.46, 0.6); alley(c, t, { flicker: true }); c.restore(); frame(c, 8, 40, 148, 110, '#f8e8b0'); frame(c, 164, 40, 148, 110, '#f8e8b0'); plate(c, 100, 124, '毎日通る場所', '#f8e8b0'); return { z: 1.02, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#141420'); bigCap(c, 'なぜ、広まったのか', 60, 32, '#f8e8b0', sg(t, 0.3, 0.9)); jinmen(c, 160, 160, { sit: true, s: 1.2 });
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- JK: ending — the night road; something runs alongside you; "なに見てんだよ"; it turns (moves: the lamps stream, it gallops, slows) ---- */
const JK = withCuts({
  name: '並んで走るもの', ch: 'おわりに', bgm: 'requiem',
  init(S) { S.tAsk = at(S, 'L38', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    highway(c, t, { fog: t > S.tAsk, v: 200 }); oldCar(c, 90, 152, { col: '#8c9cac', head: true, tail: true }); jinmen(c, 200, 166, { f: runF(t), back: t < S.tAsk + 1 });
    return { z: 1.04 + 0.08 * ss(sg(t, S.tAsk, S.tAsk + 4)), fx: 200, fy: 140 };
  }
}, [['V4', JCLOSE]]);

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '夜の高速道路', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { highway(c, t, {}); oldCar(c, 90, 152, { col: '#8c9cac', head: true, tail: true }); jinmen(c, 200, 166, { f: runF(t) }); return { z: 1.04 + 0.1 * ss(sg(t, at(S, 'S1', 3) - 0.2, S.dur)), fx: 200, fy: 140 }; } };
const SS2 = { name: 'もう一度', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { highway(c, t, { fog: true }); oldCar(c, 90, 152, { col: '#c8c8d0', head: true, tail: true }); jinmen(c, 200, 166, { f: runF(t), back: t < at(S, 'S2', 3) - 0.1, old: true }); return { z: 1.06, fx: 200, fy: 140 }; } };
