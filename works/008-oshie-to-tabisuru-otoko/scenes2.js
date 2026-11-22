/* ================= 文庫 #008 押絵と旅する男: scenes ================= */
const RCLOSE = (c, t) => closeUp(c, t, rojinFace({ blink: blinkOf(t, 5) }), { bg: ['#140c14', '#3c2c3c'], glow: '#a83c6c', spk: 'rojin', talk: false });
const RFEAR = (c, t) => closeUp(c, t, rojinFace({ blink: 0, fear: true }), { bg: ['#1c0808', '#4c1c1c'], spk: 'rojin', talk: false });
const ACLOSE = (c, t) => closeUp(c, t, aniFace({ blink: blinkOf(t, 7) }), { bg: ['#1c1424', '#3c2c4c'], spk: 'ani' });
function seat(c, st, x, y, o = {}) { suit(c, st, x, y, o); }
// the two in the compartment: me on the left, the old man and his frame on the right
function compartment(c, t, o = {}) { carriage(c, t, {}); if (o.frame !== false) { if (o.wrapped) wrapped(c, 236, 44, 0.45); else oshie(c, t, 236, 44, 0.45, {}); } suit(c, ROJIN, o.rx || 250, 164, { k: 'cr' + (o.k || ''), blink: blinkOf(t, 5), flip: true }); if (o.me !== false) suit(c, WATASHI, o.mx || 90, 164, { k: 'cm' + (o.k || ''), blink: blinkOf(t, 3) }); }

