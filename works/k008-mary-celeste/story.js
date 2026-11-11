/* ================= 記録 #008 メアリー・セレスト号事件: story plan ================= */
const EXPR = {};
['M1', 'G1', 'B1', 'C0', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L20', 'L21', 'L22', 'L23', 'L24', 'L25', 'L26', 'L27', 'L28', 'L29', 'L30', 'L31', 'L32', 'L35', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]); EXPR.T1 = [[0, 'normal']];
['C1', 'L19', 'L33', 'L34'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { devo: { name: '一等航海士デヴォー', bg: ['#141c24', '#3c4c5c'] }, crew: { name: 'デイ・グラツィア号の船員', bg: ['#1c2430', '#3c4c5c'] }, briggs: { name: 'ブリッグズ船長（日誌）', bg: ['#1c140c', '#4c3424'] } };
const HOOK = ['メアリー・セレスト号', '乗員10人が消えた船――'];
const PLAN_FULL = [
  { sc: YX, pre: 0.8, items: ['M1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: YA, pre: 1.0, items: ['L1', 0.8, 'L2', 0.8, 'L3'], tr: 'dither', td: 1.2 },
  { sc: YB, pre: 0.8, items: ['L4', 0.8, 'L5', 0.8, 'L6'], tr: 'dither', td: 1.0 },
  { sc: YC, pre: 0.8, items: ['L7', 0.6, 'L8'], tr: 'dither', td: 1.0 },
  { sc: YD, pre: 1.0, items: ['L9', 1.0, 'L10', 0.4, 'G1', 0.6, 'L11'], tr: 'dither', td: 1.2 },
  { sc: YE, pre: 0.8, items: ['L12', 0.8, 'L13'], tr: 'dither', td: 1.0 },
  { sc: YF, pre: 0.8, items: ['L14', 0.8, 'L15', 1.0, 'L16', 0.8, 'L17'], tr: 'blinds', td: 1.0 },
  { sc: YG, pre: 1.0, items: ['L18', 0.6, 'B1', 1.2, 'L19'], tr: 'dither', td: 1.2 },
  { sc: YH, pre: 0.8, items: ['L20', 0.6, 'L21', 0.6, 'L22', 0.8, 'L23'], tr: 'dither', td: 1.0 },
  { sc: YI, pre: 0.8, items: ['L24', 0.6, 'L25', 0.8, 'L26', 0.6, 'L27', 0.8, 'L28'], tr: 'dither', td: 1.0 },
  { sc: YJ, pre: 0.8, items: ['L29', 0.8, 'L30'], tr: 'dither', td: 1.0 },
  { sc: YK, pre: 0.8, items: ['L31', 0.8, 'L32'], tr: 'dither', td: 1.0 },
  { sc: YL, pre: 1.2, items: ['L33', 1.2, 'L34', 1.2, 'L35'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.5 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: YD, pre: 0.3, items: ['L10', 0.7, 'G1'], tr: 'dither', td: 0.5 },
  { sc: YE, pre: 0.3, items: ['L12'], tr: 'dither', td: 0.5 },
  { sc: YF, pre: 0.3, items: ['L14', 0.7, 'L15'], tr: 'blinds', td: 0.5 },
  { sc: YG, pre: 0.3, items: ['L18', 0.7, 'B1'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+, CEO decision 2026-11-10): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
YX.sfx = (S, ev) => { ev(0.2, 'wind', 6); ev(0.4, 'splash'); if (S.tDeck < 1e8) { ev(S.tDeck, 'creak'); ev(S.tDeck + 0.3, 'sting'); } };
YA.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.6 + k * 0.7, 'hit'); if (S.tAcc < 1e8) { ev(S.tAcc + 0.4, 'whoosh'); ev(S.tAcc + 1.0, 'thud'); } ev(S.tName, 'stamp'); };
YB.sfx = (S, ev) => { ev(0.3, 'toll'); for (let k = 0; k < 6; k++) ev(0.8 + k * 0.6, 'thump'); ev(S.tTen, 'sparkle'); };
YC.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(S.tDine, 'clang'); };
YD.sfx = (S, ev) => { ev(0.2, 'wind', 5); ev(S.tScope, 'creak'); for (let k = 0; k < 5; k++) ev(S.tRow + 0.3 + k * 0.9, 'splash'); };
YE.sfx = (S, ev) => { ev(0.2, 'splash'); for (let k = 0; k < 6; k++) ev(0.8 + k * 0.6, 'drip'); ev(S.tHull, 'wind', 3); };
YF.sfx = (S, ev) => { ev(0.3, 'creak'); ev(S.tClock, 'tick'); ev(S.tComp, 'crackle'); ev(S.tBoat + 0.9, 'stamp'); ev(S.tBlood, 'sting'); ev(S.tRust, 'shine'); ev(S.tFood, 'thump'); };
YG.sfx = (S, ev) => { ev(0.3, 'type'); ev(S.tBlank, 'heart'); ev(S.tNone, 'toll'); };
YH.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(S.tCourt, 'gavel'); ev(S.tDoubt, 'sting'); ev(S.tMap, 'whoosh'); ev(S.tPrize + 0.2, 'sparkle'); ev(S.tPrize + 2.4, 'excl'); };
YI.sfx = (S, ev) => { for (let k = 0; k < 3; k++) ev(0.3 + k * 1.0, 'stamp'); ev(S.tNo, 'excl'); ev(S.tVap, 'breath'); ev(S.tRope + 0.6, 'snap'); ev(S.tFire, 'flash'); ev(S.tDoor, 'slam'); };
YJ.sfx = (S, ev) => { ev(0.3, 'type'); ev(S.tTea, 'crackle'); ev(S.tFake + 0.4, 'stamp'); };
YK.sfx = (S, ev) => { ev(0.3, 'splash'); ev(1.2, 'crackle'); ev(3.4, 'stamp'); ev(S.tFound, 'splash'); };
YL.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(S.tCand, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'wind', 4); ev(0.3, 'creak'); };
SS2.sfx = (S, ev) => { ev(0.2, 'creak'); };
YL.bgmTrack = (S, tr) => { tr.fin = 3; };
YL.ending = true;
// the waterline sits at y 132: keep ships and people above the dialog window
YX.wideDY = (t, S) => (t > S.tDeck ? 30 : 6); YA.wideDY = (t, S) => (t > S.tName ? 16 : 30); YB.wideDY = (t, S) => (t > S.tTen ? 34 : 30); YC.wideDY = (t, S) => (t > S.tDine ? 20 : 10);
YD.wideDY = (t, S) => (t > S.tRow ? 14 : t > S.tScope ? 8 : 14); YE.wideDY = (t, S) => (t > S.tHull ? 6 : 38); YF.wideDY = (t, S) => (t > S.tFood ? 30 : t > S.tSword ? 30 : t > S.tBlood ? 40 : t > S.tBoat ? 26 : 16);
YG.wideDY = 10; YH.wideDY = (t, S) => (t > S.tPrize ? 20 : t > S.tMap ? 4 : t > S.tCourt ? 30 : 14); YI.wideDY = (t, S) => (t > S.tLab ? 20 : t > S.tBoat ? 14 : t > S.tVap ? 24 : t > S.tAlc ? 24 : 10);
YJ.wideDY = (t, S) => (t > S.tTea ? 20 : 20); YK.wideDY = (t, S) => (t > S.tFound ? 34 : 14); YL.wideDY = 42; SS2.wideDY = 30;
function TITLE_DECO(c, t) { brig(c, 270, 214, t, { s: 0.5 }); }
