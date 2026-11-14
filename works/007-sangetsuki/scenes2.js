/* ================= 文庫 #007 山月記: scenes ================= */
const GY = 150; // ground line for figures

/* ---- GX: cold open — the dark road, the tiger leaps out and back into the thicket (moves: the tiger leaps, the grass shakes, eyes glint) ---- */
const GX = withCuts({
  name: '山の道', ch: '叢の声', bgm: 'eerie',
  init(S) { S.tLeap = at(S, 'C0', 2) - 0.3; S.tBack = at(S, 'C0', 6) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    const shake = t > S.tBack ? Math.max(0, 2 - (t - S.tBack) * 0.8) : 0;
    clearing(c, t, { shake, eyes: t > S.tBack + 1.2 });
    for (let i = 0; i < 4; i++) { const back = sg(t, S.tBack, S.tBack + 4) * 12, x = 228 + i * 18 + back, sw = Math.sin(t * 2.4 + i) * 3; fig(c, MEN[i], x, GY + 4 + (i & 1) * 4, { flip: true, k: 'gx', expr: t > S.tLeap ? 'shock' : 'normal', f: t > S.tBack && t < S.tBack + 4 ? Math.floor(t * 5 + i) & 3 : -1 }); L(c, x - 12, GY - 40, x - 13 + sw, GY - 33, '#3c2c1c'); R(c, x - 15 + sw, GY - 34, 4, 6, '#f8c860'); glow(c, x - 13 + sw, GY - 31, 10, 7, '#f8c860', 0.35); }
    if (t > S.tLeap && t < S.tBack + 0.6) { const u = sg(t, S.tLeap, S.tLeap + 0.7), back = sg(t, S.tBack, S.tBack + 0.6); const x = back > 0 ? lerp(190, 70, back) : lerp(70, 190, u), y = GY + 6 - Math.sin((back > 0 ? back : u) * Math.PI) * 40; tiger(c, x, y, { pose: 'leap', flip: back > 0, s: 1.4 }); }
    return { z: 1.03 + 0.05 * ss(sg(t, 0, S.dur)), fx: 170, fy: 120, sx: t > S.tLeap && t < S.tLeap + 0.5 ? Math.round(Math.sin(t * 80) * 2) : 0 };
  }
}, [['T0', (c, t, S) => { clearing(c, t, { eyes: true, shake: 1.2, bx: 160, by: 140 }); return { z: 1.18, fx: 160, fy: 120 }; }]]);

