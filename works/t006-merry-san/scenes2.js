/* ================= 都市伝説 #006 メリーさんの電話: scenes ================= */
const MCS = [[['#0c0814', '#3c2440'], '#5c3c6c', false], [['#100814', '#4c2440'], '#6c3c5c', false], [['#140608', '#5c1c2c'], '#7c2c3c', true], [['#1c0404', '#6c0c14'], '#8c1c1c', true]];
const MC = n => (c, t) => { const [bg, gl, dk] = MCS[n]; const r = closeUp(c, t, merryFace({ blink: dk ? 0 : blinkOf(t, 9), dark: dk }), { bg, glow: gl, spk: 'merry', lines: n === 3 ? '#c83c3c' : null }); if (n >= 2) { c.save(); c.globalAlpha = 0.12 + 0.06 * n; for (let i = 0; i < 40; i++) P(c, fr(t * 7.3 + i * 0.37) * W, fr(t * 5.1 + i * 0.61) * 150, '#f8f8f8'); c.restore(); } return r; };
const MCLOSE = MC(0);
const GCLOSE = (c, t) => closeUp(c, t, shojoFace({ scared: true, blink: blinkOf(t, 3) }), { bg: ['#0c0c18', '#2c2c48'], spk: 'shojo' });
// the girl at the phone: standing by the little table, receiver at her ear (o.drop: receiver dangling, o.scared)
function atPhone(c, t, x, o = {}) { R(c, x + 6, 104, 24, 6, '#6c5848'); R(c, x + 16, 110, 4, 28, '#5c4c3c'); kuroden(c, t, x + 0, 86, { ring: o.ring, off: o.hold || o.drop }); person(c, GIRL, x - 14, 150, { k: 'ap' + (o.k || ''), expr: o.scared ? 'shock' : 'normal', blink: blinkOf(t, 4) }); if (o.hold) { receiver(c, x - 9, 112); L(c, x - 7, 126, x + 10, 108, '#2c2c34'); } if (o.drop) receiver(c, x + 8, 112, { cord: true }); }
// the call card: where Merry is now (the place, and a tiny dark shape under the lamp)
function whereNow(c, t, what, o = {}) { nightPlace(c, t, { what, lamp: o.lamp || 110 }); merryShadow(c, o.mx || 120, 156, { s: 1, eyes: o.eyes || 0 }); }

/* ---- MRZ: cold open — "わたし、メリーさん"; a dark house, the phone ringing; a small voice; each call nearer; "今、あなたの家の前にいるの" (moves: the ringing window, the receiver lifted, a small shadow at the gate) ---- */
const MRZ = {
  name: '夜の電話', ch: '夜の電話', bgm: 'eerie',
  init(S) { S.tRing = at(S, 'C0', 0) - 0.3; S.tVoice = at(S, 'C1', 0) - 0.3; S.tNear = at(S, 'C2', 0) - 0.3; S.tGate = at(S, 'V0', 0) - 0.4; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGate) { nightPlace(c, t, { what: 'house', lamp: 100 }); merryShadow(c, 196, 150, { eyes: sg(t, S.tGate + 0.8, S.tGate + 1.6) }); return { z: 1.1 + 0.08 * sg(t, S.tGate, S.dur), fx: 196, fy: 110 }; }
    if (t > S.tNear) { R(c, 0, 0, W, H, '#14142a'); R(c, 0, 140, W, 50, '#1c1c30'); const k = sg(t, S.tNear, S.tGate); for (let i = 0; i < 4; i++) { const u = sg(t, S.tNear + i * 1.2, S.tNear + i * 1.2 + 0.4); if (u > 0) { glow(c, 60 + i * 60, 140 - 20 * (0.6 + i * 0.25), 22, 26, '#3c4c7c', 0.6 * u); c.save(); c.globalAlpha = u; merryShadow(c, 60 + i * 60, 140, { s: 0.6 + i * 0.25, eyes: i === 3 ? 1 : 0 }); c.restore(); } } return { z: 1.0 + 0.1 * k, fx: 160, fy: 104 }; }
    if (t > S.tVoice) { newRoom(c, t, {}); atPhone(c, t, 210, { hold: true, scared: true, k: 'z' }); return { z: 1.3, fx: 210, fy: 112 }; }
    if (t > S.tRing) { nightPlace(c, t, { what: 'house', lamp: 100 }); ringMarks(c, t, 150, 56); return { z: 1.08, fx: 200, fy: 96 }; }
    R(c, 0, 0, W, H, '#0c0c18'); glow(c, 160, 96, 70, 40, '#5c6c9c', 0.45); kuroden(c, t, 140, 80, { ring: t > 0.8 }); return { z: 1.6, fx: 160, fy: 96 };
  }
};

