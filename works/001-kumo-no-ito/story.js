/* ================= 001 蜘蛛の糸: story plan ================= */
const EXPR = {
  L0: [[0, 'smile']], L1: [[0, 'normal'], [2, 'smile']], N1: [[0, 'smile']], N2: [[0, 'normal']], L2: [[0, 'surp'], [1, 'normal'], [3, 'sad']],
  N3: [[0, 'normal']], N3b: [[0, 'normal'], [2, 'sad'], [4, 'normal']], L3: [[0, 'normal']], K0: [[0, 'normal']], L3b: [[0, 'smile']], N4: [[0, 'normal'], [2, 'smile']],
  L4: [[0, 'normal']], N5: [[0, 'sad']], N6: [[0, 'sad']], N7: [[0, 'normal'], [3, 'surp']], N8: [[0, 'smile']], N9: [[0, 'normal']], N10: [[0, 'normal']],
  L5: [[0, 'grin'], [3, 'surp'], [4, 'angry']], N11: [[0, 'surp']], N12: [[0, 'sad']], L6a: [[0, 'angry']], L6b: [[0, 'surp'], [2, 'sad']],
  N13: [[0, 'sad']], N14: [[0, 'sad']], N15: [[0, 'sad']], L7a: [[0, 'sad']], L7b: [[0, 'sad']], L7c: [[0, 'normal']], L7d: [[0, 'normal'], [3, 'smile']],
  S1: [[0, 'normal']], S2: [[0, 'normal']]
};
const HOOK = ['地獄に垂れた、一本の糸', '登れば、助かる――'];
const PLAN_FULL = [
  { sc: S0, pre: 1.0, items: ['L0'], tr: 'fromBlack', td: 1.0 },
  { sc: S1, pre: 1.8, items: ['L1'], tr: 'dither', td: 1.2 },
  { sc: SA, pre: 0.6, items: ['N1'], tr: 'dither', td: 1.2 },
  { sc: S2x, pre: 3.0, items: ['N2', 0.6, 'L2', 0.8, 'N3'], tr: 'ripple', td: 1.5 },
  { sc: SB, pre: 0.6, items: ['N3b'], tr: 'dither', td: 1.0 },
  { sc: S3x, pre: 1.1, items: ['L3', 0.4, 'K0', 0.5, 'L3b'], tr: 'white', td: 1.4 },
  { sc: SC, pre: 0.8, items: ['N4'], tr: 'dither', td: 1.2 },
  { sc: S4, pre: 1.2, items: ['L4'], tr: 'iris', td: 1.2 },
  { sc: S2b, pre: 1.2, items: ['N5', 0.6, 'N6'], tr: 'dither', td: 1.4 },
  { sc: SD, pre: 0.6, items: ['N7', 0.6, 'N8'], tr: 'dither', td: 1.0 },
  { sc: SE, pre: 0.6, items: ['N9', 0.5, 'N10'], tr: 'blinds', td: 1.0 },
  { sc: S5, pre: 0.9, items: ['L5'], tr: 'blinds', td: 0.9 },
  { sc: SF, pre: 0.4, items: ['N11', 0.5, 'N12'], tr: 'dither', td: 0.8 },
  { sc: S6, pre: 0.6, items: ['L6a', 0.7, 'L6b'], tr: 'dither', td: 0.5 },
  { sc: SG, pre: 0.6, items: ['N13', 1.0, 'N14'], tr: 'dither', td: 1.0 },
  { sc: SH, pre: 1.2, items: ['N15'], tr: 'irisWhite', td: 2.0 },
  { sc: S7x, pre: 1.2, items: ['L7a', 0.7, 'L7b', 0.8, 'L7c', 0.5, 'L7d'], tr: 'dither', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SD, pre: 0.4, items: ['S1'], tr: 'fromBlack', td: 0.4 },
  { sc: S5, pre: 0.3, items: ['L5'], tr: 'blinds', td: 0.6 },
  { sc: SF, pre: 0.3, items: ['N11', 0.4, 'N12', 0.4, 'S2'], tr: 'dither', td: 0.6 },
];
const PLAN = SHORT ? PLAN_SHORT : PLAN_FULL;
S2.sfx = (S, ev) => { for (const te of S2.oniHits(0.3, S.dur + S.td)) ev(te, 'clang'); };
S3.sfx = (S, ev) => { ev(S.tExcl, 'excl'); ev(S.tDown + 0.15, 'sparkle'); };
S4.sfx = (S, ev) => { ev(S.tPick - 0.2, 'shine', 1.2); ev(S.tTouch, 'drip'); ev(S.tDesc, 'shine', S.D * 0.85); ev(S.tNotice, 'excl'); };
S5.sfx = (S, ev) => { ev(S.p0 + 0.1, 'breath'); ev(S.p1, 'excl'); };
S6.sfx = (S, ev) => {
  for (const k of [S.k1, S.k2]) { ev(k + 0.22, 'whoosh'); ev(k + 0.42, 'thud'); }
  for (let t = S.tF; t < S.ts - 0.2; t += 0.32) ev(t, 'crackle');
  ev(S.ts, 'snap'); ev(S.ts + 0.05, 'fall', S.us);
  S.uk.forEach((u, k) => { if (u < S.us + 0.5 && k < 5) ev(S.ts + u, 'splash', 0.35); });
  ev(S.ts + S.us, 'splash', 1);
};
S6.bgmTrack = (S, tr) => { tr.b = S.start + S.ts; tr.cut = true; };
S7.sfx = (S, ev) => { ev(S.tFade0, 'sparkle'); ev(S.tFade0 + 1.2, 'sparkle'); ev(S.tEnd, 'end'); };
S7.bgmTrack = (S, tr) => { tr.a = S.start + 1.6; tr.fin = 3; };
S7.ending = true;
/* title screen decoration: the spider hanging on its silver thread */
function TITLE_DECO(c, t) {
  const sw = Math.sin(t * 1.1) * 6, sy = 150 + Math.sin(t * 0.8) * 8;
  L(c, 250, -2, 250 + sw, sy - 8, '#dce8f8'); threadPulses(c, 250, -10, sy, t, 3, 0.6);
  blit(c, spiderSpr({ t, f: 0, blink: blinkOf(t, 77), happy: true }), 250 + sw, sy + 8, SPI_AX, SPI_AY);
  for (let i = 0; i < 7; i++) { const x = 20 + i * 48, y = 222 + (i % 2) * 8 + Math.sin(t * 1.3 + i) * 1; lotusPad(c, x, y, 20, 5, i); if (i % 2 === 0) lotus(c, x, y - 2, 1.2, 0.8, t, i); }
}
SA.sfx = (S, ev) => { ev(0.6, 'sparkle'); ev(3.0, 'shine', 1.2); };
SB.sfx = (S, ev) => { for (let k = 0; k < 10; k++) ev(0.4 + k * 0.5, 'step'); ev(S.tFire, 'burn', 4); ev(S.tGood, 'sparkle'); };
SC.sfx = (S, ev) => { ev(S.tLeaf, 'shine', 1.4); ev(S.tLeaf + 1.6, 'sparkle'); };
SD.sfx = (S, ev) => { ev(S.tLook, 'excl'); ev(S.tThr, 'shine', S.tArr - S.tThr); if (S.tClap < 1e8) { ev(S.tClap, 'hit8'); ev(S.tClap + 0.25, 'hit8'); ev(S.tGrab, 'jump'); } };
SE.sfx = (S, ev) => { ev(S.tRest + 0.1, 'breath'); if (S.tBelow < 1e8) ev(S.tBelow, 'wind', 3); };
SF.sfx = (S, ev) => { if (S.tStrain < 1e8) { ev(S.tStrain, 'creak'); for (let k = 0; k < 6; k++) ev(S.tStrain + 0.4 + k * 0.7, 'heart'); } };
SG.sfx = (S, ev) => { ev(S.tF0, 'fall', S.tF1 - S.tF0); if (S.tEmpty < 1e8) ev(S.tEmpty + 0.4, 'shine', 2); };
SH.sfx = (S, ev) => { ev(0.8, 'drip'); };
