/* ================= 都市伝説 #008 牛の首: story plan ================= */
const EXPR = {};
['L15x', 'L16'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { sensei: { name: '引率の先生', bg: ['#1c2418', '#4c5c3c'] } };
const HOOK = ['牛の首', '聞いた者は、3日で死ぬ怪談'];
const PLAN_FULL = [
  { sc: UZ, pre: 0.8, items: ['C0', 1.2, 'C1', 1.2, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: UA, pre: 1.2, items: ['L1', 1.0, 'L1x'], tr: 'dither', td: 1.0 },
  { sc: UB, pre: 1.2, items: ['L2', 1.0, 'L2x', 1.0, 'L3', 1.2, 'L4', 1.2, 'L5'], tr: 'blinds', td: 1.0 },
  { sc: UC, pre: 1.2, items: ['L6', 1.0, 'L6x', 1.2, 'L7', 1.0, 'L7x', 0.6, 'N1', 0.8, 'L8', 0.8, 'N2', 1.4, 'L9', 1.0, 'L9x', 1.0, 'L10', 1.0, 'L11', 1.0, 'L11x'], tr: 'dither', td: 0.8 },
  { sc: UD, pre: 1.6, items: ['L12', 0.8, 'L12x', 1.2, 'L13', 1.0, 'L13x', 1.6, 'L14', 1.4, 'L14x', 1.4, 'L15', 1.0, 'L15x', 1.2, 'L16'], tr: 'blinds', td: 0.4 },
  { sc: UH0, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: UE, pre: 1.4, items: ['L17', 1.4, 'L18', 1.0, 'L18x', 1.8, 'L19', 1.2, 'L20', 1.0, 'L20x'], tr: 'dither', td: 1.0 },
  { sc: UF, pre: 1.2, items: ['L21', 1.0, 'L22', 1.0, 'L22x', 1.0, 'L23', 1.0, 'L24', 1.0, 'L25', 1.0, 'L26', 1.0, 'L26x'], tr: 'dither', td: 1.0 },
  { sc: UG, pre: 1.2, items: ['L27', 1.0, 'L27x', 1.2, 'L28', 1.0, 'L28x', 1.0, 'L29', 1.0, 'L29x', 1.2, 'L29y'], tr: 'dither', td: 1.2 },
  { sc: UM, pre: 1.2, items: ['L30', 1.2, 'L30x', 1.6, 'L31'], tr: 'iris', td: 1.4 },
];
// Short / TikTok: S1 → the bus, the teacher, "牛の首", the silence, the ears → mid-hook T2 → the driver, the fainted children, they remember nothing → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.1, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: UC, pre: 0.1, items: ['L7x', 0.1, 'N1', 0.3, 'L9', 0.1, 'L11'], tr: 'dither', td: 0.3 },
  { sc: UD, pre: 0.1, items: ['T2', 0.2, 'L13x', 0.2, 'L14', 0.2, 'L15'], tr: 'dither', td: 0.3 },
  { sc: SS2, pre: 0.1, items: ['S2'], tr: 'dither', td: 0.2 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
UZ.sfx = (S, ev) => { ev(0.3, 'crackle'); if (S.tDie < 1e8) { ev(at(S, 'C0', 1) - 0.1, 'heart'); ev(S.tDie + 0.2, 'whoosh'); } if (S.tMonk < 1e8) { ev(S.tMonk + 0.3, 'wind', 3); ev(S.tMonk + 1.4, 'toll'); } if (S.tName < 1e8) ev(S.tName + 0.2, 'sting'); };
UA.sfx = (S, ev) => { ev(0.3, 'toll'); if (S.tDiff < 1e8) ev(S.tDiff + 0.3, 'excl'); };
UB.sfx = (S, ev) => { ev(0.3, 'crackle'); if (S.tHear < 1e8) ev(at(S, 'L3', 1) - 0.1, 'heart'); if (S.tDays < 1e8) for (let i = 0; i < 3; i++) ev(S.tDays + 0.3 + i * 0.7, i === 2 ? 'toll' : 'stamp'); if (S.tMonk < 1e8) ev(S.tMonk + 0.3, 'toll'); if (S.tLeft < 1e8) ev(S.tLeft + 0.2, 'whoosh'); if (S.tOnly < 1e8) ev(S.tOnly + 0.3, 'creak'); };
UC.sfx = (S, ev) => { ev(0.3, 'wind'); if (S.tRide < 1e8) for (let k = 0; k < 6; k++) ev(S.tRide + 0.4 + k * 0.8, 'thump'); if (S.tCheer < 1e8) ev(S.tCheer + 0.2, 'sparkle'); if (S.tQuiet < 1e8) ev(at(S, 'L9', 2) - 0.2, 'heart'); if (S.tCedar < 1e8) ev(S.tCedar + 0.3, 'wind', 4); if (S.tEars < 1e8) ev(S.tEars + 0.3, 'sting'); if (S.tOn < 1e8) { ev(S.tOn + 0.4, 'heart'); ev(S.tOn + 1.2, 'heart'); } };
UD.sfx = (S, ev) => { if (S.tJolt < 1e8) { ev(S.tJolt + 0.2, 'slam'); ev(S.tJolt + 0.3, 'thud'); } if (S.tBrake < 1e8) ev(S.tBrake + 0.2, 'siren'); if (S.tDrv < 1e8) { ev(S.tDrv + 0.3, 'heart'); ev(S.tDrv + 1.1, 'heart'); } if (S.tKids < 1e8) ev(S.tKids + 0.4, 'sting'); if (S.tHush < 1e8) ev(S.tHush + 0.3, 'wind'); if (S.tWake < 1e8) ev(S.tWake + 0.3, 'breath'); if (S.tEnd < 1e8) ev(S.tEnd + 0.3, 'toll'); };
UH0.sfx = (S, ev) => { ev(0.2, 'sting'); ev(1.4, 'heart'); ev(2.4, 'heart'); };
UE.sfx = (S, ev) => { ev(0.3, 'heart'); if (S.tTrails < 1e8) for (let i = 0; i < 3; i++) ev(at(S, 'L18', i === 2 ? 2 : i) + 0.7, 'stamp'); if (S.tNone < 1e8) { ev(S.tNone + 0.1, 'sting'); ev(S.tNone + 0.8, 'creak'); } if (S.tQuote < 1e8) ev(S.tQuote + 0.3, 'shine'); };
UF.sfx = (S, ev) => { ev(0.3, 'whoosh'); if (S.tPlot < 1e8) for (let k = 0; k < 4; k++) ev(S.tPlot + 0.5 + k * 0.6, 'step'); if (S.tTrue < 1e8) ev(S.tTrue + 0.3, 'sting'); if (S.tPub < 1e8) ev(S.tPub + 0.3, 'type'); if (S.t73 < 1e8) ev(S.t73 + 0.2, 'whoosh'); if (S.tChain < 1e8) for (let i = 0; i < 6; i++) ev(S.tChain + 0.4 + i * 0.6, 'tick'); if (S.t26 < 1e8) ev(S.t26 + 0.2, 'whoosh'); };
UG.sfx = (S, ev) => { ev(0.3, 'wind'); if (S.tNet < 1e8) for (let k = 0; k < 8; k++) ev(S.tNet + 0.5 + k * 0.35, 'type'); if (S.tNoShape < 1e8) ev(S.tNoShape + 0.3, 'heart'); if (S.tEach < 1e8) for (let i = 0; i < 4; i++) ev(S.tEach + 0.5 + i * 0.6, 'tick'); if (S.tAll < 1e8) ev(S.tAll + 0.3, 'sting'); if (S.tRoad < 1e8) for (let k = 0; k < 6; k++) ev(S.tRoad + 0.4 + k * 0.6, 'step'); };
UM.sfx = (S, ev) => { ev(0.3, 'wind'); if (S.tAsk < 1e8) ev(S.tAsk + 0.4, 'heart'); ev(S.tEnd - 2, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); ev(at(S, 'S1', 2) - 0.1, 'heart'); if (S.tB < 1e8) ev(S.tB + 0.2, 'toll'); };
SS2.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.3 + k * 0.8, 'thump'); };
UM.bgmTrack = (S, tr) => { tr.fin = 3; };
UM.ending = true;
[UZ, UA, UB, UC, UD, UH0, UE, UF, UG, UM, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { cowHead(c, t, 282, 200, { s: 1.4, dark: true }); }
