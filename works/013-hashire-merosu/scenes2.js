/* ================= 文庫 #013 走れメロス: scenes ================= */
const MCLOSE = (c, t) => closeUp(c, t, merosFace({ blink: blinkOf(t, 5) }), { bg: ['#1c1008', '#5c3c1c'], spk: 'merosu' });
const MANGRY = (c, t) => closeUp(c, t, merosFace({ blink: blinkOf(t, 5), angry: true }), { bg: ['#2c0808', '#7c1c14'], lines: '#f86c3c', spk: 'merosu' });
const MRAG = (c, t) => closeUp(c, t, merosFace({ blink: blinkOf(t, 5), rag: true }), { bg: ['#2c0c14', '#a83c2c'], glow: '#f88c40', spk: 'merosu' });
const MCRY = (c, t) => closeUp(c, t, merosFace({ blink: blinkOf(t, 5), rag: true, cry: true }), { bg: ['#0c0c14', '#2c2c3c'], spk: 'merosu' });
const MHOPE = (c, t) => closeUp(c, t, merosFace({ blink: blinkOf(t, 5), rag: true }), { bg: ['#3c140c', '#e8803c'], glow: '#f8d890', lines: '#f8e8a0', spk: 'merosu' });
const MSMILE = (c, t) => closeUp(c, t, merosFace({ blink: blinkOf(t, 5), smile: true }), { bg: ['#1c1408', '#6c5c2c'], spk: 'merosu' });
const KCLOSE = (c, t) => closeUp(c, t, ouFace({ blink: blinkOf(t, 7) }), { bg: ['#14060e', '#3c1430'], spk: 'ou', s: 3.1 });
const KSMIRK = (c, t) => closeUp(c, t, ouFace({ blink: blinkOf(t, 7), smirk: true }), { bg: ['#0c0408', '#2c0c1c'], talk: false, s: 3.1 });
const KSOFT = (c, t) => closeUp(c, t, ouFace({ blink: blinkOf(t, 7), soft: true }), { bg: ['#2c1418', '#8c4c3c'], glow: '#f8c890', spk: 'ou', s: 3.1 });
const SCLOSE = (c, t) => closeUp(c, t, serinuFace({ blink: blinkOf(t, 6), smile: true }), { bg: ['#1c1814', '#6c5c4c'], spk: 'serinu' });
const SSAD = (c, t) => closeUp(c, t, serinuFace({ blink: blinkOf(t, 6), sad: true }), { bg: ['#0c0c14', '#3c3c4c'], spk: 'serinu' });
const RCLOSE = (c, t) => closeUp(c, t, roujinFace({ blink: blinkOf(t, 3) }), { bg: ['#06060e', '#1c1c34'], spk: 'roujin' });
const BCLOSE = (c, t) => closeUp(c, t, banditFace({ blink: blinkOf(t, 4) }), { bg: ['#140c08', '#4c3420'], spk: 'sanzoku' });
const FCLOSE = (c, t) => closeUp(c, t, firoFace({ blink: blinkOf(t, 4) }), { bg: ['#2c0c14', '#a83c2c'], spk: 'firo' });

/* ---- GZ: cold open — the sun on the horizon, a ragged man running alone; a friend dies at sunset (moves: he runs, dust, the sun sinks) ---- */
const GZ = withCuts({
  name: '夕陽の道', ch: '日没まで', bgm: 'climb',
  init(S) { S.tBlood = at(S, 'C1', 0) - 0.3; S.tFriend = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tFriend) { plaza(c, t, { sunY: 92 }); robe(c, SERINU, 220, 122, { k: 'zf', arm: 'clasp', expr: 'sad' }); for (let i = 0; i < 4; i++) L(c, 214, 92 + i * 6, 226, 94 + i * 6, '#c8a870'); crowdRow(c, t, 166, 9, { k: 'z' }); return { z: 1.12, fx: 200, fy: 100 }; }
    plains(c, t, { sunY: lerp(84, 92, sg(t, 0, S.dur)), speed: 90, drift: 20 }); runner(c, t > S.tBlood ? MEROS_RAG : MEROS_RAG, 170, 160, t, { dir: -1, k: 'z' });
    return { z: t > S.tBlood ? 1.25 : 1.05, fx: 170, fy: t > S.tBlood ? 128 : 110 };
  }
}, [['V0', MRAG]]);

/* ---- GA: who Meros is — the fury; a shepherd with a flute and sheep; ten ri to Syracuse for his sister's wedding; Selinuntius the stonemason (moves: angry rays, sheep graze, the walk, the chisel strikes) ---- */
const GA = {
  name: 'メロス', ch: '村の牧人', bgm: 'memory',
  init(S) { S.tFlute = at(S, 'L2', 0) - 0.3; S.tTrip = at(S, 'L3', 0) - 0.3; S.tFriend = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFriend) { city(c, t); for (let i = 0; i < 3; i++) R(c, 60 + i * 22, 140 - i * 10, 20, 10, '#e8e0d0'); robe(c, SERINU, 150, 160, { k: 'mason', arm: Math.floor(t * 3) % 2 ? 'up' : 'reach' }); R(c, 172, 118, 24, 40, '#e8e0d0'); R(c, 172, 118, 24, 3, '#f8f4ec'); if (Math.floor(t * 3) % 2 === 0) for (let i = 0; i < 4; i++) P(c, 170 - i * 2, 126 - i * 3, '#f8f4ec'); plate(c, 20, 46, '竹馬の友　セリヌンティウス', '#f8e8b0'); return { z: 1.12, fx: 160, fy: 120 }; }
    if (t > S.tTrip) { plains(c, t, { sunY: 30, speed: 30, drift: 6 }); R(c, 230, 70, 60, 30, '#e8e0d0'); R(c, 252, 52, 12, 18, '#f0e8d8'); PF(c, [250, 52, 258, 44, 266, 52], '#c86c4c'); robe(c, MEROS, 140, 160, { f: Math.floor(t * 5) % 4, k: 'walk' }); E(c, 130, 120, 7, 9, '#a87c4c'); L(c, 126, 112, 134, 128, '#5c3c24'); plate(c, 20, 46, '十里はなれた　シラクスの市へ', '#f8e8b0'); return { z: 1.08, fx: 170, fy: 116 }; }
    if (t > S.tFlute) { village(c, t); robe(c, MEROS, 120, 160, { k: 'fl', arm: 'reach', blink: blinkOf(t, 5) }); L(c, 132, 128, 142, 124, '#c8a870', 2); for (let i = 0; i < 3; i++) { const u = fr(t * 0.6 + i / 3); c.save(); c.globalAlpha = 1 - u; TX(c, '♪', 146 + u * 30, 110 - u * 30, '#3c3c5c', 16, null); c.restore(); } plate(c, 20, 46, '村の牧人', '#f8e8b0'); return { z: 1.06, fx: 150, fy: 116 }; }
    return MANGRY(c, t);
  }
};

