/* ================= 記録 #001 エド・ゲイン: story plan (full ≈ 7.5 min / short ≈ 60 s) ================= */
const EXPR = {};
['L0', 'L1', 'L2', 'L4', 'L9', 'L10', 'L11', 'L13', 'L14', 'L17', 'L19', 'L20', 'L21', 'L26', 'L27', 'L28', 'L29', 'L30', 'L31', 'L33', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]);
['L3', 'L5', 'L6', 'L7', 'L8', 'L12', 'L15', 'L18', 'L22', 'L23', 'L24', 'L25', 'L32'].forEach(id => EXPR[id] = [[0, 'sad']]);
EXPR.L16 = [[0, 'normal'], [2, 'surp']]; EXPR.L22 = [[0, 'normal'], [3, 'surp'], [4, 'sad']]; EXPR.L23 = [[0, 'surp'], [2, 'sad']];
['A1', 'F1', 'N26', 'L6b', 'C1'].forEach(id => EXPR[id] = [[0, 'normal']]); ['G1', 'G2', 'G3', 'G4'].forEach(id => EXPR[id] = [[0, 'blank']]); EXPR.G3 = [[0, 'smile']];
const SPEAKERS_EXTRA = { gein: { name: 'エド・ゲイン', bg: ['#2c1414', '#4c2424'] }, augusta: { name: '母 アウグスタ', bg: ['#14141c', '#2c2c3c'] },
  frank: { name: '保安官代理 フランク', bg: ['#1c2c1c', '#2c3c2c'] }, schley: { name: '保安官', bg: ['#1c2030', '#2c3448'] } };
