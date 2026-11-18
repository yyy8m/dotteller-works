/* ================= 都市伝説 #002 トイレの花子さん: scenes ================= */
const GY = 156;
const HCLOSE = (c, t) => closeUp(c, t, hanakoFace({ dark: true, blink: blinkOf(t, 5) }), { bg: ['#0c1014', '#2c3c48'], glow: '#c81c2c', spk: 'hanako' });

/* ---- HZ: cold open — the school at dusk, the empty toilet, three knocks on the third door (moves: lights go out, knocks ripple, a drip) ---- */
const HZ = withCuts({
  name: '3番目の扉', ch: '放課後のトイレ', bgm: 'eerie',
  init(S) { S.tIn = at(S, 'C0', 1) - 0.3; S.tKnock = at(S, 'C1', 0) - 0.3; S.tDoor = at(S, 'C2', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tDoor) { toilet(c, t, { dark: true, drip: true, mark: true }); dim(c, 0.35, '#0c1018'); glow(c, 242, 96, 40, 50, '#c81c2c', 0.15 + 0.08 * Math.sin(t * 3)); return { z: 1.06 + 0.06 * ss(sg(t, S.tDoor, S.dur)), fx: 242, fy: 96 }; }
    if (t > S.tKnock) { toilet(c, t, { drip: true, mark: true }); kid(c, GIRLS[0], 210, 156, { k: 'hz', arm: 'fwd' }); knock(c, t, at(S, 'C1', 1) - 0.3, 232, 96); plate(c, 20, 40, '手前から3番目', '#f8e8b0'); return { z: 1.04, fx: 220, fy: 110 }; }
    if (t > S.tIn) { toilet(c, t, { drip: true }); dim(c, 0.15 * sg(t, S.tIn, S.tKnock)); capPlate(c, t, S.tIn + 0.2, ['3階', '女子トイレ'], 44); return { z: 1.03, fx: 200, fy: 100 }; }
    school(c, t, { lit: [20, 21] }); return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tIn)), fx: 160, fy: 90 };
  }
}, [['M1', HCLOSE], ['V0', HCLOSE]]);