/* ---- GB: the silent city — night, no songs; he shakes an old man; the king kills; the list of the dead; "生かして置けぬ" (moves: wind, shaking, names appear one by one) ---- */
const GB = withCuts({
  name: '寂しい市', ch: '王は人を殺す', bgm: 'eerie',
  init(S) { S.tShake = at(S, 'L6', 0) - 0.3; S.tList = at(S, 'L7', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tList) { city(c, t, { night: true }); dim(c, 0.55); const names = ['妹婿', '世継ぎ', '妹', '皇后', 'きょうは、六人']; const n = Math.min(5, 1 + Math.floor(sg(t, S.tList, at(S, 'M1', 0) - 0.6) * 5)); for (let i = 0; i < n; i++) { plate(c, 50 + (i % 2) * 110, 52 + i * 18, names[i], i === 4 ? '#f8a0a0' : '#c8c8d8'); E(c, 30 + (i % 2) * 110 + 10, 62 + i * 18, 3, 3, '#a82c2c'); } return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tShake) { city(c, t, { night: true }); const sh = Math.round(Math.sin(t * 30) * 2); robe(c, OLDMAN, 180 + sh, 160, { k: 'om', expr: 'shock' }); robe(c, MEROS, 150, 160, { k: 'sk', arm: 'reach', expr: 'angry' }); return { z: 1.18, fx: 166, fy: 122 }; }
    city(c, t, { night: true }); robe(c, MEROS, lerp(60, 160, sg(t, 0, S.tShake)), 160, { f: Math.floor(t * 5) % 4, k: 'nw', expr: 'sad' }); E(c, lerp(50, 150, sg(t, 0, S.tShake)), 120, 7, 9, '#a87c4c');
    return { z: 1.05, fx: 140, fy: 110 };
  }
}, [['R1', RCLOSE], ['M1', MANGRY]]);

/* ---- GC: arrested — he walks into the castle with his shopping; guards seize him, a dagger falls; the pale king; the debate (moves: guards close in, the dagger glints, torches) ---- */
const GC = withCuts({
  name: '王城', ch: '暴君ディオニス', bgm: 'dread',
  init(S) { S.tSeize = at(S, 'L8', 2) - 0.3; S.tKing = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tKing) { hall(c, t); robe(c, KING, 160, 122, { k: 'kt', pose: 'sit', blink: blinkOf(t, 7) }); crown(c, 160, 122 + 18); robe(c, GUARD, 70, 160, { k: 'g1', arm: 'staff' }); robe(c, GUARD, 250, 160, { k: 'g2', arm: 'staff', flip: true }); robe(c, MEROS, 130, 166, { k: 'kn', pose: 'kneel', expr: 'angry', flip: true }); plate(c, 20, 46, '暴君ディオニス', '#f8c8c8'); return { z: 1.1, fx: 160, fy: 112 }; }
    city(c, t); R(c, 0, 40, W, 70, '#d8d0c0'); R(c, 120, 60, 80, 50, '#3c2c24'); PF(c, [116, 62, 160, 40, 204, 62], '#c8bca8');
    const k = sg(t, S.tSeize, S.tSeize + 0.6);
    robe(c, GUARD, lerp(60, 128, k), 160, { k: 'gs1', arm: 'staff' }); robe(c, GUARD, lerp(260, 192, k), 160, { k: 'gs2', arm: 'staff', flip: true }); robe(c, MEROS, t > S.tSeize ? 160 : lerp(100, 160, sg(t, 0, S.tSeize)), 160, { f: t > S.tSeize ? -1 : Math.floor(t * 5) % 4, k: 'gw', expr: t > S.tSeize ? 'shock' : 'normal' }); E(c, t > S.tSeize ? 150 : lerp(90, 150, sg(t, 0, S.tSeize)), 120, 7, 9, '#a87c4c');
    if (t > at(S, 'L8', 3) - 0.3) { const dy = Math.min(162, 136 + (t - at(S, 'L8', 3)) * 60); L(c, 170, dy, 180, dy - 2, '#d8d8e0', 2); R(c, 166, dy - 1, 4, 3, '#6c4c2c'); if (fr(t * 2) < 0.5) P(c, 178, dy - 3, '#ffffff'); }
    return { z: 1.1, fx: 160, fy: 118 };
  }
}, [['D1', KCLOSE], ['M2', MANGRY], ['D2', KCLOSE], ['D3', KCLOSE]]);

