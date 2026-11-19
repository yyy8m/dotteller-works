/* ================= 文庫 #011 夢十夜: story plan ================= */
const EXPR = {};
['L40', 'L41', 'L12'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { onna: { name: '女', bg: ['#1c1820', '#4c3c48'] }, kozo: { name: '子ども', bg: ['#06080c', '#1c2430'] }, jibun: { name: '自分', bg: ['#0c1424', '#3c4c6c'] }, funa: { name: '船の男', bg: ['#0c1424', '#3c4c6c'] } };
const HOOK = ['夢十夜', 'こんな夢を見た――'];
const PLAN_FULL = [
  { sc: YZ, pre: 0.8, items: ['M1', 1.2, 'C0', 0.8, 'C1', 1.4, 'C2'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: YA, pre: 0.8, items: ['L1', 1.0, 'L2'], tr: 'dither', td: 1.0 },
  { sc: YB, pre: 0.8, items: ['L3', 0.8, 'L4', 0.8, 'L5', 0.6, 'L5b', 0.6, 'L5c', 0.8, 'V1', 0.8, 'L6', 0.6, 'V2', 0.8, 'L7', 1.0, 'L8', 0.8, 'L9', 0.8, 'L10', 0.8, 'L11', 0.8, 'L12', 1.0, 'L13', 0.8, 'L14', 0.6, 'V3'], tr: 'dither', td: 1.2 },
  { sc: YC, pre: 1.0, items: ['L15', 1.2, 'L16', 0.8, 'L17', 0.8, 'L18', 0.4, 'V4', 0.6, 'L19', 0.8, 'L20', 0.8, 'L21', 0.4, 'V5', 0.6, 'L22', 0.4, 'V6', 0.8, 'L23', 0.8, 'L24', 0.6, 'L24b', 0.8, 'V7', 0.6, 'L25', 0.8, 'L26', 0.6, 'L26b', 0.8, 'V8', 0.8, 'L27', 0.6, 'V9', 0.6, 'L28', 1.0, 'V10', 1.4, 'L29', 0.8, 'L30'], tr: 'blinds', td: 1.2 },
  { sc: YD, pre: 1.0, items: ['L31', 0.8, 'L32', 0.8, 'L33', 0.6, 'V11', 0.6, 'L34', 0.6, 'L34b', 0.8, 'L35', 0.6, 'L35b', 0.8, 'L34c', 0.8, 'L36', 1.0, 'L37', 0.8, 'L38', 0.8, 'L39', 0.6, 'L40', 1.0, 'L40b'], tr: 'dither', td: 1.2 },
  { sc: YE, pre: 1.0, items: ['L41', 1.2, 'L42'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 (the child: heavy?) → the third night → mid-hook T2 → "ちょうどこんな晩だったな" → S2 (the cedar) loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: YC, pre: 0.3, items: ['L17', 0.4, 'L18', 0.4, 'V4', 0.4, 'L20', 0.6, 'T2', 0.6, 'V7', 0.4, 'L25'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
YZ.sfx = (S, ev) => { ev(0.3, 'wind', 4); for (let k = 0; k < 10; k++) ev(0.6 + k * 0.6, 'step'); if (S.tDream < 1e8) ev(S.tDream + 0.3, 'toll'); };
YA.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.4 + k * 0.3, 'tick'); };
YB.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tDie < 1e8) ev(S.tDie + 1, 'toll'); if (S.tDig < 1e8) for (let k = 0; k < 4; k++) ev(S.tDig + 0.5 + k * 1.2, 'dig'); if (S.tStar < 1e8) ev(S.tStar + 1.6, 'sparkle'); if (S.tLily < 1e8) ev(S.tLily + 1.2, 'shine'); if (S.tKiss < 1e8) ev(S.tKiss + 0.8, 'sparkle'); };
YC.sfx = (S, ev) => { ev(0.4, 'toll'); if (S.tField < 1e8) for (let k = 0; k < 8; k++) ev(S.tField + 0.4 + k * 0.6, 'step'); if (S.tFear < 1e8) ev(S.tFear + 0.3, 'heart'); if (S.tRain < 1e8) ev(S.tRain + 0.2, 'rain', 6); if (S.tYear < 1e8) ev(S.tYear + 0.2, 'sting'); if (S.tRecall < 1e8) ev(S.tRecall + 0.3, 'thud'); if (S.tHeavy < 1e8) ev(at(S, 'L30', 2), 'thud'); };
YD.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tSun < 1e8) ev(S.tSun + 4.5, 'burn'); if (S.tChant < 1e8) ev(S.tChant + 0.3, 'tick'); if (S.tJump < 1e8) ev(S.tJump + 1, 'whoosh'); if (S.tRegret < 1e8) ev(S.tRegret + 0.3, 'heart'); if (S.tGone < 1e8) ev(S.tGone + 0.3, 'wind', 4); if (S.tEnd < 1e8) ev(S.tEnd, 'splash'); };
YE.sfx = (S, ev) => { ev(0.3, 'wind', 6); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.2 + k * 0.6, 'step'); };
SS2.sfx = (S, ev) => { ev(0.2, 'rain', 3); };
YE.bgmTrack = (S, tr) => { tr.fin = 3; };
YE.ending = true;
[YZ, YA, YB, YC, YD, YE, SS1, SS2].forEach(sc => sc.wideDY = 30);
// slow camera drift + dust motes (keeps the long still shots alive)
[YZ, YA, YB, YC, YD, YE, SS1, SS2].forEach(sc => { const base = sc.draw; sc.draw = function (c, t, S) { const r = base.call(this, c, t, S); if (r) { r.z = (r.z || 1) * (1.03 + 0.04 * Math.sin(t * 0.6)); r.fx = (r.fx || 160) + Math.sin(t * 0.55) * 18; r.fy = (r.fy || 100) + Math.sin(t * 0.43) * 6; for (let i = 0; i < 26; i++) { const u = fr(t * 0.05 + hash(i * 7)); const x = mod(hash(i) * W + t * (6 + (i % 5) * 3), W), y = 30 + u * 130; c.save(); c.globalAlpha = 0.3 + 0.2 * Math.sin(t * 2 + i); R(c, x, y, i % 4 ? 1 : 2, i % 4 ? 1 : 2, '#e8e4f0'); c.restore(); } } return r; }; });
function TITLE_DECO(c, t) { E(c, 282, 214, 6, 9, '#f8f8f4'); L(c, 282, 223, 282, 236, '#5c9c4c', 2); }
