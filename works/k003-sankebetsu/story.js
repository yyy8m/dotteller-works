/* ================= 記録 #003 三毛別羆事件: story plan ================= */
const EXPR = {};
['C0', 'L2b', 'L15b', 'L0', 'L1', 'L2', 'L3', 'L6', 'L8', 'L10', 'L11', 'L12', 'L17', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24', 'L25', 'L26', 'L27', 'L28', 'L29', 'L31', 'S1', 'S2', 'S01', 'Y01', 'K01'].forEach(id => EXPR[id] = [[0, 'normal']]);
['L4', 'L5', 'L7', 'L9', 'L13', 'L14', 'L15', 'L16', 'L18', 'L30'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { saburo: { name: '太田三郎', bg: ['#3c2c1c', '#5c4430'] }, yayo: { name: '明景ヤヨ', bg: ['#3c2434', '#5c3c4c'] }, suga: { name: '討伐隊長 菅', bg: ['#141a28', '#2c3448'] } };
const HOOK = ['窓を突き破ってきたのは', '1頭のヒグマだった'];
const PLAN_FULL = [
  { sc: KF, pre: 0.6, items: ['C0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: KA, pre: 1.0, items: ['L1'], tr: 'dither', td: 1.2 },
  { sc: KB, pre: 0.6, items: ['L2', 0.6, 'L2b'], tr: 'dither', td: 1.0 },
  { sc: KC, pre: 0.8, items: ['L3', 0.6, 'S01', 1.2, 'L4', 1.0, 'L5'], tr: 'dither', td: 1.2 },
  { sc: KD, pre: 0.6, items: ['L6', 0.6, 'L7'], tr: 'dither', td: 1.0 },
  { sc: KE, pre: 0.8, items: ['L8', 0.5, 'L9', 0.6, 'L10'], tr: 'dither', td: 1.0 },
  { sc: KF, pre: 0.8, items: ['L11', 0.5, 'L12', 0.2, 'Y01', 0.4, 'L13'], tr: 'dither', td: 0.8 },
  { sc: KG, pre: 1.0, items: ['L14', 1.4, 'L15'], tr: 'dither', td: 1.4 },
  { sc: KH, pre: 0.8, items: ['L15b', 0.5, 'L16'], tr: 'dither', td: 1.0 },
  { sc: KI, pre: 0.8, items: ['L17', 0.6, 'L18'], tr: 'blinds', td: 1.0 },
  { sc: KX, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: KJ, pre: 0.6, items: ['L19'], tr: 'dither', td: 1.0 },
  { sc: KK, pre: 0.8, items: ['L20', 0.8, 'K01', 1.0, 'L21'], tr: 'dither', td: 1.0 },
  { sc: KL, pre: 0.8, items: ['L22', 0.6, 'L23'], tr: 'white', td: 1.0 },
  { sc: KM, pre: 0.8, items: ['L24', 1.0, 'L25'], tr: 'dither', td: 1.0 },
  { sc: KN, pre: 0.8, items: ['L26'], tr: 'dither', td: 1.2 },
  { sc: KO, pre: 0.8, items: ['L27', 0.6, 'L28'], tr: 'dither', td: 1.0 },
  { sc: KP, pre: 1.0, items: ['L29', 1.0, 'L30', 1.2, 'L31'], tr: 'dither', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: KF, pre: 0.4, items: ['S1', 0.2, 'Y01'], tr: 'fromBlack', td: 0.4 },
  { sc: KM, pre: 0.3, items: ['L24'], tr: 'dither', td: 0.6 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.6 },
];
const PLAN = SHORT ? PLAN_SHORT : PLAN_FULL;
KA.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(0.4, 'stamp'); };
KB.sfx = (S, ev) => { ev(S.tBear, 'step'); ev(S.tBear + 1, 'step'); if (S.tShot < 1e8) ev(S.tShot, 'gun'); };
KC.sfx = (S, ev) => { ev(0.5, 'door'); ev(S.tNear + 1, 'sting'); ev(S.tWin, 'wind', 3); };
KD.sfx = (S, ev) => { ev(S.tBear, 'sting'); ev(S.tShot, 'gun'); for (let k = 0; k < 3; k++) ev(S.tShot + 0.6 + k * 0.4, 'tick'); if (S.tFir < 1e8) ev(S.tFir, 'toll'); };
KE.sfx = (S, ev) => { ev(S.tBurst, 'slam'); ev(S.tBurst + 0.1, 'hit'); ev(S.tBurst + 0.2, 'sting'); };
KF.sfx = (S, ev) => { ev(S.tBurst - 0.5, 'thump'); ev(S.tBurst, 'slam'); ev(S.tBurst + 0.05, 'hit'); ev(S.tBurst + 0.2, 'sting'); for (let k = 0; k < 4; k++) ev(S.tDark + 0.4 + k * 0.8, 'heart'); };
KG.sfx = (S, ev) => { ev(0.6, 'toll'); };
KH.sfx = (S, ev) => { ev(S.tFire, 'burn', 4); ev(S.tBear, 'heart'); };
KI.sfx = (S, ev) => { ev(0.4, 'stamp'); if (S.tBear < 1e8) for (let k = 0; k < 4; k++) ev(S.tBear + k * 0.5, 'heart'); };
KX.sfx = (S, ev) => { ev(0.25, 'sting'); ev(2.2, 'thunder'); for (let k = 0; k < 4; k++) ev(0.9 + k * 0.75, 'heart'); };
KJ.sfx = (S, ev) => { ev(0.4, 'wind', 5); for (let k = 0; k < 5; k++) ev(1 + k * 1.6, 'slam'); };
KK.sfx = (S, ev) => { ev(S.tMove, 'sting'); if (S.tFire < 1e8) for (let k = 0; k < 4; k++) ev(S.tFire + k * 0.12, 'gun'); };
KL.sfx = (S, ev) => { ev(0.4, 'wind', 3); if (S.tHunter < 1e8) for (let k = 0; k < 8; k++) ev(S.tHunter + k * 0.5, 'step'); };
KM.sfx = (S, ev) => { ev(S.tShot1, 'gun'); ev(S.tStand, 'sting'); ev(S.tShot2, 'gun'); ev(S.tShot2 + 0.5, 'thud'); };
KN.sfx = (S, ev) => { ev(S.tStorm, 'wind', 6); };
KO.sfx = (S, ev) => { ev(0.4, 'type'); };
KP.sfx = (S, ev) => { ev(S.tCand, 'toll'); ev(S.tEnd, 'end'); };
SS2.sfx = (S, ev) => { ev(0.3, 'sting'); ev(2, 'thunder'); };
KP.bgmTrack = (S, tr) => { tr.fin = 3; };
KP.ending = true;
KK.wideDY = 8; KF.wideDY = 20;
function TITLE_DECO(c, t) { for (let i = 0; i < 5; i++) fir(c, 230 + i * 18, 228, 40 + (i % 2) * 10, 'night', Math.sin(t + i)); snowfall(c, t, 20, 51, 3, 8, '#c8d0e0'); }
