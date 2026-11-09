/* ================= 記録 #006 ディアトロフ峠事件: story plan ================= */
const EXPR = {};
['M1', 'Y1', 'C0', 'L0', 'L1', 'L2', 'L3', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L15', 'L16', 'L20', 'L21', 'L22', 'L23', 'L24', 'L26', 'L29', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]); EXPR.T1 = [[0, 'normal']];
['C1', 'L4', 'L4b', 'L14', 'L17', 'L18', 'L19', 'L25', 'L27', 'L28'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { searcher: { name: '捜索隊の学生', bg: ['#2c2014', '#5c3c2c'] }, yudin: { name: 'ユーリー・ユーディン', bg: ['#14241c', '#2c4c3c'] } };
const HOOK = ['テントは内側から', '切り裂かれていた――'];
const PLAN_FULL = [
  { sc: QX, pre: 0.6, items: ['M1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: QA, pre: 1.0, items: ['L1', 0.6, 'L2'], tr: 'dither', td: 1.2 },
  { sc: QB, pre: 0.8, items: ['L3'], tr: 'dither', td: 1.0 },
  { sc: QC, pre: 0.6, items: ['L4', 1.2, 'L4b'], tr: 'dither', td: 1.2 },
  { sc: QD, pre: 0.8, items: ['L5', 0.6, 'L6', 0.6, 'L7', 0.5, 'Y1'], tr: 'dither', td: 1.0 },
  { sc: QE, pre: 1.2, items: ['L8'], tr: 'dither', td: 1.4 },
  { sc: QF, pre: 0.8, items: ['L9'], tr: 'blinds', td: 1.0 },
  { sc: QG, pre: 0.8, items: ['L10', 0.8, 'L11'], tr: 'white', td: 1.0 },
  { sc: QH, pre: 0.8, items: ['L12', 0.6, 'L13', 1.0, 'L14'], tr: 'dither', td: 1.2 },
  { sc: QI, pre: 0.6, items: ['L15'], tr: 'dither', td: 1.0 },
  { sc: QJ, pre: 0.8, items: ['L16', 0.8, 'L17'], tr: 'dither', td: 1.2 },
  { sc: QK, pre: 0.8, items: ['L18', 1.0, 'L19', 1.0, 'L20'], tr: 'blinds', td: 1.0 },
  { sc: QL, pre: 0.8, items: ['L21'], tr: 'dither', td: 1.2 },
  { sc: QM, pre: 0.8, items: ['L22'], tr: 'dither', td: 1.0 },
  { sc: QN, pre: 0.8, items: ['L23', 0.8, 'L24'], tr: 'dither', td: 1.0 },
  { sc: QO, pre: 0.8, items: ['L25'], tr: 'dither', td: 1.2 },
  { sc: QP, pre: 1.0, items: ['L26', 1.0, 'L27', 1.2, 'L28', 1.2, 'L29'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: QX, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: QG, pre: 0.2, items: ['L11'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.5 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: QX, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: QG, pre: 0.3, items: ['L10', 0.4, 'L11'], tr: 'white', td: 0.5 },
  { sc: QH, pre: 0.3, items: ['L12', 0.6, 'L14'], tr: 'dither', td: 0.6 },
  { sc: QK, pre: 0.3, items: ['L18', 0.6, 'L19'], tr: 'blinds', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_SHORT) : PLAN_FULL;
QX.sfx = (S, ev) => { ev(0.2, 'wind', 6); if (S.tCut < 1e8) { ev(S.tCut, 'sting'); for (let k = 0; k < 3; k++) ev(S.tCut + 0.2 + k * 0.25, 'stab'); } };
QA.sfx = (S, ev) => { ev(0.3, 'stamp'); ev(S.tMap, 'whoosh'); };
QB.sfx = (S, ev) => { ev(0.4, 'stamp'); ev(1.2, 'toll'); ev(S.tSki, 'wind', 4); };
QC.sfx = (S, ev) => { ev(S.tGo, 'wind', 4); };
QD.sfx = (S, ev) => { ev(0.3, 'type'); ev(S.tSlope, 'wind', 6); };
QE.sfx = (S, ev) => { ev(0.2, 'wind', 8); for (let k = 0; k < 5; k++) ev(0.6 + k * 0.8, 'heart'); ev(S.tOut, 'thunder'); ev(S.tOut + 0.1, 'sting'); };
QF.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.8 + k * 0.5, 'tick'); ev(S.tPlane, 'whoosh'); };
QG.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(S.tPrints, 'sting'); };
QH.sfx = (S, ev) => { ev(S.tBranch, 'creak'); ev(S.tThree, 'toll'); };
QI.sfx = (S, ev) => { ev(0.2, 'wind', 5); };
QJ.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.6 + k * 0.5, 'dig'); ev(S.tClothes, 'toll'); };
QK.sfx = (S, ev) => { ev(S.tBones, 'sting'); if (S.tGeiger < 1e8) for (let k = 0; k < 20; k++) ev(S.tGeiger + 0.3 + k * 0.17 + (k % 3) * 0.05, 'tick'); };
QL.sfx = (S, ev) => { ev(S.tBall, 'sting'); ev(S.tBall + 0.5, 'thunder'); };
QM.sfx = (S, ev) => { ev(S.tStamp, 'gavel'); ev(S.tStamp + 1.5, 'door'); };
QN.sfx = (S, ev) => { ev(0.4, 'whoosh'); for (let k = 0; k < 3; k++) ev(S.tTheory + k * 1.4, 'stamp'); };
QO.sfx = (S, ev) => { ev(0.3, 'stamp'); };
QP.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(S.tCand, 'toll'); ev(S.tEnd, 'end'); };
SS2.sfx = (S, ev) => { ev(0.2, 'wind', 3); ev(0.2, 'heart'); };
QP.bgmTrack = (S, tr) => { tr.fin = 3; };
QP.ending = true;
// people and the tent stand low on the slope: keep them above the dialog window
QX.wideDY = 28; QA.wideDY = (t, S) => (t > S.tMap ? 14 : 34); QB.wideDY = 34; QC.wideDY = 34; QD.wideDY = (t, S) => (t < S.tSlope ? 16 : 20); QE.wideDY = 20; QF.wideDY = 24; QG.wideDY = 28;
QH.wideDY = (t, S) => (t > S.tThree ? 24 : 36); QI.wideDY = 20; QJ.wideDY = 30; QK.wideDY = 12; QL.wideDY = 36; QM.wideDY = 10; QN.wideDY = 10; QO.wideDY = 30; QP.wideDY = (t, S) => (t > S.tCand ? 30 : 22); SS2.wideDY = 20;
function TITLE_DECO(c, t) { tent(c, 270, 222, { cut: true }); blizzard(c, t, 0.4); }