/* ---- MRA: the rumour — told in schools and homes for years; its form changes; "hear it at night and the phone rings" (moves: children whispering at dusk, a phone in the dark) ---- */
const MRA = {
  name: '語り継がれる噂', ch: '語り継がれる噂', bgm: 'memory',
  init(S) { S.tForm = at(S, 'L1x', 0) - 0.3; S.tNight = at(S, 'L1y', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tNight) { R(c, 0, 0, W, H, '#10101c'); R(c, 0, 116, W, 74, '#1c1814'); glow(c, 160, 100, 70, 40, '#5c6c9c', 0.4); kuroden(c, t, 140, 92, { ring: t > S.tNight + 2.5 }); dim(c, 0.2); return { z: 1.3, fx: 160, fy: 100 }; }
    VG(c, 0, 0, W, 120, ['#c86c3c', '#e8a05c', '#f8d890']); R(c, 0, 116, W, 74, '#8c7c5c'); R(c, 30, 40, 120, 76, '#c8b8a0'); for (let i = 0; i < 3; i++) R(c, 40 + i * 36, 54, 26, 20, '#f8e8b0'); R(c, 0, 108, W, 8, '#5c4c3c');
    for (let i = 0; i < 4; i++) person(c, KIDS[i], 150 + i * 30, 156, { k: 'ka' + i, flip: i >= 2, arm: (i === 1 && Math.floor(t * 2) % 2) ? 'up' : null, expr: t > S.tForm && i === 3 ? 'shock' : 'normal' });
    if (t > S.tForm) { const n = ['人形', '女の子', 'ケータイ']; for (let i = 0; i < 3; i++) if (t > S.tForm + 0.6 + i * 0.8) plate(c, 180, 50 + i * 24, n[i] + '？', '#f8e8b0'); }
    return { z: 1.04, fx: 190, fy: 108 };
  }
};

/* ---- MRB: the old house — moving; a doll at the back of the closet: golden curls, blue glass eyes, Merry; the girl named her; years ago, she slept holding it; now faded (moves: the closet, a slow push-in, the bedside lamp) ---- */
const MRB = withCuts({
  name: '押し入れの人形', ch: '押し入れの人形', bgm: 'memory',
  init(S) { S.tDoll = at(S, 'L3', 1) - 0.3; S.tLook = at(S, 'L3x', 0) - 0.3; S.tPast = at(S, 'L4', 0) - 0.3; S.tNow = at(S, 'L4', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tNow) { oldRoom(c, t, { doll: false }); person(c, GIRL, 120, 152, { k: 'bn', blink: blinkOf(t, 5) }); merry(c, 140, 140, { faded: true }); return { z: 1.5, fx: 130, fy: 112 }; }
    if (t > S.tPast) { bedRoom(c, t); person(c, GIRL_S, 112, 128, { k: 'bp', rot: -Math.PI / 2, s: 0.9 }); merry(c, 132, 116, { rot: -Math.PI / 2 }); yearFlash(c, t, S.tPast + 0.3, '昔', 216, 10, '小さいころ'); return { z: 1.1, fx: 140, fy: 110 }; }
    if (t > S.tLook) { oldRoom(c, t, { doll: false }); person(c, GIRL, 110, 152, { k: 'bl', blink: blinkOf(t, 7) }); merry(c, 128, 132, { faded: true, s: 1 }); return { z: 1.4, fx: 120, fy: 116 }; }
    oldRoom(c, t, { doll: t > S.tDoll }); person(c, GIRL, lerp(200, 140, sg(t, 0.5, 2.5)), 152, { k: 'bw', f: t < 2.5 ? Math.floor(t * 4) & 3 : -1 }); person(c, MOM, 270, 152, { k: 'bm', flip: true });
    if (t > S.tDoll) { glow(c, 75, 50, 26, 20, '#f8e8b0', 0.2 * sg(t, S.tDoll, S.tDoll + 1)); return { z: 1.04 + 0.6 * eOut(sg(t, S.tDoll, S.tDoll + 3)), fx: 74, fy: 62 }; }
    return { z: 1.04, fx: 160, fy: 104 };
  }
}, [['L3', (c, t, S) => (t > at(S, 'L3', 2) - 0.3 ? closeUp(c, t, merryFace({ blink: blinkOf(t, 11) }), { bg: ['#3c2c24', '#8c6c4c'], talk: false }) : null)]]);

