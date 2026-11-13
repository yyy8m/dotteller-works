/* ================= 文庫 #006 瓶詰地獄: story plan ================= */
const EXPR = {};
['C0', 'C1', 'L0', 'L1', 'L2', 'L3', 'L4', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L19', 'L21', 'L22', 'L26', 'L27', 'L28', 'L31', 'A1', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]); EXPR.T1 = [[0, 'normal']];
['T0', 'L5', 'L6', 'L7', 'L18', 'A2', 'L20', 'T2', 'L23', 'L24', 'L25', 'L29', 'L30'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { taro: { name: '市川太郎', bg: ['#14243c', '#3c6c9c'] }, ayako: { name: 'アヤ子', bg: ['#3c1c2c', '#8c4c5c'] } };
const HOOK = ['瓶詰地獄', '救いの舟が来た日、二人は――'];
const PLAN_FULL = [
  { sc: XA, pre: 0.8, items: ['T0', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: XB, pre: 0.8, items: ['L1'], tr: 'dither', td: 1.0 },
  { sc: XC, pre: 0.8, items: ['L2', 0.8, 'L3', 0.6, 'L4', 0.8, 'L5', 0.8, 'L6', 0.8, 'L7', 1.0, 'L8'], tr: 'dither', td: 1.2 },
  { sc: XD, pre: 1.0, items: ['L9', 0.8, 'L10', 0.6, 'L11', 0.6, 'L12', 0.6, 'L13'], tr: 'dither', td: 1.2 },
  { sc: XE, pre: 0.8, items: ['L14', 0.6, 'L15', 0.6, 'L16'], tr: 'dither', td: 1.0 },
  { sc: XF, pre: 1.0, items: ['L17', 0.6, 'A1', 0.6, 'L18', 0.8, 'L19', 0.4, 'A2'], tr: 'dither', td: 1.2 },
  { sc: XG, pre: 1.0, items: ['L20', 0.8, 'L21', 0.4, 'T2', 0.8, 'L22'], tr: 'dither', td: 1.0 },
  { sc: XH, pre: 0.8, items: ['L23', 0.8, 'L24', 1.0, 'L25', 0.8, 'L26'], tr: 'dither', td: 1.0 },
  { sc: XI, pre: 1.0, items: ['L27', 0.8, 'L28', 0.6, 'L29', 1.4, 'L30'], tr: 'dither', td: 1.2 },
  { sc: XJ, pre: 1.2, items: ['L31'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.5 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: XC, pre: 0.3, items: ['L5', 0.4, 'L6'], tr: 'dither', td: 0.5 },
  { sc: XD, pre: 0.3, items: ['L11', 0.4, 'L13'], tr: 'dither', td: 0.5 },
  { sc: XF, pre: 0.3, items: ['L17', 0.4, 'A1', 0.4, 'A2'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+, CEO decision 2026-11-10): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
XA.sfx = (S, ev) => { ev(0.2, 'splash'); ev(0.6, 'wind', 4); if (S.tLetter < 1e8) ev(S.tLetter, 'sting'); };
XB.sfx = (S, ev) => { ev(1, 'stamp'); ev(2, 'whoosh'); };
XC.sfx = (S, ev) => { ev(0.3, 'creak'); ev(S.tShip, 'toll'); ev(S.tShip + 1, 'splash'); ev(S.tFear, 'heart'); ev(S.tCliff, 'wind', 4); };
XD.sfx = (S, ev) => { ev(0.3, 'creak'); ev(S.tWreck, 'splash'); ev(S.tWreck + 0.5, 'thunder'); for (let k = 0; k < 6; k++) ev(S.tItems + 0.3 + k * 1.2, 'drop'); };
XE.sfx = (S, ev) => { ev(0.3, 'sparkle'); ev(S.tHut, 'toll'); ev(S.tBottle + 0.8, 'splash'); };
XF.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(S.tGrow, 'sparkle'); ev(S.tAsk, 'heart'); };
XG.sfx = (S, ev) => { ev(0.3, 'wind', 5); ev(S.tPole + 0.4, 'whoosh'); ev(S.tPole + 1.4, 'splash'); ev(S.tFire, 'burn', 5); };
XH.sfx = (S, ev) => { ev(0.3, 'splash'); ev(S.tRun, 'step'); ev(S.tGone, 'wind', 4); ev(S.tGone + 0.5, 'toll'); };
XI.sfx = (S, ev) => { ev(0.3, 'creak'); ev(S.tRead, 'type'); ev(S.tFirst, 'toll'); };
XJ.sfx = (S, ev) => { ev(0.3, 'splash'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'toll'); ev(0.6, 'wind', 4); };
SS2.sfx = (S, ev) => { ev(0.2, 'splash'); };
XJ.bgmTrack = (S, tr) => { tr.fin = 3; };
XJ.ending = true;
// the sand line is y 150: keep the children above the dialog window
XA.wideDY = (t, S) => (t > S.tLetter ? 10 : 30); XB.wideDY = 10; XC.wideDY = (t, S) => (t < S.tShip ? 10 : t > S.tCliff ? 10 : 30); XD.wideDY = (t, S) => (t > S.tItems ? 20 : t > S.tWreck ? 40 : 10);
XE.wideDY = 36; XF.wideDY = 40; XG.wideDY = (t, S) => (t > S.tFire ? 30 : 0); XH.wideDY = (t, S) => (t > S.tGone ? 40 : 30); XI.wideDY = (t, S) => (t > S.tFirst ? 36 : t > S.tNote ? 6 : 10); XJ.wideDY = 30; SS2.wideDY = 30;
function TITLE_DECO(c, t) { bottle(c, 262, 214, 1.3, 2, { paper: true }); }
