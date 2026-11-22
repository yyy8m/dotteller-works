/* ================= 文庫 #012 高瀬舟: scenes ================= */
const SCLOSE = (c, t) => closeUp(c, t, shobeFace({ blink: blinkOf(t, 4) }), { bg: ['#0c0c1c', '#2c2c44'], spk: 'shobe' });
const KCLOSE = (c, t) => closeUp(c, t, kisukeFace({ blink: blinkOf(t, 6) }), { bg: ['#0c0c1c', '#3c3c5c'], glow: '#f8e8a0', spk: 'kisuke' });
const KSAD = (c, t) => closeUp(c, t, kisukeFace({ blink: blinkOf(t, 6), sad: true }), { bg: ['#140c0c', '#3c2424'], spk: 'kisuke' });
const OCLOSE = (c, t) => closeUp(c, t, otoutoFace({ blink: blinkOf(t, 8) }), { bg: ['#0c0808', '#2c1c1c'], spk: 'otouto' });
const ride = (k, o = {}) => [[SHOBE, -30, { k: 'b' + k, flip: false, blink: blinkOf(o.t || 0, 3) }], [KISUKE, 10, { k: 'k' + k, flip: true, expr: o.kex || 'smile' }]];

/* ---- GZ: cold open — spring dusk, petals, the boat; a convict who smiles at the moon (moves: petals fall, the water flows, the boat bobs) ---- */
const GZ = withCuts({
  name: '高瀬川の夕べ', ch: '春の夕べ', bgm: 'memory',
  init(S) { S.tBoat = at(S, 'C1', 0) - 0.3; S.tFace = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tFace) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('z', { t })); return { z: 1.1 + 0.25 * ss(sg(t, S.tFace, S.dur)), fx: 172, fy: 118 }; }
    river(c, t, { petals: true }); boat(c, t, lerp(110, 170, eOut(sg(t, 0, S.tFace))), 150, ride('z2', { t }));
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V0', SCLOSE]]);

