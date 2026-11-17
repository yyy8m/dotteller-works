/* ================= 記録 #018 グリコ・森永事件: story plan ================= */
const EXPR = {};
['L44', 'L37', 'L34'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { kaijin: { name: 'かい人21面相', bg: ['#06060a', '#2c1c24'] } };
const HOOK = ['グリコ・森永事件', 'キツネ目の男――'];
const PLAN_FULL = [
  { sc: GZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.2, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: GA, pre: 1.0, items: ['L1', 0.6, 'L2', 0.6, 'L3', 0.6, 'L4', 0.8, 'L4b'], tr: 'dither', td: 1.0 },
  { sc: GB, pre: 0.8, items: ['L5', 0.6, 'L6', 0.8, 'L7', 0.4, 'V1', 0.8, 'L7b'], tr: 'dither', td: 1.0 },
  { sc: GC, pre: 0.8, items: ['L8', 1.6, 'L9'], tr: 'dither', td: 1.0 },
  { sc: GD, pre: 0.8, items: ['L10', 0.6, 'L11', 0.6, 'L11b', 0.8, 'L12'], tr: 'dither', td: 1.0 },
  { sc: GE, pre: 0.8, items: ['L13', 0.8, 'L14'], tr: 'dither', td: 1.0 },
  { sc: GF, pre: 0.8, items: ['L15', 0.6, 'L16', 0.8, 'L16b', 0.6, 'L17', 0.4, 'V2'], tr: 'dither', td: 1.0 },
  { sc: GG, pre: 1.0, items: ['L18', 1.4, 'L19', 0.6, 'L20', 1.2, 'L21', 1.2, 'L22', 0.8, 'L23', 0.8, 'L24'], tr: 'blinds', td: 1.0 },
  { sc: GH, pre: 0.8, items: ['L25', 0.6, 'L26', 0.4, 'V3', 0.8, 'L27', 0.6, 'L28', 0.6, 'L28b'], tr: 'dither', td: 1.0 },
  { sc: GI, pre: 0.8, items: ['L29', 0.6, 'L30', 0.8, 'L31', 0.6, 'L32', 0.6, 'L32b', 0.8, 'L32c'], tr: 'dither', td: 1.0 },
  { sc: GJ, pre: 0.8, items: ['L33', 1.2, 'L34', 0.8, 'L35', 0.6, 'L35b', 0.8, 'L36', 0.4, 'V4', 1.2, 'L37'], tr: 'dither', td: 1.2 },
  { sc: GK, pre: 1.0, items: ['L38', 0.8, 'L39', 0.6, 'L39b', 0.6, 'L40', 0.8, 'L41', 0.8, 'L42', 0.6, 'L42b', 1.2, 'L43', 1.2, 'L44'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the train → mid-hook T2 at ~30 s → the fox-eyed man, no authority, the crowd → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: GG, pre: 0.3, items: ['L19', 0.6, 'L20', 0.8, 'T2', 0.8, 'L21', 0.8, 'L22', 0.6, 'L23', 0.6, 'L24'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
GZ.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tBox < 1e8) ev(at(S, 'C1', 1), 'sting'); if (S.tName < 1e8) ev(at(S, 'C2', 1), 'toll'); };
GA.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tIn < 1e8) ev(at(S, 'L2', 1), 'slam'); if (S.tPres < 1e8) ev(S.tPres + 0.3, 'door'); if (S.tBath < 1e8) ev(S.tBath + 0.2, 'drip'); if (S.tCar < 1e8) ev(S.tCar + 0.4, 'whoosh'); if (S.t110 < 1e8) ev(S.t110 + 0.4, 'type'); };
GB.sfx = (S, ev) => { for (let k = 0; k < 4; k++) ev(0.3 + k * 0.6, 'tick'); if (S.tMoney < 1e8) ev(at(S, 'L6', 3), 'stamp'); if (S.tWhy < 1e8) ev(S.tWhy + 0.3, 'sting'); };
GC.sfx = (S, ev) => { ev(0.3, 'splash'); ev(at(S, 'L8', 1), 'door'); for (let k = 0; k < 8; k++) ev(at(S, 'L8', 1) + 0.3 + k * 0.3, 'step'); if (S.tEnd < 1e8) ev(S.tEnd + 0.3, 'heart'); };
GD.sfx = (S, ev) => { ev(0.4, 'type'); if (S.tFire < 1e8) ev(S.tFire + 0.3, 'burn'); if (S.tVan < 1e8) ev(S.tVan + 0.3, 'burn'); if (S.tName < 1e8) ev(at(S, 'L12', 2), 'sting'); };
GE.sfx = (S, ev) => { ev(0.4, 'type'); if (S.tEmpty < 1e8) for (let k = 0; k < 6; k++) ev(S.tEmpty + 0.3 + k * 0.5, 'step'); };
GF.sfx = (S, ev) => { ev(0.3, 'wind', 2); ev(at(S, 'L15', 3), 'thud'); if (S.tHeld < 1e8) { ev(S.tHeld + 0.2, 'siren'); ev(at(S, 'L16', 3) - 0.1, 'stamp'); } if (S.tLet < 1e8) ev(S.tLet + 0.3, 'type'); };
GG.sfx = (S, ev) => { if (S.tEnd0 < 1e8) ev(S.tEnd0 + 0.2, 'heart'); if (S.tTrain < 1e8) for (let k = 0; k < 10; k++) ev(S.tTrain + k * 0.8, 'tick'); if (S.tFox < 1e8) ev(S.tFox + 0.6, 'sting'); if (S.tSketch < 1e8) ev(S.tSketch + 0.2, 'whoosh'); if (S.tRule < 1e8) ev(at(S, 'L23', 1) - 0.1, 'stamp'); if (S.tGone < 1e8) for (let k = 0; k < 8; k++) ev(S.tGone + 0.2 + k * 0.4, 'step'); };
GH.sfx = (S, ev) => { ev(0.4, 'type'); if (S.tTape < 1e8) ev(S.tTape + 0.3, 'tick'); if (S.tMap < 1e8) ev(at(S, 'L27', 2), 'sting'); if (S.tCam < 1e8) ev(S.tCam + 0.2, 'flash'); };
GI.sfx = (S, ev) => { for (let k = 0; k < 4; k++) ev(at(S, 'L29', 2) + k * 1.2, 'tick'); if (S.tSA < 1e8) ev(at(S, 'L30', 3) - 0.1, 'stamp'); if (S.tCloth < 1e8) ev(S.tCloth + 0.2, 'wind', 3); if (S.tChase < 1e8) { ev(S.tChase, 'siren'); ev(S.tChase + 0.2, 'whoosh'); } if (S.tStolen < 1e8) ev(S.tStolen + 0.4, 'stamp'); if (S.tFuji < 1e8) ev(at(S, 'L32c', 3) - 0.1, 'stamp'); };
GJ.sfx = (S, ev) => { ev(0.3, 'sparkle'); if (S.tChief < 1e8) ev(S.tChief + 0.3, 'toll'); if (S.tLet < 1e8) ev(S.tLet + 0.3, 'type'); if (S.tSky < 1e8) ev(S.tSky + 0.4, 'wind', 4); };
GK.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tCount < 1e8) ev(S.tCount + 0.3, 'type'); if (S.tLimit < 1e8) ev(at(S, 'L41', 1) - 0.1, 'stamp'); if (S.tWhy < 1e8) ev(S.tWhy + 0.3, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); };
SS2.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.2 + k * 0.4, 'step'); };
GK.bgmTrack = (S, tr) => { tr.fin = 3; };
GK.ending = true;
[GZ, GA, GB, GC, GD, GE, GF, GG, GH, GI, GJ, GK, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { sweetBox(c, 276, 226, '#e8b83c', { label: true }); }