/* ---- GA: Li Zheng the prodigy; quits and writes poems alone (moves: names on the posted list glow, the lamp flickers, pages pile up) ---- */
const GA = {
  name: '李徴', ch: '若き秀才', bgm: 'memory',
  init(S) { S.tHome = at(S, 'L2', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tHome) { // a bare room, writing by lamplight
      R(c, 0, 0, W, H, '#241c14'); for (let x = 0; x < W; x += 20) R(c, x, 0, 10, 150, '#2c2218'); R(c, 0, 150, W, 90, '#1c140c');
      R(c, 220, 36, 60, 50, '#0c1424'); for (let k = 0; k < 3; k++) R(c, 220 + k * 20, 36, 2, 50, '#3c2c1c'); E(c, 262, 52, 6, 6, '#f8f0d0');
      R(c, 70, 132, 140, 8, '#5c3c24'); inkLamp(c, 190, 132, t); lampPulse(c, t, 190, 110, 130);
      const n = Math.floor(sg(t, S.tHome + 0.5, S.dur) * 10); for (let i = 0; i < n; i++) R(c, 74 + (i % 3) * 10, 128 - Math.floor(i / 3) * 3, 26, 3, i % 2 ? '#efe4c8' : '#e0d4b8');
      fig(c, RICHO, 150, 156, { pose: 'sit', k: 'wr', arm: Math.floor(t * 2) & 1 ? 'reach' : 'point', blink: blinkOf(t, 4) });
      capPlate(c, t - S.tHome, 0.3, ['故郷・虢略', '詩作の日々']);
      return { z: 1.05, fx: 150, fy: 110 };
    }
    // the posted list of successful candidates (虎榜)
    VG(c, 0, 0, W, 130, ['#5c8cc8', '#9cc4e8', '#e0ecf0']); R(c, 0, 130, W, 110, '#a89c88');
    R(c, 40, 40, 240, 80, '#8c2c1c'); R(c, 46, 46, 228, 68, '#f0e4c8'); for (let i = 0; i < 18; i++) for (let k = 0; k < 5; k++) if (hash(i * 7 + k) > 0.2) R(c, 260 - i * 12, 52 + k * 11, 6, 6, '#3c2c20');
    const g = 0.4 + 0.3 * Math.sin(t * 4); R(c, 164, 50, 12, 60, DA('#f8d860', g)); for (let k = 0; k < 5; k++) R(c, 167, 52 + k * 11, 6, 6, '#a81c1c');
    for (let i = 0; i < 3; i++) { const x = mod(t * 22 + i * 120, W + 60) - 30; fig(c, MEN[(i + 1) % 4], x, 168 + i, { f: Math.floor(t * 5 + i) & 3, k: 'wk' }); } fig(c, RICHO, 150, 170, { k: 'ls', arm: 'point', expr: 'smile' }); for (let i = 0; i < 3; i++) fig(c, MEN[i], 60 + i * 30 + (i > 1 ? 180 : 0), 172, { k: 'ls' });
    capPlate(c, t, 0.4, ['隴西の李徴', '博学才穎']);
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- GB: back as a petty official, bowing to old peers (moves: the peers look down, he bows lower) ---- */
const GB = withCuts({
  name: '再び役人に', ch: '屈辱', bgm: 'dread',
  init(S) { S.tPeers = at(S, 'L4', 5) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    R(c, 0, 0, W, H, '#3c2c24'); for (let x = 0; x < W; x += 40) R(c, x, 0, 6, 150, '#7c2c1c'); R(c, 0, 150, W, 90, '#5c4c3c'); for (let i = 0; i < 8; i++) R(c, i * 40, 150, 1, 90, '#4c3c2c');
    R(c, 150, 100, 170, 20, '#6c4c34'); R(c, 150, 96, 170, 4, '#8c6c4c');
    if (t > S.tPeers) PEERS.forEach((st, i) => fig(c, st, 190 + i * 40, 98, { flip: true, k: 'pe', expr: 'smile' }));
    lampPulse(c, t, 240, 70, 140, '#f8b060'); const bow = t > S.tPeers + 0.6 ? (Math.floor(t * 0.8) & 1) === 0 : Math.floor(t * 0.5) % 3 === 0; fig(c, RICHO_T, 80 + Math.sin(t * 0.4) * 6, 160, { k: 'bw', pose: bow ? 'bow' : 'stand', blink: blinkOf(t, 3) }); for (let i = 0; i < 2; i++) { const x = mod(t * 16 + i * 170, W + 40) - 20; fig(c, MEN[i + 2], x, 172, { f: Math.floor(t * 4 + i) & 3, k: 'cl', flip: i === 1 }); }
    if (t < S.tPeers) capPlate(c, t, 0.4, ['数年後', '一地方官吏']);
    return { z: 1.04, fx: 150, fy: 110 };
  }
}, []);

/* ---- GC: the inn by the river — he shouts and runs into the dark (moves: he bolts, the door swings) ---- */
const GC = {
  name: '発狂', ch: '闇へ', bgm: 'dread',
  init(S) { S.tRun = at(S, 'L5', 4) - 0.3; S.tGone = at(S, 'L6', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    skyMt(c, t, { mx: 60 }); R(c, 0, 122, W, 118, '#141c14'); R(c, 0, 176, W, 64, '#0c1424'); for (let i = 0; i < 8; i++) R(c, mod(i * 47 - t * 10, W), 180 + (i % 3) * 8, 14, 1, '#2c3c5c');
    inn(c, 150, 150, { lit: t < S.tGone, open: t > S.tRun }); if (t < S.tRun) { const sx2 = Math.sin(t * 1.7) * 6 + Math.sin(t * 4.1) * 2; c.save(); c.beginPath(); c.rect(234, 112, 22, 16); c.clip(); E(c, 245 + sx2, 122, 5, 6, '#3c2010'); R(c, 241 + sx2, 126, 8, 6, '#3c2010'); c.restore(); } mist(c, t, 130, 0.24, '#8c9cc0'); for (let i = 0; i < 24; i++) { const u = fr(t * 0.9 + i / 24); L(c, mod(hash(i) * W - u * 30, W), u * 180 - 20, mod(hash(i) * W - u * 30, W) - 2, u * 180 - 12, '#5c6c9c'); } { const sw = Math.sin(t * 1.8) * 4; L(c, 150, 80, 150 + sw, 92, '#2c2018'); R(c, 146 + sw, 92, 8, 10, '#c83c2c'); glow(c, 150 + sw, 97, 14, 10, '#f88040', 0.35); }
    if (t > S.tRun && t < S.tGone + 1) { const u = sg(t, S.tRun, S.tRun + 2.4); fig(c, RICHO_T, lerp(210, 20, u), 156, { f: Math.floor(t * 8) & 3, flip: true, k: 'rn', expr: 'angry', arm: 'up' }); }
    if (t > S.tRun && t < S.tRun + 2) { const k = sg(t, S.tRun, S.tRun + 0.4); bigCap(c, '！', 40, 32, '#f8e070', k); }
    if (t > S.tGone) { dim(c, 0.4 * sg(t, S.tGone, S.tGone + 1.5)); }
    capPlate(c, t, 0.4, ['一年後', '汝水のほとり']);
    return { z: 1.03, fx: 160, fy: 110, sx: t > S.tRun && t < S.tRun + 0.4 ? Math.round(Math.sin(t * 70) * 2) : 0 };
  }
};

/* ---- GD: the next year, the convoy at dawn; the tiger leaps out (moves: the convoy walks, the tiger leaps and turns back) ---- */
const GD = withCuts({
  name: '袁傪', ch: '人喰い虎', bgm: 'pulse',
  init(S) { S.tLeap = at(S, 'L8', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const walk = t < S.tLeap; clearing(c, t, { shake: t > S.tLeap + 1.2 ? Math.max(0, 2 - (t - S.tLeap - 1.2)) : 0 });
    const ox = walk ? (t * 8) % 20 : 0;
    horse(c, 240 - ox * 0, GY + 8, t, { walk, col: '#a8a49c' }); fig(c, ENSAN, 246, GY - 12, { flip: true, pose: 'sit', k: 'rd', expr: t > S.tLeap ? 'shock' : 'normal' });
    for (let i = 0; i < 3; i++) fig(c, MEN[i], 274 + i * 16, GY + 6 + (i & 1) * 3, { flip: true, f: walk ? Math.floor(t * 4 + i) & 3 : -1, k: 'cv' });
    if (t > S.tLeap && t < S.tLeap + 1.6) { const u = sg(t, S.tLeap, S.tLeap + 0.7), back = sg(t, S.tLeap + 0.9, S.tLeap + 1.5); const x = back > 0 ? lerp(170, 60, back) : lerp(60, 170, u), y = GY + 6 - Math.sin((back > 0 ? back : u) * Math.PI) * 40; tiger(c, x, y, { pose: 'leap', flip: back > 0, s: 1.4 }); }
    if (t < S.tLeap) capPlate(c, t, 0.4, ['翌年', '監察御史 袁傪']);
    return { z: 1.03, fx: 180, fy: 120, sx: t > S.tLeap && t < S.tLeap + 0.4 ? Math.round(Math.sin(t * 80) * 2) : 0 };
  }
}, [['E1', (c, t, S) => closeUp(c, t, ensanFace({ blink: blinkOf(t, 5) }), { bg: ['#1c0c0c', '#5c2c24'], glow: '#f8d8a0' })]]);

/* ---- GE: old friends; the voice from the thicket (moves: memory of two young men, the grass trembles with sobs) ---- */
const GE = withCuts({
  name: '旧友', ch: '我が友', bgm: 'memory',
  init(S) { S.tSob = at(S, 'L10', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (inLine(S, t, 'L9')) { // memory: the two young graduates side by side
      R(c, 0, 0, W, H, '#2c2418'); glow(c, 160, 90, 140, 70, '#f8d8a0', 0.25);
      fig(c, RICHO, 130, 150, { k: 'm1', expr: 'smile', blink: blinkOf(t, 3) }); fig(c, ENSAN, 190, 150, { k: 'm1', flip: true, expr: 'smile', blink: blinkOf(t + 1, 4) });
      lampPulse(c, t, 160, 90, 150, '#f8d8a0'); for (let i = 0; i < 16; i++) { const u = fr(t * 0.12 + i / 16); E(c, 40 + hash(i) * 240 + Math.sin(t + i) * 10, -10 + u * 160, 2, 1.5, '#f4c8d0'); }
      capPlate(c, t - ln(S, 'L9').t0, 0.2, ['同じ年に合格した', '親しい友']);
      return { z: 1.04, fx: 160, fy: 104 };
    }
    clearing(c, t, { shake: t > S.tSob ? 0.6 + 0.4 * Math.sin(t * 2) : 0, eyes: t > S.tSob, dawn: 0.2 });
    horse(c, 270, GY + 8, t, { col: '#a8a49c' }); fig(c, ENSAN, 150, GY + 6, { flip: true, k: 'kn', arm: 'reach', expr: 'sad', blink: blinkOf(t, 4) });
    for (let i = 0; i < 2; i++) fig(c, MEN[i], 230 + i * 18, GY + 8, { flip: true, k: 'kn2' });
    return { z: 1.04, fx: 120, fy: 120 };
  }
}, [['R1', (c, t, S) => { clearing(c, t, { eyes: true, shake: 0.6, bx: 160, by: 140, dawn: 0.2 }); return { z: 1.16, fx: 160, fy: 120 }; }]]);

/* ---- GF: the night he changed — running, hands on the ground, the river; the hare (moves: running through the woods, the reflection ripples) ---- */
const GF = {
  name: '変身', ch: '虎となる', bgm: 'dread',
  init(S) { S.tPaws = at(S, 'R2', 6) - 0.3; S.tRiver = at(S, 'R3', 0) - 0.3; S.tHare = at(S, 'L13', 6) - 0.3; S.tGone = at(S, 'L14', 0) - 0.3; S.tBlood = at(S, 'L14', 3) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBlood) { // dawn after: a red mouth, scattered fur — shown through his reflection
      skyMt(c, t, { dawn: 0.6, moon: false }); R(c, 0, 122, W, 118, '#2c3c24'); for (let i = 0; i < 14; i++) P(c, 100 + hash(i) * 120, 150 + hash(i * 3) * 30, '#e8e4dc');
      tiger(c, 160, 152, { pose: 'crouch', s: 1.6 }); R(c, 200, 138, 8, 3, '#8c1c1c'); dim(c, 0.25, '#3c0808');
      return { z: 1.05, fx: 160, fy: 130 };
    }
    if (t > S.tHare) { skyMt(c, t, { dawn: 0.4, moon: false }); R(c, 0, 122, W, 118, '#24341c'); const u = sg(t, S.tHare, S.tGone + 0.6); rabbit(c, lerp(60, 280, u), 170, t); tiger(c, lerp(20, 200, sg(t, S.tGone, S.tGone + 1.2)), 162, { pose: 'run', f: Math.floor(t * 8), s: 1.4 }); if (t < S.tGone) { fig(c, RICHO_T, 120, 170, { k: 'hr', pose: 'kneel', expr: 'sad' }); } return { z: 1.04, fx: 160, fy: 130 }; }
    if (t > S.tRiver) { // the river reflection: a tiger looks back
      skyMt(c, t, { dawn: 0.5 }); R(c, 0, 112, W, 16, '#3c4c2c'); R(c, 0, 126, W, 114, '#1c3c5c');
      mist(c, t, 90, 0.16, '#e8e8f0'); tiger(c, 160, 124, { pose: 'stand', s: 1.4 }); c.save(); c.globalAlpha = 0.4; c.translate(Math.sin(t * 2) * 3, 248); c.scale(1, -1); tiger(c, 160, 124, { pose: 'stand', s: 1.4 }); c.restore(); for (let i = 0; i < 14; i++) { const u = fr(t * 0.12 + i / 14); E(c, mod(hash(i) * W + Math.sin(t + i) * 20 - u * 60, W), -10 + u * 140, 3, 2, ['#c8783c', '#d8a040', '#a85c2c'][i % 3]); } for (let i = 0; i < 6; i++) { const r = fr(t * 0.4 + i / 6) * 30; ER(c, 60 + i * 40, 134 + (i % 2) * 6, r, r * 0.25, DA('#a8c8e8', 0.5 * (1 - r / 30))); } for (let i = 0; i < 10; i++) R(c, mod(i * 37 + t * 12, W), 130 + (i % 5) * 7, 20, 1, '#5c8cc8');
      return { z: 1.04, fx: 160, fy: 120 };
    }
    // the night run through the woods
    skyMt(c, t, { mx: 60 }); for (let i = 0; i < 8; i++) pine(c, mod(i * 50 - t * 60, W + 60) - 30, 140, 70, true, t); R(c, 0, 138, W, 102, '#0c140c');
    const k = sg(t, S.tPaws, S.tPaws + 2);
    if (k < 1) { c.save(); c.globalAlpha = 1 - k; fig(c, RICHO_T, 140, 160, { f: Math.floor(t * 8) & 3, k: 'rn2', arm: 'reach' }); c.restore(); }
    if (k > 0) { c.save(); c.globalAlpha = k; tiger(c, 150, 162, { pose: 'run', f: Math.floor(t * 8), s: 1.3 }); c.restore(); }
    for (let i = 0; i < 5; i++) R(c, mod(i * 90 - t * 160, W + 40) - 20, 150 + i * 4, 16, 1, '#3c5c3c'); mist(c, -t * 4, 110, 0.2, '#8c9cc0');
    return { z: 1.04, fx: 150, fy: 120 };
  }
};

/* ---- GG: the hours of a human heart grow short; the scribe takes down his poems (moves: a sun dial of human hours shrinks, the brush writes) ---- */
const GG = {
  name: '詩', ch: '残したい詩', bgm: 'memory',
  init(S) { S.tAsk = at(S, 'R6', 0) - 0.3; S.tWrite = at(S, 'L16', 0) - 0.3; S.tLack = at(S, 'L17', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWrite) { // the scribe writes by the thicket
      clearing(c, t, { dawn: 0.3, eyes: true, bx: 70 }); R(c, 170, 150, 90, 8, '#5c3c24'); scroll(c, 176, 112, 80, 36, { n: Math.floor(sg(t, S.tWrite, S.tLack) * 11) });
      fig(c, MEN[2], 220, 168, { pose: 'sit', flip: true, k: 'sc', arm: Math.floor(t * 2) & 1 ? 'reach' : 'point' }); { const px = 284 + Math.sin(t * 0.6) * 16; fig(c, ENSAN, px, 166, { flip: Math.cos(t * 0.6) > 0, f: Math.floor(t * 3) & 3, k: 'li', expr: t > S.tLack ? 'sad' : 'normal' }); }
      if (t > S.tLack) bigCap(c, '何かが、欠けている？', 30, 16, '#f4f0e8', sg(t, S.tLack, S.tLack + 0.5));
      else bigCap(c, '詩 およそ三十', 30, 16, '#f8e8b0', sg(t, S.tWrite + 0.6, S.tWrite + 1));
      return { z: 1.04, fx: 190, fy: 120 };
    }
    // a human silhouette sinking, as a palace foundation is buried by sand
    R(c, 0, 0, W, H, '#14100c'); lampPulse(c, t, 160, 90, 150, '#f8d8a0'); for (let i = 0; i < 20; i++) { const u = fr(t * 0.5 + i / 20); R(c, 100 + hash(i) * 120, u * 150, 1, 3, '#8c7c5c'); }
    const k = sg(t, 0.4, S.tAsk); const h = lerp(70, 18, k);
    c.save(); c.beginPath(); c.rect(0, 0, W, 150); c.clip(); fig(c, RICHO, 100, 150 + (70 - h), { k: 'sk', expr: 'sad', s: 1.4 }); c.restore();
    R(c, 0, 150 - h * 0.1, W, 90, '#3c3024'); for (let i = 0; i < 30; i++) P(c, hash(i) * W, 152 + hash(i * 7) * 60, '#5c4c3c');
    if (t > S.tAsk) { dim(c, 0.3); scroll(c, 170, 40, 110, 70, { n: Math.floor(sg(t, S.tAsk, S.tAsk + 6) * 15) }); }
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- GH: the timid pride, the beast inside; howling at the moon (moves: the man's shadow becomes a tiger's, the tiger howls) ---- */
const GH = {
  name: '臆病な自尊心', ch: '臆病な自尊心', bgm: 'requiem',
  init(S) { S.tBeast = at(S, 'R9', 2) - 0.3; S.tHowl = at(S, 'R11', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tHowl) { // on the mountain top, under the moon, wet fur
      skyMt(c, t, { mx: 220, my: 40 }); PF(c, [60, 240, 120, 150, 160, 136, 210, 150, 270, 240], '#2c2c3c'); PF(c, [120, 150, 160, 136, 210, 150, 190, 152, 140, 154], '#3c3c4c');
      tiger(c, 160, 140, { pose: 'howl', wet: true, s: 1.3 }); for (let i = 0; i < 8; i++) { const u = fr(t * 0.6 + i / 8); P(c, 130 + i * 8, 110 + u * 40, DA('#c8e0f8', 1 - u)); }
      return { z: 1.04 + 0.04 * ss(sg(t, S.tHowl, S.dur)), fx: 170, fy: 100 };
    }
    R(c, 0, 0, W, H, '#1c1810'); lampPulse(c, t, 70, 110, 160); inkLamp(c, 70, 150, t);
    fig(c, RICHO, 120, 158, { k: 'pd', expr: t > S.tBeast ? 'sad' : 'normal', blink: blinkOf(t, 4) });
    // the shadow on the wall: a man's, then a tiger's
    const k = sg(t, S.tBeast, S.tBeast + 1.2); c.save(); c.globalAlpha = 0.8 * (1 - k); blit(c, tintSpr(robeFig(RICHO, { k: 'shw' }), '#0a0806', 'shwr'), 210, 150, 13, 57, { s: 1.6 }); c.restore(); if (k > 0) { c.save(); c.globalAlpha = 0.85 * k; blit(c, tintSpr(tigerSpr({ pose: 'stand' }), '#0a0806', 'shwt'), 230, 150, 35, 39, { s: 1.6 }); c.restore(); }
    if (t < S.tBeast) { const ks = sg(t, at(S, 'R9', 0) - 0.3, at(S, 'R9', 0)); if (ks > 0) { bigCap(c, '臆病な自尊心', 20, 16, '#f8e8b0', ks); bigCap(c, '尊大な羞恥心', 44, 16, '#f8e8b0', sg(t, at(S, 'R9', 1) - 0.3, at(S, 'R9', 1))); } }
    else bigCap(c, '猛獣だった', 26, 24, '#f86040', sg(t, at(S, 'R9', 4) - 0.3, at(S, 'R9', 4)));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- GI: dawn; the request for his wife and child; the sobbing (moves: dawn brightens, the horn sounds, tears fall) ---- */
const GI = withCuts({
  name: '妻子', ch: '妻と子', bgm: 'requiem',
  init(S) { S.tFam = at(S, 'R12', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFam && t < at(S, 'L23', 0) - 0.3) { // memory: the wife and child waiting at home
      R(c, 0, 0, W, H, '#2c241c'); inn(c, 100, 150, { lit: true }); lampPulse(c, t, 160, 100, 150, '#f8d8a0'); fig(c, WIFE, 140, 160, { k: 'wf', expr: 'sad' }); fig(c, CHILD, 166 + Math.sin(t * 0.8) * 14, 162, { k: 'ch', s: 0.8, f: Math.floor(t * 4) & 3, flip: Math.cos(t * 0.8) < 0 });
      return { z: 1.04, fx: 160, fy: 110 };
    }
    const dawn = 0.3 + 0.4 * sg(t, 0, S.dur); clearing(c, t, { dawn, eyes: true, shake: inLine(S, t, 'L23') ? 1 : 0.3 });
    fig(c, ENSAN, 150, GY + 6, { flip: true, k: 'gi', expr: 'sad', pose: inLine(S, t, 'L23') ? 'kneel' : 'stand' }); horse(c, 270, GY + 8, t, { col: '#a8a49c' });
    if (inLine(S, t, 'L23')) for (let i = 0; i < 3; i++) { const u = fr(t * 0.8 + i / 3); R(c, 142, 112 + u * 14, 1, 2, DA('#8cc8f8', 1 - u)); }
    return { z: 1.04, fx: 130, fy: 120 };
  }
}, [['R13', (c, t, S) => closeUp(c, t, tigerFace({ blink: blinkOf(t, 5), sad: true }), { bg: ['#0c0a10', '#3c2c24'], glow: '#f8a040' })]]);

/* ---- GJ: the parting; from the hill, the tiger leaps onto the road and howls at the pale moon (moves: the convoy climbs, the tiger leaps, howls, vanishes) ---- */
const GJ = {
  name: '別れ', ch: '丘の上から', bgm: 'requiem',
  init(S) { S.tGo = at(S, 'L26', 0) - 0.3; S.tLook = at(S, 'L26', 4) - 0.3; S.tLeap = at(S, 'L26', 6) - 0.3; S.tHowl = at(S, 'L27', 1) - 0.3; S.tBack = at(S, 'L27', 5) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLook) { // the view from the hill: the clearing far below
      skyMt(c, t, { dawn: 0.8, mx: 250, my: 64 }); R(c, 0, 112, W, 128, '#4c6c3c'); PF(c, [0, 170, 60, 150, 260, 150, 320, 170, 320, 240, 0, 240], '#3c5c34');
      for (let i = 0; i < 7; i++) pine(c, 10 + i * 48, 132, 30, false, t); PF(c, [150, 112, 170, 112, 230, 240, 90, 240], '#9c8c6c');
      thicket(c, 110, 128, t, 0, { dawn: 0.8 }); mist(c, t, 116, 0.24, '#f4f0f0'); for (let i = 0; i < 6; i++) { const u = fr(t * 0.06 + i * 0.09), bx = lerp(-20, 340, u), by = 40 + i * 5 + Math.sin(t * 3 + i) * 2, w = Math.sin(t * 9 + i) > 0 ? 2 : -1; L(c, bx - 3, by + w, bx, by, '#2c2c3c'); L(c, bx, by, bx + 3, by + w, '#2c2c3c'); }
      if (t > S.tLeap && t < S.tBack + 0.8) { const out = sg(t, S.tLeap, S.tLeap + 0.6), back = sg(t, S.tBack, S.tBack + 0.6); const x = lerp(lerp(110, 160, out), 110, back), y = 138 - Math.sin(out * Math.PI) * 14 * (1 - back) - Math.sin(back * Math.PI) * 14; tiger(c, x, y, { pose: t > S.tHowl && back <= 0 ? 'howl' : 'leap', flip: back > 0 }); }
      for (let i = 0; i < 3; i++) fig(c, MEN[i], 238 + i * 18, 176, { flip: true, k: 'hl', s: 1.2 }); fig(c, ENSAN, 214, 176, { flip: true, k: 'hl', expr: 'sad', s: 1.2 });
      return { z: 1.03 + 0.06 * ss(sg(t, S.tLook, S.tHowl)), fx: 150, fy: 110 };
    }
    // the request: do not come back this way; look back from that hill
    clearing(c, t, { dawn: 0.75, eyes: true });
    const u = sg(t, S.tGo, S.tLook); fig(c, ENSAN, lerp(150, 290, u), GY + 6, { f: u > 0 && u < 1 ? Math.floor(t * 4) & 3 : -1, k: 'gj', expr: 'sad', flip: u <= 0 });
    if (t < S.tGo) { L(c, 160, 70, 260, 70, '#f8e8b0', 1); PF(c, [260, 66, 268, 70, 260, 74], '#f8e8b0'); bigCap(c, 'あの丘', 40, 16, '#f8e8b0', sg(t, at(S, 'L24', 4) - 0.3, at(S, 'L24', 4))); }
    return { z: 1.03, fx: 170, fy: 116 };
  }
};

/* ---- GK: ending — the pale moon over the mountains, the grass in the wind (moves: grass sways, the moon fades) ---- */
const GK = {
  name: '結び', ch: '結び', bgm: 'requiem',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) { clearing(c, t, { dawn: 0.9, bx: 160, by: 150, mx: 160, my: 40 }); return { z: 1 + 0.06 * ss(sg(t, 0, S.tEnd + 2)), fx: 160, fy: 100 }; }
};

/* ---- shorts ---- */
const SS1 = {
  name: 'ショート冒頭', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + 0.6; },
  draw(c, t, S) { clearing(c, t, { eyes: true, shake: 0.8, bx: 160, by: 146 }); for (let i = 0; i < 2; i++) fig(c, MEN[i], 260 + i * 20, GY + 6, { flip: true, k: 'ss', expr: 'shock' }); return { z: 1.1, fx: 170, fy: 120 }; }
};
const SS2 = {
  name: 'ショート締め', bgm: 'eerie',
  init(S) { S.dur = lastSe(S) + (TIKTOK ? 2.2 : 0.5); },
  draw(c, t, S) { clearing(c, t, { eyes: true, shake: 0.5, bx: 160, by: 146 }); dim(c, 0.3); return { z: 1.12, fx: 160, fy: 120 }; }
};