/* ---- MRC: the morning she left — Merry on the rubbish heap; the car pulls away, blue eyes watching; hours of road; forgotten (moves: crows, the car, scrolling towns) ---- */
const MRC = {
  name: '置いていかれた人形', ch: '引っ越しの朝', bgm: 'dread',
  init(S) { S.tCar = at(S, 'L5x', 0) - 0.3; S.tRoad = at(S, 'L5y', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRoad) { VG(c, 0, 0, W, 120, ['#a8c0d8', '#c8d4dc', '#e0e0d8']); for (let i = 0; i < 8; i++) { const x = ((i * 60 - t * 90) % 480 + 480) % 480 - 60; R(c, x, 70 + (i % 3) * 10, 40, 50 - (i % 3) * 10, ['#c8b8a0', '#a8b0b8', '#b8a890'][i % 3]); } R(c, 0, 118, W, 72, '#6c6c64'); for (let i = 0; i < 6; i++) { const x = ((i * 70 - t * 160) % 420 + 420) % 420 - 50; R(c, x, 140, 30, 2, '#e8e8e0'); } R(c, 110, 112, 90, 22, '#c8c8c0'); PF(c, [126, 112, 136, 98, 176, 98, 186, 112], '#c8c8c0'); R(c, 138, 100, 18, 10, '#5c7c9c'); R(c, 158, 100, 18, 10, '#5c7c9c'); for (const wx of [128, 182]) E(c, wx, 135, 7, 7, '#141414'); return { z: 1.04, fx: 160, fy: 104 }; }
    if (t > S.tCar) { dump(c, t, {}); merry(c, 150, 112, { faded: true, sit: true }); const k = sg(t, S.tCar, S.tCar + 4); R(c, lerp(200, 380, k), 128, 70, 18, '#c8c8c0'); PF(c, [lerp(200, 380, k) + 12, 128, lerp(200, 380, k) + 20, 116, lerp(200, 380, k) + 56, 116, lerp(200, 380, k) + 62, 128], '#c8c8c0'); if (t > S.tCar + 2.5) return { z: 3.0, fx: 150, fy: 100 }; return { z: 1.06, fx: 200, fy: 110 }; }
    dump(c, t, {}); person(c, GIRL, lerp(260, 190, sg(t, 0.5, 2)), 156, { k: 'cg', f: t < 2 ? Math.floor(t * 4) & 3 : -1, flip: true }); if (t > 2.4) merry(c, 150, 112, { faded: true, sit: true }); for (let i = 0; i < 2; i++) crow(c, 230 + i * 30, 96, t, i);
    return { z: 1.1, fx: 180, fy: 108 };
  }
};

/* ---- MRD: the first night — parents out; alone among boxes; a strange window; the black phone by the door, a number almost no one knows (moves: the clock, the night outside, the phone) ---- */
const MRD = {
  name: '最初の夜', ch: '新しい家', bgm: 'eerie',
  init(S) { S.tRoom = at(S, 'L6x', 0) - 0.3; S.tPhone = at(S, 'L6y', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPhone) { newRoom(c, t, {}); R(c, 216, 104, 24, 6, '#6c5848'); R(c, 226, 110, 4, 28, '#5c4c3c'); kuroden(c, t, 210, 86, {}); return { z: 1.06 + 0.9 * eOut(sg(t, S.tPhone, S.tPhone + 3)), fx: 230, fy: 98 }; }
    if (t > S.tRoom) { newRoom(c, t, {}); person(c, GIRL, 150, 150, { k: 'dr', blink: blinkOf(t, 5), flip: true }); return { z: 1.1, fx: 110, fy: 100 }; }
    nightPlace(c, t, { what: 'house', lamp: 100 }); const k = sg(t, 1.5, 7); R(c, lerp(180, -90, k), 136, 70, 18, '#c8c8c0'); PF(c, [lerp(180, -90, k) + 12, 136, lerp(180, -90, k) + 20, 124, lerp(180, -90, k) + 56, 124, lerp(180, -90, k) + 62, 136], '#c8c8c0'); for (const d of [14, 56]) E(c, lerp(180, -90, k) + d, 155, 6, 6, '#141414'); return { z: 1.04, fx: 200, fy: 100 };
  }
};

