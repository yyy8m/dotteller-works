/* ================= 文庫 #007 山月記: story plan ================= */
const EXPR = {};
['C0', 'C1', 'L0', 'L1', 'L2', 'L4', 'L7', 'L8', 'E1', 'L9', 'L10', 'L11', 'R2', 'R3', 'L13', 'L16', 'L17', 'R6', 'L24', 'L26', 'L27', 'L28', 'S1', 'S2', 'T1'].forEach(id => EXPR[id] = [[0, 'normal']]);
['T0', 'L5', 'L6', 'R1', 'L14', 'R5', 'L15', 'R8', 'R9', 'R11', 'R12', 'L23', 'R13'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { richo: { name: '李徴', bg: ['#1c1008', '#6c3c14'] }, ensan: { name: '袁傪', bg: ['#1c0c0c', '#5c2c24'] } };
const HOOK = ['山月記', '詩人は、なぜ虎に――'];
const PLAN_FULL = [
  { sc: GX, pre: 0.8, items: ['T0', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: GA, pre: 1.0, items: ['L1', 0.8, 'L2'], tr: 'dither', td: 1.2 },
  { sc: GB, pre: 0.8, items: ['L4'], tr: 'dither', td: 1.0 },
  { sc: GC, pre: 0.8, items: ['L5', 1.0, 'L6'], tr: 'dither', td: 1.0 },
  { sc: GD, pre: 1.0, items: ['L7', 0.8, 'L8', 0.4, 'E1'], tr: 'blinds', td: 1.0 },
  { sc: GE, pre: 0.8, items: ['L9', 0.8, 'L10', 0.6, 'R1', 0.8, 'L11'], tr: 'dither', td: 1.0 },
  { sc: GF, pre: 0.8, items: ['R2', 0.6, 'R3', 0.8, 'L13', 0.6, 'L14'], tr: 'dither', td: 1.0 },
  { sc: GG, pre: 0.8, items: ['R5', 0.8, 'L15', 0.6, 'R6', 0.8, 'L16', 0.6, 'L17'], tr: 'dither', td: 1.0 },
  { sc: GH, pre: 1.0, items: ['R8', 0.8, 'R9', 1.0, 'R11'], tr: 'dither', td: 1.2 },
  { sc: GI, pre: 0.8, items: ['R12', 0.8, 'L23', 0.6, 'R13'], tr: 'dither', td: 1.0 },
  { sc: GJ, pre: 0.8, items: ['L24', 1.0, 'L26', 0.8, 'L27'], tr: 'dither', td: 1.2 },
  { sc: GK, pre: 1.2, items: ['L28'], tr: 'iris', td: 1.4 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: GD, pre: 0.3, items: ['L8', 0.3, 'E1'], tr: 'dither', td: 0.5 },
  { sc: GE, pre: 0.3, items: ['R1'], tr: 'dither', td: 0.5 },
  { sc: GF, pre: 0.3, items: ['R3'], tr: 'dither', td: 0.5 },
  { sc: GG, pre: 0.3, items: ['R5'], tr: 'dither', td: 0.5 },
  { sc: GH, pre: 0.3, items: ['R9'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
GX.sfx = (S, ev) => { ev(0.2, 'wind', 5); if (S.tLeap < 1e8) { ev(S.tLeap, 'whoosh'); ev(S.tLeap + 0.1, 'thump'); ev(S.tBack, 'whoosh'); } };
GA.sfx = (S, ev) => { ev(0.4, 'shine'); if (S.tHome < 1e8) ev(S.tHome + 0.5, 'type'); };
GB.sfx = (S, ev) => { ev(0.3, 'step'); if (S.tPeers < 1e8) ev(S.tPeers + 0.6, 'thud'); };
GC.sfx = (S, ev) => { ev(0.3, 'wind', 4); if (S.tRun < 1e8) { ev(S.tRun, 'sting'); ev(S.tRun + 0.2, 'door'); for (let k = 0; k < 5; k++) ev(S.tRun + 0.4 + k * 0.3, 'step'); } ev(S.tGone, 'toll'); };
GD.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.4 + k * 0.7, 'step'); if (S.tLeap < 1e8) { ev(S.tLeap, 'whoosh'); ev(S.tLeap + 0.1, 'thump'); ev(S.tLeap + 0.9, 'whoosh'); } };
GE.sfx = (S, ev) => { ev(0.3, 'shine'); if (S.tSob < 1e8) ev(S.tSob + 0.4, 'breath'); };
GF.sfx = (S, ev) => { ev(0.3, 'wind', 4); for (let k = 0; k < 8; k++) ev(0.5 + k * 0.5, 'step'); if (S.tRiver < 1e8) ev(S.tRiver + 0.2, 'splash'); if (S.tGone < 1e8) ev(S.tGone + 0.2, 'stab'); };
GG.sfx = (S, ev) => { ev(0.4, 'wind', 4); if (S.tWrite < 1e8) for (let k = 0; k < 6; k++) ev(S.tWrite + 0.5 + k * 0.8, 'type'); };
GH.sfx = (S, ev) => { if (S.tBeast < 1e8) ev(S.tBeast + 0.4, 'sting'); if (S.tHowl < 1e8) { ev(S.tHowl + 0.2, 'wind', 5); } };
GI.sfx = (S, ev) => { ev(0.3, 'toll'); };
GJ.sfx = (S, ev) => { ev(0.4, 'step'); if (S.tLeap < 1e8) { ev(S.tLeap, 'whoosh'); ev(S.tHowl + 0.2, 'thunder'); ev(S.tHowl + 1.4, 'thunder'); } };
GK.sfx = (S, ev) => { ev(0.3, 'wind', 6); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'wind', 4); ev(0.6, 'thump'); };
SS2.sfx = (S, ev) => { ev(0.2, 'wind', 3); };
GK.bgmTrack = (S, tr) => { tr.fin = 3; };
GK.ending = true;
// figures stand at y 150-160: keep them above the dialog window
GX.wideDY = 30; GA.wideDY = (t, S) => (t > S.tHome ? 24 : 34); GB.wideDY = 24; GC.wideDY = 24; GD.wideDY = 30; GE.wideDY = 30; GF.wideDY = 30; GG.wideDY = (t, S) => (t > S.tWrite ? 30 : 10);
GH.wideDY = (t, S) => (t > S.tHowl ? 10 : 24); GI.wideDY = 30; GJ.wideDY = (t, S) => (t > S.tLook ? 40 : 30); GK.wideDY = 20; SS1.wideDY = 30; SS2.wideDY = 30;
function TITLE_DECO(c, t) { tiger(c, 270, 232, { pose: 'stand' }); }