const HOOK = ['ホラー映画の殺人鬼の陰に', '実在の男がいた'];
const PLAN_FULL = [
  { sc: S0, pre: 1.0, items: ['L0'], tr: 'fromBlack', td: 1.0 },
  { sc: SA, pre: 0.8, items: ['L1'], tr: 'dither', td: 1.0 },
  { sc: SB, pre: 1.0, items: ['L2', 0.5, 'L3'], tr: 'dither', td: 1.2 },
  { sc: SC, pre: 0.6, items: ['L4', 0.5, 'L5', 0.4, 'A1'], tr: 'dither', td: 1.0 },
  { sc: SD, pre: 0.8, items: ['L6', 0.3, 'G1', 0.3, 'L6b', 0.4, 'L7', 0.8, 'L8'], tr: 'dither', td: 1.2 },
  { sc: SE, pre: 0.8, items: ['L9', 0.6, 'L10'], tr: 'blinds', td: 1.0 },
  { sc: SF, pre: 1.2, items: ['L11', 0.4, 'L12', 0.4, 'L13'], tr: 'dither', td: 1.2 },
  { sc: SG, pre: 1.0, items: ['L14', 0.8, 'L15', 0.8, 'L16', 0.3, 'G2'], tr: 'white', td: 1.0 },
  { sc: SH, pre: 1.0, items: ['L17'], tr: 'dither', td: 1.2 },
  { sc: SI, pre: 0.6, items: ['L18'], tr: 'blinds', td: 0.8 },
  { sc: SJ, pre: 0.8, items: ['L19', 0.3, 'F1', 0.6, 'L20'], tr: 'dither', td: 1.0 },
  { sc: SK, pre: 0.8, items: ['L21', 0.8, 'L22', 0.5, 'C1'], tr: 'white', td: 1.0 },
  { sc: SX, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: SL, pre: 1.0, items: ['L23', 0.8, 'L24', 0.8, 'L25'], tr: 'dither', td: 1.0 },
  { sc: SM, pre: 1.0, items: ['L26', 0.4, 'N26', 0.2, 'G3', 0.6, 'L27'], tr: 'dither', td: 1.2 },
  { sc: SN, pre: 0.8, items: ['L28', 0.4, 'G4', 0.6, 'L29'], tr: 'dither', td: 1.0 },
  { sc: SO, pre: 0.8, items: ['L30', 0.4, 'L31'], tr: 'iris', td: 1.2 },
  { sc: SP, pre: 1.6, items: ['L32', 1.0, 'L33'], tr: 'dither', td: 1.8 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.4, items: ['S1'], tr: 'fromBlack', td: 0.4 },
  { sc: SI, pre: 0.3, items: ['L18'], tr: 'blinds', td: 0.6 },
  { sc: SK, pre: 0.3, items: ['L22', 0.3, 'C1'], tr: 'white', td: 0.6 },
  { sc: SS2, pre: 0.4, items: ['S2'], tr: 'dither', td: 0.6 },
];
const PLAN = SHORT ? PLAN_SHORT : PLAN_FULL;
SA.sfx = (S, ev) => { S.f.forEach(t => ev(t, 'whoosh')); ev(S.tReal, 'sting'); };
SB.sfx = (S, ev) => { ev(S.tY + 0.1, 'stamp'); ev(S.tSin, 'toll'); for (let i = 0; i < 4; i++) ev(S.tSin + 0.6 + i * 0.9, 'thump'); };
SC.sfx = (S, ev) => { ev(S.tY + 0.1, 'stamp'); ev(S.tSchool + 1, 'excl'); };
SD.sfx = (S, ev) => { ev(0.3, 'stamp'); ev(S.tFire, 'burn', 5); ev(S.tFire + 0.2, 'stamp'); ev(S.tQ, 'sting'); ev(S.tMom + 0.2, 'stamp'); ev(S.tAlone, 'wind', 4); };
SE.sfx = (S, ev) => { for (let i = 0; i < 6; i++) ev(S.tBoard + 0.3 + i * (S.tRoom - S.tBoard - 0.4) / 6, 'hit'); ev(S.tBooks, 'whoosh'); };
SF.sfx = (S, ev) => { ev(0.3, 'wind', 4); for (let k = 0; k < 8; k++) ev(S.tDig + k * 0.45, 'dig'); ev(S.tCount, 'toll'); };
SG.sfx = (S, ev) => { ev(S.tEnter, 'creak'); ev(S.tAim, 'heart'); ev(S.tShot, 'gun'); ev(S.tShot + 0.5, 'thud'); ev(S.tAfter + 1.0, 'drop'); };
SH.sfx = (S, ev) => { ev(1.5, 'gun'); ev(4.5, 'gun'); };
SI.sfx = (S, ev) => { ev(S.tShot - 0.5, 'heart'); ev(S.tShot, 'gun'); ev(S.tShot + 0.5, 'thud'); ev(S.tEmpty, 'sting'); };
SJ.sfx = (S, ev) => { ev(0.5, 'excl'); ev(S.tSlip, 'whoosh'); };
SK.sfx = (S, ev) => { if (S.has21) ev(0.6, 'slam'); ev(S.tShed, 'creak'); ev(S.tReveal, 'sting'); for (let k = 0; k < 6; k++) ev(S.tReveal + 0.8 + k * 1.1, 'drop'); ev(S.tShock, 'heart'); };
SL.sfx = (S, ev) => { S.it.forEach(t => ev(t, 'heart')); if (S.tBag < 1e8) ev(S.tBag + 1.4, 'sting'); };
SM.sfx = (S, ev) => { ev(0.2, 'stamp'); ev(S.tFire, 'burn', S.tCar - S.tFire); };
SN.sfx = (S, ev) => { ev(0.2, 'stamp'); ev(S.tGavel, 'gavel'); ev(S.tY + 1.6, 'toll'); };
SO.sfx = (S, ev) => { ev(S.tBook, 'whoosh'); ev(S.tFilm, 'whoosh'); S.f.forEach(t => ev(t, 'whoosh')); };
SP.sfx = (S, ev) => { ev(0.5, 'toll'); ev(S.tEnd, 'toll'); };
SS1.sfx = (S, ev) => { ev(S.tFace, 'sting'); };
SS2.sfx = (S, ev) => { ev(lastSe(S) - 1.4, 'stamp'); };
SX.sfx = (S, ev) => { ev(0.25, 'sting'); for (let k = 0; k < 4; k++) ev(0.9 + k * 0.75, 'heart'); };
SP.bgmTrack = (S, tr) => { tr.fin = 3; };
SP.ending = true;
/* title screen decoration: the farmhouse in the snow */
function TITLE_DECO(c, t) {
  moon(c, 270, 66, 9, t);
  const g = cached('ttlFarm', () => { const [cv, x] = mk(W, 70); house(x, 196, 66, 56, 40, { wall: '#1c2030', wall2: '#141824', roof: '#0c1018', rh: 18, snow: true, windows: [[6, 22, true], [42, 4, false]] }); for (const [bx, h, sd] of [[180, 50, 3], [270, 44, 8]]) bareTree(x, bx, 66, h, sd, '#0c1018'); return cv; });
  c.drawImage(g, 0, 150); R(c, 0, 216, W, 24, K.snow2); R(c, 0, 214, W, 3, K.snow1);
  snowfall(c, t, 40, 21, 8, 12);
}
/* widescreen: how far the picture is shifted up above the dialog window (default 24) */
SE.wideDY = 0; SJ.wideDY = 6; SL.wideDY = 0;
SS1.tallFit = true;
