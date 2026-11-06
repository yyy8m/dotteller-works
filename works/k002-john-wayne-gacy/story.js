/* ================= 記録 #002 ジョン・ゲイシー: story plan (full ≈ 6.5 min / short ≈ 60 s) ================= */
const EXPR = {};
['L0', 'L1', 'L2', 'L4', 'L6', 'L7', 'L8', 'L9', 'L12', 'L16', 'L17', 'L18', 'L19', 'L22', 'L23', 'L24', 'L25', 'L27', 'S1', 'S2'].forEach(id => EXPR[id] = [[0, 'normal']]);
['L3', 'L5', 'L10', 'L11', 'L13', 'L14', 'L15', 'L20', 'L21', 'L26'].forEach(id => EXPR[id] = [[0, 'sad']]);
EXPR.L1 = [[0, 'normal'], [4, 'sad']]; EXPR.L10 = [[0, 'normal'], [3, 'sad']]; EXPR.L19 = [[0, 'normal'], [2, 'surp']];
const PLAN_FULL = [
  { sc: S0, pre: 1.0, items: ['L0'], tr: 'fromBlack', td: 1.0 },
  { sc: GA, pre: 0.8, items: ['L1'], tr: 'dither', td: 1.0 },
  { sc: GB, pre: 1.0, items: ['L2', 0.5, 'L3'], tr: 'dither', td: 1.2 },
  { sc: GC, pre: 0.8, items: ['L4', 0.6, 'L5'], tr: 'dither', td: 1.0 },
  { sc: GD, pre: 0.8, items: ['L6', 0.5, 'L7'], tr: 'dither', td: 1.2 },
  { sc: GE, pre: 0.8, items: ['L8', 0.5, 'L9'], tr: 'blinds', td: 1.0 },
  { sc: GF, pre: 1.2, items: ['L10', 0.6, 'L11'], tr: 'white', td: 1.0 },
  { sc: GG, pre: 0.8, items: ['L12', 0.5, 'L13', 0.6, 'L14'], tr: 'dither', td: 1.0 },
  { sc: GH, pre: 0.6, items: ['L15'], tr: 'dither', td: 1.0 },
  { sc: GI, pre: 1.0, items: ['L16', 0.5, 'L17'], tr: 'dither', td: 1.2 },
  { sc: GJ, pre: 0.6, items: ['L18'], tr: 'blinds', td: 0.8 },
  { sc: GX, pre: 0, items: [], tr: 'dither', td: 0.3 },
  { sc: GK, pre: 0.8, items: ['L19', 0.6, 'L20', 0.6, 'L21'], tr: 'white', td: 1.0 },
  { sc: GL, pre: 0.8, items: ['L22', 0.5, 'L23'], tr: 'dither', td: 1.2 },
  { sc: GM, pre: 1.0, items: ['L24'], tr: 'dither', td: 1.0 },
  { sc: GN, pre: 1.2, items: ['L25', 0.8, 'L26', 1.0, 'L27'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.4, items: ['S1'], tr: 'fromBlack', td: 0.4 },
  { sc: GG, pre: 0.3, items: ['L13'], tr: 'blinds', td: 0.6 },
  { sc: GK, pre: 0.3, items: ['L19', 0.3, 'L20'], tr: 'white', td: 0.6 },
  { sc: SS2, pre: 0.4, items: ['S2'], tr: 'dither', td: 0.6 },
];
const PLAN = SHORT ? PLAN_SHORT : PLAN_FULL;
GA.sfx = (S, ev) => { ev(S.tDown, 'sting'); ev(S.tDown + 1.4, 'heart'); };
GB.sfx = (S, ev) => { ev(0.2, 'stamp'); ev(S.tDad, 'slam'); ev(S.tDad + 2.2, 'slam'); for (let k = 0; k < 6; k++) ev(S.tHeart + k * 0.9, 'heart'); };
GC.sfx = (S, ev) => { ev(S.tCourt + 0.2, 'stamp'); ev(S.tCourt + 1.4, 'slam'); };
GD.sfx = (S, ev) => { ev(0.2, 'stamp'); ev(S.tParty, 'sparkle'); };
GE.sfx = (S, ev) => { ev(1.0, 'excl'); ev(S.tPhoto, 'flash'); ev(S.tPhoto + 0.4, 'stamp'); };
GF.sfx = (S, ev) => { ev(0.2, 'stamp'); ev(S.tHouse, 'creak'); ev(S.tStab - 0.4, 'heart'); ev(S.tStab, 'stab'); ev(S.tStab + 0.25, 'stab'); ev(S.tStab + 0.8, 'thud'); for (let k = 0; k < 6; k++) ev(S.tBury + 0.4 + k * 0.4, 'dig'); };
GG.sfx = (S, ev) => { if (!S.short) ev(0.2, 'stamp'); ev(S.tCuff + 1.0, 'hit'); ev(S.tCuff + 1.3, 'hit'); ev(S.tRope, 'sting'); for (let k = 0; k < 4; k++) ev(S.tRope + 0.4 + k * 0.6, 'heart'); if (S.tRiver < 1e8) ev(S.tRiver + 1.5, 'splash', 0.6); };
GH.sfx = (S, ev) => { ev(0.5, 'creak'); };
GI.sfx = (S, ev) => { ev(0.2, 'stamp'); ev(0.3, 'wind', 5); ev(S.tOut - 0.2, 'creak'); ev(S.tGacy, 'sting'); };
GJ.sfx = (S, ev) => { ev(S.tConf, 'slam'); };
GK.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.8 + k * 0.6, 'dig'); ev(S.tCount, 'stamp'); ev(S.tCount + 1.2, 'stamp'); ev(S.t33, 'toll'); };
GL.sfx = (S, ev) => { ev(0.2, 'stamp'); ev(S.tGavel, 'gavel'); ev(S.tPaint, 'whoosh'); };
GM.sfx = (S, ev) => { ev(0.3, 'stamp'); ev(2.0, 'toll'); };
GN.sfx = (S, ev) => { ev(S.tSplit, 'sting'); ev(S.tCand, 'toll'); ev(S.tEnd, 'toll'); };
SS1.sfx = (S, ev) => { ev(S.tDown, 'sting'); };
SS2.sfx = (S, ev) => { ev(lastSe(S) - 1.4, 'stamp'); };
GX.sfx = (S, ev) => { ev(0.25, 'sting'); for (let k = 0; k < 4; k++) ev(0.9 + k * 0.75, 'heart'); };
GN.bgmTrack = (S, tr) => { tr.fin = 3; };
GN.ending = true;
/* title screen: balloons and a little clown hat */
function TITLE_DECO(c, t) {
  [[230, '#e83c3c', '#a01c1c'], [258, '#3c8cd8', '#1c5c9c'], [284, '#f8d040', '#b89020']].forEach(([x, a, b], i) => balloon(c, x, 160 + Math.sin(t * 1.4 + i) * 3 - i * 6, a, b, t, i));
  R(c, 0, 214, W, 26, '#1c2418'); PF(c, [250, 214, 258, 200, 266, 214], '#2c4cb8'); E(c, 258, 199, 2, 2, '#f8e070');
}
const HOOK = ['子どもの人気者のピエロ', '家の床下には――'];
