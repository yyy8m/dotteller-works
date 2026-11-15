/* ================= 記録 #013 ペドロ・ロペス: story plan ================= */
const EXPR = {};
['M1', 'C0', 'C1', 'L0', 'L1', 'L2', 'L4', 'L5', 'L6', 'P1', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'R1', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24', 'S1', 'S2', 'T1'].forEach(id => EXPR[id] = [[0, 'normal']]);
['L3', 'L25', 'L26'].forEach(id => EXPR[id] = [[0, 'sad']]);
const SPEAKERS_EXTRA = { lopez: { name: 'ペドロ・ロペス', bg: ['#1c1008', '#4c2c1c'] }, priest: { name: '司祭', bg: ['#141418', '#3c3c4c'] } };
const HOOK = ['ペドロ・ロペス', '「アンデスの怪物」は今――'];
const PLAN_FULL = [
  { sc: NX, pre: 0.8, items: ['M1', 1.0, 'C0', 1.2, 'C1'], tr: 'fromBlack', td: 0.6 },
  { sc: S0, pre: 0.8, items: ['L0'], tr: 'white', td: 1.0 },
  { sc: NA, pre: 1.0, items: ['L1', 0.8, 'L2', 0.8, 'L3'], tr: 'dither', td: 1.2 },
  { sc: NB, pre: 0.8, items: ['L4', 0.8, 'L5', 0.8, 'L6', 0.4, 'P1'], tr: 'dither', td: 1.0 },
  { sc: NC, pre: 0.8, items: ['L7', 0.8, 'L8', 0.8, 'L9'], tr: 'dither', td: 1.0 },
  { sc: ND, pre: 1.0, items: ['L10', 0.8, 'L11', 0.6, 'L12'], tr: 'blinds', td: 1.0 },
  { sc: NE, pre: 0.8, items: ['L13', 0.6, 'L14', 0.4, 'R1', 0.8, 'L15', 0.8, 'L16', 0.8, 'L17'], tr: 'dither', td: 1.0 },
  { sc: NF, pre: 0.8, items: ['L18', 0.8, 'L19'], tr: 'dither', td: 1.0 },
  { sc: NG, pre: 0.8, items: ['L20', 0.8, 'L21', 0.8, 'L22'], tr: 'dither', td: 1.0 },
  { sc: NH, pre: 0.8, items: ['L23', 0.8, 'L24', 1.0, 'L25'], tr: 'dither', td: 1.2 },
  { sc: NI, pre: 1.2, items: ['L26'], tr: 'iris', td: 1.4 },
];
// TikTok teaser (60-75 s, ends with 「続きは、本編で。」)
const PLAN_TIKTOK = [
  { sc: SS1, pre: 0.3, items: ['S1'], tr: 'fromBlack', td: 0.3 },
  { sc: NB, pre: 0.3, items: ['L5'], tr: 'dither', td: 0.5 },
  { sc: NE, pre: 0.3, items: ['L16'], tr: 'dither', td: 0.5 },
  { sc: NF, pre: 0.3, items: ['L19'], tr: 'dither', td: 0.5 },
  { sc: SS2, pre: 0.3, items: ['T1'], tr: 'dither', td: 0.5 },
];
// YouTube Short (60 s+): the TikTok cut, but the last line S2 loops back into the hook S1 instead of 「続きは、本編で。」
const PLAN = SHORT ? (TIKTOK ? PLAN_TIKTOK : PLAN_TIKTOK.map(p => ({ ...p, items: p.items.map(x => (x === 'T1' ? 'S2' : x)) }))) : PLAN_FULL;
NX.sfx = (S, ev) => { ev(0.2, 'rain', 6); ev(0.6, 'toll'); if (S.tShop < 1e8) { ev(S.tShop + 0.1, 'slam'); ev(S.tName + 0.4, 'stamp'); } };
NA.sfx = (S, ev) => { ev(0.3, 'type'); if (S.tMap < 1e8) for (let k = 1; k <= 3; k++) ev(at(S, 'L2', k) - 0.3, 'hit'); if (S.tVow < 1e8) ev(S.tVow + 0.2, 'rain', 6); };
NB.sfx = (S, ev) => { for (let k = 0; k < 6; k++) ev(0.4 + k * 0.7, 'step'); if (S.tMarket < 1e8) ev(at(S, 'L5', 4), 'sparkle'); if (S.tBury < 1e8) ev(S.tBury + 0.5, 'dig'); };
NC.sfx = (S, ev) => { ev(0.3, 'wind', 4); ev(0.5, 'breath'); if (S.tJeep < 1e8) ev(S.tJeep + 0.2, 'whoosh'); if (S.tMore < 1e8) for (let k = 0; k < 4; k++) ev(S.tMore + 0.4 + k * 0.6, 'stamp'); };
ND.sfx = (S, ev) => { ev(0.2, 'rain', 6); ev(at(S, 'L10', 4) - 0.3, 'thunder'); if (S.tShop < 1e8) { ev(S.tCry, 'excl'); ev(S.tHold, 'step'); ev(S.tHold + 0.4, 'step'); ev(S.tHold + 1.1, 'slam'); } };
NE.sfx = (S, ev) => { ev(0.3, 'clang'); if (S.tPriest < 1e8) ev(S.tPriest + 0.2, 'door'); if (S.t300 < 1e8) for (let k = 0; k < 6; k++) ev(S.t300 + 0.4 + k * 0.4, 'type'); if (S.t53 < 1e8) { ev(S.t53 + 0.3, 'sparkle'); ev(at(S, 'L16', 4), 'stamp'); } if (S.tGod < 1e8) ev(S.tGod + 0.3, 'sting'); };
NF.sfx = (S, ev) => { ev(at(S, 'L18', 3) - 0.3, 'gavel'); ev(at(S, 'L18', 3) - 0.1, 'stamp'); if (S.tFree < 1e8) { ev(S.tFree + 0.8, 'creak'); ev(S.tFree + 1.4, 'clang'); } if (S.tGo < 1e8) ev(S.tGo + 0.2, 'whoosh'); };
NG.sfx = (S, ev) => { ev(0.3, 'tick'); ev(at(S, 'L20', 4), 'stamp'); if (S.tCal < 1e8) for (let k = 0; k < 6; k++) ev(S.tCal + 0.4 + k * 0.7, 'hit'); if (S.tMom < 1e8) ev(S.tMom + 0.5, 'step'); };
NH.sfx = (S, ev) => { ev(0.3, 'type'); ev(at(S, 'L23', 3), 'stamp'); if (S.tInt < 1e8) ev(S.tInt + 0.2, 'siren'); if (S.tMom < 1e8) { ev(S.tMom + 0.3, 'wind', 6); ev(at(S, 'L25', 5), 'stamp'); } };
NI.sfx = (S, ev) => { ev(0.3, 'toll'); ev(S.tEnd, 'end'); };
SS1.sfx = (S, ev) => { ev(0.8, 'creak'); ev(1.6, 'clang'); };
SS2.sfx = (S, ev) => { ev(0.2, 'wind', 3); };
NI.bgmTrack = (S, tr) => { tr.fin = 3; };
NI.ending = true;
// people stand at y 154-162: keep them above the dialog window
NX.wideDY = (t, S) => (t > S.tShop ? 30 : 20); NA.wideDY = (t, S) => (t > S.tVow ? 30 : t > S.tMap ? 0 : 10); NB.wideDY = (t, S) => (t > S.tBury ? 10 : 30); NC.wideDY = (t, S) => (t > S.tMore ? 0 : 30); ND.wideDY = (t, S) => (t > S.tShop ? 30 : 20);
NE.wideDY = (t, S) => (t > S.tGod ? 30 : t > S.t300 ? 0 : 30); NF.wideDY = (t, S) => (t > S.tGo ? 30 : t > S.tFree ? 24 : 36); NG.wideDY = (t, S) => (t > S.tMom ? 30 : t > S.tCal ? 0 : 30); NH.wideDY = (t, S) => (t > S.tMom ? 20 : t > S.tInt ? 0 : 30); NI.wideDY = 10; SS1.wideDY = 24; SS2.wideDY = 20;
function TITLE_DECO(c, t) { candles(c, t, 8, 200, 232, 12); }