/* ---- MRE: the first call — the bell; "もしもし？"; a small faraway voice: at the rubbish place; click; wind and crows (moves: ringing, the receiver, the dump at night) ---- */
const MRE = withCuts({
  name: '一本目の電話', ch: '一本目の電話', bgm: 'dread',
  init(S) { S.tPick = at(S, 'G1', 0) - 0.4; S.tCut = at(S, 'L9', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tCut) { if (t > at(S, 'L9x', 0) - 0.3) { dump(c, t, { night: true }); for (let i = 0; i < 3; i++) crow(c, 90 + i * 70, 64 + (i % 2) * 6, t, i); for (let i = 0; i < 12; i++) { const u = fr(t * 0.6 + i / 12); P(c, u * W, 50 + (i * 13) % 60, '#3c3c4c'); } return { z: 1.06, fx: 160, fy: 100 }; } newRoom(c, t, {}); atPhone(c, t, 210, { hold: true, scared: true, k: 'e2' }); if (t > S.tCut + 1) TX(c, 'ツー…', 140, 76, '#c8c8e0', 16, null); return { z: 1.3, fx: 200, fy: 108 }; }
    if (t > S.tPick) { newRoom(c, t, {}); atPhone(c, t, 210, { hold: true, k: 'e1', scared: t > at(S, 'L8', 0) }); return { z: 1.3, fx: 210, fy: 112 }; }
    newRoom(c, t, {}); atPhone(c, t, 210, { ring: true, k: 'e0' }); ringMarks(c, t, 196, 60);
    return { z: 1.12, fx: 200, fy: 110 };
  }
}, [['M2', MCLOSE], ['G1', GCLOSE]]);

/* ---- MRF: nearer — TV loud; the second call: the station; the station is on the way here; the third bell: the park she saw from the car (moves: TV flicker, places with a small shape under the lamp) ---- */
const MRF = withCuts({
  name: '近づく声', ch: '近づく声', bgm: 'dread',
  init(S) { S.tTV = at(S, 'L10x', 0) - 0.3; S.tRing2 = at(S, 'L11', 0) - 0.3; S.tSta = at(S, 'L12', 0) - 0.3; S.tNear = at(S, 'L12x', 0) - 0.3; S.tRing3 = at(S, 'L12y', 0) - 0.3; S.tPark = at(S, 'L12z', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tPark) { whereNow(c, t, 'park', { mx: 230, lamp: 100 }); plate(c, 40, 46, '公園', '#c8d0f0'); return { z: 1.06, fx: 180, fy: 104 }; }
    if (t > S.tRing3) { newRoom(c, t, {}); atPhone(c, t, 210, { ring: true, scared: true, k: 'f3' }); ringMarks(c, t, 196, 60); return { z: 1.12, fx: 200, fy: 110 }; }
    if (t > S.tNear) { R(c, 0, 0, W, H, '#0c0c14'); const pts = [['ゴミ捨て場', 40, 120], ['駅', 150, 90], ['家', 260, 60]]; L(c, 70, 124, 270, 70, '#3c3c5c', 2); pts.forEach(([n, x, y], i) => { E(c, x + 10, y + 4, 4, 4, i === 2 ? '#f8e8b0' : '#5c5c7c'); TX(c, n, x, y + 10, '#c8c8e0', 16, null); }); const k = sg(t, S.tNear + 0.5, S.tNear + 3); merryShadow(c, lerp(50, 160, k), lerp(124, 94, k), { s: 0.5 }); return { z: 1.04, fx: 160, fy: 96 }; }
    if (t > S.tSta) { whereNow(c, t, 'station', { mx: 160, lamp: 60 }); plate(c, 40, 46, '駅の前', '#c8d0f0'); return { z: 1.06, fx: 160, fy: 104 }; }
    if (t > S.tRing2) { newRoom(c, t, {}); atPhone(c, t, 210, { ring: true, k: 'f2' }); ringMarks(c, t, 196, 60); return { z: 1.12, fx: 200, fy: 110 }; }
    newRoom(c, t, {}); R(c, 60, 104, 50, 36, '#1c1c24'); R(c, 64, 108, 42, 26, Math.floor(t * 8) % 3 ? '#5c8cc8' : '#8cacd8'); glow(c, 85, 120, 40, 30, '#8cacd8', 0.25); person(c, GIRL, 140, 152, { k: 'tv', flip: true, blink: blinkOf(t, 4) }); if (t > S.tTV) for (let i = 0; i < 3; i++) { const u = fr(t * 1.5 + i / 3); c.save(); c.globalAlpha = 1 - u; TX(c, '♪', 110 + u * 30, 96 - u * 30 + i * 6, '#a8c8f8', 16, null); c.restore(); }
    return { z: 1.1, fx: 120, fy: 108 };
  }
}, [['M3', MC(1)], ['M3b', MC(1)]]);

