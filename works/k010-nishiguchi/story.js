/* ================= 記録 #010 西口彰事件: story plan ================= */
const EXPR = {};
['N1', 'G1', 'K1', 'C0', 'L0', 'L1', 'L2', 'L4', 'L5', 'L6', 'L8', 'L9', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L25', 'L26', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]); EXPR.T1 = [[0, 'normal']];
['C1', 'L3', 'L7', 'L10', 'L24'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { nishi: { name: '弁護士を名乗る男', bg: ['#14141c', '#3c3c4c'] }, girl: { name: '小学5年生の娘', bg: ['#1c1018', '#5c3c4c'] }, officer: { name: '警察の要職を務めた人', bg: ['#0c1428', '#2c3c5c'] } };
const HOOK = ['西口彰事件', '少女だけが、見抜いた――'];
const PLAN_FULL = [
  { sc: JX, pre: 0.8, items: ['N1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: JA, pre: 1.0, items: ['L1', 0.8, 'L2'], tr: 'dither', td: 1.2 },
  { sc: JB, pre: 1.0, items: ['L3', 1.0, 'L4'], tr: 'dither', td: 1.2 },
  { sc: JZ, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: JC, pre: 0.8, items: ['L5', 0.8, 'L6'], tr: 'dither', td: 1.0 },
  { sc: JD, pre: 1.0, items: ['L7'], tr: 'dither', td: 1.2 },
  { sc: JE, pre: 0.8, items: ['L8', 0.8, 'L9', 1.0, 'L10'], tr: 'blinds', td: 1.0 },
  { sc: JF, pre: 1.0, items: ['L11', 0.8, 'L12', 1.0, 'L13', 0.4, 'G1', 0.8, 'L14'], tr: 'dither', td: 1.2 },
  { sc: JG, pre: 0.8, items: ['L15', 1.0, 'L16'], tr: 'dither', td: 1.0 },
  { sc: JH, pre: 0.8, items: ['L17', 1.0, 'L18', 0.4, 'K1'], tr: 'blinds', td: 1.0 },
  { sc: JI, pre: 0.8, items: ['L19', 1.0, 'L20', 1.0, 'L21'], tr: 'dither', td: 1.0 },
  { sc: JJ, pre: 1.0, items: ['L22', 1.0, 'L23', 1.2, 'L24', 1.2, 'L25', 1.2, 'L26'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.5 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: JC, pre: 0.3, items: ['L5'], tr: 'dither', td: 0.5 },
  { sc: JE, pre: 0.3, items: ['L8'], tr: 'blinds', td: 0.5 },
  { sc: JF, pre: 0.3, items: ['L12', 0.5, 'L13', 0.3, 'G1'], tr: 'dither', td: 0.5 },
  { sc: JG, pre: 0.3, items: ['L15'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+, CEO decision 2026-11-10): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
JX.sfx = (S, ev) => { ev(0.2, 'wind', 4); for (let k = 0; k < 6; k++) ev(0.5 + k * 0.6, 'step'); if (S.tGirl < 1e8) { ev(S.tGirl, 'heart'); ev(S.tGirl + 1.4, 'sting'); } };
JA.sfx = (S, ev) => { ev(0.3, 'toll'); for (let k = 0; k < 4; k++) ev(S.tRec + 0.4 + k * 0.5, 'type'); ev(S.tRec + 2.6, 'stamp'); };
JB.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(1.0, 'siren', 2); ev(S.tPass, 'toll'); ev(S.tWanted, 'stamp'); ev(S.tNation, 'whoosh'); };
JC.sfx = (S, ev) => { ev(0.2, 'splash'); ev(0.4, 'wind', 5); ev(S.tShoes, 'sting'); ev(S.tRun, 'whoosh'); ev(S.tRun - 0.3, 'stamp'); };
JD.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(2, 'toll'); };
JE.sfx = (S, ev) => { ev(0.3, 'shine'); for (let k = 0; k < 4; k++) ev(S.tMap + 0.4 + k * 0.6, 'stamp'); ev(S.tTokyo, 'siren', 2); ev(S.tFive, 'toll'); };
JF.sfx = (S, ev) => { ev(0.3, 'door'); ev(S.tMeet, 'step'); ev(S.tGirl, 'heart'); ev(S.tPhoto, 'sting'); ev(S.tClass + 1.2, 'excl'); };
JG.sfx = (S, ev) => { ev(0.3, 'tick'); ev(S.tQ1, 'excl'); ev(S.tQ2, 'excl'); for (let k = 0; k < 4; k++) ev(S.tCall + k * 0.5, 'tick'); };
JH.sfx = (S, ev) => { ev(0.3, 'siren', 3); ev(1.2, 'slam'); ev(1.4, 'clang'); };
JI.sfx = (S, ev) => { ev(0.3, 'gavel'); for (let k = 0; k < 3; k++) ev(0.6 + k * 1.0, 'stamp'); ev(S.tMedal, 'clang'); ev(S.tDeath + 0.3, 'gavel'); ev(S.tExec, 'toll'); };
JJ.sfx = (S, ev) => { ev(0.3, 'whoosh'); ev(S.tCand, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'wind', 4); ev(0.4, 'shine'); ev(3, 'heart'); };
SS2.sfx = (S, ev) => { ev(0.2, 'door'); ev(0.6, 'door'); };
JJ.bgmTrack = (S, tr) => { tr.fin = 3; };
JJ.ending = true;
// figures stand in front of the house at y 150: keep them above the dialog window
JX.wideDY = 26; JA.wideDY = (t, S) => (t > S.tRec ? 10 : 40); JB.wideDY = (t, S) => (t > S.tWanted ? 20 : 54); JC.wideDY = (t, S) => (t > S.tRun ? 60 : 40); JD.wideDY = 30;
JE.wideDY = (t, S) => (t > S.tTokyo ? 30 : t > S.tMap ? 20 : 20); JF.wideDY = (t, S) => (t > S.tClass ? 40 : t > S.tGirl ? 40 : 26); JG.wideDY = (t, S) => (t > S.tCall ? 30 : 34); JH.wideDY = 34;
JI.wideDY = (t, S) => (t > S.tExec ? 20 : t > S.tDevil ? 14 : t > S.tMedal ? 14 : 40); JJ.wideDY = (t, S) => (t > S.tGirl ? 40 : t > S.tCand ? 30 : t > S.tBook ? 14 : 30); SS2.wideDY = 26;
function TITLE_DECO(c, t) { blit(c, badgeSpr(1), 270, 200, 12, 12, { s: 1.6 }); }