/* ---- GA: what the Takase boat was — exile to the islands, the boat to Osaka, the guard, the night of weeping, a hated duty (moves: the boat passes, the relative weeps, the guard turns away) ---- */
const GA = {
  name: '高瀬舟とは', ch: '高瀬舟', bgm: 'memory',
  init(S) { S.tExile = at(S, 'L1b', 0) - 0.3; S.tGuard = at(S, 'L2', 0) - 0.3; S.tWeep = at(S, 'L3', 0) - 0.3; S.tHate = at(S, 'L3b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWeep) { river(c, t, { night: true }); boat(c, t, 160, 150, [[RELATIVE, -40, { k: 'rw', expr: 'cry' }], [CRIMINAL, -10, { k: 'cw', expr: 'sad' }], [SHOBE, 30, { k: 'gw', expr: t > S.tHate ? 'sad' : 'normal', flip: true }]], { lamp: true }); if (t > S.tHate) plate(c, 20, 46, '嫌われる役目', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 120 }; }
    if (t > S.tGuard) { river(c, t, {}); boat(c, t, 160, 150, [[RELATIVE, -40, { k: 'rg' }], [CRIMINAL, -10, { k: 'cg', expr: 'sad' }], [SHOBE, 30, { k: 'gg', flip: true }]]); plate(c, 20, 46, '護送の同心', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tExile) { R(c, 0, 0, W, H, '#c8b890'); R(c, 0, 0, W, 4, '#8c7c5c'); L(c, 80, 60, 170, 120, '#3c6cc8', 3); E(c, 80, 60, 6, 6, '#c81c1c'); E(c, 170, 120, 6, 6, '#c81c1c'); TX(c, '京都', 50, 40, '#2c2c2c', 16, null); TX(c, '大阪', 160, 128, '#2c2c2c', 16, null); for (let i = 0; i < 3; i++) E(c, 240 + i * 20, 150 - i * 10, 8, 4, '#8c7c5c'); TX(c, '島へ', 236, 110, '#8c1c1c', 16, null); return { z: 1.03, fx: 160, fy: 100 }; }
    river(c, t, { petals: true }); boat(c, t, lerp(300, 170, sg(t, 0, 4)), 150, [], {}); plate(c, 20, 46, '高瀬川を上下する小舟', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- GB: a strange convict — Kansei era; Kisuke, about thirty, alone; Haneda Shobe knows only "brother-killer"; meek, not fawning (moves: the bell, petals, they board) ---- */
const GB = {
  name: '喜助', ch: '珍しい罪人', bgm: 'memory',
  init(S) { S.tKisuke = at(S, 'L5', 0) - 0.3; S.tShobe = at(S, 'L6', 0) - 0.3; S.tMeek = at(S, 'L6b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMeek) { bank(c, t); robe(c, SHOBE, 110, 156, { k: 'mb', blink: blinkOf(t, 4) }); robe(c, KISUKE, 200, 156, { k: 'mk', pose: 'bow', flip: true }); plate(c, 20, 46, '神妙で、おとなしい', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tShobe) { bank(c, t); robe(c, SHOBE, 120, 156, { k: 'sb', blink: blinkOf(t, 4) }); robe(c, KISUKE, 230, 156, { k: 'sk2', expr: 'sad', flip: true }); plate(c, 20, 46, '同心　羽田庄兵衛', '#f8e8b0'); plate(c, 180, 72, '喜助は、弟殺し', '#f8c8c8'); return { z: 1.04, fx: 140, fy: 110 }; }
    if (t > S.tKisuke) { bank(c, t); robe(c, KISUKE, 160, 156, { k: 'ki', blink: blinkOf(t, 6) }); plate(c, 20, 46, '喜助　三十歳ばかり', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 110 }; }
    river(c, t, { petals: true }); for (let i = 0; i < 3; i++) { const u = fr(t * 0.4 + i / 3); c.save(); c.globalAlpha = 1 - u; ER(c, 60, 70, 10 + u * 40, 6 + u * 20, '#f8e8b0'); c.restore(); } yearFlash(c, t, 0.4, '寛政', 216, 10, 'のころ');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- GC: the night river — the wind drops, the moon behind thin cloud; Kisuke gazes up, bright-browed; Shobe: strange, strange (moves: clouds drift over the moon, ripples, question marks) ---- */
const GC = {
  name: 'おぼろ月', ch: '夜の川', bgm: 'eerie',
  init(S) { S.tGaze = at(S, 'L8', 0) - 0.3; S.tOdd = at(S, 'L9', 0) - 0.3; S.tThink = at(S, 'L9b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tThink) { if (t > at(S, 'L9c', 0) - 0.3) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('th', { t })); TX(c, '？', 126, 80, '#c8d0f0', 16, null); return { z: 1.1, fx: 150, fy: 118 }; } R(c, 0, 0, W, H, '#0c0c1c'); blit(c, shobeFace({ blink: blinkOf(t, 4) }), 90, 104, 24, 24, { s: 2.2 }); const qs = ['遊山船？', '気が狂った？', 'いや……']; const n = Math.min(3, 1 + Math.floor(sg(t, S.tThink, S.dur - 1) * 3)); for (let i = 0; i < n; i++) plate(c, 170, 50 + i * 30, qs[i], '#c8d0f0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tOdd) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('o', { t })); TX(c, '？', 126 + Math.sin(t * 2) * 3, 80, '#c8d0f0', 16, null); plate(c, 20, 46, '不思議だ、不思議だ', '#c8d0f0'); return { z: 1.08, fx: 140, fy: 120 }; }
    if (t > S.tGaze) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('g', { t })); halo(c, 170, 112, t, 0.25); return { z: 1.12 + 0.1 * ss(sg(t, S.tGaze, S.tOdd)), fx: 172, fy: 118 }; }
    river(c, t, { night: true }); boat(c, t, 160, 150, ride('n', { t }));
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- GD: the conversation — "喜助。お前何を思っているのか"; Kisuke smiles: a place where he may stay; his hand on his chest: 200 mon, the first money he ever kept (moves: closeups, the string of coins shines) ---- */
const GD = withCuts({
  name: '二百文', ch: '二百文', bgm: 'memory',
  init(S) { S.tSmile = at(S, 'L11', 0) - 0.3; S.tCoins = at(S, 'L12', 0) - 0.3; S.tQuiet = at(S, 'L13', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tQuiet) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('q', { t })); return { z: 1.06, fx: 150, fy: 120 }; }
    if (t > S.tCoins) { R(c, 0, 0, W, H, '#14141c'); glow(c, 160, 100, 100, 60, '#f8d890', 0.2); E(c, 160, 118, 70, 30, '#e0ccb8'); E(c, 160, 116, 64, 26, '#ecd8c4'); coins(c, 104, 104, 20); plate(c, 110, 46, '二百文の鳥目', '#f8e8b0'); return { z: 1.06 + 0.04 * Math.sin(t), fx: 160, fy: 100 }; }
    river(c, t, { night: true }); boat(c, t, 160, 150, ride('s', { t }));
    return { z: 1.1, fx: 160, fy: 118 };
  }
}, [['V1', SCLOSE], ['V2', SCLOSE], ['K1', KCLOSE], ['K2', KCLOSE], ['K3', KCLOSE], ['K4', KCLOSE]]);

/* ---- GE: Shobe's own life — wife, four children, old mother; month-end shortfall, money from her family; the abacus: only the digits differ; wanting more and more; the halo around Kisuke (moves: abacus beads, the ladder of wants, the halo grows) ---- */
const GE = {
  name: '足ることを知る', ch: '足ることを知る', bgm: 'memory',
  init(S) { S.tAbacus = at(S, 'L15', 0) - 0.3; S.tContent = at(S, 'L16', 0) - 0.3; S.tWant = at(S, 'L17', 0) - 0.3; S.tStop = at(S, 'L17b', 0) - 0.3; S.tHalo = at(S, 'L18', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tHalo) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('h', { t })); halo(c, 170, 112, t, sg(t, S.tHalo, S.tHalo + 2)); return { z: 1.15 + 0.1 * ss(sg(t, S.tHalo, S.dur)), fx: 172, fy: 114 }; }
    if (t > S.tStop) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('st', { t })); plate(c, 20, 46, '踏み止まる人', '#f8e8b0'); return { z: 1.08, fx: 170, fy: 118 }; }
    if (t > S.tWant) { R(c, 0, 0, W, H, '#1c1c24'); const items = ['病がなければ', '食えたら', '蓄えがあれば', 'もっと多ければ']; const n = Math.min(4, 1 + Math.floor(sg(t, S.tWant, S.tStop - 0.5) * 4)); for (let i = 0; i < n; i++) plate(c, 20 + i * 40, 36 + i * 26, items[i], '#c8d0f0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tContent) { if (t > at(S, 'L16b', 0) - 0.3) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('al', { t })); plate(c, 20, 46, '一人者でも、ああはなれない', '#c8d0f0'); return { z: 1.08, fx: 150, fy: 120 }; } R(c, 0, 0, W, H, '#0c0c1c'); blit(c, kisukeFace({ blink: blinkOf(t, 6) }), 160, 104, 24, 24, { s: 2.2 }); plate(c, 20, 46, '足ることを、知っている', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tAbacus) { R(c, 0, 0, W, H, '#5c4030'); R(c, 50, 60, 220, 70, '#3c2818'); R(c, 54, 64, 212, 62, '#c8a870'); R(c, 54, 82, 212, 3, '#3c2818'); for (let i = 0; i < 13; i++) { const x = 64 + i * 16; L(c, x, 64, x, 126, '#5c4030'); const up = (i + Math.floor(t * 2)) % 3 === 0; E(c, x, up ? 78 : 70, 6, 4, '#2c1c10'); for (let k = 0; k < 4; k++) E(c, x, 92 + k * 8 + (k < (i % 4) ? -2 : 2), 6, 4, '#2c1c10'); } plate(c, 60, 140, '桁が違うだけ', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#c8b494'); R(c, 0, 110, W, 80, '#a88c64'); for (let x = 0; x < W; x += 40) R(c, x, 110, 2, 80, '#8c7454'); robe(c, SHOBE, 60, 156, { k: 'hm', pose: 'sit', expr: 'sad' }); robe(c, WIFE, 110, 156, { k: 'wf', pose: 'sit' }); robe(c, MOTHER, 270, 156, { k: 'mo', pose: 'sit' }); for (let i = 0; i < 4; i++) robe(c, KIDS[i], 160 + i * 24, 156, { k: 'kd' + i, s: 0.7 });
    if (t > at(S, 'L14', 3) - 0.3) { R(c, 120, 100, 16, 10, '#c8a848'); plate(c, 20, 46, '里から持ってきた金', '#5c3c1c', '#f8f0d8'); } else plate(c, 20, 46, '七人暮らし', '#5c3c1c', '#f8f0d8');
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- GF: the turning point — why did he kill? "喜助さん"; the slip of "さん"; two brothers raised on neighbours' kindness; the Nishijin loom; the brother falls sick, "すまない" (moves: sepia memories, the shuttle moves) ---- */
const GF = withCuts({
  name: 'なぜ殺したのか', ch: 'なぜ殺したのか', bgm: 'requiem',
  init(S) { S.tSan = at(S, 'L20', 0) - 0.3; S.tPast = at(S, 'L21', 0) - 0.3; S.tLoom = at(S, 'L22', 0) - 0.3; S.tSorry = at(S, 'L22b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const sepia = () => { c.save(); c.globalAlpha = 0.3; c.fillStyle = '#8c6c3c'; c.fillRect(0, 0, W, H); c.restore(); };
    if (t > S.tSorry) { hut(c, t, {}); futonFlat(c, 120, 130); robe(c, OTOUTO, 150, 140, { k: 'so', pose: 'sit', expr: 'sad' }); robe(c, KISUKE, 230, 156, { k: 'sk', flip: true }); sepia(); plate(c, 20, 46, 'すまない、すまない', '#f8e8b0'); return { z: 1.04, fx: 180, fy: 110 }; }
    if (t > S.tLoom) { R(c, 0, 0, W, H, '#5c4c3c'); R(c, 0, 140, W, 50, '#3c3024'); loom(c, 60, 140, t); loom(c, 180, 140, t + 1); robe(c, KISUKE, 150, 156, { k: 'lk', arm: 'up' }); robe(c, OTOUTO, 280, 156, { k: 'lo', arm: 'up' }); sepia(); plate(c, 20, 46, '西陣の織場', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tPast) { R(c, 0, 0, W, H, '#c8b494'); R(c, 0, 120, W, 70, '#a88c64'); for (let i = 0; i < 4; i++) R(c, 10 + i * 80, 40, 60, 80, '#8c7454'); robe(c, KID_K, 140, 156, { k: 'pk', s: 0.62, f: Math.floor(t * 4) & 3 }); robe(c, KID_O, 162, 156, { k: 'po', s: 0.52, f: Math.floor(t * 4 + 1) & 3 }); for (let i = 0; i < 3; i++) robe(c, [SHOBE, WIFE, MOTHER][i], 40 + i * 90 + (i > 0 ? 120 : 0), 156, { k: 'nb' + i, flip: i > 0 }); sepia(); plate(c, 20, 46, '二人で生きてきた', '#5c3c1c', '#f8f0d8'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tSan) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('sn', { t, kex: 'shock' })); plate(c, 20, 46, '「さん」', '#f8e8b0'); return { z: 1.08, fx: 150, fy: 120 }; }
    river(c, t, { night: true }); dim(c, 0.55); bigCap(c, 'なぜ、弟を', 36, 32, '#f8c8c8', sg(t, 0.4, 1));
    return { z: 1.05, fx: 160, fy: 120 };
  }
}, [['V3', SCLOSE]]);

/* ---- GG: that day — the hut at dusk; the brother face-down, blood all around (a dark pool, no wound shown); the razor; "すまない…抜いてくれ"; the eyes urging; "しかたがない、抜いてやるぞ"; the old woman at the door; he is gone (moves: the light dies, the door bursts open) ---- */
const GG = withCuts({
  name: 'あの日', ch: 'あの日', bgm: 'dread',
  init(S) { S.tBlood = at(S, 'L23', 2) - 0.3; S.tRazor = at(S, 'L24', 0) - 0.3; S.tEyes = at(S, 'L25', 0) - 0.3; S.tDecide = at(S, 'L26', 0) - 0.3; S.tGlad = at(S, 'L26b', 0) - 0.3; S.tPull = at(S, 'L27', 0) - 0.3; S.tBaba = at(S, 'L27b', 0) - 0.3; S.tGone = at(S, 'L28', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tGone) { hut(c, t, { door: true }); futonFlat(c, 110, 140); E(c, 150, 146, 34, 6, '#3c0c10'); robe(c, OTOUTO, 140, 146, { k: 'gn', pose: 'sit', blink: 2 }); robe(c, KISUKE, 200, 156, { k: 'gk', expr: 'sad', pose: 'kneel', flip: true }); dim(c, 0.4); return { z: 1.06, fx: 160, fy: 120 }; }
    if (t > S.tBaba) { hut(c, t, { door: true }); futonFlat(c, 110, 140); E(c, 150, 146, 30, 5, '#3c0c10'); robe(c, KISUKE, 180, 156, { k: 'bk', pose: 'kneel', expr: 'shock', flip: true }); robe(c, BABA, 255, 140, { k: 'bb', expr: 'shock', arm: 'up' }); return { z: 1.04, fx: 200, fy: 110, sx: t < S.tBaba + 0.4 ? Math.round(Math.sin(t * 60)) : 0 }; }
    if (t > S.tPull) { hut(c, t, {}); dim(c, 0.6); glow(c, 160, 110, 50, 30, '#c8c8d0', 0.2 + 0.15 * Math.sin(t * 9)); const k = sg(t, S.tPull + 0.6, S.tPull + 1.4); c.save(); c.translate(150 + 20 * k, 110); R(c, -26, -3, 26, 6, '#3c2c1c'); R(c, -26, -3, 26, 2, '#5c4430'); PF(c, [0, -4, 30, -2, 30, 2, 0, 3], '#c8ccd4'); L(c, 2, -3, 30, -2, '#f0f4f8'); c.restore(); plate(c, 20, 46, '剃刀', '#c8d0f0'); return { z: 1.12, fx: 160, fy: 110 }; }
    if (t > S.tGlad) { R(c, 0, 0, W, H, '#0c0808'); blit(c, otoutoFace({ calm: true }), 160, 104, 24, 24, { s: 2.4 }); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tDecide) { R(c, 0, 0, W, H, '#140c0c'); blit(c, kisukeFace({ sad: true, blink: blinkOf(t, 6) }), 160, 104, 24, 24, { s: 2.4 }); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tEyes) { R(c, 0, 0, W, H, '#0c0808'); const k = sg(t, S.tEyes, S.tDecide); for (const x0 of [120, 200]) { E(c, x0, 100, 22, 10 - 4 * k, '#e8e0d8'); E(c, x0, 100, 8, 8 - 3 * k, '#140808'); } plate(c, 90, 40, '早くしろ、早くしろ', '#f8c8c8'); return { z: 1.04 + 0.08 * k, fx: 160, fy: 100 }; }
    if (t > S.tRazor) { hut(c, t, {}); futonFlat(c, 110, 140); E(c, 150, 146, 26, 5, '#3c0c10'); robe(c, OTOUTO, 140, 146, { k: 'rz', pose: 'sit', expr: 'sad' }); robe(c, KISUKE, 200, 156, { k: 'rk', expr: 'shock', flip: true }); dim(c, 0.35); if (Math.sin(t * 5) > 0.6) P(c, 148, 118, '#f8f8ff'); return { z: 1.1, fx: 160, fy: 120 }; }
    if (t > S.tBlood) { hut(c, t, {}); futonFlat(c, 110, 140); E(c, 150, 146, 24 * sg(t, S.tBlood, S.tBlood + 2), 5, '#3c0c10'); robe(c, OTOUTO, 140, 146, { k: 'bl', pose: 'bow' }); robe(c, KISUKE, 230, 156, { k: 'bs', expr: 'shock', flip: true }); dim(c, 0.3); return { z: 1.06, fx: 170, fy: 120 }; }
    hut(c, t, {}); futonFlat(c, 110, 140); robe(c, OTOUTO, 140, 146, { k: 'b0', pose: 'bow' }); robe(c, KISUKE, lerp(300, 230, sg(t, 0, 2)), 156, { k: 'b1', flip: true, f: Math.floor(t * 4) & 3 }); R(c, 244, 120, 10, 8, '#8c7c5c');
    return { z: 1.03, fx: 180, fy: 110 };
  }
}, [['O1', OCLOSE], ['O2', OCLOSE], ['K5', KSAD]]);

/* ---- GH: the doubt — is this brother-killing? he was dying anyway; he asked; Kisuke could not bear it; is it a crime?; leave it to the magistrate; still not settled (moves: the scale tips back and forth, the white sand of the court) ---- */
const GH = {
  name: '疑い', ch: 'それが罪であろうか', bgm: 'requiem',
  init(S) { S.tQ = at(S, 'L30', 0) - 0.3; S.tWhy = at(S, 'L30b', 0) - 0.3; S.tCrime = at(S, 'L31', 0) - 0.3; S.tBoth = at(S, 'L32', 0) - 0.3; S.tUp = at(S, 'L33', 0) - 0.3; S.tStill = at(S, 'L33b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tStill) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('sl', { t })); TX(c, '？', 120, 70, '#c8d0f0', 16, null); return { z: 1.06, fx: 140, fy: 120 }; }
    if (t > S.tUp) { shirasu(c, t); robe(c, BUGYO, 230, 92, { k: 'bq', pose: 'sit' }); robe(c, KISUKE, 230, 160, { k: 'kq', pose: 'kneel' }); plate(c, 20, 76, 'お奉行様の判断に', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tBoth || t > S.tCrime) { R(c, 0, 0, W, H, '#14141c'); const a = Math.sin(t * 1.2) * 0.25; R(c, 158, 60, 4, 80, '#a89c7c'); c.save(); c.translate(160, 62); c.rotate(a); R(c, -70, -2, 140, 4, '#a89c7c'); L(c, -66, 0, -66, 30, '#a89c7c'); L(c, 66, 0, 66, 30, '#a89c7c'); E(c, -66, 32, 18, 4, '#c8b888'); E(c, 66, 32, 18, 4, '#c8b888'); c.restore(); plate(c, 40, 40, '罪', '#f8c8c8'); plate(c, 230, 40, '救い', '#c8f0d0'); if (t > S.tBoth) plate(c, 90, 140, '疑いが、解けない', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tWhy) { R(c, 0, 0, W, H, '#1c1c24'); const items = ['どうせ死ぬ弟', '死なせてくれと頼んだ', '見ているに忍びない', '苦から救うため']; const n = Math.min(4, 1 + Math.floor(sg(t, S.tWhy, S.tCrime - 0.5) * 4)); for (let i = 0; i < n; i++) plate(c, 20, 36 + i * 26, items[i], '#c8d0f0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tQ) { R(c, 0, 0, W, H, '#0c0c1c'); bigCap(c, 'これが、弟殺しか', 50, 32, '#f8e8b0', sg(t, S.tQ + 0.2, S.tQ + 0.8)); return { z: 1.03, fx: 160, fy: 100 }; }
    river(c, t, { night: true }); boat(c, t, 160, 150, ride('l', { t, kex: 'sad' }));
    return { z: 1.08, fx: 150, fy: 120 };
  }
};

/* ---- GI: ending — deepening hazy night; two silent men; the boat slides over black water (moves: the boat drifts away, the moon fades) ---- */
const GI = {
  name: 'おぼろ夜', ch: 'おわりに', bgm: 'requiem',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    river(c, t, { night: true }); boat(c, t, lerp(140, 190, sg(t, 0, 14)), 150, ride('e', { t, kex: 'normal' }), { lamp: true }); dim(c, 0.2 * sg(t, 2, 12));
    return { z: 1.03, fx: 180, fy: 110 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '月を見る罪人', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('s1', { t })); return { z: 1.12 + 0.05 * ss(sg(t, 0, S.dur)), fx: 172, fy: 118 }; } };
const SS2 = { name: 'その顔', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { river(c, t, { night: true }); boat(c, t, 160, 150, ride('s2', { t })); return { z: 1.06 + 0.06 * ss(sg(t, 0, S.dur)), fx: 172, fy: 118 }; } };
