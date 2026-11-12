/* ================= 記録 #009 アンドレイ・チカチーロ: story plan ================= */
const EXPR = {};
['M1', 'B1', 'J1', 'C0', 'L0', 'L1', 'L3', 'L4', 'L5', 'L12', 'L13', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24', 'L25', 'L26', 'L27', 'L28', 'L29', 'L30', 'L31', 'L32', 'L35', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]); EXPR.T1 = [[0, 'normal']];
['C1', 'L2', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L14', 'L33', 'L34'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { burakov: { name: '捜査官 ヴィクトル・ブラコフ', bg: ['#141418', '#3c3c48'] }, bukha: { name: '精神科医 ブハノフスキー', bg: ['#1c140c', '#4c3424'] }, judge: { name: '裁判長', bg: ['#1c140c', '#4c3424'] } };
const HOOK = ['アンドレイ・チカチーロ', '12年、追われ続けた男――'];
const PLAN_FULL = [
  { sc: QX, pre: 0.8, items: ['M1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: QA, pre: 1.0, items: ['L1', 0.8, 'L2', 0.8, 'L3'], tr: 'dither', td: 1.2 },
  { sc: QB, pre: 0.8, items: ['L4', 0.8, 'L5', 0.8, 'L6'], tr: 'dither', td: 1.0 },
  { sc: QC, pre: 1.0, items: ['L7', 1.0, 'L8', 0.8, 'L9', 1.0, 'L10'], tr: 'dither', td: 1.2 },
  { sc: QH, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: QD, pre: 0.8, items: ['L11', 0.8, 'L12', 0.8, 'L13', 0.8, 'L14'], tr: 'dither', td: 1.0 },
  { sc: QE, pre: 0.8, items: ['L15', 0.8, 'L16', 0.6, 'L17'], tr: 'blinds', td: 1.0 },
  { sc: QF, pre: 0.8, items: ['L18', 0.6, 'L19', 0.8, 'L20'], tr: 'dither', td: 1.0 },
  { sc: QG, pre: 0.8, items: ['L21', 0.6, 'L22'], tr: 'dither', td: 1.0 },
  { sc: QI, pre: 0.8, items: ['L23', 0.6, 'L24', 1.0, 'L25', 0.8, 'L26'], tr: 'blinds', td: 1.0 },
  { sc: QJ, pre: 0.8, items: ['L27', 0.4, 'B1', 1.0, 'L28', 0.8, 'L29'], tr: 'dither', td: 1.0 },
  { sc: QK, pre: 0.8, items: ['L30', 0.6, 'J1', 1.0, 'L31'], tr: 'dither', td: 1.0 },
  { sc: QL, pre: 1.2, items: ['L32', 1.2, 'L33', 1.2, 'L34', 1.2, 'L35'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.5 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: QE, pre: 0.3, items: ['L15', 0.5, 'L16'], tr: 'blinds', td: 0.5 },
  { sc: QG, pre: 0.3, items: ['L22'], tr: 'dither', td: 0.5 },
  { sc: QI, pre: 0.3, items: ['L23'], tr: 'blinds', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+, CEO decision 2026-11-10): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
QX.sfx = (S, ev) => { ev(0.2, 'wind', 5); for (let k = 0; k < 8; k++) ev(0.8 + k * 0.5, 'step'); if (S.tFace < 1e8) ev(S.tFace, 'heart'); if (S.tStain < 1e8) ev(S.tStain + 0.4, 'sting'); };
QA.sfx = (S, ev) => { ev(0.2, 'wind', 5); ev(S.tWar, 'thunder'); ev(S.tWar + 0.3, 'burn', 4); ev(S.tBully, 'excl'); };
QB.sfx = (S, ev) => { ev(0.3, 'tick'); ev(S.tFam, 'flash'); ev(S.tBad, 'sting'); ev(S.tBad + 2.6, 'stamp'); };
QC.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(S.tRiver, 'siren', 2); ev(S.tOther, 'door'); ev(S.tDeath + 0.3, 'gavel'); ev(S.tOver + 0.4, 'stamp'); ev(S.tOver + 3, 'toll'); };
QD.sfx = (S, ev) => { ev(0.3, 'wind', 4); for (let k = 0; k < 7; k++) ev(1.2 + k * 0.7, 'drop'); ev(S.tTrip, 'whoosh'); ev(S.tOp, 'stamp'); ev(S.tFalse, 'heart'); };
QE.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.4 + k * 0.7, 'tick'); ev(S.tBag, 'clang'); ev(S.tBag, 'sting'); ev(S.tBlood, 'stamp'); ev(S.tBlood + 2.2, 'excl'); ev(S.tFree + 0.4, 'stamp'); };
QF.sfx = (S, ev) => { ev(0.3, 'tick'); for (let k = 0; k < 4; k++) ev(S.tProf + 0.6 + k * 1.6, 'type'); };
QG.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.4 + k * 0.35, 'step'); ev(S.tSmall + 1, 'heart'); };
QI.sfx = (S, ev) => { ev(0.3, 'heart'); ev(S.tNote, 'type'); ev(S.tFound, 'toll'); ev(S.tName, 'sting'); ev(S.tArrest, 'slam'); ev(S.tArrest + 0.3, 'clang'); };
QJ.sfx = (S, ev) => { ev(0.3, 'tick'); ev(S.tCry, 'breath'); ev(S.tBlood, 'stamp'); };
QK.sfx = (S, ev) => { ev(0.3, 'gavel'); ev(S.tDeath + 0.4, 'gavel'); };
QL.sfx = (S, ev) => { ev(0.3, 'toll'); ev(S.tShadow, 'wind', 4); ev(S.tCand, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'wind', 4); ev(1.5, 'sting'); };
SS2.sfx = (S, ev) => { ev(0.2, 'heart'); };
QL.bgmTrack = (S, tr) => { tr.fin = 3; };
QL.ending = true;
// people stand on the platform at y 150: keep them above the dialog window
QX.wideDY = (t, S) => (t > S.tStain ? 14 : 24); QA.wideDY = (t, S) => (t > S.tBully ? 40 : t > S.tWar ? 34 : 24); QB.wideDY = (t, S) => (t > S.tFam && t < S.tBad ? 10 : 30); QC.wideDY = (t, S) => (t > S.tOver ? 14 : t > S.tOther ? 36 : t > S.tRiver ? 40 : 24);
QD.wideDY = (t, S) => (t > S.tFalse ? 20 : t > S.tOp ? 14 : t > S.tLure ? 30 : t > S.tTrip ? 20 : 34); QE.wideDY = (t, S) => (t > S.tBlood ? 24 : t > S.tBag ? 24 : 30); QF.wideDY = (t, S) => (t > S.tProf ? 14 : 30);
QG.wideDY = (t, S) => (t > S.tSmall ? 20 : 26); QI.wideDY = (t, S) => (t > S.tArrest ? 34 : t > S.tName ? 14 : t > S.tFound ? 24 : t > S.tNote ? 14 : 26); QJ.wideDY = (t, S) => (t > S.tBlood ? 24 : t > S.tCry ? 0 : 26);
QK.wideDY = (t, S) => (t > S.tCry ? 40 : 16); QL.wideDY = (t, S) => (t < S.tShadow ? 14 : 30); SS2.wideDY = 24;
function TITLE_DECO(c, t) { trainCar(c, 172, 228, { lit: true }); }
