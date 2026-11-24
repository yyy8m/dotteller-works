/* ================= 記録 #021 下山事件: story plan ================= */
const EXPR = {};
['L37'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { shimoyama: { name: '下山定則', bg: ['#14141c', '#3c3c4c'] }, ohnishi: { name: '運転手・大西', bg: ['#0c0c14', '#2c2c3c'] }, okami: { name: '旅館の女将', bg: ['#1c140c', '#4c3824'] }, otoko: { name: '旅館の客の男', bg: ['#0c0c0c', '#2c2824'] } };
const HOOK = ['下山事件', '国鉄総裁が、線路の上で死んでいた'];
const PLAN_FULL = [
  { sc: MZ, pre: 0.8, items: ['C0', 1.0, 'C1', 1.0, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: MA, pre: 1.0, items: ['L1', 0.8, 'L2', 0.8, 'L3', 0.8, 'L4'], tr: 'dither', td: 1.0 },
  { sc: MB, pre: 0.8, items: ['L5', 0.8, 'L6'], tr: 'dither', td: 1.0 },
  { sc: MC, pre: 1.0, items: ['L7', 0.8, 'L8', 0.4, 'K1', 0.4, 'K2', 0.6, 'L9'], tr: 'blinds', td: 1.0 },
  { sc: MD, pre: 0.8, items: ['L10', 0.4, 'K3', 1.2, 'L11'], tr: 'dither', td: 1.0 },
  { sc: ME, pre: 1.0, items: ['L12', 0.8, 'L13', 0.8, 'L13b', 0.4, 'N1'], tr: 'dither', td: 1.0 },
  { sc: MF, pre: 1.0, items: ['L14', 0.8, 'L15', 0.4, 'X1', 0.6, 'L15b', 0.4, 'O1', 1.0, 'L16', 0.8, 'L16b'], tr: 'blinds', td: 0.6 },
  { sc: MH0, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: MG, pre: 1.0, items: ['L17', 0.8, 'L18', 0.8, 'L19'], tr: 'dither', td: 1.0 },
  { sc: MH, pre: 1.0, items: ['L20', 0.8, 'L21', 0.8, 'L22', 0.8, 'L22b'], tr: 'dither', td: 1.0 },
  { sc: MI, pre: 1.4, items: ['L23', 1.4, 'L24', 0.8, 'L25', 0.8, 'L26'], tr: 'iris', td: 1.2 },
  { sc: MJ, pre: 1.0, items: ['L27', 0.8, 'L28', 0.8, 'L29', 0.8, 'L30'], tr: 'dither', td: 1.0 },
  { sc: MK, pre: 1.0, items: ['L31', 0.8, 'L32'], tr: 'dither', td: 1.0 },
  { sc: ML, pre: 1.2, items: ['L33', 0.8, 'L34', 2.0, 'L35', 1.8, 'L36'], tr: 'dither', td: 1.2 },
  { sc: MM, pre: 1.2, items: ['L37', 1.2, 'L38'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the morning zigzag → "5分くらいだから" → the inn → mid-hook T2 → luminol, the oil → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.1, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: MC, pre: 0.1, items: ['K1', 0.2, 'K2'], tr: 'dither', td: 0.4 },
  { sc: MD, pre: 0.1, items: ['K3', 0.3, 'L11'], tr: 'dither', td: 0.4 },
  { sc: MF, pre: 0.1, items: ['X1', 0.1, 'O1'], tr: 'dither', td: 0.4 },
  { sc: MI, pre: 0.1, items: ['T2', 0.2, 'L24', 0.2, 'L25'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.1, items: ['S2'], tr: 'dither', td: 0.3 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
MZ.sfx = (S, ev) => { ev(0.3, 'rain', 6); ev(1.0, 'thunder'); if (S.tWho < 1e8) ev(S.tWho + 0.2, 'sting'); if (S.tQ < 1e8) { ev(S.tQ + 0.3, 'stamp'); ev(at(S, 'C2', 1), 'stamp'); } };
MA.sfx = (S, ev) => { ev(0.3, 'wind', 2); if (S.tJNR < 1e8) ev(S.tJNR + 0.3, 'toll'); if (S.tCut < 1e8) for (let k = 0; k < 6; k++) ev(S.tCut + 0.4 + k * 0.6, 'tick'); if (S.tDemo < 1e8) for (let k = 0; k < 10; k++) ev(S.tDemo + 0.3 + k * 0.4, 'step'); };
MB.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tNotice < 1e8) { for (let k = 0; k < 6; k++) ev(S.tNotice + 0.2 + k * 0.15, 'tick'); ev(S.tNotice + 0.6, 'stamp'); } };
MC.sfx = (S, ev) => { ev(0.3, 'door'); for (let k = 0; k < 6; k++) ev(0.8 + k * 1.5, 'whoosh'); };
MD.sfx = (S, ev) => { ev(0.3, 'clang'); if (S.tLast < 1e8) { for (let k = 0; k < 4; k++) ev(S.tLast + 0.3 + k * 0.5, 'step'); ev(S.tLast + 2.5, 'door'); } if (S.tBag < 1e8) ev(S.tBag + 0.3, 'tick'); };
ME.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tRadio < 1e8) ev(S.tRadio + 0.3, 'crackle'); if (S.tWait < 1e8) for (let k = 0; k < 8; k++) ev(S.tWait + 0.3 + k * 0.5, 'tick'); if (S.tQ < 1e8) ev(S.tQ + 0.2, 'door'); };
MH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
MF.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tInn < 1e8) ev(S.tInn + 0.3, 'door'); if (S.tWalk < 1e8) { for (let k = 0; k < 6; k++) ev(S.tWalk + 0.5 + k * 0.7, 'step'); ev(S.tWalk + 3, 'wind', 3); } };
MG.sfx = (S, ev) => { ev(0.3, 'wind', 2); for (let k = 0; k < 10; k++) ev(0.8 + k * 0.35, 'clang'); ev(1.2, 'snap'); if (S.tFound < 1e8) ev(S.tFound + 0.2, 'excl'); if (S.tWatch < 1e8) for (let k = 0; k < 4; k++) ev(S.tWatch + 0.3 + k * 0.8, 'tick'); if (S.tRain < 1e8) { ev(S.tRain + 0.2, 'thunder'); ev(S.tRain + 0.5, 'rain', 6); } };
MH.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tKeio < 1e8) ev(S.tKeio + 0.3, 'excl'); if (S.tPapers < 1e8) { ev(S.tPapers + 0.3, 'slam'); ev(S.tPapers + 1.1, 'slam'); } if (S.tConf < 1e8) ev(S.tConf + 0.3, 'gavel'); };
MI.sfx = (S, ev) => { ev(0.4, 'heart'); if (S.tGlow < 1e8) for (let k = 0; k < 6; k++) ev(S.tGlow + 0.6 + k * 0.8, 'shine'); if (S.tOil < 1e8) ev(S.tOil + 0.4, 'drip'); if (S.tTheory < 1e8) ev(S.tTheory + 0.3, 'sting'); };
MJ.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tMeet < 1e8) ev(S.tMeet + 1.0, 'stamp'); if (S.tStop < 1e8) ev(at(S, 'L29', 1), 'stamp'); if (S.tGHQ < 1e8) ev(S.tGHQ + 0.6, 'stamp'); };
MK.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tLimit < 1e8) ev(S.tLimit + 0.4, 'stamp'); if (S.tThree < 1e8) for (let k = 0; k < 3; k++) ev(S.tThree + 0.4 + k * 1.2, 'toll'); };
ML.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tItems < 1e8) for (let k = 0; k < 3; k++) ev(S.tItems + 0.4 + k * 0.6, 'sparkle'); if (S.tQ < 1e8) ev(S.tQ + 0.3, 'heart'); };
MM.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'rain', 5); ev(0.6, 'sting'); };
SS2.sfx = (S, ev) => { ev(0.3, 'step'); ev(0.9, 'step'); ev(1.5, 'door'); };
MM.bgmTrack = (S, tr) => { tr.fin = 3; };
MM.ending = true;
[MZ, MA, MB, MC, MD, ME, MF, MH0, MG, MH, MI, MJ, MK, ML, MM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { person(c, SHIMO, 282, 230, { k: 'td' }); }