/* ---- GD: the promise — three days; "逃がした小鳥"; the hostage; the king's cruel smile (moves: a little bird flies off, the sun-glass turns, the king's smirk) ---- */
const GD = withCuts({
  name: '三日の約束', ch: '三日の日限', bgm: 'pulse',
  init(S) { S.tSmile = at(S, 'L11', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSmile && t < at(S, 'D5', 0) - 0.3) { return KSMIRK(c, t); }
    hall(c, t); robe(c, KING, 160, 122, { k: 'kp', pose: 'sit', blink: blinkOf(t, 7) }); crown(c, 160, 140); robe(c, GUARD, 70, 160, { k: 'p1', arm: 'staff' }); robe(c, GUARD, 250, 160, { k: 'p2', arm: 'staff', flip: true }); robe(c, MEROS, 140, 166, { k: 'pk', pose: 'kneel', flip: true });
    plate(c, 20, 46, '処刑まで　三日', '#f8e8b0');
    return { z: 1.08, fx: 160, fy: 104 };
  }
}, [['M4', MCLOSE], ['D4', (c, t) => { const r = KCLOSE(c, t); const u = fr(t * 0.5); E(c, 250 + u * 60, 70 - u * 40, 5, 4, '#f8f0e0'); PF(c, [244 + u * 60, 70 - u * 40, 252 + u * 60, 62 - u * 40 + (fr(t * 4) < 0.5 ? -4 : 4), 256 + u * 60, 70 - u * 40], '#f8f0e0'); L(c, 246 + u * 60, 70 - u * 40 + (fr(t * 4) < 0.5 ? -3 : 2), 250 + u * 60, 70 - u * 40, '#f8f0e0'); return r; }], ['M5', MCLOSE], ['D5', KCLOSE]]);

/* ---- GE: the friend — midnight, the reunion; a silent nod, an embrace; the rope; the starry night road (moves: they step together, the rope, stars twinkle) ---- */
const GE = {
  name: '友と友', ch: '竹馬の友', bgm: 'memory',
  init(S) { S.tHug = at(S, 'L13', 1) - 0.3; S.tGo = at(S, 'L14', 0) - 0.3; S.tStars = at(S, 'L14', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tStars) { R(c, 0, 0, W, H, '#06061a'); VG(c, 0, 0, W, 110, ['#04040e', '#0c0c2c', '#1c1c44']); for (let i = 0; i < 80; i++) { const tw = (Math.floor(t * 3) + i) % 9 === 0; P(c, (i * 73) % W, (i * 41) % 100, tw ? '#ffffff' : '#8c8cc8'); } R(c, 0, 110, W, 80, '#14141c'); PF(c, [0, 150, W, 140, W, 164, 0, 172], '#2c2c34'); runner(c, MEROS, lerp(260, 120, sg(t, S.tStars, S.dur)), 160, t, { dir: -1, k: 'st', dustCol: '#3c3c4c' }); plate(c, 20, 46, '初夏、満天の星', '#c8d0f0'); return { z: 1.04, fx: 160, fy: 100 }; }
    hall(c, t, { throne: false }); dim(c, 0.35);
    const k = sg(t, S.tHug - 1.2, S.tHug); const x1 = lerp(110, 146, k), x2 = lerp(210, 172, k);
    robe(c, MEROS, x1, 160, { k: 'hg1', arm: k > 0.9 ? 'reach' : null }); robe(c, SERINU, x2, 160, { k: 'hg2', arm: k > 0.9 ? 'reach' : null, flip: true, expr: t > S.tGo ? 'normal' : 'smile' });
    if (t > S.tGo) for (let i = 0; i < 4; i++) L(c, x2 - 6, 124 + i * 5, x2 + 6, 126 + i * 5, '#c8a870');
    robe(c, KING, 270, 160, { k: 'kw', blink: blinkOf(t, 7) }); crown(c, 270, 160); robe(c, GUARD, 40, 160, { k: 'e1', arm: 'staff' });
    if (t < S.tHug - 0.6) plate(c, 20, 56, '二年ぶりの再会', '#f8e8b0');
    return { z: 1.14, fx: 160, fy: 118 };
  }
};

