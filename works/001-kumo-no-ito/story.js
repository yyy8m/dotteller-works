/* ================= 001 蜘蛛の糸: story plan ================= */
const EXPR = {
  L0: [[0, 'smile']], L1: [[0, 'normal'], [2, 'smile']], L2: [[0, 'surp'], [1, 'normal'], [3, 'sad']], L3: [[0, 'normal'], [3, 'sad'], [4, 'smile']],
  L4: [[0, 'normal']], L5: [[0, 'grin'], [3, 'surp'], [4, 'angry']], L6a: [[0, 'angry']], L6b: [[0, 'surp'], [2, 'sad']], L7a: [[0, 'sad']], L7b: [[0, 'sad'], [2, 'normal']]
};
const PLAN = [
  { sc: S0, pre: 1.0, items: ['L0'], tr: 'fromBlack', td: 1.0 },
  { sc: S1, pre: 1.8, items: ['L1'], tr: 'dither', td: 1.2 },
  { sc: S2, pre: 3.0, items: ['L2'], tr: 'ripple', td: 1.5 },
  { sc: S3, pre: 1.1, items: ['L3'], tr: 'white', td: 1.4 },
  { sc: S4, pre: 1.2, items: ['L4'], tr: 'iris', td: 1.2 },
  { sc: S5, pre: 0.9, items: ['L5'], tr: 'blinds', td: 0.9 },
  { sc: S6, pre: 0.6, items: ['L6a', 0.7, 'L6b'], tr: 'dither', td: 0.5 },
  { sc: S7, pre: 2.0, items: ['L7a', 0.7, 'L7b'], tr: 'irisWhite', td: 2.2 },
];
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
