/* ================= 文庫 #013 走れメロス: story plan ================= */
const EXPR = {};
['M10', 'M11', 'M15', 'S4'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { merosu: { name: 'メロス', bg: ['#1c1008', '#5c3c1c'] }, ou: { name: '王ディオニス', bg: ['#14060e', '#3c1430'] }, serinu: { name: 'セリヌンティウス', bg: ['#1c1814', '#6c5c4c'] }, roujin: { name: '老人', bg: ['#06060e', '#1c1c34'] }, sanzoku: { name: '山賊', bg: ['#140c08', '#4c3420'] }, firo: { name: 'フィロストラトス', bg: ['#2c0c14', '#a83c2c'] } };
const HOOK = ['走れメロス', '親友の命は、日没まで'];
const PLAN_FULL = [
  { sc: GZ, pre: 0.8, items: ['C0', 0.8, 'C1', 1.0, 'C2', 1.0, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: GA, pre: 1.0, items: ['L1', 1.0, 'L2', 0.8, 'L3', 0.8, 'L4'], tr: 'dither', td: 1.0 },
  { sc: GB, pre: 1.0, items: ['L5', 0.8, 'L6', 0.6, 'R1', 0.8, 'L7', 0.8, 'M1'], tr: 'blinds', td: 1.0 },
  { sc: GC, pre: 0.8, items: ['L8', 0.8, 'L9', 0.6, 'D1', 0.5, 'M2', 0.5, 'D2', 0.6, 'M3', 0.6, 'D3'], tr: 'dither', td: 1.0 },
  { sc: GD, pre: 0.8, items: ['L10', 0.6, 'M4', 0.6, 'D4', 0.6, 'M5', 0.8, 'L11', 0.8, 'D5'], tr: 'dither', td: 1.0 },
  { sc: GE, pre: 1.0, items: ['L12', 0.8, 'L13', 0.8, 'L14'], tr: 'blinds', td: 1.2 },
  { sc: GF, pre: 1.0, items: ['L15', 0.6, 'M6', 0.8, 'L16', 0.8, 'L17', 0.8, 'L18', 0.6, 'M7', 0.8, 'L19'], tr: 'dither', td: 1.0 },
  { sc: GG, pre: 1.0, items: ['L20', 0.8, 'L21', 0.6, 'L22', 0.8, 'L23', 0.6, 'M8', 0.8, 'L24'], tr: 'dither', td: 1.0 },
  { sc: GH, pre: 0.8, items: ['L25', 0.4, 'B1', 0.5, 'M9', 0.6, 'L26'], tr: 'dither', td: 1.0 },
  { sc: GI, pre: 1.2, items: ['L27', 1.0, 'L28', 0.8, 'M10', 0.8, 'M11', 1.2, 'L29'], tr: 'blinds', td: 1.4 },
  { sc: GJ, pre: 1.6, items: ['L30', 1.2, 'L31', 0.8, 'L32', 0.8, 'L33', 0.8, 'M12'], tr: 'iris', td: 1.4 },
  { sc: GK, pre: 0.6, items: ['L34', 0.6, 'L35', 0.6, 'F1', 0.6, 'L36', 0.6, 'M13'], tr: 'dither', td: 0.8 },
  { sc: GL, pre: 0.8, items: ['L37', 0.8, 'L38', 0.6, 'M14', 0.8, 'L39'], tr: 'dither', td: 1.0 },
  { sc: GM, pre: 1.0, items: ['M15', 0.8, 'L40', 1.0, 'S3', 1.6, 'S4', 1.2, 'L41'], tr: 'dither', td: 1.2 },
  { sc: GN, pre: 1.0, items: ['L42', 0.8, 'D6', 0.8, 'L43', 0.8, 'L44'], tr: 'dither', td: 1.2 },
  { sc: GO, pre: 1.2, items: ['L45'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the three-day promise → the flood → mid-hook T2, despair → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: GD, pre: 0.3, items: ['M4', 0.4, 'D4', 0.4, 'M5'], tr: 'dither', td: 0.4 },
  { sc: GG, pre: 0.3, items: ['L23', 0.3, 'M8'], tr: 'dither', td: 0.4 },
  { sc: GI, pre: 0.3, items: ['T2', 0.5, 'L28', 0.4, 'M11'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
GZ.sfx = (S, ev) => { ev(0.3, 'wind', 3); for (let k = 0; k < 6; k++) ev(0.6 + k * 0.35, 'step'); if (S.tFriend < 1e8) ev(S.tFriend + 0.3, 'toll'); };
GA.sfx = (S, ev) => { ev(0.3, 'sting'); if (S.tFlute < 1e8) ev(S.tFlute + 0.4, 'sparkle'); if (S.tFriend < 1e8) for (let k = 0; k < 5; k++) ev(S.tFriend + 0.4 + k * 0.66, 'clang'); };
GB.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tShake < 1e8) ev(S.tShake + 0.3, 'whoosh'); if (S.tList < 1e8) for (let k = 0; k < 5; k++) ev(S.tList + 0.4 + k * 1.1, 'stamp'); };
GC.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tSeize < 1e8) { ev(S.tSeize + 0.2, 'slam'); ev(S.tSeize + 0.5, 'excl'); } if (S.tKing < 1e8) ev(S.tKing + 0.3, 'toll'); };
GD.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tSmile < 1e8) ev(S.tSmile + 0.3, 'sting'); };
GE.sfx = (S, ev) => { ev(0.3, 'door'); if (S.tHug < 1e8) ev(S.tHug + 0.2, 'heart'); if (S.tStars < 1e8) ev(S.tStars + 0.3, 'sparkle'); };
GF.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tWed < 1e8) ev(S.tWed + 0.3, 'shine'); if (S.tRain < 1e8) { ev(S.tRain + 0.3, 'thunder'); ev(S.tRain + 0.6, 'rain', 4); } if (S.tFeast < 1e8) for (let k = 0; k < 6; k++) ev(S.tFeast + 0.3 + k * 0.5, 'thud'); };
GG.sfx = (S, ev) => { ev(0.3, 'rain', 4); if (S.tRun < 1e8) ev(S.tRun + 0.2, 'whoosh'); if (S.tFlood < 1e8) { ev(S.tFlood + 0.2, 'splash'); ev(S.tFlood + 0.8, 'wind', 3); } if (S.tSwim < 1e8) for (let k = 0; k < 5; k++) ev(S.tSwim + 0.3 + k * 0.9, 'splash'); };
GH.sfx = (S, ev) => { ev(0.3, 'wind'); if (S.tJump < 1e8) { ev(S.tJump, 'excl'); ev(S.tJump + 0.3, 'whoosh'); } if (S.tFight < 1e8) for (let k = 0; k < 3; k++) ev(S.tFight + 0.5 + k * 0.5, 'hit'); };
GI.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tFall < 1e8) ev(S.tFall + 0.2, 'thud'); if (S.tGiveUp < 1e8) for (let k = 0; k < 3; k++) ev(S.tGiveUp + 0.4 + k * 0.9, 'heart'); };
GJ.sfx = (S, ev) => { ev(0.5, 'drip'); ev(1.6, 'drip'); if (S.tSpring < 1e8) ev(S.tSpring + 0.3, 'sparkle'); if (S.tDrink < 1e8) ev(S.tDrink + 0.4, 'drop'); if (S.tTrust < 1e8) ev(S.tTrust + 0.3, 'shine'); };
GK.sfx = (S, ev) => { ev(0.2, 'whoosh'); for (let k = 0; k < 6; k++) ev(0.6 + k * 0.3, 'step'); if (S.tTower < 1e8) ev(S.tTower + 0.4, 'shine'); if (S.tFiro < 1e8) ev(S.tFiro + 0.2, 'whoosh'); if (S.tMemo < 1e8) ev(S.tMemo + 0.2, 'toll'); };
GL.sfx = (S, ev) => { ev(0.3, 'toll'); if (S.tIn < 1e8) ev(S.tIn + 0.2, 'whoosh'); if (S.tPost < 1e8) for (let k = 0; k < 4; k++) ev(S.tPost + 0.5 + k * 1.2, 'creak'); if (S.tCling < 1e8) ev(S.tCling + 0.3, 'excl'); if (S.tFree < 1e8) ev(S.tFree + 0.2, 'snap'); };
GM.sfx = (S, ev) => { if (S.tHit1 < 1e8) ev(S.tHit1, 'hit'); if (S.tHit2 < 1e8) ev(S.tHit2, 'hit'); if (S.tHug < 1e8) ev(S.tHug + 0.3, 'heart'); };
GN.sfx = (S, ev) => { for (let k = 0; k < 4; k++) ev(0.6 + k * 0.6, 'step'); if (S.tCheer < 1e8) { ev(S.tCheer + 0.2, 'shine'); ev(S.tCheer + 0.6, 'sparkle'); } if (S.tBlush < 1e8) ev(S.tBlush + 0.2, 'excl'); };
GO.sfx = (S, ev) => { ev(0.3, 'wind'); ev(2.0, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'whoosh'); for (let k = 0; k < 8; k++) ev(0.4 + k * 0.3, 'step'); };
SS2.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.2 + k * 0.3, 'step'); };
GO.bgmTrack = (S, tr) => { tr.fin = 3; };
GO.ending = true;
[GZ, GA, GB, GC, GD, GE, GF, GG, GH, GI, GJ, GK, GL, GM, GN, GO, SS1, SS2].forEach(sc => sc.wideDY = 30);
function TITLE_DECO(c, t) { robe(c, MEROS, 282, 230, { k: 'td', f: Math.floor(t * 6) % 4 }); }
[GZ, GA, GB, GC, GD, GE, GF, GG, GH, GI, GJ, GK, GL, GM, GN, GO, SS1, SS2].forEach(sc => { const base = sc.draw; sc.draw = function (c, t, S) { const r = base.call(this, c, t, S); if (r) { r.z = (r.z || 1) * (1.03 + 0.04 * Math.sin(t * 0.6)); r.fx = (r.fx || 160) + Math.sin(t * 0.55) * 18; r.fy = (r.fy || 100) + Math.sin(t * 0.43) * 6; for (let i = 0; i < 22; i++) { const u = fr(t * 0.05 + hash(i * 7)); const x = mod(hash(i) * W + t * (6 + (i % 5) * 3), W), y = 30 + u * 130; c.save(); c.globalAlpha = 0.25 + 0.2 * Math.sin(t * 2 + i); R(c, x, y, i % 4 ? 1 : 2, i % 4 ? 1 : 2, '#f8ecd0'); c.restore(); } } return r; }; });