/* ---- GF: the village — the sister with the flock; "なんでも無い"; the wedding at noon; the black clouds and the downpour; singing, clapping; his words to his sister; asleep in the sheepfold (moves: sheep, rain, clapping, Zz) ---- */
const GF = withCuts({
  name: '妹の結婚式', ch: '妹の結婚式', bgm: 'memory',
  init(S) { S.tWed = at(S, 'L16', 1) - 0.3; S.tRain = at(S, 'L17', 0) - 0.3; S.tFeast = at(S, 'L17', 2) - 0.3; S.tStay = at(S, 'L18', 0) - 0.3; S.tSleep = at(S, 'L19', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSleep) { R(c, 0, 0, W, H, '#1c1810'); VG(c, 0, 0, W, 130, ['#14100c', '#2c2418', '#3c3020']); for (let x = 0; x < W; x += 26) R(c, x, 0, 3, 130, '#241c10'); R(c, 0, 130, W, 60, '#6c5c34'); for (let i = 0; i < 40; i++) L(c, (i * 13) % W, 132 + (i * 7) % 50, (i * 13) % W + 4, 130 + (i * 7) % 50, '#8c7c44'); for (let i = 0; i < 3; i++) sheep(c, 220 + i * 30, 150 + (i % 2) * 8, t + i); robe(c, MEROS, 130, 142, { k: 'sl', pose: 'sit', blink: 2, rot: -1.45 }); for (let i = 0; i < 3; i++) { const u = fr(t * 0.5 + i / 3); c.save(); c.globalAlpha = 1 - u; TX(c, 'z', 120 + u * 20 + i * 4, 100 - u * 30, '#c8c8e8', 16, null); c.restore(); } return { z: 1.1, fx: 150, fy: 120 }; }
    if (t > S.tStay) { feast(c, t); robe(c, BRIDE, 200, 150, { k: 'sb', blink: blinkOf(t, 3), expr: 'smile' }); robe(c, GROOM, 230, 150, { k: 'sg', expr: 'smile' }); robe(c, MEROS, 120, 150, { k: 'ss', expr: t > at(S, 'L18', 1) - 0.3 ? 'sad' : 'smile', blink: blinkOf(t, 5) }); return { z: 1.22, fx: 150, fy: 112 }; }
    if (t > S.tFeast) { feast(c, t); for (let i = 0; i < 6; i++) { const cl = Math.floor(t * 4 + i) % 2; robe(c, CROWD[i], 30 + i * 52, 150 - (cl ? 2 : 0), { k: 'fc' + i, arm: cl ? 'up' : 'clasp', expr: 'smile', flip: i % 2 === 1 }); } robe(c, BRIDE, 140, 150, { k: 'fb', expr: 'smile' }); robe(c, GROOM, 166, 150, { k: 'fg', expr: 'smile' }); for (let i = 0; i < 3; i++) { const u = fr(t * 0.7 + i / 3); c.save(); c.globalAlpha = 1 - u; TX(c, '♪', 60 + i * 90 + u * 10, 90 - u * 30, '#f8e8a0', 16, null); c.restore(); } return { z: 1.05, fx: 160, fy: 110 }; }
    if (t > S.tRain) { village(c, t, { rain: true, sheep: false }); const fl = fr(t * 0.4) < 0.06; if (fl) dim(c, 0.6, '#f8f8ff'); for (let i = 0; i < 5; i++) E(c, 40 + i * 64 + Math.sin(t * 0.3 + i) * 8, 16 + (i % 2) * 8, 40, 14, '#24262c'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tWed) { village(c, t, { sheep: false }); for (let i = 0; i < 4; i++) robe(c, CROWD[i + 2], 50 + i * 30, 160, { k: 'wc' + i, expr: 'smile' }); robe(c, BRIDE, 200, 160, { k: 'wb', arm: 'clasp', expr: 'smile' }); robe(c, GROOM, 226, 160, { k: 'wg', arm: 'clasp' }); for (let i = 0; i < 10; i++) { const u = fr(t * 0.3 + i / 10); P(c, 180 + (i * 17) % 70 + Math.sin(t + i) * 3, 40 + u * 110, ['#f8c8d8', '#f8f0a0', '#ffffff'][i % 3]); } plate(c, 20, 46, '結婚式は、真昼に', '#f8e8b0'); return { z: 1.1, fx: 190, fy: 116 }; }
    village(c, t); robe(c, SISTER, 200, 160, { k: 'sis', expr: t > at(S, 'L15', 1) ? 'shock' : 'normal', blink: blinkOf(t, 3), flip: true }); robe(c, MEROS_RAG, lerp(20, 140, sg(t, 0, 4)), 160 + Math.round(Math.sin(t * 5)), { f: Math.floor(t * 4) % 4, k: 'stg', rot: 0.08 * Math.sin(t * 3), expr: 'sad' });
    return { z: 1.08, fx: 160, fy: 118 };
  }
}, [['M6', MSMILE], ['M7', MCLOSE]]);

/* ---- GG: the third day — dawn rain; "私は、今宵、殺される"; he runs out like an arrow; the river in flood, the bridge smashed; the prayer; the swim (moves: rain, the run, torrent, the swimmer fights the waves) ---- */
const GG = withCuts({
  name: '濁流', ch: '三日目の朝', bgm: 'climb',
  init(S) { S.tVow = at(S, 'L21', 0) - 0.3; S.tRun = at(S, 'L22', 0) - 0.3; S.tFlood = at(S, 'L23', 0) - 0.3; S.tSwim = at(S, 'L24', 1) - 0.3; S.tShore = at(S, 'L24', 4) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tSwim) { flood(c, t, { bridge: false }); R(c, 270, 40, 8, 80, '#3c2c1c'); for (let i = 0; i < 8; i++) E(c, 274 + Math.cos(i) * 14, 40 + Math.sin(i * 2) * 10, 10, 7, '#3c5c34'); const k = sg(t, S.tSwim, S.tShore); const x = lerp(60, 262, k), y = 118 + Math.sin(t * 5) * 4; for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = 0.8; ER(c, x, y + 5, 14 + i * 7, 3 + i, '#f8f4e8', Math.PI, TAU); c.restore(); } E(c, x, y, 8, 8, '#d8a878'); E(c, x, y - 5, 8, 4, '#4c2c1c'); R(c, x - 3, y - 1, 2, 2, '#2c1c14'); R(c, x + 2, y - 1, 2, 2, '#2c1c14'); const a = t * 8; L(c, x, y + 3, x + Math.cos(a) * 16, y + 3 + Math.sin(a) * 12, '#d8a878', 4); L(c, x, y + 3, x - Math.cos(a) * 16, y + 3 - Math.sin(a) * 12, '#d8a878', 4); for (let i = 0; i < 5; i++) { const u = fr(t * 2 + i / 5); P(c, x + (i - 2) * 6, y - 8 - u * 10, '#f8f8f0'); } return { z: 1.12, fx: Math.max(140, Math.min(180, x)), fy: 108 }; }
    if (t > S.tFlood) { flood(c, t); const pr = t > at(S, 'M8', 0) - 0.3; robe(c, MEROS, 56, 89, { k: 'fk', pose: pr ? 'kneel' : null, arm: pr ? 'up' : null, expr: pr ? 'cry' : 'shock' }); return { z: 1.04, fx: 150, fy: 112 }; }
    if (t > S.tRun) { village(c, t, { rain: true, dawn: true, sheep: false }); runner(c, MEROS, lerp(240, 60, sg(t, S.tRun, S.tFlood)), 160, t, { dir: -1, k: 'r', dustCol: '#5c6c4c' }); speedLines(c, t, -1, '#c8d0e0'); return { z: 1.08, fx: 150, fy: 116 }; }
    village(c, t, { rain: true, dawn: true }); dim(c, 0.2); robe(c, MEROS, 160, 160, { k: 'dw', blink: blinkOf(t, 5), arm: t > S.tVow ? 'clasp' : null, expr: t > S.tVow ? 'sad' : 'normal' }); if (t > S.tVow) plate(c, 60, 50, '私は、今宵、殺される', '#f8c8c8');
    return { z: t > S.tVow ? 1.1 : 1.05, fx: 160, fy: 112 };
  }
}, [['M8', MCRY]]);

