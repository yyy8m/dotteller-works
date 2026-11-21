/* ================= 都市伝説 #005 きさらぎ駅: story plan ================= */
const EXPR = {};
['L15b', 'L18c'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { onna: { name: '電車の女性', bg: ['#0c0c18', '#2c2c48'] }, roujin: { name: '片足の老人', bg: ['#04040c', '#1c1c2c'] }, otoko: { name: '車の男', bg: ['#0c0c10', '#2c2430'] } };
const HOOK = ['きさらぎ駅', '地図にない駅で、降りてしまった――'];
const PLAN_FULL = [
  { sc: YZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.0, 'C2', 0.8, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: YA, pre: 1.0, items: ['L1', 0.8, 'L1b', 0.6, 'L1bx', 0.8, 'L2', 0.6, 'L2b', 0.6, 'L2bx', 0.8, 'L3', 0.6, 'L3x'], tr: 'dither', td: 1.0 },
  { sc: YB, pre: 0.8, items: ['L4', 0.6, 'L4x', 0.8, 'L4b', 0.6, 'L4bx', 0.8, 'L5', 0.6, 'L5b', 0.6, 'L5bx', 0.8, 'L6', 0.6, 'L6x', 0.6, 'L6b'], tr: 'blinds', td: 1.0 },
  { sc: YC, pre: 1.0, items: ['L7', 0.8, 'L7b', 0.8, 'L7c', 0.8, 'L8', 0.6, 'L8x', 1.4, 'L9', 0.4, 'V1', 1.0, 'L9b', 0.8, 'L9c', 0.8, 'L9cx'], tr: 'dither', td: 1.0 },
  { sc: YD, pre: 0.8, items: ['L10', 0.6, 'L10b', 0.8, 'L10bx'], tr: 'dither', td: 1.0 },
  { sc: YE, pre: 1.6, items: ['L11', 0.8, 'L11b', 0.4, 'V2', 0.8, 'L12', 0.6, 'L12x', 0.6, 'L12b', 0.8, 'L13', 0.6, 'L13x', 1.0, 'L13b', 0.6, 'L13bx', 0.8, 'L14', 0.6, 'L14x', 0.8, 'L14b'], tr: 'blinds', td: 1.0 },
  { sc: YF, pre: 1.2, items: ['L15', 1.8, 'L15b', 1.0, 'L15bx', 1.0, 'L15c'], tr: 'dither', td: 1.4 },
  { sc: YG, pre: 1.0, items: ['L16', 0.6, 'L16x', 0.8, 'L16b', 0.8, 'L17', 0.6, 'L17x', 0.6, 'L17b', 0.8, 'L18', 0.8, 'L18b', 0.8, 'L18c'], tr: 'dither', td: 1.0 },
  { sc: YH, pre: 0.8, items: ['L19', 0.6, 'L19x', 0.8, 'L20', 0.6, 'L20b', 0.6, 'L20bx', 0.8, 'L21', 0.6, 'L21x', 0.8, 'L21b'], tr: 'dither', td: 1.0 },
  { sc: YI, pre: 1.0, items: ['L22', 0.8, 'L22b', 1.2, 'V3', 1.2, 'L23'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 (the sign) → walking the tracks, drums and bells → mid-hook T2 → the voice, the old man → S2 ("the train still doesn't stop") loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: YC, pre: 0.3, items: ['L7', 0.4, 'L7b', 0.4, 'L7c', 0.4, 'L8', 0.5, 'T2', 0.5, 'L9', 0.3, 'V1', 0.6, 'L9b', 0.4, 'L9c', 0.4, 'L9cx'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
YZ.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.3 + k * 0.5, 'tick'); if (S.tStop < 1e8) ev(S.tStop + 0.2, 'creak'); if (S.tSign < 1e8) ev(S.tSign + 0.2, 'sting'); };
YA.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tHer < 1e8) for (let k = 0; k < 4; k++) ev(S.tHer + 0.3 + k * 0.4, 'type'); if (S.tReply < 1e8) ev(S.tReply + 0.3, 'type'); };
YB.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tMap < 1e8) ev(S.tMap + 0.3, 'excl'); if (S.tFam < 1e8) ev(S.tFam + 0.2, 'tick'); if (S.tWalk < 1e8) for (let k = 0; k < 6; k++) ev(S.tWalk + 0.4 + k * 0.6, 'step'); };
YC.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.3 + k * 0.6, 'step'); if (S.tSound < 1e8) for (let k = 0; k < 8; k++) { ev(S.tSound + 0.3 + k * 0.9, 'thud'); ev(S.tSound + 0.75 + k * 0.9, 'sparkle'); } if (S.tVoice < 1e8) ev(S.tVoice + 0.2, 'sting'); if (S.tGone < 1e8) ev(S.tGone + 1, 'whoosh'); };
YD.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tDark < 1e8) for (let k = 0; k < 6; k++) ev(S.tDark + 0.4 + k * 0.7, 'drip'); };
YE.sfx = (S, ev) => { if (S.tCar < 1e8) ev(S.tCar + 0.3, 'door'); if (S.tGo < 1e8) ev(S.tGo + 0.3, 'whoosh'); if (S.tMtn < 1e8) ev(S.tMtn + 0.3, 'heart'); if (S.tBat < 1e8) for (let k = 0; k < 3; k++) ev(S.tBat + 0.4 + k * 0.5, 'tick'); };
YF.sfx = (S, ev) => { if (S.tNever < 1e8) ev(S.tNever + 0.2, 'toll'); if (S.tCall < 1e8) for (let k = 0; k < 4; k++) ev(S.tCall + 0.6 + k * 1.2, 'type'); };
YG.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tIkai < 1e8) ev(S.tIkai + 0.4, 'sting'); if (S.tBack < 1e8) ev(S.tBack + 0.3, 'type'); };
YH.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tTrain < 1e8) for (let k = 0; k < 6; k++) ev(S.tTrain + 0.3 + k * 0.5, 'tick'); if (S.tWake < 1e8) ev(S.tWake + 0.5, 'sting'); };
YI.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.3 + k * 0.5, 'tick'); if (S.tCheck < 1e8) ev(S.tCheck + 0.4, 'creak'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(0.5, 'wind', 2); };
SS2.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.2 + k * 0.5, 'tick'); };
YI.bgmTrack = (S, tr) => { tr.fin = 3; };
YI.ending = true;
[YZ, YA, YB, YC, YD, YE, YF, YG, YH, YI, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { blit(c, modFig(OL, { k: 'td' }), 282, 230, FIG_AX2, FIG_AY2, {}); }
