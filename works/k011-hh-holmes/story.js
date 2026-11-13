/* ================= 記録 #011 H・H・ホームズ: story plan ================= */
const EXPR = {};
['M1', 'D1', 'H1', 'C0', 'C1', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L13', 'L14', 'L17', 'L18', 'L19', 'L20', 'L22', 'L23', 'L24', 'L25', 'L26', 'L27', 'L28', 'L30', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]); EXPR.T1 = [[0, 'normal']];
['L11', 'L12', 'L15', 'L16', 'L21', 'L29'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { holmes: { name: 'H・H・ホームズ', bg: ['#1c1018', '#4c2c3c'] }, da: { name: '地方検事', bg: ['#1c140c', '#4c3424'] } };
const HOOK = ['H・H・ホームズ', '「殺人の城」の正体――'];
const PLAN_FULL = [
  { sc: ZX, pre: 0.8, items: ['M1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: ZA, pre: 1.0, items: ['L1', 0.8, 'L2', 0.8, 'L3'], tr: 'dither', td: 1.2 },
  { sc: ZB, pre: 0.8, items: ['L4', 0.8, 'L5'], tr: 'dither', td: 1.0 },
  { sc: ZC, pre: 0.8, items: ['L6', 0.6, 'L7', 0.6, 'L8', 0.6, 'L9', 0.8, 'L10'], tr: 'dither', td: 1.0 },
  { sc: ZH, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: ZD, pre: 1.0, items: ['L11', 1.0, 'L12'], tr: 'dither', td: 1.2 },
  { sc: ZE, pre: 0.8, items: ['L13', 0.4, 'D1', 0.8, 'L14', 0.8, 'L15', 1.0, 'L16'], tr: 'blinds', td: 1.0 },
  { sc: ZF, pre: 0.8, items: ['L17', 0.8, 'L18', 0.6, 'L19'], tr: 'dither', td: 1.0 },
  { sc: ZG, pre: 1.0, items: ['L20', 1.0, 'L21'], tr: 'dither', td: 1.2 },
  { sc: ZI, pre: 0.8, items: ['L22', 0.8, 'L23'], tr: 'dither', td: 1.0 },
  { sc: ZJ, pre: 0.8, items: ['L24', 0.8, 'L25', 0.6, 'L26', 0.4, 'H1'], tr: 'dither', td: 1.0 },
  { sc: ZK, pre: 1.0, items: ['L27'], tr: 'dither', td: 1.2 },
  { sc: ZL, pre: 1.0, items: ['L28', 1.2, 'L29', 1.2, 'L30'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.5 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: ZC, pre: 0.3, items: ['L7', 0.4, 'L8', 0.4, 'L9'], tr: 'dither', td: 0.5 },
  { sc: ZD, pre: 0.3, items: ['L11'], tr: 'dither', td: 0.5 },
  { sc: ZI, pre: 0.3, items: ['L22'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+, CEO decision 2026-11-10): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
ZX.sfx = (S, ev) => { ev(0.2, 'wind', 4); ev(0.6, 'toll'); if (S.tMyth < 1e8) ev(S.tMyth + 0.6, 'stamp'); };
ZA.sfx = (S, ev) => { ev(0.3, 'toll'); ev(S.tMed, 'creak'); ev(S.tBody + 2, 'stamp'); };
ZB.sfx = (S, ev) => { ev(0.3, 'type'); ev(S.tName, 'sting'); for (let k = 0; k < 3; k++) ev(S.tWives + 0.4 + k * 1.4, 'sparkle'); };
ZC.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(S.tBuild + k * 0.5, 'hit'); ev(S.tDebt + 1.6, 'stamp'); ev(S.tNever + 0.4, 'stamp'); };
ZD.sfx = (S, ev) => { ev(0.3, 'wind', 5); ev(S.tGone1, 'toll'); ev(S.tMore + 1, 'toll'); ev(S.tMore + 3, 'toll'); };
ZE.sfx = (S, ev) => { ev(0.3, 'tick'); ev(S.tPlot, 'creak'); ev(S.tFire, 'burn', 5); ev(S.tFire, 'thunder'); ev(S.tFire + 2.4, 'stamp'); ev(S.tKids, 'step'); };
ZF.sfx = (S, ev) => { for (let k = 0; k < 3; k++) ev(0.4 + k * 0.8, 'whoosh'); ev(S.tTip, 'clang'); ev(S.tArrest, 'slam'); ev(S.tArrest + 0.3, 'clang'); };
ZG.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.3 + k * 0.6, 'step'); ev(S.tFind, 'toll'); };
ZI.sfx = (S, ev) => { ev(0.4, 'whoosh'); ev(1.6, 'whoosh'); ev(S.tNone + 0.6, 'excl'); ev(S.tFire, 'burn', 6); };
ZJ.sfx = (S, ev) => { ev(0.3, 'type'); ev(S.tAlive, 'sting'); };
ZK.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(1.4, 'creak'); ev(S.tCement + 0.4, 'dig'); };
ZL.sfx = (S, ev) => { for (let k = 0; k < 3; k++) ev(0.4 + k * 0.8, 'stamp'); ev(3.4, 'stamp'); ev(S.tTrue, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'wind', 4); ev(0.6, 'toll'); };
SS2.sfx = (S, ev) => { ev(0.2, 'creak'); };
ZL.bgmTrack = (S, tr) => { tr.fin = 3; };
ZL.ending = true;
// the street line is at y 150: keep people above the dialog window
ZX.wideDY = 26; ZA.wideDY = (t, S) => (t > S.tMed ? 30 : 40); ZB.wideDY = (t, S) => (t > S.tWives ? 14 : 40); ZC.wideDY = (t, S) => (t > S.tDebt && t < S.tNever ? 30 : 30); ZD.wideDY = 30;
ZE.wideDY = (t, S) => (t > S.tKids ? 36 : t > S.tFire ? 20 : 34); ZF.wideDY = (t, S) => (t > S.tArrest ? 30 : t > S.tTip ? 40 : 4); ZG.wideDY = (t, S) => (t > S.tFind ? 30 : 30); ZI.wideDY = (t, S) => (t > S.tFire ? 26 : 14);
ZJ.wideDY = 24; ZK.wideDY = (t, S) => (t > S.tCement ? 30 : 20); ZL.wideDY = (t, S) => (t < S.tTrue ? 10 : 34); SS2.wideDY = 26;
function TITLE_DECO(c, t) { castle(c, t, 220, 236, { lit: true, floors: 2 }); }