/* ---- GH: the bandits — the pass; they leap out with clubs; "その、いのちが欲しいのだ"; he wrests a club, three go down; he runs down the slope (moves: the ambush leap, swinging clubs, bodies fall) ---- */
const GH = withCuts({
  name: '山賊', ch: '峠の山賊', bgm: 'dread',
  init(S) { S.tJump = at(S, 'L25', 1) - 0.3; S.tFight = at(S, 'L26', 0) - 0.3; S.tDown = at(S, 'L26', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDown) { pass(c, t); runner(c, MEROS_RAG, lerp(250, 80, sg(t, S.tDown, S.dur)), 160, t, { dir: -1, k: 'dn' }); for (let i = 0; i < 3; i++) robe(c, BANDIT, 230 + i * 26, 150, { k: 'bf' + i, pose: 'sit', rot: 1.5, blink: 2 }); return { z: 1.06, fx: 160, fy: 120 }; }
    if (t > S.tFight) { pass(c, t); const hit = Math.floor((t - S.tFight) * 2); robe(c, MEROS, 160, 160, { k: 'mf', arm: hit % 2 ? 'up' : 'reach', expr: 'angry' }); club(c, 170, 128, hit % 2 ? -1.6 : -0.3); for (let i = 0; i < 3; i++) { const down = hit > i; robe(c, BANDIT, [110, 210, 240][i], down ? 172 : 160, { k: 'bb' + i, rot: down ? (i ? 1.4 : -1.4) : 0, flip: i > 0, blink: down ? 2 : 0 }); } if (fr(t * 2) < 0.15) { for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; L(c, 186 + Math.cos(a) * 6, 120 + Math.sin(a) * 6, 186 + Math.cos(a) * 14, 120 + Math.sin(a) * 14, '#f8f0a0'); } } return { z: 1.12, fx: 170, fy: 120 }; }
    pass(c, t); robe(c, MEROS_RAG, t > S.tJump ? 160 : lerp(60, 160, sg(t, 0, S.tJump)), 160, { f: t > S.tJump ? -1 : Math.floor(t * 6) % 4, k: 'cl', expr: t > S.tJump ? 'shock' : 'normal' });
    if (t > S.tJump) { const k = eOut(sg(t, S.tJump, S.tJump + 0.5)); for (let i = 0; i < 4; i++) { const x = [100, 210, 240, 270][i], y = lerp(110, 160, k) - Math.sin(k * Math.PI) * 20; robe(c, BANDIT, x, y, { k: 'bj' + i, arm: 'up', flip: i > 0 }); club(c, x + (i > 0 ? -8 : 8), y - 38, -1.8); } }
    return { z: 1.1, fx: 160, fy: 118 };
  }
}, [['B1', BCLOSE], ['M9', MANGRY]]);

/* ---- GI: the turning point — the burning afternoon sun, dizziness, he falls to his knees; "もう、どうでもいい"; the devil's whisper; he dozes (moves: heat shimmer, the sun's rays, the slow fall, darkness creeps in) ---- */
const GI = withCuts({
  name: '悪い夢', ch: '悪い夢', bgm: 'requiem',
  init(S) { S.tFall = at(S, 'L27', 3) - 0.3; S.tGiveUp = at(S, 'L28', 0) - 0.3; S.tDoze = at(S, 'L29', 0) - 0.3; S.dur = lastSe(S) + 2.4; },
  draw(c, t, S) {
    if (t > S.tDoze) { pass(c, t, { hot: true }); dim(c, 0.35 + 0.4 * sg(t, S.tDoze, S.dur), '#0c0408'); robe(c, MEROS_RAG, 160, 146, { k: 'dz', pose: 'sit', blink: 2, rot: -1.5 }); for (let i = 0; i < 3; i++) { const u = fr(t * 0.4 + i / 3); c.save(); c.globalAlpha = (1 - u) * 0.8; TX(c, 'z', 150 + u * 20 + i * 4, 104 - u * 30, '#c8c8e8', 16, null); c.restore(); } return { z: 1.15 + 0.08 * ss(sg(t, S.tDoze, S.dur)), fx: 160, fy: 118 }; }
    if (t > S.tGiveUp) { pass(c, t, { hot: true }); dim(c, 0.6, '#0c0408'); robe(c, MEROS_RAG, 160, 150, { k: 'gv', pose: 'kneel', expr: 'cry' }); plate(c, 90, 50, 'もう、どうでもいい', '#a8a0b8'); return { z: 1.1, fx: 160, fy: 110 }; }
    pass(c, t, { hot: true }); const sway = Math.sin(t * 4) * 0.12 * sg(t, 2, S.tFall);
    if (t > S.tFall) robe(c, MEROS_RAG, 160, 164, { k: 'kn', pose: 'kneel', expr: 'sad' });
    else robe(c, MEROS_RAG, lerp(250, 160, sg(t, 0, S.tFall)), 160, { f: Math.floor(t * 3) % 4, k: 'wb', rot: sway, expr: 'sad' });
    if (t > 2 && t < S.tFall) { c.save(); c.globalAlpha = 0.15 + 0.1 * Math.sin(t * 6); R(c, 0, 0, W, H, '#f8f0c0'); c.restore(); }
    return { z: 1.1 + 0.08 * sg(t, S.tFall, S.tGiveUp), fx: 160, fy: 120 };
  }
}, [['M10', MCRY], ['M11', MCRY]]);

