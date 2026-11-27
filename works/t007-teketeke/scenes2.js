/* ================= 都市伝説 #007 テケテケ: scenes ================= */
const TC = n => (c, t) => { const r = closeUp(c, t, tekeFace({ blink: blinkOf(t, 9), dark: n > 0 }), { bg: n ? ['#1c0404', '#5c0c14'] : ['#0c0814', '#2c2440'], glow: n ? '#8c1c1c' : '#3c3c5c', spk: 'teke', lines: n > 1 ? '#c83c3c' : null }); if (n) { c.save(); c.globalAlpha = 0.15 * n; for (let i = 0; i < 40; i++) P(c, fr(t * 7.3 + i * 0.37) * W, fr(t * 5.1 + i * 0.61) * 150, '#f8f8f8'); c.restore(); } return r; };
const SC = (c, t) => closeUp(c, t, shonenFace({ blink: 0 }), { bg: ['#1c0c0c', '#5c2c2c'], spk: 'shonen', lines: '#c8783c' });
function tekeSound(c, t, x, y, a = 1) { c.save(); c.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 12)); TX(c, 'テケ', x, y, '#e8e0f0', 16, null); TX(c, 'テケ', x + 40, y + 10, '#e8e0f0', 16, null); c.restore(); }
// the boy walking on the railway path (f animates)
function boy(c, t, x, o = {}) { person(c, SHONEN, x, o.y || 150, { k: 'by' + (o.k || ''), f: o.stop ? -1 : Math.floor(t * (o.run ? 8 : 4)) & 3, expr: o.expr || 'normal', flip: !!o.flip, blink: blinkOf(t, 5) }); R(c, x + (o.flip ? -10 : 4), (o.y || 150) - 22, 6, 10, '#3c2c1c'); }

/* ---- TKZ: cold open — the sound; the railway path at dusk; an upper-body woman racing on her arms; "テケテケ" (moves: the sound marks, the figure closing in, the name) ---- */
const TKZ = withCuts({
  name: 'テケテケ', ch: '夕暮れの音', bgm: 'dread',
  init(S) { S.tRoad = at(S, 'C0', 0) - 0.3; S.tSee = at(S, 'C1', 0) - 0.3; S.tName = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#06040a'); const k = sg(t, S.tName + 1.5, S.tName + 2.2); c.save(); c.globalAlpha = k; R(c, 100, 60, 120, 40, '#1c0c14'); TX(c, 'テケテケ', 128, 70, '#f8e0e8', 16, null); c.restore(); tekeSound(c, t, 60, 120, 0.5); return { z: 1.1 + 0.1 * k, fx: 160, fy: 84 }; }
    if (t > S.tSee) { lineRoad(c, t, {}); const k = sg(t, S.tSee + 1, S.tName); teke(c, t, lerp(320, 190, k), 150, { run: true, flip: true }); boy(c, t, 110, { expr: 'shock', stop: true, flip: true }); return { z: 1.1 + 0.2 * k, fx: 150, fy: 120 }; }
    lineRoad(c, t, {}); boy(c, t, 130, { k: 'z' }); tekeSound(c, t, 240, 80, sg(t, S.tRoad + 1, S.tRoad + 3));
    return { z: 1.06, fx: 160, fy: 110 };
  }
}, [['M1', (c, t) => { R(c, 0, 0, W, H, '#06040a'); tekeSound(c, t, 110, 70); return { z: 1.2, fx: 160, fy: 84 }; }]]);

