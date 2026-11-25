/* ================= 都市伝説 #006 メリーさんの電話: story plan ================= */
const EXPR = {};
['L27', 'L28'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { merry: { name: 'メリーさん', bg: ['#0c0814', '#3c2440'] }, shojo: { name: '女の子', bg: ['#0c0c18', '#2c2c48'] } };
const HOOK = ['メリーさんの電話', '電話のたび、声が近づいてくる'];
const PLAN_FULL = [
  { sc: MRZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.0, 'C2', 1.2, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: MRA, pre: 1.0, items: ['L1', 0.8, 'L1x', 0.8, 'L1y'], tr: 'dither', td: 1.0 },
  { sc: MRB, pre: 1.0, items: ['L2', 0.8, 'L3', 1.0, 'L3x', 1.0, 'L4'], tr: 'dither', td: 1.0 },
  { sc: MRC, pre: 0.8, items: ['L5', 1.0, 'L5x', 1.0, 'L5y'], tr: 'dither', td: 1.0 },
  { sc: MRD, pre: 1.0, items: ['L6', 0.8, 'L6x', 0.8, 'L6y'], tr: 'blinds', td: 1.0 },
  { sc: MRE, pre: 1.2, items: ['L7', 0.8, 'L7x', 0.6, 'G1', 0.8, 'L8', 0.6, 'L8x', 1.2, 'M2', 1.0, 'L9', 0.8, 'L9x'], tr: 'dither', td: 1.0 },
  { sc: MRF, pre: 1.0, items: ['L10', 0.8, 'L10x', 1.2, 'L11', 0.8, 'M3', 1.0, 'L12', 0.8, 'L12x', 1.0, 'L12y', 0.8, 'M3b', 1.0, 'L12z'], tr: 'dither', td: 1.0 },
  { sc: MRG, pre: 1.0, items: ['L13', 1.0, 'L13x', 0.8, 'M4', 1.0, 'L14', 0.8, 'L14x'], tr: 'dither', td: 1.2 },
  { sc: MRH, pre: 1.6, items: ['L15', 1.8, 'L16', 1.2, 'L16x', 0.8, 'M5'], tr: 'blinds', td: 1.2 },
  { sc: MRI, pre: 1.0, items: ['L17', 1.0, 'L17x', 1.0, 'L18', 0.8, 'L18y', 1.0, 'L18x'], tr: 'dither', td: 1.0 },
  { sc: MRJ, pre: 1.0, items: ['L19', 0.8, 'L20', 0.8, 'L20x', 1.0, 'M6', 2.0, 'M7'], tr: 'dither', td: 0.4 },
  { sc: MRH0, pre: 0, items: [], tr: 'dither', td: 0.2 },
  { sc: MRK, pre: 1.4, items: ['L21', 1.0, 'L21x'], tr: 'dither', td: 1.2 },
  { sc: MRL, pre: 1.0, items: ['L22', 0.8, 'L23', 1.0, 'L24'], tr: 'dither', td: 1.0 },
  { sc: MRM, pre: 1.0, items: ['L25', 0.8, 'L25x'], tr: 'dither', td: 1.0 },
  { sc: MRN, pre: 1.0, items: ['L26', 1.0, 'L27', 1.0, 'L27x', 1.0, 'L28'], tr: 'dither', td: 1.2 },
  { sc: MRO, pre: 1.2, items: ['L29', 1.2, 'M8', 1.2, 'L30', 1.0, 'L30x', 1.2, 'L31'], tr: 'iris', td: 1.4 },
];
// Short / TikTok: S1 → the 2nd and 3rd calls (station, park, tobacco corner) → mid-hook T2 → the bell, the door, the last call → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: MRF, pre: 0.2, items: ['M3', 0.2, 'L12', 0.2, 'M3b'], tr: 'dither', td: 0.3 },
  { sc: MRG, pre: 0.2, items: ['M4', 0.2, 'L14'], tr: 'dither', td: 0.3 },
  { sc: MRH, pre: 0.2, items: ['T2', 0.2, 'L16x', 0.2, 'M5'], tr: 'dither', td: 0.3 },
  { sc: MRI, pre: 0.1, items: ['L18'], tr: 'dither', td: 0.3 },
  { sc: MRJ, pre: 0.2, items: ['L20', 0.2, 'M6', 0.6, 'M7'], tr: 'dither', td: 0.3 },
  { sc: SS2, pre: 0.2, items: ['S2'], tr: 'dither', td: 0.3 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
MRZ.sfx = (S, ev) => { ev(0.3, 'sting'); for (let k = 0; k < 4; k++) ev(0.9 + k * 0.7, 'tick'); if (S.tRing < 1e8) for (let k = 0; k < 4; k++) ev(S.tRing + 0.3 + k * 0.7, 'tick'); if (S.tVoice < 1e8) ev(S.tVoice + 0.2, 'creak'); if (S.tNear < 1e8) for (let k = 0; k < 4; k++) ev(S.tNear + k * 1.2, 'step'); if (S.tGate < 1e8) ev(S.tGate + 0.9, 'sting'); };
MRA.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tNight < 1e8) for (let k = 0; k < 3; k++) ev(S.tNight + 2.6 + k * 0.7, 'tick'); };
MRB.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tDoll < 1e8) ev(S.tDoll + 0.3, 'creak'); if (S.tPast < 1e8) ev(S.tPast + 0.2, 'sparkle'); };
MRC.sfx = (S, ev) => { ev(0.4, 'wind', 3); for (let k = 0; k < 3; k++) ev(0.6 + k * 1.1, 'step'); if (S.tCar < 1e8) { ev(S.tCar + 0.3, 'door'); ev(S.tCar + 2.6, 'heart'); } if (S.tRoad < 1e8) ev(S.tRoad + 0.2, 'wind', 4); };
MRD.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tRoom < 1e8) ev(S.tRoom + 0.3, 'creak'); if (S.tPhone < 1e8) for (let k = 0; k < 4; k++) ev(S.tPhone + 0.5 + k * 1.0, 'tick'); };
const RING = (ev, t0, n = 4) => { for (let k = 0; k < n; k++) { ev(t0 + k * 0.7, 'tick'); ev(t0 + 0.12 + k * 0.7, 'tick'); } };
MRE.sfx = (S, ev) => { RING(ev, 0.3, 5); if (S.tPick < 1e8) ev(S.tPick + 0.2, 'stamp'); if (S.tCut < 1e8) { ev(S.tCut + 0.2, 'snap'); ev(S.tCut + 1.2, 'wind', 4); } };
MRF.sfx = (S, ev) => { ev(0.3, 'heart'); if (S.tRing2 < 1e8) RING(ev, S.tRing2 + 0.2); if (S.tSta < 1e8) ev(S.tSta + 0.3, 'wind', 3); if (S.tNear < 1e8) for (let k = 0; k < 4; k++) ev(S.tNear + 0.5 + k * 0.6, 'step'); if (S.tRing3 < 1e8) RING(ev, S.tRing3 + 0.2); if (S.tPark < 1e8) ev(S.tPark + 0.3, 'creak'); };
MRG.sfx = (S, ev) => { ev(0.3, 'heart'); ev(1.3, 'heart'); if (S.tRing < 1e8) RING(ev, S.tRing + 0.2); if (S.tCorner < 1e8) ev(S.tCorner + 0.3, 'sting'); if (S.tShut < 1e8) { ev(S.tShut + 0.3, 'excl'); ev(S.tShut + 2.0, 'whoosh'); } };
MRH.sfx = (S, ev) => { for (let k = 0; k < 24; k++) ev(0.4 + k * 1.0, 'tick'); if (S.tRing < 1e8) { ev(S.tRing + 0.1, 'sting'); RING(ev, S.tRing + 0.3, 5); } };
MRI.sfx = (S, ev) => { ev(0.6, 'door'); if (S.tOut < 1e8) ev(S.tOut + 0.3, 'wind', 5); if (S.tLock < 1e8) { ev(S.tLock + 0.3, 'door'); ev(S.tLock + 1.6, 'clang'); } };
MRJ.sfx = (S, ev) => { RING(ev, 0.3); if (S.tHold < 1e8) ev(S.tHold + 1.4, 'stamp'); if (S.tBehind < 1e8) { ev(S.tBehind + 0.1, 'heart'); ev(S.tBehind + 1.0, 'breath'); } };
MRH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
MRK.sfx = (S, ev) => { ev(0.4, 'wind', 4); if (S.tFear < 1e8) for (let k = 0; k < 6; k++) ev(S.tFear + 0.5 + k * 0.9, 'step'); };
MRL.sfx = (S, ev) => { ev(0.3, 'whoosh'); if (S.tForms < 1e8) for (const i of [0, 3, 5]) ev(at(S, 'L23', i) - 0.2, 'stamp'); if (S.tMobile < 1e8) for (let k = 0; k < 6; k++) ev(S.tMobile + 2 + k * 0.5, 'tick'); };
MRM.sfx = (S, ev) => { RING(ev, 0.3); if (S.tGame < 1e8) ev(S.tGame + 0.3, 'sparkle'); };
MRN.sfx = (S, ev) => { ev(0.4, 'wind', 3); if (S.tSoul < 1e8) ev(S.tSoul + 0.3, 'shine'); if (S.tThanks < 1e8) ev(S.tThanks + 0.6, 'toll'); };
MRO.sfx = (S, ev) => { for (let k = 0; k < 5; k++) ev(1.6 + k * 0.5, 'tick'); ev(S.tEnd - 2, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); RING(ev, 0.6, 3); };
SS2.sfx = (S, ev) => { ev(0.2, 'creak'); RING(ev, 1.5, 2); };
MRO.bgmTrack = (S, tr) => { tr.fin = 3; };
MRO.ending = true;
[MRZ, MRA, MRB, MRC, MRD, MRE, MRF, MRG, MRH, MRI, MRJ, MRH0, MRK, MRL, MRM, MRN, MRO, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { merry(c, 282, 222, { s: 2 }); }
function THUMB(c, t) { thumbBigFace(c, { face: merryFace({ dark: true }), s: 3.6, rim: '#5ca8f8', rimA: 0.35, title: ['メリーさんの電話'], hook: '今、あなたの後ろにいるの', bg: ['#0c0814', '#3c2440'] }, t); }