/* ---- MRG: the cord she cannot pull; the third bell; the tobacco-shop corner, just steps away; lights on, curtains shut, a small shadow outside (moves: the hand at the cord, the corner, the curtain) ---- */
const MRG = withCuts({
  name: 'たばこ屋の角', ch: 'たばこ屋の角', bgm: 'dread',
  init(S) { S.tRing = at(S, 'L13x', 0) - 0.3; S.tCorner = at(S, 'L14', 0) - 0.3; S.tShut = at(S, 'L14x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tShut) { const shut = t > S.tShut + 1.2, sh = at(S, 'L14x', 2) - 0.3; newRoom(c, t, { lit: true, curtain: shut }); if (t > sh) { c.save(); c.globalAlpha = 0.6 * sg(t, sh, sh + 1); blit(c, tintSpr(merrySpr({}), '#2c0c18', 'mcur'), 84, 88, 11, 33, { s: 1.1 }); c.restore(); } person(c, GIRL, 150, 152, { k: 'gs', expr: 'shock', flip: !(t > sh), arm: shut ? null : 'up' }); return { z: 1.1, fx: 110, fy: 100 }; }
    if (t > S.tCorner) { whereNow(c, t, 'tabako', { mx: 150, lamp: 120 }); plate(c, 40, 46, 'たばこ屋さんの角', '#c8d0f0'); return { z: 1.06, fx: 170, fy: 104 }; }
    if (t > S.tRing) { newRoom(c, t, {}); atPhone(c, t, 210, { ring: true, scared: true, k: 'g3' }); ringMarks(c, t, 196, 60); return { z: 1.12, fx: 200, fy: 110 }; }
    newRoom(c, t, {}); R(c, 290, 116, 10, 12, '#d8d0c0'); R(c, 293, 119, 2, 4, '#141414'); R(c, 296, 119, 2, 4, '#141414'); R(c, 216, 104, 24, 6, '#6c5848'); R(c, 226, 110, 4, 28, '#5c4c3c'); kuroden(c, t, 210, 86, {}); for (let i = 0; i < 20; i++) P(c, 236 + i * 3, 108 + Math.sin(i * 0.8) * 2 + i * 0.5, '#141418'); person(c, GIRL, 272, 152, { k: 'gc', expr: 'shock', arm: Math.floor(t * 0.8) % 2 ? 'up' : null, flip: true }); return { z: 1.3, fx: 250, fy: 112 };
  }
}, [['M4', MC(2)]]);

/* ---- MRH: the turn — the next call does not come; the clock: five minutes, ten; relief; then the bell; "今、あなたの家の前にいるの" (moves: the clock hand, the girl's shoulders drop, the bell) ---- */
const MRH = withCuts({
  name: '鳴らない電話', ch: '鳴らない電話', bgm: 'eerie',
  init(S) { S.tClock = at(S, 'L16', 0) - 0.3; S.tRing = at(S, 'L16x', 1) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tRing) { newRoom(c, t, { lit: true, curtain: true }); atPhone(c, t, 210, { ring: true, scared: true, k: 'h2' }); ringMarks(c, t, 196, 60); return { z: 1.2, fx: 210, fy: 108 }; }
    if (t > S.tClock) { newRoom(c, t, { lit: true, curtain: true }); E(c, 160, 62, 14, 14, '#8c6c44'); E(c, 160, 62, 12, 12, '#f8f4e8'); const a = (t - S.tClock) * 0.9 - Math.PI / 2; L(c, 160, 62, 160 + Math.cos(a) * 10, 62 + Math.sin(a) * 10, '#141414'); L(c, 160, 62, 160 + Math.cos(a / 12 + 1) * 6, 62 + Math.sin(a / 12 + 1) * 6, '#141414', 2); person(c, GIRL, 130, 152, { k: 'hc', blink: blinkOf(t, 3), expr: t > at(S, 'L16', 3) ? 'normal' : 'shock' }); kuroden(c, t, 210, 86, {}); R(c, 216, 104, 24, 6, '#6c5848'); R(c, 226, 110, 4, 28, '#5c4c3c'); return { z: 1.06, fx: 160, fy: 96 }; }
    newRoom(c, t, { lit: true, curtain: true }); R(c, 216, 104, 24, 6, '#6c5848'); R(c, 226, 110, 4, 28, '#5c4c3c'); kuroden(c, t, 210, 86, {}); return { z: 1.8, fx: 225, fy: 100 };
  }
}, [['M5', MC(3)]]);

