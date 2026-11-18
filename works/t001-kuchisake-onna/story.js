/* ================= 都市伝説 #001 口裂け女: story plan ================= */
const EXPR = {};
['L42', 'L16', 'L37b'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { kuchi: { name: '口裂け女', bg: ['#0c0810', '#3c1c2c'] } };
const HOOK = ['口裂け女', '「わたし、きれい？」――'];
const PLAN_FULL = [
  { sc: UZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 0.6, 'V0', 1.4, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: UA, pre: 1.0, items: ['L1', 0.6, 'L2', 0.6, 'L2b', 0.8, 'L3', 0.8, 'L4', 0.6, 'L4b', 0.8, 'L5', 0.6, 'L5b', 0.6, 'L6'], tr: 'dither', td: 1.0 },
  { sc: UB, pre: 0.8, items: ['L7', 0.8, 'L8', 0.6, 'L8b', 1.0, 'L9a', 0.8, 'L9b', 0.6, 'L9c', 0.6, 'L9d', 0.8, 'L9e', 0.8, 'L9f', 1.2, 'L9', 0.6, 'V1'], tr: 'blinds', td: 1.0 },
  { sc: UC, pre: 0.8, items: ['L10', 1.0, 'L11', 1.6, 'L12', 0.6, 'L12b', 1.4, 'L13', 0.6, 'L13b', 0.4, 'V2', 1.0, 'L14', 0.8, 'L15', 0.6, 'L15b', 0.8, 'L16', 0.8, 'L16b', 0.6, 'L16c'], tr: 'dither', td: 1.0 },
  { sc: UD, pre: 1.6, items: ['L17', 0.8, 'L18', 0.8, 'L19', 0.8, 'L20', 0.6, 'L20b', 0.8, 'L21', 0.8, 'L22', 0.6, 'L23', 0.8, 'L23b'], tr: 'blinds', td: 1.0 },
  { sc: UE, pre: 0.8, items: ['L24', 0.8, 'L25', 0.6, 'L26', 0.8, 'L26b', 0.8, 'L27', 0.6, 'L27b'], tr: 'dither', td: 1.0 },
  { sc: UF, pre: 0.8, items: ['L28', 0.6, 'L29', 0.6, 'L29b', 0.8, 'L30', 0.6, 'L30b', 1.2, 'L31', 1.0, 'L32'], tr: 'dither', td: 1.0 },
  { sc: UG, pre: 0.8, items: ['L33', 0.6, 'L33b', 1.0, 'L34', 1.6, 'L35', 0.6, 'L35b', 0.8, 'L36', 0.6, 'L36b', 0.8, 'L37', 0.6, 'L37b'], tr: 'dither', td: 1.0 },
  { sc: UH, pre: 1.0, items: ['L38', 0.8, 'L39', 0.6, 'L39b', 0.8, 'L40', 0.8, 'L40b', 1.2, 'L41', 0.8, 'V3', 1.2, 'L42'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the told story in the alley → mid-hook T2 → "not pretty" / she runs 100 m in 6 s → S2 (her hand at the mask) loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: UB, pre: 0.3, items: ['L9b', 0.4, 'L9c', 0.4, 'L9e', 0.4, 'V1'], tr: 'dither', td: 0.4 },
  { sc: UC, pre: 0.3, items: ['T2', 0.4, 'L10', 0.4, 'L15', 0.4, 'L15b', 0.4, 'L16'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
UZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); for (let k = 0; k < 8; k++) ev(at(S, 'C0', 0) + k * 0.5, 'step'); if (S.tNear < 1e8) ev(S.tNear + 0.2, 'sting'); if (S.tQ < 1e8) ev(S.tQ + 0.3, 'toll'); };
UA.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tSpread < 1e8) ev(S.tSpread + 0.2, 'whoosh'); if (S.tChain < 1e8) for (let k = 0; k < 7; k++) ev(S.tChain + 0.4 + k * 0.6, 'tick'); };
UB.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tLamp < 1e8) for (let k = 0; k < 3; k++) ev(S.tLamp + 0.4 + k * 0.9, 'flash'); if (S.tSide < 1e8) ev(S.tSide + 0.3, 'sting'); if (S.tWalk < 1e8) for (let k = 0; k < 10; k++) ev(S.tWalk + 0.2 + k * 0.45, 'step'); if (S.tEar < 1e8) ev(S.tEar + 0.2, 'breath'); };
UC.sfx = (S, ev) => { ev(0.3, 'stab'); if (S.tMask < 1e8) ev(S.tMask + 0.4, 'heart'); if (S.tOpen < 1e8) { ev(S.tOpen, 'sting'); ev(S.tOpen + 0.1, 'thud'); } if (S.tRun < 1e8) for (let k = 0; k < 12; k++) ev(S.tRun + 0.3 + k * 0.12, 'step'); if (S.tBike < 1e8) ev(S.tBike + 0.2, 'whoosh'); if (S.tScream < 1e8) ev(S.tScream + 0.2, 'excl'); if (S.tBed < 1e8) ev(S.tBed + 0.3, 'tick'); };
UD.sfx = (S, ev) => { ev(0.6, 'toll'); if (S.tWays < 1e8) for (let k = 0; k < 3; k++) ev(at(S, 'L19', 0) + k * 0.5, 'stamp'); if (S.tCandy < 1e8) ev(S.tCandy + 0.3, 'sparkle'); if (S.tSoso < 1e8) ev(at(S, 'L21', 2), 'tick'); if (S.tFail < 1e8) ev(S.tFail + 0.3, 'sting'); };
UE.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tHosp < 1e8) for (let k = 0; k < 4; k++) ev(S.tHosp + 0.3 + k * 1.2, 'drip'); if (S.tQ < 1e8) for (let k = 0; k < 6; k++) ev(S.tQ + k * 0.4, 'tick'); };
UF.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.4 + k * 0.5, 'step'); if (S.tPol < 1e8) ev(S.tPol + 0.2, 'siren'); if (S.tNews < 1e8) ev(S.tNews + 0.2, 'whoosh'); if (S.tSaw < 1e8) ev(S.tSaw + 0.3, 'toll'); };
UG.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tNo < 1e8) ev(S.tNo + 0.1, 'sting'); if (S.tVar < 1e8) for (let k = 1; k < 4; k++) ev(at(S, 'L36', k), 'tick'); };
UH.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tIf < 1e8) for (let k = 0; k < 8; k++) ev(S.tIf + k * 0.5, 'step'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); };
SS2.sfx = (S, ev) => { ev(0.3, 'heart'); };
UH.bgmTrack = (S, tr) => { tr.fin = 3; };
UH.ending = true;
[UZ, UA, UB, UC, UD, UE, UF, UG, UH, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { R(c, 268, 210, 22, 12, '#f8f8f4'); L(c, 268, 212, 262, 206, '#e8e8e4'); L(c, 290, 212, 296, 206, '#e8e8e4'); }