/* ---- TKA: the rumour — told in schools; its form varies (moves: kids whispering in a dim classroom) ---- */
const TKA = {
  name: '学校の噂', ch: '語り継がれる噂', bgm: 'memory',
  init(S) { S.tForm = at(S, 'L1x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) { classroom(c, t, {}); for (let i = 0; i < 4; i++) person(c, KIDS[i], 110 + i * 34, 156, { k: 'ka' + i, flip: i >= 2, expr: (t > S.tForm && i === 3) ? 'shock' : 'normal', arm: i === 1 && Math.floor(t * 2) % 2 ? 'up' : null }); if (t > S.tForm) { const n = ['腕で走る', '肘で走る', '3日のうちに']; for (let i = 0; i < 3; i++) if (t > S.tForm + 0.6 + i * 0.8) plate(c, 40 + i * 88, 92, n[i], '#f8e8b0'); } return { z: 1.06, fx: 165, fy: 104 }; }
};

/* ---- TKB: the origin — a snowy winter crossing in the north; she falls; the train; (no injury shown) the cold; she crawled; she died, and since then… (moves: snow, flashing lights, a white flash, a long trail in the snow, dusk) ---- */
const TKB = {
  name: '冬の踏切', ch: '冬の踏切', bgm: 'eerie',
  init(S) { S.tFall = at(S, 'L3', 0) - 0.3; S.tTrain = at(S, 'L3', 2) - 0.3; S.tHorn = at(S, 'L3x', 0) - 0.3; S.tAfter = at(S, 'L4', 0) - 0.3; S.tCold = at(S, 'L5', 0) - 0.3; S.tCrawl = at(S, 'L5x', 0) - 0.3; S.tDie = at(S, 'L6', 0) - 0.3; S.tSince = at(S, 'L6', 2) - 0.3; S.tStill = at(S, 'L6x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tStill) { snowField(c, t); teke(c, t, 200, 150, { a: 0.35 + 0.1 * Math.sin(t * 2), flip: true }); return { z: 1.06, fx: 180, fy: 110 }; }
    if (t > S.tSince) { lineRoad(c, t, {}); teke(c, t, 260, 150, { a: sg(t, S.tSince + 0.5, S.tSince + 2) * 0.8, flip: true }); return { z: 1.06, fx: 200, fy: 110 }; }
    if (t > S.tDie) { snowField(c, t); dim(c, 0.6 * sg(t, S.tDie, S.tDie + 3)); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tCrawl) { snowField(c, t); for (let i = 0; i < 14; i++) { const x = 40 + i * 14; if (x < lerp(40, 236, sg(t, S.tCrawl, S.tDie))) { E(c, x, 150 + (i % 2) * 6, 3, 2, '#a8b0c0'); } } teke(c, t, lerp(40, 236, sg(t, S.tCrawl, S.tDie)), 150, { a: 0.85, flip: true }); return { z: 1.08, fx: 160, fy: 120 }; }
    if (t > S.tCold) { snowField(c, t); for (let i = 0; i < 6; i++) { const u = fr(t * 0.2 + i / 6); c.save(); c.globalAlpha = 0.4 * (1 - u); E(c, 160, 120 - u * 60, 6 + u * 14, 4 + u * 8, '#e8f0f8'); c.restore(); } plate(c, 40, 46, 'あまりの寒さ', '#c8e0f8'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tAfter) { crossing(c, t, { snow: true, down: true }); dim(c, 0.25); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tHorn) { crossing(c, t, { snow: true, down: true, flash: true }); const k = sg(t, S.tHorn, S.tHorn + 1.5); train(c, lerp(-40, 520, k), 150, { lit: true }); if (k > 0.2 && k < 0.6) dim(c, 0.7, '#f8f8f0'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tTrain) { crossing(c, t, { snow: true, down: true, flash: true }); person(c, ONNA, 160, 140, { k: 'bf', rot: Math.PI / 2, s: 0.9 }); glow(c, 0, 120, 60, 30, '#f8f0c0', 0.3 + 0.3 * sg(t, S.tTrain, S.tHorn)); return { z: 1.1, fx: 150, fy: 110 }; }
    if (t > S.tFall) { crossing(c, t, { snow: true }); person(c, ONNA, 160, 140, { k: 'bf', rot: Math.PI / 2, s: 0.9 }); return { z: 1.1, fx: 160, fy: 110 }; }
    crossing(c, t, { snow: true }); person(c, ONNA, lerp(40, 150, sg(t, 0.5, 4)), 150, { k: 'bw', f: Math.floor(t * 3) & 3 }); plate(c, 40, 46, 'ある冬の夕方', '#c8e0f8');
    return { z: 1.06, fx: 140, fy: 104 };
  }
};

/* ---- TKC: what she is like — dusk to night; corridors, crossings; upper body, long hair, arms; the sound; 100–150 km/h; whispered on school trips; caught → made the same (moves: place cards, the figure crossing, a speedometer, futons) ---- */
const TKC = {
  name: 'テケテケの姿', ch: '噂のテケテケ', bgm: 'dread',
  init(S) { S.tLook = at(S, 'L7x', 0) - 0.3; S.tSound = at(S, 'L8', 0) - 0.3; S.tSpeed = at(S, 'L9', 0) - 0.3; S.tTrip = at(S, 'L9x', 0) - 0.3; S.tCaught = at(S, 'L10', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCaught) { R(c, 0, 0, W, H, '#06040a'); teke(c, t, 160, 140, { s: 2, face: true }); dim(c, 0.3); if (t > at(S, 'L10', 1) - 0.3) plate(c, 60, 46, '自分と同じ姿に', '#f8a0a0'); return { z: 1.06, fx: 160, fy: 100 }; }
    if (t > S.tTrip) { R(c, 0, 0, W, H, '#14141c'); R(c, 0, 120, W, 70, '#3c3c34'); for (let i = 0; i < 4; i++) { R(c, 30 + i * 70, 126, 60, 20, '#e8e4d8'); E(c, 40 + i * 70, 124, 8, 6, KIDS[i].skin); R(c, 34 + i * 70, 118, 12, 6, '#141418'); } R(c, 150, 40, 30, 16, '#e8e8f0'); TX(c, '…', 156, 38, '#2c2c34', 16, null); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tSpeed) { R(c, 0, 0, W, H, '#0c0c14'); E(c, 160, 96, 50, 50, '#2c2c34'); E(c, 160, 96, 46, 46, '#1c1c24'); for (let i = 0; i <= 8; i++) { const a = Math.PI * 0.8 + i / 8 * Math.PI * 1.4; L(c, 160 + Math.cos(a) * 40, 96 + Math.sin(a) * 40, 160 + Math.cos(a) * 46, 96 + Math.sin(a) * 46, '#e8e8f0'); } const v = Math.min(150, (t - S.tSpeed) * 35), a = Math.PI * 0.8 + v / 180 * Math.PI * 1.4; L(c, 160, 96, 160 + Math.cos(a) * 38, 96 + Math.sin(a) * 38, '#f83c3c', 2); plate(c, 120, 128, Math.floor(v) + 'km/h', '#f8a0a0'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tSound) { lineRoad(c, t, { night: true }); teke(c, t, lerp(340, -40, sg(t, S.tSound, S.tSpeed)), 150, { run: true, flip: true }); tekeSound(c, t, 120, 70); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tLook) { R(c, 0, 0, W, H, '#0c0c14'); teke(c, t, 160, 136, { s: 2.2 }); return { z: 1.06, fx: 160, fy: 96 }; }
    const ph = Math.min(2, Math.floor((t - 0.3) / 2.6)); if (ph === 0) lineRoad(c, t, {}); else if (ph === 1) corridor(c, t, { dusk: true }); else crossing(c, t, { flash: true, down: true }); plate(c, 40, 46, ['人通りの少ない道', '学校の廊下', '踏切の近く'][ph], '#f8e8b0');
    return { z: 1.04, fx: 160, fy: 104 };
  }
};

/* ---- TKD: one boy's story — after club, alone on the railway path at dusk; the crossing light; the sound; nothing behind; again, nearer; the head behind the pole (pause) no legs; she runs (moves: the walk, looking back, the pole, the chase) ---- */
const TKD = withCuts({
  name: '帰り道', ch: 'ある男子生徒の話', bgm: 'eerie',
  init(S) { S.tWalk = at(S, 'L12', 0) - 0.3; S.tDark = at(S, 'L12x', 0) - 0.3; S.tCross = at(S, 'L12y', 0) - 0.3; S.tHear = at(S, 'L13', 0) - 0.3; S.tLook = at(S, 'L14x', 0) - 0.3; S.tNear = at(S, 'L15', 0) - 0.3; S.tPole = at(S, 'L15x', 0) - 0.3; S.tNo = at(S, 'L16', 0) - 0.3; S.tRun = at(S, 'L16x', 0) - 0.3; S.tFlee = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFlee) { lineRoad(c, t, { night: true, v: 260 }); boy(c, t, 110, { run: true, k: 'f' }); teke(c, t, lerp(320, 220, sg(t, S.tFlee, S.dur)), 150, { run: true, flip: true }); tekeSound(c, t, 240, 70); return { z: 1.1, fx: 160, fy: 116 }; }
    if (t > S.tRun) { lineRoad(c, t, { night: true }); boy(c, t, 110, { expr: 'shock', stop: true, flip: true, k: 'r' }); teke(c, t, lerp(250, 200, sg(t, S.tRun, S.tRun + 2)), 150, { run: true, flip: true }); return { z: 1.2, fx: 160, fy: 116 }; }
    if (t > S.tNo) { R(c, 0, 0, W, H, '#06060a'); R(c, 180, 20, 6, 140, '#1c1c1c'); teke(c, t, 200, 150, { s: 1.4, flip: true }); return { z: 1.5, fx: 196, fy: 120 }; }
    if (t > S.tPole) { lineRoad(c, t, { night: true }); R(c, 236, 50, 6, 86, '#141414'); c.save(); c.beginPath(); c.rect(220, 100, 18, 40); c.clip(); teke(c, t, 236, 148, { flip: true }); c.restore(); boy(c, t, 110, { stop: true, flip: true, expr: 'shock', k: 'p' }); return { z: 1.3, fx: 200, fy: 116 }; }
    if (t > S.tNear) { lineRoad(c, t, { night: true }); boy(c, t, 130, { stop: true, flip: true, k: 'n' }); tekeSound(c, t, 220, 90, 0.8); return { z: 1.1, fx: 160, fy: 110 }; }
    if (t > S.tLook) { lineRoad(c, t, { night: true }); boy(c, t, lerp(130, 160, sg(t, S.tLook + 2, S.tNear)), { flip: t < S.tLook + 2, stop: t < S.tLook + 2, k: 'l' }); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tHear) { lineRoad(c, t, { night: true }); boy(c, t, 130, { stop: true, k: 'h' }); tekeSound(c, t, 230, 90, 0.5); return { z: 1.1, fx: 160, fy: 110 }; }
    if (t > S.tCross) { crossing(c, t, { flash: true, down: false }); boy(c, t, lerp(60, 140, sg(t, S.tCross, S.tHear)), { k: 'c' }); return { z: 1.06, fx: 140, fy: 104 }; }
    if (t > S.tDark) { lineRoad(c, t, { night: t > S.tDark + 2 }); boy(c, t, 140, { k: 'd' }); dim(c, 0.4 * sg(t, S.tDark, S.tDark + 2)); return { z: 1.06, fx: 150, fy: 110 }; }
    if (t > S.tWalk) { lineRoad(c, t, { v: 30 }); boy(c, t, 140, { k: 'w' }); return { z: 1.06, fx: 150, fy: 110 }; }
    corridor(c, t, { dusk: true }); boy(c, t, lerp(40, 200, sg(t, 0.5, S.tWalk)), { k: 'g' }); plate(c, 40, 46, 'ある学校の話', '#f8e8b0');
    return { z: 1.06, fx: 150, fy: 104 };
  }
}, [['M2', TC(0)], ['M3', TC(1)], ['B1', SC]]);

/* ---- TKE: the turn — he remembers: she cannot climb stairs; up the footbridge; the sound stops; something below; (one last look) hair in the dark; the next day the friend's warning; nobody knows (moves: a thought bubble, the climb, the hair swaying) ---- */
const TKE = {
  name: '歩道橋', ch: '歩道橋', bgm: 'pulse',
  init(S) { S.tStairs = at(S, 'L18x', 0) - 0.3; S.tStop = at(S, 'L19', 0) - 0.3; S.tLook = at(S, 'L19y', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLook) { R(c, 0, 0, W, H, '#06060a'); lampPost(c, t, 250, 160); c.save(); c.globalAlpha = 0.6 + 0.2 * Math.sin(t * 2); for (let i = 0; i < 8; i++) L(c, 120 + i * 3 + Math.sin(t * 2 + i) * 3, 110, 118 + i * 3 + Math.sin(t * 2 + i + 1) * 5, 150, '#141418', 2); c.restore(); return { z: 1.2, fx: 150, fy: 120 }; }
    if (t > S.tStop) { footbridge(c, t); boy(c, t, 160, { y: 50, stop: true, flip: true, expr: 'shock', k: 'st' }); c.save(); c.globalAlpha = 0.3; teke(c, t, 70, 150, { flip: true }); c.restore(); return { z: 1.06, fx: 140, fy: 96 }; }
    if (t > S.tStairs) { footbridge(c, t); const k = sg(t, S.tStairs, S.tStop); boy(c, t, lerp(40, 90, k), { y: lerp(150, 58, k), run: true, k: 'up' }); teke(c, t, lerp(-30, 30, k), 150, { run: true }); return { z: 1.06, fx: 120, fy: 100 }; }
    lineRoad(c, t, { night: true, v: 200 }); boy(c, t, 150, { run: true, k: 'th' }); R(c, 190, 52, 80, 40, '#e8e8f0'); E(c, 186, 96, 4, 4, '#e8e8f0'); E(c, 180, 104, 2, 2, '#e8e8f0'); for (let i = 0; i < 5; i++) R(c, 200 + i * 12, 82 - i * 6, 12, 2, '#2c2c34'); plate(c, 40, 46, '階段が苦手', '#f8e8b0');
    return { z: 1.06, fx: 170, fy: 100 };
  }
};
const TKH0 = { name: '見上げる', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, tekeFace({ dark: true }), [[28, 22]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- TKF: the next day; the friend's warning; the story ends here (moves: the classroom, pale faces, the empty path) ---- */
const TKF = {
  name: '次の日', ch: '次の日', bgm: 'eerie',
  init(S) { S.tEnd = at(S, 'L21', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tEnd) { lineRoad(c, t, { night: true }); dim(c, 0.3); return { z: 1.04 + 0.04 * sg(t, S.tEnd, S.dur), fx: 160, fy: 104 }; }
    classroom(c, t); boy(c, t, 130, { stop: true, k: 'cl' }); person(c, KIDS[2], 170, 156, { k: 'fr', expr: 'shock', flip: true, blink: blinkOf(t, 3) }); if (t > at(S, 'L20x', 0) - 0.3) plate(c, 40, 46, '一度見つけた相手は…', '#f8a0a0');
    return { z: 1.1, fx: 150, fy: 108 };
  }
};

/* ---- TKG: many forms — elbows; legs only; a man; three days; the words; Kashima-san (moves: three panels, a calendar, a question mark) ---- */
const TKG = {
  name: 'いくつもの形', ch: 'いくつもの形', bgm: 'memory',
  init(S) { S.tForms = at(S, 'L23', 0) - 0.3; S.tOld = at(S, 'L23x', 0) - 0.3; S.tDays = at(S, 'L24', 0) - 0.3; S.tKashima = at(S, 'L25', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tKashima) { R(c, 0, 0, W, H, '#14101c'); R(c, 60, 40, 80, 90, '#241c34'); teke(c, t, 100, 120, {}); R(c, 180, 40, 80, 90, '#241c34'); TX(c, '？', 214, 70, '#e8e0f0', 16, null); TX(c, '＝', 152, 76, '#c8c8e0', 16, null); plate(c, 190, 134, 'カシマさん', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tDays) { R(c, 0, 0, W, H, '#14141c'); for (let i = 0; i < 3; i++) if (t > S.tDays + 0.6 + i * 0.7) { R(c, 60 + i * 74, 50, 56, 56, '#e8e4d8'); R(c, 60 + i * 74, 50, 56, 12, '#c81818'); TX(c, (i + 1) + '日目', 66 + i * 74, 74, '#2c2c2c', 16, null); } if (t > at(S, 'L24', 2) - 0.3) plate(c, 90, 120, '決まった言葉', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tOld) { R(c, 0, 0, W, H, '#0c0c10'); lineRoad(c, t, { night: true }); dim(c, 0.5); TX(c, '？', 150, 70, '#e8e0f0', 16, null); return { z: 1.04, fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#14101c');
    if (t > S.tForms) { const SG = [0, 2, 4]; const ns = ['肘で走る', '下半身だけ', '男の姿']; for (let i = 0; i < 3; i++) { const tt = at(S, 'L23', SG[i]) - 0.3; if (t < tt) break; const x = 16 + i * 100; R(c, x, 40, 92, 80, '#2c2438'); R(c, x + 4, 44, 84, 72, '#241c34'); if (i === 0) teke(c, t, x + 46, 110, {}); if (i === 1) { R(c, x + 36, 76, 20, 14, '#2c2c3c'); L(c, x + 40, 90, x + 38, 110, '#d8d0cc', 3); L(c, x + 52, 90, x + 54, 110, '#d8d0cc', 3); } if (i === 2) shadow(c, ONNA, x + 46, 112, { k: 'mm', col: '#0c0c10', s: 0.8 }); plate(c, x + 4, 124, ns[i], '#f8e8b0'); } return { z: 1.0, fx: 160, fy: 96 }; }
    for (let i = 0; i < 3; i++) { R(c, 60 + i * 70, 60, 50, 50, '#2c2438'); TX(c, '？', 78 + i * 70, 76, '#c8c8e0', 16, null); }
    return { z: 1.04, fx: 160, fy: 96 };
  }
};

/* ---- TKI: why it spread — she may only be searching; the walk home at dusk; the uneasy feeling given a name; crossings really are dangerous: wait at the barrier (moves: kids walking home, the barrier, kids waiting) ---- */
const TKI = {
  name: '踏切の前で', ch: 'なぜ広まったのか', bgm: 'requiem',
  init(S) { S.tSearch = at(S, 'L26x', 0) - 0.3; S.tHome = at(S, 'L27', 0) - 0.3; S.tName = at(S, 'L27x', 0) - 0.3; S.tCross = at(S, 'L28', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCross) { crossing(c, t, { flash: true, down: t > S.tCross + 2 }); for (let i = 0; i < 3; i++) person(c, KIDS[i], 50 + i * 22, 156, { k: 'iw' + i, flip: false }); if (t > S.tCross + 3) train(c, lerp(-40, 560, sg(t, S.tCross + 3, S.tCross + 6)), 150, { lit: false }); if (t > at(S, 'L28x', 0) - 0.3) plate(c, 160, 46, '遮断機が下りたら、待つ', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tName) { lineRoad(c, t, {}); boy(c, t, 150, { stop: true, k: 'in' }); c.save(); c.globalAlpha = 0.3; teke(c, t, 240, 150, { flip: true }); c.restore(); return { z: 1.06, fx: 170, fy: 108 }; }
    if (t > S.tHome) { lineRoad(c, t, { v: 30 }); for (let i = 0; i < 3; i++) person(c, KIDS[i], 90 + i * 40, 152, { k: 'ih' + i, f: Math.floor(t * 4 + i) & 3 }); if (t > at(S, 'L27', 4) - 0.3) for (let i = 0; i < 3; i++) person(c, KIDS[i], 90 + i * 40, 152, { k: 'ih' + i, flip: true }); return { z: 1.04, fx: 160, fy: 106 }; }
    if (t > S.tSearch) { snowField(c, t); teke(c, t, 160, 150, { a: 0.4 }); dim(c, 0.2); return { z: 1.06, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#14141c'); TX(c, '？', 154, 70, '#c8c8e0', 16, null);
    return { z: 1.04, fx: 160, fy: 96 };
  }
};

/* ---- TKM: ending — if tonight you hear a small sound behind you; find the stairs (moves: the night path, the footbridge, fading) ---- */
const TKM = withCuts({
  name: '今夜の帰り道', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { if (t > at(S, 'L30', 0) - 0.3) { footbridge(c, t); dim(c, 0.3 * sg(t, at(S, 'L30', 0), at(S, 'L30', 0) + 10)); return { z: 1.04, fx: 160, fy: 100 }; } lineRoad(c, t, { night: true }); tekeSound(c, t, 220, 90, 0.4); return { z: 1.04, fx: 160, fy: 104 }; }
}, [['M4', TC(2)]]);

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: 'テケテケ', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { lineRoad(c, t, {}); boy(c, t, 110, { stop: true, flip: true, expr: 'shock', k: 's1' }); teke(c, t, 210, 150, { run: true, flip: true }); tekeSound(c, t, 220, 80); return { z: 1.2, fx: 160, fy: 118 }; } };
const SS2 = { name: '帰り道', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { lineRoad(c, t, { v: 30 }); boy(c, t, 140, { k: 's2' }); return { z: 1.06 + 0.06 * sg(t, 0, S.dur), fx: 150, fy: 110 }; } };
