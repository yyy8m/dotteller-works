/* ================= 記録 #019 リチャード・ラミレス: story plan ================= */
const EXPR = {};
['L40', 'L41'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { ramirez: { name: 'リチャード・ラミレス', bg: ['#1c1410', '#4c3424'] } };
const HOOK = ['ナイト・ストーカー', '新聞の一面に、自分の顔――'];
const PLAN_FULL = [
  { sc: QZ, pre: 0.8, items: ['C0', 0.8, 'C1', 1.2, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: QA, pre: 1.0, items: ['L1', 0.6, 'L1b', 0.8, 'L2'], tr: 'dither', td: 1.0 },
  { sc: QB, pre: 0.8, items: ['L3', 0.6, 'L3b', 0.8, 'L4', 0.8, 'L5', 0.8, 'L6', 0.6, 'L6b'], tr: 'dither', td: 1.0 },
  { sc: QC, pre: 0.8, items: ['L7', 0.8, 'L8', 0.6, 'L8b'], tr: 'dither', td: 1.0 },
  { sc: QD, pre: 1.0, items: ['L9', 0.8, 'L10', 1.0, 'L10b'], tr: 'blinds', td: 1.0 },
  { sc: QE, pre: 0.8, items: ['L11', 0.8, 'L11b', 0.8, 'L12', 0.6, 'L12b', 0.8, 'L13', 0.8, 'L14', 0.6, 'L14b'], tr: 'dither', td: 1.0 },
  { sc: QF, pre: 0.8, items: ['L15', 0.6, 'L16', 0.8, 'L16b', 1.4, 'L16c', 0.8, 'L17'], tr: 'dither', td: 1.0 },
  { sc: QG, pre: 0.8, items: ['L18', 0.6, 'L18b', 0.8, 'L19', 0.8, 'L20'], tr: 'dither', td: 1.0 },
  { sc: QH, pre: 1.0, items: ['L21', 0.8, 'L21b', 0.6, 'L21c', 0.8, 'L22'], tr: 'blinds', td: 1.0 },
  { sc: QI, pre: 1.2, items: ['L23', 0.8, 'L23b', 0.8, 'L24', 0.6, 'L24b', 0.8, 'L25', 0.6, 'L25b', 1.4, 'L26', 1.0, 'L26b', 0.6, 'L26c', 0.8, 'L27'], tr: 'dither', td: 1.0 },
  { sc: QJ, pre: 1.0, items: ['L28', 0.6, 'L28b', 0.8, 'L29', 1.2, 'L29b'], tr: 'dither', td: 1.0 },
  { sc: QK, pre: 0.6, items: ['L30', 0.6, 'L30b', 0.6, 'L31', 0.8, 'L31b', 0.6, 'L32', 0.8, 'L32b', 0.8, 'L33', 0.4, 'V1', 0.4, 'V1b'], tr: 'dither', td: 1.0 },
  { sc: QL, pre: 0.8, items: ['L34', 0.6, 'L35', 0.6, 'L35b', 0.8, 'L36', 0.8, 'L37', 0.4, 'V2', 1.0, 'L38', 0.4, 'V3', 0.8, 'L38b'], tr: 'dither', td: 1.0 },
  { sc: QM, pre: 1.0, items: ['L39', 0.8, 'L40', 1.4, 'L41', 1.2, 'L42'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 (his face on the front page) → the press conference → he doesn't know → the store → the run → mid-hook T2 → the crowd turns on him → S2 (back at the register) loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: QI, pre: 0.3, items: ['L27'], tr: 'dither', td: 0.4 },
  { sc: QJ, pre: 0.3, items: ['L28b', 0.4, 'L29'], tr: 'dither', td: 0.4 },
  { sc: QK, pre: 0.3, items: ['L30', 0.4, 'L30b', 0.4, 'L31', 0.5, 'T2', 0.5, 'L31b'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
QZ.sfx = (S, ev) => { ev(0.3, 'door'); ev(1.2, 'type'); if (S.tPaper < 1e8) ev(S.tPaper + 0.3, 'heart'); if (S.tFace < 1e8) ev(S.tFace + 0.3, 'sting'); };
QA.sfx = (S, ev) => { ev(0.3, 'wind', 3); for (let k = 0; k < 5; k++) ev(1.2 + k * 1.1, 'tick'); if (S.t13 < 1e8) ev(S.t13 + 0.3, 'toll'); if (S.tSat < 1e8) ev(S.tSat + 0.3, 'sting'); };
QB.sfx = (S, ev) => { ev(0.3, 'wind', 2); if (S.tMass < 1e8) ev(S.tMass + 0.3, 'toll'); if (S.tSteal < 1e8) ev(S.tSteal + 0.4, 'snap'); if (S.tDevil < 1e8) ev(S.tDevil + 0.3, 'sting'); if (S.tPhoto < 1e8) for (let k = 0; k < 3; k++) ev(S.tPhoto + k * 0.3, 'flash'); };
QC.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tLA < 1e8) for (let k = 0; k < 6; k++) ev(S.tLA + 0.3 + k * 0.5, 'step'); if (S.tCar < 1e8) ev(S.tCar + 0.3, 'door'); };
QD.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tIn < 1e8) ev(S.tIn + 0.4, 'creak'); if (S.tKill < 1e8) { ev(S.tKill, 'stab'); ev(S.tKill + 0.2, 'sting'); } if (S.tPrint < 1e8) ev(S.tPrint + 0.3, 'shine'); };
QE.sfx = (S, ev) => { ev(at(S, 'L11', 3), 'gun'); if (S.tKey < 1e8) ev(S.tKey + 0.3, 'clang'); if (S.tKit < 1e8) ev(S.tKit + 0.6, 'gun'); if (S.tAve < 1e8) ev(at(S, 'L13', 2), 'gun'); if (S.tAmb < 1e8) ev(S.tAmb + 0.2, 'siren'); if (S.tSon < 1e8) ev(S.tSon + 0.4, 'door'); if (S.tName < 1e8) ev(S.tName + 0.2, 'type'); };
QF.sfx = (S, ev) => { for (let k = 0; k < 4; k++) ev(0.4 + k * 0.6, 'stamp'); if (S.tMon < 1e8) ev(S.tMon + 0.3, 'thud'); if (S.tStar < 1e8) ev(S.tStar + 0.1, 'sting'); if (S.tNS < 1e8) ev(S.tNS + 0.3, 'type'); };
QG.sfx = (S, ev) => { ev(0.4, 'gun'); ev(1.0, 'gun'); if (S.tVow < 1e8) ev(S.tVow + 0.3, 'toll'); if (S.tWall < 1e8) ev(S.tWall + 0.2, 'sting'); if (S.tLast < 1e8) { ev(S.tLast + 0.2, 'gun'); ev(S.tLast + 0.6, 'siren'); } };
QH.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tProf < 1e8) ev(S.tProf + 0.4, 'excl'); if (S.tTF < 1e8) for (let k = 0; k < 6; k++) ev(S.tTF + 0.3 + k * 0.4, 'step'); };
QI.sfx = (S, ev) => { ev(0.3, 'excl'); if (S.tLaser < 1e8) ev(S.tLaser + 0.3, 'shine'); if (S.tNEC < 1e8) ev(S.tNEC + 0.3, 'type'); if (S.tNight < 1e8) for (let k = 0; k < 6; k++) ev(S.tNight + 0.5 + k * 0.8, 'type'); if (S.tHit < 1e8) { ev(S.tHit, 'stamp'); ev(S.tHit + 0.2, 'sting'); } if (S.tPress < 1e8) for (let k = 0; k < 4; k++) ev(S.tPress + 0.4 + k * 0.5, 'flash'); };
QJ.sfx = (S, ev) => { ev(0.3, 'wind', 2); if (S.tStore < 1e8) ev(S.tStore + 0.3, 'door'); if (S.tSee < 1e8) { ev(S.tSee, 'sting'); ev(S.tSee + 0.4, 'heart'); } };
QK.sfx = (S, ev) => { for (let k = 0; k < 16; k++) ev(0.3 + k * 0.28, 'step'); if (S.tCar < 1e8) for (let k = 0; k < 3; k++) ev(S.tCar + 0.6 + k * 1.6, 'slam'); if (S.tRage < 1e8) { ev(S.tRage + 0.2, 'excl'); for (let k = 0; k < 14; k++) ev(S.tRage + 0.4 + k * 0.25, 'step'); } if (S.tCaught < 1e8) ev(S.tCaught + 0.6, 'hit'); if (S.tDep < 1e8) ev(S.tDep + 0.2, 'siren'); };
QL.sfx = (S, ev) => { ev(0.3, 'gavel'); if (S.tPalm < 1e8) ev(S.tPalm + 0.3, 'sting'); if (S.tVerd < 1e8) { ev(S.tVerd + 0.3, 'gavel'); ev(at(S, 'L36', 2), 'stamp'); } if (S.tLaugh < 1e8) for (let k = 0; k < 4; k++) ev(S.tLaugh + 0.3 + k * 0.4, 'flash'); };
QM.sfx = (S, ev) => { ev(0.3, 'door'); ev(0.6, 'clang'); if (S.tDeath < 1e8) ev(S.tDeath + 0.4, 'stamp'); if (S.tEnd2 < 1e8) ev(S.tEnd2 + 0.3, 'wind', 4); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(0.6, 'heart'); };
SS2.sfx = (S, ev) => { ev(0.3, 'door'); };
QM.bgmTrack = (S, tr) => { tr.fin = 3; };
QM.ending = true;
[QZ, QA, QB, QC, QD, QE, QF, QG, QH, QI, QJ, QK, QL, QM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { blit(c, modFig(RICH, { k: 'td' }), 282, 230, FIG_AX2, FIG_AY2, {}); }
