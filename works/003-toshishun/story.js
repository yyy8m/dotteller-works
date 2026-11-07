/* ================= 文庫 #003 杜子春: story plan ================= */
const EXPR = {};
['L0', 'L1', 'L5', 'L6', 'L11', 'L12', 'L24', 'L25', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'smile']]);
['L2', 'L3', 'L4', 'L7', 'L8', 'L9', 'L10', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23'].forEach(id => EXPR[id] = [[0, 'normal']]);
['T1', 'T2', 'T3', 'T4', 'T5', 'T7', 'T8', 'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K8', 'J1', 'J2', 'E1', 'E2', 'M1'].forEach(id => EXPR[id] = [[0, 'normal']]);
EXPR.T6 = [[0, 'cry']]; EXPR.T7 = [[0, 'cry']]; EXPR.K7 = [[0, 'stern']];
const SPEAKERS_EXTRA = {
  toshi: { name: '杜子春', bg: ['#1c3c4c', '#2c5c6c'] }, tekkan: { name: '鉄冠子', bg: ['#3c3c34', '#5c5c4c'] },
  shinsho: { name: '神将', bg: ['#5c3c0c', '#8c5c1c'] }, enma: { name: '閻魔大王', bg: ['#3c0c0c', '#5c1414'] }, haha: { name: '母', bg: ['#3c2c4c', '#5c4c6c'] },
};
const HOOK = ['天地が裂けても', '声を出すな――'];
const PLAN_FULL = [
  { sc: S0, pre: 1.0, items: ['L0'], tr: 'fromBlack', td: 1.0 },
  { sc: ZA, pre: 1.0, items: ['L1', 0.5, 'L2', 0.5, 'T1'], tr: 'dither', td: 1.2 },
  { sc: ZB, pre: 0.4, items: ['L3', 0.4, 'K1', 0.3, 'T2', 0.4, 'K2', 0.5, 'L4'], tr: 'dither', td: 0.8 },
  { sc: ZC, pre: 0.6, items: ['L5'], tr: 'dither', td: 1.0 },
  { sc: ZD, pre: 0.4, items: ['L6'], tr: 'blinds', td: 0.8 },
  { sc: ZE, pre: 0.4, items: ['L7'], tr: 'dither', td: 0.8 },
  { sc: ZF, pre: 0.6, items: ['L8', 0.5, 'L9'], tr: 'dither', td: 1.0 },
  { sc: ZG, pre: 0.8, items: ['K3', 0.4, 'L10', 0.4, 'T3', 0.4, 'T4', 0.5, 'K4'], tr: 'dither', td: 1.0 },
  { sc: ZH, pre: 0.6, items: ['L11'], tr: 'white', td: 1.0 },
  { sc: ZI, pre: 0.8, items: ['L12', 0.5, 'K5', 0.4, 'T5'], tr: 'dither', td: 1.2 },
  { sc: ZJ, pre: 0.6, items: ['L13'], tr: 'dither', td: 0.8 },
  { sc: ZK, pre: 0.4, items: ['L14'], tr: 'white', td: 0.6 },
  { sc: ZL, pre: 0.6, items: ['L15', 0.4, 'J1', 0.4, 'L16', 0.4, 'J2', 0.5, 'L17'], tr: 'dither', td: 0.8 },
  { sc: ZM, pre: 0.8, items: ['L18', 0.4, 'E1'], tr: 'dither', td: 1.2 },
  { sc: ZN, pre: 0.4, items: ['L19'], tr: 'dither', td: 0.8 },
  { sc: ZO, pre: 0.6, items: ['L20', 0.4, 'E2', 0.4, 'L21', 0.6, 'L22'], tr: 'dither', td: 1.0 },
  { sc: ZP, pre: 0.4, items: ['M1', 0.8, 'L23', 0.3, 'T6'], tr: 'dither', td: 0.8 },
  { sc: ZQ, pre: 1.0, items: ['L24', 0.5, 'K6', 0.4, 'T7', 0.5, 'K7', 0.4, 'T8', 0.5, 'L25'], tr: 'irisWhite', td: 1.6 },
  { sc: ZR, pre: 1.0, items: ['K8'], tr: 'dither', td: 1.6 },
];
const PLAN_SHORT = [
  { sc: ZI, pre: 0.4, items: ['S1', 0.4, 'K5'], tr: 'fromBlack', td: 0.4 },
  { sc: ZL, pre: 0.3, items: ['J2'], tr: 'dither', td: 0.6 },
  { sc: ZO, pre: 0.3, items: ['E2', 0.4, 'S2'], tr: 'dither', td: 0.6 },
];
const PLAN = SHORT ? PLAN_SHORT : PLAN_FULL;
ZB.sfx = (S, ev) => { ev(S.tOld - 0.6, 'whoosh'); if (S.tShadow < 1e8) ev(S.tShadow + 1.5, 'sparkle'); if (S.tGone < 1e8) ev(S.tGone, 'whoosh'); };
ZC.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.5 + k * 0.6, 'dig'); ev(S.tGold, 'shine', 1.5); ev(S.tGold + 0.3, 'sparkle'); };
ZD.sfx = (S, ev) => { ev(0.4, 'sparkle'); };
ZE.sfx = (S, ev) => { ev(S.tPoor, 'wind', 3); };
ZF.sfx = (S, ev) => { ev(S.tOld - 0.4, 'whoosh'); ev(S.tGold, 'shine', 1.2); };
ZG.sfx = (S, ev) => { if (S.tStop < 1e8) ev(S.tStop, 'excl'); if (S.tReveal < 1e8) ev(S.tReveal, 'shine', 1.6); };
ZH.sfx = (S, ev) => { ev(S.tUp, 'whoosh'); ev(S.tUp + 0.6, 'wind', 4); };
ZI.sfx = (S, ev) => { ev(0.4, 'wind', 3); if (S.tLeave < 1e8) ev(S.tLeave, 'whoosh'); };
ZJ.sfx = (S, ev) => { ev(S.tTiger, 'sting'); ev(S.tJump, 'hit'); ev(S.tVanish, 'whoosh'); };
ZK.sfx = (S, ev) => { ev(0.2, 'rain', S.dur); ev(0.5, 'thunder'); ev(S.tFire - 0.3, 'thunder'); ev(S.tFire, 'burn', 1.4); };
ZL.sfx = (S, ev) => { ev(S.tGen, 'toll'); if (S.tArmy < 1e8) ev(S.tArmy, 'sting'); if (S.tStab < 1e8) { ev(S.tStab, 'stab'); ev(S.tStab + 0.3, 'thud'); } };
ZM.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(S.tPalace, 'toll'); };
ZN.sfx = (S, ev) => { ev(S.t1, 'hit'); ev(S.t2, 'burn', 2); ev(S.t3, 'whoosh'); };
ZO.sfx = (S, ev) => { ev(S.tHorse, 'step'); ev(S.tFace, 'sting'); if (S.tWhip < 1e8) for (let k = 0; k < 8; k++) ev(S.tWhip + 0.3 + k * 0.5, 'hit8'); };
ZP.sfx = (S, ev) => { if (S.tRun < 1e8) for (let k = 0; k < 5; k++) ev(S.tRun + k * 0.3, 'step'); if (S.tCry < 1e8) ev(S.tCry + 0.2, 'shine', 2); };
ZR.sfx = (S, ev) => { ev(0.6, 'sparkle'); ev(S.tEnd, 'end'); };
ZR.bgmTrack = (S, tr) => { tr.fin = 3; };
ZR.ending = true;
ZL.wideDY = 0; ZM.wideDY = 16; ZN.wideDY = 0; ZJ.wideDY = 8;
function TITLE_DECO(c, t) { // a red gate roof in the corner and peach petals
  PF(c, [250, 196, 286, 180, 322, 196], '#3c2c34'); R(c, 258, 194, 56, 8, '#a82c24');
  for (let i = 0; i < 8; i++) { const u = fr(t * 0.1 + i / 8); R(c, 240 + hash(i) * 80 + Math.sin(t + i) * 4, 150 + u * 70, 2, 2, '#f8c0d0'); }
}
