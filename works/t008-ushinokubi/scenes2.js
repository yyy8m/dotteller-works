/* ================= 都市伝説 #008 牛の首: scenes ================= */
const SC = (c, t) => closeUp(c, t, senseiFace({ blink: blinkOf(t, 5) }), { bg: ['#1c2418', '#4c5c3c'], spk: 'sensei' });
function bubble(c, x, y, txt, col = '#1c1c1c') { const s = textSpr(txt, 16, col); R(c, x - 5, y - 4, s.width + 10, 24, '#f4f0e8'); PF(c, [x + 4, y + 20, x + 10, y + 28, x + 14, y + 20], '#f4f0e8'); TX(c, txt, x, y, col, 16, null); }
// a plain dark ground with a faint two-tone weave and a slow light
function bgF(c, col, t = 0) { c.drawImage(cached('bgF' + col, () => { const [cv, x] = mk(W, H); R(x, 0, 0, W, H, col); const [r0, g0, b0] = hex(col), c2 = 'rgb(' + Math.min(255, r0 + 10) + ',' + Math.min(255, g0 + 10) + ',' + Math.min(255, b0 + 13) + ')'; for (let y = 0; y < H; y += 2) for (let xx = (y >> 1 & 1) * 2; xx < W; xx += 4) R(x, xx, y, 2, 2, c2); return cv; }), 0, 0); glow(c, 160 + Math.sin(t * 0.4) * 40, 100, 150, 90, '#f8e8b0', 0.06); }
const shiver = (t, k = 1) => Math.round(Math.sin(t * 60) * k);
// the listeners around the candle; o.shake trembles them; o.out lowers them into the dark
function listeners(c, t, o = {}) { for (let i = 0; i < 4; i++) { const x = [70, 110, 210, 250][i] + (o.shake ? shiver(t + i, 1) : 0); person(c, LISTENERS[i], x, 168, { k: 'li' + i + (o.shake ? 's' : ''), flip: i >= 2, expr: o.shake ? 'shock' : 'normal', blink: blinkOf(t, i + 3) }); } }
// three ways to the story, each ending at an X
function trail(c, t, t0, i, label) { const y = 50 + i * 40, k = sg(t, t0, t0 + 0.8); plate(c, 40, y, label, '#f8e8b0'); L(c, 150, y + 8, lerp(150, 230, k), y + 8, '#a8a8b8', 2); if (k >= 1) TX(c, '×', 236, y, '#f84040', 16, null); }

/* ---- UZ: cold open — a candle in a tatami room; the listeners tremble; the candle goes out; the storyteller leaves for a temple; only the title remains: 牛の首 (moves: the flame, the shiver, the smoke, the mist, the book, the shape behind it) ---- */
const UZ = {
  name: '題名だけの怪談', ch: '噂', bgm: 'dread',
  init(S) { S.tDie = at(S, 'C0', 3) - 0.3; S.tMonk = at(S, 'C1', 0) - 0.3; S.tNone = at(S, 'C2', 0) - 0.3; S.tTitle = at(S, 'C2', 4) - 0.3; S.tName = at(S, 'C2', 5) - 0.3; S.dur = lastSe(S) + 1.6; },
  draw(c, t, S) {
    if (t > S.tNone) { bgF(c, '#0c0808', t); if (t > S.tName) cowHead(c, t, 160, 100, { a: 0.35 * sg(t, S.tName, S.tName + 1.5), s: 4, dark: true }); titleBook(c, 160, 110); return { z: 1.04 + (t > S.tTitle ? 0.12 * sg(t, S.tTitle, S.dur) : 0), fx: 160, fy: 104 }; }
    if (t > S.tMonk) { templeGate(c, t); person(c, MONK, lerp(150, 162, sg(t, S.tMonk, S.tNone)), lerp(176, 136, sg(t, S.tMonk + 0.5, S.tNone)), { k: 'zm', f: Math.floor(t * 3) & 3, s: lerp(1, 0.7, sg(t, S.tMonk, S.tNone)) }); return { z: 1.06, fx: 160, fy: 100 }; }
    candleRoom(c, t, { out: t > S.tDie }); listeners(c, t, { shake: t > at(S, 'C0', 1) - 0.3 });
    return { z: 1.06 + 0.06 * sg(t, 0, S.tMonk), fx: 160, fy: 120 };
  }
};

