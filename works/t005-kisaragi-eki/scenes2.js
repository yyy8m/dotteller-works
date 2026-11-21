/* ================= 都市伝説 #005 きさらぎ駅: scenes ================= */
const OCLOSE = (c, t) => closeUp(c, t, onnaFace({ scared: true, blink: blinkOf(t, 4) }), { bg: ['#0c0c18', '#2c2c48'], spk: 'onna' });
const RCLOSE = (c, t) => closeUp(c, t, roujinFace({ blink: blinkOf(t, 6) }), { bg: ['#04040c', '#1c1c2c'], glow: '#3c3c5c', spk: 'roujin' });
const DCLOSE = (c, t) => closeUp(c, t, otokoFace({ blink: blinkOf(t, 9) }), { bg: ['#0c0c10', '#2c2430'], spk: 'otoko' });
const P0 = [['名無し', '寝過ごしただけでは？'], ['名無し', '駅の名前は？']];
function walker(c, t, x, y = 150, o = {}) { person(c, OL, x, y, { k: 'w' + (o.k || ''), f: o.stop ? -1 : Math.floor(t * 4) & 3, expr: o.expr || 'normal', flip: !!o.flip }); if (o.phone) { R(c, x + 4, y - 30, 4, 6, '#a8d8f8'); glow(c, x + 6, y - 28, 10, 10, '#a8d8f8', 0.3); } }
function notes(c, t, x, y) { const a = 0.5 + 0.5 * Math.sin(t * 3.5), b = 0.5 + 0.5 * Math.sin(t * 3.5 + 2); c.save(); c.globalAlpha = a; TX(c, 'どん', x, y, '#e8b8b8', 16, null); c.restore(); c.save(); c.globalAlpha = b; TX(c, 'しゃらん', x + 70, y - 24, '#c8c8f0', 16, null); c.restore(); }

/* ---- YZ: cold open — the last train, she dozes; 20 minutes without a stop; it stops; the sign: きさらぎ (moves: straps sway, lights pass then stop passing, the sign) ---- */
const YZ = withCuts({
  name: '止まらない電車', ch: '夜の電車', bgm: 'eerie',
  init(S) { S.tLong = at(S, 'C1', 0) - 0.3; S.tStop = at(S, 'C2', 0) - 0.3; S.tSign = at(S, 'C2', 2) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tStop) { kisaragi(c, t, { sign: t > S.tSign }); walker(c, t, 100, 150, { stop: true, k: 'z1' }); return { z: 1.04 + (t > S.tSign ? 0.2 * ss(sg(t, S.tSign, S.tSign + 2)) : 0), fx: t > S.tSign ? 183 : 140, fy: 100 }; }
    trainInside(c, t, { lights: t < S.tLong }); person(c, OL, 160, 150, { k: 'zs', blink: 2 }); if (t > S.tLong) { const m = 12 + Math.floor(sg(t, S.tLong, S.tStop) * 9); plate(c, 120, 40, m + '分　止まらない', '#f8e8b0'); }
    return { z: 1.03, fx: 160, fy: 100, sx: Math.round(Math.sin(t * 9) * 0.6) };
  }
}, [['M1', OCLOSE], ['V0', OCLOSE]]);

