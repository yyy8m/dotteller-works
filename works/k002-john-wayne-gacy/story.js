/* ================= 記録 #002 ジョン・ゲイシー: story plan ================= */
const EXPR = {
  L0: [[0, 'normal']], L1: [[0, 'normal']], L2: [[0, 'normal']], L3: [[0, 'normal'], [3, 'sad']], L4: [[0, 'surp'], [2, 'normal'], [4, 'sad']],
  L5: [[0, 'sad']], L6: [[0, 'normal']], L7: [[0, 'normal']], L8: [[0, 'sad'], [2, 'normal']]
};
const PLAN = [
  { sc: S0, pre: 1.0, items: ['L0'], tr: 'fromBlack', td: 1.0 },
  { sc: S1, pre: 1.6, items: ['L1'], tr: 'dither', td: 1.4 },
  { sc: S2, pre: 1.0, items: ['L2'], tr: 'blinds', td: 1.0 },
  { sc: S3, pre: 1.4, items: ['L3'], tr: 'dither', td: 1.4 },
  { sc: S4, pre: 0.8, items: ['L4'], tr: 'white', td: 1.0 },
  { sc: S5, pre: 1.0, items: ['L5'], tr: 'dither', td: 1.2 },
  { sc: S6, pre: 1.0, items: ['L6'], tr: 'dither', td: 1.0 },
  { sc: S7, pre: 1.0, items: ['L7'], tr: 'iris', td: 1.2 },
  { sc: S8, pre: 1.6, items: ['L8'], tr: 'dither', td: 1.8 },
];
S1.sfx = (S, ev) => { ev(S.tWave, 'sparkle'); };
S2.sfx = (S, ev) => { ev(S.tClown, 'excl'); for (let k = 0; k < 4; k++) ev(S.tClown + 0.6 + k * 0.9, 'drip'); ev(S.tZoom, 'sting'); };
S3.sfx = (S, ev) => { ev(0.3, 'wind', 5); ev(S.tOut - 0.2, 'creak'); ev(S.tGone, 'wind', 4); };
S4.sfx = (S, ev) => { ev(S.tName, 'sting'); ev(S.tSearch, 'wind', 3); ev(S.tHatch + 0.3, 'creak'); ev(S.tShock, 'heart'); ev(S.tShock + 0.6, 'heart'); };
S5.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(S.tY0 + k * (S.tY1 - S.tY0) / 6, 'type', 2); ev(S.t33, 'toll'); };
S6.sfx = (S, ev) => { ev(S.tGavel, 'gavel'); ev(S.tPrison + 0.4, 'toll'); };
S7.sfx = (S, ev) => { ev(S.tSplit, 'sting'); ev(S.tBal, 'whoosh'); };
S8.sfx = (S, ev) => { ev(0.5, 'toll'); ev(S.tEnd, 'toll'); };
S8.bgmTrack = (S, tr) => { tr.fin = 3; };
S8.ending = true;
/* title screen: balloons and a little clown hat */
function TITLE_DECO(c, t) {
  [[230, '#e83c3c', '#a01c1c'], [258, '#3c8cd8', '#1c5c9c'], [284, '#f8d040', '#b89020']].forEach(([x, a, b], i) => balloon(c, x, 160 + Math.sin(t * 1.4 + i) * 3 - i * 6, a, b, t, i));
  R(c, 0, 214, W, 26, '#1c2418'); PF(c, [250, 214, 258, 200, 266, 214], '#2c4cb8'); E(c, 258, 199, 2, 2, '#f8e070');
}