/* ---- GJ: the spring — the sound of water; a clear spring from the rock; one mouthful; the sunset sets the leaves burning; "走れ。メロス" (moves: the spring wells, ripples, leaves glitter, he rises) ---- */
const GJ = withCuts({
  name: '泉', ch: '泉', bgm: 'paradise',
  init(S) { S.tSpring = at(S, 'L31', 0) - 0.3; S.tDrink = at(S, 'L32', 0) - 0.3; S.tUp = at(S, 'L32', 3) - 0.3; S.tTrust = at(S, 'L33', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTrust) { springPlace(c, t, { glint: true }); robe(c, MEROS_RAG, 120, 160, { k: 'tr', blink: blinkOf(t, 5), arm: 'clasp' }); glow(c, 120, 118, 30, 40, '#f8e8a0', 0.3 + 0.15 * Math.sin(t * 2)); plate(c, 20, 46, '私は、信じられている', '#f8e8b0'); return { z: 1.12, fx: 140, fy: 116 }; }
    if (t > S.tDrink) { springPlace(c, t, { glint: true }); if (t > S.tUp) robe(c, MEROS_RAG, 180, 160, { k: 'up', blink: blinkOf(t, 5) }); else { robe(c, MEROS_RAG, 186, 150, { k: 'dk', pose: 'kneel', arm: 'clasp' }); for (let i = 0; i < 3; i++) P(c, 199, 110 + i * 3, '#c8e8f8'); } return { z: 1.22, fx: 200, fy: 120 }; }
    if (t > S.tSpring) { springPlace(c, t); robe(c, MEROS_RAG, 140, 150, { k: 'lk', pose: 'sit', rot: -0.5 }); return { z: 1.25, fx: 200, fy: 110 }; }
    R(c, 0, 0, W, H, '#0c0408'); const a = sg(t, 0, S.tSpring); c.save(); c.globalAlpha = a; springPlace(c, t); c.restore(); dim(c, 0.6 * (1 - a), '#0c0408');
    for (let i = 0; i < 4; i++) { const u = fr(t * 0.8 + i / 4); P(c, 213, 82 + u * 46, '#c8e8f8'); }
    return { z: 1.08, fx: 214, fy: 110 };
  }
}, [['M12', MHOPE]]);

/* ---- GK: the black wind — he runs ten times faster than the sun sinks; blood; the tower of Syracuse glinting; Philostratus runs beside him; "信じられているから、走るのだ" (moves: speed lines, people knocked aside, the tower glints) ---- */
const GK = withCuts({
  name: '黒い風', ch: '黒い風', bgm: 'climb',
  init(S) { S.tTower = at(S, 'L35', 1) - 0.3; S.tFiro = at(S, 'F1', 0) - 0.3; S.tMemo = at(S, 'L36', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMemo && t < at(S, 'M13', 0) - 0.3) { plaza(c, t, { sunY: 70 }); robe(c, SERINU, 220, 122, { k: 'mm', arm: 'clasp', blink: blinkOf(t, 6) }); for (let i = 0; i < 4; i++) L(c, 214, 92 + i * 6, 226, 94 + i * 6, '#c8a870'); robe(c, KING, 110, 160, { k: 'mk', arm: 'point', expr: 'smile' }); crown(c, 110, 160); plate(c, 20, 46, 'メロスは来ます', '#f8e8b0'); dim(c, 0.2, '#2c1c0c'); return { z: 1.12, fx: 170, fy: 108 }; }
    if (t > S.tFiro) { plains(c, t, { sunY: 94, speed: 160, drift: 30 }); runner(c, MEROS_RAG, 180, 160, t, { dir: -1, k: 'f1', sp: 14 }); runner(c, FIRO, 230, 162, t + 0.3, { dir: -1, k: 'f2', sp: 14 }); speedLines(c, t, -1); return { z: 1.15, fx: 200, fy: 120 }; }
    if (t > S.tTower) { plains(c, t, { sunY: 90, speed: 120, drift: 24 }); R(c, 52, 80, 22, 22, '#8c5c5c'); R(c, 58, 66, 8, 16, '#9c6c6c'); PF(c, [57, 66, 62, 60, 67, 66], '#c86c4c'); R(c, 40, 92, 50, 10, '#8c5c5c'); if (fr(t * 1.5) < 0.6) { P(c, 62, 70, '#ffffff'); glow(c, 62, 70, 12, 12, '#f8e8a0', 0.7); for (let i = 0; i < 4; i++) { const a = i / 4 * TAU + t; L(c, 62 + Math.cos(a) * 4, 70 + Math.sin(a) * 4, 62 + Math.cos(a) * 9, 70 + Math.sin(a) * 9, '#f8f0c0'); } } runner(c, MEROS_RAG, 220, 160, t, { dir: -1, k: 'tw', sp: 14 }); speedLines(c, t, -1); return { z: 1.06, fx: 140, fy: 110 }; }
    plains(c, t, { sunY: lerp(80, 88, sg(t, 0, S.tTower)), speed: 200, drift: 40 }); const u = fr(t * 0.35), kk = Math.floor(t * 0.35); if (kk % 2) dog(c, lerp(150, 340, u), 150 - Math.sin(u * Math.PI) * 40, u * 8); else robe(c, CROWD[kk % 8], lerp(20, 340, u), 160 - Math.sin(u * Math.PI) * 30, { k: 'kn', rot: u * 5, expr: 'shock' });
    runner(c, MEROS_RAG, 170, 160, t, { dir: -1, k: 'bw', sp: 16, lean: 0.25 }); speedLines(c, t, -1); if (fr(t * 0.5) < 0.12) { E(c, 150, 126, 2, 2, '#a82c2c'); P(c, 146, 130, '#a82c2c'); }
    return { z: 1.12, fx: 170, fy: 122 };
  }
}, [['F1', FCLOSE], ['M13', MHOPE]]);