/* ---- OZ: cold open — the empty second-class carriage at night; the old man props his framed picture facing out of the window; "さかさに覗いてはいけません" (moves: lights pass in the black windows, the frame faces the night) ---- */
const OZ = withCuts({
  name: '夜汽車の老人', ch: '夜汽車', bgm: 'eerie',
  init(S) { S.tFrame = at(S, 'C1', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    carriage(c, t, {}); suit(c, ROJIN, 250, 164, { k: 'z', blink: blinkOf(t, 5), flip: true });
    if (t > S.tFrame) { oshie(c, t, 200, 40, 0.5, {}); return { z: 1.1 + 0.15 * ss(sg(t, S.tFrame, S.dur)), fx: 230, fy: 70 }; }
    wrapped(c, 200, 40, 0.5);
    return { z: 1.03, fx: 200, fy: 100, sx: Math.round(Math.sin(t * 9) * 0.5) };
  }
}, [['V0', RFEAR]]);

/* ---- OA: the mirage at Uozu — grey sea and sky as one, the black shapes of the Noto forest swelling and changing; crowds on the beach; two hours (moves: the mirage grows and collapses, the crowd waits) ---- */
const OA = {
  name: '蜃気楼', ch: '魚津の蜃気楼', bgm: 'memory',
  init(S) { S.tDoubt = at(S, 'L4b', 0) - 0.3; S.tUozu = at(S, 'L2', 0) - 0.3; S.tMirage = at(S, 'L3', 0) - 0.3; S.tShift = at(S, 'L3b', 0) - 0.3; S.tHours = at(S, 'L4', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDoubt) { carriage(c, t, {}); c.save(); c.globalAlpha = 0.5; c.fillStyle = '#6c1c4c'; c.fillRect(0, 0, W, H); c.restore(); oshie(c, t, 120, 40, 0.7, {}); plate(c, 20, 46, '紫と臙脂の記憶', '#f8c8e8'); return { z: 1.04, fx: 160, fy: 80 }; }
    if (t > S.tHours) { mirageSea(c, t * 2); suit(c, WATASHI, 160, 164, { k: 'ah', blink: blinkOf(t, 3) }); plate(c, 26, 46, '二時間あまり', '#3c3c44', '#e8e8e0'); return { z: 1.06, fx: 160, fy: 100 }; }
    if (t > S.tMirage) { mirageSea(c, t * (t > S.tShift ? 2.5 : 1)); plate(c, 26, 46, t > S.tShift ? '形を変えてゆく' : '能登半島の森が、空に', '#3c3c44', '#e8e8e0'); return { z: 1.04 + 0.04 * ss(sg(t, S.tMirage, S.tHours)), fx: 160, fy: 80 }; }
    if (t > S.tUozu) { mirageSea(c, t * 0.4); plate(c, 20, 46, '魚津', '#3c3c44', '#e8e8e0'); return { z: 1.03, fx: 160, fy: 100 }; }
    R(c, 0, 0, W, H, '#140c14'); oshie(c, t, 124, 116, 0.6, {}); dim(c, 0.3); bigCap(c, '夢か、狂気か', 40, 32, '#e8c8e8', sg(t, 0.4, 1));
    return { z: 1.03, fx: 160, fy: 100 };
  }
};

/* ---- OB: the night train — an empty carriage like a church; the cliffs of Oyashirazu at dusk; he wraps the frame in black cloth; the odd suit, the black hair over countless wrinkles; a shy smile; the dark outside (moves: the coast streams past, the cloth, the eyes meet) ---- */
const OB = {
  name: '二等車', ch: '夜汽車', bgm: 'eerie',
  init(S) { S.tCliff = at(S, 'L6', 0) - 0.3; S.tGlimpse = at(S, 'L6b', 0) - 0.3; S.tSuit = at(S, 'L7', 0) - 0.3; S.tWrinkle = at(S, 'L7b', 0) - 0.3; S.tSmile = at(S, 'L8', 0) - 0.3; S.tDark = at(S, 'L8', 2) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tDark) { R(c, 0, 0, W, H, '#020204'); R(c, 40, 80, 240, 50, '#3c2c24'); for (let i = 0; i < 6; i++) R(c, 50 + i * 38, 86, 28, 18, '#f8e0a0'); P(c, 30 + fr(t * 0.1) * 260, 60, '#f8d890'); plate(c, 20, 46, 'たった一つの世界のように', '#e8e0e8'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tSmile) { R(c, 0, 0, W, H, '#140c14'); blit(c, rojinFace({ smile: true, blink: blinkOf(t, 5) }), 160, 104, 24, 24, { s: 2.4 }); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tWrinkle) { R(c, 0, 0, W, H, '#140c14'); blit(c, rojinFace({ blink: blinkOf(t, 5) }), 160, 104, 24, 24, { s: 2.4 }); plate(c, 20, 46, '四十前後……いや、六十？', '#e8c8e8'); return { z: 1.04 + 0.08 * ss(sg(t, S.tWrinkle, S.tSmile)), fx: 160, fy: 96 }; }
    if (t > S.tSuit) { compartment(c, t, { wrapped: true, k: 's' }); plate(c, 140, 46, '古風な黒の背広', '#f8e8b0'); return { z: 1.1, fx: 240, fy: 120 }; }
    if (t > S.tGlimpse) { carriage(c, t, {}); oshie(c, t, 180, 36, 0.6, {}); suit(c, ROJIN, 280, 164, { k: 'gl', flip: true, arm: 'up' }); return { z: 1.12, fx: 216, fy: 70 }; }
    if (t > S.tCliff) { carriage(c, t, { night: false }); c.save(); c.globalAlpha = 0.6; for (let i = 0; i < 4; i++) { const x = 16 + i * 78; R(c, x, 30, 64, 60, '#5c3c5c'); R(c, x, 70, 64, 20, '#3c2c3c'); } c.restore(); compartment(c, t, { wrapped: true, k: 'c' }); plate(c, 20, 46, '親不知の断崖', '#f8e8b0'); return { z: 1.04, fx: 200, fy: 110 }; }
    compartment(c, t, { wrapped: false, k: 'o' }); plate(c, 20, 46, '教会堂のように、がらん', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110, sx: Math.round(Math.sin(t * 9) * 0.5) };
  }
};

/* ---- OC: the oshie — "これが御覧になりたいのでございましょう"; the frame turned outward; the long room, the white-haired man in velvet, the girl in scarlet; the man's face is the owner's; exquisite craft; they were alive (moves: slow push into the frame, the girl's breath) ---- */
const OC = withCuts({
  name: '押絵', ch: '押絵', bgm: 'eerie',
  init(S) { S.tCraft = at(S, 'L12c', 0) - 0.3; S.tShow = at(S, 'L10', 0) - 0.3; S.tPic = at(S, 'L10b', 0) - 0.3; S.tSame = at(S, 'L11', 0) - 0.3; S.tFine = at(S, 'L12', 0) - 0.3; S.tAlive = at(S, 'L12b', 0) - 0.3; S.tAlive2 = at(S, 'L12b', 1) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tAlive2) { R(c, 0, 0, W, H, '#0c080c'); oshie(c, t, 40, 30, 2.0 + 0.02 * Math.sin(t * 3), {}); glow(c, 190, 110, 60, 50, '#f8a8b8', 0.12 + 0.06 * Math.sin(t * 3)); return { z: 1.04 + 0.06 * ss(sg(t, S.tAlive2, S.dur)), fx: 190, fy: 100 }; }
    if (t > S.tCraft) { R(c, 0, 0, W, H, '#0c080c'); oshie(c, t, 40, 30, 2.0, {}); dim(c, 0.25); plate(c, 20, 46, '名人の手による細工', '#f8e8b0'); return { z: 1.06, fx: 190, fy: 100 }; }
    if (t > S.tFine) { R(c, 0, 0, W, H, '#0c080c'); oshie(c, t, -20, -20, 2.8, {}); plate(c, 20, 46, '髪は一本一本、本物の毛', '#f8e8b0'); return { z: 1.03, fx: 200, fy: 80 }; }
    if (t > S.tSame) { R(c, 0, 0, W, H, '#140c14'); oshie(c, t, 20, 40, 1.1, {}); blit(c, rojinFace({ blink: blinkOf(t, 5) }), 250, 100, 24, 24, { s: 1.6 }); plate(c, 170, 40, '同じ顔……？', '#e8c8e8'); return { z: 1.03, fx: 160, fy: 100 }; }
    if (t > S.tPic) { if (t > at(S, 'L10b', 1) - 0.3 && t < at(S, 'L10b', 2) - 0.3) { compartment(c, t, { k: 'lk', mx: 200 }); return { z: 1.16, fx: 220, fy: 90 }; } R(c, 0, 0, W, H, '#140c14'); oshie(c, t, 40, 30, 2.0, {}); return { z: 1.03 + 0.05 * ss(sg(t, S.tPic, S.tSame)), fx: 160, fy: 90 }; }
    if (t > S.tShow) { compartment(c, t, { k: 'sh' }); return { z: 1.1 + 0.1 * ss(sg(t, S.tShow, S.tPic)), fx: 240, fy: 70 }; }
    compartment(c, t, { wrapped: true, mx: lerp(90, 180, sg(t, 0.5, 3)), k: 'ap' });
    return { z: 1.04, fx: 200, fy: 110 };
  }
}, [['V1', RCLOSE]]);