/* ---- MRI: she opens the door — the silent street; the lamp on a cold road; no one, not even a doll; a prank after all; the lock (moves: the door swings, the empty street, the lock turns) ---- */
const MRI = {
  name: '玄関の外', ch: '玄関の外', bgm: 'eerie',
  init(S) { S.tOut = at(S, 'L17x', 0) - 0.3; S.tLock = at(S, 'L18x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tLock) { R(c, 0, 0, W, H, '#3c3430'); R(c, 100, 20, 120, 130, '#5c4838'); R(c, 104, 24, 112, 122, '#6c5440'); const k = sg(t, S.tLock + 1.5, S.tLock + 2); R(c, 196, 84, 8, 12, '#c8b070'); R(c, lerp(204, 214, k), 88, 10, 4, '#a8a8a0'); person(c, GIRL, 150, 156, { k: 'il', flip: true }); return { z: 1.1, fx: 170, fy: 96 }; }
    if (t > S.tOut) { VG(c, 0, 0, W, 130, ['#04040c', '#0c0c1c', '#141428']); R(c, 0, 128, W, 62, '#1c1c24'); for (let i = 0; i < 6; i++) { const x = 20 + i * 56; R(c, x, 70, 44, 58, '#14141c'); R(c, x + 14, 84, 10, 10, i === 3 ? '#3c3c34' : '#0c0c14'); } for (let i = 0; i < 6; i++) R(c, 34 + i * 56, 84, 10, 10, i % 2 ? '#3c3828' : '#2c2c3c'); R(c, 0, 118, W, 10, '#2c2c3c'); lampPost(c, t, 170, 160); const ty = at(S, 'L18y', 0) - 0.3; if (t > ty) { const p = Math.sin((t - ty) * 0.8); R(c, 0, 0, 30, H, '#3c3430'); R(c, 290, 0, 30, H, '#3c3430'); person(c, GIRL, 160 + p * 4, 162, { k: 'ob', s: 1.2, flip: p < 0 }); return { z: 1.1, fx: 160 + p * 50, fy: 110 }; } return { z: 1.04 + 0.04 * sg(t, S.tOut, S.tLock), fx: 160, fy: 104 }; }
    R(c, 0, 0, W, H, '#3c3430'); R(c, 100, 20, 120, 130, '#04040c'); const k = eOut(sg(t, 0.6, 1.8)); R(c, 100, 20, lerp(120, 30, k), 130, '#6c5440'); person(c, GIRL, 150, 156, { k: 'io', arm: t < 1.8 ? 'up' : null });
    return { z: 1.1, fx: 160, fy: 96 };
  }
};

/* ---- MRJ: the last call — back in the room the bell; a shaking hand; the cold receiver; "わたし、メリーさん。" (pause) "今、あなたの後ろにいるの。" (moves: the hand trembles, the room darkens, two blue points behind her) ---- */
const MRJ = withCuts({
  name: '後ろ', ch: '最後の電話', bgm: 'dread',
  init(S) { S.tHold = at(S, 'L20', 0) - 0.3; S.tBehind = at(S, 'M7', 0) - 0.3; S.dur = lastSe(S) + 1.4; },
  draw(c, t, S) {
    if (t > S.tBehind) { newRoom(c, t, { lit: false, curtain: true }); dim(c, 0.55); merryShadow(c, 184, 140, { front: true, s: 0.9, eyes: sg(t, S.tBehind + 0.8, S.tBehind + 1.6) }); atPhone(c, t, 210, { hold: true, scared: true, k: 'j3' }); return { z: 1.5 + 0.3 * sg(t, S.tBehind, S.dur), fx: 190, fy: 116 }; }
    if (t > S.tHold) { newRoom(c, t, { lit: true, curtain: true }); atPhone(c, t, 210, { hold: t > S.tHold + 1.5, scared: true, k: 'j2' }); return { z: 1.4, fx: 210, fy: 112 }; }
    newRoom(c, t, { lit: true, curtain: true }); atPhone(c, t, 210, { ring: true, scared: true, k: 'j1' }); ringMarks(c, t, 196, 60);
    return { z: 1.12, fx: 200, fy: 110 };
  }
}, [['M6', MC(3)]]);
const MRH0 = { name: '振り返れば', bgm: null, init(S) { S.dur = 4.2; }, draw(c, t, S) { horrorCloseup(c, t, merryFace({ dark: true }), [[18, 23], [29, 23]], S.dur); return { z: 1, fx: 160, fy: 120, sx: t < 0.5 ? Math.round(Math.sin(t * 90) * 2) : 0 }; } };

/* ---- MRK: the story ends here — did she turn round? no one says; the real fear: each call nearer, and nothing to be done (moves: the receiver swinging on its cord in an empty room) ---- */
const MRK = {
  name: '話はここで終わる', ch: '終わらない話', bgm: 'eerie',
  init(S) { S.tFear = at(S, 'L21x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    newRoom(c, t, { lit: false, curtain: true }); R(c, 216, 104, 24, 6, '#6c5848'); R(c, 226, 110, 4, 28, '#5c4c3c'); kuroden(c, t, 210, 86, { off: true }); const sw = Math.sin(t * 2) * 6 * Math.exp(-t * 0.1); receiver(c, 222 + sw, 120, {}); L(c, 230, 104, 224 + sw, 120, '#2c2c34');
    if (t > S.tFear) { const ps = [['ゴミ捨て場', 44, 46], ['駅', 140, 46], ['公園', 176, 46], ['たばこ屋', 44, 72], ['家の前', 124, 72], ['後ろ', 230, 72]]; for (let i = 0; i < ps.length; i++) if (t > S.tFear + 0.5 + i * 0.9) plate(c, ps[i][1], ps[i][2], ps[i][0], i === ps.length - 1 ? '#f8a0a0' : '#c8d0f0'); }
    return { z: 1.2, fx: 200, fy: 100 };
  }
};

/* ---- MRL: many forms — a girl who died; she turned round; the call from inside the house; then the mobile age, unknown numbers (moves: three panels, a smartphone buzzing) ---- */
const MRL = {
  name: 'いくつもの形', ch: 'いくつもの形', bgm: 'memory',
  init(S) { S.tForms = at(S, 'L23', 0) - 0.3; S.tMobile = at(S, 'L24', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tMobile) { phoneTable(c, t, { ring: t > S.tMobile + 2 }); return { z: 1.2 + 0.2 * sg(t, S.tMobile, S.dur), fx: 160, fy: 96 }; }
    R(c, 0, 0, W, H, '#14101c');
    if (t > S.tForms) { const ns = ['亡くなった女の子', '振り返った', '家の中から']; for (let i = 0; i < 3; i++) { const SG = [0, 3, 5], tt = at(S, 'L23', SG[i]) - 0.3; if (t < tt) break; const x = 16 + i * 100; R(c, x, 40, 92, 80, '#2c2438'); R(c, x + 4, 44, 84, 72, '#241c34'); if (i === 0) merryShadow(c, x + 46, 104, { front: true, eyes: 0.7 }); if (i === 1) { merryShadow(c, x + 66, 108, { front: true, s: 0.7, eyes: 0.9 }); person(c, GIRL, x + 40, 112, { k: 'lf' + i, expr: 'shock', s: 0.8, flip: true }); } if (i === 2) { R(c, x + 20, 70, 50, 44, '#3c3430'); PF(c, [x + 14, 72, x + 45, 52, x + 76, 72], '#2c241c'); kuroden(c, t, x + 26, 88, { ring: true }); } if (t < (i < 2 ? at(S, 'L23', SG[i + 1]) - 0.3 : 1e9)) plate(c, 70, 128, ns[i], '#f8e8b0'); } return { z: 1.0, fx: 160, fy: 96 }; }
    for (let i = 0; i < 3; i++) { R(c, 60 + i * 70, 60, 50, 50, '#2c2438'); TX(c, '？', 78 + i * 70, 76, '#c8c8e0', 16, null); }
    return { z: 1.04, fx: 160, fy: 96 };
  }
};

/* ---- MRM: the children who heard it — hesitating at a ringing phone; the game of "わたし、メリーさん" (moves: a hand reaching and stopping, children laughing with toy phones) ---- */
const MRM = {
  name: '子どもたち', ch: '子どもたち', bgm: 'memory',
  init(S) { S.tGame = at(S, 'L25x', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tGame) { VG(c, 0, 0, W, 120, ['#8cb8e0', '#b8d0e0', '#e0e8e0']); R(c, 0, 116, W, 74, '#a89c7c'); for (let i = 0; i < 4; i++) { person(c, KIDS[i], 70 + i * 60, 156, { k: 'mg' + i, flip: i % 2 === 1, expr: i % 2 ? 'shock' : 'normal' }); if (i % 2 === 0) receiver(c, 74 + i * 60, 120); } plate(c, 80, 50, 'わたし、メリーさん', '#5c3c6c', '#f8f0e8'); return { z: 1.04, fx: 160, fy: 108 }; }
    R(c, 0, 0, W, H, '#c8b890'); R(c, 0, 0, W, 14, '#8c6c44'); R(c, 0, 124, W, 66, '#8c7c5c'); R(c, 30, 40, 70, 50, '#1c2034'); R(c, 60, 92, 70, 30, '#6c4c3c'); R(c, 150, 104, 50, 6, '#6c5848'); R(c, 172, 110, 4, 28, '#5c4c3c'); kuroden(c, t, 156, 86, { ring: true }); ringMarks(c, t, 150, 60); const rr = Math.floor(t * 0.9) % 2; person(c, KIDS[0], rr ? 136 : 120, 152, { k: 'mh', arm: rr ? 'up' : null, expr: 'shock' });
    return { z: 1.12, fx: 200, fy: 108 };
  }
};

/* ---- MRN: why does she come? — a grudge, or wanting to come home; old tools gain a soul; let a doll go with a thank-you (moves: Merry sitting alone, the girl bowing) ---- */
const MRN = {
  name: '人形の気持ち', ch: 'なぜ、やってくるのか', bgm: 'requiem',
  init(S) { S.tWhy = at(S, 'L27', 0) - 0.3; S.tSoul = at(S, 'L27x', 0) - 0.3; S.tThanks = at(S, 'L28', 0) - 0.3; S.dur = lastSe(S) + 1.2; },
  draw(c, t, S) {
    if (t > S.tThanks) { R(c, 0, 0, W, H, '#d8c8a0'); R(c, 0, 116, W, 74, '#b8b070'); R(c, 160, 90, 60, 6, '#8c6c44'); merry(c, 190, 90, { sit: true }); person(c, GIRL, 130, 152, { k: 'nt', blink: 2 }); plate(c, 40, 46, 'ありがとう', '#f8e8b0'); return { z: 1.1, fx: 170, fy: 104 }; }
    if (t > S.tSoul) { R(c, 0, 0, W, H, '#1c1814'); for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = 0.3 + 0.2 * Math.sin(t * 2 + i); glow(c, 85 + i * 75, 96, 30, 30, '#f8e8b0', 0.4); c.restore(); } PF(c, [64, 96, 85, 70, 106, 96], '#c84c3c'); L(c, 85, 96, 85, 116, '#8c6c44', 2); E(c, 85, 86, 4, 4, '#f8f0e0'); E(c, 85, 86, 2, 2, '#141414'); E(c, 160, 94, 4, 4, '#f8f0e0'); E(c, 160, 94, 2, 2, '#141414'); E(c, 160, 96, 12, 16, '#e8b040'); for (let k = 0; k < 4; k++) R(c, 148, 86 + k * 7, 24, 1, '#8c5c20'); R(c, 154, 78, 12, 3, '#2c2c2c'); R(c, 154, 112, 12, 3, '#2c2c2c'); E(c, 235, 104, 14, 11, '#5c5c64'); R(c, 230, 90, 10, 4, '#3c3c44'); L(c, 249, 102, 258, 94, '#5c5c64', 3); L(c, 222, 100, 216, 108, '#5c5c64', 3); R(c, 40, 116, 240, 6, '#3c3028'); return { z: 1.04, fx: 160, fy: 96 }; }
    dump(c, t, { night: t > S.tWhy }); merry(c, 160, 112, { faded: true, sit: true }); if (t > S.tWhy) { c.save(); c.globalAlpha = 0.6; TX(c, '…', 172, 70, '#c8c8e0', 16, null); c.restore(); }
    return { z: 1.06 + 1.2 * eOut(sg(t, 0.5, 4)), fx: 160, fy: 98 };
  }
};

/* ---- MRO: ending — if your phone rings tonight; "わたし、メリーさん。"; don't ask where she is; take a breath before you answer (moves: the smartphone lights, then fades) ---- */
const MRO = withCuts({
  name: '今夜の電話', ch: 'おわりに', bgm: 'ending',
  init(S) { S.tEnd = lastSe(S) + 1.0; S.dur = 1e9; },
  draw(c, t, S) {
    const t30 = at(S, 'L30', 0) - 0.3; phoneTable(c, t, { ring: t < t30 && t > 1.5 }); if (t > t30 && t < at(S, 'L30x', 0)) { c.save(); c.globalAlpha = sg(t, t30 + 1, t30 + 2); TX(c, '着信履歴', 128, 52, '#a8d8f8', 16, null); TX(c, 'メリーさん', 120, 70, '#f8a0a0', 16, null); c.restore(); } dim(c, 0.3 * sg(t, at(S, 'L30x', 0), at(S, 'L30x', 0) + 8));
    return { z: 1.2 + 0.4 * sg(t, t30, t30 + 20), fx: 160, fy: 96 };
  }
}, [['M8', MC(2)]]);

/* ---- SS1 / SS2: Short & TikTok bookends ---- */
const SS1 = { name: 'メリーさん', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.3; }, draw(c, t, S) { dump(c, t, { night: true }); merry(c, 160, 112, { faded: true, sit: true }); kuroden(c, t, 200, 100, { ring: true }); return { z: 1.4, fx: 176, fy: 100 }; } };
const SS2 = { name: '最初の夜', ch: '', bgm: 'dread', init(S) { S.dur = lastSe(S) + 0.2; }, draw(c, t, S) { newRoom(c, t, {}); atPhone(c, t, 210, { ring: t > 1.5, k: 's2' }); return { z: 1.12, fx: 200, fy: 110 }; } };
