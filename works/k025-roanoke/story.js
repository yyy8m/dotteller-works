/* ================= 記録 #025 ロアノーク植民地の消失: story plan ================= */
const EXPR = {};
['L41', 'L42'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { kenkyu: { name: '年輪を調べた研究者', bg: ['#0c1c14', '#2c4c3c'] } };
const HOOK = ['ロアノーク植民地の消失', '100人以上が、一夜で消えた島'];
const PLAN_FULL = [
  { sc: PZ, pre: 0.8, items: ['C0', 1.2, 'C1', 1.3, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: PA, pre: 1.3, items: ['L1', 1.1, 'L2', 1.1, 'L3', 1.1, 'L4'], tr: 'dither', td: 1.0 },
  { sc: PB, pre: 1.3, items: ['L5', 1.1, 'L6', 1.1, 'L7', 1.1, 'L8', 1.1, 'L9'], tr: 'dither', td: 1.0 },
  { sc: PC, pre: 1.3, items: ['L10', 1.1, 'L11', 0.8, 'L11b', 1.1, 'L12', 1.1, 'L13', 1.1, 'L14', 1.1, 'L15'], tr: 'dither', td: 1.0 },
  { sc: PD, pre: 1.3, items: ['L16', 1.1, 'L17', 1.1, 'L18', 1.1, 'L19', 1.1, 'L20'], tr: 'blinds', td: 1.2 },
  { sc: PE, pre: 1.4, items: ['L21', 1.4, 'L22', 1.2, 'L23', 1.1, 'L24', 1.1, 'L25', 1.8, 'L25b', 1.2, 'L26', 1.4, 'L27', 1.2, 'L28', 1.2, 'L29'], tr: 'blinds', td: 0.6 },
  { sc: PH0, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: PF2, pre: 1.3, items: ['L30', 1.1, 'L31', 1.1, 'L32', 1.1, 'L33', 1.1, 'L34'], tr: 'dither', td: 1.0 },
  { sc: PG, pre: 1.3, items: ['L35', 1.1, 'L36', 1.1, 'L37', 0.8, 'R1', 1.1, 'L38', 1.1, 'L39', 1.4, 'L40'], tr: 'dither', td: 1.2 },
  { sc: PM, pre: 1.2, items: ['L41', 1.2, 'L42'], tr: 'iris', td: 1.4 },
];
// Short / TikTok: S1 → the landing, ruins, the counts → mid-hook T2 → CROATOAN, CRO, no cross → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: PC, pre: 0.1, items: ['L15'], tr: 'dither', td: 0.3 },
  { sc: PE, pre: 0.1, items: ['L21', 0.2, 'L22', 0.2, 'L23', 0.1, 'L24', 0.1, 'T2', 0.8, 'L25b', 0.3, 'L26', 0.4, 'L27', 0.3, 'L29'], tr: 'dither', td: 0.3 },
  { sc: SS2, pre: 0.1, items: ['S2'], tr: 'dither', td: 0.3 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
PZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); ev(1.0, 'splash'); if (S.tEmpty < 1e8) ev(S.tEmpty + 0.3, 'wind', 4); if (S.tPost < 1e8) ev(S.tPost + 0.3, 'sting'); };
PA.sfx = (S, ev) => { ev(0.3, 'toll'); if (S.tTen < 1e8) ev(S.tTen + 0.4, 'stamp'); if (S.tGold < 1e8) ev(S.tGold + 0.4, 'shine'); if (S.tMap < 1e8) ev(at(S, 'L4', 2), 'stamp'); };
PB.sfx = (S, ev) => { ev(0.4, 'splash'); ev(1.4, 'creak'); if (S.tCup < 1e8) ev(S.tCup + 0.6, 'crackle'); if (S.tLeft < 1e8) ev(S.tLeft + 2, 'splash'); if (S.tDrake < 1e8) ev(S.tDrake + 0.4, 'toll'); if (S.tEmpty < 1e8) ev(S.tEmpty + 0.4, 'wind', 3); };
PC.sfx = (S, ev) => { ev(0.4, 'splash'); if (S.tLand < 1e8) for (let k = 0; k < 6; k++) ev(S.tLand + 0.4 + k * 0.5, 'step'); if (S.tBaby < 1e8) ev(S.tBaby + 0.4, 'sparkle'); if (S.tHowe < 1e8) ev(at(S, 'L13', 3) - 0.1, 'sting'); if (S.tGo < 1e8) ev(S.tGo + 0.5, 'splash'); if (S.tCross < 1e8) ev(S.tCross + 3, 'shine'); };
PD.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tArmada < 1e8) for (let k = 0; k < 4; k++) ev(S.tArmada + 0.4 + k * 0.6, 'thud'); if (S.tSmall < 1e8) ev(at(S, 'L18', 3), 'clang'); if (S.tYears < 1e8) for (let i = 0; i < 3; i++) ev(S.tYears + 0.5 + i * 0.8, 'stamp'); if (S.tPriv < 1e8) ev(S.tPriv + 0.5, 'splash'); };
PE.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.4 + k * 0.5, 'step'); if (S.tRuin < 1e8) ev(S.tRuin + 0.2, 'sting'); if (S.tCount < 1e8) for (let i = 0; i < 3; i++) ev(at(S, 'L23', i) - 0.2, 'stamp'); if (S.tWord < 1e8) { ev(S.tWord + 0.1, 'sting'); ev(S.tWord + 0.8, 'heart'); } if (S.tTree < 1e8) ev(S.tTree + 0.3, 'heart'); if (S.tStorm < 1e8) { ev(S.tStorm + 0.2, 'thunder'); ev(S.tStorm + 0.5, 'rain', 6); } };
PH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
PF2.sfx = (S, ev) => { ev(0.4, 'wind', 3); if (S.tAmong < 1e8) ev(S.tAmong + 0.4, 'crackle'); if (S.tSmith < 1e8) ev(S.tSmith + 0.4, 'splash'); if (S.tTools < 1e8) ev(S.tTools + 0.3, 'clang'); if (S.tWreck < 1e8) { ev(S.tWreck + 0.3, 'thunder'); ev(S.tWreck + 0.5, 'rain', 5); } };
PG.sfx = (S, ev) => { for (let k = 0; k < 4; k++) ev(0.5 + k * 0.6, 'dig'); if (S.tRing < 1e8) ev(S.tRing + 0.3, 'shine'); if (S.tTree < 1e8) ev(at(S, 'L37', 3), 'sting'); if (S.tPlay < 1e8) ev(S.tPlay + 0.4, 'sparkle'); if (S.tPost < 1e8) ev(S.tPost + 0.3, 'wind', 4); };
PM.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(0.6, 'wind', 3); };
SS2.sfx = (S, ev) => { ev(0.2, 'splash'); };
PM.bgmTrack = (S, tr) => { tr.fin = 3; };
PM.ending = true;
[PZ, PA, PB, PC, PD, PE, PH0, PF2, PG, PM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { person(c, WHITE, 282, 230, { k: 'td' }); }
function THUMB(c, t) { thumbBigFace(c, { face: whiteFace({}), s: 3.6, rim: '#c81818', rimA: 0.35, title: ['ロアノーク', '植民地の消失'], hook: '100人超が島から消えた', bg: ['#0c141c', '#2c3c4c'] }, t); }