/* ---- OD: the binoculars — he offers an old pair; I raise them the wrong way round — "さかさに覗いてはいけません"; turned right: the girl fills the view, flushed, breathing; the old man's face: anguish and terror under the wrinkles (moves: the twin circles merge, the heartbeat) ---- */
const OD = withCuts({
  name: 'さかさの遠眼鏡', ch: '遠眼鏡', bgm: 'dread',
  init(S) { S.tBack = at(S, 'L16b', 0) - 0.3; S.tRaise = at(S, 'L13b', 0) - 0.3; S.tPale = at(S, 'L14', 0) - 0.3; S.tLook = at(S, 'L15', 0) - 0.3; S.tGirl = at(S, 'L15b', 0) - 0.3; S.tOld = at(S, 'L16', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const lens = (draw) => { R(c, 0, 0, W, H, '#000000'); c.save(); c.beginPath(); c.arc(130, 96, 64, 0, TAU); c.arc(190, 96, 64, 0, TAU); c.clip(); draw(); c.restore(); };
    if (t > S.tBack) { compartment(c, t, { k: 'bk', mx: 160 }); binoculars(c, 150, 130, 0.8, 0.5); return { z: 1.04, fx: 200, fy: 110 }; }
    if (t > S.tOld) { lens(() => { R(c, 0, 0, W, H, '#2c4c7c'); blit(c, rojinFace({ fear: true, blink: 0 }), 160, 100, 24, 24, { s: 2.6 }); }); return { z: 1.04 + 0.04 * Math.sin(t * 2), fx: 160, fy: 96 }; }
    if (t > S.tGirl) { lens(() => { oshie(c, t, -221, -128, 5.6, {}); glow(c, 160, 100, 80, 60, '#f8a8b8', 0.1 + 0.08 * Math.sin(t * 5)); }); return { z: 1.03 + 0.02 * Math.sin(t * 5), fx: 160, fy: 96 }; }
    if (t > S.tLook) { const k = sg(t, S.tLook, S.tLook + 2.5); R(c, 0, 0, W, H, '#000000'); c.save(); c.beginPath(); c.arc(130 + 30 * k, 96, 64, 0, TAU); c.arc(190 - 30 * k, 96, 64, 0, TAU); c.clip(); oshie(c, t, -221, -128, 5.6, {}); c.restore(); return { z: 1.03, fx: 160, fy: 96 }; }
    if (t > S.tPale) { compartment(c, t, { k: 'pl', mx: 160 }); binoculars(c, 178, 128, 0.6, Math.PI); return { z: 1.12, fx: 210, fy: 120 }; }
    if (t > S.tRaise) { compartment(c, t, { k: 'rs', mx: 160 }); binoculars(c, 178, 128, 0.6, Math.PI); return { z: 1.06, fx: 200, fy: 120 }; }
    compartment(c, t, { k: 'bn', mx: 160 }); binoculars(c, lerp(236, 186, sg(t, 0.4, 2.5)), 130, 0.6);
    return { z: 1.04, fx: 200, fy: 110 };
  }
}, [['V2', RFEAR]]);

/* ---- OE: "あれらは、生きて居りましたろう" — the whisper; the true story; the turning point: Meiji 28, Nihonbashi, a draper's sons; the brother and the ship captain's binoculars from Yokohama; he stops eating, goes out every day (moves: sepia, the shop curtain sways) ---- */
const OE = withCuts({
  name: '身の上話', ch: '兄の身の上話', bgm: 'memory',
  init(S) { S.tTurn = at(S, 'L18', 0) - 0.3; S.tMeiji = at(S, 'L19', 0) - 0.3; S.tBino = at(S, 'L19b', 0) - 0.3; S.tThin = at(S, 'L20', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const sepia = () => { c.save(); c.globalAlpha = 0.28; c.fillStyle = '#8c6c3c'; c.fillRect(0, 0, W, H); c.restore(); };
    if (t > S.tThin) { R(c, 0, 0, W, H, '#c8b494'); R(c, 0, 120, W, 70, '#a88c64'); suit(c, ANI, lerp(80, 300, sg(t, S.tThin + 1, S.dur)), 164, { k: 'th', f: Math.floor(t * 4) & 3 }); suit(c, OTOTO, 60, 164, { k: 'ty', expr: 'sad' }); sepia(); plate(c, 20, 46, '毎日、どこかへ', '#5c3c1c', '#f8f0d8'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tBino) { R(c, 0, 0, W, H, '#3c3428'); binoculars(c, 160, 96, 3, 0.2); sepia(); plate(c, 20, 46, '外国船の船長の持ち物', '#f8e8b0'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tMeiji) { R(c, 0, 0, W, H, '#c8b494'); R(c, 0, 40, W, 80, '#5c4030'); for (let i = 0; i < 4; i++) { R(c, 20 + i * 76, 50, 60, 70, '#2c4c7c'); TX(c, '呉服', 34 + i * 76, 70, '#f0e8d8', 16, null); } R(c, 0, 120, W, 70, '#a88c64'); suit(c, ANI, 130, 164, { k: 'mn' }); suit(c, OTOTO, 180, 164, { k: 'my' }); sepia(); plate(c, 20, 46, '明治二十八年、日本橋', '#5c3c1c', '#f8f0d8'); return { z: 1.03, fx: 160, fy: 110 }; }
    if (t > S.tTurn) { R(c, 0, 0, W, H, '#140c14'); oshie(c, t, 40, 30, 2.0, {}); dim(c, 0.4); bigCap(c, '本当の身の上話', 60, 32, '#e8c8e8', sg(t, S.tTurn + 0.3, S.tTurn + 0.9)); return { z: 1.03, fx: 160, fy: 90 }; }
    compartment(c, t, { k: 'wh', mx: 200 }); return { z: 1.14, fx: 230, fy: 110 };
  }
}, [['V3', RCLOSE], ['V4', RCLOSE]]);

/* ---- OF: the Twelve Storeys — Asakusa; the red tower; up the dim stairs; the brother alone at the top with the binoculars; the girl he saw once; balloons rise (moves: clouds, the brother's coat, the balloons) ---- */
const OF = {
  name: '十二階', ch: '浅草十二階', bgm: 'memory',
  init(S) { S.tPaint = at(S, 'L21c', 0) - 0.3; S.tStairs = at(S, 'L21b', 0) - 0.3; S.tTop = at(S, 'L21b', 1) - 0.3; S.tGirl = at(S, 'L22', 0) - 0.3; S.tLove = at(S, 'L22b', 0) - 0.3; S.tBalloon = at(S, 'L23', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tBalloon) { towerTop(c, t); balloons(c, t, S.tBalloon + 0.6); suit(c, ANI, 200, 120, { k: 'bl', arm: 'up' }); suit(c, OTOTO, 90, 120, { k: 'by' }); return { z: 1.03, fx: 160, fy: 90 }; }
    if (t > S.tLove) { towerTop(c, t); suit(c, ANI, 200, 120, { k: 'lv', arm: 'up', expr: 'sad' }); binoculars(c, 204, 74, 0.6); suit(c, OTOTO, 90, 120, { k: 'ly', expr: 'sad' }); plate(c, 20, 46, '恋わずらい', '#f8c8d8'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tGirl) { R(c, 0, 0, W, H, '#000000'); c.save(); c.beginPath(); c.arc(130, 96, 60, 0, TAU); c.arc(190, 96, 60, 0, TAU); c.clip(); R(c, 0, 0, W, H, '#c8b494'); for (let i = 0; i < 14; i++) robe(c, CROWD[i % 5], 20 + i * 24, 150 + (i % 3) * 6, { k: 'gc' + i, s: 0.9 }); E(c, 160, 92, 12, 14, '#f8e8e0'); E(c, 160, 82, 14, 10, '#141414'); R(c, 152, 80, 6, 2, '#d81c2c'); P(c, 156, 92, '#141414'); P(c, 164, 92, '#141414'); PF(c, [146, 104, 174, 104, 180, 150, 140, 150], '#d81c2c'); c.restore(); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tPaint && t < S.tGirl) { R(c, 0, 0, W, H, '#2c2420'); for (let i = 0; i < 8; i++) R(c, 60 + i * 20, 150 - i * 14, 40, 14, '#4c3c30'); for (let i = 0; i < 3; i++) { R(c, 20 + i * 100, 30, 70, 46, '#5c4c3c'); R(c, 24 + i * 100, 34, 62, 38, ['#7c3c2c', '#5c4c3c', '#6c2c2c'][i]); for (let k = 0; k < 4; k++) P(c, 30 + i * 100 + k * 12, 50 + (k & 1) * 8, '#c81c1c'); } suit(c, OTOTO, 120, 120, { k: 'pt', expr: 'shock' }); plate(c, 20, 46, '血みどろの油絵', '#f8c8c8'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tTop) { towerTop(c, t); suit(c, ANI, 200, 120, { k: 'tp', arm: 'up' }); binoculars(c, 204, 74, 0.6); suit(c, OTOTO, 70, 120, { k: 'ty2' }); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tStairs) { R(c, 0, 0, W, H, '#2c2420'); for (let i = 0; i < 8; i++) R(c, 60 + i * 20, 150 - i * 14, 40, 14, '#4c3c30'); for (let i = 0; i < 3; i++) { R(c, 20 + i * 100, 30, 60, 40, '#5c4c3c'); R(c, 24 + i * 100, 34, 52, 32, '#7c3c2c'); } suit(c, ANI, 200, 80 + 30 * (1 - sg(t, S.tStairs, S.tTop)), { k: 'st', f: Math.floor(t * 4) & 3 }); return { z: 1.04, fx: 180, fy: 100 }; }
    ryounkaku(c, t, {}); suit(c, OTOTO, 80, 164, { k: 'ry' }); plate(c, 20, 46, '浅草　凌雲閣', '#3c2c1c', '#f0e8d8');
    return { z: 1.03 + 0.04 * ss(sg(t, 0, S.tStairs)), fx: 200, fy: 90 };
  }
};

/* ---- OG: the peep-show — "found her!"; down the stairs; the pine behind the Kannon hall, no house; the peep-show; Oshichi and Kichiza in oshie; "押絵の中の男になって"; night falls (moves: running, the whip, the lamp) ---- */
const OG = withCuts({
  name: '覗きからくり', ch: '覗きからくり', bgm: 'eerie',
  init(S) { S.tPine = at(S, 'L24b', 0) - 0.3; S.tPeep = at(S, 'L25', 0) - 0.3; S.tOshichi = at(S, 'L25b', 0) - 0.3; S.tNight = at(S, 'L26', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    const pine = (night) => { R(c, 0, 0, W, H, night ? '#0c0c18' : '#a8a8b0'); R(c, 0, 140, W, 50, night ? '#1c1814' : '#8c8070'); R(c, 40, 50, 6, 90, '#3c2c1c'); for (let k = 0; k < 4; k++) E(c, 43 + (k & 1 ? 14 : -14), 50 + k * 18, 24, 8, '#2c4c2c'); };
    if (t > S.tNight) { pine(true); peepShow(c, t, 150, 150, { lamp: true }); suit(c, ANI, 200, 164, { k: 'nt', blink: blinkOf(t, 7) }); suit(c, OTOTO, 100, 164, { k: 'ny' }); for (let i = 0; i < 6; i++) glow(c, 260 + (i % 3) * 20, 40 + i * 8, 6, 6, ['#f8d890', '#f8a8c8'][i % 2], 0.5 + 0.3 * Math.sin(t * 3 + i)); return { z: 1.06, fx: 170, fy: 110 }; }
    if (t > S.tOshichi) { R(c, 0, 0, W, H, '#0c0808'); c.save(); c.beginPath(); c.arc(160, 96, 70, 0, TAU); c.clip(); oshie(c, t, 0, 10, 2.2, { oshichi: true }); c.restore(); plate(c, 20, 46, '八百屋お七', '#f8c8d8'); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tPeep) { pine(false); peepShow(c, t, 150, 150, {}); suit(c, ANI, 190, 164, { k: 'pp', arm: 'up' }); suit(c, OTOTO, 100, 164, { k: 'py', expr: 'shock' }); return { z: 1.06, fx: 180, fy: 110 }; }
    if (t > S.tPine) { pine(false); suit(c, ANI, 160, 164, { k: 'pn', expr: 'sad' }); suit(c, OTOTO, 110, 164, { k: 'py2' }); plate(c, 120, 46, '家は、どこにもない', '#3c2c1c', '#f0e8d8'); return { z: 1.03, fx: 140, fy: 110 }; }
    R(c, 0, 0, W, H, '#2c2420'); for (let i = 0; i < 8; i++) R(c, 60 + i * 20, 150 - i * 14, 40, 14, '#4c3c30'); { const u = sg(t, 0.5, 3), v = sg(t, 0.8, 3.3), sy = k => 150 - Math.min(7, Math.floor(k * 8)) * 14 + 0; suit(c, ANI, 240 - 140 * u, sy(1 - u) + 10, { k: 'rn', f: Math.floor(t * 8) & 3, expr: 'smile', flip: true }); suit(c, OTOTO, 270 - 140 * v, sy(1 - v) + 10, { k: 'ry2', f: Math.floor(t * 8) & 3, flip: true }); } plate(c, 20, 46, '早く行かないと', '#f8e8b0');
    return { z: 1.03, fx: 160, fy: 110 };
  }
}, [['A1', ACLOSE], ['A2', ACLOSE]]);

/* ---- OH: the reversed binoculars — the brother shrinks, a doll-sized figure, floats up and melts into the dark (a pause); searching; the peep-show again: the brother as an oshie, in Kichiza's place (moves: the figure shrinks and rises, the lamp, the reveal) ---- */
const OH = {
  name: '消えた兄', ch: 'さかさの遠眼鏡', bgm: 'dread',
  init(S) { S.tFear = at(S, 'L28c', 0) - 0.3; S.tGone = at(S, 'L27b', 1) - 0.3; S.tSearch = at(S, 'L28', 0) - 0.3; S.tAgain = at(S, 'L29', 0) - 0.3; S.tReveal = at(S, 'L29b', 1) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tReveal) { R(c, 0, 0, W, H, '#0c0808'); c.save(); c.beginPath(); c.arc(160, 96, 70, 0, TAU); c.clip(); oshie(c, t, 0, 10, 2.2, { young: true, smile: true }); glow(c, 160, 60, 80, 40, '#f8d890', 0.2); c.restore(); return { z: 1.04 + 0.08 * ss(sg(t, S.tReveal, S.dur)), fx: 160, fy: 96 }; }
    if (t > S.tFear && t < S.tAgain) { R(c, 0, 0, W, H, '#1c0c0c'); binoculars(c, 160, 96, 3.2, Math.PI); plate(c, 20, 46, 'さかさに覗いてはならない', '#f8c8c8'); return { z: 1.04 + 0.04 * Math.sin(t * 2), fx: 160, fy: 96 }; }
    if (t > S.tAgain) { R(c, 0, 0, W, H, '#0c0c18'); R(c, 0, 140, W, 50, '#1c1814'); peepShow(c, t, 120, 150, { lamp: true }); suit(c, OTOTO, 190, 164, { k: 'ag', arm: 'up' }); return { z: 1.08, fx: 170, fy: 110 }; }
    if (t > S.tSearch) { R(c, 0, 0, W, H, '#0c0c18'); R(c, 0, 140, W, 50, '#1c1814'); suit(c, OTOTO, lerp(40, 280, fr(t * 0.15)), 164, { k: 'se', f: Math.floor(t * 6) & 3, expr: 'shock' }); return { z: 1.03, fx: 160, fy: 110 }; }
    R(c, 0, 0, W, H, '#000000'); c.save(); c.beginPath(); c.arc(160, 96, 66, 0, TAU); c.clip(); R(c, 0, 0, W, H, '#0c0c18'); const k = sg(t, 0.6, S.tGone), s = lerp(1.6, 0.25, k); c.save(); c.globalAlpha = 1 - sg(t, S.tGone, S.tGone + 1.5); suit(c, ANI, 160, 130 - 40 * sg(t, S.tGone - 1, S.tGone + 1.5), { k: 'sh', s }); c.restore(); c.restore();
    return { z: 1.03, fx: 160, fy: 96 };
  }
};

/* ---- OI: thirty years — the honeymoon trip with the frame at the window; the girl stays young, the brother grows old; "白髪になって"; wrapped again, the two smile shyly; the small mountain station; he walks into the dark, the same as the oshie (moves: the scenery streams past the frame, the smile, the dark swallows him) ---- */
const OI = withCuts({
  name: '三十年', ch: '三十年の旅', bgm: 'requiem',
  init(S) { S.tAge = at(S, 'L31', 0) - 0.3; S.tWrap = at(S, 'L32', 0) - 0.3; S.tSmile = at(S, 'L32', 1) - 0.3; S.tStop = at(S, 'L33', 0) - 0.3; S.tGone = at(S, 'L33b', 0) - 0.3; S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    if (t > S.tGone) { smallStation(c, t); const k = sg(t, S.tGone + 1, S.tGone + 6); c.save(); c.globalAlpha = 1 - k; suit(c, ROJIN, lerp(110, 60, k), 120, { k: 'gn', f: Math.floor(t * 3) & 3, flip: true }); wrapped(c, lerp(86, 36, k), 92, 0.18); c.restore(); R(c, 0, 60, 40, 60, '#020204'); return { z: 1.06, fx: 200, fy: 100 }; }
    if (t > S.tStop) { smallStation(c, t); suit(c, ROJIN, 110, 120, { k: 'stp' }); wrapped(c, 86, 92, 0.18); suit(c, { ...WATASHI, id: 'eki', coat: '#2c2c4c' }, 240, 120, { k: 'ek', s: 0.8, flip: true }); return { z: 1.04, fx: 160, fy: 100 }; }
    if (t > S.tSmile) { R(c, 0, 0, W, H, '#140c14'); oshie(c, t, 40, 30, 2.0, { smile: true }); R(c, 40, 30 + 160 * (1 - sg(t, S.tSmile + 1, S.tStop)), 240, 160 * sg(t, S.tSmile + 1, S.tStop), '#0c0c10'); return { z: 1.04, fx: 160, fy: 90 }; }
    if (t > S.tWrap) { compartment(c, t, { k: 'wr' }); return { z: 1.12, fx: 236, fy: 70 }; }
    if (t > S.tAge) { R(c, 0, 0, W, H, '#140c14'); oshie(c, t, 10, 40, 1.1, { young: true }); oshie(c, t, 180, 40, 1.1, {}); TX(c, '→', 150, 80, '#e8c8e8', 16, null); plate(c, 20, 46, '娘は若いまま、兄だけが年をとる', '#e8c8e8'); return { z: 1.03, fx: 160, fy: 90 }; }
    carriage(c, t, { night: false }); c.save(); c.globalAlpha = 0.7; for (let i = 0; i < 4; i++) { const x = 16 + i * 78; R(c, x, 30, 64, 60, '#7cacd8'); E(c, x + ((t * 20 + i * 30) % 64), 70, 14, 8, '#5c8c5c'); } c.restore(); oshie(c, t, 200, 40, 0.5, { young: true, smile: true }); suit(c, OTOTO, 120, 164, { k: 'hm', expr: 'smile' }); plate(c, 20, 46, '箱根へ、鎌倉へ', '#f8e8b0');
    return { z: 1.04, fx: 190, fy: 90 };
  }
}, [['V5', RCLOSE]]);

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: '窓に立てた額', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { carriage(c, t, {}); suit(c, ROJIN, 250, 164, { k: 's1', flip: true, blink: blinkOf(t, 5) }); oshie(c, t, 200, 40, 0.5, {}); return { z: 1.12 + 0.05 * ss(sg(t, 0, S.dur)), fx: 230, fy: 80 }; } };
const SS2 = { name: '目が合う', ch: '', bgm: 'eerie', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { R(c, 0, 0, W, H, '#140c14'); blit(c, rojinFace({ smile: true, blink: blinkOf(t, 5) }), 160, 104, 24, 24, { s: 2.4 }); return { z: 1.04 + 0.04 * ss(sg(t, 0, S.dur)), fx: 160, fy: 100 }; } };
