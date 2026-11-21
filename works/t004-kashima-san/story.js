/* ================= 都市伝説 #004 カシマさん: story plan ================= */
const EXPR = {};
['L22', 'L25b'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { kashima: { name: 'カシマさん', bg: ['#0c0a10', '#2c2434'] }, shoujo: { name: '女の子', bg: ['#141420', '#3c3c54'] } };
const HOOK = ['カシマさん', '聞いた人のところに、来る――'];
const PLAN_FULL = [
  { sc: KZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.0, 'C2', 0.8, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: KA, pre: 1.0, items: ['L1', 0.8, 'L1b', 0.8, 'L1c', 0.8, 'L2', 0.6, 'L2b', 0.6, 'L2c', 0.8, 'L3', 0.6, 'L3b'], tr: 'dither', td: 1.0 },
  { sc: KB, pre: 0.8, items: ['L4', 0.6, 'L4b', 0.6, 'L4c', 0.8, 'L5', 0.6, 'L5b', 0.6, 'L5c', 0.8, 'L6', 0.6, 'L6b', 0.6, 'L6c'], tr: 'blinds', td: 1.0 },
  { sc: KC, pre: 0.8, items: ['L7', 0.6, 'V1', 0.8, 'L7b', 0.8, 'L8', 0.8, 'L8b', 0.6, 'V2', 0.8, 'L9', 0.6, 'L9b', 0.8, 'L9c', 0.6, 'L9d'], tr: 'dither', td: 1.0 },
  { sc: KD, pre: 1.0, items: ['L10', 0.6, 'L10b', 0.8, 'L11', 1.0, 'L12', 0.8, 'L12b', 0.6, 'L12c', 0.8, 'L13', 1.4, 'L13b', 0.8, 'L13c', 0.8, 'L14', 0.6, 'V3', 0.6, 'K1', 0.8, 'L15', 0.8, 'L15b'], tr: 'dither', td: 1.0 },
  { sc: KE, pre: 1.2, items: ['L16', 0.6, 'L16c', 0.8, 'L16b', 1.4, 'L17', 1.2, 'L17b', 0.8, 'L17c', 1.0, 'L17d'], tr: 'white', td: 1.0 },
  { sc: KF, pre: 1.6, items: ['L18', 0.8, 'L19', 0.6, 'L19c', 0.8, 'L19b', 0.8, 'L20', 0.6, 'L20b', 0.8, 'L20c'], tr: 'blinds', td: 1.0 },
  { sc: KG, pre: 0.8, items: ['L21', 0.6, 'L21b', 0.8, 'L22', 0.8, 'L22b', 0.8, 'L22c'], tr: 'dither', td: 1.0 },
  { sc: KH, pre: 0.8, items: ['L23', 0.6, 'L23b', 0.8, 'L24', 0.6, 'L24b', 0.8, 'L24c', 0.8, 'L25', 0.6, 'L25c', 0.8, 'L25b'], tr: 'dither', td: 1.0 },
  { sc: KI, pre: 1.0, items: ['L26', 0.8, 'L26b', 1.0, 'L26c', 1.2, 'V4', 1.2, 'L27'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the dream station: the bench, the hem with nothing below → mid-hook T2 → frozen → "足、いるか" → S2 ("you have heard it too") loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: KD, pre: 0.3, items: ['L12', 0.4, 'L12b', 0.4, 'L12c', 0.4, 'L13', 0.6, 'L13b', 0.5, 'T2', 0.5, 'L13c', 0.4, 'L14', 0.4, 'V3', 0.3, 'K1', 0.5, 'L15b'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
KZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tWake < 1e8) ev(S.tWake + 0.3, 'heart'); if (S.tHer < 1e8) ev(S.tHer + 0.5, 'sting'); };
KA.sfx = (S, ev) => { ev(0.4, 'toll'); if (S.tDays < 1e8) for (let k = 0; k < 3; k++) ev(S.tDays + 1 + k * 1.2, 'stamp'); if (S.tLate < 1e8) ev(S.tLate + 0.3, 'sting'); if (S.tAwake < 1e8) ev(S.tAwake + 0.3, 'tick'); };
KB.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tTrain < 1e8) { ev(S.tTrain + 0.5, 'whoosh'); ev(S.tTrain + 1.5, 'toll'); } if (S.tPhone < 1e8) ev(S.tPhone + 0.3, 'rain', 3); if (S.tToilet < 1e8) ev(S.tToilet + 0.3, 'drip'); };
KC.sfx = (S, ev) => { ev(0.3, 'sting'); if (S.tWrong < 1e8) ev(S.tWrong + 0.3, 'heart'); if (S.tAns < 1e8) ev(S.tAns + 0.6, 'shine'); if (S.tSpell < 1e8) for (let k = 0; k < 3; k++) ev(S.tSpell + k * 1.1, 'stamp'); };
KD.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tDream < 1e8) ev(S.tDream + 0.3, 'wind', 4); if (S.tRail < 1e8) for (let k = 0; k < 6; k++) ev(S.tRail + 0.4 + k * 0.6, 'clang'); if (S.tNone < 1e8) ev(S.tNone + 0.2, 'sting'); if (S.tStuck < 1e8) ev(S.tStuck + 0.3, 'heart'); if (S.tOut < 1e8) for (let k = 0; k < 4; k++) ev(S.tOut + 0.6 + k * 0.9, 'snap'); };
KE.sfx = (S, ev) => { ev(0.4, 'sparkle'); if (S.tMark < 1e8) ev(S.tMark + 0.3, 'sting'); if (S.tHands < 1e8) for (let k = 0; k < 8; k++) ev(S.tHands + 0.3 + k * 0.5, 'drip'); };
KF.sfx = (S, ev) => { ev(0.6, 'toll'); if (S.tPass < 1e8) for (let k = 0; k < 5; k++) ev(S.tPass + 0.3 + k * 0.5, 'step'); if (S.tFar < 1e8) ev(S.tFar + 0.3, 'whoosh'); };
KG.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tWar < 1e8) ev(S.tWar + 0.3, 'toll'); };
KH.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tYou < 1e8) ev(S.tYou + 0.3, 'sting'); if (S.tOne < 1e8) ev(S.tOne + 0.3, 'shine'); };
KI.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tFoot < 1e8) ev(S.tFoot + 0.5, 'sting'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(0.6, 'wind', 2); };
SS2.sfx = (S, ev) => { ev(0.3, 'heart'); };
KI.bgmTrack = (S, tr) => { tr.fin = 3; };
KI.ending = true;
[KZ, KA, KB, KC, KD, KE, KF, KG, KH, KI, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { kashima(c, 282, 236, { s: 1.0 }); }