/* ---- HA: a rumour in every school — the 80s-90s boom (books, TV, film), the library, passed down the grades (moves: books stack, the chain of kids) ---- */
const HA = {
  name: '学校の怪談', ch: 'どこの学校にも', bgm: 'memory',
  init(S) { S.tOld = at(S, 'L2', 0) - 0.3; S.tBoom = at(S, 'L3', 0) - 0.3; S.tLib = at(S, 'L3b', 0) - 0.3; S.tSame = at(S, 'L4', 0) - 0.3; S.tDown = at(S, 'L4b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDown) { corridor(c, t); const n = Math.floor(sg(t, S.tDown, S.dur - 1) * 4.99); for (let i = 0; i < 5; i++) { if (i <= n) kid(c, GIRLS[i], 40 + i * 60, 156, { k: 'dn' + i, flip: true, s: 1 + (4 - i) * 0.08 }); } plate(c, 30, 40, '上級生から、下級生へ', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tSame) { R(c, 0, 0, W, H, '#1c2028'); for (let i = 0; i < 3; i++) { const x = 20 + i * 100; R(c, x, 50, 86, 70, '#c8c0b0'); R(c, x, 46, 86, 6, '#8c8478'); for (let k = 0; k < 3; k++) R(c, x + 8 + k * 26, 60, 18, 14, '#5c6c7c'); R(c, x + 30, 92, 26, 28, '#3c3440'); R(c, x + 30, 92, 26, 28, '#c81c2c'); hanako(c, x + 43, 120, { s: 0.6 }); } plate(c, 60, 140, 'どこの学校でも、同じ話', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tLib) { R(c, 0, 0, W, H, '#8c6c4c'); for (let r = 0; r < 3; r++) { R(c, 20, 40 + r * 36, 280, 4, '#5c4430'); for (let i = 0; i < 20; i++) if ((i + r) % 6 !== 2) R(c, 24 + i * 14, 40 + r * 36 - 28, 12, 28, ['#c81c2c', '#2c4c8c', '#3c7c3c', '#c8a03c', '#5c3c7c'][(i + r) % 5]); } plate(c, 100, 140, 'いつも貸し出し中', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tBoom) { R(c, 0, 0, W, H, '#1c1820'); const k = Math.floor(sg(t, S.tBoom, at(S, 'L3', 3)) * 3.99); if (k >= 1) { R(c, 30, 60, 60, 80, '#5c1c2c'); R(c, 34, 64, 52, 72, '#7c2c3c'); TX(c, '怖い話', 38, 80, '#f8e8b0', 16, null); } if (k >= 2) { R(c, 120, 60, 80, 66, '#3c3c44'); R(c, 126, 66, 68, 50, '#5c8cc8'); hanako(c, 160, 114, { s: 0.8 }); R(c, 150, 126, 20, 8, '#3c3c44'); } if (k >= 3) { R(c, 220, 60, 70, 70, '#141414'); for (let j = 0; j < 6; j++) { R(c, 222, 62 + j * 11, 4, 6, '#d8d8d0'); R(c, 284, 62 + j * 11, 4, 6, '#d8d8d0'); } R(c, 232, 70, 46, 50, '#3c2c3c'); } yearFlash(c, t, S.tBoom + 0.2, '1980', 216, 10, '〜90年代'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tOld) { R(c, 0, 0, W, H, '#3c3428'); c.save(); c.globalAlpha = 0.85; school(c, t, {}); c.restore(); c.save(); c.globalAlpha = 0.4; c.fillStyle = '#704c1c'; c.fillRect(0, 0, W, H); c.restore(); bigCap(c, '始まりは？', 64, 32, '#f8e8b0', sg(t, S.tOld + 0.2, S.tOld + 0.8)); return { z: 1.03, fx: 160, fy: 100 }; }
    school(c, t, {}); for (let i = 0; i < 4; i++) kid(c, GIRLS[i], 60 + i * 60, 158, { k: 'ha' + i, f: Math.floor(t * 4 + i) & 3 });
    return { z: 1.03, fx: 160, fy: 110 };
  }
};

/* ---- HB: what she looks like and how to call her — the 3rd floor, the 3rd stall, three knocks; the door opens; the mirror (moves: rules tick in, the door swings, red in the mirror) ---- */
const HB = withCuts({
  name: '呼び出し方', ch: '呼び出し方', bgm: 'dread',
  init(S) { S.tFace = at(S, 'L5b', 0) - 0.3; S.tRule = at(S, 'L6', 0) - 0.3; S.tCall = at(S, 'L8', 0) - 0.3; S.tReply = at(S, 'L9', 0) - 0.3; S.tOpen = at(S, 'L10', 0) - 0.3; S.tMirror = at(S, 'L10b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMirror) { toilet(c, t, { open: 2, drip: true }); const fl = Math.sin(t * 2) > 0; c.save(); c.beginPath(); c.rect(14, 74, 80, 40); c.clip(); if (fl) { R(c, 46, 96, 10, 18, '#c81c2c'); E(c, 51, 90, 5, 6, '#0c0c10'); } c.restore(); plate(c, 20, 40, '鏡に、赤いスカート', '#f8c8d8'); return { z: 1.05, fx: 60, fy: 100 }; }
    if (t > S.tOpen) { toilet(c, t, { open: 2, drip: true }); hanako(c, 242, 140, { face: t > at(S, 'L10', 1) - 0.3 }); kid(c, GIRLS[1], 200, 156, { k: 'op', expr: 'shock' }); return { z: 1.04 + 0.05 * ss(sg(t, S.tOpen, S.tMirror)), fx: 230, fy: 110 }; }
    if (t > S.tReply) { toilet(c, t, { dark: true, drip: true, mark: true }); kid(c, GIRLS[1], 200, 156, { k: 'rp', expr: 'shock' }); return { z: 1.05, fx: 230, fy: 110 }; }
    if (t > S.tCall) { toilet(c, t, { drip: true }); kid(c, GIRLS[1], 210, 156, { k: 'cl', arm: 'fwd' }); plate(c, 20, 40, '花子さん、遊びましょう', '#f8e8b0'); return { z: 1.04, fx: 220, fy: 110 }; }
    if (t > S.tRule) { toilet(c, t, { drip: true }); const k = Math.floor(sg(t, at(S, 'L7', 0), at(S, 'L7', 3)) * 3.99); const rs = ['3階の女子トイレ', '手前から3番目', 'ノックは3回']; for (let i = 0; i < Math.min(3, k); i++) plate(c, 14, 40 + i * 28, rs[i], '#f8e8b0'); if (k >= 2) { ER(c, 242, 96, 26, 52, '#e81c1c'); } if (k >= 3) knock(c, t, at(S, 'L7', 3), 242, 96); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tFace) { R(c, 0, 0, W, H, '#1c2028'); blit(c, hanakoFace({ dark: true, blink: blinkOf(t, 4) }), 160, 90, 24, 24, { s: 2.6 }); plate(c, 30, 40, '目が合ったら、終わり', '#f8c8d8'); return { z: 1.03, fx: 160, fy: 90 }; }
    R(c, 0, 0, W, H, '#2c3038'); glow(c, 160, 90, 120, 70, '#5c6c7c', 0.3); hanako(c, 160, 160, { s: 2.2 }); const tags = [['おかっぱ頭', 0], ['白いブラウス', 1], ['赤い吊りスカート', 2], ['小学3年生くらい', 3]]; tags.forEach(([s, k], i) => { if (t > at(S, 'L5', k) - 0.3) plate(c, i % 2 ? 200 : 20, 44 + Math.floor(i / 2) * 44 + (i % 2) * 20, s, '#f8e8b0'); });
    return { z: 1.02, fx: 160, fy: 100 };
  }
}, [['V1', HCLOSE]]);

/* ---- HC: the dare after school — three girls, rock-paper-scissors, knock knock knock, silence, she turns… "なにして、あそぶ？"; the run down the stairs (moves: sunset in the corridor, the knock, the drip, the run) ---- */
const HC = withCuts({
  name: '度胸だめし', ch: 'ある日の放課後', bgm: 'dread',
  init(S) { S.tIn = at(S, 'L13', 0) - 0.3; S.tKnock = at(S, 'L14', 0) - 0.3; S.tCall = at(S, 'L15', 0) - 0.3; S.tQuiet = at(S, 'L16', 0) - 0.3; S.tTurn = at(S, 'L17', 0) - 0.3; S.tVoice = at(S, 'L18', 0) - 0.3; S.tRun = at(S, 'L18b', 0) - 0.3; S.tAfter = at(S, 'L18c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tAfter) { school(c, t, { night: true }); dim(c, 0.3, '#0c0c18'); for (let i = 0; i < 3; i++) kid(c, GIRLS[i], 60 + i * 30, 158, { k: 'af' + i, expr: 'sad', f: Math.floor(t * 3 + i) & 3 }); return { z: 1.03, fx: 120, fy: 110 }; }
    if (t > S.tRun) { R(c, 0, 0, W, H, '#5c4c48'); for (let i = 0; i < 8; i++) { const x = 40 + i * 30, y = 60 + i * 12; R(c, x, y, 30, 12, '#8c7c6c'); R(c, x, y, 30, 2, '#a8988c'); } const u = sg(t, S.tRun + 0.2, S.tRun + 2.4); kid(c, GIRLS[0], lerp(60, 280, u), lerp(70, 166, u), { k: 'rn', f: Math.floor(t * 8) & 3, expr: 'shock' }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tVoice) { toilet(c, t, { dark: true, drip: true, mark: true }); dim(c, 0.3, '#0c1018'); kid(c, GIRLS[0], 200, 156, { k: 'vc', expr: 'shock', flip: true }); glow(c, 242, 96, 30, 50, '#c81c2c', 0.2 + 0.1 * Math.sin(t * 6)); return { z: 1.06 + 0.06 * ss(sg(t, S.tVoice, S.tRun)), fx: 230, fy: 100, sx: t < S.tVoice + 0.4 ? Math.round(Math.sin(t * 60)) : 0 }; }
    if (t > S.tTurn) { toilet(c, t, { drip: true }); kid(c, GIRLS[0], 200, 156, { k: 'tn', flip: t > at(S, 'L17', 1) - 0.3, expr: 'smile' }); for (let i = 0; i < 2; i++) kid(c, GIRLS[i + 1], 30 + i * 22, 156, { k: 'tw' + i, arm: 'wave' }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tQuiet) { toilet(c, t, { drip: true }); kid(c, GIRLS[0], 212, 156, { k: 'qt', arm: 'fwd' }); E(c, 52, 122, 8, 3, DA('#8cc8f8', 0.4)); plate(c, 20, 40, 'ぽたり、ぽたり', '#c8e8f8'); return { z: 1.05, fx: 200, fy: 110 }; }
    if (t > S.tKnock) { toilet(c, t, { drip: true }); kid(c, GIRLS[0], 212, 156, { k: 'kn', arm: 'fwd', blink: 0 }); for (let i = 0; i < 2; i++) kid(c, GIRLS[i + 1], 30 + i * 22, 156, { k: 'kw' + i, expr: 'shock' }); knock(c, t, at(S, 'L14', 0), 236, 96); if (t > S.tCall) plate(c, 20, 40, '花子さん、遊びましょう', '#f8e8b0'); return { z: 1.04, fx: 200, fy: 110 }; }
    if (t > S.tIn) { corridor(c, t); for (let i = 0; i < 3; i++) kid(c, GIRLS[i], 100 + i * 30, 156, { k: 'jk' + i, arm: 'fwd', flip: i === 2 }); const h = Math.floor(t * 3) % 3; plate(c, 120, 40, ['グー', 'チョキ', 'パー'][h], '#f8e8b0'); return { z: 1.04, fx: 140, fy: 110 }; }
    corridor(c, t); const u = sg(t, at(S, 'L12', 1), S.tIn); for (let i = 0; i < 3; i++) kid(c, GIRLS[i], lerp(-20, 140, u) + i * 26, 156, { k: 'cr' + i, f: u < 1 ? Math.floor(t * 4 + i) & 3 : -1 }); plate(c, 20, 40, '度胸だめし', '#f8e8b0');
    return { z: 1.03, fx: 140, fy: 110 };
  }
}, [['V2', HCLOSE]]);

/* ---- HD: what happens next, school by school — pulled in, hide-and-seek forever, a white hand; the always-empty third stall; "no such girl" (moves: the shadow arm, the hand, the queue) ---- */
const HD = {
  name: '学校ごとの結末', ch: 'その先の話', bgm: 'dread',
  init(S) { S.tPull = at(S, 'L20', 0) - 0.3; S.tKnockBack = at(S, 'L20b', 0) - 0.3; S.tHide = at(S, 'L21', 0) - 0.3; S.tAns = at(S, 'L21b', 0) - 0.3; S.tHand = at(S, 'L22', 0) - 0.3; S.tNone = at(S, 'L22b', 0) - 0.3; S.tEmpty = at(S, 'L23', 0) - 0.3; S.tTeach = at(S, 'L23b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTeach) { corridor(c, t); person(c, TEACH, 200, 156, { k: 'tc', flip: true, arm: 'point' }); kid(c, GIRLS[3], 140, 158, { k: 'tq', expr: 'sad' }); plate(c, 20, 40, 'そんな子は、いない', '#f8e8b0'); return { z: 1.03, fx: 170, fy: 110 }; }
    if (t > S.tEmpty) { toilet(c, t, { mark: true }); for (let i = 0; i < 4; i++) kid(c, GIRLS[i], 20 + i * 22, 156, { k: 'q' + i }); plate(c, 20, 40, '3番目だけ、いつも空いている', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tNone) { R(c, 0, 0, W, H, '#140c18'); bigCap(c, '確かめた人は、いない', 84, 24, '#f8e8b0', sg(t, S.tNone + 0.2, S.tNone + 0.8)); return { z: 1.02, fx: 160, fy: 100 }; }
    if (t > S.tHand) { R(c, 0, 0, W, H, '#8c9ca4'); for (let y = 0; y < 150; y += 10) R(c, 0, y, W, 1, '#7c8c94'); E(c, 160, 130, 50, 16, '#e8ecf0'); E(c, 160, 128, 34, 9, '#5c6c74'); const u = eOut(sg(t, S.tHand + 0.5, S.tHand + 2)); R(c, 156, 128 - u * 40, 9, u * 40, '#f4f0ec'); for (let k = 0; k < 4; k++) R(c, 155 + k * 3, 122 - u * 40, 2, 8, '#f4f0ec'); dim(c, 0.2, '#0c1018'); return { z: 1.04, fx: 160, fy: 110 }; }
    if (t > S.tAns) { R(c, 0, 0, W, H, '#1c2028'); plate(c, 40, 50, '正しい答えは？', '#f8e8b0'); for (let i = 0; i < 6; i++) TX(c, '？', 60 + i * 36, 100 + (i % 2) * 14, '#e8c040', 16, '#000000'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tHide) { toilet(c, t, { dark: true }); for (let i = 0; i < 4; i++) { const x = 120 + i * 50; R(c, x, 48, 44, 96, '#d8c8b8'); } plate(c, 20, 40, 'かくれんぼ', '#f8e8b0'); plate(c, 20, 66, '見つかるまで、出られない', '#f8c8d8'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tKnockBack) { toilet(c, t, { dark: true, mark: true }); knock(c, t, S.tKnockBack + 0.4 + Math.floor((t - S.tKnockBack) / 1.6) * 1.6, 242, 96); return { z: 1.04, fx: 230, fy: 100 }; }
    if (t > S.tPull) { toilet(c, t, { dark: true, open: 2 }); const u = sg(t, S.tPull + 0.4, S.tPull + 2); kid(c, GIRLS[4], lerp(200, 236, u), 156, { k: 'pl', expr: 'shock', arm: 'up' }); c.save(); c.globalAlpha = 0.9; L(c, 256, 96, lerp(240, 226, u), 104, '#0c0c10', 4); c.restore(); dim(c, 0.6 * sg(t, S.tPull + 1.8, S.tKnockBack), '#06060a'); return { z: 1.04, fx: 230, fy: 100 }; }
    R(c, 0, 0, W, H, '#1c2028'); for (let i = 0; i < 3; i++) { R(c, 30 + i * 96, 50, 70, 80, '#c8c0b0'); R(c, 50 + i * 96, 90, 30, 40, '#c81c2c'); } plate(c, 60, 140, '学校によって、違う結末', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- HE: who was she? — the oldest wooden building, an air-raid siren of the past, question marks; school-trip night under the futons (moves: sepia, a flashlight under the covers) ---- */
const HE = {
  name: '花子さんの正体', ch: '正体', bgm: 'memory',
  init(S) { S.tStory = at(S, 'L24b', 0) - 0.3; S.tWho = at(S, 'L25', 0) - 0.3; S.tOld = at(S, 'L25b', 0) - 0.3; S.tCheck = at(S, 'L26', 0) - 0.3; S.tTrip = at(S, 'L26b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tTrip) { R(c, 0, 0, W, H, '#14182c'); R(c, 0, 120, W, 70, '#a89c74'); for (let x = 0; x < W; x += 40) R(c, x, 120, 1, 70, '#8c8060'); futon(c, 40, 140, 5); glow(c, 120, 128, 30, 14, '#f8f0c8', 0.4 + 0.1 * Math.sin(t * 5)); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tCheck) { R(c, 0, 0, W, H, '#1c2028'); const n = Math.floor(sg(t, S.tCheck, S.tTrip) * 16); for (let i = 0; i < n; i++) TX(c, '？', 20 + hash(i) * 280, 36 + hash(i * 3) * 100, ['#e8c040', '#e86c6c', '#c8c8e8'][i % 3], 16, '#000000'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tOld) { duskSky(c); R(c, 40, 60, 240, 90, '#8c6c4c'); for (let x = 40; x < 280; x += 8) R(c, x, 60, 1, 90, '#7c5c3c'); PF(c, [30, 62, 160, 36, 290, 62], '#4c4c54'); for (let k = 0; k < 6; k++) R(c, 56 + k * 38, 76, 22, 26, '#5c6c7c'); R(c, 0, 150, W, 40, '#a88c64'); plate(c, 30, 40, 'いちばん古い校舎', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tWho) { R(c, 0, 0, W, H, '#3c3428'); const k = Math.floor(sg(t, S.tWho, at(S, 'L25', 2)) * 2.99); const lbl = ['この学校で亡くなった女の子', 'かくれんぼの途中で、いなくなった子', '空襲のとき、隠れていた子']; for (let i = 0; i <= Math.min(2, k); i++) plate(c, 20, 40 + i * 30, lbl[i], '#f8e8b0'); c.save(); c.globalAlpha = 0.6; hanako(c, 250, 156, { back: true }); c.restore(); c.save(); c.globalAlpha = 0.35; c.fillStyle = '#704c1c'; c.fillRect(0, 0, W, H); c.restore(); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#1c2028'); for (let i = 0; i < 5; i++) { const x = 30 + i * 60; R(c, x, 70, 40, 50, '#c8c0b0'); c.save(); c.globalAlpha = 0.7; hanako(c, x + 20, 118, { s: 0.6, back: i % 2 === 1 }); c.restore(); }
    if (t > S.tStory) plate(c, 40, 40, '学校の数だけ、花子さんがいる', '#f8e8b0'); else bigCap(c, '正体は？', 40, 32, '#f8e8b0', sg(t, 0.3, 0.9));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- HF: the turning point — a different face: comforting a crying girl, leading a lost first-grader, playing with a lonely child, then gone (moves: she appears softly, a hand held, she fades) ---- */
const HF = {
  name: 'もうひとつの顔', ch: 'もうひとつの顔', bgm: 'memory',
  init(S) { S.tCry = at(S, 'L28', 0) - 0.3; S.tLost = at(S, 'L29', 0) - 0.3; S.tGone = at(S, 'L29b', 0) - 0.3; S.tPlay = at(S, 'L30', 0) - 0.3; S.tKind = at(S, 'L31', 0) - 0.3; S.tMix = at(S, 'L31b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMix) { R(c, 0, 0, W, H, '#2c2838'); for (let i = 0; i < 8; i++) { const ph = fr(t * 0.2 + i / 8); c.save(); c.globalAlpha = 0.6 * Math.sin(ph * Math.PI); TX(c, i % 3 ? '？' : '♪', 30 + i * 36, 120 - ph * 70, i % 3 ? '#c8c8e8' : '#f8c8d8', 16, null); c.restore(); } hanako(c, 160, 160, { s: 1.6, arm: 'wave' }); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tKind) { R(c, 0, 0, W, H, '#3c3448'); glow(c, 160, 90, 120, 70, '#f8c8d8', 0.25); blit(c, hanakoFace({ smile: true, blink: blinkOf(t, 4) }), 160, 90, 24, 24, { s: 2.6 }); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tPlay) { school(c, t, {}); R(c, 0, 130, W, 60, '#c8a878'); for (let i = 0; i < 6; i++) E(c, 40 + i * 50, 150, 8, 3, '#8c7c5c'); const u = fr(t * 0.5); kid(c, GIRLS[3], 140 + Math.sin(u * TAU) * 10, 156, { k: 'pl', f: Math.floor(t * 4) & 3, expr: 'smile' }); hanako(c, 180 + Math.sin(u * TAU + 1) * 10, 154, { f: Math.floor(t * 4) & 3, arm: 'wave' }); E(c, 160 + Math.cos(t * 3) * 20, 110 - Math.abs(Math.sin(t * 3)) * 30, 5, 5, '#e84c4c'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tGone) { corridor(c, t); kid(c, KIDB, 140, 158, { k: 'gn', flip: true, expr: 'shock' }); c.save(); c.globalAlpha = 1 - sg(t, S.tGone, S.tGone + 1.5); hanako(c, 170, 154, {}); c.restore(); return { z: 1.03, fx: 150, fy: 110 }; }
    if (t > S.tLost) { corridor(c, t); const u = sg(t, S.tLost, S.tGone); hanako(c, lerp(40, 200, u), 154, { f: Math.floor(t * 3) & 3, arm: 'reach', flip: false }); kid(c, { ...KIDB, id: 'kb1' }, lerp(30, 190, u) - 10, 158, { k: 'ls', f: Math.floor(t * 3 + 1) & 3, s: 0.9 }); plate(c, 20, 40, '迷子の新入生', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tCry) { toilet(c, t, {}); kid(c, GIRLS[2], 120, 156, { k: 'cr', expr: 'sad', blink: 2 }); for (let i = 0; i < 3; i++) { const ph = fr(t * 0.8 + i / 3); E(c, 118 + (i - 1) * 4, 112 + ph * 8, 1, 1.5, '#8cc8f8'); } c.save(); c.globalAlpha = sg(t, S.tCry + 0.2, S.tCry + 1); hanako(c, 150, 154, { arm: 'reach', flip: true }); c.restore(); return { z: 1.04, fx: 140, fy: 110 }; }
    R(c, 0, 0, W, H, '#1c1830'); glow(c, 160, 100, 140, 70, '#5c4c7c', 0.4); bigCap(c, 'ところが――', 80, 32, '#f8e8b0', sg(t, 0.3, 1.0)); c.save(); c.globalAlpha = 0.6; hanako(c, 250, 156, { back: true }); c.restore();
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- HG: why the toilet, why "Hanako" — other rooms, the quiet stall, the evening light fading, an ordinary name (moves: the light reddens and goes) ---- */
const HG = {
  name: 'なぜトイレなのか', ch: 'なぜトイレなのか', bgm: 'eerie',
  init(S) { S.tRooms = at(S, 'L32b', 0) - 0.3; S.tAlone = at(S, 'L33', 0) - 0.3; S.tFar = at(S, 'L34', 0) - 0.3; S.tDusk = at(S, 'L34b', 0) - 0.3; S.tName = at(S, 'L35', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tName) { R(c, 0, 0, W, H, '#2c2838'); const names = ['はなこ', 'はなこ', 'はなこ']; for (let i = 0; i < 3; i++) { R(c, 30 + i * 96, 60, 70, 50, '#f4f0e4'); TX(c, names[i], 42 + i * 96, 76, '#2c2c3c', 16, null); } plate(c, 40, 130, 'どこにでも、いそうな女の子', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tDusk) { toilet(c, t, { drip: true }); const k = sg(t, S.tDusk, S.tName); c.save(); c.globalAlpha = 0.5 * k; c.fillStyle = '#c84c2c'; c.fillRect(0, 0, W, H); c.restore(); dim(c, 0.6 * sg(t, S.tDusk + 3, S.tName), '#0c0c18'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tFar) { corridor(c, t, { dark: true }); R(c, 260, 40, 50, 100, '#2c2830'); R(c, 266, 50, 38, 90, '#3c3440'); plate(c, 272, 36, 'WC', '#f8f8f0', '#2c3c6c'); return { z: 1.04 + 0.05 * ss(sg(t, S.tFar, S.tDusk)), fx: 280, fy: 100 }; }
    if (t > S.tAlone) { toilet(c, t, { drip: true }); kid(c, GIRLS[4], 80, 156, { k: 'al' }); for (let i = 0; i < 4; i++) { const ph = fr(t * 0.4 + i / 4); c.save(); c.globalAlpha = 0.5 * (1 - ph); TX(c, '…', 260 + i * 6, 70 - ph * 10, '#5c6c74', 16, null); c.restore(); } return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tRooms) { R(c, 0, 0, W, H, '#1c2028'); const rooms = [['理科室', '#3c6c5c'], ['音楽室', '#5c4c7c'], ['体育館', '#7c5c3c'], ['トイレ', '#c81c2c']]; rooms.forEach(([s, col], i) => { R(c, 20 + i * 74, 60, 64, 60, col); plate(c, 26 + i * 74, 74, s, '#f8f8f0', '#000000'); }); if (t > at(S, 'L32b', 1) - 0.3) ER(c, 254, 90, 40, 40, '#f8e070'); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#0c1014'); bigCap(c, 'なぜ、トイレ？', 70, 32, '#f8e8b0', sg(t, 0.3, 0.9));
    return { z: 1.02, fx: 160, fy: 100 };
  }
};

/* ---- HH: variants and today — Taro-kun in the boys' room, door 4, knock 4; bright new toilets; kids still know; you knock, you decide (moves: numbers flip, lights brighten) ---- */
const HH = {
  name: '花子さんは消えない', ch: '今も', bgm: 'memory',
  init(S) { S.tNew = at(S, 'L37', 0) - 0.3; S.tStill = at(S, 'L38', 0) - 0.3; S.tNow = at(S, 'L38b', 0) - 0.3; S.tCall = at(S, 'L39', 0) - 0.3; S.tYou = at(S, 'L40', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tYou) { toilet(c, t, { mark: true }); kid(c, GIRLS[1], 210, 156, { k: 'yu', arm: 'fwd', blink: blinkOf(t, 3) }); const k = Math.floor(t * 1.2) % 2; if (k) knock(c, t, Math.floor(t * 1.2) / 1.2, 236, 96); return { z: 1.04, fx: 220, fy: 110 }; }
    if (t > S.tCall) { R(c, 0, 0, W, H, '#1c2028'); plate(c, 40, 50, '呼ばなければ、出てこない', '#f8e8b0'); if (t > at(S, 'L39b', 0, 1e9) - 0.3) plate(c, 70, 90, '呼べば、出てくるかもしれない', '#f8c8d8'); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tNow) { classroom2(c, t); for (let i = 0; i < 4; i++) kid(c, { ...GIRLS[i], id: 'nw' + i }, 60 + i * 64, 156, { k: 'nw' + i, flip: i % 2 === 1 }); R(c, 140, 70, 40, 30, '#3c3c44'); R(c, 144, 74, 32, 22, '#8cc8e8'); hanako(c, 160, 96, { s: 0.45 }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tStill) { toilet(c, t, { mark: true }); c.save(); c.globalAlpha = 0.35 + 0.15 * Math.sin(t * 2); hanako(c, 242, 140, { back: true }); c.restore(); return { z: 1.04, fx: 230, fy: 100 }; }
    if (t > S.tNew) { R(c, 0, 0, W, H, '#f4f8fc'); for (let y = 0; y < 150; y += 12) R(c, 0, y, W, 1, '#e4ecf4'); R(c, 0, 140, W, 50, '#d8e0e8'); for (let i = 0; i < 4; i++) { R(c, 120 + i * 50, 48, 44, 96, '#a8c8e8'); E(c, 156 + i * 50, 96, 2, 2, '#5c7c9c'); } R(c, 14, 30, 90, 50, '#c8e8f8'); glow(c, 160, 20, 160, 20, '#ffffff', 0.5); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#1c2028'); R(c, 30, 50, 120, 90, '#a8c8d8'); R(c, 170, 50, 120, 90, '#e8c8d0'); TX(c, '男子', 72, 56, '#2c3c6c', 16, null); TX(c, '女子', 212, 56, '#8c1c2c', 16, null); kid(c, KIDB, 90, 136, { k: 'tr', s: 0.9 }); hanako(c, 230, 134, { s: 0.9 });
    const k = Math.floor(sg(t, at(S, 'L36', 1), at(S, 'L36', 3)) * 2.99); if (t > at(S, 'L36', 0) - 0.3) plate(c, 100, 104, '太郎くん', '#f8e8b0'); if (k >= 1) plate(c, 170, 34, '4番目の扉？', '#f8e8b0'); if (k >= 2) plate(c, 30, 34, 'ノックは4回？', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 100 };
  }
};
function classroom2(c, t) { R(c, 0, 0, W, H, '#c8b494'); R(c, 0, 0, W, 30, '#a89474'); R(c, 40, 34, 160, 56, '#2c4c3c'); R(c, 38, 90, 164, 4, '#8c6c4c'); for (let i = 0; i < 3; i++) { R(c, 230 + i * 30, 36, 24, 50, '#c8dce8'); } R(c, 0, 128, W, 60, '#a8845c'); }

/* ---- HI: ending — the third door, slightly open (moves: it creaks, a red hem) ---- */
const HI = withCuts({
  name: '少しだけ開いた扉', ch: 'おわりに', bgm: 'requiem',
  init(S) { S.tAsk = at(S, 'L42', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    const aj = 0.15 + 0.05 * Math.sin(t * 0.8); toilet(c, t, { dark: t > S.tAsk, drip: true, ajar: aj }); R(c, 222, 120, 6, 24, '#c81c2c'); dim(c, 0.2, '#0c1018');
    return { z: 1.04 + 0.04 * ss(sg(t, 0, 10)), fx: 230, fy: 100 };
  }
}, [['V3', HCLOSE]]);

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '花子さん、遊びましょう', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { toilet(c, t, { drip: true, mark: true }); kid(c, GIRLS[0], 210, 156, { k: 's1', arm: 'fwd' }); knock(c, t, 0.4, 236, 96); c.save(); c.globalAlpha = 0.85; R(c, 0, 34, W, 44, '#000000'); c.restore(); bigCap(c, '花子さん、遊びましょう', 40, 32, '#f8e8b0', sg(t, 0.1, 0.6)); return { z: 1.04, fx: 220, fy: 100 }; } };
const SS2 = { name: '扉に手を', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { toilet(c, t, { dark: true, drip: true, mark: true, ajar: 0.05 + 0.1 * sg(t, at(S, 'S2', 1), S.dur) }); kid(c, GIRLS[0], 222, 156, { k: 's2', arm: 'fwd' }); return { z: 1.06, fx: 230, fy: 100 }; } };
