/* ================= 文庫 #005 人間椅子: story plan ================= */
const EXPR = {};
['C0', 'C1', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24', 'L25', 'L26', 'L27', 'S1', 'S2', 'T1'].forEach(id => EXPR[id] = [[0, 'normal']]);
['L6'].forEach(id => EXPR[id] = [[0, 'sad']]);
['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'Y1', 'J1'].forEach(id => EXPR[id] = [[0, 'normal']]);
const SPEAKERS_EXTRA = { otoko: { name: '手紙の男', bg: ['#140c08', '#3c2c24'] }, yoshiko: { name: '佳子', bg: ['#3c1428', '#6c2c48'] }, jochu: { name: '女中', bg: ['#1c2430', '#3c4858'] } };
const HOOK = ['人間椅子', '椅子の中に、男がひとり――'];
const PLAN_FULL = [
  { sc: NA, pre: 0.6, items: ['M0', 1.0, 'C0', 0.6, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: NB, pre: 1.0, items: ['L1', 0.5, 'L2', 0.5, 'L3'], tr: 'dither', td: 1.2 },
  { sc: NC, pre: 0.6, items: ['M1', 0.8, 'M2'], tr: 'dither', td: 1.0 },
  { sc: ND, pre: 0.8, items: ['L4', 0.5, 'L5', 0.8, 'L6'], tr: 'dither', td: 1.0 },
  { sc: NE, pre: 0.8, items: ['L7', 0.5, 'L8', 1.0, 'L9', 0.5, 'L10', 0.6, 'M3'], tr: 'dither', td: 1.0 },
  { sc: NF, pre: 0.6, items: ['L11', 0.5, 'L12'], tr: 'blinds', td: 1.0 },
  { sc: NG, pre: 0.6, items: ['L13', 0.6, 'L14'], tr: 'dither', td: 1.0 },
  { sc: NH, pre: 0.8, items: ['L15', 0.8, 'M4', 0.8, 'L16', 0.6, 'L17'], tr: 'dither', td: 1.0 },
  { sc: NI, pre: 0.6, items: ['L18', 0.5, 'L19'], tr: 'dither', td: 1.0 },
  { sc: NJ, pre: 0.8, items: ['L20', 0.6, 'M5', 0.8, 'L21', 1.0, 'M6'], tr: 'dither', td: 1.0 },
  { sc: NK, pre: 0.6, items: ['L22', 0.4, 'Y1', 0.8, 'M7', 1.0, 'L23'], tr: 'white', td: 0.8 },
  { sc: NL, pre: 0.3, items: ['J1', 0.6, 'L24', 0.6, 'M8', 0.8, 'M9'], tr: 'dither', td: 0.8 },
  { sc: NM, pre: 1.2, items: ['L25', 1.2, 'L26', 1.2, 'L27'], tr: 'iris', td: 1.4 },
];
const PLAN_SHORT = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.2 },
  { sc: NE, pre: 0.2, items: ['L9', 0.3, 'M3'], tr: 'dither', td: 0.4 },
  { sc: NH, pre: 0.2, items: ['M4'], tr: 'dither', td: 0.4 },
  { sc: SS2, pre: 0.2, items: ['S2'], tr: 'dither', td: 0.4 },
];
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.2, items: ['S1'], tr: 'fromBlack', td: 0.2 },
  { sc: NC, pre: 0.4, items: ['M1'], tr: 'dither', td: 0.5 },
  { sc: NE, pre: 0.4, items: ['L9', 0.4, 'L10', 0.4, 'M3'], tr: 'dither', td: 0.5 },
  { sc: NH, pre: 0.4, items: ['L15', 0.5, 'M4'], tr: 'dither', td: 0.5 },
  { sc: NJ, pre: 0.4, items: ['M6'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+, CEO decision 2026-11-10): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
NA.sfx = (S, ev) => { ev(0.2, 'heart'); if (S.tX < 1e8) ev(S.tX, 'sting'); };
NB.sfx = (S, ev) => { ev(S.tPile, 'type'); ev(S.tRead, 'creak'); };
NC.sfx = (S, ev) => { ev(0.3, 'sting'); for (let k = 0; k < 4; k++) ev(1.2 + k * 1.1, 'heart'); };
ND.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.4 + k * 0.5, 'tick'); ev(S.tDream, 'sparkle'); };
NE.sfx = (S, ev) => { ev(S.tWhisper, 'sting'); if (S.tBreak < 1e8) for (let k = 0; k < 5; k++) ev(S.tBreak + k * 0.3, 'hit'); if (S.tParts < 1e8) ev(S.tParts, 'whoosh'); };
NE.bgmTrack = (S, tr) => { if (ln(S, 'M3')) tr.mute = [ln(S, 'M3').t0 - 0.5, ln(S, 'M3').se + 0.6]; };
NF.sfx = (S, ev) => { for (let k = 0; k < 8; k++) ev(0.4 + k * 0.4, 'thump'); ev(S.tHotel, 'door'); };
NG.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.5 + k * 0.6, 'step'); if (S.tMore < 1e8) ev(S.tMore, 'sting'); };
NH.sfx = (S, ev) => { for (let k = 0; k < 4; k++) ev(S.tSit - 2 + k * 0.5, 'step'); ev(S.tSit, 'thud'); for (let k = 0; k < 6; k++) ev(S.tSit + 0.5 + k * 0.8, 'heart'); };
NI.sfx = (S, ev) => { ev(S.tAuction, 'gavel'); for (let k = 0; k < 6; k++) ev(S.tHouse - 2 + k * 0.3, 'thump'); };
NJ.sfx = (S, ev) => { ev(0.3, 'sparkle'); };
NK.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(S.tRun + k * 0.22, 'step'); ev(S.tRun + 1.6, 'slam'); if (S.tChair < 1e8) ev(S.tChair, 'heart'); };
NL.sfx = (S, ev) => { ev(0.2, 'door'); ev(S.tSame, 'sting'); if (S.tTitle < 1e8) ev(S.tTitle + 0.6, 'stamp'); };
NM.sfx = (S, ev) => { ev(1.0, 'creak'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.1, 'sting'); }; SS2.sfx = (S, ev) => { ev(0.2, 'heart'); };
NM.bgmTrack = (S, tr) => { tr.fin = 3; };
NA.wideDY = (t, S) => (t > S.tX ? 10 : 30); NB.wideDY = 30; ND.wideDY = 30; NE.wideDY = (t, S) => (t > S.tParts ? 30 : 30); NF.wideDY = 30; NG.wideDY = 30; NH.wideDY = 30; NI.wideDY = (t, S) => (t < S.tAuction ? 30 : t < S.tHouse ? 40 : 30); NJ.wideDY = 30; NK.wideDY = 30; NL.wideDY = (t, S) => (t > S.tSame ? 10 : 30); NM.wideDY = 30; NC.wideDY = 0; SS1.wideDY = 30; SS2.wideDY = 30;
function TITLE_DECO(c, t) { armchair(c, 270, 226, { s: 1.2, xray: Math.sin(t * 1.3) > 0.6 }); }
