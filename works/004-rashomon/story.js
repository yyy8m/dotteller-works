/* ================= 文庫 #004 羅生門: story plan ================= */
const EXPR = {};
['C0', 'C1', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L10', 'L11', 'L12', 'L13', 'L14', 'L16', 'L20', 'L21', 'L23', 'L25', 'L27', 'L30', 'S1', 'S2', 'T1'].forEach(id => EXPR[id] = [[0, 'normal']]);
['L8', 'L9', 'L15', 'L17', 'L18', 'L19', 'L22', 'L24', 'L26', 'L28', 'L29'].forEach(id => EXPR[id] = [[0, 'sad']]);
['H1', 'H2', 'H3', 'B1', 'B2', 'B3'].forEach(id => EXPR[id] = [[0, 'normal']]); ['H4', 'H5'].forEach(id => EXPR[id] = [[0, 'cold']]);
const SPEAKERS_EXTRA = { genin: { name: '下人', bg: ['#1c2438', '#2c3c5c'] }, baba: { name: '老婆', bg: ['#3c2c1c', '#5c4428'] } };
const HOOK = ['死人の髪を抜く老婆', 'それを見た男は――'];
const PLAN_FULL = [
  { sc: XA, pre: 0.6, items: ['C0', 0.8, 'H1', 1.0, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: XB, pre: 1.2, items: ['L1', 0.6, 'L2'], tr: 'dither', td: 1.4 },
  { sc: XC, pre: 0.6, items: ['L3', 0.5, 'L4', 0.6, 'L5'], tr: 'dither', td: 1.0 },
  { sc: XD, pre: 0.6, items: ['L6', 0.6, 'L7'], tr: 'dither', td: 1.0 },
  { sc: XE, pre: 0.8, items: ['L8', 0.8, 'L9'], tr: 'blinds', td: 1.0 },
  { sc: XF, pre: 0.8, items: ['L10', 0.6, 'L11', 0.6, 'L12'], tr: 'dither', td: 1.0 },
  { sc: XG, pre: 0.6, items: ['L13', 0.8, 'L14'], tr: 'dither', td: 1.0 },
  { sc: XH, pre: 1.0, items: ['L15', 1.0, 'L16', 1.0, 'L17', 0.8, 'L18', 0.6, 'L19'], tr: 'dither', td: 1.2 },
  { sc: XI, pre: 0.4, items: ['L20', 0.4, 'L21', 0.3, 'H2', 0.8, 'L22', 0.6, 'H3'], tr: 'dither', td: 0.6 },
  { sc: XJ, pre: 0.8, items: ['B1', 0.8, 'L23', 0.5, 'B2', 0.5, 'B3'], tr: 'dither', td: 1.0 },
  { sc: XK, pre: 1.0, items: ['L24', 1.0, 'H4', 0.8, 'L25', 0.4, 'H5', 0.8, 'L26'], tr: 'dither', td: 1.0 },
  { sc: XL, pre: 1.4, items: ['L27', 1.0, 'L28', 1.6, 'L29', 1.6, 'L30'], tr: 'dither', td: 1.4 },
];
// YouTube Short (25-35 s, loops): the hook → her excuse → the open question that leads back to the start
const PLAN_SHORT = [
  { sc: XA, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.2 },
  { sc: XJ, pre: 0.2, items: ['B3'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.2, items: ['S2'], tr: 'dither', td: 0.4 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: XA, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.2 },
  { sc: XE, pre: 0.4, items: ['L8', 0.5, 'L9'], tr: 'dither', td: 0.5 },
  { sc: XH, pre: 0.4, items: ['L17', 0.4, 'L18'], tr: 'dither', td: 0.5 },
  { sc: XJ, pre: 0.3, items: ['B1', 0.4, 'B3'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_SHORT) : PLAN_FULL;
XA.sfx = (S, ev) => { ev(0.1, 'rain', 8); ev(0.4, 'heart'); if (ln(S, 'H1')) ev(ln(S, 'H1').t0 - 0.1, 'sting'); };
XB.sfx = (S, ev) => { ev(0.1, 'rain', 12); ev(S.tCricket, 'tick'); };
XC.sfx = (S, ev) => { ev(0.2, 'wind', 5); ev(S.tCrow, 'excl'); };
XD.sfx = (S, ev) => { ev(0.1, 'rain', 10); };
XE.sfx = (S, ev) => { ev(0.1, 'rain', 6); for (let k = 0; k < 6; k++) ev(S.tFork + 0.4 + k * 0.9, 'heart'); };
XF.sfx = (S, ev) => { ev(0.1, 'rain', 8); ev(0.6, 'thud'); for (let k = 0; k < 8; k++) ev(S.tUp + k * 0.5, 'creak'); ev(S.tLight, 'sting'); };
XG.sfx = (S, ev) => { for (let k = 0; k < 5; k++) ev(0.4 + k * 0.8, 'heart'); };
XH.sfx = (S, ev) => { ev(S.tBaba, 'sting'); if (S.tHate < 1e8) ev(S.tHate, 'burn', 4); };
XI.sfx = (S, ev) => { ev(S.tGrab, 'hit'); ev(S.tDown, 'thud'); if (S.tBlade < 1e8) ev(S.tBlade, 'stab'); };
XJ.sfx = (S, ev) => { ev(0.3, 'heart'); };
XK.sfx = (S, ev) => { if (S.tStrip < 1e8) ev(S.tStrip, 'whoosh'); if (S.tKick < 1e8) ev(S.tKick, 'thud'); if (S.tRun < 1e8) for (let k = 0; k < 6; k++) ev(S.tRun + k * 0.25, 'step'); };
XL.sfx = (S, ev) => { ev(0.2, 'rain', 14); if (S.tGone < 1e8) ev(S.tGone, 'toll'); ev(S.tEnd, 'end'); };
SS2.sfx = (S, ev) => { ev(0.2, 'heart'); };
XL.bgmTrack = (S, tr) => { tr.fin = 3; };
XG.bgmTrack = (S, tr) => { tr.mute = [0, S.dur]; }; // only heartbeats at the top of the ladder
XA.wideDY = 28; XB.wideDY = 24; XC.wideDY = (t, S) => (t < S.tCrow ? 30 : 0); XD.wideDY = 24; XE.wideDY = (t, S) => (t < S.tFork ? 34 : 20); XF.wideDY = (t, S) => lerp(24, 0, sg(t, S.tUp, S.tUp + 4));
XG.wideDY = 10; XH.wideDY = 30; XI.wideDY = 30; XJ.wideDY = 30; XK.wideDY = 30; XL.wideDY = 24; SS2.wideDY = 28;
function TITLE_DECO(c, t) { rainFall(c, t, 0.4); for (let i = 0; i < 3; i++) crow(c, 240 + i * 22, 40 + i * 8 + Math.sin(t * 2 + i) * 3, t, i); }