/* ---- GL: the execution ground — the last sliver of sun; the post, the friend being hoisted; the croak no one hears; "殺されるのは、私だ"; he clings to his friend's feet; the rope is cut (moves: the sun sinks, the hoist, the crowd parts and roars) ---- */
const GL = withCuts({
  name: '刑場', ch: '刑場', bgm: 'dread',
  init(S) { S.tIn = at(S, 'L37', 2) - 0.3; S.tPost = at(S, 'L38', 0) - 0.3; S.tCling = at(S, 'L39', 0) - 0.3; S.tFree = at(S, 'L39', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCling) { plaza(c, t, { sunY: 116 }); crowdRow(c, t, 126, 11, { k: 'l', jump: true, expr: 'shock', x0: 10, gap: 30, s: 0.72, shade: 0.45 }); const free = t > S.tFree; R(c, 190, 120, 60, 10, '#5c3c24'); R(c, 217, 34, 6, 88, '#5c3c24'); R(c, 204, 44, 32, 5, '#5c3c24'); robe(c, SERINU, 220, free ? 120 : 102, { k: 'cl', arm: free ? null : 'clasp', blink: blinkOf(t, 6) }); if (!free) { for (let i = 0; i < 4; i++) L(c, 214, 72 + i * 6, 226, 74 + i * 6, '#c8a870'); L(c, 228, 46, 228, 70, '#c8a870'); } robe(c, MEROS_RAG, free ? 196 : 212, free ? 150 : 140, { k: 'cm', arm: 'up', expr: 'cry', flip: !free }); return { z: 1.14, fx: 210, fy: 104 }; }
    if (t > S.tPost) { plaza(c, t, { sunY: 112 }); const up = sg(t, S.tPost, S.tPost + 5); robe(c, SERINU, 220, lerp(122, 104, up), { k: 'po', arm: 'clasp', blink: blinkOf(t, 6) }); for (let i = 0; i < 4; i++) L(c, 214, lerp(92, 74, up) + i * 6, 226, lerp(94, 76, up) + i * 6, '#c8a870'); L(c, 228, 46, 228, lerp(80, 62, up), '#c8a870'); crowdRow(c, t, 170, 9, { k: 'p' }); return { z: 1.12, fx: 210, fy: 100 }; }
    plaza(c, t, { sunY: lerp(100, 112, sg(t, 0, S.tIn)), post: true }); robe(c, SERINU, 220, 122, { k: 'pw', arm: 'clasp' }); for (let i = 0; i < 4; i++) L(c, 214, 92 + i * 6, 226, 94 + i * 6, '#c8a870'); crowdRow(c, t, 170, 9, { k: 'w' });
    if (t > S.tIn) runner(c, MEROS_RAG, lerp(-20, 120, sg(t, S.tIn, S.tIn + 1.2)), 166, t, { dir: 1, k: 'in', sp: 16 });
    return { z: 1.06, fx: 160, fy: 104 };
  }
}, [['M14', MRAG]]);

