/* ================= 記録 #001 エド・ゲイン: story plan ================= */
const EXPR = {
  L0: [[0, 'normal']], L1: [[0, 'normal']], L2: [[0, 'normal']], L3: [[0, 'sad']], L4: [[0, 'normal'], [3, 'sad']],
  L5: [[0, 'normal'], [3, 'surp']], L6: [[0, 'normal'], [3, 'sad']], L7: [[0, 'sad']], L8: [[0, 'normal'], [2, 'sad']], L9: [[0, 'normal']], L10: [[0, 'sad'], [3, 'normal']]
};
const PLAN = [
  { sc: S0, pre: 1.0, items: ['L0'], tr: 'fromBlack', td: 1.0 },
  { sc: S1, pre: 1.6, items: ['L1'], tr: 'dither', td: 1.4 },
  { sc: S2, pre: 1.2, items: ['L2', 0.6, 'L3'], tr: 'dither', td: 1.2 },
  { sc: S3, pre: 1.4, items: ['L4', 0.8, 'L5'], tr: 'white', td: 1.2 },
  { sc: S4, pre: 1.2, items: ['L6'], tr: 'blinds', td: 1.0 },
  { sc: S5, pre: 0.8, items: ['L7'], tr: 'dither', td: 0.8 },
  { sc: S6, pre: 1.0, items: ['L8'], tr: 'dither', td: 1.2 },
  { sc: S7, pre: 1.0, items: ['L9'], tr: 'iris', td: 1.2 },
  { sc: S8, pre: 1.6, items: ['L10'], tr: 'dither', td: 1.8 },
];
S1.sfx = (S, ev) => { ev(0.2, 'wind', 5); ev(S.dur - 3, 'toll'); };
S2.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(S.tDoor + 0.2, 'creak'); ev(S.tGhost, 'wind', 3); };
S3.sfx = (S, ev) => { ev(0.4, 'creak'); ev(2.4, 'creak'); ev(S.tSlip, 'whoosh'); ev(S.tName, 'sting'); };
S4.sfx = (S, ev) => { ev(0.5, 'wind', 3); ev(S.tIn, 'creak'); ev(S.tShock, 'sting'); ev(S.tShock + 0.1, 'excl'); };
S5.sfx = (S, ev) => { ev(S.tP1 + 0.8, 'stamp'); ev(S.tP2 + 0.8, 'stamp'); for (let k = 0; k < 8; k++) ev(0.5 + k * 1.3, 'flash'); };
S6.sfx = (S, ev) => { ev(S.tGavel, 'gavel'); ev(S.tY1, 'toll'); };
S7.sfx = (S, ev) => { S.f.forEach(t => ev(t, 'whoosh')); };
S8.sfx = (S, ev) => { ev(0.5, 'toll'); ev(S.tEnd, 'toll'); };
S8.bgmTrack = (S, tr) => { tr.fin = 3; };
S8.ending = true;
/* title screen decoration: the farmhouse in the snow */
function TITLE_DECO(c, t) {
  moon(c, 270, 66, 9, t);
  const g = cached('ttlFarm', () => { const [cv, x] = mk(W, 70); house(x, 196, 66, 56, 40, { wall: '#1c2030', wall2: '#141824', roof: '#0c1018', rh: 18, snow: true, windows: [[6, 22, true], [42, 4, false]] }); for (const [bx, h, sd] of [[180, 50, 3], [270, 44, 8]]) bareTree(x, bx, 66, h, sd, '#0c1018'); return cv; });
  c.drawImage(g, 0, 150); R(c, 0, 216, W, 24, K.snow2); R(c, 0, 214, W, 3, K.snow1);
  snowfall(c, t, 40, 21, 8, 12);
}
