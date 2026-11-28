/* ================= 記録 #026 名張毒ぶどう酒事件: story plan ================= */
const EXPR = {};
['L29', 'L30', 'L32', 'L37'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { rojin: { name: '集落の老人', bg: ['#1c1810', '#4c4030'] }, ishi: { name: '医師会長', bg: ['#14181c', '#3c4448'] } };
const HOOK = ['名張毒ぶどう酒事件', '一審無罪、二審で逆転死刑'];
const PLAN_FULL = [
  { sc: QZ, pre: 0.8, items: ['C0', 1.1, 'C1', 1.3, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: QA, pre: 1.3, items: ['L1', 1.1, 'L2', 1.1, 'L3', 0.8, 'R1'], tr: 'dither', td: 1.0 },
  { sc: QB, pre: 1.3, items: ['L4', 1.1, 'L4b', 1.1, 'L5', 1.1, 'L5b'], tr: 'dither', td: 1.0 },
  { sc: QC, pre: 1.4, items: ['L6', 1.2, 'L7', 0.8, 'I1', 1.1, 'L8', 1.1, 'L9', 1.1, 'L9b'], tr: 'blinds', td: 0.8 },
  { sc: QD, pre: 1.3, items: ['L10', 1.1, 'L11', 1.1, 'L12', 1.1, 'L13', 1.1, 'L14', 1.2, 'L15', 1.2, 'L15b'], tr: 'dither', td: 1.0 },
  { sc: QE, pre: 1.3, items: ['L16', 1.1, 'L17', 1.1, 'L17b', 1.1, 'L18'], tr: 'dither', td: 1.0 },
  { sc: QF, pre: 1.3, items: ['L19', 1.1, 'L19b', 1.1, 'L20', 1.2, 'L21', 1.1, 'L21b'], tr: 'blinds', td: 1.0 },
  { sc: QG, pre: 1.3, items: ['L22', 1.4, 'L23', 1.2, 'L24', 1.8, 'L24b'], tr: 'dither', td: 0.8 },
  { sc: GH0, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: QH, pre: 1.4, items: ['L25', 1.1, 'L26', 1.1, 'L27', 1.2, 'L28'], tr: 'blinds', td: 1.2 },
  { sc: QI, pre: 1.3, items: ['L29', 1.2, 'L30', 1.2, 'L31', 1.2, 'L32'], tr: 'dither', td: 1.2 },
  { sc: QJ, pre: 1.3, items: ['L33', 1.1, 'L34', 1.2, 'L35'], tr: 'dither', td: 1.2 },
  { sc: QM, pre: 1.2, items: ['L36', 1.1, 'L36b', 1.2, 'L37', 1.2, 'L38'], tr: 'iris', td: 1.4 },
];
// Short / TikTok: S1 → the crown cap, not guilty, free → mid-hook T2 → the reversal, "Death." → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.1, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: QF, pre: 0.1, items: ['L19', 0.05, 'L19b', 0.05, 'L21', 0.05, 'L21b'], tr: 'dither', td: 0.3 },
  { sc: QG, pre: 0.1, items: ['L22', 0.15, 'T2', 0.15, 'L23', 0.3, 'L24b'], tr: 'dither', td: 0.2 },
  { sc: SS2, pre: 0.1, items: ['S2'], tr: 'dither', td: 0.2 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
QZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tFall < 1e8) for (let k = 0; k < 4; k++) ev(S.tFall + 0.4 + k * 0.5, 'thud'); if (S.tNum < 1e8) ev(S.tNum + 0.3, 'toll'); if (S.tPoison < 1e8) ev(S.tPoison + 0.3, 'sting'); if (S.tMan < 1e8) { ev(at(S, 'C2', 1) - 0.1, 'stamp'); ev(S.tDeath, 'stamp'); } if (S.tPrison < 1e8) ev(S.tPrison + 0.3, 'clang'); };
QA.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tMap < 1e8) ev(S.tMap + 0.3, 'tick'); if (S.tOld < 1e8) for (let k = 0; k < 3; k++) ev(S.tOld + 0.4 + k * 0.5, 'step'); };
QB.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.5 + k * 0.45, 'step'); ev(4.2, 'door'); if (S.tCount < 1e8) ev(S.tCount + 0.3, 'tick'); if (S.tAgenda < 1e8) for (let i = 0; i < 3; i++) ev(at(S, 'L4b', 1 + i) - 0.2, 'stamp'); if (S.tParty < 1e8) ev(S.tParty + 0.3, 'sparkle'); if (S.tShare < 1e8) ev(S.tShare + 0.4, 'drip'); };
QC.sfx = (S, ev) => { ev(0.3, 'sting'); ev(0.9, 'heart'); ev(1.7, 'heart'); if (S.tFive < 1e8) ev(S.tFive + 0.4, 'toll'); if (S.tDoc < 1e8) ev(S.tDoc + 0.3, 'siren'); if (S.tPaper < 1e8) ev(S.tPaper + 0.2, 'whoosh'); if (S.tTepp < 1e8) ev(S.tTepp + 0.3, 'sting'); if (S.tSmell < 1e8) ev(S.tSmell + 0.3, 'wind'); };
QD.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.5 + k * 0.6, 'tick'); if (S.tHim < 1e8) ev(S.tHim + 0.3, 'excl'); if (S.tWives < 1e8) ev(S.tWives + 0.3, 'toll'); if (S.tApr2 < 1e8) ev(S.tApr2 + 0.3, 'type'); if (S.tFlip < 1e8) ev(S.tFlip + 0.2, 'heart'); if (S.tConf < 1e8) ev(S.tConf + 0.3, 'sting'); if (S.tArrest < 1e8) ev(S.tArrest + 0.3, 'clang'); if (S.tKids < 1e8) ev(S.tKids + 0.3, 'wind'); };
QE.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tRiver < 1e8) ev(S.tRiver + 1.0, 'splash'); if (S.tFire < 1e8) ev(S.tFire + 0.2, 'crackle'); if (S.tSearch < 1e8) for (let k = 0; k < 3; k++) ev(S.tSearch + 0.5 + k * 1.1, 'splash'); if (S.tCount < 1e8) for (let k = 0; k < 5; k++) ev(S.tCount + 0.4 + k * 0.5, 'tick'); if (S.tDeny < 1e8) ev(S.tDeny + 0.3, 'heart'); };
QF.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tCap < 1e8) ev(S.tCap + 0.3, 'shine'); if (S.tTeeth < 1e8) ev(S.tTeeth + 0.3, 'snap'); if (S.tExp < 1e8) ev(S.tExp + 0.3, 'type'); if (S.tDef < 1e8) ev(S.tDef + 0.3, 'excl'); if (S.tVerdict < 1e8) { ev(S.tVerdict + 0.3, 'gavel'); ev(at(S, 'L21', 3) - 0.2, 'stamp'); } };
QG.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tHigh < 1e8) { ev(S.tHigh + 0.3, 'gavel'); ev(at(S, 'L23', 3) - 0.2, 'stamp'); } if (S.tFirst < 1e8) { ev(S.tFirst + 0.3, 'heart'); ev(S.tFirst + 1.3, 'heart'); } if (S.tDeath < 1e8) { ev(S.tDeath, 'stamp'); ev(S.tDeath + 0.3, 'toll'); } };
GH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
QH.sfx = (S, ev) => { ev(at(S, 'L25', 2) - 0.2, 'stamp'); if (S.tCell < 1e8) ev(S.tCell + 0.3, 'clang'); if (S.tRefused < 1e8) for (let i = 0; i < 4; i++) ev(S.tRefused + 0.3 + i * 0.4, 'stamp'); if (S.t05 < 1e8) { ev(S.t05 + 0.3, 'gavel'); ev(S.t05 + 1.0, 'sparkle'); } if (S.t06 < 1e8) ev(at(S, 'L28', 3) - 0.2, 'slam'); };
QI.sfx = (S, ev) => { ev(0.3, 'wind'); if (S.tMomD < 1e8) ev(S.tMomD + 0.3, 'toll'); if (S.tSonD < 1e8) ev(S.tSonD + 0.3, 'toll'); if (S.tHosp < 1e8) ev(S.tHosp + 0.3, 'heart'); if (S.tEnd < 1e8) ev(S.tEnd + 0.4, 'toll'); };
QJ.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tGlue < 1e8) ev(S.tGlue + 0.3, 'shine'); if (S.t24 < 1e8) for (let i = 0; i < 10; i++) ev(S.t24 + 0.4 + i * 0.2, 'stamp'); if (S.tDiss < 1e8) ev(S.tDiss + 0.3, 'excl'); if (S.tQ < 1e8) ev(S.tQ + 0.3, 'heart'); if (S.tStill < 1e8) ev(S.tStill + 0.3, 'wind'); };
QM.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); if (S.tV < 1e8) { ev(at(S, 'S1', 3) - 0.1, 'stamp'); ev(at(S, 'S1', 5) - 0.1, 'stamp'); } };
SS2.sfx = (S, ev) => { ev(0.2, 'wind'); };
QM.bgmTrack = (S, tr) => { tr.fin = 3; };
QM.ending = true;
[QZ, QA, QB, QC, QD, QE, QF, QG, GH0, QH, QI, QJ, QM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { person(c, OKUNISHI, 282, 230, { k: 'td' }); }