/* ---- YA: born on the internet — winter 2004, an anonymous board; she writes from the train; doubters reply; the night unfolds post by post (moves: posts appear, a cursor blinks, readers lean in) ---- */
const YA = {
  name: '掲示板', ch: '2004年の書き込み', bgm: 'memory',
  init(S) { S.tBoard = at(S, 'L1b', 0) - 0.3; S.tTime = at(S, 'L1bx', 0) - 0.3; S.tHer = at(S, 'L2', 0) - 0.3; S.tReply = at(S, 'L2b', 0) - 0.3; S.tSleep = at(S, 'L2bx', 0) - 0.3; S.tNight = at(S, 'L3', 0) - 0.3; S.tWords = at(S, 'L3x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWords) { board(c, t, [['名無し', 'がんばれ'], ['名無し', '落ち着いて'], ['名無し', 'ここにいるぞ']], { cursor: true }); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tNight) { R(c, 0, 0, W, H, '#0c0c14'); for (let i = 0; i < 4; i++) { const x = 30 + i * 76; R(c, x, 70, 56, 40, '#c8c8c0'); R(c, x + 4, 74, 48, 32, '#efefef'); glow(c, x + 28, 90, 40, 30, '#c8d8f8', 0.2); person(c, READERS[i], x + 28, 166, { k: 'rn' + i, blink: blinkOf(t, i + 2) }); } plate(c, 20, 40, 'すぐそばで見ているように', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    const posts = []; if (t > S.tHer) posts.push(['電車の人', '電車の様子がおかしい', true]); if (t > S.tReply) posts.push(P0[1]); if (t > S.tSleep) posts.push(P0[0]); if (t > S.tTime) posts.unshift(['', '2004年　23:14', false]);
    if (t > S.tBoard) { board(c, t, posts, { cursor: true }); return { z: 1.03, fx: 160, fy: 90 }; }
    R(c, 0, 0, W, H, '#141420'); bigCap(c, '違う生まれ方', 60, 32, '#f8e8b0', sg(t, 0.3, 0.9)); for (let i = 0; i < 3; i++) TX(c, ['学校の怪談', '昔話', '？'][i], 70 + i * 90, 126, '#8c8cac', 16, null);
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- YB: the station — no staff, no gate, no houses; one lamp, a bench, an unreadable timetable; the phone works, the map has no such station; family: never heard of it; police: a prank; taxis can't find it; walk back along the tracks (moves: grass in the wind, the lamp flickers, the phone glows) ---- */
const YB = {
  name: '無人の駅', ch: 'きさらぎ駅', bgm: 'dread',
  init(S) { S.tLeave = at(S, 'L4x', 0) - 0.3; S.tNone = at(S, 'L4b', 0) - 0.3; S.tLamp = at(S, 'L4bx', 0) - 0.3; S.tMap = at(S, 'L5', 0) - 0.3; S.tFam = at(S, 'L5b', 0) - 0.3; S.tVoice = at(S, 'L5bx', 0) - 0.3; S.tAdv = at(S, 'L6', 0) - 0.3; S.tTaxi = at(S, 'L6x', 0) - 0.3; S.tWalk = at(S, 'L6b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWalk) { trackWalk(c, t, { v: 40 }); walker(c, t, lerp(60, 200, sg(t, S.tWalk, S.dur)), 150, { k: 'b1', phone: true }); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tTaxi) { kisaragi(c, t, {}); walker(c, t, 110, 150, { stop: true, phone: true, k: 'b2' }); plate(c, 20, 40, 'タクシーも、来られない', '#f8e8b0'); return { z: 1.04, fx: 140, fy: 110 }; }
    if (t > S.tAdv) { board(c, t, [['名無し', '線路を歩いて戻れ'], ['名無し', 'ひとつ前の駅まで'], ['電車の人', 'やってみます', true]]); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tVoice) { R(c, 0, 0, W, H, '#0c0c18'); keitai(c, 100, 60, t); TX(c, '……もしもし？', 150, 60, '#c8d8f8', 16, null); TX(c, 'いつもの声', 150, 90, '#8c8cac', 16, null); return { z: 1.06, fx: 140, fy: 90 }; }
    if (t > S.tFam) { R(c, 0, 0, W, H, '#0c0c18'); keitai(c, 70, 60, t); plate(c, 130, 50, 'そんな駅、知らない', '#c8d8f8'); if (t > at(S, 'L5b', 2) - 0.3) plate(c, 130, 90, 'いたずらでしょう', '#c8c0d0'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tMap) { R(c, 0, 0, W, H, '#c8d8c0'); for (let i = 0; i < 6; i++) L(c, 0, 30 + i * 26, W, 40 + i * 20, '#a8b8a0'); L(c, 20, 140, 300, 50, '#3c3c3c', 3); for (let i = 0; i < 4; i++) { const x = 40 + i * 76, y = 134 - i * 26; E(c, x, y, 4, 4, '#f4f4f0'); ER(c, x, y, 4, 4, '#3c3c3c'); } TX(c, '？', 170, 70, '#c81c2c', 16, null); plate(c, 20, 40, '地図に、ない', '#5c3c2c', '#f8f0e0'); return { z: 1.04, fx: 170, fy: 90 }; }
    kisaragi(c, t, {}); if (t > S.tLeave && t < S.tNone) { const u = sg(t, S.tLeave, S.tNone - 0.5); R(c, lerp(-20, -400, eIn(u)), 96, 300, 40, '#c8c8c0'); for (let k = 0; k < 8; k++) R(c, lerp(-20, -400, eIn(u)) + 10 + k * 36, 104, 22, 14, '#f8e0a0'); } walker(c, t, lerp(80, 120, sg(t, 0, S.tNone)), 150, { k: 'b3', f: -1 });
    if (t > S.tLamp) { R(c, 236, 92, 30, 22, '#c8c0a0'); for (let k = 0; k < 4; k++) R(c, 239, 96 + k * 4, 24, 1, '#8c8470'); plate(c, 20, 40, '明かりは、ひとつきり', '#f8e8b0'); } else if (t > S.tNone) plate(c, 20, 40, '駅員も、家の明かりもない', '#f8e8b0');
    return { z: 1.03, fx: 150, fy: 100 };
  }
};

/* ---- YC: the drums and bells — walking the tracks; どん、しゃらん; not festival season; she doesn't turn; a voice behind: "線路の上を歩いたら、危ないよ"; a one-legged old man; gone (moves: the notes float, the footsteps, he fades) ---- */
const YC = withCuts({
  name: '太鼓と鈴', ch: '線路の上', bgm: 'dread',
  init(S) { S.tSound = at(S, 'L7b', 0) - 0.3; S.tWinter = at(S, 'L7c', 0) - 0.3; S.tFollow = at(S, 'L8', 0) - 0.3; S.tVoice = at(S, 'L9', 0) - 0.3; S.tDont = at(S, 'L8x', 0) - 0.3; S.tTurn = at(S, 'L9b', 0) - 0.3; S.tGone = at(S, 'L9c', 0) - 0.3; S.tAsk = at(S, 'L9cx', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tAsk) { board(c, t, [['電車の人', '片足のおじいさんが', true], ['電車の人', '消えた', true], ['名無し', '……'], ['名無し', '……']]); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tGone) { trackWalk(c, t, {}); walker(c, t, 200, 150, { stop: true, expr: 'shock', flip: true, k: 'c1' }); oldMan(c, 90, 150, { a: 1 - sg(t, S.tGone + 1, S.tGone + 2.5) }); return { z: 1.05, fx: 150, fy: 110 }; }
    if (t > S.tTurn) { trackWalk(c, t, {}); walker(c, t, 200, 150, { stop: true, expr: 'shock', flip: true, k: 'c2' }); oldMan(c, 90, 150, {}); return { z: 1.1 + 0.1 * ss(sg(t, S.tTurn, S.tGone)), fx: 110, fy: 110 }; }
    if (t > S.tVoice) { trackWalk(c, t, {}); walker(c, t, 200, 150, { stop: true, expr: 'shock', k: 'c3' }); return { z: 1.06, fx: 200, fy: 110 }; }
    if (t > S.tDont) { board(c, t, [['電車の人', 'ずっと、ついてくる', true], ['名無し', '振り向くな'], ['名無し', '振り向くな']]); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tFollow) { trackWalk(c, t, { v: 30 }); walker(c, t, 200, 150, { k: 'c4', expr: 'shock' }); notes(c, t, 80, 90); return { z: 1.04, fx: 170, fy: 110 }; }
    if (t > S.tWinter) { trackWalk(c, t, {}); for (let i = 0; i < 30; i++) { const y = fr(t * 0.3 + i * 0.13) * 180; P(c, (i * 47) % W, y, '#e8ecf0'); } walker(c, t, 200, 150, { k: 'c5', stop: true }); plate(c, 20, 40, '真冬の、山の中', '#c8d8f0'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tSound) { trackWalk(c, t, { v: 20 }); walker(c, t, 200, 150, { k: 'c6', stop: true }); notes(c, t, 60, 90); return { z: 1.03, fx: 160, fy: 110 }; }
    trackWalk(c, t, { v: 40 }); walker(c, t, 160, 150, { k: 'c7', phone: true });
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V1', RCLOSE]]);

/* ---- YD: the tunnel — near tears she walks on; a tunnel mouth; "be careful"; only the phone's light inside (moves: the mouth looms, the tiny light moves in the black) ---- */
const YD = {
  name: 'トンネル', ch: 'トンネル', bgm: 'dread',
  init(S) { S.tMouth = at(S, 'L10', 1) - 0.3; S.tIn = at(S, 'L10b', 2) - 0.3; S.tDark = at(S, 'L10bx', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDark) { R(c, 0, 0, W, H, '#06060a'); const x = lerp(60, 260, sg(t, S.tDark, S.dur)); for (let i = 0; i < 8; i++) { const ax = ((i * 50 - t * 15) % 400 + 400) % 400 - 40; E(c, ax, 104, 30, 60, '#14141c'); E(c, ax, 104, 26, 56, '#06060a'); } R(c, 0, 150, W, 40, '#0c0c10'); glow(c, x, 110, 60, 50, '#a8d8f8', 0.12); glow(c, x, 110, 30, 30, '#a8d8f8', 0.25); R(c, x - 2, 106, 4, 6, '#a8d8f8'); for (let i = 0; i < 6; i++) { const rx = ((i * 60 - t * 20) % 360 + 360) % 360; R(c, rx, 150, 10, 3, '#14100c'); } return { z: 1.03, fx: 160, fy: 110 }; }
    trackWalk(c, t, { tunnel: lerp(220, 120, sg(t, S.tMouth, S.tIn)) }); walker(c, t, t > S.tIn ? lerp(110, 175, sg(t, S.tIn, S.tDark)) : 100, 150, { k: 'd1', phone: true, stop: t < S.tIn }); if (t > S.tMouth && t < S.tIn) plate(c, 20, 40, '気をつけて', '#f8e8b0');
    return { z: 1.03 + 0.06 * ss(sg(t, S.tMouth, S.tDark)), fx: 170, fy: 110 };
  }
};

/* ---- YE: the turning point — out of the tunnel, a man by a car: "駅まで、送りましょうか"; she's saved; someone writes "don't"; the car goes into the mountains; he won't answer, mutters; the battery is nearly gone (moves: headlights, trees streaming, battery bar shrinking) ---- */
const YE = withCuts({
  name: '親切な男', ch: '親切な男', bgm: 'pulse',
  init(S) { S.tCar = at(S, 'L11b', 0) - 0.3; S.tSaved = at(S, 'L12', 0) - 0.3; S.tTired = at(S, 'L12x', 0) - 0.3; S.tDont = at(S, 'L12b', 0) - 0.3; S.tGo = at(S, 'L13', 0) - 0.3; S.tMtn = at(S, 'L13b', 0) - 0.3; S.tRelief = at(S, 'L13x', 0) - 0.3; S.tDark = at(S, 'L13bx', 0) - 0.3; S.tSilent = at(S, 'L14', 0) - 0.3; S.tMutter = at(S, 'L14x', 0) - 0.3; S.tBat = at(S, 'L14b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBat) { R(c, 0, 0, W, H, '#06060c'); keitai(c, 140, 50, t, { bat: 0.15 + 0.05 * Math.sin(t * 3) }); TX(c, '逃げようと思う', 110, 110, '#c8d8f8', 16, null); return { z: 1.08, fx: 150, fy: 80 }; }
    if (t > S.tSilent) { mountainRoad(c, t); oldCar(c, 120, 156, { col: '#3c3c44', head: true, tail: true }); inCar(c, DRIVER, 120, 156, 1, { k: 'e1' }); inCar(c, OL, 120, 156, 0, { k: 'e2', expr: 'shock' }); if (t > S.tMutter && Math.sin(t * 3) > 0) plate(c, 150, 70, '……………', '#8c8cac'); return { z: 1.1, fx: 160, fy: 130 }; }
    if (t > S.tMtn) { mountainRoad(c, t); oldCar(c, 120, 156, { col: '#3c3c44', head: true, tail: true }); inCar(c, DRIVER, 120, 156, 1, { k: 'e3' }); inCar(c, OL, 120, 156, 0, { k: 'e4' }); if (t > S.tDark) plate(c, 20, 40, '街の明かりは、ひとつもない', '#c8c0d0'); else plate(c, 20, 40, '駅とは反対の、山の奥へ', '#c8c0d0'); return { z: 1.04, fx: 160, fy: 120 }; }
    if (t > S.tRelief) { R(c, 0, 0, W, H, '#04040c'); R(c, 0, 128, W, 62, '#1c1c1c'); oldCar(c, 120, 156, { col: '#3c3c44', head: true, tail: true }); inCar(c, DRIVER, 120, 156, 1, { k: 'rl1' }); inCar(c, OL, 120, 156, 0, { k: 'rl2', expr: 'smile' }); plate(c, 20, 40, 'これで、帰れる', '#5c3c2c', '#f8f0e0'); return { z: 1.06, fx: 160, fy: 130 }; }
    if (t > S.tGo) { R(c, 0, 0, W, H, '#04040c'); R(c, 0, 128, W, 62, '#1c1c1c'); const x = lerp(60, 200, sg(t, S.tGo, S.tMtn)); oldCar(c, x, 156, { col: '#3c3c44', head: true, tail: true }); return { z: 1.03, fx: 160, fy: 120 }; }
    if (t > S.tDont) { board(c, t, [['電車の人', '親切な人に会えた', true], ['電車の人', '乗せてもらう', true], ['名無し', '乗るな'], ['名無し', '乗るな']]); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tSaved) { trackWalk(c, t, {}); R(c, 0, 0, 80, 150, '#000000'); oldCar(c, 150, 156, { col: '#3c3c44', head: true }); person(c, DRIVER, 250, 150, { k: 'e5', expr: 'smile', flip: true }); walker(c, t, 120, 150, { stop: true, k: 'e6', expr: t > S.tTired ? 'sad' : 'smile' }); plate(c, 20, 40, t > S.tTired ? 'もう、くたくた' : '助かった', '#5c3c2c', '#f8f0e0'); return { z: 1.04, fx: 180, fy: 110 }; }
    if (t > S.tCar) { trackWalk(c, t, {}); R(c, 0, 0, 80, 150, '#000000'); oldCar(c, 150, 156, { col: '#3c3c44', head: true }); person(c, DRIVER, 250, 150, { k: 'e7', expr: 'smile', flip: true }); walker(c, t, 100, 150, { stop: true, k: 'e8' }); return { z: 1.05, fx: 200, fy: 110 }; }
    trackWalk(c, t, {}); R(c, 0, 0, 80, 150, '#000000'); walker(c, t, lerp(250, 280, sg(t, 0, S.tCar)), 150, { k: 'e9', phone: true }); bigCap(c, 'ところが', 60, 32, '#f8e8b0', sg(t, 0.4, 1));
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['V2', DCLOSE]]);

/* ---- YF: the silence — "そして。"; a long pause; the board waits: hello? are you there? morning comes, the next day (moves: the cursor blinks alone, the clock runs, posts pile up unanswered) ---- */
const YF = {
  name: '途切れた書き込み', ch: 'それきり', bgm: 'requiem',
  init(S) { S.tNever = at(S, 'L15b', 0) - 0.3; S.tCall = at(S, 'L15bx', 0) - 0.3; S.tYears = at(S, 'L15c', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tYears) { kisaragi(c, t, {}); dim(c, 0.5); for (let i = 0; i < 4; i++) { R(c, 30 + i * 72, 40, 56, 30, '#c8c8c0'); R(c, 34 + i * 72, 44, 48, 22, '#efefef'); } plate(c, 60, 136, '今も、読まれ続けている', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tCall) { const n = Math.min(4, 1 + Math.floor(sg(t, S.tCall, S.dur - 1) * 4)); const ps = [['名無し', 'おーい'], ['名無し', '大丈夫か？'], ['名無し', '朝になったぞ'], ['名無し', '返事してくれ']].slice(0, n); board(c, t, ps, { cursor: true }); return { z: 1.03, fx: 160, fy: 90 }; }
    board(c, t, [['電車の人', '逃げようと思う', true]], { cursor: true }); if (t > S.tNever) dim(c, 0.3 * sg(t, S.tNever, S.tNever + 2));
    return { z: 1.04 + 0.06 * ss(sg(t, 0, S.dur)), fx: 160, fy: 80 };
  }
};

/* ---- YG: what was it? — no such station anywhere; made up, or true; more posts of stations that aren't on maps; "異界駅"; the neighbours かたす and やみ; years later someone claims to be her; no way to check (moves: signs line up, a map with question marks) ---- */
const YG = {
  name: '異界の駅', ch: '異界の駅', bgm: 'memory',
  init(S) { S.tNot = at(S, 'L16x', 0) - 0.3; S.tView = at(S, 'L16b', 0) - 0.3; S.tMore = at(S, 'L17', 0) - 0.3; S.tCont = at(S, 'L17x', 0) - 0.3; S.tIkai = at(S, 'L17b', 0) - 0.3; S.tNext = at(S, 'L18', 0) - 0.3; S.tBack = at(S, 'L18b', 0) - 0.3; S.tCheck = at(S, 'L18c', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCheck) { R(c, 0, 0, W, H, '#141420'); for (let i = 0; i < 3; i++) TX(c, '?', 80 + i * 80, 90 + Math.sin(t * 2 + i) * 6, '#8c8cac', 16, null); plate(c, 60, 130, '確かめる方法は、ない', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tBack) { board(c, t, [['名無し', '7年たって、', true], ['名無し', '帰ってきました', true]], { cursor: true }); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tNext) { R(c, 0, 0, W, H, '#0c0c18'); R(c, 20, 110, 280, 3, '#8c8c94'); const sg_ = [['かたす', 60], ['きさらぎ', 160], ['やみ', 260]]; sg_.forEach(([n, x], i) => { R(c, x - 40, 60, 80, 26, '#e8e4d8'); R(c, x - 40, 60, 80, 3, '#2c4c8c'); TX(c, n, x - n.length * 8, 66, '#1c1c1c', 16, null); E(c, x, 111, 4, 4, i === 1 ? '#c81c2c' : '#f4f4f0'); }); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tIkai) { R(c, 0, 0, W, H, '#0c0c18'); bigCap(c, '異界の駅', 50, 32, '#c8c0f0', sg(t, S.tIkai + 0.4, S.tIkai + 1)); for (let i = 0; i < 4; i++) { const x = 20 + i * 76; R(c, x, 128, 64, 20, '#c8c4b8'); TX(c, '？？', x + 16, 130, '#2c2c2c', 16, null); } return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tMore) { const n = Math.min(4, 1 + Math.floor(sg(t, S.tMore, S.tIkai) * 4)); board(c, t, [['名無し', '知らない駅に着いた'], ['名無し', '地図にない駅で'], ['名無し', '降りてしまった'], ['名無し', '前にもあった話']].slice(0, n)); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tView) { R(c, 0, 0, W, H, '#141420'); plate(c, 30, 60, '作り話だ', '#c8c0d0'); plate(c, 170, 100, '本当にあった', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tNot) { R(c, 0, 0, W, H, '#c8d8c0'); for (let i = 0; i < 6; i++) L(c, 0, 30 + i * 26, W, 40 + i * 20, '#a8b8a0'); L(c, 20, 140, 300, 50, '#3c3c3c', 3); for (let i = 0; i < 4; i++) { const x = 40 + i * 76, y = 134 - i * 26; E(c, x, y, 4, 4, '#f4f4f0'); ER(c, x, y, 4, 4, '#3c3c3c'); } TX(c, '？', 170, 70, '#c81c2c', 16, null); return { z: 1.03, fx: 160, fy: 100 }; }
    kisaragi(c, t, { lamp: false, sign: false }); dim(c, 0.4); bigCap(c, 'どこへ行ったのか', 60, 32, '#f8e8b0', sg(t, 0.3, 0.9));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- YH: why it spread — not heard but read, live, all together; the readers advised her; the stage is your daily train; dozing; open your eyes on a strange view (moves: screens glow, the train sways, heads nod) ---- */
const YH = {
  name: 'なぜ広まったか', ch: 'なぜ広まったか', bgm: 'memory',
  init(S) { S.tWho = at(S, 'L19x', 0) - 0.3; S.tHeard = at(S, 'L20', 0) - 0.3; S.tRead = at(S, 'L20b', 0) - 0.3; S.tAdv = at(S, 'L20bx', 0) - 0.3; S.tTrain = at(S, 'L21', 0) - 0.3; S.tRail = at(S, 'L21x', 0) - 0.3; S.tWake = at(S, 'L21b', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tWake) { trainInside(c, t, {}); for (let i = 0; i < 3; i++) person(c, COMMUTERS[i], 70 + i * 90, 150, { k: 'wk' + i, blink: i === 1 ? 0 : 2 }); c.save(); c.beginPath(); c.rect(16, 36, 296, 56); c.clip(); kisaragi(c, t, {}); c.restore(); return { z: 1.04, fx: 160, fy: 80 }; }
    if (t > S.tRail) { trackWalk(c, t, { v: 120 }); bigCap(c, '逃げ場は、ない', 60, 32, '#f8c8c8', sg(t, S.tRail + 0.3, S.tRail + 0.9)); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tTrain) { trainInside(c, t, { lights: true }); for (let i = 0; i < 3; i++) person(c, COMMUTERS[i], 70 + i * 90, 150, { k: 'tr' + i, blink: (Math.floor(t * 0.7) + i) % 3 === 0 ? 2 : 0 }); plate(c, 20, 40, '仕事の帰り、学校の帰り', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110, sx: Math.round(Math.sin(t * 9) * 0.6) }; }
    if (t > S.tAdv) { board(c, t, [['名無し', '線路を歩け'], ['名無し', '戻れるはず'], ['電車の人', 'わかった', true]]); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tRead) { R(c, 0, 0, W, H, '#0c0c14'); for (let i = 0; i < 4; i++) { const x = 30 + i * 76; R(c, x, 70, 56, 40, '#c8c8c0'); R(c, x + 4, 74, 48, 32, '#efefef'); TX(c, '…', x + 20, 80, '#2c2c2c', 16, null); person(c, READERS[i], x + 28, 166, { k: 'rr' + i, expr: 'shock' }); } plate(c, 20, 40, 'みんな、同じ時間に', '#f8e8b0'); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#141420'); if (t > S.tWho && t < S.tHeard) { for (let i = 0; i < 5; i++) { person(c, READERS[i % 4], 40 + i * 60, 160, { k: 'wh' + i, flip: i % 2 === 1 }); } plate(c, 20, 40, '最初は、誰？', '#c8c0d0'); return { z: 1.03, fx: 160, fy: 110 }; } bigCap(c, 'なぜ、広まったのか', 60, 32, '#f8e8b0', sg(t, 0.3, 0.9)); if (t > S.tHeard) { plate(c, 60, 126, '人から伝わる話', '#8c8cac'); plate(c, 200, 126, '画面で読む話', '#f8e8b0'); }
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- YI: ending — your train doesn't stop; check the next station's name; "きさらぎ……？" (moves: lights stop passing, the window shows the sign) ---- */
const YI = withCuts({
  name: '次の駅', ch: 'おわりに', bgm: 'requiem',
  init(S) { S.tCheck = at(S, 'L22b', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    trainInside(c, t, { lights: t < S.tCheck }); person(c, OL, 160, 150, { k: 'yi', blink: blinkOf(t, 5) });
    if (t > S.tCheck) { c.save(); c.beginPath(); c.rect(120, 36, 88, 56); c.clip(); c.translate(120 - 140 * 0.6, 36 - 50 * 0.6); c.scale(0.6, 0.6); kisaragi(c, t, {}); c.restore(); }
    return { z: 1.04 + 0.1 * ss(sg(t, S.tCheck, S.tCheck + 4)), fx: 164, fy: 70 };
  }
}, [['V3', OCLOSE]]);

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: 'きさらぎ', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { kisaragi(c, t, {}); walker(c, t, 110, 150, { stop: true, k: 's1' }); return { z: 1.06 + 0.06 * ss(sg(t, 0, S.dur)), fx: 170, fy: 100 }; } };
const SS2 = { name: '止まらない', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { trainInside(c, t, { lights: false }); person(c, OL, 160, 150, { k: 's2', blink: 0, expr: 'shock' }); return { z: 1.04, fx: 160, fy: 100, sx: Math.round(Math.sin(t * 9) * 0.6) }; } };
