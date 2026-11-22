/* ================= 文庫 #008 押絵と旅する男: story plan ================= */
const EXPR = {};
['L31', 'V5', 'L28'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { rojin: { name: '老人', bg: ['#140c14', '#3c2c3c'] }, ani: { name: '兄', bg: ['#1c1424', '#3c2c4c'] } };
const HOOK = ['押絵と旅する男', 'さかさに覗いてはいけません'];
const PLAN_FULL = [
  { sc: OZ, pre: 0.8, items: ['C0', 0.8, 'C1', 1.2, 'V0'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: OA, pre: 1.0, items: ['L1', 0.8, 'L2', 0.8, 'L3', 0.6, 'L3b', 0.8, 'L4', 0.8, 'L4b'], tr: 'dither', td: 1.0 },
  { sc: OB, pre: 1.0, items: ['L5', 0.8, 'L6', 0.6, 'L6b', 0.8, 'L7', 0.6, 'L7b', 0.8, 'L8'], tr: 'dither', td: 1.0 },
  { sc: OC, pre: 0.8, items: ['L9', 0.4, 'V1', 0.8, 'L10', 0.6, 'L10b', 0.8, 'L11', 0.8, 'L12', 0.8, 'L12c', 1.4, 'L12b'], tr: 'blinds', td: 1.2 },
  { sc: OD, pre: 0.8, items: ['L13', 0.6, 'L13b', 0.4, 'V2', 0.6, 'L14', 0.8, 'L15', 0.6, 'L15b', 0.8, 'L16', 1.0, 'L16b'], tr: 'dither', td: 1.0 },
  { sc: OE, pre: 1.2, items: ['L17', 0.4, 'V3', 1.0, 'V4', 1.0, 'L18', 0.8, 'L19', 0.6, 'L19b', 0.8, 'L20'], tr: 'blinds', td: 1.2 },
  { sc: OF, pre: 1.0, items: ['L21', 0.6, 'L21b', 0.6, 'L21c', 0.8, 'L22', 0.6, 'L22b', 0.8, 'L23'], tr: 'dither', td: 1.0 },
  { sc: OG, pre: 0.8, items: ['L24', 0.6, 'L24b', 0.8, 'L25', 0.6, 'L25b', 0.6, 'A1', 1.0, 'L26', 0.6, 'A2'], tr: 'dither', td: 1.0 },
  { sc: OH, pre: 1.0, items: ['L27', 1.0, 'L27b', 1.4, 'L28', 0.8, 'L28c', 1.0, 'L29', 1.4, 'L29b'], tr: 'dither', td: 1.2 },
  { sc: OI, pre: 1.2, items: ['L30', 0.8, 'L31', 0.6, 'V5', 1.0, 'L32', 1.0, 'L33', 0.8, 'L33b', 1.4, 'L34'], tr: 'iris', td: 1.4 },
];
// Short / TikTok (same cut): S1 → the oshie, alive → the binoculars: "さかさに覗いては" → mid-hook T2 → "生きて居りましたろう" → S2 loops into S1
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: OC, pre: 0.3, items: ['L10b', 0.6, 'L12b'], tr: 'dither', td: 0.4 },
  { sc: OD, pre: 0.3, items: ['L13b', 0.3, 'V2', 0.5, 'L16'], tr: 'dither', td: 0.4 },
  { sc: OE, pre: 0.3, items: ['V3', 0.5, 'T2'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.3, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN = SHORT ? PLAN_TIKTOK : PLAN_FULL;
OZ.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.3 + k * 0.5, 'tick'); if (S.tFrame < 1e8) ev(S.tFrame + 0.4, 'sting'); };
OA.sfx = (S, ev) => { ev(0.4, 'wind', 4); if (S.tMirage < 1e8) ev(S.tMirage + 0.3, 'shine'); };
OB.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.3 + k * 0.5, 'tick'); if (S.tGlimpse < 1e8) ev(S.tGlimpse + 0.3, 'sting'); if (S.tWrinkle < 1e8) ev(S.tWrinkle + 0.3, 'heart'); };
OC.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tPic < 1e8) ev(S.tPic + 0.3, 'shine'); if (S.tAlive2 < 1e8) { ev(S.tAlive2 + 0.2, 'sting'); for (let k = 0; k < 4; k++) ev(S.tAlive2 + 0.8 + k * 0.7, 'heart'); } };
OD.sfx = (S, ev) => { ev(0.3, 'tick'); if (S.tRaise < 1e8) ev(S.tRaise + 0.4, 'excl'); if (S.tGirl < 1e8) for (let k = 0; k < 6; k++) ev(S.tGirl + 0.3 + k * 0.6, 'heart'); if (S.tOld < 1e8) ev(S.tOld + 0.3, 'sting'); };
OE.sfx = (S, ev) => { ev(0.3, 'breath'); if (S.tTurn < 1e8) ev(S.tTurn + 0.3, 'toll'); if (S.tThin < 1e8) for (let k = 0; k < 6; k++) ev(S.tThin + 1 + k * 0.5, 'step'); };
OF.sfx = (S, ev) => { ev(0.3, 'wind', 3); if (S.tStairs < 1e8) for (let k = 0; k < 8; k++) ev(S.tStairs + 0.2 + k * 0.4, 'step'); if (S.tGirl < 1e8) ev(S.tGirl + 0.3, 'sparkle'); if (S.tBalloon < 1e8) ev(S.tBalloon + 0.6, 'sparkle'); };
OG.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.3 + k * 0.25, 'step'); if (S.tPeep < 1e8) for (let k = 0; k < 6; k++) ev(S.tPeep + 0.4 + k * 0.8, 'snap'); if (S.tOshichi < 1e8) ev(S.tOshichi + 0.3, 'shine'); };
OH.sfx = (S, ev) => { ev(0.4, 'whoosh'); if (S.tGone < 1e8) ev(S.tGone + 0.6, 'sting'); if (S.tSearch < 1e8) for (let k = 0; k < 6; k++) ev(S.tSearch + 0.3 + k * 0.4, 'step'); if (S.tReveal < 1e8) ev(S.tReveal + 0.2, 'toll'); };
OI.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.3 + k * 0.5, 'tick'); if (S.tSmile < 1e8) ev(S.tSmile + 0.3, 'sparkle'); if (S.tStop < 1e8) ev(S.tStop + 0.2, 'creak'); if (S.tGone < 1e8) ev(S.tGone + 0.5, 'wind', 4); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.2, 'sting'); for (let k = 0; k < 4; k++) ev(0.5 + k * 0.5, 'tick'); };
SS2.sfx = (S, ev) => { ev(0.3, 'heart'); };
OI.bgmTrack = (S, tr) => { tr.fin = 3; };
OI.ending = true;
[OZ, OA, OB, OC, OD, OE, OF, OG, OH, OI, SS1, SS2].forEach(sc => sc.wideDY = 30);
[OZ, OA, OB, OC, OD, OE, OF, OG, OH, OI, SS1, SS2].forEach(sc => { const base = sc.draw; sc.draw = function (c, t, S) { const r = base.call(this, c, t, S); if (r) { r.z = (r.z || 1) * (1.03 + 0.04 * Math.sin(t * 0.6)); r.fx = (r.fx || 160) + Math.sin(t * 0.55) * 18; r.fy = (r.fy || 100) + Math.sin(t * 0.43) * 6; for (let i = 0; i < 26; i++) { const u = fr(t * 0.05 + hash(i * 7)); const x = mod(hash(i) * W + t * (6 + (i % 5) * 3), W), y = 30 + u * 130; c.save(); c.globalAlpha = 0.3 + 0.2 * Math.sin(t * 2 + i); R(c, x, y, i % 4 ? 1 : 2, i % 4 ? 1 : 2, '#e8e4f0'); c.restore(); } } return r; }; });
function TITLE_DECO(c, t) { oshie(c, t, 250, 190, 0.5, {}); }