/* ---- UA: the most frightening story in Japan — and something different about it (moves: the book turns, question marks drift) ---- */
const UA = {
  name: '世界一怖い怪談', ch: '牛の首とは', bgm: 'eerie',
  init(S) { S.tDiff = at(S, 'L1x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    bgF(c, '#14101c', t); titleBook(c, 160, 104);
    if (t > S.tDiff) { for (let i = 0; i < 5; i++) TX(c, '？', 60 + i * 50 + Math.sin(t * 2 + i) * 4, 60 + (i % 2) * 70 + Math.cos(t * 2 + i) * 4, '#a8a0c8', 16, null); return { z: 1.1, fx: 160, fy: 104 }; }
    if (t > at(S, 'L1', 2) - 0.3) plate(c, 50, 44, 'この世でいちばん恐ろしい怪談', '#f8e8b0'); else plate(c, 90, 44, '日本の都市伝説', '#f8e8b0');
    return { z: 1.04, fx: 160, fy: 104 };
  }
};

/* ---- UB: the legend — the storyteller; nobody knows where it began; the listeners shake; three days; the author becomes a monk; only the title is left (moves: three day stamps, the gate, the empty pages) ---- */
const UB = {
  name: '伝説', ch: '聞いた者は死ぬ', bgm: 'eerie',
  init(S) { S.tWhere = at(S, 'L2x', 0) - 0.3; S.tHear = at(S, 'L3', 0) - 0.3; S.tDays = at(S, 'L3', 2) - 0.3; S.tAuth = at(S, 'L4', 0) - 0.3; S.tMonk = at(S, 'L4', 3) - 0.3; S.tLeft = at(S, 'L5', 0) - 0.3; S.tOnly = at(S, 'L5', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tOnly) { bgF(c, '#1c1814', t); titleBook(c, 160, 100, { open: true }); if (t > at(S, 'L5', 4) - 0.3) plate(c, 60, 160 - 20, '比べるもののない恐ろしさ', '#f8c8c8'); return { z: 1.1, fx: 160, fy: 100 }; }
    if (t > S.tLeft) { candleRoom(c, t, { out: true }); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tMonk) { templeGate(c, t); person(c, MONK, 160, 150, { k: 'bm', blink: blinkOf(t, 6) }); if (t > at(S, 'L4', 4) - 0.3) for (let i = 0; i < 3; i++) person(c, LISTENERS[i], 60 + i * 30, 176, { k: 'ba' + i, arm: 'wave' }); return { z: 1.08, fx: 150, fy: 110 }; }
    if (t > S.tAuth) { candleRoom(c, t); person(c, KATARI, 160, 160, { k: 'ba0', expr: 'sad', blink: blinkOf(t, 5) }); plate(c, 40, 44, '怪談の作者', '#f8e8b0'); return { z: 1.12, fx: 160, fy: 112 }; }
    if (t > S.tDays) { bgF(c, '#1c1418', t); const ds = ['一日目', '二日目', '三日目']; for (let i = 0; i < 3; i++) stamp(c, t, S.tDays + 0.3 + i * 0.7, 80 + i * 80, 100, ds[i], 64, i === 2 ? '#c81818' : '#5c5c6c'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tHear) { candleRoom(c, t); person(c, KATARI, 160, 160, { k: 'bk', blink: blinkOf(t, 5) }); listeners(c, t, { shake: t > at(S, 'L3', 1) - 0.3 }); return { z: 1.06, fx: 160, fy: 116 }; }
    if (t > S.tWhere) { bgF(c, '#14141c', t); bubble(c, 70, 70, 'いつから？'); bubble(c, 190, 110, 'どこで？'); return { z: 1.04, fx: 160, fy: 100 }; }
    candleRoom(c, t); person(c, KATARI, 160, 160, { k: 'bk0', blink: blinkOf(t, 5) }); listeners(c, t);
    return { z: 1.06 + 0.04 * sg(t, 0, S.tWhere), fx: 160, fy: 116 };
  }
};

/* ---- UC: the bus — an autumn trip up a mountain road; the bored children; the teacher takes the microphone; "牛の首"; the laughter stops; the cedars go dark; the children cover their ears (moves: the road scrolls, the leaves, the trees outside the windows, the children rise and fall) ---- */
const kidsRow = (t, o = {}) => c => { for (let i = 0; i < 4; i++) { const x = [82, 112, 208, 238][i], y = 140; person(c, KIDS[i], x + (o.shake ? shiver(t + i) : 0), y, { k: 'kr' + i + (o.expr || '') + (o.arm || ''), expr: o.expr || 'normal', arm: o.arm || null, blink: blinkOf(t, i + 2), rot: o.rot ? [0.5, -0.4, 0.45, -0.5][i] : 0 }); } };
const UC = withCuts({
  name: 'バスの中', ch: '遠足のバス', bgm: 'carnival',
  init(S) { S.tVar = at(S, 'L6x', 0) - 0.3; S.tRide = at(S, 'L7', 0) - 0.3; S.tBored = at(S, 'L7x', 0) - 0.3; S.tCheer = at(S, 'L8', 0) - 0.3; S.tQuiet = at(S, 'L9', 0) - 0.3; S.tCedar = at(S, 'L9x', 0) - 0.3; S.tPale = at(S, 'L10', 0) - 0.3; S.tEars = at(S, 'L11', 0) - 0.3; S.tOn = at(S, 'L11x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const teacher = (o = {}) => person(c, SENSEI, 160, 150, { k: 'ct' + (o.k || ''), arm: o.arm || null, blink: blinkOf(t, 4), expr: o.expr || 'normal' });
    if (t > S.tOn) { busInside(c, t, { back: kidsRow(t, { expr: 'shock', arm: 'up', shake: true }), dark: 0.45, v: 140 }); teacher({ k: 'on', arm: 'wave' }); return { z: 1.1 + 0.06 * sg(t, S.tOn, S.dur), fx: 160, fy: 110 }; }
    if (t > S.tEars) { busInside(c, t, { back: kidsRow(t, { expr: 'shock', arm: 'up' }), dark: 0.35, v: 120 }); teacher({ k: 'ea' }); return { z: 1.08, fx: 160, fy: 110 }; }
    if (t > S.tPale) { busInside(c, t, { back: kidsRow(t, { expr: 'sad' }), dark: 0.3, v: 100 }); teacher({ k: 'pa', arm: 'wave' }); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tCedar) { busInside(c, t, { back: kidsRow(t, { expr: 'sad' }), dark: 0.2, v: 90 }); return { z: 1.04, fx: 160, fy: 60 }; }
    if (t > S.tQuiet) { busInside(c, t, { back: kidsRow(t, { expr: t > at(S, 'L9', 2) - 0.3 ? 'sad' : 'smile' }), dark: 0.1 * sg(t, S.tQuiet, S.tCedar) }); teacher({ k: 'qu', arm: 'wave' }); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tCheer) { busInside(c, t, { back: kidsRow(t, { expr: 'smile', arm: Math.floor(t * 3) % 2 ? 'up' : null }) }); teacher({ k: 'ch' }); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tBored) { busInside(c, t, { back: kidsRow(t, { expr: 'sad' }) }); if (t > at(S, 'L7x', 2) - 0.3) { teacher({ k: 'mi' }); R(c, 170, 112, 3, 10, '#3c3c3c'); } return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tRide) { mountainRoad(c, t, { v: 80 }); bus(c, 90 + Math.sin(t * 2) * 2, 150); yearFlash(c, t, S.tRide + 0.3, '秋', 216, 10, '遠足'); return { z: 1.06, fx: 160, fy: 110 }; }
    if (t > S.tVar) { bgF(c, '#1c1c24', t); for (let i = 0; i < 3; i++) { bus(c, 20 + i * 100, 120 + i * 20, {}); } dim(c, 0.3); plate(c, 40, 44, '話す人によって少しずつ違う', '#f8e8b0'); return { z: 1.02, fx: 160, fy: 100 }; }
    mountainRoad(c, t, { v: 0 }); bus(c, 80, 150); plate(c, 40, 44, 'ある学校の遠足', '#f8e8b0');
    return { z: 1.04 + 0.04 * sg(t, 0, S.tVar), fx: 150, fy: 110 };
  }
}, [['N1', SC], ['N2', SC]]);

/* ---- UD: the stop — the bus lurches and stops; the screech; the driver shakes, staring ahead; the children have fainted; later they wake and remember nothing; the teacher never tells it again (moves: the jolt, the wheel shaking, the slumped heads, the waking) ---- */
const UD = {
  name: '止まったバス', ch: 'バスが止まる', bgm: 'chase',
  init(S) { S.tJolt = at(S, 'L12', 1) - 0.3; S.tBrake = Math.min(at(S, 'L12x', 0), at(S, 'T2', 2)) - 0.3; S.tDrv = Math.min(at(S, 'L13', 0), at(S, 'T2', 3)) - 0.3; S.tEyes = at(S, 'L13x', 0) - 0.3; S.tKids = at(S, 'L14', 0) - 0.3; S.tHush = at(S, 'L14x', 0) - 0.3; S.tWake = at(S, 'L15', 0) - 0.3; S.tNever = at(S, 'L15x', 0) - 0.3; S.tEnd = at(S, 'L16', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tEnd) { bgF(c, '#14101c', t); titleBook(c, 160, 104); TX(c, '？', 220 + Math.sin(t * 2) * 3, 50, '#c8c8e0', 16, null); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tNever) { bgF(c, '#1c1c24', t); person(c, SENSEI, 160, 160, { k: 'dn', expr: 'sad', blink: blinkOf(t, 6) }); return { z: 1.16, fx: 160, fy: 120 }; }
    if (t > S.tWake) { busInside(c, t, { back: kidsRow(t, {}), v: 0 }); for (let i = 0; i < 4; i++) if (t > at(S, 'L15', 3) - 0.3) TX(c, '？', [78, 108, 204, 234][i], 70, '#f8f0d8', 16, null); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tHush) { busInside(c, t, { back: kidsRow(t, { rot: true }), dark: 0.45, v: 0 }); person(c, SENSEI, 160, 150, { k: 'dh', expr: 'shock' }); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tKids) { busInside(c, t, { back: kidsRow(t, { rot: true }), dark: 0.35, v: 0 }); person(c, SENSEI, 160, 150, { k: 'dk', expr: 'shock', flip: true }); return { z: 1.06 + 0.06 * sg(t, S.tKids, S.tHush), fx: 160, fy: 110 }; }
    if (t > S.tDrv) { driverSeat(c, t, { v: 0 }); const sh = shiver(t, 2); person(c, DRIVER, 160 + sh, 182, { k: 'dd', s: 1.6 }); wheel(c, 160 + sh, 152, 0.2 + sh * 0.05); R(c, 136 + sh, 140, 7, 6, '#d0a07c'); R(c, 177 + sh, 140, 7, 6, '#d0a07c'); for (let i = 0; i < 2; i++) { const y = 100 + ((t * 14 + i * 9) % 18); E(c, 150 + i * 16 + sh, y, 2, 3, '#c8e0f8'); } if (t > S.tEyes) plate(c, 40, 44, 'まばたきもしない', '#f8e8b0'); return { z: 1.06, fx: 160, fy: 110, sx: sh }; }
    if (t > S.tJolt) { mountainRoad(c, t, { v: 0, dark: 0.3 }); bus(c, 90, 150, { stop: true }); if (t > S.tBrake) for (let i = 0; i < 3; i++) R(c, 70 - i * 14, 146 - i * 3, 10, 2, '#a8a8a8'); return { z: 1.08, fx: 160, fy: 110, sx: t - S.tJolt < 0.5 ? shiver(t, 3) : 0 }; }
    busInside(c, t, { back: kidsRow(t, { expr: 'shock', arm: 'up' }), dark: 0.4, v: 140 }); person(c, SENSEI, 160, 150, { k: 'dj', arm: 'wave' });
    return { z: 1.1, fx: 160, fy: 110 };
  }
};
// the cut after the bus: the cow's head in the dark — the shape the story never had
const UH0 = { name: '牛の首', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, cowHeadSpr({ dark: true }), [[16, 22], [29, 22]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- UE: the turn — every road to the story ends in an X; the story itself does not exist; only the title and the reputation; "a phantom urban legend" (moves: three trails, the book opens on blank pages) ---- */
const UE = {
  name: '中身のない怪談', ch: '牛の首の正体', bgm: 'requiem',
  init(S) { S.tTrails = at(S, 'L18', 0) - 0.3; S.tNever = at(S, 'L18x', 0) - 0.3; S.tNone = at(S, 'L19', 1) - 0.3; S.tTruth = at(S, 'L20', 0) - 0.3; S.tQuote = at(S, 'L20x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tQuote) { bgF(c, '#1c1814', t); R(c, 100, 40, 120, 110, '#3c4c6c'); R(c, 104, 44, 112, 102, '#4c5c7c'); TX(c, '幻の', 128, 70, '#f8f0d8', 16, null); TX(c, '都市伝説', 128, 92, '#f8f0d8', 16, null); return { z: 1.06, fx: 160, fy: 96 }; }
    if (t > S.tTruth) { bgF(c, '#1c1814', t); titleBook(c, 160, 100, { open: true }); plate(c, 90, 44, '中身のない怪談', '#f8c8c8'); return { z: 1.08, fx: 160, fy: 100 }; }
    if (t > S.tNone) { bgF(c, '#0c0808', t); titleBook(c, 160, 110, { open: t > S.tNone + 0.8 }); return { z: 1.06 + 0.1 * sg(t, S.tNone, S.tTruth), fx: 160, fy: 110 }; }
    if (t > S.tTrails) { bgF(c, '#14141c', t); const ls = ['聞いた者は死んだ', '作者は語らなかった', '子どもは覚えていない']; for (let i = 0; i < 3; i++) if (t > at(S, 'L18', i === 2 ? 2 : i) - 0.3) trail(c, t, at(S, 'L18', i === 2 ? 2 : i), i, ls[i]); if (t > S.tNever) { R(c, 250, 40, 50, 110, '#000000'); TX(c, '？', 266, 86, '#c8c8e0', 16, null); } return { z: 1.04, fx: 160, fy: 100 }; }
    bgF(c, '#14141c', t); TX(c, '？', 154 + Math.sin(t * 2) * 2, 90, '#c8c8e0', 16, null);
    return { z: 1.02 + 0.06 * sg(t, 0, S.dur), fx: 160, fy: 100 };
  }
};

/* ---- UF: where it came from — 1965, a short story in a sports paper; a tale already told among publishers; 1973, an essay in an evening paper; writers' table talk spreading; 1926, a magazine article with the same title (moves: pages spin in, a chain of whispers, sepia paper) ---- */
const UF = {
  name: '噂の出どころ', ch: '噂の出どころ', bgm: 'memory',
  init(S) { S.t65 = at(S, 'L22', 0) - 0.3; S.tPlot = at(S, 'L22x', 0) - 0.3; S.tTrue = at(S, 'L22x', 9) - 0.3; S.tPub = at(S, 'L23', 0) - 0.3; S.t73 = at(S, 'L24', 0) - 0.3; S.tUnsure = at(S, 'L24', 6) - 0.3; S.tChain = at(S, 'L25', 0) - 0.3; S.t26 = at(S, 'L26', 2) - 0.3; S.tFather = at(S, 'L26x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tFather) { candleRoom(c, t); person(c, KATARI, 130, 160, { k: 'ff', blink: blinkOf(t, 5) }); person(c, KIDS[0], 180, 160, { k: 'fk', flip: true }); if (t > at(S, 'L26x', 2) - 0.3) TX(c, '？', 220, 60, '#c8c8e0', 16, null); return { z: 1.1, fx: 155, fy: 116 }; }
    if (t > S.t26) { bgF(c, '#2c2420', t); spinPaper(c, pageSpr('1926', '牛の首', '大正十五年', '雑誌', '#d8c8a0'), 160, 100, sg(t, S.t26, S.t26 + 0.8)); yearFlash(c, t, S.t26 + 0.2, '1926', 216, 10, '大正15年'); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tChain) { bgF(c, '#1c1c24', t); const n = Math.floor(lerp(1, 7, sg(t, S.tChain + 0.3, S.tChain + 4))); for (let i = 0; i < n; i++) person(c, i < 3 ? WRITER : LISTENERS[i % 4], 30 + i * 44, 168, { k: 'fc' + i, arm: i === n - 1 ? null : 'wave' }); plate(c, 40, 44, '作家仲間から世間へ', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.t73) { bgF(c, '#2c2c30', t); spinPaper(c, pageSpr('1973', '世界一怖い怪談', 'エッセイ（説）', '新聞'), 160, 100, sg(t, S.t73, S.t73 + 0.8)); yearFlash(c, t, S.t73 + 0.2, '1973', 216, 10, ''); if (t > S.tUnsure) TX(c, '？', 236, 140 - 20, '#f8e8b0', 16, null); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tPub) { bgF(c, '#3c342c', t); R(c, 0, 140, W, 50, '#5c4c3c'); for (let i = 0; i < 5; i++) R(c, 30 + i * 60, 100 - (i % 2) * 10, 40, 40 + (i % 2) * 10, '#e8e0c8'); for (let i = 0; i < 3; i++) person(c, WRITER, 80 + i * 80, 176, { k: 'fp' + i, flip: i === 2, arm: i === 1 ? 'wave' : null, blink: blinkOf(t, i + 3) }); bubble(c, 120, 40, '牛の首って知ってる？'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tPlot) { candleRoom(c, t); person(c, WRITER, 110, 160, { k: 'fw', expr: t > S.tTrue ? 'shock' : 'normal', blink: blinkOf(t, 4) }); if (t < S.tTrue) for (let i = 0; i < 2; i++) { person(c, LISTENERS[i], 200 + i * 40, 160, { k: 'fl' + i, flip: true, expr: 'shock' }); } if (t > at(S, 'L22x', 3) - 0.3 && t < S.tTrue) bubble(c, 170, 50, 'あんな話は…'); return { z: 1.08, fx: 160, fy: 112 }; }
    if (t < S.t65) { bgF(c, '#14141c', t); plate(c, 120, 80, '出どころは？', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 100 }; }
    bgF(c, '#2c2c30', t); spinPaper(c, pageSpr('1965', '牛の首', '短い小説', 'スポーツ紙'), 160, 100, sg(t, S.t65 + 0.4, S.t65 + 1.2)); yearFlash(c, t, S.t65 + 0.2, '1965', 216, 10, '');
    return { z: 1.04, fx: 160, fy: 100 };
  }
};

/* ---- UG: why it frightens — the Samejima incident on a message board: "don't ask"; a ghost you can see vs. a story with no shape; each listener imagines their own worst thing; the night road (moves: the posts type in, bubbles of different shapes, the walker) ---- */
const UG = {
  name: 'なぜ怖いのか', ch: '中身のない恐怖', bgm: 'eerie',
  init(S) { S.tNet = at(S, 'L27', 4) - 0.3; S.tSame = at(S, 'L27x', 0) - 0.3; S.tWhy = at(S, 'L28', 0) - 0.3; S.tGhost = at(S, 'L28x', 0) - 0.3; S.tNoShape = at(S, 'L28x', 3) - 0.3; S.tEach = at(S, 'L29', 0) - 0.3; S.tAll = at(S, 'L29x', 0) - 0.3; S.tRoad = at(S, 'L29y', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRoad) { nightRoad(c, t); person(c, LISTENERS[1], lerp(60, 200, sg(t, S.tRoad, S.dur)), 170, { k: 'gr', f: Math.floor(t * 3) & 3 }); if (t > at(S, 'L29y', 3) - 0.3) cowHead(c, t, 270, 80, { a: 0.25, s: 2, dark: true }); return { z: 1.06, fx: 160, fy: 112 }; }
    if (t > S.tAll) { bgF(c, '#0c0808', t); cowHead(c, t, 160, 84, { a: sg(t, S.tAll, S.tAll + 1.5), s: 3 }); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tEach) { bgF(c, '#14141c', t); const th = ['影', '目', '手', '顔']; for (let i = 0; i < 4; i++) { person(c, LISTENERS[i], 50 + i * 74, 176, { k: 'ge' + i, expr: 'shock' }); if (t > S.tEach + 0.5 + i * 0.6) bubble(c, 34 + i * 74, 86, th[i] + '？'); } return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tGhost) { bgF(c, '#14141c', t); c.save(); c.globalAlpha = 0.7; E(c, 80, 90, 18, 22, '#d8dce8'); PF(c, [62, 92, 80, 150, 98, 92], '#d8dce8'); L(c, 64, 100, 50, 112, '#d8dce8', 3); L(c, 96, 100, 110, 112, '#d8dce8', 3); c.restore(); E(c, 74, 86, 3, 4, '#14141c'); E(c, 86, 86, 3, 4, '#14141c'); person(c, LISTENERS[0], 60, 176, { k: 'gg', flip: false }); if (t > S.tNoShape) { R(c, 200, 50, 80, 90, '#000000'); TX(c, '？', 232, 86, '#c8c8e0', 16, null); person(c, LISTENERS[2], 230, 176, { k: 'gn', expr: 'shock' }); } return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tWhy) { nightRoad(c, t); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tNet) { monitor(c, t, ['＞鮫島事件って知ってる？', '＞その話はやめておけ', '＞……'], { n: Math.floor(lerp(0, 3, sg(t, S.tNet + 0.5, S.tNet + 3.5))), hl: 1 }); return { z: 1.02, fx: 160, fy: 100 }; }
    bgF(c, '#14141c', t); for (let i = 0; i < 4; i++) { R(c, 30 + i * 70, 60, 50, 66, '#2c2428'); R(c, 50 + i * 70, 66, 10, 50, '#e8e0c8'); } plate(c, 40, 44, '中身のない怪談は、繰り返す', '#f8e8b0');
    return { z: 1.04, fx: 160, fy: 100 };
  }
};

/* ---- UM: you know it now — a screen glowing in a dark room; the question waiting; the cow's head fades (moves: the screen flicker, the slow dim) ---- */
const UM = {
  name: '次はあなた', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tAsk = at(S, 'L30x', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    bgF(c, '#06060c', t); const f = 0.9 + 0.1 * Math.sin(t * 13); glow(c, 160, 110, 120 * f, 80 * f, '#8cb0f8', 0.18); R(c, 136, 70, 48, 80, '#1c1c24'); R(c, 140, 74, 40, 70, '#4c6c9c');
    if (t > S.tAsk) bubble(c, 100, 40, '牛の首って知ってる？'); cowHead(c, t, 260, 80, { a: 0.3 * (1 - sg(t, S.tEnd - 3, S.tEnd + 3)), s: 2.5, dark: true }); dim(c, 0.25 * sg(t, 3, 14));
    return { z: 1.06, fx: 160, fy: 110 };
  }
};

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '牛の首', ch: '', bgm: 'dread', init(S) { S.tB = at(S, 'S1', 4) - 0.3; S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { if (t > S.tB) { bgF(c, '#0c0808', t); cowHead(c, t, 160, 100, { a: 0.3, s: 4, dark: true }); titleBook(c, 160, 110); return { z: 1.08, fx: 160, fy: 104 }; } candleRoom(c, t, { out: t > at(S, 'S1', 3) - 0.3 }); listeners(c, t, { shake: t > at(S, 'S1', 2) - 0.3 }); return { z: 1.08, fx: 160, fy: 120 }; } };
const SS2 = { name: '山道のバス', ch: '', bgm: 'carnival', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { if (t > at(S, 'S2', 1) - 0.3) { busInside(c, t, { back: kidsRow(t, { expr: 'smile' }) }); person(c, SENSEI, 160, 150, { k: 's2t', arm: 'wave' }); return { z: 1.06, fx: 160, fy: 110 }; } mountainRoad(c, t, { v: 80 }); bus(c, 90, 150); return { z: 1.06, fx: 160, fy: 110 }; } };