/* ---- GM: "殴れ" — the bad dream confessed; the friend strikes him and smiles; then the friend's confession; Meros strikes back; the embrace, weeping (moves: the blows with impact flashes, the embrace, tears) ---- */
function blowFlash(c, t, t0, x, y) { if (t > t0 && t < t0 + 0.35) { const k = (t - t0) / 0.35; dim(c, 0.5 * (1 - k), '#ffffff'); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; L(c, x + Math.cos(a) * 6, y + Math.sin(a) * 6, x + Math.cos(a) * (14 + k * 10), y + Math.sin(a) * (14 + k * 10), '#f8f0a0'); } } }
const GM = withCuts({
  name: '殴れ', ch: '殴れ', bgm: 'memory',
  init(S) { S.tHit1 = at(S, 'L40', 1); S.tSmile = at(S, 'L40', 2) - 0.3; S.tHit2 = at(S, 'L41', 0) + 0.8; S.tHug = at(S, 'L41', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    plaza(c, t, { sunY: 120, post: false }); crowdRow(c, t, 126, 11, { k: 'm', x0: 10, gap: 30, s: 0.66, shade: 0.5 });
    if (t > S.tHug) { robe(c, MEROS_RAG, 150, 150, { k: 'hm', arm: 'reach', expr: 'cry' }); robe(c, SERINU, 170, 150, { k: 'hs', arm: 'reach', expr: 'cry', flip: true }); for (let i = 0; i < 4; i++) { const u = fr(t * 0.8 + i / 4); P(c, 150 + (i % 2) * 20, 108 + u * 20, '#88c8f8'); } return { z: 1.12, fx: 160, fy: 110 }; }
    const h1 = t > S.tHit1 && t < S.tHit1 + 0.4, h2 = t > S.tHit2 && t < S.tHit2 + 0.4;
    robe(c, MEROS_RAG, 140 - (h1 ? 4 : 0), 150, { k: 'gm', arm: h2 ? 'reach' : null, expr: h1 ? 'shock' : 'sad' }); robe(c, SERINU, 186 + (h2 ? 4 : 0), 150, { k: 'gs', arm: h1 ? 'reach' : null, expr: t > S.tSmile && t < S.tHit2 - 0.6 ? 'smile' : 'normal', flip: true });
    blowFlash(c, t, S.tHit1, 146, 104); blowFlash(c, t, S.tHit2, 182, 104);
    return { z: 1.12, fx: 162, fy: 110 };
  }
}, [['M15', MCRY], ['S3', SCLOSE], ['S4', SSAD]]);

function cloak(c, x, y, t) { const w = Math.sin(t * 3); PF(c, [x - 8, y, x + 8, y, x + 10 + w, y + 22, x - 10 + w, y + 22], '#c8283c'); L(c, x - 8, y, x + 8, y, '#e8485c'); L(c, x - 4, y + 2, x - 6 + w, y + 20, '#a8182c'); }
/* ---- GN: the king's change of heart — he steps out flushed; "わしをも、仲間に"; cheers; a girl offers a scarlet cloak; the hero blushes (moves: the king walks up, the crowd jumps, the cloak) ---- */
const GN = withCuts({
  name: '王の心', ch: '信実', bgm: 'paradise',
  init(S) { S.tCheer = at(S, 'L43', 0) - 0.3; S.tCloak = at(S, 'L44', 0) - 0.3; S.tBlush = at(S, 'L44', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCloak) { plaza(c, t, { sunY: 130, post: false }); crowdRow(c, t, 126, 11, { k: 'n2', expr: 'smile', x0: 10, gap: 30, s: 0.66, shade: 0.5 }); robe(c, GIRL, 196, 150, { k: 'gl', arm: 'reach', s: 0.85, flip: true }); cloak(c, 176, 120, t); robe(c, MEROS_BARE, 150, 150, { k: 'nb', expr: t > S.tBlush ? 'shock' : 'normal' }); if (t > S.tBlush) { E(c, 147, 106, 2, 1, '#f86c6c'); E(c, 153, 106, 2, 1, '#f86c6c'); } robe(c, SERINU, 112, 150, { k: 'ns', expr: 'smile' }); return { z: 1.14, fx: 160, fy: 110 }; }
    if (t > S.tCheer) { plaza(c, t, { sunY: 126, post: false }); crowdRow(c, t, 170, 9, { k: 'n', jump: true, expr: 'smile' }); robe(c, MEROS_RAG, 140, 150, { k: 'cm', arm: 'up', expr: 'smile' }); robe(c, SERINU, 170, 150, { k: 'cs', arm: 'up', expr: 'smile', flip: true }); robe(c, KING, 220, 150, { k: 'ck', expr: 'smile' }); crown(c, 220, 150); for (let i = 0; i < 24; i++) { const u = fr(t * 0.35 + i / 24); P(c, (i * 41) % W + Math.sin(t * 2 + i) * 4, 30 + u * 120, ['#f8c040', '#f86c6c', '#8cc8f8', '#ffffff'][i % 4]); } return { z: 1.05, fx: 160, fy: 110 }; }
    plaza(c, t, { sunY: 124, post: false }); crowdRow(c, t, 126, 11, { k: 'nk', x0: 10, gap: 30, s: 0.66, shade: 0.5 }); robe(c, MEROS_RAG, 130, 152, { k: 'km', arm: 'reach' }); robe(c, SERINU, 156, 152, { k: 'ks', flip: true });
    const kx = lerp(300, 210, sg(t, 0.5, 4)); robe(c, KING, kx, 152, { k: 'kk', f: t < 4 ? Math.floor(t * 3) % 4 : -1, flip: true, blink: blinkOf(t, 7) }); crown(c, kx, 152); if (t > 4) { E(c, kx - 3, 108, 2, 1, '#f86c6c'); E(c, kx + 3, 108, 2, 1, '#f86c6c'); }
    return { z: 1.1, fx: 180, fy: 110 };
  }
}, [['D6', KSOFT]]);

/* ---- GO: the end — dusk falls over the city, the two friends and the scarlet cloak (moves: stars come out, the last glow fades) ---- */
const GO = {
  name: '夕闇', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    city(c, t, { night: true }); glow(c, 160, 120, 90, 40, '#f8c870', 0.15);
    PF(c, [160, 121, 180, 121, 184, 157, 156, 157], '#c8283c'); L(c, 160, 121, 180, 121, '#e8485c'); robe(c, SERINU, 140, 160, { k: 'oe', expr: 'smile' }); robe(c, MEROS_RAG, 170, 160, { k: 'om', expr: 'smile', flip: true }); dim(c, 0.25 * sg(t, 2, 12));
    return { z: 1.06, fx: 160, fy: 112 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '走る男', ch: '', bgm: 'climb', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { plains(c, t, { sunY: 88, speed: 120, drift: 24 }); runner(c, MEROS_RAG, 170, 160, t, { dir: -1, k: 's1', sp: 14 }); speedLines(c, t, -1); return { z: 1.22, fx: 170, fy: 124 }; } };
const SS2 = { name: '夕陽', ch: '', bgm: 'climb', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { plains(c, t, { sunY: 88, speed: 120, drift: 24 }); runner(c, MEROS_RAG, 170, 160, t, { dir: -1, k: 's2', sp: 14 }); return { z: 1.1 + 0.1 * ss(sg(t, 0, S.dur)), fx: 170, fy: 120 }; } };
