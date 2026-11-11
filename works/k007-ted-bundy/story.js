/* ================= 記録 #007 テッド・バンディ: story plan ================= */
const EXPR = {};
['F1', 'F2', 'P1', 'B1', 'J1', 'C0', 'L0', 'L1', 'L2', 'L3', 'L5', 'L6', 'L7', 'L10', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L22', 'L23', 'L24', 'L25', 'L26', 'L27', 'L28', 'L31', 'L32', 'L33', 'L34', 'L35', 'L36', 'L39', 'S1', 'S2', 'W1'].forEach(id => EXPR[id] = [[0, 'normal']]); EXPR.T1 = [[0, 'normal']];
['C1', 'L4', 'L8', 'L9', 'L11', 'L12', 'L21', 'L29', 'L30', 'L37', 'L38'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { bundy: { name: 'テッド・バンディ', bg: ['#2c1c14', '#5c3c2c'] }, member: { name: '共和党の仲間', bg: ['#1c2440', '#3c4c7c'] }, woman: { name: '18歳の女性', bg: ['#1c2c3c', '#3c5c7c'] }, judge: { name: '裁判官', bg: ['#1c140c', '#4c3424'] } };
const HOOK = ['テッド・バンディ', 'ハンサムな殺人者――'];
const PLAN_FULL = [
  { sc: UX, pre: 0.6, items: ['F1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: UA, pre: 1.0, items: ['L1', 0.8, 'L2'], tr: 'dither', td: 1.2 },
  { sc: UB, pre: 0.8, items: ['L3', 0.8, 'L4'], tr: 'dither', td: 1.0 },
  { sc: UC, pre: 0.8, items: ['L5', 0.6, 'P1', 0.6, 'L6'], tr: 'dither', td: 1.0 },
  { sc: UD, pre: 0.8, items: ['L7', 0.8, 'L8', 1.2, 'L9'], tr: 'dither', td: 1.0 },
  { sc: UH, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: UE, pre: 1.0, items: ['L10', 1.0, 'L11', 0.8, 'L12'], tr: 'dither', td: 1.0 },
  { sc: UF, pre: 0.8, items: ['L13', 1.0, 'L14', 0.8, 'L15'], tr: 'dither', td: 1.0 },
  { sc: UG, pre: 0.8, items: ['L16', 0.8, 'L17'], tr: 'dither', td: 1.0 },
  { sc: UI, pre: 0.8, items: ['L18', 0.6, 'L19', 0.4, 'F2', 0.6, 'L20', 0.8, 'L21', 0.2, 'W1'], tr: 'blinds', td: 1.0 },
  { sc: UJ, pre: 0.8, items: ['L22', 0.8, 'L23'], tr: 'dither', td: 1.0 },
  { sc: UK, pre: 0.8, items: ['L24', 0.8, 'L25'], tr: 'dither', td: 1.0 },
  { sc: UL, pre: 0.8, items: ['L26', 0.8, 'L27'], tr: 'dither', td: 1.0 },
  { sc: UM, pre: 0.6, items: ['L28'], tr: 'dither', td: 1.0 },
  { sc: UN, pre: 0.8, items: ['L29', 1.2, 'L30', 1.0, 'L31'], tr: 'dither', td: 1.0 },
  { sc: UO, pre: 0.8, items: ['L32', 0.8, 'L33', 1.0, 'J1'], tr: 'blinds', td: 1.0 },
  { sc: UP, pre: 0.8, items: ['L34', 0.4, 'B1', 1.0, 'L35', 1.2, 'L36'], tr: 'dither', td: 1.2 },
  { sc: UQ, pre: 1.2, items: ['L37', 1.2, 'L38', 1.2, 'L39'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.5 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: UE, pre: 0.3, items: ['L10', 0.4, 'L12'], tr: 'dither', td: 0.5 },
  { sc: UI, pre: 0.3, items: ['F2', 0.4, 'L21'], tr: 'blinds', td: 0.5 },
  { sc: UL, pre: 0.3, items: ['L26', 0.3, 'L27'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+, CEO decision 2026-11-10): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
UX.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.3 + k * 0.5, 'step'); if (S.tDark < 1e8) { ev(S.tDark, 'heart'); ev(S.tDark + 0.9, 'clang'); ev(S.tDark + 0.9, 'sting'); } };
UA.sfx = (S, ev) => { ev(0.2, 'wind', 4); ev(S.tPhoto, 'flash'); ev(S.tPhoto + 1.4, 'stamp'); };
UB.sfx = (S, ev) => { ev(0.4, 'toll'); ev(S.tSteal + 1.2, 'sting'); };
UC.sfx = (S, ev) => { ev(S.tChange, 'sparkle'); ev(S.tPhone + 0.4, 'type'); ev(S.tMedal, 'shine'); };
UD.sfx = (S, ev) => { ev(S.tRing + 0.6, 'sparkle'); for (let k = 0; k < 4; k++) ev(S.tPhone + k * 1.0, 'tick'); ev(S.tStart, 'sting'); ev(S.tStart + 0.2, 'heart'); };
UE.sfx = (S, ev) => { ev(0.2, 'rain', 6); ev(1.4, 'creak'); ev(S.tScar, 'heart'); ev(S.tNext, 'wind', 3); ev(S.tFound, 'toll'); };
UF.sfx = (S, ev) => { ev(0.3, 'splash'); ev(S.tGone, 'sting'); ev(S.tCham, 'whoosh'); for (let k = 0; k < 4; k++) ev(S.tCham + 0.3 + k * 0.6, 'stamp'); };
UG.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(S.tUtah, 'whoosh'); ev(S.tLetter, 'stamp'); ev(S.tAgain, 'sting'); };
UI.sfx = (S, ev) => { ev(S.tCar, 'open'); ev(S.tDrive, 'door'); ev(S.tDrive + 0.3, 'whoosh'); ev(S.tCuff, 'clang'); ev(S.tCuff, 'sting'); ev(S.tRun, 'slam'); for (let k = 0; k < 8; k++) ev(S.tRun + 0.2 + k * 0.22, 'step'); };
UJ.sfx = (S, ev) => { ev(0.2, 'siren', 3); ev(S.tSent + 0.6, 'gavel'); ev(S.tCol, 'stamp'); };
UK.sfx = (S, ev) => { ev(0.3, 'stamp'); ev(S.tJump, 'whoosh'); ev(S.tJump + 0.7, 'thud'); ev(S.tCaught, 'clang'); };
UL.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(S.tSaw - 1.4 + k * 0.25, 'dig'); ev(S.tOut, 'wind', 5); ev(S.tOut + 3.4, 'door'); };
UM.sfx = (S, ev) => { for (let k = 0; k < 5; k++) ev(0.6 + k * 1.8, 'whoosh'); ev(S.tRoom, 'stamp'); };
UN.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(S.tSiren, 'siren', 4); ev(S.tGirl, 'toll'); ev(S.tStop, 'siren', 3); ev(S.tStop + 1.2, 'sting'); };
UO.sfx = (S, ev) => { ev(0.3, 'gavel'); for (let k = 0; k < 6; k++) ev(S.tLetters + 0.3 + k * 0.4, 'drop'); ev(S.tDeath + 0.3, 'gavel'); };
UP.sfx = (S, ev) => { ev(S.tTalk + 0.2, 'type'); ev(S.tChair, 'toll'); for (let k = 0; k < 6; k++) ev(S.tChair + 0.5 + k * 0.5, 'tick'); };
UQ.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(S.tCand, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { for (let k = 0; k < 5; k++) ev(0.1 + k * 0.45, 'step'); ev(2.7, 'clang'); ev(2.7, 'sting'); };
SS2.sfx = (S, ev) => { ev(0.2, 'heart'); };
UQ.bgmTrack = (S, tr) => { tr.fin = 3; };
UQ.ending = true;
// figures stand on the ground (y 150-172): keep them above the dialog window
UX.wideDY = 36; UA.wideDY = (t, S) => (t < S.tPhoto ? 30 : 16); UB.wideDY = (t, S) => (t < S.tSteal ? 40 : 30); UC.wideDY = (t, S) => (t > S.tMedal ? 14 : t > S.tPhone ? 26 : 40); UD.wideDY = (t, S) => (t > S.tStart ? 22 : t > S.tPhone ? 20 : 40);
UE.wideDY = (t, S) => (t > S.tFound ? 34 : t > S.tScar ? 18 : 34); UF.wideDY = (t, S) => (t > S.tCham ? 14 : t > S.tGirls ? 40 : 36); UG.wideDY = (t, S) => (t > S.tLetter ? 14 : 40); UI.wideDY = (t, S) => (t > S.tDrive ? 48 : 36);
UJ.wideDY = (t, S) => (t > S.tCol ? 20 : t > S.tSent ? 30 : 48); UK.wideDY = (t, S) => (t < S.tJump + 0.6 ? 20 : 42); UL.wideDY = (t, S) => (t > S.tOut ? 36 : 6); UM.wideDY = (t, S) => (t > S.tRoom ? 30 : 4); UN.wideDY = (t, S) => (t > S.tStop ? 48 : t > S.tGirl ? 30 : t > S.tSiren ? 52 : 26);
UO.wideDY = (t, S) => (t > S.tLetters && t < S.tDeath ? 40 : 22); UP.wideDY = (t, S) => (t > S.tMeal ? 24 : t > S.tChair ? 20 : 30); UQ.wideDY = 20; SS2.wideDY = 20;
function TITLE_DECO(c, t) { blit(c, vwSpr('#c8a46c'), 262, 222, 40, 35); cuffs(c, 226, 206, t, 1); }
