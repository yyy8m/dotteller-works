/* ================= 都市伝説 #003 人面犬: story plan ================= */
const EXPR = {};
['L36', 'L36b', 'L30'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { jinmen: { name: '人面犬', bg: ['#0c0c18', '#2c2c48'] }, ken: { name: '男の子', bg: ['#1c1c24', '#3c3c4c'] }, chichi: { name: '父親', bg: ['#1c1c24', '#3c3c4c'] } };
const HOOK = ['人面犬', '振り向いた顔は、人間――'];
const PLAN_FULL = [
  { sc: JZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.0, 'C2', 0.8, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: JA, pre: 1.0, items: ['L1', 0.6, 'L1b', 0.8, 'L2', 0.6, 'L2b', 0.8, 'L3', 0.6, 'L3b', 0.6, 'L3c'], tr: 'dither', td: 1.0 },
  { sc: JB, pre: 0.8, items: ['L4', 0.6, 'L4b', 0.8, 'L5', 0.8, 'L5b', 0.8, 'L6', 0.6, 'V1', 0.8, 'L6b'], tr: 'blinds', td: 1.0 },
  { sc: JC, pre: 0.8, items: ['L7', 0.6, 'L8', 0.6, 'L8b', 0.8, 'L9', 0.6, 'L9b'], tr: 'dither', td: 1.0 },
  { sc: JD, pre: 1.0, items: ['L10', 0.6, 'L10b', 0.8, 'L11', 0.6, 'L11b', 1.0, 'L12', 0.8, 'L12b', 1.0, 'L13', 0.8, 'V2', 1.0, 'L13b', 0.8, 'L14', 0.6, 'L14b'], tr: 'dither', td: 1.0 },
  { sc: JE, pre: 0.8, items: ['L15', 0.6, 'L16', 0.6, 'L16b', 0.8, 'L17', 0.6, 'L17b'], tr: 'dither', td: 1.0 },
  { sc: JF, pre: 1.6, items: ['L18', 0.8, 'L19', 0.6, 'L19b', 0.8, 'L20', 0.8, 'L20b'], tr: 'blinds', td: 1.0 },
  { sc: JG, pre: 1.0, items: ['L21', 0.6, 'L21b', 0.8, 'L22', 0.6, 'L22b', 0.8, 'L23', 0.6, 'L23b', 0.8, 'L24', 0.6, 'L24b', 0.8, 'L25', 0.6, 'V3', 0.4, 'K1', 0.6, 'L26', 1.0, 'L26b', 0.8, 'L27'], tr: 'dither', td: 1.0 },
  { sc: JH, pre: 0.8, items: ['L28', 0.6, 'L28b', 0.4, 'F1', 0.8, 'L29', 1.8, 'K2', 1.4, 'L30', 0.8, 'L30b', 0.8, 'L30c'], tr: 'dither', td: 1.0 },
  { sc: JI, pre: 1.0, items: ['L31', 0.8, 'L32', 0.6, 'L32b', 0.8, 'L33', 0.6, 'L33b'], tr: 'dither', td: 1.0 },
  { sc: JJ, pre: 0.8, items: ['L34', 0.8, 'L35', 0.6, 'L35b', 0.8, 'L36', 0.6, 'L36b'], tr: 'dither', td: 1.0 },
  { sc: JK, pre: 1.0, items: ['L37', 1.0, 'V4', 1.2, 'L38'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the fog night: the dog in the window → mid-hook T2 → "止めろ" / "お父さん、止まって！" → brakes → the truck → S2 (it turns again) loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: JG, pre: 0.3, items: ['L22', 0.4, 'L23', 0.4, 'L23b', 0.4, 'L24', 0.4, 'L24b', 0.5, 'T2', 0.5, 'L25', 0.4, 'V3', 0.3, 'K1', 0.4, 'L26', 0.6, 'L26b', 0.5, 'L27'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
JZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tIn < 1e8) for (let k = 0; k < 8; k++) ev(S.tIn + 0.3 + k * 0.3, 'step'); if (S.tTurn < 1e8) ev(S.tTurn + 0.2, 'sting'); if (S.tFace < 1e8) ev(S.tFace + 0.3, 'heart'); };
JA.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tEra < 1e8) ev(S.tEra + 0.8, 'whoosh'); if (S.tTV < 1e8) ev(S.tTV + 0.3, 'type'); if (S.tPhoto < 1e8) for (let k = 0; k < 4; k++) ev(S.tPhoto + k * 0.4, 'stamp'); };
JB.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tSpeak < 1e8) ev(S.tSpeak + 0.3, 'sting'); if (S.tGo < 1e8) for (let k = 0; k < 6; k++) ev(S.tGo + 0.4 + k * 0.4, 'step'); };
JC.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tPass < 1e8) ev(S.tPass + 0.6, 'whoosh'); if (S.tCrash < 1e8) { ev(S.tCrash, 'slam'); ev(S.tCrash + 0.3, 'excl'); } if (S.tAl < 1e8) ev(S.tAl + 0.4, 'creak'); };
JD.sfx = (S, ev) => { if (S.tWalk < 1e8) for (let k = 0; k < 6; k++) ev(S.tWalk + 0.2 + k * 0.5, 'step'); if (S.tBag < 1e8) ev(S.tBag + 0.3, 'crackle'); if (S.tStop < 1e8) ev(S.tStop + 0.3, 'heart'); if (S.tOut < 1e8) ev(S.tOut + 1.2, 'sting'); if (S.tGone < 1e8) for (let k = 0; k < 5; k++) ev(S.tGone + 0.4 + k * 0.45, 'step'); if (S.tFast < 1e8) for (let k = 0; k < 8; k++) ev(S.tFast + 0.3 + k * 0.3, 'step'); };
JE.sfx = (S, ev) => { ev(0.3, 'toll'); if (S.tLab < 1e8) ev(S.tLab + 0.3, 'splash'); if (S.tRoad < 1e8) ev(S.tRoad + 0.5, 'whoosh'); if (S.tEdo < 1e8) ev(S.tEdo + 0.3, 'shine'); };
JF.sfx = (S, ev) => { ev(0.6, 'toll'); ev(0.3, 'rain', 4); if (S.tFace < 1e8) ev(S.tFace + 0.3, 'heart'); if (S.tWarn < 1e8) ev(S.tWarn + 0.3, 'wind', 3); };
JG.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tDog < 1e8) for (let k = 0; k < 10; k++) ev(S.tDog + 0.3 + k * 0.3, 'step'); if (S.tFace < 1e8) ev(S.tFace + 0.3, 'sting'); if (S.tBrake < 1e8) { ev(S.tBrake + 0.1, 'siren'); ev(S.tBrake + 0.2, 'slam'); } if (S.tTruck < 1e8) ev(S.tTruck + 1.0, 'heart'); };
JH.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tThink < 1e8) ev(S.tThink + 0.6, 'heart'); if (S.tRoad < 1e8) ev(S.tRoad + 0.3, 'sparkle'); };
JI.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tGlance < 1e8) ev(S.tGlance + 0.5, 'whoosh'); if (S.t90 < 1e8) ev(S.t90 + 0.3, 'stamp'); };
JJ.sfx = (S, ev) => { ev(0.3, 'toll'); if (S.tTrain < 1e8) ev(S.tTrain + 0.3, 'clang'); if (S.tHome < 1e8) for (let k = 0; k < 5; k++) ev(S.tHome + 0.4 + k * 0.6, 'step'); };
JK.sfx = (S, ev) => { ev(0.3, 'wind', 3); for (let k = 0; k < 6; k++) ev(0.6 + k * 0.3, 'step'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'wind', 2); for (let k = 0; k < 6; k++) ev(0.4 + k * 0.3, 'step'); };
SS2.sfx = (S, ev) => { ev(0.3, 'wind', 2); ev(1.2, 'sting'); };
JK.bgmTrack = (S, tr) => { tr.fin = 3; };
JK.ending = true;
[JZ, JA, JB, JC, JD, JE, JF, JG, JH, JI, JJ, JK, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { jinmen(c, 270, 230, { sit: true, s: 1.4 }); }
